# HIVE vBETA Whitepaper: Authentication & Onboarding

**Status:** Finalized for vBETA
**Owner:** CTO
**Last Updated:** 2024-07-22

## 1. Executive Summary & Product Philosophy

This document defines the architecture and philosophy of the HIVE user authentication and onboarding experience.

**The Philosophy: A Welcome, Not a Barrier.** Our user's first interaction with HIVE must be frictionless, secure, and respectful of their time. We are not building a gauntlet; we are laying out a welcome mat. Every decision detailed below is in service of a single goal: to get a verified student from the landing page to the core value of the application—the live feed—as quickly and gracefully as possible. We build trust by demonstrating competence and simplicity from the very first click.

**The Strategy:** We achieve this through a two-slice strategy:
1.  **Instantaneous Verification (Slice 1A):** We use passwordless magic links tied to `.edu` emails to instantly confirm a user's student status and identity. This eliminates password friction and provides robust, built-in verification.
2.  **Minimum Viable Identity (Slice 1B):** We ask for the absolute minimum information required to bootstrap a user's social presence *after* they are securely inside the app. This respects their momentum and defers deeper profile enrichment until they have experienced the app's value.

---

## 2. The End-to-End User Experience

This is the journey a new student named Alex will take.

1.  **The Spark:** Alex hears about HIVE and navigates to our login page. The page is clean and minimal, conveying confidence. There is one clear instruction: "Enter your .edu address to begin."
2.  **The Key:** Alex enters `alex@ubuffalo.edu` and clicks "Send magic link." The button provides instant feedback, changing to a "Sending..." state, then a "✅ Check your inbox!" confirmation. Alex feels the system is responsive and working.
3.  **The Bridge:** Alex opens their email and sees a message from HIVE with the subject "Your HIVE sign‑in link is here ✨". The email is simple, with one large button to "Sign In to HIVE."
4.  **The Handshake:** Clicking the link opens a new tab. It's a verification page that Alex barely registers—it's a momentary, automated handshake. The system validates their token and, recognizing they are a new user, seamlessly redirects them to the onboarding flow.
5.  **The Introduction:** Now inside HIVE, Alex is greeted with a simple, multi-step wizard. It feels like a quick, friendly conversation: "What should we call you?", "What's your major?", "Claim your unique @handle." The process is fast, with smooth transitions.
6.  **The Agreement:** The final step is a clear, concise legal agreement. Alex checks the box and clicks "Enter HIVE."
7.  **The Welcome Mat:** Instead of being dropped into a potentially overwhelming feed, Alex is greeted by a simple, dismissible overlay. It orients them ("Welcome, Alex. You've been added to the 'Computer Science' space."), explains a key UI element ("This is your Feed, where campus life unfolds."), and prompts their first valuable action: "Ready to say hello?" This bridges the gap from onboarding to true engagement. The journey from stranger to member was less than 90 seconds.

---

## 3. UI/UX Interaction Blueprint

This section defines the precise look, feel, and behavior of the user interface. It serves as the bridge between the product vision and the final implementation.

### 3.1 Global Principles

-   **Motion Language:** We aim for an experience that feels fluid but intentional.
    -   *Primary Transitions:* All screen-level or major component transitions (e.g., wizard steps sliding) use a `350ms` `cubic-bezier(0.33,0.65,0,1)` easing curve to feel responsive and high-quality.
    -   *Micro-interactions:* All feedback animations on interactive elements (e.g., button presses, toggle switches) are `90ms` to feel instantaneous and tactile.
    -   *Respect for User Settings:* All motion respects the `prefers-reduced-motion` OS-level setting, falling back to simple cross-fades.

-   **Layout & Spacing:** Consistency is paramount.
    -   *The Card:* All authentication and onboarding screens use a single, centered card with a `max-width` of `392px` on a `bg.canvas` background (`#0A0A0A`). This creates a focused, uncluttered environment, free from the distraction of app navigation.
    -   *The Grid:* Internal padding and spacing within the card adhere strictly to our 4px grid system.

-   **Feedback & State:** The system must communicate its status clearly at all times.
    -   Every user action must result in immediate and unambiguous visual feedback.
    -   Loading states are explicit, disabling interactive elements to prevent duplicate submissions.
    -   Error states are presented inline with the component they relate to, providing clear context and instructions for correction.

-   **Accessibility (a11y):** The product must be usable by everyone.
    -   *Standards:* All components must meet WCAG 2.1 Level AA standards.
    -   *Keyboard Navigation:* All interactive elements must be reachable and operable via keyboard. Focus states must be visually distinct.
    -   *Screen Readers:* All images must have `alt` text, and all inputs must have associated `<label>`s. Semantic HTML is required to ensure a logical reading order.

-   **Internationalization (i18n):** The architecture must be globally ready from day one.
    -   *Implementation:* All user-facing strings must be managed through an i18n framework (e.g., `react-i18next`). Text is not to be hardcoded in components.
    -   *Initial Scope:* For vBETA, only an English (`en.json`) translation file will be populated, but the infrastructure for adding other languages will be in place.

### 3.2 Screen-by-Screen Breakdown

#### Screen 0: School Selection (`/` or `/welcome`)

-   **Visual Hierarchy:**
    1.  HIVE Glyph Logo
    2.  `H1` Headline: "Find your campus."
    3.  A searchable input field with a placeholder like "Search for your school...".
    4.  A scrollable list of schools below. For vBETA, "University at Buffalo" will be pinned to the top as a featured choice.

-   **Interaction Flow:**
    1.  *Search:* User starts typing. The list below filters instantly.
    2.  *Selection:* User taps on a school.
        -   **Scenario A (Active School - e.g., University at Buffalo):** The screen performs a primary transition (slides left over `350ms`) to reveal **Screen 1: Login**. The system now knows the user's intended school.
        -   **Scenario B (Waitlisted School):** The screen performs a primary transition to the **Waitlist Screen**, passing the school's ID in the URL (e.g., `/waitlist/usc`).

#### Screen 1: Login (`/auth/login`)

-   **Visual Hierarchy:**
    1.  HIVE Glyph Logo (subtle, centered)
    2.  `H1` Headline: "Welcome to HIVE"
    3.  `Muted Body` Sub-headline, now context-aware: "Enter your `@buffalo.edu` address to begin."
    4.  Email Input Field
    5.  "Send magic link →" Button

-   **Interaction Flow:**
    1.  *Focus:* User taps or clicks the input field. The 1px border instantly animates to a 2px `accent.gold` border.
    2.  *Input:* Real-time validation now also checks against the selected school's domain.
    3.  *Submission:* User clicks "Send magic link."
        -   **Atomic State Change:** The UI transitions into a `loading` state. The button's text is replaced by a spinner icon and the label "Sending...". The button and input field are disabled.
        -   **Success Transition:** Upon API success, the entire form content cross-fades out over `200ms`. Simultaneously, the Success Panel content ("✅ Check your inbox!", "Didn't get an email? Resend") cross-fades in.
    4.  *Resend Logic:* The "Resend" button is disabled for 60 seconds.

#### Screen W: The Waitlist (`/waitlist/[schoolId]`)

-   **Visual Hierarchy:**
    1.  The selected school's name is displayed prominently (e.g., "University of Southern California").
    2.  `H2` Headline: "Let's bring HIVE to USC."
    3.  A progress bar visually representing `waitlistCount` / 250.
    4.  `Body` text: "Join [X] other students on the waitlist. Once 250 students sign up, we'll unlock HIVE for your campus."
    5.  Email input field and a "Join Waitlist" button.

-   **Interaction Flow:**
    1.  User enters their email and clicks "Join Waitlist."
    2.  On API success, the input and button are replaced with a confirmation message: "You're on the list! We'll email you when HIVE is live at USC."

#### Screen 2: Onboarding Wizard (`/onboarding`)

-   **Persistent Elements:**
    -   **Header:** A static header "Set Up Your Profile" remains at the top throughout all steps.
    -   **Progress Bar:** A thin horizontal bar at the top of the card animates its width to show progress through the steps (e.g., 1/7, 2/7, etc.). This provides a sense of finitude.

-   **Transition Logic:**
    -   *Forward:* On "Next," the current step's content slides out to the left (`-30px`, `opacity: 0`) while the next step's content slides in from the right (`+30px`, `opacity: 0` to `opacity: 1`). The animation uses our primary `350ms` curve.
    -   *Backward:* The "Back" button reverses this animation, reinforcing spatial memory.

-   **Step-by-Step UI & Micro-interactions:**
    -   **Step 1 (Welcome):** Purely informational. No inputs. "Let's set up your profile."
    -   **Step 2 (Name):** Two standard, gold-on-focus input fields. The `Full Name` field is pre-filled based on the user's email (e.g., `jane.doe@...` -> "Jane Doe") but remains fully editable. "Preferred Name" is optional.
    -   **Step 3 (Academics):** The `Major` and `Graduation Year` fields are now pre-filtered or context-aware based on the school selected in Screen 0.
    -   **Step 4 (Handle):**
        -   *Helper Text:* A live character counter `[current]/20` is displayed below the input.
        -   *Error State:* On submission failure (uniqueness check), the input border turns `error` red, helper text appears below (`@handle is already taken.`), and the "Next" button is disabled until the input changes.
    -   **Step 5 (Identity):** A single toggle switch component. It should animate smoothly between "No" and "Yes" states on tap.
    -   **Step 6 (Avatar):**
        -   A large, circular dropzone with a `+` icon.
        -   *Hover:* The circle subtly scales up (1.02x) and the `+` icon may become slightly brighter.
        -   *Interaction:* On click, it opens the native file picker. On successful upload, the component is replaced with an `Image` preview of the cropped avatar. A "Remove" or "Change" button appears.
        -   A clearly visible "Skip for now" link is present below the dropzone at all times.
    -   **Step 7 (Legal):** The "Enter HIVE" button is visually disabled (e.g., lower opacity, no hover effect) until the checkbox is ticked. Ticking the box enables the button.

#### Magic Link Email

-   **Token:** The embedded JWT is secure, single-use, and expires in exactly 15 minutes.
-   **Content:** The template is minimal, mobile-first, and has a single, clear call-to-action.
-   **URL Structure:** The sign-in URL must contain the `schoolId` as a query parameter to persist this context across domains and devices (e.g., `.../auth/verify?schoolId=suny-buffalo&token=...`).

#### Verification Page (`/auth/verify`)

-   This page has no visible UI. It is a functional endpoint that processes the token from the URL.
-   **Logic:** If token is valid & user is new -> Redirect `/onboarding`. If token is valid & user exists -> Redirect `/`. If token is invalid/expired -> Redirect `/auth/expired`.

---

## 4. Core Features & Business Logic

| Feature/Component | Microfeatures & Business Logic |
| :--- | :--- |
| **Login Page (`/auth/login`)** | - **Input:** Accepts only validly formatted email addresses. A `.edu` suffix is required; an error message appears otherwise. <br> - **Button States:** `Active` (default), `Loading` ("Sending...", spinner icon, disabled), `Success` ("✅ Check your inbox!"). <br> - **Resend Throttle:** The "Resend" button that appears on success is disabled for 60 seconds to prevent email spam. |
| **Magic Link Email** | - **Token:** The embedded JWT is secure, single-use, and expires in exactly 15 minutes. <br> - **Content:** The template is minimal, mobile-first, and has a single, clear call-to-action. |
| **Verification Page (`/auth/verify`)** | - This page has no visible UI. It is a functional endpoint that processes the token from the URL. <br> - **Logic:** If token is valid & user is new -> Redirect `/onboarding`. If token is valid & user exists -> Redirect `/`. If token is invalid/expired -> Redirect `/auth/expired`. |

### Slice 1B: Initial Onboarding

| Feature/Component | Microfeatures & Business Logic |
| :--- | :--- |
| **Onboarding Wizard (`/onboarding`)** | - This is a mandatory, blocking flow for any user with `onboardingComplete: false`. App navigation is hidden. <br> - **State:** Wizard progress is held in client-side state, resilient to a page refresh. |
| **Step: Name** | - `Full Name` is required. `Preferred Name` is optional to foster inclusivity. |
| **Step: Academics** | - `Major` is a searchable dropdown. `Graduation Year` is a simple dropdown. |
| **Step: Handle** | - **Validation:** Uniqueness is checked against the `handles` collection *on submission* of the step, not on keystroke. <br> - **Format:** Handles must be 3-20 characters, lowercase letters, numbers, and underscores only. This is validated on the client and server. |
| **Step: Identity** | - The "Are you a student leader?" toggle sets a boolean `isBuilder` flag. This choice can be changed later in settings. |
| **Step: Avatar** | - This step is entirely optional. Users can skip it to reduce friction. |
| **Step: Legal** | - The "Enter HIVE" button is disabled until the ToS/Privacy checkbox is checked. <br> - `legalAcceptedAt` is timestamped on the server upon final submission. |

---

## 5. Error Handling & Edge Cases

-   **Invalid Email:** If a user enters a non-`.edu` address, an inline error message appears: "Please use a valid .edu email address."
-   **Expired/Invalid Token:** The `/auth/expired` page clearly explains the issue ("This link has expired.") and provides a single action: "Request a new link," which returns them to `/auth/login`. This prevents user confusion and frustration.
-   **Handle Taken:** If a user tries to claim a handle that is already taken, an inline error appears: "`@handle` is already taken. Please choose another."
-   **Onboarding Failure:** If the final `completeOnboarding` function fails for any reason (e.g., network error), the user remains on the final step of the wizard, an error message is shown (e.g., "Something went wrong, please try again."), and the button becomes clickable again. Data is not lost.

---

## 6. Technical & Security Architecture

### Data Models
*The schemas are the strict source of truth for our database structure.*

**`schools/{schoolId}`**
```json
{
  "schoolId": "suny-buffalo",
  "name": "University at Buffalo",
  "domain": "buffalo.edu",
  "status": "active", // or "waitlist"
  "waitlistCount": 0
}
```

**`schools/{schoolId}/waitlist_entries/{entryId}`**
```json
{
  "email": "student@other.edu",
  "createdAt": "timestamp"
}
```

**`users/{uid}`**
```json
{
  "uid": "user-id-from-firebase-auth",
  "email": "student@university.edu",
  "emailVerified": true,
  "onboardingComplete": true, // or false
  "schoolId": "suny-buffalo", // New field to link user to their school
  "createdAt": "timestamp",
  // --- Fields below are null until onboarding is complete ---
  "fullName": "Jane Doe",
  "preferredName": "Jane",
  "major": "Computer Science",
  "gradYear": 2025,
  "handle": "jane",
  "isBuilder": true,
  "avatarUrl": "url-to-storage-image",
  "legalAcceptedAt": "timestamp"
}
```

**`handles/{handle}`**
```json
{
  "uid": "user-id-from-firebase-auth"
}
```
*This collection exists purely for rapid, unique handle lookups. The document ID is the handle itself, stored in lowercase.*

### Security Model
*Our security is proactive, defined in code via Firestore Rules, not reactive.*

-   **Firestore Rules (`schools`):**
    -   This collection is read-only for clients.
    -   The `waitlistCount` can only be incremented by the trusted `joinWaitlist` Cloud Function.
-   **Firestore Rules (`users`):**
    -   A user can only read or write their own document. (`request.auth.uid == resource.id`).
    -   A user document can only be created by the trusted `verifyMagicLink` function.
    -   The core profile fields can only be written once, during the `completeOnboarding` transaction.
-   **Firestore Rules (`handles`):**
    -   A `handles` document can only be **created**. Updates and deletes are forbidden.
    -   Creation is only allowed if the document does not already exist and is triggered by the trusted `completeOnboarding` function.
-   **Cloud Functions:**
    -   `joinWaitlist`: A new public function that validates the email, increments the school's `waitlistCount`, and adds the email to the sub-collection.
    -   `sendMagicLink` and `verifyMagicLink` are implemented via the client-side Firebase SDK, which calls Firebase's own backend. Our serverless functions are for our own business logic.
    -   All other functions (`checkHandleUniqueness`, `completeOnboarding`) are callable only by authenticated users.

-   **Environment Strategy:**
    -   The entire system must operate across three distinct environments: `development`, `staging`, and `production`.
    -   Each environment will have its own completely separate Firebase project to ensure data isolation and reliable testing.
    -   Environment-specific secrets (API keys, etc.) will be managed through a secure vault solution.

---

## 7. Future-Proofing & Scalability

-   **Alternative Login Methods:** This two-slice flow is adaptable. A future SSO integration (e.g., Shibboleth) would simply become another method within Slice 1A to get a verified user to the onboarding gate.
-   **Progressive Profile Enrichment:** The system is designed for future profile questions (e.g., "What are your interests?", "What clubs are you in?") to be asked contextually within the app, long after initial onboarding is complete. This avoids bloating the initial sign-up process.
-   **Role-Based Access:** The `isBuilder` flag is a simple boolean but lays the groundwork for a more complex role-based access control (RBAC) system in the future.
-   **Observability & Support:** The detailed event tracking and clear data models defined in this plan are the foundation for building our operational dashboards and internal support tools, allowing us to manage the user experience proactively.
-   **Data Fetching:** With the adoption of React 19, new components should leverage the `use()` hook for suspense-powered, streamlined data fetching, reducing boilerplate for loading and error states. 