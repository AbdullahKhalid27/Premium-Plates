"use client";
import { useState } from "react";
import Plate from "./Plate";
import { previewDimensions, type PlateSize } from "@/config/catalogue";
import type { PlateKind } from "@/config/pricing";
import "./motion.css";

const profiles: {label: string; kind: PlateKind; size: PlateSize}[] = [
  { label: "Oblong", kind: "regular", size: "standard" },
  { label: "Short", kind: "short", size: "compact" },
  { label: "Hex", kind: "hex", size: "standard" },
  { label: "Motorcycle", kind: "moto", size: "compact" },
];

export default function FitSection({reg = "PP24 LUX", onApply}: {reg?: string; onApply: (kind: PlateKind, size: PlateSize) => void}) {
  const [selected, setSelected] = useState(0);
  const {kind, size, label} = profiles[selected];
  const layout = kind === "moto" ? "two-line" : "single-line";
  const [width, height] = previewDimensions({kind, size, layout});
  return <section id="fit" className="profile-study section-pad" aria-labelledby="profile-title">
    <div><h2 id="profile-title">Find the right profile</h2>
      <p>Measure your mounting space, then compare the outlines.</p>
      <div className="profile-switch" role="group" aria-label="Plate profile">{profiles.map((profile, i) =>
        <button type="button" key={profile.kind} aria-pressed={i === selected} onClick={() => setSelected(i)}>{profile.label}</button>)}</div><button className="profile-apply" type="button" onClick={() => onApply(kind, size)}>Use this profile in builder →</button>
    </div>
    <figure><div className="profile-stage"><div className="profile-outline" data-profile={kind} style={{width: width / 520 * 90 + "%", aspectRatio: width + " / " + height}}>
      <Plate reg={reg} kind={kind} options={{size, layout}} />
    </div></div><figcaption aria-live="polite">{label} · {width} × {height} mm preview</figcaption></figure>
  </section>;
}
