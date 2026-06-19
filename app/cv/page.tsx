"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileDown, Download, Maximize2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// The embedded CV is designed at a fixed 1000px width (see public/cv/index.html).
// We render the iframe at that native width and scale it to fit (and now fill) the
// available width, so the in-document PDF/PNG export always captures the full-quality
// desktop layout while the on-page preview can grow larger than the original design.
const CV_DESIGN_WIDTH = 1000;
const CV_MAX_SCALE = 1.6; // allow upscaling so the CV fills wide screens

export default function CVPage() {
  const [origin, setOrigin] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Live-CV iframe sizing (inline embed)
  const cvWrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [cvHeight, setCvHeight] = useState(1700); // sensible default to avoid layout jump

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setOrigin(window.location.origin);
  }, []);

  // Alapértelmezett éles URL a QR kódhoz (mert a telefon nem tudja a localhost-ot beolvasni)
  const productionUrl = "https://csszabj.netlify.app";
  const pdfUrl = origin && origin.includes("localhost")
    ? `${productionUrl}/Csik_Szabolcs_Alex_CV_FullHD.pdf`
    : origin ? `${origin}/Csik_Szabolcs_Alex_CV_FullHD.pdf` : "";

  // Scale the iframe so its 1000px design exactly fills the current wrapper width.
  // By construction visual width === wrapper width, so it can never clip.
  const recalcScale = useCallback(() => {
    const el = cvWrapRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (w > 0) setScale(Math.min(w / CV_DESIGN_WIDTH, CV_MAX_SCALE));
  }, []);

  useEffect(() => {
    const el = cvWrapRef.current;
    if (!el) return;
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    ro.observe(el);
    window.addEventListener("resize", recalcScale);
    // Recompute once more after layout/fonts settle (covers transient widths during hydration).
    const t1 = setTimeout(recalcScale, 200);
    const t2 = setTimeout(recalcScale, 800);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalcScale);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [recalcScale]);

  // The embedded CV reports its content height so the iframe can auto-size
  // without a nested scrollbar.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (
        e.data &&
        e.data.type === "cv-height" &&
        typeof e.data.height === "number" &&
        e.data.height > 0
      ) {
        setCvHeight(e.data.height);
        recalcScale();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [recalcScale]);

  // Lock body scroll while the fullscreen preview is open.
  useEffect(() => {
    if (!isPreviewOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isPreviewOpen]);

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background HUD Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(155,89,182,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(155,89,182,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Animated HUD Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9b59b6]/30 to-transparent"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-mono mb-6 shadow-[0_0_15px_rgba(155,89,182,0.3)] hover:shadow-[0_0_25px_rgba(155,89,182,0.5)] transition-shadow">
            <FileDown className="w-4 h-4" />
            <span>Curriculum Vitae</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Szakmai <span className="text-[#9b59b6] drop-shadow-[0_0_15px_rgba(155,89,182,0.5)]">Önéletrajzom</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tekintsd meg az interaktív önéletrajzomat. Válts nyelvet, nagyítsd teljes
            nézetbe, vagy mentsd el közvetlenül PDF / PNG formátumban a beépített eszköztárral.
          </p>
        </motion.div>

        {/* Top row: Download + QR (compact, side by side) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10"
        >
          {/* Download Card */}
          <div className="p-6 sm:p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-[#9b59b6]/30 transition-colors flex items-center gap-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9b59b6]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl bg-[#9b59b6]/10 border border-[#9b59b6]/30 flex items-center justify-center text-[#9b59b6]">
              <Download className="w-7 h-7" />
            </div>
            <div className="relative flex-1">
              <h3 className="text-xl font-bold mb-1">Letöltés</h3>
              <p className="text-gray-400 mb-4 text-sm">
                A legfrissebb önéletrajzom nyomtatható PDF formátumban.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/Csik_Szabolcs_Alex_CV_FullHD.pdf"
                  download
                  data-hoverable
                  className="flex items-center justify-center gap-2 bg-[#9b59b6]/20 hover:bg-[#9b59b6]/30 text-white font-medium px-4 py-2.5 rounded-xl transition-all border border-[#9b59b6]/50 shadow-[0_0_15px_rgba(155,89,182,0.2)] hover:shadow-[0_0_20px_rgba(155,89,182,0.4)] text-sm"
                >
                  <Download className="w-4 h-4" /> PDF
                </a>
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  data-hoverable
                  className="flex items-center justify-center gap-2 text-gray-300 hover:text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm border border-white/10 hover:border-white/20"
                >
                  <Maximize2 className="w-4 h-4" /> Teljes nézet
                </button>
              </div>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="p-6 sm:p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-white/10 transition-colors flex items-center gap-6">
            <div className="bg-white p-3 rounded-xl flex items-center justify-center w-28 h-28 flex-shrink-0 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              {pdfUrl ? (
                <QRCodeSVG
                  value={pdfUrl}
                  size={200}
                  fgColor="#050508"
                  bgColor="#ffffff"
                  includeMargin={false}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 animate-pulse">
                  ...
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Szkenneld be</h3>
              <p className="text-gray-400 text-sm">
                Olvasd be a QR-kódot a telefonoddal, hogy azonnal megnyisd / letöltsd az önéletrajzomat.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Full-width live interactive CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative p-2 md:p-4 bg-[#0a0a0f]/50 border border-white/5 rounded-3xl backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[#9b59b6]/5 blur-3xl opacity-50 rounded-3xl pointer-events-none" />

          {/* Fullscreen / zoom button (sits above the iframe) */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            data-hoverable
            aria-label="Nagyítás teljes nézetbe"
            className="absolute top-5 right-5 md:top-7 md:right-7 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#9b59b6]/90 hover:bg-[#9b59b6] text-white text-sm font-medium shadow-[0_0_20px_rgba(155,89,182,0.6)] backdrop-blur-sm transition-all hover:scale-105"
          >
            <Maximize2 className="w-4 h-4" /> Nagyítás
          </button>

          <div
            ref={cvWrapRef}
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            style={{ height: cvHeight * scale }}
          >
            <iframe
              src="/cv/index.html"
              title="Csík Szabolcs Alex – Önéletrajz"
              loading="lazy"
              onLoad={recalcScale}
              style={{
                width: CV_DESIGN_WIDTH,
                height: cvHeight,
                border: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Preview / Lightbox */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 md:p-8"
            onClick={() => setIsPreviewOpen(false)}
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              data-hoverable
              aria-label="Bezárás"
              className="absolute top-4 right-4 z-[110] p-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-full transition-colors backdrop-blur-md border border-red-500/30"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-[1100px] h-[92vh] rounded-2xl overflow-hidden border border-white/10 bg-[#07080c] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="/cv/index.html"
                title="Csík Szabolcs Alex – Önéletrajz (teljes nézet)"
                className="w-full h-full"
                style={{ border: 0 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
