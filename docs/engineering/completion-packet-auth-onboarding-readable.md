# HIVE Authentication & Onboarding - Completion Packet (Readable Format)

## Purpose and Scope

This completion packet provides the framework for building HIVE's authentication and onboarding system with full consideration for:
- Data architecture and API design
- User interface and motion design  
- Security protocols and analytics
- Accessibility compliance and testing
- Launch readiness and monitoring

## Current State Analysis

### What We Have ✅
- **Firebase Auth foundation** with magic link authentication
- **Complete UI components** in `@hive/ui` package
- **5-step onboarding flow** with Zustand state management
- **Route protection** with `RouteGuard` component
- **Development mode** with mock user support
- **Basic API routes** for email start/verify

### Critical Gaps ❌
- **No data persistence** - onboarding data not saved to Firestore
- **Incomplete API endpoints** - TODOs in `/api/auth/complete-onboarding`
- **Missing handle uniqueness** checking
- **No space verification** logic for student leaders
- **Missing analytics** tracking throughout flows
- **Security vulnerabilities** in development mode bypasses

## System Dependencies

### Core HIVE Packages
- `@hive/auth-logic` - Authentication context and Firebase config
- `@hive/core` - Business logic, types, logging utilities
- `@hive/ui` - All interface components and design system
- `@hive/validation` - Zod schemas and runtime validation
- `@hive/hooks` - Shared React hooks and state management
- `@hive/utilities` - Common helper functions
- `@hive/tokens` - Design system tokens

### Firebase Services
- **Firebase Auth** - Magic link authentication, token management
- **Firestore** - User profiles, onboarding data, space memberships
- **Cloud Functions** - Server-side auth logic, onboarding completion
- **Firebase Admin SDK** - Server-side user management, custom claims

### External Dependencies
- **Next.js App Router** - Authentication routes and API endpoints
- **Zustand** - Client-side state management
- **React Query** - Server state management and caching
- **Framer Motion** - UI animations and transitions
- **Vitest + Playwright** - Testing framework

## Data Schema

### User Profile Document (`users/{uid}`)
```typescript
{
  // Identity
  uid: string              // Firebase Auth ID
  email: string            // Verified .edu email
  fullName: string         // Display name
  handle: string           // Unique username (3-20 chars)
  avatarUrl?: string       // Profile image URL
  
  // Status
  emailVerified: boolean   // Email verification status
  onboardingCompleted: boolean
  role: 'public' | 'verified' | 'verifiedPlus' | 'moderator' | 'admin'
  
  // Academic Info
  academicLevel: 'undergraduate' | 'masters' | 'phd'
  majors: string[]         // Multiple majors supported
  graduationYear: number   // Four-digit year
  interests: string[]      // User-selected interests
  
  // Leadership
  isStudentLeader: boolean
  spaceId?: string         // Associated space for leaders
  
  // Timestamps
  createdAt: timestamp
  updatedAt: timestamp
  lastActiveAt: timestamp
}
```

### Space Document (`spaces/{spaceId}`)
```typescript
{
  id: string
  name: string
  description: string
  category: 'Major' | 'Residential' | 'Student Life' | 'Club' | 'General'
  createdBy: string        // User ID
  isPublic: boolean
  imageUrl: string
  memberCount: number      // Cached count
  createdAt: timestamp
}
```

### Verification Document (`verifications/{verificationId}`)
```typescript
{
  id: string
  userId: string           // User being verified
  spaceId: string          // Space being verified
  verificationEmails: string[]  // Contact emails (max 4)
  status: 'pending' | 'in_progress' | 'approved' | 'rejected'
  submittedAt: timestamp
  reviewedAt?: timestamp
  reviewedBy?: string      // Admin user ID
  notes?: string           // Admin notes
}
```

## API Endpoints

### Authentication
- `POST /api/auth/email/start`
  - **Input**: `{ email: string }`
  - **Validation**: .edu domain required
  - **Rate limit**: 3 attempts per 15 minutes per email
  - **Output**: `{ ok: boolean, timeoutMs: number, message: string }`

- `POST /api/auth/email/verify`
  - **Input**: `{ email: string, url: string }`
  - **Process**: Validate magic link with Firebase Auth
  - **Output**: `{ ok: boolean, user: UserData, idToken: string }`

### Onboarding
- `POST /api/auth/complete-onboarding` ⚠️ **NEEDS COMPLETION**
  - **Input**: Complete `OnboardingData` payload
  - **Validation**: Zod schema validation
  - **Process**: 
    - Check handle uniqueness
    - Create/update user document (transaction)
    - Update Firebase Auth custom claims
    - Create space if student leader
  - **Output**: `{ ok: boolean, message: string, userId?: string }`

### Profile Management (NEW)
- `GET /api/profile/me` - Get current user profile
- `PATCH /api/profile/me` - Update profile fields
- `POST /api/profile/check-handle` - Validate handle availability

### Space & Verification (NEW)
- `POST /api/spaces/create` - Create space for verified leaders
- `POST /api/verification/submit` - Submit verification request
- `GET /api/verification/status` - Check verification status

### Admin (NEW)
- `GET /api/admin/verifications` - List pending verifications
- `POST /api/admin/verifications/{id}/approve` - Approve verification
- `POST /api/admin/verifications/{id}/reject` - Reject verification

## User Flow State Machines

### Authentication States
1. `anonymous` → User can view public content
2. `email_pending` → Valid .edu email submitted
3. `email_verification` → Magic link sent, user checking email
4. `authenticated_unverified` → Magic link clicked
5. `authenticated_verified` → Email verification complete
6. `authenticated_onboarding_required` → Needs onboarding
7. `authenticated_complete` → Ready to use platform

### Onboarding States
1. `onboarding_start` → Redirected to `/onboarding/1`
2. `step_1_display_name` → Name and handle collection
3. `step_2_leader_question` → Leadership status determination
4. `step_3_space_verification` → Space verification (leaders only)
5. `step_4_academic_card` → Academic information
6. `step_5_interests` → Interest selection
7. `onboarding_submitting` → Data submission in progress
8. `onboarding_complete` → Success, redirect to feed

### Verification States (Parallel to onboarding)
1. `verification_not_required` → Regular users
2. `verification_pending_submission` → Leaders need to submit details
3. `verification_submitted` → Waiting for admin review
4. `verification_under_review` → Admin processing
5. `verification_approved` → Can create spaces
6. `verification_rejected` → Can resubmit with more info

## Security Requirements

### Critical Security Issues to Address
- **Email enumeration prevention** - Consistent responses regardless of email existence
- **Rate limiting** - Prevent brute force attacks
- **CSRF protection** - All authentication endpoints
- **Magic link security** - Single use, 15-minute expiration
- **Development mode lockdown** - Completely disabled in production
- **Input sanitization** - Prevent XSS and injection attacks
- **Handle validation** - Prevent Unicode attacks and SQL injection
- **Privilege escalation prevention** - Server-side role validation
- **Session security** - Proper token validation and refresh

### Rate Limits
- Authentication attempts: 3 per 15 minutes per email
- Profile updates: 10 per hour per user
- Handle checks: 20 per minute per user
- Space creation: 1 per day per user

## Analytics Events

### Authentication Funnel
- `auth_email_page_viewed`
- `auth_email_submitted`
- `auth_email_invalid`
- `auth_magic_link_sent`
- `auth_magic_link_clicked`
- `auth_verification_completed`
- `auth_verification_failed`

### Onboarding Funnel
- `onboarding_started`
- `onboarding_step_completed` (with step number)
- `onboarding_step_abandoned`
- `onboarding_validation_error`
- `onboarding_completed`

### Verification Tracking
- `verification_leadership_claimed`
- `verification_details_submitted`
- `verification_admin_review_started`
- `verification_approved`
- `verification_rejected`
- `space_created_post_verification`

### Security Events
- `suspicious_login_attempt`
- `rate_limit_exceeded`
- `invalid_token_usage`
- `admin_action_performed`

## UI Components Status

### Existing Components ✅
- `AuthForm` - Email entry interface
- `MagicLinkSent` - Confirmation page
- `DisplayNameAvatar` - Step 1 component
- `LeaderQuestion` - Step 2 component  
- `SpaceVerification` - Step 3 component
- `AcademicCard` - Step 4 component
- `Interests` - Step 5 component
- `RouteGuard` - Access control
- `DevModePanel` - Development tools

### Component Enhancements Needed
- **Real-time handle checking** with visual feedback
- **Improved avatar upload** flow with preview
- **Better space creation** interface
- **Enhanced error states** with recovery options
- **Loading animations** with Framer Motion
- **Accessibility improvements** for WCAG 2.1 AA

## Testing Strategy

### Unit Tests
- [ ] Authentication hook (`useAuth`)
- [ ] Onboarding store (Zustand)
- [ ] Form validation logic
- [ ] Handle uniqueness checking
- [ ] State machine transitions

### Integration Tests  
- [ ] Complete authentication flow
- [ ] End-to-end onboarding process
- [ ] Space creation for leaders
- [ ] Verification workflow
- [ ] Error handling scenarios

### E2E Tests (Playwright)
- [ ] Full user signup journey
- [ ] Student leader verification process
- [ ] Mobile responsive flows
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility

### Security Tests
- [ ] Rate limiting enforcement
- [ ] Input validation bypass attempts
- [ ] Authentication token security
- [ ] Privilege escalation prevention
- [ ] CSRF protection verification

## Implementation Priority

### Phase 1: Core Backend (Critical)
1. **Complete `/api/auth/complete-onboarding`** endpoint
2. **Implement handle uniqueness** checking
3. **Add Firestore data persistence** with transactions
4. **Update Firebase Auth custom claims**
5. **Add comprehensive error handling**

### Phase 2: Security & Validation
1. **Implement rate limiting** across all endpoints
2. **Add input sanitization** and validation
3. **Secure development mode** bypasses
4. **Add CSRF protection**
5. **Implement audit logging**

### Phase 3: Verification System
1. **Build admin verification** endpoints
2. **Create admin dashboard** for verification management
3. **Add email notification** system
4. **Implement space creation** logic
5. **Add verification status** tracking

### Phase 4: Analytics & Monitoring
1. **Add event tracking** throughout flows
2. **Implement conversion funnel** analytics
3. **Add error monitoring** and alerting
4. **Create performance dashboards**
5. **Add security monitoring**

### Phase 5: UI/UX Polish
1. **Enhance component animations**
2. **Improve error state** interfaces
3. **Add accessibility features**
4. **Optimize mobile experience**
5. **Add loading state** improvements

## Launch Checklist

### Pre-Launch Verification
- [ ] All API endpoints return proper error codes
- [ ] Handle uniqueness checking works correctly
- [ ] Space creation flow completes successfully
- [ ] Analytics events fire correctly
- [ ] Security rate limits are enforced
- [ ] Development mode is disabled in production
- [ ] All tests pass (unit, integration, E2E)
- [ ] Accessibility audit passes WCAG 2.1 AA
- [ ] Performance audit meets Core Web Vitals
- [ ] Security audit passes penetration testing

### Monitoring Setup
- [ ] Error rate alerting configured
- [ ] Performance monitoring active
- [ ] Security event monitoring enabled
- [ ] Conversion funnel tracking operational
- [ ] Admin notification system working
- [ ] Backup and recovery procedures tested

### Rollback Procedures
- [ ] Database rollback scripts prepared
- [ ] Feature flag controls implemented
- [ ] Emergency contact procedures documented
- [ ] Incident response runbooks updated
- [ ] Communication templates prepared

---

## Next Steps for Collaboration

1. **Review this packet** section by section
2. **Identify any missing requirements** or concerns
3. **Prioritize implementation phases** based on business needs
4. **Assign development tasks** to team members
5. **Set completion milestones** for each phase
6. **Establish testing and review** procedures

**Ready to proceed with implementation once this packet is approved and locked.** 