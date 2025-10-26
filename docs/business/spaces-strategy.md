# Spaces Strategy Brief

Version: 2025-10-14  
Bounded Context Owner: Spaces Guild  
Primary Sources: `HIVE_PRD_OCTOBER_LAUNCH.md:28`, `SPACES_IMPLEMENTATION_SUMMARY.md:1`, `docs/design/spaces/STORYBOOK_SCAFFOLD.md:1`, `context.md:105`

---

## 1. Mission & Value
- **Mission** – “Every campus group, class, and community has a home.” `HIVE_PRD_OCTOBER_LAUNCH.md:28`
- **Value Proposition**  
  - Students get pre-seeded communities with events, tools, and messaging that match their interests.  
  - Leaders manage membership, programming, and analytics within minutes instead of juggling Discord, GroupMe, and spreadsheets.  
- **Strategic Role** – Spaces are the anchor for Feed relevance, Event personalization, and Tool adoption; failure here breaks the entire launch promise (Campus Operating System). `HIVE_PRD_OCTOBER_LAUNCH.md:169`

---

## 2. Target Segments & Jobs-to-be-Done
| Segment | Example Personas | Primary Jobs |
| --- | --- | --- |
| **Leaders** | Student org officers, RAs, Greek chapter execs | Launch/organize community quickly, run events, manage roles |
| **Joiners** | First-years, transfers, commuters | Find belonging fast, know what’s happening, reduce FOMO |
| **Contributors** | Event planners, tool builders, ambassadors | Publish posts, install tools, track engagement |
| **Observers** | Faculty advisors, campus staff | Monitor spaces for safety/compliance, pull exports |

JTBD phrasing pulled from `SPACES_IMPLEMENTATION_SUMMARY.md:73` and `context.md:109`.

---

## 3. Success Metrics & Health Targets
- **Launch KPIs (Day 0 → Week 4)** `HIVE_PRD_OCTOBER_LAUNCH.md:41`
  - 80% of students join ≥3 spaces in Week 1.
  - 95% space retention after 30 days.
  - ≥3 tools created per active space by end of Month 1.
- **Operational KPIs** `context.md:110`
  - Active spaces per week, median members per space, churn %, posts per space per week.
  - “Healthy” space benchmark: ≥15 posts/month, ≥2 events scheduled, ≤10% churn.
- Instrumentation must feed into the global dashboard defined in `docs/business/vertical-slice-strategy.md:27`.

---

## 4. Launch Scope & Requirements
- **Minimum Viable Features** (v1)  
  1. Space discovery with filters, search, and type taxonomy.  
  2. Creation wizard with templates for Student Org, Greek, Residential, University Org, Hive Exclusive.  
  3. Space detail layout (60/40) with posts, events rail, members, about, tools.  
  4. Membership management (join, request, invite, role changes, bans).  
  5. Integration hooks for Events, Feed, HiveLab posts, Messaging threads.  
  6. Privacy defaults and campus isolation tags.  
- Storybook coverage checklist lives in `docs/design/spaces/STORYBOOK_SCAFFOLD.md:11`; app wiring should not start until TODOs are closed.

---

## 5. Activation Funnel (Student Journey)
| Funnel Stage | Desired Outcome | UX/Content Levers | KPIs |
| --- | --- | --- | --- |
| **Awareness** | Students land on `/spaces` from welcome mat / rituals | Hero copy, featured carousel, ambassador curated picks | Visitors/day, dwell time |
| **Consideration** | Browse relevant spaces | Filters, tags, friend badges, event previews | Search-to-join conversion |
| **Join** | Join ≥3 spaces in first session | Quick join CTA, auto-join recommended (Welcome, Updates) | Joins per session |
| **Activation** | Post or RSVP within 48h | Onboarding checklist, first-post template, event RSVP nudges | First action rate |
| **Engagement** | Weekly participation | Rituals tie-ins, tool prompts, analytics to leaders | Posts/week, events RSVP |
| **Retention** | Remain active after 30 days | Digest emails, leader reach-outs, highlight contributions | Returning members %, churn |

Dependencies: Feed ranking uses joined spaces; Events widget requires seeded data (`apps/web/src/server/spaces/event-fixtures.ts:1`).

---

## 6. Observability & Telemetry
- **Collections**: Instrument `space_created`, `space_joined`, `space_left`, `space_role_changed`, `space_post_created`, `space_event_created`, `space_event_rsvp`, `space_tool_added`. `context.md:140`
- **Dashboards**: Weekly report with activation funnel, top space growth, risky churn (spaces <5 posts/month).  
- **Leader Brief**: Auto-send insights similar to HiveLab brief (“RSVPs down 20% – schedule reminder?”).
- **Alerting**: Flag spaces with <10 members and no posts after 7 days for ambassador outreach.

---

## 7. Risks & Mitigations
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Cold-start content | Low engagement on launch | RSS pre-seed 3K events + curated starter posts. `HIVE_PRD_OCTOBER_LAUNCH.md:33` |
| Leader overwhelm | Abandoned spaces | Provide checklist & in-app tips (contextual modals) and ambassador office hours. |
| Space spam / low quality | Feed/notification fatigue | Moderation tools, rate limits, quality score gating for feed surfacing. |
| Fragmentation across tools | Students split to Discord/GroupMe | Highlight integrated tools (events, polls, chat) and feature parity comparisons. |
| Privacy incidents | Trust erosion | Enforce campus isolation, role audits, incident workflows. |

---

## 8. Experiment & Growth Backlog
1. **Auto-Join Experiment** – Compare “Welcome” + “Campus Updates” auto-join vs recommendations to hit 3-space target. Measure onboarding completion, opt-out rate.
2. **Space Starter Kit** – Provide templated first posts and events per space type; A/B with empty states on leader satisfaction and first-week activity.
3. **Peer Endorsements** – Show friend/mentor badges (“RA recommends”) in discovery; measure conversion uplift.
4. **Dorm Competition Ritual** – Tie Space Wars to residential spaces; track increase in posts/events vs control dorms.
5. **Leader Analytics Nudges** – Weekly DM/email summarizing growth + suggestions; measure tool adoption uptick.

Each experiment should declare success metric alignment with section 3 KPIs.

---

## 9. Research Prompts & Questions
- **Customer Discovery**  
  - Interview 10 student org leaders: What processes still require external tools post-launch?  
  - Shadow RA programs to understand check-in & event workflows.
- **Competitive Analysis**  
  - Audit Discord server setup, Slack community templates, Geneva campus communities for rapid onboarding tactics.  
  - Map GroupMe usage for event coordination vs persistent community.
- **Quantitative Studies**  
  - Survey 200+ students on the perceived value of auto-joined spaces vs opt-in.  
  - Run conjoint analysis on features (events, messaging, tools) to prioritize build investments.
- **AI Prompt Starters**  
  - “Generate 5 copy variants encouraging freshmen to join 3 spaces aligned with their interests.”  
  - “Outline a 4-week ambassador program to onboard 50 student org leaders while minimizing drop-off.”

Document insights in `docs/business/research.md` (create if missing) and link relevant clips/transcripts.

---

## 10. Dependencies & Interfaces
- **Feeds** – Requires timely propagation of new posts, events, and membership for ranking.  
- **Events** – RSVP pipeline must sync with space calendars; event metrics feed into leader analytics.  
- **Messaging** – Direct/Group chat entry points from member directory; follow presence spec in `docs/foundation/architecture/platform-layout-architecture.md:256`.  
- **HiveLab** – Tool placements available in space context; gating rules align with leader roles.  
- **Notifications** – Join approvals, event reminders, moderation alerts built on the shared notification service. `context.md:223`

---

## 11. Implementation Roadmap (High-Level)
1. **Design Completion** – Close outstanding Storybook TODOs; run a11y & token audits. `docs/design/spaces/STORYBOOK_SCAFFOLD.md:9`
2. **Domain Layer** – Finalize aggregate and repository contracts (`packages/core/src/domain/spaces`).  
3. **API & Persistence** – Implement Graph/HTTP endpoints for creation, discovery, membership.  
4. **UI Integration** – Wire Next.js routes, ensure responsive layout, connect to data layer.  
5. **Instrumentation & Launch Readiness** – Add telemetry, leader briefing pipeline, run load/perf checks.  
6. **Operational Playbook** – Document moderation workflows, ambassador support, incident response.

Track progress in `REBUILD_ROADMAP.md:40`.

---

## 12. Open Decisions
1. **Auto-Join Policy** – Decide per space type vs campus-wide default for onboarding seeds.  
2. **Moderation Escalation Path** – Define when incidents hand off to campus staff vs internal team.  
3. **Role Taxonomy** – Confirm final role labels for each space type (e.g., RA vs Resident Mentor).  
4. **Analytics Exposure** – Determine which metrics leaders see by default and which require HiveLab upgrades.  
5. **Space Monetization (Future)** – Evaluate whether fundraising/ticketing is a post-launch priority or a non-goal (currently out of scope).

Document resolutions back in this brief and update dependent specs.

---

### Quick Prompt Library
- “Generate a playbook for onboarding 100 spaces before launch using ambassadors and incentives.”
- “Suggest experiments to improve the % of space members who RSVP to at least one event in week one.”
- “Draft release notes introducing space analytics dashboards aimed at student leaders.”

Use these prompts with AI copilots to kickstart ideation sessions or documentation drafts.

