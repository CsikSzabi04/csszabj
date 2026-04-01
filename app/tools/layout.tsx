"use client";

import TechMarquee from "../components/TechMarquee";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TechMarquee />
    </>
  );
}
