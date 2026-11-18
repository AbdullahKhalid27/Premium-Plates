import React from "react";
import { previewDimensions, type AccentColour, type BaseMaterial, type Layout, type Lettering, type PlateSize, type SloganColour } from "@/config/catalogue";
import type { PlateBadge, PlateKind } from "@/config/pricing";

export type PlateOptions = {
  layout?: Layout;
  lettering?: Lettering;
  size?: PlateSize;
  material?: BaseMaterial;
  badgeColour?: AccentColour;
  slogan?: string;
  sloganColour?: SloganColour;
};

export interface PlateProps {
  reg?: string;
  kind?: string;
  side?: "front" | "rear" | "both";
  badge?: boolean | PlateBadge;
  border?: boolean;
  options?: PlateOptions;
  className?: string;
}

export default function Plate({
  reg = "PP24 LUX",
  kind = "acrylic",
  side = "rear",
  badge = false,
  border = false,
  options,
  className = "",
}: PlateProps) {
  const text = reg.trim() || "YOUR REG";
  const displaySide = side === "both" ? "rear" : side;
  const identifier = badge === true ? "uk" : badge || "none";
  const twoLines = options?.layout === "two-line" || kind === "moto" || kind === "motorbike";
  const compactText = text.replace(/\s/g, "");
  const words = text.split(/\s+/);
  const splitAt = words.length === 2 && words.every((part) => part.length <= 4)
    ? words[0].length : Math.ceil(compactText.length / 2);
  const lines = [compactText.slice(0, splitAt), compactText.slice(splitAt)];
  const dimensions = options?.size
    ? previewDimensions({ kind: kind as PlateKind, layout: twoLines ? "two-line" : "single-line", size: options.size })
    : undefined;

  return (
    <div
      className={`number-plate np-${kind} np-${displaySide} ${identifier !== "none" ? "with-badge" : ""} ${
        border ? "with-border" : ""
      } ${className}`}
      data-layout={twoLines ? "two-line" : "single-line"}
      data-lettering={options?.lettering}
      data-size={options?.size}
      data-material={options?.material}
      style={dimensions ? { aspectRatio: dimensions.join(" / ") } : undefined}
      aria-label={`${text}, ${kind} plate`}
    >
      {identifier !== "none" && (
        <span className="country-badge" data-colour={options?.badgeColour} data-identifier={identifier}>
          {identifier === "eu" ? (
            <svg viewBox="0 0 36 22" aria-hidden="true">
              <path fill="#173c89" d="M0 0h36v22H0z" />
              {Array.from({ length: 12 }, (_, index) => (
                <path key={index} fill="#ffdc4a" d="m18 3 .5 1.4h1.4l-1.2.8.5 1.3-1.2-.8-1.2.8.5-1.3-1.2-.8h1.4z" transform={`rotate(${index * 30} 18 11)`} />
              ))}
            </svg>
          ) : (
            <svg viewBox="0 0 36 22" aria-hidden="true">
            <path fill="#253d65" d="M0 0h36v22H0z" />
            <path stroke="#fff" strokeWidth="5" d="m0 0 36 22M36 0 0 22" />
            <path stroke="#a73036" strokeWidth="2" d="m0 0 36 22M36 0 0 22" />
            <path stroke="#fff" strokeWidth="8" d="M18 0v22M0 11h36" />
            <path stroke="#a73036" strokeWidth="4" d="M18 0v22M0 11h36" />
            </svg>
          )}
          <b>{identifier.toUpperCase()}</b>
        </span>
      )}
      <span className="plate-lettering">
        {twoLines ? lines.filter(Boolean).map((line, index) => <span key={index}>{line}</span>) : text}
      </span>
      <small data-slogan-colour={options?.sloganColour}>{options?.slogan || "WORKSHOP · PREVIEW"}</small>
    </div>
  );
}
