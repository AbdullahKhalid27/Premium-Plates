"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  HelpCircle,
  Award,
  FileCheck,
  Check,
} from "lucide-react";
import businessFacts from "../config/businessFacts";

type FaqCategory = "all" | "legality" | "materials" | "ordering" | "fitting";

interface FaqItem {
  id: string;
  category: "legality" | "materials" | "ordering" | "fitting";
  question: string;
  answer: string;
  badge?: string;
}

const faqs: FaqItem[] = [
  {
    id: "road-legal-4d",
    category: "legality",
    question: "Is 4D laser-cut acrylic 100% legal for UK MOT and road use?",
    answer:
      "Yes, completely. Under British Standard BS AU 145e (enforced from March 2022), raised 3D and 4D characters are strictly legal provided they are solid jet-black, use the authentic Charles Wright typeface, conform to 79×50mm dimensions with 11mm stroke, and maintain standard spacing. All our 4D plates are verified for 100% ANPR camera readability and pass annual MOT inspections without issue.",
    badge: "BS AU 145e",
  },
  {
    id: "diff-3d-4d",
    category: "materials",
    question: "What is the structural difference between 3D Gel and 4D Acrylic?",
    answer:
      "3D Gel characters are cast from flexible polyurethane resin that forms a smooth, curved 1.5mm high-gloss dome. The resin is self-healing, resisting fine micro-scratches from road debris. 4D Acrylic plates feature architectural 3.0mm solid-black PMMA acrylic blocks with razor-sharp 90-degree CNC laser-cut bevels for high-impact geometric depth and dramatic light reflections.",
    badge: "Materials",
  },
  {
    id: "docs-required",
    category: "ordering",
    question: "What documents do I need to supply to order road-legal plates?",
    answer:
      `Under UK law (The Road Vehicles Regulations 2001), registered plate suppliers (${businessFacts.dvlaRnpsNumber}) are required to verify two items: proof of vehicle entitlement (such as your V5C logbook, V778 retention certificate, or V5C/2 green slip) and proof of identity (driver's licence, passport, or utility bill). You can design and explore all specifications in our digital studio immediately; document verification is completed seamlessly prior to fabrication.`,
    badge: "DVLA Rules",
  },
  {
    id: "short-plates",
    category: "legality",
    question: "Can I legally run a shortened plate for a 5 or 6 digit registration?",
    answer:
      "Yes! DVLA legislation does not mandate that plates must be 520mm in length. Rather, the law specifies that there must be a mandatory 11mm margin around the outer edges of the registration characters. Therefore, if you possess a 5 or 6 character private mark, shortened plates (405mm or 460mm) are 100% road legal and provide a clean, tailor-made aesthetic on performance vehicles.",
    badge: "Custom Size",
  },
  {
    id: "fitting-guide",
    category: "fitting",
    question: "How do I fit the plates to my car without drilling bumper holes?",
    answer:
      "Every Premium Plates set includes our commercial-grade 3M VHB dual-lock weather pad installation kit. These ultra-high-bond adhesive pads mount the plate completely flush against your vehicle bodywork or bumper plinth without screws or drilling, eliminate vibrations, and withstand jet washers, heat, and frost.",
    badge: "Installation",
  },
  {
    id: "dispatch-time",
    category: "ordering",
    question: "How fast is fabrication and dispatch?",
    answer:
      `${businessFacts.dispatchTime}. Orders placed before 2:00 PM Monday through Friday are laser-cut, assembled, hand-inspected, and dispatched the same afternoon via Royal Mail Tracked 24 or DPD with complete tracking and delivery within 1–2 business days.`,
    badge: "Fast Dispatch",
  },
  {
    id: "warranty",
    category: "materials",
    question: "What does the 3-Year Anti-Delamination Guarantee cover?",
    answer:
      `${businessFacts.warrantyDescription}. We engineer our plates using optical-grade PMMA cast acrylic and automotive UV-stabilised resins. If your plate ever suffers from delamination, yellowing, water ingress, or character lifting under normal road driving, we will replace the set free of charge.`,
    badge: "3-Yr Guarantee",
  },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="faq-section section-pad bg-[#dedad0] text-[#111b1e] border-b border-[#d0cdc5]" id="questions">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Official DVLA Seal & Concierge Assistance */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#713d3e] font-semibold flex items-center gap-1.5">
                <HelpCircle size={14} />
                DVLA Compliance & Client Guidance
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05]">
                A few things<br />
                <em className="italic text-[#713d3e]">worth knowing.</em>
              </h2>
              <p className="text-base text-[#4a4e48] leading-relaxed max-w-md">
                Uncompromising British craftsmanship. We remove all guesswork around UK road legality, materials, dimensions, and ordering.
              </p>
            </div>

            {/* DVLA & British Standard Trust Card */}
            <div className="bg-[#fffdf9] p-6 md:p-7 rounded-2xl border border-[#c4cfce] shadow-md space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-[#eceae3]">
                <div className="w-12 h-12 rounded-xl bg-[#142126] text-[#caa785] flex items-center justify-center shadow-md">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#111b1e] flex items-center gap-2">
                    {businessFacts.britishStandard} Certified
                    <Award size={16} className="text-[#caa785]" />
                  </h4>
                  <p className="text-xs text-[#713d3e] font-mono font-semibold">
                    DVLA Registered Supplier: {businessFacts.dvlaRnpsNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#4a4e48]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#2e6b5a] flex-shrink-0" />
                  <span>100% MOT & ANPR road camera compliant</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#2e6b5a] flex-shrink-0" />
                  <span>{businessFacts.dispatchTime}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck size={16} className="text-[#2e6b5a] flex-shrink-0" />
                  <span>{businessFacts.standardDelivery}</span>
                </div>
              </div>

              {/* Quick Road-Legal Checklist */}
              <div className="pt-3 border-t border-[#eceae3] space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#111b1e] block">
                  Mandatory Legal Plate Specifications
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#525750]">
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-[#2e6b5a]" /> Charles Wright Font
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-[#2e6b5a]" /> 11mm Outer Margins
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-[#2e6b5a]" /> RNPS Supplier Stamp
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={12} className="text-[#2e6b5a]" /> BS AU 145e Retroreflective
                  </span>
                </div>
              </div>

              {/* Concierge Actions */}
              <div className="pt-3 border-t border-[#eceae3] flex flex-col sm:flex-row gap-3">
                <a
                  href={businessFacts.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#ffffff" }}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold bg-[#142126] hover:bg-[#203138] text-white px-4 py-3 rounded-lg transition-colors shadow-sm border border-[#ffffff1f]"
                >
                  <MessageCircle size={16} className="text-[#25D366]" />
                  <span className="text-white" style={{ color: "#ffffff" }}>WhatsApp Concierge</span>
                </a>
                <a
                  href={`tel:${businessFacts.phone}`}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold border border-[#b8b3a7] text-[#111b1e] hover:bg-[#eae6dc] px-4 py-3 rounded-lg transition-colors"
                >
                  <Phone size={15} />
                  Call {businessFacts.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Supplementary Assistance Strip */}
            <div className="p-4 rounded-xl bg-[#cfcbc0] border border-[#beb9ad] flex items-center gap-3 text-xs text-[#343e3d]">
              <FileCheck size={20} className="text-[#622f35] flex-shrink-0" />
              <div>
                <strong className="block text-[#111b1e]">Need Bespoke Spacing or Fleet Advice?</strong>
                Our master plate technician will review your vehicle registration mark directly.
              </div>
            </div>
          </div>

          {/* Right Column: Filtered FAQ Accordions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Filter Pills */}
            <div className="flex gap-2 flex-wrap pb-3 border-b border-[#c8c4ba]">
              {(
                [
                  ["all", `All Questions (${faqs.length})`],
                  ["legality", "DVLA & Road Legality"],
                  ["materials", "3D vs 4D Materials"],
                  ["fitting", "Fitting & Installation"],
                  ["ordering", "Delivery & Verification"],
                ] as const
              ).map(([cat, label]) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat as any)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                      active
                        ? "bg-[#622f35] text-[#fff] shadow-md scale-105"
                        : "bg-[#cfcbc0] text-[#4a4e48] hover:bg-[#c2beb2]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Accordion Questions */}
            <Accordion type="single" collapsible defaultValue="road-legal-4d" className="faq-list space-y-3.5">
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-[#fffdf9] border border-[#c8c4ba] rounded-xl px-6 py-1.5 shadow-sm transition-all hover:border-[#622f35]/50"
                >
                  <AccordionTrigger className="text-base md:text-lg font-serif font-medium text-[#111b1e] hover:text-[#622f35] py-4 text-left">
                    <div className="flex items-center gap-2.5">
                      <span>{faq.question}</span>
                      {faq.badge && (
                        <span className="text-[10px] font-mono uppercase bg-[#142126]/10 text-[#622f35] px-2 py-0.5 rounded font-bold hidden sm:inline-block">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#4a4e48] leading-relaxed pb-5 pt-2 border-t border-[#f0ede6]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
