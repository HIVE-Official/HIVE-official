# HIVE Firestore Data Model (vBETA)

This document defines the canonical data model for HIVE's vBETA release. It represents the validated architecture that balances data integrity with read-optimized performance for social features.

## Core Architecture Principles

### 1. Dual-Collection Strategy
- **Canonical Source:** `spaces/{spaceId}/posts/{postId}` is the absolute source of truth
- **Performance Mirror:** `globalFeed/{postId}` is a denormalized, read-optimized collection
- **Consistency:** Maintained via Firebase Functions, not application code

### 2. Optimization Philosophy
- **Read Performance:** Aggressive denormalization of frequently accessed data
- **Write Consistency:** Background functions handle data synchronization
- **Query Efficiency:** Designed to minimize document reads per view

## Collection Schemas

### 1. Campus Layer

#### `schools/{schoolId}`
```typescript
interface School {
  name: string;            // "University at Buffalo"
  slug: string;           // "ub"
  emoji: string;          // "🦬"
  seatQuota: number;      // 3000
  seatRemaining: number;  // 1729
  launchCountdown: Timestamp;
  createdAt: Timestamp;
}

// Sub-collections
interface Season {  // schools/{schoolId}/seasons/{seasonId}
  title: string;
  startsAt: Timestamp;
  endsAt: Timestamp;
  theme: string;
}

interface DailyMetrics {  // schools/{schoolId}/metricsDaily/{YYYYMMDD}
  newUsers: number;
  posts: number;
  comments: number;
  // ... other metrics
}
```

### 2. Identity Layer

#### `users/{uid}`
```typescript
interface User {
  // Core Identity
  email: string;
  displayName: string;
  handle: string;
  schoolId: string;  // FK -> schools
  role: "student" | "faculty" | "alumni";
  avatarURL: string;
  
  // Denormalized Stats (updated by Functions)
  stats: {
    spaceCount: number;
    followerCount: number;
    followingCount: number;
    postCount: number;
  };
  
  createdAt: Timestamp;
}

// Sub-collections
interface Notification {  // users/{uid}/notifications/{notifId}
  type: string;
  body: string;
  read: boolean;
  createdAt: Timestamp;
}

interface PersonalTool {  // users/{uid}/personalTools/{toolId}
  toolKey: string;
  version: number;
  config: Record<string, unknown>;
}

interface DeviceToken {  // users/{uid}/deviceTokens/{token}
  platform: "ios" | "android" | "web";
  token: string;
  lastActive: Timestamp;
}
```

### 3. Space Layer

#### `spaces/{spaceId}`
```typescript
interface Space {
  name: string;
  bannerURL: string;
  schoolId: string;  // FK -> schools
  ownerId: string;   // FK -> users
  visibility: "public" | "invite" | "hidden";
  
  // Denormalized Stats (updated by Functions)
  stats: {
    memberCount: number;
    postCount: number;
  };
  
  createdAt: Timestamp;
}

// Sub-collections
interface SpaceMember {  // spaces/{spaceId}/members/{uid}
  role: "admin" | "member";
  joinedAt: Timestamp;
}

interface SpaceInvite {  // spaces/{spaceId}/invites/{inviteId}
  email: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: Timestamp;
}

interface SpaceTool {  // spaces/{spaceId}/tools/{toolId}
  toolKey: string;
  version: number;
  config: Record<string, unknown>;
}

// CANONICAL SOURCE OF TRUTH FOR POSTS
interface SpacePost {  // spaces/{spaceId}/posts/{postId}
  authorId: string;  // FK -> users
  type: "text" | "poll" | "ritual";
  content: Record<string, unknown>;  // Varies by type
  
  // Denormalized for space feed performance
  authorInfo: {
    displayName: string;
    handle: string;
    avatarURL: string;
  };
  
  stats: {
    replyCount: number;
    likeCount: number;
  };
  
  createdAt: Timestamp;
}

interface PostComment {  // .../posts/{postId}/comments/{commentId}
  authorId: string;
  content: string;
  authorInfo: {  // Denormalized
    displayName: string;
    handle: string;
    avatarURL: string;
  };
  createdAt: Timestamp;
}

interface PostLike {  // .../posts/{postId}/likes/{uid}
  likedAt: Timestamp;
}
```

### 4. Global Feed Layer (Read-Optimized Mirror)

#### `globalFeed/{postId}`
```typescript
interface GlobalFeedPost {
  // Mirrored Core Post Data
  postId: string;
  type: "text" | "poll" | "ritual";
  content: Record<string, unknown>;
  createdAt: Timestamp;
  
  // Denormalized Association Data
  authorInfo: {
    uid: string;
    displayName: string;
    handle: string;
    avatarURL: string;
  };
  
  spaceInfo: {
    spaceId: string;
    name: string;
    bannerURL: string;
  };
  
  stats: {
    replyCount: number;
    likeCount: number;
  };
}
```

## Required Firebase Functions

These serverless functions are a mandatory part of the core infrastructure. They maintain data consistency and handle denormalization.

### 1. Post Synchronization

```typescript
/**
 * Mirrors posts to the global feed collection
 * Trigger: onWrite to spaces/{spaceId}/posts/{postId}
 */
export const onPostWrite = functions.firestore
  .document('spaces/{spaceId}/posts/{postId}')
  .onWrite(async (change, context) => {
    // Creates or updates corresponding document in /globalFeed
    // Merges canonical post data with fresh authorInfo and spaceInfo
  });

/**
 * Cleans up deleted posts from the global feed
 * Trigger: onDelete to spaces/{spaceId}/posts/{postId}
 */
export const onPostDelete = functions.firestore
  .document('spaces/{spaceId}/posts/{postId}')
  .onDelete(async (snap, context) => {
    // Removes corresponding document from /globalFeed
  });
```

### 2. Denormalization Updates

```typescript
/**
 * Updates denormalized user data across posts and comments
 * Trigger: onUpdate to users/{uid}
 */
export const updateUserDenormalization = functions.firestore
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    // Updates authorInfo on all posts and comments by this user
    // Uses batched writes for atomic updates
  });
```

### 3. Stats Aggregation

```typescript
/**
 * Updates various entity stats
 * Multiple triggers for different collections
 */
export const updateSpaceStats = functions.firestore
  .document('spaces/{spaceId}/members/{uid}')
  .onWrite(async (change, context) => {
    // Updates memberCount on parent space
  });

export const updatePostStats = functions.firestore
  .document('spaces/{spaceId}/posts/{postId}/likes/{uid}')
  .onWrite(async (change, context) => {
    // Updates likeCount on parent post
  });

// Additional stat aggregation functions...
```

## Security Rules

Key security principles for this data model:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Space posts are readable by space members
    match /spaces/{spaceId}/posts/{postId} {
      allow read: if isSpaceMember(spaceId);
      allow write: if isSpaceMember(spaceId);
    }
    
    // Global feed is readable by all authenticated users
    match /globalFeed/{postId} {
      allow read: if request.auth != null;
      allow write: if false;  // Only writable by Functions
    }
  }
}
```

## Implementation Notes

### Performance Considerations

1. **Feed Loading:**
   - Main feed reads from `globalFeed` collection
   - Pagination using `createdAt` timestamp
   - Consider implementing cursor-based pagination

2. **Space-Specific Feeds:**
   - Read directly from `spaces/{spaceId}/posts`
   - Avoids unnecessary joins with space data

3. **Profile Views:**
   - User data is denormalized where needed
   - Avoid querying for additional user info when rendering posts

### Data Consistency

1. **Write Path:**
   - All post writes go to canonical source
   - Functions handle mirroring to global feed
   - Stats updates are eventual consistency

2. **Update Path:**
   - Profile updates trigger denormalization
   - Background functions handle data propagation
   - Accept eventual consistency for non-critical updates

### Scaling Considerations

1. **Document Sizes:**
   - Keep denormalized data minimal
   - Monitor document sizes in global feed
   - Consider implementing cleanup for old feed items

2. **Query Patterns:**
   - Optimize for most common read patterns
   - Use composite indexes for complex queries
   - Monitor query performance in production

## Migration Notes

When implementing this schema:

1. Create all necessary indexes first
2. Implement and test Firebase Functions
3. Migrate existing data (if any) using background jobs
4. Verify security rules for all collections
5. Set up monitoring for Function execution

## Type Safety

This schema should be implemented with strict TypeScript types and Zod validation:

```typescript
// In packages/core/src/types/schema.ts
export interface Post extends z.infer<typeof PostSchema> {
  // ... type definitions
}

// In packages/validation/src/schemas.ts
export const PostSchema = z.object({
  // ... Zod schema definitions
});
``` 