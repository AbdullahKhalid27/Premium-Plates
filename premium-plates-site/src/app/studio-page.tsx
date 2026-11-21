"use client";

import { registrationEntry } from "@/lib/legalityChecker";
import BagDrawer from "@/components/BagDrawer";
import { parseBasket, type BasketLine } from "@/lib/basket";
import Link from "@/components/StoreLink";
import NightBuilder, { NightHero } from "@/components/NightBuilder";
import packageInfo from "../../package.json";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  ShoppingBag,
  Plus,
  Minus,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Plate from "@/components/Plate";
import { StyleCards } from "@/components/StyleCards";
import {
  applyLettering, applyProduct, collection, defaultDraft, draftKey, finishes,
  isDraft, restoredDraft, priceDraft, storefrontName, type Draft,
} from "@/config/catalogue";

import FinishComparison from "@/components/FinishComparison";
import FitSection from "@/components/FitSection";
import FaqSection from "@/components/FaqSection";
import GuidanceSources from "@/components/GuidanceSources";
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
  const [draft, setDraft] = useState<Draft>({...defaultDraft, reg: ""});
  const [draftReady, setDraftReady] = useState(false);
  const { reg, kind, side } = draft;
  const displayOnly = kind === "show";
  function updateDraft<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [items, setItems] = useState<BasketLine[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [writable, setWritable] = useState(true);
  const [error, setError] = useState("");
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let nextDraft = {...defaultDraft, reg: ""};
    try {
      const stored = sessionStorage.getItem(draftKey);
      if (stored) {
        const saved = JSON.parse(stored) as { draft?: unknown; bag?: Draft & { quantity: number } } | null;
        if (isDraft(saved?.draft)) nextDraft = restoredDraft(saved.draft);
        setItems(parseBasket(saved));
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
      sessionStorage.setItem(draftKey, JSON.stringify({ draft, items }));
    } catch {
      setWritable(false);
    }
  }, [draft, items, draftReady]);

  // Dynamic pricing calculation from centralized catalog
  const pricingResult = priceDraft(draft);
  const count = items.reduce((sum, line) => sum + line.quantity, 0);

  const selected = collection.find((item) => item.id === kind) || collection[2];
  const updateReg = (value: string) => {
    const formatted = value.replace(/[a-z]/g, letter => letter.toUpperCase());
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
    const entry = registrationEntry(reg, displayOnly);
    if (!entry.ready) {
      setError(entry.message);
      document.getElementById("studio")?.scrollIntoView({block:"start"});
      document.getElementById("registration-tray")?.click();
      requestAnimationFrame(() => document.getElementById("studio-reg")?.focus());
      return;
    }
    const id = editing ?? crypto.randomUUID();
    setItems(lines => editing ? lines.map(line => line.id === editing ? {...draft,reg:reg.trim(),id,quantity:line.quantity} : line) : [...lines,{...draft,reg:reg.trim(),id,quantity:1}]);
    setEditing(null);
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
            aria-label={`Open bag, ${count} items`}
          >
            <ShoppingBag size={18} />
            <span>{count}</span>
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

        <FinishComparison draft={draft} onSelect={finish => setDraft(previous => applyLettering(previous, finish))} />

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
        <LookbookGallery
            onSelectSpec={(chosenKind, chosenReg) => {
              selectKind(chosenKind);
              updateDraft("reg", chosenReg);
              goStudio();
            }}
          />

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
        <GuidanceSources />
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
      <BagDrawer open={bagOpen} onOpen={setBagOpen} items={items} writable={writable}
        edit={line => {setEditing(line.id); setDraft(line); setBagOpen(false); goStudio();}}
        quantity={(id,quantity) => setItems(lines => quantity ? lines.map(line => line.id===id ? {...line,quantity} : line) : lines.filter(line => line.id!==id))}/>
    </>
  );
}