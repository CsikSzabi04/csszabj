import Contact from "../components/Contact";
import FAQ from "../components/FAQ";

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
