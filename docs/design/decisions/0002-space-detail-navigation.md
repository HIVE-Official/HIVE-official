Status: Proposed
Owner: Design System Guild
Last updated: 2025-10-14

# Decision 0002 — Space Detail Navigation

Context
- Space detail pages currently mix tabs within the header and sticky sub‑navigation patterns. We need a single navigation approach.

Options
- A) Tabs directly under the header (preferred by shadcn patterns)
- B) Sticky secondary subnav below header (section links)
- C) Hybrid (tabs primary, section links as page anchors)

Decision (proposal)
- Use tabs directly under the header for primary sections; allow in‑page anchors for long sections as a secondary affordance.

Rationale
- Matches existing Tabs molecule; simpler keyboard navigation; consistent across slices.

Status
- Proposed — to be validated in Spaces stories (Overview, Activity, Members, Tools, Settings) and updated in the matrix.

