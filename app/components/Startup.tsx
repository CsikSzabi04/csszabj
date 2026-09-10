"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from "framer-motion";

const SPLASH_STORAGE_KEY = "cs-splash-seen";
const SPLASH_DURATION_S = 1.6;
const LOADING_TEXTS = ["INITIALIZING", "LOADING ASSETS", "BUILDING UI", "WELCOME"];

export default function Startup() {
  const [isVisible, setIsVisible] = useState(true);

  // Progress lives in a motion value, so the counter and bar animate without re-rendering.
  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, (value) => `${value}%`);
  const percent = useTransform(progress, (value) => `${Math.round(value)}%`);
  const label = useTransform(
    progress,
    (value) => LOADING_TEXTS[Math.min(LOADING_TEXTS.length - 1, Math.floor((value / 100) * LOADING_TEXTS.length))],
  );

  useEffect(() => {
    // The inline head script already hid the splash (seen this session / reduced motion).
    if (document.documentElement.classList.contains("splash-seen")) return;

    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      // Storage blocked – the splash simply shows again next time.
    }

    const controls = animate(progress, 100, { duration: SPLASH_DURATION_S, ease: [0.4, 0, 0.2, 1] });
    const timer = setTimeout(() => setIsVisible(false), SPLASH_DURATION_S * 1000 + 150);
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="startup-overlay"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 animate-pulse"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Central container */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <motion.span
                className="text-6xl md:text-8xl font-bold"
                animate={{
                  textShadow: ["0 0 20px rgba(59,130,246,0)", "0 0 40px rgba(59,130,246,0.8)", "0 0 20px rgba(59,130,246,0)"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-blue-500">CS</span>
                <span className="text-white">A</span>
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 md:w-96 mb-8">
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: barWidth }} />
              </div>
            </div>

            {/* Loading text */}
            <div className="h-8 flex items-center justify-center">
              <motion.span className="text-sm md:text-base text-zinc-400 font-mono tracking-widest">{label}</motion.span>
            </div>

            {/* Percentage */}
            <motion.p className="text-2xl md:text-3xl font-bold text-white mt-4 tabular-nums">{percent}</motion.p>
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-0 right-0 text-center"
          >
            <p className="text-xs text-zinc-600">Csík Szabolcs Alex • Full Stack Developer</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
