# Global Shell — L1 (UB‑Only, Sidebarless)

Purpose: deepen L0 into concrete flows, state, and responsibilities per surface while staying UB‑only and sidebarless. No new data shapes; all UI states must be backed by existing contracts or Storybook fixtures. This remains a blueprint; implementation is Storybook‑first and e2e‑verified later.

References
- L0 baseline: layout.md:1
- UI tokens, motion, a11y: UI_GUIDELINES.md:1
- Spaces IA (canonical): docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- Mobile patterns: MOBILE_NAVIGATION_SPEC.md:1
- Universal shell notes: UNIVERSAL_SHELL_DOCUMENTATION.md:1

Global Structure (unchanged from L0)
- Tabs: Feed • Spaces • HiveLab • Profile. No Discover. UB badge in Top Bar.
- Desktop: top tab bar under Top Bar; Dock open by default.
- Mobile: bottom tabs; Dock as full‑height sheet; floating Create CTA.

Top Bar (L1 details)
- Left: UB badge (non‑interactive on UB‑only).
- Center: top tabs (desktop). If design prefers, tabs can sit directly below Top Bar; both patterns are acceptable, choose one per route, not mixed.
- Right: Create, Notifications, Avatar. Overflow menu contains secondary actions (e.g., settings links) to keep surface minimal.
- Search: no inline input at L1. Cmd/Ctrl+K opens the Palette; on ≥1536px we may show a hint button (“Search or jump…”) that triggers the Palette.

Top Tabs and Bottom Tabs
- Tabs are route‑driven; selection matches current route.
- Badges: optional dot for attention; avoid counts at L1 to reduce noise.
- Keyboard: Arrow navigation across tabs; Enter/Space to activate; focus ring visible.
- Sticky behavior: tabs stay visible during content scroll on desktop; on mobile, bottom tabs are fixed and respect safe areas.

Dock (Right Context) — State Machine
- States: `closed` • `peek` (narrow 16rem) • `open` (24rem) • `expanded` (≥32rem).
- Transitions: ESC → previous state; toggle button cycles closed ↔ open. `expanded` is opt‑in per view; `peek` is used by views that want non‑intrusive filters.
- Persistence: `dock` query param per route (e.g., `?dock=open|closed|peek|expanded`). Default `open` on desktop, `closed` on mobile.
- Focus: opening Dock moves focus to its heading; closing restores focus to the control that opened it. Screenreader label reflects the active view (e.g., “Dock — Post details”).
- Views: Notifications, Post details, Space overview, Editor panels, Filters.

Command Palette (Cmd/Ctrl+K)
- Structure: command‑first with categories, search fallback. Categories: Navigate, Create, Filter, Focus, Help.
- Examples
  - Navigate: “Go to Feed”, “Go to Spaces”, “Go to HiveLab”, “Go to Profile”.
  - Create: “New Post (Feed)”, “New Post in Current Space” (if on a Space route).
  - Filter: “Feed • My Spaces”, “Feed • All Campus”.
  - Focus: “Toggle Dock”, “Focus Content”, “Open Notifications”.
  - Help: “Show Shortcuts”.
- Recents: non‑persistent in L1; session‑only is acceptable. No new telemetry required.

Global Create (Composer)
- Entry points: Top Bar button (desktop) and floating CTA (mobile). Shortcut: `C`.
- Surface: sheet/modal with focus trap; ESC closes; autosave draft in memory; confirm before destructive close when dirty.
- Scope: if on a Space route, default scope is that Space; else campus Feed.
- Attachments: show a route‑aware dropzone overlay on drag; success/errors via Toasts.
- Policy: leaders‑only posting in specific surfaces must be enforced via existing role flags; non‑leaders see clear error UI with non‑destructive exit.

Notifications/Inbox (Dock View)
- Access: bell button in Top Bar; opens Dock view “Notifications”.
- Sections: All, Mentions (L1 keeps it to two). Default: All.
- Behavior: mark‑as‑read on explicit action only (no implicit scroll mark at L1). Batch actions can wait until L2.
- Item click: navigates and keeps Dock open with the detail context where applicable.

Context Filters Bar (Feed)
- Placement: just under tabs on desktop; top of content on mobile; collapses into Dock when user opens “Filters”.
- Chips: “All” and “My Spaces” at L1. No additional categories to avoid new shapes.
- Persistence: per session and route; reset on hard route change.

Selection Toolbar (Feed/Spaces)
- Trigger: entering multi‑select mode (keyboard or long‑press on mobile).
- Position: anchored above content on desktop; sticky bottom action bar on mobile.
- Actions: Clear, Select All (scope‑aware), common actions (e.g., hide, follow/unfollow). L1 can stub actions pending contracts.

Routes and Responsibilities
- Feed (`/feed`)
  - Content column width: responsive max (e.g., 672–736px) for readability.
  - Composer: use Global Create sheet; no inline composer at L1.
  - Cards: consistent anatomy (author, role chip where relevant, time, content, media, actions). Selection mode supported.
  - Dock usage: post details, reactions breakdown, filters.
- Spaces (`/spaces`)
  - Layout: list of joined spaces first; secondary view for “All campus spaces”.
  - Actions: join/leave; role chip; quick jump. No “Discover” label.
  - Dock usage: selected space overview, membership, quick actions.
- HiveLab (`/hivelab`)
  - Gate: leaders only; non‑leaders see eligibility and request path.
  - Sub‑IA: Tools (approvals) • Drafts • Insights. Default: Tools.
  - Dock usage: contextual editors, item details.
- Profile (`/me`)
  - Header: avatar, name, role chips; UB context if needed.
  - Sections: Activity • Spaces • Settings. Default: Activity.
  - Dock usage: edit panels (bio, privacy, notifications).

Keyboard Shortcuts (L1 map)
- Global: Cmd/Ctrl+K (Palette), C (Create), ESC (close overlays/Dock), ? (shortcuts overlay).
- Go to: G F (Feed), G S (Spaces), G L (HiveLab), G M (Profile).
- Focus: F D (Focus Dock), F C (Focus Content), F T (Focus Tabs).

Connectivity & Updates
- Offline banner slides from top; queue local actions and provide retry after reconnect.
- Update‑ready banner (PWA or app update) with “Reload” action; defers to tokens for motion.

Errors & Empty States
- Permission errors: role gate with clear explanation and reversible exit.
- Network errors: retry affordances; Toast + inline message; non‑blocking.
- Empties: helpful copy and a prominent Create or Explore action as relevant.

State & URL Rules
- Dock: `?dock=closed|peek|open|expanded` per route; default varies by breakpoint.
- Palette/Create: ephemeral state; do not push new URL entries; allow deep links later at L2.
- Filters: query param `?filter=my-spaces|all` optional. Do not add new enumerations.

Motion & A11y (L1 commitments)
- All interactive elements keyboardable with visible focus; 44px touch targets.
- Focus management specified for Dock, sheets, and palette; ESC returns focus.
- Reduced‑motion respected; only opacity/scale where needed; slide distances small and tokenized.
- Live regions for route confirmations and async results; no duplicate announcements.

Verification (L1)
- Storybook coverage for: TopBar, Tabs (top/bottom), Dock (all states), Command Palette (categories), Create Sheet, Filters Bar, Selection Toolbar, Notifications Dock view, Toast/Live regions, Connectivity/Update banners.
- E2E smoke in apps/e2e (fake API): tab navigation, Dock persistence across routes, Palette navigation, Create flow open/close, filters toggle, role‑gate rendering for HiveLab.

Decisions Required to Lock L1
- Tabs placement on desktop: inside Top Bar vs directly below? Default recommendation: directly below for clarity and simpler layout stacking.
- Dock peek usage: enable `peek` for Filters on Feed? Default: yes.
- HiveLab default sub‑tab: Tools as default? Default: yes.
- Feed chips: “All” and “My Spaces” only at L1? Default: yes.

Out of Scope for L1 (L2+)
- Per-user tab reordering or personalization.
- Real-time presence/typing indicators across the shell.
- Full notification batching and advanced triage.
- Deep Palette integrations (admin tasks, multi-step flows).

## Spaces — L1 Flows (Layouts + Flows)

Purpose
- Help students manage and enter Spaces quickly: see Joined first, browse All Campus when needed, understand membership status, and jump into a Space’s home without dead-ends. UB-only; no Discover.

Entry Points
- Tabs: user taps/clicks Spaces tab.
- Deep link: a URL to Spaces or to a specific Space’s home.
- From Feed: tapping a Space name on a post routes to that Space’s home.

Primary Path: Joined → Overview (Dock) → Open Space
1) Land on Spaces route; “Joined” section is prominent at the top.
2) User selects a joined Space tile/card.
3) The Dock opens to “Space Overview” (role chip, brief description, quick actions).
4) Primary action “Open Space” navigates into that Space’s home (Space feed/home view).
5) User browses the Space; back navigation returns to the Spaces route at the previous scroll position.

Alternate Primary Path: All Campus → Join → Overview → Open Space
1) On Spaces, user switches to “All Campus Spaces”.
2) User selects a Space not yet joined; the Dock opens with overview and a prominent Join action.
3) User chooses Join; membership updates to member (per existing policy/contract).
4) The Dock reflects new role; “Open Space” navigates into that Space’s home.

Exit Points
- Back to Spaces list (preserve scroll and filter mode: Joined or All Campus).
- Switch to another tab (Feed/HiveLab/Profile) — state does not bleed across routes.
- Close Dock with ESC or toggle; focus returns to the originating tile.

Key Alternates
- Quick Open: From a joined Space tile, user can “Open Space” directly (bypass overview) via keyboard Enter/Space or a primary affordance on the card.
- Leave Space: From the overview in Dock, user selects Leave; confirm, update role chip to visitor; card returns to non-joined state.
- Search/Jumps: Use Command Palette to “Go to Space …” (no inline Spaces search at L1).
- Deep Link Landing: If the user lands directly in a Space home from a deep link, the Spaces list is not shown; back returns to the prior route.

Notes
- Keep Joined first for speed. All Campus is available but secondary.
- No new data shapes; use existing membership/role flags. Posting restrictions (leaders-only) are enforced in the Space home, not on this route.
- Dock is contextual: overview, membership, quick actions. It should never replace the Space’s full home; it’s a stepping stone and a management surface.
- URL: Spaces list is a stable route; per-route Dock state can persist via query param if needed (no requirement to deep link into overview at L1).
