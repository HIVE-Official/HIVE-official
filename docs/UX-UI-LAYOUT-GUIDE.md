# HIVE Web Layout Guide (Topology v1)
## Purpose

- Anchor layout decisions to the UX/UI topology captured in `docs/UX-UI-TOPOLOGY.md`.
- Give product, design, and engineering quick visual references for each core surface.
- Keep web-first delivery aligned with the shell, state, and interaction rules from `AGENTS.md`.

Use this guide with:
- `docs/UX-UI-TOPOLOGY.md` for the platform blueprint.
- `docs/prd/20-platform-taxonomy.md` for entity + surface definitions.
- `docs/FEATURE_TOPOLOGY_REGISTRY.md` for status and implementation references.

## How to Read

- **Slot** = a repeatable layout region surfaced by shared templates.
- **Pinned area** = inline band at the top of the primary column for hero or critical banners.
- **Sheet** = full-height overlay used for details (posts, events, tools) on desktop and mobile.
- Diagrams read desktop → tablet → mobile.
- File pointers use workspace-relative paths.

## Layout Rosetta Stone

| Slot | Purpose | Primary Sources |
| ---- | ------- | ---------------- |
| Sidebar (`nav`) | Campus navigation, quick composer, notifications | `packages/ui/src/shells/UniversalShell.tsx` |
| Top Bar (`header`) | Route title, context chips, search, quick actions | `packages/ui/src/shells/UniversalShell.tsx` |
| Pinned Area (`pinned`) | Hero prompts, rituals strip, high-priority banners | Route-level layout wrappers under `apps/web/src/app/*/**/layout.tsx` |
| Primary Column (`main`) | Stream content, steppers, grids | Route `page.tsx` |
| Sticky Action | Primary CTA (Join, RSVP, Install, Start) | `packages/ui/src/atomic/templates/*` |
| Sheets & Modals | Detail views, composers, confirmations | `packages/ui/src/overlays/*`, feature modules |

Right rail is reserved for Space Board (desktop only). All other surfaces present inline (pinned band), in the main stream, or inside sheets.

## Layout Topology (Slots & Measurements)

HIVE uses a fixed slot system to keep navigation calm and predictable. Tokens source: `packages/tokens/src/topology/slot-kit.json`.

Slots
- S0 Shell (nav): global sidebar/top bar scaffolding provided by `UniversalShell`. Desktop width 272–288px; collapsible to 64px icon rail.
- S1 Header: page/space header with title, chips, and primary route context. Height 64–96px (desktop), 56px (mobile).
- S2 Pinned: one banner + ≤2 pins (strict). Height ≤ 368px desktop, ≤ 200px mobile. Ritual strip lives here on Feed.
- S3 Stream: primary content column (cards, lists, timelines). Max width 960px (desktop); 24px gutters tablet; full-bleed inside safe-areas mobile.
- S4 Composer: top‑docked in Space Board; hidden on Feed. Enforce ≤6 tool verbs and explicit Space⇄Campus visibility.
- Z1 Sheet: detail overlay (post/event/tool/profile). Desktop 720–960px centered; tablet 75% width; mobile full‑screen. Always focus‑trapped with return‑focus.
- Z2 Modal: critical confirm; centered with elevation e3 and motion tokens.
- R Rail (Space Board desktop only): right context rail with caps R1=1 live, R2≤2 widgets, R3=3 upcoming, R4 leader ops (collapsed). Width 320–360px.

Grid & Spacing
- Baseline grid 8px; compact density option (6px) for data‑heavy admin.
- Gutters: 32px desktop, 24px tablet, 16px mobile.
- Corner radii: xs 6px, sm 10px, md 14px, lg 22px (chips/pills).

Motion & Modes (Sleek)
- Micro: 120–160ms; Overlays: 200–240ms; easing `cubic-bezier(0.32, 0.72, 0, 1)`.
- Reduced motion removes pulses and swaps slide for fade; halo becomes static color step.
- Modes: calm default; urgent only during live windows; celebrate for recap acknowledgment.

Implementation Map
- S0/S1 live in route `layout.tsx` via `UniversalShell` and header components.
- S2/S3/S4 are part of the route `page.tsx` composition using pinned band + stream + optional composer.
- Z1/Z2 live in feature overlays; open detail as sheet (not route) to preserve context.
- R rail is mounted only on Space Board (desktop breakpoint ≥1280px); never present on Feed/Profile.

Inspiration & Tone
- Tech‑sleek minimalism (ChatGPT/Vercel inspired): low‑chroma neutrals, one accent, thin motion.
- Glass on chrome only (sidebar/top bar), not on content cards; subtle elevation (e0–e2) to keep a calm hierarchy.
- Copy terse and decisive: one verb CTAs ("Join", "RSVP"); “You’re caught up.” for completion states.

## Shell Anatomy

```
Desktop ≥1280px
┌────────────┬──────────────────────────────────────────┐
│ Sidebar    │      Pinned band → Primary column        │
│ (nav)      │      (hero, stream, footer)              │
└────────────┴──────────────────────────────────────────┘
Sheets slide over the main column and focus-trap.

Tablet 768–1279px
┌────────────┬──────────────────────────────────────────┐
│ Icon rail  │  Pinned band → Primary column            │
│ (collapsed)│  Sticky action pinned near footer        │
└────────────┴──────────────────────────────────────────┘
Sheets cover 75% width; close with ESC or swipe.

Mobile <768px
┌──────────────────────────────────────────────────────┐
│ Top bar                                              │
├──────────────────────────────────────────────────────┤
│ Pinned band → Primary column                         │
├──────────────────────────────────────────────────────┤
│ Sticky bottom action (respect safe-area)             │
└──────────────────────────────────────────────────────┘
Bottom navigation replaces sidebar; sheets open full-screen.
```

## Primary Layout Maps

### 1. Feed & Rituals (`apps/web/src/app/feed/page.tsx`)

```
Pinned Band
└─ Campus title + filter chips (All | My Spaces | Events)
└─ Ritual strip banner (countdown, CTA) when active

Stream (single column)
└─ FeedCard.Post | Event | System | Recap
   └─ Footer actions (reactions, comments, CTA)

New content snackbar anchored above sticky action.
```

- Skeleton: `apps/web/src/components/loading/feed-skeleton.tsx`
- Ritual components: `apps/web/src/components/feed/*`
- Analytics: `feed_card_action`, `ritual_strip_engaged`, `feed_filter_changed`
- Mobile: ritual strip condenses to compact banner after scroll.

### 2. Spaces (`apps/web/src/app/spaces/[spaceId]/page.tsx`)

```
Pinned Header
└─ Cover, accent color, role badge, Join/Invite CTA
└─ One contextual banner (live event, tool launch, ritual)

Tabs (Board | Calendar | About)

Board (default)
└─ Composer (top-docked) with tool picker and visibility toggle
└─ Post stream (PostCard.Standard | Tool | Event)
   └─ Sheets for details (post, tool, event)

Calendar
└─ Desktop month grid + "Upcoming" list
└─ Mobile list-first (sheet for event detail)

About
└─ Purpose, policies, links, key contacts
└─ Members roster shortcut
```

- Components: `apps/web/src/components/spaces/*`
- Composer: `apps/web/src/components/spaces/space-composer.tsx`
- Event sheet: `apps/web/src/components/events/event-sheet.tsx`
- States: empty board prompt + tool suggestions; dormant banner for leaders.

### 3. Spaces Discovery (`apps/web/src/app/spaces/page.tsx`)

```
Pinned Hero
└─ Campus framing, student-run badge, primary CTA

Content
└─ Filter chips (Interests, Status) optional
└─ Responsive grid (desktop) or stacked cards (mobile)
   └─ `board-card-standard.tsx` cards
   └─ Quick "Preview" opens sheet with summary
```

- Data: `/api/spaces` (campus isolated)
- Skeleton: `apps/web/src/components/spaces/spaces-loading-skeleton.tsx`
- Analytics: `spaces_directory_view`, `space_card_click`

### 4. Profile (`apps/web/src/app/profile/[id]/ProfilePageContent.tsx`)

```
Pinned Header
└─ Avatar, name/handle, verification, bio
└─ Stats ribbon (Spaces joined, Events attended, Highlights)
└─ Primary actions (Connect, Invite, Manage)

Main Grid (responsive)
└─ About tile
└─ Activity timeline (chronological moments)
└─ Spaces tile (chips → sheet preview)
└─ Tools tile (installs, builder highlight)
└─ Calendar preview
└─ Recommendations (spaces to join, reasons)
```

- Layout template: `packages/ui/src/atomic/templates/profile-view-layout.tsx`
- Timeline: `packages/ui/src/atomic/organisms/profile-activity-widget.tsx`
- States: new profile progress meter; sparse prompt to add interests.

### 5. Auth + Onboarding Topology (Web + Mobile)

Below is the actual layout topology and implementation prompts for Auth + Onboarding. These surfaces hide the global shell (S0) and run as calm, single‑column flows with sheet‑first details.

L0 Page Skeleton
- Create `<AuthOnboardingLayout>` and use it for `/auth/login`, `/auth/*`, and `/onboarding/*`.
- Hide app chrome (no sidebar/top bar). Use a 3‑row grid: brand (top), content (middle), legal/help (footer).
- Max‑width: 420px for auth, 520px for onboarding; center with `mx-auto px-4`.
- Safe areas: `pt-[max(env(safe-area-inset-top),24px)]` and `pb-[max(env(safe-area-inset-bottom),24px)]`.
- Modes: `data-mode="calm|warm|celebrate"` toggles color/motion tokens; default Calm.
- Motion: 120–160ms micro, 160–220ms sheets; honor reduced motion.
- Cognitive caps: one primary CTA; ≤2 inputs/choices (auth); ≤4 light fields (onboarding). Use sheets for details, not routes.

A) Authentication (Magic‑Link)
- A1 `/auth/login` — Email Capture (Calm)
  - Build `<LoginEmail>`: wordmark, h1 “Sign in”, helper “Use your campus email.”, email input, primary “Send link”.
  - Desktop: optional illustration left; 420px card right; single column under 1024px.
  - Validate domain/format; submit `POST /api/auth/send-magic-link` (spinner in button).
  - On 200 → route to `/auth/login/sent?email=…`; domain not allowed → inline error (ARIA live).
  - Telemetry: `auth_email_submit`, `auth_email_domain_blocked`, latency.
- A2 `/auth/login/sent` — Link Sent (Warm)
  - Build `<LoginLinkSent>`: success tick (subtle glow), “Check your inbox”, “We sent a link to {email}”.
  - Resend after 30s (`/api/auth/resend-magic-link`); “Use different email” link.
  - Telemetry: `auth_link_sent`, `auth_link_resent`.
- A3 `/auth/verify` — Link Verification (Calm)
  - Build `<VerifyLink>`: center spinner + “Signing you in…”.
  - `POST /api/auth/verify-magic-link` with token; create 7‑day session.
  - Existing profile → `/feed`; new user → `/onboarding/welcome`.
  - Expired/used → small card “Link expired” + primary “Send a new link”.
  - Telemetry: `auth_link_verify_ok|expired|failed`.

B) Onboarding (Multi‑Step)
- Common Frame `<OnboardingFrame>`
  - Header: tiny logo, centered step label, “Save & exit” (persists progress; resumable).
  - Progress bar: 2–4px; animated; segments = total steps.
  - Body: 520px card; rhythm 16–20px; sticky nav row on mobile; footer nav on web.
  - Nav: Back (ghost) + Continue (primary); disable Continue until valid.
  - Motion: 160–220ms slide/fade; focus step heading on mount; ARIA live for validation.

- B1 `/onboarding/welcome` — Role Select (Warm)
  - `<RoleStep>`: h1 “Welcome to HIVE”, “Who are you here as?”; cards for Student/Alumni/Faculty+Staff; one decision only.
- B2 `/onboarding/handle` — Handle (Calm)
  - `<HandleStep>`: `@handle` input + live availability (`/api/auth/check-handle`); lowercase 3–20 `[a-z0-9_]`; show inline “Available ✔︎/Taken”.
- B3 `/onboarding/personal` — Personal + Photo (Calm)
  - `<PersonalStep>`: first/last (required), pronouns (opt), photo (opt; safe‑scan); two‑column ≥640px.
- B4 `/onboarding/academic` — Academic/Affiliation (Calm)
  - `<AcademicStep>` branches: students pick majors (1–2) + grad year; faculty/staff/alumni pick department + bio ≥50 chars.
- B5 `/onboarding/interests` — Interests (Warm)
  - `<InterestsStep>`: searchable chips; require ≥1; cap 10; chips are checkboxes; announce counts.
- B6 `/onboarding/spaces` — Recommended Spaces (Warm)
  - `<RecommendedSpacesStep>`: grid/list of up to 8; Join toggles; reason chips (“Because you chose {Photography}”).
- B7 `/onboarding/privacy` — Privacy & Consent (Calm)
  - `<PrivacyConsentStep>`: visibility radios (Campus default), guidelines checkbox; policy opens as sheet.
- B8 `/onboarding/done` — Completion (Celebrate→Warm)
  - `<OnboardingDone>`: single glow tick (800ms) “You’re all set.”; primary “Go to your Feed”, secondary “Explore your Spaces”. Emit `ProfileOnboarded` and route to `/feed`.

Component Topology
- Primary slots: 3‑row grid (brand/content/footer); card container 420–560px; sticky action row (mobile).
- Sheets: policy view, “link expired” resend, image cropper; modals only for destructive confirms.
- Progress/Save: progress bar after welcome; autosave on blur; “Save & exit”.
- Validation: use canonical codes/messages; gate finish with CompletionScore=100 + consent=true.
- Accessibility: focus heading on mount; ARIA live; keyboard order; role=group radios.
- Tokens & Modes: Calm forms; Warm welcome/recs; Celebrate completion (no confetti).

Mobile Topology
- Scrollable content area with sticky nav at bottom; safe‑area padding so CTA never under home indicator.
- Keyboard‑aware insets; keep Continue visible; prefer accessory bar when needed.
- Use sheets for subdialogs; maintain single‑column calm.

Errors & Edge Cases
- Domain mismatch: inline error on `/auth/login`; “Why campus email?” opens small sheet explaining trust model.
- Expired/used link: `/auth/verify` shows small card + “Send a new link”.
- Offline on submit: toast “No connection. We’ll retry.” + local queue; replay when online.
- Handle collision race: server error despite “available” → show error, keep focus.
- Abandon flow: resume saved step via `/onboarding/:step` on next sign‑in.

Implementation Prompts (copy into tickets)
- Hide app chrome on `/auth/*` and `/onboarding/*`; mount `UniversalShell` only after onboarding completes.
- Wire magic‑link endpoints: `POST /api/auth/send-magic-link`, `POST /api/auth/verify-magic-link`, optional `POST /api/auth/resend-magic-link`.
- Implement progress repository + score gate; emit `ProfileOnboarded` (seed default/cohort spaces) on finish.
- Enforce cognitive budgets (≤2 decisions/screen, one primary CTA; ≤4 visible fields per step).
- Add `data-mode` to root: Calm baseline; Warm for welcome/recs; Celebrate tick (800ms) on completion; reduced motion removes pulses.

## Storybook Component Checklist — Auth/Onboarding & Spaces

Use this checklist when adding stories, docs, and interaction tests. Keep stories in `packages/ui/src/stories` following the structure below.

### 0. Structure & Global Controls

```
stories/
  Auth/
  Onboarding/
  Spaces/
    BoardChat/
    Rail/
    Calendar/
    About/
    Members/
  Primitives/
```

- Global toolbars: theme (light/dark), `data-mode` (`calm|warm|celebrate|urgent`), reduced motion toggle, viewport (mobile/desktop).
- Use controls to enforce caps (`maxPins`, `maxVerbs`, `maxJoined`).

### 1. Auth & Onboarding Components

- Layout primitives:
  - `AuthOnboardingLayout` — Calm/Warm/Celebrate, mobile viewport, reduced motion.
  - `OnboardingFrame` — step 1, mid step, final step, error banner; controls for `step`, `totalSteps`, `continueDisabled`, `isSubmitting`.
- Auth flow:
  - `LoginEmail` — default, validating, domain error, success toast (mock `/api/auth/send-magic-link`).
  - `LoginLinkSent` — Warm default, resend disabled/enabled, dev-mode panel.
  - `VerifyLink` — verifying spinner, success (existing vs new), expired/used error (mock `/api/auth/verify-magic-link`).
- Onboarding steps (one story each): `RoleStep`, `HandleStep`, `PersonalStep`, `AcademicStep`, `InterestsStep`, `RecommendedSpacesStep`, `PrivacyConsentStep`, `OnboardingDone` (Celebrate + reduced motion).
- Flow story `OnboardingFlow`: asserts completion gate (score 100 + consent true) and `ProfileOnboarded` emission with seeded defaults/cohorts.

### 2. Spaces Components

- Board (chat model): `SpaceLayout`, `SpaceHeader`, `SpaceTabs`, `PinShelf` (0/1/2 pins), `MessageScroller`, `JumpToLatestFab`, `PostCard` variants (standard/tool/event), `ComposerDock` (≤6 verbs), `SpaceRail` (R1 Now, R2 ≤2, R3 3, R4 leader), `PostSheet`, `EventSheet`.
- Calendar: `CalendarHeader`, `CalendarMonth`, `CalendarDayList`, `CalendarList`, `EventRow` (Now chip, waitlist).
- About: `AboutHeader`, `AboutOverview`, `AboutTags`, `AboutLinks`, `AboutPoliciesSummary`, `AboutVersionHistory`, `EditAboutSheet`, `CoverUploader`, `AccentPicker` (lint states).
- Members: `MembersList`, `MemberRow`, `InviteDialog`.

### 3. Cross-Cutting Stories

- Mode demos for Calm/Warm/Celebrate/Urgent.
- Cognitive cap demos (pins >2, verbs >6, multiple primary CTAs) showing guardrails.
- Performance skeletons: scroller top-loading, calendar skeleton, event sheet skeleton.

### 4. Accessibility & Interaction Tests

- Provide focus stories (keyboard order, ARIA roles, live regions, 44px targets).
- Interaction `play` flows: onboarding happy path; board chat (send, scroll, sheets, proof, moderation); rail lifecycle (Now CTA → TTL → upcoming).
- Use MSW to mock auth/onboarding validation, posts/events/proof APIs.

### 5. Story Documentation Notes

Each story should call out: topology constraint demonstrated, emotional mode intent, temporal behavior (Now/Soon/Ambient, TTL), caps/de-dup invariants, accessibility checklist, performance target (e.g., sheet open ≤200 ms), telemetry events (`auth_email_submit`, `composer_publish`, `rail_now_cta_clicked`, etc.).


### 6. Composer (`apps/web/src/components/composer/*`)

```
Top Docked Card
└─ Identity chip (Space + visibility)
└─ Rich text area, media attachments
└─ Tool picker (≤ 6 actions)
└─ Footer (audience, schedule, submit)
```

- Shared component consumed in feed and spaces.
- Lints for PII/alt text triggered pre-submit.
- Mobile expands to full-screen sheet when editing media-heavy posts.

### 7. Events & Calendar (`apps/web/src/components/events/*`)

```
Event Card
└─ Title, time, location, RSVP state, capacity

Event Sheet
└─ Hero (time, location, host chips)
└─ RSVP / Check-in controls
└─ Materials, chat (optional)
└─ Recap preview
```

- Recap posts auto-insert into space and feed streams.
- Check-in limited to active window; offline mode queues attendance.

### 8. HiveLab (`apps/web/src/app/hivelab/page.tsx`)

```
Pinned Overview
└─ Library categories (Certified, Drafts, Pilots)
└─ Leader status banner (certification progress)

Studio (desktop)
└─ Structure tree (left)
└─ Canvas (center) with view toggles (Board, Calendar, Profile)
└─ Inspector (right) for properties, permissions, lint
└─ Timeline map (footer row) for run → reminder → recap
```

- Components: `packages/ui/src/organisms/hivelab/*`
- Guardrails: complexity meter, lint list ordering blocking > warning.
- Mobile renders read-only previews of tools and certification status.

### 9. Admin (`apps/web/src/app/admin/*`, `/spaces/[id]/manage`)

```
Pinned Summary
└─ Alerts, outstanding tasks, rate-limit posture

Main Sections
└─ Tools management (install/uninstall, quotas)
└─ Analytics tiles (participation, reach)
└─ Moderation queue (case cards, filters)
└─ Settings forms (copy, roles, safety rails)
```

- CSRF required for all mutations; use `withSecureAuth`.
- Export actions surface as sheet confirmations with progress feedback.

### 10. Notifications (`apps/web/src/app/notifications/page.tsx`)

```
Pinned Banner
└─ Digest summary (Today, Unread count)

Stream
└─ Notification groups (Now, Soon, Digest)
   └─ Cards with context chips, CTA, timestamp

Toast infrastructure reuses same components for inline alerts.
```

- Mobile: quick filters slide beneath pinned banner.
- Deduplication ensures no double ping if user already in sheet.

## Responsive Quick Reference

| Breakpoint | Pinned Band | Primary Column | Sticky Action | Notes |
| ---------- | ----------- | -------------- | ------------- | ----- |
| Desktop ≥1280px | Inline hero/promo, height ≤ 368px | Max width 960px | Inline within hero or stream footer | Composer stays visible; sheets overlay center |
| Tablet 768–1279px | Condensed hero (two-line max) | 100% width with 24px gutters | Button floated near end of stream | Sidebar collapses to icon rail |
| Mobile <768px | Compact banner, safe-area padding | Stack cards full width | Bottom sheet CTA (44px touch min) | Bottom navigation persistent |

## Overlay & Sheet Patterns

- **EventSheet:** `apps/web/src/components/events/event-sheet.tsx` – slide-up sheet with focus trap, ESC support, anchored close button, analytics on open/close/CTA.
- **PostSheet:** `apps/web/src/components/feed/post-sheet.tsx` – used for post detail, moderation actions, reactions.
- **ToolSheet:** `apps/web/src/components/tools/tool-panel.tsx` – install/run/configure flows plus results history.
- **ComposerSheet:** mobile-only expansion when attachments or long text are present.
- **Command Palette:** `packages/ui/src/navigation/UniversalNav.tsx` – overlay triggered by `/`, logs search and selection.

All sheets maintain scroll shadow, accessibility labels, and trap focus; reduced motion swaps slide for fade.

## Implementation Checklist per Route

- Pinned hero/band defined and responsive.
- Primary column integrates skeleton, empty, error, offline states.
- Sticky action connected to `ActionSystem` utilities under `packages/ui/src/shells`.
- Sheets restore focus to invoking element after close.
- Analytics events wired via `apps/web/src/lib/analytics/events.ts`.
- Mobile parity verified (breakpoints ≤ 768 px) with safe-area padding.
- Auth wrappers (`withSecureAuth`, middleware) applied where data is gated.

## Experience Topology Alignment

| Lifecycle Phase | Student Mindset | Primary Surfaces | Key Modules |
| ---------------- | ---------------- | ---------------- | ----------- |
| Discover | "Where do I belong?" | `/start`, `/onboarding`, `/spaces`, Feed pinned band | onboarding hero, spaces discovery hero, ritual strip preview |
| Activate | "I'm joining and attending." | Feed stream, space board, notifications | filter chips, composer, event sheets |
| Create | "I'm hosting and building." | Space composer, ToolSheet, HiveLab canvas | tool picker, timeline map, recap posts |
| Steward | "I'm sustaining culture." | Admin views, analytics tiles, recaps | proof exports, moderation queue, leader prompts |

Ensure new features declare where they live in this table and update `docs/UX-UI-TOPOLOGY.md` if layout implications shift.

## Persona Playbooks

- **New student:** `/start` → `/onboarding` → Feed pinned band surfaces curated spaces → join flow triggers composer microcopy.
- **Space leader:** Feed banner promotes actions → space board composer → event sheet → recap → admin analytics.
- **Builder:** HiveLab studio → lint fixes → pilot publish → tool recap card → analytics tile increments.

## Update Process

1. Copy relevant sections into planning briefs (`docs/design/templates/PLANNING_BRIEF_TEMPLATE.md`) before starting work.
2. Document deviations in pull requests and mirror updates here.
3. Log notable shifts in `docs/design/decisions/0001-app-shell-sidebar07.md`.
