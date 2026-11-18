"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After a route change Next has already placed the window (top of the new page, or the restored
  // position on back/forward). Stop any smooth scroll still running from the old page and sync
  // Lenis to that position, so it doesn't glide back towards the previous page's target.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return <>{children}</>;
}
