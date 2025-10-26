# HIVE UI Foundation

This document captures the baseline aesthetic and implementation rules for our design system.

For the full UX/IA plan across Spaces, Rituals, Feed, Tools, Profile, and HiveLab, see `docs/design/UI_UX_IA_MASTER_PLAN.md:1`.

Detailed guardrails for iconography along with the elevation & glass depth model live in `docs/design/ICONOGRAPHY_ELEVATION_GLASS.md`.

## Principles

- Calm monochrome base with precise, 1px borders
- Subtle elevation (shadow-level1 for interactive, level2 for overlays)
- Soft glass (alpha + backdrop-blur) on elevated surfaces
- Consistent radii per component class (button, input, card, modal)
- Minimal, crisp motion (`swift` ~200–240ms; `smooth` ~300–320ms), motion-safe
- Gold is the accent: CTA fill, focus, micro-highlights only

## Tokens & Utilities

- Colors, radii, shadows, motion live in `@hive/tokens` and are consumed via Tailwind preset
- Utilities (added in `packages/ui/src/styles.css`)
  - `focus-gold`: unified focus ring across focusable UI
  - `surface-glass`: frosted elevated surface; combine with `no-glass` on a parent to disable
  - Density toggles: `density-compact|default|spacious` (applied at container level for previews)
  - Preview toggles: `high-contrast` and `reduce-motion` classes applied by Storybook toolbar

### MotionConfig (optional, app-level)

If you adopt Framer Motion in apps, map our tokens to MotionConfig so CSS and JS animations feel identical:

```tsx
import { MotionConfig } from 'framer-motion';

const swift = { duration: 0.2, ease: [0.32, 0.72, 0, 1] };
const smooth = { duration: 0.3, ease: [0.2, 0, 0, 1] };

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={swift}
    >
      {children}
    </MotionConfig>
  );
}
```

## Components

- Buttons: variants `brand|secondary|outline|ghost|destructive`; sizes `sm|md|lg|icon`; optional `isLoading`
- Button density (independent of size): `compact|default|spacious` adjusts horizontal padding without changing height
- Inputs/Select/Textarea: `rounded-input`, thin border, glass bg, gold focus; muted placeholders
- Overlays (Dialog/Sheet/Menu/Command): `surface-glass`, 1px border, `shadow-level2`, motion-safe
- Tabs: pill list; active = filled pill; quiet hover

## Storybook Contract

- Toolbar: theme (dark/light), density (compact/default/spacious), glass (on/off)
- Additional toggles: reduced motion and high contrast to preview accessibility modes
- “States” coverage for atoms and overlays
- A “Foundation Demo” page to validate the aesthetic holistically

## Gold Guardrails

- Do: primary CTA fill, focus rings, small icon highlights
- Don’t: large gold backgrounds, gold body text, gold dividers

## Adoption

- Import `@hive/ui/src/styles.css` once in the app root
- Prefer primitives from `@hive/ui` over ad-hoc Tailwind
- For elevated surfaces, use `surface-glass` and proper elevation tokens

### High-contrast (app-level)

To enable high-contrast globally in an app, toggle the `high-contrast` class on the root element. Tokens in `@hive/tokens/styles.css` include an overlay for both dark and light themes.

```tsx
// app/layout.tsx (Next.js example)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const highContrast = false; // read from user settings
  return (
    <html className={highContrast ? "high-contrast" : undefined}>
      <body>{children}</body>
    </html>
  );
}
```
