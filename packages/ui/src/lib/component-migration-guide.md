# HIVE Component Migration Guide

## Foundation System Integration

This guide shows how to systematically upgrade any HIVE component to use our foundation systems.

## Migration Checklist

### 1. Import Foundation Systems
```tsx
// Add these imports to your component
import { getInteractiveA11yProps, getTestProps, getFormA11yProps } from '../lib/accessibility-foundation';
import { responsiveSpace, touchTargets, responsiveText, responsiveAnimations } from '../lib/responsive-foundation';
import { componentBase, getValidationProps, createLoadingIndicator } from '../lib/component-foundation';
```

### 2. Update Component Base Classes

**Before:**
```tsx
const componentVariants = cva(
  "base classes here"
)
```

**After:**
```tsx
const componentVariants = cva(
  cn(
    componentBase.interactive, // or .container, .input, .text
    "component-specific classes",
    responsiveAnimations.motion
  )
)
```

### 3. Add Responsive Patterns

**Spacing:**
```tsx
// Replace hardcoded padding/margin
"p-4 sm:p-6" → responsiveSpace({ size: 'md' })
```

**Touch Targets:**
```tsx
// Add minimum touch targets
className={cn(
  baseClasses,
  touchTargets.comfortable
)}
```

**Typography:**
```tsx
// Replace responsive text
"text-sm sm:text-base" → responsiveText({ size: 'sm' })
```

### 4. Enhanced Props Interface

**Add these props to your interface:**
```tsx
export interface YourComponentProps {
  // ... existing props
  
  // Accessibility props
  'aria-label'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
  
  // Enhanced functionality
  loading?: boolean;
  disabled?: boolean;
}
```

### 5. Component Implementation Pattern

**Standard Component Structure:**
```tsx
const YourComponent = React.forwardRef<HTMLElement, YourComponentProps>(
  ({ 
    // ... existing props
    loading = false,
    disabled = false,
    'aria-label': ariaLabel,
    'data-testid': testId,
    ...props 
  }, ref) => {
    
    // Generate accessibility props
    const a11yProps = getInteractiveA11yProps('button', ariaLabel);
    const testingProps = getTestProps(testId, 'YourComponent');
    
    // Handle loading states
    const LoadingIndicator = createLoadingIndicator(loading);
    
    return (
      <motion.element
        className={cn(
          yourComponentVariants({ variant, size }),
          loading && 'pointer-events-none',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...a11yProps}
        {...testingProps}
        {...props}
      >
        {LoadingIndicator}
        {children}
      </motion.element>
    );
  }
);
```

### 6. Form Component Pattern

**For form inputs, use this pattern:**
```tsx
// Generate unique ID and accessibility
const inputId = id || `hive-input-${Math.random().toString(36).substr(2, 9)}`;
const descriptionId = `${inputId}-description`;
const errorId = `${inputId}-error`;

const a11yProps = getFormA11yProps(
  inputId,
  ariaLabel || label || '',
  helperText ? descriptionId : undefined,
  errorText ? errorId : undefined,
  required
);

const validationProps = getValidationProps(errorText, Boolean(successText));
```

### 7. Container Component Pattern

**For cards, panels, and containers:**
```tsx
const containerVariants = cva(
  cn(
    componentBase.container,
    responsiveSpace({ size: 'md' }),
    "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]"
  )
)
```

## Examples

### Button Migration
```tsx
// Before
const buttonVariants = cva("inline-flex items-center justify-center")

// After  
const buttonVariants = cva(
  cn(
    componentBase.interactive,
    touchTargets.comfortable,
    responsiveAnimations.motion
  )
)
```

### Input Migration
```tsx
// Before
<input className="w-full h-10 px-3" />

// After
<input 
  className={cn(
    componentBase.input,
    validationProps.className
  )}
  {...a11yProps}
  {...validationProps}
/>
```

### Card Migration
```tsx
// Before
<div className="p-4 sm:p-6 bg-white border rounded-lg">

// After
<div className={cn(
  componentBase.container,
  responsiveSpace({ size: 'md' }),
  "bg-[var(--hive-background-elevated)] border border-[var(--hive-border-subtle)]"
)}>
```

## Quality Checklist

After migration, verify:

- [ ] Component uses foundation base classes
- [ ] Responsive spacing with `responsiveSpace()`
- [ ] Touch targets meet 44px minimum
- [ ] Accessibility props integrated
- [ ] Loading states handled
- [ ] Test props included
- [ ] Semantic tokens used (no hardcoded colors)
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Focus styles are consistent
- [ ] TypeScript interfaces updated

## Testing

Test your migrated component:

1. **Accessibility:** Use screen reader, keyboard navigation
2. **Responsive:** Test on mobile/tablet/desktop
3. **States:** Loading, disabled, error, success
4. **Motion:** Test with reduced motion preference
5. **Touch:** Verify touch targets on mobile

## Benefits After Migration

✅ **Consistent UX:** All components follow same patterns
✅ **Accessibility:** WCAG 2.1 AA compliance built-in  
✅ **Mobile-First:** Touch-optimized by default
✅ **Performance:** Optimized animations and rendering
✅ **Maintainability:** Centralized system management
✅ **Scalability:** Easy to extend and customize