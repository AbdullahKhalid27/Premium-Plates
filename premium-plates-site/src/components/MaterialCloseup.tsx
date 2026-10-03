"use client";

import React, { useState } from "react";
import { Layers, Shield, Sparkles, Check } from "lucide-react";

interface LayerDetail {
  id: string;
  name: string;
  material: string;
  depth: string;
  role: string;
  spec: string;
}

const layers: LayerDetail[] = [
  {
    id: "layer-dome",
    name: "01. Polyurethane 3D Gel Dome",
    material: "Automotive-Grade Polyurethane Resin",
    depth: "1.5mm Convex Dome",
    role: "Impact cushion & high-gloss lens",
    spec: "Self-healing memory resin impervious to UV fading and stone chips.",
  },
  {
    id: "layer-acrylic",
    name: "02. Surgical 4D Laser-Cut Characters",
    material: "Solid Jet-Black Cast PMMA Acrylic",
    depth: "3.0mm Beveled Block",
    role: "Deep architectural shadow lines",
    spec: "High-precision laser cut with 90° edges, conforming to BS AU 145e dimensions.",
  },
  {
    id: "layer-carrier",
    name: "03. Optical Shield Baseplate",
    material: "Modified Impact PMMA",
    depth: "3.0mm Base",
    role: "Structural substrate & seal",
    spec: "100% optically pure acrylic offering maximum torsional resistance.",
  },
  {
    id: "layer-retro",
    name: "04. Retroreflective Subsurface Film",
    material: "Micro-Prismatic Optical Sheet",
    depth: "0.2mm Sub-layer",
    role: "Night-drive visibility & ANPR compliance",
    spec: "Certified 3M retroreflective sheeting calibrated for road cameras and headlights.",
  },
];

export default function MaterialCloseup() {
  const [selectedLayer, setSelectedLayer] = useState(1); // Default to 4D Acrylic block

  const current = layers[selectedLayer];

  return (
    <section className="material-section section-pad bg-[#0f191d] text-[#edece4] border-b border-[#ffffff1f]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#caa785] font-semibold flex items-center gap-1.5">
            <Layers size={14} />
            Layer-By-Layer Anatomy
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">
            Engineered depth.<br />
            <em className="italic text-[#d8bca0]">From reflective substrate to laser edge.</em>
          </h2>
          <p className="text-sm md:text-base text-[#a4b3b1] max-w-xl leading-relaxed">
            Standard plates are simply printed paper trapped behind plastic. Premium Plates are multi-tier laminate assemblies precision bonded for a lifetime of road use.
          </p>
        </div>

        {/* Interactive Exploded Layer Viewer */}
        <div className="grid lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Layer Selector Stack */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((l, idx) => {
              const isSelected = selectedLayer === idx;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setSelectedLayer(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-lg border transition-all duration-300 flex justify-between items-center ${
                    isSelected
                      ? "bg-[#18272d] border-[#caa785] shadow-lg translate-x-1"
                      : "bg-[#131f24] border-[#ffffff14] hover:border-[#ffffff26] hover:bg-[#162329]"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-xs font-mono uppercase tracking-wider block ${isSelected ? "text-[#caa785]" : "text-[#7a8c8a]"}`}>
                      {l.material}
                    </span>
                    <h4 className="text-base font-medium text-[#f5efe6]">{l.name}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-[#ffffff0f] px-2.5 py-1 rounded text-[#caa785] font-mono">
                      {l.depth}
                    </span>
                    {isSelected && <Check size={16} className="text-[#caa785]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Layer Detail Focus Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#142126] border border-[#caa785]/40 rounded-xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-[#ffffff1f]">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#caa785]" />
                  <span className="text-xs uppercase tracking-wider text-[#caa785] font-semibold">
                    Inspection Spec
                  </span>
                </div>
                <span className="text-xs font-mono text-[#a4b3b1]">
                  Component {selectedLayer + 1} of 4
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-[#fdfbf7]">{current.name}</h3>
                <p className="text-sm text-[#caa785] font-medium">{current.role}</p>
                <p className="text-sm text-[#c4cfce] leading-relaxed pt-2">
                  {current.spec}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ffffff1f] grid grid-cols-2 gap-4 text-xs text-[#d0dedd]">
                <div>
                  <span className="text-[10px] text-[#7a8c8a] uppercase block">Material Grade</span>
                  <span className="font-medium text-[#f5efe6]">{current.material}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7a8c8a] uppercase block">Tolerance</span>
                  <span className="font-medium text-[#f5efe6]">±0.05mm Surgical Laser</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
