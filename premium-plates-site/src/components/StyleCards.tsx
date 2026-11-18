"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { applyProduct, collection, defaultDraft, previewDimensions, productDetails } from "@/config/catalogue";
import type { PlateKind } from "@/config/pricing";
import CataloguePlate from "./CataloguePlate";
import "./plate-cards.css";

export function followLight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--beam-x", ((event.clientX - rect.left) / rect.width * 100) + "%");
  card.style.setProperty("--edge-shadow", ((rect.left + rect.width / 2 - event.clientX) / rect.width * 7) + "px");
}

export function clearLight(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--beam-x");
  event.currentTarget.style.removeProperty("--edge-shadow");
}

export function StyleCards({ featured = false, reg, onApply }: {
  featured?: boolean;
  reg?: string;
  onApply?: (kind: PlateKind) => void;
}) {
  const [selected, setSelected] = useState<PlateKind>("acrylic");
  const styles = featured ? collection.slice(0, 3) : collection;
  function useStyle(kind: PlateKind, label: string) {
    return onApply
      ? <button type="button" className="plate-card-action" onClick={() => onApply(kind)}>{label} <ArrowUpRight size={16}/></button>
      : <Link className="plate-card-action" href={'/?product=' + productDetails[kind].slug + '#studio'}>{label} <ArrowUpRight size={16}/></Link>;
  }

  return <div className="plate-style-grid">
    {styles.map(product => {
      const draft = applyProduct(defaultDraft, product.id);
      return <article className="plate-style-card" key={product.id} onPointerMove={followLight} onPointerLeave={clearLight}>
        <CataloguePlate kind={product.id} reg={reg}/>
        <details onToggle={event => { if (event.currentTarget.open) setSelected(product.id); }}>
          <summary><span>{product.name}</span><ChevronDown size={18}/></summary>
          <div className="plate-card-specs">
            <p>{product.description}</p><dl>
              <div><dt>Profile</dt><dd>{product.dimension}</dd></div>
              <div><dt>Preview size</dt><dd>{previewDimensions(draft).join(" × ")} mm</dd></div>
              <div><dt>Use</dt><dd>{product.intendedUse}</dd></div>
            </dl>
            {useStyle(product.id, "Use in builder")}
          </div>
        </details>
        <Link className="plate-card-link" href={'/collection/' + product.slug}>View {product.name} plate <ArrowUpRight size={14}/></Link>
      </article>;
    })}
    <article className="plate-style-card plate-style-custom" onPointerMove={followLight} onPointerLeave={clearLight}>
      <CataloguePlate kind={selected} reg={reg}/>
      <h3>Make your own</h3>
      <p>Start with {productDetails[selected].name.toLowerCase()} and choose the details.</p>
      {useStyle(selected, "Open builder")}
    </article>
  </div>;
}
