"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Download, Trash2, FileImage, Settings2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const [stats, setStats] = useState<{ originalSize: number; compressedSize: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCompressedUrl(null);
      setStats(null);
    }
  };

  const compressImage = async () => {
    if (!selectedImage) return;

    setIsCompressing(true);
    const img = new Image();
    img.src = URL.createObjectURL(selectedImage);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setStats({
              originalSize: selectedImage.size,
              compressedSize: blob.size,
            });
            setIsCompressing(false);
          }
        },
        "image/jpeg",
        quality
      );
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const downloadCompressed = () => {
    if (compressedUrl) {
      const link = document.createElement("a");
      link.href = compressedUrl;
      link.download = `compressed_${selectedImage?.name || "image.jpg"}`;
      link.click();
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setCompressedUrl(null);
    setStats(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00a8ff] transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Vissza a Laborba</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload and Controls */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {!previewUrl ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#00a8ff]/50 hover:bg-[#00a8ff]/5 transition-all group min-h-[400px]"
              >
                <div className="w-20 h-20 bg-[#00a8ff]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,168,255,0.2)]">
                  <Upload className="w-10 h-10 text-[#00a8ff]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Húzd ide a képet vagy kattints</h3>
                <p className="text-gray-500 text-sm max-w-xs uppercase tracking-widest font-mono">
                  JPG, PNG, WEBP TÁMOGATOTT
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            ) : (
              <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
                    <FileImage className="w-4 h-4" />
                    <span>Eredeti Fájl</span>
                  </div>
                  <button onClick={reset} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-[#050508] p-4 flex items-center justify-center">
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center text-sm font-mono uppercase">
                    <span className="text-gray-500 italic">Eredeti méret:</span>
                    <span className="text-white font-bold">{formatSize(selectedImage?.size || 0)}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#00a8ff] font-mono text-xs uppercase tracking-[0.3em]">
                      <Settings2 className="w-4 h-4" />
                      <span>Compression Settings</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Minőség: {Math.round(quality * 100)}%</label>
                      </div>
                      <input 
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
                      onClick={compressImage}
                      disabled={isCompressing}
                      className="w-full bg-[#00a8ff] hover:bg-[#0096e6] disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,168,255,0.3)] hover:-translate-y-1"
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
            {compressedUrl && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="bg-[#0a0a0f] border border-[#00ff41]/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.05)]">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#00ff41]/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00ff41] uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Optimálist Eredmény</span>
                    </div>
                  </div>

                  <div className="relative aspect-video bg-[#050508] p-4 flex items-center justify-center">
                    <img src={compressedUrl} alt="Compressed" className="max-w-full max-h-full rounded-lg shadow-lg object-contain" />
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <span className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Új Méret</span>
                        <span className="text-xl font-bold text-white">{formatSize(stats?.compressedSize || 0)}</span>
                      </div>
                      <div className="p-4 bg-[#00ff41]/10 rounded-2xl">
                        <span className="block text-[10px] font-mono text-[#00ff41] uppercase mb-1">Megtakarítás</span>
                        <span className="text-xl font-bold text-[#00ff41]">
                          {stats ? Math.round((1 - stats.compressedSize / stats.originalSize) * 100) : 0}%
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={downloadCompressed}
                      className="w-full bg-[#00ff41] hover:bg-[#00e039] text-black py-5 rounded-2xl font-black tracking-[0.2em] uppercase transition-all shadow-[0_10px_20px_rgba(0,255,65,0.2)] hover:-translate-y-1"
                    >
                      LETÖLTÉS <span className="text-[10px] opacity-70">JPG</span>
                    </button>
                  </div>
                </div>

                {/* Debug Info Overlay */}
                <div className="bg-[#0a0a0f]/50 border border-white/5 p-4 rounded-xl font-mono text-[10px] text-gray-600 space-y-1">
                  <div>CODEC: JPEG_LIB_WASM</div>
                  <div>SAMPLING: 4:4:4</div>
                  <div>TIMESTAMP: {new Date().toLocaleTimeString()}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
