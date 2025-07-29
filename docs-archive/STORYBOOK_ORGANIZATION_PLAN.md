# HIVE Storybook Organization Plan

## 🎯 **Current Issues & Cleanup Strategy**

### **Problems Found:**
1. **Inconsistent numbering** - Mix of numbered and unnumbered sections
2. **Component placement confusion** - `03-ui/` vs `04-hive/` unclear boundaries  
3. **Profile components scattered** - Split between `profile/` and other sections
4. **Story quality varies** - From minimal to comprehensive
5. **Missing atomic hierarchy** - No clear atoms → molecules → organisms structure

---

## 🏗️ **New Clean Organization Structure**

### **Phase 1: Reorganize Existing (Don't Delete)**
```
00-overview/              # Keep as-is (design system docs)
01-foundation/           # Keep as-is (tokens, motion, themes)
02-atoms/               # NEW: Basic building blocks
03-molecules/           # NEW: Combined atoms  
04-organisms/           # NEW: Complex components
05-templates/           # NEW: Layout templates
06-pages/              # NEW: Full page examples
07-hive-features/      # REORGANIZED: All HIVE-specific features
08-edge-cases/         # RENAMED from 99-edge-cases
```

### **Phase 2: Atomic Stories Structure**
```
02-atoms/
├── core-foundation/
│   ├── button.stories.tsx          # Enhanced existing
│   ├── input.stories.tsx           # Enhanced existing  
│   ├── text.stories.tsx            # Enhanced existing
│   ├── icon.stories.tsx            # Enhanced existing
│   └── link.stories.tsx            # NEW
├── form-controls/
│   ├── label.stories.tsx           # NEW
│   ├── textarea.stories.tsx        # NEW
│   ├── select.stories.tsx          # NEW
│   ├── radio.stories.tsx           # NEW
│   ├── checkbox.stories.tsx        # Enhanced existing
│   ├── switch.stories.tsx          # Enhanced existing
│   ├── slider.stories.tsx          # NEW
│   └── file-input.stories.tsx      # NEW
├── feedback-status/
│   ├── spinner.stories.tsx         # Enhanced existing
│   ├── skeleton.stories.tsx        # Enhanced existing
│   ├── progress.stories.tsx        # NEW
│   └── status-indicator.stories.tsx # NEW
├── content-media/
│   ├── avatar.stories.tsx          # Enhanced existing
│   ├── badge.stories.tsx           # Enhanced existing
│   ├── tag.stories.tsx             # NEW
│   ├── image.stories.tsx           # NEW
│   └── tooltip.stories.tsx         # NEW
└── layout-structure/
    ├── separator.stories.tsx       # NEW
    ├── spacer.stories.tsx          # NEW
    └── container.stories.tsx       # NEW
```

---

## 📋 **Story Template Standards**

### **Consistent Story Pattern:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../../atomic/atoms/component-name';

const meta: Meta<typeof ComponentName> = {
  title: '02-atoms/category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Brief description with usage guidelines.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Consistent argType patterns
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard story types for every component:
export const Default: Story = { /* basic usage */ };
export const Variants: Story = { /* all variants showcase */ };
export const Sizes: Story = { /* all sizes showcase */ };
export const Colors: Story = { /* all colors showcase */ };
export const States: Story = { /* disabled, loading, error, etc */ };
export const Interactive: Story = { /* interactive demo */ };
export const KitchenSink: Story = { /* everything combined */ };
```

---

## 🎨 **Quality Standards for Each Story**

### **Must Have:**
1. **Default story** - Basic usage with good defaults
2. **Variants showcase** - All variant options displayed
3. **Interactive controls** - Storybook controls for all props
4. **Documentation** - Clear descriptions and usage notes
5. **Accessibility notes** - Screen reader behavior, keyboard navigation
6. **Design tokens usage** - Show how HIVE tokens are used

### **Should Have:**
7. **Edge cases** - Empty states, long content, error conditions
8. **Mobile preview** - How it looks/behaves on mobile
9. **Dark mode** - If applicable to the component
10. **Composition examples** - How to combine with other atoms

### **Nice to Have:**
11. **Animation demos** - Show transitions and micro-interactions
12. **Performance notes** - When to use, best practices
13. **Code examples** - Copy-paste usage examples

---

## 🔄 **Migration Strategy**

### **Step 1: Create New Structure (Don't Break Existing)**
- Create `02-atoms/` directory structure
- Build comprehensive atomic stories
- Ensure all new stories follow template

### **Step 2: Enhance Existing Stories**
- Upgrade basic stories to match new quality standards
- Add missing variants and interactive controls
- Improve documentation

### **Step 3: Reorganize Gradually**
- Move profile components to organized sections
- Consolidate scattered components
- Update internal references

### **Step 4: Clean References**
- Update any hardcoded story paths
- Ensure navigation works smoothly
- Test all story functionality

---

## 🎯 **Success Metrics**

✅ **Organization**: Clear atomic hierarchy visible in Storybook nav  
✅ **Consistency**: All atomic stories follow same pattern  
✅ **Quality**: Every atom has comprehensive examples  
✅ **Documentation**: Clear usage guidelines for each component  
✅ **Accessibility**: Screen reader and keyboard usage documented  
✅ **Interactivity**: All props controllable via Storybook controls  

---

## 🚀 **Immediate Actions**

1. **Create atomic story structure** (today)
2. **Build 5 high-quality example stories** (reference pattern)
3. **Create remaining atomic stories** (systematic completion)
4. **Enhance existing basic stories** (upgrade quality)
5. **Test full Storybook experience** (end-to-end validation)

This plan maintains all existing work while creating a world-class atomic design system showcase in Storybook.