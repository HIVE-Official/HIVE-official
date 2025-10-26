Status: Draft
Owner: Identity & Access Management Guild

# Entry, Auth (Magic Link), and Onboarding — E2E‑First Plan

Goal
- Prototype the complete entry funnel in the e2e app using the shadcn07 shell and @hive/ui components, with SSR‑safe mocks and minimal server stubs.

Scope
- Entry: `/` (home), school pick, early‑access ribbon.
- Auth: `/login` magic link (request, resend, verify, poll), session restore, sign‑out.
- Onboarding: `/onboarding` wizard, progress save, completion, leader posture.

References
- UI tokens and motion: UI_GUIDELINES.md:1
- Sidebar‑07 decision: docs/design/decisions/0001-app-shell-sidebar07.md:1
- Spaces IA (canonical): docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1

Flows
- Sign‑in (Happy Path)
  1) User opens `/login` and enters campus email + user type.
  2) App calls `POST /api/signup` → returns `{ profileId, messageId, magicLinkExpiresAt }`.
  3) UI shows “awaiting verification” and polls `GET /api/auth/session` every 5s.
  4) In e2e, dev triggers verification by visiting `/api/auth/verify?dev=1` (or with explicit `?token=…`).
  5) Session becomes available → UI redirects to `/onboarding`.

- Resend Link
  - `POST /api/auth/resend` returns `{ messageId }` or `429` with `Retry-After`.
  - UI surfaces friendly throttle text and allows retry after waiting.

- Onboarding Wizard
  - Steps save partial progress via `POST /api/onboarding/progress { profileId, stepId, partialSubmission }`.
  - Completion calls `POST /api/onboarding/complete { profileId }` → returns `{ session, defaultSpaces }`.
  - Auth context switches to `authenticated`; redirect to `/spaces`.

Routes (E2E)
- Entry
  - `/` Home (shell visible in e2e)
  - `/schools` Pick school (stub link from login when no `domain` param)
- Auth
  - `POST /api/signup` — create pending magic link (fixture)
  - `GET /api/auth/session` — returns session or 204 while pending
  - `DELETE /api/auth/session` — clears session
  - `POST /api/auth/resend` — throttle and return new messageId
  - `GET /api/auth/verify` — consumes pending and redirects to `/onboarding`
- Onboarding
  - `GET /api/onboarding/progress?profileId=…`
  - `POST /api/onboarding/progress { profileId, stepId, partialSubmission }`
  - `POST /api/onboarding/complete { profileId }`

Contracts (E2E Fixtures)
- `POST /api/signup`
  - Req: `{ email: string, userType: 'student'|'alumni'|'faculty' }`
  - Res: `{ profileId, campusId, magicLinkExpiresAt, messageId, mode }`
- `GET /api/auth/session`
  - Res: `204` while pending delay; otherwise `{ session, onboardingComplete: false, userType }`
- `POST /api/auth/resend`
  - Res: `{ messageId }` or `429 { error }` + `Retry-After`
- `GET /api/auth/verify`
  - Query: `?token=…` or `?dev=1` (dev convenience)
  - Effect: Session set in memory; redirects to `/onboarding`
- `POST /api/onboarding/progress`
  - Res: `{ profileId, stepsCompleted: string[], lastUpdated }`
- `POST /api/onboarding/complete`
  - Res: `{ profileId, onboardingCompletedAt, session, defaultSpaces, cohortSpaces }`

States (Auth Context)
- `idle` → `loading` (restore) → `awaitingVerification` (after signup) → `onboarding` (session but not complete) → `authenticated` (after completion)
- Error and sign‑out handled with friendly banners and redirects.

A11y & UX
- Inputs labelled; errors via `aria-describedby`.
- Focus rings on actions; keyboardable form and banners.
- Reduced‑motion respected for page and card transitions.
- Touch targets 44px+ on mobile.

Verification Steps (Manual)
1) Start `pnpm dev:e2e`.
2) Visit `/login`, enter `you@buffalo.edu`, send link.
3) Observe awaiting banner and polling. In a new tab, open `/api/auth/verify?dev=1`.
4) You should land on `/onboarding`.
5) Complete steps; submit → redirected to `/spaces`.
6) Sign out via avatar menu; visit `/login` again.

Edge Cases
- Invalid or missing token → `/login?error=invalid-link|missing-token`.
- Resend throttle (429) shows wait message; retry respected.
- Session not found on restore → remain in `idle` until signup.

Notes
- No secrets; Firebase calls are wrapped in try/catch and are no‑ops in e2e.
- When server contracts harden, replace fixtures with the real adapters.

