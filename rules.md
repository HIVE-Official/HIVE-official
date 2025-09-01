# HIVE Development Rules & Standards

**Version**: 1.0  
**Last Updated**: August 30, 2025  
**Based on**: Comprehensive Codebase Audit Results

---

## 🚨 **CRITICAL RULES (Non-Negotiable)**

### **Rule 0: AI as Technical Co-Founder**
```
Claude acts as senior full-stack developer and technical co-founder.
ALWAYS ask business logic questions before implementation.
ALWAYS inform Jacob of best options, but decisions made together.
NEVER build in isolation - collaborate on architecture decisions.
```

**Why**: AI should leverage its technical expertise while respecting Jacob as the decision-maker and domain expert.

**Collaboration Standards**:
- Ask clarifying questions about business requirements before coding
- Present multiple technical approaches with pros/cons
- Respect existing codebase patterns and architectural decisions
- Focus on user value, not just technical completion

### **Rule 1: Clean Feature Development**
```
WRITE clean code from the start.
NEVER create technical debt while building features.
ALWAYS follow existing patterns and conventions.
FIX breaking errors only when they block feature work.
```

**Why**: Clean code during development prevents technical debt accumulation. Quality during creation is more efficient than cleanup afterward.

**Enforcement**:
- Use @hive/ui components exclusively
- Follow TypeScript patterns (interfaces, proper typing)
- Implement proper error handling
- Use design tokens, never hardcode values

### **Rule 2: Zero Duplicate Code Policy**
```
ONE implementation per component/function.
NO multiple Button/Input/Modal components.
NO duplicate business logic across packages.
ALWAYS consolidate before building new.
```

**Why**: Audit found 3 different Button implementations causing developer confusion and inconsistent UX.

**Enforcement**:
- Audit existing implementations before creating new ones
- Use @hive/ui components exclusively - never create one-off UI
- All business logic must live in packages/core
- Code reviews must check for duplication

### **Rule 3: Production Quality Standards**
```
EVERY line of code must be production-ready.
NO "TODO", "FIXME", or placeholder implementations.
NO hardcoded values or magic numbers.
ALWAYS implement proper error handling.
```

**Why**: Audit showed 0.4% test coverage and production blockers throughout codebase.

**Enforcement**:
- All functions must have error boundaries
- All API calls must include proper error handling
- All user inputs must be validated
- All edge cases must be handled with clear UX

---

## 🏗️ **ARCHITECTURAL RULES**

### **Rule 4: Strict Package Boundaries**
```typescript
// CORRECT: Proper package boundaries
import { Button } from '@hive/ui';
import { validateEmail } from '@hive/validation';
import { SpaceRepository } from '@hive/core';

// WRONG: Cross-package imports
import { Button } from '../../../packages/ui/src/components/Button';
import { auth } from '../../firebase/config';
```

**Why**: Clean architecture prevents circular dependencies and enables independent package development.

**Package Structure**:
- `@hive/ui`: All visual components, design system
- `@hive/core`: Business logic, domain models, repositories
- `@hive/hooks`: React hooks for state management
- `@hive/validation`: Schema validation and sanitization
- `@hive/utilities`: Pure utility functions
- `@hive/tokens`: Design tokens and theming

### **Rule 5: Component Architecture Standards**
```typescript
// CORRECT: Proper component structure
interface SpaceCardProps {
  space: Space;
  onJoin?: (spaceId: string) => void;
  className?: string;
}

export function SpaceCard({ space, onJoin, className }: SpaceCardProps) {
  const { isLoading, error } = useSpaceActions();
  
  return (
    <Card className={cn("space-card", className)}>
      <CardHeader>
        <SpaceAvatar space={space} />
        <SpaceMetadata space={space} />
      </CardHeader>
      <CardContent>
        <SpaceDescription space={space} />
      </CardContent>
      <CardActions>
        {onJoin && <JoinButton onJoin={() => onJoin(space.id)} />}
      </CardActions>
    </Card>
  );
}

// WRONG: Monolithic components with mixed concerns
```

**Requirements**:
- All props must be explicitly typed
- All components must handle loading/error states
- All components must be composable and reusable
- All styling must use design tokens via className prop

### **Rule 6: State Management Standards**
```typescript
// CORRECT: Centralized state with proper typing
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.login(email);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

// WRONG: Scattered useState across components
```

**Requirements**:
- Use Zustand for global state management
- Use React Query for server state management
- Local component state only for UI state (dropdowns, modals)
- All async operations must include loading/error states

---

## 🎨 **DESIGN SYSTEM RULES**

### **Rule 7: Design System First Policy**
```
ALWAYS use @hive/ui components.
NEVER hardcode colors, spacing, or typography.
ALWAYS use semantic tokens over literal values.
ALWAYS ask: "Should this be in the design system?"
```

**Design Token Usage**:
```typescript
// CORRECT: Using design tokens
<div className="bg-background-primary text-foreground-primary p-spacing-md border-radius-sm">

// WRONG: Hardcoded values
<div className="bg-white text-black p-4 rounded">
```

**Component Creation Process**:
1. Check if component exists in @hive/ui
2. If not, check if existing component can be extended
3. If new component needed, design for reusability
4. Add to Storybook with all variants
5. Update design system documentation

### **Rule 8: Mobile-First Development**
```
EVERY component must work perfectly on phones.
EVERY interaction must be touch-optimized.
EVERY layout must scale from 320px to 1440px.
ALWAYS test on actual devices, not just DevTools.
```

**Mobile Requirements**:
- Minimum touch target size: 44px × 44px
- Maximum content width: 100vw - 32px (16px margin each side)
- Navigation must be thumb-reachable (bottom 1/3 of screen)
- All animations must be smooth at 60fps on mid-tier devices

### **Rule 9: Performance Standards**
```
Initial load: <3 seconds on slow 3G
Bundle size: <500KB initial chunk
Core Web Vitals: All green scores
60fps animations: On campus-typical devices
```

**Performance Requirements**:
- Use dynamic imports for non-critical components
- Optimize images with Next.js Image component
- Implement proper caching strategies
- Monitor bundle size in CI/CD

---

## 🧪 **TESTING RULES**

### **Rule 10: Test-Driven Quality**
```
70% minimum test coverage for all packages.
ALL critical user paths must have E2E tests.
ALL API endpoints must have integration tests.
ALL components must have unit tests.
```

**Testing Standards**:
```typescript
// CORRECT: Comprehensive component testing
describe('SpaceCard', () => {
  it('renders space information correctly', () => {
    render(<SpaceCard space={mockSpace} />);
    expect(screen.getByText(mockSpace.name)).toBeInTheDocument();
  });

  it('handles join action', async () => {
    const onJoin = vi.fn();
    render(<SpaceCard space={mockSpace} onJoin={onJoin} />);
    
    await user.click(screen.getByRole('button', { name: /join/i }));
    expect(onJoin).toHaveBeenCalledWith(mockSpace.id);
  });

  it('shows loading state during join', () => {
    // Test loading state
  });

  it('handles join error gracefully', () => {
    // Test error state
  });
});
```

**Test Coverage Requirements**:
- Auth flows: 100% coverage (critical security)
- Core business logic: 90% coverage
- UI components: 80% coverage
- Utility functions: 90% coverage

### **Rule 11: End-to-End Testing Standards**
```
EVERY major user journey must have E2E test.
EVERY form submission must be E2E tested.
EVERY critical integration must be E2E tested.
E2E tests must run on real mobile devices.
```

**Critical E2E Test Scenarios**:
- Complete authentication flow (magic link → onboarding → dashboard)
- Space creation and joining flow
- Tool creation and deployment flow
- Profile setup and customization flow

---

## 🔐 **SECURITY RULES**

### **Rule 12: Security First Development**
```
NEVER commit secrets or API keys.
ALWAYS validate user inputs on client AND server.
ALWAYS use TypeScript strict mode.
ALWAYS implement proper rate limiting.
```

**Security Checklist**:
- [ ] All API routes have authentication checks
- [ ] All user inputs are validated with Zod schemas
- [ ] All database operations use proper authorization
- [ ] All file uploads are scanned and limited
- [ ] All external API calls include proper error handling

### **Rule 13: Data Validation Standards**
```typescript
// CORRECT: Proper validation
const SpaceSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500),
  type: z.enum(['academic', 'social', 'project']),
  privacy: z.enum(['public', 'private']),
});

export function createSpace(data: unknown) {
  const validatedData = SpaceSchema.parse(data);
  return SpaceRepository.create(validatedData);
}

// WRONG: No validation
```

---

## 📱 **MOBILE DEVELOPMENT RULES**

### **Rule 14: Touch-First Design**
```
EVERY interaction must be finger-friendly.
EVERY gesture must feel natural and responsive.
EVERY navigation must be reachable with thumbs.
EVERY text must be readable at arm's length.
```

**Touch Interaction Standards**:
- Swipe gestures for navigation
- Pull-to-refresh for data updates
- Haptic feedback for important actions
- Double-tap prevention for critical actions

### **Rule 15: Campus WiFi Optimization**
```
EVERYTHING must work on slow campus WiFi.
GRACEFUL degradation when offline.
AGGRESSIVE caching of critical data.
CLEAR feedback for network operations.
```

**Network Optimization**:
- Implement service worker for offline functionality
- Cache API responses aggressively
- Show meaningful loading states
- Provide offline mode for critical features

---

## 🚀 **DEVELOPMENT WORKFLOW RULES**

### **Rule 16: Code Quality Gates**
```
NO PR approval without:
- Zero ESLint errors
- Zero TypeScript errors  
- All tests passing
- Design system compliance check
```

**Pre-Commit Requirements**:
1. Run `pnpm lint` - must pass
2. Run `pnpm typecheck` - must pass
3. Run `pnpm test` - must pass
4. Run `pnpm build` - must complete <30s

### **Rule 17: Documentation Standards**
```
EVERY new component needs Storybook story.
EVERY API needs TypeScript documentation.
EVERY complex function needs JSDoc comments.
EVERY architectural decision needs documentation.
```

**Documentation Requirements**:
- All props must have TypeScript comments
- All components must have usage examples in Storybook
- All hooks must have clear usage documentation
- All business logic must have architectural decision records (ADRs)

---

## 🎯 **SUCCESS METRICS**

### **Technical Quality Metrics**
- **Build Success**: 100% (zero failures)
- **Test Coverage**: >70% across all packages
- **Bundle Size**: <500KB initial load
- **Build Time**: <30 seconds full monorepo build
- **Type Safety**: 100% TypeScript strict mode

### **User Experience Metrics**
- **Mobile Performance**: 60fps on mid-tier devices
- **Load Times**: <3s on campus WiFi
- **Error Rates**: <1% for critical user paths
- **Conversion Rates**: >90% onboarding completion

### **Code Quality Metrics**
- **ESLint Violations**: Zero across entire codebase
- **Duplicate Code**: Zero duplicate implementations
- **Security Issues**: Zero critical or high severity
- **Documentation Coverage**: 100% for public APIs

---

## ⚡ **IMMEDIATE ENFORCEMENT ACTIONS**

### **Phase 1: Infrastructure Fixes (Days 1-5)**
1. **ESLint Configuration**: Create eslint.config.js, remove .eslintignore
2. **TypeScript Strict**: Enable in all packages, fix all errors
3. **Build Commands**: Fix all `<NONEXISTENT>` build scripts
4. **Test Coverage**: Set up coverage reporting, achieve 70% minimum

### **Phase 2: Code Quality (Days 6-14)**
1. **Remove Duplicates**: Consolidate all duplicate components
2. **Design System**: Ensure 100% @hive/ui usage
3. **Error Handling**: Implement proper error boundaries everywhere
4. **Performance**: Optimize for <30s builds, <500KB bundles

---

## 📋 **RULE VIOLATION CONSEQUENCES**

### **Immediate Actions Required**:
- **ESLint Errors**: Block PR merge, fix immediately
- **Type Errors**: Block PR merge, fix before review
- **Failed Tests**: Block PR merge, fix or remove test
- **Security Issues**: Immediate hotfix required

### **Quality Issues**:
- **Duplicate Code**: Refactor before next sprint
- **Missing Tests**: Add tests before next feature work
- **Poor Performance**: Optimize before launch
- **Missing Docs**: Complete before code review approval

---

**These rules are based on real audit findings and must be followed to achieve production readiness. They are not suggestions—they are requirements for a stable, scalable, and maintainable HIVE platform.**

---

*Last Reviewed*: August 30, 2025  
*Next Review*: September 15, 2025 (after infrastructure fixes)