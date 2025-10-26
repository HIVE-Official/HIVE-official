# HiveLab Sprint A — Backend-First Plan (Non‑Dev Brief)

What & Why
- Ship HiveLab runtime and safety gates so leaders can publish safe tools to Spaces. Keeps authoring simple and student experience consistent.

Scope (included)
- Contracts frozen for Elements/Tools (validators in core).
- Publish/test gates: fresh Run Test ≤10 min; no blocking lints.
- Space‑scoped Lab APIs (list/create tools, test, publish, event attach search).
- Runtime snapshot drives Space surfaces (Start/Live/Board/Calendar) with board bump rules.

Out of Scope
- Canvas UI polish, Library content, analytics dashboards.

How to Verify (no local setup)
- Visit `/lab` loads same dashboard as `/hivelab` (transition in progress).
- Call `GET /api/lab/spaces/{spaceId}/tools` returns owned/drafts/published (stub space scoping for now).
- Call `POST /api/lab/spaces/{spaceId}/tools/{id}/test` returns `lastRunAt` and `health`.
- Call `POST /api/lab/spaces/{spaceId}/tools/{id}/publish` returns `stage` and tool payload.

Impact & Risk
- Leaders see consistent behavior in Spaces (no board spam). Risk reduced by lints and publish gate.
- Minimal routing change: `/lab` added; `/hivelab` remains until Space picker lands.

References
- IA: docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md:1
- Elements: docs/design/hivelab/ELEMENTS_V1_PRIMITIVES.md:1
- Integration: docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md:1
- Contracts: packages/core/src/hivelab/contracts.ts:1
- Runtime: packages/core/src/hivelab/runtime.ts:1
- APIs: apps/web/src/app/api/lab/spaces/[spaceId]/**

