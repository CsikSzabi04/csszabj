"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileDown, Download, Maximize2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { CV_PDF_PATH, SITE_URL } from "../lib/site";

// The embedded CV is designed at a fixed 1000px width (see public/cv/index.html).
// The iframe is rendered at that native width and scaled to fill the available width, so the
// in-document PDF/PNG export always captures the full-quality desktop layout.
const CV_DESIGN_WIDTH = 1000;
const CV_MAX_SCALE = 1.6; // allow upscaling so the CV fills wide screens
const CV_MIN_HEIGHT = 600;
const CV_MAX_HEIGHT = 12_000;
// The QR code always points at the production site, so it also works when scanned from a dev build.
const PDF_URL = `${SITE_URL}${CV_PDF_PATH}`;

export default function CVPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [cvHeight, setCvHeight] = useState(1700); // sensible default to avoid layout jump

  const cvWrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scale the iframe so its 1000px design exactly fills the current wrapper width.
  const recalcScale = useCallback(() => {
    const el = cvWrapRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    if (width > 0) setScale(Math.min(width / CV_DESIGN_WIDTH, CV_MAX_SCALE));
  }, []);

  useEffect(() => {
    const el = cvWrapRef.current;
    if (!el) return;
    // ResizeObserver reports the initial size right after observe(), then every change.
    const observer = new ResizeObserver(recalcScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [recalcScale]);

  // The embedded CV reports its content height so the iframe can auto-size without a nested
  // scrollbar. Only messages from our own inline iframe are accepted, and the value is clamped.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data as { type?: unknown; height?: unknown } | null;
      if (!data || data.type !== "cv-height" || typeof data.height !== "number" || !Number.isFinite(data.height)) return;
      setCvHeight(Math.min(Math.max(Math.round(data.height), CV_MIN_HEIGHT), CV_MAX_HEIGHT));
      recalcScale();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [recalcScale]);

  // Fullscreen preview: lock page scroll, close on Escape, move focus into the dialog.
  useEffect(() => {
    if (!isPreviewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isPreviewOpen]);

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background HUD Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(155,89,182,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(155,89,182,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9b59b6]/30 to-transparent"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-mono mb-6 shadow-[0_0_15px_rgba(155,89,182,0.3)] hover:shadow-[0_0_25px_rgba(155,89,182,0.5)] transition-shadow">
            <FileDown className="w-4 h-4" aria-hidden="true" />
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

        {/* Top row: Download + QR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10"
        >
          <div className="p-6 sm:p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-[#9b59b6]/30 transition-colors flex items-center gap-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9b59b6]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl bg-[#9b59b6]/10 border border-[#9b59b6]/30 flex items-center justify-center text-[#9b59b6]">
              <Download className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="relative flex-1">
              <h3 className="text-xl font-bold mb-1">Letöltés</h3>
              <p className="text-gray-400 mb-4 text-sm">A legfrissebb önéletrajzom nyomtatható PDF formátumban.</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CV_PDF_PATH}
                  download
                  data-hoverable
                  className="flex items-center justify-center gap-2 bg-[#9b59b6]/20 hover:bg-[#9b59b6]/30 text-white font-medium px-4 py-2.5 rounded-xl transition-all border border-[#9b59b6]/50 shadow-[0_0_15px_rgba(155,89,182,0.2)] hover:shadow-[0_0_20px_rgba(155,89,182,0.4)] text-sm"
                >
                  <Download className="w-4 h-4" aria-hidden="true" /> PDF
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  data-hoverable
                  className="flex items-center justify-center gap-2 text-gray-300 hover:text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm border border-white/10 hover:border-white/20"
                >
                  <Maximize2 className="w-4 h-4" aria-hidden="true" /> Teljes nézet
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-white/10 transition-colors flex items-center gap-6">
            <div className="bg-white p-3 rounded-xl flex items-center justify-center w-28 h-28 flex-shrink-0 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <QRCodeSVG
                value={PDF_URL}
                size={200}
                fgColor="#050508"
                bgColor="#ffffff"
                marginSize={0}
                title="QR kód az önéletrajz PDF-hez"
                className="w-full h-full"
              />
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

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            data-hoverable
            aria-label="Nagyítás teljes nézetbe"
            className="absolute top-5 right-5 md:top-7 md:right-7 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#9b59b6]/90 hover:bg-[#9b59b6] text-white text-sm font-medium shadow-[0_0_20px_rgba(155,89,182,0.6)] backdrop-blur-sm transition-all hover:scale-105"
          >
            <Maximize2 className="w-4 h-4" aria-hidden="true" /> Nagyítás
          </button>

          <div
            ref={cvWrapRef}
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            style={{ height: cvHeight * scale }}
          >
            <iframe
              ref={iframeRef}
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
            role="dialog"
            aria-modal="true"
            aria-label="Önéletrajz teljes nézetben"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 md:p-8"
            onClick={() => setIsPreviewOpen(false)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              data-hoverable
              aria-label="Bezárás"
              className="absolute top-4 right-4 z-[110] p-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-full transition-colors backdrop-blur-md border border-red-500/30"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-[1100px] h-[92vh] rounded-2xl overflow-hidden border border-white/10 bg-[#07080c] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(event) => event.stopPropagation()}
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
