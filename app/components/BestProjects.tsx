"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import FeaturedProjectCard from "./FeaturedProjectCard";

const BEST_PROJECT_IDS = ["climarkai", "aurigpt", "forarch"];

const bestProjects = BEST_PROJECT_IDS
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

export default function BestProjects() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section className="section relative py-32 overflow-hidden bg-black/50">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2.5 bg-purple-900/20 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            {en ? "Featured" : "Kiemelt"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Best Projects
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {en ? "The work I'm proudest of – the projects with the biggest impact." : "A legbüszkébb munkáim, amelyek a legnagyobb hatást érték el."}
          </p>
        </motion.div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {bestProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              size="large"
              viewLabel={en ? "View Project" : "Megtekintés"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
