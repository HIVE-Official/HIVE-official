# HIVE Product Architecture Map

**Purpose**: Comprehensive visual map connecting IA → Composition → Storybook visualization

**Last Updated**: October 2025
**Status**: Foundation for Phase 2 molecule composition

---

## 1. Product Structure (Information Architecture)

### The Core Loop (< 3 seconds)
```
┌─────────────────────────────────────────────────┐
│  OPEN APP → SEE FEED → ENGAGE → COME BACK      │
│  (< 3 sec end-to-end)                          │
└─────────────────────────────────────────────────┘
```

### Platform Layers
```
PUBLIC LAYER
└── Landing (/)
    └── Auth (/auth)
        └── School Selection (/schools)

STUDENT LAYER (Authenticated)
├── CORE HUB (Primary Navigation)
│   ├── Feed (/) ............. Discovery & amplification
│   ├── Spaces (/spaces) ..... Community organization
│   ├── Profile (/profile) ... Identity management
│   └── HiveLab (/hivelab) ... Tool creation
│
├── SECONDARY
│   ├── Notifications (/notifications)
│   ├── Search (/search)
│   ├── Calendar (/calendar)
│   └── Messages (/messages)
│
└── ONBOARDING (/onboarding/*)

ADMIN LAYER (admin.hive.college)
└── Dashboard, moderation, analytics
```

---

## 2. Component Composition Architecture

### Atomic Design Hierarchy
```
ATOMS (shadcn primitives - Phase 1 ✓)
  ↓ compose into
MOLECULES (campus patterns - Phase 2 ← WE ARE HERE)
  ↓ compose into
ORGANISMS (feature blocks - Phase 3)
  ↓ compose into
TEMPLATES (page layouts - Phase 4)
  ↓ used in
PAGES (Next.js routes)
```

### Example: Feed Page Composition
```
/feed (Next.js Page)
│
└── NavigationShell (Organism)
    │
    └── FeedLayout (Template)
        │
        ├── RitualsCardStrip (Molecule)
        │   └── Card + Badge + Button (Atoms)
        │
        ├── FeedFilters (Molecule)
        │   └── Tabs + Badge (Atoms)
        │
        └── FeedPostCard[] (Molecule) ← Phase 2 focus
            ├── Card (Atom)
            ├── Avatar (Atom)
            ├── Badge (Atom)
            └── Button[] (Atoms)
```

---

## 3. The 5 Core Domains (Feature Slices)

### Domain Map
```
┌─────────────────────────────────────────────────────────────┐
│                        HIVE PLATFORM                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   PROFILE    │  │     FEED     │  │    SPACES    │    │
│  │  (Identity)  │  │ (Discovery)  │  │ (Community)  │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│         ┌──────────────────┴──────────────────┐            │
│         │                                      │            │
│  ┌──────▼──────┐                     ┌────────▼───────┐   │
│  │   HIVELAB   │                     │    RITUALS     │   │
│  │   (Tools)   │                     │  (Campaigns)   │   │
│  └─────────────┘                     └────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Domain Relationships
```
Feed depends on:
  - Profile (author display)
  - Spaces (space attribution)
  - Rituals (check-in posts)

Spaces depends on:
  - Profile (member display)
  - Feed (space posts)
  - HiveLab (embedded tools)

Profile depends on:
  - Spaces (joined spaces)
  - Feed (user posts)
  - Rituals (participation stats)

HiveLab depends on:
  - Spaces (deployment targets)
  - Profile (tool creator)

Rituals depends on:
  - Profile (participants)
  - Feed (check-in posts)
```

---

## 4. Phase 2 Molecule Composition (Where We Are)

### Molecules to Build (Atoms → Molecules)

#### **Feed Slice**
```
FeedPostCard
├── Card (dark surface #0c0c0c)
├── Avatar + Name + Handle
├── Badge (space attribution)
├── Text content
├── Photo carousel (if media)
├── Button[] (react, comment, share)
└── CAMPUS PATTERNS:
    ├── Social proof (friend reactions)
    ├── Trending indicator
    └── Space attribution badge

FeedEventCard
├── Card (with urgency styling)
├── Event time (color-coded urgency)
├── Location badge
├── AvatarStack (friends going)
├── Badge (event type)
├── Button[] (Going, Interested)
└── CAMPUS PATTERNS:
    ├── "Who's going" prioritized
    ├── FOMO indicators
    └── Urgency hierarchy

FeedFilters
├── Tabs (All, Spaces, Events, Rituals)
├── Badge[] (unread counts)
└── Active state (white bg)

CommentCard
├── Avatar + Name
├── Comment text
├── Button[] (react, reply)
└── Timestamp
```

#### **Spaces Slice**
```
SpaceCard (Discovery)
├── Card
├── Space image/gradient
├── Name + Category badge
├── Description (2 lines)
├── Metrics (members, posts, active)
├── Button (Join)
└── CAMPUS PATTERNS:
    ├── Mutual connections badge (PRIMARY)
    ├── Friend avatars in space
    ├── Trending indicator
    └── Social proof metrics

SpaceCard (Joined)
├── Card
├── Space image
├── Name + Badge
├── Unread indicator
├── Recent activity text
└── CAMPUS PATTERNS:
    └── "3 friends posted today"

SpaceComposerWithTools
├── Textarea (rounded, dark)
├── InlineToolMenu (dropdown)
│   └── Poll, Event, Task, Resource
├── QuickActions (templates)
│   └── "Need ride", "Study session", etc.
├── Button[] (attach, send)
└── Slash command detection

PhotoCarousel
├── Image[]
├── Button[] (prev, next)
├── Indicator dots
└── Tap to fullscreen
```

#### **Profile Slice**
```
ProfileHeader
├── Avatar (large)
├── Name + Handle
├── Campus badge (Buffalo verified)
├── Bio text
├── StatCard[] (connections, spaces, posts)
├── Button[] (Edit, Share)
└── CAMPUS PATTERNS:
    ├── Campus identity widget
    ├── Verification badge
    └── Completion psychology

ActivityTimeline
├── Timeline item[]
│   ├── Icon (type indicator)
│   ├── Action text
│   ├── Timestamp
│   └── Context (space/post)
└── Load more button

ConnectionList
├── UserCard[]
│   ├── Avatar
│   ├── Name + Handle
│   ├── Mutual count badge
│   ├── Button (Message/Connect)
│   └── Online indicator
└── Filter tabs (All, Mutual, Suggestions)
```

#### **Shared**
```
SearchBar
├── Input (with icon)
├── Dropdown (recent searches)
└── Filter chips (Spaces, People, Posts)

NotificationItem
├── Avatar
├── Text (action description)
├── Timestamp
├── Button (action required)
└── Unread indicator

StatCard
├── Label (text)
├── Value (number)
├── Trend indicator (↑↓)
└── Icon
```

---

## 5. Data Flow (Domain → UI)

### The 5 Layers
```
1. DOMAIN (@hive/core/domain)
   ↓ Aggregates, Value Objects, Business Rules

2. APPLICATION (@hive/core/application)
   ↓ Services, Use Cases

3. API (apps/web/src/app/api)
   ↓ Route Handlers, withAuthAndErrors

4. REACT QUERY (apps/web/src/hooks)
   ↓ useQuery, useMutation, Cache

5. UI (@hive/ui)
   ↓ Components receive props, emit callbacks
```

### Example: FeedPostCard Data Flow
```typescript
// 1. DOMAIN (packages/core/src/domain/feed/feed-post.aggregate.ts)
class FeedPostAggregate {
  id: PostId
  content: string
  author: AuthorInfo
  space: SpaceInfo
  reactions: ReactionCount

  hasUserReacted(userId: UserId): boolean
}

// 2. APPLICATION (packages/core/src/application/feed.service.ts)
class FeedService {
  async getFeedWithContext(userId: string) {
    const posts = await this.feedRepo.getUserFeed(userId)

    return posts.map(post => ({
      post,
      hasReacted: post.hasUserReacted(userId),
      friendReactions: await this.getFriendReactions(post.id, userId)
    }))
  }
}

// 3. API (apps/web/src/app/api/feed/route.ts)
export const GET = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request)
  const feed = await feedService.getFeedWithContext(userId)
  return respond.success(feed)
})

// 4. REACT QUERY (apps/web/src/hooks/use-feed.ts)
export function useFeed() {
  return useQuery({
    queryKey: ['feed'],
    queryFn: () => fetch('/api/feed').then(r => r.json())
  })
}

// 5. UI (packages/ui/src/molecules/feed-post-card.tsx)
export function FeedPostCard({
  post,           // From domain
  hasReacted,     // From application context
  friendReactions, // From application context
  onReact,        // Callback (event up)
  onComment       // Callback (event up)
}: Props) {
  return (
    <Card>
      <Avatar src={post.author.avatar} />
      <Badge>{post.space.name}</Badge>
      <Text>{post.content}</Text>

      {/* Social proof from application layer */}
      {friendReactions.length > 0 && (
        <SocialProof>
          <AvatarStack friends={friendReactions} />
          <Text>{formatFriends(friendReactions)} reacted</Text>
        </SocialProof>
      )}

      {/* Events up */}
      <Button onClick={() => onReact(post.id)}>
        ❤️ {post.reactions.count}
      </Button>
    </Card>
  )
}

// 6. PAGE (apps/web/src/app/feed/page.tsx)
export default function FeedPage() {
  const { data: posts } = useFeed()
  const { mutate: reactToPost } = useReactToPost()

  return posts.map(({ post, hasReacted, friendReactions }) => (
    <FeedPostCard
      post={post}
      hasReacted={hasReacted}
      friendReactions={friendReactions}
      onReact={(postId) => reactToPost(postId)}
      onComment={(postId) => router.push(`/posts/${postId}`)}
    />
  ))
}
```

---

## 6. Campus Behavioral Patterns (Must Include)

### Social Proof Pattern (Highest Priority)
```tsx
// EVERYWHERE: Show mutual connections
{mutualCount > 0 && (
  <Badge variant="gold" priority="primary">
    {mutualCount} mutual connection{mutualCount > 1 ? 's' : ''}
  </Badge>
)}

// Friend activity
{friendsWhoEngaged.length > 0 && (
  <SocialProof>
    <AvatarStack friends={friendsWhoEngaged.slice(0, 3)} />
    <Text>{formatFriendsList(friendsWhoEngaged)} {actionVerb}</Text>
  </SocialProof>
)}
```

### Trending Pattern
```tsx
{isTrending && (
  <Badge variant="outline">
    🔥 Trending {trendingIn === 'campus' ? 'on campus' : `in ${trendingIn}`}
  </Badge>
)}
```

### Time Urgency Pattern (Events)
```tsx
const urgencyColor = {
  today: 'red',
  thisWeek: 'orange',
  later: 'white/70'
}

<EventTime color={urgencyColor[timeframe]}>
  {formatEventTime(time)}
</EventTime>
```

### Completion Psychology (Profile)
```tsx
<Progress value={profileCompletion} className="mb-2" />
<Text>Your profile is {profileCompletion}% complete</Text>
<Button variant="gold">Complete profile</Button>
```

---

## 7. Storybook Visualization Strategy

### Story Structure for Each Molecule
```typescript
// Example: feed-post-card.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { FeedPostCard } from './feed-post-card'

const meta = {
  title: 'Molecules/Feed/FeedPostCard',
  component: FeedPostCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#000000' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedPostCard>

export default meta
type Story = StoryObj<typeof meta>

// 1. DEFAULT STATE
export const Default: Story = {
  args: {
    post: {
      author: { name: 'Sarah Johnson', handle: '@sarahj', avatar: '...' },
      space: { name: 'CS Study Group', id: '...' },
      content: 'Anyone free to study for algorithms midterm tomorrow?',
      reactions: { count: 12 },
      comments: { count: 4 },
      timestamp: new Date()
    }
  }
}

// 2. WITH SOCIAL PROOF (Campus pattern)
export const WithFriendReactions: Story = {
  args: {
    ...Default.args,
    friendReactions: [
      { name: 'Alex Chen', avatar: '...' },
      { name: 'Mike Davis', avatar: '...' },
      { name: 'Emma Wilson', avatar: '...' }
    ]
  }
}

// 3. TRENDING POST
export const Trending: Story = {
  args: {
    ...Default.args,
    post: {
      ...Default.args.post,
      reactions: { count: 87 },
      comments: { count: 23 }
    },
    isTrending: true,
    trendingIn: 'campus'
  }
}

// 4. PROMOTED POST (Gold accent)
export const Promoted: Story = {
  args: {
    ...Default.args,
    isPromoted: true,
    promotionReason: 'Popular in CS major'
  }
}

// 5. WITH MEDIA (Photo carousel)
export const WithPhotos: Story = {
  args: {
    ...Default.args,
    post: {
      ...Default.args.post,
      media: [
        { type: 'image', url: '...' },
        { type: 'image', url: '...' }
      ]
    }
  }
}

// 6. REAL USER FLOW (Comprehensive)
export const RealUserFlow: Story = {
  render: () => (
    <div className="w-[600px] space-y-4 p-4">
      {/* Trending post with friend reactions */}
      <FeedPostCard {...Trending.args} />

      {/* Regular post */}
      <FeedPostCard {...Default.args} />

      {/* Post with photos */}
      <FeedPostCard {...WithPhotos.args} />
    </div>
  )
}
```

### Story Categories in Storybook
```
Atoms/ (Phase 1 ✓)
├── Button
├── Card
├── Input
├── Badge
└── ... (11 more)

Molecules/ (Phase 2 ← Current focus)
├── Feed/
│   ├── FeedPostCard
│   ├── FeedEventCard
│   ├── FeedFilters
│   └── CommentCard
├── Spaces/
│   ├── SpaceCard (Discovery)
│   ├── SpaceCard (Joined)
│   ├── SpaceComposerWithTools
│   └── PhotoCarousel
├── Profile/
│   ├── ProfileHeader
│   ├── ActivityTimeline
│   └── ConnectionList
└── Shared/
    ├── SearchBar
    ├── NotificationItem
    └── StatCard

Organisms/ (Phase 3)
├── Feed/
│   └── FeedLayout
├── Spaces/
│   ├── SpaceHeader
│   ├── SpacePostFeed
│   ├── SpaceEventsPanel
│   └── SpaceMembersPanel
└── Profile/
    └── ProfileBentoGrid

Templates/ (Phase 4)
├── FeedLayout
├── SpaceLayout
└── ProfileLayout
```

---

## 8. Implementation Workflow (Phase 2)

### For Each Molecule:

#### Step 1: Define Props Interface (Domain types)
```typescript
import type { FeedPost, Author, Space } from '@hive/core'

interface FeedPostCardProps {
  // Data (from domain)
  post: FeedPost
  author: Author
  space: Space

  // Context (from application layer)
  hasReacted: boolean
  friendReactions: Author[]
  isTrending?: boolean

  // Events (callbacks)
  onReact: (postId: string) => void
  onComment: (postId: string) => void
  onSpaceClick: (spaceId: string) => void
}
```

#### Step 2: Compose from Atoms (already refactored)
```typescript
import { Card, Avatar, Badge, Button } from '../atoms'

export function FeedPostCard({
  post,
  friendReactions,
  onReact
}: Props) {
  return (
    <Card className="p-4">
      {/* Compose atoms */}
      <div className="flex gap-3">
        <Avatar src={post.author.avatar} />
        <div className="flex-1">
          <Badge variant="outline">{post.space.name}</Badge>
          <p>{post.content}</p>
        </div>
      </div>

      <Button onClick={() => onReact(post.id)}>
        ❤️ {post.reactions.count}
      </Button>
    </Card>
  )
}
```

#### Step 3: Add Campus Patterns
```typescript
{/* Social proof (campus pattern) */}
{friendReactions.length > 0 && (
  <div className="flex items-center gap-2 mb-2">
    <AvatarStack friends={friendReactions.slice(0, 3)} />
    <Text className="text-sm text-white/70">
      {formatFriendsList(friendReactions)} reacted
    </Text>
  </div>
)}

{/* Trending indicator (campus pattern) */}
{isTrending && (
  <Badge variant="outline" className="border-[#FFD700]/50 text-[#FFD700]">
    🔥 Trending on campus
  </Badge>
)}
```

#### Step 4: Create Comprehensive Stories
```typescript
// 6-8 stories showing:
// - Default
// - With social proof
// - Trending
// - Promoted
// - With media
// - Real user flow
```

#### Step 5: Test in Storybook
```bash
pnpm storybook
# Navigate to: Molecules/Feed/FeedPostCard
# Verify all stories render correctly on dark background
# Test interactions (buttons, expand/collapse)
```

---

## 9. Success Criteria for Phase 2

### Component Quality
- [ ] Composes from Phase 1 atoms (no custom primitives)
- [ ] Includes 2+ campus behavioral patterns
- [ ] Props typed from @hive/core domain types
- [ ] Events emitted via callbacks (no direct API calls)
- [ ] 6+ Storybook stories with dark backgrounds
- [ ] Mobile responsive (375px → 1440px)
- [ ] Accessible (keyboard nav, ARIA labels)

### Campus Pattern Integration
- [ ] Social proof (mutual connections, friend activity)
- [ ] Trending indicators (when applicable)
- [ ] Time urgency (events, deadlines)
- [ ] Completion psychology (profile)
- [ ] Public metrics (member counts, engagement)

### Storybook Presentation
- [ ] Real campus context examples
- [ ] Dark background (#000)
- [ ] Interactive controls
- [ ] Multiple states documented
- [ ] User flow examples

---

## 10. Next Steps

### Immediate (This Session)
1. Choose **ONE exemplar molecule** (FeedPostCard recommended)
2. Build it following the workflow above
3. Document composition decisions
4. Use as template for remaining molecules

### Short Term (Phase 2)
1. Feed slice molecules (4 components)
2. Spaces slice molecules (4 components)
3. Profile slice molecules (3 components)
4. Shared molecules (3 components)

### Medium Term (Phase 3)
1. Compose molecules into organisms
2. Build complete feature blocks
3. Create page templates

---

## Quick Reference

### Composition Rules
```
✓ Atoms → Molecules (2-5 atoms per molecule)
✓ Molecules → Organisms (3+ molecules per organism)
✓ Organisms → Templates (layout orchestration)
✗ Never compose down (molecule → atom)
✗ Never skip layers (atom → organism)
```

### Campus Patterns Checklist
```
□ Social proof (mutual connections, friend activity)
□ Trending indicators (when engagement > threshold)
□ Time urgency (color-coded for events)
□ Completion psychology (profile progress)
□ Public metrics (show numbers, not hide)
□ Attribution ("why am I seeing this?")
```

### Data Flow
```
Domain → Application → API → React Query → Props → UI
User Action → Callback → Mutation → API → Domain
```

---

**Ready to build?** Let's start with FeedPostCard as our exemplar molecule.

**Questions?** Check:
- COMPOSITION_SYSTEM.md (composition patterns)
- SPACES_IA_UX_AUDIT.md (campus behavioral patterns)
- UI_UX_IA_SPEC.md (full IA specification)
