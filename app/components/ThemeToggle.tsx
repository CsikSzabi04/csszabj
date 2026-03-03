"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Background transition */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        } ${isDark ? "bg-blue-900/20" : "bg-yellow-500/20"}`}
      />
      
      {/* Sun icon */}
      <svg 
        className={`absolute w-6 h-6 text-yellow-500 transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        }`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      
      {/* Moon icon */}
      <svg 
        className={`absolute w-6 h-6 text-blue-400 transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        }`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}
