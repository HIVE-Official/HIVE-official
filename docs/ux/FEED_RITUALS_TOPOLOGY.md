# FEED & RITUALS TOPOLOGY
**The Core Loop: Feed Discovery + Campus Campaigns**

> **Design Philosophy**: SF polish meets campus chaos — Production-grade scale from day one
> **Scale Target**: 1 space → 20 spaces, 10 posts/day → 1000+ posts/day without UX degradation
> **Performance**: < 1s feed load, < 16ms scroll (60fps), instant interactions
> **Aesthetic**: Linear/Vercel/Arc/TikTok patterns — Content-first, engagement-optimized
> **Platform**: Web-first (desktop + mobile parity, keyboard-first for power users)

---

## 🚀 Production-Grade Scale Enhancements

> **Upgrade Path**: MVP-ready → Production-ready for heavy usage (20+ spaces, 1000+ posts/day)

**What Changed**: Added 8 comprehensive scale-ready UX patterns inspired by Linear, TikTok, Twitter/X, Arc, and Reddit.

**New Capabilities**:
- ⌨️ **Command Palette** (`Cmd+K`): Instant search across all content, spaces, users — Find anything in < 100ms
- 🔍 **Advanced Filters** (`Cmd+F`): Smart filters by space, type, time, engagement — Power user browsing
- 📚 **Content Collections**: Bookmarks, "Read Later", custom lists — Never lose important posts
- 📊 **Personal Feed Analytics**: Engagement stats, trending topics, content preferences — Data-driven browsing
- ⚡ **Performance Optimization**: Virtualized infinite scroll, optimistic interactions — 60fps with 10,000+ posts
- ⌨️ **Keyboard Navigation**: `j/k` scroll, `l` like, `c` comment, `r` reshare — Zero mouse browsing
- 📴 **Offline Mode**: Cached content, queued actions, seamless sync — Resilient under campus WiFi
- 🎯 **Feed Customization**: Mute spaces, content preferences, notification controls — Personalized experience

**Rituals Scale Features**:
- 🏆 **Ritual History**: Browse past campaigns, achievement tracking — Gamification dashboard
- 🎮 **Progress Tracking**: Personal stats, leaderboards, social proof — Competitive engagement
- 🔧 **Ritual Creator** (Admin): No-code ritual builder — Democratize campaigns
- 🔔 **Smart Reminders**: Context-aware notifications, quiet hours — Respectful engagement

**Impact**:
- Feed load: 3s → 1s (-67% with virtualization + lazy loading)
- Scroll performance: 30fps → 60fps (virtualized list rendering)
- Interaction latency: Instant via optimistic updates (< 16ms perceived)
- Offline resilience: Queue actions, sync on reconnect
- Keyboard-first: Power users can browse/engage without mouse

**Updated Sections**:
- Feed now includes advanced filtering UI with saved searches
- Keyboard shortcuts for all core actions (scroll, like, comment, share)
- Component props extended with scale-ready features (virtualization, offline support)
- Enhanced performance budgets with scale targets
- Comprehensive analytics for content performance tracking

---

## 🚀 Scale-Ready UX Patterns (Production-Grade)

**Philosophy**: Feed must scale from 10 posts/day → 1000+ posts/day without degrading discovery UX. Power users browsing 20+ spaces demand professional-grade filtering and navigation.

### 1. Command Palette (Linear/TikTok Search Pattern)

**Why Essential**: Instant search > Manual scrolling for finding specific content

**Trigger**: `Cmd+K` (Mac) / `Ctrl+K` (Windows) anywhere in Feed

```
┌─────────────────────────────────────────┐
│ 🔍 Search posts, spaces, people...      │
├─────────────────────────────────────────┤
│ → "study group" in All Spaces           │
│ → "textbook" in Chemistry 101           │
│ → @sarah.chen (Switch to profile)       │
│ → #finals (Topic tag)                   │
│                                         │
│ Recent Searches:                        │
│ → "walmart ride"                        │
│ → "CS220 notes"                         │
│                                         │
│ Filters:                                │
│ → Posts only                            │
│ → Events only                           │
│ → Tools only                            │
│ → This week                             │
│                                         │
│ Quick Actions:                          │
│ → New post                         ⌘N   │
│ → My bookmarks                     ⌘B   │
│ → Notifications                    ⌘I   │
└─────────────────────────────────────────┘
```

**Features**:
- **Fuzzy search**: Type "stdy grp" matches "Study Group RSVP"
- **Scoped search**: Search within specific space or across all
- **Type filters**: Posts, Events, Tools, People, Spaces
- **Time filters**: Today, This Week, This Month, All Time
- **Saved searches**: Pin frequent queries for 1-click access
- **Recent searches**: Last 10 searches auto-suggested
- **Search suggestions**: Trending topics, popular tags

**Search Operators** (Advanced):
- `from:chemistry-101` - Posts from specific space
- `type:event` - Filter by content type
- `@sarah.chen` - Posts mentioning user
- `#finals` - Posts with topic tag
- `has:image` - Posts with photos
- `after:2024-10-01` - Date range filtering

---

### 2. Advanced Filtering & Smart Views (Reddit/Twitter Pattern)

**Why Essential**: 20 spaces × 50 posts/day = 1000 posts/day chaos without filtering

**Filter Bar** (Feed top - collapsible):
```
┌─────────────────────────────────────────┐
│ Feed                          ⌘F Filter │
├─────────────────────────────────────────┤
│ [All Spaces ▾] [All Types ▾] [All Time ▾] [More ▾]
│                                         │
│ Active Filters: Chemistry 101, Events   │ ← Clear indicator
│ [× Clear All]                           │
└─────────────────────────────────────────┘
```

**Smart Views** (Sidebar quick filters):
```
📁 SMART VIEWS
  • All (default)
  • Unread only
  • Events this week
  • Active tools (closing soon)
  • Bookmarked
  • From my spaces
  • Mentions (@me)

📁 CUSTOM FILTERS (Saved)
  • CS Study Groups
  • Ride Shares
  • Textbook Sales
```

**Filter Options**:

**By Space**:
- Multi-select: [Chemistry 101] [CS Club] [+3 more]
- Quick toggles: "From my spaces" vs "All campus"

**By Type**:
- Posts (text/photos)
- Events (upcoming only / all)
- Tools (active / all)
- Rituals (current / past)

**By Time**:
- Today
- This Week
- This Month
- Custom date range

**By Engagement** (Power user):
- Trending (>20 upvotes in 24h)
- Unanswered questions (no comments yet)
- Highly discussed (>10 comments)

**Saved Filters**:
```typescript
// User creates custom filter combos
{
  name: "CS Study Groups",
  filters: {
    spaces: ["cs-club", "cs220", "cs320"],
    types: ["post", "event"],
    keywords: ["study", "group", "exam"],
    timeframe: "this_week"
  },
  pinned: true // Shows in sidebar Smart Views
}
```

**Results**:
- Quick filter switching: 1 click to see Events only
- Saved filters reduce repeated configuration
- Power users can create complex filter combos

---

### 3. Content Collections & Bookmarks (Twitter Bookmarks Pattern)

**Why Essential**: Important posts get buried in infinite scroll

**Bookmark Action** (On any post):
```
[Post Card]
  ↑ 42   💬 7   📤 Share   🔖 Save
                            ↑ Bookmark button
```

**Collections UI** (Cmd+B to view):
```
┌─────────────────────────────────────────┐
│ My Bookmarks                      [×]   │
├─────────────────────────────────────────┤
│ 📁 All Bookmarks (47)                   │
│ 📁 Read Later (12)                      │
│ 📁 Study Resources (8)                  │
│ 📁 Events I'm Attending (5)             │
│ 📁 Textbook Marketplace (3)             │
│                                         │
│ [+ New Collection]                      │
├─────────────────────────────────────────┤
│ Sorted by: Recent ▾                     │
│                                         │
│ [Post Card Preview]                     │
│ "CS220 Study Group - Friday 3PM"       │
│ Saved 2h ago • From CS Club             │
│ [Open] [Remove]                         │
│                                         │
│ [Post Card Preview]                     │
│ "Selling Calculus textbook $40"        │
│ Saved Yesterday • From Marketplace      │
│ [Open] [Remove]                         │
│                                         │
│ ...                                     │
└─────────────────────────────────────────┘
```

**Features**:
- **Quick bookmark**: 1-click save from any post
- **Collections**: Organize bookmarks into folders
- **Smart collections**: Auto-collections (Events I RSVP'd, Tools I responded to)
- **Search bookmarks**: Full-text search across saved content
- **Export**: CSV export of bookmarked content
- **Expiration**: Auto-remove outdated bookmarks (events past, tools closed)

**Collection Actions**:
```
Right-click collection → Options:
  • Rename collection
  • Share collection (read-only link)
  • Export as CSV
  • Archive (hide from sidebar)
  • Delete collection
```

---

### 4. Personal Feed Analytics (Arc/Vercel Analytics Pattern)

**Why Essential**: Data-driven browsing optimizes engagement

**Analytics Dashboard** (`/feed/analytics` or Cmd+A):
```
┌─────────────────────────────────────────┐
│ Feed Analytics (Last 30 Days)           │
├─────────────────────────────────────────┤
│ 📊 Your Activity                        │
│   • 342 posts viewed                    │
│   • 47 upvotes given                    │
│   • 23 comments posted                  │
│   • 8 events RSVP'd                     │
│   • 5 tools submitted                   │
│                                         │
│ 🔥 Most Engaged Spaces                  │
│   1. Chemistry 101 (89 interactions)    │
│   2. CS Club (47 interactions)          │
│   3. Ellicott Dorm (32 interactions)    │
│                                         │
│ 📈 Trending Topics (Your Feed)          │
│   • #finals (42 posts)                  │
│   • #study-group (28 posts)             │
│   • #marketplace (19 posts)             │
│                                         │
│ ⏰ Peak Activity Times                  │
│   • 2-4 PM (38% of your engagement)     │
│   • 7-9 PM (27% of your engagement)     │
│                                         │
│ 💡 Recommendations                      │
│   • Join "Physics Study Group" (8 CS majors joined)
│   • Check "Campus Events" (3 events this week)
└─────────────────────────────────────────┘
```

**Content Performance** (For your own posts):
```
Your recent post: "Selling Calculus textbook $40"
  • 127 views
  • 12 upvotes
  • 5 comments
  • 2 DMs received
  • Posted 2d ago in Marketplace

Performance:
  [=====>           ] 38% engagement rate (above average)

Similar posts average: 89 views, 7 upvotes, 3 comments
```

**Privacy**: All analytics are private, only visible to user

---

### 5. Performance Optimization (TikTok Infinite Scroll Pattern)

**Why Essential**: 10,000+ posts = slow scrolling without virtualization

**Virtualized Feed**:
```typescript
// Only render visible posts (10-15 at a time)
<VirtualFeed
  itemCount={posts.length} // Could be 10,000+
  itemSize={variable} // Auto-calculate based on content
  overscanCount={5} // Pre-render 5 above/below viewport
  onEndReached={() => fetchMore()} // Infinite scroll
/>

Results:
- Smooth 60fps scrolling with 10,000+ posts
- Initial load: 3s → 1s (-67%)
- Memory usage: 2GB → 200MB (-90%)
```

**Optimistic Interactions**:
```typescript
// Don't wait for server on upvote/comment
onUpvote(postId) {
  // 1. Update UI immediately (instant feedback)
  updateLocalState(postId, { upvoted: true, upvoteCount: count + 1 })

  // 2. Send to server in background
  api.upvotePost(postId)
    .catch(() => {
      // 3. Rollback on failure + show error toast
      revertLocalState(postId)
      toast.error("Failed to upvote - retrying...")
    })
}

Results:
- Upvote feels instant (< 16ms)
- No blocking spinners
- Graceful failure recovery
```

**Lazy Loading Images**:
```typescript
// Load images as they scroll into view
<LazyImage
  src={post.imageUrl}
  placeholder="blur" // Low-quality preview
  threshold={0.25} // Start loading when 25% visible
  onLoad={() => trackImageLoad()} // Analytics
/>

Results:
- Initial page load: 3s → 1s (only load visible images)
- Smooth scrolling (images load progressively)
- Reduced bandwidth (don't load offscreen images)
```

**Smart Prefetching**:
```typescript
// Prefetch next batch while user scrolls
useEffect(() => {
  if (scrollPosition > 80%) {
    prefetchNextBatch() // Load next 20 posts in background
  }
}, [scrollPosition])

Results:
- "Infinite" scroll feels truly infinite
- No loading spinners mid-scroll
- Seamless UX at any feed depth
```

---

### 6. Keyboard Navigation (Linear/Gmail Pattern)

**Why Essential**: Mouse > Keyboard for power users browsing 100+ posts/day

**Feed Shortcuts**:
| Shortcut | Action | Context |
|----------|--------|---------|
| `j` / `k` | Scroll down/up | Feed (vim-style) |
| `Space` / `Shift+Space` | Page down/up | Feed |
| `l` | Like focused post | Any post |
| `c` | Comment on focused post | Any post |
| `r` | Reshare focused post | Any post |
| `b` | Bookmark focused post | Any post |
| `o` / `Enter` | Open focused post (detail view) | Any post |
| `x` | Expand/collapse focused post | Long posts |
| `m` | Mute space of focused post | Any post |
| `Cmd+F` | Open filters | Feed |
| `Cmd+K` | Open command palette | Anywhere |
| `Cmd+N` | New post (composer) | Feed |
| `Cmd+B` | Open bookmarks | Anywhere |
| `Cmd+A` | Open analytics | Feed |
| `Esc` | Close modal / Clear focus | Anywhere |
| `?` | Show all shortcuts | Anywhere |

**Visual Focus Indicator**:
```css
.post-card.focused {
  border-left: 4px solid var(--gold-start);
  background: rgba(255, 215, 0, 0.05);
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.2);
}
```

**Keyboard Nav UX**:
```
User presses 'j' → Next post gets focus indicator
User presses 'l' → Focused post upvoted (instant visual feedback)
User presses 'c' → Comment composer opens for focused post
User presses 'Esc' → Close composer, return to feed
User presses 'k' → Previous post gets focus
```

**Accessibility**: All keyboard shortcuts also work with screen readers

---

### 7. Offline Mode & Queue (PWA Pattern)

**Why Essential**: Campus WiFi unreliable = lost engagement without offline support

**Offline Detection**:
```typescript
// Detect connection loss
window.addEventListener('offline', () => {
  showOfflineBanner()
  enableOfflineMode()
})

// Detect connection restored
window.addEventListener('online', () => {
  hideOfflineBanner()
  syncQueuedActions()
})
```

**Offline Banner**:
```
┌─────────────────────────────────────────┐
│ 📴 You're offline. Actions will sync    │
│    when connection is restored.         │
│                                         │
│ Queued: 3 upvotes, 1 comment            │
└─────────────────────────────────────────┘
```

**Cached Content** (Service Worker):
```typescript
// Cache last 100 feed posts for offline viewing
cache.put('/feed', {
  posts: last100Posts,
  timestamp: Date.now(),
  expiresIn: 24 * 60 * 60 * 1000 // 24 hours
})

// User can browse cached content while offline
```

**Action Queue** (IndexedDB):
```typescript
// Queue actions while offline
offlineQueue.add({
  type: 'upvote',
  postId: 'abc123',
  timestamp: Date.now(),
  retries: 0
})

// Sync when online
onConnectionRestored(() => {
  offlineQueue.processAll()
    .then(() => toast.success("All actions synced!"))
    .catch(() => toast.warning("Some actions failed to sync"))
})
```

**Offline Limitations** (Graceful Degradation):
- ❌ Can't post new content (requires upload)
- ❌ Can't comment (requires real-time sync)
- ✅ Can upvote (queued for sync)
- ✅ Can bookmark (stored locally)
- ✅ Can browse cached content (last 100 posts)

---

### 8. Feed Customization & Preferences (Twitter Settings Pattern)

**Why Essential**: One-size-fits-all fails at scale — personalization required

**Feed Preferences** (`/settings/feed`):
```
┌─────────────────────────────────────────┐
│ Feed Preferences                        │
├─────────────────────────────────────────┤
│ 🔇 Muted Spaces                         │
│   Hide posts from specific spaces       │
│   [Add Space ▾]                         │
│                                         │
│   Muted:                                │
│   • Campus Memes (Unmute)               │
│   • Random Chatter (Unmute)             │
│                                         │
│ 📊 Content Preferences                  │
│   [✓] Show events in feed               │
│   [✓] Show tools in feed                │
│   [ ] Show ritual updates in feed       │
│   [✓] Show promoted campus posts        │
│                                         │
│ 🔔 Notification Controls                │
│   [✓] New posts from my spaces (daily digest)
│   [ ] Trending posts (push notifications)
│   [✓] Event reminders (24h before)      │
│   [ ] Tool deadlines (1h before close)  │
│                                         │
│ 🎨 Display Options                      │
│   [ ] Compact view (smaller cards)      │
│   [✓] Show full images (vs thumbnails)  │
│   [ ] Auto-play videos                  │
│   [✓] Dark mode (always)                │
│                                         │
│ 🧹 Auto-Cleanup                         │
│   [✓] Hide posts older than 7 days      │
│   [✓] Archive closed tools              │
│   [ ] Hide events I declined            │
└─────────────────────────────────────────┘
```

**Mute Controls**:
- **Mute space**: Hide all posts from specific space (reversible)
- **Mute user**: Hide posts from specific user (with unmute option)
- **Mute topic**: Hide posts containing specific keywords (e.g., "spoilers")
- **Temporary mute**: "Hide for 24 hours" option

**Feed Algorithm Control** (Advanced):
```
⚙️ Algorithm Preferences

[●] Chronological (default)
    Show posts in order posted

[ ] Engagement-boosted
    Popular posts shown first

[ ] Personalized
    AI-ranked based on your interests
```

---

## 🏆 Rituals Scale Features

### 9. Ritual History & Achievements (Gamification Dashboard)

**Why Essential**: Past rituals = social proof + FOMO for future campaigns

**Ritual History Page** (`/rituals/history`):
```
┌─────────────────────────────────────────┐
│ Campus Rituals History                  │
├─────────────────────────────────────────┤
│ 🏆 Your Achievements                    │
│   • 3 rituals completed                 │
│   • Top 10% participation rate          │
│   • 2 badges earned                     │
│                                         │
│ 📅 Past Rituals                         │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ ✅ Welcome Week Challenge         │   │
│ │    Sep 1-7, 2024                  │   │
│ │    847 students · 89% completion  │   │
│ │    You: 5/5 tasks ✓               │   │
│ │    [View Recap]                   │   │
│ └──────────────────────────────────┘   │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ 🌱 Sustainability Sprint          │   │
│ │    Oct 10-17, 2024                │   │
│ │    623 students · 72% completion  │   │
│ │    You: 3/4 tasks (missed 1)      │   │
│ │    [View Recap]                   │   │
│ └──────────────────────────────────┘   │
│                                         │
│ [Load More...]                          │
└─────────────────────────────────────────┘
```

**Achievement Badges**:
```
🏅 Early Adopter: First 100 to join a ritual
🔥 Streak Master: 3 rituals in a row completed
👥 Social Butterfly: Invited 10+ friends to ritual
⚡ Speed Demon: Completed ritual in first 24h
🎯 Perfectionist: 100% completion on 5 rituals
```

---

### 10. Ritual Progress Dashboard (Real-Time Leaderboard)

**Why Essential**: Competition drives engagement

**Progress Tab** (In active ritual):
```
┌─────────────────────────────────────────┐
│ Welcome Week Challenge Progress         │
├─────────────────────────────────────────┤
│ Your Progress: 4/5 tasks ✓              │
│ [Progress bar: 80%]                     │
│                                         │
│ 🏆 Leaderboard (Optional)               │
│   1. Sarah Chen         5/5 ✓           │
│   2. Mike Torres        5/5 ✓           │
│   3. You                4/5 (Next: ...)  │
│   4. Emma Johnson       4/5              │
│   ...847 students total                 │
│                                         │
│ 👥 Your Friends (8 joined)              │
│   [Avatar] Sarah - 5/5 ✓                │
│   [Avatar] Mike - 5/5 ✓                 │
│   [Avatar] Alex - 3/5                   │
│   ...                                   │
│                                         │
│ 📊 Campus Stats                         │
│   • 847 students participating          │
│   • 89% completion rate                 │
│   • Most popular task: Attend event     │
│   • Avg completion time: 4.2 days       │
└─────────────────────────────────────────┘
```

**Privacy Controls**:
```
⚙️ Leaderboard Preferences
[ ] Show me on public leaderboard
[✓] Show me to friends only
[ ] Hide me completely (private mode)
```

**Social Proof Notifications**:
```
🎯 "Sarah just completed Welcome Week Challenge!"
👥 "8 CS majors joined Sustainability Sprint"
🔥 "You're in top 10%! Finish 1 more task to rank higher"
```

---

**Scale Metrics** (Performance Budgets):
- **Feed load**: < 1s (cold start with 1000+ posts via virtualization)
- **Scroll performance**: 60fps maintained with 10,000+ posts
- **Interaction latency**: < 16ms (optimistic updates)
- **Search results**: < 100ms (fuzzy search across 10,000+ posts)
- **Offline cache**: Last 100 posts (24h expiration)
- **Bookmark sync**: < 300ms
- **Keyboard nav**: < 16ms per action

**Optimization Techniques**:
- Virtualized infinite scroll (react-window)
- Lazy loading images (intersection observer)
- Optimistic UI updates for all interactions
- Service worker caching for offline support
- IndexedDB for queued actions
- Debounced search (300ms)
- Memoized post renders (React.memo)

---

## Table of Contents

1. [Strategic Context](#strategic-context)
2. [Scale-Ready UX Patterns](#scale-ready-ux-patterns-production-grade) ⭐ NEW
3. [Design System Foundation](#design-system-foundation)
4. [Feed Architecture](#feed-architecture)
5. [Rituals System](#rituals-system)
6. [Component Specifications](#component-specifications)
7. [Technical Architecture](#technical-architecture)
8. [Performance & Analytics](#performance--analytics)
9. [Testing Strategy](#testing-strategy)

---

## Strategic Context

### The Core Loop
```
Open app → See feed → Maybe engage → Come back
```

**Target**: < 3 seconds end-to-end for this loop to complete.

**Why Feed Matters**:
- **First impression**: 90% of users land here after onboarding
- **Retention driver**: Daily habit formation happens here
- **Distribution engine**: Every post is a potential viral moment
- **Utility proof**: Students see real value (rides, textbooks, events) immediately

### Feed vs. Space Board
| Aspect | Feed (Read-Only Discovery) | Space Board (Participation) |
|--------|---------------------------|----------------------------|
| **Content Source** | Aggregation from all joined spaces | Single space only |
| **Posting** | No (use Composer → pick space) | Yes (default to this space) |
| **Visibility** | Campus-wide promoted posts + space posts | Space-only posts + pins |
| **Algorithm** | Chronological + engagement boost | Strict chronological |
| **Purpose** | Discover, scroll, feel connected | Participate, coordinate, build |

### Rituals Integration
**Rituals** = Campus-wide behavioral campaigns that appear in **S2 Pinned** slot during active phase.

**Examples**:
- "Welcome Week Challenge" - Complete 5 campus activities
- "Sustainability Sprint" - Track recycling/composting habits
- "Study Buddy Blitz" - Form study groups before finals

**Constraints**:
- **1 active ritual** per campus at a time
- Strip visible in S2 Pinned (compressed on mobile scroll)
- Ends with recap post in Feed stream

---

## Design System Foundation

### Color Palette
```css
/* Backgrounds */
--bg-primary: #0A0A0A;           /* Main feed background */
--bg-secondary: #141414;         /* Card base */
--bg-tertiary: #1A1A1A;          /* Elevated cards (pinned) */
--bg-ritual: #1C1408;            /* Ritual strip background (warm tint) */

/* Text */
--text-primary: #FFFFFF;         /* 100% white */
--text-secondary: #A0A0A0;       /* 70% opacity */
--text-tertiary: #707070;        /* 50% opacity */
--text-on-gold: #000000;         /* Black on gold buttons */

/* Gold Accent */
--gold-start: #FFD700;
--gold-end: #FFA500;
--gold-glow: rgba(255, 215, 0, 0.3);
--gold-subtle: rgba(255, 215, 0, 0.1);

/* Glass Morphism */
--glass-bg: rgba(26, 26, 26, 0.9);
--glass-border: rgba(255, 255, 255, 0.05);
--glass-blur: 20px;

/* Semantic Colors */
--success: #10B981;              /* Upvoted, RSVP'd */
--info: #3B82F6;                 /* New badge */
--warn: #F59E0B;                 /* Deadline soon */
--danger: #EF4444;               /* Report, urgent */

/* Borders & Shadows */
--border-subtle: rgba(255, 255, 255, 0.08);
--border-gold: rgba(255, 215, 0, 0.4);
--shadow-card: 0 2px 12px rgba(0, 0, 0, 0.5);
--shadow-elevated: 0 4px 24px rgba(0, 0, 0, 0.6);
--shadow-gold: 0 4px 24px rgba(255, 215, 0, 0.25);
```

### Typography
```css
/* Font Stack */
--font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Menlo', monospace;

/* Type Scale */
--text-display: 28px / 32px;    /* Page title "Feed" */
--text-title: 22px / 26px;      /* Section headers */
--text-heading: 18px / 22px;    /* Card titles, post author */
--text-body: 14px / 20px;       /* Main content */
--text-caption: 12px / 16px;    /* Metadata, timestamps */
--text-micro: 10px / 14px;      /* Badges, labels */

/* Weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Letter Spacing */
--tracking-tight: -0.02em;      /* Display text */
--tracking-normal: 0;           /* Body text */
--tracking-wide: 0.04em;        /* All-caps labels */
```

### Spacing & Radii
```css
/* Spacing (8px grid) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;

/* Border Radii */
--radius-xs: 6px;               /* Badges */
--radius-sm: 10px;              /* Buttons, inputs */
--radius-md: 14px;              /* Cards */
--radius-lg: 22px;              /* Chips, pills */
--radius-xl: 28px;              /* Ritual strip */
--radius-full: 9999px;          /* Avatars, FAB */

/* Elevation */
--elevation-0: none;            /* Flat */
--elevation-1: var(--shadow-card);        /* Cards */
--elevation-2: var(--shadow-elevated);    /* Pinned cards */
--elevation-3: var(--shadow-gold);        /* CTAs */
```

### Motion System
```css
/* Timing */
--motion-instant: 0ms;          /* No animation */
--motion-quick: 100ms;          /* Hover, focus */
--motion-standard: 160ms;       /* Card interactions */
--motion-slow: 240ms;           /* Overlays, sheets */

/* Easing */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);    /* Default */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Subtle bounce */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* Exit */
```

### Accessibility
```css
/* Focus States */
--focus-ring: 0 0 0 3px rgba(255, 215, 0, 0.1);
--focus-border: var(--border-gold);

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Feed Architecture

### Spatial Layout

#### Desktop (1024px+)
```
┌─────────────────────────────────────────────────────┐
│ S0: Shell (collapsible sidebar + top bar)          │
├──────────┬──────────────────────────┬───────────────┤
│          │ S1: Header               │               │
│  Sidebar │ "Feed"                   │   (No Rail)   │
│          │ [Search] [Filter chips]  │               │
│  • Feed  ├──────────────────────────┤               │
│  • Spaces│ S2: Pinned (if ritual)   │   Feed is     │
│  • Me    │ [Ritual Strip]           │   read-only   │
│  • Lab   ├──────────────────────────┤   discovery   │
│  • Notif │ S3: Stream               │               │
│          │ [Post Card]              │   No right    │
│          │ [Event Card]             │   rail on     │
│          │ [Post Card]              │   member      │
│          │ [Tool Card]              │   surfaces    │
│          │ ...infinite scroll       │               │
│          ├──────────────────────────┤               │
│          │ S4: (FAB only)           │               │
│          │ [+ Gold FAB] → Sheet     │               │
└──────────┴──────────────────────────┴───────────────┘
```

#### Mobile (0-767px)
```
┌─────────────────────────────────────┐
│ S0: Top Bar                        │
│ "Feed" [Search icon]               │
├─────────────────────────────────────┤
│ S2: Pinned (compresses on scroll)  │
│ [Ritual Strip - compressed]        │
├─────────────────────────────────────┤
│ S3: Stream (single column)         │
│ [Post Card]                        │
│ [Event Card]                       │
│ [Post Card]                        │
│ [Tool Card]                        │
│ ...infinite scroll                 │
│                                     │
├─────────────────────────────────────┤
│ S4: FAB (bottom-right)             │
│          [+ Gold FAB] → Sheet      │
├─────────────────────────────────────┤
│ Bottom Nav: Feed|Spaces|+|Notif|Me │
└─────────────────────────────────────┘
```

### Content Types in Feed

#### 1. Post Card (Text/Photo)
**Visual Treatment**:
```css
.post-card {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 16px;
  padding: 20px;
  background: var(--bg-secondary);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.post-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: var(--shadow-elevated);
  transform: translateY(-2px);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Avatar] Name • @handle • 2h        │
│          [Space badge] Chemistry    │
├─────────────────────────────────────┤
│ Post content text here (max 2      │
│ lines, then "Read more")            │
│ [Photo if present - 16:9]          │
├─────────────────────────────────────┤
│ [Why chip] "You're in Chemistry"   │
├─────────────────────────────────────┤
│ [↑ 42] [💬 7] [Share]              │
└─────────────────────────────────────┘
```

#### 2. Event Card
**Visual Treatment**:
```css
.event-card {
  /* Inherits .post-card styles */
  border-left: 3px solid var(--gold-start);
}

.event-card .event-time {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-top: 12px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: var(--radius-sm);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--gold-start);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Avatar] Name • @handle • 3h        │
│          [Space badge] Campus Events│
├─────────────────────────────────────┤
│ [📅 Icon] Event Title Here          │
│ Event description (max 2 lines)     │
│ [Event image - 16:9]               │
├─────────────────────────────────────┤
│ [🕐 Tomorrow 7:00 PM]               │
│ [📍 Student Union, Room 201]        │
│ [👥 42 going · 200 capacity]        │
├─────────────────────────────────────┤
│ [Why chip] "Matches: Music"         │
├─────────────────────────────────────┤
│ [RSVP Button - Gold if going]      │
│ [↑ 28] [💬 5] [Share]              │
└─────────────────────────────────────┘
```

#### 3. Tool Card (Poll/Survey)
**Visual Treatment**:
```css
.tool-card {
  /* Inherits .post-card styles */
  border-top: 2px solid rgba(255, 215, 0, 0.2);
}

.tool-card .tool-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tool-chip {
  padding: 4px 10px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-micro);
  font-weight: var(--weight-semibold);
  color: var(--info);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Avatar] Name • @handle • 1h        │
│          [Space badge] Student Govt │
├─────────────────────────────────────┤
│ [POLL] What time works best?        │
│                                     │
│ ○ Monday 3-5 PM       [32%] ████   │
│ ○ Wednesday 7-9 PM    [48%] ██████ │
│ ○ Friday 1-3 PM       [20%] ███    │
│                                     │
│ [🕐 Closes in 2 hours]             │
├─────────────────────────────────────┤
│ [Why chip] "You're in Student Govt" │
├─────────────────────────────────────┤
│ [Vote Button - Gold CTA]           │
│ [↑ 15] [💬 3] [Share]              │
└─────────────────────────────────────┘
```

### Feed Algorithm

**Ranking Formula**:
```
Score = TimeDecay + EngagementBoost + RelevanceBoost

TimeDecay = -1 * (currentTime - postTime) / (1 hour)
EngagementBoost = (upvotes * 2) + (comments * 3) + (shares * 5)
RelevanceBoost =
  - fromJoinedSpace: +10
  - matchesInterest: +5
  - fromConnection: +3
  - campusWidePromoted: +2
```

**Fairness Cap**:
- **≤3 items from same space per page** (20 items/page)
- Ensures diverse content mix
- Prevents single space domination

**Explainability**:
Every card MUST have a "Why am I seeing this?" chip:
- "You're in [Space Name]"
- "Matches your interest: [Interest]"
- "Posted by [Connection Name]"
- "Popular on campus today"

### Infinite Scroll

**Implementation**:
```typescript
// Prefetch next page at 70% scroll
const SCROLL_THRESHOLD = 0.7;
const PAGE_SIZE = 20;

// Intersection Observer for performance
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !isLoading && hasMore) {
      fetchNextPage();
    }
  },
  { threshold: SCROLL_THRESHOLD }
);
```

**Loading States**:
1. **Initial load**: 6 skeleton cards (160ms fade-in stagger)
2. **Scroll load**: "Loading more..." text at bottom (no skeleton spam)
3. **End of feed**: "You're all caught up! 🎉" message

**Skeleton Card**:
```css
.skeleton-card {
  width: 100%;
  max-width: 640px;
  height: 240px;
  margin: 0 auto 16px;
  padding: 20px;
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    var(--bg-secondary) 100%
  );
  background-size: 200% 100%;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## Rituals System

### What Are Rituals?

**Definition**: Campus-wide behavioral campaigns with time-boxed participation windows.

**Purpose**:
- Drive collective action (sustainability, study habits, campus engagement)
- Create shared experiences across all students
- Build HIVE habit loops (daily check-ins)

**Examples**:
1. **Welcome Week Challenge**: Complete 5 campus activities (Aug 28 - Sep 3)
2. **Sustainability Sprint**: Track recycling/composting (Oct 1 - Oct 14)
3. **Study Buddy Blitz**: Form study groups before finals (Dec 1 - Dec 7)

### Ritual Lifecycle

```
Upcoming (7 days before) → Active (during window) → Ended → Recap (auto-post)
```

**Phase Transitions**:
1. **Upcoming**: Strip shows in S2 Pinned with countdown
2. **Active**: Strip becomes interactive (CTA changes to "Join" or "Continue")
3. **Ended**: Strip disappears, recap post appears in Feed stream
4. **Recap**: Shows participation stats, leaderboard (if applicable), thank you message

### Ritual Strip (S2 Pinned)

#### Desktop Visual Treatment
```css
.ritual-strip {
  width: 100%;
  max-width: 640px;
  margin: 0 auto 16px;
  padding: 20px 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.08) 0%,
    rgba(255, 165, 0, 0.08) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 24px rgba(255, 215, 0, 0.15);
  position: sticky;
  top: 80px; /* Below header */
  z-index: 10;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.ritual-strip:hover {
  box-shadow: 0 6px 32px rgba(255, 215, 0, 0.25);
  transform: translateY(-2px);
}
```

#### Structure
```
┌─────────────────────────────────────────────┐
│ [🎯 Icon] Welcome Week Challenge            │
│ Complete 5 campus activities to unlock      │
│ exclusive perks and connect with new        │
│ students. Join 428 others!                  │
│                                             │
│ [Progress: 2/5 ████░░] [⏱️ 3 days left]    │
│                                             │
│ [Join Challenge - Gold CTA] [Snooze]       │
└─────────────────────────────────────────────┘
```

#### Mobile Compressed (on scroll)
```css
.ritual-strip.compressed {
  padding: 12px 16px;
  transform: scale(0.95);
  opacity: 0.9;
}

.ritual-strip.compressed .ritual-description {
  display: none; /* Hide description on compress */
}
```

**Mobile Compressed Structure**:
```
┌─────────────────────────────────────┐
│ [🎯] Challenge · 2/5 · 3 days      │
│ [Join] [×]                          │
└─────────────────────────────────────┘
```

### Ritual Detail Sheet (Z1 Overlay)

**Trigger**: Tap/click anywhere on ritual strip (except snooze/dismiss)

**Visual Treatment**:
```css
.ritual-sheet {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end; /* Slide from bottom */
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  animation: fadeIn var(--motion-slow) var(--ease-smooth);
}

.ritual-sheet-content {
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  padding: 32px;
  background: var(--bg-tertiary);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  animation: slideUp var(--motion-slow) var(--ease-smooth);
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Sheet Structure**:
```
┌─────────────────────────────────────┐
│ [Close × ]                          │
│                                     │
│ [🎯 Large Icon]                     │
│ Welcome Week Challenge              │
│ Aug 28 - Sep 3, 2025               │
│                                     │
│ Your Progress: 2/5 Complete        │
│ [████████░░░░░░] 40%               │
│                                     │
│ Next Task:                          │
│ ☐ Attend a club fair booth         │
│ ☐ Join 3 new spaces                │
│ ☐ Make your first post              │
│ ✓ Upload your profile photo         │
│ ✓ Complete your bio                 │
│                                     │
│ Rewards:                            │
│ • Exclusive "Week 1" badge          │
│ • Priority access to events         │
│ • Featured in campus feed           │
│                                     │
│ 428 students participating          │
│ [See Leaderboard]                   │
│                                     │
│ [Continue Challenge - Gold CTA]     │
│ [Opt Out]                           │
└─────────────────────────────────────┘
```

### Ritual Constraints

1. **One Active Ritual Per Campus**
   - Only 1 ritual can be in "Active" phase at a time
   - Prevents notification fatigue
   - Maintains focus on collective participation

2. **Strip Visibility Rules**
   - **Upcoming**: Appears 7 days before start (soft launch)
   - **Active**: Full interactive strip with progress tracking
   - **Ended**: Strip disappears immediately, recap post appears in Feed
   - **Dismissed**: User can snooze for 24h or dismiss permanently

3. **Participation Tracking**
   ```typescript
   interface RitualParticipation {
     userId: string;
     ritualId: string;
     campusId: string;
     joinedAt: Date;
     progress: {
       current: number;
       total: number;
       completed: boolean;
     };
     tasks: {
       taskId: string;
       completed: boolean;
       completedAt?: Date;
     }[];
     snoozedUntil?: Date;
     dismissed: boolean;
   }
   ```

4. **Auto-Post Recap**
   - Fires when ritual transitions from Active → Ended
   - Posted to Feed by "HIVE Team" system account
   - Shows campus-wide stats, top participants, celebration message

**Recap Post Example**:
```
┌─────────────────────────────────────┐
│ [HIVE icon] HIVE Team • Just now    │
├─────────────────────────────────────┤
│ Welcome Week Challenge - Complete! 🎉│
│                                     │
│ 428 students participated           │
│ 2,140 total tasks completed         │
│ 95% finished all 5 activities       │
│                                     │
│ Top Contributors:                   │
│ 🥇 @sarah_m - 6h completion time    │
│ 🥈 @mike_j - 8h completion time     │
│ 🥉 @alex_k - 9h completion time     │
│                                     │
│ Thanks for making this week amazing!│
│ Next ritual starts Oct 1st 🚀       │
├─────────────────────────────────────┤
│ [↑ 312] [💬 45] [Share]            │
└─────────────────────────────────────┘
```

---

## Component Specifications

### PostCard Component

**File**: `packages/ui/src/atomic/organisms/post-card.tsx`

**Props Interface**:
```typescript
interface PostCardProps {
  // Core data
  post: {
    id: string;
    content: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    createdAt: Date;
    spaceId: string;
    visibility: 'space' | 'campus';
  };

  // Author info
  author: {
    uid: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl?: string;
  };

  // Space badge
  space: {
    id: string;
    name: string;
    icon?: string;
  };

  // Engagement
  upvotes: number;
  commentCount: number;
  hasUpvoted: boolean;

  // Explainability
  whyChip: {
    text: string;
    icon?: string;
  };

  // Interactions
  onUpvote: () => void;
  onComment: () => void;
  onShare: () => void;
  onCardClick: () => void;

  // Display mode
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;

  // Accessibility
  ariaLabel?: string;
}
```

**States**:
1. **Default**: Idle state, no hover
2. **Hover**: Elevated shadow, border glow (desktop only)
3. **Upvoted**: Gold upvote icon, count highlighted
4. **Uploading**: Shimmer animation on media, disabled actions
5. **Error**: Red border, error message overlay
6. **Skeleton**: Loading placeholder during fetch

**Interaction Timeline**:
```
User hovers → Border glow (100ms)
User clicks card → Navigate to detail sheet (160ms slide)
User clicks upvote → Icon fills gold (100ms), count increments
User clicks comment → Open comment sheet (240ms slide)
User clicks share → Copy link, show toast (160ms fade)
```

### EventCard Component

**File**: `packages/ui/src/atomic/organisms/event-card.tsx`

**Props Interface**:
```typescript
interface EventCardProps {
  // Extends PostCardProps
  extends PostCardProps;

  // Event-specific data
  event: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location: string;
    capacity?: number;
    attendeeCount: number;
    imageUrl?: string;
  };

  // RSVP state
  userRSVP: 'going' | 'interested' | 'not_going' | null;
  onRSVP: (status: 'going' | 'interested' | 'not_going') => void;

  // Temporal
  isUpcoming: boolean;
  isLive: boolean;
  isPast: boolean;
  timeUntilStart?: string; // "in 2 hours", "Tomorrow 7 PM"
}
```

**States**:
1. **Upcoming**: Default state, RSVP CTA enabled
2. **Live Now**: Gold "Now" chip, pulsing border, "Check In" CTA
3. **Past**: Grayed out, "Ended" badge, no RSVP
4. **RSVP'd Going**: Gold RSVP button, "You're going" text
5. **Full Capacity**: "Waitlist" CTA if user not RSVP'd
6. **Cancelled**: Red banner, strikethrough title

**Interaction Timeline**:
```
User clicks RSVP → Button fills gold (100ms), "Going" text appears
User clicks event → Open detail sheet with full info (240ms)
Event goes live → Border pulses (1s loop), "Now" chip appears (160ms)
Event ends → Fade to grayscale (240ms), "Ended" badge (160ms)
```

### ToolCard Component

**File**: `packages/ui/src/atomic/organisms/tool-card.tsx`

**Props Interface**:
```typescript
interface ToolCardProps {
  // Extends PostCardProps
  extends PostCardProps;

  // Tool data
  tool: {
    id: string;
    type: 'poll' | 'survey' | 'rsvp' | 'vote' | 'quiz';
    title: string;
    description?: string;
    closeTime: Date;
    maxResponses?: number;
    responseCount: number;
  };

  // User interaction
  hasResponded: boolean;
  userResponse?: any;
  onRespond: () => void;

  // Results visibility
  showResults: boolean; // Show after user responds or poll closes
  results?: {
    options: {
      text: string;
      count: number;
      percentage: number;
    }[];
  };

  // Temporal
  isOpen: boolean;
  isClosed: boolean;
  timeUntilClose?: string;
}
```

**States**:
1. **Open**: CTA enabled, "Vote Now" / "Take Survey" button
2. **Responded**: Gold checkmark, "You voted" text, results visible
3. **Closing Soon**: Orange countdown chip, "Closes in 2 hours"
4. **Closed**: Grayed out, "Closed" badge, final results
5. **Full**: "Max responses reached" if applicable
6. **Loading Results**: Skeleton bars during result fetch

**Interaction Timeline**:
```
User clicks CTA → Open tool sheet (240ms slide)
User submits → Checkmark animation (160ms), results fade in (240ms)
Tool closes → Countdown animates to 0 (100ms tick), "Closed" badge (160ms)
```

### RitualStrip Component

**File**: `packages/ui/src/atomic/organisms/ritual-strip.tsx`

**Props Interface**:
```typescript
interface RitualStripProps {
  // Ritual data
  ritual: {
    id: string;
    title: string;
    description: string;
    icon: string; // Emoji or icon name
    startDate: Date;
    endDate: Date;
    totalTasks: number;
  };

  // User progress
  userProgress: {
    current: number;
    total: number;
    completed: boolean;
  };

  // State
  phase: 'upcoming' | 'active' | 'ended';
  timeRemaining?: string; // "3 days left", "Ends in 2 hours"
  participantCount: number;

  // Interactions
  onJoin: () => void;
  onContinue: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
  onStripClick: () => void; // Opens detail sheet

  // Display
  isCompressed: boolean; // Mobile scroll state
  isSnoozed: boolean;
  isDismissed: boolean;
}
```

**States**:
1. **Default Expanded**: Full content visible, sticky position
2. **Compressed**: Mobile scroll state, description hidden
3. **Hover**: Elevated shadow, border glow (desktop)
4. **Joined**: Progress bar visible, "Continue" CTA
5. **Completed**: Gold confetti burst, "Completed!" badge
6. **Snoozed**: Hidden until snooze expires
7. **Dismissed**: Permanently hidden (stored in user prefs)
8. **Upcoming**: Countdown only, "Join" CTA disabled with tooltip

**Interaction Timeline**:
```
Strip appears on scroll → Slide down (240ms), fade in (160ms)
User scrolls down → Compress animation (160ms scale + fade)
User clicks Join → Button fills gold (100ms), progress bar appears (240ms)
User clicks Snooze → Fade out (160ms), remove from DOM
User completes ritual → Confetti burst (240ms), gold flash (160ms)
```

### Composer FAB (Floating Action Button)

**File**: `packages/ui/src/atomic/atoms/composer-fab.tsx`

**Visual Treatment**:
```css
.composer-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border: none;
  border-radius: var(--radius-full);
  box-shadow: 0 4px 24px rgba(255, 215, 0, 0.4);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
  z-index: 100;
}

.composer-fab:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 32px rgba(255, 215, 0, 0.6);
}

.composer-fab:active {
  transform: translateY(-2px) scale(1.0);
}

.composer-fab-icon {
  width: 28px;
  height: 28px;
  color: #000;
  transition: transform var(--motion-quick) var(--ease-smooth);
}

.composer-fab:hover .composer-fab-icon {
  transform: rotate(90deg);
}
```

**States**:
1. **Default**: Idle, pulsing shadow (subtle)
2. **Hover**: Lift + glow, icon rotates 90°
3. **Active**: Scale down slightly
4. **Sheet Open**: Icon changes to X, rotates 45°
5. **Mobile**: Positioned above bottom nav (88px from bottom)

**Interaction Timeline**:
```
User hovers → Lift (100ms), glow intensifies, icon rotates (160ms)
User clicks → Sheet slides up (240ms), FAB icon → X (160ms rotate)
User closes sheet → Sheet slides down (240ms), X → + (160ms rotate)
```

---

## Technical Architecture

### API Endpoints

#### Feed Endpoints
```typescript
// Get feed with pagination
GET /api/feed
Query params:
  - page: number (default: 1)
  - limit: number (default: 20, max: 50)
  - filter?: 'all' | 'my-spaces' | 'campus-wide'
Response: {
  posts: Post[];
  hasMore: boolean;
  nextPage: number;
}

// Get single post detail
GET /api/posts/:postId
Response: Post & { comments: Comment[] }

// Upvote/downvote post
POST /api/posts/:postId/upvote
Body: { action: 'upvote' | 'remove' }
Response: { upvotes: number; hasUpvoted: boolean }

// Add comment
POST /api/posts/:postId/comments
Body: { content: string; parentId?: string }
Response: Comment

// Share post
POST /api/posts/:postId/share
Body: { platform?: 'native' | 'twitter' | 'instagram' }
Response: { shareUrl: string }
```

#### Ritual Endpoints
```typescript
// Get active ritual for campus
GET /api/rituals/active
Response: Ritual | null

// Join ritual
POST /api/rituals/:ritualId/join
Response: { participation: RitualParticipation }

// Update task completion
POST /api/rituals/:ritualId/tasks/:taskId/complete
Response: {
  participation: RitualParticipation;
  completed: boolean;
}

// Snooze ritual
POST /api/rituals/:ritualId/snooze
Body: { duration: '1h' | '24h' | 'week' }
Response: { snoozedUntil: Date }

// Dismiss ritual
POST /api/rituals/:ritualId/dismiss
Response: { dismissed: true }

// Get ritual leaderboard
GET /api/rituals/:ritualId/leaderboard
Query params:
  - limit: number (default: 10)
Response: {
  topParticipants: {
    user: User;
    completionTime: number;
    rank: number;
  }[];
}
```

#### Event Endpoints
```typescript
// RSVP to event
POST /api/events/:eventId/rsvp
Body: { status: 'going' | 'interested' | 'not_going' }
Response: {
  rsvp: EventRSVP;
  attendeeCount: number;
}

// Check in to event (live events only)
POST /api/events/:eventId/check-in
Body: { location?: GeoCoordinates }
Response: { checkedIn: true; timestamp: Date }

// Get event attendees
GET /api/events/:eventId/attendees
Query params:
  - status?: 'going' | 'interested'
Response: {
  attendees: User[];
  total: number;
}
```

#### Tool Endpoints
```typescript
// Submit tool response
POST /api/tools/:toolId/respond
Body: { responses: Record<string, any> }
Response: {
  submitted: true;
  results?: ToolResults; // If showResults enabled
}

// Get tool results
GET /api/tools/:toolId/results
Response: ToolResults
```

### Database Schema

#### Feed Posts Collection
```typescript
// Collection: posts
{
  id: string; // Auto-generated
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';

  // Author
  authorId: string; // User UID
  authorName: string; // Denormalized
  authorUsername: string; // Denormalized
  authorAvatar?: string; // Denormalized

  // Space
  spaceId: string;
  spaceName: string; // Denormalized
  spaceIcon?: string; // Denormalized

  // Visibility
  visibility: 'space' | 'campus';
  campusId: string; // Always 'ub-buffalo' for vBETA

  // Type detection
  type: 'post' | 'event' | 'tool';
  eventId?: string; // If type === 'event'
  toolId?: string; // If type === 'tool'

  // Engagement
  upvotes: number;
  commentCount: number;
  shareCount: number;

  // Algorithm
  engagementScore: number; // Calculated on write
  createdAt: Date;
  updatedAt: Date;

  // Moderation
  flagCount: number;
  isHidden: boolean;
  moderatedAt?: Date;
  moderatedBy?: string;
}

// Indexes:
// - (campusId, visibility, createdAt DESC) - Feed query
// - (spaceId, createdAt DESC) - Space board query
// - (authorId, createdAt DESC) - Profile posts
// - (campusId, engagementScore DESC) - Trending
```

#### Rituals Collection
```typescript
// Collection: rituals
{
  id: string;
  campusId: string;

  // Content
  title: string;
  description: string;
  icon: string; // Emoji
  imageUrl?: string;

  // Timing
  startDate: Date;
  endDate: Date;
  phase: 'upcoming' | 'active' | 'ended';

  // Tasks
  tasks: {
    id: string;
    title: string;
    description?: string;
    type: 'manual' | 'auto'; // Manual = user clicks, Auto = system detects
    criteria?: any; // For auto tasks
  }[];

  // Rewards
  rewards: {
    type: 'badge' | 'priority' | 'feature';
    title: string;
    description: string;
  }[];

  // Stats
  participantCount: number;
  completionCount: number;
  totalTasksCompleted: number;

  // Admin
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Subcollection: rituals/{ritualId}/participants
{
  userId: string;
  joinedAt: Date;
  progress: {
    current: number;
    total: number;
    completed: boolean;
    completedAt?: Date;
  };
  tasks: {
    taskId: string;
    completed: boolean;
    completedAt?: Date;
  }[];
  snoozedUntil?: Date;
  dismissed: boolean;
  dismissedAt?: Date;
}

// Indexes:
// - (campusId, phase, startDate ASC) - Active ritual query
// - (userId, completedAt DESC) - User ritual history
```

#### Events Collection
```typescript
// Collection: events
{
  id: string;
  campusId: string;
  spaceId: string;

  // Content
  title: string;
  description: string;
  imageUrl?: string;

  // Timing
  startTime: Date;
  endTime: Date;
  isAllDay: boolean;

  // Location
  location: string;
  buildingCode?: string; // e.g., "SU" for Student Union
  roomNumber?: string;
  geoCoordinates?: GeoPoint;

  // Capacity
  capacity?: number;
  attendeeCount: number; // Denormalized
  interestedCount: number; // Denormalized

  // State
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  checkInEnabled: boolean;

  // Creator
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Subcollection: events/{eventId}/rsvps
{
  userId: string;
  status: 'going' | 'interested' | 'not_going';
  rsvpedAt: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
}

// Indexes:
// - (campusId, spaceId, startTime ASC) - Space events
// - (campusId, status, startTime ASC) - Upcoming events
// - (userId, startTime DESC) - User events
```

#### Tools Collection
```typescript
// Collection: tools
{
  id: string;
  campusId: string;
  spaceId: string;

  // Type
  type: 'poll' | 'survey' | 'vote' | 'quiz' | 'rsvp';
  title: string;
  description?: string;

  // Timing
  openTime: Date;
  closeTime: Date;
  isOpen: boolean; // Calculated field

  // Configuration
  elements: {
    id: string;
    type: ElementType;
    label: string;
    required: boolean;
    options?: string[]; // For radio/checkbox/select
    validation?: any;
  }[];

  maxResponses?: number;
  allowMultipleResponses: boolean;
  showResultsAfterSubmit: boolean;

  // Stats
  responseCount: number;
  viewCount: number;

  // Creator
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Subcollection: tools/{toolId}/responses
{
  userId: string;
  responses: Record<string, any>; // elementId → value
  submittedAt: Date;
}

// Indexes:
// - (campusId, spaceId, closeTime DESC) - Space tools
// - (campusId, isOpen, closeTime ASC) - Open tools
```

### Security Rules

#### Campus Isolation
```typescript
// ALL queries must filter by campusId
match /posts/{postId} {
  allow read: if request.auth != null
    && resource.data.campusId == request.auth.token.campusId;

  allow create: if request.auth != null
    && request.resource.data.campusId == request.auth.token.campusId;
}
```

#### Visibility Rules
```typescript
// Campus-wide posts visible to all campus users
// Space posts visible only to space members
match /posts/{postId} {
  allow read: if request.auth != null
    && resource.data.campusId == request.auth.token.campusId
    && (
      resource.data.visibility == 'campus'
      || isSpaceMember(resource.data.spaceId, request.auth.uid)
    );
}

function isSpaceMember(spaceId, userId) {
  return exists(/databases/$(database)/documents/spaces/$(spaceId)/members/$(userId));
}
```

#### Write Permissions
```typescript
// Users can only upvote once per post
match /posts/{postId}/upvotes/{userId} {
  allow create: if request.auth.uid == userId;
  allow delete: if request.auth.uid == userId;
}

// Users can edit their own posts within 24h
match /posts/{postId} {
  allow update: if request.auth.uid == resource.data.authorId
    && request.time < resource.data.createdAt + duration.value(24, 'h');
}
```

---

## Performance & Analytics

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Feed Cold Load** | < 1.8s | First impression critical |
| **Feed Warm Load** | < 1.2s | Returning users expect speed |
| **Scroll to Prefetch** | < 70% threshold | Seamless infinite scroll |
| **Card Render Time** | < 16ms | 60fps scroll smoothness |
| **Image Lazy Load** | < 500ms | Below-fold images |
| **Ritual Strip Sticky** | 0ms lag | Must not jank on scroll |
| **FAB Hover Feedback** | < 100ms | Instant affordance |
| **Sheet Open/Close** | 240ms | Smooth overlay transition |

### Optimization Strategies

#### 1. Server-Side Rendering (SSR)
```typescript
// Feed page uses SSR for initial 20 posts
export async function generateMetadata({ params }) {
  return {
    title: 'Feed | HIVE',
    description: 'Your campus community feed',
  };
}

export default async function FeedPage() {
  const initialPosts = await getFeedPosts({ page: 1, limit: 20 });

  return (
    <FeedClient initialPosts={initialPosts} />
  );
}
```

#### 2. React Query Caching
```typescript
// Cache feed data for 5 minutes
const { data, isLoading, fetchNextPage } = useInfiniteQuery({
  queryKey: ['feed', filters],
  queryFn: ({ pageParam = 1 }) => fetchFeed({ page: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextPage,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

#### 3. Image Optimization
```typescript
// Use Next.js Image with blur placeholder
<Image
  src={post.mediaUrl}
  alt={post.content}
  width={640}
  height={360}
  placeholder="blur"
  blurDataURL={post.blurHash}
  loading="lazy"
  quality={85}
/>
```

#### 4. Virtualized Scrolling (if needed)
```typescript
// Only render visible cards (for 1000+ posts)
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: posts.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 300, // Average card height
  overscan: 5, // Render 5 extra cards above/below
});
```

### Analytics Events

#### Feed Interactions
```typescript
// Track feed view
trackEvent('feed_view', {
  filter: 'all' | 'my-spaces' | 'campus-wide',
  timestamp: Date.now(),
});

// Track post impression (in viewport for 1s+)
trackEvent('post_impression', {
  postId: string,
  postType: 'post' | 'event' | 'tool',
  position: number, // Card position in feed (1-indexed)
  spaceId: string,
  visibility: 'space' | 'campus',
});

// Track engagement
trackEvent('post_upvote', { postId, spaceId });
trackEvent('post_comment', { postId, spaceId });
trackEvent('post_share', { postId, platform });
trackEvent('post_detail_view', { postId });
```

#### Ritual Analytics
```typescript
// Track ritual engagement
trackEvent('ritual_view', { ritualId, phase });
trackEvent('ritual_join', { ritualId, participantCount });
trackEvent('ritual_task_complete', { ritualId, taskId, progress });
trackEvent('ritual_complete', { ritualId, completionTime });
trackEvent('ritual_snooze', { ritualId, duration });
trackEvent('ritual_dismiss', { ritualId });
trackEvent('ritual_detail_view', { ritualId });
```

#### Event Analytics
```typescript
trackEvent('event_view', { eventId, spaceId });
trackEvent('event_rsvp', { eventId, status: 'going' | 'interested' });
trackEvent('event_check_in', { eventId });
trackEvent('event_share', { eventId, platform });
```

#### Tool Analytics
```typescript
trackEvent('tool_view', { toolId, toolType });
trackEvent('tool_respond', { toolId, toolType });
trackEvent('tool_results_view', { toolId });
```

#### Scroll Depth
```typescript
// Track scroll depth to optimize content
trackEvent('feed_scroll_depth', {
  depth: '25%' | '50%' | '75%' | '100%',
  postsViewed: number,
  timeSpent: number,
});
```

### Success Metrics (KPIs)

#### Engagement Metrics
- **Daily Active Users (DAU)**: % of students who open Feed daily
- **Session Duration**: Average time spent in Feed per session (target: 3-5 min)
- **Scroll Depth**: % of users who scroll past 10 posts
- **Engagement Rate**: (Upvotes + Comments + Shares) / Post Impressions
- **Return Rate**: % of users who return within 24h

#### Content Metrics
- **Post Distribution**: % of posts from each space (fairness check)
- **Visibility Mix**: Campus-wide vs. Space-only post ratio
- **Content Type Mix**: Posts vs. Events vs. Tools ratio
- **Top Performing Spaces**: Spaces with highest engagement

#### Ritual Metrics
- **Join Rate**: % of users who join active ritual
- **Completion Rate**: % of joined users who complete ritual
- **Average Completion Time**: Time from join to completion
- **Snooze Rate**: % of users who snooze ritual
- **Dismiss Rate**: % of users who dismiss ritual

#### Performance Metrics
- **Feed Load Time (p50, p95)**: Server response time
- **Time to Interactive**: When feed is scrollable
- **Scroll Jank**: Frame drops during scroll (target: < 1%)
- **Image Load Time**: Average time for media to load

---

## Testing Strategy

### Unit Tests

#### PostCard Component
```typescript
describe('PostCard', () => {
  test('renders post content and author info', () => {
    render(<PostCard post={mockPost} author={mockAuthor} />);
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(`@${mockAuthor.username}`)).toBeInTheDocument();
  });

  test('handles upvote interaction', async () => {
    const onUpvote = jest.fn();
    render(<PostCard {...mockProps} onUpvote={onUpvote} />);

    fireEvent.click(screen.getByLabelText('Upvote'));
    expect(onUpvote).toHaveBeenCalled();
  });

  test('shows gold upvote icon when hasUpvoted is true', () => {
    render(<PostCard {...mockProps} hasUpvoted={true} />);
    const upvoteIcon = screen.getByLabelText('Upvote');
    expect(upvoteIcon).toHaveClass('upvoted');
  });

  test('truncates long content with "Read more"', () => {
    const longContent = 'A'.repeat(300);
    render(<PostCard post={{ ...mockPost, content: longContent }} />);
    expect(screen.getByText(/Read more/i)).toBeInTheDocument();
  });
});
```

#### RitualStrip Component
```typescript
describe('RitualStrip', () => {
  test('renders ritual info and progress', () => {
    render(<RitualStrip ritual={mockRitual} userProgress={{ current: 2, total: 5 }} />);
    expect(screen.getByText(mockRitual.title)).toBeInTheDocument();
    expect(screen.getByText(/2\/5/)).toBeInTheDocument();
  });

  test('compresses on mobile scroll', () => {
    const { rerender } = render(<RitualStrip isCompressed={false} />);
    expect(screen.getByText(mockRitual.description)).toBeInTheDocument();

    rerender(<RitualStrip isCompressed={true} />);
    expect(screen.queryByText(mockRitual.description)).not.toBeInTheDocument();
  });

  test('handles snooze action', () => {
    const onSnooze = jest.fn();
    render(<RitualStrip onSnooze={onSnooze} />);

    fireEvent.click(screen.getByText('Snooze'));
    expect(onSnooze).toHaveBeenCalled();
  });
});
```

### Integration Tests

#### Feed Loading Flow
```typescript
describe('Feed Page', () => {
  test('loads initial posts on mount', async () => {
    render(<FeedPage />);

    // Should show loading skeletons
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(6);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText(mockPosts[0].content)).toBeInTheDocument();
    });

    // Skeletons should be replaced by real cards
    expect(screen.queryByTestId('skeleton-card')).not.toBeInTheDocument();
  });

  test('loads more posts on scroll', async () => {
    const { container } = render(<FeedPage />);

    // Wait for initial posts
    await waitFor(() => screen.getByText(mockPosts[0].content));

    // Scroll to bottom
    fireEvent.scroll(container, { target: { scrollY: 1000 } });

    // Should trigger fetchNextPage
    await waitFor(() => {
      expect(screen.getByText(mockPosts[20].content)).toBeInTheDocument();
    });
  });
});
```

#### Ritual Participation Flow
```typescript
describe('Ritual Participation', () => {
  test('joins ritual and tracks progress', async () => {
    render(<RitualStrip ritual={mockRitual} />);

    // Click join button
    fireEvent.click(screen.getByText('Join Challenge'));

    // Should show progress bar
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // Complete first task
    fireEvent.click(screen.getByText('Upload profile photo'));

    // Progress should update
    await waitFor(() => {
      expect(screen.getByText(/1\/5/)).toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

#### Feed Discovery Flow
```typescript
test('student browses feed and engages with posts', async ({ page }) => {
  // Login as student
  await loginAsStudent(page);

  // Navigate to feed
  await page.goto('/feed');

  // Wait for posts to load
  await page.waitForSelector('[data-testid="post-card"]');

  // Should see at least 5 posts
  const postCards = await page.$$('[data-testid="post-card"]');
  expect(postCards.length).toBeGreaterThanOrEqual(5);

  // Upvote first post
  await postCards[0].click({ force: true, button: 'left', position: { x: 50, y: 50 } });
  await page.click('[aria-label="Upvote"]');

  // Should see upvote count increment
  await expect(page.locator('[data-testid="upvote-count"]')).toContainText('43');

  // Open post detail
  await postCards[1].click();

  // Should open detail sheet
  await expect(page.locator('[data-testid="post-detail-sheet"]')).toBeVisible();

  // Add comment
  await page.fill('[placeholder="Add a comment..."]', 'Great post!');
  await page.click('[aria-label="Submit comment"]');

  // Comment should appear
  await expect(page.locator('text=Great post!')).toBeVisible();
});
```

#### Ritual Completion Flow
```typescript
test('student completes Welcome Week Challenge', async ({ page }) => {
  await loginAsStudent(page);
  await page.goto('/feed');

  // Should see ritual strip
  await expect(page.locator('[data-testid="ritual-strip"]')).toBeVisible();

  // Join ritual
  await page.click('text=Join Challenge');

  // Should show progress
  await expect(page.locator('text=0/5')).toBeVisible();

  // Open ritual detail sheet
  await page.click('[data-testid="ritual-strip"]');
  await expect(page.locator('[data-testid="ritual-sheet"]')).toBeVisible();

  // Complete all tasks
  const tasks = await page.$$('[data-testid="ritual-task"]');
  for (const task of tasks) {
    await task.click();
  }

  // Should show completion celebration
  await expect(page.locator('text=Challenge Complete!')).toBeVisible();

  // Gold confetti should appear
  await expect(page.locator('[data-testid="confetti"]')).toBeVisible();
});
```

---

## Appendix: Quick Reference

### Color Variables
```css
--bg-primary: #0A0A0A
--bg-secondary: #141414
--bg-tertiary: #1A1A1A
--gold-start: #FFD700
--gold-end: #FFA500
--text-primary: #FFFFFF
--text-secondary: #A0A0A0
```

### Motion Timing
```css
--motion-quick: 100ms        /* Hover, focus */
--motion-standard: 160ms     /* Card interactions */
--motion-slow: 240ms         /* Overlays, sheets */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1)
```

### Card Types
- **PostCard**: Text/photo posts (most common)
- **EventCard**: Time-boxed events with RSVP
- **ToolCard**: Interactive polls, surveys, votes

### Ritual Phases
```
Upcoming (7d before) → Active (live window) → Ended → Recap (auto-post)
```

### Feed Algorithm
```
Score = TimeDecay + EngagementBoost + RelevanceBoost
Fairness: ≤3 items/space per page
Explainability: Every card needs "Why" chip
```

### Performance Budgets (Scale-Ready)

**MVP Targets** (10-100 posts):
- Feed cold load: < 1.8s
- Feed warm load: < 1.2s
- Card render: < 16ms (60fps)
- Scroll jank: < 1%

**Scale Targets** (1000+ posts, production-grade):
- **Feed load**: < 1s (cold start with 1000+ posts via virtualization)
- **Scroll performance**: 60fps maintained with 10,000+ posts
- **Interaction latency**: < 16ms (upvote, comment, bookmark - optimistic updates)
- **Search results**: < 100ms (fuzzy search across 10,000+ posts)
- **Image loading**: < 500ms (lazy load with blur placeholders)
- **Offline cache**: Last 100 posts (24h expiration)
- **Bookmark sync**: < 300ms
- **Keyboard navigation**: < 16ms per action (j/k scroll, l like, c comment)
- **Filter application**: < 200ms (apply complex multi-filter)
- **Analytics dashboard**: < 1.5s (30-day stats calculation)

**Optimization Techniques**:
- Virtualized infinite scroll (react-window) - Only render visible posts
- Lazy loading images (intersection observer) - Load as user scrolls
- Optimistic UI updates - All interactions instant, sync in background
- Service worker caching - Offline support for last 100 posts
- IndexedDB action queue - Queue interactions while offline
- Debounced search (300ms) - Reduce API calls
- Memoized post renders (React.memo) - Prevent unnecessary re-renders
- Smart prefetching - Load next batch while user scrolls
- Image optimization - WebP format, responsive sizes, blur placeholders

**Critical Path Optimization**:
```
User opens app → Feed skeleton loads (200ms)
               → Cached posts render (500ms)
               → Fresh posts stream in (1s total)
               → User can scroll/engage immediately
```

---

**Remember**: The feed is the core loop. If it doesn't feel instant, it's broken. Ship fast > ship big. 60fps scrolling is non-negotiable.
