# HIVE — Profile System PRD (v1, integrated)

Purpose: authoritative feature spec for the Profile vertical slice (identity; My Spaces; My Calendar; Recommendations; Activity; Social Graph; Invites/Requests; Privacy/Settings), integrated with current code. UI/UX is referenced by components but out of scope here.

## Platform Invariants
- Spaces own community rules; Profile never overrides Space policies.
- Calendar shows Events/Deadlines only; both deep‑link to Posts (no digesting).
- Feed composition is independent; Profile does not mass‑post or bundle to Feed.

## Routes (server)
- Profile Bundle: `GET /api/profile?profileId` → snapshot + connections + activity + recs
- Profile Update: `PATCH /api/profile` → merge allowed fields
- Privacy: `PATCH /api/profile/privacy`
- Presence: `GET /api/profile/presence?profileId`
- Connections: `GET/POST/DELETE /api/profile/connections`
- Friends: `GET/POST/DELETE /api/profile/friends`
- Recommendations: `GET /api/profile/recommendations?profileId[&limit]`
- Personal Calendar: `GET /api/profile/calendar?profileId[&start&end&limit]`
- My Spaces (new): `GET /api/profile/spaces?profileId[&role]` (owner|leader|member|pending|invited)
- Invites/Requests (new): `GET /api/profile/inbox?profileId` and `POST /api/profile/inbox/respond`

## Data/Contracts (in code)
- Profile contracts: `apps/web/src/profile/profile.contract.ts`
- Profile service: `apps/web/src/server/profile/profile.service.ts`
- Calendar aggregation: `apps/web/src/server/profile/calendar.service.ts`
- Connections/Friends API: `apps/web/src/app/api/profile/connections|friends/*`
- Privacy API: `apps/web/src/app/api/profile/privacy/route.ts`
- Recommendations API: `apps/web/src/app/api/profile/recommendations/route.ts`

## Core Features
1) Identity & Privacy
- Campus-validated email, campus‑scoped handle; personal/academic/affiliation/social; interests; consent.
- Privacy defaults to Campus (set on onboarding completion), editable via PATCH.

2) My Spaces
- Sections: Owned/Leader, Member, Pending, Invited. Quick actions (open, calendar, about, share, leave/accept/decline) enforced by Space policy.
- Data source: Space memberships (Firestore spaces.memberRoles + join requests/invites); UB scale ok to query; add membership index later.

3) My Calendar (personal)
- Aggregates joined space Events; filters [start..end]; returns `ProfileCalendarResponse`. Inline RSVP/check‑in use existing Space endpoints.

4) Recommendations
- Space recs (initial: campus popular) + People (from connections). Future: cohort/residential/interest reason chips.

5) Activity Timeline
- Profile activity entries from `profiles/{id}/activity` collection; ordered by occurredAt.

6) Social Graph
- Connections: auto‑generated from shared spaces via `auto-connections.service.ts`; CRUD via `/api/profile/connections`.
- Friends: explicit mutual elevation via `/api/profile/friends`.

7) Invites/Requests (Inbox)
- Space membership invites and join requests surfaced here; accept/decline per Space policy; friend requests are included.

## Acceptance (DoD)
- Bundle returns snapshot + connections + activity + recs (with privacy/presence and completion score)
- My Spaces API returns correct role buckets with quick‑action guardrails
- Calendar API returns upcoming items for joined spaces; RSVP/check‑in work via Space APIs
- Connections/Friends APIs work end‑to‑end (request/accept/remove; connect/disconnect)
- Privacy defaults to Campus on onboarding completion; PATCH updates work; reads enforce campus scoping

## Gaps to Close (tracked in TODO)
- My Spaces API and Inbox routes (new)
- Privacy default after onboarding completion (small route‑level delta)
- Session TTL alignment from Auth slice (7d) already tracked there
- Recommendation reasons (cohort/residential/interest) — follow‑up increment
- Personal schedule overlay (class/busy) — follow‑up increment

