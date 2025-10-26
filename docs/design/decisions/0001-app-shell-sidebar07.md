Status: Approved
Owner: Design System Guild
Last updated: 2025-10-14

# Decision 0001 — App Shell Pattern

Decision
- Use shadcn “Sidebar‑07” primitives (SidebarProvider + Sidebar) as the canonical app shell for Hive.

Context
- Multiple shell variants existed (custom shells and shadcn demo). We need one pattern that is tokenized, responsive (rail/expanded/mobile sheet), and easy to maintain across slices.

Rationale
- Sidebar‑07 is accessible, responsive, and aligns with our token system (surfaces, rings, glass, radius) with minimal overrides.
- Central nav config (packages/ui/src/organisms/nav-config.ts) keeps routes/labels/icons in one place and supports leader gating.

Consequences
- All app shells (web) wrap children with SidebarProvider and compose with Sidebar primitives.
- Stories use nav-config to render items and set `aria-current="page"` on active.
- Mobile uses sheet sidebar; desktop supports rail and expanded.

Actions
- Mark Layouts/Sidebar07 as canonical in coverage matrix.
- Add aria-current + leader gating demos to Layouts/HiveSidebar story.
- Migrate any custom shells to the Sidebar07 composition.

