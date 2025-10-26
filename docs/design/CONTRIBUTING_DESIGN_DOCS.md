# Contributing to Design Docs

Status: Source of truth
Owner: Design System Guild
Last updated: 2025-10-14

## Required header for all docs
```
Status: Draft|Active|Archived
Owner: <name or guild>
Last updated: <YYYY-MM-DD>
```

## Where to put things
- Long-form rationale and plans → `docs/design`
- Code and stories → `packages/ui`
- App usage docs → `apps/*/README` or feature-specific docs

## shadcn primitives — usage rules
- Do not import from `@/components/ui/*` in apps or stories. Import curated atoms from `@/atoms/*` (or via `@/index`) so tokens and variants stay consistent.
- When adding new primitives with the shadcn CLI, wire them under `components/ui/*` then create a thin re-export in `atoms/*` and export it from `index.ts`.
- Never overwrite customized primitives on update (e.g., button). Choose “No” on overwrite.

## Templates
- Planning brief: docs/design/templates/PLANNING_BRIEF_TEMPLATE.md
- Component spec: docs/design/templates/COMPONENT_SPEC_TEMPLATE.md
- Pattern spec: docs/design/templates/PATTERN_SPEC_TEMPLATE.md

## Archiving
- Add “Status: Archived” at the top
- Add a link to the replacement doc in README.md or ROADMAP
