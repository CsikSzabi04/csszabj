import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
    return (
        <section className="py-16 bg-gray-900 text-white border-t-8 border-blue-500 p-20 relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center border-b-8 border-blue-500">
            <h2 className="text-4xl font-bold text-center mb-12 ">Latest Projects</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center ">
                
                {/* Project 1 */}
                <motion.div
                    className="bg-gray-800 p-8 rounded-3xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl hover:border-teal-500 border-4 border-teal-500"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="w-full h-64 overflow-hidden rounded-xl mb-4">
                        <img src="./main.png" alt="GameDataHub" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">
                        <a href="https://gamedatahub.netlify.app/" target='_blank' rel="noopener noreferrer">GameDataHub</a>
                    </h3>
                </motion.div>

                {/* Project 2 */}
                <motion.div
                    className="bg-gray-800 p-8 rounded-3xl shadow-lg border-4 border-teal-500"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <div className="w-full h-64 overflow-hidden rounded-xl mb-4">
                        <img src="./p2.png" alt="My Business Card" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">
                        <a href="https://mbusinesscard.netlify.app/" target='_blank' rel="noopener noreferrer">My Business Card</a>
                    </h3>
                </motion.div>
                
            </div>
        </section>
    );
}
