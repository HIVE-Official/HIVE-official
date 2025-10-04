# HIVE DDD Current State Audit
**Date:** October 3, 2025
**Purpose:** Phase 1 - Document what exists before refactoring
**Status:** 🟡 **30% Complete** - Foundation exists, critical pieces missing

---

## 📊 Executive Summary

**What's Working:**
- ✅ Clean folder structure for all domains
- ✅ Base DDD building blocks (AggregateRoot, ValueObject, Entity, Result)
- ✅ Repositories pattern with Firebase implementation
- ✅ Application services layer exists
- ✅ API routes are clean (use middleware, delegate to services)

**Critical Gaps:**
- ❌ Only 1 proper aggregate (Profile) - 5 more needed
- ❌ identity vs profile duplication (confusing overlap)
- ❌ Business logic in wrong layer (services have domain rules)
- ❌ Weak domain events (only 2 events, need 15-20+)
- ❌ "Enhanced" prefix on aggregates (anti-pattern)
- ❌ No event bus for cross-domain communication

**Bottom Line:** DDD skeleton exists but needs flesh on the bones.

---

## 🏗️ Domain Layer Inventory

### Total Domain Files: **53 files, ~5,464 lines**

### Domains Identified (6 total):

| Domain | Aggregates | Value Objects | Events | Entities | Specifications | Status |
|--------|-----------|---------------|--------|----------|----------------|--------|
| **identity** | 1 (Profile) | 3 | 2 | 0 | 1 | 🟡 Overlaps with profile |
| **profile** | 2 (Connection, EnhancedProfile) | 6 | 0 | 0 | 0 | 🟡 Duplicates identity |
| **spaces** | 1 (EnhancedSpace) | 4 | 0 | 2 | 0 | 🔴 Weak aggregate |
| **rituals** | 1 (EnhancedRitual) | 1 | 0 | 1 | 0 | 🔴 Weak aggregate |
| **feed** | 1 (EnhancedFeed) | 2 | 0 | 1 | 0 | 🔴 Weak aggregate |
| **analytics** | 1 (AnalyticsSession) | 2 | 3 | 0 | 0 | 🟢 Well structured |

**Total Inventory:**
- Aggregates: **7** (but only 1 proper, 6 "Enhanced" anti-pattern)
- Value Objects: **18**
- Domain Events: **5** (need 15-20+)
- Entities: **4**
- Specifications: **1**

---

## 🔍 Detailed Domain Analysis

### 1. identity Domain (CONFUSING OVERLAP)

**Location:** `packages/core/src/domain/identity/`

**Files:**
```
identity/
├── aggregates/
│   └── profile.aggregate.ts         ✅ PROPER AGGREGATE
├── value-objects/
│   ├── ub-email.value.ts           ✅ Good
│   ├── handle.value.ts             ✅ Good
│   └── personal-info.value.ts      ✅ Good
├── events/
│   ├── profile-created.event.ts    ✅ Good
│   └── profile-onboarded.event.ts  ✅ Good
├── specifications/
│   └── profile-completion.spec.ts  ✅ Good
└── index.ts
```

**Aggregate:** `Profile` (extends AggregateRoot)
- ✅ Has business logic: `completeOnboarding()`, `updatePersonalInfo()`, `addConnection()`
- ✅ Fires domain events: `ProfileCreatedEvent`, `ProfileOnboardedEvent`
- ✅ Uses value objects: `UBEmail`, `Handle`, `PersonalInfo`
- ⚠️ Issue: imports `ProfileId` from `application/shared/temporary-types` (WRONG LAYER!)

**Domain Events:**
- `ProfileCreatedEvent` - Fired when profile created
- `ProfileOnboardedEvent` - Fired when onboarding completed

**Status:** 🟢 **This is the ONLY proper aggregate in the codebase**

**Problem:** Why is this separate from `profile` domain? Causes confusion.

---

### 2. profile Domain (OVERLAP WITH IDENTITY)

**Location:** `packages/core/src/domain/profile/`

**Files:**
```
profile/
├── aggregates/
│   ├── connection.ts                ⚠️ Connection as aggregate? (should be entity)
│   └── enhanced-profile.ts          🔴 "Enhanced" anti-pattern
├── value-objects/
│   ├── profile-id.value.ts         ✅ Good
│   ├── profile-handle.value.ts     ⚠️ Duplicates identity/handle.value.ts
│   ├── campus-id.value.ts          ✅ Good
│   ├── connection-id.value.ts      ✅ Good
│   ├── user-type.value.ts          ✅ Good
│   └── profile-privacy.value.ts    ✅ Good
└── spec-compliant-profile.ts        ❓ What is this?
```

**Aggregates:**
1. `Connection` (extends AggregateRoot)
   - ⚠️ **Problem:** Connections are likely ENTITIES, not aggregates
   - Should be owned by Profile aggregate

2. `EnhancedProfile` (extends AggregateRoot)
   - 🔴 **Problem:** "Enhanced" naming is anti-pattern
   - ❌ **Problem:** No business logic, just data structure
   - ❌ **Problem:** Overlaps with identity/Profile aggregate

**Value Objects:**
- `ProfileId` - Should be used by identity domain
- `ProfileHandle` - Duplicates `identity/Handle`
- Others are good

**Status:** 🔴 **Confusing overlap, needs consolidation with identity**

**Recommendation:** Merge identity → profile, delete one or the other

---

### 3. spaces Domain (WEAK AGGREGATE)

**Location:** `packages/core/src/domain/spaces/`

**Files:**
```
spaces/
├── aggregates/
│   └── enhanced-space.ts            🔴 Weak aggregate, "Enhanced" anti-pattern
├── entities/
│   ├── tab.ts                      ✅ Good
│   └── widget.ts                   ✅ Good
└── value-objects/
    ├── space-id.value.ts           ✅ Good
    ├── space-name.value.ts         ✅ Good
    ├── space-description.value.ts  ✅ Good
    └── space-category.value.ts     ✅ Good
```

**Aggregate:** `EnhancedSpace` (extends AggregateRoot)
- ❌ **Problem:** Name is anti-pattern ("Enhanced")
- ❌ **Problem:** NO business logic methods
- ❌ **Problem:** Business logic lives in `space-discovery.service.ts` instead

**Missing Business Logic (should be in Space aggregate):**
- `addMember(profileId)` - Currently in service layer
- `removeMember(profileId)` - Currently in service layer
- `createPost(content, authorId)` - Currently in service layer
- `updateSettings(settings)` - Currently in repository
- `promoteToLeader(profileId)` - Currently in service layer

**Domain Events Missing:**
- `SpaceCreated`
- `MemberJoined`
- `MemberLeft`
- `PostCreated`
- `PostPromoted`
- `SettingsUpdated`

**Status:** 🔴 **Anemic domain model - needs full refactor**

---

### 4. rituals Domain (WEAK AGGREGATE)

**Location:** `packages/core/src/domain/rituals/`

**Files:**
```
rituals/
├── aggregates/
│   └── enhanced-ritual.ts           🔴 Weak aggregate, "Enhanced" anti-pattern
├── entities/
│   └── participation.ts            ✅ Good
└── value-objects/
    └── ritual-id.value.ts          ✅ Good
```

**Aggregate:** `EnhancedRitual` (extends AggregateRoot)
- ❌ **Problem:** Name is anti-pattern ("Enhanced")
- ❌ **Problem:** NO business logic methods
- ❌ **Problem:** Business logic lives in `ritual-participation.service.ts` (18KB!)

**Missing Business Logic (should be in Ritual aggregate):**
- `checkIn(profileId, timestamp)` - Currently in service (line 203)
- `calculateProgress(profileId)` - Currently in service (line 229)
- `awardReward(profileId)` - Currently in service (line 312)
- `updateStreak(profileId)` - Currently in service (line 189)
- `validateMilestone(profileId)` - Currently in service (line 385)

**Domain Events Missing:**
- `RitualCreated`
- `RitualStarted`
- `CheckInRecorded`
- `StreakUpdated`
- `MilestoneCompleted`
- `RewardAwarded`
- `RitualCompleted`

**Status:** 🔴 **Anemic domain model - most business logic in service layer**

---

### 5. feed Domain (WEAK AGGREGATE)

**Location:** `packages/core/src/domain/feed/`

**Files:**
```
feed/
├── aggregates/
│   └── enhanced-feed.ts             🔴 Weak aggregate, "Enhanced" anti-pattern
├── entities/
│   └── feed-item.ts                ✅ Good
└── value-objects/
    ├── feed-id.value.ts            ✅ Good
    └── feed-item-id.value.ts       ✅ Good
```

**Aggregate:** `EnhancedFeed` (extends AggregateRoot)
- ❌ **Problem:** Name is anti-pattern ("Enhanced")
- ❌ **Problem:** NO business logic methods
- ❌ **Problem:** Business logic lives in `feed-algorithm.service.ts` (12KB) and `feed-generation.service.ts` (14KB)

**Missing Business Logic (should be in Feed aggregate):**
- `generateForUser(profileId)` - Currently in service
- `applyAlgorithm(items)` - Currently in service
- `filterByRelevance(items, profile)` - Currently in service
- `scoreEngagement(item)` - Currently in service

**Domain Events Missing:**
- `FeedGenerated`
- `FeedItemViewed`
- `FeedRefreshed`

**Status:** 🔴 **Anemic domain model - all logic in services**

**Note:** Feed might be better as a **Domain Service** rather than aggregate, since it doesn't have identity/lifecycle.

---

### 6. analytics Domain (BEST EXAMPLE)

**Location:** `packages/core/src/domain/analytics/`

**Files:**
```
analytics/
├── aggregates/
│   └── analytics-session.ts         ✅ Has some structure
├── events/
│   ├── creation-analytics.event.ts  ✅ Good
│   ├── feed-analytics.event.ts      ✅ Good
│   └── onboarding-analytics.event.ts ✅ Good
├── services/
│   ├── analytics.service.ts         ⚠️ Domain service (OK here)
│   ├── event-batching.service.ts    ⚠️ Domain service (OK here)
│   └── privacy.service.ts           ⚠️ Domain service (OK here)
├── value-objects/
│   ├── analytics-config.value.ts    ✅ Good
│   └── creation-event-type.value.ts ✅ Good
└── types.ts
```

**Status:** 🟢 **Best structured domain** - has events, services in domain layer (correct!)

**Note:** Analytics having domain services is CORRECT - not all logic belongs in aggregates.

---

## 🧩 Missing Domain: tools (HiveLab)

**Location:** `packages/core/src/domain/tools/` - **DOES NOT EXIST**

**Problem:** HiveLab tools have NO domain model at all!

**What's needed:**
```
tools/
├── aggregates/
│   └── tool.aggregate.ts            ❌ Missing
├── entities/
│   ├── tool-element.ts              ❌ Missing (Poll, Event, Task, Resource)
│   └── deployment.ts                ❌ Missing
├── value-objects/
│   ├── tool-id.value.ts             ❌ Missing
│   ├── tool-name.value.ts           ❌ Missing
│   └── tool-status.value.ts         ❌ Missing
└── events/
    ├── tool-created.event.ts        ❌ Missing
    ├── tool-published.event.ts      ❌ Missing
    └── tool-deployed.event.ts       ❌ Missing
```

**Status:** 🔴 **COMPLETELY MISSING**

---

## 📚 Application Layer Analysis

### Application Services: **7 files, ~80KB total**

| Service | Size | Business Logic? | Status |
|---------|------|----------------|--------|
| `ritual-participation.service.ts` | 18KB | ❌ YES (BAD) | 🔴 Has domain rules |
| `space-discovery.service.ts` | 18KB | ❌ YES (BAD) | 🔴 Has domain rules |
| `feed-algorithm.service.ts` | 12KB | ⚠️ Maybe (algorithm might be domain service) | 🟡 Review |
| `feed-generation.service.ts` | 14KB | ❌ YES (BAD) | 🔴 Has domain rules |
| `profile-onboarding.service.ts` | 13KB | ❌ YES (BAD) | 🔴 Has domain rules |
| `base.service.ts` | 3.3KB | ✅ NO (infrastructure) | 🟢 Good |
| `index.ts` | 1.5KB | ✅ NO (exports) | 🟢 Good |

**Problem:** Application services have business logic that should be in aggregates!

**Example from `ritual-participation.service.ts` (lines 203-230):**
```typescript
// ❌ BAD - Business logic in service
async recordCheckIn(ritualId: string, profileId: string) {
  const ritual = await this.ritualRepo.findById(ritualId);

  // Business rule: Can only check in once per day
  const lastCheckIn = this.getLastCheckIn(ritual, profileId);
  if (this.isSameDay(lastCheckIn, new Date())) {
    throw new Error('Already checked in today');
  }

  // Business rule: Calculate streak
  const streak = this.calculateStreak(ritual, profileId);

  // Mutate data
  ritual.checkIns.push({ profileId, timestamp: new Date() });
  ritual.streaks[profileId] = streak;

  await this.ritualRepo.save(ritual);
}
```

**Should be:**
```typescript
// ✅ GOOD - Thin orchestration
async recordCheckIn(ritualId: string, profileId: string) {
  const ritual = await this.ritualRepo.findById(ritualId);
  const result = ritual.checkIn(profileId, new Date()); // Aggregate handles logic
  if (result.isFailure) throw new DomainException(result.error);
  await this.ritualRepo.save(ritual);
  await this.eventBus.publish(ritual.domainEvents);
}
```

---

## 🗄️ Infrastructure Layer Analysis

### Repositories: **6 Firebase implementations + interfaces**

**Location:** `packages/core/src/infrastructure/repositories/firebase/`

| Repository | Size | Status |
|-----------|------|--------|
| `profile.repository.ts` | 15.9KB | 🟢 Clean persistence logic |
| `space.repository.ts` | 17.4KB | 🟢 Clean persistence logic |
| `ritual.repository.ts` | 16KB | 🟢 Clean persistence logic |
| `feed.repository.ts` | 15.3KB | 🟢 Clean persistence logic |
| `connection.repository.ts` | 8.2KB | 🟢 Clean persistence logic |
| `unit-of-work.ts` | 2.5KB | 🟢 Transaction support |
| `factory.ts` | 2.7KB | 🟢 Dependency injection |
| `interfaces.ts` | 5.7KB | 🟢 Repository contracts |

**Status:** 🟢 **Repositories are GOOD** - they only handle persistence, no business logic

**Pattern Used:**
- Repositories convert domain models ↔ Firebase documents
- Use `Result<T>` pattern for error handling
- Return domain aggregates, not DTOs
- Clean separation of concerns

---

## 🎯 Critical Issues Identified

### Issue 1: identity vs profile Duplication (HIGH PRIORITY)

**Problem:**
- `domain/identity/` has Profile aggregate
- `domain/profile/` has EnhancedProfile aggregate + Connection aggregate
- Confusing which to use
- Value objects duplicated (Handle vs ProfileHandle)

**Impact:** Developers don't know where to put profile-related code

**Solution:** Merge into single `profile` domain, delete the other

---

### Issue 2: "Enhanced" Anti-Pattern (MEDIUM PRIORITY)

**Problem:**
- `EnhancedProfile`
- `EnhancedSpace`
- `EnhancedRitual`
- `EnhancedFeed`

**Why it's bad:**
- "Enhanced" implies there's a "regular" version (there isn't)
- Naming should be domain-specific: `Profile`, `Space`, `Ritual`, `Feed`
- Creates confusion

**Solution:** Rename all to remove "Enhanced" prefix

---

### Issue 3: Anemic Domain Models (CRITICAL)

**Problem:**
- Aggregates have NO business logic
- All business logic lives in application services
- Aggregates are just data bags

**Example:** `EnhancedSpace` has 0 business methods, everything is in `space-discovery.service.ts`

**Impact:**
- Hard to test (business logic coupled to services)
- Hard to reason about (where do I put new logic?)
- Violates DDD principles (aggregates enforce invariants)

**Solution:** Move business logic from services → aggregates (Phase 6)

---

### Issue 4: Weak Domain Events (HIGH PRIORITY)

**Problem:**
- Only 5 domain events total (2 in identity, 3 in analytics)
- No events for: Spaces, Rituals, Feed, Tools
- No event bus for cross-domain communication

**Missing events:**
- Space: Created, MemberJoined, PostCreated, etc.
- Ritual: CheckInRecorded, MilestoneCompleted, etc.
- Feed: Generated, Refreshed, etc.
- Tools: Created, Published, Deployed, etc.

**Impact:** No way to handle cross-domain effects (e.g., when user joins space → update feed)

**Solution:** Add 15-20 domain events + event bus (Phase 7)

---

### Issue 5: Missing Tool Domain (CRITICAL FOR HIVELAB)

**Problem:** HiveLab has NO domain model at all

**Impact:** Cannot build tool builder feature

**Solution:** Create complete `tools` domain (Phase 5)

---

## 📈 Business Logic Migration Plan

### From Application Services → Aggregates

| Service Method | Current Location | Should Be In |
|---------------|------------------|--------------|
| Check in to ritual | `ritual-participation.service.ts:203` | `Ritual.checkIn()` |
| Calculate streak | `ritual-participation.service.ts:189` | `Ritual.updateStreak()` |
| Award reward | `ritual-participation.service.ts:312` | `Ritual.awardReward()` |
| Add space member | `space-discovery.service.ts:???` | `Space.addMember()` |
| Create space post | `space.repository.ts` (?) | `Space.createPost()` |
| Generate feed | `feed-generation.service.ts:50` | `Feed.generate()` (or domain service) |
| Score feed item | `feed-algorithm.service.ts:120` | `FeedAlgorithm` domain service |
| Complete onboarding | `profile-onboarding.service.ts:85` | `Profile.completeOnboarding()` ✅ ALREADY DONE |

**Total methods to migrate:** ~15-20 across 4 aggregates

---

## 🎨 Visual Architecture Map

### Current State (Confusing)

```
API Routes (149 routes)
    ↓ (calls)
Application Services (7 services, 80KB)
    ├── Has business logic ❌ WRONG
    ├── Orchestrates workflows ✅ OK
    └── Calls repositories
            ↓
Domain Layer
    ├── Aggregates (7 total)
    │   ├── Profile (identity) ✅ ONLY proper one
    │   ├── Enhanced* (6 others) ❌ Anemic, no logic
    │   └── Confusion (identity vs profile)
    ├── Value Objects (18) ✅ Good
    ├── Entities (4) ✅ Good
    └── Domain Events (5) ⚠️ Too few
            ↓
Infrastructure Layer
    └── Repositories (6) ✅ Clean
            ↓
Firebase (Firestore)
```

### Target State (Clean DDD)

```
API Routes (149 routes)
    ↓ (thin orchestration)
Application Services
    ├── NO business logic ✅
    ├── Orchestrate aggregates ✅
    └── Publish domain events ✅
            ↓
Domain Layer
    ├── Aggregates (5 core)
    │   ├── Profile ✅ Business logic
    │   ├── Space ✅ Business logic
    │   ├── Ritual ✅ Business logic
    │   ├── Tool ✅ Business logic
    │   └── Feed (maybe domain service)
    ├── Domain Events (20+) ✅
    ├── Event Bus ✅
    └── Domain Services (algorithm, etc.)
            ↓
Infrastructure Layer
    ├── Repositories (6+) ✅
    └── Event Handlers ✅
            ↓
Firebase (Firestore)
```

---

## 📊 Completion Percentage by Domain

| Domain | Aggregates | Value Objects | Events | Overall |
|--------|-----------|---------------|--------|---------|
| identity | 100% (Profile done) | 100% | 100% | **100%** ✅ |
| profile | 30% (wrong aggregates) | 80% | 0% | **30%** 🔴 |
| spaces | 10% (anemic) | 100% | 0% | **20%** 🔴 |
| rituals | 10% (anemic) | 50% | 0% | **15%** 🔴 |
| feed | 10% (anemic) | 100% | 0% | **20%** 🔴 |
| tools | 0% (missing) | 0% | 0% | **0%** 🔴 |
| analytics | 70% | 100% | 100% | **90%** 🟢 |

**Overall DDD Completion:** **30%**

---

## ✅ What's Actually Complete

1. ✅ **Folder structure** - All domains have proper folders
2. ✅ **Base classes** - AggregateRoot, ValueObject, Entity, Result all good
3. ✅ **Repository pattern** - Clean separation, only handle persistence
4. ✅ **Value objects** - 18 total, well-designed
5. ✅ **API layer** - Routes are clean, use middleware properly
6. ✅ **One proper aggregate** - identity/Profile is perfect example

---

## 🚨 What Needs to Be Built

### Phase 2: Consolidate (1-2 hours)
- [ ] Merge identity → profile OR profile → identity
- [ ] Delete duplicate domain
- [ ] Update all imports
- [ ] Fix ProfileId value object location

### Phase 3-5: Create Proper Aggregates (8-10 hours)
- [ ] Space aggregate with business logic
- [ ] Ritual aggregate with business logic
- [ ] Tool aggregate with business logic
- [ ] Remove "Enhanced" prefix
- [ ] Add business methods to each

### Phase 6: Refactor Services (3-4 hours)
- [ ] Move business logic from services → aggregates
- [ ] Make services thin orchestrators
- [ ] Remove 50-70% of service code

### Phase 7: Domain Events (2-3 hours)
- [ ] Add 15-20 domain events
- [ ] Create event bus
- [ ] Wire up cross-domain communication

### Phase 8: Documentation (1-2 hours)
- [ ] Consolidate DDD docs
- [ ] Update CLAUDE.md
- [ ] Create examples

**Total Remaining Work:** ~16-20 hours

---

## 🎯 Recommendations for Jacob

### Keep (Don't Touch)
- ✅ Repository pattern - it's good
- ✅ identity/Profile aggregate - it's the model
- ✅ Base DDD classes - solid foundation
- ✅ API routes - clean orchestration
- ✅ analytics domain - well structured

### Fix (High Priority)
- 🔴 Merge identity + profile domains
- 🔴 Create proper Space aggregate
- 🔴 Create proper Ritual aggregate
- 🔴 Create Tool aggregate (missing)
- 🔴 Move business logic to aggregates
- 🔴 Add domain events

### Decide (Architecture Choice)
- ❓ Feed: Aggregate or Domain Service?
  - Might be better as domain service since it's algorithmic
  - Doesn't have identity/lifecycle like other aggregates
  - **Recommendation:** Domain Service (like analytics)

---

## 📝 Next Steps

This audit is complete. Ready for Phase 2: **Consolidate identity → profile**.

**Questions for Jacob before proceeding:**
1. Merge identity INTO profile, or profile INTO identity?
2. Should we keep "Enhanced" prefix or remove it?
3. Feed as aggregate or domain service?

**Awaiting approval to proceed to Phase 2.**
