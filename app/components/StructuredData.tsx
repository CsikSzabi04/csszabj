import { personalInfo } from "../data/portfolio";
import { SITE_URL } from "../lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Csík Szabolcs",
  "alternateName": "csszabj",
  "url": SITE_URL,
  "image": `${SITE_URL}${personalInfo.avatars}`,
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

// Escape "<" so the JSON can never close the surrounding <script> element.
const serializedJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedJsonLd }} />;
}
