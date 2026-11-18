"use client";

import Link from "next/link";
import NightBuilder, { NightHero } from "@/components/NightBuilder";
import packageInfo from "../../package.json";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Menu,
  ShoppingBag,
  Plus,
  Minus,
  MoveHorizontal,
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Plate from "@/components/Plate";
import { StyleCards } from "@/components/StyleCards";
import {
  applyProduct, collection, defaultDraft, draftKey, finishes,
  isDraft, restoredDraft, priceDraft, storefrontName, type Draft,
} from "@/config/catalogue";

import FitSection from "@/components/FitSection";
import FaqSection from "@/components/FaqSection";
import NightDriveFilm from "@/components/NightDriveFilm";
import StickyOrderBar from "@/components/StickyOrderBar";
import LookbookGallery from "@/components/LookbookGallery";
import MaterialCloseup from "@/components/MaterialCloseup";
import { businessFacts } from "@/config/businessFacts";
import {
  identifierFee,
  type PlateKind,
} from "@/config/pricing";


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
  const { reg, kind, side } = draft;
  const displayOnly = kind === "show";
  function updateDraft<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }
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
        if (isDraft(saved?.draft)) nextDraft = restoredDraft(saved.draft);
        if (saved?.bag && isDraft(saved.bag) && Number.isSafeInteger(saved.bag.quantity) && saved.bag.quantity > 0) {
          setBag({ ...restoredDraft(saved.bag), quantity: saved.bag.quantity });
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


  const selected = collection.find((item) => item.id === kind) || collection[2];
  const updateReg = (value: string) => {
    const formatted = value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase().slice(0, 8);
    updateDraft("reg", formatted);
    setError("");
  };

  const selectKind = (id: PlateKind) => {
    setDraft((previous) => applyProduct(previous, id));

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
        <NightHero draft={draft} onReg={updateReg} />
        <NightBuilder draft={draft} setDraft={setDraft} onReg={updateReg} onAdd={addToBag} error={error} />

        {/* 3D vs 4D Interactive Split Compare (Transformed & Proportionate) */}
        <section className="difference-section section-pad bg-[var(--paper-soft)] text-[var(--ink)] border-y border-[var(--line)]" id="difference">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Context, Selector & Specs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
                    Compare the finishes
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
              </div>
            </div>
          </div>
        </section>

        <section className="collection-section section-pad" id="collection">
          <div className="collection-heading">
            <h2>Find your plate</h2>
            <Link className="text-action" href="/collection">Shop all plates <ArrowUpRight size={18} /></Link>
          </div>
          <StyleCards featured reg={reg} onApply={chosen => { selectKind(chosen); goStudio(); }} />
          <div className="more-formats" aria-label="Specialist plates">
            {collection.slice(3).map((item) => (
              <Link className="text-action" key={item.id} href={`/collection/${item.slug}`}>{item.name} <ArrowUpRight size={15} /></Link>
            ))}
          </div>
        </section>

        {/* Studio Section with Interactive 3D Plate & Live Price Calculator */}
        {/* Redesigned Fit Section (R2) */}
        <FitSection reg={reg} onApply={(profile, size) => { selectKind(profile); updateDraft("size", size); goStudio(); }} />

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

        <NightDriveFilm />

        {/* Redesigned FAQ & Trust Section (R2) */}
        <FaqSection />


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



