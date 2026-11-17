## Summary

Establish the agreed beige/plum foundation on the existing plate studio, with neutral branding and accessible navigation.

```text
Existing studio
  → beige header and shared colour/type tokens
  → keyboard collection menu and accessible mobile sheet
  → plum studio/footer and version history
  → PR build checks and known-commit rollback input
```

## Evidence

- Production static export, TypeScript and scoped lint passed. Lint has three existing warnings.
- Browser checks passed at 390, 768, 1280 and 1440px for overflow, navigation, focus, basket registration, version route and skip link.
- Screenshots and independent review fixes are recorded in docs/f1-validation.md and docs/evidence.
- Previous MVP commit rebuilt in a detached worktree. Live rollback has not been exercised.
- Dependency installation reported security advisories requiring separate triage before commerce.

## Merge Danger

**Door:** two-way

Static frontend change. A known commit can be rebuilt and redeployed with the workflow input.

**Blast Radius:** storefront

Merging main deploys the public MVP. F2–F4 still cover hero/video and deeper catalogue claims. This PR does not enable payments or document uploads.
