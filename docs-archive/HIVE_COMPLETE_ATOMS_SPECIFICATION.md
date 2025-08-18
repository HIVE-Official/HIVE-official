# HIVE Complete Atoms Specification

## 📋 **All Atoms Required for Complete HIVE Atomic Design System**

This document defines every atomic component needed to build any UI pattern across all 7 HIVE systems (Profile, Spaces, Tools, HiveLab, Auth, Feed, Rituals).

---

## ✅ **BUILT ATOMS** (25 components) - COMPLETE!

### **Core Foundation** (5 components)
- ✅ `button.tsx` - Primary, secondary, ghost, destructive variants with loading states
- ✅ `input.tsx` - Text inputs with validation, icons, password toggle
- ✅ `text.tsx` - Complete typography (display-2xl → body-2xs scales)
- ✅ `icon.tsx` - Icon system with sizes, colors, variants
- ✅ `link.tsx` - Navigation links with external, button, underline variants

### **User Interface** (2 components)
- ✅ `avatar.tsx` - User avatars with status indicators, fallbacks, sizes
- ✅ `badge.tsx` - Status badges with counts, dots, variants

### **Form Controls** (8 components)
- ✅ `label.tsx` - Form labels with required indicators, floating variants
- ✅ `textarea.tsx` - Multi-line text inputs with character counting
- ✅ `select.tsx` - Dropdown selections with search, multi-select, clearable
- ✅ `radio.tsx` - Radio button groups with card variants
- ✅ `checkbox.tsx` - Checkboxes with indeterminate, card variants
- ✅ `switch.tsx` - Toggle switches with ghost variant
- ✅ `slider.tsx` - Range sliders with marks, vertical orientation
- ✅ `file-input.tsx` - File upload with dropzone, preview, validation

### **Feedback & Status** (4 components)
- ✅ `spinner.tsx` - Loading spinners (spin, pulse, bounce variants)
- ✅ `skeleton.tsx` - Loading placeholders with text, avatar, card compositions
- ✅ `progress.tsx` - Progress bars with linear/circular, animated variants
- ✅ `status-indicator.tsx` - Status dots with pulse, glow, positioning

### **Content & Media** (3 components)
- ✅ `tag.tsx` - Content tags with remove, interactive, gradient variants
- ✅ `image.tsx` - Responsive images with fallbacks, aspect ratios
- ✅ `tooltip.tsx` - Hover tooltips with placement, triggers, variants

### **Layout & Structure** (3 components)
- ✅ `separator.tsx` - Visual dividers with orientations, styles
- ✅ `spacer.tsx` - Flexible spacing with responsive, debug modes  
- ✅ `container.tsx` - Layout containers with breakpoints, variants

---

## 🎉 **ATOMIC SYSTEM COMPLETE!**

All 25 essential atomic components have been successfully built and integrated into the HIVE design system. The complete atomic foundation now provides every building block needed to construct any UI pattern across all 7 HIVE systems.

### **Achievement Summary**
✅ **25/25 Atoms Built** - Complete atomic design system  
✅ **Enhanced HIVE Design Tokens** - Zero hard-coded values  
✅ **Mobile-First Responsive** - Touch-optimized interactions  
✅ **WCAG 2.1 AA Compliant** - Full accessibility support  
✅ **Consistent APIs** - Predictable component interfaces  
✅ **TypeScript Complete** - Full type safety and IntelliSense  

### **Next Phase: Molecular Components**

With the atomic foundation complete, HIVE can now build sophisticated molecules:
- **Form Molecules**: LoginForm, SearchBox, FilterPanel
- **Navigation Molecules**: Breadcrumbs, Pagination, TabNavigation  
- **Card Molecules**: UserCard, StatsCard, MediaCard
- **Interaction Molecules**: CommandPalette, ContextMenu, DatePicker

---

## 📖 **ARCHIVED SPECIFICATION** (Reference Only)
interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inline' | 'floating';
  children: React.ReactNode;
}

// 2. textarea.tsx - Multi-line text inputs
interface TextareaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  error?: string;
  variant?: 'default' | 'ghost' | 'filled';
}

// 3. separator.tsx - Visual dividers and spacers
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

// 4. tag.tsx - Content tags with remove functionality
interface TagProps {
  variant?: 'default' | 'outline' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}
```

### **🎛️ Form Control Atoms** (4 components)
```typescript
// 5. radio.tsx - Radio button groups
interface RadioProps {
  name: string;
  value: string;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  error?: string;
}

// 6. select.tsx - Dropdown select menus
interface SelectProps {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'filled';
  error?: string;
}

// 7. slider.tsx - Range sliders for numeric input
interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  range?: boolean;
  marks?: Record<number, string>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
  disabled?: boolean;
}

// 8. file-input.tsx - File upload inputs
interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  preview?: boolean;
  variant?: 'default' | 'dropzone' | 'button';
  size?: 'sm' | 'md' | 'lg';
  error?: string;
}
```

### **📊 Feedback & Status Atoms** (3 components)
```typescript
// 9. progress.tsx - Progress bars and indicators
interface ProgressProps {
  value?: number;
  max?: number;
  variant?: 'default' | 'gradient' | 'striped' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  animated?: boolean;
}

// 10. status-indicator.tsx - Status dots and lights
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'busy' | 'error' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'pulse' | 'glow';
  label?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// 11. tooltip.tsx - Hover tooltips and popovers
interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  arrow?: boolean;
  variant?: 'default' | 'dark' | 'light';
  children: React.ReactElement;
}
```

### **🖼️ Media & Layout Atoms** (3 components)
```typescript
// 12. image.tsx - Responsive images with fallbacks
interface ImageProps {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'photo' | number;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'skeleton';
  sizes?: string;
  priority?: boolean;
}

// 13. spacer.tsx - Flexible spacing elements
interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'horizontal' | 'vertical' | 'both';
  responsive?: boolean;
  className?: string;
}

// 14. container.tsx - Layout containers with responsive behavior
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
  fluid?: boolean;
  breakout?: boolean;
  children: React.ReactNode;
}
```

---

## 🎯 **Atom Categories Breakdown**

### **Essential Foundation** (11 built + 14 needed = 25 total)
```
✅ Built (11):     button, input, text, icon, link, avatar, badge, spinner, skeleton, checkbox, switch
❌ Needed (14):    label, textarea, separator, tag, radio, select, slider, file-input, 
                   progress, status-indicator, tooltip, image, spacer, container
```

### **By Usage Priority**

#### **🔥 Critical Priority** (Must build first - 7 atoms)
1. `label.tsx` - Required for all forms
2. `textarea.tsx` - Multi-line text input
3. `select.tsx` - Dropdown selections
4. `radio.tsx` - Option selections
5. `separator.tsx` - Visual organization
6. `image.tsx` - Media display
7. `tooltip.tsx` - Information overlay

#### **⚡ High Priority** (Build second - 4 atoms)
8. `progress.tsx` - Loading and completion states
9. `status-indicator.tsx` - Real-time status
10. `tag.tsx` - Content categorization
11. `slider.tsx` - Numeric input ranges

#### **📈 Medium Priority** (Build third - 3 atoms)
12. `file-input.tsx` - File uploads
13. `spacer.tsx` - Layout spacing
14. `container.tsx` - Layout structure

---

## 🏗️ **Implementation Requirements**

### **Design Token Integration**
Every atom MUST use enhanced HIVE design tokens:
```typescript
// ✅ Required token usage
className="bg-hive-gold text-hive-obsidian border-hive-border-default"

// ❌ No hard-coded values allowed
className="bg-[#FFD700] text-[#0A0A0B] border-[#3F3F46]"
```

### **Mobile-First Responsive**
Every atom MUST support:
- **44px minimum touch targets** for interactive elements
- **Progressive enhancement** from mobile → desktop
- **Responsive sizing** with breakpoint awareness
- **Touch-friendly interactions** with proper feedback

### **Accessibility Standards**
Every atom MUST include:
- **WCAG 2.1 AA compliance** with proper contrast ratios
- **Screen reader support** with ARIA labels and descriptions
- **Keyboard navigation** for all interactive elements
- **Focus management** with visible focus indicators

### **Consistent API Patterns**
Every atom MUST follow:
- **Variant-based styling** (default, ghost, filled, etc.)
- **Size scaling** (xs, sm, md, lg, xl, 2xl)
- **Error state handling** with validation display
- **Loading state support** where applicable

---

## 🎨 **Design System Requirements**

### **Color Variants**
Standard color props across atoms:
```typescript
color?: 'primary' | 'secondary' | 'muted' | 'gold' | 'ruby' | 'emerald' | 'sapphire'
```

### **Size System**
Consistent sizing across atoms:
```typescript
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Mapped to specific dimensions:
xs: 12px   sm: 16px   md: 20px   lg: 24px   xl: 32px   2xl: 40px
```

### **Variant System**
Standard variants across atoms:
```typescript
variant?: 'default' | 'ghost' | 'filled' | 'outline' | 'minimal'
```

---

## 🚀 **Success Criteria**

When all 25 atoms are complete, HIVE will have:

✅ **Complete Foundation**: Every UI pattern can be built from atomic components  
✅ **Zero Hard-coded Values**: All atoms use enhanced HIVE design tokens  
✅ **Mobile-First Excellence**: Touch-optimized interactions across all atoms  
✅ **Accessibility Compliance**: WCAG 2.1 AA across the entire atomic system  
✅ **Cross-System Consistency**: Same atoms work across all 7 HIVE systems  
✅ **Developer Experience**: Predictable APIs and composition patterns  

**This complete atomic foundation will enable building ANY UI pattern needed across the entire HIVE platform with perfect consistency and professional quality.**