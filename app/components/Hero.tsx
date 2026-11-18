"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, stats } from "../data/portfolio";
import TypeWriter from "./TypeWriter";
import { useLanguage } from "../contexts/LanguageContext";
import { enterDelay } from "../lib/enter";

// The entrance animations are plain CSS (see .enter-up in globals.css), so the server-rendered
// hero is visible immediately instead of staying at opacity 0 until the JS bundle has hydrated.
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

  // No floating symbols, orbs or glows: the hero stays calm and lets the content speak.
  return (
    <section className="section min-h-screen flex items-center pt-32 pb-20 overflow-hidden relative">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Content */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="mb-6 relative">
              <h1
                style={enterDelay(0.05)}
                className="enter-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold relative inline-block"
              >
                <span className="sr-only">Csík Szabolcs - csszabj - Webfejlesztő, Frontend és Backend Fejlesztő Kecskemét</span>
                <TypeWriter
                  texts={typewriterTexts}
                  speed={100}
                  className="text-white"
                  cursorClassName="text-[#9b59b6]"
                />
              </h1>
            </div>

            <div
              style={enterDelay(0.1)}
              className="enter-up text-base sm:text-lg md:text-xl text-gray-300 mb-8 font-mono break-words"
            >
              <div className="bg-black/50 p-5 rounded-xl border border-[#9b59b6]/20 backdrop-blur-sm">
                <div className="flex gap-2 mb-4" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-[#ff2d2d]/80"></span>
                  <span className="w-3 h-3 rounded-full bg-[#9b59b6]/80"></span>
                  <span className="w-3 h-3 rounded-full bg-[#00ff41]/80"></span>
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
            </div>

            {/* Navigation Buttons */}
            <div style={enterDelay(0.2)} className="enter-up flex flex-wrap gap-4 mb-12">
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-white via-zinc-100 to-zinc-300 hover:from-zinc-50 hover:to-zinc-200 transition-colors rounded-xl overflow-hidden cursor-pointer flex items-center justify-center w-full sm:w-auto"
                >
                  <span className="relative text-zinc-900 font-semibold tracking-wide text-sm sm:text-base">{en ? "View My Work" : "Munkáim megtekintése"}</span>
                </motion.div>
              </Link>
            </div>

            {/* Stats */}
            <div
              style={enterDelay(0.25)}
              className="enter-up grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#9b59b6]/20"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  style={enterDelay(0.3 + index * 0.05)}
                  className="enter-up group text-center cursor-default select-none"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-white transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:text-[#c9a3dd]">
                    {stat.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-2 block h-px w-10 origin-center scale-x-0 rounded-full bg-[#9b59b6]/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="text-sm text-gray-500 mt-2 block font-mono transition-colors duration-500 group-hover:text-gray-300">
                    {en ? stat.labelEn : stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            {/* Narrower, taller frame: the portrait photo shows more of itself instead of a close crop. */}
            <div className="enter-scale relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              <div className="relative rounded-3xl overflow-hidden border border-[#9b59b6]/30">
                <div className="relative w-full aspect-[3/5]">
                  <Image
                    src="/images/profile1.png"
                    alt={personalInfo.name}
                    fill
                    preload
                    sizes="(min-width: 1024px) 420px, 380px"
                    className="object-cover object-[50%_60%]"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

                <div
                  style={enterDelay(0.3)}
                  className="enter-up absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-[#9b59b6]/30"
                >
                  <p className="text-sm text-gray-300 font-mono">
                    <span className="text-[#00a8ff]">const</span> developer = <span className="text-[#9b59b6]">{"{"}</span> passion, creativity <span className="text-[#9b59b6]">{"}"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
