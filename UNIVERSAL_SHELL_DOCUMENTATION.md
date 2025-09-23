# HIVE Universal Shell Documentation

## Overview
The Universal Shell is the foundational infrastructure for the entire HIVE platform, providing consistent navigation, responsive layouts, and centralized state management across all pages.

## Architecture

### Core Components

#### 1. UniversalShell (`packages/ui/src/shells/UniversalShell.tsx`)
The main wrapper component that provides:
- **Global Header** - Persistent top navigation with search and user menu
- **Sidebar Navigation** - Collapsible side menu for desktop
- **Mobile Bottom Navigation** - Tab bar for mobile devices
- **Context Panel** - Additional information panel for desktop views
- **Shell Context** - Global state management for navigation

**Usage:**
```tsx
import { UniversalShell } from '@hive/ui';

function MyPage() {
  return (
    <UniversalShell variant="full">
      {/* Your page content */}
    </UniversalShell>
  );
}
```

**Variants:**
- `full` - Complete shell with all navigation elements (dashboard pages)
- `minimal` - Only header, no sidebar (public pages)

#### 2. Universal Navigation (`packages/ui/src/navigation/UniversalNav.tsx`)
Provides flexible navigation components:
- **UniversalNavBar** - Main navigation bar (horizontal/vertical)
- **CommandPalette** - Quick command access (Ctrl+K)
- **Breadcrumbs** - Hierarchical navigation
- **TabNav** - Tab-based section navigation

**Example:**
```tsx
import { UniversalNavBar, NavItem } from '@hive/ui';

const navItems: NavItem[] = [
  { id: 'feed', label: 'Feed', icon: '🏠', path: '/feed' },
  { id: 'spaces', label: 'Spaces', icon: '🏛️', path: '/spaces' },
  { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' }
];

<UniversalNavBar items={navItems} orientation="vertical" />
```

#### 3. Universal Atoms (`packages/ui/src/atomic/atoms/universal-atoms.tsx`)
Core UI building blocks following the gold/black/white theme:

**Components:**
- `UniversalButton` - Primary action button with loading states
- `UniversalInput` - Form input with validation
- `UniversalCard` - Content container with variants
- `UniversalBadge` - Status indicators
- `UniversalAvatar` - User profile images
- `UniversalSkeleton` - Loading placeholders
- `UniversalDivider` - Content separators
- `UniversalIconButton` - Icon-only buttons
- `UniversalCheckbox` - Form checkboxes

**Button Example:**
```tsx
import { UniversalButton } from '@hive/ui';

<UniversalButton
  variant="primary"
  size="lg"
  icon={<PlusIcon />}
  loading={isLoading}
  onClick={handleClick}
>
  Create Space
</UniversalButton>
```

#### 4. Modal & Toast System (`packages/ui/src/systems/modal-toast-system.tsx`)
Global notification infrastructure:

**Modal Usage:**
```tsx
import { useModal } from '@hive/ui';

const { openModal, closeModal } = useModal();

const showConfirmDialog = () => {
  const modalId = openModal({
    title: 'Confirm Action',
    content: <p>Are you sure?</p>,
    actions: [
      { label: 'Cancel', onClick: () => closeModal(modalId) },
      { label: 'Confirm', variant: 'primary', onClick: handleConfirm }
    ]
  });
};
```

**Toast Usage:**
```tsx
import { useToast } from '@hive/ui';

const { showToast } = useToast();

showToast({
  title: 'Success',
  message: 'Space created successfully',
  type: 'success',
  duration: 5000
});
```

#### 5. HIVE Provider (`packages/ui/src/providers/HiveProvider.tsx`)
Main application provider with layout wrappers:

**Components:**
- `HiveProvider` - Root provider with configuration
- `PageWrapper` - Page-level container with max-width
- `SectionWrapper` - Section container with title/actions
- `GridWrapper` - Responsive grid layout
- `FlexWrapper` - Flexible box layout
- `LoadingWrapper` - Loading state handler
- `ErrorBoundary` - Error catching and display

**Provider Setup:**
```tsx
import { HiveProvider } from '@hive/ui';

<HiveProvider
  config={{
    environment: 'development',
    campusId: 'ub-buffalo',
    features: { rituals: true, tools: true },
    theme: { primaryColor: '#FFD700', mode: 'dark' }
  }}
  withShell={true}
>
  {children}
</HiveProvider>
```

## Integration with Next.js App Router

### UniversalShellProvider (`apps/web/src/app/universal-shell-provider.tsx`)
Intelligent wrapper that determines shell usage based on route:

**Route Logic:**
- **No Shell**: Auth pages, landing, onboarding, waitlist
- **Minimal Shell**: Public profile pages
- **Full Shell**: Dashboard and protected routes

### Provider Chain (`apps/web/src/app/providers.tsx`)
```tsx
<QueryClientProvider>
  <ErrorProvider>
    <SimpleAuthProvider>
      <ModalProvider>
        <UniversalShellProvider>
          {children}
        </UniversalShellProvider>
      </ModalProvider>
    </SimpleAuthProvider>
  </ErrorProvider>
</QueryClientProvider>
```

## Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### Mobile Adaptations
- Sidebar hidden, replaced with bottom navigation
- Command palette accessible via menu button
- Cards stack vertically
- Touch-optimized interactions

### Desktop Features
- Persistent sidebar navigation
- Context panel for additional information
- Keyboard shortcuts (Ctrl+K for command palette)
- Hover states and tooltips

## Theme System

### Color Palette
```css
--gold: #FFD700        /* Primary brand color */
--gold-hover: #FFC107  /* Hover state */
--black: #000000       /* Background */
--white: #FFFFFF       /* Text */
--white-60: rgba(255, 255, 255, 0.6)  /* Secondary text */
--white-20: rgba(255, 255, 255, 0.2)  /* Borders */
--white-10: rgba(255, 255, 255, 0.1)  /* Subtle backgrounds */
--white-5: rgba(255, 255, 255, 0.05)  /* Hover backgrounds */
```

### Component Styling
All universal components follow consistent styling patterns:
- **Primary Actions**: Gold background, black text
- **Secondary Actions**: White/10 background, white text
- **Ghost Actions**: Transparent, white/60 text
- **Borders**: White/10 or white/20
- **Hover States**: Opacity changes or white/5 backgrounds

## Testing

### Playwright E2E Tests
Located in `apps/web/src/test/e2e/`:
- `universal-shell.spec.ts` - Shell component tests
- `mcp-integration.spec.ts` - MCP-specific tests

**Running Tests:**
```bash
pnpm test:e2e
```

### Key Test Scenarios
1. Shell renders with all navigation elements
2. Sidebar toggles on desktop
3. Mobile bottom nav appears on small screens
4. Navigation between vertical slices works
5. Command palette opens/closes
6. Responsive layout changes
7. Branding colors are consistent
8. Loading states display correctly

## Usage Guidelines

### When to Use Full Shell
- Dashboard pages (`/feed`, `/spaces`, `/profile`)
- Protected routes requiring authentication
- Features needing persistent navigation

### When to Use Minimal Shell
- Public profile pages
- Content that needs simple header only
- Marketing or informational pages

### When to Use No Shell
- Authentication flows (login, verify)
- Onboarding process
- Landing pages
- Waitlist signup

## Performance Optimizations

### Code Splitting
Shell components are dynamically imported to reduce initial bundle size:
```tsx
const UniversalShell = dynamic(
  () => import('@hive/ui').then(mod => mod.UniversalShell),
  { ssr: false, loading: () => <ShellLoader /> }
);
```

### State Management
- Shell context minimizes re-renders
- Navigation state cached in context
- Mobile detection only runs on mount/resize

### CSS Optimization
- Tailwind CSS for utility classes
- Minimal custom CSS
- GPU-accelerated animations

## Migration Guide

### From Old Navigation
Replace existing navigation components with universal equivalents:

**Before:**
```tsx
import { DesktopNav, MobileNav } from '../components/navigation';

<DesktopNav />
<MobileNav />
```

**After:**
```tsx
// Handled automatically by UniversalShell
<UniversalShellProvider>
  {/* Your content */}
</UniversalShellProvider>
```

### From Custom Modals
Replace custom modal implementations with the modal system:

**Before:**
```tsx
const [isOpen, setIsOpen] = useState(false);
{isOpen && <CustomModal onClose={() => setIsOpen(false)} />}
```

**After:**
```tsx
const { openModal } = useModal();
openModal({ content: <ModalContent /> });
```

## Troubleshooting

### Common Issues

1. **Shell not appearing**
   - Verify route is not in NO_SHELL_ROUTES
   - Check UniversalShellProvider is in provider chain

2. **Navigation not working**
   - Ensure paths in NavItem match actual routes
   - Verify router is available in component tree

3. **Styles not loading**
   - Check @hive/ui package is built
   - Verify styles.css is imported

4. **Mobile nav not showing**
   - Check viewport meta tag is present
   - Verify responsive breakpoints

## Future Enhancements

### Planned Features
- [ ] Dark/light mode toggle
- [ ] Customizable navigation items
- [ ] Animated transitions
- [ ] Keyboard navigation
- [ ] Accessibility improvements
- [ ] PWA support
- [ ] Offline capabilities

### API Improvements
- [ ] Navigation configuration via Firebase
- [ ] User preference persistence
- [ ] Analytics integration
- [ ] Performance monitoring

---

## Summary

The Universal Shell provides a robust foundation for the HIVE platform with:
- ✅ Consistent navigation across all pages
- ✅ Responsive design for all devices
- ✅ Centralized state management
- ✅ Reusable UI components
- ✅ Modal and toast systems
- ✅ Comprehensive testing
- ✅ Gold/black/white branding
- ✅ Performance optimizations

This infrastructure ensures a cohesive user experience and accelerates feature development by providing pre-built, tested components that follow HIVE's design system.