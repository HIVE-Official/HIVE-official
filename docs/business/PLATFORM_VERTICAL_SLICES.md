Status: Draft
Owner: Platform Leads (by Guild)
Last updated: 2025-10-16

# Platform Vertical Slices — Map, Gaps, and Integration

Purpose
- Provide a single, actionable snapshot of the platform by vertical slice (domain), with current state, what’s left, and how each slice integrates with others.
- Grounded in code and existing checklists. Use this to sequence work and drive PRDs.

Execution Focus (P0)
- Focus Now: Spaces (Community) and HiveLab Tools (Activation) — backend‑first. Lock serializers/contracts, policies, Firestore rules/indexes, and API routes with tests. UI work limited to Storybook/spec scaffolds until contracts stabilize.
- Deferred until baseline complete: Feed, Profiles, Rituals. These slices remain documented here but are intentionally paused to concentrate delivery on Spaces + HiveLab.

Legend
- ✅ done • ⚠️ partial • ❌ missing • 🔒 gated by dependency

Sources
- UI Coverage: docs/design/UI_COVERAGE_MATRIX.md, docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md
- Backend: apps/web/src/server/**, packages/core/**, firestore.rules, firestore.indexes.json
- Admin: apps/admin/**

---

## 1) Identity & Onboarding (IAM Guild)

Current
- Auth magic links, session service, onboarding progress, handle checks: ✅
  - Code: apps/web/src/app/api/auth/*, apps/web/src/server/auth/**, packages/core/src/application/auth/**
- Space auto-join mapping + UB campus config (defaults, residential, cohorts) seeded; onboarding completion writes memberships with idempotent logging: ✅
  - Code: packages/core/src/data/auto-join/**, packages/core/src/domain/profile/onboarding/auto-join.helper.ts, apps/web/src/server/auth/services/space-auto-join.service.ts
- Server-side throttling for signup/resend/verify with Firestore counters + telemetry fallbacks: ✅
  - Code: apps/web/src/server/auth/throttle/throttle-policy.ts, apps/web/src/app/api/auth/{signup,resend,verify}/route.ts
- Onboarding progress API exposes percent complete + auto-join preview for UI wizard: ✅
  - Code: apps/web/src/app/api/onboarding/progress/route.ts

Remaining
- Production email provider configuration + error telemetry: ⚠️
- Onboarding progress persistence tests (edge cases, re-entry): ⚠️
- Firestore rules + tests for profiles/sessions/onboarding progress collections: ❌

Integrates With
- Profiles (creates base profile), Spaces (auto-join), Catalog (majors/interests), Session middleware for Admin.

Acceptance
- All auth endpoints gated/limited; onboarding idempotent; sessions rotate and revoke on logout; tests cover failure paths.

---

## 2) Profiles (IAM Guild)

Status Note
- Deferred while Spaces + HiveLab baseline is completed. Keep contracts stable; avoid introducing new shapes without server coverage/tests.

Current
- Profile read/update, privacy, connections, presence snapshot: ✅
  - Code: apps/web/src/app/api/profile/**, apps/web/src/server/profile/**

Remaining
- Presence realtime channel + UI indicators: ❌ (UI & infra)
- Profile analytics (views, growth) aggregation: ❌
- Connection requests/acceptance flows in UI: ⚠️

Integrates With
- Spaces (member roster, roles), Feed (author meta), Notifications (connection events), Admin (user list).

Acceptance
- Privacy defaults enforced, presence updates within SLA, full connection lifecycle, profile snapshot used consistently in UI.

---

## 3) Spaces (Community Guild)

Current
- Space service (in-memory + Firestore), posts serializer, catalog, pages: ✅
  - Code: apps/web/src/server/spaces/**, apps/web/src/app/spaces/**
- UI organisms exist for header, layout, widgets, and cards: ⚠️

Remaining (UI-first per checklist)
- BoardCard Base + full variants states (Standard, Event, Poll, Announcement, Form, Tracker, CheckIn, Digest): ❌/⚠️
- Composition (PinnedCluster, ComposerActions, ActivityFilters) states + a11y: ⚠️/❌
- Context widgets (Events, Community, Resources, Tools) empty/skeleton + stories: ⚠️
- Layout shell 60/40, sticky header, safe-area + skeletons: 🔄
- Storybook coverage for all surfaces: ❌

Integrates With
- Feed (post aggregation), Tools/HiveLab (composer verbs + digest posts), Notifications (moderation, reactions), Admin (spaces list), Profiles (membership).

Acceptance
- Serializer → component contract locked; all components ship with states/a11y/skeleton/empty and Storybook stories; feed surfaces reuse BoardCard.

---

## 4) Feed (Engagement Guild)

Status Note
- Deferred while Spaces + HiveLab baseline is completed. Revisit after Spaces policies/moderation and HiveLab placements are locked.

Current
- Feed aggregation from Space posts with serialization: ✅
  - Code: apps/web/src/server/feed/**, /api/feed

Remaining
- Infinite scroll + cursoring across spaces: ⚠️ (API supports `cursor`, evaluate UI)
- Reactions, comments, moderation actions endpoints + UI: ❌ (align with spaces domain)
- Realtime updates or polling strategy + tests: ❌

Integrates With
- Spaces (post source), Profiles (author card), Notifications (engagement), Search (filtering), HiveLab (tool-context cards).

Acceptance
- Stable pagination, consistent item view model, engagement actions wired, reasonable realtime strategy (SSE/WS or poll).

---

## 5) HiveLab Tools (HiveLab Guild)

Current
- Tool application service, repositories (memory/Firestore), dashboard, CRUD-like API: ✅
  - Code: apps/web/src/app/api/tools/**, apps/web/src/server/tools/**, packages/core/src/application/tools/**

Remaining (Backend per checklist)
- Campus/visibility listing endpoint (`/api/tools/campus`): ❌
- Ownership/permission policy ports + route middleware: ❌
- Telemetry (usage counters, events, leader dashboards): ❌
- Firestore indexes doc + migration/backfill plan: ⚠️

Remaining (UI per checklist)
- Library (ToolCard/Grid/Templates), Builder (ToolEditor/Publish/Visibility/Collaborators), Analytics, Space Integration UIs: ❌

Integrates With
- Spaces (composer placements, auto-digest), Feed (tool-context posts), Admin (tool oversight later), Analytics (usage).

Acceptance
- Policy-guarded transitions (draft→published/visibility/deploy), placement config persisted per space, dashboard lists filter by campus/visibility, minimal analytics emitted.

---

## 6) Rituals (Rituals Guild)

Status Note
- Deferred while Spaces + HiveLab baseline is completed. Re‑sequence after Spaces board/policy and basic notifications are in place.

Current
- Domain + service scaffolding, page + list component: ⚠️
  - Code: apps/web/src/server/rituals/**, /app/rituals

Remaining
- Participation logic, milestones, time windows; UI for check-ins: ❌
- Integration with Spaces (post types) and Feed (activity): ❌

Integrates With
- Spaces (events/check-ins), Feed (ritual posts), Notifications (reminders).

Acceptance
- Defined post types for rituals, RSVP/check-in windows enforced, minimal UI flows validated in Storybook and app.

---

## 7) Search & Discovery (Platform IA)

Current
- Catalog endpoint for onboarding data; basic spaces catalog serialization: ⚠️
  - Code: apps/web/src/server/catalog/**, spaces service helpers

Remaining
- Platform search (people/spaces/posts) index + API: ❌
- Typeahead UI + keyboard a11y: ❌
- Ranking signals (membership, recency, campus): ❌

Integrates With
- Profiles, Spaces, Feed; Admin (moderation search).

Acceptance
- Debounced typeahead with keyboard support; search API returns scoped results with stable ranking; no PII leakage.

---

## 8) Notifications & Presence (Platform Services Guild)

Current
- Presence read snapshot via profile service; no realtime channel: ⚠️

Remaining
- Realtime presence (WS/SSE) infra + UI badges: ❌
- Notification pipeline (events → delivery) + user prefs: ❌
- Mobile-ready patterns (quiet hours, batching): ❌

Integrates With
- Profiles, Spaces, Feed, HiveLab (usage), Admin (audit).

Acceptance
- Presence updates within 30–60s, basic in-app toasts/summaries, opt-in/out respected.

---

## 9) Admin (Ops Guild)

Current
- Next.js app scaffolded with pages for Overview/Users/Spaces/Moderation/Analytics/Settings: ✅
  - Code: apps/admin/src/app/**

Remaining
- Middleware enforcing admin role and login: ❌ (apps/admin/src/middleware.ts TODO)
- Minimal data hooks (stub acceptable), empty/error states, a11y: ⚠️

Integrates With
- All domains via read APIs; IAM for role checks.

Acceptance
- Admin-only enforcement verified; pages render with basic KPIs/lists; no PII leakage.

---

## 10) Design System & App Shell (Design System Guild)

Current
- Atoms and core molecules complete; Sidebar07 shell; many stories: ✅/⚠️
  - Code: packages/ui/**, Storybook configured

Remaining
- Spaces organism coverage and stories (per checklist): ❌
- App shell aria-current demo + leader-gating demos: ❌ (UI_COVERAGE_MATRIX)
- Token validation matrices (density/elevation/glass/contrast) across key stories: ⚠️

Integrates With
- All apps; Stories act as spec for app surfaces.

Acceptance
- Stories for all required surfaces/states; a11y addon passes; tokens enforced (no hex).

---

## 11) Infrastructure: Firebase, Rules, Indexes (Platform Services Guild)

Current
- Admin SDK helpers; Firestore rules/indexes files present; Functions dir: ✅

Remaining
- Hardened rules for tools/spaces/posts; tests for rules: ❌
- Indexes reviewed for tools dashboard & feed queries: ⚠️
- Env toggles honored (USE_FIRESTORE_SPACES/TOOLS) + docs: ⚠️

Integrates With
- All data slices using Firestore/DataConnect.

Acceptance
- Rules block unauthorized transitions; indexes deployed; toggles documented and exercised in tests.

---

## 12) Quality Gates: Testing, Lint, CI/CD (Platform Eng)

Current
- Unit tests exist for core domains; Playwright + Storybook configs present: ⚠️

Remaining
- Vitest coverage for new organisms/services; Playwright e2e for Spaces/Feed core flows: ❌
- ESLint/typecheck as mandatory pre-PR; CI wiring; Sentry: ❌

Integrates With
- All slices.

Acceptance
- `pnpm lint typecheck test` pass; CI green; core e2e flows stable; Sentry reporting.

---

## 13) Deployment & Observability (Platform Eng)

Current
- Vercel config present; env templates included: ⚠️

Remaining
- Production Firebase project, domains, SSL, secrets management; release runbooks: ❌
- Error monitoring (Sentry) + basic dashboards: ❌

Acceptance
- Production build deploys with secrets; alerts on errors; rollback plan.

---

## Integration Map (How Slices Connect)

- Auth → Profiles: signup creates base profile; sessions gate profile APIs.
- Auth → Spaces: space auto-join on onboarding (SpaceAutoJoinService), policies gate join/post.
- Spaces → Feed: feed aggregates recent Space posts; BoardCard components must consume server serializer shape.
- HiveLab → Spaces: tools add composer verbs and may emit digest posts into Space boards; placements persisted per space.
- Profiles ↔ Spaces: roster, roles, presence in the Dock; privacy rules hide fields.
- Notifications → All: events emitted from Tools/Spaces/Profiles feed into delivery; presence updates drive badges.
- Admin → All: read-only initially; role/permission enforcement via middleware and IAM service.
- Design System → All: Storybook is the spec; app shells mirror DS stories.

---

## Recommended Sequencing (6–8 weeks)

1) Spaces UI Foundation (2w)
- BoardCard base + Standard/Event/Poll variants with full states and stories.
- Dock widgets (Events/Community/Resources/Tools) empty/skeleton + stories.
- Lock serializer contracts with server; wire samples in stories.

2) HiveLab Backend Hardening (1w)
- Campus listing endpoint; policy ports + route middleware; minimal telemetry; docs & indexes.

3) Infra & Quality for P0 (0.5–1w)
- Rules/indexes/tests for Spaces/HiveLab; Sentry for server routes; CI gates for lint/typecheck/tests.

4) Admin Access + Ops (0.5w)
- Enforce admin middleware; stub data; empty/error states; a11y pass.

5) Notifications/Presence (1w)
- Presence channel + UI badges; basic in-app notifications for connections and posts.

6) Deferred (post‑baseline)
- Feed + Engagement: cursoring/infinite scroll; reactions/comments API; minimal realtime.
- Profiles: presence snapshot + recommendations.
- Rituals: participation windows + space/feed integration.

---

## Owners (by Guild)
- IAM: Auth, Profiles, Catalog
- Community: Spaces, Feed (post-level)
- HiveLab: Tools backend + UI
- Rituals: Ritual types + integration
- Platform Services: Firebase, Notifications/Presence, CI/CD, Rules/Indexes
- Design System: DS components, Storybook coverage, App Shell
