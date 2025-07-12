# HIVE Design System Build Plan

## 🎯 Goal
Build a production-ready design system for tech social platform with clean, modular components and minimal gold usage.

## ✅ COMPLETED PHASES

### **Phase 1: Core Primitives ✅ COMPLETE**
- ✅ **Button System**: 5 clean variants + ritual buttons for special moments
- ✅ **Input System**: 5 chip-style variants with floating labels, validation, password toggle
- ✅ **Card System**: 5 focused variants (down from 11) with composition patterns
- ✅ **Typography System**: Confirmed good (Space Grotesk + Geist Sans)

### **Phase 2: Layout Components ✅ COMPLETE**  
- ✅ **AppHeader**: 3 variants (default, minimal, floating) with modular composition
- ✅ **Design Token Analysis**: Excellent system (9/10), minor optimizations identified

## 📋 REMAINING PHASES

### **Phase 3: Essential Form Components (Week 1)**
**Priority: Critical for user interactions**

#### Missing Critical Components
- [ ] **Alert/AlertDialog**: Confirmation dialogs and user notifications
- [ ] **Tabs**: Content organization and navigation
- [ ] **Popover**: Contextual actions and information
- [ ] **Dropdown Menu**: Navigation and action menus
- [ ] **Tooltip**: User guidance and explanations

#### Component Decisions Needed
- [ ] **QUESTION FOR JACOB**: Component alternative choices:
  - Onboarding: `AcademicStep` vs `AcademicCardStep` - which style?
  - Interests: `InterestsStep` vs `InterestsSelectionStep` - category vs tag approach?
  - Welcome: `WelcomeStep` vs `WelcomeRoleStep` - hero vs role-first?
  - Splash: `CountdownSplashScreen` vs `AnimatedSplashScreen` - which for launch?

#### Form Enhancement
- [ ] **QUESTION FOR JACOB**: Need Form wrapper component for better validation handling?
- [ ] Polish existing form components (Select, Checkbox, Radio, Switch, Textarea)
- [ ] Standardize form validation patterns across all inputs

### **Phase 4: Advanced Interaction Components (Week 2)**
**Priority: High for rich user experience**

#### Complex UI Patterns
- [ ] **Sheet/Drawer**: Sliding panels for mobile interactions
- [ ] **Table**: Data display for admin, analytics, user lists
- [ ] **Navigation Menu**: Complex navigation structures
- [ ] **Separator**: Visual content separation
- [ ] **Scroll Area**: Enhanced scrolling experience

#### Enhanced Layout
- [ ] **QUESTION FOR JACOB**: BottomNavBar system - any improvements needed for mobile navigation?
- [ ] **QUESTION FOR JACOB**: Bento grid - expand as primary layout system for profile dashboards?
- [ ] Page scaffold components (header + content + footer patterns)
- [ ] Responsive container and grid standardization

### **Phase 5: Content & Media Components (Week 3)**
**Priority: Medium for rich content**

#### Content Organization
- [ ] **Command**: Search/command palette for campus navigation
- [ ] **Calendar/Date Picker**: Event scheduling and planning features
- [ ] **Accordion**: FAQ sections and collapsible content
- [ ] **Collapsible**: Expandable sections for complex information

#### Media & Interaction
- [ ] **Toggle**: Advanced state toggles beyond basic Switch
- [ ] **Slider**: Range inputs for preferences and settings
- [ ] **Hover Card**: Rich preview cards for users and spaces
- [ ] **Aspect Ratio**: Responsive media containers for posts and images

### **Phase 6: Component Alternative Decisions (Week 4)**
**Priority: Medium - consolidate experimental variants**

#### Visual Improvement Alternatives
- [ ] **QUESTION FOR JACOB**: Button alternatives - keep Vercel/Apple/Campus/Tech/Social variants for A/B testing or pick one?
- [ ] **QUESTION FOR JACOB**: Card alternatives - consolidate MinimalCard/GlassCard/CampusCard/TechCard/SocialCard?
- [ ] **QUESTION FOR JACOB**: Typography alternatives - choose between Minimal/Display/Campus/Tech/Social approaches?

#### Onboarding Component Decisions
- [ ] **QUESTION FOR JACOB**: Academic components - `AcademicStep` vs `AcademicCardStep`?
- [ ] **QUESTION FOR JACOB**: Interest selection - `InterestsStep` vs `InterestsSelectionStep`?
- [ ] **QUESTION FOR JACOB**: Welcome flow - `WelcomeStep` vs `WelcomeRoleStep`?
- [ ] **QUESTION FOR JACOB**: Splash screens - `CountdownSplashScreen` vs `AnimatedSplashScreen`?

#### Component Enhancement
- [ ] Apply chosen design patterns consistently across all components
- [ ] Remove unused alternative implementations
- [ ] Update component exports and documentation

### **Phase 7: HIVE-Specific Features (Week 5)**
**Priority: Low - unique campus platform features**

#### Campus-Specific Components  
- [ ] **QUESTION FOR JACOB**: Space cards/grids - current design working or needs refinement?
- [ ] **QUESTION FOR JACOB**: Ritual components - keep Enhanced styling or standardize to clean approach?
- [ ] **QUESTION FOR JACOB**: Feed layout - compact vs detailed vs minimal preference?
- [ ] **QUESTION FOR JACOB**: Campus energy indicators - how prominent should they be?

#### Specialized Features
- [ ] Polish spaces interaction patterns and management interfaces
- [ ] Enhance ritual/celebration components with consistent gold usage
- [ ] Optimize feed components for real-time updates
- [ ] Build campus-specific tool interfaces

## 🔧 Technical Standards ✅ ESTABLISHED

### Component Architecture ✅ STANDARDIZED
- ✅ forwardRef patterns implemented across core components
- ✅ Consistent prop naming conventions (variant, size, padding, etc.)
- ✅ TypeScript strict typing enforced
- ✅ Consistent class name patterns using cva + cn utility

### Design Tokens ✅ EXCELLENT (9/10)
- ✅ Complete color system with monochrome + gold approach
- ✅ 8px spacing grid with logical progression (xs: 4px → 4xl: 64px)
- ✅ Brand-specific animation timing and easing curves
- ✅ Semantic color tokens with HSL + CSS custom properties
- ✅ Component sizing scales standardized

### Quality Assurance ✅ IN PROGRESS
- ✅ Storybook documentation for core components (Button, Input, Card, AppHeader)
- ✅ Component accessibility patterns established
- [ ] Expand Storybook coverage to all components
- [ ] Performance audit for component bundle sizes

## 🎨 Core Component Library Approach

### Recommended Strategy: **Progressive Completion**

#### Phase 3 Immediate Priority (This Week)
Focus on the **5 Essential Missing Components** that every social platform needs:

1. **Alert/AlertDialog** - Critical for user confirmations and notifications
2. **Tabs** - Essential for organizing dashboard and settings content  
3. **Popover** - Needed for contextual menus and quick actions
4. **Dropdown Menu** - Required for navigation and user menus
5. **Tooltip** - Important for user guidance and feature discovery

#### Implementation Approach
- **Follow Established Pattern**: Use Button/Input/Card as templates for consistency
- **Clean Social Platform Style**: Continue tech social aesthetic with minimal gold
- **Modular Architecture**: Implement with forwardRef, cva variants, TypeScript strict typing
- **Storybook Documentation**: Create comprehensive examples for each component

#### Component Alternative Strategy
- **Phase 6 Decision Sprint**: Consolidate all experimental variants (Visual Improvements, Onboarding alternatives)
- **A/B Testing Consideration**: Keep 1-2 key alternatives for user testing, remove the rest
- **Focus on Core**: Prioritize missing components over variant optimization

## 📊 Current Progress Metrics
- ✅ **Core Primitives**: 4/4 complete (Button, Input, Card, Typography)
- ✅ **Layout Foundation**: 1/3 complete (AppHeader complete, need Navigation Menu + Table)
- ❌ **Essential UI**: 0/5 complete (missing Alert, Tabs, Popover, Dropdown, Tooltip)
- ⚠️ **Component Alternatives**: 15+ variants needing decisions

## 🚀 Next Immediate Steps
1. **Build Missing Core Components** (Week 1): Alert → Tabs → Popover → Dropdown → Tooltip
2. **Create Storybook Documentation** for each new component
3. **Update Component Exports** to maintain clean API surface
4. **Make Component Alternative Decisions** to reduce cognitive load

**Goal**: Complete essential missing components before optimizing alternatives.

---

**NOTE FOR AI (Claude)**: Ask Jacob the marked questions as we progress through each phase. Don't proceed to major changes without confirming approach first.