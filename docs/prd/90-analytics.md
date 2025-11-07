Navigation & Right Rail — Analytics Plan

Objectives
- Measure discoverability and efficiency of global nav
- Validate value of right rail in Spaces/HiveLab
- Detect friction (collapse/expand churn, repeated opens/closes, frequent rail resizing)

Event Naming
- nav_item_click
- nav_collapse_toggle
- nav_workspace_switch
- command_palette_open
- rail_open
- rail_close
- rail_resize
- rail_tab_view
- rail_auto_sheet_fallback

Required Properties (all events)
- user_id: string
- workspace_id: string | null
- route: string (e.g., "/spaces", "/hivelab")
- ts: ISO timestamp (client or server-generated; server preferred)
- client: { app: "web" | "admin", version: string }

Event-specific Properties
- nav_item_click
  - item_id: string (route key)
  - item_label: string
  - source: "sidebar" | "cmdk" | "link"
- nav_collapse_toggle
  - state: "expanded" | "collapsed"
- nav_workspace_switch
  - to_workspace_id: string
- command_palette_open
  - entry: "kbd" | "click"
- rail_open / rail_close
  - surface: "spaces" | "hivelab"
  - source: "toolbar" | "kbd" | "deeplink"
- rail_resize
  - surface: "spaces" | "hivelab"
  - width: number (px)
- rail_tab_view
  - surface: "spaces" | "hivelab"
  - tab: string (e.g., "details", "activity", "comments")
- rail_auto_sheet_fallback
  - surface: "spaces" | "hivelab"
  - content_width: number (px)

Success Metrics
- Time-to-first-action: nav_item_click within 10s of landing
- Discoverability: ≥60% of users use command palette in week 2
- Right rail engagement (Spaces/HiveLab): ≥40% open rate on active sessions
- Rail usefulness: ≥25% tab switches per open; <10% immediate close (<3s)
- Stability: <5% rail_auto_sheet_fallback on ≥1280px viewports

Example Payload
{
  "event": "rail_open",
  "user_id": "u_123",
  "workspace_id": "w_456",
  "route": "/hivelab/exp-789",
  "ts": "2025-10-26T01:23:45.678Z",
  "client": { "app": "web", "version": "v0.1.0" },
  "surface": "hivelab",
  "source": "toolbar"
}

Instrumentation Notes
- Emit events at interaction boundary (e.g., after nav transition commit)
- Buffer and batch to reduce network overhead; respect privacy constraints
- Use consistent schema across web/admin; validate with type-safe wrappers

