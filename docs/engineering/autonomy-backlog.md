# Autonomy & Convenience Engineering Backlog

Status: Living document for autonomy‑first delivery. Priorities map to the <3s core loop and student‑led creation.

## Goals
- Guarantee <3s open→feed on real devices.
- Minimize friction in creation (Spaces, Rituals, HiveLab publish).
- Make distribution transparent (feed is read‑only, explain ranking).
- Enforce campus isolation and safety with dignity.

## P0 — Critical Path
1) Fix TS blocker (build‑blocking)
   - Path: `packages/auth-logic/src/hooks/use-auth.ts`
   - Issue: session shape mismatch at line ~266
   - Acceptance: `pnpm typecheck` passes, `pnpm build` passes.

2) Instrument core loop timings
   - Add analytics for: open→feed, feed→post, join time.
   - Acceptance: dashboard events emitted with p95 timings; regression budget defined.

3) Mobile performance validation
   - iOS Safari + Android Chrome on campus‑like networks.
   - Acceptance: p95 open→feed <3s, feed→post <1s.

4) Space & Ritual creation friction pass
   - Space create wizard with sensible defaults/templates; 2‑step publish.
   - Ritual quick‑start (type preset + start/end + goal); publish to feed.
   - Acceptance: creation in ≤60s; no full‑page reloads.

5) HiveLab publish & share
   - Ensure tool publish to Space and attach to posts/Rituals flows are smooth.
   - Acceptance: publish ≤60s; visible in Space feed; linkable from posts.

6) Distribution clarity
   - Per‑post “Why you’re seeing this” (R/E/A/S/P factors snapshot).
   - Acceptance: tooltip or detail panel present on feed items.

7) Governance & safety rails
   - Space roles, content flags, lightweight moderation queue (non‑blocking).
   - Acceptance: leaders can hide/restore items; audit logged; campus‑scoped.

8) Campus isolation audit
   - Verify `campusId` filtering in hot paths (spaces/feed/profile queries).
   - Acceptance: queries inspected; tests cover isolation; indexes present.

## P1 — High Priority
9) Rituals participation polish + feed integration
   - Progress updates surface in feed with throttling.
   - Acceptance: participation event reflected in feed within seconds.

10) E2E coverage for core loop
   - Onboarding → join spaces → feed scroll → open post → ritual participate.
   - Acceptance: green Playwright suite on CI.

11) Prefetch & caching
   - Prefetch joined spaces + first page feed post‑auth; cache‑first reads.
   - Acceptance: reduced TTFB for first three views.

12) Observability
   - Error reporting (Sentry or equivalent), perf traces, quota alerts.
   - Acceptance: dashboards live; alert thresholds defined.

## P2 — Next
13) Feed algorithm settings for admins (explainers + safe tweaks).
14) Creator analytics (space‑scoped: reach, engagement, retention).
15) Mobile micro‑interactions (haptics, subtle motion within budget).

## TODO Checklist (Rolling)
- [ ] Fix `use-auth.ts` session type (blocker)
- [ ] Add analytics timers (open→feed, feed→post, join)
- [ ] Mobile device perf run (record p95)
- [ ] Space wizard (defaults + templates)
- [ ] Ritual quick‑start + feed publish
- [ ] HiveLab publish to Space + attach to post
- [ ] “Why you’re seeing this” in feed items
- [ ] Moderation queue (non‑blocking)
- [ ] Campus isolation audit + tests
- [ ] E2E: core loop
- [ ] Prefetch: spaces + feed
- [ ] Error/perf monitoring dashboards

## References
- Middleware patterns: `apps/web/src/lib/middleware/index.ts`
- Universal Shell: `docs/architecture/universal-shell.md`
- KPIs & vision: `docs/specs/product/hive-overview.md`
- Indexes & isolation: `firebase/firestore.indexes.json`

