"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, AlertTriangle } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { useLanguage } from "../contexts/LanguageContext";

type FormFields = { name: string; email: string; subject: string; message: string };
type SubmitStatus = { type: "success" } | { type: "error"; message: string; offerEmail: boolean } | null;

const EMPTY_FORM: FormFields = { name: "", email: "", subject: "", message: "" };
const SUBJECTS = ["project", "job", "freelance", "other"];
const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBMIT_TIMEOUT_MS = 15_000;

function validate(fields: FormFields, en: boolean): string | null {
  if (fields.name.length < 2 || fields.name.length > LIMITS.name) {
    return en ? "Please enter your name." : "Kérlek add meg a neved.";
  }
  if (fields.email.length > LIMITS.email || !EMAIL_PATTERN.test(fields.email)) {
    return en ? "Please enter a valid email address." : "Kérlek adj meg egy érvényes email címet.";
  }
  if (!SUBJECTS.includes(fields.subject)) {
    return en ? "Please choose a subject." : "Kérlek válassz tárgyat.";
  }
  if (fields.message.length < 10 || fields.message.length > LIMITS.message) {
    return en ? "The message must be between 10 and 5000 characters." : "Az üzenet 10 és 5000 karakter között legyen.";
  }
  return null;
}

export default function Contact() {
  const { language } = useLanguage();
  const en = language === "en";

  const [formData, setFormData] = useState<FormFields>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const subjectLabels: Record<string, string> = {
    project: en ? "Project collaboration" : "Projekt együttműködés",
    job: en ? "Job offer" : "Állásajánlat",
    freelance: en ? "Freelance work" : "Freelance munka",
    other: en ? "Other" : "Egyéb",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fields: FormFields = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    };

    const validationError = validate(fields, en);
    if (validationError) {
      setSubmitStatus({ type: "error", message: validationError, offerEmail: false });
      return;
    }

    // Bots fill the hidden honeypot field: pretend success and silently drop the submission.
    if (honeypotRef.current?.value) {
      setSubmitStatus({ type: "success" });
      setFormData(EMPTY_FORM);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Netlify Forms (spam filtering included); the form is registered via public/__forms.html.
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...fields }).toString(),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSubmitStatus({ type: "success" });
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitStatus({
        type: "error",
        message: en
          ? "The message could not be sent. Please try again or email me directly."
          : "Az üzenetet nem sikerült elküldeni. Próbáld újra, vagy írj közvetlenül emailt.",
        offerEmail: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailtoHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subjectLabels[formData.subject] ?? (en ? "Message" : "Üzenet"))}&body=${encodeURIComponent(formData.message.slice(0, 1500))}`;

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: en ? "Phone" : "Telefon",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: en ? "Location" : "Helyszín",
      value: personalInfo.location,
      href: undefined as string | undefined,
    },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#9b59b6] focus:ring-1 focus:ring-[#9b59b6]/40 outline-none transition-colors text-white placeholder-gray-600";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <section id="contact" className="relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9b59b6]/5 rounded-full blur-[140px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#9b59b6]/10 border border-[#9b59b6]/20 rounded-full text-[#9b59b6] text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-[#9b59b6] rounded-full animate-pulse" />
            {en ? "Contact" : "Kapcsolat"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {en ? "Let's get in " : "Lépjünk "}
            <span className="text-[#9b59b6] drop-shadow-[0_0_15px_rgba(155,89,182,0.4)]">
              {en ? "touch" : "kapcsolatba"}
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            {en
              ? "Have a question or a project in mind? Send a message and I'll get back to you soon."
              : "Van egy kérdésed vagy egy projekted? Írj nekem, és hamarosan válaszolok."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-[#9b59b6]/20 transition-colors">
              <h3 className="text-lg font-bold text-white mb-6">
                {en ? "Contact information" : "Kapcsolati információk"}
              </h3>

              <div className="space-y-1">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#9b59b6]/10 border border-[#9b59b6]/20 flex items-center justify-center text-[#9b59b6] group-hover:bg-[#9b59b6]/20 transition-colors">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                        <p className="text-white font-medium truncate group-hover:text-[#9b59b6] transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href} className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors group">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="flex items-center gap-4 p-3 -mx-3 rounded-2xl group">
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-3">{en ? "Find me online" : "Találj meg online"}</p>
                <div className="flex gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#9b59b6]/20 hover:border-[#9b59b6]/30 transition-all border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#9b59b6]/20 hover:border-[#9b59b6]/30 transition-all border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <span className="relative flex h-3 w-3 flex-shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
              </span>
              <div>
                <h4 className="font-semibold text-white text-sm">{en ? "Available for work" : "Elérhető vagyok"}</h4>
                <p className="text-sm text-gray-500">{en ? "Open to new opportunities" : "Nyitott vagyok új lehetőségekre"}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-[#0a0a0f] border border-white/5 rounded-3xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6">{en ? "Send a message" : "Üzenet küldése"}</h3>

            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Honeypot: invisible to people, tempting for bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label>
                  Ne töltsd ki
                  <input ref={honeypotRef} type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>{en ? "Name" : "Név"}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={LIMITS.name}
                    autoComplete="name"
                    className={inputClass}
                    placeholder={en ? "Full name" : "Teljes név"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={LIMITS.email}
                    autoComplete="email"
                    className={inputClass}
                    placeholder={en ? "email@address.com" : "email@cim.hu"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>{en ? "Subject" : "Tárgy"}</label>
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass}>
                  <option value="" className="bg-[#0a0a0f]">{en ? "Select a subject" : "Válassz tárgyat"}</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject} className="bg-[#0a0a0f]">
                      {subjectLabels[subject]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>{en ? "Message" : "Üzenet"}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={LIMITS.message}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder={en ? "Write your message..." : "Írd le az üzeneted..."}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-gradient-to-r from-[#9b59b6] to-[#6c5ce7] text-white rounded-xl font-semibold transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(155,89,182,0.25)] hover:shadow-[0_0_30px_rgba(155,89,182,0.45)]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{en ? "Sending..." : "Küldés..."}</span>
                  </>
                ) : (
                  <>
                    <span>{en ? "Send message" : "Üzenet küldése"}</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </motion.button>

              {submitStatus?.type === "success" && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"
                >
                  <Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">
                    {en ? "Thank you for your message! I'll reply soon." : "Köszönöm az üzeneted! Hamarosan válaszolok."}
                  </span>
                </motion.div>
              )}

              {submitStatus?.type === "error" && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 text-red-300 bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-sm">
                    <p>{submitStatus.message}</p>
                    {submitStatus.offerEmail && (
                      <a href={mailtoHref} className="mt-2 inline-block font-semibold text-white underline underline-offset-4 hover:text-[#c9a3dd]">
                        {en ? "Send as email instead" : "Küldés emailben"}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
