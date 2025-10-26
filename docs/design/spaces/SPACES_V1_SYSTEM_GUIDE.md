Status: Working v1
Owner: Community Guild + Design System Guild
Last updated: 2025-10-19

# HIVE — Spaces v1 System Guide (Unified IA)

## 0) Purpose & Student Value
- Spaces are campus communities where UB students discover, join, and safely coordinate activity. A calm stream with tools and events built-in; overlays keep context while going deeper.
- North star: “Tease to act” in place, open details in a sheet (never lose your place), and keep safety obvious but unobtrusive.

References
- Canonical IA spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- Routing baseline: ROUTING.md:1
- Decision (composer placement): docs/design/decisions/0003-spaces-composer-placement.md:1

---

## 1) Unified IA & Navigation

Surfaces & routes
- Space home (stream): `/spaces/[spaceId]`
- Calendar module (list-first mobile): `/spaces/[spaceId]/calendar`
- About: `/spaces/[spaceId]/about`
- Admin dashboard: `/admin/space/[spaceId]` (Tools, Analytics, Moderation, Settings)

Overlay model (sheet-first)
- Post sheet: `?postId=<id>&from=stream|widget|explore`
- Event sheet: `?eventId=<id>&from=stream|widget|calendar|explore`
- Member sheet: `?memberId=<id>&from=members|widget|search`
- Sheets open via pushState and close via pop; refresh opens the same sheet; focus returns to the invoker.

Entry points → one Event sheet
- Stream BoardCardEvent
- EventsWidget (rail; list default, Poster for Live/Spotlight)
- Calendar List/Month

Design tokens (gold FFD700)
- Reserve gold for Spotlight/official promo badges or one-off “Register” CTA. Default RSVP/list rows use neutral/primary tones.
- Utilities: `.brand-cta`, `text-gold-role`, `bg-gold-soft` (packages/ui/src/brand/brand.css:1).

---

## 2) Branch Trees (Flows)

Discover → Join → Engage
- From Explore/Feed: open Space preview → Join (open/request/invite-only) → Stream unlocks. Telemetry: join_click, join_success.

Post safely
- Composer (bottom; Decision 0003) → lints (PII/alt-text) → if non-leader media → approval queue → post published. Telemetry: composer_start/publish.

Events (unified)
- Entry: stream|widget|calendar. Click → Event sheet overlay. “View full calendar” → `/spaces/[spaceId]/calendar`.
- RSVP: Going/Maybe with 10s undo; at capacity → Waitlist if enabled; canceled → disabled. Telemetry: expand_open/close, rsvp_click.

Moderation & safety
- Report → Auto-hide threshold → leader ghost state → (Unhide/Remove/Escalate) with audit log. Media approvals resolve pending uploads. Telemetry: moderation_transition, media_approval_latency.

Tools (HiveLab)
- Tease via ToolsWidget (responses/progress/status). Member click → read-only tool/post sheet. Leader click → manage sheet (placements, caps, publish). Telemetry: tool_open/manage_open/publish.

---

## 3) Data Contracts (Serializers)

Space (subset; stable fields)
- Core: id, campusId, name, type, visibility, joinPolicy, postingPolicy, allowPublicPosts, tags[], featuredLinks[]
- Meta: memberCount, leaders/members (role), createdAt/updatedAt
- Policies summary surfaces in About
- Source: apps/web/src/server/spaces/service.ts:1; adapter: apps/web/src/components/spaces/post-adapter.ts:1

Post (adapted)
- id, spaceId, kind (standard|event|announcement|tool), audience, content, createdAt/updatedAt
- author, counts (reactions/comments), tags[], attachments[], toolContext
- moderation: status, isHidden; pin: pinnedAt/expiresAt/isPinned
- Source: apps/web/src/components/spaces/post-adapter.ts:1

CalendarEvent (unified Event)
- id, title, description, location
- startTime, endTime, isRssImported, userRsvp
- goingCount, maybeCount, waitlistCount, checkInEnabled, maxAttendees?, enableWaitlist
- coHostIds[], coHostNames[], coverImageUrl?, coverImageAlt?
- Source: packages/ui/src/organisms/spaces/types.ts:1; tests: apps/web/src/server/spaces/__tests__/calendar.service.spec.ts:1

---

## 4) Application Services & Policies

Posting policy & media approvals
- Members vs leaders-only; non-leader media requires approval. Safe-scan all uploads.
- Sources: packages/core/src/application/spaces/media-approval.application.service.ts:1, apps/web/src/app/api/spaces/[spaceId]/media-approvals/route.ts:1

Moderation
- States: active → auto_hidden → (unhide|escalated|removed)
- Endpoints: `POST /api/spaces/{spaceId}/posts/{postId}/moderation` (auto_hide, unhide, escalate, remove)
- Audit + telemetry hooks enforced
- Sources: apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1, packages/core/src/domain/spaces/aggregates/space-post.behaviour.test.ts:1

Pins & expiry
- Max 2; auto-expire; sweep job + telemetry
- Sources: apps/web/src/server/spaces/jobs/pin-expiry.job.ts:1

Rules & indexes
- Firestore rules for spaces/members/posts with moderation/pins; indexes for spaceId+createdAt and calendar filters
- Sources: firestore.rules:1, firestore.indexes.json:1

---

## 5) UI Components (Storybook-first)

Stream
- SpaceLayout (bottom composer), BoardTabs, UnreadSeparator/JumpToLatest
- Post cards: Standard/Event/Announcement; PostActionsBar/ProofButton
- Stories: packages/ui/src/stories/spaces/post-stream/*.stories.tsx

Events (unified)
- EventsWidget (list + Poster variant for Live/Spotlight), opens EventDetail sheet
- CalendarView (List/Month), EventDetail sheet tabs
- Chips: RSVPChip, CapacityBar, NowChip, CoHostChips
- Stories: packages/ui/src/stories/spaces/widgets/EventsWidget.stories.tsx:1, packages/ui/src/stories/spaces/calendar/*.stories.tsx

About
- AboutSection (read/edit) + Policies/Contacts subcomponents
- Stories: packages/ui/src/stories/spaces/about/*.stories.tsx

Moderation & Safety
- MediaApprovalQueue, SafetyQueue (placeholders + ghost state), ModerationQueue
- Stories: packages/ui/src/stories/spaces/moderation/*.stories.tsx

Dock & widgets (right-side)
- Community/Resources/Tools widgets with tease → sheet patterns
- Stories: packages/ui/src/stories/spaces/widgets/*.stories.tsx

Composer (Decision 0003)
- Bottom placement; tool actions ≤6; safety preflight error story included
- Story: packages/ui/src/stories/spaces/post-stream/Composer.stories.tsx:1

---

## 6) A11y & Performance Budgets (Spec-aligned)

Performance targets
- Stream: P95 ≤1.8s cold / ≤1.2s warm; interactions ≤150ms
- Calendar: List/Month ≤300ms (100 events); Event sheet ≤200ms
- Admin tabs ≤300ms

Accessibility
- Keyboardable rows/tiles (role=button, tabIndex, Enter/Space)
- Sheets: aria-modal, labelled header, focus trap + restore
- Visible focus rings; reduced-motion honored; alt-text prompts

Sources: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:234

---

## 7) Telemetry & KPIs

Core metrics (console sink for now)
- expand_open/close (surface=stream|widget|calendar)
- rsvp_click (status=going|maybe|waitlist, capacity, success, latency)
- composer_start/publish (attachments, audience)
- pin_ctr, media_approval_latency, moderation_transition

KPIs (space-wide)
- posts/member/week, active %, events/member, RSVP→Check-In %, report ratio/auto-hide %, exports/day, pilot→certified rate, joins/week, leader:member ratio

Sources: apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1, docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:240

---

## 8) Routing Patterns (Next.js App Router)

Overlay with query param (simple)
- Read `searchParams.eventId` in `/spaces/[spaceId]/page.tsx` and `/spaces/[spaceId]/calendar/page.tsx`; mount `<EventDetailSheet open />` and close by `router.back()`.

Parallel route (cleaner)
- Use `@overlay` segment to render sheets without cluttering the main tree; link from widgets with `router.push('?eventId=...')` or direct overlay route.

Focus management
- On open: focus sheet heading; On close: restore to the invoker element.

---

## 9) BDD Scenarios (Student Value)

Join a Space safely
- Given a UB student on a Space, when they tap Join, then they either join (open), request access (request-only), or see disabled state (invite-only) with clear copy.

Post with media
- Given a member composes a post with images, then alt-text is required and non-leader media goes to approval; leaders see pending placeholders; audit logged when resolved.

RSVP fast without losing context
- Given a student clicks an event in stream/widget/calendar, then the Event sheet opens in-place; one-tap RSVP + undo; closing returns to the same scroll spot.

Moderate without drama
- Given content crosses report thresholds, then auto-hide applies; leaders see ghost state with Unhide/Remove/Escalate; actions are audit-logged.

---

## 10) Definition of Ready / Done

Definition of Ready (UI)
- Serializers stable for posts/events/spaces; role/policy checks enforced in routes; tests passing; Firestore rules/indexes drafted.

Definition of Done (Spaces slice)
- Stream, Calendar, About, Widgets: tease → sheet patterns live; a11y/perf budgets met; telemetry emits core events; Stories cover happy/edge/error states.

---

## 11) Evidence & Code Map
- Spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- Space service + serializer: apps/web/src/server/spaces/service.ts:1
- Posts API: apps/web/src/app/api/spaces/[spaceId]/posts/route.ts:1
- Moderation API: apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1
- Media approvals: apps/web/src/app/api/spaces/[spaceId]/media-approvals/route.ts:1
- Telemetry sink: apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1
- UI stories (Spaces): packages/ui/src/stories/spaces/**

---

## 12) Open Items (tracked in TODO.md)
- EventRow + EventSheet host shared across stream/widget/calendar
- Overlay route handling for `eventId` in Space + Calendar pages
- Telemetry wiring for expand_open/close + RSVP in UI handlers
