Status: Source of truth
Owner: Design System Guild
Last updated: 2025-10-23

# HIVE UI Guidelines — Brand North Star, Design Dials, Tokens, Motion, Tailwind + Framer

Purpose
- Single UI reference for humans and AI. Covers brand guardrails, design dials, token usage, motion grammar, and wiring for Tailwind and Framer Motion. Links out to deeper docs only when needed.

Scope
- Applies to all HIVE front‑end surfaces (apps/web, apps/admin, @hive/ui). When in doubt, defer to this file.

Vocabulary
- Dock (Spaces): the right-side context area for widgets and quick actions in a Space. Use “Dock” in all copy and docs. “Rail” is a legacy term; keep only in code identifiers until migrated.
- Sidebar: the left navigation area. May have a condensed “rail mode” when collapsed — do not confuse with the Spaces Dock.
- Dock content vs widgets: Prefer “content panels” when depth is needed (e.g., multi-item events list, richer members slice). Reserve "widgets" for light, actionable previews.

Brand North Star
- Student‑Owned, Tech‑Sleek, Trust‑Visible, Living Platform.
- Gold is the accent: CTA fill, focus ring, and small highlights only. Never body text or large surfaces.
- Calm core, wild edges: neutral base, precise interactions, fast paths to action.

Design Dials (defaults)
- Radius: XL (20px) • Card L (16px), Button M (12px)
- Elevation: Soft for cards, Medium for overlays
- Density: Comfy (container gap 24px); Compact for tables, Spacious for marketing
- Contrast: High (AA+); provide High‑Contrast preview toggle
- Glass: Subtle on overlays/panels; avoid on long scroll surfaces
- Stroke: Hairline borders by default (1px); use stronger strokes only for emphasis
- Motion: Minimal by default; reduced‑motion respected globally

Token Spec & Usage
- Use semantic roles via Tailwind utilities derived from tokens. Never hard-code hex values in components.
- Core roles (dark-first): `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border`, `ring`, `primary`/`primary-foreground`, `accent`/`accent-foreground`, `success|warning|danger|info`.
- Brand accent: gold derives from `--ring`/`--primary` tokens; reserve for CTA and focus.
- File anchors:
  - packages/ui/src/styles.css:1 (token import and utilities)
  - packages/ui/tailwind.config.ts:1 (preset + theme wiring)
  - packages/ui/src/brand/brand.css:1 (brand token extensions)
- Rules for AI/codegen:
  - Use `bg-card text-foreground border` for surfaces; `shadow-level1` for interactive cards.
  - Use `.focus-ring` (alias `.focus-gold`) for focus states; avoid custom outlines.
  - Prefer role utilities (`text-body`, `text-caption`) instead of raw `text-sm` when available.

Typography System (Geist Sans first)
- Font stack lives in `packages/ui/src/brand/tokens.ts:32` and `packages/ui/src/brand/brand.css:1`; always load Geist Sans/Inter fallback via `@hive/ui/src/styles.css`.
- Type scale maps to semantic tokens; never encode raw pixel sizes. Use the semantic helpers from `@hive/ui` (`<Text variant="heading">`, `text-title`, `text-body`, etc.) so responsive line heights apply automatically.
- Canonical roles:
  - **Display / Hero (`--type-900`, `.text-display`)** — product hero moments, Dock headlines. Pair with `--line-height-tight`.
  - **Page Heading (`--type-800`, `.text-heading`)** — route titles, modal headers. Default to `line-height-tight`; tighten only when ≤2 lines.
  - **Section Title (`--type-700`, `.text-title`)** — cards, panels, tab labels. `line-height-compact`.
  - **Body / UI Copy (`--type-400`, `.text-body`)** — paragraphs, post copy, long-form metadata. `line-height-default`.
  - **Supporting / Meta (`--type-300`, `.text-caption`, `.text-mono`)** — timestamps, badge text, captions. Always ensure ≥4.5:1 contrast.
  - **Numerics / Metrics** — prefer `.text-mono` with `weight-semibold` for stats to reinforce trust.
- Weight rules: use `semibold` (600) for headings, `medium` (500) for labels/CTAs, `regular` (400) for body copy. Only use `bold` (700) for emphasis paired with gold accents or keyline treatments.
- Tracking & casing: Title Case for navigation, Sentence case for body copy; uppercase only for badges ≤10 chars.
- Enforcement artifacts: `packages/ui/src/atoms/typography.tsx`, `pnpm lint:tokens`, Storybook typography stories (`pnpm --filter @hive/ui storybook`) must show every role in light/dark and high-contrast.

Motion Grammar (CSS classes + tokens)
- Durations (tokens): swift ≈ 200–240ms, smooth ≈ 300–320ms, rapid ≈ 120–160ms.
- Easings (tokens): standard, entrance, exit. Respect `prefers-reduced-motion`.
- Ready-made classes (compose with components):
  - Entry/exit: `enter-fade`, `enter-slide-up|down|left|right`, `exit-fade`, `exit-fade-up|down`, `enter-panel-*`, `exit-panel-*`
  - Micro-interactions: `interactive`, `interactive-lift`, `pressable`, `.btn-anim-icons` with `icon-motion-{pop|rotate|bounce}`
  - Signature Hive motions (see Storybook `Foundation/Motion Signatures`):
    - `motion-ritual` + `.motion-ritual-media` — parallax hover/press for Ritual or hero cards.
    - `enter-dock-panel` + `.dock-keyline` — Dock slide-in with gold keyline reveal; pair with `exit-dock-panel` for dismissal.
    - `press-gold` — CTA press ripple layered on `.btn-prominent`.
    - `status-pulse` — anticipatory chips for “Coming soon” / “Seats left”.
    - Tabs indicator spring — built into `TabsList` via Framer Motion (stiffness 280, damping 30); no custom ink-bar animation needed.
- File anchors:
  - packages/ui/src/styles.css:1 (keyframes, motion utilities, reduced-motion guards)
  - packages/ui/src/stories/Motion.Signatures.stories.tsx:1 (visual reference)
- Storybook tip: use the “Reduced Motion” toolbar control (auto/off/on) if your OS setting suppresses the demo animations.
- Staggered text: use `TextAnimate` (`packages/ui/src/motion/text-animate.tsx`, Storybook “Motion/TextAnimate”) for 0.3 s / 0.05 s staggered entrances instead of hand-rolled variants; it respects reduced-motion automatically.

Motion Grid

| Token / pattern | Numeric spec | Source / usage |
| --- | --- | --- |
| Hover tilt translate | ±10 px | Aceternity Skeleton hover variants (`motion-ritual`) |
| Hover tilt rotation | ±5 ° | Aceternity Skeleton hover variants |
| Hover tilt duration | 0.2 s | Framer Motion transition |
| Skeleton grow | 0.2 s | SkeletonTwo initial animation |
| Skeleton sweep | 2 s | SkeletonTwo hover animation |
| Gradient drift | 12 s | Tailwind `gradient-x` |
| Border run | 3 s | Tailwind `border-run` |
| Float cycle | 6 s | Tailwind `float` |
| Shine sweep | 1.25 s | Tailwind `shine` |
| Marquee duration | `var(--marquee-duration)` (default 12 s) | Tailwind `marquee` |
| Meteor delay window | 0.2–1.2 s | Magic UI Meteors props |
| Meteor duration window | 2–10 s (default 5 s) | Magic UI Meteors props |
| Meteor angle | 215 ° | Magic UI Meteors props |
| Text item duration | 0.3 s | Magic UI TextAnimate |
| Text stagger | 0.05 s | Magic UI TextAnimate |
| Spring SM | stiffness 340 / damping 28 / mass 0.9 | Magic UI presets |
| Spring MD | stiffness 280 / damping 30 / mass 1.0 | Magic UI presets |
| Spring LG | stiffness 220 / damping 28 / mass 1.2 | Magic UI presets |

Framer Motion Wiring (match CSS tokens)
```tsx
import { MotionConfig } from 'framer-motion'

const swift = { duration: 0.22, ease: [0.32, 0.72, 0, 1] }
const smooth = { duration: 0.32, ease: [0.2, 0, 0, 1] }

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={swift}>
      {children}
    </MotionConfig>
  )
}
```
- Use CSS for most transitions; reserve Framer for choreography and conditional mounts. Keep reduced‑motion behavior consistent.

Tailwind Wiring (apps and packages)
- Consumers must import the shared stylesheet once at app root: `@hive/ui/src/styles.css`.
- The design system uses a preset from tokens and standard plugins.
- Reference config: packages/ui/tailwind.config.ts:1
  - `presets: [@hive/tokens/tailwind]`
  - `plugins: [tailwindcss-animate, @tailwindcss/forms]`

Brand Color System — Gold / Black / White
- Palette tokens live in `packages/ui/src/brand/tokens.ts:73` and `packages/ui/src/brand/brand.css:37`. Only use:
  - `#FFD700` (`--hive-gold`, `.text-gold`, `.btn-prominent`) for CTAs, focus rings, and celebratory chips.
  - `#050505` (`--foreground`, `.text-foreground`) for typography and outlines.
  - `#FFFFFF` (`--background`) for primary surfaces. Grays derive from black/white HSL mixes; never introduce tinted grays.
- Gold guardrails:
  - Do: fill primary CTAs, `.focus-ring`, inline icon highlights, capacity/status chips when actionable.
  - Don’t: paragraph text, full-page backgrounds, table rows, or passive icons.
  - Maintain AA contrast by pairing gold surfaces with black text (`--primary-foreground: 0 0% 10%`). In dark mode, keep gold luminous but surround with matte black to avoid bloom.
- Neutral application:
  - Light mode roles: `--background: 0 0% 100%`, `--foreground: 0 0% 5%`, `--border: 0 0% 84%`.
  - Dark mode roles: `--background: 0 0% 0%`, `--foreground: 0 0% 96%`, `--border: 0 0% 18%`.
  - Secondary/Accent remain neutral grays so gold stays scarce; use `.keyline-gold-*` sparingly.
- Verification: `pnpm lint:tokens` blocks raw hex; Storybook themes (`brand-hive`, `brand-hive.dark`) must display CTA/focus states in both modes before merge.

Visual Design System (2025 baseline)
- Hierarchy: hero display → page heading → section title → body → caption. Never skip levels; confirm in Storybook via `packages/ui/src/stories/Typography.stories.tsx`.
- Layout grid: 8pt rhythm with the spacing tokens above; container gaps default to 24px (Comfy dial). `packages/ui/src/stories/Foundation.StyleDials.stories.tsx` documents each density.
- Imagery: use `next/image` with tokenized radii and shadows; gold frames only for featured hero assets. Enforcement: design PR must include matching Storybook story + `pnpm lint:tokens`.
- Iconography: pull from `docs/design/ICONOGRAPHY_ELEVATION_GLASS.md` or `@hive/ui` icon set; wrap in `.text-muted-foreground` unless icon is actionable with gold focus.
- Verification artifact: Storybook visual regression suite (`pnpm --filter @hive/ui storybook` + Chromatic if enabled).
- Spotlight guidance: use `Spotlight` pattern (`packages/ui/src/patterns/spotlight.tsx`) for radial/vertical/horizontal washes and the new `cursor` variant when you need a pointer-follow highlight on hero CTAs; story lives under `Patterns/Library`.
- Meteor shimmer: when hero surfaces need motion, wrap them with the `MeteorShower` pattern (`packages/ui/src/patterns/meteor-shower.tsx`) instead of hand-animating background lines.

Interaction & Navigation Patterns
- Navigation labels, dock naming, and IA must match `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1` and `MOBILE_NAVIGATION_SPEC.md:1`. Never invent new routes without spec updates.
- Components: only ship navigation, CTA, and form primitives that exist inside `@hive/ui`; extend there first so apps inherit updates.
- Calls-to-action: each screen needs one primary gold CTA, one secondary neutral CTA max. Pair each CTA with analytics instrumentation noted in `TODO.md:1`.
- Responsive behaviors: menu collapses, drawers, and Dock reflow must be previewed in Storybook and exercised inside `apps/e2e` (`pnpm dev:e2e`).
- Motion: attach `.interactive`/`.enter-*` helpers for hover/focus/mount transitions; respect reduced motion by validating with `pnpm test:e2e --grep "a11y"` if configured. For feed anticipation, use the purpose-built utilities—`.anim-countdown-pulse`, `.anim-rsvp-nudge`, `.anim-jump-divider`, `.anim-live-ring`—instead of bespoke keyframes.
- Buttons: use the built-in status state machine (`status="loading|success|error"`) to animate spinners and icons; Storybook “Atoms/Button Status” showcases the behavior. Avoid hand-rolling loading morphs.
- Steppers: rely on `StepperHeader`’s built-in `.stepper-circle` and `.stepper-progress` animations for active/completed states instead of manually animating circles or rails.

Accessibility & Inclusive Patterns
- WCAG 2.2 AA+ minimum: 4.5:1 for body text, 3:1 for large titles. Confirm with tooling before merge.
- Keyboarding: `.focus-ring` on all interactives, logical tab order (sidebar → content → Dock). Document through `docs/templates/a11y-motion-checklist.md:1` whenever a new flow ships.
- Semantics: prefer HTML landmarks, `aria-live` for async operations, and `aria-describedby` tying inputs to helper/error text. Block PRs missing labels or alt text (lint: `pnpm lint` + `pnpm lint:tokens`).
- Assistive tech test: run the a11y+motion checklist and capture findings in the standup log; verify overlays trap focus inside Storybook A11y stories (e.g., `packages/ui/src/stories/Sheet.A11y.stories.tsx`).

Performance, Media & Core Web Vitals
- Assets: optimize via `next/image`, `next/font`, and `pnpm build` budgets described in `README.md:1`. Lazy-load Dock widgets, analytics panels, and any media beyond the first viewport.
- Code splitting: use Next.js route groups and dynamic imports; measure with `pnpm build` + `pnpm typecheck` before merging.
- Motion cost: prefer CSS transitions; only mount Framer Motion where choreography is required. Provide a `.no-glass` escape hatch on heavy blur surfaces.
- Monitoring: follow the telemetry instrumentation path in `README.md` and log regressions in `TODO.md`.

Feedback, Loading & Error States
- Every async action needs: deterministic loading indicator (`Spinner`, `Skeleton`, or inline shimmer), success toast/snackbar, and contextual error copy. Source components from `@hive/ui` Feedback stories.
- Inline validation: trigger on blur and on submit; errors describe recovery steps and tie back to inputs via `aria-describedby`. Use `.form-error-enter`, `.form-success-pop`, and chip enter/exit utilities rather than ad-hoc transitions.
- Exit states: use `.exit-fade`, `.exit-scale-down`, or `.exit-slide-down` for modals/toasts/cards instead of removing nodes abruptly. See Storybook “Motion/Exit”.
- Experiment and analytics hooks must follow `docs/templates/experiment-card.md:1` and the instrumentation notes in `TODO.md:1`.
- Verification: cover each state in Storybook (Loading/Empty/Error) plus Playwright flows inside `packages/ui` if visual regressions are critical.

Information Architecture & Content
- Mirror the Spaces spec for route labels, tabs, and Dock taxonomy (`docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1`). Update `docs/templates/wireframe-spec.md` artifacts when IA shifts.
- Copy: adopt the terminology list at the top of this file (Dock vs Sidebar). Reserve “student”, “Space”, “Tool” consistently.
- Search/sitemap: keep nav labels in sync with `README.md:1` onboarding map; update `apps/e2e` fake DB (`apps/e2e/src/server/fake-db.ts:1`) when new content groups appear.

Mobile-first, Fluid Layouts & Touch
- Breakpoints: design from `min-width: 320px` upward. Use CSS Grid/Flex with rem/% units per layout tokens; document responsive behavior in `packages/ui/src/stories/Layouts.*.stories.tsx`.
- Touch: 44px minimum hit areas, generous spacing between stacked CTAs/forms, and thumb-zone placement for floating actions (reference `MOBILE_NAVIGATION_SPEC.md:1`).
- Gestures: swipe, sheet, and FAB interactions must follow the gesture map in the mobile spec and include motion tokens + haptic cues where platform allows.
- Testing: run Safari/Chrome devtools responsive modes plus at least one physical device capture before demo; log in standup if not possible.

Testing & Iteration Workflow
- Required commands per slice: `pnpm lint`, `pnpm lint:tokens`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm --filter @hive/ui storybook`, and `pnpm dev:e2e`.
- A/B or experiments go through `docs/templates/experiment-card.md:1` plus feature flag entries in `apps/web/src/server/flags.ts:1`.
- Heatmaps / qualitative research summaries belong in the daily standup log + the relevant design brief under `docs/design/briefs/`.
- Never ship UI that lacks matching Storybook stories (all states) and an updated `docs/templates/a11y-motion-checklist.md`.

Verification
- Storybook: `pnpm --filter @hive/ui storybook` (validate dials: density, elevation, glass, contrast, motion).
- Token lint: ensure no raw hex in components; focus ring present on interactive elements.

Quick Examples
```tsx
// Card shell
<div className="bg-card border rounded-xl shadow-level1 state-layer interactive focus-ring">
  ...
</div>

// Primary CTA (gold)
<button className="btn-prominent rounded-md focus-ring btn-anim-icons">
  <span className="icon-leading icon-motion-pop">★</span>
  Join Space
  <span className="icon-trailing icon-motion-pop">→</span>
  </button>

// Overlay
<div className="surface-glass border rounded-xl shadow-level2 enter-panel-right">
  ...
</div>
```

Deep References (optional)
- Brand and logo: HIVE_TECH_SLEEK_BRANDING.md:1, LOGO_BRAND_GUIDELINES.md:1
- Iconography, elevation, glass: docs/design/ICONOGRAPHY_ELEVATION_GLASS.md:1
- UX psychology and patterns: docs/design/UI_DESIGN_PSYCHOLOGY_FOUNDATION.md:1
- CSS architecture: CSS-ARCHITECTURE.md:1
- Design system architecture: DESIGN_SYSTEM_ARCHITECTURE.md:1
 - Third‑party UI sourcing policy (shadcn/Aceternity/Magic): docs/ux/THIRD_PARTY_UI_POLICY.md:1
 - Polish Lab (motion, gradients, layout-shift): docs/ux/POLISH_LAB.md:1
  - Patterns Library (always pull from): docs/ux/PATTERNS_LIBRARY.md:1

AI Usage Notes
- Always prefer tokenized Tailwind classes over inline styles or hex values.
- Reserve gold for CTA/focus; keep surfaces neutral and text high‑contrast.
- Use provided motion classes; if composing with Framer, match durations/easings.
- Include the focus ring utility on all interactive components.
 - Source new components from shadcn/Aceternity/Magic UI only via `@hive/ui` wrappers; never import them directly into apps (see docs/ux/THIRD_PARTY_UI_POLICY.md:1).
- Hive Signature
- Focus ring: dual ring (1px black + 2px gold). Use `.focus-ring` on all interactives.
- Keyline: `.keyline-gold-top|bottom` for restrained gold accents in headers/sections.
- Headings: optional `.heading-underline-gold` for section titles (sparingly).
- Panels: `.panel-keyline` for subtle inner keyline; shadows use black-only presets `shadow-hive-1|2`.
