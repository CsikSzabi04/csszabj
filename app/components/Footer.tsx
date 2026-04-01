"use client";

import { personalInfo } from "../data/portfolio";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTools = pathname?.startsWith("/tools");

  return (
    <footer className={`bg-[#050505] pt-20 ${(isHome || isTools) ? "mt-0 border-t-0" : "mt-32 border-t border-white/5"}`}>
      <div className="container-custom">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
         
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
              <span className="text-[#9b59b6]">Cs</span><span className="text-white">Sz</span>
            </h3>
            <p className="text-zinc-500 leading-relaxed mb-6">
              Szenvedélyes full stack fejlesztő, aki élvezi a komplex problémák megoldását és a modern webtechnológiák alkalmazását. Célom, hogy értékes és innovatív szoftvereket hozzak létre.
            </p>
           
            <div className="flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 border border-white/5 hover:border-blue-500 group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 border border-white/5 hover:border-blue-500 group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-red-500 transition-all duration-300 border border-white/5 hover:border-red-500 group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Navigáció</h4>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Kezdőlap
                </a>
              </li>
              <li>
                <a href="#about" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Rólam
                </a>
              </li>
              <li>
                <a href="#skills" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Készségek
                </a>
              </li>
              <li>
                <a href="#experience" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Tapasztalat
                </a>
              </li>
              <li>
                <a href="#projects" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                  Projektek
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Elérhetőség</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm mb-1">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-zinc-400 hover:text-blue-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm mb-1">Telefon</p>
                  <a href={`tel:${personalInfo.phone}`} className="text-zinc-400 hover:text-blue-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm mb-1">Helyszín</p>
                  <p className="text-zinc-400">{personalInfo.location}</p>
                </div>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Technológiák</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "PostgreSQL", "Git"].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 bg-white/5 text-zinc-500 text-sm rounded-lg border border-white/5 hover:border-blue-500/30 hover:text-blue-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

     
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">
              © {currentYear} <span className="text-zinc-400">{personalInfo.name}</span>. Minden jog fenntartva.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-zinc-600">Készült</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 hover:text-blue-400 transition-colors">Next.js</span>
                <span className="text-zinc-700">&</span>
                <span className="text-zinc-400 hover:text-blue-400 transition-colors">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}


