"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: 1,
    title: "Weboldal Fejlesztés",
    icon: "FaCode",
    description: "Egyedi, modern és reszponzív weboldalak készítése a legújabb technológiákkal.",
    features: [
      "Reszponzív design",
      "SEO optimalizálás",
      "Modern UI/UX",
      "Gyors betöltés",
      "Admin panel",
  
    ],
    price: "-",
    popular: true
  },
  {
    id: 4,
    title: "App Fejlesztés",
    icon: "FaMobileAlt",
    description: "Mobil alkalmazások iOS és Android platformokra.",
    features: [
      "iOS & Android",
      "Native vagy Cross-platform",
      "Backend integráció",
      "Push notification",
      "App Store publikálás",
    ],
    price: "-",
    popular: false
  },
  /* 
  {
    id: 5,
    title: "API Fejlesztés",
    icon: "FaServer",
    description: "Biztonságos és skálázható RESTful API-k készítése.",
    features: [
      "RESTful architektúra",
      "Hitelesítés",
      "Dokumentáció",
      "Tesztelés",
      "Optimalizálás",
    ],
    price: "-",
    popular: false
  },*/
  {
    id: 6,
    title: "Karbantartás",
    icon: "FaTools",
    description: "Meglévő weboldalak és alkalmazások folyamatos karbantartása.",
    features: [
      "Biztonsági frissítések",
      "Tartalomkezelés",
      "Teljesítmény",
      "Backup",
      "24/7 monitoring",
      "Havibérlet"
    ],
    price: "-",
    popular: false
  }
];

const processSteps = [
  { number: "01", title: "Konzultáció", description: "Megbeszéljük az igényeket és elvárásokat" },
  { number: "02", title: "Tervezés", description: "Készítek egy részletes specifikációt" },
  { number: "03", title: "Fejlesztés", description: "Aktívan dolgozunk a projekten" },
  { number: "04", title: "Tesztelés", description: "Alaposan letesztelünk mindent" },
  { number: "05", title: "Átadás", description: "Élesítjük és betanítom a használatba" }
];

export default function Services() {
  return (
    <section id="services" className="section relative py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Szolgáltatások
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Amit Csinálok
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            Professzionális webfejlesztési szolgáltatások, amelyek segítenek az online jelenléted megerősítésében.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-[#0d0d0d] rounded-2xl p-8 border transition-all duration-300 group hover:scale-[1.02] ${
                service.popular 
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10" 
                  : "border-white/5 hover:border-blue-500/30"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    KEDVENC
                  </span>
                </div>
              )}

              <div className="w-16 h-16 bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900/50 transition-colors">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>

              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-zinc-500">
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/5">
                <p className="text-2xl font-bold text-white mb-1">{service.price}</p>
                <p className="text-xs text-zinc-500">*Az árak tájékoztató jellegűek</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            A Munkafolyamat
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#0d0d0d] border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                </div>
                <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-zinc-500">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
