"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo, stats } from "../data/portfolio";
import TypeWriter from "./TypeWriter";
import TypeWriterSkills from "./TypeWriterSkills";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  const skills = [
    "React.js", "Next.js", "Node.js", "Java", 
    "TypeScript", "Angular", "Tailwind CSS", "MongoDB"
  ];

  // TypeWriter texts - cycles through name and roles
  const typewriterTexts = language === "en" ? [
    personalInfo.name,
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Tester"
  ] : [
    personalInfo.name,
    "Frontend fejlesztő",
    "Backend fejlesztő",
    "Szoftver-fejlesztő",
    "Tesztelő"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="section min-h-screen flex items-center pt-32 pb-20 overflow-hidden relative">
      {/* Animated Background - Star Wars themed */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating code symbols - Lightsaber colors */}
        <motion.div 
          className="absolute top-20 left-10 text-6xl font-mono text-[#00a8ff]/10 select-none"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.div>
        
        <motion.div 
          className="absolute top-40 right-20 text-5xl font-mono text-[#9b59b6]/10 select-none"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {"{ }"}
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 left-1/4 text-4xl font-mono text-[#ff2d2d]/10 select-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {"const"}
        </motion.div>
        
        {/* Glowing orbs - Lightsaber effect */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-[#00a8ff]/5 blur-[120px]"
          animate={{ x: mousePosition.x * 50, y: mousePosition.y * 50 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ top: '10%', left: '10%' }}
        />
        
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full bg-[#9b59b6]/5 blur-[100px]"
          animate={{ x: -mousePosition.x * 30, y: -mousePosition.y * 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Content */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-mono">
                <span className="w-2 h-2 bg-[#9b59b6] rounded-full animate-pulse shadow-[0_0_10px_#9b59b6]"></span>
                "May The Force Be With You"
              </span>
            </motion.div>

            <div className="mb-6 relative">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative inline-block"
              >
                <span className="sr-only">Csík Szabolcs - csszabj - Webfejlesztő, Frontend és Backend Fejlesztő Kecskemét</span>
                <TypeWriter 
                  texts={typewriterTexts} 
                  speed={100} 
                  className="text-white drop-shadow-[0_0_20px_rgba(155,89,182,0.5)]"
                  cursorClassName="text-[#9b59b6]"
                />
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 font-mono break-words"
            >
              <div className="bg-black/50 p-5 rounded-xl border border-[#9b59b6]/20 backdrop-blur-sm">
                <div className="flex gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#ff2d2d]/80 shadow-[0_0_8px_#ff2d2d]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#9b59b6]/80 shadow-[0_0_8px_#9b59b6]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#00ff41]/80 shadow-[0_0_8px_#00ff41]"></span>
                </div>
                <p className="mb-2">
                  <span className="text-[#00a8ff]">const</span>{" "}
                  <span className="text-[#9b59b6]">role</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-[#00ffff]">"</span>
                  <span className="text-[#00ffff]">Full Stack Developer</span>
                  <span className="text-[#00ffff]">"</span>;
                </p>
                <p className="mb-2">
                  <span className="text-[#00a8ff]">const</span>{" "}
                  <span className="text-[#9b59b6]">skills</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-gray-500">[</span>
                  <TypeWriterSkills 
                    words={skills} 
                    speed={80}
                    className="text-[#00ffff] inline-block"
                  />
                  <span className="text-gray-500">]</span>;
                </p>
                <p className="text-[#00ff41] text-sm">
                  // Building digital experiences
                </p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-500 mb-8 font-mono break-words"
            >
              <span className="text-gray-400">📍</span>{" "}
              <span className="text-[#9b59b6]">location</span>
              <span className="text-gray-500">: "</span>
              <span className="text-[#00ffff]">{personalInfo.location}</span>
              <span className="text-gray-500">"</span>
            </motion.p>

            {/* Navigation Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {/* Projects Button */}
              <Link href="/projects">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#9b59b6] via-[#8e44ad] to-[#6c5ce7] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(155,89,182,0.4)] hover:shadow-[0_0_25px_rgba(155,89,182,0.6)] cursor-pointer flex items-center justify-center transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative text-white font-semibold tracking-wide text-sm sm:text-base">{language === "en" ? "View My Work" : "Munkáim megtekintése"}</span>
                </motion.div>
              </Link>

              {/* Contact Button */}
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-black/40 rounded-xl border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-sm cursor-pointer hover:bg-white/5 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <span className="relative text-gray-200 group-hover:text-white font-semibold tracking-wide transition-colors text-sm sm:text-base">{language === "en" ? "Discuss a Project" : "Projekt megbeszélése"}</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#9b59b6]/20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center group"
                >
                  <span className="text-3xl md:text-4xl font-bold block text-white group-hover:text-[#9b59b6] group-hover:shadow-[0_0_20px_rgba(155,89,182,0.5)] transition-all duration-300">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-500 mt-2 block font-mono">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Image */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div 
                className="absolute -inset-12 bg-gradient-to-br from-[#9b59b6]/20 via-[#ff2d2d]/10 to-[#00a8ff]/20 rounded-3xl blur-3xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative rounded-3xl overflow-hidden border border-[#9b59b6]/30">
                <motion.img 
                  src={personalInfo.avatars}
                  alt={personalInfo.name}
                  className="w-full aspect-[4/5] object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <motion.div 
                  className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-[#9b59b6]/30"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <p className="text-sm text-gray-300 font-mono">
                    <span className="text-[#00a8ff]">const</span> developer = <span className="text-[#9b59b6]">{"{"}</span> passion, creativity <span className="text-[#9b59b6]">{"}"}</span>
                  </p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#9b59b6]/30 rounded-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#ff2d2d]/10 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
