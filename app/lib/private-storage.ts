import "server-only";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  ACCENTS,
  DEFAULT_APPEARANCE,
  GB,
  previewKind,
  sanitizeAppearance,
  type Appearance,
  type Crumb,
  type Item,
  type Listing,
  type Partition,
  type Totals,
} from "../files/shared";

/*
 * Owner-only file vault.
 *  - Metadata (partitions, folders, files, appearance) lives in Postgres tables (supabase/vault.sql),
 *    so names keep their accents and rename/move never touch the stored bytes.
 *  - File bodies live in the PRIVATE bucket under ASCII keys `v/<uuid>`; the browser uploads straight
 *    to Supabase via one-time signed URLs (Vercel's 4.5 MB body limit never applies) and reads through
 *    short-lived signed URLs. The secret key never leaves the server.
 */

export type VaultCode =
  | "not_configured"
  | "setup_required"
  | "bad_request"
  | "not_found"
  | "exists"
  | "quota"
  | "too_large"
  | "public_bucket"
  | "upstream";

export class VaultError extends Error {
  code: VaultCode;
  status: number;
  constructor(code: VaultCode, status: number, message?: string) {
    super(message ?? code);
    this.code = code;
    this.status = status;
  }
}

const bad = () => new VaultError("bad_request", 400);

const BUCKET = process.env.SUPABASE_FILES_BUCKET?.trim() || "private-files";
export const MAX_FILE_BYTES = Math.floor((Number(process.env.PRIVATE_FILES_MAX_MB) || 50) * 1024 * 1024);
const TOTAL_BYTES = Math.floor((Number(process.env.PRIVATE_FILES_TOTAL_GB) || 1) * GB);
const MAX_BG_BYTES = 10 * 1024 * 1024;
const LINK_TTL = 600; // s
const BG_TTL = 3600; // s
const PENDING_MAX_AGE_MS = 6 * 3600 * 1000;
const PAGE = 1000;
const ITEM_COLS = "id,partition_id,parent_id,kind,name,size,mime,created_at,updated_at,object_key";

// ---------- Supabase ----------

function config(): { url: string; key: string } | null {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const key = (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim();
  return url && key ? { url, key } : null;
}

export const isConfigured = () => config() !== null;

let client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  const c = config();
  if (!c) throw new VaultError("not_configured", 503);
  client ??= createClient(c.url, c.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return client;
}
const bucket = () => sb().storage.from(BUCKET);

let bucketReady: Promise<void> | null = null;
/** Creates the bucket on first use; refuses to work with a public bucket. */
function ensureBucket(): Promise<void> {
  bucketReady ??= (async () => {
    const { data } = await sb().storage.getBucket(BUCKET);
    if (data) {
      if (data.public) throw new VaultError("public_bucket", 500, `Bucket "${BUCKET}" is public`);
      return;
    }
    const created = await sb().storage.createBucket(BUCKET, { public: false, fileSizeLimit: MAX_FILE_BYTES });
    if (created.error) throw new VaultError("upstream", 502, created.error.message);
  })().catch((err) => {
    bucketReady = null;
    throw err;
  });
  return bucketReady;
}

type DbErr = { code?: string; message: string };
function dbError(e: DbErr): VaultError {
  if (e.code === "23505") return new VaultError("exists", 409);
  if (e.code === "23503") return new VaultError("not_found", 404);
  if (["PGRST205", "PGRST202", "42P01", "42883"].includes(e.code ?? "")) return new VaultError("setup_required", 503, e.message);
  return new VaultError("upstream", 502, e.message);
}
function ok<T>(res: { data: T; error: DbErr | null }): T {
  if (res.error) throw dbError(res.error);
  return res.data;
}

async function fetchAll<T>(page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: DbErr | null }>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const rows = ok(await page(from, from + PAGE - 1)) ?? [];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
}

async function removeObjects(keys: string[]) {
  for (let i = 0; i < keys.length; i += 100) {
    const { error } = await bucket().remove(keys.slice(i, i + 100));
    if (error) console.error("[vault] remove failed", error.message);
  }
}

// ---------- Validation ----------

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function uuid(v: unknown): string {
  if (typeof v === "string" && UUID_RE.test(v)) return v.toLowerCase();
  throw bad();
}
export const optUuid = (v: unknown): string | null => (v == null || v === "" ? null : uuid(v));
export function uuidList(v: unknown): string[] {
  if (!Array.isArray(v) || !v.length || v.length > 200) throw bad(); // keeps PostgREST `in.(…)` URLs short
  return [...new Set(v.map(uuid))];
}
function cleanName(v: unknown, max = 255): string {
  if (typeof v !== "string") throw bad();
  const name = Array.from(
    v
      .normalize("NFC")
      .replace(/[\u0000-\u001f\u007f/\\]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  )
    .slice(0, max)
    .join("")
    .trim();
  if (!name || name === "." || name === "..") throw bad();
  return name;
}
function withSuffix(name: string, n: number): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`;
}
const cleanMime = (v: unknown) => (typeof v === "string" && /^[\w.+-]+\/[\w.+-]+$/.test(v) ? v.toLowerCase() : null);

// ---------- Rows ----------

interface Row {
  id: string;
  partition_id: string;
  parent_id: string | null;
  kind: "folder" | "file";
  name: string;
  size: number;
  mime: string | null;
  created_at: string;
  updated_at: string;
  object_key: string | null;
}
const toItem = (r: Row): Item => ({
  id: r.id,
  partitionId: r.partition_id,
  parentId: r.parent_id,
  kind: r.kind,
  name: r.name,
  size: Number(r.size),
  mime: r.mime,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

type FolderRow = { id: string; partition_id: string; parent_id: string | null; name: string };
const folderMap = async (partitionId?: string) =>
  new Map(
    (
      await fetchAll<FolderRow>((a, b) => {
        let q = sb().from("vault_items").select("id,partition_id,parent_id,name").eq("kind", "folder");
        if (partitionId) q = q.eq("partition_id", partitionId);
        return q.order("id").range(a, b);
      })
    ).map((f) => [f.id, f]),
  );

/** Folder ids of `rootId` and everything below it. */
function subtreeFolders(folders: Map<string, FolderRow>, rootId: string): Set<string> {
  const out = new Set([rootId]);
  for (let grew = true; grew; ) {
    grew = false;
    for (const f of folders.values()) {
      if (f.parent_id && out.has(f.parent_id) && !out.has(f.id)) {
        out.add(f.id);
        grew = true;
      }
    }
  }
  return out;
}

async function filesUnder(folderIds: string[]): Promise<{ id: string; size: number; object_key: string | null }[]> {
  const out: { id: string; size: number; object_key: string | null }[] = [];
  for (let i = 0; i < folderIds.length; i += 100) {
    const ids = folderIds.slice(i, i + 100);
    out.push(
      ...(await fetchAll<{ id: string; size: number; object_key: string | null }>((a, b) =>
        sb().from("vault_items").select("id,size,object_key").eq("kind", "file").in("parent_id", ids).order("id").range(a, b),
      )),
    );
  }
  return out;
}

async function assertFolder(partitionId: string, folderId: string | null) {
  if (!folderId) {
    const p = ok(await sb().from("vault_partitions").select("id").eq("id", partitionId).maybeSingle());
    if (!p) throw new VaultError("not_found", 404);
    return;
  }
  const f = ok(
    await sb().from("vault_items").select("id").eq("id", folderId).eq("partition_id", partitionId).eq("kind", "folder").maybeSingle(),
  );
  if (!f) throw new VaultError("not_found", 404);
}

// ---------- Partitions & totals ----------

export async function partitionsAndTotals(): Promise<{ partitions: Partition[]; totals: Totals }> {
  const [rowsRes, usageRes] = await Promise.all([
    sb().from("vault_partitions").select("id,name,color,quota_bytes").order("created_at"),
    sb().rpc("vault_usage"),
  ]);
  let rows = ok(rowsRes) as { id: string; name: string; color: string; quota_bytes: number }[];
  const usage = new Map(
    ((ok(usageRes) ?? []) as { partition_id: string; used: number; files: number }[]).map((u) => [u.partition_id, u]),
  );
  if (!rows.length) {
    rows = [ok(await sb().from("vault_partitions").insert({ name: "Fájlok", color: "violet", quota_bytes: TOTAL_BYTES }).select("id,name,color,quota_bytes").single())!];
  }
  const partitions = rows.map((r) => ({
    id: r.id,
    name: r.name,
    color: r.color,
    quota: Number(r.quota_bytes),
    used: Number(usage.get(r.id)?.used ?? 0),
    files: Number(usage.get(r.id)?.files ?? 0),
  }));
  return {
    partitions,
    totals: {
      limit: TOTAL_BYTES,
      used: partitions.reduce((s, p) => s + p.used, 0),
      allocated: partitions.reduce((s, p) => s + p.quota, 0),
      maxFile: MAX_FILE_BYTES,
    },
  };
}

function cleanQuota(v: unknown): number {
  if (typeof v !== "number" || !Number.isFinite(v) || v < 1024 * 1024) throw bad();
  return Math.floor(v);
}
const cleanColor = (v: unknown) => (ACCENTS.some((a) => a.id === v) ? (v as string) : "violet");

export async function createPartition(name: unknown, quota: unknown, color: unknown) {
  const q = cleanQuota(quota);
  const { totals } = await partitionsAndTotals();
  if (totals.allocated + q > totals.limit) throw new VaultError("quota", 409);
  const row = ok(
    await sb().from("vault_partitions").insert({ name: cleanName(name, 60), quota_bytes: q, color: cleanColor(color) }).select("id").single(),
  );
  return { id: row!.id as string };
}

export async function updatePartition(id: string, patch: { name?: unknown; quota?: unknown; color?: unknown }) {
  const update: Record<string, unknown> = {};
  if (patch.name !== undefined) update.name = cleanName(patch.name, 60);
  if (patch.color !== undefined) update.color = cleanColor(patch.color);
  if (patch.quota !== undefined) {
    const q = cleanQuota(patch.quota);
    const { partitions, totals } = await partitionsAndTotals();
    const p = partitions.find((x) => x.id === id);
    if (!p) throw new VaultError("not_found", 404);
    if (q < p.used || totals.allocated - p.quota + q > totals.limit) throw new VaultError("quota", 409);
    update.quota_bytes = q;
  }
  if (!Object.keys(update).length) throw bad();
  const rows = ok(await sb().from("vault_partitions").update(update).eq("id", id).select("id"));
  if (!rows?.length) throw new VaultError("not_found", 404);
  return { ok: true };
}

export async function deletePartition(id: string) {
  const all = ok(await sb().from("vault_partitions").select("id"));
  if ((all?.length ?? 0) <= 1) throw bad(); // keep at least one
  const keys = await fetchAll<{ object_key: string | null }>((a, b) =>
    sb().from("vault_items").select("object_key").eq("partition_id", id).not("object_key", "is", null).order("id").range(a, b),
  );
  const rows = ok(await sb().from("vault_partitions").delete().eq("id", id).select("id"));
  if (!rows?.length) throw new VaultError("not_found", 404);
  await removeObjects(keys.map((k) => k.object_key!).filter(Boolean));
  return { ok: true };
}

// ---------- Listing & search ----------

let lastCleanup = 0;
/** Removes uploads that were reserved but never finished (closed tab, network loss). */
async function cleanupPending() {
  if (Date.now() - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = Date.now();
  const cutoff = new Date(Date.now() - PENDING_MAX_AGE_MS).toISOString();
  const { data } = await sb().from("vault_items").select("id,object_key").eq("status", "pending").lt("created_at", cutoff).limit(500);
  if (!data?.length) return;
  await sb().from("vault_items").delete().in("id", data.map((r) => r.id));
  await removeObjects(data.map((r) => r.object_key).filter(Boolean));
}

async function thumbsFor(rows: Row[]): Promise<Record<string, string>> {
  const imgs = rows.filter((r) => r.kind === "file" && r.object_key && previewKind(r.name, r.mime) === "image").slice(0, 300);
  if (!imgs.length) return {};
  const { data } = await bucket().createSignedUrls(imgs.map((r) => r.object_key!), LINK_TTL);
  const out: Record<string, string> = {};
  data?.forEach((d, i) => {
    if (d.signedUrl) out[imgs[i].id] = d.signedUrl;
  });
  return out;
}

export async function getListing(partitionId: string | null, folderId: string | null): Promise<Listing> {
  cleanupPending().catch((e) => console.error("[vault] cleanup", e));
  const { partitions, totals } = await partitionsAndTotals();
  const part = partitions.find((p) => p.id === partitionId) ?? partitions[0];

  const crumbs: Crumb[] = [];
  let folder: string | null = null;
  if (folderId && part.id === partitionId) {
    const folders = await folderMap(part.id);
    if (folders.has(folderId)) {
      folder = folderId;
      for (let f = folders.get(folderId); f; f = f.parent_id ? folders.get(f.parent_id) : undefined) {
        crumbs.unshift({ id: f.id, name: f.name });
        if (crumbs.length > 100) break;
      }
    }
  }
  crumbs.unshift({ id: null, name: part.name });

  const rows = await fetchAll<Row>((a, b) => {
    let q = sb().from("vault_items").select(ITEM_COLS).eq("partition_id", part.id).eq("status", "ready");
    q = folder ? q.eq("parent_id", folder) : q.is("parent_id", null);
    return q.order("kind", { ascending: false }).order("name").range(a, b);
  });

  return {
    partitions,
    totals,
    partitionId: part.id,
    folderId: folder,
    crumbs,
    items: rows.map(toItem),
    thumbs: await thumbsFor(rows),
  };
}

export async function search(raw: string) {
  const term = raw.replace(/[%_\\,()*]/g, " ").replace(/\s+/g, " ").trim().slice(0, 100);
  if (!term) return { items: [], where: {}, thumbs: {} };
  const [rowsRes, folders, { partitions }] = await Promise.all([
    sb().from("vault_items").select(ITEM_COLS).eq("status", "ready").ilike("name", `%${term}%`).order("kind", { ascending: false }).order("name").limit(200),
    folderMap(),
    partitionsAndTotals(),
  ]);
  const rows = (ok(rowsRes) ?? []) as Row[];
  const names = new Map(partitions.map((p) => [p.id, p.name]));
  const where: Record<string, string> = {};
  for (const r of rows) {
    const parts: string[] = [];
    for (let f = r.parent_id ? folders.get(r.parent_id) : undefined; f && parts.length < 50; f = f.parent_id ? folders.get(f.parent_id) : undefined) {
      parts.unshift(f.name);
    }
    where[r.id] = [names.get(r.partition_id) ?? "", ...parts].join(" / ");
  }
  return { items: rows.map(toItem), where, thumbs: await thumbsFor(rows) };
}

// ---------- Mutations ----------

export async function createFolder(partitionId: string, parentId: string | null, rawName: unknown, reuse = false) {
  const name = cleanName(rawName);
  await assertFolder(partitionId, parentId);
  const res = await sb().from("vault_items").insert({ partition_id: partitionId, parent_id: parentId, kind: "folder", name }).select("id").single();
  if (res.error?.code === "23505" && reuse) {
    let q = sb().from("vault_items").select("id,kind,name").eq("partition_id", partitionId);
    q = parentId ? q.eq("parent_id", parentId) : q.is("parent_id", null);
    const hit = (ok(await q.ilike("name", name.replace(/[%_\\]/g, "\\$&"))) ?? []).find(
      (r) => r.kind === "folder" && r.name.toLowerCase() === name.toLowerCase(),
    );
    if (hit) return { id: hit.id as string };
  }
  return { id: ok(res)!.id as string };
}

export async function prepareUpload(partitionId: string, parentId: string | null, rawName: unknown, size: unknown, type: unknown) {
  if (typeof size !== "number" || !Number.isSafeInteger(size) || size < 0) throw bad();
  if (size > MAX_FILE_BYTES) throw new VaultError("too_large", 413);
  const base = cleanName(rawName);
  await Promise.all([ensureBucket(), assertFolder(partitionId, parentId)]);
  const { partitions, totals } = await partitionsAndTotals();
  const part = partitions.find((p) => p.id === partitionId);
  if (!part) throw new VaultError("not_found", 404);
  if (part.used + size > part.quota || totals.used + size > totals.limit) throw new VaultError("quota", 409);

  const id = randomUUID();
  const key = `v/${id}`;
  const mime = cleanMime(type);
  for (let n = 1; ; n++) {
    const { error } = await sb()
      .from("vault_items")
      .insert({ id, partition_id: partitionId, parent_id: parentId, kind: "file", name: n === 1 ? base : withSuffix(base, n), size, mime, object_key: key, status: "pending" });
    if (!error) break;
    if (error.code !== "23505" || n >= 50) throw dbError(error);
  }
  const { data, error } = await bucket().createSignedUploadUrl(key, { upsert: false });
  if (error || !data) {
    await sb().from("vault_items").delete().eq("id", id);
    throw new VaultError("upstream", 502, error?.message);
  }
  const publishable = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();
  return {
    id,
    url: data.signedUrl,
    headers: { "content-type": mime ?? "application/octet-stream", "x-upsert": "false", ...(publishable ? { apikey: publishable } : {}) },
  };
}

export async function completeUpload(id: string) {
  const row = ok(await sb().from("vault_items").select("id,partition_id,size,object_key,status").eq("id", id).maybeSingle());
  if (!row || row.status !== "pending" || !row.object_key) throw new VaultError("not_found", 404);
  const { data: info, error } = await bucket().info(row.object_key);
  if (error || !info) throw new VaultError("not_found", 404, error?.message);
  const actual = Number(info.size ?? row.size);
  if (actual !== Number(row.size)) {
    const { partitions } = await partitionsAndTotals();
    const p = partitions.find((x) => x.id === row.partition_id);
    if (p && p.used - Number(row.size) + actual > p.quota) {
      await abortUpload(id);
      throw new VaultError("quota", 409);
    }
  }
  ok(
    await sb()
      .from("vault_items")
      .update({ status: "ready", size: actual, mime: cleanMime(info.contentType) ?? undefined, updated_at: new Date().toISOString() })
      .eq("id", id),
  );
  return { ok: true };
}

export async function abortUpload(id: string) {
  const row = ok(await sb().from("vault_items").delete().eq("id", id).eq("status", "pending").select("object_key").maybeSingle());
  if (row?.object_key) await removeObjects([row.object_key]);
  return { ok: true };
}

export async function renameItem(id: string, rawName: unknown) {
  const rows = ok(
    await sb().from("vault_items").update({ name: cleanName(rawName), updated_at: new Date().toISOString() }).eq("id", id).eq("status", "ready").select("id"),
  );
  if (!rows?.length) throw new VaultError("not_found", 404);
  return { ok: true };
}

export async function moveItems(ids: string[], partitionId: string, parentId: string | null) {
  await assertFolder(partitionId, parentId);
  const rows = (ok(await sb().from("vault_items").select("id,partition_id,kind,size").in("id", ids).eq("status", "ready")) ?? []) as {
    id: string;
    partition_id: string;
    kind: string;
    size: number;
  }[];
  if (rows.length !== ids.length) throw new VaultError("not_found", 404);

  const target = await folderMap(partitionId);
  const chainOfTarget = new Set<string>();
  for (let f = parentId ? target.get(parentId) : undefined; f; f = f.parent_id ? target.get(f.parent_id) : undefined) chainOfTarget.add(f.id);

  // Work out what has to change partition and how many bytes that is.
  const moves: { id: string; descendants: string[] }[] = [];
  let incoming = 0;
  const sourceMaps = new Map<string, Map<string, FolderRow>>();
  for (const r of rows) {
    if (r.kind === "folder" && chainOfTarget.has(r.id)) throw bad(); // into itself / its own subtree
    if (r.partition_id === partitionId) {
      moves.push({ id: r.id, descendants: [] });
      continue;
    }
    if (r.kind === "file") {
      incoming += Number(r.size);
      moves.push({ id: r.id, descendants: [] });
      continue;
    }
    if (!sourceMaps.has(r.partition_id)) sourceMaps.set(r.partition_id, await folderMap(r.partition_id));
    const folders = [...subtreeFolders(sourceMaps.get(r.partition_id)!, r.id)];
    const files = await filesUnder(folders);
    incoming += files.reduce((s, f) => s + Number(f.size), 0);
    moves.push({ id: r.id, descendants: [...folders.filter((f) => f !== r.id), ...files.map((f) => f.id)] });
  }
  if (incoming) {
    const { partitions } = await partitionsAndTotals();
    const p = partitions.find((x) => x.id === partitionId);
    if (!p || p.used + incoming > p.quota) throw new VaultError("quota", 409);
  }

  const now = new Date().toISOString();
  for (const m of moves) {
    ok(await sb().from("vault_items").update({ partition_id: partitionId, parent_id: parentId, updated_at: now }).eq("id", m.id));
    for (let i = 0; i < m.descendants.length; i += 100) {
      ok(await sb().from("vault_items").update({ partition_id: partitionId }).in("id", m.descendants.slice(i, i + 100)));
    }
  }
  return { ok: true };
}

export async function deleteItems(ids: string[]) {
  const rows = (ok(await sb().from("vault_items").select("id,partition_id,kind,object_key").in("id", ids)) ?? []) as {
    id: string;
    partition_id: string;
    kind: string;
    object_key: string | null;
  }[];
  const keys = rows.map((r) => r.object_key).filter((k): k is string => !!k);
  const maps = new Map<string, Map<string, FolderRow>>();
  for (const r of rows.filter((x) => x.kind === "folder")) {
    if (!maps.has(r.partition_id)) maps.set(r.partition_id, await folderMap(r.partition_id));
    const files = await filesUnder([...subtreeFolders(maps.get(r.partition_id)!, r.id)]);
    keys.push(...files.map((f) => f.object_key).filter((k): k is string => !!k));
  }
  ok(await sb().from("vault_items").delete().in("id", ids)); // children cascade
  await removeObjects(keys);
  return { ok: true };
}

export async function links(id: string) {
  const row = ok(await sb().from("vault_items").select("name,object_key,kind,status").eq("id", id).maybeSingle());
  if (!row || row.kind !== "file" || row.status !== "ready" || !row.object_key) throw new VaultError("not_found", 404);
  const [view, download] = await Promise.all([
    bucket().createSignedUrl(row.object_key, LINK_TTL),
    bucket().createSignedUrl(row.object_key, LINK_TTL, { download: row.name }),
  ]);
  if (view.error || download.error) throw new VaultError("not_found", 404, (view.error ?? download.error)?.message);
  return { view: view.data.signedUrl, download: download.data.signedUrl };
}

// ---------- Appearance (owner only, this page only) ----------

export async function getAppearance(): Promise<{ appearance: Appearance; bgUrl: string | null }> {
  const { data, error } = await sb().from("vault_settings").select("data").eq("id", 1).maybeSingle();
  if (error) return { appearance: DEFAULT_APPEARANCE, bgUrl: null };
  const appearance = sanitizeAppearance(data?.data);
  let bgUrl: string | null = null;
  if (appearance.bg) bgUrl = (await bucket().createSignedUrl(appearance.bg, BG_TTL)).data?.signedUrl ?? null;
  return { appearance, bgUrl };
}

export async function saveAppearance(raw: unknown) {
  const appearance = sanitizeAppearance(raw);
  const prev = ok(await sb().from("vault_settings").select("data").eq("id", 1).maybeSingle());
  ok(await sb().from("vault_settings").upsert({ id: 1, data: appearance, updated_at: new Date().toISOString() }));
  const oldBg = sanitizeAppearance(prev?.data).bg;
  if (oldBg && oldBg !== appearance.bg) await removeObjects([oldBg]);
  return { ok: true };
}

export async function prepareBackground(type: unknown, size: unknown) {
  const mime = cleanMime(type);
  if (!mime?.startsWith("image/") || mime.includes("svg") || typeof size !== "number" || size <= 0) throw bad();
  if (size > MAX_BG_BYTES) throw new VaultError("too_large", 413);
  await ensureBucket();
  const key = `appearance/${randomUUID()}`;
  const { data, error } = await bucket().createSignedUploadUrl(key, { upsert: false });
  if (error || !data) throw new VaultError("upstream", 502, error?.message);
  const publishable = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();
  return { key, url: data.signedUrl, headers: { "content-type": mime, "x-upsert": "false", ...(publishable ? { apikey: publishable } : {}) } };
}

// ---------- Errors ----------

export function errorResponse(err: unknown): Response {
  const headers = { "Cache-Control": "no-store" };
  if (err instanceof VaultError) {
    if (err.status >= 500) console.error("[vault]", err.code, err.message);
    return Response.json({ error: err.code }, { status: err.status, headers });
  }
  console.error("[vault]", err);
  return Response.json({ error: "upstream" }, { status: 500, headers });
}
