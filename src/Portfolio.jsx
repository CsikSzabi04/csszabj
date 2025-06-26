import React, { useState, useEffect, useRef } from 'react';
import "./Portfolio.css"
import Mains from './Mains.jsx';
import AboutMe from './AboutMe.jsx';
import MyWork from './MyWork.jsx';
import Info from './Info.jsx';

const Portfolio = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const scrollStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastPosRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const sectionsRef = useRef([]);
  const touchStartYRef = useRef(0);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDownloadCV = () => {
    window.open('CV.png', '_blank');
  };

    const handleDownloadM = () => {
    window.open('motivacioslevelPDF.pdf', '_blank');
  };

  const smoothScrollTo = (targetPos) => {
    if (isAnimatingRef.current) return;
    if (!scrollContainerRef.current) return;

    const startPos = scrollContainerRef.current.scrollTop;
    const distance = targetPos - startPos;
    const duration = Math.min(400, Math.max(200, Math.abs(distance) * 0.9));
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = easeInOutCubic(progress);
      const newPos = startPos + (distance * easeProgress);

      scrollContainerRef.current.scrollTop = newPos;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        isAnimatingRef.current = false;
      }
    };

    isAnimatingRef.current = true;
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const handleWheel = (e) => {
    if (isMobile) return; // Disable wheel scrolling on mobile

    e.preventDefault();

    if (isAnimatingRef.current) return;

    const delta = Math.sign(e.deltaY);
    const currentSectionIndex = getCurrentSectionIndex();
    let targetSectionIndex = currentSectionIndex + delta;

    targetSectionIndex = Math.max(0, Math.min(sectionsRef.current.length - 1, targetSectionIndex));

    if (targetSectionIndex !== currentSectionIndex) {
      const targetSection = sectionsRef.current[targetSectionIndex];
      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop);
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
    scrollStartRef.current = scrollContainerRef.current.scrollTop;
    lastPosRef.current = e.touches[0].clientY;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    cancelAnimationFrame(animationFrameRef.current);
    isAnimatingRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;

    e.preventDefault();
    const currentPos = e.touches[0].clientY;
    const currentTime = Date.now();
    const deltaPos = lastPosRef.current - currentPos;
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime > 0) {
      velocityRef.current = deltaPos / deltaTime;
      scrollContainerRef.current.scrollTop = scrollStartRef.current + deltaPos;
    }

    lastPosRef.current = currentPos;
    lastTimeRef.current = currentTime;
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchDistance = Math.abs(touchEndY - touchStartYRef.current);
    const currentScroll = scrollContainerRef.current.scrollTop;

    // Only snap if the swipe was significant enough
    if (touchDistance > 50 || Math.abs(velocityRef.current) > 0.5) {
      const momentumDistance = velocityRef.current * 400;
      const targetPos = currentScroll + momentumDistance;
      snapToNearestSection(targetPos, Math.abs(velocityRef.current));
    }
  };

  const snapToNearestSection = (scrollPos, velocity = 0) => {
    let closestSection = null;
    let closestDistance = Infinity;
    let closestIndex = 0;

    sectionsRef.current.forEach((section, index) => {
      const distance = Math.abs(section.offsetTop - scrollPos);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
        closestIndex = index;
      }
    });

    // Only snap to next section if velocity is high enough
    if (velocity > 1.5 && closestIndex < sectionsRef.current.length - 1) {
      closestSection = sectionsRef.current[closestIndex + 2];
    } else if (velocity < -1.5 && closestIndex > 0) {
      closestSection = sectionsRef.current[closestIndex - 2];
    }

    if (closestSection) {
      smoothScrollTo(closestSection.offsetTop);
    }
  };

  const getCurrentSectionIndex = () => {
    const scrollPos = scrollContainerRef.current?.scrollTop || 0;
    for (let i = 0; i < sectionsRef.current.length; i++) {
      if (sectionsRef.current[i].offsetTop >= scrollPos) {
        return Math.max(0, i - (scrollPos > sectionsRef.current[i].offsetTop - window.innerHeight / 2 ? 0 : 1));
      }
    }
    return 0;
  };

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll('.section'));

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (!isMobile) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
      scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Fade-in animation observer stays
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100);
        }
      });
    }, { threshold: 0.4 });

    fadeElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      if (!isMobile) {
        scrollContainer.removeEventListener('wheel', handleWheel);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchmove', handleTouchMove);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameRef.current);
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [isMobile]);


  return (
    <div className="text-gray-100 font-sans antialiased">
      <header className="fixed w-full z-50 bg-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="02.png" alt="Logo" className="h-10 w-10 mr-3" />
              <span className="text-xl font-bold">Szabolcs Csík</span>
            </div>

            <nav className="hidden md:flex space-x-6 ">
              <a href="#home" className="nav-link text-gray-300 hover:text-white transition">Home</a>
              <a href="#portfolio" className="nav-link text-gray-300 hover:text-white transition">Portfolio</a>
              <a href="https://www.wattpad.com/user/thejasonronin04" target="_blank" rel="noopener noreferrer"
                className="nav-link text-gray-300 hover:text-white transition">My Books</a>
              <a href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb" target="_blank" rel="noopener noreferrer"
                className="nav-link text-gray-300 hover:text-white transition">My Songs</a>
            </nav>

            <button
              id="mobile-menu-button"
              className="md:hidden text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`md:hidden  absolute top-16 left-0 right-0 bg-gradient-to-r from-gray-700 to-zinc-800/80 bg-opacity-50 p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
          >
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

      <div className="scroll-container pt-16" ref={scrollContainerRef}>
        <div className="flex flex-col">
          <Mains />
          <AboutMe handleDownloadCV={handleDownloadCV} handleDownloadM={handleDownloadM}/>
          <MyWork />
          <Info />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;