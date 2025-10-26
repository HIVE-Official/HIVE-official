HIVE E2E Sandbox

Purpose
- Mini Next.js app to exercise real routing and client state against a fake, in-memory backend. Zero production baggage.

Quick Start
- Install deps: `pnpm install`
- Dev server: `pnpm dev --filter e2e`

Full IA Plan
- See: `apps/e2e/docs/E2E_IA_PAGES_LAYOUTS.md`

Entry/Auth/Onboarding Deep Dive
- See: `apps/e2e/docs/ENTRY_AUTH_ONBOARDING.md`

Key Routes
- `/` — Home
- `/login` — Auth magic-link flow (real `AuthMagicLinkCard`)
- `/onboarding` — 3-step onboarding (profile details + space picks)
- `/spaces` — Recommended spaces list (GET /api/spaces/recommended)
- `/spaces/[id]` — Space home (post stream + Dock)
- `/spaces/[id]/calendar` — Space calendar (list/month)
- `/spaces/[id]/members` — Members roster
- `/spaces/[id]/about` — About module
- `/feed`, `/hivelab`, `/settings` — App shell stubs for layout validation
- `/profile` — Fake profile; edit `profileId`, display name, leader posture
- `/sidebar/shadcn07` — Sidebar‑07 demo using the Shadcn07 reference composition `AppSidebar`.
  - Query controls: `?variant=sidebar|floating|inset&collapsed=1&leader=1`

Mock API
- `GET /api/spaces/recommended?campusId=ub-buffalo&profileId=demo&limit=5`
- `GET /api/spaces/:id` — full space summary + tools/resources
- `GET /api/spaces/:id/posts` — feed posts
- `POST /api/spaces/:id/posts { content, profileId }`
- `GET /api/spaces/:id/events` — upcoming events
- `POST /api/spaces/:id/events { eventId, status, profileId }` — RSVP
- `GET /api/spaces/:id/members` — online roster (demo)
- `POST /api/spaces/join { spaceId, profileId }` → `{ role: "member" }`

Notes
- All data is in-memory (resets on server restart). See `src/server/fake-db.ts`.
- Foundation (tokens, fonts, ThemeProvider) and production shell (`AppSidebarHive`) match `apps/web` for pixel parity.
