# HIVE Component Library — Spaces + HiveLab Build Plan & Checklist (v2 - RESET)
Status: Deferred (Reference Only)
Process override: Backend‑First Execution is in effect (see AGENTS.md; TODO.md). Use this document as a design reference only. Do not treat these items as execution tasks until backend contracts and APIs are locked for the corresponding slice.

> **Status as of Jan 2025**: Previous V5 implementation built vertical slices instead of proper component library. This is a RESET to build bottom-up properly.

> Scope: concrete backlog to complete the Spaces and HiveLab UI libraries, aligned to tokens, shadcn v7 primitives, and domain data contracts. Storybook is the acceptance gate for every item listed.

---

## 0) Foundation Documents (READ FIRST)

Terminology Note
- Product/IA uses the term "post" (see `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`). Where this checklist references "BoardCard", map to Post components (e.g., PostCard). Code may retain legacy names until migration; do not introduce new shapes without server contracts.

**Before building ANY component, read**:

1. **[UI Design & UX Psychology Foundation](./UI_DESIGN_PSYCHOLOGY_FOUNDATION.md)** ⭐ **REQUIRED**

   - Target audience: College students (Gen Z, 18-24)
   - UX psychology: Cognitive load, social proof, FOMO, friction
   - Visual aesthetic: "Tech sleek, campus warm" (neutral + gold)
   - Mobile-first constraints (thumb zones, safe areas)
   - Accessibility as default (WCAG 2.1 AA)

2. **Component Design Principles** (from Foundation doc):
   - ✅ 7 states required: default, hover, active, disabled, loading, empty, error
   - ✅ Social proof indicators: "23 people viewed this", avatars
   - ✅ One-tap actions: No confirmation dialogs
   - ✅ Chromium aesthetic: Neutral surfaces, hairline borders, subtle elevation
   - ✅ Gold sparingly: Primary CTA only, verification, pinned content
   - ❌ No icon-only buttons, no rainbow colors, no decoration shadows

## 0.1) Build Principles

- ✅ Build on existing shell (shadcn v7) and tokens/dials (density, elevation, contrast, glass, motion).
- ⚠️ Components accept typed domain snapshots; no ad‑hoc shapes. **PARTIAL** - types exist but components don't match
- ❌ Every component ships with: states, a11y pass, skeleton/empty/error, analytics hooks, and stories. **MISSING**
- ⭐ **NEW**: Every component must pass UX psychology checklist (see Foundation doc, Section 9)

---

## 1) Data Contracts (coupling)

### Current State

- ✅ **Types defined** at `packages/ui/src/organisms/spaces/types.ts`:
  - Space, SpaceMember, CalendarEvent
  - BasePost + variants (StandardPost, EventPost, PollPost, AnnouncementPost, FormPost, TrackerPost, CheckInPost, DigestPost)
  - Visibility, JoinPolicy, PostingPolicy, MemberRole, RSVPStatus

### Missing Alignment

- ❌ Components don't properly consume `SpacePostSnapshot` (server-side enriched format)
- ✅ Serializer contract locked via `serializePost` (`apps/web/src/server/spaces/__tests__/space-serializer.contract.test.ts:1`)
- ❌ HiveLab tool contracts not defined

---

## 2) Spaces — Component Backlog

### 2.1 Foundation Components (Atoms → Molecules)

**Status Legend**: ✅ Done | ⚠️ Partial | ❌ Missing | 🔄 Needs Rebuild

- **BoardCard Base Shell** ❌ **NEEDS BUILD**
  - [ ] Base component with slots (meta bar, body, actions, badges)
  - [ ] Pinned chip with countdown timer
  - [ ] Moderation status chips (hidden, flagged, removed)
  - [ ] Visibility badge (campus vs members-only)
  - [ ] Author meta bar (avatar, name, handle, role badge, timestamp)
  - [ ] Action bar (react, comment, share, report)
  - [ ] States: default, hover, active, disabled, skeleton
  - [ ] Story: `Spaces/Atoms/BoardCard.Base` (all states + variants)

### 2.2 BoardCard Variants (Build on Base)

- **BoardCard.Standard** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic text content rendering
  - [ ] Attachment types: image grid (1-4), file list, link preview, video embed
  - [ ] Skeleton state
  - [ ] Empty body fallback
  - [ ] Character limit indicator
  - [ ] Edit history indicator
  - [ ] Story: `Spaces/BoardCards/Standard` ⚠️ exists but incomplete

- **BoardCard.Event** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic event display (title, time, location)
  - [x] RSVP buttons (going, maybe)
  - [ ] States: upcoming/active/ended with visual differentiation
  - [ ] Waitlist UI when maxAttendees reached
  - [ ] Check-in button with time window validation
  - [ ] QR code affordance
  - [ ] Co-host avatars
  - [ ] Skeleton state
  - [ ] Story: `Spaces/BoardCards/Event` ⚠️ exists but incomplete

- **BoardCard.Poll** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic question + options display
  - [x] Vote buttons
  - [ ] Results visualization (bar charts)
  - [ ] Anonymity indicator
  - [ ] Open/closed state badge
  - [ ] Vote count + percentage
  - [ ] User's vote highlight
  - [ ] Skeleton state
  - [ ] Story: `Spaces/BoardCards/Poll` ⚠️ exists but incomplete

- **BoardCard.Announcement** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic announcement display
  - [ ] Priority styling (low, normal, high) with gold accent
  - [ ] Expiry countdown
  - [ ] Acknowledgment button + count
  - [ ] "Leader" badge prominence
  - [ ] Story: `Spaces/BoardCards/Announcement` ❌ missing

- **BoardCard.Form** ❌ **NOT BUILT**

  - [ ] Form title + description
  - [ ] Field count indicator (max 12)
  - [ ] Submit button with validation state
  - [ ] Result visibility chip (open, closed, results-hidden)
  - [ ] Submission count
  - [ ] User's submission status
  - [ ] Skeleton state
  - [ ] Story: `Spaces/BoardCards/Form` ❌ missing

- **BoardCard.Tracker** ❌ **NOT BUILT**

  - [ ] Counter display (e.g., "$450 / $1000")
  - [ ] Progress bar
  - [ ] Increment/decrement buttons (if editable)
  - [ ] Type indicators (dues, hours, attendance)
  - [ ] Skeleton state
  - [ ] Story: `Spaces/BoardCards/Tracker` ❌ missing

- **BoardCard.CheckIn** ❌ **NOT BUILT**

  - [ ] Time window display (e.g., "Check-in opens in 15 min")
  - [ ] QR code button when active
  - [ ] Check-in count + participant avatars
  - [ ] States: upcoming, active, ended
  - [ ] Skeleton state
  - [ ] Story: `Spaces/BoardCards/CheckIn` ❌ missing

- **BoardCard.Digest** ⚠️ **EXISTS - NEEDS STATES**
  - [x] Basic digest display
  - [ ] Bundled posts preview (3-5 items)
  - [ ] "Today's Activity" label with date
  - [ ] Expand affordance
  - [ ] Source tool badge
  - [ ] Story: `Spaces/BoardCards/Digest` ❌ missing

### 2.3 Composition Components

- **PinnedCluster** ⚠️ **EXISTS - NEEDS REBUILD**

  - [x] Basic pinned post display
  - [ ] 0/1/2 variants with layout shift prevention
  - [ ] Countdown timer for pin expiry
  - [ ] Collapse/expand for 2+ pinned
  - [ ] Gold accent border
  - [ ] Story: `Spaces/Composition/PinnedCluster` ⚠️ exists but incomplete

- **ComposerActions** ⚠️ **EXISTS - NEEDS REBUILD**

  - [x] Basic action buttons
  - [ ] Max 6 verbs with dropdown if >6
  - [ ] Leader-only actions gated
  - [ ] Tool-added verbs with badges
  - [ ] Type-aware defaults (e.g., event → calendar icon)
  - [ ] Story: `Spaces/Composition/Composer` ⚠️ exists but incomplete

- **ActivityFilters** ❌ **NOT BUILT**
  - [ ] Filter tabs: All, Announcements, Events, Tools
  - [ ] Keyboard navigation (arrow keys + enter)
  - [ ] Active state with underline
  - [ ] Count badges per filter
  - [ ] Story: `Spaces/Composition/Filters` ❌ missing

### 2.4 Dock Widgets (right-side)

- **EventsWidget** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic event list
  - [x] RSVP buttons
  - [x] Click-through to calendar
  - [ ] Empty state ("No upcoming events")
  - [ ] Skeleton loading state
  - [ ] Leader "Create Event" button
  - [ ] Story: `Spaces/Widgets/Events` ❌ missing (V5.stories has it embedded)

- **CommunityWidget** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Online members grid
  - [x] Click-through to roster
  - [ ] Empty state ("No members online")
  - [ ] Skeleton loading state
  - [ ] Leaders/mods first sorting
  - [ ] Presence indicators (green dot)
  - [ ] Story: `Spaces/Widgets/Community` ❌ missing (V5.stories has it embedded)

- **ResourcesWidget** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Resource list (links, files)
  - [x] Click-through to full resources page
  - [ ] Empty state ("No resources shared")
  - [ ] Skeleton loading state
  - [ ] Pinned resources first
  - [ ] File type icons
  - [ ] Story: `Spaces/Widgets/Resources` ❌ missing (V5.stories has it embedded)

- **ToolsWidget** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Tool list preview
  - [x] Click-through to tools catalog
  - [ ] Empty state ("No tools installed")
  - [ ] Skeleton loading state
  - [ ] Tool usage metrics (sparklines)
  - [ ] Story: `Spaces/Widgets/Tools` ❌ missing (V5.stories has it embedded)

- **AboutCard** ⚠️ **EXISTS - NEEDS REBUILD**

  - [x] Basic description display
  - [ ] Tags (max 5) with Tailwind badge styling
  - [ ] Important links (max 3)
  - [ ] Verification badge
  - [ ] Edit button (leaders only)
  - [ ] Empty state ("No description yet")
  - [ ] Story: `Spaces/Widgets/About` ⚠️ exists but incomplete

- **Mobile Sheet Variants** ❌ **NOT BUILT**
  - [ ] Sheet wrapper for all widgets on mobile
  - [ ] Swipe-to-close gesture
  - [ ] Story: `Spaces/Widgets/Mobile` ❌ missing

### 2.5 Layout & Shell (Organisms)

- **SpaceHeader** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic header with space name, avatar
  - [ ] Type badge (student_org, university_org, greek, residential)
  - [ ] Verification badge
  - [ ] Join/Leave CTA with loading state
  - [ ] Share/Report dropdown
  - [ ] Policy chips (visibility, join policy, posting policy)
  - [ ] Claim banner for unclaimed RSS spaces
  - [ ] Story: `Spaces/Layout/Header` ⚠️ exists but incomplete

- **SpaceLayout** ⚠️ **EXISTS - WRONG APPROACH**

  - [x] Basic 70/30 layout (V5)
  - [ ] **REBUILD**: Proper 60/40 split (main board, Dock)
  - [ ] Sticky header with CSS var offset
  - [ ] Safe area insets for mobile
  - [ ] Responsive breakpoints (sm, md, lg)
  - [ ] Skeleton layout matching structure
  - [ ] Story: `Spaces/Layout/Shell` 🔄 needs rebuild

- **Dock (legacy: ContextRail)** ⚠️ **EXISTS - NEEDS REFACTOR**
  - [x] Basic widget stacking
  - [ ] Sticky positioning
  - [ ] Collapse/expand for mobile
  - [ ] Widget priority ordering
  - [ ] Story: `Spaces/Layout/Dock` (formerly ContextRail) ⚠️ exists but incomplete

### 2.6 Full Modules (Page-level organisms)

- **AboutSection** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic view mode
  - [ ] Edit mode (leaders only)
  - [ ] Tags CRUD (max 5)
  - [ ] Links CRUD (max 3 important links)
  - [ ] Version history placeholder
  - [ ] Empty state
  - [ ] Story: `Spaces/Modules/About` ⚠️ exists but incomplete

- **CalendarMonth** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic month view
  - [ ] Event dot indicators
  - [ ] Click date to see day's events
  - [ ] Navigation (prev/next month)
  - [ ] Story: `Spaces/Modules/Calendar` ⚠️ exists but incomplete

- **CalendarList** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic event list
  - [ ] Filter: upcoming, past, my RSVPs
  - [ ] Empty state
  - [ ] Skeleton state
  - [ ] Story: `Spaces/Modules/Calendar` ⚠️ exists but incomplete

- **MembersRoster** ⚠️ **EXISTS - NEEDS STATES**

  - [x] Basic member list
  - [ ] Table/grid view toggle
  - [ ] Role chips (leader, moderator, member)
  - [ ] Search functionality
  - [ ] DM button hooks
  - [ ] Skeleton state
  - [ ] Story: `Spaces/Modules/Members` ⚠️ exists but incomplete

- **ModerationQueue** ⚠️ **EXISTS - NEEDS REBUILD**

  - [x] Basic report list structure
  - [ ] Actions: remove, warn, mute, ban
  - [ ] Confirmation dialogs
  - [ ] Audit log hooks
  - [ ] Alert stack UI
  - [ ] Escalate badges
  - [ ] Story: `Spaces/Modules/Moderation` ❌ missing

- **ToolsCatalog** ⚠️ **EXISTS - NEEDS REBUILD**

  - [x] Basic tool list structure
  - [ ] Tool cards with state tones (active, disabled)
  - [ ] Install/uninstall buttons
  - [ ] Integration banner (success/failure)
  - [ ] Empty state ("No tools installed")
  - [ ] Story: `Spaces/Modules/Tools` ❌ missing

- **Settings Modules** ❌ **NOT BUILT**

  - [ ] Settings.General (name, slug, privacy, validation)
  - [ ] Settings.RolesPermissions (permission matrix + tooltips)
  - [ ] Settings.DangerZone (archive/delete/transfer dialogs)
  - [ ] Story: `Spaces/Modules/Settings` ❌ missing

- **Analytics Panels** ❌ **NOT BUILT**

  - [ ] Space health metrics
  - [ ] Events funnel visualization
  - [ ] Tools performance placeholders
  - [ ] Story: `Spaces/Modules/Analytics` ❌ missing

- **EventDetail** ⚠️ **EXISTS - NEEDS STATES**
  - [x] Basic event display
  - [ ] Full description + attachments
  - [ ] RSVP list (going, maybe, waitlist)
  - [ ] Check-in interface
  - [ ] Co-host management
  - [ ] Story: `Spaces/Modules/EventDetail` ❌ missing

### 2.7 Cross-cutting UI States

- **Empty States** ❌ **NOT SYSTEMATIZED**

  - [ ] Generic empty state component
  - [ ] Module-specific empty messages:
    - [ ] "No posts yet" (feed)
    - [ ] "No upcoming events" (calendar)
    - [ ] "No members online" (community)
    - [ ] "No resources shared" (resources)
    - [ ] "No tools installed" (tools)
  - [ ] Story: `Spaces/States/Empty` ❌ missing

- **Skeleton States** ❌ **NOT SYSTEMATIZED**

  - [ ] BoardCard skeleton
  - [ ] Widget skeleton (events, members, resources)
  - [ ] Layout skeleton (60/40 grid)
  - [ ] List skeleton (members, calendar)
  - [ ] Story: `Spaces/States/Skeleton` ❌ missing

- **Error States** ❌ **NOT SYSTEMATIZED**

  - [ ] Generic error component
  - [ ] Network error
  - [ ] Permission denied
  - [ ] Not found
  - [ ] Story: `Spaces/States/Error` ❌ missing

- **Quota & Quality Banners** ❌ **NOT BUILT**
  - [ ] Digest overflow banner ("Too many posts today")
  - [ ] Share-to-campus quality gate UI
  - [ ] Leader quota warnings
  - [ ] Story: `Spaces/States/Banners` ❌ missing

---

## 3) HiveLab — Component Backlog

**Status**: ❌ **NOT STARTED** - Defer until Spaces component library is complete

### 3.1 Library & Discovery

- [ ] ToolCard (name, summary, visibility badge, usage sparkline)
- [ ] ToolGrid/List (filters: visibility, category; pagination)
- [ ] TemplatesGallery (starter templates with descriptions)
- [ ] Story: `HiveLab/Library/Grid` ❌ missing
- [ ] Story: `HiveLab/Library/Templates` ❌ missing

### 3.2 Builder Flows

- [ ] ToolEditor (form: name, description, fields/schema editor stub)
- [ ] VisibilityControls (draft→campus→public transitions; guards)
- [ ] PublishFlow (review → confirm → success; error handling)
- [ ] CollaboratorsList (add/remove; roles; pending invites)
- [ ] DraftsList (builder workspace)
- [ ] Story: `HiveLab/Builder/ToolEditor` ❌ missing
- [ ] Story: `HiveLab/Builder/PublishFlow` ❌ missing
- [ ] Story: `HiveLab/Builder/VisibilityControls` ❌ missing

### 3.3 Analytics & Feedback

- [ ] UsagePanels (DAU/WAU, completion %, error rate)
- [ ] FeedbackList (comments/issues with timestamps)
- [ ] Story: `HiveLab/Analytics/Panels` ❌ missing
- [ ] Story: `HiveLab/Feedback/List` ❌ missing

### 3.4 Space Integration

- [ ] PlacementConfigurator (select up to 6 composer verbs; defaults: deadlines/anon/results/limits)
- [ ] AutoSummaryToggle (tool emits digest posts; thresholds)
- [ ] RemovalHygiene (uninstall hides verbs; prior cards show "tool removed" banner)
- [ ] Story: `HiveLab/Integration/PlacementConfigurator` ❌ missing
- [ ] Story: `HiveLab/Integration/AutoSummary` ❌ missing

---

## 4) Props, States, Events (per component)

For every component above, ensure:

- Props
  - Typed against domain snapshots or well‑scoped view models
  - `className`, `data-testid`, analytics callbacks (`onView`, `onAction`)
- States
  - default/hover/active/disabled + loading/empty/error
  - slice‑specific: pinned/moderated/visibility chips; time‑window states (events/check‑in)
- Events
  - All primary actions emit callbacks with IDs and context (`{ spaceId, postId, toolId }`)
- A11y
  - Keyboard support, focus rings, ARIA attributes, live regions for async validation

---

## 5) Testing & Performance

- Vitest unit tests for mapping utils and critical organisms
- Storybook a11y addon passes on all stories; snapshots for visual regressions optional
- Playwright on Storybook for Board actions, Members flows, and PublishFlow
- Performance budgets per layout; list virtualization strategy for long lists

---

## 6) Milestones (REVISED - Bottom-Up Approach)

### Phase 1: Foundation (Atoms → Molecules)

**Goal**: Shippable, production-ready atomic components with all states

- [ ] **M1.1**: BoardCard Base Shell + States Story

  - Base component with all slots
  - All states (default, hover, active, disabled, skeleton)
  - Pinned, moderation, visibility chips
  - Action bar with callbacks
  - **Acceptance**: `Spaces/Atoms/BoardCard.Base` story with all states

- [ ] **M1.2**: Primary BoardCard Variants (80% use case)

  - BoardCard.Standard with attachments (image grid, file list, link preview)
  - BoardCard.Event with RSVP/waitlist/check-in
  - BoardCard.Poll with results visualization
  - All with empty/error/skeleton states
  - **Acceptance**: 3 stories with full state coverage

- [ ] **M1.3**: Secondary BoardCard Variants

  - BoardCard.Announcement (priority styling, acknowledgment)
  - BoardCard.Form (field count, submission state)
  - BoardCard.Tracker (progress bar, counters)
  - **Acceptance**: 3 more stories with full state coverage

- [ ] **M1.4**: Dock Widgets (Refactored)
  - EventsWidget (empty, skeleton, leader create)
  - CommunityWidget (presence, skeleton)
  - ResourcesWidget (file icons, pinned first)
  - ToolsWidget (usage metrics, empty state)
  - **Acceptance**: 4 widget stories, each with 3 states (default, empty, skeleton)

### Phase 2: Composition (Molecules → Organisms)

**Goal**: Composable pieces that work together

- [ ] **M2.1**: Composition Components

  - PinnedCluster (0/1/2 variants, countdown timers)
  - ComposerActions (max 6 verbs, leader gating)
  - ActivityFilters (keyboard nav, a11y)
  - **Acceptance**: 3 composition stories

- [ ] **M2.2**: Layout Shell

  - SpaceHeader (all badges, CTAs, policies)
  - SpaceLayout (60/40 split, sticky header, safe areas)
  - Dock (sticky, collapse, priority ordering)
  - **Acceptance**: Layout story with desktop/tablet/mobile + skeleton

- [ ] **M2.3**: Cross-cutting States
  - Empty state component + module variants
  - Skeleton state systemization
  - Error state component
  - Quota/quality banners
  - **Acceptance**: States stories (empty, skeleton, error, banners)

### Phase 3: Modules (Organisms → Templates)

**Goal**: Full-page experiences

- [ ] **M3.1**: Core Modules

  - AboutSection (view/edit, tags/links CRUD)
  - CalendarMonth + CalendarList (filters, navigation)
  - MembersRoster (table/grid, search, DM hooks)
  - EventDetail (RSVP list, check-in, co-hosts)
  - **Acceptance**: 4 module stories

- [ ] **M3.2**: Advanced Modules
  - ToolsCatalog (install/uninstall, integration banners)
  - ModerationQueue (actions, confirmations, audit)
  - Settings (General, Roles, DangerZone)
  - Analytics Panels (placeholders)
  - **Acceptance**: 4 module stories

### Phase 4: HiveLab (After Spaces Complete)

- [ ] **M4.1**: Library & Discovery
- [ ] **M4.2**: Builder Flows
- [ ] **M4.3**: Analytics & Space Integration

### Current Progress

- ✅ Types defined
- ⚠️ ~30% of M1.1-M1.4 complete (basic implementations, missing states)
- ❌ M2.1-M2.3 incomplete
- ❌ M3.1-M3.2 incomplete
- ❌ M4.1-M4.3 not started

---

## 7) Acceptance Definition

A component or module is Done when:

- [ ] Stories cover states (default/hover/active/disabled + empty/error/skeleton + mobile/desktop)
- [ ] A11y checks pass; motion fallbacks respected
- [ ] Props/types align with domain contracts; no `any` or stringly enums
- [ ] Tests exist for critical paths; interactions work in Storybook
- [ ] Design dials verified via toolbar controls

---

## 8) References

- Spaces scaffold: `docs/design/spaces/STORYBOOK_SCAFFOLD.md`
- Layout audit: `packages/ui/src/organisms/spaces/LAYOUT_AUDIT.md`
- Platform plan: `docs/design/PLATFORM_UI_COMPONENT_LIBRARY_PLAN.md`
- Domain contracts: `packages/core/src/domain/spaces/**`, `packages/core/src/application/**`
- Serializers: `apps/web/src/server/spaces/service.ts`, `apps/web/src/server/feed/service.ts`

---

## 9) Immediate Action Plan (Week 1)

### Cleanup Tasks (Clear the Deck)

- [ ] **Delete**: `space-layout.tsx` (V5 vertical slice - wrong approach)
- [ ] **Delete**: `Spaces.V5.stories.tsx` (integrated layout story)
- [ ] **Archive**: All V4/V5 architecture docs to `_archive/` folder
- [ ] **Keep**: `types.ts`, individual BoardCard components, widget components
- [ ] **Audit**: Verify `@/components/lib/utils` import resolution in Storybook

### M1.1 Start: BoardCard Base Shell

**Priority 1: Foundation for Everything**

1. **Create** `board-card-base.tsx`:

   - Props interface with all slots (meta, body, actions, badges)
   - Children render props pattern
   - Skeleton variant built-in
   - Gold accent for pinned state

2. **Create** `board-card-base.stories.tsx`:

   - Default state
   - Hover/active states (interactive)
   - Disabled state
   - Skeleton state
   - Pinned variant
   - With moderation chips
   - With visibility badge

3. **Refactor** existing BoardCard variants to extend base:
   - `board-card-standard.tsx` → use `BoardCardBase`
   - `board-card-event.tsx` → use `BoardCardBase`
   - `board-card-poll.tsx` → use `BoardCardBase`

### Success Metrics (Week 1)

- [ ] Storybook runs without errors
- [ ] `Spaces/Atoms/BoardCard.Base` story shows all 7 states
- [ ] 3 existing BoardCard variants refactored to use base
- [ ] A11y addon passes on all base stories
- [ ] Design dials (density, glass, elevation) work on base card

### Weekly Cadence

- **Mon**: Cleanup + start M1.1
- **Tue-Wed**: BoardCard base implementation + stories
- **Thu**: Refactor existing variants to use base
- **Fri**: A11y pass + design dial verification
- **Next Week**: M1.2 (Primary variants with attachments)

---

## 10) What NOT to Build (Anti-Goals)

To stay focused on component library fundamentals:

❌ **DO NOT BUILD**:

- Full page layouts or templates (until M2.2)
- Mock API clients or data fetchers
- State management hooks beyond component-local
- Routing or navigation logic
- Authentication flows
- Firebase integration code

✅ **DO BUILD**:

- Stateless, presentational components
- Callback props for all interactions
- All UI states (default, hover, active, disabled, loading, empty, error)
- Comprehensive Storybook stories
- TypeScript types matching domain contracts
- Accessibility attributes

---

> **Iterative by design** — use this as the working backlog. Update checkboxes and add Storybook URLs as components land.
>
> **Last Updated**: Jan 2025 (V2 Reset - Bottom-up rebuild)
