"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo, softSkills, languages } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { language } = useLanguage();
  const en = language === "en";

  const quickInfo = [
    { icon: "📧", label: "Email", value: personalInfo.email },
    { icon: "📍", label: en ? "Location" : "Helyszín", value: personalInfo.location },
    { icon: "🎂", label: en ? "Born" : "Született", value: en ? "January 23, 2004" : personalInfo.birthday },
    { icon: "💼", label: en ? "Status" : "Státusz", value: en ? "Available" : "Elérhető" },
  ];

  return (
    <section className="section relative py-32 overflow-hidden">
      {/* Background - Like Blog */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />

        {/* Floating code symbols */}
        <motion.div
          className="absolute top-20 left-[10%] text-5xl font-mono text-blue-500/5 select-none"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-[15%] text-4xl font-mono text-purple-500/5 select-none"
          animate={{ y: [0, 20, 0] }}
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
            {en ? "About Me" : "Rólam"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {en ? "Get To Know Me!" : "Ismerj Meg!"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {en ? "A passionate full stack developer who enjoys solving complex problems." : "Szenvedélyes full stack fejlesztő, aki élvezi a komplex problémák megoldását."}
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
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-emerald-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={personalInfo.avatars}
                    alt={personalInfo.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickInfo.map((item, index) => (
                <motion.div
                  key={item.icon}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-[#0d0d0d] rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <div className="min-w-0">
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
            <div className="bg-[#0d0d0d] rounded-2xl p-6 sm:p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                {en ? "Profile Summary" : "Profil Összefoglaló"}
              </h3>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  {en
                    ? "A passionate full stack developer student who enjoys solving complex problems and applying modern web technologies. Alongside my university studies, I actively build personal projects."
                    : "Szenvedélyes full stack fejlesztő hallgató, aki élvezi a komplex problémák megoldását és a modern webtechnológiák alkalmazását. Az egyetemi tanulmányok mellett aktívan fejlesztem saját projekteket."}
                </p>
                <p>
                  {en ? (
                    <>I&apos;m especially interested in the <span className="text-blue-400">React and Node.js</span> ecosystem, as well as cloud-based solutions. My goal is to build innovative software.</>
                  ) : (
                    <>Különösen érdekel a <span className="text-blue-400">React és Node.js</span> ökoszisztéma, valamint a felhőalapú megoldások. Célom, hogy innovatív szoftvereket hozzak létre.</>
                  )}
                </p>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                {en ? "Personal Skills" : "Személyes Készségek"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                {en ? "Languages" : "Nyelvismeret"}
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
