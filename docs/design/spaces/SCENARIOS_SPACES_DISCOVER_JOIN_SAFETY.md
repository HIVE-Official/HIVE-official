Status: Draft v1
Owner: Community Guild
Last updated: 2025-10-20

# Spaces — BDD Scenarios (UB Students)

Source specs: docs/design/spaces/SPACES_V1_PRODUCT_IA_SPEC.md:1, TODO.md:139

These scenarios anchor student value for University at Buffalo (UB) students discovering, joining, and staying safe in Spaces. They drive our contracts, tests, and policy checks.

Feature: Discover recommended Spaces scoped to campus
  As a UB student
  I want to see recommended Spaces that match my campus context
  So I can quickly find where to belong

  Background:
    Given the campus is "ub-buffalo"
    And I am signed in as a student profile

  Scenario: See recommended Spaces excluding ones I’ve joined
    Given I have not joined any Spaces yet
    When I open "/spaces"
    Then I see a Recommended tab with Spaces for my campus
    And none of the recommended Spaces show me as a member
    And results are sorted by live activity (Spec §2 performance/virtualization heuristics)

  Scenario: Paginate recommended Spaces
    Given there are more than 20 recommended Spaces for my campus
    When I request the next page via cursor on "/api/spaces/recommended?limit=20"
    Then I receive the next set of items and a nextCursor if more exist

Feature: Join a Space safely
  As a UB student
  I want to join a Space and have my role set appropriately
  So I can participate with trust

  Scenario: Join a campus Space
    Given a campus Space "Robotics Guild" exists
    And I am not a member
    When I press Join
    Then my membership is created with role "member"
    And the Joined tab increments
    And the Space is removed from Recommended (Spec §1 Global IA & Navigation)

  Scenario: Respect posting policy after join
    Given a Space has posting policy "leaders_only" (Spec §2 Moderation/Policy)
    When I try to publish as a member
    Then I am blocked with error code "POSTING_RESTRICTED"
    And a leader can still publish successfully

Feature: Safety preflight and media approval
  As a UB student
  I want to avoid unsafe or inaccessible posts
  So the community stays supportive and compliant

  Scenario: Alt-text required for images (Spec §2 Safety & lints)
    Given I attach images without alt-text
    When I try to publish
    Then I see a preflight error requiring alt-text before publishing

  Scenario: Non-leader media requires approval (Spec §2 Media policy)
    Given I am not a Space leader
    And I upload media
    When I publish my post
    Then the post enters a pending approval state
    And leaders see items in the media approval queue
    And upon approval the media becomes visible and an audit event is recorded

Feature: Calm event participation
  As a UB student
  I want an effortless RSVP flow
  So I can join events without friction

  Scenario: One-tap RSVP with undo (Spec §3 Calendar)
    Given I view the Space calendar list
    When I tap RSVP
    Then I am marked "Going" instantly with a 10s Undo toast
    And the capacity bar and counts update

Feature: Pinned content auto-expiry
  As a UB student
  I want pins to stay fresh
  So information remains relevant

  Scenario: Pin expires silently (Spec §2 Post stream)
    Given a pin has expired
    When I view the Space
    Then the pin disappears from the carousel without a jarring refresh
    And Space leaders see a small "Pin expired" notice

