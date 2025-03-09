import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="py-6 bg-black text-center text-white border-t-4 border-blue-500">
            <motion.div
                className="flex justify-center space-x-8 mb-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <a
                    href="https://github.com/CsikSzabi04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-teal-500"
                >
                    <FaGithub size={24} color="white" />
                </a>

                <a
                    href="https://www.linkedin.com/in/szabolcs-cs%C3%ADk-a4b767315/"
                    target="_blank"
                    className="text-xl hover:text-teal-500"
                >
                    <i className="fa fa-linkedin text-xl"></i>
                </a>

                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=alexszabi04@gmail.com&su=Collaboration%20Opportunity%20%2F%20Egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20Lehet%C5%91s%C3%A9g&body=Dear%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0AI%20would%20like%20to%20discuss%20a%20collaboration%20opportunity%20with%20you.%0A%0ABest%20regards,%0A%0A%5BYour%20Name%5D%0A%0A---%0A%0AKedves%20Cs%C3%ADk%20Szabolcs%20Alex,%0A%0ASzeretn%C3%A9k%20egy%20egy%C3%BCttm%C5%B1k%C3%B6d%C3%A9si%20lehet%C5%91s%C3%A9gr%C5%91l%20besz%C3%A9lni%20veled.%0A%0A%C3%9Cdv%C3%B6zlettel,%0A%0A%5BNeved%5D"
                    target="_blank"
                    className="text-xl hover:text-teal-500"
                >
                    <i className="fa fa-envelope text-xl pr-4"></i>
                </a>

                <a
                    href="https://www.instagram.com/cs_szabj04/"
                    target="_blank"
                    className="text-xl hover:text-teal-500"
                >
                    <i className="fa fa-instagram text-xl pr-4"></i>
                </a>
            </motion.div>

            <motion.p
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                © 2024 Csík Szabolcs.
            </motion.p>
        </footer>
    );
}
