import React, { useState } from 'react';
import './Info.css';

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

  // Enhanced responsive values
  const responsiveCardStyle = {
    card: {
      base: "w-[90vw] max-w-[95vw] xs:w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] xl:w-[700px]",
      padding: "p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6",
      minHeight: "min-h-[300px] xs:min-h-[320px] sm:min-h-[360px] md:min-h-[400px]"
    },
    text: {
      name: "text-[3.2vw] xs:text-[4vw] sm:text-[3.5vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[45px] bold",
      title: "text-[3.2vw] xs:text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.6vw] xl:text-[28px] font-semibold",
      info: "text-[2.8vw] xs:text-[2.6vw] sm:text-[2.2vw] md:text-[1.8vw] lg:text-[1.4vw] xl:text-[22px] ",
      contact: "text-[2.6vw] xs:text-[2.4vw] sm:text-[2vw] md:text-[1.6vw] lg:text-[1.3vw] xl:text-[20px] "
    }
  };

  const cards = [
    {
      id: 1,
      content: (
        <div className={`header-section text-center bg-white border-2 border-gray-300 shadow-md ${responsiveCardStyle.card.base} ${responsiveCardStyle.card.padding} ${responsiveCardStyle.card.minHeight}`}>
          <span className={`font-bold uppercase text-gray-800 pb-0 xs:pb-1 sm:pb-2 md:pb-3 ${responsiveCardStyle.text.name}`}>
            Szabolcs A. Csík
          </span>
          <p className={`mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 font-semibold text-gray-500 ${responsiveCardStyle.text.title}`}>
            Programmer / Software Developer / Tester
          </p>
          <p className={`mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 ${responsiveCardStyle.text.info}`}>
            <a href="https://kkando.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">
              Kandó Kálmán Technikum
            </a> & 
            <a className="hover:text-stone-400 ml-0.5 xs:ml-1" href="https://nje.hu/" target="_blank" rel="noopener noreferrer">
              Neumann University
            </a>
          </p>
          <p className={`pb-1 xs:pb-2 sm:pb-3 ${responsiveCardStyle.text.info}`}>
            Kecskemét, Hun
          </p>
          <p className={`mt-1 xs:mt-2 sm:mt-3 ${responsiveCardStyle.text.contact}`}>
            Tel: <span className="text-gray-700">(+36) 70 242 2586</span>
          </p>
          <p className={`${responsiveCardStyle.text.contact}`}>
            Email: <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alexszabi04@gmail.com"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 break-all xs:break-normal"
            >
              alexszabi04@gmail.com
            </a>
          </p>
          <div className="flex justify-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-5 fade-in delay-500 mt-2 xs:mt-3 sm:mt-4 md:mt-5">
            <a href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition text-[3.8vw] xs:text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[24px]">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/CsikSzabi04" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition text-[3.8vw] xs:text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[24px]">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:alexszabi04@gmail.com"
              className="text-gray-400 hover:text-red-400 transition text-[3.8vw] xs:text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[24px]">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/cs_szabj04/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition text-[3.8vw] xs:text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[24px]">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <section id="contact" className="section h-screen w-screen flex-shrink-0">
        <div className="asd container mx-auto px-3 xs:px-4 sm:px-5 md:px-6 text-center h-full flex items-center justify-center">
          <div className="w-full">
           
            <div className="max-w-4xl mx-auto fade-in delay-100 px-2 sm:px-0 mt-[5%] lg:mt-0">
              <p className="text-gray-400 text-[3.2vw] xs:text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.6vw] xl:text-[18px] mb-[3vw] xs:mb-[2.5vw] sm:mb-[2vw] md:mb-[1.5vw] lg:mb-[1vw] xl:mb-6">
               {/**
                Have a project in mind or want to discuss potential opportunities?
                Feel free to reach out - I'm always open to new collaborations and ideas.
                */} 
              </p>

              <div className="flex flex-col items-center space-y-[2.5vw] xs:space-y-[2vw] sm:space-y-[1.5vw] md:space-y-[1vw] lg:space-y-[0.8vw] xl:space-y-4">
                {cards.map((card) => (
                  <div 
                    key={card.id}
                    className="fade-in cursor-pointer w-full flex justify-center"
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

      <footer className="h-screen w-screen flex-shrink-0 py-3 xs:py-4 sm:py-5 md:py-6 bg-gray-900 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-[2.4vw] xs:text-[2.2vw] sm:text-[1.8vw] md:text-[1.4vw] lg:text-[1.1vw] xl:text-[14px]">
            Alexander Szabolcs Csík.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Info;