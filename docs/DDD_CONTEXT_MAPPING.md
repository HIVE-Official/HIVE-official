# DDD Context Mapping – Blueprint vs Current Implementation

> Draft baseline: 2025-10-09. Source references include `docs/DOMAIN_GLOSSARY.md` and `docs/foundation/**`.

This document links each desired bounded context to the legacy implementation so we can decide what to keep, refactor, or rebuild.

---

## 1. Community (Spaces & Feed)

**Desired responsibilities**
- Space lifecycle (creation, membership, roles, visibility, discovery)
- Feed aggregation, personalization, real-time updates
- Social interactions (posts, reactions, follows, mutes, reports)

**Current implementation touchpoints**
- `apps/web/src/app/spaces/*`, `apps/web/src/app/feed/*`, `apps/web/src/app/events/*`
- Domain libs: `apps/web/src/lib/space-*`, `feed-*`, `real-time-feed*`, `rss-import.ts`
- Shared packages: `packages/core/src/domain/feed/**`, `packages/core/src/domain/spaces/**`
- Firebase Functions: `functions/src/spaces/*`, `functions/src/feed/*`, `functions/src/events_sync/*`

**Gaps / issues**
- Feed modules rely heavily on `any` and lack domain events (see `DDD Current State Audit`).
- Campus isolation rules inconsistently enforced (`campus-isolation.ts` vs middleware).
- Space discovery logic spread between server components, API routes, and Firebase functions.
- SSE infrastructure (`sse-realtime-service.ts`) tightly coupled to legacy state; needs redesign.
- Ranking/storytelling rules implied but not codified (3-second freshness target, pinned priority, relevance weighting).

---

## 2. Identity (Profiles & Trust)

**Desired responsibilities**
- Profile management, handles, avatars
- Verification workflows (`.edu`, Verified+, Leader claims)
- Connection graph, trust signals

**Current implementation touchpoints**
- `apps/web/src/app/profile/*`, `apps/web/src/components/profile/*`
- Libs: `apps/web/src/lib/profile-*`, `secure-session-manager.ts`, `auth-*`, `verification` scripts
- Shared packages: `packages/auth-logic/src/**`, `packages/hooks/src/use-profile.ts`, `packages/core/src/domain/profile/**`
- Firebase Functions: `functions/src/verification/*`, `functions/src/profile/*`

**Gaps / issues**
- Multiple session/auth implementations (`auth.ts`, `production-auth.ts`, `secure-auth-utils.ts`) with overlapping responsibilities.
- Verification state scattered between Firestore, Firebase Auth claims, and local cache.
- Connection system not clearly separated from feed/follow logic.
- UI components mix profile editing with analytics dashboards; needs separation by context.

---

## 3. Activation (Rituals & HiveLab)

**Desired responsibilities**
- Ritual campaign definitions, milestones, participation tracking
- HiveLab tool creation, deployment, runtime monitoring
- Connector management (built-in packs + external SDK submissions)
- Investment metrics feeding Governance dashboards

**Current implementation touchpoints**
- `apps/web/src/app/rituals/*`, `apps/web/src/app/hivelab/*`, `apps/web/src/components/tools/*`
- Libs: `apps/web/src/lib/rituals-framework.ts`, `tool-execution-runtime.ts`, `feature-reveal-system.ts`
- Packages: `packages/core/src/domain/rituals/**`, `packages/core/src/domain/tools/**`, `packages/core/src/domain/connectors/**` (planned)
- Firebase Functions: `functions/src/recommendations/*`, `functions/src/user_engagement/*`, portions of `functions/src/creation/tool.ts`

**Gaps / issues**
- Ritual participation tracking mixes client logic with server functions; events not standardized.
- HiveLab builder, runtime, and connector layers share utilities but lack clear interface boundaries and audit events.
- Connector strategy not codified (need curated built-ins, open-source SDK, approval workflow).
- AI-assisted creation planned; ensure integration point is documented so it can ship later without redesign.
- Activation metrics funneling into analytics not fully defined (see `docs/foundation/analytics/*` for desired state).

---

## 4. Governance (Admin & Moderation)

**Desired responsibilities**
- Moderation workflows, audit logging, security monitoring
- Feature flags, guard rails, anomaly detection
- Admin dashboards for operations/analytics

**Current implementation touchpoints**
- `apps/admin/src/*`, `apps/web/src/app/admin/*`, admin components in `apps/web/src/components/admin/*`
- Libs: `apps/web/src/lib/security-*`, `admin-moderation-actions.ts`, `audit-logger.ts`
- Firebase Functions: `functions/src/moderation/*`, `functions/src/analytics/*`, `functions/src/security/*`
- Docs: `docs/foundation/admin/**`, `docs/foundation/analytics/**`

**Gaps / issues**
- Dual admin surfaces (separate app vs in-app route) with diverging feature sets.
- Security middleware variants (`admin-middleware.ts`, `comprehensive-security-middleware.ts`, etc.) complicate policy enforcement.
- Feature flag system spread across `feature-flags.ts`, Firebase remote config, and admin panels.

---

## 5. Platform Services (Cross-cutting)

**Desired responsibilities**
- Authentication/session, rate limiting, logging, notifications, analytics plumbing

**Current implementation touchpoints**
- Auth scripts (`apps/web/scripts/*`), middleware (`apps/web/middleware*.ts`), instrumentation (`apps/web/instrumentation.ts`)
- Libs: `apps/web/src/lib/auth-*`, `secure-*`, `rate-limit*`, `structured-logger.ts`, `error-monitoring.ts`
- Shared packages: `packages/firebase/**`, `packages/hooks/src/use-feature-flags.ts`, `packages/api-client/**`
- Infrastructure docs: `docs/foundation/architecture/css-architecture.md`, `design-system-architecture.md`, `middleware` plans

**Gaps / issues**
- Multiple rate limiter implementations (simple vs Redis) with partial adoption.
- Notifications pipeline partially implemented; reliance on Firebase functions but UI hooks missing.
- Observability stack (structured logger, performance monitor) not uniformly integrated.

---

### Immediate Follow-ups
1. Validate this mapping with product/engineering leads; fill any missing modules per context.
2. For each context, mark modules as **Keep (reference)**, **Refactor**, or **Retire** to guide the cleanup effort.
3. Use this mapping as the backbone for the rebuild roadmap.
