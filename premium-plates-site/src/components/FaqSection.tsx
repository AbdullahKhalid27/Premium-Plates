import { plateRules, ruleSources } from "@/config/plateRules";
import { Plus } from "lucide-react";
import "./guidance-paper.css";

const questions = [
  { id: "show", question: "Where can I use a show plate?", rule: "show" },
  { id: "raised", question: "Can I use raised 4D lettering on the road?", rule: "raised" },
  { id: "short", question: "Will my registration fit a shortened plate?", rule: "profile" },
  { id: "documents", question: "Why does the supplier ask for a licence and V5C?", rule: "documents" },
  { id: "delivery", question: "When will my plates be delivered?", rule: null },
] as const;

export default function FaqSection() {
  return (
    <section id="questions" className="guidance-paper section-pad" aria-labelledby="guidance-heading">
      <div className="guidance-paper-grid">
        <div className="guidance-intro">
          <h2 id="guidance-heading">What the law says</h2>
          <p>For a modern UK road plate, use black lettering on a reflective white front or yellow rear face. Keep the registration in its assigned groups.</p>
          <p>For new plates, the supplier’s details and the BS AU 145e mark belong on the finished plate. The supplier must also check who you are and your right to display the number.</p>
          <a href={ruleSources.display.url}>Read the rules on GOV.UK <span aria-hidden="true">↗</span></a>
        </div>
        <div className="guidance-questions">
          <h3>Plate and order questions</h3>
          {questions.map(({ id, question, rule }) => (
            <details key={id} id={'faq-' + id}>
              <summary>{question}<Plus size={18} aria-hidden="true"/></summary>
              <div className="guidance-answer">
                {rule ? <>
                  <p>{plateRules[rule].reason}</p><p>{plateRules[rule].action}</p>
                  <a href={ruleSources[plateRules[rule].source].url}>{ruleSources[plateRules[rule].source].label} <span aria-hidden="true">↗</span></a>
                </> : <p>In the order preview, payment comes first. Staff check the evidence before releasing the plates for manufacture. A delivery estimate depends on the supplier and delivery service. This preview gives no dispatch date.</p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
