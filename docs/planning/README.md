# Premium Plates

## Current workflow and token efficiency
Use Research → Code → Push per phase. Run accumulated testing/review after F3 and F6, and pass that checkpoint before starting the next frontend phase. F1 is already tested. B1 supplies backend/admin for F6. Keep automatic required GitHub CI and investigate failures. Intermediate branches/PRs explicitly remain pending checkpoint testing. Main merges/public releases follow the relevant checkpoint and user authorization.
Use targeted research, reuse findings, read relevant files/diffs, load only needed skills, avoid repetitive subagent reviews and lengthy updates. Ask permission before each Ponytail use. Define acceptance criteria in tickets now and execute their full tests at the checkpoint. Check and fix actual observed defects immediately.

Open [Kiln](Playground/kiln.html), [After Dark](Playground/index.html) or [Pitwall](Playground/pitwall.html) locally. Each works offline. Choose the scene, enter a registration, change side, compare finishes, and move the inspection control. The playground contains simulated materials.
|Phase|Give the implementer|Task and exit condition|
|---|---|---|
|0 Scope|[PRD](PRD.md), [client questionnaire](Amir.md), [references](GitHub%20repositories.md)|Confirm business inputs and record unresolved launch dependencies.|
|1 Design|[Design language and typography](DESIGN.md), [website flow](Website%20Flow.md)|Review all three prototypes, approve one direction and verify renders against samples.|
|2 Architecture|[TRD](TRD.md), [backend](Backend%20Schema.md), [database](Database.md)|Build a test order through payment, upload, approval and dispatch.|
|3 Launch|PRD, TRD and website flow|Add the approved catalogue and client details. Pass the launch checks and restore rehearsal.|
|4 Automation|[Features and automations](Features%20and%20Automations.md)|Add one event consumer at a time and verify retry and stop conditions.|
## Agreed delivery sequence
The client brand is pending. PremiumPlates.com is the competitor; existing filenames and repository slugs are historical labels.
The current direction combines the MVP beige with Kiln plum and apricot. Earlier three-colour prototypes remain comparison studies. Use [Phase Prompts](Phase%20Prompts.md) as the current phase order and skill checklist; it supersedes the original broad phase numbers above.
|Phase|Documents to provide|Deliverable|
|---|---|---|
|F1|DESIGN, Website Flow|Tokens, typography, navigation and page frame|
|F2|DESIGN, Website Flow, PRD|Live studio and controlled material interactions|
|F3|PRD, Backend Schema, Database|Shared collection, individual product pages and full configuration|
|F4|DESIGN, PRD, Website Flow|Comparison, sourced rule panels and interactive FAQs|
|F5|Website Flow, Backend Schema, TRD|Customer basket, checkout and verification screens with fixtures|
|B1|TRD, Backend Schema, Database|Working backend and staff review portal|
|F6|All technical documents|Integrated commerce, security, SEO and release checks|
|A1|Features and Automations, technical documents|Future reminder, lead and assistant workflows|
Repeat Research → Code → Push for each row. Ship to a GitHub feature branch and PR. GitHub Pages can host the frontend preview; live commerce needs server-capable hosting. Use the stage-specific skills in Phase Prompts.md on every cycle.
