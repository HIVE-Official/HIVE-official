Status: Draft
Owner: Design System Guild

# App Shell Integration — Web

This documents how the Web app composes the canonical app shell (Sidebar‑07) and how to verify it quickly.

Decision References
- Use shadcn Sidebar‑07 primitives as the canonical shell: docs/design/decisions/0001-app-shell-sidebar07.md
- Central nav config lives in `packages/ui/src/organisms/nav-config.ts`

Compose Points
- Root layout wraps the app with `Providers`, `EarlyAccessRibbon`, `AppShell`, and `Footer` (`apps/web/src/app/layout.tsx:1`).
- `AppShell` provides:
  - Sidebar‑07 with `AppSidebarHive` (nav items from nav-config, leader-gated for HiveLab)
  - Header with sidebar trigger, breadcrumbs, notifications, settings, profile menu
  - Page transition wrapper for route changes

Leader Gating (current posture)
- During onboarding: uses leadership draft (`OnboardingFlowProvider`) to show HiveLab for leaders.
- After onboarding: faculty/staff default to leader posture. Students hidden by default until governance/roles wire up.

Hide Global Chrome
- Hidden on landing (`/`), auth (`/login`), onboarding (`/onboarding/**`), and UI demo routes (`/ui/**`).

How to Verify (no server needed)
1) Landing chrome hidden
   - Visit `/` → expect no sidebar/header; Early Access ribbon and footer visible.
2) Global shell visible on app routes
   - Visit `/feed` or `/spaces` → expect sidebar on desktop, sheet on mobile; header with breadcrumbs; profile menu on right.
3) Active nav highlighting
   - Navigate to `/spaces` → sidebar “Spaces” is highlighted and `aria-current="page"` set.
4) Leader gating heuristic
   - Start onboarding (`/onboarding`) → toggle “I am a leader” and pick a space → visit `/hivelab` directly; HiveLab nav item appears once leader posture is set.
5) Profile menu
   - Open profile avatar (top-right) → see Profile, Settings (on mobile via menu), Sign out.

Notes
- Mobile uses the Sidebar‑07 sheet pattern (no bottom tab bar) per Decision 0001.
- When governance/role contracts are available, replace the leader heuristic in `apps/web/src/app/shell.tsx:1` with a true authorization check.

