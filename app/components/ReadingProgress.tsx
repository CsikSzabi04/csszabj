"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  // Driven by motion values: updates on scroll without re-rendering React.
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}
