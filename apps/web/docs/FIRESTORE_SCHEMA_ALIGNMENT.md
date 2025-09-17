# Firestore Schema Alignment Guide

## Core Collections & Their Schemas

### 1. Users Collection (`users`)
```typescript
interface UserProfile {
  // Basic Identity
  id: string;                    // Firebase Auth UID
  email: string;                  // @buffalo.edu email
  fullName: string;               // Combined first + last name
  handle: string;                 // Unique @handle
  pronouns?: string;              // Optional pronouns
  bio?: string;                   // Profile bio
  avatarUrl?: string;             // Profile photo URL
  profilePhoto?: string;          // Alternative field for photo

  // Academic Info (UB-specific)
  major: string;                  // Primary major (legacy single field)
  majors?: string[];              // Multiple majors support
  minor?: string;                 // Minor field
  academicLevel?: string;         // Freshman, Sophomore, etc.
  academicYear: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";
  graduationYear: number;         // Expected graduation year
  housing?: string;               // Dorm/housing info
  interests: string[];            // User interests for matching
  goals: string[];                // Academic/career goals

  // Platform Status
  schoolId: string;               // 'ub-buffalo' for UB
  userType: "student" | "faculty" | "alumni";
  builderStatus: boolean;         // Has builder permissions
  emailVerified: boolean;         // Email verification status
  onboardingCompleted: boolean;   // Completed onboarding

  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt: Timestamp;
}
```

### 2. Spaces Collection (`spaces`)
```typescript
interface SpaceDocument {
  id: string;                     // Unique space ID
  name: string;                   // Display name
  description: string;            // Space description
  type: "academic" | "residential" | "greek" | "interest" | "professional" | "special";
  status: "dormant" | "frozen" | "activated";
  
  // Identity
  avatar?: string;                // Space avatar
  bannerUrl?: string;             // Banner image
  emoji?: string;                 // Space emoji
  
  // Campus Context
  campusId: string;               // 'ub-buffalo'
  schoolId?: string;              // Alternative field
  tags: Array<{
    type: string;
    sub_type: string;
  }>;
  
  // Stats
  memberCount: number;
  postsCount: number;
  eventsCount: number;
  
  // Settings
  visibility: "public" | "private" | "invite";
  category?: string;              // Space category
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActivityAt?: Timestamp;
}
```

### 3. Space Members (Subcollection: `spaces/{spaceId}/members`)
```typescript
interface SpaceMember {
  id: string;                     // userId
  spaceId: string;                // Parent space ID
  role: "owner" | "admin" | "moderator" | "member";
  status: "active" | "inactive" | "suspended";
  
  // Permissions
  permissions: {
    canPost: boolean;
    canModerate: boolean;
    canManageMembers: boolean;
    canManageTools: boolean;
    canViewAnalytics: boolean;
    canConfigureSpace: boolean;
  };
  
  // Activity
  joinedAt: Timestamp;
  lastActiveAt?: Timestamp;
  contributionScore: number;
  postsCount: number;
  
  // Notification preferences
  notificationSettings?: {
    posts: boolean;
    events: boolean;
    mentions: boolean;
  };
}
```

## Data Flow During Onboarding

### Step 1: Authentication
```javascript
// Magic link creates Firebase Auth user
{
  uid: "auto-generated",
  email: "student@buffalo.edu",
  emailVerified: false
}
```

### Step 2: Profile Creation
```javascript
// Creates document in users collection
await db.collection('users').doc(uid).set({
  id: uid,
  email: user.email,
  fullName: `${firstName} ${lastName}`,
  handle: uniqueHandle,
  
  // Academic info
  major: majors[0], // Primary major for legacy compatibility
  majors: majors,   // Array for multiple majors
  academicYear: determineAcademicYear(graduationYear),
  graduationYear: graduationYear,
  interests: selectedInterests,
  
  // Platform info
  schoolId: 'ub-buffalo',
  userType: userType,
  builderStatus: false, // Updated later if approved
  emailVerified: false, // Updated after email verification
  onboardingCompleted: true,
  
  // Timestamps
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
  lastActiveAt: FieldValue.serverTimestamp()
});
```

### Step 3: Privacy Settings
```javascript
// Creates document in privacySettings collection
await db.collection('privacySettings').doc(uid).set({
  userId: uid,
  ghostMode: false,
  profileVisibility: 'public',
  showActivity: true,
  showConnections: true,
  showAcademicInfo: true,
  socialDiscovery: true,
  friendRequests: 'everyone',
  studyPartnerMatching: true,
  allowAnalytics: true,
  dataProcessing: {
    recommendations: true,
    personalization: true,
    research: false
  },
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp()
});
```

### Step 4: Auto-Join Spaces
```javascript
// For each auto-join space
const spacesToJoin = [
  `${major}-${graduationYear}`,     // e.g., "cs-2025"
  `class-of-${graduationYear}`,     // e.g., "class-of-2025"
  ...interestBasedSpaces            // Based on selected interests
];

for (const spaceId of spacesToJoin) {
  // Add member to space
  await db.collection('spaces').doc(spaceId)
    .collection('members').doc(uid).set({
      id: uid,
      spaceId: spaceId,
      role: 'member',
      status: 'active',
      permissions: {
        canPost: true,
        canModerate: false,
        canManageMembers: false,
        canManageTools: false,
        canViewAnalytics: false,
        canConfigureSpace: false
      },
      joinedAt: FieldValue.serverTimestamp(),
      contributionScore: 0,
      postsCount: 0
    });
    
  // Update space member count
  await db.collection('spaces').doc(spaceId).update({
    memberCount: FieldValue.increment(1),
    lastActivityAt: FieldValue.serverTimestamp()
  });
}
```

### Step 5: Builder Requests (if applicable)
```javascript
// If user requested builder access for spaces
for (const spaceId of builderRequestSpaces) {
  await db.collection('builderRequests').add({
    userId: uid,
    userHandle: handle,
    spaceId: spaceId,
    requestType: 'builder',
    status: 'pending',
    reason: 'Requested during onboarding',
    requestedAt: FieldValue.serverTimestamp()
  });
}
```

## Critical Field Mappings

### Onboarding Form → Firestore Document

| Onboarding Field | Firestore Field | Notes |
|-----------------|-----------------|-------|
| `firstName + lastName` | `fullName` | Combined into single field |
| `majors[]` | `majors[]` AND `major` | Array stored in `majors`, first item in `major` for legacy |
| `graduationYear` | `graduationYear` | Direct mapping |
| `handle` | `handle` | Must be unique across platform |
| `userType` | `userType` | student/faculty/alumni |
| `interests[]` | `interests[]` | Used for space recommendations |
| `profilePhoto` | `avatarUrl` OR `profilePhoto` | Both fields supported |
| `builderRequestSpaces[]` | Creates separate `builderRequests` documents | Not stored in user profile |

## Existing Pre-Seeded Data

### Schools Collection
- `ub-buffalo`: University at Buffalo configuration

### Spaces Collection (Pre-seeded)
- Academic spaces by major/year
- Interest-based communities
- Campus-specific spaces (North Campus, South Campus)
- Special purpose spaces (Hackathon Club, etc.)

### Important Considerations

1. **Field Compatibility**: Some fields have both singular and plural versions (e.g., `major` vs `majors`) for backward compatibility

2. **Timestamp Fields**: Always use `FieldValue.serverTimestamp()` for consistency

3. **Space Membership**: Creating a user doesn't automatically add them to spaces - this must be done explicitly

4. **Builder Status**: Initially false, updated only after admin approval

5. **Email Verification**: Separate process after onboarding completion

## Query Patterns

### Get User Profile
```javascript
const userDoc = await db.collection('users').doc(uid).get();
const userData = userDoc.data();
```

### Get User's Spaces
```javascript
const spaces = await db.collectionGroup('members')
  .where('id', '==', uid)
  .where('status', '==', 'active')
  .get();
```

### Check Handle Availability
```javascript
const existing = await db.collection('users')
  .where('handle', '==', proposedHandle)
  .get();
const isAvailable = existing.empty;
```

## Validation Rules

1. **Email**: Must be @buffalo.edu domain
2. **Handle**: 3-20 characters, alphanumeric + ._-
3. **Graduation Year**: Current year to +10 years
4. **User Type**: Must be one of: student, faculty, alumni
5. **Majors**: At least one required for students

## Error Handling

Common errors and their handling:

- **Duplicate Handle**: Return specific error for user to choose different handle
- **Invalid Email Domain**: Reject non-Buffalo emails
- **Missing Required Fields**: Validate before Firestore write
- **Space Not Found**: Gracefully skip auto-join for missing spaces
- **Transaction Failures**: Retry with exponential backoff