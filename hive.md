# HIVE Platform — Takeover Plan & Execution Guide

This is the single source of truth for stabilizing, building, and shipping the HIVE platform after team handoff. It consolidates phases, tasks, sub‑tasks, owners, verification commands, and acceptance criteria.

## Snapshot (Current)

- TypeScript
  - Root: `npx tsc --noEmit` passes
  - Web app: `cd apps/web && npx tsc --noEmit` fails (route context, Zod, UI props, session nullability)
- ESLint (package-scoped runs)
  - Core: unsafe member access/any from Firestore DTO gaps
  - Web: no‑unused‑vars, react-hooks/exhaustive-deps
  - UI: no‑unused‑vars, any, CSF issues
- Pre-commit: design tokens enforcement failing (hardcoded hex/px in `packages/ui`)
- Build: production build not yet validated with Next 15 after fixes

See: `errors.md` for detailed rule/file breakdown and examples.

## Phase Plan

### Phase 0 — Baseline & Guardrails

Goals: Reproducibility and diagnostics are consistent.

- Lock versions and use package-scoped tooling
  - `pnpm typecheck`
  - `pnpm --filter web exec -- tsc --noEmit`
  - `pnpm --filter @hive/core exec -- eslint .`
  - `pnpm --filter web exec -- eslint .`
  - `pnpm --filter @hive/ui exec -- eslint .`
- Capture artifacts (already added)
  - `core-lint.json`, `web-lint.json`, `ui-lint.json`, `errors.md`
- Acceptance: Consistent outputs across machines/CI.

### Phase 1 — Web TypeScript Build Unblock

Goals: `apps/web` compiles via `tsc --noEmit`.

- Route handler/context typing (Next 15)
  - Ensure `RouteContext` with `{ params }` is passed; update wrappers in `apps/web/src/app/api/**/route.ts`.
- Guard undefined inputs before use
  - `apps/web/middleware.ts` (Date()/string calls)
  - `apps/web/src/lib/session-utils.ts`
  - `apps/web/src/lib/secure-session-manager.ts` (nullish checks)
- Zod schema alignment
  - `apps/web/src/app/api/tools/route.ts` (status default vs inferred types)
- UI prop mismatches (blocking errors in web)
  - Fix invalid `variant` values and remove unsupported props in pages like `auth/login`, `calendar`.
- Acceptance: `cd apps/web && npx tsc --noEmit` is clean.

### Phase 2 — Design System Compliance

Goals: Pre-commit hook passes (tokens only).

- Replace hardcoded hex/px with semantic tokens/Tailwind spacing in `packages/ui/src/atomic/**`.
- Update stories to CSF3; ensure proper default meta/component exports.
- Fix consuming pages where API drift occurred (variants, allowed props).
- Acceptance: git commit passes without `--no-verify`.

### Phase 3 — Core Type Safety (Repositories)

Goals: Eliminate unsafe-* patterns by typing Firestore.

- Define Firestore DTOs + type guards
  - Ritual: `packages/core/src/infrastructure/repositories/firebase/ritual.repository.ts`
  - Space: `.../space.repository.ts`
  - Profile: `.../profile.repository.ts`
  - Feed: `.../feed.repository.ts`
  - Tool: `.../tool.repository.ts`
- Remove legacy `application/shared/temporary-types.ts`, replace imports with domain value objects/aggregates.
- Convert generics to `unknown` where appropriate and perform explicit narrowing.
- Acceptance: Reduce `@typescript-eslint/no-unsafe-*` and `no-explicit-any` warnings by ≥70% in core.

### Phase 4 — Quality Gates & Build

Goals: CI green; production build succeeds.

- Lint thresholds
  - Target <200 warnings across repo, 0 errors.
- Build validation
  - `pnpm --filter web build`
  - Verify Next.js production build for App Router and APIs.
- Tests
  - Unit: `pnpm --filter web test:unit`
  - E2E: `pnpm --filter web test:e2e:*` (after fresh build)
- Acceptance: Lint clean within threshold; build succeeds; unit/e2e pass.

### Phase 5 — E2E, Indexes, Release

Goals: Operational readiness and deployment.

- Firestore indexes: `pnpm indexes:deploy` or `node scripts/deploy-firestore-indexes.js`
- Security review: ensure campus isolation helpers in API routes
- Release notes + runbook: confirm `.env` parity; Vercel config
- Acceptance: Deployed app healthy; smoke tests green.

## Workstreams & Ownership

- Web Build Unblock: Web platform engineer
- Design System Compliance: UI/Design engineer
- Core Type Safety: Backend/Domain engineer
- QA & E2E: QA engineer
- Release Engineering: DevOps

## Backlog (Granular Tasks)

- Web route typing
  - [ ] Update handler wrappers to ensure `{ params }` presence
  - [ ] Fix `.next/types/.../ParamCheck<RouteContext>` failures
- Middleware/session
  - [ ] Guard `string | undefined` before `Date()`/fn calls in `middleware.ts`
  - [ ] Add nullish checks and defaults in `secure-session-manager.ts`
- Zod
  - [ ] Align `tools/route.ts` status schema and usage to avoid `undefined`
- UI pages
  - [ ] `auth/login/page.tsx` variant/className mismatches
  - [ ] `calendar/page.tsx` invalid variant values
- Tokens/Stories
  - [ ] Replace hex/px in `packages/ui/src/atomic/**`
  - [ ] Convert stories to CSF3
- Repositories typing
  - [ ] Introduce DTOs + guards for ritual/space/profile/feed/tool repos
  - [ ] Remove `temporary-types.ts`; migrate imports

## Verification Commands

- TypeScript
  - Root: `npx tsc --noEmit`
  - Web: `cd apps/web && npx tsc --noEmit`
- Lint (package-scoped)
  - Core: `pnpm --filter @hive/core exec -- eslint . --format json --output-file ../../core-lint.json`
  - Web: `pnpm --filter web exec -- eslint . --format json --output-file ../../web-lint.json`
  - UI: `pnpm --filter @hive/ui exec -- eslint . --format json --output-file ../../ui-lint.json`
- Build
  - Web: `pnpm --filter web build`

## Risks & Mitigations

- Next 15 typing changes may surface more route issues → Start with a single route pattern and apply broadly.
- Token enforcement blocks commits → Stage UI token fixes early or use `--no-verify` only for WIP branches.
- Firestore DTO shape drift → Introduce guards and narrow progressively; prefer read-to-DTO mapping functions.

## Appendix — Top Offenders (from current scans)

- Core
  - Ritual repo: `packages/core/src/infrastructure/repositories/firebase/ritual.repository.ts`
  - Temporary types: `packages/core/src/application/shared/temporary-types.ts`
  - Space repo: `packages/core/src/infrastructure/repositories/firebase/space.repository.ts`
  - Profile repo: `packages/core/src/infrastructure/repositories/firebase/profile.repository.ts`
  - Feed repo: `packages/core/src/infrastructure/repositories/firebase/feed.repository.ts`
- Web
  - `apps/web/middleware.ts`, `src/lib/session-utils.ts`, `src/lib/secure-session-manager.ts`
  - `src/app/auth/login/page.tsx`, `src/app/calendar/page.tsx`
- UI
  - `packages/ui/src/atomic/atoms/**`, `packages/ui/src/atomic/molecules/**` (tokens/CSF)

