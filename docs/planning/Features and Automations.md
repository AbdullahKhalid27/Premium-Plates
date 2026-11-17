# Features and automations
F6 completes integrated delivery of the studio, linked catalogue, checkout, private uploads, review desk, staff follow-up list, dispatch, review collection; eBay deferred. The hold queue is useful on day one even with zero messaging integrations.
|A1 workflow|Trigger and action|Stop and recovery|
|---|---|---|
|Document reminder|Paid order still missing required evidence after Amir’s agreed interval; send a secure return link.|Stop on submission, cancellation or staff pause; deduplicate by order and reminder window.|
|Inbound lead|Confirmed WhatsApp inbound message or submitted enquiry form creates or updates a lead, assigns an owner and alerts staff.|Stop reminders on paid, resolved or declined; deduplicate source message ID. A link click is only an engagement signal.|
|Dispatch notice|Committed dispatch event sends tracking via agreed channel.|Record provider delivery and retry transient failures; failed deliveries remain visible to staff.|
|Review request|Eligible fulfilled order prompts an honest review.|One request per order under client policy. Respect preference and suppression records.|
|FAQ assistant|Staff-approved catalogue, policies and official references answer routine questions.|Escalate verification decisions, refunds and individual order queries to staff.|
Later experiments: local car-photo mockup, private reveal export and optional video. Validate buyer demand and sample accuracy. Acceptance: simulate a duplicate event, provider outage and cancelled order before enabling any workflow.
## Current scope and integration timing
F1–F4 build storefront, live studio, full catalogue, comparisons, official guidance and interactive FAQs. F5 builds customer workflow screens. B1 supplies the backend and staff portal, and F6 verifies the integrated paid-order journey. A1 follows with advanced reminders, inbound leads and the AI assistant. eBay connection is deferred until the store URL and requirement are confirmed.
Reserve visible help entry points, stable catalogue/rule IDs, authenticated order-status APIs, an outbox, notification delivery history and staff escalation state now. Add one channel at a time later. Source/version public guidance for assistant answers and escalate uncertainty. The assistant must not decide document authenticity or release manufacture.
Every phase repeats Research → Code → Push with the explicit prompts in Phase Prompts.md. A1 uses research/domain-modeling/codebase-design, Ponytail, code-review and targeted tdd; Impeccable/Unslop apply to its customer and staff screens. Verify source-grounded answers, permissions, duplicate sends, suppression, outages and escalation.
