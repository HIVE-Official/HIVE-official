# Domain Acceptance Scenarios
**Date:** October 4, 2025  
**Goal:** Capture missing capabilities as BDD scenarios and map them to thin, test-first tasks.

---

## Profile – Non-Student Onboarding Without Academic Info
**Scenario (Given/When/Then)**  
*Given* an accepted transfer student whose `userType` is `non_student`  
*When* they call `Profile.completeOnboarding` with interests and spaces but without `academicInfo`  
*Then* the profile should mark `isOnboarded = true`, persist interests/spaces, and emit `ProfileOnboardedEvent`.

**Target Aggregate:** `packages/core/src/domain/profile/aggregates/profile.aggregate.ts`

**Thin TDD Tasks**
1. Add a failing test in `profile.aggregate.test.ts` that asserts non-student onboarding succeeds without academic info.
2. Update `Profile.completeOnboarding` to require academic info only when `userType.isStudent()` returns true.
3. Ensure the event payload and social info updates remain unchanged for the non-student branch.

---

## Spaces – Prevent Shrinking Capacity Below Membership
**Scenario (Given/When/Then)**  
*Given* a space with 12 members and `settings.maxMembers = 20`  
*When* an admin attempts to `updateSettings({ maxMembers: 10 })`  
*Then* the operation should fail with a clear message and leave settings untouched.

**Target Aggregate:** `packages/core/src/domain/spaces/aggregates/space.aggregate.ts`

**Thin TDD Tasks**
1. Extend `space.aggregate.test.ts` with a case covering the max-members downsizing scenario.
2. Refactor `Space.updateSettings` to return `Result<void>` so guards can surface failures.
3. Implement a validation that compares the new limit to `this.memberCount` and returns `Result.fail` when violated.

---

## Tools – Disallow Public Visibility for Draft Tools
**Scenario (Given/When/Then)**  
*Given* a draft HiveLab tool  
*When* its owner calls `updateVisibility('public')` without publishing first  
*Then* the aggregate should reject the change and leave the visibility unchanged.

**Target Aggregate:** `packages/core/src/domain/tools/aggregates/tool.aggregate.ts`

**Thin TDD Tasks**
1. Add a regression test to `tool.aggregate.test.ts` asserting that drafts cannot switch to `public` visibility.
2. Update `Tool.updateVisibility` to return `Result<void>` and block public/campus visibility when `status !== 'published'`.
3. Provide distinct failure messages for invalid transitions to aid UI prompts.

---

## Rituals – Enforce Join Window After Announcement
**Scenario (Given/When/Then)**  
*Given* a ritual in `draft` status  
*When* a student attempts to `addParticipant`  
*Then* the aggregate should return a failure explaining that enrollment opens once the ritual is announced or active.

**Target Aggregate:** `packages/core/src/domain/rituals/aggregates/ritual.aggregate.ts`

**Thin TDD Tasks**
1. Cover the draft-join attempt in `ritual.aggregate.test.ts`, expecting a failed result.
2. Add a status guard inside `addParticipant` allowing joins only when `status` is `announced`, `active`, or `final_push`.
3. Update participation stats logic to skip mutation on rejected joins.

---

## Feed – Emit Domain Event When Items Are Added
**Scenario (Given/When/Then)**  
*Given* an `EnhancedFeed` with existing items  
*When* new items are added via `addItems([...])`  
*Then* the aggregate should emit a `FeedItemsAddedEvent` carrying feed id, campus id, and affected item ids.

**Target Aggregate:** `packages/core/src/domain/feed/enhanced-feed.ts`

**Thin TDD Tasks**
1. Introduce a new test suite beside `enhanced-feed` that asserts the event is raised with expected payload.
2. Define `FeedItemsAddedEvent` under `packages/core/src/domain/feed/events` with relevant metadata.
3. Update `EnhancedFeed.addItems` (and `addItem`) to instantiate and queue the event after mutating state.

---

## Cross-Cutting Follow-Up
- Audit repository hydration setters across aggregates; plan replacements that preserve invariants.
- Align campus isolation checks between Profile, Space membership, and Tool deployment flows (shared TDD story pending).
