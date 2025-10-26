# @hive/tokens — Design Tokens

Single source of truth for Hive’s design tokens and Tailwind preset.

What’s included
- `src/tokens.ts` — TypeScript token definitions (colors, spacing, radii, typography, shadows, motion). Exported as `@hive/tokens/tokens`.
- `src/styles.css` — CSS variables for runtime theming. Import once in apps via `@hive/tokens/styles.css` or indirectly via `@hive/ui/src/styles.css`.
- `src/tailwind.preset.ts` — Tailwind preset that maps tokens to utilities. Use with `presets: [@hive/tokens/tailwind]`.

Usage
- UI components consume tokens through CSS variables and Tailwind utilities. Do not hard‑code hex values or ad‑hoc spacings in components.
- Consumer apps should import `@hive/ui/src/styles.css` at the root; it already includes the token CSS.

Enforcement artifacts
- Token lint: `pnpm lint:tokens` checks for raw hex values and non‑token color usage across UI packages.
- Storybook tokens: `pnpm --filter @hive/ui storybook` exposes token stories for visual verification.
- Tailwind preset: projects load tokens via `presets: [require('@hive/tokens/tailwind').default]`.

Notes
- Tokens are the only allowed source for brand colors, motion durations/easings, radii, and typography scales. Update tokens first; components inherit.
- Motion and elevation values here are mirrored by `packages/ui/src/motion/tokens.ts` for Framer Motion helpers.
