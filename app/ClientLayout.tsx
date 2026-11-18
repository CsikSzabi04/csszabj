"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import Startup from "./components/Startup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TechMarquee from "./components/TechMarquee";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./contexts/LanguageContext";

function SkipLink() {
  const { language } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
    >
      {language === "en" ? "Skip to content" : "Ugrás a tartalomra"}
    </a>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // The private files app is full-screen (like Header and LanguageToggle, which hide themselves there);
  // the marquee and footer would only sit behind it, or show through it during the route fade.
  const fullscreenApp = Boolean(usePathname()?.startsWith("/files"));

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <SkipLink />
          <NoiseOverlay />
          {/* The splash sits on top of the page; the content itself renders immediately
              (server-rendered HTML, fast LCP, crawlable) instead of waiting for the animation. */}
          <Startup />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
            {!fullscreenApp && <TechMarquee />}
            {!fullscreenApp && <Footer />}
            <LanguageToggle />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </LanguageProvider>
  );
}
