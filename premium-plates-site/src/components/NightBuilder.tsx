"use client";
import { useEffect, useRef, useState, type CSSProperties, type Dispatch, type SetStateAction } from "react";
import Plate from "./Plate";
import RulesPanel from "./RulesPanel";
import { applyLettering, applyProduct, collection, defaultDraft, finishes, motorcyclePhoto, previewDimensions, priceDraft, type Draft } from "@/config/catalogue";
import { identifierFee } from "@/config/pricing";
import { checkLegality } from "@/lib/legalityChecker";
import "./night-builder.css";

const currency = (n: number) => n.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
const plateOptions = (d: Draft) => ({...d, slogan: d.kind === "show" ? d.slogan : ""});
export function NightHero({draft, onReg}: {draft: Draft; onReg: (s:string)=>void}) {
  return <section id="home" className="night-hero">
    <div><h1>Make the road your own.</h1><label htmlFor="hero-reg">Your registration</label>
    <input id="hero-reg" value={draft.reg} onChange={e=>onReg(e.target.value)} placeholder="PP24 LUX" maxLength={8} autoComplete="off" spellCheck={false}/></div>
    <div className="hero-specimen" data-bike={draft.kind==="moto"}><Plate stamp reg={draft.reg} kind={draft.kind} side={draft.side} badge={draft.badge} border={draft.border} options={plateOptions(draft)}/></div>
  </section>;
}
const trays = ["Registration","Style","Finish","Size","Extras","Price"] as const;
type Tray = typeof trays[number];
type Props = {draft:Draft; setDraft:Dispatch<SetStateAction<Draft>>; onReg:(s:string)=>void; onAdd:()=>void; error:string};
function Price({amount}:{amount:number}) {
  const last = useRef(amount);
  const [shown,setShown] = useState(amount);
  useEffect(()=>{
    const start = last.current;
    const at = performance.now();
    let frame = 0;
    const tick = (now:number)=>{
      const t = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : Math.min(1,(now-at)/210);
      last.current = start+(amount-start)*t;
      setShown(last.current);
      if(t<1) frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[amount]);
  return <strong><span aria-hidden="true">{currency(shown)}</span><span className="sr-only">{currency(amount)}</span></strong>;
}
export default function NightBuilder({draft:d,setDraft,onReg,onAdd,error}:Props) {
  const [tray,setTray]=useState<Tray>("Registration");
  const [angle,setAngle]=useState(-8), [lamp,setLamp]=useState(42), [wipe,setWipe]=useState(45);
  const [face,setFace]=useState<"front"|"rear">("rear");
  const drag=useRef<{start:number;angle:number}|null>(null);
  const price=priceDraft(d), valid=checkLegality(d.reg), show=d.kind==="show";
  const activeSide = d.side === "both" ? face : d.side;
  const update=<K extends keyof Draft>(key:K,value:Draft[K])=>setDraft(old=>({...old,[key]:value}));
  const selectVehicle=(vehicle:Draft["vehicle"])=>setDraft(old=>({...applyProduct(old,vehicle==="motorcycle"?"moto":old.kind==="moto"?"regular":old.kind),vehicle}));
  const add=()=>{if(!d.reg.trim()){setTray("Registration"); requestAnimationFrame(()=>document.getElementById("studio-reg")?.focus());} onAdd();};
  const opts=plateOptions(d);
  const specimen=(flat=false)=><Plate reg={d.reg} kind={d.kind} side={activeSide} badge={d.badge} border={d.border} options={flat?{...opts,lettering:"regular"}:opts}/>;
  const stageStyle={"--rotation":angle+"deg","--lamp":lamp+"%","--edge":(lamp-50)/18+"px","--wipe":wipe+"%"} as CSSProperties;
  return <section id="studio" className="night-builder"><header><h2>Plate builder</h2><span>{collection.find(p=>p.id===d.kind)?.name} · {previewDimensions(d).join(" × ")} mm</span><button type="button" className="bench-reset" onClick={()=>{setDraft(defaultDraft);onReg(defaultDraft.reg);setAngle(-8);setLamp(42);setFace("rear");setWipe(45);setTray("Registration");}}>Reset design</button></header>
    <div className="bumper-stage" style={stageStyle} data-bike={d.kind==="moto"} onPointerDown={e=>{if(e.button!==0)return;drag.current={start:e.clientX,angle};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(drag.current)setAngle(Math.min(32,Math.max(-32,drag.current.angle+(e.clientX-drag.current.start)*.16)));}} onLostPointerCapture={()=>{drag.current=null;}}>
      <div className="bumper-shell"><div className="bumper-inset"><div className="bumper-plate">{specimen()}{tray==="Finish"&&<div className="wipe-flat">{specimen(true)}</div>}
        <i className="surface-flash" key={JSON.stringify(d)} aria-hidden="true"/></div></div></div>
    </div>
    <div className="bench-controls"><label>Rotate<input aria-label="Rotate preview" type="range" min="-32" max="32" value={angle} onChange={e=>setAngle(+e.target.value)}/></label><label>Lamp<input aria-label="Move inspection lamp" type="range" min="0" max="100" value={lamp} onChange={e=>setLamp(+e.target.value)}/></label>
    {d.side==="both"&&<button onClick={()=>setFace(face==="rear"?"front":"rear")}>View {face==="rear"?"front":"rear"}</button>}</div>
    <div className="bench-dock" aria-label="Configuration trays">{trays.map(t=><button key={t} id={t==="Registration"?"registration-tray":undefined} aria-expanded={tray===t} aria-controls="bench-tray" onClick={()=>setTray(t)}>{t}</button>)}</div>
    <div id="bench-tray" className="bench-tray" role="region" aria-label={tray}>
    {tray==="Registration"&&<><label>Registration<input id="studio-reg" value={d.reg} maxLength={8} spellCheck={false} autoComplete="off" onChange={e=>onReg(e.target.value)} aria-describedby="reg-feedback"/></label>
    <p id="reg-feedback" role="status" data-valid={valid.isLegal}>{valid.isLegal?"✓ Registration format recognised.":valid.formatStyle==="misspaced"?"Check spacing. Try "+valid.formattedReg+".":"Check the letters and numbers against your registration document."}</p></>}
    {tray==="Style"&&collection.map(p=><button key={p.id} aria-pressed={d.kind===p.id} onClick={()=>setDraft(old=>applyProduct(old,p.id))}>{p.id==="moto"&&<img width="44" height="30" src={motorcyclePhoto} alt=""/>}{p.name}</button>)}
    {tray==="Finish"&&<><label>Lettering<select value={d.lettering} onChange={e=>setDraft(old=>applyLettering(old,e.target.value as Draft["lettering"]))}>{Object.entries(finishes).map(([v,n])=><option value={v} key={v}>{n}</option>)}</select></label>
    <label>Base material<select value={d.material} onChange={e=>update("material",e.target.value as Draft["material"])}><option value="acrylic">PMMA acrylic</option><option value="aluminium">Pressed aluminium</option><option value="abs">ABS preview</option></select></label>
    <label>Flat / selected finish<input aria-label="Compare flat and selected lettering" type="range" value={wipe} min="0" max="100" onChange={e=>setWipe(+e.target.value)}/></label></>}
    {tray==="Size"&&<><label>Vehicle<select value={d.vehicle} onChange={e=>selectVehicle(e.target.value as Draft["vehicle"])}><option value="car">Car</option><option value="motorcycle">Motorcycle</option><option value="van">Van</option></select></label>
    <label>Layout<select value={d.layout} disabled={d.kind==="moto"} onChange={e=>update("layout",e.target.value as Draft["layout"])}><option value="single-line">Single line</option><option value="two-line">Two lines</option></select></label>
    <label>Preview size<select value={d.size} onChange={e=>update("size",e.target.value as Draft["size"])}>{(["standard","compact"] as const).map(size=><option key={size} value={size}>{previewDimensions({...d,size}).join(" × ")} mm</option>)}</select></label>
    <label>Plate set<select value={d.side} onChange={e=>update("side",e.target.value as Draft["side"])}>{d.kind!=="moto"&&<><option value="both">Front and rear</option><option value="front">Front only</option></>}<option value="rear">Rear only</option></select></label></>}
    {tray==="Extras"&&<><label>Identifier<select value={d.badge} onChange={e=>update("badge",e.target.value as Draft["badge"])}><option value="none">None</option><option value="uk">UK flag (+{currency(identifierFee("uk",d.side==="both"))})</option>{d.badge==="gb"&&<option value="gb">GB flag</option>}<option value="eu" disabled={!show}>EU flag (+£6, show only)</option></select></label>
    <label className="border-check"><input type="checkbox" checked={d.border} onChange={e=>update("border",e.target.checked)}/>Pin-line border (+{currency(d.side==="both"?4:2.5)})</label>
    {show&&<><label>Display slogan<input maxLength={25} value={d.slogan} onChange={e=>update("slogan",e.target.value)}/></label><label>Slogan colour<select value={d.sloganColour} onChange={e=>update("sloganColour",e.target.value as Draft["sloganColour"])}><option>ivory</option><option>gold</option></select></label>{d.badge!=="none"&&d.badge!=="eu"&&<label>Flag colour<select value={d.badgeColour} onChange={e=>update("badgeColour",e.target.value as Draft["badgeColour"])}><option>standard</option><option>ivory</option></select></label>}</>}</>}
    {tray==="Price"&&<dl>{price.breakdown.map(row=><div key={row.label}><dt>{row.label}</dt><dd>{currency(row.amount)}</dd></div>)}</dl>}
    </div>
    <RulesPanel draft={d} />
    {error&&<p role="alert">{error}</p>}
    <div className="bench-total"><div>Estimated total <Price amount={price.total}/></div><button onClick={add}>Add to bag ↗</button></div>
  </section>;
}


