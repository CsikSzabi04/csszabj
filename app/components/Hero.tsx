"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, stats } from "../data/portfolio";
import TypeWriter from "./TypeWriter";
import { useLanguage } from "../contexts/LanguageContext";

const SKILLS = ["React.js", "Next.js", "Node.js", "Java", "TypeScript", "Angular", "Tailwind CSS", "MongoDB"];

export default function Hero() {
  const { language } = useLanguage();
  const en = language === "en";

  // Memoized so the typewriter isn't restarted on every render.
  const typewriterTexts = useMemo(
    () =>
      en
        ? [personalInfo.name, "Frontend Developer", "Backend Developer", "Software Engineer", "Tester"]
        : [personalInfo.name, "Frontend fejlesztő", "Backend fejlesztő", "Szoftver-fejlesztő", "Tesztelő"],
    [en],
  );

  // Mouse parallax runs on motion values, so moving the mouse never re-renders the hero.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 100, damping: 20 });
  const orbOneX = useTransform(smoothX, (value) => value * 50);
  const orbOneY = useTransform(smoothY, (value) => value * 50);
  const orbTwoX = useTransform(smoothX, (value) => value * -30);
  const orbTwoY = useTransform(smoothY, (value) => value * -30);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerX, pointerY]);

  return (
    <section className="section min-h-screen flex items-center pt-32 pb-20 overflow-hidden relative">
      {/* Animated Background - Star Wars themed */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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
          style={{ top: "10%", left: "10%", x: orbOneX, y: orbOneY }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#9b59b6]/5 blur-[100px]"
          style={{ bottom: "10%", right: "10%", x: orbTwoX, y: orbTwoY }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Content */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
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
                <div className="flex gap-2 mb-4" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-[#ff2d2d]/80 shadow-[0_0_8px_#ff2d2d]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#9b59b6]/80 shadow-[0_0_8px_#9b59b6]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#00ff41]/80 shadow-[0_0_8px_#00ff41]"></span>
                </div>
                <p className="mb-2">
                  <span className="text-[#00a8ff]">const</span>{" "}
                  <span className="text-[#9b59b6]">role</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-[#00ffff]">&quot;Full Stack Developer&quot;</span>;
                </p>
                <p className="mb-2">
                  <span className="text-[#00a8ff]">const</span>{" "}
                  <span className="text-[#9b59b6]">skills</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-gray-500">[</span>
                  <TypeWriter texts={SKILLS} speed={80} pause={1500} className="text-[#00ffff] inline-block" cursorClassName="text-blue-400" />
                  <span className="text-gray-500">]</span>;
                </p>
                <p className="text-[#00ff41] text-sm">{"// Building digital experiences"}</p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-500 mb-8 font-mono break-words"
            >
              <span className="text-gray-400" aria-hidden="true">📍</span>{" "}
              <span className="text-[#9b59b6]">location</span>
              <span className="text-gray-500">: &quot;</span>
              <span className="text-[#00ffff]">{personalInfo.location}</span>
              <span className="text-gray-500">&quot;</span>
            </motion.p>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#9b59b6] via-[#8e44ad] to-[#6c5ce7] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(155,89,182,0.4)] hover:shadow-[0_0_25px_rgba(155,89,182,0.6)] cursor-pointer flex items-center justify-center transition-shadow duration-300 w-full sm:w-auto"
                >
                  <span className="relative text-white font-semibold tracking-wide text-sm sm:text-base">{en ? "View My Work" : "Munkáim megtekintése"}</span>
                </motion.div>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-black/40 rounded-xl border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-sm cursor-pointer hover:bg-white/5 transition-colors duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <span className="relative text-gray-200 group-hover:text-white font-semibold tracking-wide transition-colors text-sm sm:text-base">{en ? "Discuss a Project" : "Projekt megbeszélése"}</span>
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
                  className="group text-center cursor-default select-none"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-white transition-[color,translate,text-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:text-[#c9a3dd] group-hover:[text-shadow:0_0_18px_rgba(155,89,182,0.55)]">
                    {stat.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-2 block h-px w-10 origin-center scale-x-0 rounded-full bg-[#9b59b6]/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="text-sm text-gray-500 mt-2 block font-mono transition-colors duration-500 group-hover:text-gray-300">
                    {en ? stat.labelEn : stat.label}
                  </span>
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
                aria-hidden="true"
                className="absolute -inset-12 bg-gradient-to-br from-[#9b59b6]/20 via-[#ff2d2d]/10 to-[#00a8ff]/20 rounded-3xl blur-3xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative rounded-3xl overflow-hidden border border-[#9b59b6]/30">
                <motion.div
                  className="relative w-full aspect-[4/5]"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <Image
                    src={personalInfo.avatars}
                    alt={personalInfo.name}
                    fill
                    preload
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>

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
                aria-hidden="true"
                className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#9b59b6]/30 rounded-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                aria-hidden="true"
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
