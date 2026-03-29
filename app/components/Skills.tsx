"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { skills } from "../data/portfolio";

const skillCategories = [
  { title: "Frontend", skills: skills.frontend, color: "#3b82f6", icon: "<>" },
  { title: "Backend", skills: skills.backend, color: "#10b981", icon: "{}" },
  { title: "Adatbázis", skills: skills.database, color: "#a855f7", icon: "#" },
  { title: "Eszközök", skills: skills.tools, color: "#f97316", icon: "⚙" },
  { title: "AI Tudás", skills: skills.ai, color: "#ec4899", icon: "◆" },
  { title: "Hosting", skills: skills.hosting, color: "#06b6d4", icon: "☁" },
];

// Get all skills as flat array with their category info
const allSkills = skillCategories.flatMap((cat, catIndex) =>
  cat.skills.map(skill => ({ ...skill, category: catIndex, color: cat.color }))
);

// Animated Circular Progress Component
function CircularProgress({
  percentage,
  color,
  label,
  delay,
  isInView
}: {
  percentage: number;
  color: string;
  label: string;
  delay: number;
  isInView: boolean;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedProgress(percentage);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: isInView ? strokeDashoffset : circumference
          }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: "easeOut"
          }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          {Math.round(animatedProgress)}%
        </motion.span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const proficiencyLevels = [92, 85, 78, 88, 95, 72];
  const totalSkills = allSkills.length;
  
  const [orbitRadius, setOrbitRadius] = useState(200);
  const [containerScale, setContainerScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(120);
        setContainerScale(0.65);
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(160);
        setContainerScale(0.85);
      } else {
        setOrbitRadius(200);
        setContainerScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section relative py-32 overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '-30%',
            left: '-15%'
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            bottom: '-20%',
            right: '-10%'
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block px-5 py-2.5 bg-blue-900/20 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Készségeim
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Tech Stack
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4">
            Modern és hatékony eszközökkel dolgozom.
          </p>
        </motion.div>

        {/* Main Skills Display */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">

          {/* Animated Circular Display - Clock style */}
          <motion.div
            className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center translate-y-[-20px] lg:translate-y-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: containerScale }}
            transition={{ duration: 0.8 }}
          >
            {/* Outer decorative ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle decorative ring */}
            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-white/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Center circle with icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white">{'<>'}</span>
              </div>
            </div>

      {/* Skills rotating clockwise - each label rotates counter to stay horizontal */}
<div className="absolute inset-0">
  {allSkills.map((skill, index) => {
    // Kiszámoljuk a kezdő szöget
    const baseAngle = (index / totalSkills) * 2 * Math.PI;
    const delay = (index / totalSkills) * -20; // Előre számoljuk ki a delay-t

    return (
      <motion.div
        key={`orbit-${index}`}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0,
        }}
        transition={{
          opacity: { 
            duration: 0.8, 
            delay: 0.2 + index * 0.03,
            ease: "easeOut"
          },
          scale: { 
            duration: 0.8, 
            delay: 0.2 + index * 0.03,
            ease: [0.34, 1.56, 0.64, 1] // Rugalmasabb megjelenés
          },
        }}
      >
        {/* Container a forgó elemeknek */}
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30, // Lassabb forgás = simább
            repeat: Infinity,
            ease: "linear",
            delay: delay,
            repeatDelay: 0 // Nincs ismétlési késleltetés
          }}
        >
          {/* Skill label - counter-rotate to stay horizontal */}
          <motion.div
            className="px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: `${skill.color}20`,
              color: skill.color,
              border: `1px solid ${skill.color}80`,
              boxShadow: `0 4px 12px ${skill.color}30`,
              backdropFilter: 'blur(4px)',
              x: Math.cos(baseAngle) * orbitRadius,
              y: Math.sin(baseAngle) * orbitRadius,
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
              repeatDelay: 0
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: `${skill.color}40`,
              boxShadow: `0 8px 20px ${skill.color}60`,
              transition: { duration: 0.2 }
            }}
          >
            {skill.name}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  })}
</div>


            {/* Pulsing center effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 40px rgba(59, 130, 246, 0)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Skill Progress Circles */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <CircularProgress
                  percentage={proficiencyLevels[index]}
                  color={category.color}
                  label={category.title}
                  delay={0.3 + index * 0.15}
                  isInView={isInView}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group relative bg-[#0d0d0d] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${category.color}15 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${category.color}15`,
                    borderColor: `${category.color}30`
                  }}
                >
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: category.color }}
                  >
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-default border"
                    style={{
                      backgroundColor: `${category.color}10`,
                      borderColor: `${category.color}20`,
                      color: category.color,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{ backgroundColor: category.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 + 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#0d0d0d] px-6 py-3 rounded-full border border-white/5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-400 font-mono text-sm">Folyamatosan tanulok és fejlődöm</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
