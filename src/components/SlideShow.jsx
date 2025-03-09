import React, { useEffect, useState } from 'react';

export default function Slideshow() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    useEffect(() => {
        const slides = document.getElementsByClassName('slide');
        setTotalSlides(slides.length);

        // Function to manage the slide transition
        const showSlides = () => {
            const slidesContainer = document.querySelector('.slides');
            slidesContainer.style.transform = `translateX(-${(slideIndex * 120) / 2}%)`;

            for (let i = 0; i < totalSlides; i++) {
                slides[i].classList.remove('active');
                slides[i].classList.remove('side');
                slides[i].classList.remove('hidden');

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

            // Update the slideIndex to the next one
            setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        };

        // Start the slideshow on mount
        const interval = setInterval(showSlides, 2000); // Update every 2 seconds

        // Cleanup the interval when component unmounts
        return () => clearInterval(interval);
    }, [slideIndex, totalSlides]);

    return (
        <div className="slideshow-container relative overflow-hidden w-full mx-auto">
            <div className="slides flex transition-transform duration-1000 ease-in-out">
                {/* Each slide container has smaller image sizes */}
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="html.png" alt="Html" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        Html
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="css.png" alt="Css" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        Css
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="js.png" alt="JavaScript" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        JS
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="node.png" alt="NodeJs" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        NodeJs
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="php.png" alt="Php" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        Php
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="giticon.png" alt="GitHub" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        GitHub
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="c++.png" alt="C++" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        C++
                    </div>
                </div>
                <div className="slide image-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <img src="csharp.svg" alt="C#" className="mx-auto w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5" />
                    <div className="hover-text absolute bottom-0 left-0 bg-opacity-60 bg-black text-white p-2 text-center w-full">
                        C#
                    </div>
                </div>
            </div>
        </div>
    );
}
