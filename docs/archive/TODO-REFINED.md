# HIVE Launch Roadmap - REALITY CHECK (Nov 4, 2025)

**Current Date**: November 4, 2025
**Realistic Launch**: **December 16-20, 2025** (6-7 weeks)
**Strategy**: Ship with working features, not broken builds

---

## 🚨 IMMEDIATE PRIORITIES (This Week)

### Priority 1: Fix Build (2-3 hours) ⚡️
**Status**: ❌ BLOCKING EVERYTHING
**Actual Errors**: 15 (not 68 like TODO.md claims)

**Error List**:
```
1. ElementInstance circular type (packages/core/src/domain/creation/elements.ts:13)
2-7. Profile bento grid positions (6x type mismatches)
8-9. RitualFeedBanner merged declarations
10-13. Space component prop mismatches (4 errors)
14. PercentBar value prop
15. SheetContentProps export missing
```

**Action Plan**:
- [ ] Fix ElementInstance: Make Zod schema match TypeScript interface
- [ ] Fix bento grid: Change `position: number` → `position: { x: number, y: number }`
- [ ] Fix RitualFeedBanner: Consolidate into single export
- [ ] Fix Space components: Add `onShare` prop to SpaceHeader
- [ ] Fix PercentBar: Add `value` prop to interface
- [ ] Export SheetContentProps from atoms/index.ts

**Time Estimate**: 2-3 hours
**Validation**: `NODE_OPTIONS="--max-old-space-size=4096" pnpm build`

---

### Priority 2: Campus Isolation (20-30 hours) 🔒
**Status**: ❌ CRITICAL SECURITY GAP
**Current Coverage**: 13/178 routes (7%)
**Target**: 100% coverage

**Reality**: This is NOT an 8-12 hour job. It's 20-30 hours minimum.

**Why This Takes Time**:
- 165 API routes to audit
- Each route needs query inspection
- Many routes have 5-10 queries each
- Testing cross-campus isolation adds 4-6 hours
- Firebase rules need comprehensive update (4-6 hours)

**Week 1 Plan** (20 hours):

#### Day 1-2 (8 hours): High-Traffic Routes
- [ ] `/api/feed/*` (4 routes) - Feed aggregation
- [ ] `/api/spaces/*` (35 routes) - Space discovery, posts, members
- [ ] `/api/profile/*` (12 routes) - Profile data
- [ ] `/api/rituals/*` (5 routes) - Ritual participation

#### Day 3-4 (8 hours): Secondary Routes
- [ ] `/api/tools/*` (28 routes) - HiveLab tools
- [ ] `/api/calendar/*` (10 routes) - Event calendar
- [ ] `/api/social/*` (8 routes) - Posts, interactions

#### Day 5 (4 hours): Admin + Testing
- [ ] `/api/admin/*` (25 routes) - Admin dashboard
- [ ] Cross-campus validation tests
- [ ] Firebase rules update + deploy

**Pattern to Apply**:
```typescript
// ✅ Add to EVERY Firestore query
const q = query(
  collection(db, 'collection_name'),
  where('campusId', '==', 'ub-buffalo'), // REQUIRED
  // ... other filters
);
```

**Validation**:
```bash
# Count routes with campus isolation
grep -r "campusId.*ub-buffalo" apps/web/src/app/api | wc -l
# Should show 178 (not 13)
```

---

## 📅 REALISTIC 6-WEEK TIMELINE

### **Week 1: Nov 4-8 (Fix Critical Blockers)**

**Monday (Nov 4)**: Build Fixes
- [ ] Fix 15 TypeScript errors (3h)
- [ ] Production build succeeds
- [ ] ESLint config fixes (1h)

**Tuesday-Thursday (Nov 5-7)**: Campus Isolation Sprint
- [ ] Day 1: Feed + Spaces routes (8h)
- [ ] Day 2: Profile + Rituals routes (8h)
- [ ] Day 3: Admin + Firebase rules (4h)

**Friday (Nov 8)**: Validation
- [ ] Cross-campus tests (2h)
- [ ] Production build + preview deploy (2h)
- [ ] Smoke test critical paths (2h)

**Milestone**: ✅ Build passes, campus isolation enforced, preview deployed

---

### **Week 2-3: Nov 11-22 (Rituals V2.0 - Core Engine)**

**Week 2 Focus**: Engine + Lifecycle (30h)

**Monday-Tuesday (Nov 11-12)**: Domain Foundation
- [ ] Ritual archetypes enum + types (4h)
- [ ] Ritual engine service (6h)
- [ ] Repository layer with campus isolation (4h)

**Wednesday-Friday (Nov 13-15)**: Lifecycle + State
- [ ] Phase transition state machine (6h)
- [ ] Real-time polling (30s) (3h)
- [ ] Event emission system (2h)
- [ ] Firestore schema + indexes (5h)

**Week 3 Focus**: UI Integration (30h)

**Monday-Tuesday (Nov 18-19)**: Feed Integration
- [ ] RitualBanner component (6h)
- [ ] Feed placement logic (4h)
- [ ] Dismiss/snooze (2h)

**Wednesday-Friday (Nov 20-22)**: Detail Pages
- [ ] RitualDetailPage template (8h)
- [ ] Archetype-specific renderers (6h)
- [ ] Stats/leaderboard components (4h)

**Milestone**: ✅ Rituals engine works, renders in feed

---

### **Week 4: Nov 25-29 (Admin Composer + API Routes)**

**Monday-Wednesday (Nov 25-27)**: Template Library + Wizard
- [ ] 12 ritual templates (JSON configs) (6h)
- [ ] 5-step creation wizard (8h)
- [ ] Template browser UI (4h)

**Thursday-Friday (Nov 28-29)**: API Routes
- [ ] CRUD endpoints (6h)
  - `POST /api/admin/rituals`
  - `GET /api/rituals`
  - `GET /api/rituals/[id]`
  - `PATCH /api/admin/rituals/[id]`
  - `POST /api/rituals/[id]/join`
- [ ] Archetype-specific endpoints (4h)
  - Tournament matchups
  - Feature drop unlocks
  - Leak reveals

**Milestone**: ✅ Admin can create rituals, students can join

---

### **Week 5: Dec 2-6 (Archetype UIs + Testing)**

**Monday-Wednesday (Dec 2-4)**: Archetype Components (16h)
- [ ] TOURNAMENT: Bracket + voting (4h)
- [ ] FEATURE_DROP: Countdown + unlock (3h)
- [ ] RULE_INVERSION: Suspension banner (2h)
- [ ] FOUNDING_CLASS: Badge showcase (2h)
- [ ] Remaining 5 archetypes: Generic cards (5h)

**Thursday-Friday (Dec 5-6)**: Integration Testing (8h)
- [ ] Admin flow: Create → Launch → Monitor (4h)
- [ ] Student flow: See banner → Join → Participate (3h)
- [ ] Cross-archetype testing (1h)

**Milestone**: ✅ All 9 archetypes working end-to-end

---

### **Week 6: Dec 9-13 (Polish + Pre-Launch)**

**Monday-Tuesday (Dec 9-10)**: Polish (8h)
- [ ] Loading states (2h)
- [ ] Error handling (2h)
- [ ] Animations (2h)
- [ ] Mobile responsiveness (2h)

**Wednesday (Dec 11)**: Final Build (4h)
- [ ] Production build
- [ ] Bundle optimization
- [ ] Performance validation
- [ ] Security audit

**Thursday-Friday (Dec 12-13)**: Preview Deploy (4h)
- [ ] Deploy to Vercel preview
- [ ] End-to-end smoke tests
- [ ] Cross-browser testing
- [ ] Performance benchmarks

**Milestone**: ✅ Preview environment ready for production

---

### **Week 7: Dec 16-20 (PRODUCTION LAUNCH)**

**Monday (Dec 16)**: Go/No-Go Decision
- [ ] Review launch checklist
- [ ] Validate all success criteria
- [ ] Confirm rollback plan ready

**Tuesday (Dec 17)**: Production Deploy
- [ ] Deploy to production
- [ ] Monitor deployment
- [ ] Run smoke tests
- [ ] Watch error logs (2h window)

**Wednesday-Friday (Dec 18-20)**: Monitoring + Hot Fixes
- [ ] Monitor user engagement
- [ ] Fix critical bugs (< 4h response time)
- [ ] Track ritual participation
- [ ] Gather feedback

**Milestone**: 🚀 **PRODUCTION LAUNCH COMPLETE**

---

## ✅ SUCCESS CRITERIA (Must Pass Before Launch)

### Build Quality
- [ ] TypeScript: 0 errors
- [ ] Production build: Success
- [ ] ESLint: < 200 warnings
- [ ] Bundle: < 800KB initial

### Security (NON-NEGOTIABLE)
- [ ] Campus isolation: 178/178 routes (100%)
- [ ] Firebase rules enforce campus boundaries
- [ ] Cross-campus access blocked (validated)
- [ ] No secrets in code
- [ ] Admin routes protected

### Core Features Work
- [ ] Auth: Magic link → Onboarding → Session
- [ ] Feed: Loads < 1s, scrolls 60fps
- [ ] Spaces: Join, post, browse
- [ ] Profile: View, edit, widgets load
- [ ] HiveLab: Browse, deploy tools

### Rituals V2.0 Work
- [ ] Admin creates ritual in < 30s
- [ ] All 9 archetypes render correctly
- [ ] Banner displays in feed when active
- [ ] Students can join + participate
- [ ] Phase transitions work (announced → active → ended)
- [ ] Real-time updates (30s polling)
- [ ] Leaderboards + stats display
- [ ] Emergency controls work
- [ ] Template library loads (12+ templates)

### Performance
- [ ] Feed: < 1s load (cold), < 500ms (warm)
- [ ] Interactions: < 16ms (60fps)
- [ ] Ritual pages: < 2s load
- [ ] Core Web Vitals met (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Cross-Browser
- [ ] Chrome: Full functionality
- [ ] Safari: Full functionality (50% of traffic)
- [ ] Firefox: Keyboard nav works

---

## 🎯 WHAT WE'RE ACTUALLY SHIPPING

### ✅ Launch Scope (6 Features)
1. **Auth + Onboarding** - 10-step wizard, @buffalo.edu validation
2. **Feed** - Campus discovery stream (read-only from spaces)
3. **Spaces** - Join, post, browse (pre-seeded RSS communities)
4. **Profile** - Bento grid with widgets
5. **HiveLab** - Tool builder + deploy to spaces
6. **Rituals V2.0** - 9-archetype event system ⭐

### 🔴 NOT SHIPPING (Deferred to Month 2-3)
- ❌ Admin Dashboard Phase 5 (10-tab control center)
- ❌ HiveLab Advanced (undo/redo, autosave, version history)
- ❌ Advanced keyboard shortcuts (beyond j/k/l/c/b)
- ❌ E2E test suite (Playwright comprehensive coverage)

---

## 🚨 RED FLAGS TO WATCH

### Week 1 Risks
**If campus isolation not done by Nov 8**:
- DELAY LAUNCH - This is non-negotiable
- Extend Week 1 by 3-4 days
- Revised launch: Dec 20-23

**If build still failing after Nov 4**:
- Investigate deeper type issues
- May need to rollback recent `@hive/ui` changes
- Allocate extra day for debugging

### Week 2-4 Risks
**If Rituals V2.0 taking > 60h**:
- Simplify to 5 archetypes instead of 9
- Cut LEAK, SURVIVAL, BETA_LOTTERY (least critical)
- Keep: TOURNAMENT, FEATURE_DROP, RULE_INVERSION, FOUNDING_CLASS, COUNTDOWN

**If template library not usable**:
- Ship with 3 templates minimum (CAMPUS_MADNESS, FOUNDING_CLASS, FEATURE_DROP)
- Add more templates post-launch

### Week 5-6 Risks
**If critical bugs found in testing**:
- Severity 1 (blocks core loop): Fix immediately, delay launch
- Severity 2 (degraded UX): Fix if < 4h, else defer
- Severity 3 (minor issues): Document, ship anyway

---

## 📊 PROGRESS TRACKING

### Overall Launch Progress
- **Auth/Onboarding**: 100% ✅
- **Feed**: 100% ✅
- **Spaces**: 100% ✅
- **Profile**: 100% ✅
- **HiveLab**: 100% ✅
- **Rituals V2.0**: 15% 🟡 (engine started, UI/admin not done)
- **Campus Isolation**: 7% 🔴 (13/178 routes)
- **Build Status**: 0% ❌ (failing)

**Overall**: ~60% complete (4/6 features done, 2 critical blockers remain)

### Week-by-Week Targets
| Week | Dates | Milestone | Status |
|------|-------|-----------|--------|
| 1 | Nov 4-8 | Build + Campus Isolation | 🟡 In Progress |
| 2 | Nov 11-15 | Rituals Engine | 🔲 Not Started |
| 3 | Nov 18-22 | Rituals UI | 🔲 Not Started |
| 4 | Nov 25-29 | Admin Composer | 🔲 Not Started |
| 5 | Dec 2-6 | Testing | 🔲 Not Started |
| 6 | Dec 9-13 | Polish | 🔲 Not Started |
| 7 | Dec 16-20 | **LAUNCH** 🚀 | 🔲 Not Started |

---

## 🛠 COMMANDS (Quick Reference)

```bash
# Fix build
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Typecheck
NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck

# Dev server
pnpm dev

# Deploy preview
vercel

# Check campus isolation coverage
grep -r "campusId.*ub-buffalo" apps/web/src/app/api | wc -l
```

---

## 🎯 DECISION POINTS

### This Week (Nov 4-8)
**Decision**: If campus isolation taking > 20 hours, do we:
- A) Extend Week 1 by 2-3 days (push launch to Dec 23)
- B) Ship with partial isolation + fix in Week 2 (RISKY)

**Recommendation**: Option A. Security is non-negotiable.

### Week 2 (Nov 11-15)
**Decision**: If Rituals V2.0 engine blocked by type issues, do we:
- A) Simplify type system (use `any` strategically)
- B) Refactor entire ritual domain (adds 10-15h)

**Recommendation**: Option A. Ship working code, refactor later.

### Week 4 (Nov 25-29)
**Decision**: If admin composer taking > 20 hours, do we:
- A) Launch with 3 archetypes only
- B) Delay launch 1 week to complete all 9

**Recommendation**: Option A. MVP = 3 working rituals, not 9 broken ones.

---

## 📚 KEY DOCUMENTATION

- **[CLAUDE.md](CLAUDE.md)** - Dev commands, architecture
- **[docs/ux/RITUALS_TOPOLOGY.md](docs/ux/RITUALS_TOPOLOGY.md)** - V2.0 spec
- **[BUILD_ERRORS_NOV3.md](BUILD_ERRORS_NOV3.md)** - Error analysis (outdated, now 15 errors)
- **[SECURITY-CHECKLIST.md](SECURITY-CHECKLIST.md)** - Security audit

---

## 🚀 WHAT "LAUNCH" MEANS

**Launch = Production-Ready, Not Perfect**

**Required**:
- ✅ Build passes
- ✅ Campus isolation 100%
- ✅ Core loop works (< 3s end-to-end)
- ✅ 3+ rituals functional
- ✅ Zero security holes
- ✅ Mobile functional (375px)

**NOT Required**:
- ❌ Every archetype perfect
- ❌ Admin dashboard polished
- ❌ E2E tests comprehensive
- ❌ Zero bugs (just zero CRITICAL bugs)

**Philosophy**: Ship remarkable WORKING features, not remarkable BROKEN features.

---

**Last Updated**: November 4, 2025
**Next Review**: November 8, 2025 (end of Week 1)
**Launch Target**: December 16-20, 2025 (7 weeks)

**Reality Check**: We're shipping a campus social platform that replaces Instagram for UB students. Every line of code should make campus life easier, more fun, or more connected. Build for 500 active users, not 50,000. Optimize for speed, not scale. Ship working, ship safe, ship DECEMBER. 🚀
