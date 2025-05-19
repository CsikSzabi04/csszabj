import React from 'react';

const Info = () => {
  return (
    <>
      <section id="contact" className="section h-screen w-screen flex-shrink-0">
        <div className="container mx-auto px-6 text-center h-full flex items-center justify-center">
          <div>
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
                  <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-100 mb-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-400">alexszabi04@gmail.com</p>
                </div>

                <div className="bg-gradient-to-r from-gray-800 to-zinc-700 p-6 rounded-xl fade-in delay-300">
                  <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-400 mb-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-400">+36 70 123 4567</p>
                </div>

                <div className="bg-gradient-to-r from-gray-800 to-zinc-700 p-6 rounded-xl fade-in delay-400">
                  <div className="w-12 h-12 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-xl text-gray-800 mb-4">
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
        </div>
      </section>

      <footer className="h-screen w-screen flex-shrink-0 py-8 bg-gray-900 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2023 Szabolcs Csík. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Info;