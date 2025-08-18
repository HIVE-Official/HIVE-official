# HIVE Component Consolidation Guide

## Design System Hierarchy

```
packages/ui/src/
├── atomic/                    ← PRIMARY: Use for new development
│   ├── atoms/                 ← Foundation components (Button, Input, etc.)
│   ├── molecules/             ← Component combinations
│   ├── organisms/             ← Complex UI sections
│   ├── templates/             ← Page layouts
│   └── pages/                 ← Complete page implementations
├── components/                ← LEGACY: Branded HIVE components
│   ├── hive-*.tsx            ← Premium branded components
│   ├── ui/                   ← Shadcn/UI components (use as ShadcnButton, etc.)
│   └── surfaces/             ← HIVE-specific surfaces
```

## Component Usage Strategy

### ✅ PREFERRED: Atomic Design System
Use atomic components as your **primary foundation**:

```tsx
// ✅ PREFERRED - Use atomic design system
import { Button, Input, Card } from '@hive/ui/atomic';
import { Text, Heading } from '@hive/ui/atomic';

// Clean, consistent, token-based components
<Button variant="primary" size="md">Action</Button>
<Card variant="elevated">Content</Card>
```

### 🟡 SECONDARY: Branded HIVE Components
Use only for premium, brand-specific features:

```tsx
// 🟡 SECONDARY - Use for premium features only
import { HiveButton, HivePremiumCard } from '@hive/ui';

// Premium branded components with advanced interactions
<HiveButton variant="gold-premium">Premium Action</HiveButton>
<HivePremiumCard variant="magnetic">Premium Content</HivePremiumCard>
```

### 🔧 UTILITY: Shadcn Components
Use with explicit naming to avoid conflicts:

```tsx
// 🔧 UTILITY - Use when atomic system doesn't cover the need
import { ShadcnButton, ShadcnCard } from '@hive/ui';

// Base UI components for edge cases
<ShadcnButton>Fallback Button</ShadcnButton>
```

## Migration Path

### Phase 1: ✅ COMPLETED
- [x] Create atomic design system (25 atoms)
- [x] Migrate hardcoded values to semantic tokens (1,379 → 1,034 issues)
- [x] Streamline component exports
- [x] Implement token compliance checking

### Phase 2: Component Consolidation
- [ ] Audit component overlap between `/atomic/` and `/components/`
- [ ] Create migration guide for switching to atomic components
- [ ] Deprecate redundant branded components
- [ ] Establish clear usage patterns

### Phase 3: Excellence
- [ ] Complete token migration (remaining 1,034 issues)
- [ ] Add comprehensive component tests
- [ ] Optimize bundle size through tree-shaking
- [ ] Document component design decisions

## Development Guidelines

### ✅ Do This
1. **Start with atomic components** for all new development
2. **Use semantic tokens** (`var(--hive-*)`) for colors and spacing
3. **Follow atomic design principles** (atoms → molecules → organisms)
4. **Maintain consistent API** across all components
5. **Test token compliance** before committing

### ❌ Avoid This
1. **Don't hardcode values** - use design tokens
2. **Don't create duplicate components** - check atomic system first
3. **Don't export with multiple names** - use single, clear exports
4. **Don't bypass the design system** - extend it instead
5. **Don't use legacy luxury tokens** - migrate to PRD-aligned tokens

## Token Usage Examples

### Colors
```tsx
// ✅ CORRECT - Semantic tokens
className="bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]"

// ❌ INCORRECT - Hardcoded values
className="bg-[#0A0A0B] text-[#E5E5E7]"
```

### Spacing
```tsx
// ✅ CORRECT - Spacing tokens
className="p-4 m-2 gap-6"

// ❌ INCORRECT - Hardcoded pixels
className="p-[16px] m-[8px] gap-[24px]"
```

### Status Colors
```tsx
// ✅ CORRECT - Status tokens
className="text-[var(--hive-status-success)] bg-[var(--hive-status-error)]"

// ❌ INCORRECT - Raw hex colors
className="text-[#10B981] bg-[#EF4444]"
```

## Component Quality Standards

### API Consistency
All components must follow this interface pattern:
```tsx
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
```

### Token Integration
Components must use semantic tokens exclusively:
```tsx
const variants = {
  primary: 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]',
  secondary: 'border-[var(--hive-border-default)] text-[var(--hive-text-primary)]'
};
```

### Atomic Design Hierarchy
- **Atoms**: Single responsibility (Button, Input, Text)
- **Molecules**: Atom combinations (FormField, SearchBar)
- **Organisms**: Complex sections (Header, ProfileCard)
- **Templates**: Page structures (ProfileLayout, DashboardLayout)
- **Pages**: Complete implementations (ProfilePage, DashboardPage)

## Success Metrics

### Design System Maturity: 8.5/10
- ✅ **Architecture**: Excellent atomic design implementation
- ✅ **Token System**: Sophisticated dual-theme architecture
- 🟡 **Component Quality**: Strong foundation, needs consolidation
- ✅ **Documentation**: Comprehensive Storybook organization
- 🟡 **Brand Consistency**: Good direction, execution gaps
- 🟡 **Developer Experience**: Good patterns, needs simplification

### Current Progress
- **Token Migration**: 25% complete (345 issues resolved)
- **Component Organization**: 90% complete (clear hierarchy established)
- **Developer Tools**: 100% complete (pre-commit hooks, migration scripts)
- **Documentation**: 85% complete (comprehensive guides, examples)

## Next Steps

1. **Continue token migration** - address remaining 1,034 hardcoded values
2. **Simplify component exports** - reduce naming confusion
3. **Add automated testing** - ensure component quality
4. **Optimize performance** - tree-shaking, bundle analysis
5. **Monitor adoption** - track atomic component usage

---

This guide ensures consistent, maintainable, and high-quality component development within the HIVE design system.