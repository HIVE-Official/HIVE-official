Status: Draft
Owner: Product + Platform Leads
Last updated: 2025-10-16

# Full‑Stack Execution Spec (Non‑Developer View)

Purpose
- Align product, design, and engineering on what we are building, in what order, across the full stack for each vertical slice. This is written in plain language with only minimal technical references.
- We follow Backend‑First Execution: complete data models, domain logic, persistence, APIs, rules, and telemetry before UI/UX. UI is listed but deferred until contracts are stable.

Personas
- Student: joins spaces, posts, RSVPs, connects with peers, uses tools.
- Leader: configures space settings, moderation, installs tools, views analytics.
- Admin: observes platform health, lists users/spaces, checks moderation.

KPIs (starter)
- Onboarding completion rate; time to first join.
- Space activity (posts/day), event RSVPs, tool usage DAU/WAU.
- Connection accept rate; presence engagement.

Stack Order (per slice)
1) Data & Policies (entities, visibility, permissions)
2) Domain Logic & Services (business rules)
3) API Endpoints (inputs/outputs in plain terms)
4) Rules & Indexes (security and performance)
5) Events & Telemetry (what we measure/emit)
6) UI Surfaces (deferred until 1–5 are done)

Notes
- This document is the non‑dev source of truth for scope and acceptance. For code details, see docs/business/PLATFORM_VERTICAL_SLICES.md.

---

## Identity & Onboarding

Business Goal
- Help students sign in with their campus identity and complete a short setup so we can personalize their experience and auto‑join the right spaces.

Outcomes
- 90%+ complete onboarding in one session; students join at least 1 space instantly.

User Stories
- “As a student, I sign in with my campus email, claim a handle, and choose interests so I see relevant spaces right away.”

Full‑Stack Spec
- Data & Policies
  - Session, Profile, Onboarding Progress. Handles must be unique; onboarding can resume if interrupted.
- Domain & Services
  - Magic link sign‑in; progress service; auto‑join cohort spaces on completion.
- API
  - Sign up, verify magic link, session read/delete; onboarding progress read/write; profile basics.
- Rules & Indexes
  - Students can only update their own profile/progress; handle checks locked by index.
- Events & Telemetry
  - OnboardingStarted/Completed; email send failures; throttle counts.
- UI (Deferred)
  - Wizard screens; handle checker; consent confirmations.

Acceptance
- If a student refreshes, their progress resumes; incorrect handles are rejected; throttle prevents abuse; successful completion auto‑joins the default spaces.

---

## Profiles

Business Goal
- Represent a student’s identity privately by default, with clear controls for visibility and connections.

Outcomes
- Students can update their info; privacy defaults safe; connections feel predictable.

User Stories
- “As a student, I can connect with a classmate, and I decide what others can see.”

Full‑Stack Spec
- Data & Policies
  - Profile snapshot (identity, privacy, presence, stats). Connections are mutual for v1.
- Domain & Services
  - Update details; privacy settings; connect/disconnect transactions; presence snapshot.
- API
  - GET/UPDATE profile; GET/POST/DELETE connections; GET privacy; PATCH privacy.
- Rules & Indexes
  - Only owner can update profile/privacy; connection docs write both sides atomically.
- Events & Telemetry
  - ProfileUpdated; ConnectionMade; presence snapshots for online/recent.
- UI (Deferred)
  - Profile overview, connections panel, privacy banner.

Acceptance
- Updates validate and persist; connections are symmetrical; privacy reads reflect settings; presence shows reasonable defaults when missing.

---

## Spaces

Business Goal
- Spaces are where coordination happens: posts, events, tools, and membership live here.

Outcomes
- Students quickly find and join relevant spaces; leaders manage settings and moderation safely.

User Stories
- “As a leader, I can post an announcement and see member activity.”

Full‑Stack Spec
- Data & Policies
  - Space (type, visibility), Members (roles), Posts (kinds: standard, event, poll, announcement, etc.).
- Domain & Services
  - Space catalog; join/leave; post create/list; moderation states; pinned posts.
- API
  - Catalog; GET space by id; list posts; create post; join/leave; member role set.
- Rules & Indexes
  - Visibility respected: campus vs members; leaders can pin/moderate; queries indexed by spaceId and recency.
- Events & Telemetry
  - PostCreated; PostPinned; MemberJoined; moderation actions.
- UI (Deferred)
  - Space header/layout; BoardCard variants; context widgets; composer.

Acceptance
- New posts appear in space lists; membership policies enforced; moderation status travels with the post.

---

## Feed

Business Goal
- A single feed to see relevant activity across joined spaces.

Outcomes
- Students see recent, permitted posts first; can page back smoothly.

User Stories
- “As a student, I scroll recent updates from my spaces and tap through to details.”

Full‑Stack Spec
- Data & Policies
  - Feed items are space posts filtered by membership and campus visibility.
- Domain & Services
  - List with cursor pagination and optional before time; serialize post view model.
- API
  - GET /api/feed?limit=&cursor=
- Rules & Indexes
  - Queries optimized by campus, membership, createdAt.
- Events & Telemetry
  - Scroll depth; item views; click‑throughs (later).
- UI (Deferred)
  - Infinite scroll; engagement toolbars; comment preview.

Acceptance
- Stable pagination and consistent item shapes; visibility rules applied.

---

## HiveLab Tools

Business Goal
- Let leaders create lightweight tools (forms, trackers, polls) and deploy them into spaces.

Outcomes
- Tools can be drafted, published, visibility‑controlled, and deployed; usage tracked.

User Stories
- “As a leader, I publish a form tool and add it to my space composer.”

Full‑Stack Spec
- Data & Policies
  - Tool (status, visibility, elements), deployments per space; ownership required for changes.
- Domain & Services
  - Create draft; publish; update visibility; deploy; record usage.
- API
  - Dashboard (owned/drafts/published); POST create; POST publish; POST visibility; POST deploy; PUT elements; POST archive; POST use; GET campus catalog (filters).
- Rules & Indexes
  - Only owners can publish/deploy; queries by campus/visibility indexed.
- Events & Telemetry
  - ToolPublished/Deployed/UsageRecorded; counters for DAU/WAU.
- UI (Deferred)
  - Catalog, Builder (editor, visibility controls), Analytics, Placement configuration.

Acceptance
- Visibility transitions guarded; deployments appear in space context; usage increments accurately.

---

## Notifications & Presence

Business Goal
- Make it easy to notice important activity and see who’s around, without noise.

Outcomes
- Presence signals update within ~60s; important actions surface as notifications.

User Stories
- “As a student, I see when teammates are online and get notified about key posts.”

Full‑Stack Spec
- Data & Policies
  - Presence snapshot; notification queue docs; user prefs later.
- Domain & Services
  - Presence publisher; notification writer and reader.
- API
  - GET presence; GET notifications (later POST to acknowledge/read).
- Rules & Indexes
  - Only owner can read notifications; efficient presence reads.
- Events & Telemetry
  - PresenceUpdated; NotificationSent; delivery/latency metrics.
- UI (Deferred)
  - Badges, toasts, inbox; presence dots.

Acceptance
- Presence updates visible within SLA; notifications list shows recent items with safe defaults.

---

## Admin (Ops)

Business Goal
- Give the team a safe, read‑only dashboard to monitor activity and review moderation.

Outcomes
- Admin‑only access; pages load key lists and stats; no PII leakage.

User Stories
- “As an admin, I can see new signups, active spaces, and items needing review.”

Full‑Stack Spec
- Data & Policies
  - Admin role gates all pages; no write actions in v1.
- Domain & Services
  - Read metrics and lists from existing routes.
- API
  - Reuse public server routes where possible; add protected ones later.
- Rules & Indexes
  - Middleware checks role; ensure robots noindex.
- Events & Telemetry
  - Page views for audit; error surfaces.
- UI (Deferred)
  - Overview, Users, Spaces, Moderation, Analytics, Settings.

Acceptance
- Non‑admins are blocked; lists render quickly; sensitive data hidden.

---

## Sequencing (Order of Work)

1) Identity & Onboarding — finalize auto‑join, throttling, and email sender; lock profile snapshot.
2) Spaces — freeze serializers; Firestore parity for posts; baseline rules.
3) Feed — cursor pagination contract; list tests.
4) HiveLab Tools — campus catalog endpoint; policy ports enforced; minimal telemetry.
5) Admin — role middleware + reference lists.
6) Notifications & Presence — presence publisher + snapshot API; basic notification queue.
7) UI/UX — build from Storybook once contracts are stable.

---

## Acceptance Checklist (Global)
- All endpoints have clear inputs/outputs; unauthorized access blocked by rules/middleware.
- Minimal analytics events emitted for critical actions.
- Indexes documented and deployed for hot queries.
- Contracts documented here match server serializers used by UI later.

