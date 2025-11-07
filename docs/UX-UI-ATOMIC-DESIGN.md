# HIVE Atomic Design System (Web) — Reference Map

**Mandate:** Serve a calm, campus-first experience (see `AGENTS.md`) while shipping vertical slices through Next.js (`apps/web`). This document threads the product topology (spatial, temporal, emotional, cognitive, social) through the atomic design stack so engineering, design, and analytics share the same contracts.

---

## 1. Atoms — Foundations & Tokens

- **Color / Modes**  
  - Neutral + accent palette lives in `packages/tokens/src/colors.ts`.  
  - Sleek emotional modes (`calm`, `focus`, `warm`, `celebrate`, `urgent`, `sober`) + reduced motion fallbacks defined in `packages/tokens/src/topology/mode-tokens.json`.  
  - Global CSS variables emitted via `packages/tokens/src/css-generator.ts` → consumed in `packages/ui/src/brand/brand.css`.
- **Typography & Rhythm**  
  - Type scale + font families in `packages/tokens/src/typography.ts`; Storybook reference `packages/ui/src/stories/Typography.stories.tsx`.  
  - Spacing, radii, and layout increments in `packages/tokens/src/spacing.ts` and `packages/tokens/src/radius.ts`.
- **Motion & Feedback**  
  - Motion durations/easing defaults under `packages/tokens/src/motion.ts`; enforced per-component through Framer Motion helpers in `packages/ui/src/lib/motion.ts`.  
  - Reduced motion experiences derived from `mode-tokens.json` defaults.
- **Iconography & Imagery**  
  - Icon exports centralized in `packages/ui/src/brand/classnames.ts` and asset pipeline under `packages/ui/src/icons`.  
  - Avatar primitives in `packages/ui/src/atomic/molecules/user-avatar-group.tsx`.
- **Auth, Accessibility, & Security Hooks**  
  - Focus rings and brand resets in `packages/ui/src/brand/brand.css`.  
  - Auth defaults (`withSecureAuth`) documented in `apps/web/src/lib/middleware`.

---

## 2. Molecules — Reusable Compounds

| Molecule | Contract | Implementation |
| --- | --- | --- |
| Navigation Item | Icon + label, aria-current, collapsible rail support | `packages/ui/src/atomic/molecules/navigation-item.tsx` (planned) / `packages/ui/src/shells/UniversalShell.tsx` |
| Search / Input Group | Input with icon affordances, clear button | `packages/ui/src/atomic/molecules/search-bar.tsx` |
| Form Field | Label + helper + validation state | `packages/ui/src/atomic/molecules/form-field.tsx` (backlog) |
| User Identity Snippet | Avatar + name + role badge | `packages/ui/src/atomic/molecules/user-avatar-group.tsx` |
| Card Header | Identity snippet + timestamp + explainability chip | `packages/ui/src/organisms/feed/PostCard.tsx` header slot |
| Reaction / Action Bar | Primary + tertiary actions with counts | `packages/ui/src/atomic/molecules/action-bar.tsx` |
| Status Pill | Icon + text signal for time states | `packages/ui/src/atomic/molecules/tag-list.tsx` variants |
| Tooltip / Helper | Persistent orientation hints | `packages/ui/src/atomic/molecules/empty-state-compact.tsx` (pattern) |
| Modal / Sheet Frame | Overlay shell with scrim + drag handles | `packages/ui/src/atomic/molecules/notification-card.tsx` pattern; full sheets in `packages/ui/src/organisms/app-shell-4.tsx` |

All molecules must read slot + mode metadata via the helper (planned) `@hive/hooks/topology/use-experience-mode`.

---

## 3. Organisms — Feature Blocks

- **Global Shell**  
  - Sidebar + header orchestrated in `packages/ui/src/shells/UniversalShell.tsx`; wiring to Next.js layout occurs in `apps/web/src/app/layout.tsx`.  
  - Slot contract enforced by `packages/tokens/src/topology/slot-kit.json` (S0–S4, Z1–Z2, R).
- **Feed & Cards**  
  - Feed page composition in `apps/web/src/app/feed/page.tsx`.  
  - Card variants under `packages/ui/src/organisms/feed/PostCard.tsx` and `apps/web/src/components/feed/cards/*`.  
  - Ritual strip organism at `apps/web/src/components/feed/ritual-stories-strip.tsx`.
- **Spaces**  
  - Board layout, composer, and context rail in `apps/web/src/app/spaces/[spaceId]/page.tsx` with shared modules under `packages/ui/src/organisms/spaces/*`.  
  - Calendar module planned in `apps/web/src/components/spaces/calendar/*`.
- **Profile**  
  - Profile header + stats `packages/ui/src/organisms/profile/profile-overview.tsx`; Next.js route `apps/web/src/app/profile/[id]/ProfilePageContent.tsx`.
- **HiveLab**  
  - Builder experience scaffolding in `packages/ui/src/atomic/templates/hivelab-experience.tsx`; route `apps/web/src/app/hivelab/page.tsx`.
- **Admin Rail & Analytics**  
  - Middleware and CSRF enforced in `apps/web/src/lib/middleware/*`; admin UI in `apps/web/src/app/admin`.

Organism states (loading, empty, error) documented in `docs/FEATURE_TOPOLOGY_REGISTRY.md`.

---

## 4. Templates — Layout Recipes

| Template | Slots | Primary Route | Notes |
| --- | --- | --- | --- |
| Feed | S1 header, S2 ritual strip, S3 cards | `apps/web/src/app/feed/page.tsx` | No composer; fairness caps in `apps/web/src/server/feed/service.ts`. |
| Space Board | S1 header, S2 pins, S4 composer, S3 stream, R rail | `apps/web/src/app/spaces/[spaceId]/page.tsx` | Mobile remaps rail to `Now` card (`slot-kit.json`). |
| Space Calendar | S1 header, S3 list/month, Z1 sheet | `apps/web/src/app/spaces/[spaceId]/calendar/page.tsx` (planned) | Event sheet at `apps/web/src/components/events/EventSheet.tsx`. |
| Profile | S1 identity, S3 timeline, R recommendations | `apps/web/src/app/profile/[id]/ProfilePageContent.tsx` | Ghost mode overlays per `featureFlags.profile.ghostMode`. |
| HiveLab Studio | S0 shell, S3 canvas tri-pane | `apps/web/src/app/hivelab/page.tsx` | Complexity meter + lint panel (backlog). |
| Space Admin | Tabs + analytics widgets | `apps/web/src/app/spaces/[spaceId]/manage/page.tsx` | Enforce CSRF on admin POSTs. |

Each template consumes slot + budget metadata (`slot-kit.json.cognitiveBudgets`) via upcoming hook `useCognitiveBudget(surface, role, device)`.

---

## 5. Pages — Next.js Route Inventory

Reference canonical route list in `docs/FEATURE_TOPOLOGY_REGISTRY.md`. Key surfaces:

- `/feed`, `/rituals`, `/events/[id]`, `/notifications`
- `/spaces`, `/spaces/[spaceId]`, `/spaces/[spaceId]/calendar`, `/spaces/[spaceId]/about`
- `/profile/[id]`, `/profile/edit`
- `/hivelab`, `/tools`
- `/onboarding/*`, `/login`, `/start`

Guarded routes must wrap with `withSecureAuth` and respect CSRF (see `apps/web/middleware.ts` and `apps/web/src/lib/middleware/csrf.ts`).

---

## 6. Topology Alignment

- Spatial slots + rail caps governed by `slot-kit.json`.  
- Temporal reminders + recap pipeline tracked in `docs/FEATURE_TOPOLOGY_REGISTRY.md` (Section “Topology → UI Implementation Map”).  
- Emotional modes map to `mode-tokens.json` and should be switched via `useExperienceMode`.  
- Cognitive budgets enforced through upcoming lint hook; design tokens provide budgets per surface.  
- Social fairness caps implemented in `apps/web/src/server/feed/service.ts` (≤3 items/space/page) with explainability chips rendered in card header.

---

## 7. Tooling & Storybook

- Storybook scaffolding under `packages/ui/src/stories/*`; specific topology coverage checklist in `docs/components/TOPOLOGY_STORYBOOK_CHECKLIST.md`.  
- Storybook should import slot + mode tokens to guarantee parity with production layouts.

---

## 8. Backlog / Gaps

- Build `useExperienceMode` and `useCognitiveBudget` hooks under `packages/hooks/src/topology`.  
- Add lint pipeline for composer/tool budgets and ritual recap enforcement.  
- Implement recurring event scheduling UI + ritual planner (admin).  
- Expand notification center UI and direct messaging (under exploration).  
- Complete HiveLab complexity meter + certification workflows.

---

**Usage:** Treat this document as the bridge between design tokens, component libraries, and Next.js templates. Keep it in sync when adding components, refactoring routes, or changing topology rules.
