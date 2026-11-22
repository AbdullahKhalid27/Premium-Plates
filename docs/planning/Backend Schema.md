# Backend interfaces and state changes
Phase 2 → 3. All customer operations are scoped to a verified checkout session or scoped order session. Use opaque identifiers. Staff endpoints require authentication and an appropriate role.
|Operation|Input|Result and enforcement|
|---|---|---|
|POST /api/quotes|SKU, reg, options, quantity|Validate catalogue and return expiring price in pence with components.|
|POST /api/checkout|Quote ID, contact, delivery|Reprice expired quote, confirm changes and create pending order with idempotent Stripe session.|
|POST /api/stripe/events|Signed Stripe event|Validate signature, currency, amount and order. Atomically record event, payment and outbox item.|
|POST /api/orders/me/uploads|Evidence category and declared size/type|Paid order receives scoped quarantine upload permission. On receipt validate actual PDF/JPEG/PNG, 10 MB ceiling, readability of file structure, and scan.|
|GET /api/orders/me|Scoped session|Show status, outstanding categories, safe feedback and tracking.|
|POST /api/admin/orders/{id}/reviews|Evidence versions, decision, procedure reference, reason|Check reviewer rights and current versions. Record immutable decision. Replacement resets review and sends secure return instructions.|
|POST /api/admin/orders/{id}/fulfilment|Expected current state, next state, tracking when dispatched|Lock row, verify paid and current approved evidence. Log actor and emit event in same transaction.|
Payment: pending → paid → refunded or partially refunded. Verification: awaiting files → scanning → review → approved or replacement required. Fulfilment: held → released → producing → inspected → dispatched. Cancellation/refund is a staff exception under published terms. Reject stale edits with conflict and reload current state.
Acceptance: repeated events produce one transition. Replaced evidence invalidates earlier approval. A customer cannot access a second order. Next: Database.md.
## Configuration and guidance contract additions
F3/F4 define interfaces, B1 implements them, F6 verifies integration. Every stage follows Phase Prompts.md.
Quote input uses vehicleType, layout, side, widthMm, heightMm, baseMaterial, letteringFinish, borderId, badgeId, badgeColourId, slogan, sloganColourId, registration and quantity. Catalogue-backed identifiers and available combinations come from the server.
Add GET /api/catalogue for current SKUs/options and GET /api/guidance for published rule records. Preview and quote responses include ruleResults with ruleId, ruleVersion, status (pass/fail/review), reason, sourceUrl and suggested correction. No result grants proof of entitlement.
Version, validate and snapshot selected dimensions, intendedUse, totals and rule results. A later authenticated assistant endpoint gets only scoped approved catalogue/guidance context and separately authorised order status. Tool actions reuse existing authorization and audit paths.
Acceptance includes stale catalogue versions, incompatible inputs, identical frontend/server rule meaning and rejection of sensitive data in assistant context. Skills: domain-modeling/codebase-design at Research, Ponytail at Code, code-review/tdd at Test, pr at Ship; Unslop reviews resulting screens.
