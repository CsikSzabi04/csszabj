import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle click for toggling the menu
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="pl-5 pr-5 pt-1 pb-1 flex justify-between items-center bg-black fixed w-full z-10">

      {/* Hamburger Menu Button (Always visible on all screen sizes) */}
      <button
        className="text-white text-3xl"
        onClick={handleMenuToggle} // Toggle menu visibility
      >
        ☰
      </button>

      {/* Navigation Links (Always visible on all screens, toggled by the hamburger menu) */}
      <motion.nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-4 w-full md:w-auto absolute md:relative top-0 left-0 right-0 bg-black md:bg-transparent md:flex-row flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <motion.div
            className="p-4 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -100 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-3xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
              onClick={() => setMenuOpen(false)} // Close the menu after link click
            >
              Main Page
            </Link>
          </motion.div>

          <motion.div
            className="p-4 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -100 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="text-3xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
              onClick={() => setMenuOpen(false)} // Close the menu after link click
            >
              My Projects
            </Link>
          </motion.div>

          <motion.div
            className="p-4 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -100 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/aboutme"
              className="text-3xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300"
              onClick={() => setMenuOpen(false)} // Close the menu after link click
            >
              Contact
            </Link>
          </motion.div>

          <motion.div
            className="p-4 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -100 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="https://www.wattpad.com/user/thejasonronin04"
              target='_blank'
              className="text-3xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300"
              onClick={() => setMenuOpen(false)} // Close the menu after link click
            >
              My Books
            </a>
          </motion.div>
          <motion.div
            className="p-4 text-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -100 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb" target='_blank'
              className="text-3xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300"
              onClick={() => setMenuOpen(false)} // Close the menu after link click
            >
              My Songs
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
}
