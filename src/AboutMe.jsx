import React from 'react';

const AboutMe = ({ handleDownloadCV, handleDownloadM }) => {
  return (
    <section id="about" className="section w-full min-h-screen flex items-center justify-center py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 fade-in">
          <span className="gradient-text">About Me</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12">
          {/* Left Column - Profile Image & Buttons */}
          <div className="w-full lg:w-1/3 flex flex-col items-center fade-in">
            <img
              src="45.png"
              alt="Profile"
              className="rounded-lg w-48 h-48 md:w-56 md:h-80 lg:w-25 lg:h-80 object-cover shadow-2xl mb-6"
            />
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-xs">
              <button
                onClick={handleDownloadCV}
                className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
              >
                <i className="fas fa-download mr-2"></i> View CV
              </button>
              <button
                onClick={handleDownloadM}
                className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
              >
                <i className="fas fa-download mr-2"></i> View Tender
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-3/3 space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 fade-in delay-100">
              <span className="gradient-text">Who am I?</span>
            </h3>

            {/* Skills Cards - Adjusted for medium screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gray-800 p-4 md:p-6 rounded-xl border-l-4 border-gray-100 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-200">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 md:mr-4">
                    <i className="fas fa-code text-gray-200 text-sm md:text-base"></i>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold">Software Developer</h4>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                 I transform ideas into functional solutions through clean, efficient code. All about building systems that solve real problems.
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 md:p-6 rounded-xl border-l-4 border-gray-500 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-3 md:mr-4">
                    <i className="fas fa-paint-brush text-gray-500 text-sm md:text-base"></i>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold">Frontend & Design</h4>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  I craft engaging, interactive experiences with attention to detail. From animations to UI/UX, I make digital products delightful to use.
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 md:p-6 rounded-xl border-l-4 border-gray-700 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-400">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-3 md:mr-4">
                    <i className="fas fa-cloud text-gray-400 text-sm md:text-base"></i>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold">Cloud & DevOps</h4>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  I architect and maintain cloud infrastructure that scales. AWS, GCP, CI/CD pipelines - I keep systems running smoothly.
                </p>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className="mt-6 md:mt-8 bg-stone-800/50 p-4 md:p-6 rounded-xl border border-gray-700 backdrop-blur-sm fade-in delay-500">
              <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mr-2 md:mr-3 animate-pulse"></span>
                <span className="gradient-text">Technical </span>
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 text-sm md:text-base">
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>Problem Solving</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>System Architecture</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>UI/UX Design</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>Cloud Infrastructure</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>API Development</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>Automated Testing</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>Performance Optimization</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check-circle text-blue-400 mr-2 text-xs md:text-sm"></i>
                  <span>Continuous Deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;