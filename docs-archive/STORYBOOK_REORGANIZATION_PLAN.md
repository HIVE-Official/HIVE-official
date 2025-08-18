# Storybook Reorganization Plan

## Current Issues
- 68% of components lack stories
- Inconsistent naming conventions
- Mixed individual vs system-level stories
- No clear categorization

## 🏗️ Development Priority Context
This Storybook reorganization aligns with our **core-first development strategy**:
- **Phase 1-5**: Focus on functional component stories
- **Phase 6**: Polish documentation and design system showcase
- **Parallel AI Collaboration**: Multiple AI sessions can work on different story categories simultaneously

## Proposed Structure

### 1. Foundation (`/stories/01-foundation/`)
**Purpose**: Core design system elements
- `design-tokens.stories.tsx` (existing)
- `typography.stories.tsx` (move from components/)
- `colors.stories.tsx` (new)
- `spacing.stories.tsx` (new)
- `motion.stories.tsx` (new)

### 2. Layout (`/stories/02-layout/`)
**Purpose**: Structural components
- `box.stories.tsx` (move from components/)
- `grid.stories.tsx` (move from components/)
- `stack.stories.tsx` (move from components/)
- `hive-layout.stories.tsx` (new)

### 3. UI Components (`/stories/03-ui/`)
**Purpose**: Basic interactive elements
- `button.stories.tsx` (existing, update)
- `input.stories.tsx` (existing, update)
- `card.stories.tsx` (existing, update)
- `badge.stories.tsx` (existing, update)
- `alert.stories.tsx` (new)
- `alert-dialog.stories.tsx` (new)
- `avatar.stories.tsx` (new)
- `dropdown-menu.stories.tsx` (new)
- `label.stories.tsx` (new)
- `resizable.stories.tsx` (new)
- `scroll-area.stories.tsx` (new)
- `switch.stories.tsx` (new)
- `tabs.stories.tsx` (new)
- `textarea.stories.tsx` (new)

### 4. Hive Components (`/stories/04-hive/`)
**Purpose**: Brand-specific components
- `hive-button.stories.tsx` (new)
- `hive-input.stories.tsx` (new)
- `hive-card.stories.tsx` (new)
- `hive-badge.stories.tsx` (new)
- `hive-icons.stories.tsx` (new)
- `hive-form.stories.tsx` (existing, reorganize)
- `hive-modal.stories.tsx` (existing, reorganize)
- `hive-progress.stories.tsx` (existing, reorganize)
- `hive-table.stories.tsx` (existing, reorganize)
- `hive-sidebar.stories.tsx` (existing, reorganize)
- `hive-command-palette.stories.tsx` (existing, reorganize)
- `hive-file-upload.stories.tsx` (new)
- `hive-select.stories.tsx` (new)
- `hive-menu.stories.tsx` (new)
- `hive-breadcrumbs.stories.tsx` (new)
- `hive-charts.stories.tsx` (new)
- `hive-motion-wrapper.stories.tsx` (new)
- `hive-modular-card.stories.tsx` (new)

### 5. Premium Components (`/stories/05-premium/`)
**Purpose**: Premium/enterprise features
- `hive-button-premium.stories.tsx` (new)
- `hive-card-premium.stories.tsx` (new)

### 6. Logo System (`/stories/06-logo/`)
**Purpose**: Logo variants and usage
- `hive-logo-system.stories.tsx` (existing, comprehensive)
- Individual logo variant stories if needed

### 7. Space Components (`/stories/07-spaces/`)
**Purpose**: Space-related functionality
- `hive-space-card.stories.tsx` (existing, move)
- `hive-space-directory.stories.tsx` (new)
- `hive-space-layout.stories.tsx` (new)

### 8. Feed System (`/stories/08-feed/`)
**Purpose**: Content feed functionality
- `feed-composer.stories.tsx` (new)
- `post-card.stories.tsx` (new)
- `space-feed.stories.tsx` (new)

### 9. Surface Components (`/stories/09-surfaces/`)
**Purpose**: Content surface areas
- `hive-posts-surface.stories.tsx` (new)
- `hive-chat-surface.stories.tsx` (new)
- `hive-events-surface.stories.tsx` (new)
- `hive-tools-surface.stories.tsx` (new)
- `hive-members-surface.stories.tsx` (new)
- `hive-pinned-surface.stories.tsx` (new)

### 10. Creator Tools (`/stories/10-creator/`)
**Purpose**: Content creation tools
- `element-picker.stories.tsx` (existing, move)
- `element-card.stories.tsx` (new)
- `visual-tool-builder.stories.tsx` (new)
- `wizard-tool-builder.stories.tsx` (new)
- `template-tool-builder.stories.tsx` (new)
- `design-canvas.stories.tsx` (new)
- `element-library.stories.tsx` (new)
- `tool-builder.stories.tsx` (new)

### 11. Shell & Navigation (`/stories/11-shell/`)
**Purpose**: App shell and navigation
- `app-shell.stories.tsx` (new)
- `enhanced-app-shell.stories.tsx` (new)
- `navigation-header.stories.tsx` (new)
- `navigation-sidebar.stories.tsx` (new)
- `breadcrumb-navigation.stories.tsx` (new)
- `page-container.stories.tsx` (new)
- `shell-provider.stories.tsx` (new)
- `user-menu.stories.tsx` (new)
- `command-palette.stories.tsx` (new)
- `notification-center.stories.tsx` (new)
- `notification-service.stories.tsx` (new)

### 12. Welcome & Onboarding (`/stories/12-onboarding/`)
**Purpose**: User onboarding flow
- `welcome-card.stories.tsx` (existing, move)
- `welcome-mat.stories.tsx` (existing, move)
- `school-search-input.stories.tsx` (existing, move)
- `waitlist-form.stories.tsx` (existing, move)
- `onboarding-flow-showcase.stories.tsx` (existing, move)

### 13. Analytics (`/stories/13-analytics/`)
**Purpose**: Analytics and reporting
- `analytics-dashboard.stories.tsx` (existing, move)

### 14. Utilities (`/stories/14-utilities/`)
**Purpose**: Utility components
- `error-boundary.stories.tsx` (new)
- `theme-provider.stories.tsx` (new)

### 15. Examples & Patterns (`/stories/15-examples/`)
**Purpose**: Complete examples and patterns
- `auth-enhanced.stories.tsx` (existing, move)
- `complete-workflows.stories.tsx` (new)

## Implementation Strategy

### **Core-First Implementation Phases**

### Phase 1: Structure Setup (Core Functionality)
1. Create new directory structure
2. Move existing stories to appropriate locations
3. Update import paths
4. Focus on functional component stories

### Phase 2: Fill Critical Gaps (Essential Coverage)
1. Create stories for all UI components
2. Create stories for core Hive components
3. Create stories for feed system
4. Prioritize working examples over polish

### Phase 3: Complete Coverage (Full Functionality)
1. Create stories for shell components
2. Create stories for creator tools
3. Create stories for surface components
4. Ensure all components have basic stories

### Phase 4: UI/UX Polish & Consistency (Design System Showcase)
1. Standardize story patterns
2. Add comprehensive documentation
3. Test all stories
4. Advanced design system demonstrations
5. Premium interaction showcases

### **Parallel AI Collaboration**
- Different AI sessions can work on different story categories simultaneously
- Shared naming conventions ensure consistency across parallel development
- Core functionality stories prioritized over visual polish

## Naming Conventions

### File Naming
- Use kebab-case: `hive-button.stories.tsx`
- Include category prefix in folder: `03-ui/button.stories.tsx`

### Story Naming
- Use PascalCase for component names
- Use descriptive variant names
- Group related variants

### Story Structure
```typescript
export default {
  title: 'Category/Component Name',
  component: ComponentName,
  parameters: {
    docs: { description: { component: 'Component description' } }
  }
}

export const Default = {}
export const Variants = {}
export const Interactive = {}
```

## Success Metrics
- [ ] 100% component coverage
- [ ] Consistent organization
- [ ] Clear documentation
- [ ] Working Storybook build
- [ ] Easy component discovery