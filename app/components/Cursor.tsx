"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        target.getAttribute("role") === "button" ||
        target.closest("a") || 
        target.closest("button") ||
        target.closest("[data-hoverable]") ||
        target.classList.contains("hoverable");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    
    // Show cursor immediately
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";
    
    const style = document.createElement("style");
    style.textContent = `
      * { cursor: none !important; }
      input, textarea, select, [contenteditable="true"] { cursor: text !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = "auto";
      style.remove();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(86, 156, 214, 0.8)",
          backgroundColor: isHovering ? "rgba(86, 156, 214, 0.1)" : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 3,
          top: position.y - 3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#d4d4d4",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
