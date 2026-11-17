# F1 design foundation
## Problem
The approved MVP contains valuable studio interactions, but its shell uses competitor branding, unsupported metadata claims and no release history. The client needs a coherent beige/plum foundation before adding the full catalogue and order workflows.
## Outcome and user stories
1. A shopper recognises the same navigation, type and palette across the homepage, mobile menu and footer.
2. A keyboard user can skip to content, open the collection, select a style, dismiss it with Escape and continue without a pointer.
3. A mobile shopper can navigate using the existing modal menu with focus containment, closing and focus restoration.
4. An operator can identify the shipped version and redeploy a known previous commit when a release fails.
## Implementation decisions
Use trailing-slash static export so the version page has a directory index on GitHub Pages. Use one additive foundation stylesheet after the existing active stylesheet. Preserve the current studio state and transitions. Main canvas #F0EDE6, studio plum #4A1F39, accent apricot #FF9876. Use Georgia display and the existing Plus Jakarta Sans UI family, keeping the local registration font. Neutral Plate Studio branding covers the shell and metadata. Existing product claims deeper in the MVP are scheduled for F3/F4 review.
## Acceptance
- Beige page shell and plum footer/studio surface with legible type and focus.
- Navigation works at 390, 768, 1280 and 1440px without horizontal overflow.
- Collection opens by keyboard; Escape restores its trigger. Mobile menu closes by Escape and restores trigger focus.
- Skip link targets focusable main content. Footer links resolve to sections and version route.
- Production static export, TypeScript and changed-file lint pass.
- Existing registration, finish selection and add-to-bag still work.
- CI validates PRs. Deployment can target a prior immutable commit; runbook documents recovery and smoke checks.
## Testing decisions
Use browser-level checks through the normal page, screenshots, computed contrast, keyboard actions and build output. No new unit test framework is required for this visual refinement. Review the diff against baseline 69d8f96da8967148d4f83ebec29dac6c0acacc15.
## Delivery
One short-lived feat/f1-design-foundation branch into the single main branch. Reviewed PR precedes merge. Version 0.2.0 identifies F1. Tag verified releases after deployment. B1/F6 later supply live commerce infrastructure.
