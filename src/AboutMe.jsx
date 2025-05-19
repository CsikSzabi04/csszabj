import React from 'react';

const AboutMe = ({ handleDownloadCV }) => {
  return (
 <section id="about" className="section  w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 fade-in">
              <span className="gradient-text">About Me</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex flex-col items-center fade-in">
                <img src="45.png" alt="Profile" className="rounded-lg w-64 h-64 object-cover shadow-2xl mb-4" />
                <button onClick={handleDownloadCV}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1 shadow-lg">
                  <i className="fas fa-download mr-2"></i> Click to Download CV
                </button>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold mb-6 fade-in delay-100">
                  <span className="gradient-text">Who am I?</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-gray-100 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <i className="fas fa-code text-gray-200"></i>
                      </div>
                      <h4 className="text-xl font-semibold">Software Developer</h4>
                    </div>
                    <p className="text-gray-300">
                      I transform ideas into functional solutions through clean, efficient code.
                      All about building systems that solve real problems.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl border-l-4 border-gray-500 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-4">
                        <i className="fas fa-paint-brush text-gray-500"></i>
                      </div>
                      <h4 className="text-xl font-semibold">Frontend & Design</h4>
                    </div>
                    <p className="text-gray-300">
                      I craft engaging, interactive experiences with attention to detail.
                      From animations to UI/UX, I make digital products delightful to use.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl border-l-4 border-gray-700 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-400">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-4">
                        <i className="fas fa-cloud text-gray-400"></i>
                      </div>
                      <h4 className="text-xl font-semibold">Cloud & DevOps</h4>
                    </div>
                    <p className="text-gray-300">
                      I architect and maintain cloud infrastructure that scales.
                      AWS, GCP, CI/CD pipelines - I keep systems running smoothly.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-stone-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm fade-in delay-500">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                    <span className="gradient-text">Technical </span>
                  </h4>
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>Problem Solving</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>System Architecture</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>UI/UX Design</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>Cloud Infrastructure</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>API Development</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>Automated Testing</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
                      <span>Performance Optimization</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-blue-400 mr-2"></i>
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