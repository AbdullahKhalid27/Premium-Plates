# F1 foundation research

Reviewed 18 November 2026. Scope: beige-led tokens, plum studio surfaces, typography, responsive navigation, neutral branding and footer. This note records findings; implementation and verification belong to the parent F1 work.

## Source baseline

The approved reference checkout starts at `69d8f96da8967148d4f83ebec29dac6c0acacc15` (verify the implementation checkout independently before review). The page is a client component exported by `src/app/page.tsx`; its root layout imports `redesign.css`, so editing the unused `globals.css` alone would not change the current page. See [page](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/page.tsx), [layout](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/layout.tsx), [studio](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/studio-page.tsx).

The current `redesign.css` already uses beige `#f0ede6`, but its wine `#622f35`, copper `#caa785`, dark teal studio areas and several later override blocks are inconsistent with the approved plum/apricot direction. Prefer one small foundation token layer and targeted shell/studio changes rather than replacing the studio or layering new animation dependencies. Existing on-car fitting, registration state, finish selection, comparison and bag behavior are in `studio-page.tsx` and its imported components; retain them. See [stylesheet](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/redesign.css), [DESIGN.md](../DESIGN.md), [phase prompt](../Phase%20Prompts.md).

The layout currently loads Cormorant Garamond and Plus Jakarta Sans with `next/font/google`, and the local Charles Wright font with `next/font/local`. Project design asks to begin with Georgia for italic editorial headlines and the MVP sans for UI, while reserving the plate face for registrations. A Georgia display stack avoids another display font download; retain Plus Jakarta and local plate font unless font-loading evidence requires a different decision. The existing font file comment is not evidence of certification or licence permission. See [layout](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/layout.tsx), [project typography decision](../DESIGN.md).

## Foundation choices

Use `#F0EDE6` as the main canvas, `#4A1F39` for the studio and functional primary actions, and restrained `#FF9876` accents. Use light text on plum and dark text on beige; apricot is an accent requiring a contrast check before text use. Contrast must be measured for actual combinations, including muted and focus states. These are project-owned decisions, not colours copied from automotive references. See [AGENTS.md](../AGENTS.md), [DESIGN.md](../DESIGN.md).

The required reference readings suggest three transferable principles: Bugatti frames the product with space and removes decorative chrome; BMW M reserves its signature accent for limited identity moments; Wired assigns display, narrative and structural text distinct typographic roles with editorial hierarchy. Apply those principles while preserving the client's approved beige/plum palette and existing studio. The references are design analyses, not first-party evidence of those companies' internal systems. See [Awesome DESIGN.md README](../references/VoltAgent--awesome-design-md/README.md), [Bugatti](../references/VoltAgent--awesome-design-md/design-md/bugatti/DESIGN.md), [BMW M](../references/VoltAgent--awesome-design-md/design-md/bmw-m/DESIGN.md), [Wired](../references/VoltAgent--awesome-design-md/design-md/wired/DESIGN.md).

## Navigation and truthful shell content

The existing desktop collection disclosure has a clickable button with `aria-expanded` plus hover handlers; no explicit Escape handling or controlled-region relationship appears there. Existing collection items select a finish and scroll to the studio, so preserve that action in F1 rather than pretending dedicated product routes exist. Mobile navigation already uses the project's Radix Dialog-based Sheet. Reuse that primitive and verify Escape, focus return, close button, scroll and touch targets in the browser. See [studio header/mobile navigation](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/studio-page.tsx), [Sheet implementation](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/components/ui/sheet.tsx).

W3C advises disclosure semantics for typical navigation rather than `menu` roles with their additional keyboard expectations. Use semantic links for destinations, buttons for changing selections, a visible focus indicator and a working skip destination. Adapt behavior to actual controls and test it; the APG example itself warns that sample code is illustrative. See [W3C disclosure navigation guidance](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

The footer currently presents `RNPS 68421` and a road-legality guarantee even though `businessFacts.ts` identifies client details as placeholders. Layout metadata also asserts certification and real-time road-legality verification. The brand component and mobile Sheet use Premium Plates. Replace shell branding with a neutral placeholder such as “Plate Studio” and remove unsupported shell claims; show demonstrable navigation and prototype/process facts instead. Do not add testimonials, inferred guarantees, eBay links or invented client contact details. Keep broader rules/pricing content as explicit remaining phase work. See [business facts](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/config/businessFacts.ts), [layout metadata](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/src/app/layout.tsx), [project decisions](../AGENTS.md).

## Framework and release constraints

The manifest pins Next.js 16.3.8 and React 19.2.8 with Tailwind 4; scripts offer build and lint. The reference checkout currently has no installed `node_modules/next/dist/docs` directory. Its AGENTS.md requires reading the version-local guidance before changes, so install dependencies in the implementation checkout and read relevant installed docs there. Current official web guidance is supporting context rather than a substitute for those version-local docs. See [manifest](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/package.json), [checkout AGENTS.md](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/AGENTS.md).

Official Next.js guidance describes `next/font` as self-hosted font optimization applied through classes or variables in the layout, and static export as generated route HTML/CSS/JS suitable for a static host. The existing config uses `output: 'export'`, `/Premium-Plates` basePath and unoptimized images. Preserve that deployment contract in F1; server payments and private uploads belong to B1/F6. The checked-in Pages workflow builds and publishes on pushes to `main`, so a feature PR is the review boundary and merging needs explicit phase authorization. See [font guidance](https://nextjs.org/docs/app/getting-started/fonts), [static export guidance](https://nextjs.org/docs/app/guides/static-exports), [config](../references/AbdullahKhalid27--Premium-Plates/premium-plates-site/next.config.ts), [workflow](../references/AbdullahKhalid27--Premium-Plates/.github/workflows/deploy.yml), [phase release rules](../Phase%20Prompts.md).

## Acceptance checks to carry into implementation

- Beige canvas, plum studio, restrained apricot; no accidental low-contrast text or hidden focus.
- Neutral shell brand and metadata; no unverified footer registration/certification/guarantee claims.
- Desktop and mobile navigation reach real sections; disclosure and mobile Sheet operate with keyboard and return focus appropriately.
- No horizontal overflow at 320/375 px, usable targets and readable typography at desktop/mobile sizes.
- Local plate font and existing registration/finish/side/on-car/comparison interactions still work.
- Production build and appropriate lint pass; record screenshots, review base commit and any limitations before opening the feature PR.

These checks follow the exact [F1 prompt](../Phase%20Prompts.md) and project [handoff acceptance](../DESIGN.md); they do not imply real commerce readiness.
