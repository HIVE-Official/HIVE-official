Bounded Context Owner: Identity & Access Management Guild

# Onboarding & Auth Ticket Backlog

> Source of truth for Phase 1 implementation work. Sync these IDs with the issue tracker and update status daily.

| Ticket ID | Title | Description | Owner | Status |
| --- | --- | --- | --- | --- |
| IAM-101 | Implement magic-link signup API | Expose `/api/signup` validating campus emails, issue Firebase Auth magic links, log `auth.signup_submitted` and `auth.magic_link_sent` events. | Backend Lead | ✅ Completed |
| IAM-102 | Build onboarding progress service | Persist step data in Firestore, enforce max majors/interests, emit `onboarding.step_completed`. | Backend Lead | ✅ Completed |
| IAM-103 | Create onboarding wizard UI | Implement multi-step flow using shadcn components; auto-save via progress service. | Frontend Lead | ✅ Completed |
| IAM-104 | Implement session provider & cookie handling | Establish HTTP-only cookie strategy, sliding refresh, telemetry instrumentation. | Frontend Lead | ✅ Completed |
| IAM-105 | Returning user “What’s New” experience | Display modal after 30+ days inactivity with analytics hooks. | Frontend Lead | Open |
| IAM-106 | Telemetry instrumentation | Wire all events defined in telemetry baseline, confirm payload schema with Analytics. | Analytics Lead | In Progress |
| IAM-107 | QA automation scaffolding | Translate BDD scenarios into Vitest suites and draft e2e coverage plan. | QA Lead | In Progress |
