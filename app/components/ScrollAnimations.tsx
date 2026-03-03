"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// 1. Parallax Section - different speed for each element
export function ParallaxSection({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

// 2. Counter Animation - counts up when visible
export function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  return (
    <div ref={ref} className="text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-4xl md:text-5xl font-bold text-white block"
      >
        {value}
      </motion.span>
      <span className="text-sm text-zinc-500 mt-2 block">{label}</span>
    </div>
  );
}

// 3. ClipPath Image Reveal - unique shape reveal
export function ClipReveal({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full">
      <motion.img
        src={src}
        alt={alt}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// 4. Letter Shuffle - letters shuffle when in view
export function LetterShuffle({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(text);
  
  useEffect(() => {
    if (!isInView) return;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayed(prev => 
        text.split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 1/3;
      if (iterations > text.length) {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [isInView, text]);
  
  return <span ref={ref}>{displayed}</span>;
}

// 5. Magnetic Text - follows cursor slightly
export function MagneticText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// 6. Horizontal Scroll Container
export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-8">
        {children}
      </motion.div>
    </div>
  );
}

// 7. Blur Reveal - text blurs in
export function BlurReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// 8. Scale Reveal - scales from center
export function ScaleReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
