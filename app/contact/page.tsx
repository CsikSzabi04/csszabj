import type { Metadata } from "next";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Vedd fel a kapcsolatot Csík Szabolcs Alex full stack fejlesztővel projekt, állásajánlat vagy freelance munka ügyében.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <Contact />
      <div className="mt-20">
        <FAQ />
      </div>
    </div>
  );
}
