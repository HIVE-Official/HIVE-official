# Storybook & A11y Checklist

Status: Source of truth
Owner: Design System Guild
Last updated: 2025-10-14

## Required for every interactive component
- “States” story includes hover, focus, active, disabled, loading, error
- A11y story exercises keyboard-only usage and screen reader labels
- All dials validated: density, elevation, glass, stroke, contrast
- No raw hex; use token classes (e.g., `bg-card`, `text-foreground`)
- Focus rings use `.focus-ring`; transitions use `.interactive`
- SSR-safe (no `window` outside `useEffect`)

## Layout/Pattern stories
- Landmarks present (`header`, `nav`, `main`, `aside`, `footer` as appropriate)
- `aria-current="page"` applied on active nav items
- Works at 320px width and respects safe areas
- Motion is purposeful; reduced motion respected if applicable

## Verification steps
- `pnpm --filter @hive/ui storybook`
- Inspect tokens via dev tools; verify role colors match in `styles.css`
- Quick tab order test; screen reader label sanity pass
- Token lint: `pnpm lint:tokens` (no raw hex in TSX)
- Import guard: `pnpm lint:ui-imports` (prefer `@/atoms` over `@/components/ui`)
