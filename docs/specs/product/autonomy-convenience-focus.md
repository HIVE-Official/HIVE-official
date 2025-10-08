# HIVE Student Autonomy & Convenience Focus

## Positioning
- One‑liner: HIVE gives students the tools and trust to self‑organize campus life in seconds.
- Elevator: A campus social utility where students—not institutions—create spaces, run campaigns, and build tools. HIVE supplies the tech and convenience; students supply direction.

## Pillars → Autonomy
- Spaces: Student‑governed communities with roles, membership, and RSS seeding; origin of all posts (students control voice).
- Feed: Read‑only from Spaces for transparent distribution; students shape supply, algorithm ranks transparently.
- Profile: Campus identity + privacy controls; students decide visibility and connections.
- HiveLab: No‑code tool builder so student leaders ship utilities (timers, calculators, forms) without devs.
- Rituals: Student‑run behavioral campaigns (challenges, mutual aid) with campus‑wide progress.

## Core Journeys (Convenience‑first)
- Onboard → auto‑suggest relevant Spaces → join in 2 taps → see Feed in <3s.
- Create: Start a Space or Ritual in <60s; publish to Feed immediately.
- Build: Open HiveLab → pick template → publish tool to a Space; attach to posts and Rituals.
- Help now: “Panic” entry → instant discovery (events/answers/peers) → relief → share.

## Success Metrics (KPIs)
- Core loop performance: Panic‑to‑Relief <10s; app open → feed visible <3s; feed → post <1s; join space <2s.
- Adoption/engagement: Onboarding completion ≥70%; 60% daily active return in 14 days; Rituals participation ≥60% of active users.
- Autonomy: >90% content originates from student‑run Spaces; Student‑led Actions (spaces created, rituals started, tools published) per 1,000 DAU.
- Distribution: Organic invite/share rate; repeat usage of the same feature within 7 days.

## Product Principles
- Students own creation: default permissions and templates bias to “let them build”.
- Transparent distribution: feed is read‑only; clear “why you’re seeing this”.
- Low‑friction everything: 2‑tap joins, zero‑password auth, cached‑first reads.
- Safety with dignity: campus isolation, light‑touch moderation, clear appeals.
- Privacy by default: minimal data, visible controls, reversible choices.

## Messaging Cues (Student‑facing)
- “Run your campus.” “Build what you need.” “No gatekeepers.” “In seconds.”

## Architecture Alignment (Where this lives in code)
- Universal Shell for consistent mobile‑first navigation (docs/architecture/universal-shell.md).
- API routes wrapped by `withAuthAndErrors` enforce auth, campus isolation, and normalized responses (`apps/web/src/lib/middleware/index.ts`).
- Campus isolation across queries and indexes (`firebase/firestore.indexes.json`).
- Pillars implemented across `apps/web/src/app/**` and shared packages (`@hive/*`) for domain, UI, auth, tokens, hooks.

## Launch Scope
- Initial campus: University at Buffalo (SUNY) with @buffalo.edu verification.
- Expand to SUNY system post‑launch; maintain per‑campus isolation and trust.

