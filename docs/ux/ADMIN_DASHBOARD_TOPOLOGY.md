# ADMIN DASHBOARD TOPOLOGY
**Platform Control Center: Broadcasting Campus Evolution**

> **Design Philosophy**: Admin controls the platform narrative, not just manages content
> **Scale Target**: 1 campus → 100 campuses, 100 tools → 10,000 tools, 10 rituals → 100 rituals
> **Performance**: < 800ms dashboard load, < 16ms interactions, real-time monitoring
> **Aesthetic**: Vercel/Linear/DataDog patterns — Professional workflows for platform operators
> **Platform**: Desktop-first (operators at desks, not on phones)

---

## 🎯 Strategic Context

### What Is Admin Dashboard?

**Admin Dashboard** = Platform control center where HIVE team broadcasts new features, triggers campaigns, manages content, and monitors system health.

**Not just content moderation** — Admin dashboard is the **command center** for:
- 🚀 **Platform Push**: Broadcast feature launches, trigger campus-wide campaigns
- 🎯 **Feature Gating**: Control who sees what (cohorts, majors, campuses, A/B tests)
- 🏆 **Ritual Orchestration**: Create and launch admin-only behavioral campaigns
- 🔧 **HiveLab Control**: Approve tools, manage catalog, monitor deployments
- 📊 **System Monitoring**: Firebase quotas, DB performance, real-time alerts
- 👥 **User Management**: Grant roles, moderate content, analyze engagement

### The Admin Philosophy

**Admin = Platform Controller** (not content manager):
```
Admin sees need → Broadcasts feature → Campus adopts → Feedback loop → Iterate

NOT: Admin reacts → Fixes content → Approves posts → Moderates users
```

**Examples of Platform Control**:
- "Push HiveLab to all CS majors starting Monday"
- "Launch Welcome Week ritual campus-wide on Sept 1"
- "Gate rituals: admin-only creation, students participate only"
- "Broadcast announcement: New feed algorithm live"
- "Trigger campaign: Finals Survival Guide rollout"

### Design Principles

1. **Broadcast > Manage**: Push platform evolution, don't just approve content
2. **Gate-keep > Open**: Fine-grained control over feature rollout
3. **Orchestrate > React**: Plan campaigns, don't just respond to flags
4. **Monitor > Ignore**: Real-time visibility into platform health
5. **Automate > Manual**: Smart defaults, bulk actions, scheduled campaigns

---

### Implementation Snapshot — November 4, 2025

- ✅ `/api/admin/dashboard` now runs through `withSecureAuth` + campus isolation, validates output with `AdminDashboardResponseSchema` (Zod) and has an integration test covering UB vs. other campuses.
- ✅ `@hive/ui` hosts the shared admin primitives (`AdminShell`, `AdminTopBar`, `AdminNavRail`, `AdminMetricCard`, `AuditLogList`, `ModerationQueue`, `StatusPill`) with axe-ready Storybook fixtures under `stories/admin`.
- ✅ `apps/web/src/app/admin/page.tsx` composes the new primitives, fetches via `secureApiFetch`, gates access behind `featureFlags.adminDashboard`, and mirrors skeleton/error states defined here.
- ✅ Layout is fully sheet-first and campus-isolated; banner + queue CTAs map directly to ritual, HiveLab, and moderation workflows.

---

## 📐 Dashboard Architecture

### 10-Tab Navigation System

**Main Tabs** (Priority order):
```
1. Overview      - Platform health, quick actions, pending counts
2. Campaigns     - Broadcast features, trigger rituals, schedule rollouts 🆕
3. Rituals       - Create/launch admin-only behavioral campaigns
4. HiveLab       - Catalog, reviews, deployments, quality checks
5. Moderation    - Content flags, auto-workflows, reports
6. Analytics     - Behavioral + content metrics
7. Infrastructure - Firebase, DB, alerts, system health
8. Users         - Distribution, roles, bulk actions
9. Spaces        - Statistics, management, templates
10. Feature Flags - Rollout controls, A/B tests, gates 🆕
```

**Strategic Additions**:
- **Campaigns Tab**: NEW - Platform push capabilities (broadcast, gates, scheduling)
- **Feature Flags Tab**: EXPANDED - Gate-keeping controls moved to dedicated tab

---

## 🚀 S1: Overview Tab

### Layout (Desktop 1440px+)

```
┌─────────────────────────────────────────────────────────────┐
│ HIVE Admin Dashboard              Logged in: admin@hive.com │
│ Complete platform control                    Role: Super Admin
├─────────────────────────────────────────────────────────────┤
│ [Overview] [Campaigns] [Rituals] [HiveLab] [Moderation] ... │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐│
│ │ Platform    │ │ Pending     │ │ HiveLab     │ │ Active ││
│ │ Health      │ │ Actions     │ │ Tools       │ │ Rituals││
│ │             │ │             │ │             │ │        ││
│ │ 92/100      │ │ 7 items     │ │ 147 live    │ │ 2 live ││
│ │ Healthy ✓   │ │ Need review │ │ 12 pending  │ │ 847 pts││
│ └─────────────┘ └─────────────┘ └─────────────┘ └────────┘│
│                                                             │
│ ┌──────────────────────────┐ ┌──────────────────────────┐  │
│ │ Quick Actions            │ │ Recent Activity          │  │
│ │                          │ │                          │  │
│ │ [Broadcast Feature]      │ │ • Sarah approved tool    │  │
│ │ [Launch Ritual]          │ │   "Midterm Poll" 2m ago  │  │
│ │ [Approve Tool]           │ │ • Mike launched ritual   │  │
│ │ [Review Flag]            │ │   "Study Sprint" 1h ago  │  │
│ │ [Grant Role]             │ │ • System alert: High     │  │
│ │ [View Analytics]         │ │   Firebase reads 3h ago  │  │
│ └──────────────────────────┘ └──────────────────────────┘  │
│                                                             │
│ ⚠️ Urgent: 2 builder requests pending >3 days              │
│ 🎯 Reminder: Welcome Week ritual launches in 2 days        │
└─────────────────────────────────────────────────────────────┘
```

### Platform Health Score (92/100)

**Sub-Metrics**:
```
✅ System Status: Healthy (25/25)
   - Firebase: ✓ (89% quotas used)
   - Auth: ✓ (< 50ms avg response)
   - API: ✓ (99.8% uptime)
   - Email: ✓ (Resend operational)

✅ Performance: Good (22/25)
   - Avg response time: 127ms (target <200ms)
   - Error rate: 0.2% (target <1%)
   - P95 latency: 342ms (target <500ms)

⚠️ Pending Actions: Moderate (20/25)
   - 7 items need review (target <5)
   - Oldest: 3 days (target <24h)

✅ User Engagement: Excellent (25/25)
   - DAU: 842 (target >500)
   - Avg session: 8.4 min (target >5 min)
   - Retention: 78% (target >70%)
```

### Quick Stats Cards

**Card 1: Platform Health**:
```css
.stat-card {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  min-width: 200px;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  margin-top: 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.stat-status.healthy {
  background: rgba(34, 197, 94, 0.1);
  color: var(--color-success);
}

.stat-status.warning {
  background: rgba(251, 191, 36, 0.1);
  color: var(--color-warning);
}
```

**Card 2: Pending Actions**:
- Builder requests: 3 pending
- Flagged content: 2 pending
- User reports: 1 pending
- Ritual approvals: 0 (admin creates, no approval needed)
- Space requests: 1 pending

**Card 3: HiveLab Tools**:
- Published: 147 tools
- Pending reviews: 12 tools
- Total installs: 4,289
- Quality issues: 3 tools

**Card 4: Active Rituals**:
- Live now: 2 rituals
- Total participants: 847 students
- Completion rate: 89%
- Next launch: Welcome Week (2 days)

### Quick Actions (Primary CTAs)

```
┌─────────────────────────────────────┐
│ Quick Actions                       │
│                                     │
│ [🚀 Broadcast Feature]              │  ← Platform push
│ [🏆 Launch Ritual]                  │  ← Campaign trigger
│ [✅ Approve Tool]                   │  ← HiveLab control
│ [🚫 Review Flag]                    │  ← Moderation
│ [👤 Grant Role]                     │  ← User management
│ [📊 View Analytics]                 │  ← Insights
└─────────────────────────────────────┘
```

### Recent Activity Feed (Real-Time)

**Auto-refreshes every 30s**:
```typescript
interface AdminActivity {
  id: string;
  type: 'tool_approved' | 'ritual_launched' | 'flag_resolved' | 'role_granted' | 'system_alert';
  adminId: string;
  adminName: string;
  action: string; // "Approved tool 'Midterm Poll'"
  targetId?: string;
  timestamp: Date;
  icon: string; // Lucide icon name
  color: string; // Status color
}
```

**Visual Treatment**:
```
┌─────────────────────────────────────┐
│ Recent Activity (Last 24h)          │
│                                     │
│ ✅ Sarah approved "Midterm Poll"    │
│    2 minutes ago                    │
│                                     │
│ 🏆 Mike launched "Study Sprint"     │
│    1 hour ago · 247 joined          │
│                                     │
│ ⚠️ System alert: High Firebase reads│
│    3 hours ago · Auto-resolved      │
│                                     │
│ 👤 Sarah granted builder role       │
│    5 hours ago · @alex.chen         │
│                                     │
│ [View Full Log]                     │
└─────────────────────────────────────┘
```

---

## 🚀 S2: Campaigns Tab (NEW - Platform Push)

### Strategic Purpose

**Admin broadcasts platform evolution** — not just reacts to user actions.

**Use Cases**:
- "Push HiveLab live to all students Monday 9am"
- "Launch Welcome Week ritual campus-wide Sept 1"
- "Broadcast new feed algorithm announcement"
- "Gate rituals: admin-only creation until mature"
- "Trigger Finals Survival Guide campaign"

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Campaigns                                        [+ New Campaign]
├─────────────────────────────────────────────────────────────┤
│ [Active] [Scheduled] [Completed] [Templates]                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Active Campaigns (2) ────                              │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🏆 Welcome Week Challenge                            │   │
│ │ Launched 2d ago · Ends in 5 days                     │   │
│ │                                                      │   │
│ │ [Progress: 847 participants ──────────── 89%]       │   │
│ │                                                      │   │
│ │ Target: All freshmen (Class of 2028)                │   │
│ │ Status: ✅ On track (89% vs 75% target)             │   │
│ │                                                      │   │
│ │ [View Dashboard] [Pause] [End Early] [⋯]            │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🔧 HiveLab Beta Rollout                              │   │
│ │ Launched 1w ago · Ongoing                            │   │
│ │                                                      │   │
│ │ [Progress: 147 tools created ────── 68%]            │   │
│ │                                                      │   │
│ │ Target: CS majors only (324 students)               │   │
│ │ Status: ⚠️ Slow adoption (68% vs 80% target)        │   │
│ │                                                      │   │
│ │ [Expand to All] [View Metrics] [⋯]                  │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ──── Scheduled Campaigns (3) ────                           │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 📚 Finals Survival Guide                             │   │
│ │ Launches: Nov 25, 9:00 AM (in 18 days)              │   │
│ │                                                      │   │
│ │ Type: Feature launch + content push                 │   │
│ │ Target: All students (2,847)                        │   │
│ │ Actions: Broadcast announcement, pin resources      │   │
│ │                                                      │   │
│ │ [Edit] [Launch Now] [Cancel] [⋯]                    │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Load More...]                                              │
└─────────────────────────────────────────────────────────────┘
```

### Campaign Types

**1. Feature Launch** (Broadcast new capability):
```
Example: "HiveLab now live for all students"

Actions:
- Broadcast platform-wide announcement
- Update feature flag (gate → open)
- Send push notification to target cohort
- Pin announcement in Feed for 7 days
- Track adoption metrics

Timeline:
Scheduled → Countdown → Launch → Monitor → Recap
```

**2. Ritual Launch** (Trigger behavioral campaign):
```
Example: "Welcome Week Challenge"

Actions:
- Create ritual (admin-only)
- Schedule launch date/time
- Target cohort (freshmen only)
- Send launch notification
- Monitor participation
- Auto-post recap on completion

Timeline:
Draft → Scheduled → Active → Paused? → Ended → Recap
```

**3. Content Push** (Broadcast announcement):
```
Example: "New dining hall hours"

Actions:
- Draft announcement (rich text + images)
- Pin in Feed (campus-wide or space-specific)
- Send notification (push + email)
- Set expiration (7 days default)
- Track engagement (views, clicks)

Timeline:
Draft → Scheduled → Live → Pinned → Expired → Archived
```

**4. Feature Gate** (Control rollout):
```
Example: "Enable rituals for CS majors only"

Actions:
- Select feature (Rituals, HiveLab, Events, Tools)
- Select target (cohort, major, space, A/B split)
- Schedule rollout (immediate or date/time)
- Monitor adoption
- Expand/rollback as needed

Timeline:
Draft → Scheduled → Gated → Expanded → Open to All
```

### Campaign Creation Flow

**Step 1: Choose Campaign Type**:
```
┌─────────────────────────────────────┐
│ Create Campaign                     │
│                                     │
│ [🚀 Feature Launch]                 │
│    Broadcast new capability         │
│                                     │
│ [🏆 Ritual Launch]                  │
│    Trigger behavioral campaign      │
│                                     │
│ [📢 Content Push]                   │
│    Broadcast announcement           │
│                                     │
│ [🎯 Feature Gate]                   │
│    Control feature rollout          │
└─────────────────────────────────────┘
```

**Step 2: Configure Campaign** (Smart Defaults):
```
┌─────────────────────────────────────┐
│ Feature Launch: HiveLab             │
│                                     │
│ Name                                │
│ [HiveLab Beta Launch]               │
│                                     │
│ Target Audience                     │
│ [CS Majors ▾]   [324 students]      │
│                                     │
│ Launch Timing                       │
│ [Tomorrow 9:00 AM ▾]                │
│                                     │
│ Notification                        │
│ [✓] Send push notification          │
│ [✓] Send email notification         │
│ [✓] Pin in Feed for 7 days          │
│                                     │
│ Success Metrics                     │
│ Target adoption: [80%]              │
│ Track: [Tool creations, engagement] │
│                                     │
│ ─── Advanced ▾ (collapsed) ───      │
│                                     │
│ [Schedule Campaign] [Cancel]        │
└─────────────────────────────────────┘
```

**Step 3: Review & Launch**:
```
┌─────────────────────────────────────┐
│ Ready to Launch?                    │
│                                     │
│ Campaign: HiveLab Beta Launch       │
│ Target: CS Majors (324 students)    │
│ Launch: Tomorrow 9:00 AM            │
│                                     │
│ Actions:                            │
│ ✓ Update feature flag (gated → CS) │
│ ✓ Send push notification            │
│ ✓ Pin announcement in Feed          │
│ ✓ Track adoption metrics            │
│                                     │
│ [Launch Now] [Schedule] [Cancel]    │
└─────────────────────────────────────┘
```

### Campaign Dashboard (Active Campaign View)

```
┌─────────────────────────────────────────────────────────────┐
│ Welcome Week Challenge Dashboard                            │
├─────────────────────────────────────────────────────────────┤
│ Status: Active · Launched 2d ago · Ends in 5 days           │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐│
│ │ Participants│ │ Completion  │ │ Engagement  │ │ Target ││
│ │             │ │ Rate        │ │ Rate        │ │        ││
│ │ 847 / 952   │ │ 89%         │ │ 94%         │ │ On     ││
│ │ freshmen    │ │ (↑ 12%)     │ │ (↑ 8%)      │ │ Track ✓││
│ └─────────────┘ └─────────────┘ └─────────────┘ └────────┘│
│                                                             │
│ 📊 Participation Over Time                                  │
│ [Line chart: Day 1-7, showing 847 cumulative joins]        │
│                                                             │
│ 🏆 Top Performers (Leaderboard)                             │
│ 1. Sarah Chen - 5/5 tasks ✓                                │
│ 2. Mike Torres - 5/5 tasks ✓                               │
│ 3. Alex Kim - 4/5 tasks                                    │
│ ...847 students total                                       │
│                                                             │
│ 📝 Task Breakdown                                           │
│ • Join 3 spaces: 89% completed                              │
│ • Attend event: 87% completed                               │
│ • Create profile: 94% completed                             │
│ • Post in Feed: 82% completed                               │
│ • Use HiveLab: 78% completed                                │
│                                                             │
│ [Pause Campaign] [End Early] [Export Data] [⋯]             │
└─────────────────────────────────────────────────────────────┘
```

### Campaign Templates (Quick Start)

```
┌─────────────────────────────────────┐
│ Campaign Templates                  │
│                                     │
│ 🎓 Welcome Week Challenge           │
│    5-task onboarding ritual         │
│    Target: Freshmen                 │
│    Duration: 7 days                 │
│    [Use Template]                   │
│                                     │
│ 🔧 HiveLab Beta Launch              │
│    Feature gate + broadcast         │
│    Target: CS majors                │
│    Timeline: Immediate              │
│    [Use Template]                   │
│                                     │
│ 🌱 Sustainability Sprint            │
│    Campus-wide behavior campaign    │
│    Target: All students             │
│    Duration: 14 days                │
│    [Use Template]                   │
│                                     │
│ 📚 Finals Survival Guide            │
│    Content push + resource pin      │
│    Target: All students             │
│    Timeline: Nov 25                 │
│    [Use Template]                   │
│                                     │
│ [+ Create Custom]                   │
└─────────────────────────────────────┘
```

---

## 🏆 S3: Rituals Tab (Admin-Only Creation)

### Strategic Direction

**Rituals are custom-coded, admin-only, gate-kept campaigns**:
- ✅ Admins create rituals (not students)
- ✅ Students participate (join, track progress, earn rewards)
- ✅ Custom-coded initially (not generic builder like HiveLab)
- ✅ Gate-kept until mature (admin board control)

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Rituals                              [+ Create Ritual]       │
├─────────────────────────────────────────────────────────────┤
│ [Active (2)] [Scheduled (1)] [Completed (8)] [Templates]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Active Rituals ────                                    │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🎓 Welcome Week Challenge                            │   │
│ │ Launched Sep 1 · Ends Sep 7 (5 days left)           │   │
│ │                                                      │   │
│ │ [Progress: 847 participants ──────────── 89%]       │   │
│ │                                                      │   │
│ │ Type: Competition · 5 tasks                         │   │
│ │ Target: Freshmen (Class of 2028)                    │   │
│ │ Leaderboard: Public                                 │   │
│ │                                                      │   │
│ │ [View Dashboard] [Pause] [End Early] [⋯]            │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🌱 Sustainability Sprint                             │   │
│ │ Launched Oct 10 · Ends Oct 17 (2 days left)         │   │
│ │                                                      │   │
│ │ [Progress: 623 participants ──────────── 72%]       │   │
│ │                                                      │   │
│ │ Type: Collective · 4 challenges                     │   │
│ │ Target: All students (Campus-wide)                  │   │
│ │ Leaderboard: Hidden                                 │   │
│ │                                                      │   │
│ │ [View Dashboard] [Pause] [End Early] [⋯]            │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ──── Scheduled Rituals ────                                 │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 📚 Finals Survival Challenge                         │   │
│ │ Launches: Nov 25, 9:00 AM (in 18 days)              │   │
│ │                                                      │   │
│ │ Type: Challenge · 6 tasks                           │   │
│ │ Target: All students                                │   │
│ │                                                      │   │
│ │ [Edit] [Launch Now] [Cancel]                        │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Ritual Data Model (Admin View)

```typescript
interface Ritual {
  id: string;
  title: string;
  subtitle: string;
  description: string;

  // Type & Mechanics
  type: 'competition' | 'collective' | 'challenge' | 'social' | 'academic';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';

  // Timing
  startDate: Date;
  endDate: Date;
  duration: '3_days' | '1_week' | '2_weeks' | 'weekend';

  // Visual
  icon: string; // Emoji or Lucide icon
  color: string; // Primary color
  accentColor: string; // Secondary color

  // Target Audience (Gate-Keeping)
  targetAudience: {
    type: 'all' | 'cohort' | 'major' | 'space';
    value?: string; // "Class of 2028", "CS Majors", "Chemistry 101"
    studentCount: number; // Total eligible students
  };

  // Tasks (Custom-Coded)
  tasks: RitualTask[];

  // Rewards
  rewards: {
    type: 'badge' | 'feature_unlock' | 'recognition';
    description: string;
    value?: string;
    unlocksAt: number; // Task count or percentage
  }[];

  // Milestones (Campus-Wide Goals)
  milestones: {
    id: string;
    name: string;
    target: number; // Total actions needed
    reward: string;
    achieved: boolean;
    achievedAt?: Date;
  }[];

  // Participation Stats
  participation: {
    total: number; // Total joined
    activeToday: number; // Active in last 24h
    growth: number; // % change from yesterday
    completionRate: number; // % completed all tasks
    topParticipants: {
      id: string;
      name: string;
      score: number;
      avatar?: string;
    }[];
  };

  // Config
  config: {
    showInFeed: boolean; // S2 Pinned ritual strip
    showLeaderboard: boolean; // Public vs private
    allowLateJoin: boolean; // Can join after start
    notifyOnMilestones: boolean; // Push notifications
    autoComplete: boolean; // End when 100% reached
  };

  // Admin Meta
  createdBy: string; // Admin userId
  createdAt: Date;
  launchedAt?: Date;
  pausedAt?: Date;
  completedAt?: Date;
  recapPosted: boolean; // Auto-post recap to Feed
}

interface RitualTask {
  id: string;
  name: string;
  description: string;
  icon: string;

  // Task Type (Custom-Coded)
  type: 'join_spaces' | 'create_post' | 'attend_event' | 'use_tool' | 'custom';

  // Requirements
  requirements: {
    count?: number; // "Join 3 spaces"
    target?: string; // Specific space/event/tool
    validation?: string; // Custom validation logic
  };

  // Progress Tracking
  completionRate: number; // % of participants completed
  averageTimeToComplete: number; // Hours
}
```

### Ritual Creation Flow (Admin)

**Step 1: Choose Template or Blank**:
```
┌─────────────────────────────────────┐
│ Create Ritual                       │
│                                     │
│ 🎓 Welcome Week Challenge           │
│    5 tasks · 7 days · Freshmen only │
│    [Use Template]                   │
│                                     │
│ 🔥 Space Race                       │
│    3 tasks · 3 days · All students  │
│    [Use Template]                   │
│                                     │
│ 🌱 Sustainability Sprint            │
│    4 tasks · 14 days · Campus-wide  │
│    [Use Template]                   │
│                                     │
│ 📚 Finals Survival Challenge        │
│    6 tasks · 1 week · All students  │
│    [Use Template]                   │
│                                     │
│ [+ Start from Blank]                │
└─────────────────────────────────────┘
```

**Step 2: Configure Ritual** (Smart Defaults):
```
┌─────────────────────────────────────┐
│ Ritual Details                      │
│                                     │
│ Title                               │
│ [Welcome Week Challenge]            │
│                                     │
│ Subtitle (optional)                 │
│ [Complete 5 tasks to earn badge]    │
│                                     │
│ Description                         │
│ [Join your campus community...]     │
│                                     │
│ Type                                │
│ [● Competition ○ Collective ○...]   │
│                                     │
│ Duration                            │
│ [7 days ▾]                          │
│                                     │
│ Target Audience                     │
│ [Freshmen (Class of 2028) ▾]       │
│ 952 students                        │
│                                     │
│ Visual                              │
│ Icon: [🎓] Color: [#FFD700]         │
│                                     │
│ [Next: Add Tasks]                   │
└─────────────────────────────────────┘
```

**Step 3: Add Tasks** (Custom-Coded):
```
┌─────────────────────────────────────┐
│ Ritual Tasks (5)                    │
│                                     │
│ 1. [✓] Join 3 spaces                │
│    Type: join_spaces                │
│    Target: Any 3 spaces             │
│    [Edit] [Remove]                  │
│                                     │
│ 2. [✓] Create profile               │
│    Type: complete_profile           │
│    Target: 100% completion          │
│    [Edit] [Remove]                  │
│                                     │
│ 3. [✓] Attend event                 │
│    Type: attend_event               │
│    Target: Any event                │
│    [Edit] [Remove]                  │
│                                     │
│ 4. [✓] Post in Feed                 │
│    Type: create_post                │
│    Target: 1 post                   │
│    [Edit] [Remove]                  │
│                                     │
│ 5. [✓] Use HiveLab                  │
│    Type: use_tool                   │
│    Target: Submit 1 tool            │
│    [Edit] [Remove]                  │
│                                     │
│ [+ Add Task]                        │
│                                     │
│ [Next: Add Rewards]                 │
└─────────────────────────────────────┘
```

**Step 4: Configure Rewards & Milestones**:
```
┌─────────────────────────────────────┐
│ Rewards & Milestones                │
│                                     │
│ Individual Rewards                  │
│ [✓] Badge: "Welcome Week Warrior"   │
│     Unlocks at: 5/5 tasks           │
│                                     │
│ [✓] Feature unlock: HiveLab access  │
│     Unlocks at: 3/5 tasks           │
│                                     │
│ [+ Add Reward]                      │
│                                     │
│ Campus Milestones                   │
│ [✓] 50% participation → Unlock      │
│     special Feed badge for all      │
│                                     │
│ [✓] 80% participation → Announce    │
│     campus-wide celebration         │
│                                     │
│ [+ Add Milestone]                   │
│                                     │
│ [Next: Review & Launch]             │
└─────────────────────────────────────┘
```

**Step 5: Review & Schedule**:
```
┌─────────────────────────────────────┐
│ Ready to Launch?                    │
│                                     │
│ Ritual: Welcome Week Challenge      │
│ Type: Competition · 7 days          │
│ Target: 952 freshmen                │
│ Tasks: 5 custom tasks               │
│ Rewards: Badge + feature unlock     │
│                                     │
│ Launch Options                      │
│ ● Schedule for later                │
│   [Tomorrow 9:00 AM ▾]              │
│                                     │
│ ○ Launch immediately                │
│                                     │
│ ○ Save as draft                     │
│                                     │
│ Notifications                       │
│ [✓] Send launch notification        │
│ [✓] Show in Feed (S2 Pinned)        │
│ [✓] Notify on milestones            │
│                                     │
│ [Schedule Ritual] [Cancel]          │
└─────────────────────────────────────┘
```

### Ritual Templates (5 Quick-Start)

**1. Welcome Week Challenge**:
- Duration: 7 days
- Tasks: Join 3 spaces, Complete profile, Attend event, Post in Feed, Use HiveLab
- Target: Freshmen
- Reward: "Welcome Week Warrior" badge

**2. Space Race**:
- Duration: 3 days
- Tasks: Join 5 spaces, Get 10 upvotes, Comment 5 times
- Target: All students
- Reward: Top 3 get featured in Feed

**3. 3AM Study Sprint**:
- Duration: 1 night (8pm-3am)
- Tasks: Post study location, Use study tool, Join study group
- Target: All students
- Reward: "Night Owl" badge

**4. Sustainability Sprint**:
- Duration: 14 days
- Tasks: Attend sustainability event, Post eco-tip, Join green space, Use carbon tracker tool
- Target: Campus-wide
- Reward: Campus plants tree if 80% participate

**5. Finals Survival Challenge**:
- Duration: 1 week
- Tasks: Attend study session, Use exam tracker, Share notes, Join study space, Complete wellness check
- Target: All students
- Reward: "Finals Survivor" badge

---

## 🔧 S4: HiveLab Tab (Tool Control Center)

### Current State: A (95/100)

**Already production-grade with 14 admin API routes**.

### 3 Sub-Tabs: Catalog, Reviews, Deployments

#### Catalog Tab (Tool List Management)

```
┌─────────────────────────────────────────────────────────────┐
│ HiveLab Catalog                            [Export CSV ↓]    │
├─────────────────────────────────────────────────────────────┤
│ Search: [____________] [Status ▾] [Owner ▾] [Category ▾]    │
│                                                             │
│ Showing 147 tools · Page 1 of 6 (25/page)                  │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 📊 Midterm Study Poll                                │   │
│ │ by @sarah.chen · Published · 47 responses            │   │
│ │ Deployed: Chemistry 101, CS220                       │   │
│ │                                                      │   │
│ │ [Published ✓] [Run Quality] [View Details] [⋯]      │   │
│ │     ↑ Click to toggle published/hidden               │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 📝 Lab Partner Match                                 │   │
│ │ by @mike.torres · Draft · 0 responses                │   │
│ │ Not deployed                                         │   │
│ │                                                      │   │
│ │ [Draft] [Publish Now] [View Details] [⋯]            │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Load More...]                                              │
└─────────────────────────────────────────────────────────────┘
```

**Filters**:
- **Status**: Published, Draft, Hidden, Rejected, Paused
- **Owner**: Autocomplete user search (name, email, handle, UID)
- **Category**: Poll, Survey, RSVP, Vote, Sign-Up (NEW)
- **Search**: Tool name or ID

**Actions**:
- Click status badge → Toggle published/hidden
- Run Quality → Trigger quality checks for tool
- View Details → Open tool detail page
- CSV Export → Download filtered tool list

#### Reviews Tab (Approval Queue)

```
┌─────────────────────────────────────────────────────────────┐
│ Tool Review Queue                       [Export CSV ↓]       │
├─────────────────────────────────────────────────────────────┤
│ 12 tools pending review · Avg age: 2.3 days                 │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 🎯 Course Feedback Survey                            │   │
│ │ by @alex.kim · Submitted 3 days ago                  │   │
│ │                                                      │   │
│ │ Elements: 8 questions (text, radio, rating)         │   │
│ │ Target: CS220 (89 students)                         │   │
│ │ Quality: ✓ Passed all checks                        │   │
│ │                                                      │   │
│ │ [✅ Approve] [🚫 Reject] [📝 Request Changes]       │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Load More...]                                              │
└─────────────────────────────────────────────────────────────┘
```

**Review Actions**:
- **Approve**: Tool goes live immediately (status → Published)
- **Reject**: Tool rejected, owner notified with reason
- **Request Changes**: Modal opens for feedback notes, sent to owner

#### Deployments Tab (Active Tool Monitoring)

```
┌─────────────────────────────────────────────────────────────┐
│ Tool Deployments                        [Export CSV ↓]       │
├─────────────────────────────────────────────────────────────┤
│ Filters: [Status ▾] [Target ▾] [Sort by ▾]                 │
│                                                             │
│ 89 active deployments                                       │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 📊 Midterm Poll → Chemistry 101                      │   │
│ │ Deployed 2d ago · Closes in 5 days                   │   │
│ │                                                      │   │
│ │ Status: Active · 47 responses · 53% response rate   │   │
│ │ Target: Space (89 members)                          │   │
│ │                                                      │   │
│ │ [Pause] [Disable] [View Analytics] [⋯]              │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [Load More...]                                              │
└─────────────────────────────────────────────────────────────┘
```

**Deployment Actions**:
- **Pause**: Emergency brake (stops accepting responses, reversible)
- **Disable**: Permanent removal from all surfaces
- **View Analytics**: Response data, engagement metrics

### Missing: Tool Detail Page (404 currently)

**Route**: `/admin/hivelab/[toolId]`

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Catalog]              Midterm Study Poll          │
├─────────────────────────────────────────────────────────────┤
│ [Tool] [Responses (47)] [Deployments (2)] [Quality] [Edit]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Tool Overview ────                                     │
│                                                             │
│ Created by: @sarah.chen                                     │
│ Status: Published                                           │
│ Category: Poll                                              │
│ Created: Oct 15, 2024                                       │
│                                                             │
│ ──── Elements (4) ────                                      │
│                                                             │
│ 1. Text: "What's the best study spot?"                     │
│ 2. Radio: 4 options (Lockwood, Union, NSC, Online)         │
│ 3. Results Chart: Bar chart                                │
│ 4. Results Summary: Response count                         │
│                                                             │
│ ──── Deployments (2) ────                                   │
│                                                             │
│ • Chemistry 101: 47 responses (53% rate)                    │
│ • CS220: 23 responses (26% rate)                            │
│                                                             │
│ ──── Quality Checks ────                                    │
│                                                             │
│ ✅ No blocking errors                                       │
│ ⚠️ 2 warnings:                                              │
│   • No close time set (tool open indefinitely)              │
│   • Consider adding description                             │
│                                                             │
│ [Run Quality Checks] [Edit Tool] [Delete Tool]              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 S5-S10: Other Tabs (Brief Overview)

### S5: Moderation Tab

**Content moderation workflows** with real-time stream:
- Flagged content queue (posts, comments, tools)
- Auto-moderation rules (profanity, spam detection)
- Moderation workflows (approve/reject/escalate)
- Content analytics (flagged items by category)

### S6: Analytics Tab

**Behavioral + content metrics**:
- User engagement (DAU, retention, session length)
- Content performance (top posts, spaces, tools)
- Funnel analysis (onboarding completion, tool creation)
- Cohort analysis (freshmen vs seniors engagement)

### S7: Infrastructure Tab

**System monitoring** with 6 sub-tabs:
- Firebase Monitoring (quotas, reads/writes, storage)
- DB Performance (query times, slow queries)
- Alerts (configurable thresholds, email/Slack)
- System Health (uptime, memory, active connections)
- Cache Management (invalidate by pattern)
- Campus Expansion (add new campus workflow)

### S8: Users Tab

**User management**:
- User distribution (by major, year, school)
- Grant roles (admin, moderator, builder)
- Bulk actions (grant builder role to all CS majors)
- User search (by name, email, handle)

### S9: Spaces Tab

**Space management**:
- Space statistics (members, activity, posts/day)
- Create space templates (Dorm Floor, Study Group, Club)
- Space approval (if needed)
- Space analytics (engagement, growth)

### S10: Feature Flags Tab (EXPANDED)

**Feature gate controls** (moved from system settings):
```
┌─────────────────────────────────────────────────────────────┐
│ Feature Flags                           [+ New Flag]         │
├─────────────────────────────────────────────────────────────┤
│ [All] [Core] [Experimental] [Tools] [Spaces] [Admin]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ HiveLab Access                                       │   │
│ │ Status: Gated (CS Majors only)                       │   │
│ │                                                      │   │
│ │ Rollout: 324 students (11% of campus)               │   │
│ │ Type: Cohort (major-based)                          │   │
│ │                                                      │   │
│ │ [Expand to All] [Edit Gate] [Disable] [⋯]          │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Rituals System                                       │   │
│ │ Status: Admin-Only (Gate-Kept)                       │   │
│ │                                                      │   │
│ │ Rollout: 0 students (admins only create)            │   │
│ │ Type: Role-based (admin gate)                       │   │
│ │                                                      │   │
│ │ [Keep Gated] [Open to Students] [⋯]                │   │
│ │     ↑ Warning: Opens ritual creation to students     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ New Feed Algorithm                                   │   │
│ │ Status: A/B Test (50/50 split)                       │   │
│ │                                                      │   │
│ │ Rollout: 50% of users (1,423 students)              │   │
│ │ Type: A/B experiment (random split)                 │   │
│ │ Metrics: Engagement +12%, Retention +8%             │   │
│ │                                                      │   │
│ │ [Roll Out to 100%] [Roll Back] [View Metrics]       │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Gate Types**:
- **All**: Feature enabled for everyone
- **Percentage**: Gradual rollout (10% → 50% → 100%)
- **Cohort**: Target by major, year, school
- **Space**: Enable for specific spaces only
- **A/B Test**: Random 50/50 split with metrics
- **Role-Based**: Admin-only, moderator-only, etc.

---

## 🔧 Component Specifications

### AdminDashboard Component

**File**: `packages/ui/src/atomic/templates/admin-dashboard.tsx`

**Props Interface**:
```typescript
interface AdminDashboardProps {
  // Admin context
  admin: {
    id: string;
    email: string;
    role: 'super_admin' | 'admin' | 'moderator';
    permissions: string[]; // Granular permissions
  };

  // Initial tab
  initialTab?: 'overview' | 'campaigns' | 'rituals' | 'hivelab' | 'moderation' | 'analytics' | 'infrastructure' | 'users' | 'spaces' | 'flags';

  // Real-time data
  platformHealth: PlatformHealthScore;
  pendingCounts: PendingActionCounts;
  recentActivity: AdminActivity[];

  // Callbacks
  onTabChange?: (tab: string) => void;
  onQuickAction?: (action: QuickAction) => void;
}

interface PlatformHealthScore {
  overall: number; // 0-100
  systemStatus: number; // 0-25
  performance: number; // 0-25
  pendingActions: number; // 0-25
  userEngagement: number; // 0-25

  details: {
    firebase: 'healthy' | 'warning' | 'critical';
    auth: 'healthy' | 'warning' | 'critical';
    api: 'healthy' | 'warning' | 'critical';
    email: 'healthy' | 'warning' | 'critical';
  };
}

interface PendingActionCounts {
  builderRequests: number;
  flaggedContent: number;
  userReports: number;
  ritualApprovals: number;
  spaceRequests: number;
  total: number;
}

interface AdminActivity {
  id: string;
  type: 'tool_approved' | 'ritual_launched' | 'flag_resolved' | 'role_granted' | 'system_alert';
  adminId: string;
  adminName: string;
  action: string;
  targetId?: string;
  timestamp: Date;
  icon: string;
  color: string;
}
```

### CampaignManager Component

**File**: `packages/ui/src/atomic/organisms/campaign-manager.tsx`

**Props Interface**:
```typescript
interface CampaignManagerProps {
  // Campaign data
  campaigns: Campaign[];
  templates: CampaignTemplate[];

  // Filters
  activeView: 'active' | 'scheduled' | 'completed' | 'templates';

  // Callbacks
  onCreateCampaign: (type: CampaignType) => void;
  onEditCampaign: (campaignId: string) => void;
  onLaunchCampaign: (campaignId: string) => void;
  onPauseCampaign: (campaignId: string) => void;
  onEndCampaign: (campaignId: string) => void;
  onViewDashboard: (campaignId: string) => void;
}

interface Campaign {
  id: string;
  name: string;
  type: 'feature_launch' | 'ritual_launch' | 'content_push' | 'feature_gate';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';

  // Timing
  scheduledLaunch?: Date;
  launchedAt?: Date;
  endsAt?: Date;
  completedAt?: Date;

  // Target
  targetAudience: {
    type: 'all' | 'cohort' | 'major' | 'space';
    value?: string;
    studentCount: number;
  };

  // Metrics
  metrics: {
    participants?: number;
    adoptionRate?: number;
    engagementRate?: number;
    completionRate?: number;
    onTrack: boolean;
  };

  // Actions
  actions: CampaignAction[];
}

interface CampaignAction {
  type: 'broadcast_announcement' | 'update_feature_flag' | 'send_notification' | 'pin_content' | 'track_metrics';
  status: 'pending' | 'completed' | 'failed';
  completedAt?: Date;
}
```

### RitualCreator Component (Admin)

**File**: `packages/ui/src/atomic/organisms/ritual-creator.tsx`

**Props Interface**:
```typescript
interface RitualCreatorProps {
  // Ritual data (if editing)
  ritual?: Ritual;

  // Templates
  templates: RitualTemplate[];

  // Configuration
  step: 'template' | 'details' | 'tasks' | 'rewards' | 'review';

  // Callbacks
  onSelectTemplate: (templateId: string) => void;
  onUpdateDetails: (details: RitualDetails) => void;
  onUpdateTasks: (tasks: RitualTask[]) => void;
  onUpdateRewards: (rewards: RitualReward[]) => void;
  onSchedule: (launchDate: Date) => void;
  onLaunchNow: () => void;
  onSaveDraft: () => void;
  onCancel: () => void;
}
```

---

## 📊 Technical Architecture

### Admin API Routes (39 existing + 7 NEW rituals)

**Platform Push (NEW)**:
```
POST   /api/admin/broadcast/feature     - Broadcast feature launch
POST   /api/admin/broadcast/campaign    - Trigger campaign
POST   /api/admin/broadcast/announcement - Platform-wide message
POST   /api/admin/features/gate         - Enable/disable feature per cohort
GET    /api/admin/features/rollout      - View rollout status
```

**Rituals (NEW - 7 routes)**:
```
POST   /api/admin/rituals/create        - Create ritual (admin-only)
PATCH  /api/admin/rituals/[id]/update   - Update ritual
DELETE /api/admin/rituals/[id]/delete   - Delete ritual
POST   /api/admin/rituals/[id]/launch   - Launch ritual
POST   /api/admin/rituals/[id]/pause    - Pause ritual
POST   /api/admin/rituals/[id]/end      - End ritual
GET    /api/admin/rituals/list          - List rituals (paginated)
GET    /api/admin/rituals/[id]/stats    - Ritual stats
```

**HiveLab (14 existing routes)**:
```
GET    /api/admin/tools/overview
GET    /api/admin/tools/catalog/list
POST   /api/admin/tools/catalog/status
GET    /api/admin/tools/catalog/export
GET    /api/admin/tools/reviews/list
POST   /api/admin/tools/reviews/action
GET    /api/admin/tools/reviews/overview
GET    /api/admin/tools/reviews/export
GET    /api/admin/tools/deployments/list
POST   /api/admin/tools/deployments/action
GET    /api/admin/tools/deployments/overview
GET    /api/admin/tools/deployments/export
POST   /api/admin/tools/quality/run
GET    /api/admin/tools/quality/overview
```

**Other (25 existing routes)**: Users, Spaces, Moderation, Analytics, Infrastructure, Feature Flags

### Real-Time Updates

**Firebase Snapshots** (30s polling + live updates):
```typescript
// Platform health (30s polling)
useEffect(() => {
  const interval = setInterval(() => {
    fetchPlatformHealth()
  }, 30000)
  return () => clearInterval(interval)
}, [])

// Ritual participation (live snapshot)
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, 'rituals', ritualId),
    (snapshot) => {
      setRitualData(snapshot.data())
    }
  )
  return unsubscribe
}, [ritualId])
```

### Security & Permissions

**Admin Guards**:
```typescript
// HOC that checks admin role
export function withAdminAuth(Component) {
  return function AdminGuard(props) {
    const { user, loading } = useAuth()
    const { admin, adminLoading } = useAdminAuth()

    if (loading || adminLoading) {
      return <AdminLoadingSkeleton />
    }

    if (!user || !admin) {
      redirect('/unauthorized')
    }

    return <Component {...props} admin={admin} />
  }
}

// Route-level middleware
export const GET = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request)

  // Check admin role
  const admin = await verifyAdminRole(userId)
  if (!admin) {
    return respond.forbidden('Admin access required')
  }

  // Proceed with admin action
  // ...
})
```

**Granular Permissions** (Future):
```typescript
interface AdminPermissions {
  canApproveTools: boolean;
  canLaunchRituals: boolean;
  canBroadcastFeatures: boolean;
  canGrantRoles: boolean;
  canDeleteContent: boolean;
  canViewAnalytics: boolean;
  canManageSpaces: boolean;
  canConfigureFlags: boolean;
}
```

---

## 🎯 Performance Budgets

### MVP Targets (10-100 admin actions/day):
- Dashboard load: < 1.5s
- Tab switch: < 300ms
- Real-time updates: < 1s delay
- CSV export: < 3s (100 rows)

### Scale Targets (1000+ admin actions/day, production-grade):
- **Dashboard load**: < 800ms (cold start with real-time data)
- **Tab switch**: < 160ms (instant feel)
- **Real-time updates**: < 500ms (Firebase snapshots)
- **CSV export**: < 5s (10,000 rows with filters)
- **Platform health check**: < 200ms (cached 30s)
- **Admin action**: < 300ms (approve tool, launch ritual)
- **Search**: < 100ms (fuzzy search across 1000+ tools)
- **Bulk operations**: < 2s (bulk approve 50 tools)
- **Analytics dashboard**: < 1.5s (30-day stats)
- **Ritual dashboard**: < 1s (847 participants, leaderboard)

### Optimization Techniques:
- Real-time Firebase snapshots (no polling overhead)
- Debounced search (300ms)
- Paginated lists (25 items/page)
- CSV export via background job (authenticated download)
- Cached platform health (30s TTL)
- Optimistic updates for admin actions
- Lazy-loaded tab content (code-split by tab)

---

## 📋 Testing Strategy

### E2E Tests (Playwright)

**Admin Dashboard Critical Paths**:
```typescript
test('Admin can broadcast feature launch', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin')

  // Navigate to Campaigns tab
  await page.click('[data-testid="campaigns-tab"]')

  // Create feature launch campaign
  await page.click('[data-testid="create-campaign"]')
  await page.click('[data-testid="feature-launch-type"]')

  // Configure campaign
  await page.fill('[data-testid="campaign-name"]', 'HiveLab Launch')
  await page.selectOption('[data-testid="target-audience"]', 'cs-majors')
  await page.click('[data-testid="schedule-campaign"]')

  // Verify campaign created
  await expect(page.locator('[data-testid="campaign-card"]')).toContainText('HiveLab Launch')
})

test('Admin can create and launch ritual', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/rituals')

  // Use template
  await page.click('[data-testid="create-ritual"]')
  await page.click('[data-testid="welcome-week-template"]')

  // Configure ritual
  await page.fill('[data-testid="ritual-title"]', 'Welcome Week 2024')
  await page.selectOption('[data-testid="target-audience"]', 'freshmen')
  await page.click('[data-testid="next-tasks"]')

  // Review and launch
  await page.click('[data-testid="next-review"]')
  await page.click('[data-testid="launch-now"]')

  // Verify ritual launched
  await expect(page.locator('[data-testid="active-rituals"]')).toContainText('Welcome Week 2024')
})

test('Admin can approve HiveLab tool', async ({ page }) => {
  await loginAsAdmin(page)
  await page.goto('/admin/hivelab/reviews')

  // Approve first tool in queue
  await page.click('[data-testid="approve-tool-btn"]:first-of-type')

  // Verify approval
  await expect(page.locator('[data-testid="success-toast"]')).toContainText('Tool approved')
})
```

### Integration Tests (Jest)

**Admin API Routes**:
```typescript
describe('POST /api/admin/broadcast/feature', () => {
  it('broadcasts feature launch to target cohort', async () => {
    const response = await request(app)
      .post('/api/admin/broadcast/feature')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        featureName: 'HiveLab',
        targetAudience: { type: 'major', value: 'CS' },
        launchDate: '2024-11-01T09:00:00Z',
        sendNotification: true
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('campaignId')
  })

  it('rejects non-admin users', async () => {
    const response = await request(app)
      .post('/api/admin/broadcast/feature')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ featureName: 'HiveLab' })

    expect(response.status).toBe(403)
  })
})

describe('POST /api/admin/rituals/create', () => {
  it('creates ritual with custom tasks', async () => {
    const response = await request(app)
      .post('/api/admin/rituals/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Welcome Week',
        type: 'competition',
        duration: '7_days',
        targetAudience: { type: 'cohort', value: 'Class of 2028' },
        tasks: [
          { type: 'join_spaces', requirements: { count: 3 } },
          { type: 'create_post', requirements: { count: 1 } }
        ]
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('ritualId')
    expect(response.body.status).toBe('draft')
  })
})
```

---

## 🎯 Success Metrics

### Platform Control (NEW):
- ✅ Admins can broadcast feature launches
- ✅ Admins can trigger campus-wide campaigns
- ✅ Admins can gate-keep features per cohort
- ✅ Admins can schedule feature rollouts
- ✅ Admins can view campaign timeline
- ✅ Admins can push platform-wide announcements

### HiveLab Control Center:
- ✅ Admins can view all tools with filters
- ✅ Admins can approve/reject/request changes
- ✅ Admins can publish/hide tools with one click
- ✅ Admins can pause/resume/disable deployments
- ✅ Admins can export catalog/reviews/deployments to CSV
- ✅ Admins can view individual tool detail page
- ✅ Admins can trigger quality checks

### Rituals Control Center (Gate-Kept):
- ✅ Admins can create rituals (custom-coded)
- ✅ Admins can launch/pause/resume/end rituals
- ✅ Admins can view participation stats
- ✅ Admins can view leaderboards
- ✅ Admins can view milestones
- ✅ All ritual mutations go through admin APIs
- ✅ **Rituals are admin-only** (students can't create)

### Platform Health:
- ✅ Admins see platform health score (92/100)
- ✅ Admins see pending action counts
- ✅ Admins can toggle feature flags
- ✅ Admins can monitor Firebase quotas, DB performance
- ✅ Admins can view activity log (audit trail)

---

## Appendix A: Quick Reference

### Admin Roles
- **Super Admin**: Full control (all permissions)
- **Admin**: Platform management (no system config)
- **Moderator**: Content moderation only

### Tab Navigation (10 tabs)
1. Overview - Platform health, quick actions
2. **Campaigns** - Broadcast features, trigger campaigns 🆕
3. Rituals - Create/launch admin-only campaigns
4. HiveLab - Catalog, reviews, deployments
5. Moderation - Content flags, workflows
6. Analytics - Behavioral + content metrics
7. Infrastructure - Firebase, DB, alerts
8. Users - Distribution, roles, bulk actions
9. Spaces - Statistics, management
10. **Feature Flags** - Gate controls, A/B tests 🆕

### Quick Actions (6 primary CTAs)
- 🚀 Broadcast Feature
- 🏆 Launch Ritual
- ✅ Approve Tool
- 🚫 Review Flag
- 👤 Grant Role
- 📊 View Analytics

### Platform Health Score (92/100)
- System Status: 25/25
- Performance: 22/25
- Pending Actions: 20/25
- User Engagement: 25/25

### Campaign Types (4)
1. Feature Launch - Broadcast new capability
2. Ritual Launch - Trigger behavioral campaign
3. Content Push - Broadcast announcement
4. Feature Gate - Control rollout per cohort

### Ritual Templates (5)
1. Welcome Week Challenge
2. Space Race
3. 3AM Study Sprint
4. Sustainability Sprint
5. Finals Survival Challenge

---

**Remember**: Admin controls the platform narrative. Broadcast evolution, don't just approve content. Gate-keep features, don't just react. Orchestrate campaigns, don't just moderate. HIVE succeeds when admins act as **platform controllers**, not content managers.

---

## 🛠️ DEEP SYSTEM CONTROLS (Platform Architecture)

**Strategic Shift**: Admin doesn't just monitor systems — **admin architects the platform mechanics**.

**New Capability**: Each major system (Feed, Spaces, Profile, HiveLab, Rituals, Infrastructure) gets a **deep configuration panel** where admins control:
- Algorithm parameters
- Content policies
- Feature toggles
- Quality thresholds
- User flows
- System behavior

---

## 🎯 S11: Feed System Control (Deep Config)

### Access: Overview Tab → [Feed System ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Feed System Configuration                                   │
├─────────────────────────────────────────────────────────────┤
│ [Algorithm] [Content Policy] [Discovery] [Performance]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Algorithm Tuning ────                                  │
│                                                             │
│ Ranking Weights (total must = 100)                         │
│ • Recency:        [40] %  (how much time matters)          │
│ • Engagement:     [30] %  (upvotes, comments, shares)      │
│ • Social proof:   [20] %  (connection activity)            │
│ • Diversity:      [10] %  (space/content mix)              │
│                                                             │
│ Time Decay Function                                         │
│ • Half-life:      [24] hours                               │
│   (when posts lose 50% ranking weight)                     │
│                                                             │
│ Content Boost Rules                                         │
│ • Pinned posts:   [+50] % boost                            │
│ • Ritual banners: [+100] % boost                           │
│ • Event posts:    [+20] % boost (< 24h before)            │
│ • New users:      [+30] % boost (first 7 days)            │
│                                                             │
│ ──── Content Filtering ────                                 │
│                                                             │
│ Minimum Quality Thresholds                                  │
│ • Min characters: [10] (text posts)                        │
│ • Max posts/hour: [5] per user (spam prevention)           │
│ • Min account age: [1] hours before posting                │
│                                                             │
│ Content Type Toggles                                        │
│ [✓] Text posts                                             │
│ [✓] Image posts (max 10 images)                           │
│ [✓] Tool cards                                             │
│ [✓] Event cards                                            │
│ [✓] Ritual banners (S2 Pinned)                            │
│ [○] Video posts (not implemented)                          │
│                                                             │
│ Auto-Moderation Rules                                       │
│ [✓] Hide profanity automatically                           │
│ [✓] Flag spam patterns (>5 identical posts)               │
│ [✓] Require image moderation (AI scan)                    │
│ [○] Manual approval for new users                          │
│                                                             │
│ ──── Discovery Settings ────                                │
│                                                             │
│ Trending Thresholds                                         │
│ • Min upvotes:    [10] in last 24h                         │
│ • Min comments:   [3] in last 24h                          │
│ • Min shares:     [2] in last 24h                          │
│                                                             │
│ Feed Refresh Rate                                           │
│ • Pull-to-refresh: [Enabled ▾]                             │
│ • Auto-refresh:    [Every 60s ▾]                           │
│ • Max posts/load:  [25] (infinite scroll batch)            │
│                                                             │
│ [Save Changes] [Reset to Defaults] [Test Algorithm]        │
└─────────────────────────────────────────────────────────────┘
```

### Algorithm Testing Tool

**Admin can test algorithm changes before applying**:
```
┌─────────────────────────────────────────────────────────────┐
│ Algorithm Tester                                            │
│                                                             │
│ Preview feed with new settings:                             │
│                                                             │
│ Old Algorithm (Current)      New Algorithm (Preview)       │
│ ┌───────────────────────┐   ┌───────────────────────┐    │
│ │ Post A (score: 87)    │   │ Post C (score: 92)    │    │
│ │ Post B (score: 84)    │   │ Post A (score: 89)    │    │
│ │ Post C (score: 81)    │   │ Post B (score: 85)    │    │
│ └───────────────────────┘   └───────────────────────┘    │
│                                                             │
│ Changes:                                                    │
│ • Recency weight: 30% → 40% (+10%)                         │
│ • Engagement weight: 40% → 30% (-10%)                      │
│                                                             │
│ Impact Estimate:                                            │
│ • 15% of posts will reorder                                │
│ • Event posts will rank higher (due to recency boost)      │
│ • Older popular posts will rank lower                      │
│                                                             │
│ [Apply to All Users] [A/B Test 50/50] [Cancel]            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏠 S12: Spaces System Control (Deep Config)

### Access: Spaces Tab → [System Config ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Spaces System Configuration                                 │
├─────────────────────────────────────────────────────────────┤
│ [Auto-Join] [Templates] [Policies] [Discovery]              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Auto-Join Rules ────                                   │
│                                                             │
│ Residential Spaces (Dorm assignment)                        │
│ [✓] Auto-join students to their dorm floor space           │
│     Rule: housing.building == space.building                │
│     Example: "Ellicott - Red Jacket Hall"                   │
│     This sets user.defaultSpace                             │
│                                                             │
│ Major Spaces (Declared major)                               │
│ [✓] Auto-join students to their major space                │
│     Rule: profile.major == space.major                      │
│     Example: "Computer Science Majors"                      │
│     Delay: [24h] after major declared                       │
│                                                             │
│ Class Cohort Spaces (Graduation year)                       │
│ [✓] Auto-join students to class cohort space               │
│     Rule: profile.gradYear == space.cohort                  │
│     Example: "Class of 2028"                                │
│     Immediate on account creation                           │
│                                                             │
│ ──── Space Templates ────                                   │
│                                                             │
│ Admin can create/edit space templates:                      │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Dorm Floor Space Template                            │   │
│ │                                                      │   │
│ │ Name pattern: [Building Name] - [Floor Name]        │   │
│ │ Example: "Ellicott - Red Jacket Hall"               │   │
│ │                                                      │   │
│ │ Auto-populate fields:                                │   │
│ │ [✓] Building (from housing data)                     │   │
│ │ [✓] Floor (from room assignment)                     │   │
│ │ [○] RA contact (manual entry)                        │   │
│ │                                                      │   │
│ │ Default settings:                                    │   │
│ │ • Category: Residential                              │   │
│ │ • Visibility: Private (members only)                │   │
│ │ • Auto-join: Yes (housing match)                    │   │
│ │ • Max members: 200 (floor size)                     │   │
│ │                                                      │   │
│ │ [Edit Template] [Preview] [Delete]                  │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Template]                                        │
│                                                             │
│ ──── Content Policies ────                                  │
│                                                             │
│ Space Membership Limits                                     │
│ • Max spaces per student: [20]                             │
│ • Min leaders per space:  [1]                              │
│ • Max leaders per space:  [5]                              │
│                                                             │
│ Post Policies (per space type)                              │
│ • Residential spaces:                                       │
│   - Max posts/day per user: [Unlimited ▾]                  │
│   - Require moderation: [No ▾]                             │
│                                                             │
│ • Class/Major spaces:                                       │
│   - Max posts/day per user: [10 ▾]                         │
│   - Require moderation: [Leaders only ▾]                   │
│                                                             │
│ • Club spaces:                                              │
│   - Max posts/day per user: [5 ▾]                          │
│   - Require moderation: [Yes ▾]                            │
│                                                             │
│ Pinned Post Rules                                           │
│ • Max pins per space: [2]                                  │
│ • Pin duration: [7 days ▾] (auto-unpin after)             │
│ • Who can pin: [Leaders only ▾]                            │
│                                                             │
│ ──── Discovery Settings ────                                │
│                                                             │
│ Space Recommendations                                       │
│ • Recommend based on: [✓] Major [✓] Interests [○] Friends │
│ • Max recommendations: [12] spaces shown                    │
│ • Refresh frequency: [Daily ▾]                             │
│                                                             │
│ Search & Browse                                             │
│ • Min members to show in browse: [5]                       │
│ • Sort default: [Most active ▾]                            │
│ • Show inactive spaces: [No ▾]                             │
│                                                             │
│ [Save Changes] [Reset to Defaults]                         │
└─────────────────────────────────────────────────────────────┘
```

### Space Creation Wizard (Admin)

**Admin can create spaces manually for new cohorts/majors**:
```
┌─────────────────────────────────────────────────────────────┐
│ Create Space (Admin)                                        │
│                                                             │
│ Step 1: Choose Template                                     │
│ [Residential] [Major] [Class Cohort] [Club] [Custom]       │
│                                                             │
│ Step 2: Configure                                           │
│ Name: [Chemistry 101]                                       │
│ Handle: [@chem101]                                          │
│ Category: [Academic ▾]                                      │
│ Visibility: [Public ▾]                                      │
│                                                             │
│ Auto-Join Rules:                                            │
│ [✓] Students enrolled in CHEM 101                          │
│     (sync with course enrollment system)                    │
│                                                             │
│ Initial Leaders:                                            │
│ [@prof.chen] (Course instructor)                           │
│ [@ta.mike]   (Teaching assistant)                          │
│ [+ Add Leader]                                              │
│                                                             │
│ Step 3: Review & Create                                     │
│ • Will create space "Chemistry 101"                        │
│ • Will auto-join 89 enrolled students                      │
│ • Will assign 2 leaders                                    │
│                                                             │
│ [Create Space] [Cancel]                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 👤 S13: Profile System Control (Deep Config)

### Access: Users Tab → [Profile System ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Profile System Configuration                                │
├─────────────────────────────────────────────────────────────┤
│ [Onboarding] [Verification] [Privacy] [Fields]              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Onboarding Flow ────                                   │
│                                                             │
│ Step Configuration (10 steps)                               │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Step 1: User Type                                    │   │
│ │ Status: [✓ Enabled]                                  │   │
│ │ Options: Student, Faculty, Staff                     │   │
│ │ Required: Yes                                        │   │
│ │ [Edit Step] [Preview] [Disable]                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Step 2: Name                                         │   │
│ │ Status: [✓ Enabled]                                  │   │
│ │ Fields: First name, Last name                        │   │
│ │ Required: Yes                                        │   │
│ │ Validation: [2-50 chars each]                        │   │
│ │ [Edit Step] [Preview] [Disable]                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Step 3: Handle                                       │   │
│ │ Status: [✓ Enabled]                                  │   │
│ │ Format: @[username]                                  │   │
│ │ Required: Yes                                        │   │
│ │ Validation: [3-20 chars, alphanumeric + underscore] │   │
│ │ Check availability: Real-time                        │   │
│ │ [Edit Step] [Preview] [Disable]                     │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ... (7 more steps)                                          │
│                                                             │
│ [Reorder Steps] [Add Custom Step] [Preview Full Flow]      │
│                                                             │
│ ──── Verification Rules ────                                │
│                                                             │
│ Email Verification                                          │
│ • Allowed domains: [@buffalo.edu]                          │
│ • Allow subdomains: [No ▾]                                 │
│ • Require verification: [Yes ▾]                            │
│ • Verification method: [Magic link ▾]                      │
│ • Link expiry: [24 hours ▾]                                │
│                                                             │
│ Campus Assignment                                           │
│ • Auto-assign campus: [Yes ▾]                              │
│ • Rule: email.domain → campus mapping                      │
│ • Example: @buffalo.edu → UB Buffalo                       │
│                                                             │
│ Manual Verification (Staff/Faculty)                         │
│ [○] Require admin approval for faculty accounts            │
│ [○] Require department verification                        │
│                                                             │
│ ──── Privacy Defaults ────                                  │
│                                                             │
│ New Account Defaults                                        │
│ Profile visibility: [Public ▾]                             │
│ Connection visibility: [Connections only ▾]                │
│ Activity visibility: [Public ▾]                            │
│ Space membership: [Public ▾]                               │
│                                                             │
│ Privacy Options (what students can change)                  │
│ [✓] Allow hiding profile from search                       │
│ [✓] Allow hiding connection list                           │
│ [✓] Allow hiding activity timeline                         │
│ [○] Allow hiding space memberships (force public)          │
│                                                             │
│ ──── Profile Fields ────                                    │
│                                                             │
│ Required Fields (can't skip)                                │
│ [✓] Name                                                   │
│ [✓] Handle                                                 │
│ [✓] Graduation year (students only)                        │
│ [✓] Major (students only)                                  │
│ [✓] Housing (students only)                                │
│ [○] Department (faculty only)                              │
│                                                             │
│ Optional Fields (students can skip)                         │
│ [✓] Profile photo                                          │
│ [✓] Bio (max 200 chars)                                    │
│ [✓] Interests (max 10)                                     │
│ [✓] Social links (Instagram, LinkedIn)                     │
│ [○] Phone number                                           │
│                                                             │
│ [Save Changes] [Reset to Defaults] [Test Onboarding]       │
└─────────────────────────────────────────────────────────────┘
```

### Onboarding Analytics

**Admin can see onboarding drop-off rates**:
```
┌─────────────────────────────────────────────────────────────┐
│ Onboarding Funnel Analysis (Last 30 days)                  │
│                                                             │
│ Started: 2,847 students                                     │
│                                                             │
│ Step 1: User Type           2,847 → 2,829 (-0.6%) ✓       │
│ Step 2: Name                2,829 → 2,804 (-0.9%) ✓       │
│ Step 3: Handle              2,804 → 2,743 (-2.2%) ⚠️       │
│ Step 4: Photo               2,743 → 2,401 (-12.5%) 🔴      │
│ Step 5: Academics           2,401 → 2,389 (-0.5%) ✓       │
│ Step 6: Housing             2,389 → 2,381 (-0.3%) ✓       │
│ Step 7: Interests           2,381 → 2,298 (-3.5%) ⚠️       │
│ Step 8: Legal               2,298 → 2,294 (-0.2%) ✓       │
│ Step 9: Builder             2,294 → 2,287 (-0.3%) ✓       │
│ Step 10: Completion         2,287 → 2,287 (0%) ✓          │
│                                                             │
│ Completed: 2,287 (80.3% completion rate)                   │
│                                                             │
│ Insights:                                                   │
│ 🔴 Photo upload has 12.5% drop-off (biggest friction)     │
│    → Consider making optional or simplifying upload         │
│                                                             │
│ ⚠️ Handle selection has 2.2% drop-off                      │
│    → May indicate confusion or availability issues          │
│                                                             │
│ [Export Data] [Optimize Flow] [View Individual Sessions]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 S14: HiveLab System Control (Deep Config)

### Access: HiveLab Tab → [System Config ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ HiveLab System Configuration                                │
├─────────────────────────────────────────────────────────────┤
│ [Quality] [Catalog] [Elements] [Approvals]                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Quality Thresholds ────                                │
│                                                             │
│ Blocking Errors (prevent publish)                           │
│ [✓] No elements (empty tool)                               │
│ [✓] No submit button (can't complete)                      │
│ [✓] > 20 elements (too complex)                            │
│ [✓] Duplicate element IDs                                  │
│ [○] Missing description (allow)                            │
│                                                             │
│ Soft Warnings (show but allow publish)                      │
│ [✓] > 12 elements (recommend split)                        │
│ [✓] > 5 days open (encourage shorter)                      │
│ [✓] No results element (users can't see outcome)           │
│ [○] No validation rules (allow)                            │
│                                                             │
│ Tool Limits                                                 │
│ • Max elements per tool: [20]                              │
│ • Max open duration: [7 days ▾]                            │
│ • Max results views: [3] (Summary, Chart, Table)          │
│ • Max tool actions: [2] per post                           │
│                                                             │
│ ──── Catalog Visibility ────                                │
│                                                             │
│ Who can create tools?                                       │
│ [● All verified students]                                  │
│ [○ Only builders (granted role)]                           │
│ [○ Only space leaders]                                     │
│ [○ Admin-only (gate-kept)]                                 │
│                                                             │
│ Tool Lifecycle                                              │
│ • New tools start as: [Draft ▾]                            │
│ • Require approval: [No ▾] (pilot mode only)              │
│ • Pilot duration: [30 days ▾]                              │
│ • Pilot space limit: [2 spaces ▾]                          │
│ • After pilot: [Auto-certify ▾] or [Require review ▾]     │
│                                                             │
│ Catalog Categories                                          │
│ [✓] Poll (60% of tools)                                    │
│ [✓] RSVP (20% of tools)                                    │
│ [✓] Vote (10% of tools)                                    │
│ [✓] Survey (5% of tools)                                   │
│ [✓] Sign-Up (5% of tools)                                  │
│ [○] Quiz (future - not implemented)                        │
│                                                             │
│ ──── Element Library ────                                   │
│                                                             │
│ BUILD Elements (Input)                                      │
│ [✓] Text Input                                             │
│ [✓] Textarea                                               │
│ [✓] Radio (single choice)                                  │
│ [✓] Checkbox (multi-choice)                                │
│ [✓] Toggle (on/off)                                        │
│ [✓] Slider (numeric range)                                 │
│ [✓] Image Upload                                           │
│ [✓] Video Embed                                            │
│ [✓] Section (divider)                                      │
│                                                             │
│ RESULTS Elements (Display)                                  │
│ [✓] Results Summary                                        │
│ [✓] Results Chart                                          │
│ [✓] Data Table                                             │
│                                                             │
│ ADVANCED Elements                                           │
│ [○] Conditional (show/hide based on answers)              │
│     (disabled - low usage, high complexity)                │
│                                                             │
│ [Enable All] [Disable All] [Add Custom Element]           │
│                                                             │
│ ──── Approval Workflows ────                                │
│                                                             │
│ Approval Process                                            │
│ Mode: [○ Auto-approve all] [● Manual review] [○ Smart]    │
│                                                             │
│ Manual Review Triggers:                                     │
│ [✓] First tool from new user                               │
│ [✓] Tool with > 15 elements                                │
│ [✓] Tool targeting > 500 students                          │
│ [○] Tool from flagged user                                 │
│                                                             │
│ Smart Approval (ML-based):                                  │
│ [○] Auto-approve tools similar to past approved tools     │
│ [○] Flag tools with quality issues for review             │
│ [○] Trust high-reputation builders (skip review)           │
│                                                             │
│ Review SLA                                                  │
│ • Target review time: [24 hours ▾]                         │
│ • Alert admins after: [72 hours ▾]                         │
│ • Auto-approve if: [No review in 7 days ▾]                │
│                                                             │
│ [Save Changes] [Reset to Defaults]                         │
└─────────────────────────────────────────────────────────────┘
```

### Template Management

**Admin can create/edit HiveLab templates**:
```
┌─────────────────────────────────────────────────────────────┐
│ HiveLab Template Editor                                     │
│                                                             │
│ Template: Poll (Most popular - 60% of tools)               │
│                                                             │
│ Pre-populated Elements:                                     │
│ 1. [Text] Question: "What's the best study spot?"         │
│ 2. [Radio] Options: 4 choices                              │
│    - Lockwood Library                                       │
│    - Student Union                                          │
│    - NSC                                                    │
│    - Online (Zoom)                                          │
│ 3. [Results Summary] Response count                        │
│                                                             │
│ [+ Add Element] [Preview] [Save Template] [Delete]        │
│                                                             │
│ Usage Stats:                                                │
│ • 89 tools created from this template (last 30d)           │
│ • 94% publish rate (creators complete & deploy)            │
│ • 4.2/5 avg rating from creators                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏆 S15: Rituals System Control (Deep Config)

### Access: Rituals Tab → [System Config ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Rituals System Configuration                                │
├─────────────────────────────────────────────────────────────┤
│ [Task Types] [Rewards] [Participation] [Milestones]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Custom Task Type Library ────                          │
│                                                             │
│ Admin defines custom task types for ritual creation:        │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Task Type: join_spaces                               │   │
│ │ Name: "Join Spaces"                                  │   │
│ │ Description: "Join a specified number of spaces"     │   │
│ │                                                      │   │
│ │ Parameters:                                          │   │
│ │ • count: number (how many spaces)                    │   │
│ │ • target: string[] (specific spaces, optional)       │   │
│ │                                                      │   │
│ │ Validation Logic:                                    │   │
│ │ [Code editor with TypeScript validation function]    │   │
│ │                                                      │   │
│ │ Progress Tracking:                                   │   │
│ │ • Query: user.spaces.length >= task.count           │   │
│ │ • Updates: Real-time on space join                   │   │
│ │                                                      │   │
│ │ [Edit Task Type] [Test] [Delete]                    │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Task Type: create_post                               │   │
│ │ Name: "Create Post"                                  │   │
│ │ Description: "Post in Feed or Space"                 │   │
│ │                                                      │   │
│ │ Parameters:                                          │   │
│ │ • count: number (how many posts)                     │   │
│ │ • target: 'feed' | 'space' | 'any'                  │   │
│ │ • minLength: number (min characters, optional)       │   │
│ │                                                      │   │
│ │ [Edit Task Type] [Test] [Delete]                    │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Task Type]                                       │
│                                                             │
│ ──── Reward Configuration ────                              │
│                                                             │
│ Reward Types                                                │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Reward: Badge                                        │   │
│ │ Name: "Welcome Week Warrior"                         │   │
│ │ Icon: 🎓                                             │   │
│ │ Description: "Completed Welcome Week Challenge"      │   │
│ │                                                      │   │
│ │ Unlock Criteria:                                     │   │
│ │ • Complete all tasks (5/5)                           │   │
│ │                                                      │   │
│ │ Visibility:                                          │   │
│ │ [✓] Show on profile                                  │   │
│ │ [✓] Show in leaderboard                              │   │
│ │ [○] Send notification on unlock                      │   │
│ │                                                      │   │
│ │ [Edit Reward] [Preview] [Delete]                    │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Reward: Feature Unlock                               │   │
│ │ Name: "HiveLab Access"                               │   │
│ │ Description: "Unlock tool creation"                  │   │
│ │                                                      │   │
│ │ Unlock Criteria:                                     │   │
│ │ • Complete 3/5 tasks                                 │   │
│ │                                                      │   │
│ │ Feature Gate:                                        │   │
│ │ • Feature: hivelab_access                            │   │
│ │ • Action: Grant builder role                         │   │
│ │                                                      │   │
│ │ [Edit Reward] [Test] [Delete]                       │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Reward]                                          │
│                                                             │
│ ──── Participation Rules ────                               │
│                                                             │
│ Global Settings                                             │
│ • Max active rituals per user: [5]                         │
│ • Allow late join: [Yes ▾] (join after start)             │
│ • Progress sync: [Real-time ▾]                             │
│ • Leaderboard refresh: [Every 30s ▾]                       │
│                                                             │
│ Notification Rules                                          │
│ [✓] Notify on ritual launch                                │
│ [✓] Notify on milestone reached                            │
│ [✓] Notify on task completion                              │
│ [○] Notify daily reminders                                 │
│ [○] Notify on leaderboard position change                  │
│                                                             │
│ Completion Criteria                                         │
│ • Min tasks for completion: [All tasks ▾]                  │
│ • Allow partial credit: [No ▾]                             │
│ • Auto-complete after: [Never ▾] (or set time limit)      │
│                                                             │
│ ──── Milestone Templates ────                               │
│                                                             │
│ Campus-Wide Milestones (collective goals)                   │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Milestone: 50% Participation                         │   │
│ │ Target: 476 students (50% of freshmen)              │   │
│ │                                                      │   │
│ │ Reward: Unlock special Feed badge for all           │   │
│ │                                                      │   │
│ │ Trigger:                                             │   │
│ │ • When: ritual.participants >= ritual.target * 0.5  │   │
│ │ • Action: Broadcast announcement, grant badge        │   │
│ │                                                      │   │
│ │ [Edit Milestone] [Preview] [Delete]                 │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Milestone]                                       │
│                                                             │
│ [Save Changes] [Reset to Defaults]                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ S16: Infrastructure Deep Control

### Access: Infrastructure Tab → [Advanced Config ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Infrastructure Configuration                                │
├─────────────────────────────────────────────────────────────┤
│ [Firebase] [Rate Limits] [Cache] [Email] [Monitoring]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Firebase Configuration ────                            │
│                                                             │
│ Database Indexes                                            │
│ [View Firestore Indexes] [Add Index] [Export Config]       │
│                                                             │
│ Security Rules                                              │
│ [Edit Rules ⚙️]  ← Opens in-browser code editor            │
│                                                             │
│ Storage Rules                                               │
│ • Max file size: [10 MB ▾]                                 │
│ • Allowed types: [image/*, video/* ▾]                      │
│ • Storage quota: [5 GB per user ▾]                         │
│                                                             │
│ Quota Monitoring                                            │
│ • Firestore reads: 847K / 1M (84.7%)                       │
│ • Firestore writes: 124K / 500K (24.8%)                    │
│ • Storage: 2.3 GB / 5 GB (46%)                             │
│ • Auth operations: 12K / 50K (24%)                         │
│                                                             │
│ Alert Thresholds                                            │
│ • Alert at: [80% ▾] of quota                               │
│ • Notify: [admin@hive.com ▾]                               │
│ • Auto-throttle at: [95% ▾]                                │
│                                                             │
│ ──── Rate Limiting ────                                     │
│                                                             │
│ API Rate Limits (per IP)                                    │
│ • Global: [60] req/min                                     │
│ • Auth: [10] req/min                                       │
│ • Spaces: [30] req/min                                     │
│ • Feed: [100] req/min                                      │
│ • HiveLab: [20] req/min                                    │
│                                                             │
│ User Action Limits                                          │
│ • Max posts/hour: [5] per user                             │
│ • Max tool creates/day: [10] per user                      │
│ • Max space joins/day: [20] per user                       │
│ • Max upvotes/min: [30] per user                           │
│                                                             │
│ Throttle Behavior                                           │
│ • Response: [429 Too Many Requests ▾]                      │
│ • Retry-After: [60 seconds ▾]                              │
│ • Ban after: [5 violations ▾] in 24h                       │
│                                                             │
│ ──── Cache Configuration ────                               │
│                                                             │
│ Redis Cache (if enabled)                                    │
│ • TTL (time-to-live):                                      │
│   - Platform health: [30s ▾]                               │
│   - Space list: [5min ▾]                                   │
│   - Tool catalog: [10min ▾]                                │
│   - User profiles: [1hour ▾]                               │
│                                                             │
│ Cache Invalidation                                          │
│ [Invalidate All] [Invalidate by Pattern]                   │
│                                                             │
│ Pattern Examples:                                           │
│ • spaces:*        (all spaces)                             │
│ • tools:user:123  (user's tools)                           │
│ • profile:*       (all profiles)                           │
│                                                             │
│ ──── Email Templates ────                                   │
│                                                             │
│ Admin can edit email templates (Resend):                    │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Magic Link Email                                     │   │
│ │                                                      │   │
│ │ Subject: [Log in to HIVE]                           │   │
│ │                                                      │   │
│ │ Body: (HTML editor)                                  │   │
│ │ ───────────────────────────────────────────          │   │
│ │ Hi {{name}},                                         │   │
│ │                                                      │   │
│ │ Click below to log in to HIVE:                      │   │
│ │ [Login to HIVE] ← Button links to {{magicLink}}     │   │
│ │                                                      │   │
│ │ This link expires in 24 hours.                      │   │
│ │                                                      │   │
│ │ ────────────────────────────────────────────         │   │
│ │                                                      │   │
│ │ Variables available:                                 │   │
│ │ • {{name}}        - User's name                     │   │
│ │ • {{email}}       - User's email                    │   │
│ │ • {{magicLink}}   - Login link                      │   │
│ │ • {{expiresAt}}   - Expiration time                 │   │
│ │                                                      │   │
│ │ [Preview] [Send Test] [Save] [Reset]                │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ Other Templates:                                            │
│ • Welcome email (onboarding complete)                      │
│ • Ritual launch notification                               │
│ • Tool approved notification                               │
│ • Space invitation                                         │
│ • Password reset (if implemented)                          │
│                                                             │
│ ──── Monitoring & Alerts ────                               │
│                                                             │
│ Alert Channels                                              │
│ [✓] Email: admin@hive.com                                  │
│ [✓] Slack: #hive-alerts                                    │
│ [○] PagerDuty (not configured)                             │
│                                                             │
│ Alert Rules                                                 │
│ • Firebase quota > 80%                                     │
│ • API error rate > 1%                                      │
│ • Response time > 500ms (P95)                              │
│ • Tool approval queue > 10                                 │
│ • Flagged content > 5                                      │
│                                                             │
│ [Save Changes] [Test Alerts] [View Logs]                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 S17: Analytics Deep Control

### Access: Analytics Tab → [Custom Metrics ⚙️]

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Analytics Configuration                                     │
├─────────────────────────────────────────────────────────────┤
│ [Custom Metrics] [Reports] [Exports] [Privacy]              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ──── Custom Metric Definitions ────                         │
│                                                             │
│ Admin can define custom analytics metrics:                  │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Metric: Tool Creation Funnel                         │   │
│ │ Type: Conversion Funnel                              │   │
│ │                                                      │   │
│ │ Steps:                                               │   │
│ │ 1. Visit HiveLab page                                │   │
│ │ 2. Click "Create Tool"                               │   │
│ │ 3. Add first element                                 │   │
│ │ 4. Save draft                                        │   │
│ │ 5. Deploy tool                                       │   │
│ │                                                      │   │
│ │ Tracked Events:                                      │   │
│ │ • hivelab_page_view                                  │   │
│ │ • tool_create_start                                  │   │
│ │ • tool_element_added                                 │   │
│ │ • tool_draft_saved                                   │   │
│ │ • tool_deployed                                      │   │
│ │                                                      │   │
│ │ Current Performance:                                 │   │
│ │ Step 1 → 2: 68% (dropoff: 32%)                      │   │
│ │ Step 2 → 3: 89% (dropoff: 11%)                      │   │
│ │ Step 3 → 4: 76% (dropoff: 24%)                      │   │
│ │ Step 4 → 5: 94% (dropoff: 6%)                       │   │
│ │                                                      │   │
│ │ Overall: 68% × 89% × 76% × 94% = 41% conversion     │   │
│ │                                                      │   │
│ │ [Edit Metric] [View Report] [Delete]                │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Metric]                                          │
│                                                             │
│ ──── Scheduled Reports ────                                 │
│                                                             │
│ Admin can schedule automated reports:                       │
│                                                             │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Report: Weekly Engagement Summary                    │   │
│ │ Schedule: [Every Monday 9:00 AM ▾]                   │   │
│ │                                                      │   │
│ │ Metrics Included:                                    │   │
│ │ [✓] DAU, WAU, MAU                                    │   │
│ │ [✓] Retention (7-day, 30-day)                        │   │
│ │ [✓] Session length (avg)                             │   │
│ │ [✓] Top spaces (by activity)                         │   │
│ │ [✓] Top tools (by responses)                         │   │
│ │ [○] Cohort analysis                                  │   │
│ │                                                      │   │
│ │ Recipients:                                          │   │
│ │ • admin@hive.com                                     │   │
│ │ • team@hive.com                                      │   │
│ │ [+ Add Recipient]                                    │   │
│ │                                                      │   │
│ │ Format: [PDF ▾] or [CSV ▾]                          │   │
│ │                                                      │   │
│ │ [Edit Report] [Send Now] [Disable] [Delete]         │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                             │
│ [+ Add New Report]                                          │
│                                                             │
│ ──── Data Export Rules ────                                 │
│                                                             │
│ Export Permissions                                          │
│ • Who can export data: [Admins only ▾]                    │
│ • Max rows per export: [10,000 ▾]                          │
│ • Export rate limit: [3 exports/hour ▾]                   │
│                                                             │
│ Data Retention                                              │
│ • Analytics data: [90 days ▾]                              │
│ • Audit logs: [1 year ▾]                                   │
│ • User activity: [30 days ▾]                               │
│                                                             │
│ Anonymization                                               │
│ [✓] Anonymize PII in exports (email, name)                │
│ [✓] Hash user IDs in public reports                       │
│ [○] Remove location data (not collected)                   │
│                                                             │
│ ──── Privacy Controls ────                                  │
│                                                             │
│ User Data Visibility                                        │
│ • Show individual user data: [Admins only ▾]              │
│ • Show aggregated data: [All admins ▾]                    │
│ • Allow user data deletion: [Yes ▾]                        │
│                                                             │
│ GDPR Compliance                                             │
│ [✓] Allow data export requests (user profile data)        │
│ [✓] Allow data deletion requests (right to be forgotten)  │
│ [✓] Log all data access by admins (audit trail)           │
│                                                             │
│ [Save Changes] [Export Current Config]                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Summary: Deep System Control Impact

### What Admins Can Now Control

**1. Feed Algorithm** (S11):
- Ranking weights (recency vs engagement)
- Time decay parameters
- Content boost rules
- Minimum quality thresholds
- Auto-moderation policies
- **Test algorithm before deploying**

**2. Spaces System** (S12):
- Auto-join rule configuration
- Space template creation/editing
- Membership limits per student
- Content policies by space type
- Discovery recommendation settings

**3. Profile & Onboarding** (S13):
- 10-step onboarding flow configuration
- Field requirements (required/optional)
- Verification rules (@buffalo.edu patterns)
- Privacy defaults for new accounts
- **Onboarding funnel analytics**

**4. HiveLab Quality** (S14):
- Quality thresholds (blocking vs warnings)
- Tool element library (enable/disable)
- Approval workflow configuration
- Catalog visibility rules
- **Template creation/editing**

**5. Rituals Mechanics** (S15):
- Custom task type definitions
- Reward configuration (badges, unlocks)
- Participation rules
- Milestone templates
- **Code-level task validation**

**6. Infrastructure** (S16):
- Firebase configuration & security rules
- Rate limiting per endpoint
- Cache TTL configuration
- Email template editing
- Alert rules & monitoring

**7. Analytics** (S17):
- Custom metric definitions
- Scheduled report automation
- Data export rules
- Privacy controls & GDPR compliance

### API Routes for System Configuration

**New System Config Routes** (+14 routes):
```
GET    /api/admin/system/feed/config
POST   /api/admin/system/feed/config
POST   /api/admin/system/feed/test-algorithm

GET    /api/admin/system/spaces/config
POST   /api/admin/system/spaces/config
POST   /api/admin/system/spaces/templates/create

GET    /api/admin/system/profile/config
POST   /api/admin/system/profile/config
GET    /api/admin/system/profile/funnel-analytics

GET    /api/admin/system/hivelab/config
POST   /api/admin/system/hivelab/config

GET    /api/admin/system/rituals/config
POST   /api/admin/system/rituals/config

GET    /api/admin/system/infrastructure/config
POST   /api/admin/system/infrastructure/config
```

---

**Final Count**: 46 existing routes + 14 new system config routes = **60 total admin API routes**

**Strategic Impact**: Admin is now a **platform architect**, not just a dashboard operator. Every major system can be tuned, configured, and optimized without code changes. This enables rapid iteration, A/B testing, and campus-specific customization.
