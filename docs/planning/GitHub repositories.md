# GitHub repositories

## Current skill usage by phase

Use [Phase Prompts](Phase%20Prompts.md) for exact local SKILL.md paths and full Research → Code → Push prompts. Its phase IDs replace the initial broad numbering in the inventory below. Downloaded files can be read directly; register commands separately only when needed. Preserve licence notices including Unslop's Damir Sokolovsky CC-BY-4.0 credit.

|Phase|Research|Code|Test|Ship|
|---|---|---|---|---|
|F1 Foundation|research, Awesome DESIGN.md|Impeccable, Ponytail|code-review, Impeccable, Unslop, Front-End Checklist|pr|
|F2 Studio|research, Awesome DESIGN.md, Taste hero critique|Impeccable, Ponytail|code-review, Impeccable, Unslop, Front-End Checklist, focused tdd|pr|
|F3 Catalogue|research, domain-modeling, Awesome DESIGN.md|Impeccable, Ponytail|code-review, Unslop, Impeccable, Front-End Checklist, focused tdd|pr|
|F4 Guidance/cards|research, Awesome DESIGN.md, official sources|Impeccable, Unslop|code-review, Impeccable, Unslop, Front-End Checklist, focused tdd|pr|
|F5 Customer workflow|research, Awesome DESIGN.md|Impeccable, Ponytail, Unslop|code-review, Impeccable, Unslop, Front-End Checklist, focused tdd|pr|
|B1 Backend/staff|research, domain-modeling, codebase-design, Awesome DESIGN.md for staff UI|Ponytail, Impeccable for UI, Unslop for consequences|code-review, tdd, Unslop, Impeccable/Checklist for UI|pr|
|F6 Integration|research, codebase-design, Awesome DESIGN.md|Impeccable, Ponytail, Unslop|code-review, tdd, Impeccable, Unslop, Front-End Checklist|pr|
|A1 Automation|research, domain-modeling, codebase-design, Awesome DESIGN.md for UI|Ponytail, Impeccable/Unslop for visible UI|code-review, tdd, Impeccable/Unslop/Checklist for UI|pr|

Use to-spec and to-tickets when refining tasks. Frontend Design is a secondary art-direction reference, React Bits a selective component source, and Ruflo deferred. Consult the local README and licensing before adding any component or runtime.
The local references directory contains the downloaded project and ten reference repositories. Use repository documents as development references. Each row gives a task, a phase and a stopping point.
|Local checkout in references/|Read first|Phase and application|
|---|---|---|
|AbdullahKhalid27--Premium-Plates|premium-plates-site/src/app/studio-page.tsx and config/pricing.ts|F1–F6 and B1. Reuse the studio, plate font, on-car preview and comparison. Verify every price, claim and font right before launch.|
|VoltAgent--awesome-design-md|README.md and design-md/{bugatti,bmw-m,wired}/DESIGN.md|Every frontend task. Use product-first composition, disciplined accents and clear typographic roles. Record the resulting choices in DESIGN.md.|
|heydamir--unslop|skills/unslop/SKILL.md|1–3. Redline each screen, concentrate richness in the plate. For backend changes review their visible effect on customers and staff.|
|pbakaus--impeccable|README.md and cursor-plugin/skills/impeccable/SKILL.md|1 and 3. Critique hierarchy, contrast, typographic rhythm, mobile behaviour and action labels.|
|Leonxlnx--taste-skill|skills/taste-skill/SKILL.md|1. Compare product-render heroes and check at phone size. Its guidance allows work inside an existing app. A static-only production rewrite is unnecessary.|
|anthropics--skills|skills/frontend-design/SKILL.md|1. Primary frontend-design skill behind the design-guide reference. Ground each direction in materials and buyer intent.|
|DavidHDev--react-bits|README.md, src/ and LICENSE.md|1. Reference interactive samples if native controls prove insufficient. Review the component’s licence before reuse.|
|DietrichGebert--ponytail|skills/ponytail/SKILL.md|2–3. Review scope and reuse existing primitives. The playground uses a native slider and details disclosure.|
|mattpocock--skills|skills/engineering/grill-with-docs/SKILL.md and skills/productivity/to-questionnaire/SKILL.md|F1–F6 and B1. Align terminology, collect client facts, then turn one complete checkout journey into implementation tickets.|
|thedaviddias--Front-End-Checklist|README.md and packages/cli/SKILL.md|3. Check keyboard, page titles, crawlable links, asset weight and phone layouts.|
|ruvnet--ruflo|README.md and chatgpt-plugin/skills/triage-ruflo-work/SKILL.md|A1, optional. Agent orchestration would add operational overhead to this solo prototype. Revisit when coordinated parallel jobs have a measured benefit.|
Next handoff: DESIGN.md and Website Flow.md for design work, TRD.md and Backend Schema.md for the commerce slice.
