# /uimode — UX & UI Mode

`AGENTS.md /uimode` boots this mode when a slice is primarily visual or interaction-heavy. Use it to align Storybook-first implementation work with Hive’s trust-visible UX baseline.

## Start Sequence
1. **Sync Canonical Docs** — Re-read `AGENTS.md`, `UI_GUIDELINES.md`, `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`, and the relevant design brief/wireframe spec, noting any drift in the standup log.
2. **Prep Tooling** — Run `pnpm install` if dependencies changed, then launch design surfaces:
   - `pnpm --filter @hive/ui storybook` for component work.
   - `pnpm dev:e2e` to mirror real flows against the fake API.
3. **Kick Off Checks** — Enable reduced-motion/contrast emulation in browsers, start `pnpm lint:tokens`, and plan to finish with `pnpm test:e2e`, `pnpm typecheck`, `pnpm lint`, and `pnpm build`.

## Visual Design
- Establish hierarchy via layout, scale, and tone from `UI_GUIDELINES.md`; lead with gold accents only for core CTAs.
- Use the approved palette (`HIVE_BRAND_DESIGN_PERSONA.md`) and Tailwind semantic tokens—no orphan hex codes.
- Apply typography scales/line heights defined in `packages/ui/src/brand/brand.css` for clarity and emphasis.
- Maintain WCAG 2.1 AA+ contrast with tokenized colors; verify in Storybook accessibility tab before wiring screens.

## Interaction Design
- Follow the Spaces IA spec for navigation labels, Dock behavior, and CTA placement; never invent new flows without matching backend contracts.
- Prefer `@hive/ui` primitives (buttons, sheets, tabs, carousels) and extend them inside `packages/ui` when gaps appear.
- Prototype animations/motion in Storybook, reusing brand-easing utilities; keep transitions purposeful and cancelable.
- Ensure responsive behavior across breakpoints using CSS Grid/Flex plus the mobile-first strategy baked into `UI_GUIDELINES.md`.

## Accessibility
- Compose semantic HTML with ARIA only when necessary; every interactive element must be keyboard reachable.
- Provide descriptive alt text/captions for media and wire reduced-motion fallbacks for any Framer motion.
- Use focus-ring utilities, enforce ≥44px touch targets, and validate through `docs/templates/a11y-motion-checklist.md`.
- Run Playwright/Storybook accessibility scans (`pnpm test:e2e`) before shipping.

## Performance Optimization
- Optimize imagery via `next/image` with `srcset` + `sizes`; deliver icons as SVG sprites or components.
- Lazy load non-critical surfaces (Dock panels, experiment cards) and split bundles with Next.js route groups/layout segments.
- Track Core Web Vitals in dev tools and follow `README.md` telemetry guidance when regressions appear.

## User Feedback
- Instrument clear loading, success, and error states using `@hive/ui` indicators/spinners; avoid silent failures.
- Surface inline validation and recovery actions (retry, contact support) tied to fake-API responses in `apps/e2e`.
- Wire analytics or heatmap hooks documented in `TODO.md` / specs to observe real usage.

## Information Architecture
- Organize content per `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`, using consistent labeling and categories.
- Keep search/filter affordances obvious, and document sitemap updates via `docs/templates/wireframe-spec.md`.
- Sync fake DB fixtures (`apps/e2e/src/server/fake-db.ts`) so Storybook/e2e match the intended hierarchy.

## Mobile-First Design
- Design from the smallest breakpoint upward, prioritizing the most actionable information for students.
- Respect thumb-zone ergonomics and include gesture affordances (swipe, drag) only when mirrored in docs/specs.
- Validate on physical devices or simulators after responsive DevTools passes.

## Consistency
- Update or extend `@hive/ui` components instead of ad-hoc styling; document new tokens/components in `DESIGN_SYSTEM_ARCHITECTURE.md`.
- Keep copy consistent with existing terminology (Dock, Spaces, Campus Graph) and ensure flag names mirror UI labels.

## Testing & Iteration
- Capture new behavior in Storybook stories (default, loading, error, empty, reduced-motion).
- When debating experiences, ship experiment cards (`docs/templates/experiment-card.md`) and guard with feature flags in `apps/web/src/server/flags.ts`.
- Gather qualitative feedback via usability sessions and log findings plus next steps in the standup log/design brief.

## Documentation
- Update `UI_GUIDELINES.md` when adding motion, typography, or spacing primitives.
- Store design briefs/wireframes under `docs/design/briefs/` and link assets/screens to the relevant Storybook stories.
- Keep assets organized in `public/` and component notes in `packages/ui`.

## Responsive Layouts & Media
- Use relative units (rem/em/%) for sizing; rely on CSS Grid + Flex for fluidity.
- Define breakpoints via the shared Tailwind config and mirror them in Framer prototypes.
- Make embeds/iframes responsive with utility classes from `packages/ui/src/styles.css`; lazy load videos where possible.

## Typography
- Use rem-based modular scales, adjusting line-height and letter-spacing for narrow viewports.
- Document any new typographic pairings or weights in the brand CSS and Storybook typography stories.

## Touch Targets
- Guarantee ≥44x44px hit areas with adequate spacing between interactive elements.
- Provide hover, focus, and pressed states for both pointer and touch interactions.

## Content Prioritization & Navigation
- Lead with critical student information (events today, invites, safety notices) and progressively disclose secondary data.
- Implement off-canvas or sheet patterns for non-critical panels on small screens; ensure keyboard/screen-reader access.
- Consider sticky headers or Dock elements when they improve navigation clarity without obscuring content.

## Forms
- Choose input types that match context (`email`, `tel`, `datetime-local`) and auto-capitalize judiciously.
- Provide inline validation, descriptive error copy, and success confirmations tied to fake-API behavior.
- Support autofill and mobile-specific optimizations (inputmode, enterkeyhint).

## Continuous Testing
- Test responsive states across Chrome, Safari, Firefox, and mobile browsers; note any browser-specific hacks in code comments.
- Run usability tests or heuristic reviews post-launch; feed learnings back into Storybook fixtures/tests.

## References
- `AGENTS.md`
- `docs/agents/README.md`
- `UI_GUIDELINES.md`
- `HIVE_BRAND_DESIGN_PERSONA.md`
- `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`
- `docs/templates/a11y-motion-checklist.md`
- `docs/templates/design-brief.md`
- `docs/templates/wireframe-spec.md`
- `docs/templates/experiment-card.md`
- `docs/ux/THIRD_PARTY_UI_POLICY.md`
