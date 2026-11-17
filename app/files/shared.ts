// Types and constants shared by the server (app/lib/private-storage.ts) and the client UI.

export interface Partition {
  id: string;
  name: string;
  color: string;
  quota: number; // bytes
  used: number; // bytes (pending uploads included)
  files: number;
}

export interface Item {
  id: string;
  partitionId: string;
  parentId: string | null;
  kind: "folder" | "file";
  name: string;
  size: number;
  mime: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Crumb {
  id: string | null; // null = partition root
  name: string;
}

export interface Totals {
  limit: number; // max storage (PRIVATE_FILES_TOTAL_GB)
  used: number;
  allocated: number; // sum of partition quotas
  maxFile: number; // per-file limit (bucket limit)
}

export interface Listing {
  partitions: Partition[];
  totals: Totals;
  partitionId: string | null;
  folderId: string | null;
  crumbs: Crumb[];
  items: Item[];
  thumbs: Record<string, string>; // item id -> signed image URL
}

export interface Appearance {
  scene: string;
  accent: string;
  panel: number; // 0.4–0.97
  cards: number; // 0–1
  blur: number; // 0–28 px
  bright: number; // 0.2–1
  cursor: boolean;
  bg: string | null; // object key of an uploaded background image
}

export const DEFAULT_APPEARANCE: Appearance = {
  scene: "site",
  accent: "violet",
  panel: 0.78,
  cards: 0.88,
  blur: 10,
  bright: 0.6,
  cursor: false,
  bg: null,
};

export const SCENES: { id: string; css: string }[] = [
  {
    id: "site",
    css: "radial-gradient(1100px 600px at 15% -10%,rgba(155,89,182,.28),transparent 60%),radial-gradient(900px 520px at 100% 110%,rgba(108,92,231,.2),transparent 60%),#050508",
  },
  { id: "black", css: "#000" },
  { id: "graphite", css: "#161616" },
  { id: "wood", css: "repeating-linear-gradient(95deg,rgba(0,0,0,.12) 0 3px,transparent 3px 11px),linear-gradient(135deg,#3b2414,#7a4b2a 45%,#2a170c)" },
  { id: "ocean", css: "linear-gradient(160deg,#0b4f6c,#1a86ab)" },
  { id: "sunset", css: "linear-gradient(135deg,#5b1a8f,#d81b60 55%,#ff7043)" },
  { id: "deep", css: "linear-gradient(160deg,#08344a,#0d6680 50%,#063041)" },
  { id: "forest", css: "linear-gradient(160deg,#0f3d1e,#237a3b 60%,#0b2914)" },
  { id: "night", css: "radial-gradient(ellipse at 50% 0%,#1d2647,#070a14 70%)" },
  { id: "pastel", css: "linear-gradient(135deg,#f6d5f7,#c9e4ff)" },
  { id: "aqua", css: "linear-gradient(180deg,#c3f4f7,#5fd4e0)" },
  { id: "sand", css: "linear-gradient(160deg,#ead8bd,#c9a97f)" },
];

export const ACCENTS: { id: string; hex: string }[] = [
  { id: "white", hex: "#f5f5f5" },
  { id: "amber", hex: "#f2b84b" },
  { id: "rose", hex: "#f0607a" },
  { id: "violet", hex: "#a78bfa" },
  { id: "cyan", hex: "#22d3ee" },
  { id: "emerald", hex: "#34d399" },
];

export const accentHex = (id: string) => (ACCENTS.find((a) => a.id === id) ?? ACCENTS[3]).hex;

const clamp = (v: unknown, min: number, max: number, fallback: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;

/** Accepts anything (stored JSON, request body) and returns a valid Appearance. */
export function sanitizeAppearance(raw: unknown): Appearance {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const D = DEFAULT_APPEARANCE;
  const bg = typeof r.bg === "string" && /^appearance\/[0-9a-f-]{36}$/.test(r.bg) ? r.bg : null;
  const scene = r.scene === "custom" && bg ? "custom" : SCENES.some((s) => s.id === r.scene) ? (r.scene as string) : D.scene;
  return {
    scene,
    accent: ACCENTS.some((a) => a.id === r.accent) ? (r.accent as string) : D.accent,
    panel: clamp(r.panel, 0.4, 0.97, D.panel),
    cards: clamp(r.cards, 0, 1, D.cards),
    blur: clamp(r.blur, 0, 28, D.blur),
    bright: clamp(r.bright, 0.2, 1, D.bright),
    cursor: typeof r.cursor === "boolean" ? r.cursor : D.cursor,
    bg,
  };
}

export const GB = 1024 ** 3;

export function formatBytes(bytes: number, digits = 1): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / 1024 ** i;
  return `${value.toFixed(i === 0 || value >= 100 ? 0 : digits)} ${units[i]}`;
}

export type PreviewKind = "image" | "video" | "audio" | "pdf" | "text" | "docx" | "sheet" | "none";

export function previewKind(name: string, mime: string | null): PreviewKind {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  const m = (mime ?? "").toLowerCase();
  if (/^(jpe?g|png|gif|webp|avif|bmp|svg|heic|heif|ico)$/.test(ext) || m.startsWith("image/")) return "image";
  if (/^(mp4|m4v|mov|webm|ogv)$/.test(ext) || m.startsWith("video/")) return "video";
  if (/^(mp3|m4a|aac|wav|ogg|oga|flac|opus)$/.test(ext) || m.startsWith("audio/")) return "audio";
  if (ext === "pdf" || m === "application/pdf") return "pdf";
  if (ext === "docx") return "docx";
  if (/^(xlsx|xls|ods)$/.test(ext)) return "sheet";
  if (
    /^(txt|md|markdown|json|csv|tsv|log|xml|html?|css|scss|js|jsx|ts|tsx|mjs|cjs|py|java|c|cpp|h|cs|go|rs|rb|php|sh|ps1|bat|yml|yaml|toml|ini|env|sql|svelte|vue|kt|swift|dart|lua|r|tex|srt|vtt)$/.test(ext) ||
    m.startsWith("text/") ||
    m === "application/json"
  )
    return "text";
  return "none";
}
