# Phase prompts and orchestration

Use this file for every phase. Execute **Research → Code → Test → Ship** in order, and repeat the complete cycle for the next phase. F1–F6 are frontend phases. B1 supplies the backend and staff portal needed by F6. A1 follows working commerce. Within each phase split oversized changes into small tickets and repeat the cycle per ticket.

## How to load a skill

These are local downloaded references, with paths relative to this project. Downloading a checkout does not register slash commands in a coding tool. In any tool, explicitly ask the agent to read and apply the named SKILL.md. If a skill is installed and registered, its native command can be used instead. Awesome DESIGN.md and Front-End Checklist are reference documents. React Bits is a component library.

|Name used in prompts|Read this local file|
|---|---|
|research|references/mattpocock--skills/skills/engineering/research/SKILL.md|
|domain-modeling|references/mattpocock--skills/skills/engineering/domain-modeling/SKILL.md|
|codebase-design|references/mattpocock--skills/skills/engineering/codebase-design/SKILL.md|
|to-spec|references/mattpocock--skills/skills/engineering/to-spec/SKILL.md|
|to-tickets|references/mattpocock--skills/skills/engineering/to-tickets/SKILL.md|
|code-review|references/mattpocock--skills/skills/engineering/code-review/SKILL.md|
|tdd|references/mattpocock--skills/skills/engineering/tdd/SKILL.md|
|pr|references/mattpocock--skills/skills/engineering/pr/SKILL.md|
|Impeccable|references/pbakaus--impeccable/cursor-plugin/skills/impeccable/SKILL.md|
|Unslop|references/heydamir--unslop/skills/unslop/SKILL.md|
|Ponytail|references/DietrichGebert--ponytail/skills/ponytail/SKILL.md|
|Taste|references/Leonxlnx--taste-skill/skills/taste-skill/SKILL.md|
|Frontend Design, optional|references/anthropics--skills/skills/frontend-design/SKILL.md|
|grill-with-docs, scope questions|references/mattpocock--skills/skills/engineering/grill-with-docs/SKILL.md|
|to-questionnaire, client facts|references/mattpocock--skills/skills/productivity/to-questionnaire/SKILL.md|

Read applicable guidance before using it and follow its actual prerequisites. Matt Pocock research and code-review guidance delegates bounded work to subagents. Use that delegation when applying those skills in a capable environment. Keep evidence for any checks that cannot run. Use tdd for behaviour requiring regression coverage such as pricing, rules and order transitions. Visual-only changes use browser and accessibility checks. For bugs use references/mattpocock--skills/skills/engineering/diagnosing-bugs/SKILL.md.

## Always included in every phase prompt

Research reads AGENTS.md, the phase documents, the incumbent code and relevant upstream docs. Every frontend task also reads references/VoltAgent--awesome-design-md/README.md and a relevant design-md/*/DESIGN.md. Bugatti informs object framing, BMW M accent restraint, Wired editorial hierarchy. DESIGN.md owns this project's beige/plum direction.

Code uses the phase-specific skills below and existing Next.js/TypeScript/Tailwind patterns. Read the target checkout's AGENTS.md and current Next.js guidance before changes. Use React Bits only for a justified component after licence, accessibility and bundle review.

Test uses code-review against the phase starting commit, Impeccable for visual checks, Unslop for visible screens, and the relevant sections of references/thedaviddias--Front-End-Checklist/README.md. Apply focused tdd where indicated above. Run build and inspect representative mobile/desktop sizes and keyboard navigation. Review every backend task's user-facing consequences with Unslop.

Ship uses pr for the description, records tests/screenshots/limitations, pushes a focused feature branch to AbdullahKhalid27/Premium-Plates and opens a PR when repository access is available. Verify remote and branch before writing. Required checks must pass. Review precedes merging because main currently deploys the GitHub Pages MVP. A frontend preview may use fixtures. Live payments/uploads require the server deployment and staff review workflow.

## Copyable phase prompts

### F1 · Design foundation

```text
Complete F1 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and DESIGN.md, Website Flow.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use Impeccable, Ponytail. Implement beige-led tokens, plum studio surfaces, typography, responsive navigation and footer with a neutral brand placeholder.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify contrast, font loading, focus, mobile overflow and the production build. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### F2 · Live hero and plate studio

```text
Complete F2 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and DESIGN.md, Website Flow.md, PRD.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use Impeccable, Ponytail; Taste for hero critique only. Reuse the MVP plate studio and transitions. Add Kiln angle/light controls, registration entry, front/rear and flat/gel/acrylic selection. Keep video optional below the opening.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify touch and keyboard controls, consistent registration/finish/side state, reduced motion and representative device performance. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### F3 · Catalogue and configurator

```text
Complete F3 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and PRD.md, Backend Schema.md, Database.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use domain-modeling, Impeccable, Ponytail. Build a shared collection and individual regular, 3D, 4D, short, hex, show and motorcycle pages. Model vehicle, layout, side, size, base material, lettering, border, badge and slogan independently. Preserve configuration between product, studio and basket.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify option compatibility, dimensions/layout, price presentation, state persistence and separate show/road-use intent. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### F4 · Comparison and official guidance

```text
Complete F4 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and DESIGN.md, Website Flow.md, PRD.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use research, Impeccable, Unslop. Add synchronized finish cards and accessible FAQ cards. Add product-specific Rules for this plate panels with reasons, sources and review dates. Use structured guidance shared with the future assistant.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify official-source accuracy, rule explanations, keyboard disclosures, text fallback, indexable content and direct product links. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### F5 · Basket and customer order screens

```text
Complete F5 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and Website Flow.md, Backend Schema.md, TRD.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use Impeccable, Ponytail; Unslop for recovery and status screens. Implement basket editing, checkout handoff, payment states, Verification Desk, upload/replacement states, secure-return UX and tracking using synthetic fixtures until APIs are ready.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify editing/resume, interrupted upload, rejected files, expired links, payment pending/failure and actionable feedback. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### F6 · Integration and release

```text
Complete F6 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and TRD.md, Backend Schema.md, Database.md, Features and Automations.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use codebase-design, Impeccable, Unslop. Connect tested backend APIs and staff review workflow. Complete metadata, sitemap, truthful product structured data, image loading and performance. Ensure live commerce has server-capable hosting.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify test-mode payment → upload → review → approval → manufacture → dispatch, cross-order access, duplicate webhooks, scan failure, refund reconciliation, crawlability and backup recovery. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### B1 · Backend and staff review

```text
Complete B1 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and TRD.md, Backend Schema.md, Database.md, Website Flow.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use domain-modeling, codebase-design, Ponytail, Unslop; Impeccable for staff UI. Implement transactional prices/orders, signed Stripe events, private scanned uploads, scoped customer sessions, staff MFA/permissions, review and audited release. Consult Unslop for resulting staff-facing UX.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify authorization, stale/concurrent reviews, idempotency, scan outage, document replacement, release gates, retention and restore. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```

### A1 · Future automation and assistant

```text
Complete A1 using the four-stage workflow in Phase Prompts.md.
Read AGENTS.md, GitHub repositories.md and Features and Automations.md, Backend Schema.md, Database.md.
Research: apply research for new facts, inspect the existing implementation and relevant primary sources, then use to-spec and to-tickets to define the scoped work and acceptance criteria. Apply Awesome DESIGN.md to frontend research as specified above.
Code: use domain-modeling, codebase-design, Ponytail; Impeccable and Unslop for visible UI. Implement one approved workflow at a time. Consume committed events, apply deduplication/retries/stop conditions and show staff delivery status. Ground the assistant in approved catalogue and cited guidance with human escalation.
Test: use code-review, the relevant Front-End Checklist items, Impeccable and Unslop for visible interfaces, and focused tdd for critical behaviour. Verify provider outage, duplicate events, suppression, closed/cancelled orders, escalation, permissions and sensitive-data exclusion. Fix failures before shipping.
Ship: use pr to describe the outcome and evidence. Push the scoped feature branch and open a PR to the verified project repository. Record remaining client dependencies. Follow the merge and hosting rules above.
```
