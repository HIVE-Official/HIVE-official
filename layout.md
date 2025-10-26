# Global Shell — L0 (UB‑Only, Sidebarless)

Purpose: capture the minimal, high‑confidence layout decisions for the UB‑only release. This is Level 0 (L0): structure, routes, and global behaviors without deep state charts. Visual tokens, motion, and accessibility specifics live in UI_GUIDELINES.md:1. Build primitives in @hive/ui first; stitch flows in apps/e2e.

References
- UI rules, tokens, motion, a11y: UI_GUIDELINES.md:1
- Spaces product IA (canonical): docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- Universal shell notes: UNIVERSAL_SHELL_DOCUMENTATION.md:1
- Mobile nav patterns: MOBILE_NAVIGATION_SPEC.md:1
- E2E canonical UI app: apps/e2e/README.md:1 (fake API only)

Scope
- Campus: University at Buffalo (UB) only. No campus switcher; show static UB badge.
- IA (global): Feed • Spaces • HiveLab (leaders) • Profile. No Discover.
- Shell layers: Top Bar, Top Tabs (desktop) or Bottom Tabs (mobile), Content, Dock (right context), Command Palette, Toasts/Modals.

Navigation (Sidebarless)
- Desktop top tabs (4): Feed • Spaces • HiveLab • Profile. Center‑aligned under the Top Bar or integrated as a tab strip; keep it stable across routes.
- Mobile bottom tabs (4): Feed • Spaces • HiveLab • Profile. Create is not a tab.
- Visibility: HiveLab tab always visible; leaders see tools, others see an eligibility/learn‑more screen (no dead‑end, reversible).
- Badges: optional count dots on tabs (Inbox/Notifications via Dock, not a tab).

Top Bar
- Left: static UB badge; optional compact search affordance that opens Cmd/Ctrl+K.
- Center: desktop top tab bar (if not placed directly below).
- Right: Create (gold accent), Notifications button, Avatar menu (Profile/Settings).
- Keep minimal; move secondary actions to Command Palette or Dock views.

Dock (Right‑Side Context)
- Role: complementary context for details, editing, filters, and tools. Never primary navigation.
- Default: open on desktop, closed on mobile; remembers state per route (URL param).
- Width: 24rem (384px) default; expandable when needed; ESC closes and restores focus.
- Route usage
  - Feed: selected post details, reactions, quick actions, filters.
  - Spaces: selected space overview, membership, role chip, quick actions.
  - HiveLab: leaders’ tools (approvals, drafts, insights) open in Dock when contextually editing; main pane holds lists/boards.
  - Profile: edit panels (bio, privacy, notifications) in Dock; main shows profile.

Breakpoints & Layout
- Compact ≤640: mobile; bottom tabs; Dock as full‑height sheet (focus‑trapped, swipe/ESC to close). Floating Create respects safe areas.
- Cozy 641–1024: no sidebar; top tabs remain; Dock optional; prioritize content width.
- Spacious ≥1025: top tabs + Dock open by default; generous gutters; center content.

Global Actions & Shortcuts
- Cmd/Ctrl+K: Command Palette (command‑first; search fallback).
- C: Create (scope‑aware; if in a Space, defaults there; else campus feed).
- G F: Feed • G S: Spaces • G L: HiveLab • G M: Profile.
- ESC: close Dock/overlays; return focus predictably.

L0 Global Primitives (must exist at L0)
- Command Palette: command‑first actions (navigate, create, filter); search fallback; fuzzy match.
- Global Create Sheet: scope‑aware composer with autosave; focus trap; ESC closes.
- Dock Manager: closed/peek/open states; per‑route URL param; restore focus target.
- Context Filters Bar: lightweight chips for Feed; collapses into Dock on scroll.
- Selection Toolbar: appears on multi‑select; ESC cancels; keyboardable.
- Notifications/Inbox Panel: rendered as a Dock view; not a dropdown.
- Toasts + Live Regions: async outcomes and polite announcements.
- Sheet/Modal Stack: one controller for overlays; stack‑safe; accessible.
- Shortcuts Overlay: “?” shows discoverable keyboard map; palette linkable.
- Connectivity/Update Banners: offline indicator and update‑ready strip (PWA/hard reload).
- Upload Dropzone Overlay: global drag‑and‑drop affordance; route‑aware.
- Skip‑to‑Content Link: first focusable; visible on focus; meets WCAG.
- Top Progress Indicator: route transitions and uploads (slim bar using tokens).
- Role Gate Wrapper: wraps HiveLab; stable route for non‑leaders.

Routes (Next.js, indicative)
- apps/web/src/app/(shell)/feed
- apps/web/src/app/(shell)/spaces
- apps/web/src/app/(shell)/hivelab (gate by role; stable UI for all)
- apps/web/src/app/(shell)/me

URL & State
- Persist Dock state per route via query param (e.g., `?dock=open`).
- Palette and Create sheets push ephemeral state without polluting history (hash/segment or in‑memory with escape hatch).
- Selection and filters survive soft navigations within a route; reset on route change.

Motion & Accessibility (defer specifics to UI_GUIDELINES.md)
- Respect reduced motion; use tokenized durations/easings.
- Visible focus on all interactive elements; minimum 44px targets.
- Semantics: nav, main, complementary, search landmarks; ARIA attributes for Dock open/close and sheet stacks; announce route changes and async outcomes via polite live regions.

Data & Integration
- Do not invent data shapes. Use existing serializers/contracts.
- Storybook‑first for components in @hive/ui with realistic fixtures or SSR‑safe mocks.
- E2E app uses only the in‑memory fake API (apps/e2e/src/server/fake-db.ts:1).

Defaults (L0 decisions)
- Sidebarless: desktop uses top tabs; mobile uses bottom tabs.
- Dock: open on desktop, closed on mobile; 24rem width; per-route persistence.
- Notifications: open in a Dock panel to reuse the context pattern.
- Create CTA: floating (mobile, safe-area aware) and top-bar button (desktop).
- Tabs: 4 only (Feed, Spaces, HiveLab, Profile); labels stable; optional badges.

Spaces — Discovery Policy (L0)
- No Discover page/tab. Spaces is for membership and re-entry; discovery is a moment, not a destination.
- First-time (Joined=0): on `/spaces`, show four category rows above the fold — Student Organizations, University Organizations, Residential, Greek Life. Cards expose Join and Preview/Open.
- Ongoing: default to Joined. Keep a small Recommended strip (curated, limited) below. Provide a “Find more spaces” entry that opens a search/filters sheet (Type = the same four + Tags + text). Also reachable via Cmd/Ctrl+K (“Find spaces”).
- Thresholds to hide category rows: when Joined ≥ 3 (or after ~7 days since first join). Tunable via flags; defaults campus-wide.
- Recommended list: 4–6 items; may interleave by type for first-time or low-join states via flags. No new data shapes; reuse existing `/api/spaces/recommended` and catalog sections/filters.

Open Items for L1
- Command Palette commands taxonomy and scoping rules.
- HiveLab sub‑IA (tools, drafts, insights) and permission states.
- Feed filtering, chips behavior, and alignment with Dock filters.
- Notifications/inbox detail flows and batching.
- Tab badge rules and thresholds (counts vs dots).

Verification (L0 acceptance)
- Storybook: primitives for TopBar, TopTabs, BottomTabs, Dock, CommandPalette, ToastLayer exist and match tokens.
- E2E skeleton: routes render, tabs switch, Dock toggles, shortcuts register.
- Accessibility smoke: keyboardable shell, sane focus order, ESC behavior consistent, skip link works.

Notes
- UB‑only simplifies copy and campus badge; revisit multi‑campus switcher post‑L2.
- Keep shell unobtrusive; content and creation dominate visual hierarchy.
