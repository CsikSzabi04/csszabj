import React from 'react';

const MyWork = () => {
  return (
    <section id="portfolio" className="section h-auto min-h-screen w-screen flex-shrink-0 py-12 lg:py-0 2xl:h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="h-full 2xl:flex 2xl:items-center">
          <div className="w-full 2xl:h-full 2xl:overflow-y-auto 2xl:pr-2">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 fade-in">
              <span className="gradient-text">My Work</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Project 1 */}
              <div className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 fade-in delay-100">
                <div className="h-40 sm:h-48 md:h-56 lg:h-48 xl:h-56 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="./main.png" 
                    alt="GameDataHub" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">GameDataHub</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                    A gaming data platform with comprehensive game information.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">API</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Tailwind</span>
                  </div>
                  <a 
                    href="https://gamehub.hu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium transition"
                  >
                    View Project <span className="ml-1">→</span>
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 fade-in delay-200">
                <div className="h-40 sm:h-48 md:h-56 lg:h-48 xl:h-56 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="./p2.png" 
                    alt="My Business Card" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">My Business Card</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                    Digital business card with contact information.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">HTML</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">CSS</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">JavaScript</span>
                  </div>
                  <a 
                    href="https://mbusinesscard.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium transition"
                  >
                    View Project <span className="ml-1">→</span>
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 fade-in delay-300">
                <div className="h-40 sm:h-48 md:h-56 lg:h-48 xl:h-56 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="./p3.png" 
                    alt="Money Tracker" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Money Tracker</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                    Application for tracking personal finances.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Firebase</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Charts</span>
                  </div>
                  <a 
                    href="https://pflowtracker.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base font-medium transition"
                  >
                    View Project <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-10 lg:mt-12 fade-in delay-400">
              <a 
                href="#"
                className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border border-gray-700 rounded-full bg-gray-800 font-medium hover:bg-gray-700 transition duration-500"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWork;