# HIVE Domain Glossary & Context Map

> Drafted from `docs/foundation/architecture/ddd-foundation.md`, `hive-ddd-architecture.md`, and related specs. Last updated: 2025-10-09.

---

## 1. Ubiquitous Language

| Term | Definition | Notes / Synonyms to Avoid |
| --- | --- | --- |
| **Connection Moment** | A student’s decision point to interact with the community (e.g., join, post, respond). | Avoid “panic moment”. |
| **Engagement Loop** | Behavioural loop: Discovery → Interaction → Feedback → Return. Trackable via session metrics. |  |
| **Space** | Community hub organized around student needs/interests. | Not group/channel/forum. |
| **Leader** | Student who created & manages a space. | Not admin/owner/moderator. |
| **Member** | Student who has joined a space. | Not subscriber/follower. |
| **Post** | Content shared within a space. | Not message/update. |
| **Handle** | User’s unique identifier (`@username`). | Not username/nickname. |
| **Profile** | Student’s campus identity/presence. | Not account/page. |
| **Campus** | University affiliation (currently UB). | Not school/institution. |
| **Ritual** | Campus-wide engagement campaign with milestones. | Not challenge/campaign/event. |
| **Tool** | Leader-created interactive element for a space (HiveLab output). | Not widget/plugin. |
| **Discovery** | Process of finding relevant spaces/content. | Not search/explore. |
| **Social Proof** | Validation through peer presence/activity. |  |
| **Engagement Rate** | % of users completing an interaction loop (target 70%). |  |
| **Freshness Target** | Feed should show new content within 3 seconds of opening. |  |
| **Ranking Signals** | Factors influencing feed order: recency, space relevance, pinned posts, campus priorities. |  |
| **Connector** | Managed integration module (calendar, email, LMS, etc.) installable via HiveLab. | Built-in packs + SDK for campus IT. |
| **Connector SDK** | Public API for building approved HiveLab connectors. | Open-sourced; submissions require governance approval. |

### Additional Domain Elements
- **Waitlist** – Pre-launch capture for campuses not yet active.
- **Verification** – `.edu` email-based trust layer, includes role claims (Verified+, Leader).
- **Investment** – User actions that deepen engagement (joining spaces, contributing content, building tools).
- **HiveLab** – Tool builder environment for leaders; outputs Tools deployed within spaces.
- **Ritual Milestone** – Defined achievement within a ritual campaign (e.g., participation count).

---

## 2. Bounded Contexts (Desired DDD Architecture)

### 2.1 Community (Spaces & Feed)
- **Purpose**: Manage spaces, posts, membership, discovery, and real-time content.
- **Core Aggregates**: Space, Post, Membership, Feed Session, EnhancedFeed.
- **Key Behaviors**: Space discovery algorithms, feed aggregation, SSE updates, notifications for community activity.
- **Interfaces**: Provides read APIs/feed streams to Identity and Activation contexts; consumes verification info from Identity.

### 2.2 Identity (Profiles & Trust)
- **Purpose**: Handles user profiles, handles, campus verification, and connection graph.
- **Core Aggregates**: Profile, Handle, Verification Request, Connection.
- **Key Behaviors**: `.edu` verification, role claims (Leader, Verified+), profile customization, connection management.
- **Interfaces**: Supplies profile/verification data to Community, Activation, and Governance contexts.

### 2.3 Activation (Rituals & HiveLab)
- **Purpose**: Drive engagement through rituals and leader-created tools.
- **Core Aggregates**: Ritual, Ritual Milestone, HiveLab Tool, Deployment.
- **Key Behaviors**: Ritual campaign lifecycle, tool creation/publishing, participation tracking, investment metrics.
- **Interfaces**: Consumes Space/Member data from Community; reports metrics back to Governance.

### 2.4 Governance (Admin & Moderation)
- **Purpose**: Platform oversight, moderation, analytics, operational tooling.
- **Core Aggregates**: Audit Log, Moderation Action, Feature Flag, Admin Dashboard State.
- **Key Behaviors**: Automated/assisted moderation workflows, analytics dashboards, feature flag management, security checks.
- **Interfaces**: Pulls data from all other contexts; enforces policies back into them.

### 2.5 Platform Services (Cross-cutting)
- **Purpose**: Authentication, session management, security, notifications, billing (future).
- **Components**: Auth middleware, rate limiting (Redis), Firebase admin wrappers, logging, error monitoring.
- **Relationship**: Supports all contexts but should avoid housing domain rules.

---

## 3. Context Interaction Map

```
Identity ─┬── provides profile & trust signals ─────────┐
          │                                             │
          ▼                                             ▼
Community ─── supplies activity & membership metrics ─→ Governance
          ▲                                             ▲
          │                                             │
Activation ─── reports engagement outcomes ─────────────┘

Platform Services (auth, security, notifications) underpin all contexts.
```

Key flows:
- **Onboarding**: Identity verifies campus → Community suggests spaces → Activation offers rituals/tools.
- **Leader Workflow**: Identity grants Leader role → Community manages space → Activation deploys tools → Governance monitors health.
- **Moderation**: Governance flags content → Community applies actions; Identity updates trust scores; Activation adjusts engagement strategies.

---

## 4. References

Primary sources in this repo:
- `docs/foundation/architecture/ddd-foundation.md`
- `docs/foundation/architecture/hive-ddd-architecture.md`
- `docs/foundation/architecture/domain-bdd-scenarios.md`
- `docs/foundation/specs/technical/*.md`

As we refine the domain, update this glossary and map so it remains the single source of truth for terminology and context boundaries.
