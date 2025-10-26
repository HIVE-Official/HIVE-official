# HIVE Spaces Domain - BDD Specification

**Last Updated:** 2025-10-09
**Status:** Living Document
**Domain:** Community Spaces & Content Aggregation

---

## Table of Contents
1. [Domain Model Overview](#domain-model-overview)
2. [Value Objects & Business Rules](#value-objects--business-rules)
3. [User Scenarios (Given-When-Then)](#user-scenarios-given-when-then)
4. [Domain Events](#domain-events)
5. [Application Service Orchestration](#application-service-orchestration)
6. [RSS Pre-Seeding Strategy](#rss-pre-seeding-strategy)
7. [Business Invariants](#business-invariants)

---

## Domain Model Overview

### Aggregate Root: Space

**Planned Location:** `packages/core/src/domain/spaces/aggregates/space.aggregate.ts`

**Responsibilities:**
- Enforce space membership rules and capacity limits
- Manage member roles (admin, moderator, member)
- Control space settings and visibility
- Track activity and trending metrics
- Manage tabs and widgets (HiveLab tools)
- Handle RSS integration for pre-seeded content

**Key Properties:**
```typescript
{
  spaceId: SpaceId
  name: SpaceName               // 3-50 chars
  description: SpaceDescription
  category: SpaceCategory       // general | study-group | social | event | resource | dorm | club | sports | academic
  campusId: CampusId            // defaults to 'ub-buffalo' (campus isolation)
  createdBy: ProfileId
  members: SpaceMember[]        // Array of { profileId, role, joinedAt }
  tabs: Tab[]                   // Custom layout tabs
  widgets: Widget[]             // HiveLab tools
  settings: SpaceSettings
  visibility: 'public' | 'private'
  isActive: boolean
  isVerified: boolean           // Official UB org verification
  trendingScore: number
  rushMode?: RushMode           // Greek life rush feature
  postCount: number
  memberCount: number
}
```

**Category Guidance:**
- **Student Organization** (`club`): Managed by verified student leaders. Verification requests originate from onboarding or the space request flow and are approved manually by the Hive team.
- **University Organization** (`university_org`): Represents official university departments, classes, or initiatives. Courses created for a single semester should be marked for archival after term end.
- **Greek Life** (`greek_life`): Requires Greek-life leader verification prior to creation. Rush-specific settings apply when enabled.
- **Residential** (`dorm`): Auto-selected during onboarding based on a student's residence. Initially student-led, with optional staff involvement for moderation or announcements.

---

## Value Objects & Business Rules

### 1. SpaceName (`space-name.value.ts`)

**Business Rules:**
- 3-50 characters
- Trimmed of whitespace
- Unique per campus

**Scenarios:**

```gherkin
Feature: Space Name Validation
  As the system
  I need to enforce space name rules
  So that all spaces have valid, readable names

  Scenario: Valid space name
    Given a user provides "UB Computer Science"
    When the space name is validated
    Then the SpaceName value object is created successfully
    And the name is trimmed: "UB Computer Science"

  Scenario: Name too short
    Given a user provides "CS"
    When the space name is validated
    Then validation fails with error "Space name must be at least 3 characters"

  Scenario: Name too long
    Given a user provides a 51-character name
    When the space name is validated
    Then validation fails with error "Space name must be no more than 50 characters"

  Scenario: Name already exists
    Given a space "UB Computer Science" exists on campus
    When a user tries to create another space named "UB Computer Science"
    Then validation fails with error "A space with this name already exists"
```

---

### 2. SpaceCategory (`space-category.value.ts`)

**Valid Categories:**
- `general`: General purpose spaces
- `study-group`: Academic study groups
- `social`: Social gatherings
- `event`: Event planning
- `resource`: Resource sharing
- `dorm`: Residential spaces
- `club`: Student organizations
- `sports`: Sports teams
- `academic`: Academic departments

**Business Methods:**
- `isAcademic()`: Returns true for study-group, academic, resource
- `isSocial()`: Returns true for social, dorm, club, sports

**Scenarios:**

```gherkin
Feature: Space Category Validation
  As the system
  I need to categorize spaces correctly
  So that users can discover relevant communities

  Scenario: Valid study group category
    Given a user selects category "study-group"
    When the category is validated
    Then the SpaceCategory value object is created
    And isAcademic() returns true
    And isSocial() returns false

  Scenario: Valid social category
    Given a user selects category "club"
    When the category is validated
    Then the SpaceCategory value object is created
    And isAcademic() returns false
    And isSocial() returns true

  Scenario: Invalid category
    Given a user provides "invalid-category"
    When the category is validated
    Then validation fails with error "Invalid space category: invalid-category"
```

---

### 3. Member Capacity

**Business Rule:** Spaces can have a maximum member limit (optional)

**Scenarios:**

```gherkin
Feature: Space Member Capacity
  As a space admin
  I can set a maximum member limit
  So that my space stays manageable

  Scenario: Space at capacity
    Given a space has maxMembers set to 50
    And the space currently has 50 members
    When a new user tries to join
    Then the join fails with error "Space has reached maximum member capacity"

  Scenario: Space with no capacity limit
    Given a space has no maxMembers limit
    And the space currently has 1000 members
    When a new user tries to join
    Then the user joins successfully

  Scenario: Admin sets capacity below current count
    Given a space has 100 members
    When an admin sets maxMembers to 80
    Then the setting is saved
    But no existing members are removed
    And new joins are blocked until count drops below 80
```

---

## User Scenarios (Given-When-Then)

### Verification Request (Precondition)

```gherkin
Feature: Student Leader Verification
  As a student leader
  I want to request verification during onboarding or from the space request flow
  So that I can create Student Organization spaces

  Scenario: Submit verification request
    Given I have completed the core onboarding steps
    And I open the student leader verification form
    When I submit documentation for my organization
    Then the request is queued for Hive team review
    And I am notified that approval is pending

  Scenario: Hive team approves request
    Given a verification request is pending
    When a Hive team member marks the request as approved
    Then I receive the student leader role
    And I can create Student Organization spaces

  Scenario: Hive team denies request
    Given a verification request is pending
    When a Hive team member marks the request as denied
    Then I receive feedback about the decision
    And I remain unable to create Student Organization spaces
```

### Member Safety and Visibility

> Sources: `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:245`, `docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:103`

```gherkin
Feature: UB members respect space safety rails
  As a University at Buffalo student
  I need Spaces posts to respect membership roles and safety policies
  So that leaders can keep the community trustworthy

  Background:
    Given a campus-isolated space "UB Robotics"
    And "Nia" is a leader
    And "Jordan" is a member
    And "Alex" is not a member

  Scenario: Member sees only active posts
    Given "Jordan" is signed in
    And a post in "UB Robotics" is marked moderationStatus "active"
    When Jordan loads the post stream
    Then the post is returned
    And the payload includes its pinnedAt/pinExpiresAt timestamps when present

  Scenario: Auto-hidden post stays leader-only
    Given a post in "UB Robotics" is marked moderationStatus "auto_hidden"
    When "Jordan" loads the post stream
    Then the post is not returned
    But when "Nia" loads the post stream
    Then the post is returned with moderationStatus "auto_hidden"

  Scenario: Non-member cannot read members-only posts
    Given a post in "UB Robotics" has audience "members"
    When "Alex" tries to read the post
    Then access is denied

  Scenario: Pin expires without manual cleanup
    Given a post in "UB Robotics" was pinned yesterday
    And pinExpiresAt is set to today at 09:00
    When the clock passes 09:00
    Then the post is automatically unpinned
    And "Nia" sees a notification that the pin expired

  Scenario: Media from members routes into approval queue
    Given "Jordan" is a member of "UB Robotics" (not a leader)
    And Jordan uploads an image with a new post
    When the post is created
    Then the image is stored in the media approval queue with status "pending"
    And the post payload excludes that attachment for members
    But leaders can view the pending entry via the Safety queue API

  Scenario: Leader approves pending media
    Given "Nia" is a leader of "UB Robotics"
    And an image uploaded by "Jordan" is pending approval
    When Nia approves the media
    Then the image is appended to the post attachments
    And the approval record is marked "approved" with resolver metadata
    And telemetry logs the latency between request and approval
```

> **Heads-up:** Firestore rules rely on the embedded roster + `memberRoles` map (`firestore.rules:61`). Keep mock data in sync by ensuring every `spaces` document includes both structures before we harden the rules.

### Scenario 1: Create a Space

```gherkin
Feature: Space Creation
  As a verified UB student
  I want to create a new space
  So that I can build a community around shared interests

  Background:
    Given I am authenticated
    And my account is at least 7 days old
    And my email is verified

  Scenario: Successful space creation
    Given I provide:
      | field           | value                                      |
      | name            | UB Computer Science                        |
      | description     | Connect with CS majors at UB               |
      | category        | study-group                                |
      | joinPolicy      | open                                       |
      | agreedToGuidelines | true                                    |
    When I submit POST /api/spaces
    Then the API should:
      1. Validate all required fields
      2. Check space name uniqueness
      3. Create space document with campusId set to the creator's campus
      4. Add me as owner/admin in spaceMembers collection
      5. Create default "Feed" tab
      6. Create audit log entry
      7. Fire SpaceCreatedEvent
    And respond with HTTP 201
    And return the created space with:
      | id              | <generated spaceId>       |
      | memberCount     | 1                         |
      | leaders         | [my userId]               |
      | status          | active                    |

  Scenario: Account too new
    Given my account is 5 days old
    And I am not an admin
    When I try to create a space
    Then the API returns HTTP 403 Forbidden
    And error message: "Account must be at least 7 days old (current: 5 days)"

  Scenario: Daily limit reached
    Given I created 3 spaces today
    And I am not an admin
    When I try to create another space
    Then the API returns HTTP 429 Rate Limit
    And error message: "Daily limit reached (3 spaces per day)"

  Scenario: Greek Life space without verification
    Given I select category "greek_life"
    And I am not greek life verified
    And I am not an admin
    When I try to create the space
    Then the API returns HTTP 403 Forbidden
    And error message: "Greek Life spaces require verification"

  Scenario: University organization requires admin
    Given I select category "university_org"
    And I am not an admin
    When I try to create the space
    Then the API returns HTTP 403 Forbidden
    And error message: "University organizations require admin approval"

  Scenario: Space name already exists
    Given a space "UB Computer Science" exists
    When I try to create a space with the same name
    Then the API returns HTTP 409 Conflict
    And error message: "A space with this name already exists"

  Scenario: User is banned from creating spaces
    Given my spaceBanned flag is true
    When I try to create a space
    Then the API returns HTTP 403 Forbidden
    And error message: "Your space creation privileges have been revoked"
```

---

### Scenario 2: Join a Space

```gherkin
Feature: Space Joining
  As a UB student
  I want to join existing spaces
  So that I can participate in campus communities

  Background:
    Given I am authenticated
    And a public space "UB Computer Science" exists with:
      | id              | space-cs-123    |
      | joinPolicy      | open            |
      | memberCount     | 45              |

  Scenario: Successfully join open space
    Given I am not a member of the space
    When I POST /api/spaces/join with spaceId: "space-cs-123"
    Then the API should:
      1. Validate the space exists
      2. Check space joinability (public, not at capacity, not banned)
      3. Check I'm not already a member
      4. Create spaceMembers record with:
         | spaceId        | space-cs-123         |
         | userId         | <my userId>          |
         | role           | member               |
         | joinMethod     | manual               |
         | permissions    | ['post']             |
      5. Increment space memberCount by 1
      6. Record activity event
      7. Fire MemberJoinedEvent
    And respond with HTTP 200
    And return space details:
      | id              | space-cs-123              |
      | name            | UB Computer Science       |
      | message         | Successfully joined       |

  Scenario: Join approval-required space
    Given the space joinPolicy is "approval"
    When I try to join the space
    Then a join request is created
    And the space admins are notified
    And I receive a pending status
    And I am NOT added as a member yet

  Scenario: Join invite-only space without invite
    Given the space joinPolicy is "invite_only"
    And I don't have an invite
    When I try to join the space
    Then the API returns HTTP 403 Forbidden
    And error message: "This space requires an invitation"

  Scenario: Already a member
    Given I am already a member of the space
    When I try to join again
    Then the API returns HTTP 409 Conflict
    And error message: "You are already a member of this space"

  Scenario: Rejoin after leaving
    Given I was previously a member
    And I left the space (isActive = false)
    When I join the space again
    Then my existing membership record is reactivated
    And isActive is set to true
    And joinedAt is updated to current timestamp

  Scenario: Space at capacity
    Given the space maxMembers is 50
    And the space memberCount is 50
    When I try to join
    Then the API returns HTTP 403 Forbidden
    And error message: "Space has reached maximum member capacity"
```

---

### Scenario 3: Space Discovery & Recommendations

```gherkin
Feature: Space Discovery
  As a new user
  I want to discover relevant spaces
  So that I can quickly find communities to join

  Background:
    Given I am authenticated
    And my profile has:
      | major           | Computer Science           |
      | graduationYear  | 2026                       |
      | interests       | [coding, basketball, music]|

  Scenario: Browse all spaces
    Given public spaces exist in various categories
    When I GET /api/spaces
    Then I receive:
      - List of public spaces from my campus
      - Sorted by createdAt (newest first by default)
      - With pagination (limit 50 by default)
      - Campus isolation enforced (campusId = 'ub-buffalo')

  Scenario: Filter by category
    Given spaces exist in multiple categories
    When I GET /api/spaces?type=study-group
    Then I receive only spaces with category "study-group"
    And results are campus-isolated

  Scenario: Search by name/description
    Given spaces exist with various names and descriptions
    When I GET /api/spaces?q=computer
    Then I receive spaces matching "computer" in name or description
    And results are sorted by name_lowercase (asc)

  Scenario: Get personalized recommendations
    Given I have joined 2 spaces
    And my interests are [coding, basketball, music]
    When I request space recommendations
    Then the service should:
      1. Find spaces matching my major (Computer Science study groups)
      2. Find spaces matching my interests (coding clubs, basketball teams)
      3. Find trending spaces I haven't joined
      4. Deduplicate and limit to 10 spaces
    And return recommended spaces sorted by relevance

  Scenario: Auto-join during onboarding
    Given I just completed onboarding
    And my major is "Computer Science"
    And my graduation year is 2026
    When the onboarding service completes
    Then I am automatically joined to:
      - "Welcome Space" (all new users)
      - "New Students" (all new students)
      - "Campus Updates" (all users)
      - My selected residential space
      - "Computer Science Class of 2026" (cohort space)
    And these spaces are created if they don't exist
```

---

### Scenario 4: RSS Pre-Seeding

```gherkin
Feature: RSS Content Pre-Seeding
  As a space leader
  I want to seed my space with RSS content
  So that new members see activity and engagement immediately

  Background:
    Given I am a space admin
    And a space "UB Tech News" exists with:
      | id              | space-tech-123     |
      | category        | student_org        |

  Scenario: Successfully seed RSS content
    Given the space has 0 posts
    When I POST /api/spaces/space-tech-123/seed-rss
    Then the API should:
      1. Verify I am a space leader (owner or leader role)
      2. Select RSS feeds based on space category
      3. Fetch recent RSS items (last 5)
      4. Create posts with:
         | content         | Formatted RSS title + description |
         | authorId        | system                           |
         | isRSSSeeded     | true                             |
         | rssSource       | <feed URL>                       |
      5. Broadcast new posts via SSE to space members
      6. Update space metadata:
         - lastRSSSeeded: <current timestamp>
         - rssSeededCount: incremented
    And respond with HTTP 200
    And return:
      | seededPosts     | 5                          |
      | feedsProcessed  | 1                          |

  Scenario: Only leaders can seed RSS
    Given I am a regular member (not leader/owner)
    When I try to seed RSS content
    Then the API returns HTTP 403 Forbidden
    And error message: "Only space leaders can seed RSS content"

  Scenario: RSS feeds by category
    Given different space categories
    When RSS seeding is triggered
    Then feeds are selected based on category:
      | category         | feeds                                  |
      | student_org      | TechCrunch, /r/compsci                |
      | university_org   | buffalo.edu/news                       |
      | greek_life       | buffalo.edu/studentlife                |
      | residential      | buffalo.edu/campuslife                 |
      | default          | student_org feeds                      |

  Scenario: Real-time broadcast of RSS posts
    Given space members are connected via SSE
    When RSS posts are seeded
    Then each new post triggers SSE broadcast:
      | type            | chat                              |
      | channel         | space:<spaceId>:posts             |
      | senderId        | system                            |
      | content.type    | new_post                          |
      | metadata.priority | low                             |
```

---

### Scenario 5: Member Management

```gherkin
Feature: Space Member Management
  As a space admin
  I want to manage member roles
  So that I can delegate responsibilities

  Background:
    Given I am a space admin
    And the space "UB CS" has members:
      | userId    | role      | joinedAt           |
      | admin1    | admin     | 2024-01-01         |
      | mod1      | moderator | 2024-02-01         |
      | member1   | member    | 2024-03-01         |
      | member2   | member    | 2024-03-15         |

  Scenario: Promote member to moderator
    Given member1 is a regular member
    When I update member1's role to "moderator"
    Then the Space aggregate should:
      1. Find the member record
      2. Update role from "member" to "moderator"
      3. Fire MemberRoleUpdatedEvent
    And the member has moderator permissions

  Scenario: Cannot demote last admin
    Given I am the only admin
    When I try to demote myself to moderator
    Then the operation fails
    And error: "Cannot demote the last admin"

  Scenario: Remove member
    Given member2 is a member
    When I remove member2 from the space
    Then the Space aggregate should:
      1. Remove member2 from members array
      2. Decrement memberCount
      3. Fire MemberRemovedEvent
    And member2 no longer appears in member list

  Scenario: Cannot remove last admin
    Given I am the only admin
    When I try to leave the space
    Then the operation fails
    And error: "Cannot remove the last admin"

  Scenario: Transfer ownership before leaving
    Given I am the only admin
    And mod1 is a moderator
    When I:
      1. Promote mod1 to admin
      2. Demote myself to member
      3. Leave the space
    Then all operations succeed
    And mod1 is now the sole admin
    And I am no longer a member
```

---

### Scenario 6: Space Settings & Privacy

```gherkin
Feature: Space Settings Management
  As a space admin
  I want to configure space settings
  So that I can control how my space operates

  Background:
    Given I am a space admin
    And the space has default settings:
      | allowInvites      | true    |
      | requireApproval   | false   |
      | allowRSS          | false   |
      | isPublic          | true    |

  Scenario: Enable approval requirement
    Given the space is currently open (requireApproval = false)
    When I update settings to requireApproval = true
    Then new join requests require approval
    And existing members remain unaffected
    And pending requests enter approval queue

  Scenario: Make space private
    Given the space is public
    When I change visibility to "private"
    Then the space no longer appears in browse results
    And only members can view space content
    And non-members see "private space" message

  Scenario: Enable RSS integration
    Given allowRSS is false
    When I enable allowRSS
    And provide a valid RSS URL
    Then the space settings are updated
    And RSS fetch is scheduled
    And new posts from RSS appear automatically

  Scenario: Set member capacity
    Given the space has 30 members
    When I set maxMembers to 50
    Then the setting is saved
    And new joins are allowed until count reaches 50
    And memberCount is tracked accurately
```

---

## Domain Events

### Manual Student Leader Verification

- Students can request leader verification during onboarding or from a space creation request screen.
- Each request enters a review queue handled manually by the Hive team.
- Approval grants the ability to create and manage Student Organization spaces.
- Denial returns feedback to the student and logs the outcome for governance.

> _Long-term goal_: automate verification workflows (e.g., integration with campus rosters) to reduce manual Hive team effort.


### Event: SpaceCreatedEvent

**Planned Location:** `packages/core/src/domain/spaces/events/space-created.event.ts`

**Emitted When:** A new Space aggregate is instantiated

**Payload:**
```typescript
{
  aggregateId: string     // space ID
  name: string            // "UB Computer Science"
  category: string        // "study-group"
  createdBy: string       // creator profile ID
  occurredAt: Date
}
```

**Potential Handlers:**
- Send notification to campus admins (for moderation)
- Initialize space feed
- Log analytics event "space_created"
- Trigger RSS seed if RSS URL provided

---

### Event: MemberJoinedEvent

**Planned Location:** `packages/core/src/domain/spaces/events/member-joined.event.ts`

**Emitted When:** A user joins a space successfully

**Payload:**
```typescript
{
  aggregateId: string       // space ID
  profileId: string         // joining user's profile ID
  role: 'admin' | 'moderator' | 'member'
  memberCount: number       // updated member count
  occurredAt: Date
}
```

**Potential Handlers:**
- Send welcome message to user
- Update user's feed to include space content
- Notify space admins (if configured)
- Update space trending score
- Log analytics event "member_joined"

---

### Event: MemberRemovedEvent

**Planned Location:** `packages/core/src/domain/spaces/events/member-removed.event.ts`

**Emitted When:** A member leaves or is removed from a space

**Payload:**
```typescript
{
  aggregateId: string       // space ID
  profileId: string         // leaving user's profile ID
  memberCount: number       // updated member count
  occurredAt: Date
}
```

**Potential Handlers:**
- Remove space content from user's feed
- Update space trending score
- Log analytics event "member_left"

---

### Event: MemberRoleUpdatedEvent

**Planned Location:** `packages/core/src/domain/spaces/events/member-role-updated.event.ts`

**Emitted When:** A member's role changes (promotion/demotion)

**Payload:**
```typescript
{
  aggregateId: string       // space ID
  profileId: string         // affected user's profile ID
  oldRole: 'admin' | 'moderator' | 'member'
  newRole: 'admin' | 'moderator' | 'member'
  occurredAt: Date
}
```

**Potential Handlers:**
- Notify user of role change
- Update permissions in cache
- Log analytics event "role_updated"

---

### Event: PostCreatedEvent

**Planned Location:** `packages/core/src/domain/spaces/events/post-created.event.ts`

**Emitted When:** A new post is created in a space

**Payload:**
```typescript
{
  aggregateId: string       // space ID
  postId: string            // new post ID
  authorId: string          // post author profile ID
  postCount: number         // updated post count
  occurredAt: Date
}
```

**Potential Handlers:**
- Broadcast to space members via SSE
- Update space lastActivityAt
- Trigger feed algorithm update
- Send notifications to members (if configured)
- Update trending score

---

## Application Service Orchestration

### Service: SpaceDiscoveryService

**Planned Location:** `packages/core/src/application/space-discovery.service.ts`

**Responsibility:** Orchestrate space discovery, joining, and management flows

#### Method: `createSpace(creatorId, data: SpaceCreationData)`

**Flow:**
```gherkin
Given valid space creation data
When createSpace is called
Then the service should:
  1. Validate creator exists (ProfileRepository)
  2. Validate space name (SpaceName value object)
  3. Validate description (SpaceDescription value object)
  4. Validate category (SpaceCategory value object)
  5. Check name uniqueness (SpaceRepository.findByName)
  6. Create Space aggregate
  7. Creator automatically becomes admin (addMember)
  8. Save space (SpaceRepository.save)
  9. If RSS URL provided, schedule RSS fetch
  10. Fire SpaceCreatedEvent
  11. Return created Space
```

---

#### Method: `joinSpace(userId, spaceId)`

**Flow:**
```gherkin
Given a user wants to join a space
When joinSpace is called
Then the service should:
  1. Validate user exists (ProfileRepository)
  2. Validate space exists (SpaceRepository)
  3. Check if already member (Space.isMember)
  4. Check if space requires approval (settings.requireApproval)
  5. Check member capacity (settings.maxMembers)
  6. Add member to space (Space.addMember)
  7. Save updated space (SpaceRepository.save)
  8. Generate welcome message (Space.getWelcomeMessage)
  9. Generate suggested actions (Space.getSuggestedActions)
  10. Fire MemberJoinedEvent
  11. Return SpaceJoinResult with:
      - space
      - role
      - welcomeMessage
      - suggestedActions
```

---

#### Method: `discoverSpaces(filters: SpaceDiscoveryFilters)`

**Flow:**
```gherkin
Given discovery filters (type, search, sortBy, limit)
When discoverSpaces is called
Then the service should:
  1. Apply discovery strategy based on filters:
     - If searchQuery: SpaceRepository.searchSpaces
     - If sortBy = 'trending': SpaceRepository.findTrending
     - If spaceType: SpaceRepository.findByType
     - Else: SpaceRepository.findPublicSpaces
  2. Filter out private spaces (unless includePrivate = true)
  3. Sort spaces by criteria (trending, members, activity, new)
  4. Return ServiceResult with:
     - data: Space[]
     - metadata: { totalCount, hasMore }
```

---

## RSS Pre-Seeding Strategy

### Why Pre-Seed Spaces?

**Product Insight:** "Empty spaces feel dead. Students won't engage if there's nothing to react to."

**Solution:** Pre-populate new spaces with relevant RSS content to create the illusion of activity.

### RSS Feed Mapping

```typescript
const RSS_FEEDS = {
  'student_org': [
    'https://feeds.feedburner.com/TechCrunch',
    'https://www.reddit.com/r/compsci/.rss'
  ],
  'university_org': [
    'https://www.buffalo.edu/news.rss'
  ],
  'greek_life': [
    'https://www.buffalo.edu/studentlife.rss'
  ],
  'residential': [
    'https://www.buffalo.edu/campuslife.rss'
  ]
};
```

### Seeding Behavior

```gherkin
Feature: RSS Seeding Behavior
  As a product designer
  I want spaces to feel active from day one
  So that students engage immediately

  Scenario: New space created
    Given a space is created with category "student_org"
    And allowRSS is true
    When the space is created
    Then the last 5 RSS items are fetched
    And formatted as posts:
      | content     | 📰 **{title}**\n\n{description}\n\n[Read more]({link}) |
      | authorId    | system                                                   |
      | isRSSSeeded | true                                                     |
      | rssSource   | <feed URL>                                               |
    And posts are backdated to RSS pubDate
    And posts appear in space feed chronologically

  Scenario: RSS posts in feed algorithm
    Given a space has RSS-seeded content
    When the feed algorithm runs
    Then RSS posts are included
    But marked as lower priority than user-generated content
    And don't trigger push notifications
```

---

## Business Invariants

These rules MUST ALWAYS hold true:

### 1. Campus Isolation
```gherkin
Invariant: All spaces belong to exactly one campus
  Given a Space is created
  Then campusId MUST be set to the user's campus id
  And campusId MUST NOT be null or empty
  And all queries MUST filter by campusId
```

### 2. Space Name Uniqueness
```gherkin
Invariant: No two spaces can have the same name on a campus
  Given a space "UB Computer Science" exists on the same campus
  When a new space is created with name "UB Computer Science"
  Then the creation MUST fail
  And error: "A space with this name already exists"
```

### 3. Last Admin Protection
```gherkin
Invariant: A space must always have at least one admin
  Given a space has exactly 1 admin
  When that admin tries to:
    - Leave the space
    - Demote themselves
    - Be removed
  Then the operation MUST fail
  And error: "Cannot remove the last admin"
```

### 4. Member Capacity
```gherkin
Invariant: Member count cannot exceed maxMembers
  Given a space has maxMembers = 50
  And memberCount = 50
  When a new user tries to join
  Then the join MUST fail
  And error: "Space has reached maximum member capacity"
```

### 5. Default Tab Creation
```gherkin
Invariant: All spaces must have at least one "Feed" tab
  Given a Space is created
  Then a default "Feed" tab MUST be created
  With properties:
    | name      | Feed    |
    | type      | feed    |
    | isDefault | true    |
    | order     | 0       |
    | isVisible | true    |
```

### 6. Creator is Admin
```gherkin
Invariant: Space creator is always the first admin
  Given a user creates a space
  Then that user MUST be added to members[] with:
    | role      | admin                |
    | joinedAt  | <space createdAt>    |
  And memberCount MUST be 1
```

### 7. Account Age Requirement
```gherkin
Invariant: Only accounts ≥7 days old can create spaces (non-admins)
  Given a user account is < 7 days old
  And the user is not an admin
  When the user tries to create a space
  Then the creation MUST fail
  And error: "Account must be at least 7 days old"
```

### 8. Daily Creation Limit
```gherkin
Invariant: Users can create max 3 spaces per day (non-admins)
  Given a user created 3 spaces today
  And the user is not an admin
  When the user tries to create another space
  Then the creation MUST fail
  And error: "Daily limit reached (3 spaces per day)"
```

---

## Integration Points

### 1. API Route: `POST /api/spaces`

**Planned Location:** `apps/web/src/contexts/spaces/api/list`

**Middleware:** `withAuthValidationAndErrors` (validates JWT + Zod schema)

**Business Logic:**
1. Agreement to guidelines check
2. User existence verification
3. Account age check (7 days min)
4. Email verification check
5. Daily limit check (3 spaces/day)
6. Category restrictions (university_org, greek_life)
7. Ban status check
8. Name uniqueness check
9. Atomic creation using Firestore batch:
   - Create space document
   - Add creator as owner in spaceMembers
   - Create audit log

---

### 2. API Route: `POST /api/spaces/join`

**Planned Location:** `apps/web/src/contexts/spaces/api/join`

**Behavior:**
```gherkin
Feature: Space Join API
  As the web app
  I need an endpoint to join spaces
  So that users can become members

  Scenario: Successful join
    Given the user is authenticated
    And the space exists and is joinable
    When POST /api/spaces/join is called with:
      | spaceId | space-cs-123 |
    Then the API should:
      1. Validate space joinability (validateSpaceJoinability helper)
      2. Check for existing inactive membership (reactivate if found)
      3. Create spaceMembers record (or reactivate)
      4. Increment space memberCount
      5. Record activity event
      6. Commit atomically using batch write
    And respond with HTTP 200 and space details
```

---

### 3. API Route: `POST /api/spaces/[spaceId]/seed-rss`

**Planned Location:** `apps/web/src/contexts/spaces/api/[spaceId]/seed-rss`

**Behavior:**
```gherkin
Feature: RSS Seeding API
  As a space leader
  I need an endpoint to seed RSS content
  So that my space feels active immediately

  Scenario: Successful RSS seed
    Given I am a space leader (owner or leader role)
    When POST /api/spaces/space-123/seed-rss is called
    Then the API should:
      1. Verify space exists
      2. Verify I have leader permissions
      3. Select RSS feeds based on space category
      4. Fetch recent RSS items (last 5 per feed)
      5. Create posts with:
         - Formatted content (title + description + link)
         - authorId: 'system'
         - isRSSSeeded: true
         - rssSource: <feed URL>
      6. Broadcast via SSE to space members
      7. Update space metadata (lastRSSSeeded, rssSeededCount)
    And respond with:
      | seededPosts     | 5  |
      | feedsProcessed  | 1  |
```

---

### 4. Client Hook: `useSpaces()`

**Hypothetical Implementation:**
```typescript
export function useSpaces(filters?: SpaceDiscoveryFilters) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSpaces() {
      const response = await fetch('/api/spaces?' + new URLSearchParams(filters));
      const data = await response.json();
      setSpaces(data.spaces);
      setIsLoading(false);
    }
    fetchSpaces();
  }, [filters]);

  return { spaces, isLoading };
}
```

---

## Testing Checklist

### Unit Tests (Domain Layer)
- [ ] SpaceName.create() enforces 3-50 character limit
- [ ] SpaceCategory.create() validates enum values
- [ ] SpaceCategory.isAcademic() returns correct boolean
- [ ] SpaceCategory.isSocial() returns correct boolean
- [ ] Space.addMember() enforces capacity limits
- [ ] Space.addMember() prevents duplicate members
- [ ] Space.addMember() emits MemberJoinedEvent
- [ ] Space.removeMember() prevents removing last admin
- [ ] Space.updateMemberRole() prevents demoting last admin
- [ ] Space.create() auto-creates default "Feed" tab
- [ ] Space.getWelcomeMessage() generates correct message
- [ ] Space.getSuggestedActions() returns contextual actions

### Integration Tests (Application Layer)
- [ ] SpaceDiscoveryService.createSpace() validates all VOs
- [ ] SpaceDiscoveryService.createSpace() checks name uniqueness
- [ ] SpaceDiscoveryService.createSpace() adds creator as admin
- [ ] SpaceDiscoveryService.joinSpace() checks member capacity
- [ ] SpaceDiscoveryService.joinSpace() handles approval-required spaces
- [ ] SpaceDiscoveryService.discoverSpaces() applies filters correctly
- [ ] SpaceDiscoveryService.getRecommendedSpaces() personalizes results

### E2E Tests (API + UI)
- [ ] User can create a space with valid data
- [ ] User sees error for account < 7 days old
- [ ] User sees error for duplicate space name
- [ ] User can join an open public space
- [ ] User can leave a space
- [ ] Admin can promote member to moderator
- [ ] Admin cannot leave if they're the last admin
- [ ] Leader can seed RSS content
- [ ] RSS posts appear in space feed
- [ ] Spaces are filtered by campus (campus isolation)

---

## Open Questions / Future Considerations

1. **Space Archiving:** Should inactive spaces be archived? What's the threshold?
2. **Space Deletion:** Can spaces be deleted, or only deactivated?
3. **Member Banning:** Can admins ban users from a specific space?
4. **Join Requests:** How long do pending join requests stay valid?
5. **RSS Refresh:** How frequently should RSS feeds be re-fetched?
6. **Trending Algorithm:** What's the formula for calculating trendingScore?
7. **Verified Spaces:** What criteria determine if a space gets verified checkmark?
8. **Rush Mode:** How does rush mode work for Greek Life spaces?
9. **Space Transfer:** Can ownership be transferred to another campus if UB expands?
10. **HiveLab Integration:** How do custom tools/widgets integrate with spaces?
11. **Verification Automation:** How can we reduce manual Hive review for student leader approvals?

---

## References

- **Domain Model (planned):** `packages/core/src/domain/spaces/`
- **Application Services (planned):** `packages/core/src/application/space-discovery.service.ts`
- **API Routes (planned):** `apps/web/src/contexts/spaces/api/`
- **CLAUDE.md:** Project architecture and conventions
- **DDD_GUIDE.md:** Domain-driven design patterns
- **ONBOARDING_AUTH_BDD_SPEC.md:** Related auth/onboarding behaviors

---

**Document Owner:** Jacob Rhine
**Last Reviewed:** 2025-10-04
**Next Review:** Before October 1st launch
