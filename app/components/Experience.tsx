"use client";

import { experience, education } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2.5 bg-blue-900/30 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Tapasztalat & Tanulmányok
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Eddigi Utam
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed px-4">
            A szakmai tapasztalataim és tanulmányaim, amelyek hozzájárultak a fejlődésemhez.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/20">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Szakmai Tapasztalat
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-900 via-emerald-900 to-zinc-800" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-10 sm:pl-12">
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center ${
                      exp.current 
                        ? "bg-blue-600 shadow-lg shadow-blue-500/30" 
                        : "bg-[#171717] border-4 border-blue-900/30"
                    }`}>
                      {exp.current ? (
                        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      ) : (
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="bg-[#171717] rounded-2xl p-5 sm:p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.current 
                            ? "bg-blue-900/30 text-blue-400" 
                            : "bg-white/5 text-zinc-400"
                        }`}>
                          {exp.date}
                        </span>
                        {exp.current && (
                          <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs font-medium">
                            Jelenlegi
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-blue-400 font-medium mb-3">
                        {exp.company}
                      </p>
                      <p className="text-sm text-zinc-500 mb-4">
                        {exp.location}
                      </p>
                      
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-900/30 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                </svg>
              </span>
              Tanulmányok
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-900 via-blue-900 to-zinc-800" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative pl-10 sm:pl-12">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center bg-[#171717] border-4 border-emerald-900/30">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    {/* Content Card */}
                    <div className="bg-[#171717] rounded-2xl p-5 sm:p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-300">
                      <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs font-medium mb-3 inline-block">
                        {edu.date}
                      </span>
                      
                      <h4 className="text-lg font-bold text-white mb-1">
                        {edu.title}
                      </h4>
                      <p className="text-emerald-400 font-medium mb-1">
                        {edu.school}
                      </p>
                      <p className="text-sm text-zinc-500 mb-4">
                        {edu.location}
                      </p>
                      
                      <ul className="space-y-2">
                        {edu.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
