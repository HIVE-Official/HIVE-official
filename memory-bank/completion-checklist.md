# Completion-First AI Development Checklist

A living list of every deliverable required to ship HIVE vBETA. Check a box **only after** the related code is merged to `staging`, CI passes, and proof is linked in the Evidence area.

> ### **Execution Protocol: AI/Human Collaborative Loop**
>
> This project follows a strict, dialogue-driven protocol for every task.
>
> 1.  **Task Selection (Human):** The human partner selects a single `TASK` from the checklist.
> 2.  **Implementation Proposal (AI):** The AI architect proposes a detailed implementation plan. This plan will explicitly reference components from our `@hive/ui` design system and outline all file modifications.
> 3.  **Discussion & Approval (Human):** The human partner reviews the plan, provides feedback, and gives explicit approval before any code is written.
> 4.  **Execution (AI):** The AI executes the approved plan precisely.
> 5.  **Evidence & Update (AI):** The AI provides verifiable proof of completion and updates the checklist.
>
> This ensures architectural alignment and adherence to the HIVE design system at every step.

---

## STEP 0 – Preparation Phase (Global)

### 0.1 Design System & Tokens

- [✅] Tailwind config with all tokens (colors, spacing, border, etc.)
- [✅] Typography scale (Space Grotesk, Geist Sans)
- [✅] Dark mode base + light gold accents
- [🟡] shadcn/ui component overrides where needed - _Configured, needs Storybook validation._
- [ ] **HT-DS-02:** Define final CSS for "subtle embossing" effect.

### 0.2 Data & Domain Base

- [ ] Base Prisma schemas: User, Space, Post, Tool, Event, Ritual, ProfileTile
- [ ] Cold-start seeding (admin user, system rituals, default spaces)
- [ ] ToolRunner primitive (stable before any Tool surface)
- [ ] Countdown / timer system (shared across Feed & Rituals)

### 0.3 Storybook Setup

- [ ] Storybook config (dark mode, Tailwind)
- [ ] Component folders per surface (/feed, /spaces, /profile, etc.)
- [ ] Loaders & motion previews

---

## PAGE 1 – /feed Surface – 100-Task Master Checklist

_All UI atoms & layouts pre‑built. This document lists **every granular development task and decision** required to fully ship the `/feed` surface at production quality, across all architectural layers.
Legend: `TASK` = to be executed by AI • `DECISION` = input required from human product owner._

> **Status Emoji Key**
> ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked (waiting on DECISION)

---

## 1. Foundation & Environment

| ID     | Type     | Status | Description                                                        | Blocks → |
| ------ | -------- | ------ | ------------------------------------------------------------------ | -------- |
| FND‑01 | TASK     | ✅     | Ensure required components compile (`TopStrip`, `PostTile`, etc.). | API‑03   |
| FND‑02 | TASK     | ✅     | Confirm Tailwind config exports design tokens used by Feed.        | —        |
| FND‑03 | TASK     | ✅     | Lint & Prettier rules aligned with repo standards.                 | —        |
| FND‑04 | DECISION | 🟥     | Choose Node‑version baseline (18 LTS vs 20).                       | DEV‑01   |
| FND‑05 | TASK     | ✅     | Add ESLint rule for unused imports (perf).                         | —        |
| FND‑06 | TASK     | ✅     | Storybook dark‑mode global decorator.                              | DOC‑02   |
| FND‑07 | TASK     | ✅     | Create CI job to fail build on missing export.                     | DEV‑03   |

---

## 2. Data Layer (Firestore)

| ID      | Type     | Status | Description                                                        | Blocks → |
| ------- | -------- | ------ | ------------------------------------------------------------------ | -------- |
| DATA‑01 | TASK     | ✅     | Validate `Post`, `Ritual`, `UserReadState` schema fields.          | API‑01   |
| DATA‑02 | TASK     | ✅     | Add composite index on `Post(spaceId, createdAt)`.                 | API‑02   |
| DATA‑03 | TASK     | ✅     | Seed script: 50 demo posts + 3 rituals.                            | QA‑01    |
| DATA‑04 | DECISION | ✅     | Decide retention policy – soft‑delete vs hard‑prune after 90 days? | OBS‑02   |
| DATA‑05 | TASK     | ✅     | Add `priorityScore` materialized column on `TopStripItem`.         | API‑01   |
| DATA‑06 | TASK     | ✅     | Write view `feed_minimal` for offline cache sync.                  | OFF‑01   |
| DATA‑07 | TASK     | ✅     | Add Firestore security rules draft (per‑space).                    | SEC‑01   |

---

## 3. Domain Logic & Services

| ID     | Type     | Status | Description                                             | Blocks → |
| ------ | -------- | ------ | ------------------------------------------------------- | -------- |
| DOM‑01 | TASK     | ✅     | Build `calculatePriorityScore()` util.                  | API‑01   |
| DOM‑02 | TASK     | ✅     | Implement `useInfiniteScroll()` hook.                   | UI‑02    |
| DOM‑03 | TASK     | ✅     | Global `useOnlineStatus()` (navigator listener).        | OFF‑01   |
| DOM‑04 | TASK     | ✅     | `useUnseenCountStore` – Zustand store w/ persistence.   | UI‑03    |
| DOM‑05 | DECISION | ✅     | Where to persist `lastSeenAt` – localstorage vs server? | UI‑03    |
| DOM‑06 | TASK     | ✅     | Write `useConfetti()` (canvas‑based) utility.           | UI‑04    |

---

## 4. API Layer (Firebase Functions)

| ID     | Type     | Status | Description                                                                | Blocks → |
| ------ | -------- | ------ | -------------------------------------------------------------------------- | -------- |
| API‑01 | TASK     | ✅     | Create `feed-getTopStrip` Firebase Function w/ Zod validation.             | UI‑01    |
| API‑02 | TASK     | ✅     | Create `feed-getMain` Firebase Function (cursor pagination).               | UI‑02    |
| API‑03 | TASK     | ✅     | Implement `newPost` trigger for unseen count (Firestore Trigger/Function). | UI‑03    |
| API‑04 | TASK     | ✅     | Create `ritual-join` Firebase Function mutation.                           | RT‑02    |
| API‑05 | DECISION | ✅     | Decide max socket payload batch size.                                      | RT‑01    |
| API‑06 | TASK     | ☐      | Add global error handler for Firebase Functions (maps errors).             | QA‑02    |
| API‑07 | TASK     | ☐      | Implement rate-limits on Functions via middleware (100 req / min).         | SEC‑02   |

---

## 5. UI Wiring & State

| ID    | Type | Status | Description                                        | Blocks → |
| ----- | ---- | ------ | -------------------------------------------------- | -------- |
| UI‑01 | TASK | ☐      | Wire `TopStrip` component with TRPC data.          | QA‑01    |
| UI‑02 | TASK | ☐      | Render PostTile list + infinite scroll.            | QA‑01    |
| UI‑03 | TASK | ☐      | NewContentToast wiring with unseen count.          | QA‑01    |
| UI‑04 | TASK | ☐      | ToolRunner modal blur backdrop + confetti trigger. | QA‑01    |
| UI‑05 | TASK | ☐      | Scroll‑to‑top smooth behavior (toast click).       | QA‑01    |
| UI‑06 | TASK | ☐      | Use suspense fallback with skeletons.              | PERF‑01  |

---

## 6. Realtime & Sockets

| ID    | Type     | Status | Description                                             | Blocks → |
| ----- | -------- | ------ | ------------------------------------------------------- | -------- |
| RT‑01 | TASK     | ☐      | Establish socket namespace (pending DECISION).          | UI‑03    |
| RT‑02 | TASK     | ☐      | Emit join/completion events for rituals.                | UI‑04    |
| RT‑03 | TASK     | ☐      | Throttled unseen count emitter (500 ms).                | UI‑03    |
| RT‑04 | DECISION | 🟥     | Choose auth handshake type (JWT param vs server emit).  | SEC‑03   |
| RT‑05 | TASK     | ☐      | Heartbeat ping every 15 s to keep mobile sockets alive. | PERF‑02  |
| RT‑06 | TASK     | ☐      | Handle reconnect – backfill missed events.              | OFF‑02   |

---

## 7. Offline & Resilience

| ID     | Type | Status | Description                                     | Blocks → |
| ------ | ---- | ------ | ----------------------------------------------- | -------- |
| OFF‑01 | TASK | ☐      | Write IndexedDB cache layer for `feed_minimal`. | OFF‑02   |
| OFF‑02 | TASK | ☐      | On reconnect, diff cached posts vs server.      | UI‑03    |
| OFF‑03 | TASK | ☐      | Show offline ErrorBanner with copy.             | QA‑01    |

---

## 8. Edge‑Cases, Accessibility & UX Copy

| ID    | Type     | Status | Description                                   | Blocks → |
| ----- | -------- | ------ | --------------------------------------------- | -------- |
| UX‑01 | TASK     | ☐      | Empty TopStrip placeholder witty copy.        | QA‑02    |
| UX‑02 | TASK     | ☐      | ARIA labels on TopStrip scroll buttons.       | QA‑02    |
| UX‑03 | DECISION | 🟥     | Max char count PostTile preview (220 vs 280). | UI‑02    |
| UX‑04 | TASK     | ☐      | Ensure focus rings meet WCAG AA.              | QA‑02    |
| UX‑05 | TASK     | ☐      | Confetti reduced‑motion support.              | QA‑02    |

---

## 9. Performance Optimization

| ID      | Type | Status | Description                               | Blocks → |
| ------- | ---- | ------ | ----------------------------------------- | -------- |
| PERF‑01 | TASK | ☐      | Lazy‑load images ≥ 2 screen heights away. | QA‑02    |
| PERF‑02 | TASK | ☐      | Socket heartbeat throttling logic.        | RT‑05    |
| PERF‑03 | TASK | ☐      | Bundle‑analysis CI gate (<300 kB JS).     | DEV‑03   |
| PERF‑04 | TASK | ☐      | Memoize PostTile where unchanged.         | QA‑02    |

---

## 10. Security & Compliance

| ID     | Type     | Status | Description                                   | Blocks → |
| ------ | -------- | ------ | --------------------------------------------- | -------- |
| SEC‑01 | TASK     | ☐      | Row‑level security policies on Postgres.      | API‑01   |
| SEC‑02 | TASK     | ☐      | tRPC rate‑limit middleware (100 req/min).     | API‑07   |
| SEC‑03 | TASK     | ☐      | Implement chosen socket auth method.          | RT‑04    |
| SEC‑04 | DECISION | 🟥     | Decide CORS policy for public feed endpoints. | DEV‑02   |

---

## 11. Observability & Analytics

| ID     | Type     | Status | Description                                      | Blocks → |
| ------ | -------- | ------ | ------------------------------------------------ | -------- |
| OBS‑01 | TASK     | ☐      | Add Sentry error boundary around FeedPage.       | QA‑02    |
| OBS‑02 | TASK     | ☐      | Log unseen‑count metric to analytics.            | DATA‑04  |
| OBS‑03 | TASK     | ☐      | Instrument perf marks (LCP, CLS) via web‑vitals. | PERF‑01  |
| OBS‑04 | DECISION | 🟥     | Select analytics provider (PostHog vs Splitbee). | DEV‑02   |

---

## 12. Testing & QA

| ID    | Type | Status | Description                                   | Blocks → |
| ----- | ---- | ------ | --------------------------------------------- | -------- |
| QA‑01 | TASK | ☐      | Unit tests: hooks + utils.                    | —        |
| QA‑02 | TASK | ☐      | Integration tests: Post flow, toast, offline. | —        |
| QA‑03 | TASK | ☐      | Accessibility audits via Axe‑core CI.         | —        |

---

## 13. DevOps & CI/CD

| ID     | Type | Status | Description                                                   | Blocks → |
| ------ | ---- | ------ | ------------------------------------------------------------- | -------- |
| DEV‑01 | TASK | ☐      | Update CI image with chosen Node version.                     | FND‑04   |
| DEV‑02 | TASK | ☐      | Set CORS & analytics provider env vars.                       | SEC‑04   |
| DEV‑03 | TASK | ☐      | Add CI steps: lint, type‑check, bundle‑size, Storybook build. | PERF‑03  |

---

## 14. Documentation & Storybook

| ID     | Type | Status | Description                                                   | Blocks → |
| ------ | ---- | ------ | ------------------------------------------------------------- | -------- |
| DOC‑01 | TASK | ☐      | Write ADR for socket namespace decision.                      | RT‑01    |
| DOC‑02 | TASK | ☐      | Storybook stories for all Feed components in real data state. | QA‑02    |
| DOC‑03 | TASK | ☐      | Update README with Feed env setup.                            | DEV‑01   |

---

## 15. Release & Rollback Strategy

| ID     | Type     | Status | Description                                                 | Blocks → |
| ------ | -------- | ------ | ----------------------------------------------------------- | -------- |
| REL‑01 | TASK     | ☐      | Canary deployment for Feed rewrite.                         | QA‑03    |
| REL‑02 | TASK     | ☐      | Rollback script to restore previous Feed schema.            | REL‑01   |
| REL‑03 | DECISION | 🟥     | Define success KPIs for canary (error < 0.5%, LCP < 2.5 s). | REL‑01   |

---

### ⚠️ Open Decisions (12)

FND‑04 • DATA‑04 • DOM‑05 • API‑05 • RT‑04 • SEC‑04 • OBS‑04 • UX‑03 • FEED‑BOOT‑02 • FEED‑DATA‑03 • FEED‑DATA‑05 • FEED‑WIRE‑03 • REL‑03

Each decision must cite at least one Brand & UX principle when resolved.

---

This checklist now enumerates **100 explicit items** (88 TASKs, 12 DECISIONs). Execution proceeds layer‑by‑layer once corresponding decisions are answered.

---

## PAGE 2 – /spaces/:slug Surface – Full Task Checklist

_All UI atoms & layouts pre‑built. This document covers every architectural layer (foundation → observability) for /:school/spaces/:slug page and its child modals, with a hard cap of 100 total checklist rows (currently 35/100). Brand principles identical to Feed._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – TASK (AI executes) / DECISION (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that cannot start until this item is ✅
> **Owner** – AI or Human
> **Sub‑Tasks** – concrete work steps AI will ship in one PR

---

**🌟 Brand & UX Decision Framework (inherits from /feed)**

1. **Student‑First Utility**
2. **Rebellious Elegance**
3. **Single‑Surface Clarity**
4. **Motion With Meaning**
5. **Performance ≥ Aesthetic**

_All DECISION answers must cite at least one principle._

---

### 1️⃣ Foundation & Environment (IDs SPACES‑BOOT‑xx)

| ID             | Type     | Status | Description                                                                                                                                   | Sub‑Tasks                                                 | Blocks →        | Owner |
| :------------- | :------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :-------------- | :---- |
| SPACES‑BOOT‑01 | TASK     | ☐      | Component import integrity for Spaces page atoms (SpaceHeader, JoinButton, PostComposerModal, EventsSidebar, ChatToolSlot, EmptyState, etc.). | • Static import compile test.<br/>• Storybook smoke run.  | SPACES‑DATA‑01+ | AI    |
| SPACES‑BOOT‑02 | TASK     | ☐      | Feature flag scaffold for Chat & Events Tools (system‑locked).                                                                                | • Next.js middleware check.<br/>• LaunchDarkly flag read. | SPACES‑WIRE‑02  | AI    |
| SPACES‑BOOT‑03 | DECISION | 🟥     | URL Pattern – /:school/spaces/:slug vs nested id (/spaces/:spaceId).                                                                          | —                                                         | SPACES‑DATA‑01  | Human |
| SPACES‑BOOT‑04 | DECISION | 🟥     | SSR vs CSR – pre‑render Space shell or hydrate entirely client‑side?                                                                          | —                                                         | SPACES‑WIRE‑01  | Human |

---

### 2️⃣ Data Contracts & Persistence (IDs SPACES‑DATA‑xx)

| ID             | Type     | Status | Description                                                   | Sub‑Tasks                                                                | Blocks →        | Owner |
| :------------- | :------- | :----- | :------------------------------------------------------------ | :----------------------------------------------------------------------- | :-------------- | :---- |
| SPACES‑DATA‑01 | TASK     | ☐      | spaces.detail.query RPC to fetch header + membership status.  | • Zod schemas.<br/>• Prisma join (Space, Membership).                    | SPACES‑WIRE‑01  | AI    |
| SPACES‑DATA‑02 | TASK     | ☐      | spaces.posts.query cursor pagination.                         | • Cursor util.<br/>• Composite index Post(spaceId, createdAt).           | SPACES‑WIRE‑03  | AI    |
| SPACES‑DATA‑03 | TASK     | ☐      | spaces.events.query list upcoming events within 30 days.      | • Date filter.<br/>• Join Event table.                                   | SPACES‑WIRE‑04  | AI    |
| SPACES‑DATA‑04 | TASK     | ☐      | spaces.chat.messages.query (paginate last 50).                | • Ordered by createdAt desc.<br/>• Socket channel id spec.               | SPACES‑SOCK‑02  | AI    |
| SPACES‑DATA‑05 | DECISION | 🟥     | Default post page size – 15 vs 25?                            | —                                                                        | SPACES‑DATA‑02  | Human |
| SPACES‑DATA‑06 | TASK     | ☐      | Membership mutation spaces.join.mutate & spaces.leave.mutate. | • Cascade permission checks.<br/>• Trigger welcome ritual if first join. | SPACES‑SOCK‑01  | AI    |
| SPACES‑DATA‑07 | TASK     | ☐      | Space role upsert mutation (admin, mod).                      | • ACL enum.<br/>• Audit log entry.                                       | SPACES‑ADMIN‑02 | AI    |

---

### 3️⃣ Page Wiring & Local State (IDs SPACES‑WIRE‑xx)

| ID             | Type     | Status | Description                                            | Sub‑Tasks                                                                             | Blocks →        | Owner |
| :------------- | :------- | :----- | :----------------------------------------------------- | :------------------------------------------------------------------------------------ | :-------------- | :---- |
| SPACES‑WIRE‑01 | TASK     | ☐      | Hydrate Space header + membership status.              | • React Query hook.<br/>• Fallback skeletons.<br/>• Join button states.               | SPACES‑EDGE‑01  | AI    |
| SPACES‑WIRE‑02 | TASK     | ☐      | Lock Chat & Events tools (system only).                | • Read flags.<br/>• Render disabled state if inactive.                                | SPACES‑EDGE‑02  | AI    |
| SPACES‑WIRE‑03 | TASK     | ☐      | Post list infinite scroll.                             | • useInfiniteScroll 70 %.<br/>• Compose PostTile.<br/>• Sync with global /feed cache. | SPACES‑LIKE‑01  | AI    |
| SPACES‑WIRE‑04 | TASK     | ☐      | Events sidebar list + RSVP button.                     | • Collapse on mobile.<br/>• Count badge.                                              | SPACES‑EDGE‑03  | AI    |
| SPACES‑WIRE‑05 | TASK     | ☐      | PostComposer modal launch & submission.                | • Zod validation.<br/>• Auto‑scroll to new post on success.                           | SPACES‑EDGE‑04  | AI    |
| SPACES‑WIRE‑06 | DECISION | 🟥     | Post composer placement – modal vs inline top of list? | —                                                                                     | SPACES‑WIRE‑05  | Human |
| SPACES‑WIRE‑07 | TASK     | ☐      | Membership role context provider.                      | • Provide isAdmin, isMod.                                                             | SPACES‑ADMIN‑01 | AI    |

---

### 4️⃣ Realtime & Socket Channels (IDs SPACES‑SOCK‑xx)

| ID             | Type     | Status | Description                                           | Sub‑Tasks                                                    | Blocks →       | Owner |
| :------------- | :------- | :----- | :---------------------------------------------------- | :----------------------------------------------------------- | :------------- | :---- |
| SPACES‑SOCK‑01 | TASK     | ☐      | Listen for join/leave events to update header counts. | • Channel space/{spaceId}.<br/>• Optimistic UI.              | SPACES‑UX‑01   | AI    |
| SPACES‑SOCK‑02 | TASK     | ☐      | Chat realtime message stream.                         | • WebSocket subscribe.<br/>• Local message buffer (100 max). | SPACES‑EDGE‑05 | AI    |
| SPACES‑SOCK‑03 | DECISION | 🟥     | Typing indicator – implement or defer?                | —                                                            | SPACES‑SOCK‑02 | Human |

---

### 5️⃣ Edge‑Cases & UX Rules (IDs SPACES‑EDGE‑xx)

| ID             | Type | Status | Description                                | Sub‑Tasks                                          | Blocks →     | Owner |
| :------------- | :--- | :----- | :----------------------------------------- | :------------------------------------------------- | :----------- | :---- |
| SPACES‑EDGE‑01 | TASK | ☐      | Private space access handling.             | • 403 page vs request invite CTA.                  | SPACES‑QA‑01 | AI    |
| SPACES‑EDGE‑02 | TASK | ☐      | Tool inactive (Chat off) empty state copy. | • "Chat opens soon – stay tuned." rebellious tone. | SPACES‑QA‑01 | AI    |
| SPACES‑EDGE‑03 | TASK | ☐      | No upcoming events state.                  | • Inline copy.                                     | SPACES‑QA‑01 | AI    |
| SPACES‑EDGE‑04 | TASK | ☐      | Post composer submission error.            | • Inline toast.<br/>• Retry link.                  | SPACES‑QA‑01 | AI    |
| SPACES‑EDGE‑05 | TASK | ☐      | Chat offline detection fallback.           | • Show last synced timestamp.                      | SPACES‑QA‑01 | AI    |

---

### 6️⃣ UX Micro‑Interactions (IDs SPACES‑UX‑xx)

| ID           | Type | Status | Description                                 | Sub‑Tasks                                             | Blocks →     | Owner |
| :----------- | :--- | :----- | :------------------------------------------ | :---------------------------------------------------- | :----------- | :---- |
| SPACES‑UX‑01 | TASK | ☐      | Join/Leave button animation (scale‑bounce). | • Framer Motion config.<br/>• Confetti if first join. | SPACES‑QA‑01 | AI    |
| SPACES‑UX‑02 | TASK | ☐      | Events RSVP state transition.               | • Tick icon morph.<br/>• Undo option 5 s.             | SPACES‑QA‑01 | AI    |
| SPACES‑UX‑03 | TASK | ☐      | Chat message send feedback (flash).         | • Fade in.                                            | SPACES‑QA‑01 | AI    |

---

### 7️⃣ Admin & Moderation (IDs SPACES‑ADMIN‑xx)

| ID              | Type     | Status | Description                               | Sub‑Tasks                                                               | Blocks →        | Owner |
| :-------------- | :------- | :----- | :---------------------------------------- | :---------------------------------------------------------------------- | :-------------- | :---- |
| SPACES‑ADMIN‑01 | TASK     | ☐      | Space settings modal (admins only).       | • Name/desc edit.<br/>• Avatar upload.<br/>• Danger zone: delete space. | SPACES‑QA‑01    | AI    |
| SPACES‑ADMIN‑02 | TASK     | ☐      | Role management panel.                    | • Promote/demote.<br/>• Kick member mutation.                           | SPACES‑QA‑01    | AI    |
| SPACES‑ADMIN‑03 | DECISION | 🟥     | Max members before pagination – 1k vs 5k? | —                                                                       | SPACES‑ADMIN‑02 | Human |

---

### 8️⃣ Quality, Metrics & Observability (IDs SPACES‑QA/PERF‑xx)

| ID             | Type | Status | Description                 | Sub‑Tasks                                                                                              | Blocks →       | Owner |
| :------------- | :--- | :----- | :-------------------------- | :----------------------------------------------------------------------------------------------------- | :------------- | :---- |
| SPACES‑QA‑01   | TASK | ☐      | Automated tests.            | • Vitest RPC & utils.<br/>• Playwright flows: join, post, chat, RSVP.<br/>• Snapshot for empty states. | SPACES‑PERF‑01 | AI    |
| SPACES‑PERF‑01 | TASK | ☐      | Performance & a11y budgets. | • Lighthouse mobile ≥ 88.<br/>• Axe‑core ≥ 95.                                                         | —              | AI    |

---

## PAGE 3 – /profile Surface – Full Task & Sub-Task Checklist (≤ 100 items)

_Authority doc for AI execution. **UI primitives & layouts already exist.** This checklist spans every architectural layer (foundation → observability) for `/profile` (personal identity grid) and its editing modals. Brand & UX principles identical to Feed._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that can't start until this item is ✅
> **Owner** – AI or Human
> **Sub‑Tasks** – concrete work steps AI will ship in one PR

---

## 🌟 Brand & UX Decision Framework

_Same principles as Feed: Student‑First Utility, Rebellious Elegance, Single‑Surface Clarity, Motion With Meaning, Performance ≥ Aesthetic._

---

### 1️⃣ Foundation (6 items)

| ID           | Type     | Status | Description                                                      | Sub‑Tasks                                                                                                                                          | Blocks →      | Owner |
| ------------ | -------- | ------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----- |
| PROF‑BOOT‑01 | TASK     | ☐      | Component import integrity check.                                | • Static import test for `ProfileHeader`, `ProfileTileGrid`, `TileEditorModal`, `CalendarTile`, `BadgeTile`, `ErrorBanner`, `SkeletonPlaceholder`. | PROF‑DATA‑01+ | AI    |
| PROF‑BOOT‑02 | DECISION | 🟥     | Profile route pattern: `/u/:handle` vs `/profile`.               | —                                                                                                                                                  | PROF‑WIRE‑01  | Human |
| PROF‑BOOT‑03 | TASK     | ☐      | Storybook smoke for profile components.                          | • Auto snapshot diff.                                                                                                                              | —             | AI    |
| PROF‑BOOT‑04 | DECISION | 🟥     | Max tile grid columns mobile vs desktop? (4 vs 6).               | —                                                                                                                                                  | PROF‑UX‑02    | Human |
| PROF‑BOOT‑05 | TASK     | ☐      | Tailwind config check for grid utilities.                        | • Ensure `grid-cols-12` etc.                                                                                                                       | —             | AI    |
| PROF‑BOOT‑06 | TASK     | ☐      | Verify motion hooks (`useDrag`, `useDrop`, `useConfetti`) exist. | —                                                                                                                                                  | PROF‑UX‑03    | AI    |

### 2️⃣ Data Contracts & Persistence (12 items)

| ID           | Type     | Status | Description                                           | Sub‑Tasks                                                  | Blocks →     | Owner |
| ------------ | -------- | ------ | :---------------------------------------------------- | ---------------------------------------------------------- | ------------ | :---- |
| PROF‑DATA‑01 | TASK     | ☐      | Add `ProfileTile` model relations in Prisma.          | • `userId`, `type`, `config`, `order`, `size`.             | PROF‑DATA‑03 | AI    |
| PROF‑DATA‑02 | TASK     | ☐      | Migration for existing users → seed default tiles.    | —                                                          | PROF‑WIRE‑01 | AI    |
| PROF‑DATA‑03 | TASK     | ☐      | Implement `profile.tiles.query`.                      | • Input `{ userId }`.<br>• Output `ProfileTile[]` ordered. | PROF‑WIRE‑01 | AI    |
| PROF‑DATA‑04 | TASK     | ☐      | Implement `profile.tiles.updateOrder.mutate`.         | • Drag‑reorder array.<br>• Write transactional update.     | PROF‑UX‑03   | AI    |
| PROF‑DATA‑05 | TASK     | ☐      | Implement `profile.tiles.add.mutate`.                 | • Add new tile type.                                       | PROF‑UX‑02   | AI    |
| PROF‑DATA‑06 | TASK     | ☐      | Implement `profile.tiles.remove.mutate`.              | • Soft delete.                                             | PROF‑UX‑03   | AI    |
| PROF‑DATA‑07 | DECISION | 🟥     | Config format for tile JSON vs separate columns.      | —                                                          | PROF‑DATA‑01 | Human |
| PROF‑DATA‑08 | TASK     | ☐      | Calendar events query `profile.calendar.query`.       | • Merge personal + space events.                           | PROF‑WIRE‑02 | AI    |
| PROF‑DATA‑09 | TASK     | ☐      | Badge info query `profile.badges.query`.              | —                                                          | PROF‑WIRE‑03 | AI    |
| PROF‑DATA‑10 | TASK     | ☐      | Decide & add composite index on `ProfileTile(order)`. | —                                                          | PROF‑PERF‑01 | AI    |
| PROF‑DATA‑11 | TASK     | ☐      | Create tRPC hooks for queries/mutations.              | —                                                          | PROF‑WIRE‑01 | AI    |
| PROF‑DATA‑12 | DECISION | 🟥     | Max tile count per user (12 vs 18).                   | —                                                          | PROF‑DATA‑05 | Human |

### 3️⃣ Page Wiring & State (12 items)

| ID           | Type     | Status | Description                                           | Sub‑Tasks                                                                           | Blocks →     | Owner |
| ------------ | -------- | ------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------ | ----- |
| PROF‑WIRE‑01 | TASK     | ☐      | Hydrate `/profile` route with data hooks.             | • Mount header + grid.<br>• React Query for tiles.<br>• Render each tile component. | PROF‑EDGE‑01 | AI    |
| PROF‑WIRE‑02 | TASK     | ☐      | CalendarTile wiring.                                  | • Lazy load week view.<br>• Click → open full calendar modal.                       | PROF‑EDGE‑02 | AI    |
| PROF‑WIRE‑03 | TASK     | ☐      | BadgeTiles wiring.                                    | • Show academic & residential badges.<br>• Hover → tooltip info.                    | PROF‑EDGE‑02 | AI    |
| PROF‑WIRE‑04 | TASK     | ☐      | Drag‑n‑drop grid logic.                               | • `react‑beautiful‑dnd` hooks.<br>• Persist order via `updateOrder`.                | PROF‑UX‑03   | AI    |
| PROF‑WIRE‑05 | TASK     | ☐      | TileEditorModal state.                                | • Add / remove tiles.<br>• Validate tile count vs limit.                            | PROF‑EDGE‑02 | AI    |
| PROF‑WIRE‑06 | DECISION | 🟥     | Save order on every drag vs on explicit "Done" press. | —                                                                                   | PROF‑WIRE‑04 | Human |
| PROF‑WIRE‑07 | TASK     | ☐      | Smooth tile resize animation.                         | —                                                                                   | PROF‑PERF‑01 | AI    |
| PROF‑WIRE‑08 | DECISION | 🟥     | Provide "Share profile link" CTA?                     | —                                                                                   | PROF‑UX‑04   | Human |
| PROF‑WIRE‑09 | TASK     | ☐      | Tooltip copy rebellious tone.                         | —                                                                                   | PROF‑QA‑01   | AI    |
| PROF‑WIRE‑10 | TASK     | ☐      | Update document title with handle.                    | —                                                                                   | PROF‑PERF‑01 | AI    |
| PROF‑WIRE‑11 | TASK     | ☐      | Scroll restore on back nav.                           | —                                                                                   | PROF‑QA‑01   | AI    |
| PROF‑WIRE‑12 | TASK     | ☐      | Mobile pinch‑zoom disabled during edit mode.          | —                                                                                   | PROF‑QA‑01   | AI    |

### 4️⃣ Realtime / Sockets (6 items)

| ID           | Type     | Status | Description                                              | Sub‑Tasks                                                    | Blocks →     | Owner |
| :----------- | :------- | :----- | :------------------------------------------------------- | :----------------------------------------------------------- | :----------- | :---- |
| PROF‑SOCK‑01 | TASK     | ☐      | Live tile updates when profile viewed in background tab. | • Subscribe to `profile/{userId}`.<br>• Merge changed tiles. | PROF‑UX‑04   | AI    |
| PROF‑SOCK‑02 | DECISION | 🟥     | Push-only vs push+pull reconciliation strategy.          | —                                                            | PROF‑SOCK‑01 | Human |
| PROF‑SOCK‑03 | TASK     | ☐      | Broadcast tile reorder to sockets.                       | —                                                            | PROF‑UX‑03   | AI    |
| PROF‑SOCK‑04 | TASK     | ☐      | Debounce reorder emits (250 ms).                         | —                                                            | PROF‑PERF‑01 | AI    |
| PROF‑SOCK‑05 | TASK     | ☐      | Sync calendar event changes.                             | —                                                            | PROF‑UX‑02   | AI    |
| PROF‑SOCK‑06 | DECISION | 🟥     | Auth method reuse from Feed sockets?                     | —                                                            | PROF‑SOCK‑01 | Human |

### 5️⃣ Edge‑Cases & UX Rules (10 items)

| ID           | Type     | Status | Description                               | Sub‑Tasks                                                     | Blocks →     | Owner |
| :----------- | :------- | :----- | :---------------------------------------- | :------------------------------------------------------------ | :----------- | :---- |
| PROF‑EDGE‑01 | TASK     | ☐      | Empty profile onboarding UX.              | • Show 3 placeholder tiles.<br>• CTA: "Drop your first tile". | PROF‑QA‑01   | AI    |
| PROF‑EDGE‑02 | TASK     | ☐      | Max tiles reached error flow.             | • Toast error.<br>• Shake animation on Add button.            | PROF‑QA‑01   | AI    |
| PROF‑EDGE‑03 | TASK     | ☐      | Offline edits queue.                      | • Local draft of tile order.<br>• Sync when online.           | PROF‑QA‑01   | AI    |
| PROF‑EDGE‑04 | TASK     | ☐      | Handle removed tile type (deprecated).    | • Hide but preserve order.                                    | PROF‑QA‑01   | AI    |
| PROF‑EDGE‑05 | DECISION | 🟥     | Copy for offline mode message.            | —                                                             | PROF‑QA‑01   | Human |
| PROF‑EDGE‑06 | TASK     | ☐      | Accessibility: drag handles for keyboard. | —                                                             | PROF‑PERF‑01 | AI    |
| PROF‑EDGE‑07 | TASK     | ☐      | Low‑vision contrast check on badges.      | —                                                             | PROF‑PERF‑01 | AI    |
| PROF‑EDGE‑08 | TASK     | ☐      | Skeleton loaders for calendar.            | —                                                             | PROF‑PERF‑01 | AI    |
| PROF‑EDGE‑09 | TASK     | ☐      | Tooltip placement collision detection.    | —                                                             | PROF‑QA‑01   | AI    |
| PROF‑EDGE‑10 | TASK     | ☐      | Blurred background when TileEditor open.  | —                                                             | PROF‑PERF‑01 | AI    |

### 6️⃣ Quality & Metrics (8 items)

| ID           | Type     | Status | Description                                              | Sub‑Tasks                                                                                | Blocks →     | Owner |
| :----------- | :------- | :----- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :----------- | :---- |
| PROF‑QA‑01   | TASK     | ☐      | Automated tests.                                         | • Vitest unit tests for mutations.<br>• Playwright drag‑drop, add/remove, offline queue. | PROF‑PERF‑01 | AI    |
| PROF‑QA‑02   | TASK     | ☐      | Snapshot diff for default & editing modes.               | —                                                                                        | PROF‑PERF‑01 | AI    |
| PROF‑QA‑03   | TASK     | ☐      | Tooltip a11y tests (axe‑core).                           | —                                                                                        | PROF‑PERF‑01 | AI    |
| PROF‑PERF‑01 | TASK     | ☐      | Performance & a11y budgets.                              | • Lighthouse mobile ≥ 90.<br>• Axe‑core ≥ 95.<br>• Fail build if regress.                | —            | AI    |
| PROF‑OBS‑01  | TASK     | ☐      | Add Sentry breadcrumbs on tile actions.                  | —                                                                                        | PROF‑QA‑01   | AI    |
| PROF‑OBS‑02  | TASK     | ☐      | Add analytics event "profile_tile_added".                | —                                                                                        | PROF‑QA‑01   | AI    |
| PROF‑OBS‑03  | TASK     | ☐      | Bundle size check stays < 200 KB per route.              | —                                                                                        | PROF‑PERF‑01 | AI    |
| PROF‑OBS‑04  | DECISION | 🟥     | Metric to track: time‑to‑first‑tile or daily tile edits? | —                                                                                        | PROF‑OBS‑02  | Human |

---

### ✅ Item Count: 54 / 100 (Cap respected)

### 🔍 Pending Human Decisions

Please refer to all **🟥 DECISION** rows (currently 13) and provide options + rationale (cite Brand & UX principles).

Once DECISION rows are resolved, AI will execute TASKs in order (Foundation → Data → Wiring → Sockets → Edge‑Cases → Quality).

---

## Utility & Admin Surfaces – Full Task & Sub-Task Checklist

_Authority doc for AI execution. UI primitives & layouts already exist. This single checklist now covers all remaining platform pages beyond Feed, Spaces, Profile, and Auth/Onboarding._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that cannot start until prerequisite is ✅
> **Owner** – AI or Human
> **Note** – Each surface section is capped at ≤ 100 checklist rows.

---

### 0. Global Foundation Tasks (shared across all utility/admin pages)

| ID           | Type     | Description                                                                                                                                      | Blocks →      | Owner | Status |
| :----------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :---- | :----- |
| GLOB‑BOOT‑01 | TASK     | Verify component library contains AdminLayout, SettingsLayout, MarkdownPage, ErrorIllustration, MaintenanceBanner                                | ALL           | AI    | ☐      |
| GLOB‑BOOT‑02 | DECISION | Select error reporting provider (Sentry vs Honeybadger) for utility pages                                                                        | GLOB‑OBS‑01   | Human | 🟥     |
| GLOB‑ARCH‑01 | DECISION | **Define system‑wide page transition animation.** Should it be a subtle cross-fade, a vertical slide, or none? Principle: _Motion With Meaning_. | ALL           | Human | 🟥     |
| GLOB‑ARCH‑02 | TASK     | **Design and build a consistent set of app state components:** `LoadingState` (skeletons), `EmptyState`, `ErrorState`.                           | ALL           | AI    | ✅     |
| GLOB‑ARCH‑03 | TASK     | Build universal `MarkdownPage` component for rendering legal docs, guides, etc.                                                                  | ALL           | AI    | ✅     |
| GLOB‑SEC‑01  | TASK     | Add role‑based route protections (admin, staff)                                                                                                  | ADMIN‑WIRE‑01 | AI    | ☐      |
| GLOB‑OBS‑01  | TASK     | Set up error reporting provider.                                                                                                                 | GLOB‑BOOT‑02  | AI    | ☐      |

---

### 1. /admin Dashboard (management & moderation)

| ID            | Type     | Description                                           | Blocks →      | Owner | Status |
| :------------ | :------- | :---------------------------------------------------- | :------------ | :---- | :----- |
| ADMIN‑BOOT‑01 | TASK     | Scaffold Next.js route /admin behind admin role guard | ADMIN‑DATA‑01 | AI    | ☐      |
| ADMIN‑DATA‑01 | TASK     | tRPC admin.metrics.query (daily active, post volume)  | ADMIN‑UI‑01   | AI    | ☐      |
| ADMIN‑DATA‑02 | TASK     | tRPC admin.users.search w/ pagination & filters       | ADMIN‑UI‑02   | AI    | ☐      |
| ADMIN‑DEC‑01  | DECISION | Moderation action policy (soft‑delete vs hard)        | ADMIN‑DATA‑03 | Human | 🟥     |
| ADMIN‑DATA‑03 | TASK     | admin.posts.moderate.mutate (soft‑delete)             | ADMIN‑UI‑03   | AI    | ☐      |
| ADMIN‑UI‑01   | TASK     | Metrics cards (DAU, new posts, new users)             | —             | AI    | ☐      |
| ADMIN‑UI‑02   | TASK     | User table with role badges, search & sort            | —             | AI    | ☐      |
| ADMIN‑UI‑03   | TASK     | Post moderation drawer (reason, confirm)              | —             | AI    | ☐      |
| ADMIN‑EDGE‑01 | TASK     | Empty‑state graphics when no search results           | —             | AI    | ☐      |
| ADMIN‑QA‑01   | TASK     | Playwright tests for role guard 403 & moderation flow | —             | AI    | ☐      |
| ADMIN‑PERF‑01 | TASK     | Dashboard Lighthouse ≥ 90                             | —             | AI    | ☐      |

_Total Admin tasks: 15/100_

---

### 2. /settings (user preferences & account)

| ID          | Type     | Description                                            | Blocks →    | Owner | Status |
| :---------- | :------- | :----------------------------------------------------- | :---------- | :---- | :----- |
| SET‑BOOT‑01 | TASK     | Scaffold /settings route nested inside /profile layout | SET‑DATA‑01 | AI    | ☐      |
| SET‑DATA‑01 | TASK     | tRPC settings.profile.update (name, handle, PFP)       | SET‑UI‑01   | AI    | ☐      |
| SET‑DATA‑02 | TASK     | tRPC settings.notifications.update (push, email)       | SET‑UI‑02   | AI    | ☐      |
| SET‑DATA‑03 | TASK     | tRPC settings.privacy.update (profile visibility)      | SET‑UI‑02   | AI    | ☐      |
| SET‑DEC‑01  | DECISION | Passwordless auth toggle exposed to students?          | SET‑UI‑03   | Human | 🟥     |
| SET‑UI‑01   | TASK     | Profile section form (zod‑validated)                   | —           | AI    | ☐      |
| SET‑UI‑02   | TASK     | Notification toggle list (switch components)           | —           | AI    | ☐      |
| SET‑UI‑03   | TASK     | Security section (sessions list + revoke)              | —           | AI    | ☐      |
| SET‑EDGE‑01 | TASK     | Unsaved changes prompt on navigation                   | —           | AI    | ☐      |
| SET‑QA‑01   | TASK     | Vitest unit tests for zod schemas                      | —           | AI    | ☐      |

_Total Settings tasks: 12/100_

---

#### 2.1 Settings - Account & Danger Zone

| ID            | Type     | Description                                                                        | Blocks →      | Owner | Status |
| :------------ | :------- | :--------------------------------------------------------------------------------- | :------------ | :---- | :----- |
| SET‑DANGER‑D1 | DECISION | **Account Deletion Policy:** Soft delete with 30-day grace period, or hard delete? | SET‑DANGER‑T1 | Human | 🟥     |
| SET‑DANGER‑T1 | TASK     | Implement user-facing "Delete Account" flow in a "Danger Zone" section.            | SET‑DANGER‑T2 | AI    | ☐      |
| SET‑DANGER‑T2 | TASK     | Build multi-step confirmation modal for deletion (type handle to confirm).         | SET‑DANGER‑T3 | AI    | ☐      |
| SET‑DANGER‑T3 | TASK     | Implement backend logic for chosen deletion policy.                                | —             | AI    | ☐      |
| SET‑DANGER‑T4 | TASK     | Implement "Change Email" flow with verification for the new email address.         | —             | AI    | ☐      |

---

### 3. /404 & /legal (static markdown pages)

| ID          | Type     | Description                                                  | Blocks →    | Owner | Status |
| :---------- | :------- | :----------------------------------------------------------- | :---------- | :---- | :----- |
| LEG‑BOOT‑01 | TASK     | Dynamic MDX loader for /privacy, /tos, /community‑guidelines | LEG‑UI‑01   | AI    | ☐      |
| LEG‑DATA‑01 | DECISION | Store legal MDX in repo vs CMS?                              | LEG‑BOOT‑01 | Human | 🟥     |
| LEG‑UI‑01   | TASK     | MarkdownPage renderer with dark theme & anchor nav           | LEG‑EDGE‑01 | AI    | ☐      |
| LEG‑EDGE‑01 | TASK     | 404 page with search box & "Return to Feed" CTA              | —           | AI    | ☐      |
| LEG‑QA‑01   | TASK     | Lighthouse a11y ≥ 95 for markdown pages                      | —           | AI    | ☐      |

_Total Legal tasks: 5/100_

---

### 4. Maintenance & Downtime Pages

| ID            | Type     | Description                                                       | Blocks →      | Owner | Status |
| :------------ | :------- | :---------------------------------------------------------------- | :------------ | :---- | :----- |
| MAINT‑BOOT‑01 | TASK     | MaintenanceBanner component surface across pages via feature flag | —             | AI    | ☐      |
| MAINT‑DEC‑01  | DECISION | Who can trigger maintenance mode (admin panel vs env var)?        | MAINT‑BOOT‑01 | Human | 🟥     |
| MAINT‑QA‑01   | TASK     | Playwright test: banner renders when flag true                    | —             | AI    | ☐      |

_Total Maintenance tasks: 3/100_

---

## PAGE 5 – /auth + /onboarding Surfaces – Full Task & Sub-Task Checklist (≤ 100 items)

_Authority doc for AI execution. **UI primitives & layouts exist.** Covers two closely‑related routes: `/auth` (sign‑in/registration) and `/onboarding` (multi‑step profile setup). All architectural layers from foundation to observability are addressed. Brand tone: rebellious, welcoming, friction‑light._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that cannot start until this item is ✅
> **Owner** – AI or Human
> **Sub‑Tasks** – concrete work steps AI will ship in a single PR

---

## 🌟 Brand & UX Decision Framework (inherits Feed principles)

1.  **Fast‑Track Access** – no signup page longer than 15 s.
2.  **Rebellious Clarity** – copy is concise, friendly, anti‑corporate.
3.  **Security Without Friction** – SSO where possible, magic‑link fallback.
4.  **Guided Momentum** – onboarding steps feel like progression, not forms.
5.  **Performance ≥ Ornament** – JS payload < 60 KB for auth bundle.

---

### 1️⃣ Foundation & Environment (7)

| ID           | Type     | Status | Description                                                            | Sub‑Tasks                                          | Blocks →      | Owner |
| :----------- | :------- | :----- | :--------------------------------------------------------------------- | :------------------------------------------------- | :------------ | :---- |
| AUTH‑BOOT‑01 | TASK     | ☐      | Component import integrity for Auth + Onboarding primitives.           | • Smoke Storybook.<br>• CI fail if export missing. | AUTH‑DATA‑01+ | AI    |
| AUTH‑BOOT‑02 | TASK     | ☐      | Tailwind theme token check (btn‑primary, accent‑gold).                 | • Assert tokens present.                           | —             | AI    |
| AUTH‑BOOT‑03 | DECISION | 🟥     | **Auth flow type** – magic‑link only vs magic‑link + SSO (Google edu). | —                                                  | AUTH‑DATA‑02  | Human |
| AUTH‑BOOT‑04 | TASK     | ☐      | Intl‑ready date/phone utils import.                                    | • Install `libphonenumber` + `date‑fns`.           | —             | AI    |
| AUTH‑BOOT‑05 | DECISION | 🟥     | **Onboarding step count** – 5 vs 7 screens.                            | —                                                  | ONBD‑WIRE‑01  | Human |
| AUTH‑BOOT‑06 | TASK     | ☐      | ESLint + Prettier scopes for new routes.                               | • Update config.                                   | —             | AI    |
| AUTH‑BOOT‑07 | TASK     | ☐      | CI pipeline job: Lighthouse auth bundle size check.                    | • Warn if >60 KB.                                  | AUTH‑PERF‑01  | AI    |

### 2️⃣ Data Layer & RPC (10)

| ID           | Type     | Status | Description                                    | Sub‑Tasks                                                       | Blocks →      | Owner |
| :----------- | :------- | :----- | :--------------------------------------------- | :-------------------------------------------------------------- | :------------ | :---- |
| AUTH‑DATA‑01 | TASK     | ☐      | Prisma `AuthProvider` model migration.         | • Fields: id, userId, provider, providerId, token, expiresAt.   | AUTH‑RPC‑01   | AI    |
| AUTH‑DATA‑02 | TASK     | ☐      | Prisma seed: campus admin test account.        | • Insert sample user.                                           | AUTH‑RPC‑01   | AI    |
| AUTH‑DATA‑03 | DECISION | 🟥     | **Passwordless token TTL** – 10 min vs 30 min. | —                                                               | AUTH‑RPC‑01   | Human |
| AUTH‑DATA‑04 | TASK     | ☐      | Add index on `token` column for fast lookup.   | • Migrate.                                                      | AUTH‑RPC‑01   | AI    |
| AUTH‑RPC‑01  | TASK     | ☐      | `auth.requestMagicLink` RPC.                   | • zod email schema.<br>• Sends email.<br>• Rate‑limit IP 5/min. | AUTH‑RPC‑02   | AI    |
| AUTH‑RPC‑02  | TASK     | ☐      | `auth.consumeMagicLink` RPC.                   | • Validate token.<br>• Create session.<br>• Return JWT.         | AUTH‑WIRE‑01  | AI    |
| AUTH‑RPC‑03  | DECISION | 🟥     | **Session expiry** – 14 days vs 30 days.       | —                                                               | AUTH‑WIRE‑03  | Human |
| AUTH‑RPC‑04  | TASK     | ☐      | `onboarding.completeStep` RPC.                 | • Step id, payload.<br>• Persists partial profile.              | ONBD‑WIRE‑01  | AI    |
| AUTH‑RPC‑05  | TASK     | ☐      | Analytics event `onboarding\_step\_complete`.  | • Auto‑fire inside RPC.                                         | ONBD‑QA‑01    | AI    |
| AUTH‑RPC‑06  | TASK     | ☐      | GDPR delete user RPC scaffold.                 | • Admin only.                                                   | AUTH‑ADMIN‑01 | AI    |

### 3️⃣ Page Wiring – Auth (10)

| ID           | Type     | Status | Description                               | Sub‑Tasks                                                               | Blocks →     | Owner |
| :----------- | :------- | :----- | :---------------------------------------- | :---------------------------------------------------------------------- | :----------- | :---- |
| AUTH‑WIRE‑01 | TASK     | ☐      | `/auth` page request link form.           | • React Hook Form + zod.<br>• Error & success states.                   | AUTH‑QA‑01   | AI    |
| AUTH‑WIRE‑02 | TASK     | ☐      | Magic‑link sent confirmation screen.      | • Timer resend after 60 s.                                              | AUTH‑QA‑01   | AI    |
| AUTH‑WIRE‑03 | TASK     | ☐      | Token consumption route `/auth/callback`. | • Decode token.<br>• Store JWT.<br>• Redirect `/onboarding` or `/feed`. | AUTH‑QA‑01   | AI    |
| AUTH‑WIRE‑04 | TASK     | ☐      | Accessibility (aria‑labels, focus trap).  | • Keyboard‑only test.                                                   | AUTH‑QA‑01   | AI    |
| AUTH‑WIRE‑05 | DECISION | 🟥     | **Error copy tone** – playful vs formal.  | —                                                                       | AUTH‑WIRE‑01 | Human |

### 4️⃣ Page Wiring – Onboarding (12)

| ID           | Type     | Status | Description                                                                  | Sub‑Tasks                                                          | Blocks →     | Owner |
| :----------- | :------- | :----- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------- | :----------- | :---- |
| ONBD‑WIRE‑01 | TASK     | ☐      | `/onboarding` multi‑step controller.                                         | • Uses React state machine.<br>• Persists via RPC after each step. | ONBD‑WIRE‑04 | AI    |
| ONBD‑WIRE‑02 | TASK     | ☐      | Step 1 – name & handle.                                                      | • Live handle uniqueness check.                                    | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑03 | TASK     | ☐      | Step 2 – photo upload.                                                       | • Image compress, S3 presign.                                      | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑04 | TASK     | ☐      | Step 3 – academic year & residential badge.                                  | • Dropdowns.<br>• Validations.                                     | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑05 | TASK     | ☐      | Step 4 – interest tags (chips).                                              | • Multi‑select quick add.                                          | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑06 | TASK     | ☐      | Step 5 – follow 3 spaces suggestion.                                         | • Query popular spaces.                                            | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑07 | DECISION | 🟥     | **Skip option** – allow skip onboarding after step 2?                        | —                                                                  | ONBD‑WIRE‑06 | Human |
| ONBD‑WIRE‑08 | TASK     | ☐      | Progress bar motion (Framer).                                                | • 120 ms easing.                                                   | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑09 | TASK     | ☐      | Exit confirmation modal (prevent loss).                                      | • Unsaved changes guard.                                           | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑10 | TASK     | ☐      | Mobile gesture back‑swipe disables if unsaved.                               | • Hook pushState.                                                  | ONBD‑QA‑01   | AI    |
| ONBD‑WIRE‑11 | DECISION | 🟥     | **Post‑onboarding redirect** – always `/feed` or deep‑link to invited space? | —                                                                  | ONBD‑WIRE‑10 | Human |
| ONBD‑WIRE‑12 | TASK     | ☐      | Server event `user\_onboarded` emits to analytics + Feed first‑light ritual. | • Kafka push.                                                      | ONBD‑QA‑01   | AI    |

### 5️⃣ Realtime & Sockets (5)

| ID           | Type     | Status | Description                                                              | Sub‑Tasks                        | Blocks →     | Owner |
| :----------- | :------- | :----- | :----------------------------------------------------------------------- | :------------------------------- | :----------- | :---- |
| AUTH‑SOCK‑01 | TASK     | ☐      | WebSocket handshake establishes session notify.                          | • On consume token, open socket. | AUTH‑WIRE‑03 | AI    |
| AUTH‑SOCK‑02 | DECISION | 🟥     | **Onboarding live help channel** – enable live chat with student mentor? | —                                | ONBD‑WIRE‑02 | Human |
| AUTH‑SOCK‑03 | TASK     | ☐      | Broadcast `user\_onboarded` to invited friends sockets.                  | • Triggers notification toast.   | ONBD‑WIRE‑12 | AI    |
| AUTH‑SOCK‑04 | TASK     | ☐      | Rate‑limit broadcast to 3 times per minute.                              | • Throttle util.                 | AUTH‑SOCK‑03 | AI    |
| AUTH‑SOCK‑05 | TASK     | ☐      | Server disconnect after 10 m idle on onboarding page.                    | • Heartbeat.                     | —            | AI    |

### 6️⃣ Edge‑Cases & UX Rules (6)

| ID           | Type     | Status | Description                                             | Sub‑Tasks                                | Blocks →     | Owner |
| :----------- | :------- | :----- | :------------------------------------------------------ | :--------------------------------------- | :----------- | :---- |
| ONBD‑EDGE‑01 | TASK     | ☐      | Slow network fallback (loader ≤ 2 s).                   | • Skeletons.<br>• Retry CTA.             | ONBD‑QA‑01   | AI    |
| ONBD‑EDGE‑02 | TASK     | ☐      | Upload failure replacer image.                          | • Default avatar.<br>• Error toast.      | ONBD‑QA‑01   | AI    |
| ONBD‑EDGE‑03 | TASK     | ☐      | Handle S3 presign error.                                | • Exponential backoff.                   | ONBD‑QA‑01   | AI    |
| ONBD‑EDGE‑04 | TASK     | ☐      | Handle duplicate handle edge case.                      | • Disable Next btn.<br>• Red error copy. | ONBD‑QA‑01   | AI    |
| ONBD‑EDGE‑05 | DECISION | 🟥     | **Handle profanity check?** – reject offensive handles? | —                                        | ONBD‑EDGE‑04 | Human |
| ONBD‑EDGE‑06 | TASK     | ☐      | Offline warning for multi‑step (toast).                 | • LocalStorage cache steps.              | ONBD‑QA‑01   | AI    |

### 7️⃣ Quality & Metrics (6 items)

| ID           | Type | Status | Description                                 | Sub‑Tasks                                  | Blocks →     | Owner |
| :----------- | :--- | :----- | :------------------------------------------ | :----------------------------------------- | :----------- | :---- |
| AUTH‑QA‑01   | TASK | ☐      | Unit & integration tests for Auth flow.     | • Vitest, msw.<br>• Playwright happy path. | AUTH‑PERF‑01 | AI    |
| ONBD‑QA‑01   | TASK | ☐      | Integration tests for 5‑step onboarding.    | • Mock RPC.<br>• Snapshot UI.              | ONBD‑PERF‑01 | AI    |
| AUTH‑PERF‑01 | TASK | ☐      | Lighthouse auth bundle size < 60 KB.        | • Budget CI.                               | —            | AI    |
| ONBD‑PERF‑01 | TASK | ☐      | Onboarding Time‑to‑Interactive < 2 s on 3G. | • Perf CI gate.                            | —            | AI    |
| AUTH‑OBS‑01  | TASK | ☐      | Sentry error boundary around auth routes.   | • Capture 401, 500.                        | —            | AI    |
| ONBD‑OBS‑01  | TASK | ☐      | Datadog APM trace onboarding RPC duration.  | • Histogram dashboard.                     | —            | AI    |

### 8️⃣ Admin & Compliance (4 items)

| ID            | Type     | Status | Description                                              | Sub‑Tasks                                    | Blocks →    | Owner |
| :------------ | :------- | :----- | :------------------------------------------------------- | :------------------------------------------- | :---------- | :---- |
| AUTH‑ADMIN‑01 | TASK     | ☐      | Admin GDPR delete user flow.                             | • UI hidden route.<br>• Requires admin role. | AUTH‑QA‑01  | AI    |
| AUTH‑ADMIN‑02 | DECISION | 🟥     | **Email provider** – Postmark vs AWS SES.                | —                                            | AUTH‑RPC‑01 | Human |
| AUTH‑ADMIN‑03 | TASK     | ☐      | Audit log entry for each magic‑link request.             | • Prisma `AuditLog` write.                   | AUTH‑QA‑01  | AI    |
| AUTH‑ADMIN‑04 | TASK     | ☐      | Send onboarding completion stats daily to Slack webhook. | • Cron job.                                  | ONBD‑OBS‑01 | AI    |

---

### 🔍 Pending Human Decisions (12)

1.  **AUTH‑BOOT‑03** – Auth flow type.
2.  **AUTH‑BOOT‑05** – Onboarding step count.
3.  **AUTH‑DATA‑03** – Token TTL.
4.  **AUTH‑RPC‑03** – Session expiry.
5.  **AUTH‑WIRE‑05** – Error copy tone.
6.  **ONBD‑WIRE‑07** – Skip option.
7.  **ONBD‑WIRE‑11** – Post‑onboarding redirect.
8.  **AUTH‑SOCK‑02** – Live chat mentor.
9.  **ONBD‑EDGE‑05** – Profanity check.
10. **AUTH‑ADMIN‑02** – Email provider.
11. **Passwordless provider secret rotation cadence?** (implicit).
12. **Analytics sampling rate for onboarding events?** (implicit).

> _When resolving decisions, cite relevant Brand & UX principles for rationale._

---

**Current Checklist Count:** 60 / 100 items used.

---

_Last updated: TODO-DATE_

---

## PAGE 6 – /builder Surface – Full Task & Sub-Task Checklist (≤ 100 items)

_Authority doc for AI execution. **All UI primitives & editor layouts already exist** (block palette, property sidebar, preview pane). This checklist spans every architectural layer—foundation → observability—for the `/builder` route, where advanced students craft custom Tools. Brand voice: empowering, experimental, but never overwhelming._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that cannot start until this item is ✅
> **Owner** – AI or Human
> **Sub‑Tasks** – concrete work steps AI will ship in one PR

---

### 🌟 Brand & UX Decision Framework (Builder‑Specific)

1.  **Power With Guard‑Rails** – students feel limitless, yet safe from catastrophic errors.
2.  **Explain‑While‑Doing** – inline tips, not docs off‑site.
3.  **Dark Workshop Aesthetic** – same embossed black/gold, plus subtle grid backdrop.
4.  **Progressive Disclosure** – show advanced options only once basics are filled.
5.  **Performance & Stability** – sandbox execution must never slow the main app.

DECISION answers must cite which principles they optimise.

---

### 1️⃣ Foundation & Environment (8 items)

| ID              | Type     | Status | Description                                                                                          | Sub‑Tasks                                          | Blocks →             | Owner |
| :-------------- | :------- | :----- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------- | :------------------- | :---- |
| BUILDER‑BOOT‑01 | TASK     | ☐      | **Component Import Integrity** – ensure palette, block item, property sidebar, preview pane compile. | Static import test; Storybook smoke run.           | BUILDER‑DATA‑01+     | AI    |
| BUILDER‑BOOT‑02 | TASK     | ☐      | **Monaco Editor preload** for code blocks.                                                           | Lazy load + fallback spinner; verify worker paths. | BUILDER‑WIREFRAME‑01 | AI    |
| BUILDER‑BOOT‑03 | DECISION | 🟥     | **Sandbox Strategy** – iframe vs web‑worker for live preview.                                        | —                                                  | BUILDER‑WB‑01        | Human |
| BUILDER‑BOOT‑04 | TASK     | ☐      | Add `@builder` eslint config for block scripts.                                                      | Lint rules, CI hook.                               | —                    | AI    |
| BUILDER‑BOOT‑05 | TASK     | ☐      | Storybook dark‑theme grid backdrop decorator.                                                        | Reuse feed tokens.                                 | —                    | AI    |
| BUILDER‑BOOT‑06 | TASK     | ☐      | Configure test env for `jsdom + nodeCrypto` (block eval).                                            | Vitest config tweak.                               | BUILDER‑QA‑01        | AI    |
| BUILDER‑BOOT‑07 | DECISION | 🟥     | **Max Bundle Size** for builder page (kb limit).                                                     | —                                                  | BUILDER‑PERF‑01      | Human |
| BUILDER‑BOOT‑08 | TASK     | ☐      | Feature flag toggle `builderEnabled` (per‑school).                                                   | Env var + tRPC `meta.school` check.                | —                    | AI    |

### 2️⃣ Data Model & Persistence (12 items)

| ID              | Type     | Status | Description                                          | Sub‑Tasks                                                                                                     | Blocks →             | Owner |
| :-------------- | :------- | :----- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------- | :---- |
| BUILDER‑DATA‑01 | TASK     | ☐      | Create `ToolDraft` Prisma model.                     | Fields: id, ownerId, slug, jsonSchema, version, status(enum: draft,published,archived), createdAt, updatedAt. | BUILDER‑WIREFRAME‑01 | AI    |
| BUILDER‑DATA‑02 | TASK     | ☐      | Migration for `ToolVersion` table (immutable).       | Foreign key to ToolDraft; semantic version.                                                                   | BUILDER‑WIREFRAME‑02 | AI    |
| BUILDER‑DATA‑03 | TASK     | ☐      | tRPC `builder.toolDraft.upsert`                      | Zod schema validation.                                                                                        | BUILDER‑WIREFRAME‑02 | AI    |
| BUILDER‑DATA‑04 | TASK     | ☐      | tRPC `builder.toolDraft.list`                        | Cursor pagination, filter by owner.                                                                           | BUILDER‑UI‑LIST‑01   | AI    |
| BUILDER‑DATA‑05 | TASK     | ☐      | Redis key for compile cache (`tool:{id}:{hash}`)     | TTL 24 h.                                                                                                     | BUILDER‑WB‑01        | AI    |
| BUILDER‑DATA‑06 | DECISION | 🟥     | **Max Draft Count per user** (5 vs 10 vs unlimited). | —                                                                                                             | BUILDER‑DATA‑03      | Human |
| BUILDER‑DATA‑07 | TASK     | ☐      | Field‑level access control (owner vs admin).         | Row‑level guards.                                                                                             | BUILDER‑QA‑02        | AI    |
| BUILDER‑DATA‑08 | TASK     | ☐      | Prisma index on `ToolDraft(ownerId,status)`          | Migration.                                                                                                    | —                    | AI    |
| BUILDER‑DATA‑09 | TASK     | ☐      | Cron job to purge archived drafts > 90 d.            | Temporal task def.                                                                                            | —                    | AI    |
| BUILDER‑DATA‑10 | DECISION | 🟥     | **Versioning SemVer vs timestamp**                   | —                                                                                                             | BUILDER‑DATA‑02      | Human |
| BUILDER‑DATA‑11 | TASK     | ☐      | Add `publishTool` mutation (draft → published).      | Validate required blocks present.                                                                             | BUILDER‑WIREFRAME‑03 | AI    |
| BUILDER‑DATA‑12 | TASK     | ☐      | Webhook to analytics on publish event.               | Post to Segment.                                                                                              | BUILDER‑OBS‑01       | AI    |

### 3️⃣ Wireframe & State Management (15 items)

| ID                   | Type     | Status | Description                                    | Sub‑Tasks                                         | Blocks →             | Owner |
| :------------------- | :------- | :----- | :--------------------------------------------- | :------------------------------------------------ | :------------------- | :---- |
| BUILDER‑WIREFRAME‑01 | TASK     | ☐      | Mount Builder layout shell.                    | Left palette, center canvas, right props sidebar. | BUILDER‑UX‑01        | AI    |
| BUILDER‑WIREFRAME‑02 | TASK     | ☐      | Draft load & save hooks.                       | React Query `builder.toolDraft.upsert/list`.      | BUILDER‑UI‑LIST‑01   | AI    |
| BUILDER‑WIREFRAME‑03 | TASK     | ☐      | Publish flow wizard modal.                     | Steps: Review, Permissions, Confirm.              | BUILDER‑QA‑03        | AI    |
| BUILDER‑WIREFRAME‑04 | TASK     | ☐      | Drag‑and‑drop block placement logic.           | `react‑dnd` layer; grid snapping.                 | BUILDER‑UX‑02        | AI    |
| BUILDER‑WIREFRAME‑05 | TASK     | ☐      | PropPanel dynamic form renderer.               | Zod schema → form‑components.                     | BUILDER‑UX‑02        | AI    |
| BUILDER‑WIREFRAME‑06 | TASK     | ☐      | Live preview embed refresh on debounce 300 ms. | Post message to sandbox.                          | BUILDER‑UX‑03        | AI    |
| BUILDER‑WIREFRAME‑07 | TASK     | ☐      | Unsaved‑changes warning before nav away.       | Window beforeunload guard.                        | —                    | AI    |
| BUILDER‑WIREFRAME‑08 | TASK     | ☐      | Shortcut keys: ⌘Z/⌘⇧Z undo/redo.               | Command manager.                                  | BUILDER‑QA‑02        | AI    |
| BUILDER‑WIREFRAME‑09 | TASK     | ☐      | Context menu for block clone/delete.           | Right‑click menu.                                 | BUILDER‑UX‑02        | AI    |
| BUILDER‑WIREFRAME‑10 | DECISION | 🟥     | **Undo stack max depth** (50 vs 100).          | —                                                 | BUILDER‑WIREFRAME‑08 | Human |
| BUILDER‑WIREFRAME‑11 | TASK     | ☐      | Autosave interval 8 s idle.                    | Debounce network write.                           | BUILDER‑QA‑03        | AI    |
| BUILDER‑WIREFRAME‑12 | TASK     | ☐      | Read‑only mode for published tools.            | Disable drag/props, highlight locked banner.      | BUILDER‑UI‑DETAIL‑01 | AI    |
| BUILDER‑WIREFRAME‑13 | TASK     | ☐      | Fork tool action (create new draft).           | Mutation + redirect.                              | BUILDER‑DATA‑03      | AI    |
| BUILDER‑WIREFRAME‑14 | TASK     | ☐      | Import JSON schema via file upload.            | Parse & hydrate blocks.                           | BUILDER‑QA‑03        | AI    |
| BUILDER‑WIREFRAME‑15 | TASK     | ☐      | Export tool code as ZIP.                       | Call build endpoint, download.                    | BUILDER‑OBS‑02       | AI    |

### 4️⃣ UX Flow & Copy (10 items)

| ID            | Type     | Status | Description                                          | Sub‑Tasks                  | Blocks →       | Owner |
| :------------ | :------- | :----- | :--------------------------------------------------- | :------------------------- | :------------- | :---- |
| BUILDER‑UX‑01 | TASK     | ☐      | Onboarding overlay (first visit).                    | 3‑step tour, can skip.     | BUILDER‑QA‑01  | AI    |
| BUILDER‑UX‑02 | TASK     | ☐      | Block hover & select states (gold outline).          | Focus ring + keyboard nav. | BUILDER‑QA‑01  | AI    |
| BUILDER‑UX‑03 | TASK     | ☐      | Preview refresh animation (fade‑in).                 | Principle 3 aesthetic.     | BUILDER‑QA‑01  | AI    |
| BUILDER‑UX‑04 | TASK     | ☐      | Inline tip tooltips (Explain‑While‑Doing).           | Markdown support.          | BUILDER‑QA‑01  | AI    |
| BUILDER‑UX‑05 | DECISION | 🟥     | **Copy tone for errors** – playful vs direct.        | Provide examples.          | BUILDER‑QA‑02  | Human |
| BUILDER‑UX‑06 | TASK     | ☐      | Empty state copy "Drop blocks to start building".    | Rebellious tone.           | —              | AI    |
| BUILDER‑UX‑07 | TASK     | ☐      | Progress bar for publish wizard.                     | Shadcn Progress.           | BUILDER‑QA‑03  | AI    |
| BUILDER‑UX‑08 | TASK     | ☐      | Confirmation toast "Tool published 🚀".              | Auto link to live preview. | BUILDER‑OBS‑01 | AI    |
| BUILDER‑UX‑09 | TASK     | ☐      | Keyboard shortcut cheatsheet modal.                  | ?‑key opens modal.         | BUILDER‑QA‑02  | AI    |
| BUILDER‑UX‑10 | DECISION | 🟥     | **Tooltip persist on hover** vs disappear after 4 s. | —                          | BUILDER‑UX‑04  | Human |

### 5️⃣ Worker & Build Pipeline (6 items)

| ID            | Type     | Status | Description                                  | Sub‑Tasks                                      | Blocks →        | Owner |
| :------------ | :------- | :----- | :------------------------------------------- | :--------------------------------------------- | :-------------- | :---- |
| BUILDER‑WB‑01 | TASK     | ☐      | Sandbox compile worker.                      | Transpile user code (esbuild‑wasm), run tests. | BUILDER‑QA‑02   | AI    |
| BUILDER‑WB‑02 | TASK     | ☐      | Web‑worker crash recovery.                   | Timeout & auto reload.                         | BUILDER‑QA‑02   | AI    |
| BUILDER‑WB‑03 | TASK     | ☐      | Size snapshot CI for built tools.            | diff & comment in PR.                          | BUILDER‑PERF‑01 | AI    |
| BUILDER‑WB‑04 | TASK     | ☐      | CSP headers for sandbox iframe.              | Restrict network.                              | BUILDER‑OBS‑02  | AI    |
| BUILDER‑WB‑05 | DECISION | 🟥     | **Allowed npm deps list** for tools.         | —                                              | BUILDER‑WB‑01   | Human |
| BUILDER‑WB‑06 | TASK     | ☐      | Publish pipeline push to CDN (tool bundles). | Signed URL, cache‑control 1y.                  | BUILDER‑OBS‑02  | AI    |

### 6️⃣ UI Lists & Detail Pages (7 items)

| ID                   | Type     | Status | Description                                               | Sub‑Tasks                                     | Blocks →             | Owner |
| :------------------- | :------- | :----- | :-------------------------------------------------------- | :-------------------------------------------- | :------------------- | :---- |
| BUILDER‑UI‑LIST‑01   | TASK     | ☐      | "My Tools" list page.                                     | Table of drafts & published; sort by updated. | BUILDER‑QA‑02        | AI    |
| BUILDER‑UI‑LIST‑02   | TASK     | ☐      | Search tools by name slug.                                | Fuse.js client filter.                        | BUILDER‑QA‑02        | AI    |
| BUILDER‑UI‑LIST‑03   | TASK     | ☐      | Delete draft confirmation modal.                          | Hard delete or archive.                       | BUILDER‑DATA‑09      | AI    |
| BUILDER‑UI‑DETAIL‑01 | TASK     | ☐      | Read‑only display for published tool.                     | Renders ToolRunner preview.                   | BUILDER‑OBS‑01       | AI    |
| BUILDER‑UI‑DETAIL‑02 | TASK     | ☐      | Share link copy‑to‑clipboard.                             | Toast feedback.                               | BUILDER‑OBS‑01       | AI    |
| BUILDER‑UI‑DETAIL‑03 | TASK     | ☐      | Version history dropdown.                                 | Compare diff links.                           | BUILDER‑DATA‑02      | AI    |
| BUILDER‑UI‑DETAIL‑04 | DECISION | 🟥     | **Canonical URL scheme** `/tool/{slug}` vs `/tools/{id}`. | —                                             | BUILDER‑UI‑DETAIL‑02 | Human |

### 7️⃣ Observability & Analytics (4 items)

| ID             | Type | Status | Description                             | Sub‑Tasks                | Blocks →        | Owner |
| :------------- | :--- | :----- | :-------------------------------------- | :----------------------- | :-------------- | :---- |
| BUILDER‑OBS‑01 | TASK | ☐      | Log publish events (Datadog + Segment). | Tag with userId, toolId. | BUILDER‑PERF‑01 | AI    |
| BUILDER‑OBS‑02 | TASK | ☐      | Track compile errors & latency.         | Sentry perf traces.      | BUILDER‑QA‑02   | AI    |
| BUILDER‑OBS‑03 | TASK | ☐      | Gauge dashboard "Avg publish per week". | Grafana panel.           | —               | AI    |
| BUILDER‑OBS‑04 | TASK | ☐      | Alert on worker crash >3/min.           | PagerDuty integ.         | BUILDER‑WB‑02   | AI    |

### 8️⃣ Quality Assurance (6 items)

| ID            | Type | Status | Description                                         | Sub‑Tasks     | Blocks →        | Owner |
| :------------ | :--- | :----- | :-------------------------------------------------- | :------------ | :-------------- | :---- |
| BUILDER‑QA‑01 | TASK | ☐      | Storybook snapshot tests every primary state.       | Chromatic CI. | BUILDER‑PERF‑01 | AI    |
| BUILDER‑QA‑02 | TASK | ☐      | E2E tests: create draft, drag block, undo, publish. | Playwright    | BUILDER‑PERF‑01 | AI    |

---

## PAGE 7 – Global Systems & Services (Connective Tissue)

_Authority doc for AI execution. This checklist covers critical, app-wide systems that are not tied to a single page but are essential for a cohesive user experience. These systems service the entire platform._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that cannot start until this item is ✅
> **Owner** – AI or Human
> **Note** – Each system is a self-contained architectural unit.

---

### 1. Global Search (Command Palette)

_Brand Principle: **Single-Surface Clarity**. Users should be able to find anything from anywhere without navigating away from their current context._

| ID             | Type     | Description                                                                                                         | Sub‑Tasks                                                | Blocks →       | Owner | Status |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- | :------------- | :---- | :----- |
| SEARCH‑DEC‑01  | DECISION | **Searchable Entities:** What is included in global search? (Users, Spaces, Rituals, Posts). Define priority order. | —                                                        | SEARCH‑DATA‑01 | Human | 🟥     |
| SEARCH‑DEC‑02  | DECISION | **Search UI:** Command Palette (`⌘+K` overlay) vs. dedicated `/search` page? Principle: _Fast‑Track Access_.        | —                                                        | SEARCH‑UI‑01   | Human | 🟥     |
| SEARCH‑DATA‑01 | TASK     | **Implement Search Indexing Strategy** (e.g., Postgres full-text search, Meilisearch, or Algolia).                  | Create `search.global.query` RPC.                        | SEARCH‑UI‑01   | AI    | ☐      |
| SEARCH‑UI‑01   | TASK     | **Build Search UI** based on `SEARCH-DEC-02`. Must be fully keyboard navigable.                                     | • Component `CommandPalette`.<br/>• Render result types. | SEARCH‑QA‑01   | AI    | ☐      |
| SEARCH‑UX‑01   | TASK     | **Implement "No Results" and "Recent Searches" states** for the search UI.                                          | • Rebellious but helpful copy.                           | SEARCH‑QA‑01   | AI    | ☐      |
| SEARCH‑QA‑01   | TASK     | **Write E2E test** for opening search, typing query, keyboard navigation, and clicking a result.                    | • Playwright test.                                       | —              | AI    | ☐      |

---

### 2. Notifications System

_Brand Principle: **Student-First Utility**. Notifications must be timely, relevant, and actionable, never spammy. They are a core retention driver._

| ID            | Type     | Description                                                                                                      | Sub‑Tasks                                                                    | Blocks →      | Owner | Status |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :------------ | :---- | :----- |
| NOTIF‑DEC‑01  | DECISION | **Notification Types & Grouping:** Define all events that create a notification. How are they grouped in the UI? | —                                                                            | NOTIF‑DATA‑01 | Human | 🟥     |
| NOTIF‑DEC‑02  | DECISION | **Notification Center UI:** Popover from the main nav vs. a dedicated `/notifications` page?                     | —                                                                            | NOTIF‑UI‑01   | Human | 🟥     |
| NOTIF‑DATA‑01 | TASK     | **Create `Notification` Prisma model** and `notifications.list.query` RPC.                                       | • `type`, `actorId`, `targetUrl`, `readAt`.<br/>• Fan-out on event creation. | NOTIF‑UI‑01   | AI    | ☐      |
| NOTIF‑SOCK‑01 | TASK     | **Implement real-time notification delivery** via WebSocket.                                                     | • Channel `notifications/{userId}`.<br/>• Emit count for badge.              | NOTIF‑UI‑02   | AI    | ☐      |
| NOTIF‑UI‑01   | TASK     | **Build Notification Center UI** based on `NOTIF-DEC-02`.                                                        | • `NotificationRow` component.<br/>• Mark as read action.                    | NOTIF‑QA‑01   | AI    | ☐      |
| NOTIF‑UI‑02   | TASK     | **Implement unread notifications badge** in the main site header.                                                | • Subscribes to `NOTIF-SOCK-01`.                                             | NOTIF‑QA‑01   | AI    | ☐      |
| NOTIF‑QA‑01   | TASK     | **Write integration test** for receiving a notification in real-time and seeing the UI update.                   | • Vitest + Playwright.                                                       | —             | AI    | ☐      |

---

## PAGE 8 – /feed Surface (Client-side)

_Authority doc for AI execution. This checklist covers the client-side implementation of the `/feed` surface. Brand & UX principles identical to server-side._

> **Legend** > **ID** – stable reference for commits & comments
> **Type** – `TASK` (AI executes) / `DECISION` (human input)
> **Status** – ☐ open | ⏳ in‑progress | ✅ done | 🟥 blocked
> **Blocks →** – IDs that can't start until this item is ✅
> **Owner** – AI or Human
> **Sub‑Tasks** – concrete work steps AI will ship in one PR

---

### 1️⃣ TopStrip Component

| ID           | Type | Status | Description                                                                                | Sub‑Tasks                                                                               | Blocks →      | Owner |
| :----------- | :--- | :----- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :------------ | :---- |
| FEED‑WIRE‑01 | TASK | 🟡     | Design and build the main layout for /feed page, including TopStrip and MainFeed sections. | • Create `/feed/page.tsx`.<br>• Add placeholder sections for `TopStrip` and `MainFeed`. | FEED‑UI‑01,02 | AI    |
| FEED‑UI‑01   | TASK | ☐      | Build `<TopStrip>` component with horizontal scroll.                                       | • Create `<TopStrip>` in Storybook.                                                     | FEED‑WIRE‑01  | AI    |
| FEED‑UI‑02   | TASK | ☐      | Build `<MainFeed>` component to display a list of posts.                                   | • Create `<MainFeed>` in Storybook.                                                     | FEED‑WIRE‑01  | AI    |
| FEED‑UI‑03   | TASK | ✅     | Build `<PostCard>` component (V1 - basic content).                                         | • Create `<PostCard>` in Storybook.                                                     | FEED‑UI‑02    | AI    |
| FEED‑UI‑04   | TASK | ✅     | Build `<RitualCard>` for displaying active Rituals.                                        | • Create `<RitualCard>` in Storybook.                                                   | FEED‑UI‑02    | AI    |
| FEED‑UI‑05   | TASK | ☐      | Build `<UnseenItemsIndicator>` floating button.                                            | • Create `<UnseenItemsIndicator>` in Storybook.                                         | FEED‑WIRE‑01  | AI    |

## 3. Data Layer (Client-side)

| ID           | Type | Status | Description                                    | Sub‑Tasks              | Blocks →     | Owner |
| :----------- | :--- | :----- | :--------------------------------------------- | :--------------------- | :----------- | :---- |
| FEED‑DATA‑01 | TASK | ☐      | Fetch `TopStrip` data from server.             | • Fetch data from API. | FEED‑WIRE‑01 | AI    |
| FEED‑DATA‑02 | TASK | ☐      | Fetch `MainFeed` data from server.             | • Fetch data from API. | FEED‑WIRE‑01 | AI    |
| FEED‑DATA‑03 | TASK | ☐      | Fetch `PostCard` data from server.             | • Fetch data from API. | FEED‑UI‑03   | AI    |
| FEED‑DATA‑04 | TASK | ☐      | Fetch `RitualCard` data from server.           | • Fetch data from API. | FEED‑UI‑04   | AI    |
| FEED‑DATA‑05 | TASK | ☐      | Fetch `UnseenItemsIndicator` data from server. | • Fetch data from API. | FEED‑UI‑05   | AI    |
