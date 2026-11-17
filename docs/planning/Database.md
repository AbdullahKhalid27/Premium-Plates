# Data inventory
Phase 2 → 3. PostgreSQL owns commercial and workflow records. File bytes live in private object storage.
|Table|Principal fields and relationships|Use and access|
|---|---|---|
|products, sku_versions|SKU, style, allowed combinations, dimensions, approval date, effective dates, GBP pence|Published catalogue; staff version approved specs.|
|orders, order_items|Opaque order ID, timestamps, contact, delivery, payment/verification/fulfilment states; items reference order and contain reg, spec and price snapshot|Scoped customer and authorised operations staff.|
|payments, stripe_events|Order FK, unique session and event IDs, amount, currency, status, refund reference|Finance reconciliation.|
|documents|Order FK, category, version, object key, detected type, size, scan result, timestamps and delete-after|Verification staff only. Keep originals private and audit access.|
|reviews, supplier_sales_records|Order FK, reviewed document versions, reviewer, outcome, method and time; restricted sale register with customer address, registration, entitlement and required references|Preserve statutory sales records for three years. Confirm fields against the current supplier guidance.|
|staff, audit_log, access_tokens|Staff identity and role; actor, action, time, object ID; hashed token, expiry, scope|Restrict updates. Avoid copying document contents into audit logs.|
|shipments, outbox, deliveries|Order FK, carrier and tracking; event ID, type and time; unique event/channel, retry time and outcome|Operations, notifications and recovery.|
|leads, followups, customer_reviews|Source, owner, status, verified order reference where applicable, contact preference, review publication consent|Introduce lead automation in phase 4.|
Index orders by status and age, documents by order and version, outbox by next attempt. Use FK constraints and unique provider IDs. Restrict document retention to a justified client-approved period, independent of the sale register. Run scheduled deletion, record completion, and test restored backups against deletion records. Acceptance: recover an order’s history without retaining expired identity images. Next: TRD launch checks.
## Catalogue, rule and future assistant data
F3/F4 define, B1 implements and F6 verifies these additions.
Add catalogue_options and compatibility_rules for independent vehicle/layout/side/dimensions/base/lettering/border/badge/slogan choices. Preserve exact selected values and intended use on each order item.
Add guidance_sources (official URL, title, section, last checked), guidance_rules (stable ID, version, applicability, explanation, correction, source FK, staff approval and publication state), and item_rule_results (order item FK, rule/version, outcome). Archived order snapshots retain the context used at purchase.
Use a separate assistant knowledge projection of approved catalogue and public guidance. Access to identity files, reviewer-only notes and traceable document numbers requires staff permissions and is excluded from that projection. Store later notification and consent records only as needed by the chosen workflow.
Use the Research/Code/Test/Ship skill sequence in Phase Prompts.md. Test FK/version integrity, cross-order permissions, audit and retention behaviour.
