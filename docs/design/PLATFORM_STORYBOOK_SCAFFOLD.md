<!-- Bounded Context Owners: Design System Guild & Platform Experience Guild -->
Status: Deferred (Reference Only)
Owner: Design System Guild & Platform Experience Guild
Last updated: 2025-10-16

Process override: Backend‑First Execution is in effect (see AGENTS.md; TODO.md). Treat this scaffold as reference only. Do not create UI/UX tickets from this document until backend contracts and APIs for the relevant slice are complete.

Note: This scaffold works alongside docs/design/STORYBOOK_CHECKLIST.md and the process in docs/design/README.md. Treat those as canonical for quality gates and workflow.
# Platform Storybook Scaffold

Goal: make Storybook the canonical source for every front-end surface before it ships to production. This scaffold enumerates the stories we must build across the platform. Treat each TODO as a checklist item—stories are expected to exist, cover the described states, and reference the shared token docs (`docs/design/FOUNDATION.md`, `docs/design/ICONOGRAPHY_ELEVATION_GLASS.md`).

- Spaces slice already has its own detailed tracker at `docs/design/spaces/STORYBOOK_SCAFFOLD.md`. Use that in tandem with the items below.
- All stories must expose controls for theme (dark/light), density, glass toggle, high contrast, reduced motion, and support the four space types, plus any domain-specific variants noted here.
- Every section below should ship with MDX notes documenting usage, DOs/DON'Ts, and links to Figma/Notion RFCs where applicable.

## 0. Global Foundation & IA

- `Foundation/IA/PlatformMap` — TODO: Interactive diagram capturing top-level navigation (Spaces, Feed, Rituals, Tools, Profile, Notifications, Settings, Admin). Include permissions overlays and URL conventions.
  - Idea 1: Sankey-style nodes that highlight the primary navigation paths with hover tooltips for URL patterns.
  - Idea 2: Role-based toggles (Member, Moderator, Admin) that overlay visibility indicators for restricted destinations.
  - Idea 3: Deep-link callouts illustrating entry from notifications and search while preserving breadcrumbs.
  - Idea 4: Device switcher showcasing how the IA adapts between desktop, tablet, and mobile breakpoints.
  - Idea 5: Inline links from each node to its Storybook story and corresponding PRD/RFC documentation.
- `Foundation/Navigation/States` — TODO: Primary nav (desktop, tablet, mobile), collapsed states, keyboard traversal, unread indicators, personalization (pinned spaces/tools).
  - Idea 1: Keyboard walkthrough overlay that displays focus rings and shortcut hints as the user tabs through nav elements.
  - Idea 2: Notification badge evolution demo (dot, count, urgent) with SR-friendly announcements.
  - Idea 3: Personalized layout examples covering pinned spaces, reordered sections, and quick-switch chips.
  - Idea 4: Reduced-motion comparison showing how transitions degrade gracefully when animations are disabled.
  - Idea 5: Offline/latency simulation to show skeleton nav and retry affordances.
- `Foundation/SurfaceTokens/Showcase` — TODO: Demonstrate token toggles (density, elevation, glass, high contrast, motion) in a single playground to ensure every team integrates the controls consistently.
  - Idea 1: Master control panel that flips token states and updates a gallery of core components in real time.
  - Idea 2: Token inspector overlay reporting the exact CSS variables applied to each sample.
  - Idea 3: Motion comparison slider to contrast standard animations with reduced-motion equivalents.
  - Idea 4: Preset buttons for "Review Mode" vs "Production Mode" to standardize QA screenshots.
  - Idea 5: Export tips panel describing how to capture visual regression baselines for each token blend.
- `Foundation/Accessibility/Patterns` — TODO: Collect reusable accessibility patterns (focus management, skip links, live regions, aria annotations) with live demos.
  - Idea 1: Focus trap sandbox showing modal and sheet behavior with visualized focus order.
  - Idea 2: Icon-only action toolbar annotated with best-practice aria labels and tooltips.
  - Idea 3: Live region demo broadcasting new feed items and background updates.
  - Idea 4: Skip-link montage covering jump-to-content and jump-to-filter patterns on dense pages.
  - Idea 5: Contrast testing panel referencing approved token pairings and linting workflows.
- `Foundation/Feedback/System` — TODO: Loading, success, warning, error toasts/banners/spinners with guidance for when to use each.
  - Idea 1: Decision matrix aligning user scenarios to the right feedback component.
  - Idea 2: Animated sequence showing loading → success → follow-up CTA transitions.
  - Idea 3: Copy tone examples for each severity level with localization notes.
  - Idea 4: Accessibility checklist covering focus management, aria-live usage, and dismiss patterns.
  - Idea 5: Density toggle to compare compact dashboard usage vs spacious marketing contexts.

## 1. Spaces (Summary)

- See `docs/design/spaces/STORYBOOK_SCAFFOLD.md` for the detailed breakdown. Ensure Storybook categories match the documented slugs.
- Add integration story: `Spaces/HandOff/FeedEntry` — TODO: Show how a space post flows into global feed, including cross-link badges and permission gating.
  - Idea 1: Demonstrate a space post card with a "Shared to Feed" ribbon and breadcrumbs linking back to the originating space.
  - Idea 2: Include a permission matrix overlay showing who can view, react, or comment based on membership.
  - Idea 3: Show an analytics callout that tracks downstream engagement from the feed entry.
  - Idea 4: Provide moderator view vs member view to highlight additional controls (e.g., retract from feed).
  - Idea 5: Add mobile vs desktop layouts emphasizing how the hand-off badge appears in condensed cards.

## 2. Rituals

- `Rituals/Overview/Layout` — TODO: List and calendar toggle, filters by space/campus/time, first-time empty state.
  - Idea 1: Two-panel layout with interactive toggle showing list vs calendar while preserving filter chips.
  - Idea 2: Space-type filter presets (Academic, Social, Wellness) with saved search examples.
  - Idea 3: First-time animation that nudges users to RSVP to their first ritual.
  - Idea 4: Mobile bottom sheet treatment for filters to confirm responsive behavior.
  - Idea 5: Accessibility preview demonstrating keyboard navigation between list rows and calendar cells.
- `Rituals/Detail/Header` — TODO: Hero with RSVP states (interested, going, waitlist), share CTA, countdown, compliance notices.
  - Idea 1: Progress ring countdown that transitions color as the start time approaches.
  - Idea 2: RSVP state chips with inline context (e.g., “You + 3 friends going”).
  - Idea 3: Compliance banner variations for university vs student org rituals.
  - Idea 4: Share drawer showcasing campus-specific invite links and QR codes.
  - Idea 5: Waitlist state animation with auto-promote notification preview.
- `Rituals/Detail/Participation` — TODO: Checklist for pre, during, post actions; include live updates and celebratory animations.
  - Idea 1: Stepper showing prep tasks with completion badges.
  - Idea 2: Live activity feed that surfaces photo uploads or polls during the ritual.
  - Idea 3: Post-ritual reflection card with quick actions (share recap, thank participants).
  - Idea 4: Confetti micro-animation triggered when the final checklist item completes.
  - Idea 5: Accessibility summary announcing progress to assistive tech.
- `Rituals/Composer` — TODO: Creation flow with template selection, schedule picker, capacity rules, preview.
  - Idea 1: Template gallery segmented by ritual type (study session, social, wellness).
  - Idea 2: Smart schedule suggestions based on space availability or calendar conflicts.
  - Idea 3: Capacity slider with dynamic messaging (e.g., “Great for small groups”).
  - Idea 4: Real-time preview card mirroring what the ritual detail page will show.
  - Idea 5: Validation tray listing conflicts or missing fields before publish.
- `Rituals/Moderation` — TODO: Admin-only view of attendance adjustments, notes, export.
  - Idea 1: Attendance delta table highlighting manual overrides.
  - Idea 2: Note-taking sidebar for discipline/compliance logs.
  - Idea 3: Export dropdown with CSV vs Google Sheet integration.
  - Idea 4: Alert banner for rituals flagged by policy bots.
  - Idea 5: Activity log timeline showing moderation actions with timestamps.
- `Rituals/Notifications` — TODO: Reminder variants (email, push, in-app) preview cards.
  - Idea 1: Carousel of notification templates with copy for T-24h, T-2h, live reminders.
  - Idea 2: Push preview showing device-specific styling (iOS vs Android).
  - Idea 3: Email preview with fallback plain-text view for accessibility audits.
  - Idea 4: In-app banner sample that links back to the ritual detail page.
  - Idea 5: Localization toggle to illustrate how key phrases adapt per region.

## 3. Feed

- `Feed/Composer` — TODO: Global composer with targeting (space, followers, campus), attachments, scheduling, error states.
  - Idea 1: Targeting chips that preview audience reach estimates.
  - Idea 2: Attachment tray with drag-and-drop, poll builder, and tool placement actions.
  - Idea 3: Scheduling drawer showcasing time zone awareness and conflict warnings.
  - Idea 4: Error banner examples (upload failed, permission denied) with retry flows.
  - Idea 5: Keyboard shortcut legend for power users (e.g., cmd+enter to post).
- `Feed/PostVariants` — TODO: Standard, announcement, ritual recap, tool placement, poll, media gallery. Include moderation banners and limited visibility warnings.
  - Idea 1: Story grid showing each post variant side-by-side with annotations.
  - Idea 2: Limited visibility overlay (e.g., “Members-only”) with tooltip copy.
  - Idea 3: Moderation warning states (flagged, auto-muted) and escalation CTAs.
  - Idea 4: Poll card with live vote distribution animation.
  - Idea 5: Tool placement post highlighting CTA button and integration status.
- `Feed/Thread` — TODO: Comments threading, replies, mention chip behavior, lazy loading.
  - Idea 1: Expand/collapse demo for deep threads with context breadcrumbs.
  - Idea 2: Mention autocomplete popover showing avatars and roles.
  - Idea 3: Lazy load spinner placement between batches of comments.
  - Idea 4: Moderator controls inline (pin, lock, delete) with confirmation dialogs.
  - Idea 5: Accessibility narration demonstrating how screen readers announce nested replies.
- `Feed/Filters` — TODO: Tabs for Following, Campus, Spaces, Saved. Include keyboard navigation and sticky behavior.
  - Idea 1: Sticky tab bar that compresses on scroll with micro-motion.
  - Idea 2: Keyboard focus ring demonstration across tabs with arrow key navigation.
  - Idea 3: Saved filter empty state encouraging users to bookmark posts.
  - Idea 4: Campus filter variant showing sub-filters for colleges/majors.
  - Idea 5: Reduced-motion treatment removing slide animations gracefully.
- `Feed/EmptyStates` — TODO: First-time feed, filters with zero results, offline fallback.
  - Idea 1: Illustrated hero for brand-new users with CTA to join spaces.
  - Idea 2: Zero-result messaging that suggests adjusting filters.
  - Idea 3: Offline card with cached content snapshot and retry button.
  - Idea 4: Moderated content removed message explaining next steps.
  - Idea 5: Seasonal variant (e.g., semester kickoff) to keep the feed feeling alive.
- `Feed/NotificationsBridge` — TODO: Inline toast and side panel for new activity while browsing.
  - Idea 1: Slide-in panel preview that lists new posts with quick actions.
  - Idea 2: Floating toast stack anchored above the composer.
  - Idea 3: Snooze control for muting live updates during focus mode.
  - Idea 4: Accessibility readout describing new content count.
  - Idea 5: Mobile bottom-sheet variant that surfaces on swipe up.

## 4. Tools & HiveLab

- `Tools/Catalog` — TODO: Grid with search, filters (type, status, space compatibility), card states (available, coming soon, requires approval).
  - Idea 1: Filter panel showcasing quick toggles for integrations vs native tools.
  - Idea 2: Compatibility badges listing eligible space types with hover explanations.
  - Idea 3: “Coming soon” cards with waitlist signup microinteraction.
  - Idea 4: Featured tool carousel for promoted experiences.
  - Idea 5: Empty search state encouraging submitting tool requests.
- `Tools/Detail` — TODO: Tool detail modal/page with setup steps, permission badges, install/added states.
  - Idea 1: Stepper detailing required configuration steps with progress indicators.
  - Idea 2: Permission badge legend clarifying data access scopes.
  - Idea 3: Integration health banner showing last sync time and error states.
  - Idea 4: Preview of tool UI (screenshots/video) within the Storybook frame.
  - Idea 5: Related tools section to encourage discovery.
- `Tools/Placement` — TODO: Flow to add a tool to a space, including success, failure, partial configuration.
  - Idea 1: Guided flow with space selector and role confirmation step.
  - Idea 2: Partial configuration warning that highlights incomplete fields.
  - Idea 3: Success modal linking to manage settings.
  - Idea 4: Failure path with troubleshooting tips and support link.
  - Idea 5: Audit log snippet showing placement recorded for compliance.
- `Tools/AutomationBuilder` — TODO: Node-based builder story showcasing drag/drop, validation, error overlays.
  - Idea 1: Sample automation connecting a ritual trigger to a notification action.
  - Idea 2: Validation badges on nodes highlighting missing inputs.
  - Idea 3: Zoom and pan controls for large workflows.
  - Idea 4: Execution preview playing through the flow step-by-step.
  - Idea 5: Version history panel to revert changes.
- `HiveLab/ExperimentList` — TODO: Experiments dashboard with status badges, metrics, action menu.
  - Idea 1: List segmented by lifecycle (Ideation, Live, Completed).
  - Idea 2: Metrics summary chips showing key KPIs (conversion, participation).
  - Idea 3: Bulk action toolbar for pausing or duplicating experiments.
  - Idea 4: Empty slots for upcoming experiments with CTA to propose new ideas.
  - Idea 5: Experiment health indicator icons (on-track, at-risk).
- `HiveLab/ExperimentDetail` — TODO: Hypothesis, variants, rollout controls, analytics embed placeholders.
  - Idea 1: Hypothesis statement section with formatting guidance.
  - Idea 2: Variant cards with visual diff thumbnails.
  - Idea 3: Rollout slider illustrating percentage rollout and guardrail statuses.
  - Idea 4: Analytics embed placeholders (charts, funnels) with loading skeletons.
  - Idea 5: Decision journal timeline capturing learnings and approvals.

## 5. Profile & Identity

- `Profile/Overview` — TODO: Header with avatar editor, pronouns, status, verifications, social links.
  - Idea 1: Inline avatar cropper with drag zoom controls.
  - Idea 2: Pronoun picker supporting custom input with moderation safety checks.
  - Idea 3: Verification badge states (pending, approved, rejected) with tooltips.
  - Idea 4: Status message carousel (available, focused, offline) respecting tokens.
  - Idea 5: Social link list with domain-specific icons and accessibility labels.
- `Profile/Activity` — TODO: Timeline of posts, rituals, tools usage with filters.
  - Idea 1: Timeline grouping by semester/term with date separators.
  - Idea 2: Filter chips for content type (Posts, Rituals, Tools actions).
  - Idea 3: Privacy labels showing which entries are private vs public.
  - Idea 4: Load-more interaction with scroll position memory.
  - Idea 5: Export button previewing PDF/CSV of activity.
- `Profile/SpacesMembership` — TODO: Space list with roles, quick actions, leave flow.
  - Idea 1: Role badges with color-coding (Member, Moderator, Admin).
  - Idea 2: Quick action buttons (View space, Manage notifications, Leave).
  - Idea 3: Pending invite cards with accept/decline controls.
  - Idea 4: Leave confirmation modal with contextual warnings (e.g., you are the last admin).
  - Idea 5: Sorting options (alphabetical, most active).
- `Profile/Settings` — TODO: Personal info, security, notifications preferences, connected accounts.
  - Idea 1: Two-column layout splitting account info and security.
  - Idea 2: Notification matrix toggles for each channel (email, push, SMS).
  - Idea 3: Connected accounts list with revoke buttons.
  - Idea 4: Device management table showing active sessions.
  - Idea 5: Inline validation messages for password updates.
- `Profile/Badges` — TODO: Showcase earned badges, progress trackers, tooltips.
  - Idea 1: Badge grid with rarity filters (core, seasonal, legacy).
  - Idea 2: Progress tracker for upcoming badges (e.g., “Attend 3 rituals”).
  - Idea 3: Tooltip copy describing how badges are earned.
  - Idea 4: Share card preview for posting achievements.
  - Idea 5: Empty state encouraging participation to unlock first badge.

## 6. Auth & Onboarding

- `Auth/EntryPoints` — TODO: Login/signup variants (email magic link, SSO, campus code), error states.
  - Idea 1: Tabbed interface showcasing each entry method with sample copy.
  - Idea 2: Error toast examples for invalid credentials or expired invites.
  - Idea 3: Progressive disclosure for campus code flow with success animation.
  - Idea 4: Passwordless explainer card to educate new users about magic links.
  - Idea 5: Localization toggle to verify field labels across languages.
- `Auth/MagicLinkFlow` — TODO: Pending, success, expired, re-send screens.
  - Idea 1: Countdown timer visual while waiting for the email.
  - Idea 2: Success celebration with auto-redirect indicator.
  - Idea 3: Expired state showing troubleshooting tips.
  - Idea 4: Re-send button disabled timer demonstration.
  - Idea 5: Security notice about not sharing the link.
- `Auth/CampusSelection` — TODO: Flow for selecting campus or org, including search, invite codes.
  - Idea 1: Search-as-you-type results with highlighted matches.
  - Idea 2: Invite code entry fallback with error handling.
  - Idea 3: Map preview pinning the chosen campus.
  - Idea 4: Recommended campuses list for returning users.
  - Idea 5: Accessibility example reading results for screen readers.
- `Onboarding/Checklist` — TODO: Multi-step onboarding wizard adapting to space type (student vs admin).
  - Idea 1: Stepper with dynamic tasks depending on persona.
  - Idea 2: Progress bar showing percentage completion plus motivational copy.
  - Idea 3: Checklist items linking directly to relevant app surfaces.
  - Idea 4: Skip flow that records which items were bypassed.
  - Idea 5: Completion celebration with suggestions for next actions.
- `Onboarding/Nudges` — TODO: In-app banners and modals that encourage completing profile, joining spaces, enabling notifications.
  - Idea 1: Rotating banner series triggered by user inactivity.
  - Idea 2: Modal with illustration encouraging notification enablement.
  - Idea 3: Toast reminding users to finish onboarding steps after dismissing modals.
  - Idea 4: Personalized copy variants referencing the user’s major or role.
  - Idea 5: Snooze option to delay nudges with analytics tracking.

## 7. Notifications & Messaging

- `Notifications/Inbox` — TODO: List with filters (All, Mentions, Approvals), read/unread states, bulk actions.
  - Idea 1: Filter tabs with unread counts and keyboard navigation demonstration.
  - Idea 2: Bulk select bar showing available actions (mark read, archive).
  - Idea 3: Email-style preview snippet for each notification.
  - Idea 4: Empty state encouraging enabling more notification types.
  - Idea 5: Admin-only approvals view with escalate button.
- `Notifications/ToastStack` — TODO: Real-time toasts with stacking logic, focus management.
  - Idea 1: Stacking animation that offsets each toast to avoid overlap.
  - Idea 2: Focus trap example when a toast contains interactive elements.
  - Idea 3: Timeout progress indicator showing auto-dismiss timing.
  - Idea 4: Reduced motion fallback with opacity fades instead of slide-ins.
  - Idea 5: Screen reader announcement snippet for each toast entry/exit.
- `Notifications/Preferences` — TODO: Granular toggles per domain (spaces, rituals, tools, profile, admin).
  - Idea 1: Matrix table mapping notification types to channels (email, push, SMS).
  - Idea 2: Grouped toggles for campus vs personal activity.
  - Idea 3: “Quiet hours” scheduler with timepicker.
  - Idea 4: Preview card showing what a sample notification looks like for each channel.
  - Idea 5: Reset-to-defaults button demonstration.
- `Messaging/DMThread` — TODO: Direct message thread with typing indicators, attachments, reactions.
  - Idea 1: Typing indicator animation for multi-user conversations.
  - Idea 2: Attachment previews with download and delete options.
  - Idea 3: Reaction picker popover with keyboard support.
  - Idea 4: Message status indicators (sent, delivered, read).
  - Idea 5: Accessibility narration describing conversation flow.
- `Messaging/Requests` — TODO: Pending message requests, block/report flows.
  - Idea 1: Request queue list with accept/decline buttons.
  - Idea 2: Block/report modal with reason selection.
  - Idea 3: Safety tips banner explaining what happens after acceptance.
  - Idea 4: Batch actions for cleaning up multiple requests.
  - Idea 5: Empty state encouraging connection-building features.

## 8. Admin & Operations

- `Admin/Dashboard` — TODO: Metrics cards, anomaly alerts, quick actions.
  - Idea 1: KPI card grid with trend spark lines and target markers.
  - Idea 2: Alert panel highlighting anomalies with severity colors.
  - Idea 3: Quick action buttons for common admin tasks (pause ritual, message campus).
  - Idea 4: Role filter to show how data changes for regional admins.
  - Idea 5: Dark mode preview to verify contrast under operational lighting.
- `Admin/ModerationQueue` — TODO: Flagged content table with filters, preview, action drawer.
  - Idea 1: Table view with reason tags and SLA countdown timers.
  - Idea 2: Inline preview panel showing content and context.
  - Idea 3: Bulk resolution actions with confirmation dialogs.
  - Idea 4: Escalation flow linking to compliance team.
  - Idea 5: Metrics header summarizing backlog by severity.
- `Admin/SpacesManagement` — TODO: Space list with statuses, bulk actions, escalation paths.
  - Idea 1: Status chips (Active, Dormant, Locked) with tooltips.
  - Idea 2: Bulk action toolbar for emailing leaders or archiving spaces.
  - Idea 3: Escalation sidebar showing contact info for space owners.
  - Idea 4: Filter presets for Greek Life, Residential, Student Org, University Org.
  - Idea 5: Export preview to share with compliance teams.
- `Admin/RitualsManagement` — TODO: Calendar overview with conflict detection, export.
  - Idea 1: Calendar heatmap showing ritual density by day.
  - Idea 2: Conflict banner listing overlapping events with resolution suggestions.
  - Idea 3: Quick filters for ritual type or campus.
  - Idea 4: Export options for ICS/CSV with date range selectors.
  - Idea 5: Mobile list view fallback for on-the-go admins.
- `Admin/PermissionsMatrix` — TODO: Role-based controls for the entire platform.
  - Idea 1: Matrix grid mapping roles to capabilities with checkboxes.
  - Idea 2: Scenario examples demonstrating permission effects.
  - Idea 3: Audit log snippet showing recent permission changes.
  - Idea 4: Tooltip glossary explaining each capability.
  - Idea 5: Comparison view between two roles.
- `Admin/AuditLog` — TODO: Log viewer with filters, diff previews, export.
  - Idea 1: Timeline view with expandable entries.
  - Idea 2: Diff preview for configuration changes.
  - Idea 3: Advanced filters (date, actor, action type).
  - Idea 4: Export queue status indicator.
  - Idea 5: Alerting integration showing how to subscribe to critical events.

## 9. Cross-cutting States & Utilities

- `States/Empty` — TODO: Centralized empty states per domain with consistent illustration slots and copy variations.
  - Idea 1: Library of illustrations mapped to each domain with usage notes.
  - Idea 2: Copy variants for first-time vs returning users.
  - Idea 3: Call-to-action guidelines (primary vs secondary CTA placement).
  - Idea 4: Theme switcher showing appearance in light vs dark.
  - Idea 5: A/B testing suggestions to evaluate engagement.
- `States/Error` — TODO: Error surfaces (403, 404, 500, offline) with recommended actions.
  - Idea 1: Error templates with suggested iconography per status.
  - Idea 2: Recovery steps tailored to user role (student vs admin).
  - Idea 3: Offline fallback showing cached content preview.
  - Idea 4: Support contact panel linking to help center.
  - Idea 5: Reduced-motion version for motion-sensitive users.
- `States/Skeletons` — TODO: Loading skeletons for each major layout (feed, space overview, rituals, profile, tools).
  - Idea 1: Animated shimmer options vs static placeholders.
  - Idea 2: Skeletons matching the 60/40 layout proportions.
  - Idea 3: Timing guidelines for hiding skeletons post-load.
  - Idea 4: Accessibility note ensuring skeletons are not read as content.
  - Idea 5: Compact vs spacious density skeleton comparisons.
- `Utilities/Search` — TODO: Global search modal with keyboard navigation, recent history, command palette actions.
  - Idea 1: Spotlight-style modal with fuzzy search results grouped by domain.
  - Idea 2: Command palette commands (create post, open settings) with shortcuts.
  - Idea 3: Recent history list with clear button.
  - Idea 4: Empty state encouraging natural language queries.
  - Idea 5: Tablet layout using bottom sheet interaction.
- `Utilities/Dialogs` — TODO: Confirmation, multi-step, destructive dialogs with motion tokens applied.
  - Idea 1: Gallery of dialog types with decision trees on when to use each.
  - Idea 2: Multi-step dialog with progress indicator.
  - Idea 3: Destructive dialog showcasing double-confirm pattern.
  - Idea 4: Motion comparison showing entrance/exit animations with reduced-motion fallback.
  - Idea 5: Accessibility checklist covering focus, aria-labelledby, and button order.
- `Utilities/Forms` — TODO: Validation patterns, inline help, success fallback.
  - Idea 1: Field-level validation library (instant vs on submit).
  - Idea 2: Inline help tooltips with examples.
  - Idea 3: Global error summary banner for long forms.
  - Idea 4: Success fallback screen with navigation suggestions.
  - Idea 5: Loading state within submit button showing progress.

## 10. Measurement & QA

- Analytics instrumentation: TODO — For each story, document the expected analytics events (name, payload) in Storybook notes.
  - Idea 1: Event table template embedded in MDX showing name, trigger, payload schema.
  - Idea 2: Example instrumentation snippet (TypeScript) for developers to copy.
  - Idea 3: Link to dashboard where the event is visualized post-launch.
  - Idea 4: Checklist ensuring privacy requirements (PII) are respected.
  - Idea 5: QA scenario list describing how to fire each event manually.
- QA automation: TODO — Flag stories that require Playwright visual regression and ensure tests point to the exact stories (CI pipeline reference).
  - Idea 1: Badge system tagging stories with "VR Tested" or "Manual Only".
  - Idea 2: Table mapping Storybook IDs to Playwright test files.
  - Idea 3: Screenshot diff examples to highlight acceptance criteria.
  - Idea 4: Checklist for adding stories to CI pipeline watch lists.
  - Idea 5: Slack notification template for failed visual diffs.
- Performance: TODO — Include guidance about skeleton duration, lazy loading, and resource budgets in relevant stories.
  - Idea 1: Performance budget card listing target LCP/TTI per surface.
  - Idea 2: Skeleton timing chart recommending duration caps.
  - Idea 3: Lazy loading demo with intersection observer visualization.
  - Idea 4: Asset weight table for imagery/videos used in stories.
  - Idea 5: Guidance on prefetch strategies tied to navigation patterns.

## 11. Acceptance Checklist

- IA verification (Design System Guild + Domain Owners): TODO — Monthly review session using the IA stories to validate navigation, molecules, and permissions.
  - Idea 1: Use a rotating facilitation schedule so each guild leads at least once per quarter.
  - Idea 2: Capture action items in a shared dashboard with due dates.
  - Idea 3: Record walk-through videos to onboard new team members quickly.
  - Idea 4: Tag discrepancies directly inside Storybook via addon notes.
  - Idea 5: Maintain a scorecard tracking IA compliance per domain.
- Accessibility audit (Design System Guild): TODO — Run Storybook a11y suite across all stories each release cycle; log issues in the audit tracker.
  - Idea 1: Create a baseline accessibility report with severity triage.
  - Idea 2: Automate axe checks on every PR touching Storybook files.
  - Idea 3: Host quarterly deep-dive sessions with external a11y consultants.
  - Idea 4: Publish success stories where improvements increased usability.
  - Idea 5: Maintain a checklist of assistive technologies tested (screen readers, switch control).
- Token alignment (Design System Guild + Platform Eng): TODO — Confirm elevation, motion, iconography remain consistent; update tokens or docs when deviations occur.
  - Idea 1: Monthly diff review of token files vs Storybook screenshots.
  - Idea 2: Create a “token debt” backlog for items needing refactor.
  - Idea 3: Automate lint rules detecting non-token colors in stories.
  - Idea 4: Run motion audits comparing Storybook animations to production.
  - Idea 5: Hold quarterly alignment sync with Brand/Marketing for consistency.
- Documentation (Platform Experience Guild): TODO — Link each completed story to this scaffold with completion date, owner, and relevant RFCs.
  - Idea 1: Use a Notion or Airtable base embedded at the bottom of the doc.
  - Idea 2: Add badges in Storybook titles once stories meet documentation requirements.
  - Idea 3: Share release notes summarizing newly completed stories each sprint.
  - Idea 4: Maintain “coming soon” section for stories in progress.
  - Idea 5: Archive older versions with changelog entries.
- Cross-domain review (Product + Research): TODO — Run quarterly usability review sessions using Storybook to keep the platform cohesive.
  - Idea 1: Conduct live walkthroughs with student focus groups using Storybook.
  - Idea 2: Capture qualitative feedback in a shared Miro board linked from the story.
  - Idea 3: Assign scorecards per domain measuring usability heuristics.
  - Idea 4: Compare Storybook prototypes against production analytics to validate impact.
  - Idea 5: Publish quarterly synthesis reports with prioritized follow-up work.

---

Next steps: populate each TODO with actual Storybook entries, update this file with Storybook URLs, and block production tasks until the corresponding stories are complete and reviewed.
