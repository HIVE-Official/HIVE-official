# HIVE Platform - Behavior-Driven Design Specification

**Last Updated:** 2025-10-04
**Status:** Living Document
**Purpose:** Platform-wide behaviors, user journeys, and product vision

---

## Table of Contents
1. [Product Vision & Mission](#product-vision--mission)
2. [The Core Loop](#the-core-loop)
3. [Platform User Journeys](#platform-user-journeys)
4. [Five Core Features](#five-core-features)
5. [Cross-Cutting Behaviors](#cross-cutting-behaviors)
6. [Platform Invariants](#platform-invariants)
7. [Success Metrics](#success-metrics)

---

## Product Vision & Mission

### Mission Statement
**"Make campus life easier, more fun, and more connected."**

HIVE replaces Instagram as the **content distribution layer for campus**. Not LinkedIn (no professional networking), not another social network—just **student life utility**.

### What HIVE Is NOT
- ❌ Professional networking platform
- ❌ Dating app
- ❌ Feature-bloated Swiss Army knife
- ❌ Desktop-first experience
- ❌ Mock/stub/placeholder product

### What HIVE IS
- ✅ Campus-exclusive content hub (@buffalo.edu only for vBETA)
- ✅ Mobile-first, < 3 second interactions
- ✅ Pre-seeded communities (Spaces) with RSS content
- ✅ Real-time feed of campus activity
- ✅ Student-led tool builder (HiveLab)
- ✅ Behavioral campaigns (Rituals)

---

## The Core Loop

**Critical Path:** Every feature either makes this faster or gets deleted.

```gherkin
Feature: The Core Loop
  As a UB student
  I want to see what's happening on campus instantly
  So that I stay connected and informed

  Scenario: The 3-Second Rule
    Given I am a student at UB
    When I open the HIVE app
    Then I should see fresh content within 3 seconds
    And the content should be relevant to me
    And I should be able to engage (like/comment) instantly
    And I should feel compelled to come back

  Measurement:
    - Open app → See feed: < 3 seconds
    - Feed refresh: < 1 second
    - Post interaction: < 300ms feedback
    - Return rate: Daily active users > 60%
```

**User Behavior Modes:**
- **80% Social Mode**: Browse, scroll, check profiles
- **20% Coordination Mode**: "Who's going to Walmart?", "Selling textbook"

---

## Platform User Journeys

### Journey 1: First-Time User (Day 0)

```gherkin
Feature: New Student Onboarding Journey
  As a new UB student
  I want to get set up quickly
  So that I can start engaging with campus content

  Scenario: Complete first-time experience
    Given I am a new student with @buffalo.edu email

    # Step 1: Email Verification (0-2 min)
    When I enter my email "jacob@buffalo.edu"
    And I click the magic link in my email
    Then I am authenticated
    And redirected to /onboarding

    # Step 2: Profile Creation (2-5 min)
    When I provide:
      | fullName        | Jacob Rhine              |
      | handle          | jacob_r                  |
      | major           | Computer Science         |
      | graduationYear  | 2026                     |
      | interests       | [coding, basketball]     |
    And I agree to community guidelines
    And I submit the onboarding form
    Then my profile is created
    And ProfileCreatedEvent is emitted
    And ProfileOnboardedEvent is emitted

    # Step 3: Auto-Join Spaces (automatic)
    Then I am automatically joined to:
      - "Welcome Space" (all new users)
      - "New Students" (all students)
      - "Campus Updates" (official UB news)
      - "Computer Science Class of 2026" (my cohort)
    And these spaces are pre-seeded with RSS content

    # Step 4: Feed Initialization (automatic)
    Then my personalized feed is created
    And populated with posts from my spaces

    # Step 5: First View (< 3 seconds)
    When I am redirected to /feed
    Then I see:
      - Welcome post from "Welcome Space"
      - Latest CS news from cohort space
      - Campus event from "Campus Updates"
      - "Join more spaces" prompt
    And the experience feels alive, not empty

    # Success Criteria
    And the entire flow takes < 7 minutes
    And I see at least 5 posts immediately
    And I feel compelled to explore more

  Measurement:
    - Onboarding completion rate: > 85%
    - Time to first post view: < 5 minutes
    - Spaces joined in first session: ≥ 4
    - Return within 24 hours: > 70%
```

---

### Journey 2: Daily Active User (Day 7+)

```gherkin
Feature: Daily Engagement Loop
  As an active HIVE user
  I want to stay updated on campus life
  So that I don't miss important events or opportunities

  Scenario: Morning check-in
    Given I am an active user with profile and spaces
    And it is 8:00 AM on a Tuesday

    # Morning Routine (< 2 minutes)
    When I open HIVE on my phone
    Then I see my feed with:
      - New posts from spaces I joined (chronological + boosted)
      - Ritual check-in prompt if I'm in an active ritual
      - Events happening today
      - Friend activity highlights

    # Quick Interactions
    When I scroll through 5-10 posts
    And I like 2 posts
    And I comment on 1 post about today's exam
    Then my engagement is tracked
    And my activity score increases
    And the feed algorithm learns my preferences

    # Space-Specific Check
    When I tap into "Computer Science Class of 2026"
    Then I see:
      - Recent posts from classmates
      - Study group forming for tomorrow
      - Professor office hours reminder
      - HiveLab tool: "Exam Countdown Timer"

    # Quick Coordination
    When I post "Anyone heading to Capen Library around 2pm?"
    Then the post appears in my space's feed
    And space members are notified (if opted in)
    And I get a response within 10 minutes

    # Exit
    When I close the app after 90 seconds
    Then my session is logged
    And I've completed the core loop

  Measurement:
    - Session duration: 60-120 seconds
    - Posts viewed per session: 8-15
    - Engagement rate: > 40% of users interact
    - Sessions per day: 3-5
```

---

### Journey 3: Space Leader (Ongoing)

```gherkin
Feature: Space Leadership Journey
  As a student organization leader
  I want to manage my space and engage members
  So that my org stays active and visible

  Scenario: Weekly space management
    Given I am the leader of "UB ACM" (CS club space)
    And the space has 150 members

    # Monday: Seed Content
    When I navigate to my space
    And I click "Seed RSS Content"
    Then 5 recent posts from TechCrunch are added
    And posts are backdated to their pubDate
    And members see fresh content

    # Tuesday: Deploy a Tool
    When I open HiveLab
    And I create a tool:
      | name        | Event RSVP Tracker      |
      | type        | form                    |
      | fields      | [name, email, +1 guest] |
    And I deploy it to my space
    Then it appears as a widget in the space
    And members can interact with it

    # Wednesday: Promote a Post
    When a member posts about an upcoming hackathon
    And I promote the post
    Then it appears at the top of the space feed
    And it's boosted in members' personal feeds
    And it stays promoted for 24 hours

    # Thursday: Moderate Content
    When I receive a report about spam
    And I review the flagged post
    And I remove it
    Then the post is hidden from the feed
    And the author is notified
    And I can optionally ban the user from the space

    # Friday: Analyze Activity
    When I view space analytics
    Then I see:
      - Member growth this week: +12
      - Total posts: 45
      - Engagement rate: 62%
      - Top contributors: [member names]
      - HiveLab tool usage: 34 interactions

  Measurement:
    - Spaces with active leaders: > 80%
    - Leader engagement per week: ≥ 3 actions
    - Member retention in active spaces: > 85%
```

---

## Five Core Features

### 1. Spaces (Pre-Seeded Communities)

```gherkin
Feature: Spaces as Content Hubs
  As HIVE's architecture
  Spaces are the ONLY place where content is created
  So that the feed can aggregate from a single source

  Business Rules:
    - All posts belong to a space (no personal timeline)
    - Spaces are pre-seeded with RSS to avoid "empty feeling"
    - Students can create spaces (after 7-day account age)
    - Campus isolation enforced (campusId: 'ub-buffalo')
    - Auto-cohort spaces created during onboarding

  User Perspective:
    Given I join a space
    Then I see its content in my feed
    And I can post to that space
    But NOT to my personal profile

  Key Scenarios:
    - Create a space (see SPACES_BDD_SPEC.md)
    - Join a space (automatic + manual)
    - Leave a space (removes from feed)
    - Manage space as leader
    - Discover spaces via browse/search/recommendations
```

---

### 2. Feed (Read-Only Aggregation)

```gherkin
Feature: Personalized Feed
  As a student
  I want to see relevant content from my spaces
  So that I stay informed without effort

  Business Rules:
    - Feed is 100% read-only (cannot post directly to feed)
    - Aggregates posts from joined spaces only
    - Real-time updates via Server-Sent Events (SSE)
    - Algorithm: Chronological + engagement boost
    - Filters: All, Spaces, Events, Rituals

  Scenario: Feed composition
    Given I am a member of:
      - "UB Computer Science" (50 members, 10 posts/day)
      - "Governors Dorm" (200 members, 30 posts/day)
      - "Campus Updates" (2000 members, 5 posts/day)

    When I load my feed
    Then I see posts from all 3 spaces
    And they are sorted by:
      1. Promoted posts (space leaders)
      2. Recent posts (< 2 hours old)
      3. Engaging posts (high like/comment ratio)
      4. Chronological fallback

    And I can filter by:
      - All (default)
      - Spaces (community content)
      - Events (upcoming events only)
      - Rituals (active ritual updates)

  Scenario: Real-time updates
    Given I am viewing my feed
    And I have an active SSE connection
    When a new post is created in one of my spaces
    Then I receive an SSE event within 500ms
    And the post appears at the top of my feed
    And I see a subtle animation indicating new content

  Key Behaviors:
    - Load feed on app open (< 3s)
    - Infinite scroll pagination
    - Pull-to-refresh
    - Real-time SSE updates
    - Engagement tracking (views, clicks, dwell time)
```

---

### 3. Profile (Campus Identity)

```gherkin
Feature: Campus Identity Profile
  As a student
  I want a profile that represents my campus life
  So that others can connect with me

  Business Rules:
    - One profile per @buffalo.edu email
    - Handle uniqueness enforced
    - Onboarding required before platform access
    - Profile completion tracked (0-100%)
    - Campus isolation (cannot see other campuses)

  Scenario: Profile composition
    Given my profile is complete
    When someone views my profile
    Then they see:
      - Basic info (name, handle, major, year)
      - Bio (optional)
      - Interests (tags)
      - Spaces I'm in (public visibility)
      - Achievements/badges
      - Connections count
      - Activity score

    But they do NOT see:
      - My phone number
      - My connections list (unless I allow it)
      - Spaces I'm in (if I set to private)
      - My activity timeline (unless I allow it)

  Scenario: Profile completion tracking
    Given I just completed onboarding
    When I view my profile
    Then I see completion percentage: 60%
    And I see next steps:
      - Add profile photo (+10%)
      - Complete bio (+10%)
      - Add more interests (+10%)
      - Join more spaces (+10%)

  Key Features:
    - Profile creation (onboarding)
    - Profile editing
    - Profile viewing (own vs others)
    - Connections system (not "friends")
    - Activity timeline
    - Privacy settings
```

---

### 4. HiveLab (No-Code Tool Builder)

```gherkin
Feature: HiveLab - Student-Built Tools
  As a space leader
  I want to create custom tools for my community
  So that I can solve specific problems without coding

  Business Rules:
    - Only space leaders can create tools
    - Tools are deployed to specific spaces
    - Templates available for common use cases
    - Tools can be shared across spaces (with permission)
    - Analytics tracked per tool

  Scenario: Create a simple form tool
    Given I am a space leader
    And I am in HiveLab builder

    When I create a new tool:
      | name        | Event RSVP Form          |
      | type        | form                     |
      | fields      | name, email, +1 guest    |
      | validation  | email required           |
      | submit      | save to space database   |

    And I deploy it to "UB ACM"
    Then the tool appears as a widget in the space
    And members can fill out the form
    And I can view submissions in analytics

  Tool Types:
    - Forms (RSVP, feedback, surveys)
    - Polls (quick questions)
    - Countdowns (exam timers, event countdowns)
    - Resource libraries (study guides, notes)
    - Announcement banners

  Key Behaviors:
    - Tool creation (drag-and-drop builder)
    - Tool deployment (to one or multiple spaces)
    - Tool analytics (usage, submissions)
    - Tool templates (gallery of pre-built tools)
```

---

### 5. Rituals (Behavioral Campaigns)

```gherkin
Feature: Rituals - Campus-Wide Habits
  As HIVE
  I want to run behavioral campaigns
  So that students build positive habits together

  Business Rules:
    - Rituals are campus-wide (not space-specific)
    - Participation is opt-in
    - Check-ins tracked daily
    - Streaks and rewards incentivize consistency
    - Social proof drives engagement

  Scenario: Wellness Wednesday ritual
    Given a ritual "Wellness Wednesday" exists with:
      | frequency   | weekly (every Wednesday)     |
      | duration    | 8 weeks                      |
      | reward      | "Wellness Warrior" badge     |
      | social      | See friends' participation   |

    When I opt into the ritual
    And it is Wednesday at 9:00 AM
    Then I receive a push notification:
      "Time to check in for Wellness Wednesday! 🧘‍♀️"

    And when I open HIVE
    Then I see the ritual card in my feed
    And I can check in with:
      - Text: "What are you doing for wellness today?"
      - Photo: Optional selfie
      - Feeling: Happy/Neutral/Stressed slider

    And when I submit my check-in
    Then my streak increments
    And I see:
      - "4-day streak! Keep it up 🔥"
      - "23 friends also checked in today"
      - Leaderboard position

  Example Rituals:
    - "Morning Gratitude" (daily journaling)
    - "Study Sprint Saturdays" (weekly study sessions)
    - "Campus Cleanup Challenge" (monthly sustainability)
    - "Mental Health Check-In" (weekly mood tracking)

  Key Behaviors:
    - Ritual creation (admin only)
    - Ritual opt-in/opt-out
    - Daily/weekly check-ins
    - Streak tracking
    - Social proof display
    - Rewards and badges
```

---

## Cross-Cutting Behaviors

### Real-Time Updates (Server-Sent Events)

```gherkin
Feature: Real-Time Platform Updates
  As HIVE
  I want to push updates to users instantly
  So that the platform feels alive and responsive

  Scenario: SSE connection lifecycle
    Given I am an authenticated user
    When I open the HIVE app
    Then an SSE connection is established to /api/sse
    And I subscribe to channels:
      - feed:user:<userId>
      - spaces:<spaceId>:posts (for each joined space)
      - rituals:<ritualId>:updates (for each joined ritual)
      - notifications:<userId>

    And when events occur:
      | event type          | channel                   | action                      |
      | new_post            | spaces:<spaceId>:posts    | Add to feed in real-time    |
      | post_liked          | spaces:<spaceId>:posts    | Update like count           |
      | new_comment         | spaces:<spaceId>:posts    | Update comment count        |
      | ritual_check_in     | rituals:<ritualId>        | Update participation count  |
      | friend_activity     | feed:user:<userId>        | Show friend activity banner |

    And when I close the app
    Then the SSE connection is gracefully closed
    And I stop receiving updates

  Performance Requirements:
    - Event delivery: < 500ms
    - Connection stability: 99.5% uptime
    - Reconnection: automatic with exponential backoff
```

---

### Notifications

```gherkin
Feature: Smart Notifications
  As a user
  I want to be notified of important events
  But not overwhelmed with noise

  Notification Types:
    1. **Push Notifications** (critical only)
       - Friend tags you in a post
       - Event starting in 1 hour
       - Ritual check-in reminder
       - Space leader mentions you

    2. **In-App Notifications** (less urgent)
       - New post in favorite space
       - Someone liked your post
       - New member joined your space
       - Friend joined a space you're in

    3. **Email Notifications** (digest)
       - Weekly activity summary
       - Monthly space highlights
       - Ritual milestone achievements

  Scenario: Notification preferences
    Given I want to customize notifications
    When I go to Settings > Notifications
    Then I can toggle:
      - Push notifications (on/off)
      - In-app notifications (on/off)
      - Email digest frequency (daily/weekly/never)
      - Per-space notification settings
      - Ritual reminders (on/off)

  Business Rules:
    - Default: Push ON, In-app ON, Email weekly
    - Respect quiet hours (10 PM - 8 AM)
    - Batch notifications (max 3 push per hour)
    - Priority: Tags > Events > Rituals > Likes
```

---

### Analytics & Tracking

```gherkin
Feature: Platform Analytics
  As HIVE
  I want to track user behavior
  So that I can improve the product

  What We Track:
    - User actions (page views, clicks, posts, likes)
    - Session duration and frequency
    - Feature usage (Spaces, HiveLab, Rituals)
    - Engagement patterns (time of day, content types)
    - Retention metrics (DAU, WAU, MAU)

  Scenario: User session tracking
    Given I am an active user
    When I:
      1. Open the app at 9:00 AM
      2. View 10 feed posts
      3. Like 2 posts
      4. Comment on 1 post
      5. Join a new space
      6. Close app at 9:03 AM

    Then the following events are logged:
      | event              | metadata                          |
      | app_opened         | timestamp, platform (iOS/Android) |
      | feed_viewed        | posts_count: 10                   |
      | post_liked         | post_id, space_id (x2)            |
      | comment_created    | post_id, comment_length           |
      | space_joined       | space_id, join_method: manual     |
      | app_closed         | session_duration: 180s            |

    And these metrics are aggregated:
      - Daily active users (DAU): +1
      - Average session duration: 180s
      - Engagement rate: 30% (3/10 posts engaged)
      - Space discovery: +1 join

  Privacy:
    - No PII tracked without consent
    - Anonymized aggregates for dashboards
    - Users can export their data
    - FERPA compliance for educational records
```

---

## Platform Invariants

These rules MUST hold true across the entire platform:

### 1. Campus Isolation
```gherkin
Invariant: All data is campus-scoped
  Given ANY database query
  Then it MUST filter by campusId = 'ub-buffalo'

  Examples:
    - Spaces query: WHERE campusId = 'ub-buffalo'
    - Users query: WHERE schoolId = 'ub-buffalo'
    - Feed posts: JOIN spaces WHERE campusId = 'ub-buffalo'
    - Connections: Can only connect within same campus
```

### 2. Email Verification
```gherkin
Invariant: Only verified @buffalo.edu emails can access the platform
  Given a user attempts to access HIVE
  Then their email MUST:
    - End with @buffalo.edu
    - Be verified (magic link clicked)

  Or access is denied
```

### 3. No Direct Feed Posting
```gherkin
Invariant: All content originates from Spaces
  Given a user wants to post content
  Then they MUST post to a specific Space
  And that content appears in the Space feed
  And aggregates to the personal feed

  But they CANNOT post directly to their personal feed
  (No personal timeline like Instagram/Twitter)
```

### 4. Real-Time or Bust
```gherkin
Invariant: All content updates must be real-time capable
  Given content is created or updated
  Then SSE events MUST be emitted within 500ms
  And connected clients receive updates instantly

  Exceptions: Batch operations (RSS seeding) notify after completion
```

### 5. Mobile-First Performance
```gherkin
Invariant: All experiences must load in < 3 seconds on mobile
  Given a user on campus WiFi (avg 10 Mbps)
  When they navigate to any page
  Then the page MUST render within 3 seconds

  Targets:
    - Feed initial load: < 2s
    - Space page load: < 2s
    - Profile load: < 1.5s
    - HiveLab builder: < 3s
```

### 6. Content Moderation
```gherkin
Invariant: All UGC must be moderatable
  Given user-generated content exists
  Then it MUST have:
    - Author ID (for accountability)
    - Timestamp (for context)
    - Parent space ID (for space-level moderation)
    - Report mechanism (for users)
    - Admin override (for campus admins)
```

---

## Success Metrics

### North Star Metric
**Daily Active Users (DAU) / Monthly Active Users (MAU) Ratio**

Target: **> 60%** (sticky product, high daily engagement)

---

### The Core Loop Metrics

```gherkin
Metric 1: Time to First Content View
  Definition: Time from app open to seeing first post
  Target: < 3 seconds
  Measurement: Client-side performance tracking

  Why it matters:
    - Slow = user bounces
    - Fast = user engages

Metric 2: Session Frequency
  Definition: Average sessions per user per day
  Target: 3-5 sessions/day
  Measurement: Analytics event tracking

  Why it matters:
    - High frequency = habit formation
    - Low frequency = product not sticky

Metric 3: Engagement Rate
  Definition: % of viewed posts that get interaction (like/comment)
  Target: > 40%
  Measurement: (interactions / post views) * 100

  Why it matters:
    - High engagement = content is relevant
    - Low engagement = algo needs tuning
```

---

### Feature-Specific Metrics

```gherkin
Spaces:
  - Spaces joined per user: ≥ 4 (onboarding) + 2/month
  - Active spaces (> 1 post/week): > 80%
  - Space retention rate: > 85% at 30 days

Feed:
  - Feed refresh frequency: 5-10 times/day
  - Posts viewed per session: 8-15
  - Real-time delivery success: > 99%

Profile:
  - Onboarding completion rate: > 85%
  - Profile completion avg: > 70%
  - Connections per user: 10-20 (quality over quantity)

HiveLab:
  - Tools created per space: ≥ 1 (leaders)
  - Tool usage rate: > 50% of space members
  - Tool template usage: > 80% (vs custom builds)

Rituals:
  - Ritual opt-in rate: > 30% of active users
  - Check-in completion: > 60% of opted-in users
  - Streak duration: avg 7+ days
```

---

### Launch Readiness Checklist (October 1st)

```gherkin
Feature: Launch Day Criteria
  As the HIVE team
  We will only launch when these criteria are met
  So that we ship a remarkable product

  Must Work Perfectly:
    ✅ Sign up with @buffalo.edu
    ✅ Complete onboarding in < 7 minutes
    ✅ See feed immediately (< 3s)
    ✅ Post text/photos to spaces
    ✅ Browse and join spaces
    ✅ View profiles (own and others)

  Must Be Fast:
    ✅ Page load: < 3s on campus WiFi
    ✅ SSE latency: < 500ms
    ✅ Transition animations: < 300ms

  Must Be Safe:
    ✅ Campus isolation enforced
    ✅ Email verification required
    ✅ Content moderation tools in place
    ✅ Rate limiting active
    ✅ FERPA compliance verified

  Must Be Tested:
    ✅ Unit tests: > 80% coverage
    ✅ Integration tests: Critical paths
    ✅ E2E tests: Full user journeys
    ✅ Load testing: 1000 concurrent users
    ✅ Mobile testing: iOS + Android

  Everything Else Is Secondary:
    - HiveLab (v2 feature)
    - Rituals (v2 feature)
    - Advanced analytics
    - Push notifications
    - Dark mode
```

---

## Platform Architecture Principles

### 1. Production Only
```gherkin
Principle: No mocks, stubs, or "we'll fix later"

  Examples:
    ❌ Mock RSS feed data → ✅ Real RSS parsing
    ❌ Fake user profiles → ✅ Real Firebase users
    ❌ Stub notification system → ✅ Working push notifications
    ❌ Placeholder images → ✅ Actual image uploads
```

### 2. Mobile-First Everything
```gherkin
Principle: 80% of usage is on phones

  Design decisions:
    - Touch targets ≥ 44px
    - Font sizes ≥ 16px (no zoom)
    - Thumb-friendly navigation (bottom tabs)
    - Swipe gestures (pull-to-refresh, swipe-to-dismiss)
    - Offline-capable (cache feed)
```

### 3. Real-Time Capable
```gherkin
Principle: Students expect instant updates

  Technical choices:
    - SSE for real-time feed updates
    - Firebase listeners for space activity
    - Optimistic UI updates (instant feedback)
    - Background sync for offline actions
```

### 4. Campus-Isolated by Default
```gherkin
Principle: Every query must filter by campus

  Implementation:
    - All Firestore queries include campusId
    - Secure helper functions enforce isolation
    - No cross-campus data leakage
    - API middleware validates campus context
```

### 5. Behavior Change > Feature Bloat
```gherkin
Principle: Build habits, not features

  Questions to ask:
    - Does this make the core loop faster?
    - Does this create a new habit?
    - Does this make campus life easier?
    - Does this make students come back daily?

  If no to all → Don't build it
```

---

## Future Scenarios (Post-Launch)

### Multi-Campus Expansion

```gherkin
Feature: Expand to Other Campuses
  As HIVE
  I want to support multiple universities
  So that we can scale beyond UB

  Scenario: Add a new campus
    Given HIVE is live at UB with 5000+ users
    When we onboard Syracuse University
    Then we:
      1. Create campusId: 'syracuse'
      2. Configure email domain: @syr.edu
      3. Seed default spaces for Syracuse
      4. Isolate all queries by campusId
      5. Launch Syracuse instance

    And UB users cannot see Syracuse content
    And Syracuse users cannot see UB content
    But the codebase is shared (multi-tenant)
```

### Advertising Platform

```gherkin
Feature: Campus-Relevant Ads
  As HIVE
  I want to show relevant ads to students
  So that we can monetize the platform

  Scenario: Local business promotion
    Given a local pizza place wants to advertise
    When they create a "50% off pizza" promotion
    And target students within 1 mile of campus
    Then the ad appears in the feed
    And is clearly labeled "Sponsored"
    And students can interact (click-to-order)
    And we track conversions
```

---

## References

- **Domain Specs:**
  - `ONBOARDING_AUTH_BDD_SPEC.md`
  - `SPACES_BDD_SPEC.md`
- **Architecture:**
  - `CLAUDE.md` (project conventions)
  - `DDD_GUIDE.md` (domain-driven design)
- **Product Docs:**
  - `UI_UX_IA_SPEC.md`
  - `LAUNCH_POSITIONING_STRATEGY.md`

---

**Document Owner:** Jacob Rhine
**Last Reviewed:** 2025-10-04
**Next Review:** Weekly until launch, then monthly
