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

| Old Import | New Import | Notes |
|------------|------------|-------|
| `import { HiveButton } from '@hive/ui'` | `import { Button } from '@hive/ui'` | Now uses atomic enhanced with zero hardcoded values |
| `import { HiveInput } from '@hive/ui'` | `import { Input } from '@hive/ui'` | Enhanced with proper semantic tokens |
| `import { HiveCard } from '@hive/ui'` | `import { Card } from '@hive/ui'` | Atomic molecule implementation |
| `import { HiveSelect } from '@hive/ui'` | `import { Select } from '@hive/ui'` | Enhanced with CVA variants |
| `import { HiveTextarea } from '@hive/ui'` | `import { Textarea } from '@hive/ui'` | Zero hardcoded values |
| `import { HiveSwitch } from '@hive/ui'` | `import { Switch } from '@hive/ui'` | Perfect token usage |

### **⚠️ DEPRECATED (Available but with warnings)**

These still work but will show deprecation warnings:

```typescript
// DEPRECATED - Will be removed
import { HiveButton } from '@hive/ui';  
import { Button } from '@hive/ui';  // UI version

// USE INSTEAD
import { Button } from '@hive/ui';  // Atomic enhanced version
```

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

**Before:**
```typescript
import { 
  HiveButton,
  HiveInput, 
  HiveCard,
  Button,  // UI version
  Input    // UI version
} from '@hive/ui';
```

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

**Before:**
```typescript
<HiveButton variant="primary" size="lg">
  Click me
</HiveButton>

<HiveInput placeholder="Enter text" />
```

**After:**
```typescript
<Button variant="primary" size="lg">
  Click me
</Button>

<Input placeholder="Enter text" />
```

### **Step 3: Remove Deprecated Imports**

Check for any remaining deprecated imports and replace them:

```bash
# Search for deprecated imports
grep -r "HiveButton\|HiveInput\|HiveCard" src/
```

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
// Before (various naming)
<HiveButton color="primary" />
<Button variant="primary" />

// After (standardized)
<Button variant="primary" />
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