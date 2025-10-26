# TODO Master Checklist — Backend-First Execution

Last updated: 2025-10-20

Summary

- P0 slices: Spaces (community) + HiveLab Tools (activation) with Onboarding auto-joins. Feed, Profiles, Rituals, Notifications, Admin, Search proceed once upstream contracts settle.
- Backend-first gate: stabilize aggregates, serializers, routes, rules, and tests before wiring UI. Storybook scaffolds are allowed only when server shapes freeze.
- Always raise contradictions between specs, tickets, or code before continuing. Resolve conflicts in writing (reference the source doc) and update this checklist.
- Anchor work in student outcomes tied to HIVE pillars. Use plain-language acceptance checks from UB student behaviors (discover, join, coordinate, steer via Rituals). Avoid process jargon.
- Continuously test our unique value proposition (UVP): every feature should deepen student trust and engagement while keeping the platform scalable for YC-level growth.
- `TODO.md` is canonical. Update status as work lands; archive completed items to changelog docs when a slice ships.

Canonical References

- docs/business/PLATFORM_VERTICAL_SLICES.md:1 — source roadmap with sequencing notes
- docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1 — Spaces IA (overrides older specs)
- docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md:1 — design coverage for Spaces + HiveLab
- docs/business/HIVE_BRAND_PRIMER.md:1 — HIVE brand primer (Category, Pillars, UVP, Guardrails)
- AGENTS.md:1 — Operating agreements and brand context (meeting primer)

Build-for-HIVE Alignment (brand → engineering)

- [ ] Student-Owned: students control membership, roles, and norms in Spaces; reversible actions on posts/events; moderation is transparent with audit trails (spec: SPACES_V1_PRODUCT_IA_SPEC.md §2–§4).
- [ ] Tech-Sleek: performance budgets enforced (TTFB ≤ 1s; FCP ≤ 2.5s; P95 action latency ≤ 300ms), a11y first (keyboard, focus rings, aria-live, reduced motion), mobile-first responsive.
- [ ] Trust-Visible: verified presence, clear role chips on content, policy preflight for posting, reversible moderation with telemetry (apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1).
- [ ] Living Platform: feature flags around debatable patterns (e.g., NAV_DETAIL_MODE), telemetry on core loops, weekly research loops; do not overclaim HiveLab scope.
- [ ] Sovereign Spaces: membership and policy settings live in Space aggregate; leaders can tune posting/media approvals (packages/core/src/domain/spaces/aggregates/space.aggregate.ts:1).
- [ ] Campus-wide Voice (Rituals): experiences operate at campus level, never tucked inside Spaces; outcomes handed back to communities (RITUALS service routes).
- [ ] Distribution that works (Feed): events and posts reach the right students quickly; Recommended ranking blend defined and measured (service.ts:784; /api/spaces/recommended route).
- [ ] Extensions, not complexity (HiveLab): tools/extensions with roles/permissions, versioning, and safety gates; surfaces integrate via `toolContext` without bloating core UX.
- Guardrails: keep Rituals separate from Spaces; imply potential for HiveLab without claiming it “runs the whole campus.”

Definition of Ready for UI (applies to every slice)

- [x] Serializers frozen and documented with examples (docs/design/spaces/SPACES_SERIALIZER_REFERENCE.md:1; contract tests in apps/web/src/server/spaces/**tests**/space-serializer.contract.test.ts:1).
- [x] API routes implemented with parity tests and negative cases (join/leave/posts/moderation/recommended covered under apps/web/src/app/api/spaces/\*\*/route.test.ts).
- [x] Firestore rules + indexes drafted with rule tests (rules in firestore.rules; emulator-gated tests in apps/web/src/server/spaces/firestore.rules.test.ts:1).
- [x] Telemetry counters defined and wired to a sink (console sink for posts/events; recommendation metrics added).
- [x] Feature flags in place for debatable UX patterns (Flags: nav.detailSheet, recommendation.blend, cache TTL, repeat cap).

How to Read

- Each vertical slice is grouped Backend → Application Services & APIs → UI (deferred) → Infrastructure & Ops → Open Decisions → Evidence → Definition of Done.
- Checked items `[x]` are live in code + tests. Unchecked `[ ]` require implementation or explicit deferral callout.

---

## Active Feature Tracks (P0)

Focus on the slices students feel right away: onboarding auto-joins, sovereign Spaces, and the HiveLab tooling stack. Everything below must land with backend-first gates met before UI wiring. If a spec is unclear, sync with `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md` and `docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md` before writing code.

Tracks covered:

- `Onboarding & Auth` — keep auto-joins idempotent while protecting signup throughput.
- `Spaces` — community core per Spaces IA spec; no UI drift without Storybook proof.
- `HiveLab Tools` + Canvas/Elements/Integration — tools lifecycle across builder workflows and the Spaces surfaces they touch.

---

## HiveLab — System TODO (PRD‑aligned)

References

- PRD: `HIVELAB — Product Requirements (Hardened v1)` (conversation source)
- IA/specs: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:1`
- Serializer contract: `docs/design/hivelab/CANVAS_SHELL_SERIALIZER_CONTRACT.md:1`
- Third‑party UI policy: `docs/ux/THIRD_PARTY_UI_POLICY.md:1`
- UI guidelines: `UI_GUIDELINES.md:1`

Notes

- Backend‑first: freeze contracts and tests before wiring UI; Storybook-first for interaction/visuals.
- Guardrails: Board forbids platform bundling; Calendar T‑24 lock is source of truth; Tools attach to Events/Deadlines only; composer ≤6 actions.

### Canvas Shell

- [x] UI shell + rails + payload types (`packages/ui/src/organisms/hivelab/{types.ts,canvas-shell.tsx,left-rail.tsx,right-rail.tsx}`)
- [x] Lab shell pages (`apps/web/src/app/lab/[spaceId]/page.tsx`, `apps/e2e/src/app/hivelab/page.tsx`)
- [ ] API: `GET /api/lab/spaces/:spaceId/canvas` returns `HiveLabCanvasShellPayload`
  - [ ] Replace sample merge in `apps/web/src/app/lab/[spaceId]/page.tsx` to consume API only
  - [ ] Contract tests for serializer parity (fields present, no optional fallbacks)

### Builder Studio

- [x] Editor scaffold (condensed) with rails/settings (`packages/ui/src/organisms/hivelab/tool-editor.tsx`)
- [x] Edit route (`apps/web/src/app/lab/[spaceId]/tools/[toolId]/edit/page.tsx`)
- [ ] Placements editor (Start/Live/Board/Calendar) + audience + finish‑by
- [ ] Field counter + complexity badge in header

### Compiler (Budgets/Lints/Complexity)

- [x] Publish gate enforces fresh Run Test (≤10m) and blocks on blocking lints (`apps/web/src/server/tools/run-test.ts`)
- [ ] Enforce budgets: ≤12 fields • ≤4 record types • ≤2 actions
- [ ] Blocking lints: Calendar T‑24 conflict • PII/file unsafe • module writes attempted
- [ ] Compute complexity score (Green ≤4 • Yellow 4–6 • Red >6) and surface in UI
- [ ] Vitest coverage for all compiler rules

### Sandbox (Run Test Enhancements)

- [ ] Ghost roster options in report (sizes)
- [ ] Time‑warp snapshots (fast‑forward)
- [ ] Quota/notification simulator outputs
- [ ] Risk score surfaced in Canvas shell

### Presets & Library

- [x] TemplateBrowser scaffold (`packages/ui/src/organisms/hivelab/template-browser.tsx`)
- [ ] DTOs: Preset and Template (scope, defaults, locks, eligibility)
- [ ] Routes: `GET /api/lab/templates` (seed initial presets)
- [ ] Route: `POST /api/lab/spaces/:spaceId/tools/from-preset` (create draft)
- [ ] “Try in Sandbox” deep‑links to Canvas overlays

### Pilot & Certification

- [ ] Enforce Pilot caps: ≤2 spaces and 30 days (publish/deploy guards)
- [ ] Auto‑expiry + opt‑in migration for open posts
- [ ] Certification checklist gate (safety, clarity, conversion) before Library promotion

### Emission & Calendar Attach

- [x] Event attach search + attach API and UI (`apps/web/src/app/api/tools/[toolId]/elements/[elementId]/attachable-events/route.ts`, `apps/web/src/app/lab/[spaceId]/tools/[toolId]/AttachEventSheet.tsx`)
- [ ] Runtime endpoints for interactive elements per emission contract (e.g., RSVP/Check‑in/Slots/Forms)
- [ ] Calendar deep‑links to Post; no Calendar module writes; respect T‑24 lock

### Admin → Tools (Leader Lanes)

- [x] Ops usage API with composer cap ≤6 (`apps/admin/src/app/api/spaces/[spaceId]/tools/route.ts`)
- [ ] Leader lanes UI: Active/Scheduled/Warnings lanes with Pause/Resume/Extend TTL/Duplicate/Proof
- [ ] Composer actions ordering (≤6) and Dock widget pin/unpin

### Proof & Exports

- [x] ICS utility for events (`packages/ui/src/utils/ics.ts`)
- [ ] Route: `POST /api/tools/:id/exports` (CSV packs with Leader/Advisor redaction profiles)
- [ ] Per‑post Proof menu in UI (CSV/ICS)
- [ ] Audit‑log every export (Firestore/console sink)

### Telemetry & Dashboards

- [x] Telemetry ports (publish/deploy/usage/interaction) console/Firestore (`apps/web/src/server/tools/telemetry/*`)
- [ ] KPIs: Starts→Publishes %, Completion %, Abandon %, Cap overrides/day, export counts, widget utilization
- [ ] Minimal leader/admin KPI panels or Tool Home KPI cards

### Storybook & E2E

- [x] Rails + brand canvas stories (`packages/ui/src/stories/HiveLab.CanvasRails*.stories.tsx`)
- [ ] Stories: element states (collect/decide/attach modules), Tool Home (Run Test/Lints/Actions), Proof menus, leader lanes
- [ ] Playwright a11y sweeps for L1 interactive flows (via `packages/ui/playwright.config.ts`)
- [ ] E2E element catalog aligned to real primitives (`apps/e2e/src/stubs/core/hivelab/catalog.ts`)

### A11y, Tokens, Performance

- [ ] Replace raw hex usage in HiveLab widgets with tokens (`packages/ui/src/organisms/hivelab/widgets/tool-widget.tsx`, `packages/ui/src/organisms/hivelab/widgets/tool-usage-widget.tsx`)
- [ ] `pnpm lint:tokens` passes; WCAG AA (keyboardable panels, focus rings, reduced motion)
- [ ] Meet P95 budgets: Builder ≤200ms; Admin Tools ≤250ms

### Flags & Security

- [x] Feature flags utility present (`apps/web/src/server/flags.ts`)
- [ ] Gate new HiveLab APIs/surfaces behind flags with safe defaults
- [ ] Audit logging for all exports; verify Firestore rules and indexes for tool data

### Documentation

- [x] Serializer contract doc present (`docs/design/hivelab/CANVAS_SHELL_SERIALIZER_CONTRACT.md`)
- [ ] Slice brief(s) under `docs/design/briefs/` with a11y/motion checklist and “How to Verify” steps
- [ ] Update `docs/state/CURRENT_STATE.md` and this `TODO.md` as endpoints land

Acceptance (for first certified presets, UI/UX TBD)

- [ ] Preset created from Library runs end‑to‑end (emission, optional Calendar attach) and posts back to Space
- [ ] Tool Home shows fresh Run Test; publish gate enforced (≤10m and no blocking lints)
- [ ] Pilot caps enforced (≤2 spaces, 30d); certification promotes to Library
- [ ] Proof exports (CSV/ICS) succeed and are audit‑logged
- [ ] KPIs visible; Storybook + e2e/a11y checks pass; token lint clean and perf budgets met

## Onboarding & Auth

### Backend

- [x] Auth routes: signup/resend/verify/session lifecycle with safe defaults.
- [x] Onboarding progress read/write and completion controller.
- [x] Auto-join domain service writes real memberships for default/cohort spaces with parity tests (packages/core/src/application/onboarding/\*\*).
- [ ] Audit onboarding domain objects for idempotency (resume, completion, failed verification).
- [x] Server-side throttling for signup/resend/verify (per email/IP guard via `ThrottlePolicy` helper).
- [x] Harden serializer for onboarding snapshot (include campus/cohort metadata used by auto-join).
- [x] Rule tests enforce owner-only writes for profile/progress/session paths.

### Application Services & APIs

- [x] Handle availability check route.
- [x] Auto-join mapping per campus/cohort defined (config doc + JSON source) and enforced in app service.
- [ ] Telemetry counters for onboarding started/completed plus resend/verify errors wired to analytics sink.
- [ ] Metrics surfaced for starts/completions/time-to-complete (dashboards or export).
- [ ] Admin/backoffice API or script to update campus auto-join configuration safely.

### UI (Deferred until backend complete)

- [ ] Login screen UX (email entry, cooldown messaging, error states).
- [ ] Handle availability UI with validation + screen-reader hints.
- [ ] Onboarding wizard UX (resume progress, required vs optional steps, consent copy).
- [ ] Completion handoff (route to first joined space, fallback to catalog).
- [ ] A11y coverage: keyboard navigation, focus rings, aria-live for async validation.

### Infrastructure & Ops

- [ ] Production email sender configured with fallback behaviour and alerting.
- [ ] Secrets validated in prod (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).
- [ ] Firestore rules for profiles/settings/privacy, magic link docs, telemetry collection plus rule tests.
- [ ] Indexes for handle lookups + auth queries documented and deployed.
- [ ] Monitoring: Sentry on auth routes with alerting for 429/5xx spikes.
- [ ] CI gates (lint/typecheck/tests + smoke onboarding test) enforced for auth/onboarding changes.
- [x] Runbook covering email outages, throttling triggers, and manual auto-join fixes.

### Open Decisions

- [ ] Campus launch policy: who is live vs waitlisted; who flips a campus live.
- [ ] Auto-join defaults per campus/cohort (residential, majors, programs).
- [ ] Magic link sender domain/from name, subject, and copy.
- [ ] Rate limits (max resend per hour/day) and lockout messaging.
- [ ] Minimum required onboarding steps before auto-join triggers.

### Evidence

- Magic link resend: apps/web/src/app/api/auth/resend/route.ts:1
- Auto-join service: apps/web/src/server/auth/services/space-auto-join.service.ts:1
- Onboarding progress API: apps/web/src/app/api/onboarding/progress/route.ts:1

### Testing & QA

- [ ] Vitest suite covers onboarding resume/completion edge cases and throttling behaviour.
- [ ] Integration test ensures auto-join writes expected memberships for sample campuses.
- [ ] Playwright smoke covers request link → verify → onboarding completion flow (flagged until backend stable).

### Documentation & Comms

- [ ] Update docs/business/PLATFORM_VERTICAL_SLICES.md with auto-join + throttling status.
- [ ] Non-dev checklist in docs/onboarding/README.md (create if missing) explains How to Verify.

### Definition of Done

- Auto-join writes memberships, telemetry/metrics visible, rule tests pass, runbook published, all open decisions resolved.

### PRD v1 Alignment — Auth + Onboarding (feature-first)

- [ ] Sessions — 7-day TTL
  - Files: apps/web/src/server/auth/constants.ts:1, apps/web/src/app/api/auth/verify/route.ts:1, apps/web/src/app/api/onboarding/complete/route.ts:1
  - Do: set `SESSION_COOKIE_OPTIONS.maxAge = 60*60*24*7`; set `ttlHours=168` where sessions are created.
  - Verify: GET `/api/auth/session` shows `expiresAt ≈ now + 7d`.
  - Enforcement artifact: docs/specs/AUTH_ONBOARDING_INTEGRATION_GUIDE.md:1; vitest.
- [ ] Completion — require residentialSelection; cap interests ≤6
  - File: apps/web/src/server/auth/controllers/complete-onboarding.controller.ts:1
  - Do: extend Zod schema to require `residentialSelection` (enum) and ensure `interests.length >= 1` (cap `slice(0,6)` before service call).
  - Verify: POST `/api/onboarding/complete` 400 without residential; success persists ≤6 interests.
  - Enforcement artifact: docs/specs/AUTH_ONBOARDING_INTEGRATION_GUIDE.md:1; vitest.
- [ ] Handle check — campusId param (UB-only behavior unchanged)
  - File: apps/web/src/app/api/auth/check-handle/route.ts:1
  - Do: accept optional `campusId` query param (document future multi-campus filter).
  - Verify: API accepts param; returns `{ available }` consistently.
  - Enforcement artifact: docs/specs/AUTH_ONBOARDING_PRD.md:1; integration guide.
- [ ] Leader intent — intake API
  - Add: apps/web/src/app/api/leader/claims/route.ts:1
  - Do: store `{ profileId, campusId, spaceName?, roleProof?, advisorContact? }` to Firestore `leader_claims` when configured; idempotent per profile/day (409 on duplicate).
  - Verify: first POST 200 with `claimId`; same-day repeat 409.
  - Enforcement artifact: docs/specs/AUTH_ONBOARDING_PRD.md:1; integration guide; vitest.
- [ ] Privacy default — campus on completion
  - File: apps/web/src/app/api/onboarding/complete/route.ts:1
  - Do: after successful completion, set default privacy scope = `campus` if none set.
  - Verify: profile privacy reads as `campus` post-completion.
  - Enforcement artifact: docs/specs/AUTH_ONBOARDING_INTEGRATION_GUIDE.md:1.
- [x] Campus gate UB-only + waitlist path present
  - Evidence: packages/core/src/domain/profile/value-objects/campus-email.value.ts:1; apps/web/src/app/api/schools/request/route.ts:1
- [x] Domain validation: consent/handle/≥1 interest/academic enforced
  - Evidence: packages/core/src/domain/profile/aggregates/profile.aggregate.ts:120
- [ ] Tests — add coverage for above deltas
  - Do: write Vitest cases for 7d sessions, residential required, interests cap, leader claims idempotency, privacy default.
  - Enforcement artifact: vitest; docs/specs/AUTH_ONBOARDING_INTEGRATION_GUIDE.md:1.

---

## Profile System

### Backend

- [x] Profile bundle endpoint (snapshot + connections + activity + recs)
  - Evidence: apps/web/src/app/api/profile/route.ts:1; apps/web/src/server/profile/profile.service.ts:fetchProfileBundle
- [x] Privacy API and presence loader
  - Evidence: apps/web/src/app/api/profile/privacy/route.ts:1; apps/web/src/app/api/profile/presence/route.ts:1
- [x] Connections and Friends APIs (request/accept/remove; connect/disconnect)
  - Evidence: apps/web/src/app/api/profile/connections/route.ts:1; apps/web/src/app/api/profile/friends/route.ts:1
- [x] Personal calendar aggregation
  - Evidence: apps/web/src/app/api/profile/calendar/route.ts:1; apps/web/src/server/profile/calendar.service.ts:1
- [ ] My Spaces API (role buckets: owner/leader/member/pending/invited)
  - Add: apps/web/src/app/api/profile/spaces/route.ts:1 (UB v1: query spaces.memberRoles; TODO: membership index)
- [ ] Inbox aggregation (invites/requests + friend requests)
  - Add: apps/web/src/app/api/profile/inbox/route.ts:1 and respond endpoint
- [ ] Recommendations reasons (cohort/residential/interest) instead of generic “Popular”
  - Update: apps/web/src/server/profile/profile.service.ts:1 (loadRecommendations)
- [ ] Privacy default on onboarding completion (campus)
  - Update: apps/web/src/app/api/onboarding/complete/route.ts:1 (see Auth section)
- [ ] Optional: Personal ICS export for next 30 days
  - Add: apps/web/src/app/api/profile/calendar/ics/route.ts:1 using packages/ui/src/utils/ics.ts:1

### Application Services & APIs

- [ ] Document contracts in docs/specs/PROFILE_SYSTEM_PRD.md:1
- [ ] Track tasks in docs/specs/PROFILE_SYSTEM_TODO.md:1; follow integration guide docs/specs/AUTH_ONBOARDING_INTEGRATION_GUIDE.md:1 for cross‑slice hooks

### Testing & QA

- [ ] Vitest for: profile/spaces, profile/inbox, friends/connections error cases, rec reasons; calendar filters

### Definition of Done

- Profile bundle complete; My Spaces + Inbox endpoints live; privacy defaults applied; tests passing; evidence linked.

## Spaces

### Backend

- [x] Space catalog with filters and serialized overview/meta.
- [x] Space detail GET with join/leave and role assignment.
- [x] Space posts list/create with attachment mapping.
- [x] Parity validation between in-memory and Firestore post repositories via shared Vitest contract covering each post kind, pin expiry, and tool context fields (`apps/web/src/server/spaces/firestore-space-post.repository.test.ts:347`).
- [x] Moderation, visibility, and pin transitions enforced in aggregates/serializers with explicit state machine + audit events (`packages/core/src/domain/spaces/aggregates/space-post.aggregate.ts:410`, `packages/core/src/domain/spaces/aggregates/space-post.behaviour.test.ts:1`).
- [x] Media approval queue wiring for non-leader uploads inline with spec §2 “Media policy”, storing pending moderation snapshots (packages/core/src/application/spaces/media-approval.application.service.ts:1, apps/web/src/app/api/spaces/[spaceId]/media-approvals/route.ts:1).
- [x] Rule tests for spaces/members/posts including moderation + pin actions (apps/web/src/server/spaces/firestore.rules.test.ts:1).
- [x] Event calendar aggregation feeding `/spaces/[spaceId]/calendar` from same post source (apps/web/src/server/spaces/service.ts:360; apps/web/src/server/spaces/**tests**/calendar.service.spec.ts:1).
- [x] Audit log transport persists `SpacePostAudienceChanged` and `SpacePostPinStatusChanged` events to the governance sink per spec §2 “Moderation” (`apps/web/src/server/spaces/audit-log/firestore-space-post-audit-log.ts:1`).

// Hardening, performance and maintainability

- [x] Enforce join role hardening: remove `role` from join body and force default `member` in service; restrict elevation to role‑update path with server‑side auth (apps/web/src/app/api/spaces/join/route.ts:1, packages/core/src/application/spaces/space.application.service.ts:1).
- [x] Derive actor from authenticated session (with dev/test fallback) for moderation/media approvals/role updates and centralize role checks in a policy helper (apps/web/src/server/auth/session-actor.ts:1, apps/web/src/server/spaces/policy.ts:1, updated moderation/media-approvals/role routes).
- [ ] Split monolithic `apps/web/src/server/spaces/service.ts:1` into focused modules: `serializers.ts`, `calendar.ts`, `metrics.ts`, `catalog.ts` and keep options/types centralized.
- [x] Replace `Record<string, unknown>` with typed DTOs: `SerializedSpace` (apps/web/src/server/spaces/types.ts:1); adopt in `serializeSpace` and detail page mapper (apps/web/src/server/spaces/service.ts:666, apps/web/src/app/spaces/[spaceId]/page.tsx:1).
- [x] Gate post/metrics fetch: add `includeActivityMetrics` to `serializeSpace` and skip post queries when false (apps/web/src/server/spaces/service.ts:666).
- [x] Gate tool fetch: add `includeTools` (default false unless `includeMeta=true` and caller opts in) to avoid N+1 on hot paths (apps/web/src/server/spaces/service.ts:682).
- [x] Remove duplicate sort in `SpacePostApplicationService.list` and rely on repository ordering (packages/core/src/application/spaces/space-post.application.service.ts:1).
- [x] Request‑level cache for space serialization within `/api/spaces` to avoid re‑serializing the same snapshot for joined/recommended/discover (apps/web/src/server/spaces/service.ts:796).
- [x] Add simple concurrency limiter around batch serialization in catalog building to protect Firestore and reduce latency spikes (apps/web/src/server/spaces/service.ts:796).
- [x] Precompute and persist lightweight activity signals on `spaces` (e.g., `lastPostAt`, `recentPostCount1h`) during post save to power recommendations without per‑space list queries (apps/web/src/server/spaces/firestore-space-post.repository.ts:1, apps/web/src/server/spaces/service.ts:1). Read persisted signals in `serializeSpace` when available.

### Application Services & APIs

- [x] `/api/spaces` routes: list/create, detail, join/leave, role updates.
- [x] `/api/spaces/[spaceId]/posts` POST validates posting policy and attachments.
- [x] SpacePost serializer fields frozen for v1 (`kind`, `audience`, `attachments[]`, `toolContext`, `pinnedAt`, `pinExpiresAt`, `moderationStatus`).
- [x] Adapter parity tests covering Firestore shapes, pin expiry, visibility, moderation, and tool contexts.
- [x] Calendar data sourcing for `/spaces/[spaceId]/calendar` including List vs Month toggles.
- [x] About route data contract (leaders vs members) finalized with governance copy.
- [x] Admin `/admin/space/:id` data endpoints for Tools/Analytics/Moderation/Settings.
- [x] Proof/exports endpoints defined (CSV manifests per spec §2 “Proof”).
- [x] Moderation action endpoints (`auto_hide`, `unhide`, `escalate`, `remove`) persist state machine results + emit telemetry snapshots (`apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1`).
- [x] Telemetry counters for pin CTR, media approval latency, and moderation transitions hooked into analytics sink per spec §2 “Telemetry” (`apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1`).
- [x] `GET /api/spaces/recommended` returns paginated campus-scoped recommendations excluding joined, ranked by activity/urgency (`apps/web/src/app/api/spaces/recommended/route.ts:1`).
- [x] Student outcome checks drafted for Discover → Join → Safety flows (`docs/design/spaces/SCENARIOS_SPACES_DISCOVER_JOIN_SAFETY.md:1`).

// API refinements and recommendation service

- [x] Thin join/leave responses: return minimal updated space (members/membership/counts) and exclude posts/tools to keep hot paths fast (apps/web/src/app/api/spaces/join/route.ts:1, apps/web/src/app/api/spaces/leave/route.ts:1).
- [x] Move ranking into a `server/spaces/recommendations` service with a blend strategy (activity+affinity) controlled by `Flags.recommendationBlend()`; keep route thin (apps/web/src/app/api/spaces/recommended/route.ts:1, apps/web/src/server/flags.ts:1).
- [x] Add telemetry for recommendations: ranking latency + item count + cache hit rate; expose tunables via config (apps/web/src/app/api/spaces/recommended/route.ts:1).
  - Implemented campus-level in-process cache with TTL via `Flags.recommendationCacheTtlMs()` and repeat-cap via `Flags.recommendationRepeatCap()`. Emitting `cache.hit`, `cache.age_ms`, `items.returned`, and `rank.latency_ms` to console sink.
  - Status: latency + returned count emitted via console; cache/tunables pending.
  - Status: latency + returned count emitted via console; cache/tunables pending.

// Tests

- [x] Add test: join role hardening rejects client‑provided role; result role is `member` (apps/web/src/app/api/spaces/membership.scenario.test.ts:1).
  - Added scenario asserting a client-supplied `role` in join payload is ignored and membership is created with `member`.
- [x] Add test: `serializeSpace` with `includeTools=false` never calls tool service (spy) and with `includeActivityMetrics=false` avoids post fetch.
- [x] Add test: `SpacePostApplicationService.list` preserves repository ordering without re‑sort (packages/core/src/application/spaces/space-post.application.service.test.ts:1).

### UI (Rebuild — Story-first)

- [ ] Archive legacy Spaces UI/UX docs (e.g., `docs/design/spaces/SPACES_UI_UX_PLANNING.md`) and produce change log for future reference.
- [ ] Draft `docs/design/spaces/SPACES_SHELL_V2_IA.md` covering navigation, 60/40 layout, and four space types alignment with design system tokens.
- [ ] Storybook: `Spaces/Shell/Desktop` showcasing 60/40 board + Dock with fixtures for University Org, Student Org, Greek Life, and Residential.
- [ ] Storybook: `Spaces/Shell/Mobile` detailing drawer-based Dock, floating Post CTA, and tab transitions with reduced-motion variants.
- [ ] Dock widget system spec (Events, Tools, Safety) with accessibility states and telemetry hooks documented for implementation handoff.
- [ ] Copy and content guidelines for space categories (badges, safety language) refreshed to match shell rebuild.
- [ ] Design system audit enumerating required primitives/atoms/molecules for shell rebuild with gap remediation plan in `packages/ui`.

### UI Scope — Spaces (Storybook-first)

Canonical spec: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1`

- Structure and naming

  - Stories live in hierarchical folders under `packages/ui/src/stories/spaces/**`:
    - `spaces/post-stream/*` (Composer, PinnedCarousel, CommentsSheet, SpaceLayout)
    - `spaces/calendar/*` (CalendarView, EventDetail)
    - `spaces/about/*` (AboutSection)
    - `spaces/context-rail/*` (Dock; legacy code name ContextRail)
    - `spaces/widgets/*` (EventsWidget, ToolsWidget, ResourcesWidget)
  - Composer placement = bottom per Decision 0003 (`docs/design/decisions/0003-spaces-composer-placement.md:1`).

- Post Stream (spec §2)

  - Chat-style composer at bottom with Tool actions (≤6) and remembered visibility (private/public) per Space (`§2`, lines 47–51).
  - Tabs: All • Events • Tools; strict chronological order; Unread separator + Jump to latest (`§2`, lines 41–46).
  - Pinned carousel: max 2, mobile swipe, auto-remove on expiry (`§2`, lines 43–45). Story: `Spaces/PostStream/PinnedCarousel`.
  - Post sheet overlay at `/spaces/[spaceId]/post/[postId]` mounts `CommentsSheet`/`EventSheet` while preserving scroll/focus (`§2` routes note).
  - Safety preflight: PII + alt-text blocks; non-leader media approval request UX; moderation ghost state visuals (`§2`, lines 66–75, 83–86).
  - Telemetry knobs: composer starts→publishes, pin CTR, moderation transitions, media approval latency (console sink available in `apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1`).

- Calendar (spec §3)

  - List-first on mobile; Month/List toggle on desktop; Spotlight; Event opens in L1 sheet; one-tap RSVP + undo (`§3`).
  - Stories: `Spaces/Calendar/CalendarView` (List/Month), `Spaces/Calendar/EventDetail` (member/host/waitlist/past).

- About (spec §4)
  - `AboutSection` read/edit: overview, tags, links, policies summary, contacts (campus-scoped redaction), versioning (`§4`).
  - Story: `Spaces/About/AboutSection` with leader edit states and governance snapshot copy.

### Infrastructure & Ops

- [x] Firestore rules for spaces/members/posts (role-aware reads/writes) covering moderation + pin updates (`firestore.rules:1`).
- [x] Indexes for `spaceId+createdAt` and catalog filters.
- [x] Document additional indexes (pin/visibility queries) in docs/setup/SPACES_FIRESTORE_SCHEMA.md:1 and `FIRESTORE_INDEXES_SUMMARY.md:1`.
- [x] Monitoring on post create/list throughput + pin expiry job provisioned via `pnpm ops:spaces-observability` (docs/setup/SPACES_FIRESTORE_SCHEMA.md#L152).
- [x] Background job or trigger for expired pins removal (Cloud Scheduler + Function wired by `pnpm ops:spaces-observability`, docs/setup/SPACES_FIRESTORE_SCHEMA.md#L160).
- [x] Execute `pnpm ops:sync-space-events` in staging/production and verify `lastSyncedAt` + `isDeleted` flags before exposing calendar externally (`scripts/ops/sync-space-events.ts:1`; validation logged in deployment notes).

- Dock (spec §2 widgets, §5 Tools integration)

  - Events, Community, Resources, Tools previews with click-through. Stories live under `spaces/context-rail` and `spaces/widgets`.

- Fixtures and contracts

  - Add fixtures module: `packages/ui/src/fixtures/spaces/space-robotics.ts` seeded from adapter shapes (`apps/web/src/components/spaces/post-adapter.ts:1`) for repeatable data.
  - Stories must use fixture data to validate serializer parity (Evidence: `apps/web/src/server/spaces/__tests__/space-serializer.contract.test.ts:1`).

- A11y and performance budgets (spec §7)

  - P95: Post load ≤1.8s cold/≤1.2s warm; interactions ≤150ms; Calendar ≤300ms (100 events); Admin tabs ≤300ms.
  - WCAG AA; visible focus rings; reduced-motion respected; alt-text prompts.

- Definition of Ready for UI

  - Stable serializer fields (`kind`, `audience`, `attachments[]`, `toolContext`, `pinnedAt`, `pinExpiresAt`, `moderationStatus`).
  - Policy checks in routes (posting policy, join/access, moderation transitions) with tests passing.

- Definition of Done (UI stories)
  - Stories cover happy/edge/error states for Post Stream, Calendar, About, Dock.

### Spaces v1 Feature Parity (Spec-backed tasks)

- [ ] Board / Post Stream compliance (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:36-105,244-247; UI components under `packages/ui/src/organisms/spaces`)
  - [ ] Swap the ad-hoc filter buttons in `apps/web/src/components/spaces/SpaceDetailClient.tsx` for `BoardTabs`, drive All|Events|Tools queries, and add unread/jump affordances with max-two pin enforcement + expiry timers (enforcement: `pnpm lint`, Storybook stories).
  - [ ] Render posts with `BoardCard(standard|tool|event)` + `CommentsSheet`/`EventSheet` so we get inline RSVP/waitlist, reactions, share/proof controls, and tool contexts instead of plain text blocks (enforcement: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md` §2, Storybook snapshots).
  - [ ] Add per-post Private⇄Public slider + Proof exports wired to `/api/spaces/:id/proof`, remember visibility per member, and surface share-to-campus gates (enforcement artifact: `apps/web/src/app/api/spaces/[spaceId]/proof/route.ts:1` + spec §2).
  - [ ] Inline moderation + media approvals: use `MediaApprovalQueue`, report buttons, and ghost-state actions (unhide/remove/escalate) so leaders can resolve content without leaving the stream (enforcement: `packages/ui/src/organisms/spaces/media-approval-queue.tsx`, spec §2 “Moderation”).
  - [ ] Virtualize the feed, lazy-load media, and emit composer/pin/media telemetry to meet the §7 performance budget (enforcement: `pnpm lint`, `pnpm test`, telemetry sink `apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1`).
- [ ] Calendar parity (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:108-155,247)
  - [ ] Implement Spotlight event, filters (visibility/host/time/state), and live “Now” chip plus leader quick actions (Remind, Open/Close Check-In, Bump capacity, Duplicate, Pin, Cancel) inside `apps/web/src/app/spaces/[spaceId]/calendar` using `SpaceCalendarView` hooks.
  - [ ] Build the Event Sheet tabs (Details, Extensions, Attendees, Chat, Activity) with proof exports (RSVP CSV, Check-In CSV, ICS, Recap, Co-host split) and one-tap RSVP undo per spec §3 (enforcement: Storybook stories + `pnpm test:e2e`).
  - [ ] Wire check-in QR/self windows (T-30→T+30 defaults), waitlist auto-advance, and RSS “Imported” indicators so imported events stay read-only until claim (enforcement artifact: `apps/web/src/server/spaces/service.ts:320-360`, spec §3 + §8).
- [ ] Members roster feature set (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:9-12,247)
  - [ ] Hook `MembersRoster` actions up to `/api/spaces/:id/members/**` (invite/export/join-rule approvals/bulk promotions/removals) and expose CSV import/export paths (enforcement: API tests + spec acceptance).
  - [ ] Support optional Follower role and join policy toggles so Greek/Residential defaults match the spec (enforcement artifact: `packages/core/src/domain/spaces/aggregates/space.aggregate.ts:1`, spec §1).
- [ ] About module completeness (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:158-182,248)
  - [ ] Add cover uploader (safe-scan) + accent picker with contrast linting, verified badge/tagline, quick stats, and share-preview metadata inside `apps/web/src/app/spaces/[spaceId]/about` (enforcement: `UI_GUIDELINES.md`, spec §4).
  - [ ] Implement sections for overview (rich text with lints), tags/links (allowlist), policies summary synced with Settings, campus-scoped contacts, and helper list chips (enforcement: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md` §4).
  - [ ] Store and display provenance (`sourceNote`, `last_synced_at`) plus version history with revert + audit log entries (enforcement artifact: `apps/web/src/server/spaces/types.ts`, spec §4).
- [ ] Admin dashboard build-out (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:185-230,250; APIs under `apps/admin/src/app/api/spaces/[spaceId]/*`)
  - [ ] Create `/admin/space/:id` route with Overview tab summarizing Space Health, Events funnel, Safety pulse, and quick exports using existing API payloads (enforcement: `pnpm lint`, spec §6 “Overview”).
  - [ ] Tools tab: render installed lanes, composer ordering (≤6 actions), Library (Certified/Pilots/Drafts), cap override logging, and widget assignments powered by `apps/admin/src/app/api/spaces/[spaceId]/tools/route.ts` (enforcement: spec §5).
  - [ ] Analytics tab: charts for posts/member, active %, events funnel, tool starts→publishes, labels adoption with 7/28/90d filters; ensure ≤350 ms render target (enforcement: spec §5 “Analytics”, perf budgets §7).
  - [ ] Moderation tab: queue table with warn/mute/ban/remove/escalate actions and immutable audit log search (enforcement: `apps/admin/src/app/api/spaces/[spaceId]/moderation/route.ts`, spec §5 “Moderation”).
  - [ ] Settings tab: access/posting/visibility defaults, modules reorder/hide, ownership transfer, verification toggle, archive/delete flows referencing `/api/spaces` aggregates (enforcement: spec §5 “Settings”).
- [ ] RSS + system-run pre-seed (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:148,247; spec §8 operating model)
  - [ ] Replace the dev-only `/api/spaces/:id/seed-rss` helper with a backend RSS ingestor that creates unclaimed spaces/events with provenance fields and audit logs (enforcement: backend service tests + spec §8).
  - [ ] Surface “Imported” indicators on Board/Calendar, keep spaces read-only until claimed, and add “Claim this Space” verification flow gated by leader proofs (enforcement: `/apps/web/src/components/spaces/SpaceDetailClient.tsx`, spec §8).
  - [ ] Implement dedupe (`title+start_time+location` window), quality gates, and exports for RSS-created events with telemetry hooks so system ownership is auditable (enforcement: spec §8, telemetry sink).
  - Safety preflight and moderation ghost visuals present; telemetry knobs exposed.
  - Stories pass a11y addon checks and reflect reduced-motion variants.
  - Redundant legacy stories removed; only hierarchical `spaces/**` stories remain canonical.

### Research — Navigation & Detail Patterns (Sheet vs Route)

- [ ] Read research brief and finalize hypotheses/protocol: `docs/design/spaces/SPACES_NAVIGATION_RESEARCH_BRIEF.md:1`.
- [ ] Add route‑first story variants for EventDetail and PostDetail to compare with overlays.
- [x] Implement feature flag `NAV_DETAIL_MODE=sheet|route` in app for A/B (compatible with `nav.detailSheet`).
- [ ] Instrument telemetry events: expand_open/close, rsvp_click, comment_submit, view_all_click.
- [ ] Run 10 UB student usability sessions (counterbalanced). Synthesize findings.
- [ ] A/B on staging for RSVP funnel (sheet vs route). Define success thresholds.
- [ ] Decision doc in `docs/design/decisions/` with data + acceptance.

### Research — Spaces Zero‑Assumption

- [ ] Align on problem statement & outcomes (students, leaders, staff): `docs/design/spaces/SPACES_ZERO_ASSUMPTION_BRIEF.md:1`.
- [ ] Compare IA option set (chat‑first, feed‑first, events‑first, board‑first): `docs/design/spaces/SPACES_IA_OPTION_SET.md:1`.
- [ ] Card sorting (labels, grouping) and tree testing (findability) across options.
- [ ] Build lo‑fi Figma prototypes (mobile/desktop) for each option and detail pattern.
- [ ] Usability plan (tasks: join, RSVP, post, find resources, report): write scripts + success metrics.
- [ ] Hi‑fi Storybook prototypes mirroring Figma flows for evaluative testing.
- [ ] Synthesize findings → write decision record; update System Guide with chosen IA.

### Open Decisions (Spaces UI)

- [x] Composer placement = bottom (Decision 0003). Spec deviation documented (`docs/design/decisions/0003-spaces-composer-placement.md:1`; source spec at `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:47-51`).

### UI — Storybook tasks tied to spec (reference-only until backend complete)

- [ ] Post stream with bottom composer and tabs; integrate `PinnedCarousel` with mobile swipe (max=2) per §2 (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:41-45, 100-106).
- [ ] Post sheet overlay route (`/spaces/[spaceId]/post/[postId]`) mounting `CommentsSheet`/`EventSheet` while preserving scroll/focus per §2.
- [ ] Composer safety preflight: PII + alt-text lints with telemetry knobs; non-leader media approval request UX per §2 “Media policy”.
- [ ] About read/edit with Policies summary (join/posting/visibility/media) and campus‑scoped Contacts redaction per §4.
- [ ] Calendar List-first (mobile) + Month (desktop) with one‑tap RSVP + undo and Event L1 sheet per §3.
- [ ] Telemetry controls in stories (starts→publishes, pin CTR, moderation transitions, media approval latency) using console sink.

## HiveLab Tools

### Backend

- [x] Tool dashboard: draft create, publish, visibility update, deploy, archive, usage record.
- [x] Campus tools listing (`GET /api/tools/campus?campusId=&visibility=`).
- [x] Ownership/permission policy ports enforced in routes (leaders vs staff, campus scoping).
- [x] Persist ToolDefinition snapshots and enforce authoring policies on draft create/update (`packages/core/src/domain/tools/aggregates/tool.aggregate.ts:232`).
- [ ] Tool placement validation when publishing (max placements, conflicting verbs).
- [x] Telemetry events for Published/Deployed/Usage recorded via sink and persisted for analytics.
- [ ] Backfill script to migrate existing tools to new visibility/placement schema.

### Application Services & APIs

- [x] `/api/tools/**` routes for CRUD and deployments.
- [x] Campus catalog contract shared with Spaces board (include placement metadata + status).
- [ ] Tool placement sync with Space posts (`toolContext` parity).
- [ ] Admin endpoints for HiveLab QA (list flagged tools, export usage CSV).

### UI (Deferred)

- [ ] Catalog cards/grid/filters.
- [ ] Builder/editor (content, visibility, publish flow).
- [ ] Analytics dashboard and placement config UI.
- [ ] Deployment management UI (per-space placements, limits).
- [ ] Storybook stories for ToolCard, ToolBuilder states, Publish confirmation.
- [ ] Storybook: HiveLab shell, Left Rail, Tool Home, Run Test panel, Publish modal, Event attach sheet, Elements panel, Settings panel (desktop-only).

### Infrastructure & Ops

- [x] Firestore rules for tools collection and deployments.
- [x] Indexes for campus/visibility filters and dashboard queries.
- [x] Monitoring for publish/deploy failures and usage spikes.
- [x] Telemetry dashboards for usage events.
- [x] Data retention + export policy documented for tool usage metrics.
- [x] Scheduled job to reconcile stale deployments vs space membership changes.

### Open Decisions

- [x] Minimum tool element set locked to v1 primitives: Quick Form, Poll/Rank, File Upload, Slots/Shifts, Check-In Pro, Acknowledge (policy) (2025-02 product sync).
- [x] Visibility model confirmed: `private|space|campus|public`; campus/public require certified status; limited_run auto-expires to space-only (docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md §10).
- [x] Placement limits: one Start shortcut per tool & space, one Live dock pin per tool, single board:input and board:recap thread per tool enforced server-side.
- [x] Ownership escalation: campus staff with `toolPermissions.requiresApproval=true` plus system ops role `profileId=system` may force-publish/rollback; audits recorded.
- [x] Analytics KPIs v1: add→run conversion, run→publish conversion, limited run days remaining, space deployment count, campus coverage %, error rate.

### Evidence

- Tools service: apps/web/src/server/tools/service.ts:1
- APIs: apps/web/src/app/api/tools/\*\*:1

### Testing & QA

- [ ] Vitest coverage for permission middleware, placement validation, and telemetry emission.
- [x] Integration test for `/api/tools/campus` filtering by campus + visibility.
- [ ] Contract tests ensuring `toolContext` matches Spaces adapter expectations.

### Documentation & Comms

- [ ] Update docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md with tool states.
- [ ] Add campus catalog schema to docs/business/PLATFORM_VERTICAL_SLICES.md (HiveLab section).
- [ ] Draft HiveLab operations runbook (docs/operations/hivelab.md — create if missing) with publish/deploy steps.

### Definition of Done

- Campus listing live, policy checks enforced, telemetry stored + observable.

---

## HiveLab Canvas (Elements, Lints, Run Test, Publish)

Canonical spec: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:1`

### Backend

- [x] Define and export `ElementTile`, `ToolDefinition`, `LintIssue` types in `packages/core/src/hivelab/contracts.ts` with runtime zod validators and snapshot serializers (`packages/core/src/hivelab/contracts.ts:1`).
- [x] Seed the full Elements catalog for runtime/lint lookup (`packages/core/src/hivelab/catalog.ts:1`).
- [x] Authoring aggregate for `ToolDefinition` with policies: roles (leaders only), audience transitions (members/leaders/mixed), placement validation (Start/Live/Board/Calendar), and 8-field cap enforcement.
- [ ] Lint engine with rule registry and auto-fix actions matching spec (§6 Lints & auto-fixes). Blocking vs warning severities persisted to draft snapshots.
  - [x] Added field cap, PII+anonymous, event attach, live area, TTL required, digest bundling, alt-text nudge, and poll lock heuristics (`packages/core/src/hivelab/runtime.ts:135`).
  - [x] Persist lint results on Tool snapshots using catalog-driven engine (`packages/core/src/hivelab/lint.ts`, `packages/core/src/domain/tools/aggregates/tool.aggregate.ts:232`).
  - [ ] Storybook fixtures covering lint scenarios.
- [ ] Run Test compiler producing: student preview payloads, timeline markers, attach status, results snapshot, and health grade. Persist last-run timestamp.
  - [x] Persist last Run Test metadata (health + blocking count) on tool snapshots + exposed via APIs (`packages/core/src/domain/tools/aggregates/tool.aggregate.ts:219`, `apps/web/src/server/tools/run-test.ts:1`).
  - [x] Run Test API returns serialized tool with freshness + issues (`apps/web/src/app/api/lab/spaces/[spaceId]/tools/[toolId]/test/route.ts:1`).
  - [x] Ghost roster + fast-forward timeline outputs (`packages/core/src/hivelab/runtime.ts:128`).
  - [ ] Persist latest Run Test report snapshot for Canvas Tool Home summary (`docs/design/hivelab/CANVAS_SHELL_SERIALIZER_CONTRACT.md`).
- [ ] Publish gate enforces: last test ≤10m and no blocking lints; version pinning; statuses `draft | limited_run | certified`; 14-day limited-run expiry timer.
  - [x] Gate blocks publish when Run Test older than 10m or blocking lints present (`apps/web/src/server/tools/run-test.ts:73`).
  - [x] `ToolStatus` expanded to `draft|limited_run|certified|archived` with 14-day countdown metadata (`packages/core/src/domain/tools/aggregates/tool.aggregate.ts:199`).
  - [ ] Version pinning + persistence + countdown surfacing in Spaces pending.
- [x] Event attach service (per Space) with default window (next 7 days) + search + validation for `extends: events` (`apps/web/src/server/tools/event-attach.service.ts`, `apps/web/src/app/api/lab/spaces/[spaceId]/events/search/route.ts`).
- [x] Telemetry sink records `run_test_click`, `lint.*`, and attach search interactions with Firestore/console adapters (`packages/core/src/application/tools/ports/tool-telemetry.port.ts`, `apps/web/src/server/tools/telemetry/*`).
- [x] Firestore rules enforce leaders-only authoring writes for space-scoped tools and server-managed deployment pins (`firestore.rules:135`). Countdown exposure now limited to API contexts with leader access (`apps/web/src/server/tools/service.ts:68`).

### Application Services & APIs

- [ ] Routes (Space-scoped) — `GET/POST /api/lab/spaces/:spaceId/tools` (create/update drafts), `POST /api/lab/spaces/:spaceId/tools/:id/test`, `POST /api/lab/spaces/:spaceId/tools/:id/publish` (limited_run|certified), `GET /api/lab/spaces/:spaceId/events/search` (attach).
  - [x] Scaffolded `GET/POST /api/lab/spaces/:spaceId/tools`, `POST /api/lab/spaces/:spaceId/tools/:id/test`, `POST /api/lab/spaces/:spaceId/tools/:id/publish`, and `GET /api/lab/spaces/:spaceId/events/search` (stubbed to calendar seeds).
- [ ] Serializer contracts for Tool Home/Manage: placements, status, countdown, results cards, and exports links. (Blocks Canvas shell payload; see `docs/design/hivelab/SCENARIOS_CANVAS_SHELL.md`.)
- [ ] Replace picker API for over-8 fields: order by fields used ↓ then least recent; one-tap swap; undo token (5s).
- [ ] Future endpoints: support/request/follow with rate-limits (3 supports/student/week; leader request weight 5x).
- [ ] Canvas shell serializer: hydrate `space`, `systemTiles`, `tools`, `drafts`, overlay flags, permissions (`docs/design/hivelab/SCENARIOS_CANVAS_SHELL.md` “Shell & Navigation Data Contract”).
  - [ ] Implement `/api/lab/spaces/:spaceId/canvas` returning `CanvasShellPayload` (`docs/design/hivelab/CANVAS_SHELL_SERIALIZER_CONTRACT.md`).
  - [ ] Add placement/space lookups for deployment summary and limited-run countdown gating.
  - [ ] Snapshot tests for serializer output (Vitest) using fixtures.

### UI (Deferred until backend complete; Storybook allowed with frozen shapes)

- Canvas frame & navigation
  - [x] Student outcome checks for Canvas shell & navigation (`docs/design/hivelab/SCENARIOS_CANVAS_SHELL.md`).
  - [ ] `HiveLabShell` (Left Rail · Center · Right Dock desktop layout) + overlay scaffolding (Library, Run Test, Publish, Lint drawer, Replace picker).
    - [x] Brand Canvas baseline (no rails) story (`packages/ui/src/stories/HiveLab.BrandCanvas.stories.tsx`).
    - [x] Canvas Rail primitives (left/right floating overlays) with stories (`packages/ui/src/organisms/hivelab/canvas-rail.tsx`, `packages/ui/src/stories/HiveLab.CanvasRails.stories.tsx`).
    - [x] Canvas safe-inset layout story (content respects rails) (`packages/ui/src/organisms/hivelab/canvas-layout.tsx`, story `WithContentNonOverlap`).
    - [x] Accurate rails bound to contract payload; Elements list pulled from core catalog (`packages/ui/src/organisms/hivelab/left-rail.tsx`, `packages/ui/src/organisms/hivelab/right-rail.tsx`, story `AccurateRailsFromPayload`).
    - [ ] Storybook scaffolding reset; rebuild the rest of HiveLab stories from scratch (2025-02 reset).
    - [ ] Extract reusable rail/placements/lint primitives from preview component.
  - [ ] Space picker overlay & context switcher (leaders-only).
- Left Rail
  - [ ] `SystemTile` states (Events, Join/Chat, About) with live/idle badges.
  - [ ] `ToolList` / `ToolRow` with placement glyphs, limited-run chip, telemetry wiring.
  - [ ] Drafts footer CTA component.
- Center stage
  - [ ] `ToolHome` (metrics cards, countdown panel, placement badges, deployment table, action bar).
  - [ ] `CanvasAuthoring` shell (element tree, node inspector, presence indicators, Run Test stale banner).
- Run Test experience
  - [ ] `RunTestPanel` (preview summary, ghost roster chips, fast-forward timeline, results summary, issue list).
- Publish & versions
  - [ ] `PublishModal` (limited run vs certified cards, version pin summary, confirm footer).
  - [ ] `VersionBadge` / countdown chip primitives for reuse across Dock + manage views.
- Attach & lint overlays
  - [ ] `EventAttachSheet` (search input, results list, pagination CTA telemetry).
  - [ ] `LintDrawer` with grouped autofixes; `ReplacePickerDialog` with undo banner.
- Right Dock panels
  - [ ] `ElementsPanel` (Core/Future tabs, search, tile cards, future preview states).
  - [ ] `SettingsPanel` (audience toggle, placement toggles, time picker, reminder checklist, safety toggles, element inspector).
- Library & Future
  - [ ] `LibraryModal` + template tiles grid.
  - [ ] `FutureTile` variant with support/request/follow CTA (telemetry stub).
- Shared primitives
  - [ ] Placement glyph tokens, telemetry button/toggle wrappers, skeletons & empty states (Run Test, Tool list, attach sheet).

### Infrastructure & Ops

- [ ] Indexes for lab collections (tools, drafts, deployments) and event attach queries.
- [ ] Scheduled job to expire limited-run tools and update Dock status (leaders-only countdown).
  - [x] Added job to auto-certify expired limited run tools (`scripts/jobs/expire-limited-run.ts:1`).
  - [ ] Notify leaders in app and update Space Dock when countdown ends.
- [ ] Monitoring/alerts for publish/test errors; dashboards for add→run and run→publish conversions.
- [ ] Data retention policies (12m hot + 24m cold) enforced with exports.

### Open Decisions (blockers to route/UI work)

- [x] Route prefix resolved: adopt `/lab` as canonical; maintain `/hivelab` redirect during transition.
- [x] Space scoping: `/lab` shows leaders-only picker, Canvas runs at `/lab/:spaceId`; legacy `/hivelab` hard-redirects (2025-02 PM sync).
- [x] Overlay routing flags resolved: client-side query params `?library=1`, `?test=1`, `?publish=1` hydrate via useSearchParams (SSR-safe shell).
- [x] Event attach search scope locked: default window next 7 days, optional `windowDays` max 30, pagination via `cursor` with page size 20.
- [x] Lint action registry names frozen per spec with `autofix.action` canonical strings (2025-02 PM sync).

### Evidence

- Current route: apps/web/src/app/hivelab/page.tsx:1
- Shell context switch: apps/web/src/app/shell.tsx:27
- IA reference mentioning `/hivelab`: docs/foundation/specs/design/ui-ux-ia.md:191

### Student Outcome Checks (UB student value)

- Leader at UB opens `/lab` → Space picker (leaders-only) → `/lab/:spaceId`.
- Leader adds RSVP + Check-in, attaches to an Event via inline attach, runs test, publishes Limited run; countdown shows only to leaders in the Dock; members use tool in Space.
- Leader builds always-on Queue (Live only) with optional Board recap; no Calendar; no spam to Board.
- Leader configures File Submit with Finish by; reminders show in Run Test timeline; optional recap.
- Leader adds leader-only element to member tool → hint and one-tap fix; anonymous auto-off when PII present.
- Leader hits 8/8 fields → Replace picker orders by fields used ↓; swap works; Undo (5s) restores prior state; lints clear.
- Publish blocked when last Run Test >10m or blocking lints exist; unblocked after re-test/fix.
- Limited run countdown automatically certifies tools after 14 days (job backs this).

### Definition of Done

- Contracts and rules shipped; publish/test gates enforced; telemetry live; indexes and rules deployed; Storybook/UI wired only after backend contracts freeze.

---

## HiveLab Elements (Primitives Catalog & Operators)

Canonical spec: `docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1`

### Backend

- [x] Freeze Slot/Operator/WriteKind enums and validators (zod) in `packages/core/src/hivelab/contracts.ts`.
- [x] Define `ElementDefinition` schema (purpose, slots, writes, guardrails, capabilities) and `ElementTile` metadata (`packages/core/src/hivelab/contracts.ts:120`).
- [x] Seed full Elements catalog (Foundation, Event extensions, University Org, Greek, Residential, Classes, Panels) for runtime/lints (`packages/core/src/hivelab/catalog.ts:1`).
- [ ] Authoring policy checks: 8‑field cap, PII + Anonymous block, audience derivation, event attach only for elements with `extends: events`.
- [ ] Global operators: TTL, GateByLabel, VisibilityWindow, DigestContribution, ModerationMode, LightMode enforcement in aggregate/service.
- [ ] Adaptation/Light‑mode compiler: trim risky options, enforce TTL for announcements, disable moderated uploads when capability missing.
- [ ] Writes mapping: per‑element writes → Space posts/records with idempotency and retention policy hooks.
- [ ] Lints: PII fields, TTL required on announcements, digest bundling, alt-text nudge, options lock for Poll after first vote.
  - [x] Field cap, PII+anonymous, event attach, live area, TTL, digest bundling, alt-text, poll lock heuristics wired to catalog (`packages/core/src/hivelab/runtime.ts:135`).
  - [ ] Expand to handle authoring policies (audiences, global operators) and Storybook fixtures.

### Application Services & APIs

- [ ] Elements catalog endpoint (Space-scoped) with Core/Future flags and synonyms for search.
- [x] Event attach search API (next 7 days default; search/pagination) aligned with Run Test — seeded via calendar fixtures.
- [ ] Replace picker API contracts (order by fields used ↓ then least recent; 5s undo token).
- [ ] Telemetry: `tile_view/add`, `replace_picker_*`, `attach_*`, `search_query`.

### UI (Deferred until backend complete)

- [ ] Elements panel virtualization; search with synonyms; SR strings; placement/audience chips.
- [ ] Inline attach step for `extends: events`; “Change attach” link persists.
- [ ] Future tiles (grayed) with Support/Request/Follow and caps.

### Infrastructure & Ops

- [ ] Indexes for elements catalog, attach queries, and Future counts.
- [ ] Rules for leaders‑only authoring writes; PII + anonymous disabled; digest write caps.
- [ ] Monitoring dashboards for add→run conversion and board bump rate.

### Open Decisions

- [x] Parenthetical write kinds stored as canonical snake_case keys (e.g., `checkout_equipment`) with analytics dimension preserving display label `checkout(equipment)`.
- [x] Cap defaults: Counters reset weekly with goal optional; Queues max 25 active per tool; Supports (`future.*`) limit 3 per student per week; configuration surfaced via operators.

### Evidence

- Contracts placeholder: packages/core/src/hivelab/contracts.ts:1
- Spec doc: docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1

### Student Outcome Checks (UB student value)

- A leader adds a Quick Form to a tool (post slot), collects ≤5 fields with required flags, runs test (shows “Creates one post for input”), publishes, and exports CSV.
- A leader adds Poll (event_during) with results “after end”; test timeline shows posting and no digest spam; options lock after first vote.
- Add File Upload gated “require before check‑in” for an Event; test shows pre‑event attach and blocks Check‑In until file exists.
- Add Heads‑Up announcement with TTL; lints block publish until TTL set; digest bundling enabled by operator.
- RA uses Room/Lounge Booking; conflicts prevented; ICS issued; weekly caps enforced.
- PhotoDrop runs with safe‑scan; PII + anonymous blocked; recap optional; exports ZIP.

### Definition of Done

- Catalog stable with validators; operators enforced; writes mapped; lints present; telemetry captured; endpoints and indexes in place; UI unblocked.

---

## Lab ↔ Spaces Integration (Surfaces, Posts, Calendar)

Canonical specs: `docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md:1`, `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1`

### Backend

- [ ] `ToolRuntimeSnapshot` serializer emits placements, status, countdown, audience, dock, fieldsCount, hasPII, attachedEventId.
- [x] Interim runtime and Run Test report wiring (`packages/core/src/hivelab/runtime.ts:19`) — expand with persistence, countdowns, Limited run lifecycle.
- [ ] SpacePost serializer includes `toolContext` parity (kind, runtime version, placement); board bump rules enforced server-side.
  - [x] Guard blocks duplicate board threads/recaps per tool (`packages/core/src/application/spaces/space-post.application.service.ts:40`).
  - [x] toolContext now carries toolVersion for runtime parity (`apps/web/src/server/spaces/service.ts:524`).
- [ ] Publish flow pins `tool@version` and writes limited-run expiry; leaders-only countdown.
  - [x] Store limited run expiry + version increments on tool snapshots (`packages/core/src/domain/tools/aggregates/tool.aggregate.ts:199`).
  - [x] Added limited run expiry lookup helper + job stub (`apps/web/src/server/tools/limited-run-expiry.ts:1`, `scripts/jobs/expire-limited-run.ts:1`).
  - [x] Surface countdown in serialized tool payloads and persist `tool@version` pins (`apps/web/src/server/tools/service.ts:70`, `packages/core/src/domain/tools/aggregates/tool.aggregate.ts:596`).
- [x] Event attach service (Space-scoped) with 7-day default window + search; validates `extends: events` (`apps/web/src/server/tools/event-attach.service.ts:1`).
- [ ] Reminders compiler emits timeline markers for test and publish, and schedules for Space surfaces.

### Application Services & APIs

- [ ] `GET /api/lab/spaces/:spaceId/tools` for rail/manage with placements + status.
  - [x] Endpoint returns tool status, limited run countdown, version, and test freshness for rail integration (`apps/web/src/server/spaces/service.ts:320`).
- [ ] `POST /api/lab/spaces/:spaceId/tools/:id/publish` (limited_run|certified) with gates.
  - [x] Route enforces Run Test freshness + blocking lint gate and returns updated tool snapshot (`apps/web/src/app/api/lab/spaces/[spaceId]/tools/[toolId]/publish/route.ts:1`).
- [x] `GET /api/lab/spaces/:spaceId/events/search` for attach picker (`apps/web/src/app/api/lab/spaces/[spaceId]/events/search/route.ts:1`).
- [ ] Exports endpoints: CSV/PDF per tool run (IDs `space__tool__postId__YYYY-MM-DD`).

### UI (Deferred until backend complete)

- [ ] Left Rail shows placement markers (Start/Live/Manage) and ⏳ for Limited run (leaders‑only).
- [ ] Space Start composer shortcut shows for member‑audience tools.
- [ ] Live area tile shows state changes without board spam.
- [ ] Board thread behavior matches on_input/recap_only.
- [ ] Calendar badge shows Finish‑by and/or Event attach.

### Infrastructure & Ops

- [ ] Rules for leaders‑only countdown; members never see Limited run label.
- [ ] Indexes to support rail queries and attach window; telemetry dashboards for board bump rate.

### Student Outcome Checks

- Leader publishes Limited run tool; Space rail shows ⏳ to leaders; members see normal tool.
- Limited run countdown automatically converts tools to Certified after 14 days.
- Live updates generate state changes only; board does not bump unless input required.
- Recap posts once; pins/visibility behave per Spaces rules.
- Run Test blocks publish when >10m old or blocking lint outstanding.

### Definition of Done

- Runtime snapshots drive surfaces accurately; posts include toolContext and follow bump rules; attach and reminders wired; exports available.

---

## Supporting Feature Tracks (ready once P0 contracts hold)

These slices unblock polish on the active experience but should not leapfrog Spaces/HiveLab readiness. Keep them warm with contract tests and docs while backend work settles.

Tracks covered:

- `Feed`, `Profiles`, and `Notifications & Presence` — depend on Spaces data shapes and moderation signals.
- `App Shell` and `Platform Services & Infrastructure` — keep layout + pipelines healthy to ship fast once UI work resumes.

## Feed

### Backend

- [x] Feed service returns recent posts for joined spaces with cursor.
- [x] API returns `nextCursor` (last item's createdAt) for pagination (`apps/web/src/app/api/feed/route.ts:1`).
- [ ] Cursor edge cases covered (empty spaces, duplicates) — low risk with createdAt filter; add duplicate-id guard if needed.
- [ ] Engagement API contracts (reactions/comments) drafted even if stubbed (defer to v1.1 unless required by UI).

### Application Services & APIs

- [x] `GET /api/feed` with `limit` + `cursor` (+ `nextCursor` response).
- [ ] Reaction and comment endpoints (or explicit deferral with spec reference).
- [x] Telemetry (console) for feed response time and count.

### UI (Deferred)

- [ ] Infinite scroll with skeleton states.
- [ ] Comment preview + engagement toolbar.
- [ ] Accessibility review for list roles and live updates.

### Infrastructure & Ops

- [ ] Indexes for feed queries (createdAt + membership filters).
- [ ] Monitoring for latency/error spikes.

### Open Decisions

- [ ] Minimum engagement set (reactions/comments) for v1.
- [ ] Polling vs realtime updates strategy.

### Evidence

- Feed route: apps/web/src/app/api/feed/route.ts:1
- Feed service: apps/web/src/server/feed/service.ts:1

### Definition of Done

- Stable pagination, consistent item shapes, engagement plan resolved.

---

## Profiles

### Backend

- [x] Profile GET/PATCH with schema validation and safe defaults.
- [x] Connections GET/POST/DELETE with transactional writes.
- [x] Privacy GET/PATCH with schema validation.
- [ ] Presence snapshot contract defined and exposed (packages/core/src/application/presence/\*\*).
- [ ] Presence writer (heartbeat/ghost-mode) persists to `presence/{profileId}` with `{ status, lastSeen, isGhostMode, campusId }` and derives status from `lastSeen` when `status` omitted (apps/web/src/server/profile/presence.service.ts:1 — create).
- [ ] Profile Calendar aggregator (events RSVP’d + ritual windows) with pagination and SSR-safe shape (apps/web/src/server/profile/calendar.service.ts:1 — create).
      Note: vBETA explicitly excludes Rituals from Profile calendar. Only Space Events are aggregated; add Rituals later behind a flag.
- [ ] Recommendation queries hardened with guardrails and limits; document ranking inputs.
- [ ] Rule tests for profile/privacy/connections paths.
- [ ] Backfill script for legacy profiles missing required fields (if any).

Connections vs Friends (finalize data model and implement)

- [ ] Connections = automatic graph from shared Spaces (familiar spaces). Do not accept manual writes; maintained by refresh service and scheduled job.
- [ ] Friends = explicit relationship (can originate from a connection or manual invite); symmetrical friend docs with request → accept flow.
- [ ] Implement auto-connection refresh: compute shared spaces → upsert profiles/{id}/connections; write mutual counts; exclude blocked.
- [ ] Implement friends collections: profiles/{id}/friendRequests (incoming/outgoing) and profiles/{id}/friends (accepted), plus service methods.

### Application Services & APIs

- [ ] Presence publisher and read models aligned with Notifications slice (decide SSE vs polling).
- [ ] GET `/api/profile/presence?profileId=` returns snapshot; POST `/api/profile/presence` updates status/ghost mode (apps/web/src/app/api/profile/presence/route.ts:1 — create).
- [ ] GET `/api/profile/calendar?profileId=&range=` returns personal calendar (RSVP’d Events + Rituals) with pagination (apps/web/src/app/api/profile/calendar/route.ts:1 — create).
- [ ] Recommendation service returns scoped spaces/people suggestions with pagination.
- [ ] Telemetry for profile updates and connection events funneled to analytics.
- [ ] Admin endpoints/read models for profile QA (read-only).
- [ ] Friends API: GET `/api/profile/friends?profileId=` → { accepted, incoming, outgoing }.
- [ ] POST `/api/profile/friends` with `action=request|accept` and `targetProfileId` to drive requests/acceptances.
- [ ] DELETE `/api/profile/friends` to unfriend or cancel outgoing request.

### UI (Deferred)

- [ ] Profile overview UI (identity, privacy banner, connection summary).
- [ ] Connections UX (send/accept/decline/remove) with empty/error states and skeletons.
- [ ] Presence indicators with accessible labels and status intervals.
- [ ] Recommendations module (spaces/people) scaffolding.
- [ ] Admin profile QA view (read-only) leveraging same serializers.

### Infrastructure & Ops

- [ ] Firestore rules for profile, settings/privacy, and connections collections.
- [ ] Firestore rules for presence documents: owner-write; reads allowed for owner OR campus-scoped when privacy permits (firestore.rules: presence section — add).
- [ ] Indexes for presence (`presence.campusId`, `presence.lastSeen`) and calendar queries (events/rituals lookups by `profileId`, `campusId`, time window).
- [ ] Indexes for connections and recommendation queries.
- [ ] Rules for friends/friendRequests collections: owner-only writes; accept allowed by target; reads owner-only by default.
- [ ] Monitoring for profile writes and connection transactions.
- [ ] Data retention policy for connection telemetry documented (docs/platform/data-retention.md — create if missing).

### Open Decisions

- [ ] Presence SLA target and transport (snapshot vs realtime in v1).
- [ ] Confirm mutual friendship model (friends are mutual) vs follows (defer follows to v2); connections remain automatic.
- [ ] Required profile fields for v1 launch and validation copy.
- [ ] Whether recommendation scores visible to users or internal only.

Resolved defaults for vBETA (document; adjust pre–code freeze)

- Presence SLA: online ≤ 60s since last heartbeat; away ≤ 5m; else offline (docs/design/briefs/profile.md — create).
- Transport: 60s polling for vBETA; SSE behind a feature flag later.
- Visibility: Presence readable by campus by default; ghost mode hides details; honor per‑profile privacy settings.
- Recommendations: internal scores only; return human‑readable `reason` strings.

### Evidence

- Profile API: apps/web/src/app/api/profile/route.ts:1
- Connections API: apps/web/src/app/api/profile/connections/route.ts:1
- Profile service: apps/web/src/server/profile/profile.service.ts:1
- Presence API: apps/web/src/app/api/profile/presence/route.ts:1 (create)
- Presence service: apps/web/src/server/profile/presence.service.ts:1 (create)
- Calendar API: apps/web/src/app/api/profile/calendar/route.ts:1 (create)
- Calendar service: apps/web/src/server/profile/calendar.service.ts:1 (create)

### Testing & QA

- [ ] Vitest coverage for presence/resolver outputs and connection workflows.
- [ ] Contract tests verifying recommendation payload matches UI expectations.
- [ ] Load test for presence publisher to confirm SLA.
- [ ] Firestore rule tests for presence read/write gates and campus scoping.
- [ ] Contract tests for calendar aggregator shapes and pagination.

### Documentation & Comms

- [ ] Update docs/business/PLATFORM_VERTICAL_SLICES.md → Profiles section with decisions/outstanding work.
- [ ] Add Presence appendix to docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md if transport chosen impacts Spaces.

### Definition of Done

- vBETA: Presence and Calendar live with rules/indexes/telemetry; recommendations safe; monitoring operational; documentation updated.

---

## Notifications & Presence

### Backend

- [ ] Presence publisher with ~60s freshness and ghost mode respect.
- [ ] Notification writer/reader for basic types with delivery semantics.
- [ ] Policy enforcement for visibility (campus + space membership).

### Application Services & APIs

- [ ] Presence snapshot API and SSE/WS (decision pending).
- [ ] Notifications inbox endpoints (list/mark read).
- [ ] Integration with Rituals and Feed for reminders.

### UI (Deferred)

- [ ] Presence badges across profile cards and roster.
- [ ] Notifications inbox/toasts with accessibility coverage.

### Infrastructure & Ops

- [ ] Transport choice (SSE/WS) infrastructure and quotas.
- [ ] Firestore rules for notifications docs; indexes for unread queries.
- [ ] Monitoring for delivery latency and error rates.

### Open Decisions

- [ ] Final transport (SSE vs WS) and SLA.
- [ ] Notification types and prioritization/batching rules.

### Evidence

- Presence privacy handling: apps/web/src/server/profile/profile.service.ts:1

### Definition of Done

- Presence and notifications measurable, timely, and rule-compliant.

---

## App Shell (Design System Guild)

### Backend

- [ ] N/A — shell consumes existing navigation config only; keep section for ordering parity.

### Application Services & APIs

- [ ] N/A — no new services; ensure nav-config exports stay stable through rebuild.

### UI

- [ ] Storybook: `Layouts/HiveSidebar/AriaCurrentAndRoles` — demo aria-current states, leader gating, and analytics hooks per Decision 0001 (`docs/design/decisions/0001-app-shell-sidebar07.md:1`).
- [ ] Storybook: `Layouts/HiveSidebar/MobileSheet` — focus traps, screen-reader announcements, and safe-area tokens validated against Sidebar07 spec.
- [ ] Reduced-motion variant: document animation fallbacks in Storybook controls and ensure compliance with `prefers-reduced-motion`.
- [ ] Navigation fixtures: expand `getHiveNav` stories to cover student, leader, staff roles and document expected iconography.
- [ ] Token audit: verify surface/glass/elevation tokens across shell states; document gaps and queue fixes in `packages/ui`.
- [ ] Integration checklist: author `docs/design/app-shell/APP_SHELL_INTEGRATION.md` summarizing embed steps for web/admin/Spaces before UI implementation.

### Infrastructure & Ops

- [ ] Storybook accessibility pass (keyboard, color contrast) recorded for app shell stories; capture results in UI coverage matrix.

### Documentation & Comms

- [ ] Update `docs/design/UI_COVERAGE_MATRIX.md` App Shell row with Storybook IDs and status once demos ship.

<!-- Moved Spaces infrastructure items up into the Spaces slice for correct scoping. -->

### Open Decisions

- [x] Final v1 post kinds shipping (standard/event/poll/etc) and mapping to toolContext (spec §2 + serializer contract `apps/web/src/server/spaces/__tests__/space-serializer.contract.test.ts:1`).
- [x] Requirements for moderation states and visibility transitions (auto-hide thresholds, leader overrides) confirmed through moderation endpoints and tests (`apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1`).
- [x] Policy for expired pins (auto-clear timing, notifications) enforced via sweep job and telemetry/audit hooks (`apps/web/src/server/spaces/jobs/pin-expiry.job.ts:1`, `apps/web/src/server/spaces/jobs/pin-expiry.job.test.ts:1`).
- [x] Composer default visibility (remember per space vs global default) validated by posting policy scenarios (`apps/web/src/app/api/spaces/membership.scenario.test.ts:1`).

### Evidence

- Space service + serializer: apps/web/src/server/spaces/service.ts:1
- Posts API: apps/web/src/app/api/spaces/[spaceId]/posts/route.ts:1
- Space layout: packages/ui/src/organisms/spaces/space-layout.tsx:1
- Decision: docs/design/decisions/0003-spaces-composer-placement.md:1

### Testing & QA

- [x] Vitest coverage for aggregates (moderation, pinning, visibility) and the Firestore parity contract (`packages/core/src/domain/spaces/aggregates/space-post.behaviour.test.ts:1`, `apps/web/src/server/spaces/firestore-space-post.repository.test.ts:1`).
- [x] Contract tests ensuring serializer payload matches spec sample (`apps/web/src/server/spaces/__tests__/space-serializer.contract.test.ts:1`).
- [x] Scenario tests for join/leave, role change, and composer posting policies (`apps/web/src/app/api/spaces/membership.scenario.test.ts:1`).
- [x] Calendar integration test verifying List/Month toggles load expected data (`apps/web/src/server/spaces/__tests__/calendar.service.spec.ts:1`).
- [x] API + telemetry tests verify moderation transitions (auto-hide → escalate → remove) emit `SpacePostModerationChanged` events (`apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.test.ts:1`).
- [x] Integration tests for media approval queue (`/spaces/[spaceId]/media-approvals` approve/reject + non-leader upload) covering spec §2 “Moderation” acceptance checks (apps/web/src/app/api/spaces/[spaceId]/media-approvals/route.test.ts:1; docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md).

### Documentation & Comms

- [x] Update docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md with any deviations and link back to code (`docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1`).
- [x] Expand docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md with new Storybook states (`docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md:1`).
- [x] Reconcile docs/design/spaces/SPACES_IMPLEMENTATION_SUMMARY.md status vs TODO checklist once backend parity lands (`docs/design/spaces/SPACES_IMPLEMENTATION_SUMMARY.md:1`).

### Definition of Done

- Firestore parity confirmed, moderation/pin policies enforced, rules tested, Storybook scaffolds match frozen contracts, documentation updated.

---

## Platform Services & Infrastructure (Cross-Cutting)

### Backend & Tooling

- [ ] Firestore rules hardened across slices; automated rule tests.
- [ ] Indexes deployed for hot queries (feed, spaces, tools, rituals).
- [ ] Secret validation scripts (`.env.production.required`) kept current.
- [ ] Sentry + dashboards for API latency and error budgets.
- [ ] Turbo/CI pipelines enforce lint/typecheck/test/storybook (post-backend).

### Deployment & Ops

- [ ] Production deploy checklist documented.
- [ ] Monitoring targets defined (routes + thresholds).
- [ ] Incident response playbooks for auth, spaces, tools.

### Open Decisions

- [ ] Which routes are P0 monitored with alerts.

### Evidence

- Firestore rules: firestore.rules:1
- Indexes: firestore.indexes.json:1
- Env templates: .env.production.template:1, .env.production.required:1

### Definition of Done

- CI green, rules tested, indexes deployed, monitoring live with documented playbooks.

---

## Parked / Needs Direction

These areas stay paused until product hands over updated specs or dependencies clear. Note missing context explicitly in standups before resuming work.

Tracks covered:

- `Rituals (Feed-Based)` — blocked on clear campus-level contract + moderation policies.
- `Admin (Ops)` — needs updated ops charter and telemetry requirements.
- `Search & Discovery` — requires indexing + ranking briefs tied to the new Spaces data model.

## Rituals (Feed-Based)

### Backend

- [x] Ritual application service with in-memory repository and serialization.
- [x] Schedule evaluation: added `isActive` (30m window) and `nextAt` server-side in serializer (`apps/web/src/server/rituals/service.ts:1`).
- [ ] Feed integration emits SpacePost for active/closed check-ins (defer until Feed engagement contracts land).
- [x] Participation endpoint: POST `/api/rituals/:ritualId/join` with idempotency (apps/web/src/app/api/rituals/[ritualId]/join/route.ts:1).

### Application Services & APIs

- [x] Public routes: `GET /api/rituals?profileId=`, `GET /api/rituals/:ritualId`, `POST /api/rituals/:ritualId/join`.
- [ ] Leader routes for create/edit scheduling.
- [ ] Notification hooks (handoff to Notifications slice) defined.

### UI (Deferred)

- [ ] Ritual lists (mine/upcoming) with timers.
- [ ] Space widget showing next ritual + schedule preview.
- [ ] Board card states (upcoming/active/closed) with accessible countdowns.

### Infrastructure & Ops

- [ ] Firestore rules for rituals collection (leader vs member actions).
- [ ] Indexes for `campusId/spaceId` + next window time.
- [ ] Monitoring for schedule evaluation job and check-in errors.

### Open Decisions

- [ ] Default window length and grace periods.
- [ ] Quiet hours policy and overrides.
- [ ] Streaks/scoring included in v1 or deferred.

### Evidence

- Ritual service: apps/web/src/server/rituals/service.ts:1
- Core domain: packages/core/src/domain/rituals/\*\*:1
- Rituals APIs: apps/web/src/app/api/rituals/\*\*:1

### Definition of Done

- Server computes windows, participation flows work, posts emitted, rules+monitoring live.

---

## Admin (Ops)

### Backend

- [ ] Role enforcement middleware finalized (redirect unauthorized to `/admin/not-authorized`).
- [x] Minimal data hooks to existing APIs (read-only) — overview metrics, spaces list, per-space moderation/tools/analytics/settings.
- [x] Audit logging for admin page views and API calls persisted to `admin_audit`.

### Application Services & APIs

- [x] `/admin/api/overview` returns metrics snapshot (`apps/admin/src/app/api/overview/route.ts:1`).
- [x] Per-space read routes for moderation/tools/analytics/settings (`apps/admin/src/app/api/spaces/[spaceId]/**:1`).
- [ ] Users read API (search/list + detail) with paging and campus scoping.
- [ ] Metrics aggregation aligned with Platform Services slice (latency/error budgets + SLOs).

### UI (Deferred)

- [x] Page scaffolds exist.
- [ ] Empty/error states and accessibility checks.
- [ ] Performance budget instrumentation.

### Infrastructure & Ops

- [ ] Robots `noindex`; route protection verified.
- [ ] Monitoring for admin usage + error tracking.

### Open Decisions

- [ ] KPIs surfaced on Overview v1.

### Evidence

- Admin middleware: apps/admin/src/middleware.ts:1
- Admin app routes: apps/admin/src/app/\*\*:1
- Admin Overview API: apps/admin/src/app/api/overview/route.ts:1

### Definition of Done

- Role-gated app with useful read-only pages and monitored load.

---

### LaunchPad (Feature Flags, Elements, Rituals)

Goal: Use Admin as the governed launch console for new Elements (HiveLab), Rituals, and campus features. Admin should not ship code; it safely flips availability of already-deployed code and data-driven blueprints, with approvals and audits.

#### Backend

- [ ] Feature flags service with typed targets (campus, cohort, role) and precedence; Firestore: `feature_flags/{flag}` with publishedAt, approverId.
- [ ] Tool runtime registry: allowlist `toolRuntime.allowedVersions` + `defaultVersionByCampus`; blocks usage of undeployed versions.
- [ ] Element blueprints registry (data-only templates) validated via `packages/core/src/hivelab/contracts.ts`; Firestore: `elements/blueprints/{id}` with status= draft|approved|published.
- [ ] Ritual templates + schedule compiler; Firestore: `ritual_templates/{id}`; preview next windows API.
- [ ] Two‑person approval workflow for critical flips (publish, rollback) with audit trail.

#### Application Services & APIs

- [ ] `GET/POST /admin/api/flags` (list, create/update, publish, history).
- [ ] `GET/POST /admin/api/hivelab/blueprints` (list, validate, publish) reusing zod validators from core.
- [ ] `GET/POST /admin/api/hivelab/runtime-versions` (list, allow, set default by campus).
- [ ] `GET/POST /admin/api/rituals/templates` (create/edit); `GET /admin/api/rituals/templates/:id/preview` (next 7 days windows).
- [ ] `POST /admin/api/approvals` (request/approve/decline) with scopes + reasons; emits admin_audit entries.

#### UI (Deferred)

- [ ] Launch checklist wizard: Preflight (tests/linters/storybook links) → Targeting → Approvals → Publish.
- [ ] Flags table with targeting editor and rollout slider (0→100%) by campus.
- [ ] Elements: Blueprint editor (data fields only), status chips, validation panel (lint/contract results).
- [ ] Rituals: Template creator with schedule preview and accessibility copy checks.
- [ ] Activity log panel showing who flipped what and when.

#### Student Outcome Checks

- Ops publishes a new Element blueprint (Check‑In Pro V2) to UB only after two approvals; campus sees it in tool catalog; non‑UB campuses remain unchanged.
- Governance flips a feature flag to enable “Rituals v1” for Residential spaces at UB; preview shows next 7 days windows before publish.
- Ops allows tool runtime version 12 and sets UB default to 12, while keeping 11 as fallback; a rollback flips default back to 11 in 1 click.

#### Evidence

- Element contracts: packages/core/src/hivelab/contracts.ts:1
- Runtime + lints: packages/core/src/hivelab/runtime.ts:1, packages/core/src/hivelab/lint.ts:1
- Rituals service: apps/web/src/server/rituals/service.ts:1

#### Definition of Done

- Admin can flip availability (flags, blueprints, ritual templates, runtime versions) with approvals + audit. All changes validated against core contracts; campus‑scoped rollout supported.

---

## Search & Discovery

### Backend

- [ ] Search API returning scoped results for spaces/people/posts with ranking baseline.
- [ ] Serializer mappers reuse slice contracts without leaking private data.
- [ ] Rate limiting and input sanitation enforced.

### Application Services & APIs

- [ ] `/api/search` route with campus scoping, query text, limit, types.
- [ ] Suggested spaces/people endpoints for Profiles/Onboarding surfaces.

### UI (Deferred)

- [ ] Typeahead with keyboard navigation and grouped results.
- [ ] Empty/error states with accessible messaging.

### Infrastructure & Ops

- [ ] Indexing strategy (Firestore composite + lightweight index docs) documented.
- [ ] Monitoring on latency/error spikes; quotas for search traffic.

### Open Decisions

- [ ] Fields indexed per type and minimum ranking signals.
- [ ] Caching strategy for hot queries.

### Evidence

- Catalog seeds: apps/web/src/server/catalog/\*\*:1

### Definition of Done

- Search returns scoped, consistent shapes with predictable performance.

---

## Cross-Dependencies & Sequencing

- Onboarding → Spaces: Auto-join writes memberships; requires Spaces write rules and idempotent join logic.
- Spaces → Feed: Feed item shape depends on post moderation/visibility policies.
- Rituals → Feed/Notifications: Ritual windows drive check-in posts and reminders; presence affects expectations.
- Tools → Spaces: Tool posts appear on Space board; enforce per-space placement caps.
- Profiles → Spaces/Feed: Presence and privacy drive roster + author meta; ensure privacy masks in serializers.
- Profiles Calendar → Spaces/Rituals: Calendar aggregator composes RSVP’d Space events and Ritual windows; requires event index + ritual schedule service.
- Profiles Presence → Notifications: Presence freshness/ghost mode control inbox delivery expectations and roster UI; transport decision impacts infra.
- Search → All slices: Reuses serializers; indexing depends on visibility + campus scoping.
- Admin → All: Read-only v1 uses existing APIs; role middleware must be enforced before enabling routes.
- App Shell → Spaces UI: Spaces shell v2 waits on Sidebar07 integration sign-off per Decision 0001 (`docs/design/decisions/0001-app-shell-sidebar07.md:1`).

## Design System & Storybook

- [ ] Resolve Dock naming: rename legacy "rail" files/exports (e.g., `packages/ui/src/components/app-sidebar-rail.tsx`, `packages/ui/src/organisms/spaces/context-rail.tsx`) and update Storybook narratives to match the Dock terminology in `UI_GUIDELINES.md`.
- [ ] Reconcile layout docs vs code: replace `MIGRATION_COMPLETE.md` guidance about `space-layout-v2.tsx` with the current `space-layout.tsx` (V5) implementation and document the canonical API.
- [ ] Apply the Spaces brand audit (foreground vs gold, card borders, hover glow) across `space-header`, `context-rail`, widgets, and related stories; check off the actions in `packages/ui/src/organisms/spaces/BRAND_AUDIT_CURRENT_STATE.md` once finished.
- [ ] Remove `surface-glass` from production components (e.g., `packages/ui/src/organisms/auth/await-checklist-card.tsx`) and ensure any glass effects live behind Storybook style dials only.
- [ ] Replace raw hex colors in HiveLab and widget components with token utilities/vars so `pnpm lint:tokens` passes (see `packages/ui/src/organisms/hivelab/widgets/tool-shelf-widget.tsx` and `tool-usage-widget.tsx`).
- [ ] Wire motion utilities that map to token durations/easings and eliminate bare `duration-*` Tailwind classes so `pnpm lint:motion` passes across `packages/ui/src`.
- [ ] Update `packages/tokens/README.md` to describe the real exports (`tokens.ts`, `styles.css`, `tailwind.preset.ts`) and name it as the source of truth for brand tokens.
- [ ] Add a Storybook “Welcome / Overview” MDX entry that orients contributors (link conventions, tokens, Style Dials) to complement `Plan/Storybook Guide`.
- [ ] Expand Storybook fixtures beyond `space-robotics` to cover additional space archetypes for demos/tests.

---

## Feed & Rituals — System TODO (PRD‑aligned)

References

- PRD: HIVE — Feed & Rituals (Hardened PRD v1) [conversation]
- UI guidelines: `UI_GUIDELINES.md:1`
- Guardrails: Board forbids platform digest (Ritual bundling is Feed‑system‑only), Calendar T‑24 lock

Notes

- Backend‑first: implement read models, composition/order, and APIs with tests before wiring UI. Rituals are campus‑wide only; one active at a time.

### Data & Read Models

- [x] Feed service scaffold + route (`apps/web/src/app/api/feed/route.ts`, `apps/web/src/server/feed/service.ts`, `apps/web/src/app/feed/page.tsx`)
- [ ] Read model: `PostSnapshot` eligibility flags (share_to_campus, moderation, quality fields) surfaced in serializer
- [ ] Read model: `EventSnapshot` (denormalized read model for Feed) with RSVP/Check‑in counts and start/end times
- [ ] Indexes validated for time‑based pagination and event windows

### Feed Composition & Ordering

- [ ] Implement ordering in service/core: Ritual strip first → created_at DESC with quality weighting → per‑Space diversity cap ≤3/page → Event urgency boost in [T‑60, T+30]
- [ ] Eligibility filters: public or leader‑shared + quality threshold + no moderation flags
- [ ] Pagination: time‑based `before` + `limit`, preserving per‑Space cap
- [ ] Cursor tests (edge: same timestamp items)

### Feed APIs

- [x] `GET /feed?before&limit` (returns items + `nextCursor`) with basic telemetry
- [ ] `POST /feed/:id/hide` (per‑member)
- [ ] `POST /feed/:id/report` (per‑member; triggers moderation pipeline)
- [ ] `POST /feed/:spaceId/mute` (per‑member space mute)
- [ ] Negative case tests + rate limits for abuse

### Feed UI (Storybook‑first)

- [ ] `FeedList` virtualized list + skeletons; infinite scroll; auto‑refresh on interval/reopen
- [ ] `FeedCard.Post` — inline react/comment controls; deep‑link to Space post
- [ ] `FeedCard.Event` — RSVP chip, Reminder, leader Check‑in (scan entry), “Now” chip during active window
- [ ] `FeedCard.System` — for system announcements/recaps
- [ ] A11y: keyboardable cards, aria‑live for errors; reduced‑motion variants for animations

### Rituals (Store, Flags, Strip)

- [x] Rituals service scaffold + list/join routes (`apps/web/src/server/rituals/service.ts`, `apps/web/src/app/api/rituals/**`)
- [ ] RitualStore (admin‑authored JSON/YAML) with schema: id, title, status, schedule{start_at,end_at,phases[]}, strip_theme, banner_media_ref, cta, feature_flags[], progress_metrics
- [ ] Flag service: `flags/apply` and `flags/revert` (time‑boxed; auto‑revert at `end_at` regardless of recap success)
- [ ] API: `GET /rituals/current` (single active or upcoming)
- [ ] API: `POST /rituals/:id/{activate|end}` (admin‑only)
- [ ] Inject recap post on end (system post; obey Feed bundling rules)

### Ritual Strip UI (Feed‑top)

- [ ] `RitualStrip` container renders above Feed list; visible in Upcoming (countdown) and Active (CTA)
- [ ] Subcomponents: `RitualBanner`, `RitualCTA`, `RitualCountdown`, `RitualProgress`, `RitualThemeProvider`
- [ ] CTA actions: open composer preset, open event list filter, open form/poll, open thin L1 sheet
- [ ] Single active ritual enforced; snooze/hide TBD (open decision)

### Event Interactivity (Inline)

- [ ] `POST /events/:id/{rsvp|checkin}` endpoints (reuse Events service); dedupe notifications
- [ ] “Now” chip when now ∈ [T‑60, T+30]; urgency boost mirrors ordering rules
- [ ] Respect Calendar T‑24 reschedule lock surfaces; no Calendar writes from Feed

### Quality, Quotas & Bundling

- [ ] Quality score: engagement↑, report ratio↓, leader reputation; tune weights (open decision)
- [ ] Hide/mute/report persist per member and shape composition
- [ ] Ritual auto‑posts bundling: coalesce >2/day into 1 daily digest (Feed‑system‑only; Board still forbids digest)

### Analytics & Telemetry

- [ ] Feed: DAU sessions, scroll depth, CTR→Space, hide/mute rate, time‑to‑first‑reaction
- [ ] Rituals: strip impressions, CTA CTR, target action completion, participation%, retention uplift
- [ ] Console/Firestore sinks; dashboards (minimal panels) for review

### Performance & A11y Budgets

- [ ] P95 initial load: ≤1.8s cold / ≤1.2s warm; card interactions ≤150ms; strip mount ≤120ms
- [ ] WCAG AA: keyboardable lists/sheets, focus rings, aria‑live; reduced‑motion for strip animations

### Flags & Security

- [ ] Gate Rituals and Feed quality/bundling features behind flags (stable defaults)
- [ ] Admin routes require admin session; input validation on configs; no secrets committed

### Documentation

- [ ] Ritual config schema doc (JSON/YAML) under `docs/design/rituals/`
- [ ] Feed composition reference with ordering examples and edge‑cases
- [ ] “How to Verify” checklist for each vertical slice

Acceptance (Vertical Slices)

- [ ] A) Feed aggregation & ordering: aggregates eligible posts/events; per‑Space cap enforced; time‑based pagination
- [ ] B) Event interactivity: inline RSVP/Check‑in; “Now” chip; leader quick actions mirror Event rules
- [ ] C) Ritual strip behavior: strip renders (upcoming/active), CTA executes; end injects recap; flags auto‑revert
- [ ] D) Quality & safety: hide/mute/report; report ratio hides cards; Ritual >2/day coalesced to single digest; Board remains digest‑free

Sequencing (No dates)

1. Read models (EventSnapshot) + eligibility fields; composition ordering + per‑Space cap; hide/mute/report
2. RitualStore + Flag service; `GET /rituals/current`; strip rendering; recap on end
3. Event inline RSVP/Check‑in + “Now” chip + notification hooks
4. Quality score tuning; admin authoring for ritual configs; analytics dashboards
