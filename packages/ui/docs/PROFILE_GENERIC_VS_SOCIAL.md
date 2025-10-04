# Profile: Generic vs Social Platform Analysis

## Executive Summary

The current ProfilePage mixes **generic UI patterns** (reusable across any app) with **social platform features** (HIVE-specific). This document identifies what should be atomic/generic vs what should stay platform-specific.

---

## ✅ GENERIC PATTERNS (Should be Atomic/Shadcn)

### Already Exists & Good:
- ✅ `Avatar` - Pure shadcn/ui (Radix Avatar primitive)
- ✅ `UserCard` - Generic user display molecule
- ✅ `Card` - shadcn/ui card atom
- ✅ `Carousel` - shadcn/ui carousel
- ✅ `Dialog/Drawer` - Modal patterns
- ✅ `Form components` - Input, Textarea, Label

### Missing Generic Patterns (Should Create):

#### 1. **StatCard** (Atom/Molecule)
**Current:** Embedded in ProfilePage
**Should Be:** `atomic/molecules/stat-card.tsx`
```tsx
interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  onClick?: () => void
}
```
**Why Generic:** Any app needs to show metrics (analytics, dashboards, etc.)

#### 2. **InfoCard** (Molecule)
**Current:** Identity card is embedded
**Should Be:** `atomic/molecules/info-card.tsx`
```tsx
interface InfoCardProps {
  title: string
  subtitle?: string
  description?: string
  badges?: Array<{ label: string; variant: string }>
  action?: { label: string; onClick: () => void }
  avatar?: string
}
```
**Why Generic:** Generic pattern for displaying entity info (user, product, company, etc.)

#### 3. **ImageGallery** (Organism)
**Current:** Photo carousel is embedded
**Should Be:** `atomic/organisms/image-gallery.tsx`
```tsx
interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>
  aspectRatio?: 'square' | 'portrait' | 'landscape' | string
  showIndicators?: boolean
  showCounter?: boolean
  loop?: boolean
}
```
**Why Generic:** Image galleries are universal (products, properties, portfolios)

#### 4. **EditFormDialog** (Molecule Pattern)
**Current:** Edit dialog is embedded
**Should Be:** Pattern using existing Dialog + Form components
**Why Generic:** Every app needs edit forms in modals

---

## 🔶 HIVE-SPECIFIC SOCIAL FEATURES (Stay in Features/)

### 1. **Space Leader Badge**
**Location:** `Features/02-Profile/`
**Why Social:** Unique to HIVE's community leadership model
```tsx
<Badge variant="default">
  <Star className="h-3 w-3 mr-1" />
  Space Leader
</Badge>
```

### 2. **Social Metrics (Connections/Posts/Events)**
**Location:** `Features/02-Profile/profile-stats.tsx`
**Why Social:** Specific to social graph (not generic "analytics")
- Connections = friend/follower count
- Posts = user-generated content
- Events = social calendar

### 3. **Schedule/Events System**
**Location:** `Features/02-Profile/schedule-widget.tsx`
**Why Social:** Campus-specific scheduling with RSVP
- Event attendance tracking
- Location-based (campus buildings)
- Social RSVP system

### 4. **My Spaces Grid**
**Location:** `Features/02-Profile/spaces-widget.tsx`
**Why Social:** Community membership display
- Shows joined communities
- Leader badge for owned spaces
- Member count (social proof)

### 5. **HiveLab Tool Builder**
**Location:** `Features/05-HiveLab/` (already separate!)
**Why Social:** Platform-specific no-code tools
- Only for Space Leaders
- Creates community tools (polls, surveys)
- Platform-locked feature

### 6. **Privacy States (Visible/Private/Ghost)**
**Location:** `Features/02-Profile/privacy-controls.tsx`
**Why Social:** Social platform privacy model
```tsx
type PrivacyLevel = 'visible' | 'private' | 'ghost'
```

### 7. **Connection Request Flow**
**Location:** `Features/02-Profile/connection-actions.tsx`
**Why Social:** Friend/follow system
- Send connection request
- Accept/decline
- Mutual connections display

---

## 📋 Recommended Refactor Plan

### Phase 1: Extract Generic Patterns (Priority: High)
1. Create `StatCard` molecule
2. Create `InfoCard` molecule
3. Create `ImageGallery` organism
4. Document Edit Form Dialog pattern

### Phase 2: Organize Social Features (Priority: Medium)
1. Keep social-specific components in `Features/02-Profile/`
2. Use generic base components + social logic
3. Example:
```tsx
// Features/02-Profile/profile-stats.tsx (HIVE-specific)
import { StatCard } from '@hive/ui/atomic/molecules/stat-card'

export function ProfileStats({ profile }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        label="Connections"
        value={profile.connectionCount}
        icon={<Users />}
        onClick={() => openConnectionsModal()}
      />
      {/* Other social stats */}
    </div>
  )
}
```

### Phase 3: Stories Organization (Priority: Low)
1. Generic components → `atomic/` stories
2. Social features → `Features/02-Profile/` stories
3. Keep ProfilePage story as integration example

---

## 🎯 Design Principles

### Generic Components Should:
- ✅ Work without HIVE context
- ✅ Have no social platform assumptions
- ✅ Be data-agnostic (accept any content)
- ✅ Live in `atomic/` directory
- ✅ Have no Firebase/auth dependencies

### Social Features Should:
- ✅ Use generic components as foundation
- ✅ Add platform-specific logic/data
- ✅ Live in `Features/` directory
- ✅ Can import from `@hive/core` domain models
- ✅ Handle privacy, permissions, social graph

---

## 📊 Current State vs Target

### Current (Mixed)
```
Features/02-Profile/profile-page.stories.tsx (650 lines)
  ├── Generic patterns (carousel, stats grid, forms)
  └── Social features (spaces, connections, leader badges)
```

### Target (Separated)
```
atomic/
  ├── molecules/
  │   ├── stat-card.tsx          [GENERIC]
  │   ├── info-card.tsx          [GENERIC]
  │   └── user-card.tsx          [GENERIC - exists!]
  └── organisms/
      └── image-gallery.tsx      [GENERIC]

Features/02-Profile/
  ├── profile-stats.tsx          [SOCIAL - uses StatCard]
  ├── profile-header.tsx         [SOCIAL - uses InfoCard]
  ├── photo-carousel.tsx         [SOCIAL - uses ImageGallery]
  ├── spaces-widget.tsx          [SOCIAL]
  ├── schedule-widget.tsx        [SOCIAL]
  ├── privacy-controls.tsx       [SOCIAL]
  └── profile-page.stories.tsx   [SOCIAL - composes all]
```

---

## 🚀 Implementation Checklist

- [ ] Create `StatCard` molecule (generic)
- [ ] Create `InfoCard` molecule (generic)
- [ ] Create `ImageGallery` organism (generic)
- [ ] Refactor ProfileStats to use StatCard
- [ ] Refactor ProfileHeader to use InfoCard
- [ ] Refactor PhotoCarousel to use ImageGallery
- [ ] Update ProfilePage to compose from new structure
- [ ] Document pattern library for future features
- [ ] Create Storybook examples for generic components

---

**Next Steps:** Start with StatCard extraction as it's the simplest and most reusable pattern.
