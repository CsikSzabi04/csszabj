"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "../data/portfolio";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  viewLabel: string;
  /** "large" is the home page showcase, "default" the projects page. */
  size?: "large" | "default";
}

export default function FeaturedProjectCard({ project, index, viewLabel, size = "default" }: FeaturedProjectCardProps) {
  const isEven = index % 2 === 0;
  const large = size === "large";
  const objectPosition = project.objectPosition === "left" ? "object-left" : "object-top";

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative flex flex-col md:flex-row transition-all duration-500 ${large ? "shadow-2xl" : ""}`}
    >
      {/* Background and border wrapper (clips the glow without clipping the phone mockup) */}
      <div className="absolute inset-0 bg-[#0a0a0d] rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500 pointer-events-none z-0">
        <div
          className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-full md:w-1/2 h-full bg-gradient-to-br ${isEven ? "from-purple-600/10 via-purple-900/5" : "from-blue-600/10 via-blue-900/5"} to-transparent opacity-50 blur-3xl`}
        />
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 p-6 sm:p-8 md:p-12 ${large ? "lg:p-20" : "lg:p-16"} flex flex-col justify-center relative z-10 ${isEven ? "md:order-1" : "md:order-2"}`}>
        <div className="mb-6">
          <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm text-xs sm:text-sm text-zinc-300 mb-6 sm:mb-8 font-medium">
            {project.category}
          </div>

          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight ${large ? "xl:text-6xl drop-shadow-lg" : ""}`}>
            {project.title}
          </h3>

          <p className={`text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl font-light ${large ? "md:text-xl" : ""}`}>
            {project.description}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 ${isEven ? "bg-purple-600 hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]" : "bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]"}`}
              >
                {viewLabel}
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/10 backdrop-blur-sm"
                  aria-label={`${project.title} – GitHub`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
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
      <div className={`w-full md:w-1/2 relative min-h-[350px] md:min-h-[500px] ${large ? "lg:min-h-[600px]" : ""} ${isEven ? "md:order-2" : "md:order-1"} flex items-center justify-center p-8 z-10`}>
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-[rgba(10,10,13,0.2)] md:to-[#0a0a0d] pointer-events-none rounded-[2.5rem] ${large ? "z-0" : "z-10"}`} />

        {/* Desktop screenshot */}
        <div className={`relative w-full h-[80%] md:h-full min-h-[280px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.03] transition-transform duration-700 ease-out ${large ? "z-10" : "z-0"}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover ${objectPosition}`}
          />
        </div>

        {/* Mobile phone mockup */}
        {project.mobileImage && (
          <div
            className={
              large
                ? `absolute bottom-4 md:-bottom-12 ${isEven ? "-right-6 md:-right-16 lg:-right-20" : "-left-6 md:-left-16 lg:-left-20"} w-32 md:w-44 lg:w-52 aspect-[9/19] rounded-[2rem] bg-black border-[6px] md:border-[8px] border-[#18181b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden transform group-hover:-translate-y-6 group-hover:scale-105 transition-all duration-700 ease-out`
                : `absolute bottom-4 md:-bottom-8 ${isEven ? "-right-4 md:-right-12" : "-left-4 md:-left-12"} w-28 md:w-40 lg:w-48 aspect-[9/19] rounded-[1.5rem] bg-black border-[5px] md:border-[7px] border-[#18181b] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden transform group-hover:-translate-y-4 transition-all duration-700 ease-out`
            }
          >
            <div className={`absolute top-2 left-1/2 -translate-x-1/2 bg-[#18181b] rounded-full z-30 ${large ? "w-12 h-4" : "w-10 h-3"}`} />
            <Image
              src={project.mobileImage}
              alt={`${project.title} – mobil nézet`}
              fill
              sizes={large ? "(min-width: 1024px) 208px, (min-width: 768px) 176px, 128px" : "(min-width: 1024px) 192px, (min-width: 768px) 160px, 112px"}
              className="object-cover object-top"
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}
