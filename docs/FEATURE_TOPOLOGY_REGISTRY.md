# Feature Topology Registry — Web (Next.js)

## Purpose
- Provide a single source of truth for how end-user features map to Next.js routes, UI modules, data contracts, and lifecycle phases.
- Keep vertical slices aligned with the **web-first** mandate from `AGENTS.md` by anchoring implementation work in `apps/web`.
- Ensure discoverability of dependencies (auth wrappers, analytics, feature flags, skeletons, empty/error states) before teams ship or modify a feature.

Read alongside:
- `docs/prd/20-platform-taxonomy.md` for entity/surface taxonomy.
- `docs/UX-UI-LAYOUT-GUIDE.md` for layout patterns and experience topology.
- `FEATURES.md` for brutally honest completion status per system.

## How to Use This Registry
1. **Before starting work** copy the relevant feature entry into your planning brief (`docs/design/templates/PLANNING_BRIEF_TEMPLATE.md`) and annotate deltas.
2. **When shipping** confirm the dependencies table is accurate (routes, components, data loaders, auth helpers, analytics) and add any new feature flags.
3. **After changes** update status, instrumentation, and doc references here. This registry should be the first stop for QA, product, and analytics reviews.
4. **Missing feature?** Follow the template in “Registry Anatomy” and add it under the correct vertical slice. Avoid duplicating features across slices—link instead.

### Registry Anatomy
- **Status** — `live`, `hardening`, or `backlog` (match `FEATURES.md` reality).
- **Lifecycle Phase** — Discover, Activate, Create, Steward (see Experience Topology).
- **Primary Surfaces** — canonical routes/components inside `apps/web`.
- **Key Modules** — shared UI/logic (often in `packages/ui` or `packages/core`).
- **Data Contracts** — loaders/services, Firestore collections, or API endpoints.
- **Auth & Security** — required wrappers (`withSecureAuth`, middleware, CSRF).
- **Flags & Guardrails** — feature flags or config switches gating access.
- **Observability** — analytics events, metrics, and error reporting hooks.
- **States** — skeleton, empty, error expectations; responsive/a11y notes.
- **Related Docs** — update the source of truth when behavior changes.

## Vertical Slice Overview
| Slice | Feature Focus | Primary Routes | Status Snapshot |
| ----- | ------------- | -------------- | --------------- |
| Feed & Rituals | Momentum hero, board tablist, ritual strip, stream cards, notifications preview | `/feed`, `/rituals`, `/events/[id]`, `/notifications` | `hardening` — polishing responsiveness + analytics |
| Spaces | Space board layout, context rail, membership/actions, panels (events, members, resources) | `/spaces`, `/spaces/[spaceId]`, `/spaces/create` | `hardening` — needs consistent tokens + context panel parity |
| Onboarding & Auth | Start marketing, sign-in/verification, onboarding stepper, ghost mode, waitlist | `/start`, `/login`, `/onboarding`, `/waitlist` | `live` — maintainable with localized polish items |
| Profile | Bento layout, identity hero, action rail, tiles (spaces/tools/activity/calendar) | `/profile/[id]`, `/profile/edit`, `/profile/settings` | `hardening` — data freshness + mobile CTA parity outstanding |
| HiveLab (Tools) | Builder canvas, certification flow, overview hero, install management, analytics | `/hivelab`, `/tools` | `backlog` → core UI scaffolded; awaiting secure save + SSR |
| Cross-Surface Systems | Action system, promotion engine, notifications, admin rails, analytics | Middleware, shared hooks, overlays | Mixed — treat as platforms powering slices |

---

## Registry Entries

### Feed & Rituals

#### Momentum Hero
- **Status**: hardening — visual polish + responsive tuning outstanding (`FEATURES.md`).
- **Lifecycle Phase**: Discover → Activate.
- **Primary Surfaces**: `apps/web/src/app/feed/page.tsx`.
- **Key Modules**: hero layout inside feed page; tokens from `packages/tokens/src/styles.css`.
- **Data Contracts**: `useFeedConfig` (`apps/web/src/lib/feed-config.ts`), campus-promoted posts via `feed/service.ts`.
- **Auth & Security**: requires authenticated session through `useAuth`; downstream fetches use `withSecureAuth` via `secureApiFetch`.
- **Flags & Guardrails**: `feedConfig.features.momentumHeroEnabled` (config object).
- **Observability**: emit `feed_hero_view`, `feed_hero_cta_click` via analytics helper (`apps/web/src/lib/analytics/events.ts`).
- **States**: hero skeleton inside `FeedSkeleton`; empty state collapses CTA into recommended spaces.
- **Responsive & A11y**: 12 column grid desktop; ensure hero CTA buttons meet 44px target (open issue from `FEATURES.md`).
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md` (Feed layout), `docs/prd/20-platform-taxonomy.md` (Feed slice).

#### Board Tablist (Today / Week / Updates)
- **Status**: backlog — tablist molecule referenced, but component (`feed-board-tablist.tsx`) pending.
- **Lifecycle Phase**: Activate.
- **Primary Surfaces**: placeholder logic in `apps/web/src/app/feed/page.tsx` (`feedFilter`, `sortBy` state).
- **Key Modules**: planned `packages/ui/src/atomic/molecules/feed-board-tablist.tsx`.
- **Data Contracts**: `useFeed` hook query filters; expects SSR-safe fetch; `service.ts` for feed data.
- **Auth & Security**: same as feed page; ensure tab switch requests include `credentials:'include'`.
- **Flags & Guardrails**: `feedConfig.features.tablistEnabled` (to add on implementation).
- **Observability**: track `feed_tab_change` with tab id, campus, device.
- **States**: skeleton retains first tab; keyboard roving tab index required for A11y.
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md` (tablist specification), `FEATURES.md` (navigation issues).

#### Ritual Strip & EventSheet Overlay
- **Status**: hardening — `RitualStoriesStrip` and `RitualHorizontalCards` exist but require perf checks.
- **Lifecycle Phase**: Discover → Activate.
- **Primary Surfaces**: dynamic imports inside `apps/web/src/app/feed/page.tsx`; overlay at `/events/[eventId]`.
- **Key Modules**: `@/components/feed/ritual-stories-strip`, `@/components/feed/ritual-horizontal-cards`, `@/components/events/event-sheet`.
- **Data Contracts**: `/api/rituals` via `secureApiFetch`; participation data merges with `useFeed` stream.
- **Auth & Security**: SSR disabled; rely on HttpOnly session; event mutations must include CSRF (`apps/web/src/lib/middleware/csrf.ts`).
- **Flags & Guardrails**: `feedConfig.features.ritualsEnabled`; campus gating via feature flags collection (`packages/core/src/constants/feature-flags.ts`).
- **Observability**: `ritual_strip_engaged`, `event_rsvp_submitted`, `event_sheet_opened`.
- **States**: skeleton story strip placeholder; empty state shifts to “Explore rituals” CTA; mobile swipe requires aria live instructions.
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md` (horizontal highlights), `docs/prd/20-platform-taxonomy.md`.

#### Stream Cards & Notifications Preview
- **Status**: hardening — card variants live; needs consistent tokens + moderation affordances.
- **Lifecycle Phase**: Activate → Create.
- **Primary Surfaces**: `apps/web/src/components/feed/PostCard.tsx`, notifications preview block in `FeedPage`.
- **Key Modules**: `@hive/ui` card primitives, `@/components/feed/cards/*`.
- **Data Contracts**: `useFeed` hook, `/api/notifications/preview`; moderation actions hit `/api/admin/*` (CSRF required).
- **Auth & Security**: `withSecureAuth` for fetch; admin actions require CSRF header.
- **Flags & Guardrails**: `feedConfig.features.notificationsPreviewEnabled`; moderation menu behind `isModerator`.
- **Observability**: `feed_card_action`, `notification_preview_opened`, `moderation_action_submit`.
- **States**: skeleton cards (`FeedSkeleton`), empty feed fallback to onboarding prompts; errors present inline toast via `useToast`.
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md`, `FEATURES.md` (notifications maturity).

### Spaces

#### Spaces Directory & Discovery Hero
- **Status**: hardening — directory functional; hero still requires UB-specific copy.
- **Lifecycle Phase**: Discover → Activate.
- **Primary Surfaces**: `/spaces/page.tsx`, `/spaces/browse/page.tsx`.
- **Key Modules**: space grid components (`packages/ui/src/organisms/spaces/board-card-standard.tsx`), discovery hero (`apps/web/src/components/spaces/spaces-hero.tsx`).
- **Data Contracts**: `/api/spaces` listing with campus isolation; caching via ISR planned.
- **Auth & Security**: read requires authenticated campus user; ensure `credentials:'include'`.
- **Flags & Guardrails**: `spacesConfig.discoveryHeroEnabled`; campus gating from feature flag service.
- **Observability**: `spaces_directory_view`, `space_card_click`, `space_join_intent`.
- **States**: grid skeleton, empty copy “No spaces yet for your campus”; mobile list becomes single column.
- **Related Docs**: `docs/prd/20-platform-taxonomy.md` (Spaces slice), `docs/UX-UI-LAYOUT-GUIDE.md` (discovery modules).

#### Space Board Layout & Context Rail
- **Status**: hardening — layout live; needs consistent token usage + context rail parity on mobile.
- **Lifecycle Phase**: Activate → Create.
- **Primary Surfaces**: `apps/web/src/app/spaces/[spaceId]/page.tsx`, `apps/web/src/components/spaces/space-sidebar.tsx`.
- **Key Modules**: Space board composer, context tabs (`Tabs`, `TabsList`, `TabsTrigger` from `@hive/ui`), panels (`events-panel`, `members-panel`, `resources-panel`).
- **Data Contracts**: `/api/spaces/{spaceId}`, `/api/spaces/{spaceId}/posts`, membership endpoints (`join`, `leave`).
- **Auth & Security**: uses `api` client wrapper (adds cookies, handles HttpOnly session); mutations must emit CSRF token once middleware consolidated.
- **Flags & Guardrails**: gating for `hot_threads`, `contextPanel` variants; admin tabs only for `membership.role`.
- **Observability**: `space_tab_view`, `space_action_join`, `space_context_panel_opened`.
- **States**: `Loading` placeholder (needs replacement with skeleton), `Space not found` error; ensure mobile bottom sheet duplicates context actions.
- **Related Docs**: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`, `docs/design/spaces/STORYBOOK_SCAFFOLD.md`.

#### Space Actions & Admin Rail
- **Status**: backlog — join/leave works; moderation/admin tabs partially stubbed.
- **Lifecycle Phase**: Create → Steward.
- **Primary Surfaces**: `space-sidebar`, admin tab content, `/spaces/[spaceId]/manage`.
- **Key Modules**: `@hive/ui` `Button`, action slots, admin panel components once migrated.
- **Data Contracts**: `/api/spaces/{spaceId}/moderation`, `/api/spaces/{spaceId}/analytics` (planned).
- **Auth & Security**: admin endpoints require CSRF; ensure campus isolation enforced server-side.
- **Flags & Guardrails**: `featureFlags.spaces.moderationEnabled`, rate-limit join/leave.
- **Observability**: `space_admin_action`, `moderation_case_resolved`, `rate_limit_triggered`.
- **States**: admin tabs hidden from non-leaders; skeleton needed for analytics cards.
- **Related Docs**: `docs/design/ADMIN_DASHBOARD_COMPLETION_CHECKLIST.md`, `SECURITY_CHECKLIST.md`.

### Onboarding & Auth

#### Start & Marketing Surfaces
- **Status**: live — copy/config maintained; ensure campus-first media.
- **Lifecycle Phase**: Discover.
- **Primary Surfaces**: `apps/web/src/app/start/page.tsx`, `/waitlist/page.tsx`.
- **Key Modules**: marketing hero components, testimonials deck (`packages/ui/src/organisms/start`).
- **Data Contracts**: static props with ISR; waitlist form posts to `/api/waitlist`.
- **Auth & Security**: public routes; ensure rate-limited waitlist submission & CSRF on POST.
- **Flags & Guardrails**: campus imagery variant flag (`startConfig.campusTheme`).
- **Observability**: `start_page_view`, `waitlist_submitted`.
- **States**: skeleton not required (static), but empty testimonials fallback to campus quotes.
- **Related Docs**: `AUTH_ONBOARDING_PRD.md`, `docs/UX-UI-LAYOUT-GUIDE.md`.

#### Authentication Flow & Session Handshake
- **Status**: live — magic link verified; ongoing polish for error feedback.
- **Lifecycle Phase**: Discover.
- **Primary Surfaces**: `/login/page.tsx`, `/verify/page.tsx`.
- **Key Modules**: shared form components in `@hive/ui`, auth logic in `@hive/auth-logic`.
- **Data Contracts**: Firebase auth endpoints, secure session cookie issuance.
- **Auth & Security**: HttpOnly session default; bearer tokens accepted secondarily; enforce `withSecureAuth`.
- **Flags & Guardrails**: resend verification rate limit, `authConfig.supportsOAuth` (future).
- **Observability**: `auth_attempt`, `magic_link_sent`, `verification_failed`.
- **States**: inline form errors, global banner for rate limit; accessible labels per campus copy.
- **Related Docs**: `SECURITY_CHECKLIST.md`, `AUTH_ONBOARDING_PRD.md`.

#### Onboarding Stepper & Ghost Mode
- **Status**: hardening — core eight steps implemented; ghost mode gating needs QA.
- **Lifecycle Phase**: Discover → Activate.
- **Primary Surfaces**: `apps/web/src/app/onboarding/onboarding-experience.tsx`, step components under `/components/steps/*`.
- **Key Modules**: progress tracker, sticky footer, context rail (desktop) / mobile sheet.
- **Data Contracts**: Firestore `users/{uid}/onboarding`; majors list from `packages/core/src/constants/majors.ts`.
- **Auth & Security**: requires verified session; mutations use `secureApiFetch` with CSRF from middleware.
- **Flags & Guardrails**: `featureFlags.onboarding.ghostMode`, step-specific toggles (e.g., academics).
- **Observability**: `onboarding_step_completed`, `ghost_mode_enabled`, `onboarding_resume`.
- **States**: skeleton stepper (needs verifying), error banner for save failures, mobile CTA parity to maintain 44px targets.
- **Related Docs**: `docs/specs/AUTH_ONBOARDING_PRD.md`, `docs/UX-UI-LAYOUT-GUIDE.md`.

### Profile

#### Profile Bento Layout & Identity Hero
- **Status**: hardening — core layout live; needs token alignment + ghost overlays.
- **Lifecycle Phase**: Activate → Create.
- **Primary Surfaces**: `apps/web/src/app/profile/[id]/ProfilePageContent.tsx`.
- **Key Modules**: `packages/ui/src/atomic/templates/profile-view-layout.tsx`, profile organisms under `packages/ui/src/atomic/organisms/profile-*.tsx`.
- **Data Contracts**: profile loader (`apps/web/src/app/profile/[id]/loader.ts` if present) or API `/api/profile/{id}`; revalidation tags `profile:${userId}` (planned).
- **Auth & Security**: SSR fetch with `withSecureAuth`; privacy toggles require server enforcement.
- **Flags & Guardrails**: `featureFlags.profile.ghostMode`, campus badges gating.
- **Observability**: `profile_view`, `profile_primary_cta`, `profile_privacy_toggled`.
- **States**: hero skeleton + tile placeholders; ghost mode redacts data with accessible messaging.
- **Related Docs**: `docs/prd/20-platform-taxonomy.md` (Profile), `UX-UI-LAYOUT-GUIDE.md` (Bento template).

#### Tiles & Context Rail Tabs
- **Status**: hardening — majority populated; admin/notifications tabs partial.
- **Lifecycle Phase**: Activate → Steward.
- **Primary Surfaces**: tile components under `packages/ui/src/atomic/organisms/profile-*.tsx`, tabs within Profile page.
- **Key Modules**: stats tile, spaces tile, tools tile, activity feed, calendar preview.
- **Data Contracts**: Firestore collections for spaces, tools; ICS export action at `/api/calendar/export`.
- **Auth & Security**: ensure each fetch respects campus isolation; admin tabs CSRF-protected.
- **Flags & Guardrails**: `featureFlags.profile.adminTab`, `featureFlags.profile.analytics`.
- **Observability**: `profile_tile_interaction`, `calendar_export`, `tool_panel_opened`.
- **States**: tile-level skeletons (missing for some tiles), empty copy encourages action (“Join your first space”).
- **Related Docs**: `docs/design/PLATFORM_UI_COMPONENT_LIBRARY_PLAN.md` (tile coverage), `docs/design/ROADMAP_UI_UX_CLEANUP.md`.

### HiveLab (Tools)

#### HiveLab Overview & Builder Canvas
- **Status**: backlog — UI scaffolded via `HiveLabExperience`; persistence mocked.
- **Lifecycle Phase**: Create → Steward.
- **Primary Surfaces**: `apps/web/src/app/hivelab/page.tsx`.
- **Key Modules**: `@hive/ui` `HiveLabExperience`, `hiveLabOverviewMock`, `hiveLabModeCopy`.
- **Data Contracts**: pending secure API for tool save/publish (`/api/hivelab/tools` planned).
- **Auth & Security**: builder role required (`hasHiveLabAccess` from profile fetch); future CSRF enforcement on mutations.
- **Flags & Guardrails**: `featureFlags.hivelab.enabled`, certification gating before publish.
- **Observability**: target `hivelab_tool_saved`, `hivelab_mode_change`, `hivelab_publish_attempt`.
- **States**: placeholder alerts for save; need skeleton for loading compositions; ensure keyboard navigation of canvas.
- **Related Docs**: `docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md`, `docs/business/FULL_STACK_EXECUTION_SPEC.md`.

#### Tool Marketplace & Install Management
- **Status**: backlog — `/tools/page.tsx` mixes marketplace + personal tools; install flows partial.
- **Lifecycle Phase**: Activate → Create.
- **Primary Surfaces**: `apps/web/src/app/tools/page.tsx`.
- **Key Modules**: tool catalog listing, install CTA, HiveLab CTA banner.
- **Data Contracts**: `/api/tools`, `/api/tools/install`; needs SSR caching + tag invalidation.
- **Auth & Security**: requires `withSecureAuth`; install/uninstall must include CSRF token + rate limiting.
- **Flags & Guardrails**: `featureFlags.tools.marketplace`, `featureFlags.tools.recommendations`.
- **Observability**: `tool_install_started`, `tool_install_completed`, `tool_marketplace_view`.
- **States**: skeleton list, empty state prompting to request access; ensure mobile bottom sheet for manage actions.
- **Related Docs**: `docs/design/spaces/HIVELAB_CHECKLIST.md`, `FEATURES.md` (Tools completion).

### Cross-Surface Systems

#### Action System (Sticky CTA & Mobile Bottom Sheet)
- **Status**: hardening — desktop slots present; mobile parity incomplete.
- **Coverage**: Feed, Spaces, Profile, HiveLab.
- **Key Modules**: `packages/ui/src/organisms/app-shell-4.tsx`, `packages/ui/src/shells/UniversalShell.tsx`.
- **Data Contracts**: context-aware actions from feature-specific hooks (`useSpaceActions`, `useFeedActions`).
- **Auth & Security**: ensure CTA triggers use secure fetch helpers; admin actions include CSRF.
- **Flags & Guardrails**: `featureFlags.shell.stickyAction`, per-surface overrides.
- **Observability**: `sticky_cta_rendered`, `sticky_cta_clicked`, `mobile_bottom_sheet_opened`.
- **States**: fallback CTA for unauthenticated (`Sign in`); confirm 44px minimum on touch devices.
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md` (Action System), `0001-app-shell-sidebar07.md`.

#### Promotion Engine & Social Loops
- **Status**: backlog — high-signal promotions defined; automation not fully wired.
- **Coverage**: Feed stream, Spaces highlights, Notifications.
- **Key Modules**: feed promotion logic in `apps/web/src/server/feed/service.ts`, social loops integrated in `@/components/social`.
- **Data Contracts**: `space_post_promoted`, tool release metadata, invites.
- **Auth & Security**: promotion decisions server-side; ensure campus isolation.
- **Flags & Guardrails**: `featureFlags.promotions.enabled`, rate limit large broadcasts.
- **Observability**: `promotion_served`, `promotion_action_taken`, `invite_sent`.
- **States**: fallback to default card if promotion missing; ensure badges have aria labels (“Student-run”).
- **Related Docs**: `docs/UX-UI-LAYOUT-GUIDE.md` (Promotion Engine), `docs/prd/20-platform-taxonomy.md`.

#### Analytics & Telemetry Layer
- **Status**: hardening — shared schema exists; need coverage enforcement.
- **Coverage**: events defined in `apps/web/src/lib/analytics/events.ts`.
- **Key Modules**: analytics helper, `useTelemetry` hook, window `gtag` compatibility.
- **Data Contracts**: campus, persona, device metadata per event.
- **Auth & Security**: avoid leaking PII; ensure analytics calls respect consent flags.
- **Flags & Guardrails**: `featureFlags.analytics.enabled`, sampling toggles.
- **Observability**: monitor event drop-off in dashboard; track schema version changes.
- **States**: fallback to no-op if `gtag` absent; unit tests for required payload fields.
- **Related Docs**: `FEATURES.md` (Analytics), `docs/design/ROADMAP_UI_UX_CLEANUP.md`.

#### Admin Rail & CSRF Enforcement
- **Status**: backlog — admin dashboards partially implemented; CSRF middleware consolidating.
- **Coverage**: `/admin`, admin tabs within Spaces/Profile/HiveLab.
- **Key Modules**: `apps/web/src/lib/middleware/*`, admin components under `apps/web/src/app/admin`.
- **Data Contracts**: admin API endpoints with stricter rate limits.
- **Auth & Security**: require `withSecureAuth` + campus admin role; enforce `X-CSRF-Token` header.
- **Flags & Guardrails**: `featureFlags.admin.enabled`, per-campus access lists.
- **Observability**: `admin_action_attempt`, `admin_rate_limit_hit`.
- **States**: skeleton dashboards, unauthorized copy for non-admins; log security posture.
- **Related Docs**: `ADMIN_DASHBOARD_COMPLETION_CHECKLIST.md`, `SECURITY_CHECKLIST.md`.

---

## Topology → UI Implementation Map

### A. Spatial Topology (Slots S0–S4, Z1–Z2, R)
- **Slot kit source**: `packages/tokens/src/topology/slot-kit.json` enumerates slot order, max counts, and responsive fallbacks. Import via `import slotKit from '@hive/tokens/topology/slot-kit.json'`.
- **Shell alignment**: `packages/ui/src/shells/UniversalShell.tsx` should hydrate `S0` (nav) and `S1` (header) using slot metadata so every page in `apps/web/src/app` inherits predictable scaffolding.
- **Feed application**: `apps/web/src/app/feed/page.tsx` renders `RitualStrip` into `S2` when `feedConfig.features.ritualsEnabled`. `FeedSkeleton` mirrors the slot stack; composer deliberately omitted.
- **Space board**: `apps/web/src/app/spaces/[spaceId]/page.tsx` maps composer verbs to `S4`, chronological posts to `S3`, and pipes live items into `R1`. Desktop-only rail splits into `R1` live, `R2` widgets, `R3` upcoming, `R4` leader ops.
- **Calendar/About tabs**: when `apps/web/src/app/spaces/[spaceId]/calendar/page.tsx` lands, event selection opens `EventSheet` (`Z1`) to preserve sheet-first navigation.
- **Acceptance**: ≤2 pins enforced via `slotKit.capabilities`, pins/rail entries de-duped, mobile rail remaps to “Now” card + “Today” drawer.

### B. Temporal & Anticipatory Topology
- **Lifecycle states**: reuse `temporalStates` emitted alongside the slot kit (`open`, `remind`, `act`, `close`, `recap`) to tag events and stream items.
- **Reminders**: extend `apps/web/src/server/feed/service.ts` and space schedulers to fire T-24h/T-10m reminders while respecting quiet hours (22:00–08:00 campus time). Author shared guard in `packages/core/src/time/quiet-hours.ts`.
- **Recaps**: `apps/web/src/components/feed/cards/RecapCard.tsx` (new) ingests recap payloads once events close; Space board stream consumes recaps from `/api/spaces/{spaceId}/recaps`.
- **Acceptance**: only one `R1` live item at a time, reminders queue outside quiet hours, all time-boxed items publish recap metadata.

### C. Emotional Topology (Sleek Modes)
- **Mode tokens**: `packages/tokens/src/topology/mode-tokens.json` defines `calm`, `focus`, `warm`, `celebrate`, `urgent`, `sober` accents, copy tone, motion (100–160 ms) and reduced-motion fallbacks.
- **Resolver hook**: add `useExperienceMode` (`packages/hooks/src/topology/use-experience-mode.ts`) to select mode based on calendar context (e.g., finals → `focus`, welcome week → `warm`).
- **Application**: components like `SpaceSuccessToast` and `PostCard` inject `modeTokens[mode]` for halo, accent, and typography adjustments; respect `prefers-reduced-motion`.
- **Copy rules**: enforce one decisive verb per CTA and ≤12 words per prompt; tie into lint hook under Cognitive topology.
- **Acceptance**: no simultaneous urgency surfaces, halo animation collapses to color step when reduced motion is enabled.

### D. Cognitive Topology (Budgets & Lints)
- **Hook contract**: implement `useCognitiveBudget(surface, role, device)` in `packages/hooks/src/topology/use-cognitive-budget.ts`. Data source is `slotKit.cognitiveBudgets` keyed by surface (`feed`, `spaceBoard`, `hiveLab`, etc.).
- **Composer limits**: `apps/web/src/components/composer/ComposerChat.tsx` enforces ≤6 actions, presenting lint errors (`lintError` prop) before submit; publishes blocked when violations remain.
- **Tool builder**: HiveLab flows (`apps/web/src/app/hivelab/page.tsx`) apply budgets to cap ≤2 actions and ≤12 fields; override attempts require explicit admin unlock.
- **Acceptance**: budgets applied client-side and echoed in API validation, tool publishes fail with actionable fix suggestions.

### E. Social Topology (Distribution & Explainability)
- **Fairness rules**: `apps/web/src/server/feed/service.ts` enforces ≤3 items per space per page, campus-first exposure, and reputation gating. Co-host entries inherit the most restrictive visibility.
- **Explainability chips**: `apps/web/src/components/feed/PostCard.tsx` renders `ExplainabilityChip` (“From Robotics Club • Because you joined Engineering.”) using metadata from feed responses.
- **Ritual contract**: `RitualStrip` (`apps/web/src/components/feed/ritual-stories-strip.tsx`) always mounts in `S2`; recap injection flows through temporal recap pipeline.
- **Safety rails**: moderation/admin actions include CSRF via `apps/web/src/lib/middleware/csrf.ts` and rate limiting through `apps/web/src/lib/middleware/rate-limit.ts`.
- **Acceptance**: fairness cap met on every feed page, chips always show origin + reason, campus digest bundles overflow into single 17:00 recap.

---

## Page Recipes (Ready to Wire)

### Feed (Single Column)
- `S1` campus header (`apps/web/src/app/feed/components/CampusHeader.tsx`).
- `S2` ritual strip when active; absence collapses pins upward.
- `S3` stack of `PostCard`, `EventCard`, `SystemCard`, `RecapCard` with single CTA + explainability chip.
- Live events mark `modeTokens.urgent` styling; composer intentionally missing.

### Space — Board (Desktop)
- `S1` header (`packages/ui/src/atomic/molecules/space-header.tsx`, consumed in `apps/web/src/app/spaces/[spaceId]/page.tsx`) with role chip + accent.
- `S2` max one banner + ≤2 pins, validated by `useCognitiveBudget`.
- `S4` chat composer (`ComposerChat`) exposing `toggleVisibility` Space⇄Campus.
- `S3` chronological stream from `spaceFeed`.
- `R` rail: `R1` Now (single live item), `R2` widgets (≤2 `RailWidget` instances), `R3` upcoming (max 3), `R4` leader ops collapsed.
- Sheets (`EventSheet`) handle detail flows; no route hops.

### Space — Calendar
- Mobile defaults to list-first; desktop toggles month/list in `SpaceCalendarLayout`.
- Event rows show time pill, capacity bar, “Now” chip in live window.
- Selection opens `EventSheet` (`Z1`) with quick actions (Remind, Open/Close Check-in, Duplicate, Pin).

### Profile
- Header + stats (S1) via `packages/ui/src/atomic/templates/profile-view-layout.tsx` and identity widget.
- Timeline stream in `S3`; recommendations panel includes reason chips and campus scoping.
- Ghost mode overlays tinted with `modeTokens.sober`.

### HiveLab (Builder)
- Three panes (L/C/R) composed by `HiveLabExperience`; inspector hosts lint + complexity meter.
- Budgets restrict ≤2 tool actions and ≤12 fields; overrides flagged in inspector.

### Space Admin
- Multi-pane workspace in `apps/web/src/app/spaces/[spaceId]/manage/page.tsx` uses shell frames.
- Proofs/exports surfaced inline with soft cap (2/day/tool); rate limits visible.

---

## Component Contracts to Prioritize
- **ComposerChat** (`apps/web/src/components/composer/ComposerChat.tsx`): props `onSubmit`, `onOpenTool`, `onLintError`, `onToggleVisibility`; enforces ≤6 actions and emits lint payloads for publish gating.
- **PostCard variants** (`packages/ui/src/organisms/feed/PostCard.tsx`): standard/tool/event variants share `primaryCta`, `explainabilityMeta`, `openSheet`.
- **EventSheet** (`apps/web/src/components/events/EventSheet.tsx`): sections `Details`, `Extensions`, `Attendees`, `Chat`, `Activity`; exposes leader quick actions and `mode` prop for urgent state.
- **RailWidget** (`packages/ui/src/organisms/shell/RailWidget.tsx`): variants `action`, `progress`, `eventNow`; requires TTL, priority, and accessibility tokens per mode.
- **RitualStrip** (`apps/web/src/components/feed/ritual-stories-strip.tsx`): narrow layout, single CTA, recap auto-inject hook.
- **Inline Elements** (`packages/ui/src/elements/*`): RSVP chip, Slot picker, Poll/Rank, Quick Form, Ack, Counter share compact footprint and single CTA contract.

---

## Micro-Interactions & Copy (Sleek)
- Live state: “Happening now.” (single pulse, reduced-motion → color step only).
- Closing soon: thin countdown, “Closes in 2h.” using `modeTokens.urgent`.
- Recognition: “Thanks for joining.” optional “Add recap to Profile” CTA.
- Explainability: “From Robotics Club • Because you joined Engineering.” chip text.

---

## Instrumentation & KPIs
- Global: WAM, time-to-utility, 8-week retention tracked in `apps/web/src/lib/analytics/events.ts`.
- Space vitality: posts/week, RSVPs/week, active members% via `space_action` events.
- Feed: DAU sessions, scroll depth, CTR→space, hide/mute rate, diversity cap audit.
- Tools: start→publish %, completion %, cap overrides, proof exports from HiveLab inspector events.
- Cognitive: measure visible-choice counts vs budgets, lint violation rate, time-to-clarity telemetry.

---

## Sprint Handoff Checklist (Design ↔ Engineering)
- Deliver Figma slot kit (S0–S4, Z1–Z2, R) matching `slot-kit.json`.
- Publish Storybook states for ComposerChat, PostCard variants, EventSheet, RailWidget, RitualStrip, Elements (RSVP, Slots, Poll, Quick Form, Ack, Counter) referencing mode tokens.
- Implement `useCognitiveBudget` hook + lint blocks for composers, tools, and rail widgets.
- Wire reminder/recap triggers (T-24h, T-10m, atClose) with quiet-hour compliance and campus digest at 17:00.
- Ship explainability chips + feed fairness cap (≤3 items/space/page) with analytics coverage.

---

## Governance & Update Cadence
- **Weekly**: During design-engineering sync, review this registry for any shipped changes. Update status to prevent drift.
- **Before release**: QA uses the status + dependencies column to ensure responsive/a11y coverage, analytics, and CSRF are verified.
- **After incidents**: Document regression root causes here (under affected feature) with mitigation notes.
- **Versioning**: Keep changelog at the bottom of this file with date/author if substantial structural changes occur.

_Last updated: 2025-10-28 — Codex automation pass._
