"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { productDetails } from "@/config/catalogue";
import type { PlateKind } from "@/config/pricing";
import Plate from "./Plate";
import { followLight, clearLight } from "./StyleCards";

const examples = [
  { car: "Porsche 911 GT3 RS", reg: "GT03 RS", kind: "acrylic" },
  { car: "Mercedes-AMG G 63", reg: "G63 AMG", kind: "gel" },
  { car: "BMW M4 Competition", reg: "M4 CS", kind: "short" },
  { car: "Audi RS6 Avant", reg: "RS06 V8", kind: "hex" },
] satisfies { car: string; reg: string; kind: PlateKind }[];

export default function LookbookGallery({ onSelectSpec }: {
  onSelectSpec: (kind: PlateKind, reg: string) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [selected, setSelected] = useState(0);
  function move(direction: number) {
    const row = track.current;
    if (!row) return;
    const positions = Array.from(row.children, child => child.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft);
    const target = direction > 0 ? positions.find(pos => pos > row.scrollLeft + 5) : positions.reverse().find(pos => pos < row.scrollLeft - 5);
    row.scrollTo({ left: target ?? (direction > 0 ? row.scrollWidth : 0), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function apply(button: HTMLButtonElement, index: number) {
    const { kind, reg } = examples[index];
    const source = button.closest("article")?.querySelector<HTMLElement>(".number-plate");
    if (!source || matchMedia("(prefers-reduced-motion: reduce)").matches) { onSelectSpec(kind, reg); return; }
    const bounds = source.getBoundingClientRect();
    const ghost = source.cloneNode(true) as HTMLElement;
    ghost.setAttribute("aria-hidden", "true");
    Object.assign(ghost.style, { position: "fixed", pointerEvents: "none", zIndex: "90", width: bounds.width + "px", height: bounds.height + "px", left: bounds.left + "px", top: bounds.top + "px", margin: "0" });
    document.body.append(ghost);
    onSelectSpec(kind, reg);
    const started = performance.now();
    function fly(now: number) {
      const destination = document.querySelector<HTMLElement>("#studio .number-plate");
      if (!destination) { ghost.remove(); return; }
      const target = destination.getBoundingClientRect();
      const progress = Math.min(1, (now - started) / 700);
      const eased = 1 - (1 - progress) ** 3;
      // Keep the travelling specimen visible until the scrolling builder reaches the viewport.
      const arrivalY = Math.max(16, Math.min(window.innerHeight - 36, target.top + target.height / 2));
      const x = (target.left + target.width / 2 - bounds.left - bounds.width / 2) * eased;
      const y = (arrivalY - bounds.top - bounds.height / 2) * eased;
      const scale = 1 + (target.width / bounds.width - 1) * eased;
      ghost.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
      ghost.style.opacity = String(Math.min(1, (1 - progress) * 4));
      if (progress < 1) requestAnimationFrame(fly);
      else ghost.remove();
    }
    requestAnimationFrame(fly);
  }

  return <section id="lookbook" className="vehicle-studies section-pad" aria-labelledby="vehicle-studies-title">
    <div className="vehicle-studies-heading"><h2 id="vehicle-studies-title">The lookbook</h2>
      <div><button type="button" onClick={() => move(-1)} aria-label="Previous lookbook card"><ChevronLeft/></button>
      <button type="button" onClick={() => move(1)} aria-label="Next lookbook card"><ChevronRight/></button></div>
    </div>
    <div className="vehicle-track" ref={track} role="region" tabIndex={0} aria-label="Vehicle lookbook"
      onPointerDown={event => {
        if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("summary,button,a")) return;
        drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX; }}
      onLostPointerCapture={() => { drag.current = null; }}>
      {examples.map((example, index) => <article className="vehicle-card" key={example.reg} onPointerMove={followLight} onPointerLeave={clearLight}>
        <div className="vehicle-specimen"><Plate reg={example.reg} kind={example.kind}/></div>
        <details onToggle={event => { if (event.currentTarget.open) setSelected(index); }}>
          <summary><span>{example.car}</span><ChevronDown size={18}/></summary>
          <div className="plate-card-specs">
            <p>{productDetails[example.kind].description}</p>
            <dl><div><dt>Profile</dt><dd>{productDetails[example.kind].dimension}</dd></div></dl>
            <button type="button" className="plate-card-action" onClick={e => apply(e.currentTarget,index)}>Use in builder <ArrowUpRight size={16}/></button>
          </div>
        </details>
      </article>)}
      <article className="vehicle-card plate-style-custom">
        <div className="vehicle-specimen"><Plate reg={examples[selected].reg} kind={examples[selected].kind}/></div>
        <h3>Make your own</h3><p>Start with the {productDetails[examples[selected].kind].name} style.</p>
        <button type="button" className="plate-card-action" onClick={e => apply(e.currentTarget, selected)}>Open builder <ArrowUpRight size={16}/></button>
      </article>
    </div>
  </section>;
}

