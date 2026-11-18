# F3 catalogue and configurator

Status: implementation pending the F1–F3 checkpoint. Starting commit: `9574fed59806b18e27f80eea7e226e8409219118`. Branch: `feat/f3-catalogue-configurator`, based on F2.

## Customer outcome

Customers can browse the seven plate styles, open a direct product page and preview a plate with their own registration. The builder carries the selection into the bag and shows an itemised estimate. Show plates retain their display-only designation throughout the selection.

## Scope and decisions

- The shared catalogue supplies collection cards, direct product routes and builder starting selections. Each product link seeds the builder with a product slug. Registration and bag state are stored in the current browser tab.
- The draft identifies the vehicle, layout, ordered side, size, base material, lettering, border, badge and badge colour, and display slogan and colour. Preview dimensions come from the selected shape and size. The bag snapshot owns its own selection and quantity. Preview face and viewing angle are inspection controls.
- Motorcycle selection sets a rear plate with two stacked rows and uses the supplied photograph in the selector and preview. Pointer tilt responds more strongly, the angle slider remains available, and the light-position slider is removed. Headlights remain a toggle.
- The EU identifier is a £6 display-only option. Switching from Show to a road-style preview clears that identifier. Existing road identifiers use the existing single and pair fees.
- The maroon opening frames the live plate with two UK-inspired streetlamps. The masthead uses Plate Workshop as the neutral storefront label and prominent plain-language actions. The catalogue and builder share the existing beige/plum system below it.

## Interfaces and dependencies

Catalogue routes are static and use the existing GitHub Pages base path. The draft and bag are versioned session-storage records. Pricing uses the fixture catalogue and existing pricing engine. Production needs Amir’s approval of exact sizes, combinations, options, prices, image use and supplier markings. Payment and staff verification are later phases.

## Checkpoint acceptance

See [F3-01](tickets/F3-01.md) and [F3-02](tickets/F3-02.md), and [research and sources](research/f3-catalogue.md).

## Evidence and recovery

No application testing, browser preview, build, lint or typecheck was run at the user's request. Run the accumulated F1–F3 checkpoint before F4. The F2 base SHA is the recovery point for the draft branch. Main remains the published MVP. No F3 recovery rehearsal or production deployment took place.
