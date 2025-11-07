HIVE UX/UI Playbook

Purpose
- Establish shared design principles, workflows, and component standards.
- Accelerate iteration with a reliable system: tokens → patterns → screens.

Principles
- Clarity first: single, obvious next step per view.
- Motion for meaning: transitions communicate hierarchy and state.
- Gen‑Z energy without clutter: bold, minimal, precise.
- Privacy by default: every social surface has a visibility affordance.

Architecture
- Tokens: brand, spacing, motion, radii from `@hive/tokens` (surfaced via CSS vars).
- Components: atoms/molecules/organisms in `@hive/ui` compiled for web.
- Patterns: page skeletons (feed, profile, onboarding) as reference compositions.

Playgrounds
- Design System: /design-system — tokens, buttons, cards, form fields.
- UX Sandboxes: /ux — Onboarding and Profile composition sandboxes.

Workflow
- Explore in sandboxes → Snapshot decisions → Promote to screens.
- Add Storybook stories when stabilizing patterns for re‑use.
- Keep copy inlined during exploration; extract to i18n only when stabilizing.

Handoff
- Annotate UI states (idle, loading, error, empty).
- Include acceptance criteria with transitions (e.g. toast, skeleton, disabled states).
- Provide responsive breakpoints screenshots (mobile/desktop) for each new pattern.

How to add a new UX sandbox
1) Create an app route under `apps/web/src/app/ux/<feature>/page.tsx` with "use client".
2) Compose with `@hive/ui` primitives (HiveCard, Button, Input, Badge, Skeleton).
3) Reference tokens via CSS variables for fast theming.
4) Keep data mocked until API contracts are finalized.

Naming Conventions
- Components: Hive[Component] (e.g., HiveCard, Button).
- Variants: brand|default|secondary|ghost|outline|success|warning|destructive|link.
- Tokens: `--hive-…` CSS custom properties.

Review Checklist
- Accessibility: focus states, readable contrast, reduced motion friendly.
- Performance: meaningful skeletons, lazy loading heavy blocks.
- Internationalization: labels fit typical expansion (EN→DE ≈ 1.3x).
- Mobile first: targets ≥ 44px, safe area padding.

