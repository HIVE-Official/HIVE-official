Status: Draft
Owner: Design System Guild

# E2E IA — Pages, Layouts, and Flows (Build-First Plan)

Purpose
- Define the complete information architecture (IA), pages, and layouts we will prototype in the E2E app first, using shadcn Sidebar‑07 and @hive/ui tokens.
- Keep production concerns out; rely on the in‑memory API in `apps/e2e/src/server/fake-db.ts:1`.

Canonical References
- App shell decision: docs/design/decisions/0001-app-shell-sidebar07.md:1
- Spaces IA/spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- UI guidelines: UI_GUIDELINES.md:1
- Third‑party UI policy: docs/ux/THIRD_PARTY_UI_POLICY.md:1

Principles
- Sidebar‑07 everywhere (desktop rail/expanded, mobile sheet).
- Storybook‑first for components, E2E for flows/routing.
- No new data shapes; use fixtures mirroring server contracts.
- Accessibility: visible focus, keyboardable, 44px touch targets.

Global App Shell (production)
- Composition: `SidebarProvider` + `AppSidebarHive` + Header (breadcrumbs, actions, profile menu).
- Nav (from `@/organisms/nav-config`): Feed, Spaces, Profile, HiveLab (leader‑gated), Settings.
- Mobile behavior: sheet via `SidebarTrigger`; desktop supports rail/expanded.
- Shadcn07 reference demo: `/sidebar/shadcn07?variant=sidebar|floating|inset&collapsed=1&leader=1` (uses `AppSidebar`).

Top‑Level Routes (E2E)
- Entry
  - `/` Home (shell visible in E2E for quick access)
  - `/login` Magic‑link entry (AuthMagicLinkCard)
  - `/onboarding` 3‑step onboarding (profile details + space picks)
- Global
  - `/feed` Global/campus feed stub (verifies shell + list layout)
  - `/profile` Profile overview + quick edit controls
  - `/settings` Settings scaffold (theme, notifications)
- Spaces (core flows)
  - `/spaces` Recommended spaces (GET /api/spaces/recommended)
  - `/spaces/search` Spaces search (GET /api/spaces/search?q=)
  - `/spaces/[id]` Space home: Post stream (board) + Dock (Events • Tools • Resources) with shared sub‑nav (Home • Calendar • Members • About)
  - `/spaces/[id]/about` About module
  - `/spaces/[id]/calendar` Calendar (list + month)
  - `/spaces/[id]/members` Online roster
  - `/spaces/[id]/post/[postId]` Post detail (page) with sheet mode supported via query on home
- HiveLab (leader‑gated)
  - `/hivelab` HiveLab hub landing
  - `/lab/[spaceId]` HiveLab canvas shell
  - `/lab/[spaceId]/tools/[toolId]/edit` Tool editor (properties + rails)
- Shell demos
  - `/sidebar/shadcn07` Shadcn07 reference composition (AppSidebar)

Layouts and Patterns
- AppShell (global): Sidebar‑07 + header + breadcrumbs + content area.
- Spaces Shell: 60/40 board (posts) + right Dock (Events, Tools, Resources).
- List Pages: cards in responsive grid; neutral surfaces; gold for CTAs only.
- Detail with Sheet: comments and lightweight actions in a sheet (SSR‑safe). Posts open via `?post=`; events open via `?event=`.
- Breadcrumbs: route‑derived; set `aria-current="page"` on active.

Entities and Data (fixtures)
- Space (id, name, summary, leaders, membership)
- Post (id, type, content, author, reactions)
- Event (id, title, date/time, RSVP state)
- Member (id, name, role, presence)
- Tool (id, name, status; leaders‑visible)
- Resource (id, title, link)

Leader Gating
- HiveLab nav item and tools are leader‑only in nav and Dock.
- In E2E, gating toggled via profile stub and `?leader=1` on demo routes.

Build Order (E2E‑first)
1) Shell & Navigation
   - `/sidebar/shadcn07` demo, global `AppShell` using Sidebar‑07
2) Discovery
   - `/spaces` recommended; fixtures + filters (search stub ok)
3) Space Home
   - `/spaces/[id]` board + Dock modules and breadcrumbs
4) Calendar
   - `/spaces/[id]/calendar` list + month
5) Members
   - `/spaces/[id]/members` online roster; member card states
6) About
   - `/spaces/[id]/about` rich text + links
7) Post Detail
   - `/spaces/[id]/post/[postId]` detail + comments sheet
8) Profile & Settings
   - `/profile`, `/settings` forms and toggles
9) HiveLab
   - `/hivelab`, `/lab/[spaceId]`, tool editor route
10) Polish
   - A11y passes, reduced‑motion, telemetry hooks (no‑op)

Verification (slice examples)
- Shell
  - Desktop: rail/expanded toggle, tooltips in collapsed; active item has `aria-current`.
  - Mobile: sidebar opens as sheet; trigger accessible via keyboard.
- Spaces Home
  - Dock renders Events, Tools (leader‑only), Resources; clicking widgets navigates to full views.
- Calendar
  - Month view shows next events; list view links to detail.
- Members
  - Roster shows presence and roles; keyboardable list.
- Post Detail
  - Comments sheet opens from board card; focus trapped; ESC closes.

Routes Map (summary)
- Entry: `/`, `/login`, `/onboarding`
- Global: `/feed`, `/profile`, `/settings`
- Spaces: `/spaces`, `/spaces/[id]`, `/spaces/[id]/about`, `/spaces/[id]/calendar`, `/spaces/[id]/members`, `/spaces/[id]/post/[postId]`
- HiveLab: `/hivelab`, `/lab/[spaceId]`, `/lab/[spaceId]/tools/[toolId]/edit`
- Shell Demos: `/sidebar/shadcn07`

Out of Scope (E2E)
- Admin/ops surfaces (lives under `apps/admin`).
- Real auth/storage/analytics; use in‑memory fixtures and stubs only.

How to Run
- Dev server: `pnpm dev:e2e`
- Shell demo: `/sidebar/shadcn07?variant=sidebar&collapsed=0`
- Spaces slice: `/spaces` → `/spaces/robotics-club`
