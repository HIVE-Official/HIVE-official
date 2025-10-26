# HIVE Platform – Project Overview

> Last updated: 2025-10-09

This document summarizes the HIVE rebuild workspace. All legacy implementation has been removed; what remains is documentation, blueprints, and placeholder directories ready for the forthcoming Domain-Driven Design reimplementation.

---

## 1. Product Vision & Core Experience

* **Mission** – “Campus Operating System” that helps students form communities around solving real problems.
* **Primary launch** – University at Buffalo, October 1st.
* **Signature features**
  * **Spaces** – pre-seeded communities with RSS-fed content and membership management.
  * **Feed** – real-time discovery stream sourced from spaces, RSS, and user activity.
  * **Profiles & Connections** – rich campus identity, connection graph, and verification.
  * **HiveLab** – no/low-code builder for space leaders to create workflows and tools.
  * **Rituals** – behavioral campaigns to drive campus-wide engagement.
* **Operating principles**
  * Mobile-first UX, app-router powered Next.js front-end.
  * Trust via `.edu` email verification and campus isolation.
  * Heavy automation (RSS import, moderation, analytics) backed by Firebase.

---

## 2. Monorepo Layout (Skeleton)

| Area | Purpose | Notes |
| --- | --- | --- |
| `apps/` | Application surfaces | Contains `web` and `admin` directories with README placeholders. No code yet. |
| `packages/` | Shared libraries | Placeholders for future UI, domain, and utility packages. |
| `functions/` | Cloud functions | Placeholder directory for Firebase/edge functions. |
| `scripts/` | Tooling scripts | Empty baseline for future automation. |
| `src/` | Shared source (optional) | Reserved for cross-app utilities if needed. |
| `docs/` | Specifications & blueprints | Includes `docs/foundation/` mirror of the shadcn foundation and new planning docs. |
| `blueprints/` | Archived snapshot | Read-only copy of the original `migration/shadcn-foundation` branch. |

### Tooling Status

All previous tooling (pnpm workspaces, Turbo pipelines, lint configs) has been removed. New tooling will be introduced context-by-context during the rebuild.

---

## 3. Frontend Applications

### 3.1 `apps/web`

Currently empty except for a README. When we rebuild the student experience, follow the contexts described in `docs/DDD_CONTEXT_MAPPING.md`.

### 3.2 `apps/admin`

Also empty except for a README. Governance/admin tooling will be reintroduced later in the roadmap.

---

## 4. Shared Packages (Workspaces)

All package directories contain README placeholders indicating the intended responsibility (UI kit, domain logic, analytics, etc.). No code is present yet.

---

## 5. Backend & Integrations

The functions directory is empty. Backend integration decisions will be made during the rebuild.

---

## 6. Testing, Quality, and Tooling

No tooling is configured yet. Testing, linting, and build pipelines will be reintroduced per context.

---

## 7. Key Documents & References

Existing documentation worth mining as we decide what to keep:

* `docs/DOMAIN_GLOSSARY.md` – Shared language and context map.
* `docs/DDD_CONTEXT_MAPPING.md` – Desired contexts vs legacy touchpoints.
* `docs/REBUILD_ROADMAP.md` – Phased rebuild plan and keep/delete criteria.
* `docs/business/vertical-slice-strategy.md` – Consolidated business and KPI playbook for the seven launch slices.
* `docs/business/spaces-strategy.md` – Detailed strategy, experiments, and research prompts for the Spaces slice.
* `docs/foundation/**` – Mirrored blueprint from the shadcn-foundation branch (DDD, design system, specs).
* `docs/admin/` – admin tooling specs.
* Root specs (`SPEC.md`, `DESIGN_SPEC.md`, `HIVE.md`, etc.) – product storytelling and earlier roadmap snapshots.

---

## 8. Outstanding Questions for Rebuild Planning

1. **Feature scope** – Which of the flagship features (Spaces, Feed, HiveLab, Rituals) remain in scope for the next iteration?
2. **Data model reuse** – Are Firestore collection schemas stable enough to reuse, or do we envision a new data layer?
3. **Shared packages** – Do we keep the current package split (UI/core/hooks/etc.) or consolidate for a fresh start?
4. **Admin app** – Should the admin console remain separate or become a mode within the main app?
5. **Automation scripts** – Which operational scripts (RSS importer, admin setup, security test) are business-critical vs. one-off experiments?
6. **Infrastructure** – Continue on Firebase + Upstash, or shift to another backend?

Documenting answers to these questions will dictate whether we retrofit existing modules or replace them entirely.

---

## 9. Next Steps

1. **Triad review** – Product, engineering, and operations should validate this summary against current goals.
2. **Mark keep/delete candidates** – Annotate this doc or create a matrix indicating which modules to preserve, refactor, or drop.
3. **Produce rebuild blueprint** – Once scope is confirmed, draft the target architecture, data flows, and migration plan.
4. **Archive legacy references** – Tag current repo state, so we can refer back while rebuilding without reintroducing legacy debt.

---

### Appendix: Quick Facts

* **Primary frameworks** – Next.js 15 App Router, Firebase Functions v2.
* **Design system location** – `packages/ui`, with stories and tokens.
* **Shared domain logic** – `packages/core` + `apps/web/src/lib`.
* **Current lint debt** – 1,418 errors & 10,168 warnings (as of last `pnpm lint:report` run).
* **Operational scripts** – Located under `apps/web/scripts/` (Firebase admins, RSS fixes, testing utilities).
* **Blueprint reference** – Full shadcn-based DDD blueprint mirrored at `blueprints/shadcn-foundation/` and replicated docs under `docs/foundation/`.

This overview should serve as the baseline reference while we decide what to streamline or rebuild. Update it as decisions are made so the documentation stays authoritative.
