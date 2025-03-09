import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Links() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const navigate = useNavigate();  // Hook to navigate to different routes
  let lastScrollY = 0;

  // Handle scroll event to detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
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
      navigate(link);  // Use React Router's navigate to change routes without full page reload
    }, 700); // Delay to wait for the scroll effect to complete
  };

  return (
    <div className="relative p-20 m-30 flex flex-col justify-center items-center text-center bg-cover bg-center border-b-8">
      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Link
          to="/"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
          onClick={(e) => handleLinkClick(e, '/')}
        >
          Main Page
        </Link>
      </motion.div>

      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <Link
          to="/projects"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300 mb-6"
          onClick={(e) => handleLinkClick(e, '/projects')}
        >
          My Projects
        </Link>
      </motion.div>

      <motion.div
        className="p-4 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <Link
          to="/aboutme"
          className="text-4xl font-bold text-gray-500 hover:text-teal-500 transition-all duration-300"
          onClick={(e) => handleLinkClick(e, '/aboutme')}
        >
          Contact
        </Link>
      </motion.div>
    </div>
  );
}
