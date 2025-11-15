# TypeScript Error Fix Documentation

**Location:** `/Users/laneyfraass/hive_ui/apps/web/`

---

## 📄 Generated Documents

### 1. **FIX.md** - Comprehensive Error Listing
- **748 errors** across **134 files**
- Organized by file (sorted by error count)
- Full error messages for each file
- Use this to see ALL errors in a specific file

**Most problematic files:**
1. components/admin/moderation-queue.tsx (47 errors)
2. app/profile/settings/page-storybook-migration.tsx (38 errors)
3. app/api/profile/route.ts (33 errors)
4. app/profile/settings/page.tsx (32 errors)
5. app/profile/edit/page-storybook-migration.tsx (28 errors)

### 2. **ERRORS.md** - Errors Categorized by Type
- **34 distinct error types**
- Grouped by error code (TS2305, TS2339, etc.)
- Pattern analysis for common issues
- Use this to understand error patterns

**Top error types:**
1. TS2339 (160 errors): Property access errors
2. TS2305 (135 errors): Missing exports from modules
3. TS2304 (131 errors): Undefined names
4. TS7006 (63 errors): Implicit 'any' types
5. TS18048 (42 errors): Possibly undefined

### 3. **FIX_PRIORITY.md** - Action Plan with Patterns
- Priority-ordered fix strategy
- Code patterns for each fix type
- Progress tracking checklist
- Estimated impact per fix category

**Quick wins (166 errors):**
- Tabs → Button-based (48 errors)
- Select → Native HTML (60 errors)
- Dialog → Sheet (24 errors)
- Alert → Custom div (20 errors)
- Progress → Custom bar (8 errors)
- Switch → Toggle (6 errors)

---

## 🎯 Current Status

**Total Errors:** 748
- ✅ apps/admin: 0 errors (CLEAN)
- ❌ apps/web: 748 errors

**Work Completed:**
- ✅ Core UI enforcement in apps/admin
- ✅ Fixed moderation-queue.tsx Select components (4/4)
- ✅ Fixed admin/hivelab/page.tsx (Tabs → Buttons, Dialog → Sheet)
- ✅ Added GridSize, BentoGridLayout exports to @hive/core

**Breakdown:**
- Old component imports: ~300 errors (mechanical fixes)
- Type safety issues: ~88 errors (add null checks, annotations)
- Next.js 15 async params: ~50 errors (await params)
- API/structure issues: ~310 errors (various type fixes)

---

## 🚀 Recommended Workflow

### Phase 1: Quick Wins (1-2 hours)
1. Replace Tabs with Button-based state (48 errors)
2. Replace Select with native HTML (60 errors)
3. Replace Dialog with Sheet (24 errors)
4. Replace Alert with custom div (20 errors)
5. Replace Progress with Tailwind bar (8 errors)
6. Replace Switch with custom toggle (6 errors)

**Result:** ⬇️ 166 errors (down to 582)

### Phase 2: Exports & Type Safety (1 hour)
1. Add EventBus export to @hive/core (5 errors)
2. Add userData null checks (32 errors)
3. Add type annotations to callbacks (29 errors)
4. Fix ProfileSystem property access (12 errors)

**Result:** ⬇️ 78 errors (down to 504)

### Phase 3: Next.js 15 Migration (1 hour)
1. Update all route handlers to await params (50 errors)

**Result:** ⬇️ 50 errors (down to 454)

### Phase 4: API Type Fixes (2-3 hours)
1. Fix type mismatches case-by-case (454 errors)

**Result:** ⬇️ 454 errors (down to 0)

---

## 📋 Key Patterns to Follow

### Old Component → Core UI

```typescript
// ❌ OLD (Not exported from @hive/ui)
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import { Dialog, DialogContent, DialogHeader } from '@hive/ui';
import { Select, SelectTrigger, SelectValue } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import { Progress } from '@hive/ui';
import { Switch } from '@hive/ui';

// ✅ NEW (Core UI)
import { Button, Sheet, SheetContent, SheetHeader } from '@hive/ui';

// Tabs → Buttons
const [tab, setTab] = useState('overview');
<Button variant={tab === 'overview' ? 'default' : 'ghost'} onClick={() => setTab('overview')}>
  Overview
</Button>
{tab === 'overview' && <div>Content</div>}

// Dialog → Sheet
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>...</SheetContent>
</Sheet>

// Select → Native
<select value={filter} onChange={(e) => setFilter(e.target.value)}>
  <option value="all">All</option>
</select>
```

### Type Safety

```typescript
// ❌ OLD (Possibly undefined)
const name = userData.name;

// ✅ NEW (Null-safe)
const name = userData?.name ?? 'Unknown';
if (!userData) return null;

// ❌ OLD (Implicit any)
onChange={(value) => setValue(value)}

// ✅ NEW (Explicit type)
onChange={(value: string) => setValue(value)}

// ❌ OLD (Wrong property path)
profile.academic.name

// ✅ NEW (Correct path)
profile.identity.academic.name
```

### Next.js 15 Async Params

```typescript
// ❌ OLD (Next.js 14)
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
}

// ✅ NEW (Next.js 15)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
}
```

---

## 📊 Files by Priority

**High Priority (Production Critical):**
- app/profile/settings/page.tsx
- app/profile/edit/page.tsx
- app/profile/connections/page.tsx
- app/api/profile/route.ts
- hooks/use-realtime-feed-v2.ts

**Medium Priority (Admin Features):**
- components/admin/moderation-queue.tsx
- components/admin/alert-dashboard.tsx
- components/admin/database-performance-dashboard.tsx
- components/admin/campus-expansion-dashboard.tsx
- components/admin/cache-management-dashboard.tsx

**Low Priority (Migration/Experimental):**
- app/profile/settings/page-storybook-migration.tsx
- app/profile/edit/page-storybook-migration.tsx

---

## ✅ Success Criteria

- [ ] All 748 errors resolved
- [ ] apps/web passes `pnpm typecheck`
- [ ] Only Core UI components used (@hive/ui exports)
- [ ] No old components (Tabs, Dialog, Select, etc.)
- [ ] Type-safe (no implicit any, proper null checks)
- [ ] Next.js 15 compliant (async params)

---

**Last Updated:** 2025-11-15 13:27:18
**Error Count:** 748 → Target: 0
