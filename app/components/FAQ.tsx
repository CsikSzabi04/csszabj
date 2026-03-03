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
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2.5 bg-blue-900/30 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            GYIK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Gyakran Ismételt Kérdések
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
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
              className="bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="px-8 pb-6 text-zinc-400 leading-relaxed">
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
          className="text-center mt-16"
        >
          <p className="text-zinc-400 mb-6">
            Nem találtad meg a választ?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all duration-300"
          >
            <span>Keress Meg</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
