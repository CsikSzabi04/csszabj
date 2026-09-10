"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Zap, HardDrive, Globe, Loader2, Gauge, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { fetchPageViaServer } from "../../lib/page-fetch";
import { formatBytes } from "../../lib/format";

interface ResourceCount {
  label: string;
  count: number;
  color: string;
}

interface SpeedStats {
  url: string;
  status: number;
  redirects: number;
  ttfbMs: number;
  totalMs: number;
  transferBytes: number;
  decodedBytes: number;
  contentEncoding: string | null;
  resources: ResourceCount[];
}

function countResources(html: string): ResourceCount[] {
  // Inert parse: nothing from the page is executed or downloaded.
  const doc = new DOMParser().parseFromString(html, "text/html");
  return [
    { label: "Külső szkriptek", count: doc.querySelectorAll("script[src]").length, color: "#00a8ff" },
    { label: "Inline szkriptek", count: doc.querySelectorAll("script:not([src])").length, color: "#9b59b6" },
    { label: "Stíluslapok", count: doc.querySelectorAll('link[rel~="stylesheet" i]').length, color: "#00ff41" },
    { label: "Képek", count: doc.querySelectorAll("img").length, color: "#ff2d2d" },
    { label: "Iframe-ek", count: doc.querySelectorAll("iframe").length, color: "#f39c12" },
  ];
}

function TimeCard({ title, timeMs, icon: Icon, alertThresholdMs }: { title: string; timeMs: number; icon: LucideIcon; alertThresholdMs: number }) {
  const isAlert = timeMs > alertThresholdMs;
  const isWarning = timeMs > alertThresholdMs * 0.7;

  return (
    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 ${isAlert ? "bg-red-500" : isWarning ? "bg-yellow-500" : "bg-[#f39c12]"}`} />
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#f39c12]" aria-hidden="true" />
        </div>
        <div>
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] block mb-1">{title}</span>
          <span className={`text-2xl font-bold ${isAlert ? "text-red-500" : isWarning ? "text-yellow-500" : "text-white"}`}>
            {Math.round(timeMs)} ms
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SpeedTest() {
  const [urlInput, setUrlInput] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [stats, setStats] = useState<SpeedStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    if (!urlInput.trim() || isTesting) return;
    setIsTesting(true);
    setError(null);
    setStats(null);

    try {
      const page = await fetchPageViaServer(urlInput.trim());
      setStats({
        url: page.url,
        status: page.status,
        redirects: page.redirects,
        ttfbMs: page.ttfbMs,
        totalMs: page.totalMs,
        transferBytes: page.transferBytes,
        decodedBytes: page.decodedBytes,
        contentEncoding: page.contentEncoding,
        resources: countResources(page.html),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba a teszt során.");
    } finally {
      setIsTesting(false);
    }
  };

  const maxResourceCount = stats ? Math.max(1, ...stats.resources.map((resource) => resource.count)) : 1;
  const compressionSaved =
    stats && stats.contentEncoding && stats.decodedBytes > 0
      ? Math.max(0, Math.round((1 - stats.transferBytes / stats.decodedBytes) * 100))
      : null;

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-6xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#f39c12] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 xl:col-span-4 space-y-6">
            <form
              className="bg-[#0a0a0f] border border-white/5 p-8 rounded-3xl shadow-xl"
              onSubmit={(event) => {
                event.preventDefault();
                void runTest();
              }}
            >
              <div className="flex items-center gap-2 text-[#f39c12] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Gauge className="w-4 h-4" aria-hidden="true" />
                <span>Server Probe</span>
              </div>

              <h1 className="text-2xl font-bold mb-2">Sebességteszt</h1>
              <p className="text-gray-500 text-sm mb-6">
                A HTML dokumentum valós mérése a szerverünkről: válaszidő (TTFB), teljes letöltési idő és a ténylegesen átvitt méret.
                A képek és szkriptek betöltési ideje nem része a mérésnek.
              </p>

              <div className="relative mb-6">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" aria-hidden="true" />
                <input
                  type="text"
                  inputMode="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://pelda.hu"
                  aria-label="Weboldal címe"
                  maxLength={2048}
                  autoComplete="url"
                  className="w-full bg-[#050508] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-[#f39c12]/40 focus:outline-none transition-all"
                />
              </div>

              {error && (
                <div role="alert" className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-mono">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!urlInput.trim() || isTesting}
                className="w-full bg-[#f39c12] hover:bg-[#e67e22] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-black tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(243,156,18,0.1)] enabled:hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {isTesting ? <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> TESZT FOLYAMATBAN...</> : "TESZT INDÍTÁSA"}
              </button>
            </form>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-12 xl:col-span-8" aria-live="polite">
            <AnimatePresence mode="wait">
              {stats ? (
                <motion.div key="results" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <p className="text-sm font-mono text-gray-400 break-all">
                    {stats.url}{" "}
                    <span className={stats.status >= 400 ? "text-red-400" : "text-[#00ff41]"}>(HTTP {stats.status})</span>
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TimeCard title="TTFB (Time To First Byte)" timeMs={stats.ttfbMs} icon={Zap} alertThresholdMs={800} />
                    <TimeCard title="Teljes letöltés" timeMs={stats.totalMs} icon={Clock} alertThresholdMs={3000} />
                  </div>

                  <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-8">
                    <h2 className="text-sm font-mono text-[#f39c12] uppercase tracking-[0.4em] mb-6">Erőforrások a HTML-ben</h2>

                    <div className="space-y-4">
                      {stats.resources.map((resource) => (
                        <div key={resource.label} className="relative pt-6">
                          <div className="absolute top-0 left-0 flex justify-between w-full text-[10px] font-mono text-gray-500">
                            <span>{resource.label}</span>
                            <span>{resource.count} db</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-[width] duration-700 ease-out"
                              style={{ width: `${(resource.count / maxResourceCount) * 100}%`, backgroundColor: resource.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-1">Átvitt adat</span>
                        <span className="text-lg font-bold flex items-center gap-2"><HardDrive className="w-4 h-4 text-[#f39c12]" aria-hidden="true" /> {formatBytes(stats.transferBytes)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-1">Kibontott méret</span>
                        <span className="text-lg font-bold">{formatBytes(stats.decodedBytes)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-1">Tömörítés</span>
                        <span className="text-lg font-bold">
                          {stats.contentEncoding ? `${stats.contentEncoding}${compressionSaved !== null ? ` (−${compressionSaved}%)` : ""}` : "Nincs"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-1">Átirányítások</span>
                        <span className="text-lg font-bold">{stats.redirects}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-[#0a0a0f]/50"
                >
                  <div className="w-20 h-20 bg-[#f39c12]/5 rounded-full flex items-center justify-center mb-6">
                    <Gauge className="w-10 h-10 text-[#f39c12]/50" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-500">Készen áll a tesztre</h2>
                  <p className="text-gray-600 text-sm max-w-xs mt-2 uppercase font-mono tracking-widest">
                    Add meg a weboldal címét a mérés indításához
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
