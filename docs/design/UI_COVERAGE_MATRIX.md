Status: Deferred (Reference Only)
Owner: Design System Guild
Last updated: 2025-10-16

# UI Coverage Matrix (Storybook + A11y + Tokens)

Purpose
- Backend‑First Execution is in effect (see AGENTS.md; TODO.md). Use this matrix as a design/QA reference only once backend contracts are stable. Do not use as the execution source of truth.

References
- Atoms coverage: docs/design/ATOMS_COVERAGE.md
- Storybook checklist: docs/design/STORYBOOK_CHECKLIST.md
- Platform scaffold: docs/design/PLATFORM_STORYBOOK_SCAFFOLD.md
- Spaces scaffold: docs/design/spaces/STORYBOOK_SCAFFOLD.md
- Shadcn catalog: docs/design/SHADCN_CATALOG.md
- Interaction contracts: docs/design/INTERACTION_CONTRACTS.md

Legend
- ✓ complete • ~ partial • ✕ missing

Global Rules (apply to all stories)
- Tokens only (no raw hex); surfaces/borders/rings use token classes.
- A11y: keyboard focus visible, ARIA roles/labels complete, SR hints present.
- Dials validated: density, elevation, glass, contrast, radius, motion.
- Reduced motion respected; transitions are GPU-friendly.
- Imports: use `@/atoms` or `@/index` (curated shadcn). No `@/components/ui/*` outside atoms.

Required Story Types
- Default (typical usage), States (hover/focus/disabled/error/loading), A11y (keyboard + SR), DialMatrix (compact/comfy/airy, high/low contrast, glass on/off).

Coverage Index (roll‑up)

| Layer      | Scope                                  | Status | Notes |
|------------|----------------------------------------|:------:|-------|
| Atoms      | docs/design/ATOMS_COVERAGE.md          |   ✓    | Canonical atoms covered; A11y stories added as needed |
| Molecules  | Tables below                           |   ~    | A11y gaps closed for core shadcn; several planned items remain |
| Organisms  | Tables below                           |   ~    | Spaces widgets need stories; header stories missing |
| App Shell  | Chrome / HiveSidebar / Sidebar07       |   ~    | Add aria-current + leader-gating demos |
| Docs       | Shadcn mapping + Interaction contracts |   ✓    | Present in Storybook and repo |

Shadcn/Hive Reference (Docs & A11y)
- Styling defaults: tokens for color/radius/glass/motion/density; focus ring 2px with offset.
- Storybook docs: Foundation/Shadcn Mapping, Foundation/Interaction Contracts.
- Repo docs: docs/design/SHADCN_CATALOG.md, docs/design/INTERACTION_CONTRACTS.md.
- A11y stories present: Select, Command, Dialog, Sheet, Dropdown Menu, Tabs. Pending: Toast, SelectNative.
- Policy: customize shadcn primitives with tokens; do not wrap primitives with new atoms (compose in molecules like FormField instead).

Product IA & Value Alignment
- Scope: This matrix stays UI‑focused (components, stories, A11y, tokens). We do not embed the full product architecture or KPIs here.
- Sources of truth: docs/design/UI_UX_IA_MASTER_PLAN.md, ROUTING.md, PLATFORM_LAYOUT_ARCHITECTURE.md, HIVE_IA_UX_STRATEGY.md
- Alignment hooks we validate in Storybook:
  - Navigation reflects IA via `nav-config.ts` with `aria-current="page"` on active items
  - Role/permission toggles (leader gating) demonstrated in shell stories
  - Optional value signals in story notes (e.g., EmptyState → “Create” CTA) — analytics specs live elsewhere

---

## Molecules — Status

| Molecule            | Impl | Default | States | A11y | Severity | Owner | Target | SB URL | Notes |
|---------------------|:----:|:------:|:-----:|:----:|:--------:|-------|:------:|-------|-------|
| FormField           |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    | States story added; ARIA auto-wired |
| FieldText           |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    | Chat-like composer; no atom wrappers |
| Select (shadcn)     |  ✓   |   ~    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    | Default covered via States/A11y |
| Combobox (Command)  |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    |  |
| Dialog (shadcn)     |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    |  |
| Sheet (shadcn)      |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    |  |
| DropdownMenu        |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    |  |
| Popover             |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | Re-export shadcn; stories added |
| Toast               |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added |
| Tabs (shadcn)       |  ✓   |   ✓    |   ✓   |  ✓   |   P1     | —     | Sprint |  —    |  |
| SegmentedControl    |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | RadioGroup-based implementation |
| Breadcrumb          |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added |
| TagInput            |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added (live announcements) |
| CheckboxGroup       |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added (group labelling) |
| SearchInput         |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | Clear action + icons |
| InlineNotice        |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | Variants + action slot |
| EmptyState          |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added |
| Toolbar             |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | Toolbar/Group/Spacer |
| Pagination          |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | Nav with aria-current |
| Accordion (shadcn)  |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    |  |
| Banner              |  ✓   |   ✓    |   ✓   |  ✓   |   P2     | —     | Sprint |  —    | A11y story added |
| AvatarCard          |  ✓   |   ✓    |   ✓   |  ✓   |   P3     | —     | Sprint |  —    | States + A11y stories added |
| Countdown           |  ✓   |   ✓    |   ✓   |  ✓   |   P3     | —     | Sprint |  —    | A11y (timer) story added |

## Organisms — Status

| Organism                             | Story | Severity | Owner | Target | SB URL | Notes |
|--------------------------------------|:-----:|:--------:|-------|:------:|-------|-------|
| StepperHeader                        |  ✓    |   P2     | —     | Sprint |  —    |  |
| OnboardingFrame                      |  ✓    |   P2     | —     | Sprint |  —    | Story added; supports gold accent |
| DashboardHeader                      |  ✓    |   P1     | —     | Sprint |  —    | Story added |
| ProfileHeader                        |  ✓    |   P2     | —     | Sprint |  —    | Story added |
| Toaster                              |  ✓    |   P2     | —     | Sprint |  —    | Story present |
| Auth/SignInCard                      |  ✓    |   P2     | —     | Sprint |  —    | Covered in Layouts.Auth.SignIn |
| Profile/Overview                     |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Profile/StatsStrip                   |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Profile/ActivityTimeline             |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Profile/ConnectionsPanel             |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Profile/RecommendationsPanel         |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Profile/PrivacyBanner                |  ✕    |   P3     | —     | Sprint |  —    | Add story |
| Spaces/AboutCard                     |  ✓    |   P2     | —     | Sprint |  —    | Story added |
| Spaces/EventsWidget                  |  ✓    |   P1     | —     | Sprint |  —    | Story added |
| Spaces/CommunityWidget               |  ✓    |   P1     | —     | Sprint |  —    | Story added |
| Spaces/ResourcesWidget               |  ✓    |   P1     | —     | Sprint |  —    | Story added |
| Spaces/ToolsWidget                   |  ✕    |   P1     | —     | Sprint |  —    | Add story |
| Spaces/BoardCard (Standard/Event/Poll) |  ✓  |   P2     | —     | Sprint |  —    |  |
| Spaces/Composer                      |  ✓    |   P2     | —     | Sprint |  —    |  |

## Organisms — Master Index

| Domain            | Organism               | Impl path                                                                   | Story | Notes |
|-------------------|------------------------|------------------------------------------------------------------------------|:-----:|-------|
| Global            | StepperHeader          | packages/ui/src/organisms/stepper-header.tsx                                |  ✓    |  |
| Global            | OnboardingFrame        | packages/ui/src/organisms/onboarding/onboarding-frame.tsx                   |  ✓    | Used in Layouts.Onboarding.Steps |
| Global            | DashboardHeader        | packages/ui/src/organisms/dashboard-header.tsx                               |  ✓    | Story present |
| Global            | Toaster                | packages/ui/src/organisms/toaster.tsx                                        |  ✓    | Story present |
| Auth              | SignInCard             | packages/ui/src/organisms/auth/sign-in-card.tsx                              |  ✓    | Covered in Layouts.Auth.SignIn |
| Profile           | ProfileHeader          | packages/ui/src/organisms/profile/profile-header.tsx                         |  ✓    | Story present |
| Profile           | ProfileOverview        | packages/ui/src/organisms/profile/profile-overview.tsx                       |  ✓    | Story present |
| Profile           | ProfileStatsStrip      | packages/ui/src/organisms/profile/profile-stats-strip.tsx                    |  ✓    | Story present |
| Profile           | ActivityTimeline       | packages/ui/src/organisms/profile/profile-activity-timeline.tsx              |  ✓    | Story present |
| Profile           | ConnectionsPanel       | packages/ui/src/organisms/profile/profile-connections-panel.tsx              |  ✓    | Story present |
| Profile           | RecommendationsPanel   | packages/ui/src/organisms/profile/profile-recommendations-panel.tsx          |  ✓    | Story present |
| Profile           | PrivacyBanner          | packages/ui/src/organisms/profile/profile-privacy-banner.tsx                 |  ✓    | Story present |
| Spaces            | SpaceHeader            | packages/ui/src/organisms/spaces/space-header.tsx                            |  ✓    | Story present |
| Spaces            | SpaceLayout            | packages/ui/src/organisms/spaces/space-layout.tsx                            |  ✓    | Dedicated story: packages/ui/src/stories/Spaces.SpaceLayout.stories.tsx |
| Spaces            | AboutSection           | packages/ui/src/organisms/spaces/about-section.tsx                           |  ✓    | Story present |
| Spaces            | CalendarMonth          | packages/ui/src/organisms/spaces/calendar-month.tsx                          |  ✓    | Story present |
| Spaces            | CalendarList           | packages/ui/src/organisms/spaces/calendar-list.tsx                           |  ✓    | Story present |
| Spaces            | EventDetail            | packages/ui/src/organisms/spaces/event-detail.tsx                            |  ✓    | Dedicated story: packages/ui/src/stories/Spaces.EventDetail.stories.tsx |
| Spaces            | MembersRoster          | packages/ui/src/organisms/spaces/members-roster.tsx                          |  ✓    | Story present |
| Spaces            | ModerationQueue        | packages/ui/src/organisms/spaces/moderation-queue.tsx                        |  ✓    | Dedicated story: packages/ui/src/stories/Spaces.ModerationQueue.stories.tsx |
| Spaces            | ToolsCatalog           | packages/ui/src/organisms/spaces/tools-catalog.tsx                           |  ✓    | Dedicated story: packages/ui/src/stories/Spaces.ToolsCatalog.stories.tsx |
| Spaces            | Dock (ContextRail)     | packages/ui/src/organisms/spaces/context-rail.tsx                            |  ✓    | Story present |
| Spaces            | PinnedCluster          | packages/ui/src/organisms/spaces/pinned-cluster.tsx                          |  ✓    | Story present |
| Spaces (Widgets)  | EventsWidget           | packages/ui/src/organisms/spaces/widgets/events-widget.tsx                   |  ✓    | Story present |
| Spaces (Widgets)  | CommunityWidget        | packages/ui/src/organisms/spaces/widgets/community-widget.tsx                |  ✓    | Story present |
| Spaces (Widgets)  | ResourcesWidget        | packages/ui/src/organisms/spaces/widgets/resources-widget.tsx                |  ✓    | Story present |
| Spaces (Widgets)  | ToolsWidget            | packages/ui/src/organisms/spaces/widgets/tools-widget.tsx                    |  ✓    | Dedicated story: packages/ui/src/stories/Spaces.ToolsWidget.stories.tsx |
| Spaces (Board)    | BoardCard — Standard   | packages/ui/src/organisms/spaces/board-card-standard.tsx                     |  ✓    | Story present |
| Spaces (Board)    | BoardCard — Event      | packages/ui/src/organisms/spaces/board-card-event.tsx                        |  ✓    | Story present |
| Spaces (Board)    | BoardCard — Poll       | packages/ui/src/organisms/spaces/board-card-poll.tsx                         |  ✓    | Story present |
| Feed & Rituals    | PostCard               | —                                                                            |  ✕    | Define anatomy + story |
| Feed & Rituals    | Ritual flow            | —                                                                            |  ✕    | Wizard + tracker components |
| HiveLab           | ToolWidget             | packages/ui/src/organisms/hivelab/widgets/tool-widget.tsx                    |   ~    | Space-installed tool widget; story: HiveLab.ToolWidget |
| HiveLab           | ToolShelfWidget        | packages/ui/src/organisms/hivelab/widgets/tool-shelf-widget.tsx              |   ~    | Installed tools shelf; story: HiveLab.ToolShelfWidget |
| HiveLab           | TemplateBrowser        | packages/ui/src/organisms/hivelab/template-browser.tsx                       |   ~    | Templates gallery; story: HiveLab.TemplateBrowser |
| HiveLab           | ToolHeader             | packages/ui/src/organisms/hivelab/tool-header.tsx                            |   ~    | Builder top bar; story: HiveLab.ToolHeader |
| HiveLab           | ElementLibrary         | —                                                                            |  ✕    | Palette retired; rebuilt library TBD |
| HiveLab           | Canvas (FlowCanvas)    | packages/ui/src/organisms/hivelab/flow-canvas.tsx                           |   ~    | Product-first canvas (nodes + edges). Stories: HiveLab.Canvas |
| HiveLab           | BuilderCanvas          | packages/ui/src/organisms/hivelab/builder-canvas.tsx                        |   ~    | Legacy grid/pan/zoom; kept for compatibility |
| HiveLab           | ToolEditor             | —                                                                            |  ✕    | Compose canvas + property wiring |
| HiveLab           | PropertiesPanel        | —                                                                            |  ✕    | Inspector removed; rebuild with new canvas |
| HiveLab           | VisibilityControls     | —                                                                            |  ✕    | Draft/campus/public gating controls |
| HiveLab           | PublishFlow            | —                                                                            |  ✕    | Review/confirm/publish wizard |
| HiveLab           | CollaboratorsList      | —                                                                            |  ✕    | Manage builder collaborators + invites |
| HiveLab           | DraftsList             | —                                                                            |  ✕    | Saved drafts workspace |
| HiveLab           | ToolUsageWidget        | packages/ui/src/organisms/hivelab/widgets/tool-usage-widget.tsx              |   ~    | Usage trend widget (area chart); story: HiveLab.ToolUsageWidget |
| HiveLab           | FeedbackList           | —                                                                            |  ✕    | Feedback/comments stream |
| HiveLab           | PlacementConfigurator  | —                                                                            |  ✕    | Select composer verbs + placements |
| HiveLab           | AutoSummaryToggle      | —                                                                            |  ✕    | Digest automation controls |
| HiveLab           | RemovalHygiene         | —                                                                            |  ✕    | Uninstall/offboarding messaging |

## App Shell — Status

| Story                 | Status | Severity | Owner | Target | SB URL | Notes |
|-----------------------|:------:|:--------:|-------|:------:|-------|-------|
| Layouts/Chrome        |   ✓    |   P2     | —     | Sprint |  —    |  |
| Layouts/HiveSidebar   |   ✓    |   P1     | —     | Sprint |  —    | Add aria-current + leader gating demos |
| Layouts/Sidebar07     |   ✓    |   P1     | —     | Sprint |  —    | Canonical (Decision 0001) |
| aria-current demo     |   ✕    | Blocker  | —     | Sprint |  —    | Add active route example |

Shell — Decision

| Topic            | Decision                          | ADR                                      | Status   |
|------------------|-----------------------------------|------------------------------------------|----------|
| App Shell pattern| Use shadcn “Sidebar‑07” primitives| docs/design/decisions/0001-app-shell-sidebar07.md | Approved |

---

## Domain Slices — Coverage & Decisions

### Spaces — Surfaces

| Surface                                  | Default | States | A11y | DialMatrix | Notes |
|------------------------------------------|:------:|:-----:|:----:|:---------:|-------|
| Home — first‑time                        |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Home — established                       |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Overview (Hub 65/35 split)               |   ✓    |   ✕   |  ✕   |     ✕     | SpaceLayout story covers default; add States/A11y/Dials |
| Activity — Composer (space)              |   ✓    |   ✕   |  ✕   |     ✕     | packages/ui/src/stories/Spaces.Composer.stories.tsx |
| Activity — Filters                       |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Activity — Post list                     |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Members — Directory                      |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Members — Pending                        |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Members — Moderation alerts              |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tools — Grid                             |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tools — Empty                            |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tools — Integration banner               |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Settings — General                       |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Settings — Roles/Permissions             |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Settings — Danger zone                   |   ✕    |   ✕   |  ✕   |     ✕     |  |

### Spaces — Organisms

| Organism        | Impl path                                                                 | Story | A11y | Notes |
|-----------------|---------------------------------------------------------------------------|:-----:|:---:|-------|
| SpaceHeader     | packages/ui/src/organisms/spaces/space-header.tsx                         |  ✓    |  ✕  | Stories present; add A11y (landmarks, aria) |
| SpaceLayout     | packages/ui/src/organisms/spaces/space-layout.tsx                         |  ✓    |  ✕  | Dedicated story: packages/ui/src/stories/Spaces.SpaceLayout.stories.tsx |
| AboutCard       | packages/ui/src/organisms/spaces/about-section.tsx                        |  ✓    |  ✕  | Stories present; add A11y (region labeling) |
| CalendarMonth   | packages/ui/src/organisms/spaces/calendar-month.tsx                       |  ✓    |  ✕  | Stories present; add keyboard nav story |
| CalendarList    | packages/ui/src/organisms/spaces/calendar-list.tsx                        |  ✓    |  ✕  | Stories present; add list semantics |
| EventDetail     | packages/ui/src/organisms/spaces/event-detail.tsx                         |  ✓    |  ✕  | Dedicated story: packages/ui/src/stories/Spaces.EventDetail.stories.tsx |
| MembersRoster   | packages/ui/src/organisms/spaces/members-roster.tsx                       |  ✓    |  ✕  | Stories present; add table/grid roles |
| ModerationQueue | packages/ui/src/organisms/spaces/moderation-queue.tsx                     |  ✓    |  ✕  | Dedicated story: packages/ui/src/stories/Spaces.ModerationQueue.stories.tsx |
| ToolsCatalog    | packages/ui/src/organisms/spaces/tools-catalog.tsx                        |  ✓    |  ✕  | Dedicated story: packages/ui/src/stories/Spaces.ToolsCatalog.stories.tsx |
| Dock (ContextRail)     | packages/ui/src/organisms/spaces/context-rail.tsx                  |  ✓    |  ✕  | Stories present; ensure complementary landmark |
| PinnedCluster   | packages/ui/src/organisms/spaces/pinned-cluster.tsx                       |  ✓    |  ✕  | Stories present; add A11y |
| EventsWidget    | packages/ui/src/organisms/spaces/widgets/events-widget.tsx                |  ✓    |  ✕  | Stories present; add A11y story (list + buttons) |
| CommunityWidget | packages/ui/src/organisms/spaces/widgets/community-widget.tsx             |  ✓    |  ✕  | Stories present; add A11y story (avatars alt, live regions off) |
| ResourcesWidget | packages/ui/src/organisms/spaces/widgets/resources-widget.tsx             |  ✓    |  ✕  | Stories present; add A11y story (links list) |
| ToolsWidget     | packages/ui/src/organisms/spaces/widgets/tools-widget.tsx                 |  ✓    |  ✕  | Dedicated story: packages/ui/src/stories/Spaces.ToolsWidget.stories.tsx |
| BoardCard Std   | packages/ui/src/organisms/spaces/board-card-standard.tsx                  |  ✓    |  ✕  | Stories present; add semantics |
| BoardCard Event | packages/ui/src/organisms/spaces/board-card-event.tsx                     |  ✓    |  ✕  | Stories present; correct path |
| BoardCard Poll  | packages/ui/src/organisms/spaces/board-card-poll.tsx                      |  ✓    |  ✕  | Stories present; correct path |

#### Spaces — Layout Focus (Hub Model)

What we validate for SpaceLayout and dependent organisms when using the Sidebar07 app shell and a Hub‑style split.

- Split and responsiveness
  - 65/35 desktop split (feed/Dock) using tokens for spacing and hairline borders
  - Single column on mobile; widgets accessible via `Sheet` trigger (floating FAB)
  - Sticky header under app shell; respects density classes and `--header-h`
- Navigation and semantics
  - H1 in `SpaceHeader`; sub‑nav/tabs under header with `aria-current="page"`
  - `aside[aria-label="Context"]` for the Dock (right-side); `main` for feed
  - Keyboard reachable composer and filter tabs; no keyboard traps
- Composer and creation flow
  - Adaptive Create menu: Post • Event • Poll • Announcement (leader‑gated)
  - Empty/first‑time state CTA aligns to creation focus
- Widgets (Dock)
  - EventsWidget: list semantics, RSVP button labels, view‑all affordance
  - CommunityWidget: online count, recent members list with avatar alt text
  - ResourcesWidget: links list with external indicators where relevant
  - ToolsWidget: leader controls gated; peek variant for Dock
- States and dials
  - Stories for Default, States, A11y, DialMatrix (density/elevation/glass/contrast)
  - Loading and empty states for feed and each widget
- Performance
  - Virtualized post list threshold; avoid expensive reflows; GPU‑friendly transitions
  - SSR‑safe stories (no window access outside effects)

### Spaces — Molecule dependencies

| Molecule           | Status | Notes |
|--------------------|:------:|-------|
| FormField          |   ✓    | States + A11y present |
| FieldText          |   ✓    | Chat-like composer present |
| Select             |   ✓    | A11y story present |
| Combobox (Command) |   ✓    | A11y story present |
| Tabs               |   ✓    | A11y story present |
| SegmentedControl   |   ✓    | Present |
| DropdownMenu       |   ✓    | A11y story present |
| Popover            |   ✓    | Present |
| InlineNotice       |   ✓    | Present |
| EmptyState         |   ✓    | States story added |
| Toolbar            |   ✓    | Present |

### Spaces — Decisions

| Topic                               | Options                                 | Status   | Owner |
|-------------------------------------|------------------------------------------|----------|-------|
| Space detail navigation              | Tabs under header vs sticky subnav       | Proposed | —     |
| Events info density                  | Compact list vs card with meta emphasis  | Proposed | —     |
| Role chips style                     | Badge variants by space type             | Proposed | —     |
| Join/Leave affordance                | Outline button vs subtle link+menu       | Proposed | —     |

### HiveLab — Surfaces

| Surface                          | Default | States | A11y | DialMatrix | Notes |
|----------------------------------|:------:|:-----:|:----:|:---------:|-------|
| Tools Catalog                    |   ✕    |   ✕   |  ✕   |     ✕     | Cards, filters, status |
| Tool Detail — Run                |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tool Detail — Edit               |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tool Detail — Deploy             |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Tool Detail — Settings           |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Template Browser                 |   ~    |   ✕   |  ✕   |     ✕     | Grid, filter, empty |
| Properties Panel                 |   ~    |   ✕   |  ✕   |     ✕     | Sections, validation, errors |
| Analytics Panel                  |   ~    |   ✕   |  ✕   |     ✕     | Charts, empty, loading |

### HiveLab — Organisms

| Organism              | Story | Notes |
|-----------------------|:-----:|-------|
| ToolWidget            |  ~    | Space-installed widget story (HiveLab.ToolWidget) |
| ToolShelfWidget       |  ~    | Installed tools shelf story (HiveLab.ToolShelfWidget) |
| TemplateBrowser       |  ~    | Templates gallery story delivered |
| ToolHeader            |  ~    | Builder header story delivered |
| ElementLibrary        |  ✕    | Palette retired; rebuild TBD |
| Canvas (FlowCanvas)   |  ~    | Product-first canvas stories (Default/Layouts/A11y) — HiveLab.Canvas |
| BuilderCanvas         |  ~    | Legacy grid story (HiveLab.BuilderCanvas) |
| ToolEditor            |  ✕    | Compose canvas + property wiring |
| PropertiesPanel       |  ✕    | Inspector removed; rebuild with new canvas |
| VisibilityControls    |  ✕    | Draft/campus/public gating controls |
| PublishFlow           |  ✕    | Review → confirm → success wizard |
| CollaboratorsList     |  ✕    | Manage builder collaborators + invites |
| DraftsList            |  ✕    | Saved drafts workspace |
| ToolUsageWidget       |  ~    | Usage area chart widget story |
| FeedbackList          |  ✕    | Feedback/comments stream |
| PlacementConfigurator |  ✕    | Select composer verbs + placements |
| AutoSummaryToggle     |  ✕    | Digest automation controls |
| RemovalHygiene        |  ✕    | Uninstall/offboarding messaging |

### HiveLab — Molecule dependencies

| Molecule        | Status | Notes |
|-----------------|:------:|-------|
| Combobox        |   ✓    | A11y story present |
| DropdownMenu    |   ✓    | A11y story present |
| Tabs            |   ✓    | A11y story present |
| InlineNotice    |   ✓    | Present |
| EmptyState      |   ✓    | States + A11y present |
| Toolbar         |   ✓    | Present |
| Pagination      |   ✓    | Present |
| Popover         |   ✓    | Present |
| Tooltip         |   ✓    |  |
| Dialog/Sheet    |   ✓    | A11y stories present |

### HiveLab — Decisions

| Topic                         | Options                          | Status   | Owner |
|-------------------------------|-----------------------------------|----------|-------|
| Tool card density/hierarchy   | Compact vs spacious info blocks   | Proposed | —     |
| Inline code usage in props    | Always vs contextual              | Proposed | —     |
| Analytics viz library         | Recharts vs VisX vs ECharts       | Proposed | —     |

### Feed & Rituals — Surfaces

| Surface                       | Default | States | A11y | DialMatrix | Notes |
|-------------------------------|:------:|:-----:|:----:|:---------:|-------|
| Global Feed (timeline)        |   ✕    |   ✕   |  ✕   |     ✕     | Empty/error/skeleton variants |
| Composer — Global             |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Composer — Space              |   ✓    |   ✕   |  ✕   |     ✕     | Spaces.Composer.stories.tsx |
| Rituals — Create wizard       |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Rituals — Schedule            |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Rituals — Milestone track     |   ✕    |   ✕   |  ✕   |     ✕     |  |

### Feed & Rituals — Organisms

| Organism    | Story | Notes |
|-------------|:-----:|-------|
| PostCard    |  ✕    | Announcement/standard/moderated |
| Ritual flow |  ✕    | Wizard + tracker components |

### Feed & Rituals — Molecule dependencies

| Molecule        | Status | Notes |
|-----------------|:------:|-------|
| InlineNotice    |   ✓    | Present |
| Dialog/Sheet    |   ✓    | A11y stories present |
| DropdownMenu    |   ✓    | A11y story present |
| Toolbar         |   ✓    | Present |
| TagInput        |   ✓    | States + A11y present |
| SearchInput     |   ✓    | Present |
| Pagination      |   ✓    | Present |

### Feed & Rituals — Decisions

| Topic                         | Options                          | Status   | Owner |
|-------------------------------|-----------------------------------|----------|-------|
| Reactions style               | Icon‑only vs with counts          | Proposed | —     |
| Composer attachments          | Inline toolbar vs overflow menu   | Proposed | —     |
| Post moderation affordances   | Iconography + copy variants       | Proposed | —     |

### Profile — Surfaces

| Surface            | Default | States | A11y | DialMatrix | Notes |
|--------------------|:------:|:-----:|:----:|:---------:|-------|
| Profile/Header     |   ✕    |   ✕   |  ✕   |     ✕     | Impl exists |
| Profile/Overview   |   ✕    |   ✕   |  ✕   |     ✕     |  |
| Profile/Connections|   ✕    |   ✕   |  ✕   |     ✕     |  |
| Profile/Activity   |   ✕    |   ✕   |  ✕   |     ✕     |  |

### Profile — Organisms

| Organism                | Story | Notes |
|-------------------------|:-----:|-------|
| ProfileHeader           |  ✕    |  |
| ProfileOverview         |  ✕    |  |
| ProfileConnectionsPanel |  ✕    |  |

### Profile — Molecule dependencies

| Molecule        | Status | Notes |
|-----------------|:------:|-------|
| Tabs            |   ✓    | A11y story present |
| DropdownMenu    |   ✓    | A11y story present |
| InlineNotice    |   ✕    | Implement |
| EmptyState      |   ~    | Story added |
| Toolbar         |   ✕    | Implement |

---

Validation & Review Process

Commands

| Purpose                | Command |
|------------------------|---------|
| Storybook (local)      | `pnpm --filter @hive/ui storybook` |
| Token lint (no hex)    | `pnpm lint:tokens` |
| Import guard (atoms)   | `pnpm lint:ui-imports` |
| Typecheck              | `pnpm typecheck` |
| Lint (UI)              | `pnpm lint` |

Review Queue (Top 10)

| # | Item                                           | Owner | Status | Notes |
|---|------------------------------------------------|-------|:------:|-------|
| 1 | Spaces/SpaceLayout A11y + DialMatrix           |  —    |   ✕    | Landmarks, aria-current, density/elevation/glass/contrast |
| 2 | Spaces/EventsWidget A11y story                 |  —    |   ✕    | List semantics, RSVP button labels |
| 3 | Spaces/CommunityWidget A11y story              |  —    |   ✕    | Avatar alt text, recent list semantics |
| 4 | Spaces/ResourcesWidget A11y story              |  —    |   ✕    | Links list, external indicators |
| 5 | Spaces/ToolsWidget A11y + States               |  —    |   ✕    | Leader gating, empty/loading |
| 6 | App Shell aria-current + leader gating demos   |  —    |   ✕    | Add examples in Layouts/HiveSidebar |
| 7 | Molecules/FieldText implement + story          |  —    |   ✕    | Wire into FormField |
| 8 | Molecules/InlineNotice implement               |  —    |   ✕    | Map tones to tokens |
| 9 | Feed/PostCard stories                          |  —    |   ✕    | Announcement/standard/moderated |
|10 | SegmentedControl implement + stories           |  —    |   ✕    | RadioGroup-based |

Decision Record (template)

| Field       | Value |
|-------------|-------|
| Component   | <name> |
| Decision    | <short description> |
| Options     | <A / B / C> |
| Rationale   | <1–2 lines> |
| Status      | Proposed / Approved / Archived |
| Owner       | <name> |
