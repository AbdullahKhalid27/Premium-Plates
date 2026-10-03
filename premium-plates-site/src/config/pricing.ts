/**
 * Pricing structure and calculations for Premium Plates.
 * Strictly typed catalog with base prices, single vs pair pricing, finish premiums, and fixings.
 */

export type PlateKind = "regular" | "gel" | "acrylic" | "short" | "hex" | "show" | "moto";
export type PlateSide = "both" | "rear" | "front";

export interface StylePricing {
  kind: PlateKind;
  name: string;
  subtitle: string;
  fromPrice: number; // Front or single plate price
  pairPrice: number;
  depthMm?: number;
  legalRoadUse: boolean;
  tag?: string;
  description: string;
}

export const stylePricing: Record<string, StylePricing> = {
  regular: {
    kind: "regular",
    name: "Standard Flat",
    subtitle: "Precision pressed British Standard acrylic",
    fromPrice: 19.99,
    pairPrice: 34.99,
    depthMm: 0,
    legalRoadUse: true,
    tag: "Road Legal",
    description: "Laser-cut 3mm PMMA acrylic conforming strictly to BS AU 145e.",
  },
  gel: {
    kind: "gel",
    name: "3D Gloss Gel",
    subtitle: "Polyurethane dome with high-gloss automotive finish",
    fromPrice: 29.99,
    pairPrice: 49.99,
    depthMm: 1.5,
    legalRoadUse: true,
    tag: "Most Popular",
    description: "Resin-encapsulated black characters with self-healing UV gloss.",
  },
  acrylic: {
    kind: "acrylic",
    name: "4D Laser Cut",
    subtitle: "Solid 3mm solid-black gloss acrylic with crisp edge bevels",
    fromPrice: 39.99,
    pairPrice: 64.99,
    depthMm: 3.0,
    legalRoadUse: true,
    tag: "Signature",
    description: "Surgical-grade laser cut 3mm acrylic blocks for unmatched architectural depth.",
  },
  short: {
    kind: "short",
    name: "Short Form",
    subtitle: "Proportionally trimmed acrylic for 5 or 6 character registrations",
    fromPrice: 24.99,
    pairPrice: 42.99,
    depthMm: 0,
    legalRoadUse: true,
    tag: "Clean Profile",
    description: "Shortened outer margin eliminating excess yellow/white plate borders legally.",
  },
  hex: {
    kind: "hex",
    name: "Hexagonal Cut",
    subtitle: "Beveled angular ends engineered for modern performance exhausts",
    fromPrice: 34.99,
    pairPrice: 59.99,
    depthMm: 0,
    legalRoadUse: true,
    tag: "Performance",
    description: "Angular styling contouring rear bumper recesses on RS, M, and AMG vehicles.",
  },
  show: {
    kind: "show",
    name: "Studio / Show",
    subtitle: "Custom spacing, custom tints, track and photo studio presentation",
    fromPrice: 27.99,
    pairPrice: 47.99,
    depthMm: 2.0,
    legalRoadUse: false,
    tag: "Off-Road Only",
    description: "Unrestricted bespoke styling intended solely for car shows, exhibitions, and photoshoots.",
  },
  moto: {
    kind: "moto",
    name: "Square / Moto",
    subtitle: "Square two-tier layout for motorbikes, imports, and 4x4s",
    fromPrice: 22.99,
    pairPrice: 38.99,
    depthMm: 0,
    legalRoadUse: true,
    tag: "Two-Tier",
    description: "Dual-row legal UK spacing for imported vehicles and rear motorcycle mounts.",
  },
};

export const PRICING = {
  styles: stylePricing,
};

export interface PlateOrderSelection {
  style?: string;
  kind?: PlateKind;
  isPair?: boolean;
  side?: PlateSide;
  badge?: "none" | "gb" | "uk";
  border?: boolean;
  upgrades?: string[];
  fixingKit?: boolean;
  stickyPads?: boolean;
  quantity?: number;
}

export interface PricingBreakdownItem {
  label: string;
  amount: number;
}

export interface CalculatedTotal {
  subtotal: number;
  total: number;
  breakdown: PricingBreakdownItem[];
  formattedTotal: string;
}

export function calculateTotal(selection: PlateOrderSelection): CalculatedTotal {
  const chosenKey = selection.style || selection.kind || "regular";
  const style = stylePricing[chosenKey] || stylePricing.regular;
  
  const isPair = selection.isPair !== undefined 
    ? selection.isPair 
    : selection.side === "both" || !selection.side;

  const baseCost = isPair ? style.pairPrice : style.fromPrice;

  const breakdown: PricingBreakdownItem[] = [
    {
      label: `${style.name} (${isPair ? "Front & Rear Pair" : "Single Plate"})`,
      amount: baseCost,
    },
  ];

  let additionsTotal = 0;

  // Upgrades array support (e.g. from tests or advanced customizer)
  if (Array.isArray(selection.upgrades)) {
    for (const up of selection.upgrades) {
      if (up === "pressedAluminium") {
        const aluCost = isPair ? 15.0 : 8.0;
        breakdown.push({ label: "Pressed Aluminium Baseplate", amount: aluCost });
        additionsTotal += aluCost;
      } else if (up === "ukBadge" || up === "gbBadge") {
        const bCost = isPair ? 6.0 : 3.5;
        breakdown.push({ label: "UK Identifier Flag", amount: bCost });
        additionsTotal += bCost;
      } else if (up === "fineBorder" || up === "border") {
        const borderCost = isPair ? 4.0 : 2.5;
        breakdown.push({ label: "Pin-line Border Accent", amount: borderCost });
        additionsTotal += borderCost;
      }
    }
  }

  // Direct boolean/property options support
  if (selection.badge && selection.badge !== "none" && !selection.upgrades?.includes("ukBadge")) {
    const badgeCost = isPair ? 6.0 : 3.5;
    breakdown.push({
      label: `${selection.badge.toUpperCase()} Identifier Flag`,
      amount: badgeCost,
    });
    additionsTotal += badgeCost;
  }

  if (selection.border && !selection.upgrades?.includes("fineBorder") && !selection.upgrades?.includes("border")) {
    const borderCost = isPair ? 4.0 : 2.5;
    breakdown.push({
      label: "Pin-line Border Accent",
      amount: borderCost,
    });
    additionsTotal += borderCost;
  }

  if (selection.fixingKit) {
    const kitCost = 4.99;
    breakdown.push({
      label: "Anti-Theft Screw & Cap Fixing Kit",
      amount: kitCost,
    });
    additionsTotal += kitCost;
  }

  if (selection.stickyPads) {
    const padsCost = 3.99;
    breakdown.push({
      label: "Ultra-Strong Automotive Adhesive Pads",
      amount: padsCost,
    });
    additionsTotal += padsCost;
  }

  const unitTotal = Math.round((baseCost + additionsTotal) * 100) / 100;
  const qty = typeof selection.quantity === "number" && selection.quantity > 0 ? selection.quantity : 1;
  const finalTotal = Math.round(unitTotal * qty * 100) / 100;

  // Scale breakdown amounts if quantity > 1
  const finalBreakdown = qty > 1 
    ? breakdown.map(item => ({ label: `${item.label} (x${qty})`, amount: Math.round(item.amount * qty * 100) / 100 }))
    : breakdown;

  return {
    subtotal: finalTotal,
    total: finalTotal,
    breakdown: finalBreakdown,
    formattedTotal: `£${finalTotal.toFixed(2)}`,
  };
}
