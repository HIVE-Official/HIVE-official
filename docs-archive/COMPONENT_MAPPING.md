# HIVE Component Mapping & Organization

## 🎯 **Primary vs Legacy Component Mapping**

This document shows which components to use (PRIMARY) vs which are preserved but hidden (LEGACY).

---

## 🟢 **PRIMARY COMPONENTS (Use These)**

### **HIVE Branded Components** (`/components/hive/`)
These are the main components to use for HIVE applications:

```typescript
// BUTTONS
export { HiveButton } from './hive/hive-button';           // ✅ PRIMARY

// CARDS  
export { HiveCard } from './hive/hive-card';               // ✅ PRIMARY

// FORMS
export { HiveInput } from './hive/hive-input';             // ✅ PRIMARY
export { HiveTextarea } from './hive/hive-textarea';       // ✅ PRIMARY
export { HiveSelect } from './hive/hive-select';           // ✅ PRIMARY

// NAVIGATION
export { HiveNavigation } from './hive/hive-navigation';   // ✅ PRIMARY
export { HiveBreadcrumbs } from './hive/hive-breadcrumbs'; // ✅ PRIMARY

// UI ELEMENTS
export { HiveModal } from './hive/hive-modal';             // ✅ PRIMARY
export { HiveTooltip } from './hive/hive-tooltip';         // ✅ PRIMARY
export { HiveBadge } from './hive/hive-badge';             // ✅ PRIMARY
export { HiveProgress } from './hive/hive-progress';       // ✅ PRIMARY

// LOGO SYSTEM
export { HiveLogo } from './hive/hive-logo';               // ✅ PRIMARY
```

### **Specialized Feature Components** (`/components/specialized/`)
These are domain-specific components for HIVE features:

```typescript
// PROFILE SYSTEM
export { ProfileSystem } from './specialized/profile/profile-system';           // ✅ PRIMARY
export { MySpacesFeed } from './specialized/profile/my-spaces-feed';            // ✅ PRIMARY
export { CalendarCard } from './specialized/profile/calendar-card';             // ✅ PRIMARY

// SPACE SYSTEM  
export { HiveSpaceCard } from './specialized/spaces/hive-space-card';           // ✅ PRIMARY
export { HiveSpaceDirectory } from './specialized/spaces/hive-space-directory'; // ✅ PRIMARY

// DASHBOARD SYSTEM
export { HiveDashboard } from './specialized/dashboard/hive-dashboard';         // ✅ PRIMARY
export { BentoGrid } from './specialized/dashboard/bento-grid';                 // ✅ PRIMARY

// CREATOR/BUILDER SYSTEM  
export { VisualToolBuilder } from './specialized/creator/visual-tool-builder';  // ✅ PRIMARY
export { ElementLibrary } from './specialized/creator/element-library';         // ✅ PRIMARY

// APP SHELL SYSTEM
export { AppShell } from './specialized/shell/app-shell';                       // ✅ PRIMARY
export { NavigationHeader } from './specialized/shell/navigation-header';       // ✅ PRIMARY
```

---

## 🟡 **LEGACY COMPONENTS (Preserved, Hidden from Storybook)**

### **Atomic Design System** (`/components/legacy/atomic/`)
Our new atomic components - preserved but HIVE branded versions are primary:

```typescript
// These work but HiveButton/HiveInput/etc are preferred
export { Button } from './legacy/atomic/button';           // 🟡 LEGACY
export { Input } from './legacy/atomic/input';             // 🟡 LEGACY
export { Card } from './legacy/atomic/card';               // 🟡 LEGACY
export { Textarea } from './legacy/atomic/textarea';       // 🟡 LEGACY
export { Select } from './legacy/atomic/select';           // 🟡 LEGACY
export { Radio } from './legacy/atomic/radio';             // 🟡 LEGACY
export { Label } from './legacy/atomic/label';             // 🟡 LEGACY
export { Tooltip } from './legacy/atomic/tooltip';         // 🟡 LEGACY
export { Progress } from './legacy/atomic/progress';       // 🟡 LEGACY
export { Tag } from './legacy/atomic/tag';                 // 🟡 LEGACY
export { Image } from './legacy/atomic/image';             // 🟡 LEGACY
export { Separator } from './legacy/atomic/separator';     // 🟡 LEGACY
export { Container } from './legacy/atomic/container';     // 🟡 LEGACY
export { Spacer } from './legacy/atomic/spacer';           // 🟡 LEGACY
```

### **shadcn/ui Base Components** (`/components/legacy/base/`)
Foundation components - use HIVE versions instead:

```typescript
// These are the base shadcn/ui components
export { Button as BaseButton } from './legacy/base/button';           // 🟡 LEGACY  
export { Card as BaseCard } from './legacy/base/card';                 // 🟡 LEGACY
export { Input as BaseInput } from './legacy/base/input';              // 🟡 LEGACY
export { Textarea as BaseTextarea } from './legacy/base/textarea';     // 🟡 LEGACY
export { Switch as BaseSwitch } from './legacy/base/switch';           // 🟡 LEGACY
export { Tooltip as BaseTooltip } from './legacy/base/tooltip';        // 🟡 LEGACY
export { Badge as BaseBadge } from './legacy/base/badge';              // 🟡 LEGACY
export { Alert } from './legacy/base/alert';                           // 🟡 LEGACY
export { AlertDialog } from './legacy/base/alert-dialog';              // 🟡 LEGACY
export { Popover } from './legacy/base/popover';                       // 🟡 LEGACY
```

### **Duplicate/Variant Components** (`/components/legacy/duplicates/`)
Alternative implementations - use primary versions instead:

```typescript
// Premium/enhanced versions - features should be integrated into primary
export { HiveCardPremium } from './legacy/duplicates/hive-card-premium';       // 🟡 LEGACY
export { HiveModularCard } from './legacy/duplicates/hive-modular-card';       // 🟡 LEGACY
export { HiveButtonPremium } from './legacy/duplicates/hive-button-premium';   // 🟡 LEGACY

// Alternative implementations - primary versions preferred
export { HiveCommandPalette } from './legacy/duplicates/hive-command-palette'; // 🟡 LEGACY (use enhanced version)
export { ProfileSystemSimple } from './legacy/duplicates/profile-system-simple'; // 🟡 LEGACY
```

---

## 📚 **Storybook Navigation Structure**

### **Featured in Main Navigation**
```
├── 00 - Overview
│   ├── Design System Introduction
│   └── Component Guidelines
├── 01 - Foundation  
│   ├── Design Tokens
│   ├── Motion System
│   └── Typography
├── 02 - HIVE Components
│   ├── Buttons (HiveButton)
│   ├── Forms (HiveInput, HiveTextarea, HiveSelect)
│   ├── Cards (HiveCard) 
│   ├── Navigation (HiveNavigation, HiveBreadcrumbs)
│   ├── Modals (HiveModal)
│   └── Feedback (HiveTooltip, HiveProgress, HiveBadge)
├── 03 - Specialized Features
│   ├── Profile System
│   ├── Space System
│   ├── Dashboard System
│   ├── Creator/Builder System
│   └── App Shell System
└── 04 - Layout System
    ├── Box, Grid, Stack
    └── Responsive Utilities
```

### **Hidden from Main Navigation (Available via URL)**
```
├── 🔗 Legacy - Atomic Components
├── 🔗 Legacy - Base Components  
├── 🔗 Legacy - Duplicates
└── 🔗 Edge Cases & Testing
```

---

## 🎯 **Migration Guide**

### **If You're Using Atomic Components**
```typescript
// OLD: Atomic system
import { Button, Input, Card } from './atomic/atoms';

// NEW: HIVE branded (preferred)
import { HiveButton, HiveInput, HiveCard } from './hive';
```

### **If You're Using Base Components**
```typescript
// OLD: shadcn/ui base
import { Button, Input, Card } from './ui';

// NEW: HIVE branded (preferred)  
import { HiveButton, HiveInput, HiveCard } from './hive';
```

### **If You're Using Legacy Variants**
```typescript
// OLD: Premium variants
import { HiveCardPremium, HiveButtonPremium } from './components';

// NEW: Primary with variants (enhanced)
import { HiveCard, HiveButton } from './hive';
// Use variant props: <HiveCard variant="premium" />
```

---

## ✅ **Component Status**

### **✅ Ready to Use (Primary)**
- All HIVE branded components (`/hive/*`)
- All specialized feature components (`/specialized/*`)
- Layout system components

### **🟡 Preserved but Legacy**
- Atomic design system components
- shadcn/ui base components
- Duplicate/variant implementations

### **🔄 Migration in Progress**
- Consolidating premium features into primary components
- Adding missing variants to primary components
- Creating comprehensive documentation

### **❌ Not Recommended**
- None (everything is preserved and functional)

---

## 🎉 **Benefits of This Organization**

### **For Developers**
- **Clear choice**: Use HIVE branded components as primary
- **No breaking changes**: All existing components still work
- **Better discovery**: Clean Storybook navigation
- **Consistent branding**: HIVE design system throughout

### **For Design System**
- **Single source of truth**: Primary components for each pattern
- **Easier maintenance**: Focus enhancement on primary components
- **Better documentation**: Comprehensive examples for primary components
- **Reduced confusion**: Clear guidance on what to use

### **For Storybook**
- **Clean navigation**: Only primary components featured
- **Better organization**: Logical grouping by domain
- **Hidden but accessible**: Legacy components available via URL
- **Professional presentation**: Focus on best examples

**Goal**: Provide clear guidance while preserving all existing work and maintaining backward compatibility.