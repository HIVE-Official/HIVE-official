# AGENTS Playbook Snapshot

This README orients new contributors to `AGENTS.md`, Hive's operating system for AI co-founders building the trust-visible 2025 campus social OS. It distills the rules that keep us backend-first, Storybook-first, and fake-API accurate while we defend student safety and activation metrics.

## What AGENTS Covers Right Now
- **Mission & Vision** — Defines Hive as the web-first campus graph with reversible, transparent actions so every student reaches value same-day. (See [`AGENTS.md`](../../AGENTS.md#user-content-agentsmd--hive-ai-co-founder-operating-playbook))
- **Meta Operating Rules** — Forces every directive to cite its enforcement artifact and stay synced with `UI_GUIDELINES.md`, the Spaces IA spec, `TODO.md`, and `README.md`.
- **AI Co-Founder Mandate** — Sets the YC-partner posture: advice-first, student-first, decisive about stale deps, and brutally clear about blockers.
- **Operating Principles** — Locks backend-first contracts, Storybook-first UI, trust-visible defaults, and architectural discipline (no new shapes without server parity).
- **Workspace Layout** — Maps deployable apps, the always-on `apps/e2e` fake backend, shared packages, and docs so execution flows stay predictable.
- **Build & Quality Gates** — Requires Node 20 + `pnpm`, and the full suite (`pnpm dev --filter web`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`) before merging.
- **E2E Parity Rules** — Keeps `apps/e2e` bootable at all times, bound to the in-memory API (`apps/e2e/src/server/fake-db.ts`), with debates hidden behind feature flags.
- **Coding + UI/UX Standards** — Enforces TypeScript conventions, Tailwind tokens, a11y/motion baselines, Storybook-first coverage, and Dock terminology.
- **UX & UI Agent Instructions** — Breaks down visual design, interaction, accessibility, performance, responsive layout, forms, and testing duties with enforcement hooks to `UI_GUIDELINES.md`, `HIVE_BRAND_DESIGN_PERSONA.md`, `docs/templates/a11y-motion-checklist.md`, `@hive/ui` Storybook, and the `pnpm lint:tokens` / `pnpm test:e2e` gates.
- **Modes** — `/uimode` spins up the dedicated UX/UI mode (`docs/agents/uimode.md`) with a start sequence (Storybook, apps/e2e, lint tokens) plus exit checks.
- **Design & Ideation Workflow** — Mandates brief → wireframe → parity handoffs using the templates under `docs/templates/` and Storybook greyscreens before routing work.
- **Working Agreement / Communication / Security / Flags** — Details backend-readiness criteria, PR narrative structure, secret handling, Firebase rule deployment, and feature-flag defaults.
- **Verification Shortcuts & Marketing Notes** — Lists canonical API calls for QA plus guardrails for referencing brand docs under `docs/business/**`.

## Canonical References
| Need | Canonical Source |
| --- | --- |
| Tokens, motion, accessibility | [`UI_GUIDELINES.md`](../../UI_GUIDELINES.md#L1) |
| Spaces IA & product spec | [`docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`](../design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md#L1) |
| Execution tracker & checklists | [`TODO.md`](../../TODO.md#L1) |
| Workspace onboarding overview | [`README.md`](../../README.md#L1) |
| Storybook + design system | `packages/ui` via `pnpm --filter @hive/ui storybook` |
| Fake backend contract | [`apps/e2e/src/server/fake-db.ts`](../../apps/e2e/src/server/fake-db.ts#L1) |
| Third-party UI policy | [`docs/ux/THIRD_PARTY_UI_POLICY.md`](../ux/THIRD_PARTY_UI_POLICY.md#L1) |
| Brand palette & tone | [`HIVE_BRAND_DESIGN_PERSONA.md`](../../HIVE_BRAND_DESIGN_PERSONA.md#L1) |
| A11y & motion validation | [`docs/templates/a11y-motion-checklist.md`](../templates/a11y-motion-checklist.md#L1) |
| UX/UI mode playbook | [`docs/agents/uimode.md`](./uimode.md#L1) |

## How to Use This Playbook
1. Read `AGENTS.md` end-to-end before touching code; note which enforcement artifact applies to your slice.
2. Sync design intent in Storybook using real fixtures while the backend contract stabilizes; never bypass the fake API.
3. Build against the documented commands and lint/token gates; flag any drift immediately via the standup log.
4. When proposing changes, cite the relevant AGENTS section plus its canonical doc or checklist so reviewers can verify fast.

## Maintenance Expectations
- Any structural or scope change inside `AGENTS.md` must be reflected here the same day; this README is the quick onboarding snapshot.
- Keep links fresh: if a file moves or spec updates, update both `AGENTS.md` and this README plus the cited enforcement commands/tests.
- If a rule lacks an enforcement artifact, add one (lint target, spec reference, fake data path) before merging the change.
