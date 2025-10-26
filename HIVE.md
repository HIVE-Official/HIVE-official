# HIVE Platform Audit — 2025-10-11

> Ground-truth snapshot of what ships, what breaks, and what still needs owners before UB release.

## Executive Summary
- The product surface spans landing, schools directory, magic-link login, onboarding, feed, spaces, rituals, and HiveLab surfaces; flows are navigable end-to-end with seeded data.
- Production readiness is blocked by design-system TypeScript errors (`packages/ui/src/organisms/profile/profile-header.tsx:62`) and reliance on in-memory repositories for core data paths (`apps/web/src/server/spaces/service.ts:19`).
- Firebase Admin credentials, magic-link sender, and telemetry fall back to console/in-memory implementations, leaving authentication/state without persistence or audit trails (`apps/web/src/server/auth/container.ts:95`).
- Observability, notifications, search, and growth instrumentation are not yet implemented; performance budgets and bundle audits remain unmeasured.

## Scoreboard
- [ ] **Launch-ready build** — `pnpm exec tsc -p apps/web/tsconfig.json --noEmit` fails on profile components in @hive/ui (`packages/ui/src/organisms/profile/profile-header.tsx:62`, `profile-privacy-banner.tsx:43`)
- [x] **Core identity flow clickable** — Magic link → onboarding → spaces routes exist (`apps/web/src/app/login/page.tsx:1`, `apps/web/src/app/onboarding/page.tsx:23`, `apps/web/src/app/spaces/page.tsx:5`)
- [ ] **Live data sources wired** — Feed, spaces, rituals, and HiveLab fall back to in-memory seeds unless env toggles are set (`apps/web/src/server/spaces/service.ts:19`, `apps/web/src/server/feed/service.ts:19`, `apps/web/src/server/rituals/service.ts:12`, `apps/web/src/server/tools/service.ts:9`)
- [ ] **Operational SRE baseline** — No monitoring, alerting, or error boundary coverage; Firebase AppCheck/App config absent
- [ ] **Growth loop instrumentation** — Notifications, search, analytics, and campus expansion flows are still stubs

## Product Surface Readiness

### Authentication & Identity
**Shipped**
- [x] Magic-link request/resume UI with user-type segmentation and deep-link support (`apps/web/src/app/login/page.tsx:1`)
- [x] Session fetch/destroy endpoints return onboarding completion state and set cookies on completion (`apps/web/src/app/api/auth/session/route.ts:1`, `apps/web/src/app/api/onboarding/complete/route.ts:1`)
- [x] Integration tests cover sign-up, progress persistence, and onboarding completion happy path (`apps/web/src/server/auth/controllers/auth.controllers.test.ts:8`)

**Gaps**
- [ ] Magic link sender and telemetry default to console when Firebase env vars are missing (`apps/web/src/server/auth/container.ts:95`)
- [ ] Profile, progress, and session repositories fall back to in-memory stores without persistence or multi-process safety (`apps/web/src/server/auth/container.ts:123`)
- [ ] Session hardening (expiry rotation, refresh, CSRF) and admin MFA policies are not defined in code or docs

### Onboarding Flow
**Shipped**
- [x] Catalog-driven stepper with personal, academic, interests, and consent collection (`apps/web/src/contexts/onboarding/components/OnboardingStepper.tsx:1`)
- [x] Catalog API hydrates majors/interests/residential options with Firestore fallback (`apps/web/src/server/catalog/catalog.service.ts:13`)
- [x] Onboarding progress endpoints allow resume/save/complete with tests exercising collision scenarios (`apps/web/src/app/api/onboarding/progress/route.ts:1`, `apps/web/src/app/api/onboarding/complete/route.ts:1`)

**Gaps**
- [ ] Catalog data lives in Firestore doc `catalog/onboarding` but no migration or seeding script ensures parity across environments
- [ ] Post-onboarding redirect logic assumes `/spaces` with static viewer ID and campus (`apps/web/src/app/onboarding/page.tsx:27`)
- [ ] No UX for photo upload, interest limits, or guardian consent enforcement

### Spaces & Communities
**Shipped**
- [x] Discovery grid with joined, recommended, and categorized sections; includes join/leave API endpoints (`apps/web/src/app/spaces/page.tsx:5`, `apps/web/src/app/api/spaces/join/route.ts:1`)
- [x] Space serialization enriches metadata, guidelines, and seeded events for UI presentation (`apps/web/src/server/spaces/service.ts:216`)
- [x] Space post service supports list/save against repository abstraction (`apps/web/src/server/spaces/service.ts:29`)

**Gaps**
- [ ] Viewer and campus IDs are hardcoded to `profile-jwrhineh` / `ub-buffalo`, blocking multi-user behavior (`apps/web/src/app/spaces/page.tsx:5`)
- [ ] Default repository is in-memory; Firestore integration requires `USE_FIRESTORE_SPACES=true` plus credentials (`apps/web/src/server/spaces/service.ts:19`)
- [ ] Event creation, admin moderation, and granular permissions are not implemented in UI or API contracts

### Feed & Discovery
**Shipped**
- [x] Feed page renders list of posts with timestamps, reactions, and tags (`apps/web/src/app/feed/page.tsx:5`)
- [x] Feed API validates query params with Zod and serializes domain items (`apps/web/src/app/api/feed/route.ts:5`)
- [x] Feed service composes space and post repositories for scoring pipeline (`apps/web/src/server/feed/service.ts:19`)

**Gaps**
- [ ] Feed data comes from static seeds unless Firestore flag enabled; no real-time updates or pagination state persisted (`apps/web/src/server/feed/service.ts:24`)
- [ ] Composer/posting UI is absent; feed remains read-only with no reporting or moderation
- [ ] Ranking inputs (engagement, relevance) are stubs; no instrumentation to tune algorithm

### Rituals System
**Shipped**
- [x] Ritual list page loads profile-specific rituals with cadence metadata (`apps/web/src/app/rituals/page.tsx:5`)
- [x] In-memory ritual repository seeds daily/weekly rituals for demo state (`apps/web/src/server/rituals/service.ts:12`)
- [x] Domain services and tests cover basic participation flows (`apps/web/src/server/rituals/ritual.application.service.test.ts:1`)

**Gaps**
- [ ] No creation/edit UI or API; participants data static
- [ ] Campaign lifecycle (buildup, climax, resolution) not represented in domain snapshot
- [ ] Notifications/social amplification hooks not present

### HiveLab Tools
**Shipped**
- [x] Dashboard renders owned/draft/published tools with template catalog (`apps/web/src/app/hivelab/page.tsx:31`)
- [x] Tool service wraps domain aggregates with in-memory repository and blueprint catalog (`apps/web/src/server/tools/service.ts:9`)

**Gaps**
- [ ] No visual builder, runtime execution, or publishing pipeline beyond seeds
- [ ] Tool analytics and deployment targets are static arrays; no persistence layer
- [ ] Permissions and space integration remain conceptual

### Profile & Social Graph
**Shipped**
- [x] Design-system provides profile header, stats, timeline, connections, and privacy banner components (`packages/ui/src/organisms/profile/profile-header.tsx:27`, `profile-layout.tsx:23`)
- [x] Profile domain contract defines sample snapshot for Storybook/tests (`apps/web/src/profile/profile.sample.ts:1`)

**Gaps**
- [ ] Design-system profile variants fail typecheck (missing `secondary`/`soft` badge variants, incorrect props) blocking builds (`packages/ui/src/organisms/profile/profile-header.tsx:62`, `profile-privacy-banner.tsx:43`)
- [ ] No Next.js route for `/profile/[handle]`; profile context not wired to data sources
- [ ] Connections/follow graph logic absent; design components rely on synthetic IDs (`packages/ui/src/organisms/profile/profile-layout.tsx:48`)

### Growth, Search, and Notifications
**Shipped**
- [x] Schools directory with request modal and API stub capturing interest (`apps/web/src/components/schools/SchoolsPage.tsx:23`, `apps/web/src/app/api/schools/request/route.ts:1`)

**Gaps**
- [ ] Landing page lacks waitlist capture, hero social proof, or metrics instrumentation (`apps/web/src/app/page.tsx:1`)
- [ ] No search endpoint or global command palette
- [ ] Notifications, inbox, messaging, and push infrastructure unimplemented
- [ ] Growth analytics (events, funnel tracking) missing from app and docs

## Platform & Architecture

### Frontend (Next.js 15 / React 18)
**Shipped**
- [x] App Router layout with shared GradientBackdrop/Container wrappers (`apps/web/src/app/layout.tsx`)
- [x] Context packages for auth, onboarding, profile, spaces, tools with provider hooks (`apps/web/src/contexts`)

**Gaps**
- [ ] TypeScript compilation fails, blocking `next build` and CI (`packages/ui/src/organisms/profile/profile-header.tsx:62`)
- [ ] Viewer identity is hardcoded across pages, preventing SSR per-user data (`apps/web/src/app/feed/page.tsx:5`, `apps/web/src/app/hivelab/page.tsx:11`)
- [ ] No error boundaries or loading states around critical routes; unhandled exceptions will crash the app

### Design System (@hive/ui)
**Shipped**
- [x] Tokenized atoms/molecules built on shadcn primitives (`packages/ui/src/atoms`)
- [x] Storybook configuration under `packages/ui` for component development

**Gaps**
- [ ] Badge variants lack `secondary` and `soft` definitions used by profile components (`packages/ui/src/organisms/profile/profile-header.tsx:62`, `profile-privacy-banner.tsx:50`)
- [ ] `ProfilePrivacyBanner` extends `HTMLAttributes` but overloads `onChange`, violating DOM typings (`packages/ui/src/organisms/profile/profile-privacy-banner.tsx:9`)
- [ ] Component props duplicate IDs instead of accepting caller-provided keys (`packages/ui/src/organisms/profile/profile-layout.tsx:66`)

### Backend & Data Layer
**Shipped**
- [x] Domain layer centralizes aggregates/services for auth, spaces, feed, rituals, tools (`packages/core/src`)
- [x] Firebase Admin wiring with Firestore repositories when credentials provided (`apps/web/src/server/firebase/admin.ts:12`)

**Gaps**
- [ ] Default execution uses in-memory repositories across auth, spaces, feed, rituals, and tools, so server restarts lose state (`apps/web/src/server/auth/container.ts:123`, `apps/web/src/server/spaces/service.ts:21`)
- [ ] Environment toggles (`USE_FIRESTORE_SPACES`) undocumented; no runtime guardrails to prevent mixing seeds with production data
- [ ] Firestore indexes and schema migrations not automated; `firestore.rules` hardcodes UB campus segregation (`firestore.rules:29`)

### Performance & Reliability
**Shipped**
- [x] Vitest unit coverage for onboarding, auth, feed, rituals (17 tests, 9 files)

**Gaps**
- [ ] Bundle size, Lighthouse, and Web Vitals budgets not measured; no code-splitting plan
- [ ] No caching, CDN configuration, or ISR strategy described
- [ ] Rate limiting limited to auth; API routes lack throttling, AppCheck, or abuse protections

## Quality, Testing & Operations

### Automated Quality Gates
- [ ] `pnpm exec tsc -p apps/web/tsconfig.json --noEmit` fails with 7 design-system errors (Badge variants, Card props)
- [x] `pnpm test` passes 17 unit/integration tests but logs Firebase credential fallbacks indicating env miss (`apps/web/src/server/firebase/admin.ts:12`)
- [ ] `pnpm lint` only targets auth/onboarding contexts; broader linting not configured

### Manual & E2E Coverage
- [ ] No Playwright tests or Storybook visual regression suite connected to CI
- [ ] Manual runbooks exist (`MANUAL_TESTING_GUIDE.md`) but not linked to release gating
- [ ] No device lab coverage; responsive/mobile QA pending

### Observability & Incident Response
- [ ] No Sentry/LogRocket integration, error boundary, or structured logging pipeline
- [ ] No uptime, performance, or cost dashboards; Firebase monitoring not wired to alerts
- [ ] `LAUNCH_DAY_RUNBOOK.md` referenced but metrics/on-call ownership not linked in code

### Security & Compliance
- [x] Firestore rules enforce campus isolation and UB-only access (`firestore.rules:29`)
- [ ] Rules rely on hardcoded campus ID and email domain; no support for multi-campus expansion (`firestore.rules:29`)
- [ ] Session cookies lack rotation and secure attribute enforcement outside production (`apps/web/src/app/api/onboarding/complete/route.ts:27`)
- [ ] No consent/audit logging persistence; magic link logs go to console fallback

## Critical Path (Next 14 Days)
- [ ] Fix @hive/ui profile component TypeScript regressions and re-run `pnpm typecheck`
- [ ] Replace hardcoded viewer/campus IDs with session-derived context across pages and services
- [ ] Stand up production Firestore with proper env wiring, seed scripts, and index deployment
- [ ] Implement minimal notifications/search or formally de-scope from launch plan
- [ ] Add error boundaries, monitoring (Sentry/Loki), and logging for auth and feed APIs
- [ ] Run bundle analysis, enforce split/lazy loading, and document performance budget

## Reference Runs
```
$ NODE_OPTIONS='' pnpm exec tsc -p apps/web/tsconfig.json --noEmit
packages/ui/src/organisms/profile/profile-header.tsx(65,20): error TS2322: Type "secondary" is not assignable ...
packages/ui/src/organisms/profile/profile-privacy-banner.tsx(43,20): error TS2322: Type "secondary" is not assignable ...
EXIT_CODE:1
```

```
$ NODE_OPTIONS='' pnpm test
Test Files  9 passed (9) — Firebase unavailable, using in-memory repositories (console fallback)
```

*Generated: 2025-10-11 — Update weekly or after major feature landings to keep the readiness picture honest.*
