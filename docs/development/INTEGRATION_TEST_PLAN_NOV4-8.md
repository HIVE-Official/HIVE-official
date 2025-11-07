# Nov 4–8 Integration Execution Plan

**Scope**: Feed, Spaces, Rituals, HiveLab, Profile, Auth  
**Goal**: Finish pre-launch verification with documented coverage, Storybook parity, and updated UX/UI checklists.  
**Sources of Truth**: `docs/UX-UI-TAXONOMY-CHECKLIST.md`, `docs/UI-UX-CHECKLIST.md`, `docs/ux/*_TOPOLOGY.md`, `packages/ui` stories.

---

## 1. Environments & Data Prep (Nov 3)
- **Primary environment**: `apps/web` local + staging preview (latest `main`). Confirm `withSecureAuth` middleware is active on all routes under test.
- **Seed data**:
  - Feed: generate 1,200 post fixtures (mix Post/Event/Tool/System) via Firebase emulator script; log script path.
  - Spaces: ensure three archetype spaces (Campus Clubs, Academics, Events) with leaders + members; include pinned posts.
  - Rituals: create Active (3), Upcoming (2), Completed (2) entries with varying progress values.
  - HiveLab: provision at least two tools with analytics mocks, one draft deployment, one published.
  - Profile: supply profiles with varied privacy settings (public, friends-only, private) and activity history.
- **UI library parity**: import any missing components into `packages/ui` prior to running the slice; Storybook stories must support axe and reduced-motion check.

---

## 2. Day-by-Day Checklist

| Day | Focus | Deliverables |
| --- | --- | --- |
| Mon (Nov 4) AM | Build verification | `pnpm typecheck`, `pnpm build` (with `NODE_OPTIONS="--max-old-space-size=4096"`), capture output summary in log |
| Mon (Nov 4) PM | Feed deep dive | Manual + load testing complete; perf metrics recorded; checklist updates committed |
| Tue (Nov 5) AM | Spaces & Rituals | Mobile + edge case coverage; cross-browser notes logged |
| Tue (Nov 5) PM | HiveLab & Profile | Deploy modal, analytics, privacy sweeps; Storybook parity check |
| Wed–Thu (Nov 6–7) | Auth + Cross-browser | Magic link E2E across Chrome, Safari iOS, Firefox; accessibility verification |
| Fri (Nov 8) | Performance | Lighthouse CI (< 2.5s LCP), bundle report (< 800 KB), production mode sanity run |

Update `TODO.md` and checklist docs at the end of each block with pass/fail notes and follow-up tasks.

---

## 3. Slice Matrices

### 3.1 Feed
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Build verification | Run typecheck/build commands; resolve blockers | `pnpm`, `NODE_OPTIONS` flag | `TODO.md`, `docs/UI-UX-CHECKLIST.md` build row | |
| Manual pass | Walk `/feed`, test j/k/l/c shortcuts, interactions | Seed data + keyboard mapping | Update Feed rows in `docs/ux/FEED_TOPOLOGY.md` + taxonomy checklist | |
| Load test (1,200 posts) | Execute emulator seed, monitor FPS | Firebase emulator, perf overlay | Document in `MANUAL_TESTING_GUIDE.md` + add perf metrics to TODO | |

### 3.2 Spaces
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Space board flow | Join → compose → pin → verify right rail | Seeded spaces | Update spaces section in topology + taxonomy checklists | |
| Mobile sweep | 375px viewport, touch interactions | Chrome devtools, Safari iOS | Add mobile notes to `docs/ux/SPACES_TOPOLOGY.md` | |
| Edge cases | Non-member view, leader controls, leave flow | Distinct accounts or role toggles | Record in TODO + taxonomy accessibility section | |

### 3.3 Rituals
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Grid & filters | Validate Active/Upcoming/Completed tabs | Ritual fixtures | Update `docs/ux/FEED_RITUALS_TOPOLOGY.md` + taxonomy | |
| Feed integration | Featured banner, join CTA sync | Feed + rituals seed alignment | Add notes to Feed + Rituals sections in checklists | |
| Detail layout | Load `/rituals/{id}` and verify hero, metrics, config JSON inspector; confirm CTA routes correctly | Ritual engine fixtures + devtools | Update taxonomy checklist (Ritual templates) + capture analytics log excerpt | |
| Cross-browser | Chrome, Safari iOS, Firefox | BrowserStack / devices | Accessibility entries in `docs/UI-UX-CHECKLIST.md` | |

### 3.4 HiveLab
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Studio interface | Validate canvas interactions, analytics | Pre-seeded tools, analytics mocks | `HIVELAB_UI_UX_TOPOLOGY.md` + taxonomy updates | |
| Deploy modal | Exercise `DeployModalProvider`, preview, analytics | `apps/web/src/app/hivelab/DeployModalProvider.tsx` | Update HiveLab rows in checklist; ensure Storybook parity | |
| Reduced motion | Verify animations respect media query | Browser devtools | Document in taxonomy accessibility section | |

### 3.5 Profile
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| View/edit | Profile view, edit flow, save confirmation | Privacy-varied profiles | Update `PROFILE_UI_UX_TOPOLOGY.md` + taxonomy | |
| Dashboard endpoint | Validate analytics widgets, null states | API logs, devtools | Record in TODO + UI checklist | |
| Privacy controls | Toggle visibility, verify feed impact | Multiple accounts | Document results and follow-ups | |

### 3.6 Auth & Onboarding (Wed–Thu)
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Magic link E2E | Request link → email template → verify → session | Staging Firebase, mail preview | `AUTH_ONBOARDING_PRODUCTION_CHECKLIST.md` + taxonomy | |
| Dev mode guardrails | Confirm bypass limited to dev, admin auto-grant | Local env with dev flag | Update TODO + security checklist | |
| Campus isolation | Attempt cross-campus access (should block) | Multi-campus test data | Document in `SECURITY-CHECKLIST.md` | |
| Cross-browser pass | Chrome, Safari iOS, Firefox accessibility | BrowserStack / devices | Update UI checklist accessibility rows | |

### 3.7 Admin Dashboard
| Scenario | Steps | Data / Tools | Checklist Updates | Owner Notes |
| --- | --- | --- | --- | --- |
| Overview metrics API | Run `vitest --run apps/web/src/test/integration/admin-dashboard-overview.test.ts` to confirm campus isolation + schema validation | Vitest, in-memory Firestore, secure auth mocks | `docs/UX-UI-TOPOLOGY.md` §2.10, `docs/UI-UX-CHECKLIST.md` admin row | |
| UI vertical slice | Enable `featureFlags.adminDashboard`, load `/admin`, verify skeleton → metrics → audit log → moderation queue, banner retry | Local env, secure session, Storybook `stories/admin/AdminDashboardShell` | TODO Admin sprint checklist, taxonomy checklist admin section | |
| Flag gating & security | Disable feature flag → confirm guard view; inspect network calls use `secureApiFetch` + CSRF; audit `/api/admin/dashboard` headers | Feature flag service, devtools, `withSecureAuth` logs | Update `SECURITY-CHECKLIST.md` admin rows | |

#### Admin Dashboard Smoke Script
1. Sign in as an admin-capable UB account and ensure `featureFlags.adminDashboard` returns `true` in devtools.
2. Visit `/admin` and capture skeleton → resolved state timings (expect <500 ms skeleton display, metrics populated in <2 s).
3. Trigger the reduced-motion preference and verify the metrics grid + audit list respect motion tokens (no slide animations).
4. Click each nav item (`Campaigns`, `Rituals`, `HiveLab`, `Moderation`) and confirm the sheet-first overlay opens with contextual copy, CTA links, and keyboard focus trapped.
5. Dismiss the sheet with the close button and ESC, ensuring focus returns to the nav rail and the active item resets to Overview.
6. Toggle the feature flag off (or use a non-admin account) to validate the gating screen and confirm no admin APIs are requested.
7. Re-run in a mobile viewport (≤600 px) to confirm the mobile nav pills open the same sheet overlay and remain accessible via swipe + keyboard.

---

## 4. Execution Log Template

```markdown
### <Feature> – <Scenario>
- Date:
- Environment:
- Result: ✅ / ⚠️ / ❌
- Evidence: (screenshots path, perf numbers)
- Follow-ups:
- Checklist updates: (file + line reference)
```

Add one entry per scenario, commit alongside checklist updates. Store screenshots in `docs/development/integration-artifacts/<date>` (create folder if needed, gitignore large binaries).

---

## 5. Reporting & Handoff
- End of each day: summarize outcomes in `TODO.md` (“Integration – Day X Summary”), referencing execution log sections.
- Consolidate open issues into `TODO.md` “Blockers” list with owners.
- Prep Friday perf report: Lighthouse scores, bundle sizes, outstanding deltas.
- Before Vercel/Firebase rotations, confirm all checklists show ✅ for tested scenarios and Storybook parity; note any deferrals.

---

## 6. Ready-to-Run Command Reference
```bash
# Build verification
NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Feed load test (example)
pnpm ts-node scripts/seed-feed.ts --posts=1200 --env=local

# Lighthouse CI
pnpm lint:lighthouse --preset=prelaunch
```

Keep command output summaries (start/end time, pass/fail) in the execution log.

---

### Rituals – Detail layout smoke
- Date: 2025-11-04
- Environment: local Next.js dev (`apps/web`), secure session
- Result: ✅
- Evidence: `/api/rituals/demo?format=detail` payload mapped to `RitualDetailLayout` Storybook fixture (`14-Rituals/RitualDetailLayout`); analytics queue shows `RitualCreated` event in console.
- Follow-ups: Add Vitest coverage for `toDetailView` + `/api/rituals/[id]` when Node runtime available.
- Checklist updates: `docs/UX-UI-TAXONOMY-CHECKLIST.md` Ritual templates section (line ~1016).

**Owners**: Integration pod (Laney, QA support). Update this document as scenarios complete to keep launch accountability transparent.
