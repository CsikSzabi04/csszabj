import type { Metadata } from "next";
import Hero from "./components/Hero";
import BestProjects from "./components/BestProjects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BestProjects />
    </>
  );
}
