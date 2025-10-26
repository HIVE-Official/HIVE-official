<!-- Bounded Context Owner: Design System Guild -->
# HIVE Iconography, Elevation & Glass Systems

This reference captures the guardrails and implementation details for two of the core experiential systems in HIVE's design language: iconography and the elevation/glass depth model. Treat this file as the actionable contract for Storybook work, token updates, and downstream app implementation.

## Iconography System

### Objectives

- Express a premium, confident voice that balances academic formality with approachable social cues.
- Maintain legibility across densities (cozy, comfy, airy) and themes (dark, high-contrast).
- Keep the footprint lightweight so icons can ship with React Server Components and remain bundle-efficient.

### Source of Truth

- **Primary library:** [`lucide-react`](https://lucide.dev/) (stroke-based icons). Pin updates via `pnpm up lucide-react` and review deltas in Storybook before publishing.
- **Custom glyphs:** When Lucide does not cover a concept, add a dedicated SVG in `packages/ui/src/icons/` (create the folder if required) using a `24x24` viewport and the shared style rules below. Export through a single index for tree-shaking.
- **Storybook coverage:** Every atom or molecule that accepts `startIcon`, `endIcon`, `leadingIcon`, or `trailingIcon` props must have at least one story variant that renders the icon at runtime so regressions are visible.

### Visual Language

- **Stroke weight:** 1.5px baseline. If Lucide provides only 2.0px variants, rework the SVG to 1.5px to avoid visual heaviness.
- **Corners:** Rounded joins and caps (`stroke-linecap="round"`, `stroke-linejoin="round"`) to match the 20px radius system.
- **Detail level:** Avoid micro-internal cutouts thinner than 1.5px; keep silhouettes simple for 16px rendering.
- **Fill usage:** Strokes first. If a filled icon is mandatory (e.g., verification badge), constrain fills to <=70% of the bounding box and provide an outline-only companion to maintain consistency with the rest of the system.

### Size Scale & Placement

| Size | px | Typical Usage | Notes |
| --- | --- | --- | --- |
| `xs` | 16 | Dense tables, secondary controls, inline status badges | Ensure tap target is >=40x40 using padding, not icon size. |
| `sm` | 20 | Buttons (`md` height), navigation lists, tool cards | Default size for `@hive/ui` button `leadingIcon/trailingIcon`. |
| `md` | 24 | Primary navigation, onboarding tiles, hero stats | Use when text is >=18px or the icon stands alone. |
| `lg` | 32 | Dashboard hero moments, illustrative empty states | Limit to feature surfaces; pair with copy to preserve clarity. |

Implementations should use Tailwind utilities (`h-4 w-4`, `h-5 w-5`, `h-6 w-6`, etc.) so tokens can swap sizes centrally.

### Color & Layering

- **Default:** inherit `currentColor` so icons follow component text color.
- **Muted states:** apply `text-muted-foreground` or `text-neutral-400` via utility classes instead of embedding color in SVGs.
- **Status colors:** only apply brand/status tokens (gold/success/warning/error/info) when reinforcing state. Never mix multiple brand colors inside one icon.
- **Glass surfaces:** When icons live on `surface-glass` elements, ensure sufficient contrast by using semantic text tokens rather than raw hex values.

### Motion & Interaction

- Icon choreography hooks live in `packages/ui/src/utils/motion.ts`. Use the `iconMotion` prop (values: `auto`, `push`, `pop`, `rotate`, `bounce`, `none`) when rendering icons in `<Button />`. Hover motion classes are defined in `packages/ui/src/styles.css` (`.icon-motion-pop`, `.icon-motion-rotate`, `.icon-motion-bounce`).
- Reserve kinetic motion (`rotate`, `bounce`) for high-attention actions (share, refresh). Default to `auto` or `push` for calm UI.
- Respect reduced motion: the utility stylesheet disables icon transforms under `prefers-reduced-motion`.

### Accessibility

- Decorative icons must include `aria-hidden="true"` (this is injected automatically in `<Button />` when the icon is a valid React element).
- Icon-only controls require an explicit `aria-label` or an adjacent `aria-labelledby` element. The button atom warns in development if the label is missing.
- Touch targets: wrap the icon in a control that meets our 40x40 minimum, even if the SVG is 16px.
- Ensure focus styles rely on the container's focus ring utilities, not the SVG itself.

### Contribution Workflow

1. **Pitch:** Create or update a Storybook entry (under `Foundation / Iconography`) that demonstrates the new icon in context. Include rationale and target usage.
2. **Source:** Add or adjust the SVG following the visual rules. For Lucide contributions, upstream the request to Lucide first; only fork locally if blocked.
3. **Review:** Run `pnpm lint --filter @hive/ui` to catch unused exports and `pnpm storybook --filter @hive/ui` to preview.
4. **Document:** Update this file (and any relevant product specs) with the new icon's contract if it introduces a new category or exception.

## Elevation & Glass System

### Goals

- Provide a disciplined depth hierarchy that focuses attention without overwhelming the monochrome palette.
- Reinforce affordance on interactive elements while preserving a calm, premium aesthetic.
- Satisfy accessibility and performance needs across desktop and constrained mobile GPUs.

### Token Stack

- **Shadows:** Defined in `packages/tokens/src/tokens.ts` and surfaced through Tailwind as `shadow-level1`, `shadow-level2`, `shadow-subtle`, and `shadow-glow`.
- **Backdrop tokens:** Utility class `.surface-glass` in `packages/ui/src/styles.css` applies `background-color: hsl(var(--card) / 0.95)` with `backdrop-blur-md` and the level 2 shadow.
- **State layers:** `.state-layer` overlays (same file) provide hover/active feedback without relying on additional shadow changes.
- **Toggles:** `.no-glass` removes the blur/alpha for high-contrast scenarios, while `.glass-on` amplifies the effect for demos, layering `shadow-glow` and stronger blur. Storybook exposes both toggles.
- **Storybook reference:** The canonical depth showcase lives in `packages/ui/src/stories/Foundation.DepthSystem.stories.tsx` (Storybook title `Foundation/Depth System`).

### Depth Ladder

| Level | Token/Class | Primary Usage | Notes |
| --- | --- | --- | --- |
| Base | `shadow-none` / no blur | Page background, neutral sections | Flat by default; rely on borders for separation. |
| Soft | `shadow-level1` | Cards, list rows, raised buttons | Combine with slight translateY hover for interactive affordance. |
| Medium | `shadow-level2` + `.surface-glass` | Dialogs, sheets, floating panels | Always pair with a 1px border to maintain contrast in dark mode. |
| Glow | `shadow-glow` (opt-in) | Premium callouts, hero stats | Use sparingly and only with brand-approved moments. |

### Application Guidelines

- **Cards & Panels:** Default to `shadow-level1`. Promote to `.surface-glass` only when the card sits over media or needs to visually separate from stacked content.
- **Overlays (Dialog, Sheet, Command):** Use the existing implementations in `packages/ui/src/molecules/dialog.tsx` and `packages/ui/src/molecules/sheet.tsx` which already apply `.surface-glass`.
- **Navigation Shells:** Keep app chrome flat; rely on borders and glass gradients in header/rail sections per `docs/design/FOUNDATION.md`.
- **Hover/Active States:** Prefer state layers or micro-transforms over increasing shadow depth to avoid blur buildup.
- **Light Mode:** When we introduce the light theme, reuse the same class names but adjust the underlying tokens (lighter shadow color, lower blur) via `@hive/tokens`. Avoid hard-coded hex overrides.

### Performance & Accessibility

- Backdrop blur can drop frames on low-powered devices. Provide a `Reduce Effects` toggle in app settings that maps to the `.no-glass` class on the document root.
- Ensure contrast ratios remain >=3:1 between foreground text and the blurred background; verify using Storybook high-contrast mode.
- For large scrollable surfaces (e.g., feed columns), avoid applying `.surface-glass` to the entire scroll container; wrap only the cards that need the treatment.

### QA Checklist

- Run `pnpm storybook --filter @hive/ui` and inspect the "Foundation / Depth System" story. Add new stories if coverage is missing.
- Capture before/after screenshots in both default and high-contrast toggles for designer review.
- Validate that Tailwind classes map to tokens by running `pnpm lint --filter @hive/ui` (flags unknown utilities) and `pnpm typecheck --filter @hive/ui` if new components are wired.

### Change Management

- All elevation/glass token changes require sign-off from the Design System Guild and the Accessibility SME. Record decisions in `docs/design/FOUNDATION.md` under the "Tokens & Utilities" section.
- When shipping a new blur or shadow value, add visual regression tests (Percy or Playwright screenshot) if the component already has automated coverage.
- Keep motion updates in sync: if a new depth level introduces lift/drop animations, update `packages/ui/src/utils/motion.ts` and document the choreography in Storybook.
