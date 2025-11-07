# Agents Snapshot (UI Mode)

What Changed
- Added UI guidelines (UI_GUIDELINES.md) as canonical design system rules.
- Added /uimode quickstart (docs/agents/uimode.md) to standardize design/interaction-led slices.
- Added third-party UI policy (docs/ux/THIRD_PARTY_UI_POLICY.md) to enforce wrappers via @hive/ui.
- Scaffolded apps/e2e mini app with in-memory fake API for parity.

How to Verify
- pnpm --filter @hive/ui storybook
- pnpm dev:e2e → http://localhost:3100
- pnpm lint:tokens

