# HIVE UI Component Replacement Roadmap

## Current Status
- **UI Package Status**: Clean nuclear reset completed ✅
- **Available Components**: Button, Card, Input (3 basic components)
- **Required Components**: 70+ components needed for web app functionality

## Analysis Summary
Based on grep analysis of `apps/web`, the following components need to be recreated:

## Tier 1: Critical Foundation Components (Must Have)
These components are essential for basic app functionality and are used extensively.

### Basic UI Elements
- [x] **Button** - Already created
- [x] **Card** - Already created
- [x] **Input** - Already created
- [ ] **Label** - Form labels
- [ ] **Badge** - Status indicators
- [ ] **Progress** - Loading/progress bars
- [ ] **Switch** - Toggle controls
- [ ] **Tabs** - Tab navigation
- [ ] **Avatar** - User avatars
- [ ] **Skeleton** - Loading placeholders

### Layout Components
- [ ] **Container** - Layout container
- [ ] **Stack** - Vertical/horizontal stacks
- [ ] **Grid** - Grid layouts
- [ ] **Separator** - Visual separators
- [ ] **Spacer** - Spacing utility

## Tier 2: Interactive Components (High Priority)
Components needed for user interactions and forms.

### Form Components
- [ ] **Checkbox** - Checkboxes
- [ ] **Radio** - Radio buttons
- [ ] **Select** - Select dropdowns
- [ ] **Textarea** - Text areas
- [ ] **FormField** - Complete form field wrapper
- [ ] **FileInput** - File upload inputs

### Modal/Overlay Components
- [ ] **Modal** - Base modal component
- [ ] **AlertDialog** - Confirmation dialogs
- [ ] **Tooltip** - Hover tooltips
- [ ] **Dropdown** - Dropdown menus

## Tier 3: HIVE-Specific Components (Medium Priority)
Custom components specific to HIVE's design system.

### HIVE Brand Components
- [ ] **HiveLogo** - HIVE branding
- [ ] **HiveButton** - Branded button variants
- [ ] **HiveCard** - Branded card variants
- [ ] **HiveInput** - Branded input variants
- [ ] **HiveModal** - Branded modal

### HIVE System Components
- [ ] **UnifiedAuthProvider** - Authentication context
- [ ] **ShellProvider** - App shell context
- [ ] **CompleteHIVEToolsSystem** - Tools integration

## Tier 4: Feature-Specific Components (Lower Priority)
Complex components for specific features.

### Profile Components
- [ ] **ProfileHeader** - Profile page header
- [ ] **ProfileStats** - Profile statistics
- [ ] **ProfileDashboard** - Complete profile dashboard
- [ ] **ProfileCard** - Profile summary card

### Space Components
- [ ] **SpaceCard** - Space overview cards
- [ ] **SpaceDashboard** - Space management
- [ ] **SpaceExploreHub** - Space discovery

### Tool Components
- [ ] **ToolLibraryModal** - Tool library browser
- [ ] **ToolConfigurationPanel** - Tool settings
- [ ] **PlantedToolWidget** - Deployed tools

## Tier 5: Advanced Features (Future)
Advanced components that can be implemented later.

### Calendar/Events
- [ ] **RitualCalendar** - Calendar component
- [ ] **EventCard** - Event displays
- [ ] **MilestoneCelebration** - Achievement displays

### Analytics
- [ ] **AnalyticsDashboard** - Analytics overview
- [ ] **AdminDashboard** - Admin interface

## Implementation Strategy

### Phase 1: Foundation (Week 1)
**Goal**: Restore basic app functionality
- Complete Tier 1 components (10 components)
- Focus on Layout and Basic UI Elements
- Test build and basic page rendering

### Phase 2: Interactivity (Week 2)
**Goal**: Enable user interactions
- Complete Tier 2 components (8 components)
- Focus on Forms and Modal/Overlay components
- Test form functionality and user flows

### Phase 3: HIVE Identity (Week 3)
**Goal**: Restore HIVE-specific features
- Complete Tier 3 components (8 components)
- Implement branded components and system providers
- Test authentication and core HIVE features

### Phase 4: Feature Completion (Week 4)
**Goal**: Full feature parity
- Complete Tier 4 components (12 components)
- Implement feature-specific components
- Test all major user journeys

### Phase 5: Enhancement (Future)
**Goal**: Advanced functionality
- Complete Tier 5 components as needed
- Performance optimization
- Advanced features

## Development Guidelines

### Component Standards
1. **TypeScript**: Strict typing for all props and state
2. **Semantic Tokens**: Use CSS custom properties from styles.css
3. **Accessibility**: ARIA labels and keyboard navigation
4. **Mobile-First**: Responsive design by default
5. **Testing**: Unit tests for complex logic

### File Structure
```
src/atomic/
├── atoms/           # Basic UI elements
├── molecules/       # Compound components
├── organisms/       # Complex components
├── templates/       # Page layouts
└── pages/          # Full page components
```

### Import/Export Pattern
```typescript
// Component creation
export { ComponentName } from "./component-name"

// Index.ts consolidation
export * from "./atoms"
export * from "./molecules"
// etc.
```

## Risk Mitigation

### Build Verification Steps
1. **After each component**: Run `pnpm build --filter=@hive/ui`
2. **After tier completion**: Run full `pnpm build`
3. **Test imports**: Verify components import correctly in web app

### Rollback Strategy
- Each component gets individual commit
- Backup current working state before major changes
- Keep index.ts exports synchronized with available components

## Success Metrics

### Phase 1 Success
- [ ] UI package builds with 0 TypeScript errors
- [ ] Web app renders basic pages without import errors
- [ ] Layout components work on mobile and desktop

### Phase 2 Success
- [ ] Forms function correctly
- [ ] Modal interactions work
- [ ] No broken user interactions

### Phase 3 Success
- [ ] HIVE branding displays correctly
- [ ] Authentication flows work
- [ ] Core HIVE features function

### Phase 4 Success
- [ ] All major pages render correctly
- [ ] All user journeys complete successfully
- [ ] Feature parity with pre-corruption state

## Current Progress
- **Completed**: 3/70+ components (4%)
- **Next Priority**: Label, Badge, Progress (Tier 1 completion)
- **Estimated Timeline**: 4 weeks for full restoration

---

**Last Updated**: September 20, 2025
**Status**: Ready to begin Tier 1 implementation