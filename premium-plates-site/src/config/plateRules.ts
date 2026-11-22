import type { Draft } from "./catalogue";

export const rulesCheckedOn = "2026-11-18";
export const rulesCheckedLabel = "18 November 2026";
const gov = "https://www.gov.uk";
export const ruleSources = {
  display: { label: "GOV.UK plate rules", url: gov + "/displaying-number-plates/rules-number-plates" },
  dimensions: { label: "DVLA design guide (INF104)", url: gov + "/government/publications/vehicle-registration-numbers-and-number-plates" },
  identifiers: { label: "GOV.UK flag guidance", url: gov + "/displaying-number-plates/flags-identifiers-and-stickers" },
  evidence: { label: "GOV.UK accepted documents", url: gov + "/displaying-number-plates/getting-number-plates-made-up" },
} as const;

function rule(appliesTo: string, title: string, reason: string, action: string, source: keyof typeof ruleSources) {
  return { appliesTo, title, reason, action, source, checkedOn: rulesCheckedOn };
}

export const plateRules = {
  assigned: {
    ...rule("Road registrations", "Can I put my name on a road plate?",
      "A personalised registration can resemble a name. Enter the registration shown on your vehicle or entitlement document.",
      "Keep every letter and digit in its assigned position. The preview checks common formats. Your supplier checks your original documents.", "evidence"),
    checkedOn: "2026-11-22",
  },
  standard: rule("New road plates", "Reflective faces and markings",
    "A road plate needs a reflective face, black lettering and the supplier’s marking. Plates fitted after 1 September 2021 must carry BS AU 145e.",
    "Choose white for the front and yellow for the rear. Ask the supplier to confirm the finished plate’s markings.", "display"),
  spacing: rule("Road registrations", "Font and registration spacing",
    "DVLA specifies the character shapes, size and gaps. Changing a gap to spell a word can misrepresent the registration.",
    "Use the grouping on your registration document. The builder checks common formats; the supplier checks the physical measurements.", "dimensions"),
  raised: rule("Raised lettering", "Gel and acrylic lettering",
    "Raised characters are permitted. On newly fitted plates each character must be fixed, non-reflective and one shade of black.",
    "Ask the supplier to confirm the lettering and finished plate meet the applicable standard.", "display"),
  profile: rule("Short, hex and compact profiles", "Clearance around the letters",
    "A smaller or shaped blank still needs room for the whole registration, the prescribed gaps and the outer margins.",
    "Have the supplier measure your registration against the outline. Select a wider profile if the characters or margins would need to shrink.", "dimensions"),
  motorcycle: rule("Motorcycles", "Two-line rear plate",
    "Motorcycles registered from 1 September 2001 display their registration on the rear only. DVLA specifies a two-line layout for motorcycles.",
    "Use the rear two-line option. Check the applicable dimensions with the supplier for your bike’s first registration date.", "display"),
  show: rule("Display-only designs", "For display only",
    "This collection allows decorative options outside the workshop’s road range.",
    "For road use, select a road style and enter the registration with its assigned spacing.", "display"),
  identifier: rule("Flag identifiers", "Flag and identifier",
    "DVLA lists the flags and identifiers permitted on road plates. The flag sits above the letters on the left, clear of the margin.",
    "Choose an allowed identifier for road use. The workshop offers the EU design only on display plates.", "identifiers"),
  documents: rule("Orders for road plates", "Identity and entitlement",
    "A registered supplier needs to see original evidence of your name and address and your right to use the registration.",
    "A driving licence and a V5C are examples. Check the accepted alternatives and follow the supplier’s instructions for showing originals.", "evidence"),
};

export function rulesForPlate(draft: Pick<Draft, "kind" | "lettering" | "size" | "badge">) {
  if (draft.kind === "show") return draft.badge === "none" ? [plateRules.show] : [plateRules.show, plateRules.identifier];
  const rules = [plateRules.assigned, plateRules.documents, plateRules.spacing, plateRules.standard];
  if (draft.kind === "moto") rules.unshift(plateRules.motorcycle);
  if (draft.kind === "short" || draft.kind === "hex" || draft.size === "compact") rules.push(plateRules.profile);
  if (draft.lettering !== "regular") rules.push(plateRules.raised);
  if (draft.badge !== "none") rules.push(plateRules.identifier);
  return rules;
}
