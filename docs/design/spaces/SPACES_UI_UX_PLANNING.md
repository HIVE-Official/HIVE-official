Status: In Planning
Owner: Community Guild + Design System Guild
Last updated: 2025-10-19

# Spaces UI & UX Planning — Backend-First Readiness

## 0) Purpose

Capture the UX scope we will unlock once the Spaces backend slice reaches Definition of Ready. This plan keeps UI/UX discovery in sync with the frozen contracts defined in `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1` and protects the backend-first gate.

- We do **not** begin implementation until the backend column is fully checked (aggregates, serializers, API routes, telemetry, and Firestore rules).
- Product scenarios anchor around University at Buffalo students discovering, joining, and staying safe in Spaces.

---

## 1) Readiness Checklist

UI execution can start when the following backend tasks are complete:

- Moderation, pin, and visibility state machine is merged with telemetry hooks (`packages/core/src/domain/spaces/**`) — per spec §2 “Moderation”.  
- Calendar aggregation API is stable for `/spaces/[spaceId]/calendar` (`docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:178`).  
- Pin expiry job + monitoring landed so pinned cards don’t drift (`docs/setup/SPACES_FIRESTORE_SCHEMA.md:149`).  
- Serializer payload frozen (`kind`, `audience`, `attachments[]`, `toolContext`, `pinnedAt`, `pinExpiresAt`, `moderationStatus`) with contract tests.
- Firestore rules + indexes validated in staging.

When all green, flip UI tasks from deferred to active and update `TODO.md`.

---

## 2) Core Scenarios (BDD framing)

### Scenario A — UB student discovers Robotics Space
1. Student opens Spaces catalog `/spaces`; sees filters and verified badges (Spec §1 Navigation).
2. Selects Robotics Space; lands on post stream with All | Events | Tools tabs (Spec §2 Post stream).
3. Sees pinned carousel (max two) with timers; carousel respects pin expiry telemetry.

### Scenario B — Student joins and posts safely
1. Student taps Join; membership state updates; composer unlocked (Spec §2 Composer).
2. Non-leader upload flows through media approval queue (Spec §2 Media policy).
3. On publish, moderation ghost state appears if auto-hidden; leaders see actions.

### Scenario C — Leaders run events
1. Leader creates event post; appears in Events tab and Calendar list (Spec §3 Calendar module).
2. RSVP chip reflects capacity; “Now” chip during live window. Calendar toggles persist per device.

### Scenario D — Members trust About & Governance
1. About tab shows governance copy, helper badges, policy summary, and contacts (Spec §4 About).
2. Storybook variants match upstream serializer fixtures.

---

## 3) UI Backlog (deferred until backend ready)

### Post Stream
- `SpaceLayout` tabs All | Events | Tools with pinned carousel (Spec §2.1).  
- Post cards (standard, event, tool) reading from frozen serializer fixture.  
- Media approval banners + inline tool forms.  
- Moderation banner states (auto-hidden, escalated).

### Calendar
- Toggle component (List ↔ Month) with remembered preference.  
- Event row density + live “Now” chip (Spec §3.2).  
- Event sheet tabs (Details, Extensions, Attendees, Chat).

### About
- Governance block with helper badges, policy summary, contacts (Spec §4).  
- Version history + provenance display.

### Admin (reference only until ops slice unblocked)
- `/admin/space/:id` tab scaffolds tied to final API.

---

## 4) Storybook & Fixture Plan

- Storybook stories live under `packages/ui/src/stories/Spaces/*`.  
- Shared fixtures sourced from the serializer contract tests to guarantee parity.  
- Required stories before UI PRs ship:
  - `Spaces/BoardCard/Standard`, `Spaces/BoardCard/Event`, `Spaces/BoardCard/Tool` (Spec §2 Post variants).
  - `Spaces/PinnedCarousel` covering active and expired pins.
  - `Spaces/Calendar/List` and `Spaces/Calendar/Month` using real calendar payload.
  - `Spaces/About/Governance` with policy summary + contacts.

---

## 5) Accessibility & Safety Defaults

- Keyboard navigation for tabs, pinned carousel, and calendar grid.  
- ARIA live regions for composer validation and moderation toasts.  
- Reduced motion support for carousel + calendar transitions.  
- Media approval queue must surface alt-text prompts (Spec §2 Safety & lints).  
- Ensure moderation ghost states are visually distinct but non-destructive for non-leaders.

---

## 6) Telemetry & Validation Hooks

- Frontend should emit:
  - `spaces.ui.tab_switch` with `surface=board`.
  - `spaces.ui.pin_click` for pinned carousel CTR.
  - `spaces.ui.calendar_view_toggle`.  
- QA plan:
  - Playwright smoke covering join/post/pin scenario once backend stable.  
  - Visual regression snapshots for post cards and calendar states.

---

## 7) Dependencies & Blocks

- Await moderation state machine merge (tracking in `TODO.md` backend column).  
- Await calendar aggregation parity.  
- Coordination with Media policy spec for approval queue design.  
- Admin telemetry requirements pending; treat admin UI as read-only reference until ops team signs off.

---

## 8) Next Steps

1. Track backend readiness via `TODO.md` and block UI start until all prerequisite boxes checked.  
2. Prepare Storybook fixture JSON from serializer contract tests (`apps/web/src/server/spaces/__fixtures__/*`).  
3. Draft design QA checklist mapping to scenarios above; share with Design System Guild reviewer.  
4. Once backend ready, spin up dedicated execution brief using `docs/design/templates/PLANNING_BRIEF_TEMPLATE.md`.

---

## References

- `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md`
- `docs/setup/SPACES_FIRESTORE_SCHEMA.md`
- `docs/design/COMPONENTS_SPACES_HIVELAB_CHECKLIST.md`
