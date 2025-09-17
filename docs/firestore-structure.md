# HIVE Comprehensive Firestore Structure

This document outlines the complete, optimized Firestore structure for the HIVE platform. The structure is designed to be scalable, performant, and supports all current and planned features.

## 🏗️ Design Principles

1. **Nested Organization**: Group related data by type for better performance
2. **Collection Groups**: Enable cross-type queries for feed and discovery
3. **Denormalization**: Store frequently accessed data for fast reads
4. **Index Optimization**: Structure for efficient queries and sorting
5. **Scalability**: Support millions of users and posts
6. **Security**: Clear permission boundaries in rules

## 📊 Complete Structure Overview

```
firestore/
├── schools/{schoolId}                           ✅ Implemented
├── users/{userId}                               ✅ Implemented
│   ├── notifications/{notificationId}          🆕 New
│   ├── preferences/{preferenceType}            🆕 New
│   └── analytics/{metricType}                  🆕 New
├── handles/{handle}                             ✅ Implemented
├── spaces/{spacetype}/spaces/{spaceid}         ✅ Implemented
│   ├── members/{userId}                         ✅ Implemented
│   ├── posts/{postId}                          ✅ Implemented
│   ├── events/{eventId}                        ✅ Implemented
│   ├── analytics/{metricId}                    🆕 New
│   ├── tools/{toolId}                          🆕 New
│   └── moderation/{reportId}                   🆕 New
├── posts/{postId}                              ✅ Implemented (Global)
├── topStripContent/{contentId}                 ✅ Implemented
├── elements/{elementId}                        ✅ Implemented
├── feed/{schoolId}                             🆕 New
│   ├── content/{contentId}                     🆕 New
│   ├── trending/{trendId}                      🆕 New
│   └── metrics/{metricId}                      🆕 New
├── tools/{toolId}                              🆕 New
├── templates/{templateId}                      🆕 New
├── analytics/{schoolId}                        🆕 New
│   ├── metrics/{metricId}                      🆕 New
│   └── reports/{reportId}                      🆕 New
└── moderation/                                 🆕 New
    ├── reports/{reportId}                      🆕 New
    ├── queue/{queueId}                         🆕 New
    └── settings                                🆕 New
```

## 1. Schools & Universities

**Path**: `schools/{schoolId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface School {
  id: string;
  name: string;
  domain: string;
  status: "active" | "waitlist";
  waitlistCount: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 2. User Management

**Path**: `users/{userId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface User {
  id: string;
  uid: string;
  email: string;
  fullName: string;
  handle: string;
  major: string;
  schoolId: string;
  isPublic: boolean;
  consentGiven: boolean;
  builderOptIn: boolean;
  isBuilder: boolean;
  onboardingCompleted: boolean;
  isVerified: boolean;
  status: "active" | "suspended" | "deleted";
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}
```

### 2.1 User Notifications

**Path**: `users/{userId}/notifications/{notificationId}`  
**Status**: 🆕 **New Addition**

```typescript
interface UserNotification {
  id: string;
  type: "space_invite" | "post_reaction" | "event_reminder" | "system";
  title: string;
  body: string;
  data: Record<string, any>;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}
```

### 2.2 User Preferences

**Path**: `users/{userId}/preferences/{preferenceType}`  
**Status**: 🆕 **New Addition**

```typescript
interface UserPreferences {
  // Notification preferences
  notifications: {
    email: boolean;
    push: boolean;
    feed: boolean;
    spaces: boolean;
    events: boolean;
    mentions: boolean;
  };
  
  // Privacy preferences
  privacy: {
    profileVisibility: "public" | "school_only" | "private";
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
  
  // Feed preferences
  feed: {
    showSuggestedSpaces: boolean;
    showTrendingContent: boolean;
    contentFilters: string[];
  };
}
```

### 2.3 User Analytics

**Path**: `users/{userId}/analytics/{metricType}`  
**Status**: 🆕 **New Addition**

```typescript
interface UserAnalytics {
  engagement: {
    postsCreated: number;
    reactionsGiven: number;
    spacesJoined: number;
    eventsAttended: number;
    lastUpdated: Date;
  };
  
  activity: {
    dailyStreaks: number;
    longestStreak: number;
    totalTimeSpent: number; // milliseconds
    lastActiveAt: Date;
  };
}
```

## 3. Spaces (Nested Structure)

**Path**: `spaces/{spacetype}/spaces/{spaceid}`  
**Status**: ✅ **Already Implemented Correctly**

**Space Types**: `major`, `residential`, `interest`, `creative`, `organization`

```typescript
interface Space {
  id: string;
  name: string;
  description: string;
  type: "major" | "residential" | "interest" | "creative" | "organization";
  tags: Array<{
    type: string;
    sub_type: string;
  }>;
  schoolId: string;
  memberCount: number;
  status: "dormant" | "activated" | "frozen";
  name_lowercase: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.1 Space Members

**Path**: `spaces/{spacetype}/spaces/{spaceid}/members/{userId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface SpaceMember {
  userId: string;
  role: "member" | "builder" | "admin";
  joinedAt: Date;
  lastActiveAt: Date;
  permissions?: string[];
}
```

### 3.2 Space Posts

**Path**: `spaces/{spacetype}/spaces/{spaceid}/posts/{postId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface SpacePost {
  id: string;
  authorId: string;
  authorHandle: string;
  authorDisplayName: string;
  content: {
    text: string;
    media?: Array<{
      type: "image" | "video" | "document";
      url: string;
      metadata?: Record<string, any>;
    }>;
  };
  spaceId: string;
  type: "prompt-post" | "media-post" | "event-card" | "poll";
  visibility: "public" | "members_only";
  status: "published" | "draft" | "hidden";
  reactions: Record<string, number>;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.3 Space Events

**Path**: `spaces/{spacetype}/spaces/{spaceid}/events/{eventId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface SpaceEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    type: "physical" | "virtual" | "hybrid";
    address?: string;
    virtualUrl?: string;
  };
  spaceId: string;
  createdBy: string;
  attendeeCount: number;
  maxAttendees?: number;
  isPublic: boolean;
  status: "draft" | "published" | "live" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.4 Space Analytics

**Path**: `spaces/{spacetype}/spaces/{spaceid}/analytics/{metricId}`  
**Status**: 🆕 **New Addition**

```typescript
interface SpaceAnalytics {
  engagement: {
    memberCount: number;
    postCount: number;
    eventCount: number;
    activeMembers: number;
    growthRate: number;
    lastUpdated: Date;
  };
  
  activity: {
    dailyPosts: number;
    weeklyPosts: number;
    monthlyPosts: number;
    averageEngagement: number;
    topContributors: Array<{
      userId: string;
      postCount: number;
      reactionCount: number;
    }>;
  };
}
```

### 3.5 Space Tools

**Path**: `spaces/{spacetype}/spaces/{spaceid}/tools/{toolId}`  
**Status**: 🆕 **New Addition**

```typescript
interface SpaceTool {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  templateId?: string;
  config: Record<string, any>;
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3.6 Space Moderation

**Path**: `spaces/{spacetype}/spaces/{spaceid}/moderation/{reportId}`  
**Status**: 🆕 **New Addition**

```typescript
interface SpaceModerationReport {
  id: string;
  contentType: "post" | "comment" | "user";
  contentId: string;
  reportedBy: string;
  reason: "spam" | "inappropriate" | "harassment" | "other";
  description: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  reviewedBy?: string;
  reviewedAt?: Date;
  action?: "none" | "warning" | "content_removed" | "user_suspended";
  createdAt: Date;
}
```

## 4. Feed System

### 4.1 School Feed Content

**Path**: `feed/{schoolId}/content/{contentId}`  
**Status**: 🆕 **New Addition**

```typescript
interface FeedContent {
  id: string;
  type: "post" | "event" | "space_highlight" | "announcement";
  sourceId: string; // Original post/event/space ID
  sourceType: "post" | "event" | "space";
  spaceId?: string;
  authorId: string;
  schoolId: string;
  priority: number; // Higher = more important
  engagementScore: number;
  createdAt: Date;
  expiresAt?: Date;
}
```

### 4.2 Trending Content

**Path**: `feed/{schoolId}/trending/{trendId}`  
**Status**: 🆕 **New Addition**

```typescript
interface TrendingContent {
  id: string;
  period: "hourly" | "daily" | "weekly";
  date: Date;
  topPosts: Array<{
    postId: string;
    spaceId: string;
    score: number;
    engagementRate: number;
  }>;
  topSpaces: Array<{
    spaceId: string;
    spaceType: string;
    memberGrowth: number;
    activityScore: number;
  }>;
  topEvents: Array<{
    eventId: string;
    spaceId: string;
    attendeeCount: number;
    buzScore: number;
  }>;
  updatedAt: Date;
}
```

### 4.3 Feed Metrics

**Path**: `feed/{schoolId}/metrics/{metricId}`  
**Status**: 🆕 **New Addition**

```typescript
interface FeedMetrics {
  engagement: {
    dailyActiveUsers: number;
    postsCreated: number;
    reactionsGiven: number;
    spacesJoined: number;
    date: Date;
  };
  
  performance: {
    averageSessionTime: number;
    feedScrollDepth: number;
    clickThroughRate: number;
    conversionRate: number;
  };
}
```

## 5. Creation Engine

### 5.1 Elements

**Path**: `elements/{elementId}`  
**Status**: ✅ **Already Implemented**

```typescript
interface Element {
  id: string;
  name: string;
  type: string;
  category: "Display & Layout" | "Inputs & Choices" | "Logic & Dynamics";
  description: string;
  icon: string;
  version: number;
  configSchema: string; // JSON schema
  defaultConfig: Record<string, any>;
  presets: Array<{
    id: string;
    name: string;
    description: string;
    config: Record<string, any>;
  }>;
  isOfficial: boolean;
  isDeprecated: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5.2 User Tools

**Path**: `tools/{toolId}`  
**Status**: 🆕 **New Addition**

```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  schoolId: string;
  templateId?: string;
  elements: Array<{
    elementId: string;
    config: Record<string, any>;
    position: { x: number; y: number };
  }>;
  isPublic: boolean;
  isTemplate: boolean;
  usageCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 5.3 Templates

**Path**: `templates/{templateId}`  
**Status**: 🆕 **New Addition**

```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: "engagement" | "productivity" | "social" | "academic";
  elements: Array<{
    type: string;
    config: Record<string, any>;
    position?: { x: number; y: number };
  }>;
  isOfficial: boolean;
  usageCount: number;
  tags: string[];
  preview?: {
    imageUrl: string;
    description: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## 6. Analytics & Insights

### 6.1 School Analytics

**Path**: `analytics/{schoolId}/metrics/{metricId}`  
**Status**: 🆕 **New Addition**

```typescript
interface SchoolMetrics {
  overview: {
    totalUsers: number;
    totalSpaces: number;
    totalPosts: number;
    totalEvents: number;
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    lastUpdated: Date;
  };
  
  growth: {
    userGrowthRate: number;
    spaceGrowthRate: number;
    engagementGrowthRate: number;
    retentionRate: number;
    churnRate: number;
  };
  
  engagement: {
    avgSessionTime: number;
    avgPostsPerUser: number;
    avgSpacesPerUser: number;
    topSpaceTypes: Array<{
      type: string;
      count: number;
      growth: number;
    }>;
  };
}
```

### 6.2 Analytics Reports

**Path**: `analytics/{schoolId}/reports/{reportId}`  
**Status**: 🆕 **New Addition**

```typescript
interface AnalyticsReport {
  id: string;
  type: "growth" | "engagement" | "content" | "user_behavior";
  period: "daily" | "weekly" | "monthly" | "quarterly";
  data: Record<string, any>;
  insights: Array<{
    type: "trend" | "anomaly" | "achievement";
    title: string;
    description: string;
    severity: "low" | "medium" | "high";
  }>;
  generatedAt: Date;
  expiresAt: Date;
}
```

## 7. Moderation & Safety

### 7.1 Moderation Reports

**Path**: `moderation/reports/{reportId}`  
**Status**: 🆕 **New Addition**

```typescript
interface ModerationReport {
  id: string;
  type: "inappropriate_content" | "spam" | "harassment" | "impersonation";
  contentType: "post" | "comment" | "user" | "space";
  contentId: string;
  reportedBy: string;
  schoolId: string;
  reason: string;
  description: string;
  evidence?: Array<{
    type: "screenshot" | "url" | "text";
    data: string;
  }>;
  status: "pending" | "under_review" | "resolved" | "dismissed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  resolution?: {
    action: "none" | "warning" | "content_removed" | "user_suspended" | "space_moderated";
    reason: string;
    reviewedBy: string;
    reviewedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 7.2 Moderation Queue

**Path**: `moderation/queue/{queueId}`  
**Status**: 🆕 **New Addition**

```typescript
interface ModerationQueue {
  id: string;
  schoolId: string;
  reportIds: string[];
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  status: "pending" | "in_progress" | "completed";
  estimatedReviewTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}
```

### 7.3 Moderation Settings

**Path**: `moderation/settings`  
**Status**: 🆕 **New Addition**

```typescript
interface ModerationSettings {
  autoModerationEnabled: boolean;
  flagThresholds: {
    spam: number;
    inappropriate: number;
    harassment: number;
  };
  reviewTimeouts: {
    low: number; // milliseconds
    medium: number;
    high: number;
  };
  escalationRules: Array<{
    condition: string;
    action: string;
    notifyAdmins: boolean;
  }>;
  updatedAt: Date;
}
```

## 🔧 Collection Group Queries

The following collections support collection group queries for cross-collection searches:

- **`spaces`** - Cross-space discovery and search
- **`posts`** - Cross-space feed aggregation
- **`events`** - Cross-space event discovery
- **`members`** - User membership tracking
- **`tools`** - Cross-space tool discovery
- **`analytics`** - Cross-space analytics aggregation

## 📈 Performance Optimizations

### Indexing Strategy

All necessary indexes are already configured in `firestore.indexes.json`:

- **Single Field Indexes**: For common queries (status, visibility, createdAt)
- **Composite Indexes**: For complex queries (spaceId + createdAt, authorId + createdAt)
- **Array Contains Indexes**: For tags and categories
- **Collection Group Indexes**: For cross-collection queries

### Denormalization

Key data is denormalized for performance:

- Author information in posts (name, handle, avatar)
- Space information in events (name, type)
- Engagement metrics cached at document level
- Trending data pre-computed and cached

## 🛡️ Security Rules

Security rules are implemented to:

- Ensure users can only access data they're authorized to see
- Validate data structure and content on writes
- Implement role-based permissions (member, builder, admin)
- Rate limit writes to prevent abuse
- Enable collection group queries with proper permissions

## 🚀 Migration Strategy

The migration script (`migrate-to-comprehensive-structure.ts`) adds new collections and subcollections without affecting existing data:

1. **Phase 1**: Add user subcollections (notifications, preferences, analytics)
2. **Phase 2**: Add space analytics and tools subcollections
3. **Phase 3**: Add feed and trending collections
4. **Phase 4**: Add creation engine tools and templates
5. **Phase 5**: Add school-level analytics
6. **Phase 6**: Add moderation and safety collections

## ✅ Implementation Status

- **✅ Fully Implemented**: Schools, users, spaces, posts, events, elements, top strip content
- **🆕 Ready to Add**: User subcollections, space analytics, feed system, tools, analytics, moderation
- **📋 Future Enhancements**: Real-time features, advanced analytics, ML-powered recommendations

This structure provides a solid foundation for the HIVE platform while maintaining flexibility for future growth and feature additions. 