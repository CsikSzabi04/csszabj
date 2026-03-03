"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Startup({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  // Generate particles only once on client
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
  }, []);

  const loadingTexts = [
    "INITIALIZING",
    "LOADING ASSETS",
    "BUILDING UI",
    "ALMOST READY",
    "WELCOME"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(textInterval);
          return loadingTexts.length - 1;
        }
        return prev + 1;
      });
    }, 400);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 animate-pulse" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Central container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated logo/name */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <motion.span 
                className="text-6xl md:text-8xl font-bold"
                animate={{ 
                  textShadow: ["0 0 20px rgba(59,130,246,0)", "0 0 40px rgba(59,130,246,0.8)", "0 0 20px rgba(59,130,246,0)"]
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
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Loading text */}
            <div className="h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm md:text-base text-zinc-400 font-mono tracking-widest"
                >
                  {loadingTexts[currentText]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Percentage */}
            <motion.p
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-bold text-white mt-4"
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.p>
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-0 right-0 text-center"
          >
            <p className="text-xs text-zinc-600">
              Csík Szabolcs Alex • Full Stack Developer
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
