"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Check, ChevronDown, Menu, ShoppingBag, Pause, Play, Plus, Minus, RotateCcw, Car, Layers, MoveHorizontal, Volume2, VolumeX } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const collection = [
  { id: "regular", name: "Regular", description: "The original. Crisp, flat lettering.", price: 24, finish: "Printed", dimension: "520 × 111 mm" },
  { id: "gel", name: "3D Gel", description: "A rounded edge. A richer reflection.", price: 34, finish: "Domed resin", dimension: "520 × 111 mm" },
  { id: "acrylic", name: "4D Acrylic", description: "Sharp edges. Unmistakable depth.", price: 44, finish: "Raised acrylic", dimension: "520 × 111 mm" },
  { id: "short", name: "Short", description: "Less plate. More of your car.", price: 38, finish: "Compact format", dimension: "Size to suit registration" },
  { id: "hex", name: "Hex", description: "A different angle on the everyday.", price: 48, finish: "Angled profile", dimension: "Shaped format" },
  { id: "show", name: "Show", description: "For the stand. For the photograph.", price: 42, finish: "Display only", dimension: "Custom display format" },
  { id: "motorbike", name: "Motorbike", description: "Two wheels. The same attention.", price: 22, finish: "Two-line layout", dimension: "178 × 229 mm" },
];
type PlateProps = { reg?: string; kind?: string; side?: string; badge?: boolean; border?: boolean; className?: string };
function Plate({ reg = "PP24 LUX", kind = "acrylic", side = "rear", badge = false, border = false, className = "" }: PlateProps) {
  const text = reg.trim() || "YOUR REG";
  return <div className={`number-plate np-${kind} np-${side} ${badge ? "with-badge" : ""} ${border ? "with-border" : ""} ${className}`} aria-label={`${text}, ${kind} plate`}>
    {badge && <span className="country-badge"><svg viewBox="0 0 36 22" aria-hidden="true"><path fill="#253d65" d="M0 0h36v22H0z"/><path stroke="#fff" strokeWidth="5" d="m0 0 36 22M36 0 0 22"/><path stroke="#a73036" strokeWidth="2" d="m0 0 36 22M36 0 0 22"/><path stroke="#fff" strokeWidth="8" d="M18 0v22M0 11h36"/><path stroke="#a73036" strokeWidth="4" d="M18 0v22M0 11h36"/></svg><b>UK</b></span>}
    <span className="plate-lettering">{kind === "motorbike" ? <>{text.slice(0,4)}<br/>{text.slice(4).trim() || "LUX"}</> : text}</span><small>PREMIUM PLATES</small>
  </div>;
}

function CinematicFit({ reg, kind, side, badge, border, replay }: Required<Pick<PlateProps, "reg" | "kind" | "side" | "badge" | "border">> & { replay: number }) {
  const [fitted, setFitted] = useState({ reg, kind, side, badge, border });
  const [take, setTake] = useState(0);
  const [installing, setInstalling] = useState(false);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) { initial.current = false; return; }
    const timer = window.setTimeout(() => {
      setFitted({ reg, kind, side, badge, border });
      setTake(value => value + 1);
      setInstalling(true);
    }, replay ? 60 : 220);
    return () => window.clearTimeout(timer);
  }, [reg, kind, side, badge, border, replay]);

  useEffect(() => {
    if (!installing) return;
    const timer = window.setTimeout(() => setInstalling(false), 1050);
    return () => window.clearTimeout(timer);
  }, [installing, take]);

  return <>
    <div className="fit-recess" aria-hidden="true" />
    <div className="fit-plate" key={take} data-take={take}><Plate {...fitted}/></div>
    <div className="fit-light" key={`light-${take}`} aria-hidden="true"/>
    <span className="fit-status" aria-live="polite">{installing ? "Fitting your plate" : "On-car preview"}</span>
  </>;
}
function Brand() { return <a className="brand-lockup" href="#home" aria-label="Premium Plates home"><svg viewBox="0 0 42 34" aria-hidden="true"><path d="M3 30V4h13c12 0 12 15 0 15H9M23 30V4h8c11 0 11 15 0 15h-2"/></svg><span>PREMIUM<br/>PLATES<span className="brand-period">.</span></span></a>; }
const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);

export default function StudioPage() {
  const [reg, setReg] = useState("PP24 LUX");
  const [kind, setKind] = useState("acrylic");
  const [side, setSide] = useState("pair");
  const [badge, setBadge] = useState(false);
  const [border, setBorder] = useState(false);
  const [material, setMaterial] = useState("acrylic");
  const [view, setView] = useState("car");
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [fitReplay, setFitReplay] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [bag, setBag] = useState<{reg:string;kind:string;side:string;badge:boolean;border:boolean;price:number;quantity:number} | null>(null);
  const [error, setError] = useState("");
  const [compare, setCompare] = useState(55);
  const video = useRef<HTMLVideoElement>(null);
  const selected = collection.find(item => item.id === kind)!;
  const price = selected.price * (kind === "motorbike" || side === "pair" ? 1 : .6) + (material === "aluminium" ? 8 : 0) + (badge ? 2 : 0);
  const previewSide = side === "front" ? "front" : "rear";
  const updateReg = (value:string) => { setReg(value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase().slice(0,8)); setError(""); };
  const selectKind = (id:string) => { setKind(id); if (id === "motorbike") { setView("detail"); setSide("rear"); } };
  const goStudio = () => document.getElementById("studio")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  const addToBag = () => { if (!reg.trim()) { setError("Enter your registration to preview your selection."); return; } setBag({reg,kind,side,badge,border,price,quantity:1}); setBagOpen(true); };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { if(media.matches) { video.current?.pause(); setPlaying(false); } };
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const toggleVideo = () => { if (video.current?.paused) { void video.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); } else { video.current?.pause(); setPlaying(false); } };
  const toggleSound = () => {
    if (!video.current) return;
    const next = !soundOn;
    video.current.muted = !next;
    video.current.volume = 0.56;
    setSoundOn(next);
    if (next && video.current.paused) void video.current.play().catch(() => setPlaying(false));
  };

  return <>
    <a className="skip-link" href="#studio">Skip to plate studio</a>
    <header className="masthead"><Brand/><nav className="main-nav" aria-label="Main navigation"><div className="nav-dropdown" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}><button aria-expanded={dropdown} onClick={() => setDropdown(!dropdown)}>The collection <ChevronDown size={13}/></button>{dropdown && <div className="collection-menu">{collection.map(item => <button key={item.id} onClick={() => { selectKind(item.id); setDropdown(false); goStudio(); }}>{item.name}<ArrowUpRight size={15}/></button>)}</div>}</div><a href="#studio">Plate studio</a><a href="#difference">The difference</a><a href="#questions">Good to know</a></nav><div className="masthead-actions"><button className="bag-trigger" onClick={() => setBagOpen(true)} aria-label={`Open bag, ${bag?.quantity ?? 0} items`}><ShoppingBag size={18}/><span>{bag?.quantity ?? 0}</span></button><button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={23}/></button></div></header>
    <main>
      <section className="cinema" id="home"><video ref={video} className={`cinema-video ${playing ? "is-playing" : ""}`} autoPlay loop muted={!soundOn} playsInline poster="/media/night-drive-poster.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}><source src="/media/night-drive-cinematic.mp4" type="video/mp4"/></video><div className="cinema-shade"/><div className="hero-content"><div className="hero-title"><h1><span>The final</span><span>touch.</span><em>Entirely you.</em></h1><p>Premium number plates.<br/>For a car that could only be yours.</p></div><div className="hero-register"><label htmlFor="hero-reg">Start with your registration</label><div className="hero-input-row"><input id="hero-reg" value={reg} onChange={e => updateReg(e.target.value)} placeholder="YOUR REG" maxLength={8} autoComplete="off" spellCheck={false}/><button onClick={goStudio} aria-label="Preview your registration"><ArrowUpRight size={28}/></button></div><span>See your plate. Find your finish. Make it yours.</span></div></div><div className="cinema-bottom"><a href="#collection">Explore the collection <ArrowDown size={16}/></a><span className="film-caption">AFTER HOURS — A PLATE STUDY<span>Show plate concept · display only</span></span><div className="film-controls"><button className="film-control sound-control" onClick={toggleSound} aria-label={soundOn ? "Mute film soundtrack" : "Play film soundtrack"} aria-pressed={soundOn}>{soundOn ? <Volume2 size={15}/> : <VolumeX size={15}/>}<span>{soundOn ? "Sound on" : "Sound off"}</span></button><button className="film-control" onClick={toggleVideo} aria-label={playing ? "Pause background film" : "Play background film"}>{playing ? <Pause size={13}/> : <Play size={13}/>}<span>{playing ? "Pause film" : "Play film"}</span></button></div></div><div className={`film-progress ${playing ? "is-playing" : ""}`} aria-hidden="true"/></section>

      <section className="collection-section section-pad" id="collection"><div className="collection-heading"><h2>One registration.<br/><em>More character.</em></h2><div><p>Clean and understated. Or a little more presence. <br/>Find the finish that belongs on your car.</p><a className="text-action" href="#studio">Build your own <ArrowUpRight size={18}/></a></div></div><div className="featured-collection">{collection.slice(0,3).map((item,index) => <button key={item.id} className={`collection-piece piece-${item.id}`} onClick={() => { selectKind(item.id); goStudio(); }} onPointerMove={e => { if(e.pointerType === "mouse") { const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--tilt", `${((e.clientX-r.left)/r.width-.5)*8}deg`); e.currentTarget.style.setProperty("--light-x", `${((e.clientX-r.left)/r.width)*100}%`); e.currentTarget.style.setProperty("--light-y", `${((e.clientY-r.top)/r.height)*100}%`); e.currentTarget.style.setProperty("--light-x", `${((e.clientX-r.left)/r.width)*100}%`); e.currentTarget.style.setProperty("--light-y", `${((e.clientY-r.top)/r.height)*100}%`); } }} onPointerLeave={e => e.currentTarget.style.setProperty("--tilt","0deg")}><div className="piece-top"><span>{item.finish}</span><ArrowUpRight size={21}/></div><div className="piece-art"><Plate reg="PP24 LUX" kind={item.id} side={index === 1 ? "rear" : "front"}/></div><div className="piece-info"><h3>{item.name}</h3><p>{item.description}</p><span>From {money(item.price)}</span></div></button>)}</div><div className="more-formats"><span>Find your shape</span>{collection.slice(3).map(item => <button key={item.id} onClick={() => { selectKind(item.id); goStudio(); }}>{item.name}<ArrowUpRight size={15}/></button>)}</div></section>

      <section className="studio-section" id="studio"><div className="studio-intro"><h2>Your car.<br/><em>Your signature.</em></h2><p>Try your registration on the car. <br/>Change the finish. See what feels right.</p></div><div className="studio-layout"><div className="studio-visual"><div className="preview-toolbar"><span>{selected.name} / {selected.finish}</span><div className="view-switch" aria-label="Preview mode"><button aria-pressed={view === "car"} onClick={() => setView("car")} disabled={kind === "motorbike"}><Car size={15}/> On car</button><button aria-pressed={view === "detail"} onClick={() => setView("detail")}><Layers size={15}/> Plate</button></div></div><div className={`vehicle-stage ${view === "detail" ? "detail-mode" : ""}`}>
      {/* The supplied still fixes the vehicle geometry; the live plate is a DOM overlay. */}
      {view === "car" ? <><img className="vehicle-image" src="/media/night-drive-poster.jpg" alt="Rear of a dark sports car at night"/><div className="vehicle-live-plate"><CinematicFit reg={reg} kind={kind} side={previewSide} badge={badge} border={border} replay={fitReplay}/></div></> : <div className="detail-plate" key={`${kind}-${side}`}><Plate reg={reg} kind={kind} side={previewSide} badge={badge} border={border}/></div>}
      <span className="preview-caption">LIVE DESIGN PREVIEW</span></div><div className="preview-command"><span>{view === "car" ? "Your signature, fitted in real time." : "Every edge, up close."}</span><button type="button" onClick={() => setFitReplay(value => value + 1)} disabled={view !== "car"} aria-label="Replay plate fitting animation"><RotateCcw size={13}/> Replay fit</button></div><div className="preview-spec"><span><b>{selected.dimension}</b>Format</span><span><b>{material === "aluminium" ? "Aluminium" : "Acrylic"}</b>Material</span><span><b>{side === "pair" ? "Front + rear" : side === "front" ? "Front" : "Rear"}</b>Your set</span></div><p className="visual-note">Visual mockup. Final spacing and fit are confirmed for production.</p></div>
      <div className="studio-controls"><div className="control-heading"><h3>Make it personal.</h3><button onClick={() => { setReg("PP24 LUX"); setKind("acrylic"); setSide("pair"); setBadge(false); setBorder(false); setMaterial("acrylic"); setError(""); }} aria-label="Reset design"><RotateCcw size={16}/></button></div><label className="field-label" htmlFor="studio-reg">Your registration</label><input className="studio-input" id="studio-reg" value={reg} onChange={e=>updateReg(e.target.value)} placeholder="YOUR REG" aria-invalid={!!error} aria-describedby={error ? "reg-error" : undefined} autoComplete="off" spellCheck={false}/>{error && <p className="field-error" id="reg-error">{error}</p>}<fieldset className="finish-field"><legend>Choose your style</legend><div className="finish-buttons">{collection.map(item => <button key={item.id} className={kind === item.id ? "active" : ""} aria-pressed={kind === item.id} onClick={() => selectKind(item.id)}>{item.name}{kind === item.id && <Check size={13}/>}</button>)}</div></fieldset><div className="control-pair"><label>Front or rear?<select value={side} onChange={e=>setSide(e.target.value)}><option value="pair" disabled={kind === "motorbike"}>Front & rear pair</option><option value="front" disabled={kind === "motorbike"}>Front only</option><option value="rear">Rear only</option></select></label><label>Material<select value={material} onChange={e=>setMaterial(e.target.value)}><option value="acrylic">Premium acrylic</option><option value="aluminium">Pressed aluminium</option></select></label></div><div className="finishing-toggles"><button role="switch" aria-checked={badge} onClick={()=>setBadge(!badge)}><span>UK badge</span><i className={badge ? "on" : ""}/></button><button role="switch" aria-checked={border} onClick={()=>setBorder(!border)}><span>Fine border</span><i className={border ? "on" : ""}/></button></div>{kind === "show" && <p className="show-note">Show plates are for display use only.</p>}<div className="studio-total"><span>YOUR DESIGN<strong key={price}>{money(price)}</strong></span><button className="primary-button" onClick={addToBag}>Add to bag <ArrowUpRight size={19}/></button></div><p className="prototype-note">Illustrative MVP prices. No payment is taken.</p></div></div></section>

      <section className="difference-section section-pad" id="difference"><div className="difference-copy"><h2>Some details<br/>change <em>everything.</em></h2><p>Flat lettering is clean and familiar. Raised acrylic catches the light at its edges. Move the slider and look a little closer.</p><span className="drag-instruction"><MoveHorizontal size={19}/> Slide to compare the finish</span></div><div className="compare-area"><div className="compare-base"><span>REGULAR</span><Plate reg="PP24 LUX" kind="regular" side="front"/></div><div className="compare-raised" style={{clipPath:`inset(0 ${100-compare}% 0 0)`}}><span>4D ACRYLIC</span><Plate reg="PP24 LUX" kind="acrylic" side="front"/></div><div className="compare-line" style={{left:`${compare}%`}}><MoveHorizontal size={18}/></div><input aria-label="Compare regular and 4D acrylic finishes" type="range" min="5" max="95" value={compare} onChange={e=>setCompare(Number(e.target.value))}/></div></section>

      <section className="fit-section section-pad"><div className="fit-title"><h2>It should fit the car.<br/><em>And the person.</em></h2><a href="#studio" className="text-action">Find your fit <ArrowUpRight size={18}/></a></div><div className="fit-lines"><div><span>01</span><h3>Start with the shape.</h3><p>A standard rectangle, a shorter profile, or a two-line motorcycle plate. The format sets the tone.</p></div><div><span>02</span><h3>Give it some depth.</h3><p>Keep the lettering flat, add the soft gloss of gel, or choose the defined edge of raised acrylic.</p></div><div><span>03</span><h3>Finish it your way.</h3><p>A simple border. A UK badge. Front, rear, or both. Preview each detail before you decide.</p></div></div></section>

      <section className="faq-section section-pad" id="questions"><div><h2>A few things<br/><em>worth knowing.</em></h2><p>Small details. Clear answers.</p></div><Accordion type="single" collapsible className="faq-list"><AccordionItem value="finishes"><AccordionTrigger>What is the difference between 3D and 4D?</AccordionTrigger><AccordionContent>3D gel letters have a rounded, glossy face. 4D acrylic letters have a flatter face and defined edges. Use the studio to compare how each finish changes the appearance of your registration.</AccordionContent></AccordionItem><AccordionItem value="set"><AccordionTrigger>Can I choose a single plate or a pair?</AccordionTrigger><AccordionContent>Yes. Choose front, rear, or a pair in the plate studio. The front preview is white and the rear preview is yellow. Your current selection appears beneath the preview.</AccordionContent></AccordionItem><AccordionItem value="show"><AccordionTrigger>What are show plates?</AccordionTrigger><AccordionContent>Show plates are decorative display plates for events, photography, and off-road settings. The black-and-gold plate in the film is a show-plate concept, not a road-use specification.</AccordionContent></AccordionItem><AccordionItem value="size"><AccordionTrigger>How do I choose the right size?</AccordionTrigger><AccordionContent>Use your existing plate and mounting area as a starting point. Short plates depend on the registration length and required spacing. The preview is a visual guide; exact fit needs confirmation before manufacture.</AccordionContent></AccordionItem><AccordionItem value="demo"><AccordionTrigger>Can I order through this preview?</AccordionTrigger><AccordionContent>This is an interactive client preview. You can explore finishes, customise a plate, and save a selection in the demo bag. Payment and order submission are not connected.</AccordionContent></AccordionItem></Accordion></section>

      <section className="closing-section"><div className="closing-still"/><div><h2>Not just a registration.<br/><em>A little more you.</em></h2><button onClick={goStudio} className="primary-button light-button">Design your plates <ArrowUpRight size={21}/></button></div></section>
    </main><footer className="studio-footer"><div className="footer-top"><Brand/><p>The detail that makes it yours.</p><a href="#home">Back to top <ArrowUpRight size={18}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Premium Plates</span><nav aria-label="Footer navigation"><a href="#collection">Collection</a><a href="#studio">Plate studio</a><a href="#questions">FAQs</a></nav><span>Client preview / Frontend MVP</span></div></footer>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetContent className="pp-sheet navigation-sheet"><SheetTitle>Premium Plates</SheetTitle><SheetDescription>Find your finish.</SheetDescription><nav>{[["The collection","collection"],["Plate studio","studio"],["The difference","difference"],["Good to know","questions"]].map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight size={25}/></a>)}</nav><p>The detail that makes it yours.</p></SheetContent></Sheet>
    <Sheet open={bagOpen} onOpenChange={setBagOpen}><SheetContent className="pp-sheet basket-sheet"><SheetTitle>Your selection.</SheetTitle><SheetDescription>A finishing touch, chosen by you.</SheetDescription>{bag ? <><div className="bag-plate"><Plate reg={bag.reg} kind={bag.kind} side={bag.side === "front" ? "front" : "rear"} badge={bag.badge} border={bag.border}/></div><div className="bag-description"><h3>{collection.find(i=>i.id===bag.kind)?.name}</h3><p>{bag.side === "pair" ? "Front & rear pair" : `${bag.side} plate`} · {bag.reg}</p></div><div className="bag-quantity"><button aria-label="Decrease quantity" onClick={()=>setBag(bag.quantity > 1 ? {...bag,quantity:bag.quantity-1} : null)}><Minus size={16}/></button><span>{bag.quantity}</span><button aria-label="Increase quantity" onClick={()=>setBag({...bag,quantity:bag.quantity+1})}><Plus size={16}/></button><button className="remove-item" onClick={()=>setBag(null)}>Remove</button></div><div className="bag-total"><span>Estimated total</span><b>{money(bag.price*bag.quantity)}</b></div><p className="prototype-note">Demo selection only. No order will be placed.</p></> : <div className="empty-bag"><ShoppingBag size={37} strokeWidth={1}/><h3>A little room for character.</h3><p>Your chosen plate will appear here.</p></div>}<button className="primary-button" onClick={()=>{setBagOpen(false);goStudio();}}>{bag ? "Keep designing" : "Find your plate"}<ArrowRight size={18}/></button></SheetContent></Sheet>
  </>;
}

