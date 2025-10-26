<!-- Bounded Context Owner: Platform Program Management -->
# HIVE Platform Progress Tracker

> Source of truth for rebuild progress across every vertical slice. Aligns with `docs/foundation/architecture/hive-ddd-architecture.md` and `docs/DDD_CONTEXT_MAPPING.md`. Updated 2025-10-10.

## 1. Status At A Glance

| Slice / Capability | Current State | Key Gaps | Owner Checkpoint |
| --- | --- | --- | --- |
| **Identity & Onboarding** | Auth, profile aggregate, onboarding flow implemented (`packages/core`, `apps/web/src/contexts/auth`, `/onboarding`) | Harden magic link resend, consolidate session middleware, verification UI polish | Identity & Access Guild |
| **Community (Spaces & Feed)** | Spaces aggregate + vertical slice rebuilt (catalog, join/leave, UI, API). Feed not yet implemented in new stack. | Space creation flow, detailed space pages, feed composition + personalization, campus enforcement across posts/events | Community Guild |
| **Activation (Rituals & HiveLab)** | HiveLab tool aggregate + dashboard slice rebuilt (drafts, publish, deploy). Rituals untouched in new stack. | Builder canvas UI, Firestore adapters for tools, ritual aggregates/services, tool usage analytics pipeline | HiveLab Guild & Rituals Guild |
| **Governance / Admin** | Legacy admin app removed; no new governance tooling. | Moderation workflows, analytics dashboards, feature flag controls, audit logging | Governance Guild |
| **Platform Services** | Firebase admin wrapper in place; rate limiting/notifications/observability missing. | Session hardening, rate limiting, logging/metrics standardization, notification pipeline | Platform Services Guild |
| **Design System / UI** | `@hive/ui` rebuilt via shadcn foundation; Storybook baseline exists. | Component documentation, accessibility audit, theming tokens, e2e visual regression | Design System Guild |
| **Analytics & Ops** | Analytics package removed; no dashboards. | Define event bus, data warehouse sync, ops runbooks | Analytics & Ops Guild |

## 2. Context Breakdown & TODOs

### 2.1 Identity & Onboarding
- ✅ Profile aggregate, onboarding DTOs, auth services (`packages/core/src/domain/profile/**`, `apps/web/src/server/auth`).
- ✅ Onboarding UI + server routes live (`/onboarding`, `/api/auth/*` subset).
- 🟡 Need consolidated session middleware + SSR protection (`docs/foundation/operations/security/security-checklist.md`).
- 🟡 Implement verification + role claim UI (Leader, Verified+).
- 🔴 Magic link resend & admin grant checks removed with legacy code — reintroduce minimal flows.
- 🔜 Tasks:
  1. Restore `/api/auth/*` endpoints aligned with new application services.
  2. Wire email templates + telemetry adapters.
  3. Add integration tests covering onboarding happy path & failure states.

### 2.2 Community Slice (Spaces & Feed)
- ✅ New `SpaceAggregate` with invariants + tests (campus isolation, capacity limits).
- ✅ Application service, in-memory repository, API routes (`/api/spaces`, `/api/spaces/join`, `/api/spaces/leave`, `/api/spaces/[spaceId]`).
- ✅ `/spaces` experience rebuilt: discovery filters/search, curated sections, pattern-driven cards, creation wizard, and richer detail view with tabs (Posts/About/Members/Events) plus in-space posting lifecycle.
- ✅ Firestore schema documented (`docs/setup/SPACES_FIRESTORE_SCHEMA.md`) with toggled repositories behind `USE_FIRESTORE_SPACES` and seeding script (`scripts/seed-spaces.ts`).
- 🟡 Outstanding:
  - Leader management tooling (edit settings, transfer ownership) and live feed/events data wiring.
  - Integrate Firestore repository adapters & domain events.
  - Rebuild Feed aggregate, recommendation service, and `/feed` UI.
  - Implement post/event APIs (per `API_REFERENCE.md`).
  - Add tests for API handlers (Vitest + supertest) once repositories are injectable.
  - Campus isolation enforcement in controllers (currently default campus stub).

### 2.3 Activation Slice (HiveLab & Rituals)
- ✅ New `ToolAggregate` with publish/visibility/deploy rules + tests.
- ✅ Tool application service, in-memory repository, API routes (`/api/tools`, `/api/tools/:id/publish|deploy|visibility`).
- ✅ `/hivelab` page uses new APIs for drafts/templates/publish.
- 🟡 Outstanding for HiveLab:
  - Implement Firestore repository & event emission (deployment logs, analytics).
  - Builder canvas UI + element library from `packages/ui` (ref `docs/foundation/specs/product/master-prd.md`).
  - Tool runtime embedding within spaces (space tools tab).
  - Permission enforcement (canEdit, requiresApproval) – currently not surfaced in UI.
- 🔴 Rituals:
  - No new aggregate/services yet; follow `docs/foundation/architecture/ddd-guide.md#rituals-slice`.
  - Need `/rituals` API + UI, participation tracking, milestone events.

### 2.4 Governance & Moderation
- 🔴 Legacy admin app removed; zero admin routes.
- 🔴 Need new vertical slice:
  - Admin authentication + RBAC.
  - Moderation queue, feature flag management, audit log dashboard (see `docs/foundation/admin/**`).
  - Analytics integration (feed health, space metrics).
- 🔜 Establish backlog of compliance tasks based on `docs/foundation/operations/security/security-checklist.md`.

### 2.5 Platform Services
- ✅ Firebase admin bootstrap.
- 🟡 Outstanding:
  - Session middleware / cookie security.
  - Rate limiting (Redis or in-memory placeholder).
  - Observability: structured logging, metrics, tracing (`docs/foundation/development/dependency-strategy.md`).
  - Notification pipeline (email, push) & error reporting.
  - Deployment automation scripts.

### 2.6 Design System & Frontend Infrastructure
- ✅ `packages/ui` exported primitives (buttons, cards, tabs, etc).
- 🟡 Storybook coverage & visual regression harness.
- 🟡 Accessibility audits (ARIA, keyboard traps).
- 🟡 Component documentation / usage guidelines.
- 🔜 Themes & tokens alignment with `@hive/tokens`.

### 2.7 Analytics, Ops & Docs
- 🔴 Analytics package removed; need new instrumentation plan.
- 🟡 Operational runbooks (deployment, incident response) exist in docs but not wired to tooling.
- 🔜 Enable event logging from new aggregates (SpaceMemberJoined, ToolPublished) into analytics pipeline.
- 🔜 Update documentation as contexts ship (glossary, progress tracker).

## 3. Cross-Cutting Risks & Dependencies
- **Data persistence**: In-memory repositories are temporary. Must define Firestore schema & migration scripts before launch.
- **Auth coverage**: Many legacy auth endpoints removed; ensure UI flows still functional after cleanup.
- **Testing**: Typecheck blocked in sandbox; local/CI pipelines must run `pnpm typecheck`, `pnpm lint`, and targeted `vitest` suites.
- **Sandbox limitations**: Network access restricted; plan for manual verification or stub services.

## 4. Upcoming Milestones
1. **Sprint: Spaces Full Slice**
   - Add Firestore repository adapters for spaces.
   - Implement space creation + detail pages.
   - Hook feed recommendations to spaces membership.

2. **Sprint: HiveLab Builder**
   - Integrate element library, builder canvas, and publish flow with Firestore.
   - Support deployment targeting and tool runtime inside spaces.

3. **Sprint: Rituals & Governance Kickoff**
   - Build ritual aggregate + participation flows.
   - Spin up governance admin dashboard (moderation queue).

4. **Sprint: Platform Hardening**
   - Session middleware, rate limits, observability.
   - Analytics events + dashboards + automated docs updates.

## 5. Quick Reference
- **Domain Docs**: `docs/foundation/architecture/hive-ddd-architecture.md`, `docs/DDD_CONTEXT_MAPPING.md`
- **API Spec**: `API_REFERENCE.md`
- **Design IA**: `docs/foundation/specs/design/ui-ux-ia.md`
- **Testing Strategy**: `docs/foundation/operations/testing/manual-testing-guide.md`, `docs/foundation/architecture/domain-bdd-scenarios.md`

Keep this file updated at the end of every major slice or sprint. Include links to PRDs, tickets, and validation evidence for transparency.
