# Minimum Canon — Molecule Passports (v1)

Owner: Design System Guild • Scope: Library‑wide

Use: Pages may only assemble from these molecules. Atoms exist only to satisfy these. New molecules require RFC (docs/design/RFC_CANON_TEMPLATE.md:1).

Passport template (each entry follows):
- Purpose • Inputs (props/data) • Variants • States • A11y • Motion • Token Hooks • Dependencies • Tests

1) Card
- Purpose: Container for summary/detail blocks.
- Inputs: title, subtitle?, media?, actions?, onClick?, selectable?
- Variants: default | interactive | selected | error.
- States: loading (skeleton), hover, focusable, error.
- A11y: role=article/region; focusable when clickable; aria-pressed for selectable.
- Motion: hover lift 140–160ms; press 100–120ms.
- Token Hooks: radius XL, elevation soft/medium, border hairline.
- Dependencies: Button, Skeleton, Badge.
- Tests: focus ring, hover/press motion, skeleton swap.

2) List Row
- Purpose: Dense item row with leading media and trailing actions.
- Inputs: icon/avatar, title, meta, badge?, onPress, menu?.
- Variants: default | interactive | selectable.
- States: loading, hover, focus, selected.
- A11y: role=listitem; label includes title/meta; menu button aria-haspopup.
- Motion: subtle highlight 120–140ms.
- Token Hooks: density cozy/comfy; border hairline.
- Dependencies: Avatar, Button, Menu.
- Tests: keyboard nav, hit target ≥44px.

3) Toolbar / Filters Bar
- Purpose: Scope controls for lists/grids.
- Inputs: filters[], sort?, view toggle?, count.
- Variants: compact | comfy.
- States: disabled controls, applied filters badges.
- A11y: group with legend; buttons have aria-pressed.
- Motion: chip add/remove 120ms.
- Token Hooks: spacing 8/12; ring accent.
- Dependencies: Button, Tag/Badge, Dropdown.
- Tests: SR announces filter changes.

4) Search Box
- Purpose: Query within current scope.
- Inputs: value, onChange, onSubmit, placeholder.
- Variants: with leading icon | with filters.
- States: idle, focused, loading, no results.
- A11y: role=search; label; clear button with aria-label.
- Motion: focus ring 120ms.
- Token Hooks: input bg, ring, radius L/XL.
- Dependencies: Input, Button.
- Tests: keyboard submit, SR label.

5) Tabs
- Purpose: Switch between peer views.
- Inputs: items[], value, onValueChange.
- Variants: filled-pill | underline.
- States: disabled tab, overflow scroll.
- A11y: role=tablist/tabpanel, aria-selected, arrows nav.
- Motion: indicator 140–160ms.
- Token Hooks: pill bg, ring.
- Dependencies: Button.
- Tests: keyboardable tabbing.

6) Dialog (Modal)
- Purpose: Focused decisions/forms.
- Inputs: title, description, content, primary/secondary actions.
- Variants: standard | destructive.
- States: open/close, submitting, error.
- A11y: role=dialog, labelledby/Describedby, focus trap, ESC close, return focus.
- Motion: fade/scale 160–200ms; reduced-motion opacity only.
- Token Hooks: elevation medium, glass subtle, ring.
- Dependencies: Button, Form Field, InlineAlert.
- Tests: focus management, SR text.

7) Sheet
- Purpose: Contextual panels on mobile/desktop.
- Inputs: side(top|right|bottom|left), title?, content.
- Variants: narrow | wide.
- States: open/close, nested focusables.
- A11y: role=dialog; same as Dialog.
- Motion: slide 180–220ms; reduced-motion opacity.
- Token Hooks: elevation medium, glass subtle.
- Dependencies: Button.
- Tests: trap + return focus.

8) Toast / InlineAlert
- Purpose: Outcome/status.
- Inputs: type(success|warning|danger|info), title, description?, actions?.
- Variants: toast (overlay) | inline (within layout).
- States: queuing, auto-dismiss, sticky.
- A11y: aria-live=polite/assertive; focusable action.
- Motion: slide/fade 160–180ms.
- Token Hooks: status colors, ring accent.
- Dependencies: Button.
- Tests: screen reader announcement.

9) Form Field
- Purpose: Label + control + help + error.
- Inputs: id, label, description?, error?, required?, control(slot).
- Variants: text, textarea, select, checkbox/radio group.
- States: focus, invalid, disabled, readonly, pending.
- A11y: label/for, aria-invalid, describedby.
- Motion: invalid message fade 120ms.
- Token Hooks: input bg, border, ring.
- Dependencies: Input/Select/Checkbox/Radio, HelperText.
- Tests: SR relationships, keyboard focus.

10) Empty State
- Purpose: Educate + next step.
- Inputs: icon, title, body, primary CTA, secondary CTA?.
- Variants: page | section.
- States: offline variant.
- A11y: headings, descriptive text.
- Motion: icon micro-fade 120ms (optional).
- Token Hooks: spacing, ring on CTA.
- Dependencies: Button.
- Tests: contrast + focus on CTAs.

11) Pagination / Load More
- Purpose: Navigate lists/streams.
- Inputs: page, total, onNext/Prev; or onLoadMore.
- Variants: paged | infinite.
- States: loading, disabled, end reached.
- A11y: role=navigation; aria-current on page.
- Motion: spinner minimal.
- Token Hooks: ring on buttons.
- Dependencies: Button, Spinner.
- Tests: keyboard nav.

12) Avatar with Meta
- Purpose: Identify user/space with small context.
- Inputs: image, name, subtext, size.
- Variants: circle | square; clickable.
- States: loading (skeleton), fallback initials.
- A11y: alt text, label includes name.
- Motion: hover subtle.
- Token Hooks: size scale, ring on focus.
- Dependencies: Avatar, Badge.
- Tests: fallback contrast.

13) Composer
- Purpose: Post creation.
- Inputs: scope(space/global), text, media?, privacy, onSubmit.
- Variants: compact | expanded.
- States: idle, dirty, submitting, error.
- A11y: label, character count, error describedby.
- Motion: expand 160–200ms.
- Token Hooks: ring, input bg, radius.
- Dependencies: Form Field, Button, InlineAlert.
- Tests: keyboard submit, SR announcement.

14) Collection (Grid/List)
- Purpose: Lay out Cards/List Rows.
- Inputs: items[], layout(grid|list), itemRenderer.
- Variants: 1–4 columns responsive.
- States: loading (skeleton grid), empty, error.
- A11y: role=list/grid; item roles match.
- Motion: skeleton crossfade 140–160ms.
- Token Hooks: spacing scale, breakpoints.
- Dependencies: Card/List Row, Skeleton, Empty State.
- Tests: responsive columns.

15) Tag / Badge Pill
- Purpose: Status/filters/tagging.
- Inputs: label, variant(status|neutral|accent), removable?, pressed?
- Variants: filled | outline | subtle.
- States: pressed, removable (with close button), focusable.
- A11y: aria-pressed for filter chips; close button label.
- Motion: add/remove 120ms.
- Token Hooks: status colors, ring accent.
- Dependencies: Button (icon), Icon.
- Tests: keyboard remove.

Non‑Goals
- No bespoke molecules without RFC; atoms are not shipped standalone.

