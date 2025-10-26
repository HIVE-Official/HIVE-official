# 🏗️ HIVE Spaces - Complete Architecture V4

**Date**: January 2025  
**Status**: ✅ **PRODUCTION READY**  
**Model**: Hub Layout with Widget System

---

## 🎯 Value Proposition

### The Problem Spaces Solves

**Student orgs at UB are scattered:**

- Events on Facebook, Instagram, and GroupMe
- Announcements lost in email chains
- Member rosters in messy spreadsheets
- No central hub for "what's happening"

**Students can't discover opportunities:**

- Don't know what orgs exist
- Can't see what events are coming up
- No way to gauge if a club is active
- FOMO about campus life

**Org leaders struggle to organize:**

- Multiple platforms to manage
- Can't easily announce to members
- Hard to track RSVPs
- No tools for check-ins, polls, signups

---

### The HIVE Spaces Solution

**Spaces are pre-seeded community hubs** where campus life actually happens.

**For Students:**

- ✅ Discover active orgs at a glance (member counts, recent posts, upcoming events)
- ✅ See what's happening this week (events, announcements, discussions)
- ✅ RSVP to events in one tap
- ✅ Connect with members who are online now
- ✅ Access resources (Discord links, Drive folders, meeting notes)

**For Org Leaders:**

- ✅ Centralized home for their community
- ✅ Post announcements, events, polls with rich formatting
- ✅ Track RSVPs and check-ins
- ✅ See who's active and engaged
- ✅ Use HiveLab tools (custom forms, trackers, signups)
- ✅ Pre-seeded with RSS content (no empty state)

**For Campus Admins:**

- ✅ Pre-seed spaces for all student orgs
- ✅ Auto-populate events from official calendars (RSS)
- ✅ Verify official orgs
- ✅ Monitor activity and health

---

## 🏛️ Information Architecture

### Space Types

```
Spaces (by type)
├── Student Organizations (60%)
│   ├── Academic (CS Club, Math Society)
│   ├── Cultural (Asian Students Union, Latinx Student Association)
│   ├── Sports (Intramural teams, Club sports)
│   └── Special Interest (Coding club, Dance team)
│
├── Living Communities (20%)
│   ├── Dorms (Greiner Hall, Governors)
│   └── Off-Campus (Apartments, Houses)
│
├── Academic (15%)
│   ├── Courses (CSE 220, MTH 141)
│   ├── Study Groups
│   └── Research Labs
│
└── Social/Interest (5%)
    ├── Hobbies (Photography, Gaming)
    └── Meetups (Pickup basketball, Study cafes)
```

---

## 📐 Page Anatomy (Hub Layout)

### Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│ Header (Fixed)                                                  │
│ ┌───────────────────────────────┬───────────────────────────┐   │
│ │ UB Computer Science Club ★    │ [Join Space]              │   │
│ │ Student Organization • 342    │                           │   │
│ └───────────────────────────────┴───────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ Main Content Area                                               │
│ ┌───────────────────────────────┬───────────────────────────┐   │
│ │ Feed (65%)                    │ Widgets (35%)             │   │
│ │                               │                           │   │
│ │ [Create: Post|Event|Poll] ▼   │ 📅 NEXT EVENT            │   │
│ │                               │ TypeScript Workshop       │   │
│ │ 📌 PINNED                     │ Today 6PM • [RSVP]        │   │
│ │ ┌───────────────────────────┐ │                           │   │
│ │ │ 🎓 Spring Hackathon      │ │ 👥 WHO'S HERE            │   │
│ │ │    [RSVP: Going ✓]       │ │ 🟢 12 online now         │   │
│ │ └───────────────────────────┘ │ [avatars]                 │   │
│ │                               │                           │   │
│ │ 📅 UPCOMING EVENTS            │ 📅 THIS WEEK             │   │
│ │ ┌───────────────────────────┐ │ Today: Workshop          │   │
│ │ │ Workshop - Today 6PM     │ │ Fri: Showcase            │   │
│ │ │ 23 going • [RSVP]        │ │                           │   │
│ │ └───────────────────────────┘ │ 📚 RESOURCES             │   │
│ │                               │ • Discord Server          │   │
│ │ 💬 RECENT ACTIVITY            │ • GitHub Org              │   │
│ │ [All|Events|Discussions]      │ • Meeting Notes           │   │
│ │ ┌───────────────────────────┐ │                           │   │
│ │ │ Alex: Deployed my app!   │ │ (All widgets scroll)      │   │
│ │ │ 👍 18 💬 7               │ │                           │   │
│ │ └───────────────────────────┘ │                           │   │
│ │ (Feed scrolls)                │                           │   │
│ └───────────────────────────────┴───────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Column Distribution**:

- **Left (65%)**: Feed-first content
- **Right (35%)**: Widget system (actionable utility)

---

### Mobile Layout (<768px)

```
┌─────────────────────┐
│ Header (Fixed)      │
│ CS Club ★           │
│ [Join]              │
├─────────────────────┤
│ [Create ▼]          │
│                     │
│ 📌 PINNED           │
│ Hackathon 2025      │
│                     │
│ 📅 UPCOMING         │
│ Workshop - Today    │
│                     │
│ 💬 RECENT           │
│ Alex: Deployed...   │
│                     │
│ (Scroll for more)   │
│                     │
│ [📊 Widgets] ←──────│ Bottom drawer
└─────────────────────┘
```

**Mobile Behavior**:

- Feed takes full width
- Widgets hidden by default
- Tap floating action button to open widget drawer
- Header collapses on scroll

---

## 🎨 Content Hierarchy

### Priority Levels

**1. Pinned Content** (Always Visible)

- Position: Top of feed
- Max: 3 pinned posts
- Use: Important announcements, upcoming big events
- Visual: Gold border + pin icon

**2. Upcoming Events** (High Priority)

- Position: Below pinned, above regular posts
- Next 3 events shown in feed
- Full event cards with RSVP buttons
- Visual: Event-specific styling (date badge, location, RSVP counts)

**3. Recent Activity** (Standard Priority)

- Position: Main feed area
- All post types mixed: discussions, polls, announcements
- Filterable: All, Events, Discussions
- Visual: Standard card treatment

**4. Context (Dock — right-side)**

- Position: Right Dock (desktop only)
- Next event (always first)
- Who's here (social connection)
- This week calendar
- Resources
- Visual: Compact widget cards with gold headers

---

## 🧩 Widget System Architecture

### Widget Philosophy

**Every widget provides ACTIONABLE utility, not just info.**

```typescript
interface Widget {
  // Identity
  id: string;
  title: string;
  icon: ReactNode;

  // Priority (1-10, 1 = highest)
  priority: number;

  // Conditional rendering
  showWhen?: (context: SpaceContext) => boolean;

  // Actions
  primaryAction?: WidgetAction;
  secondaryActions?: WidgetAction[];

  // State
  loading?: boolean;
  error?: Error;
  emptyState?: ReactNode;
}
```

---

### Widget Priority System

**Automatic ordering based on relevance:**

```typescript
const widgetPriority = [
  // P1: Time-sensitive
  { id: "next-event", priority: 1, showWhen: (ctx) => ctx.hasUpcomingEvents },
  { id: "active-poll", priority: 2, showWhen: (ctx) => ctx.hasActivePolls },

  // P2: Social connection
  { id: "whos-here", priority: 3 }, // Always show

  // P3: Planning & utility
  { id: "calendar", priority: 4 },
  { id: "resources", priority: 5, showWhen: (ctx) => ctx.hasPinnedResources },
  { id: "tools", priority: 6, showWhen: (ctx) => ctx.hasActiveTools },

  // P4: Transparency & engagement
  { id: "stats", priority: 7 },
  { id: "notifications", priority: 8 },

  // P5: Specialized (context-dependent)
  {
    id: "study-buddy",
    priority: 9,
    showWhen: (ctx) => ctx.type === "academic",
  },
  { id: "quick-actions", priority: 10, showWhen: (ctx) => ctx.isLeader },
];
```

---

### Core Widgets (Phase 1) ✅ IMPLEMENTED

#### 1. Next Event Widget

**UVP**: Never miss what's happening next

```typescript
<NextEventWidget
  event={nextEvent}
  onRSVP={(id, status) => handleRSVP(id, status)}
  onAddToCalendar={(id) => addToCalendar(id)}
  userRsvp={userRsvp}
/>
```

**Features**:

- Event title, time, location
- Countdown timer ("in 2 hours")
- Live RSVP counts (89 going, 23 maybe)
- One-click RSVP (Going/Maybe)
- Add to calendar button

**Empty State**: "No upcoming events" + "Schedule Event" button

---

#### 2. Who's Here Widget

**UVP**: See who's active and available to connect

```typescript
<WhosHereWidget
  onlineMembers={onlineMembers}
  recentMembers={recentMembers}
  totalMembers={342}
  onMemberClick={(id) => openProfile(id)}
/>
```

**Features**:

- 🟢 Online now (8 members) - real-time presence
- 🌙 Recently active (12 members) - last 24h
- Avatar grid (4x2, compact mode)
- Click avatar → View profile / DM
- "See all 342 members" link

**Empty State**: "No members online right now"

---

#### 3. Calendar Widget

**UVP**: See what's coming up this week

```typescript
<CalendarWidget
  events={upcomingEvents}
  onEventClick={(id) => openEvent(id)}
  onViewFullCalendar={() => navigate("/spaces/cs-club/calendar")}
/>
```

**Features**:

- Grouped by day (Today, Tomorrow, Wed)
- Next 7 days of events
- Time, location, going count
- Click event → View details
- "Full Calendar →" link

**Empty State**: "No events this week" + "Schedule Event" button

---

#### 4. Resources Widget

**UVP**: Quick access to important files/links

```typescript
<ResourcesWidget
  resources={resources}
  onResourceClick={(id) => openResource(id)}
  onAddResource={() => openResourceModal()}
  canManage={isLeader}
/>
```

**Features**:

- Pinned links (Discord, GitHub, Notion)
- Latest shared files
- External link icon
- Leader can add/remove resources
- "View All →" link

**Empty State**: "No resources shared yet" + "Add First Resource" (if leader)

---

### Future Widgets (Phase 2-3)

**Phase 2: Engagement**

- Active Poll Widget (vote inline)
- Quick Actions Widget (leader shortcuts)
- Notifications Widget (space-scoped updates)
- Stats Widget (weekly activity transparency)

**Phase 3: Advanced**

- Space Tools Widget (HiveLab integrations)
- Study Buddy Finder (academic spaces)
- Custom Widget Framework (leaders can add)

---

## 🎭 Content Types & Post Hierarchy

### Post Type Priority

```typescript
type PostType =
  | "event" // Highest priority - always prominent
  | "announcement" // High priority - leader-only
  | "poll" // High engagement - interactive
  | "form" // Utility - signups, surveys
  | "standard" // Default - discussions, sharing
  | "tracker" // HiveLab - dues, attendance
  | "digest"; // AI-generated summaries
```

---

### Event Posts (Highest Priority)

**Structure**:

```typescript
interface EventPost extends BasePost {
  type: "event";
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;

  // RSVP
  maxAttendees?: number;
  enableWaitlist: boolean;
  goingCount: number;
  maybeCount: number;
  waitlistCount: number;

  // Check-in
  checkInEnabled: boolean;
  qrCodeEnabled: boolean;
  checkedInCount: number;

  // State
  state: "upcoming" | "ongoing" | "past";
  userRsvp?: "going" | "maybe";
  userCheckedIn?: boolean;
}
```

**Visual Treatment**:

- Large event card with date badge
- Location with map pin icon
- RSVP counts with visual indicators
- Prominent action buttons (RSVP, Add to Calendar)
- Countdown timer for upcoming events
- Check-in button (if enabled and time window active)

**User Flows**:

1. See event in feed
2. Click RSVP (Going/Maybe)
3. Event appears in personal calendar
4. Get notification 1 hour before
5. Check in at event (QR code or button)

---

### Announcement Posts (High Priority)

**Structure**:

```typescript
interface AnnouncementPost extends BasePost {
  type: "announcement";
  content: string;
  category: "important" | "update" | "reminder";
  notifyMembers: boolean;
}
```

**Visual Treatment**:

- Gold left border or background tint
- 📢 Megaphone icon
- Leader/Mod badge on author
- "Important" tag if category = important
- Auto-pins to top for 24h

**Permissions**:

- Only leaders & moderators can post
- Auto-notifies all members (if enabled)

---

### Poll Posts (High Engagement)

**Structure**:

```typescript
interface PollPost extends BasePost {
  type: "poll";
  question: string;
  options: PollOption[];
  state: "open" | "closed";

  // Settings
  allowMultiple: boolean;
  showResultsAfterVote: boolean;
  closeAt?: Date;

  // User state
  userVotes?: string[]; // option IDs
}
```

**Visual Treatment**:

- Poll options as buttons/cards
- Live vote counts (if showResultsAfterVote)
- Progress bars for each option
- "X voted • Y days left" footer
- Disable after user votes (unless allowMultiple)

**User Flows**:

1. See poll in feed
2. Tap option(s) to vote
3. See results (if enabled)
4. Change vote (if allowed)

---

### Standard Posts (Default)

**Structure**:

```typescript
interface StandardPost extends BasePost {
  type: "standard";
  content: string;
  mediaUrls?: string[];
  linkPreview?: LinkPreview;
}
```

**Visual Treatment**:

- Simple card with content
- Media gallery (if images/videos)
- Link preview card (if URL detected)
- Reactions + comment count

**Use Cases**:

- Discussions ("Who's going to Walmart?")
- Sharing ("Check out my project!")
- Questions ("Does anyone have notes?")

---

## 🔄 User Flows

### 1. Discover & Join Space

```
User on Feed
  ↓
Sees post from "UB CS Club"
  ↓
Clicks space name
  ↓
Lands on Space Hub (not joined)
  ↓
Sees: Preview of content, member count, next event
  ↓
Clicks [Join Space]
  ↓
Immediately becomes member
  ↓
See full content + composer
```

**Design Principle**: Low friction to join, high value preview

---

### 2. Browse Events & RSVP

```
Member visits Space
  ↓
Sees "UPCOMING EVENTS" section
  ↓
3 event cards shown (next 3 chronologically)
  ↓
Clicks event or [RSVP: Going]
  ↓
RSVP recorded, count updates
  ↓
Event appears in personal calendar
  ↓
Gets notification 1h before event
  ↓
(At event time) Check-in button appears
```

**Design Principle**: RSVP in one tap, immediate feedback

---

### 3. Create Post/Event

```
Member clicks [Create ▼]
  ↓
Sees options: Post | Event | Poll | [Announcement if leader]
  ↓
Selects "Event"
  ↓
Composer expands to event form:
  - Title
  - Date/Time
  - Location
  - Description
  - RSVP settings
  - Check-in settings
  ↓
Fills out form
  ↓
Clicks [Create Event]
  ↓
Event appears:
  - In feed (pinned if important)
  - In "Upcoming Events" section
  - In calendar widget
  - In full calendar page
  ↓
All members notified
```

**Design Principle**: Adaptive composer, rich forms, auto-propagation

---

### 4. Check Who's Online & Connect

```
Member visits Space
  ↓
Glances at "Who's Here" widget
  ↓
Sees "🟢 12 online now"
  ↓
Recognizes friend's avatar
  ↓
Clicks avatar
  ↓
Profile modal opens
  ↓
Clicks [Message]
  ↓
DM conversation starts
```

**Design Principle**: Real-time presence, instant connection

---

### 5. Access Resources

```
Member needs Discord link
  ↓
Scrolls to "Resources" widget
  ↓
Sees pinned links:
  - Discord Server
  - GitHub Org
  - Meeting Notes (Jan 15)
  ↓
Clicks "Discord Server"
  ↓
Opens in new tab
```

**Design Principle**: Quick access to frequently needed links

---

## 🎯 Module System (Future)

### Planned Modules

**Core Modules** (All Spaces):

- Feed (current hub)
- Calendar (full month view + event list)
- Members (full roster with filters)
- About (full description, tags, links, rules)

**Optional Modules** (Leader-enabled):

- Analytics (member growth, engagement, top contributors)
- Tools (HiveLab integrations)
- Settings (space config, member management)
- Moderation (report queue, banned users)

**Access Pattern**:

```
/spaces/cs-club           → Hub (feed + widgets)
/spaces/cs-club/calendar  → Full calendar module
/spaces/cs-club/members   → Full member roster
/spaces/cs-club/about     → Full about page
/spaces/cs-club/tools     → HiveLab tools (if leader)
/spaces/cs-club/settings  → Settings (if leader)
```

---

## 🏗️ Component Architecture

### Atomic Design Hierarchy

```
atoms/
├── Badge (role badges, state indicators)
├── Avatar (user avatars with presence)
├── Button (primary, secondary, outline)
└── Input (text, date, location)

molecules/
├── AvatarCard (portrait mode, compact/default)
├── EventBadge (date + time display)
├── RSVPCounter (going/maybe counts)
└── LocationPin (location with map link)

organisms/
├── BoardCards/ (Post type variants)
│   ├── BoardCardStandard
│   ├── BoardCardEvent
│   ├── BoardCardPoll
│   ├── BoardCardAnnouncement
│   └── BoardCardForm
│
├── Widgets/ (Dock components)
│   ├── BaseWidget (foundation)
│   ├── NextEventWidget
│   ├── WhosHereWidget
│   ├── CalendarWidget
│   └── ResourcesWidget
│
└── Composers/
    ├── StandardComposer
    ├── EventComposer
    ├── PollComposer
    └── AnnouncementComposer

templates/
└── SpaceHubLayout (complete page layout)
```

---

## 🎨 Design System Tokens

### Gold Branding (Primary Color)

```css
/* Headers */
.widget-header {
  color: var(--primary); /* #FFD700 */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Borders */
.widget-card {
  border: 1px solid var(--primary-10); /* rgba(255, 215, 0, 0.1) */
}

.widget-card:hover {
  border-color: var(--primary-30); /* rgba(255, 215, 0, 0.3) */
}

/* Glow */
.interactive-element:hover {
  box-shadow: 0 0 20px var(--primary-20); /* rgba(255, 215, 0, 0.2) */
}

/* CTAs */
.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-90));
  color: var(--black);
  font-weight: 600;
}
```

---

## 📊 Success Metrics

### Space Health Indicators

**Activity Score** (0-100):

```typescript
const activityScore =
  (postsPerWeek * 10 +
    activeMembers * 5 +
    upcomingEvents * 15 +
    memberGrowth * 20) /
  50;
```

**Engagement Rate**:

```
(reactions + comments + RSVPs) / posts / members * 100
```

**Retention Rate**:

```
activeThisWeek / activeLastWeek * 100
```

### User Behavior Metrics

**Discovery**:

- Time to first space join (target: <2 min)
- Spaces joined per new user (target: 3-5)
- Space preview → join conversion (target: 40%+)

**Engagement**:

- Posts viewed per session (target: 10+)
- RSVP rate on event views (target: 25%+)
- Widget interaction rate (target: 30%+)
- Return to space within 7 days (target: 60%+)

**Content Creation**:

- Posts per member per week (target: 0.5+)
- Event creation per leader per month (target: 2+)
- Comment/reaction rate (target: 15%+ of viewers)

---

## 🚀 Technical Implementation

### Data Model

```typescript
// Firestore structure
spaces/
  {spaceId}/
    // Space document
    - id, name, description, type, memberCount, isVerified, etc.

    posts/ (subcollection)
      {postId}/
        - type, author, content, timestamps, engagement

        comments/ (subcollection)
          {commentId}/

    members/ (subcollection)
      {userId}/
        - role, joinedAt, lastActiveAt

    events/ (subcollection) → mirrors EventPost data
    resources/ (subcollection)
    tools/ (subcollection) → HiveLab integrations
```

### State Management

**Server State** (React Query):

- Space data
- Posts (paginated)
- Events (upcoming)
- Members (online/recent)
- Resources

**Client State** (Zustand):

- Filter selection (All/Events/Discussions)
- Composer mode (collapsed/post/event/poll)
- Widget expansion states
- User RSVP status (optimistic updates)

**Real-time** (Firebase listeners):

- Member presence (online/away)
- New posts (live feed updates)
- RSVP counts (live updates)
- Notifications

---

## 🎯 Platform Integration

### Feed Integration

**Space posts flow to campus Feed when**:

- Space visibility = "public"
- Post visibility = "public"
- Space allowPublicPosts = true

**Feed shows**:

- Space name + avatar
- Post content (preview if long)
- "View in [Space Name]" link
- Engagement counts

**Goal**: Drive discovery via Feed → Spaces

---

### Profile Integration

**User's Spaces shown in Profile**:

- Joined spaces (recent 5)
- Leader roles highlighted
- Total spaces count
- "View All Spaces" link

**Goal**: Social proof, identity building

---

### Notification Integration

**Space notifications trigger on**:

- New announcement (leaders to all members)
- Event 1h before (RSVPed users)
- Mentioned in post
- Reply to your post/comment
- Space invitation

**Notification contains**:

- Space name + avatar
- Action (new event, mention, etc.)
- Preview text
- Deep link to post/event

---

## ✅ Production Readiness Checklist

### Core Features

- [x] Hub layout (65/35)
- [x] Widget system (4 core widgets)
- [x] Post types (standard, event, poll)
- [x] Adaptive composer
- [x] Content hierarchy (pinned, events, recent)
- [x] Filter system (All, Events, Discussions)
- [x] Gold branding throughout
- [x] Mobile responsive design
- [x] Loading states
- [x] Empty states

### Future Work

- [ ] Full calendar module page
- [ ] Full members roster page
- [ ] Full about page
- [ ] Tools/Settings (leader views)
- [ ] Mobile widget drawer
- [ ] Real-time presence
- [ ] Push notifications
- [ ] Advanced widgets (poll, stats, tools)
- [ ] HiveLab integration
- [ ] Analytics dashboard

---

## 📚 Reference Documents

- **Widget Spec**: `WIDGET_SYSTEM_SPEC.md` (10 widgets planned)
- **Layout Decision**: `LAYOUT_DECISION_FRAMEWORK.md` (Hub vs Chat)
- **Brand Audit**: `BRAND_AUDIT_CURRENT_STATE.md` (Gold alignment)
- **UX Flows**: `UX_FLOW_AUDIT.md` (User journeys)
- **Hub Complete**: `HUB_LAYOUT_COMPLETE.md` (Implementation summary)

---

**Status**: ✅ **READY FOR PRODUCTION**

Spaces V4 Hub Layout is complete and ready for integration into the HIVE platform. The widget system provides actionable utility, the content hierarchy surfaces important information, and the gold branding creates a premium, cohesive experience.

**Next Step**: Integrate into `apps/web` and wire up to Firebase backend.
Status: Superseded
Superseded by: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
Note: Retained for historical context only. If any guidance here conflicts with the Spaces v1 spec, follow the spec.




