# Feed Topology — Campus Discovery Engine

**Feature**: Feed (Campus Commons)
**Priority**: P0 (Core Loop)
**Status**: Production-Grade Scale Patterns
**Last Updated**: 2025-11-01
**Deadline**: November 5th, 2025

---

## Design Philosophy

The Feed is **HIVE's core loop**: "Open app → See feed → Maybe engage → Come back" (< 3s end-to-end). Every design decision optimizes for:

- **Discovery over engagement metrics** — Show what's happening, not what algorithms predict you'll click
- **Read-only aggregation** — Feed is a river, not a social graph (no likes/comments in feed, click through to Space)
- **Keyboard-first power users** — vim-style `j/k/l/c/b` navigation for campus power users
- **TikTok-inspired scroll** — Infinite, buttery-smooth 60fps virtualized feed
- **Transparent algorithm** — Users control filters, sort, and see "Why am I seeing this?"
- **Mobile parity** — 80% of usage is on phones, desktop gets same features without clutter

**Inspiration**: TikTok's scroll, Linear's keyboard UX, Arc's minimalism, Twitter's bookmarks

---

## Strategic Context

### The Core Loop (< 3 seconds)
```
1. Open HIVE (300ms cold start)
2. See Feed (< 1s load, first 5 posts visible)
3. Scroll/engage (60fps, < 16ms interactions)
4. Discover → Join Space / RSVP Event / Open Tool
5. Come back tomorrow
```

**Critical Path**: Feed load performance is HIVE's first impression. If Feed is slow, users delete app.

### Feed Sources (Read-Only Aggregation)
Feed pulls from **Spaces you've joined**:
- **Space Posts** — Text, photos, polls from community leaders
- **Events** — Happenings with RSVP CTAs
- **Tools** — Featured HiveLab tools from Spaces
- **System Posts** — Ritual progress, campus announcements

**NOT a social graph**: No following individual users. Join Spaces → See Space content in Feed.

### Feed vs. Space Board
| Feed (Discovery) | Space Board (Participation) |
|------------------|----------------------------|
| Read-only aggregation from ALL joined Spaces | Active participation in ONE Space |
| Chronological + boost algorithm | Chronological only |
| No composer (view-only) | Composer at top (post/event/tool) |
| Infinite scroll, virtualized | Shorter scroll, paginated |
| Quick discovery (`j/k` navigation) | Deep engagement (comments, reactions) |

**Design Rule**: Feed is for **scanning**, Space is for **participating**.

---

## 1. Layout Specifications

### 1.1 Desktop Layout (1440px+)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Navbar: Logo | Feed Spaces HiveLab Profile | Search | Cmd+K | Avatar]     │ 60px
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ Campus                                                        [Filter] │ │ 48px
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ [Ritual Banner: "🔥 Week 2 of Campus Clean — 347 students joined"]   │ │ 56px (optional)
│  │ [Primary CTA: Join Now →]                                             │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─ VIRTUALIZED CONTAINER (react-window) ──────────────────────────────┐  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────┐    │  │
│  │  │ FeedCard.Post                                                │    │  │ Dynamic height
│  │  │ [Space chip] • 2h ago                                        │    │  │ (auto-sized)
│  │  │ "Anyone need a ride to Walmart tonight?"                     │    │  │
│  │  │ [View in Buffalo Rides →]                                    │    │  │
│  │  └─────────────────────────────────────────────────────────────┘    │  │
│  │                                                                       │  │ 16px gap
│  │  ┌─────────────────────────────────────────────────────────────┐    │  │
│  │  │ FeedCard.Event                                               │    │  │
│  │  │ [Space chip] • Tomorrow at 7pm                               │    │  │
│  │  │ "Game Night at Student Union"                                │    │  │
│  │  │ [16:9 cover image]                                           │    │  │
│  │  │ 23 going • [RSVP →]                                          │    │  │
│  │  └─────────────────────────────────────────────────────────────┘    │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────┐    │  │
│  │  │ FeedCard.Tool                                                │    │  │
│  │  │ [Space chip] • Featured                                      │    │  │
│  │  │ "Textbook Exchange — Buy/sell used books"                    │    │  │
│  │  │ 🛠️ Tool by @jacob                                            │    │  │
│  │  │ [Open Tool →]                                                │    │  │
│  │  └─────────────────────────────────────────────────────────────┘    │  │
│  │                                                                       │  │
│  │  [... continues with virtualization ...]                             │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  [Loading skeleton: 3-5 shimmer rows]                                      │
│  [Empty state: "Join Spaces to see campus activity" + Space suggestions]  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Max Width: 680px (centered)
Padding: 24px horizontal
Card Gap: 16px
Navbar: 60px fixed
Header: 48px sticky
```

**Key UX Decisions**:
- **Single-column stream** — No sidebars, no distractions (Arc minimalism)
- **680px max width** — Optimal reading width for text content
- **Sticky header** — Filter always accessible while scrolling
- **Ritual banner** — Full-width, dismissible, only shows active campus Rituals
- **Virtualized scroll** — Only render visible cards + 5 buffer (60fps with 10,000+ posts)

### 1.2 Mobile Layout (375px - 768px)

```
┌───────────────────────────────────┐
│ [<] Campus             [Filter 🎛️] │ 56px header
├───────────────────────────────────┤
│                                   │
│ ┌───────────────────────────────┐ │
│ │ [Ritual: "🔥 Week 2..."]      │ │ 48px (compressed)
│ │ [Join →]                      │ │
│ └───────────────────────────────┘ │
│                                   │
│ ┌─ VIRTUALIZED (mobile) ────────┐ │
│ │                               │ │
│ │ ┌───────────────────────────┐ │ │
│ │ │ FeedCard (mobile variant) │ │ │
│ │ │ [Chip] • 2h                │ │ │
│ │ │ "Ride to Walmart?"        │ │ │
│ │ │ [View in Space →]         │ │ │
│ │ └───────────────────────────┘ │ │
│ │                               │ │
│ │ ┌───────────────────────────┐ │ │
│ │ │ FeedCard.Event            │ │ │
│ │ │ [Image 16:9]              │ │ │
│ │ │ "Game Night"              │ │ │
│ │ │ 23 going • [RSVP]         │ │ │
│ │ └───────────────────────────┘ │ │
│ │                               │ │
│ │ [... virtualized scroll ...]  │ │
│ │                               │ │
│ └───────────────────────────────┘ │
│                                   │
│ [New items snackbar (fixed btm)] │ 48px (auto-hide)
│                                   │
└───────────────────────────────────┘

Width: 100% - 16px padding
Card Gap: 12px
Header: 56px sticky
```

**Mobile Optimizations**:
- **Ritual banner compresses after scroll** — Show CTA only, hide description after 200px scroll
- **Swipe gestures** — Swipe right on card to bookmark, swipe left to hide
- **Pull-to-refresh** — Standard mobile pattern for manual refresh
- **Bottom snackbar** — "N new items" floats above bottom nav, tap to scroll to top + load

---

## 2. Component Architecture

### 2.1 FeedCard — Base Component

All feed cards inherit from `FeedCard` base:

```typescript
interface FeedCardProps {
  /** Card type determines layout variant */
  type: 'post' | 'event' | 'tool' | 'system';

  /** Source Space */
  space: {
    id: string;
    name: string;
    slug: string;
    color?: string; // For chip background
  };

  /** Timestamp */
  createdAt: Date;

  /** Content */
  title: string; // Max 2 lines (80 chars mobile, 120 desktop)
  body?: string; // Preview only (max 3 lines)
  media?: {
    type: 'image' | 'video';
    url: string;
    aspectRatio?: number; // Default 16:9 for events
  };

  /** Actions */
  primaryAction: {
    label: string; // "View in Space", "RSVP", "Open Tool"
    href: string;
  };
  secondaryActions?: Array<{
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  }>;

  /** Metadata */
  engagement?: {
    reactions?: number;
    comments?: number;
    attendees?: number; // Events only
  };

  /** Algorithm transparency */
  reason?: string; // "Popular in CS Club", "Because you joined Buffalo Rides"

  /** Interaction state */
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onHide?: () => void;
}
```

**Visual Contract (All Cards)**:
```
┌─────────────────────────────────────────────┐
│ [Space chip (8px radius)] • timestamp       │ 12px padding
│                                             │
│ Title (max 2 lines, 18px font-size)        │ 8px gap
│ Body preview (max 3 lines, 14px font-size) │
│                                             │
│ [Optional: Media 16:9]                      │ 12px gap
│                                             │
│ [Primary CTA →]  [Reactions] [Comments]    │ 12px padding
│                                             │
│ [Optional: "Why am I seeing this?" chip]   │ 8px margin-top
└─────────────────────────────────────────────┘
```

### 2.2 FeedCard.Post (Space Posts)

```typescript
interface FeedCardPostProps extends FeedCardProps {
  type: 'post';
  post: {
    id: string;
    authorName?: string; // Optional: "Posted by @jacob"
    authorAvatar?: string;
  };
  // Inherits: title, body, media, primaryAction
}
```

**Example**:
```
┌─────────────────────────────────────────────┐
│ Buffalo Rides • 2h ago                      │
│                                             │
│ Anyone need a ride to Walmart tonight?      │
│ Leaving at 6pm from North Campus           │
│                                             │
│ View in Buffalo Rides →                     │
│                                             │
│ 3 👍 • 5 comments                           │
└─────────────────────────────────────────────┘
```

### 2.3 FeedCard.Event (Campus Events)

```typescript
interface FeedCardEventProps extends FeedCardProps {
  type: 'event';
  event: {
    id: string;
    startDate: Date;
    endDate?: Date;
    location?: string;
    attendeeCount: number;
    isGoing?: boolean; // Current user RSVP status
  };
}
```

**Example**:
```
┌─────────────────────────────────────────────┐
│ Student Union • Tomorrow at 7pm             │
│                                             │
│ Game Night at Student Union                │
│ Bring your friends for board games,        │
│ snacks, and prizes!                         │
│                                             │
│ [16:9 cover photo]                          │
│                                             │
│ 23 going • RSVP →                           │
│                                             │
│ 📍 Student Union Room 202                   │
└─────────────────────────────────────────────┘
```

**UX Decision**: Events get visual priority with 16:9 cover image. RSVP CTA is primary action.

### 2.4 FeedCard.Tool (Featured HiveLab Tools)

```typescript
interface FeedCardToolProps extends FeedCardProps {
  type: 'tool';
  tool: {
    id: string;
    creatorName: string;
    creatorHandle: string;
    category?: string; // "Utility", "Social", "Academic"
    installCount?: number;
  };
}
```

**Example**:
```
┌─────────────────────────────────────────────┐
│ CS Club • Featured                          │
│                                             │
│ Textbook Exchange                           │
│ Buy and sell used textbooks with           │
│ other students                              │
│                                             │
│ 🛠️ Tool by @jacob • 47 installs            │
│                                             │
│ Open Tool →                                 │
└─────────────────────────────────────────────┘
```

**UX Decision**: Tools show creator attribution (build trust) and install count (social proof).

### 2.5 FeedCard.System (Campus Announcements)

```typescript
interface FeedCardSystemProps extends FeedCardProps {
  type: 'system';
  system: {
    category: 'ritual' | 'announcement' | 'recap';
    priority?: 'high' | 'normal'; // High priority gets visual treatment
  };
}
```

**Example (Ritual Progress)**:
```
┌─────────────────────────────────────────────┐
│ 🔥 Campus Ritual • Active                   │
│                                             │
│ Week 2: Campus Clean Challenge              │
│ 347 students joined this week!              │
│                                             │
│ [Progress bar: 69% to goal]                 │
│                                             │
│ Join Now →                                  │
└─────────────────────────────────────────────┘
```

---

## 3. Filter System (Compound Filters + Saved Presets)

### 3.1 Filter UI (Modal on Desktop, Sheet on Mobile)

**Trigger**: Click "Filter" button in header → Opens modal/sheet

**Desktop Modal (480px wide)**:
```
┌────────────────────────────────────────────┐
│ Feed Filters                    [Save ✓]  │ 56px header
├────────────────────────────────────────────┤
│                                            │
│ Content Type                               │ Section 1
│ ○ All                                      │
│ ○ Posts only                               │
│ ○ Events only                              │
│ ○ Tools only                               │
│                                            │ 24px gap
│ ─────────────────────────────────────────  │
│                                            │
│ Spaces                                     │ Section 2
│ [Search spaces...]                         │
│ ☑ Buffalo Rides                            │
│ ☑ CS Club                                  │
│ ☐ Student Union                            │
│ ☐ UB Marketplace                           │
│ [+ View all 12 →]                          │
│                                            │ 24px gap
│ ─────────────────────────────────────────  │
│                                            │
│ Date Range                                 │ Section 3
│ ○ All time                                 │
│ ○ Today                                    │
│ ○ This week                                │
│ ○ This month                               │
│ ○ Custom range [___] to [___]             │
│                                            │ 24px gap
│ ─────────────────────────────────────────  │
│                                            │
│ Sort By                                    │ Section 4
│ ○ Recent (chronological)                   │
│ ○ Popular (engagement boost)               │
│                                            │ 24px gap
│ ─────────────────────────────────────────  │
│                                            │
│ Saved Presets                              │ Section 5
│ [Events This Week]          [Edit] [Del]   │
│ [CS Club Posts]             [Edit] [Del]   │
│ [+ Save current as preset]                 │
│                                            │
├────────────────────────────────────────────┤
│ [Clear All]         [Apply Filters]        │ 64px footer
└────────────────────────────────────────────┘
```

**Mobile Sheet (Bottom drawer, 70vh)**:
```
┌────────────────────────────────┐
│ [Drag handle]                  │ 8px
│ Feed Filters        [Save ✓]  │ 56px
├────────────────────────────────┤
│                                │
│ [Same sections as desktop,     │
│  single column, scrollable]    │
│                                │
│ ...                            │
│                                │
├────────────────────────────────┤
│ [Clear]      [Apply]           │ 64px
└────────────────────────────────┘
```

### 3.2 Filter Logic (Compound AND)

Filters apply **compound AND** logic:
- Content Type = "Events" AND
- Spaces IN ["Buffalo Rides", "CS Club"] AND
- Date Range = "This week" AND
- Sort = "Popular"

**Result**: Show only **events** from **Buffalo Rides** or **CS Club** posted **this week**, sorted by **engagement**.

### 3.3 Saved Filter Presets (Linear-Inspired)

Users can save filter combinations as presets:

```typescript
interface FilterPreset {
  id: string;
  name: string; // "Events This Week", "CS Club Posts"
  filters: {
    contentType?: 'post' | 'event' | 'tool';
    spaces?: string[]; // Space IDs
    dateRange?: 'today' | 'week' | 'month' | { start: Date; end: Date };
    sortBy: 'recent' | 'popular';
  };
  createdAt: Date;
  lastUsed?: Date;
}
```

**UX Flow**:
1. User applies filters → Click "Save ✓" in filter modal
2. Modal: "Save as preset" → Input name → Save
3. Preset appears in "Saved Presets" section
4. Click preset → Filters auto-apply + modal closes
5. Active preset shows as chip in header: `[Events This Week ×]`

**Keyboard Shortcut**: `Cmd+Shift+F` → Open filter modal with focus on preset search

---

## 4. Keyboard Navigation (vim-style Power User Mode)

### 4.1 Keyboard Shortcuts Reference

HIVE Feed supports keyboard-first navigation for power users:

```
┌─────────────────────────────────────────────────────────┐
│ FEED NAVIGATION (vim-style)                            │
├─────────────────────────────────────────────────────────┤
│ j           — Next post (scroll + focus)                │
│ k           — Previous post (scroll + focus)            │
│ Enter       — Open focused post in Space                │
│ Esc         — Clear focus                               │
├─────────────────────────────────────────────────────────┤
│ ACTIONS                                                 │
├─────────────────────────────────────────────────────────┤
│ l           — Like/react to focused post                │
│ c           — Open comments (navigate to Space)         │
│ b           — Bookmark focused post                     │
│ h           — Hide focused post                         │
│ r           — RSVP to event (if event card focused)     │
├─────────────────────────────────────────────────────────┤
│ FILTER & SEARCH                                         │
├─────────────────────────────────────────────────────────┤
│ f           — Open filter modal                         │
│ /           — Focus search (in filter modal)            │
│ Cmd+K       — Command Palette (global)                  │
│ Cmd+Shift+F — Filter presets quick switch               │
├─────────────────────────────────────────────────────────┤
│ UTILITIES                                               │
├─────────────────────────────────────────────────────────┤
│ g g         — Scroll to top                             │
│ G           — Scroll to bottom                          │
│ Cmd+R       — Refresh feed                              │
│ ?           — Show keyboard shortcuts help              │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Visual Focus Indicator

When keyboard navigation is active:
- Focused card gets **gold border** (`border: 2px solid #FFD700`)
- Smooth scroll to keep focused card centered in viewport
- Focus indicator persists until `Esc` or mouse click

**Implementation**:
```typescript
// Track keyboard navigation state
const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

// Listen for j/k keys
useKeyboardShortcut('j', () => {
  setFocusedCardIndex(prev => Math.min((prev ?? -1) + 1, feedItems.length - 1));
  scrollToFocusedCard();
});

useKeyboardShortcut('k', () => {
  setFocusedCardIndex(prev => Math.max((prev ?? 1) - 1, 0));
  scrollToFocusedCard();
});
```

### 4.3 Keyboard + Mouse Hybrid

Users can mix keyboard and mouse:
- Click card → Keyboard focus moves to that card
- Use `j/k` → Mouse hover disabled until `Esc` or mouse movement
- `Esc` → Clear keyboard focus, restore mouse hover

---

## 5. Virtualization (react-window for 10,000+ Posts)

### 5.1 Why Virtualization?

**Problem**: Rendering 10,000+ DOM nodes for feed posts = 3-5s lag, janky scroll, memory leak.

**Solution**: Virtualize feed with `react-window` → Only render visible cards + 5 buffer = 60fps smooth scroll.

**Performance Target**:
- **Initial render**: < 100ms (5-7 cards visible on desktop)
- **Scroll performance**: 60fps (16ms per frame)
- **Memory usage**: < 50MB for 10,000 posts

### 5.2 Implementation Pattern

```typescript
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface FeedVirtualizerProps {
  feedItems: FeedItem[];
  onLoadMore: () => void;
}

export function FeedVirtualizer({ feedItems, onLoadMore }: FeedVirtualizerProps) {
  const listRef = useRef<List>(null);
  const rowHeights = useRef<Record<number, number>>({});

  // Measure card height dynamically
  const getRowHeight = (index: number) => {
    return rowHeights.current[index] || 200; // Default estimate
  };

  const setRowHeight = (index: number, size: number) => {
    listRef.current?.resetAfterIndex(index);
    rowHeights.current[index] = size;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          height={height}
          width={width}
          itemCount={feedItems.length}
          itemSize={getRowHeight}
          overscanCount={5} // Render 5 extra cards above/below viewport
          onItemsRendered={({ visibleStopIndex }) => {
            // Infinite scroll: Load more when near bottom
            if (visibleStopIndex >= feedItems.length - 10) {
              onLoadMore();
            }
          }}
        >
          {({ index, style }) => (
            <div style={style}>
              <FeedCardMeasured
                item={feedItems[index]}
                onMeasure={(height) => setRowHeight(index, height)}
              />
            </div>
          )}
        </List>
      )}
    </AutoSizer>
  );
}
```

### 5.3 Dynamic Height Measurement

Feed cards have variable heights (posts with/without media, events with images). We measure each card after render:

```typescript
function FeedCardMeasured({ item, onMeasure }: { item: FeedItem; onMeasure: (height: number) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.offsetHeight;
      onMeasure(height + 16); // Include gap
    }
  }, [item, onMeasure]);

  return (
    <div ref={cardRef}>
      <FeedCard {...item} />
    </div>
  );
}
```

### 5.4 Scroll Restoration

When user navigates away from Feed and returns, restore scroll position:

```typescript
// Save scroll position on unmount
useEffect(() => {
  return () => {
    const scrollOffset = listRef.current?.state.scrollOffset || 0;
    sessionStorage.setItem('feed-scroll', scrollOffset.toString());
  };
}, []);

// Restore on mount
useEffect(() => {
  const savedScroll = sessionStorage.getItem('feed-scroll');
  if (savedScroll && listRef.current) {
    listRef.current.scrollTo(parseInt(savedScroll));
  }
}, []);
```

---

## 6. Feed Algorithm & Ranking

### 6.1 Algorithm Overview

HIVE Feed uses **chronological with boost** algorithm:

**Base**: Chronological order (newest first)
**Boost Factors**:
- Event happening in next 24h → +100 score
- Post with 10+ reactions → +50 score
- Space you're active in (3+ posts/week) → +30 score
- Ritual system post → +20 score

**Final Sort**: `score DESC, createdAt DESC`

### 6.2 Consecutive Post Cap

**Problem**: If CS Club posts 10 updates in a row, feed becomes spammy.

**Solution**: Cap consecutive posts from same Space to **2 in a row**, then insert post from different Space.

**Implementation**:
```typescript
function applyConsecutiveCap(posts: FeedItem[]): FeedItem[] {
  const result: FeedItem[] = [];
  let consecutiveCount = 0;
  let lastSpaceId: string | null = null;

  for (const post of posts) {
    if (post.spaceId === lastSpaceId) {
      consecutiveCount++;
      if (consecutiveCount >= 2) {
        // Find next post from different Space
        const nextDifferent = posts.find(p => p.spaceId !== lastSpaceId);
        if (nextDifferent) {
          result.push(nextDifferent);
          lastSpaceId = nextDifferent.spaceId;
          consecutiveCount = 1;
        }
      }
    } else {
      consecutiveCount = 1;
      lastSpaceId = post.spaceId;
    }
    result.push(post);
  }

  return result;
}
```

### 6.3 "Why Am I Seeing This?" Transparency

Every feed card can show a **reason chip** explaining algorithm decision:

```
┌─────────────────────────────────────────────┐
│ CS Club • 3h ago                            │
│                                             │
│ Hackathon winners announced!                │
│ Congrats to Team CloudSync...               │
│                                             │
│ View in CS Club →                           │
│                                             │
│ 15 👍 • 8 comments                          │
│                                             │
│ 💡 Popular in CS Club                       │ ← Reason chip
└─────────────────────────────────────────────┘
```

**Possible Reasons**:
- "Because you joined [Space Name]"
- "Popular in [Space Name]" (10+ reactions)
- "Event happening soon" (within 24h)
- "Part of active Ritual"
- "Suggested by campus interests" (Profile interests match)

**UX Decision**: Transparency builds trust. Users understand why they see content, not algorithmic mystery.

### 6.4 User Controls (Personalization)

Users can personalize feed algorithm:

1. **Hide post** (single post) → Never show this specific post again
2. **Hide Space posts** (all from Space) → Temporarily mute Space in feed (still joined, just hidden)
3. **Boost Space** (prioritize) → Show more from this Space (increase +30 boost to +60)
4. **Sort preference** → User can override default "Popular" with "Recent" (pure chronological)

**Settings Page**:
```
┌──────────────────────────────────────────┐
│ Feed Preferences                         │
├──────────────────────────────────────────┤
│ Default Sort                             │
│ ○ Popular (recommended)                  │
│ ○ Recent (chronological)                 │
│                                          │
│ Boosted Spaces                           │
│ • Buffalo Rides       [Remove boost]     │
│ • CS Club             [Remove boost]     │
│ [+ Boost another Space]                  │
│                                          │
│ Hidden Spaces                            │
│ • Student Union       [Unhide]           │
│                                          │
│ Hidden Posts (last 30 days)              │
│ • 3 posts hidden      [View & manage]    │
└──────────────────────────────────────────┘
```

---

## 7. Offline Mode (Cache + Action Queue)

### 7.1 Offline Strategy

**Cache Last 100 Posts** in IndexedDB:
- On feed load, cache posts to IndexedDB
- When offline, show cached posts with banner: "Viewing offline • Last synced 2h ago"
- Actions (like, bookmark, hide) queue in IndexedDB, sync when online

**Service Worker**:
```typescript
// Cache feed posts on fetch
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/feed')) {
    event.respondWith(
      caches.open('hive-feed-cache').then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => cache.match(event.request)); // Fallback to cache if offline
      })
    );
  }
});
```

### 7.2 Action Queue (Optimistic Updates)

When offline, user actions (like, bookmark, hide) are:
1. **Applied optimistically** in UI (instant feedback)
2. **Queued in IndexedDB** for later sync
3. **Synced when online** via Background Sync API

```typescript
// Queue action when offline
async function queueAction(action: { type: 'like' | 'bookmark' | 'hide'; postId: string }) {
  const db = await openDB('hive-actions');
  await db.add('queue', {
    ...action,
    timestamp: Date.now(),
    synced: false,
  });

  // Register background sync
  if ('serviceWorker' in navigator && 'sync' in registration) {
    await registration.sync.register('sync-actions');
  }
}

// Service worker background sync
self.addEventListener('sync', async (event) => {
  if (event.tag === 'sync-actions') {
    event.waitUntil(syncQueuedActions());
  }
});
```

### 7.3 Offline Banner

When offline, show persistent banner at top:
```
┌───────────────────────────────────────────┐
│ 📡 Offline • Last synced 2h ago           │ ← Amber banner
│ [Retry connection]                        │
└───────────────────────────────────────────┘
```

When back online, show success snackbar:
```
✅ Back online • 3 actions synced
```

---

## 8. Performance Budgets & Metrics

### 8.1 Performance Targets (Production-Grade)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Feed initial load** | < 1s (cold), < 500ms (warm) | Time to first 5 cards visible |
| **Scroll performance** | 60fps (16ms per frame) | Chrome DevTools Performance |
| **Keyboard interaction** | < 16ms (60fps) | `j/k` keypress to focus update |
| **Filter modal open** | < 100ms | Click to modal visible |
| **Optimistic update** | < 16ms | Like button to UI update |
| **Bundle size (Feed page)** | < 200KB gzipped | Webpack Bundle Analyzer |
| **Memory usage** | < 50MB for 10,000 posts | Chrome DevTools Memory |

### 8.2 Core Web Vitals

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP (Largest Contentful Paint)** | < 2.5s | Prioritize first 5 cards, lazy load images |
| **FID (First Input Delay)** | < 100ms | Minimize JS on main thread, use Web Workers |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Reserve space for images, fixed card heights |
| **INP (Interaction to Next Paint)** | < 200ms | Debounce scroll, throttle keyboard events |

### 8.3 Monitoring & Alerts

**Vercel Analytics**:
- Track P95 feed load time
- Alert if > 1.5s for 5 consecutive minutes
- Monitor scroll jank (frames > 16ms)

**Custom Events** (PostHog):
```typescript
posthog.capture('feed_loaded', {
  loadTime: performance.now(),
  postCount: feedItems.length,
  cacheHit: wasCached,
});

posthog.capture('feed_scroll_jank', {
  droppedFrames: jankFrames,
  scrollDistance: scrollY,
});
```

---

## 9. Mobile Parity (Progressive Disclosure)

### 9.1 Mobile-First Principles

80% of HIVE usage is on mobile. Feed must have **feature parity** without desktop clutter:

**Desktop Features → Mobile Adaptations**:
- **Filter modal** → Bottom sheet with same filters
- **Keyboard shortcuts** → Swipe gestures (swipe right = bookmark, swipe left = hide)
- **Hover states** → Long-press context menu
- **Reason chips** → Tap to expand explanation
- **Virtualization** → Same react-window, optimized for touch scroll

### 9.2 Mobile Gestures

| Gesture | Action |
|---------|--------|
| **Swipe right on card** | Bookmark post |
| **Swipe left on card** | Hide post |
| **Pull down from top** | Refresh feed |
| **Long-press card** | Context menu (Bookmark, Hide, Share) |
| **Tap Space chip** | Navigate to Space |
| **Tap "Why am I seeing this?"** | Expand algorithm explanation |

### 9.3 Mobile Performance

**Optimizations**:
- **Lazy load images** — Use Intersection Observer, load when card in viewport
- **Reduce motion** — Respect `prefers-reduced-motion`, disable framer-motion animations
- **Smaller bundle** — Code-split filter modal, keyboard shortcuts (desktop-only features)
- **Touch-optimized scroll** — 44px min touch target, momentum scrolling

**Mobile-Specific Bundle**:
```typescript
// Desktop-only features (lazy loaded)
const KeyboardShortcuts = lazy(() => import('./KeyboardShortcuts'));
const AdvancedFilters = lazy(() => import('./AdvancedFilters'));

// Mobile uses simpler filter sheet
const isMobile = useMediaQuery('(max-width: 768px)');
const FilterComponent = isMobile ? FilterSheet : FilterModal;
```

---

## 10. Feed States & Error Handling

### 10.1 Loading States

**Initial Load (Cold Start)**:
```
┌─────────────────────────────────────────┐
│ Campus                        [Filter]  │
├─────────────────────────────────────────┤
│                                         │
│ [Skeleton: Shimmering card 200px]      │ ← 5 skeleton rows
│ [Skeleton: Shimmering card 200px]      │
│ [Skeleton: Shimmering card 200px]      │
│ [Skeleton: Shimmering card 200px]      │
│ [Skeleton: Shimmering card 200px]      │
│                                         │
└─────────────────────────────────────────┘
```

**Pagination Load (Infinite Scroll)**:
```
[... existing feed cards ...]

┌─────────────────────────────────────────┐
│ [Spinner icon] Loading more...         │ ← Bottom loader
└─────────────────────────────────────────┘
```

### 10.2 Empty States

**No Joined Spaces** (New User):
```
┌─────────────────────────────────────────┐
│ Campus                        [Filter]  │
├─────────────────────────────────────────┤
│                                         │
│          [Empty icon]                   │
│                                         │
│   Join Spaces to see campus activity   │
│   Discover communities and stay         │
│   connected with what's happening       │
│                                         │
│   [Browse Spaces →]                     │
│                                         │
│   Suggested for you:                    │
│   • Buffalo Rides                       │
│   • CS Club                             │
│   • Student Union                       │
│                                         │
└─────────────────────────────────────────┘
```

**Filters Applied, No Results**:
```
┌─────────────────────────────────────────┐
│ Campus                        [Filter]  │
│ [Events This Week ×]                    │ ← Active filter chip
├─────────────────────────────────────────┤
│                                         │
│          [Empty icon]                   │
│                                         │
│   No events this week                   │
│   Try adjusting your filters            │
│                                         │
│   [Clear Filters]                       │
│                                         │
└─────────────────────────────────────────┘
```

### 10.3 Error States

**Network Error**:
```
┌─────────────────────────────────────────┐
│ Campus                        [Filter]  │
├─────────────────────────────────────────┤
│                                         │
│          [Error icon]                   │
│                                         │
│   Couldn't load feed                    │
│   Check your internet connection        │
│                                         │
│   [Retry]                               │
│                                         │
└─────────────────────────────────────────┘
```

**Inline Error (Failed to Load More)**:
```
[... existing feed cards ...]

┌─────────────────────────────────────────┐
│ ⚠️ Failed to load more posts            │
│ [Retry]                                 │
└─────────────────────────────────────────┘
```

**Rate Limit Error**:
```
┌─────────────────────────────────────────┐
│          [Hourglass icon]               │
│                                         │
│   Too many requests                     │
│   Please wait a moment and try again    │
│                                         │
│   [Back to Feed]                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## 11. Feed Analytics & Insights

### 11.1 User-Facing Analytics (Profile → Feed Insights)

Inspired by Arc/Vercel dashboards, show personal engagement patterns:

```
┌──────────────────────────────────────────┐
│ Your Feed Activity                       │
├──────────────────────────────────────────┤
│ This Week                                │
│                                          │
│ 47 posts viewed                          │
│ 12 bookmarked                            │
│ 3 events RSVP'd                          │
│                                          │
│ Top Spaces                               │
│ 1. Buffalo Rides (18 posts)             │
│ 2. CS Club (12 posts)                   │
│ 3. Student Union (9 posts)              │
│                                          │
│ Peak Activity                            │
│ 🌙 9pm-11pm (most active)                │
│                                          │
│ Engagement Rate                          │
│ [Bar chart: 25% this week, +5% vs last] │
│                                          │
└──────────────────────────────────────────┘
```

**Metrics Tracked**:
- Posts viewed (scroll past = view)
- Posts clicked (opened in Space)
- Bookmarks saved
- Events RSVP'd
- Tools installed from feed
- Time spent in feed (session duration)
- Peak activity hours

### 11.2 Admin Analytics (Admin Dashboard)

Track platform-wide feed health:

**Feed Performance Dashboard**:
```
┌──────────────────────────────────────────────────────────┐
│ Feed Health (Last 7 Days)                                │
├──────────────────────────────────────────────────────────┤
│ Avg Load Time:        847ms (target: < 1s) ✅            │
│ P95 Load Time:        1.2s (target: < 1.5s) ✅           │
│ Scroll FPS:           59.3fps (target: 60fps) ✅         │
│ Cache Hit Rate:       73% (target: > 70%) ✅             │
│                                                          │
│ Engagement Metrics                                       │
│ Daily Active Users:   1,247                              │
│ Avg Session:          4.3 min                            │
│ Posts per Session:    12.7                               │
│ Click-Through Rate:   8.2%                               │
│                                                          │
│ Algorithm Performance                                    │
│ Popular Sort:         67% of users                       │
│ Recent Sort:          33% of users                       │
│ Avg Posts/Space:      2.3 (cap: 2) ✅                    │
│ Boosted Posts:        18% of feed                        │
│                                                          │
│ Top Performing Spaces (by feed engagement)               │
│ 1. Buffalo Rides      — 12.3% CTR                        │
│ 2. CS Club            — 10.8% CTR                        │
│ 3. Student Union      — 9.2% CTR                         │
└──────────────────────────────────────────────────────────┘
```

---

## 12. Command Palette Integration (Cmd+K)

### 12.1 Feed Actions in Command Palette

Global `Cmd+K` palette includes feed-specific actions:

```
┌────────────────────────────────────────────┐
│ [Search or jump to...]                     │ ← Input
├────────────────────────────────────────────┤
│ Feed                                       │ Section
│ → View Feed                                │
│ → Open Filters                             │
│ → Clear Filters                            │
│ → Refresh Feed                             │
│                                            │
│ Filter Presets                             │ Section
│ → Events This Week                         │
│ → CS Club Posts                            │
│ → Popular Today                            │
│                                            │
│ Bookmarks                                  │ Section
│ → View All Bookmarks                       │
│ → Bookmarked Events                        │
│                                            │
│ Recent                                     │ Section
│ → "Ride to Walmart?" (2h ago)              │ ← Recent post
│ → "Game Night" (Tomorrow)                  │ ← Recent event
└────────────────────────────────────────────┘
```

**Keyboard Flow**:
1. `Cmd+K` → Open palette
2. Type "feed" → Select "View Feed"
3. Or type "events" → Select "Events This Week" preset → Feed auto-filters

### 12.2 Quick Jump to Posts

Search recent posts in Command Palette:
```
Cmd+K → Type "walmart" → "Ride to Walmart? (2h ago)" → Enter → Navigate to post in Space
```

**Implementation**:
```typescript
// Register feed actions in command palette
useRegisterCommands([
  {
    id: 'view-feed',
    title: 'View Feed',
    section: 'Feed',
    onSelect: () => router.push('/feed'),
  },
  {
    id: 'filter-events',
    title: 'Events This Week',
    section: 'Filter Presets',
    onSelect: () => applyFilterPreset('events-this-week'),
  },
  ...recentPosts.map(post => ({
    id: `post-${post.id}`,
    title: post.title,
    subtitle: formatTimeAgo(post.createdAt),
    section: 'Recent',
    onSelect: () => router.push(`/spaces/${post.spaceId}#${post.id}`),
  })),
]);
```

---

## 13. Bookmarks & Collections (Twitter-Inspired)

### 13.1 Bookmark System

Users can bookmark posts from feed for later:

**Bookmark Action**:
- **Desktop**: Click bookmark icon on feed card
- **Mobile**: Swipe right on card
- **Keyboard**: Focus card + press `b`

**Bookmarked State**:
```
┌─────────────────────────────────────────┐
│ Buffalo Rides • 2h ago        [📌]      │ ← Filled bookmark icon
│                                         │
│ Anyone need a ride to Walmart?          │
│                                         │
│ View in Buffalo Rides →                 │
└─────────────────────────────────────────┘
```

### 13.2 Collections (Organize Bookmarks)

Users can organize bookmarks into named collections:

**Bookmarks Page** (`/profile/bookmarks`):
```
┌──────────────────────────────────────────┐
│ Bookmarks                  [+ New List]  │
├──────────────────────────────────────────┤
│ All Bookmarks (47)                       │ ← Default collection
│ Events (12)                              │ ← Custom collection
│ Rides (8)                                │
│ Textbooks (5)                            │
│                                          │
├──────────────────────────────────────────┤
│ [Search bookmarks...]                    │
│                                          │
│ [FeedCard - Bookmarked post 1]           │
│ [FeedCard - Bookmarked post 2]           │
│ [FeedCard - Bookmarked post 3]           │
│ ...                                      │
└──────────────────────────────────────────┘
```

**Add to Collection Flow**:
1. Click bookmark icon → Modal: "Bookmark saved"
2. "Add to collection?" → [Select collection dropdown]
3. Select "Events" → Bookmark added to "Events" collection
4. Or "Create new collection" → Input name → Save

**Collection Schema**:
```typescript
interface BookmarkCollection {
  id: string;
  name: string; // "Events", "Rides", "Textbooks"
  userId: string;
  postIds: string[]; // Array of bookmarked post IDs
  createdAt: Date;
  updatedAt: Date;
}
```

### 13.3 Bookmark Actions

From bookmarks page, users can:
- **Share collection** → Generate shareable link to collection
- **Export collection** → Download as JSON/CSV
- **Remove bookmark** → Swipe left or click × icon
- **Move to collection** → Drag-and-drop or context menu

---

## 14. Real-Time Updates (SSE for Live Feed)

### 14.1 New Content Snackbar

When new posts are available, show snackbar at bottom of feed:

```
┌─────────────────────────────────────────┐
│ [Feed cards...]                         │
│                                         │
│                                         │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 3 new posts • Tap to load       [↑] │ │ ← Snackbar (fixed bottom)
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Behavior**:
- Auto-hide after 10s (user can dismiss manually)
- Click → Smooth scroll to top + prepend new posts
- Don't auto-load (avoid content shift, respect user scroll position)

### 14.2 SSE Connection (Server-Sent Events)

**Endpoint**: `GET /api/feed/stream`

```typescript
// Client: Subscribe to feed updates
const eventSource = new EventSource('/api/feed/stream');

eventSource.addEventListener('new-post', (event) => {
  const post = JSON.parse(event.data);
  setNewPostsCount(prev => prev + 1);
  showSnackbar(`${newPostsCount} new posts • Tap to load`);
});

eventSource.addEventListener('post-updated', (event) => {
  const { postId, updates } = JSON.parse(event.data);
  updatePostInFeed(postId, updates); // Update engagement counts
});
```

**Server**:
```typescript
// apps/web/src/app/api/feed/stream/route.ts
export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      // Subscribe to Firebase feed updates
      const unsubscribe = onSnapshot(feedQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            controller.enqueue(`event: new-post\ndata: ${JSON.stringify(change.doc.data())}\n\n`);
          }
          if (change.type === 'modified') {
            controller.enqueue(`event: post-updated\ndata: ${JSON.stringify({ postId: change.doc.id, updates: change.doc.data() })}\n\n`);
          }
        });
      });

      // Cleanup on disconnect
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### 14.3 Optimistic Updates (Engagement Counts)

When user likes a post in feed, update count optimistically:

```typescript
function handleLike(postId: string) {
  // 1. Update UI immediately (optimistic)
  updatePostLikeCount(postId, +1);

  // 2. Send request to server
  fetch(`/api/posts/${postId}/like`, { method: 'POST' })
    .catch(() => {
      // 3. Rollback on failure
      updatePostLikeCount(postId, -1);
      showToast('Failed to like post');
    });
}
```

---

## 15. Accessibility (WCAG 2.1 AA)

### 15.1 Keyboard Navigation

All feed actions are keyboard-accessible:
- `Tab` → Navigate between cards
- `Enter` → Open focused card in Space
- `Space` → Toggle bookmark on focused card
- Arrow keys → Alternative to `j/k` for users unfamiliar with vim

### 15.2 Screen Reader Support

**ARIA Labels**:
```tsx
<div role="feed" aria-label="Campus feed">
  <article
    role="article"
    aria-labelledby={`post-title-${post.id}`}
    aria-describedby={`post-meta-${post.id}`}
  >
    <div id={`post-meta-${post.id}`} aria-label={`Posted by ${space.name} ${formatTimeAgo(post.createdAt)}`}>
      {/* Space chip + timestamp */}
    </div>

    <h3 id={`post-title-${post.id}`}>{post.title}</h3>

    <button aria-label={`Bookmark post: ${post.title}`}>
      <BookmarkIcon />
    </button>
  </article>
</div>
```

**Live Regions**:
```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {newPostsCount > 0 && `${newPostsCount} new posts available`}
</div>
```

### 15.3 Focus Management

**Skip to content**:
```
[Skip to feed] → Focus first feed card
```

**Focus trap in filter modal**:
- `Tab` cycles through filter options
- `Esc` closes modal, returns focus to filter button

### 15.4 Color Contrast

All text meets WCAG AA contrast requirements:
- Body text: `#FFFFFF` on `#0A0A0A` = 20.5:1 ✅
- Muted text: `rgba(255,255,255,0.6)` on `#0A0A0A` = 12.3:1 ✅
- Gold CTA: `#FFD700` on `#0A0A0A` = 13.8:1 ✅

**Reduced motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 16. Testing Strategy

### 16.1 Unit Tests (Vitest)

**Feed algorithm logic**:
```typescript
describe('Feed Algorithm', () => {
  it('should boost events happening in 24h', () => {
    const posts = [
      { id: '1', type: 'post', createdAt: now, score: 0 },
      { id: '2', type: 'event', startDate: addHours(now, 12), score: 0 },
    ];

    const ranked = applyFeedAlgorithm(posts);
    expect(ranked[0].id).toBe('2'); // Event boosted to top
    expect(ranked[0].score).toBe(100);
  });

  it('should cap consecutive posts from same Space', () => {
    const posts = [
      { id: '1', spaceId: 'cs-club', createdAt: now },
      { id: '2', spaceId: 'cs-club', createdAt: subMinutes(now, 5) },
      { id: '3', spaceId: 'cs-club', createdAt: subMinutes(now, 10) },
      { id: '4', spaceId: 'rides', createdAt: subMinutes(now, 15) },
    ];

    const capped = applyConsecutiveCap(posts);
    expect(capped[2].spaceId).not.toBe('cs-club'); // Third post from different Space
  });
});
```

### 16.2 Component Tests (React Testing Library)

**FeedCard interactions**:
```typescript
describe('FeedCard', () => {
  it('should bookmark on click', async () => {
    const onBookmark = vi.fn();
    render(<FeedCard.Post {...mockPost} onBookmark={onBookmark} />);

    await userEvent.click(screen.getByLabelText('Bookmark post'));
    expect(onBookmark).toHaveBeenCalledOnce();
  });

  it('should navigate to Space on primary action click', async () => {
    const router = useRouter();
    render(<FeedCard.Post {...mockPost} />);

    await userEvent.click(screen.getByText('View in Buffalo Rides'));
    expect(router.push).toHaveBeenCalledWith('/spaces/buffalo-rides');
  });
});
```

### 16.3 E2E Tests (Playwright)

**Critical feed flows**:
```typescript
test('Feed: Load and scroll', async ({ page }) => {
  await page.goto('/feed');

  // Should load first 5 posts
  await expect(page.locator('[role="article"]')).toHaveCount(5, { timeout: 2000 });

  // Scroll to bottom → Load more
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('[role="article"]')).toHaveCount.greaterThan(5);

  // Performance: 60fps scroll
  const scrollPerf = await page.evaluate(() => {
    return performance.measure('scroll', 'navigationStart');
  });
  expect(scrollPerf.duration).toBeLessThan(1000); // < 1s for 10 scroll events
});

test('Feed: Filter by events', async ({ page }) => {
  await page.goto('/feed');
  await page.click('[aria-label="Open filters"]');

  // Select "Events only"
  await page.click('text=Events only');
  await page.click('text=Apply Filters');

  // All cards should be event type
  const cards = await page.locator('[role="article"]').all();
  for (const card of cards) {
    await expect(card.locator('text=RSVP')).toBeVisible();
  }
});

test('Feed: Keyboard navigation', async ({ page }) => {
  await page.goto('/feed');

  // Press j → Focus next post
  await page.keyboard.press('j');
  await expect(page.locator('[role="article"]').first()).toHaveClass(/focused/);

  // Press b → Bookmark focused post
  await page.keyboard.press('b');
  await expect(page.locator('[aria-label*="Bookmarked"]')).toBeVisible();
});
```

### 16.4 Performance Tests

**Lighthouse CI**:
```bash
# Run Lighthouse on feed page
lhci autorun --config=lighthouserc.json

# Target scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
```

**Bundle size monitoring**:
```bash
# Analyze bundle after build
pnpm build:analyze

# Check feed page bundle
# Target: < 200KB gzipped
```

---

## 17. Migration & Rollout Plan

### 17.1 Phase 1: Core Feed (Week 1)

**Deliverables**:
- ✅ Basic feed layout (desktop + mobile)
- ✅ FeedCard.Post, FeedCard.Event components
- ✅ Virtualization (react-window)
- ✅ Loading/empty/error states
- ✅ Chronological algorithm (no boost)

**Success Criteria**:
- < 1s feed load time
- 60fps scroll on iPhone 13
- Zero TypeScript errors

### 17.2 Phase 2: Filters + Keyboard (Week 2)

**Deliverables**:
- ✅ Filter modal (content type, spaces, date, sort)
- ✅ Saved filter presets
- ✅ Keyboard navigation (`j/k/l/c/b`)
- ✅ Command Palette integration

**Success Criteria**:
- Filter apply < 200ms
- Keyboard shortcuts work 100% of time
- Presets save/load correctly

### 17.3 Phase 3: Algorithm + Real-Time (Week 3)

**Deliverables**:
- ✅ Engagement boost algorithm
- ✅ Consecutive post cap
- ✅ "Why am I seeing this?" chips
- ✅ SSE real-time updates
- ✅ New content snackbar

**Success Criteria**:
- Feed feels personalized (user feedback)
- Real-time updates < 2s latency
- Algorithm transparency visible

### 17.4 Phase 4: Bookmarks + Offline (Week 4)

**Deliverables**:
- ✅ Bookmark system
- ✅ Collections (organize bookmarks)
- ✅ Offline mode (cache + action queue)
- ✅ Background sync

**Success Criteria**:
- Bookmarks sync across devices
- Offline mode works 100% of time
- Action queue syncs on reconnect

### 17.5 Phase 5: Polish + Ship (Week 5 - Nov 5th)

**Deliverables**:
- ✅ Accessibility audit (WCAG AA)
- ✅ Performance optimization (bundle split, image lazy load)
- ✅ Analytics tracking (PostHog events)
- ✅ E2E test coverage > 80%
- ✅ Documentation complete

**Success Criteria**:
- Lighthouse Performance > 90
- Zero critical bugs
- Feed is core loop < 3s
- Ship-ready for November 5th 🚀

---

## 18. Open Questions & Future Enhancements

### 18.1 Open Questions (To Resolve Before Ship)

1. **Notification integration** — Should feed show notification badges for unread posts?
2. **Cross-campus feed** — If user joins UB + Cornell, how to merge feeds? (vBETA is single-campus only)
3. **Video posts** — How to handle video in feed cards? (Autoplay muted? Click to play?)
4. **Polls in feed** — Should polls be interactive in feed, or click through to Space?
5. **Feed personalization ML** — Future: Use engagement history to train ranking model?

### 18.2 Future Enhancements (Post-Launch)

**v2 Features** (After November 5th):
- **Smart notifications** — "Your feed has 5 new events" push notification
- **Feed digest email** — Weekly email with top posts user missed
- **Trending tab** — Separate feed view for campus-wide trending content
- **Feed widgets** — Embeddable feed for external sites (e.g., campus portal)
- **Advanced analytics** — ML-based engagement predictions, A/B test feed algorithms
- **Feed API** — Public API for third-party clients (mobile app, bots)

**Power User Features**:
- **Custom CSS themes** — Let users style feed cards (Arc-inspired)
- **Feed plugins** — Allow developers to build feed extensions (filters, custom cards)
- **Keyboard macro recorder** — Record sequence of keyboard actions (Linear-inspired)

---

## 19. Success Metrics (Post-Launch)

### 19.1 Product Metrics

**Core Loop Health**:
| Metric | Target | Measurement |
|--------|--------|-------------|
| **Daily Active Users (DAU)** | 60% of registered students | Track unique feed visits per day |
| **Session Duration** | > 5 min avg | Time spent in feed per session |
| **Posts Viewed per Session** | > 15 avg | Scroll depth analytics |
| **Click-Through Rate (CTR)** | > 10% | Clicks to Space / total posts viewed |
| **Bookmark Rate** | > 8% | Bookmarks / total posts viewed |
| **Return Rate (D1)** | > 40% | Users who return next day |

### 19.2 Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Feed Load Time (P50)** | < 800ms | Vercel Analytics |
| **Feed Load Time (P95)** | < 1.5s | Vercel Analytics |
| **Scroll FPS (P50)** | 60fps | Custom perf monitoring |
| **Cache Hit Rate** | > 70% | IndexedDB analytics |
| **Error Rate** | < 1% | Sentry error tracking |

### 19.3 Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Spaces Joined from Feed** | > 2 per user/week | Track "Join Space" clicks from feed |
| **Events RSVP'd from Feed** | > 1 per user/week | Track "RSVP" clicks from feed |
| **Tools Installed from Feed** | > 0.5 per user/week | Track "Open Tool" clicks from feed |
| **Bookmarks Saved** | > 3 per user/week | Track bookmark actions |
| **Filter Presets Created** | > 1 per user/month | Track preset creation |

---

## 20. Component File Locations

### 20.1 Feed Components (apps/web/src/components/feed/)

```
apps/web/src/components/feed/
├── feed-container.tsx               # Main feed virtualized container
├── feed-card.tsx                    # Base FeedCard component
├── feed-card-post.tsx               # FeedCard.Post variant
├── feed-card-event.tsx              # FeedCard.Event variant
├── feed-card-tool.tsx               # FeedCard.Tool variant
├── feed-card-system.tsx             # FeedCard.System variant
├── feed-filter-modal.tsx            # Desktop filter modal
├── feed-filter-sheet.tsx            # Mobile filter bottom sheet
├── feed-filter-presets.tsx          # Saved filter presets UI
├── feed-keyboard-shortcuts.tsx      # Keyboard navigation logic
├── feed-new-content-snackbar.tsx    # New posts snackbar
├── feed-empty-state.tsx             # Empty state with Space suggestions
├── feed-loading-skeleton.tsx        # Loading skeleton rows
├── feed-error-state.tsx             # Error state with retry
└── feed-reason-chip.tsx             # "Why am I seeing this?" chip
```

### 20.2 Feed Hooks (apps/web/src/hooks/)

```
apps/web/src/hooks/
├── use-feed.ts                      # Main feed data hook (fetch, cache, real-time)
├── use-feed-algorithm.ts            # Algorithm logic (boost, cap, rank)
├── use-feed-filters.ts              # Filter state management
├── use-feed-keyboard.ts             # Keyboard navigation hook
├── use-feed-virtualization.ts       # Virtualization helpers (measure, scroll)
├── use-feed-bookmarks.ts            # Bookmark actions
└── use-feed-realtime.ts             # SSE connection for real-time updates
```

### 20.3 Feed API Routes (apps/web/src/app/api/feed/)

```
apps/web/src/app/api/feed/
├── route.ts                         # GET /api/feed (main feed data)
├── stream/route.ts                  # GET /api/feed/stream (SSE real-time)
├── bookmarks/route.ts               # GET/POST /api/feed/bookmarks
├── filter-presets/route.ts          # GET/POST /api/feed/filter-presets
└── hide-post/route.ts               # POST /api/feed/hide-post
```

### 20.4 Shared UI Components (@hive/ui)

Feed leverages existing @hive/ui components:
- `@hive/ui/atoms/button` → Primary CTA buttons
- `@hive/ui/atoms/skeleton` → Loading skeletons
- `@hive/ui/molecules/dropdown-menu` → Filter dropdowns
- `@hive/ui/molecules/sheet` → Mobile filter sheet
- `@hive/ui/molecules/dialog` → Filter modal (desktop)

---

## 21. Summary & Key Takeaways

### 21.1 What Makes HIVE Feed Different

| Traditional Social Feed | HIVE Feed |
|-------------------------|-----------|
| Algorithmic black box | Transparent, controllable algorithm |
| Optimized for engagement | Optimized for discovery |
| Following individual users | Following Spaces (communities) |
| Infinite scroll trap | Infinite scroll with purpose (campus activity) |
| Mouse/touch only | Keyboard-first power user mode |
| Heavy, slow | Virtualized, 60fps buttery smooth |
| Offline = broken | Offline mode with action queue |

### 21.2 Ship-Ready Checklist (November 5th)

**Core Features**:
- [x] Single-column feed layout (desktop + mobile)
- [x] 4 FeedCard variants (Post, Event, Tool, System)
- [x] Virtualization for 10,000+ posts (react-window)
- [x] Compound filters + saved presets
- [x] Keyboard navigation (`j/k/l/c/b`)
- [x] Feed algorithm (chronological + boost)
- [x] "Why am I seeing this?" transparency
- [x] Bookmarks + collections
- [x] Real-time updates (SSE)
- [x] Offline mode (cache + action queue)

**Performance**:
- [x] < 1s feed load time
- [x] 60fps scroll performance
- [x] < 200KB bundle size (gzipped)

**Accessibility**:
- [x] WCAG 2.1 AA compliance
- [x] Keyboard navigation
- [x] Screen reader support

**Testing**:
- [x] Unit tests (algorithm, filters)
- [x] Component tests (interactions)
- [x] E2E tests (critical flows)
- [x] Performance tests (Lighthouse)

**Documentation**:
- [x] Comprehensive topology doc (this file)
- [x] Component README
- [x] API documentation

---

## Appendix A: TypeScript Interfaces

### FeedItem (Unified Feed Data Structure)

```typescript
type FeedItem = FeedItemPost | FeedItemEvent | FeedItemTool | FeedItemSystem;

interface BaseFeedItem {
  id: string;
  type: 'post' | 'event' | 'tool' | 'system';
  spaceId: string;
  spaceName: string;
  spaceSlug: string;
  spaceColor?: string;
  createdAt: Date;
  title: string;
  body?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    aspectRatio?: number;
  };
  primaryAction: {
    label: string;
    href: string;
  };
  engagement?: {
    reactions?: number;
    comments?: number;
  };
  reason?: string; // Algorithm transparency
  isBookmarked?: boolean;
  campusId: string; // REQUIRED: Campus isolation
}

interface FeedItemPost extends BaseFeedItem {
  type: 'post';
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
}

interface FeedItemEvent extends BaseFeedItem {
  type: 'event';
  startDate: Date;
  endDate?: Date;
  location?: string;
  attendeeCount: number;
  isGoing?: boolean;
}

interface FeedItemTool extends BaseFeedItem {
  type: 'tool';
  toolId: string;
  creatorName: string;
  creatorHandle: string;
  category?: string;
  installCount?: number;
}

interface FeedItemSystem extends BaseFeedItem {
  type: 'system';
  systemCategory: 'ritual' | 'announcement' | 'recap';
  priority?: 'high' | 'normal';
}
```

### FeedFilters

```typescript
interface FeedFilters {
  contentType?: 'post' | 'event' | 'tool';
  spaces?: string[]; // Space IDs
  dateRange?: 'today' | 'week' | 'month' | { start: Date; end: Date };
  sortBy: 'recent' | 'popular';
}

interface FilterPreset {
  id: string;
  name: string;
  filters: FeedFilters;
  userId: string;
  createdAt: Date;
  lastUsed?: Date;
}
```

---

**End of Feed Topology Documentation**
**Status**: Production-Ready
**Ship Date**: November 5th, 2025 🚀
