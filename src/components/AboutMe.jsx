import React from 'react';

export default function AboutMe() {
    return (
        <>
            <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center border-b-8 border-blue-500">
                <div className="max-w-3xl mx-auto bg-gray-900 p-10 rounded-2xl shadow-xl border-4 border-teal-500">
                    <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
                    <p className="text-lg leading-relaxed">
                        Hi, I'm Csík Szabolcs, a passionate web developer committed to creating innovative, user-friendly applications. I specialize in full-stack development, with a focus on front-end technologies like React, TailwindCSS, and Node.js. I love working on projects that challenge me and help me grow as a developer.
                    </p>
                </div>
            </section>
        
        </>
    );
}
