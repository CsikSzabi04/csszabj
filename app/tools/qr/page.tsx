"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, RefreshCw, Layers, Palette, Type } from "lucide-react";
import Link from "next/link";

export default function QRGenerator() {
  const [text, setText] = useState("https://csszabj.hu");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [level, setLevel] = useState("L");
  
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4 relative">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#9b59b6] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-[#9b59b6] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Type className="w-4 h-4" />
                <span>Input Data</span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Írj be egy URL-t vagy szöveget..."
                className="w-full bg-[#050508] border border-white/10 rounded-xl p-4 text-white focus:border-[#9b59b6]/50 focus:outline-none transition-all placeholder:text-gray-700 min-h-[120px] font-mono text-sm"
              />
            </div>

            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-[#9b59b6] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Palette className="w-4 h-4" />
                <span>Customization</span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Háttérszín</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 bg-transparent border-none cursor-pointer"
                    />
                    <span className="text-sm font-mono text-gray-400">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Mintázat Színe</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 bg-transparent border-none cursor-pointer"
                    />
                    <span className="text-sm font-mono text-gray-400">{fgColor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-500 text-xs font-mono uppercase">Méret ({size}px)</label>
                  </div>
                  <input 
                    type="range" 
                    min="128" 
                    max="512" 
                    step="8"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-[#9b59b6]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs font-mono uppercase">Fehér margó</span>
                  <button 
                    onClick={() => setIncludeMargin(!includeMargin)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${includeMargin ? 'bg-[#9b59b6]' : 'bg-gray-800'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${includeMargin ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Hibajavítási szint</label>
                  <div className="flex gap-2">
                    {['L', 'M', 'Q', 'H'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs transition-all ${level === l ? 'bg-[#9b59b6] text-white shadow-lg' : 'bg-gray-900 text-gray-600 hover:bg-gray-800'}`}
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
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9b59b6]/20 to-[#00a8ff]/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
              <div 
                ref={qrRef}
                className="relative bg-white p-8 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
              >
                <QRCodeSVG
                  value={text}
                  size={256}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={level as any}
                  includeMargin={includeMargin}
                  className="mx-auto"
                />
              </div>
              
              <div className="absolute top-4 right-4 text-[10px] font-mono text-black/20">
                VER: {level} / SIZE: {size}
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
              <button 
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center gap-2 bg-[#9b59b6] hover:bg-[#8e44ad] text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-[#9b59b6]/20 transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <Download className="w-5 h-5" />
                PNG LETÖLTÉSE
              </button>
              <button 
                onClick={() => { setText(""); setBgColor("#ffffff"); setFgColor("#000000"); }}
                className="w-16 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-gray-400 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
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
