import type { Metadata } from "next";
import Link from "@/components/StoreLink";
import { InteriorHeader } from "@/components/WorkshopBrand";
import MaterialCloseup from "@/components/MaterialCloseup";
import OrderingGuide from "@/components/OrderingGuide";
import FaqSection from "@/components/FaqSection";
import { storefrontName } from "@/config/catalogue";
import { ruleSources } from "@/config/plateRules";

export const metadata: Metadata = {title: "About Us | " + storefrontName, description: "Meet the plate studio and explore the materials behind your design."};

export default function AboutPage() {
  return <><InteriorHeader/><main className="about-workshop">
    <header className="about-opening"><div><p className="work-label">About {storefrontName}</p>
      <h1>A closer look at the plate.</h1>
      <p>Two plates can carry the same registration and catch the light quite differently. Our studio lets you see what changes before you choose.</p>
      <Link className="work-action" href="/#studio">Try your registration ↗</Link></div>
      <figure><img src="/Premium-Plates/media/motorcycle-workshop.webp" alt="Motorcycle photographed in the workshop"/><figcaption>From the lookbook · Motorcycle profiles</figcaption></figure>
    </header>
    <section className="work-intro section-pad"><h2>What we do</h2><div><p>Start with your own letters and numbers. In the builder you can change the profile, turn the plate from front to rear and see how a raised letter casts its shadow.</p><p>Once the design feels right, the bag brings your choices and estimate together. For a road plate, the next step is checking the documents that connect you to that registration.</p></div></section>
    <MaterialCloseup/><OrderingGuide/><FaqSection/>
    <section id="help" className="work-intro section-pad"><h2>Need a hand?</h2><div><p>Compare two finishes side by side, or check which original documents the supplier needs to see.</p><Link href="/#difference">Compare finishes ↗</Link> · <a href={ruleSources.evidence.url}>Accepted documents ↗</a></div></section>
  </main></>;
}
