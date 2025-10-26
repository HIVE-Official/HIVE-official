# HIVE Platform UI Component Library — Plan (v1)

> Purpose-built, extensible, and slice-aware UI system that powers the entire HIVE platform (web + admin) with Storybook as the living spec. This plan balances a concrete delivery path with intentional room for pivots and ideation.

---

## 1) Objectives & Non‑Goals

- Objectives
  - Unify platform visuals and behavior under tokens, design dials, and a consistent component taxonomy (atoms → molecules → organisms → layouts).
  - Ship production‑ready Spaces layouts and modules first; use the pattern to scale Feed, Profile, HiveLab, Notifications, Settings, Admin.
  - Align UI props with domain data contracts (aggregates and application services) to avoid adapter churn.
  - Treat Storybook as the contract: all states, a11y, and design dials verifiable before app wiring.
- Non‑Goals (v1)
  - Full mobile native SDKs; focus is responsive web.
  - New theming system outside of tokens/dials; defer brand theming beyond Hive default.

---

## 2) Value Architecture (UVP → KPIs)

- UVP
  - Belonging + coordination in “Spaces” with a board‑first narrative, leader tools, and verified identity.
  - Lower operational burden for leaders through Tools, Analytics, Moderation modules.
  - Campus trust via role gating, visibility locks, and ethical notifications.
- KPIs (instrumented via UI hooks + domain events)
  - Space vitality (active spaces/week, posts/space/week, median members/space)
  - Creation funnels (posts, RSVPs, form submissions, completion rate)
  - Retention (WAM, D7/D30 for space members), churn
  - Share‑to‑campus conversion; moderation outcomes (time‑to‑resolution)

---

## 3) Information Architecture (IA)

- Global Shell
  - Sidebar-first layout; rail on desktop collapse; off‑canvas Sheet on mobile.
  - Centralized nav config; leader‑gated HiveLab; `aria-current` on active route.
  - Design dials: radius, elevation, density, contrast, glass, motion.
- Slices → Modules (Space-first sequencing)
  - Spaces
    - Board (default): Pinned cluster → Stream → Composer (max 6 verbs)
    - Calendar: CRUD events, co‑host, waitlist/check‑in, RSS claim
    - Members: directory, pending requests, invites/CSV, moderation alerts
    - About: description, tags, links, compliance copy, version history
    - Analytics (leaders): health, events funnel, tools performance, growth
    - Tools (leaders): install/attach, configure composer, auto‑summaries
    - Settings: access/posting policy, visibility defaults, module order, transfer, archive/delete
    - Moderation: reports queue, actions (warn/mute/ban/escalate), audit log, rate limits
  - Feed: recent posts across joined spaces; per‑space soft caps; filters
  - Profile: verified identity, interests, visibility controls
  - HiveLab: tool catalog, builder flows, publish/update
  - Notifications: bell dropdown, urgency toasts; preference surfaces
  - Settings: theme, motion/glass, accessibility controls

---

## 4) Functional Architecture

- Domain alignment
  - Space aggregate: roles, membership, policies (create/update, join/leave)
  - Space Post aggregate: kind/audience/origin, pinning, moderation state, attachments, engagement summary (RSVP, check‑ins, submissions)
  - Feed app service: campus‑scoped aggregation with per‑space caps
  - Orchestration gap: Spaces quota/digest/moderation gates (to implement)
- Data contracts (selected)
  - `SpacePostSnapshot`: `kind`, `audience`, `origin`, `pinnedAt`, `pinExpiresAt`, `moderationStatus`, `shareToCampus`, `qualityScore`, `toolContext`, `attachments[]`, `engagementSummary{}`
- State & context
  - `SliceContextProvider` coordinates active slice + cross‑slice carryover
  - Campus context feeds recommended/joined spaces and location cues
- Telemetry & a11y hooks
  - All organisms expose `onView`, `onAction`, `data-testid` for testing

---

## 5) Design System (Tokens → Primitives)

- Tokens & Dials
  - Colors/spacing/typography tokens; dials for density, elevation, contrast, glass, motion
  - Early theme bootstrapping; reduce‑motion/no‑glass fallbacks
- Primitives (examples)
  - Atoms: Button, Input, Textarea, Badge, Tag, Avatar, Card, Sheet, Dialog, Tabs, Tooltip, Toast
  - Layout helpers: container, grid, sticky regions, safe‑area utilities
- Accessibility
  - Focus ring utility, ARIA live regions for validation, keyboard navigation
- Performance
  - Board load ≤1.8s cold / ≤1.2s warm; interactions ≤150ms; calendar ≤300ms/100 events; list virtualization ready

---

## 6) Component Taxonomy & Deliverables

- Atoms (platform‑wide)
  - Buttons, Inputs, Selects, Radios/Checkboxes, Tags/Badges, Avatars, Cards, Skeletons, Progress
- Molecules (platform‑wide)
  - FormField, Toolbar, Pagination, Metric chips, Empty/Error blocks, Toast stack
- Organisms (slice‑specific)
  - Spaces
    - Header (identity bar), ComposerActions, BoardCard(Standard/Event/Poll/Form/Tracker/Announcement/Check‑in/Digest), PinnedCluster, Dock (Calendar, Members, About), MembersDirectory, PendingRequests, IntegrationBanner, Settings forms, ModerationQueue
  - Feed
    - FeedItem(Standard/Tool), Filters, Empty/Error/Skeletons
  - Profile
    - ProfileHeader, IdentityPanels, Interests/Clubs, VisibilityControls
  - HiveLab
    - ToolCard, ToolEditor, PublishFlow, UsagePanels
- Layouts
  - SpaceLayoutV2 (60/40), FeedLayout, ProfileLayout, BuilderLayout

---

## 7) Storybook Plan (Acceptance = stories complete)

- Foundation
  - IA Outline, Nav States, First‑Run Entry, Mature Nav, Permission States
- Spaces
  - Overview Layout (60/40 + sticky), AboutCard (view/edit), EventsWidget (list/empty/skeleton/expanded)
  - Activity: Composer, Post taxonomy, Filters
  - Tools: Grid, EmptyState, IntegrationBanner
  - Members: Directory, PendingRequests, ModerationAlerts
  - Settings: General, RolesPermissions, DangerZone
  - Flows: Create, OnboardingChecklist, Membership
  - Cross‑cutting: Empty/Error/Skeleton packs
- Conventions
  - Controls for space type (Student Org, University Org, Greek, Residential)
  - Global toolbar: density/elevation/contrast/glass/motion; a11y addon pass

---

## 8) Delivery Milestones (with Pivot Lanes)

- M0 Bootstrapping (week 0–1)
  - Validate Node 20 toolchain; Storybook health; token audit; CI task for `lint/typecheck/test/storybook`.
  - Pivot lane: evaluate icon set consolidation (lucide vs radix) and motion token ranges.
- M1 Layout & Primitives (week 1–2)
  - Ship SpaceLayoutV2 (ratio, sticky offset via CSS var, safe areas, skeletons); polish atoms and common molecules.
  - Pivot lane: mobile grammar—segmented controls vs bottom tabs for context.
- M2 Spaces Board & Context (week 2–3)
  - Board card taxonomy with inline actions; ComposerActions (policy aware); Dock widgets; About edit/view.
  - Pivot lane: inline vs modal interactions for complex tool posts.
- M3 Modules & Flows (week 3–4)
  - Members, Tools, Settings, Moderation screens + flows; initial Analytics readouts with mocked metrics.
  - Pivot lane: compress Tools + Analytics surfaces if leader feedback prefers fewer tabs.
- M4 Integration & Hardening (week 4–5)
  - Wire domain services, quotas/moderation orchestration; performance profiling; a11y audits; Storybook acceptance sweep.
  - Pivot lane: adjust quotas/digest thresholds and share‑to‑campus scoring based on early telemetry.

---

## 9) Orchestration & Policies (Spaces‑specific)

- Quotas
  - ≤2 auto‑generated tool posts per space per day; digest card if exceeded.
- Moderation
  - Auto‑hide on report ratio; leader review queue; visibility locks immutable except by privileged roles.
- Sharing
  - Share‑to‑campus gated by quality score (engagement↑, reports↓, leader reputation).

---

## 10) Validation & Definition of Done

- Each organism/layout has:
  - Stories for states (default/hover/active/disabled), empty/error/skeleton, mobile/desktop
  - A11y pass (focus order, labels, contrast, motion fallbacks)
  - Performance budget checks (storybook interaction timings, bundle glance)
  - Typed props aligned with domain snapshots; no “stringly‑typed” enums
- App wiring only after Storybook acceptance pack is green.

---

## 11) Open Questions (for Ideation)

- Mobile navigation affordance: persistent bottom nav for Spaces modules vs segmented under header?
- Tool emission contract: how far should inline interactions go before we prefer modal/full screen?
- Analytics surface: roll into Tools tab or keep a distinct Analytics tab?
- Digest design: single daily digest vs rolling bundles per tool type?

---

## 12) File Map & References

- Tokens & global CSS: `packages/tokens/src/`, `packages/ui/src/styles.css`
- Spaces UI: `packages/ui/src/organisms/spaces/**` (cards, header, layout)
- Storybook: `packages/ui/.storybook/**`, stories in `packages/ui/src/stories/**`
- Domain contracts: `packages/core/src/domain/spaces/**`, services in `packages/core/src/application/**`
- Server serializers: `apps/web/src/server/spaces/service.ts`, `apps/web/src/server/feed/service.ts`

---

## 13) Next Actions (this week)

- Fix SpaceLayoutV2 issues per `LAYOUT_AUDIT.md` (ratio, sticky offset, safe areas, skeletons).
- Implement BoardCard taxonomy scaffolds (props mapped to `SpacePostSnapshot` fields).
- Add Spaces Overview stories: Layout, AboutCard, EventsWidget (list/empty/skeleton/expanded).
- Sketch quotas/moderation orchestrator interfaces (no-op impl + tests), wire later.

---

## 14) Completion Checklist

- Foundations & Tooling
  - [ ] Node 20 guard passes; pnpm env stable
  - [ ] Storybook dev/build healthy; global toolbar (density/elevation/contrast/glass/motion) + a11y addon enabled
  - [ ] CI runs `lint`, `typecheck`, `test`, `storybook:build` with thresholds
  - [ ] Tokens/dials imported and documented; theme bootstrapping verified

- Atoms (states + a11y complete)
  - [ ] Button, Input, Textarea, Select, Radio/Checkbox, Tag/Badge
  - [ ] Avatar, Card, Separator, Skeleton, Progress
  - [ ] Sheet, Dialog, Tabs, Tooltip, Toast
  - [ ] Focus ring utility; reduce-motion/no-glass classes respected

- Molecules
  - [ ] FormField (label/help/error) with validation examples
  - [ ] Toolbar/SegmentedControl; Pagination
  - [ ] Empty/Error blocks; Skeleton variants; Metric chips

- Layouts
  - [ ] SpaceLayoutV2: 60/40 ratio, sticky offset via CSS var, safe areas, breakpoints, skeletons (per LAYOUT_AUDIT)
  - [ ] FeedLayout, ProfileLayout, BuilderLayout (initial pass)

- Spaces Organisms
  - [ ] SpaceHeader (avatar/name/type/verification/join/share/report/policy chips/claim)
  - [ ] ComposerActions (policy aware; max 6 verbs)
  - [ ] PinnedCluster (0/1/2 with timers)
  - [ ] BoardCard taxonomy: Standard, Event (RSVP/Waitlist/Check‑in), Poll (open/closed), Form (≤12 fields), Announcement, Tracker, Check‑in, Digest
  - [ ] Card states: pinned, members/public visibility chips, moderated/auto-hidden banners
  - [ ] Activity Filters (All/Announcements/Tools) with keyboard focus handling
- [ ] Dock: Calendar preview (list/empty/skeleton/expand), Members preview, About card
  - [ ] AboutSection (edit/view), version history placeholder
  - [ ] Members: Directory (role chips/search/DM), PendingRequests flow, ModerationAlerts
  - [ ] Tools: Grid, EmptyState, IntegrationBanner
  - [ ] Settings: General, RolesPermissions, DangerZone
  - [ ] Moderation: Reports queue with actions + audit log hooks
  - [ ] Analytics: Health/Funnel/Tool performance placeholders

- Data Wiring
  - [ ] Adapter maps `SpacePostSnapshot` → card props (kind, audience, origin, pinnedAt/pinExpiresAt, moderationStatus, shareToCampus, attachments, toolContext, engagementSummary)
  - [ ] Story fixtures include enriched posts + quota overflow/digest examples

- Policies & Orchestration (UI surfaces)
  - [ ] Quota messaging and Digest card variants
  - [ ] Share‑to‑campus quality gate copy and affordances
  - [ ] Auto‑hide/flagged content banners; leader review prompts

- Storybook Coverage (acceptance)
  - [ ] Foundation: IA Outline, Nav States, First‑Run, Mature Nav, Permission States
  - [ ] Spaces Overview: Layout, AboutCard, EventsWidget (list/empty/skeleton/expanded)
  - [ ] Activity: Composer, Post taxonomy, Filters
  - [ ] Tools, Members, Settings, Moderation, Flows
  - [ ] Cross‑cutting: Empty/Error/Skeleton packs
  - [ ] Controls for space type; global dials verified; a11y addon passes

- Testing & Performance
  - [ ] Vitest unit tests for utils/hooks; critical organisms smoke tests
  - [ ] Storybook a11y addon passes for all stories
  - [ ] Playwright Storybook e2e for Board interactions and Members actions
  - [ ] Performance budgets met; virtualization plan for long lists

- Documentation
  - [ ] packages/ui README with usage patterns, tokens/dials guidance
  - [ ] Per-component README links to stories; props tables
  - [ ] Update this plan with Storybook URLs; mark completion dates

---

> This document is intentionally modular. Expect iterative updates as we collect feedback from Storybook reviews, leader testing, and KPI readouts.
