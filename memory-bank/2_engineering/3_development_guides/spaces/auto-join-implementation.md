# Space Join/Leave Implementation Guide

## Overview

The space join/leave system handles both automatic and manual space membership management:
- **Auto-Join:** Automatically adds new users to relevant spaces during onboarding
- **Manual Join/Leave:** Allows users to manually join or leave spaces
- **Major/Residential Changes:** Updates space memberships when users change their academic or residential information

## Implementation Architecture

### 1. Auto-Join API Route

**Location:** `apps/web/src/app/api/spaces/auto-join/route.ts`

This API route handles the core auto-join logic, including:
- User validation and data retrieval
- Space discovery and auto-creation
- Atomic membership operations

#### Key Features:
- **Space Auto-Creation:** Creates major-specific spaces if they don't exist
- **Atomic Operations:** Uses Firestore batched writes for consistency
- **Major Recognition:** Integrates with UB_MAJORS data for proper space naming
- **Dual Space Assignment:** Auto-joins to both academic (major) and residential (general) spaces

### 2. Manual Join API Route

**Location:** `apps/web/src/app/api/spaces/join/route.ts`

Handles user-initiated space joining with comprehensive validation:
- Authentication verification
- Space existence and status checks
- School-based access control
- Duplicate membership prevention

#### Key Features:
- **School Verification:** Users can only join spaces from their school
- **Status Checks:** Prevents joining frozen or dormant spaces
- **Atomic Operations:** Uses batched writes for consistency
- **Conflict Prevention:** Checks for existing memberships

### 3. Manual Leave API Route

**Location:** `apps/web/src/app/api/spaces/leave/route.ts`

Handles user-initiated space leaving:
- Membership validation
- Graceful removal with member count updates
- Builder role considerations (logged but not restricted in vBETA)

### 4. Membership Update API Route

**Location:** `apps/web/src/app/api/spaces/update-memberships/route.ts`

Handles space membership changes when users update their major or residential information:
- Automatically leaves old major spaces
- Joins new major spaces (creates if needed)
- Notes residential changes for future implementation
- Atomic batch operations for consistency

### 2. Integration Points

#### Onboarding Integration
The auto-join logic is integrated into the onboarding completion flow:

**Location:** `apps/web/src/app/api/auth/complete-onboarding/route.ts`

After successful onboarding completion, the system automatically calls the auto-join API to ensure seamless user experience.

### 3. Space Creation Logic

#### Major Spaces
- **Naming Convention:** `{Major Name} Majors` (e.g., "Computer Science Majors")
- **Type:** `major`
- **Sub-type:** Exact major name from user profile
- **Auto-Generated Description:** Standardized community-focused messaging

#### Residential Spaces  
- **Naming Convention:** "UB Community" (general residential space)
- **Type:** `residential`
- **Sub-type:** `general`
- **Purpose:** Provides a broad community space for all students

### 4. Data Models

#### Space Creation Schema
```typescript
interface AutoCreatedSpace {
  name: string;
  name_lowercase: string;
  description: string;
  memberCount: 0;
  schoolId: string;
  type: 'major' | 'residential';
  tags: Array<{
    type: SpaceType;
    sub_type: string;
  }>;
  status: 'activated';
  createdAt: serverTimestamp;
  updatedAt: serverTimestamp;
}
```

#### Membership Creation
```typescript
interface AutoJoinMembership {
  uid: string;
  role: 'member';
  joinedAt: serverTimestamp;
}
```

## Technical Implementation Details

### 1. Atomic Operations

All auto-join operations use Firestore batched writes to ensure atomicity:

```typescript
const batch = writeBatch(db);

// Create space if needed
batch.set(spaceRef, newSpace);

// Add membership
batch.set(memberRef, memberData);

// Update member count
batch.update(spaceRef, { memberCount: increment(1) });

// Execute atomically
await batch.commit();
```

### 2. Error Handling

The implementation includes comprehensive error handling:
- **User Validation:** Ensures user exists and has required fields
- **Space Creation Failures:** Handles edge cases in space creation
- **Membership Conflicts:** Prevents duplicate memberships
- **Graceful Degradation:** Onboarding succeeds even if auto-join fails

### 3. UB Majors Integration

The system integrates with the UB_MAJORS data to:
- Validate major names
- Generate consistent space names
- Provide fallback naming for unrecognized majors

## Testing Strategy

### Unit Tests
**Location:** `apps/web/src/app/api/spaces/auto-join/route.test.ts`

Tests cover:
- Input validation (missing userId, invalid user data)
- User not found scenarios
- Missing required fields handling
- Error response formats

### Integration Testing
The auto-join functionality should be tested as part of the complete onboarding flow to ensure proper integration.

## Performance Considerations

### 1. Query Optimization
- Uses `limit(1)` for space discovery queries
- Leverages Firestore compound indexes for efficient filtering
- Batched operations minimize round trips

### 2. Scalability
- Space creation is on-demand, preventing unnecessary resource usage
- Member count updates use atomic increment operations
- No hot spots created by sequential space creation

## Security Considerations

### 1. Data Validation
- All user input is validated before processing
- Firebase security rules enforce proper access controls
- Member documents follow established security patterns

### 2. Rate Limiting
The auto-join process is naturally rate-limited by the onboarding flow, preventing abuse.

## Monitoring and Observability

### 1. Logging
The implementation includes comprehensive logging:
- User auto-join attempts
- Space creation events
- Membership addition confirmations
- Error scenarios and recovery

### 2. Metrics to Monitor
- Auto-join success rate
- Space creation frequency
- Member distribution across auto-created spaces
- Onboarding completion to auto-join latency

## Future Enhancements

### 1. Residential Space Refinement
Currently uses a general "UB Community" space. Future versions could:
- Create dorm-specific spaces
- Integrate with housing data
- Provide year-based residential communities

### 2. Interest-Based Auto-Join
Potential expansion to include:
- Interest-based spaces from onboarding preferences
- Popular space recommendations
- Dynamic space suggestions based on profile

### 3. Analytics Integration
Enhanced tracking could include:
- User engagement metrics post auto-join
- Space health monitoring
- Community formation success rates

## Troubleshooting Guide

### Common Issues

1. **Space Creation Failures**
   - Check Firestore permissions
   - Verify space schema compliance
   - Review batch operation limits

2. **Membership Conflicts**
   - Implement idempotency checks
   - Handle duplicate membership gracefully
   - Log conflict resolution

3. **Integration Issues**
   - Verify onboarding completion triggers
   - Check API route availability
   - Monitor network connectivity

### Debugging Steps

1. Check Firestore logs for transaction failures
2. Verify user data completeness in onboarding
3. Monitor auto-join API response times and success rates
4. Review space creation patterns for anomalies

## Compliance and Data Protection

The auto-join system respects user privacy by:
- Only using necessary profile data for space assignment
- Following established data retention policies
- Maintaining audit trails for membership changes
- Enabling users to leave auto-joined spaces if desired 