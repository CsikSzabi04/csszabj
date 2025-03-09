import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Contact from './components/Contact';
import Links from './components/Links';
import Portfolio from './components/Portfolio';
import "./App.css"
import SlideShow from './components/SlideShow';
import AboutSection from './components/AboutSection';

function App() {
  return (
    <Router>
      <div className="font-sans antialiased bg-gradient-to-b from-indigo-800 to-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Links />
        <AboutSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
