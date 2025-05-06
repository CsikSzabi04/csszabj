import React, { useEffect } from 'react';
import "./Portfolio.css"

const Portfolio = () => {
  useEffect(() => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Enhanced smooth scrolling function
    function smoothScroll(targetId) {
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(1500, Math.abs(distance) * 1.2);
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth acceleration/deceleration
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }

    // Apply smooth scrolling to all buttons and navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        // Skip if it's an external link or has target="_blank"
        if (this.target === '_blank' || this.href.startsWith('http')) return;

        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScroll(targetId);
      });
    });

    // Scroll animation observer
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.6,
      rootMargin: '0px 0px -100px 0px'
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    // Add momentum to manual scrolling
    let isScrolling = false;
    const scrollContainer = document.querySelector('.scroll-container');
    let scrollEndTimer;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', () => {
        // Clear any pending snap
        clearTimeout(scrollEndTimer);

        // If we're not already handling a scroll
        if (!isScrolling) {
          isScrolling = true;

          // After scroll ends, snap to nearest section
          scrollEndTimer = setTimeout(() => {
            const sections = document.querySelectorAll('.section');
            let closestSection = null;
            let closestDistance = Infinity;

            sections.forEach(section => {
              const rect = section.getBoundingClientRect();
              const distance = Math.abs(rect.top);

              if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
              }
            });

            if (closestSection) {
              isScrolling = true;
              const targetPosition = closestSection.getBoundingClientRect().top + window.pageYOffset;
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = Math.min(1000, Math.abs(distance) * 0.8);
              let startTime = null;

              function snapAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                  requestAnimationFrame(snapAnimation);
                } else {
                  isScrolling = false;
                }
              }

              // Easing function for smooth snap
              function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
              }

              requestAnimationFrame(snapAnimation);
            } else {
              isScrolling = false;
            }
          }, 100);
        }
      });
    }

    // Cleanup function
    return () => {
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.removeEventListener('click', function () {
          mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
          link.removeEventListener('click', () => {
            mobileMenu.classList.add('hidden');
          });
        });
      }

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          if (this.target === '_blank' || this.href.startsWith('http')) return;
          e.preventDefault();
          const targetId = this.getAttribute('href');
          smoothScroll(targetId);
        });
      });

      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', () => {});
      }

      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  const handleDownloadCV = () => {
    window.open('CV.png', '_blank');
  };

  return (
    <div className="text-gray-100 font-sans antialiased ">
      {/* Header */}
      <header className="fixed w-full z-50 bg-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <img src="02.png" alt="Logo" className="h-10 w-10 mr-3" />
              <span className="text-xl font-bold">Szabolcs Csík</span>
            </div>

            {/* Desktop Navigation */}
            <nav className=" md:flex space-x-6">
              <a href="#home" className="nav-link text-gray-300 hover:text-white transition">Home</a>
              <a href="#portfolio" className="nav-link text-gray-300 hover:text-white transition">Portfolio</a>
              <a href="https://www.wattpad.com/user/thejasonronin04" target="_blank" rel="noopener noreferrer"
                className="nav-link text-gray-300 hover:text-white transition">My Books</a>
              <a href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb" target="_blank" rel="noopener noreferrer"
                className="nav-link text-gray-300 hover:text-white transition">My Songs</a>
            </nav>

            {/* Mobile Menu Button */}
            <button id="mobile-menu-button" className="md:hidden text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu"
            className="mobile-menu hidden md:hidden absolute top-16 left-0 right-0 bg-gray-800 p-4 rounded-lg shadow-xl">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-300 hover:text-white transition py-2">Home</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition py-2">Portfolio</a>
              <a href="https://www.wattpad.com/user/thejasonronin04" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition py-2">My Books</a>
              <a href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition py-2">My Songs</a>
            </div>
          </div>
        </div>
      </header>

      {/* Full page scroll container */}
      <div className="scroll-container pt-16">
        {/* Home Section */}
        <section id="home" className="section">
          <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
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
              <div className="flex flex-wrap gap-4 fade-in delay-300">
                <a href="#contact"
                  className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full font-medium hover:opacity-90 transition transform hover:-translate-y-1">
                  Contact Me
                </a>
                <a href="#portfolio"
                  className="px-8 py-3 border border-gray-700 rounded-full font-medium hover:bg-gray-800 transition">
                  View Work
                </a>
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

        {/* About Section */}
        <section id="about" className="section">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 fade-in">
              <span className="gradient-text">About Me</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex flex-col items-center fade-in">
                <img src="45.png" alt="Profile" className="rounded-lg w-64 h-64 object-cover shadow-2xl mb-4" />
                {/* Download CV Button */}
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
                  {/* Software Developer Card */}
                  <div
                    className="bg-gray-800 p-6 rounded-xl border-l-4 border-gray-100 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-200">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <i className="fas fa-code text-gray-200"></i>
                      </div>
                      <h4 className="text-xl font-semibold">Software Developer</h4>
                    </div>
                    <p className="text-gray-300">
                      I transform ideas into functional solutions through clean, efficient code.
                      All about building systems that solve real problems.
                    </p>
                  </div>

                  {/* Frontend & Design Card */}
                  <div
                    className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl border-l-4 border-gray-500 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-300">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-4">
                        <i className="fas fa-paint-brush text-gray-500"></i>
                      </div>
                      <h4 className="text-xl font-semibold">Frontend & Design</h4>
                    </div>
                    <p className="text-gray-300">
                      I craft engaging, interactive experiences with attention to detail.
                      From animations to UI/UX, I make digital products delightful to use.
                    </p>
                  </div>

                  {/* Cloud & DevOps Card */}
                  <div
                    className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-xl border-l-4 border-gray-700 transform hover:-translate-y-2 transition duration-500 shadow-lg fade-in delay-400">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center mr-4">
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

                {/* Additional Details */}
                <div
                  className="mt-8 bg-stone-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm fade-in delay-500">
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

        {/* Portfolio Section */}
        <section id="portfolio" className="section">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 fade-in">
              <span className="gradient-text">My Work</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 - GameDataHub */}
              <div
                className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-2 fade-in delay-100">
                <div
                  className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  <img src="./main.png" alt="GameDataHub" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">GameDataHub</h3>
                  <p className="text-gray-400 mb-4">A gaming data platform with comprehensive game information.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">API</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Tailwind</span>
                  </div>
                  <a href="https://gamehub.hu" target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium">View Project →</a>
                </div>
              </div>

              {/* Project 2 - Business Card */}
              <div
                className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-2 fade-in delay-200">
                <div
                  className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center overflow-hidden">
                  <img src="./p2.png" alt="My Business Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">My Business Card</h3>
                  <p className="text-gray-400 mb-4">Digital business card with contact information.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">HTML</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">CSS</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">JavaScript</span>
                  </div>
                  <a href="https://mbusinesscard.netlify.app/" target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium">View Project →</a>
                </div>
              </div>

              {/* Project 3 - Money Tracker */}
              <div
                className="bg-gradient-to-r from-gray-700 to-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 transform hover:-translate-y-2 fade-in delay-300">
                <div
                  className="h-48 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center overflow-hidden">
                  <img src="./p3.png" alt="Money Tracker" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Money Tracker</h3>
                  <p className="text-gray-400 mb-4">Application for tracking personal finances.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Firebase</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">Charts</span>
                  </div>
                  <a href="https://pflowtracker.netlify.app/" target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium">View Project →</a>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 fade-in delay-400">
              <a href="#"
                className="inline-block px-8 py-3 border border-gray-700 rounded-full bg-gray-800 font-medium hover:bg-gray-800 transition duration-500">
                View All Projects
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-16 fade-in">
              <span className="gradient-text">Get In Touch</span>
            </h2>

            <div className="max-w-2xl mx-auto fade-in delay-100">
              <p className="text-gray-400 text-lg mb-12">
                Have a project in mind or want to discuss potential opportunities?
                Feel free to reach out - I'm always open to new collaborations and ideas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div className="bg-gradient-to-r from-gray-800 to-zinc-700 p-6 rounded-xl fade-in delay-200">
                  <div
                    className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-100 mb-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-400">alexszabi04@gmail.com</p>
                </div>

                <div className="bg-gradient-to-r from-gray-800 to-zinc-700 p-6 rounded-xl fade-in delay-300">
                  <div
                    className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-400 mb-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-400">+36 70 123 4567</p>
                </div>

                <div className="bg-gradient-to-r from-gray-800 to-zinc-700 p-6 rounded-xl fade-in delay-400">
                  <div
                    className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-800 mb-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p className="text-gray-400">Kecskemét, Hungary</p>
                </div>
              </div>

              <div className="flex justify-center space-x-6 fade-in delay-500">
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
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2023 Szabolcs Csík. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;