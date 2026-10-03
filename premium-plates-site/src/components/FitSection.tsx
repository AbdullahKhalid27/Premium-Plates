"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Sparkles,
  Layers,
  Sliders,
  ChevronRight,
  Maximize2,
  Car,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import Plate from "./Plate";
import type { PlateKind } from "../config/pricing";

interface ProfileOption {
  id: string;
  name: string;
  dimensions: string;
  description: string;
  kind: PlateKind;
  shapeClass?: string;
  tag: string;
}

const profileOptions: ProfileOption[] = [
  {
    id: "regular",
    name: "Standard British Oblong",
    dimensions: "520 × 111 mm",
    description: "Universal factory fitment for standard UK bumpers and mounting plinths.",
    kind: "regular",
    tag: "Universal Fit",
  },
  {
    id: "short-5",
    name: "Shortened 5-Digit Profile",
    dimensions: "405 × 111 mm",
    description: "Proportioned 11mm legal margins for 5-character marks without excess empty space.",
    kind: "short",
    tag: "5-Digit Marks",
  },
  {
    id: "short-6",
    name: "Shortened 6-Digit Profile",
    dimensions: "460 × 111 mm",
    description: "Crisp OEM look designed specifically for 6-character private registrations.",
    kind: "short",
    tag: "6-Digit Marks",
  },
  {
    id: "hex",
    name: "Hexagonal Recess Profile",
    dimensions: "520 × 111 mm (Hex Bevel)",
    description: "Angular bevel profile designed to match Audi RS, Lamborghini, and honeycomb grilles.",
    kind: "hex",
    tag: "Supercar & RS",
  },
  {
    id: "moto",
    name: "Two-Tier Motorcycle / Square",
    dimensions: "228 × 178 mm",
    description: "Compact dual-line format engineered for motorbikes, 4x4 tailgates, and imports.",
    kind: "moto",
    tag: "Bike & 4x4",
  },
];

interface DepthOption {
  id: PlateKind;
  name: string;
  relief: string;
  description: string;
  badge: string;
}

const depthOptions: DepthOption[] = [
  {
    id: "regular",
    name: "Standard Flat Printed",
    relief: "0.0 mm Relief",
    description: "Traditional flush retroreflective film laminated beneath clear impact acrylic.",
    badge: "BS AU 145e",
  },
  {
    id: "gel",
    name: "3D Domed Resin Gel",
    relief: "1.5 mm Relief",
    description: "Flexible, self-healing polyurethane resin with a curved high-gloss tactile dome.",
    badge: "Tactile Gloss",
  },
  {
    id: "acrylic",
    name: "4D Laser-Cut Solid Acrylic",
    relief: "3.0 mm Relief",
    description: "Surgical CNC laser-cut 90° blocks in solid jet-black PMMA acrylic.",
    badge: "Architectural",
  },
];

export default function FitSection({ reg = "PP24 LUX" }: { reg?: string }) {
  const [activeTab, setActiveTab] = useState<"profile" | "depth" | "accents">("profile");
  const [selectedProfile, setSelectedProfile] = useState<string>("regular");
  const [selectedDepth, setSelectedDepth] = useState<PlateKind>("acrylic");
  const [hasFlag, setHasFlag] = useState(false);
  const [hasBorder, setHasBorder] = useState(false);
  const [side, setSide] = useState<"rear" | "front">("rear");

  const currentProfile = profileOptions.find((p) => p.id === selectedProfile) || profileOptions[0];
  const currentDepth = depthOptions.find((d) => d.id === selectedDepth) || depthOptions[2];

  // Plate kind to render on specimen canvas
  const effectiveKind: PlateKind =
    currentProfile.kind === "moto"
      ? "moto"
      : currentProfile.kind === "hex"
      ? "hex"
      : currentProfile.kind === "short"
      ? "short"
      : selectedDepth;

  return (
    <section className="fit-section section-pad bg-[#e6e2d8] text-[#111b1e] border-y border-[#d0cdc5]" id="fit">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Fitment Storyboard */}
          <div className="lg:col-span-6 space-y-8">
            <div className="fit-title space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#713d3e] font-semibold flex items-center gap-1.5">
                <Sliders size={14} />
                Tailored Proportions & Fitment
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
                It should fit the car.<br />
                <em className="italic text-[#713d3e]">And the person.</em>
              </h2>
              <p className="text-base text-[#4a4e48] leading-relaxed max-w-lg">
                Every vehicle has distinctive coachwork lines. Configure shape, tactile relief depth, and legal accents to harmonize with your bumper recess.
              </p>
            </div>

            {/* Step Selection Tabs */}
            <div className="flex border-b border-[#cfcbc0] gap-2 pb-2">
              {[
                { id: "profile", step: "01", label: "Profile Shape" },
                { id: "depth", step: "02", label: "Finish Depth" },
                { id: "accents", step: "03", label: "Legal Accents" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#622f35] text-white shadow-sm font-semibold"
                        : "text-[#4a4e48] hover:bg-[#dedad0]"
                    }`}
                  >
                    <span className="font-mono text-xs opacity-75">{tab.step}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Profile Shapes */}
            {activeTab === "profile" && (
              <div className="space-y-3">
                {profileOptions.map((opt) => {
                  const isSelected = selectedProfile === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedProfile(opt.id)}
                      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 flex justify-between items-center ${
                        isSelected
                          ? "bg-[#fffdf9] border-[#622f35] shadow-md ring-1 ring-[#622f35]"
                          : "bg-[#dedad0] border-[#cfcbc0] hover:bg-[#eae6dc]"
                      }`}
                    >
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base md:text-lg text-[#111b1e]">
                            {opt.name}
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#142126]/10 text-[#142126]">
                            {opt.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#525750] leading-relaxed max-w-md">
                          {opt.description}
                        </p>
                        <span className="text-[11px] font-mono text-[#713d3e] block pt-0.5">
                          Dimensions: {opt.dimensions}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-[#622f35] text-white" : "border border-[#a8ada6]"
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Finish Depth */}
            {activeTab === "depth" && (
              <div className="space-y-3">
                {depthOptions.map((depth) => {
                  const isSelected = selectedDepth === depth.id;
                  return (
                    <button
                      key={depth.id}
                      type="button"
                      onClick={() => setSelectedDepth(depth.id)}
                      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 flex justify-between items-center ${
                        isSelected
                          ? "bg-[#fffdf9] border-[#622f35] shadow-md ring-1 ring-[#622f35]"
                          : "bg-[#dedad0] border-[#cfcbc0] hover:bg-[#eae6dc]"
                      }`}
                    >
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base md:text-lg text-[#111b1e]">
                            {depth.name}
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#622f35]/10 text-[#622f35] font-semibold">
                            {depth.relief}
                          </span>
                        </div>
                        <p className="text-xs text-[#525750] leading-relaxed max-w-md">
                          {depth.description}
                        </p>
                        <span className="text-[11px] font-mono text-[#713d3e] block pt-0.5">
                          Standard: {depth.badge}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-[#622f35] text-white" : "border border-[#a8ada6]"
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Legal Accents */}
            {activeTab === "accents" && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#fffdf9] border border-[#cfcbc0] space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#111b1e]">
                    Official Road-Legal Accents
                  </h4>
                  <p className="text-xs text-[#525750] leading-relaxed">
                    Under BS AU 145e, British plates may feature an optional certified national flag and a subtle 2mm pin-line border.
                  </p>
                  <div className="space-y-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setHasFlag(!hasFlag)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-[#cfcbc0] hover:bg-[#f6f3eb] transition-colors"
                    >
                      <div className="text-left">
                        <span className="font-semibold text-xs block text-[#111b1e]">
                          UK National Identifier Flag (+£6)
                        </span>
                        <span className="text-[11px] text-[#636861]">
                          Union Flag with &apos;UK&apos; lettering, 100% legal for European driving
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          hasFlag ? "bg-[#622f35] text-white" : "border border-[#a8ada6]"
                        }`}
                      >
                        {hasFlag && <Check size={13} />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasBorder(!hasBorder)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-[#cfcbc0] hover:bg-[#f6f3eb] transition-colors"
                    >
                      <div className="text-left">
                        <span className="font-semibold text-xs block text-[#111b1e]">
                          Subtle Pin-Line Accent Border (+£4)
                        </span>
                        <span className="text-[11px] text-[#636861]">
                          2mm perimeter border framing characters cleanly
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          hasBorder ? "bg-[#622f35] text-white" : "border border-[#a8ada6]"
                        }`}
                      >
                        {hasBorder && <Check size={13} />}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#dedad0] border border-[#cfcbc0] flex items-center gap-3">
                  <Wrench size={18} className="text-[#622f35] flex-shrink-0" />
                  <div className="text-xs text-[#4a4e48]">
                    <strong className="block text-[#111b1e]">Zero-Drill 3M VHB Kit Included</strong>
                    Commercial high-tack adhesive pads engineered to withstand pressure washers and salt.
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#studio"
                className="text-action inline-flex items-center gap-2 font-medium text-sm text-[#111b1e] hover:text-[#622f35] border-b border-[#111b1e] transition-colors"
              >
                Configure this specification in Studio <ArrowUpRight size={16} />
              </a>
              <span className="text-xs text-[#713d3e] font-mono">
                BS AU 145e Compliant · Handcrafted in GB
              </span>
            </div>
          </div>

          {/* Right Column: Visual Specimen & Vehicle Bumper Stage */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#142126] text-[#f4f0e8] p-7 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden border border-[#ffffff1f] flex flex-col justify-between min-h-[580px]">
              {/* Stage Top Bar */}
              <div className="flex flex-wrap justify-between items-center pb-5 border-b border-[#ffffff1f] gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#622f35] animate-pulse" />
                  <span className="text-xs tracking-wider uppercase text-[#c4cfce] font-semibold">
                    Live Fitment Specimen Stage
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSide(side === "rear" ? "front" : "rear")}
                    className="text-xs bg-[#ffffff14] hover:bg-[#ffffff24] px-3 py-1 rounded-full text-[#e0ded5] transition-colors"
                  >
                    View: {side === "rear" ? "Rear (Yellow)" : "Front (White)"}
                  </button>
                  <span className="text-xs bg-[#622f35]/80 px-3 py-1 rounded-full text-[#fff] font-mono">
                    {currentProfile.dimensions}
                  </span>
                </div>
              </div>

              {/* Vehicle Recess Mockup Stage */}
              <div className="my-8 relative flex flex-col items-center justify-center">
                {/* Bumper Outline / Mounting Plinth Canvas */}
                <div className="w-full rounded-xl bg-[#091114] border border-[#ffffff12] p-8 md:p-10 flex flex-col items-center justify-center relative shadow-inner">
                  {/* Subtle Bumper Contour Guidelines */}
                  <div className="absolute inset-x-8 top-3 flex justify-between text-[10px] font-mono text-[#4a5857] tracking-wider uppercase pointer-events-none">
                    <span>◄ COACHWORK RECESS</span>
                    <span>11MM MARGIN CLEARANCE ►</span>
                  </div>

                  {/* Plate Component */}
                  <div className="w-full max-w-[460px] transition-all duration-300 transform hover:scale-[1.02]">
                    <Plate
                      reg={reg}
                      kind={effectiveKind}
                      side={side}
                      badge={hasFlag}
                      border={hasBorder}
                      className="shadow-2xl"
                    />
                  </div>

                  {/* Mounting Pads Marker */}
                  <div className="mt-6 flex items-center justify-between w-full max-w-[440px] text-[10px] font-mono text-[#6c7d7b]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#caa785]/60 inline-block" />
                      3M VHB MOUNT L
                    </span>
                    <span className="text-[#caa785]">DVLA INF104 VERIFIED</span>
                    <span className="flex items-center gap-1">
                      3M VHB MOUNT R
                      <span className="w-2 h-2 rounded-full bg-[#caa785]/60 inline-block" />
                    </span>
                  </div>
                </div>

                {/* Technical Dimension Pill */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#a0adab] tracking-wider uppercase bg-[#091216] px-5 py-2.5 rounded-full border border-[#ffffff14]">
                  <span>SHAPE: {currentProfile.name}</span>
                  <span className="text-[#622f35]">|</span>
                  <span>DEPTH: {currentDepth.name} ({currentDepth.relief})</span>
                </div>
              </div>

              {/* Lower Quality & Compliance Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#ffffff1f] text-xs text-[#d0dedd]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={18} className="text-[#caa785] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#fdfbf7]">BS AU 145e Compliant</span>
                    <span className="text-[11px] text-[#9eacab]">
                      ANPR camera & MOT certified British spacing
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers size={18} className="text-[#caa785] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#fdfbf7]">PMMA Cast Acrylic</span>
                    <span className="text-[11px] text-[#9eacab]">
                      UV-stabilised, zero yellowing or peel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
