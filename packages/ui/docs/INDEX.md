# 📚 HIVE UI Documentation Index

> **Complete documentation map for @hive/ui design system**

---

## 🎯 START HERE

### For New Developers
1. **[README.md](./README.md)** - Package overview & quick start
2. **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** - Complete system checklist
3. **[Storybook](http://localhost:6006)** - Interactive component explorer

### For Designers
1. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - 5-layer architecture guide
2. **[CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)** - UB behavioral UX patterns
3. **[Storybook](http://localhost:6006)** - Visual component library

### For Product Managers
1. **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** - Feature coverage & status
2. **[../../SPEC.md](../../SPEC.md)** - Platform specification
3. **[COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md)** - Quality audit results

---

## 📖 Documentation Structure

```
packages/ui/
├── 📄 README.md                          ← Package overview
├── 📊 ATOMIC_DESIGN_DASHBOARD.md         ← ⭐ MAIN DASHBOARD
├── 🏗️ DESIGN_SYSTEM.md                   ← Architecture guide
├── 🎯 CAMPUS_PATTERNS.md                 ← UX behavioral guide
├── 📋 COMPONENT_AUDIT.md                 ← Quality audit
├── 🔧 TOOLS_ARCHITECTURE.md              ← HiveLab design
├── 📚 DOCS_INDEX.md                      ← This file
└── 🌐 Storybook (localhost:6006)         ← Live examples
```

---

## 📊 Documentation by Purpose

### System Architecture
| Document | Purpose | Audience |
|----------|---------|----------|
| **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** | 5-layer architecture, component hierarchy | Engineers, Architects |
| **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** | Complete component inventory & status | Everyone |
| **[TOOLS_ARCHITECTURE.md](./TOOLS_ARCHITECTURE.md)** | HiveLab tools system design | Product, Engineers |

### Design & UX
| Document | Purpose | Audience |
|----------|---------|----------|
| **[CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)** | UB-specific behavioral patterns | Designers, Product |
| **[Storybook](http://localhost:6006)** | Interactive component library | Designers, Engineers |
| **Design Tokens** | Colors, spacing, typography | Designers |

### Quality & Testing
| Document | Purpose | Audience |
|----------|---------|----------|
| **[COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md)** | Component quality audit | QA, Engineers |
| **Storybook Stories** | Component documentation | Engineers |
| **TypeScript Types** | API documentation | Engineers |

### Getting Started
| Document | Purpose | Audience |
|----------|---------|----------|
| **[README.md](./README.md)** | Quick start & setup | New developers |
| **[DOCS_INDEX.md](./DOCS_INDEX.md)** | This documentation map | Everyone |

---

## 🔍 Find What You Need

### I want to...

#### **Understand the system**
→ Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for architecture
→ Read [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md) for inventory

#### **Build a new feature**
→ Check [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md) for existing components
→ Read [CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md) for UX patterns
→ Browse [Storybook](http://localhost:6006) for examples

#### **Create a new component**
→ Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for layer guidelines
→ Follow [README.md](./README.md#development-workflow) workflow
→ Match [CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md) patterns

#### **Review quality**
→ Check [COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md) for audit results
→ Review [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md) for coverage
→ Test in [Storybook](http://localhost:6006)

#### **Understand HiveLab**
→ Read [TOOLS_ARCHITECTURE.md](./TOOLS_ARCHITECTURE.md) for design
→ Check [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-hivelab-organisms-55---100) for components

#### **Check platform status**
→ See [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-feature-coverage-map)
→ Review [../../SPEC.md](../../SPEC.md) for requirements

---

## 📋 Component Documentation

### By Layer

#### Layer 1: Atoms (47 components)
- **Location:** `src/atomic/atoms/`
- **Source:** shadcn/ui primitives
- **Examples:** Button, Input, Card, Avatar
- **Stories:** http://localhost:6006/?path=/docs/atoms--docs
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-layer-1-atoms-shadcnui-base---47-components)

#### Layer 2: Molecules (18 components)
- **Location:** `src/atomic/molecules/`
- **Source:** Campus-specific composites
- **Examples:** FeedPostCard, SpaceCard, ProfileCard
- **Stories:** http://localhost:6006/?path=/docs/molecules--docs
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-layer-2-hive-molecules-18-components)

#### Layer 3: Organisms (18 components)
- **Location:** `src/atomic/organisms/`
- **Source:** Feature blocks
- **Examples:** SpaceHeader, ProfileHeader, NavigationShell
- **Stories:** http://localhost:6006/?path=/docs/organisms--docs
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#%EF%B8%8F-layer-3-hive-organisms-18-components)

#### Layer 4: Templates (1 component)
- **Location:** `src/atomic/templates/`
- **Source:** Page layouts
- **Examples:** SpaceLayout
- **Stories:** http://localhost:6006/?path=/docs/templates--docs
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-layer-4-templates-1-component)

### By Feature

#### Auth & Onboarding
- **Components:** Input, Button, Select, Card, Progress, ProfileCompletion
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-auth--onboarding-100)
- **Stories:** http://localhost:6006/?path=/story/01-auth--docs

#### Feed
- **Components:** FeedPostCard, FeedEventCard, FeedFilters, RitualsCardStrip, CommentCard
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-feed-100)
- **Stories:** http://localhost:6006/?path=/story/04-feed--docs

#### Spaces
- **Components:** SpaceCard, SpaceHeader, SpacePostFeed, SpaceComposerWithTools, InlineToolMenu
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-spaces-100)
- **Stories:** http://localhost:6006/?path=/story/03-spaces--docs

#### Profile
- **Components:** ProfileHeader, ProfileCard, ProfileStats, ActivityTimeline, ConnectionList
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-profile-100)
- **Stories:** http://localhost:6006/?path=/story/02-profile--docs

#### HiveLab
- **Components:** HiveLabBuilderCanvas, HiveLabTemplateBrowser, HiveLabAnalytics, InlineToolMenu
- **Docs:** [ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md#-hivelab-100)
- **Stories:** http://localhost:6006/?path=/story/05-hivelab--docs

---

## 🎨 Design Resources

### Design System
- **Architecture:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Patterns:** [CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)
- **Typography:** [TYPOGRAPHY_GUIDE.md](./TYPOGRAPHY_GUIDE.md) - Geist Sans standards
- **Font Verification:** [GEIST_VERIFICATION.md](./GEIST_VERIFICATION.md) - ✅ Setup confirmed
- **Tokens:** `packages/tokens/tailwind.config.master.ts`
- **Styles:** `src/styles.css`

### Visual Assets
- **Icons:** Lucide React - See [ICON_USAGE_GUIDE.md](./ICON_USAGE_GUIDE.md) for standards
- **Icon Library:** https://lucide.dev (1000+ icons)
- **Logo:** `src/atomic/atoms/hive-logo.tsx`
- **Colors:** HIVE Gold (#FFD700) + Dark theme
- **Fonts:** System fonts (optimized)

### Storybook Links
- **All Components:** http://localhost:6006
- **Design System:** http://localhost:6006/?path=/docs/design-system-overview--docs
- **Atoms:** http://localhost:6006/?path=/docs/atoms--docs
- **Molecules:** http://localhost:6006/?path=/story/04-feed-feedpostcard--docs
- **Organisms:** http://localhost:6006/?path=/story/03-spaces-spaceheader--docs

---

## 🔧 Development Resources

### Setup & Commands
```bash
# Install
pnpm install

# Storybook (dev)
pnpm storybook

# Build package
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### File Locations
- **Components:** `packages/ui/src/atomic/`
- **Stories:** `packages/ui/src/Features/`
- **Hooks:** `packages/ui/src/hooks/`
- **Types:** `packages/core/src/types/`
- **Tokens:** `packages/tokens/`

### Import Paths
```typescript
// Components
import { Button } from '@hive/ui/atoms';
import { FeedPostCard } from '@hive/ui/molecules';
import { SpaceHeader } from '@hive/ui/organisms';

// Hooks
import { useMobile } from '@hive/ui/hooks';

// Types
import type { Profile } from '@hive/core';
```

---

## 📊 Quick Stats

### Component Count
```
Total:      84 components
Atoms:      47 (shadcn/ui)
Molecules:  18 (campus-specific)
Organisms:  18 (feature blocks)
Templates:   1 (page layouts)
```

### Documentation Coverage
```
README.md:                  ✅ Complete
ATOMIC_DESIGN_DASHBOARD:    ✅ Complete (main reference)
DESIGN_SYSTEM.md:           ✅ Complete
CAMPUS_PATTERNS.md:         ✅ Complete
COMPONENT_AUDIT.md:         ✅ Complete
Storybook Stories:          ✅ 120+ stories
TypeScript Docs:            ✅ Auto-generated
```

### Feature Coverage
```
Auth & Onboarding:  100% ████████████████████████
Feed:               100% ████████████████████████
Spaces:             100% ████████████████████████
Profile:            100% ████████████████████████
HiveLab:            100% ████████████████████████
Admin:              100% ████████████████████████
```

---

## 🚀 Key Resources

### Must-Read Documentation
1. ⭐ **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** - Start here! Complete system overview
2. 🏗️ **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Understand the architecture
3. 🎯 **[CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)** - Learn UX patterns
4. 📖 **[README.md](./README.md)** - Quick start guide

### Essential Tools
1. 🌐 **[Storybook](http://localhost:6006)** - Explore components visually
2. 📝 **TypeScript** - Type-safe development
3. 🎨 **Tailwind CSS** - Styling system
4. ♿ **Radix UI** - Accessible primitives

### Quality Assurance
1. ✅ **[COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md)** - Quality checklist
2. 🧪 **Storybook Stories** - Visual testing
3. 📱 **Responsive Design** - Mobile-first
4. ♿ **WCAG 2.1 AA** - Accessibility

---

## 📞 Get Help

### Internal Resources
- **This Index:** Overview of all docs
- **README:** Quick start & setup
- **Storybook:** Component examples
- **Type Definitions:** IntelliSense in IDE

### External Resources
- **Radix UI Docs:** https://radix-ui.com
- **Tailwind Docs:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev

### Contact
- Team Slack: #hive-design-system
- Issues: GitHub repository
- Documentation: This folder

---

**📚 Documentation Last Updated:** 2025-10-02
**🎨 Design System Version:** 1.0.0
**✅ Status:** Production Ready

*Navigate with confidence - every component is documented!*
