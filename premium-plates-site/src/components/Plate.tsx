import React from "react";

export interface PlateProps {
  reg?: string;
  kind?: string;
  side?: "front" | "rear" | "both";
  badge?: boolean;
  border?: boolean;
  className?: string;
}

export default function Plate({
  reg = "PP24 LUX",
  kind = "acrylic",
  side = "rear",
  badge = false,
  border = false,
  className = "",
}: PlateProps) {
  const text = reg.trim() || "YOUR REG";
  const displaySide = side === "both" ? "rear" : side;

  return (
    <div
      className={`number-plate np-${kind} np-${displaySide} ${badge ? "with-badge" : ""} ${
        border ? "with-border" : ""
      } ${className}`}
      aria-label={`${text}, ${kind} plate`}
    >
      {badge && (
        <span className="country-badge">
          <svg viewBox="0 0 36 22" aria-hidden="true">
            <path fill="#253d65" d="M0 0h36v22H0z" />
            <path stroke="#fff" strokeWidth="5" d="m0 0 36 22M36 0 0 22" />
            <path stroke="#a73036" strokeWidth="2" d="m0 0 36 22M36 0 0 22" />
            <path stroke="#fff" strokeWidth="8" d="M18 0v22M0 11h36" />
            <path stroke="#a73036" strokeWidth="4" d="M18 0v22M0 11h36" />
          </svg>
          <b>UK</b>
        </span>
      )}
      <span className="plate-lettering">
        {kind === "moto" || kind === "motorbike" ? (
          <>
            {text.slice(0, 4)}
            <br />
            {text.slice(4).trim() || "LUX"}
          </>
        ) : (
          text
        )}
      </span>
      <small>PREMIUM PLATES · BS AU 145e</small>
    </div>
  );
}
