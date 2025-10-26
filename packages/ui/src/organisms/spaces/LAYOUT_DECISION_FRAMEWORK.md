# 🎯 Spaces Layout Decision Framework

**Purpose**: Help us choose the RIGHT layout model for HIVE Spaces  
**Status**: 🚨 **DECISION REQUIRED BEFORE CONTINUING**

---

## 🤔 The Core Question

**What is a Space on HIVE?**

We need to answer this definitively before we can design the right layout.

---

## 🏗️ Three Distinct Models

### Model 1: **Community Chat** (Discord/Slack)

```
Primary Job: Real-time conversation
Primary Action: Send message
Content Types: Messages (90%), Events (10%)
User Mindset: "What's happening RIGHT NOW?"
```

**Layout**:

- Composer at bottom (always visible)
- Messages scroll up (chronological)
- Minimal sidebar (just context)
- Events buried in stream

**Best For**:

- Living groups (dorm floors, project teams)
- Active daily discussion
- Quick coordination ("who's going to dinner?")

**Not Good For**:

- Event-heavy spaces (student orgs with calendars)
- Announcement-focused spaces
- Long-form content

---

### Model 2: **Community Hub** (Facebook Groups)

```
Primary Job: Stay informed, discover opportunities
Primary Action: Browse posts, RSVP to events
Content Types: Events (40%), Posts (40%), Announcements (20%)
User Mindset: "What do I need to know? What can I join?"
```

**Layout**:

- Composer at top (adaptive to content type)
- Posts scroll down (reverse chronological)
- Rich sidebar (calendar, members, about)
- Events prominent in feed

**Best For**:

- Student organizations (CS Club, Dance Team)
- Event-driven communities
- Announcement channels

**Not Good For**:

- High-volume chat
- Real-time coordination

---

### Model 3: **Hybrid** (Context-Aware)

```
Primary Job: Adapts to space type
Primary Action: Depends on context
Content Types: Varies by space type
User Mindset: "Give me what's most important for THIS space"
```

**Layout**:

- Different layouts for different space types
- Smart defaults based on space purpose
- Flexible module system

**Best For**:

- Platform with diverse space types
- Maximizing value per space type

**Not Good For**:

- Consistency (multiple patterns to learn)
- Simple implementation

---

## 📊 Decision Matrix

| Criteria                      | Chat Model   | Hub Model    | Hybrid Model               |
| ----------------------------- | ------------ | ------------ | -------------------------- |
| **Real-time conversation**    | ✅ Excellent | ⚠️ Okay      | ✅ Excellent (when needed) |
| **Event discovery**           | ❌ Poor      | ✅ Excellent | ✅ Excellent               |
| **Announcements**             | ❌ Poor      | ✅ Excellent | ✅ Excellent               |
| **Rich content creation**     | ❌ Hard      | ✅ Easy      | ✅ Easy                    |
| **Quick coordination**        | ✅ Easy      | ⚠️ Okay      | ✅ Easy (when needed)      |
| **Information hierarchy**     | ❌ Flat      | ✅ Clear     | ✅ Clear                   |
| **Learning curve**            | ✅ Familiar  | ✅ Familiar  | ⚠️ Higher                  |
| **Implementation complexity** | ✅ Simple    | ✅ Simple    | ❌ Complex                 |

---

## 🎓 What Do UB Students Actually Need?

### Space Type Analysis

**Student Organizations** (60% of spaces):

- **Primary need**: Event calendar, announcements, member roster
- **Secondary need**: Discussion threads
- **Rare need**: Real-time chat
- **Best fit**: **Hub Model** ✅

**Living Communities** (20% of spaces):

- **Primary need**: Quick coordination ("who has TP?")
- **Secondary need**: Event planning
- **Rare need**: Formal announcements
- **Best fit**: **Chat Model** ✅

**Academic Groups** (15% of spaces):

- **Primary need**: Resource sharing, study sessions
- **Secondary need**: Q&A threads
- **Rare need**: Real-time chat
- **Best fit**: **Hub Model** ✅

**Social/Interest** (5% of spaces):

- **Primary need**: Meetups, coordination
- **Secondary need**: Photo sharing
- **Rare need**: Ongoing discussion
- **Best fit**: **Hybrid** ✅

**Conclusion**: **70%+ of HIVE spaces need Hub Model**, not Chat Model

---

## 🎯 Recommended Approach

### **Start with Hub Model** (Model 2)

**Rationale**:

1. ✅ **Matches majority use case** - Student orgs are event + announcement focused
2. ✅ **Better information hierarchy** - Events don't get buried
3. ✅ **Easier rich content** - Creating events/polls is natural
4. ✅ **Clearer modules** - Calendar, Members, About get proper space
5. ✅ **Fits HIVE vision** - Platform is about "opportunities", not just chat

**Layout**:

```
┌────────┬──────────────────────────────┬──────────────┐
│Sidebar │ Feed (65%)                   │ Context (35%)│
│        │ ┌──────────────────────────┐ │              │
│        │ │ [Create ▼]               │ │ 📅 CALENDAR  │
│        │ └──────────────────────────┘ │ ┌──────────┐ │
│        │                              │ │ Feb 2025 │ │
│        │ 📌 PINNED                    │ │  [Today] │ │
│        │ ┌──────────────────────────┐ │ └──────────┘ │
│        │ │ 🎓 Spring Hackathon      │ │ [3 upcoming] │
│        │ │ Feb 15 @ 2pm             │ │              │
│        │ │ [RSVP: Going ✓]          │ │ 👥 MEMBERS   │
│        │ └──────────────────────────┘ │ 342 members  │
│        │                              │ • 12 leaders │
│        │ 📅 UPCOMING EVENTS           │ • 330 active │
│        │ ┌──────────────────────────┐ │ [View all →] │
│        │ │ TypeScript Workshop      │ │              │
│        │ │ Feb 12 @ 6pm             │ │ ℹ️  ABOUT    │
│        │ │ [RSVP]                   │ │ UB's premier │
│        │ └──────────────────────────┘ │ CS club...   │
│        │                              │              │
│        │ 💬 DISCUSSIONS               │ [Tags]       │
│        │ ┌──────────────────────────┐ │ [Links]      │
│        │ │ Sarah: Who's going to... │ │              │
│        │ │ 👍 3  💬 5                │ │              │
│        │ └──────────────────────────┘ │              │
│        │                              │              │
└────────┴──────────────────────────────┴──────────────┘
```

**Key Features**:

- ✅ **Pinned content** prominent at top
- ✅ **Events** get full card treatment
- ✅ **Calendar** in sidebar (monthly view + next events)
- ✅ **Members** summary with expand option
- ✅ **Composer** adaptive (Post, Event, Poll, Announcement)
- ✅ **Discussions** threaded, collapsible

---

## 🔄 Migration Path (If Hybrid Needed Later)

**Phase 1**: Hub Model (now)

- Default layout for all spaces
- Optimized for orgs/events

**Phase 2**: Space Type Detection (v2)

- Add space type on creation (Org, Living, Academic, Social)
- Still same layout for all

**Phase 3**: Layout Adaptation (v3)

- Living spaces get chat mode
- Orgs keep hub mode
- Academic gets resource-focused variant

---

## 📐 Detailed Hub Layout Specs

### Header

```typescript
<header className="bg-background border-b border-primary/10">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-h3 font-h3 text-primary">{space.name}</h1>
      <p className="text-body-sm text-muted-foreground">
        {space.type} • {space.memberCount} members
      </p>
    </div>
    <Button className="bg-gradient-to-r from-primary to-primary/90 text-black">
      Join Space
    </Button>
  </div>
</header>
```

### Main Feed (65%)

```typescript
<div className="flex-1 overflow-y-auto p-4 space-y-4">
  {/* Composer - Adaptive */}
  <Composer
    type={composerType} // 'post' | 'event' | 'poll' | 'announcement'
    onChange={setComposerType}
  />

  {/* Pinned Section - Always visible */}
  {pinnedPosts.length > 0 && (
    <section>
      <h2 className="text-caption font-semibold text-primary mb-2">PINNED</h2>
      {pinnedPosts.map((post) => (
        <BoardCard key={post.id} post={post} isPinned />
      ))}
    </section>
  )}

  {/* Upcoming Events - Prominent */}
  {upcomingEvents.length > 0 && (
    <section>
      <h2 className="text-caption font-semibold text-primary mb-2">
        UPCOMING EVENTS
      </h2>
      {upcomingEvents.slice(0, 3).map((event) => (
        <BoardCardEvent key={event.id} post={event} />
      ))}
    </section>
  )}

  {/* Recent Posts - Filterable */}
  <section>
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-caption font-semibold text-primary">
        RECENT ACTIVITY
      </h2>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          All
        </Button>
        <Button variant="ghost" size="sm">
          Events
        </Button>
        <Button variant="ghost" size="sm">
          Discussions
        </Button>
      </div>
    </div>
    {posts.map((post) => (
      <BoardCard key={post.id} post={post} />
    ))}
  </section>
</div>
```

### Context Rail (35%)

```typescript
<aside className="w-[35%] border-l border-border overflow-y-auto p-4 space-y-4">
  {/* Calendar Module */}
  <Card className="border-primary/10">
    <CardHeader>
      <h3 className="text-caption font-semibold text-primary">CALENDAR</h3>
    </CardHeader>
    <CardContent>
      <Calendar events={upcomingEvents} onDateClick={handleDateClick} />
      <div className="mt-2 text-body-sm">
        <p>{upcomingEvents.length} upcoming events</p>
        <Link href={`/spaces/${spaceId}/calendar`}>View full calendar →</Link>
      </div>
    </CardContent>
  </Card>

  {/* Members Module */}
  <Card className="border-primary/10">
    <CardHeader>
      <h3 className="text-caption font-semibold text-primary">MEMBERS</h3>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className="text-h4 font-h4">{space.memberCount}</p>
        <div className="text-body-sm text-muted-foreground">
          <p>• {leaderCount} leaders</p>
          <p>• {activeCount} active this week</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {recentMembers.slice(0, 8).map((member) => (
            <AvatarCard key={member.id} user={member} variant="compact" />
          ))}
        </div>
        <Link href={`/spaces/${spaceId}/members`}>View all members →</Link>
      </div>
    </CardContent>
  </Card>

  {/* About Module */}
  <Card className="border-primary/10">
    <CardHeader>
      <h3 className="text-caption font-semibold text-primary">ABOUT</h3>
    </CardHeader>
    <CardContent>
      <p className="text-body-sm line-clamp-4">{space.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {space.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      {space.featuredLinks.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className="flex items-center gap-2 text-body-sm"
        >
          <ExternalLink className="h-3 w-3" />
          {link.label}
        </a>
      ))}
    </CardContent>
  </Card>
</aside>
```

---

## 🎨 Adaptive Composer

**Key Innovation**: Composer adapts to content type

```typescript
// Default state
<button onClick={() => setComposerType('select')}>
  💬 Create Post
</button>

// Expanded state - type selector
<div className="flex gap-2">
  <Button onClick={() => setComposerType('post')}>📝 Post</Button>
  <Button onClick={() => setComposerType('event')}>📅 Event</Button>
  <Button onClick={() => setComposerType('poll')}>📊 Poll</Button>
  <Button onClick={() => setComposerType('announcement')}>📢 Announcement</Button>
</div>

// Post mode - simple
<div className="space-y-2">
  <Textarea placeholder="Share something..." />
  <div className="flex items-center justify-between">
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">📷 Photo</Button>
      <Button variant="ghost" size="sm">🔗 Link</Button>
    </div>
    <Button className="bg-primary text-black">Post</Button>
  </div>
</div>

// Event mode - rich form
<div className="space-y-2">
  <Input placeholder="Event title" />
  <DateTimePicker label="Start time" />
  <DateTimePicker label="End time" />
  <Input placeholder="Location" />
  <Textarea placeholder="Description" />
  <Switch label="Enable RSVP" />
  <Switch label="Enable check-in" />
  <Button className="bg-primary text-black">Create Event</Button>
</div>
```

---

## 🚀 Implementation Plan

### Phase 1: Hub Layout Core (Week 1)

- [ ] Implement 65/35 split
- [ ] Pinned section at top
- [ ] Event cards (prominent)
- [ ] Discussion cards (compact)
- [ ] Calendar module in sidebar
- [ ] Members module in sidebar
- [ ] About module in sidebar

### Phase 2: Composer & Interactions (Week 2)

- [ ] Adaptive composer (post/event/poll/announcement)
- [ ] RSVP interactions
- [ ] Reaction system
- [ ] Comment threads
- [ ] Pin/unpin posts

### Phase 3: Module Pages (Week 3)

- [ ] Full calendar page (/spaces/:id/calendar)
- [ ] Full members page (/spaces/:id/members)
- [ ] Full about page (/spaces/:id/about)
- [ ] Tools page (leader only)
- [ ] Settings page (leader only)

### Phase 4: Polish & Optimization (Week 4)

- [ ] Gold branding throughout
- [ ] Loading states
- [ ] Empty states
- [ ] Mobile responsive
- [ ] Accessibility audit

---

## ✅ Decision Required

**Do we proceed with Hub Model?**

- [ ] ✅ YES - Hub Model (recommended)
- [ ] ⚠️ NO - Stay with Chat Model
- [ ] 🤔 DISCUSS - Need more context

**If YES, I will**:

1. Redesign layout as Hub Model
2. Apply gold branding
3. Implement adaptive composer
4. Build module pages
5. Create comprehensive Storybook demos

**If NO, please clarify**:

- What's wrong with Hub Model?
- What would make Chat Model work better?
- What's missing from this analysis?

---

**Status**: ⏸️ **AWAITING DECISION**
Status: Superseded
Superseded by: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md
Note: Retained for historical context only. If any guidance here conflicts with the Spaces v1 spec, follow the spec.





