# Lab ↔ Spaces Integration Contract (v1)

Sources
- HiveLab IA: `docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:1`
- Elements Primitives: `docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1`
- Spaces IA (canonical): `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1`

Purpose
- Define the server contracts and rules that connect HiveLab tools to Space surfaces (Start, Live, Board, Calendar) without UI coupling. This keeps us backend‑first and ensures students experience tools inside Spaces as specified.

Key Contracts
- `ToolDefinition` (authoring) → `ToolRuntimeSnapshot` (publish‑ready) [packages/core/src/hivelab/contracts.ts]
- `ToolRuntimePlacement`: `{ start, live, board: off|on_input|recap_only, calendar }`
- `ToolPublishStatus`: `draft | limited_run | certified`
- Spaces `SpacePost.serializer` includes `toolContext` to link posts to a tool/version and placement.

Surfaces Mapping (Lab → Spaces)
- Start: if `audience = members` and placement.start = true → one composer shortcut in Space with `toolContext`.
- Live: if placement.live = true → one Live area tile (pin optional via `dock`), routine updates confined to Live (no bumps).
- Board:
  - `on_input`: create a single thread when input is first requested; subsequent updates attach as collapsed under latest open item (one bump).
  - `recap_only`: post once at end.
  - `off`: never post; state‑only.
- Calendar: if any time‑capable element or `time.finishBy` exists → calendar badge; if an element `extends: events` and `attachedEventId` present → attach to Event lifecycle.

Publish & Status
- Publish gate: last Run Test ≤ 10 min and no blocking lints.
- Status transitions: Draft → Limited run (14 days) → Certified. Limited run countdown is leaders‑only (Dock chip).
- Version pinning: posts/runs pin to `tool@version`.

Board Bump Rules (enforced server‑side)
- Routine changes stay within Live; no board posts.
- Input required → one bump max (new thread or collapsed update under latest open item).
- Recap is a single post (if enabled).

Event Attach
- Only allowed for elements with `extends: events`.
- Default pick scope: next 7 days within Space; supports search.
- Run Test panel shows attach status and timeline markers.

Telemetry
- Emit: `tile_*`, `settings.change/*`, `lint.*`, `run_test_click`, `publish_*`, `replace_picker_*`, `attach_*`, `search_query`.

Safety & Policy
- PII + Anonymous is blocked with autofix to disable anonymous.
- Leader‑only elements in a member tool: hint/auto‑fix to adjust audience or move into leader sub‑flow.
- Rate limits apply (actions/user = 10 per 10 min; backoff by IP).

APIs (Space‑scoped)
- `GET /api/lab/spaces/:spaceId/tools` → list runtimes with placement/status/countdown for Left Rail + Manage.
- `POST /api/lab/spaces/:spaceId/tools` → create/update drafts.
- `POST /api/lab/spaces/:spaceId/tools/:id/test` → Run Test, persist last‑run.
- `POST /api/lab/spaces/:spaceId/tools/:id/publish` body: `{ stage: "limited_run" | "certified" }`.
- `GET /api/lab/spaces/:spaceId/events/search` q=, window=7d → attach picker.

BDD Golden Paths
1) RSVP + Check‑In attached to an Event → test passes, publish Limited run, leaders see ⏳ in the Space Dock, members interact in Space.
2) Always‑on Queue → Live only, optional recap; no Calendar; no board spam.
3) File Submit with Finish by → reminders fire; recap optional; exports available.

Open Issues to Resolve
- Complete route migration `/hivelab` → `/lab/:spaceId` with a leaders‑only Space picker at `/lab`.
- Confirm storage keys for writes with parentheses (analytics may keep exact event names).
