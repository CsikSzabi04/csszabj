"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { language } = useLanguage();
  const en = language === "en";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-40 pb-20">
      <div className="max-w-lg text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-[#9b59b6] mb-4">ERROR</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {en ? "Something went wrong" : "Valami hiba történt"}
        </h1>
        <p className="text-zinc-400 mb-8">
          {en
            ? "An unexpected error occurred while loading this page. Please try again."
            : "Váratlan hiba történt az oldal betöltése közben. Kérlek, próbáld újra."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="px-7 py-3.5 bg-gradient-to-r from-[#9b59b6] to-[#6c5ce7] text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(155,89,182,0.25)] hover:shadow-[0_0_30px_rgba(155,89,182,0.45)] transition-shadow"
          >
            {en ? "Try again" : "Újrapróbálás"}
          </button>
          <Link href="/" className="px-7 py-3.5 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:bg-white/10 transition-colors">
            {en ? "Back to home" : "Vissza a kezdőlapra"}
          </Link>
        </div>
      </div>
    </section>
  );
}
