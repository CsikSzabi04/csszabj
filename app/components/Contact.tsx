"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#ff2d2d]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#9b59b6]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - Star Wars Style */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9b59b6]/10 border border-[#9b59b6]/30 rounded-full text-[#9b59b6] text-sm font-mono mb-6">
              <span className="w-2 h-2 bg-[#9b59b6] rounded-full animate-pulse shadow-[0_0_10px_#9b59b6]"></span>
              Kapcsolat
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Lépj Velem <span className="text-[#ff2d2d]">Kapcsolatba</span>!
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-mono px-4">
              // Ha bármilyen kérdésed van, vagy együtt szeretnél dolgozni, ne habozz megkeresni!
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info - Star Wars Style */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black/80 rounded-2xl p-6 sm:p-8 border border-[#ff2d2d]/20 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ff2d2d] rounded-full shadow-[0_0_15px_#ff2d2d]"></span>
                Kapcsolati Információk
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#ff2d2d]/10 rounded-xl flex items-center justify-center border border-[#ff2d2d]/30 group-hover:bg-[#ff2d2d]/20 transition-all">
                    <svg className="w-6 h-6 text-[#ff2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Email</p>
                    <p className="font-semibold text-white group-hover:text-[#ff2d2d] transition-colors">{personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#ff2d2d]/10 rounded-xl flex items-center justify-center border border-[#ff2d2d]/30 group-hover:bg-[#ff2d2d]/20 transition-all">
                    <svg className="w-6 h-6 text-[#ff2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Telefon</p>
                    <p className="font-semibold text-white group-hover:text-[#ff2d2d] transition-colors">{personalInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#ff2d2d]/10 rounded-xl flex items-center justify-center border border-[#ff2d2d]/30 group-hover:bg-[#ff2d2d]/20 transition-all">
                    <svg className="w-6 h-6 text-[#ff2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-mono">Helyszín</p>
                    <p className="font-semibold text-white group-hover:text-[#ff2d2d] transition-colors">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links - Star Wars Style */}
              <div className="mt-8 pt-6 border-t border-[#ff2d2d]/20">
                <p className="text-sm text-gray-500 mb-4 font-mono">// Kövess:</p>
                <div className="flex gap-4">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#ff2d2d]/10 rounded-lg flex items-center justify-center hover:bg-[#ff2d2d]/30 transition-all border border-[#ff2d2d]/30 hover:shadow-[0_0_20px_rgba(255,45,45,0.4)]"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#9b59b6]/10 rounded-lg flex items-center justify-center hover:bg-[#9b59b6]/30 transition-all border border-[#9b59b6]/30 hover:shadow-[0_0_20px_rgba(155,89,182,0.4)]"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Availability Card - Star Wars Style */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/80 rounded-2xl p-6 border border-[#00ff41]/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00ff41]/10 rounded-xl flex items-center justify-center border border-[#00ff41]/30">
                  <span className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_10px_#00ff41]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Elérhető vagyok</h4>
                  <p className="text-sm text-gray-500 font-mono">// Azonnali munkakezdés lehetséges</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form - Star Wars Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-black/80 rounded-2xl p-6 sm:p-8 border border-[#9b59b6]/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#9b59b6] rounded-full shadow-[0_0_15px_#9b59b6]"></span>
              Üzenet Küldése
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-[#9b59b6]">const</span> name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#9b59b6]/20 focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20 outline-none transition-all text-white placeholder-gray-600 font-mono"
                    placeholder="Teljes név"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    <span className="text-[#9b59b6]">const</span> email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#9b59b6]/20 focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20 outline-none transition-all text-white placeholder-gray-600 font-mono"
                    placeholder="email@cim.hu"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                  <span className="text-[#9b59b6]">const</span> subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#9b59b6]/20 focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20 outline-none transition-all text-white font-mono"
                >
                  <option value="" className="bg-black">Válassz tárgyat</option>
                  <option value="project" className="bg-black">Projekt együttműködés</option>
                  <option value="job" className="bg-black">Állásajánlat</option>
                  <option value="freelance" className="bg-black">Freelance munka</option>
                  <option value="other" className="bg-black">Egyéb</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                  <span className="text-[#9b59b6]">const</span> message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[#9b59b6]/20 focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20 outline-none transition-all resize-none text-white placeholder-gray-600 font-mono"
                  placeholder="// Írd le a kérdésed vagy üzeneted..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#ff2d2d] to-[#9b59b6] text-white rounded-xl font-semibold hover:from-[#ff2d2d]/90 hover:to-[#9b59b6]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,45,45,0.3)] hover:shadow-[0_0_30px_rgba(255,45,45,0.5)]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Küldés...</span>
                  </>
                ) : (
                  <>
                    <span>Üzenet Küldése</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#00ff41] bg-[#00ff41]/10 p-4 rounded-xl border border-[#00ff41]/30 font-mono"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>// Köszönöm az üzeneted! Hamarosan válaszolok.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
