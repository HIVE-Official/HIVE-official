# HIVE vBETA Master Project Checklist

This document is the single source of truth for the HIVE vBETA project. It is structured as a sequential, feature-sliced plan that the AI will execute one task at a time.

## How We'll Work

1.  **One Task at a Time:** The AI will address one `[ ]` item at a time.
2.  **Human-in-the-Loop:** Before starting a task, the AI will state the objective. For any ambiguities (e.g., copy, design choices), it will define "Human Tasks" (HTs) and await your input.
3.  **Verifiable Evidence:** Upon completing a task, the AI will update this checklist (`[x]`) and provide `Evidence:` with a link to a Vercel preview or Storybook story for your review and approval.
4.  **Sequential Progress:** We will proceed down the list in order, ensuring a stable, incremental build.

---

## Phase 0: Foundation & Hygiene

This phase ensures our development environment is clean, our design system is established, and we're building on solid ground.

-   [ ] **P0-1: Project Cleanup & Verification**
    -   [ ] Fix all existing Storybook indexing errors (`NoMetaError: CSF: missing default export`).
    -   [ ] Run a full workspace lint and type-check to establish a clean baseline (`npx eslint . --max-warnings 15` and `tsc --noEmit`).
    -   `Evidence:` Link to passing CI run.
-   [ ] **P0-2: Core UI & Design System Setup in Storybook**
    -   [ ] Create a `Typography` story to document and display `Space Grotesk` and `Geist` font usage.
    -   [ ] Create a `Colors` story to display the full HIVE color palette (darks, golds, accents).
    -   [ ] Create a `Spacing` story to document the 8dp grid system.
    -   [ ] Enhance the `Button` component story to include all variants (primary, secondary, destructive, text) and states (default, hover, focused, disabled).
    -   `Evidence:` Link to the new Storybook stories.

---

## Phase 1: Early Access MVP (Onboarding & Authentication)

Our first public release. A focused experience to capture user interest and validate our core `.edu` authentication flow.

-   [x] **P1-1: Authentication Flow (The "Front Door")**
    -   [x] Create the master `AuthFlow` component that orchestrates the entire sign-up/login process.
    -   [x] **UI:** Build the `SplashScreen` component with the HIVE logo and tagline.
    -   [x] **UI:** Build the `EmailGate` component for users to enter their `.edu` email address.
    -   [x] **Logic:** Implement client-side validation to ensure only `.edu` emails are submitted.
    -   [x] **Backend:** Hook up the `EmailGate` to the `/api/auth/email/start` endpoint to send the magic link.
    -   [x] **UI:** Build the `CheckYourEmail` component displayed after the user submits their email.
    -   [x] **Routing:** Create the `/auth/verify` page that validates the magic link token.
    -   [x] **UI:** Build success and error states for token verification (e.g., "Login successful," "Link expired").
    -   `Evidence:` Storybook stories for each auth component and a Vercel preview of the complete flow.
-   [x] **P1-2: New User Onboarding**
    -   [x] Create the master `OnboardingFlow` component.
    -   [x] **UI:** Build the `Welcome` step, greeting the user after they first successfully log in.
    -   [x] **UI:** Build the `CreateProfile` step for setting username and full name.
    -   [x] **Logic:** Implement username availability checks against the database.
    -   [x] **Backend:** Hook up profile creation to the `/api/profile` endpoint.
    -   [x] **UI:** Build the `SchoolPledge` step, where user confirms their school affiliation (pre-filled from email).
    -   [x] **UI:** Build the `OnboardingComplete` step, which congratulates the user and directs them to the app.
    -   `Evidence:` Storybook stories for each onboarding step and a Vercel preview.
-   [x] **P1-3: Legal & Compliance**
    -   [x] Create static pages for `Terms of Service`, `Privacy Policy`, and `Community Guidelines`.
    -   [x] Add a required checkbox to the `CreateProfile` step: "I agree to the Terms of Service and Privacy Policy."
    -   `Evidence:` Links to the new legal pages on the Vercel preview.

---

## Phase 2: Core Product MVP (Feed, Profile, Spaces)

The heart of the HIVE experience.

-   [ ] **P2-1: The App Shell & Navigation**
    -   [ ] Build the main application layout (e.g., `AppShell`) with a persistent sidebar and main content area.
    -   [ ] Implement the primary navigation component in the sidebar with links to `Feed`, `Spaces`, and `Profile`.
    -   `Evidence:` Storybook for the `AppShell` and a Vercel preview.
-   [ ] **P2-2: The Feed & Rituals**
    -   [ ] **HT-F1: Define "Rituals".** What is the specific user experience or feature for "Rituals"? (e.g., A daily question? A weekly challenge?). Awaiting your input.
    -   [ ] Build the `FeedPage` layout.
    -   [ ] Build the `Post` component to display post content, author, and timestamp.
    -   [ ] Build the `CreatePost` component for users to write and submit new posts.
    -   [ ] **Backend:** Implement API endpoints for creating and fetching posts in the main feed.
    -   `Evidence:` Vercel preview of the live feed.
-   [ ] **P2-3: User Profile**
    -   [ ] Build the `ProfilePage` layout (header, avatar, user info, tabs).
    -   [ ] Create a "My Posts" tab that displays a feed of only the viewing user's posts.
    -   [ ] **Backend:** Implement API endpoint to fetch a user's profile information and posts.
    -   [ ] **UI:** Build the `EditProfile` modal/page for changing avatar, name, and bio.
    -   [ ] **Backend:** Implement API endpoint for updating profile information.
    -   `Evidence:` Vercel preview of user profile pages.
-   [ ] **P2-4: Spaces (Hivelab)**
    -   [ ] **HT-S1: Define "Hivelab".** Is this a specific type of space, or the name for the overall "Spaces" feature? Awaiting your input.
    -   [ ] Build the `SpacePage` that displays a feed of posts specific to that space.
    -   [ ] Build the `SpaceDiscovery` page to browse and search for existing spaces.
    -   [ ] Implement "Join" and "Leave" functionality for spaces.
    -   [ ] **Backend:** API endpoints for space-specific feeds, joining/leaving, and discovery.
    -   `Evidence:` Vercel preview of Space pages and discovery.

---

## Phase 3: V-Beta Polish & Growth

Features that make the product feel complete, safe, and ready for a wider audience.

-   [ ] **P3-1: Core UX Polish**
    -   [ ] Implement loading skeletons for all data-heavy pages (Feed, Profile, Space).
    -   [ ] Implement empty states for all lists (e.g., "No posts yet," "You haven't joined any spaces").
    -   [ ] Implement a global notification system (toasts) for actions (e.g., "Profile saved," "Space joined").
    -   [ ] Add subtle, purposeful animations (`Framer Motion`) to key interactions.
-   [ ] **P3-2: Moderation & Safety**
    -   [ ] Add a "Report" option to all user-generated content (posts, comments).
    -   [ ] **Backend:** Implement an API endpoint for submitting reports.
-   [ ] **P3-3: Admin Tooling**
    -   [ ] Build a basic admin dashboard (`/admin`).
    -   [ ] **UI:** Build a user lookup tool for admins.
    -   [ ] **UI:** Build a content moderation queue to review reported items.
-   [ ] **P3-4: Analytics**
    -   [ ] Implement basic analytics for key user actions (sign-ups, posts created, spaces joined).

This structure gives us a clear path forward. We will start with `P0-1` to ensure our codebase is healthy before we begin building new features. 