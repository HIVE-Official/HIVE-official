# HIVE Design System Migration Guide

## 🚀 **MAJOR UPDATE: Atomic Design System as Single Source of Truth**

We've consolidated HIVE's design system to eliminate component duplication and provide a single, consistent source of truth. All components now use zero hardcoded values and perfect semantic token integration.

---

## 📋 **Migration Overview**

### **What Changed**
- ✅ **Atomic Enhanced components** promoted to primary exports
- ❌ **Duplicate HIVE components** deprecated
- ❌ **UI components** moved to legacy with deprecation warnings
- 📦 **Clean export structure** with clear component hierarchy

### **Timeline**
- **Phase 1 (Now)**: Atomic components promoted, legacy components deprecated with warnings
- **Phase 2 (Next Release)**: Legacy components removed entirely
- **Phase 3 (Following Release)**: Complete atomic system with missing molecules/organisms

---

## 🔄 **Component Migration Map**

### **✅ IMMEDIATE MIGRATION (Primary Components)**

Replace the legacy HIVE-prefixed atoms with the canonical atomic exports below:

| Replace legacy export | With new atomic export | Notes |
|-----------------------|------------------------|-------|
| button (legacy HIVE version) | `import { Button } from '@hive/ui'` | Includes brand/gradient variants and loading states |
| input (legacy HIVE version) | `import { Input } from '@hive/ui'` | Supports labels, helper text, icons, clear actions |
| card (legacy HIVE version) | `import { Card } from '@hive/ui'` | Atomic molecule implementation |
| select (legacy HIVE version) | `import { Select } from '@hive/ui'` | Enhanced CVA variants with semantic tokens |
| textarea (legacy HIVE version) | `import { Textarea } from '@hive/ui'` | Adds auto-resize and helper messaging |
| switch (legacy HIVE version) | `import { Switch } from '@hive/ui'` | Token-aligned interactions |

### **⚠️ REMOVED DUPLICATES**

All HIVE-prefixed duplicates have been deleted. If you still spot one, swap it for the atomic counterpart listed above.

### **🏗️ SPECIALIZED COMPONENTS (Keep Using)**

These remain unchanged as they're specialized HIVE implementations:

```typescript
// Keep using these - they're specialized
import { 
  HiveLogo,
  HiveCommandPalette,
  HiveSpaceCard,
  HiveModal,
  ModularCard 
} from '@hive/ui';
```

---

## 🛠️ **Step-by-Step Migration**

### **Step 1: Update Component Imports**

**After:**
```typescript
import { 
  Button,   // Atomic enhanced
  Input,    // Atomic enhanced  
  Card      // Atomic molecule
} from '@hive/ui';
```

### **Step 2: Update Component Usage**

Most props remain the same, but some have been standardized:

**After:**
```typescript
<Button variant="primary" size="lg" leftIcon={<Icon />} disabled={isLoading}>
  Click me
</Button>

<Input label="Email" placeholder="name@campus.edu" helperText="We'll never share your address" />
```

### **Step 3: Remove Deprecated Imports**

Check for any remaining deprecated imports and replace them:

Use a targeted search (e.g. `rg "Hive"` inside your routes/components) and replace any lingering HIVE-prefixed atoms with the canonical versions.

---

## 🎯 **Benefits of Migration**

### **Design System Excellence**
- ✅ **Zero hardcoded values** - Perfect semantic token usage
- ✅ **Consistent API** - Standardized props across all components
- ✅ **Better TypeScript** - Enhanced type safety and IntelliSense
- ✅ **Atomic Design** - Clear component hierarchy and composition

### **Developer Experience**
- ✅ **Single source of truth** - No more confusion about which component to use
- ✅ **Smaller bundle** - Eliminated duplicate implementations
- ✅ **Better documentation** - Clear Storybook organization
- ✅ **Mobile-first** - All components responsive by default

### **Performance Improvements**
- ✅ **Tree shaking** - Better dead code elimination
- ✅ **Smaller builds** - Reduced component duplication
- ✅ **CSS efficiency** - Semantic tokens reduce CSS output

---

## 🔍 **New Component Structure**

### **Atomic Hierarchy**
```
@hive/ui
├── Atoms (Foundation)
│   ├── Button, Input, Select, etc.
│   └── Typography, Badge, Avatar, etc.
├── Molecules (Composed)
│   ├── Card, FormField, SearchBar, etc.
│   └── InputGroup, ButtonGroup, etc.
├── Organisms (Complex)
│   ├── Header, ProfileDashboard, etc.
│   └── Navigation, DataTable, etc.
├── Templates (Layouts)
│   └── PageLayout, ProfileTemplate, etc.
└── Specialized HIVE (Brand)
    ├── HiveLogo, HiveCommandPalette
    └── HiveSpaceCard, ModularCard, etc.
```

### **Import Patterns**
```typescript
// Atomic components (primary)
import { Button, Input, Card } from '@hive/ui';

// Specialized HIVE components
import { HiveLogo, HiveCommandPalette } from '@hive/ui';

// System components
import { ProfileSystem, Navigation } from '@hive/ui';
```

---

## 🚨 **Breaking Changes**

### **Removed Exports**
- All `/ui` components moved to `Legacy*` prefixes
- Duplicate HIVE components deprecated
- Some prop names standardized

### **Prop Changes**
Most props remain the same, but some standardizations:

```typescript
// Standardized API across the app
<Button variant="primary" />
<Button variant="brand" loading leftIcon={<Sparkles />} />
```

---

## 🧪 **Testing Your Migration**

### **1. Build Test**
```bash
npm run build
# Should complete without errors
```

### **2. Type Check**
```bash
npm run type-check
# Should show deprecation warnings, not errors
```

### **3. Storybook**
```bash
npm run storybook
# All stories should render correctly
```

---

## 📞 **Support**

### **Migration Issues**
If you encounter issues during migration:

1. **Check the migration map** above for correct imports
2. **Review prop changes** in the breaking changes section
3. **Run type checking** to identify issues
4. **Check Storybook** for component examples

### **Legacy Support**
- Legacy components available with `Legacy*` prefix
- Deprecation warnings will guide migration
- Full removal planned for next major version

---

## 🎉 **What's Next**

### **Phase 2: Component Completion**
- Missing molecules (Alert, Toast, Pagination)
- Additional organisms (DataTable, Sidebar)
- Enhanced documentation

### **Phase 3: System Excellence**
- Automated quality gates
- Performance monitoring
- Advanced composition patterns

The migration positions HIVE for design system excellence with a clean, consistent, and powerful component library.
