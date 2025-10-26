# HiveLab Backend Completion Checklist (v1)

> Goal: production-ready backend for HiveLab tools: domain, persistence, APIs, analytics, and integration points. This is the working checklist; mark items done as we land them.

---

## Domain & Application
- [ ] ToolAggregate: element editing guards, publish/archive, visibility transitions (draft→published, visibility rules), deploy-to-spaces, record usage
- [ ] Tool events: created/published/visibility/deployed/usage (emitted + consumed)
- [ ] ToolApplicationService
  - [x] Create draft (template/elements)
  - [x] Publish tool
  - [x] Update visibility
  - [x] Deploy to spaces
  - [x] Update elements (draft only)
  - [x] Archive tool
  - [x] Record usage
  - [x] List by campus/visibility filters
  - [x] Ownership/permission checks (policy ports)
- [ ] Unit tests (Vitest) for aggregate + service (publish/visibility/deploy/usage/errors)

## Persistence
- [x] InMemoryToolRepository (dev/test)
- [x] FirestoreToolRepository (tools collection)
  - [x] Mapping for timestamps, arrays, permissions, analytics, elements
  - [ ] Indexes documented in Firestore index summary
- [ ] Data migration/backfill plan for legacy tool docs

## API Surface (Next.js App Router)
- [x] GET /api/tools (dashboard: owned/drafts/published + templates)
- [x] POST /api/tools (create draft from template or elements)
- [x] POST /api/tools/:toolId/publish
- [x] POST /api/tools/:toolId/visibility
- [x] POST /api/tools/:toolId/deploy
- [x] PUT  /api/tools/:toolId/elements (update elements)
- [x] POST /api/tools/:toolId/archive
- [x] POST /api/tools/:toolId/use
- [x] GET /api/tools/campus?campusId=...&visibility=... (catalog)
- [ ] AuthN/Z middleware (leader gating for publish/deploy/visibility)

## Telemetry & Analytics
- [ ] Usage counters (DAU/WAU calc job or on-read aggregation)
- [x] Event logging sink (ToolPublished/Deployed/UsageRecorded)
- [ ] Leader dashboard queries (top tools, completion %, error rate stub)

## Integration Points
- [ ] Space composer placements: save per-space tool placement config (max 6)
- [ ] Auto-summary posts: emit digest cards to Space Board under quota guard
- [ ] Removal hygiene: hide composer verbs and mark historical cards

## Operational Readiness
- [ ] ENV toggle to use Firestore (USE_FIRESTORE_TOOLS=true)
- [x] Firebase security rules for tools collection
- [ ] CI: run service tests + e2e on API routes
- [ ] Docs: endpoints, examples, and error model

---

## Notes
- Enforce visibility rules in the aggregate; protect transitions by status.
- Defer heavy analytics to a job or event-based processor; keep v1 counters simple.
- Model policy checks via ports to keep application layer testable.
