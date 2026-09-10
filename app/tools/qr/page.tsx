"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, RefreshCw, Palette, Type } from "lucide-react";
import Link from "next/link";
import { SITE_URL } from "../../lib/site";

type ErrorLevel = "L" | "M" | "Q" | "H";

const LEVELS: ErrorLevel[] = ["L", "M", "Q", "H"];
// Maximum payload of the largest (version 40) QR code in byte mode, per error correction level.
// Longer input would make the QR library throw while rendering.
const CAPACITY_BYTES: Record<ErrorLevel, number> = { L: 2953, M: 2331, Q: 1663, H: 1273 };
const PREVIEW_SIZE = 256;

export default function QRGenerator() {
  const [text, setText] = useState(SITE_URL);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [level, setLevel] = useState<ErrorLevel>("L");

  const qrRef = useRef<HTMLDivElement>(null);

  const byteLength = useMemo(() => new TextEncoder().encode(text).length, [text]);
  const capacity = CAPACITY_BYTES[level];
  const isEmpty = text.length === 0;
  const isTooLong = byteLength > capacity;
  const canRender = !isEmpty && !isTooLong;

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg || !canRender) return;

    // Serialize at the requested output size, so the PNG is exactly size × size pixels.
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", String(size));
    clone.setAttribute("height", String(size));
    clone.removeAttribute("class");
    const svgData = new XMLSerializer().serializeToString(clone);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, "image/png");
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  };

  const reset = () => {
    setText("");
    setBgColor("#ffffff");
    setFgColor("#000000");
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4 relative">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#9b59b6] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <h1 className="sr-only">QR kód generátor</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl shadow-xl">
              <label htmlFor="qr-text" className="flex items-center gap-2 text-[#9b59b6] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Type className="w-4 h-4" aria-hidden="true" />
                <span>Input Data</span>
              </label>
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Írj be egy URL-t vagy szöveget..."
                maxLength={4000}
                className={`w-full bg-[#050508] border rounded-xl p-4 text-white focus:outline-none transition-all placeholder:text-gray-700 min-h-[120px] font-mono text-sm ${isTooLong ? "border-red-500/60" : "border-white/10 focus:border-[#9b59b6]/50"}`}
              />
              <p className={`mt-2 text-xs font-mono ${isTooLong ? "text-red-400" : "text-gray-600"}`}>
                {byteLength} / {capacity} byte{isTooLong ? " – túl hosszú ehhez a hibajavítási szinthez" : ""}
              </p>
            </div>

            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-[#9b59b6] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Palette className="w-4 h-4" aria-hidden="true" />
                <span>Customization</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qr-bg" className="block text-gray-500 text-xs font-mono uppercase mb-2">Háttérszín</label>
                  <div className="flex items-center gap-3">
                    <input id="qr-bg" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 bg-transparent border-none cursor-pointer" />
                    <span className="text-sm font-mono text-gray-400">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="qr-fg" className="block text-gray-500 text-xs font-mono uppercase mb-2">Mintázat Színe</label>
                  <div className="flex items-center gap-3">
                    <input id="qr-fg" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 bg-transparent border-none cursor-pointer" />
                    <span className="text-sm font-mono text-gray-400">{fgColor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="qr-size" className="block text-gray-500 text-xs font-mono uppercase mb-2">Letöltési méret ({size}px)</label>
                  <input
                    id="qr-size"
                    type="range"
                    min="128"
                    max="1024"
                    step="8"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-[#9b59b6]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span id="qr-margin-label" className="text-gray-500 text-xs font-mono uppercase">Fehér margó</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeMargin}
                    aria-labelledby="qr-margin-label"
                    onClick={() => setIncludeMargin((value) => !value)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${includeMargin ? "bg-[#9b59b6]" : "bg-gray-800"}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${includeMargin ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>

                <div>
                  <span className="block text-gray-500 text-xs font-mono uppercase mb-2">Hibajavítási szint</span>
                  <div className="flex gap-2" role="radiogroup" aria-label="Hibajavítási szint">
                    {LEVELS.map((l) => (
                      <button
                        key={l}
                        type="button"
                        role="radio"
                        aria-checked={level === l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs transition-all ${level === l ? "bg-[#9b59b6] text-white shadow-lg" : "bg-gray-900 text-gray-600 hover:bg-gray-800"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center justify-center space-y-8">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9b59b6]/20 to-[#00a8ff]/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
              <div ref={qrRef} className="relative bg-white p-8 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {canRender ? (
                  <QRCodeSVG
                    value={text}
                    size={PREVIEW_SIZE}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level={level}
                    marginSize={includeMargin ? 4 : 0}
                    title="Generált QR kód"
                    className="mx-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center text-center text-sm text-gray-500 font-mono" style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}>
                    {isEmpty ? "Írj be szöveget a QR kódhoz" : "A szöveg túl hosszú"}
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 text-[10px] font-mono text-black/20" aria-hidden="true">
                VER: {level} / SIZE: {size}
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
              <button
                type="button"
                onClick={downloadQR}
                disabled={!canRender}
                className="flex-1 flex items-center justify-center gap-2 bg-[#9b59b6] hover:bg-[#8e44ad] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-[#9b59b6]/20 transition-all enabled:hover:-translate-y-1 active:translate-y-0"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                PNG LETÖLTÉSE
              </button>
              <button
                type="button"
                onClick={reset}
                aria-label="Alaphelyzet"
                className="w-16 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-gray-400 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-gray-600 text-[10px] font-mono text-center max-w-xs uppercase tracking-widest mt-4">
              A generált QR kód azonnal beolvasható bármilyen eszközzel. Minden adat lokálisan kerül feldolgozásra.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
