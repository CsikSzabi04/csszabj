"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Trash2, FileImage, Settings2, CheckCircle2, AlertTriangle, Download } from "lucide-react";
import Link from "next/link";
import { formatBytes } from "../../lib/format";

const MAX_FILE_BYTES = 30 * 1024 * 1024;
// Keeps canvas allocations within what browsers (especially mobile Safari) can handle.
const MAX_PIXELS = 50_000_000;

interface CompressionResult {
  url: string;
  size: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Ezt a képformátumot a böngésző nem tudja megnyitni."));
    img.src = src;
  });
}

function outputFileName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").replace(/[^\w.-]+/g, "_").slice(0, 80) || "image";
  return `compressed_${base}.jpg`;
}

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Object URLs keep the image in memory until revoked, so every one we create is released.
  const objectUrls = useRef<{ preview: string | null; result: string | null }>({ preview: null, result: null });

  useEffect(() => {
    const urls = objectUrls.current;
    return () => {
      if (urls.preview) URL.revokeObjectURL(urls.preview);
      if (urls.result) URL.revokeObjectURL(urls.result);
    };
  }, []);

  const replacePreview = (url: string | null) => {
    if (objectUrls.current.preview) URL.revokeObjectURL(objectUrls.current.preview);
    objectUrls.current.preview = url;
    setPreviewUrl(url);
  };

  const replaceResult = (next: CompressionResult | null) => {
    if (objectUrls.current.result) URL.revokeObjectURL(objectUrls.current.result);
    objectUrls.current.result = next?.url ?? null;
    setResult(next);
  };

  const selectFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (!candidate.type.startsWith("image/")) {
      setError("Csak képfájl tölthető fel.");
      return;
    }
    if (candidate.size > MAX_FILE_BYTES) {
      setError(`A fájl túl nagy (max. ${formatBytes(MAX_FILE_BYTES)}).`);
      return;
    }
    setError(null);
    setFile(candidate);
    replaceResult(null);
    replacePreview(URL.createObjectURL(candidate));
  };

  const compressImage = async () => {
    if (!file || !previewUrl || isCompressing) return;
    setIsCompressing(true);
    setError(null);

    try {
      const img = await loadImage(previewUrl);
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      if (!width || !height) throw new Error("A kép nem olvasható.");
      if (width * height > MAX_PIXELS) throw new Error("A kép felbontása túl nagy a böngészőben történő tömörítéshez.");

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("A böngésző nem támogatja a canvas feldolgozást.");

      // JPEG has no transparency: flatten transparent areas onto white instead of black.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
      // Release the canvas backing store right away.
      canvas.width = 0;
      canvas.height = 0;
      if (!blob) throw new Error("A tömörítés nem sikerült.");

      replaceResult({ url: URL.createObjectURL(blob), size: blob.size, width, height });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba a tömörítés során.");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!result || !file) return;
    const link = document.createElement("a");
    link.href = result.url;
    link.download = outputFileName(file.name);
    link.click();
  };

  const reset = () => {
    setFile(null);
    replacePreview(null);
    replaceResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const savedPercent = file && result ? Math.round((1 - result.size / file.size) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00a8ff] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <h1 className="sr-only">Képtömörítő</h1>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => selectFile(e.target.files?.[0])}
          accept="image/*"
          className="hidden"
          aria-label="Kép kiválasztása"
        />

        {error && (
          <div role="alert" className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload and Controls */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            {!previewUrl ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  selectFile(e.dataTransfer.files[0]);
                }}
                className={`w-full border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all group min-h-[400px] ${isDragging ? "border-[#00a8ff]/60 bg-[#00a8ff]/5" : "border-white/10 hover:border-[#00a8ff]/50 hover:bg-[#00a8ff]/5"}`}
              >
                <div className="w-20 h-20 bg-[#00a8ff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,168,255,0.2)]">
                  <Upload className="w-10 h-10 text-[#00a8ff]" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold mb-2">Húzd ide a képet vagy kattints</span>
                <span className="text-gray-500 text-sm max-w-xs uppercase tracking-widest font-mono">
                  JPG, PNG, WEBP támogatott · max. {formatBytes(MAX_FILE_BYTES)}
                </span>
              </button>
            ) : (
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase min-w-0">
                    <FileImage className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{file?.name ?? "Eredeti fájl"}</span>
                  </div>
                  <button type="button" onClick={reset} aria-label="Kép eltávolítása" className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="relative aspect-video bg-[#050508] p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob: URL, nothing to optimize */}
                  <img src={previewUrl} alt="Eredeti kép előnézete" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center text-sm font-mono uppercase">
                    <span className="text-gray-500 italic">Eredeti méret:</span>
                    <span className="text-white font-bold">{formatBytes(file?.size ?? 0)}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#00a8ff] font-mono text-xs uppercase tracking-[0.3em]">
                      <Settings2 className="w-4 h-4" aria-hidden="true" />
                      <span>Compression Settings</span>
                    </div>
                    <div>
                      <label htmlFor="quality" className="block mb-2 text-gray-500 text-[10px] font-mono uppercase tracking-widest">
                        Minőség: {Math.round(quality * 100)}%
                      </label>
                      <input
                        id="quality"
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full accent-[#00a8ff]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={compressImage}
                      disabled={isCompressing}
                      className="w-full bg-[#00a8ff] hover:bg-[#0096e6] disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,168,255,0.3)] enabled:hover:-translate-y-1"
                    >
                      {isCompressing ? "Feldolgozás..." : "TÖMÖRÍTÉS INDÍTÁSA"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6" aria-live="polite">
                <div className="bg-[#0a0a0f] border border-[#00ff41]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.05)]">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#00ff41]/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00ff41] uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>Tömörített eredmény</span>
                    </div>
                  </div>

                  <div className="relative aspect-video bg-[#050508] p-4 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob: URL, nothing to optimize */}
                    <img src={result.url} alt="Tömörített kép előnézete" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Új méret</span>
                        <span className="text-xl font-bold text-white">{formatBytes(result.size)}</span>
                      </div>
                      <div className={`p-4 rounded-2xl ${savedPercent > 0 ? "bg-[#00ff41]/10" : "bg-yellow-500/10"}`}>
                        <span className={`block text-[10px] font-mono uppercase mb-1 ${savedPercent > 0 ? "text-[#00ff41]" : "text-yellow-500"}`}>Megtakarítás</span>
                        <span className={`text-xl font-bold ${savedPercent > 0 ? "text-[#00ff41]" : "text-yellow-500"}`}>{Math.max(savedPercent, 0)}%</span>
                      </div>
                    </div>

                    {savedPercent <= 0 && (
                      <p className="text-xs text-yellow-500/80">
                        Ennél a beállításnál a JPEG nem kisebb az eredetinél – próbálj alacsonyabb minőséget, vagy tartsd meg az eredeti fájlt.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={downloadCompressed}
                      className="w-full flex items-center justify-center gap-2 bg-[#00ff41] hover:bg-[#00e039] text-black py-5 rounded-2xl font-black tracking-[0.2em] uppercase transition-all shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:-translate-y-1"
                    >
                      <Download className="w-5 h-5" aria-hidden="true" />
                      LETÖLTÉS <span className="text-[10px] opacity-70">JPG</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#0a0a0f]/50 border border-white/5 p-4 rounded-xl font-mono text-[10px] text-gray-600 space-y-1">
                  <div>FORMÁTUM: JPEG · MINŐSÉG: {Math.round(quality * 100)}%</div>
                  <div>FELBONTÁS: {result.width} × {result.height} px</div>
                  <div>FELDOLGOZÁS: helyben, a böngésződben</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
