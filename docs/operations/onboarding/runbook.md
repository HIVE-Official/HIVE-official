# Onboarding & Auth Runbook — UB Buffalo Pilot

**Last updated:** 2025-10-21  
**Owners:** Identity & Access Management Guild

## 1. Purpose
- Keep the signup → verification → onboarding funnel unblocked for University at Buffalo students.
- Preserve trust signals (campus-exclusive email, default space joins, dorm cohorts) while giving operators quick recovery steps.

## 2. Auto-Join Configuration
- Source of truth: `packages/core/src/data/auto-join/ub-buffalo.json`
  - `defaults` — welcome, new students, campus updates.
  - `residential` — maps onboarding dorm selections (e.g., `off-campus-students`) to real space IDs.
  - `cohorts` — major-based prefixes (e.g., `space-cohort-business-administration-{year}`).
- Generation: `ProfileAggregate` emits `profile.onboarded` with resolved defaults; `SpaceAutoJoinService` joins spaces immediately after onboarding completion.
- Manual override:
  1. Update JSON mapping with new space IDs.
  2. `pnpm lint` to validate JSON import.
  3. Deploy; no restart required (config is bundled).
  4. For already onboarded students, use `scripts/dev/seed-profile.ts --profile={profileId}` to replay membership.

## 3. Throttling & Abuse Protection
- Firestore collections:
  - `auth_throttle` — per bucket counter docs (`signup:ip:1h`, `auth:resend:email:30m`, `auth:verify:ip:30m`).
  - `auth_throttle_events` — append-only log (hashed identifiers) for monitoring.
- Limits (production):
  - Signup: 5/hour/IP; 10/day/email.
  - Resend magic link: 3/30min/email; 10/day/email; 20/day/IP.
  - Verify link: 15/30min/IP.
- Reset procedure:
  1. Use Firebase console or `firebase firestore:delete --recursive --collection-path auth_throttle --where "bucket == 'signup:email:24h' AND identifierHash == '{hash}'"`.
  2. Document override in incident notes (`Slack #ops-incidents`).
- Telemetry: `auth.throttle.disabled` warning logged if Firestore unavailable (auto-falls back to in-memory counters; restart after outage).

## 4. Email Delivery Issues
- Verified sender: `FIREBASE_MAGIC_LINK_CONTINUE_URL`, `FIREBASE_DYNAMIC_LINK_DOMAIN`.
- Symptoms: spike in `recordMagicLinkFailed`, throttle events without corresponding email.
- Actions:
  1. Switch to console mailer (`ENABLE_DEV_SEEDS=true`) to unblock during outage — **only** in staging.
  2. Notify campus partners if production impacted; reference `docs/security/session-management.md`.
  3. Postmortem must include resend volume, delivery provider response.

## 5. Manual Space Membership Remediation
- Use `/api/spaces/join` (Authenticated admin) or Firebase console to add `members` array entry.
- Maintain audit trail: log member, reason, timestamp in `admin/manual-actions` collection.
- After manual join, `SpaceAutoJoinService` ignores duplicates (idempotent).

## 6. Monitoring & Alerts
- Dashboard: wire `auth_throttle_events` + `auth.onboarding_completed` into Supabase/Looker to visualize completion vs throttling.
- Alert thresholds:
  - Signup throttle > 5 hits/hour.
  - Verify throttle > 20 hits in 30 minutes.
  - Auto-join failure log (`space.auto_join.failed`) escalates to Community Guild.

## 7. Contacts
- IAM Primary: Jacob Rhinehart (`@jacobrhinehart`) — campus auth & onboarding.
- Community Guild: Nina Alvarez — default space & cohort creation.
- Platform Ops: pager `+1-716-555-0199` for production incidents.
