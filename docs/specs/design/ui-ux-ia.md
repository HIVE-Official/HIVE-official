# HIVE Platform UI/UX/IA Specification
**Version**: 1.0
**Last Updated**: 2025-10-02
**Status**: Comprehensive Design System Documentation

---

## Table of Contents

1. [Information Architecture](#information-architecture)
2. [Domain-Driven UI Mapping](#domain-driven-ui-mapping)
3. [Design System Foundation](#design-system-foundation)
4. [Component Patterns](#component-patterns)
5. [Interaction Patterns](#interaction-patterns)
6. [Behavioral Psychology Integration](#behavioral-psychology-integration)
7. [Responsive Design System](#responsive-design-system)
8. [Accessibility Standards](#accessibility-standards)
9. [Performance Requirements](#performance-requirements)
10. [Animation & Motion](#animation--motion)

---

## 1. Information Architecture

### 1.1 Platform Structure Overview

```
HIVE Platform
│
├── 🌐 PUBLIC LAYER (Unauthenticated)
│   ├── Landing (/)
│   ├── Authentication (/auth/*)
│   ├── School Selection (/schools)
│   └── Public Profiles (/profile/[handle])
│
├── 🎓 STUDENT LAYER (Authenticated - Student/Alumni)
│   ├── Core Hub
│   │   ├── Feed (/) - Discovery & Amplification
│   │   ├── Spaces (/spaces) - Community Organization
│   │   ├── Profile (/profile) - Identity Management
│   │   └── HiveLab (/hivelab) - Tool Creation
│   │
│   ├── Secondary Features
│   │   ├── Notifications (/notifications)
│   │   ├── Search (/search)
│   │   ├── Calendar (/calendar)
│   │   └── Messages (/messages)
│   │
│   └── Onboarding Flow (/onboarding/*)
│
└── 🔐 ADMIN LAYER (admin.hive.college)
    ├── Dashboard Overview
    ├── User Management
    ├── Space Management
    ├── Content Moderation
    ├── Ritual Command Center
    ├── Analytics Dashboard
    └── System Configuration
```

### 1.2 Navigation Hierarchy

#### Primary Navigation (Authenticated Users)
```typescript
// Located: Bottom navigation (mobile) | Left sidebar (desktop)
// Component: @hive/ui/organisms/navigation-shell

const primaryNavigation = [
  {
    route: '/feed',
    icon: 'Home',
    label: 'Feed',
    badge: null, // No badge for feed
    priority: 1,
    alwaysVisible: true
  },
  {
    route: '/spaces',
    icon: 'Grid',
    label: 'Spaces',
    badge: 'unread-count', // Shows unread posts count
    priority: 2,
    alwaysVisible: true
  },
  {
    route: '/hivelab',
    icon: 'Sparkles',
    label: 'HiveLab',
    badge: null,
    priority: 3,
    alwaysVisible: true
  },
  {
    route: '/profile',
    icon: 'User',
    label: 'Profile',
    badge: 'completion-status', // Shows if profile incomplete
    priority: 4,
    alwaysVisible: true
  },
  {
    route: '/notifications',
    icon: 'Bell',
    label: 'Notifications',
    badge: 'notification-count',
    priority: 5,
    mobileOnly: true // Hidden on desktop, in top bar instead
  }
];
```

#### Secondary Navigation
```typescript
// Located: Contextual based on current route
// Component: Tabs, segmented controls, or dropdown menus

// Example: Spaces route
const spacesNavigation = [
  { label: 'Discover', value: 'discover' },
  { label: 'My Spaces', value: 'joined' },
  { label: 'Create', value: 'create' }
];

// Example: Profile route
const profileNavigation = [
  { label: 'Posts', value: 'posts' },
  { label: 'Spaces', value: 'spaces' },
  { label: 'Activity', value: 'activity' },
  { label: 'Settings', value: 'settings' }
];
```

### 1.3 Information Hierarchy by Route

#### Feed Route (`/feed`)
```
Level 1: Navigation Shell
  └── Level 2: Feed Container
      ├── Level 3a: Composer (Collapsed by default - opens modal)
      ├── Level 3b: Filter Tabs (All, Spaces, Events, Rituals)
      └── Level 3c: Feed Stream
          └── Level 4: Post Cards
              ├── Level 5a: Post Header (Author, Space, Timestamp)
              ├── Level 5b: Post Content (Text, Media, Event details)
              ├── Level 5c: Post Actions (React, Comment, Repost, Requote)
              └── Level 5d: Post Footer (Engagement counts, Social proof)
```

#### Spaces Route (`/spaces`)
```
Level 1: Navigation Shell
  └── Level 2: Spaces Container
      ├── Level 3a: Discovery Tab
      │   ├── Search Bar
      │   ├── Category Filters
      │   └── Space Grid
      │       └── Space Cards
      │
      ├── Level 3b: My Spaces Tab
      │   ├── Quick Actions (Create, Manage)
      │   └── Space Grid (Joined spaces)
      │
      └── Level 3c: Space Detail View
          ├── Space Header (Cover, Title, Stats)
          ├── Space Navigation (Posts, About, Members, Events)
          ├── Leader Toolbar (If user is leader)
          └── Content Area (Contextual based on tab)
```

#### Profile Route (`/profile`)
```
Level 1: Navigation Shell
  └── Level 2: Profile Container
      ├── Level 3a: Profile Header
      │   ├── Cover Photo
      │   ├── Avatar (3:4 portrait aspect)
      │   ├── Identity Info (Name, Handle, Major, Year)
      │   ├── Bio
      │   └── Quick Stats (Connections, Spaces, Posts)
      │
      ├── Level 3b: Profile Navigation
      │   └── Tabs (Posts, Spaces, Activity, Settings)
      │
      └── Level 3c: Content Area
          ├── Posts Grid/List
          ├── Spaces Grid
          ├── Activity Timeline
          └── Settings Panel
```

#### HiveLab Route (`/hivelab`)
```
Level 1: Navigation Shell
  └── Level 2: HiveLab Container
      ├── Level 3a: Tool Browser Tab
      │   ├── My Tools
      │   ├── Template Library
      │   └── Community Tools
      │
      ├── Level 3b: Tool Builder Tab
      │   ├── Builder Canvas (Center)
      │   ├── Element Palette (Left Sidebar)
      │   ├── Properties Panel (Right Sidebar)
      │   └── Preview/Publish Actions (Top Bar)
      │
      └── Level 3c: Tool Runtime View
          ├── Tool Header
          ├── Tool Interface (Dynamic based on composition)
          └── Tool Actions (Share, Embed, Analytics)
```

---

## 2. Domain-Driven UI Mapping

### 2.1 DDD Architecture Overview

```typescript
// Domain Layer → UI Component Mapping
// Each domain has aggregates, value objects, and events that map to UI patterns

Domain Layer (packages/core/src/domain)
├── identity/              → Profile UI Components
├── spaces/                → Space UI Components
├── feed/                  → Feed UI Components
├── rituals/               → Ritual UI Components
├── analytics/             → Analytics UI Components
└── shared/                → Shared UI Primitives
```

### 2.2 Identity Domain → Profile UI

#### Aggregates Mapping
```typescript
// Domain: packages/core/src/domain/identity/aggregates/profile.aggregate.ts
// UI Components: packages/ui/src/atomic/organisms/profile-*

ProfileAggregate {
  // Value Objects
  id: UserId                    → UI: Hidden (internal only)
  handle: Handle                → UI: @username display, URLs
  email: UBEmail                → UI: Settings only, verified badge
  displayName: string           → UI: Primary name display

  // Profile Data
  bio: string                   → UI: Bio section, max 200 chars
  avatar: AvatarUrl             → UI: Avatar component (3:4 portrait)
  coverPhoto: CoverUrl          → UI: Profile header background
  major: Major[]                → UI: Badge/chip display
  graduationYear: Year          → UI: "Class of YYYY" format

  // Metadata
  campusId: CampusId            → UI: Hidden (security layer)
  createdAt: Timestamp          → UI: "Member since" display
  onboardingComplete: boolean   → UI: Completion prompts

  // Computed Properties
  completionScore: number       → UI: Progress indicator
  connectionCount: number       → UI: Stats display
  spaceCount: number            → UI: Stats display
}

// UI Component Structure
<ProfileHeader>
  <CoverPhoto src={profile.coverPhoto} />
  <Avatar
    src={profile.avatar}
    aspectRatio="3:4"
    verified={profile.email.verified}
  />
  <IdentitySection>
    <DisplayName>{profile.displayName}</DisplayName>
    <Handle>@{profile.handle}</Handle>
    <AcademicInfo>
      {profile.major.map(m => <Badge>{m}</Badge>)}
      <Year>Class of {profile.graduationYear}</Year>
    </AcademicInfo>
  </IdentitySection>
  <Bio>{profile.bio}</Bio>
  <Stats>
    <Stat label="Connections" value={profile.connectionCount} />
    <Stat label="Spaces" value={profile.spaceCount} />
  </Stats>
</ProfileHeader>
```

#### Value Objects → UI Patterns
```typescript
// Handle Value Object
// Domain: packages/core/src/domain/identity/value-objects/handle.value.ts
// UI Pattern: @username format, clickable links, validation

interface HandleUIPattern {
  display: (handle: Handle) => `@${handle.value}`
  link: (handle: Handle) => `/profile/${handle.value}`
  validation: {
    pattern: /^[a-z0-9._-]{3,20}$/
    errorMessage: "Handle must be 3-20 characters (letters, numbers, ._-)"
  }
  availability: "Check in real-time as user types"
  suggestions: "Generate from name if unavailable"
}

// UBEmail Value Object
// Domain: packages/core/src/domain/identity/value-objects/ub-email.value.ts
// UI Pattern: Verification badge, privacy controls

interface EmailUIPattern {
  display: "Never show publicly"
  verification: {
    badge: <VerifiedBadge /> // Shows checkmark if verified
    status: "Verified" | "Pending" | "Unverified"
  }
  privacy: "Email hidden from all users except admins"
  usage: "Authentication only, no marketing"
}
```

### 2.3 Spaces Domain → Space UI

#### Space Aggregate Mapping
```typescript
// Domain: packages/core/src/domain/spaces/aggregates/space.aggregate.ts
// UI Components: packages/ui/src/atomic/organisms/space-*

SpaceAggregate {
  // Identity
  id: SpaceId                   → UI: URL param, internal
  name: string                  → UI: Space title, header
  slug: string                  → UI: URL-friendly name
  handle: string                → UI: @spacename format

  // Content
  description: string           → UI: About section
  coverImage: ImageUrl          → UI: Space header background
  category: SpaceCategory       → UI: Category badge

  // Configuration
  privacy: PrivacyLevel         → UI: Lock icon, visibility label
  spaceType: SpaceType          → UI: Type badge (Greek, Academic, etc.)

  // Membership
  memberCount: number           → UI: "X members" display
  leaderIds: UserId[]           → UI: Leader badges on members

  // Features
  hasEvents: boolean            → UI: Show/hide events tab
  hasTools: boolean             → UI: Show/hide tools section
  hasRSS: boolean               → UI: RSS feed indicator

  // Metadata
  campusId: CampusId            → UI: Hidden (security)
  createdAt: Timestamp          → UI: "Founded [date]"
  isActive: boolean             → UI: Active status badge
}

// UI Component Structure
<SpaceDetailView>
  <SpaceHeader>
    <CoverImage src={space.coverImage} />
    <SpaceIdentity>
      <SpaceName>{space.name}</SpaceName>
      <SpaceHandle>@{space.handle}</SpaceHandle>
      <SpaceBadges>
        <CategoryBadge>{space.category}</CategoryBadge>
        <TypeBadge>{space.spaceType}</TypeBadge>
        <PrivacyBadge>{space.privacy}</PrivacyBadge>
      </SpaceBadges>
    </SpaceIdentity>
    <SpaceStats>
      <MemberCount>{space.memberCount} members</MemberCount>
      <Founded>Founded {formatDate(space.createdAt)}</Founded>
    </SpaceStats>
    <SpaceActions>
      {!isMember && <JoinButton />}
      {isMember && <LeaveButton />}
      {isLeader && <ManageButton />}
    </SpaceActions>
  </SpaceHeader>

  <SpaceNavigation>
    <Tab>Posts</Tab>
    {space.hasEvents && <Tab>Events</Tab>}
    <Tab>About</Tab>
    <Tab>Members</Tab>
    {space.hasTools && <Tab>Tools</Tab>}
  </SpaceNavigation>

  {isLeader && <LeaderToolbar />}

  <ContentArea>
    {/* Dynamic based on active tab */}
  </ContentArea>
</SpaceDetailView>
```

#### Space Types → UI Variations
```typescript
// Different space types have different UI patterns

type SpaceTypeUIPattern = {
  'greek-life': {
    rushMode: boolean              // Special UI during rush
    recruitmentBanner: boolean     // Show recruitment CTA
    eventPromotion: 'public'       // Public events during rush
    membershipProcess: 'invite'    // Invite-only joining
    badges: ['Greek Life', 'Social']
  },
  'academic': {
    studyResources: boolean        // Show resources section
    finalsBanner: boolean          // Special UI during finals
    eventPromotion: 'auto'         // Auto-promote study sessions
    membershipProcess: 'open'      // Anyone can join
    badges: ['Academic', space.major]
  },
  'residential': {
    buildingOnly: boolean          // Only dorm residents
    emergencyAlerts: boolean       // Priority for emergencies
    eventPromotion: 'building'     // Building-specific events
    membershipProcess: 'automatic' // Auto-join based on housing
    badges: ['Residential', space.building]
  },
  'student-org': {
    officialBadge: boolean         // University verified
    budgetDisplay: boolean         // Show funding status
    eventPromotion: 'campus'       // Campus-wide visibility
    membershipProcess: 'open'      // Anyone can join
    badges: ['Student Org', space.category]
  }
};
```

### 2.4 Feed Domain → Feed UI

#### Feed Algorithm → UI Rendering
```typescript
// Domain: packages/core/src/domain/feed/services/feed-algorithm.service.ts
// UI Components: packages/ui/src/atomic/organisms/feed-*

interface FeedPostUIData {
  // Core Content
  post: PostAggregate
  author: ProfileAggregate
  space: SpaceAggregate

  // Algorithm Scoring (influences UI placement)
  algorithmScore: number          → UI: Position in feed
  promotionLevel: PromotionLevel  → UI: Visual prominence

  // Social Proof (drives engagement)
  friendsWhoReacted: Profile[]    → UI: "Jake, Sarah +3 reacted"
  trendingIndicator: boolean      → UI: 🔥 Trending badge
  similarSpaces: Space[]          → UI: "Popular in CS majors"

  // Engagement Data
  reactionCount: number           → UI: Reaction counter
  commentCount: number            → UI: Comment counter
  repostCount: number             → UI: Repost counter

  // Behavioral Hooks
  variableReward: number          → UI: Random highlight effect
  fomo: FOMOIndicator             → UI: "Filling up fast"
  urgency: UrgencyLevel           → UI: Time-based badges
}

// UI Rendering Priority
const renderFeedPost = (post: FeedPostUIData) => {
  // High promotion = larger card, more visual weight
  const cardSize = {
    promoted: 'large',      // 2x height, full width
    standard: 'medium',     // Normal card
    demoted: 'compact'      // Minimal card
  }[post.promotionLevel];

  // Trending gets visual distinction
  const trending = post.trendingIndicator ? (
    <TrendingBadge>🔥 Trending</TrendingBadge>
  ) : null;

  // Social proof placement
  const socialProof = post.friendsWhoReacted.length > 0 ? (
    <SocialProof>
      {formatFriends(post.friendsWhoReacted)} reacted
    </SocialProof>
  ) : null;

  return (
    <FeedPostCard size={cardSize}>
      <PostHeader>
        <AuthorInfo author={post.author} />
        <SpaceAttribution space={post.space} />
        <Timestamp>{formatRelative(post.createdAt)}</Timestamp>
        {trending}
      </PostHeader>

      {socialProof}

      <PostContent>
        {post.content}
      </PostContent>

      <PostActions>
        <ReactionButton count={post.reactionCount} />
        <CommentButton count={post.commentCount} />
        <RepostButton count={post.repostCount} />
        <RequoteButton />
      </PostActions>
    </FeedPostCard>
  );
};
```

### 2.5 Rituals Domain → Ritual UI

#### Ritual Aggregate Mapping
```typescript
// Domain: packages/core/src/domain/rituals/aggregates/ritual.aggregate.ts
// UI Components: packages/ui/src/atomic/organisms/ritual-*

RitualAggregate {
  // Identity
  id: RitualId
  name: string                    → UI: Ritual title
  description: string             → UI: Ritual description

  // Campaign Configuration
  startDate: Date                 → UI: Campaign timeline
  endDate: Date                   → UI: Deadline countdown
  frequency: Frequency            → UI: "Daily" | "Weekly" badge

  // Participation
  participantCount: number        → UI: "X students joined"
  completionRate: number          → UI: Progress indicator
  streakLeaderboard: Profile[]    → UI: Leaderboard component

  // Rewards
  rewardType: RewardType          → UI: Reward badge icon
  rewardThreshold: number         → UI: Goal display

  // Metadata
  campusWide: boolean             → UI: Campus badge
  createdBy: 'admin' | 'user'     → UI: Official badge if admin
}

// UI Component Structure
<RitualCard>
  <RitualHeader>
    <RitualIcon type={ritual.rewardType} />
    <RitualTitle>{ritual.name}</RitualTitle>
    {ritual.campusWide && <CampusBadge>Campus-Wide</CampusBadge>}
  </RitualHeader>

  <RitualDescription>{ritual.description}</RitualDescription>

  <RitualProgress>
    <ProgressBar
      value={ritual.completionRate}
      target={ritual.rewardThreshold}
    />
    <ParticipantCount>
      {ritual.participantCount} students joined
    </ParticipantCount>
  </RitualProgress>

  <RitualTimeline>
    <TimeRemaining endDate={ritual.endDate} />
    <Frequency>{ritual.frequency}</Frequency>
  </RitualTimeline>

  <RitualActions>
    <JoinRitualButton />
    <CheckInButton />
    <ViewLeaderboardButton />
  </RitualActions>
</RitualCard>
```

---

## 3. Design System Foundation

### 3.1 Design Tokens Architecture

```typescript
// Location: packages/tokens/tailwind.config.master.ts
// All design decisions codified as tokens

export const designTokens = {
  // Color System
  colors: {
    // Brand Colors
    brand: {
      gold: '#FFD700',        // Primary accent
      darkGold: '#B8860B',    // Hover state
      lightGold: '#FFFACD'    // Subtle backgrounds
    },

    // Semantic Colors
    background: {
      primary: '#0A0A0A',     // Main background
      secondary: '#1A1A1A',   // Card background
      tertiary: '#2A2A2A'     // Elevated surfaces
    },

    text: {
      primary: '#FFFFFF',     // Primary text
      secondary: '#A0A0A0',   // Secondary text
      tertiary: '#6B6B6B',    // Muted text
      inverse: '#0A0A0A'      // Text on light backgrounds
    },

    // Interactive States
    interactive: {
      default: '#FFD700',
      hover: '#B8860B',
      active: '#8B6914',
      disabled: '#4A4A4A'
    },

    // Semantic Feedback
    feedback: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },

    // Space Type Colors (for badges)
    spaceTypes: {
      greek: '#9333EA',       // Purple
      academic: '#3B82F6',    // Blue
      residential: '#10B981', // Green
      studentOrg: '#F59E0B',  // Orange
      social: '#EC4899',      // Pink
      professional: '#6366F1' // Indigo
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },

    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem'       // 48px
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // Spacing System (4px base)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px'    // Circular
  },

  // Shadows (Depth System)
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)'
  },

  // Breakpoints (Mobile-first)
  breakpoints: {
    sm: '640px',   // Mobile landscape
    md: '768px',   // Tablet
    lg: '1024px',  // Desktop
    xl: '1280px',  // Large desktop
    '2xl': '1536px' // Extra large
  },

  // Z-Index System
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
```

### 3.2 Component Hierarchy (Atomic Design)

```
@hive/ui Component Structure
│
├── atoms/                      # Basic building blocks
│   ├── button.tsx             # All button variants
│   ├── input.tsx              # Form inputs
│   ├── badge.tsx              # Status badges
│   ├── avatar.tsx             # User avatars
│   ├── card.tsx               # Card container
│   ├── dialog.tsx             # Modal dialog
│   ├── alert.tsx              # Alert messages
│   └── [35+ more atoms]
│
├── molecules/                  # Simple combinations
│   ├── feed-post-card.tsx     # Post card in feed
│   ├── space-card.tsx         # Space preview card
│   ├── photo-carousel.tsx     # Image carousel
│   ├── comment-card.tsx       # Comment display
│   ├── stat-card.tsx          # Statistic display
│   └── [40+ more molecules]
│
├── organisms/                  # Complex components
│   ├── navigation-shell.tsx   # App navigation
│   ├── profile-header.tsx     # Profile page header
│   ├── space-post-feed.tsx    # Space's post feed
│   ├── hivelab-builder-canvas.tsx  # Tool builder
│   ├── connection-list.tsx    # Connection display
│   └── [50+ more organisms]
│
└── templates/                  # Page layouts
    ├── space-layout.tsx       # Space page layout
    ├── feed-layout.tsx        # Feed page layout (future)
    └── [5+ more templates]
```

### 3.3 Shadcn/UI Foundation

```typescript
// All components built on shadcn/ui primitives
// Location: packages/ui/src/atomic/atoms/*

// Core Principles:
// 1. Radix UI primitives for accessibility
// 2. Tailwind CSS for styling
// 3. CVA (Class Variance Authority) for variants
// 4. Zero runtime CSS-in-JS

// Example: Button Component
// packages/ui/src/atomic/atoms/button.tsx

import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  // Base styles (always applied)
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-black hover:bg-darkGold",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-gold text-gold hover:bg-gold/10",
        ghost: "hover:bg-white/10 text-white",
        link: "text-gold underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// Usage in app
<Button variant="outline" size="lg">Join Space</Button>
```

---

## 4. Component Patterns

### 4.1 Card Patterns

#### Feed Post Card
```typescript
// Component: packages/ui/src/atomic/molecules/feed-post-card.tsx
// Used in: Feed stream, space post feeds

interface FeedPostCardProps {
  post: PostAggregate;
  author: ProfileAggregate;
  space: SpaceAggregate;
  promoted?: boolean;
  trending?: boolean;
  socialProof?: SocialProofData;
}

/**
 * Visual Structure:
 *
 * ┌─────────────────────────────────────┐
 * │ [Avatar] Author Name                │ Header
 * │          @spacename · 2h ago        │
 * │          🔥 Trending                │ (if trending)
 * ├─────────────────────────────────────┤
 * │ Jake, Sarah +3 reacted              │ Social Proof
 * ├─────────────────────────────────────┤
 * │ Post content text...                │ Content
 * │                                     │
 * │ [Image/Media if present]            │
 * ├─────────────────────────────────────┤
 * │ 👍 24  💬 12  🔁 5  ✍️             │ Actions
 * └─────────────────────────────────────┘
 */

<Card className={cn(
  "p-4 hover:bg-background-secondary/50 transition-colors cursor-pointer",
  promoted && "border-2 border-gold"
)}>
  <PostHeader>
    <div className="flex items-center gap-3">
      <Avatar src={author.avatar} size="md" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Link href={`/profile/${author.handle}`}>
            <Text weight="semibold">{author.displayName}</Text>
          </Link>
          {author.verified && <VerifiedBadge />}
        </div>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Link href={`/spaces/${space.slug}`}>
            @{space.handle}
          </Link>
          <span>·</span>
          <Timestamp date={post.createdAt} />
        </div>
      </div>
    </div>
    {trending && (
      <Badge variant="warning" className="ml-auto">
        🔥 Trending
      </Badge>
    )}
  </PostHeader>

  {socialProof && (
    <SocialProof className="mt-2 text-sm text-secondary">
      {formatSocialProof(socialProof)}
    </SocialProof>
  )}

  <PostContent className="mt-3">
    <Text>{post.content}</Text>
    {post.media && <MediaGallery media={post.media} />}
  </PostContent>

  <PostActions className="mt-4 flex items-center gap-6">
    <ActionButton icon={ThumbsUp} count={post.reactionCount} />
    <ActionButton icon={MessageCircle} count={post.commentCount} />
    <ActionButton icon={Repeat} count={post.repostCount} />
    <ActionButton icon={Edit3} label="Requote" />
  </PostActions>
</Card>
```

#### Space Card
```typescript
// Component: packages/ui/src/atomic/molecules/space-card.tsx
// Used in: Space discovery, "My Spaces" grid

interface SpaceCardProps {
  space: SpaceAggregate;
  membershipStatus: 'member' | 'pending' | 'none';
  showJoinButton?: boolean;
}

/**
 * Visual Structure:
 *
 * ┌─────────────────────────────┐
 * │                             │ Cover Image (16:9)
 * │        [Cover Photo]        │
 * │                             │
 * ├─────────────────────────────┤
 * │ Space Name                  │
 * │ @handle                     │
 * │ [Category] [Type] [Privacy] │ Badges
 * ├─────────────────────────────┤
 * │ Brief description...        │ Description
 * ├─────────────────────────────┤
 * │ 1,234 members · 456 posts   │ Stats
 * ├─────────────────────────────┤
 * │      [Join Button]          │ Action
 * └─────────────────────────────┘
 */

<Card className="overflow-hidden hover:shadow-lg transition-shadow">
  <div className="aspect-video relative">
    <Image
      src={space.coverImage}
      alt={space.name}
      fill
      className="object-cover"
    />
  </div>

  <CardContent className="p-4">
    <CardTitle>{space.name}</CardTitle>
    <Text size="sm" variant="secondary">@{space.handle}</Text>

    <div className="flex flex-wrap gap-2 mt-2">
      <Badge variant={getSpaceTypeColor(space.spaceType)}>
        {space.spaceType}
      </Badge>
      <Badge variant="outline">{space.category}</Badge>
      {space.privacy === 'private' && (
        <Badge variant="secondary">
          <Lock className="w-3 h-3" /> Private
        </Badge>
      )}
    </div>

    <Text size="sm" className="mt-3 line-clamp-2">
      {space.description}
    </Text>

    <div className="flex items-center gap-4 mt-4 text-sm text-secondary">
      <span>{formatNumber(space.memberCount)} members</span>
      <span>·</span>
      <span>{formatNumber(space.postCount)} posts</span>
    </div>
  </CardContent>

  <CardFooter className="p-4 pt-0">
    {membershipStatus === 'none' && showJoinButton && (
      <Button variant="outline" className="w-full">
        Join Space
      </Button>
    )}
    {membershipStatus === 'member' && (
      <Button variant="ghost" className="w-full">
        View Space
      </Button>
    )}
    {membershipStatus === 'pending' && (
      <Button variant="ghost" disabled className="w-full">
        Request Pending
      </Button>
    )}
  </CardFooter>
</Card>
```

#### Event Card (in Feed)
```typescript
// Component: packages/ui/src/atomic/molecules/feed-event-card.tsx
// Used in: Feed stream, space events section

interface EventCardProps {
  event: EventAggregate;
  space: SpaceAggregate;
  attendeePreview: ProfileAggregate[];
  userRSVP: RSVPStatus;
}

/**
 * Visual Structure:
 *
 * ┌─────────────────────────────────────┐
 * │ 📅 EVENT                            │ Event Badge
 * ├─────────────────────────────────────┤
 * │ [Cover Image]                       │ Event Cover
 * ├─────────────────────────────────────┤
 * │ Event Title                         │
 * │ Hosted by @spacename               │
 * ├─────────────────────────────────────┤
 * │ 📍 Location · 🕐 Tonight 8pm       │ Details
 * ├─────────────────────────────────────┤
 * │ [Avatar][Avatar][Avatar] +45 going │ Attendees
 * │ Jake and Sarah are going            │ Friends Going
 * ├─────────────────────────────────────┤
 * │ [🔥 Filling up: 23/30 spots]       │ Urgency (if limited)
 * ├─────────────────────────────────────┤
 * │      [RSVP Button]                  │ Action
 * └─────────────────────────────────────┘
 */

<Card className="border-2 border-blue-500/50 bg-blue-500/5">
  <Badge className="absolute top-2 left-2 bg-blue-500">
    📅 EVENT
  </Badge>

  {event.coverImage && (
    <div className="aspect-[2/1] relative">
      <Image
        src={event.coverImage}
        alt={event.title}
        fill
        className="object-cover"
      />
    </div>
  )}

  <CardContent className="p-4">
    <CardTitle>{event.title}</CardTitle>
    <Text size="sm" variant="secondary">
      Hosted by <Link href={`/spaces/${space.slug}`}>@{space.handle}</Link>
    </Text>

    <div className="flex items-center gap-4 mt-3 text-sm">
      <span className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {event.location}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {formatEventTime(event.startTime)}
      </span>
    </div>

    {attendeePreview.length > 0 && (
      <div className="mt-4">
        <div className="flex items-center -space-x-2">
          {attendeePreview.slice(0, 3).map(attendee => (
            <Avatar
              key={attendee.id}
              src={attendee.avatar}
              size="sm"
              className="border-2 border-background"
            />
          ))}
          {event.attendeeCount > 3 && (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs border-2 border-background">
              +{event.attendeeCount - 3}
            </div>
          )}
        </div>
        <Text size="sm" variant="secondary" className="mt-2">
          {formatFriendsGoing(attendeePreview)}
        </Text>
      </div>
    )}

    {event.capacity && event.attendeeCount / event.capacity > 0.7 && (
      <Alert variant="warning" className="mt-3">
        🔥 Filling up: {event.attendeeCount}/{event.capacity} spots
      </Alert>
    )}
  </CardContent>

  <CardFooter className="p-4 pt-0">
    {userRSVP === 'none' && (
      <Button className="w-full">RSVP for Event</Button>
    )}
    {userRSVP === 'going' && (
      <Button variant="outline" className="w-full">
        ✓ You're Going
      </Button>
    )}
  </CardFooter>
</Card>
```

### 4.2 List Patterns

#### Connection List
```typescript
// Component: packages/ui/src/atomic/organisms/connection-list.tsx
// Used in: Profile connections tab, search results

interface ConnectionListProps {
  connections: ProfileAggregate[];
  currentUserId: string;
  listType: 'connections' | 'followers' | 'following';
}

/**
 * Visual Pattern:
 *
 * ┌─────────────────────────────────────────┐
 * │ [Avatar] Name                           │
 * │          @handle                        │
 * │          CS '26 · 12 mutual connections │
 * │                          [Connect] ──────┤
 * ├─────────────────────────────────────────┤
 * │ [Avatar] Name                           │
 * │          @handle                        │
 * │          Bio preview text...            │
 * │                          [Connected] ───┤
 * └─────────────────────────────────────────┘
 */

<div className="space-y-2">
  {connections.map(connection => (
    <Card key={connection.id} className="p-4 hover:bg-secondary/50">
      <div className="flex items-start gap-3">
        <Link href={`/profile/${connection.handle}`}>
          <Avatar src={connection.avatar} size="lg" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/profile/${connection.handle}`}>
            <Text weight="semibold" className="hover:underline">
              {connection.displayName}
            </Text>
          </Link>
          <Text size="sm" variant="secondary">
            @{connection.handle}
          </Text>

          <div className="flex items-center gap-2 mt-1">
            <Text size="sm" variant="tertiary">
              {connection.major[0]} '{connection.graduationYear.toString().slice(-2)}
            </Text>
            {connection.mutualConnectionCount > 0 && (
              <>
                <span className="text-tertiary">·</span>
                <Text size="sm" variant="tertiary">
                  {connection.mutualConnectionCount} mutual
                </Text>
              </>
            )}
          </div>

          {connection.bio && (
            <Text size="sm" className="mt-2 line-clamp-2">
              {connection.bio}
            </Text>
          )}
        </div>

        <div className="shrink-0">
          <ConnectionButton
            userId={connection.id}
            currentStatus={getConnectionStatus(connection.id, currentUserId)}
          />
        </div>
      </div>
    </Card>
  ))}
</div>
```

#### Space Member List
```typescript
// Component: packages/ui/src/atomic/organisms/space-member-list.tsx
// Used in: Space members tab

interface SpaceMemberListProps {
  members: SpaceMemberAggregate[];
  currentUserId: string;
  currentUserIsLeader: boolean;
}

/**
 * Visual Pattern with Leader Controls:
 *
 * ┌─────────────────────────────────────────┐
 * │ [Avatar] Name                 [Leader]  │
 * │          @handle                        │
 * │          Joined Feb 2025                │
 * │          ··· [More Actions] ────────────┤ (if leader)
 * ├─────────────────────────────────────────┤
 * │ [Avatar] Name                           │
 * │          @handle                        │
 * │          Joined Mar 2025                │
 * │          ··· [More Actions] ────────────┤
 * └─────────────────────────────────────────┘
 */

// Leaders shown first, then by join date
const sortedMembers = [
  ...members.filter(m => m.isLeader),
  ...members.filter(m => !m.isLeader).sort(byJoinDate)
];

<div className="space-y-2">
  {sortedMembers.map(member => (
    <Card key={member.userId} className="p-4">
      <div className="flex items-start gap-3">
        <Avatar src={member.profile.avatar} size="md" />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/profile/${member.profile.handle}`}>
              <Text weight="semibold">{member.profile.displayName}</Text>
            </Link>
            {member.isLeader && (
              <Badge variant="gold" size="sm">Leader</Badge>
            )}
          </div>
          <Text size="sm" variant="secondary">
            @{member.profile.handle}
          </Text>
          <Text size="xs" variant="tertiary" className="mt-1">
            Joined {formatDate(member.joinedAt)}
          </Text>
        </div>

        {currentUserIsLeader && !member.isLeader && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Make Leader</DropdownMenuItem>
              <DropdownMenuItem>Remove from Space</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Card>
  ))}
</div>
```

### 4.3 Modal/Dialog Patterns

#### Space Creation Modal
```typescript
// Component: Part of space creation flow
// Triggered from: "Create Space" button in /spaces

interface SpaceCreationModalProps {
  onClose: () => void;
  onSuccess: (space: SpaceAggregate) => void;
}

/**
 * Multi-step modal flow:
 *
 * Step 1: Basic Info
 * ┌─────────────────────────────────────────┐
 * │ ✕                   Create Space    [1/3]│
 * ├─────────────────────────────────────────┤
 * │ Space Name                              │
 * │ ┌─────────────────────────────────────┐ │
 * │ │ [Input field]                       │ │
 * │ └─────────────────────────────────────┘ │
 * │                                         │
 * │ Handle                                  │
 * │ ┌─────────────────────────────────────┐ │
 * │ │ @[auto-generated or custom]         │ │
 * │ └─────────────────────────────────────┘ │
 * │                                         │
 * │ Category                                │
 * │ ┌─────────────────────────────────────┐ │
 * │ │ [Dropdown: Greek, Academic, etc.]   │ │
 * │ └─────────────────────────────────────┘ │
 * │                                         │
 * │              [Cancel] [Next →]          │
 * └─────────────────────────────────────────┘
 *
 * Step 2: Description & Media
 * Step 3: Privacy & Settings
 */

<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Create Space</DialogTitle>
      <div className="flex items-center gap-2 mt-2">
        {[1, 2, 3].map(step => (
          <div
            key={step}
            className={cn(
              "h-1 flex-1 rounded-full",
              step <= currentStep ? "bg-gold" : "bg-secondary"
            )}
          />
        ))}
      </div>
    </DialogHeader>

    <Form {...form}>
      {currentStep === 1 && <BasicInfoStep />}
      {currentStep === 2 && <DescriptionStep />}
      {currentStep === 3 && <SettingsStep />}
    </Form>

    <DialogFooter>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      {currentStep > 1 && (
        <Button variant="outline" onClick={handleBack}>
          ← Back
        </Button>
      )}
      {currentStep < 3 ? (
        <Button onClick={handleNext}>
          Next →
        </Button>
      ) : (
        <Button onClick={handleCreate} loading={isCreating}>
          Create Space
        </Button>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Requote Modal
```typescript
// Component: Inline modal for adding commentary to repost
// Triggered from: Requote button on post

interface RequoteModalProps {
  originalPost: PostAggregate;
  onClose: () => void;
  onSubmit: (quote: string) => Promise<void>;
}

/**
 * Visual Pattern:
 *
 * ┌─────────────────────────────────────────┐
 * │ ✕              Add Your Take            │
 * ├─────────────────────────────────────────┤
 * │ ┌─────────────────────────────────────┐ │
 * │ │ What's your take on this?           │ │ Textarea
 * │ │ [Cursor]                            │ │
 * │ │                                     │ │
 * │ │                        280/280 ─────┤ │ Character count
 * │ └─────────────────────────────────────┘ │
 * │                                         │
 * │ ┌─ Original Post ────────────────────┐ │
 * │ │ [Avatar] Name @space                │ │
 * │ │ Original post content...            │ │ Preview (read-only)
 * │ │ 👍 24  💬 12  🔁 5                  │ │
 * │ └─────────────────────────────────────┘ │
 * │                                         │
 * │              [Cancel] [Requote]         │
 * └─────────────────────────────────────────┘
 */

<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle>Add Your Take</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="What's your take on this?"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          maxLength={280}
          rows={3}
          className="resize-none"
        />
        <Text
          size="xs"
          variant="tertiary"
          className="absolute bottom-2 right-2"
        >
          {quoteText.length}/280
        </Text>
      </div>

      <div className="border border-secondary rounded-lg p-3 bg-secondary/30">
        <div className="pointer-events-none">
          <FeedPostCard
            post={originalPost}
            compact
            actionsDisabled
          />
        </div>
      </div>
    </div>

    <DialogFooter>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button
        onClick={handleRequote}
        disabled={quoteText.length === 0}
        loading={isSubmitting}
      >
        Requote
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 5. Interaction Patterns

### 5.1 Navigation Patterns

#### Bottom Navigation (Mobile)
```typescript
/**
 * Mobile navigation pattern
 * Location: Fixed bottom of screen
 * Height: 64px + safe area insets
 * Behavior: Always visible, scrolls with content hidden
 *
 * Visual Pattern:
 *
 * ┌────────┬────────┬────────┬────────┬────────┐
 * │  Home  │ Spaces │HiveLab │Profile │  Bell  │
 * │   🏠   │   📁   │   ✨   │   👤   │   🔔   │
 * │ [gold] │ [gray] │ [gray] │ [gray] │  [3]   │ <- Badge
 * └────────┴────────┴────────┴────────┴────────┘
 */

<nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-secondary pb-safe">
  <div className="flex items-center justify-around h-16">
    {primaryNav.map(item => (
      <Link
        key={item.route}
        href={item.route}
        className={cn(
          "flex flex-col items-center justify-center gap-1 flex-1 h-full",
          "transition-colors",
          isActive(item.route) ? "text-gold" : "text-secondary"
        )}
      >
        <div className="relative">
          <item.icon className="w-6 h-6" />
          {item.badge && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 min-w-5 px-1"
            >
              {item.badge}
            </Badge>
          )}
        </div>
        <Text size="xs">{item.label}</Text>
      </Link>
    ))}
  </div>
</nav>
```

#### Sidebar Navigation (Desktop)
```typescript
/**
 * Desktop navigation pattern
 * Location: Fixed left side of screen
 * Width: 240px (collapsed: 72px)
 * Behavior: Persistent, can collapse to icons only
 *
 * Visual Pattern (Expanded):
 *
 * ┌──────────────────┐
 * │                  │
 * │  🐝 HIVE         │ Logo
 * │                  │
 * ├──────────────────┤
 * │ 🏠 Feed          │ Active (gold)
 * │ 📁 Spaces    [3] │ With badge
 * │ ✨ HiveLab       │
 * │ 👤 Profile       │
 * │                  │
 * ├──────────────────┤
 * │ My Spaces        │ Section
 * │ • CS Students    │
 * │ • UB Gaming      │
 * │ • Clemens Hall   │
 * │   + Join Space   │
 * │                  │
 * ├──────────────────┤
 * │ [Avatar]         │
 * │ Your Name        │
 * │ Settings  Logout │
 * └──────────────────┘
 */

<aside className={cn(
  "fixed left-0 top-0 bottom-0 bg-background border-r border-secondary",
  "transition-all duration-300",
  isCollapsed ? "w-18" : "w-60"
)}>
  <div className="flex flex-col h-full p-4">
    {/* Logo */}
    <div className="mb-8">
      <HiveLogo size={isCollapsed ? "icon" : "full"} />
    </div>

    {/* Primary Nav */}
    <nav className="space-y-2">
      {primaryNav.map(item => (
        <Link
          key={item.route}
          href={item.route}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg",
            "transition-colors",
            isActive(item.route)
              ? "bg-gold/10 text-gold"
              : "hover:bg-secondary/50"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && <Badge size="sm">{item.badge}</Badge>}
            </>
          )}
        </Link>
      ))}
    </nav>

    {/* Quick Access Spaces */}
    {!isCollapsed && (
      <div className="mt-8">
        <Text size="xs" variant="tertiary" className="px-3 mb-2">
          My Spaces
        </Text>
        <div className="space-y-1">
          {quickAccessSpaces.map(space => (
            <Link
              key={space.id}
              href={`/spaces/${space.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/50"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <Text size="sm" className="truncate">{space.name}</Text>
            </Link>
          ))}
        </div>
      </div>
    )}

    {/* User Menu */}
    <div className="mt-auto">
      <UserMenuDropdown collapsed={isCollapsed} />
    </div>
  </div>
</aside>
```

### 5.2 Scroll Patterns

#### Infinite Scroll (Feed)
```typescript
/**
 * Infinite scroll implementation
 * Used in: Feed, space post lists
 * Library: React Intersection Observer
 *
 * Behavior:
 * - Loads 20 posts initially
 * - Triggers next load when bottom sentinel is visible
 * - Shows skeleton loaders while loading
 * - Handles end of feed gracefully
 */

const Feed = () => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '400px' // Start loading before user reaches bottom
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 0 }) => fetchFeedPage(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="space-y-4">
      {data?.pages.map(page =>
        page.posts.map(post => (
          <FeedPostCard key={post.id} {...post} />
        ))
      )}

      {/* Loading sentinel */}
      <div ref={loadMoreRef}>
        {isFetchingNextPage && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <FeedPostSkeleton key={i} />)}
          </div>
        )}
      </div>

      {/* End of feed */}
      {!hasNextPage && (
        <div className="text-center py-8">
          <Text variant="secondary">
            You're all caught up! 🎉
          </Text>
        </div>
      )}
    </div>
  );
};
```

#### Pull-to-Refresh (Mobile)
```typescript
/**
 * Pull-to-refresh pattern
 * Used in: Feed, space post lists (mobile only)
 * Library: Custom implementation
 *
 * Behavior:
 * - User pulls down from top
 * - Visual indicator shows refresh state
 * - Fetches latest content
 * - Smooth animation back to top
 */

const PullToRefresh = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (startY === null || window.scrollY > 0) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.min(currentY - startY, 120); // Max 120px

    if (distance > 0) {
      setPullDistance(distance);
      e.preventDefault(); // Prevent scroll
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 60) { // Threshold to trigger
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Refresh indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center transition-transform"
        style={{
          transform: `translateY(${pullDistance - 60}px)`,
          opacity: pullDistance / 60
        }}
      >
        {isRefreshing ? (
          <Spinner />
        ) : (
          <ArrowDown
            className="w-6 h-6"
            style={{
              transform: `rotate(${pullDistance * 3}deg)`
            }}
          />
        )}
      </div>

      {children}
    </div>
  );
};
```

### 5.3 Gesture Patterns (Mobile)

#### Swipe Actions on Cards
```typescript
/**
 * Swipe-to-action pattern
 * Used in: Notifications, messages (future)
 * Library: react-swipeable
 *
 * Behavior:
 * - Swipe right: Mark as read / Archive
 * - Swipe left: Delete / More actions
 * - Haptic feedback on action threshold
 */

const SwipeableNotification = ({ notification }) => {
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipeOffset(eventData.deltaX);
    },
    onSwipedLeft: () => {
      if (Math.abs(swipeOffset) > 100) {
        handleDelete();
      }
      setSwipeOffset(0);
    },
    onSwipedRight: () => {
      if (swipeOffset > 100) {
        handleMarkRead();
      }
      setSwipeOffset(0);
    },
    trackMouse: false // Touch only
  });

  return (
    <div className="relative overflow-hidden">
      {/* Background actions */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className={cn(
          "flex items-center gap-2 text-green-500",
          "transition-opacity",
          swipeOffset > 50 ? "opacity-100" : "opacity-0"
        )}>
          <Check className="w-5 h-5" />
          <span>Read</span>
        </div>

        <div className={cn(
          "flex items-center gap-2 text-red-500",
          "transition-opacity",
          swipeOffset < -50 ? "opacity-100" : "opacity-0"
        )}>
          <span>Delete</span>
          <Trash className="w-5 h-5" />
        </div>
      </div>

      {/* Notification card */}
      <div
        {...handlers}
        className="relative bg-background"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 ? 'transform 0.2s' : 'none'
        }}
      >
        <NotificationCard notification={notification} />
      </div>
    </div>
  );
};
```

### 5.4 Search Patterns

#### Global Search
```typescript
/**
 * Command palette style search
 * Trigger: Cmd+K / Ctrl+K
 * Used for: Finding spaces, people, posts
 *
 * Visual Pattern:
 *
 * ┌─────────────────────────────────────────┐
 * │ 🔍 Search HIVE...                       │
 * ├─────────────────────────────────────────┤
 * │ Spaces                                  │
 * │  📁 CS Students                 234 →   │
 * │  📁 UB Gaming                   156 →   │
 * │                                         │
 * │ People                                  │
 * │  👤 Jake Miller @jmiller         →      │
 * │  👤 Sarah Chen @schen            →      │
 * │                                         │
 * │ Posts                                   │
 * │  📝 Study group tonight...       →      │
 * └─────────────────────────────────────────┘
 */

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchGlobal(query),
    enabled: query.length >= 2,
    staleTime: 0 // Fresh search each time
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Search spaces, people, posts..."
        value={query}
        onValueChange={setQuery}
      />

      <CommandList>
        {isLoading && <CommandLoading>Searching...</CommandLoading>}

        {data?.spaces && data.spaces.length > 0 && (
          <CommandGroup heading="Spaces">
            {data.spaces.map(space => (
              <CommandItem
                key={space.id}
                onSelect={() => navigate(`/spaces/${space.slug}`)}
              >
                <Grid className="w-4 h-4 mr-2" />
                <span>{space.name}</span>
                <span className="ml-auto text-xs text-secondary">
                  {space.memberCount} members
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {data?.people && data.people.length > 0 && (
          <CommandGroup heading="People">
            {data.people.map(person => (
              <CommandItem
                key={person.id}
                onSelect={() => navigate(`/profile/${person.handle}`)}
              >
                <Avatar src={person.avatar} size="xs" className="mr-2" />
                <span>{person.displayName}</span>
                <span className="ml-2 text-xs text-secondary">
                  @{person.handle}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {data?.posts && data.posts.length > 0 && (
          <CommandGroup heading="Posts">
            {data.posts.map(post => (
              <CommandItem
                key={post.id}
                onSelect={() => navigate(`/posts/${post.id}`)}
              >
                <FileText className="w-4 h-4 mr-2" />
                <span className="truncate">{post.content}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  );
};
```

---

## 6. Behavioral Psychology Integration

### 6.1 Variable Ratio Reinforcement

```typescript
/**
 * Slot machine dynamics in feed algorithm
 * Domain: packages/core/src/domain/feed/services/feed-algorithm.service.ts
 * UI Implementation: Random highlight, surprise discoveries
 */

// Not every scroll reveals gold
interface VariableRewardPattern {
  // Random factor: 0 to 0.2 of total score
  randomBoost: (baseScore: number) => number;

  // Surprise discoveries every ~30 posts
  surpriseFrequency: 30;

  // Visual treatment for "lucky" posts
  highlightTreatment: {
    border: 'gold shimmer',
    badge: '✨ Discover',
    animation: 'gentle pulse'
  };

  // Psychology: Keep users scrolling for next dopamine hit
  mechanism: 'intermittent reinforcement';
}

// UI Implementation
const FeedPost = ({ post, algorithmData }) => {
  const isLuckyPost = algorithmData.variableReward > 0.15;

  return (
    <Card className={cn(
      isLuckyPost && "border-gold/50 animate-shimmer"
    )}>
      {isLuckyPost && (
        <Badge className="absolute -top-2 left-4 bg-gold text-black">
          ✨ Discover
        </Badge>
      )}
      {/* Rest of post */}
    </Card>
  );
};
```

### 6.2 Investment Escalation

```typescript
/**
 * Progressive engagement ladder
 * Each action requires slightly more investment
 * UI Design: Make next step feel easy
 */

interface EngagementLadder {
  steps: [
    {
      action: 'view',
      cost: 'Zero - just scroll',
      ui: 'Passive, no interaction needed'
    },
    {
      action: 'react',
      cost: 'One tap - quick emotion',
      ui: 'Large tap target, instant feedback'
    },
    {
      action: 'comment',
      cost: 'Type response - share thought',
      ui: 'Inline reply, pre-filled @mentions'
    },
    {
      action: 'repost',
      cost: 'Public endorsement',
      ui: 'One-tap with preview confirmation'
    },
    {
      action: 'requote',
      cost: 'Original commentary',
      ui: 'Modal with original post context'
    }
  ];
}

// UI Implementation - Each step easier than it looks
<PostActions>
  {/* View: Already happening */}

  {/* React: One tap, instant */}
  <ReactionButton
    onClick={handleReact} // Immediate, no modal
    size="lg" // Easy to tap
    hapticFeedback
  />

  {/* Comment: Inline, feels lightweight */}
  <CommentButton
    onClick={() => focusCommentInput()} // Scroll to input
    size="lg"
  />

  {/* Repost: One tap, quick confirmation */}
  <RepostButton
    onClick={handleRepost} // Toast confirmation
    size="lg"
  />

  {/* Requote: Full modal, but pre-filled context */}
  <RequoteButton
    onClick={openRequoteModal} // Modal with original post
    size="lg"
  />
</PostActions>
```

### 6.3 Social Proof Signals

```typescript
/**
 * Leverage social proof to drive engagement
 * Show friends' activity prominently
 */

interface SocialProofPattern {
  // Friend activity shown first
  friendsWhoReacted: {
    display: "Jake, Sarah +3 reacted",
    maxNamesShown: 2,
    emphasis: "bold friend names"
  };

  // Trending indicators
  trendingInContext: {
    display: "Trending in CS majors",
    contextTypes: ['major', 'dorm', 'year', 'spaces'],
    threshold: '10+ reactions in 5 minutes'
  };

  // FOMO generation
  scarcity: {
    events: "23/30 spots - Filling up!",
    spaces: "12 friends are members",
    posts: "143 people are talking about this"
  };
}

// UI Implementation
const SocialProofSection = ({ post, user }) => {
  const friendsWhoReacted = getFriendsWhoReacted(post, user);
  const trendingContext = getTrendingContext(post, user);

  return (
    <div className="mt-2 space-y-1">
      {friendsWhoReacted.length > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <div className="flex -space-x-1">
            {friendsWhoReacted.slice(0, 3).map(friend => (
              <Avatar
                key={friend.id}
                src={friend.avatar}
                size="xs"
                className="border-2 border-background"
              />
            ))}
          </div>
          <Text size="sm" weight="medium">
            {formatFriendNames(friendsWhoReacted)}
          </Text>
          <Text size="sm" variant="secondary">
            {friendsWhoReacted.length > 1 ? 'reacted' : 'reacted'}
          </Text>
        </div>
      )}

      {trendingContext && (
        <div className="flex items-center gap-1.5 text-sm text-secondary">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Trending in {trendingContext}</span>
        </div>
      )}
    </div>
  );
};
```

### 6.4 FOMO Generation

```typescript
/**
 * Fear of missing out - drives urgency
 * Used in events, limited spaces, trending content
 */

interface FOMOPattern {
  // Event urgency
  eventUrgency: {
    startingSoon: {
      threshold: '< 2 hours',
      badge: '🔴 Starting Soon',
      color: 'red',
      pulse: true
    },
    tonight: {
      threshold: 'Same day',
      badge: '🟡 Tonight',
      color: 'yellow'
    },
    fillingUp: {
      threshold: '> 70% capacity',
      display: '🔥 Filling up: 23/30 spots',
      color: 'orange'
    }
  };

  // Space scarcity
  spaceScarcity: {
    private: "Invite-only - 12 friends are members",
    limited: "Limited to 100 members - 87 joined",
    exclusive: "Greek life only"
  };

  // Content velocity
  contentVelocity: {
    trending: "143 people are talking about this",
    viral: "🔥 Going viral on campus",
    breaking: "📰 Breaking: Just posted"
  };
}

// UI Implementation
const EventUrgencyBadge = ({ event }) => {
  const urgency = calculateUrgency(event);

  if (!urgency) return null;

  return (
    <Alert
      variant={urgency.variant}
      className={cn(
        urgency.pulse && "animate-pulse"
      )}
    >
      <Clock className="w-4 h-4" />
      <AlertTitle>{urgency.title}</AlertTitle>
      <AlertDescription>
        {urgency.description}
      </AlertDescription>
    </Alert>
  );
};

// Example: Event starting soon
<EventCard>
  {/* ... event details ... */}

  <EventUrgencyBadge event={event} />
  {/* Shows: "🔴 Starting in 45 minutes" */}

  {event.capacity && event.attendeeCount / event.capacity > 0.7 && (
    <Alert variant="warning">
      🔥 Filling up: {event.attendeeCount}/{event.capacity} spots
    </Alert>
  )}

  {event.friendsAttending.length > 0 && (
    <div className="flex items-center gap-2">
      <AvatarGroup users={event.friendsAttending} max={3} />
      <Text size="sm" weight="medium">
        {event.friendsAttending.length} friends are going
      </Text>
    </div>
  )}
</EventCard>
```

### 6.5 Completion Psychology

```typescript
/**
 * Progress indicators drive completion
 * Used in: Onboarding, profile setup, ritual participation
 */

interface CompletionPattern {
  // Profile completion
  profileCompletion: {
    metrics: [
      'Avatar uploaded',
      'Bio written',
      'Interests selected',
      'Spaces joined',
      'Connections made'
    ],
    threshold: '80% = "Great profile!"',
    incentive: 'Show up better in search'
  };

  // Onboarding flow
  onboardingProgress: {
    steps: 7,
    showProgress: 'Top of screen',
    saveProgress: 'Can resume later',
    celebration: 'Confetti on completion'
  };

  // Ritual streaks
  ritualStreak: {
    display: '🔥 7 day streak',
    breakWarning: 'Check in today to keep streak!',
    reward: 'Badge at 30 days'
  };
}

// UI Implementation
const ProfileCompletionCard = ({ user }) => {
  const completion = calculateProfileCompletion(user);

  return (
    <Card className="p-4 bg-blue-500/10 border-blue-500/50">
      <div className="flex items-start justify-between">
        <div>
          <Text weight="semibold">Complete Your Profile</Text>
          <Text size="sm" variant="secondary">
            {completion.percentage}% complete
          </Text>
        </div>
        <Badge variant="blue">{completion.percentage}%</Badge>
      </div>

      <Progress value={completion.percentage} className="mt-3" />

      <div className="mt-4 space-y-2">
        {completion.tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-2 text-sm"
          >
            {task.complete ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Circle className="w-4 h-4 text-secondary" />
            )}
            <span className={task.complete ? 'text-secondary line-through' : ''}>
              {task.label}
            </span>
          </div>
        ))}
      </div>

      {completion.nextAction && (
        <Button className="w-full mt-4" onClick={completion.nextAction.handler}>
          {completion.nextAction.label}
        </Button>
      )}
    </Card>
  );
};
```

---

## 7. Responsive Design System

### 7.1 Breakpoint Strategy

```typescript
/**
 * Mobile-first responsive design
 * Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
 */

const responsivePatterns = {
  // Navigation
  navigation: {
    mobile: 'Bottom navigation bar',
    tablet: 'Bottom navigation bar',
    desktop: 'Left sidebar (240px)',
    largeDesktop: 'Left sidebar (280px)'
  },

  // Feed layout
  feedLayout: {
    mobile: {
      width: '100%',
      padding: 'px-4',
      postsPerRow: 1
    },
    tablet: {
      width: '100%',
      padding: 'px-6',
      postsPerRow: 1
    },
    desktop: {
      width: '600px',
      padding: '0',
      postsPerRow: 1,
      centered: true
    },
    largeDesktop: {
      width: '700px',
      padding: '0',
      postsPerRow: 1,
      centered: true
    }
  },

  // Space discovery grid
  spaceGrid: {
    mobile: {
      columns: 1,
      gap: '4'
    },
    tablet: {
      columns: 2,
      gap: '6'
    },
    desktop: {
      columns: 3,
      gap: '6'
    },
    largeDesktop: {
      columns: 4,
      gap: '8'
    }
  },

  // Profile layout
  profileLayout: {
    mobile: {
      layout: 'single-column',
      headerHeight: '200px',
      avatarSize: '96px'
    },
    tablet: {
      layout: 'single-column',
      headerHeight: '240px',
      avatarSize: '120px'
    },
    desktop: {
      layout: 'two-column', // Left: Profile info, Right: Content
      headerHeight: '280px',
      avatarSize: '150px'
    }
  },

  // Modal sizing
  modalSizing: {
    mobile: {
      width: '100%',
      height: '100%',
      borderRadius: '0',
      position: 'fixed bottom-0' // Slide up from bottom
    },
    tablet: {
      width: '90%',
      maxWidth: '600px',
      height: 'auto',
      borderRadius: 'lg',
      position: 'centered'
    },
    desktop: {
      width: 'auto',
      maxWidth: '800px',
      height: 'auto',
      borderRadius: 'xl',
      position: 'centered'
    }
  }
};
```

### 7.2 Responsive Component Example

```typescript
/**
 * Space Detail Page - Responsive Layout
 */

const SpaceDetailPage = ({ space }) => {
  return (
    <>
      {/* Mobile: Full width, stacked */}
      <div className="lg:hidden">
        <SpaceHeader space={space} />
        <SpaceNavigation />
        {isLeader && <LeaderToolbar />}
        <SpaceContent />
      </div>

      {/* Desktop: 60/40 split */}
      <div className="hidden lg:flex gap-6">
        {/* Main content (60%) */}
        <div className="flex-[3]">
          <SpaceHeader space={space} />
          <SpaceNavigation />
          <SpaceContent />
        </div>

        {/* Sidebar (40%) */}
        <div className="flex-[2] sticky top-4 h-fit">
          {isLeader && <LeaderToolbar />}
          <SpaceAboutSection space={space} />
          <SpaceMembersPreview members={space.topMembers} />
          <SpaceEventsPreview events={space.upcomingEvents} />
        </div>
      </div>
    </>
  );
};
```

### 7.3 Typography Scaling

```typescript
/**
 * Responsive typography system
 * Scales based on viewport width
 */

const typographyScale = {
  // Headings
  h1: {
    mobile: 'text-2xl', // 24px
    tablet: 'text-3xl', // 30px
    desktop: 'text-4xl' // 36px
  },
  h2: {
    mobile: 'text-xl', // 20px
    tablet: 'text-2xl', // 24px
    desktop: 'text-3xl' // 30px
  },
  h3: {
    mobile: 'text-lg', // 18px
    tablet: 'text-xl', // 20px
    desktop: 'text-2xl' // 24px
  },

  // Body text (stays consistent)
  body: {
    mobile: 'text-base', // 16px
    tablet: 'text-base', // 16px
    desktop: 'text-base' // 16px
  },

  // Small text
  small: {
    mobile: 'text-sm', // 14px
    tablet: 'text-sm', // 14px
    desktop: 'text-sm' // 14px
  }
};

// Usage with Tailwind responsive classes
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  {space.name}
</h1>
```

### 7.4 Touch Target Sizing

```typescript
/**
 * Ensure touch targets are at least 44x44px
 * Mobile: Larger tap targets, more spacing
 * Desktop: Smaller, more compact
 */

const interactiveSizing = {
  button: {
    mobile: {
      minHeight: '44px',
      minWidth: '44px',
      padding: 'px-6 py-3'
    },
    desktop: {
      minHeight: '40px',
      minWidth: '40px',
      padding: 'px-4 py-2'
    }
  },

  iconButton: {
    mobile: {
      size: '48px', // Larger for thumbs
      iconSize: '24px'
    },
    desktop: {
      size: '40px',
      iconSize: '20px'
    }
  },

  checkbox: {
    mobile: '24px',
    desktop: '20px'
  },

  // List items (e.g., space members)
  listItem: {
    mobile: {
      minHeight: '60px',
      padding: 'p-4'
    },
    desktop: {
      minHeight: '48px',
      padding: 'p-3'
    }
  }
};
```

---

## 8. Accessibility Standards

### 8.1 WCAG 2.1 AA Compliance

```typescript
/**
 * Accessibility requirements for all components
 */

const accessibilityStandards = {
  // Color contrast
  contrast: {
    normalText: '4.5:1 minimum',
    largeText: '3:1 minimum', // 18pt or 14pt bold
    uiComponents: '3:1 minimum',

    // HIVE specific
    goldOnBlack: '✓ 7.2:1', // Exceeds standards
    whiteOnBlack: '✓ 21:1', // Maximum contrast
    secondaryText: '✓ 4.6:1' // #A0A0A0 on #0A0A0A
  },

  // Keyboard navigation
  keyboard: {
    allInteractive: 'Tab-accessible',
    visualFocus: 'Visible focus ring (gold)',
    escapeKey: 'Closes modals',
    enterKey: 'Activates buttons',
    arrowKeys: 'Navigate lists/dropdowns'
  },

  // Screen reader support
  screenReader: {
    semanticHTML: 'Use <nav>, <main>, <article>',
    ariaLabels: 'All icons and actions labeled',
    ariaLive: 'Dynamic content announces',
    altText: 'All images have alt text',
    headingStructure: 'Logical H1-H6 hierarchy'
  },

  // Touch accessibility
  touch: {
    targetSize: '44x44px minimum',
    spacing: '8px between targets',
    gestureAlternatives: 'Swipes have button alternatives'
  },

  // Reduced motion
  reducedMotion: {
    respectPreference: 'prefers-reduced-motion',
    animations: 'Disable if preferred',
    transitions: 'Instant instead of animated'
  }
};
```

### 8.2 Focus Management

```typescript
/**
 * Focus management for keyboard navigation
 */

// Focus ring styling
const focusRingClasses = cn(
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-gold',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background'
);

// Modal focus trap
const ModalDialog = ({ isOpen, onClose, children }) => {
  const firstFocusableRef = useRef<HTMLElement>(null);
  const lastFocusableRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus first element when modal opens
      firstFocusableRef.current?.focus();

      // Return focus to trigger element when modal closes
      const previousFocus = document.activeElement;
      return () => {
        (previousFocus as HTMLElement)?.focus();
      };
    }
  }, [isOpen]);

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Trap focus within modal
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onKeyDown={handleTabKey}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
```

### 8.3 ARIA Patterns

```typescript
/**
 * Common ARIA patterns used throughout HIVE
 */

// Button with icon only
<button
  aria-label="Close modal"
  className={focusRingClasses}
>
  <X className="w-5 h-5" aria-hidden="true" />
</button>

// Toggle button (e.g., join space)
<button
  aria-pressed={isJoined}
  aria-label={isJoined ? "Leave space" : "Join space"}
>
  {isJoined ? "Joined" : "Join"}
</button>

// Loading state
<button
  disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? (
    <>
      <Spinner aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </>
  ) : (
    "Submit"
  )}
</button>

// Live region for dynamic content
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {notification && notification.message}
</div>

// Navigation landmark
<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>

// Dialog/Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Create Space</h2>
  <p id="dialog-description">Fill out the form to create a new space</p>
</div>

// Expandable section
<details>
  <summary
    aria-expanded={isOpen}
    aria-controls="section-content"
  >
    More details
  </summary>
  <div id="section-content">
    {/* Content */}
  </div>
</details>
```

---

## 9. Performance Requirements

### 9.1 Core Web Vitals Targets

```typescript
/**
 * Performance budgets and targets
 */

const performanceTargets = {
  // Largest Contentful Paint (LCP)
  lcp: {
    target: '< 2.5s',
    feed: '< 2.0s', // Critical path
    spaces: '< 2.5s',
    profile: '< 2.5s'
  },

  // First Input Delay (FID)
  fid: {
    target: '< 100ms',
    allPages: '< 100ms'
  },

  // Cumulative Layout Shift (CLS)
  cls: {
    target: '< 0.1',
    strategies: [
      'Reserve space for images with aspect-ratio',
      'Use skeleton loaders',
      'Avoid inserting content above viewport'
    ]
  },

  // Time to Interactive (TTI)
  tti: {
    target: '< 3.8s',
    feed: '< 3.0s'
  },

  // First Contentful Paint (FCP)
  fcp: {
    target: '< 1.8s',
    allPages: '< 1.8s'
  }
};
```

### 9.2 Image Optimization

```typescript
/**
 * Image handling and optimization
 */

const imageOptimization = {
  // All images use next/image
  component: 'next/image',

  // Avatar images
  avatar: {
    sizes: {
      xs: '32px',
      sm: '40px',
      md: '48px',
      lg: '96px',
      xl: '150px'
    },
    format: 'WebP with JPEG fallback',
    quality: 85,
    aspectRatio: '3:4' // Portrait
  },

  // Cover images
  coverImage: {
    sizes: {
      space: '1200x675', // 16:9
      profile: '1500x500', // 3:1
      event: '1200x600'   // 2:1
    },
    format: 'WebP',
    quality: 80,
    placeholder: 'blur' // LQIP (Low Quality Image Placeholder)
  },

  // Post media
  postMedia: {
    maxSize: '5MB',
    maxDimensions: '2048x2048',
    format: 'WebP',
    quality: 85,
    lazy: true // Lazy load below fold
  },

  // Responsive images
  responsive: {
    srcSet: 'Auto-generated by next/image',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }
};

// Usage example
<Image
  src={space.coverImage}
  alt={`Cover image for ${space.name}`}
  width={1200}
  height={675}
  quality={80}
  placeholder="blur"
  blurDataURL={space.coverImageBlur}
  sizes="(max-width: 768px) 100vw, 1200px"
  className="object-cover"
/>
```

### 9.3 Code Splitting

```typescript
/**
 * Dynamic imports and code splitting strategy
 */

// Route-based code splitting (automatic with Next.js App Router)
// Each page in app/ directory is automatically a code split point

// Component-based code splitting
const HiveLabBuilder = dynamic(
  () => import('@/components/hivelab/builder-canvas'),
  {
    loading: () => <BuilderSkeleton />,
    ssr: false // Client-side only
  }
);

const ProfileBentoGrid = dynamic(
  () => import('@hive/ui/organisms/profile-bento-grid'),
  {
    loading: () => <GridSkeleton />,
    ssr: true
  }
);

// Heavy libraries loaded on-demand
const ReactCrop = dynamic(
  () => import('react-image-crop'),
  { ssr: false }
);

// Analytics loaded after page interactive
useEffect(() => {
  if (typeof window !== 'undefined') {
    import('@hive/analytics').then(({ initAnalytics }) => {
      initAnalytics();
    });
  }
}, []);
```

### 9.4 Caching Strategy

```typescript
/**
 * Data fetching and caching patterns
 */

const cachingStrategy = {
  // React Query configuration
  reactQuery: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        retry: 2
      }
    }
  },

  // Route-specific caching
  routes: {
    feed: {
      staleTime: 30 * 1000, // 30 seconds (fresh content)
      cacheTime: 5 * 60 * 1000,
      refetchInterval: 60 * 1000 // Poll every minute
    },
    spaces: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000 // 30 minutes
    },
    profile: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 60 * 60 * 1000 // 1 hour
    }
  },

  // Firebase offline persistence
  firebase: {
    enablePersistence: true,
    cacheSizeBytes: 40 * 1024 * 1024 // 40MB
  },

  // Service Worker caching (future)
  serviceWorker: {
    strategy: 'NetworkFirst for API, CacheFirst for static assets',
    version: 'v1'
  }
};
```

---

## 10. Animation & Motion

### 10.1 Animation Principles

```typescript
/**
 * Animation guidelines following Material Motion
 */

const animationPrinciples = {
  // Duration based on distance
  duration: {
    instant: '0ms', // Toggle states
    fast: '150ms', // Hover, focus
    base: '200ms', // Most transitions
    slow: '300ms', // Enter/exit
    slower: '500ms' // Complex choreography
  },

  // Easing functions
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)', // Default
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)', // Enter
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)', // Exit
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)' // Quick transitions
  },

  // Respect user preferences
  reducedMotion: '@media (prefers-reduced-motion: reduce)',

  // Performance
  gpuAccelerated: 'transform and opacity only',
  avoidReflow: 'No width/height animations'
};
```

### 10.2 Common Animations

```typescript
/**
 * Reusable animation patterns
 */

// Fade in/out
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  exit="exit"
  variants={fadeVariants}
>
  {content}
</motion.div>

// Slide up from bottom (mobile modals)
const slideUpVariants = {
  hidden: {
    y: '100%',
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300
    }
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Scale up (buttons, cards)
const scaleVariants = {
  tap: { scale: 0.95 },
  hover: { scale: 1.02 }
};

<motion.button
  whileTap="tap"
  whileHover="hover"
  variants={scaleVariants}
>
  {label}
</motion.button>

// Stagger children (lists)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // 50ms between each child
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 10.3 Micro-interactions

```typescript
/**
 * Subtle animations for better UX
 */

// Button press feedback
const ButtonWithFeedback = () => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.02 }}
    className="relative overflow-hidden"
  >
    <motion.span
      className="absolute inset-0 bg-white/10"
      initial={{ scale: 0, opacity: 0 }}
      whileTap={{ scale: 2, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    <span className="relative z-10">Click me</span>
  </motion.button>
);

// Reaction animation
const ReactionButton = ({ onReact }) => {
  const [hasReacted, setHasReacted] = useState(false);

  const handleReact = () => {
    setHasReacted(true);
    onReact();
  };

  return (
    <motion.button
      onClick={handleReact}
      animate={hasReacted ? {
        scale: [1, 1.3, 1],
        rotate: [0, 15, -15, 0]
      } : {}}
      transition={{ duration: 0.5 }}
    >
      <ThumbsUp
        className={cn(
          "w-5 h-5",
          hasReacted && "fill-gold text-gold"
        )}
      />
    </motion.button>
  );
};

// Loading skeleton shimmer
const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const Skeleton = () => (
  <div
    className="h-4 bg-secondary rounded"
    style={{
      backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
      backgroundSize: '1000px 100%',
      animation: `${shimmerAnimation} 2s infinite`
    }}
  />
);

// Toast notification slide in
const toastVariants = {
  initial: {
    opacity: 0,
    y: -100,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.2 }
  }
};
```

### 10.4 Page Transitions

```typescript
/**
 * Smooth transitions between routes
 */

// Layout shift prevention
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Route-specific transitions
const routeVariants = {
  '/feed': {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  '/spaces': {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  '/profile': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
};

// Optimistic UI updates
const OptimisticUpdate = ({ children, isOptimistic }) => (
  <motion.div
    animate={isOptimistic ? {
      opacity: [1, 0.5, 1]
    } : {}}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
```

---

## Appendix: Quick Reference

### Component Index
- **Atoms**: 35+ basic components (Button, Input, Badge, Avatar, Card, Dialog, Alert, etc.)
- **Molecules**: 40+ simple combinations (FeedPostCard, SpaceCard, PhotoCarousel, CommentCard, etc.)
- **Organisms**: 50+ complex components (NavigationShell, ProfileHeader, SpacePostFeed, HiveLabBuilder, etc.)
- **Templates**: 5+ page layouts (SpaceLayout, FeedLayout, etc.)

### Design Token Reference
- **Colors**: Brand gold (#FFD700), Dark backgrounds, Semantic feedback colors
- **Typography**: Inter font family, 8 size scales, 4 weight variations
- **Spacing**: 4px base unit, 13 spacing scales
- **Shadows**: 5 depth levels for elevation
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

### Performance Budgets
- **LCP**: < 2.5s (feed < 2.0s)
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 3.8s (feed < 3.0s)
- **Bundle Size**: Optimized with code splitting

### Accessibility Checklist
- ✓ WCAG 2.1 AA compliant
- ✓ Keyboard navigation (Tab, Enter, Escape, Arrows)
- ✓ Screen reader support (ARIA labels, semantic HTML)
- ✓ Touch targets 44x44px minimum
- ✓ Respects prefers-reduced-motion
- ✓ Color contrast 4.5:1 minimum

---

**End of UI/UX/IA Specification v1.0**
