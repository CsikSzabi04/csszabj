import About from "../components/About";
import Experience from "../components/Experience";

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
