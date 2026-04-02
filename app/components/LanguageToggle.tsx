"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === "hu" ? "en" : "hu");
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
      aria-label="Toggle Language"
    >
      {/* Háttér effekt hoverkor */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Vercel/Next style "N" forma ami EN/HU lesz */}
      <div className="relative z-10 font-bold text-lg text-white font-mono tracking-tighter">
        {language === "hu" ? "HU" : "EN"}
      </div>
      
      {/* Egy apró pont ami dekorál */}
      <div className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full opacity-50" />
    </motion.button>
  );
}
