"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { QrCode, Image as ImageIcon, Search, ArrowRight, Beaker } from "lucide-react";

const tools = [
  {
    id: "qr",
    title: "QR Kód Generátor",
    description: "Professzionális QR kódok készítése egyedi színekkel, logóval és mintázattal.",
    icon: QrCode,
    color: "#9b59b6",
    link: "/tools/qr"
  },
  {
    id: "compressor",
    title: "Képtömörítő",
    description: "Veszteségmentes vagy szabályozható mértékű képtömörítés közvetlenül a böngészőben.",
    icon: ImageIcon,
    color: "#00a8ff",
    link: "/tools/compressor"
  },
  {
    id: "seo",
    title: "SEO Ellenőrző",
    description: "Weboldalak metaadatainak, címsorainak és technikai SEO beállításainak elemzése.",
    icon: Search,
    color: "#00ff41",
    link: "/tools/seo"
  },
  {
    id: "contrast",
    title: "Színkontraszt Ellenőrző",
    description: "Webes színpárok kontrasztarányának ellenőrzése akadálymentességi szempontból (WCAG).",
    icon: Beaker,
    color: "#ff2d2d",
    link: "/tools/contrast"
  },
  {
    id: "speed",
    title: "Sebességteszt",
    description: "Helyi, szerver nélküli weboldal betöltési idő és erőforrás elemző.",
    icon: Search,
    color: "#f39c12",
    link: "/tools/speed"
  },
  {
    id: "netspeed",
    title: "Internet Sebességmérő",
    description: "Hálózat letöltési sebességének és stabilitásának tesztelése a böngészőben.",
    icon: Search,
    color: "#00ffff",
    link: "/tools/netspeed"
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-32 pb-0 px-4 relative overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-mono mb-6">
            <Beaker className="w-4 h-4" />
            <span>LABORATÓRIUM // EXPERIMENTAL</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Saját <span className="text-[#9b59b6] drop-shadow-[0_0_15px_rgba(155,89,182,0.5)]">Gyártásaim</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Saját fejlesztésű eszközeim a mindennapi munka megkönnyítésére. 
            Minden folyamat kliens oldalon fut, így adatai biztonságban vannak.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link href={tool.link} key={tool.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-8 bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden hover:border-[#9b59b6]/30 transition-all duration-500"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-3xl"
                  style={{ background: `radial-gradient(circle, ${tool.color} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${tool.color}15`, color: tool.color, border: `1px solid ${tool.color}30` }}
                  >
                    <tool.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-mono" style={{ color: tool.color }}>
                    <span>INDÍTÁS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Technical HUD Decoration */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/5 group-hover:text-[#9b59b6]/20 transition-colors">
                  MOD_0{index + 1}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Technical Footer Decoration */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-gray-600 tracking-widest uppercase"
        >
          <div className="flex items-center gap-4">
            <span>STATUS: OPTIMAL</span>
            <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_8px_#00ff41]" />
          </div>
          <div>CSSZABJ / CORE_ENGINE_V1.0</div>
          <div>EST: {new Date().getFullYear()}</div>
        </motion.div>
      </div>
    </div>
  );
}
