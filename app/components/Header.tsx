"use client";

import Link from "next/link";

interface HeaderProps {
  onStoreClick?: () => void;
}

export default function Header({ onStoreClick }: HeaderProps) {
  return (
    <header
      className="relative z-50 bg-black/80 backdrop-blur-md border-b border-[#9b59b6]/20"
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo - Star Wars themed - Lightsaber colors */}
          <Link
            href="/"
            className="text-2xl font-bold font-[family-name:var(--font-outfit)] group"
          >
            <span className="text-[#9b59b6] group-hover:text-[#00a8ff] transition-colors duration-300">CS</span>
            <span className="text-[#ff2d2d] group-hover:text-[#00ff41] transition-colors duration-300">A</span>
          </Link>

          {/* Store Icon - Star Wars themed - Lightsaber colors */}
<button
  onClick={onStoreClick}
  disabled
  className="w-12 h-12 bg-black/50 rounded-xl border border-[#9b59b6]/30 flex items-center justify-center hover:border-[#ff2d2d]/50 hover:shadow-[0_0_20px_rgba(255,45,45,0.3)] transition-all duration-300 group relative"
  aria-label="WebShop"
  title="Fejlesztés alatt"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#9b59b6] group-hover:text-[#ff2d2d] group-hover:animate-pulse transition-all duration-300"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
  
  {/* Tooltip - csak hover esetén jelenik meg */}
  <span className="absolute top-15 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#ff2d2d]/30 shadow-[0_0_10px_rgba(255,45,45,0.3)]">
    Fejlesztés alatt
  </span>
</button>
        </nav>
      </div>
    </header>
  );
}
