Bounded Context Owner: Identity & Access Management Guild

# Onboarding & Auth Pre-Build Execution Plan

## Objective
Operationalize the Phase 1 discovery outcomes so engineering can begin implementation with zero open dependencies.

## Task Matrix

| Area | Task | Owner | Status | Target Date |
| --- | --- | --- | --- | --- |
| Product | Finalize onboarding journey map (desktop + responsive) | Product Design | 🔄 In Progress | 2025-10-16 |
| Product | Approve “What’s New” modal copy | Comms Lead | ⏳ Not Started | 2025-10-17 |
| Design | Component audit vs shadcn tokens (forms, stepper, modals) | UI Systems | ⏳ Not Started | 2025-10-18 |
| Design | Accessibility review (keyboard, focus, contrast) | Accessibility Champion | ⏳ Not Started | 2025-10-18 |
| Engineering | Run `pnpm install`, verify lint/typecheck/test | Frontend Lead | ✅ Completed | 2025-10-17 |
| Engineering | Define API contracts (`/api/signup`, `/api/onboarding/progress`, `/api/onboarding/complete`) | Backend Lead | ✅ Completed | 2025-10-18 |
| Engineering | Document session cookie policy (expiry, refresh, SameSite) | Security Engineer | ✅ Completed | 2025-10-18 |
| Engineering | Update Firestore rules for onboarding progress collection | Backend Lead | ⏳ Not Started | 2025-10-19 |
| Data | Import majors (`packages/core/src/data/majors.json`) from shadcn branch | Data Steward | ✅ Completed | 2025-10-17 |
| Data | Import residential → space mapping fixture | Data Steward | ✅ Completed | 2025-10-17 |
| Data | Import interests taxonomy fixture | Data Steward | ✅ Completed | 2025-10-17 |
| Analytics | Register telemetry events with analytics platform schema | Analytics Lead | ⏳ Not Started | 2025-10-19 |
| Analytics | Draft onboarding funnel dashboard spec | Analytics Lead | ⏳ Not Started | 2025-10-20 |
| QA | Map BDD scenarios to acceptance checklist | QA Lead | ⏳ Not Started | 2025-10-19 |
| QA | Author test plan (magic link, resume flow, “What’s New”) | QA Lead | ⏳ Not Started | 2025-10-20 |

## Workstreams & Deliverables

### Product & Design
- **Journey Mapping Deck** (Figma/PDF) with annotated steps, domain events, telemetry triggers.
- **UI Alignment Checklist** verifying compliance with shadcn foundation components.
- **Copy Kit** covering onboarding steps, emails, modals, and “resume flow” prompts.

### Engineering
- **API Contract Doc** (OpenAPI snippet or TypeScript interfaces) stored at `docs/api/onboarding-auth-contract.md`.
- **Session Policy Note** added to `docs/security/session-management.md`.
- **Firestore Rules Patch** capturing new collection permissions with security review sign-off.
- **Development Setup Validation** log attached to sprint ticket (lint/typecheck/test outputs).
- **Server Controller Blueprint** (`apps/web/src/server/auth/`) wiring signup, progress save, and completion flows with console adapters pending Next.js integration.

### Data & Analytics
- **Fixture Source Scripts** in `scripts/data-sync/` for majors, residential spaces, interests.
- **Analytics Event Spec** at `docs/analytics/onboarding-auth-events.md` with JSON schema and owner.
- **Dashboard Wireframe** highlighting metrics: signup → verification latency, onboarding completion, session drop-off, reactivation.

### QA
- **Acceptance Matrix** mapping each BDD scenario to planned automated/manual coverage.
- **Test Plan** detailing environments, preconditions, and regression scope.

## Implementation Ticket Seeds

| Ticket ID | Title | Summary | Dependencies |
| --- | --- | --- | --- |
| IAM-101 | Implement magic-link signup API | Build `/api/signup` endpoint against Firebase Auth with domain whitelist | API contract, session policy |
| IAM-102 | Build onboarding progress service | Firestore persistence + auto-save for wizard steps | Fixture imports, Firestore rules |
| IAM-103 | Create onboarding wizard UI | React flow using shadcn components, integrates progress API | Journey map, UI checklist |
| IAM-104 | Implement session provider & cookie handling | Shared session service with telemetry hooks | Session policy |
| IAM-105 | Returning user “What’s New” experience | Modal + analytics triggers after inactivity | Copy approval |
| IAM-106 | Telemetry instrumentation | Hook all defined events across auth/onboarding flows | Analytics event spec |
| IAM-107 | QA automation scaffolding | Vitest suites for BDD scenarios, e2e plan stub | Acceptance matrix |

> Assign ticket IDs in your issue tracker once owners confirm readiness.
> Track daily status updates in `docs/foundation/development/onboarding-auth-ticket-backlog.md`.

## Risk Mitigation
- **Dependency drift**: lock fixture source-of-truth and schedule weekly sync with data team.
- **Telemetry gaps**: analytics sign-off required before first merge.
- **Accessibility regressions**: run axe audits per flow during implementation reviews.

## Reporting Cadence
- Daily standup update referencing this plan.
- Twice-weekly checkpoint with Product Architect to review status.
- Readout deck prior to build kickoff summarizing readiness, blockers, and ownership.
