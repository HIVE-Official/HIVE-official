# HIVE Platform Refactoring Execution Plan

## 🎯 Objective
Systematically eliminate technical debt across 1,553 TypeScript files using automated refactoring scripts.

## 📊 Current State Metrics
- **Total TypeScript Files**: 1,553
- **Test Coverage**: 1.9% (29 test files)
- **TypeScript 'any' Usage**: 727 instances
- **Console Statements**: 2,307 to remove
- **Large Files (>500 lines)**: 129 files
- **Duplicate Patterns**: 25 files with identical loading states

## 🚀 Execution Phases

### Phase 1: Quick Wins (Day 1-2)
**Goal**: Remove obvious code smells with minimal risk

```bash
# 1. Create full backup
./scripts/refactoring/master-refactor.sh --dry-run

# 2. Remove console statements (2,307 instances)
node scripts/refactoring/remove-console-statements.js --dry-run
node scripts/refactoring/remove-console-statements.js

# 3. Extract common hooks (25 duplicate patterns)
npx ts-node scripts/refactoring/extract-common-hooks.ts --dry-run
npx ts-node scripts/refactoring/extract-common-hooks.ts

# 4. Verify build still works
pnpm build
```

**Expected Impact**:
- -2,307 console statements
- -375 lines of duplicate hook code
- Build time improvement: ~10%

### Phase 2: Type Safety (Day 3-5)
**Goal**: Eliminate 'any' types and improve type coverage

```bash
# 1. Analyze and fix imports
npx ts-node scripts/refactoring/fix-imports-and-types.ts --report

# 2. Fix critical 'any' types (function parameters)
npx ts-node scripts/refactoring/fix-critical-any-types.ts

# 3. Enable strict mode gradually
npx ts-node scripts/refactoring/enable-strict-mode.ts --incremental
```

**Expected Impact**:
- -727 'any' types → <100 remaining
- Type coverage: 40% → 85%
- Runtime error reduction: ~30%

### Phase 3: Component Splitting (Day 6-10)
**Goal**: Break down 129 large files into manageable components

```bash
# 1. Split onboarding mega-component (2,320 lines)
npx ts-node scripts/refactoring/split-large-files.ts \
  --file apps/web/src/app/onboarding/page.tsx \
  --max-lines 200

# 2. Split space dashboard (1,440 lines)
npx ts-node scripts/refactoring/split-large-files.ts \
  --file apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx \
  --pattern surface

# 3. Process all files >500 lines
npx ts-node scripts/refactoring/split-large-files.ts --all --max-lines 500
```

**Expected Impact**:
- Average file size: 450 lines → 200 lines
- Component reusability: +40%
- Build time: -15%

### Phase 4: Test Generation (Day 11-15)
**Goal**: Increase test coverage from 1.9% to 40%

```bash
# 1. Generate unit tests for utilities
npx ts-node scripts/refactoring/generate-tests.ts \
  --target packages/utilities \
  --type unit

# 2. Generate integration tests for API routes
npx ts-node scripts/refactoring/generate-tests.ts \
  --target apps/web/src/app/api \
  --type integration

# 3. Generate component tests
npx ts-node scripts/refactoring/generate-tests.ts \
  --target packages/ui \
  --type component
```

**Expected Impact**:
- Test coverage: 1.9% → 40%
- Regression prevention: +70%
- Confidence in refactoring: High

### Phase 5: Performance Optimization (Day 16-20)
**Goal**: Optimize bundle size and runtime performance

```bash
# 1. Remove unused dependencies
npx depcheck --json > unused-deps.json
npx ts-node scripts/refactoring/remove-unused-deps.ts

# 2. Implement code splitting
npx ts-node scripts/refactoring/implement-code-splitting.ts

# 3. Optimize imports
npx ts-node scripts/refactoring/optimize-imports.ts
```

**Expected Impact**:
- Bundle size: -30%
- Initial load time: <2 seconds
- Route transitions: <500ms

## 📋 Daily Execution Checklist

### Day 1 - Preparation
- [ ] Create full codebase backup
- [ ] Run all scripts in dry-run mode
- [ ] Review generated reports
- [ ] Set up monitoring dashboard
- [ ] Brief team on changes

### Day 2-5 - Quick Wins & Type Safety
- [ ] Remove console statements
- [ ] Extract common hooks
- [ ] Fix import paths
- [ ] Address critical 'any' types
- [ ] Run regression tests

### Day 6-10 - Component Architecture
- [ ] Split mega-components
- [ ] Extract shared components
- [ ] Implement Surface Manager pattern
- [ ] Update component documentation
- [ ] Verify all features work

### Day 11-15 - Testing
- [ ] Generate unit tests
- [ ] Create integration tests
- [ ] Add E2E test scenarios
- [ ] Set up CI/CD pipeline
- [ ] Achieve 40% coverage

### Day 16-20 - Optimization
- [ ] Remove dead code
- [ ] Optimize bundle
- [ ] Implement lazy loading
- [ ] Performance testing
- [ ] Final audit

## 🔧 Command Reference

### Master Refactor Script
```bash
# Full refactoring with all phases
./scripts/refactoring/master-refactor.sh

# Dry run to preview changes
./scripts/refactoring/master-refactor.sh --dry-run

# Verbose output for debugging
./scripts/refactoring/master-refactor.sh --verbose

# Skip backup (not recommended)
./scripts/refactoring/master-refactor.sh --skip-backup
```

### Individual Scripts
```bash
# Console removal
node scripts/refactoring/remove-console-statements.js [--dry-run]

# Hook extraction
npx ts-node scripts/refactoring/extract-common-hooks.ts [--dry-run]

# Import and type fixes
npx ts-node scripts/refactoring/fix-imports-and-types.ts [--report] [--dry-run]

# File splitting (to be created)
npx ts-node scripts/refactoring/split-large-files.ts --file <path> [--max-lines 500]

# Test generation (to be created)
npx ts-node scripts/refactoring/generate-tests.ts --target <path> --type <unit|integration|e2e>
```

## 📊 Success Metrics

### Week 1 Goals
- ✅ Console statements removed: 100%
- ✅ Common hooks extracted: 25 patterns
- ✅ Import paths fixed: All deep imports
- ✅ Critical 'any' types fixed: 100%

### Week 2 Goals
- ✅ Large files split: 129 → 0
- ✅ Component reusability: +40%
- ✅ Build time: -25%
- ✅ Type coverage: >85%

### Week 3 Goals
- ✅ Test coverage: 40%
- ✅ Bundle size: -30%
- ✅ Performance: All metrics green
- ✅ Documentation: 100% complete

## ⚠️ Risk Mitigation

### Backup Strategy
- Full backup before each phase
- Incremental backups after each script
- Git commits after successful phases
- Restore scripts ready

### Rollback Plan
```bash
# Restore from backup
cd .refactoring-backup-[timestamp]
./restore.sh

# Or git reset
git reset --hard HEAD~1
```

### Testing Protocol
1. Run scripts in dry-run first
2. Test on small subset
3. Verify build passes
4. Run E2E tests
5. Deploy to staging
6. Monitor for 24 hours
7. Deploy to production

## 📈 ROI Calculation

### Time Investment
- Script development: 3 days
- Execution: 20 days
- Testing: 5 days
- **Total**: 28 days

### Time Saved (Annual)
- Debugging reduction: 200 hours
- Onboarding new devs: 100 hours
- Feature development: 300 hours
- Maintenance: 150 hours
- **Total**: 750 hours/year

### ROI
- Investment: 224 hours (28 days)
- Return: 750 hours/year
- **ROI**: 235% first year, 335% cumulative

## 🎯 Final Deliverables

1. **Clean Codebase**
   - 0 console statements
   - <100 'any' types
   - No files >500 lines
   - 40% test coverage

2. **Documentation**
   - Updated CLAUDE.md
   - Component documentation
   - API documentation
   - Architecture diagrams

3. **Performance**
   - Bundle size <500KB/route
   - Load time <2 seconds
   - Lighthouse score >90
   - Zero runtime errors

4. **Developer Experience**
   - Type-safe development
   - Fast build times
   - Clear component structure
   - Comprehensive tests

## 🚦 Go/No-Go Criteria

Before proceeding with each phase:

### ✅ GO if:
- Previous phase completed successfully
- Build passes all checks
- No critical bugs in production
- Team aligned on approach

### 🛑 NO-GO if:
- Build failures exist
- Test coverage decreases
- Performance degrades
- User-facing bugs introduced

## 📞 Support & Escalation

### Issues During Refactoring
1. Check error logs in `refactoring-*.log`
2. Run diagnostic: `npm run refactor:diagnose`
3. Restore from backup if needed
4. Create issue in GitHub with logs

### Emergency Rollback
```bash
# Immediate rollback
git revert HEAD
pnpm install
pnpm build

# Full restoration
cd .refactoring-backup-latest
./restore.sh
```

---

**Ready to execute?** Start with `./scripts/refactoring/master-refactor.sh --dry-run` to preview all changes.