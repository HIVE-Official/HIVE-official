# Revised Plan: Phase 1 - Onboarding & Authentication

**Objective:** Solidify and complete the existing multi-page authentication and onboarding flow, ensuring it's robust, compliant, and provides a seamless user experience.

This document serves as the single source of truth for completing the authentication and onboarding slice, superseding the initial master checklist for this phase. It reflects the current architecture, which uses a standard multi-page routing flow.

---

### P1-A: Authentication Flow Alignment & Completion

*   [x] **P1-A-1: Build `SplashScreen` Component.**
    *   **Task:** Create a reusable `SplashScreen` component in `packages/ui` featuring the HIVE logo and a tagline. This will be used as a loading state or initial entry view.
    *   **Evidence:** Storybook story for the `SplashScreen` is available under `Brand/SplashScreen`.

*   [x] **P1-A-2: Finalize `EmailGate` Page (`/auth/email`).**
    *   **Task:** Review the existing `AuthEmailPage` for robustness. Ensure client-side validation is comprehensive and error handling is clear and user-friendly.
    *   **Evidence:** The page at `/auth/email` now correctly enforces the school domain whitelist.

*   [ ] **P1-A-3: Finalize `Verify` Page (`/auth/verify`).**
    *   **Task:** Review the existing `VerifyPage`. Solidify the UI for all states: "Check your email," "Verifying," "Success," and "Error" (e.g., expired/invalid link).
    *   **Evidence:** Vercel preview demonstrating all four verification states.

---

### P1-B: New User Onboarding Flow

*   [ ] **P1-B-1: Create Master `OnboardingFlow` Orchestrator.**
    *   **Task:** Build the client-side orchestrator component at `/onboarding/[step]` that manages the state and transitions of the multi-step onboarding process.
    *   **Evidence:** Vercel preview of the onboarding shell, navigable between steps.

*   [ ] **P1-B-2: Build `Welcome` Step.**
    *   **Task:** Create the UI for the `/onboarding/welcome` step, which is the first screen a new user sees.
    *   **Evidence:** Storybook story for the `Welcome` component.

*   [ ] **P1-B-3: Build `CreateProfile` Step.**
    *   **Task:** Create the UI for setting username and full name. Implement real-time username availability checks against the database.
    *   **Evidence:** Storybook for `CreateProfile` and Vercel preview of the live validation.

*   [ ] **P1-B-4: Build `SchoolPledge` Step.**
    *   **Task:** Create the UI for the user to confirm their school affiliation, pre-filled from their email domain.
    *   **Evidence:** Storybook story for the `SchoolPledge` component.

*   [ ] **P1-B-5: Build `OnboardingComplete` Step.**
    *   **Task:** Create the final UI that congratulates the user and directs them to the app's main feed.
    *   **Evidence:** Storybook for `OnboardingComplete` component.

---

### P1-C: Legal & Compliance

*   [ ] **P1-C-1: Create Static Legal Pages.**
    *   **Task:** Implement static, styled pages for `Terms of Service`, `Privacy Policy`, and `Community Guidelines`.
    *   **Evidence:** Links to the three legal pages on the Vercel preview.

*   [ ] **P1-C-2: Add Consent Checkbox.**
    *   **Task:** Integrate a mandatory "I agree to the Terms..." checkbox into the `CreateProfile` step (`P1-B-3`). The "Continue" button should be disabled until it is checked.
    -   **Evidence:** Vercel preview of the updated `CreateProfile` step with the consent checkbox. 