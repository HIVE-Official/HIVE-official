# Spaces — Discovery & Information Architecture

Status: Draft (v1 rollout)

Owner: Product (Spaces) · Design Systems · Backend (Spaces Guild)

## Purpose
Document Space discovery, page composition, and ranking so engineering, design, and ops share the same map. This complements the platform tree at `apps/web/docs/PLATFORM_SITE_MAP.md`.

## IA (Tree) — Spaces
- /spaces [page]
  - Tabs: Recommended • New • Near‑term events • For You
  - Filters: Type (student org, residential, greek, university org) • Tags (topics)
  - (action) Join/Leave (role/policy aware) {api: /api/spaces/join, /api/spaces/leave}
  - (action) Open Space [page] → /spaces/[spaceId]
  - (action) Search [sheet] {api: /api/spaces/search}
- /spaces/[spaceId] [page]
  - Board (posts) • Dock (Events • Tools • Resources)
  - (action) Post composer • (action) Open Post [sheet]
- /spaces/[spaceId]/about [page]
  - (sheet) First‑post Rules helper (leaders)
- /spaces/[spaceId]/calendar [page]
  - Views: List (default) • Month; (action) RSVP {api}
- /spaces/[spaceId]/members [page]
  - Roster; (action) Role change (leaders) {api}
- /spaces/[spaceId]/media-approvals [page] (leaders)

## Discovery Surfaces
- Spaces index (/spaces)
  - Recommended (default): blend of Activity and Affinity (see Ranking)
  - New: recently created spaces (campus‑isolated)
  - Near‑term events: spaces with upcoming events
  - For You: affinity‑heavy (residence, major, labels) once profile inputs are available
- In‑context entry points
  - Feed promos: “Because you joined X”
  - Onboarding: pick spaces
  - Calendar: “Spaces with events this week”
  - Post sheets: “Related Spaces” for non‑members

## Ranking (Service Layer)
- Activity signals (available now)
  - `activityScore`, `onlineNowEstimate`, `recentPostCount1h`, `lastPostAt` (ref: `src/server/spaces/service.ts`)
- Affinity inputs (requires Profiles wiring)
  - Residence, major, interests/labels
- Blend (tunable, per campus)
  - Score = `wA * Activity + wF * Affinity`
  - Caps: one per org type shown per viewport (avoid crowding)
  - Suppress: joined spaces; dedupe near‑duplicates
  - Cold‑start: top activity by type; ensure category coverage across viewport
- Controls (ops flags)
  - `RECOMMENDED_BLEND_WEIGHTS = { activity: 0.7, affinity: 0.3 }`
  - `REPEAT_CAPS = { student_organization: 1, residential: 1, greek_life: 1 }`

## Why‑badges (Explainability)
- “Active now” → high recent posts/online estimate
- “Near your hall” → residence match
- “Matches your major” → major match
- “Popular this week” → campus momentum

## UI Composition
- /spaces [page]
  - Tabs at top; filter chips under tabs
  - Cards: space name • tags • activity snippet • “Why” badge
  - “Join” button on card (policy aware)
  - Search opens as [sheet] with Type/Tags (and text) facets
- /spaces/[spaceId] [page]
  - Dock widgets: Events (quick RSVP), Tools (light actions), Resources
  - Post detail opens in [sheet]; role‑aware moderation

## APIs
- Discovery
  - GET `/api/spaces/recommended?campusId=...&profileId=...&limit=...` (exclude joined)
  - GET `/api/spaces/search?q=&type=&tags=...`
- Actions
  - POST `/api/spaces/join` / `/api/spaces/leave`
  - GET `/api/spaces/[spaceId]` (serializer includes tools when requested)

## Telemetry
- Impressions → Clicks → Join conversion
- Tab mix, filter usage
- “Why” attribution for ranking tuning (log with impression and join events)

## Gating
- All discovery is campus‑isolated; exclude private spaces unless invited
- Join policy enforcement: open/request/invite‑only
- Leader‑only sections (Media Approvals, role changes)

## Open Questions / Next
- Affinity wiring (Profiles → discovery inputs)
- Debounce and result stats for search sheet
- Pagination strategy per tab (infinite vs numbered)

## References
- IA Tree: `apps/web/docs/PLATFORM_SITE_MAP.md`
- Code: `src/app/spaces/**`, `src/server/spaces/service.ts`, `src/app/api/spaces/**`
- Product spec (Spaces): see monorepo docs under `docs/design/spaces/*` when available
