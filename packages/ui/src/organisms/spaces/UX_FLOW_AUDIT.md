# 🎯 Spaces UX Flow & Layout Audit

**Date**: January 2025  
**Status**: 🚨 **CRITICAL REVIEW NEEDED**  
**Focus**: Layout structure, interaction patterns, information hierarchy

---

## 🤔 Core Questions We Need to Answer

### 1. **What is a Space, fundamentally?**

**Option A: Community Chat** (Discord/Slack model)

- Emphasis: Real-time conversation
- Primary action: Send message
- Layout: Chat-first with composer at bottom
- Right Dock: Minimal context

**Option B: Community Hub** (Facebook Group model)

- Emphasis: Diverse content types
- Primary action: Browse posts, RSVP events, view info
- Layout: Feed-first with discovery
- Right Dock: Rich context (calendar, members, about)

**Option C: Hybrid**

- Different layouts for different space types?
- Student orgs = Hub, Living communities = Chat?

**❓ CURRENT DECISION**: We chose Chat (A), but is this right?

---

### 2. **What's the primary user intent?**

**Scenario 1: Student visits "UB CS Club" Space**

What do they want to do FIRST?

- [ ] A. Read latest messages
- [ ] B. See upcoming events
- [ ] C. Join the space
- [ ] D. Check who's in the space
- [ ] E. Learn what the space is about

**❓ CURRENT LAYOUT**: Optimized for A (reading messages)  
**❓ QUESTION**: Should we optimize for B (events) or C (joining)?

---

### 3. **How important is the Dock (right-side)?**

**Current**: 40% of screen, condensed, non-scrollable

**User tasks with Dock**:

- See next event → Click to RSVP?
- See member count → Click to view all?
- Read about → Click to see full?

**Problem**: If everything requires clicking to expand, why is it taking 40% of the screen?

**Options**:

- **A. Keep 40% but make it richer** (scrollable, full info)
- **B. Shrink to 30%** (truly minimal sidebar)
- **C. Hide by default** (show on demand, like mobile)
- **D. Make it a tab system** (Calendar, Members, About as tabs)

---

### 4. **Is composer-at-bottom right for all cases?**

**Works well for**:

- Active chat discussions
- Quick replies
- Real-time conversations

**Doesn't work well for**:

- Long-form posts
- Event creation
- Announcements
- Polls/Forms

**❓ CURRENT**: Single composer at bottom  
**❓ QUESTION**: Should we have different interaction modes?

---

## 🏗️ Layout Options to Consider

### Option 1: Current (Chat Model + Condensed Dock)

```
┌────────┬────────────────────────────┬────────────┐
│Sidebar │ Messages (60%)             │ Dock (40%) │
│        │                            │            │
│        │ ↑ Scroll for history       │ Next Event │
│        │                            │ Members    │
│        │ Message 1                  │ About      │
│        │ Message 2                  │            │
│        │ Message 3                  │ (Fixed,    │
│        │                            │  no scroll)│
│        │ ────────────────           │            │
│        │ [Type message...]  [Send]  │            │
└────────┴────────────────────────────┴────────────┘
```

**Pros**:

- ✅ Familiar chat UX
- ✅ Easy to send quick messages
- ✅ Dock always visible

**Cons**:

- ❌ Dock is cramped (can't show full info)
- ❌ Hard to create rich content (events, polls)
- ❌ Events get lost in chat stream
- ❌ 40% wasted on minimal content

---

### Option 2: Feed Model + Rich Sidebar

```
┌────────┬────────────────────────────┬────────────┐
│Sidebar │ Feed (65%)                 │ Dock (35%) │
│        │ [Create Post] ▼            │            │
│        │ ────────────────           │ CALENDAR   │
│        │ 📌 Pinned Event            │ ┌────────┐ │
│        │ ────────────────           │ │Feb 2025│ │
│        │                            │ └────────┘ │
│        │ ↓ Scroll for more          │            │
│        │                            │ MEMBERS    │
│        │ Post 1 (Event)             │ • Emily    │
│        │ Post 2 (Announcement)      │ • Alex     │
│        │ Post 3 (Discussion)        │ • Sarah    │
│        │                            │ [View All] │
│        │                            │            │
│        │                            │ ABOUT      │
│        │                            │ (Full text,│
│        │                            │  scrollable│
└────────┴────────────────────────────┴────────────┘
```

**Pros**:

- ✅ Better for diverse content
- ✅ Composer can adapt to content type
- ✅ Events/announcements are prominent
- ✅ Dock has room to breathe

**Cons**:

- ❌ Less "real-time" feeling
- ❌ Harder to quick-reply
- ❌ Feels more like Facebook

---

### Option 3: Tabbed Main Area

```
┌────────┬────────────────────────────┬────────────┐
│Sidebar │ [ Feed | Calendar | Members | About ]   │
│        │                            │            │
│        │ === FEED TAB ===           │ Quick Info │
│        │ [Create Post] ▼            │            │
│        │                            │ 📅 1 event │
│        │ Posts stream               │    today   │
│        │                            │            │
│        │                            │ 👥 342     │
│        │                            │    members │
│        │                            │            │
│        │                            │ [Join] btn │
│        │                            │            │
└────────┴────────────────────────────┴────────────┘

// Switch to Calendar tab:
│        │ === CALENDAR TAB ===       │            │
│        │                            │            │
│        │ Full month view            │            │
│        │ Event list below           │            │
```

**Pros**:

- ✅ Dedicated space for each concern
- ✅ No fighting for screen real estate
- ✅ Calendar gets full width when needed
- ✅ Members roster gets full width

**Cons**:

- ❌ Requires tab switching
- ❌ Can't see calendar while browsing posts
- ❌ More navigation

---

### Option 4: Collapsible Panels

```
┌────────┬────────────────────────────┬────────────┐
│Sidebar │ Main (80%)                 │ Rail (20%) │
│        │                            │  ┌──────┐  │
│        │ Feed with posts            │  │ [▼]  │  │ Click to expand
│        │                            │  │Event │  │
│        │                            │  └──────┘  │
│        │                            │  ┌──────┐  │
│        │                            │  │ [▼]  │  │
│        │                            │  │Member│  │
│        │                            │  └──────┘  │
└────────┴────────────────────────────┴────────────┘

// Expanded:
│        │ Main (55%)                 │ Rail (45%) │
│        │                            │  ┌──────┐  │
│        │ Feed with posts            │  │ [▲]  │  │ Click to collapse
│        │                            │  │Event │  │
│        │                            │  │      │  │
│        │                            │  │[Full │  │
│        │                            │  │ info]│  │
│        │                            │  └──────┘  │
```

**Pros**:

- ✅ Flexible use of space
- ✅ User controls information density
- ✅ Can focus on feed OR calendar

**Cons**:

- ❌ Requires manual interaction
- ❌ Complex state management
- ❌ Can feel unstable (layout shifts)

---

## 🎭 Interaction Flow Issues

### Issue 1: **Multi-Step Actions Buried**

**Current**: Everything starts with typing in bottom composer

**Problem**: How do users...

- Create an event (needs title, date, location, RSVP options)?
- Create a poll (needs question, options)?
- Create a form/signup (needs fields)?

**Current flow**:

1. Click "Event" button
2. ??? (No modal/dialog implemented)
3. ???

**Better flow options**:

- **A. Modal dialogs** - Click "Create Event" → Full modal
- **B. Inline expansion** - Composer expands to event form
- **C. Dedicated page** - Navigate to /spaces/cs-club/create-event

---

### Issue 2: **Pinned Content Visibility**

**Current**: Pinned posts in message stream

**Problem**:

- Pinned event scrolls away when chat is active
- Important announcements get buried

**Better options**:

- **A. Persistent pinned bar** - Always visible at top
- **B. Separate pinned section** - Above feed
- **C. Pinned rail** - Left side of feed

---

### Issue 3: **Module Navigation Unclear**

**From SPEC**: Spaces has modules (Calendar, Members, About, Analytics, Tools, Settings, Moderation)

**Current**: Only Calendar/Members/About in condensed rail

**Missing**: How do users access...

- Full calendar page?
- Full member roster?
- Analytics dashboard?
- Tools (HiveLab integrations)?
- Space settings (if leader)?
- Moderation queue (if mod)?

**Options**:

- **A. Tab system** - Feed | Calendar | Members | Tools | Settings
- **B. Dropdown menu** - "More" → Analytics, Tools, Settings
- **C. Sidebar sections** - Expand sidebar with modules
- **D. URL routing** - /spaces/cs-club/calendar, /spaces/cs-club/members

---

### Issue 4: **Content Type Hierarchy**

**Current**: All posts look similar in stream

**Problem**:

- Events should be more prominent than regular messages
- Announcements should stand out
- Polls should be interactive

**Better approach**:

- **A. Visual weight** - Events have gold border + larger size
- **B. Type-based layout** - Different layouts per type
- **C. Filtering** - Show only events, only discussions, etc.

---

## 📊 Information Architecture Problems

### Current IA (Flat)

```
Space
 ├─ Feed (all posts mixed)
 ├─ Next Event (summary)
 ├─ Members (count)
 └─ About (summary)
```

**Problem**: No hierarchy, everything equally accessible (or inaccessible)

### Proposed IA (Hierarchical)

```
Space
 ├─ Overview (Landing)
 │   ├─ Pinned Posts
 │   ├─ Next Event (CTA)
 │   ├─ Recent Activity
 │   └─ Quick Actions
 │
 ├─ Feed (All Posts)
 │   ├─ Filters (Events, Discussions, Announcements)
 │   └─ Create Post
 │
 ├─ Calendar (Full Module)
 │   ├─ Month View
 │   ├─ Event List
 │   └─ Create Event
 │
 ├─ Members (Full Module)
 │   ├─ Leaders & Mods
 │   ├─ All Members
 │   └─ Search
 │
 ├─ About (Full Module)
 │   ├─ Description
 │   ├─ Tags
 │   ├─ Links
 │   └─ Join Info
 │
 └─ Tools (Leader only)
     ├─ Analytics
     ├─ HiveLab
     ├─ Settings
     └─ Moderation
```

---

## 🎯 Recommended Layout Pivot

### New Proposal: **Context-Aware Layout**

**On Space Landing** (First Visit):

```
┌────────┬──────────────────────────────────────────┐
│Sidebar │ Space Header                             │
│        │ ─────────────────────────────────────    │
│        │ === OVERVIEW ===                         │
│        │                                          │
│        │ 📌 Pinned: Spring Hackathon (PROMINENT)  │
│        │ ─────────────────────────────────────    │
│        │                                          │
│        │ 📅 UPCOMING EVENTS                       │
│        │    TypeScript Workshop - Today 6PM       │
│        │    [View Calendar →]                     │
│        │                                          │
│        │ 💬 RECENT ACTIVITY                       │
│        │    Message 1                             │
│        │    Message 2                             │
│        │    [View All Posts →]                    │
│        │                                          │
│        │ 👥 MEMBERS (342)                         │
│        │    [Leaders] [Recent Joins] [View All]   │
│        │                                          │
│        │ ℹ️  ABOUT                                │
│        │    Full description text...              │
│        │    Tags: #tech #programming              │
│        │                                          │
└────────┴──────────────────────────────────────────┘
```

**On "Feed" Tab**:

```
┌────────┬────────────────────┬─────────────────────┐
│Sidebar │ Feed (70%)         │ Context (30%)       │
│        │ [All|Events|Polls] │                     │
│        │ ───────────────    │ 📌 Pinned           │
│        │ [Create Post ▼]    │    Hackathon        │
│        │                    │                     │
│        │ Posts stream       │ 📅 Next Event       │
│        │                    │    Workshop         │
│        │                    │                     │
│        │                    │ 👤 You + 341        │
│        │                    │                     │
└────────┴────────────────────┴─────────────────────┘
```

---

## ❓ Key Decisions Needed

### 1. **Space Purpose**

- [ ] Real-time chat focus (Discord style)
- [ ] Community hub focus (Facebook Group style)
- [ ] Hybrid (different layouts per space type)

### 2. **Layout Split**

- [ ] Keep 60/40 (chat + condensed rail)
- [ ] Switch to 70/30 (more feed, less rail)
- [ ] Switch to 65/35 (balanced)
- [ ] Switch to tabbed (full width per tab)

### 3. **Module Access**

- [ ] Tabs in header (Feed | Calendar | Members | About)
- [ ] Sidebar expansion (collapsible modules)
- [ ] URL routing (/spaces/cs-club/calendar)
- [ ] Dropdown menu (More → Tools, Settings)

### 4. **Composer Location**

- [ ] Bottom (chat style) - current
- [ ] Top (feed style)
- [ ] Modal (for rich content)
- [ ] Inline expansion (adaptive)

### 5. **Content Hierarchy**

- [ ] Flat (all posts equal) - current
- [ ] Type-based (events > announcements > messages)
- [ ] User-controlled (filters/sorting)
- [ ] Smart (algorithm-driven)

---

## 🚀 Next Steps

**We need to decide**:

1. **What is the core job of a Space?**
2. **What layout best supports that job?**
3. **How do users navigate within a Space?**
4. **How much screen space should context (rail) get?**
5. **Where should rich interactions (create event) happen?**

**Then we can**:

- Design the right layout
- Implement the right interactions
- Apply the right branding

---

**Status**: ⏸️ **PAUSED FOR STRATEGIC DECISION**

Let's align on the UX model before we build more.
Status: Superseded
Superseded by: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
Note: Retained for historical context only. If any guidance here conflicts with the Spaces v1 spec, follow the spec.




