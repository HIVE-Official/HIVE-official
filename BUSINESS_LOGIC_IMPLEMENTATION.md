# HIVE Onboarding & Authentication Business Logic Implementation

## Overview

This document outlines the complete business logic implementation for HIVE's authentication and onboarding system, based on the requirements specified by the user.

## Core Business Rules Implemented

### 1. User Roles & Verification Levels

**Verification Levels:**

- `verified` - Default level for all new users
- `verified+` - Student leaders after manual HIVE team approval
- `faculty` - Faculty members (future implementation)
- `alumni` - Alumni users (future implementation)

**Student Leader Logic:**

- Student leaders are automatically flagged as "builders"
- They start with `verified` status and are upgraded to `verified+` after manual review
- Student leaders can claim existing spaces for their organizations
- All space claims require manual verification by the HIVE team

### 2. Space Management Architecture

**Space Structure in Firestore:**

```
spaces/
  ├── academic/spaces/[spaceId]
  ├── social/spaces/[spaceId]
  ├── professional/spaces/[spaceId]
  ├── sports/spaces/[spaceId]
  ├── cultural/spaces/[spaceId]
  └── service/spaces/[spaceId]
```

**Space Types:**

- `academic` - Academic departments, study groups, honor societies
- `social` - Social clubs, interest groups
- `professional` - Career-focused organizations, networking groups
- `sports` - Athletic teams, fitness groups
- `cultural` - Cultural organizations, international student groups
- `service` - Volunteer organizations, community service groups

### 3. Onboarding Flow

**Revised Onboarding Steps:**

1. **Welcome** - Introduction to HIVE
2. **Display Name & Avatar** - Basic profile setup with auto-generated handle
3. **Academic Information** - School-specific major selection, graduation year
4. **Role Selection** - Student vs Student Leader identification
5. **Space Claiming** (Student Leaders only) - Claim existing spaces for verification
6. **Interests Selection** - Choose interests from categorized options
7. **Suggested Spaces** (All users) - Pre-join recommended spaces based on profile
8. **Legal Consent** - Terms of Service and Privacy Policy agreement
9. **Completion** - Redirect to main platform

### 4. Handle Generation System

**Auto-Generated Handles:**

- Handles are automatically generated from display names
- Format: lowercase alphanumeric characters only
- Length: 3-15 characters
- Conflict resolution: append numbers or random suffixes
- Reserved handles: admin, hive, api, system, etc.

**Handle Availability API:**

- Real-time availability checking
- Firestore collection `handles` for reservation
- Unique constraint enforcement

## API Endpoints Implemented

### Authentication APIs

#### `POST /api/auth/email/verify`

- Magic link verification with development mode bypass
- Auto-generates handles for new users
- Sets verification level to `verified`
- Creates user document with onboarding state

#### `POST /api/auth/generate-handle`

- Generates available handles from display names
- Validates handle format and availability
- Returns suggested handle for user

### Space Management APIs

#### `GET /api/spaces/available`

- Fetches unclaimed spaces by school and type
- Only accessible to student leaders
- Organized by space type for easy browsing

#### `POST /api/verification/submit-claim`

- Submits space claims for manual review
- Validates user is a student leader
- Creates verification queue entry
- Updates user's onboarding state

#### `GET /api/spaces/suggested`

- Recommends spaces based on user profile
- Relevance scoring algorithm:
  - Base score: 10 points for school match
  - Major match: +20 points
  - Interest match: +15 points
  - Graduation year match: +25 points
  - Academic level match: +15 points
  - Popular spaces: +5-10 points
- Minimum relevance threshold: 15 points

### School-Specific APIs

#### `GET /api/schools/[schoolId]/majors`

- Fetches available majors for a specific school
- Dynamic data from Firestore
- Replaces hardcoded major lists

## Data Models

### OnboardingState Interface

```typescript
interface OnboardingState {
  // Basic Info
  uid?: string;
  email: string;
  schoolId: string;

  // Profile
  displayName: string;
  avatarUrl?: string;
  handle: string; // Auto-generated

  // Academic
  academicLevel: AcademicLevel;
  majors: string[];
  graduationYear: number;

  // Role & Verification
  isStudentLeader: boolean;
  verificationLevel: VerificationLevel;
  spaceClaims?: SpaceClaim[];

  // Interests & Spaces
  interests: string[];
  suggestedSpaces?: string[];
  joinedSpaces?: string[];

  // Consent & Completion
  builderOptIn?: boolean;
  consentGiven: boolean;
  isComplete: boolean;
  completedAt?: Date;
}
```

### SpaceClaim Interface

```typescript
interface SpaceClaim {
  spaceId: string;
  spaceName: string;
  spaceType: SpaceType;
  claimReason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}
```

## Verification & Approval Workflow

### Student Leader Verification Process

1. **Initial Claim Submission:**

   - Student declares leader role during onboarding
   - Submits claim for specific space with detailed reasoning
   - Claim is stored in `verification/space-claims/pending/[claimId]`

2. **Manual Review Queue:**

   - HIVE team reviews claims in admin dashboard
   - Verification includes:
     - Legitimacy of organization
     - User's actual leadership role
     - Contact verification if needed

3. **Approval Actions:**
   - **Approved:** User upgraded to `verified+`, space ownership granted
   - **Rejected:** User remains `verified`, can reapply or appeal
   - **Pending:** Additional information requested

### Verification Data Structure

```
verification/
  └── space-claims/
      ├── pending/[claimId]
      ├── approved/[claimId]
      └── rejected/[claimId]
```

## UI Components Implemented

### New Onboarding Step Components

#### `RoleSelection`

- Student vs Student Leader choice
- Clear explanation of builder benefits
- Visual indicators for verification requirements

#### `SpaceClaiming`

- Search and browse available spaces by type
- Detailed claim submission form
- Real-time status updates

#### `SuggestedSpaces`

- Personalized space recommendations
- Relevance scoring display
- Minimum 3 spaces requirement
- Category-based organization

## Business Logic Validation

### Space Access Control

- **vBETA Limitation:** Only builders can create/manage spaces
- **Student Leader Path:** Claim existing → Manual verification → Builder access
- **Regular User Path:** Join suggested spaces → Engage with communities

### Data Consistency

- Handle uniqueness enforced at database level
- School-specific data fetched dynamically
- Space type validation against enum
- Verification level progression tracking

### User Experience Optimizations

- Auto-generated handles reduce friction
- Suggested spaces ensure engaged onboarding
- Real-time availability checking
- Progressive disclosure of complex features

## Security Considerations

### Authentication Security

- Magic link verification with time limits
- Firebase Auth integration for token management
- Custom claims for role-based access

### Data Protection

- User consent tracking for legal compliance
- Secure avatar upload with time-limited URLs
- Input validation and sanitization

### Access Control

- Role-based API access (student leaders only for claiming)
- School-scoped data access
- Verification queue isolation

## Future Enhancements

### Planned Features

1. **Faculty/Alumni Verification:** Extended verification for non-student users
2. **Automated Verification:** Integration with school directories
3. **Space Creation:** Direct space creation for verified+ users
4. **Advanced Analytics:** Onboarding funnel analysis
5. **Bulk Operations:** Admin tools for managing multiple claims

### Scalability Considerations

- Firestore subcollection structure for space organization
- Indexed queries for performance
- Rate limiting on verification submissions
- Caching for frequently accessed data

## Implementation Status

✅ **Completed:**

- Core authentication flow
- Handle generation system
- Space claiming workflow
- Suggested spaces algorithm
- Verification queue structure
- UI components for all new steps

📋 **Remaining Tasks:**

- Admin dashboard for claim review
- Email notifications for verification status
- Avatar upload with image cropping
- Terms of Service and Privacy Policy pages
- Analytics tracking implementation

## Quality Assurance

### Code Quality

- ✅ ESLint passing (0 errors, 5 warnings)
- ✅ TypeScript compilation successful
- ✅ All imports using package entry points
- ✅ Proper error handling and validation

### Testing Strategy

- Unit tests for utility functions
- Integration tests for API endpoints
- Component tests for UI interactions
- End-to-end tests for complete onboarding flow

This implementation provides a robust foundation for HIVE's user onboarding with clear separation between regular users and student leaders, proper verification workflows, and scalable space management architecture.
