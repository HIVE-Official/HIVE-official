# Spaces — L2 IA/Pages (UB‑Only, Sidebarless)

Purpose
- Define the page map and interface boundaries for Spaces at L2 (IA/pages only). No component internals, visuals, or new data shapes. Aligns with L0 shell and L1 flows.

References
- L0 shell: layout.md:1
- L1 flows: layout-l1.md:1
- Spaces spec (canonical): docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- Discovery IA: apps/web/apps/web/docs/SPACES_DISCOVERY.md:1

IA Route Map
- `/spaces` — Spaces Index (no Discover page/tab)
- `/spaces/[spaceId]` — Space Hub (feed‑first per spec)
- `/spaces/[spaceId]/calendar` — Events
- `/spaces/[spaceId]/members` — Roster
- `/spaces/[spaceId]/about` — About/Policies
- Leader‑only (visible when applicable):
  - `/spaces/[spaceId]/media-approvals`
  - `/spaces/[spaceId]/join-requests`
- Admin (reserved): `/admin/space/[spaceId]` (tools/settings/analytics)

Overlays & Non‑Page Surfaces
- Dock (from `/spaces`): “Space Overview” — preview + Join/Leave + Open
- Search/Filters sheet (from `/spaces`): Type (4 categories) + Tags + text; no dedicated route
- Post Sheet (from Hub): `/spaces/[spaceId]/post/[postId]` overlay; hub remains mounted
- Join‑Request sheet: appears on policy‑gated joins; keeps `/spaces` stable

Page Contracts
- `/spaces` — Spaces Index
  - Header: title, count of joined, CTA “Find more spaces” (opens Search/Filters sheet)
  - Filters: Type chips reflect the 4 categories (Student Orgs, University Orgs, Residential, Greek)
  - First‑time presentation (Joined=0): four category rows above the fold; cards with Join and Preview/Open
  - Ongoing: Joined list (default), small Recommended strip (4–6 items). No Discover tab
  - Cards: name • type badge • tags • activity snippet • Join/Leave • Preview/Open
  - Behavior: back/forward preserve scroll and active filter; Dock overview on card select

- `/spaces/[spaceId]` — Space Hub
  - Header: name • verified/type chip • Join/Leave (policy‑aware)
  - Tabs: All • Events • Tools (per Spaces spec)
  - Stream: posts (standard, event, tool variants); Post Sheet opens on select
  - Dock (when opened from hub): post details, filters, tool inspectors as context

- `/spaces/[spaceId]/calendar` — Events
  - Views: List (mobile default) • Month (desktop default)
  - RSVP inline; event opens in Sheet; breadcrumbs remain Space‑scoped

- `/spaces/[spaceId]/members` — Roster
  - Members list with role chips; leader actions (promote/demote) when authorized

- `/spaces/[spaceId]/about` — About
  - Identity, type, tags, links, policy summary; Join/Leave; leader edit entry points

- Leader‑only pages
  - `/spaces/[spaceId]/media-approvals`: queue with approve/deny; respects Spaces spec
  - `/spaces/[spaceId]/join-requests`: pending/approved/rejected; approve/reject actions

Discovery Policy (applies to `/spaces`)
- No Discover page/tab; Spaces is for membership and re‑entry
- First‑time (Joined=0): show the four category rows above the fold
- Thresholds: hide category rows when Joined ≥ 3 (or ~7 days since first join)
- Recommended: small, curated strip (4–6); optional type interleave via flags
- “Find more spaces”: opens Search/Filters sheet; also reachable via Cmd/Ctrl+K

Navigation & UX Rules (IA‑level)
- Stable routes; no fragmenting discovery into separate pages
- Back returns to prior scroll and filter state on `/spaces`
- Mobile: bottom tabs persistent; sheets full‑height; safe‑area aware
- A11y landmarks: `nav` `main` `complementary`; focus‑visible; skip‑to‑content

Notes
- UB‑only; campus switcher omitted
- No new serializers or APIs introduced at L2 IA; reuse existing catalogs, recommendations, and membership endpoints

---

# HiveLab — L2 IA/Pages (Leaders‑Only)

Purpose
- Define pages and overlays for HiveLab (leader tools) without introducing new shapes. Aligns to Spaces Tools module in the spec and current `/lab` implementation.

References
- Spaces Tools module: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1 (§5 Tools)
- App shell gating notes: apps/web/docs/design/app-shell/APP_SHELL_INTEGRATION.md:1
- Current implementation: apps/web/src/app/lab/**, apps/web/src/app/lab/[spaceId]/LabCanvasClient.tsx:1

IA Route Map (label “HiveLab”, route `/lab`)
- `/lab` — HiveLab Home (leaders)
  - Shows: Your leader Spaces, recent tool runs, drafts, approvals shortcuts
  - Non‑leaders: eligibility screen with clear next steps (request access or learn more)
- `/lab/[spaceId]` — Space HiveLab Canvas
  - Lanes: Active • Scheduled • Drafts; quick Composer Actions (≤6)
  - Library: Certified • Pilots • Your Drafts (within canvas)
  - “View as student” link to `/spaces/[spaceId]`

Overlays & Non‑Page Surfaces
- Tool Composer Sheet: create/configure a tool instance; focus‑trapped; ESC closes
- Run Panel/Sheet: execute or monitor a tool run (opened from canvas lanes)
- Approvals: link out to `/spaces/[spaceId]/media-approvals` (leader page) instead of a separate HiveLab approvals page
- Eligibility View (non‑leaders): stable on `/lab`; never 404; explains criteria and reversible next steps

Page Contracts
- `/lab` — HiveLab Home
  - Header: “HiveLab” + context copy (“Operate tools across your Spaces”)
  - Sections: Your Spaces (leader), Drafts, Recent Runs, Approvals shortcuts
  - Cards link to `/lab/[spaceId]`; keyboardable grid; visible focus
  - If no leader Spaces: eligibility view + sample previews (non‑interactive)

- `/lab/[spaceId]` — Space HiveLab Canvas
  - Header: Space name • role chip • “View as student” (links to `/spaces/[spaceId]`)
  - Lanes: Active • Scheduled • Drafts; each item opens Run Panel or Tool Composer Sheet
  - Library within canvas: Certified • Pilots • Your Drafts; install flows open in Tool Composer Sheet
  - Proof & Exports: links to Space Proof surfaces when available (per spec §2)

Gating & Visibility
- Nav/tab labeled “HiveLab” is always visible; leaders see full pages, non‑leaders see eligibility
- Leader posture follows onboarding/role; do not hide the route; keep it stable for muscle memory

UX Rules (IA‑level)
- Back/forward preserve context: returning from `/lab/[spaceId]` to `/lab` preserves scroll and section expansion
- Sheets are single‑task; ESC closes and returns focus; Dock not required for HiveLab (canvas uses internal sections)
- A11y: landmarks, focus‑visible, keyboardable lists and lanes; minimum 44px targets

Notes
- Use existing `/lab` implementation paths; label surfaces “HiveLab” in UI
- Media approvals and join requests remain under the Space routes; HiveLab links to them

---

# Feed — L2 IA/Pages (UB‑Only)

Purpose
- Define the Feed page as the campus activity surface without a separate “Discover” destination. Keep it simple, fast, and creation‑forward.

Route
- `/feed` — single page; no subpages.

Page Contract
- Header: “Feed” title; optional subtle helper text (“From your Spaces and campus”).
- Filters (inline chips): “All campus” • “My Spaces”. No additional tabs at L2.
- List: aggregated posts (standard, event, tool posts). Strict chronological with lightweight separators where needed; no inline thread by default.
- Create: Global Create (button + shortcut `C`) opens the composer sheet; no inline composer at L2.
- Empty state: for brand‑new users, show helpful copy and CTAs to join spaces (link to `/spaces`) and open Create.

Overlays & Dock
- Post Details: open in Dock (right context) from Feed; hub remains mounted. ESC closes; focus restoration to the triggering card.
- Filters Panel: opening “Filters” expands into Dock for full criteria; inline chips remain minimal.
- Shares: standard system share or lightweight sheet; not a dedicated page at L2.

Navigation & UX Rules
- Preserve scroll position when navigating away and back to `/feed`.
- Keyboardable list: card focus, Enter/Space open details; visible focus ring.
- A11y: landmarks (`nav`, `main`, `complementary`), live region for route changes and actions.
- Mobile: bottom tabs persistent; filter chips horizontally scrollable; Dock presents as a full‑height sheet.

Notes
- No “Discover” page. Discovery is handled by Spaces (first‑time categories) and Recommended blocks on Spaces Index.
- Do not invent new feed sources; reuse joined spaces + campus‑eligible posts per policy.

---

# Profile — L2 IA/Pages (UB‑Only)

Purpose
- Define the Profile destination and its panels using existing design‑system components. Focus on clarity, credibility, and simple editing.

Route
- `/profile` — self profile. (Viewing others’ profiles can be added later at L3 with `/u/[handle]`.)

Page Contract
- Header: avatar • name • handle • pronouns • campus • tags; verified indicators where applicable.
- Privacy Banner: current visibility (Public/Campus/Connections) with concise guidance.
- Stats Strip: compact metrics (Profile completion, Spaces joined, Signals shipped, HiveLab streak when leader).
- Activity: timeline of recent actions (posts, joins, tool publishes) using existing components.
- Spaces Panels: “Mine” and “Explore” previews; actions link out to `/spaces` or open joins directly where allowed.
- Recommendations Panel: suggested spaces or people; small, quality‑first.
- Connections Panel: compact list with mutuals.
- Tools Panel: lightweight entry points relevant to the user (opt‑in, non‑blocking).

Overlays & Dock
- Edit Profile: opens editing sub‑panes in Dock (bio, links, privacy). ESC closes; focus returns to the opener.
- Avatar/Cover updates: may use a sheet with cropper if needed; not a new page at L2.

Navigation & UX Rules
- Back returns to prior scroll; panel selections (e.g., which accordion is open) may persist for the session.
- A11y: landmarks, focus‑visible, 44px targets; skip‑to‑content link at top.
- Mobile: bottom tabs persistent; panels stack vertically; edit opens as full‑height sheet.

Notes
- Keep profile self‑contained; deeper settings live in `/settings` (not covered here).
- Ghost mode and visibility controls use existing copy and banner component defaults.
