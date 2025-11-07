# SPACES DISCOVERY - Feed-First Approach
**Revised Strategy: Discovery Through Content, Not Catalogs**

> **Design Philosophy**: YC/SF minimalism - Linear/Arc/Vercel
> **Target**: Discovery happens IN feed, < 3 seconds core loop
> **Aesthetic**: Effortless, not marketplace
> **Platform**: Web-first (desktop primary, mobile companion)

---

## Strategic Decision: Feed-First Discovery

### Why Feed-First?

**Traditional "Space Discovery Grid" Problems:**
- ❌ Feels like browsing Netflix (marketplace, not social)
- ❌ Breaks core loop (detour from feed)
- ❌ Analysis paralysis (50+ spaces, no context)
- ❌ Metadata-driven (member count ≠ value)
- ❌ Divorced from content (no preview of posts)

**Feed-First Discovery Solutions:**
- ✅ Discovery through content (see posts, not cards)
- ✅ Stays in core loop (no detours)
- ✅ Contextual decisions (interesting post = join)
- ✅ Content-driven (posts = value)
- ✅ Organic, social, effortless

---

## Feed Architecture

### Feed Composition (Chronological Mix)

**60% Your Joined Spaces**
```typescript
// Posts from spaces user has joined
{
  type: 'joined_space_post',
  spaceId: 'governors-hall',
  spaceName: 'Governors Hall',
  isJoined: true,
  content: "Who wants Wegmans run at 3pm?",
  // Standard post rendering
}
```

**30% Relevant Public Spaces (Not Joined)**
```typescript
// Posts from PUBLIC spaces user hasn't joined
// Filtered by: major, residential area, interests
{
  type: 'public_space_post',
  spaceId: 'ub-hackers',
  spaceName: 'UB Hackers',
  isJoined: false,
  content: "Hackathon this Saturday! Free pizza and swag.",
  // Includes inline [+ Join Space] CTA
}
```

**10% Suggested Spaces (Social Proof)**
```typescript
// Algorithmic suggestions with context
{
  type: 'suggested_space',
  spaceId: 'acm-programming',
  spaceName: 'ACM Programming Club',
  socialProof: "8 CS majors joined",
  recentPosts: [...], // Preview of 2-3 recent posts
  // CTA: [See recent posts →] → Modal with posts + [Join]
}
```

---

## Discovery Touchpoints

### 1. Feed (Primary Discovery)

**Location:** `/feed`
**Purpose:** Main discovery surface

**Visual Treatment:**
```
┌─────────────────────────────────────┐
│ FEED                                │
├─────────────────────────────────────┤
│ [Post Card - Governors Hall]       │  ← Joined space
│ Sarah Martinez                      │
│ "Who wants Wegmans at 3pm?"        │
│ [↑ 5] [💬 2] [→]                   │
├─────────────────────────────────────┤
│ [Post Card - UB Hackers]           │  ← NOT joined
│ Mike Johnson                        │
│ "Hackathon Saturday! Pizza + swag" │
│ [+ Join UB Hackers] ← Inline CTA   │
│ [↑ 12] [💬 7] [→]                  │
├─────────────────────────────────────┤
│ [Post Card - CS Majors]            │  ← Joined space
│ Alex Kim                            │
│ "CHEM 101 study group tonight"     │
│ [↑ 3] [💬 1] [→]                   │
├─────────────────────────────────────┤
│ [Suggested Space Card]             │  ← Algorithm
│ 🔥 ACM Programming Club            │
│ "8 CS majors joined this week"     │
│ [See recent posts →]               │
│                                     │
│ Preview:                            │
│ • "Workshop: React Hooks"          │
│ • "Looking for project partners"   │
│ [Join Space]                        │
├─────────────────────────────────────┤
│ [Post Card - Class of 2028]        │  ← Joined space
│ Jordan Lee                          │
│ "Grad photo deadline Friday!"      │
│ [↑ 24] [💬 8] [→]                  │
└─────────────────────────────────────┘
```

**Interaction Flow:**
1. User scrolls feed (consuming content)
2. Sees interesting post from space they haven't joined
3. Clicks space name OR [+ Join Space] CTA
4. Instant join (no confirmation) OR preview modal with recent posts
5. Post now shows "Joined ✓" instead of "+ Join"
6. Future posts from that space appear in feed

---

### 2. Your Spaces Page (Management)

**Location:** `/spaces`
**Purpose:** Manage joined spaces, quick access to boards

**NOT a discovery grid.** Shows only YOUR joined spaces.

**Visual Treatment:**
```
┌─────────────────────────────────────┐
│ YOUR SPACES                         │
├─────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐          │
│ │[Icon]    │ │[Icon]    │          │
│ │Governors │ │Class of  │          │
│ │Hall      │ │2028      │          │
│ │428 memb. │ │1,240 mb. │          │
│ └──────────┘ └──────────┘          │
│                                     │
│ ┌──────────┐                        │
│ │[Icon]    │                        │
│ │CS Majors │                        │
│ │312 memb. │                        │
│ └──────────┘                        │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ Looking for more spaces?            │
│ [Browse all spaces →] ← Fallback   │
└─────────────────────────────────────┘
```

**Features:**
- Grid of YOUR joined spaces (quick access)
- Click card → Navigate to space board (`/spaces/[id]`)
- Link to fallback browse (minimal)
- NOT overwhelming (only 3-10 spaces typically)

---

### 3. Browse Spaces (Fallback)

**Location:** `/spaces/browse`
**Purpose:** Power user fallback, search-driven

**Minimal list, NOT grid. Only for "I'm looking for X" intent.**

**Visual Treatment:**
```
┌─────────────────────────────────────┐
│ BROWSE SPACES                       │
│                                     │
│ [Search spaces...]                  │
├─────────────────────────────────────┤
│ Popular This Week                   │
│                                     │
│ □ UB Hackers (28 posts this week)  │
│   Student Org · 156 members         │
│   [Join]                            │
│                                     │
│ □ Intramural Sports (15 posts)     │
│   Interest · 89 members             │
│   [Join]                            │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ Your Friends Joined                 │
│                                     │
│ □ ACM Programming (8 CS majors)    │
│   Student Org · 67 members          │
│   [Join]                            │
│                                     │
│ □ Photography Club (3 friends)     │
│   Interest · 34 members             │
│   [Join]                            │
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ All Spaces (A-Z) ↓                 │
│ [Load more...]                      │
└─────────────────────────────────────┘
```

**Features:**
- Search-first (not browse-first)
- Sections: Popular, Friends Joined, All
- List format (not grid)
- Minimal metadata (just name + member count)
- Quick join (no preview needed)

**When Used:**
- User has specific intent ("Find knitting club")
- Power users exploring niche spaces
- NOT primary discovery path (5% of joins)

---

### 4. Sidebar (Quick Access)

**Location:** Left sidebar (desktop)
**Purpose:** Quick access to joined spaces

**Visual Treatment:**
```
┌─────────────────────────────────┐
│ MY SPACES          3            │
├─────────────────────────────────┤
│ 🔥 Governors Hall               │
│ ○ Class of 2028                 │
│ 🔥 CS Majors                    │
│                                 │
│ [+ Browse spaces]               │
└─────────────────────────────────┘
```

**Features:**
- Shows 3-8 most active spaces
- Status dot (🔥 = active posts, ○ = quiet)
- Click → Navigate to space board
- Link to browse (fallback)

---

## Auto-Join Strategy (Revised)

### Onboarding Flow

**Step 1: Graduation Year**
- Auto-join: **"Class of [YYYY]"** space
- Purpose: Connect with classmates across all majors
- Example: "Class of 2028" (1,200+ members)

**Step 2: Residential Assignment**
- Auto-join: **Specific building/hall** space
- Purpose: Hyper-local coordination (rides, food, lost & found)
- Example: "Governors Hall" (428 members)
- **NOT** "Ellicott Complex" (too broad)

**Step 3: Major Selection**
- Auto-join: **Specific major** space
- Purpose: Major-specific resources, study groups, career events
- Example: "Computer Science Majors" (312 members)
- **NOT** "School of Engineering" (too broad, not relevant)

**Result:** User starts with 3 spaces → Feed has content immediately

---

## Discovery Algorithm

### Public Post Filtering (For Feed)

**Which public space posts show in feed?**
```typescript
function getRelevantPublicPosts(user: User): Post[] {
  // Filter public spaces by relevance
  const relevantSpaces = publicSpaces.filter(space => {
    return (
      // Same major
      space.category === 'academic' && space.tags.includes(user.major) ||

      // Same residential area
      space.category === 'residential' && space.tags.includes(user.residentialArea) ||

      // Interest match (from onboarding interests)
      space.category === 'interest' && hasInterestOverlap(space.tags, user.interests) ||

      // High social proof (5+ friends joined)
      getFriendCount(space.id, user.friendIds) >= 5
    );
  });

  // Get recent posts from relevant spaces
  return getRecentPosts(relevantSpaces, limit: 10);
}
```

**Goals:**
- Show posts from spaces user MIGHT join
- Avoid spam (not every public space)
- Contextual relevance (major, residential, interests)
- Social proof (friends already there)

---

### Suggested Space Cards (Algorithm)

**When to show suggested space card in feed?**
```typescript
function shouldSuggestSpace(user: User, space: Space): boolean {
  // Criteria for showing suggestion
  return (
    // Social proof threshold
    getFriendCount(space.id, user.friendIds) >= 3 &&

    // Space is active (posted in last 7 days)
    space.lastPostAt > sevenDaysAgo() &&

    // User hasn't dismissed this suggestion
    !user.dismissedSpaces.includes(space.id) &&

    // Not already joined
    !user.joinedSpaces.includes(space.id) &&

    // Category relevance
    (
      space.category === 'academic' && space.tags.includes(user.major) ||
      space.category === 'interest' && hasInterestOverlap(space.tags, user.interests)
    )
  );
}
```

**Suggestion Card Frequency:**
- 1 suggestion per 10 feed posts
- Max 3 suggestions per session
- Dismissible (x button)

---

## Space Board (Destination)

**Location:** `/spaces/[spaceId]` or `/s/[slug]`
**Purpose:** Single space view with posts + composer

**Unchanged from original SPACES_TOPOLOGY.md:**
- Chronological feed of space posts
- Composer at top (post defaults to this space)
- Pinned posts carousel (≤2 pins)
- Leader toolbar (if user is leader)
- Right rail: About, Leaders, Members, Tools

**Key Change:**
- User lands here FROM feed (clicked space name or join CTA)
- NOT from browsing grid of spaces

---

## Navigation Structure Changes

### Before (Discovery Grid Approach)
```
• Feed (read-only consumption)
• Spaces (browse grid, discovery)
  → Space Board (after join)
• HiveLab
• Profile
```

### After (Feed-First Discovery)
```
• Feed (consumption + discovery)
  → Inline join CTAs
  → Space Board (after join OR click)
• Spaces (YOUR joined spaces only)
  → Space Board (quick access)
  → [Browse all] → Fallback search
• HiveLab
• Profile
```

---

## Key UX Flows

### Flow 1: Discover & Join from Feed
```
1. User opens app → /feed
2. Scrolls feed (posts from joined spaces)
3. Sees interesting post from "UB Hackers" (not joined)
4. Clicks [+ Join UB Hackers] (inline CTA)
5. Instant join (no confirmation)
6. Button changes to "Joined ✓"
7. Future posts from UB Hackers appear in feed
8. Space added to sidebar "MY SPACES"
```

### Flow 2: Suggested Space Preview
```
1. User scrolls feed
2. Sees suggested space card: "ACM Programming (8 CS majors joined)"
3. Clicks [See recent posts →]
4. Modal opens with 5 recent posts from ACM
5. User reads posts, decides to join
6. Clicks [Join Space] in modal
7. Modal closes, space added to feed
```

### Flow 3: Power User Search
```
1. User wants specific space ("Knitting Club")
2. Clicks "Spaces" in nav → /spaces
3. Clicks [+ Browse spaces] → /spaces/browse
4. Types "knitting" in search
5. Sees "Knitting & Fiber Arts" in results
6. Clicks [Join] → Added to joined spaces
```

### Flow 4: Quick Access from Sidebar
```
1. User wants to check "Governors Hall" space
2. Clicks "Governors Hall" in sidebar MY SPACES
3. Navigates to /spaces/governors-hall (space board)
4. Sees posts, can post via composer
```

---

## API Changes

### Feed Endpoint (Updated)

**Before:**
```typescript
GET /api/feed
// Only posts from joined spaces
```

**After:**
```typescript
GET /api/feed?includePublic=true
// Posts from joined spaces + relevant public spaces + suggestions

Response: {
  posts: [
    { type: 'joined', spaceId, content, ... },
    { type: 'public', spaceId, content, isJoined: false, ... },
    { type: 'suggestion', spaceId, socialProof, recentPosts, ... },
  ],
  hasMore: boolean
}
```

### Space Join (Unchanged)
```typescript
POST /api/spaces/:spaceId/join
// Instant join, no confirmation
```

---

## Analytics Events

### Discovery Events
```typescript
trackEvent('feed_public_post_view', {
  spaceId,
  postId,
  isJoined: false, // User hasn't joined this space
});

trackEvent('feed_inline_join', {
  spaceId,
  source: 'feed_post', // vs 'suggested_card' vs 'browse'
});

trackEvent('suggested_space_view', {
  spaceId,
  socialProof: "8 CS majors joined",
});

trackEvent('suggested_space_preview', {
  spaceId,
  action: 'opened_modal', // vs 'dismissed'
});

trackEvent('browse_spaces_search', {
  query: "knitting",
  resultCount: 1,
});
```

### Success Metrics
- **Feed Join Rate**: % of feed views → joins (target: 5%)
- **Public Post CTR**: % of public posts → clicks (target: 10%)
- **Suggestion CTR**: % of suggestions → previews (target: 15%)
- **Browse Usage**: % of joins from browse (target: < 5%)

---

## Migration from Current SPACES_TOPOLOGY.md

### What Stays
- ✅ Space Board layout (posts, composer, pins, rail)
- ✅ Leader tools (pin, feature, manage)
- ✅ Auto-join logic (cohort, residential, major)
- ✅ Space types (student org, residential, academic, interest)

### What Changes
- ❌ Remove "Space Discovery Grid" section
- ❌ Remove `/spaces/browse` as primary discovery
- ✅ Add "Feed-First Discovery" section
- ✅ Update `/spaces` to show joined spaces only
- ✅ Add "Browse Spaces" as fallback (minimal)
- ✅ Update feed algorithm (public posts + suggestions)

### What's New
- ✅ Inline join CTAs in feed
- ✅ Suggested space cards with social proof
- ✅ Public post rendering (with [+ Join] button)
- ✅ Space preview modal (recent posts before join)

---

## Design System Updates

### New Components Needed

**1. FeedPostCard (Enhanced)**
```typescript
interface FeedPostCardProps {
  post: Post;
  space: Space;
  isJoined: boolean; // NEW: Show join CTA if false
  onJoin?: () => void;
}
```

**2. SuggestedSpaceCard**
```typescript
interface SuggestedSpaceCardProps {
  space: Space;
  socialProof: string; // "8 CS majors joined"
  recentPosts: Post[]; // Preview posts
  onPreview: () => void; // Open modal
  onJoin: () => void;
  onDismiss: () => void;
}
```

**3. SpacePreviewModal**
```typescript
interface SpacePreviewModalProps {
  space: Space;
  recentPosts: Post[]; // 5 recent posts
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}
```

---

## Performance Considerations

### Feed Query Optimization
```typescript
// Batch query: Joined + Public posts
// Use Firestore composite index:
// (campusId, visibility, createdAt DESC)

const joinedSpacePosts = await getDocs(
  query(
    collection(db, 'posts'),
    where('campusId', '==', 'ub-buffalo'),
    where('spaceId', 'in', user.joinedSpaceIds),
    orderBy('createdAt', 'desc'),
    limit(20)
  )
);

const publicSpacePosts = await getDocs(
  query(
    collection(db, 'posts'),
    where('campusId', '==', 'ub-buffalo'),
    where('visibility', '==', 'public'),
    where('spaceId', 'in', relevantSpaceIds),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
);

// Merge and sort client-side
return mergePosts(joinedSpacePosts, publicSpacePosts);
```

---

## Testing Strategy

### E2E Test: Feed Discovery Flow
```typescript
test('user discovers and joins space from feed', async ({ page }) => {
  await loginAsStudent(page);
  await page.goto('/feed');

  // Should see post from non-joined space
  const publicPost = page.locator('[data-space="ub-hackers"][data-joined="false"]');
  await expect(publicPost).toBeVisible();

  // Should have join CTA
  await expect(publicPost.locator('text=+ Join UB Hackers')).toBeVisible();

  // Click join
  await publicPost.locator('text=+ Join UB Hackers').click();

  // Should show joined state
  await expect(publicPost.locator('text=Joined')).toBeVisible();

  // Reload feed
  await page.reload();

  // Post should now show as joined
  const joinedPost = page.locator('[data-space="ub-hackers"][data-joined="true"]');
  await expect(joinedPost).toBeVisible();
  await expect(joinedPost.locator('text=+ Join')).not.toBeVisible();
});
```

---

## Success Criteria

### 1-Week Post-Launch
- [ ] 80%+ of space joins happen from feed (not browse)
- [ ] Feed join rate ≥ 3%
- [ ] Public post CTR ≥ 8%
- [ ] Browse page usage < 10% of feed views

### 1-Month Post-Launch
- [ ] Average student joined 5-8 spaces (up from 3 auto-join)
- [ ] Feed engagement up 20% (more content variety)
- [ ] Space discovery time < 30 seconds (feed → join)
- [ ] Browse page deprecation considered (if < 5% usage)

---

## Open Questions

1. **Join Confirmation:** Instant join vs. confirmation modal?
   - **Recommendation:** Instant (frictionless, can always leave)

2. **Public Post Limit:** How many non-joined posts per feed load?
   - **Recommendation:** 30% of feed (3 public per 10 total)

3. **Suggestion Frequency:** How often show suggested space cards?
   - **Recommendation:** 1 per 10 posts, max 3 per session

4. **Dismiss Behavior:** Dismissed suggestions gone forever or re-surface?
   - **Recommendation:** Gone for 30 days, then re-eligible

5. **Browse Page Fate:** Keep long-term or deprecate?
   - **Recommendation:** Keep as fallback, monitor usage, deprecate if < 5%

---

**Status:** Feed-first discovery approved ✅
**Next Steps:** Implement feed algorithm + inline join CTAs
**Timeline:** Phase 1 (feed changes) → Phase 2 (deprecate browse if successful)
