# HIVE Complete Context Summary

*This document consolidates all HIVE context for AI assistance and developer onboarding*

## 🎯 What is HIVE?

**HIVE is a social platform that functions as the operating system for student life at UB (University at Buffalo).**

### User Breakdown
- **90% Consumers**: Regular students who browse, post, join spaces, attend events
- **10% Creators**: Student leaders who create spaces, build tools, shape culture

### Core Value Proposition
- **For Consumers**: The most fun and useful way to connect with campus life
- **For Creators**: Superpowers to build and lead campus communities
- **For Campus**: Student-driven culture that evolves organically

## 📚 Essential Documentation

### For Development
1. **CLAUDE.md** - AI role, technical patterns, implementation guide
2. **PATTERNS.md** - Code patterns, Firebase usage, mobile patterns
3. **CURRENT_STATUS.md** - What's built vs planned (single source of truth)

### For Product Understanding
4. **HIVE_PRODUCT_CONTEXT.md** - Vision, user journeys, sovereignty framework
5. **README.md** - Project overview and quick start

### For Technical Details
6. **Package READMEs** - Individual package documentation
7. **Storybook** - 400+ UI component documentation

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript (strict)
- **UI**: TailwindCSS, @hive/ui components, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage), Next.js API routes
- **Infrastructure**: Vercel hosting, Turborepo monorepo

### Six Vertical Slices
1. **ONBOARDING & AUTH** (90% complete) - Magic links work
2. **SPACES** (50% complete) - UI built, needs Firebase connection
3. **PROFILE** (75% complete) - Dashboard works, missing integrations
4. **FEED** (30% complete) - Basic display, no aggregation
5. **TOOLS & HIVELAB** (0% complete) - Not started
6. **RITUALS** (0% complete) - Not started

### Surface Architecture
Each Space contains 5 surfaces:
- **Posts** (60% width) - Discussions and coordination
- **Events** (40% width) - Scheduled activities
- **Members** (40% width) - Community directory
- **Pinned** (40% width) - Important resources
- **Tools** (40% width) - Space utilities

## 🚀 Current State (December 2024)

### What Works
✅ Authentication with magic links
✅ Space discovery and browsing
✅ Basic profile management
✅ UI component system (400+ components)
✅ Responsive design

### What Doesn't Work
❌ Posts don't save (using mock data)
❌ Can't create spaces
❌ No tools or HiveLab
❌ No notifications
❌ No real-time updates

### Critical Path to v1
1. **Week 1-2**: Connect posts to Firebase, enable space creation
2. **Week 3-4**: Build coordination features (study sessions, food runs)
3. **Week 5-8**: Implement Tools & HiveLab
4. **Week 9-12**: Add Rituals, intelligence layer

## 💻 Development Guidelines

### Core Principles
1. **Sovereignty First**: Increase student control
2. **Complete Vertical Slices**: No stubs or TODOs
3. **Mobile First**: Perfect on phones
4. **Real Data**: No mocks in production
5. **Type Safety**: TypeScript strict mode

### Code Standards
```typescript
// Every feature follows this pattern
1. Domain Model → packages/core/src/domain/{feature}.ts
2. Firebase Schema → apps/web/src/lib/firebase-collections.ts
3. API Route → apps/web/src/app/api/{feature}/route.ts
4. Surface Component → packages/ui/src/atomic/organisms/
5. Page Integration → apps/web/src/app/(dashboard)/
```

### Decision Framework
Before building anything, ask:
1. Does it work for the 90% consumers?
2. Does it empower the 10% creators?
3. Will it create network effects?
4. Can non-technical students use it?
5. Does it increase platform value?

## 🎮 User Experience Goals

### Consumer Success
- Open app → See what's happening → Join activity → Have fun
- Daily active use for social coordination
- Natural discovery of events and communities

### Creator Success  
- Identify need → Create space → Deploy tools → Build community
- Recognition as campus leader
- Tools used by hundreds of students

### Platform Success
- Viral spread of successful patterns
- Student-driven innovation
- Becomes essential campus infrastructure

## 🔴 Known Issues & Gaps

### Technical Debt
- Posts using mock data instead of Firebase
- No error boundaries in many components
- Inconsistent loading states
- Missing offline support

### Product Gaps
- No way for students to create spaces
- Tools completely missing
- No intelligence or optimization
- Limited mobile gestures

### Process Gaps
- Incomplete package documentation
- Minimal test coverage
- No performance monitoring
- Missing contributor guide

## 📈 Success Metrics

### Traditional (VC Metrics)
- DAU/MAU ratio
- Retention curves
- Time on platform
- Growth rate

### Sovereignty (Real Value)
- Creation ratio (% who create)
- Tool adoption rate
- Space health scores
- Cultural impact measurement

## 🚦 Go/No-Go for v1 Launch

**Current: NOT READY** ❌

**Minimum Requirements**:
- [ ] Posts persist to Firebase
- [ ] Students can create spaces
- [ ] Basic tools exist (polls, events)
- [ ] Notifications work
- [ ] Real-time updates function

**Target**: 8-12 weeks to v1 ready

## 🎯 The North Star Question

**"Can a non-technical student solve a coordination problem for their entire dorm in under 5 minutes?"**

When the answer is yes, HIVE succeeds.

---

## Quick Reference

### Commands
```bash
pnpm dev          # Start development
pnpm build        # Production build
pnpm storybook    # Component library
pnpm typecheck    # Type validation
pnpm lint         # Code quality
```

### Key Files
- Space Detail: `apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx`
- Firebase Schema: `apps/web/src/lib/firebase-collections.ts`
- UI Components: `packages/ui/src/atomic/organisms/`
- API Routes: `apps/web/src/app/api/`

### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
FIREBASE_SERVICE_ACCOUNT_KEY
```

---

*This is HIVE. A social platform where 90% consume value that 10% create, building the operating system for student life.*