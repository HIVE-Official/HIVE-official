Status: Final v1
Owner: Community Guild + Design System Guild
Last updated: 2025-10-18

# HIVE — Spaces (Final v1) — Product & IA Spec

## 0) Purpose

Spaces are HIVE’s tenant containers: identity, membership, policy, and the surfaces where activity happens. Each Space ships one system Tool (Events) and a calm set of surfaces: post stream, Event pages, Calendar, Members, About, Analytics, Tools, Settings, and Moderation.

Terminology
- Use “post” consistently (not “board card”). In implementation, UI components may retain legacy names; this spec’s contracts use “post”.

Routes Note
- Spec uses singular routes (e.g., `/space/:id`). Current app paths may be plural (`/spaces`); alignment is implementation detail and does not change contracts.

---

## 1) Global IA & Navigation

Routes
- Post stream: `/space/:id`
- Post sheet: `/space/:id/post/:postId` (L1)
- Calendar: `/space/:id/calendar`
- About: `/space/:id/about`
- Admin Dashboard (leaders/RA/staff): `/admin/space/:id`

Surfaces
- Post stream with tabs All | Events | Tools.
- Calendar Month/List toggle (desktop), List-first on mobile.
- Event opens in L1 sheet; no page breakouts.
- Admin surfaces (Tools/Analytics/Moderation/Settings) live under the Admin Dashboard.

---

## 2) Post stream (Space home)

What it is
- Discord-like chronological stream rendering standard posts, tool posts, and event cards. A chat-style composer sits at the top; a pinned carousel (max 2, time-boxed) sits above the stream. Tabs let you focus All / Events / Tools.

IA & layout
- Route: `/space/:id` (stream), `/space/:id/post/:postId` (post sheet).
- Tabs: All (default) • Events • Tools. Pins show only where the content type matches; All shows all pins.
- Pinned: Carousel, max 2; swipe on mobile; auto-remove on expiry.
- Order: Strict chronological. Unread separator + Jump to latest.

Composer (chat-style)
- Top-docked input (Enter → publish).
- “+” menu exposes Media, Files, and Tool actions (≤6: Poll, PhotoDrop, Slots, Heads-Up, etc.).
- Choosing a Tool opens a thin inspector for required fields only.
- Visibility per post: Private (stays in Space) ⇄ Public (eligible for campus surfacing after gates); remembered per user per Space.

Post variants
- Standard post: text/media/files/links.
- Tool post: inline UI (vote, quick form, counter, slots…).
- Event card: RSVP/Waitlist inline, capacity bar, “Now” chip during live window, co-host tags; pin-eligible. Opens Event sheet with a separate, time-scoped Event Chat.

Footer on every post
- react • comment • share • Proof • overflow (⋯ Manage).

Reactions, comments, threads
- Reactions: curated local stickers/GIFs; brand-safe.
- Comments: one-level thread in the post sheet (no inline thread by default).
- Optional mini reply preview under the post (off by default).

Media policy
- If uploader is not a leader, images/videos require leader approval before display (leaders can disable this per Space).
- All uploads safe-scanned.

Moderation
- Report on all posts/comments.
- Auto-hide threshold → leader-only ghost state with actions: Unhide, Remove, Escalate, View reports.
- All actions are audit-logged.
- Implementation note (2025-10-19): `POST /api/spaces/{spaceId}/posts/{postId}/moderation` now covers `auto_hide`, `unhide`, `escalate`, and `remove`, emits telemetry, and persists immutable audit entries to `spaces/{spaceId}/audits` (`apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.ts:1`, `apps/web/src/server/spaces/audit-log/firestore-space-post-audit-log.ts:1`). Moderation transitions and pin changes stream into the analytics sink via `apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1` to satisfy §2 telemetry goals. BDD coverage lives in `apps/web/src/app/api/spaces/[spaceId]/posts/[postId]/moderation/route.test.ts:1`.

Proof (exports)
- Button on post footer; redaction profile selectable in sheet; exports audit-logged.
- Events: RSVP CSV, attendance CSV, ICS, recap PDF.
- Forms/Files: submissions CSV + file manifest.
- Poll/Rank: anonymized distribution CSV.
- Counters/Kudos/Tasks/Slots: respective ledger CSV.

Safety & lints
- Pre-publish blocking for PII (phone/SSN/DOB) and a11y (alt-text).
- Role-tiered strictness for anonymous/new members.
- Policy overlays by Space type; Light-Mode banner shows changes when capabilities are missing.

Digest & quotas
- No platform digest. No automatic bundling on the stream. Quota warnings and rate limits only; leaders can install a digest tool later if desired.

Performance & a11y
- Virtualized list; prefetch next chunk on idle; image lazy-load with blur-up.
- P95: load ≤1.8s cold / ≤1.2s warm; interactions ≤150ms.
- WCAG AA contrast; visible focus rings; alt-text prompts; reduced-motion respected.

Notifications & edge rules
- If user is active in Event Chat during the live window, suppress generic comment toasts for that event.
- Public → later made Private: campus deep link shows “no longer public.”
- Pin expiry updates silently in view; leader gets “Pin expired.”
- Event Chat retains 7 days (read-only after); no export.

Component contracts (build targets)
- ComposerChat, PinnedCarousel, PostCard (standard|tool|event), ReactionsBar, CommentsSheet, EventSheet (tabs), BoardTabs, ProofButton, MediaApprovalQueue.
- Telemetry: composer starts→publishes; pin CTR; tab switch rate; media approval latency; RSVP→Check-In; moderation ratios; public slider adoption.

---

## 3) Calendar module

Purpose & route
- Single source of truth for Space events: create → discover → RSVP → check-in → review/export.
- Route: `/space/:id/calendar`.

Views & behavior
- Desktop: Month ↔ List (remember per user/space).
- Mobile: List-first; Month behind a toggle.
- Header (leaders): + New Event, ICS Subscribe, Filter.
- Event opens in an L1 sheet (never a full page).
- Spotlight: one starred event at top of List (expires at start/unstar).

Month view
- Mini-month + right-side List (desktop); inline day accordion on mobile.
- Day cell shows up to 3 markers with “+N” overflow.

List view
- Grouped by day; infinite scroll.
- Default range: Next 14 days (mobile), Next 30 days (desktop).
- Optional Agenda mode (Morning/Afternoon/Evening).

Rows & Event sheet
- Row density: time • title • host chip(s) • location • RSVP chip • capacity bar; “Now” chip in live window; “Co-hosted” tag where relevant.
- Event sheet tabs: Details, Extensions (Before/During/After), Attendees, Chat (live, then read-only 7d), Activity.
- Member actions: RSVP (Going/Waitlist), ICS (“Add to calendar”), share.
- Leader quick actions: Remind • Open/Close Check-In • Bump capacity • Duplicate • Pin • Cancel.
- Proof: RSVP CSV, Check-In CSV, ICS, Recap PDF, Co-host split CSV; redaction profile selector; exports audit-logged.

Create / Edit / Cancel
- Create: title, time, location, visibility (Public | Members | Invite-only), capacity+waitlist, co-hosts, reminders (T-24/T-1 if opted), Check-In (QR + optional self window), image (policy-aware). Publishing creates Calendar entry + Event post.
- Edit: T-24 reschedule lock; after lock, use Cancel + Duplicate with a brief reason. Co-hosts must accept before T-24.
- Cancel: status→Canceled; reminders suppressed; proof remains.

Interactions & policies
- RSVP chip in List (one-tap + 10s undo toast); modal in Month; full in Sheet.
- Waitlist auto-advances on openings.
- Check-In: Leader QR + optional self window (default T-30 → T+30); optional Check-Out for multi-station counts.
- Media policy observed (pre-approve for non-leaders; safe-scan).
- Co-host appears on all host calendars & posts; proof marks origin.
- RSS imports: one-time import creates a manual event (source=`rss`) that behaves like any event (no “unclaimed” state).

Live handling, filters, notifications, performance
- Live: List floats live event to top of “Today” (rate-limited); “Now” chip; auto-pin on Events tab if a pin slot is free.
- Filters: Visibility (All | Public | Members), Host (This Space | Co-hosted), Time (This week | Next 7 | Next 30), State (Upcoming | Live | Past). Optional “Has extensions” toggle (hidden by default).
- Notifications: member opt-in by event (default off); double-notify guard vs Event Chat.
- P95: Month/List ≤300ms (100 events), Sheet ≤200ms. A11y: keyboardable grid, ARIA counts, reduced motion, large tap targets.

---

## 4) About module

Purpose & route
- Space identity & credibility card for students, leaders, advisors, and downstream modules (Directory, Recommendations, campus surfacing).
- Route: `/space/:id/about`.

Read view (above the fold)
- Cover banner + accent color; Space name • type • verified badge • optional tagline; Join/Share action; quick stats (members, upcoming events count, posts/week optional).
- Sections: Overview (rich text), Tags (3–8 chips), Links (verified/allow-listed), Policies summary (join rule, posting policy, visibility defaults, media policy note), Contacts (campus-scoped), Version history (leaders), Source/Notes (provenance).

Data model & editing
- Core: name, type, verified, tagline, description.
- Visual: cover (safe-scan), accent (contrast lint).
- Discovery: tags[], featuredLinks[].
- Policies summary mirrors Settings.
- Provenance: sourceNote, updatedBy/At; version log (leaders).
- Lints: profanity/PII, contrast, link safety, length guidance.
- Save: preview → save; instant refresh; version appended.

Roles, safety, integrations, components
- Leaders edit; Members/Guests read (contacts redacted for non-campus).
- All uploads safe-scanned; alt-text required; link allowlist.
- Downstream: Directory & Explore, Recommendations, feed quality gates.
- Components: AboutHeader, AboutOverview, AboutTags, AboutLinks, AboutPoliciesSummary, AboutContacts, AboutVersionHistory, EditAboutSheet, CoverUploader, AccentPicker.

---

## 5) Tools module (leader-facing)

Purpose & surfaces
- Gives Space leaders structured autonomy to install, manage, and monitor Tools safely.
- Admin Dashboard → Tools (`/admin/space/:id/tools`): Installed lanes (Active / Scheduled / Installed / Warnings), Composer Actions (≤6 visible), Library (Certified / Pilots / Your Drafts), Proof & Exports (CSV packs), Settings (caps, widget eligibility, maintainers).
- In-Space integration: Tools manifest as composer actions, posts, Event attachments, widgets (Space Dock / Event Live Dock), and Context Panel chips (active, scheduled, warnings).

Lifecycle
- Build (HiveLab) → Pilot (≤2 Spaces, 30 days, sandbox required) → Certified (Library). Version pinning on publish; open posts may opt-in to migrate; closed posts lock for proof.

Behavior & governance
- Lints / Light-Mode / Adaptation: strict PII/field-count/close-time/regex rules; compile to Light-Mode if capabilities missing; banners show adaptations.
- Caps: soft cap 2 posts/day/tool/space (warn + allow override; logged).
- Ownership: installer=maintainer; transferable.
- Uninstall: hides composer action; stops auto-posts; history & proofs remain.
- Widgets: Space Dock up to 3, Event Live Dock 1; default TTL inherits instance; event widgets visible during T-30 → T+30.
- Proof & Exports: on each post; CSV packs (7/28/90d) by tool type; redaction profiles (Leader/Advisor); all exports audit-logged.

Perf, telemetry, acceptance
- Admin Tools load ≤250ms; install sheet ≤180ms; keyboardable lanes; high-contrast chips.
- KPIs: tools installed/space/week; starts→publishes %; completion %; cap overrides/day; pilot→certified rate; widget utilization; export counts.
- MVP: install from Library (with sandbox for Pilots), composer ordering ≤6, publish posts/attachments, lints/Light-Mode/adaptation active, soft caps with override logging, uninstall keeps proofs.

---

## 6) Admin Dashboard (leader/RA/staff-only)

Purpose, access & tabs
- Control center for Space leadership: operational visibility (Analytics), tools management (Tools), safety (Moderation), and governance (Settings).
- Access: `/admin/space/:id` (Owner/Leader/RA/Staff; Moderator limited).
- Tabs: Overview, Tools, Analytics, Moderation, Settings.

Overview
- 10-second health glance: Space Health (7d), Events funnel (28d), Top Tools, Safety Pulse, Quick Exports (RSVP/Check-In/Co-host split/Recap). Actions link to deep tabs.

Tools
- Installed lanes; Composer actions; Library (Certified/Pilots/Your Drafts); Proof & Exports; Settings (caps, widget eligibility, maintainer). Lints, Light-Mode compile, soft caps, sandbox for Pilots, version pinning.

Analytics
- Overview KPIs (posts/member, active %, report ratio), Events funnel, Tools usage (starts→publishes, completion, abandon), Members & Labels adoption, Safety & Ops (reports, moderation latency), Exports. Filters for 7/28/90d, label, tool type. Charts ≤350ms; accessible.

Moderation
- Reports Queue; Action Panel (warn/mute/ban/remove/escalate); Member sheet (role, labels, history); immutable Audit Log; Safety Summary. Policy overlays by type (Residential/Greek/Org). Perf ≤250ms; keyboard-accessible tables.

Settings
- Access policy (open/request/invite-only); Posting policy (members/leaders-only); Visibility defaults (public allowed?); Modules (reorder/hide); Ownership & transfer; Archive/Delete; Verification request/revoke. All governance changes audit-logged.

---

## 7) Performance, a11y, telemetry (Space-wide)

- Post P95 load ≤1.8s cold / ≤1.2s warm; interactions ≤150ms.
- Calendar Month/List ≤300ms (100 events); Event sheet ≤200ms.
- Admin tabs load ≤300ms.
- WCAG AA across surfaces; reduced motion; alt-text prompts; keyboardable controls.
- Space KPIs: posts/member/week, active %, events/member, RSVP→Check-In %, report ratio/auto-hide %, exports/day, pilot→certified rate, cap overrides/day, widget utilization, joins/week, leader:member ratio.

---

## 8) Acceptance criteria (Space MVP)

- Post stream: chat-style composer with Tool actions; private/public per post remembered; pinned carousel (≤2); chronological order; reactions + threaded comments in sheet; Proof exports; media approval queue; moderation auto-hide & ghost state; no platform digest (only quotas/rate limits).
- Calendar: desktop Month/List (mobile List-first); create/edit/cancel (T-24 lock); RSVP one-tap + undo; Check-In QR + optional self window; Spotlight + live “Now”; co-host; RSS import → manual event; proof exports; perf & a11y budgets.
- About: full read/edit with lints, versioning, safe links & media; tags feed Directory/Explore; shareable meta-preview.
- Tools: install from Library (Pilots sandboxed), composer ≤6, publish posts/attachments, widgets pinning, lints/Light-Mode/adaptation active, soft caps logged, uninstall keeps history, telemetry active.
- Admin Dashboard: Overview/Tools/Analytics/Moderation/Settings functional; audit logs & exports operational.

---

## 9) Edge rules & options

- Public → Private: campus deep link shows “no longer public.”
- Reschedule lock: T-24 across types; cancel+duplicate after lock.
- Single Spotlight event; starring new unstars prior (default ON).
- Member notifications default OFF (opt-in per event).
- Contacts on About are campus-scoped by default; redact for public viewers.

---

This pack is the complete Spaces spec (modules, behaviors, safety, performance, contracts, and acceptance)—ready for PRD/Storybook handoff or to seed a new conversation thread.
