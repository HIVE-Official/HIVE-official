Status: Research plan (ready to run)
Owner: Design Architect + Community Guild
Last updated: 2025-10-19

# Spaces Navigation & Detail Pattern — Research Brief (Sheet vs Route vs Inline)

## 0) Problem & Context
- We must choose the primary detail pattern for Spaces (post/event/member/tool) across stream, rail widgets, and calendar.
- Candidates: L1 Sheet overlay (bottom/side), Full‑page route, Inline expansion, Drawer (mobile), Popover/modal hybrids.
- Constraint: HIVE’s IA favors calm context + fast deep‑dives for students. The Final v1 spec recommends sheet‑first for Events, but we will validate system‑wide.

References
- Spaces IA (Final v1): docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1
- System guide (unified IA): docs/design/spaces/SPACES_V1_SYSTEM_GUIDE.md:1

---

## 1) Research Goals & Questions
- Continuity vs orientation: Do students feel “kept in context” while performing RSVP, react/comment, or manage tasks?
- Speed to action: Which pattern yields faster successful actions (RSVP, comment, join)?
- Comprehension: When is a full page necessary (multi‑step, dense forms) vs overkill?
- A11y/Back behavior: Which model produces fewer back‑stack errors and better screen‑reader flows?
- Mobile ergonomics: Is a bottom sheet measurably better than route breaks for one‑handed use?

---

## 2) Alternatives (What we’re testing)
- A) Sheet‑first overlay (default)
  - Pros: Keeps context; fast; shareable via `?id` param; great on mobile; consistent across surfaces.
  - Cons: Complex content can overflow; must manage focus/scroll; keyboard edge cases.
- B) Route‑first detail (new page)
  - Pros: Unlimited space; simple mental model; native deep links; easy SEO.
  - Cons: Context loss; back/forward churn; slower return to task.
- C) Inline expansion (within list)
  - Pros: Zero navigation; highly contextual; great for short content.
  - Cons: Collapses page layout; poor for complex actions; hard to deep‑link.
- D) Drawer (mobile/side)
  - Pros: Natural on mobile; preserves context; supports swipe.
  - Cons: On desktop, can feel cramped; content sizing constraints.

Decision guardrails
- Use Sheet when: action ≤ 2 steps, detail ≤ ~2–3 panels, or student should keep list context (Events, Post details, Member mini).
- Use Route when: multi‑step forms (e.g., advanced tool builder), long read/edit tasks, or deep SEO.
- Avoid Inline for actions that require history/back or complex focus management.

---

## 3) Hypotheses
- H1: Sheet‑first yields higher RSVP conversion and lower time‑to‑RSVP than route‑first for Events.
- H2: Sheet‑first reduces abandonment for comment/reaction compared with route‑first.
- H3: For complex leader tasks (tool manage), route‑first performs better than sheet‑first.
- H4: Inline expansion underperforms sheet/route on deep‑link satisfaction and back behavior.

---

## 4) Methods (How we’ll test)
- Qualitative usability (n=8–12 UB students)
  - Counterbalanced tasks across Sheet vs Route prototypes.
  - Session script: RSVP (live & capacity), comment on post, open member profile, manage resource.
  - Collect SUS + task satisfaction; note back‑stack errors.
- A/B experiment (staging → prod)
  - Randomize Event entry points (Sheet vs Route) for RSVP funnel; measure conversion/time.
  - Guard with kill‑switch; 1–2 weeks; target ≥500 sessions per variant.
- Intercepts & survey
  - After detail close, prompt 1‑question micro‑survey on clarity/speed.
- Benchmarks
  - Competitive teardown (Twitter post → details; Discord message → thread/side panel; Instagram post overlay; Slack thread modal/drawer; Notion page vs side peek).

---

## 5) Metrics & Telemetry (Instrumentation)
- Core events
  - expand_open/expand_close { surface, entity, entityId }
  - rsvp_click { source, status, success, latencyMs, capacityState }
  - comment_open/comment_submit { source, latencyMs }
  - view_all_click { source }
  - backstack_error { surface }
- KPIs
  - RSVP conversion rate and time‑to‑RSVP
  - Comment submission rate
  - Abandonment on expand_open → expand_close without action
  - Back behavior errors (double back, dead‑end)
  - A11y pass rate (axe/storybook a11y; keyboard task success)
- Tools
  - Console sink now: apps/web/src/server/spaces/telemetry/console-space-post-telemetry.ts:1
  - Swap to analytics sink when available.

---

## 6) Prototypes (What to build/test)
- Figma
  - Sheet vs Route for: Event detail, Post detail, Member profile, Resource manage.
  - Mobile and desktop; reduced‑motion variants; focus outlines.
- Storybook (already available; extend with controls)
  - EventsWidget: default + PosterLive; InteractiveExpand (sheet)
  - CalendarView + EventDetail (sheet)
  - PostSheet overlay; CommentsSheet density & a11y
  - Add a “Route‑first” story variant for EventDetail that links to a full page to test.
- App sandbox
  - Feature flag: `NAV_DETAIL_MODE=sheet|route` with URL query to force.
  - Parallel routes (@overlay) and query‑param overlays evaluated.

---

## 7) Accessibility & Motion Criteria
- Rows/tiles: role=button, tabIndex, Enter/Space; visible focus ring.
- Sheets: aria‑modal, labelledby; focus trap; return focus to invoker.
- Motion: 180–220ms translate+fade; opacity‑only for prefers‑reduced‑motion.
- Tap targets ≥ 40px on mobile; captions ≥ 12px; body ≥ 14px; icons ≥ 16px.

---

## 8) Performance Criteria
- P95 budgets (spec §7): Stream ≤1.8s cold/≤1.2s warm; Calendar ≤300ms (100 events); Event sheet ≤200ms.
- Lazy‑load covers; responsive images; prefetch sheet data on idle/hover.
- Virtualize long lists; avoid reflow; keep overlay JS ≤ ~4KB incremental.

---

## 9) Decision Matrix (When to use what)
| Criteria | Sheet Overlay | Route‑first | Inline Expansion |
| --- | --- | --- | --- |
| Keep context | Strong | Weak | Strong |
| Deep linkability | Good | Strong | Weak |
| Complexity tolerance | Medium | Strong | Low |
| A11y risk | Medium | Low | High |
| Mobile ergonomics | Strong | Medium | Medium |
| Back behavior | Strong | Medium | Weak |

Decision: Default to Sheet. Escalate to Route only when content is multi‑step/long form.

---

## 10) Research Plan & Timeline
- Week 1: Prototype in Figma + Storybook stories (route‑first variants added). Define telemetry events.
- Week 2: Usability sessions (n=10 UB students). Synthesize findings.
- Week 3–4: A/B on staging; if positive, limited prod test. Monitor KPIs.
- Week 5: Decision write‑up; adopt pattern; clean up flags.

Roles & owners
- Research: Design Architect + Community Guild
- Prototypes: @hive/ui and apps/web
- Telemetry: Community Guild backend

---

## 11) Acceptance & Hooks
- Accept Sheet‑first if: RSVP conversion +10–15% vs route; fewer back errors; a11y passes; perf budgets met.
- Accept Route‑first if: long‑form tasks measurably faster; fewer a11y issues; no drop in conversion.
- Document decision in `docs/design/decisions/` with rationale and data.

