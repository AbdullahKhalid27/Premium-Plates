"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink } from "lucide-react";
import Plate from "./Plate";
import type { PlateKind } from "../config/pricing";

interface LookbookItem {
  id: string;
  reg: string;
  car: string;
  kind: PlateKind;
  finishName: string;
  description: string;
  accentBg: string;
}

const lookbookEntries: LookbookItem[] = [
  {
    id: "gt3",
    reg: "GT03 RS",
    car: "Porsche 911 GT3 RS",
    kind: "acrylic",
    finishName: "4D 3mm Laser Cut",
    description: "Surgical square bevels echoing track-focused aerodynamics.",
    accentBg: "#172328",
  },
  {
    id: "g63",
    reg: "G63 AMG",
    car: "Mercedes-AMG G 63",
    kind: "gel",
    finishName: "3D Gloss Gel",
    description: "Deep resin dome catching streetlamps and night drive reflections.",
    accentBg: "#1b2a26",
  },
  {
    id: "m4",
    reg: "M4 CS",
    car: "BMW M4 Competition",
    kind: "short",
    finishName: "Short Form Standard",
    description: "Clean 5-character shortened margin fitting European grille contours.",
    accentBg: "#221c25",
  },
  {
    id: "rs6",
    reg: "RS06 V8",
    car: "Audi RS6 Avant",
    kind: "hex",
    finishName: "Hexagonal Cut",
    description: "Geometric ends aligned with quad diffuser exhaust tips.",
    accentBg: "#261f1c",
  },
];

export default function LookbookGallery({
  onSelectSpec,
}: {
  onSelectSpec?: (kind: PlateKind, reg: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = 340;
    el.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <section className="lookbook-section section-pad bg-[#142126] text-[#edece4] border-b border-[#ffffff1a] overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#caa785] font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              The Lookbook Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Finished to the car.<br />
              <em className="italic text-[#d8bca0]">Inspiration from the road.</em>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous gallery cards"
              className="w-10 h-10 rounded-full border border-[#ffffff26] flex items-center justify-center hover:bg-[#ffffff14] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next gallery cards"
              className="w-10 h-10 rounded-full border border-[#ffffff26] flex items-center justify-center hover:bg-[#ffffff14] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Drag & Scroll Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          aria-label="Vehicle lookbook carousel"
        >
          {lookbookEntries.map((entry) => (
            <div
              key={entry.id}
              className="min-w-[300px] md:min-w-[340px] max-w-[360px] flex-shrink-0 snap-start bg-[#0d171b] border border-[#ffffff1f] rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-[#caa785]/60 transition-all duration-300"
              style={{ backgroundColor: entry.accentBg }}
            >
              <div>
                <div className="flex justify-between items-start text-xs text-[#a4b3b1] pb-3 border-b border-[#ffffff14]">
                  <span className="font-semibold text-[#f5efe6]">{entry.car}</span>
                  <span className="bg-[#ffffff14] px-2 py-0.5 rounded text-[10px] text-[#d8bca0] uppercase font-mono">
                    {entry.finishName}
                  </span>
                </div>

                <div className="py-8 flex items-center justify-center">
                  <div className="w-full">
                    <Plate reg={entry.reg} kind={entry.kind} side="rear" />
                  </div>
                </div>

                <p className="text-xs text-[#c4cfce] leading-relaxed">
                  {entry.description}
                </p>
              </div>

              {onSelectSpec && (
                <button
                  type="button"
                  onClick={() => onSelectSpec(entry.kind, entry.reg)}
                  className="w-full text-xs font-medium py-2.5 px-3 rounded border border-[#ffffff26] hover:bg-[#ffffff14] text-[#edece4] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Apply This Style to Studio</span>
                  <ExternalLink size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
