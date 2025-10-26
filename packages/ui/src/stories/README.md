# Storybook Conventions (HIVE UI)

Purpose
- Keep stories navigable and consistent across domains so Storybook reads like a living spec, not a dump.

Top‑Level Groups (ordered)
- Plan, Foundation, Brand, Atoms, Molecules, Organisms, Layouts, Templates, Pages, Reference, A11y, States

Organisms — Domain Subgroups
- Organisms/Spaces/…
- Organisms/Profile/…
- Organisms/Onboarding/…
- Organisms/HiveLab/…

Title Naming
- Use `Group[/Domain]/Component[/Variant]` form.
- Examples:
  - `Atoms/Button`
  - `Molecules/FormField`
  - `Organisms/Spaces/BoardCard/Poll`
  - `Layouts/Auth/SignIn`
  - `Layouts/Sidebar/Hive`
  - `Organisms/Onboarding/Frame`

Docs & Tags
- SB8 autodocs is configured as `autodocs: "tag"`; add `tags: ["autodocs"]` to component stories that should generate docs.
- Prefer `parameters: { layout: "padded" }` (default). Use `fullscreen` only for shells/layouts.

Files & Structure
- Keep stories in `packages/ui/src/stories`.
- Use real fixtures when possible; avoid mocked UI that doesn’t reflect contracts.
- Prefer one component per file with multiple named stories for states.

A11y & States
- For accessibility/state demonstrations, either:
  - keep as stories within the same file (recommended), or
  - nest under `Reference/A11y/...` and `Reference/States/...` when cross‑component.

Controls
- Expose only meaningful args; avoid overwhelming the Controls panel.

Sorting
- The sidebar order is controlled via `.storybook/preview.ts` with a custom sorter that prioritizes the groups above and, within Organisms, the domain order: `Spaces`, `Profile`, `Onboarding`, `HiveLab`.

Checklist per PR
- Title follows conventions.
- Docs enabled (where sensible) via `tags: ["autodocs"]`.
- Layout set appropriately (`padded` vs `fullscreen`).
- Stories reflect accurate tokens/brand (gold for CTAs, no glass on core surfaces).
