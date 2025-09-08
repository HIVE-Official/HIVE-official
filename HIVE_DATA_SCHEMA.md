# HIVE Complete Data Layer Schema

## 🏗️ Firestore Collection Architecture

### Core Design Principles
1. **Flat Structure**: No nested subcollections (better for queries)
2. **Composite Keys**: Use `{entityA}_{entityB}` for relationships
3. **Denormalization**: Store frequently accessed data together
4. **Real-time First**: Optimize for real-time subscriptions
5. **Query Efficiency**: Index for common access patterns

## 📊 Complete Collection Schema

### 1. **users** (Profile System)
```typescript
{
  id: string,                    // Firebase Auth UID
  // Identity
  email: string,
  fullName: string,
  handle: string,                 // Unique @username
  pronouns?: string,
  bio?: string,
  avatarUrl?: string,
  
  // Academic (UB-specific)
  schoolId: 'ub-buffalo',
  major: string[],                // Can have multiple majors
  minor?: string[],
  academicYear: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate',
  graduationYear: number,
  housing?: string,
  
  // Platform
  builderStatus: boolean,
  onboardingCompleted: boolean,
  emailVerified: boolean,
  
  // Stats (denormalized for quick access)
  stats: {
    spacesJoined: number,
    spacesCreated: number,
    toolsBuilt: number,
    postsCreated: number,
    connectionsCount: number,
    ritualsCompleted: number
  },
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastActiveAt: Timestamp
}
```

### 2. **posts** (Feed System)
```typescript
{
  id: string,
  
  // Content
  type: 'post' | 'tool_share' | 'event' | 'announcement' | 'achievement',
  content: {
    text?: string,
    title?: string,
    media?: string[],          // URLs to images/videos
    toolId?: string,           // If sharing a tool
    eventId?: string,          // If event announcement
    links?: string[]
  },
  
  // Author (denormalized)
  authorId: string,
  authorName: string,
  authorHandle: string,
  authorAvatar?: string,
  
  // Context
  spaceId?: string,             // If posted in a space
  spaceName?: string,           // Denormalized
  visibility: 'public' | 'space' | 'followers',
  
  // Engagement (denormalized for quick display)
  engagement: {
    likes: number,
    comments: number,
    shares: number,
    views: number,
    likedBy: string[],          // User IDs (limited to recent 100)
    bookmarkedBy: string[]      // User IDs
  },
  
  // Discovery
  tags: string[],
  mentions: string[],           // User handles mentioned
  isPinned: boolean,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  editedAt?: Timestamp
}
```

### 3. **spaces** (Community System)
```typescript
{
  id: string,
  
  // Identity
  name: string,
  handle: string,               // Unique space handle
  description: string,
  coverImage?: string,
  icon?: string,
  
  // Classification
  category: 'academic' | 'social' | 'professional' | 'creative' | 'wellness',
  type: 'open' | 'closed' | 'secret',
  schoolId: string,
  
  // Stats (denormalized)
  stats: {
    memberCount: number,
    postCount: number,
    activeToday: number,
    toolsShared: number,
    eventsHosted: number
  },
  
  // Settings
  settings: {
    autoJoin: boolean,          // Can users auto-join?
    requireApproval: boolean,
    allowTools: boolean,
    allowEvents: boolean,
    moderationLevel: 'low' | 'medium' | 'high'
  },
  
  // Discovery
  tags: string[],
  featured: boolean,
  verified: boolean,
  
  // Metadata
  createdBy: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastActivityAt: Timestamp
}
```

### 4. **spaceMembers** (Flat membership)
```typescript
{
  id: string,                   // {spaceId}_{userId}
  
  // References
  spaceId: string,
  userId: string,
  
  // Denormalized user info (for quick display)
  userName: string,
  userHandle: string,
  userAvatar?: string,
  
  // Membership
  role: 'owner' | 'admin' | 'moderator' | 'member',
  status: 'active' | 'invited' | 'banned',
  
  // Engagement
  lastActiveAt: Timestamp,
  postCount: number,
  contributionScore: number,
  
  // Metadata
  joinedAt: Timestamp,
  invitedBy?: string,
  bannedAt?: Timestamp,
  bannedReason?: string
}
```

### 5. **rituals** (Engagement System)
```typescript
{
  id: string,
  
  // Identity
  name: string,
  title: string,
  description: string,
  icon: string,
  gradient: string,             // Visual gradient colors
  
  // Classification
  type: 'daily' | 'weekly' | 'seasonal' | 'achievement' | 'community',
  category: 'academic' | 'social' | 'wellness' | 'creative',
  
  // Scheduling
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'archived',
  startTime: Timestamp,
  endTime?: Timestamp,
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly',
    daysOfWeek?: number[],
    timeOfDay?: string
  },
  
  // Participation
  participationType: 'individual' | 'collaborative' | 'competitive',
  requirements: {
    minParticipants?: number,
    maxParticipants?: number,
    prerequisites?: string[]     // Other ritual IDs
  },
  
  // Actions & Milestones
  actions: [{
    id: string,
    type: string,
    description: string,
    points: number,
    required: boolean
  }],
  milestones: [{
    threshold: number,
    reward: string,
    unlocks?: string[]
  }],
  
  // Stats
  stats: {
    totalParticipants: number,
    activeParticipants: number,
    completionRate: number,
    averageProgress: number
  },
  
  // Metadata
  schoolId: string,
  createdBy: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 6. **ritualParticipation** (User ritual progress)
```typescript
{
  id: string,                   // {ritualId}_{userId}
  
  // References
  ritualId: string,
  userId: string,
  
  // Progress
  status: 'registered' | 'active' | 'paused' | 'completed' | 'dropped',
  progress: number,             // 0-100
  currentStreak: number,
  longestStreak: number,
  
  // Completed Actions
  completedActions: string[],   // Action IDs
  earnedRewards: string[],
  unlockedMilestones: number[],
  
  // Engagement
  lastActivityAt: Timestamp,
  totalTimeSpent: number,       // minutes
  
  // Metadata
  joinedAt: Timestamp,
  completedAt?: Timestamp,
  droppedAt?: Timestamp
}
```

### 7. **tools** (Creation Engine)
```typescript
{
  id: string,
  
  // Identity
  name: string,
  description: string,
  icon: string,
  category: 'productivity' | 'social' | 'academic' | 'creative' | 'utility',
  
  // Template/Implementation
  templateId?: string,          // If based on template
  config: object,               // Tool configuration
  code?: string,               // Custom code if applicable
  
  // Deployment
  status: 'draft' | 'testing' | 'published' | 'deprecated',
  version: string,
  deploymentUrl?: string,
  
  // Usage
  stats: {
    installs: number,
    activeUsers: number,
    rating: number,
    reviews: number
  },
  
  // Permissions
  visibility: 'private' | 'space' | 'campus' | 'public',
  spaceId?: string,            // If space-specific
  
  // Metadata
  createdBy: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  publishedAt?: Timestamp
}
```

### 8. **toolInstalls** (Tool usage tracking)
```typescript
{
  id: string,                   // {toolId}_{userId}
  
  // References
  toolId: string,
  userId: string,
  spaceId?: string,
  
  // Installation
  installedAt: Timestamp,
  lastUsedAt: Timestamp,
  useCount: number,
  
  // User Config
  settings: object,
  customizations: object,
  
  // Status
  isActive: boolean,
  isPinned: boolean
}
```

### 9. **connections** (Social Graph)
```typescript
{
  id: string,                   // {user1}_{user2} (alphabetically sorted)
  
  // Users (alphabetically sorted)
  user1: string,
  user2: string,
  
  // Connection Details
  status: 'pending' | 'connected' | 'blocked',
  type: 'friend' | 'study_partner' | 'classmate',
  
  // Context
  initiatedBy: string,
  mutualSpaces: string[],
  sharedInterests: string[],
  
  // Metadata
  createdAt: Timestamp,
  connectedAt?: Timestamp,
  lastInteractionAt?: Timestamp
}
```

### 10. **events** (Calendar System)
```typescript
{
  id: string,
  
  // Event Info
  title: string,
  description: string,
  type: 'academic' | 'social' | 'workshop' | 'meeting',
  
  // Timing
  startTime: Timestamp,
  endTime: Timestamp,
  timezone: string,
  isAllDay: boolean,
  
  // Location
  location: {
    type: 'physical' | 'virtual' | 'hybrid',
    venue?: string,
    address?: string,
    meetingUrl?: string
  },
  
  // Organization
  hostId: string,               // User or Space ID
  hostType: 'user' | 'space',
  spaceId?: string,
  
  // Attendance
  capacity?: number,
  rsvpCount: number,
  attendeeCount: number,
  
  // Visibility
  visibility: 'public' | 'space' | 'invite',
  
  // Metadata
  createdBy: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 11. **eventRSVPs** (Event attendance)
```typescript
{
  id: string,                   // {eventId}_{userId}
  
  // References
  eventId: string,
  userId: string,
  
  // RSVP
  status: 'yes' | 'maybe' | 'no' | 'attended',
  
  // Metadata
  respondedAt: Timestamp,
  attendedAt?: Timestamp
}
```

### 12. **notifications** (Real-time notifications)
```typescript
{
  id: string,
  
  // Recipient
  userId: string,
  
  // Notification
  type: 'post' | 'comment' | 'like' | 'follow' | 'invite' | 'mention' | 'achievement',
  title: string,
  body: string,
  imageUrl?: string,
  
  // Action
  actionUrl?: string,
  actionType?: string,
  actionData?: object,
  
  // Status
  isRead: boolean,
  isArchived: boolean,
  
  // Metadata
  createdAt: Timestamp,
  readAt?: Timestamp
}
```

### 13. **activityFeed** (Pre-aggregated feed)
```typescript
{
  id: string,
  
  // Target
  userId: string,               // Whose feed this belongs to
  
  // Content Reference
  contentType: 'post' | 'event' | 'tool' | 'achievement',
  contentId: string,
  
  // Relevance
  score: number,               // Ranking score
  reason: string[],           // Why it's in their feed
  
  // Metadata
  addedAt: Timestamp,
  expiresAt: Timestamp
}
```

## 🔥 Firestore Indexes

### Composite Indexes Required
```
1. posts: authorId + createdAt (DESC)
2. posts: spaceId + createdAt (DESC)
3. posts: visibility + createdAt (DESC)
4. spaceMembers: userId + status + joinedAt (DESC)
5. spaceMembers: spaceId + role + lastActiveAt (DESC)
6. ritualParticipation: userId + status
7. connections: user1 + status
8. connections: user2 + status
9. events: spaceId + startTime (ASC)
10. notifications: userId + isRead + createdAt (DESC)
```

## 🔐 Security Rules Summary

### Read Access
- **Public**: schools, public spaces, public posts, public events
- **Authenticated**: users, space members, connections
- **Member Only**: space content, ritual participation
- **Owner Only**: private data, analytics, settings

### Write Access
- **Self Only**: user profile, preferences, connections
- **Member**: space posts, comments
- **Moderator**: content moderation
- **Admin**: space settings, member management
- **System Only**: aggregated data, analytics

## 📈 Data Flow Architecture

### Write Path
1. Client → Firestore → Cloud Function Trigger
2. Cloud Function → Update denormalized data
3. Cloud Function → Update aggregations
4. Cloud Function → Trigger notifications

### Read Path
1. Client → Firestore real-time listener
2. Firestore → Return paginated results
3. Client → Cache locally
4. Client → Update UI optimistically

### Aggregation Strategy
- **Real-time counts**: Distributed counters
- **Feed generation**: Cloud Scheduler (every 5 min)
- **Analytics**: Daily batch jobs
- **Search**: Algolia integration

## 🚀 Migration Path

### Phase 1: Core Collections (Week 1)
- users
- posts
- spaces
- spaceMembers

### Phase 2: Social Features (Week 2)
- connections
- notifications
- activityFeed

### Phase 3: Engagement (Week 3)
- rituals
- ritualParticipation
- events
- eventRSVPs

### Phase 4: Creation Engine (Week 4)
- tools
- toolInstalls
- templates

## 🎯 Performance Targets

- **Write latency**: < 100ms
- **Read latency**: < 50ms
- **Real-time updates**: < 500ms
- **Feed generation**: < 2s
- **Search results**: < 200ms

## 📊 Monitoring & Analytics

### Key Metrics
- Document reads/writes per collection
- Real-time connection count
- Query performance (p50, p95, p99)
- Storage usage per collection
- Cloud Function execution time

### Alerts
- Read/write quota approaching
- Slow queries (> 1s)
- Failed Cloud Functions
- Storage limit approaching
- Unusual traffic patterns