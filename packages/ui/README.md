# @hive/ui — Design System Package

This package contains the reusable UI primitives that power the HIVE rebuild. Components are written in TypeScript, styled with Tailwind using the shared token preset from `@hive/tokens`, and documented in Storybook.

Import rules (single source of truth)
- Apps must import all components from `@hive/ui` only. Do not import from `@/atoms/*`, `@/molecules/*`, `@/components/ui/*`, or `@/organisms/*` in app code.
- The public surface is defined by `src/index.ts` and enforced by ESLint (`no-restricted-imports`) plus `pnpm lint:ui-imports`.
- Example: `import { Button, Card, Dialog } from '@hive/ui'`.

Third‑party sourcing: We adopt components from shadcn/ui (primitives), Aceternity UI (recipes/FX), and Magic UI (micro‑interactions) only through `@hive/ui` wrappers and with tokens/motion applied. See docs/ux/THIRD_PARTY_UI_POLICY.md:1.

## Local Development

```bash
pnpm install
pnpm --filter @hive/ui storybook
```

The Storybook catalog lives at http://localhost:6006 and mirrors the component exports from `src/index.ts`.

### Style Dials (Design Playground)

Use the Storybook toolbar to adjust live "Style Dials" for exploration:

- Radius: M (12) | L (16) | XL (20)
- Elevation: Flat | Soft | Medium
- Density: Cozy | Comfy | Airy
- Contrast: Low | Medium | High
- Glass: Off | Subtle | On
- Stroke: Hairline | 1px | 2px
- Gold usage: CTA-only | CTA+Badges | CTA+Timers
- Motion: Minimal | Standard | Expressive

Default library stance: Radius XL, Elevation Soft, Density Comfy, Contrast High, Glass Subtle, Stroke Hairline, Gold CTA-only, Motion Minimal. These match the Hive brand (minimal, dark, gold accents, subtle motion) and ensure a11y (WCAG AA+ focus and contrast).

For the end‑to‑end UX/IA plan across Spaces, Rituals, Feed, Tools, Profile, and HiveLab, see `docs/design/UI_UX_IA_MASTER_PLAN.md:1`.

## Tailwind Configuration

- `tailwind.config.ts` extends the shared preset from `@hive/tokens/tailwind`.
- Global styles reside in `src/styles.css`, which imports token CSS, enables Tailwind layers, and applies baseline theming for the dark-first Hive aesthetic.
- Typography is locked to Geist: `font-sans` resolves to Geist (Sans), and `font-mono` resolves to Geist Mono. In apps, load fonts via `next/font` and set CSS variables `--font-sans` and `--font-mono` (optionally also `--font-geist-sans` / `--font-geist-mono` for back-compat). Storybook loads them via Fontsource.

### Next.js font setup

Add Geist with `next/font` and wire CSS variables so tokens can pick them up:

```ts
// apps/web/src/app/fonts.ts
import localFont from 'next/font/local'

export const geistSans = localFont({
  src: './fonts/GeistVariable.woff2',
  // Prefer primary var used by tokens/tailwind preset
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap'
})

export const geistMono = localFont({
  src: './fonts/GeistMonoVariable.woff2',
  // Prefer primary var used by tokens/tailwind preset
  variable: '--font-mono',
  weight: '100 900',
  display: 'swap'
})
```

```tsx
// apps/web/src/app/layout.tsx
import { geistSans, geistMono } from './fonts'
import '@hive/ui/src/styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```
- PostCSS is configured in `postcss.config.mjs` and runs automatically when Storybook or Vite builds.
- Consumer apps should import `@hive/ui/src/styles.css` once at the root (e.g., in `app/layout.tsx`) to ensure tokens and animations are available everywhere.
 - Consumer apps should import `@hive/ui/src/styles.css` once at the root (e.g., in `app/layout.tsx`) to ensure tokens and animations are available everywhere.

## Typography

- Families: `font-sans` → Geist Sans; `font-mono` → Geist Mono (override via `--font-sans` / `--font-mono`).
- Roles (use instead of raw sizes):
  - Headings: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4`
  - Body: `text-body`, `text-body-sm`, `text-lead`
  - Micro: `text-caption`, `text-legal`, `text-label` (uppercase by usage)
  - Code: `text-code`, `text-kbd` (use with `font-mono`/`text-mono` if needed)
- Each role sets font-size, line-height, letter-spacing. Apply weight via tokenized classes: `font-h1`, `font-body`, `font-label`, etc. Avoid `font-semibold`/`font-medium` directly.
- Density: set `[data-density="compact|cozy|comfortable"]` on a container to scale sizes/leading consistently.
- Numeric rules: use `text-numeric` or `text-numeric-zero` for tabular/lining numerals; prefer `tabular-nums` utilities when composing in Tailwind.
- Measure helpers: `text-measure` (68ch), `text-measure-tight` (60ch), `text-measure-wide` (75ch).

Never hard‑code pixel sizes in components; prefer the role classes above. Existing Tailwind aliases (`text-sm`, `text-base`, etc.) are mapped to our roles for backward compatibility.

## shadcn/ui Integration

We use the shadcn CLI to bootstrap accessible Radix primitives before layering on Hive-specific styling. The CLI is preconfigured through `components.json` and the helper scripts:

```bash
pnpm --filter @hive/ui shadcn:add dialog
pnpm --filter @hive/ui shadcn:add dropdown-menu
```

CLI output is written to `src/components/ui/**` and then customized to match our design language (rounded radii, gold focus rings, motion tokens, etc.). `src/index.ts` re-exports the curated API consumers should rely on.

## Notable Exports

- `Dialog`, `Sheet`, `DropdownMenu`, `Tabs`, `CommandDialog`, `Toast`, and `Toaster` now sit alongside the existing button/input primitives.
- `useToast` and `toast` utilities live in `src/hooks/use-toast.ts` so feature teams can trigger notifications without wiring Radix directly.
 - `HiveLogo` exposes our brand mark (size + color modes).

## Foundation Utilities

- `focus-gold`/`focus-ring` + variants: `focus-inset`, `focus-outline-offset`, `focus-glow`, `focus-underline-inset`, `focus-halo`
- Glass hierarchy: `glass-subtle`, `glass-float`, `glass-elevated`, `glass-command` (legacy: `surface-glass`)
- Scrollbars: `scrollbar-styled` (opt-in, density-aware), `scrollbar-none` (hide)
- `density-compact|default|spacious`: Preview density classes (apply to a container)

See the full foundation guide in `docs/design/FOUNDATION.md`.

## Testing & Type Safety

Run `pnpm exec tsc --noEmit -p packages/ui/tsconfig.json` to validate types. New components should include a Storybook story under `src/stories` to showcase usage and styling contracts.
### Environment (shadcn CLI stability)

- Use Node 20 LTS for CLI operations. This repo includes an `.nvmrc` set to `20`.
- Use pnpm 10.18.2 or later.

Quick setup:

```bash
nvm use 20            # or: nvm install 20 && nvm use 20
corepack use pnpm@10.18.2
```

The default VS Code auto‑attach debugger can crash `pnpm dlx` processes on Node 22.
All shadcn scripts in this package unset debugger env vars for safety.

Run the CLI safely:

```bash
pnpm --filter @hive/ui shadcn:add button
# or explicitly
pnpm --filter @hive/ui run shadcn:add:safe sidebar
```
