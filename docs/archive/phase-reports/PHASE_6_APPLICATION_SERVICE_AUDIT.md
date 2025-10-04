# Phase 6: Application Service Audit

**Status:** Audit Complete - Refactoring Required
**Date:** 2025-10-03
**Goal:** Identify business logic in application services and move it to domain aggregates

---

## Audit Summary

**Total Services Analyzed:** 6
**Correctly Thin Services:** 1 (17%)
**Services Needing Refactoring:** 4 (67%)
**Domain Services (Correctly Placed):** 1 (17%)

### Quick Assessment

| Service | Status | Business Logic Found | Action Required |
|---------|--------|---------------------|-----------------|
| base.service.ts | ✅ Correct | None | No change |
| feed-algorithm.service.ts | ⚠️ Domain Service | Algorithm logic | Keep as-is (Domain Service) |
| feed-generation.service.ts | ❌ Needs Refactor | Filtering, insights, suggestions | Extract to domain |
| profile-onboarding.service.ts | ❌ Needs Refactor | Completion rules, warnings | Extract to domain |
| ritual-participation.service.ts | ❌ Needs Refactor | Progress calc, points calc | Extract to domain |
| space-discovery.service.ts | ❌ Needs Refactor | Sorting, trending, messages | Extract to domain |

---

## Detailed Analysis

### 1. base.service.ts ✅ CORRECT

**File:** `/packages/core/src/application/base.service.ts` (137 lines)

**Purpose:** Foundation for all application services with common patterns

**Analysis:**
- ✅ Pure infrastructure code
- ✅ No business logic
- ✅ Provides:
  - Error handling wrapper (`execute()`)
  - Context management
  - Logging
  - Request ID generation
  - ServiceResult pattern

**Verdict:** Perfect example of thin service infrastructure. **No changes needed.**

---

### 2. feed-algorithm.service.ts ⚠️ DOMAIN SERVICE

**File:** `/packages/core/src/application/feed-algorithm.service.ts` (415 lines)

**Purpose:** Behavioral psychology-based feed scoring algorithm

**Analysis:**

**Methods:**
```typescript
// Scoring methods (lines 94-273)
scorePost() - Orchestrates scoring
calculateAnxietyRelief() - Calculates anxiety relief score (0-100)
calculateSocialProof() - Calculates social proof score (0-100)
calculateInsiderAccess() - Calculates insider access score (0-100)

// Signal extraction methods (lines 278-327)
extractAnxietySignals() - Extracts anxiety keywords from content
extractSocialProofSignals() - Extracts friend/connection signals
extractInsiderAccessSignals() - Extracts exclusivity signals

// Slot machine psychology (lines 384-404)
applyVariableRatio() - Variable ratio reinforcement
```

**Assessment:**
- This is a **stateless computation** service
- Implements complex algorithm from SPEC.md (lines 394-435)
- Algorithm weights: AnxietyRelief × 0.4 + SocialProof × 0.3 + InsiderAccess × 0.3
- Contains no I/O, no persistence, just pure calculation

**Verdict:** This is a **Domain Service** (not an application service). Domain services are allowed when:
1. Operation spans multiple aggregates
2. Operation is pure computation
3. No natural home in a single aggregate

**Recommendation:**
- Move to `/packages/core/src/domain/feed/services/feed-algorithm.service.ts`
- Keep implementation as-is (it's correctly stateless)
- Create `FeedAlgorithmService` as a domain service

**No immediate refactoring needed** - just relocate to domain layer.

---

### 3. feed-generation.service.ts ❌ NEEDS REFACTOR

**File:** `/packages/core/src/application/feed-generation.service.ts` (497 lines)

**Purpose:** Orchestrates personalized feed generation

**Business Logic Found:**

#### 3.1. Content Filtering (Lines 335-364)
```typescript
private applyContentFilters(items: FeedItem[], options: FeedGenerationOptions): FeedItem[]
```
**Problem:** Implements filtering business rules
**Where it belongs:** `EnhancedFeed.applyFilters()` method in domain aggregate

#### 3.2. Feed Insights Generation (Lines 366-429)
```typescript
private generateFeedInsights(items: FeedItem[], feed: EnhancedFeed): FeedInsights
```
**Business logic:**
- Calculates engagement rate
- Determines primary content type
- Identifies top spaces
- Generates algorithmic suggestions

**Where it belongs:** `EnhancedFeed.generateInsights()` method in domain aggregate

#### 3.3. Adjustment Suggestions (Lines 431-465)
```typescript
private generateAdjustmentSuggestions(): string[]
```
**Business rules:**
- "Low engagement" threshold check
- Content diversity rules
- Score optimization rules
- Algorithm weight recommendations

**Where it belongs:** `EnhancedFeed.getSuggestedAdjustments()` method in domain aggregate

#### 3.4. Algorithm Weight Updates (Lines 467-496)
```typescript
private async updateAlgorithmWeights(userId: string, itemId: string, feedback: 'positive' | 'negative')
```
**Business logic:**
- Adjustment calculations (0.01 increments)
- Weight distribution (recency × 0.5, engagement × 1.5, etc.)

**Where it belongs:** `EnhancedFeed.adjustWeights()` method in domain aggregate

**Refactoring Plan:**

1. **Move to EnhancedFeed aggregate:**
```typescript
// In /packages/core/src/domain/feed/enhanced-feed.ts

public applyFilters(options: FeedFilterOptions): FeedItem[] {
  // Move applyContentFilters logic here
}

public generateInsights(items: FeedItem[]): FeedInsights {
  // Move generateFeedInsights logic here
}

public getSuggestedAdjustments(): string[] {
  // Move generateAdjustmentSuggestions logic here
}

public adjustWeightsFromFeedback(feedback: 'positive' | 'negative', itemType: string): void {
  // Move updateAlgorithmWeights calculation logic here
}
```

2. **Simplify service to pure orchestration:**
```typescript
async generateFeed(userId: string, options: FeedGenerationOptions): Promise<Result<ServiceResult<FeedContent>>> {
  // 1. Fetch user profile
  // 2. Fetch feed
  // 3. Get feed content from repository
  // 4. Call feed.applyFilters(options) <- Domain logic
  // 5. Call feed.generateInsights(items) <- Domain logic
  // 6. Return result
}
```

**Lines of code to move:** ~180 lines

---

### 4. profile-onboarding.service.ts ❌ NEEDS REFACTOR

**File:** `/packages/core/src/application/profile-onboarding.service.ts` (418 lines)

**Purpose:** Orchestrates user onboarding flow

**Business Logic Found:**

#### 4.1. Next Steps Generation (Lines 344-389)
```typescript
private generateNextSteps(profile: Profile, suggestedSpaces: any[]): Array<...>
```
**Business rules:**
- Priority ordering (1-5)
- Conditional logic:
  - If no photo → priority 1
  - If < 3 interests → priority 2
  - If suggested spaces → priority 3
- Hardcoded action descriptions

**Where it belongs:** `Profile.getOnboardingNextSteps()` method in domain aggregate

#### 4.2. Onboarding Warnings (Lines 391-407)
```typescript
private generateOnboardingWarnings(data: OnboardingData): string[]
```
**Business rules:**
- "No bio" warning
- "No major" warning
- "No interests" warning

**Where it belongs:** `Profile.getOnboardingWarnings()` method in domain aggregate

#### 4.3. Onboarding Completion Check (Lines 409-417)
```typescript
private isOnboardingComplete(profile: Profile): boolean
```
**Business rules:**
- Required fields: handle, firstName, lastName
- At least 1 interest required

**Where it belongs:** `Profile.isOnboardingComplete` property/method in domain aggregate

**Refactoring Plan:**

1. **Move to Profile aggregate:**
```typescript
// In /packages/core/src/domain/profile/aggregates/profile.aggregate.ts

public getOnboardingNextSteps(suggestedSpaces: Space[]): OnboardingStep[] {
  // Move generateNextSteps logic here
  // Business rules for priority and descriptions
}

public getOnboardingWarnings(): string[] {
  // Move generateOnboardingWarnings logic here
  // Validation rules for what's missing
}

public get isOnboardingComplete(): boolean {
  // Move isOnboardingComplete logic here
  // Business rules for required fields
}

public getOnboardingStatus(): OnboardingStatus {
  return {
    isComplete: this.isOnboardingComplete,
    percentComplete: this.calculateCompletionPercentage(),
    nextSteps: this.getOnboardingNextSteps([]),
    warnings: this.getOnboardingWarnings()
  };
}
```

2. **Simplify service to orchestration:**
```typescript
async completeOnboarding(data: OnboardingData): Promise<Result<ServiceResult<OnboardingResult>>> {
  // 1. Validate email domain (delegate to value object) ✅
  // 2. Check handle availability (query repo) ✅
  // 3. Create profile (aggregate) ✅
  // 4. Initialize feed (orchestration) ✅
  // 5. Get suggested spaces (query repo) ✅
  // 6. Auto-join default spaces (orchestration) ✅
  // 7. Call profile.getOnboardingNextSteps(spaces) <- Domain logic
  // 8. Call profile.getOnboardingWarnings() <- Domain logic
  // 9. Return result
}
```

**Lines of code to move:** ~70 lines

---

### 5. ritual-participation.service.ts ❌ NEEDS REFACTOR

**File:** `/packages/core/src/application/ritual-participation.service.ts` (583 lines)

**Purpose:** Orchestrates ritual participation and progress tracking

**Business Logic Found:**

#### 5.1. Ritual Progress Calculation (Lines 490-524)
```typescript
private async calculateRitualProgress(ritual: Ritual, participation: Participation): Promise<RitualProgress>
```
**Business logic:**
- Completion percentage calculation: `(completed / total) * 100`
- Next milestone identification logic
- Rank calculation from leaderboard
- Recent achievements slicing

**Where it belongs:** `Ritual.calculateProgress(participation: Participation)` method in domain aggregate

#### 5.2. Milestone Points Calculation (Lines 526-538)
```typescript
private calculateMilestonePoints(milestone: Milestone): number
```
**Business rules:**
- Base points = `targetValue * 10`
- Bonus points for 'points' type rewards
- Point accumulation logic

**Where it belongs:** `Milestone.calculatePoints()` method (or in Ritual aggregate)

#### 5.3. Participation Warnings (Lines 540-565)
```typescript
private generateParticipationWarnings(ritual: Ritual): string[]
```
**Business rules:**
- Days until end check (≤ 7 days warning)
- Spots remaining check (≤ 10 spots warning)
- Late join validation

**Where it belongs:** `Ritual.getParticipationWarnings()` method in domain aggregate

#### 5.4. Ritual Type Mapping (Lines 567-582)
```typescript
private mapRitualType(ritualType: string): 'daily' | 'weekly' | ...
```
**NOTE:** This mapping is **WRONG** based on Phase 4 correction!

**Issue:** Using old type system ('daily' | 'weekly' | 'monthly')
**Should be:** 'short' | 'anticipatory' | 'yearbook' (per SPEC.md)

**Where it belongs:** This is a **DTO mapping concern**, should be in a mapper or removed entirely

**Refactoring Plan:**

1. **Move to Ritual aggregate:**
```typescript
// In /packages/core/src/domain/rituals/aggregates/ritual.aggregate.ts

public calculateProgress(participation: Participation): RitualProgress {
  // Move calculateRitualProgress logic here
  const completionPercentage = (participation.completedMilestones.length / this.props.goals.length) * 100;
  const nextGoal = this.getNextUncompletedGoal(participation);
  return {
    completionPercentage,
    nextGoal,
    // ... etc
  };
}

public getParticipationWarnings(now: Date = new Date()): string[] {
  // Move generateParticipationWarnings logic here
  const warnings = [];
  const daysUntilEnd = this.calculateDaysUntilEnd(now);
  if (daysUntilEnd <= 7) {
    warnings.push(`This ritual ends in ${daysUntilEnd} days`);
  }
  // ... etc
  return warnings;
}

// In Milestone (or Goal) entity/value object
public calculatePoints(): number {
  // Move calculateMilestonePoints logic here
}
```

2. **Fix ritual type mapping:**
- Remove `mapRitualType()` entirely
- Use correct types from Phase 4: 'short' | 'anticipatory' | 'yearbook'
- Update `RitualCreationData` interface to use correct types

3. **Simplify service:**
```typescript
async recordProgress(userId: string, ritualId: string, goalId: string, progress: number): Promise<Result<RitualProgress>> {
  // 1. Get participation
  // 2. Get ritual
  // 3. Call participation.updateProgress() <- Domain logic
  // 4. Call ritual.checkGoalCompletion() <- Domain logic
  // 5. Call participation.awardPoints() <- Domain logic
  // 6. Save participation and ritual
  // 7. Call ritual.calculateProgress(participation) <- Domain logic
  // 8. Return result
}
```

**Lines of code to move:** ~100 lines

**CRITICAL FIX NEEDED:** Update to use correct Ritual types from Phase 4!

---

### 6. space-discovery.service.ts ❌ NEEDS REFACTOR

**File:** `/packages/core/src/application/space-discovery.service.ts` (557 lines)

**Purpose:** Orchestrates space discovery, joining, and management

**Business Logic Found:**

#### 6.1. Space Sorting (Lines 474-495)
```typescript
private sortSpaces(spaces: Space[], sortBy: string): Space[]
```
**Business rules:**
- Sorting by 'members': `b.memberCount - a.memberCount`
- Sorting by 'activity': `lastActivityAt` comparison
- Sorting by 'new': `createdAt` comparison
- Sorting by 'trending': `memberCount + activityScore` calculation

**Where it belongs:** This could be:
- Query pattern in repository (preferred for pure sorting)
- OR `Space` static method `Space.sort(spaces, criteria)`

#### 6.2. Welcome Message Generation (Lines 497-501)
```typescript
private generateWelcomeMessage(space: Space): string
```
**Business logic:**
- Template: `"Welcome to {name}! {description}"`

**Where it belongs:** `Space.getWelcomeMessage()` method in domain aggregate

#### 6.3. Suggested Actions (Lines 503-532)
```typescript
private generateSuggestedActions(space: Space): Array<{ action: string; description: string }>
```
**Business rules:**
- If space has posts → suggest "read_recent_posts"
- Always suggest "introduce_yourself"
- If study-group → suggest "share_resources"
- Always suggest "invite_friends"

**Where it belongs:** `Space.getSuggestedActions()` method in domain aggregate

#### 6.4. Trending Topics Extraction (Lines 534-551)
```typescript
private extractTrendingTopics(posts: any[]): string[]
```
**Business logic:**
- Word frequency analysis
- Filter words > 4 characters
- Return top 5 trending words

**Where it belongs:**
- If simple → `Space.getTrendingTopics()` method
- If complex → Domain Service `TrendingTopicsService`

**Refactoring Plan:**

1. **Move to Space aggregate:**
```typescript
// In /packages/core/src/domain/spaces/aggregates/space.aggregate.ts

public getWelcomeMessage(): string {
  // Move generateWelcomeMessage logic here
  return `Welcome to ${this.props.name.value}! ${this.props.description.value}`;
}

public getSuggestedActions(): SpaceAction[] {
  // Move generateSuggestedActions logic here
  const actions = [];
  if (this.props.posts.length > 0) {
    actions.push({ action: 'read_recent_posts', description: '...' });
  }
  // ... etc
  return actions;
}

public getTrendingTopics(): string[] {
  // Move extractTrendingTopics logic here
  // Or delegate to TrendingTopicsService if complex
}
```

2. **Move sorting to repository:**
```typescript
// In /packages/core/src/infrastructure/repositories/interfaces/space.repository.interface.ts

interface ISpaceRepository {
  findPublicSpaces(campusId: string, limit: number, sortBy: SpaceSortCriteria): Promise<Result<Space[]>>;
}
```

3. **Simplify service:**
```typescript
async joinSpace(userId: string, spaceId: string): Promise<Result<ServiceResult<SpaceJoinResult>>> {
  // 1. Get user profile
  // 2. Get space
  // 3. Call space.addMember(userId) <- Domain logic
  // 4. Save space
  // 5. Call space.getWelcomeMessage() <- Domain logic
  // 6. Call space.getSuggestedActions() <- Domain logic
  // 7. Return result
}
```

**Lines of code to move:** ~90 lines

---

## Refactoring Priority

### High Priority (Complete First)

**1. profile-onboarding.service.ts**
- Reason: Clearest domain logic violations
- Impact: Profile aggregate used across platform
- Estimated time: 2 hours

**2. ritual-participation.service.ts**
- Reason: CRITICAL type system bug (using old ritual types)
- Impact: Ritual domain is central to platform engagement
- Estimated time: 3 hours (includes type fix)

### Medium Priority

**3. space-discovery.service.ts**
- Reason: Welcome messages and actions are clear domain responsibilities
- Impact: Space joining flow used frequently
- Estimated time: 2 hours

**4. feed-generation.service.ts**
- Reason: Feed insights and filtering are business rules
- Impact: Core user experience
- Estimated time: 3 hours

### Low Priority

**5. feed-algorithm.service.ts**
- Reason: Just needs relocation, no logic changes
- Impact: Organizational clarity
- Estimated time: 30 minutes

---

## Refactoring Steps

### Step 1: Profile Onboarding (High Priority)

1. Add methods to Profile aggregate:
   - `getOnboardingNextSteps(suggestedSpaces: Space[]): OnboardingStep[]`
   - `getOnboardingWarnings(): string[]`
   - `isOnboardingComplete: boolean` (property)
   - `getOnboardingStatus(): OnboardingStatus`

2. Update ProfileOnboardingService to call domain methods

3. Write unit tests for new domain methods

4. Verify existing integration tests still pass

### Step 2: Ritual Participation (High Priority + Bug Fix)

1. **FIX TYPE SYSTEM FIRST:**
   - Remove `mapRitualType()` method
   - Update `RitualCreationData` interface to use 'short' | 'anticipatory' | 'yearbook'
   - Ensure alignment with Phase 4 Ritual aggregate

2. Add methods to Ritual aggregate:
   - `calculateProgress(participation: Participation): RitualProgress`
   - `getParticipationWarnings(now: Date): string[]`

3. Add method to Goal or Milestone:
   - `calculatePoints(): number`

4. Update RitualParticipationService to call domain methods

5. Write unit tests for new domain methods

6. Write integration tests for type system fix

### Step 3: Space Discovery (Medium Priority)

1. Add methods to Space aggregate:
   - `getWelcomeMessage(): string`
   - `getSuggestedActions(): SpaceAction[]`
   - `getTrendingTopics(): string[]`

2. Update repository interfaces for sorting

3. Update SpaceDiscoveryService to call domain methods

4. Write unit tests for new domain methods

### Step 4: Feed Generation (Medium Priority)

1. Add methods to EnhancedFeed aggregate:
   - `applyFilters(options: FeedFilterOptions): FeedItem[]`
   - `generateInsights(items: FeedItem[]): FeedInsights`
   - `getSuggestedAdjustments(): string[]`
   - `adjustWeightsFromFeedback(feedback: 'positive' | 'negative', itemType: string): void`

2. Update FeedGenerationService to call domain methods

3. Write unit tests for new domain methods

### Step 5: Feed Algorithm Relocation (Low Priority)

1. Create `/packages/core/src/domain/feed/services/` directory

2. Move `feed-algorithm.service.ts` to domain services

3. Update imports across codebase

4. Add exports to domain index

---

## Expected Outcomes

### After Refactoring:

**Application Services Will:**
- ✅ Orchestrate use cases only
- ✅ Call repositories to fetch/save data
- ✅ Call domain methods for business logic
- ✅ Handle transactions (where needed)
- ✅ Manage cross-aggregate coordination
- ✅ Be ~50-70% smaller (simpler to understand)

**Domain Aggregates Will:**
- ✅ Contain all business rules
- ✅ Be self-documenting (methods show what aggregate can do)
- ✅ Be testable in isolation (no repository dependencies)
- ✅ Enforce invariants
- ✅ Fire domain events

### Metrics:

| Before | After |
|--------|-------|
| 4 services with business logic | 0 services with business logic |
| ~440 lines of business logic in services | 0 lines |
| ~440 lines added to domain aggregates | N/A |
| Business rules scattered | Business rules centralized |
| Difficult to test domain logic | Easy to test domain logic |

---

## Phase 6 Completion Criteria

✅ All business logic moved to domain aggregates
✅ Application services are pure orchestration
✅ All domain methods have unit tests
✅ All integration tests still pass
✅ Type system bug in ritual-participation.service.ts fixed
✅ feed-algorithm.service.ts relocated to domain services
✅ Documentation updated (DDD_GUIDE.md)

---

## Next Steps

**After completing Phase 6 refactoring:**

1. Proceed to **Phase 7: Add Domain Events & Event Bus**
2. Ensure domain events fire from all aggregate methods
3. Create event bus for cross-aggregate communication
4. Add event handlers for asynchronous workflows

**Estimated Total Time for Phase 6:** 10-12 hours

---

**Awaiting your approval to begin refactoring!**
