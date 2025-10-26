# Profile System — Feature‑First TODO (v1)

AI‑executable backlog. Focus on contracts, data, and server behavior. UI is out of scope.

Implement after Auth+Onboarding items (sessions/privacy) land.

## Feature P1 — Profile Bundle completeness
- Do
  - Ensure `GET /api/profile` returns: snapshot (privacy/presence/stats), connections state, activity entries, recommendations.
  - File: `apps/web/src/server/profile/profile.service.ts:fetchProfileBundle` (already implemented).
- Done when
  - Response validates against `profileBundleSchema` and includes non‑throwing defaults in dev.

## Feature P2 — My Spaces API (new)
- Do
  - Add `GET /api/profile/spaces?profileId[&role=owner|leader|member|pending|invited]`.
    - File: `apps/web/src/app/api/profile/spaces/route.ts`
    - For v1 UB: read `spaces` where `memberRoles[profileId]` exists; derive role from map; paginate with a reasonable upper bound (e.g., 250 campus spaces). Mark TODO for membership index.
  - Return sections: { id, name, role, joinedAt?, pending? invited? }.
  - Quick‑action guards are out of scope for API; UI will call Space routes.
- Done when
  - API returns buckets with correct counts for a seeded profile.

## Feature P3 — Personal Calendar (verify + enrich)
- Do
  - Verify `GET /api/profile/calendar` (exists): ensure items sort ASC, respect [start..end], limit, and include spaceName where possible.
  - File: `apps/web/src/server/profile/calendar.service.ts` (already implemented).
- Done when
  - Returned items validate intended shape and respect filters.

## Feature P4 — Recommendations reasons (incremental)
- Do
  - Extend `loadRecommendations` to attach a `reason` from one of: cohort (major/grad), residential, interest; fallback to “Popular on your campus”.
  - File: `apps/web/src/server/profile/profile.service.ts` (`loadRecommendations`).
- Done when
  - At least one deterministic reason is attached per space (based on available profile props).

## Feature P5 — Activity Timeline (verify)
- Do
  - Ensure `profiles/{id}/activity` loader tolerates unknown entries and enforces limit/order.
  - File: `apps/web/src/server/profile/profile.service.ts:loadActivity` (exists).
- Done when
  - Loader never throws; invalid entries are logged and skipped with placeholders.

## Feature P6 — Connections & Friends (present)
- Do
  - Verify `GET/POST/DELETE /api/profile/connections` and `.../friends` cover request/accept/remove and connect/disconnect flows.
  - Files: `apps/web/src/app/api/profile/connections/route.ts`, `apps/web/src/app/api/profile/friends/route.ts` (exist).
- Done when
  - Happy paths and invalid cases (self‑friend, profile not found) behave per service errors.

## Feature P7 — Invites & Requests Inbox (new)
- Do
  - Add `GET /api/profile/inbox?profileId` to aggregate: friend requests (incoming/outgoing), join requests (if leader), and invites (if model exists).
    - File: `apps/web/src/app/api/profile/inbox/route.ts`
    - Use existing endpoints: `/api/profile/friends` + `/api/spaces/[spaceId]/join-requests` for leader roles; TODO link for invites if/when added.
  - Add `POST /api/profile/inbox/respond` for friend requests (proxy to friends POST) and join requests (proxy to Space policy routes).
- Done when
  - A seeded profile sees friend requests; leader sees join request items.

## Feature P8 — Privacy default on completion (hook from Auth)
- Do
  - After onboarding completion, set privacy scope = `campus` if unset.
  - File: `apps/web/src/app/api/onboarding/complete/route.ts` (Auth slice) — already tracked; no Profile change needed.
- Done when
  - Profiles read back with campus visibility by default.

## Feature P9 — Proof/Exports (later incremental)
- Do
  - Add `GET /api/profile/calendar/ics?profileId[&range]` to export personal ICS (campus events only).
    - New file; use `packages/ui/src/utils/ics.ts` to generate.
- Done when
  - ICS downloads for a test profile and includes next 30 days of joined events.

## Feature P10 — Tests
- Do
  - Add Vitest coverage for new routes: `profile/spaces`, `profile/inbox`, and recommendations reasons.
  - Verify friends/connections routes with error cases.
- Done when
  - `pnpm test` passes; contracts validated.

---

Status quick‑pass
- Bundle, Privacy, Calendar, Connections/Friends exist → verify only.
- New work: My Spaces API; Inbox; rec reasons; ICS export (optional v1.1).

