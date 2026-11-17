import { ArrowUpRight } from "lucide-react";

export default function ClosingSection() {
  return (
    <section className="studio-closing section-pad">
      <h2>Found your finish?</h2>
      <a className="primary-button" href="#studio">
        Return to the builder <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
