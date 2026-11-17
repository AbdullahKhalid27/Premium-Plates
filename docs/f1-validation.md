# F1 validation
Baseline commit 69d8f96da8967148d4f83ebec29dac6c0acacc15. Branch feat/f1-design-foundation. Application version 0.2.0.
## Local checks
- Exact npm lockfile dependencies installed with npm ci.
- Next.js 16.3.8 production static export passed, including homepage and /releases/.
- TypeScript no-emit passed.
- Changed TypeScript/TSX lint passed with three existing warnings: unused stylePricing import, unused error state, and plain img in the existing studio.
- Browser checks passed at 390, 768, 1280 and 1440px: no horizontal overflow, mobile modal palette and Escape focus restoration, desktop collection keyboard/Escape handling, registration preservation in basket, version route navigation, skip link and zero runtime exceptions. Desktop and mobile images are in docs/evidence.
- Independent Standards review found dark mobile title on plum; fixed with scoped title colour. Spec review found focus restoration, menu selector specificity and incomplete studio colour; corrected. Release route uses Next Link and trailingSlash static export to serve a real directory index.
- Impeccable detector ran once, returning advisory palette/type-ramp findings. Supporting colours and sizes are documented in DESIGN.md. Existing inline 11px product-detail type is deferred to the relevant product-page phase.
## Recovery rehearsal
The previous MVP commit was checked out in a separate detached worktree and built successfully with webpack using the locked dependencies. Local rehearsal proves a previous source version can produce a static artifact. Live Pages rollback has not been exercised. The workflow now accepts a known-good commit SHA; manual dispatch rebuilds and deploys that commit.
## Limitations and follow-up
Dependency installation reported 30 advisories (12 moderate, 17 high, 1 critical). These are installation-report counts, not an exploitability assessment. Triage before live commerce. Existing product claims, video, hero and unverified business facts deeper in the MVP remain work for F2–F4. Font licensing and physical finish sign-off remain client inputs. No live payments or document collection are introduced.
## Reproduce
Run npm ci, npx tsc --noEmit, npm run build, and npx eslint src/app/layout.tsx src/app/studio-page.tsx src/app/releases/page.tsx inside premium-plates-site. Start node docs/verify-preview.cjs from repository root, then run scripts/verify-f1.cjs in an environment with Playwright and Edge installed. This local browser harness uses the bundled desktop runtime and is not an installed project dependency. PR CI repeats install, TypeScript and build and archives the static output.
