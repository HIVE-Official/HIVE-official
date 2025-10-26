Status: Active
Owner: Community Guild (Spaces) + Platform Services
Last updated: 2025-10-18

# Spaces — DDD Implementation Plan (v1)

Purpose
- Translate the Spaces v1 Product & IA spec into concrete domain models, services, policies, API routes, and tests. Backend‑first; UI adapts via a mapping layer.

Source of Truth
- Product & IA spec: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
- If any doc conflicts with the above, the spec wins.

Bounded Context
- Community (Spaces + Posts + Calendar surface for events)

Aggregates & Entities
- Space (aggregate): id, campusId, name, type, visibility, joinPolicy, postingPolicy, tags, members[], settings, createdAt, updatedAt.
- SpacePost (aggregate): id, spaceId, authorId/handle, content, kind, audience, origin, moderationStatus, pin (pinnedAt/expiresAt), attachments[], toolContext?, engagementSummary?, createdAt/updatedAt.
- CalendarEvent (entity): id, spaceId, title, start/end, location, capacity/waitlist, rsvp counts, check‑in config, co‑hosts, cover image. Linked to Event post when published.

Repositories
- SpaceRepository (Firestore/InMemory)
- SpacePostRepository (Firestore/InMemory)
- CalendarEventRepository (future; v1 can seed from fixtures while routes stabilize)

Application Services
- SpaceApplicationService: catalog, read, join/leave, set role, update details
- SpacePostApplicationService: list, create (respect policies), future: pin/unpin, moderate
- CalendarService (thin v1): list events for space, create/update (leaders)

Policies (Domain Services)
- PostingPolicy: members vs leaders-only
- Moderation: auto-hide threshold; expose ghost state to leaders
- Pinning: max 2 pinned; auto-expire by `pinExpiresAt`
- Visibility: audience members/campus/public; per-post share guardrails
- Permissions matrix: leaders/admins can pin & moderate; moderators can moderate content but not pin.

API Routes (v1)
- GET /api/spaces — catalog (scoped to campus + viewer)
- GET /api/spaces/:spaceId — detail (members/meta/posts limited)
- PATCH /api/spaces/:spaceId — update details (leaders)
- POST/GET /api/spaces/:spaceId/posts — create/list posts
- Routes (UI IA): /spaces/:id, /spaces/:id/calendar, /spaces/:id/about

Serializer Contracts (locked)
- Post JSON includes: id, spaceId, authorId, authorHandle, content, createdAt/updatedAt (ISO), reactions, commentCount, tags[], kind, audience, origin, shareToCampus, qualityScore, moderationStatus, pinnedAt/pinExpiresAt (ISO|null), attachments[{type,url,title?,description?}] (sanitized to known types), toolContext{toolId,toolSlug?,placementId?,variant?}|null, engagementSummary|null.
- `moderationStatus` surfaces to clients; UI hides content when status !== `active`.

Adapters (server → UI)
- Add mapping util to adapt Post serializer to existing UI types (e.g., `isPinned` ⇐ pinnedAt/expires, `mediaUrls/linkPreview` ⇐ attachments).

Rules & Indexes (Firestore)
- Spaces/members/posts read/write with roles; protect policy transitions.
- Indexes (see `firestore.indexes.json`):
  - `spaces/{spaceId}/posts` ordered by `createdAt desc` for stream pagination (`firestore.indexes.json:1077`).
  - `spaces/{spaceId}/posts` ordered by `pinnedAt desc` for pin management (`firestore.indexes.json:2401`).

Testing Strategy
- Unit: aggregates/services (already present for posts), policy checks
- API: serializer shape snapshots and policy enforcement on create
- Adapter: mapping tests for attachments, pin expiry, visibility

Implementation Milestones (P0)
1) Lock serializer fields and add adapter util (server → UI)
2) Enforce postingPolicy + surface moderation state in API (auto-hidden, attachments sanitized)
3) Add /spaces/:id/calendar and /spaces/:id/about route shims
4) Update SpaceLayout tabs to All | Events | Tools (Tools = toolContext)
5) Add adapter unit tests; document indexes

Deferred (post‑baseline)
- Comments/reactions APIs + UI sheets
- Realtime/polling and unread separators
- Proof/export pipeline and media approval queue

References in Code
- Domain: packages/core/src/domain/spaces/aggregates/space-post.aggregate.ts:1
- Services: packages/core/src/application/spaces/space-post.application.service.ts:1
- Server: apps/web/src/server/spaces/service.ts:1
- API: apps/web/src/app/api/spaces/**
- UI: packages/ui/src/organisms/spaces/**
