Status: Adopt
Owner: Design System Guild
Last updated: 2025-10-23

# Third‑Party UI Policy — shadcn/ui, Aceternity UI, Magic UI

Goal
- Move faster by sourcing proven, accessible patterns while keeping a single, token‑driven design system: `@hive/ui`.

Non‑Negotiables
- Apps import UI only from `@hive/ui`.
- No raw hex, durations, or easings — always map to tokens.
- Respect WCAG 2.2 AA+, visible focus (`.focus-ring`), keyboardability, and `prefers-reduced-motion`.
- Do not invent data shapes. Prototype in Storybook if backend contracts aren’t ready.

What to Use (and How)
- shadcn/ui
  - Use as the baseline for headless, Radix-backed primitives.
  - Add via generator into `packages/ui` only: `pnpm --filter @hive/ui shadcn:add <component>`.
  - Immediately refactor classes to tokenized Tailwind utilities (see `packages/ui/src/styles.css:1`).
  - Normalize props with `class-variance-authority` (variants: `default|secondary|ghost|link`, sizes: `sm|md|lg`).
  - Wrap complex Radix patterns to a stable API; leave escape hatches via `asChild`, `className`.

- Aceternity UI (recipes/FX)
  - Treat as recipes for layout/visual patterns (hero, section cards, spotlight, subtle FX).
  - Inline code into `packages/ui` with attribution notes; replace styles with tokens and motion utilities.
  - Remove heavy GPU/blur where not essential; provide `.no-glass` preview toggle where needed.

- Magic UI (micro‑interactions/animated accents)
  - Use for tasteful accents (marquee, shimmer, gradient borders) when tied to tokens and reduced‑motion safe.
  - Keep FPS‑heavy effects opt‑in; prefer CSS keyframes already provided in `@hive/ui`.
  - Ensure controls remain legible with neutral bases; gold reserved for the single CTA/focus.

Place in the Workspace
- All third‑party sourced code lives under `packages/ui`:
  - Primitives and atoms: `packages/ui/src/atoms/**`
  - Radix/shadcn composites: `packages/ui/src/components/ui/**`
  - Recipes/organisms: `packages/ui/src/organisms/**`
  - Motion/utilities: `packages/ui/src/utils/**`, styles at `packages/ui/src/styles.css:1`
  - Attribution and license note at the top of the file you import.

Adoption Checklist (must‑pass)
1) Tokens only: colors, spacing, radii, durations/easings map to tokens.
2) Focus: `.focus-ring` present on all interactives; 44px targets.
3) Reduced motion: non‑essential animation disabled under `prefers-reduced-motion`.
4) A11y: labels, roles, aria states, keyboard flow; SR‑only text where needed.
5) API shape: `className`, `asChild` (when relevant), `variant`, `size`; no prop explosions.
6) SSR safe and tree‑shakeable; no dynamic `window`/`document` access in module scope.
7) Storybook: default/hover/focus/disabled/error/loading states; docs added.
8) Tests: minimal interaction test (Vitest) if logicful; otherwise manual steps in story.
9) Performance: avoid layout shift; prefer opacity/transform animations; throttle observers.
10) License & attribution: comment header linking the original source.

Commands & Tips
- Add shadcn component to design system:
  - `pnpm --filter @hive/ui shadcn:add button`
  - Replace any raw classes with tokenized utilities; export from `packages/ui/src/index.ts:1`.
- Run Storybook and verify:
  - `pnpm --filter @hive/ui storybook`
- Lint/typecheck:
  - `pnpm lint`, `pnpm typecheck`

PR Template (UI sourced from third‑party)
- What & Why: component(s) and source (shadcn/Aceternity/Magic), token mappings.
- Scope: files changed under `packages/ui`, stories, any app usage.
- How to Verify: Storybook path, states to check, keyboard steps, reduced‑motion.
- Impact & Risk: perf notes, flags/toggles if new patterns.
- References: links to design tokens, `UI_GUIDELINES.md:1`, original source attribution.

Guardrails
- Do not import third‑party UI directly in apps. Wrap and export via `@hive/ui`.
- Keep gold usage to CTA/focus; surfaces neutral and high contrast.
- Escalate missing primitives/patterns to Design System Guild instead of forking ad‑hoc.

