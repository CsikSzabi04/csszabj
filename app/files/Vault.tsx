"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type DragEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  IdCard,
  LogOut,
  Newspaper,
  User,
  Wrench,
  Check,
  ChevronRight,
  CircleAlert,
  Download,
  Ellipsis,
  File as FileIcon,
  FileArchive,
  FileCode,
  FileImage,
  FileMusic,
  FilePlay,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderInput,
  FolderPlus,
  FolderUp,
  HardDrive,
  LayoutGrid,
  List,
  LoaderCircle,
  Menu,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  SquareCheck,
  Trash,
  Upload,
  X,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ACCENTS, GB, SCENES, accentHex, formatBytes, previewKind, type Appearance, type Item, type Listing, type Partition } from "./shared";
import { ApiError, STR, api, fmt, xhrPut, type Strings } from "./client";
import AppearancePanel from "./AppearancePanel";

const Preview = dynamic(() => import("./Preview"), { ssr: false });

type Props = {
  initial: Listing | null;
  initialError: string | null;
  initialAppearance: Appearance;
  initialBgUrl: string | null;
};
type Task = { key: string; name: string; size: number; loaded: number; state: "queued" | "uploading" | "done" | "error"; error?: string };
type Job = { key: string; file: File; p: string; f: string | null; dir: string[] };
type Found = { q: string; items: Item[]; where: Record<string, string>; thumbs: Record<string, string> };
type Dialog =
  | { t: "folder" }
  | { t: "rename"; item: Item }
  | { t: "partition"; part?: Partition }
  | { t: "move"; ids: string[] }
  | { t: "delete"; ids: string[] }
  | { t: "deletePartition"; part: Partition };
type MenuState = { item: Item | null; x: number; y: number; sheet: boolean; fromButton: boolean }; // item null = background menu

// ClimarkAI's arrow cursor (triangle, no tail); hotspots scale with the size (12,10 @32 → 16,13 @44 → 20,16 @52).
const CURSOR_PATH =
  "%3Cpath d='M12 10L26.5 19.2L19.4 21L16.6 28.4Z' fill='%23fff' stroke='%23000' stroke-width='2' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E";
const cursorSvg = (px: number) => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${px}' height='${px}' viewBox='0 0 32 32'%3E${CURSOR_PATH}")`;
const CURSOR_CSS = `
.vault{--cur:${cursorSvg(44)} 16 13,default;--cur-click:${cursorSvg(52)} 20 16,pointer}
.vault,.vault *{cursor:var(--cur)}
.vault :is(button:not(:disabled),a[href],select,label,summary,[role=menuitem],[role=listitem],[role=switch],input[type=range],input[type=file]){cursor:var(--cur-click)}
.vault :is(input:not([type=range]):not([type=file]),textarea){cursor:text}
.vault button:disabled{cursor:var(--cur)}`;

// The site navigation lives in the sidebar here (the global header is hidden on /files).
const SITE_NAV = [
  { href: "/about", key: "nav.about", icon: User },
  { href: "/projects", key: "nav.projects", icon: Briefcase },
  { href: "/blog", key: "nav.blog", icon: Newspaper },
  { href: "/cv", key: "nav.cv", icon: IdCard },
  { href: "/tools", key: "nav.tools", icon: Wrench },
] as const;

// ---------- small helpers ----------

const prefMem = new Map<string, string>();
const prefSubs = new Set<() => void>();
function usePref<T extends string>(key: string, allowed: readonly T[]): [T, (v: T) => void] {
  const value = useSyncExternalStore(
    (cb) => {
      prefSubs.add(cb);
      return () => prefSubs.delete(cb);
    },
    () => {
      let v = prefMem.get(key);
      if (v === undefined) {
        try {
          v = localStorage.getItem(key) ?? undefined;
        } catch {}
      }
      return allowed.includes(v as T) ? (v as T) : allowed[0];
    },
    () => allowed[0],
  );
  const set = useCallback(
    (v: T) => {
      prefMem.set(key, v);
      try {
        localStorage.setItem(key, v);
      } catch {}
      prefSubs.forEach((cb) => cb());
    },
    [key],
  );
  return [value, set];
}

async function readEntries(entries: FileSystemEntry[], dir: string[] = []): Promise<{ file: File; dir: string[] }[]> {
  const out: { file: File; dir: string[] }[] = [];
  for (const en of entries) {
    if (en.isFile) {
      out.push({ file: await new Promise<File>((res, rej) => (en as FileSystemFileEntry).file(res, rej)), dir });
    } else if (en.isDirectory) {
      const reader = (en as FileSystemDirectoryEntry).createReader();
      const children: FileSystemEntry[] = [];
      for (;;) {
        const batch = await new Promise<FileSystemEntry[]>((res, rej) => reader.readEntries(res, rej));
        if (!batch.length) break;
        children.push(...batch);
      }
      out.push(...(await readEntries(children, [...dir, en.name])));
    }
  }
  return out;
}

function KindIcon({ item, className = "h-5 w-5" }: { item: Item; className?: string }) {
  if (item.kind === "folder") return <Folder className={`${className} text-[#f2c14e]`} fill="currentColor" fillOpacity={0.22} />;
  const ext = item.name.toLowerCase().split(".").pop() ?? "";
  if (/^(zip|rar|7z|tar|gz|tgz|bz2|xz)$/.test(ext)) return <FileArchive className={`${className} text-amber-300`} />;
  switch (previewKind(item.name, item.mime)) {
    case "image":
      return <FileImage className={`${className} text-sky-300`} />;
    case "video":
      return <FilePlay className={`${className} text-rose-300`} />;
    case "audio":
      return <FileMusic className={`${className} text-violet-300`} />;
    case "pdf":
      return <FileText className={`${className} text-red-400`} />;
    case "docx":
      return <FileText className={`${className} text-blue-400`} />;
    case "sheet":
      return <FileSpreadsheet className={`${className} text-emerald-400`} />;
    case "text":
      return <FileCode className={`${className} text-neutral-300`} />;
    default:
      return <FileIcon className={`${className} text-neutral-400`} />;
  }
}

function Bar({ used, total, color }: { used: number; total: number; color: string }) {
  const pct = total ? Math.min(100, (used / total) * 100) : 0;
  return (
    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[.08]">
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: pct > 90 ? "#f0607a" : color }} />
    </div>
  );
}

function Modal({ title, onClose, children, footer }: { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md rounded-t-2xl border border-white/10 bg-[#1b1b1e] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:pb-4"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-[#ececec]">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#9b9b9b] hover:bg-white/5 hover:text-white" aria-label="×">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

const btn = "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors disabled:opacity-40";
const btnGhost = `${btn} text-[#cfcfcf] hover:bg-white/[.06]`;
const btnPrimary = `${btn} bg-[var(--v-accent)] text-black hover:brightness-110`;
const btnDanger = `${btn} bg-[#f0607a] text-black hover:brightness-110`;
const iconBtn = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#b5b5b5] transition-colors hover:bg-white/[.07] hover:text-white";
const field =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-[#ececec] outline-none placeholder:text-[#6f6f6f] focus:border-[color-mix(in_srgb,var(--v-accent)_55%,transparent)]";

function NameDialog({ title, initial, cta, s, onClose, onSubmit }: { title: string; initial: string; cta: string; s: Strings; onClose: () => void; onSubmit: (v: string) => Promise<void> }) {
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const dot = initial.lastIndexOf(".");
    el.setSelectionRange(0, dot > 0 ? dot : initial.length);
  }, [initial]);
  const go = async () => {
    if (!value.trim() || busy) return;
    setBusy(true);
    await onSubmit(value.trim());
    setBusy(false);
  };
  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>
            {s.cancel}
          </button>
          <button type="button" className={btnPrimary} disabled={!value.trim() || busy} onClick={go}>
            {busy && <LoaderCircle className="h-4 w-4 animate-spin" />} {cta}
          </button>
        </>
      }
    >
      <input
        ref={ref}
        className={field}
        value={value}
        maxLength={255}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()}
        aria-label={s.name}
      />
    </Modal>
  );
}

function PartitionDialog({
  part,
  totals,
  canDelete,
  s,
  onClose,
  onSubmit,
  onDelete,
}: {
  part?: Partition;
  totals: Listing["totals"];
  canDelete: boolean;
  s: Strings;
  onClose: () => void;
  onSubmit: (v: { name: string; quota: number; color: string }) => Promise<void>;
  onDelete: () => void;
}) {
  const free = totals.limit - totals.allocated + (part?.quota ?? 0);
  const [name, setName] = useState(part?.name ?? "");
  const [gb, setGb] = useState(String(+((part?.quota ?? Math.max(0, free)) / GB).toFixed(2)));
  const [color, setColor] = useState(part?.color ?? "cyan");
  const [busy, setBusy] = useState(false);
  const bytes = Math.round(Number(gb.replace(",", ".")) * GB);
  const valid = name.trim() && bytes >= 1024 * 1024 && bytes <= free && bytes >= (part?.used ?? 0);
  return (
    <Modal
      title={part ? s.editPartition : s.newPartition}
      onClose={onClose}
      footer={
        <>
          {part && (
            <button type="button" className={`${btnGhost} mr-auto text-[#f0607a]`} disabled={!canDelete} onClick={onDelete}>
              <Trash className="h-4 w-4" /> {s.delete}
            </button>
          )}
          <button type="button" className={btnGhost} onClick={onClose}>
            {s.cancel}
          </button>
          <button
            type="button"
            className={btnPrimary}
            disabled={!valid || busy}
            onClick={async () => {
              setBusy(true);
              await onSubmit({ name: name.trim(), quota: bytes, color });
              setBusy(false);
            }}
          >
            {s.save}
          </button>
        </>
      }
    >
      <label className="mb-1 block text-[12px] text-[#9b9b9b]">{s.name}</label>
      <input className={field} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} autoFocus />
      <label className="mb-1 mt-3 block text-[12px] text-[#9b9b9b]">{s.quota}</label>
      <input className={field} inputMode="decimal" value={gb} onChange={(e) => setGb(e.target.value)} />
      <p className="mt-1 text-[11.5px] text-[#8a8a8a]">
        {fmt(s.quotaHelp, { x: formatBytes(Math.max(0, free)), limit: formatBytes(totals.limit) })}
        {part ? ` · ${formatBytes(part.used)} ✓` : ""}
      </p>
      <label className="mb-1.5 mt-3 block text-[12px] text-[#9b9b9b]">{s.color}</label>
      <div className="flex gap-2">
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-label={a.id}
            onClick={() => setColor(a.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 ring-offset-[#1b1b1e]"
            style={{ background: a.hex, boxShadow: color === a.id ? `0 0 0 2px #1b1b1e, 0 0 0 4px ${a.hex}` : undefined }}
          >
            {color === a.id && <Check className="h-4 w-4 text-black" />}
          </button>
        ))}
      </div>
    </Modal>
  );
}

function MoveDialog({ ids, start, partitions, s, onClose, onMove }: {
  ids: string[];
  start: { p: string; f: string | null };
  partitions: Partition[];
  s: Strings;
  onClose: () => void;
  onMove: (p: string, f: string | null) => Promise<void>;
}) {
  const [loc, setLoc] = useState(start);
  const [view, setView] = useState<{ crumbs: Listing["crumbs"]; folders: Item[] } | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let alive = true;
    api<Listing>(`?p=${loc.p}${loc.f ? `&f=${loc.f}` : ""}`)
      .then((d) => alive && setView({ crumbs: d.crumbs, folders: d.items.filter((i) => i.kind === "folder" && !ids.includes(i.id)) }))
      .catch(() => alive && setView({ crumbs: [], folders: [] }));
    return () => {
      alive = false;
    };
  }, [loc, ids]);
  return (
    <Modal
      title={s.move}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnGhost} onClick={onClose}>
            {s.cancel}
          </button>
          <button
            type="button"
            className={btnPrimary}
            disabled={busy || !view}
            onClick={async () => {
              setBusy(true);
              await onMove(loc.p, loc.f);
              setBusy(false);
            }}
          >
            <FolderInput className="h-4 w-4" /> {s.moveHere}
          </button>
        </>
      }
    >
      <select className={field} value={loc.p} onChange={(e) => setLoc({ p: e.target.value, f: null })} aria-label={s.partitions}>
        {partitions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <div className="mt-2 flex flex-wrap items-center gap-0.5 text-[12.5px] text-[#9b9b9b]">
        {view?.crumbs.map((c, i) => (
          <span key={c.id ?? "root"} className="flex items-center">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            <button type="button" className="rounded px-1 py-0.5 hover:bg-white/5 hover:text-white" onClick={() => setLoc({ p: loc.p, f: c.id })}>
              {c.name}
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-white/[.07] bg-black/20" data-lenis-prevent>
        {!view ? (
          <div className="flex justify-center p-6">
            <LoaderCircle className="h-5 w-5 animate-spin text-[#8a8a8a]" />
          </div>
        ) : view.folders.length ? (
          view.folders.map((f) => (
            <button
              type="button"
              key={f.id}
              onClick={() => setLoc({ p: loc.p, f: f.id })}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] hover:bg-white/5"
            >
              <KindIcon item={f} className="h-4.5 w-4.5" /> <span className="truncate">{f.name}</span>
              <ChevronRight className="ml-auto h-4 w-4 text-[#6f6f6f]" />
            </button>
          ))
        ) : (
          <p className="p-4 text-center text-[12.5px] text-[#7a7a7a]">—</p>
        )}
      </div>
    </Modal>
  );
}

// ---------- main ----------

export default function Vault({ initial, initialError, initialAppearance, initialBgUrl }: Props) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const s = STR[language];
  const [data, setData] = useState(initial);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const [view, setView] = usePref("vault.view", ["list", "grid"] as const);
  const [sort, setSort] = usePref("vault.sort", ["name", "date", "size"] as const);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<Found | null>(null);
  const [nonce, setNonce] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [addMenu, setAddMenu] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [showLook, setShowLook] = useState(false);
  const [look, setLook] = useState(initialAppearance);
  const [bgUrl, setBgUrl] = useState(initialBgUrl);
  const [toast, setToast] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const locRef = useRef({ p: initial?.partitionId ?? null, f: initial?.folderId ?? null });
  const queue = useRef<Job[]>([]);
  const active = useRef(0);
  const seq = useRef(0);
  const xhrs = useRef(new Map<string, XMLHttpRequest>());
  const dirCache = useRef(new Map<string, Promise<string>>());
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(language === "en" ? "en-GB" : "hu-HU", { year: "numeric", month: "short", day: "numeric" }),
    [language],
  );

  // ----- page chrome: no body scroll behind the app, URL ↔ location -----
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const fail = useCallback(
    (e: unknown) => {
      const code = e instanceof ApiError ? e.code : "upstream";
      if (code === "unauthorized") {
        window.dispatchEvent(new Event("auth:changed"));
        router.replace("/login");
        return;
      }
      setToast(fmt(s.err[code] ?? s.err.upstream, { max: formatBytes(data?.totals.maxFile ?? 0) }));
    },
    [router, s, data?.totals.maxFile],
  );

  const load = useCallback(
    async (p: string | null, f: string | null, history: "push" | "replace" | null = null) => {
      setLoading(true);
      try {
        const d = await api<Listing>(`?${new URLSearchParams({ ...(p ? { p } : {}), ...(f ? { f } : {}) })}`);
        locRef.current = { p: d.partitionId, f: d.folderId };
        setData(d);
        setError(null);
        if (history) {
          const url = `/files?p=${d.partitionId}${d.folderId ? `&f=${d.folderId}` : ""}`;
          if (history === "push") window.history.pushState(null, "", url);
          else window.history.replaceState(null, "", url);
        }
      } catch (e) {
        if (e instanceof ApiError && (e.code === "setup_required" || e.code === "not_configured")) setError(e.code);
        else fail(e);
      } finally {
        setLoading(false);
      }
    },
    [fail],
  );

  const refresh = useCallback(() => {
    setNonce((n) => n + 1);
    return load(locRef.current.p, locRef.current.f);
  }, [load]);

  const refreshSoon = useCallback(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(refresh, 350);
  }, [refresh]);

  const go = useCallback(
    (p: string, f: string | null) => {
      setQuery("");
      setFound(null);
      setDrawer(false);
      setSelected(new Set());
      setSelectMode(false);
      load(p, f, "push");
    },
    [load],
  );

  useEffect(() => {
    const onPop = () => {
      const sp = new URLSearchParams(window.location.search);
      setSelected(new Set());
      load(sp.get("p"), sp.get("f"));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [load]);

  // ----- search (debounced, across every partition) -----
  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const t = setTimeout(async () => {
      try {
        const r = await api<Omit<Found, "q">>(`?q=${encodeURIComponent(q)}`);
        setFound({ q, ...r });
      } catch (e) {
        fail(e);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, nonce, fail]);

  // ----- cursor light -----
  useEffect(() => {
    const root = rootRef.current;
    if (!look.cursor || !root || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    root.addEventListener("pointermove", onMove);
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [look.cursor]);

  // ----- appearance (saved to the profile, debounced) -----
  const updateLook = useCallback(
    (patch: Partial<Appearance>, now = false) => {
      setLook((prev) => {
        const next = { ...prev, ...patch };
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => api({ action: "appearance.save", appearance: next }).catch(fail), now ? 0 : 500);
        return next;
      });
    },
    [fail],
  );

  // ----- uploads -----
  const patchTask = useCallback((key: string, patch: Partial<Task>) => setTasks((ts) => ts.map((t) => (t.key === key ? { ...t, ...patch } : t))), []);

  const ensureDir = useCallback((p: string, f: string | null, dir: string[]): Promise<string | null> => {
    let parent: Promise<string | null> = Promise.resolve(f);
    dir.forEach((name, i) => {
      const key = `${p}|${f}|${dir.slice(0, i + 1).join("/")}`;
      let pr = dirCache.current.get(key);
      if (!pr) {
        const prev = parent;
        pr = prev.then((parentId) => api<{ id: string }>({ action: "folder", partitionId: p, parentId, name, reuse: true }).then((r) => r.id));
        dirCache.current.set(key, pr);
        pr.catch(() => dirCache.current.delete(key));
      }
      parent = pr;
    });
    return parent;
  }, []);

  const runJob = useCallback(
    async (job: Job) => {
      patchTask(job.key, { state: "uploading" });
      let id: string | null = null;
      try {
        const parentId = job.dir.length ? await ensureDir(job.p, job.f, job.dir) : job.f;
        const target = await api<{ id: string; url: string; headers: Record<string, string> }>({
          action: "upload",
          partitionId: job.p,
          parentId,
          name: job.file.name,
          size: job.file.size,
          type: job.file.type,
        });
        id = target.id;
        await xhrPut(target.url, job.file, target.headers, (loaded) => patchTask(job.key, { loaded }), (x) => xhrs.current.set(job.key, x));
        await api({ action: "complete", id });
        patchTask(job.key, { state: "done", loaded: job.file.size });
      } catch (e) {
        if (id) api({ action: "abort", id }).catch(() => {});
        const code = e instanceof ApiError ? e.code : "upstream";
        if (code === "unauthorized") fail(e);
        patchTask(job.key, { state: "error", error: code });
      } finally {
        xhrs.current.delete(job.key);
      }
    },
    [ensureDir, fail, patchTask],
  );

  // Up to 3 workers drain the queue; each one starts synchronously, so the loop sees the shifted queue.
  const pump = useCallback(() => {
    const worker = async () => {
      while (queue.current.length) {
        const job = queue.current.shift()!;
        await runJob(job);
        if (job.p === locRef.current.p) refreshSoon();
      }
      active.current--;
    };
    while (active.current < 3 && queue.current.length) {
      active.current++;
      void worker();
    }
  }, [runJob, refreshSoon]);

  const enqueue = useCallback(
    (entries: { file: File; dir: string[] }[]) => {
      const p = locRef.current.p;
      if (!p || !entries.length || !data) return;
      const f = locRef.current.f;
      const max = data.totals.maxFile;
      const jobs: Job[] = entries.map(({ file, dir }) => ({ key: String(++seq.current), file, p, f, dir }));
      setTasks((ts) => [
        ...ts.filter((t) => t.state !== "done"),
        ...jobs.map((j): Task => {
          const tooBig = j.file.size > max;
          return { key: j.key, name: j.file.name, size: j.file.size, loaded: 0, state: tooBig ? "error" : "queued", error: tooBig ? "too_large" : undefined };
        }),
      ]);
      queue.current.push(...jobs.filter((j) => j.file.size <= max));
      pump();
    },
    [data, pump],
  );

  const cancelTask = (key: string) => {
    queue.current = queue.current.filter((j) => j.key !== key);
    const x = xhrs.current.get(key);
    if (x) x.abort();
    else patchTask(key, { state: "error", error: "aborted" });
  };

  const onDrop = async (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const entries = Array.from(e.dataTransfer.items)
      .map((i) => (i.kind === "file" ? i.webkitGetAsEntry?.() : null))
      .filter((x): x is FileSystemEntry => !!x);
    if (entries.length) {
      try {
        enqueue(await readEntries(entries));
      } catch {
        fail(new ApiError("upstream"));
      }
    } else {
      enqueue(Array.from(e.dataTransfer.files).map((file) => ({ file, dir: [] })));
    }
  };

  // ----- item actions -----
  const act = useCallback(
    async (body: object) => {
      try {
        await api(body);
        await refresh();
        return true;
      } catch (e) {
        fail(e);
        return false;
      }
    },
    [fail, refresh],
  );

  const download = useCallback(
    async (item: Item) => {
      try {
        const { download: url } = await api<{ download: string }>({ action: "link", id: item.id });
        const a = document.createElement("a");
        a.href = url;
        a.rel = "noopener";
        document.body.append(a);
        a.click();
        a.remove();
      } catch (e) {
        fail(e);
      }
    },
    [fail],
  );

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    window.dispatchEvent(new Event("auth:changed"));
    router.replace("/");
    router.refresh();
  };

  const items = useMemo(() => {
    const list = found ? found.items : (data?.items ?? []);
    const cmp = (a: Item, b: Item) =>
      sort === "date"
        ? b.updatedAt.localeCompare(a.updatedAt)
        : sort === "size"
          ? b.size - a.size
          : a.name.localeCompare(b.name, language, { numeric: true, sensitivity: "base" });
    return [...list].sort((a, b) => (a.kind === b.kind ? cmp(a, b) : a.kind === "folder" ? -1 : 1));
  }, [found, data?.items, sort, language]);
  const thumbs = found ? found.thumbs : (data?.thumbs ?? {});
  const files = useMemo(() => items.filter((i) => i.kind === "file"), [items]);
  const previewIndex = previewId ? files.findIndex((f) => f.id === previewId) : -1;

  const open = (item: Item) => (item.kind === "folder" ? go(item.partitionId, item.id) : setPreviewId(item.id));
  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const selecting = selectMode || selected.size > 0;
  const clearSelection = () => {
    setSelected(new Set());
    setSelectMode(false);
  };
  const selectedItems = items.filter((i) => selected.has(i.id));

  const openMenu = (item: Item, e: ReactMouseEvent, fromButton: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    const sheet = window.matchMedia("(max-width: 639px)").matches;
    const r = fromButton ? (e.currentTarget as HTMLElement).getBoundingClientRect() : null;
    setMenu({ item, sheet: sheet && fromButton, fromButton, x: r ? r.right : e.clientX, y: r ? r.bottom + 4 : e.clientY });
  };

  // Right-click anywhere else: our own menu (native one only inside text fields).
  const onRootContextMenu = (e: ReactMouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest("input:not([type=range]),textarea,[contenteditable=true]")) return;
    e.preventDefault();
    if (!data || error || el.closest("[role=dialog],[role=menu]")) return;
    setMenu({ item: null, sheet: false, fromButton: false, x: e.clientX, y: e.clientY });
  };

  // ----- keyboard: Delete removes the selection, Escape clears it -----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (dialog || previewId || menu || (e.target as HTMLElement)?.closest?.("input,textarea,select")) return;
      if (e.key === "Escape" && selected.size) clearSelection();
      if (e.key === "Delete" && selected.size) setDialog({ t: "delete", ids: [...selected] });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, previewId, menu, selected]);

  // ----- styles -----
  const scene = look.scene === "custom" && bgUrl ? `center / cover no-repeat url("${bgUrl}"), #000` : (SCENES.find((x) => x.id === look.scene) ?? SCENES[0]).css;
  const vars = {
    "--v-accent": accentHex(look.accent),
    "--v-panel": String(look.panel),
    "--v-cards": String(look.cards),
  } as CSSProperties;

  // ----- render pieces -----
  const crumbs = found ? [{ id: "search", name: fmt(s.results, { q: found.q }) }] : (data?.crumbs ?? []);
  const depth = data?.crumbs.length ?? 0;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={language === "en" ? "CsSz – home" : "CsSz – főoldal"}>
          <span className="relative h-8 w-8 drop-shadow-[0_0_8px_rgba(155,89,182,0.45)] transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
            <Image src="/02.png" alt="" fill sizes="32px" className="object-contain" />
          </span>
          <span className="text-[16px] font-bold uppercase tracking-[.22em] text-white">CsSz</span>
        </Link>
      </div>
      <div className="px-4 pb-1.5 text-[11px] font-semibold uppercase tracking-[.14em] text-[#8a8a8a]">{s.site}</div>
      <nav className="space-y-0.5 px-2" aria-label={s.site}>
        {SITE_NAV.map(({ href, key, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] text-[#bdbdbd] transition-colors hover:bg-white/[.05] hover:text-white"
          >
            <Icon className="h-4 w-4 text-[#7d7d7d] transition-colors group-hover:text-[var(--v-accent)]" /> {t(key)}
          </Link>
        ))}
      </nav>
      <div className="mx-4 my-3 h-px shrink-0 bg-white/[.06]" />
      {data && (
      <>
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#8a8a8a]">{s.partitions}</span>
        <button type="button" className={`${iconBtn} h-7 w-7`} onClick={() => setDialog({ t: "partition" })} aria-label={s.newPartition} title={s.newPartition}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2" data-lenis-prevent>
        {data.partitions.map((p) => {
          const on = p.id === data.partitionId && !found;
          return (
            <div key={p.id} className={`group rounded-xl px-2.5 py-2 transition-colors ${on ? "bg-white/[.075]" : "hover:bg-white/[.04]"}`}>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => go(p.id, null)} className="flex min-w-0 flex-1 items-center gap-2.5 py-0.5 text-left">
                  <HardDrive className="h-4 w-4 shrink-0" style={{ color: accentHex(p.color) }} />
                  <span className={`truncate text-[13.5px] ${on ? "text-white" : "text-[#cfcfcf]"}`}>{p.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDialog({ t: "partition", part: p })}
                  className="rounded-md p-1 text-[#8a8a8a] opacity-100 hover:bg-white/10 hover:text-white lg:opacity-0 lg:group-hover:opacity-100"
                  aria-label={`${s.edit}: ${p.name}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
              <Bar used={p.used} total={p.quota} color={accentHex(p.color)} />
              <div className="mt-1 flex justify-between text-[11px] text-[#8a8a8a]">
                <span>
                  {formatBytes(p.used)} / {formatBytes(p.quota)}
                </span>
                <span>{fmt(s.items, { n: p.files })}</span>
              </div>
            </div>
          );
        })}
      </nav>
      <div className="border-t border-white/[.06] p-4">
        <div className="flex items-center justify-between text-[12px] text-[#cfcfcf]">
          <span className="font-medium">{s.storage}</span>
          <span>
            {formatBytes(data.totals.used)} / {formatBytes(data.totals.limit)}
          </span>
        </div>
        <Bar used={data.totals.used} total={data.totals.limit} color="var(--v-accent)" />
        <p className="mt-1.5 text-[11px] text-[#7d7d7d]">{fmt(s.unallocated, { x: formatBytes(Math.max(0, data.totals.limit - data.totals.allocated)) })}</p>
      </div>
      </>
      )}
      <div className={`shrink-0 px-2 pb-3 ${data ? "" : "mt-auto"}`}>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-[#9b9b9b] transition-colors hover:bg-white/[.05] hover:text-white"
        >
          <LogOut className="h-4 w-4" /> {s.logout}
        </button>
      </div>
    </div>
  );

  const searchBox = (
    <label className="relative flex min-w-0 items-center">
      <Search className="pointer-events-none absolute left-2.5 h-4 w-4 text-[#7d7d7d]" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!e.target.value.trim()) setFound(null);
        }}
        placeholder={s.search}
        aria-label={s.search}
        className="h-9 w-full rounded-lg border border-white/[.08] bg-black/25 pl-8 pr-2 text-[#ececec] outline-none placeholder:text-[#6f6f6f] focus:border-[color-mix(in_srgb,var(--v-accent)_55%,transparent)]"
      />
    </label>
  );

  const rowMeta = (item: Item) => (item.kind === "folder" ? dateFmt.format(new Date(item.updatedAt)) : `${formatBytes(item.size)} · ${dateFmt.format(new Date(item.updatedAt))}`);

  const checkbox = (item: Item) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(item.id);
      }}
      aria-label={s.select}
      aria-pressed={selected.has(item.id)}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
        selected.has(item.id) ? "border-transparent bg-[var(--v-accent)] text-black" : "border-white/25 bg-black/20 text-transparent hover:border-white/50"
      }`}
    >
      <Check className="h-3.5 w-3.5" />
    </button>
  );

  const listView = (
    <div className="vsec overflow-hidden rounded-xl" role="list">
      <div className="hidden grid-cols-[28px_minmax(0,1fr)_110px_130px_40px] items-center gap-3 border-b border-white/[.06] px-3 py-2 text-[11px] uppercase tracking-[.12em] text-[#7d7d7d] sm:grid">
        <span />
        <span>{s.name}</span>
        <span>{s.size}</span>
        <span className="hidden md:block">{s.modified}</span>
        <span />
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          onClick={() => (selecting ? toggle(item.id) : open(item))}
          onContextMenu={(e) => openMenu(item, e, false)}
          className={`vrow grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_40px] items-center gap-3 border-b border-white/[.04] px-3 py-2.5 last:border-0 sm:grid-cols-[28px_minmax(0,1fr)_110px_130px_40px] sm:py-2 ${
            selected.has(item.id) ? "bg-[color-mix(in_srgb,var(--v-accent)_12%,transparent)]" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={selecting ? "flex" : "hidden sm:flex"}>{checkbox(item)}</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/[.04] sm:hidden">
              {thumbs[item.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbs[item.id]} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <KindIcon item={item} />
              )}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="hidden sm:inline-flex">
                <KindIcon item={item} className="h-[18px] w-[18px]" />
              </span>
              <span className="truncate text-[14px] text-[#e6e6e6] sm:text-[13.5px]">{item.name}</span>
            </div>
            <div className="truncate text-[11.5px] text-[#7d7d7d] sm:hidden">{found ? found.where[item.id] : rowMeta(item)}</div>
            {found && <div className="hidden truncate text-[11.5px] text-[#7d7d7d] sm:block">{found.where[item.id]}</div>}
          </div>
          <span className="hidden text-[12.5px] text-[#9b9b9b] sm:block">{item.kind === "file" ? formatBytes(item.size) : "—"}</span>
          <span className="hidden text-[12.5px] text-[#9b9b9b] md:block">{dateFmt.format(new Date(item.updatedAt))}</span>
          <span className="hidden sm:block md:hidden" />
          <button type="button" className={`${iconBtn} justify-self-end`} onClick={(e) => openMenu(item, e, true)} aria-label={`${s.more}: ${item.name}`}>
            <Ellipsis className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );

  const gridView = (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6" role="list">
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          onClick={() => (selecting ? toggle(item.id) : open(item))}
          onContextMenu={(e) => openMenu(item, e, false)}
          className={`vsec group relative cursor-pointer overflow-hidden rounded-xl border transition-colors ${
            selected.has(item.id) ? "border-[var(--v-accent)]" : "border-white/[.05] hover:border-white/15"
          }`}
        >
          <div className="flex aspect-[4/3] items-center justify-center bg-black/20">
            {thumbs[item.id] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbs[item.id]} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <KindIcon item={item} className="h-10 w-10" />
            )}
          </div>
          <div className="px-2.5 py-2">
            <div className="truncate text-[13px] text-[#e6e6e6]">{item.name}</div>
            <div className="truncate text-[11px] text-[#7d7d7d]">{found ? found.where[item.id] : rowMeta(item)}</div>
          </div>
          <span className={`absolute left-2 top-2 ${selecting ? "flex" : "hidden sm:group-hover:flex"}`}>{checkbox(item)}</span>
          <button
            type="button"
            className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-black/45 text-white/85 backdrop-blur hover:bg-black/70"
            onClick={(e) => openMenu(item, e, true)}
            aria-label={`${s.more}: ${item.name}`}
          >
            <Ellipsis className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );

  type ActionId =
    | "open"
    | "download"
    | "rename"
    | "move"
    | "select"
    | "delete"
    | "newFolder"
    | "uploadFiles"
    | "uploadFolder"
    | "view"
    | "selectAll"
    | "refresh"
    | "appearance";
  const menuActions = (item: Item | null): { id: ActionId; icon: typeof Folder; label: string; danger?: boolean }[] =>
    !item
      ? [
          { id: "newFolder", icon: FolderPlus, label: s.newFolder },
          { id: "uploadFiles", icon: Upload, label: s.uploadFiles },
          { id: "uploadFolder", icon: FolderUp, label: s.uploadFolder },
          { id: "view", icon: view === "list" ? LayoutGrid : List, label: view === "list" ? s.grid : s.list },
          ...(items.length ? [{ id: "selectAll" as const, icon: SquareCheck, label: s.selectAll }] : []),
          { id: "refresh", icon: RotateCcw, label: s.refresh },
          { id: "appearance", icon: Settings2, label: s.appearance },
        ]
      : [
    { id: "open", icon: item.kind === "folder" ? Folder : Search, label: s.open },
    ...(item.kind === "file" ? [{ id: "download" as const, icon: Download, label: s.download }] : []),
    { id: "rename", icon: Pencil, label: s.rename },
    { id: "move", icon: FolderInput, label: s.move },
    { id: "select", icon: SquareCheck, label: s.select },
    { id: "delete", icon: Trash, label: s.delete, danger: true },
  ];
  const runAction = (id: ActionId, item: Item | null) => {
    setMenu(null);
    if (id === "newFolder") setDialog({ t: "folder" });
    else if (id === "uploadFiles") fileInput.current?.click();
    else if (id === "uploadFolder") folderInput.current?.click();
    else if (id === "view") setView(view === "list" ? "grid" : "list");
    else if (id === "selectAll") setSelected(new Set(items.map((i) => i.id)));
    else if (id === "refresh") refresh();
    else if (id === "appearance") setShowLook(true);
    else if (!item) return;
    else if (id === "open") open(item);
    else if (id === "download") download(item);
    else if (id === "rename") setDialog({ t: "rename", item });
    else if (id === "move") setDialog({ t: "move", ids: [item.id] });
    else if (id === "delete") setDialog({ t: "delete", ids: [item.id] });
    else {
      setSelectMode(true);
      toggle(item.id);
    }
  };

  // ----- error / setup screens -----
  const errorScreen = error && (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md text-center">
        <CircleAlert className="mx-auto mb-3 h-10 w-10 text-[var(--v-accent)]" />
        <h1 className="mb-2 text-lg font-semibold text-white">
          {error === "setup_required" ? s.setupTitle : error === "not_configured" ? s.configTitle : s.err[error] ?? s.err.upstream}
        </h1>
        {(error === "setup_required" || error === "not_configured") && (
          <p className="text-[13.5px] leading-relaxed text-[#a5a5a5]">{error === "setup_required" ? s.setupBody : s.configBody}</p>
        )}
        <button type="button" className={`${btnPrimary} mt-5`} onClick={() => load(locRef.current.p, locRef.current.f)}>
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />} {s.retry}
        </button>
      </div>
    </div>
  );

  const busyUploads = tasks.filter((t) => t.state === "queued" || t.state === "uploading");
  const totalBytes = busyUploads.reduce((a, t) => a + t.size, 0);
  const totalLoaded = busyUploads.reduce((a, t) => a + t.loaded, 0);

  return (
    <div ref={rootRef} className="vault fixed inset-0 z-40 overflow-hidden text-[#d4d4d4]" style={vars} onContextMenu={onRootContextMenu}>
      <style>{CURSOR_CSS}</style>
      <style>{`
.vault .vpanel{background:rgb(17 17 19/var(--v-panel));border:1px solid rgb(255 255 255/.07);border-radius:16px;-webkit-backdrop-filter:blur(18px) saturate(1.15);backdrop-filter:blur(18px) saturate(1.15)}
.vault .vsec{background:rgb(28 28 31/var(--v-cards))}
.vault .vrow:hover{background:rgb(255 255 255/.045)}
.vault input,.vault select{font-size:16px}
@media (min-width:640px){.vault input,.vault select{font-size:13.5px}}
.vault ::-webkit-scrollbar{width:8px;height:8px}.vault ::-webkit-scrollbar-thumb{background:rgb(255 255 255/.12);border-radius:8px}
.vault .no-sb{scrollbar-width:none}.vault .no-sb::-webkit-scrollbar{display:none}
.vault input[type=search]::-webkit-search-cancel-button{filter:invert(1);opacity:.5}
`}</style>

      {/* background scene (blur + brightness from Appearance) */}
      <div
        aria-hidden="true"
        className="absolute -inset-12"
        style={{ background: scene, filter: `blur(${look.blur}px) brightness(${look.bright})`, transform: "translateZ(0)" }}
      />
      {look.cursor && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(420px circle at var(--mx,-999px) var(--my,-999px), color-mix(in srgb, var(--v-accent) 16%, transparent), transparent 70%)" }}
        />
      )}

      <div className="absolute inset-0 flex gap-2 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-[max(.5rem,env(safe-area-inset-top))] md:gap-3 md:p-3">
        <aside className="vpanel hidden w-64 shrink-0 overflow-hidden lg:block">{sidebar}</aside>

        <section className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3">
          {/* top bar */}
          <div className="vpanel relative z-20 flex h-12 shrink-0 items-center gap-1 px-1.5 sm:gap-1.5 sm:px-2">
            <button type="button" className={`${iconBtn} lg:hidden`} onClick={() => setDrawer(true)} aria-label={s.menu}>
              <Menu className="h-[18px] w-[18px]" />
            </button>
            {!found && depth > 1 && (
              <button type="button" className={`${iconBtn} sm:hidden`} onClick={() => data && go(data.partitionId!, data.crumbs[depth - 2].id)} aria-label={s.back}>
                <ArrowLeft className="h-[18px] w-[18px]" />
              </button>
            )}
            <nav className="no-sb flex min-w-0 flex-1 items-center overflow-x-auto text-[13.5px]" aria-label="breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.id ?? "root"} className={`flex shrink-0 items-center ${i < crumbs.length - 1 ? "max-sm:hidden" : "min-w-0 shrink"}`}>
                  {i > 0 && <ChevronRight className="mx-0.5 h-3.5 w-3.5 shrink-0 text-[#6f6f6f]" />}
                  <button
                    type="button"
                    disabled={!!found || i === crumbs.length - 1}
                    onClick={() => data && go(data.partitionId!, c.id)}
                    className={`truncate rounded-md px-1.5 py-1 ${i === crumbs.length - 1 ? "font-medium text-[#ececec]" : "text-[#9b9b9b] hover:bg-white/5 hover:text-white"}`}
                  >
                    {i === 0 && !found ? (
                      <span className="flex items-center gap-1.5">
                        <HardDrive className="h-3.5 w-3.5" style={{ color: accentHex(data?.partitions.find((p) => p.id === data?.partitionId)?.color ?? "") }} />
                        {c.name}
                      </span>
                    ) : (
                      c.name
                    )}
                  </button>
                </span>
              ))}
              {loading && <LoaderCircle className="ml-2 h-4 w-4 shrink-0 animate-spin text-[#8a8a8a]" />}
            </nav>
            {data && (
              <>
                <div className="hidden w-60 md:block xl:w-72">{searchBox}</div>
                <button type="button" className={`${iconBtn} md:hidden`} onClick={() => setMobileSearch((v) => !v)} aria-label={s.search}>
                  <Search className="h-[18px] w-[18px]" />
                </button>
                <button type="button" className={`${btnGhost} hidden sm:inline-flex`} onClick={() => setDialog({ t: "folder" })}>
                  <FolderPlus className="h-4 w-4" /> <span className="hidden xl:inline">{s.newFolder}</span>
                </button>
                <div className="relative hidden sm:block">
                  <button type="button" className={btnPrimary} onClick={() => setAddMenu((v) => !v)} aria-expanded={addMenu}>
                    <Upload className="h-4 w-4" /> {s.upload}
                  </button>
                  {addMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setAddMenu(false)} />
                      <div className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#1b1b1e] p-1 shadow-2xl">
                        <button type="button" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-white/[.06]" onClick={() => (setAddMenu(false), fileInput.current?.click())}>
                          <Upload className="h-4 w-4" /> {s.uploadFiles}
                        </button>
                        <button type="button" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] hover:bg-white/[.06]" onClick={() => (setAddMenu(false), folderInput.current?.click())}>
                          <FolderUp className="h-4 w-4" /> {s.uploadFolder}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            <button type="button" className={`${iconBtn} ${showLook ? "bg-white/10 text-white" : ""}`} onClick={() => setShowLook((v) => !v)} aria-label={s.appearance} title={s.appearance}>
              <Settings2 className="h-[18px] w-[18px]" />
            </button>
          </div>

          {data && mobileSearch && <div className="vpanel shrink-0 p-1.5 md:hidden">{searchBox}</div>}

          {/* content */}
          <div
            className="vpanel relative flex min-h-0 flex-1 flex-col overflow-hidden"
            onDragEnter={(e) => {
              if (data && e.dataTransfer.types.includes("Files")) {
                e.preventDefault();
                setDrag(true);
              }
            }}
            onDragOver={(e) => {
              if (data && e.dataTransfer.types.includes("Files")) e.preventDefault();
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDrag(false);
            }}
            onDrop={data ? onDrop : undefined}
          >
            {error ? (
              errorScreen
            ) : data ? (
              <>
                <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[.06] px-3">
                  {selected.size > 0 || selectMode ? (
                    <>
                      <button type="button" className={`${iconBtn} -ml-1.5 h-8 w-8`} onClick={clearSelection} aria-label={s.cancel}>
                        <X className="h-4 w-4" />
                      </button>
                      <span className="text-[13px] text-[#ececec]">{fmt(s.selected, { n: selected.size })}</span>
                      <div className="ml-auto flex items-center gap-0.5">
                        <button
                          type="button"
                          className={iconBtn}
                          disabled={!selectedItems.some((i) => i.kind === "file")}
                          aria-label={s.download}
                          title={s.download}
                          onClick={async () => {
                            for (const it of selectedItems.filter((i) => i.kind === "file")) {
                              await download(it);
                              await new Promise((r) => setTimeout(r, 600));
                            }
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button type="button" className={iconBtn} disabled={!selected.size} aria-label={s.move} title={s.move} onClick={() => setDialog({ t: "move", ids: [...selected] })}>
                          <FolderInput className="h-4 w-4" />
                        </button>
                        <button type="button" className={`${iconBtn} hover:text-[#f0607a]`} disabled={!selected.size} aria-label={s.delete} title={s.delete} onClick={() => setDialog({ t: "delete", ids: [...selected] })}>
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-[12px] text-[#8a8a8a]">{fmt(s.items, { n: items.length })}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <select
                          value={sort}
                          onChange={(e) => setSort(e.target.value as typeof sort)}
                          aria-label={s.sortName}
                          className="h-8 rounded-lg border border-white/[.08] bg-black/25 px-2 text-[#cfcfcf] outline-none"
                        >
                          <option value="name">{s.sortName}</option>
                          <option value="date">{s.sortDate}</option>
                          <option value="size">{s.sortSize}</option>
                        </select>
                        <div className="flex rounded-lg border border-white/[.08] bg-black/25 p-0.5">
                          {(["list", "grid"] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setView(v)}
                              aria-label={v === "list" ? s.list : s.grid}
                              aria-pressed={view === v}
                              className={`flex h-7 w-8 items-center justify-center rounded-md ${view === v ? "bg-white/10 text-white" : "text-[#8a8a8a] hover:text-white"}`}
                            >
                              {v === "list" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 pb-24 sm:p-3 sm:pb-3" data-lenis-prevent>
                  {items.length ? (
                    view === "grid" ? (
                      gridView
                    ) : (
                      listView
                    )
                  ) : (
                    <div className="flex h-full min-h-60 flex-col items-center justify-center px-6 text-center">
                      {found ? <Search className="mb-3 h-9 w-9 text-[#5f5f5f]" /> : <Folder className="mb-3 h-10 w-10 text-[#5f5f5f]" />}
                      <p className="text-[14px] text-[#cfcfcf]">{found ? s.noResults : s.empty}</p>
                      {!found && <p className="mt-1 text-[12.5px] text-[#7d7d7d]">{s.emptyHint}</p>}
                    </div>
                  )}
                </div>

                {drag && (
                  <div className="pointer-events-none absolute inset-2 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--v-accent)] bg-black/55 text-[15px] font-medium text-white">
                    <Upload className="mr-2 h-5 w-5" /> {s.dropHere}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </section>
      </div>

      {/* mobile: floating add button */}
      {data && !error && (
        <div className="fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom)+.5rem))] right-4 z-50 sm:hidden">
          {addMenu && (
            <>
              <div className="fixed inset-0" onClick={() => setAddMenu(false)} />
              <div className="absolute bottom-16 right-0 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1e] p-1 shadow-2xl">
                <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px]" onClick={() => (setAddMenu(false), fileInput.current?.click())}>
                  <Upload className="h-5 w-5" /> {s.uploadFiles}
                </button>
                <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px]" onClick={() => (setAddMenu(false), setDialog({ t: "folder" }))}>
                  <FolderPlus className="h-5 w-5" /> {s.newFolder}
                </button>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => setAddMenu((v) => !v)}
            aria-label={s.upload}
            aria-expanded={addMenu}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v-accent)] text-black shadow-[0_8px_30px_rgba(0,0,0,.5)]"
          >
            <Plus className={`h-6 w-6 transition-transform ${addMenu ? "rotate-45" : ""}`} />
          </button>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          enqueue(Array.from(e.target.files ?? []).map((file) => ({ file, dir: [] })));
          e.target.value = "";
        }}
      />
      <input
        ref={folderInput}
        type="file"
        multiple
        hidden
        {...({ webkitdirectory: "" } as object)}
        onChange={(e) => {
          enqueue(
            Array.from(e.target.files ?? []).map((file) => ({
              file,
              dir: (file.webkitRelativePath || file.name).split("/").slice(0, -1),
            })),
          );
          e.target.value = "";
        }}
      />

      {/* mobile drawer with the partitions */}
      {drawer && (
        <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label={s.menu}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <aside className="absolute bottom-0 left-0 top-0 w-[84%] max-w-[320px] border-r border-white/10 bg-[#141416] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl">
            <button type="button" className={`${iconBtn} absolute right-2 top-[calc(env(safe-area-inset-top)+.5rem)]`} onClick={() => setDrawer(false)} aria-label={s.close}>
              <X className="h-4 w-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* item menu: popover on desktop, bottom sheet on phones */}
      {menu && (
        <div
          className="fixed inset-0 z-[78]"
          onClick={() => setMenu(null)}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setMenu(null);
          }}
        >
          {menu.sheet && <div className="absolute inset-0 bg-black/50" />}
          <div
            role="menu"
            onClick={(e) => e.stopPropagation()}
            className={
              menu.sheet
                ? "absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/10 bg-[#1b1b1e] p-2 pb-[max(.75rem,env(safe-area-inset-bottom))]"
                : "absolute w-52 rounded-xl border border-white/10 bg-[#1b1b1e] p-1 shadow-2xl"
            }
            style={
              menu.sheet
                ? undefined
                : {
                    left: Math.max(8, Math.min(menu.fromButton ? menu.x - 208 : menu.x + 2, window.innerWidth - 216)),
                    top: Math.max(8, Math.min(menu.y + (menu.fromButton ? 0 : 2), window.innerHeight - 300)),
                  }
            }
          >
            {menu.sheet && menu.item && (
              <div className="flex items-center gap-3 border-b border-white/[.06] px-3 pb-3 pt-1">
                <KindIcon item={menu.item} className="h-6 w-6" />
                <div className="min-w-0">
                  <div className="truncate text-[15px] text-white">{menu.item.name}</div>
                  <div className="text-[12px] text-[#8a8a8a]">{rowMeta(menu.item)}</div>
                </div>
              </div>
            )}
            {menuActions(menu.item).map((a) => (
              <button
                key={a.id}
                type="button"
                role="menuitem"
                onClick={() => runAction(a.id, menu.item)}
                className={`flex w-full items-center gap-3 rounded-lg text-left hover:bg-white/[.06] ${menu.sheet ? "px-3.5 py-3 text-[15px]" : "px-3 py-2 text-[13px]"} ${
                  a.danger ? "text-[#f0607a]" : "text-[#e0e0e0]"
                }`}
              >
                <a.icon className="h-4 w-4" /> {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* upload queue */}
      {tasks.length > 0 && (
        <div className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] left-2 right-2 z-[60] rounded-2xl border border-white/10 bg-[#1b1b1e]/95 shadow-2xl backdrop-blur sm:bottom-4 sm:left-auto sm:right-4 sm:w-96">
          <div className="flex items-center justify-between px-3.5 pt-3">
            <span className="text-[13px] font-medium text-white">
              {s.uploads}
              {busyUploads.length > 0 && <span className="ml-2 text-[#8a8a8a]">{Math.round((totalLoaded / Math.max(1, totalBytes)) * 100)}%</span>}
            </span>
            <button
              type="button"
              className={`${iconBtn} h-7 w-7`}
              onClick={() => {
                busyUploads.forEach((t) => cancelTask(t.key));
                setTasks([]);
              }}
              aria-label={s.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="max-h-56 space-y-2 overflow-y-auto px-3.5 pb-3 pt-2" data-lenis-prevent>
            {tasks.map((t) => (
              <li key={t.key}>
                <div className="flex items-center gap-2 text-[12.5px]">
                  {t.state === "done" ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : t.state === "error" ? (
                    <CircleAlert className="h-4 w-4 shrink-0 text-[#f0607a]" />
                  ) : (
                    <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-[#8a8a8a]" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-[#dcdcdc]">{t.name}</span>
                  <span className="shrink-0 text-[#8a8a8a]">
                    {t.state === "error" ? fmt(s.err[t.error ?? "upstream"] ?? s.err.upstream, { max: formatBytes(data?.totals.maxFile ?? 0) }) : formatBytes(t.size)}
                  </span>
                  {(t.state === "queued" || t.state === "uploading") && (
                    <button type="button" onClick={() => cancelTask(t.key)} className="rounded p-0.5 text-[#8a8a8a] hover:text-white" aria-label={s.cancel}>
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                {t.state === "uploading" && <Bar used={t.loaded} total={t.size} color="var(--v-accent)" />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {toast && (
        <div role="status" className="fixed left-1/2 top-[calc(env(safe-area-inset-top)+4rem)] z-[90] max-w-[92vw] -translate-x-1/2 rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-2.5 text-[13px] text-white shadow-2xl md:top-20">
          {toast}
        </div>
      )}

      {showLook && (
        <AppearancePanel
          look={look}
          bgUrl={bgUrl}
          s={s}
          onChange={updateLook}
          onClose={() => setShowLook(false)}
          onBackground={async (file) => {
            try {
              const t = await api<{ key: string; url: string; headers: Record<string, string> }>({ action: "appearance.bg", type: file.type, size: file.size });
              await xhrPut(t.url, file, t.headers, () => {});
              setBgUrl(URL.createObjectURL(file));
              updateLook({ scene: "custom", bg: t.key }, true);
            } catch (e) {
              fail(e);
            }
          }}
        />
      )}

      {previewIndex >= 0 && (
        <Preview
          files={files}
          index={previewIndex}
          s={s}
          onIndex={(i) => setPreviewId(files[i]?.id ?? null)}
          onClose={() => setPreviewId(null)}
          onDownload={download}
          onError={fail}
        />
      )}

      {data && dialog?.t === "folder" && (
        <NameDialog
          title={s.newFolder}
          initial=""
          cta={s.create}
          s={s}
          onClose={() => setDialog(null)}
          onSubmit={async (name) => {
            if (await act({ action: "folder", partitionId: data.partitionId, parentId: data.folderId, name })) setDialog(null);
          }}
        />
      )}
      {dialog?.t === "rename" && (
        <NameDialog
          title={s.rename}
          initial={dialog.item.name}
          cta={s.save}
          s={s}
          onClose={() => setDialog(null)}
          onSubmit={async (name) => {
            if (await act({ action: "rename", id: dialog.item.id, name })) setDialog(null);
          }}
        />
      )}
      {data && dialog?.t === "partition" && (
        <PartitionDialog
          part={dialog.part}
          totals={data.totals}
          canDelete={data.partitions.length > 1}
          s={s}
          onClose={() => setDialog(null)}
          onDelete={() => dialog.part && setDialog({ t: "deletePartition", part: dialog.part })}
          onSubmit={async (v) => {
            const okDone = await act(dialog.part ? { action: "partition.update", id: dialog.part.id, ...v } : { action: "partition.create", ...v });
            if (okDone) setDialog(null);
          }}
        />
      )}
      {data && dialog?.t === "move" && (
        <MoveDialog
          ids={dialog.ids}
          start={{ p: data.partitionId!, f: data.folderId }}
          partitions={data.partitions}
          s={s}
          onClose={() => setDialog(null)}
          onMove={async (p, f) => {
            if (await act({ action: "move", ids: dialog.ids, partitionId: p, parentId: f })) {
              setDialog(null);
              clearSelection();
            }
          }}
        />
      )}
      {dialog?.t === "delete" && (
        <Modal
          title={s.delete}
          onClose={() => setDialog(null)}
          footer={
            <>
              <button type="button" className={btnGhost} onClick={() => setDialog(null)}>
                {s.cancel}
              </button>
              <button
                type="button"
                className={btnDanger}
                autoFocus
                onClick={async () => {
                  const ids = dialog.ids;
                  setDialog(null);
                  if (await act({ action: "delete", ids })) clearSelection();
                }}
              >
                <Trash className="h-4 w-4" /> {s.delete}
              </button>
            </>
          }
        >
          <p className="text-[13.5px] text-[#bdbdbd]">{fmt(s.confirmDelete, { n: dialog.ids.length })}</p>
        </Modal>
      )}
      {data && dialog?.t === "deletePartition" && (
        <Modal
          title={s.deletePartition}
          onClose={() => setDialog(null)}
          footer={
            <>
              <button type="button" className={btnGhost} onClick={() => setDialog(null)}>
                {s.cancel}
              </button>
              <button
                type="button"
                className={btnDanger}
                onClick={async () => {
                  const id = dialog.part.id;
                  setDialog(null);
                  try {
                    await api({ action: "partition.delete", id });
                    go(id === data.partitionId ? data.partitions.find((p) => p.id !== id)!.id : data.partitionId!, id === data.partitionId ? null : data.folderId);
                  } catch (e) {
                    fail(e);
                  }
                }}
              >
                <Trash className="h-4 w-4" /> {s.delete}
              </button>
            </>
          }
        >
          <p className="text-[13.5px] text-[#bdbdbd]">{fmt(s.confirmDeletePartition, { name: dialog.part.name })}</p>
        </Modal>
      )}
    </div>
  );
}
