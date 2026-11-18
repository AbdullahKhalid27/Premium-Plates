import { calculateTotal, stylePricing, type PlateBadge, type PlateKind, type PlateSide } from "./pricing";

export const storefrontName = "Plate Workshop";
export const motorcyclePhoto = "/Premium-Plates/media/motorcycle-workshop.webp";

export const finishes = {
  regular: "Flat",
  gel: "3D Gel",
  acrylic: "4D Acrylic",
} as const;

export const productDetails = {
  regular: { slug: "regular", name: "Regular", finish: "Flat lettering", dimension: "Standard oblong", description: "A full-width plate with flat lettering." },
  gel: { slug: "3d-gel", name: "3D Gel", finish: "Domed lettering", dimension: "Standard oblong", description: "Rounded lettering that catches light along its curved edges." },
  acrylic: { slug: "4d-acrylic", name: "4D Acrylic", finish: "Raised lettering", dimension: "Standard oblong", description: "Raised acrylic lettering with a crisp, square edge." },
  short: { slug: "short", name: "Short", finish: "Short profile", dimension: "Short oblong", description: "A shorter oblong profile to preview with your registration." },
  hex: { slug: "hex", name: "Hex", finish: "Angled profile", dimension: "Hex profile", description: "A shaped plate with angled ends." },
  show: { slug: "show", name: "Show", finish: "Display only", dimension: "Display profile", description: "A display plate for static exhibits and photography." },
  moto: { slug: "motorcycle", name: "Motorcycle", finish: "Two-line rear plate", dimension: "Motorcycle profile", description: "A compact rear plate with registration lettering on two lines." },
} satisfies Record<PlateKind, { slug: string; name: string; finish: string; dimension: string; description: string }>;

export const collection = (Object.keys(productDetails) as PlateKind[]).map((id) => ({
  id, ...productDetails[id], price: stylePricing[id].fromPrice,
  intendedUse: id === "show" ? "Display only" : "Road-style preview",
}));

export type Lettering = keyof typeof finishes;
export type Vehicle = "car" | "motorcycle" | "van";
export type Layout = "single-line" | "two-line";
export type PlateSize = "standard" | "compact";
export type BaseMaterial = "acrylic" | "aluminium" | "abs";
export type AccentColour = "standard" | "ivory";
export type SloganColour = "ivory" | "gold";

export type Draft = {
  reg: string;
  kind: PlateKind;
  side: PlateSide;
  vehicle: Vehicle;
  layout: Layout;
  size: PlateSize;
  material: BaseMaterial;
  lettering: Lettering;
  border: boolean;
  badge: PlateBadge;
  badgeColour: AccentColour;
  slogan: string;
  sloganColour: SloganColour;
};

export const defaultDraft: Draft = {
  reg: "PP24 LUX", kind: "acrylic", side: "both", vehicle: "car",
  layout: "single-line", size: "standard", material: "acrylic", lettering: "acrylic",
  border: false, badge: "none", badgeColour: "standard", slogan: "", sloganColour: "ivory",
};

export function isDraft(value: unknown): value is Draft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<Draft>;
  return typeof draft.reg === "string" && /^[A-Z0-9 ]{0,8}$/.test(draft.reg) &&
    collection.some(({ id }) => id === draft.kind) &&
    (draft.side === "both" || draft.side === "front" || draft.side === "rear") &&
    (["car", "motorcycle", "van"] as const).some(v => v === draft.vehicle) &&
    (draft.kind === "moto"
      ? draft.vehicle === "motorcycle" && draft.layout === "two-line" && draft.side === "rear"
      : (draft.vehicle === "car" || draft.vehicle === "van") && (draft.layout === "single-line" || draft.layout === "two-line")) &&
    (draft.size === "standard" || draft.size === "compact") &&
    (draft.material === "acrylic" || draft.material === "aluminium" || draft.material === "abs") &&
    (draft.lettering === "regular" || draft.lettering === "gel" || draft.lettering === "acrylic") &&
    typeof draft.border === "boolean" &&
    (draft.badge === "none" || draft.badge === "uk" || draft.badge === "gb" || (draft.badge === "eu" && draft.kind === "show")) &&
    (draft.badgeColour === "standard" || draft.badgeColour === "ivory") &&
    typeof draft.slogan === "string" && draft.slogan.length <= 25 &&
    (draft.sloganColour === "ivory" || draft.sloganColour === "gold");
}

export function previewDimensions({ kind, layout, size }: Pick<Draft, "kind" | "layout" | "size">) {
  if (kind === "moto") return size === "compact" ? [229, 178] : [279, 203];
  if (layout === "two-line") return size === "compact" ? [229, 178] : [279, 203];
  if (kind === "hex") return size === "compact" ? [420, 111] : [520, 111];
  if (kind === "short") return size === "compact" ? [406, 111] : [457, 111];
  return size === "compact" ? [406, 111] : [520, 111];
}

export function applyProduct(draft: Draft, kind: PlateKind): Draft {
  if (draft.kind === kind) return draft;
  const motorcycle = kind === "moto";
  const lettering = kind === "regular" || kind === "gel" || kind === "acrylic" ? kind : draft.lettering;
  return {
    ...draft, kind, lettering,
    side: motorcycle ? "rear" : draft.side,
    vehicle: motorcycle ? "motorcycle" : draft.vehicle === "van" ? "van" : "car",
    layout: motorcycle ? "two-line" : "single-line",
    size: kind === "short" || motorcycle ? "compact" : "standard",
    badge: kind !== "show" && draft.badge === "eu" ? "none" : draft.badge,
    badgeColour: kind === "show" ? draft.badgeColour : "standard",
    slogan: kind === "show" ? draft.slogan : "",
    sloganColour: kind === "show" ? draft.sloganColour : "ivory",
  };
}

export function restoredDraft(draft: Draft): Draft {
  return draft.kind === "show" ? draft : { ...draft, badgeColour: "standard", slogan: "", sloganColour: "ivory" };
}

export function priceDraft(draft: Draft, quantity = 1) {
  return calculateTotal({
    kind: draft.kind,
    side: draft.side,
    badge: draft.badge,
    border: draft.border,
    upgrades: draft.material === "aluminium" ? ["pressedAluminium"] : [],
    quantity,
  });
}

export function applyLettering(draft: Draft, lettering: Lettering): Draft {
  const kind = draft.kind === "regular" || draft.kind === "gel" || draft.kind === "acrylic" ? lettering : draft.kind;
  return { ...draft, kind, lettering };
}

export const draftKey = "number-plate-workshop:draft:v1";


