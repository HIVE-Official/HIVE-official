# HIVE Design System Foundation Guide

## **Philosophy: Students as Builders, Not Just Users**

The HIVE design system empowers students to create, collaborate, and innovate on campus. Every component, interaction, and pattern serves this core philosophy.

---

## **🎨 Visual Identity**

### **Dark Luxury Campus Infrastructure**
- **Primary Aesthetic**: Matte obsidian glass with liquid metal motion
- **Feel**: Substantial, trustworthy, premium campus infrastructure
- **Inspiration**: High-end hardware meets academic excellence
- **Emotion**: Confidence, capability, innovation

### **Color Philosophy**
```css
/* Primary Brand Colors */
--hive-brand-primary: #FFD700;     /* Gold - Achievement, excellence */
--hive-brand-secondary: #F7E98E;   /* Champagne - Sophistication */
--hive-brand-accent: #FFA500;      /* Amber - Energy, creativity */
--hive-brand-muted: #CD7F32;       /* Bronze - Heritage, foundation */

/* Background Hierarchy */
--hive-background-primary: #0A0A0B;    /* Obsidian - Base canvas */
--hive-background-secondary: #111113;  /* Charcoal - Elevated surfaces */
--hive-background-tertiary: #1A1A1C;   /* Graphite - Highest elevation */

/* Text Hierarchy */
--hive-text-primary: #E5E5E7;      /* Platinum - Primary content */
--hive-text-secondary: #C1C1C4;    /* Silver - Secondary content */
--hive-text-muted: #9B9B9F;        /* Mercury - Muted content */
--hive-text-disabled: #6B6B70;     /* Pewter - Disabled states */
```

---

## **📐 Design Tokens**

### **Semantic Token System**
All components MUST use semantic tokens, never hardcoded values:

```typescript
// ✅ CORRECT - Semantic tokens
className="bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"

// ❌ INCORRECT - Hardcoded values
className="bg-[#111113] text-[#E5E5E7]"
```

### **Token Categories**

#### **Background Tokens**
```css
--hive-background-primary      /* Main canvas */
--hive-background-secondary    /* Cards, panels */
--hive-background-tertiary     /* Elevated elements */
--hive-background-interactive  /* Hover states */
--hive-background-overlay      /* Overlays, modals */
```

#### **Text Tokens**
```css
--hive-text-primary     /* Headlines, primary content */
--hive-text-secondary   /* Supporting text */
--hive-text-muted       /* Metadata, labels */
--hive-text-disabled    /* Disabled states */
--hive-text-inverse     /* Text on dark backgrounds */
```

#### **Border Tokens**
```css
--hive-border-subtle        /* Subtle divisions */
--hive-border-primary       /* Standard borders */
--hive-border-secondary     /* Emphasized borders */
--hive-border-gold          /* Gold accents */
--hive-border-gold-strong   /* Strong gold emphasis */
--hive-border-focus         /* Focus states */
```

#### **Status Tokens**
```css
--hive-status-success   /* Success states */
--hive-status-warning   /* Warning states */
--hive-status-error     /* Error states */
--hive-status-info      /* Information states */
```

---

## **🏗️ Component Architecture**

### **Component Hierarchy**
```
HiveComponent (Base)
├── HiveEntityComponent (Courses, Spaces, Users)
├── HiveInteractionComponent (Buttons, Forms)
├── HiveLayoutComponent (Cards, Containers)
└── HiveUtilityComponent (Badges, Icons)
```

### **Required Component Structure**
Every component must include:

1. **TypeScript Interface**
```typescript
export interface HiveComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof hiveComponentVariants> {
  // Component-specific props
}
```

2. **CVA Variants**
```typescript
const hiveComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        premium: "premium-styles",
        elevated: "elevated-styles",
        minimal: "minimal-styles",
      },
      size: {
        sm: "small-styles",
        default: "default-styles",
        lg: "large-styles",
        xl: "extra-large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

3. **ForwardRef Implementation**
```typescript
const HiveComponent = React.forwardRef<HTMLElement, HiveComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Element
        ref={ref}
        className={cn(hiveComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

HiveComponent.displayName = "HiveComponent";
```

---

## **🎭 Standard Variants**

### **Required Variants for All Components**
Every component must support these base variants:

```typescript
variant: {
  default: "Standard HIVE styling",
  premium: "Gold accents, enhanced features",
  elevated: "Raised appearance, stronger borders",
  minimal: "Clean, reduced styling",
}

size: {
  sm: "Compact sizing",
  default: "Standard sizing", 
  lg: "Large sizing",
  xl: "Extra large sizing",
}
```

### **Conditional Variants**
Add these when applicable:

```typescript
// For interactive components
interactive: boolean;
selected: boolean;
disabled: boolean;

// For status components
status: 'success' | 'warning' | 'error' | 'info';

// For campus entities
entityType: 'course' | 'space' | 'user' | 'tool';
```

---

## **🎬 Motion System**

### **Liquid Metal Motion Philosophy**
- **Smooth, premium feel** with subtle bounce
- **Hardware-accelerated** animations
- **Respects user preferences** (prefers-reduced-motion)
- **Consistent timing** across all components

### **Standard Motion Patterns**
```typescript
// Hover states
whileHover={{ scale: 1.02, y: -2 }}

// Active states  
whileTap={{ scale: 0.98 }}

// Entrance animations
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
```

### **Motion Durations**
```css
--hive-duration-instant: 0.1s;      /* Immediate feedback */
--hive-duration-quick: 0.2s;        /* Quick interactions */
--hive-duration-smooth: 0.4s;       /* Standard animations */
--hive-duration-flowing: 0.6s;      /* Flowing transitions */
--hive-duration-dramatic: 0.8s;     /* Dramatic effects */
--hive-duration-orchestrated: 1.2s; /* Complex sequences */
```

---

## **🎯 Campus Integration Patterns**

### **Entity Linking**
Components should support linking to campus entities:

```typescript
// Course references
onCourseClick?: (courseId: string) => void;

// Space references  
onSpaceClick?: (spaceId: string) => void;

// User references
onUserClick?: (userId: string) => void;

// Tool references
onToolClick?: (toolId: string) => void;
```

### **Campus-Specific Variants**
```typescript
campusVariant: {
  academic: "Academic context styling",
  social: "Social space styling", 
  builder: "Builder/creator styling",
  administrative: "Administrative styling",
}
```

### **Campus Data Integration**
```typescript
// Campus context
campusContext?: {
  userId: string;
  userRole: 'student' | 'instructor' | 'admin';
  currentSpaces: string[];
  currentCourses: string[];
};
```

---

## **📱 Responsive Design**

### **Breakpoint System**
```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
}

@media (min-width: 640px) {
  /* sm: Small tablets */
}

@media (min-width: 768px) {
  /* md: Tablets */
}

@media (min-width: 1024px) {
  /* lg: Laptops */
}

@media (min-width: 1280px) {
  /* xl: Desktops */
}
```

### **Responsive Variants**
```typescript
// Size variants should adapt
size: {
  sm: "p-2 text-sm sm:p-3 md:p-4",
  default: "p-4 text-base sm:p-6 md:p-8", 
  lg: "p-6 text-lg sm:p-8 md:p-10",
  xl: "p-8 text-xl sm:p-10 md:p-12",
}
```

---

## **♿ Accessibility Standards**

### **Required Accessibility Features**
1. **Semantic HTML** - Use proper HTML elements
2. **ARIA Labels** - Provide screen reader context
3. **Keyboard Navigation** - Full keyboard support
4. **Focus Management** - Visible focus indicators
5. **Color Contrast** - WCAG AA compliance

### **Accessibility Implementation**
```typescript
// Required props
'aria-label'?: string;
'aria-describedby'?: string;
'aria-expanded'?: boolean;
'aria-selected'?: boolean;
'aria-disabled'?: boolean;

// Focus management
const [focusedIndex, setFocusedIndex] = useState(0);

// Keyboard handling
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      // Handle activation
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      // Handle navigation
      break;
    case 'Escape':
      // Handle dismissal
      break;
  }
};
```

---

## **🔧 Development Guidelines**

### **File Structure**
```
src/components/
├── hive-component.tsx           # Main component
├── hive-component.stories.tsx   # Storybook stories  
├── hive-component.test.tsx      # Unit tests
└── index.ts                     # Exports
```

### **Import Patterns**
```typescript
// Standard imports
import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// HIVE motion system
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';

// Icons (Lucide React)
import { Icon } from 'lucide-react';
```

### **Performance Requirements**
- **Bundle size**: < 20KB gzipped per component
- **Render time**: < 16ms for 60fps
- **Memory usage**: Minimal memory leaks
- **Accessibility**: 100% keyboard navigable

---

## **📚 Storybook Documentation**

### **Required Stories**
Every component must have these stories:

1. **Default** - Basic component usage
2. **Variants** - All variant combinations
3. **Sizes** - All size variations
4. **States** - Interactive states and edge cases
5. **Campus Integration** - Campus-specific features
6. **Accessibility** - Keyboard navigation demo
7. **Performance** - Large dataset handling
8. **Playground** - Interactive controls

### **Story Structure**
```typescript
export const Default: Story = {
  render: () => {
    return (
      <div className="w-96 p-6 bg-[#0A0A0B] rounded-lg">
        <HiveComponent />
      </div>
    );
  },
};
```

---

## **🎨 Design System Evolution**

### **Evolution Principles**
1. **Every component improves the system**
2. **Maintain backward compatibility**
3. **Document all changes**
4. **Consistent API evolution**
5. **Performance improvements**

### **When to Update the System**
- **New interaction patterns** discovered
- **Performance optimizations** found
- **Accessibility improvements** needed
- **Campus integration** enhancements
- **Token refinements** required

---

## **🚀 Component Checklist**

Before marking a component as complete:

- [ ] **TypeScript interfaces** defined
- [ ] **CVA variants** implemented  
- [ ] **Semantic tokens** used exclusively
- [ ] **Forwardref** implemented
- [ ] **Motion system** integrated
- [ ] **Campus integration** supported
- [ ] **Accessibility** features complete
- [ ] **Responsive design** implemented
- [ ] **Storybook stories** created
- [ ] **Performance** optimized
- [ ] **Tests** written
- [ ] **Documentation** updated

---

## **📖 Usage Examples**

### **Basic Component Usage**
```typescript
import { HiveButton } from '@hive/ui';

<HiveButton
  variant="premium"
  size="lg"
  interactive
  onClick={handleClick}
>
  Enroll in Course
</HiveButton>
```

### **Campus Integration**
```typescript
import { HiveCourseCard } from '@hive/ui';

<HiveCourseCard
  course={courseData}
  onEnroll={handleEnroll}
  onViewSpace={handleViewSpace}
  campusContext={userContext}
/>
```

### **Advanced Customization**
```typescript
import { HiveCard, HiveCardHeader, HiveCardContent } from '@hive/ui';

<HiveCard
  variant="elevated"
  size="lg"
  goldAccent
  magneticHover
  animateEntrance="cascade"
  cascadeIndex={index}
>
  <HiveCardHeader>
    <HiveCardTitle>Custom Card</HiveCardTitle>
  </HiveCardHeader>
  <HiveCardContent>
    Custom content here
  </HiveCardContent>
</HiveCard>
```

---

**This foundation guide ensures every component built in the HIVE system follows consistent patterns, maintains the dark luxury aesthetic, and serves the core philosophy of empowering students as builders.**