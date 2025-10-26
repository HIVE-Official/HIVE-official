# Rebuild Roadmap & Keep/Delete Criteria

> Draft: 2025-10-09. Based on `docs/DOMAIN_GLOSSARY.md` and `docs/DDD_CONTEXT_MAPPING.md`.

This roadmap defines how we transition from the legacy implementation to the DDD-aligned architecture without losing critical knowledge.

---

## 1. Guiding Principles
- **Domain-first**: All rebuild work must reference the glossary and bounded contexts.
- **Reference, don’t refactor blindly**: Preserve legacy modules as read-only references until a context is fully rebuilt.
- **Vertical slices**: Ship one context at a time (onboarding/auth, spaces/feed, tools, rituals, governance).
- **Document every decision**: Update the glossary/mapping when new terminology or context boundaries emerge.

---

## 2. Keep / Refactor / Retire Criteria

| Classification | Definition | Examples |
| --- | --- | --- |
| **Keep (Reference)** | Code stays in repo for lookup but is not actively maintained. Mark clearly as legacy. | Archived blueprints in `blueprints/shadcn-foundation/`. |
| **Refactor/Rebuild** | Area will be rewritten in the new architecture. | Placeholder contexts in `apps/web/src/contexts/**`. |
| **Retire** | Code no longer relevant; already removed from this workspace. | Legacy pnpm tooling, lint configs, etc. |

**Approval checklist before shipping a context**
1. Context owner confirms the new implementation covers required domain behaviors.
2. Tests/docs updated for the new context.
3. Data migration (if any) executed.
4. Stakeholders sign off (product & engineering leads).

---

## 3. Phased Vertical Slice Plan

### Phase 1 – Onboarding & Auth
- Design onboarding journeys and auth flows (reference `docs/foundation/specs/technical/onboarding/*.md`).
- Implement `apps/web/src/contexts/onboarding` and `auth`, including shared services.
- Establish session infrastructure and bring in minimal tooling (lint/test suited for these contexts).

### Phase 2 – Spaces & Feed (Community)
- Build space lifecycle, membership, and feed aggregation using the newly defined services.
- Connect with Identity data (profiles/handles) once Phase 1 is stable.

### Phase 3 – Tools/HiveLab & Rituals (Activation)
- Rebuild HiveLab builder/runtime and ritual campaign mechanics on top of the spaces/feed foundation.
- Ship curated connector packs (calendar, email/notifications, LMS/data export) and publish the public Connector SDK.
- Implement verification + moderation workflow for external connectors and tool publishes.
- Document the integration point for future AI-assisted creation without blocking v1 delivery.
- Define event streams and analytics outputs for Governance.

### Phase 4 – Governance
- Reintroduce admin dashboards, moderation workflows, feature flag controls.
- Implement monitoring/analytics pipelines fed by previous contexts.

### Phase 5 – Platform Services & Backend Functions
- Add infrastructure glue (Cloud Functions, notifications, rate limiting) supporting the rebuilt contexts.
- Gradually reintroduce packages (`core`, `ui`, etc.) to share code across slices.

---

## 4. Supporting Workstreams
- **Design System**: Rebuild tokens/components alongside Phase 2 using `docs/foundation/architecture/design-system-architecture.md`.
- **Testing Strategy**: Adopt BDD specs as acceptance tests for each context.
- **Data Migration**: Plan migrations as contexts touch Firestore/auth data.
- **Observability**: Define logging/metrics from the start of each context implementation.
- **Connector Ecosystem**: Stand up managed connector packs, publish the SDK repo, and document governance for third-party submissions.

---

## 5. Next Actions
1. Validate the updated roadmap and glossary with stakeholders.
2. Kick off Phase 1 discovery (auth/onboarding) and document findings in `docs/`.
3. Set up minimal tooling (TypeScript/Lint/Test) scoped to the first context.

This roadmap should evolve. Update it whenever a context ships or architecture decisions change.
