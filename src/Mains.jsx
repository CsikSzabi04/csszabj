import React from 'react';
import "./mains.css"
const Mains = () => {
  return (
    <section id="home" className="section min-h-screen w-full flex-shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col-reverse md:flex-row items-center min-h-screen">

        {/* Left content - modified for small screens */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left small-screen-center">
          <div className="small-screen-content">
            <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-200 mb-2 fade-in">
              Hi, I'm Szabolcs
            </h3>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 fade-in delay-100 leading-tight">
              <span className="gradient-text">Software Developer</span>
              <br />& Tester
            </h1>
          </div>

          {/* Elements hidden under 450x935 */}
          <div className="">
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 fade-in delay-200">
              I build exceptional digital experiences with clean, efficient code.
              All about creating solutions that make an impact.
            </p>

            {/* Buttons */}
            <div className="hide-below-900 fade-in delay-300 hide-below-450x935">
              <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 mb-6">
                <a
                  href="#contact"
                  className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-sm sm:text-base rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1 text-white"
                >
                  Contact Me
                </a>
                <a
                  href="#portfolio"
                  className="px-6 py-3 sm:px-8 sm:py-3 text-sm sm:text-base border border-gray-700 rounded-full font-medium hover:bg-gray-800 transition text-white"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
          {/* Social Icons */}
          <div className="hide-below-900 hide-below-450x680 mt-6 sm:mt-10 flex justify-center md:justify-start space-x-6 fade-in delay-400">
            <a href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition text-xl sm:text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition text-xl sm:text-2xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:alexszabi04@gmail.com"
              className="text-gray-400 hover:text-red-400 transition text-xl sm:text-2xl">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/cs_szabj04/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition text-xl sm:text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

        </div>

        {/* Right image - modified for small screens */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 fade-in delay-500 small-screen-image">
          <img
            src="011.png"
            alt="Szabolcs Csík"
            className="rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 object-cover border-4 border-gray-700 shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Mains;