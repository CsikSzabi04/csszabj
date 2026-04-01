"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "HTML5", type: "html" },
  { name: "Supabase", type: "supabase" },
  { name: "Next.js", type: "next" },
  { name: "Tailwind", type: "tailwind" },
  { name: "React", type: "react" },
  { name: "JavaScript", type: "js" },
  { name: "TypeScript", type: "ts" },
  { name: "Node.js", type: "node" },
  { name: "MongoDB", type: "mongo" },
];

export default function TechMarquee() {
  const items = [...techStack, ...techStack, ...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <div className="w-full relative py-12 bg-[#050508] border-t border-[#9b59b6]/30 overflow-hidden flex items-center backdrop-blur-sm group z-20 shadow-[0_0_30px_rgba(0,0,0,1)]">
      {/* Glossy gradient highlight across the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9b59b6]/80 to-transparent"></div>
      
      {/* Edge fading masks */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 150, 
        }}
      >
        {items.map((tech, i) => (
          <div key={i} className="flex items-center gap-3.5 px-10 text-gray-400 opacity-70 hover:opacity-100 transition-opacity duration-300 select-none">
            
            {tech.type === "react" && (
              <svg className="w-7 h-7 text-[#00a8ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse></svg>
            )}
            
            {tech.type === "next" && (
              <svg className="w-7 h-7 text-white bg-black rounded-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.116 13.91l-4.14-5.326v4.613h-1.28V9h1l4.004 5.21V9.9h1.28v6.011z"/></svg>
            )}
            
            {tech.type === "tailwind" && (
              <svg className="w-8 h-6 text-[#00a8ff]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>
            )}
            
            {tech.type === "ts" && (
              <span className="bg-[#00a8ff] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">TS</span>
            )}
            
            {tech.type === "js" && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-sm">JS</span>
            )}
            
            {tech.type === "html" && (
              <svg className="w-7 h-7 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M4.192 3.143h15.615l-1.42 15.83-6.386 1.77-6.385-1.77L4.192 3.143zm12.35 3.32h-9.08L7.7 8.875h8.55l-.545 6.05-3.69 1.025-3.69-1.025-.26-2.92H6.38l.42 4.705 5.205 1.445 5.205-1.445.835-9.255z"/></svg>
            )}
            
            {tech.type === "supabase" && (
              <span className="text-[#00ff41] font-bold text-2xl leading-none">⚡</span>
            )}
            
            {tech.type === "node" && (
              <span className="text-[#00ff41] font-bold text-2xl leading-none">⬢</span>
            )}
            
            {tech.type === "mongo" && (
              <span className="text-[#00ff41] font-bold text-2xl leading-none">🍃</span>
            )}
            
            <span className="text-lg font-medium tracking-wide text-gray-200">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
