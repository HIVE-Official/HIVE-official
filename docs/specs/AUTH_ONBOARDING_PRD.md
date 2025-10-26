# HIVE — Auth + Onboarding Slice PRD (v1)

Authoritative feature specification for authentication, campus gating, session management, and onboarding (student path). UI/UX is intentionally out of scope; this document defines contracts, data, policies, acceptance criteria, and verification.

## 0) Executive Summary

- Students authenticate via campus‑approved magic links; sessions persist 7 days.
- UB is the open campus for v1; other SUNY → waitlist capture, no onboarding.
- Onboarding collects: handle (campus‑scoped), majors (1–2), grad year (bounded), residential selection, interests (≥1), optional leader intent; requires consent; defaults privacy to Campus.
- Completion emits ProfileOnboarded and seeds default/cohort/residential spaces.

## 1) Scope & Roles

In scope
- Magic‑link signup, resend, redemption; session create/restore/destroy
- Campus gating via email domain registry
- Onboarding progress capture and completion
- Campus‑scoped handle claim/validation
- Residential/academic/interests capture
- Leader intent intake (verification ticket; no auto‑elevate)
- Profile consent + privacy defaults
- Default/cohort/residential auto‑join

Out of scope
- Push notifications/prompting, full profile editor, photo/pronouns (defer)
- Admin approval for leader claims (lives in Admin slice)

Actors
- Student (primary), Alumni/Faculty/Staff (limited path), System/Admin (ops), Platform services.

## 2) Goals & Non‑Goals

Goals
- Reduce time‑to‑utility: UB student reaches first join/RSVP/post within minutes of signup.
- Preserve trust: campus‑verified accounts, campus‑scoped privacy by default.

Non‑Goals
- Multi‑tenant campus rollout tooling beyond UB
- Cross‑device SSO, social auth, or password flows

## 3) Environment & Dependencies

- Uses existing controllers/services in `apps/web/src/server/auth/**`
- Firestore for magic‑link records and profile persistence (if configured)
- Campus Registry: `config/campuses.json` via `CampusRegistry`

## 4) Feature Overview

4.1 Authentication & Campus Gating
- Accept only campus domains present in Campus Registry. For v1: `buffalo.edu` → campusId `ub-buffalo` (open). Others: waitlist capture.
- Magic link is sent on signup; verify consumes token (idempotent) and issues session.
- Session TTL: 7 days (cookie with HttpOnly, SameSite Lax, Secure in prod).

4.2 Onboarding (student path)
- Required steps (in order):
  1) Handle — lowercase, `[a-z0-9_]{3,20}`, unique within campus; reserve on submit.
  2) Academic — majors (1–2), graduationYear ∈ [now … now+8].
  3) Residential — Hall/On‑campus | Off‑campus | Commuter | Prefer not to say.
  4) Interests — ≥1 interest id (allow up to 6).
  5) Leader intent — optional toggle; if yes, capture minimal verification details; creates claim ticket only.
  6) Consent + Privacy — explicit consent; default privacy = Campus. Required to complete.
- Completion emits `ProfileOnboarded` with captured attributes and triggers auto‑join for default/cohort/residential spaces.

4.3 Alumni/Faculty/Staff (limited path)
- Allowed to request access and submit leadership claim; no full member onboarding in v1.

## 5) Data Model (authoritative)

Profile (subset of `ProfileAggregate`)
- id: string
- email: CampusEmail (value + campus)
- campusId: string
- handle: string | null (stored lowercased in `handleLowercase` index)
- academicInfo: { majors: string[] (max 2), graduationYear: number } | undefined
- residentialSelection: "on_campus" | "off_campus" | "commuter" | "prefer_not" | undefined
- interests: Array<{ id: string; label?: string }>
- leadership: { isLeader: boolean; spaces?: Array<{ id: string; name: string; campusId?: string }>; classCodes?: string[] } | undefined
- isOnboarded: boolean
- consentGrantedAt?: Date
- onboardingCompletedAt?: Date

LeaderClaim (new, intake only)
- id: string
- profileId: string
- campusId: string
- spaceName?: string
- roleProof?: string
- advisorContact?: string
- createdAt: Date
- status: "submitted" | "reviewed" | "approved" | "rejected" (v1 intake stops at submitted)

## 6) API Surface (contracts)

6.1 Signup & Sessions
- POST `/api/signup`
  - Body: { email: string, userType: "student" | "alumni" | "faculty" }
  - 200: { profileId, campusId, magicLinkExpiresAt, messageId, mode: "new" | "resume" | "welcomeBack" }
  - 400: { error: "Invalid email format" | "Only approved campus emails …" | … }
  - 409: { error: "Profile already exists" } (if applicable)
  - 429: { error: "Too many sign-up attempts" }

- POST `/api/auth/resend`
  - Body: { email: string, userType: string }
  - 200: same as signup
  - 429: cooldown or throttle; Retry-After header included

- GET `/api/auth/verify?token=…`
  - Redirects to onboarding on success; sets session cookie; on errors redirects to `/login?error=…` (invalid-link | consumed | expired)

- GET `/api/auth/session`
  - 204 when no session; 200 when present: { session: { sessionId, profileId, issuedAt, expiresAt, scopes }, onboardingComplete, userType }

- DELETE `/api/auth/session`
  - 200: { ok: true }

6.2 Onboarding
- GET `/api/onboarding/progress?profileId=…`
  - 200: { stepsCompleted: string[], remainingSteps: string[], percentComplete, partialSubmission, autoJoinPreview }

- POST `/api/onboarding/progress`
  - Body: { profileId: string, stepId: string, partialSubmission: object }
  - 200: { profileId, stepsCompleted, lastUpdated }

- POST `/api/onboarding/complete`
  - Body: { profileId, submission: OnboardingSubmissionDto }
  - 200: { profileId, campusId, onboardingCompletedAt, session: {…}, domainEvents, defaultSpaces: {id,name}[], cohortSpaces: {id,name}[] }
  - Side effects: sets session cookie; marks profile onboarded; writes consentGrantedAt

6.3 Handle validation
- GET `/api/auth/check-handle?handle=…[&campusId=…]`
  - 200: { available: boolean, handle: string }
  - 400: { available: false, reason: string }

6.4 Leader intent (intake)
- POST `/api/leader/claims`
  - Body: { profileId, campusId, spaceName?: string, roleProof?: string, advisorContact?: string }
  - 200: { ok: true, claimId }

6.5 Privacy
- PATCH `/api/profile/privacy`
  - Body: { profileId, privacy: { scope: "campus" | "public" } }
  - 200: current privacy settings

6.6 Waitlist (non‑UB campuses)
- POST `/api/schools/request`
  - Body: { name?: string, email: string, school: string }
  - 200: { ok: true }

## 7) Policies, Limits, and Errors

Campus gating
- Allowed domains: from `CampusRegistry`; UB open; others → waitlist (no onboarding).

Sessions
- TTL: 7 days; rotate on sensitive actions. Cookie: HttpOnly, SameSite Lax, Secure in prod.

Rate limits
- Signup: IP ≤5/hour; email ≤10/24h
- Resend: IP ≤20/24h; email ≤3/30m and ≤10/24h; cooldown 60s cookie (`ml_cd`)
- Verify: IP ≤15/30m

Handle
- Regex: `^[a-z0-9_]{3,20}$`; campus‑scoped uniqueness; suggest alternatives when taken.

Academic & Residential
- Majors: 1–2; Grad year: [currentYear … currentYear+8]
- Residential: one of enum values

Interests
- Minimum 1; max 6 stored

Leader intent
- Intake only; no automatic role elevation; claim stored for ops review.

Errors (representative)
- INVALID_EMAIL, UNAPPROVED_DOMAIN, CAMPUS_CLOSED, RATE_LIMITED, INVALID_HANDLE, HANDLE_TAKEN, INVALID_STEP, LINK_INVALID, LINK_CONSUMED, LINK_EXPIRED

## 8) Events & Side Effects

- ProfileOnboarded
  - payload: { profileId, campusId, majors[], graduationYear, interests[], residentialSelection, consentGrantedAt }
- Auto‑join default/cohort/residential spaces via `space-auto-join.service`
- Audit writes for: magic link creation/consumption, privacy changes, leader claim creation

## 9) Acceptance Criteria (DoD)

- UB email path
  - Signup → Verify issues 7‑day session; `/api/auth/session` reflects onboardingComplete=false until finish
  - Student onboarding cannot complete unless: valid unique handle, majors 1–2 with bounded year, residential set, ≥1 interest, consent checked
  - Completion marks profile onboarded, sets consentGrantedAt, emits ProfileOnboarded, auto‑joins defaults + cohort + residential

- Non‑UB SUNY path
  - Friendly block; waitlist request accepted; no onboarding routes permitted

- Handle validation
  - Inline check rejects invalid patterns; taken within same campus rejected; accepted otherwise

- Leader intent
  - Submitting “Yes” creates claim record; no role changes; idempotent per day

- Privacy default
  - After completion, privacy scope is Campus; profile privacy PATCH endpoint can update later

- Resend and verify errors
  - Cooldown and throttles enforced; verify handles invalid/expired/consumed tokens with clear error redirect

## 10) Verification Checklist

- [ ] UB signup returns 200 and sends magic link
- [ ] Verify sets session and redirects to onboarding
- [ ] `GET /api/auth/session` returns 200 with session and onboardingComplete=false
- [ ] Handle check rejects invalid/taken and accepts valid
- [ ] `POST /api/onboarding/progress` accepts academic/residential/interests payloads
- [ ] `POST /api/leader/claims` stores intake
- [ ] `POST /api/onboarding/complete` returns 200, sets cookie, ProfileOnboarded emitted, auto‑joins preview matches assignments
- [ ] `PATCH /api/profile/privacy` defaults to campus and can be updated
- [ ] Non‑UB email → `/api/schools/request` path only

## 11) Implementation Notes (repo alignment)

- Most services/controllers exist; endpoints present for signup/resend/verify/session/progress/complete/check‑handle/privacy.
- New: `/api/leader/claims` intake; handle campus‑scoped check (extend repo or accept UB‑only as equivalent for v1).
- Change: Session TTL from 12h → 7d in `SESSION_COOKIE_OPTIONS` and issuance sites.

## 12) Flags

- `NEXT_PUBLIC_ONBOARDING_DM` — DM thread UX (default on; no UI spec here)
- `NEXT_PUBLIC_ONBOARDING_PICK_SPACES` — optional starter spaces step (defer)

## 13) Risks & Mitigations

- Handle uniqueness across campuses — enforce campus filter post‑UB; for v1, global index is acceptable if only UB is enabled
- Email deliverability — keep resend/code fallback and dev console sender for local
- Abuse — throttles + cooldowns + audit; add captcha behind flag if needed

## 14) Open Decisions

- Campus‑scoped handle enforcement timing (v1 UB‑only vs multi‑campus)
- 6‑digit code fallback endpoint shape (optional for v1)
- Starter spaces step inclusion (flagged)

---
This PRD is feature‑complete for the Auth + Onboarding slice and aligns with the current codebase, calling out the minimal deltas to achieve v1.

