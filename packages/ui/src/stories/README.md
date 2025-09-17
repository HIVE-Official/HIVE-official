# HIVE UI Stories - Full Website Layouts

This directory contains comprehensive Storybook stories that demonstrate the complete HIVE user experience within full website layouts. These stories go beyond simple component testing to show real-world user flows with proper state management, responsive design, and error handling.

## 🎯 Story Categories

### 1. **Full Website Authentication Flow**
**Location**: `auth/AuthFlow.fullsite.stories.tsx`

**Purpose**: Demonstrates the complete authentication experience within realistic website layouts.

**Stories Include**:
- `CompleteUserJourney` - Full authentication flow from splash to email verification
- `MobileOptimizedFlow` - Touch-optimized mobile experience
- `TabletExperience` - Medium-screen responsive behavior
- `DesktopFullExperience` - Full desktop layout with keyboard navigation
- `ErrorStateShowcase` - Comprehensive error handling demonstration
- `AccessibilityFocused` - WCAG 2.1 AA compliance testing
- `PerformanceOptimized` - Performance characteristics demonstration
- `DarkModeVariations` - Multiple dark theme variants
- `StateTransitionDemo` - State machine behavior visualization

**Key Features**:
- ✅ **Full Next.js Layout Context** - Simulates complete website structure
- ✅ **Realistic Network Simulation** - Variable delays and error scenarios
- ✅ **Toast Notifications** - Non-blocking user feedback
- ✅ **Responsive Design Testing** - All breakpoints covered
- ✅ **State Persistence** - Maintains data across flow steps
- ✅ **Error Recovery** - Graceful handling of failures

### 2. **Full Website Onboarding Flow**
**Location**: `onboarding/OnboardingFlow.fullsite.stories.tsx`

**Purpose**: Shows the complete onboarding experience with multi-step flow and progress tracking.

**Stories Include**:
- `CompleteOnboardingJourney` - Full 5-step onboarding process
- `MobileOnboardingExperience` - Mobile-first onboarding design
- `IndividualStepTesting` - Component isolation for focused testing

**Key Features**:
- ✅ **Progress Tracking** - Visual completion indicators
- ✅ **Step Navigation** - Back/forward with state preservation
- ✅ **Form Validation** - Real-time feedback and error handling
- ✅ **Data Persistence** - Maintains user data between steps
- ✅ **Responsive Layout** - Optimized for all screen sizes

### 3. **Complete User Journey**
**Location**: `full-website/CompleteUserJourney.stories.tsx`

**Purpose**: Demonstrates the entire user experience from authentication through onboarding to main application access.

**Stories Include**:
- `CompleteFlow` - Full journey with reset capability
- `MobileJourney` - Complete mobile user experience

**Key Features**:
- ✅ **End-to-End Flow** - Authentication → Onboarding → Feed
- ✅ **State Machine** - Proper state transitions between phases
- ✅ **Reset Functionality** - Restart journey for testing
- ✅ **Real Layout Context** - Actual website navigation and structure

## 🚀 Testing Instructions

### Prerequisites
```bash
cd packages/ui
pnpm storybook
```
Navigate to http://localhost:6006

### Testing Scenarios

#### Authentication Flow Testing
1. **Happy Path**: Use `student@buffalo.edu` for UB priority flow
2. **Waitlist Path**: Try `student@rit.edu` for waitlist experience  
3. **Error Testing**: Use `invalid@test.edu` or `blocked@cornell.edu`
4. **Network Issues**: Random 10% failure rate simulated

#### Onboarding Flow Testing
1. **Complete Flow**: Go through all steps (interests → academic → avatar → completion)
2. **Skip Options**: Test skip functionality at each step
3. **Back Navigation**: Use Previous button to modify answers
4. **Error Simulation**: 10% chance of validation errors

#### Responsive Testing
1. **Mobile (320px+)**: Test touch interactions and single-column layout
2. **Tablet (768px+)**: Verify enhanced spacing and larger targets
3. **Desktop (1024px+)**: Check keyboard navigation and optimal layouts

#### Accessibility Testing
1. **Keyboard Only**: Navigate using Tab, Enter, and Arrow keys
2. **Screen Reader**: Use built-in accessibility tools
3. **High Contrast**: Test in high contrast mode
4. **Reduced Motion**: Verify animations respect user preferences

## 🎨 Design System Compliance

All stories follow HIVE's strict brand guidelines:

### ✅ Brand Rules Enforced
- **No Yellow Fills**: Buttons use black/white fills exclusively
- **Modular Surfaces**: Consistent bg-card, bg-surface-01, bg-surface-02 hierarchy
- **Gold for Focus Only**: Gold accents reserved for focus states
- **Typography Hierarchy**: Proper contrast ratios throughout
- **Dark-First Design**: HIVE's signature dark theme

### Color Variables Used
```css
/* Primary backgrounds */
bg-background: #0A0A0A
bg-surface-01: #111111
bg-surface-02: #1A1A1A

/* Accent colors */
text-accent: #FFD700 (gold)
border-accent: #FFD700

/* Content hierarchy */
text-foreground: #FFFFFF
text-muted: #A1A1AA
```

## 📱 Responsive Breakpoints

Stories test all major breakpoints:

| Breakpoint | Width | Design Focus |
|------------|-------|--------------|
| Mobile | 320px+ | Touch-first, single column |
| Mobile Large | 425px+ | Enhanced mobile spacing |
| Tablet | 768px+ | Dual-column potential |
| Desktop | 1024px+ | Full layout with sidebars |
| Large Desktop | 1440px+ | Maximum content width |

## 🔧 Development Features

### State Management
- **React State** for local component state
- **Action Logging** for debugging user interactions
- **State Persistence** across flow transitions
- **Error Boundaries** for graceful failure handling

### Network Simulation
```typescript
// Configurable delays
const simulateNetworkDelay = (min = 500, max = 1500) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Error scenarios
if (email.includes('invalid')) throw new Error('Invalid email format');
if (Math.random() < 0.1) throw new Error('Network timeout');
```

### Performance Optimization
- **Lazy Loading** of non-critical components
- **Debounced Validation** to reduce server calls
- **Optimistic UI Updates** for perceived performance
- **Bundle Size Optimization** with code splitting

## 🧪 Quality Assurance

### Automated Testing
All stories include:
- **ESLint Compliance** with 0 errors/warnings
- **TypeScript Strict Mode** for type safety
- **Accessibility Checks** via Storybook a11y addon
- **Visual Regression** capability with Chromatic

### Manual Testing Checklist
- [ ] All user flows complete successfully
- [ ] Error states display helpful messages
- [ ] Responsive design works across all breakpoints
- [ ] Keyboard navigation functions properly
- [ ] Toast notifications appear for user actions
- [ ] Loading states provide clear feedback
- [ ] Form validation works in real-time
- [ ] State persists across step transitions

## 📝 Story Naming Convention

Stories follow a clear naming pattern:

```
[Category]/[Component][Context].stories.tsx

Examples:
- auth/AuthFlow.fullsite.stories.tsx
- onboarding/OnboardingFlow.fullsite.stories.tsx  
- full-website/CompleteUserJourney.stories.tsx
```

### Story Types
- **`.fullsite.stories.tsx`** - Complete website layout context
- **`.stories.tsx`** - Standard component-focused stories
- **`.test.stories.tsx`** - Testing-specific scenarios

## 🚀 Next Steps

### Planned Enhancements
1. **Visual Regression Testing** with Chromatic integration
2. **Performance Metrics** collection and monitoring
3. **International Testing** with i18n story variants
4. **Edge Case Coverage** for unusual user behaviors
5. **Integration Testing** with actual API endpoints

### Contributing Guidelines
When adding new full-website stories:

1. **Follow Layout Patterns** established in existing stories
2. **Include Responsive Variants** for all major breakpoints
3. **Add Error State Coverage** for realistic failure scenarios
4. **Document Test Instructions** in story descriptions
5. **Ensure Accessibility** compliance with WCAG 2.1 AA
6. **Maintain Brand Compliance** with HIVE design system

---

## 🎉 Summary

These comprehensive stories transform Storybook from a simple component library into a full website testing environment. Developers, designers, and stakeholders can now:

- **Experience Complete User Flows** rather than isolated components
- **Test Responsive Behavior** across all device types
- **Validate Error Handling** in realistic scenarios  
- **Verify Accessibility** compliance throughout
- **Demonstrate Brand Consistency** across the entire experience

This approach ensures that HIVE's authentication and onboarding experience is thoroughly tested, accessible, and provides excellent user experience across all platforms and use cases. 