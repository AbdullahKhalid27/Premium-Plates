import { ArrowRight, Layers, ScanLine, Files, ClipboardCheck } from "lucide-react";
import "./ordering-guide.css";
import { ruleSources } from "@/config/plateRules";

const steps = [
  {Icon: Layers, title: "Choose your plate", body: <>Pick the shape and position for your vehicle. Compare <strong>flat, gel and acrylic</strong> lettering in the builder.</>},
  {Icon: ScanLine, title: "Check your design", body: <>Copy the <strong>registration and spacing</strong> from your document. Check the dimensions, extras and estimate in your bag.</>},
  {Icon: Files, title: "Gather your documents", body: <>For a road plate, prepare <strong>identity, address and registration entitlement</strong> evidence. <a href={ruleSources.evidence.url}>See accepted originals</a>.</>},
  {Icon: ClipboardCheck, title: "Supplier review", body: <>The supplier checks the originals and follows up on missing details. <strong>Approval comes before manufacture.</strong></>},
];

export default function OrderingGuide() {
  return <section id="how-to-order" className="ordering-guide section-pad" aria-labelledby="order-guide-heading">
    <h2 id="order-guide-heading">How to Order</h2>
    <ol className="order-route">{steps.map(({Icon,title,body},i)=><li key={title}>
      <div className="route-index"><span>0{i+1}</span><Icon size={23} aria-hidden="true"/></div>
      <h3>{title}</h3><p>{body}</p>{i<3 && <ArrowRight className="route-arrow" aria-hidden="true"/>}
    </li>)}</ol>
  </section>;
}
