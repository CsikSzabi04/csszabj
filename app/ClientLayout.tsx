"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import Cursor from "./components/Cursor";
import Startup from "./components/Startup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <SmoothScroll>
      <NoiseOverlay />
      <Cursor />
      <Startup onComplete={() => setShowContent(true)} />
      {showContent && children}
    </SmoothScroll>
  );
}
