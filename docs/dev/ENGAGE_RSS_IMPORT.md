# Engage RSS Import (UB)

Purpose
- Import campus events from Campus Labs Engage RSS into a target Space as Event posts.
- UB default feed: `https://buffalo.campuslabs.com/engage/events.rss`.

Security
- In production, the import route requires `RSS_IMPORT_SECRET`. Provide it via `?secret=...`.

Env
- `ENGAGE_RSS_URL` (optional; defaults to the UB feed above)
- `RSS_IMPORT_SECRET` (required in prod)
- `USE_FIRESTORE_SPACES=true` (ensures Firestore repositories are used)
- Firebase Admin creds (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)

API
- `POST /api/spaces/{spaceId}/import/engage?secret=...&url=...&limit=...`
- `GET  /api/spaces/{spaceId}/import/engage?secret=...&url=...&limit=...` (for schedulers/cron)
  - `spaceId` — target Space to receive imported events.
  - `secret` — must match `RSS_IMPORT_SECRET` in prod. Optional in dev.
  - `url` — override feed URL (optional).
  - `limit` — max items to import (default 100; max 200).

Mapping Rules
- Creates deterministic post IDs per item (`engage-{hash}`) to avoid duplicates.
- Skips items where `status=cancelled`.
- Post
  - `kind=event`, `audience=campus`, `origin=tool_automation`, `shareToCampus=true`.
  - `authorId=rss-bot`, `authorHandle=rss@import`.
  - `content` = stripped description or `Imported from UBLinked: {title}`.
  - `tags` include `engage`, `rss`, `ub`, plus RSS categories.
  - `attachments` includes image from `<enclosure>` when present.
- `event.isRssImported=true`; `coHostNames` from `<host>`/`author`.

By-Host Mode (auto-create spaces)
- Pass `mode=by-host` to route events into a Space per host name.
- When a host Space does not exist and `createSpaces` is not `false`, the importer:
  - Classifies Space type into 4 categories using heuristics:
    - Greek → `greek_life`; Residential → `residential`; University → `university_organization`; default → `student_organization`.
  - Creates a campus‑visible Space with id `org-{slug}` (deterministic), leaderId `DEFAULT_SPACE_LEADER_ID` or `system`.
  - Sets `joinPolicy` to `request` for Greek/Residential, `open` otherwise.
- Example:
  - `POST /api/spaces/{aggregatorSpaceId}/import/engage?secret=...&mode=by-host&limit=50`

Co-host behavior
- In by-host mode, events are created in multiple Spaces (one per host) and display all co-hosts in `coHostNames`.
- Idempotency is enforced per space via a deterministic id derived from `{spaceId}:{rssItemId}`.

Host overrides (ops-tunable)
- File: `apps/web/src/server/integrations/engage/host-overrides.ts`
- Supports:
  - `spaceId` (map host to an existing Space)
  - `type` (override classification into 4 categories)
  - `normalizeTo` (alias consolidation for cleaner Space naming/IDs)
  - `skip` (exclude host from import)
  - `tags` (extra tags on create/update)

How to Verify (non-dev)
1. Ensure target space exists and you’re a member (so posts appear in your feed).
2. Call:
   - `POST /api/spaces/{spaceId}/import/engage?secret=YOUR_SECRET&limit=10`
3. Expect JSON summary `{ created, attempted }`.
4. Visit the space page and calendar to see imported events.
5. Optionally fetch RSS directly to compare counts: `curl https://buffalo.campuslabs.com/engage/events.rss`.

Scheduling (Vercel cron)
- Add a GET cron in `vercel.json`:
  -
  - "crons": [
  -   { "path": "/api/spaces/UB_EVENTS_SPACE_ID/import/engage?secret=YOUR_SECRET&limit=100", "schedule": "*/10 * * * *" }
  - ]
  - Use your actual space ID and secret; adjust interval as needed.

Notes
- Feed-only membership: The main /feed currently aggregates from joined spaces. Auto-join students to the UB Events space if campus-wide visibility is desired.
- Rituals are separate; this importer only creates space event posts.
- Timezone: UB default is `America/New_York`. Server mapping: `apps/web/src/server/campus/timezone.ts`. UI helper for rendering: `packages/ui/src/utils/timezone.ts` (use `Intl.DateTimeFormat` with `timeZone`).
