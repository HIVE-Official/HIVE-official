<!-- Bounded Context Owner: Spaces Guild -->

Status: Deferred (Reference Only)
Owner: Spaces Guild
Last updated: 2025-10-18

Note: Backend‑First Execution is in effect (see AGENTS.md; TODO.md). Treat this as design reference only; do not execute UI tickets until spaces serializers, policies, and APIs are locked.
Important

- Single source of truth for product and IA is `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`. This scaffold is for Storybook coverage only.
- Runtime reminder: the web app now requires real Firebase data for spaces/feed/tools. Local seed fixtures only load when `ENABLE_DEV_SEEDS=true`.

# Spaces Slice - Storybook Scaffold

This document distills the Spaces UI/UX spec into Storybook requirements. Every story must:

- Render the canonical post serializer output (use the adapter in `apps/web/src/components/spaces/post-adapter.ts`).
- Expose controls for theme (light/dark), density, glass, reduced motion, and the four space types (Student Org, University Org, Greek Life, Residential).
- Link to the spec section it proves (`docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md` headings).
- Include accessibility notes (keyboard steps), performance expectations, and copy variants when relevant.

Use `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md` for behavior/details and the blueprint in `docs/design/spaces/SPACES_DDD_IMPLEMENTATION_PLAN.md` for domain contracts.

## 0. Foundations & Data Binding

- `Foundation/Spaces/SpecOverview` — DONE when the story shows spec highlights, quick links to every slice story, and explains how to load fixture data.
- `Foundation/Spaces/DataAdapters` — TODO. Demonstrate how the serializer → adapter output maps onto UI components. Include JSON panel using `serializePost` sample + the adapted view model.
- `Foundation/Spaces/ThemeAndDensity` — TODO. Control panel toggling light/dark, density, glass, reduced motion, high contrast. Re-render sample post stream + calendar widgets.

## 1. Post Stream (Home)

Stories under `Spaces/PostStream/*`

1. `Spaces/PostStream/HeaderAndTabs` — ✅ DONE (2025-10-18)

   - **Story**: packages/ui/src/stories/Spaces.PostStream.stories.tsx
   - Desktop + mobile headers, verified chip, quick links, `All·Events·Tools` tabs
   - Keyboard traversal functional

2. `Spaces/PostStream/Composer` — ✅ DONE (2025-10-18)

   - **Story**: packages/ui/src/stories/Spaces.Composer.stories.tsx
   - ChatGPT-style bottom composer with auto-expanding textarea
   - Plus button reveals tools (Post, Event, Poll, Announcement)
   - States: default, tool-picker open, validation error, disabled, not-member
   - Microcopy hints for Heads-Up, Poll, Slots
   - Media/file attachment buttons included

3. `Spaces/PostStream/PinnedCarousel` — ✅ DONE (2025-10-18)

   - **Story**: packages/ui/src/stories/Spaces.PinnedCarousel.stories.tsx
   - **Component**: packages/ui/src/organisms/spaces/pinned-cluster.tsx
   - Max 2 posts with PinTimer component
   - Keyboard navigable, swipe-ready structure
   - Expired pin preview with "Unpin?" action

4. `Spaces/PostStream/PostVariants` — ✅ DONE (2025-10-18)

   - **Story**: packages/ui/src/stories/Spaces.PostStream.stories.tsx (Default + ModerationGhost)
   - Standard, Event, Announcement cards rendering
   - Footer interactions: react, comment, share buttons
   - Moderation ghost state for leaders

5. `Spaces/PostStream/CommentsSheet` — ✅ DONE (2025-10-18)

   - **Story**: packages/ui/src/stories/Spaces.CommentsSheet.stories.tsx
   - **Component**: packages/ui/src/organisms/spaces/comments-sheet.tsx
   - Bottom sheet with replies list, pagination ("Show 5 more")
   - Mentions support (@username), Cmd/Ctrl+Enter to send
   - Empty state ("No replies yet—be first"), error/retry state
   - Role badges (Leader, Mod), reaction counts

6. `Spaces/PostStream/SafetyQueue` — ✅ DONE (2025-10-18)
   - **Story**: packages/ui/src/stories/Spaces.SafetyQueue.stories.tsx
   - **Component**: packages/ui/src/organisms/spaces/safety-queue.tsx
   - MediaApprovalPlaceholder for non-leaders
   - Leader queue with approve/deny actions
   - GhostPost component for auto-hidden/manual-hidden/removed posts
   - Escalate to campus action

Performance note: include story docs verifying virtualization strategy (mocked list of 30 posts) and link to performance budgets.

## 2. Event Sheet & Live Extensions

Stories under `Spaces/Event/*`

1. `Spaces/Event/SheetTabs` — TODO

   - L1 sheet with tabs: Details, Extensions, Attendees, Chat, Activity. Show responsive behavior and focus trapping.

2. `Spaces/Event/RSVPStates` — TODO

   - RSVP Yes/Maybe/No, waitlist, capacity full, undo toast, reminders toggled.

3. `Spaces/Event/CheckIn` — TODO

   - Tap-in view for members vs leaders (station controls). Include late window and export button.

4. `Spaces/Event/Extensions` — TODO

   - Tiles for Before/During/After extensions (Checklist, Slots, PhotoDrop, Feedback). Show statuses (Open, Done, Locked) and “Open in HiveLab” control.

5. `Spaces/Event/ProofMenu` — TODO

   - Proof dropdown demonstrating RSVP CSV, Check-In CSV, ICS, Recap PDF, Co-host split CSV, and redaction selector.

6. `Spaces/Event/Chat` — TODO
   - Live chat view with send, read-only after window, reduced-motion behavior.

## 3. Calendar (Month & List)

Stories under `Spaces/Calendar/*`

1. `Spaces/Calendar/MonthDesktop` — TODO

   - Mini-month + list combo, `+N` overflow, keyboard navigation, filters visible.

2. `Spaces/Calendar/ListDesktop` — TODO

   - Grouped days with live “Now” chip, live event pinned to top, empty state.

3. `Spaces/Calendar/MobileList` — TODO

   - List-first view with sticky `+ New Event`, filter sheet.

4. `Spaces/Calendar/CreateEdit` — TODO

   - Event creation sheet: default, T-24 locked (reschedule disabled), Cancel + Duplicate path.

5. `Spaces/Calendar/Filters` — TODO
   - Showcase Visibility, Host, Time, State, “Has extensions” toggles.

## 4. Members & Labels

Stories under `Spaces/Members/*`

- `Spaces/Members/Roster` — TODO. Table + card view, search, sort, labels, quick DM action.
- `Spaces/Members/LabelsManager` — TODO. Manage labels (create, rename, self-selectable vs admin). Include empty, editing, limit reached states.
- `Spaces/Members/BulkActions` — TODO. Role changes, label assignment, remove/ban confirmation.

## 5. About

- `Spaces/About/ReadOnly` — TODO. Banner, overview, tags, links, policy summary, contacts, version history (leader vs member view).
- `Spaces/About/Edit` — TODO. Section editor sheets with lints (profanity, PII, link safety) and preview before save.

## 6. Tools & Context Panel

### Admin ► Tools

- `Spaces/Tools/Lanes` — TODO. Active/Scheduled/Installed/Warnings lanes with status badges and quick actions (Pause, Resume, Extend TTL, Duplicate, Proof, Open in HiveLab).
- `Spaces/Tools/ComposerActionsEditor` — TODO. Drag-and-drop ordering with limit of 6, warnings when exceeding.
- `Spaces/Tools/Library` — TODO. Certified/Community/My Tools filters, search, empty states.
- `Spaces/Tools/Warnings` — TODO. Lint, Light-Mode, quota warnings with CTA.

### In-Space Context

- `Spaces/ContextPanel/Today` — TODO. Live tools (Tap-in, Queue, Counter) states.
- `Spaces/ContextPanel/NextSevenDays` — TODO. Scheduled tools/events summary.
- `Spaces/ContextPanel/Warnings` — TODO. Quota + Light-Mode banners.

### Widgets

- `Spaces/Widgets/Dock` — TODO. Showcase 3 Space Dock widgets (Tap-in, Heads-Up, Counter) and Event Live Dock widget, with TTL/expiry behavior.

## 7. Analytics

- `Spaces/Analytics/Overview` — TODO. KPI tiles (posts/member, active %, report ratio, RSVP→Check-In %, export count) with controls for 7/28/90d.
- `Spaces/Analytics/Funnels` — TODO. Events funnel and tool usage funnel visuals, includes table mode toggle and CSV download.
- `Spaces/Analytics/Filters` — TODO. Filters for label cohort, tool type, range.

## 8. Moderation & Audit

- `Spaces/Moderation/Queue` — TODO. Report list with severity sorting, preview, actions (Hide, Unhide, Remove, Warn, Mute, Ban, Escalate).
- `Spaces/Moderation/GhostState` — TODO. Hidden post view for leaders.
- `Spaces/Moderation/AuditLog` — TODO. Immutable log with filters + export.

## 9. Settings

- `Spaces/Settings/Access` — TODO. Open/request/invite-only radio group with helper text per space type.
- `Spaces/Settings/Policies` — TODO. Posting policy (members/leaders-only), share-to-campus toggle, digest quotas.
- `Spaces/Settings/Modules` — TODO. Module reorder/hide UI.
- `Spaces/Settings/Governance` — TODO. Ownership transfer, archive/delete flows, compliance notices.

## 10. Cross-cutting States & Errors

- `Spaces/States/Empty` — TODO. Empty states for stream, calendar, members, tools.
- `Spaces/States/Loading` — TODO. Skeletons mapped to 60/40 layout, composer, event sheet, calendar cells.
- `Spaces/States/Error` — TODO. Offline/retry patterns for posts, events, members, moderation.
- `Spaces/States/Toasts` — TODO. Success, warning, error, neutral examples with durations & focus management.

## 11. Accessibility & Performance Harness

- `Spaces/Accessibility/KeyboardJourney` — TODO. Walkthrough from composer to post manage actions with keyboard only.
- `Spaces/Accessibility/ReducedMotion` — TODO. Compare animations vs reduced-motion fallbacks.
- `Spaces/Performance/StreamLoad` — TODO. Simulated 30-post render with FPS counters & notes on virtualization.

## 12. Acceptance Tracking

- Use this doc to log Storybook URLs, completion dates, reviewer initials.
- Run Storybook a11y addon, theme toggles, and screenshot diffs before marking a story complete.
- When a story is done, link it in the relevant section and update `TODO.md`.

---

Delivery order suggestion (mirrors execution plan):

1. Post Stream (composer, posts, comments, safety, pinned).
2. Event sheet + calendar.
3. Members + About.
4. Tools/Admin/Context widgets.
5. Analytics & Moderation.
6. Settings, cross-cutting states, accessibility harness.

Once each slice’s Storybook coverage is complete and linked here, move the matching implementation task into active status for the Next.js app shell.

## 0. IA and Navigation Blueprint

- `Foundation/Spaces/IAOutline`: TODO - Build an interactive diagram (controls for mobile, tablet, desktop) that visualizes global IA: Spaces Overview, Space Detail, Feed, Tools, Profile, Notifications, Settings. Highlight allowed molecule sets per screen and link each node to its Storybook story.
- `Foundation/Spaces/NavStates`: TODO - Showcase global navigation states (default, condensed, notifications unread, command palette open). Include keyboard traversal order, focus rings, and high contrast variants.
- `Foundation/Spaces/FirstRunEntry`: TODO - Model the first-visit experience with guidance modals, spotlight walkthrough, and a trimmed nav showing only critical destinations. Include copy variations for each space type.
- `Foundation/Spaces/MatureNav`: TODO - Demonstrate navigation once the user has joined multiple spaces: quick switcher, recents, pinned spaces, and overflow behaviors. Include responsive breakpoints and sticky sub-tabs inside Space Detail.
- `Foundation/Spaces/PermissionStates`: TODO - Document navigation adjustments for moderators/admins (extra tabs, badges, moderation dashboard links) versus members/guests. Capture edge cases like suspended access or read-only.

## 1. Entry Points and Shell

- `Foundation/Spaces/NavigationPreview`: TODO - Showcase global entry (sidebar, quick switcher chip, notification pill). Include light and high-contrast variants.
- `Foundation/Spaces/Shell`: TODO - Demonstrate the in-space header, tab strip, and breadcrumb hand-off with responsive breakpoints (desktop, tablet, mobile).

## 2. Spaces Home

- `Spaces/Home/FirstTimeExperience`: TODO - Hero checklist for brand-new members (recommended spaces hidden after first join, include contextual copy per space type).
- `Spaces/Home/EstablishedDashboard`: TODO - Slim layout for returning users with joined spaces, quick links, and optional recommended strip tucked below the fold.
- `Spaces/Home/FeaturedCarousel`: TODO - Carousel item states (default, hover, focus, visited) with analytics badge.
- `Spaces/Home/FiltersPanel`: TODO - Filter chips (selected, disabled), search input, clear CTA. Ensure iconography matches spec.

## 3. Space Overview (60/40 Layout)

- `Spaces/Overview/Layout`: TODO - Implement `grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6`, enforce `min-w-[320px]` for both columns, and apply `xl:sticky top-header` to the events rail. Provide toggle that expands the events widget to `col-span-full` with full-width calendar when required; document how the layout collapses on tablet/mobile.
- `Spaces/Overview/AboutCard`: TODO - Card states (default, edit for moderators, empty). Show per space type differences (e.g., compliance notes for University Org).
- `Spaces/Overview/EventsWidget`: TODO - Calendar widget with upcoming events list, empty state, loading skeleton, and expanded calendar view door. Call out the utility controls (RSVP, add to calendar) within the 40 percent column.

## 4. Activity Feed

- `Spaces/Activity/Composer`: TODO - Compose bar scoped to the current space with media, attachments, and scheduled post options. Explicitly note that ritual creation lives outside this surface; include a secondary action that deep-links to the Rituals domain if needed.
- `Spaces/Activity/Post`: TODO - Post card variations (announcement, standard, moderated). Include comment preview, reaction toolbar, and space-type specific badges.
- `Spaces/Activity/Filters`: TODO - Segmented control for All, Announcements, Tools placements. Show keyboard focus handling and high-contrast token usage.

## 5. Tools and Resources

- `Spaces/Tools/Grid`: TODO - Tool cards with "Add to space" placement CTA (not install), status badges using `tone="success"` (active), `tone="warning"` (attention), `tone="info"` (beta). Include disabled state when permissions restrict placement.
- `Spaces/Tools/EmptyState`: TODO - Provide copy block, CTA, illustration placeholder. Tailor messaging per space type (e.g., Residential vs Student Org).
- `Spaces/Tools/IntegrationBanner`: TODO - Banner with icon-only actions and close button (confirm icon accessibility guidance). Show success and failure variants.

## 6. Members

- `Spaces/Members/Directory`: TODO - Table or grid with role chips per space type (e.g., Chapter Lead, RA, Officer, Department Admin). Include search filter and quick DM controls.
- `Spaces/Members/PendingRequests`: TODO - Review list with approve/deny actions and confirmation modals. Provide empty, success, and failure states.
- `Spaces/Members/ModerationAlerts`: TODO - Alert stack for flagged users, linking to moderation flows. Include escalation badge mapping for each space type.

## 7. Settings

- `Spaces/Settings/General`: TODO - Form with validation messages, slug preview, privacy radio group. Preselect defaults per space type.
- `Spaces/Settings/RolesPermissions`: TODO - Permission matrix with tooltip definitions and audit logging callout.
- `Spaces/Settings/DangerZone`: TODO - Confirm patterns (archive, delete, transfer) with dialogs and warning text aligned to token colors. Include compliance notices for University Org spaces.

## 8. Journeys and Flows

- `Spaces/Flows/Create`: TODO - Stepper covering template selection, audience, preview, confirmation. Add progress bar motion and variant copy per space type template.
- `Spaces/Flows/OnboardingChecklist`: TODO - Checklist component with completion states and celebratory animation hook. Show how first-time Spaces Home uses this completion data.
- `Spaces/Flows/Membership`: TODO - Flow states for request access, pending approval, invite acceptance, rejection. Include notifications and guidance for ghost mode privacy.

## 9. Cross-cutting States

- `Spaces/States/Empty`: TODO - Centralized empty states for each slice (home, overview sidebar, feed, tools, members) with space-type aware copy.
- `Spaces/States/Error`: TODO - Error boundary treatments (offline, permissions, content removed) including CTAs for admins vs members.
- `Spaces/States/Skeletons`: TODO - Loading skeleton variants mapped to each major surface, matching the 60/40 layout ratios.

## 10. Acceptance Checklist

- IA verification (Spaces Guild + Design System Guild): TODO - Run weekly table-top review using the IA Outline story to ensure navigation, molecule usage, and permission states stay compliant.
- Accessibility audit (Design System Guild): TODO - Run Storybook a11y addon across every story before merge and log issues in the weekly audit tracker.
- Token alignment (Design System Guild + Platform Eng): TODO - Verify elevation, glass, icon motions align with `ICONOGRAPHY_ELEVATION_GLASS.md` and update tokens if gaps appear.
- Documentation (Spaces Guild): TODO - Link finished stories back to this scaffold, mark completion dates, and capture space-type notes for each surface.

---

Next steps: once each TODO is fulfilled in Storybook, update this document with Storybook URLs and move the corresponding user stories into implementation for the Next.js app shell.
