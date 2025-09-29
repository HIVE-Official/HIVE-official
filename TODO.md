# HIVE Platform - DDD + TDD Refactor TODO

## 🎯 Goal
Transform HIVE into a properly architected DDD system with comprehensive TDD coverage, maintaining ALL features while fixing architectural issues.

## 📊 Current State Analysis
- **72 TypeScript errors** blocking compilation
- **1,473 `any` types** causing type unsafety
- **1GB build size** (should be <50MB)
- **7 test files** (need 50+)
- **Duplicate repositories** in `/repositories` and `/infrastructure/repositories`
- **No DTOs/Mappers** causing domain-persistence coupling

---

## 🚀 Phase 1: Delete Problematic Code (Day 1 Morning - 4 hours)

### 1.1 Delete Duplicate Repositories ✅
```bash
rm -rf packages/core/src/repositories/
# Keep only /infrastructure/repositories/
```

### 1.2 Delete Broken Test Files
```bash
find packages/core -name "*.test.ts" -exec grep -l "error TS" {} \; | xargs rm
```

### 1.3 Delete Over-Engineered Code
- [ ] Delete `/packages/core/src/application/sagas/`
- [ ] Delete all `require()` statements (fix circular deps properly)
- [ ] Delete files with >10 `any` types for rewrite

### 1.4 Clean Build Artifacts
- [ ] Delete `apps/web/.next` folder (1GB!)
- [ ] Delete all `node_modules` and reinstall
- [ ] Delete `dist` folders
- [ ] Delete `.turbo` cache

---

## 🏗️ Phase 2: Create Proper DDD Structure (Day 1 Afternoon - 4 hours)

### 2.1 Domain Layer (Pure Business Logic)

#### Shared Base Classes
Create `/packages/core/src/domain/shared/base/`:
- [ ] `Entity.base.ts` - Base entity with ID
- [ ] `ValueObject.base.ts` - Immutable value objects
- [ ] `AggregateRoot.base.ts` - Aggregate with events
- [ ] `DomainEvent.base.ts` - Event base class
- [ ] `Result.ts` - Error handling without exceptions
- [ ] `Specification.base.ts` - Business rule specifications

#### Identity Context
`/packages/core/src/domain/identity/`:
- [ ] `aggregates/profile.aggregate.ts`
- [ ] `value-objects/ub-email.value.ts`
- [ ] `value-objects/handle.value.ts`
- [ ] `value-objects/personal-info.value.ts`
- [ ] `events/profile-created.event.ts`
- [ ] `events/profile-onboarded.event.ts`
- [ ] `specifications/profile-completion.spec.ts`

#### Community Context
`/packages/core/src/domain/community/`:
- [ ] `aggregates/space.aggregate.ts`
- [ ] `entities/post.entity.ts`
- [ ] `entities/comment.entity.ts`
- [ ] `value-objects/space-name.value.ts`
- [ ] `value-objects/post-content.value.ts`
- [ ] `events/space-created.event.ts`
- [ ] `events/member-joined.event.ts`

#### Engagement Context (Rituals)
`/packages/core/src/domain/engagement/`:
- [ ] `aggregates/ritual.aggregate.ts`
- [ ] `entities/participation.entity.ts`
- [ ] `value-objects/milestone.value.ts`
- [ ] `value-objects/campus-goal.value.ts`
- [ ] `events/ritual-started.event.ts`
- [ ] `events/milestone-reached.event.ts`

#### Creation Context (Tools)
`/packages/core/src/domain/creation/`:
- [ ] `aggregates/tool.aggregate.ts`
- [ ] `entities/element.entity.ts`
- [ ] `value-objects/tool-config.value.ts`
- [ ] `events/tool-published.event.ts`

#### Discovery Context (Read Models)
`/packages/core/src/domain/discovery/`:
- [ ] `read-models/feed.read-model.ts`
- [ ] `read-models/trending.read-model.ts`
- [ ] `value-objects/feed-filter.value.ts`
- [ ] `value-objects/relevance-score.value.ts`

### 2.2 Application Layer (Use Cases)

#### Shared Application Base
`/packages/core/src/application/shared/`:
- [ ] `Command.base.ts`
- [ ] `Query.base.ts`
- [ ] `UseCase.base.ts`
- [ ] `Mapper.base.ts`
- [ ] `EventHandler.base.ts`

#### Identity Use Cases
`/packages/core/src/application/identity/`:
- [ ] `use-cases/register-student.use-case.ts`
- [ ] `use-cases/complete-onboarding.use-case.ts`
- [ ] `use-cases/update-profile.use-case.ts`
- [ ] `dtos/profile.dto.ts`
- [ ] `mappers/profile.mapper.ts`

#### Community Use Cases
`/packages/core/src/application/community/`:
- [ ] `use-cases/create-space.use-case.ts`
- [ ] `use-cases/join-space.use-case.ts`
- [ ] `use-cases/create-post.use-case.ts`
- [ ] `dtos/space.dto.ts`
- [ ] `dtos/post.dto.ts`
- [ ] `mappers/space.mapper.ts`

### 2.3 Infrastructure Layer (External Concerns)

#### Repository Implementations
`/packages/core/src/infrastructure/repositories/`:
- [ ] `firebase/profile.repository.ts`
- [ ] `firebase/space.repository.ts`
- [ ] `firebase/ritual.repository.ts`
- [ ] `firebase/feed.repository.ts`

#### Mappers (Domain ↔ Firebase)
`/packages/core/src/infrastructure/mappers/`:
- [ ] `profile.firebase-mapper.ts`
- [ ] `space.firebase-mapper.ts`
- [ ] `ritual.firebase-mapper.ts`
- [ ] `feed.firebase-mapper.ts`

---

## 🧪 Phase 3: TDD Implementation (Day 2 - 8 hours)

### 3.1 Test Infrastructure Setup
- [ ] Configure Vitest in `packages/core/vitest.config.ts`
- [ ] Set up test utilities in `/test/utils/`
- [ ] Create test factories in `/test/factories/`
- [ ] Configure Firebase emulator for tests

### 3.2 Domain Tests (Write First!)

#### Profile Aggregate Tests
`packages/core/src/domain/identity/__tests__/profile.aggregate.test.ts`:
```typescript
describe('Profile Aggregate', () => {
  it('should only accept @buffalo.edu emails', () => {})
  it('should enforce unique handles', () => {})
  it('should track onboarding completion', () => {})
  it('should emit ProfileCreated event', () => {})
})
```
- [ ] Write tests
- [ ] Implement Profile aggregate to pass

#### Space Aggregate Tests
`packages/core/src/domain/community/__tests__/space.aggregate.test.ts`:
```typescript
describe('Space Aggregate', () => {
  it('should enforce space creation rules', () => {})
  it('should manage member joining', () => {})
  it('should limit posts per user', () => {})
  it('should emit SpaceCreated event', () => {})
})
```
- [ ] Write tests
- [ ] Implement Space aggregate to pass

#### Ritual Aggregate Tests
`packages/core/src/domain/engagement/__tests__/ritual.aggregate.test.ts`:
```typescript
describe('Ritual Aggregate', () => {
  it('should track campus-wide progress', () => {})
  it('should unlock milestones', () => {})
  it('should manage participation', () => {})
})
```
- [ ] Write tests
- [ ] Implement Ritual aggregate to pass

### 3.3 Repository Tests

#### Profile Repository Tests
- [ ] Test save with proper DTO mapping
- [ ] Test retrieve with domain reconstruction
- [ ] Test query methods
- [ ] Test error handling

### 3.4 Use Case Tests

#### Register Student Use Case Tests
- [ ] Test successful registration flow
- [ ] Test email validation
- [ ] Test duplicate prevention
- [ ] Test magic link sending

---

## 🔧 Phase 4: Fix Type Safety (Day 2 Afternoon - 4 hours)

### 4.1 Eliminate `any` Types
- [ ] Run audit: `grep -r "any" --include="*.ts" | wc -l`
- [ ] Create type definition files for each context
- [ ] Replace all 1,473 `any` with specific types
- [ ] Enable `"noImplicitAny": true` in tsconfig

### 4.2 Fix Repository Type Mismatches
- [ ] Create DTOs for all data transfer objects
- [ ] Implement mappers for each layer transition
- [ ] Ensure repositories only deal with DTOs, not domain models
- [ ] Fix all TypeScript compilation errors

### 4.3 Type Safety Checklist
- [ ] All API responses typed
- [ ] All Firebase documents typed
- [ ] All event payloads typed
- [ ] All component props typed

---

## 📦 Phase 5: Optimize Build (Day 3 Morning - 3 hours)

### 5.1 Reduce Build Size (1GB → <50MB)
- [ ] Install and run bundle analyzer
- [ ] Identify large dependencies
- [ ] Implement dynamic imports for:
  - [ ] Heavy components
  - [ ] Admin dashboard
  - [ ] Tool builder
  - [ ] Rich text editors
- [ ] Tree-shake Firebase SDK:
  ```javascript
  import { getAuth } from 'firebase/auth'; // Good
  // Not: import * as firebase from 'firebase';
  ```
- [ ] Optimize images with next/image
- [ ] Remove unused dependencies

### 5.2 Performance Optimizations
- [ ] Enable SWC minification
- [ ] Configure proper code splitting
- [ ] Set up build caching with Turborepo
- [ ] Optimize Tailwind CSS output

---

## 🚀 Phase 6: Production Deployment (Day 3 Afternoon - 3 hours)

### 6.1 Environment Configuration
- [ ] Create `.env.production` with all variables
- [ ] Configure Firebase production project
- [ ] Set up SendGrid API key
- [ ] Configure Vercel environment variables

### 6.2 Pre-Launch Checklist
- [ ] ✅ All tests passing (50+ test files)
- [ ] ✅ TypeScript compiles with 0 errors
- [ ] ✅ Build size < 50MB
- [ ] ✅ Core flow works: Register → Feed → Space → Post
- [ ] ✅ Mobile responsive on all pages
- [ ] ✅ Security headers configured
- [ ] ✅ Rate limiting enabled
- [ ] ✅ Error monitoring set up

### 6.3 Deployment Steps
1. [ ] Push to main branch
2. [ ] Verify Vercel preview
3. [ ] Run production tests
4. [ ] Update DNS to hive.college
5. [ ] Monitor for first hour

---

## 📈 Success Metrics

### Code Quality
- ✅ **0** TypeScript errors (from 72)
- ✅ **<100** `any` types (from 1,473)
- ✅ **100%** of aggregates have tests
- ✅ **80%** overall code coverage

### Performance
- ✅ **<50MB** build size (from 1GB)
- ✅ **<3 min** build time
- ✅ **<3 sec** page load time
- ✅ **<30 sec** TypeScript compilation

### Architecture
- ✅ Clear separation between layers
- ✅ All repositories use DTOs
- ✅ No circular dependencies
- ✅ No `require()` statements
- ✅ All features working

---

## 🔄 Daily Progress Tracking

### Day 1 (8 hours)
- [ ] Morning: Delete problematic code (4h)
  - [ ] Remove duplicates
  - [ ] Clean builds
  - [ ] Delete broken code
- [ ] Afternoon: Create DDD structure (4h)
  - [ ] Domain layer
  - [ ] Application layer
  - [ ] Infrastructure layer

### Day 2 (8 hours)
- [ ] Morning: TDD Implementation (4h)
  - [ ] Write tests first
  - [ ] Implement to pass
- [ ] Afternoon: Type safety (4h)
  - [ ] Remove `any` types
  - [ ] Fix all TS errors

### Day 3 (6 hours)
- [ ] Morning: Build optimization (3h)
  - [ ] Reduce to <50MB
  - [ ] Performance tuning
- [ ] Afternoon: Production deployment (3h)
  - [ ] Configure environment
  - [ ] Deploy and monitor

---

## 🎯 Definition of Done

A feature is DONE when:
1. Tests written and passing
2. TypeScript compiles without errors
3. No `any` types used
4. Proper DTOs and mapping
5. Documentation updated
6. Code reviewed
7. Deployed to production

---

## 🚨 Blockers & Risks

### Current Blockers
- Massive build size (1GB) preventing deployment
- TypeScript errors blocking compilation
- Missing DTOs causing type mismatches

### Mitigation Strategies
- Use `--transpileOnly` for emergency builds
- Prioritize critical path features
- Deploy with reduced features if needed

---

## 📝 Notes

- Keep ALL features, delete bad implementations
- Follow DDD strictly - no shortcuts
- Write tests FIRST (TDD)
- Every line of code must have purpose
- Ship daily progress to maintain momentum

---

**Last Updated**: December 2024
**Next Review**: After Day 1 completion