"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, ShoppingBag, Sparkles } from "lucide-react";
import { stylePricing, type PlateKind, type PlateSide } from "../config/pricing";

interface StickyOrderBarProps {
  reg: string;
  kind: PlateKind;
  side: PlateSide;
  formattedTotal: string;
  onContinue: () => void;
}

export default function StickyOrderBar({
  reg,
  kind,
  side,
  formattedTotal,
  onContinue,
}: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const studio = document.getElementById("studio");
    if (!studio) return;
    const handleScroll = () => setVisible(studio.getBoundingClientRect().bottom <= 0);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const style = stylePricing[kind] || stylePricing.regular;
  const sideLabel = side === "both" ? "Front & Rear Pair" : side === "front" ? "Front Plate" : "Rear Plate";

  return (
    <div
      inert={!visible}
      className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[var(--wine-deep)] backdrop-blur-md border-t border-[#ffffff1f] text-[#f4f0e8] px-4 py-3 md:py-3.5 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Active Specification Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--wine)] text-[var(--copper)]">
              <Sparkles size={16} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm md:text-base text-[#fdfbf7] tracking-wider truncate">
                  {reg || "PP24 LUX"}
                </span>
                <span className="text-xs bg-[#ffffff14] text-[var(--copper)] px-2 py-0.5 rounded uppercase font-medium">
                  {style.name}
                </span>
              </div>
              <p className="text-xs text-[var(--studio-muted)] truncate hidden sm:block">
                {sideLabel}
              </p>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[var(--studio-muted)] block">Estimated Total</span>
              <span className="text-lg md:text-xl font-serif font-bold text-[#fdfbf7]">
                {formattedTotal}
              </span>
            </div>

            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center gap-2 bg-[var(--wine)] hover:bg-[var(--wine-hover)] text-[#f8f0e8] text-xs md:text-sm font-medium px-4 md:px-5 py-2.5 rounded-lg transition-colors shadow-lg"
            >
              <ShoppingBag size={15} />
              <span>Review Order</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
