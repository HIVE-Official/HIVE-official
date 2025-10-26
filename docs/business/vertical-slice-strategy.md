# HIVE Vertical Slice Strategy Playbook

This playbook consolidates the business intent, targets, and research prompts for each launch slice so product teams (and AI copilots) can ideate quickly from a single source.

---

## How to Use This Document
- Ask AI copilots to ideate directly from the **Mission**, **KPIs**, and **Open Questions** bullets in each slice.
- Use the **Research Prompts** lists to kick off competitor scans, survey drafts, usability tests, or growth experiments.
- Follow the **Source Links** to dive deeper into canonical specs and PRDs before committing to a roadmap change.

---

## Global Strategy Snapshot
- **Mission**: Deliver a campus operating system that transforms individual actions into collective campus value. `HIVE_PRD_OCTOBER_LAUNCH.md:5`
- **Primary launch**: University at Buffalo on October 1st with a “no-MVP” promise—every critical slice must be live. `HIVE_PRD_OCTOBER_LAUNCH.md:17`
- **North Star Metrics**: 5,000+ DAU by Month 1, ≥70% weekly retention, 100+ student-created spaces, 50+ daily tool interactions per user. `HIVE_PRD_OCTOBER_LAUNCH.md:250`
- **Engagement Targets**: ≥8 minute sessions, ≥4 sessions per DAU, ≥10 meaningful actions per session, ≥0.4 viral factor. `HIVE_PRD_OCTOBER_LAUNCH.md:256`
- **Launch Funnel Goals**: 500+ signups Day 1, 2,000+ Week 1 actives, 10,000+ Month 1 registrations, 20,000+ Semester 1 users. `HIVE_PRD_OCTOBER_LAUNCH.md:230`

---

## Slice Playcards

### Spaces
- **Mission**: Every campus group, class, and community has a home. `HIVE_PRD_OCTOBER_LAUNCH.md:28`
- **Business Outcomes**: 80% of students join ≥3 spaces Week 1, 95% space retention at 30 days, 3+ tools created per space in Month 1. `HIVE_PRD_OCTOBER_LAUNCH.md:41`
- **Launch Commitments**: 50+ pre-created spaces with RSS events, five space types, embedded leader tooling. `HIVE_PRD_OCTOBER_LAUNCH.md:33`
- **Open Questions**:
  - What governance keeps leader onboarding fast without risking quality?
  - Which space archetypes (academic vs social) drive the highest retention?
- **Research Prompts**:
  - Benchmark onboarding flows from Discord, Slack communities, and campus org tools.
  - Model interventions to move the “join 3 spaces” metric (e.g., auto-join vs recommendations).
  - Survey leaders on the minimum data needed to activate their community during Week 1.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:28`, `HIVE_EVENT_CLUB_PLATFORM.md:1`, `context.md:100`, `docs/business/spaces-strategy.md:1`

### Feed
- **Mission**: All campus activity flows through one intelligent stream. `HIVE_PRD_OCTOBER_LAUNCH.md:46`
- **Business Outcomes**: ≥5 feed checks per DAU, ≤30 seconds to first engagement, ≥60% posts with meaningful interactions. `HIVE_PRD_OCTOBER_LAUNCH.md:57`
- **Launch Commitments**: Smart filtering, ritual milestones, SSE-powered realtime, trending contexts. `HIVE_PRD_OCTOBER_LAUNCH.md:50`
- **Open Questions**:
  - What ranking signals balance novelty vs relevance for new members?
  - How do we avoid “dead air” in the feed between rituals?
- **Research Prompts**:
  - Ideate ranking experiments using space membership, ritual progress, or friend activity.
  - Catalogue anti-spam and quality thresholds from comparable social utilities.
  - Draft qualitative interview guides to understand what “meaningful interaction” means to students.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:46`, `context.md:126`, `docs/main_spec.txt:4000`

### Profile
- **Mission**: Provide complete campus identity in one place. `HIVE_PRD_OCTOBER_LAUNCH.md:62`
- **Business Outcomes**: 90% profile completion, ≥15 views per week, ≥70% add professional info. `HIVE_PRD_OCTOBER_LAUNCH.md:79`
- **Launch Commitments**: Verified .edu badge, academic/social/pro context, privacy controls, badge surfacing. `HIVE_PRD_OCTOBER_LAUNCH.md:66`
- **Open Questions**:
  - How strict should completion gates be before users can access the feed?
  - Which privacy defaults balance safety with discovery?
- **Research Prompts**:
  - Analyze competitor verification flows (Handshake, LinkedIn Campus, GreekRank) for friction points.
  - Simulate copy variants that encourage professional info without scaring students.
  - Explore data partnerships for auto-filling academic info while preserving consent.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:62`, `context.md:108`, `docs/main_spec.txt:40`

### HiveLab (Tools)
- **Mission**: Students build the tools they need. `HIVE_PRD_OCTOBER_LAUNCH.md:84`
- **Business Outcomes**: 100+ tools created Month 1, ≥50% of tools hit 20+ uses, ≥5 tools reach 100+ users. `HIVE_PRD_OCTOBER_LAUNCH.md:100`
- **Launch Commitments**: Visual builder, 20+ starter templates, leader-only gating that expands over 6 weeks. `HIVE_PRD_OCTOBER_LAUNCH.md:88`
- **Open Questions**:
  - Which guardrails prevent tool sprawl while keeping builders empowered?
  - How do we present analytics that leaders actually act on?
- **Research Prompts**:
  - Inventory top workflows for Week 1 builders; propose template backlog ranked by impact.
  - Compare to Notion/Google Forms adoption drivers for student orgs.
  - Brainstorm incentives (badges, ritual tie-ins) that reward high-usage tools.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:84`, `docs/main_spec.txt:6000`, `context.md:170`

### Events
- **Mission**: Never miss what matters on campus. `HIVE_PRD_OCTOBER_LAUNCH.md:105`
- **Business Outcomes**: 500+ RSVPs Week 1, ≥40% RSVP→attendance, ≥80% of events with social engagement. `HIVE_PRD_OCTOBER_LAUNCH.md:116`
- **Launch Commitments**: RSS ingestion (3K events), unified calendar + feed, reminders, social proof. `HIVE_PRD_OCTOBER_LAUNCH.md:109`
- **Open Questions**:
  - Which event metadata unlocks the highest RSVP conversion?
  - How aggressively should we auto-join students to event-rich spaces?
- **Research Prompts**:
  - Audit UB’s existing event feeds to map freshness and taxonomy gaps.
  - Prototype experiments that boost check-in rates (e.g., streaks, ritual tie-ins).
  - Explore partnerships for photo recaps or attendance incentives.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:105`, `docs/foundation/specs/product/event-club-platform.md:1`, `context.md:188`

### Messaging
- **Mission**: Connect instantly with anyone on campus. `HIVE_PRD_OCTOBER_LAUNCH.md:121`
- **Business Outcomes**: 60% send first DM in Week 1, avg. 5 conversations per user, ≤2 minute median response. `HIVE_PRD_OCTOBER_LAUNCH.md:137`
- **Launch Commitments**: 1:1 + group messaging, space member threads, typing/read receipts, media sharing. `HIVE_PRD_OCTOBER_LAUNCH.md:125`
- **Open Questions**:
  - What moderation model protects students without slowing down chat velocity?
  - How tightly should messaging integrate with rituals and events?
- **Research Prompts**:
  - Compare campus chat adoption from GroupMe, Slack, Geneva, Fizz, and Discord.
  - Design experiments to prompt the first DM (post-ritual follow-ups, event RSVP reminders).
  - Map safety triggers (spam, harassment) needing automated detection vs human review.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:121`, `docs/foundation/specs/technical/spec.md:5122`, `docs/foundation/architecture/platform-layout-architecture.md:256`

### Rituals
- **Mission**: Transform individual actions into collective campus moments. `HIVE_PRD_OCTOBER_LAUNCH.md:142`
- **Business Outcomes**: ≥60% weekly participation, ≥80% onboarding ritual completion, ≥0.4 viral coefficient on Torch Pass. `HIVE_PRD_OCTOBER_LAUNCH.md:159`
- **Launch Commitments**: Time-boxed experiences (First Light, Orientation Q&A, Torch Pass, Space Wars) with progressive unlocks. `HIVE_PRD_OCTOBER_LAUNCH.md:153`
- **Open Questions**:
  - How do we sustain ritual novelty after the first month?
  - What rewards meaningfully change behavior (badges, unlocks, IRL perks)?
- **Research Prompts**:
  - Analyze gamification frameworks and campus traditions for ritual inspiration.
  - Simulate viral loop math for Torch Pass and identify choke points.
  - Draft survey items testing student appetite for competitive vs collaborative rituals.
- **Source Links**: `HIVE_PRD_OCTOBER_LAUNCH.md:142`, `docs/main_spec.txt:1400`, `context.md:146`

---

## Cross-Slice Enablers
- **Notifications**: Ethical nudges powering feed, events, messaging, and rituals; instrument CTA conversion and mute rates. `context.md:223`
- **Auth & Onboarding**: Magic link signup, domain guard, profile completion gating—all prerequisites for slice success. `context.md:52`
- **Analytics Stack**: Capture funnel telemetry per slice and surface weekly dashboards for leaders and campus admins. `context.md:9`
- **Risk Mitigation**: RSS cold-start solves discovery, rituals drive engagement, verified profiles build trust. `HIVE_PRD_OCTOBER_LAUNCH.md:243`

Suggested AI prompt: “Summarize week-one experiments that improve both feed engagement and event attendance while respecting the KPIs listed in the playbook.”

---

## Research Backlog (Shared)
1. Segment students by intent (academic vs social vs professional) and map which slice best addresses each persona.
2. Define instrumentation needed to compute the success metrics above in real time.
3. Identify qualitative research partners (ambassadors, res life, student org councils) for ongoing ritual feedback loops.
4. Evaluate cross-campus expansion playbook once UB targets are met.

Use this backlog to assign discovery tasks or to seed AI-led investigation sprints.
