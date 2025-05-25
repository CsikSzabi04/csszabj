import React from 'react';
import { Link } from "react-router-dom";

const Mains = () => {
  return (
    <section id="home" className="section h-screen w-screen flex-shrink-0">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center h-full">
        <div className="md:w-1/2 mt-10 md:mt-0">
          <h3 className="text-lg md:text-xl font-medium text-gray-200 mb-2 fade-in">Hi, I'm Szabolcs</h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in delay-100">
            <span className="gradient-text">Software Developer</span>
            <br />& Tester
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg fade-in delay-200">
            I build exceptional digital experiences with clean, efficient code.
            All about creating solutions that make an impact.
          </p>
          <div className="fade-in delay-300">
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1"
              >
                Contact Me
              </a>
              <a
                href="#portfolio"
                className="px-8 py-3 border border-gray-700 rounded-full font-medium hover:bg-gray-800 transition"
              >
                View Work
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/java"
                className="px-4 py-2 border border-gray-700 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Konzol/Graf
              </Link>
              <Link
                to="/help"
                className="px-4 py-2 border border-gray-700 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Back/Front - end
              </Link>
              <Link
                to="/questions"
                className="px-4 py-2 border border-gray-700 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Questions
              </Link>
            </div>
          </div>


          <div className="mt-12 flex space-x-6 fade-in delay-400">
            <a href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition text-2xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:alexszabi04@gmail.com"
              className="text-gray-400 hover:text-red-400 transition text-2xl">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/cs_szabj04/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center hero-image fade-in delay-500">
          <img src="011.png" alt="Szabolcs Csík"
            className="rounded-full w-64 h-64 md:w-96 md:h-96 object-cover border-4 border-gray-700 shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default Mains;