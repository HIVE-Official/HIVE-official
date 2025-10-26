# 🧩 Spaces Widget System - UVP-Driven Dock (right-side)

**Vision**: Dock provides **actionable utility**, not just information  
**Goal**: Widgets that make students' lives easier and keep them coming back

---

## 🎯 Widget Philosophy

**BAD Widget** (Static Info):

```
┌─────────────────┐
│ MEMBERS         │
│ 342 members     │
│ [View All →]    │
└─────────────────┘
```

❌ Just shows a number, no utility

**GOOD Widget** (Actionable UVP):

```
┌─────────────────┐
│ WHO'S AVAILABLE │
│ 🟢 12 online now│
│ Sarah, Alex...  │
│ [Message All]   │
└─────────────────┘
```

✅ Shows who you can reach RIGHT NOW, with action

---

## 📦 Widget Catalog

### 1. **Next Event Widget** (High Priority)

**UVP**: Never miss what's happening next

```typescript
┌──────────────────────────────┐
│ 📅 NEXT EVENT                │
├──────────────────────────────┤
│ TypeScript Workshop          │
│ Today at 6:00 PM             │
│ 📍 NSC 220                   │
│                              │
│ 🟢 23 going   ⚪ 5 maybe     │
│                              │
│ [✓ Going]  [Add to Cal]      │
└──────────────────────────────┘
```

**Features**:

- ✅ One-click RSVP
- ✅ Add to personal calendar
- ✅ Live attendance count
- ✅ Location with map link
- ✅ Countdown timer ("in 2 hours")

---

### 2. **Who's Here Widget** (Social Utility)

**UVP**: See who's active and available to connect

```typescript
┌──────────────────────────────┐
│ 👥 WHO'S HERE                │
├──────────────────────────────┤
│ 🟢 Online Now (8)            │
│ ┌────────────────────────┐   │
│ │ [avatars in grid]      │   │
│ └────────────────────────┘   │
│                              │
│ 🌙 Recently Active (12)      │
│ ┌────────────────────────┐   │
│ │ [avatars in grid]      │   │
│ └────────────────────────┘   │
│                              │
│ [See All 342 Members →]      │
└──────────────────────────────┘
```

**Features**:

- ✅ Real-time presence (online/away/offline)
- ✅ Click avatar → DM
- ✅ Filter by role (leaders, mods)
- ✅ "Recently joined" section

---

### 3. **Quick Actions Widget** (Efficiency)

**UVP**: Do common tasks instantly

```typescript
┌──────────────────────────────┐
│ ⚡ QUICK ACTIONS              │
├──────────────────────────────┤
│ 📢 Create Announcement        │
│ 📅 Schedule Event             │
│ 📊 Create Poll                │
│ 🔗 Share Resource             │
│ 💬 Start Discussion           │
└──────────────────────────────┘
```

**Features**:

- ✅ One-click modals for each action
- ✅ Leader-only actions (if applicable)
- ✅ Keyboard shortcuts displayed
- ✅ Recently used actions on top

---

### 4. **Space Resources Widget** (Value Repository)

**UVP**: Quick access to important files/links

```typescript
┌──────────────────────────────┐
│ 📚 RESOURCES                 │
├──────────────────────────────┤
│ 📄 Meeting Notes (Jan 15)    │
│ 🔗 Discord Server            │
│ 🔗 GitHub Org                │
│ 📊 Project Tracker           │
│                              │
│ [+ Add Resource]             │
│ [View All →]                 │
└──────────────────────────────┘
```

**Features**:

- ✅ Pinned links (Discord, Notion, Drive)
- ✅ Latest shared files
- ✅ Leaders can pin/unpin
- ✅ Preview on hover

---

### 5. **Polls & Decisions Widget** (Engagement)

**UVP**: Participate in active decisions

```typescript
┌──────────────────────────────┐
│ 📊 ACTIVE POLL               │
├──────────────────────────────┤
│ "Best time for weekly meet?" │
│                              │
│ ○ Monday 6pm     (8 votes)   │
│ ● Tuesday 7pm    (15 votes)  │
│ ○ Wednesday 6pm  (5 votes)   │
│                              │
│ [Vote] • 28 voted • 2d left  │
└──────────────────────────────┘
```

**Features**:

- ✅ Inline voting (no page navigation)
- ✅ Live results (if allowed)
- ✅ Time remaining
- ✅ "Your vote" indicator

---

### 6. **Space Stats Widget** (Transparency)

**UVP**: See how active and healthy this space is

```typescript
┌──────────────────────────────┐
│ 📈 THIS WEEK                 │
├──────────────────────────────┤
│ 💬 24 posts (+8 from last)   │
│ 👤 89 active members         │
│ 📅 3 upcoming events         │
│ 🎉 12 new members            │
│                              │
│ [View Analytics →]           │
└──────────────────────────────┘
```

**Features**:

- ✅ Weekly activity summary
- ✅ Trend indicators (↑↓)
- ✅ Member growth
- ✅ Link to full analytics (leaders)

---

### 7. **Space Tools Widget** (HiveLab Integration)

**UVP**: Access custom tools created by leaders

```typescript
┌──────────────────────────────┐
│ 🛠️ SPACE TOOLS               │
├──────────────────────────────┤
│ 🎟️ Event Check-In            │
│    Scan QR at door           │
│                              │
│ 📝 Feedback Form             │
│    Share your thoughts       │
│                              │
│ 💰 Dues Tracker              │
│    $25 due Feb 1             │
│                              │
│ [Browse All Tools →]         │
└──────────────────────────────┘
```

**Features**:

- ✅ HiveLab tool cards
- ✅ Quick launch (modal/inline)
- ✅ Status indicators (due dates, unread)
- ✅ Leader can manage tools

---

### 8. **Notifications Widget** (Stay Updated)

**UVP**: See space-specific updates

```typescript
┌──────────────────────────────┐
│ 🔔 SPACE UPDATES             │
├──────────────────────────────┤
│ 📌 Sarah pinned: Hackathon   │
│    2 min ago                 │
│                              │
│ 👤 Alex joined as moderator  │
│    1 hour ago                │
│                              │
│ 📅 New event: Workshop       │
│    3 hours ago               │
│                              │
│ [Mark All Read]              │
└──────────────────────────────┘
```

**Features**:

- ✅ Space-scoped notifications
- ✅ Unread count badge
- ✅ Click to navigate to item
- ✅ Mark read/unread

---

### 9. **Upcoming Calendar Widget** (Planning)

**UVP**: See what's coming up this week/month

```typescript
┌──────────────────────────────┐
│ 📅 THIS WEEK                 │
├──────────────────────────────┤
│ Today                        │
│ • TypeScript Workshop (6pm)  │
│                              │
│ Tomorrow                     │
│ • Game Night (8pm)           │
│                              │
│ Friday                       │
│ • Project Showcase (4pm)     │
│                              │
│ [View Full Calendar →]       │
└──────────────────────────────┘
```

**Features**:

- ✅ Week view (grouped by day)
- ✅ Quick RSVP inline
- ✅ "Add all to calendar" button
- ✅ Filter (going, maybe, all)

---

### 10. **Study Buddy Finder** (Social Utility)

**UVP**: Find people to work with

```typescript
┌──────────────────────────────┐
│ 📖 STUDY SESSIONS            │
├──────────────────────────────┤
│ 🟢 Sarah - NSC Library       │
│    Working on CSE 250        │
│    [Join]                    │
│                              │
│ 🟢 Alex - Student Union      │
│    Studying for midterms     │
│    [Join]                    │
│                              │
│ [Start Your Own Session →]   │
└──────────────────────────────┘
```

**Features**:

- ✅ Real-time "study now" sessions
- ✅ Location sharing
- ✅ Course/topic tags
- ✅ Join request button

---

## 🎨 Widget Layout System

### Default Layout (Student Org)

```
┌──────────────────────────────┐
│ 📅 Next Event                │  <- Always first (highest priority)
├──────────────────────────────┤
│ 👥 Who's Here                │  <- Social connection
├──────────────────────────────┤
│ 📊 Active Poll               │  <- Engagement (if exists)
├──────────────────────────────┤
│ 📅 This Week                 │  <- Planning
├──────────────────────────────┤
│ 📚 Resources                 │  <- Value
├──────────────────────────────┤
│ 📈 This Week Stats           │  <- Transparency
└──────────────────────────────┘
```

### Widget Priority System

```typescript
interface WidgetPriority {
  id: string;
  priority: number; // 1-10, 1 = highest
  showWhen?: (context: SpaceContext) => boolean;
  maxHeight?: number;
}

const defaultWidgetPriority = [
  { id: "next-event", priority: 1, showWhen: (ctx) => ctx.hasUpcomingEvents },
  { id: "active-poll", priority: 2, showWhen: (ctx) => ctx.hasActivePolls },
  { id: "whos-here", priority: 3 },
  { id: "quick-actions", priority: 4, showWhen: (ctx) => ctx.isLeader },
  { id: "calendar", priority: 5 },
  { id: "resources", priority: 6, showWhen: (ctx) => ctx.hasPinnedResources },
  { id: "tools", priority: 7, showWhen: (ctx) => ctx.hasActiveTools },
  { id: "stats", priority: 8 },
  { id: "notifications", priority: 9 },
  {
    id: "study-buddy",
    priority: 10,
    showWhen: (ctx) => ctx.type === "academic",
  },
];
```

---

## 🎯 Implementation Plan

### Phase 1: Core Widgets (Week 1)

- [x] Next Event Widget
- [x] Who's Here Widget
- [x] Calendar Widget
- [x] Resources Widget

### Phase 2: Engagement Widgets (Week 2)

- [ ] Active Poll Widget
- [ ] Quick Actions Widget
- [ ] Notifications Widget
- [ ] Stats Widget

### Phase 3: Advanced Widgets (Week 3)

- [ ] Space Tools Widget (HiveLab integration)
- [ ] Study Buddy Widget (if academic space)
- [ ] Custom widget framework (leaders can add)

### Phase 4: Smart Widget System (Week 4)

- [ ] Priority-based ordering
- [ ] Conditional rendering (show when relevant)
- [ ] Personalization (user can reorder/hide)
- [ ] Widget analytics (track engagement)

---

## 💡 Widget Design Principles

### 1. **Actionable First**

Every widget must have a clear action, not just display info.

❌ **Bad**: "342 members"  
✅ **Good**: "342 members • 12 online now [Message]"

### 2. **Contextual Visibility**

Only show widgets when they're relevant.

- Poll widget: Only if active poll exists
- Tools widget: Only if space has tools
- Study Buddy: Only for academic spaces

### 3. **Consistent Interaction**

All widgets follow same patterns:

- Click card → Full view/modal
- Inline actions → Quick tasks
- "View All →" → Dedicated page

### 4. **Gold Branding**

Every widget header in gold:

```typescript
<h3 className="text-caption font-semibold text-primary">NEXT EVENT</h3>
```

### 5. **Loading States**

Every widget has skeleton loader:

```typescript
{
  loading ? <WidgetSkeleton /> : <NextEventWidget />;
}
```

---

## 🚀 Next Steps

**I will now build**:

1. ✅ **Hub Layout** (65/35 split)
2. ✅ **Widget Framework** (base components)
3. ✅ **4 Core Widgets** (Next Event, Who's Here, Calendar, Resources)
4. ✅ **Gold Branding** (throughout)
5. ✅ **Storybook Demos** (interactive examples)

**Ready to proceed?** Let's build the Widget System! 🎯




