import type { Metadata } from "next";
import About from "../components/About";
import Experience from "../components/Experience";

export const metadata: Metadata = {
  title: "Rólam",
  description: "Ismerd meg Csík Szabolcs Alex full stack fejlesztőt: tapasztalat, tanulmányok és készségek.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <About />
      <div className="mt-20">
        <Experience />
      </div>
    </div>
  );
}
