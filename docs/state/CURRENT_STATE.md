# HIVE — Current State (verification snapshot)

Last updated: generated from repo scan in this session. Scope covers apps, packages, tooling, and feature coverage versus the PRD acceptance list.

## Workspace & Tooling
- Monorepo: `pnpm` workspace with `apps/*`, `packages/*`, `functions/*` (pnpm-workspace.yaml: `pnpm-workspace.yaml:1`).
- Engines: Node 20, pnpm ≥10.18.2 (root `package.json:1`).
- Key scripts (root `package.json:1`): `pnpm dev --filter web`, `pnpm --filter @hive/ui storybook`, `pnpm dev:e2e`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`.
- Lints/enforcement: token lint `lint:tokens`, UI import guard, client directive lint; ESLint config present (`eslint.config.mjs:1`).
- Tests: Vitest unit/integration (`vitest.config.ts:1`), Playwright e2e for UI (`packages/ui/playwright.config.ts:1`).
- Firebase: rules/indexes tracked (`firestore.rules:1`, `firestore.indexes.json:1`), deploy helpers (`scripts/deploy-firestore-rules.mjs:1`).

## Repo Topology (high level)
- `apps/web` — Student app (Next.js 15): routes under `apps/web/src/app/**` (e.g., `feed`, `spaces/[spaceId]`, `onboarding`, `hivelab`, `rituals`).
- `apps/e2e` — Always-on fake backend + Next app parity surface. In-memory API at `apps/e2e/src/server/fake-db.ts:1`.
- `apps/admin` — Admin app scaffolding with tabs: Overview, Tools, Analytics, Moderation, Settings.
- `packages/ui` — Design system (atoms/molecules/organisms), brand tokens (`packages/ui/src/brand/brand.css:1`), utilities (focus ring, motion), Storybook config (`packages/ui/.storybook/*`).
- `packages/core`, `packages/firebase`, `packages/config`, etc. — shared types, Firebase helpers, configs.
- Canonical specs: `AGENTS.md:1`, `UI_GUIDELINES.md:1`, numerous product/design docs under `docs/**`.

## Design System & A11y
- Tokens and utilities: `packages/ui/src/styles.css:1`, `packages/ui/src/brand/brand.css:1`, `packages/ui/src/brand/tokens.ts:1`.
- Storybook-first ready: `pnpm --filter @hive/ui storybook`; stories for Spaces, Calendar, EventSheet, etc.
- A11y scaffolding present (focus rings, keyboardability), motion utilities aligned with brand.

## E2E Parity Surface
- In-memory fake API: `apps/e2e/src/server/fake-db.ts:1` with Spaces, Posts (standard/event/announcement), Events, members online, Tools, Resources.
- Mirrors Board/Calendar/Members widgets and flows; safe for UI development without backend dependencies.

## Feature Coverage vs PRD (acceptance baseline)

### Auth & Sessions
- Magic link/auth scaffolding: routes and services under `apps/web/src/server/auth/*` plus `/login` route (`apps/web/src/app/login/page.tsx:1`).
- Guarded routing via app shell and middleware (`apps/web/src/middleware.ts:1`).
- Status: Partial — flows exist, production checklist tracked (`AUTH_ONBOARDING_PRODUCTION_CHECKLIST.md:1`).

### Onboarding & Profile
- Onboarding wizard present (`apps/web/src/app/onboarding/page.tsx:1`, `apps/web/src/app/onboarding/components/*`). Emits session-state changes; DM/pick-spaces flags supported.
- Profile route is a stub (`apps/web/src/app/profile/page.tsx:1`).
- Status: Partial — onboarding present; profile completeness, verification, privacy guardrails need wiring and telemetry.

### Spaces — Board/Post
- Composer: chat-style form with attachments and media-approval policy note (`apps/web/src/components/spaces/SpaceDetailClient.tsx:500`).
- Composer actions row (≤6) via DS (`packages/ui/src/organisms/spaces/composer-actions.tsx:1`).
- Pinned carousel limited to 2 (`packages/ui/src/organisms/spaces/pinned-cluster.tsx:1`) and used in Space page.
- List: strict chronological, basic cards in Space page (`apps/web/src/components/spaces/SpaceDetailClient.tsx:720`).
- Event inline RSVP: DS component exists (`packages/ui/src/organisms/spaces/board-card-event.tsx:1`) but not yet used in Space board rendering.
- Threaded comments sheet: DS exists (`packages/ui/src/organisms/spaces/comments-sheet.tsx:1`) and is conditionally used for sheet view.
- Moderation: endpoints + telemetry (`apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1`); UI affordances present in DS (ghost state/banner).
- Proofs: `.ics` builder (`packages/ui/src/utils/ics.ts:1`) and EventSheet export controls; CSV/PDF hooks not yet integrated.
- Status: Partial — core board works (composer, pins, list), moderation hooks exist; inline event card with RSVP on Board and full proofs surface still to wire.

### Spaces — Calendar
- Views: Month/List component and EventSheet in DS (`packages/ui/src/organisms/spaces/space-calendar-view.tsx:1`, `packages/ui/src/organisms/spaces/event-sheet.tsx:1`); wired in app (`apps/web/src/app/spaces/[spaceId]/calendar/page.tsx:1`, `CalendarClient.tsx`).
- RSVP inline and optimistic update (`apps/web/src/app/spaces/[spaceId]/calendar/CalendarClient.tsx:1`).
- Check-in window utilities in event card (`board-card-event.tsx:160`).
- RSS import: one-time import endpoint creates event posts with `isRssImported` (`apps/web/src/app/api/spaces/[spaceId]/import/engage/route.ts:1`).
- T‑24h reschedule lock: Not found in server policies (gap).
- Remembered view: Desktop default passed via service; per-user persistence not implemented (gap).
- Status: Partial — core views/RSVP/ICS present; T‑24 lock and per-user view memory pending.

### Spaces — Members
- Roster in Space tab with basic presence and role changes (`apps/web/src/components/spaces/SpaceDetailClient.tsx:860`).
- CSV import/export and advanced filters not wired.
- Status: Partial — role management present; search/filters/CSV export pending.

### Spaces — About
- About tab shows description, guidelines; links/resources surfaced via widget (`SpaceDetailClient.tsx:1040`).
- Lints (PII/contrast/link safety) and version history/revert not present in app.
- Status: Partial.

### Tools & HiveLab
- HiveLab surfaces: routes under `apps/web/src/app/lab/*`, DS widgets (`packages/ui/src/organisms/spaces/widgets/*`).
- Tools repository/services exist (`apps/web/src/server/tools/*`), including limited-run and placements.
- Soft cap 2 auto‑posts/day/tool/space: no explicit enforcement observed (gap).
- Status: Partial — scaffolding solid; enforcement and proofs/CSV packs pending.

### Feed & Rituals
- Feed route and service exist (`apps/web/src/app/feed/page.tsx:1`, `apps/web/src/server/feed/service.ts:1`).
- Diversity cap, hide/mute/report, event snapshots, and Ritual strip not yet wired into Feed UI.
- Rituals service exists (`apps/web/src/server/rituals/service.ts:1`), but strip injection missing in Feed.
- Status: Partial — minimal feed only.

### Notifications
- Toasts/utilities present in DS; bell/dropdown pattern not present in app.
- Real-time hooks not wired; double-notify guard for Event Chat not implemented.
- Status: Gap.

### Admin Dashboard
- Admin app scaffolding present with tabs (`apps/admin/src/app/*`).
- Detailed analytics/export/proofs screens not yet complete.
- Status: Partial.

## Performance, A11y, Privacy & Security
- Perf budgets documented in PRD; no app-level measurement hooks observed yet. Virtualized lists not present in Feed.
- A11y: DS uses focus-ring utilities; components appear keyboardable. Reduced motion utils available.
- Privacy/Security: Firebase rules and indexes are defined (`firestore.rules:1`, `firestore.indexes.json:1`). No secrets committed; templates in repo root (`production.env.template:1`).

## KPIs & Telemetry
- DS telemetry utility exists (`packages/ui/src/utils/telemetry.ts:1`); app instrumentation for funnels and slice signals appears incomplete.
- Status: Gap — wire deterministic events per PRD §10 and surface dashboards.

## Risks & Gaps (high impact to PRD sign‑off)
- Board event inline RSVP not integrated into Space board cards.
- Calendar T‑24h reschedule lock and per‑user remembered view not implemented.
- Feed lacks composition rules (diversity cap, event snapshots), hide/mute/report, and Ritual strip.
- Notifications system (bell/dropdown, behavioral triggers) not wired.
- CSV/PDF proofs/exports not implemented across slices.
- Profile page is a stub; verification/privacy UI missing.

## Immediate Next Steps (proposed)
1) Spaces Board: swap generic post rendering for DS variants (`board-card-standard`, `board-card-event`) and wire inline RSVP to `/api/spaces/:spaceId/posts/:postId/rsvp`.
2) Calendar: implement T‑24h reschedule lock in server policy; add per-user view memory (cookie/localStorage) and persist via API when ready.
3) Feed: add Ritual strip injection from `server/rituals/service` and basic item diversity cap; add hide/mute/report actions.
4) Notifications: add bell/dropdown and toast patterns; mock real‑time hooks; add RSVP reminder trigger stubs.
5) Proofs/Exports: add ICS/CSV/PDF stubs to Admin and Space surfaces; hook `.ics` builder in EventSheet already available.
6) Profile: implement completion score, privacy banner, and verification audit trail.
7) Telemetry: instrument funnels and slice signals with deterministic event names; verify via `pnpm test:e2e` sweeps.

## Verification Shortcuts (artifacts)
- DS Storybook: `pnpm --filter @hive/ui storybook` (stories cover Calendar/EventSheet/Space Layout components).
- E2E parity: `pnpm dev:e2e` and interact with `apps/e2e` using `fake-db.ts:1` data.
- Tests: `pnpm test` (unit/integration), `pnpm test:e2e` (Playwright against Storybook config `packages/ui/playwright.config.ts:1`).
- Token/a11y lint: `pnpm lint:tokens`, checklist `docs/templates/a11y-motion-checklist.md:1`.

---
This snapshot is intended to drive a focused implementation plan to close the PRD acceptance gaps while preserving E2E parity and Storybook-first workflows.

