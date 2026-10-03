"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  Menu,
  ShoppingBag,
  Pause,
  Play,
  Plus,
  Minus,
  RotateCcw,
  Car,
  Layers,
  MoveHorizontal,
  Volume2,
  VolumeX,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Plate from "@/components/Plate";
import InteractivePlate from "@/components/InteractivePlate";
import FitSection from "@/components/FitSection";
import FaqSection from "@/components/FaqSection";
import ClosingSection from "@/components/ClosingSection";
import StickyOrderBar from "@/components/StickyOrderBar";
import LookbookGallery from "@/components/LookbookGallery";
import MaterialCloseup from "@/components/MaterialCloseup";
import { businessFacts } from "@/config/businessFacts";
import {
  stylePricing,
  calculateTotal,
  type PlateKind,
  type PlateSide,
} from "@/config/pricing";
import { checkLegality } from "@/lib/legalityChecker";

const collection: Array<{
  id: PlateKind;
  name: string;
  description: string;
  price: number;
  finish: string;
  dimension: string;
}> = [
  { id: "regular", name: "Regular", description: "Precision-pressed flat British Standard acrylic.", price: 19.99, finish: "Flat Acrylic", dimension: "520 × 111 mm" },
  { id: "gel", name: "3D Gel", description: "Tactile curved polyurethane resin dome with high UV gloss.", price: 29.99, finish: "Domed Resin", dimension: "520 × 111 mm" },
  { id: "acrylic", name: "4D Acrylic", description: "Surgical laser-cut 3mm solid-black acrylic blocks.", price: 39.99, finish: "Raised 3mm", dimension: "520 × 111 mm" },
  { id: "short", name: "Short", description: "Proportionally trimmed outer margins for 5-6 digit marks.", price: 24.99, finish: "Short Form", dimension: "Custom Profile" },
  { id: "hex", name: "Hex", description: "Angular beveled profile contoured for performance diffusers.", price: 34.99, finish: "Hexagonal Cut", dimension: "Shaped Profile" },
  { id: "show", name: "Show", description: "Track, exhibition, and photoshoot bespoke styling.", price: 27.99, finish: "Show Studio", dimension: "Custom Display" },
  { id: "moto", name: "Motorbike", description: "Dual-row square layout for imports and two-wheelers.", price: 22.99, finish: "Two-Tier Square", dimension: "178 × 229 mm" },
];

function CinematicFit({
  reg,
  kind,
  side,
  badge,
  border,
  replay,
}: {
  reg: string;
  kind: PlateKind;
  side: "front" | "rear" | "both";
  badge: boolean;
  border: boolean;
  replay: number;
}) {
  const [fitted, setFitted] = useState({ reg, kind, side, badge, border });
  const [take, setTake] = useState(0);
  const [installing, setInstalling] = useState(false);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = window.setTimeout(
      () => {
        setFitted({ reg, kind, side, badge, border });
        setTake((value) => value + 1);
        setInstalling(true);
      },
      replay ? 60 : 220
    );
    return () => window.clearTimeout(timer);
  }, [reg, kind, side, badge, border, replay]);

  useEffect(() => {
    if (!installing) return;
    const timer = window.setTimeout(() => setInstalling(false), 1050);
    return () => window.clearTimeout(timer);
  }, [installing, take]);

  return (
    <>
      <div className="fit-recess" aria-hidden="true" />
      <div className="fit-plate" key={take} data-take={take}>
        <Plate {...fitted} />
      </div>
      <div className="fit-light" key={`light-${take}`} aria-hidden="true" />
      <span className="fit-status" aria-live="polite">
        {installing ? "Fitting your plate" : "On-car preview"}
      </span>
    </>
  );
}

function Brand() {
  return (
    <a className="brand-lockup flex items-center gap-3" href="#home" aria-label="Premium Plates home">
      <svg viewBox="0 0 42 34" aria-hidden="true" className="w-9 h-8 stroke-current fill-none stroke-[2.5]">
        <path d="M3 30V4h13c12 0 12 15 0 15H9M23 30V4h8c11 0 11 15 0 15h-2" />
      </svg>
      <span className="text-xs font-bold tracking-widest leading-tight">
        PREMIUM<br />
        PLATES<span className="text-[#caa785]">.</span>
      </span>
    </a>
  );
}

const money = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

export default function StudioPage() {
  const [reg, setReg] = useState("PP24 LUX");
  const [kind, setKind] = useState<PlateKind>("acrylic");
  const [side, setSide] = useState<PlateSide>("both");
  const [badge, setBadge] = useState(false);
  const [border, setBorder] = useState(false);
  const [material, setMaterial] = useState("acrylic");
  const [view, setView] = useState<"car" | "detail">("car");
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [fitReplay, setFitReplay] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [bag, setBag] = useState<{
    reg: string;
    kind: PlateKind;
    side: PlateSide;
    badge: boolean;
    border: boolean;
    price: number;
    quantity: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [compare, setCompare] = useState(55);
  const [comparePair, setComparePair] = useState<"reg-4d" | "gel-4d" | "reg-gel">("reg-4d");
  const [comparePlateSide, setComparePlateSide] = useState<"front" | "rear">("front");
  const [isDraggingCompare, setIsDraggingCompare] = useState(false);
  const compareAreaRef = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const updateCompareFromPointer = (clientX: number) => {
    if (!compareAreaRef.current) return;
    const rect = compareAreaRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (rawX / rect.width) * 100));
    setCompare(pct);
  };

  // Dynamic pricing calculation from centralized catalog
  const pricingResult = calculateTotal({
    kind,
    side,
    badge: badge ? "uk" : "none",
    border,
    upgrades: material === "aluminium" ? ["pressedAluminium"] : [],
  });

  // Dynamic UK road-legality check on active registration
  const legality = checkLegality(reg);

  const selected = collection.find((item) => item.id === kind) || collection[2];
  const previewSide = side === "front" ? "front" : "rear";

  const updateReg = (value: string) => {
    const formatted = value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase().slice(0, 8);
    setReg(formatted);
    setError("");
  };

  const selectKind = (id: PlateKind) => {
    setKind(id);
    if (id === "moto") {
      setView("detail");
      setSide("rear");
    }
  };

  const goStudio = () =>
    document.getElementById("studio")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });

  const addToBag = () => {
    if (!reg.trim()) {
      setError("Enter your registration to preview your selection.");
      return;
    }
    setBag({
      reg,
      kind,
      side,
      badge,
      border,
      price: pricingResult.total,
      quantity: 1,
    });
    setBagOpen(true);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (media.matches) {
        video.current?.pause();
        setPlaying(false);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const toggleVideo = () => {
    if (video.current?.paused) {
      void video.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      video.current?.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    if (!video.current) return;
    const next = !soundOn;
    video.current.muted = !next;
    // Set video volume to 1.0 (R3) with remastered -14 LUFS audio track
    video.current.volume = 1.0;
    setSoundOn(next);
    if (next && video.current.paused) {
      void video.current.play().catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <a className="skip-link" href="#studio">
        Skip to plate studio
      </a>

      {/* Masthead Header */}
      <header className="masthead">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <div
            className="nav-dropdown"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button aria-expanded={dropdown} onClick={() => setDropdown(!dropdown)}>
              The collection <ChevronDown size={14} />
            </button>
            {dropdown && (
              <div className="collection-menu">
                {collection.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      selectKind(item.id);
                      setDropdown(false);
                      goStudio();
                    }}
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-[#713d3e] font-mono">From {money(item.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="#studio">Plate studio</a>
          <a href="#difference">The difference</a>
          <a href="#anatomy">Material anatomy</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#questions">Good to know</a>
        </nav>
        <div className="masthead-actions">
          <button
            className="bag-trigger"
            onClick={() => setBagOpen(true)}
            aria-label={`Open bag, ${bag?.quantity ?? 0} items`}
          >
            <ShoppingBag size={18} />
            <span>{bag?.quantity ?? 0}</span>
          </button>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="cinema" id="home">
          <video
            ref={video}
            className={`cinema-video ${playing ? "is-playing" : ""}`}
            autoPlay
            loop
            muted={!soundOn}
            playsInline
            poster="/Premium-Plates/media/night-drive-poster.jpg"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src="/Premium-Plates/media/night-drive-cinematic.mp4" type="video/mp4" />
          </video>
          <div className="cinema-shade" />

          <div className="hero-content">
            <div className="hero-title">
              <h1>
                <span>The final</span>
                <span>touch.</span>
                <em>Entirely you.</em>
              </h1>
              <p>
                Bespoke British number plates. 3D Gel & 4D Laser-cut acrylic.<br />
                Crafted for a car that could only be yours.
              </p>
            </div>

            <div className="hero-register">
              <label htmlFor="hero-reg">Enter your registration</label>
              <div className="hero-input-row">
                <input
                  id="hero-reg"
                  value={reg}
                  onChange={(e) => updateReg(e.target.value)}
                  placeholder="YOUR REG"
                  maxLength={8}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button onClick={goStudio} aria-label="Preview your registration in studio">
                  <ArrowUpRight size={28} />
                </button>
              </div>

              {/* Live DVLA Legality Banner Under Hero Input */}
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                {legality.isLegal ? (
                  <span className="text-[#25D366] flex items-center gap-1 font-medium">
                    <ShieldCheck size={14} /> DVLA Road Legal ({legality.formatStyle.toUpperCase()})
                  </span>
                ) : (
                  <span className="text-[#d7b696] flex items-center gap-1 font-medium">
                    <AlertTriangle size={14} /> Show / Track Plate Concept
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="cinema-bottom">
            <a href="#collection">
              Explore the collection <ArrowDown size={16} />
            </a>
            <span className="film-caption">
              AFTER HOURS — THE BESPOKE STUDY
              <span>{businessFacts.britishStandard} Compliant · {businessFacts.dvlaRnpsNumber}</span>
            </span>
            <div className="film-controls">
              <button
                className="film-control sound-control"
                onClick={toggleSound}
                aria-label={soundOn ? "Mute film soundtrack" : "Play film soundtrack"}
                aria-pressed={soundOn}
              >
                {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>{soundOn ? "Sound on" : "Sound off"}</span>
              </button>
              <button
                className="film-control"
                onClick={toggleVideo}
                aria-label={playing ? "Pause background film" : "Play background film"}
              >
                {playing ? <Pause size={13} /> : <Play size={13} />}
                <span>{playing ? "Pause film" : "Play film"}</span>
              </button>
            </div>
          </div>
          <div className={`film-progress ${playing ? "is-playing" : ""}`} aria-hidden="true" />
        </section>

        {/* Collection Grid with "From £X" Badges */}
        <section className="collection-section section-pad" id="collection">
          <div className="collection-heading">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#713d3e] font-semibold">The Catalogue</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-1">
                One registration.<br />
                <em>More presence.</em>
              </h2>
            </div>
            <div>
              <p>
                From clean legal standard oblongs to 4D 3mm raised acrylic blocks.<br />
                Choose the architectural finish that belongs on your vehicle.
              </p>
              <a className="text-action" href="#studio">
                Launch bespoke studio <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="featured-collection">
            {collection.slice(0, 3).map((item, index) => (
              <button
                key={item.id}
                className={`collection-piece piece-${item.id}`}
                onClick={() => {
                  selectKind(item.id);
                  goStudio();
                }}
              >
                <div className="piece-top">
                  <span className="font-mono text-xs">{item.finish}</span>
                  <span className="bg-[#111b1e]/10 px-2 py-0.5 rounded text-xs font-semibold">
                    From {money(item.price)}
                  </span>
                </div>
                <div className="piece-art">
                  <Plate reg="PP24 LUX" kind={item.id} side={index === 1 ? "rear" : "front"} />
                </div>
                <div className="piece-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="font-medium text-xs text-[#713d3e] flex items-center gap-1">
                    Customise finish in studio <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="more-formats">
            <span>Specialist Vehicle Profiles:</span>
            {collection.slice(3).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  selectKind(item.id);
                  goStudio();
                }}
              >
                <span>{item.name}</span>
                <span className="text-xs text-[#713d3e] font-mono">From {money(item.price)}</span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </section>

        {/* Studio Section with Interactive 3D Plate & Live Price Calculator */}
        <section className="studio-section" id="studio">
          <div className="studio-intro">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#caa785] font-semibold">Real-Time Studio</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-1">
                Your car.<br />
                <em>Your signature.</em>
              </h2>
            </div>
            <p>
              Real-time UK road legality validation.<br />
              Switch between vehicle fitment and 3D specular light studio.
            </p>
          </div>

          <div className="studio-layout">
            {/* Visual Stage */}
            <div className="studio-visual">
              <div className="preview-toolbar">
                <span className="font-medium">
                  {selected.name} · {selected.finish}
                </span>
                <div className="view-switch" aria-label="Preview mode">
                  <button
                    aria-pressed={view === "car"}
                    onClick={() => setView("car")}
                    disabled={kind === "moto"}
                  >
                    <Car size={15} /> On car
                  </button>
                  <button
                    aria-pressed={view === "detail"}
                    onClick={() => setView("detail")}
                  >
                    <Layers size={15} /> 3D Light Studio
                  </button>
                </div>
              </div>

              <div className={`vehicle-stage ${view === "detail" ? "detail-mode" : ""}`}>
                {view === "car" ? (
                  <>
                    <img
                      className="vehicle-image"
                      src="/Premium-Plates/media/night-drive-poster.jpg"
                      alt="Rear of a dark sports car at night"
                    />
                    <div className="vehicle-live-plate">
                      <CinematicFit
                        reg={reg}
                        kind={kind}
                        side={previewSide}
                        badge={badge}
                        border={border}
                        replay={fitReplay}
                      />
                    </div>
                  </>
                ) : (
                  <div className="detail-plate p-8 w-full max-w-[480px]">
                    <InteractivePlate
                      reg={reg}
                      kind={kind}
                      side={previewSide}
                      badge={badge}
                      border={border}
                    />
                  </div>
                )}
                <span className="preview-caption">
                  {view === "detail" ? "DRAG TO TILT & CATCH LIGHT" : "VEHICLE LIVE OVERLAY"}
                </span>
              </div>

              <div className="preview-command">
                <span>
                  {view === "car"
                    ? "Interactive live fitment onto vehicle bodywork."
                    : "Tilt plate to inspect 3D resin and 4D acrylic depth."}
                </span>
                <button
                  type="button"
                  onClick={() => setFitReplay((v) => v + 1)}
                  disabled={view !== "car"}
                  aria-label="Replay plate fitting animation"
                >
                  <RotateCcw size={13} /> Replay fitment
                </button>
              </div>

              <div className="preview-spec">
                <span>
                  <b>{selected.dimension}</b>Profile Size
                </span>
                <span>
                  <b>{material === "aluminium" ? "Pressed Aluminium" : "PMMA Acrylic"}</b>Baseplate
                </span>
                <span>
                  <b>{side === "both" ? "Front & Rear Pair" : side === "front" ? "Front Only" : "Rear Only"}</b>Configuration
                </span>
              </div>
            </div>

            {/* Configurator Controls */}
            <div className="studio-controls rounded-xl shadow-lg">
              <div className="control-heading">
                <h3>Bespoke Builder.</h3>
                <button
                  onClick={() => {
                    setReg("PP24 LUX");
                    setKind("acrylic");
                    setSide("both");
                    setBadge(false);
                    setBorder(false);
                    setMaterial("acrylic");
                    setError("");
                  }}
                  aria-label="Reset design to default"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Registration Input */}
              <label className="field-label" htmlFor="studio-reg">
                Vehicle Registration Mark
              </label>
              <input
                className="studio-input"
                id="studio-reg"
                value={reg}
                onChange={(e) => updateReg(e.target.value)}
                placeholder="YOUR REG"
                aria-invalid={!legality.isLegal}
                autoComplete="off"
                spellCheck={false}
              />

              {/* DVLA Legality Banner */}
              <div
                className={`p-3 rounded-lg text-xs mb-5 flex items-start gap-2.5 ${
                  legality.isLegal
                    ? "bg-[#25D366]/10 text-[#125828] border border-[#25D366]/30"
                    : "bg-[#713d3e]/10 text-[#713d3e] border border-[#713d3e]/30"
                }`}
              >
                {legality.isLegal ? (
                  <ShieldCheck size={16} className="text-[#25D366] flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={16} className="text-[#713d3e] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold block">
                    {legality.isLegal
                      ? `Road Legal: ${legality.formatStyle.toUpperCase()} Series Mark`
                      : "Show / Exhibition Specification"}
                  </span>
                  <span className="text-[11px] leading-relaxed opacity-90">{legality.reason}</span>
                </div>
              </div>

              {/* Finish Selection */}
              <fieldset className="finish-field">
                <legend className="flex justify-between items-center w-full">
                  <span>Choose Plate Finish</span>
                  <span className="text-xs text-[#713d3e] font-normal">From {money(selected.price)}</span>
                </legend>
                <div className="finish-buttons">
                  {collection.map((item) => (
                    <button
                      key={item.id}
                      className={kind === item.id ? "active" : ""}
                      aria-pressed={kind === item.id}
                      onClick={() => selectKind(item.id)}
                    >
                      <span>{item.name}</span>
                      {kind === item.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Front/Rear and Material Pairs */}
              <div className="control-pair">
                <label>
                  Set Quantity
                  <select
                    value={side}
                    onChange={(e) => setSide(e.target.value as PlateSide)}
                  >
                    <option value="both" disabled={kind === "moto"}>
                      Front & Rear Pair
                    </option>
                    <option value="front" disabled={kind === "moto"}>
                      Front Only (White)
                    </option>
                    <option value="rear">Rear Only (Yellow)</option>
                  </select>
                </label>

                <label>
                  Substrate Material
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <option value="acrylic">Surgical PMMA Acrylic</option>
                    <option value="aluminium">Pressed Aluminium Base (+£15)</option>
                  </select>
                </label>
              </div>

              {/* Toggles */}
              <div className="finishing-toggles">
                <button
                  type="button"
                  role="switch"
                  aria-checked={badge}
                  onClick={() => setBadge(!badge)}
                >
                  <span>UK Identifier Flag (+£6)</span>
                  <i className={badge ? "on" : ""} />
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={border}
                  onClick={() => setBorder(!border)}
                >
                  <span>Pin-line Border (+£4)</span>
                  <i className={border ? "on" : ""} />
                </button>
              </div>

              {/* Dynamic Running Total */}
              <div className="studio-total">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#4a4e48] block">
                    Calculated Total
                  </span>
                  <strong key={pricingResult.total} className="text-3xl font-serif font-bold text-[#111b1e]">
                    {pricingResult.formattedTotal}
                  </strong>
                </div>
                <button className="primary-button" onClick={addToBag}>
                  Add to bag <ArrowUpRight size={19} />
                </button>
              </div>
              <p className="prototype-note">
                Handcrafted in Great Britain · {businessFacts.dispatchTime}
              </p>
            </div>
          </div>
        </section>

        {/* 3D vs 4D Interactive Split Compare (Transformed & Proportionate) */}
        <section className="difference-section section-pad bg-[#dbd4c7] text-[#111b1e] border-y border-[#d0cdc5]" id="difference">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Context, Selector & Specs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#713d3e] font-semibold flex items-center gap-1.5">
                    <Layers size={14} />
                    Finish Comparison · Physical Relief
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
                    Some details<br />
                    change <em className="italic text-[#713d3e]">everything.</em>
                  </h2>
                </div>
                <p className="text-base text-[#4a4e48] leading-relaxed">
                  Standard plates remain flat against the coachwork. 4D laser-cut acrylic projects forward, catching reflections and streetlights with sharp architectural depth.
                </p>

                {/* Compare Pair Selector */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[#111b1e] uppercase tracking-wider block">
                    Choose Comparison Finishes
                  </span>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "reg-4d", label: "Standard Flat vs 4D Laser Acrylic (3mm)" },
                      { id: "gel-4d", label: "3D Curved Gel vs 4D Laser Acrylic (3mm)" },
                      { id: "reg-gel", label: "Standard Flat vs 3D Curved Gel Dome" },
                    ].map((pair) => (
                      <button
                        key={pair.id}
                        type="button"
                        onClick={() => setComparePair(pair.id as any)}
                        className={`text-left px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-between border ${
                          comparePair === pair.id
                            ? "bg-[#622f35] text-white border-[#622f35] shadow-sm font-semibold"
                            : "bg-[#fffdf9]/70 text-[#4a4e48] border-[#cfcbc0] hover:bg-[#fffdf9]"
                        }`}
                      >
                        <span>{pair.label}</span>
                        {comparePair === pair.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider Guide Card */}
                <div className="p-4 rounded-xl bg-[#fffdf9]/80 border border-[#b8b3a7] flex items-center gap-3">
                  <MoveHorizontal size={20} className="text-[#622f35] flex-shrink-0" />
                  <p className="text-xs text-[#525750]">
                    Drag the slider divider left or right across the plate to inspect edge reflection, light play, and tactile relief depth.
                  </p>
                </div>
              </div>

              {/* Right Column: Exhibition Display Plinth Stage */}
              <div className="lg:col-span-7 w-full space-y-4">
                {/* Stage Header Controls */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono uppercase text-[#713d3e] font-semibold flex items-center gap-1.5">
                    <Sparkles size={13} />
                    High-Relief Studio Lighting
                  </span>
                  <button
                    type="button"
                    onClick={() => setComparePlateSide(comparePlateSide === "front" ? "rear" : "front")}
                    className="text-xs bg-[#cfcbc0] hover:bg-[#c2beb2] text-[#111b1e] px-3 py-1 rounded-full font-mono transition-colors"
                  >
                    View: {comparePlateSide === "front" ? "Front (White)" : "Rear (Yellow)"}
                  </button>
                </div>

                {/* The Comparison Box Stage */}
                <div
                  ref={compareAreaRef}
                  className="compare-area rounded-2xl shadow-2xl overflow-hidden border border-[#142126]/30 relative h-[380px] md:h-[420px] bg-[#142126] select-none cursor-ew-resize touch-none"
                  onPointerDown={(e) => {
                    setIsDraggingCompare(true);
                    try {
                      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                    } catch {}
                    updateCompareFromPointer(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (isDraggingCompare) {
                      updateCompareFromPointer(e.clientX);
                    }
                  }}
                  onPointerUp={(e) => {
                    setIsDraggingCompare(false);
                    try {
                      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                    } catch {}
                  }}
                  onPointerCancel={() => setIsDraggingCompare(false)}
                >
                  {/* Left Side (Base) */}
                  <div
                    key={`base-${comparePair}-${comparePlateSide}`}
                    className="compare-base bg-gradient-to-br from-[#1a2930] to-[#0e171b] transition-opacity duration-300"
                  >
                    <div className="absolute top-4 left-5 flex items-center gap-2 z-10">
                      <span className="font-mono text-xs font-bold text-[#142126] bg-[#f4f0e8] px-3 py-1 rounded-full shadow-md">
                        {comparePair === "gel-4d" ? "3D GEL DOME" : "STANDARD FLAT"}
                      </span>
                      <span className="text-[11px] font-mono text-[#a0adab] hidden sm:inline-block">
                        {comparePair === "gel-4d" ? "1.5mm Relief" : "0.0mm Flush"}
                      </span>
                    </div>
                    <div className="w-full max-w-[490px] drop-shadow-2xl">
                      <Plate
                        reg={reg}
                        kind={comparePair === "gel-4d" ? "gel" : "regular"}
                        side={comparePlateSide}
                      />
                    </div>
                  </div>

                  {/* Right Side (Raised) */}
                  <div
                    key={`raised-${comparePair}-${comparePlateSide}`}
                    className="compare-raised bg-gradient-to-bl from-[#182a32] to-[#091216] transition-opacity duration-300"
                    style={{
                      clipPath: `inset(0 ${100 - compare}% 0 0)`,
                      transition: isDraggingCompare ? "none" : "clip-path 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "clip-path",
                    }}
                  >
                    <div className="absolute top-4 right-5 flex items-center gap-2 z-10">
                      <span className="text-[11px] font-mono text-[#e0ded5] hidden sm:inline-block">
                        {comparePair === "reg-gel" ? "1.5mm Relief" : "3.0mm Laser Relief"}
                      </span>
                      <span className="font-mono text-xs font-bold text-white bg-[#622f35] px-3 py-1 rounded-full shadow-md">
                        {comparePair === "reg-gel" ? "3D GEL DOME" : "4D 3MM LASER ACRYLIC"}
                      </span>
                    </div>
                    <div className="w-full max-w-[490px] drop-shadow-2xl">
                      <Plate
                        reg={reg}
                        kind={comparePair === "reg-gel" ? "gel" : "acrylic"}
                        side={comparePlateSide}
                      />
                    </div>
                  </div>

                  {/* Divider Handle */}
                  <div
                    className="compare-line pointer-events-none"
                    style={{
                      left: `${compare}%`,
                      transition: isDraggingCompare ? "none" : "left 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "left",
                    }}
                  >
                    <div
                      className={`w-11 h-11 rounded-full bg-[#f8f4eb] text-[#343e3d] flex items-center justify-center shadow-2xl border-2 border-[#622f35] transition-transform ${
                        isDraggingCompare ? "scale-110 shadow-red-950/50" : "hover:scale-105"
                      }`}
                    >
                      <MoveHorizontal size={20} className="text-[#622f35]" />
                    </div>
                  </div>

                  {/* Range Slider for Interaction */}
                  <input
                    aria-label="Compare plate finishes"
                    type="range"
                    min="5"
                    max="95"
                    step="0.1"
                    value={compare}
                    onChange={(e) => setCompare(Number(e.target.value))}
                    className="pointer-events-auto cursor-ew-resize"
                  />
                </div>

                {/* 3 Material Spec Callouts beneath the stage */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#4a4e48]">
                  <div className="p-3.5 rounded-xl bg-[#fffdf9]/70 border border-[#cfcbc0]">
                    <span className="font-semibold block text-[#111b1e]">90° Surgical Laser Edge</span>
                    <span className="text-[11px] text-[#636861]">Sharp architectural shadow lines under streetlights.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fffdf9]/70 border border-[#cfcbc0]">
                    <span className="font-semibold block text-[#111b1e]">BS AU 145e Road Legal</span>
                    <span className="text-[11px] text-[#636861]">Fully ANPR camera and annual MOT certified.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fffdf9]/70 border border-[#cfcbc0]">
                    <span className="font-semibold block text-[#111b1e]">Solid Jet-Black PMMA</span>
                    <span className="text-[11px] text-[#636861]">High-density cast acrylic that never fades or peels.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redesigned Fit Section (R2) */}
        <FitSection reg={reg} />

        {/* Material Close-Up Anatomy (R5.5) */}
        <div id="anatomy">
          <MaterialCloseup />
        </div>

        {/* Vehicle Lookbook Carousel (R5.4) */}
        <div id="lookbook">
          <LookbookGallery
            onSelectSpec={(chosenKind, chosenReg) => {
              setKind(chosenKind);
              setReg(chosenReg);
              goStudio();
            }}
          />
        </div>

        {/* Redesigned FAQ & Trust Section (R2) */}
        <FaqSection />

        {/* Closing Section with Looping Hero Video Background (R2) */}
        <ClosingSection onDesignClick={goStudio} />
      </main>

      {/* Sticky Order Bar (R5.3) */}
      <StickyOrderBar
        reg={reg}
        kind={kind}
        side={side}
        formattedTotal={pricingResult.formattedTotal}
        onContinue={() => {
          addToBag();
        }}
      />

      {/* Footer with Real Business Facts & Professional Branding */}
      <footer className="studio-footer">
        <div className="footer-top">
          <Brand />
          <p className="text-sm italic font-serif text-[#c4b09a]">
            {businessFacts.tagline}
          </p>
          <a href="#home" className="text-xs hover:text-[#fdfbf7] flex items-center gap-1.5">
            Back to top <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {businessFacts.tradingName} · Registered UK Plate Supplier {businessFacts.dvlaRnpsNumber}</span>
          <nav aria-label="Footer navigation">
            <a href="#collection">Collection</a>
            <a href="#studio">Studio</a>
            <a href="#anatomy">Materials</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#questions">FAQs</a>
          </nav>
          <span>{businessFacts.britishStandard} Road Legal Guaranteed</span>
        </div>
      </footer>

      {/* Mobile Navigation Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent className="pp-sheet navigation-sheet">
          <SheetTitle className="text-3xl font-serif">Premium Plates</SheetTitle>
          <SheetDescription className="text-xs text-[#713d3e] font-mono">
            {businessFacts.dvlaRnpsNumber} · {businessFacts.britishStandard}
          </SheetDescription>
          <nav className="mt-8 space-y-4">
            {[
              ["The Collection", "collection"],
              ["Plate Studio", "studio"],
              ["The Difference", "difference"],
              ["Material Anatomy", "anatomy"],
              ["Lookbook", "lookbook"],
              ["Good to Know", "questions"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-2xl font-serif py-3 border-b border-[#ffffff1f] hover:text-[#caa785]"
              >
                {label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </nav>
          <p className="mt-auto pt-8 text-sm italic font-serif text-[#c4b09a]">
            {businessFacts.tagline}
          </p>
        </SheetContent>
      </Sheet>

      {/* Shopping Bag Drawer with Itemized Total */}
      <Sheet open={bagOpen} onOpenChange={setBagOpen}>
        <SheetContent className="pp-sheet basket-sheet">
          <SheetTitle className="text-3xl font-serif">Your Bespoke Selection.</SheetTitle>
          <SheetDescription className="text-xs">
            Review your plate specifications prior to order submission.
          </SheetDescription>

          {bag ? (
            <>
              <div className="bag-plate my-6 p-6 rounded-lg bg-[#dedad0]">
                <Plate
                  reg={bag.reg}
                  kind={bag.kind}
                  side={bag.side === "front" ? "front" : "rear"}
                  badge={bag.badge}
                  border={bag.border}
                />
              </div>

              <div className="bag-description space-y-1">
                <h3 className="text-xl font-serif font-bold text-[#111b1e]">
                  {collection.find((i) => i.id === bag.kind)?.name} Finish
                </h3>
                <p className="text-xs text-[#4a4e48]">
                  {bag.side === "both" ? "Front & Rear Pair" : `${bag.side} plate`} · Registration:{" "}
                  <span className="font-mono font-bold text-[#111b1e]">{bag.reg}</span>
                </p>
                <p className="text-xs text-[#2e6b5a] font-medium pt-1">
                  ✓ {businessFacts.britishStandard} Road Legal Certification Included
                </p>
              </div>

              <div className="bag-quantity my-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#4a4e48]">Quantity</span>
                <div className="flex items-center border border-[#c8c4ba] rounded">
                  <button
                    aria-label="Decrease quantity"
                    className="p-2 hover:bg-[#dedad0]"
                    onClick={() =>
                      setBag(bag.quantity > 1 ? { ...bag, quantity: bag.quantity - 1 } : null)
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-mono font-bold text-sm">{bag.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="p-2 hover:bg-[#dedad0]"
                    onClick={() => setBag({ ...bag, quantity: bag.quantity + 1 })}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  className="remove-item ml-auto text-xs text-[#713d3e] underline"
                  onClick={() => setBag(null)}
                >
                  Remove
                </button>
              </div>

              <div className="bag-total pt-4 border-t border-[#d0cdc5] flex justify-between items-center">
                <span className="text-sm font-medium">Total (inc. VAT & Tracked 24)</span>
                <b className="text-2xl font-serif font-bold text-[#111b1e]">
                  {money(bag.price * bag.quantity)}
                </b>
              </div>

              <div className="mt-6 space-y-2">
                <a
                  href={`https://wa.me/447884208718?text=Hello%20Premium%20Plates%2C%20I%20would%20like%20to%20order%20the%20${bag.kind}%20plate%20for%20registration%20${bag.reg}%20(${bag.side}%20set)`}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button w-full justify-center text-sm py-3.5"
                >
                  Order via WhatsApp Concierge <ArrowRight size={16} />
                </a>
              </div>
            </>
          ) : (
            <div className="empty-bag py-16 text-center space-y-4">
              <ShoppingBag size={48} className="mx-auto text-[#7d8c7c]" strokeWidth={1} />
              <h3 className="text-2xl font-serif">Your bag is empty.</h3>
              <p className="text-xs text-[#62645f] max-w-xs mx-auto">
                Select your style and click &apos;Add to bag&apos; in the Plate Studio to reserve your specification.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
