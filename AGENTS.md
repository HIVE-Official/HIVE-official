# Repository Guidelines

## Project Structure & Module Organization
- Turborepo + pnpm workspace; seed with `pnpm install`.
- Customer surface: `apps/web` (Next.js App Router, admin at `/admin`); internal ops: `apps/admin`; backend automations: `functions/src`.
- Shared packages (`@hive/*`) cover domain (`core`), UI (`ui`), auth (`auth-logic`), Firebase, tokens, hooks, analytics. Always import via these aliases.
- Tests live beside features (`apps/web/src/__tests__`, `packages/*/src/**/__tests__`); long-form references in `docs/`; static assets in `public/`, config in `config/`.

## Architecture & Product Focus
- Five pillars—Spaces, Feed, Profile, HiveLab, Rituals—must reinforce the <3s loop from launch → feed → engagement.
- `@hive/core` enforces DDD: aggregates in `domain/*/aggregates`, immutable value objects in `domain/*/value-objects`, orchestrators in `application/`.
- API routes (`apps/web/src/app/api/**/route.ts`) wrap handlers with `withAuthAndErrors` or `withAdminAuthAndErrors` for auth, campus isolation, and normalized responses.

## Build, Test, and Development Commands
- `pnpm dev` (or `pnpm dev --filter web`) for local work; production builds use `NODE_OPTIONS="--max-old-space-size=4096" pnpm build` and can be scoped with `pnpm --filter web build`.
- Quality gates before every PR: `pnpm lint`, `pnpm typecheck`, `pnpm test`.
- Targeted suites: `pnpm --filter web test:unit`, `pnpm --filter web test:e2e:*`, `pnpm storybook`, `pnpm build:analyze` for bundle insight.

## Coding Style & Naming Conventions
- Strict TypeScript; avoid `any`, prefer explicit returns on shared utilities.
- Routes use lowercase-kebab folders; components PascalCase; hooks camelCase prefixed with `use`.
- Tailwind driven by `@hive/tokens`; only reach for CSS-in-JS when tokens cannot express the variant. Run `pnpm lint` to keep ESLint + Prettier formatting authoritative.

## Testing Guidelines
- Vitest powers unit/integration tests (`*.test.ts[x]` adjacent to code). Reuse MSW + Firebase fixtures in `apps/web/src/test/factories` before adding new mocks.
- Playwright handles smoke, accessibility, and cross-browser flows via `pnpm --filter web test:e2e:*` after a fresh build.
- Monitor Turbo-emitted `coverage/` artifacts and sustain ≥80% coverage before merge.

## Commit & Pull Request Guidelines
- Conventional Commits (`feat(core):`, `fix(web):`, `chore(ui):`) keep history scannable.
- PRs stay focused; include summary, linked Linear/Jira issue, and checklist for lint/typecheck/tests. Attach screenshots or Looms for UX/DX shifts and call out config updates (`config/firebase`, `.env`, deployment scripts`).

## Security & Configuration Tips
- Never commit secrets—bootstrap from `.env.example` → `.env.local`; store Firebase keys securely.
- Enforce campus isolation on Firestore reads; prefer helpers like `getSecureSpacesQuery`.
- After schema or index changes run `pnpm indexes:deploy` (or `node scripts/deploy-firestore-indexes.js`) and note it in release communications. Block merges on CI warnings or flaky suites.
