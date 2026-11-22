# F1–F3 source audit and correction tickets

Reviewed on 18 November 2026 against af875422cd35e429c53565e4cd70d738acf43759. This records the starting state. Completion evidence belongs to the F5 checkpoint.

## Customer outcome

A buyer can type a registration, inspect its finish and shape, browse every offered style and carry a valid selection into an itemised bag. Customers can use the same path with a keyboard, on a phone or with motion reduced. Phase 4 explains the applicable requirements. Phase 5 demonstrates payment, verification and tracking with synthetic orders.

## Requirement trace

| Original commitment | Starting evidence | Correction or checkpoint |
|---|---|---|
| F1 neutral masthead, navigation, skip link, footer and version | layout.tsx, studio-page.tsx, releases route; F1 validation records width and keyboard checks | Replace dated palette and navigation; verify on the revised surfaces at mobile and desktop widths. |
| F1 release/recovery, reviewed PR and CI | f1-validation.md and release-operations.md record local restore of the earlier MVP; PR #4 | Preserve deployment gate, install/build CI and stable release link. Verify branch/PR identity before shipping. |
| F2 live registration, front/rear, finishes, inspection and ordered side | f2-live-studio.md records historical interaction checks; studio-page.tsx owns the draft | Keep the hero still apart from registration input; consolidate other controls in the builder. Preview side must preserve order side. |
| F2 physical rendering, keyboard and reduced motion | local Charles Wright font and shared plate component; F2 checks covered common widths | Verify keyboard alternatives to drag, long registrations on bike, movement at reduced motion, and plate face contrast. Amir owns comparison to physical samples and font-use approval. |
| F2 film | Native film below the studio, previously started manually | Use muted in-view playback, visible playback controls, pause offscreen and honour reduced motion. |
| F3 collection and seven direct routes | catalogue.ts and static collection/[slug] route, existing export demonstrated previously | Keep all seven slugs and item-to-builder handoff. Add in-place style specifications and final custom card. |
| F3 option model, price, intent and persistence | Draft and priceDraft in catalogue.ts; sessionStorage and bag snapshot in studio-page.tsx | Add van, restore valid historic selections, constrain show-only extras when returning to road style, and keep registration in session. Itemised amounts must match the estimate. |
| F3 independent design choices | Shared lettering, profile, badge/colour, material, slogan/colour, side, size and layout fields already exist | Confirm render and bag reflect selected fields; repeat after returning from product pages and editing a line. |
| F3 motorcycle asset, tilt, light control and identifier fee | Existing motorcycle photo, enhanced tilt and display-only EU badge in F3 implementation | Retain catalogue photo; use a drawn bumper on the builder stage, movable light and accessible rotation. Confirm the EU fee is £6 and selecting a road style clears it. |

## Vertical delivery tickets

| Ticket | Blocker | Interface and acceptance |
|---|---|---|
| F3-C1 Explore the new opening | Existing F1 shell | Keyboard and touch users can reach shop, bag and builder from the responsive masthead. The plate updates on typing. The single road spine follows the reading order. |
| F3-C2 Configure a plate | Existing catalogue, pricing and draft | Builder trays cover registration, style, lettering, vehicle/size and extras. People can move the light, rotate the plate and compare finishes. Estimate and bag accurately preserve the allowed combination, including on reload. |
| F3-C3 Compare designs | Draft and product defaults | Style and lookbook cards expand with keyboard/tap. Selection opens the builder with that configuration. Profile morph, comparison sweep, layer separation and film support reduced motion and readable static content. |
| F4 Understand the fit and rules | F3-C2 and C3 | Structured primary-source rules carry product applicability, a reason, correction, checked date and a link. Every product route, builder and paper FAQ expose those rules. Remove unsupported supplier guarantees and regulatory claims in adjacent sections. |
| F5 Revisit an order | F4 and catalogue fixtures | Edit a bag entry, resume a synthetic order, retry failure/pending payment, replace interrupted/rejected evidence, and follow separate staff and fulfilment states. Meaningful next actions remain visible across reload and expired-return scenarios. |

## Dependencies, design critique and recovery

Use the existing draft, quote, collection routes and session boundaries. Product photographs, prices, supported combinations and supplier credentials need Amir's sign-off before commerce. The issue/PR record must say when an upload, physical sample or deployment has not been verified. The order prototype must provide sample documents and exclude real credentials, files and payment details.

The opening had competing controls; the revised first frame gives the registration and rendered plate priority. The previous builder distributed price, finish and quantities across a tall form; the dock brings the active choice to the plate. Reserve light-following effects for surfaces where they explain material response. In guidance screens keep answers readable and source links adjacent. The relevant reference checkouts are enumerated in Phase Prompts.md: Bugatti for product framing, BMW M for signal colour, Wired for hierarchy, Impeccable, Taste and Unslop for screen critique, and the Front-End Checklist and code-review standards/spec axes at the F5 checkpoint.

Earlier evidence is recorded in f1-validation.md, f2-live-studio.md and f3-catalogue-configurator.md. These records cannot establish coverage of a later diff or retroactively prove skill use. Capture each changed section/state at mobile and desktop after F5 and record behavioural coverage and remaining limitations. A local source rebuild of the prior MVP was rehearsed during F1; no production recovery was rehearsed. To recover this unpublished correction, start a separate checkout at the full starting SHA above and serve its freshly generated export. For a published release use the previously verified deployed release SHA and the documented Pages recovery workflow.
