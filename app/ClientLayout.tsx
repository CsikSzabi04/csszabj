"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import Cursor from "./components/Cursor";
import Startup from "./components/Startup";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <SmoothScroll>
      <NoiseOverlay />
      <Cursor />
      <Startup onComplete={() => setShowContent(true)} />
      {showContent && (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      )}
    </SmoothScroll>
  );
}
