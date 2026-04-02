"use client";

import { motion } from "framer-motion";
import { projects, personalInfo } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { language } = useLanguage();
  return (
    <section className="section relative py-32 overflow-hidden">
      {/* Background - Like Blog */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20h-2v2h-2v20H20v-2.5zM0 20h20v2H0v-2zm0 4h20v2H0v-2zm0 4h20v2H0v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "en" ? "My Recent Works" : "Legutóbbi Munkáim"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {language === "en" ? "Some of the projects I've recently worked on." : "Néhány projekt, amelyen dolgoztam."}
          </p>
        </motion.div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative bg-[#0a0a0d] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col md:flex-row hover:border-white/10 transition-all duration-500 shadow-2xl"
              >
                {/* Ambient Glow behind text */}
                <div 
                  className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-full md:w-1/2 h-full bg-gradient-to-br ${
                    isEven ? 'from-purple-600/10 via-purple-900/5' : 'from-blue-600/10 via-blue-900/5'
                  } to-transparent opacity-50 pointer-events-none blur-3xl`} 
                />

                {/* Content Side */}
                <div className={`w-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-10 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="mb-6">
                    {/* Category Pill */}
                    <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm text-xs sm:text-sm text-zinc-300 mb-6 sm:mb-8 font-medium">
                      {project.category || "Webalkalmazás"}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl font-light">
                      {project.description}
                    </p>

                    {/* Links & Tech (Visible on Hover or always, but refined) */}
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
                          {language === "en" ? "Try it out" : "Kipróbálom"}
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
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1.5 bg-white/5 text-zinc-300 rounded-lg font-medium border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px] lg:min-h-[600px] ${isEven ? 'md:order-2' : 'md:order-1'} bg-zinc-900/50 flex items-center justify-center p-8 overflow-hidden`}>
                  {/* Subtle radial gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-[rgba(10,10,13,0.2)] md:to-[#0a0a0d] z-10" />
                  
                  <motion.div 
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-0 transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View More */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            <span>{language === "en" ? "View all projects on GitHub" : "Összes projekt megtekintése GitHub-on"}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
