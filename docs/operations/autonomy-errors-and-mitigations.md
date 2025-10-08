# Autonomy Focus — Errors, Risks, and Mitigations

This log centralizes known blockers and risks tied to the student autonomy & convenience focus.

## Blocking Errors

1) TypeScript mismatch in `use-auth.ts`
- Path: `packages/auth-logic/src/hooks/use-auth.ts`
- Symptom: session type `{ issuedAt: string } | null` not assignable to `{ user: AuthUser; expiresAt: number } | null`.
- Impact: Blocks typecheck/build.
- Fix: Return `{ user, expiresAt: Date.now() + 24h }`.
- Done when: `pnpm typecheck` and `pnpm build` pass.

## High Risks (Pre‑Launch)

Mobile performance
- Risk: Core loop >3s on real devices (campus Wi‑Fi).
- Mitigation: Prefetch after auth; lazy load non‑critical; image budgets; measure p95.

Firebase quotas
- Risk: Exceed free tier on day 1.
- Mitigation: Billing alerts; readiness to upgrade; rate limiting in middleware.

Auth flow fragility (@buffalo.edu)
- Risk: Edge email providers; link expiry friction.
- Mitigation: Test matrix; link re‑issue UX; clear errors.

RSS import reliability
- Risk: Incomplete/failed event seeding.
- Mitigation: Dry‑run checks; retry/backoff; manual backfill path.

Realtime lag (SSE/Firebase)
- Risk: Delays causing stale feed.
- Mitigation: Backoff to polling; tune listeners; server logs for lag spikes.

## Validation Checklist
- [ ] Typecheck/build clean after auth fix
- [ ] iOS/Android core flows under budget
- [ ] Campus isolation verified in hot queries
- [ ] Indexes deployed (`pnpm indexes:deploy` if needed)
- [ ] Feed “why this item” present
- [ ] Tool publish from HiveLab into Space feed
- [ ] Moderation queue accessible to leaders

## Observability & Monitoring
- Errors: Centralized reporting (Sentry or equivalent) + alerting.
- Performance: Core loop timers as analytics events with p95 alerts.
- Quotas: Firebase spend and usage alerts; rate limit telemetry from middleware.

## References
- Launch action plan: `LAUNCH_ACTION_PLAN.md`
- Platform state: `PLATFORM_CURRENT_STATE.md`
- Middleware: `apps/web/src/lib/middleware/index.ts`
- Indexes: `firebase/firestore.indexes.json`

