# HIVE vBETA Completion Checklist

## How to use this file

- Work strictly top‑to‑bottom within your team's section.
- Each task is prefixed with an ID (e.g. T1-FND-03). Use it in commit messages. The prefix indicates the team (T1/T2/T3).
- AI/human marks tasks done by replacing [ ] with [x].
- **Verification Protocol:** A task is only "done" when accompanied by verifiable evidence.
  - The AI must add a sub-bullet with `Evidence:` containing links to PRs, Storybook stories, test runs, or Vercel previews.
  - For UI tasks, the human partner's primary role is to visually verify the component's quality, variants, and responsiveness in Storybook before approving the task. The AI will always provide many options. 
  - The human partner's role is to review this evidence to confirm completion.
- All tasks must pass CI before being marked complete.

## Parallel Team Structure

**This checklist is designed for three independent teams working in parallel:**
- **Team 1: Entry & Identity** - Authentication, Onboarding, Profiles, Admin
- **Team 2: Social Infrastructure** - Spaces, Feed, Interactions
- **Team 3: Creation Engine** - HiveLAB, Tools, Elements, Builder Experience

**Integration Points:** Each team has clearly marked integration dependencies that will be resolved in Phase 3.

---

## Phase 0 – Shared Foundation (All Teams)

### Repository & Tooling
- [x] FND-01: Initialize monorepo structure (apps/, packages/, etc.)
- [x] FND-02: Set up Turborepo + pnpm workspace
- [x] FND-03: Configure ESLint + Prettier + Husky
- [x] FND-04: Set up GitHub Actions CI (lint, type-check, test)
- [x] FND-05: Configure Vercel deployment + preview URLs
  - Evidence: Staging environment configured and confirmed operational.
- [ ] FND-06: Set up branch protection rules
- [x] FND-07: Configure VSCode workspace settings

### Design System & Styling
- [x] DSN-01: Set up Tailwind with HIVE tokens (#0A0A0A, #FFD700)
- [x] DSN-02: Configure shadcn/ui with HIVE theme
- [x] DSN-03: Set up Storybook + Chromatic
- [x] DSN-04: Implement core layout components (Container, Stack, Grid)
- [x] DSN-05: Build primitive components (Button, Input, Card)
- [x] DSN-06: Create typography system (Space Grotesk/Inter)
- [x] DSN-07: Implement motion system (Framer Motion configs)
- [x] DSN-08: **Integrate i18n framework (react-i18next)** and configure for English as default language.
- [x] DSN-09: **Establish Accessibility Standards (WCAG 2.1 AA)** and add linting rules to CI.
- [x] DSN-10: **Establish State Management Pattern:** Decide on and document the primary state management solution (e.g., Zustand, Jotai) for shared/complex state.
- [x] DSN-11: **Establish Data Fetching Pattern:** Implement and document the standard for data fetching (e.g., TanStack Query) to handle caching, mutation, and revalidation.
  - Evidence: PR #XYZ - TanStack Query setup, provider, and integration into root layout.

### Firebase Backbone
- [x] FRB-01: Initialize Firebase project
- [x] FRB-02: Set up Firebase Auth (email/password)
- [x] FRB-03: Define Firestore schema (users, spaces, posts)
- [x] FRB-04: Configure security rules
- [x] FRB-05: Set up Firebase hosting
- [x] FRB-06: Configure Firebase emulators
- [x] FRB-07: Set up Cloud Functions scaffold
- [ ] FRB-08: **Set up Analytics Provider:** Configure the chosen analytics provider (e.g., Segment, Mixpanel) and create a core tracking service/hook.

### Environment Strategy
- [ ] FND-10: **Create separate Firebase projects** for `dev`, `staging`, and `prod`.
  - Status: `dev` and `staging` projects are created and configured. `prod` is pending.
- [ ] FND-11: **Implement secrets management solution** (e.g., Vercel Env Vars) to handle environment-specific keys.

### Developer Experience
- [x] DEV-01: Create component generator (pnpm gen component)
- [x] DEV-02: Create page generator (pnpm gen page)
- [x] DEV-03: Create function generator (pnpm gen function)
- [x] DEV-04: Set up Playwright E2E testing
- [x] DEV-05: Configure test DB seeding
- [x] DEV-06: Set up logging system
- [x] DEV-07: Create documentation structure
- [x] DEV-08: Set up documentation site with Docusaurus
- [x] DEV-09: Configure documentation CI/CD pipeline
- [ ] DEV-10: **Create Initial Seed Script:** Develop the baseline database seed script (`dev` and `staging`) with essential data like the first active school.
- [ ] DEV-11: **Mobile Architecture Sync:** Plan one sprint to test mobile performance implications of the Expo SDK 53 / React-Native 0.79 "new architecture" flip.

---

## TEAM 1: Entry & Identity

### T1-Slice 1A: School Selection & Waitlist (`/welcome`)
_**Thesis:** To create a strategic, scalable entry point that allows for controlled rollouts and leverages waitlists as a viral growth engine._
_**User Flow:** A user's first interaction. They select their school. If active, they proceed to login. If not, they are funneled into a waitlist designed to build pre-launch hype._

#### T1-D0.5: Foundational Decisions & Mandates
- **[x] Technical Decisions**
  - [x] **Data Store:** We will use Firestore for the `schools` collection due to its scalable querying and robust security rules, which are essential for managing public and private data.
  - [x] **Backend Logic:** The `joinWaitlist` action must be a single, atomic Cloud Function transaction. This ensures the waitlist count and the user's entry are never out of sync.
- **[x] Business Logic Decisions**
  - [x] **Waitlist Threshold:** The threshold to unlock a new school is `250` signups. This is a deliberate balance between achievability and demonstrating genuine demand.
  - [x] **Controlled Rollout:** The `status` field ('active' vs. 'waitlist') is our core mechanism for staggering the launch across different campuses without requiring new deployments.
- **[x] Brand-Aligned Micro-Features & UX**
  - [x] **Hype-Building Language:** All copy on the waitlist page must be energetic and exclusive (e.g., "Help unlock HIVE at your campus," "Be the first to know").
  - [x] **The Viral Multiplier:** We must address the "Waitlist Dead End." After joining, the page must transform into a gamified recruitment mission with a unique share link and progress bar. This turns every user into a potential evangelist.
- **[x] Dependencies & Risks**
  - [x] **Dependency:** The `/welcome` page UI is blocked until the `schools` collection schema is defined and seeded with initial data.
  - [x] **Risk:** Potential for waitlist spam/bots.
  - [x] **Mitigation:** The `joinWaitlist` function will have basic IP-based rate-limiting. We will monitor for abuse and add CAPTCHA if necessary.

#### T1-D1: Data & Security
- [x] T1-S1A-D0-01: **Define `schools` Schema:** Define the Firestore schema for the `schools` collection. Fields must include `name`, `domain`, `status` ('active' | 'waitlist'), and `waitlistCount`.
  - Evidence: packages/core/src/domain/school.ts
- [x] T1-S1A-D0-02: **Seed `schools` Collection:** Populate the collection with "University at Buffalo" as `active` and 3-5 other schools as `waitlist` to test both flows.
  - Evidence: `firebase/scripts/seed-schools.ts`
- [x] T1-S1A-D0-03: **Define `waitlist_entries` Schema:** Define the schema for the `waitlist_entries` sub-collection under each school document.
  - Evidence: `packages/core/src/domain/waitlistEntry.ts`
- [x] T1-S1A-D0-04: **Implement Security Rules:** Write Firestore rules to make the `schools` collection publicly readable but writable only by admins. The `waitlist_entries` sub-collection should only be writable via the `joinWaitlist` function.
  - Evidence: `firestore.rules` (updated with school and waitlist rules)

#### T1-D2: Domain Logic & Backend
- [x] T1-S1A-D1-01: **Implement `joinWaitlist` Function:** Create a callable Cloud Function that takes a school ID and email, validates the input, and transactionally increments the `waitlistCount` on the school document while adding the user's email to the `waitlist_entries` sub-collection.
  - Evidence: `functions/src/auth/joinWaitlist.ts`

#### T1-D3: UI & Presentation (Page by Page)

- [ ] **Page: `/welcome` (School Selection)**
    - [ ] T1-S1A-D2-01: Build the main layout card.
    - [ ] T1-S1A-D2-02: Implement a searchable input field for school names.
    - [ ] T1-S1A-D2-03: Fetch and display the list of schools from Firestore.
    - [ ] T1-S1A-D2-04: Implement client-side routing logic: on selection, navigate to `/auth/login` for 'active' schools or `/waitlist/[schoolId]` for 'waitlist' schools.
    - [ ] T1-S1A-D2-05: Ensure full keyboard accessibility and screen reader support for the search and list.

- [ ] **Page: `/waitlist/[schoolId]` (Waitlist Form)**
    - [ ] T1-S1A-D2-06: Display the selected school's name and branding.
    - [ ] T1-S1A-D2-07: Implement the waitlist progress bar component, reflecting the `waitlistCount`.
    - [ ] T1-S1A-D2-08: Build the email submission form.
    - [ ] T1-S1A-D2-09: Connect the form to the `joinWaitlist` function, handling loading and error states.
    - [ ] T1-S1A-D2-10: On success, display a confirmation message.

#### T1-D4: Testing & DX
- [ ] T1-S1A-D3-01: **Write Backend Unit Tests:** Unit-test the `joinWaitlist` function.
- [ ] T1-S1A-D3-02: **Write E2E Tests:** Create a Playwright test for the complete flow: selecting a waitlisted school and joining the waitlist.

#### T1-D5: Analytics & Monitoring
- [ ] T1-S1A-D4-01: **Implement Event Tracking:** Track `screen_view` for `/welcome`, `school_selected`, and `waitlist_joined`.

### T1-Slice 1B: Magic Link Login (`/auth/login`)
_**Thesis:** To securely verify a student's identity via their .edu email with zero friction, using the built-in Firebase email service for reliability._
_**User Flow:** Having selected an active school, the user enters their email, clicks a link in their inbox, and is seamlessly authenticated._

#### T1-D0.5: Foundational Decisions & Mandates
- **[ ] Technical Decisions**
  - [ ] **Auth Provider:** We will use Firebase's built-in "Email link" sign-in method. This is for its reliability, security, and to avoid the significant overhead of building and maintaining our own token and email-sending service.
  - [ ] **State Persistence:** We must pass the `schoolId` in the magic link's URL query parameters. This is a critical technical decision to ensure the user's context is maintained if they switch devices or browsers to click the link.
- **[ ] Business Logic Decisions**
  - [ ] **Link Expiry:** The magic link token will have a hard expiry of `15 minutes`. This is a standard security practice to balance user convenience with a reduced window for potential misuse.
  - [ ] **Domain Validation:** The backend logic must validate that the user's submitted email address domain matches the one registered for the given `schoolId`.
- **[ ] Brand-Aligned Micro-Features & UX**
  - [ ] **Custom Email Template:** The magic link email must be styled with HIVE's branding (dark theme, gold accents) to feel like an integral part of the product, not a generic third-party email.
  - [ ] **The "Email Sent" Void:** We must address the friction of sending a user away to their inbox. The UI must provide a polished, optimistic animation (e.g., a paper plane flying off-screen) to bridge the gap and make the experience feel magical.
- **[ ] Dependencies & Risks**
  - [ ] **Dependency:** The entire flow is blocked until the Firebase Auth "Email link" provider is configured in the console and the custom email template is uploaded.
  - [ ] **Risk:** Emails being caught in spam filters.
  - [ ] **Mitigation:** We will use a custom domain for sending Firebase Auth emails and include clear UI text ("Check your spam folder if you don't see it in the next minute").

#### T1-D1: Data & Security
- [ ] T1-S1B-D0-01: **Add `schoolId` to User Schema:** Add the `schoolId` field to the Firestore `users` schema to associate users with their institution.
- [ ] T1-S1B-D0-02: **Refine User Security Rules:** Update security rules to ensure the `schoolId` is set on user creation and cannot be changed.

#### T1-D2: Domain Logic & Backend
- [ ] T1-S1B-D1-01: **Configure Firebase Auth Email Provider:** Enable and configure the "Email link" sign-in method in the Firebase console. Customize the email template to match HIVE's branding.
- [ ] T1-S1B-D1-02: **Implement `sendMagicLink` Logic:** On the client-side, use the Firebase Web SDK's `sendSignInLinkToEmail` function. The `actionCodeSettings` must pass the `schoolId` in the `url` to persist state.
- [ ] T1-S1B-D1-03: **Implement `verifyMagicLink` Logic:** On the `/auth/verify` page, use the Firebase SDK's `isSignInWithEmailLink` and `signInWithEmailLink` functions. Ensure the `schoolId` is read from the URL and persisted.

#### T1-D3: UI & Presentation (Page by Page)

- [ ] **Page: `/auth/login` (Email Entry)**
    - [ ] T1-S1B-D2-01: Build the UI card for email submission.
    - [ ] T1-S1B-D2-02: The email input's placeholder should be context-aware (e.g., "Enter your `@buffalo.edu` address...").
    - [ ] T1-S1B-D2-03: On submit, call the `sendMagicLink` logic and disable the form.
    - [ ] T1-S1B-D2-04: On success, transition the UI to a "Check your inbox" confirmation state.
    - [ ] T1-S1B-D2-05: Ensure full accessibility for the form.

- [ ] **Component: Magic Link Email**
    - [ ] T1-S1B-D2-06: Design and build the responsive, branded HTML email template for the magic link.

- [ ] **Page: `/auth/verify` (Verification Handler)**
    - [ ] T1-S1B-D2-07: This page has no visible UI. Implement the client-side logic to parse the link, call `verifyMagicLink`, and redirect to `/onboarding` (new user) or `/` (returning user).

- [ ] **Page: `/auth/expired` (Error State)**
    - [ ] T1-S1B-D2-08: Implement a clear UI explaining the link is invalid or expired.
    - [ ] T1-S1B-D2-09: Provide a clear call-to-action button to navigate back to `/auth/login` to try again.

#### T1-D4: Testing & DX
- [ ] T1-S1B-D3-01: **Document Firebase Auth Setup:** Add documentation detailing the required Firebase Auth configuration and email template setup.
- [ ] T1-S1B-D3-02: **Write E2E Tests:** Create a Playwright test for the complete login flow using a test email account.

#### T1-D5: Analytics & Monitoring
- [ ] T1-S1B-D4-01: **Implement Event Tracking:** Track `magic_link_sent` and `magic_link_verified`.

### T1-Slice 1C: Initial Onboarding (`/onboarding`)
_**Thesis:** To capture the absolute minimum data required for a personalized vBETA experience immediately after a user's first login._
_**User Flow:** A new user is guided through a mandatory but quick multi-step wizard to create their initial profile._

#### T1-D0.5: Foundational Decisions & Mandates
- **[ ] Technical Decisions**
  - [ ] **Handle Uniqueness:** We will use a separate `handles` collection where the document ID *is* the handle. This allows for a fast, scalable, and cheap uniqueness check with a single document read.
  - [ ] **Transactional Write:** The `completeOnboarding` function must be a single Firestore transaction. This guarantees that creating the user's profile and reserving their unique handle are atomic; if one fails, both are rolled back, preventing data corruption.
- **[ ] Business Logic Decisions**
  - [ ] **Minimum Viable Profile:** The mandatory fields (Name, Major, Handle, Consent) are the absolute minimum required for a personalized vBETA. All other data will be gathered later via progressive disclosure within the app.
  - [ ] **Frictionless Naming:** We will pre-fill the user's name from their email (`jane.doe@...` -> "Jane Doe") to reduce typing, but it must remain fully editable to respect user agency.
- **[ ] Brand-Aligned Micro-Features & UX**
  - [ ] **The "Profile Builder" Illusion:** We must reframe this flow from data entry to an act of creation. The UI will show their public Profile Card being built in real-time on one side of the screen as they complete the steps.
  - [ ] **Celebratory Completion:** On successful completion of the final step, a subtle but premium confetti or spark animation will trigger, providing a moment of delight and celebrating their arrival.
- **[ ] Dependencies & Risks**
  - [ ] **Dependency:** The "Academics" step of the wizard is blocked until the static list of University at Buffalo majors is created and available to the frontend.
  - [ ] **Risk:** User abandonment during the wizard.
  - [ ] **Mitigation:** The primary mitigation is the "Profile Builder" UI to maintain engagement. We will also implement granular analytics for each step to identify specific drop-off points for future optimization.

#### T1-D1: Data & Security
- [ ] T1-S1C-D0-01: **Finalize User Schema:** Ensure all profile fields (`fullName`, `major`, `handle`, etc.) are defined in the Firestore `users` schema.
- [ ] T1-S1C-D0-02: **Define `handles` Collection:** Create the `handles` collection for ensuring uniqueness.
- [ ] T1-S1C-D0-03: **Implement All Security Rules:** Write and test the final security rules for both `users` and `handles` collections related to the onboarding transaction.

#### T1-D2: Domain Logic & Backend
- [ ] T1-S1C-D1-01: **Implement `checkHandleUniqueness` Function:** Create the callable Cloud Function to check for a document's existence in the `handles` collection.
- [ ] T1-S1C-D1-02: **Implement `completeOnboarding` Function:** Create the transactional Cloud Function to validate all onboarding data and perform the two writes (`users` and `handles`).
- [ ] T1-S1C-D1-03: **Source UB Majors Data:** Create a static list or JSON file containing the official list of University at Buffalo majors to populate the dropdown.

#### T1-D3: UI & Presentation (Page by Page)

- [ ] **Component: Onboarding Wizard Shell**
    - [ ] T1-S1C-D2-01: Build the main wizard component, including the persistent header, progress bar, and forward/backward transition animations.

- [ ] **Page: `/onboarding` (The Wizard Flow)**
    - [ ] T1-S1C-D2-02: **Step 1 (Welcome):** Build the purely informational welcome screen.
    - [ ] T1-S1C-D2-03: **Step 2 (Name):** Build the name input screen. Pre-fill the `fullName` field from the user's email, but keep it editable.
    - [ ] T1-S1C-D2-04: **Step 3 (Academics):** Build the major/grad year selection screen. The major dropdown should be populated from the UB Majors data file.
    - [ ] T1-S1C-D2-05: **Step 4 (Handle):** Build the handle creation screen. Implement real-time, debounced validation against the `checkHandleUniqueness` function.
    - [ ] T1-S1C-D2-06: **Step 5 (Photo):** Build the optional profile photo upload screen.
    - [ ] T1-S1C-D2-07: **Step 6 (Builder Opt-in):** Build the screen with the "Become a Builder" toggle.
    - [ ] T1-S1C-D2-08: **Step 7 (Legal):** Build the final screen with links to legal docs and the consent checkbox. The "Enter HIVE" button is disabled until consent is checked. Connect the final submit to the `completeOnboarding` function.
    - [ ] T1-S1C-D2-09: Ensure all wizard steps are fully accessible.

- [ ] **Component: "Welcome Mat" Overlay**
    - [ ] T1-S1C-D2-10: Build the simple, dismissible overlay component that is displayed upon arrival to the feed.

- [ ] **Pages: `/terms-of-service` & `/privacy-policy`**
    - [ ] T1-S1C-D2-11: Build the two static pages and populate them with the finalized legal text.

#### T1-D4: Testing & DX
- [ ] T1-S1C-D3-01: **Write Component Stories:** Create Storybook stories for the Onboarding Wizard.
- [ ] T1-S1C-D3-02: **Write Backend Unit Tests:** Unit-test the `checkHandleUniqueness` and `completeOnboarding` functions.
- [ ] T1-S1C-D3-03: **Write E2E Tests:** Create a Playwright test for the entire onboarding flow.
- [ ] T1-S1C-D3-04: **Write Final Documentation:** Update the blueprint with any final implementation details.
- [ ] T1-S1C-D3-05: **Verify Legal Links & Consent Logging:** Manually verify links and check the database to ensure consent is logged.

#### T1-D5: Analytics & Monitoring
- [ ] T1-S1C-D4-01: **Implement Event Tracking:** Track `onboarding_started`, `onboarding_step_completed` (with step name property), and `onboarding_funnel_completed`.

### T1-Slice: Profile System (`/profile` & `/u/[handle]`)
_**Thesis:** To provide users with a private "home base" for managing their campus life and a public "contribution card" that showcases their identity through actions, not just static info._

#### T1-D0.5: Foundational Decisions & Mandates
- **[ ] Technical Decisions**
  - [ ] **Public/Private Split:** User data will be split between public fields (visible on `/u/[handle]`) and private fields (only visible to the user on `/profile`). This is enforced via Firestore security rules.
  - [ ] **Handle Immutability:** Once set during onboarding, handles cannot be changed. This prevents impersonation and broken links.
  - [ ] **Personal Tools:** Each user profile will have its own `personalTools` collection, allowing users to create and manage tools directly from their profile, independent of spaces.
- **[ ] Business Logic Decisions**
  - [ ] **Activity-Based Identity:** The public profile emphasizes what the user *does* (spaces joined, tools created) over static bio information. This aligns with HIVE's action-oriented philosophy.
  - [ ] **Privacy by Default:** Users must explicitly opt-in to make their profile publicly viewable. This respects user privacy while encouraging openness.
  - [ ] **Tool Creation Access:** While HiveLAB is initially builder-only, the personal profile tools feature will be available to all users, serving as a preview of the future HiveLAB expansion.
- **[ ] Brand-Aligned Micro-Features & UX**
  - [ ] **Motion Log:** A unique feature showing the user's last 90 days of activity as a visual timeline. This reinforces the idea that HIVE is about movement and participation.
  - [ ] **"Now" Tile:** An auto-generated status based on current context (e.g., "In class until 3pm" or "Active in Computer Science Majors").
  - [ ] **Personal Tool Gallery:** A dedicated section in the profile for managing personal tools, with a clear upgrade path to HiveLAB for more advanced features.
- **[ ] Dependencies & Risks**
  - [ ] **Integration Dependency:** The profile's "My Spaces" and "My Tools" sections depend on Team 2 and Team 3's work.
  - [ ] **Risk:** Users may not understand the public/private distinction.
  - [ ] **Mitigation:** Clear UI indicators and a preview of "what others see" on the settings page.
  - [ ] **Risk:** Confusion between personal tools and space tools.
  - [ ] **Mitigation:** Clear UI differentiation and tooltips explaining the distinction.

#### T1-D1: Data & Security
- [ ] T1-PRO-D0-01: **Define Profile Data Models:** Implement the Firestore schemas for `users/{uid}`, the `users/{uid}/motion` sub-collection, and the `personalTools/{uid}` collection.
- [ ] T1-PRO-D0-02: **Implement Profile Security Rules:** Write and test Firestore rules for public vs. private data access, owner-only edits, handle uniqueness, and motion log clearing.

#### T1-D2: Domain Logic & Backend
- [ ] T1-PRO-D1-01: **Create Profile Update Function:** Build a Cloud Function to update user profile fields (e.g., name, major).
- [ ] T1-PRO-D1-02: **Implement "Now" Tile Logic:** Create a daily scheduled Cloud Function to generate the "Now" tile text based on priority rules.
- [ ] T1-PRO-D1-03: **Implement Data Export Function:** Create a callable Cloud Function to generate and return a JSON export of the user's data.
- [ ] T1-PRO-D1-04: **Implement Privacy Toggle Logic:** Add backend logic to toggle the `isPublic` flag on a user's profile.

#### T1-D3: UI & Presentation (Page by Page)

- [ ] **Page: `/profile` (Private Dashboard)**
    - [ ] T1-PRO-D2-01: Build the main profile layout with tabs for "Overview", "Activity", and "Settings".
    - [ ] T1-PRO-D2-02: Implement the "Now" tile display.
    - [ ] T1-PRO-D2-03: Build the Motion Log component with its 90-day timeline visualization.
    - [ ] T1-PRO-D2-04: Create placeholder sections for "My Spaces" and "My Tools" (to be integrated with Team 2/3).
    - [ ] T1-PRO-D2-05: Build the 7-day events strip component.

- [ ] **Page: `/u/[handle]` (Public Profile)**
    - [ ] T1-PRO-D2-06: Build the public profile card layout.
    - [ ] T1-PRO-D2-07: Implement the 404 state for non-existent or private profiles.
    - [ ] T1-PRO-D2-08: Display only public information (name, handle, major, joined spaces, created tools).

- [ ] **Component: Profile Settings Modal**
    - [ ] T1-PRO-D2-09: Build the settings modal for editing profile details.
    - [ ] T1-PRO-D2-10: Implement the privacy toggle with a preview of the public view.
    - [ ] T1-PRO-D2-11: Add the data export button.

#### T1-D4: Testing & DX
- [ ] T1-PRO-D3-01: **Write Profile Tests:** Write tests for the schema rules, domain logic, and the E2E flow of viewing and editing a profile.
- [ ] T1-PRO-D3-02: **Write Documentation:** Document the public/private profile schemas, data models, and component structure.

### T1-Slice: Admin Dashboard (`/admin`)
_**Thesis:** To provide the internal team with the necessary tools to support users, monitor system health, and make data-driven decisions._

#### T1-D0.5: Foundational Decisions & Mandates
- **[ ] Technical Decisions**
  - [ ] **Access Control:** Admin roles will be managed via Firebase Custom Claims. This is Firebase's native, secure solution for privileged access and is required to properly secure backend functions.
  - [ ] **Secure Functions:** All backend functions serving the admin panel must explicitly check for the `admin: true` custom claim on the caller's token before executing.
- **[ ] Business Logic Decisions**
  - [ ] **vBETA Scope:** The Admin Dashboard's sole purpose for vBETA is user support (lookup, builder approval) and funnel monitoring. It is not a content moderation or site management tool. This is a critical scope-limiting decision.
  - [ ] **Admin Granting:** The process for granting a user an `admin` role is a manual, out-of-band operational task (e.g., running a secure script). It will not be exposed in any UI.
- **[ ] Brand-Aligned Micro-Features & UX**
  - [ ] **Utilitarian UI:** The UI for the admin panel should be clean, functional, and data-dense. It does not need to adhere to the same polished, animation-heavy branding of the consumer app.
- **[ ] Dependencies & Risks**
  - [ ] **Dependency:** The Builder Approval UI is blocked until the "Become a Builder" user flow is implemented in the Spaces slice.
  - [ ] **Risk:** An admin account could be compromised, giving an attacker privileged access.
  - [ ] **Mitigation:** All team members with access to the Firebase project must use 2FA on their Google accounts. Access will be strictly limited to essential personnel.

#### T1-D1: Data & Security
- [ ] T1-ADM-D0-01: **Implement Admin Role:** Use Firebase custom claims to designate certain users as `admin`.
- [ ] T1-ADM-D0-02: **Implement Protected Routes:** Secure all `/admin` routes to be accessible only by users with the `admin` custom claim.

#### T1-D2: Domain Logic & Backend
- [ ] T1-ADM-D1-01: **Implement User Look-up Backend:** Create a secure Cloud Function that allows an admin to fetch a user's document by email or handle.
- [ ] T1-ADM-D1-02: **Implement `grantBuilder` Function:** Create a secure Cloud Function for an admin to grant the `builder` role for a specific space.

#### T1-D3: UI & Presentation
- [ ] T1-ADM-D2-01: **Build Admin Shell:** Create the basic layout for the admin section.
- [ ] T1-ADM-D2-02: **Build User Look-up Tool:** Build the UI for the user look-up tool.
- [ ] T1-ADM-D2-03: **Build Onboarding Funnel Dashboard:** Build the dashboard to visualize the analytics events from Slices 1A, 1B, and 1C.
- [ ] T1-ADM-D2-04: **Build Builder Approval UI:** Create the interface for viewing and approving builder requests.

#### T1-D4: Testing & DX
- [ ] T1-ADM-D3-01: **Write Documentation:** Document the process for granting admin access and using the internal tools.

### T1-Integration Points
_These tasks require coordination with other teams and will be completed in Phase 3._

- [ ] T1-INT-01: **Profile "My Spaces" Integration:** Connect the profile page to display spaces from Team 2's work.
- [ ] T1-INT-02: **Profile "My Tools" Integration:** Connect the profile page to display tools from Team 3's work.
- [ ] T1-INT-03: **Auto-Join Spaces on Onboarding:** Trigger Team 2's auto-join logic after successful onboarding completion.
- [ ] T1-INT-04: **Builder Role Integration:** Connect the builder opt-in during onboarding to Team 2's space builder system.

---

## TEAM 2: Social Infrastructure

### T2-Slice: Spaces — Data & Core Logic
_**Thesis:** To establish the foundational data models, security rules, and business logic for the entire Spaces ecosystem, as defined in the official blueprint._

#### T2-D0.5: Foundational Decisions & Mandates
- **[ ] Technical Decisions**
  - [ ] **Data Model:** We will use a `spaces` root collection and a `members` sub-collection within each space. This allows for efficient querying of space-level data while keeping membership lists scalable and secure.
  - [ ] **Atomicity:** All actions that modify a `memberCount` on a space document (join/leave) must be transactional to prevent data drift.
- **[ ] Business Logic Decisions**
  - [ ] **Auto-Join:** Auto-joining users to Major and Residential spaces on signup is a critical vBETA strategy to ensure no user lands in a totally empty app. They start with a home base.
  - [ ] **Builder Gating:** The first user to request the builder role for a dormant space gets it. For vBETA, we will not handle multi-builder scenarios or conflicts. This is a deliberate simplification to reduce launch scope.
- **[ ] Brand-Aligned Micro-Features & UX**
  - [ ] **The "Icebreaker" Prompt:** We must address the "Empty Room" problem. Every `Activated` space must have a configurable "icebreaker" prompt in its post feed, turning a dead end into an invitation.
- **[ ] Dependencies & Risks**
  - [ ] **Dependency:** The `Auto-Join Logic` is critically dependent on the `user.major` field being correctly set during the Onboarding slice.
  - [ ] **Risk:** A user could manually leave their auto-joined spaces, leaving them with no communities.
  - [ ] **Mitigation:** This is an accepted risk for vBETA. In the future, we can build a "Recommended Spaces" feature to re-engage these users, but for now, we prioritize user agency.

#### T2-D1: Data & Security
- [ ] T2-SPC-D0-01: **Define `spaces` Schema:** Implement the Firestore schema for the `spaces` collection. Fields must include `name`, `description`, `bannerUrl`, `memberCount`, `tags` (`type`, `sub_type`), and `status` ('dormant', 'activated', 'frozen').
- [ ] T2-SPC-D0-02: **Define `members` Sub-collection Schema:** Implement the schema for the `/spaces/{id}/members` sub-collection, with fields for `role` ('member', 'builder') and `joinedAt`.
- [ ] T2-SPC-D0-03: **Write & Test Security Rules:** Implement and unit-test all Firestore security rules, covering read access, join/leave permissions, and builder-only write access to space details.

#### T2-D2: Domain Logic & Backend
- [ ] T2-SPC-D1-01: **Implement Auto-Join Logic:** Create a Cloud Function triggered on user creation that adds the user to their relevant Major and Residential spaces based on their profile data.
- [ ] T2-SPC-D1-02: **Implement Manual Join/Leave Logic:** Create callable Cloud Functions for `joinSpace` and `leaveSpace`. These must transactionally update the `memberCount` and manage the `members` sub-collection.
- [ ] T2-SPC-D1-03: **Implement "Become a Builder" Logic:** Create the callable Cloud Function for a user to request the builder role. This should simply flag their membership document for admin review.
- [ ] T2-SPC-D1-04: **Implement Builder Capabilities Backend:**
    - Add backend logic to allow a builder to edit the space's `description` and `bannerUrl`.
    - Create stubs for pinning posts and featuring tools, which will be fully implemented in later slices.

### T2-Slice: Spaces — UI & Discovery
_**Thesis:** To build the user-facing discovery and container components of a Space, allowing users to find, join, and understand a community's purpose._

#### T2-D3: UI & Presentation (Page by Page)

- [ ] **Page: `/spaces` (Discovery Directory)**
    - [ ] T2-SPC-D2-01: Build the main page layout with a search bar and header.
    - [ ] T2-SPC-D2-02: Implement the filter pills based on the `