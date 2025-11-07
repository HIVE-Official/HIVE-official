# Onboarding & Authentication — Production TODO

Owner: Web Platform
Status: Active (P0 for launch)

## Completed (This pass)
- Removed legacy localStorage auth fallback in production (server-only auth).
- Standardized secure client fetch with cookies + CSRF for same-origin calls.
- Cleared session cookie on logout regardless of Authorization header.
- Centralized admin checks in verify flow via `isAdminEmail` helper.
- Added production guard: `SESSION_SECRET` required in prod.

## High Priority
- Verify end-to-end magic link auth in prod:
  - Send → Rate limit enforced (429 on abuse)
  - Verify → JWT cookie set (24h users, 4h admins)
  - UB `@buffalo.edu` enforcement + school domain check
- Admin CSRF:
  - Ensure `<meta name="csrf-token">` present on admin surfaces
  - Mutating `/api/admin/**` requires `X-CSRF-Token`
  - Add Playwright test: missing token → 403
- Logout hardening:
  - Confirm cookie cleared and refresh tokens revoked when header present
  - E2E: login → logout → cookie deleted → protected route redirects
- Session secret:
  - Set `SESSION_SECRET` in Vercel; fail build if missing (guard in place)

## Medium Priority
- Consolidate route wrappers:
  - Prefer `withSecureAuth` for admin/protected APIs (rate-limit + CSRF + campus)
  - Use `withAuthAndErrors` for non-admin protected routes; avoid drift
- Replace direct Authorization patterns in remaining libs with `secureApiFetch`
- Align onboarding bridge with consolidated fetch and error semantics (done for POST)

## Tests to Add
- Playwright
  - Magic link happy path (send→verify→cookie→redirect /onboarding)
  - Admin mutation requires CSRF (403 without, 200 with)
  - Logout clears cookie; follow-up request to protected API returns 401/redirect
- Vitest (unit)
  - `session.ts` throws on missing `SESSION_SECRET` in prod
  - `isAdminEmail` gating in verify flow

## Observability
- Audit logs on send/verify failures (threat codes from validator)
- Rate limit headers on 429 responses
- Security alerts endpoint reachable and logged

## Rollout Checklist
- Env:
  - `SESSION_SECRET` set
  - Firebase Admin vars set (no secrets in repo)
  - Redis/Upstash envs (if using distributed rate limits)
- Smoke:
  - Auth send/verify
  - Onboarding POST
  - Logout cookie clear
  - Admin CSRF (one POST)

## References
- apps/web/middleware.ts
- apps/web/src/lib/session.ts
- apps/web/src/app/api/auth/*
- apps/web/src/lib/secure-auth-utils.ts
