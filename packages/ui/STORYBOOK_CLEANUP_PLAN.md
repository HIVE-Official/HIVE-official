# HIVE Storybook Cleanup & Standardization Plan

## ✅ **COMPLETED CLEANUP**
- Removed `_storybook-backup-20250823/` (root level)
- Removed `packages/ui/stories-backup/` 
- Removed `packages/ui/src/stories/_backup-20250823/`
- Removed scattered `src/stories/` directory

## 🎯 **STANDARDIZED STRUCTURE**

### **Source of Truth: `packages/ui/.storybook/`**
This is the ONLY Storybook configuration that matters.

### **Story Organization: `packages/ui/src/stories/`**

```
01-Foundation/          # Design tokens, brand assets, principles
02-Atoms/              # Basic UI building blocks
03-Molecules/          # Component combinations
04-Organisms/          # Complex UI sections
05-Templates/          # Page layouts and templates
06-Patterns/           # Reusable design patterns
07-Systems/            # Complete integrated systems
```

## 📋 **COMPONENT COVERAGE AUDIT**

### **ATOMS** (Basic building blocks)
✅ **Have Stories:**
- Avatar
- Button  
- Container
- Image
- Platform Icons
- Profile Atoms
- Separator
- Skeleton
- Slider
- Spinner
- Tabs
- Toast
- Tooltip
- Typography

❌ **Missing Stories:**
- Badge
- Checkbox (enhanced & standard)
- File Input
- Hive Brand
- Icon
- Input
- Label
- Link
- Navigation Preferences
- Progress
- Radio (enhanced & standard)
- Select (all variants)
- Sidebar
- Space Category Card
- Spacer
- Status Indicator
- Switch (enhanced & standard)
- Tag
- Text
- Textarea (enhanced & standard)

### **MOLECULES** (Component combinations)
✅ **Have Stories:**
- Form Field (atomic)
- Search Bar (atomic)
- User Item (atomic)

❌ **Missing Stories:**
- Avatar Card
- Campus Activity Feed
- Campus Builder Tools
- Campus Identity Header
- Campus Spaces Card
- Card
- Email Input
- Form Comprehensive
- Hive Navigation
- Milestone Celebration
- Navigation Variants
- Planted Tool Widget
- Post Board
- Profile Header
- Profile Stats
- Ritual Action Button
- User Card

### **ORGANISMS** (Complex UI sections)
✅ **Have Stories:**
- Auth Onboarding Complete
- Feed Tools Complete
- Spaces Profile Complete

❌ **Missing Stories:**
- Activity Feed
- Header
- Hive Space Card
- Locked Feed Skeleton
- Post Creation Modal
- Profile Dashboard
- Profile System
- All Profile Widgets (Activity, Avatar, Calendar, etc.)
- Ritual Workflows
- Rituals Hub
- Space Components
- Tool Components
- Unified Profile Dashboard

## 🛠️ **ACTION PLAN**

### Phase 1: Structure Standardization ✅ **COMPLETE**
- Clean up duplicate directories
- Establish single source of truth

### Phase 2: Missing Story Creation (Next)
1. Create stories for all missing atoms
2. Create stories for all missing molecules  
3. Create stories for all missing organisms
4. Ensure all stories follow naming conventions

### Phase 3: Documentation Update
1. Update Storybook configuration
2. Create comprehensive design system docs
3. Add interaction testing
4. Add accessibility testing

## 📝 **NAMING CONVENTIONS**

### **File Naming:**
```
ComponentName.stories.tsx
```

### **Story Structure:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../atomic/[level]/component-name';

const meta: Meta<typeof ComponentName> = {
  title: '[Level]/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## 🎯 **SUCCESS CRITERIA**

1. ✅ All backup directories removed
2. ✅ Single Storybook configuration
3. ⏳ Every component has a corresponding story
4. ⏳ All stories follow naming conventions
5. ⏳ Stories organized by atomic design hierarchy
6. ⏳ Comprehensive documentation
7. ⏳ Interactive testing enabled
8. ⏳ Accessibility testing included

## 📊 **CURRENT STATUS: 25% Complete**

**NEXT PRIORITY**: Create missing component stories to achieve 100% coverage