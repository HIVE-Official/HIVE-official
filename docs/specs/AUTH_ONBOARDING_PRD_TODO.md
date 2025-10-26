# Auth + Onboarding — Feature‑First TODO (v1)

This is an AI‑executable task list. Each feature has atomic sub‑tasks with exact files to edit or create, guardrails, and completion checks. UI/UX is out of scope.

Implement in this order: Feature 1 → 2 → 3 → 4/5/6 → 7 → 8 → 9 → 10.

## Feature 1 — Campus‑Gated Authentication
- Do
  - Confirm Campus Registry gating is enforced in signup.
    - File: `apps/web/src/app/api/signup/route.ts:1`
    - Ensure the controller rejects non‑approved domains (relies on `CampusEmailFactory`). No code change if already enforced.
  - Ensure waitlist path exists for non‑UB: POST `/api/schools/request`.
    - File: `apps/web/src/app/api/schools/request/route.ts:1` (already present; no change unless throttles missing).
  - Verify magic‑link resend and verify routes return friendly errors for invalid/expired/consumed.
    - Files: `apps/web/src/app/api/auth/resend/route.ts:1`, `apps/web/src/app/api/auth/verify/route.ts:1`.
- Done when
  - UB email → 200 from `/api/signup`; non‑UB SUNY → rejected upstream and client uses `/api/schools/request`.

## Feature 2 — Session Management (7‑day)
- Do
  - Update cookie TTL to 7 days.
    - File: `apps/web/src/server/auth/constants.ts:1`
    - Set `SESSION_COOKIE_OPTIONS.maxAge = 60 * 60 * 24 * 7`.
  - Set issuance TTL to 7 days where sessions are created.
    - Files: `apps/web/src/app/api/auth/verify/route.ts:1`, `apps/web/src/app/api/onboarding/complete/route.ts:1`
    - Replace `ttlHours: 12` with `ttlHours: 168`.
- Done when
  - `GET /api/auth/session` shows `expiresAt ≈ now + 7d` for new sessions.

## Feature 3 — Onboarding Progress & Completion (server validation)
- Do
  - Enforce completion requirements (handle valid/unique, majors 1–2, graduationYear in [now..now+8], residential enum, interests ≥1, consent true).
    - File: `apps/web/src/server/auth/controllers/complete-onboarding.controller.ts:1`
    - Add zod validation to `submission` (augment existing schema) and return 400 with reason on failure.
  - Ensure progress API accepts residential and interests partials.
    - File: `apps/web/src/app/api/onboarding/progress/route.ts:1` (accept any `partialSubmission`, no schema tightening needed).
  - Verify `ProfileOnboarded` emission and auto‑join using provided attributes.
    - Files: same controller + `apps/web/src/server/auth/services/space-auto-join.service.ts`.
- Done when
  - Invalid payloads are rejected; valid payload completes, sets session, and returns seeds.

## Feature 4 — Handle Claim (Campus‑Scoped readiness)
- Do
  - Expose campus‑scoped check parameter without breaking v1.
    - File: `apps/web/src/app/api/auth/check-handle/route.ts:1`
    - Accept optional `campusId` query param; for v1 UB, continue global check; leave TODO to filter by campus for multi‑campus.
  - Optional: add handle reservation on submit (skip for v1 if not critical).
- Done when
  - API rejects invalid patterns; returns `{ available: boolean }` consistently.

## Feature 5 — Academic & Residential Capture
- Do
  - Validate majors (1–2) and graduationYear bounds in completion controller (covered by Feature 3).
  - Persist `residentialSelection` (property supported by repository).
    - File: `apps/web/src/server/auth/repositories/firestore-profile.repository.ts:1` (no change needed; field exists and persists).
- Done when
  - Completed profile shows `academicInfo` and `residentialSelection` fields populated.

## Feature 6 — Interests Minimum
- Do
  - Enforce `interests.length >= 1` and cap stored array to ≤6 on completion (in the same controller as Feature 3).
- Done when
  - Completion fails with 400 when zero interests; succeeds with ≥1.

## Feature 7 — Leader Intent (Intake Only)
- Do
  - Create POST route: `apps/web/src/app/api/leader/claims/route.ts`
    - Accept: `{ profileId, campusId, spaceName?, roleProof?, advisorContact? }`
    - If Firebase configured, write doc to collection `leader_claims`; else console.warn best‑effort.
    - Idempotency: dedupe by `profileId` + day (reject with 409 or return existing id).
- Done when
  - Calls store a claim and return `{ ok: true, claimId }`.

## Feature 8 — Consent + Privacy Default
- Do
  - On completion, set `consentGrantedAt = new Date()` and default privacy scope = campus.
    - File: `apps/web/src/app/api/onboarding/complete/route.ts:1` (after successful controller call, ensure privacy default if not set).
  - Confirm privacy PATCH updates scope without UI.
    - File: `apps/web/src/app/api/profile/privacy/route.ts:1` (no change expected).
- Done when
  - Completed profiles have consent timestamp and campus privacy by default.

## Feature 9 — Waitlist Capture (Non‑UB)
- Do
  - Ensure throttles are present and functioning (IP/email windows are set).
    - File: `apps/web/src/app/api/schools/request/route.ts:1` (already includes throttles).
- Done when
  - Non‑UB users can submit a request; route returns `{ ok: true }`.

## Feature 10 — Verification & Tests (server‑side)
- Do
  - Add/extend tests for:
    - Signup/resend/verify/session happy/error paths
    - Completion controller validation (handle/majors/year/residential/interests/consent)
    - Handle check invalid/taken/available
    - Leader claim POST (dedupe)
    - Privacy default on completion
  - Place tests near routes or services under `apps/web/src/app/api/**` and `apps/web/src/server/auth/**` using Vitest.
- Done when
  - `pnpm test` passes locally; key error cases covered.
