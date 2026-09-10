"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Globe, Activity, TrendingDown } from "lucide-react";
import Link from "next/link";
import { formatBytes } from "../../lib/format";

interface TestResult {
  downloadSpeedMbps: number;
  durationMs: number;
  loadedBytes: number;
}

// Cloudflare speed test payload (CORS-enabled)
const TEST_FILE_URL = "https://speed.cloudflare.com/__down";
const TEST_SIZE_BYTES = 10_000_000;
// Throttle UI updates: the stream delivers hundreds of chunks per second.
const UI_UPDATE_INTERVAL_MS = 100;

function toMbps(bytes: number, durationMs: number): number {
  return durationMs > 0 ? (bytes * 8) / 1_000_000 / (durationMs / 1000) : 0;
}

function getQualityLabel(speedMbps: number) {
  if (speedMbps > 100) return { label: "Kiváló", color: "text-[#00ff41]" };
  if (speedMbps > 50) return { label: "Jó", color: "text-[#00a8ff]" };
  if (speedMbps > 20) return { label: "Közepes", color: "text-yellow-500" };
  return { label: "Gyenge", color: "text-red-500" };
}

export default function NetSpeedTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Stop the download when leaving the page mid-test.
  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const startTest = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsTesting(true);
    setProgress(0);
    setCurrentSpeed(0);
    setResult(null);
    setError(null);

    const startTime = performance.now();
    let loadedBytes = 0;
    let lastUiUpdate = 0;

    try {
      const response = await fetch(`${TEST_FILE_URL}?bytes=${TEST_SIZE_BYTES}&_t=${Date.now()}`, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`Szerver hiba: ${response.status}`);
      if (!response.body) throw new Error("A böngésző nem támogatja a streamelést (ReadableStream).");

      const totalBytes = Number(response.headers.get("content-length")) || TEST_SIZE_BYTES;
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        loadedBytes += value.byteLength;

        const now = performance.now();
        if (now - lastUiUpdate >= UI_UPDATE_INTERVAL_MS) {
          lastUiUpdate = now;
          setCurrentSpeed(toMbps(loadedBytes, now - startTime));
          setProgress(Math.min((loadedBytes / totalBytes) * 100, 100));
        }
      }

      if (loadedBytes === 0) throw new Error("Nem érkezett adat a szervertől.");
      const durationMs = performance.now() - startTime;
      setResult({ downloadSpeedMbps: toMbps(loadedBytes, durationMs), durationMs, loadedBytes });
      setProgress(100);
    } catch (err) {
      if (controller.signal.aborted) {
        setError("A teszt meg lett szakítva.");
      } else {
        setError(err instanceof Error ? err.message : "Ismeretlen hiba történt a letöltés során.");
      }
    } finally {
      if (abortControllerRef.current === controller) abortControllerRef.current = null;
      setIsTesting(false);
    }
  }, []);

  const cancelTest = () => abortControllerRef.current?.abort();

  const displayedSpeed = isTesting ? currentSpeed : result?.downloadSpeedMbps ?? 0;

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-4xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00ffff]/10 rounded-full mb-6 relative">
            <div className="absolute inset-0 rounded-full border border-[#00ffff]/30 animate-ping opacity-20" />
            <Activity className="w-10 h-10 text-[#00ffff]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-mono uppercase tracking-widest">Net Sebesség</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Ellenőrizd a jelenlegi letöltési sebességed egy 10MB-os tesztfájl segítségével. A mérés valós idejű és nem igényel bővítményt.
          </p>
        </div>

        <div className="bg-[#0a0a0f] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffff]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ff41]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div
              className="text-7xl sm:text-[120px] leading-none font-bold font-mono tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tabular-nums"
              aria-live="polite"
            >
              {displayedSpeed.toFixed(1)}
            </div>
            <div className="text-xl font-mono text-[#00ffff] uppercase tracking-[0.4em] mb-12">Mbps</div>

            {/* Progress Bar */}
            <div
              className="w-full max-w-md bg-black/50 border border-white/10 rounded-full h-4 mb-4 overflow-hidden relative"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full bg-gradient-to-r from-[#00a8ff] to-[#00ffff] transition-[width] duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
              </div>
            </div>

            <div className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-12">Folyamat: {progress.toFixed(0)}%</div>

            {error && (
              <div role="alert" className="mb-8 font-mono text-red-500 bg-red-500/10 px-4 py-2 rounded-lg text-sm border border-red-500/20">
                {error}
              </div>
            )}

            {isTesting ? (
              <button
                type="button"
                onClick={cancelTest}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-8 py-3 rounded-xl font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(255,45,45,0.1)] hover:shadow-[0_0_30px_rgba(255,45,45,0.2)]"
              >
                Megszakítás
              </button>
            ) : (
              <button
                type="button"
                onClick={startTest}
                className="bg-[#00ffff] hover:bg-[#00e5e5] text-black px-12 py-4 rounded-2xl font-black tracking-[0.2em] uppercase transition-all shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:-translate-y-1"
              >
                {result ? "Újra Mérés" : "Teszt Indítása"}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {result && !isTesting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 text-center">
                <Globe className="w-5 h-5 text-gray-500 mx-auto mb-2" aria-hidden="true" />
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Letöltött adat</div>
                <div className="font-bold">{formatBytes(result.loadedBytes)}</div>
              </div>
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 text-center">
                <Clock className="w-5 h-5 text-gray-500 mx-auto mb-2" aria-hidden="true" />
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Időtartam</div>
                <div className="font-bold">{(result.durationMs / 1000).toFixed(2)} mp</div>
              </div>
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 text-center">
                <TrendingDown className="w-5 h-5 text-[#00ffff] mx-auto mb-2" aria-hidden="true" />
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Minősítés</div>
                <div className={`font-bold ${getQualityLabel(result.downloadSpeedMbps).color}`}>
                  {getQualityLabel(result.downloadSpeedMbps).label}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
