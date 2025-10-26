# 🏗️ HIVE Spaces - Architecture V5 (REVISED)

**Date**: January 2025  
**Status**: 🚧 **REVISION IN PROGRESS**  
**Model**: Hub Layout with Tool Widgets

---

## 🎯 Value Proposition (REVISED)

### The Core Truth

**Spaces are pre-seeded community hubs where students TALK.**

- **Events are pre-populated** (RSS feeds, official calendars)
- **Main content is discussions** ("Who's going to Walmart?", "Selling textbook", "Thoughts on the new lab?")
- **Widgets are TOOLS** you click into, not just info displays
- **Tool-based posts** (polls, forms, signups) exist both inline and as widgets

---

## 🏛️ Space Categories (4 TYPES)

```
Spaces (by type)
├── 1. Student Organizations (Clubs & Orgs) - 40%
│   ├── Academic (CS Club, Engineering Society)
│   ├── Cultural (Asian Students Union, Black Student Union)
│   ├── Sports (Club Basketball, Intramural teams)
│   └── Special Interest (Gaming, Photography, Dance)
│
├── 2. University Organization (Official Campus) - 25%
│   ├── Student Government (SA, GSA)
│   ├── Campus Services (Career Services, Health & Wellness)
│   ├── Departments (Computer Science, Biology)
│   └── Initiatives (Sustainability, DEI)
│
├── 3. Residential (Housing Communities) - 20%
│   ├── Dorms (Greiner Hall, Governors, Ellicott)
│   ├── Off-Campus (South Campus apartments, neighborhood groups)
│   └── Floor/Building Communities
│
└── 4. Greek Life (Fraternities & Sororities) - 15%
    ├── IFC (Interfraternity Council)
    ├── Panhellenic
    ├── NPHC (National Pan-Hellenic Council)
    └── Professional Greek (co-ed, professional focus)
```

**Key Insight**: Each category has different content patterns:

- **Student Orgs**: High discussion, moderate events
- **University**: Official announcements, pre-seeded events
- **Residential**: Community coordination, casual chat
- **Greek**: Social events, brotherhood/sisterhood content

---

## 📐 Page Anatomy (REVISED)

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
│ │ Feed (70%)                    │ Tools (30%)               │   │
│ │                               │                           │   │
│ │ [What's on your mind?]        │ 📅 EVENTS ────────────►  │   │
│ │                               │ Workshop - Today 6PM      │   │
│ │ 📌 PINNED                     │ Hackathon - Sat           │   │
│ │ Important announcement...     │ (Click to see calendar)   │   │
│ │                               │                           │   │
│ │ 💬 DISCUSSIONS                │ 👥 COMMUNITY ─────────►  │   │
│ │ ┌───────────────────────────┐ │ 🟢 12 online now         │   │
│ │ │ Alex: Who's going to      │ │ 342 total members        │   │
│ │ │ Walmart tonight?          │ │ (Click for full roster)   │   │
│ │ │ 👍 3 💬 8                 │ │                           │   │
│ │ └───────────────────────────┘ │ 📚 RESOURCES ──────────► │   │
│ │ ┌───────────────────────────┐ │ • Discord Server          │   │
│ │ │ Sarah: Deployed my app!   │ │ • GitHub Org              │   │
│ │ │ Check it out...           │ │ (Click for all files)     │   │
│ │ │ 👍 18 💬 7               │ │                           │   │
│ │ └───────────────────────────┘ │ 🛠️ TOOLS ─────────────► │   │
│ │ ┌───────────────────────────┐ │ • Dues Tracker            │   │
│ │ │ 📅 TypeScript Workshop    │ │ • Attendance              │   │
│ │ │ Today 6PM • Davis 101     │ │ (Click to use/manage)     │   │
│ │ │ [RSVP: Going ✓]          │ │                           │   │
│ │ └───────────────────────────┘ │ (All widgets clickable)   │   │
│ │ (Feed scrolls)                │                           │   │
│ └───────────────────────────────┴───────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Key Changes**:

- **70/30 split** (more feed, condensed tools)
- **Widgets are CLICKABLE** → Breadcrumb navigation to full views
- **Primary content is DISCUSSIONS** (people talking)
- **Events are less prominent** (pre-seeded, scrollable in feed)

---

## 🧩 Widget System (TOOL-FIRST)

### Philosophy: Widgets = Clickable Tools

**Every widget**:

1. **Previews** the most important info
2. **Invites click-through** to full view
3. **Uses breadcrumb navigation** (Space → Events)
4. **Merges related functions** (no redundancy)

---

### Consolidated Widget System (4 CORE TOOLS)

#### 1. Events Tool 🎯 REVISED

**Combines**: "Next Event" + "This Week Calendar"

```typescript
<EventsWidget
  upcomingEvents={events}
  onEventClick={(id) => navigate(`/spaces/${spaceId}/events/${id}`)}
  onViewAll={() => navigate(`/spaces/${spaceId}/events`)}
/>
```

**Preview (Collapsed State)**:

```
📅 EVENTS ────────────────►
Workshop - Today 6PM
Hackathon - Sat 2PM
(Click to see all events)
```

**Click Behavior**:

- Click widget header → Full calendar page
- Click individual event → Event detail modal
- Breadcrumb: `Space > Events > TypeScript Workshop`

**Full View** (`/spaces/cs-club/events`):

- Full calendar (month view)
- List of all events
- Create event button (if leader)
- Filter by upcoming/past

---

#### 2. Community Tool 🎯 NEW

**Combines**: "Who's Here" + Member roster preview

```typescript
<CommunityWidget
  onlineCount={12}
  totalMembers={342}
  topMembers={topMembers} // Most active this week
  onViewRoster={() => navigate(`/spaces/${spaceId}/members`)}
/>
```

**Preview (Collapsed State)**:

```
👥 COMMUNITY ─────────────►
🟢 12 online now
342 total members
Top this week: [avatars]
(Click for full roster)
```

**Click Behavior**:

- Click widget header → Full member roster
- Click avatar → User profile
- Breadcrumb: `Space > Members > John Doe`

**Full View** (`/spaces/cs-club/members`):

- Searchable member list
- Filter by role (leader, member)
- Sort by activity, join date
- Online presence indicators

---

#### 3. Resources Tool 🎯 REVISED

**Same function, new interaction model**

```typescript
<ResourcesWidget
  pinnedLinks={links}
  recentFiles={files}
  onViewAll={() => navigate(`/spaces/${spaceId}/resources`)}
  canManage={isLeader}
/>
```

**Preview (Collapsed State)**:

```
📚 RESOURCES ─────────────►
• Discord Server
• GitHub Org
• Meeting Notes (Jan 15)
(Click for all files/links)
```

**Click Behavior**:

- Click widget header → Full resources page
- Click individual link → Opens in new tab
- Breadcrumb: `Space > Resources`

**Full View** (`/spaces/cs-club/resources`):

- All shared files
- All shared links
- Organized by category
- Upload/add (if member)

---

#### 4. Tools Widget 🎯 NEW (HiveLab Integration)

**Space-specific tools created by leaders**

```typescript
<ToolsWidget
  activeTools={tools}
  onToolClick={(id) => navigate(`/spaces/${spaceId}/tools/${id}`)}
  onViewAll={() => navigate(`/spaces/${spaceId}/tools`)}
/>
```

**Preview (Collapsed State)**:

```
🛠️ TOOLS ─────────────────►
• Dues Tracker (12/50 paid)
• Attendance (Last: 89%)
• T-Shirt Signup (23 orders)
(Click to use/manage)
```

**Click Behavior**:

- Click widget header → All tools page
- Click individual tool → Tool interface
- Breadcrumb: `Space > Tools > Dues Tracker`

**Full View** (`/spaces/cs-club/tools`):

- All active tools
- Create new tool (if leader)
- Tool templates (forms, trackers, polls)

**Tool Examples**:

- Dues tracker
- Attendance sheet
- Event signups
- Equipment checkout
- Polls (persistent, not just posts)

---

## 🎭 Post Types & Content Hierarchy (REVISED)

### Content Philosophy

**Primary Content**: People talking (80%)  
**Secondary Content**: Pre-seeded events (15%)  
**Tertiary Content**: Tool-based posts (5%)

---

### Post Type Priority (REVISED)

```typescript
type PostType =
  | "standard" // PRIMARY - discussions, sharing
  | "event" // SECONDARY - pre-seeded, less user-generated
  | "announcement" // HIGH PRIORITY - leader-only
  | "poll" // INLINE TOOL - quick votes
  | "form" // WIDGET TOOL - signups, surveys
  | "tracker"; // WIDGET TOOL - dues, attendance
```

---

### 1. Standard Posts (PRIMARY - 80% of content)

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

- Simple, clean cards
- Media gallery (if attached)
- Reactions + comment count
- **Most prominent in feed**

**Use Cases**:

- "Who's going to Walmart tonight?" 🚗
- "Selling my MTH 141 textbook - $40" 💵
- "Check out my project I deployed!" 🎉
- "Thoughts on the new robotics lab?" 💭
- "Study group forming for CSE finals" 📚

**Design Principle**: Make talking EASY and FAST.

---

### 2. Event Posts (SECONDARY - Pre-seeded)

**Key Insight**: Most events are **pre-populated** via RSS/official calendars.

**Structure**:

```typescript
interface EventPost extends BasePost {
  type: "event";
  isRssImported: boolean; // TRUE for most events
  title: string;
  startTime: Date;
  location: string;
  rsvpEnabled?: boolean; // Optional for RSS events
}
```

**Visual Treatment**:

- Standard card (NOT super prominent)
- Date badge, location
- RSVP if enabled
- **In feed, but scrollable** (not pinned by default)

**User Flow**:

1. Scroll past discussions
2. See pre-seeded event
3. Maybe RSVP (if interested)
4. OR click "Events" widget to see all

**Design Principle**: Events exist, but don't dominate. Students can ignore if not interested.

---

### 3. Announcement Posts (HIGH PRIORITY - Leader)

**Same as before** - leader-only, auto-pins, gold border.

---

### 4. Poll Posts (INLINE TOOL)

**Decision**: Polls are INLINE in feed (not widget-based).

**Why**: Quick, impulse engagement ("Which meeting time works?")

**Structure**:

```typescript
interface PollPost extends BasePost {
  type: "poll";
  question: string;
  options: PollOption[];
  state: "open" | "closed";
}
```

**Visual Treatment**:

- Inline in feed
- Vote buttons
- Live results
- Auto-closes after X days

**Use Cases**:

- "Which meeting time works? Thu 6pm vs Fri 5pm"
- "What should our next project be?"
- "T-shirt design A or B?"

---

### 5. Form Posts (WIDGET TOOL - NOT inline)

**Decision**: Forms are WIDGET-BASED (not inline posts).

**Why**: Complex, persistent tools that need full interface.

**Access**:

1. Leader creates form via "Tools" widget
2. Form appears in Tools widget
3. Click → Full form interface
4. Optional: Announcement post links to form

**Examples**:

- Event registration (detailed)
- T-shirt orders
- Interest surveys
- Equipment checkout

**Design Principle**: Don't clutter feed with complex forms.

---

### 6. Tracker Posts (WIDGET TOOL - NOT inline)

**Decision**: Trackers are WIDGET-BASED (not inline posts).

**Why**: Persistent data collection, needs dedicated interface.

**Access**:

1. Leader creates tracker via "Tools" widget
2. Tracker appears in Tools widget
3. Click → Full tracker interface
4. Updates in real-time

**Examples**:

- Dues tracker ($12 / $50 members paid)
- Attendance (89% last meeting)
- Project milestones
- Volunteer hours

**Design Principle**: Persistent tools live in widgets, not feed.

---

## 🔄 Inline vs. Widget Decision Framework

### INLINE in Feed:

✅ Standard posts (discussions)  
✅ Event posts (pre-seeded)  
✅ Announcement posts (important)  
✅ Poll posts (quick votes)

### WIDGET TOOLS (Click-through):

✅ Forms (complex, persistent)  
✅ Trackers (data collection)  
✅ Persistent polls (ongoing surveys)  
✅ Signups (event registration, orders)

**Rule of Thumb**:

- **Inline**: Conversation starters, time-sensitive, simple
- **Widget**: Persistent, complex, data-heavy, tools

---

## 🗺️ Navigation Architecture (Breadcrumbs)

### Widget Click-Through Navigation

```
Space Hub
  ↓ (Click "Events" widget)
Space > Events
  ↓ (Click "TypeScript Workshop")
Space > Events > TypeScript Workshop
  ↓ (Click "Back to Space")
Space Hub
```

**Breadcrumb Component**:

```typescript
<Breadcrumbs>
  <BreadcrumbItem href="/spaces/cs-club">CS Club</BreadcrumbItem>
  <BreadcrumbItem href="/spaces/cs-club/events">Events</BreadcrumbItem>
  <BreadcrumbItem current>TypeScript Workshop</BreadcrumbItem>
</Breadcrumbs>
```

---

### Full Space Navigation Map

```
/spaces/cs-club                 → Hub (feed + tool widgets)
  ├── /events                   → Full calendar (clicked Events widget)
  │   └── /{eventId}           → Event detail page
  ├── /members                  → Full roster (clicked Community widget)
  │   └── /{userId}            → Member profile
  ├── /resources                → All files/links (clicked Resources widget)
  │   └── /{resourceId}        → Resource detail
  ├── /tools                    → All tools (clicked Tools widget)
  │   ├── /dues-tracker        → Dues tracker interface
  │   ├── /attendance          → Attendance sheet
  │   └── /create              → Create new tool (leader)
  ├── /about                    → Full about page
  └── /settings                 → Space settings (leader only)
```

---

## 📊 Success Metrics (REVISED)

### Engagement Priorities

**1. Discussion Engagement** (PRIMARY):

- Posts created per member/week (target: 0.8+)
- Comments per post (target: 3+)
- Reaction rate (target: 20%+)

**2. Widget Click-Through**:

- Widget → Full view conversion (target: 40%+)
- Time spent in widget views (target: 2+ min)
- Return to hub rate (target: 80%+)

**3. Event Engagement** (SECONDARY):

- RSVP rate on pre-seeded events (target: 10%+)
- User-created events per leader/month (target: 1+)

**4. Tool Usage**:

- Active tools per space (target: 2-3)
- Tool interaction rate (target: 30%+ of members)
- Form completion rate (target: 60%+)

---

## 🎨 Design System Updates

### Widget Styling (CLICKABLE TOOLS)

```css
.widget-tool {
  border: 1px solid var(--primary-10);
  cursor: pointer; /* Indicate clickability */
  transition: all 0.3s ease;
}

.widget-tool:hover {
  border-color: var(--primary-30);
  box-shadow: 0 0 20px var(--primary-20);
  transform: translateY(-2px);
}

.widget-header {
  color: var(--primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget-arrow {
  color: var(--primary);
  opacity: 0.6;
  transition: opacity 0.3s;
}

.widget-tool:hover .widget-arrow {
  opacity: 1;
}
```

**Visual Cues**:

- Arrow/chevron in widget header (→)
- Hover lift effect
- Gold glow on hover
- Cursor pointer

---

## ✅ Revised Component Architecture

### Tool Widgets (NEW)

```
organisms/spaces/widgets/
├── base-widget.tsx           (Foundation)
├── events-widget.tsx         (Combines next event + calendar)
├── community-widget.tsx      (Combines who's here + roster)
├── resources-widget.tsx      (Files/links preview)
└── tools-widget.tsx          (HiveLab tools preview)
```

### Inline Components (REVISED)

```
organisms/spaces/board-cards/
├── board-card-standard.tsx   (PRIMARY - discussions)
├── board-card-event.tsx      (SECONDARY - pre-seeded)
├── board-card-announcement.tsx (HIGH PRIORITY - leader)
└── board-card-poll.tsx       (INLINE TOOL - quick votes)
```

**Removed from inline**:

- ❌ `board-card-form.tsx` → Widget tool
- ❌ `board-card-tracker.tsx` → Widget tool

---

## 🚀 Implementation Roadmap

### Phase 1: Core Revision ✅ PLANNED

- [ ] Update space categories (4 types)
- [ ] Consolidate widgets (4 tools)
- [ ] Add click-through navigation
- [ ] Implement breadcrumb system
- [ ] Revise post type priorities

### Phase 2: Widget Tools

- [ ] Build EventsWidget (merged calendar)
- [ ] Build CommunityWidget (merged roster)
- [ ] Update ResourcesWidget (clickable)
- [ ] Build ToolsWidget (HiveLab preview)
- [ ] Full view pages for each widget

### Phase 3: Feed Optimization

- [ ] Prioritize standard posts (discussions)
- [ ] De-emphasize event posts (scrollable)
- [ ] Remove inline forms/trackers
- [ ] Optimize for mobile (feed-first)

---

## 📚 Key Documents

- **V4 Architecture** (previous): `SPACES_ARCHITECTURE_V4.md`
- **V5 Architecture** (current): `SPACES_ARCHITECTURE_V5.md`
- **Widget Spec** (outdated): `WIDGET_SYSTEM_SPEC.md` (needs revision)
- **Brand Audit**: `BRAND_AUDIT_CURRENT_STATE.md`

---

**Status**: 🚧 **REVISION IN PROGRESS**

This architecture reflects the corrected understanding:

- **Discussions are primary** (not events)
- **Events are pre-seeded** (less user-generated)
- **Widgets are clickable tools** (not static info)
- **Tool-based posts** live in widgets (not feed)

**Next Step**: Update components and Storybook to match this architecture.
Status: Superseded
Superseded by: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
Note: Retained for historical context only. If any guidance here conflicts with the Spaces v1 spec, follow the spec.





