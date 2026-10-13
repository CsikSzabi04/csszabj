"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";
import FeaturedProjectCard from "./FeaturedProjectCard";

// The homepage shows the best projects in this order. A `null` slot reserves the place for a
// project that is coming soon: replace it with the project's id from app/data/portfolio.ts.
const BEST_PROJECT_SLOTS: (string | null)[] = ["climarkai", "lumen", "gamehub"];

const bestProjects: (Project | null)[] = BEST_PROJECT_SLOTS.map(
  (id) => (id ? projects.find((project) => project.id === id) ?? null : null),
);

function ComingSoonSlot({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex min-h-[220px] md:min-h-[300px] items-center justify-center rounded-[2.5rem] border border-dashed border-white/10 bg-[#0a0a0d]/60"
    >
      <span className="text-sm sm:text-base font-medium tracking-wide text-zinc-500">{label}</span>
    </motion.div>
  );
}

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            {en ? "Best Projects" : "Legjobb Projektek"}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            {en ? "The work I'm proudest of – the projects with the biggest impact." : "A legbüszkébb munkáim, amelyek a legnagyobb hatást érték el."}
          </p>
        </motion.div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {bestProjects.map((project, index) =>
            project ? (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
                size="large"
                viewLabel={en ? "View Project" : "Megtekintés"}
              />
            ) : (
              <ComingSoonSlot key={`slot-${index}`} label={en ? "Coming soon" : "Hamarosan"} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
