Status: Living
Owner: Design System Guild

# Polish Lab — Motion, Gradients (Neutral), Layout-Shift Patterns

Purpose
- Explore “fancy” patterns safely, on-brand. All examples are token-driven, neutral-only (no color tints) and respect reduced motion.

Run
- `pnpm --filter @hive/ui storybook` then open the Polish section:
  - Polish/Motion Patterns
  - Polish/Gradients (Neutral)
  - Polish/Layout Shift Patterns

Automated Tests (Playwright)
- Start Storybook: `pnpm --filter @hive/ui storybook`
- In another terminal, run: `SB_URL=http://localhost:6006 pnpm dlx playwright test -c packages/ui/playwright.config.ts`
- What’s covered:
  - Marquee animates by default and is disabled with reduced motion
  - Entry/exit classes avoid layout properties in transitions
  - CLS is ~0 for no‑shift patterns (PerformanceObserver)

Guardrails
- Gold is reserved for CTA/focus (#FFD700). No gold gradients or tinted surfaces.
- Neutrals only for backgrounds/overlays: foreground with alpha; no colored tints.
- Animations use transform/opacity only; reduced motion disables non-essential animation.
- No layout shift: reserve space, skeleton matches final layout, sticky headers as needed.

File Anchors
- Utilities: `packages/ui/src/styles.css:1` (grad-neutral-* classes, motion classes)
- Stories: `packages/ui/src/stories/polish/*`

Adoption
- Copy patterns into feature stories first; promote to components if needed.
- If you need a new utility, add it to `@hive/ui` (not per-app) and keep it neutral/tokenized.
