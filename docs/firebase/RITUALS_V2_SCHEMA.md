# Firestore Schema — Rituals V2

**Last Updated:** November 4, 2025

## Collections

### `rituals_v2`
Stores ritual configuration documents used by the new engine.

| Field | Type | Description |
| --- | --- | --- |
| `campusId` | string | Campus isolation key (e.g., `ub-buffalo`). |
| `title` / `subtitle` / `description` | string | Presentation copy for the ritual. |
| `slug` | string (optional) | Friendly URL slug (unique per campus). |
| `archetype` | string | One of the nine archetype IDs (`FOUNDING_CLASS`, `TOURNAMENT`, etc.). |
| `phase` | string | Lifecycle phase (`draft`, `announced`, `active`, `cooldown`, `ended`). |
| `startsAt` / `endsAt` | Firestore Timestamp | Scheduled window for the ritual. |
| `createdAt` / `updatedAt` | Firestore Timestamp | Audit metadata. |
| `visibility` | string | `public`, `invite_only`, or `secret`. |
| `presentation` | map | Optional styling (accentColor, icon, CTA copy, etc.). |
| `metrics` | map | Rolling aggregates written by the engine (participants, submissions). |
| `config` | map | Archetype-specific configuration payload (validated via Zod). |

### `ritual_participation`
Holds participant state for rituals. (existing collection reused)

| Field | Type | Notes |
| --- | --- | --- |
| `ritualId` | string | Reference to `rituals_v2` document. |
| `userId` | string | Participant user ID. |
| `status` | string | `joined`, `completed`, `dropped`. |
| `progressPercentage` | number | Calculated progress (0-100). |
| `actionsCompleted` | array | Action identifiers completed by the participant. |
| `joinedAt` / `lastActivityAt` | Timestamp | Participation lifecycle metadata. |

### `ritual_events`
Append-only log of lifecycle events emitted by the engine.

| Field | Type | Notes |
| --- | --- | --- |
| `ritualId` | string | Ritual reference. |
| `event` | string | `created`, `phase_changed`, `deleted`, etc. |
| `payload` | map | Event-specific metadata. |
| `occurredAt` | Timestamp | Event time (UTC). |

## Indexes

Add the following composite indexes for efficient lookups:

1. `rituals_v2` collection group:
   - Fields: `campusId` ASC, `phase` ASC, `startsAt` DESC
   - Purpose: fetch all rituals for a campus filtered by phase.

2. `rituals_v2` collection group:
   - Fields: `campusId` ASC, `archetype` ASC, `startsAt` DESC
   - Purpose: archetype-specific admin views.

3. `rituals_v2` collection group:
   - Fields: `campusId` ASC, `phase` ASC, `endsAt` DESC
   - Purpose: scheduled transitions (auto-start/auto-end).

4. `ritual_participation` collection group:
   - Fields: `ritualId` ASC, `userId` ASC
   - Purpose: participation lookups and uniqueness constraints.

5. `rituals_v2` collection group:
   - Fields: `campusId` ASC, `slug` ASC, `updatedAt` DESC
   - Purpose: detail page lookups by slug (supports `/api/rituals/[slug]`).

## Notes
- All writes go through `RitualEngineService` (enforces campus isolation and lifecycle rules).
- Admin APIs call `withAdminCampusIsolation` and require CSRF tokens.
- Cache invalidation + notifications are handled via ritual event listeners (`apps/web/src/lib/rituals/event-handlers.ts`).
- Detail routes (`/api/rituals/[id]`) expose presenter data via `toDetailView`; UI template lives in `packages/ui/src/atomic/templates/ritual-detail-layout.tsx`.
- Keep `rituals` legacy collection in read-only mode until migration completes.
