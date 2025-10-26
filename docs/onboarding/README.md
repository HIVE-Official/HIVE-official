# Developer Onboarding Checklist

This checklist keeps new contributors aligned with `AGENTS.md` and the product state before writing code. Complete every step to ensure the 2025 campus OS stays trust-visible and backend-first.

## Day 0 Checklist
1. Read `AGENTS.md` and the snapshot in `docs/agents/README.md` to understand mission, operating rules, and enforcement artifacts.
2. Review the canonical execution tracker in `TODO.md` (focus on the slice you’re joining) plus the workspace overview in `README.md`.
3. Install dependencies with `pnpm install`, then run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` to confirm the workspace is healthy.
4. Launch Storybook (`pnpm --filter @hive/ui storybook`) and the e2e mini app (`pnpm dev:e2e`) to experience the current UI/UX against the fake API.
5. Read `apps/e2e/README.md` and `apps/e2e/src/server/fake-db.ts` so any UI work mirrors the canonical fake backend data.
6. Verify environment variables using `production.env.template` → `.env.local`; never add secrets to the repo.
7. Skim `docs/operations/onboarding/runbook.md` and `AUTH_ONBOARDING_PRODUCTION_CHECKLIST.md` to understand current funnels and guardrails.
8. Confirm your slice’s specs (e.g., `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`, `UI_GUIDELINES.md`) before touching components.
9. Record any drift between AGENTS, TODO, or specs in the standup log and wait for resolution before coding.

## How to Verify
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm --filter @hive/ui storybook`
- `pnpm dev:e2e`

Document completion of this checklist in your first PR description (include the commands you ran).

## Maintenance
- Changes to `AGENTS.md` or the workspace rules must update both `docs/agents/README.md` and this checklist in the same PR.
- Keep references (spec paths, commands) current; broken links block onboarding.
