import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eszközök",
  description: "Saját fejlesztésű webes eszközök: QR kód generátor, képtömörítő, SEO ellenőrző, színkontraszt ellenőrző és sebességmérők.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
