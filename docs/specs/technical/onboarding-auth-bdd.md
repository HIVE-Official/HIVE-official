# HIVE Authentication & Onboarding - BDD Specification

**Last Updated:** 2025-10-04
**Status:** Living Document
**Domain:** Identity & Access Management

---

## Table of Contents
1. [Domain Model Overview](#domain-model-overview)
2. [Value Objects & Business Rules](#value-objects--business-rules)
3. [User Scenarios (Given-When-Then)](#user-scenarios-given-when-then)
4. [Domain Events](#domain-events)
5. [Application Service Orchestration](#application-service-orchestration)
6. [Integration Points](#integration-points)
7. [Business Invariants](#business-invariants)

---

## Domain Model Overview

### Aggregate Root: Profile

**Location:** `packages/core/src/domain/profile/aggregates/profile.aggregate.ts`

**Responsibilities:**
- Enforce profile consistency and business rules
- Manage onboarding lifecycle
- Track profile completion
- Handle connections, spaces, and achievements
- Emit domain events for state transitions

**Key Properties:**
```typescript
{
  profileId: ProfileId
  email: UBEmail               // @buffalo.edu only
  handle: ProfileHandle        // Unique username (3-20 chars)
  userType: UserType           // student | alumni | faculty
  campusId: CampusId           // 'ub-buffalo'
  personalInfo: PersonalInfo
  academicInfo?: AcademicInfo
  socialInfo: SocialInfo
  isOnboarded: boolean         // Critical state flag
  isVerified: boolean
  isActive: boolean
}
```

---

## Value Objects & Business Rules

### 1. UBEmail (`ub-email.value.ts`)

**Business Rule:** Only @buffalo.edu emails are allowed (vBETA constraint)

**Scenarios:**

```gherkin
Feature: Email Validation
  As the system
  I need to validate that only UB emails are used
  So that we maintain campus exclusivity

  Scenario: Valid UB email
    Given a user provides "student@buffalo.edu"
    When the email is validated
    Then the UBEmail value object is created successfully
    And the email is normalized to lowercase

  Scenario: Invalid domain
    Given a user provides "student@gmail.com"
    When the email is validated
    Then validation fails with error "Only @buffalo.edu emails are allowed"

  Scenario: Invalid format
    Given a user provides "not-an-email"
    When the email is validated
    Then validation fails with error "Invalid email format"

  Scenario: Empty email
    Given a user provides ""
    When the email is validated
    Then validation fails with error "Email is required"
```

---

### 2. ProfileHandle (`profile-handle.value.ts`)

**Business Rules:**
- 3-20 characters
- Lowercase letters, numbers, underscores only
- Unique across platform
- Auto-normalized to lowercase

**Scenarios:**

```gherkin
Feature: Handle Validation
  As the system
  I need to enforce handle format rules
  So that all handles are URL-safe and consistent

  Scenario: Valid handle
    Given a user provides "jacob_r14"
    When the handle is validated
    Then the ProfileHandle value object is created successfully
    And the handle is normalized to lowercase "jacob_r14"

  Scenario: Handle too short
    Given a user provides "ab"
    When the handle is validated
    Then validation fails with error "Handle must be at least 3 characters"

  Scenario: Handle too long
    Given a user provides "this_handle_is_way_too_long_for_the_system"
    When the handle is validated
    Then validation fails with error "Handle must be no more than 20 characters"

  Scenario: Invalid characters
    Given a user provides "jacob@rhine!"
    When the handle is validated
    Then validation fails with error "Handle can only contain lowercase letters, numbers, and underscores"

  Scenario: Case normalization
    Given a user provides "JacobRhine"
    When the handle is validated
    Then the handle is normalized to "jacobrhine"
    And the ProfileHandle is created successfully
```

---

### 3. Profile Completion

**Business Rule:** Profile is "complete" when:
1. First name and last name provided
2. Bio written
3. Students have academic info (major, graduation year)
4. At least 1 interest added

**Scenarios:**

```gherkin
Feature: Profile Completion Tracking
  As a student
  I want to see my profile completion percentage
  So that I can complete my profile and unlock full features

  Background:
    Given a student profile exists with email "jacob@buffalo.edu"
    And the handle is set to "jacob_r"

  Scenario: Minimal profile (0% complete)
    Given no personal info is provided
    And no academic info is provided
    And no interests are added
    When completion percentage is calculated
    Then the percentage should be 0%
    And isProfileComplete() should return false

  Scenario: Basic info only (40% complete)
    Given firstName is "Jacob"
    And lastName is "Rhine"
    And bio is "CS major at UB"
    And profilePhoto is uploaded
    When completion percentage is calculated
    Then the percentage should be 40%
    And isProfileComplete() should return false

  Scenario: Student with academic info (70% complete)
    Given firstName is "Jacob"
    And lastName is "Rhine"
    And bio is "CS major at UB"
    And profilePhoto is uploaded
    And major is "Computer Science"
    And graduationYear is 2026
    And courses include ["CSE 220", "CSE 250"]
    When completion percentage is calculated
    Then the percentage should be 70%
    And isProfileComplete() should return false

  Scenario: Fully complete profile (100%)
    Given firstName is "Jacob"
    And lastName is "Rhine"
    And bio is "CS major at UB"
    And profilePhoto is uploaded
    And major is "Computer Science"
    And graduationYear is 2026
    And courses include ["CSE 220", "CSE 250"]
    And interests include ["coding", "basketball", "music"]
    And clubs include ["ACM"]
    And instagram is "@jacobrhine"
    When completion percentage is calculated
    Then the percentage should be 100%
    And isProfileComplete() should return true
```

---

## User Scenarios (Given-When-Then)

### Scenario 1: New User Sign-Up Flow

```gherkin
Feature: New User Registration
  As a UB student
  I want to sign up with my @buffalo.edu email
  So that I can access the HIVE platform

  Background:
    Given the user is not authenticated
    And the user is on the landing page

  Scenario: Successful email verification
    Given the user enters "jacob@buffalo.edu"
    And the user submits the email form
    When the magic link email is sent
    And the user clicks the verification link
    Then a Firebase Auth session is created
    And the user is redirected to /onboarding
    And a partial profile record is created with:
      | field            | value                    |
      | email            | jacob@buffalo.edu        |
      | isVerified       | true                     |
      | isOnboarded      | false                    |
      | createdAt        | <current timestamp>      |

  Scenario: Invalid email domain
    Given the user enters "jacob@gmail.com"
    And the user submits the email form
    When the email is validated
    Then validation fails with error "Only @buffalo.edu emails are allowed"
    And no magic link is sent
    And no profile is created

  Scenario: Email already registered
    Given a user with "jacob@buffalo.edu" exists
    And the user is already onboarded
    When the user tries to sign up again
    Then the system sends a "welcome back" email instead
    And redirects to /login
    And no new profile is created
```

---

### Scenario 2: Onboarding Flow

```gherkin
Feature: User Onboarding
  As a verified UB student
  I want to complete my profile setup
  So that I can access the main feed and spaces

  Background:
    Given a user is authenticated with email "jacob@buffalo.edu"
    And isVerified is true
    And isOnboarded is false
    And the user is on /onboarding

  Scenario: Successful onboarding completion
    Given the user enters:
      | field           | value                        |
      | fullName        | Jacob Rhine                  |
      | firstName       | Jacob                        |
      | lastName        | Rhine                        |
      | handle          | jacob_r                      |
      | major           | Computer Science             |
      | graduationYear  | 2026                         |
      | interests       | ["coding", "basketball"]     |
      | consentGiven    | true                         |
    When the user submits the onboarding form
    Then the API route POST /api/auth/complete-onboarding is called
    And handle availability is checked (must be unique)
    And a Profile aggregate is created with:
      | field              | value                     |
      | profileId          | <generated UUID>          |
      | email              | jacob@buffalo.edu         |
      | handle             | jacob_r                   |
      | isOnboarded        | true                      |
      | campusId           | ub-buffalo                |
    And a ProfileCreatedEvent is emitted
    And a ProfileOnboardedEvent is emitted
    And the user is auto-joined to default spaces:
      - "Welcome Space"
      - "New Students"
      - "Campus Updates"
    And cohort spaces are created/joined:
      - "Computer Science Class of 2026"
    And the user feed is initialized
    And space recommendations are generated based on interests
    And the user is redirected to /feed

  Scenario: Handle already taken
    Given the handle "jacob_r" is already registered
    When the user tries to register with handle "jacob_r"
    Then validation fails with HTTP 409 Conflict
    And the error message is "Handle is already taken"
    And the user remains on /onboarding
    And can try a different handle

  Scenario: Student missing academic info
    Given the user is a student (userType = "student")
    And the user does not provide major or graduationYear
    When the user submits the onboarding form
    Then validation fails with error "Academic information is required for students"
    And isOnboarded remains false

  Scenario: Consent not given
    Given all required fields are filled
    And consentGiven is false
    When the user submits the onboarding form
    Then validation fails with error "Consent must be given"
    And isOnboarded remains false

  Scenario: Onboarding already completed
    Given isOnboarded is true
    When the user tries to complete onboarding again
    Then the API returns HTTP 409 Conflict
    And the error message is "Onboarding already completed"
    And the user is redirected to /feed
```

---

### Scenario 3: Onboarding Progress Tracking

```gherkin
Feature: Onboarding Progress
  As a user going through onboarding
  I want to see my progress
  So that I know how close I am to finishing

  Background:
    Given a profile exists with email "jacob@buffalo.edu"
    And isOnboarded is false

  Scenario: Initial state (0% complete)
    Given no fields are filled
    When onboarding status is checked
    Then the progress is:
      | isComplete       | false                          |
      | percentComplete  | 0                              |
      | completedSteps   | []                             |
      | remainingSteps   | [email_verified, handle_set,   |
      |                  |  basic_info, interests_selected,|
      |                  |  profile_photo, first_space_joined] |

  Scenario: Handle and email verified (33% complete)
    Given email is verified
    And handle is set to "jacob_r"
    When onboarding status is checked
    Then the progress is:
      | isComplete       | false                          |
      | percentComplete  | 33                             |
      | completedSteps   | [email_verified, handle_set]   |
      | remainingSteps   | [basic_info, interests_selected,|
      |                  |  profile_photo, first_space_joined] |

  Scenario: All steps complete (100%)
    Given email is verified
    And handle is set
    And firstName and lastName are set
    And at least 1 interest is selected
    And profilePhoto is uploaded
    And user has joined at least 1 space
    When onboarding status is checked
    Then the progress is:
      | isComplete       | true                           |
      | percentComplete  | 100                            |
      | completedSteps   | [email_verified, handle_set,   |
      |                  |  basic_info, interests_selected,|
      |                  |  profile_photo, first_space_joined] |
      | remainingSteps   | []                             |
    And the ProfileOnboardedEvent is automatically emitted
    And isOnboarded is set to true
```

---

### Scenario 4: Next Steps Generation

```gherkin
Feature: Onboarding Next Steps
  As a newly onboarded user
  I want to see recommended next actions
  So that I can quickly engage with the platform

  Background:
    Given a user completed onboarding
    And isOnboarded is true
    And the user is viewing /feed for the first time

  Scenario: User without profile photo
    Given profilePhoto is not uploaded
    When next steps are generated
    Then the first step should be:
      | action       | add_profile_photo                           |
      | description  | Add a profile photo to help others recognize you |
      | priority     | 1                                           |

  Scenario: User with < 3 interests
    Given the user has 1 interest
    When next steps are generated
    Then a step should include:
      | action       | add_interests                               |
      | description  | Add more interests to get better space recommendations |
      | priority     | 2                                           |

  Scenario: Space recommendations available
    Given the user has interests in ["coding", "basketball"]
    And matching spaces exist: "UB ACM", "Intramural Basketball"
    When next steps are generated
    Then a step should include:
      | action       | join_spaces                                 |
      | description  | Join spaces like "UB ACM" to connect with others |
      | priority     | 3                                           |

  Scenario: All next steps
    When next steps are generated
    Then the steps should be ordered by priority:
      1. add_profile_photo
      2. add_interests
      3. join_spaces
      4. explore_feed
      5. connect_with_others
```

---

## Domain Events

### Event: ProfileCreatedEvent

**Location:** `packages/core/src/domain/profile/events/profile-created.event.ts`

**Emitted When:** A new Profile aggregate is instantiated

**Payload:**
```typescript
{
  aggregateId: string     // profile ID
  email: string           // jacob@buffalo.edu
  handle: string          // jacob_r
  occurredAt: Date
}
```

**Potential Handlers:**
- Send welcome email
- Initialize user feed
- Create default space memberships
- Log analytics event "user_created"

---

### Event: ProfileOnboardedEvent

**Location:** `packages/core/src/domain/profile/events/profile-onboarded.event.ts`

**Emitted When:** `profile.completeOnboarding()` succeeds

**Payload:**
```typescript
{
  aggregateId: string     // profile ID
  occurredAt: Date
}
```

**Potential Handlers:**
- Trigger space recommendations
- Send onboarding completion email
- Update analytics dashboard
- Enable full platform access
- Initialize personalized feed algorithm

---

## Application Service Orchestration

### Service: ProfileOnboardingService

**Location:** `packages/core/src/application/profile-onboarding.service.ts`

**Responsibility:** Orchestrate the complete onboarding flow (use case)

#### Method: `completeOnboarding(data: OnboardingData)`

**Flow:**
```gherkin
Given valid onboarding data
When completeOnboarding is called
Then the service should:
  1. Validate email domain (UBEmail value object)
  2. Check handle availability (ProfileHandle + repository query)
  3. Create Profile aggregate
  4. Initialize user feed (FeedRepository)
  5. Get suggested spaces based on major + interests
  6. Auto-join default campus spaces
  7. Generate next steps (delegates to Profile.getOnboardingNextSteps())
  8. Save profile to repository
  9. Return OnboardingResult with:
     - profile: Profile
     - suggestedSpaces: Space[]
     - nextSteps: Action[]
```

**Transaction Guarantees:**
- All-or-nothing: If any step fails, no partial profile is created
- Handle uniqueness enforced via Firestore transaction
- Idempotent: Calling twice with same data should not duplicate profile

---

## Integration Points

### 1. Client Hook: `useAuth()`

**Location:** `packages/auth-logic/src/hooks/use-auth.ts`

**Behavior:**
```gherkin
Feature: Client-side Auth State
  As a React component
  I need to access current user state
  So that I can render conditionally

  Scenario: User is authenticated and onboarded
    Given Firebase session exists
    And user doc exists with isOnboarded = true
    When useAuth() is called
    Then it returns:
      | user              | AuthUser object           |
      | isLoading         | false                     |
      | isAuthenticated   | true                      |
      | error             | null                      |

  Scenario: User is authenticated but NOT onboarded
    Given Firebase session exists
    And user doc exists with isOnboarded = false
    When useAuth() is called
    Then it returns:
      | user.onboardingCompleted | false              |
      | isAuthenticated          | true               |
    And the UI should redirect to /onboarding

  Scenario: Development mode user
    Given localStorage has dev_auth_mode = true
    And localStorage has dev_user data
    When useAuth() is called
    Then it returns a mock AuthUser
    And bypasses Firebase Auth
```

---

### 2. API Route: `POST /api/auth/complete-onboarding`

**Location:** `apps/web/src/app/api/auth/complete-onboarding/route.ts`

**Middleware:** `withAuthValidationAndErrors` (validates JWT session + Zod schema)

**Behavior:**
```gherkin
Feature: Complete Onboarding API
  As the web app
  I need an API endpoint to finalize user onboarding
  So that users can access the platform

  Scenario: Successful onboarding
    Given the user is authenticated (JWT valid)
    And all required fields are provided
    And handle is available
    When POST /api/auth/complete-onboarding is called
    Then the API should:
      1. Validate request schema with Zod
      2. Check handle availability
      3. Execute Firestore transaction to:
         - Update user doc with onboarding data
         - Create handle mapping (handle → userId)
         - Verify handle uniqueness
      4. Create cohort spaces (major + grad year)
      5. Auto-join default spaces
      6. Return success response with:
         - user data
         - builderRequestsCreated count
    And respond with HTTP 200 and user object

  Scenario: Handle already taken
    Given the handle "jacob_r" exists
    When POST /api/auth/complete-onboarding is called with handle "jacob_r"
    Then the API should:
      1. Detect conflict in transaction
      2. Rollback transaction
      3. Return HTTP 409 Conflict
      4. Error message: "Handle is already taken"

  Scenario: Development mode bypass
    Given NODE_ENV = development
    And user email is in dev user list
    When POST /api/auth/complete-onboarding is called
    Then the API should:
      1. Skip Firebase transaction
      2. Return mock success response
      3. Include devUserUpdate object for client state
```

---

## Business Invariants

These rules MUST ALWAYS hold true:

### 1. Email Domain Enforcement
```gherkin
Invariant: Only @buffalo.edu emails can create profiles
  Given ANY user attempting to sign up
  When their email is validated
  Then the email MUST end with "@buffalo.edu"
  Or validation MUST fail
```

### 2. Handle Uniqueness
```gherkin
Invariant: No two profiles can have the same handle
  Given a handle "jacob_r" exists in the system
  When a new user tries to register with "jacob_r"
  Then the registration MUST fail
  And the user MUST choose a different handle
```

### 3. Campus Isolation
```gherkin
Invariant: All profiles belong to exactly one campus
  Given a Profile is created
  Then campusId MUST be set to "ub-buffalo"
  And campusId MUST NOT be null or empty
```

### 4. Onboarding Immutability
```gherkin
Invariant: Once onboarded, a profile cannot be un-onboarded
  Given isOnboarded = true
  When any operation is performed
  Then isOnboarded MUST remain true
  (Unless explicit admin override)
```

### 5. Student Academic Requirements
```gherkin
Invariant: Students must provide academic information
  Given userType = "student"
  When profile.completeOnboarding() is called
  Then academicInfo MUST NOT be null
  And major MUST be provided
  And graduationYear MUST be provided
  Or onboarding MUST fail
```

### 6. Interest Limits
```gherkin
Invariant: Users can have maximum 10 interests
  Given a profile has 10 interests
  When profile.addInterest(newInterest) is called
  Then the operation MUST fail
  And error MUST be "Maximum of 10 interests allowed"
```

---

## Testing Checklist

### Unit Tests (Domain Layer)
- [ ] UBEmail.create() validates @buffalo.edu
- [ ] UBEmail.create() rejects other domains
- [ ] ProfileHandle.create() enforces 3-20 character limit
- [ ] ProfileHandle.create() normalizes to lowercase
- [ ] ProfileHandle.create() rejects invalid characters
- [ ] Profile.completeOnboarding() validates required fields
- [ ] Profile.completeOnboarding() emits ProfileOnboardedEvent
- [ ] Profile.getCompletionPercentage() calculates correctly
- [ ] Profile.isProfileComplete() returns correct boolean
- [ ] Profile.addInterest() enforces 10 interest limit

### Integration Tests (Application Layer)
- [ ] ProfileOnboardingService.completeOnboarding() creates profile
- [ ] ProfileOnboardingService.completeOnboarding() checks handle availability
- [ ] ProfileOnboardingService.completeOnboarding() initializes feed
- [ ] ProfileOnboardingService.completeOnboarding() joins default spaces
- [ ] ProfileOnboardingService handles duplicate handle error
- [ ] ProfileOnboardingService handles invalid email error

### E2E Tests (API + UI)
- [ ] User can sign up with @buffalo.edu email
- [ ] User receives magic link email
- [ ] User can complete onboarding form
- [ ] User is redirected to /feed after onboarding
- [ ] User cannot complete onboarding twice
- [ ] User sees error for taken handle
- [ ] User sees profile completion percentage
- [ ] User sees next steps after onboarding

---

## Open Questions / Future Considerations

1. **Email Change:** Can a user change their email after onboarding? (Currently immutable)
2. **Handle Change:** Can a user change their handle? (Currently not supported)
3. **Multi-Campus Expansion:** When UB adds other campuses, how do we migrate campusId?
4. **Alumni Verification:** How do we verify alumni status differently from students?
5. **Faculty Approval:** Do faculty need admin approval to join?
6. **Grace Period:** Should there be a grace period before enforcing full profile completion?

---

## References

- **Domain Model:** `packages/core/src/domain/profile/`
- **Application Services:** `packages/core/src/application/profile-onboarding.service.ts`
- **API Routes:** `apps/web/src/app/api/auth/`
- **Client Hooks:** `packages/auth-logic/src/hooks/use-auth.ts`
- **CLAUDE.md:** Project architecture and conventions
- **DDD_GUIDE.md:** Domain-driven design patterns

---

**Document Owner:** Jacob Rhine
**Last Reviewed:** 2025-10-04
**Next Review:** Before October 1st launch
