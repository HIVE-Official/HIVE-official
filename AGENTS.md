# Repository Guidelines

## Project Structure & Module Organization
- Turborepo monorepo: customer-facing Next.js app in `apps/web`, admin surface in `apps/admin`, Firebase functions in `functions/src`.
- Shared code lives in `packages/*` (`core` for domain logic, `ui` for shadcn components, `hooks`, `auth-logic`, etc.); import via `@hive/*` aliases.
- Tests sit alongside features (`apps/web/src/__tests__`, `packages/*/src/**/__tests__`); assets and public config are under `public/` and `config/` respectively.
- Long-form documentation, specs, and audits are collected in `docs/`—check there before reinventing patterns.

## Build, Test, and Development Commands
- Install and link workspaces with `pnpm install`; launch the primary app locally with `pnpm dev` (runs `turbo run dev`).
- Ship builds with `pnpm build`; add `pnpm --filter web build` when debugging a single app.
- Quality gates: `pnpm lint`, `pnpm typecheck`, and `pnpm test` (Vitest suites) must be green before any PR.
- End-to-end and Storybook flows use `pnpm test:e2e` (Playwright, requires a fresh build) and `pnpm storybook`.

## Coding Style & Naming Conventions
- TypeScript strict mode everywhere; avoid `any`—ESLint downgrades most unsafe patterns to warnings you are expected to fix.
- Follow Next.js App Router idioms: route folders use lowercase-kebab (`app/waitlist`), React components are PascalCase, hooks are camelCase prefixed with `use`.
- Styling is Tailwind-first with design tokens from `@hive/tokens`; co-locate CSS-in-JS only when tokens cannot express the intent.
- Run `pnpm lint` (ESLint + Prettier compatibility config) and accept fixed formatting; do not hand-tune spacing.

## Testing Guidelines
- Default to Vitest for unit/integration work: create `*.test.ts(x)` next to the code or inside `src/test/*` buckets and run `pnpm --filter web test:unit` as needed.
- Integration flows depend on MSW and Firebase mocks; keep fixtures in `apps/web/src/test/factories` and extend existing helpers instead of ad-hoc stubs.
- Playwright covers smoke, accessibility, and cross-browser suites; trigger targeted runs with `pnpm --filter web test:e2e:accessibility` or `...:cross-browser` before UI-heavy PRs.
- The 80%+ coverage target in `docs/TDD_COMPLETE_ANALYSIS_2025.md` still applies—watch the `coverage/` report emitted by Turbo tasks.

## Commit & Pull Request Guidelines
- Commit messages follow conventional commits (`type(scope): imperative summary`), e.g. `fix(web): align waitlist redirect`—scan `git log` for reference.
- Keep PRs focused, include a crisp summary, testing checklist (lint, typecheck, Vitest/Playwright), and link Jira/Linear issues where relevant.
- For UI or DX changes, attach before/after screenshots or short Looms and call out any config updates (`config/firebase`, `vercel.json`, env vars).
- Confirm automated checks in CI will pass locally; unresolved warnings or skipped tests block review.

## Security & Configuration Tips
- Never commit secrets—use `.env.local` copied from `.env.example` and keep Firebase service keys in your local keychain.
- Deployment and index scripts (`scripts/deploy-firestore-indexes.js`) assume up-to-date indexes; rerun them after schema shifts and include the command in the PR notes.
