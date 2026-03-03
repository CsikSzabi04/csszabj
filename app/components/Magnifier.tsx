"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MagnifierProps {
  children: React.ReactNode;
  zoomImage?: string;
  zoomSize?: number;
}

export default function Magnifier({ 
  children, 
  zoomImage = "https://wallpapers.com/images/featured/programming-iphone-bd86goc4fhvenj72.jpg",
  zoomSize = 150 
}: MagnifierProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if cursor is in the center 20x20 pixel area (scaled)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    
    // 20px radius in the center
    if (distanceFromCenter < 30) {
      setShowZoom(true);
      setCursorPosition({ x: e.clientX, y: e.clientY });
    } else {
      setShowZoom(false);
    }
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Zoom reveal effect */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursorPosition.x - zoomSize / 2,
              y: cursorPosition.y - zoomSize / 2
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="fixed pointer-events-none z-[9998]"
            style={{
              width: zoomSize,
              height: zoomSize,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(6, 182, 212, 0.8)",
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${zoomImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
