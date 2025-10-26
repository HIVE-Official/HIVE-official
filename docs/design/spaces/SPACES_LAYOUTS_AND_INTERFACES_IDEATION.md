# Spaces — Layouts & Interfaces (Ideation Pack, VNext)

Audience: product, design, student builders, and engineering. Plain‑language first, code paths included for traceability.

Goal: define the core layouts and primary interactions for all Space surfaces. Keep the shell calm and consistent, make actions obvious, and ship a Storybook‑first catalog so we can validate IA and flows before deep services.

Sources
- Canonical spec: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`
- Shell summary: `docs/design/spaces/SPACES_SHELL_LAYOUT.md`
- Navigation research: `docs/design/spaces/SPACES_NAVIGATION_RESEARCH_BRIEF.md`
- Live components: `packages/ui/src/organisms/spaces/space-layout.tsx`, stories under `packages/ui/src/stories/spaces/**`

Tokens & Shell (applies to all)
- Width/gutters: `--shell-max-w`, `--shell-gutter` (see `packages/ui/src/styles.css`)
- Dock width: `--dock-w` (desktop), off by default in focus mode
- Density: `[data-density="compact|comfortable"]` controls header height and gaps
- Sticky: header and local tabs stick; content scrolls underneath
- Motion: slower curves (`cubic-bezier(0.22,1,0.36,1)`), 300ms in/220ms out for menus; reduced‑motion disables

Verification (global)
- Storybook is the reference. Start at “Organisms/Spaces/IA/Home”, then targeted stories per surface below.

---

## 1) Space Home (Feed‑First)

Purpose: the default Space landing. Quick scan of recent activity with lightweight actions.

Layout
- Grid: `[feed][rail?]` where rail shows only on desktop or when toggled on
- Header: identity row (name, verified), summary chips (type, visibility, members) + Join/Leave and overflow
- Tabs (local): All | Events | Tools (feed‑scoped)
- Pins: up to two, compact deck, then feed
- Composer: bottom; expands into Post/Event/Poll actions

Primary actions
- Join/Leave, Create Post, RSVP to event, open pin

Variants
- Focus mode (rail hidden), Comfortable/Compact density

Storybook
- `packages/ui/src/stories/spaces/ia/SpaceHome.stories.tsx` → Default (feed), WithContextRail, density controls

How to verify
- Scroll: header stays sticky and compacts; tabs stick with feed
- Pins render as max 2 card deck; feed filters by tabs

---

## 2) Space Chat (Channel‑like, Optional)

Purpose: high‑tempo discussion view for orgs that operate like Discord.

Layout
- Same shell; feed renders chat bubbles grouped by author (≤5m) with day separators
- Composer pinned at bottom; “Jump to present (N)” chip when scrolled up
- Rail (desktop): Community → Tools → Events → Resources

Primary actions
- Send message, quick actions (emoji, file), open thread (VNext)

Variants
- Rail on/off; unread separator (VNext); typing indicator (VNext)

Storybook
- “ChatFocus” (chatMode=true, rail hidden), “ChatWithRail” (chatMode=true, rail visible)
- File: `packages/ui/src/stories/spaces/ia/SpaceHome.stories.tsx`

Notes
- Default remains feed‑first; chat is a prop gate. Shipping later as “Channels”.

---

## 3) Events (List/Month) + Event Detail

Purpose: planning and attendance. Keep List for near‑term, Month for planning.

Layout
- Tabs: List | Month; list groups by Today/Tomorrow/This week; month grid with badges
- Detail: sheet overlay (not full route) with RSVP + undo, attendees, location
- Rail: Upcoming events (peek), Tools as relevant

Primary actions
- RSVP/Undo, Share, Add to calendar, Check‑in (if enabled)

Storybook
- Create “Spaces/Events/List” and “Spaces/Events/Month” (fixtures from `space-robotics`)
- Event detail sheet story with controls for RSVP states

Verification
- One‑tap RSVP with undo; sheet content scrolls; escape/backdrop closes

---

## 4) Members / Roster

Purpose: see who’s here, and what they do.

Layout
- Filters: Role (Leader/Moderator/Member), Activity, Search
- Cards: avatar, handle, role, quick actions (DM, Promote—role‑gated)
- Rail: Invite links, Recent joins, Online now

Primary actions
- Invite, Promote/Demote (leaders), Remove (moderation)

Storybook
- “Spaces/Members/Roster” with role filters and empty states

---

## 5) About & Resources

Purpose: establish identity and reduce duplicate link sprawl.

Layout
- About: description, featured links, tags, verification
- Resources: pinned docs/links, files (optional), tool‑provided resources

Primary actions
- Add/Edit links (leaders), pin/unpin resources

Storybook
- “Spaces/About” and “Spaces/Resources” showing leader vs member view

---

## 6) Tools (HiveLab in a Space)

Purpose: extend capabilities without bloating the core.

Layout
- Tools Catalog (grid) → Tool Detail (sheet) → Install with roles/permissions
- Installed tools: appear as actions in composer or Dock widgets

Primary actions
- Install/Uninstall, Configure, Run (where applicable)

Storybook
- “Spaces/Tools/Catalog” & “Spaces/Tools/Installed” with mock tool cards

---

## 7) Moderation & Media Approvals

Purpose: keep Spaces healthy with minimal friction.

Layout
- Queue list (media/posts flagged), preview pane, decision actions
- Badges for reason, reporter count, SLA age

Primary actions
- Approve/Reject media, Hide/Restore post, Ban/Mute (role‑gated)

Storybook
- “Spaces/Moderation/Queue” + “Spaces/Moderation/MediaApprovals” with fixtures

---

## 8) Settings & Policies

Purpose: make norms explicit and reversible.

Layout
- Sections: Visibility, Join policy (Open/Request/Invite), Posting policy, Role management
- Preview of how it will look to members

Primary actions
- Change policies, Generate invite link/QR, Assign roles

Storybook
- “Spaces/Settings/Policies” with toggles; show read‑only member view vs leader view

---

## 9) Analytics (Lightweight, VNext)

Purpose: confidence for leaders; avoid heavy BI.

Layout
- Cards: Joins/week, Post engagement, RSVP→Check‑in funnel, Report ratio

Storybook
- “Spaces/Analytics/Overview” with fixture numbers and error/empty states

---

## 10) Invite & Share

Purpose: remove friction to join; establish trust.

Layout
- Invite card: link + QR, expiry, role preset; copy/share helpers
- Gate: for Request/Invite‑only, surface request queue count

Storybook
- “Spaces/Invite” with states (open/request/invite‑only)

---

## 11) Search in Space

Purpose: find posts, events, members in one place.

Layout
- Scoped search bar → results tabs (Posts, Events, Members, Resources)
- Keyboard (`/` or `Cmd+K`) focuses the search, consistent with app shell

Storybook
- “Spaces/Search” with fixtures per tab + no results state

---

## 12) Onboarding & Empty States

Purpose: make a new Space or new member productive quickly.

Layout
- New member: banner + “What to do next” (Join events, Introduce yourself, Read rules)
- New space: leader checklist card (Add description, Add links, Invite, First post)

Storybook
- “Spaces/Onboarding/Member” and “Spaces/Onboarding/LeaderChecklist”

---

## Mobile Patterns (All Surfaces)

- Rail becomes bottom sheet or secondary route; keep feed/chat full‑bleed
- Sticky header/tabs remain; composer pinned in thumb zone
- Large tap targets; avoid hover‑only cues

---

## Motion & A11y (Global)

- Menus 300/220ms, gentle translate+scale, no springy bounce
- Header compact 280ms; avoid motion when `prefers-reduced-motion`
- Keyboard: tabs focus, skip link to content, composer focus ring; `Esc` dismiss sheet/menu
- Roles/Policies: visible but quiet (InlineNotice), screen‑reader announcements on policy changes

---

## Feature Flags

- `focusMode` (UI toggle) — hide/show rail
- `chatMode` (prop) — render channel style feed; default off
- `NAV_DETAIL_MODE` — sidecar detail (threads/events) for large screens (VNext)

---

## Storybook Backlog (to complete)

- Spaces/Events/List, Spaces/Events/Month, Event Detail Sheet
- Spaces/Members/Roster
- Spaces/About, Spaces/Resources
- Spaces/Tools/Catalog, Spaces/Tools/Installed
- Spaces/Moderation/Queue, Spaces/Moderation/MediaApprovals
- Spaces/Settings/Policies
- Spaces/Analytics/Overview
- Spaces/Invite
- Spaces/Search
- Spaces/Onboarding/Member, Spaces/Onboarding/LeaderChecklist

Each story should include:
- Args: density, focusMode, railVisibility (if needed)
- Docs tab with IA rationale and acceptance checks

---

## API & Contract Touchpoints (for later wiring)

- Recommended spaces: `apps/web/src/app/api/spaces/recommended/route.ts`
- Join/Leave/Role updates: `apps/web/src/app/api/spaces/*`
- Posts/Moderation routes: `apps/web/src/app/api/spaces/[spaceId]/posts/*`, `.../moderation/route.ts`
- Calendar aggregation: `apps/web/src/server/spaces/service.ts`
- Telemetry sink: `apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts`

---

## How We’ll Validate (Non‑Dev)

- Use SpaceHome & targeted stories to check alignment, density, and motion
- Verify “Focus mode” and tabs behavior across desktop/mobile viewports
- For Events: interact with RSVP/Undo and confirm sheet flows
- For Moderation: action a media item and confirm status feedback

---

## Notes & Decisions

- Chat remains optional (default off) to keep Spaces calm by default
- Event details prefer sheets to avoid route churn
- Tools are extensions, not new apps; appear as actions/rail widgets
