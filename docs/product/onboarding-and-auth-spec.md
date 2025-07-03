# HIVE Onboarding & Authentication: Product Specification

**Version:** 1.0
**Status:** DRAFT
**Author:** HIVE AI Product Architect
**Last Updated:** {{current_date}}

## 1. Overview & Vision

This document outlines the complete product, technical, and user experience requirements for the HIVE authentication and new user onboarding flow.

The primary goal is to create a secure, frictionless, and engaging entry point into the HIVE ecosystem for university students. Our north star is a "magic link" system that feels modern, secure, and seamlessly transitions new users from signup to their first meaningful interaction in the app within 90 seconds.

## 2. Target Audience & User Stories

### 2.1. Personas

-   **New Student (`isNewUser: true`):** A university student who has never used HIVE before. They have a valid `.edu` email address but no existing account.
-   **Returning User (`isNewUser: false`):** An existing user who has already completed the onboarding flow. They are logging back in on a new device or after their session has expired.
-   **Waitlisted Student:** A student from a university not yet fully supported by HIVE.

### 2.2. Core User Stories

-   **AUTH-101:** As a new student, I want to sign up using my `.edu` email address so that I can get a magic link to securely access the platform.
-   **AUTH-102:** As a returning user, I want to log in with my `.edu` email so that I can quickly and securely access my account without a password.
-   **ONBOARD-201:** As a new user, I must choose a unique `@handle` so that I can establish my identity on the platform.
-   **ONBOARD-202:** As a new user, I must provide my full name, major, and academic year so that my profile is personalized and I can connect with relevant peers.
-   **ONBOARD-203:** As a new user, I want to be presented with relevant "Spaces" (communities) to join so that I can immediately start discovering content and connections.
-   **SYS-301:** As the system, I must validate that a user's email is from an approved `.edu` domain to maintain the integrity of the campus-specific communities.
-   **SYS-302:** As the system, I must handle users from unsupported schools by adding them to a waitlist to gauge expansion interest.

## 3. Page-by-Page User Flow

This section breaks down the entire journey screen by screen.

---

### **Flow Start: Landing Page (`/`)**

-   **Page Purpose:** The primary entry point for all users.
-   **UI/UX:**
    -   A clean, hero-centric design.
    -   Headline: "The future of campus is here."
    -   Single input field prominently displayed: `[ Enter your .edu email ]`
    -   A single Call-to-Action (CTA) button: `[ Continue → ]`
    -   Subtle links in the footer for "Terms of Service" and "Privacy Policy".
-   **Business Logic & API Calls:**
    1.  User enters email and clicks "Continue".
    2.  **Validation (Client-Side):**
        -   Check if the field is empty.
        -   Check if the email format is valid.
        -   Check if the email ends with `.edu`. If not, display inline error: "Please enter a valid .edu email address."
    3.  **API Call:** `POST /api/auth/magic-link` with `{ email: string }`.
        -   This single endpoint handles both signup and login.
-   **States:**
    -   **Default:** Page as described above.
    -   **Loading:** CTA button shows a loading spinner after submission.
    -   **Success:** The form is replaced by a success message: "Check your inbox! We've sent a magic link to `user@school.edu`."
    -   **Error (e.g., Network Failure):** A toast notification appears: "Something went wrong. Please try again."
    -   **Waitlist:** If the API determines the school is not yet supported, the message changes: "We're not at your campus yet, but you've been added to the waitlist!"

---

### **Flow Midpoint: Email & Authentication**

#### **1. The Magic Link Email**

-   **Template:** Use the template at `docs/firebase-auth-email-template.html`.
-   **Content:**
    -   Subject: "Your HIVE Login Link"
    -   Body: "Welcome to HIVE! Click the button below to log in to your account."
    -   CTA Button: `[ Log In to HIVE ]`
    -   Security warning: "This link will expire in 15 minutes. If you didn't request this, you can safely ignore this email."

#### **2. Auth Callback Handler (`/auth/callback`)**

-   **Page Purpose:** A server-side route (not a visible page) that handles the magic link token.
-   **Business Logic:**
    1.  Firebase Auth verifies the token from the magic link.
    2.  On successful verification, a session cookie is created.
    3.  The system checks if a user profile exists in Firestore at `users/{uid}`.
    4.  **Decision Routing:**
        -   **If `user` document exists (`isNewUser: false`):** Redirect to `/feed`.
        -   **If `user` document does NOT exist (`isNewUser: true`):** Redirect to `/onboarding/welcome`.
        -   **If token is invalid/expired:** Redirect to `/auth/error?code=invalid_token`.

---

### **Flow Branch: New User Onboarding (`/onboarding/*`)**

#### **Page 1: Welcome (`/onboarding/welcome`)**

-   **Page Purpose:** Acknowledge the new user and set expectations for the onboarding process.
-   **UI/UX:**
    -   A warm, welcoming screen.
    -   "Welcome to HIVE, [First Name]!" (If name can be parsed from email, otherwise generic).
    -   Brief text: "Let's get your profile set up. It'll only take a minute."
    -   CTA Button: `[ Let's Go ]` which navigates to the next step.

#### **Page 2: Handle Selection (`/onboarding/handle`)**

-   **Page Purpose:** Allow the user to claim their unique, permanent `@handle`.
-   **UI/UX:**
    -   Headline: "Choose your @handle"
    -   Input field prefixed with `@`.
    -   As the user types, real-time validation occurs.
    -   Helper text shows requirements: "3-20 characters, letters, numbers, and underscores only."
    -   **Real-time feedback:** A small checkmark or 'X' appears next to the input. Text below says "Handle is available!" or "Sorry, that handle is taken."
    -   CTA: `[ Next ]` (disabled until a valid, available handle is entered).
-   **Business Logic & API Calls:**
    -   **Debounced API Call:** `GET /api/auth/check-handle?handle={value}` as user types.
    -   **On 'Next' Click:** `POST /api/onboarding/set-handle` with `{ handle: string }`.

#### **Page 3: Profile Details (`/onboarding/profile`)**

-   **Page Purpose:** Collect essential user information for their profile.
-   **UI/UX:**
    -   Headline: "Tell us about yourself"
    -   Form Fields:
        -   `[ Full Name ]` (Text Input)
        -   `[ Major ]` (Searchable Dropdown/Combobox, populated from `packages/core/src/constants/academics.ts`)
        -   `[ Academic Year ]` (Select Dropdown: Freshman, Sophomore, etc., from `packages/core/src/constants/academic-years.ts`)
    -   CTA: `[ Next ]` (disabled until all fields are filled).
-   **Business Logic & API Calls:**
    -   **On 'Next' Click:** `POST /api/onboarding/update-profile` with the form data.

#### **Page 4: Initial Space Selection (`/onboarding/spaces`)**

-   **Page Purpose:** Get the user to join their first few communities to ensure a populated feed.
-   **UI/UX:**
    -   Headline: "Join a few Spaces to get started"
    -   A curated list of 5-10 "Recommended Spaces" for their university is displayed as cards.
    -   Each card has a "Join" button. User must join at least 3.
    -   A counter shows `(x/3) selected`.
    -   CTA: `[ Finish ]` (disabled until >= 3 spaces are joined).
-   **Business Logic & API Calls:**
    -   **On Page Load:** `GET /api/spaces/recommended` to fetch the list.
    -   **On 'Finish' Click:** `POST /api/onboarding/join-spaces` with `{ spaceIds: [...] }`.

#### **Page 5: Onboarding Complete (Redirect)**

-   **Purpose:** Finalize onboarding and transition the user to the main app experience.
-   **Logic:**
    1.  After the `join-spaces` call is successful, the frontend navigates to `/feed`.
    2.  A "Welcome to HIVE!" toast notification should appear on the feed page for the first visit.

---

## 4. Data Models (Firestore)

-   **`users/{uid}`**
    ```typescript
    interface UserProfile {
      uid: string; // Firebase Auth UID
      email: string; // user@school.edu
      handle: string; // unique, user-selected
      handleLower: string; // for case-insensitive checks
      fullName: string;
      schoolId: string; // e.g., 'university-of-michigan'
      academicYear: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
      major: string; // e.g., 'Computer Science'
      createdAt: Timestamp;
      onboardingCompleted: boolean;
      profileImageUrl?: string;
    }
    ```

-   **`handles/{handle}`** (For uniqueness constraint)
    ```typescript
    interface Handle {
      uid: string; // UID of the user who owns this handle
    }
    ```

-   **`waitlist/{schoolId}/users/{emailHash}`**
    ```typescript
    interface WaitlistEntry {
      email: string;
      schoolId: string;
      createdAt: Timestamp;
    }
    ```

## 5. API & Cloud Functions

-   `POST /api/auth/magic-link`: Takes email, checks against supported schools, sends link or adds to waitlist.
-   `GET /api/auth/callback`: Server-side handler for Firebase token verification.
-   `GET /api/auth/check-handle`: Checks if a handle is already taken.
-   `POST /api/onboarding/set-handle`: Claims a handle for the current user.
-   `POST /api/onboarding/update-profile`: Updates the user's profile with name, major, etc.
-   `GET /api/spaces/recommended`: Fetches suggested spaces for the user's school.
-   `POST /api/onboarding/join-spaces`: Subscribes a user to a list of spaces.

## 6. Acceptance Criteria (Definition of Done)

To consider this epic complete, the following must be true:

-   [ ] A new user can successfully sign up with a valid `.edu` email from a supported school.
-   [ ] A returning user can successfully log in.
-   [ ] The entire onboarding flow (handle, profile, spaces) can be completed.
-   [ ] Upon completion of onboarding, the user is redirected to a populated `/feed`.
-   [ ] Users from unsupported schools are added to the waitlist and notified.
-   [ ] All form inputs have client-side validation.
-   [ ] All API calls have corresponding loading and error states handled in the UI.
-   [ ] Firestore security rules are implemented to protect user data.
-   [ ] The `@handle` selection is case-insensitive and guarantees uniqueness.
-   [ ] The magic link correctly expires and invalid links show a proper error page. 