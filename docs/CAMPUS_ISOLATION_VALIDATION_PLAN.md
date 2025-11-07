# 🔒 Campus Isolation Validation Plan
**Status**: 85% Complete → Target: 100%
**Priority**: P0 - Launch Blocker
**Estimated Time**: 8-10 hours remaining
**Due Date**: December 6, 2025

---

## 📊 Current State (Nov 4, 2025)

### Coverage Metrics
- ✅ **468 CURRENT_CAMPUS_ID usages** across routes
- ✅ **169 campusId where clauses** in Firestore queries
- ✅ **191 total API routes** in the system
- 🟡 **~85% estimated coverage** (120 queries + 382 route usages documented)

### What's Already Protected
- ✅ **Feed**: aggregation, algorithm, search, space-filtering
- ✅ **Spaces**: browse, join, leave, my, transfer, [spaceId]
- ✅ **Profile**: my-spaces, stats, dashboard touchpoints
- ✅ **Rituals**: list, detail, join, all archetype-specific endpoints
- ✅ **Tools**: execute, deploy/state flows validated
- ✅ **Calendar**: main, free-time endpoints
- ✅ **Realtime**: presence, chat, channels, typing, websocket, tool-updates
- ✅ **Admin**: users (campus-scoped), spaces/analytics (campus-scoped)
- ✅ **Privacy**: visibility, ghost-mode routes
- ✅ **Feature Flags**: campus-aware flags

---

## 🎯 Validation Phases

### Phase 1: Static Code Analysis (2 hours)
**Goal**: Verify every API route has proper campus isolation

#### Task 1.1: Route Inventory
- [x] Count total API routes (191 routes found)
- [ ] Categorize routes by type (public, user-scoped, campus-scoped, admin)
- [ ] List routes missing campus isolation

**Commands**:
```bash
# Find all routes
find apps/web/src/app/api -name "route.ts" | wc -l

# Check campus isolation patterns
grep -r "CURRENT_CAMPUS_ID" apps/web/src/app/api --include="*.ts" | wc -l
grep -r "where.*campusId" apps/web/src/app/api --include="*.ts" | wc -l
```

#### Task 1.2: Pattern Analysis
- [ ] **Explicit campus filtering**: Routes using `where('campusId', '==', CURRENT_CAMPUS_ID)`
- [ ] **Secure helpers**: Routes using `getSecureSpacesQuery()`, `getSecureRitualsQuery()`, etc.
- [ ] **User-scoped**: Routes implicitly isolated via `userId` (notifications, activity)
- [ ] **Space-scoped**: Routes accessing data via `spaceId` (posts, members, events)
- [ ] **Admin-only**: Routes requiring admin auth (should ALSO have campus scope)
- [ ] **Public routes**: Routes intentionally public (auth, health, campus-detect)

#### Task 1.3: Generate Isolation Report
```bash
bash scripts/validate-campus-isolation.sh > campus-isolation-report.txt
```

**Expected Output**:
- List of all routes with isolation status
- Breakdown by isolation type
- Routes missing isolation (should be < 10)

---

### Phase 2: Edge Case Review (2 hours)
**Goal**: Verify edge cases and intentional exceptions

#### Edge Cases to Document

##### 2.1 Public Routes (No Campus Isolation Needed)
These routes SHOULD NOT have campus isolation:

- [ ] `/api/auth/*` - Authentication flows (pre-login)
- [ ] `/api/health` - Health check endpoint
- [ ] `/api/campus/detect` - Campus detection (determines which campus)
- [ ] `/api/waitlist/join` - Waitlist signup (pre-campus selection)

**Action**: Document these as intentional exceptions

##### 2.2 User-Scoped Routes (Implicit Isolation)
These routes are isolated via userId, not campusId:

- [ ] `/api/profile/*` - User's own profile data
- [ ] `/api/activity/*` - User's activity log
- [ ] `/api/notifications/*` - User's notifications
- [ ] `/api/privacy/*` - User's privacy settings

**Action**: Verify users can only access their own data

##### 2.3 Space-Scoped Routes (Inherit Campus from Space)
These routes inherit campus isolation from the space entity:

- [ ] `/api/spaces/[spaceId]/*` - All space-specific routes
- [ ] `/api/spaces/[spaceId]/posts/*` - Posts within a space
- [ ] `/api/spaces/[spaceId]/members/*` - Space membership
- [ ] `/api/spaces/[spaceId]/events/*` - Space events

**Action**: Verify space lookup validates campus before allowing access

##### 2.4 Realtime/Streaming Routes (Continuous Validation Needed)
These routes need token refresh validation:

- [ ] `/api/realtime/websocket` - Long-lived WebSocket connection
- [ ] `/api/realtime/presence` - Presence updates
- [ ] `/api/feed` - SSE streaming (if implemented)

**Action**: Ensure token expiration closes connection

##### 2.5 Admin Routes (Requires BOTH Admin Auth AND Campus Scope)
These routes need dual protection:

- [ ] `/api/admin/users` - Admin user management
- [ ] `/api/admin/spaces` - Admin space management
- [ ] `/api/admin/spaces/analytics` - Campus analytics
- [ ] `/api/admin/rituals` - Ritual management
- [ ] `/api/admin/moderation/*` - Content moderation

**Action**: Verify `withSecureAuth` + admin role + campus filter

---

### Phase 3: Manual Testing (3 hours)
**Goal**: Verify cross-campus access is actually blocked

#### Test Scenarios

##### 3.1 Cross-Campus Space Access
**Setup**: Create test spaces in two different campuses

**Test**:
```bash
# 1. Create space in UB
POST /api/spaces
{
  "name": "UB Test Space",
  "campusId": "ub-buffalo"
}

# 2. Attempt to access from MIT session
GET /api/spaces/{ub-space-id}
Cookie: session={mit-session-token}

# Expected: 403 Forbidden or 404 Not Found
```

##### 3.2 Cross-Campus Ritual Participation
**Setup**: Create ritual at UB campus

**Test**:
```bash
# 1. Create ritual at UB
POST /api/admin/rituals
{
  "campusId": "ub-buffalo",
  "archetype": "TOURNAMENT",
  ...
}

# 2. Attempt to join from MIT session
POST /api/rituals/{ub-ritual-id}/join
Cookie: session={mit-session-token}

# Expected: 403 Forbidden
```

##### 3.3 Cross-Campus Feed Access
**Test**:
```bash
# Access feed with UB session
GET /api/feed
Cookie: session={ub-session-token}

# Verify: All posts are from UB spaces
# Verify: campusId = "ub-buffalo" on all items
```

##### 3.4 Cross-Campus Profile Access
**Test**:
```bash
# UB user attempts to view MIT user
GET /api/profile/{mit-user-id}
Cookie: session={ub-session-token}

# Expected: Can view (profiles are cross-campus)
# BUT: Cannot see private data across campuses
```

##### 3.5 Cross-Campus Admin Actions
**Test**:
```bash
# UB admin attempts to modify MIT space
PATCH /api/admin/spaces/{mit-space-id}
Cookie: session={ub-admin-session-token}

# Expected: 403 Forbidden (admin scoped to campus)
```

#### Manual Test Checklist
- [ ] Cross-campus space access blocked
- [ ] Cross-campus ritual participation blocked
- [ ] Cross-campus feed shows only campus content
- [ ] Cross-campus tool deployment blocked
- [ ] Cross-campus calendar events hidden
- [ ] Admin actions scoped to admin's campus
- [ ] User-scoped data accessible across campuses (intentional)

---

### Phase 4: Firebase Rules Deployment (2 hours)
**Goal**: Enforce campus isolation at database level

#### Current Rules Status
- [ ] Review `firestore.rules` for campus isolation
- [ ] Verify all collections check `campusId`
- [ ] Add rules for new collections (rituals_v2, etc.)

#### Required Rules
```javascript
// Example: Spaces must be campus-isolated
match /spaces/{spaceId} {
  allow read: if request.auth != null &&
                 resource.data.campusId == request.auth.token.campusId;
  allow write: if request.auth != null &&
                  request.resource.data.campusId == request.auth.token.campusId;
}

// Example: Rituals must be campus-isolated
match /rituals_v2/{ritualId} {
  allow read: if request.auth != null &&
                 resource.data.campusId == request.auth.token.campusId;
  allow write: if request.auth != null &&
                  request.auth.token.admin == true &&
                  request.resource.data.campusId == request.auth.token.campusId;
}
```

#### Deployment Steps
1. [ ] Update `firestore.rules` with campus isolation
2. [ ] Test rules in Firebase emulator
3. [ ] Deploy rules to staging/dev environment
4. [ ] Validate with cross-campus access tests
5. [ ] Deploy rules to production

**Commands**:
```bash
# Test rules locally
firebase emulators:start --only firestore

# Run rules tests
pnpm test:rules

# Deploy to production
firebase deploy --only firestore:rules
```

---

### Phase 5: Integration Testing (1 hour)
**Goal**: Automated tests for campus isolation

#### Create Test Suite
```typescript
// scripts/test-campus-isolation.ts

describe('Campus Isolation', () => {
  it('blocks cross-campus space access', async () => {
    const ubSpace = await createSpace({ campusId: 'ub-buffalo' });
    const mitSession = await createSession({ campusId: 'mit-cambridge' });

    const response = await fetch(`/api/spaces/${ubSpace.id}`, {
      headers: { Cookie: mitSession.cookie }
    });

    expect(response.status).toBe(403);
  });

  it('blocks cross-campus ritual participation', async () => {
    const ubRitual = await createRitual({ campusId: 'ub-buffalo' });
    const mitSession = await createSession({ campusId: 'mit-cambridge' });

    const response = await fetch(`/api/rituals/${ubRitual.id}/join`, {
      method: 'POST',
      headers: { Cookie: mitSession.cookie }
    });

    expect(response.status).toBe(403);
  });

  it('allows same-campus access', async () => {
    const ubSpace = await createSpace({ campusId: 'ub-buffalo' });
    const ubSession = await createSession({ campusId: 'ub-buffalo' });

    const response = await fetch(`/api/spaces/${ubSpace.id}`, {
      headers: { Cookie: ubSession.cookie }
    });

    expect(response.status).toBe(200);
  });
});
```

#### Run Tests
```bash
# Run campus isolation tests
pnpm tsx scripts/test-campus-isolation.ts

# Expected: All tests pass
```

---

## 🚨 Critical Routes Requiring Immediate Review

### High Priority (Must Fix)
Routes that handle sensitive operations and MUST have campus isolation:

1. **Admin Moderation Routes** (`/api/admin/moderation/*`)
   - [ ] Verify admin can only moderate their campus content
   - [ ] Add `where('campusId', '==', CURRENT_CAMPUS_ID)` to all queries

2. **System Health Routes** (`/api/admin/system-health`)
   - [ ] Scope metrics to admin's campus only
   - [ ] Do NOT expose cross-campus data

3. **Firebase Metrics Routes** (`/api/admin/firebase-metrics`)
   - [ ] Ensure metrics are campus-scoped
   - [ ] Prevent leakage of other campus data

4. **Content Analytics** (`/api/admin/analytics/content`)
   - [ ] Filter by campusId in all aggregations
   - [ ] Verify no cross-campus data in results

### Medium Priority (Review Recommended)
Routes that should be reviewed for proper scoping:

1. **Feature Flags** (`/api/feature-flags`)
   - Currently: Campus-aware but returns all flags
   - Recommendation: Filter by `availableAt: [campusId]` if needed

2. **Social Interactions** (`/api/social/*`)
   - Currently: User-scoped (implicit isolation)
   - Recommendation: Verify users can only interact within campus

3. **Privacy Routes** (`/api/privacy/*`)
   - Currently: User-scoped
   - Recommendation: Verify privacy settings don't leak cross-campus

---

## 📋 Action Items (8-10 Hours Total)

### Immediate (This Week)
- [ ] **Day 1** (3h): Run validation script, document all routes
- [ ] **Day 1** (1h): Review edge cases, document exceptions
- [ ] **Day 2** (3h): Manual cross-campus testing
- [ ] **Day 2** (1h): Fix any discovered gaps
- [ ] **Day 3** (2h): Deploy Firebase rules, validate

### Success Criteria
- ✅ **100% of routes** documented with isolation status
- ✅ **< 10 intentional exceptions** (public routes, edge cases)
- ✅ **Cross-campus access blocked** in all manual tests
- ✅ **Firebase rules enforcing** campus isolation
- ✅ **Automated tests passing** for campus isolation

---

## 🛠️ Tools & Commands

### Static Analysis
```bash
# Run full validation
bash scripts/validate-campus-isolation.sh

# Count campus filters
grep -r "where.*campusId" apps/web/src/app/api --include="*.ts" | wc -l

# Find routes without isolation
grep -rL "CURRENT_CAMPUS_ID\|campusId\|userId" apps/web/src/app/api --include="route.ts"
```

### Integration Testing
```bash
# Run campus isolation tests
pnpm tsx scripts/test-campus-isolation.ts

# Run Firebase rules tests
pnpm test:rules
```

### Manual Testing (with curl)
```bash
# Setup
export BASE_URL="http://localhost:3000"
export UB_COOKIE="__session=<ub-session-cookie>"
export MIT_COOKIE="__session=<mit-session-cookie>"

# Test cross-campus space access (should fail)
curl -H "Cookie: $MIT_COOKIE" "$BASE_URL/api/spaces/{ub-space-id}"

# Test same-campus access (should succeed)
curl -H "Cookie: $UB_COOKIE" "$BASE_URL/api/spaces/{ub-space-id}"
```

---

## 📝 Documentation

### Where to Document
- **This file**: Overall validation status and plan
- **`campus-isolation-report.md`**: Generated validation report
- **`firestore.rules`**: Database-level enforcement
- **`SECURITY-CHECKLIST.md`**: Security review checklist

### What to Document
1. All routes with isolation type (explicit, implicit, public)
2. Intentional exceptions with justification
3. Test results from cross-campus access attempts
4. Firebase rules deployment status

---

## 🎯 Final Validation Checklist

Before marking campus isolation as 100% complete:

- [ ] Static analysis shows 100% coverage (or documented exceptions)
- [ ] All cross-campus manual tests blocked appropriately
- [ ] Firebase rules deployed and enforcing isolation
- [ ] Integration tests passing
- [ ] Edge cases documented and justified
- [ ] Security team review completed (if applicable)
- [ ] Deployment plan confirmed

---

**Last Updated**: November 4, 2025
**Next Review**: December 6, 2025
**Owner**: Engineering Team
**Status**: 85% → Target 100% by Dec 6
