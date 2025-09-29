# Profile System Data Schema & Business Logic

## Core Data Schemas

### 1. User Profile Schema (Firestore: `/users/{userId}`)
```typescript
interface UserProfile {
  // Identity
  uid: string;                    // Firebase Auth UID (primary key)
  displayName: string;            // Full name (required)
  email: string;                  // @buffalo.edu only
  avatarUrl?: string;             // Firebase Storage URL
  bio?: string;                   // Max 500 chars

  // Academic
  major: string;                  // Required
  gradYear: number;               // 2024-2028
  campusId: 'ub-buffalo';        // Campus isolation
  userType: 'student' | 'faculty' | 'alumni';

  // Social
  connectionCount: number;        // Auto-calculated
  friendCount: number;           // Auto-calculated
  followerCount: number;         // Auto-calculated
  followingCount: number;        // Auto-calculated

  // Privacy Settings
  visibility: {
    profile: 'public' | 'connections' | 'private';
    activity: 'public' | 'connections' | 'private' | 'ghost';
    spaces: 'public' | 'connections' | 'private' | 'ghost';
    connections: 'public' | 'connections' | 'private' | 'ghost';
    calendar: 'connections' | 'private';
  };

  // Presence
  isOnline: boolean;
  lastSeen: Timestamp;
  isGhostMode: boolean;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completionPercentage: number;  // Profile completeness

  // Badges & Status
  verified: boolean;              // Faculty verification
  badges: Badge[];
  status?: string;                // Custom status message
}
```

### 2. Connection Schema (Firestore: `/users/{userId}/connections/{connectionId}`)
```typescript
interface Connection {
  // Identity
  uid: string;                    // Connected user's UID
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  gradYear?: number;

  // Relationship
  connectionStrength: number;     // 0-100, calculated
  isFriend: boolean;             // Elevated connection
  isFollowing: boolean;          // One-way follow
  isFollower: boolean;           // They follow back

  // Interaction Metrics
  sharedSpaces: number;          // Spaces in common
  mutualConnections: number;     // Friends in common
  lastInteraction?: Timestamp;   // Last message/comment
  interactionCount: number;      // Total interactions

  // Metadata
  connectedAt: Timestamp;        // When connected
  friendsSince?: Timestamp;      // When became friends
  campusId: 'ub-buffalo';
}
```

### 3. Friend Request Schema (Firestore: `/users/{userId}/friendRequests/{requestId}`)
```typescript
interface FriendRequest {
  // Request Info
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  toUserId: string;

  // Content
  message?: string;              // Optional message

  // Status
  status: 'pending' | 'accepted' | 'rejected';

  // Metadata
  createdAt: Timestamp;
  respondedAt?: Timestamp;
  campusId: 'ub-buffalo';
}
```

### 4. Calendar Event Schema (Firestore: `/users/{userId}/calendar/{eventId}`)
```typescript
interface CalendarEvent {
  // Event Details
  id: string;
  title: string;
  description?: string;
  startTime: Timestamp;
  endTime: Timestamp;

  // Location
  location?: string;
  isVirtual?: boolean;
  virtualLink?: string;

  // Type & Privacy
  type: 'class' | 'study' | 'social' | 'work' | 'personal';
  isPrivate: boolean;

  // Recurring
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];      // 0-6 for weekly
    until?: Timestamp;
  };

  // Social
  spaceId?: string;              // Associated space
  spaceName?: string;
  attendees?: string[];          // User UIDs
  maxAttendees?: number;

  // Metadata
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  campusId: 'ub-buffalo';
}
```

### 5. Presence Schema (Firestore: `/presence/{userId}`)
```typescript
interface PresenceData {
  uid: string;
  campusId: 'ub-buffalo';
  status: 'online' | 'away' | 'ghost' | 'offline';
  lastSeen: Timestamp;
  lastActivity?: Timestamp;      // For away detection
  isGhostMode: boolean;

  // Device Info
  deviceInfo?: {
    browser: string;
    os: string;
    isMobile: boolean;
  };

  // Current Activity
  currentSpace?: string;         // Space they're viewing
  currentPage?: string;          // Page they're on
}
```

## Business Logic Rules

### Connection Strength Algorithm
```typescript
// Per SPEC.md requirements
function calculateConnectionStrength(connection: Connection): number {
  const interactions = Math.min(connection.interactionCount / 100, 1) * 0.4;
  const shared = Math.min(connection.sharedSpaces / 10, 1) * 0.3;
  const mutual = Math.min(connection.mutualConnections / 20, 1) * 0.3;

  return Math.round((interactions + shared + mutual) * 100);
}
```

### Privacy Rules
```typescript
function canViewWidget(
  widget: 'activity' | 'spaces' | 'connections',
  profileOwner: UserProfile,
  viewer: UserProfile | null
): boolean {
  const visibility = profileOwner.visibility[widget];

  if (visibility === 'ghost') return false;
  if (visibility === 'public') return true;
  if (!viewer) return false;
  if (visibility === 'private') return viewer.uid === profileOwner.uid;

  // Check if viewer is a connection
  if (visibility === 'connections') {
    return isConnection(profileOwner.uid, viewer.uid);
  }

  return false;
}
```

### Friend Request Rules
```typescript
// Can only send friend requests to existing connections
async function canSendFriendRequest(
  fromUserId: string,
  toUserId: string
): Promise<boolean> {
  // Must be connections first
  const isConnected = await checkConnection(fromUserId, toUserId);
  if (!isConnected) return false;

  // Can't already be friends
  const alreadyFriends = await checkFriendship(fromUserId, toUserId);
  if (alreadyFriends) return false;

  // Can't have pending request
  const hasPending = await checkPendingRequest(fromUserId, toUserId);
  if (hasPending) return false;

  return true;
}
```

### Presence Rules
```typescript
// Auto-away after 5 minutes of inactivity
const AWAY_TIMEOUT = 5 * 60 * 1000;

// Ghost mode behavior
function getVisiblePresence(user: PresenceData, viewer: UserProfile | null): string {
  if (user.isGhostMode) return 'offline';
  if (!viewer) return user.status === 'online' ? 'online' : 'offline';

  // Check if viewer can see real status
  const canSeePresence = isConnection(user.uid, viewer.uid);
  if (!canSeePresence) return 'offline';

  return user.status;
}
```

### Calendar Free Time Algorithm
```typescript
interface FreeTimeBlock {
  start: Date;
  end: Date;
  duration: number; // minutes
}

function findFreeTime(
  events: CalendarEvent[],
  date: Date
): FreeTimeBlock[] {
  const freeBlocks: FreeTimeBlock[] = [];
  const dayStart = new Date(date);
  dayStart.setHours(8, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(22, 0, 0, 0);

  // Sort events by start time
  const sortedEvents = events
    .filter(e => e.startTime >= dayStart && e.endTime <= dayEnd)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  let currentTime = dayStart;

  for (const event of sortedEvents) {
    if (event.startTime > currentTime) {
      freeBlocks.push({
        start: new Date(currentTime),
        end: new Date(event.startTime),
        duration: (event.startTime.getTime() - currentTime.getTime()) / 60000
      });
    }
    currentTime = new Date(Math.max(currentTime.getTime(), event.endTime.getTime()));
  }

  // Check for free time after last event
  if (currentTime < dayEnd) {
    freeBlocks.push({
      start: new Date(currentTime),
      end: dayEnd,
      duration: (dayEnd.getTime() - currentTime.getTime()) / 60000
    });
  }

  // Only return blocks >= 30 minutes
  return freeBlocks.filter(block => block.duration >= 30);
}
```

## Security Rules

### Firestore Security
```javascript
// Users can only edit their own profile
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
}

// Connections are readable by owner only
match /users/{userId}/connections/{connectionId} {
  allow read, write: if request.auth.uid == userId;
}

// Friend requests readable by recipient, writable by sender
match /users/{userId}/friendRequests/{requestId} {
  allow read: if request.auth.uid == userId;
  allow create: if request.auth.uid == resource.data.fromUserId;
  allow update: if request.auth.uid == userId;
}

// Calendar readable based on privacy, writable by owner
match /users/{userId}/calendar/{eventId} {
  allow read: if request.auth.uid == userId ||
    (!resource.data.isPrivate && isConnection(userId, request.auth.uid));
  allow write: if request.auth.uid == userId;
}

// Presence readable by all authenticated, writable by owner
match /presence/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
}
```

## API Endpoints

### Profile APIs
- `GET /api/profile/[id]` - Get public profile
- `POST /api/profile` - Update own profile
- `POST /api/profile/avatar` - Upload avatar
- `GET /api/profile/dashboard` - Get dashboard data

### Connection APIs
- `GET /api/connections` - List connections
- `POST /api/connections/[id]` - Create connection
- `DELETE /api/connections/[id]` - Remove connection
- `GET /api/connections/strength/[id]` - Calculate strength

### Friend APIs
- `GET /api/friends` - List friends
- `POST /api/friends/request` - Send friend request
- `POST /api/friends/[requestId]/accept` - Accept request
- `POST /api/friends/[requestId]/reject` - Reject request

### Calendar APIs
- `GET /api/calendar` - Get events
- `POST /api/calendar` - Create event
- `PUT /api/calendar/[id]` - Update event
- `DELETE /api/calendar/[id]` - Delete event
- `GET /api/calendar/free-time` - Find free time

### Presence APIs
- `POST /api/presence` - Update presence
- `POST /api/presence/ghost-mode` - Toggle ghost mode
- `GET /api/presence/[id]` - Get user presence

## State Management

### Profile Context
```typescript
interface ProfileContextValue {
  // Profile data
  profile: UserProfile | null;
  connections: Connection[];
  friendRequests: FriendRequest[];
  calendar: CalendarEvent[];

  // Presence
  presenceStatus: PresenceStatus;
  isGhostMode: boolean;

  // Actions
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  toggleGhostMode: () => Promise<void>;
  sendFriendRequest: (userId: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  createCalendarEvent: (event: CalendarEvent) => Promise<void>;
}
```

## Performance Considerations

1. **Connection Caching**: Cache connection list for 5 minutes
2. **Presence Debouncing**: Update presence max once per 30 seconds
3. **Calendar Optimization**: Only load current month + next month
4. **Friend Request Batching**: Process accepts/rejects in batches
5. **Profile Completeness**: Calculate on write, not read

## Privacy & Compliance

1. **Campus Isolation**: All queries filter by campusId
2. **Email Verification**: Only @buffalo.edu emails
3. **Data Retention**: Soft delete with 30-day recovery
4. **GDPR Compliance**: Export and deletion on request
5. **Activity Logging**: Audit trail for all profile changes