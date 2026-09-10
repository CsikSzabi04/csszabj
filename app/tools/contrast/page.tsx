"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowLeftRight, CheckCircle2, XCircle, Droplet } from "lucide-react";
import Link from "next/link";

interface ColorInput {
  /** Always a valid "#rrggbb" value (what the color picker and the calculation use). */
  hex: string;
  /** Raw text field content, which may be temporarily invalid while typing. */
  text: string;
}

function normalizeHex(value: string): string | null {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(value.trim());
  if (!match) return null;
  const digits = match[1].length === 3 ? match[1].split("").map((c) => c + c).join("") : match[1];
  return `#${digits.toLowerCase()}`;
}

// WCAG 2.1 relative luminance
function relativeLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(first: string, second: string): number {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function MetricCard({ title, passes, description }: { title: string; passes: boolean; description: string }) {
  return (
    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 ${passes ? "bg-[#00ff41]" : "bg-red-500"}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">{title}</span>
          <span className="text-xl font-bold block mb-1">{passes ? "Megfelel" : "Elbukott"}</span>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
        <div className={`p-2 rounded-lg ${passes ? "bg-[#00ff41]/10 text-[#00ff41]" : "bg-red-500/10 text-red-500"}`}>
          {passes ? <CheckCircle2 className="w-5 h-5" aria-hidden="true" /> : <XCircle className="w-5 h-5" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}

function ColorField({ id, label, color, onChange }: { id: string; label: string; color: ColorInput; onChange: (next: ColorInput) => void }) {
  const isInvalid = normalizeHex(color.text) === null;

  return (
    <div>
      <label htmlFor={`${id}-text`} className="block text-gray-500 text-xs font-mono uppercase mb-2">{label}</label>
      <div className={`flex items-center gap-4 bg-[#050508] border p-3 rounded-xl transition-colors ${isInvalid ? "border-red-500/50" : "border-white/10"}`}>
        <input
          type="color"
          aria-label={`${label} – színválasztó`}
          value={color.hex}
          onChange={(e) => onChange({ hex: e.target.value, text: e.target.value.toUpperCase() })}
          className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-lg"
        />
        <input
          id={`${id}-text`}
          type="text"
          value={color.text}
          maxLength={7}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={isInvalid}
          onChange={(e) => {
            const text = e.target.value;
            onChange({ text, hex: normalizeHex(text) ?? color.hex });
          }}
          className="bg-transparent border-none text-white font-mono uppercase focus:outline-none flex-1 min-w-0"
        />
      </div>
      {isInvalid && <p className="mt-2 text-xs text-red-400">Érvényes HEX színkódot adj meg (pl. #1A2B3C).</p>}
    </div>
  );
}

export default function ContrastChecker() {
  const [fg, setFg] = useState<ColorInput>({ hex: "#ffffff", text: "#FFFFFF" });
  const [bg, setBg] = useState<ColorInput>({ hex: "#000000", text: "#000000" });

  const ratio = contrastRatio(fg.hex, bg.hex);

  // WCAG 2.1 requirements
  const passesAANormal = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;
  const passesAAANormal = ratio >= 7.0;
  const passesAAALarge = ratio >= 4.5;

  const ratioColor = ratio >= 4.5 ? "text-[#00ff41]" : ratio >= 3 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff2d2d] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <h1 className="sr-only">Színkontraszt ellenőrző</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-[#ff2d2d] font-mono text-xs uppercase tracking-[0.3em]">
                  <Droplet className="w-4 h-4" aria-hidden="true" />
                  <span>Color Selection</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFg(bg);
                    setBg(fg);
                  }}
                  className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                  Csere
                </button>
              </div>

              <div className="space-y-6">
                <ColorField id="fg" label="Szöveg Színe (Foreground)" color={fg} onChange={setFg} />
                <ColorField id="bg" label="Háttérszín (Background)" color={bg} onChange={setBg} />
              </div>
            </div>

            <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl text-center">
              <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-2">Kontrasztarány</span>
              <span className={`text-4xl font-bold tabular-nums ${ratioColor}`} aria-live="polite">
                {ratio.toFixed(2)}:1
              </span>
            </div>
          </motion.div>

          {/* Visualization & Results */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div
              className="border border-white/10 rounded-3xl p-10 min-h-[250px] shadow-2xl transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: bg.hex }}
            >
              <div style={{ color: fg.hex }}>
                <h2 className="text-3xl font-bold mb-4">Nagy Szöveg (18pt+)</h2>
                <p className="text-base leading-relaxed">
                  Ez egy normál méretű (16px) bekezdés. A megfelelő színkontraszt elengedhetetlen a könnyű olvashatósághoz és az akadálymentes webes élményhez.
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] font-mono opacity-30" style={{ color: fg.hex }} aria-hidden="true">
                PREVIEW_MODE_ACTIVE
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <MetricCard title="WCAG AA Kicsi (4.5:1)" passes={passesAANormal} description="Normál szöveg esetén" />
              <MetricCard title="WCAG AA Nagy (3.0:1)" passes={passesAALarge} description="Nagy szöveg / címsorok esetén" />
              <MetricCard title="WCAG AAA Kicsi (7.0:1)" passes={passesAAANormal} description="Normál szöveg esetén" />
              <MetricCard title="WCAG AAA Nagy (4.5:1)" passes={passesAAALarge} description="Nagy szöveg / címsorok esetén" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
