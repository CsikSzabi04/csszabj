import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    const [scrollingDown, setScrollingDown] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [showSection, setShowSection] = useState(false);
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

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Slideshow logic
    useEffect(() => {
        const slides = document.getElementsByClassName('slide');
        setTotalSlides(slides.length);

        const interval = setInterval(() => {
            const slidesContainer = document.querySelector('.slides');
            slidesContainer.style.transition = 'transform 1s ease-in-out';
            slidesContainer.style.transform = `translateX(-${(slideIndex * 100)}%)`;

            // Update the active, side, and hidden classes for each slide
            for (let i = 0; i < totalSlides; i++) {
                slides[i].classList.remove('active', 'side', 'hidden');
                if (i === (slideIndex + totalSlides - 1) % totalSlides) {
                    slides[i].classList.add('side');
                } else if (i === (slideIndex + 1) % totalSlides) {
                    slides[i].classList.add('side');
                } else if (i === slideIndex) {
                    slides[i].classList.add('active');
                } else {
                    slides[i].classList.add('hidden');
                }
            }

            setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [slideIndex, totalSlides]);

    const handleScrollVisibility = () => {
        const section = document.getElementById('about');
        const sectionPosition = section.getBoundingClientRect().top;
        if (sectionPosition <= window.innerHeight / 1.5) {
            setShowSection(true);
        } else {
            setShowSection(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollVisibility);
        return () => window.removeEventListener('scroll', handleScrollVisibility);
    }, []);

    // Styles for smooth transition
    const sectionVisibility = showSection ? 'opacity-100' : 'opacity-0';
    const textAnimation = {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : -100 },
        transition: { duration: 0.5 },
    };
    const imageAnimation = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: scrollingDown ? 1 : 0, x: scrollingDown ? 0 : 100 },
        transition: { duration: 0.5 },
    };

    return (
        <section
            id="about"
            className={`transition-all bg-gray-900 text-white py-20 px-8 sm:px-12 md:px-16 lg:px-32 overflow-hidden ${sectionVisibility}`}
            style={{ scrollBehavior: 'smooth' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Skills Section */}
                    <motion.div
                        className="lg:w-1/2 text-left px-4 lg:px-10 py-10"
                        {...textAnimation}
                    >
                        <h3 className="text-4xl font-bold text-white mb-4">&#9824; Skills</h3>
                        <p className="text-lg mb-6">I'm a Software Developer and Tester</p>

                        <h4 className="text-2xl font-semibold mb-3">Backend</h4>
                        <p className="mb-6 text-base">
                            I love problem-solving and building complex systems. I strive to create scalable, reliable, and secure solutions.
                        </p>

                        <h4 className="text-2xl font-semibold mb-3">Frontend & Design</h4>
                        <p className="mb-6 text-base">
                            I'm passionate about design, animation, and interactions, always aiming to build fun websites with great user experiences.
                            I have worked on web, mobile, and game development projects.
                        </p>

                        <h4 className="text-2xl font-semibold mb-3">Cloud & DevOps</h4>
                        <p className="text-base">
                            I have managed AWS, GCP, Github, and various other cloud services for multiple start-ups and my own projects.
                        </p>
                    </motion.div>

                    {/* Slideshow Section */}
                    <motion.div
                        className="lg:w-1/2 relative overflow-hidden px-4 py-10"
                        {...imageAnimation}
                    >
                        <div className="slideshow-container relative overflow-hidden">
                            <div className="slides flex transition-transform duration-1000 ease-in-out">
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="php.png"
                                        alt="PHP"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">PHP</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg"
                                        alt="React"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">React</div>
                                </div>
                                <div className="slide active image-container w-1/5 p-2">
                                    <img
                                        src="js.png"
                                        alt="JavaScript"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">JavaScript</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="node.png"
                                        alt="Node.js"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">Node.js</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="html.png"
                                        alt="HTML"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">HTML</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="git.png"
                                        alt="GitHub"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">GitHub</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="csharp.png"
                                        alt="C#"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">C#</div>
                                </div>
                                <div className="slide image-container w-1/5 p-2">
                                    <img
                                        src="css.png"
                                        alt="CSS"
                                        className="mx-auto w-48 h-48"
                                    />
                                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full opacity-0 hover:opacity-100 transition-opacity duration-300">CSS</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
