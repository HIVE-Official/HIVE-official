# Profile System Teardown Plan

## 🔥 The Problem

We have "profile-" prefixed components that are **NOT profile-specific** - they're generic UI patterns masquerading as social features.

---

## ❌ DELETE THESE (Wrongly Named)

### 1. `profile-stats.tsx` → **RENAME to `stat-grid.tsx`**
**Why Delete Name:** Nothing "profile" about displaying stats in a grid
**What It Really Is:** Generic stats display (works for dashboards, analytics, any metrics)
**Move To:** `atomic/molecules/stat-grid.tsx`

### 2. `profile-card.tsx` → **ALREADY HAVE `user-card.tsx`!**
**Why Delete:** Duplicate of `user-card.tsx` with HIVE-specific fields
**What's Wrong:**
```tsx
// HIVE-specific fields that don't belong in atomic
major?: string          // ← School-specific
academicYear?: string   // ← School-specific
verified?: boolean      // ← Social platform feature
```
**Action:** DELETE entirely, use `user-card.tsx` instead

### 3. `profile-completion.tsx` → **RENAME to `progress-checklist.tsx`**
**Why Delete Name:** This is a generic task completion widget
**What It Really Is:** Progress tracker with action items (onboarding, todos, achievements)
**What's Wrong:**
```tsx
const isTargetReached = percentage >= 70 // HIVE target: 70% ← Hardcoded!
"Profile Completion" ← Hardcoded title!
```
**Move To:** `atomic/organisms/progress-checklist.tsx`

### 4. `profile-header.tsx` → Let me check this one...

---

## ✅ KEEP THESE (Already Generic)

- `user-card.tsx` - Perfect generic user display
- `avatar.tsx` - Pure shadcn/ui avatar
- `stat-card.tsx` - Individual stat card (exists in 11-Shared)

---

## 🔧 Refactor Strategy

### Step 1: Rename & Extract Generic Patterns

#### A. `stat-grid.tsx` (was profile-stats.tsx)
```tsx
// atomic/molecules/stat-grid.tsx
export interface StatGridProps {
  stats: Array<{
    label: string
    value: number | string
    icon?: React.ReactNode
    trend?: { value: number; isPositive: boolean }
    onClick?: () => void
  }>
  variant?: "grid" | "inline"
  columns?: 2 | 3 | 4
}

// Usage in HIVE:
<StatGrid
  stats={[
    { label: "Connections", value: profile.connectionCount, onClick: openConnections },
    { label: "Spaces", value: profile.spaceCount },
  ]}
  columns={4}
/>
```

#### B. `progress-checklist.tsx` (was profile-completion.tsx)
```tsx
// atomic/organisms/progress-checklist.tsx
export interface ProgressChecklistProps {
  title?: string              // Not hardcoded!
  description?: string
  targetPercentage?: number   // Not hardcoded!
  items: Array<{
    id: string
    label: string
    completed: boolean
    weight: number
    onAction?: () => void
  }>
}

// Usage in HIVE:
<ProgressChecklist
  title="Profile Completion"
  targetPercentage={70}
  items={profileCompletionItems}
/>
```

#### C. DELETE `profile-card.tsx` entirely
Use existing `user-card.tsx` instead:
```tsx
// HIVE-specific wrapper if needed:
// Features/02-Profile/student-card.tsx
export function StudentCard({ student }) {
  return (
    <UserCard
      name={student.name}
      handle={student.handle}
      avatar={student.avatar}
      bio={student.bio}
      badge={student.isLeader ? "Space Leader" : undefined}
    />
  )
}
```

---

## 📁 File Operations

### DELETE:
```bash
rm packages/ui/src/atomic/molecules/profile-card.tsx
rm packages/ui/src/atomic/molecules/profile-card.stories.tsx  # if exists
rm packages/ui/src/Features/02-Profile/profile-card.stories.tsx
```

### RENAME:
```bash
# profile-stats → stat-grid
mv packages/ui/src/atomic/molecules/profile-stats.tsx \
   packages/ui/src/atomic/molecules/stat-grid.tsx

# profile-completion → progress-checklist
mv packages/ui/src/atomic/molecules/profile-completion.tsx \
   packages/ui/src/atomic/organisms/progress-checklist.tsx
```

### UPDATE STORIES:
```bash
# Move to generic atomic stories
mv packages/ui/src/Features/02-Profile/profile-stats.stories.tsx \
   packages/ui/src/atomic/molecules/stat-grid.stories.tsx

mv packages/ui/src/Features/02-Profile/profile-completion.stories.tsx \
   packages/ui/src/atomic/organisms/progress-checklist.stories.tsx
```

---

## 🎯 After Teardown

### Generic Components (atomic/)
```
atomic/
├── atoms/
│   ├── avatar.tsx                    [EXISTS]
│   ├── card.tsx                      [EXISTS]
│   └── progress.tsx                  [EXISTS]
├── molecules/
│   ├── user-card.tsx                 [EXISTS]
│   ├── stat-card.tsx                 [EXISTS - in 11-Shared]
│   └── stat-grid.tsx                 [RENAMED from profile-stats]
└── organisms/
    └── progress-checklist.tsx        [RENAMED from profile-completion]
```

### HIVE Social Features (Features/02-Profile/)
```
Features/02-Profile/
├── profile-page.stories.tsx          [Composes from generic]
├── profile-header.stories.tsx        [Check if generic or social]
├── activity-timeline.stories.tsx     [Social - activity feed]
├── connection-list.stories.tsx       [Social - friend list]
└── photo-carousel.stories.tsx        [Could be generic gallery]
```

---

## 🚨 Breaking Changes

### Components to Update:
1. Any imports of `ProfileStats` → change to `StatGrid`
2. Any imports of `ProfileCompletion` → change to `ProgressChecklist`
3. Any uses of `ProfileCard` → replace with `UserCard`

### Props Changes:
**ProgressChecklist** now requires explicit props:
```tsx
// OLD (hardcoded):
<ProfileCompletion items={items} />

// NEW (configurable):
<ProgressChecklist
  title="Profile Completion"
  targetPercentage={70}
  items={items}
/>
```

---

## ✅ Validation Checklist

After teardown, verify:
- [ ] No "profile-" prefixed components in `atomic/` (except if truly profile-specific social features)
- [ ] Generic components work without HIVE context
- [ ] Generic components have no hardcoded social platform assumptions
- [ ] HIVE features compose from generic foundations
- [ ] Storybook stories are organized correctly (generic in atomic/, social in Features/)

---

**Next Action:** Start with deleting `profile-card.tsx` since we already have `user-card.tsx`
