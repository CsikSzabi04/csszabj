"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, personalInfo } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // 3 rows of 2 columns

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Pagination logic for other projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentOtherProjects = otherProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(otherProjects.length / projectsPerPage);

  return (
    <section className="section relative py-32 overflow-hidden">
      {/* Background - Like Blog */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating code symbols */}
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
            {language === "en" ? "My Projects" : "Projektjeim"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            {language === "en" ? "Selected Works" : "Legjobb Projektjeim"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {language === "en" ? "A showcase of my premium projects featuring modern tech stacks and creative solutions." : "A legbüszkébb munkáim, amelyek a legnagyobb hatást érték el."}
          </p>
        </motion.div>

        {/* Featured Projects Stack */}
        <div className="flex flex-col gap-12 lg:gap-24 mb-20">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative flex flex-col md:flex-row transition-all duration-500"
              >
                {/* Background and Border wrapper */}
                <div className="absolute inset-0 bg-[#0a0a0d] rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500 pointer-events-none z-0">
                  <div 
                    className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-full md:w-1/2 h-full bg-gradient-to-br ${
                      isEven ? 'from-purple-600/10 via-purple-900/5' : 'from-blue-600/10 via-blue-900/5'
                    } to-transparent opacity-50 blur-3xl`} 
                  />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="mb-6">
                    <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm text-xs sm:text-sm text-zinc-300 mb-6 sm:mb-8 font-medium">
                      {project.category}
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-6">
                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 ${
                            isEven ? 'bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                          }`}
                        >
                          {language === "en" ? "View Project" : "Megtekintés"}
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/10 backdrop-blur-sm"
                          aria-label="GitHub Repository"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-xs px-3 py-1.5 bg-white/5 text-zinc-300 rounded-lg font-medium border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px] ${isEven ? 'md:order-2' : 'md:order-1'} flex items-center justify-center p-8 z-10`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-[rgba(10,10,13,0.2)] md:to-[#0a0a0d] pointer-events-none rounded-[2.5rem] z-10" />

                  <motion.div className="relative w-full h-[80%] md:h-full rounded-2xl overflow-hidden shadow-2xl z-0 transform group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={`absolute inset-0 w-full h-full object-cover ${project.objectPosition === 'left' ? 'object-left' : 'object-top'}`}
                    />
                  </motion.div>

                  {project.mobileImage && (
                    <motion.div className={`absolute bottom-4 md:-bottom-8 ${isEven ? '-right-4 md:-right-12' : '-left-4 md:-left-12'} w-28 md:w-40 lg:w-48 aspect-[9/19] rounded-[1.5rem] bg-black border-[5px] md:border-[7px] border-[#18181b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden transform group-hover:-translate-y-4 transition-all duration-700 ease-out`}>
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#18181b] rounded-full z-30" />
                       <img src={project.mobileImage} alt={`${project.title} Mobile`} className="w-full h-full object-cover object-top" />
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-20 mb-20">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            <span>{showAll ? (language === "en" ? "Show Less" : "Kevesebb megjelenítése") : (language === "en" ? "View All Projects" : "Összes projekt megtekintése")}</span>
            <svg className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Additional Projects Grid */}
        <AnimatePresence>
          {showAll && (
            <motion.div
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
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-3">{project.title}</h4>
                    <p className="text-zinc-400 text-sm mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] px-2 py-1 bg-white/5 text-zinc-400 rounded-md border border-white/5">{tech}</span>
                        ))}
                      </div>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center gap-1">
                        View <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 bg-white/5 p-4 rounded-2xl border border-white/10 max-w-xs mx-auto">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                        currentPage === i + 1 
                          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                          : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'
                      }`}
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
