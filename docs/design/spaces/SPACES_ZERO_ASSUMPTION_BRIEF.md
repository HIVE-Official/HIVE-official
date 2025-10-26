Status: Draft (Zero‑Assumption)
Owner: Design Architect + Community Guild
Last updated: 2025-10-19

# Spaces — Zero‑Assumption Design Brief

Purpose
- Start from first principles. No prior decisions. Define what a “Space” must be for students, leaders, and staff, then choose IA and interaction patterns through research, not precedent.

Scope (what we are designing)
- The end‑to‑end experience for campus communities (“Spaces”): discovery, evaluation, joining, participating, coordinating events, sharing resources, and governing the community.
- Platforms: mobile web + desktop web.

Non‑goals (for this phase)
- No commitment to overlays, feeds, tabs, or sidebars. All patterns compete fairly.
- No commitment to specific data stores or auth flows beyond the ability to prototype.

Stakeholders & Personas (proto)
- Student member: joins, browses, posts, RSVPs, learns norms.
- Student leader: coordinates events, sets policies, moderates, organizes resources.
- Staff/advisor: oversees safety/compliance; audits activity.

Top Outcomes (Jobs to be Done)
- Find the right community and know if I belong.
- Join safely and understand how to participate.
- Share updates and plan events without friction.
- See who’s active and how to help.
- Handle safety issues quickly and fairly.

Key Questions (unknowns to answer)
- Navigation & IA
  - Sidebar vs Tabs vs Bottom Nav vs Command‑first?
  - Are “Events” a separate module or a mode of the Space? (unify vs split)
  - What belongs above the fold for first‑time vs returning visitors?
- Detail Pattern
  - Sheet overlay vs Full page vs Inline expand vs Drawer? For which tasks and why?
  - How should back/forward and deep links behave on mobile/desktop?
- Safety & Governance
  - What moderation actions and visibility states are necessary at MVP?
  - What’s the minimum viable policy surface (posting, joining, visibility)?
- Social Proof & Trust
  - What signals convince a student to join (people, events, verification, norms)?
- Mobile Ergonomics
  - What controls need thumb‑reach optimization? Where can we use gestures?
- Accessibility
  - What interaction patterns are hardest for keyboard and screen reader users?

Option Sets (to compare in research)
- IA Topologies
  - A) Chat‑first (Discord‑like) Space
  - B) Feed‑first (Twitter/FB‑like) Space
  - C) Board/Topic‑first Space (forums)
  - D) Events‑first Space (calendar‑centric)
- Detail Patterns
  - 1) Sheet overlay; 2) Route page; 3) Inline; 4) Drawer (mobile)
- Joining Models
  - Open; Request; Invite‑only
- Safety Models
  - Report → Auto‑hide; Queue‑based review; Role‑gated actions only

Evaluation Rubric
- Orientation (stay in context) • Time‑to‑action • Error rate • A11y success • Mobile ergonomics • Learnability • Satisfaction • Performance budget

Research Plan (what to run)
- Generative: student interviews (n=8–12), card sorting for IA, tree testing for labels, contextual inquiry (events planning).
- Evaluative: usability tests on lo‑fi prototypes (sheet vs route vs inline), then hi‑fi Storybook prototypes; A/B on staging for key funnels (join, RSVP).
- Data: task success/time, SUS, qualitative notes, telemetry events (expand_open/close, rsvp_click, join_click).

Prototypes to build (lo‑fi → hi‑fi)
- Space: 3 IA variants (chat‑first, feed‑first, events‑first), each with mobile/desktop layouts.
- Detail: 3 implementations (sheet, route, inline) for Post, Event, Member.
- Joining: 3 gate flows (open, request, invite) with clear copy and expectations.

Metrics & Acceptance
- Accept a pattern when it outperforms others on: conversion/time‑to‑action (+10–15%), fewer back errors, a11y passes, and within performance budgets.

Deliverables
- Decision doc (pattern chosen + rationale)
- Updated IA map (site map + statecharts/branch trees)
- Interaction specs (states, errors, edge cases)
- Storybook coverage (happy + edge + error per component)

