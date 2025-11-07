# Profile UI/UX Topology — Complete Build Checklist (Web)

North Star
- Elevate student identity and campus context while keeping privacy, safety, and performance as first-class concerns.

Scope
- Public profile view, own profile edit, settings/privacy, and related sheets/overlays.
- Surfaces prioritize Next.js App Router, SSR/ISR safety, and shared UI via `@hive/ui`.

---

## 0) System Architecture

Personas
- Viewer: Students viewing other students’ profiles
- Owner: Student viewing and editing their own profile
- Leader/Builder: Student leaders with HiveLab access surfaced in profile

Data Model (UI)
- Source: `packages/ui/src/atomic/organisms/profile-types.ts`
- Top-level keys: `identity`, `personal`, `academic`, `presence`, `connections`, `widgets`, `metadata`
- Transform: `specProfileToUIProfile` from `packages/ui/src/atomic/organisms/profile-widgets.ts`

Performance & A11y
- Skeleton within 120ms; route-level `loading.tsx` present
- p75 TTI ≤ 2.5s on profile entry; avoid layout thrash; reduced motion-safe
- Keyboard/tabbable controls; proper roles/aria on toggles and menus

Analytics (typed, no PII)
- `profile_view`, `profile_primary_cta`, `profile_privacy_toggled`, `profile_tile_interaction`

---

## 1) Surfaces (Pages)

### 1.1 Public Profile View (Other users)
- Route: `/profile/[id]`
  - Entry: `apps/web/src/app/profile/[id]/page.tsx`
  - Content: `apps/web/src/app/profile/[id]/ProfilePageContent.tsx`
- Template: `packages/ui/src/atomic/templates/profile-view-layout.tsx` (`ProfileViewLayout`)
- Organisms used:
  - Identity: `packages/ui/src/atomic/organisms/profile-identity-widget.tsx`
  - Activity: `packages/ui/src/atomic/organisms/profile-activity-widget.tsx`
  - Spaces: `packages/ui/src/atomic/organisms/profile-spaces-widget.tsx`
  - Connections: `packages/ui/src/atomic/organisms/profile-connections-widget.tsx`
  - Completion (own only): `packages/ui/src/atomic/organisms/profile-completion-card.tsx`
  - HiveLab (access surfacing): `packages/ui/src/atomic/organisms/hivelab-widget.tsx`
- Loading states
  - Route: `apps/web/src/app/profile/[id]/loading.tsx` (present)
  - Shared skeleton: `packages/ui/src/atomic/templates/profile-view-loading-skeleton.tsx`
  - Story: `packages/ui/src/stories/06-Pages/Profile/Profile.Loading.stories.tsx`
- Acceptance
  - S1 identity header with name, status, and UB context; S2 stats ribbon
  - S3 timeline and tiles; sheet-first navigation for details
  - Ghost mode redacts with clear copy; privacy levels respected for widgets
  - Analytics emitted on view and primary CTA

### 1.2 Own Profile Edit
- Route: `/profile/edit`
  - Page: `apps/web/src/app/profile/edit/page.tsx`
  - Uses `ProfileViewLayout` with `isOwnProfile={true}` and handlers
- Acceptance
  - Per-widget privacy controls (server-enforced updates)
  - Completion card drives next steps; CTAs route to relevant flows
  - Photo edit entry point (modal planned)
  - Loading and not-authenticated states covered

### 1.3 Settings & Privacy
- Route: `/profile/settings`
  - Page: `apps/web/src/app/profile/settings/page.tsx`
- Acceptance
  - Notification, privacy, account tabs mapped to tokens and patterns
  - Ghost mode settings; copy reflects campus safety model
  - CSRF on admin/protected actions; consistent error shapes

### 1.4 Profile Calendar (Personal)
- Route: `/profile/calendar`
  - Page: `apps/web/src/app/profile/calendar/page.tsx`
- Acceptance
  - Month/list toggle parity with space calendar patterns
  - Keyboard support; event detail opens as sheet

---

## 2) Components & Contracts

Templates
- `ProfileViewLayout`: page composition for identity/tiles; dark background parity
- `ProfileViewLoadingSkeleton`: mirrors layout for route-level skeletons

Organisms (Core)
- Identity, Activity, Spaces, Connections, Completion, HiveLab widgets (paths listed above)
- Types and props documented in `packages/ui/src/atomic/organisms/index.ts`

Shared Tokens & Utilities
- Tokens: `packages/tokens/src/*`; styles `packages/ui/src/styles.css`
- Motion: respect reduced motion; use `packages/ui/src/lib/motion`
- Utils: `cn` from `packages/ui/src/lib/utils`

Storybook Coverage
- Identity widget: `packages/ui/src/atomic/organisms/profile-identity-widget.stories.tsx`
- System samples: `packages/ui/src/stories/04-Organisms/ProfileSystem.stories.tsx`
- Loading: `packages/ui/src/stories/06-Pages/Profile/Profile.Loading.stories.tsx`

---

## 3) Build Tasks (Status)

Shipped
- Public view route and content component
- Edit profile page using `ProfileViewLayout`
- Loading skeleton (`/profile/[id]/loading.tsx`) and shared UI skeleton + story

Planned / Needs Build
- Tile-level skeletons for all profile organisms
- Recommendations panel (explainability + campus scoping)
- Privacy modal/controls polish; photo upload modal
- Analytics helper typings for profile events (`apps/web/src/lib/analytics/events.ts`)

Guardrails
- Fetch via secure helpers; cookies included; no localStorage tokens
- Admin/protected updates require CSRF header and rate limits
- Campus isolation enforced on queries and updates

---

## 4) Acceptance Criteria (Quick)
- A11y: tabbable, focus-visible, roles/aria; overlays focus-trap and return-focus
- Perf: skeleton <120ms; TTI ≤ 2.5s; dynamic import heavy branches
- UX: one primary CTA per tile; empty states actionable; sheet-first navigation
- Docs: Storybook parity; taxonomy and checklist updated on merge

References
- Layout guide: `docs/UX-UI-LAYOUT-GUIDE.md`
- Taxonomy: `docs/UX-UI-TAXONOMY.md`
- Checklist: `docs/UI-UX-CHECKLIST.md`
- Topology registry: `docs/FEATURE_TOPOLOGY_REGISTRY.md`
