# 🔒 Campus Isolation Validation - Quick Start Guide

**Goal**: Get from 85% → 100% campus isolation coverage
**Time**: 8-10 hours
**Due**: December 6, 2025

---

## 🚀 Start Here (30 minutes)

### Step 1: Run Static Analysis
```bash
# Quick validation check
grep -r "CURRENT_CAMPUS_ID\|campusId.*==" apps/web/src/app/api --include="*.ts" | wc -l
# Current: ~468 usages ✅

grep -r "where.*campusId" apps/web/src/app/api --include="*.ts" | wc -l
# Current: ~169 where clauses ✅
```

### Step 2: Identify Gaps
```bash
# Find routes that might be missing campus isolation
find apps/web/src/app/api -name "route.ts" -exec bash -c '
  if ! grep -q "CURRENT_CAMPUS_ID\|campusId\|userId\|spaceId" "$1" 2>/dev/null; then
    echo "⚠️  $1"
  fi
' _ {} \;
```

### Step 3: Review Results
Expected output: < 20 routes (most should be intentional: auth, health, public endpoints)

---

## 📋 Quick Validation Checklist

### High-Priority Routes (Must Verify Today)

#### ✅ Already Protected
- [x] Feed endpoints (`/api/feed/*`)
- [x] Space browsing (`/api/spaces/browse`, `/api/spaces/my`)
- [x] Rituals (`/api/rituals/*`)
- [x] Profile (`/api/profile/*` - user-scoped)
- [x] Tools (`/api/tools/*`)
- [x] Calendar (`/api/calendar/*`)
- [x] Realtime (`/api/realtime/*`)

#### 🟡 Need Verification (2 hours)
- [ ] Admin moderation (`/api/admin/moderation/*`)
- [ ] System health (`/api/admin/system-health`)
- [ ] Firebase metrics (`/api/admin/firebase-metrics`)
- [ ] Content analytics (`/api/admin/analytics/content`)

#### ✅ Intentionally Public (No Changes Needed)
- [x] Auth routes (`/api/auth/*`)
- [x] Health check (`/api/health`)
- [x] Campus detection (`/api/campus/detect`)
- [x] Waitlist (`/api/waitlist/join`)

---

## 🔍 Manual Testing (1 hour)

### Test 1: Cross-Campus Space Access
```bash
# 1. Get a space ID from your feed
# 2. Try to access it with a different campus session (if available)
# 3. Should receive 403 Forbidden

curl http://localhost:3000/api/spaces/{space-id} \
  -H "Cookie: session={other-campus-session}" \
  -v

# Expected: 403 or 404 (space not found for this campus)
```

### Test 2: Cross-Campus Ritual Access
```bash
# 1. Get a ritual ID
# 2. Try to join from different campus session
# 3. Should be blocked

curl http://localhost:3000/api/rituals/{ritual-id}/join \
  -X POST \
  -H "Cookie: session={other-campus-session}" \
  -H "Content-Type: application/json" \
  -v

# Expected: 403 Forbidden
```

### Test 3: Feed Campus Filtering
```bash
# Access your feed and verify all items are from ub-buffalo
curl http://localhost:3000/api/feed \
  -H "Cookie: session={your-session}" \
  | jq '.[] | select(.campusId != "ub-buffalo")'

# Expected: No output (all items should be ub-buffalo)
```

---

## 🛡️ Firebase Rules (2 hours)

### Check Current Rules
```bash
# View current Firestore rules
cat firestore.rules

# Look for campus isolation patterns
grep -n "campusId" firestore.rules
```

### Required Rules Pattern
Every collection should have:
```javascript
match /collection/{docId} {
  allow read: if request.auth != null &&
                 resource.data.campusId == request.auth.token.campusId;
  allow write: if request.auth != null &&
                  request.resource.data.campusId == request.auth.token.campusId;
}
```

### Test Rules Locally
```bash
# Start Firebase emulator
firebase emulators:start --only firestore

# Run rules tests
pnpm test:rules
```

### Deploy Rules
```bash
# Deploy to production
firebase deploy --only firestore:rules

# Verify deployment
firebase firestore:rules get
```

---

## ✅ Definition of Done

Campus isolation is 100% complete when:

1. **Static Analysis**
   - [x] 468+ CURRENT_CAMPUS_ID usages documented
   - [x] 169+ campusId where clauses verified
   - [ ] All non-isolated routes documented as intentional exceptions

2. **Manual Testing**
   - [ ] Cross-campus space access blocked
   - [ ] Cross-campus ritual participation blocked  
   - [ ] Cross-campus admin actions blocked
   - [ ] Feed shows only campus content

3. **Firebase Rules**
   - [ ] Rules updated with campus isolation
   - [ ] Rules tested in emulator
   - [ ] Rules deployed to production

4. **Documentation**
   - [ ] All routes categorized (explicit, implicit, public)
   - [ ] Edge cases documented with justification
   - [ ] Security review completed

5. **Integration Tests**
   - [ ] Automated tests written
   - [ ] All tests passing
   - [ ] CI/CD includes campus isolation tests

---

## 🚨 If You Find a Gap

### Fix Pattern for API Routes
```typescript
// Before (not campus-isolated)
export async function GET() {
  const spaces = await db.collection('spaces').get();
  return Response.json(spaces);
}

// After (campus-isolated)
import { CURRENT_CAMPUS_ID } from '@/lib/constants';

export async function GET() {
  const q = query(
    collection(db, 'spaces'),
    where('campusId', '==', CURRENT_CAMPUS_ID), // ✅ REQUIRED
    where('isActive', '==', true)
  );
  
  const snapshot = await getDocs(q);
  return Response.json(snapshot.docs.map(doc => doc.data()));
}
```

### Fix Pattern for User-Scoped Routes
```typescript
// User-scoped routes (implicitly campus-isolated)
import { getUserId } from '@/lib/middleware';

export const GET = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request); // ✅ User can only access their own data
  
  const profile = await db.collection('profiles').doc(userId).get();
  return respond.success(profile.data());
});
```

### Fix Pattern for Space-Scoped Routes
```typescript
// Space-scoped routes (inherit campus from space)
export const GET = withAuthAndErrors(async (request, context, respond) => {
  const spaceId = context.params.spaceId;
  
  // 1. Get space (validates existence + campus)
  const space = await getSecureSpace(spaceId); // ✅ Validates campus
  
  if (!space) {
    return respond.notFound('Space not found');
  }
  
  // 2. Now safe to query space data
  const posts = await db
    .collection('posts')
    .where('spaceId', '==', spaceId)
    .get();
    
  return respond.success(posts);
});
```

---

## 📞 Need Help?

**Full documentation**: [docs/CAMPUS_ISOLATION_VALIDATION_PLAN.md](CAMPUS_ISOLATION_VALIDATION_PLAN.md)

**Common questions**:
- Q: "Is user-scoped enough?" → A: Yes, for user-specific data (profile, notifications)
- Q: "Do public routes need campus isolation?" → A: No (auth, health, campus-detect)
- Q: "What about admin routes?" → A: Yes, BOTH admin auth AND campus scope required

**Tools**:
- Validation script: `bash scripts/validate-campus-isolation.sh`
- Test script: `pnpm tsx scripts/test-campus-isolation.ts`
- Firebase rules test: `pnpm test:rules`

---

**Last Updated**: November 4, 2025
**Status**: Ready to execute
**Next Step**: Run Step 1 above (30 minutes)
