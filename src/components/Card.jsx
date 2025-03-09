import React, { useState } from 'react';
import './Card.css';

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('overlay')) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <section className="header-section" onClick={handleCardClick}>
        <h1 className="text-5xl font-bold uppercase text-gray-800 pb-5">Szabolcs A. Csík</h1>
        <p className="text-xl mt-2 font-semibold text-gray-500">Programmer / Software Developer / Tester</p>
        <p className="text-lg mt-2">
          <a href="https://kkando.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">
            Kandó Kálmán Technikum
          </a>{' '}
          &{' '}
          <a href="https://nje.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">
            Neumann University
          </a>
        </p>
        <p className="text-lg pb-5">Kecskemét, Hun</p>
        <p className="mt-4">
          Tel: <span className="text-gray-700">(+36) 70 242 2586</span>
        </p>
        <p>
          Email:{' '}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alexszabi04@gmail.com&su=Collaboration%20Opportunity%20%2F%20Egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20Lehet%C5%91s%C3%A9g&body=Dear%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0AI%20would%20like%20to%20discuss%20a%20collaboration%20opportunity%20with%20you.%0A%0ABest%20regards,%0A%0A%5BYour%20Name%5D%0A%0A---%0A%0AKedves%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0ASzeretn%C3%A9k%20egy%20egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20lehet%C5%91s%C3%A9gr%C5%91l%20besz%C3%A9lni%20veled.%0A%0A%C3%9Cdv%C3%B6zlettel,%0A%0A%5BNeved%5D"
            className="text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            alexszabi04@gmail.com
          </a>
        </p>
        <div className="pt-5">
          <a href="https://www.instagram.com/cs_szabj04/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram pr-4"></i>
          </a>
          <a href="mailto:alexszabi04@gmail.com">
            <i className="fa fa-envelope pr-4"></i>
          </a>
          <a href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </section>

      {/* Overlay for Enlarged Card */}
      {isOpen && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="enlarged-card">
            <section className="header-section">
              <h1 className="text-5xl font-bold uppercase text-gray-800 pb-5">Szabolcs A. Csík</h1>
              <p className="text-xl mt-2 font-semibold text-gray-500">Programmer / Software Developer / Tester</p>
              <p className="text-lg mt-2">
                <a href="https://kkando.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">
                  Kandó Kálmán Technikum
                </a>{' '}
                &{' '}
                <a href="https://nje.hu/" className="hover:text-stone-400" target="_blank" rel="noopener noreferrer">
                  Neumann University
                </a>
              </p>
              <p className="text-lg pb-5">Kecskemét, Hun</p>
              <p className="mt-4">
                Tel: <span className="text-gray-700">(+36) 70 242 2586</span>
              </p>
              <p>
                Email:{' '}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=alexszabi04@gmail.com&su=Collaboration%20Opportunity%20%2F%20Egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20Lehet%C5%91s%C3%A9g&body=Dear%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0AI%20would%20like%20to%20discuss%20a%20collaboration%20opportunity%20with%20you.%0A%0ABest%20regards,%0A%0A%5BYour%20Name%5D%0A%0A---%0A%0AKedves%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0ASzeretn%C3%A9k%20egy%20egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20lehet%C5%91s%C3%A9gr%C5%91l%20besz%C3%A9lni%20veled.%0A%0A%C3%9Cdv%C3%B6zlettel,%0A%0A%5BNeved%5D"
                  className="text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  alexszabi04@gmail.com
                </a>
              </p>
              <div className="pt-5">
                <a href="https://www.instagram.com/cs_szabj04/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram pr-4"></i>
                </a>
                <a href="mailto:alexszabi04@gmail.com">
                  <i className="fa fa-envelope pr-4"></i>
                </a>
                <a href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
