# 🎯 HIVE Platform Context - January 2025

## What HIVE Actually Is

**A campus social coordination platform that's 65% functional, not 15% as claimed.**

HIVE connects University at Buffalo students through spaces (communities) where they coordinate activities, share resources, and build campus culture. Think Discord meets Instagram meets Notion, but for college life.

---

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript, TailwindCSS
- **Backend**: Firebase (Firestore, Auth, Functions), Next.js API Routes
- **UI Library**: 400+ components in @hive/ui package
- **Infrastructure**: Vercel deployment, Turborepo monorepo
- **Real-time**: None (critical gap)

### Repository Structure
```
C:/hive/
├── apps/
│   ├── web/          # Main Next.js application (65% functional)
│   └── admin/        # Admin dashboard (70% complete)
├── packages/
│   ├── ui/           # Component library (400+ components)
│   ├── core/         # Domain models and business logic
│   ├── hooks/        # Shared React hooks
│   └── api-client/   # API client utilities
```

---

## 📊 Current Implementation Status

### What's Real (Working in Production)

#### ✅ Authentication (90%)
- Magic link email authentication
- School email verification (@buffalo.edu)
- Session management with Firebase Custom Tokens
- Complete onboarding flow
- Profile creation and persistence

#### ✅ Spaces System (75%)
- Create new spaces (full CRUD)
- Join/leave mechanics
- Post creation and retrieval
- Member management with roles
- 5-surface architecture (partially connected)

#### ✅ Profile System (85%)
- Complete dashboard with widgets
- Privacy controls (Ghost Mode)
- Activity tracking
- Search functionality
- Customization options

#### ✅ Admin Dashboard (70%)
- Platform statistics
- User analytics
- Builder request management
- Feature flag system
- System health monitoring

### What's Partially Working

#### ⚠️ Feed System (40%)
```typescript
// The algorithm exists but returns empty
aggregateContent: async () => {
  return []; // Should return aggregated posts
}
```

#### ⚠️ Tools/HiveLab (60%)
- Execution engine complete
- Tools save to Firebase
- Visual builder UI missing
- Templates defined but not connected

#### ⚠️ Rituals (40%)
- Infrastructure exists
- Using 100% mock data
- No user participation flow

### What's Completely Missing

#### ❌ Real-time Updates (0%)
- No WebSocket implementation
- No Firebase listeners
- Requires manual refresh

#### ❌ Notifications (10%)
- API exists but no triggers
- No push notifications
- No email beyond auth

#### ❌ Image Uploads (0%)
- Firebase Storage not connected
- No CDN configuration
- UI exists but non-functional

---

## 🐛 The Mock Data Problem

### The Core Issue
```typescript
// This pattern appears throughout the codebase
let posts = propsPosts || mockPosts; // Falls back to fake data
```

The platform WORKS but UI components fall back to mock data when real data is empty, creating the illusion that nothing is functional.

### Where Mock Data Lives
1. `hive-posts-surface.tsx` - 77 lines of fake posts
2. `/api/feed/route.ts` - Returns empty arrays
3. `/api/rituals/route.ts` - 100% mock rituals
4. Various dashboard components - Random statistics

### Impact
- **Perception**: Platform seems 85% fake
- **Reality**: Platform is 65% real
- **User Experience**: Confusing mix of real and fake
- **Developer Morale**: Team thinks nothing works

---

## 🔥 Firebase Integration Status

### Connected Collections ✅
```
users/              # Full profiles, preferences
spaces/             # Metadata, settings
posts/              # Content, reactions
members/            # Roles, permissions
tools/              # Definitions, state
builderRequests/    # Admin system
featureFlags/       # Platform control
```

### Not Connected ❌
```
events/             # UI only
rituals/            # Mock data
notifications/      # No triggers
comments/           # Partial implementation
messages/           # Not started
```

---

## 👥 User Journey Reality

### What Works Today
1. **Sign Up** → Magic link sent → Email verified ✅
2. **Onboarding** → Profile created → Saved to Firebase ✅
3. **Create Space** → API call → Persists in database ✅
4. **Create Post** → Saves to Firebase → Visible after refresh ✅
5. **Join Space** → Membership updated → Shows in profile ✅

### What's Broken
1. **See Live Updates** → Nothing happens without refresh ❌
2. **Upload Images** → UI exists but doesn't work ❌
3. **Get Notifications** → No triggers implemented ❌
4. **Participate in Rituals** → 100% fake data ❌
5. **Use Tools** → No visual builder ❌

---

## 🎯 Critical Path to Launch

### Week 1: Remove the Lies (20 hours)
```typescript
// Change all instances of:
data || mockData
// To:
data || []
```

### Week 2: Make it Live (30 hours)
- Add Firebase `onSnapshot` listeners
- Implement WebSocket for presence
- Connect Firebase Storage
- Fix feed aggregation

### Week 3: Complete the Gaps (25 hours)
- Finish visual builder UI
- Connect Events to Firebase
- Implement push notifications
- Add proper empty states

---

## 💰 Business Context

### Market Position
- **Competitors**: Discord, GroupMe, Instagram, Slack
- **Differentiator**: Campus-specific coordination tools
- **Target**: 30,000 UB students
- **Launch**: Fall 2025 semester

### User Needs (From Research)
1. Find parties and social events
2. Coordinate study groups
3. Share class resources
4. Connect with dormmates
5. Discover campus activities

### What We Built Instead
- "Sovereignty" and "intelligence layers"
- Complex architecture
- 400+ UI components
- Elaborate type systems

---

## 🚨 Developer Instructions

### Priority #1: Fix Perception
```bash
# Search for mock data fallbacks
grep -r "mockPosts\|mockData\|Math.random" --include="*.tsx" --include="*.ts"

# Remove them all
# Show empty states instead
```

### Priority #2: Add Real-time
```typescript
// Add Firebase listeners
import { onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const unsubscribe = onSnapshot(postsRef, (snapshot) => {
    setPosts(snapshot.docs.map(doc => doc.data()));
  });
  return unsubscribe;
}, []);
```

### Priority #3: Connect Everything
- Events → Firebase
- Feed → Real aggregation
- Rituals → Real participation
- Images → Storage bucket

---

## 📈 Success Metrics

### Current Reality
- **Real Users**: ~5 (team only)
- **Daily Posts**: ~10 (testing)
- **Active Spaces**: ~3 (pre-seeded)
- **Platform Uptime**: 99%
- **Performance Score**: 62/100

### Launch Requirements
- **Beta Users**: 100+
- **Daily Posts**: 500+
- **Active Spaces**: 20+
- **Retention Day 7**: >10%
- **Performance Score**: >85/100

### Critical Features for Launch
1. ✅ Authentication
2. ✅ Space creation
3. ✅ Post creation
4. ❌ Real-time updates
5. ❌ Image uploads
6. ❌ Push notifications
7. ✅ Profile management
8. ✅ Admin controls

**Launch Readiness: 5/8 (62%)**

---

## 🎬 The Bottom Line

**HIVE is a working platform disguised as a demo by its own mock data.**

The infrastructure is solid, the APIs work, data persists, but the lack of real-time updates and prevalence of mock data makes it feel broken.

**Fix the perception, not the platform.**

---

## 🔗 Key Files to Understand

### Core Functionality
- `/apps/web/src/app/api/spaces/[spaceId]/posts/route.ts` - How posts actually work
- `/apps/web/src/lib/firebase.ts` - Firebase configuration
- `/packages/ui/src/atomic/organisms/hive-posts-surface.tsx` - The mock data problem

### Authentication
- `/apps/web/src/app/api/auth/send-magic-link/route.ts` - Magic link implementation
- `/apps/web/src/app/api/auth/complete-onboarding/route.ts` - Profile creation

### Admin System
- `/apps/web/src/app/(dashboard)/admin/page.tsx` - Admin dashboard
- `/apps/web/src/lib/feature-flags.ts` - Feature flag system

---

*This document represents the true state of HIVE as of January 2025.*
*Use this as your primary reference for understanding the platform.*