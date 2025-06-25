# HIVE vBETA System Blueprint & Completion Checklist

A comprehensive specification for building the HIVE social platform. This document bridges user needs with technical implementation, ensuring every feature delivers measurable student value while maintaining architectural consistency.

> ### **New Development Philosophy: From Tasks to User Stories**
>
> This blueprint follows a **story-driven development** approach where every task serves a specific user need. Each item includes:
>
> 1. **User Story Context** - Why this feature exists and what student problem it solves
> 2. **Explicit Acceptance Criteria** - Verifiable conditions that define "done"
> 3. **Design References** - Links to Storybook stories, motion specs, or design tokens
> 4. **Architectural Guidance** - Patterns for data flow, state management, and error handling
> 5. **Quality Gates** - Performance, accessibility, and UX standards that must be met
>
> **AI Execution Protocol:**
>
> 1. **Task Selection (Human):** Select a single story from the blueprint
> 2. **Implementation Proposal (AI):** Present detailed plan with architecture decisions
> 3. **Discussion & Approval (Human):** Review plan and provide explicit approval
> 4. **Execution (AI):** Build to specification with all acceptance criteria met
> 5. **Evidence & Validation (AI):** Provide verifiable proof and update blueprint

---

## 🏗️ Architectural Foundation Documents

Before implementing any feature, these foundational documents must exist and be referenced:

### Required Architecture Guides

- **`DESIGN_SYSTEM.md`** ✅ - Motion language, spacing tokens, component patterns
- **`CACHE_STRATEGY.md`** ⏳ - React Query patterns, invalidation rules, optimistic updates
- **`ERROR_HANDLING.md`** ⏳ - Error boundaries, retry logic, user messaging patterns
- **`ACCESSIBILITY.md`** ⏳ - WCAG 2.1 AA compliance patterns, testing procedures
- **`PERFORMANCE.md`** ⏳ - Bundle budgets, Core Web Vitals targets, optimization patterns

---

## 📚 Story Categories & User Personas

### Primary Personas

- **Emma** - First-year student discovering campus community
- **Marcus** - Upperclassman organizing events and building connections
- **Sarah** - Campus admin moderating content and managing communities

### Story Categories

- **🎯 Core Experience** - Essential user journeys (feed, spaces, profile)
- **⚡ Real-time Features** - Live updates, notifications, collaborative tools
- **🔐 Trust & Safety** - Moderation, privacy, security features
- **🎨 Creation Tools** - Builder, content creation, customization
- **📊 Admin & Analytics** - Management interfaces, insights, controls

---

## PAGE 5 – /auth + /onboarding Surfaces – Full Task & Sub-Task Checklist (vBETA Slice 1)

**User Story:** As a new UB student, I want a seamless, multi-step process to create an account, establish my identity, and signal my leadership interests, so I can quickly and effectively join the HIVE community.

### 1️⃣ Foundation & Environment

| ID           | Type     | Status | Description                                                            | Sub‑Tasks                                                   | Blocks →      | Owner |
| :----------- | :------- | :----- | :--------------------------------------------------------------------- | :---------------------------------------------------------- | :------------ | :---- |
| AUTH‑BOOT‑01 | TASK     | ✅     | Component import integrity for Auth + Onboarding primitives.           | • Smoke Storybook.<br/>• CI fail if export missing.         | AUTH‑DATA‑01+ | AI    |
| AUTH‑BOOT‑02 | TASK     | ✅     | Tailwind theme token check (btn‑primary, accent‑gold).                 | • Assert tokens present.                                    | —             | AI    |
| AUTH‑BOOT‑03 | DECISION | ✅     | **Auth flow type** – magic‑link only vs magic‑link + SSO (Google edu). | • Decision now logged in the `DECISION LOG` at end of file. | AUTH‑DATA‑02  | Human |
| AUTH‑BOOT‑04 | TASK     | ✅     | ESLint + Prettier scopes for new routes.                               | • Update config.                                            | —             | AI    |
| AUTH‑BOOT‑05 | TASK     | ✅     | CI pipeline job: Lighthouse auth bundle size check.                    | • Warn if >60 KB.                                           | AUTH‑PERF‑01  | AI    |

### 2️⃣ Data Layer & RPC

| ID           | Type | Status | Description                               | Sub‑Tasks                                                                                                 | Blocks →    | Owner |
| :----------- | :--- | :----- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :---------- | :---- |
| AUTH‑DATA‑01 | TASK | ✅     | Define initial `User` model in Firestore. | • Add fields: `isLeaderCandidate`, `majorId`, `gradYear`, `isFirstYear`, `avatarUrl`, `interestTags`.     | AUTH‑RPC‑01 | AI    |
| AUTH‑DATA‑02 | TASK | ✅     | Define `LeaderClaim` model in Firestore.  | • Fields: `userId`, `requestedSpaceName`, `status ('PENDING')`, `createdAt`.                              | AUTH‑RPC‑05 | AI    |
| AUTH‑RPC‑01  | TASK | ✅     | `auth.requestMagicLink` RPC.              | • Zod validates `email` is `@buffalo.edu`.<br/>• Sends email via provider.<br/>• Rate‑limit IP 5/min.     | AUTH‑RPC‑02 | AI    |
| AUTH‑RPC‑02  | TASK | ✅     | `auth.consumeMagicLink` RPC.              | • Validate JWT.<br/>• Create `User` record if new.<br/>• Create session.<br/>• Trigger handle generation. | ONBD‑UI‑01  | AI    |
| AUTH‑RPC‑03  | TASK | ✅     | `onboarding.saveDisplayName` (Step 1).    | • Saves `displayName`, generates & saves `handle`.                                                        | ONBD‑UI‑02  | AI    |
| AUTH‑RPC‑04  | TASK | ✅     | `onboarding.saveLeaderChoice` (Step 2a).  | • Saves `isLeaderCandidate` boolean to User model.                                                        | ONBD‑UI‑03  | AI    |
| AUTH‑RPC‑05  | TASK | ✅     | `onboarding.claimSpace` (Step 2b).        | • Creates a `LeaderClaim` document with `status: 'PENDING'`.                                              | ONBD‑UI‑04  | AI    |
| AUTH‑RPC‑06  | TASK | ✅     | `onboarding.saveAcademicInfo` (Step 3).   | • Saves `majorId`, `gradYear`, `isFirstYear` to User model.                                               | ONBD‑UI‑05  | AI    |
| AUTH‑RPC‑07  | TASK | ✅     | `onboarding.saveAvatar` (Step 4).         | • Requires presigned URL logic.<br/>• Saves final `avatarUrl` to User model.                              | ONBD‑UI‑06  | AI    |
| AUTH‑RPC‑08  | TASK | ✅     | `onboarding.saveInterests` (Step 5).      | • Saves `interestTags` array to User model.                                                               | ONBD‑UI‑07  | AI    |
| AUTH‑RPC‑09  | TASK | ✅     | `onboarding.complete` (Step 6).           | • Sets `onboardingStatus='COMPLETE'` on User model.                                                       | —           | AI    |

### 3️⃣ Page Wiring & UI

| ID         | Type | Status | Description                                 | Sub‑Tasks                                                                                                              | Blocks →   | Owner |
| :--------- | :--- | :----- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- | :--------- | :---- |
| AUTH‑UI‑01 | TASK | ✅     | Build `/auth` page with email input.        | • UI shows `.edu hint`.<br/>• On success, navigates to `/auth/check-email`.                                            | AUTH‑UI‑02 | AI    |
| AUTH‑UI‑02 | TASK | ✅     | Build `/auth/check-email` page.             | • Displays "Check your inbox" copy.<br/>• Includes a 10-minute countdown timer visual.                                 | AUTH‑UI‑03 | AI    |
| AUTH‑UI‑03 | TASK | ✅     | Build `/verify` (or `/auth/callback`) page. | • Displays a loading spinner while token is validated.<br/>• Redirects to `/onboarding/1` on success.                  | ONBD‑UI‑01 | AI    |
| ONBD‑UI‑01 | TASK | ✅     | Build `/onboarding/1` – Display Name.       | • Prefills name from email.<br/>• Shows a ghost preview of the auto-generated handle.                                  | ONBD‑UI‑02 | AI    |
| ONBD‑UI‑02 | TASK | ✅     | Build `/onboarding/2a` – Leader Question.   | • Simple "Yes/No" radio button UI.<br/>• "Yes" path proceeds to `2b`, "No" path skips to `3`.                          | ONBD‑UI‑03 | AI    |
| ONBD‑UI‑03 | TASK | ✅     | Build `/onboarding/2b` – Claim Space.       | • Searchable list of existing spaces.<br/>• "Request a new space" opens a text field.                                  | ONBD‑UI‑04 | AI    |
| ONBD‑UI‑04 | TASK | ✅     | Build `/onboarding/2c` – Pending Notice.    | • Simple confirmation screen: "Your request is pending review."                                                        | ONBD‑UI‑05 | AI    |
| ONBD‑UI‑05 | TASK | ✅     | Build `/onboarding/3` – Academic Card.      | • Uses `Select` for Major and Grad Year.<br/>• Uses a `Checkbox` for "I'm a new/incoming student".                     | ONBD‑UI‑06 | AI    |
| ONBD‑UI‑06 | TASK | ✅     | Build `/onboarding/4` – Avatar Upload.      | • Uses a `Dropzone` component.<br/>• Includes a prominent "Skip" button.                                               | ONBD‑UI‑07 | AI    |
| ONBD‑UI‑07 | TASK | ✅     | Build `/onboarding/5` – Interests.          | • Displays a grid of `Chip` components.<br/>• Allows multi-select up to a max of 6.<br/>• Includes a "Skip" button.    | ONBD‑UI‑08 | AI    |
| ONBD‑UI‑08 | TASK | ✅     | Build `/onboarding/complete` page.          | • Displays a `Confetti` animation.<br/>• Has a single "Enter HIVE" button that navigates to the `/feed` or `/profile`. | —          | AI    |

### 4️⃣ Quality & DevOps

| ID            | Type | Status | Description                                  | Sub‑Tasks                                                                                                          | Blocks →    | Owner |
| :------------ | :--- | :----- | :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :---------- | :---- |
| AUTH‑QA‑01    | TASK | ✅     | E2E test for the full onboarding happy path. | • Playwright test: signs up, proceeds through all 7 steps.<br/>• Mocks all RPC calls.                              | —           | AI    |
| AUTH‑PERF‑01  | TASK | ✅     | Lighthouse auth bundle size < 60 KB.         | • Add check to CI pipeline.                                                                                        | —           | AI    |
| AUTH‑ADMIN‑01 | TASK | ✅     | Implement magic-link email template.         | • Use `react-email` or similar.<br/>• Implement copy from decision log.<br/>• Test rendering across email clients. | AUTH‑RPC‑01 | AI    |

---

## PAGE 3 – /profile Surface – Full Task & Sub-Task Checklist

**User Story:** As a HIVE member, I want a central profile page that acts as my identity anchor, provides immediate utility through a personal calendar, and showcases my academic and community involvement, so I can represent myself authentically and connect with others.

**Business Value:** The profile is a key retention and engagement surface. A well-utilized profile increases a user's sense of belonging and provides pathways to discover new spaces and people. The calendar tile provides immediate, practical value, encouraging repeat visits.

### 1️⃣ Foundation & Environment

| ID           | Type | Status | Description                         | Sub‑Tasks                                                                                        | Blocks →      | Owner |
| :----------- | :--- | :----- | :---------------------------------- | :----------------------------------------------------------------------------------------------- | :------------ | :---- |
| PROF‑BOOT‑01 | TASK | ☐      | Set up Profile routes.              | • Configure `/profile` for the logged-in user.<br/>• Configure `/u/@handle` for public viewing.  | PROF‑DATA‑01  | AI    |
| PROF‑BOOT‑02 | TASK | ☐      | Implement "First Visit" tour logic. | • Check for `?firstVisit=1` query param.<br/>• Launch the `ProfileFirstRunTour` modal component. | PROF‑UI‑09    | AI    |
| PROF‑BOOT‑03 | TASK | ☐      | Component import integrity check.   | • Static import test for all `P-` and `Tile-` components listed in the spec.                     | PROF‑DATA‑01+ | AI    |

### 2️⃣ Data Layer & RPC

| ID           | Type | Status | Description                              | Sub‑Tasks                                                                                                                                 | Blocks →    | Owner |
| :----------- | :--- | :----- | :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :---- |
| PROF‑DATA‑01 | TASK | ☐      | Define `ProfileTile` model in Firestore. | • Fields: `userId`, `tileType`, `order`, `size`.<br/>• Mandatory Tiles: `CalendarTile`, `HiveLabTile`.                                    | PROF‑RPC‑01 | AI    |
| PROF‑RPC‑01  | TASK | ☐      | `profile.getProfile` RPC.                | • Fetches user data, tile configs, role-based permissions, and stats (`postCount`, `spaceCount`).                                         | PROF‑UI‑01  | AI    |
| PROF‑RPC‑02  | TASK | ☐      | `profile.getCalendarEvents` RPC.         | • Fetches events for the `CalendarTile`.<br/>• If user is a Leader, merges personal and managed Space events.                             | PROF‑UI‑04  | AI    |
| PROF‑RPC‑03  | TASK | ☐      | `profile.updateTileOrder` mutation.      | • Accepts an array of tile IDs in the new order.<br/>• Performs a transactional write to update the `order` field for all affected tiles. | PROF‑UI‑03  | AI    |
| PROF‑RPC‑04  | TASK | ☐      | `profile.updateAvatar` mutation.         | • Manages presigned URL generation for secure upload.<br/>• Writes final `avatarUrl` to the User model.                                   | PROF‑UI‑07  | AI    |
| PROF‑DATA‑02 | TASK | ☐      | Define `PublicProfile` DTO.              | • Create a data transfer object containing only public fields, as per decision log.<br/>• Create `public.getProfileByHandle` RPC.         | PROF‑RPC‑01 | AI    |
| ADMIN‑RPC‑01 | TASK | ☐      | `admin.approveStudentLeader` RPC.        | • Admin-only. Sets `role=LEADER`, `roleStatus=APPROVED/REJECTED`.<br/>• Triggers notification to user on status change.                   |             | AI    |

### 3️⃣ Page Wiring & UI

| ID         | Type | Status | Description                                             | Sub‑Tasks                                                                                                                                                | Blocks →   | Owner |
| :--------- | :--- | :----- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---- |
| PROF‑UI‑01 | TASK | ☐      | Build `ProfileHeader`.                                  | • Display Avatar, Display Name, @handle.<br/>• Handle long name wrapping gracefully.<br/>• Show skeleton state while loading.<br/>• Show ✏️ Edit button. | PROF‑UI‑02 | AI    |
| PROF‑UI‑02 | TASK | ☐      | Build `ProfileStatsStrip`.                              | • Display Posts, Spaces, Followers counts.<br/>• Handle zero state for posts.<br/>• Hide Followers count in vBETA with a "Coming Soon" tooltip.          | PROF‑UI‑03 | AI    |
| PROF‑UI‑03 | TASK | ☐      | Build `ProfileTileGrid` with View/Edit modes.           | • `View Mode`: Static grid.<br/>• `Edit Mode`: Enable drag-and-drop via `framer-motion`, show `AddTilePlaceholder`.<br/>• Toggle via Edit button.        | PROF‑UI‑04 | AI    |
| PROF‑UI‑04 | TASK | ☐      | Build `CalendarTile`.                                   | • Fetch data via `profile.getCalendarEvents`.<br/>• Implement `loading`, `no events`, `events listed`, and `sync error` states.                          |            | AI    |
| PROF‑UI‑05 | TASK | ☐      | Build `HiveLabTile` with role-based states.             | • Implement `Locked` (default student), `Pending` (leader claim), and `Enabled` (approved leader) visual states based on user role.                      |            | AI    |
| PROF‑UI‑06 | TASK | ☐      | Build `AcademicCard` & `ResidentialCard`.               | • Display data from User model.<br/>• Show an empty state with a CTA to complete this info in settings if data is missing.                               |            | AI    |
| PROF‑UI‑07 | TASK | ☐      | Build Modals: `AvatarPickerModal`, `CalendarSyncModal`. | • `AvatarPicker` includes a cropping tool.<br/>• `CalendarSync` has placeholders for Google/.ics integration.                                            |            | AI    |
| PROF‑UI‑08 | TASK | ☐      | Build "Tile Coming Soon" Modal.                         | • Generic modal triggered by clicking disabled tiles (like HiveLab for non-leaders).                                                                     |            | AI    |
| PROF‑UI‑09 | TASK | ☐      | Build `ProfileFirstRunTour`.                            | • A 3-slide, skippable modal component that explains the profile's purpose.                                                                              |            | AI    |
| PROF‑UI‑10 | TASK | ☐      | Build `NewUserProfileState` component.                  | • "Getting Started" card for new users.<br/>• Nudges 3 key actions (Add Major, Avatar, Sync Calendar).<br/>• Collapses after 2/3 are complete.           |            | AI    |
| PROF‑UI‑11 | TASK | ☐      | Implement Edit Mode Save/Cancel Flow.                   | • `Save` triggers optimistic UI update & a success toast.<br/>• `Cancel` (with changes) triggers a confirmation modal.                                   |            | AI    |
| PROF‑UI‑12 | TASK | ☐      | Build `ManageTilesModal`.                               | • Opens a bottom-sheet to toggle visibility of optional tiles (`ResidentialCard`, etc.).                                                                 |            | AI    |

### 4️⃣ Quality & DevOps

| ID           | Type | Status | Description                                  | Sub‑Tasks                                                                                                                                     | Blocks → | Owner |
| :----------- | :--- | :----- | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---- |
| PROF‑QA‑01   | TASK | ☐      | E2E tests for Profile flow.                  | • Test toggling edit mode.<br/>• Test dragging and dropping a tile and verifying the order is saved.<br/>• Test the first-visit tour display. | —        | AI    |
| PROF‑PERF‑01 | TASK | ☐      | Performance & a11y budgets for Profile page. | • Lighthouse mobile ≥ 90.<br/>• Axe-core accessibility score ≥ 95.                                                                            | —        | AI    |

---

## 📋 DECISION LOG

All major decisions must be documented with rationale citing brand principles:

### Pending Decisions

- [ ] **Real-time Architecture:** WebSocket vs Server-Sent Events?
- [ ] **Image Storage:** S3 vs Cloudinary vs local processing?
- [ ] **Analytics Provider:** PostHog vs Mixpanel vs custom solution?

### Architectural Decisions Made

#### ✅ Authentication & Onboarding Decisions (vBETA Slice 1)

**1. Core Authentication Strategy (`HT-AUTH-01`)**

- **Decision:** vBETA will be **Magic-Link-Only**, requiring a `@buffalo.edu` email.
- **Rationale:**
  - `Fewer Edge Cases`: A single auth path allows us to harden the stack before introducing external dependencies.
  - `Clear Campus Gate`: Reinforces the "campus-only" value proposition without confusion from other login methods.
  - `Faster to Launch`: Reduces scope by deferring OAuth integration and permissions management.

**2. Onboarding Step #1 Purpose (`HT-ONBD-04`)**

- **Decision:** The first onboarding screen is for setting the **Display Name only**.
- **Rationale:**
  - `Frictionless Start`: Gives the user an immediate sense of personalization without the cognitive load of filling out a full profile.
  - `Focused Action`: Keeps the first step simple and fast, increasing completion rates. Avatar and other details are deferred to later, more contextual steps.

**3. Handle Generation Logic (`HT-ONBD-05`)**

- **Decision:** User handles will be **generated automatically** based on their Display Name (e.g., `emma-stone-2`).
- **Rationale:**
  - `Removes User Burden`: Eliminates a common source of user friction and decision paralysis (choosing a unique handle).
  - `Memorable & Shareable`: Name-based slugs are more human-readable and user-friendly for mentions and URLs than random IDs.
  - `Stable Identity`: The handle is generated once and does not change, even if the display name is updated, ensuring stable links.

**4. Routing for Incomplete Onboarding (`HT-AUTH-02`)**

- **Decision:** Any authenticated user with an incomplete onboarding status will be **force-redirected back to their last completed step**.
- **Rationale:**
  - `Data Integrity`: Ensures that all required profile data is collected before a user can access the main application.
  - `Guided Momentum`: Prevents users from getting lost in a partially-functional app state, guiding them to completion.

**5. Magic-Link Email Template (`HT-AUTH-03`)**

- **Decision:** The email will be minimalist and action-oriented, with a clear expiration time.
- **Template:**
  - **Sender:** HIVE
  - **Subject:** 🔑 Your HIVE sign-in link (valid 10 min)
  - **Pre-header:** "Tap once to unlock your campus OS."
  - **Body:** "Hi {First Name}, One tap and you're in. [Enter HIVE] This link expires in 10 minutes..."
- **Rationale:**
  - `Rebellious Clarity`: The copy is direct, secure, and avoids corporate jargon.
  - `Security Without Friction`: Clearly states the purpose and time-limit of the link, building trust.

#### ✅ Platform-Wide Technology Stack

- **UI Framework:** Next.js 15 with App Router (chosen for SSR performance)
- **Styling:** Tailwind CSS + shadcn/ui (chosen for design system consistency)
- **State Management:** React Query + Zustand (chosen for server/client state separation)
- **Type Safety:** TypeScript strict mode (chosen for development velocity)
- **Database:** Firebase / Firestore (chosen for rapid development and real-time features)

#### ✅ Profile Slice Decisions (June 2025)

| ID         | Question                  | Decision                                                                                                                                                                 | Rationale                                                                      |
| :--------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| HT-PROF-01 | Empty-state CTA behavior? | **Inline bottom-sheet modal.** Buttons on empty cards (`Academic`, `Residential`) slide up a contextual form sheet without the user leaving the profile page.            | Keeps the user in context, reducing friction compared to a full-page redirect. |
| HT-PROF-02 | Which tiles are optional? | **`AcademicCard` is required & fixed.** `ResidentialCard` and future personal tiles are optional and can be hidden via the `ManageTilesModal`.                           | Balances required institutional data with user personalization.                |
| HT-PROF-03 | Public Profile data?      | **Public view is a curated subset.** Shows: Avatar, Names, Handle, Stats (Posts/Spaces), and `AcademicCard` (if present). All other tiles and edit controls are private. | Protects user privacy by default while still allowing for public identity.     |

_This blueprint ensures every feature serves a clear user need while maintaining technical excellence and brand consistency. Each story can be implemented, tested, and validated independently while contributing to a cohesive product experience._

---

## PAGE 4 – /feed Surface – Full Task & Sub-Task Checklist

**User Story:** As a new HIVE student, I want to view a central feed that shows me timely announcements, countdowns to important events, and progress on unlocking new community spaces, so I feel connected and informed about what's happening on campus even before I can post myself.

**Business Value:** The vBETA feed acts as a narrative engine, building anticipation and demonstrating platform value before user-generated content is available. This pre-engagement is crucial for converting newly onboarded users into active, long-term members. It establishes `/feed` as the primary destination for "what's new."

### 1️⃣ Foundation & Environment

| ID           | Type     | Status | Description                                          | Sub‑Tasks                                                                                                                                | Blocks →   | Owner |
| :----------- | :------- | :----- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---- |
| FEED‑BOOT‑01 | TASK     | ☐      | Set up `/feed` as the primary authenticated route.   | • Post-onboarding, users should land here.<br/>• Should be the default destination from nav bar.                                         | ONBD‑UI‑06 | AI    |
| FEED‑BOOT‑02 | TASK     | ☐      | Configure real-time subscription client.             | • Integrate client-side library (e.g., Pusher, Ably) to listen to a `feed-updates` channel.<br/>• Handle connection/disconnection logic. |            | AI    |
| FEED‑BOOT‑03 | DECISION | ☐      | Is the `AnnouncementBanner` dismissible by the user? | • If yes, `isDismissed` needs to be stored client-side (e.g., localStorage). If no, it persists until an admin removes it.               | FEED‑UI‑05 | Human |

### 2️⃣ Data Layer & RPC

| ID           | Type | Status | Description                                          | Sub‑Tasks                                                                                                                                                               | Blocks →     | Owner |
| :----------- | :--- | :----- | :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- | :---- |
| FEED‑DATA‑01 | TASK | ☐      | Define `FeedItem` discriminated union type.          | • Create a `FeedItem` type in `@hive/core` that can be one of: `RitualTimer`, `Announcement`, `SpaceUnlockTeaser`, `PollResult`, `EventSpotlight`.                      | FEED‑RPC‑01  | AI    |
| FEED‑DATA‑02 | TASK | ☐      | Define models for each card type.                    | • Each model should include all fields from the spec (e.g., `endsAt`, `isPinned`, `severity`).                                                                          | FEED‑DATA‑01 | AI    |
| FEED‑RPC‑01  | TASK | ☐      | Implement `feed.getFeed` RPC with cursor pagination. | • Accepts `cursor` param to fetch next page.<br/>• Returns `{ items: FeedItem[], nextCursor: string }`.<br/>• Pinned items should always be at the top on initial load. | FEED‑UI‑02   | AI    |
| FEED‑RPC‑02  | TASK | ☐      | Implement backend logic to push real-time updates.   | • Create a server-side function that broadcasts a message to the `feed-updates` channel whenever a high-priority new item is added to the feed.                         | FEED‑BOOT‑02 | AI    |

### 3️⃣ Page Wiring & UI

| ID         | Type | Status | Description                                | Sub‑Tasks                                                                                                                                             | Blocks →   | Owner |
| :--------- | :--- | :----- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---- |
| FEED‑UI‑01 | TASK | ☐      | Build `FeedPage` shell UI.                 | • Top Bar that hides on scroll.<br/>• Disabled FAB with "Posting opens soon" tooltip.<br/>• Main scrollable container with pure `#0A0A0A` background. |            | AI    |
| FEED‑UI‑02 | TASK | ☐      | Implement data fetching logic with states. | • Initial load shows skeleton cards.<br/>• Implement pull-to-refresh & infinite scroll using the `feed.getFeed` RPC.<br/>• Handle empty/error states. | FEED‑UI‑09 | AI    |
| FEED‑UI‑03 | TASK | ☐      | Implement real-time update toast.          | • On message from `feed-updates` channel, show a "New updates" toast.<br/>• Tapping the toast should trigger a refresh of the feed.                   |            | AI    |
| FEED‑UI‑04 | TASK | ☐      | Build `RitualTimerCard`.                   | • Shows a live countdown to `endsAt`.<br/>• Tapping navigates to `/ritual/{id}`.                                                                      |            | AI    |
| FEED‑UI‑05 | TASK | ☐      | Build `AnnouncementBanner`.                | • Renders HTML content safely.<br/>• Styles based on `severity`.<br/>• Implement dismiss logic if approved in `FEED-BOOT-03`.                         |            | AI    |
| FEED‑UI‑06 | TASK | ☐      | Build `SpaceUnlockTeaserCard`.             | • Visualizes `percent` progress.<br/>• Tapping shows a disabled modal.                                                                                |            | AI    |
| FEED‑UI‑07 | TASK | ☐      | Build `PollResultCard`.                    | • Renders a view-only bar chart of poll results.                                                                                                      |            | AI    |
| FEED‑UI‑08 | TASK | ☐      | Build `EventSpotlightCard`.                | • Displays key event info.<br/>• Tapping navigates to `/events/{id}`.                                                                                 |            | AI    |
| FEED‑UI‑09 | TASK | ☐      | Build `EmptyStateCard`.                    | • Shows an illustration and CTA to another part of the app (e.g., "Open Calendar") if the feed is empty.                                              |            | AI    |

### 4️⃣ Quality & DevOps

| ID           | Type | Status | Description                               | Sub‑Tasks                                                                                                                                     | Blocks → | Owner |
| :----------- | :--- | :----- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---- |
| FEED‑QA‑01   | TASK | ☐      | E2E tests for Feed interactions.          | • Test infinite scroll and pull-to-refresh.<br/>• Mock a real-time event and assert the toast appears.<br/>• Test navigation from a card CTA. | —        | AI    |
| FEED‑PERF‑01 | TASK | ☐      | Performance & a11y budgets for Feed page. | • LCP < 2.5s.<br/>• List virtualization should be used for the feed.<br/>• Axe-core accessibility score ≥ 95.                                 | —        | AI    |
