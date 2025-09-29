# SPACES DATA SCHEMA - SPEC.md Compliant

## Core Business Logic

### Behavioral Psychology Algorithm
```
SpaceRecommendationScore = (AnxietyRelief × 0.4) + (SocialProof × 0.3) + (InsiderAccess × 0.3)
```

**Components:**
- **AnxietyRelief**: Spaces that solve current student anxieties (study stress, loneliness, FOMO)
- **SocialProof**: Spaces with friends/connections already active
- **InsiderAccess**: Exclusive or hard-to-find communities
- **Target**: Recommend spaces with 70% join-to-active-member conversion rate

### Space Categories
- `university_org`: Official university organizations
- `student_org`: Student-run organizations
- `residential`: Dorm/residential communities
- `greek_life`: Fraternities and sororities

## Database Schemas

### 1. Space Document
```typescript
interface Space {
  // Core Identity
  id: string;                     // Auto-generated
  campusId: string;               // 'ub-buffalo' (campus isolation)
  name: string;                   // Unique per campus
  slug: string;                   // URL-safe version of name
  description: string;            // 280 char max
  category: 'university_org' | 'student_org' | 'residential' | 'greek_life';

  // Visual & Discovery
  bannerImage?: string;           // Storage URL
  avatarImage?: string;           // Storage URL
  tags: string[];                 // For search/discovery
  featured: boolean;              // Admin can feature

  // Membership & Activity
  memberCount: number;            // Denormalized for performance
  onlineCount: number;            // Real-time presence
  activityLevel: 'very_active' | 'active' | 'moderate' | 'quiet';
  lastActivity: Timestamp;        // Last post/event

  // Access Control
  joinPolicy: 'open' | 'approval' | 'invite_only';
  visibility: 'public' | 'members_only';

  // Leadership
  leaders: string[];              // User UIDs with admin rights
  moderators: string[];           // User UIDs with mod rights

  // Behavioral Metrics
  anxietyReliefScore: number;     // 0-1, calculated daily
  socialProofScore: number;       // 0-1, based on connections
  insiderAccessScore: number;     // 0-1, exclusivity metric
  joinToActiveRate: number;       // % who become active after joining

  // Promotion & Feed
  promotedPostsToday: number;     // Rate limit: 3/day
  lastPromotedAt?: Timestamp;     // Rate limiting
  autoPromotionEnabled: boolean;  // Posts with 50+ engagement

  // Settings
  settings: {
    allowGuestView: boolean;      // Non-members can view
    requireApproval: boolean;     // Leaders approve posts
    notifyOnJoin: boolean;        // Alert leaders of new members
    maxPinnedPosts: number;       // Default: 3
    autoArchiveDays: number;      // Default: 7
  };

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;             // User UID
}
```

### 2. SpaceMember Document
```typescript
interface SpaceMember {
  // Composite key: spaceId + userId
  id: string;                    // {spaceId}_{userId}
  spaceId: string;
  userId: string;
  campusId: string;              // Campus isolation

  // Membership Details
  role: 'owner' | 'leader' | 'moderator' | 'member';
  joinedAt: Timestamp;
  lastActiveAt: Timestamp;

  // Engagement Metrics
  postCount: number;
  reactionCount: number;
  threadCount: number;
  activityScore: number;         // 0-100, engagement level

  // Notification Preferences
  notifications: {
    posts: boolean;              // New posts
    events: boolean;             // New events
    announcements: boolean;      // Important updates
    mentions: boolean;           // When mentioned
  };

  // Status
  status: 'active' | 'inactive' | 'removed' | 'banned';
  removedAt?: Timestamp;
  removedBy?: string;
  banReason?: string;
}
```

### 3. SpacePost Document
```typescript
interface SpacePost {
  // Identity
  id: string;
  spaceId: string;
  campusId: string;

  // Content
  content: string;               // Main text content
  type: 'regular' | 'announcement' | 'poll' | 'event' | 'volunteer' | 'system';

  // Author
  authorId: string;
  authorName: string;            // Denormalized
  authorAvatar?: string;         // Denormalized

  // Threading
  isThread: boolean;             // Is this a thread starter?
  threadId?: string;             // Parent thread if reply
  replyCount: number;            // For threads only
  lastReplyAt?: Timestamp;       // For threads only

  // Enhancements
  pinned: boolean;               // Pinned by leader
  pinnedAt?: Timestamp;
  pinnedBy?: string;

  // Tab System (Hot Threads)
  isTab: boolean;                // Promoted to tab
  tabOrder?: number;             // Display order in tabs
  tabExpiresAt?: Timestamp;      // Auto-archive after 7 days

  // Promotion to Feed
  promoted: boolean;             // Visible in campus feed
  promotedAt?: Timestamp;
  promotedBy?: string;
  promotionStats: {
    impressions: number;         // Times shown in feed
    clicks: number;              // Click-throughs
    newMembers: number;          // Members who joined via promotion
  };

  // Type-Specific Data
  pollData?: {
    options: Array<{
      id: string;
      text: string;
      votes: number;
    }>;
    totalVotes: number;
    endsAt: Timestamp;
    allowMultiple: boolean;
  };

  eventData?: {
    title: string;
    startTime: Timestamp;
    endTime: Timestamp;
    location?: string;
    maxAttendees?: number;
    currentAttendees: number;
    rsvps: string[];            // User UIDs
  };

  volunteerData?: {
    slots: Array<{
      id: string;
      role: string;
      needed: number;
      filled: number;
      volunteers: string[];      // User UIDs
    }>;
  };

  // Engagement
  reactions: {
    [emoji: string]: string[];   // emoji -> [userIds]
  };
  engagementScore: number;       // Calculated: reactions + replies

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  editedAt?: Timestamp;
  deletedAt?: Timestamp;
}
```

### 4. SpaceResource Document
```typescript
interface SpaceResource {
  id: string;
  spaceId: string;
  campusId: string;

  // Resource Info
  type: 'document' | 'link' | 'media' | 'form';
  category: 'pinned' | 'documents' | 'links' | 'media' | 'forms' | 'archive';

  title: string;
  description?: string;
  url: string;                   // Storage URL or external link

  // File Metadata
  fileType?: string;             // pdf, doc, etc.
  fileSize?: number;             // In bytes
  mimeType?: string;

  // Engagement
  viewCount: number;
  downloadCount: number;
  lastAccessedAt: Timestamp;

  // Contributor
  uploadedBy: string;            // User UID
  uploadedByName: string;        // Denormalized
  uploadedAt: Timestamp;

  // Organization
  pinned: boolean;
  pinnedBy?: string;
  pinnedAt?: Timestamp;
  archived: boolean;
  archivedAt?: Timestamp;
}
```

### 5. SpaceEvent Document
```typescript
interface SpaceEvent {
  id: string;
  spaceId: string;
  campusId: string;

  // Event Details
  title: string;
  description: string;
  type: 'event' | 'deadline' | 'meeting';

  // Timing
  startTime: Timestamp;
  endTime: Timestamp;
  isAllDay: boolean;
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Timestamp;
  };

  // Location
  location?: {
    type: 'physical' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    meetingLink?: string;
  };

  // Attendance
  maxAttendees?: number;
  currentAttendees: number;
  rsvps: Array<{
    userId: string;
    status: 'yes' | 'no' | 'maybe';
    timestamp: Timestamp;
  }>;

  // Visibility
  visibility: 'public' | 'members_only';
  featured: boolean;             // Show prominently

  // Live Event Features
  isLive: boolean;               // Currently happening
  liveTabId?: string;            // Auto-created tab in space

  // Creator
  createdBy: string;
  createdByName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## API Endpoints

### Discovery & Browse
```typescript
GET /api/spaces
  Query: {
    campusId: string,
    category?: string,
    page?: number,
    limit?: number
  }
  Response: {
    spaces: Space[],
    recommendations: Space[],
    hasMore: boolean
  }

GET /api/spaces/search
  Query: {
    q: string,
    filters: {
      category?: string,
      memberCount?: { min: number, max: number },
      activityLevel?: string,
      joinPolicy?: string
    }
  }
  Response: { spaces: Space[], total: number }

GET /api/spaces/recommended
  Headers: { Authorization: Bearer <token> }
  Response: {
    panicRelief: Space[],      // Anxiety-solving spaces
    whereYourFriendsAre: Space[], // Social proof spaces
    insiderAccess: Space[]     // Exclusive communities
  }
```

### Space Management
```typescript
POST /api/spaces/{spaceId}/join
  Headers: { Authorization: Bearer <token> }
  Body: { message?: string }    // For approval-required spaces
  Response: { member: SpaceMember, space: Space }

POST /api/spaces/{spaceId}/leave
  Headers: { Authorization: Bearer <token> }
  Response: { success: boolean }

GET /api/spaces/{spaceId}
  Response: {
    space: Space,
    isMember: boolean,
    memberRole?: string,
    recentPosts: SpacePost[],
    upcomingEvents: SpaceEvent[]
  }
```

### Posts & Engagement
```typescript
POST /api/spaces/{spaceId}/posts
  Body: {
    content: string,
    type: string,
    pollData?: PollData,
    eventData?: EventData
  }
  Response: { post: SpacePost }

POST /api/spaces/{spaceId}/posts/{postId}/promote
  Headers: { Authorization: Bearer <token> }  // Must be leader
  Response: {
    promoted: boolean,
    promotionId: string
  }

POST /api/spaces/{spaceId}/posts/{postId}/pin
  Headers: { Authorization: Bearer <token> }  // Must be leader
  Response: { pinned: boolean }

POST /api/spaces/{spaceId}/posts/{postId}/tab
  Headers: { Authorization: Bearer <token> }  // Must be leader
  Response: {
    tabId: string,
    expiresAt: Timestamp
  }
```

### Resources & Events
```typescript
GET /api/spaces/{spaceId}/resources
  Query: { category?: string }
  Response: { resources: SpaceResource[] }

POST /api/spaces/{spaceId}/resources
  Body: FormData (file upload)
  Response: { resource: SpaceResource }

GET /api/spaces/{spaceId}/events
  Query: {
    startDate?: string,
    endDate?: string,
    type?: string
  }
  Response: { events: SpaceEvent[] }

POST /api/spaces/{spaceId}/events/{eventId}/rsvp
  Body: { status: 'yes' | 'no' | 'maybe' }
  Response: { rsvp: RSVP }
```

## Security Rules

### Firestore Security Rules
```javascript
// Spaces Collection
match /spaces/{spaceId} {
  // Public spaces visible to all campus members
  allow read: if request.auth != null &&
    resource.data.campusId == request.auth.token.campusId &&
    (resource.data.visibility == 'public' ||
     exists(/databases/$(database)/documents/spaceMembers/$(spaceId + '_' + request.auth.uid)));

  // Only leaders can update
  allow update: if request.auth != null &&
    request.auth.uid in resource.data.leaders;

  // Admin only creation
  allow create: if request.auth != null &&
    request.auth.token.admin == true;
}

// Space Members Collection
match /spaceMembers/{memberId} {
  allow read: if request.auth != null &&
    request.auth.uid == resource.data.userId ||
    request.auth.uid in get(/databases/$(database)/documents/spaces/$(resource.data.spaceId)).data.leaders;

  allow create: if request.auth != null &&
    request.auth.uid == request.resource.data.userId;

  allow update: if request.auth != null &&
    (request.auth.uid == resource.data.userId ||
     request.auth.uid in get(/databases/$(database)/documents/spaces/$(resource.data.spaceId)).data.leaders);
}

// Space Posts Collection
match /spacePosts/{postId} {
  allow read: if request.auth != null &&
    (get(/databases/$(database)/documents/spaces/$(resource.data.spaceId)).data.visibility == 'public' ||
     exists(/databases/$(database)/documents/spaceMembers/$(resource.data.spaceId + '_' + request.auth.uid)));

  allow create: if request.auth != null &&
    exists(/databases/$(database)/documents/spaceMembers/$(request.resource.data.spaceId + '_' + request.auth.uid));

  allow update: if request.auth != null &&
    (request.auth.uid == resource.data.authorId ||
     request.auth.uid in get(/databases/$(database)/documents/spaces/$(resource.data.spaceId)).data.leaders);
}
```

## Real-time Subscriptions

### Space Activity Listener
```typescript
// Listen to space posts in real-time
const unsubscribe = onSnapshot(
  query(
    collection(db, 'spacePosts'),
    where('spaceId', '==', spaceId),
    orderBy('createdAt', 'desc'),
    limit(50)
  ),
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // New post added
      } else if (change.type === 'modified') {
        // Post edited/promoted/pinned
      }
    });
  }
);
```

### Member Presence
```typescript
// Track online members in space
const presenceRef = doc(db, 'spacePresence', `${spaceId}_${userId}`);
const unsubscribe = onSnapshot(
  query(
    collection(db, 'spacePresence'),
    where('spaceId', '==', spaceId),
    where('isOnline', '==', true)
  ),
  (snapshot) => {
    const onlineCount = snapshot.size;
    // Update UI with online count
  }
);
```

## Cache Strategy

### Space Discovery Cache
- **TTL**: 5 minutes for recommendations
- **Key Pattern**: `spaces:discover:${userId}:${page}`
- **Invalidation**: On user profile change, space join/leave

### Space Detail Cache
- **TTL**: 1 minute for space details
- **Key Pattern**: `space:${spaceId}`
- **Invalidation**: On space update, new post, member change

### Member List Cache
- **TTL**: 30 seconds for online members
- **Key Pattern**: `space:${spaceId}:members:online`
- **Invalidation**: On presence change

## Performance Targets

### Load Times
- Space directory: <3s initial load
- Individual space: <2s full render
- Post creation: <1s response
- Space join: <1s completion
- Real-time updates: <500ms latency

### Optimization Strategies
1. Denormalize member counts and activity levels
2. Use Firestore composite indexes for complex queries
3. Implement virtual scrolling for long post lists
4. Lazy load resources and events (sidebar widgets)
5. Prefetch recommended spaces on app load

## Analytics Events

### Discovery Events
```typescript
space_viewed: { spaceId, source: 'directory' | 'search' | 'recommendation' }
space_searched: { query, filters, resultCount }
space_joined: { spaceId, source, timeToJoin }
space_left: { spaceId, membershipDuration }
```

### Engagement Events
```typescript
post_created: { spaceId, postType, contentLength }
post_promoted: { spaceId, postId, promotionType: 'manual' | 'auto' }
thread_created: { spaceId, originalPostId }
tab_created: { spaceId, postId, replyCount }
resource_uploaded: { spaceId, resourceType, fileSize }
event_created: { spaceId, eventType, attendeeLimit }
event_rsvp: { spaceId, eventId, status }
```

### Behavioral Metrics
```typescript
anxiety_relief_interaction: { spaceId, anxietyType, timeToRelief }
social_proof_conversion: { spaceId, friendCount, joinDecision }
insider_access_engagement: { spaceId, exclusivityLevel, engagementDepth }
completion_rate: { feature: 'space_join', stage, completed: boolean }
```