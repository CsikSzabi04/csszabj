"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink, File as FileIcon, FileMusic, LoaderCircle, X } from "lucide-react";
import { formatBytes, previewKind, type Item } from "./shared";
import { api, type Strings } from "./client";

type Props = {
  files: Item[];
  index: number;
  s: Strings;
  onIndex: (i: number) => void;
  onClose: () => void;
  onDownload: (item: Item) => void;
  onError: (e: unknown) => void;
};

const TEXT_MAX = 2 * 1024 * 1024;
const OFFICE_MAX = 40 * 1024 * 1024;

function Center({ children }: { children: ReactNode }) {
  return <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-[14px] text-[#bdbdbd]">{children}</div>;
}
const Spinner = () => (
  <Center>
    <LoaderCircle className="h-7 w-7 animate-spin text-[#8a8a8a]" />
  </Center>
);

/** PDF via pdf.js: pages render only near the viewport (iPhone canvas memory is small). */
function PdfView({ url, failed }: { url: string; failed: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    const el = box.current!;
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let destroy: (() => void) | null = null;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        if (!pdfjs.GlobalWorkerOptions.workerPort) {
          pdfjs.GlobalWorkerOptions.workerPort = new Worker(new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url), { type: "module" });
        }
        const task = pdfjs.getDocument({ url });
        destroy = () => void task.destroy();
        const doc = await task.promise;
        if (cancelled) return;
        const first = await doc.getPage(1);
        const base = first.getViewport({ scale: 1 });
        const width = Math.min(el.clientWidth - 16, 1000);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pages = Math.min(doc.numPages, 500);
        const busy = new Set<number>();
        observer = new IntersectionObserver(
          (entries) => {
            for (const en of entries) {
              const canvas = en.target as HTMLCanvasElement;
              const n = Number(canvas.dataset.page);
              if (!en.isIntersecting) {
                if (canvas.dataset.done) {
                  canvas.width = canvas.height = 0; // free memory far from the viewport
                  delete canvas.dataset.done;
                }
                continue;
              }
              if (canvas.dataset.done || busy.has(n)) continue;
              busy.add(n);
              doc
                .getPage(n)
                .then(async (page) => {
                  const vp1 = page.getViewport({ scale: 1 });
                  const vp = page.getViewport({ scale: (width / vp1.width) * dpr });
                  canvas.width = vp.width;
                  canvas.height = vp.height;
                  canvas.style.aspectRatio = `${vp.width} / ${vp.height}`;
                  await page.render({ canvas, viewport: vp }).promise;
                  canvas.dataset.done = "1";
                })
                .catch(() => {})
                .finally(() => busy.delete(n));
            }
          },
          { root: el, rootMargin: "1200px 0px" },
        );
        for (let n = 1; n <= pages; n++) {
          const c = document.createElement("canvas");
          c.dataset.page = String(n);
          c.className = "mx-auto mb-3 block rounded-sm bg-white shadow-lg";
          c.style.width = `${width}px`;
          c.style.maxWidth = "100%";
          c.style.aspectRatio = `${base.width} / ${base.height}`;
          el.appendChild(c);
          observer.observe(c);
        }
        setState("ok");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
      observer?.disconnect();
      destroy?.();
      el.replaceChildren();
    };
  }, [url]);
  return (
    <div className="relative h-full w-full">
      <div ref={box} className="h-full w-full overflow-auto overscroll-contain px-2 py-3" data-lenis-prevent />
      {state === "loading" && (
        <div className="absolute inset-0">
          <Spinner />
        </div>
      )}
      {state === "error" && <div className="absolute inset-0">{failed}</div>}
    </div>
  );
}

/** Text, code, CSV, DOCX and spreadsheets: fetched from the signed URL and rendered here. */
function FetchedView({ url, kind, ext, failed }: { url: string; kind: "text" | "docx" | "sheet"; ext: string; failed: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [text, setText] = useState<string | null>(null);
  const [sheets, setSheets] = useState<{ names: string[]; html: string[] } | null>(null);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const el = box.current;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const asSheet = kind === "sheet" || /^(csv|tsv)$/.test(ext);
        if (kind === "text" && !asSheet) {
          const t = await res.text();
          if (!cancelled) setText(t);
        } else if (kind === "docx") {
          const buf = await res.arrayBuffer();
          const { renderAsync } = await import("docx-preview");
          if (cancelled || !el) return;
          await renderAsync(buf, el, undefined, { inWrapper: true, breakPages: true, ignoreLastRenderedPageBreak: true });
          const page = el.querySelector<HTMLElement>(".docx-wrapper > section, .docx");
          const w = page?.offsetWidth ?? 0;
          if (w > el.clientWidth) el.style.setProperty("zoom", String(Math.max(0.3, (el.clientWidth - 8) / w)));
        } else {
          const buf = await res.arrayBuffer();
          const XLSX = await import("xlsx");
          const wb = XLSX.read(buf, { type: "array", sheetRows: 2000, dense: true });
          if (!cancelled) setSheets({ names: wb.SheetNames, html: wb.SheetNames.map((n) => XLSX.utils.sheet_to_html(wb.Sheets[n], { header: "", footer: "" })) });
        }
        if (!cancelled) setState("ok");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
      el?.replaceChildren();
    };
  }, [url, kind, ext]);

  if (state === "error") return <>{failed}</>;
  return (
    <div className="relative flex h-full w-full flex-col">
      {sheets && sheets.names.length > 1 && (
        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/10 px-2 py-1.5">
          {sheets.names.map((n, i) => (
            <button key={n} type="button" onClick={() => setTab(i)} className={`shrink-0 rounded-md px-2.5 py-1 text-[12.5px] ${i === tab ? "bg-white/15 text-white" : "text-[#9b9b9b] hover:bg-white/5"}`}>
              {n}
            </button>
          ))}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-auto overscroll-contain" data-lenis-prevent>
        {text !== null && <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[12.5px] leading-relaxed text-[#dcdcdc]">{text}</pre>}
        {sheets && <div className="vault-sheet p-2" dangerouslySetInnerHTML={{ __html: sheets.html[tab] ?? "" }} />}
        <div ref={box} className={kind === "docx" ? "vault-docx" : "hidden"} />
      </div>
      {state === "loading" && (
        <div className="absolute inset-0">
          <Spinner />
        </div>
      )}
      <style>{`
.vault-sheet table{border-collapse:collapse;font-size:12.5px;color:#e0e0e0;background:#141416}
.vault-sheet td,.vault-sheet th{border:1px solid rgb(255 255 255/.1);padding:4px 8px;white-space:nowrap;max-width:420px;overflow:hidden;text-overflow:ellipsis}
.vault-sheet tr:first-child td{background:#202024;font-weight:600}
.vault-docx .docx-wrapper{background:transparent!important;padding:12px 0!important}
.vault-docx .docx-wrapper>section.docx{box-shadow:0 8px 30px rgba(0,0,0,.45)!important;margin-bottom:16px!important}
`}</style>
    </div>
  );
}

export default function Preview({ files, index, s, onIndex, onClose, onDownload, onError }: Props) {
  const item = files[index];
  const [links, setLinks] = useState<{ id: string; view: string; download: string } | null>(null);
  const [broken, setBroken] = useState<string | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let alive = true;
    api<{ view: string; download: string }>({ action: "link", id: item.id })
      .then((l) => alive && setLinks({ id: item.id, ...l }))
      .catch((e) => alive && onError(e));
    return () => {
      alive = false;
    };
  }, [item.id, onError]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      else if (e.key === "ArrowRight" && index < files.length - 1) onIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, files.length, onClose, onIndex]);

  const kind = previewKind(item.name, item.mime);
  const ext = item.name.toLowerCase().split(".").pop() ?? "";
  const ready = links?.id === item.id ? links : null;
  const failed = (
    <Center>
      <FileIcon className="h-12 w-12 text-[#6f6f6f]" />
      <p className="max-w-sm">{s.previewFailed}</p>
      <button type="button" onClick={() => onDownload(item)} className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[var(--v-accent)] px-4 py-2.5 text-[14px] font-medium text-black">
        <Download className="h-4 w-4" /> {s.download}
      </button>
    </Center>
  );

  let body: ReactNode = <Spinner />;
  if (ready) {
    const url = ready.view;
    if (broken === item.id) body = failed;
    else if (kind === "image")
      body = (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={url} src={url} alt={item.name} onError={() => setBroken(item.id)} className="max-h-full max-w-full select-none object-contain" draggable={false} />
      );
    else if (kind === "video")
      body = <video key={url} src={url} controls playsInline autoPlay onError={() => setBroken(item.id)} className="max-h-full max-w-full rounded-lg bg-black" />;
    else if (kind === "audio")
      body = (
        <Center>
          <FileMusic className="h-16 w-16 text-violet-300" />
          <p className="max-w-full truncate text-white">{item.name}</p>
          <audio key={url} src={url} controls autoPlay onError={() => setBroken(item.id)} className="w-full max-w-md" />
        </Center>
      );
    else if (kind === "pdf") body = <PdfView key={url} url={url} failed={failed} />;
    else if (kind === "text" || kind === "docx" || kind === "sheet")
      body =
        item.size > (kind === "text" && !/^(csv|tsv)$/.test(ext) ? TEXT_MAX : OFFICE_MAX) ? (
          <Center>
            <FileIcon className="h-12 w-12 text-[#6f6f6f]" />
            <p>{s.tooBig}</p>
          </Center>
        ) : (
          <FetchedView key={url} url={url} kind={kind} ext={ext} failed={failed} />
        );
    else
      body = (
        <Center>
          <FileIcon className="h-14 w-14 text-[#6f6f6f]" />
          <p className="max-w-full truncate text-white">{item.name}</p>
          <p className="text-[#8a8a8a]">{formatBytes(item.size)}</p>
          <p className="max-w-sm">{s.noPreview}</p>
          <button type="button" onClick={() => onDownload(item)} className="mt-1 inline-flex items-center gap-2 rounded-lg bg-[var(--v-accent)] px-4 py-2.5 text-[14px] font-medium text-black">
            <Download className="h-4 w-4" /> {s.download}
          </button>
        </Center>
      );
  }

  const nav = "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/75 sm:flex";
  const swipeable = kind === "image" || kind === "audio" || kind === "none" || kind === "video";

  return (
    <div className="fixed inset-0 z-[85] flex flex-col bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 pb-2 pt-[max(.5rem,env(safe-area-inset-top))] sm:px-3">
        <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10" aria-label={s.close}>
          <X className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-medium text-white">{item.name}</div>
          <div className="text-[11.5px] text-[#8a8a8a]">
            {formatBytes(item.size)} · {index + 1} / {files.length}
          </div>
        </div>
        {ready && (
          <a href={ready.view} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10" aria-label={s.openTab} title={s.openTab}>
            <ExternalLink className="h-[18px] w-[18px]" />
          </a>
        )}
        <a
          href={ready?.download}
          onClick={(e) => {
            if (!ready) {
              e.preventDefault();
              onDownload(item);
            }
          }}
          className="flex h-10 items-center gap-2 rounded-lg bg-white/10 px-3 text-[13px] text-white hover:bg-white/15"
          aria-label={s.download}
        >
          <Download className="h-[18px] w-[18px]" /> <span className="hidden sm:inline">{s.download}</span>
        </a>
      </div>

      <div
        className="relative min-h-0 flex-1"
        onTouchStart={(e) => {
          if (!swipeable || e.touches.length !== 1) return;
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t || (window.visualViewport?.scale ?? 1) > 1.01) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
          if (dx < 0 && index < files.length - 1) onIndex(index + 1);
          if (dx > 0 && index > 0) onIndex(index - 1);
        }}
      >
        <div className="flex h-full w-full items-center justify-center p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] sm:p-4">{body}</div>
        {index > 0 && (
          <button type="button" className={`${nav} left-3`} onClick={() => onIndex(index - 1)} aria-label={s.prev}>
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {index < files.length - 1 && (
          <button type="button" className={`${nav} right-3`} onClick={() => onIndex(index + 1)} aria-label={s.next}>
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
