"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import Cursor from "./components/Cursor";
import Startup from "./components/Startup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TechMarquee from "./components/TechMarquee";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <LanguageProvider>
      <SmoothScroll>
        <NoiseOverlay />
        <Cursor />
        <Startup onComplete={() => setShowContent(true)} />
        {showContent && (
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <TechMarquee />
            <Footer />
            <LanguageToggle />
          </div>
        )}
      </SmoothScroll>
    </LanguageProvider>
  );
}
