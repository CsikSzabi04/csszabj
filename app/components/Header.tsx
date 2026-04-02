"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface HeaderProps {
  onStoreClick?: () => void;
}

export default function Header({ onStoreClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <header
        className={`pointer-events-auto transition-all duration-300 w-full max-w-[1100px] relative ${scrolled ? "mt-0" : "mt-2"
          }`}
      >
        <div className="bg-[#050508]/85 backdrop-blur-xl border border-white/10 rounded-2xl w-full flex items-center justify-between px-4 sm:px-6 py-3 md:py-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 relative">

          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
            onClick={closeMenu}
          >
            {/* Logo Image */}
            <div className="relative w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_8px_rgba(155,89,182,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/02.png"
                alt="CsSz Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 32px, 40px"
              />
            </div>

            {/* Logo Text */}
            <span className="text-white uppercase tracking-[0.2em] flex items-center">
              <span className="font-bold text-lg md:text-xl ml-0.5">CsSz</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 mr-4">
            <Link href="/about" className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {t("nav.about")}
              <span className="absolute -bottom-3 -left-2 -right-2 h-[3px] rounded-full bg-[#9b59b6] shadow-[0_0_12px_rgba(155,89,182,0.8)] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center transition-all duration-300 ease-out"></span>
            </Link>

            <Link href="/projects" className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {t("nav.projects")}
              <span className="absolute -bottom-3 -left-2 -right-2 h-[3px] rounded-full bg-[#9b59b6] shadow-[0_0_12px_rgba(155,89,182,0.8)] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center transition-all duration-300 ease-out"></span>
            </Link>

            <Link href="/blog" className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {t("nav.blog")}
              <span className="absolute -bottom-3 -left-2 -right-2 h-[3px] rounded-full bg-[#9b59b6] shadow-[0_0_12px_rgba(155,89,182,0.8)] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center transition-all duration-300 ease-out"></span>
            </Link>

            <Link href="/contact" className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group">
              {t("nav.contact")}
              <span className="absolute -bottom-3 -left-2 -right-2 h-[3px] rounded-full bg-[#9b59b6] shadow-[0_0_12px_rgba(155,89,182,0.8)] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center transition-all duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="hidden sm:flex bg-gradient-to-r from-[rgba(155,89,182,0.5)] via-[rgba(142,68,173,0.5)] to-[rgba(108,92,231,0.5)] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(155,89,182,0.4)] hover:shadow-[0_0_25px_rgba(155,89,182,0.6)] hover:-translate-y-0.5 whitespace-nowrap"            >
              {t("nav.tools")}
            </Link>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              className="lg:hidden p-2 text-white hover:text-[#9b59b6] transition-colors focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-4 bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col gap-4 lg:hidden origin-top z-40"
            >
              <Link href="/about" onClick={closeMenu} className="text-lg font-medium text-gray-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                {t("nav.about")}
              </Link>
              <div className="h-px w-full bg-white/5" />
              <Link href="/projects" onClick={closeMenu} className="text-lg font-medium text-gray-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                {t("nav.projects")}
              </Link>
              <div className="h-px w-full bg-white/5" />
              <Link href="/blog" onClick={closeMenu} className="text-lg font-medium text-gray-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                {t("nav.blog")}
              </Link>
              <div className="h-px w-full bg-white/5" />
              <Link href="/contact" onClick={closeMenu} className="text-lg font-medium text-gray-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                {t("nav.contact")}
              </Link>

              {/* Mobile CTA (only shown on very small screens where sm:flex hides the main CTA) */}
              <Link
                href="/tools"
                onClick={closeMenu}
                className="mt-2 text-center sm:hidden w-full bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white px-6 py-3 rounded-xl text-sm font-bold tracking-wide shadow-[0_0_15px_rgba(155,89,182,0.4)]"
              >
                {t("nav.tools")}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
