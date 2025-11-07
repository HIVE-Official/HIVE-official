# Rituals V2.0 – Engine Follow-up

**Last updated:** November 4, 2025  
**Context:** Core archetype types now live in `packages/core/src/domain/rituals/archetypes.ts`. The next milestone is shipping the engine + lifecycle service.

## Next Engineering Steps

1. **RitualEngineService scaffolding** ✅
   - Location: `packages/core/src/application/rituals/ritual-engine.service.ts` (implemented).
   - Responsibilities: lifecycle transitions (`announced → active → cooldown → ended`), archetype guards, analytics dispatch, cache invalidation hooks. (Lifecycle + guards + analytics dispatch completed.)
   - Inputs: `BaseRitual` union, Firestore repository.

2. **Lifecycle rules** 🔄
   - Persist phase changes and timestamps (`activatedAt`, `endedAt`).
   - Support scheduled auto-start/end plus manual overrides (admin commands).
   - Emit domain events (`RitualPhaseChanged`, `RitualThresholdReached`).

3. **Repository updates** ✅
   - `FirebaseRitualConfigRepository` created under `packages/core/src/infrastructure/repositories/firebase/ritual-config.repository.ts` with campus isolation + base queries.
   - Archetype-specific query helpers (`findByArchetype`, `findActiveByArchetype`) now available.
   - Projection helpers surfaced via `toFeedBanner` + `toDetailView` presenter functions. Analytics hooks wired through event listeners.

4. **Validation layer** ✅
   - Zod schemas per archetype to validate admin composer payloads.
   - Guardrail checks (e.g., tournament participants ≥ 2, feature drops require feature flag names).

5. **Admin composer contract** 🔜
   - Define DTOs for sheet-first composer (5-step wizard).
   - Map DTO → `BaseRitual` config.
   - Wire CSRF-protected API endpoints for create/update/publish.

## Deliverables Checklist

- [ ] `RitualEngineService` with tests covering phase transitions. *(service implemented; tests pending once Node runtime available)*
- [x] Firestore repository + converters for the new archetype configs.
- [x] Lifecycle domain events + listeners (feed banner invalidation, notifications, analytics).
  - `RitualCreated`, `RitualPhaseChanged`, `RitualDeleted` now dispatch cache invalidation, notification queueing, and analytics tracking.
- [x] Admin composer DTOs + validation schemas.
- [x] API routes (`/api/admin/rituals/*`) using `withAdminCampusIsolation`.
- [x] Feed banner renderer consuming `RitualUnion`.
- [x] Ritual detail presenter (`toDetailView`) + UI template (`RitualDetailLayout`) powering `/rituals/[id]`.

## Dependencies & Risks

- Requires Firestore indexes for new collections (`rituals`, `ritual_participants`, `ritual_events`).
- Notification system must handle ritual events (winner announcements, unlock updates).
- Ensure rate limiting on ritual participation endpoints to prevent abuse.

Keep this doc up to date as each slice lands. Once the service + repositories ship, move on to UI rendering (`RitualBanner`, detail views) and admin composer flows.
