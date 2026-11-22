# Nightmark Plates search launch

The review build uses noindex on storefront pages. Set STOREFRONT_PUBLIC_URL to the approved full storefront URL, including its deployed base path, before building the public release. The current Next export uses /Premium-Plates/. If the live store moves to a domain root, align the app base path and asset/link prefixes before release.

For GitHub Pages, set the repository Actions variable `STOREFRONT_PUBLIC_URL` to that same approved URL. The deployment workflow passes it to the build. Leave the variable empty for a review build.

## Checkout on review builds

Run `node scripts/serve-preview.mjs` from `premium-plates-site` after building to exercise sample submission and receipts. GitHub Pages serves the sample downloads and checklist. The checklist disables submission when the sample receiver is unavailable. Production evidence intake requires server-capable hosting, private document storage and a supplier review workflow.

## Before indexing

Build with the final domain. Inspect the homepage, About, collection and seven product URLs in the generated sitemap. Each should return 200 and point its canonical at itself. Check that checkout, sample order links and release notes remain excluded. On a subdirectory deployment, the domain owner manages the root robots.txt. Put the final sitemap URL there or submit the sitemap directly in the verified Search Console property.

## Off-site work after brand approval

Agree the trading name, live domain and factual business details with Amir. Align existing business profiles with those details. For local listings, confirm business eligibility and which address or service area can be published. Ask existing workshop or fitting partners for an accurate reference to the relevant live product guide when it helps their customers. Secure consent before using customer photos or quotations. No outreach or profile edits have been made.

## Measure the release

Submit the sitemap in the verified property. Inspect the home, About, collection and one product URL. Check Google-selected canonicals and indexing coverage after crawling. Review impressions, clicks and landing pages for finish, profile and brand searches. Use real customer questions to improve the relevant guide; avoid generating near-identical pages for every registration, town or option combination.
