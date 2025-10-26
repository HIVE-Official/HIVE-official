# HIVE Rebuild Workspace

This repository is the blueprint and implementation workspace for the next iteration of the HIVE platform. Each bounded context comes online as its vertical slice is delivered; the Identity & Access Management slice (auth + onboarding) is currently wired into the web app for local development.

## Getting Started

0. Start with `AGENTS.md` plus the quick snapshot in `docs/agents/README.md` so you understand the operating rules, enforcement artifacts, and where the product stands today.
1. Review the shared language and bounded contexts in `docs/DOMAIN_GLOSSARY.md`.
2. Study the desired vs. current mapping in `docs/DDD_CONTEXT_MAPPING.md`.
3. Follow the phased plan outlined in `docs/REBUILD_ROADMAP.md` to reintroduce application code context by context.
4. Detailed reference material from the previous shadcn foundation work lives under `docs/foundation/` and `blueprints/shadcn-foundation/`.

## Repository Structure

```
apps/
  web/         # Next.js app hosting delivered slices (auth + onboarding ready)
packages/      # Shared domain/application code (`@core`, shared data)
functions/     # Placeholder for Firebase/edge functions
scripts/       # Operational tooling (e.g., fake mailer)
blueprints/    # Archived snapshot of migration/shadcn-foundation
docs/          # Blueprint docs, glossary, roadmap, and supporting specs
```

## Development

- Install dependencies: `pnpm install`
- Run the vertical slice locally: `pnpm dev` (Next.js dev server at `http://localhost:3000`)
- Lint, type-check, and test: `pnpm lint`, `pnpm typecheck`, `pnpm test`
- Tailwind CSS is configured under `apps/web/tailwind.config.ts`; the design system preset and utilities live in `packages/ui/tailwind.config.ts` and `packages/ui/src/styles.css`.
- Canonical UI guidelines (brand, tokens, dials, motion, wiring): `UI_GUIDELINES.md`
- Storybook sandbox: `pnpm storybook` (build with `pnpm storybook:build`)
- Playwright smoke tests: `pnpm test:e2e` (installs browsers on first run)
- Production build preview: `pnpm build && pnpm start`

### Environment configuration

- Service connections now default to Firestore + production services. Provide Firebase Admin credentials (see `production.env.template`) before running `pnpm dev`.
- Set `ENABLE_DEV_SEEDS=true` in `.env.local` only if you intentionally want in-memory seed data for spaces/feed/tools (disabled by default).
- Optional toggles:
  - `USE_FIRESTORE_SPACES=false` or `USE_FIRESTORE_TOOLS=false` switch back to in-memory repositories **only when** `ENABLE_DEV_SEEDS=true`.
  - `NEXT_PUBLIC_AUTH_MODE=mock` remains available for UI prototyping, but should be avoided once real services are configured.
- `NEXT_PUBLIC_ONBOARDING_DM=true` redirects `/onboarding` to a DM-style flow prototype (off by default).
- `NEXT_PUBLIC_ONBOARDING_PICK_SPACES=true` adds a post-onboarding "Pick 3 Spaces" step before landing in `/spaces`.

## Playbook Maintenance

- Any structural or scope change in `AGENTS.md` must update `docs/agents/README.md` in the same pull request so onboarding stays accurate.

## Next Steps

- Confirm the glossary and context mapping with stakeholders.
- Rebuild the Community context (spaces/feed) using the new architecture.
- Gradually reintroduce supporting packages and functions as each context is implemented.
