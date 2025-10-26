# 📋 Inline vs. Widget Decision Framework

**Purpose**: Clear rules for what goes in the feed vs. what becomes a widget tool.

---

## 🎯 Core Principle

**Feed = Conversations & Time-Sensitive Content**  
**Widgets = Persistent Tools & Complex Interactions**

---

## ✅ INLINE in Feed

### Standard Posts (Discussions)

**Why**: This is the MAIN purpose of Spaces - people talking.

**Characteristics**:

- Simple text + media
- Conversation starters
- Time-sensitive or ephemeral
- Quick reactions/comments

**Examples**:

- "Who's going to Walmart tonight?"
- "Selling MTH 141 textbook - $40"
- "Check out my deployed app!"
- "Thoughts on the new lab?"

**Visual**: Simple card, reactions, comments

---

### Event Posts (Pre-seeded)

**Why**: Events exist in the timeline, but shouldn't dominate.

**Characteristics**:

- Mostly RSS/calendar imports
- Time-based (upcoming → past)
- Optional RSVP
- Scrollable, not always pinned

**Examples**:

- "TypeScript Workshop - Today 6PM"
- "Hackathon 2025 - Feb 15-17"
- "CS Department Career Fair"

**Visual**: Standard card with date badge, location, RSVP button

---

### Announcement Posts (Leader-Only)

**Why**: Important, time-sensitive messaging.

**Characteristics**:

- Leader/mod only
- Auto-pins to top
- Notifies all members
- Gold border/background

**Examples**:

- "Meeting location changed to Davis 101"
- "Important: Dues due by Friday"
- "Election results are in!"

**Visual**: Gold border, megaphone icon, pinned

---

### Poll Posts (Quick Votes)

**Why**: Impulse engagement, conversation-like.

**Characteristics**:

- Simple question + options
- Quick vote (one tap)
- Auto-closes after X days
- Inline results

**Examples**:

- "Which meeting time? Thu 6pm vs Fri 5pm"
- "T-shirt design A or B?"
- "What should our next project be?"

**Visual**: Inline buttons, live vote counts

---

## 🛠️ WIDGET TOOLS (Click-Through)

### Forms (Complex Data Collection)

**Why**: Too complex for inline, needs full interface.

**Characteristics**:

- Multiple fields
- Validation required
- Persistent (stays open for days/weeks)
- Data export/management

**Examples**:

- Event registration (name, email, dietary restrictions)
- T-shirt orders (size, color, quantity, payment)
- Interest surveys (multiple questions)
- Volunteer signups

**Access**:

1. Leader creates via Tools widget
2. Appears in Tools widget preview
3. Click → Full form interface
4. Optional announcement post links to form

**Visual**: Widget preview shows "23 responses" + click-through

---

### Trackers (Persistent Data)

**Why**: Ongoing data collection, needs dedicated view.

**Characteristics**:

- Real-time updates
- Persistent across sessions
- Requires management interface
- Often leader-only edit

**Examples**:

- Dues tracker ($12 / $50 members paid)
- Attendance (89% last meeting)
- Project milestones (3/5 complete)
- Volunteer hours (342 hours total)

**Access**:

1. Leader creates via Tools widget
2. Appears in Tools widget preview
3. Click → Full tracker interface
4. Members can view, leaders can edit

**Visual**: Widget preview shows progress bar + stats

---

### Persistent Polls (Ongoing Surveys)

**Why**: Long-term data collection, not one-off votes.

**Characteristics**:

- Open for weeks/months
- Complex questions (multiple choice, rankings)
- Detailed results/analytics
- Export data

**Examples**:

- "What topics should we cover this semester?" (10 options, rank)
- "Rate your experience 1-5 on 8 criteria"
- "Which speakers would you like to see?" (ongoing suggestions)

**Access**:

1. Different from inline polls (quick votes)
2. Created via Tools widget
3. Full results page with charts

**Visual**: Widget preview shows "87 responses" + click-through

---

### Signups (Event Registration)

**Why**: Detailed registration, capacity limits, confirmations.

**Characteristics**:

- Capacity limits (50/100 spots)
- Waitlist management
- Email confirmations
- Check-in at event

**Examples**:

- Workshop registration (limited to 30)
- Hackathon signup (team info, project idea)
- Competition registration (eligibility check)

**Access**:

1. Tied to events, but more complex than simple RSVP
2. Created via Tools widget
3. Full signup interface with waitlist

**Visual**: Widget preview shows "45/50 registered"

---

## 📊 Decision Tree

```
Is it a conversation starter or comment-worthy?
├─ YES → Inline Post (Standard)
└─ NO ↓

Is it time-sensitive and disappears after event?
├─ YES → Inline Post (Event)
└─ NO ↓

Is it leader-only and requires immediate attention?
├─ YES → Inline Post (Announcement)
└─ NO ↓

Is it a simple one-question vote?
├─ YES → Inline Post (Poll)
└─ NO ↓

Does it require multiple fields or complex data?
├─ YES → Widget Tool (Form/Tracker)
└─ NO ↓

Is it persistent and needs ongoing management?
└─ YES → Widget Tool (Tracker/Persistent Poll)
```

---

## 🎨 Visual Comparison

### Inline Post

```
┌─────────────────────────────┐
│ Alex Martinez • 2h ago      │
│                             │
│ Who's going to Walmart      │
│ tonight? Need a ride!       │
│                             │
│ 👍 3  💬 8  ↗️ Share        │
└─────────────────────────────┘
```

**User Action**: Read, react, comment

---

### Widget Tool

```
┌─────────────────────────────┐
│ 🛠️ TOOLS ──────────────────► │
│                             │
│ • Dues Tracker (12/50 paid) │
│ • Attendance (Last: 89%)    │
│ • T-Shirt Orders (23)       │
│                             │
│ (Click to use/manage)       │
└─────────────────────────────┘
```

**User Action**: Click widget → Full interface

---

## 🚀 Migration Strategy

### Moving Forms/Trackers from Inline → Widget

**Old Approach** (Wrong):

```typescript
// ❌ Form as inline post
<BoardCardForm formData={formData} onSubmit={handleSubmit} />
```

**New Approach** (Correct):

```typescript
// ✅ Form in widget, announcement links to it
<ToolsWidget
  tools={[
    {
      id: "tshirt-form",
      name: "T-Shirt Orders",
      type: "form",
      responses: 23,
      href: "/spaces/cs-club/tools/tshirt-form"
    }
  ]}
/>

// Optional announcement in feed:
<BoardCardAnnouncement
  content="T-shirt orders are open! Click here to order."
  linkTo="/spaces/cs-club/tools/tshirt-form"
/>
```

---

## 📈 Success Metrics by Type

### Inline Posts

**Measure**:

- Reaction rate (target: 20%+)
- Comment rate (target: 15%+)
- Time on post (target: 30s+)

### Widget Tools

**Measure**:

- Click-through rate (target: 40%+)
- Completion rate (target: 60%+)
- Time in tool (target: 2+ min)

---

## ✅ Implementation Checklist

### For Developers

- [ ] Remove `board-card-form.tsx` from inline components
- [ ] Remove `board-card-tracker.tsx` from inline components
- [ ] Build `ToolsWidget` component
- [ ] Add click-through navigation to all widgets
- [ ] Implement breadcrumb system
- [ ] Update Storybook demos

### For Designers

- [ ] Update widget designs with click affordances
- [ ] Design full view pages for each widget
- [ ] Create transition animations (widget → full view)
- [ ] Design mobile sheet/drawer for widget tools

---

**Summary**: Keep the feed clean and conversational. Complex, persistent tools belong in clickable widgets.





