"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, summary, label, select, [role='button'], [data-hoverable], .hoverable";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only for precise pointers (mouse / trackpad); touch devices keep their native behaviour.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let frame = 0;
    let visible = false;
    let hovering = false;

    // Position is written straight to the DOM once per animation frame – no React re-renders.
    const render = () => {
      frame = 0;
      const position = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = position;
      ring.style.transform = `${position} scale(${hovering ? 1.375 : 1})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      ring.style.opacity = next ? "1" : "0";
      dot.style.opacity = next ? "1" : "0";
    };

    // "mousemove" (not pointermove) so the events forwarded by the embedded CV iframe also count.
    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      setVisible(true);
      schedule();
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const next = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      if (next === hovering) return;
      hovering = next;
      ring.dataset.hover = String(next);
      schedule();
    };
    // relatedTarget is null when the pointer leaves the window (or enters an iframe).
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-[1.5px] border-[rgba(86,156,214,0.8)] opacity-0 mix-blend-difference will-change-transform transition-[transform,background-color,opacity] duration-100 ease-out data-[hover=true]:bg-[rgba(86,156,214,0.1)]"
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#d4d4d4] opacity-0 mix-blend-difference will-change-transform transition-opacity duration-100"
      />
    </>
  );
}
