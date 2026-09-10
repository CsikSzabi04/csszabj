"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Visitors who prefer reduced motion keep native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
      // Smoothly handle in-page #anchor links, leaving room for the fixed header.
      anchors: { offset: -110 },
      // Let scrollable children (textareas, code blocks, modals) scroll natively.
      allowNestedScroll: true,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
