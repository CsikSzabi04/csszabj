"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Mennyi idő alatt készül el egy weboldal?",
    answer: "Az időtartam a projekt komplexitásától függ. Egy egyszerű weboldal 2-3 hét alatt elkészül, míg egy webshop vagy komplexebb projekt 1-3 hónapig is eltarthat. Az első konzultáció után részletes időbeosztást adok."
  },
  {
    question: "Milyen technológiákat használsz?",
    answer: "Modern és iparági standard technológiákat használok: React, Next.js, Node.js, TypeScript, Tailwind CSS a frontendhez, és MongoDB, PostgreSQL, Firebase az adatbázisokhoz. Mindig a projekt igényeihez választok."
  },
  {
    question: "Van bemutatód korábbi munkákról?",
    answer: "Igen! A Projects szekcióban megtalálod a referenciáimat. Szívesen mutatok további bedolgozott projekteket is egy személyes konzultáció során."
  },
  {
    question: "Milyen garanciát vállalsz?",
    answer: "Minden projektre 3-12 hónap garanciát vállalok, amely magában foglalja a hibajavítást és a kisebb módosításokat. A hosszú távú együttműködésre is van lehetőség karbantartási csomaggal."
  },
  {
    question: "Hogyan működik a fizetés?",
    answer: "A fizetést több részletben kérhetem: 30% előleg a projekt indulásakor, 40% a fejlesztés félidejénél, és 30% az átadáskor. Banki átutalással vagy SZEP kártyával fizethető."
  },
  {
    question: "Mi van, ha nem vagyok elégedett a munkával?",
    answer: "Az első konzultáció ingyenes, ahol részletesen megbeszéljük az elvárásokat. A munka során folyamatosan egyeztetünk, és csak akkor fizetsz, ha elégedett vagy az eredménnyel. Reviziós köröket is biztosítok."
  },
  {
    question: "Milyen supportot nyújtasz a projekt átadása után?",
    answer: "Az alapvető supportot minden projekt tartalmazza. Emellett van havi karbantartási csomagom is, amely tartalmazza a biztonsági frissítéseket, tartalomkezelést, és 24/7-es hibaelhárítást."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section relative py-32">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(155, 89, 182, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 89, 182, 0.12) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, #000 60%, transparent 100%)'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-[#9b59b6] rounded-full animate-pulse" />
            GYIK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Gyakran Ismételt <span className="text-[#9b59b6] drop-shadow-[0_0_15px_rgba(155,89,182,0.4)]">Kérdések</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Válaszok a leggyakoribb kérdésekre. Ha nem találod a választ, keress meg nyugodtan!
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`bg-[#0a0a0f] rounded-2xl border overflow-hidden transition-colors ${openIndex === index ? 'border-[#9b59b6]/30' : 'border-white/5 hover:border-white/10'}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className={`font-medium pr-4 transition-colors ${openIndex === index ? 'text-[#9b59b6]' : 'text-white'}`}>{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#9b59b6]/10 border border-[#9b59b6]/20 flex items-center justify-center text-[#9b59b6] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 sm:px-8 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-gray-400 mb-6">
            Nem találtad meg a választ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#9b59b6] to-[#6c5ce7] text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(155,89,182,0.25)] hover:shadow-[0_0_30px_rgba(155,89,182,0.45)] hover:-translate-y-0.5"
          >
            <span>Keress meg</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
