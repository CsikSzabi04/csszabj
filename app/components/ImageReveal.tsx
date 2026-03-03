"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageReveal({ src, alt, className = "" }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        style={{ scale, y }}
        className="w-full h-full"
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
