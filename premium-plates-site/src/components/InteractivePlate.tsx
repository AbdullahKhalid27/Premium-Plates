"use client";

import React, { useRef, useState } from "react";
import Plate from "./Plate";
import type { PlateKind, PlateSide } from "../config/pricing";

interface InteractivePlateProps {
  reg: string;
  kind: PlateKind;
  side: PlateSide;
  badge?: boolean;
  border?: boolean;
  angle: number;
  lightPosition: number;
  headlights: boolean;
}

export default function InteractivePlate({
  reg,
  kind,
  side,
  badge = false,
  border = false,
  angle,
  lightPosition,
  headlights,
}: InteractivePlateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Subtle 3D tilt angles
    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 14;

    setTilt({ x: rotateX, y: rotateY });
    setLight({ x: px * 100, y: py * 100, opacity: 0.6 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setLight({ x: 50, y: 50, opacity: 0 });
  };

  // Gel and 4D finishes have stronger specular reflections
  const is3D = kind === "gel" || kind === "acrylic";

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative select-none perspective-[800px]"
    >
      <div
        className="w-full transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.x + 5}deg) rotateY(${tilt.y + angle}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Plate
          reg={reg}
          kind={kind}
          side={side}
          badge={badge}
          border={border}
          className="shadow-2xl"
        />

        <div
          className="inspection-light"
          aria-hidden="true"
          style={{
            opacity: headlights ? 0.85 : is3D ? 0.55 : 0.28,
            background: `radial-gradient(ellipse at ${lightPosition}% ${headlights ? 70 : 0}%, #fff8e3 0%, transparent ${headlights ? 48 : 68}%)`,
          }}
        />

        {/* Pointer reflection supplements the persistent, keyboard-controlled light. */}
        {is3D && (
          <div
            className="absolute inset-0 rounded-md pointer-events-none transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: light.opacity,
              background: `radial-gradient(circle 280px at ${light.x}% ${light.y}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
