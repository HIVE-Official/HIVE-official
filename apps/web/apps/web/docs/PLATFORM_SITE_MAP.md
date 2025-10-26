# HIVE — Platform Site Map (IA Tree)

Status: Living document (kept in sync with App Router)
Owner: Product + Design Systems (cross‑guild)

Legend
- [page] route that changes URL and shell
- [sheet] right/center sheet over current page
- [drawer] side drawer, over current page
- [modal] blocking overlay
- (action) interactive control (button, menu, quick action)
- {api} server endpoint hit by the interaction
- [leader] leader‑gated; [auth] requires signed‑in user

Top‑Level (App Shell)
- HIVE [layout]
  - AppShell (sidebar + header + breadcrumbs) [layout]
    - Primary nav: Feed • Spaces • Rituals • HiveLab (leaders) • Profile • Settings
    - Breadcrumbs derive from path segments (e.g., “Spaces > Robotics Club > Calendar”)

Site Map (Tree)
- Landing & Identity
  - / [page]
    - (cta) Get in → /login
  - /login [page]
    - (action) Magic link (send/verify) {api: /api/auth/resend, /api/auth/verify}
  - /onboarding [page]
    - Steps: Profile • Interests • Spaces (pick) • Confirm
    - (action) Save progress {api: /api/onboarding/progress}
    - (action) Complete onboarding {api: /api/onboarding/complete}
  - /profile [page]
    - Sections: Overview • Activity timeline • Tools (My Tools) • Connections
    - (action) Edit privacy {api: /api/profile/privacy}
  - /settings [page]
  - /terms [page] • /privacy [page]

- Feed
  - /feed [page]
    - Stream (posts across spaces user belongs to; campus affordances)
      - Post card
        - (action) Open Post [sheet] → Post detail (comments, reactions)
        - (action) React, Comment, Share, Report {api: posts/...}
      - (pin) Recap posts auto‑expire (≤ 2 shown)
    - Composer (bottom, ≤6 actions)
      - (action) Text, Photo, Poll, RSVP (tool short‑cuts as “light actions”)
      - (action) Post {api: /api/spaces/[spaceId]/posts}
    - Filters (chips): All • My spaces • Campus

- Spaces (Catalog + Shell)
- /spaces [page]
    - Tabs: Recommended • New • Near‑term events • For You
    - Recommended (activity + affinity blend)
      - (action) Join [leader rules enforced] {api: /api/spaces/join}
    - Filters: Type • Tags (chips)
    - (action) Search [sheet] with filters (Type, Tags) {api: /api/spaces/search}
  - /spaces/create [page] [leader]
  - /spaces/[spaceId] [page]
    - Header: join/leave, invite (leaders)
      - (action) Join/Leave {api: /api/spaces/join, /api/spaces/leave}
    - Board (stream of posts)
      - Post item → (action) open Post [sheet] → comments/moderation
      - (pin) Pinned posts (auto‑expire)
    - Context widgets (rail)
      - Events (upcoming) → (action) open event sheet
      - Tools (quick actions) → (action) open tool in context or go to Lab
      - Resources (links)
    - Composer (bottom)
      - (action) RSVP, Poll, Quick form, Photo (tool short‑cuts)
  - /spaces/[spaceId]/about [page]
    - (copy) Rules & examples (first‑post helper) [sheet]
  - /spaces/[spaceId]/calendar [page]
    - Views: List (default) • Month
    - Event item
      - (action) RSVP one‑tap with undo {api: /api/spaces/[spaceId]/events/[eventId]/rsvp}
      - (action) Open details [sheet]
      - (action) Check‑in (leaders) {api: /api/spaces/[spaceId]/events/[eventId]/check-in}
  - /spaces/[spaceId]/members [page]
    - Roster (role badges)
      - (action) Change role (leaders) {api: /api/spaces/[spaceId]/members/role}
      - (action) Invite (leaders)
  - /spaces/[spaceId]/media-approvals [page] [leader]
    - Queue list
      - (action) Approve/Deny [sheet] {api: /api/spaces/[spaceId]/media-approvals}
  - /spaces/[spaceId]/post/[postId] [page]
    - (SSR fallback) Post detail (same UI as sheet)

- Rituals (Campus‑level; not inside Spaces)
  - /rituals [page]
    - Ritual cards: cadence, status
      - (action) Participate [drawer/sheet]
      - (action) View results handoff [sheet]

- Schools (Rollout ops)
  - /schools [page]
    - (action) Request campus {api: /api/schools/request}

- HiveLab (Leaders, Tools Builder)
  - /hivelab → 307 → /lab [route]
  - /lab [page]
    - Space picker grid
  - /lab/[spaceId] [page]
    - Canvas (Tool Home)
      - Tools grid: My Tools • Drafts • Templates (tabs)
        - Tool card (status/visibility/version)
          - (action) Publish, Make Public, Run Test (contextual)
      - Quick actions
        - (action) New Tool {api: POST /api/tools}
        - (action) Run tool → creates Space board post {api: POST /api/lab/spaces/[spaceId]/tools/[toolId]/execute}
      - Overlays
        - Library (templates) [sheet] → (action) Use template {api: POST /api/tools}
        - Run Test [sheet] → (action) Run {api: POST /api/tools/[toolId]/test}
        - Publish [sheet]
        - Lints [sheet]
        - Replace picker [sheet]
  - /lab/[spaceId]/create [page]
    - (auto) Creates draft from query/template and redirects to editor {api: POST /api/tools}
  - /lab/[spaceId]/tools/[toolId]/edit [page]
    - Header (breadcrumbs, Save, Publish)
      - (action) Save (UI only at present)
      - (action) Publish (gated) {api: POST /api/tools/[toolId]/publish}
    - Editor Rails
      - Elements panel: (action) Add/Remove/Reorder (draft) {api: PUT /api/tools/[toolId]/elements}
      - Properties: Audience • Placements • Time • Settings
    - Canvas
      - Empty state (drop targets)
    - Status bar
      - (action) Run Test {api: POST /api/tools/[toolId]/test}
      - (action) Attach to Event [drawer]
        - Event list, search, paging {api: GET /api/tools/[toolId]/elements/[elementId]/attachable-events?spaceId=...}
        - (action) Select event → persist {api: POST /api/tools/[toolId]/elements/[elementId]/attach}

- Developer/Telemetry (in‑app)
  - CTAs telemetry {api: /api/telemetry/cta}
  - Tools interactions: execute, lint, publish, deploy (Firestore tool_events via server)

APIs (by surface)
- Tools runtime & builder
  - Draft: POST /api/tools
  - Get: GET /api/tools/[toolId]
  - Elements: PUT /api/tools/[toolId]/elements
  - Test: POST /api/tools/[toolId]/test
  - Publish: POST /api/tools/[toolId]/publish
  - Visibility: POST /api/tools/[toolId]/visibility
  - Deploy: POST /api/tools/[toolId]/deploy
  - Use: POST /api/tools/[toolId]/use
  - Attachable events: GET /api/tools/[toolId]/elements/[elementId]/attachable-events
  - Attach: POST /api/tools/[toolId]/elements/[elementId]/attach
  - Catalog: GET /api/tools/campus
  - Lab runtime: GET /api/lab/spaces/[spaceId]/tools • POST /api/lab/spaces/[spaceId]/tools/[toolId]/(test|publish|execute)

Breadcrumb Examples
- Spaces > [Robotics Club] → /spaces/[spaceId]
- Spaces > [Robotics Club] > Calendar → /spaces/[spaceId]/calendar
- Spaces > [Robotics Club] > Post > [Detail] → /spaces/[spaceId]/post/[postId]
- HiveLab > [Robotics Club] > Tools > [RSVP + Check‑in] > Edit → /lab/[spaceId]/tools/[toolId]/edit

Gating & Roles
- [auth] required for all mutations
- HiveLab visible to leaders only (replace heuristic with role checks)
- Campus catalog restricted to leaders
- Jobs/ops routes disabled unless ENABLE_DEV_SEEDS=true (pre‑GA posture)

Notes
- Detail views prefer [sheet] overlays to keep context and ensure fast back navigation
- Tool board view (“on_input” thread, recap) may be linked at /spaces/[spaceId]/tools/[toolId]/board (view‑only)

Change Log
- 2025‑10‑21 Initial tree extracted from App Router + services
