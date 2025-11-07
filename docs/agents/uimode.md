/uimode — UX & UI Mode Quickstart

Kickoff
- Sync AGENTS + specs
- Start Storybook: pnpm --filter @hive/ui storybook
- Start E2E mini app: pnpm dev:e2e
- Enforce tokens: pnpm lint:tokens

Exit Criteria
- Stories cover loading/empty/error/success
- pnpm build / pnpm lint pass
- a11y/motion checklist signed
- Parity validated in apps/e2e

Notes
- Ship UI through Storybook-first until backend contracts are frozen.
- Use only @hive/ui wrappers for third-party primitives.
- Keep E2E mini app production-free: in-memory fake API only.

