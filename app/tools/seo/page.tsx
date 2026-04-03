"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, CheckCircle2, XCircle, AlertTriangle, Code, Globe, MessageSquare, Layout, Link as LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";

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
}

export default function SEOChecker() {
  const [mode, setMode] = useState<"url" | "html">("url");
  const [urlInput, setUrlInput] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [result, setResult] = useState<SEOResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performAnalysis = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const title = doc.querySelector("title")?.innerText || "Nincs cím";
    const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "Nincs leírás";
    const h1s = Array.from(doc.querySelectorAll("h1")).map(h => h.innerText);
    const h2Count = doc.querySelectorAll("h2").length;
    const hasViewport = !!doc.querySelector('meta[name="viewport"]');
    const hasCharset = !!doc.querySelector('meta[charset]');
    const hasCanonical = !!doc.querySelector('link[rel="canonical"]');
    
    const images = doc.querySelectorAll("img");
    const imagesMissingAlt = Array.from(images).filter(img => !img.getAttribute("alt")).length;
    
    const links = doc.querySelectorAll("a");
    const linksNoFollow = Array.from(links).filter(link => link.getAttribute("rel")?.includes("nofollow")).length;

    setResult({
      title,
      description,
      h1: h1s,
      h2Count,
      hasViewport,
      hasCharset,
      hasCanonical,
      imagesCount: images.length,
      imagesMissingAlt,
      linksCount: links.length,
      linksNoFollow,
    });
  };

  const analyzeSEO = async () => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      if (mode === "html") {
        if (!htmlInput) throw new Error("Kérlek adj meg HTML kódot!");
        performAnalysis(htmlInput);
      } else {
        if (!urlInput) throw new Error("Kérlek adj meg egy URL-t!");
        
        let targetUrl = urlInput;
        if (!targetUrl.startsWith("http")) targetUrl = "https://" + targetUrl;

        // Using a CORS proxy for client-side fetching
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error("Nem sikerült lekérni az oldalt.");
        
        const html = await response.text();
        if (html) {
          performAnalysis(html);
        } else {
          throw new Error("Üres válasz érkezett az oldalról.");
        }
      }
    } catch (err: any) {
      setError(err.message || "Ismeretlen hiba történt az elemzés során.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const MetricCard = ({ title, value, status }: any) => (
    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 ${status === 'ok' ? 'bg-[#00ff41]' : status === 'warn' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">{title}</span>
          <span className="text-xl font-bold block mb-1">{value}</span>
        </div>
        <div className={`p-2 rounded-lg ${status === 'ok' ? 'bg-[#00ff41]/10 text-[#00ff41]' : status === 'warn' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
          {status === 'ok' ? <CheckCircle2 className="w-5 h-5" /> : status === 'warn' ? <AlertTriangle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4">
      <div className="container-custom max-w-6xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00ff41] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-12 xl:col-span-5"
          >
            <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4 p-1 bg-black/40 rounded-xl border border-white/5">
                <button 
                  onClick={() => setMode("url")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${mode === "url" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-white"}`}
                >
                  <Globe className="w-4 h-4" />
                  URL
                </button>
                <button 
                  onClick={() => setMode("html")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${mode === "html" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-white"}`}
                >
                  <Code className="w-4 h-4" />
                  HTML
                </button>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">SEO Elemző</h2>
                <p className="text-gray-500 text-sm">
                  {mode === "url" 
                    ? "Add meg az elemezni kívánt weboldal címét." 
                    : "Másold be az oldal HTML kódját az elemzéshez."}
                </p>
                
                {mode === "url" ? (
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://pelda.hu"
                      className="w-full bg-[#050508] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:border-[#00ff41]/40 focus:outline-none transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && urlInput && !isAnalyzing) {
                          analyzeSEO();
                        }
                      }}
                    />
                  </div>
                ) : (
                  <textarea
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="<!DOCTYPE html>..."
                    className="w-full h-[300px] bg-[#050508] border border-white/10 rounded-2xl p-6 text-gray-400 font-mono text-sm focus:border-[#00ff41]/40 focus:outline-none transition-all resize-none"
                  />
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button 
                onClick={analyzeSEO}
                disabled={isAnalyzing || (mode === "url" ? !urlInput : !htmlInput)}
                className="w-full bg-[#00ff41] hover:bg-[#00e039] disabled:bg-gray-800 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-black tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(0,255,65,0.1)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    ELEMZÉS...
                  </>
                ) : (
                  "AUDIT INDÍTÁSA"
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Area */}
          <div className="lg:col-span-12 xl:col-span-7">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-[#00ff41]/10 to-transparent border border-[#00ff41]/20 p-8 rounded-3xl">
                    <h3 className="text-sm font-mono text-[#00ff41] uppercase tracking-[0.4em] mb-4">Audit Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Title Meta</span>
                        <p className="text-lg font-bold text-white mt-1">{result.title}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Meta Description</span>
                        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{result.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <MetricCard 
                      title="H1 Megjelenés" 
                      value={result.h1.length === 1 ? "Optimális (1)" : `${result.h1.length} darab`}
                      status={result.h1.length === 1 ? 'ok' : result.h1.length === 0 ? 'fail' : 'warn'}
                    />
                    <MetricCard 
                      title="Képek Alt Text" 
                      value={`${result.imagesCount - result.imagesMissingAlt} / ${result.imagesCount}`}
                      status={result.imagesMissingAlt === 0 ? 'ok' : 'warn'}
                    />
                    <MetricCard 
                      title="Technikai Tag-ek" 
                      value={result.hasViewport && result.hasCharset ? "Megfelelő" : "Hiányos"}
                      status={result.hasViewport && result.hasCharset ? 'ok' : 'fail'}
                    />
                    <MetricCard 
                      title="Link Struktúra" 
                      value={`${result.linksCount} Link`}
                      status="ok"
                    />
                  </div>

                  <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-8">
                    <div className="flex items-center gap-2 mb-8">
                      <Layout className="w-5 h-5 text-[#00ff41]" />
                      <h4 className="text-sm font-mono uppercase tracking-[0.3em]">Detailed Report</h4>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg mt-1 ${result.hasCanonical ? 'bg-[#00ff41]/10 text-[#00ff41]' : 'bg-red-500/10 text-red-500'}`}>
                          {result.hasCanonical ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
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
                        <div className={`p-2 rounded-lg mt-1 ${result.h2Count > 2 ? 'bg-[#00ff41]/10 text-[#00ff41]' : 'bg-yellow-500/10 text-yellow-500'}`}>
                          <MessageSquare className="w-4 h-4" />
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
                    <Globe className="w-10 h-10 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-500">Várakozás az adatokra</h3>
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
