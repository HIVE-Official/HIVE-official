# ⚡ Spaces Quick Reference V5

**TL;DR**: Pre-seeded community hubs where students TALK. Widgets are TOOLS you click into.

---

## 🎯 One-Liner Value Props

**For Students**: "Chat with your org, tools when you need them"  
**For Leaders**: "Your org's home - discussions, pre-seeded events, and powerful tools"  
**For Campus**: "Every org gets a hub, pre-seeded with content, zero setup"

---

## 🏛️ Space Categories (4 Types)

1. **Student Organizations** (Clubs & Orgs) - 40%
2. **University Organization** (Official Campus) - 25%
3. **Residential** (Housing Communities) - 20%
4. **Greek Life** (Fraternities & Sororities) - 15%

---

## 📐 Layout at a Glance

```
┌────────────┬────────────────────┬──────────┐
│ Sidebar    │ Feed (70%)         │ Tools    │
│ (App Nav)  │                    │ (30%)    │
│            │ What's on mind?    │          │
│ Feed       │ 📌 Pinned          │ 📅 ─────►│
│ Spaces ←   │ 💬 DISCUSSIONS     │ Events   │
│ Profile    │ 💬 💬 💬           │          │
│ HiveLab    │ 📅 Event (scroll)  │ 👥 ─────►│
│            │ 💬 💬 💬           │ Community│
│            │ [Filters]          │          │
│            │                    │ 📚 ─────►│
│            │                    │ Resources│
│            │                    │          │
│            │                    │ 🛠️ ─────►│
│            │                    │ Tools    │
└────────────┴────────────────────┴──────────┘
```

**Key Changes**:

- 70/30 split (more feed space)
- Discussions are PRIMARY (80% of content)
- Events are SECONDARY (pre-seeded, scrollable)
- Widgets have arrows (→) = CLICKABLE TOOLS

---

## 🧩 Widget System (CLICKABLE TOOLS)

**Philosophy**: Widgets = Tools you click into (not just info displays)

**4 Core Tools**:

1. **📅 Events Tool** (combines next event + calendar)
   - Preview: "Workshop - Today 6PM"
   - Click → Full calendar page
2. **👥 Community Tool** (combines who's here + roster)
   - Preview: "🟢 12 online now • 342 members"
   - Click → Full member roster
3. **📚 Resources Tool** (files/links)
   - Preview: "Discord • GitHub • Notes"
   - Click → All resources page
4. **🛠️ Tools Widget** (HiveLab integrations)
   - Preview: "Dues (12/50) • Attendance (89%)"
   - Click → All tools page

**Click Behavior**: Widget header has arrow (→), full hover/lift effect

---

## 📊 Content Priority (REVISED)

**1. Discussions** (80% - PRIMARY)

- "Who's going to Walmart?"
- "Selling textbook - $40"
- "Check out my project!"

**2. Pinned Announcements** (gold border, leader-only)

**3. Events** (15% - SECONDARY, pre-seeded, scrollable)

**4. Inline Polls** (quick votes, 5%)

---

## 🎨 Gold Branding

**Where**:

- All widget headers (`NEXT EVENT`, `WHO'S HERE`)
- Space names (`UB Computer Science Club`)
- Primary CTAs (`Join Space`, `RSVP`)
- Card borders (subtle, glows on hover)

**How**:

```typescript
className = "text-primary"; // Headers
className = "border-primary/10"; // Borders
className = "hover:border-primary/30"; // Hover
className = "bg-gradient-to-r from-primary..."; // CTAs
```

---

## 🔄 Core User Flows (REVISED)

**Talk**: Type in composer → Post (PRIMARY flow)  
**Join Space**: Feed post → Click space → Preview → Join (1 click)  
**Use Tool**: Click widget → Full view → Use tool (forms, trackers)  
**Browse Events**: Scroll feed OR click Events widget → Calendar  
**RSVP**: See event → Click RSVP → Going (optional, less emphasis)  
**Connect**: Community widget → Click avatar → DM

---

## 📦 Component Imports (REVISED)

```typescript
// Layout
import { SpaceHubLayout } from "@hive/ui";

// Widget Tools (Clickable)
import {
  EventsWidget, // Combines next event + calendar
  CommunityWidget, // Combines who's here + roster
  ResourcesWidget, // Files/links
  ToolsWidget, // HiveLab tools
} from "@hive/ui";

// Types
import type { Post, Space, CalendarEvent, SpaceMember, Tool } from "@hive/ui";
```

---

## 📈 Success Metrics (REVISED)

**Discussion Engagement** (PRIMARY):

- Posts per member/week (target: 0.8+)
- Comments per post (target: 3+)
- Reaction rate (target: 20%+)

**Widget Click-Through**:

- Widget → Full view (target: 40%+)
- Time in tool (target: 2+ min)

**Event Engagement** (SECONDARY):

- RSVP rate on pre-seeded events (target: 10%+)

---

## 🚀 Storybook

```bash
cd packages/ui && pnpm storybook
```

Navigate to: **Spaces > Hub Layout**

⚠️ **Note**: Current stories reflect V4 (event-first). Needs update to V5 (discussion-first).

---

## 🗺️ Navigation (Breadcrumbs)

**Widget Click-Through**:

```
Space Hub
  ↓ Click "Events" widget
Space > Events
  ↓ Click "TypeScript Workshop"
Space > Events > Workshop
```

**All Widget Destinations**:

- `/spaces/cs-club` → Hub (feed + tools)
- `/spaces/cs-club/events` → Full calendar
- `/spaces/cs-club/members` → Full roster
- `/spaces/cs-club/resources` → All files/links
- `/spaces/cs-club/tools` → All HiveLab tools

---

## 📋 Inline vs. Widget Decision

**INLINE** = Conversations, time-sensitive, simple  
**WIDGET** = Persistent tools, complex, data-heavy

**Examples**:

- ✅ Inline: "Who's going to Walmart?" (discussion)
- ✅ Inline: "Workshop - Today 6PM" (event)
- ✅ Inline: "Meeting time? Thu vs Fri" (quick poll)
- 🛠️ Widget: Dues tracker (persistent, complex)
- 🛠️ Widget: T-shirt order form (data collection)
- 🛠️ Widget: Attendance sheet (ongoing management)

See `INLINE_VS_WIDGET_FRAMEWORK.md` for full decision tree.

---

**Full Docs**:

- **V5 Architecture** (current): `SPACES_ARCHITECTURE_V5.md`
- **Inline vs Widget**: `INLINE_VS_WIDGET_FRAMEWORK.md`
- **V4 Architecture** (previous): `SPACES_ARCHITECTURE_V4.md`
