"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  type?: "explode" | "shatter" | "zoom" | "spiral" | "wave" | "glitch" | "slam";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  type = "explode", 
  delay = 0, 
  className = "" 
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [180, -10, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 1], ["20px", "0px", "0px"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "0%"]);

  const getExplodeAnimation = () => ({
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 100, damping: 10, delay }
    }
  });

  const getShatterAnimation = () => ({
    initial: { 
      clipPath: "inset(0 100% 0 0)",
      opacity: 0
    },
    animate: { 
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }
    }
  });

  const getZoomAnimation = () => ({
    initial: { scale: 3, opacity: 0, filter: "blur(20px)" },
    animate: { 
      scale: 1, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, delay, ease: "easeOut" }
    }
  });

  const getSpiralAnimation = () => ({
    initial: { 
      opacity: 0, 
      scale: 0,
      rotate: -720,
      y: 200
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { duration: 1, delay, ease: [0.34, 1.56, 0.64, 1] }
    }
  });

  const getWaveAnimation = () => ({
    initial: { 
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0
    },
    animate: { 
      clipPath: "circle(150% at 50% 50%)",
      opacity: 1,
      transition: { duration: 1, delay, ease: "easeInOut" }
    }
  });

  const getGlitchAnimation = () => ({
    initial: { 
      opacity: 0,
      x: -100,
      skewX: 20
    },
    animate: { 
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: { duration: 0.5, delay, ease: "easeOut" }
    }
  });

  const getSlamAnimation = () => ({
    initial: { 
      scale: 4, 
      opacity: 0,
      y: -300
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15, 
        delay,
        mass: 0.5
      }
    }
  });

  const getAnimation = () => {
    switch (type) {
      case "explode": return getExplodeAnimation();
      case "shatter": return getShatterAnimation();
      case "zoom": return getZoomAnimation();
      case "spiral": return getSpiralAnimation();
      case "wave": return getWaveAnimation();
      case "glitch": return getGlitchAnimation();
      case "slam": return getSlamAnimation();
      default: return getExplodeAnimation();
    }
  };

  const animation = getAnimation();

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={isInView ? animation.animate : animation.initial}
      className={className}
    >
      {children}
    </motion.div>
  );
}
