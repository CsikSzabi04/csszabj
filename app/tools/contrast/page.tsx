"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Droplet } from "lucide-react";
import Link from "next/link";

export default function ContrastChecker() {
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");

  // Helper functions for WCAG contrast calculation
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const calculateLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;

    const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const ratio = getContrastRatio(fgColor, bgColor);
  
  // WCAG 2.1 requirements
  const passesAANormal = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;
  const passesAAANormal = ratio >= 7.0;
  const passesAAALarge = ratio >= 4.5;

  const MetricCard = ({ title, value, status, description }: any) => (
    <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
      <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 ${status === 'ok' ? 'bg-[#00ff41]' : status === 'warn' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] block mb-2">{title}</span>
          <span className="text-xl font-bold block mb-1">{value}</span>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
        <div className={`p-2 rounded-lg ${status === 'ok' ? 'bg-[#00ff41]/10 text-[#00ff41]' : status === 'warn' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
          {status === 'ok' ? <CheckCircle2 className="w-5 h-5" /> : status === 'warn' ? <AlertTriangle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4">
      <div className="container-custom max-w-5xl relative z-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff2d2d] transition-colors mb-8 group">
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
              <div className="flex items-center gap-2 text-[#ff2d2d] mb-6 font-mono text-xs uppercase tracking-[0.3em]">
                <Droplet className="w-4 h-4" />
                <span>Color Selection</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Szöveg Színe (Foreground)</label>
                  <div className="flex items-center gap-4 bg-[#050508] border border-white/10 p-3 rounded-xl">
                    <input 
                      type="color" 
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-lg"
                    />
                    <input 
                      type="text" 
                      value={fgColor.toUpperCase()}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="bg-transparent border-none text-white font-mono uppercase focus:outline-none flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Háttérszíne (Background)</label>
                  <div className="flex items-center gap-4 bg-[#050508] border border-white/10 p-3 rounded-xl">
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-lg"
                    />
                    <input 
                      type="text" 
                      value={bgColor.toUpperCase()}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="bg-transparent border-none text-white font-mono uppercase focus:outline-none flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl text-center">
                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest block mb-2">Kontrasztarány</span>
                <span className={`text-4xl font-bold ${ratio >= 4.5 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                  {ratio.toFixed(2)}:1
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visualization & Results */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div 
              className="border border-white/10 rounded-3xl p-10 min-h-[250px] shadow-2xl transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: bgColor }}
            >
              <div style={{ color: fgColor }}>
                <h3 className="text-3xl font-bold mb-4">Nagy Szöveg (18pt+)</h3>
                <p className="text-base leading-relaxed">
                  Ez egy normál méretű (16px) bekezdés. A megfelelő színkontraszt elengedhetetlen a könnyű olvashatósághoz és az akadálymentes webes élményhez.
                </p>
              </div>
              
              <div className="absolute bottom-4 right-4 text-[10px] font-mono opacity-30" style={{ color: fgColor }}>
                PREVIEW_MODE_ACTIVE
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <MetricCard 
                title="WCAG AA Kicsi (4.5:1)" 
                value={passesAANormal ? "Megfelel" : "Elbukott"} 
                status={passesAANormal ? 'ok' : 'fail'} 
                description="Normál szöveg esetén"
              />
              <MetricCard 
                title="WCAG AA Nagy (3.0:1)" 
                value={passesAALarge ? "Megfelel" : "Elbukott"} 
                status={passesAALarge ? 'ok' : 'fail'} 
                description="H1-H3 címsorok esetén"
              />
              <MetricCard 
                title="WCAG AAA Kicsi (7.0:1)" 
                value={passesAAANormal ? "Megfelel" : "Elbukott"} 
                status={passesAAANormal ? 'ok' : 'fail'} 
                description="Normál szöveg esetén"
              />
              <MetricCard 
                title="WCAG AAA Nagy (4.5:1)" 
                value={passesAAALarge ? "Megfelel" : "Elbukott"} 
                status={passesAAALarge ? 'ok' : 'fail'} 
                description="H1-H3 címsorok esetén"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
