import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Links() {
  const [scrollingDown, setScrollingDown] = useState(false);
  let lastScrollY = 0;

  // Handle scroll event to detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setScrollingDown(true);
      } else {
        // Scrolling up
        setScrollingDown(false);
      }
      lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // Reset scrollY at the top
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top smoothly when a link is clicked
  const handleLinkClick = (e, link) => {
    e.preventDefault(); // Prevent default behavior of the link

    // Smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // After the scroll ends, navigate to the link
    setTimeout(() => {
      window.location.href = link;
    }, 700); // Delay to wait for the scroll effect to complete
  };

  return (
    <div className="relative p-20 m-30 flex flex-col justify-center items-center text-center bg-cover bg-center border-b-8">
      {/* Motion div for 'Main Page' Link */}
      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth transition with slight delay
      >
        <Link
          to="/"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
          onClick={(e) => handleLinkClick(e, '/')} // Scroll to top and then navigate to main page
        >
          Main Page
        </Link>
      </motion.div>

      {/* Motion div for 'My Projects' Link */}
      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} // Slight delay
      >
        <Link
          to="/projects"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
          onClick={(e) => handleLinkClick(e, '/projects')} // Scroll to top and then navigate to projects
        >
          My Projects
        </Link>
      </motion.div>

      {/* Motion div for 'Contact' Link */}
      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }} // Slight delay
      >
        <Link
          to="/aboutme"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300"
          onClick={(e) => handleLinkClick(e, '/aboutme')} // Scroll to top and then navigate to contact page
        >
          Contact
        </Link>
      </motion.div>
    </div>
  );
}
