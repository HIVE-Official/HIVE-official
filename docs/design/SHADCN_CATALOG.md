Status: Active
Owner: Design System Guild
Last updated: 2025-10-14

# shadcn Components — Hive Catalog & Styling

This catalog lists the shadcn/ui primitives we curate, where they live, and how they are styled for Hive via tokens and utilities.

Conventions
- Import via `@/atoms` or `@/index` — never from `@/components/ui/*` outside the atoms layer.
- Visuals come from tokens (`@hive/tokens`) and utilities in `packages/ui/src/styles.css`.
- Radius, elevation, glass, contrast, density are controlled by global “dials” in Storybook.

## Primitives (curated)

- Button — src/components/ui/button.tsx → wrapped by src/atoms/button.tsx — Token rings, brand variants.
- Input — src/components/ui/input.tsx → src/atoms/input.tsx — Token border/input; focus ring.
- Textarea — src/components/ui/textarea.tsx → src/atoms/textarea.tsx — Token border/input; focus ring.
- Checkbox — src/components/ui/checkbox.tsx → src/atoms/checkbox.tsx — 2px neutral border; accent fill checked.
- RadioGroup — src/components/ui/radio-group.tsx → src/atoms/radio.tsx — Accent dot; keyboard nav.
- Switch — src/components/ui/switch.tsx → src/atoms/switch.tsx — Accent track when checked; token thumb.
- Label — src/components/ui/label.tsx → src/atoms/label.tsx — 13px medium per typography tokens.
- Badge — src/components/ui/badge.tsx → src/atoms/badge.tsx — Neutral/subtle/outline mapped to tokens.
- Card — src/components/ui/card.tsx → src/atoms/card.tsx — `bg-card + border-border`; hover lift optional.
- Separator — src/components/ui/separator.tsx → src/atoms/separator.tsx — 1px neutral line.
- Skeleton — src/components/ui/skeleton.tsx → src/atoms/skeleton.tsx — Surface-muted shimmer.
- Progress — src/components/ui/progress.tsx → src/atoms/progress.tsx — Accent bar; rounded full.
- Slider — src/components/ui/slider.tsx → src/atoms/slider.tsx — Accent track; thumb shadow xs.
- Toggle — src/components/ui/toggle.tsx → src/atoms/toggle.tsx — Neutral → accent active; token ring.
- Tooltip — src/components/ui/tooltip.tsx → src/atoms/tooltip.tsx — Inverse text on dark surface; 6px radius.
- Avatar — src/components/ui/avatar.tsx → src/atoms/avatar.tsx — Neutral border ring; status dot uses tokens.

## Overlays & Menus (shadcn)

- Dialog — src/components/ui/dialog.tsx; molecule re-exports at src/molecules/dialog.tsx — Overlay color uses `--scrim-*` tokens; focus trap; reduced motion supported.
- Sheet — src/components/ui/sheet.tsx; molecule re-exports at src/molecules/sheet.tsx — Mobile off‑canvas; safe areas.
- DropdownMenu — src/components/ui/dropdown-menu.tsx; molecule re-exports at src/molecules/dropdown-menu.tsx — Groups, icons, separators.
- Command — src/components/ui/command.tsx; molecule re-exports at src/molecules/command.tsx — Combobox base; async/empty states.
- Tabs — src/components/ui/tabs.tsx; molecule re-exports at src/molecules/tabs.tsx — Roving focus; underline/fill.
- Select — src/components/ui/select.tsx; molecule at src/molecules/select.tsx — Label, trigger, content a11y.
- Popover — src/components/ui/popover.tsx — Used by menus and field help; a molecule wrapper is planned.

## Hive Styling (what’s changed)

- Tokens for surfaces, borders, and rings — no raw hex; gold reserved for CTA/brand accents.
- Focus ring — 2px, token color `--ring`, with `--ring-offset` gap for clarity.
- Glass — `surface-glass` utility adds blur+alpha for elevated chrome; disabled by `.no-glass`.
- Motion — 120–240ms, `cubic-bezier(0.2,0,0.2,1)`; reduced motion disables non-essential transforms.
- Density — 0.92×, 1×, 1.08× scales wired to typography and spacing.
- Radius — dial classes adjust rounded tokens; defaults align to design dials.

## Interaction Contracts (see INTERACTION_CONTRACTS.md)
- States: idle, hover, focus-visible, active, disabled, loading, error, selected/current.
- Keyboard: Tab/Shift+Tab, Arrow keys, Home/End, typeahead; Escape to dismiss overlays.
- A11y: landmark roles, aria attributes, labeled triggers, described-by messages.

