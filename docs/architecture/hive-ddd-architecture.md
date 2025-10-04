# HIVE Domain-Driven Design Architecture
## Vertical Slice Architecture for Student Autonomy

## Core Product Principle: STUDENT AUTONOMY

**HIVE's Core Loop**: Open app → See what's happening → Maybe engage → Come back later
- The campus social platform that's actually controlled by students
- Not formal, not corporate, not university-sanctioned - finally THEIR platform
- Where UB actually lives online, not where UB wants them to be

## Vertical Slice Architecture

Instead of traditional horizontal layers, HIVE is organized as vertical slices that each deliver complete user value:

1. **Profile Slice**: Student identity and connections
2. **Spaces Slice**: Community creation and participation
3. **Feed Slice**: Content discovery and browsing
4. **Rituals Slice**: Campus-wide engagement campaigns

Each slice contains its own:
- Domain models and business logic
- API routes and controllers
- UI components and pages
- Database schemas and queries
- Tests and validation

## Ubiquitous Language

### Core Student Reality Terms
- **Space**: Student-created community around dorms, interests, activities, or academic purposes
- **Feed**: Chronological stream of what's happening on campus right now
- **Post**: Student sharing something happening - photos, events, random thoughts
- **Connection**: Following someone (not "friendship" - too formal)
- **Campus**: University boundary (UB Buffalo for v1) - everyone within walking distance
- **Handle**: Student's chosen username (@coolstudent23)

### Real Campus Activities
- **Coordination**: "Who's going to Walmart?" "Selling this textbook" "Need notes from today"
- **Social Discovery**: "What's happening tonight?" "Who's at the library?" "Pregame at my place"
- **Campus Intel**: Who's with who, what happened last night, where things are happening
- **Study Groups**: Academic coordination without the formal structure
- **Party Alerts**: Social events spreading through spaces

### Student Behavior Patterns
- **Lurker**: Views but doesn't post (90% of students)
- **Poster**: Shares content regularly
- **Coordinator**: Organizes rides, events, study sessions
- **Drama Watcher**: Here for the social dynamics
- **Procrastinator**: Deep scrolling when avoiding work

## Vertical Slices

### 1. Profile Slice
**Complete User Journey**: Student creates profile → completes onboarding → connects with others → manages identity

**Domain Layer**:
```typescript
// Profile Aggregate
class Profile {
  private id: ProfileId
  private email: UBEmail        // @buffalo.edu only
  private handle: Handle        // Unique username
  private personalInfo: PersonalInfo
  private photos: Photo[]       // Max 5
  private connections: Connection[]
  private interests: Interest[]

  // Domain behavior
  updateProfile(info: PersonalInfo): Result<void>
  addPhoto(photo: Photo): Result<void>
  connectWith(otherId: ProfileId): Result<void>
  completeOnboarding(): Result<void>
}
```

**API Layer**: `/api/profile/*`
**UI Layer**: `/profile/*` pages and components
**Database**: `profiles` collection

### 2. Spaces Slice
**Complete User Journey**: Student discovers spaces → joins → posts content → creates own spaces

**Domain Layer**:
```typescript
// Space Aggregate
class Space {
  private id: SpaceId
  private name: SpaceName       // Unique per campus
  private type: SpaceType       // dorm, interest, academic, etc.
  private creator: ProfileId
  private members: Member[]
  private posts: Post[]
  private settings: SpaceSettings

  // Domain behavior
  addMember(profileId: ProfileId): Result<Member>
  createPost(content: PostContent, authorId: ProfileId): Result<Post>
  updateSettings(settings: SpaceSettings): Result<void>
  promoteToModerator(profileId: ProfileId): Result<void>
}
```

**API Layer**: `/api/spaces/*`
**UI Layer**: `/spaces/*` pages and components
**Database**: `spaces` collection with `posts` subcollection

### 3. Feed Slice
**Complete User Journey**: Student opens app → sees feed → browses content → discovers new spaces/people

**Domain Layer**:
```typescript
// Feed Aggregate
class Feed {
  private items: FeedItem[]
  private filters: FeedFilter[]
  private algorithm: FeedAlgorithm

  // Domain behavior
  generateForUser(profileId: ProfileId): Promise<FeedItem[]>
  applyFilter(filter: FeedFilter): FeedItem[]
  markAsRead(itemId: FeedItemId): void
  refreshRealTime(): Promise<FeedItem[]>
}

// Feed Algorithm
class SimpleFeedAlgorithm {
  calculate(posts: Post[], profile: Profile): FeedItem[] {
    // Simple chronological + relevance scoring
    return posts
      .filter(post => isRelevantTo(post, profile))
      .sort(byRecencyAndEngagement)
      .slice(0, 50)
  }
}
```

**API Layer**: `/api/feed/*`
**UI Layer**: `/feed` page and real-time components
**Database**: Aggregated queries across spaces

### 4. Rituals Slice
**Complete User Journey**: Student sees campus ritual → participates → tracks progress → completes milestones

**Domain Layer**:
```typescript
// Ritual Aggregate
class Ritual {
  private id: RitualId
  private title: string
  private description: string
  private milestones: Milestone[]
  private participants: Participation[]
  private campusGoal: CampusGoal
  private deadline: Date

  // Domain behavior
  addParticipant(profileId: ProfileId): Result<Participation>
  recordActivity(profileId: ProfileId, activity: Activity): Result<void>
  checkMilestoneProgress(profileId: ProfileId): Milestone[]
  calculateCampusProgress(): number
}
```

**API Layer**: `/api/rituals/*`
**UI Layer**: `/rituals/*` pages and components
**Database**: `rituals` collection with `participations` subcollection

## Domain Services

### Campus Verification Service
```typescript
interface CampusVerificationService {
  verifyStudentEmail(email: UBEmail): Promise<boolean>
  validateCampusLocation(location: string): boolean
  checkHandleAvailability(handle: Handle): Promise<boolean>
}
```

### Content Discovery Service
```typescript
interface ContentDiscoveryService {
  generateFeedForStudent(profileId: string): Promise<FeedItem[]>
  findTrendingSpaces(): Promise<Space[]>
  recommendSpaces(profile: CampusProfile): Promise<Space[]>
}
```

### Coordination Matching Service
```typescript
interface CoordinationMatchingService {
  findRideMatches(request: RideRequest): Promise<RideRequest[]>
  findStudyPartners(subject: string, location: string): Promise<CampusProfile[]>
  notifyCoordinationMatch(requestId: string, matchId: string): Promise<void>
}
```

## Strategic Domain Design

### Core Domain (70% investment)
**What makes HIVE unique**:
1. **Campus-Scoped Social Graph**: Everyone you see is someone you could meet today
2. **Real Coordination Tools**: Actual student needs, not corporate social networking
3. **Student-Controlled Spaces**: No administrators, no RAs, no official oversight

### Supporting Subdomains (20% investment)
**Necessary but not differentiating**:
1. **Content Management**: Standard post/comment functionality
2. **Real-time Updates**: Live feed updates
3. **Search and Discovery**: Finding spaces and people

### Generic Subdomains (10% investment)
**Solved problems**:
1. **Authentication**: Firebase Auth with magic links
2. **File Storage**: Firebase Storage for photos
3. **Push Notifications**: Standard notification service

## Aggregates and Consistency Boundaries

### CampusProfile Aggregate
```typescript
class CampusProfile {
  // Consistency boundary: Student identity and connections
  private readonly id: ProfileId
  private email: UBEmail
  private handle: Handle
  private studentInfo: StudentInfo
  private photos: Photo[]
  private connections: ProfileId[]

  // Business rules
  canConnectWith(targetProfile: CampusProfile): boolean
  addPhoto(photo: Photo): Result<void>
  updateHandle(newHandle: Handle): Result<void>

  // Domain behavior
  joinSpace(spaceId: SpaceId): DomainEvent
  sharePost(content: PostContent, spaceId: SpaceId): DomainEvent
}
```

### Space Aggregate
```typescript
class Space {
  // Consistency boundary: Space and its membership
  private readonly id: SpaceId
  private name: SpaceName
  private type: SpaceType
  private creator: ProfileId
  private members: SpaceMember[]
  private settings: SpaceSettings

  // Business rules
  canJoin(profile: CampusProfile): boolean
  addMember(profileId: ProfileId): Result<SpaceMember>
  createPost(authorId: ProfileId, content: PostContent): Result<Post>

  // Domain behavior
  becomesTrending(): DomainEvent
  memberCountReaches(threshold: number): DomainEvent
}
```

### CoordinationRequest Aggregate
```typescript
class CoordinationRequest {
  // Consistency boundary: Request and responses
  private readonly id: RequestId
  private type: CoordinationType
  private requester: ProfileId
  private details: RequestDetails
  private responses: Response[]
  private status: RequestStatus

  // Business rules
  canRespond(profile: CampusProfile): boolean
  addResponse(response: Response): Result<void>
  markComplete(): Result<void>

  // Domain behavior
  expireAutomatically(timeout: Duration): DomainEvent
  matchFound(matchId: ProfileId): DomainEvent
}
```

## Repository Patterns

### Campus Identity Repositories
```typescript
interface CampusProfileRepository {
  findByEmail(email: UBEmail): Promise<CampusProfile>
  findByHandle(handle: Handle): Promise<CampusProfile>
  findConnectionsOf(profileId: ProfileId): Promise<CampusProfile[]>
  save(profile: CampusProfile): Promise<void>
}
```

### Campus Social Repositories
```typescript
interface SpaceRepository {
  findByCampus(): Promise<Space[]>
  findByType(type: SpaceType): Promise<Space[]>
  findTrending(limit: number): Promise<Space[]>
  findByMember(profileId: ProfileId): Promise<Space[]>
  save(space: Space): Promise<void>
}

interface PostRepository {
  findBySpace(spaceId: SpaceId): Promise<Post[]>
  findForFeed(profileId: ProfileId): Promise<Post[]>
  findTrending(): Promise<Post[]>
  save(post: Post): Promise<void>
}
```

### Coordination Repositories
```typescript
interface CoordinationRepository {
  findActiveRequests(type: CoordinationType): Promise<CoordinationRequest[]>
  findByLocation(location: string): Promise<CoordinationRequest[]>
  findMatches(request: CoordinationRequest): Promise<CoordinationRequest[]>
  save(request: CoordinationRequest): Promise<void>
}
```

## Anti-Corruption Layers

### Firebase ACL (Protects from Firebase complexity)
```typescript
interface FirebaseCampusACL {
  // Translate Firebase User to Campus Profile
  toDomainProfile(firebaseUser: User): CampusProfile

  // Abstract Firestore operations
  saveProfile(profile: CampusProfile): Promise<void>
  querySpaces(specification: SpaceSpecification): Promise<Space[]>

  // Handle Firebase Auth events
  handleAuthEvent(event: FirebaseAuthEvent): DomainEvent
}
```

### Email Service ACL
```typescript
interface EmailServiceACL {
  sendMagicLink(email: UBEmail): Promise<Result>
  sendSpaceInvite(email: UBEmail, space: Space): Promise<Result>
  sendCoordinationNotification(email: UBEmail, request: CoordinationRequest): Promise<Result>
}
```

## Event Flow Patterns

### Student Onboarding Flow
```
EmailVerified → CampusProfileCreated → HandleSet →
PhotoAdded → InterestsSelected → DefaultSpacesJoined →
FirstFeedGenerated → StudentBeginsLurking
```

### Space Creation and Growth
```
StudentCreatesSpace → InitialMembersJoin →
FirstPostsShared → SpaceBecomesActive →
MoreStudentsDiscover → SpaceGrowsNaturally
```

### Coordination Success Flow
```
StudentNeedsRide → PostsRideRequest →
OtherStudentsRespond → RideMatched →
CoordinationCompleted → TrustBuilt
```

## Testing Strategy (TDD)

### Domain Logic Tests
```typescript
describe('CampusProfile Aggregate', () => {
  it('should require @buffalo.edu email for campus verification')
  it('should enforce unique handles across campus')
  it('should limit photos to 5 per profile')
  it('should allow unlimited connections')
})

describe('Space Aggregate', () => {
  it('should allow any student to create spaces')
  it('should enforce space name uniqueness per campus')
  it('should track membership and posting permissions')
  it('should calculate trending based on activity')
})

describe('Coordination Aggregate', () => {
  it('should match ride requests by location and time')
  it('should expire requests automatically')
  it('should notify when matches are found')
  it('should limit active requests per student')
})
```

### Behavioral Tests
```typescript
describe('Student Social Behavior', () => {
  it('should allow lurking without posting requirement')
  it('should make all campus content discoverable')
  it('should enable informal group formation')
  it('should support spontaneous event coordination')
})
```

## Implementation Principles

### Real Student Behavior First
- Design for 90% lurkers, 10% posters
- Make browsing effortless and engaging
- No forced engagement or participation
- Chronological feed (not algorithmic manipulation)

### Campus Autonomy
- Students control their spaces completely
- No administrative oversight or university control
- Minimal moderation (only for actual harm)
- Let student culture emerge naturally

### Practical Coordination
- Solve real problems: rides, textbooks, study partners
- Location-aware features for campus context
- Time-sensitive coordination with auto-expiry
- Easy sharing and discovery

### Simple and Fast
- Core loop works in under 3 seconds
- Obvious navigation and interactions
- Mobile-first responsive design
- Reliable real-time updates

## Success Metrics

### Core Usage Patterns
- Daily Active Users: Students opening HIVE daily
- Space Participation: Active spaces with regular posting
- Coordination Success: Requests that get fulfilled
- Organic Growth: New users from student invites

### Behavioral Indicators
- Students choosing HIVE over GroupMe for coordination
- Organic "check HIVE" behavior developing
- Cross-space discovery and joining
- Real-world meetups and connections forming

### Technical Health
- Load time under 3 seconds
- Real-time updates delivered under 1 second
- Zero data loss for posts and coordination
- 99.9% uptime during peak hours (evenings/weekends)

---

**Remember**: HIVE succeeds when students choose it over Instagram for campus content and over GroupMe for coordination. Every feature should make campus life easier, more fun, or more connected - without the corporate social media manipulation.