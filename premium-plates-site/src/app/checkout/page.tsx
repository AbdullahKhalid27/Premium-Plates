"use client";
import { useEffect,useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "@/components/StoreLink";
import { InteriorHeader } from "@/components/WorkshopBrand";
import SampleChecklist from "@/components/SampleChecklist";
import { readBasket,basketTotal,type BasketLine } from "@/lib/basket";
import { registrationEntry } from "@/lib/legalityChecker";
import "./checkout.css";

export default function Checkout(){
  const [items,setItems]=useState<BasketLine[]|null>(null);
  const [receipt,setReceipt]=useState(""),[order,setOrder]=useState("");
  useEffect(()=>{
    const bag=readBasket();setItems(bag);
    const key="nightmark:checkout:"+JSON.stringify(bag);
    let id=crypto.randomUUID() as string;
    try {id=sessionStorage.getItem(key)||id;sessionStorage.setItem(key,id);setReceipt(sessionStorage.getItem("nightmark:receipt:"+id)||"");}catch{}
    setOrder(id);
  },[]);
  const invalid=items?.find(i=>!registrationEntry(i.reg,i.kind==="show").ready);
  const sample=new URLSearchParams(typeof window==="undefined"?"":window.location.search).get("sample")==="1";
  const active=items && (items.length>0||sample) && !invalid;
  return <><InteriorHeader/><main className="order-desk">
    <Link href="/#studio">← Plate builder</Link>
    {active?<><header className="desk-head"><div><p className="work-label">After checkout</p>
      <h1>{receipt?"Documents received":"Your verification desk"}</h1>
      <p>{receipt?"Both sample files have reached the preview receiver.":"Have your two documents ready. The checklist walks you through each one."}</p>
    </div><aside><CheckCircle2/><strong>Payment complete · preview</strong><span>No money was charged.</span></aside></header>
    <section className="order-summary"><h2>Your order</h2><div>{items.length?items.map(i=><p key={i.id}><strong>{i.reg}</strong> · {i.quantity} × {i.vehicle}</p>):<p>Illustrative plate order</p>}</div>{!!items.length&&<strong>{basketTotal(items).toLocaleString("en-GB",{style:"currency",currency:"GBP"})} estimate</strong>}</section>
    {receipt?<section className="receipt" role="status"><CheckCircle2/><h2>Submission receipt</h2><p>Reference <strong>{receipt}</strong></p><p>The sample transfer is complete. A live order would now wait for the supplier’s review.</p></section>:
    <SampleChecklist order={order} onReceived={value=>{setReceipt(value);try{sessionStorage.setItem("nightmark:receipt:"+order,value);}catch{}}}/>}</>:
    <section className="receipt"><h1>{!items?"Opening your order":invalid?"Check your registration":"Your bag is empty"}</h1><p>{invalid?registrationEntry(invalid.reg,invalid.kind==="show").message:"Choose a design in the plate builder to begin an order."}</p><Link className="work-action" href="/#studio">Open plate builder ↗</Link></section>}
  </main></>;
}
