# apps/web Priority Fix Checklist

**Total Errors:** 748
**Target:** 0 errors

---

## 🔥 High Priority (Quick Wins - ~300 errors)

### 1. Old Component Replacements
These are mechanical replacements that can be done quickly:

#### Tabs → Button-based (48 errors)
**Files:**
- components/admin/moderation-queue.tsx
- components/admin/database-performance-dashboard.tsx
- components/admin/campus-expansion-dashboard.tsx
- components/admin/cache-management-dashboard.tsx
- components/admin/alert-dashboard.tsx
- app/profile/connections/page.tsx
- app/notifications/page.tsx

**Pattern:**
```typescript
// Replace:
<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>

// With:
<div className="flex gap-2 border-b border-white/10 mb-6">
  <Button variant={tab === 'overview' ? 'default' : 'ghost'} onClick={() => setTab('overview')}>
    Overview
  </Button>
</div>
{tab === 'overview' && <div>...</div>}
```

#### Select → Native HTML (60 errors)
**Files:**
- components/admin/moderation-queue.tsx (remaining 4 instances)
- components/admin/alert-dashboard.tsx
- components/admin/database-performance-dashboard.tsx
- app/profile/settings/page.tsx

**Pattern:**
```typescript
// Replace:
<Select value={filter} onValueChange={setFilter}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
  </SelectContent>
</Select>

// With:
<select 
  value={filter} 
  onChange={(e) => setFilter(e.target.value)}
  className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
>
  <option value="all">All</option>
</select>
```

#### Dialog → Sheet (24 errors)
**Files:**
- components/admin/moderation-queue.tsx (2 instances)
- components/admin/alert-dashboard.tsx
- components/admin/database-performance-dashboard.tsx

**Pattern:**
```typescript
// Add to imports:
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@hive/ui';

// Replace:
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    Content
    <DialogFooter>Actions</DialogFooter>
  </DialogContent>
</Dialog>

// With:
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>
    <SheetHeader><SheetTitle>Title</SheetTitle></SheetHeader>
    <div className="mt-4">Content</div>
    <SheetFooter className="mt-6">Actions</SheetFooter>
  </SheetContent>
</Sheet>
```

#### Alert → Custom (20 errors)
**Files:**
- components/admin/moderation-queue.tsx
- components/error-boundaries/*

**Pattern:**
```typescript
// Replace:
<Alert variant="destructive">
  <AlertTriangle className="h-4 w-4" />
  <AlertDescription>Error message</AlertDescription>
</Alert>

// With:
<div className="flex items-center gap-3 rounded-md border border-red-500/50 bg-red-500/10 p-4">
  <AlertTriangle className="h-4 w-4 text-red-500" />
  <p className="text-sm text-red-500">Error message</p>
</div>
```

#### Progress → Custom Bar (8 errors)
```typescript
// Replace:
<Progress value={60} />

// With:
<div className="h-2 w-full rounded-full bg-white/10">
  <div className="h-full rounded-full bg-[var(--hive-brand-primary)]" style={{ width: `${60}%` }} />
</div>
```

#### Switch → Custom Toggle (6 errors)
```typescript
// Replace:
<Switch checked={enabled} onCheckedChange={setEnabled} />

// With:
<button
  onClick={() => setEnabled(!enabled)}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    enabled ? 'bg-[var(--hive-brand-primary)]' : 'bg-white/20'
  }`}
>
  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
    enabled ? 'translate-x-6' : 'translate-x-1'
  }`} />
</button>
```

---

## 🎯 Medium Priority (~200 errors)

### 2. Missing Exports from @hive/core

#### EventBus (5 errors)
**Files:**
- app/api/admin/rituals/[ritualId]/route.ts
- app/api/admin/rituals/evaluate/route.ts
- app/api/admin/rituals/route.ts
- app/api/internal/rituals/evaluate/route.ts

**Fix:** Add EventBus export to `packages/core/src/index.ts`:
```typescript
export { EventBus } from "./infrastructure/events/event-bus";
```

### 3. Type Safety Issues (88 errors)

#### userData possibly undefined (32 errors)
**Pattern:**
```typescript
// Replace:
const name = userData.name;

// With:
const name = userData?.name ?? 'Unknown';
// OR
if (!userData) return;
const name = userData.name;
```

#### Parameter type annotations (29 errors)
**Pattern:**
```typescript
// Replace:
onChange={(checked) => setEnabled(checked)}

// With:
onChange={(checked: boolean) => setEnabled(checked)}
```

#### ProfileSystem property access (12 errors)
**Fix:** Use `identity.academic` instead of `academic`:
```typescript
// Replace:
profile.academic.name

// With:
profile.identity.academic.name
```

---

## ⚙️ Lower Priority (~250 errors)

### 4. Next.js 15 Async Params (50 errors)

**Affected files:** All route handlers with `[dynamicSegment]`
- app/api/admin/rituals/[ritualId]/route.ts
- app/api/profile-v2/[userId]/route.ts
- app/spaces/[spaceId]/layout.tsx
- ... and 47 more

**Pattern:**
```typescript
// Change function signature:
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // Was: { id: string }
) {
  const { id } = await params;  // Add await
  // ... rest of code
}
```

### 5. Missing Module Imports

**Create missing files:**
- lib/structured-logger.ts
- components/profile/ProfileContextProvider.tsx (may exist, check path)
- components/error-boundary.tsx

### 6. API Type Mismatches

These require case-by-case analysis. See ERRORS.md for details.

---

## 📊 Progress Tracking

- [ ] Tabs → Buttons (48 errors)
- [ ] Select → Native (60 errors)
- [ ] Dialog → Sheet (24 errors)
- [ ] Alert → Custom (20 errors)
- [ ] Progress → Custom (8 errors)
- [ ] Switch → Toggle (6 errors)
- [ ] **Subtotal: 166 errors fixed** ⬇️ 582 remaining

- [ ] EventBus export (5 errors)
- [ ] userData null checks (32 errors)
- [ ] Type annotations (29 errors)
- [ ] ProfileSystem properties (12 errors)
- [ ] **Subtotal: 78 errors fixed** ⬇️ 504 remaining

- [ ] Async params (50 errors)
- [ ] Missing modules (20 errors)
- [ ] **Subtotal: 70 errors fixed** ⬇️ 434 remaining

- [ ] API type fixes (434 errors - requires detailed review)
- [ ] **Target: 0 errors**

---

## 🚀 Recommended Fix Order

1. **Start with moderation-queue.tsx** (47 errors) - already partially fixed
2. **Fix other admin dashboards** (alert, database-performance, campus-expansion, cache-management)
3. **Fix profile pages** (settings, edit, connections)
4. **Add EventBus export** (quick win, 5 errors)
5. **Fix async params in route handlers** (mechanical, 50 errors)
6. **Type safety cleanup** (userData checks, annotations)
7. **API route type fixes** (most complex, tackle last)

