"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import FeaturedProjectCard from "./FeaturedProjectCard";

const PROJECTS_PER_PAGE = 6; // 3 rows of 2 columns
const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);
const totalPages = Math.ceil(otherProjects.length / PROJECTS_PER_PAGE);

export default function Projects() {
  const { language } = useLanguage();
  const en = language === "en";
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const currentOtherProjects = otherProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

  return (
    <section className="section relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />

        <motion.div
          className="absolute top-1/3 right-[10%] text-5xl font-mono text-blue-500/5 select-none"
          animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {"</>"}
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-[15%] text-4xl font-mono text-purple-500/5 select-none"
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
            {en ? "My Projects" : "Projektjeim"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            {en ? "Selected Works" : "Legjobb Projektjeim"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {en ? "A showcase of my premium projects featuring modern tech stacks and creative solutions." : "A legbüszkébb munkáim, amelyek a legnagyobb hatást érték el."}
          </p>
        </motion.div>

        {/* Featured Projects Stack */}
        <div className="flex flex-col gap-12 lg:gap-24 mb-20">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} viewLabel={en ? "View Project" : "Megtekintés"} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div className="text-center mt-20 mb-20">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              aria-controls="other-projects"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              <span>{showAll ? (en ? "Show Less" : "Kevesebb megjelenítése") : (en ? "View All Projects" : "Összes projekt megtekintése")}</span>
              <svg className={`w-5 h-5 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Additional Projects Grid */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              id="other-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {currentOtherProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative bg-[#0a0a0d] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 p-6 flex flex-col"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-3">{project.title}</h4>
                    <p className="text-zinc-400 text-sm mb-6 flex-grow">{project.description}</p>

                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-1 bg-white/5 text-zinc-400 rounded-md border border-white/5">{tech}</span>
                        ))}
                      </div>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center gap-1 flex-shrink-0">
                        {en ? "View" : "Megnézem"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 bg-white/5 p-4 rounded-2xl border border-white/10 max-w-xs mx-auto">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      onClick={() => setCurrentPage(i + 1)}
                      aria-current={currentPage === i + 1 ? "page" : undefined}
                      className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
