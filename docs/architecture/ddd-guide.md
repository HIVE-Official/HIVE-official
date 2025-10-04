# HIVE Domain-Driven Design Guide

**Version**: 1.0
**Last Updated**: October 2025
**Status**: Production-ready DDD architecture

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Layers](#architecture-layers)
3. [Domain Model](#domain-model)
4. [DDD Building Blocks](#ddd-building-blocks)
5. [Event-Driven Architecture](#event-driven-architecture)
6. [Application Services](#application-services)
7. [Repository Pattern](#repository-pattern)
8. [Best Practices](#best-practices)
9. [Code Examples](#code-examples)
10. [Testing Strategies](#testing-strategies)
11. [Common Pitfalls](#common-pitfalls)

---

## Overview

HIVE implements **Domain-Driven Design (DDD)** with Clean Architecture principles to create a maintainable, scalable, and testable codebase. Our DDD implementation focuses on:

- **Rich domain models** with business logic encapsulated in aggregates
- **Event-driven communication** between bounded contexts
- **Thin application services** that orchestrate domain logic
- **Strict layer separation** with dependency rules

### Why DDD for HIVE?

HIVE is a complex social platform with multiple bounded contexts:
- **Identity/Profile**: User accounts, campus identity, connections
- **Spaces**: Community spaces with RSS feeds, posts, members
- **Rituals**: Campus-wide behavioral campaigns with milestones
- **Tools (HiveLab)**: No-code tool builder for space leaders
- **Feed**: Personalized content aggregation with behavioral algorithms

DDD helps us manage this complexity by:
1. **Modeling the domain explicitly** - Code reflects student life reality
2. **Ubiquitous language** - Developers and stakeholders speak the same language
3. **Bounded contexts** - Each domain is independent and focused
4. **Business rules in domain** - Logic lives where it belongs

---

## Architecture Layers

HIVE follows the Clean Architecture onion model with strict dependency rules:

```
┌─────────────────────────────────────────┐
│         Infrastructure Layer            │  External concerns
│  - Firebase repositories                │  (Outer layer)
│  - EventBus implementation              │
│  - External API clients                 │
└─────────────────────────────────────────┘
              ↓ depends on
┌─────────────────────────────────────────┐
│         Application Layer               │  Use cases
│  - Application services                 │  (Orchestration)
│  - Event handlers                       │
│  - DTOs and interfaces                  │
└─────────────────────────────────────────┘
              ↓ depends on
┌─────────────────────────────────────────┐
│           Domain Layer                  │  Business logic
│  - Aggregates (Profile, Space, etc.)   │  (Core - no deps)
│  - Value Objects (UBEmail, Handle)     │
│  - Domain Events                        │
│  - Domain Services                      │
│  - Specifications                       │
└─────────────────────────────────────────┘
```

### Dependency Rule

**Inner layers NEVER depend on outer layers.**

✅ **CORRECT**: Application service depends on domain aggregate
❌ **WRONG**: Domain aggregate depends on repository

---

## Domain Model

### Bounded Contexts

HIVE has 5 primary bounded contexts:

#### 1. Profile (Identity) Context
**Purpose**: User identity, campus affiliation, connections

**Aggregates**:
- `Profile` - User profile with personal info, social info, campus identity

**Value Objects**:
- `ProfileId` - Unique identifier
- `UBEmail` - Validated @buffalo.edu email
- `ProfileHandle` - Unique username (@handle)
- `PersonalInfo` - Name, bio, profile photo
- `SocialInfo` - Interests, dorm, major
- `CampusId` - Campus affiliation (ub-buffalo)

**Events**:
- `ProfileCreated` - New user account created
- `ProfileOnboarded` - User completed onboarding

#### 2. Spaces Context
**Purpose**: Community spaces, membership, content

**Aggregates**:
- `Space` - Community space with members, tabs, widgets

**Entities**:
- `Tab` - Space tab (Feed, Events, Resources)
- `Widget` - Space widget component
- `SpaceMember` - Membership with role

**Value Objects**:
- `SpaceId` - Unique identifier
- `SpaceName` - Space name (validated)
- `SpaceDescription` - Space description
- `SpaceCategory` - Type of space

**Events**:
- `SpaceCreated` - New space created
- `MemberJoined` - User joined space
- `MemberRemoved` - User removed from space
- `MemberRoleUpdated` - Member role changed
- `PostCreated` - New post in space

#### 3. Rituals Context
**Purpose**: Campus-wide behavioral campaigns

**Aggregates**:
- `Ritual` - Campaign with goals, requirements, rewards

**Entities**:
- `Participation` - User's participation in ritual
- `Goal` - Ritual goal with progress tracking

**Value Objects**:
- `RitualId` - Unique identifier
- `RitualType` - 'short' | 'anticipatory' | 'yearbook' (from SPEC.md)
- `RitualCategory` - 'social' | 'academic' | 'wellness' | 'community'

**Events**:
- `RitualCreated` - New ritual created
- `ParticipantJoined` - User joined ritual
- `ParticipantLeft` - User left ritual
- `MilestoneCompleted` - User completed milestone
- `RitualActivated` - Ritual started
- `RitualDeactivated` - Ritual ended

#### 4. Tools (HiveLab) Context
**Purpose**: No-code tool builder for spaces

**Aggregates**:
- `Tool` - User-created tool with elements, actions, state

**Entities**:
- `ToolElement` - UI element (button, form, text)
- `ToolAction` - Action (HTTP request, state update)

**Value Objects**:
- `ToolId` - Unique identifier
- `ToolName` - Tool name
- `ToolVersion` - Semver version

**Events**:
- `ToolCreated` - New tool created
- `ToolPublished` - Tool made public
- `ToolForked` - Tool copied
- `ToolDeployed` - Tool deployed to space
- `ToolUsed` - Tool executed
- `ToolArchived` - Tool archived

#### 5. Feed Context
**Purpose**: Personalized content aggregation

**Aggregates**:
- `EnhancedFeed` - User's personalized feed

**Entities**:
- `FeedItem` - Individual feed entry

**Domain Services**:
- `FeedAlgorithmService` - Behavioral psychology-based scoring

**Value Objects**:
- `FeedId` - Unique identifier
- `FeedFilterType` - Filter type

---

## DDD Building Blocks

### 1. Aggregates

**Definition**: Cluster of entities and value objects treated as a single unit for data changes.

**Rules**:
- Has a **root entity** (the aggregate root)
- Enforces **invariants** (business rules)
- Has a **clear boundary** (what's inside/outside)
- External objects can only reference the root by ID

**Example**:
```typescript
export class Space extends AggregateRoot<SpaceProps> {
  // Aggregate root for Space bounded context

  // Business rule: Can't remove last admin
  public removeMember(profileId: ProfileId): Result<void> {
    const member = this.props.members.find(m => m.profileId.value === profileId.value);

    if (member.role === 'admin' && this.getAdminCount() === 1) {
      return Result.fail<void>('Cannot remove the last admin');
    }

    this.props.members.splice(memberIndex, 1);
    this.addDomainEvent(new MemberRemovedEvent(this.id, profileId.value));
    return Result.ok<void>();
  }
}
```

### 2. Entities

**Definition**: Objects with unique identity that persists over time.

**Characteristics**:
- Has a **unique identifier**
- **Mutable** (can change state)
- **Equality by ID** (not by attributes)

**Example**:
```typescript
export class Tab extends Entity<TabProps> {
  get name(): string {
    return this.props.name;
  }

  get isDefault(): boolean {
    return this.props.isDefault;
  }

  // Tab is an entity - has identity, can be modified
}
```

### 3. Value Objects

**Definition**: Objects defined by their attributes, not identity.

**Characteristics**:
- **Immutable** (create new instead of modify)
- **Equality by value** (all attributes must match)
- **Self-validating** (enforce rules in constructor)

**Example**:
```typescript
export class UBEmail extends ValueObject<UBEmailProps> {
  private constructor(props: UBEmailProps) {
    super(props);
  }

  public static create(email: string): Result<UBEmail> {
    if (!email.endsWith('@buffalo.edu')) {
      return Result.fail<UBEmail>('Email must be @buffalo.edu domain');
    }

    return Result.ok<UBEmail>(new UBEmail({ value: email.toLowerCase() }));
  }

  // Immutable - to change email, create new UBEmail
  // Self-validating - invalid emails can't be created
}
```

### 4. Domain Events

**Definition**: Something significant that happened in the domain.

**Characteristics**:
- **Past tense** naming (ProfileCreated, not CreateProfile)
- **Immutable** (what happened can't change)
- **Rich with data** (capture context)

**Example**:
```typescript
export class ProfileCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email: string,
    public readonly handle: string
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ProfileCreated';
  }
}

// Usage in aggregate
export class Profile extends AggregateRoot<ProfileProps> {
  public static create(props: CreateProfileProps): Result<Profile> {
    const profile = new Profile(profileProps);

    // Fire domain event
    profile.addDomainEvent(
      new ProfileCreatedEvent(profile.id, props.email, props.handle)
    );

    return Result.ok<Profile>(profile);
  }
}
```

### 5. Domain Services

**Definition**: Stateless operations that don't naturally fit in an aggregate.

**When to use**:
- Logic involves **multiple aggregates**
- Operation is **stateless** (no I/O)
- Represents a **domain concept** (not infrastructure)

**Example**:
```typescript
export class FeedAlgorithmService {
  // Domain service - operates across Post, Space, Profile aggregates
  // Pure algorithm, no I/O, stateless

  scorePost(
    post: FeedPost,
    user: User,
    space: Space,
    connections: Connection[]
  ): ScoredPost {
    // Calculate anxiety relief score (domain concept)
    const anxietyScore = this.calculateAnxietyRelief(post, user, space);

    // Calculate social proof score (domain concept)
    const socialScore = this.calculateSocialProof(post, user, connections);

    // Combine scores (algorithm is domain logic)
    const totalScore = (anxietyScore * 0.4) + (socialScore * 0.3) + ...;

    return { ...post, algorithmScore: totalScore };
  }
}
```

### 6. Specifications

**Definition**: Business rules that can be combined and reused.

**Example**:
```typescript
export class ProfileCompletionSpec extends Specification<Profile> {
  isSatisfiedBy(profile: Profile): boolean {
    const data = profile.toData();

    return !!(
      data.personalInfo.profilePhoto &&
      data.personalInfo.bio &&
      data.socialInfo.interests.length >= 3 &&
      data.socialInfo.major &&
      data.socialInfo.graduationYear
    );
  }
}

// Usage
const spec = new ProfileCompletionSpec();
if (spec.isSatisfiedBy(profile)) {
  // Profile is complete
}
```

---

## Event-Driven Architecture

### EventBus Pattern

HIVE uses pub/sub pattern for loose coupling:

```typescript
// 1. Register handlers (once at startup)
import { registerEventHandlers } from '@hive/core/application/event-handlers';
registerEventHandlers();

// 2. Aggregates add events
profile.addDomainEvent(new ProfileCreatedEvent(profile.id));

// 3. Services dispatch after save
await this.saveAndDispatchEvents(profile, (p) => this.profileRepo.save(p));

// 4. EventBus notifies handlers
// handleProfileCreated() executes automatically
```

### Event Flow Diagram

```
┌──────────────┐
│  Aggregate   │  1. Business logic adds event
│   (Profile)  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Service    │  2. Saves aggregate
│ (Onboarding) │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   EventBus   │  3. Publishes to all handlers
└──────┬───────┘
       │
       ├────────────────────────┬──────────────────────┐
       ↓                        ↓                      ↓
┌──────────────┐         ┌──────────────┐      ┌──────────────┐
│ Handler 1    │         │ Handler 2    │      │ Handler 3    │
│ Create Feed  │         │ Send Email   │      │ Analytics    │
└──────────────┘         └──────────────┘      └──────────────┘
```

### Benefits

1. **Loose Coupling**: Aggregates don't know about side effects
2. **Extensibility**: Add handlers without modifying aggregates
3. **Auditability**: Event log tracks all domain changes
4. **Testing**: Mock EventBus, test handlers independently

---

## Application Services

### Purpose

Application services **orchestrate** domain logic:
- Fetch aggregates from repositories
- Call domain methods (business logic)
- Save aggregates back to repositories
- Coordinate across multiple aggregates

**Services DO NOT contain business logic** - that lives in aggregates.

### Pattern

```typescript
export class ProfileOnboardingService extends BaseApplicationService {
  async completeOnboarding(data: OnboardingData): Promise<Result<OnboardingResult>> {
    return this.execute(async () => {
      // 1. FETCH from repository
      const profile = await this.profileRepo.findById(userId);

      // 2. CALL domain logic (NOT in service!)
      const nextSteps = profile.getOnboardingNextSteps(spaces);
      const warnings = profile.getOnboardingWarnings();

      // 3. SAVE back to repository (with event dispatch)
      await this.saveAndDispatchEvents(profile, (p) => this.profileRepo.save(p));

      // 4. RETURN result
      return Result.ok({ profile, nextSteps, warnings });
    }, 'ProfileOnboarding.completeOnboarding');
  }
}
```

### ✅ Good Service (Thin Orchestration)

```typescript
async joinSpace(userId: string, spaceId: string): Promise<Result<void>> {
  return this.execute(async () => {
    const profile = await this.profileRepo.find(userId);
    const space = await this.spaceRepo.find(spaceId);

    // Domain logic in aggregate
    const joinResult = space.addMember(profile.id);
    if (joinResult.isFailure) return joinResult;

    await this.saveAndDispatchEvents(space, (s) => this.spaceRepo.save(s));

    return Result.ok<void>();
  }, 'SpaceService.joinSpace');
}
```

### ❌ Bad Service (Business Logic Leak)

```typescript
async joinSpace(userId: string, spaceId: string): Promise<Result<void>> {
  const space = await this.spaceRepo.find(spaceId);

  // BAD: Business logic in service!
  if (space.settings.requireApproval && !isAdmin) {
    return Result.fail('Requires approval');
  }

  if (space.settings.maxMembers && space.members.length >= space.settings.maxMembers) {
    return Result.fail('Space is full');
  }

  // This should be: space.addMember(userId) in aggregate
}
```

---

## Repository Pattern

### Interface (Domain Layer)

```typescript
// packages/core/src/infrastructure/repositories/interfaces.ts
export interface IProfileRepository {
  findById(id: string): Promise<Result<Profile>>;
  save(profile: Profile): Promise<Result<void>>;
  findByEmail(email: string): Promise<Result<Profile>>;
  findByHandle(handle: string): Promise<Result<Profile>>;
}
```

### Implementation (Infrastructure Layer)

```typescript
// packages/core/src/infrastructure/repositories/firebase/profile.repository.ts
export class FirebaseProfileRepository implements IProfileRepository {
  async findById(id: string): Promise<Result<Profile>> {
    const doc = await getDoc(doc(db, 'users', id));
    if (!doc.exists()) {
      return Result.fail<Profile>('Profile not found');
    }

    // Map Firestore data to domain aggregate
    const profile = this.toDomain(doc.data());
    return Result.ok<Profile>(profile);
  }

  async save(profile: Profile): Promise<Result<void>> {
    const data = this.toFirestore(profile);
    await setDoc(doc(db, 'users', profile.id), data);
    return Result.ok<void>();
  }

  private toDomain(data: any): Profile {
    // Convert Firestore document to Profile aggregate
  }

  private toFirestore(profile: Profile): any {
    // Convert Profile aggregate to Firestore document
  }
}
```

### Factory Pattern

```typescript
// packages/core/src/infrastructure/repositories/factory.ts
let profileRepoInstance: IProfileRepository | null = null;

export function getProfileRepository(): IProfileRepository {
  if (!profileRepoInstance) {
    profileRepoInstance = new FirebaseProfileRepository();
  }
  return profileRepoInstance;
}
```

---

## Best Practices

### 1. Rich Domain Models

✅ **DO**: Put business logic in aggregates
```typescript
export class Space extends AggregateRoot<SpaceProps> {
  public addMember(profileId: ProfileId): Result<void> {
    // Business rule enforcement
    if (this.settings.maxMembers && this.memberCount >= this.settings.maxMembers) {
      return Result.fail<void>('Space has reached maximum capacity');
    }

    // State change
    this.props.members.push({ profileId, role: 'member', joinedAt: new Date() });

    // Event
    this.addDomainEvent(new MemberJoinedEvent(this.id, profileId.value));

    return Result.ok<void>();
  }
}
```

❌ **DON'T**: Put business logic in services
```typescript
// BAD - Logic in service instead of aggregate
async addMember(spaceId: string, userId: string): Promise<Result<void>> {
  const space = await this.spaceRepo.find(spaceId);

  if (space.settings.maxMembers && space.members.length >= space.settings.maxMembers) {
    return Result.fail('Space is full'); // Should be in aggregate!
  }

  space.members.push({ userId, role: 'member' }); // Bypasses aggregate logic!
  await this.spaceRepo.save(space);
}
```

### 2. Immutable Value Objects

✅ **DO**: Create new value objects
```typescript
export class UBEmail extends ValueObject<UBEmailProps> {
  // No setters - immutable

  public static create(email: string): Result<UBEmail> {
    // Validate on creation
    if (!email.endsWith('@buffalo.edu')) {
      return Result.fail<UBEmail>('Invalid email domain');
    }
    return Result.ok<UBEmail>(new UBEmail({ value: email.toLowerCase() }));
  }
}

// Usage - create new, don't modify
const newEmail = UBEmail.create('new@buffalo.edu').getValue();
profile.updateEmail(newEmail); // Pass new value object
```

❌ **DON'T**: Make value objects mutable
```typescript
// BAD - Mutable value object
export class UBEmail {
  public value: string; // Public mutable field!

  setEmail(email: string) { // Setter on value object!
    this.value = email;
  }
}
```

### 3. Event Naming

✅ **DO**: Use past tense, be specific
```typescript
ProfileCreatedEvent        // ✅ Past tense, clear
MemberJoinedEvent         // ✅ Past tense, clear
MilestoneCompletedEvent   // ✅ Past tense, clear
```

❌ **DON'T**: Use present tense or commands
```typescript
CreateProfileEvent   // ❌ Present tense
JoinMemberEvent     // ❌ Confusing order
CompleteEvent       // ❌ Too vague
```

### 4. Aggregate Boundaries

✅ **DO**: Keep aggregates focused
```typescript
// Good - Space aggregate manages its own members
export class Space extends AggregateRoot<SpaceProps> {
  private members: SpaceMember[];  // Inside boundary

  addMember(profileId: ProfileId): Result<void> {
    // Can directly modify members
  }
}
```

❌ **DON'T**: Reach across aggregate boundaries
```typescript
// BAD - Space trying to modify Profile
export class Space extends AggregateRoot<SpaceProps> {
  addMember(profile: Profile): Result<void> {
    profile.addSpace(this.id); // ❌ Cross-boundary modification!
    this.members.push(profile.id); // Should only reference by ID
  }
}
```

### 5. Result Pattern for Errors

✅ **DO**: Use Result<T> for domain operations
```typescript
export class Profile extends AggregateRoot<ProfileProps> {
  public updateHandle(handle: ProfileHandle): Result<void> {
    if (this.props.isHandleLocked) {
      return Result.fail<void>('Handle is locked and cannot be changed');
    }

    this.props.handle = handle;
    return Result.ok<void>();
  }
}

// Usage
const result = profile.updateHandle(newHandle);
if (result.isFailure) {
  console.error(result.error); // Explicit error handling
}
```

❌ **DON'T**: Throw exceptions in domain logic
```typescript
// BAD - Throws exception instead of Result
public updateHandle(handle: ProfileHandle): void {
  if (this.props.isHandleLocked) {
    throw new Error('Handle is locked'); // ❌ Forces try/catch everywhere
  }
  this.props.handle = handle;
}
```

### 6. Campus Isolation

✅ **DO**: Always filter by campusId
```typescript
async findSpaces(userId: string): Promise<Result<Space[]>> {
  const query = query(
    collection(db, 'spaces'),
    where('campusId', '==', 'ub-buffalo'), // ✅ Required
    where('isActive', '==', true)
  );
  return await this.executeQuery(query);
}
```

❌ **DON'T**: Forget campus isolation
```typescript
// BAD - Missing campus filter
async findSpaces(userId: string): Promise<Result<Space[]>> {
  const query = query(
    collection(db, 'spaces'),
    where('isActive', '==', true) // ❌ No campus filter!
  );
}
```

---

## Code Examples

### Complete Example: Creating a Space

```typescript
// 1. DOMAIN LAYER - Space aggregate
export class Space extends AggregateRoot<SpaceProps> {
  public static create(props: CreateSpaceProps): Result<Space> {
    // Validate invariants
    if (!props.name || props.name.length < 3) {
      return Result.fail<Space>('Space name must be at least 3 characters');
    }

    // Create aggregate
    const space = new Space({
      spaceId: props.spaceId,
      name: props.name,
      // ... other props
      members: [{ profileId: props.createdBy, role: 'admin', joinedAt: new Date() }]
    });

    // Fire domain event
    space.addDomainEvent(
      new SpaceCreatedEvent(space.id, props.name.value, props.category.value, props.createdBy.value)
    );

    return Result.ok<Space>(space);
  }
}

// 2. APPLICATION LAYER - Service
export class SpaceManagementService extends BaseApplicationService {
  async createSpace(data: CreateSpaceData): Promise<Result<Space>> {
    return this.execute(async () => {
      // Validate user has permission
      const profile = await this.profileRepo.findById(data.createdBy);
      if (profile.isFailure) {
        return Result.fail<Space>('User not found');
      }

      // Create value objects
      const spaceId = SpaceId.create(generateId()).getValue();
      const spaceName = SpaceName.create(data.name).getValue();
      const spaceDesc = SpaceDescription.create(data.description).getValue();
      const category = SpaceCategory.create(data.category).getValue();
      const campusId = CampusId.createUBBuffalo().getValue();

      // Call domain logic
      const spaceResult = Space.create({
        spaceId,
        name: spaceName,
        description: spaceDesc,
        category,
        campusId,
        createdBy: ProfileId.create(data.createdBy).getValue()
      });

      if (spaceResult.isFailure) {
        return spaceResult;
      }

      const space = spaceResult.getValue();

      // Save and dispatch events
      await this.saveAndDispatchEvents(space, (s) => this.spaceRepo.save(s));

      return Result.ok<Space>(space);
    }, 'SpaceManagement.createSpace');
  }
}

// 3. EVENT HANDLER - Cross-aggregate side effects
export const handleSpaceCreated: EventHandler<SpaceCreatedEvent> = async (event) => {
  console.log(`Space created: ${event.spaceName}`);

  // Side effects (outside main transaction)
  // - Track analytics
  // - Send notifications
  // - Update recommendation pool
};

// 4. USAGE - From API route
const service = new SpaceManagementService({ userId: req.userId });
const result = await service.createSpace({
  name: 'Computer Science Study Group',
  description: 'Study together for CSE courses',
  category: 'academic',
  createdBy: req.userId
});

if (result.isFailure) {
  return respond.badRequest(result.error);
}

return respond.created(result.getValue().toData());
```

---

## Testing Strategies

### 1. Unit Test Domain Logic

```typescript
describe('Space Aggregate', () => {
  it('should not allow removing last admin', () => {
    // Arrange
    const space = createTestSpace({ adminCount: 1 });
    const lastAdmin = space.members.find(m => m.role === 'admin');

    // Act
    const result = space.removeMember(lastAdmin.profileId);

    // Assert
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Cannot remove the last admin');
  });

  it('should add member when space has capacity', () => {
    // Arrange
    const space = createTestSpace({ maxMembers: 100, memberCount: 50 });
    const newMember = ProfileId.create('user_123').getValue();

    // Act
    const result = space.addMember(newMember);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(space.memberCount).toBe(51);
    expect(space.domainEvents).toHaveLength(1);
    expect(space.domainEvents[0]).toBeInstanceOf(MemberJoinedEvent);
  });
});
```

### 2. Integration Test Services

```typescript
describe('ProfileOnboardingService', () => {
  let service: ProfileOnboardingService;
  let mockProfileRepo: jest.Mocked<IProfileRepository>;

  beforeEach(() => {
    mockProfileRepo = {
      save: jest.fn().mockResolvedValue(Result.ok()),
      findById: jest.fn()
    };
    service = new ProfileOnboardingService({ profileRepo: mockProfileRepo });
  });

  it('should create profile and dispatch events', async () => {
    // Arrange
    const data = {
      email: 'test@buffalo.edu',
      handle: 'testuser',
      firstName: 'Test',
      lastName: 'User'
    };

    // Act
    const result = await service.completeOnboarding(data);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(mockProfileRepo.save).toHaveBeenCalledTimes(1);

    const savedProfile = mockProfileRepo.save.mock.calls[0][0];
    expect(savedProfile.domainEvents).toContainEqual(
      expect.objectContaining({ constructor: { name: 'ProfileCreatedEvent' } })
    );
  });
});
```

### 3. Test Event Handlers

```typescript
describe('Profile Event Handlers', () => {
  it('should create feed when profile is created', async () => {
    // Arrange
    const event = new ProfileCreatedEvent('profile_123', 'test@buffalo.edu', 'testuser');
    const mockFeedRepo = jest.fn();

    // Act
    await handleProfileCreated(event);

    // Assert
    expect(mockFeedRepo.saveFeed).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'profile_123' })
    );
  });
});
```

---

## Common Pitfalls

### 1. ❌ Anemic Domain Model

**Problem**: Aggregates with only getters/setters, logic in services

```typescript
// BAD - Anemic aggregate
export class Space {
  public name: string;
  public members: Member[];

  setName(name: string) { this.name = name; }
  addMember(member: Member) { this.members.push(member); }
}

// Service has all the logic
async addMember(spaceId: string, userId: string) {
  const space = await this.repo.find(spaceId);

  // All validation in service (should be in aggregate!)
  if (space.members.length >= space.maxMembers) {
    throw new Error('Space is full');
  }

  space.addMember({ userId, role: 'member' });
  await this.repo.save(space);
}
```

**Solution**: Rich domain model with business logic

```typescript
// GOOD - Rich aggregate
export class Space extends AggregateRoot<SpaceProps> {
  public addMember(profileId: ProfileId): Result<void> {
    // Business rules enforced in aggregate
    if (this.memberCount >= this.props.settings.maxMembers) {
      return Result.fail<void>('Space has reached maximum capacity');
    }

    this.props.members.push({ profileId, role: 'member', joinedAt: new Date() });
    this.addDomainEvent(new MemberJoinedEvent(this.id, profileId.value));

    return Result.ok<void>();
  }
}
```

### 2. ❌ Large Aggregates

**Problem**: Aggregate trying to manage too much

```typescript
// BAD - Space aggregate managing posts, comments, reactions
export class Space extends AggregateRoot<SpaceProps> {
  private posts: Post[];
  private comments: Comment[];
  private reactions: Reaction[];

  addPost(post: Post) { this.posts.push(post); }
  addComment(postId: string, comment: Comment) { /* ... */ }
  addReaction(commentId: string, reaction: Reaction) { /* ... */ }
  // Aggregate is too large!
}
```

**Solution**: Separate aggregates with clear boundaries

```typescript
// GOOD - Separate aggregates
export class Space extends AggregateRoot<SpaceProps> {
  // Space manages membership only
  addMember(profileId: ProfileId): Result<void> { /* ... */ }
}

export class Post extends AggregateRoot<PostProps> {
  // Post manages its own comments/reactions
  addComment(comment: Comment): Result<void> { /* ... */ }
  addReaction(reaction: Reaction): Result<void> { /* ... */ }
}
```

### 3. ❌ Cross-Aggregate Modifications

**Problem**: One aggregate directly modifying another

```typescript
// BAD - Space modifying Profile
export class Space extends AggregateRoot<SpaceProps> {
  addMember(profile: Profile): Result<void> {
    this.members.push(profile.id);
    profile.addSpace(this.id); // ❌ Cross-boundary modification!
  }
}
```

**Solution**: Use domain events for cross-aggregate communication

```typescript
// GOOD - Events handle cross-aggregate updates
export class Space extends AggregateRoot<SpaceProps> {
  addMember(profileId: ProfileId): Result<void> {
    this.members.push({ profileId, role: 'member' });

    // Fire event - handler will update profile
    this.addDomainEvent(new MemberJoinedEvent(this.id, profileId.value));

    return Result.ok<void>();
  }
}

// Event handler coordinates cross-aggregate update
export const handleMemberJoined: EventHandler<MemberJoinedEvent> = async (event) => {
  const profile = await profileRepo.findById(event.profileId);
  profile.addSpace(event.aggregateId); // Update in separate transaction
  await profileRepo.save(profile);
};
```

### 4. ❌ Forgetting Campus Isolation

**Problem**: Queries without campus filter

```typescript
// BAD - No campus filter
const spaces = await getDocs(collection(db, 'spaces'));
```

**Solution**: Always filter by campusId

```typescript
// GOOD - Campus-isolated query
const spacesQuery = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo')
);
const spaces = await getDocs(spacesQuery);
```

### 5. ❌ Not Dispatching Events

**Problem**: Saving aggregate without dispatching events

```typescript
// BAD - Events never dispatched
const profile = Profile.create(data).getValue();
await this.profileRepo.save(profile);
// profile.domainEvents are never published!
```

**Solution**: Use saveAndDispatchEvents helper

```typescript
// GOOD - Events automatically dispatched
const profile = Profile.create(data).getValue();
await this.saveAndDispatchEvents(profile, (p) => this.profileRepo.save(p));
// Events published after successful save
```

---

## Quick Reference

### DDD Checklist

**When creating a new aggregate:**
- [ ] Extends `AggregateRoot<TProps>`
- [ ] Has clear boundary (what's inside/outside)
- [ ] Enforces business invariants
- [ ] Fires domain events for state changes
- [ ] Returns `Result<T>` for operations
- [ ] Has static `create()` factory method
- [ ] Only referenced by ID from outside

**When creating a value object:**
- [ ] Extends `ValueObject<TProps>`
- [ ] Immutable (no setters)
- [ ] Self-validating (rules in constructor)
- [ ] Equality by value (not identity)
- [ ] Has static `create()` factory method

**When writing a service:**
- [ ] Extends `BaseApplicationService`
- [ ] Contains NO business logic
- [ ] Orchestrates domain operations only
- [ ] Uses `this.execute()` for operations
- [ ] Uses `saveAndDispatchEvents()` for persistence
- [ ] Returns `Result<ServiceResult<T>>`

**When adding a domain event:**
- [ ] Extends `DomainEvent`
- [ ] Past tense naming
- [ ] Immutable data
- [ ] Has `getEventName()` method
- [ ] Registered in event handler registry

---

**DDD Architecture Status**: ✅ Complete
**Domain Events**: 22 implemented
**Aggregates**: 5 (Profile, Space, Ritual, Tool, EnhancedFeed)
**Event Handlers**: 14 registered
**Ready for**: Production deployment 🚀
