Platform Taxonomy — Web Surfaces & Entities

Summary
- Provides a shared map of platform surfaces, the entities they expose, and the default states we must support.
- Anchors implementation work in the Next.js app at `apps/web`, keeping web-first priorities ahead of other clients.
- Highlights cross-surface dependencies so we can ship vertical slices (Feed, Spaces, Onboarding, Profile, HiveLab) end to end.

Guiding Principles
- Campus-first: copy, imagery, and attribution default to University at Buffalo until we deliberately widen scope.
- SSR/ISR ready: prefer server components, cached loaders, and `withSecureAuth` helpers so data is safe on the edge.
- Accessibility and responsiveness are non-negotiable; every surface owns skeletons, empty states, and keyboard parity.
- Gold (#FFD700) remains a focus treatment only; surfaces lean on semantic tokens from `packages/tokens`.
- Client fetches use the consolidated secure helpers with `credentials: 'include'`; avoid ad-hoc auth plumbing.

Canonical Entities (Data Taxonomy)
- Campus: `campusId`, isolation boundary for all reads/writes and feature flags.
- Profile: user identity, academics, presence, privacy, and badges (`/users/{uid}` with subcollections for connections).
- Space: campus community container with membership, posts, events, resources (`spaces`, `spaceMembers`, `spacePosts`).
- Ritual: scheduled feed moments/events that appear in `/feed` and `/rituals`; carries RSVP and reminder data.
- Event: time-bound occurrence owned by a Space or Ritual; includes location, attendance cap, and RSVP state.
- Tool (HiveLab asset): installable resource or workflow step; maps to builders, install states, and permissions.
- Notification: actionable alert routed through `/notifications` and command palette; respects campus isolation.
- Admin Artifact: moderation case, report, feature flag, or rate limit override exposed in `/admin`.
- Support Data: majors, interests, onboarding tasks, campus resources, and feature flags (`packages/core` constants).

Role & Permission Taxonomy
- Student (default): authenticated campus user; full access to Feed, Spaces, Onboarding, Profile, HiveLab browsing.
- Builder: Student with extra HiveLab capabilities (create/manage tools, view install analytics).
- Leader/Moderator: granted per Space; can approve members, review posts, manage events.
- Admin: elevated campus staff; access to `/admin`, feature flags, rate limits, enforcement tooling.
- Guest/Prospect: unauthenticated or waitlisted user; limited to landing/start surfaces and marketing content.

Surface Taxonomy (Primary Vertical Slices)
------------------------------------------

### Feed & Rituals (`/feed`, `/rituals`, `/events/[eventId]`, `/notifications`)
**Experience Goals**
- Celebrate student-led momentum and make it effortless to act on the next campus moment (join, cheer, plan).
- Build loyalty through repeatable rituals and peer energy without relying on overt Hive branding.

**Layout & Modules**
- **Momentum Hero** (desktop hero + mobile banner) with signals like “Students in motion,” participation counters, and CTA chips (“Start something”, “Boost a ritual”). Live in `apps/web/src/app/feed/page.tsx`.
- **Board Tablist** (`Today | Week | Updates`) implemented as a roving tablist molecule (`packages/ui/src/atomic/molecules/feed-board-tablist.tsx` once built). Drives `useFeed` query filters.
- **Horizontal Ritual Strip** sandwiched between hero and stream (`RitualStoriesStrip` / `RitualHorizontalCards`). Swipeable, progress-aware, and action-rich.
- **Stream Rows** for Ritual, Event, Announcement, Space Highlight, Tool Highlight cards using `PostCard` and feed modules in `apps/web/src/components/feed`. High-signal space posts (campus-level reach) and new tool releases automatically lift into this stream with badge treatment.
- **Notifications Preview** sits inline as a card group (no side rail), linking into `/notifications`.

**Interactions & Flows**
- Tab switching updates the feed query without full page reload; maintain scroll position per tab.
- Horizontal ritual strip supports keyboard scroll + click to open EventSheet overlay (`/events/[eventId]`) with RSVP and tools.
- “Preview space” opens lightweight modal preview; “Install tool” launches ToolPanel overlay.
- Notifications card opens `/notifications` route or inline modal for quick triage.
- Moderation controls surface inline on cards (badge + menu) with CSRF-protected actions.

**Responsive & Accessibility**
- Desktop: hero banner + horizontal strip + stream within 12-column grid (no right rail). Tablet: hero condenses, strip becomes swipeable carousel. Mobile: hero stacks above strip; strip becomes snap-scrolling deck; tablist converts to segmented control.
- Keyboard navigation: tablist uses arrow keys; ritual strip supports arrow/space to activate; cards supply focus outlines; overlays trap focus and support ESC.
- Screen reader copy reflects student ownership (“Led by Eco Club students”) while reinforcing autonomy not brand slogans.

**Edge States & Skeletons**
- Loading: `FeedSkeleton` mirrors hero banner, strip placeholders, and card rows.
- Empty: autonomy-focused messaging (“Your campus is quiet—spark the next moment”) with CTA (`Start something`).
- Error: full-width alert with retry + support link; offline fallback highlights saved posts if available.

**Data, Performance & Security**
- Fetch posts via `useFeed` backed by `secureApiFetch`; cache with `revalidateTag('feed:campus:${campusId}')`.
- Ritual data pre-fetched server-side to keep strip interactive within ≤2.5s p75 TTI.
- All actions (like, RSVP, boost) use optimistic UI with rollback toasts; CSRF enforced for privileged mutations.

**Analytics & Telemetry**
- Emit `feed_tab_changed`, `feed_refresh`, `ritual_strip_engaged`, `event_sheet_open`, `space_preview_impression`, `notification_peek_opened`.
- Include persona, campusId, route, and interaction source in payload; log via `apps/web/src/lib/analytics/events.ts`.

**Supporting Assets**
- Stories: `packages/ui/src/stories/06-Pages/Feed.Board.stories.tsx` (default, empty, mobile, admin).
- Docs: `docs/UX-UI-PLAYBOOK.md` (copy), `docs/analytics/creation-engine-tracking-plan.md`.
- Sample data: `docs/dev/samples/engage_ub_events.json`.

### Spaces (`/spaces`, `/spaces/[spaceId]`, `/spaces/browse`, `/spaces/search`, `/spaces/create`)
**Experience Goals**
- Make campus communities feel student-owned, with fast previews and clear signals about who is leading the momentum.
- Give leaders and moderators the tools to grow responsibly—approvals, events, rituals, tools—without leaving the space canvas.
- Feed upstream surfaces (Feed, notifications) with the right highlights: high-impact posts, new tool launches, upcoming events.

**Layout & Modules**
- **Discovery Hub** (`space-discovery-hub.tsx`) — hero with campus filters, tag pills, “student-run / leader badges”, and grid/list toggle. Cards show membership count, last activity, and “Auto-promoted” badge when the space has an active highlight in Feed.
- **Space Detail Template** (`unified-space-interface.tsx`) — hero cover with leadership roster + trust badges, main board stream, sticky action slot (Join/Leave/Invite/Boost), and context rail.
- **Context Rail** (`space-context-panel.tsx`) — tabbed lanes: Details, Events, Tools, Comments, Activity, Admin, Experiments. Each tab shares analytics + focus handling with shell contract.
- **Board Stream** (`space-post-feed.tsx`) — pinned announcements, member posts, tool prompts, and event recaps. Composer available to leaders/mods; ghosted for read-only members.
- **Event & Tool Modules** — Event marquee (top three upcoming + live indicator) and inline Tool widgets. Tool actions load ToolPanel overlay while staying within space context.
- **Member Operations** (`space-member-management.tsx`, `space-member-list.tsx`) — approvals queue, roster filters, role assignments, transfer ownership.

**Interactions & Flows**
- Discovery card hover → quick preview rail (join CTA, roles, upcoming events). Clicking enters detail page.
- Join CTA respects membership policy (instant, approval, invite-only) with optimistic toast + undo. Approval flows notify leaders and the applicant.
- Event marquee rows open EventSheet overlay; RSVP state syncs to Feed/HiveLab analytics.
- Composer actions (post, ritual highlight, tool prompt) feed both space board and, when thresholds hit, the platform feed with “From [Space]” badge.
- Tool actions launch ToolPanel with contextual quotas (per space) and CSRF-protected mutations.
- Admin tab exposes moderation queue, flag history, safety settings (ghost mode enforcement, banned members).

**Responsive & Accessibility**
- Desktop: hero + board + inline rail (360px). Tablet: rail collapses to slide-over; hero condenses; sticky CTA sits under cover. Mobile: hero stacks, board cards become single column, sticky action sheet anchors bottom.
- Keyboard access for tablist, member lists, and board cards; aria labels on badges (“Student-led”, “Open requests”).
- Ghost mode hides sensitive member info but surfaces counts + prompts (“Request access to view members”).

**Edge States & Skeletons**
- Loading: `spaces-loading-skeleton.tsx` replicates hero cover shimmer, board skeleton cards, rail placeholders.
- Empty: upside prompts (“Be the first to document what’s happening”) with invite peers CTA and quick-start ritual suggestions.
- Locked: invite-only spaces show secure copy (“Ask a leader for access”) with path to request.
- Error: glass alert with retry + support link; respects auth state.

**Data, Performance & Security**
- Server loaders fetch `spaces`, `spaceMembers`, `spacePosts`, `events`, `tools` scoped by `campusId`; caching via `revalidateTag('space:${spaceId}')`.
- Joining/leaving, event RSVPs, tool installs require CSRF headers; revalidate tags per action (`space:${spaceId}`, `feed:campus:${campusId}`).
- Live board/activity stream uses SSE where available with fallback polling.
- Promotion rules: high engagement posts trigger `promoteToFeed` flag stored server-side; tool releases flagged in `packages/core/src/hivelab/catalog.ts`.

**Analytics & Telemetry**
- Events: `space_viewed`, `space_join_initiated/completed`, `space_post_created`, `space_post_promoted`, `space_tool_opened`, `space_event_rsvp`, `space_moderation_action`, `space_member_approved`.
- Payload includes membership status, persona, space type (club, academic, greek), feature flags, device breakpoint.

**Supporting Assets**
- Stories: `packages/ui/src/stories/13-Spaces-Communities/SpacesSystem.stories.tsx` (leader, ghost, event-forward, mobile).
- Docs: `docs/design/spaces/SPACES_NAVIGATION_RESEARCH_BRIEF.md`, `docs/design/spaces/SPACES_UI_UX_PLANNING.md`.
- Specs & Backlog: `docs/UX-UI-TAXONOMY.md`, `docs/design/spaces/STORYBOOK_SCAFFOLD.md`.

### Onboarding & Auth (`/auth/*`, `/onboarding`, `/start`, `/waitlist`)
**Experience Goals**
- Convert verified UB students quickly while reinforcing campus identity and safety commitments.
- Provide a forgiving stepper that supports pauses, ghost mode, and resume experiences.

**Layout & Modules**
- **Start & Marketing Surfaces** (`/start`, `/waitlist`) highlight value prop, testimonies, and campus imagery.
- **Authentication Screens** (sign-in, verify, reset) use shared form components with secure messaging and fallback help.
- **Onboarding Stepper** (`onboarding-experience.tsx`) with hero panel, progress tracker, step form, sticky footer actions.
- **Context Rail** surfaces checklist, support, and ghost toggle; collapses to mobile sheet on narrow breakpoints.
- **Sandbox Routes** (`/ux/onboarding/*`) mirror production layouts with mocked data for experimentation.

**Interactions & Flows**
- Sign-in collects campus email → verify with code entry (supports resend, fallback security question).
- Step completion auto-saves via optimistic `secureApiFetch`; leaving mid-step surfaces resume banner on next sign-in.
- Ghost mode allows skipping interest-heavy steps, gating feed content until completion.
- Waitlist captures email + invite code; success screen offers share link and timeline.
- Error handling provides inline validation + global alert for auth failures.

**Responsive & Accessibility**
- Desktop: split hero/stepper columns; rail inline. Tablet: hero compresses, rail collapses to accordion. Mobile: stepper occupies full width with sticky bottom actions.
- Accessible focus order, live regions for verification timers, descriptive form labels and helper text.
- Reduced motion support for step transitions; avoids disruptive animations.

**Edge States & Skeletons**
- Loading: skeleton stepper card + checklist placeholders.
- Error: red status banner with retry instructions; verify step warns about rate limits.
- Locked state: blocks reuse of expired invites with support CTA.

**Data, Performance & Security**
- Auth pipeline prioritizes HttpOnly session cookies; Firebase bearer tokens accepted for dev via `withSecureAuth`.
- Onboarding progress stored in Firestore `users/{uid}/onboarding`; campus verification enforced on server components.
- Rate limiting on verification resend; CSRF on onboarding mutations via `apps/web/src/lib/middleware`.

**Analytics & Telemetry**
- `auth_attempt`, `verification_step`, `onboarding_step_completed/skipped`, `ghost_mode_enabled`, `onboarding_completed`, `waitlist_submitted`.
- Events include step ID, outcome, persona, device, and time-to-complete.

**Supporting Assets**
- Docs: `AUTH_ONBOARDING_PRD.md`, `docs/onboarding-catalog.md`.
- Stories: `packages/ui/src/stories/08-Auth/OnboardingExperience.stories.tsx`, `.../StartFlow.*`.
- Catalog: `packages/core/src/constants/majors.ts` used in academics step.

### Profile (`/profile/[id]`, `/profile/edit`, `/profile/settings`, `/profile/connections`, `/profile/calendar`)
**Experience Goals**
- Showcase student identity, involvement, and tools in a campus-first, trustworthy layout.
- Allow quick actions (connect, invite, message) and provide leaders/admins with management rails.

**Layout & Modules**
- **Bento Template** (`profile-view-layout.tsx`) orchestrates hero, sticky action rail, and modular grid.
- **Hero Band** managed by `profile-identity-widget.tsx` with campus badges, pronouns, ghost banner when needed.
- **Bento Tiles** include stats, spaces, tools, ritual attendance, activity feed, calendar preview, connections row (widgets under `profile-*.tsx`).
- **Right Rail Tabs**: Shared tabs for Details, Shared Spaces, Shared Tools, Activity, Comments, Admin, Notifications.
- **Edit & Settings** flows reuse same template with inline edit badges and autosave toasts.

**Interactions & Flows**
- Primary CTA adapts by persona (Connect, Message, Invite to space, Manage profile).
- Connections row supports quick connect, remove, or message actions.
- Activity items deep link into spaces/posts with preview rails.
- Privacy toggle updates view instantly with ghost overlay, emits analytics, and enforces on server render.
- Calendar export triggers ICS download + toast, with fallback deep links to Google/Outlook.

**Responsive & Accessibility**
- Desktop: three-column bento with inline rail. Tablet: two-column stack, rail overlays. Mobile: single-column cards with sticky CTA sheet and rail accessible via bottom tray.
- Keyboard support across tile focus, CTA buttons, and rail tablist; aria labels on badges (“Verified UB Student”).
- Ghost mode ensures screen readers do not read redacted data; alt text describes ghost avatar.

**Edge States & Skeletons**
- Loading: hero skeleton + tile placeholders.
- Empty: prompts to add major, join spaces, install tools; ghost mode explains limited visibility.
- Error: fallback card with retry + contact support.

**Data, Performance & Security**
- Server fetch uses schema documented in `PROFILE_DATA_SCHEMA.md`, cached with `revalidateTag('profile:${userId}')`.
- Connections/actions require CSRF tokens and log updates to analytics + moderation.
- Presence (last seen) displayed with accessible text; real-time fallback to cached value.

**Analytics & Telemetry**
- `profile_viewed`, `profile_connect_clicked/confirmed`, `profile_message_clicked`, `profile_invite_to_space`, `profile_edit_saved`, `profile_privacy_changed`, `profile_calendar_export`, `rail_tab_view`.
- Capture viewer persona, relationship to owner, campus alignment.

**Supporting Assets**
- Stories: `packages/ui/src/stories/04-Organisms/ProfileSystem.stories.tsx`.
- Docs: `packages/ui/HIVE_PROFILE_STORYBOOK_STRUCTURE.md`, `docs/UX-UI-PLAYBOOK.md`.
- Tasks: backlog in `docs/UX-UI-TAXONOMY.md` for pending widgets.

### HiveLab & Tools (`/hivelab`, `/tools`, `/tools/[toolId]`, `/tools/[toolId]/manage`, `/tools/create`, `/tools/[toolId]/edit`)
**Experience Goals**
- Make student-built tools feel trustworthy and actionable—clearly show who built them, where they run, and how they help a space.
- Provide a full builder lifecycle: ideate, prototype, lint, submit for certification, monitor installs, and iterate.
- Highlight new tool releases in Feed/Spaces automatically so communities adopt them quickly.

**Layout & Modules**
- **Discovery Grid** (`apps/web/src/app/tools/page.tsx`) — hero filters for slot (board card, rail panel, composer, automation), certification level (Pilot, Certified), and popularity. Cards show builder badge, campus certification, install count, and “Recently launched” flag when cross-promoted in Feed.
- **Tool Detail** (`/tools/[toolId]`) — hero with icon, builder profile chip, install CTA. Tabs for Overview, Requirements, Changelog, Reviews, plus inline metrics (installs per space, active runs).
- **ToolPanel** (overlay/rail) — Primary Action, Parameters (schema-driven via forthcoming form primitive), Results history (virtualized), Settings (leaders only), Comments/Feedback, Support footer. Works both in spaces (rail) and feed (modal overlay).
- **Manage View** (`/tools/[toolId]/manage`) — install roster, slot toggles, quotas, version history, experiment flags, audit log.
- **HiveLab Canvas** (`/tools/[toolId]/edit`, `/hivelab`) — left Library (elements/templates/my tools), central Canvas (zoom/pan, snap grid, multi-select, undo/redo), right Inspector tabs (Details, Inputs schema, Outputs, Permissions, Quotas, Lints, Logs). Sandbox run (⌘/Ctrl+Enter) shows results below Canvas.
- **Admin Tools** (`/admin/tools`) — certification queue, lint results, compliance checklist, decision actions with CSRF + audit trail.

**Interactions & Flows**
- Discovery → Detail → Install flow uses progress toast + undo. Successful install surfaces quick-launch shortcuts (Run now, Add to space, Pin to board).
- Running a tool (in Feed or Space) opens ToolPanel; results append to history with status chips. Errors show inline alerts with retry.
- Manage view toggles slot availability (cardCTA, railPanel, composerAction, widget, calendarEnhancer, automation) with optimistic UI and CSRF protection.
- HiveLab canvas lifecycle: draft → lint → submit for review → pilot → certified → deprecated. Builders see status timeline and reviewer notes.
- Admin review: open submission, inspect canvas, run automated lint + manual checklists, approve/deny with notes; triggers notifications to builder and relevant spaces.
- New release tag automatically posts a highlight card to Feed/Spaces when approved (with builder attribution and “Install” CTA).

**Responsive & Accessibility**
- Discovery/detail adapt grid columns (desktop ≥3 cards per row, tablet 2, mobile list). ToolPanel becomes full-screen sheet on tablet/mobile with sticky footer actions.
- Canvas supports keyboard shortcuts, focus outlines, and screen-reader announcements for lint errors and publish status.
- Schema-driven forms include accessible labels, helper text, and aria-live success/error messaging.

**Edge States & Skeletons**
- Loading: shimmer grid for discovery, hero skeleton for detail, ToolPanel skeleton placeholders.
- Empty: builder recruitment copy (“Your campus is waiting for its next tool”) with CTA to open HiveLab canvas.
- Error: inline alerts with retry + support link; lint failures list actionable guidance next to offending node.
- Deprecated: detail page surfaces warning banner with migration guidance.

**Data, Performance & Security**
- Fetch data via `secureApiFetch`; cache with `revalidateTag('tool:${toolId}')`, `revalidateTag('builder:${builderId}')`, and `revalidateTag('tools:campus:${campusId}')`.
- Install/execute mutations require CSRF; long-running installs use polling/SSE; failures trigger rollback + toast.
- Execution logs stored server-side with per-space redaction; ToolPanel fetches summarized view only.
- Release promotions to Feed/Spaces driven by catalog metadata + install thresholds; stored in `packages/core/src/hivelab/catalog.ts`.

**Analytics & Telemetry**
- `tool_viewed`, `tool_install_initiated/completed`, `tool_action_executed`, `tool_setting_changed`, `tool_uninstalled`, `tool_release_promoted`, `builder_create/save/run_sandbox`, `builder_publish_submitted/approved`, `builder_version_bumped`, `canvas_zoom_changed`, `lint_issue_resolved`.
- Payload includes toolId, slot, persona (student/leader/builder/admin), campusId, certification level, experiment flag.

**Supporting Assets**
- Docs: `docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md`, `docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md`, `docs/design/BACKEND_HIVELAB_COMPLETION_CHECKLIST.md`.
- Stories: `packages/ui/src/stories/07-Complete-Systems/HiveLab.Tools.stories.tsx` (discovery/detail/manage/builder).
- Catalog & metadata: `packages/core/src/hivelab/catalog.ts`, `packages/core/src/hivelab`.

Supporting & System Surfaces
----------------------------

### Navigation Shell (`apps/web/src/app/layout.tsx`, `packages/ui/src/shells/UniversalShell.tsx`)
- Glass sidebar + top bar + optional right rail; honors safe-area insets and 4px spacing scale.
- Sidebar: primary nav (Feed, Spaces, HiveLab), campus switcher, command palette trigger, notifications badge.
- Right rail: inline ≥1280px, otherwise slide-over sheet toggled via toolbar button; retains focus and ESC closes.
- Mobile: replaces sidebar with tab bar (`packages/ui/src/stories/Navigation.MobileTabBar.stories.tsx`) and moves rail to bottom sheet.
- Analytics: `nav_item_click`, `nav_collapse_toggle`, `nav_workspace_switch`, `command_palette_open`, `rail_open/close`, `rail_tab_view`.
- Skeleton: shimmer nav icons, top bar placeholders, rail skeleton.

### Search & Command (`/resources`, `/start`, Command Palette)
- Command palette overlays across routes, offering quick search of spaces, rituals, tools, profiles with keyboard support.
- `/resources` and `/start` share discovery UI for public content and help articles.
- Integrates with analytics (`command_palette_search`, `command_palette_result_selected`) and respects campus isolation.

### Calendar (`/calendar`, `/profile/calendar`)
- Unified agenda for rituals/events/class sync with week/day views and filters.
- Allows RSVP, add-to-calendar (ICS, Google, Outlook), share copy; ties into presence data.
- Mobile experience relies on scrollable agenda list + sticky actions.

### Settings & Legal (`/settings`, `/notifications/preferences`, `/legal/*`)
- Account, privacy, notification preferences; each uses consistent form primitives with autosave indicators.
- Legal pages (`/legal/terms`, `/legal/privacy`) provide accessible navigation and print-friendly layout.
- Admin-specific settings surfaced under `/admin` with stricter CSRF/rate limiting.

### Admin Console (`/admin`)
- Dashboard summarizing alerts, moderation queue, analytics, and feature flags.
- Uses `secureApiFetch` with campus isolation and includes explicit CSRF tokens on mutations.
- Provides deep links to moderation cases, rate limit overrides, and onboarding catalog editor.

### Landing & Prospect (`/landing`, `/start`, `/waitlist`)
- Marketing copy highlighting campus impact, builder stories, and safety commitments.
- Supports unauthenticated visitors with lead capture, shareable hero, and CTA into waitlist or sign-in.
- Leverages tokens for dark/glass aesthetic; ensures performance budgets for first-time visitors.

Shared State & UX Patterns
--------------------------
- **Skeletons**: each route exports a matching `loading.tsx` that mirrors final geometry to avoid CLS; skeleton components live adjacent to primary module files.
- **Empty States**: campus-first copy, CTA to explore/create, optional illustration; documented in `docs/UX-UI-PLAYBOOK.md`.
- **Error Handling**: glass alert component with retry + support contact; differentiate between permission errors and system failures.
- **Ghost Mode**: available on Profiles and certain spaces; redacts sensitive info, swaps avatar to neutral silhouette, and updates analytics persona.
- **Right Rail Contract**: tabs (Details, Activity, Tools, Comments, Admin, Experiments) with analytics hooks and keyboard support; slide-over variant on tablet/mobile.
- **Safe-Area & Motion**: universal respect for `env(safe-area-inset-*)` and `motion-safe` wrappers; collapse animations rely on transform/opacity only.

Networking & Data Access
------------------------
- Use `withSecureAuth` middleware and `secureApiFetch` helper for all authenticated requests; never rely on `localStorage` tokens.
- Prefetch key payloads via server components and tag caching (`revalidateTag`) for feed, spaces, tools, profiles, onboarding.
- Rate-limit creation and admin endpoints; expose remaining quota via tooltip copy (“2 promotions left today”).
- Emit analytics through centralized helper (`apps/web/src/lib/analytics/events.ts`); extend canonical event schema only with documented fields.

Acceptance & Next Steps
-----------------------
- Each vertical slice owner reviews and updates this taxonomy when routes, flows, or entities change.
- New surfaces must register UX, data, and analytics expectations here before implementation.
- PRs touching navigation, shared middleware, or vertical surfaces should link to relevant sections for reviewer context.
