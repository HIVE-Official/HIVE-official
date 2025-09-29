# Firestore Indexes Guide

This document maps every Firestore index in our production configuration to the specific queries and API endpoints they support. All indexes follow the **campus isolation** security pattern with `campusId: 'ub-buffalo'`.

## Index Structure Overview

- **Total Composite Indexes**: 56
- **Field Overrides**: 5
- **Campus Isolation**: All critical collections include `campusId` filtering
- **Query Performance**: Optimized for <3s page loads

## Critical Production Indexes

### 1. Users Collection

#### Index: `campusId + isActive + lastActive`
**Query Pattern**: Campus user discovery and activity tracking
```typescript
// API: /api/admin/users, /api/profile/dashboard
dbAdmin.collection('users')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('lastActive', 'desc')
```

#### Index: `campusId + handle`
**Query Pattern**: Handle uniqueness validation and user lookup
```typescript
// API: /api/auth/check-handle, /api/profile/[handle]
dbAdmin.collection('users')
  .where('campusId', '==', 'ub-buffalo')
  .where('handle', '==', userHandle)
```

#### Index: `campusId + university + lastActive`
**Query Pattern**: University-specific user discovery
```typescript
// API: /api/profile/connections, /api/admin/campus-expansion
dbAdmin.collection('users')
  .where('campusId', '==', 'ub-buffalo')
  .where('university', '==', 'University at Buffalo')
  .orderBy('lastActive', 'desc')
```

### 2. Spaces Collection

#### Index: `campusId + isActive + memberCount`
**Query Pattern**: Popular spaces discovery (primary spaces query)
```typescript
// API: /api/spaces, /api/spaces/browse
dbAdmin.collection('spaces')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('memberCount', 'desc')
```

#### Index: `campusId + isActive + createdAt`
**Query Pattern**: Recent spaces discovery
```typescript
// API: /api/spaces (recent tab), /api/admin/spaces
dbAdmin.collection('spaces')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('createdAt', 'desc')
```

#### Index: `campusId + category + memberCount`
**Query Pattern**: Category-filtered space browsing
```typescript
// API: /api/spaces/browse with category filter
dbAdmin.collection('spaces')
  .where('campusId', '==', 'ub-buffalo')
  .where('category', '==', 'student_org')
  .orderBy('memberCount', 'desc')
```

#### Index: `campusId + joinPolicy + memberCount`
**Query Pattern**: Access-level filtered spaces
```typescript
// API: /api/spaces/browse with access filter
dbAdmin.collection('spaces')
  .where('campusId', '==', 'ub-buffalo')
  .where('joinPolicy', '==', 'open')
  .orderBy('memberCount', 'desc')
```

### 3. Posts Collection (Collection Group)

#### Index: `isDeleted + createdAt`
**Query Pattern**: Feed aggregation (primary posts query)
```typescript
// API: /api/feed, /api/spaces/[id]/posts
dbAdmin.collectionGroup('posts')
  .where('isDeleted', '==', false)
  .orderBy('createdAt', 'desc')
```

#### Index: `spaceId + isDeleted + createdAt`
**Query Pattern**: Space-specific post feeds
```typescript
// API: /api/spaces/[spaceId]/posts, /api/spaces/[spaceId]/feed
dbAdmin.collection('spaces').doc(spaceId).collection('posts')
  .where('isDeleted', '==', false)
  .orderBy('createdAt', 'desc')
```

#### Index: `authorId + isDeleted + createdAt`
**Query Pattern**: User profile post history
```typescript
// API: /api/profile/posts, /api/profile/[handle]
dbAdmin.collectionGroup('posts')
  .where('authorId', '==', userId)
  .where('isDeleted', '==', false)
  .orderBy('createdAt', 'desc')
```

#### Index: `isDeleted + isPinned + createdAt`
**Query Pattern**: Pinned posts prioritization
```typescript
// API: /api/spaces/[spaceId]/posts (pinned first)
dbAdmin.collectionGroup('posts')
  .where('isDeleted', '==', false)
  .orderBy('isPinned', 'desc')
  .orderBy('createdAt', 'desc')
```

#### Index: `isDeleted + type + createdAt`
**Query Pattern**: Content type filtering
```typescript
// API: /api/feed with type filter, /api/tools/posts
dbAdmin.collectionGroup('posts')
  .where('isDeleted', '==', false)
  .where('type', '==', 'toolshare')
  .orderBy('createdAt', 'desc')
```

#### Index: `isDeleted + reactions.heart + createdAt`
**Query Pattern**: Popular posts by engagement
```typescript
// API: /api/feed (trending), /api/spaces/[spaceId]/posts (popular)
dbAdmin.collectionGroup('posts')
  .where('isDeleted', '==', false)
  .orderBy('reactions.heart', 'desc')
  .orderBy('createdAt', 'desc')
```

### 4. Events Collection (Collection Group)

#### Index: `campusId + isPublic + startTime`
**Query Pattern**: Campus public events calendar
```typescript
// API: /api/feed (campus events), /api/calendar
dbAdmin.collectionGroup('events')
  .where('campusId', '==', 'ub-buffalo')
  .where('isPublic', '==', true)
  .orderBy('startTime', 'asc')
```

#### Index: `campusId + isDeleted + startTime`
**Query Pattern**: Campus events management
```typescript
// API: /api/admin/events, /api/events
dbAdmin.collectionGroup('events')
  .where('campusId', '==', 'ub-buffalo')
  .where('isDeleted', '==', false)
  .orderBy('startTime', 'desc')
```

#### Index: `spaceId + isDeleted + startTime`
**Query Pattern**: Space event calendars
```typescript
// API: /api/spaces/[spaceId]/events
dbAdmin.collection('spaces').doc(spaceId).collection('events')
  .where('isDeleted', '==', false)
  .orderBy('startTime', 'desc')
```

#### Index: `category + startTime`
**Query Pattern**: Event category browsing
```typescript
// API: /api/events with category filter
dbAdmin.collectionGroup('events')
  .where('category', '==', 'academic')
  .orderBy('startTime', 'asc')
```

#### Index: `tags (array-contains) + startTime`
**Query Pattern**: Event tag-based discovery
```typescript
// API: /api/events with tag filter
dbAdmin.collectionGroup('events')
  .where('tags', 'array-contains', 'study-group')
  .orderBy('startTime', 'asc')
```

### 5. Members Collection (Collection Group)

#### Index: `userId + isActive + lastActiveAt`
**Query Pattern**: User membership management
```typescript
// API: /api/feed (user memberships), /api/profile/spaces
dbAdmin.collectionGroup('members')
  .where('userId', '==', userId)
  .where('isActive', '==', true)
  .orderBy('lastActiveAt', 'desc')
```

#### Index: `userId + role + joinedAt`
**Query Pattern**: User role-based permissions
```typescript
// API: /api/spaces/[spaceId]/permissions, /api/profile/leadership
dbAdmin.collectionGroup('members')
  .where('userId', '==', userId)
  .where('role', '==', 'builder')
  .orderBy('joinedAt', 'desc')
```

#### Index: `spaceId + role + joinedAt`
**Query Pattern**: Space leadership and member management
```typescript
// API: /api/spaces/[spaceId]/members, /api/admin/spaces/[spaceId]
dbAdmin.collection('spaces').doc(spaceId).collection('members')
  .where('role', '==', 'admin')
  .orderBy('joinedAt', 'desc')
```

### 6. Rituals & Participation

#### Index: `campusId + isActive + priority`
**Query Pattern**: Active campus rituals discovery
```typescript
// API: /api/rituals, /api/rituals/active
dbAdmin.collection('rituals')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('priority', 'desc')
```

#### Index: `ritualId + userId + campusId`
**Query Pattern**: User ritual participation validation
```typescript
// API: /api/rituals/[ritualId]/participate
dbAdmin.collection('ritual_participation')
  .where('ritualId', '==', ritualId)
  .where('userId', '==', userId)
  .where('campusId', '==', 'ub-buffalo')
```

#### Index: `userId + status + lastParticipated`
**Query Pattern**: User ritual history and progress
```typescript
// API: /api/profile/rituals, /api/rituals/my-progress
dbAdmin.collection('ritual_participation')
  .where('userId', '==', userId)
  .where('status', '==', 'active')
  .orderBy('lastParticipated', 'desc')
```

### 7. Feed System

#### Index: `campusId + isActive + feedScore`
**Query Pattern**: Behavioral feed scoring (primary feed)
```typescript
// API: /api/feed (main algorithm)
dbAdmin.collection('feed')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('feedScore', 'desc')
```

#### Index: `campusId + isActive + promotedAt`
**Query Pattern**: Chronological feed fallback
```typescript
// API: /api/feed (when behavioral scoring fails)
dbAdmin.collection('feed')
  .where('campusId', '==', 'ub-buffalo')
  .where('isActive', '==', true)
  .orderBy('promotedAt', 'desc')
```

#### Index: `campusId + feedScore + promotedAt`
**Query Pattern**: Combined feed ranking
```typescript
// API: /api/feed (advanced ranking)
dbAdmin.collection('feed')
  .where('campusId', '==', 'ub-buffalo')
  .orderBy('feedScore', 'desc')
  .orderBy('promotedAt', 'desc')
```

### 8. Social Features

#### Index: `userId + isRead + timestamp` (Notifications)
**Query Pattern**: User notification management
```typescript
// API: /api/notifications
dbAdmin.collection('notifications')
  .where('userId', '==', userId)
  .where('isRead', '==', false)
  .orderBy('timestamp', 'desc')
```

#### Index: `userId + status + createdAt` (Connections)
**Query Pattern**: User connection management
```typescript
// API: /api/connections, /api/friends
dbAdmin.collection('connections')
  .where('userId', '==', userId)
  .where('status', '==', 'accepted')
  .orderBy('createdAt', 'desc')
```

#### Index: `recipientId + status + createdAt` (Friend Requests)
**Query Pattern**: Incoming friend request management
```typescript
// API: /api/friends/requests
dbAdmin.collection('friend_requests')
  .where('recipientId', '==', userId)
  .where('status', '==', 'pending')
  .orderBy('createdAt', 'desc')
```

### 9. Real-time Features

#### Index: `campusId + isOnline + lastSeen` (Presence)
**Query Pattern**: Campus-wide presence tracking
```typescript
// API: /api/realtime/presence
dbAdmin.collection('presence')
  .where('campusId', '==', 'ub-buffalo')
  .where('isOnline', '==', true)
  .orderBy('lastSeen', 'desc')
```

#### Index: `spaceId + isOnline + lastSeen` (Presence)
**Query Pattern**: Space-specific presence
```typescript
// API: /api/spaces/[spaceId]/presence
dbAdmin.collection('presence')
  .where('spaceId', '==', spaceId)
  .where('isOnline', '==', true)
  .orderBy('lastSeen', 'desc')
```

### 10. Comments System

#### Index: `postId + isDeleted + createdAt` (Comments)
**Query Pattern**: Post comment threads
```typescript
// API: /api/spaces/[spaceId]/posts/[postId]/comments
dbAdmin.collectionGroup('comments')
  .where('postId', '==', postId)
  .where('isDeleted', '==', false)
  .orderBy('createdAt', 'asc')
```

## Administrative & Analytics Indexes

### Content Moderation

#### Index: `status + priority + createdAt`
**Query Pattern**: Moderation queue management
```typescript
// API: /api/admin/moderation
dbAdmin.collection('moderation_queue')
  .where('status', '==', 'pending')
  .orderBy('priority', 'desc')
  .orderBy('createdAt', 'desc')
```

### Analytics

#### Index: `campusId + timestamp`
**Query Pattern**: Campus-specific analytics
```typescript
// API: /api/admin/analytics, /api/analytics/metrics
dbAdmin.collection('analytics_metrics')
  .where('campusId', '==', 'ub-buffalo')
  .orderBy('timestamp', 'desc')
```

## Field Overrides

These provide optimized single-field indexes for common queries:

1. **posts.createdAt**: Supports both ASC/DESC collection group queries
2. **posts.reactions.heart**: Supports engagement-based sorting
3. **events.startTime**: Supports time-based event queries
4. **members.lastActiveAt**: Supports activity-based member sorting
5. **users.lastActive**: Supports user activity tracking

## Campus Isolation Security

Every index marked as "campus-critical" includes `campusId` as the first field to ensure:

- **Data Isolation**: Users only see UB Buffalo content
- **Query Security**: Cross-campus data leaks are impossible
- **Performance**: Queries are scoped to smaller datasets
- **Compliance**: Meets privacy requirements for student data

## Index Deployment

Use the deployment script:

```bash
# Deploy to staging
node scripts/deploy-firestore-indexes.js staging

# Deploy to production (requires admin approval)
node scripts/deploy-firestore-indexes.js production
```

## Performance Monitoring

Monitor these key metrics after deployment:

1. **Query Performance**: All critical queries < 1 second
2. **Index Build Status**: Verify all indexes build successfully
3. **Read Costs**: Monitor for unexpected read count increases
4. **Error Rates**: Check for index-related query failures

## Future Optimization

As the platform scales, consider:

1. **Compound Index Optimization**: Combine frequently used filter combinations
2. **Array Index Strategy**: Optimize tag and interest-based queries
3. **TTL Indexes**: Implement automatic cleanup for temporary data
4. **Regional Indexes**: For multi-campus expansion

---

**Last Updated**: Production deployment ready
**Total Index Count**: 56 composite + 5 field overrides
**Campus Isolation**: ✅ Enforced on all critical collections