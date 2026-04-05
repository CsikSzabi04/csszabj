"use client";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Csík Szabolcs",
    "alternateName": "csszabj",
    "url": "https://csszabj.netlify.app",
    "image": "https://i.imgur.com/go8utBV.png",
    "sameAs": [
      "https://github.com/csikszabi04",
      "https://linkedin.com/in/csszabj"
    ],
    "jobTitle": "Full Stack Fejlesztő",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Full Stack webfejlesztő Kecskemétről, aki modern technológiákkal (React, Node.js, Java) készít szoftvereket.",
    "knowsAbout": ["Web Development", "React", "Node.js", "Software Engineering", "Frontend", "Backend"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
