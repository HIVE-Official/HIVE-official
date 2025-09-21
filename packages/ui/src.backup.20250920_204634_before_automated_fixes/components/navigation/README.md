# HIVE Navigation System

A comprehensive, unified navigation system for the HIVE platform with multiple variants, full accessibility, and seamless design system integration.

## Overview

The HIVE Navigation System provides a complete navigation solution that adapts to different use cases while maintaining consistency across the platform. It includes four main variants, keyboard shortcuts, responsive behavior, and full accessibility support.

## Quick Start

```tsx
import { HiveNavigationShell } from '@hive/ui';

function App() {
  const sections = [
    {
      id: 'main',
      label: 'Main',
      items: [
        {
          id: 'feed',
          label: 'Feed',
          icon: Home,
          href: '/',
          isActive: true
        },
        {
          id: 'spaces',
          label: 'Spaces',
          icon: Users,
          href: '/spaces',
          badge: { count: 5 }
        }
      ]
    }
  ];

  return (
    <HiveNavigationShell
      variant="sidebar"
      sections={sections}
      user={currentUser}
      onNavigate={(item) => navigate(item.href)}
    >
      <YourAppContent />
    </HiveNavigationShell>
  );
}
```

## Navigation Variants

### 1. Sidebar Navigation (`variant="sidebar"`)

Traditional left sidebar with collapsible sections. Perfect for desktop applications and admin panels.

**Best for:**
- Desktop applications
- Admin dashboards
- Complex workflows
- Applications with many navigation items

**Features:**
- Collapsible sidebar
- Nested navigation items
- Quick actions section
- User profile integration

```tsx
<HiveNavigationShell
  variant="sidebar"
  size="standard"
  collapsible={true}
  sections={sections}
  user={user}
>
  <YourContent />
</HiveNavigationShell>
```

### 2. Topbar Navigation (`variant="topbar"`)

Horizontal navigation bar with mobile-friendly dropdown menu. Great for content-heavy applications.

**Best for:**
- Content-heavy applications
- Marketing websites
- Mobile-first experiences
- Simple navigation structures

**Features:**
- Responsive mobile menu
- Centered search bar
- Horizontal navigation items
- Mobile-optimized dropdowns

```tsx
<HiveNavigationShell
  variant="topbar"
  sections={sections}
  user={user}
  showSearch={true}
>
  <YourContent />
</HiveNavigationShell>
```

### 3. Command Navigation (`variant="command"`)

Minimal UI with command palette focus. Ideal for power users and developer tools.

**Best for:**
- Power users
- Developer tools
- Productivity applications
- Keyboard-driven workflows

**Features:**
- Command palette-first navigation
- Keyboard shortcuts
- Minimal visual footprint
- Fast search and navigation

```tsx
<HiveNavigationShell
  variant="command"
  sections={sections}
  user={user}
  keyboardShortcuts={true}
>
  <YourContent />
</HiveNavigationShell>
```

### 4. Minimal Navigation (`variant="minimal"`)

Floating navigation bar for immersive experiences. Perfect for content consumption.

**Best for:**
- Content consumption
- Immersive experiences
- Creative applications
- Distraction-free interfaces

**Features:**
- Floating navigation bar
- Minimal visual impact
- Essential actions only
- Beautiful aesthetic

```tsx
<HiveNavigationShell
  variant="minimal"
  sections={sections}
  user={user}
>
  <YourContent />
</HiveNavigationShell>
```

## Configuration Options

### Size Options

- `compact`: Smaller dimensions, fewer features
- `standard`: Default size, balanced feature set
- `expanded`: Larger dimensions, more features

### Position Options

- `fixed`: Fixed positioning (default)
- `sticky`: Sticky positioning
- `static`: Static positioning

### Feature Toggles

- `showSearch`: Enable/disable search functionality
- `showNotifications`: Enable/disable notifications
- `showUserMenu`: Enable/disable user menu
- `showBranding`: Enable/disable HIVE branding
- `collapsible`: Enable/disable sidebar collapse (sidebar only)
- `keyboardShortcuts`: Enable/disable keyboard shortcuts

## Data Structure

### Navigation Sections

```tsx
interface NavigationSection {
  id: string;
  label: string;
  items: NavigationItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}
```

### Navigation Items

```tsx
interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: {
    count?: number;
    variant?: 'default' | 'success' | 'warning' | 'error';
    pulse?: boolean;
  };
  isActive?: boolean;
  isDisabled?: boolean;
  children?: NavigationItem[];
  keywords?: string[];
  description?: string;
  shortcut?: string;
}
```

### User Data

```tsx
interface NavigationUser {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}
```

## Keyboard Shortcuts

The navigation system includes comprehensive keyboard shortcuts:

- **⌘/Ctrl + K**: Open command palette
- **⌘/Ctrl + B**: Toggle sidebar (sidebar variant)
- **Escape**: Close overlays
- **↑/↓**: Navigate command palette results
- **Enter**: Select command palette item

## Accessibility

The navigation system is fully WCAG 2.1 AA compliant:

- **Screen Reader Support**: Proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard accessibility
- **Skip Links**: Skip to main content
- **Focus Management**: Proper focus handling
- **Color Contrast**: Meets WCAG contrast requirements
- **Reduced Motion**: Respects user motion preferences

## Responsive Design

The navigation automatically adapts to different screen sizes:

- **Desktop**: Full feature set
- **Tablet**: Condensed layout
- **Mobile**: Mobile-optimized menus
- **Breakpoints**: Customizable breakpoints

## Theme Integration

The navigation system uses HIVE design tokens:

```tsx
// Semantic color tokens
backgroundColor: semantic.background.primary
color: semantic.text.primary
borderColor: semantic.border.primary

// Interactive states
hover: semantic.interactive.hover
focus: semantic.interactive.focus
active: semantic.interactive.active
```

## Preset Configurations

Use pre-configured presets for common use cases:

```tsx
import { navigationPresets } from '@hive/ui';

// Standard sidebar
<HiveNavigationShell {...navigationPresets.sidebar} />

// Compact sidebar
<HiveNavigationShell {...navigationPresets.compact} />

// Admin dashboard
<HiveNavigationShell {...navigationPresets.admin} />

// Mobile-optimized
<HiveNavigationShell {...navigationPresets.mobile} />
```

## Advanced Usage

### Custom Navigation Provider

For advanced customization, use the navigation provider directly:

```tsx
import { NavigationProvider, useNavigation } from '@hive/ui';

function CustomNavigation() {
  const { isCollapsed, setCollapsed, navigate } = useNavigation();
  
  return (
    <div>
      <button onClick={() => setCollapsed(!isCollapsed)}>
        Toggle Sidebar
      </button>
      {/* Custom navigation UI */}
    </div>
  );
}

function App() {
  return (
    <NavigationProvider config={config} sections={sections}>
      <CustomNavigation />
    </NavigationProvider>
  );
}
```

### Individual Components

Use individual navigation components for maximum control:

```tsx
import { 
  SidebarNavigation, 
  TopbarNavigation, 
  CommandNavigation, 
  MinimalNavigation 
} from '@hive/ui';

// Use specific variants directly
<SidebarNavigation />
<TopbarNavigation />
<CommandNavigation />
<MinimalNavigation />
```

## Migration Guide

### From Legacy Shell Components

```tsx
// OLD: Legacy AppShell
import { AppShell } from '@hive/ui';

<AppShell user={user} showSidebar={true}>
  <Content />
</AppShell>

// NEW: HIVE Navigation System
import { HiveNavigationShell } from '@hive/ui';

<HiveNavigationShell
  variant="sidebar"
  sections={sections}
  user={user}
>
  <Content />
</HiveNavigationShell>
```

### From TopNavLayout

```tsx
// OLD: TopNavLayout
import { TopNavLayout } from '../components/navigation/top-nav-layout';

<TopNavLayout>
  <Content />
</TopNavLayout>

// NEW: HIVE Navigation System
import { HiveNavigationShell } from '@hive/ui';

<HiveNavigationShell
  variant="topbar"
  sections={sections}
  user={user}
>
  <Content />
</HiveNavigationShell>
```

## Best Practices

1. **Choose the Right Variant**: Select the variant that best fits your use case
2. **Consistent Data**: Keep navigation sections consistent across your app
3. **Keyboard Support**: Always enable keyboard shortcuts for better UX
4. **Accessibility**: Test with screen readers and keyboard navigation
5. **Performance**: Use React.memo for navigation items with complex rendering
6. **Testing**: Test responsive behavior across different screen sizes

## Performance Considerations

- Navigation items are virtualized for large lists
- Icons are lazy-loaded
- Keyboard shortcuts are debounced
- Responsive breakpoints are optimized
- Motion is reduced based on user preferences

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When adding new features to the navigation system:

1. Update the TypeScript interfaces
2. Add comprehensive tests
3. Update Storybook stories
4. Test accessibility compliance
5. Update documentation

## Examples

See the Storybook stories for comprehensive examples:

- Basic usage examples
- All navigation variants
- Responsive behavior
- Keyboard shortcuts
- Accessibility features
- Integration patterns

## Support

For questions or issues with the navigation system:

1. Check the Storybook documentation
2. Review the TypeScript interfaces
3. Look at the example implementations
4. Create an issue with detailed reproduction steps