Global Navigation + Right Rail — PRD

Problem
- Users need fast, consistent navigation and contextual detail without losing flow.

Goals
- Desktop-first global nav with sidebar + top bar
- Contextual right rail as an inline segmented area (not modal) in Spaces and HiveLab
- Gold used only for focus and active indicators; no gold fills

Non-Goals
- Mobile navigation patterns (handled later)
- Reworking legacy gold tints; new work must avoid them

Information Architecture (Sidebar)
- Sections (proposed)
  - Home
  - Spaces
  - HiveLab
  - Build (Tools)
  - Discover
  - Settings
  - Admin (permissioned)
- Workspace switcher + Profile cluster at bottom

Layout & Placement
- Left sidebar (persistent, collapsible): 280px expanded / 72px collapsed
- Top bar: 56px (search/command palette, notifications, profile)
- Right rail (in-page segmented panel): 360px default (min 280px, max 420px)
- Right rail appears only on: Spaces and HiveLab

Right Rail Behavior
- Toggle: toolbar button and Cmd/Ctrl+]
- State: remembers per-surface (pinned/open); deep links can open with tab selected
- Scrolling: independent from main content
- Tabs: allowed (e.g., Details, Activity, Comments); scoped to current surface
- Responsive fallback: if main content would drop below 960px, convert rail to overlay side sheet with ESC to close and focus trap

Interaction & Accessibility
- Keyboard: full navigation via keyboard; roving tabindex for menu/rail tabs; ESC closes overlay sheet
- Landmark roles: navigation (sidebar), banner (top), main (content), complementary (right rail)
- Focus visibility: 2–3px gold ring with 2px offset; ≥3:1 contrast

Visual Semantics
- Sidebar background: var(--hive-background-secondary)
- Sidebar item hover: var(--hive-interactive-hover)
- Sidebar item active background: var(--hive-interactive-active)
- Active indicator: 2px left rail, var(--hive-brand-primary)
- Right rail surface: var(--hive-background-tertiary); border: var(--hive-border-default)
- Text: var(--hive-text-primary); muted: var(--hive-text-tertiary)

Analytics & Telemetry
- Events
  - nav_item_click
  - nav_collapse_toggle
  - nav_workspace_switch
  - command_palette_open
  - rail_open
  - rail_close
  - rail_resize
  - rail_tab_view
  - rail_auto_sheet_fallback
- Dimensions (where applicable)
  - route, item_id, item_label, workspace_id, width, tab, source (click, kbd, deep_link)

Acceptance Criteria
- Sidebar
  - Collapsible with tooltip hints on collapsed items
  - Active item shows gold indicator and maintains readable contrast
  - Fully keyboard-accessible; focus never trapped
- Top bar
  - Contains command palette trigger (Cmd/Ctrl+K), search, profile
- Right rail (Spaces, HiveLab only)
  - Toggles open/closed; resizes 280–420px; persists per-surface
  - Auto-converts to overlay sheet if main content < 960px; ESC and backdrop close sheet
  - Supports tabs and independent scrolling
  - Emits analytics as specified
- Theming/Brand
  - Uses only #FFD700 for focus and indicators; no gold fills
  - All colors come from --hive-* semantic tokens

Wireframe References (ASCII)

Expanded (desktop)
┌────────────────┬───────────────────────────────────────────────┬─────────┐
│ Sidebar 280px  │                 Main Content                  │ Right   │
│ [●] Home       │                                               │ Rail    │
│ [ ] Spaces     │                                               │ 360px   │
│ [ ] HiveLab    │                                               │ (tabs)  │
│ [ ] Build      │                                               │         │
│ [ ] Discover   │                                               │         │
│ [ ] Settings   │                                               │         │
│ ▼ Workspace    │                                               │         │
└────────────────┴───────────────────────────────────────────────┴─────────┘

Collapsed (desktop)
┌──────┬─────────────────────────────────────────────────────────┬─────────┐
│ ◼    │                         Main                            │ Right   │
│ ◻    │                                                         │ Rail    │
│ ◻    │                                                         │         │
└──────┴─────────────────────────────────────────────────────────┴─────────┘

Overlay fallback (narrow)
┌──────────────────────────────────────────────────────────────────────────┐
│ Top bar                                                                 │
├──────────────────────────────────────────────────────────────────────────┤
│ Content (min 960px preserved); Right rail slides over as sheet (ESC)    │
└──────────────────────────────────────────────────────────────────────────┘

Risks & Mitigations
- Risk: Gold overuse reduces premium feel → limit to focus/indicators only
- Risk: Right rail crowding on small widths → enforce 960px content minimum and overlay fallback
- Risk: IA churn → instrument clicks to validate usage; iterate based on telemetry

Defaults (Confirmed)
- Sidebar: expanded on first load
- Right rail: Spaces closed by default; HiveLab auto-open when context exists
- Command palette: available at launch (Cmd/Ctrl+K)

