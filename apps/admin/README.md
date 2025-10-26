# apps/admin

Admin console app. Uses the shared design system and Sidebar-07 primitives.

Run locally
- pnpm install
- pnpm dev:admin (or pnpm --filter admin dev)

Notes
- Next.js 15, Tailwind preset from `@hive/tokens`, UI from `@hive/ui`.
- Navigation lives in `packages/ui/src/organisms/admin-nav-config.ts`.
- Sidebar component: `packages/ui/src/components/app-sidebar-admin.tsx`.
- Server data: Firestore access via `@hive/firebase`. Set `FIREBASE_*` env vars.
- Auth: pages require an admin scope. In dev without Firebase configured, access is allowed for convenience.
- Optional: set `ADMIN_EMAILS=a@ex.com,b@ex.com` to enforce an email allowlist in addition to scope checks.
- Optional: set `NEXT_PUBLIC_WEB_LOGIN_URL` to point the Not Authorized button to your web login.

New sections (stubbed where needed)
- Features (`/features`) — lists feature flags via `/api/features`; empty when Firebase is not configured.
- System (`/system`) — operational controls & maintenance; currently a placeholder list.

How to verify (no Firebase required)
- Overview: open `http://localhost:3001/` — should render metric cards with dashes.
- Features: open `http://localhost:3001/features` — shows empty list and disabled toggles. Toggling will no-op and show a toast.
- API: call `GET http://localhost:3001/api/features` — returns `{ success: true, data: { flags: [] } }` in dev.
- API: call `POST http://localhost:3001/api/features/<key>/toggle` with `{ "enabled": true }` — returns `{ success: true, data: { key, enabled, persisted: false } }` in dev.

Search & pagination
- Users: `GET /users?q=jo` to search by handle/email prefixes; `limit` optional (default 25).
- Users/Spaces support cursor pagination when not searching. `Next` link appends `cursor`.
- Spaces: `GET /spaces?q=robo` to search by space name; `limit` optional (default 25).

Moderation actions
- UI buttons on `/moderation` for Approve/Remove/Warn (page reloads after action).
- API: `POST /api/moderation/{id}/action` with `{ "action": "approve" | "remove" | "warn" | "ban", "note"?: string }`.
- Live updates: `/moderation` auto-refreshes every 10s via `/api/moderation/open`.
 - Filters: `/moderation?status=open&contentType=post&campusId=ub-buffalo` updates the list.
 - Preview: click a row to open a sheet; actions require a note and expose Undo for 10 minutes.

Builder requests
- Page: `/users/requests` — list open requests; Approve → grants `builder` role, Reject → closes request.
- API: `POST /api/users/grant-role` `{ profileId, role, requestId? }` and `POST /api/users/builder-requests/{id}/reject`.

System ops (stubs)
- API: `GET /api/system/indexes/check`, `POST /api/system/indexes/deploy`.
- Page: `/system` → Operations card with actions; Environment Status card.
 - Kill Switches: `/system` → Kill Switches card; enter `campusId` and toggle:
   - Uses flags: `POSTING_ENABLED:{campusId}`, `MEDIA_UPLOADS_ENABLED:{campusId}`, `INVITES_ENABLED:{campusId}` (enabled=false pauses).

Feature flags semantics
- Fields: `enabled` (bool), `rolloutPercentage` (0..100), `segments` (`campuses[]`, `roles[]`), optional `audience` label.
- Evaluation (client helper in `packages/core/src/flags.ts`):
  - If `enabled === false` → off.
  - If `rolloutPercentage` present → user passes gate if random bucket ≤ pct.
  - If `segments` present → any match on campusId or role enables; if no match, off.
- Kill switch: set `enabled = false` to hard off regardless of rollout/segments.

Command-K palette
- Press Cmd/Ctrl+K anywhere in Admin to open palette.
- Search users/spaces/flags; hitting Enter navigates or toggles a flag.
