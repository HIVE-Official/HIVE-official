# Auth + Onboarding — Integration Guide (v1)

Purpose: make the changes in docs/specs/AUTH_ONBOARDING_PRD.md and docs/specs/AUTH_ONBOARDING_PRD_TODO.md safe to apply on the current codebase. This is implementation‑oriented, with exact files, minimal deltas, and verification steps. No UI work.

## Overview
- Keep existing controllers/services intact; add small, scoped deltas.
- Avoid breaking multi‑campus by default; UB‑only assumptions are annotated.
- Validate everything server‑side; do not rely on client steps.

## Affected Areas (high level)
- Sessions: cookie constants + session issuance sites
- Onboarding completion validation (controller and/or domain)
- Handle check API (parameter surface)
- Leader claims API (new)
- Privacy defaults on completion (route‑level safe default)

## Step‑by‑Step Changes

1) Session TTL = 7 days
- File: `apps/web/src/server/auth/constants.ts`
  - Set `SESSION_COOKIE_OPTIONS.maxAge = 60 * 60 * 24 * 7`.
- Files: `apps/web/src/app/api/auth/verify/route.ts`, `apps/web/src/app/api/onboarding/complete/route.ts`
  - Where sessions are created, set `{ ttlHours: 168 }`.
- Notes: No behavior change to cookie flags; Secure stays prod‑only.
- Verify: `GET /api/auth/session` shows `expiresAt` ≈ now + 7d.

2) Completion validation: residential required + interests cap
- Preferred: Controller‑level guard to avoid wide domain change.
- File: `apps/web/src/server/auth/controllers/complete-onboarding.controller.ts`
  - Extend Zod schema:
    - Ensure `submission.residentialSelection` ∈ { on_campus | off_campus | commuter | prefer_not } when userType=student.
    - Ensure `submission.interests` is an array with `.length >= 1`; before forwarding, cap to `slice(0, 6)`.
  - Return `400` with first issue message on failure (existing pattern).
- Notes: Domain aggregate already enforces consent, handle validity, ≥1 interest, and student academic requirements.
- Verify: POST `/api/onboarding/complete` rejects missing residential; succeeds otherwise and persists fields.

3) Handle check — campus‑scoped readiness
- File: `apps/web/src/app/api/auth/check-handle/route.ts`
  - Accept optional `campusId` query param, parse/ignore for UB‑only.
  - Document behavior in response comment (for multi‑campus future filter).
- Optional (defer unless needed): Filter by campus in repository.
  - File: `apps/web/src/server/auth/repositories/firestore-profile.repository.ts`
  - Add a campusId filter path guarded by a feature flag or TODO.
- Verify: current UB flow unchanged; API contract stable.

4) Leader claims intake (new)
- Add route: `apps/web/src/app/api/leader/claims/route.ts`
  - Accept body: `{ profileId, campusId, spaceName?, roleProof?, advisorContact? }`.
  - If Firebase configured: write doc to collection `leader_claims` (fields + `createdAt` ISO date + source IP UA best‑effort).
  - Idempotency: deny or return existing when a submission exists for (profileId, yyyy‑mm‑dd).
  - Respond 200 `{ ok: true, claimId }`; 409 on duplicate; 400 on invalid payload.
- Verify: POST stores the record once; repeats within the same day are blocked.

5) Privacy default on completion
- File: `apps/web/src/app/api/onboarding/complete/route.ts`
  - After successful completion, ensure privacy scope defaults to campus if unset:
    - Call `PATCH /api/profile/privacy` internally or invoke service util to set `{ scope: "campus" }`.
    - Only apply when the profile has no explicit privacy set.
- Verify: Completed profiles have campus privacy by default; PATCH remains functional.

## Compatibility Notes
- Multi‑campus handle uniqueness: keep API param only; do not change storage/indexes yet. Safe for UB‑only.
- Domain changes vs controller guards: we chose controller guards for minimal blast radius. If domain needs parity later, port the residential/interests‑cap checks into `ProfileAggregate.validateCompletion` with updated tests.
- Leader claims intake is additive and isolated; no existing behavior changes.

## Config & Env
- None required for these changes. Firebase presence enables Firestore writes for leader claims; otherwise logs.

## Test Plan (server only)
- Add/extend Vitest for:
  - Sessions: verify `/api/auth/verify` + `/api/auth/session` expiry ≈ 7 days.
  - Completion: invalid residential → 400; interests cap to ≤6 on persist; consent enforcement unchanged.
  - Handle check: invalid pattern → 400; available/taken → 200.
  - Leader claim: first POST 200; second same‑day 409.
  - Privacy: after completion, profile has campus privacy.

## How to Verify (manual)
- Request magic link with UB email → verify → check session expiry.
- Complete onboarding with missing residential → expect 400.
- Complete onboarding with 10 interests → persisted interests length ≤ 6.
- POST a leader claim twice in a day → second fails with 409.
- Read profile privacy via `/api/profile/privacy` (or profile service) → `campus`.

## Reference Docs
- PRD: `docs/specs/AUTH_ONBOARDING_PRD.md`
- TODO: `docs/specs/AUTH_ONBOARDING_PRD_TODO.md`
- Current state: `docs/state/CURRENT_STATE.md`

