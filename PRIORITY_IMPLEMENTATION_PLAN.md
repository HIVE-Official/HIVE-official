# HIVE UI Priority Implementation Plan

## Data-Driven Component Prioritization
Based on usage analysis of 146 files importing from @hive/ui:

## Immediate Priority (Build First)
Components with 10+ usages - critical for app functionality:

1. **Button** (56 uses) ✅ - Already implemented
2. **Card** (46 uses) ✅ - Already implemented
3. **Badge** (31 uses) - High priority
4. **HiveInput** (13 uses) - HIVE-specific variant
5. **HiveModal** (12 uses) - Critical for modals
6. **HiveCard** (11 uses) - HIVE-specific variant
7. **HiveButton** (11 uses) - HIVE-specific variant

## High Priority (Build Next)
Components with 3-9 usages - needed for core functionality:

8. **CardContent** (5 uses) - Part of Card system
9. **Textarea** (4 uses) - Form inputs
10. **TabsTrigger** (4 uses) - Tab navigation
11. **Progress** (4 uses) - Loading states
12. **Input** (4 uses) ✅ - Already implemented
13. **HiveLogo** (4 uses) - Branding
14. **TabsList** (3 uses) - Tab navigation
15. **TabsContent** (3 uses) - Tab navigation
16. **Tabs** (3 uses) - Complete tab system
17. **Switch** (3 uses) - Toggle controls
18. **Label** (3 uses) - Form labels
19. **Grid** (3 uses) - Layout system
20. **CardHeader** (3 uses) - Part of Card system

## Hooks & Providers (Critical)
These are essential for app functionality:

1. **useUnifiedAuth** (13 uses) - Authentication
2. **useAuth** (3 uses) - Authentication

## Type Definitions (Needed)
1. **OnboardingData** (2 uses)
2. **Event** (2 uses)

## Implementation Strategy

### Sprint 1: Critical Foundation (Days 1-2)
**Goal**: Eliminate most import errors

Priority components:
- [ ] **Badge** (31 uses)
- [ ] **HiveInput** (13 uses)
- [ ] **HiveModal** (12 uses)
- [ ] **HiveCard** (11 uses)
- [ ] **HiveButton** (11 uses)
- [ ] **useUnifiedAuth** hook (13 uses)

**Success Criteria**:
- Build succeeds with major import errors resolved
- Basic navigation and forms work

### Sprint 2: Core Functionality (Days 3-4)
**Goal**: Enable full user interactions

Priority components:
- [ ] **CardContent** (5 uses)
- [ ] **Textarea** (4 uses)
- [ ] **Progress** (4 uses)
- [ ] **HiveLogo** (4 uses)
- [ ] **Tabs system** (TabsTrigger, TabsList, TabsContent, Tabs)
- [ ] **Switch** (3 uses)
- [ ] **Label** (3 uses)

**Success Criteria**:
- All forms functional
- Tab navigation works
- Progress indicators display

### Sprint 3: Layout & Polish (Days 5-6)
**Goal**: Complete UI system

Priority components:
- [ ] **Grid** (3 uses)
- [ ] **CardHeader** (3 uses)
- [ ] **CardTitle** (2 uses)
- [ ] **useAuth** hook (3 uses)
- [ ] Type definitions (OnboardingData, Event)

**Success Criteria**:
- All pages render correctly
- No remaining import errors
- Layout system complete

## Component Implementation Order

### Day 1 Focus
1. **Badge** - High usage (31), simple component
2. **HiveInput** - HIVE-specific, critical for forms
3. **useUnifiedAuth** - Authentication dependency

### Day 2 Focus
4. **HiveModal** - Critical for user interactions
5. **HiveCard** - HIVE-specific Card variant
6. **HiveButton** - HIVE-specific Button variant

### Day 3 Focus
7. **CardContent** - Complete Card system
8. **CardHeader** - Complete Card system
9. **Textarea** - Form completion

### Day 4 Focus
10. **Tabs system** (all 4 components) - Navigation
11. **Progress** - Loading states

### Day 5 Focus
12. **Switch** - Toggle controls
13. **Label** - Form labels
14. **HiveLogo** - Branding

### Day 6 Focus
15. **Grid** - Layout system
16. **useAuth** hook - Authentication
17. Type definitions - Data models

## Risk Assessment

### High Risk Components
- **useUnifiedAuth**: Complex authentication logic
- **HiveModal**: Overlay management and z-index
- **Tabs system**: Complex state management

### Medium Risk Components
- **HiveInput/HiveCard/HiveButton**: Need HIVE design tokens
- **Grid**: Layout system complexity

### Low Risk Components
- **Badge, Label, Switch**: Simple UI components
- **Progress**: Straightforward implementation

## Success Metrics

### Sprint 1 Success
- [ ] Zero TypeScript import errors for top 5 components
- [ ] Web app builds successfully
- [ ] Authentication flow works

### Sprint 2 Success
- [ ] All forms functional
- [ ] Tab navigation operational
- [ ] Progress indicators working

### Sprint 3 Success
- [ ] 100% component parity achieved
- [ ] All pages render without errors
- [ ] ESLint issues resolved

## ESLint Resolution Strategy

Once components are built:
1. **Fix imports**: Update all @hive/ui imports
2. **Remove unused imports**: Clean up component files
3. **Type fixes**: Resolve TypeScript errors
4. **Run ESLint**: `npx eslint src --fix`

## Build Verification Process

After each component:
```bash
# 1. Build UI package
pnpm build --filter=@hive/ui

# 2. Check for import errors
pnpm typecheck

# 3. Test in web app
pnpm dev
```

## Next Steps

1. **Start Sprint 1**: Begin with Badge component
2. **Set up testing**: Create component test suite
3. **Track progress**: Update this document after each component
4. **Monitor metrics**: Track build success and error reduction

---

**Current Status**: Ready to begin Sprint 1
**Est. Completion**: 6 days for full restoration
**Success Rate Target**: 95% component parity