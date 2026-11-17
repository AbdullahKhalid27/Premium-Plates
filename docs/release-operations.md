# Release operations
## Branches and quality
Use one integration branch, main. Create short-lived feature/fix branches, focused commits and reviewed PRs. Each spec states problem, user behaviour, interfaces, scope, acceptance, tests, risks and recovery. Each ticket states blockers, deliverable and verifiable completion. Record Research → Code → Test → Ship evidence in the PR. Keep secrets out of Git, keep dependency lockfiles, review permissions and handle accessible/error/loading states.
## Version policy
Use semantic versions. F1 is 0.2.0. Record version in package.json and the footer. Tag a verified deployment v0.2.0 and retain its immutable SHA and workflow run. Use patch releases for compatible fixes and minor releases for new capabilities while pre-1.0.
## Restore the static website
1. Identify the last successful deployed commit from GitHub Actions and its version tag.
2. Run Deploy to Pages from main, setting commit_ref to the full known-good SHA.
3. Confirm the workflow succeeds. Visit home, navigation, studio and releases page; check registration and bag.
4. Record the incident, broken SHA, restored SHA, impact and follow-up fix in a GitHub issue.
5. If rebuilding the old revision fails, inspect dependency/font/network failure and retain the currently served site while recovering. GitHub Pages deployment jobs do not replace the site until the new artifact deploys.
A commit selection rebuilds old source using that revision's lockfile. Keep successful build artifacts as downloadable release assets when producing tagged releases for stronger reproducibility. This phase adds manual commit-based recovery; a production rollback drill remains outstanding until authorised deployment.
## Future commerce operations
Before B1/F6 production, establish separate staging and production, monitoring/alerts, backup owner, recovery objectives and a tested offsite restore. Version database migrations and use backward-compatible expansion before destructive changes. Rollback application and schema compatibility together. Private evidence, payment and order records require recovery plans beyond the static frontend. Introduce these controls in their implementation phase.


## Restoring the static site
1. Select a previously verified full commit SHA from the release record.
2. Open Actions → Deploy to Pages → Run workflow on main and supply that SHA in commit_ref.
3. Confirm the build and deployment succeed, then check homepage, assets, navigation and version.
4. Record incident, restored SHA, time and verification. Fix forward on a feature branch and review before redeployment.
For local rehearsal, create a detached worktree at the selected SHA, install its lockfile and build. The F1 rehearsal used webpack to accommodate a local dependency junction; production builds use the normal workflow. F1 source baseline is 69d8f96da8967148d4f83ebec29dac6c0acacc15. Release tags are immutable; use an explicit release-candidate tag before merge, and tag a stable release only after successful production verification.
