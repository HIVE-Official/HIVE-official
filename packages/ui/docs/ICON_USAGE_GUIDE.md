# 🎨 HIVE Icon Usage Guide

**Last Updated:** 2025-10-02
**Primary Library:** Lucide React
**Secondary Library:** Radix UI Icons (limited use)

---

## 🎯 Icon Library Standards

### ✅ **Primary: Lucide React** (Recommended for ALL new components)

**Package:** `lucide-react` (v0.411.0)
**Documentation:** https://lucide.dev
**Usage:** Application UI, feature icons, interactive elements

```typescript
// ✅ CORRECT - Use Lucide React for new components
import {
  Settings,
  User,
  Bell,
  Shield,
  Mail,
  Heart,
  MessageCircle,
  Share2,
  Search,
  ChevronDown
} from 'lucide-react';

// Example usage
<Mail className="h-4 w-4 text-muted-foreground" />
<Heart className="h-5 w-5 text-destructive fill-current" />
<Settings className="h-6 w-6" />
```

### 🔧 **Secondary: Radix UI Icons** (Legacy shadcn components only)

**Package:** `@radix-ui/react-icons` (v1.3.2)
**Usage:** Only in existing shadcn/ui base components
**Status:** Gradually migrate to Lucide

```typescript
// ⚠️ LEGACY - Only in existing shadcn components
import { MagnifyingGlassIcon, ChevronDownIcon } from "@radix-ui/react-icons";

// Currently used in:
// - search-bar.tsx (MagnifyingGlassIcon)
// - Some shadcn primitives
```

---

## 📊 Current Usage Status

### Icon Library Distribution

```
Lucide React:        38 files  ████████████████████████  68%
Radix UI Icons:      18 files  ████████████              32%
```

### Where They're Used

**Lucide React (Primary):**
- ✅ Apps (web, admin) - **100%**
- ✅ Feature components - **80%+**
- ✅ New molecules/organisms - **Preferred**
- ✅ Stories and examples - **Preferred**

**Radix UI Icons (Legacy):**
- 🔧 shadcn/ui base atoms - **Some components**
- 🔧 Older molecules - **Being migrated**
- 🔧 Command palette icons - **Some**

---

## 🚀 Usage Patterns

### Common Icon Categories

#### **Navigation & Actions**
```typescript
import {
  Home,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  MoreVertical
} from 'lucide-react';
```

#### **Social & Engagement**
```typescript
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  UserPlus,
  Users,
  Send,
  ThumbsUp,
  Star
} from 'lucide-react';
```

#### **Content & Media**
```typescript
import {
  Image,
  Video,
  File,
  FileText,
  Link,
  Paperclip,
  Camera,
  Upload,
  Download
} from 'lucide-react';
```

#### **Status & Feedback**
```typescript
import {
  Check,
  CheckCircle,
  CheckCircle2,
  X,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
  Clock
} from 'lucide-react';
```

#### **Campus & Platform Specific**
```typescript
import {
  GraduationCap,  // Education/Campus
  Calendar,        // Events
  MapPin,          // Location
  Building,        // Buildings/Spaces
  BookOpen,        // Resources
  Trophy,          // Achievements
  Target,          // Rituals/Goals
  Zap,            // Activity/Trending
  Flame           // Streaks
} from 'lucide-react';
```

---

## 🎨 Icon Sizing Standards

### Size Classes (Tailwind)
```typescript
// Extra Small - Inline text icons
<Icon className="h-3 w-3" />  // 12px

// Small - Secondary actions, metadata
<Icon className="h-4 w-4" />  // 16px (Most common)

// Medium - Primary actions, buttons
<Icon className="h-5 w-5" />  // 20px

// Large - Feature highlights, empty states
<Icon className="h-6 w-6" />  // 24px

// Extra Large - Hero sections, placeholders
<Icon className="h-8 w-8" />  // 32px
<Icon className="h-12 w-12" /> // 48px
```

### Common Patterns

```typescript
// Button with icon (left)
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Send Email
</Button>

// Button with icon (right)
<Button>
  Continue
  <ChevronRight className="ml-2 h-4 w-4" />
</Button>

// Icon-only button
<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5" />
</Button>

// With color states
<Heart className="h-5 w-5 text-destructive fill-current" />
<Bell className="h-5 w-5 text-primary" />
<Check className="h-4 w-4 text-green-600" />
```

---

## 🔄 Migration Guide

### Radix → Lucide Icon Mapping

| Radix UI Icon | Lucide React Equivalent | Notes |
|--------------|------------------------|-------|
| `MagnifyingGlassIcon` | `Search` | Exact match |
| `ChevronDownIcon` | `ChevronDown` | Exact match |
| `ChevronRightIcon` | `ChevronRight` | Exact match |
| `Cross2Icon` | `X` | Close/dismiss actions |
| `DotsHorizontalIcon` | `MoreHorizontal` | Menu overflow |
| `PersonIcon` | `User` | User/profile |
| `GearIcon` | `Settings` | Settings/config |
| `BellIcon` | `Bell` | Notifications |
| `HomeIcon` | `Home` | Home/dashboard |
| `PlusIcon` | `Plus` | Add/create |
| `MinusIcon` | `Minus` | Remove/subtract |

### Migration Steps

1. **Find Radix icon usage:**
   ```bash
   grep -r "@radix-ui/react-icons" src/atomic --include="*.tsx"
   ```

2. **Replace import:**
   ```typescript
   // Before
   import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

   // After
   import { Search } from "lucide-react"
   ```

3. **Update JSX:**
   ```typescript
   // Before
   <MagnifyingGlassIcon className="h-4 w-4" />

   // After
   <Search className="h-4 w-4" />
   ```

4. **Test visually** - Icons should look identical

---

## 📋 Component Checklist

### For New Components
- [ ] Use Lucide React for all icons
- [ ] Apply consistent sizing (h-4 w-4 default)
- [ ] Use semantic icon names (Search not MagnifyingGlass)
- [ ] Add proper color classes (text-muted-foreground, etc.)
- [ ] Ensure accessibility (aria-hidden="true" for decorative)
- [ ] Document icon choices in Storybook

### For Existing Components (Migration)
- [ ] Identify Radix icon usage
- [ ] Map to Lucide equivalents
- [ ] Replace imports and usage
- [ ] Test visual appearance
- [ ] Update Storybook documentation
- [ ] Remove unused Radix imports

---

## 🎯 Best Practices

### 1. **Consistent Sizing**
```typescript
// ✅ Good - Consistent sizes
<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5" />
</Button>

// ❌ Bad - Inconsistent sizes
<Button variant="ghost" size="icon">
  <Settings className="h-7 w-6" /> {/* Wrong aspect ratio */}
</Button>
```

### 2. **Semantic Colors**
```typescript
// ✅ Good - Semantic color classes
<AlertCircle className="h-4 w-4 text-destructive" />
<CheckCircle className="h-4 w-4 text-green-600" />
<Info className="h-4 w-4 text-blue-600" />

// ❌ Bad - Arbitrary colors
<AlertCircle className="h-4 w-4" style={{ color: '#ff0000' }} />
```

### 3. **Accessibility**
```typescript
// ✅ Good - Decorative icon (aria-hidden)
<Button>
  <Search className="mr-2 h-4 w-4" aria-hidden="true" />
  Search
</Button>

// ✅ Good - Icon with label for screen readers
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="h-5 w-5" aria-hidden="true" />
</Button>

// ❌ Bad - Missing aria-label on icon-only button
<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5" />
</Button>
```

### 4. **Loading States**
```typescript
// ✅ Good - Animated spinner
<Button disabled={isLoading}>
  {isLoading ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    <Send className="mr-2 h-4 w-4" />
  )}
  Send Message
</Button>
```

### 5. **Interactive States**
```typescript
// ✅ Good - State-aware icons
<button
  onClick={() => setLiked(!liked)}
  className="transition-colors"
>
  <Heart
    className={cn(
      "h-5 w-5 transition-colors",
      liked
        ? "text-destructive fill-current"
        : "text-muted-foreground"
    )}
  />
</button>
```

---

## 🔗 Resources

### Documentation
- **Lucide Icons:** https://lucide.dev (primary)
- **Radix Icons:** https://icons.radix-ui.com (legacy reference)
- **Icon Search:** https://lucide.dev/icons - Search all 1000+ icons

### Common HIVE Icons (Lucide)
```typescript
// Core platform
Home, Search, Bell, Settings, User, Users, Menu, X

// Social features
Heart, MessageCircle, Share2, Bookmark, UserPlus

// Content
Image, Video, File, Link, Paperclip, Upload, Download

// Campus specific
GraduationCap, Calendar, MapPin, Building, BookOpen, Trophy, Target

// Status
Check, CheckCircle, X, XCircle, AlertCircle, Info, Loader2

// Navigation
ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowLeft, ArrowRight
```

### Installation
```bash
# Already installed in package.json
pnpm add lucide-react  # v0.411.0
```

### Import Pattern
```typescript
// Named imports only (tree-shakeable)
import { Heart, Bell, Search } from 'lucide-react';

// ❌ Don't use default import
import Lucide from 'lucide-react'; // Wrong
```

---

## 📈 Migration Progress

### Current Status
- **Lucide React:** Primary library ✅
- **Apps (web/admin):** 100% Lucide ✅
- **UI Package:** ~68% Lucide, 32% Radix 🔄
- **Target:** 100% Lucide by Q1 2025

### Migration Phases

**Phase 1 (Completed):**
- [x] Install Lucide React
- [x] Document usage standards
- [x] Use Lucide in all new components

**Phase 2 (In Progress):**
- [ ] Migrate molecules (18 files with Radix icons)
- [ ] Update Storybook examples
- [ ] Document icon choices per component

**Phase 3 (Planned):**
- [ ] Migrate remaining atoms
- [ ] Remove Radix UI Icons dependency
- [ ] Final audit and cleanup

---

## 🚨 Common Issues

### Issue: Icon not rendering
```typescript
// ❌ Wrong - Typo in import
import { Seach } from 'lucide-react'; // Typo!

// ✅ Correct
import { Search } from 'lucide-react';
```

### Issue: Size looks wrong
```typescript
// ❌ Wrong - Missing width/height
<Search className="h-4" /> // Only height!

// ✅ Correct - Both width and height
<Search className="h-4 w-4" />
```

### Issue: Icon color not changing
```typescript
// ❌ Wrong - Inline style overriding Tailwind
<Search style={{ color: 'gray' }} className="text-primary" />

// ✅ Correct - Use Tailwind only
<Search className="text-primary" />
```

### Issue: Animation not working
```typescript
// ❌ Wrong - Missing animate class
<Loader2 className="h-4 w-4" />

// ✅ Correct - Add animate-spin
<Loader2 className="h-4 w-4 animate-spin" />
```

---

**🎯 Summary: Use Lucide React for all new components. Migrate from Radix UI Icons gradually.**

*For questions or icon requests, check https://lucide.dev or ask in #hive-design-system*
