# HIVE Layout System — Shells, Grids, Motion

Last updated: 2025-10-22

Purpose
- Define the canonical page shells across the product (web-first; mobile-friendly) and the layout primitives that compose them.
- Drive Storybook-first verification with realistic fixtures so builders can wire features without guessing structure.

Principles
- Tech‑sleek: calm chrome, minimal borders, precise spacing, few shadows.
- Gold is the accent, not the fill: use sparingly for focus and actions.
- Desktop/laptop first, mobile works: shells gracefully reflow below `md`.
- Predictable motion: fast but subtle; no surprise layout jumps.

Tokens (existing + proposed)
- Breakpoints: `sm=640`, `md=768`, `lg=1024`, `xl=1280`, `2xl=1536`.
- Containers: `--container-sm=640`, `--container-md=768`, `--container-lg=1024`, `--container-xl=1280`.
- Columns: 12‑col mental model; shells declare fixed rails and fluid content.
- Z‑layers: header 50, sidebar 40, sheet 60, popover 70, modal 80, toast 90, spotlight 100.
- Rhythm: base `--space` tokens in brand.css; vertical rhythm = 8px multiples.

Layout Primitives (to be added as small components)
- AppShell: wraps header + nav + content slots; manages responsive rails.
- HeaderBar: sticky at top; supports compact title, actions, and breadcrumbs.
- LeftSidebar: collapsible; 72–280px; overlays on mobile.
- Dock: right‑side, optional; 280–360px; hides on `md-`.
- Content: fluid area; supports 60/40 and 65/35 weighted grids.
- SheetOverlay: edge sheet (bottom on mobile; side on desktop).

Shells (page frames)
1) App Shell — Sidebar Left (HiveSidebar)
   - Slots: HeaderBar, LeftSidebar, Content, optional Dock.
   - Ratios: default 60/40; alt 65/35 for denser tables.
   - Mobile: sidebar as overlay; content full‑bleed; rail hidden.

2) Spaces Shell
   - Slots: SpaceHeader (cover + meta), Tabs, Content, Dock.
   - Lists: Feed (posts), Calendar (list/month), About.
   - Feature flags: `NAV_DETAIL_MODE` toggles sheet vs route for item detail.

3) Feed Shell (Campus/Public)
   - Slots: FilterBar, FeedList, optional Right Dock (trending / events).
   - Density: relaxed by default; compact toggle for ops.

4) Profile Shell
   - Slots: ProfileHeader (portrait card), Tabs (Activity, Spaces, Tools), Content.
   - Emphasize minimal chrome to let media breathe.

5) Onboarding Shell
   - Slots: StepperHeader, StagePanel (center), Footer actions.
   - Motion: slide between steps; respect reduced‑motion.

6) Rituals Shell (Campus‑wide experiences)
   - Slots: SpotlightHeader, ParticipationPanel, Results/Live.
   - Full‑bleed content with guardrails for readability.

7) HiveLab Shell (Canvas + Rails)
   - Slots: TopToolbar, LeftRail (elements), Canvas, Right Dock (properties).
   - Uses fixed rails with scroll‑snapped canvas.

Overlays & Flows
- ModalDialog: centered; blocks background; primary action right.
- Sheet: bottom on mobile, side on desktop; used for post/event details.
- CommandPalette: full‑width on mobile, constrained on desktop.

Motion (navigation + overlays)
- Enter: 160–220ms; Exit: 160–200ms; Ease: `var(--motion-ease-standard)`.
- Shell transitions: translateY 4–8px + fade; never scale.
- Reduced‑motion: disable translate; keep opacity step‑downs only.

Storybook Plan (layouts)
- Layouts/AppShell/Sidebar — base + with Dock.
- Layouts/Spaces/Shell — Feed, Calendar, About fixtures.
- Layouts/Profile/Shell — header + tabbed content.
- Layouts/Onboarding/Shell — two steps with motion toggle.
- Layouts/Rituals/Shell — spotlight fixture.
- Overlays/Sheet — mobile vs desktop; detail examples.

Verification Checklist per Shell
- Spacing aligns to 8px rhythm; gutters consistent.
- Focus rings visible on interactive elements inside shells.
- Rails collapse/hide at `md-` without layout jumps.
- No scroll bleed under header/footers; z‑layers correct.

Open Decisions
- Dock default width (280 vs 320px) and whether it’s sticky.
- 60/40 vs 65/35 default for Spaces feed; ops may prefer 65/35.
- Tablet breakpoint behaviors for tabs and filter bars.

Next Steps
1) Create AppShell + Dock primitives in `packages/ui/src/organisms`.
2) Add Storybook stories per plan with realistic fixtures.
3) Wire Spaces Shell stories against current components (Feed, Calendar, About).
4) Iterate on motion tokens once shells are clickable in stories.
