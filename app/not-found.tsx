"use client";

import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";

export default function NotFound() {
  const en = useLanguage().language === "en";

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-40 pb-20">
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-[#9b59b6] mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{en ? "Page not found" : "Az oldal nem található"}</h1>
        <p className="text-zinc-400 mb-8">
          {en ? "The page you are looking for does not exist or has been moved." : "A keresett oldal nem létezik, vagy át lett helyezve."}
        </p>
        <Link
          href="/"
          className="inline-block px-7 py-3.5 bg-gradient-to-r from-[#9b59b6] to-[#6c5ce7] text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(155,89,182,0.25)] hover:shadow-[0_0_30px_rgba(155,89,182,0.45)] transition-shadow"
        >
          {en ? "Back to the homepage" : "Vissza a kezdőlapra"}
        </Link>
      </div>
    </section>
  );
}
