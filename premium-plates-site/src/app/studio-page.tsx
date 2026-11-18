"use client";

import Link from "next/link";
import Image from "next/image";
import packageInfo from "../../package.json";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Menu,
  ShoppingBag,
  Plus,
  Minus,
  RotateCcw,
  Car,
  Layers,
  MoveHorizontal,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Plate, { type PlateOptions } from "@/components/Plate";
import CataloguePlate from "@/components/CataloguePlate";
import {
  applyLettering, applyProduct, collection, defaultDraft, draftKey, finishes,
  isDraft, motorcyclePhoto, previewDimensions, priceDraft, storefrontName, type Draft,
} from "@/config/catalogue";
import PlateInspection, { type Inspection } from "@/components/PlateInspection";
import FitSection from "@/components/FitSection";
import FaqSection from "@/components/FaqSection";
import ClosingSection from "@/components/ClosingSection";
import StickyOrderBar from "@/components/StickyOrderBar";
import LookbookGallery from "@/components/LookbookGallery";
import MaterialCloseup from "@/components/MaterialCloseup";
import { businessFacts } from "@/config/businessFacts";
import {
  identifierFee,
  type PlateBadge,
  type PlateKind,
  type PlateSide,
} from "@/config/pricing";
import { checkLegality } from "@/lib/legalityChecker";

const defaultInspection: Inspection = { face: "rear", angle: -14, headlights: false };

function CinematicFit({
  reg,
  kind,
  side,
  badge,
  border,
  options,
  replay,
}: {
  reg: string;
  kind: PlateKind;
  side: "front" | "rear" | "both";
  badge: PlateBadge;
  border: boolean;
  options: PlateOptions;
  replay: number;
}) {
  const [fitted, setFitted] = useState({ reg, kind, side, badge, border, options });
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
        setFitted({ reg, kind, side, badge, border, options });
        setTake((value) => value + 1);
        setInstalling(true);
      },
      replay ? 60 : 220
    );
    return () => window.clearTimeout(timer);
  }, [reg, kind, side, badge, border, options, replay]);

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
    <a className="workshop-wordmark" href="#home" aria-label={`${storefrontName} home`}>
      <span className="workshop-mark" aria-hidden="true"><span /><span /></span>
      <span>{storefrontName}</span>
    </a>
  );
}

const money = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

export default function StudioPage() {
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [draftReady, setDraftReady] = useState(false);
  const { reg, kind, side, badge, border, material } = draft;
  const displayOnly = kind === "show";
  function updateDraft<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }
  const plateOptions = useMemo<PlateOptions>(() => ({
    layout: draft.layout, size: draft.size, material: draft.material, lettering: draft.lettering,
    badgeColour: draft.badgeColour,
    slogan: displayOnly ? draft.slogan : undefined,
    sloganColour: displayOnly ? draft.sloganColour : undefined,
  }), [displayOnly, draft.layout, draft.size, draft.material, draft.lettering, draft.badgeColour, draft.slogan, draft.sloganColour]);
  const [view, setView] = useState<"car" | "detail">("car");
  const [inspection, setInspection] = useState<Inspection>(defaultInspection);
  const [fitReplay, setFitReplay] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<(Draft & { quantity: number }) | null>(null);
  const [error, setError] = useState("");
  const [compare, setCompare] = useState(55);
  const [comparePair, setComparePair] = useState<"reg-4d" | "gel-4d" | "reg-gel">("reg-4d");
  const [comparePlateSide, setComparePlateSide] = useState<"front" | "rear">("front");
  const [isDraggingCompare, setIsDraggingCompare] = useState(false);
  const compareAreaRef = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let nextDraft = defaultDraft;
    try {
      const stored = sessionStorage.getItem(draftKey);
      if (stored) {
        const saved = JSON.parse(stored) as { draft?: unknown; bag?: Draft & { quantity: number } } | null;
        if (isDraft(saved?.draft)) nextDraft = saved.draft;
        if (saved?.bag && isDraft(saved.bag) && Number.isSafeInteger(saved.bag.quantity) && saved.bag.quantity > 0) {
          setBag(saved.bag);
        }
      }
    } catch {
      // A disabled or unavailable browser store leaves the draft in memory.
    }
    const slug = new URLSearchParams(window.location.search).get("product");
    const product = collection.find((item) => item.slug === slug);
    if (product) {
      nextDraft = applyProduct(nextDraft, product.id);
      const url = new URL(window.location.href);
      url.searchParams.delete("product");
      window.history.replaceState(null, "", url);
    }
    setDraft(nextDraft);
    if (nextDraft.kind === "moto") setView("detail");
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    try {
      sessionStorage.setItem(draftKey, JSON.stringify({ draft, bag }));
    } catch {
      // The builder remains usable without browser storage.
    }
  }, [draft, bag, draftReady]);

  const updateCompareFromPointer = (clientX: number) => {
    if (!compareAreaRef.current) return;
    const rect = compareAreaRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (rawX / rect.width) * 100));
    setCompare(pct);
  };

  // Dynamic pricing calculation from centralized catalog
  const pricingResult = priceDraft(draft);
  const bagPricing = bag ? priceDraft(bag, bag.quantity) : null;

  // Dynamic UK road-legality check on active registration
  const legality = checkLegality(reg);

  const selected = collection.find((item) => item.id === kind) || collection[2];
  const previewSide = side === "front" ? "front" : "rear";
  const dimensions = previewDimensions(draft).join(" × ") + " mm";
  const setLettering = (lettering: Draft["lettering"]) =>
    setDraft((previous) => applyLettering(previous, lettering));

  const updateReg = (value: string) => {
    const formatted = value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase().slice(0, 8);
    updateDraft("reg", formatted);
    setError("");
  };

  const selectKind = (id: PlateKind) => {
    setDraft((previous) => applyProduct(previous, id));
    if (id === "moto") setView("detail");
  };

  const goStudio = () =>
    document.getElementById("studio")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });

  const addToBag = () => {
    if (!reg.trim()) {
      setError("Enter your registration to preview your selection.");
      document.getElementById("studio-reg")?.focus();
      return;
    }
    setBag({ ...draft, quantity: 1 });
    setBagOpen(true);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Masthead Header */}
      <header className="masthead workshop-masthead">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/collection">Shop plates</Link>
          <a href="#difference">Compare finishes</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#questions">FAQs</a>
        </nav>
        <div className="masthead-actions">
          <a className="workshop-nav-builder" href="#studio">Build a plate <ArrowUpRight size={15} /></a>
          <button
            className="bag-trigger"
            onClick={() => setBagOpen(true)}
            aria-label={`Open bag, ${bag?.quantity ?? 0} items`}
          >
            <ShoppingBag size={18} />
            <span>{bag?.quantity ?? 0}</span>
          </button>
          <button
            ref={menuTrigger}
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="studio-opening workshop-opening" id="home">
          <div className="opening-copy">
            <h1>Make the road<br /> <em>your own.</em></h1>
            <p>See how your registration looks in flat, 3D gel or 4D acrylic lettering.</p>
            <div className="opening-entry">
              <label htmlFor="hero-reg">Enter your registration</label>
              <input
                id="hero-reg"
                value={reg}
                onChange={(event) => updateReg(event.currentTarget.value)}
                placeholder="e.g. PP24 LUX"
                maxLength={8}
                autoComplete="off"
                spellCheck={false}
                autoCapitalize="characters"
              />
            </div>
            <div className="opening-finishes" role="group" aria-label="Preview finish">
              <span>Lettering finish</span>
              <div>
                {(Object.keys(finishes) as Draft["lettering"][]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={draft.lettering === id}
                    onClick={() => setLettering(id)}
                  >
                    {finishes[id]}
                  </button>
                ))}
              </div>
            </div>
            <div className="opening-actions">
              <a className="primary-button" href="#studio">Build a plate <ArrowUpRight size={18} /></a>
              <Link href="/collection">Shop plates</Link>
            </div>
          </div>
          <PlateInspection reg={reg} kind={kind} badge={badge} border={border} options={plateOptions} settings={inspection} onChange={setInspection} />
        </section>

        <section className="studio-section" id="studio">
          <div className="studio-intro">
            <h2>Build your <em>plate set.</em></h2>
            <p>Check the finish on the plate or see it fitted to the car. Then choose the options for your set.</p>
          </div>

          <div className="studio-layout">
            {/* Visual Stage */}
            <div className="studio-visual">
              <div className="preview-toolbar">
                <span className="font-medium">
                  {selected.name} · {finishes[draft.lettering]} lettering
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
                    <Layers size={15} /> Inspect plate
                  </button>
                </div>
              </div>

              {view === "car" ? (
                <>
                  <div className="vehicle-stage">
                    <Image
                      className="vehicle-image"
                      src="/Premium-Plates/media/night-drive-poster.jpg"
                      alt="Rear of a dark sports car at night"
                      fill
                      sizes="(max-width: 800px) 90vw, 50vw"
                    />
                    <div className="vehicle-live-plate">
                      <CinematicFit
                        reg={reg}
                        kind={kind}
                        side={previewSide}
                        badge={badge}
                        border={border}
                        options={plateOptions}
                        replay={fitReplay}
                      />
                    </div>
                    <span className="preview-caption">On-car illustration</span>
                  </div>
                  <div className="preview-command">
                    <button
                      type="button"
                      onClick={() => setFitReplay((value) => value + 1)}
                      aria-label="Replay plate fitting animation"
                    >
                      <RotateCcw size={13} /> Replay fitment
                    </button>
                  </div>
                </>
              ) : (
                <PlateInspection reg={reg} kind={kind} badge={badge} border={border} options={plateOptions} settings={inspection} onChange={setInspection} />
              )}

              <div className="preview-spec">
                <span>
                  <b>{dimensions}</b>Preview dimensions
                </span>
                <span>
                  <b>{material === "aluminium" ? "Pressed Aluminium" : material === "abs" ? "ABS" : "PMMA Acrylic"}</b>Baseplate
                </span>
                <span>
                  <b>{side === "both" ? "Front & Rear Pair" : side === "front" ? "Front Only" : "Rear Only"}</b>Configuration
                </span>
              </div>
            </div>

            {/* Configurator Controls */}
            <div className="studio-controls rounded-xl shadow-lg">
              <div className="control-heading">
                <h3>Plate builder</h3>
                <button
                  onClick={() => {
                    setDraft(defaultDraft);
                    setInspection(defaultInspection);
                    setView("car");
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
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "registration-error" : "registration-format"}
                autoComplete="off"
                spellCheck={false}
              />
              {error && <p className="field-error" id="registration-error" role="alert">{error}</p>}

              {/* Registration-format feedback */}
              <div
                id="registration-format"
                className={`p-3 rounded-lg text-xs mb-5 flex items-start gap-2.5 ${
                  legality.isLegal
                    ? "bg-[#25D366]/10 text-[#125828] border border-[#25D366]/30"
                    : "bg-[var(--wine)]/10 text-[var(--wine)] border border-[var(--wine)]/30"
                }`}
              >
                {legality.isLegal ? (
                  <ShieldCheck size={16} className="text-[#25D366] flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={16} className="text-[var(--wine)] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold block">
                    {legality.isLegal
                      ? `Registration format: ${legality.formatStyle.toUpperCase()}`
                      : "Registration format not recognised"}
                  </span>
                  <span className="text-[11px] leading-relaxed opacity-90">This check covers the registration format only.</span>
                </div>
              </div>

              {/* Finish Selection */}
              <fieldset className="finish-field">
                <legend className="flex justify-between items-center w-full">
                  <span>Plate style</span>
                  <span className="text-xs text-[var(--wine)] font-normal">{selected.intendedUse}</span>
                </legend>
                <div className="finish-buttons">
                  {collection.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${kind === item.id ? "active " : ""}${item.id === "moto" ? "motorcycle-finish" : ""}`}
                      aria-pressed={kind === item.id}
                      onClick={() => selectKind(item.id)}
                    >
                      {item.id === "moto" && <span className="motorcycle-finish-photo" style={{ backgroundImage: `url('${motorcyclePhoto}')` }} aria-hidden="true" />}
                      <span>{item.name}</span>
                      {kind === item.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Front/Rear and Material Pairs */}
              <div className="control-pair">
                <label>
                  Plate set
                  <select
                    value={side}
                    onChange={(e) => updateDraft("side", e.target.value as PlateSide)}
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
                  Base material
                  <select
                    value={material}
                    onChange={(e) => updateDraft("material", e.target.value as Draft["material"])}
                  >
                    <option value="acrylic">PMMA acrylic</option>
                    <option value="aluminium">Pressed aluminium (+{money(side === "both" ? 15 : 8)})</option>
                    <option value="abs">ABS (preview)</option>
                  </select>
                </label>
              </div>

              <div className="control-pair workshop-options">
                <label>Vehicle
                  <select value={draft.vehicle} onChange={(event) => selectKind(event.target.value === "motorcycle" ? "moto" : "regular")}>
                    <option value="car">Car</option><option value="motorcycle">Motorcycle</option>
                  </select>
                </label>
                <label>Layout
                  <select value={draft.layout} disabled={kind === "moto"} onChange={(event) => updateDraft("layout", event.target.value as Draft["layout"])}>
                    <option value="single-line">Single line</option><option value="two-line">Two lines</option>
                  </select>
                </label>
                <label>Preview size
                  <select value={draft.size} onChange={(event) => updateDraft("size", event.target.value as Draft["size"])}>
                    <option value="standard">Standard</option><option value="compact">Compact</option>
                  </select>
                </label>
                <label>Lettering
                  <select value={draft.lettering} onChange={(event) => setLettering(event.target.value as Draft["lettering"])}>
                    {Object.entries(finishes).map(([id, name]) => <option value={id} key={id}>{name}</option>)}
                  </select>
                </label>
                <label>Identifier
                  <select value={badge} onChange={(event) => updateDraft("badge", event.target.value as PlateBadge)}>
                    <option value="none">None</option>
                    <option value="uk">UK flag (+{money(identifierFee("uk", side === "both"))})</option>
                    <option value="eu" disabled={!displayOnly}>EU flag (+{money(identifierFee("eu", side === "both"))}, show only)</option>
                  </select>
                </label>
                {displayOnly && badge !== "none" && badge !== "eu" && (
                  <label>Identifier colour
                    <select value={draft.badgeColour} onChange={(event) => updateDraft("badgeColour", event.target.value as Draft["badgeColour"])}>
                      <option value="standard">Original</option><option value="ivory">Ivory</option>
                    </select>
                  </label>
                )}
                {displayOnly && <>
                  <label>Display slogan
                    <input value={draft.slogan} maxLength={25} onChange={(event) => updateDraft("slogan", event.target.value)} />
                  </label>
                  <label>Slogan colour
                    <select value={draft.sloganColour} onChange={(event) => updateDraft("sloganColour", event.target.value as Draft["sloganColour"])}>
                      <option value="ivory">Ivory</option><option value="gold">Gold</option>
                    </select>
                  </label>
                </>}
              </div>
              <div className="finishing-toggles">
                <button type="button" role="switch" aria-checked={border} onClick={() => updateDraft("border", !border)}>
                  <span>Pin-line border (+{money(side === "both" ? 4 : 2.5)})</span>
                  <i className={border ? "on" : ""} />
                </button>
              </div>
              <p className="workshop-option-note">
                {displayOnly ? "Show plates are for display only. " : "The EU identifier is available on show plates. "}
                <a href="https://www.gov.uk/displaying-number-plates/flags-identifiers-and-stickers">Read UK identifier guidance</a>.
              </p>

              {/* Dynamic Running Total */}
              <div className="studio-total">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#4a4e48] block">
                    Estimated total
                  </span>
                  <strong key={pricingResult.total} className="text-3xl font-serif font-bold text-[var(--ink)]">
                    {pricingResult.formattedTotal}
                  </strong>
                </div>
                <button className="primary-button" onClick={addToBag}>
                  Add to bag <ArrowUpRight size={19} />
                </button>
              </div>
              <p className="prototype-note">
                Preview dimensions, options and prices are subject to supplier confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* 3D vs 4D Interactive Split Compare (Transformed & Proportionate) */}
        <section className="difference-section section-pad bg-[var(--paper-soft)] text-[var(--ink)] border-y border-[var(--line)]" id="difference">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Context, Selector & Specs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[var(--wine)] font-semibold flex items-center gap-1.5">
                    <Layers size={14} />
                    Finish Comparison · Physical Relief
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
                    Some details<br />
                    change <em className="italic text-[var(--wine)]">everything.</em>
                  </h2>
                </div>
                <p className="text-base text-[#4a4e48] leading-relaxed">
                  Standard plates remain flat against the coachwork. 4D laser-cut acrylic projects forward, catching reflections and streetlights with sharp architectural depth.
                </p>

                {/* Compare Pair Selector */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[var(--ink)] uppercase tracking-wider block">
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
                        onClick={() => setComparePair(pair.id as typeof comparePair)}
                        className={`text-left px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-between border ${
                          comparePair === pair.id
                            ? "bg-[var(--wine)] text-white border-[var(--wine)] shadow-sm font-semibold"
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
                  <MoveHorizontal size={20} className="text-[var(--wine)] flex-shrink-0" />
                  <p className="text-xs text-[#525750]">
                    Drag the slider divider left or right across the plate to inspect edge reflection, light play, and tactile relief depth.
                  </p>
                </div>
              </div>

              {/* Right Column: Exhibition Display Plinth Stage */}
              <div className="lg:col-span-7 w-full space-y-4">
                {/* Stage Header Controls */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono uppercase text-[var(--wine)] font-semibold flex items-center gap-1.5">
                    <Sparkles size={13} />
                    High-Relief Studio Lighting
                  </span>
                  <button
                    type="button"
                    onClick={() => setComparePlateSide(comparePlateSide === "front" ? "rear" : "front")}
                    className="text-xs bg-[#cfcbc0] hover:bg-[#c2beb2] text-[var(--ink)] px-3 py-1 rounded-full font-mono transition-colors"
                  >
                    View: {comparePlateSide === "front" ? "Front (White)" : "Rear (Yellow)"}
                  </button>
                </div>

                {/* The Comparison Box Stage */}
                <div
                  ref={compareAreaRef}
                  className="compare-area rounded-2xl shadow-2xl overflow-hidden border border-[var(--wine-deep)]/30 relative h-[380px] md:h-[420px] bg-[var(--wine-deep)] select-none cursor-ew-resize touch-none"
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
                      <span className="font-mono text-xs font-bold text-[var(--wine-deep)] bg-[#f4f0e8] px-3 py-1 rounded-full shadow-md">
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
                      <span className="font-mono text-xs font-bold text-white bg-[var(--wine)] px-3 py-1 rounded-full shadow-md">
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
                      className={`w-11 h-11 rounded-full bg-[#f8f4eb] text-[#343e3d] flex items-center justify-center shadow-2xl border-2 border-[var(--wine)] transition-transform ${
                        isDraggingCompare ? "scale-110 shadow-red-950/50" : "hover:scale-105"
                      }`}
                    >
                      <MoveHorizontal size={20} className="text-[var(--wine)]" />
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
                    <span className="font-semibold block text-[var(--ink)]">90° Surgical Laser Edge</span>
                    <span className="text-[11px] text-[#636861]">Sharp architectural shadow lines under streetlights.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fffdf9]/70 border border-[#cfcbc0]">
                    <span className="font-semibold block text-[var(--ink)]">BS AU 145e Road Legal</span>
                    <span className="text-[11px] text-[#636861]">Fully ANPR camera and annual MOT certified.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fffdf9]/70 border border-[#cfcbc0]">
                    <span className="font-semibold block text-[var(--ink)]">Solid Jet-Black PMMA</span>
                    <span className="text-[11px] text-[#636861]">High-density cast acrylic that never fades or peels.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="collection-section section-pad" id="collection">
          <div className="collection-heading">
            <h2>Find your plate</h2>
            <Link className="text-action" href="/collection">Shop all plates <ArrowUpRight size={18} /></Link>
          </div>
          <div className="featured-collection">
            {collection.slice(0, 3).map((item) => (
              <Link key={item.id} className={`collection-piece piece-${item.id}`} href={`/collection/${item.slug}`}>
                <CataloguePlate kind={item.id} />
                <div className="piece-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>View plate <ArrowRight size={14} className="inline" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="more-formats" aria-label="Specialist plates">
            {collection.slice(3).map((item) => (
              <Link className="text-action" key={item.id} href={`/collection/${item.slug}`}>{item.name} <ArrowUpRight size={15} /></Link>
            ))}
          </div>
        </section>

        {/* Studio Section with Interactive 3D Plate & Live Price Calculator */}
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
              selectKind(chosenKind);
              updateDraft("reg", chosenReg);
              goStudio();
            }}
          />
        </div>

        <section className="studio-film section-pad" aria-labelledby="studio-film-title">
          <div>
            <h2 id="studio-film-title">The night-drive film</h2>
            <p>A short styling film featuring a display plate.</p>
          </div>
          <video
            aria-label="Night-drive film"
            controls
            playsInline
            preload="none"
            poster="/Premium-Plates/media/night-drive-poster.jpg"
          >
            <source src="/Premium-Plates/media/night-drive-cinematic.mp4" type="video/mp4" />
          </video>
        </section>

        {/* Redesigned FAQ & Trust Section (R2) */}
        <FaqSection />

        <ClosingSection />
      </main>

      {/* Sticky Order Bar (R5.3) */}
      <StickyOrderBar
        reg={reg}
        styleName={selected.name}
        displayOnly={displayOnly}
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
          <span>© {new Date().getFullYear()} {storefrontName}</span>
          <nav aria-label="Footer navigation">
            <Link href="/collection">Collection</Link>
            <a href="#studio">Studio</a>
            <a href="#anatomy">Materials</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#questions">FAQs</a>
          </nav>
          <Link className="release-link" href="/releases">Version {packageInfo.version}</Link>
        </div>
      </footer>

      {/* Mobile Navigation Sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          className="pp-sheet navigation-sheet"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            menuTrigger.current?.focus();
          }}
        >
          <SheetTitle className="text-3xl font-serif">{storefrontName}</SheetTitle>
          <SheetDescription className="text-xs text-[var(--wine)] font-mono">
            Explore the collection and your plate design.
          </SheetDescription>
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mt-8 space-y-4">
            {[
              ["Shop plates", "/collection"],
              ["Build a plate", "#studio"],
              ["Compare finishes", "#difference"],
              ["Lookbook", "#lookbook"],
              ["FAQs", "#questions"],
            ].map(([label, id]) => (
              <Link
                key={id}
                href={id}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-2xl font-serif py-3 border-b border-[#ffffff1f] hover:text-[var(--copper)]"
              >
                {label}
                <ArrowUpRight size={20} />
              </Link>
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
          <SheetTitle className="text-3xl font-serif">Your bag</SheetTitle>
          <SheetDescription className="text-xs">
            Review your plate configuration and estimated total.
          </SheetDescription>

          {bag && bagPricing ? (
            <>
              <div className="bag-plate my-6 p-6 rounded-lg bg-[var(--paper-soft)]">
                <Plate
                  reg={bag.reg}
                  kind={bag.kind}
                  side={bag.side === "front" ? "front" : "rear"}
                  badge={bag.badge}
                  border={bag.border}
                  options={{ ...bag, slogan: bag.kind === "show" ? bag.slogan : undefined }}
                />
              </div>

              <div className="bag-description space-y-1">
                <h3 className="text-xl font-serif font-bold text-[var(--ink)]">
                  {collection.find((i) => i.id === bag.kind)?.name} plate
                </h3>
                <p className="text-xs text-[#4a4e48]">
                  {bag.side === "both" ? "Front & Rear Pair" : `${bag.side} plate`} · Registration:{" "}
                  <span className="font-mono font-bold text-[var(--ink)]">{bag.reg}</span>
                </p>
                <p className="text-xs text-[var(--muted-text)]">{bag.kind === "show" ? "Display only" : "Road-style preview"} · {finishes[bag.lettering]} · {bag.layout.replace("-", " ")} · {bag.size} · {bag.material.toUpperCase()}</p>
                {bag.badge !== "none" && <p className="text-xs">{bag.badge.toUpperCase()} identifier (+{money(identifierFee(bag.badge, bag.side === "both"))})</p>}
              </div>

              <div className="bag-quantity my-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#4a4e48]">Quantity</span>
                <div className="flex items-center border border-[#c8c4ba] rounded">
                  <button
                    aria-label="Decrease quantity"
                    className="p-2 hover:bg-[var(--paper-soft)]"
                    onClick={() =>
                      setBag(bag.quantity > 1 ? { ...bag, quantity: bag.quantity - 1 } : null)
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 font-mono font-bold text-sm">{bag.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="p-2 hover:bg-[var(--paper-soft)]"
                    onClick={() => setBag({ ...bag, quantity: bag.quantity + 1 })}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  className="remove-item ml-auto text-xs text-[var(--wine)] underline"
                  onClick={() => setBag(null)}
                >
                  Remove
                </button>
              </div>

              <div className="bag-total pt-4 border-t border-[var(--line)] flex justify-between items-center">
                <span className="text-sm font-medium">Estimated total</span>
                <b className="text-2xl font-serif font-bold text-[var(--ink)]">
                  {bagPricing.formattedTotal}
                </b>
              </div>

              <ul className="mt-2 space-y-1 text-xs text-[var(--muted-text)]">
                {bagPricing.breakdown.map(({ label, amount }) => (
                  <li key={label} className="flex justify-between gap-3"><span>{label}</span><span>{money(amount)}</span></li>
                ))}
              </ul>

              <p className="workshop-option-note">Checkout will be available after catalogue and fulfilment approval.</p>
            </>
          ) : (
            <div className="empty-bag py-16 text-center space-y-4">
              <ShoppingBag size={48} className="mx-auto text-[#7d8c7c]" strokeWidth={1} />
              <h3 className="text-2xl font-serif">Your bag is empty.</h3>
              <p className="text-xs text-[#62645f] max-w-xs mx-auto">
                Choose your options in the plate builder and select Add to bag.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
