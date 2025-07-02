import React from 'react';

const MyWork = () => {
  return (
    <section id="portfolio" className="section w-full min-h-screen flex-shrink-0 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center mb-10 sm:mb-14 fade-in">
            <span className="gradient-text">My Work</span>
          </h2>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 fade-in delay-100">
            {/* Project Card Template */}
            {[
              {
                title: 'GameDataHub',
                desc: 'A gaming data platform with comprehensive game information.',
                img: './main.png',
                tech: ['React', 'API', 'Tailwind'],
                link: 'https://gamehub.hu',
                bg: 'from-blue-500 to-purple-600',
              },
              {
                title: 'I.N.S.I.G.H.T.',
                desc: 'Integrated Network for Surveillance, Investigation, Grid Hacking & Thought‑mapping',
                img: './insight.png',
                tech: ['React', 'Tailwind', 'JavaScript'],
                link: 'http://insightcore.hu/',
                bg: 'from-purple-500 to-pink-600',
              },
              {
                title: 'Hair Ranch',
                desc: 'WebPage for my favourite Barber in Kecskemét',
                img: './HairRanch.png',
                tech: ['React', 'TailwinCss', 'Backend | Node.js'],
                link: 'https://hairranch.hu',
                bg: 'from-green-500 to-blue-600',
              },
            ].map((project, index) => (
              <div
                key={project.title}
                className={`bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-1 fade-in delay-${(index + 1) * 100}`}
              >
                <div className={`h-40 sm:h-48 md:h-56 lg:h-48 xl:h-56 bg-gradient-to-r ${project.bg} flex items-center justify-center`}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-gray-700 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium transition"
                  >
                    View Project <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-10 sm:mt-12 fade-in delay-400">
            <a
              href="#"
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 rounded-full bg-gray-800 font-medium hover:bg-gray-700 transition duration-500"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWork;
