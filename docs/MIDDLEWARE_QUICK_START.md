# Middleware Consolidation - Quick Start Guide

## TL;DR

**Problem**: 24 different middleware files, 4 different auth patterns across 149 routes
**Solution**: Consolidate to `withAuthAndErrors` from `/lib/middleware/index.ts`
**Time**: 4-6 hours
**Risk**: Medium (requires testing)

---

## Quick Commands

```bash
# 1. Preview changes (safe)
node scripts/migrate-middleware.js --dry-run

# 2. Apply automated migration
node scripts/migrate-middleware.js

# 3. Verify no errors
npm run typecheck

# 4. Run tests
npm run test

# 5. Build check
npm run build

# 6. Review changes
git diff

# 7. Commit
git add -A
git commit -m "refactor: consolidate middleware patterns"
```

---

## What Gets Changed

### Routes to Migrate: 63 routes

- **46 routes** using `getCurrentUser` (manual auth)
- **12 routes** using `withAuth` (legacy pattern)
- **5 routes** using `withSecureAuth` (alternative)

### Files to Delete: 20 files

```bash
# After migration, run:
./scripts/cleanup-middleware-files.sh
```

This removes:
- Legacy middleware (3 files)
- Alternative auth (2 files)
- Duplicate utilities (4 files)
- Unused files (11 files)

---

## Before You Start

### 1. Create backup branch
```bash
git checkout -b middleware-consolidation
git add -A && git commit -m "Backup before middleware consolidation"
```

### 2. Read the full plan
See: `/docs/MIDDLEWARE_CONSOLIDATION_PLAN.md` for detailed strategy

### 3. Schedule during low traffic
Recommended: Off-peak hours or weekend

---

## Migration Patterns

### Pattern 1: getCurrentUser → withAuthAndErrors

**Before**:
```typescript
import { getCurrentUser } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await fetchData(user.uid);
  return NextResponse.json({ data });
}
```

**After**:
```typescript
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  const data = await fetchData(userId);
  return respond.success({ data });
});
```

### Pattern 2: withAuth (legacy) → withAuthAndErrors

**Before**:
```typescript
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

export const GET = withAuth(async (request, context) => {
  const data = await fetchData();
  return ApiResponse.success({ data });
});
```

**After**:
```typescript
import { withAuthAndErrors } from '@/lib/middleware';

export const GET = withAuthAndErrors(async (request, context, respond) => {
  const data = await fetchData();
  return respond.success({ data });
});
```

### Pattern 3: withSecureAuth → withAuthAndErrors

**Before**:
```typescript
import { withSecureAuth } from '@/lib/api-auth-secure';

export const GET = withSecureAuth(
  async (request, token) => {
    const data = await fetchData(token.uid);
    return NextResponse.json({ data });
  },
  { rateLimit: { type: 'api' } }
);
```

**After**:
```typescript
import { withAuthAndErrors, getUserId } from '@/lib/middleware';

export const GET = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request);
  const data = await fetchData(userId);
  return respond.success({ data });
});
```

---

## Post-Migration Checklist

- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Manual auth testing complete
- [ ] Admin routes verified
- [ ] Public routes still accessible
- [ ] Error messages consistent
- [ ] Rate limiting works
- [ ] Deploy to staging
- [ ] Smoke test on staging
- [ ] Deploy to production
- [ ] Monitor for 48 hours

---

## Troubleshooting

### Issue: TypeScript errors after migration

```bash
# Check which files have errors
npm run typecheck 2>&1 | grep "error TS"

# Fix common issues:
# 1. Missing imports - add to middleware/index.ts
# 2. Wrong function signature - check respond parameter
# 3. Type mismatch - ensure AuthenticatedRequest is used
```

### Issue: Routes returning 401 unexpectedly

**Cause**: Middleware not applied correctly
**Fix**: Verify `withAuthAndErrors` is used and exported properly

```typescript
// ❌ Wrong
async function GET() { ... }

// ✅ Correct
export const GET = withAuthAndErrors(async (request, context, respond) => { ... });
```

### Issue: "respond is not defined"

**Cause**: Forgot to add `respond` parameter
**Fix**: Update function signature

```typescript
// ❌ Wrong
withAuthAndErrors(async (request, context) => { ... })

// ✅ Correct
withAuthAndErrors(async (request, context, respond) => { ... })
```

---

## Rollback Plan

If something goes wrong:

```bash
# Immediate rollback
git reset --hard HEAD~1

# Or revert
git revert <commit-hash>

# Push rollback
git push --force origin main
```

**When to rollback**:
- Auth failures >5%
- 401 errors on working routes
- Build failures
- Critical functionality broken

---

## Get Help

1. **Full documentation**: `/docs/MIDDLEWARE_CONSOLIDATION_PLAN.md`
2. **Ask questions** before starting
3. **Test thoroughly** before deploying
4. **Monitor closely** after deployment

---

**Status**: Ready to Execute
**Created**: 2025-09-29
**Effort**: 4-6 hours
**Risk Level**: Medium