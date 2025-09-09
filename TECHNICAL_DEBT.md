# TECHNICAL DEBT - All the Shortcuts and Mocks

*Every hack, mock, and "we'll fix it later" in one place*

## 🔴 Critical Debt (Blocking Real Usage)

### 1. Mock Posts Data
**Location**: `packages/ui/src/atomic/organisms/hive-posts-surface.tsx`
```typescript
// Lines 125-202 - Entire mockPosts array
const mockPosts: HiveSpacePost[] = [
  {
    id: '1',
    type: 'study_session',
    content: 'Anyone want to study for the midterm tomorrow?',
    // ... all hardcoded
  }
];
```
**Impact**: Nothing user posts is real
**Fix**: Connect to Firebase posts collection

### 2. Fake Analytics Data
**Location**: `apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx`
```typescript
// Lines 171-200 - analyticsData state
setAnalyticsData({
  contentData: {
    postsThisWeek: Math.floor(Math.random() * 50),
    averageEngagement: Math.floor(Math.random() * 100),
    // ... all random
  }
});
```
**Impact**: Leaders see meaningless numbers
**Fix**: Calculate real metrics from Firebase

### 3. No Real Comments
**Location**: `apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx`
```typescript
// Lines 293-309 - handleCreateComment is a stub
const handleCreateComment = async (_postId: string, content: string) => {
  // This doesn't actually save anywhere
  return { data: fakeComment };
};
```
**Impact**: Comments disappear on refresh
**Fix**: Create comments subcollection

### 4. Disabled Space Creation
**Location**: `apps/web/src/app/api/spaces/create/route.ts`
```typescript
// Entire file returns 403
return new Response('Space creation is disabled', { status: 403 });
```
**Impact**: Only pre-seeded spaces exist
**Fix**: Enable the endpoint

## 🟡 Major Debt (Poor User Experience)

### 5. No Error Boundaries in Most Components
**Missing in**:
- SpaceDetailPage
- ProfileDashboard
- FeedPage
- Most API routes

**Impact**: White screen of death on errors
**Fix**: Wrap all pages in error boundaries

### 6. Hardcoded Firebase Config
**Location**: Multiple files
```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Hardcoded in client files
  // ...
};
```
**Impact**: Can't switch environments
**Fix**: Use environment variables properly

### 7. No Loading States in API Calls
**Location**: Most components
```typescript
// Common pattern
const data = await fetch('/api/...');
// No loading, no error handling
```
**Impact**: UI freezes during requests
**Fix**: Add proper loading/error states

### 8. TypeScript `any` Everywhere
**Count**: 200+ uses of `any`
```typescript
const handleSomething = (data: any) => {
  // Lost all type safety
};
```
**Impact**: Runtime errors, no IDE help
**Fix**: Define proper types

## 🟠 Performance Debt

### 9. No Pagination
**Location**: All list views
```typescript
// Loading ALL items
const spaces = await getDocs(collection(db, 'spaces'));
```
**Impact**: Loads 360+ spaces at once
**Fix**: Implement pagination/infinite scroll

### 10. Images Not Optimized
**Location**: Everywhere images are used
```typescript
<img src={url} /> // No optimization
```
**Impact**: Huge bandwidth usage
**Fix**: Use Next.js Image component

### 11. Bundle Size Issues
**Main bundle**: 1.2MB (should be <300KB)
**Impact**: Slow initial load
**Fix**: Code splitting, tree shaking

## 🔵 Code Quality Debt

### 12. Duplicate Code
**Example**: Space card component exists in 4 places:
- `enhanced-space-card.tsx`
- `unified-space-card.tsx`  
- `space-card.tsx`
- `SpaceCard.stories.tsx`

**Impact**: Inconsistent behavior
**Fix**: Single source of truth

### 13. Dead Code
**Files that do nothing**:
- 50+ `.disabled` files
- Unused API routes
- Old component versions

**Impact**: Confusion, larger bundle
**Fix**: Delete it all

### 14. Console.logs in Production
**Count**: 400+ console statements
```typescript
console.log('WHY IS THIS NOT WORKING???');
console.error('FUCK');
console.log('data:', entireUserObject);
```
**Impact**: Exposes sensitive data
**Fix**: Remove or use proper logging

## 🟣 Testing Debt

### 15. No Tests for Critical Paths
**Untested**:
- Authentication flow
- Space creation
- Post creation
- Firebase operations

**Impact**: Break things without knowing
**Fix**: Add E2E tests for critical paths

### 16. Storybook Stories Out of Sync
**400+ stories but**:
- Many show old component versions
- Props don't match actual usage
- No stories for new components

**Impact**: Storybook useless for development
**Fix**: Update or delete stories

## ⚫ Security Debt

### 17. No Input Sanitization
**Location**: All user inputs
```typescript
// Directly using user input
const post = { content: req.body.content };
```
**Impact**: XSS vulnerabilities
**Fix**: Sanitize all inputs

### 18. Firebase Rules Too Permissive
**Location**: `firestore.rules`
```
allow read, write: if true; // YOLO
```
**Impact**: Anyone can delete everything
**Fix**: Proper security rules

### 19. Sensitive Data in Git
**Found**:
- API keys in old commits
- Test user passwords
- Firebase service account

**Impact**: Security breach waiting
**Fix**: Rotate all credentials

## 📊 Debt Summary

| Category | Count | Severity | Time to Fix |
|----------|-------|----------|-------------|
| Critical | 4 | 🔴 Blocking | 1 week |
| Major | 4 | 🟡 Bad UX | 1 week |
| Performance | 3 | 🟠 Slow | 3 days |
| Code Quality | 3 | 🔵 Messy | 3 days |
| Testing | 2 | 🟣 Risky | 1 week |
| Security | 3 | ⚫ Dangerous | 2 days |

**Total: 19 major debt items**
**Estimated fix time: 4-5 weeks**

## 🚀 Quick Wins (Fix in <1 hour each)

1. Delete all `.disabled` files
2. Remove console.logs
3. Enable space creation endpoint
4. Add basic error boundaries
5. Fix Firebase security rules

## 💀 Debt That Will Kill Us

**If we don't fix these, the platform dies:**

1. **Mock posts** - Core feature doesn't work
2. **No notifications** - No engagement loop
3. **Security rules** - Data breach waiting
4. **No error handling** - Users hit white screens
5. **No real-time** - Feels broken

## 📋 Refactoring Priority

### Phase 1: Make It Work (Week 1)
- Connect posts to Firebase
- Enable space creation
- Add basic error handling

### Phase 2: Make It Safe (Week 2)
- Fix security rules
- Sanitize inputs
- Add error boundaries

### Phase 3: Make It Fast (Week 3)
- Add pagination
- Optimize images
- Code splitting

### Phase 4: Make It Clean (Week 4)
- Remove duplicate code
- Delete dead code
- Add types

---

*This debt is why we can't ship. Fix the critical items first.*