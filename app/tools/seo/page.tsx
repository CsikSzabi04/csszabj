"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Code, Globe, MessageSquare, Layout, Link as LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { fetchPageViaServer } from "../../lib/page-fetch";

type Status = "ok" | "warn" | "fail";

interface SEOResult {
  title: string;
  description: string;
  h1: string[];
  h2Count: number;
  hasViewport: boolean;
  hasCharset: boolean;
  hasCanonical: boolean;
  imagesCount: number;
  imagesMissingAlt: number;
  linksCount: number;
  linksNoFollow: number;
  httpStatus: number | null;
  finalUrl: string | null;
}

const MAX_HTML_LENGTH = 5_000_000;

function analyzeHtml(html: string): Omit<SEOResult, "httpStatus" | "finalUrl"> {
  // DOMParser builds an inert document: scripts don't run and nothing is rendered or loaded.
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const images = Array.from(doc.querySelectorAll("img"));
  const links = Array.from(doc.querySelectorAll("a[href]"));

  return {
    title: text(doc.querySelector("title")) || "Nincs cím",
    description: doc.querySelector('meta[name="description" i]')?.getAttribute("content")?.trim() || "Nincs leírás",
    h1: Array.from(doc.querySelectorAll("h1")).map(text),
    h2Count: doc.querySelectorAll("h2").length,
    hasViewport: Boolean(doc.querySelector('meta[name="viewport" i]')),
    hasCharset: Boolean(doc.querySelector('meta[charset], meta[http-equiv="content-type" i]')),
    hasCanonical: Boolean(doc.querySelector('link[rel~="canonical" i]')),
    imagesCount: images.length,
    imagesMissingAlt: images.filter((img) => !img.hasAttribute("alt")).length,
    linksCount: links.length,
    linksNoFollow: links.filter((link) => link.getAttribute("rel")?.toLowerCase().includes("nofollow")).length,
  };
}

const STATUS_STYLES: Record<Status, { glow: string; badge: string }> = {
  ok: { glow: "bg-[#00ff41]", badge: "bg-[#00ff41]/10 text-[#00ff41]" },
  warn: { glow: "bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-500" },
  fail: { glow: "bg-red-500", badge: "bg-red-500/10 text-red-500" },
};

function StatusIcon({ status, className }: { status: Status; className: string }) {
  if (status === "ok") return <CheckCircle2 className={className} aria-hidden="true" />;
  if (status === "warn") return <AlertTriangle className={className} aria-hidden="true" />;
  return <XCircle className={className} aria-hidden="true" />;
}

function MetricCard({ title, value, status }: { title: string; value: string; status: Status }) {
  return (
    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 ${STATUS_STYLES[status].glow}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">{title}</span>
          <span className="text-xl font-bold block mb-1">{value}</span>
        </div>
        <div className={`p-2 rounded-lg ${STATUS_STYLES[status].badge}`}>
          <StatusIcon status={status} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default function SEOChecker() {
  const [mode, setMode] = useState<"url" | "html">("url");
  const [urlInput, setUrlInput] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [result, setResult] = useState<SEOResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSEO = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      if (mode === "html") {
        if (!htmlInput.trim()) throw new Error("Kérlek adj meg HTML kódot!");
        setResult({ ...analyzeHtml(htmlInput), httpStatus: null, finalUrl: null });
      } else {
        if (!urlInput.trim()) throw new Error("Kérlek adj meg egy URL-t!");
        const page = await fetchPageViaServer(urlInput.trim());
        if (!page.html.trim()) throw new Error("Üres válasz érkezett az oldalról.");
        setResult({ ...analyzeHtml(page.html), httpStatus: page.status, finalUrl: page.url });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba történt az elemzés során.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canSubmit = !isAnalyzing && (mode === "url" ? urlInput.trim() !== "" : htmlInput.trim() !== "");

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-16 px-4">
      <div className="container-custom max-w-6xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00ff41] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 xl:col-span-5">
            <form
              className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl"
              onSubmit={(event) => {
                event.preventDefault();
                if (canSubmit) void analyzeSEO();
              }}
            >
              <div className="flex items-center justify-between gap-4 p-1 bg-black/40 rounded-xl border border-white/5" role="tablist" aria-label="Bemenet típusa">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "url"}
                  onClick={() => setMode("url")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${mode === "url" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-white"}`}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  URL
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "html"}
                  onClick={() => setMode("html")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${mode === "html" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-white"}`}
                >
                  <Code className="w-4 h-4" aria-hidden="true" />
                  HTML
                </button>
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl font-bold">SEO Elemző</h1>
                <p className="text-gray-500 text-sm">
                  {mode === "url"
                    ? "Add meg az elemezni kívánt weboldal címét. Az oldal nyilvános HTML-jét a szerverünk kéri le, az elemzés a böngésződben fut."
                    : "Másold be az oldal HTML kódját az elemzéshez. Semmi nem hagyja el a böngésződet."}
                </p>

                {mode === "url" ? (
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" aria-hidden="true" />
                    <input
                      type="text"
                      inputMode="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://pelda.hu"
                      aria-label="Weboldal címe"
                      maxLength={2048}
                      autoComplete="url"
                      className="w-full bg-[#050508] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-[#00ff41]/40 focus:outline-none transition-all"
                    />
                  </div>
                ) : (
                  <textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<!DOCTYPE html>..."
                    aria-label="HTML kód"
                    maxLength={MAX_HTML_LENGTH}
                    spellCheck={false}
                    className="w-full h-[300px] bg-[#050508] border border-white/10 rounded-2xl p-6 text-gray-400 font-mono text-sm focus:border-[#00ff41]/40 focus:outline-none transition-all resize-none"
                  />
                )}
              </div>

              {error && (
                <div role="alert" className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-[#00ff41] hover:bg-[#00e039] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-black tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(0,255,65,0.1)] enabled:hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    ELEMZÉS...
                  </>
                ) : (
                  "AUDIT INDÍTÁSA"
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Area */}
          <div className="lg:col-span-12 xl:col-span-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div key="results" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <div className="bg-gradient-to-r from-[#00ff41]/10 to-transparent border border-[#00ff41]/20 p-8 rounded-3xl">
                    <h2 className="text-sm font-mono text-[#00ff41] uppercase tracking-[0.4em] mb-4">Audit Summary</h2>
                    <div className="space-y-4">
                      {result.finalUrl && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">URL</span>
                          <p className="text-sm text-gray-300 mt-1 break-all font-mono">
                            {result.finalUrl}{" "}
                            <span className={result.httpStatus !== null && result.httpStatus >= 400 ? "text-red-400" : "text-[#00ff41]"}>
                              (HTTP {result.httpStatus})
                            </span>
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Title Meta</span>
                        <p className="text-lg font-bold text-white mt-1 break-words">{result.title}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Meta Description</span>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed break-words">{result.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <MetricCard
                      title="H1 Megjelenés"
                      value={result.h1.length === 1 ? "Optimális (1)" : `${result.h1.length} darab`}
                      status={result.h1.length === 1 ? "ok" : result.h1.length === 0 ? "fail" : "warn"}
                    />
                    <MetricCard
                      title="Képek Alt Text"
                      value={`${result.imagesCount - result.imagesMissingAlt} / ${result.imagesCount}`}
                      status={result.imagesMissingAlt === 0 ? "ok" : "warn"}
                    />
                    <MetricCard
                      title="Technikai Tag-ek"
                      value={result.hasViewport && result.hasCharset ? "Megfelelő" : "Hiányos"}
                      status={result.hasViewport && result.hasCharset ? "ok" : "fail"}
                    />
                    <MetricCard
                      title="Link Struktúra"
                      value={`${result.linksCount} link${result.linksNoFollow > 0 ? ` (${result.linksNoFollow} nofollow)` : ""}`}
                      status="ok"
                    />
                  </div>

                  <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-8">
                    <div className="flex items-center gap-2 mb-8">
                      <Layout className="w-5 h-5 text-[#00ff41]" aria-hidden="true" />
                      <h3 className="text-sm font-mono uppercase tracking-[0.3em]">Detailed Report</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg mt-1 ${result.hasCanonical ? STATUS_STYLES.ok.badge : STATUS_STYLES.fail.badge}`}>
                          <StatusIcon status={result.hasCanonical ? "ok" : "fail"} className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Canonical Link</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.hasCanonical
                              ? "A canonical tag megfelelően be van állítva, segít elkerülni a duplikált tartalom problémákat."
                              : "Hiányzik a canonical link! Ez keresőoptimalizálási hibákhoz vezethet."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg mt-1 ${result.h2Count > 2 ? STATUS_STYLES.ok.badge : STATUS_STYLES.warn.badge}`}>
                          <MessageSquare className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Címsor Struktúra (H2)</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.h2Count} darab H2 címsort találtam az oldalon. A megfelelő struktúra segíti az olvashatóságot.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Globe className="w-10 h-10 text-gray-700" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-500">Várakozás az adatokra</h2>
                  <p className="text-gray-600 text-sm max-w-xs mt-2 uppercase font-mono tracking-widest">
                    {mode === "url" ? "Add meg az URL-t az elemzéshez" : "Másold be a HTML kódot az elemzéshez"}
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
