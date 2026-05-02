"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FileDown, Download, ZoomIn, ZoomOut, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function CVPage() {
  const [origin, setOrigin] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setOrigin(window.location.origin);
  }, []);

  // Alapértelmezett éles URL a QR kódhoz (mert a telefon nem tudja a localhost-ot beolvasni)
  const productionUrl = "https://csszabj.netlify.app";
  const pdfUrl = origin && origin.includes("localhost") 
    ? `${productionUrl}/Csik_Szabolcs_Alex_CV_FullHD.pdf` 
    : origin ? `${origin}/Csik_Szabolcs_Alex_CV_FullHD.pdf` : "";

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setZoomLevel(1); // Reset zoom
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-mono mb-6 shadow-[0_0_15px_rgba(155,89,182,0.3)] hover:shadow-[0_0_25px_rgba(155,89,182,0.5)] transition-shadow">
            <FileDown className="w-4 h-4" />
            <span>Curriculum Vitae</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Szakmai <span className="text-[#9b59b6] drop-shadow-[0_0_15px_rgba(155,89,182,0.5)]">Önéletrajzom</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tekintsd meg szakmai tapasztalatomat, tudásomat és korábbi munkáimat.  
            Kattints az önéletrajzra a nagyításhoz, vagy töltsd le PDF formátumban.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (Info, Download, QR) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            {/* Download Card */}
            <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-[#9b59b6]/30 transition-colors">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9b59b6]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#9b59b6]/10 border border-[#9b59b6]/30 flex items-center justify-center mb-6 text-[#9b59b6]">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Letöltés</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Szerezd meg a legfrissebb önéletrajzomat nyomtatható és jól olvasható PDF formátumban.
                </p>
                <a
                  href="/Csik_Szabolcs_Alex_CV_FullHD.pdf"
                  download
                  className="w-full flex items-center justify-center gap-2 bg-[#9b59b6]/20 hover:bg-[#9b59b6]/30 text-white font-medium py-3 rounded-xl transition-all border border-[#9b59b6]/50 shadow-[0_0_15px_rgba(155,89,182,0.2)] hover:shadow-[0_0_20px_rgba(155,89,182,0.4)]"
                >
                  <Download className="w-4 h-4" /> Letöltés PDF-ben
                </a>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl relative group hover:border-white/10 transition-colors">
              <div className="relative">
                <h3 className="text-xl font-bold mb-3">Szkenneld be</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Olvasd be a QR-kódot a telefonoddal, hogy azonnal megnyisd / letöltsd az önéletrajzomat.
                </p>
                
                <div className="bg-white p-4 rounded-xl flex items-center justify-center aspect-square shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                  {pdfUrl ? (
                    <QRCodeSVG 
                      value={pdfUrl} 
                      size={200} 
                      fgColor="#050508" 
                      bgColor="#ffffff"
                      includeMargin={false}
                      className="w-full h-full max-w-[200px]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 animate-pulse">
                      ...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (CV Preview) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div 
              onClick={openLightbox}
              className="relative p-2 md:p-6 bg-[#0a0a0f]/50 border border-white/5 rounded-3xl backdrop-blur-sm group cursor-pointer group"
            >
              <div className="absolute inset-0 bg-[#9b59b6]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              
              <div className="relative aspect-[1/1.414] w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover:border-[#9b59b6]/40 transition-colors">
                <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="flex items-center gap-2 bg-[#9b59b6] text-white px-6 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(155,89,182,0.8)] scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                    <span>Nagyítás</span>
                  </div>
                </div>

                <Image
                  src="/cv-preview.png"
                  alt="Önéletrajz Előnézet"
                  fill
                  className="object-contain bg-white"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-50">
              <a
                href="/Csik_Szabolcs_Alex_CV_FullHD.pdf"
                download
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors backdrop-blur-md"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Letöltés</span>
              </a>

              <div className="flex items-center gap-4">
                <div className="flex gap-2 bg-black/50 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  <button 
                    onClick={zoomOut}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                    disabled={zoomLevel <= 1}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <div className="w-px bg-white/10 my-1" />
                  <button 
                    onClick={zoomIn}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                    disabled={zoomLevel >= 3}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                <button 
                  onClick={closeLightbox}
                  className="p-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-full transition-colors backdrop-blur-md border border-red-500/30"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div 
              className="w-full h-full p-4 md:p-12 overflow-auto flex items-center justify-center custom-scrollbar"
              onClick={closeLightbox} // Allow clicking the background to close
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: zoomLevel, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
                className="relative overflow-hidden cursor-move origin-center"
                style={{ 
                  width: 'auto',
                  height: '100%',
                  aspectRatio: '1/1.414',
                  boxShadow: '0 0 50px rgba(0,0,0,0.8)'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                drag={zoomLevel > 1}
                dragConstraints={{ left: -500 * zoomLevel, right: 500 * zoomLevel, top: -500 * zoomLevel, bottom: 500 * zoomLevel }}
                dragElastic={0.1}
                onDoubleClick={() => setZoomLevel(prev => prev > 1 ? 1 : 2)}
              >
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none z-10">
                  {/* Subtle noise/texture overlay for the document */}
                </div>
                <Image
                  src="/cv-preview.png"
                  alt="Önéletrajz"
                  fill
                  className="object-contain bg-white ring-1 ring-white/10"
                  sizes="100vw"
                  quality={100}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
