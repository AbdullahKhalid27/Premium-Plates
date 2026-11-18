"use client";

import { useState } from "react";
import Link from "@/components/StoreLink";
import Plate from "./Plate";
import { finishes, productDetails, type Draft, type Lettering } from "@/config/catalogue";
import "./motion.css";

const finishIds: Lettering[] = ["regular", "gel", "acrylic"];
const texture: Record<Lettering, string> = {
  regular: "Printed flush with the plate face.",
  gel: "Rounded characters with a curved highlight.",
  acrylic: "Raised characters with a square edge and a cast shadow.",
};

export default function FinishComparison({draft, onSelect}: {draft: Draft; onSelect: (finish: Lettering) => void}) {
  const [reference, setReference] = useState<Lettering>("regular");
  const [wipe, setWipe] = useState(52);
  const [face, setFace] = useState<"front" | "rear">("rear");
  const current = draft.lettering;
  const other = reference === current ? (current === "regular" ? "acrylic" : "regular") : reference;
  const plate = (finish: Lettering) => <Plate reg={draft.reg} side={face} kind={finish} options={{lettering:finish}} />;
  return <section id="difference" className="difference-section finish-study section-pad" aria-labelledby="finish-study-title">
    <div className="finish-study-heading"><h2 id="finish-study-title">Compare the finishes</h2>
      <p>Choose your builder finish, then move the divider to see how its edge catches light.</p></div>
    <div className="finish-study-grid"><div className="finish-list" role="group" aria-label="Builder lettering finish">
      {finishIds.map(id => <article key={id} data-selected={current === id}>
        <button type="button" aria-pressed={current === id} onClick={() => onSelect(id)}><span>{finishes[id]}</span><span aria-hidden="true">{current === id ? "✓" : "+"}</span></button>
        <p>{texture[id]}</p><Link href={"/collection/" + productDetails[id].slug}>View {finishes[id]} plates</Link>
      </article>)}
    </div><div className="finish-instrument">
      <div className="finish-instrument-controls"><label>Compare against <select value={other} onChange={e => setReference(e.target.value as Lettering)}>
        {finishIds.filter(id => id !== current).map(id => <option key={id} value={id}>{finishes[id]}</option>)}</select></label>
        <button type="button" onClick={() => setFace(face === "rear" ? "front" : "rear")}>{face === "rear" ? "Rear" : "Front"} face ⇄</button></div>
      <div className="finish-stage compare-area">
        <div className="finish-sample">{plate(other)}</div>
        <div className="finish-sample compare-raised" style={{clipPath:"inset(0 " + (100 - wipe) + "% 0 0)"}}>{plate(current)}</div>
        <div className="finish-divider" aria-hidden="true" style={{left:wipe+"%"}}><span>↔</span></div>
        <input type="range" aria-label="Compare plate finishes" aria-valuetext={wipe + "% " + finishes[current] + ", " + (100-wipe) + "% " + finishes[other]} min="0" max="100" value={wipe} onChange={e => setWipe(Number(e.target.value))} />
      </div>
      <p className="finish-caption"><span>{finishes[current]} · builder finish</span><span>{finishes[other]} · comparison</span></p>
    </div></div>
  </section>;
}
