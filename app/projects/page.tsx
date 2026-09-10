import type { Metadata } from "next";
import Projects from "../components/Projects";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "Projektek",
  description: "Csík Szabolcs Alex webes projektjei és szolgáltatásai: AI platformok, közösségi oldalak, webalkalmazások.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-20">
      <Services />
      <div className="mt-20">
        <Projects />
      </div>
    </div>
  );
}
