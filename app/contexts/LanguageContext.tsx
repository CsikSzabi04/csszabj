"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "hu" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const dictionary = {
  hu: {
    // Navigáció
    "nav.about": "Rólam",
    "nav.projects": "Projektek",
    "nav.blog": "Blog",
    "nav.contact": "Kapcsolat",
    "nav.tools": "Eszközök",

    // Hero sekció
    "hero.greeting": "Üdv, Szabolcs Alex vagyok",
    "hero.role": "Full Stack Fejlesztő",
    "hero.description": "Olyan webes alkalmazásokat építek, amik túlmutatnak a megszokott dizájnon. Minden pixel és kódsor a prémium felhasználói élményt és a lenyűgöző sebességet szolgálja.",
    "hero.contactBtn": "Kapcsolatfelvétel",
    "hero.projectsBtn": "Munkáim",
    
    // About
    "about.title": "Rólam",
    "about.desc1": "A programozás nem csak a munkám, hanem a szenvedélyem. Mindig is lenyűgözött, hogyan lehet pár sor kóddal olyan rendszereket építeni, ami több ezer ember problémáit oldja meg.",
    "about.experience": "Évek tapasztalatával a webfejlesztés minden szintjén otthonosan mozgok. Legyen szó egy villámgyors frontendről Next.js segítségével, vagy egy skálázható mikroszolgáltatás architektúráról Node.js és Go alapokon.",

    // Projects
    "projects.title": "Legjobb Projektjeim",
    "projects.desc": "Számos érdekes kihívással teli projekten dolgoztam az elmúlt években. Íme néhány kiemelt munka, amire a legbüszkébb vagyok.",
    "projects.seeAll": "Összes projekt",
    
    // Blog
    "blog.badge": "Blog",
    "blog.title": "Legújabb Írásaim",
    "blog.desc": "Hasznos tippek, trükkök, útmutatók és személyes történetek a webfejlesztés világából.",
    "blog.readMore": "Olvass tovább",
    "blog.back": "Vissza a bloghoz",
    "blog.allArticles": "Minden cikk megtekintése",
    "blog.noArticles": "Nincs cikk ebben a kategóriában.",
    "blog.related": "📖 Kapcsolódó cikkek",

    // Contact
    "contact.title": "Kapcsolat",
    "contact.desc": "Van egy jó ötleted vagy egy projekted, amihez fejlesztőt keresel? Vegyük fel a kapcsolatot!",
    "contact.name": "Név",
    "contact.email": "Email cím",
    "contact.message": "Üzenet",
    "contact.send": "Küldés",
    
    // Footer
    "footer.rights": "Minden jog fenntartva.",
    "footer.privacy": "Adatvédelmi irányelvek",
    "footer.terms": "Felhasználási feltételek",
    
    "common.loading": "Betöltés..."
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.tools": "Tools",

    // Hero section
    "hero.greeting": "Hi, I'm Alex Szabolcs",
    "hero.role": "Full Stack Developer",
    "hero.description": "I build web applications that go beyond the usual design. Every pixel and line of code serves premium user experience and blazing fast performance.",
    "hero.contactBtn": "Get In Touch",
    "hero.projectsBtn": "My Work",
    
    // About
    "about.title": "About Me",
    "about.desc1": "Programming isn't just my job, it's my passion. I've always been fascinated by how a few lines of code can build systems that solve problems for thousands of people.",
    "about.experience": "With years of experience, I navigate effortlessly across all layers of web development. Whether it's a lightning-fast frontend using Next.js, or a scalable microservices architecture built on Node.js and Go.",

    // Projects
    "projects.title": "Featured Projects",
    "projects.desc": "I've worked on numerous exciting and challenging projects over the years. Here are some of the works I'm most proud to showcase.",
    "projects.seeAll": "All Projects",
    
    // Blog
    "blog.badge": "Blog",
    "blog.title": "Latest Articles",
    "blog.desc": "Useful tips, tricks, guides, and personal stories from the world of web development.",
    "blog.readMore": "Read more",
    "blog.back": "Back to blog",
    "blog.allArticles": "View all articles",
    "blog.noArticles": "No articles in this category.",
    "blog.related": "📖 Related Articles",

    // Contact
    "contact.title": "Contact",
    "contact.desc": "Do you have a great idea or a project in need of a developer? Let's get in touch!",
    "contact.name": "Name",
    "contact.email": "Email Address",
    "contact.message": "Message",
    "contact.send": "Send Message",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    
    "common.loading": "Loading..."
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("hu");

  useEffect(() => {
    // Client-side hydration of language
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang === "hu" || storedLang === "en") {
      setLanguageState(storedLang);
    } else {
      // Default browser language handling
      if (navigator.language.startsWith("en")) {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Beállítunk egy sütit is, hogy a server componentek (pl blog API) is lássák
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
  };

  const t = (key: string): string => {
    // @ts-ignore
    return dictionary[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
