Bounded Context Owner: Identity & Access Management Guild

# Onboarding & Authentication Discovery Brief

## Purpose
- Align stakeholders on the first slice of the rebuild: account creation, authentication, and onboarding.
- Translate existing BDD scenarios into concrete user journeys and supporting questions.
- Surface open decisions to unblock implementation of `apps/web/src/contexts/auth` and `apps/web/src/contexts/onboarding`.

## Inputs Reviewed
- `docs/foundation/specs/technical/onboarding-auth-bdd.md`
- `docs/DOMAIN_GLOSSARY.md` (Identity & Access Management, Onboarding)
- `docs/REBUILD_ROADMAP.md` Phase 1 notes

## Key Personas
- **Prospective Student (Default Launch Persona)**: Buffalo campus email, full onboarding required before community access.
- **Returning Student**: Completed onboarding previously, needs seamless re-auth and session resume.
- **Faculty / Staff**: Lower initial scope, may require manual verification for early cohorts.

## Core Journeys

### J01 – Account Creation & Email Verification
1. User submits campus email on `/signup`.
2. System validates domain against approved list (`@buffalo.edu`).
3. Firebase Auth issues a magic-link verification email (magic link is the only auth modality for v1).
4. Upon verification, Profile aggregate instantiated with default flags (`isOnboarded=false`, `isVerified=false`).

**Decision**
- Approved campus domains maintained in `config/campuses.json` and loaded at runtime; feature flags gate rollout per campus.

### J02 – First-Time Onboarding Wizard
1. Authenticated but non-onboarded user redirected to `/onboarding`.
2. Steps capture:
   - Personal info (first/last name, pronouns, bio, photo). Username/UID auto-generated in the backend; the user never chooses a handle.
   - Academic info (major, grad year, courses) – required for students. Major list sourced from university catalog, limited to 2 selections.
   - Residential selection mapped directly to available Spaces.
   - Interests/clubs selection pulled from shadcn legacy data to ensure continuity.
3. Completion triggers Profile aggregate `markOnboarded()` emitting `ProfileOnboarded` event.
4. User routed to recommended spaces/dashboard.

**Decision**
- Minimum non-student requirements: first/last name, role selection, bio (>=50 chars), at least one interest, and confirmation of department/affiliation.

### J03 – Session Establishment & Persistence
1. Successful auth generates session token stored via shared session service.
2. Session middleware injects identity context for Next.js app routes.
3. Idle timeout and refresh policies enforced to avoid silent expiration.

**Decision**
- Session tokens persisted via HTTP-only, secure cookies with 12-hour expiry and sliding refresh; no client-side storage beyond in-memory context.
- Telemetry emits `session.created`, `session.refreshed`, and `session.expired` events with profile and device metadata (hashed).

### J04 – Returning User Login
1. User accesses `/login`, provides email.
2. System verifies campus domain and sends auth challenge.
3. After verification, session established and user routed:
   - If `isOnboarded=false`: resume onboarding at last incomplete step.
   - If `isOnboarded=true`: land on community home with contextual prompts.

**Decision**
- Wizard auto-saves after each step via `PATCH /api/onboarding/progress`, storing progress snapshots in Firestore keyed by `profileId`.
- Returning users inactive >30 days see a “What’s New” modal post-login highlighting community updates and pending actions.

## Success Metrics & Guardrails
- Email validation errors < 2% of total attempts.
- Onboarding completion rate ≥ 70% within 24 hours of signup.
- Session drop-offs during wizard < 5%.
- All domain invariants from BDD spec enforced via automated tests.
- Returning user reactivation ≥ 40% after “What’s New” prompt.

## Telemetry Baseline
- `auth.signup_submitted` (fields: campusEmail, campusId, userType, referralSource).
- `auth.magic_link_sent` / `auth.magic_link_failed`.
- `auth.verified` (latency from signup to verification).
- `session.created`, `session.refreshed`, `session.expired`.
- `onboarding.step_completed` (stepId, percentage, elapsedSeconds).
- `onboarding.completed` (interestsCount, majorsSelected, residentialId, source).
- `onboarding.resume_prompt_viewed` / `onboarding.resume_prompt_actioned`.
- `onboarding.whats_new_seen` (inactiveDays).

## Immediate Next Steps
1. **Decision Workshop**: Resolve open questions with Identity & Access stakeholders (schedule before implementation sprint).
2. **Journey Mapping**: Produce low-fidelity UX flow for onboarding wizard, annotate with domain events.
3. **Event Catalog**: Enumerate telemetry hooks (signup, verification, wizard step completion, onboarding completion).
4. **Data Sourcing**: Import majors, residential options, and interest taxonomy from shadcn branch repositories into shared fixtures for onboarding.
5. **UI Alignment**: Leverage shadcn foundation UI/UX patterns for web-first responsive layouts; ensure components degrade gracefully to smaller viewports without a separate mobile-first design.

## Data Fixtures Plan
- `packages/core/src/data/majors.json`: canonical list (max two selections) sourced from university catalog sync.
- `packages/core/src/data/residential-spaces.json`: maps residence halls/apartments to Space IDs + CTAs.
- `packages/core/src/data/interests.json`: imported from shadcn legacy taxonomy with IDs, labels, categories.
- Automated integrity checks ensure fixtures stay in sync with Firestore seed scripts.

## Pre-Build Checklist
- Product
  - Journey map signed off (desktop + responsive states).
  - “What’s New” modal copy approved by Comms.
- Design
  - Component inventory aligned with shadcn tokens (buttons, form controls, stepper).
  - Accessibility review covering keyboard navigation and focus management.
- Engineering
  - `pnpm install` executed; lint/typecheck/test scripts verified clean.
  - API contract defined for `/api/signup`, `/api/onboarding/progress`, `/api/onboarding/complete`.
  - Session cookie configuration documented (expiry, refresh cadence, SameSite policy).
  - Firestore rules updated for onboarding progress collection.
- Data/Analytics
  - Telemetry events instrumented in analytics schema with owners.
  - Dashboard spec for onboarding funnel drafted.
- QA
  - Acceptance criteria mapped directly to BDD scenarios.
  - Test plan includes magic-link flows, resume logic, and “What’s New” prompts.

> Detailed owners, due dates, and deliverables tracked in `docs/foundation/development/onboarding-auth-prebuild-plan.md`.

## Build-Ready Summary
- All product and technical decisions for Phase 1 onboarding/auth are documented.
- Tooling and configuration changes scoped to the slice are in place.
- Remaining actions are executional (artifact production, data import, lint/test dry run).
- Once the checklist items are checked off, engineering can begin implementation with minimal ambiguity.

## Planned Module Layout
- **packages/core/**
  - `domain/profile/aggregates/profile.aggregate.ts` – Profile root with onboarding/auth invariants.
  - `domain/profile/value-objects/` – `campus-email`, `profile-handle`, `personal-info`, `academic-info`, `social-info`.
  - `domain/profile/services/profile-onboarding.service.ts` – Coordinates aggregate mutations + domain events.
  - `domain/auth/session/session.entity.ts` – Session entity enforcing expiry + device metadata.
  - `application/auth/commands/` – `sign-up.command`, `complete-onboarding.command`, `resume-onboarding.command`.
  - `application/auth/services/` – Orchestrators invoking aggregate + infra (Firebase Auth, Firestore).
- **apps/web/src/contexts/auth/**
  - `providers/AuthProvider.tsx` – React context exposing session state + actions.
  - `hooks/useAuth.ts`, `hooks/useSession.ts` – Composable hooks consuming provider.
  - `services/sessionClient.ts` – Client adapter for shared session service (cookie storage, refresh).
  - `routes/login/` – Next.js route handlers for login/signup APIs.
- **apps/web/src/contexts/onboarding/**
  - `providers/OnboardingFlowProvider.tsx` – Manages wizard state, persists checkpoints.
  - `components/steps/` – Step components mapped to domain data (personal, academic, interests, handle).
  - `hooks/useOnboardingProgress.ts` – Derived state for completion percentage (mirrors aggregate logic).
  - `services/onboardingClient.ts` – Calls application commands (`completeOnboarding`, `saveProgress`).
- **apps/web/src/app/api/**
  - `signup`, `onboarding/progress`, `onboarding/complete`, `catalog` – Route handlers delegating to controllers and shared services.
- **apps/web/src/server/firebase/** – Firebase Admin bootstrap (expects `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).
- **apps/web/src/server/auth/**  
  - `controllers/` – HTTP handlers for signup, progress auto-save, onboarding completion + session creation.
  - `container.ts` – Assembles in-memory repos, telemetry, and adapters for dev/testing until Firebase wiring lands.
  - `magic-link/`, `telemetry/` – Console-backed adapters mirroring production ports.
- **Firestore Persistence**: Profiles, onboarding progress, and sessions now persist to Firestore via the repositories under `apps/web/src/server/auth/repositories/`, automatically falling back to in-memory storage when Firebase credentials are unavailable.
- **Verification Flow**: `/api/auth/verify` consumes magic-link tokens, marks profiles verified, issues HTTP-only session cookies, and redirects to the onboarding experience. `/api/auth/session` exposes the current session profile so the client can restore state on refresh.
- **Shared Infrastructure**
  - `packages/core/src/infrastructure/session` – Node adapter for session store (initially Firebase Auth tokens + cookie signer).
  - `packages/core/src/infrastructure/persistence/profileRepository.ts` – Abstraction over Firestore/SQL for profile aggregates.
  - `packages/core/src/infrastructure/messaging/domainEvents.ts` – Emits `ProfileOnboarded`, `SessionEstablished`, etc.

**Contracts To Define**
- Session token payload (`sessionId`, `profileId`, `expiresAt`, `scopes`).
- Onboarding progress snapshot shape `{ profileId, stepsCompleted: string[], lastUpdated: ISODateString }`.
- Domain events interface ensuring consumers can subscribe from other slices later.

## Risks & Assumptions
- Campus email list will expand; config must be data-driven from day one.
- Firebase Auth remains the identity provider for Phase 1.
- Existing legacy onboarding data is read-only reference; no auto-migration planned for MVP.
