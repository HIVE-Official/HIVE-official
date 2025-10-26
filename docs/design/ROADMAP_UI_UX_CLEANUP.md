# UI/UX Cleanup Roadmap

Status: Active
Owner: Design System Guild
Last updated: 2025-10-14

## Phase 1 — Organize (now)
- Add docs index and planning templates (done)
- Add Storybook quality checklist (done)
- Declare doc hygiene (Status/Owner/Last updated) (done)

## Phase 2 — Normalize components
- Identify top 10 components used in app shell and onboarding
- Ensure each has: spec, states story, a11y story, token coverage
- Replace any hardcoded nav with `nav-config.ts`

## Phase 3 — Patterns and flows
- Lock the app shell using shadcn sidebar primitives; remove ad-hoc shells
- Validate mobile off-canvas sidebar and safe areas
- Define composer and feed item patterns with fixtures

## Phase 4 — Retire duplicates
- Fold overlapping Storybook scaffold docs into one canonical reference
- Archive outdated planning docs with a pointer to the index

## Phase 5 — CI quality gates (stretch)
- Add a Storybook a11y smoke to CI
- Lint for raw hex in UI package

