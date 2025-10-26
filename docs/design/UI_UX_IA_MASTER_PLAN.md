# HIVE Frontend — UI/UX/IA Master Plan

Owner: Design System Guild • Mode: Master UI/UX/IA Composer (Research‑First)

Scope: Spaces, Rituals, Feed, Tools, Profile, HiveLab — designed and validated in Storybook, integrated into Next.js App Router.

Spaces Storybook scaffold lives at `docs/design/spaces/STORYBOOK_SCAFFOLD.md`.
Platform-wide Storybook scaffold lives at `docs/design/PLATFORM_STORYBOOK_SCAFFOLD.md`.

## Frozen Guardrails (Top‑Down)

IA Guardrails
- Page types (v1): Spaces Overview, Space Detail, Rituals List, Ritual Detail, Feed, Tools, Profile, HiveLab.
- Section order (defaults):
  - Spaces Overview: PageHeader → My Spaces → Discover → Help.
  - Space Detail: Header → About → Rituals → Tools → Members → Settings (owner only).
  - Rituals List: Header → Upcoming → Past.
  - Ritual Detail: Header → Details → RSVP → Resources.
  - Feed: Header/Composer → Stream → Filters.
  - Tools: Header → Panel (tools list) → Detail (selected tool).
  - Profile: Header → Overview → Activity → Connections → Settings.
  - HiveLab: Header → Catalog → Detail → Feedback.
- Allowed molecules per page: see Canon mapping below (no free‑range components).

Design Contract
- Tokens (semantic, brand‑agnostic): color roles, spacing (4/8), radii M/L/XL, elevation flat/soft/medium, motion micro 100–140ms, macro 160–220ms; map to brand in tokens package.
- A11y rules: WCAG 2.2 AA+, focus ring visible (accent w/ offset), keyboard/SR complete, prefers‑reduced‑motion supported.
- Gold usage quota: accent used only for focus ring, primary CTA fill, and critical highlight; max 3 accent instances per viewport; no gold‑on‑gold; CTA text must pass AA.
- Motion ranges: micro 100–140ms (press, hover), macro 160–220ms (dialogs, sheets, skeleton→content). Reduced motion = opacity only ≤120ms.

Minimum Canon (Bridge Layer)
- 15 molecules, each with a one‑pager “passport”; atoms exist only to satisfy these molecules.
- Canon v1 list: Card, List Row, Toolbar/Filters Bar, Search Box, Tabs, Dialog (Modal), Sheet, Toast/InlineAlert, Form Field, Empty State, Pagination/Load More, Avatar with Meta, Composer, Collection (Grid/List), Tag/Badge Pill.
- Source of truth: docs/design/CANON_MOLECULES.md:1. Any new UI must compose existing Canon or submit RFC (docs/design/RFC_CANON_TEMPLATE.md:1).

Allowed Molecules per Page (v1)
- Spaces Overview: PageHeader, Toolbar/Filters Bar, Search Box, Collection (Grid), Card, Empty State, Pagination/Load More, Toast/InlineAlert.
- Space Detail: PageHeader, Tabs, Card, List Row, Toolbar, Dialog/Sheet (join/leave/invite), Empty State, Toast.
- Rituals List: PageHeader, Tabs, Toolbar, List Row, Pagination/Load More, Toast.
- Ritual Detail: PageHeader, Card, List Row (attendees), Dialog (RSVP confirm), Toast.
- Feed: PageHeader, Composer, List Row (post), InlineAlert (moderation), Pagination/Load More, Toast.
- Tools: PageHeader, Tabs, Toolbar, Form Field, Card, Dialog/Sheet, Toast.
- Profile: PageHeader, Card, Tabs, List Row, Form Field, Dialog, Toast.
- HiveLab: PageHeader, Collection (Grid), Card, InlineAlert (beta), Dialog (opt‑in), Toast.

Decision Heuristic
- New surface or unclear tasks → Top‑down: write IA and success criteria; pull only molecules needed.
- Known surface/stable IA → Bottom‑up: extend tokens/upgrade molecules within Canon rules.
- Net‑new pattern → Pause for 10‑minute RFC using docs/design/RFC_CANON_TEMPLATE.md:1. If approved, add to Canon; otherwise compose from existing.

Audit (Weekly)
- IA compliance (section order, allowed molecules), a11y (focus, keyboard, SR, contrast), gold quota, token drift, motion ranges, performance budgets (LCP/TTI), RFC backlog reviewed.

## 1) Problem Frame
- Users & Contexts
  - Student leaders: create/manage spaces, plan rituals, moderate.
  - Drifting students: discover, sample, join, attend.
  - Internal: designers/engineers use Storybook for implementation.
- Platforms: Web (mobile/desktop), Next.js App Router, TypeScript, Tailwind, shadcn/ui. Storybook is the canonical design surface.
- Constraints: WCAG 2.2 AA+, keyboard/SR complete, reduced‑motion support, dark‑first, gold accent restraint, LCP < 2.5s.
- Goals/KPIs: ≥80% reuse via design system, 0 blocking a11y issues, perceived feedback < 400ms, clear navigation and labeling.
- Risks: Low contrast on dark, gold overuse, motion sensitivity, choice overload, privacy leakage, variant sprawl.

## 2) Evidence Dossier (selected)
- Jakob’s Law (High): familiar patterns for nav/components → use standard labels, conventional cards/forms.
- Hick–Hyman (High): reduce visible choices → progressive disclosure, 3–4 primary actions max per screen.
- Fitts’s Law (High): ≥44px touch targets → density defaults to Comfy, larger hit areas.
- Doherty Threshold (Med‑High): feedback < 400ms → skeletons/shimmers, optimistic joins, inline toasts.
- Aesthetic–Usability (Medium): subtle elevation and motion → soft shadows, minimal transitions; guard contrast.

## 3) IA Blueprint
- Object model
  - User, Space, Ritual, Post (Feed), Tool, Notification with clear relationships (Space has Rituals/Posts/Tools; User has memberships/RSVPs).
- Task model (top tasks)
  - Discover/join a space; plan/RSVP a ritual; post an update; use a tool in context; edit profile.
- Navigation model
  - Primary: Feed, Spaces, Rituals, Tools, Profile. Secondary (within Space): Overview, Rituals, Tools, Members, Settings.
- Content model
  - Types: Space, Ritual, Post, Tool, Profile; Lifecycle: draft → published → archived; owners per type defined.

## 4) A11y & Inclusivity Plan
- Keyboard order follows reading order; ESC to dismiss + focus return.
- 2px gold focus ring with offset on dark; no color‑only cues.
- SR: semantic roles, aria‑expanded/controls, live regions for toasts/saves.
- Contrast AA+ targets; CTA on gold uses dark text; no gold‑on‑gold.
- Reduced motion respected; instant fallbacks.
- Language: 8th‑grade reading level; i18n‑ready strings.

## 5) Interaction & Motion Spec
- Micro: press 100–140ms; hover lift 140–160ms; focus 120ms; easing standard.
- Macro: dialog 160–200ms; sheet 180–220ms; skeleton→content 140–160ms.
- Reduced motion: opacity only ≤120ms; no spatial movement.

## 6) Visual Language & Tokens (project‑agnostic)
- Color roles: background/surface/surface‑alt, text‑primary/secondary, accent(brand), interactive‑primary/secondary, success/warning/danger/info, border, ring.
- Spacing: 4/8 grid; Radius: M(12), L(16), XL(20) default XL; Elevation: flat/soft/medium.
- Type: base 16; small 14; headings 20/24/32/40; lh 1.4–1.6.
- Motion tokens: micro 100–140ms; macro 160–220ms; standard/entrance/exit easings.
- Usage constraints: ≤3 accent elements per viewport; ≥44px hit targets; density defaults to Comfy.

## 7) Content Design (microcopy kit)
- Voice: calm, concise, student‑first; short verbs; no jargon.
- Primary: Join, Request access, Create space, RSVP, Post update, Save. Secondary: Cancel, Edit, Learn more.
- Empty: Spaces “You’re not in any spaces yet.” → Create/Browse; Feed “No updates yet.” → Follow/Post; Rituals “No upcoming rituals.” → Browse/Create.
- Error: “Something went wrong.” → Try again. Tooltips: 3–5 words, e.g., “Open filters”.

## 8) Risk & Ethics Review
- Privacy: no private space details public; clear approval states; least disclosure.
- Dark patterns: none; explicit destructive confirms; no forced urgency.
- Inclusivity: AA contrast, motion‑safe, predictable layouts.
- Data integrity: optimistic UI with rollback; visible toasts; no silent failures.

## 9) Measurement & Experiment Plan
- North‑star: activation (join), engagement (RSVP/attendance), creation (posts/week).
- Guardrails: a11y blocking = 0; LCP < 2.5s; error < 1%.
- Events: ui.component.render/state_change; nav.primary/secondary.click; space.join.*, ritual.rsvp.*, post.create.*, tool.save.*
- Experiments: density (Comfy vs Cozy) on mobile; card elevation (Soft vs Flat) on desktop discovery; AA a11y baseline.

## 10) Module Blueprints (per surface)

### Spaces
- IA: Overview (my spaces, discover), Detail (about, rituals, tools, members, settings).
- States: loading/empty/error/success; edge: pending requests, privacy badges.
- Actions: Join/Leave/Request access; Invite share; Filter/sort.

### Rituals
- IA: List (upcoming/past tabs), Detail (schedule, host, capacity, RSVP).
- States: loading/empty/error/success; edge: full/Waitlist, timezone hints.
- Actions: RSVP Yes/No/Maybe, Add to calendar, Share.

### Feed
- IA: Stream (global vs space), Composer (scoped), Filters.
- States: loading/empty/error/success; edge: moderated/limited visibility.
- Actions: Post update, React, Comment, Filter.

### Tools
- IA: Panel within Space + Personal tools; types: checklist, notes, poll.
- States: dirty/saved/offline; edge: conflict resolution.
- Actions: Create item, Save, Archive, Share within space.

### Profile
- IA: Overview, Activity, Connections, Settings (privacy).
- States: loading/partial/empty; edge: private fields hidden.
- Actions: Edit, Save, Manage privacy.

### HiveLab (Beta)
- IA: Experiment catalog with disclaimers; opt‑in flows.
- States: beta labels, feedback channel; edge: data separation from core.
- Actions: Try prototype, Send feedback, Opt‑out.

## 11) Storybook Plan (authoritative)
- Foundation: Tokens, Style Dials (Radius/Elevation/Density/Contrast/Glass/Stroke/Gold/Motion).
- Atoms/Molecules/Organisms: each has a “.States” story covering loading/empty/error/success/edge.
- Templates/Pages: Spaces Overview, Space Detail, Rituals, Feed, Tools, Profile, HiveLab.
- Acceptance: a11y addon no critical issues; focus ring gold; CTA contrast AA; skeletons ≤100ms.

## 12) Integration Paths
- Storybook: `packages/ui/src/stories/**` (Foundation, Atoms, Molecules, Organisms, Templates, Pages)
- Tokens: `packages/tokens/src/**` • Tailwind preset: `packages/tokens/src/tailwind.preset.ts:1`
- App routes (examples): `apps/web/src/app/(app)/spaces/page.tsx:1`, `apps/web/src/app/(app)/rituals/page.tsx:1`, `apps/web/src/app/(app)/feed/page.tsx:1`, `apps/web/src/app/(app)/tools/page.tsx:1`, `apps/web/src/app/(app)/profile/[userId]/page.tsx:1`

---

Review Checklist
- [ ] IA matches object model and tasks
- [ ] Stories exist for each module with state coverage
- [ ] A11y passes (focus, keyboard, SR, contrast)
- [ ] Performance baselines met in stories
- [ ] Measurement plan wired (events named)
