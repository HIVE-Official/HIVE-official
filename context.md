# HIVE Platform — Vertical Slices Context (Business Purpose, Rationale, and Functional Scope)

This document is the portable product context for HIVE. It explains the “why” behind each vertical slice, the business value we expect to unlock, how we measure success, and what minimum scope is required to prove value. It also links to canonical sources (docs, domain code, UI scaffolds) so teams can ideate, scaffold, or implement layouts in or outside this repo.

Who this is for
- Product, design, and engineering partners aligning on scope and tradeoffs
- Contributors designing or prototyping layouts elsewhere (Storybook or sandbox apps)
- Stakeholders reviewing readiness through a value and KPI lens

How to use it
- Treat each slice as a small product with a clear business outcome, MVP, and next-step iteration.
- Use the KPIs to define instrumentation and acceptance checks before shipping.
- Use the listed sources to jump into code or specs that back the functionality.

Strategic context (why HIVE exists)
- Vision: a student-built social utility where campus life actually happens (communities, rituals, tools, identity).
- Differentiation: purpose-led “Spaces”, fast discovery via a living “Feed”, credible campus identity via “Profile”, and leader tools via “HiveLab”.
- Business levers: retention through belonging (Spaces + Rituals), engagement through creation (Posts/Tools), trust through verified identity (Profile), growth through social proof and notifications.

North star & KPIs
- Weekly Active Members (WAM) and 8-week retention for new cohorts.
- Space vitality: active spaces/week, median members/space, posts/space/week.
- Creation rate: posts per member per week; tool usage; ritual participation rate.
- Time-to-utility: minutes from signup → first join/post; onboarding completion rate.
- Notification effectiveness: CTR and “help now” conversion for urgency-driven items.

## Global IA & Navigation
- Shell: Sidebar-first layout using shadcn primitives with responsive off‑canvas on mobile; header provides breadcrumbs/actions.
- Nav model: Centralized config with leader gating for HiveLab; active route applies `aria-current="page"`.
- Mobile: Sidebar switches to `Sheet` off‑canvas; rail mode available on desktop collapse.
- Design dials (radius, elevation, density, contrast, glass, motion) influence layout feel consistently.
- Primary destinations: Feed, Spaces, Profile, HiveLab (leader‑gated), Settings; Admin separate.
- Business goal: make discovery and task switching effortless so members reach useful content in <2 clicks.
- Jobs-to-be-done: “Find my spaces,” “Start a post/ritual/tool quickly,” “Understand where I am.”
- KPIs: nav misclick rate, time-to-content, % of sessions with sidebar interactions, mobile open rate.
- Key features:
  - Sidebar primitives with `SidebarProvider` and keyboard toggle (`Ctrl/Cmd+B`) for collapse/expand.
  - Desktop rail mode (72px) and mobile off‑canvas `Sheet` with safe-area paddings.
  - Centralized nav config with leader‑gated HiveLab; active route via `aria-current="page"`.
  - Header breadcrumbs, separators, and surface glass for calm chrome.
  - Design dials (radius, elevation, density, contrast, glass, motion) applied via global classes.
- Sources:
  - `apps/web/src/app/shell.tsx:1`
  - `apps/web/src/app/layout.tsx:1`
  - `packages/ui/src/components/ui/sidebar.tsx:1`
  - `packages/ui/src/components/app-sidebar-hive.tsx:1`
  - `packages/ui/src/organisms/nav-config.ts:1`
  - `docs/ROUTING.md:1`
  - `packages/ui/src/styles.css:1`
  - `packages/ui/src/stories/Layouts.HiveSidebar.stories.tsx:1`

## Authentication & Sessions
- Magic link sign-in and session handling (7‑day sessions), with domain services for sign‑up and sessions.
- Guarded routes planned via app shell; auth provider wiring pending in web app.
- Business goal: reduce friction to first value while keeping strong account integrity.
- Jobs-to-be-done: “Get in with campus email,” “Resume session on any device safely.”
- KPIs: signup→onboard start rate, login success rate, drop-off time, session recovery success.
- Key features:
  - Magic‑link sign‑up flow via `MagicLinkSender` port; session service abstraction.
  - 7‑day session persistence and repository interfaces for portability.
  - App‑router guard pattern planned via shell; provider wiring pending in web app.
  - Telemetry port for auth flows (instrumentation hook).
- Sources:
  - `packages/core/src/application/auth/sign-up.service.ts:1`
  - `packages/core/src/application/auth/session.service.ts:1`
  - `packages/core/src/application/auth/profile-onboarding.service.ts:1`
  - `packages/core/src/domain/auth/session/session.repository.ts:1`
  - `FEATURES.md:1`

## Onboarding
- Multi‑step onboarding culminating in a valid profile and consent.
- Strong validation: handle generation, personal/academic/affiliation info, interests, clubs; emits ProfileOnboarded event on success.
- Business goal: personalize the experience and establish trust signals without overwhelming the user.
- Jobs-to-be-done: “Claim my campus identity,” “Pick interests so my feed is relevant.”
- KPIs: onboarding completion rate, time-to-complete, profile completeness, first-space join rate within 24h.
- Key features:
  - Profile validation pipeline (handle, personal, academic/affiliation, social, consent).
  - Domain event `ProfileOnboarded`; progress tracking service and repository.
  - Student vs faculty/staff differentiated rules (e.g., bio length, required academic info).
  - Typed DTOs for submission and snapshot; factories for value objects.
- Sources:
  - `packages/core/src/domain/profile/aggregates/profile.aggregate.ts:1`
  - `packages/core/src/application/onboarding/progress.service.ts:1`
  - `packages/core/src/domain/onboarding/onboarding-progress.repository.ts:1`
  - `FEATURES.md:1`

## Profile
- Canonical campus identity: personal info, handle, academic/affiliation, social links, interests/clubs, verification, onboarding state.
- Domain logic enforces completion rules (e.g., faculty/staff bio length, student academic info required).
- UI scaffolds present in design system; app integrates via shell.
- Business goal: credible identity that increases safety and quality of interactions.
- Jobs-to-be-done: “Let others know who I am,” “Prove eligibility/status,” “Tune what I see.”
- KPIs: profile completeness, verification rate, profile views/member/week, privacy settings adoption.
- Key features:
  - Verified flag, handle assignment, and strict value objects for identity fields.
  - Personal/academic/affiliation/social info with role‑aware constraints.
  - Interests, clubs, residential selection; consent and onboarding timestamps.
  - Repository mapping for persistence and rehydration.
- Sources:
  - `packages/core/src/domain/profile/aggregates/profile.aggregate.ts:1`
  - `packages/core/src/domain/profile/repositories/profile.repository.ts:1`
  - `packages/ui/src/organisms/profile/index.tsx:1`
  - `FEATURES.md:1`

## Spaces
- Community containers with leader/moderator/member roles, creation/update validation, membership management.
- Application service to create/manage spaces; repository contracts provided.
- Business goal: make it trivial to create and sustain healthy campus communities.
- Jobs-to-be-done: “Create a space for my group,” “Manage members and roles,” “Post updates.”
- KPIs: active spaces/week, median members/space, membership churn, posts/space/week.
- Key features:
  - Create/update with validation; membership add/remove with leader/moderator/member roles.
  - Ownership transfer and safe guards in aggregates (tested behavior).
  - Repository contracts and application service for orchestration.
- Sources:
  - `packages/core/src/domain/spaces/aggregates/space.aggregate.ts:1`
  - `packages/core/src/domain/spaces/space.repository.ts:1`
  - `packages/core/src/application/spaces/space.application.service.ts:1`
  - `FEATURES.md:1`
  - `docs/design/spaces/STORYBOOK_SCAFFOLD.md:1`

## Space Posts
- Posts authored within a space; snapshots feed into the global feed.
- Create/list operations capped and time‑bounded; domain aggregate holds post state and events.
- Business goal: sustain regular creation inside spaces and amplify into the feed where appropriate.
- Jobs-to-be-done: “Share an update,” “Discuss,” “Promote an activity to broader audience.”
- KPIs: post creation rate, comment/like ratio, cross-post to feed %, time-to-first-reaction.
- Key features:
  - Post aggregate with timestamps and author/space linkage.
  - Application service for create/list with caps; snapshots feed the global feed.
  - Tests covering creation rules and listing semantics.
- Sources:
  - `packages/core/src/domain/spaces/aggregates/space-post.aggregate.ts:1`
  - `packages/core/src/domain/spaces/space-post.repository.ts:1`
  - `packages/core/src/application/spaces/space-post.application.service.ts:1`
  - `packages/core/src/application/spaces/space-post.application.service.test.ts:1`

## Feed
- Personalized stream aggregated from joined spaces; paginates by time and limit.
- Composes recent space posts across membership, sorts by recency, applies soft cap per space.
- Business goal: a living campus feed that balances relevance with discovery to keep members returning.
- Jobs-to-be-done: “Catch up fast,” “Find relevant opportunities,” “Join conversations across spaces.”
- KPIs: DAU feed sessions, session length, scroll depth, CTR to space, hide/mute rate.
- Key features:
  - Aggregates recent posts from joined spaces; campus‑scoped.
  - `before` cursor and `limit` for pagination; soft per‑space cap to avoid over‑fetch.
  - Normalized `FeedItem` typing for rendering pipelines.
- Sources:
  - `packages/core/src/application/feed/feed.application.service.ts:1`
  - `packages/core/src/application/feed/feed.types.ts:1`
  - `FEATURES.md:1`
  - `docs/ROUTING.md:1`

## Rituals
- Scheduled, repeatable activities (optionally tied to a space); create, join, list participants; emits domain events.
- Application service orchestrates persistence; repository contract included.
- Business goal: drive habitual engagement through lightweight recurring activities.
- Jobs-to-be-done: “Plan recurring sessions,” “RSVP/attend,” “Track participation.”
- KPIs: ritual creation rate, participation %, repeat attendance, retention uplift for participants.
- Key features:
  - Creation with schedule; join/participants list; updatedAt maintenance.
  - Domain events (e.g., `RitualCreated`); repository + application service.
  - Optional linkage to a space for distribution and discovery.
- Sources:
  - `packages/core/src/domain/rituals/aggregates/ritual.aggregate.ts:1`
  - `packages/core/src/domain/rituals/ritual.repository.ts:1`
  - `packages/core/src/application/rituals/ritual.application.service.ts:1`
  - `FEATURES.md:1`

## HiveLab / Tools
- Tools as publishable artifacts with visibility controls (draft/campus/public) and publish/update flows.
- Domain rules prevent invalid visibility transitions; service exposes create/update/publish operations.
- UI gated in nav via `requiresLeader`.
- Business goal: empower leaders with utility (forms, tracking, coordination) that increases space productivity.
- Jobs-to-be-done: “Publish a tool,” “Set visibility,” “Measure usage.”
- KPIs: tools published, DAU on tools, completion rate for tool flows, leader NPS.
- Key features:
  - Visibility model (draft → campus → public) with safe transition rules.
  - Publish lifecycle, updates, and guards enforced in aggregate tests.
  - Leader‑gated navigation surfaced via centralized nav config.
- Sources:
  - `packages/core/src/domain/tools/aggregates/tool.aggregate.ts:1`
  - `packages/core/src/domain/tools/tool.repository.ts:1`
  - `packages/core/src/application/tools/tool.application.service.ts:1`
  - `packages/ui/src/organisms/nav-config.ts:1`
  - `FEATURES.md:1`

## Events
- Campus calendar slice surfaces space-hosted and campus-wide events with social proof, RSVP flows, and reminders.
- RSS pre-seeding keeps the calendar full on day one; claiming unlocks editing while preserving imported history.
- Business goal: ensure students never miss high-value IRL moments and convert intent into actual attendance.
- Jobs-to-be-done: “See what’s happening soon,” “RSVP/check in,” “Coordinate events across spaces.”
- KPIs: RSVPs per week, RSVP→attendance conversion, % of events with engagement, waitlist clear rate.
- Key features:
  - Calendar and board integration with month/list views, multi-host events, event cards, and feed surfacing.
  - RSVP, waitlist, and check-in records with quota guardrails plus reminders at T-24h/T-1h/check-in window.
  - RSS import pipeline, dedupe, and approval workflows for unverified spaces; claim flow unlocks full control.
  - Seeded data and UI scaffolds in web app (`SpaceDetailClient` tab, fixtures) ready for service wiring.
- Sources:
  - `docs/foundation/specs/product/event-club-platform.md:1`
  - `HIVE_PRD_OCTOBER_LAUNCH.md:105`
  - `docs/foundation/specs/technical/spec.md:1465`
  - `apps/web/src/components/spaces/SpaceDetailClient.tsx:70`
  - `apps/web/src/server/spaces/event-fixtures.ts:1`

## Messaging
- Direct and group messaging slice enabling campus-wide conversations with presence, media, and notifications.
- SSE/WebSocket architecture planned for real-time delivery with moderation hooks and leader gating defaults.
- Business goal: connect members instantly so coordination and support happen inside HIVE instead of third-party apps.
- Jobs-to-be-done: “DM a classmate,” “Spin up a group chat for a space,” “Share urgent updates quickly.”
- KPIs: first-DM conversion, conversations per user, median response time, mute/block rate.
- Key features:
  - 1:1, group, and space-member threads with read receipts, typing indicators, attachments, and follow graph integration.
  - Notification integration for new messages plus digest controls; moderation tooling for reports/escalations.
  - Planned real-time service with channelized topics, retries, and ack metadata validated via integration harness.
  - Desktop/mobile layouts documented (Discord-inspired) to guide DS scaffold and future implementation.
- Sources:
  - `HIVE_PRD_OCTOBER_LAUNCH.md:121`
  - `docs/foundation/specs/technical/spec.md:5122`
  - `docs/foundation/architecture/platform-layout-architecture.md:256`
  - `blueprints/shadcn-foundation/apps/web/src/lib/test-integration.ts:84`

## Notifications
- Behavioral notification system (bell, dropdown, toast patterns) described and integrated conceptually; Firebase real‑time hooks described.
- Status in app code is partial; DS provides toast primitives and guidance.
- Business goal: timely, ethical nudges that help members help each other and return for meaningful updates.
- Jobs-to-be-done: “Know when I’m needed,” “Act quickly from the nudge,” “Triage non-urgent items later.”
- KPIs: notification → action conversion, mute/unsubscribe rate, average toasts per session, time-to-open.
- Key features:
  - Behavioral patterns (bell, dropdown, urgency toasts) defined; DS toasts ready for integration.
  - Real‑time Firebase hook design (`useRealtimeNotifications`) documented; wiring pending in app.
  - Priority‑aware delivery (urgent/high/medium/low) and action CTAs (spec).
- Sources:
  - `NOTIFICATION_SYSTEM_SUMMARY.md:1`
  - `packages/ui/src/molecules/toast.tsx:1`
  - `packages/ui/src/organisms/toaster.tsx:1`
  - `FEATURES.md:1`

## Settings
- User‑facing preferences: theme (light/dark), motion and glass dials, potential reduce‑effects toggles.
- Theme bootstrapping runs early; tokens/dials drive presentation.
- Business goal: accessibility and comfort controls that reduce churn and support a wider audience.
- Jobs-to-be-done: “Adjust contrast/motion,” “Switch theme,” “Tune notification volume.”
- KPIs: adoption of reduce-motion/no-glass, theme distribution, error reports related to a11y.
- Key features:
  - Early theme bootstrapping script; light/dark class toggle before paint.
  - Token‑driven dials (contrast, elevation, glass, motion) via CSS classes.
  - Reduce‑motion and no‑glass modes; scrollbar and focus‑ring utilities.
- Sources:
  - `apps/web/src/app/layout.tsx:1`
  - `packages/ui/src/styles.css:1`
  - `packages/tokens/src/styles.css:1`
  - `docs/design/PLATFORM_STORYBOOK_SCAFFOLD.md:1`

## Admin & Operations
- Separate `apps/admin` placeholder for operational tools; to be built out following the same DS + tokens stack.
- Business goal: operational efficiency (moderation, analytics, configuration) without blocking student‑first velocity in web.
- KPIs: moderation time-to-resolution, incident rate, config change lead time.
- Sources:
  - `apps/admin/README.md:1`
  - `AGENTS.md:1`

## Design System & Storybook (Enablers)
- Tokenized Tailwind preset, global CSS utilities (focus ring, glass, motion), and brand classes for the chromium aesthetic.
- Storybook catalogs layouts and primitives; global toolbar controls for dials and a11y review.
- Business goal: consistency, speed, and quality; DS acts as living spec and reduces rework.
- KPIs: DS adoption (% components from DS), defect rate in UI, story coverage.
- Sources:
  - `packages/tokens/src/tailwind.preset.ts:1`
  - `packages/tokens/src/styles.css:1`
  - `packages/ui/src/styles.css:1`
  - `packages/ui/.storybook/preview.tsx:1`
  - `packages/ui/.storybook/main.ts:1`
  - `docs/design/ICONOGRAPHY_ELEVATION_GLASS.md:1`

## Routing & Entry Points
- App Router patterns with shell chrome wrapping content except on specific routes (e.g., `/`, `/login`, `/onboarding`, `/ui`).
- Business goal: minimize cognitive overhead by showing chrome only when it adds value.
- KPI: misnavigation on entry, bounce rate at `/` vs `/feed` redirect.
- Sources:
  - `apps/web/src/app/shell.tsx:1`
  - `docs/ROUTING.md:1`

## Sequencing, Risks, and Next Up
- Delivery sequence (suggested): Auth → Onboarding → Profile → Spaces → Feed → Notifications → Tools → Rituals → Settings → Admin.
- Cross-cutting: instrumentation for KPIs; a11y (focus, motion, contrast); mobile ergonomics (safe areas, touch targets).
- Key risks & mitigations
  - Navigation complexity on mobile → prioritize off‑canvas flows, add bottom affordances if data shows need.
  - Feed relevance → seed via joined spaces, expose quick filters; instrument CTR and hide/mute.
  - Tool sprawl → leader gating and visibility states; measure DAU per tool before expanding catalog.
  - Performance on low-end devices → provide `reduce-motion`/`no-glass`, ensure skeletons and list virtualization where needed.
- Sources:
  - `AGENTS.md:1`
  - `docs/design/PLATFORM_STORYBOOK_SCAFFOLD.md:1`
  - `FEATURES.md:1`
