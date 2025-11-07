# SPACES TOPOLOGY
**Community Hubs: Where Participation Happens**

> **Design Philosophy**: YC/SF minimalism meets campus coordination
> **Target**: < 2 seconds from space click → board view
> **Aesthetic**: Linear/Vercel/Arc—content first, chrome minimized
> **Platform**: Web-first (desktop primary, mobile companion)

---

## 🎯 Recent Refinements (Feed-First Minimalism)

**Space Discovery Strategy**:
- ✅ **Feed-first discovery**: Discovery happens through content, not catalog browsing
- ✅ **Inline join CTAs**: Join buttons directly in feed posts from public spaces
- ✅ **Social proof suggestions**: "8 CS majors joined Chemistry 101" prompts

**Layout Simplifications**:
- **Space Header**: Removed @handle, removed category badge → Only icon + name + member count
- **Pinned Posts**: Changed from carousel to vertical stack → Single gold left border indicator
- **Composer**: Removed avatar, removed "Posting to" label → Consolidated [+ Add] dropdown
- **Right Rail**: Reduced from 5 sections to 3 → Deleted Members grid (48 avatars), merged Leaders into About
- **Mobile**: Removed tab bar → Single scroll view with About/Tools/Events at footer

**Clutter Reduction**:
- Right rail: 600px → 280px vertical space (-53%)
- Pinned section: 4 visual indicators → 1 gold left border
- Composer: 3 attachment buttons → 1 [+ Add] dropdown
- Mobile: 4 tabs → 0 tabs (single scroll)

---

## Table of Contents

1. [Strategic Context](#strategic-context)
2. [Design System Foundation](#design-system-foundation)
3. [Space Architecture](#space-architecture)
4. [Leader Tools](#leader-tools)
5. [Component Specifications](#component-specifications)
6. [Technical Architecture](#technical-architecture)
7. [Performance & Analytics](#performance--analytics)
8. [Testing Strategy](#testing-strategy)

---

## Strategic Context

### What Are Spaces?

**Spaces** = Communities with shared purpose (clubs, residential, academic, interest-based)

**Key Difference from Feed**:
| Aspect | Feed | Space Board |
|--------|------|-------------|
| **Action** | Read, scroll, discover | Post, coordinate, build |
| **Content** | Aggregated from all spaces | Single space only |
| **Posting** | No (use FAB → pick space) | Yes (default to this space) |
| **Visibility** | Campus-wide + space posts | Space-only + pins |
| **Purpose** | Feel connected | Get things done |

### Space Types (Auto-Join)

Students are automatically joined to 3 spaces during onboarding:

1. **Class Cohort** (e.g., "Class of 2028")
   - Purpose: Connect with classmates across all majors
   - Content: Graduation updates, class-wide events, traditions
   - Auto-join: Based on graduation year

2. **Residential** (e.g., "Ellicott Complex - Red Jacket Hall")
   - Purpose: Hyper-local coordination (rides, food, lost & found)
   - Content: "Who's going to Wegmans?", "Selling textbook", "Lost keys"
   - Auto-join: Based on specific housing assignment (building level)
   - **This is their first space** - sets defaultSpace

3. **Major** (e.g., "Computer Science Majors")
   - Purpose: Major-specific resources, career events, study groups
   - Content: TA office hours, project help, internship postings
   - Auto-join: Based on declared major (NOT school/college)

**Additional Spaces**:
- Students can browse and join more spaces (clubs, sports, interests)
- Limit: ≤20 spaces per student (prevents clutter)
- Can leave non-auto-joined spaces anytime

### Space Discovery vs. Space Board

**Space Discovery** (`/spaces` or `/spaces/browse`):
- Grid/list view of all campus spaces
- Filter by category (Student Org, Residential, Academic, Interest)
- Search by name, description, tags
- "Join" CTA on each card
- Shows member count, recent activity

**Space Board** (`/spaces/[spaceId]` or `/s/[slug]`):
- Single space view with posts chronological feed
- Composer at top (post defaults to this space)
- Pinned posts carousel (≤2 pins)
- Leader toolbar (if user is leader)
- Member list, about section, tools

---

## Design System Foundation

### Color Palette
```css
/* Inherits from FEED_RITUALS_TOPOLOGY.md */
/* Additional Space-Specific Colors */

--space-badge-bg: rgba(59, 130, 246, 0.1);  /* Space badge blue */
--space-badge-border: rgba(59, 130, 246, 0.2);
--space-badge-text: #3B82F6;

--leader-badge-bg: rgba(255, 215, 0, 0.1);  /* Leader badge gold */
--leader-badge-border: rgba(255, 215, 0, 0.2);
--leader-badge-text: var(--gold-start);

--pin-indicator: var(--gold-start);         /* Pinned post marker */
--member-count-text: var(--text-secondary); /* Subtle member count */
```

### Typography
```css
/* Inherits from FEED_RITUALS_TOPOLOGY.md */
/* Additional Space-Specific Scales */

--text-space-name: 22px / 26px;            /* Space header name */
--text-space-description: 14px / 20px;     /* About section */
--text-member-count: 12px / 16px;          /* "428 members" */
```

### Spacing & Layout
```css
/* Space Board Layout */
--board-max-width: 1200px;                 /* Main content area */
--board-sidebar-width: 280px;              /* Right sidebar (desktop) */
--board-gap: 24px;                         /* Gap between main + sidebar */

/* Discovery Grid */
--discovery-card-width: 320px;             /* Space card in grid */
--discovery-gap: 16px;                     /* Gap between cards */
```

---

## Space Architecture

### Spatial Layout

#### Desktop (1024px+) - Space Board View
```
┌─────────────────────────────────────────────────────────────┐
│ S0: Shell (collapsible sidebar + top bar)                  │
├──────────┬──────────────────────────────┬───────────────────┤
│          │ S1: Space Header             │                   │
│  Sidebar │ [Icon] Space Name            │   R: Rail         │
│          │ 428 members · 12 online      │   (Minimal)       │
│  • Feed  │ [Join/Joined] [⋯]            │                   │
│  • Spaces├──────────────────────────────┤   • About         │
│  • Me    │ S2: Pinned (≤2)              │     (w/ Leaders)  │
│  • Lab   │ [Stacked Posts - Gold │]     │   • Tools (3)     │
│  • Notif │ [Vertical, Not Carousel]     │   • Events (2)    │
│          ├──────────────────────────────┤                   │
│          │ S4: Composer (minimal)       │                   │
│          │ [What's happening?]          │                   │
│          │ [+ Add] [Post]               │                   │
│          ├──────────────────────────────┤                   │
│          │ S3: Stream                   │                   │
│          │ [Post Card]                  │                   │
│          │ [Event Card]                 │                   │
│          │ [Post Card]                  │                   │
│          │ [Tool Card]                  │                   │
│          │ ...infinite scroll           │                   │
│          │ (chronological)              │                   │
└──────────┴──────────────────────────────┴───────────────────┘

L: Leader Toolbar (if user is leader)
  [Pin Post ▾] [Feature Tool ▾] [Manage Members] [⚙️ Settings]
```

#### Mobile (0-767px) - Space Board View (Single Scroll - No Tabs)
```
┌─────────────────────────────────────┐
│ S0: Top Bar                        │
│ [←] Space Name [⋯ Menu]            │
├─────────────────────────────────────┤
│ S1: Space Header (compressed)      │
│ [Icon] Space Name                  │
│ 428 members · 12 online            │
│ [Join/Joined]                      │
├─────────────────────────────────────┤
│ S2: Pinned (vertical stack)        │
│ [Pinned Post 1]                    │
│ [Pinned Post 2]                    │
├─────────────────────────────────────┤
│ S4: Composer (minimal)             │
│ [What's happening?]                │
│ [+ Add] [Post]                     │
├─────────────────────────────────────┤
│ S3: Stream (single scroll)         │
│ [Post Card]                        │
│ [Event Card]                       │
│ [Post Card]                        │
│ [Tool Card]                        │
│ ...infinite scroll                 │
│                                     │
│ ──── About (Footer Section) ────   │
│ [Space Description]                │
│ Leaders: [Avatar] [Avatar]         │
│ 428 members · Created Oct 2024     │
│                                     │
│ ──── Tools (if active) ────        │
│ [Tool 1] [Tool 2] [Tool 3]         │
│                                     │
│ ──── Upcoming Events ────          │
│ [Event 1] [Event 2]                │
│                                     │
├─────────────────────────────────────┤
│ Bottom Nav: Feed|Spaces|+|Notif|Me │
└─────────────────────────────────────┘

Instagram-style: All content in single scroll, About/Tools/Events at footer
```

#### Desktop - Space Discovery View
```
┌─────────────────────────────────────────────────────────────┐
│ S0: Shell                                                   │
├──────────┬──────────────────────────────────────────────────┤
│          │ S1: Header                                       │
│  Sidebar │ "Discover Spaces"                                │
│          │ [Search] [Filter: All ▾]                         │
│          ├──────────────────────────────────────────────────┤
│          │ S3: Grid/List                                    │
│          │ ┌────────┐ ┌────────┐ ┌────────┐               │
│          │ │ Space  │ │ Space  │ │ Space  │               │
│          │ │ Card 1 │ │ Card 2 │ │ Card 3 │               │
│          │ └────────┘ └────────┘ └────────┘               │
│          │ ┌────────┐ ┌────────┐ ┌────────┐               │
│          │ │ Space  │ │ Space  │ │ Space  │               │
│          │ │ Card 4 │ │ Card 5 │ │ Card 6 │               │
│          │ └────────┘ └────────┘ └────────┘               │
│          │ ...scroll for more                               │
└──────────┴──────────────────────────────────────────────────┘
```

### Space Board Features

#### 1. Pinned Posts Stack (S2 Pinned) - **SIMPLIFIED**

**Visual Treatment**:
```css
.pinned-stack {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pinned-card {
  padding: 16px;
  background: rgba(255, 215, 0, 0.05); /* Subtle gold tint */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid var(--pin-indicator); /* Gold left border - ONLY indicator */
  border-radius: var(--radius-md);
  transition: all var(--motion-standard) var(--ease-smooth);
  cursor: pointer;
}

.pinned-card:hover {
  background: rgba(255, 215, 0, 0.08);
  border-left-color: var(--gold-start);
}

.pinned-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.pinned-section-label svg {
  width: 14px;
  height: 14px;
  color: var(--pin-indicator);
}

.pinned-section-label span {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--text-tertiary);
}
```

**Structure** (Vertical Stack - No Carousel):
```
📌 PINNED BY LEADERS

┌──────────────────────────────────────┐
│ │ [Avatar] Name · 2d ago             │  ← Gold left border (4px)
│ │                                    │
│ │ IMPORTANT: Campus Wi-Fi will be   │
│ │ down for maintenance this Saturday │
│ │ 9 AM - 12 PM. Plan accordingly!    │
│ │                                    │
│ │ [↑ 42] [💬 7] [Share]             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ │ [Avatar] Name · 5d ago             │  ← Second pin (if exists)
│ │                                    │
│ │ Reminder: Final project due Friday!│
│ │ Submit via Canvas by 11:59 PM      │
│ │                                    │
│ │ [↑ 28] [💬 3] [Share]             │
└──────────────────────────────────────┘

Pins expire after 7 days
```

**Constraints**:
- **≤2 pins** per space at a time
- Only space leaders can pin/unpin posts
- Pins shown in chronological order (most recent first)
- Pins expire after 7 days (auto-unpin)
- **ONE visual indicator**: Gold left border only (no emoji, no carousel dots)

#### 2. In-Place Composer (S4) - **MINIMAL CHROME**

**Visual Treatment**:
```css
.space-composer {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 24px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2); /* Subtle dark background */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.space-composer:focus-within {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.composer-textarea {
  width: 100%;
  min-height: 80px;
  padding: 0; /* No padding - direct input */
  font-size: var(--text-body);
  color: var(--text-primary);
  background: transparent;
  border: none;
  resize: none; /* Fixed height, auto-grows via JS */
  outline: none;
  font-family: var(--font-body);
}

.composer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Structure** (NO avatar, NO "Posting to"):
```
┌─────────────────────────────────────┐
│ What's happening?                   │
│                                     │
│ [Auto-growing textarea]             │
│                                     │
├─────────────────────────────────────┤
│ [+ Add ▾]               [Post]      │  ← Consolidated attachments
└─────────────────────────────────────┘

[+ Add] Dropdown:
  📷 Photo
  📅 Event
  🔧 Tool
```

**Behavior**:
- **NO avatar shown**: User knows they're posting
- **NO "Posting to" label**: Context is clear from space header
- **Consolidated attachments**: Single [+ Add] dropdown instead of 3 buttons
- **Default visibility**: Space-only (not promoted to campus feed)
- **Auto-grow**: Textarea expands as user types (max 10 lines)
- **Attachment preview**: Shows below textarea when added

#### 3. Right Rail (Desktop Only) - **REDUCED TO 3 SECTIONS**

**Section Order (280px total vertical space)**:
1. About (with leaders inline) - 140px
2. Tools (if active) - 80px
3. Upcoming Events - 60px

**Deleted Sections**:
- ❌ Members Grid (48 avatars) - Visual noise, low utility
- ❌ Standalone Leaders section - Merged into About

---

**1. About Section** (Consolidated with Leaders):
```css
.rail-about {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}

.rail-about-description {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  max-height: 60px; /* ~3 lines */
  overflow: hidden;
  text-overflow: ellipsis;
}

.rail-about-leaders {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.leader-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.3);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ About                               │
│                                     │
│ A space for Chemistry 101 students  │
│ to share notes, form study groups,  │
│ and coordinate lab schedules.       │
│                                     │
│ Leaders: [Avatar] [Avatar] [+2]     │  ← Inline avatars
│ 428 members · Created Oct 2024      │
└─────────────────────────────────────┘
```

---

**2. Tools Widget** (If active):
```css
.rail-tools {
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}

.tool-item {
  padding: 8px;
  border-left: 3px solid rgba(255, 215, 0, 0.3);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  margin-bottom: 8px;
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ Tools (3)                           │
│                                     │
│ │ 📊 Midterm Study Poll             │
│ │    Closes in 2h                   │
│                                     │
│ │ 📝 Lab Partner Match              │
│ │    Closes tomorrow                │
│                                     │
│ │ 🎯 Office Hours Tracker           │
│ │    Closes Friday                  │
└─────────────────────────────────────┘
```

---

**3. Upcoming Events Widget**:
```css
.rail-events {
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.event-item {
  padding: 8px;
  border-left: 3px solid rgba(59, 130, 246, 0.3); /* Blue for events */
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  margin-bottom: 8px;
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ Upcoming Events                     │
│                                     │
│ │ 📅 Study Group Session            │
│ │    Tomorrow 3PM                   │
│                                     │
│ │ 📅 Lab Review                     │
│ │    Friday 2PM                     │
└─────────────────────────────────────┘
```

**Total Vertical Space**: ~280px (down from 600px = -53% clutter)

### Space Discovery

#### Space Discovery Card

**Visual Treatment**:
```css
.discovery-card {
  width: var(--discovery-card-width);
  padding: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: all var(--motion-standard) var(--ease-smooth);
  cursor: pointer;
}

.discovery-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: var(--shadow-elevated);
  transform: translateY(-2px);
}

.discovery-card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.discovery-card-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.discovery-card-badge {
  padding: 4px 8px;
  background: var(--space-badge-bg);
  border: 1px solid var(--space-badge-border);
  border-radius: var(--radius-xs);
  font-size: var(--text-micro);
  font-weight: var(--weight-semibold);
  color: var(--space-badge-text);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Icon 64x64] Chemistry 101          │
│              @chem101                │
│              [ACADEMIC]              │
│                                     │
│ Study group coordination for        │
│ CHEM 101 students. Share notes,     │
│ form lab partners, office hours.    │
│                                     │
│ 428 members · 24 posts this week    │
│                                     │
│ [Join Space - Gold CTA]             │
└─────────────────────────────────────┘
```

**States**:
1. **Not Joined**: "Join Space" CTA
2. **Joined**: "Joined ✓" button (gray), "View Board" secondary CTA
3. **Hover**: Elevated shadow, border glow
4. **Loading**: Shimmer animation, disabled CTA
5. **Full** (if member cap exists): "Waitlist" CTA

#### Filter & Search

**Filter Chips**:
```css
.filter-chips {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-chip {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--motion-quick) var(--ease-smooth);
}

.filter-chip.active {
  background: var(--gold-subtle);
  border-color: var(--border-gold);
  color: var(--gold-start);
}

.filter-chip:hover:not(.active) {
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
}
```

**Filter Options**:
- **All** (default)
- **Student Orgs** (clubs, organizations)
- **Residential** (dorms, apartments)
- **Academic** (classes, majors, schools)
- **Interests** (hobbies, activities)
- **My Spaces** (already joined)

**Search Bar**:
```css
.discovery-search {
  width: 100%;
  max-width: 640px;
  height: 48px;
  padding: 0 16px 0 48px; /* Left padding for icon */
  font-size: var(--text-body);
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  transition: all var(--motion-standard) var(--ease-smooth);
  background-image: url('search-icon.svg');
  background-position: 16px center;
  background-repeat: no-repeat;
}

.discovery-search:focus {
  border-color: var(--border-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  outline: none;
}
```

**Search Behavior**:
- **Real-time**: Debounced 300ms
- **Searches**: Name, description, tags, handle
- **Highlights**: Matching text highlighted in results
- **Empty state**: "No spaces found. Try different keywords."

---

## Leader Tools

### Who Are Leaders?

**Space Leader** = User with elevated permissions to manage space

**How to Become Leader**:
1. **Founder**: Creates the space (auto-leader)
2. **Promoted**: Existing leader promotes another member
3. **Requested**: Space request approved by admin (Faculty flow)

**Leader Permissions**:
- Pin/unpin posts (≤2 at a time)
- Feature tools in rail widget
- Remove inappropriate posts/comments
- Manage member roles (promote/demote leaders)
- Edit space settings (name, description, icon, privacy)
- Transfer ownership (must have ≥1 other leader)

### Leader Toolbar

**Visual Treatment**:
```css
.leader-toolbar {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 16px;
  padding: 12px 16px;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.05) 0%,
    rgba(255, 165, 0, 0.05) 100%
  );
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-sm);
  display: flex;
  gap: 8px;
  align-items: center;
}

.leader-badge {
  padding: 4px 10px;
  background: var(--leader-badge-bg);
  border: 1px solid var(--leader-badge-border);
  border-radius: var(--radius-xs);
  font-size: var(--text-micro);
  font-weight: var(--weight-semibold);
  color: var(--leader-badge-text);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Structure**:
```
┌─────────────────────────────────────────────────┐
│ [LEADER] [Pin Post ▾] [Feature Tool ▾]         │
│          [Manage Members] [Space Settings ⚙️]  │
└─────────────────────────────────────────────────┘
```

**Actions**:

1. **Pin Post** (Dropdown)
   - Shows recent 20 posts
   - Click to toggle pin (max 2)
   - "Unpin" option if post already pinned
   - Shows pin expiration (7 days)

2. **Feature Tool** (Dropdown)
   - Shows space tools with responses
   - Click to toggle featured in rail
   - Max 3 featured tools at once
   - Shows response count, close time

3. **Manage Members**
   - Opens member list sheet
   - Search members by name/username
   - Promote/demote leader roles
   - Remove members (with confirmation)

4. **Space Settings** (Opens settings sheet)
   - Edit name, description, icon
   - Change privacy (Public/Private/Hidden)
   - Set member cap (optional)
   - Transfer ownership
   - Archive space (soft delete)

### Pin Post Flow

**Desktop Interaction**:
```
1. Leader clicks "Pin Post ▾" in toolbar
2. Dropdown opens showing recent 20 posts
3. Hover over post → "Pin" button appears
4. Click "Pin" → Post moves to pinned carousel
5. If 2 posts already pinned → Show "Unpin one first" tooltip
6. Pinned post gets 📌 emoji, gold border
7. Auto-unpins after 7 days
```

**Mobile Interaction**:
```
1. Leader taps "..." on any post
2. Bottom sheet opens with actions
3. "Pin to Top" option (if <2 pins)
4. Confirm → Post moves to pinned carousel
5. Swipe pinned carousel → Tap 📌 to unpin
```

### Space Settings Sheet

**Visual Treatment**:
```css
.settings-sheet {
  /* Inherits from Z1 Sheet pattern */
  max-width: 640px;
  padding: 32px;
}

.settings-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.settings-section:last-child {
  border-bottom: none;
}

.settings-label {
  display: block;
  margin-bottom: 8px;
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Close ×] Space Settings            │
│                                     │
│ BASIC INFO                          │
│ Space Name                          │
│ [Chemistry 101____________]         │
│                                     │
│ Handle                              │
│ [@chem101______________]            │
│                                     │
│ Description                         │
│ [Textarea - max 300 chars]          │
│                                     │
│ Icon                                │
│ [Current: 🧪] [Upload New]          │
│                                     │
│ ──────────────────────────────────  │
│                                     │
│ PRIVACY                             │
│ ○ Public (anyone can join)         │
│ ○ Private (requires approval)      │
│ ○ Hidden (invite-only)             │
│                                     │
│ Member Cap (optional)               │
│ [500_____] Leave empty for unlimited│
│                                     │
│ ──────────────────────────────────  │
│                                     │
│ LEADERS                             │
│ [Avatar] Sarah Martinez (You)       │
│ [Avatar] Mike Johnson               │
│          [+ Add Leader]             │
│                                     │
│ ──────────────────────────────────  │
│                                     │
│ DANGER ZONE                         │
│ [Transfer Ownership]                │
│ [Archive Space]                     │
│                                     │
│ [Save Changes - Gold] [Cancel]      │
└─────────────────────────────────────┘
```

### Member Management Sheet

**Structure**:
```
┌─────────────────────────────────────┐
│ [Close ×] Members (428)             │
│                                     │
│ [Search members...]                 │
│                                     │
│ LEADERS (2)                         │
│ [Avatar] Sarah Martinez             │
│          @sarah_m                   │
│          [Demote] [Remove]          │
│                                     │
│ [Avatar] Mike Johnson               │
│          @mike_j                    │
│          [Demote] [Remove]          │
│                                     │
│ MEMBERS (426)                       │
│ [Avatar] Alex Kim                   │
│          @alex_k                    │
│          [Promote to Leader] [Remove│
│                                     │
│ [Avatar] Jordan Lee                 │
│          @jordan_l                  │
│          [Promote to Leader] [Remove│
│                                     │
│ ...scroll for all members           │
│                                     │
│ [Export Member List CSV]            │
└─────────────────────────────────────┘
```

**Actions**:
- **Promote to Leader**: Requires confirmation, grants all leader permissions
- **Demote**: Removes leader permissions (can't demote self if only leader)
- **Remove**: Kicks member from space (can't rejoin if Private/Hidden)
- **Export**: CSV with name, username, email, join date, role

---

## Component Specifications

### SpaceCard Component (Discovery)

**File**: `packages/ui/src/atomic/organisms/space-card.tsx`

**Props Interface**:
```typescript
interface SpaceCardProps {
  // Core data
  space: {
    id: string;
    name: string;
    handle: string;
    description: string;
    iconUrl?: string;
    category: 'student_org' | 'residential' | 'academic' | 'interest';
    privacy: 'public' | 'private' | 'hidden';
  };

  // Stats
  memberCount: number;
  postCountThisWeek: number;
  activityLevel: 'high' | 'medium' | 'low'; // Visual indicator

  // User state
  isJoined: boolean;
  isFull: boolean; // If member cap reached

  // Interactions
  onJoin: () => void;
  onViewBoard: () => void;
  onCardClick: () => void;

  // Display
  variant?: 'grid' | 'list';
  showStats?: boolean;

  // Accessibility
  ariaLabel?: string;
}
```

**States**:
1. **Not Joined**: "Join Space" CTA enabled
2. **Joined**: "Joined ✓" button (gray), "View Board" secondary CTA
3. **Hover**: Elevated shadow, border glow (desktop)
4. **Loading**: Shimmer, CTA disabled
5. **Full**: "Waitlist" CTA if member cap reached
6. **Private**: "Request to Join" CTA

**Interaction Timeline**:
```
User hovers → Border glow (100ms), shadow elevates
User clicks card → Navigate to space board (160ms)
User clicks Join → Button fills gold (100ms), confetti (160ms), navigate to board
User clicks View Board → Navigate immediately (no animation)
```

### SpaceHeader Component (Board View)

**File**: `packages/ui/src/atomic/molecules/space-header.tsx`

**Props Interface**:
```typescript
interface SpaceHeaderProps {
  // Space data
  space: {
    id?: string;
    name: string;
    handle?: string;  // Hidden in UI, available for a11y/tooltips
    iconUrl?: string; // Optional monogram fallback
    category?: string;
  };

  // Stats
  memberCount: number;
  onlineCount?: number;

  // User state
  membershipState: 'not_joined' | 'joined' | 'pending' | 'loading';
  isLeader?: boolean;

  // Interactions
  onJoin?: () => void;
  onLeave?: () => void;
  onSettings?: () => void;

  // Display
  compact?: boolean; // Mobile version
  className?: string;
}
```

**Structure** (Desktop) - **MINIMAL METADATA**:
```
┌─────────────────────────────────────┐
│ [Icon] Chemistry 101                │
│        428 members · 12 online      │  ← NO @handle, NO category badge
│                                     │
│ [Joined ✓] [⋯]                      │  ← Settings in menu, not visible icon
└─────────────────────────────────────┘
```

**States**:
1. **Not Joined**: "Join Space" gold CTA
2. **Joined**: "Joined ✓" gray button
3. **Leader**: [⋯] menu with Settings option
4. **Pending Approval** (Private space): "Request Pending..."
5. **Loading**: Spinner + disabled button while join/leave resolves

**Removed Elements**:
- ❌ @handle - Not needed in header (available in About section)
- ❌ Category badge - Visual clutter, low utility
- ❌ Banner image - Content-first header (moved to About if needed)

### PinnedStack Component (Formerly PinnedCarousel)

**File**: `packages/ui/src/atomic/molecules/pinned-posts-stack.tsx`

**Props Interface**:
```typescript
interface PinnedPostsStackProps {
  // Pinned posts (≤2)
  posts: PinnedPost[];

  // Interactions
  onPostClick?: (postId: string) => void;

  // Leader actions (if needed)
  isLeader?: boolean;
  onUnpin?: (postId: string) => void;
}

interface PinnedPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
}
```

**States**:
1. **Single Pin**: Full width card with gold left border
2. **Two Pins**: Stacked vertically (NOT side-by-side)
3. **Empty**: Hidden (no placeholder)
4. **Leader View**: Unpin option in post menu

**Interaction Timeline**:
```
User clicks pin → Open full post view (160ms)
Leader clicks menu → Unpin option appears
Leader clicks unpin → Confirm modal (240ms), remove pin (160ms fade out)
```

**Key Changes from Carousel**:
- ❌ No horizontal scroll
- ❌ No carousel dots/indicators
- ✅ Simple vertical stack
- ✅ Gold left border = ONLY pin indicator

### SpaceComposer Component

**File**: `packages/ui/src/atomic/organisms/space-composer.tsx`

**Props Interface**:
```typescript
interface SpaceComposerProps {
  // Space context
  spaceId: string;
  spaceName: string;

  // User permissions
  canPost: boolean; // False if not joined or banned

  // Interactions
  onPost: (content: PostSubmission) => void;
  onToolCreate: () => void;
  onEventCreate: () => void;

  // Configuration
  defaultVisibility: 'space' | 'campus';
  allowVisibilityToggle: boolean;
  allowMedia: boolean;
  allowTools: boolean;
  allowEvents: boolean;

  // State
  isSubmitting?: boolean;
  error?: string;

  // Display
  compact?: boolean; // Mobile version
  autoFocus?: boolean;
}

interface PostSubmission {
  content: string;
  mediaUrls?: string[];
  visibility: 'space' | 'campus';
  toolId?: string;
  eventId?: string;
}
```

**States**:
1. **Idle**: Placeholder text, gray border
2. **Focused**: Gold border, actions appear
3. **Typing**: Character count appears (max 2000)
4. **Media Upload**: Progress bar, thumbnail preview
5. **Submitting**: Loading spinner, disabled
6. **Success**: Green checkmark flash (160ms), clear content
7. **Error**: Red border, error message below

**Interaction Timeline**:
```
User clicks composer → Border golds (100ms), actions fade in (160ms)
User types → Character count updates real-time
User uploads image → Progress bar (smooth), thumbnail appears (160ms)
User clicks Post → Button disables, spinner (100ms), submit
Success → Checkmark flash (160ms), clear content, refocus
Error → Shake animation (240ms), error message appears
```

---

## Technical Architecture

### API Endpoints

#### Space Discovery
```typescript
// Get all spaces for campus
GET /api/spaces
Query params:
  - campusId: string (required)
  - category?: 'student_org' | 'residential' | 'academic' | 'interest'
  - search?: string
  - joined?: boolean
  - page?: number
  - limit?: number (default: 24)
Response: {
  spaces: Space[];
  hasMore: boolean;
  total: number;
}

// Get single space detail
GET /api/spaces/:spaceId
Response: Space & {
  leaders: User[];
  recentPosts: Post[];
  activeTools: Tool[];
}

// Join space
POST /api/spaces/:spaceId/join
Response: {
  joined: true;
  membership: SpaceMembership;
}

// Leave space
POST /api/spaces/:spaceId/leave
Response: { left: true }
```

#### Space Board
```typescript
// Get space posts (chronological)
GET /api/spaces/:spaceId/posts
Query params:
  - page?: number
  - limit?: number (default: 20)
Response: {
  posts: Post[];
  pins: Post[]; // ≤2 pinned posts
  hasMore: boolean;
}

// Create post in space
POST /api/spaces/:spaceId/posts
Body: {
  content: string;
  mediaUrls?: string[];
  visibility: 'space' | 'campus';
  toolId?: string;
  eventId?: string;
}
Response: Post

// Get space members
GET /api/spaces/:spaceId/members
Query params:
  - role?: 'leader' | 'member'
  - search?: string
  - page?: number
  - limit?: number (default: 50)
Response: {
  members: User[];
  total: number;
}
```

#### Leader Actions
```typescript
// Pin post
POST /api/spaces/:spaceId/posts/:postId/pin
Response: { pinned: true; expiresAt: Date }

// Unpin post
DELETE /api/spaces/:spaceId/posts/:postId/pin
Response: { unpinned: true }

// Feature tool
POST /api/spaces/:spaceId/tools/:toolId/feature
Response: { featured: true }

// Update space settings
PATCH /api/spaces/:spaceId
Body: {
  name?: string;
  description?: string;
  iconUrl?: string;
  privacy?: 'public' | 'private' | 'hidden';
  memberCap?: number;
}
Response: Space

// Promote member to leader
POST /api/spaces/:spaceId/members/:userId/promote
Response: { role: 'leader' }

// Demote leader to member
POST /api/spaces/:spaceId/members/:userId/demote
Response: { role: 'member' }

// Remove member
DELETE /api/spaces/:spaceId/members/:userId
Response: { removed: true }

// Transfer ownership
POST /api/spaces/:spaceId/transfer
Body: { newOwnerId: string }
Response: { transferred: true }
```

### Database Schema

#### Spaces Collection
```typescript
// Collection: spaces
{
  id: string;
  campusId: string;

  // Basic info
  name: string;
  handle: string; // Unique per campus (e.g., "chem101")
  description: string;
  iconUrl?: string;

  // Category
  category: 'student_org' | 'residential' | 'academic' | 'interest';
  tags: string[]; // For search

  // Privacy
  privacy: 'public' | 'private' | 'hidden';
  memberCap?: number;

  // Stats (denormalized for performance)
  memberCount: number;
  leaderCount: number;
  postCount: number;
  postCountThisWeek: number;

  // Auto-join rules (for onboarding)
  isAutoJoin: boolean;
  autoJoinType?: 'cohort' | 'residential' | 'school';
  autoJoinCriteria?: {
    graduationYear?: number;
    residentialBuilding?: string;
    schoolCode?: string;
  };

  // Creator
  createdBy: string; // User UID (auto-leader)
  createdAt: Date;
  updatedAt: Date;

  // Moderation
  isArchived: boolean;
  archivedAt?: Date;
  archivedBy?: string;
}

// Indexes:
// - (campusId, handle) UNIQUE - Handle uniqueness per campus
// - (campusId, category, memberCount DESC) - Discovery by category
// - (campusId, postCountThisWeek DESC) - Trending spaces
// - (campusId, isAutoJoin, autoJoinType) - Onboarding auto-join
```

#### Space Memberships Subcollection
```typescript
// Subcollection: spaces/{spaceId}/members
{
  userId: string;
  role: 'leader' | 'member';
  joinedAt: Date;
  lastActiveAt: Date;

  // Permissions
  canPost: boolean; // False if banned
  canComment: boolean;

  // Notifications
  notificationsEnabled: boolean;
  lastReadAt: Date; // For unread count
}

// Indexes:
// - (userId, joinedAt DESC) - User's joined spaces
// - (role, joinedAt ASC) - Leaders first, then members
// - (lastActiveAt DESC) - Active members
```

#### Pinned Posts Tracking
```typescript
// Subcollection: spaces/{spaceId}/pins
{
  postId: string;
  pinnedBy: string; // Leader UID
  pinnedAt: Date;
  expiresAt: Date; // Auto-unpin after 7 days
}

// Indexes:
// - (expiresAt ASC) - Cleanup expired pins
// - (pinnedAt DESC) - Chronological order
```

### Security Rules

#### Space Access
```typescript
// Public spaces: Anyone can read
// Private spaces: Only members can read
// Hidden spaces: Only members can read, not discoverable
match /spaces/{spaceId} {
  allow read: if request.auth != null
    && (
      resource.data.privacy == 'public'
      || isMember(spaceId, request.auth.uid)
    );

  allow update: if request.auth != null
    && isLeader(spaceId, request.auth.uid);
}

function isMember(spaceId, userId) {
  return exists(/databases/$(database)/documents/spaces/$(spaceId)/members/$(userId));
}

function isLeader(spaceId, userId) {
  let member = get(/databases/$(database)/documents/spaces/$(spaceId)/members/$(userId));
  return member.data.role == 'leader';
}
```

#### Posting Permissions
```typescript
// Only members can post to space
match /spaces/{spaceId}/posts/{postId} {
  allow create: if request.auth != null
    && isMember(spaceId, request.auth.uid)
    && canPost(spaceId, request.auth.uid);

  allow update, delete: if request.auth.uid == resource.data.authorId
    || isLeader(spaceId, request.auth.uid);
}

function canPost(spaceId, userId) {
  let member = get(/databases/$(database)/documents/spaces/$(spaceId)/members/$(userId));
  return member.data.canPost == true;
}
```

#### Pin Permissions
```typescript
// Only leaders can pin/unpin
match /spaces/{spaceId}/pins/{pinId} {
  allow create, delete: if request.auth != null
    && isLeader(spaceId, request.auth.uid)
    && (
      // Max 2 pins
      get(/databases/$(database)/documents/spaces/$(spaceId)).data.pinCount < 2
      || request.method == 'delete'
    );
}
```

---

## Performance & Analytics

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Space Board Load** | < 1.5s | High-frequency surface |
| **Discovery Grid Load** | < 2.0s | More data, acceptable delay |
| **Join Space Action** | < 500ms | Must feel instant |
| **Composer Interaction** | < 100ms | Typing must be smooth |
| **Pin/Unpin Action** | < 300ms | Leader workflow |
| **Member List Load** | < 1.0s | Sheet overlay |

### Optimization Strategies

#### 1. Space List Virtualization
```typescript
// Only render visible cards in discovery grid
import { useVirtualizer } from '@tanstack/react-virtual';

const gridVirtualizer = useVirtualizer({
  count: spaces.length,
  getScrollElement: () => gridRef.current,
  estimateSize: () => 200, // Card height
  horizontal: false,
  overscan: 3,
});
```

#### 2. Denormalized Stats
```typescript
// Update memberCount in space doc on join/leave
// Avoids counting subcollection members on every query
const spaceRef = doc(db, 'spaces', spaceId);
await updateDoc(spaceRef, {
  memberCount: increment(1),
  postCountThisWeek: increment(1), // Updated daily via cron
});
```

#### 3. Cached Member Avatars
```typescript
// Cache top 48 member avatars in space doc
{
  topMemberAvatars: string[]; // Updated on join/post
}

// Render rail widget without subcollection query
```

### Analytics Events

#### Discovery
```typescript
trackEvent('spaces_discovery_view', {
  filter: category,
  searchQuery?: string,
});

trackEvent('space_card_click', {
  spaceId,
  category,
  source: 'discovery' | 'search',
});

trackEvent('space_join', {
  spaceId,
  source: 'discovery' | 'board' | 'auto-join',
});

trackEvent('space_leave', { spaceId, daysAsMember });
```

#### Board Engagement
```typescript
trackEvent('space_board_view', {
  spaceId,
  isLeader,
});

trackEvent('space_post_create', {
  spaceId,
  visibility: 'space' | 'campus',
  hasMedia: boolean,
  hasToolId: boolean,
  hasEventId: boolean,
});

trackEvent('pinned_post_view', {
  postId,
  spaceId,
  position: 1 | 2,
});
```

#### Leader Actions
```typescript
trackEvent('post_pinned', {
  spaceId,
  postId,
  existingPinCount: 0 | 1,
});

trackEvent('post_unpinned', {
  spaceId,
  postId,
  reason: 'manual' | 'expired',
});

trackEvent('member_promoted', { spaceId, userId });
trackEvent('member_demoted', { spaceId, userId });
trackEvent('member_removed', { spaceId, userId });

trackEvent('space_settings_updated', {
  spaceId,
  changedFields: string[],
});
```

### Success Metrics (KPIs)

#### Discovery Metrics
- **Space Join Rate**: % of discovery views → joins
- **Search Effectiveness**: % of searches → joins
- **Category Distribution**: Join rate by category
- **Time to First Join**: Seconds from discovery view → join

#### Engagement Metrics
- **Posts per Space per Week**: Average content creation rate
- **Member Activity Rate**: % of members who post/comment in 7d
- **Leader Retention**: % of leaders active in 30d
- **Pin Utilization**: % of spaces using ≥1 pin

#### Retention Metrics
- **Space Retention**: % of joined spaces visited in 7d/30d
- **Leave Rate**: % of members who leave per week
- **Inactive Spaces**: Spaces with 0 posts in 30d

---

## Testing Strategy

### Unit Tests

#### SpaceCard Component
```typescript
describe('SpaceCard', () => {
  test('renders space info correctly', () => {
    render(<SpaceCard space={mockSpace} />);
    expect(screen.getByText(mockSpace.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockSpace.handle}`)).toBeInTheDocument();
  });

  test('shows Join CTA when not joined', () => {
    render(<SpaceCard isJoined={false} />);
    expect(screen.getByText('Join Space')).toBeInTheDocument();
  });

  test('shows Joined state when joined', () => {
    render(<SpaceCard isJoined={true} />);
    expect(screen.getByText(/Joined/i)).toBeInTheDocument();
  });

  test('handles join interaction', async () => {
    const onJoin = jest.fn();
    render(<SpaceCard isJoined={false} onJoin={onJoin} />);

    fireEvent.click(screen.getByText('Join Space'));
    expect(onJoin).toHaveBeenCalled();
  });
});
```

#### SpaceComposer Component
```typescript
describe('SpaceComposer', () => {
  test('renders composer for space', () => {
    render(<SpaceComposer spaceId="123" spaceName="Chemistry" />);
    expect(screen.getByPlaceholderText(/What's happening/i)).toBeInTheDocument();
  });

  test('shows visibility toggle', () => {
    render(<SpaceComposer allowVisibilityToggle={true} />);
    expect(screen.getByText(/Promote to Campus/i)).toBeInTheDocument();
  });

  test('handles post submission', async () => {
    const onPost = jest.fn();
    render(<SpaceComposer onPost={onPost} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Test post' },
    });
    fireEvent.click(screen.getByText('Post'));

    await waitFor(() => {
      expect(onPost).toHaveBeenCalledWith({
        content: 'Test post',
        visibility: 'space',
      });
    });
  });
});
```

### Integration Tests

#### Space Join Flow
```typescript
describe('Space Join Flow', () => {
  test('joins space from discovery', async () => {
    render(<SpaceDiscovery />);

    // Find a space card
    const spaceCard = await screen.findByText('Chemistry 101');
    expect(spaceCard).toBeInTheDocument();

    // Click join button
    fireEvent.click(screen.getByText('Join Space'));

    // Should show joined state
    await waitFor(() => {
      expect(screen.getByText(/Joined/i)).toBeInTheDocument();
    });

    // Navigate to board
    fireEvent.click(screen.getByText('View Board'));

    // Should land on space board
    await waitFor(() => {
      expect(screen.getByText('Chemistry 101')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Post to this space/i)).toBeInTheDocument();
    });
  });
});
```

#### Leader Pin Flow
```typescript
describe('Leader Pin Flow', () => {
  test('pins and unpins posts', async () => {
    render(<SpaceBoard spaceId="123" isLeader={true} />);

    // Click Pin Post dropdown
    fireEvent.click(screen.getByText('Pin Post'));

    // Select a post to pin
    const recentPost = await screen.findByText('Important announcement');
    fireEvent.click(recentPost);

    // Should appear in pinned carousel
    await waitFor(() => {
      const pinnedCarousel = screen.getByTestId('pinned-carousel');
      expect(within(pinnedCarousel).getByText('Important announcement')).toBeInTheDocument();
    });

    // Unpin
    const unpinButton = within(screen.getByTestId('pinned-carousel')).getByLabelText('Unpin');
    fireEvent.click(unpinButton);

    // Confirm unpin
    fireEvent.click(screen.getByText('Confirm'));

    // Should remove from carousel
    await waitFor(() => {
      expect(screen.queryByTestId('pinned-carousel')).not.toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

#### Space Discovery Flow
```typescript
test('student discovers and joins space', async ({ page }) => {
  await loginAsStudent(page);
  await page.goto('/spaces');

  // Should see discovery grid
  await expect(page.locator('[data-testid="space-card"]').first()).toBeVisible();

  // Filter by category
  await page.click('text=Academic');
  await expect(page.locator('[data-testid="filter-chip"][data-active="true"]')).toContainText('Academic');

  // Search for space
  await page.fill('[placeholder="Search spaces..."]', 'Chemistry');
  await page.waitForTimeout(300); // Debounce

  // Should show matching space
  await expect(page.locator('text=Chemistry 101')).toBeVisible();

  // Join space
  await page.click('text=Join Space');

  // Should show joined state
  await expect(page.locator('text=Joined')).toBeVisible();

  // Navigate to board
  await page.click('text=View Board');

  // Should land on space board
  await expect(page).toHaveURL(/\/spaces\/[a-z0-9]+/);
  await expect(page.locator('text=Chemistry 101')).toBeVisible();
});
```

#### Leader Management Flow
```typescript
test('leader manages space and members', async ({ page }) => {
  await loginAsLeader(page);
  await page.goto('/spaces/chem101');

  // Should see leader toolbar
  await expect(page.locator('[data-testid="leader-toolbar"]')).toBeVisible();

  // Open space settings
  await page.click('[aria-label="Space Settings"]');

  // Should open settings sheet
  await expect(page.locator('[data-testid="settings-sheet"]')).toBeVisible();

  // Update space description
  await page.fill('[name="description"]', 'Updated description for Chemistry 101');
  await page.click('text=Save Changes');

  // Should show success
  await expect(page.locator('text=Settings saved')).toBeVisible();

  // Open member management
  await page.click('text=Manage Members');

  // Should see member list
  await expect(page.locator('[data-testid="member-list"]')).toBeVisible();

  // Promote a member
  const memberRow = page.locator('[data-username="alex_k"]');
  await memberRow.locator('text=Promote to Leader').click();

  // Confirm promotion
  await page.click('text=Confirm');

  // Should show updated role
  await expect(memberRow.locator('text=Leader')).toBeVisible();
});
```

---

## Appendix: Quick Reference

### Space Types (Auto-Join)
- **Class Cohort**: Graduation year → "Class of 202X"
- **Residential**: Housing assignment (building level) → "Ellicott - Red Jacket"
- **Major**: Declared major (NOT school) → "Computer Science Majors"

### Leader Permissions
- Pin/unpin posts (≤2)
- Feature tools in rail (≤3)
- Remove posts/comments
- Promote/demote leaders
- Edit space settings
- Transfer ownership
- Archive space

### Constraints
- **≤2 pins** per space at a time
- **≤3 featured tools** in rail widget
- **≤20 spaces** per student
- **Pins expire** after 7 days (auto-unpin)

### Performance Budgets
- Space board load: < 1.5s
- Discovery grid load: < 2.0s
- Join action: < 500ms
- Composer typing: < 100ms

---

**Remember**: Spaces are where coordination happens. Feed is for discovery, Spaces are for action.
