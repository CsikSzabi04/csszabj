import Projects from "../components/Projects";
import Services from "../components/Services";

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
