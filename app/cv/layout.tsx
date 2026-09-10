import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Önéletrajz",
  description: "Csík Szabolcs Alex interaktív önéletrajza, letölthető PDF formátumban.",
  alternates: { canonical: "/cv" },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
