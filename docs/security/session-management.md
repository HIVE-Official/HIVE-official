Bounded Context Owner: Identity & Access Management Guild

# Session Management Policy

## Overview
- Sessions are issued through the shared `SessionService` in `packages/core`.
- HTTP-only cookies keep browser state in sync with the session repository.
- Magic-link verification and onboarding completion both rotate the active session.
- Cookie defaults match the 12-hour sliding window described in discovery (J03).

## Cookie Settings

| Property | Value | Source | Rationale |
| --- | --- | --- | --- |
| Name | `hive_session` | `apps/web/src/server/auth/constants.ts` | Single cookie across auth + onboarding surfaces |
| Path | `/` | Constants file | Session applies to all Next.js routes |
| HttpOnly | `true` | Constants file | Prevents client scripts from reading or mutating the token |
| SameSite | `lax` | Constants file | Avoids CSRF on GET while enabling same-origin navigation |
| Secure | `process.env.NODE_ENV === "production"` | API routes | Force TLS in prod, allow local HTTP during development |
| Max Age | `60 * 60 * 12` (12 hours) | Constants file | Aligns with onboarding discovery baseline |
| Expires | `session.expiresAt` (ISO timestamp) | `/api/auth/verify`, `/api/onboarding/complete` | Keeps browser expiration in lock-step with server TTL |

## Lifecycle

1. **Signup** — `/api/signup` creates a profile but does not issue a session.
2. **Magic-link verification** — `/api/auth/verify` marks the profile verified, calls `SessionService.create`, and sets the cookie.
3. **Onboarding progress** — User operates within the issued session. `OnboardingFlowProvider` relies on `/api/auth/session` to restore state on refresh.
4. **Onboarding completion** — `/api/onboarding/complete` now creates a fresh session, clears saved progress, and re-sets the cookie with the new expiry.
5. **Refresh & sliding window** — `SessionService.refresh` extends expiry when explicitly invoked (future middleware). Cookies will be re-issued alongside refresh calls.
6. **Sign-out** — `/api/auth/session` `DELETE` removes the cookie and allows the repository to revoke the server-side session.

## Persistence & Rotation

- **In-memory repositories** (default in tests and local dev without Firebase credentials) clone session props before persisting to prevent mutation bugs.
- **Firestore repositories** persist session, profile, and onboarding records under `sessions`, `profiles`, and `onboarding_progress` collections.
- Session rotation happens automatically when verification or onboarding completion succeed. Consumers should assume existing session IDs become invalid after either event.

## Telemetry Touchpoints

- `auth.signup_submitted`, `auth.magic_link_sent`, and `auth.magic_link_failed` fire from `SignUpService`.
- `ConsoleAuthTelemetry` logs to stdout; `FirestoreAuthTelemetry` writes to `auth_events`.
- Additional telemetry for `session.created` and `session.refreshed` is reserved for the upcoming auth middleware workstream (IAM-104 follow-up).

## Security Notes

- Cookies remain HTTP-only and SameSite Lax to mitigate XSS/CSRF.
- Production requires HTTPS; the `secure` flag toggles automatically.
- Session IDs are UUIDv4 generated via `UuidGenerator`.
- Console magic-link sender writes to `temp/outbox.log` for local testing without exposing secrets.
- Repository fallbacks ensure vertical slice flows operate without Firebase Admin credentials but emit visible warnings.

