# F2 live plate studio

## Problem and outcome

F1 opens with a film and carries several older storefront colours into the beige and plum foundation. Buyers should be able to type a registration and inspect the plate immediately, with the same draft ready when they open the builder.

## Scope and decisions

- The opening uses the existing plate renderer, with Flat, 3D Gel and 4D Acrylic choices. The hero and builder share registration, product selection and inspection settings.
- Front and rear, angle, light position and headlights are preview controls. Order quantity and the price calculation retain their existing interfaces. The on-car fitment and finish comparison remain available.
- Beige carries text and forms, plum frames the plates and apricot marks active controls on plum. Film playback is optional below the studio and uses existing media. Registration is held in browser memory.
- This is one storefront slice for review in one PR. Catalogue data, product combinations, verified business claims and commercial ordering are later work.

## Acceptance at the F3 checkpoint

- At desktop and phone sizes, the first view shows a plate without loading the film. Flat, gel and acrylic remain distinguishable on both faces at daylight and headlight settings.
- Type a registration, select a finish, change face and light, then open the builder. Both views retain selections. Changing preview face preserves the pair and its quote. The bag snapshots the selected registration and options.
- Test native ranges and buttons by touch and keyboard. Reduced motion suppresses automatic tilt and transitions, and intentional control changes still work. The fitment replay and comparison remain usable.
- Confirm there is no horizontal overflow, focus remains visible across light and dark regions, and the film starts only on explicit playback.
- Check first-load performance on a representative Android device and compare the renders against Amir's physical samples before commercial approval.

## Dependencies and recovery

The implementation starts from `bedf1b1` on F1 PR #4. The stacked PR runs the existing build checks. Keep the PR unmerged before the F3 checkpoint and phase authorization. To recover a bad integrated release, use the existing known-commit Pages workflow with an approved release SHA. The prior MVP rebuild was rehearsed locally. Production recovery rehearsal remains pending. Material fidelity needs client approval.

## Local evidence

TypeScript and scoped ESLint passed. The static export built with webpack using the previously exported Latin font file because this environment cannot reach Google Fonts. Browser smoke checks at 390, 768 and 1440px covered the live preview, touch and keyboard selection, shared inspection state, unchanged order quantity, fitment image, bag, reset, empty registration feedback and zero video requests before play. Full checkpoint testing remains pending after F3.
