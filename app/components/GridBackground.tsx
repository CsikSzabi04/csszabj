"use client";

import { useEffect, useState } from "react";

export default function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Static Grid */}
      <div 
        className="grid-bg"
        style={{
          backgroundPosition: `${-mousePosition.x * 0.02}px ${-mousePosition.y * 0.02}px`,
        }}
      />
      
      {/* Spotlight Effect */}
      <div 
        className="spotlight"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      {/* Additional glow spots */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          transition: 'all 0.15s ease-out',
        }}
      />
    </>
  );
}
