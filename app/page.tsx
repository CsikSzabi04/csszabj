"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

type View = "home" | "skills" | "about" | "webshop";

// iOS-style Back Button Component - Star Wars themed - Lightsaber colors
function IOSBackButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-20 left-4 z-50 group mt-8"
    >
      <div className="flex items-center gap-1 px-3 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-[#9b59b6]/30 shadow-[0_0_20px_rgba(155,89,182,0.2)] hover:bg-black/60 hover:border-[#ff2d2d]/50 hover:shadow-[0_0_30px_rgba(255,45,45,0.3)] transition-all duration-300">
        <svg 
          className="w-4 h-4 text-[#9b59b6] group-hover:text-[#ff2d2d] group-hover:-translate-x-0.5 transition-all duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        {label && (
          <span className="text-[#e4e4e7] text-xs font-medium pr-1 group-hover:text-[#ff2d2d] transition-colors duration-300">{label}</span>
        )}
      </div>
    </button>
  );
}

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  // Function to render hero with navigation callbacks
  const renderHero = (onNavigate: (view: View) => void) => (
    <Hero 
      onSkillsClick={() => onNavigate("skills")} 
      onAboutClick={() => onNavigate("about")} 
    />
  );

  return (
    <>
      <Header onStoreClick={() => setCurrentView("webshop")} />
      
      <main className="main-content">
        {/* HOME VIEW - Just Hero */}
        {currentView === "home" && (
          <>
            {renderHero(setCurrentView)}
            
            {/* Quick preview sections below Hero for home */}
            <div className="py-20">
              <div className="text-center mb-16">
                <p className="text-zinc-500 mb-8">Fedezd fel a weboldalt</p>
              </div>
            </div>
          </>
        )}
        
        {/* SKILLS VIEW - Skills + Blog */}
        {currentView === "skills" && (
          <>
            {/* Anchor for scroll */}
            <div id="skills-anchor" />
            
            {/* iOS-style Back to Home Button */}
            <IOSBackButton onClick={() => setCurrentView("home")} />

            {/* Skills Section */}
            <section className="mt-24">
              <Skills />
            </section>
            
            {/* Blog Section */}
            <section className="mt-16 md:mt-24">
              <Blog />
            </section>


          </>
        )}
        
        {/* ABOUT VIEW - Experience + Blog */}
        {currentView === "about" && (
          <>
            {/* iOS-style Back to Home Button */}
            <IOSBackButton onClick={() => setCurrentView("home")} />

            {/* About Section */}
            <section className="mt-24">
              <About />
            </section>
            
            {/* Experience Section */}
            <section className="mt-16 md:mt-24">
              <Experience />
            </section>
            
            {/* Blog Section */}
            <section className="mt-16 md:mt-24">
              <Blog />
            </section>
          </>
        )}
        
        {/* WEBSHOP VIEW - Remaining sections */}
        {currentView === "webshop" && (
          <>
            {/* Scroll to services section */}
            <div id="services" className="absolute -top-32" />
            
            {/* iOS-style Back to Previous Button */}
            <IOSBackButton onClick={() => {
              setCurrentView("skills");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />

            {/* Services Section */}
            <section className="mt-24">
              <Services />
            </section>
            
            {/* Projects Section */}
            <section className="mt-16 md:mt-24">
              <Projects />
            </section>
            
            {/* Testimonials Section */}
            <section className="mt-16 md:mt-24">
              <Testimonials />
            </section>
            
            {/* FAQ Section */}
            <section className="mt-16 md:mt-24">
              <FAQ />
            </section>
            
            {/* Contact Section */}
            <section className="mt-16 md:mt-24">
              <Contact />
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}
