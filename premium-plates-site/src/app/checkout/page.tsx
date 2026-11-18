"use client";
import Link from "@/components/StoreLink";
import {useEffect,useState} from "react";
import {basketTotal,parseBasket,readBasket,type BasketLine} from "@/lib/basket";
import "./checkout.css";

const stages=["checkout","pending","failed","paid","review","approved","making","dispatched"] as const;
type Stage=typeof stages[number];
type Evidence="missing"|"interrupted"|"replacement"|"received";
type Order={items:BasketLine[];stage:Stage;identity:Evidence;entitlement:Evidence;expires:number};
const key="plate-workshop:sample-order:1";
const evidence=["missing","interrupted","replacement","received"];
function fresh(items:BasketLine[]):Order{return {items,stage:"checkout",identity:"missing",entitlement:"missing",expires:Date.now()+86400000};}
export default function Checkout(){
 const [order,setOrder]=useState<Order|null>(null),[storageError,setStorageError]=useState(false);
 useEffect(()=>{const bag=readBasket();let next=fresh(bag);
 try{const raw=JSON.parse(sessionStorage.getItem(key)||"null");
 if(raw&&stages.includes(raw.stage)&&evidence.includes(raw.identity)&&evidence.includes(raw.entitlement)&&Number.isFinite(raw.expires)){
 const items=parseBasket(raw);
 if(items.length&&(location.search.includes("resume=1")||JSON.stringify(items)===JSON.stringify(bag)))next={...raw,items};
 }}catch{}setOrder(next);},[]);
 function change(patch:Partial<Order>){if(!order)return;const next={...order,...patch};setOrder(next);try{sessionStorage.setItem(key,JSON.stringify(next));}catch{setStorageError(true);}}
 const back=<Link href="/#studio">Return to plate builder</Link>;
 if(!order)return <main className="order-desk"><p>Opening your order…</p></main>;
 if(!order.items.length)return <main className="order-desk"><h1>Your bag is empty</h1>{back}</main>;
 if(order.expires<=Date.now())return <main className="order-desk"><h1>Your sample return link expired</h1><p>Renew access to the sample order saved in this tab.</p><button onClick={()=>change({expires:Date.now()+86400000})}>Renew sample link</button></main>;
 const {stage}=order;const payment=["checkout","pending","failed"].includes(stage);
 const docs=order.identity==="received"&&order.entitlement==="received";
 return <main className="order-desk">{back}<p>Sample order · No payment or personal files required</p><h1>{payment?"Review and checkout":stage==="paid"||stage==="review"?"Verification desk":"Track your plates"}</h1>
 <section><h2>Your designs</h2>{order.items.map(i=><p key={i.id}>{i.quantity} × {i.reg} · {i.kind==="show"?"Display only":i.vehicle}</p>)}<strong>Estimated total {basketTotal(order.items).toLocaleString("en-GB",{style:"currency",currency:"GBP"})}</strong></section>
 {payment?<section><h2>Payment</h2><p role="status">{stage==="failed"?"Payment failed. Your designs are saved.":stage==="pending"?"Waiting for payment confirmation.":"After payment, the supplier checks identity and entitlement before manufacture."}</p>{stage==="pending"?<><button onClick={()=>change({stage:"paid"})}>Confirm sample payment</button><button onClick={()=>change({stage:"failed"})}>Simulate failed payment</button></>:<button onClick={()=>change({stage:"pending"})}>{stage==="failed"?"Retry sample payment":"Start sample payment"}</button>}</section>:
 <><p role="status">Payment received · {stage==="paid"?"Evidence required":stage==="review"?"Awaiting staff review":"Evidence approved"}</p>
 {stage==="paid"&&<section><h2>Supply your evidence</h2><p>A driving licence can establish name and address. A V5C can establish entitlement to the registration. The supplier must see accepted original documents. Use the sample files here.</p><a href="https://www.gov.uk/displaying-number-plates/getting-number-plates-made-up">See accepted documents on GOV.UK</a>
 {(["identity","entitlement"] as const).map(k=><fieldset key={k}><legend>{k==="identity"?"Identity and address":"Registration entitlement"}</legend><p role="status">{{missing:"Awaiting document",interrupted:"Transfer interrupted. Retry this sample file.",replacement:"Document unreadable. Supply a clearer sample.",received:"Sample file received"}[order[k]]}</p><button onClick={()=>change({[k]:"received"})}>{order[k]==="missing"?"Attach sample file":"Replace sample file"}</button><button onClick={()=>change({[k]:"interrupted"})}>Simulate interruption</button></fieldset>)}<button disabled={!docs} onClick={()=>change({stage:"review"})}>Submit for staff review</button></section>}
 {stage==="review"&&<section><h2>Staff review pending</h2><p>Your plates are on hold until the supplier approves both documents.</p><details><summary>Preview a staff decision</summary><button onClick={()=>change({stage:"paid",entitlement:"replacement"})}>Request clearer entitlement evidence</button><button onClick={()=>change({stage:"approved"})}>Show approved sample</button></details></section>}
 {["approved","making","dispatched"].includes(stage)&&<section><h2>{stage==="approved"?"Ready for manufacture":stage==="making"?"In manufacture":"Dispatched"}</h2>{stage!=="dispatched"&&<button onClick={()=>change({stage:stage==="approved"?"making":"dispatched"})}>Show next tracking update</button>}</section>}</>}
 <section><Link href="/checkout/?resume=1">Return to this sample order</Link><details><summary>Preview an expired return link</summary><button onClick={()=>change({expires:0})}>Expire sample link</button></details></section>{storageError&&<p role="alert">Browser storage is unavailable. Keep this tab open to continue.</p>}</main>;
}