import { plateRules, ruleSources } from "@/config/plateRules";
import Link from "./StoreLink";
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
          <h2 id="guidance-heading">Frequently asked questions</h2>
          <p>For a modern UK road plate, use black lettering on a reflective white front or yellow rear face. Keep the registration in its assigned groups.</p>
          <p>For new plates, the supplier’s details and the BS AU 145e mark belong on the finished plate. The supplier must also check who you are and your right to display the number.</p>
          <a href={ruleSources.display.url}>Read the rules on GOV.UK <span aria-hidden="true">↗</span></a>
        </div>
        <div className="guidance-questions">
          <h3>Choosing and ordering a plate</h3>
          <details><summary>What is the difference between flat, 3D gel and 4D acrylic lettering?<Plus size={18} aria-hidden="true"/></summary>
            <div className="guidance-answer"><p>Flat letters sit flush with the face. Gel has a rounded surface that catches a curved highlight. Acrylic has a crisp edge with a more defined shadow.</p><Link href="/#difference">Compare the three finishes</Link></div></details>
          <details><summary>Can I change a design after adding it to my bag?<Plus size={18} aria-hidden="true"/></summary>
            <div className="guidance-answer"><p>Open your bag and choose Edit design. Change the registration, finish or size in the builder, then add it back to update the same item. You can change quantities directly in the bag.</p></div></details>
          <details><summary>Which files can I try in the checkout preview?<Plus size={18} aria-hidden="true"/></summary>
            <div className="guidance-answer"><p>Download the two fictional text files from the checklist. Attach each in its matching box and send them together. A receipt appears when the local receiver accepts both samples.</p><Link href="/checkout/?sample=1">Try the sample checklist</Link></div></details>
          {questions.map(({ id, question, rule }) => (
            <details key={id} id={'faq-' + id}>
              <summary>{question}<Plus size={18} aria-hidden="true"/></summary>
              <div className="guidance-answer">
                {rule ? <>
                  {rule === "show" && <p>Use a show plate for a static exhibition or photo shoot.</p>}
                  {rule === "documents" && <p>A driving licence can establish your name and address. The V5C shows your entitlement to that registration.</p>}
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

