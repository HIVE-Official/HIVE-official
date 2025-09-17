# HIVE UI - Developer Guide

## Production-Ready Components for Campus Social Platforms

The HIVE UI package provides a complete design system optimized for university social platforms, with focus on performance, accessibility, and mobile experience.

## Quick Start

### Basic Usage
```tsx
import { Button, Input, Card } from '@hive/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter your message" />
      <Button variant="primary">Send</Button>
    </Card>
  );
}
```

### Production-Optimized Import
```tsx
// Use the production build for optimal bundle size
import { Button, Input, Card } from '@hive/ui/production';

// Lazy load heavy components
import { LazyProfileDashboard } from '@hive/ui/production';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyProfileDashboard />
    </Suspense>
  );
}
```

## Performance Optimizations

### Tree Shaking Support
All components are designed for optimal tree shaking:

```tsx
// This only includes Button, not the entire library
import { Button } from '@hive/ui';

// For multiple components, prefer named imports
import { Button, Input, Card } from '@hive/ui';
```

### Lazy Loading
Heavy components are available as lazy-loaded versions:

```tsx
import { LazyProfileDashboard, LazyCompleteHIVEToolsSystem } from '@hive/ui/production';
```

### Memoization
All components use React.memo and useMemo/useCallback where appropriate:

```tsx
// Components automatically prevent unnecessary re-renders
<Button onClick={handleClick}>
  {expensiveComputation}
</Button>
```

## Mobile-First Design

### Touch Interactions
```tsx
import { useSwipeGestures, useHapticFeedback } from '@hive/ui/hooks/mobile';

function SwipeableCard() {
  const { triggerHaptic } = useHapticFeedback();
  const { swipeHandlers } = useSwipeGestures({
    onSwipeLeft: () => {
      triggerHaptic('light');
      // Handle swipe
    }
  });

  return <div {...swipeHandlers}>Swipeable content</div>;
}
```

### Responsive Utilities
```tsx
import { useMobileViewport } from '@hive/ui/hooks/mobile';

function ResponsiveComponent() {
  const { isMobile, isLandscape } = useMobileViewport();

  return (
    <div className={cn(
      'grid gap-4',
      isMobile ? 'grid-cols-1' : 'grid-cols-3'
    )}>
      {/* Content */}
    </div>
  );
}
```

## Accessibility Features

### Automatic ARIA Support
```tsx
import { getInteractiveA11yProps, getFormA11yProps } from '@hive/ui/lib/accessibility';

function AccessibleForm() {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...getFormA11yProps('email', 'Email address', 'Enter your UB email', undefined, true)}
      />
    </>
  );
}
```

### Focus Management
```tsx
import { focusStyles } from '@hive/ui/lib/accessibility';

// Automatic focus styling
<button className={focusStyles({ type: 'default' })}>
  Accessible Button
</button>
```

### High Contrast Support
```tsx
// Components automatically adapt to high contrast mode
<Button variant="primary">
  Button adapts to contrast preferences
</Button>
```

## Motion and Animation

### Respects User Preferences
```tsx
import { hiveVariants } from '@hive/ui';
import { motion } from 'framer-motion';

// Automatically respects prefers-reduced-motion
<motion.div
  variants={hiveVariants.fadeIn}
  initial="hidden"
  animate="visible"
>
  Accessible animation
</motion.div>
```

### HIVE Motion System
```tsx
// Pre-built animation variants
const motionProps = {
  variants: hiveVariants.slideUp,
  initial: "hidden",
  animate: "visible",
  transition: { duration: 0.3, ease: [0.33, 0.65, 0, 1] }
};
```

## Theme Integration

### Semantic Tokens
```tsx
// Components use CSS custom properties for theming
<Button className="bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]">
  Themed Button
</Button>
```

### Dark Mode Support
```tsx
// Components automatically adapt to dark mode
<Card className="bg-hive-surface-elevated border-hive-border-subtle">
  Auto-adapting card
</Card>
```

## Bundle Size Optimization

### Production Bundle Analysis
- Core components: ~45KB gzipped
- Full library: ~180KB gzipped
- Production build: ~85KB gzipped with lazy loading

### Optimization Tips
1. Use the production build for apps
2. Lazy load complex components
3. Use specific imports for utilities
4. Tree-shake unused features

```tsx
// Good: Tree-shakeable
import { Button } from '@hive/ui';
import { cn } from '@hive/ui/lib/utils';

// Avoid: Imports entire library
import * as HIVE from '@hive/ui';
```

## TypeScript Support

### Full Type Safety
```tsx
import type { ButtonProps, ProfileDashboardProps } from '@hive/ui';

interface MyComponentProps extends ButtonProps {
  customProp: string;
}
```

### Generic Component Props
```tsx
import type { ComponentProps } from 'react';

// Extend HTML element props
interface CustomInputProps extends ComponentProps<'input'> {
  label: string;
}
```

## Best Practices

### Performance
- Use React.Suspense with lazy components
- Implement proper loading states
- Optimize images and assets
- Use semantic HTML

### Accessibility
- Always provide labels for form inputs
- Use proper heading hierarchy
- Include focus indicators
- Test with screen readers

### Mobile
- Design for touch targets (44px minimum)
- Test on actual devices
- Consider thumb-friendly layouts
- Optimize for one-handed use

### Development
- Use TypeScript for better DX
- Follow semantic versioning
- Write comprehensive tests
- Document component APIs

## Component Categories

### Atomic Components
- Button, Input, Badge, Avatar
- Optimized for reuse and composition
- Full accessibility support

### Molecules  
- FormField, SearchBar, ProfileHeader
- Complex interactions
- Campus-specific patterns

### Organisms
- ProfileDashboard, SpaceExploreHub
- Complete feature areas
- Lazy-loaded for performance

## Support

- Documentation: Check component stories in Storybook
- Types: Full TypeScript definitions included
- Examples: See `/examples` directory
- Issues: Report on GitHub repository

## Migration from v1 to v2

If upgrading from an older version:

1. Update imports to use new structure
2. Check for breaking changes in CHANGELOG
3. Update TypeScript definitions
4. Test accessibility features
5. Verify mobile interactions

---

Built for University at Buffalo and the HIVE platform.
Optimized for production deployment and campus-scale usage.