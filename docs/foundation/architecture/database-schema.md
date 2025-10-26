# HIVE Database Schema

## Overview
HIVE uses Firebase Firestore as its primary database. All collections follow a consistent structure with campus isolation for multi-tenancy support.

## Base Document Pattern
All documents inherit these fields:
```typescript
interface BaseDocument {
  id: string;                // Auto-generated document ID
  campusId: string;          // 'ub-buffalo' for vBETA
  createdAt: Timestamp;      // Creation timestamp
  updatedAt: Timestamp;      // Last update timestamp
  createdBy: string;         // User UID who created
}
```

## Primary Collections

### users
User profiles and account information.
```typescript
interface User extends BaseDocument {
  // Identity
  uid: string;               // Firebase Auth UID
  email: string;             // University email
  handle: string;            // Unique @handle
  displayName: string;       // Full name

  // Academic
  userType: 'student' | 'faculty' | 'alumni';
  major?: string;
  academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior';
  graduationYear?: number;

  // Profile
  bio?: string;
  photoURL?: string;
  interests: string[];

  // Status
  onboardingComplete: boolean;
  emailVerified: boolean;
  isBuilder: boolean;

  // Social
  followerCount: number;
  followingCount: number;
  spaceCount: number;

  // Settings
  privacy: {
    profileVisibility: 'public' | 'campus' | 'private';
    showEmail: boolean;
    showAcademicInfo: boolean;
  };
}
```

### spaces
Communities, organizations, and groups.
```typescript
interface Space extends BaseDocument {
  // Identity
  name: string;
  handle: string;
  description: string;

  // Classification
  type: SpaceType;           // See SpaceType enum below
  subType?: string;
  tags: string[];

  // Visuals
  coverImageURL?: string;
  iconURL?: string;

  // Membership
  memberCount: number;
  leaderIds: string[];
  moderatorIds: string[];

  // Settings
  isPrivate: boolean;
  requiresApproval: boolean;
  isActive: boolean;

  // Features
  hasTools: boolean;
  hasEvents: boolean;
  hasRSS: boolean;
  rssUrl?: string;

  // Stats
  postCount: number;
  eventCount: number;
  toolCount: number;
}

enum SpaceType {
  STUDENT_ORGANIZATIONS = 'student_organizations',
  UNIVERSITY_ORGANIZATIONS = 'university_organizations',
  GREEK_LIFE = 'greek_life',
  CAMPUS_LIVING = 'campus_living',
  HIVE_EXCLUSIVE = 'hive_exclusive'
}
```

### spaces/[spaceId]/posts
Posts within a space.
```typescript
interface Post extends BaseDocument {
  // Content
  content: string;
  mediaUrls?: string[];

  // Author
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;

  // Engagement
  likeCount: number;
  commentCount: number;
  shareCount: number;

  // Metadata
  spaceId: string;
  spaceName: string;
  isPinned: boolean;

  // Moderation
  isReported: boolean;
  isHidden: boolean;
}
```

### spaces/[spaceId]/posts/[postId]/comments
Comments on posts.
```typescript
interface Comment extends BaseDocument {
  // Content
  content: string;

  // Author
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;

  // Relations
  postId: string;
  parentCommentId?: string;  // For nested comments

  // Engagement
  likeCount: number;
}
```

### spaces/[spaceId]/members
Space membership records.
```typescript
interface Member extends BaseDocument {
  // User
  userId: string;
  userName: string;
  userPhotoURL?: string;
  userHandle: string;

  // Membership
  role: 'leader' | 'moderator' | 'member';
  joinedAt: Timestamp;

  // Activity
  lastActiveAt: Timestamp;
  postCount: number;

  // Permissions
  canPost: boolean;
  canModerate: boolean;
  canManageTools: boolean;
}
```

### tools
Student-created tools and utilities.
```typescript
interface Tool extends BaseDocument {
  // Identity
  name: string;
  description: string;
  icon: string;

  // Ownership
  creatorId: string;
  spaceId?: string;          // Tools can belong to spaces

  // Configuration
  type: 'template' | 'custom';
  templateId?: string;
  configuration: Record<string, any>;

  // Elements (for custom tools)
  elements: ToolElement[];

  // Usage
  usageCount: number;
  lastUsedAt?: Timestamp;

  // Sharing
  isPublic: boolean;
  isTemplate: boolean;

  // Analytics
  analytics: {
    views: number;
    uniqueUsers: number;
    avgSessionTime: number;
  };
}

interface ToolElement {
  id: string;
  type: string;
  props: Record<string, any>;
  position: { x: number; y: number };
}
```

### rituals
Platform-wide collective experiences.
```typescript
interface Ritual extends BaseDocument {
  // Identity
  name: string;
  title: string;
  description: string;
  tagline: string;

  // Classification
  type: RitualType;
  category: string;
  tags: string[];

  // Timing
  status: RitualStatus;
  startTime: Timestamp;
  endTime?: Timestamp;
  duration?: number;         // Minutes

  // Scope
  universities: string[];
  isGlobal: boolean;

  // Participation
  participationType: ParticipationType;
  maxParticipants?: number;
  minParticipants?: number;

  // Mechanics
  actions: RitualAction[];
  milestones: RitualMilestone[];
  rewards: RitualReward[];

  // Metrics
  metrics: {
    participationRate: number;
    completionRate: number;
    engagementScore: number;
    socialImpact: number;
  };
}

enum RitualType {
  ONBOARDING = 'onboarding',
  SEASONAL = 'seasonal',
  COMMUNITY = 'community',
  EMERGENCY = 'emergency'
}
```

### ritual_participation
User participation in rituals.
```typescript
interface RitualParticipation extends BaseDocument {
  // Relations
  ritualId: string;
  userId: string;

  // Status
  status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
  joinedAt: Timestamp;
  completedAt?: Timestamp;

  // Progress
  actionsCompleted: string[];
  progressPercentage: number;

  // Engagement
  timeSpent: number;         // Minutes
  interactionCount: number;
  socialScore: number;

  // Rewards
  rewardsEarned: string[];
  badgesAwarded: string[];
}
```

### events
Campus and space events.
```typescript
interface Event extends BaseDocument {
  // Identity
  title: string;
  description: string;

  // Timing
  startTime: Timestamp;
  endTime: Timestamp;
  timezone: string;

  // Location
  location: string;
  locationDetails?: string;
  isVirtual: boolean;
  virtualLink?: string;

  // Organization
  spaceId?: string;
  organizerId: string;

  // Attendance
  rsvpCount: number;
  attendeeLimit?: number;

  // Metadata
  tags: string[];
  imageURL?: string;

  // Source
  source: 'user' | 'rss' | 'admin';
  rssSourceId?: string;
}
```

### handles
Unique handle registry.
```typescript
interface Handle extends BaseDocument {
  handle: string;            // The @handle
  userId: string;           // Owner's UID
  type: 'user' | 'space';  // Handle type
  reservedAt: Timestamp;    // When claimed
}
```

### schools
University configuration.
```typescript
interface School extends BaseDocument {
  // Identity
  name: string;
  shortName: string;

  // Configuration
  emailDomain: string;
  campusId: string;

  // Status
  isActive: boolean;
  launchDate?: Timestamp;

  // Customization
  brandColors: {
    primary: string;
    secondary: string;
  };

  // Stats
  totalUsers: number;
  activeUsers: number;
}
```

### presence
Real-time user presence.
```typescript
interface Presence {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastActiveAt: Timestamp;
  currentSpaceId?: string;
  currentPage?: string;
}
```

## Subcollections Pattern

Many collections have subcollections for related data:
```
spaces/
  └── [spaceId]/
      ├── posts/
      │   └── [postId]/
      │       └── comments/
      ├── members/
      ├── events/
      └── tools/

users/
  └── [userId]/
      ├── followers/
      ├── following/
      └── notifications/
```

## Indexes

Critical indexes for performance:
```
// Spaces - for discovery
spaces: campusId + type + memberCount (DESC)
spaces: campusId + isActive + createdAt (DESC)

// Posts - for feeds
posts: spaceId + createdAt (DESC)
posts: authorId + createdAt (DESC)

// Events - for calendar
events: campusId + startTime (ASC)
events: spaceId + startTime (ASC)

// Rituals - for active campaigns
rituals: campusId + status + startTime (DESC)
```

## Security Rules Pattern

All collections follow this security pattern:
```javascript
// Read: Authenticated users from same campus
allow read: if request.auth != null &&
  resource.data.campusId == 'ub-buffalo';

// Write: Authenticated users, enforce campus isolation
allow write: if request.auth != null &&
  request.resource.data.campusId == 'ub-buffalo' &&
  request.auth.uid == request.resource.data.createdBy;
```

## Data Retention

- Posts: Retained indefinitely
- Events: Archived 6 months after end date
- Presence: Cleared after 24 hours offline
- Analytics: Aggregated monthly, raw data retained 90 days