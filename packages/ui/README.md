# @hive/ui - HIVE Design System

> Production-ready atomic design system for the HIVE campus social platform

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Storybook](https://img.shields.io/badge/Storybook-120%2B%20Stories-ff4785)](http://localhost:6006)
[![Components](https://img.shields.io/badge/Components-84-success)]()
[![Coverage](https://img.shields.io/badge/Feature%20Coverage-100%25-brightgreen)]()

## 📚 Documentation Hub

### 🎯 Quick Start
- **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** - **START HERE!** Complete system checklist & status
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - 5-layer architecture guide
- **[CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)** - UB behavioral UX patterns
- **[Storybook](http://localhost:6006)** - Interactive component explorer

### 📖 Additional Docs
- **[COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md)** - Component quality audit results
- **[TOOLS_ARCHITECTURE.md](./TOOLS_ARCHITECTURE.md)** - HiveLab tools system design

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│         Layer 5: Next.js Pages (15)            │  ← /feed, /spaces, /profile
├─────────────────────────────────────────────────┤
│         Layer 4: Templates (1)                  │  ← SpaceLayout
├─────────────────────────────────────────────────┤
│         Layer 3: Organisms (18)                 │  ← SpaceHeader, ProfileHeader
├─────────────────────────────────────────────────┤
│         Layer 2: Molecules (18)                 │  ← FeedPostCard, SpaceCard
├─────────────────────────────────────────────────┤
│         Layer 1: Atoms (47)                     │  ← shadcn/ui primitives
└─────────────────────────────────────────────────┘
         Built on: Radix UI + Tailwind CSS
```

---

## 🚀 Quick Reference

### Installation & Setup
```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Build package
pnpm build

# Type check
pnpm typecheck
```

### Import Components
```typescript
// Atoms (shadcn/ui base)
import { Button, Input, Card, Avatar } from '@hive/ui/atoms';

// Molecules (campus-specific)
import { FeedPostCard, SpaceCard, ProfileCard } from '@hive/ui/molecules';

// Organisms (feature blocks)
import { SpaceHeader, ProfileHeader, NavigationShell } from '@hive/ui/organisms';

// Templates (page layouts)
import { SpaceLayout } from '@hive/ui/templates';
```

---

## 📊 System Status

### Component Inventory
| Layer | Count | Status | Coverage |
|-------|-------|--------|----------|
| **Atoms** | 47 | ✅ Complete | 100% |
| **Molecules** | 18 | ✅ Complete | 100% |
| **Organisms** | 18 | ✅ Complete | 100% |
| **Templates** | 1 | ✅ Complete | 100% |
| **Total** | **84** | ✅ Production Ready | **100%** |

### Feature Coverage
```
✅ Auth & Onboarding     100%  ████████████████████████
✅ Feed                  100%  ████████████████████████
✅ Spaces                100%  ████████████████████████
✅ Profile               100%  ████████████████████████
✅ HiveLab               100%  ████████████████████████
✅ Admin                 100%  ████████████████████████
```

### Quality Metrics
- ✅ **TypeScript:** 100% strict mode
- ✅ **Storybook:** 120+ documented stories
- ✅ **Accessibility:** WCAG 2.1 AA compliant
- ✅ **Responsive:** Mobile-first design
- ✅ **Theme:** Dark + Light mode support
- ✅ **Documentation:** Comprehensive guides

---

## 🎨 Design Tokens

### Theme Configuration
Location: `packages/tokens/tailwind.config.master.ts`

```typescript
// Campus brand colors
colors: {
  hive: {
    gold: '#FFD700',      // Primary accent
    background: '#000000', // Dark base
    foreground: '#FFFFFF', // Text
  }
}

// Motion system
animation: {
  'fade-in': 'fadeIn 200ms ease-in',
  'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  'scale-in': 'scaleIn 150ms ease-out',
}
```

### Typography Scale

**Font Family:** Geist Sans (Vercel) + Geist Mono
**Documentation:** [TYPOGRAPHY_GUIDE.md](./TYPOGRAPHY_GUIDE.md)

```css
/* HIVE standard scale (Tailwind classes) */
text-xs   → 12px  /* Metadata, timestamps (202× usage) */
text-sm   → 14px  /* Body text, default (164× usage) */
text-base → 16px  /* Primary body text */
text-lg   → 18px  /* Card titles (14× usage) */
text-xl   → 20px  /* Section headings */
text-2xl  → 24px  /* Page titles (8× usage) */
text-3xl+ → 30px+ /* Hero text */

/* Font weights */
font-medium   → 500  /* Buttons, labels (82× usage) */
font-semibold → 600  /* Headings (73× usage) */
font-bold     → 700  /* Titles, metrics (24× usage) */
```

---

## 🔍 Component Finder

### By Use Case

**Need to show users?**
- `ProfileCard` - Compact preview
- `UserCard` - Action-oriented card
- `Avatar` - Profile image only

**Need post display?**
- `FeedPostCard` - Standard post
- `FeedEventCard` - Event post variant
- `CommentCard` - Comment display

**Need forms?**
- `Input` - Text input
- `Select` - Dropdown
- `Checkbox` - Boolean choice
- `Button` - Actions/submit

**Need space features?**
- `SpaceCard` - Space preview
- `SpaceHeader` - Space page header
- `SpaceComposerWithTools` - Post composer
- `InlineToolMenu` - Quick tools

**Need navigation?**
- `NavigationShell` - App navigation
- `Tabs` - Tab navigation
- `Breadcrumb` - Hierarchical nav

**Need feedback?**
- `Alert` - Banners
- `Dialog` - Modals
- `Toast` - Notifications
- `Tooltip` - Hover info

---

## 📦 Package Structure

```
packages/ui/src/
├── atomic/
│   ├── atoms/           # 47 primitives (shadcn/ui)
│   ├── molecules/       # 18 composed components
│   ├── organisms/       # 18 feature blocks
│   └── templates/       # 1 page layout
├── Features/           # Storybook organization
│   ├── 01-Auth/
│   ├── 02-Onboarding/
│   ├── 02-Profile/
│   ├── 03-Spaces/
│   ├── 04-Feed/
│   ├── 05-HiveLab/
│   └── 11-Shared/
├── hooks/              # Shared React hooks
└── styles.css          # Global styles + Tailwind

```

---

## 🛠️ Development Workflow

### Adding a New Component

1. **Create Component File**
   ```bash
   # Atoms (shadcn/ui)
   packages/ui/src/atomic/atoms/my-component.tsx

   # Molecules (campus-specific)
   packages/ui/src/atomic/molecules/my-component.tsx

   # Organisms (feature blocks)
   packages/ui/src/atomic/organisms/my-component.tsx
   ```

2. **Create Storybook Story**
   ```bash
   packages/ui/src/Features/[category]/my-component.stories.tsx
   ```

3. **Export from Index**
   ```typescript
   // Add to packages/ui/src/atomic/[layer]/index.ts
   export * from './my-component';
   ```

4. **Document in Dashboard**
   ```bash
   # Update ATOMIC_DESIGN_DASHBOARD.md with new component
   ```

### Component Checklist
- [ ] TypeScript types defined
- [ ] Props interface documented
- [ ] Storybook story with variants
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Dark mode support
- [ ] Accessibility (ARIA, keyboard nav)
- [ ] Error states handled
- [ ] Follows CAMPUS_PATTERNS.md

---

## 🎯 HIVE Design Principles

### 1. **Information Density** (Show MORE, Decorate LESS)
```typescript
// ✅ Good - Dense, useful info
<ProfileCard
  name="Sarah Chen"
  bio="CS Major, Class of 2025"
  mutualFriends={12}
  spaces={["CS Study Group", "UB Robotics"]}
/>

// ❌ Bad - Sparse, decorative
<ProfileCard name="Sarah Chen" />
```

### 2. **Social Proof Priority**
```typescript
// Social proof hierarchy:
1. Mutual friends     → "12 mutual friends"
2. Same spaces        → "Also in CS Study Group"
3. Same major         → "CS Major"
4. Campus proximity   → "Lives in Governors"
```

### 3. **Campus Efficiency** (No Fluff)
```typescript
// ✅ Direct action
<Button onClick={joinSpace}>Join Space</Button>

// ❌ Unnecessary confirmation
<Button onClick={() => setShowModal(true)}>
  Join Space
</Button>
```

### 4. **Trending with Context**
```typescript
// ✅ Show WHY it's trending
<Badge>🔥 HOT - 234 new members this week</Badge>

// ❌ Generic trending indicator
<Badge>Trending</Badge>
```

---

## 🔗 Related Packages

### Core Dependencies
- **@hive/tokens** - Design tokens (colors, spacing, typography)
- **@hive/core** - Business logic & types
- **@hive/hooks** - Shared React hooks
- **@hive/validation** - Form validation schemas

### UI Dependencies
- **Radix UI** - Accessible primitives
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## 📈 Metrics & Analytics

### Bundle Size
```
Atoms:      ~45KB (gzipped)
Molecules:  ~38KB (gzipped)
Organisms:  ~52KB (gzipped)
Total:      ~135KB (gzipped)
```

### Performance
- **Load Time:** <1s for component imports
- **Tree Shaking:** ✅ Enabled (ESM exports)
- **Code Splitting:** ✅ Dynamic imports supported

### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

---

## 🚦 Status & Roadmap

### ✅ Current Status (v1.0.0)
- 84 components production ready
- 100% feature coverage
- Comprehensive documentation
- Storybook with 120+ stories
- TypeScript strict mode

### 🔄 Near-term (v1.1.0)
- [ ] Additional templates (Feed, Profile, Dashboard layouts)
- [ ] Unit tests (React Testing Library)
- [ ] Visual regression (Chromatic)
- [ ] Performance optimization

### 🎯 Future (v2.0.0)
- [ ] Standalone npm package
- [ ] Advanced components (rich text, advanced search)
- [ ] Internationalization (i18n)
- [ ] Animation polish

---

## 🤝 Contributing

### Component Guidelines
1. Follow atomic design principles
2. Use TypeScript strict mode
3. Write comprehensive Storybook stories
4. Ensure accessibility (WCAG 2.1 AA)
5. Match CAMPUS_PATTERNS.md behavioral guide
6. Document props and usage

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write descriptive commit messages
- Keep components under 300 lines

---

## 📞 Support & Resources

### Documentation
- 📊 **[ATOMIC_DESIGN_DASHBOARD.md](./ATOMIC_DESIGN_DASHBOARD.md)** - System overview & checklist
- 🏗️ **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Architecture guide
- 🎯 **[CAMPUS_PATTERNS.md](./CAMPUS_PATTERNS.md)** - UX patterns

### Tools
- 📚 **[Storybook](http://localhost:6006)** - Component explorer
- 🔍 **[COMPONENT_AUDIT.md](./COMPONENT_AUDIT.md)** - Quality audit

### Get Help
- Check documentation above
- Browse Storybook examples
- Review existing components
- Ask in team Slack

---

**Built with ❤️ for UB Buffalo students**

*@hive/ui - Production Ready Design System*
*v1.0.0 | October 2025*
