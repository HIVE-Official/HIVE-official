Status: Source of Truth
Owner: Design System Guild

# Patterns Library — Always Pull From Here

Purpose
- Curated, brand-safe recipes you can import anywhere. Neutral-only overlays, zero-layout-shift containers, sticky affordances, and dev-only overlays. Gold stays CTA/focus only (#FFD700).

Import
```tsx
import {
  Spotlight,
  NoShiftBox,
  StickyContainer,
  BaselineGridOverlay
} from "@hive/ui";
```

Components
- Spotlight: neutral background wash (radial/vertical/horizontal). No color tints.
- NoShiftBox: preserves aspect-ratio; optional skeleton; avoids layout shifts.
- StickyContainer: scroll container with sticky header + backdrop blur.
- BaselineGridOverlay: 8px grid overlay for alignment checks (dev only).
 - Marquee: brand-safe horizontal content marquee (neutral, reduced-motion safe).
 - BentoGrid/BentoItem: responsive card grid with span controls (neutral, layout-only).
 - NeutralBorderBox: neutral gradient border container (no color tint).

Brand Guardrails
- Gold: CTA/focus only (#FFD700). No gradients/shades.
- Neutrals: grayscale only for surfaces/overlays/gradients.
- Motion: transform/opacity; reduced-motion disables non-essential animation.

Stories
- `Patterns/Library` — examples of all components
- `Polish/*` — motion, neutral gradients, layout-shift patterns

Contributing
- Add new patterns under `packages/ui/src/patterns/**` with stories and docs.
- Keep props small and generic; prefer composition over theme overrides.
- Never import third-party UI in apps — wrap patterns in `@hive/ui` first.
