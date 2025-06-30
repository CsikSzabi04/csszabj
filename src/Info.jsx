import React, { useState } from 'react';
import './Info.css';
import backImage from './BusinessCard/back.png';
import insightImage from './BusinessCard/insight2.png';

const Info = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const openCard = (cardContent) => {
    setCurrentCard(cardContent);
    setShowOverlay(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCard = () => {
    setShowOverlay(false);
    document.body.style.overflow = 'auto';
  };

  const cards = [
    {
      id: 1,
      content: (
        <div className="header-section text-center w-full max-w-2xl bg-white border-2 border-gray-300 p-6 shadow-md h-[400px] min-w-[700px]">
          <h1 className="text-6xl font-bold uppercase text-gray-800 pb-5">Szabolcs A. Csík</h1>
          <p className="text-xl mt-2 font-semibold text-gray-500">Programmer / Software Developer / Tester</p>
          <p className="text-lg mt-2">
            <a href="https://kkando.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">Kandó Kálmán Technikum</a> &
            <a className="hover:text-stone-400" href="https://nje.hu/" target="_blank" rel="noopener noreferrer"> Neumann University</a>
          </p>
          <p className="text-lg pb-5">Kecskemét, Hun</p>
          <p className="mt-4">Tel: <span className="text-gray-700">(+36) 70 242 2586</span></p>
          <p>Email: <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alexszabi04@gmail.com&su=Collaboration%20Opportunity%20%2F%20Egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20Lehet%C5%91s%C3%A9g&body=Dear%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0AI%20would%20like%20to%20discuss%20a%20collaboration%20opportunity%20with%20you.%0A%0ABest%20regards,%0A%0A%5BYour%20Name%5D%0A%0A---%0A%0AKedves%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0ASzeretn%C3%A9k%20egy%20egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20lehet%C5%91s%C3%A9gr%C5%91l%20besz%C3%A9lni%20veled.%0A%0A%C3%9Cdv%C3%B6zlettel,%0A%0A%5BNeved%5D"
            target="_blank" rel="noopener noreferrer" className="text-gray-700">alexszabi04@gmail.com</a></p>
          <div className="flex justify-center space-x-6 fade-in delay-500 mt-5">
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
      )
    },  {/* Overlay 
    {
      id: 2,
      content: (
        <div className="header-section flex flex-col items-center justify-center text-center w-full max-w-2xl bg-white border-2 border-gray-300 p-6 shadow-md h-[340px]">
          <img src={insightImage} alt="Logo" className="mx-auto mb-4 w-[150px] h-[100px]" />
          <h1 className="text-4xl font-bold uppercase text-gray-800">I.N.S.I.G.H.T.</h1> <br />
          <p className="text-gray-700">Integrated Network for Surveillance, Investigation, Grid Hacking & Thought‑mapping</p>
        </div>
      )
    }*/}
  ];

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div className="overlay active" onClick={closeCard}>
          <div className="enlarged-card" onClick={e => e.stopPropagation()}>
            {currentCard}
          </div>
        </div>
      )}

      {/* Original Contact Section */}
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

              <div className="flex flex-col items-center space-y-10">
                {/* Cards */}
                {cards.map((card) => (
                  <div 
                    key={card.id}
                    className="fade-in cursor-pointer"
                    onClick={() => openCard(card.content)}
                  >
                    {card.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="h-screen w-screen flex-shrink-0 py-8 bg-gray-900 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            Alexander Szabolcs Csík.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Info;