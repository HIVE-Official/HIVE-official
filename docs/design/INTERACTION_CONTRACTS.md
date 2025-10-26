Status: Active
Owner: Design System Guild
Last updated: 2025-10-14

# Interaction Contracts — Defaults & A11y

States (all interactive atoms/molecules)
- Idle — neutral surface/text; no motion.
- Hover — subtle tint; shadow xs where relevant.
- Focus-visible — 2px ring (`--ring`) with offset; always keyboard-visible.
- Active — scale 0.985; remove hover shadow.
- Disabled — 40% opacity min; keep text readable.
- Loading — spinner/aria-busy on controls.
- Error — token `destructive` for border/text; paired with FieldText.
- Selected/Current — `aria-selected=true` or `aria-current=page` for nav.

Keyboard
- Generic: Tab/Shift+Tab to navigate; Space to press; Enter to activate.
- Menus (DropdownMenu/Command/Select): Arrow keys to move; Home/End; typeahead; Escape to close.
- Tabs: Arrow keys switch triggers; focus remains on tablist.
- Dialog/Sheet: Escape closes; focus trapped; return focus to trigger.

ARIA & Labels
- Button/IconButton: label via text or `aria-label`.
- Inputs: `id` + `Label htmlFor`; helper/error via `aria-describedby`.
- Tooltip: label+description for triggers where needed; `role="tooltip"`.
- Progress/Spinner: `role="progressbar"` + `aria-valuenow` (determinate); spinner is `aria-hidden` if purely decorative.

Tokens & Motion
- No raw hex; surfaces/borders/rings use tokens.
- Motion: 120–240ms, ease `(0.2,0,0.2,1)`; reduced motion disables transforms.

Hit targets
- Touch targets ≥ 44×44 on mobile; padding scales with density dials.

