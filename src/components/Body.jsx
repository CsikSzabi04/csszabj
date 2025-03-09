import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Body() {
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

    return (
        <section className="relative h-screen flex flex-col lg:flex-row justify-center items-center text-center bg-cover bg-center border-b-8 border-blue-500"
            style={{ backgroundImage: "url('/background.jpg')" }}>

            {/* Dark overlay for contrast */}
            <motion.div
                className="absolute inset-0 bg-black opacity-40 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 2 }}
            ></motion.div>

            {/* Left side: Text Section */}
            <motion.div
                className="relative z-10 lg:w-1/2 px-4 py-10"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: scrollingDown ? 0 : 1, x: scrollingDown ? -200 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: scrollingDown ? 0 : 1, y: scrollingDown ? -50 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Csík Szabolcs' Portfolio
                </motion.h1>

                <motion.p
                    className="mt-4 text-lg max-w-xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: scrollingDown ? 0 : 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {/* Optional text */}
                </motion.p>

                <div className="mt-8">
                    <Link to="/projects">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-110 transform transition duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 1, x: 0 }}
                            animate={{ opacity: scrollingDown ? 0 : 1, x: scrollingDown ? 200 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            View Projects
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

        </section>
    );
}
