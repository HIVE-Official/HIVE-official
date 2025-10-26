# Atomic Design System — Master Checklist (Open‑Ended)

Owner: Design System Guild

Important: This checklist is intentionally open‑ended. Every item can (and often should) expand into further tasks and sub‑tasks. Use it collaboratively with AI and the team to plan, scope, and iterate. Do not assume specific layouts, navigation chrome, or page structures; keep components composable, slot‑based, and context‑agnostic.

Goals
- Build a production‑grade, accessible, composable system (tokens → atoms → molecules → organisms → templates) that supports multiple product surfaces without prescribing layouts.
- Enforce evidence‑based UX, strong a11y, and measurable quality.

## Check‑Off Protocol & Change Management (Read Before Ticking Anything)
- When you check off an item, you must create a brief decision entry using `docs/design/CHECKOFF_TEMPLATE.md` and append it to `docs/design/DESIGN_DECISIONS_LOG.md`.
- Every check‑off can (and likely will) change upcoming work. Perform a ripple review and adjust future checkmarks accordingly (add/split/merge/reorder). Do not hesitate to expand the checklist.
- Evidence first: include links to Storybook stories, screenshots, a11y results, and any measurements (perf or UX experiments) that justify the check‑off.
- If the work introduced a net‑new pattern, open a Canon RFC and gate the check‑off until it is approved.
- Use status tags on items when useful: `[in‑progress]`, `[blocked]`, `[needs‑RFC]`, `[needs‑a11y]`, `[ready‑for‑review]`.

Minimal acceptance when checking off an item
- Links: PR, Storybook story, docs page.
- A11y: keyboard path, focus, SR labels/roles, contrast verified.
- States: loading/empty/error/success/edge demonstrated.
- Measurement (when applicable): events instrumented; guardrails observed.
- Impact: list of downstream checklist updates applied.

## Foundation (Tokens, Utilities, Governance)
- [ ] Color roles (brand‑agnostic semantics): background, surface, text‑primary/secondary, accent, interactive‑primary/secondary, success, warning, danger, info, border, ring.
- [x] Dark/light palettes + high‑contrast overlays; ensure AA+ for text and interactive states.
- [ ] Spacing scale (4/8 system) and density tokens (cozy/comfy/airy) with container padding rules.
- [x] Radius scale: none, M(12), L(16), XL(20); define component radii map; allow per‑scope overrides without prescribing a global style.
- [x] Elevation tokens: flat/soft/medium; glass translucency tokens; overlay opacity.
- [x] Motion tokens: micro(100–140ms), macro(160–220ms), easings (standard/entrance/exit); reduced‑motion fallbacks.
- [ ] Typography scale: base(16), small(14), large(18–20), headings(20/24/32/40); line‑height 1.4–1.6; truncation and wrap behaviors.
- [ ] Iconography system: stroke weight, sizes (16/20/24), focusable SVG strategy, decorative vs informative semantics.
- [ ] Border/stroke tokens: hairline/1px/2px; contrast safety on dark.
- [x] Focus ring: visible 2px, offset, accent color; focus‑within helpers.
- [ ] Utility classes: focus‑gold, surface‑glass, density toggles, visually hidden, no‑scrollbar, skeleton shimmer.
- [ ] Tailwind preset mapping to tokens; docs for usage and extension.
- [x] Theming strategy: root variables, per‑scope overrides, Storybook controls for contrast/density/motion.
- [x] Governance: RFC template, Canon molecules list, weekly audit checklist, deprecation policy, versioning.
- [ ] Performance budgets: CSS bundle, first paint, interaction latency; tree‑shaking and dead‑code checks.
- [ ] Documentation structure: Storybook coverage, MDX/CSF decisions, usage notes, dos/don’ts.

Deliverables
- [ ] Token source (CSS vars + TS), Tailwind preset, utilities CSS.
- [ ] Docs: token reference, focus/motion guidelines, contribution rules, RFC path, audit checklist.

Evidence links (Foundation — checked items)
- Dark/light + high‑contrast: `packages/tokens/src/styles.css:1`, `packages/ui/src/styles.css:1`
- Radius scale: `packages/tokens/src/tokens.ts:1`, `packages/tokens/src/tailwind.preset.ts:1`
- Elevation/glass: `packages/tokens/src/tailwind.preset.ts:1` (boxShadow), `packages/ui/src/styles.css:1` (.surface-glass)
- Motion tokens: `packages/tokens/src/styles.css:1` (motion vars), `packages/ui/src/styles.css:1` (.reduce-motion)
- Focus ring: `packages/ui/src/styles.css:1` (.focus-gold)
- Theming strategy: `packages/ui/.storybook/preview.tsx:1`, `packages/tokens/src/styles.css:1` (dark/light + vNext)
- Governance: `docs/design/CANON_MOLECULES.md:1`, `docs/design/RFC_CANON_TEMPLATE.md:1`, `docs/design/WEEKLY_AUDIT_CHECKLIST.md:1`, `docs/design/DESIGN_DECISIONS_LOG.md:1`

Status note: vNext tokens adopted as default (see Design Decisions Log). “Current” tokens remain available in Storybook for comparison until we remove the toggle.

---

Foundation Answers (vNext Spec — Document First, Then Implement)

1) Color roles (brand‑agnostic semantics)
- Roles: background, surface-{1..3}, text-primary, text-secondary, accent, interactive-primary, interactive-secondary, success, warning, danger, info, border-{subtle|DEFAULT|strong}, ring, overlay-{scrim|veil|hover}.
- Dark palette (root)
```
:root[data-theme="dark"]{
  --background:#0A0A0A;
  --surface-1:#0E0E10; --surface-2:#131316; --surface-3:#18181C;

  --text-primary:#EDEDED; --text-secondary:#A9ABB0;

  --border-subtle:#1D1D21; --border:#2A2A2E; --border-strong:#3A3A41;
  --ring:#FFD700; --ring-offset:#0A0A0A;

  /* Accent / primary CTA (reserved; use sparingly) */
  --accent:#FFD700; --accent-hover:#F2C100; --accent-active:#E6B800; --accent-on:#0A0A0A;
  --accent-tint:rgba(255,215,0,0.12); --accent-outline:#6F5A00;

  /* Interactive */
  --int-primary-bg:var(--accent); --int-primary-fg:var(--accent-on);
  --int-primary-bg-hover:var(--accent-hover); --int-primary-bg-active:var(--accent-active);
  --int-primary-disabled-bg:#2E2E32; --int-primary-disabled-fg:#7B7E86;

  --int-secondary-bg:transparent; --int-secondary-bg-hover:#15151A; --int-secondary-bg-active:#1A1A20;
  --int-secondary-fg:var(--text-primary); --int-secondary-border:var(--border);

  /* System states */
  --success:#22C55E; --success-on:#0A0A0A; --success-tint:rgba(34,197,94,0.18); --success-border:#2F8F5B;
  --warning:#F59E0B; --warning-on:#0A0A0A; --warning-tint:rgba(245,158,11,0.18); --warning-border:#996A07;
  --danger:#EF4444;  --danger-on:#0A0A0A;  --danger-tint:rgba(239,68,68,0.18); --danger-border:#A22E2E;
  --info:#3B82F6;    --info-on:#0A0A0A;    --info-tint:rgba(59,130,246,0.18); --info-border:#2459A8;

  /* High-contrast overlays */
  --overlay-scrim: rgba(0,0,0,0.50); /* modal underlay */
  --overlay-veil:  rgba(10,10,10,0.72); /* drawers/sheets */
  --overlay-hover: rgba(255,255,255,0.04); /* list hover */
}
```
- Light palette (auto‑derived but curated)
```
:root[data-theme="light"]{
  --background:#FFFFFF;
  --surface-1:#FAFAFB; --surface-2:#F5F6F7; --surface-3:#EEEFF2;

  --text-primary:#0B0C0E; --text-secondary:#4B4F57;

  --border-subtle:#E8E9EC; --border:#D7D9DE; --border-strong:#C2C5CC;
  --ring:#C28E00; --ring-offset:#FFFFFF;

  --accent:#C28E00; --accent-hover:#B08100; --accent-active:#9E7300; --accent-on:#FFFFFF;
  --accent-tint:rgba(194,142,0,0.10); --accent-outline:#7D5E00;

  --int-primary-bg:var(--accent); --int-primary-fg:var(--accent-on);
  --int-primary-bg-hover:var(--accent-hover); --int-primary-bg-active:var(--accent-active);
  --int-primary-disabled-bg:#ECEDEF; --int-primary-disabled-fg:#A3A7AF;

  --int-secondary-bg:transparent; --int-secondary-bg-hover:#F5F6F7; --int-secondary-bg-active:#EEEFF2;
  --int-secondary-fg:var(--text-primary); --int-secondary-border:var(--border);

  --success:#138D46; --success-on:#FFFFFF; --success-tint:rgba(19,141,70,0.10); --success-border:#2F8F5B;
  --warning:#B26500; --warning-on:#FFFFFF; --warning-tint:rgba(178,101,0,0.10); --warning-border:#996A07;
  --danger:#B12323;  --danger-on:#FFFFFF; --danger-tint:rgba(177,35,35,0.10); --danger-border:#A22E2E;
  --info:#1F63D4;    --info-on:#FFFFFF;    --info-tint:rgba(31,99,212,0.10); --info-border:#2459A8;

  --overlay-scrim: rgba(0,0,0,0.45);
  --overlay-veil:  rgba(0,0,0,0.16);
  --overlay-hover: rgba(0,0,0,0.04);
}
```
- Rules: Gold is CTA/focus only (not body text/badges); maintain ≥4.5:1 text contrast; use tints for passive states.

2) Dark/light + high‑contrast overlays → AA+
- Default to dark; automatic light available.
- High Contrast toggle bumps: text toward #FFF/#0B0C0E, borders one step (subtle→default), and focus ring +1px width.
- Modal/sheet underlays always use overlay tokens; never pure black.

3) Spacing scale & density
- Base unit: 4px (4/8 system).
- Scale: 0, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64.
- Densities via data attribute: `data-density="cozy|comfy|airy"`.
- cozy: −1 step padding/line-height; comfy: base; airy: +1 step.
- Container padding: mobile 16 (<640px), desktop 24 (≥640px), wide 40 (≥1280px).
- List row height: cozy 40, comfy 48, airy 56.

4) Radius scale
- Tokens: `--radius-none:0`, `--radius-m:12px`, `--radius-l:16px`, `--radius-xl:20px`.
- Component map: Button M, Card L, Sheet XL, Input M, Avatar L.
- Per‑scope override allowed (e.g., Builder surfaces opt into XL).

5) Elevation & glass
- Elevation tokens: `--elev-flat:none`, `--elev-soft:0 2px 10px rgba(0,0,0,0.35)`, `--elev-medium:0 8px 30px rgba(0,0,0,0.45)`.
- Glass (dark): `--glass-bg:rgba(255,255,255,0.03)`, `--glass-border:rgba(255,255,255,0.08)`, `--glass-blur:12px`.
- Use glass sparingly (nav/app shell), not for content bodies.

6) Motion tokens
- Durations: `--t-micro:120ms` (100–140 window), `--t-macro:180ms` (160–220), `--t-dialog:220ms`.
- Easings: `--ease-standard:cubic-bezier(.2,.0,.2,1)`, `--ease-enter:cubic-bezier(0,0,.2,1)`, `--ease-exit:cubic-bezier(.4,0,1,1)`.
- Reduced motion: respect OS; disable large transforms; opacity fades ≤120ms.

7) Typography
- Base: 16. Sizes: small 14, large 18–20. Headings: 20/24/32/40.
- Line-height: 1.45 (body), 1.2–1.3 (headings).
- Utilities: `.truncate-1`, `.truncate-2` (line‑clamp); avoid justified text; hyphenation off.

8) Iconography
- Sizes: 16/20/24; default 20 in dense lists, 24 in nav.
- Stroke: 1.5px baseline; targets ≥40×40 on tap.
- SVGs: `focusable` when interactive; `role="img"` and `aria-hidden="true"` for decorative.

9) Border/stroke tokens
- `--hairline:0.5px` (device‑pixel‑aligned), standard 1px, strong 2px.
- All use semantic border tokens to ensure dark‑mode contrast.

10) Focus ring
- Visible 2px ring + 1px offset using accent gold.
- Provide `.focus-within` helpers for compound controls (inputs, search bars).

Implementation Plan
- Add spec to tokens vNext doc; map to Tailwind preset keys; expose Storybook controls for theme/density/high‑contrast.
- Create migration map from current tokens (HSL roles) → vNext roles; ship behind a preview flag first.
- Write acceptance tests: contrast snapshots for interactive/CTA; a11y addon passes for focus and roles.

## Atoms (Accessible, Composable Primitives)
Note: Every atom must declare states (default/hover/focus/active, disabled, loading, invalid/success as applicable), sizes, density, a11y affordances, and token hooks.

- [x] Button
  - Variants: default (transparent/outline), primary (neutral inverse), secondary (subtle), ghost, destructive, icon‑only.
  - States: loading spinner, pressed/active motion, focus ring.
  - A11y: aria‑label for icon‑only, disabled semantics, tooltip for icon‑only.
- [ ] Link
  - Variants: inline, subtle, external (icon), muted.
  - A11y: focus ring, visited style policy, external rel/noopener.
- [ ] Input (Text)
  - Types: text, email, password, number; clearable; with prefix/suffix icons.
  - A11y: label/id, describedby for help/error, aria‑invalid, autocomplete hints.
- [ ] Textarea
  - Auto‑resize option; char counter; max length.
  - A11y: describedby for helper/errors; label.
- [ ] Select (Native)
  - Sizes, placeholder, disabled; fallback for custom select.
- [ ] Checkbox
  - Indeterminate state; group behavior; hit target ≥44px.
- [ ] Radio
  - Group labeling (fieldset/legend), required semantics.
- [ ] Switch
  - Press/Space toggle; on/off labels for SR.
- [ ] Badge/Tag/Chip
  - Variants: neutral, status(success/warning/danger/info), accent; removable.
  - A11y: close button label; aria‑pressed for filter chips.
- [ ] Tooltip
  - Delay policy; escape hatch for touch; label vs description semantics.
- [ ] Spinner/Progress
  - Indeterminate spinner; determinate progress with aria‑valuenow.
- [ ] Avatar
  - Fallback initials; status dot; sizes; alt text policy.
- [ ] Separator/Divider, KBD, VisuallyHidden

Deliverables
- [ ] Stories: anatomy, variants, .States coverage.
- [ ] A11y tests: axe, keyboard traversal, SR labels.

## Molecules (Reusable Patterns)
Note: Molecules are composition‑first and layout‑agnostic; they must not assume page placement (top bar, sidebar, etc.).

- [ ] Form Field
  - Label, control slot, helper, error; required/optional indicators; async pending.
  - Validation message patterns; i18n placeholders and help text.
- [ ] Dropdown Menu
  - Trigger + menu; sections; icons; destructive actions; keyboard navigation; type‑ahead.
- [ ] Select (Custom)
  - Trigger; searchable list; empty/no results; async loading; virtualized option list (open‑ended).
- [ ] Combobox / Command Palette
  - Search, sections, keyboard shortcuts, no results, async; ctrl/cmd+k focus trap.
- [ ] Tabs
  - Segmented or underline styles; overflow scroll; roving tabindex; aria‑controls mapping.
- [ ] Dialog (Modal)
  - Standard and destructive; focus trap; labelledby/Describedby; scrollable content; return‑focus.
- [ ] Sheet (Side/Bottom)
  - Side selection, nested focusables; mobile gestures (optional); return‑focus.
- [ ] Toast / Inline Alert
  - Status variants; auto‑dismiss; queuing; aria‑live polite/assertive; action buttons.
- [ ] Toolbar / Filters Bar
  - Filter chips; applied state; counts; reset; aria‑pressed; badges for active filters.
- [ ] Search Box
  - Debounced input; clear; submit; suggestions hook; keyboard nav.
- [ ] Pagination / Load More / Infinite Scroll
  - Buttons with aria‑current; “Load more”; sentinel/observer hook for infinite lists.
- [ ] List Row (Item)
  - Leading media, primary/secondary text, meta, trailing actions; selectable and interactive rows.
- [ ] Card
  - Header, body, footer slots; hover elevation; selected state; compact/comfortable density.
- [ ] Empty State
  - Icon/illustration, title, body, primary and secondary actions; offline variant.
- [ ] Breadcrumb (optional)
  - Overflow handling; aria‑current on last item.
- [ ] Stepper / Progress Header (optional)
  - Current/completed states; editable steps; SR announcement.
- [ ] Tag Input / Token Field (optional)
  - Add/remove tokens; duplicates; max tokens; keyboard semantics.
- [ ] Date/Time Picker (optional)
  - Keyboardable calendar; range; time zones; localization.
- [ ] File Upload (optional)
  - Drag/drop; progress; cancel; error states; type/size validation.

Deliverables
- [ ] Stories: minimal props matrix; .States; a11y notes; performance notes.
- [ ] Contracts: TS props; events; data shapes; token hooks.

## Organisms (Layout‑Agnostic Composites)
Note: Organisms combine molecules without dictating layout location. Slots only.

- [ ] App Shell (slots only)
  - headerLeft/Center/Right, toolbar slot, main content slot; skip link; toast region; portals. No nav layout assumption.
- [ ] Collections
  - Grid: responsive columns, gap tokens, item renderer; List: virtualization hook; keyboard navigation.
- [ ] Forms (composable)
  - Form layout helpers (rows/columns), validation summaries, submit bars; not tied to a page layout.
- [ ] Navigation Primitives (composable)
  - Quick Nav sheet, segmented tabs groups, breadcrumbs; no fixed chrome assumption.
- [ ] Data Table (optional)
  - Column defs, sorting, selection, virtualization; a11y headers.
- [ ] Media Gallery (optional)
  - Responsive thumbs; selection; preview.

Deliverables
- [ ] Stories with slot composition examples; keyboard maps; performance notes.

## Templates (Demonstrative, Not Prescriptive)
Note: Use templates to demonstrate end‑to‑end states and compositions. Do not hardcode nav layouts. Keep templates as cookbooks for composing organisms/molecules.

- [ ] Example Templates (Open‑Ended)
  - Collections overview; Item detail with tabs; Form‑heavy flow; Feed stream; Dialog‑driven action sheet.
- [ ] State matrices for each template: loading/empty/error/success/edge cases.
- [ ] Microcopy guidance and a11y reading order.

Deliverables
- [ ] Stories demonstrating composition only; clear mapping back to molecules/atoms.

## Accessibility (WCAG 2.2 AA+) — System‑Wide Tasks
- [ ] Keyboard: tab order matches reading order; roving tabindex where needed; ESC closes overlays; return‑focus.
- [ ] Focus: visible ring with offset; never rely on color alone; outline bypass avoided.
- [ ] Screen Readers: roles/labels; aria‑expanded/controls; aria‑live for async; label associations; landmark semantics.
- [ ] Motion: reduced‑motion removes spatial movement; opacity‑only fallbacks; respect prefers‑reduced‑motion.
- [ ] Contrast: AA for text; large text ≥3:1; CTA foreground on accent passes AA; test high‑contrast mode.
- [ ] Hit targets: ≥44px interactive.
- [ ] Localization: longer strings, RTL flags, number/date formats.

Deliverables
- [ ] A11y linting and Storybook addon checks in PR gates; E2E keyboard tests for overlays.

## Performance & DX
- [ ] Tree‑shakeable exports; avoid side‑effect imports; split heavy components (date picker, table, command) lazily.
- [ ] Virtualization for long lists; skeletons <100ms; perceived‑speed strategies.
- [ ] CSS size budget; audit unused utilities; purge coverage.
- [ ] Dev ergonomics: consistent props naming, sensible defaults, strong typing, zero any.
- [ ] Storybook perf: minimal providers; defer heavy demos; knobs/controls scoped.

Deliverables
- [ ] Perf CI checks; bundle analyzer snapshots; visual diff tests for critical components.

## Governance & Process
- [ ] Canon molecules enforced; any net‑new pattern enters via RFC (10‑minute template).
- [ ] Weekly audit across IA compliance, a11y, gold quota, tokens, motion ranges.
- [ ] Versioning and deprecation (announce, sunset, removal); changelog categories (feat/fix/a11y/breaking).
- [ ] Documentation debt tracking; story coverage dashboard; owner assignment per component.

## Measurement & Telemetry
- [ ] Event taxonomy for UI interactions (component render, state change, submit, error, success).
- [ ] Guardrails (a11y fails, error rates, performance budgets) with alerts.
- [ ] Experiment hooks: easy A/B flags for variants (density, elevation, active indicators).

## Definition of Done (Each Component/Pattern)
- [ ] Props documented (TS), token hooks listed, states/variants defined.
- [ ] A11y passed (axe + manual): focus/keyboard/SR/contrast.
- [ ] .States story exists; edge cases covered; microcopy included.
- [ ] Unit tests (render/props/ARIA), integration where applicable.
- [ ] Perf notes: size, lazy‑load guidance.
- [ ] Usage examples (do/don’t), pitfalls, ownership.

## Roadmap Planning Seeds (Expand as Tasks/Sub‑tasks)
- [ ] Tabs: add underline‑only and segmented styles; benchmark discoverability vs pill.
- [ ] Data heavy patterns: table with virtualization; keyboard multi‑select; column resize.
- [ ] Accessibility hardening: overlays focus trap regression suite; SR narratives for state changes.
- [ ] Internationalization kit: number/date/relative‑time helpers; RTL mirroring audit.
- [ ] Design tokens theming: alternate accent(s); high‑contrast themes; print styles.
- [ ] Visual regression: baseline screenshots for atoms/molecules in key states.

References
- Master Plan: docs/design/UI_UX_IA_MASTER_PLAN.md
- Canon Molecules: docs/design/CANON_MOLECULES.md
- RFC Template: docs/design/RFC_CANON_TEMPLATE.md
- Weekly Audit: docs/design/WEEKLY_AUDIT_CHECKLIST.md

---

## Vertical Slice Checklists (Open‑Ended, No Layout Assumptions)

Each vertical slice has unique UI/UX needs. The items below are prompts to scope work; do not prescribe page layouts. Assume slot‑based composition with molecules/organisms; expand items into tasks and sub‑tasks as needed.

### Spaces (Communities)
- [ ] IA Objects
  - [ ] Space core: name, description, privacy, membership, tags, updatedAt.
  - [ ] Relationships: rituals[], posts[], tools[], members[], invites.
- [ ] Discovery & Membership
  - [ ] Filters/facets (tags, activity, privacy) — as Toolbar chips.
  - [ ] Sorts (recent, active, alphabetical) — unified pattern.
  - [ ] Cards/list items with privacy and membership badges; hover and selected states.
  - [ ] Membership CTAs: Join, Request access, Leave, Cancel request; optimistic UI + rollback.
  - [ ] Invites: copy/link, QR (optional); state announcements.
- [ ] Detail Composition (slots, not layout)
  - [ ] Header with identity + actions; ownership/membership affordances.
  - [ ] About, Activity (feed), Rituals, Tools, Members — switchers via tabs/segmented control.
  - [ ] Owner/mod actions: manage roles, approvals, settings (molecules only).
- [ ] States & Edge Cases
  - [ ] Loading skeletons (cards, lists, header).
  - [ ] Empty (mine; discover); no results; private/locked messaging.
  - [ ] Pending membership; invite‑only banners; rate limits.
- [ ] A11y & Microcopy
  - [ ] ARIA labels include space names in action buttons.
  - [ ] Clear privacy labels; no jargon; student‑first tone.
- [ ] Measurement
  - [ ] space.join.start/success/fail; discover.filter.apply; card.open; invite.copy.

### Rituals (Events/Meetings)
- [ ] IA Objects
  - [ ] Ritual core: title, type, schedule, capacity, RSVPs, host.
  - [ ] Relationships: attendees[], resources, reminders.
- [ ] List & Filters
  - [ ] Upcoming/Past switch; date range; type filter; time zone hinting.
  - [ ] Density toggles for compact schedules.
- [ ] Detail Composition
  - [ ] RSVP control with states (yes/no/maybe/waitlist); optimistic update + rollback.
  - [ ] Add‑to‑calendar; reminders; share.
  - [ ] Capacity indicators; seat counters; waitlist messaging.
- [ ] States & Edge Cases
  - [ ] Full/capacity; overbook; time zone drift; daylight savings.
  - [ ] Recurring series (optional) with instance overrides.
- [ ] A11y & Microcopy
  - [ ] Time announced with locale; clear RSVP outcomes; countdown semantics (optional).
- [ ] Measurement
  - [ ] ritual.rsvp.start/success/fail; calendar.add; reminder.set.

### Feed (Activity Stream)
- [ ] IA Objects
  - [ ] Post: type(update/event/poll), content, media, author, reactions, comments.
  - [ ] Scope: global vs space; visibility rules; moderation flags.
- [ ] Stream Mechanics
  - [ ] Composer (scoped); attachments (files, images, links).
  - [ ] Infinite scroll vs Load more; item virtualization; skeleton cadence.
  - [ ] Reactions; comment thread preview; expand/collapse.
- [ ] Filters & Moderation
  - [ ] Filters for type/space; muted items; flagged content warnings.
  - [ ] Edit/delete with confirmation; soft‑delete messaging.
- [ ] States & Edge Cases
  - [ ] New items indicator; reconnect after offline; conflict resolution on edits.
- [ ] A11y & Microcopy
  - [ ] Live region for post success/error; descriptive action text.
- [ ] Measurement
  - [ ] post.create.start/success/fail; reaction.add; comment.add; feed.load.more.

### Tools (Checklists/Notes/Polls; In‑Space and Personal)
- [ ] IA Objects
  - [ ] Tool: type, ownerType(user/space), data schema, updatedAt.
- [ ] Patterns
  - [ ] Checklist: add/remove/reorder items; complete all; progress indicator.
  - [ ] Notes: markdown/plain; autosave; version hinting (optional).
  - [ ] Poll: single/multi select; close time; anonymity; results visualization.
- [ ] Offline & Sync
  - [ ] Draft state; conflict detection/resolution messaging; retry queue.
- [ ] States & Edge Cases
  - [ ] Permission mismatches (space vs personal); sharing into a space.
- [ ] A11y & Microcopy
  - [ ] Labels on controls; clear save status; error prevention tips.
- [ ] Measurement
  - [ ] tool.save.start/success/fail; checklist.item.toggle; poll.vote.

### Profile (People)
- [ ] IA Objects
  - [ ] User: name, avatar, bio, privacy, connections, interests.
- [ ] View & Edit
  - [ ] Overview blocks (about, stats, recent activity) as composable cards.
  - [ ] Privacy controls; field‑level visibility cues.
  - [ ] Connections management; follow/DM entry points (if applicable).
- [ ] States & Edge Cases
  - [ ] Private profile messaging; empty sections; incomplete profile prompts.
- [ ] A11y & Microcopy
  - [ ] Clear ownership language; success receipts for edits; undo affordances.
- [ ] Measurement
  - [ ] profile.edit.start/success/fail; connection.add/remove.

### HiveLab (Experiments/Beta)
- [ ] Lab Surface
  - [ ] Beta labels; disclaimers; opt‑in/out flows; feedback hooks.
  - [ ] Data separation; clear boundaries from production.
- [ ] Experiment Patterns (Open‑Ended)
  - [ ] Prototype shells; wizard flows; AI assist affordances; quick actions.
- [ ] A11y & Microcopy
  - [ ] Transparent status; avoid dark patterns; easy exit.
- [ ] Measurement
  - [ ] lab.try.start/success/fail; feedback.submit; optout.

### Notifications (Cross‑Cutting)
- [ ] Delivery & Surfacing
  - [ ] Toast vs inline vs inbox list; prioritization; batched updates.
  - [ ] Read/unread states; mark‑all; per‑event deep links.
- [ ] A11y & Microcopy
  - [ ] aria‑live levels; concise, action‑led copy; time‑ago with locale.
- [ ] Measurement
  - [ ] notification.click; mark.read; settings.update.

### Search & Navigation (Cross‑Cutting)
- [ ] Search
  - [ ] Global vs scoped; result groups (spaces, rituals, people, posts, tools).
  - [ ] Suggestions; keyboard nav; no‑result education.
- [ ] Navigation
  - [ ] Quick nav sheets; segmented areas; breadcrumbs; keyboard shortcuts.
- [ ] Measurement
  - [ ] search.submit; result.open; nav.quick.open/close.

- Canon Molecules: docs/design/CANON_MOLECULES.md
- RFC Template: docs/design/RFC_CANON_TEMPLATE.md
- Weekly Audit: docs/design/WEEKLY_AUDIT_CHECKLIST.md
