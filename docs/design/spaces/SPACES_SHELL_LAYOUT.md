# Spaces Shell — Layout and IA

Last updated: 2025-10-22

Purpose
- Define the canonical shell for Space pages so Feed, Calendar, and About share one predictable frame with an optional right-side Dock and a bottom Composer.
- Ground implementation in the Spaces v1 IA (docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md).

Slots
- SpaceHeader: cover/identity, membership controls, role chips.
- Tabs: Feed • Calendar • About (feature flag gates allowed).
- Content: routed view for each tab.
- Dock (optional): widgets (Stories, Events, Tools, Resources).
- Composer: bottom-aligned entry for post/event creation (spec decision 0003).

Surface Composition
- Header: minimal chrome; token border bottom; no heavy shadows.
- Tabs: underlined; sticky beneath SpaceHeader; uses brand focus rings.
- Dock: 280–320px; collapses on md-; uses widget tiles.
- Content templates: 60/40 default; 65/35 variant for denser lists.

Navigation & State
- Feature flag `NAV_DETAIL_MODE`: 'sheet' (default) vs 'route' for post/event detail.
- Feed: list of BoardCards (announcement/standard/poll/event) with pin cluster.
- Calendar: List and Month views; one‑tap RSVP + undo; sheet for depth.
- About: members, governance, policies; surface role differences.

Responsive
- ≥ lg: header + tabs sticky; Dock visible.
- md–lg: Dock optional; header remains sticky; composer fixed bottom.
- < md: Dock hidden; tabs scrollable; composer bottom sheet for actions.

Motion
- Tab changes: 160–200ms fade/translate; reduced‑motion: opacity only.
- Detail sheet: 160–220ms slide‑in (desktop from right, mobile from bottom).

Storybook Plan
- Layouts/Spaces/Shell
  - Feed: default (posts present), empty state, with Dock.
  - Calendar: List, Month; RSVP interactions (mock handlers).
  - About: role‑aware sections (leader vs member preview).
  - Controls: NAV_DETAIL_MODE, layout ratio (60/40 vs 65/35), show/hide Dock.

Fixtures
- Use existing BoardCard stories and roster/card fixtures under `packages/ui/src/organisms/spaces`.
- Provide stub data for events and policies; wire RSVP/Join handlers to no‑ops.

Acceptance
- No layout shift when toggling Dock or switching tabs.
- Focus order is logical with skip link to content; tabs keyboard navigable.
- Reduced‑motion respected for tab/sheet transitions.
- Empty states use brand tone; pinned cluster shows ≤2 pins with expiry.

Open Decisions
- Default Dock widgets for MVP (Stories + Events first; Tools later).
- Whether About shows stories/widgets or stays content‑only.
- Ratio default per campus ops (60/40 vs 65/35).
