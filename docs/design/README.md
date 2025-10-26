# UI/UX Design — Index & Workflow

Status: Source of truth
Owner: Design System Guild
Last updated: 2025-10-14

This index consolidates how we plan, document, and validate UI/UX. Start with the canonical UI guidelines below for brand, tokens, dials, motion, and wiring.

- Canonical UI Guidelines: UI_GUIDELINES.md:1

## Information Architecture

1) Foundations (Why and tokens)
- Roles, tokens, and dials: `packages/ui/src/styles.css`, `packages/ui/tailwind.config.ts`
- Brand and classnames: `packages/ui/src/brand/brand.css`, `packages/ui/src/brand/classnames.ts`
- References: docs/design/FOUNDATION.md, docs/design/FOUNDATION_SUMMARY.md, docs/design/UI_DESIGN_PSYCHOLOGY_FOUNDATION.md, docs/design/ICONOGRAPHY_ELEVATION_GLASS.md

2) Components (What)
- Atomic structure lives under `packages/ui/src/{atoms|molecules|organisms}`
- Stories under `packages/ui/src/stories` are the living spec
- Planning templates: docs/design/templates/COMPONENT_SPEC_TEMPLATE.md

3) Patterns (How)
- App shell and navigation patterns use shadcn sidebar primitives
- Central nav config: `packages/ui/src/organisms/nav-config.ts`
- Planning templates: docs/design/templates/PATTERN_SPEC_TEMPLATE.md

4) Workflows & Checklists (Quality)
- Storybook and a11y: docs/design/STORYBOOK_CHECKLIST.md
- Atomic checklist: docs/design/ATOMIC_DESIGN_CHECKLIST.md
- Weekly audit: docs/design/WEEKLY_AUDIT_CHECKLIST.md
- Atoms coverage: docs/design/ATOMS_COVERAGE.md
- Full coverage matrix: docs/design/UI_COVERAGE_MATRIX.md
- Shadcn catalog: docs/design/SHADCN_CATALOG.md
- Interaction contracts: docs/design/INTERACTION_CONTRACTS.md
- Decisions index: docs/design/decisions/0001-app-shell-sidebar07.md

5) Decisions & Roadmap (Direction)
- Decisions log: docs/design/DESIGN_DECISIONS_LOG.md
- Current roadmap: docs/design/ROADMAP_UI_UX_CLEANUP.md

## Planning Workflow (Minimal, repeatable)

1) Create a brief
- Use docs/design/templates/PLANNING_BRIEF_TEMPLATE.md
- Capture problem, users, outcomes, constraints, and success metrics

2) Choose scope
- Component → use COMPONENT_SPEC_TEMPLATE
- Pattern/App shell → use PATTERN_SPEC_TEMPLATE

3) Prove it in Storybook
- Add or update stories in `packages/ui/src/stories`
- Validate with docs/design/STORYBOOK_CHECKLIST.md and tokens/dials

4) Wire it in app(s)
- For web, compose in `apps/web/src/app/**`, using `SidebarProvider` and nav-config

5) Record decisions
- Append notable decisions to docs/design/DESIGN_DECISIONS_LOG.md with Status/Owner/Date

## Doc Hygiene Rules

- Every new doc starts with: Status, Owner, Last updated
- Prefer links to canonical files instead of duplicating content
- If a doc becomes outdated, add “Status: Archived” at the top and link to the replacement
- Keep long-form references in `docs/`; keep runnable examples in Storybook

## Quick Links

- Storybook (local): `pnpm --filter @hive/ui storybook`
- Tailwind tokens entry: `packages/ui/src/styles.css`
- App shell examples: `packages/ui/src/stories/Layouts.Sidebar07.stories.tsx`, `packages/ui/src/stories/Layouts.HiveSidebar.stories.tsx`
- Nav config (do not hardcode nav): `packages/ui/src/organisms/nav-config.ts`
