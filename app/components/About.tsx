"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { personalInfo, softSkills, languages } from "../data/portfolio";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="section relative py-32 overflow-hidden">
      {/* Background - Like Blog */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating code symbols */}
        <motion.div 
          className="absolute top-20 left-[10%] text-5xl font-mono text-blue-500/5 select-none"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-[15%] text-4xl font-mono text-purple-500/5 select-none"
          animate={{ 
            y: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {"const"}
        </motion.div>
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
          <span className="inline-block px-5 py-2.5 bg-blue-900/20 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Rólam
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ismerj Meg!
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Szenvedélyes full stack fejlesztő, aki élvezi a komplex problémák megoldását.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Profile Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Image Card - Like Blog style */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-emerald-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={personalInfo.avatars}
                  alt={personalInfo.name}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute bottom-6 left-6 bg-[#0d0d0d]/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-white font-mono">
                    <span className="text-blue-400">await</span> createFuture()
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📧", label: "Email", value: "alexszabi04@gmail.com" },
                { icon: "📍", label: "Helyszín", value: personalInfo.location },
                { icon: "🎂", label: "Született", value: personalInfo.birthday },
                { icon: "💼", label: "Státusz", value: "Elérhető" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-[#0d0d0d] rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-zinc-500">{item.label}</p>
                      <p className="text-sm text-white font-medium truncate">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* About Text */}
            <div className="bg-[#0d0d0d] rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Profil Összefoglaló
              </h3>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Szenvedélyes full stack fejlesztő hallgató, aki élvezi a komplex problémák megoldását és a modern webtechnológiák alkalmazását. Az egyetemi tanulmányok mellett aktívan fejlesztem saját projekteket.
                </p>
                <p>
                  Különösen érdekel a <span className="text-blue-400">React és Node.js</span> ökoszisztéma, valamint a felhőalapú megoldások. Célom, hogy innovatív szoftvereket hozzak létre.
                </p>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Személyes Készségek
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-[#0d0d0d] rounded-xl p-3 border border-white/5 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Nyelvismeret
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-[#0d0d0d] rounded-xl p-4 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{lang.name}</span>
                      <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">
                        {lang.level}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.progress}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
