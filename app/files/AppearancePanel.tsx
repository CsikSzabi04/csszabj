"use client";

import { useRef, useState } from "react";
import { Check, ImageUp, LoaderCircle, RotateCcw, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { ACCENTS, DEFAULT_APPEARANCE, SCENES, type Appearance } from "./shared";
import type { Strings } from "./client";

type Props = {
  look: Appearance;
  bgUrl: string | null;
  s: Strings;
  onChange: (patch: Partial<Appearance>, now?: boolean) => void;
  onClose: () => void;
  onBackground: (file: File) => Promise<void>;
};

function Slider({ label, value, min, max, step, show, onChange }: { label: string; value: number; min: number; max: number; step: number; show: string; onChange: (v: number) => void }) {
  return (
    <label className="block py-1.5">
      <span className="flex justify-between text-[12.5px] text-[#cfcfcf]">
        <span>{label}</span>
        <span className="tabular-nums text-[#9b9b9b]">{show}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-[var(--v-accent)]"
      />
    </label>
  );
}

const head = "mb-2 mt-4 text-[10.5px] font-semibold uppercase tracking-[.16em] text-[#7d7d7d]";

export default function AppearancePanel({ look, bgUrl, s, onChange, onClose, onBackground }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { language, setLanguage } = useLanguage();
  const swatches = [...SCENES.map((x) => ({ id: x.id, css: x.css })), ...(bgUrl && look.bg ? [{ id: "custom", css: `center / cover url("${bgUrl}")` }] : [])];

  return (
    <div className="fixed inset-0 z-[70]" onClick={onClose}>
      <div
        role="dialog"
        aria-label={s.appearance}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto overscroll-contain rounded-t-2xl border border-white/10 bg-[#161618]/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-auto sm:right-3 sm:top-[64px] sm:max-h-[calc(100dvh-80px)] sm:w-[340px] sm:rounded-2xl md:right-4 md:top-[72px]"
        data-lenis-prevent
      >
        <div className="flex items-center gap-2">
          <h2 className="mr-auto text-[15px] font-semibold text-white">{s.appearance}</h2>
          <div className="flex rounded-lg border border-white/10 p-0.5 text-[11.5px] font-semibold">
            {(["hu", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                aria-pressed={language === l}
                className={`rounded-md px-2 py-1 uppercase ${language === l ? "bg-white/15 text-white" : "text-[#8a8a8a] hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#9b9b9b] hover:bg-white/5 hover:text-white" aria-label={s.close}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className={head}>{s.background}</div>
        <div className="grid grid-cols-5 gap-2">
          {swatches.map((sw) => (
            <button
              key={sw.id}
              type="button"
              aria-label={sw.id}
              aria-pressed={look.scene === sw.id}
              onClick={() => onChange({ scene: sw.id })}
              className="relative aspect-square rounded-xl border border-white/10"
              style={{ background: sw.css, boxShadow: look.scene === sw.id ? "0 0 0 2px var(--v-accent)" : undefined }}
            >
              {look.scene === sw.id && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white drop-shadow" />
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.03] py-2.5 text-[13px] text-[#e0e0e0] hover:bg-white/[.07]"
        >
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />} {s.uploadImage}
        </button>
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/heic"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setBusy(true);
            await onBackground(file);
            setBusy(false);
          }}
        />

        <div className={head}>{s.accent}</div>
        <div className="flex gap-2.5">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-label={a.id}
              aria-pressed={look.accent === a.id}
              onClick={() => onChange({ accent: a.id })}
              className="h-8 w-8 rounded-full"
              style={{ background: a.hex, boxShadow: look.accent === a.id ? `0 0 0 2px #161618, 0 0 0 4px ${a.hex}` : undefined }}
            />
          ))}
        </div>

        <div className={head}>{s.glass}</div>
        <Slider label={s.panel} value={look.panel} min={0.4} max={0.97} step={0.01} show={`${Math.round(look.panel * 100)}%`} onChange={(v) => onChange({ panel: v })} />
        <Slider label={s.cards} value={look.cards} min={0} max={1} step={0.01} show={`${Math.round(look.cards * 100)}%`} onChange={(v) => onChange({ cards: v })} />
        <Slider label={s.blur} value={look.blur} min={0} max={28} step={1} show={`${look.blur}px`} onChange={(v) => onChange({ blur: v })} />
        <Slider label={s.bright} value={look.bright} min={0.2} max={1} step={0.01} show={`${Math.round(look.bright * 100)}%`} onChange={(v) => onChange({ bright: v })} />

        <div className={head}>{s.effects}</div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[13px] text-[#e0e0e0]">{s.cursor}</div>
            <div className="text-[11.5px] text-[#8a8a8a]">{s.cursorHint}</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={look.cursor}
            aria-label={s.cursor}
            onClick={() => onChange({ cursor: !look.cursor })}
            className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${look.cursor ? "bg-[var(--v-accent)]" : "bg-white/15"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${look.cursor ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[.07] pt-3">
          <p className="text-[11px] leading-snug text-[#7d7d7d]">{s.savedNote}</p>
          <button
            type="button"
            onClick={() => onChange({ ...DEFAULT_APPEARANCE, bg: look.bg }, true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[12px] text-[#e0e0e0] hover:bg-white/[.06]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> {s.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
