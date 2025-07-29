# HIVE Component Development Standards

## **Component Development Lifecycle**

### **1. Planning Phase**
- [ ] **Design System Audit** - Review existing patterns
- [ ] **Component Specification** - Define requirements and API
- [ ] **Campus Integration** - Identify campus-specific features
- [ ] **Accessibility Requirements** - Plan keyboard navigation and screen reader support
- [ ] **Performance Targets** - Set bundle size and render benchmarks

### **2. Development Phase**
- [ ] **TypeScript Interfaces** - Define comprehensive prop types
- [ ] **CVA Variants** - Implement consistent variant system
- [ ] **Semantic Tokens** - Use only HIVE design tokens
- [ ] **Motion Integration** - Add liquid metal animations
- [ ] **Campus Features** - Integrate campus-specific functionality
- [ ] **Accessibility Implementation** - Add ARIA and keyboard support

### **3. Testing Phase**
- [ ] **Unit Tests** - Test component logic and interactions
- [ ] **Visual Regression** - Ensure consistent appearance
- [ ] **Accessibility Testing** - Verify keyboard navigation and screen readers
- [ ] **Performance Testing** - Measure bundle size and render time
- [ ] **Integration Testing** - Test campus integrations

### **4. Documentation Phase**
- [ ] **Storybook Stories** - Create comprehensive documentation
- [ ] **API Documentation** - Document all props and methods
- [ ] **Usage Examples** - Provide practical implementation examples
- [ ] **Migration Guide** - Document breaking changes if any

### **5. Deployment Phase**
- [ ] **Code Review** - Peer review for quality and consistency
- [ ] **Design System Update** - Update central documentation
- [ ] **Export Configuration** - Add to component exports
- [ ] **Version Update** - Increment package version

---

## **📁 File Structure Standards**

### **Component File Organization**
```
src/components/
├── hive-component/
│   ├── hive-component.tsx           # Main component
│   ├── hive-component.test.tsx      # Unit tests
│   ├── hive-component.stories.tsx   # Storybook stories
│   ├── hive-component.types.ts      # Type definitions
│   └── index.ts                     # Exports
├── hive-component.tsx               # Simple components (single file)
└── index.ts                         # Main exports
```

### **Naming Conventions**
```typescript
// Component names - PascalCase with Hive prefix
HiveButton, HiveCourseCard, HiveMultiSelect

// File names - kebab-case with hive prefix  
hive-button.tsx, hive-course-card.tsx, hive-multi-select.tsx

// Props interfaces - ComponentProps suffix
HiveButtonProps, HiveCourseCardProps, HiveMultiSelectProps

// Variants - camelCase with component prefix
hiveButtonVariants, hiveCourseCardVariants, hiveMultiSelectVariants

// CSS classes - kebab-case with hive prefix
.hive-button, .hive-course-card, .hive-multi-select
```

---

## **🔧 Required Dependencies**

### **Core Dependencies**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "framer-motion": "^10.0.0",
  "class-variance-authority": "^0.7.0",
  "lucide-react": "^0.300.0",
  "tailwindcss": "^3.3.0"
}
```

### **Standard Imports**
```typescript
// Required for all components
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Motion (when needed)
import { motion } from 'framer-motion';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';

// Icons (when needed)
import { IconName } from 'lucide-react';
```

---

## **📝 TypeScript Standards**

### **Component Props Interface**
```typescript
export interface HiveComponentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof hiveComponentVariants> {
  
  // Base props
  className?: string;
  children?: React.ReactNode;
  
  // Interaction props
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  
  // Motion props
  animateEntrance?: 'fade' | 'slideUp' | 'cascade' | 'liquidMetal' | false;
  cascadeIndex?: number;
  magneticHover?: boolean;
  
  // Campus props
  campusContext?: CampusContext;
  
  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  // Accessibility props
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  
  // Component-specific props
  // ... add component-specific props here
}
```

### **Generic Type Support**
```typescript
// For components that handle generic data
export interface HiveDataComponentProps<T = any> {
  data: T[];
  onItemSelect?: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor?: (item: T) => string;
}
```

### **Campus Entity Types**
```typescript
// Standard campus entity interface
export interface CampusEntity {
  id: string;
  type: 'course' | 'space' | 'user' | 'tool' | 'project';
  name: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending';
  metadata?: Record<string, any>;
}

// Campus context interface
export interface CampusContext {
  userId: string;
  userRole: 'student' | 'instructor' | 'admin';
  currentSpaces: string[];
  currentCourses: string[];
  permissions: string[];
}
```

---

## **🎨 CVA Variants Standards**

### **Required Base Variants**
```typescript
const hiveComponentVariants = cva(
  // Base classes - always include semantic tokens
  "relative transition-all duration-300 will-change-transform",
  {
    variants: {
      // Visual hierarchy - REQUIRED for all components
      variant: {
        default: "bg-[var(--hive-background-secondary)] border-[var(--hive-border-subtle)]",
        premium: "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] to-[var(--hive-background-secondary)] border-[var(--hive-border-gold)]",
        elevated: "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-primary)]",
        minimal: "bg-transparent border-[var(--hive-border-subtle)]",
      },
      
      // Size variants - REQUIRED for all components
      size: {
        sm: "p-2 text-sm",
        default: "p-4 text-base",
        lg: "p-6 text-lg", 
        xl: "p-8 text-xl",
      },
      
      // Campus variants - OPTIONAL, add when relevant
      campusVariant: {
        academic: "border-[var(--hive-status-info)]",
        social: "border-[var(--hive-status-success)]",
        builder: "border-[var(--hive-border-gold)]",
        administrative: "border-[var(--hive-border-primary)]",
      },
      
      // State variants - OPTIONAL, add when interactive
      state: {
        default: "",
        hover: "hover:border-[var(--hive-border-gold)]",
        active: "bg-[var(--hive-overlay-gold-subtle)]",
        selected: "border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### **Compound Variants**
```typescript
// Use compound variants for complex interactions
const hiveComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ },
      interactive: { true: "cursor-pointer", false: "" },
    },
    compoundVariants: [
      {
        variant: "premium",
        interactive: true,
        class: "hover:shadow-[var(--hive-shadow-gold-glow)]",
      },
      {
        variant: ["elevated", "premium"],
        size: ["lg", "xl"],
        class: "shadow-[var(--hive-shadow-level3)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);
```

---

## **🎬 Motion Standards**

### **Required Motion Configurations**
```typescript
// Standard hover/tap animations
const standardMotion = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
};

// Entrance animations
const entranceAnimations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  cascade: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.1 },
  }),
};
```

### **Motion Implementation Pattern**
```typescript
const HiveComponent = React.forwardRef<HTMLDivElement, HiveComponentProps>(
  ({ animateEntrance = false, cascadeIndex = 0, ...props }, ref) => {
    
    // Generate motion props
    const motionProps = useMemo(() => {
      const base = standardMotion;
      
      if (animateEntrance) {
        const entrance = animateEntrance === 'cascade' 
          ? entranceAnimations.cascade(cascadeIndex)
          : entranceAnimations[animateEntrance];
        return { ...base, ...entrance };
      }
      
      return base;
    }, [animateEntrance, cascadeIndex]);
    
    return (
      <motion.div ref={ref} {...motionProps} {...props}>
        {children}
      </motion.div>
    );
  }
);
```

---

## **♿ Accessibility Standards**

### **Required Accessibility Features**
```typescript
// Keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      handleActivate();
      break;
    case 'Escape':
      handleDismiss();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      e.preventDefault();
      handleNavigation(e.key);
      break;
  }
};

// Focus management
const [focusedIndex, setFocusedIndex] = useState(0);
const itemRefs = useRef<(HTMLElement | null)[]>([]);

const focusItem = (index: number) => {
  itemRefs.current[index]?.focus();
  setFocusedIndex(index);
};

// Screen reader support
<div
  role="button"
  tabIndex={0}
  aria-label="Component description"
  aria-describedby="component-description"
  aria-expanded={isExpanded}
  aria-selected={isSelected}
  aria-disabled={isDisabled}
  onKeyDown={handleKeyDown}
>
  {children}
</div>
```

### **ARIA Patterns**
```typescript
// Common ARIA patterns by component type
const ariaPatterns = {
  button: {
    role: 'button',
    tabIndex: 0,
    'aria-pressed': isPressed,
  },
  listbox: {
    role: 'listbox',
    'aria-multiselectable': multiSelect,
    'aria-expanded': isExpanded,
  },
  option: {
    role: 'option',
    'aria-selected': isSelected,
    tabIndex: -1,
  },
  dialog: {
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': 'dialog-title',
  },
};
```

---

## **📊 Performance Standards**

### **Bundle Size Requirements**
```typescript
// Target bundle sizes (gzipped)
const bundleSizeTargets = {
  simple: '< 5KB',      // Buttons, badges, icons
  medium: '< 15KB',     // Cards, inputs, selects
  complex: '< 25KB',    // Tables, editors, dashboards
  system: '< 35KB',     // Complete systems (card system)
};
```

### **Performance Optimizations**
```typescript
// Lazy loading for heavy components
const HiveHeavyComponent = React.lazy(() => import('./hive-heavy-component'));

// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return performExpensiveCalculation(props.data);
}, [props.data]);

// Virtualization for large lists
const VirtualizedList = React.memo(({ items, renderItem }) => {
  // Implement virtualization
});

// Debouncing for frequent updates
const debouncedHandler = useMemo(
  () => debounce(handler, 300),
  [handler]
);
```

---

## **📚 Storybook Standards**

### **Required Story Types**
```typescript
// 1. Default story
export const Default: Story = {
  render: () => (
    <div className="w-96 p-6 bg-[#0A0A0B] rounded-lg">
      <HiveComponent />
    </div>
  ),
};

// 2. Variants story
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-[#0A0A0B] rounded-lg">
      {['default', 'premium', 'elevated', 'minimal'].map(variant => (
        <HiveComponent key={variant} variant={variant} />
      ))}
    </div>
  ),
};

// 3. Sizes story
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-[#0A0A0B] rounded-lg">
      {['sm', 'default', 'lg', 'xl'].map(size => (
        <HiveComponent key={size} size={size} />
      ))}
    </div>
  ),
};

// 4. Interactive story
export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState(false);
    return (
      <div className="w-96 p-6 bg-[#0A0A0B] rounded-lg">
        <HiveComponent 
          interactive
          selected={state}
          onClick={() => setState(!state)}
        />
      </div>
    );
  },
};

// 5. Campus integration story
export const CampusIntegration: Story = {
  render: () => (
    <div className="w-96 p-6 bg-[#0A0A0B] rounded-lg">
      <HiveComponent 
        campusContext={mockCampusContext}
        onCampusAction={handleCampusAction}
      />
    </div>
  ),
};
```

### **Story Documentation**
```typescript
const meta: Meta<typeof HiveComponent> = {
  title: '04-HIVE/Component Name',
  component: HiveComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Detailed component description with usage guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'elevated', 'minimal'],
      description: 'Visual variant of the component',
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size variant of the component',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive behaviors',
    },
  },
};
```

---

## **🧪 Testing Standards**

### **Required Test Types**
```typescript
// Unit tests
describe('HiveComponent', () => {
  it('renders correctly', () => {
    render(<HiveComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles variants correctly', () => {
    render(<HiveComponent variant="premium" />);
    expect(screen.getByRole('button')).toHaveClass('premium-styles');
  });

  it('handles interactions', () => {
    const handleClick = jest.fn();
    render(<HiveComponent onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    render(<HiveComponent />);
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    // Assert expected behavior
  });
});
```

### **Accessibility Testing**
```typescript
// Accessibility tests
describe('HiveComponent Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(<HiveComponent aria-label="Test component" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test component');
  });

  it('supports keyboard navigation', () => {
    const { container } = render(<HiveComponent />);
    const button = container.querySelector('[role="button"]');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('meets contrast requirements', async () => {
    const { container } = render(<HiveComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## **📈 Quality Gates**

### **Component Approval Checklist**
Before a component can be marked as "Production Ready":

#### **Code Quality**
- [ ] TypeScript interfaces complete
- [ ] CVA variants implemented
- [ ] Semantic tokens used exclusively
- [ ] ForwardRef implemented
- [ ] Error boundaries added
- [ ] Performance optimized

#### **Design System**
- [ ] HIVE design tokens used
- [ ] Consistent with design system
- [ ] Variants follow standards
- [ ] Motion system integrated
- [ ] Responsive design implemented

#### **Accessibility**
- [ ] ARIA attributes added
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus management implemented

#### **Campus Integration**
- [ ] Campus context support
- [ ] Entity linking implemented
- [ ] Campus variants added
- [ ] User role handling
- [ ] Space integration working

#### **Testing**
- [ ] Unit tests written
- [ ] Integration tests added
- [ ] Accessibility tests passing
- [ ] Visual regression tested
- [ ] Performance benchmarks met

#### **Documentation**
- [ ] Storybook stories complete
- [ ] API documentation written
- [ ] Usage examples provided
- [ ] Migration guide created
- [ ] Design system docs updated

---

## **🔄 Maintenance Standards**

### **Version Management**
```json
{
  "version": "1.0.0",
  "breaking_changes": [],
  "new_features": [],
  "bug_fixes": [],
  "performance_improvements": []
}
```

### **Deprecation Process**
```typescript
// Deprecation warnings
/**
 * @deprecated Use newProp instead. Will be removed in v2.0.0
 */
oldProp?: string;

// Runtime warnings
if (process.env.NODE_ENV === 'development' && oldProp) {
  console.warn('oldProp is deprecated. Use newProp instead.');
}
```

### **Breaking Change Protocol**
1. **Documentation** - Update all docs with migration guide
2. **Runtime Warnings** - Add deprecation warnings
3. **Codemods** - Provide automated migration tools
4. **Timeline** - Allow 2+ versions before removal
5. **Communication** - Announce in release notes

---

**Following these standards ensures every HIVE component is consistent, accessible, performant, and maintainable while serving our core mission of empowering students as builders.**