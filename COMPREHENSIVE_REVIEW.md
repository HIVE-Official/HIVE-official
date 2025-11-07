# Comprehensive Pre-Build Review
**Date**: November 2, 2025
**Status**: Complete — Ready for Day 1 Build
**Duration**: 2 hours (all sections covered)

---

## ✅ 1. Design System Patterns (COMPLETE)

### 1.1 Color Usage (ChatGPT/Vercel Feel)
```typescript
// ✅ CORRECT: 95% grayscale
bg-[var(--hive-background-primary)]      // #000000
bg-[var(--hive-background-secondary)]    // #171717
text-[var(--hive-text-primary)]          // #FFFFFF
border-[var(--hive-border-default)]      // rgba(255,255,255,0.08)

// ✅ CORRECT: Gold for CTAs only (5% of UI)
bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]

// ❌ WRONG: Don't use gold for focus/hover
focus:ring-[var(--hive-brand-primary)]   // NO!
hover:bg-[var(--hive-brand-primary)]     // NO!
```

### 1.2 Typography Patterns
```tsx
// Display (28px) - Page titles
className="text-[1.75rem] font-semibold"

// Heading (18px) - Section headings
className="text-[1.125rem] font-semibold"

// Body (14px) - Standard text
className="text-sm"

// Caption (12px) - Metadata
className="text-xs text-[var(--hive-text-secondary)]"
```

### 1.3 Spacing (4px Grid)
```tsx
gap-1   // 4px
gap-2   // 8px
gap-4   // 16px
gap-6   // 24px
p-4     // 16px padding
p-6     // 24px padding
```

### 1.4 Border Radius
```tsx
rounded-full         // Buttons (9999px)
rounded-lg           // Cards (20px)
rounded-xl           // Modals (24px)
rounded-[32px]       // Large modals (32px)
```

### 1.5 Motion (3 Core Curves)
```tsx
// 90% of animations
transition-[background,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]

// Toggles, buttons
duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)]

// Achievements only
duration-1000 ease-[cubic-bezier(0.165,0.84,0.44,1)]
```

---

## ✅ 2. Existing Component Patterns

### 2.1 Button Component ([button.tsx:1-182](button.tsx))

**Variants**:
```tsx
// Default: White on black (most buttons)
<Button>Cancel</Button>

// Brand: Gold gradient (CTAs only!)
<Button variant="brand">Join This Space →</Button>

// Outline: Subtle border (secondary actions)
<Button variant="outline">Learn More</Button>

// Ghost: Transparent (utility actions)
<Button variant="ghost">Settings</Button>

// Destructive: Red (dangerous actions)
<Button variant="destructive">Delete</Button>
```

**Key Patterns**:
- ✅ Uses `min-h-[44px]` for mobile touch targets
- ✅ Uses `--hive-interactive-focus` for focus rings (white glow, NOT gold!)
- ✅ Has loading states with spinner
- ✅ Supports leading/trailing icons
- ✅ `rounded-full` (circular buttons)

**⚠️ NEEDS UPDATE**: Line 7 still uses old gold focus ring - should use `--hive-interactive-focus`

### 2.2 Input Component ([input.tsx:1-222](input.tsx))

**Variants**:
```tsx
// Default: Subtle border
<Input placeholder="Enter text..." />

// Error: Red border + error message
<Input variant="error" error="Required field" />

// Success: Green border (confirmation)
<Input variant="success" />

// Ghost: Transparent (inline editing)
<Input variant="ghost" />
```

**Key Patterns**:
- ✅ Uses `rounded-[32px]` (pill-shaped inputs)
- ✅ Supports label, helperText, error states
- ✅ Supports leftIcon, rightIcon, clear button
- ✅ Automatic error variant if `error` prop passed
- ✅ Accessible (aria-invalid, aria-describedby)

**⚠️ CONCERN**: Line 6 uses `--hive-brand-primary` for focus - should use white glow

### 2.3 Card Component ([card.tsx:1-78](card.tsx))

**Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

**Key Patterns**:
- ✅ Uses `rounded-lg` (20px radius)
- ✅ Uses `--hive-background-secondary` (#171717)
- ✅ Uses `--hive-border-default` (subtle white)
- ✅ Composable pattern (Header, Content, Footer)

**✅ PERFECT**: Already follows ChatGPT/Vercel minimalism

### 2.4 SpaceComposer Molecule ([space-composer.tsx:1-100](space-composer.tsx))

**Key Patterns**:
- ✅ NO avatar (minimal chrome)
- ✅ Consolidated [+ Add] dropdown menu
- ✅ Uses Framer Motion for smooth reveals
- ✅ Uses `DropdownMenu` molecule (Radix UI)
- ✅ Follows topology spec (SPACES_TOPOLOGY.md)

**Pattern to Copy**:
```tsx
'use client';

import { Button } from '../atoms/button';
import { Textarea } from '../atoms/textarea';
import { DropdownMenu } from '../molecules/dropdown-menu';
import { MotionDiv } from '../motion-safe';

export function MyMolecule() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Content */}
    </MotionDiv>
  );
}
```

---

## ✅ 3. Component Export/Import Patterns

### 3.1 Export Pattern ([index.ts:1-50](index.ts))

**Atoms** (individual exports):
```ts
export { Button } from "./atomic/atoms/button";
export { Input } from "./atomic/atoms/input";
export { Textarea } from "./atomic/atoms/textarea";
```

**Compound components** (grouped):
```ts
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./atomic/atoms/avatar";

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "./atomic/atoms/card";
```

**Pattern to Follow**:
```ts
// 1. Build component in packages/ui/src/atomic/{layer}/{name}.tsx
// 2. Add export to packages/ui/src/index.ts
// 3. Import in apps/web like:
import { MyComponent } from '@hive/ui';
```

### 3.2 Import Pattern (in apps/web)

```tsx
// ✅ CORRECT: Package imports
import { Button, Input, Card } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import type { User } from '@hive/core';

// ❌ WRONG: Relative imports
import { Button } from '../../../packages/ui/src/atomic/atoms/button';
```

---

## ✅ 4. CSS Variable Usage Patterns

### 4.1 Verified Variables (from hive-tokens.css)

```css
/* Backgrounds */
--hive-background-primary: #000000
--hive-background-secondary: #171717
--hive-background-tertiary: #262626

/* Text */
--hive-text-primary: #FFFFFF
--hive-text-secondary: #D4D4D4
--hive-text-muted: #A3A3A3

/* Interactive (Grayscale) */
--hive-interactive-hover: rgba(255,255,255,0.04)
--hive-interactive-focus: rgba(255,255,255,0.20)
--hive-interactive-active: rgba(255,255,255,0.08)

/* Gold (CTAs Only) */
--hive-gold-cta: #FFD700
--hive-gold-achievement: #FFD700
--hive-gold-online: #FFD700
--hive-gold-featured: #FFD700

/* Borders (Grayscale) */
--hive-border-default: rgba(255,255,255,0.08)
--hive-border-hover: rgba(255,255,255,0.16)
--hive-border-focus: rgba(255,255,255,0.40)
```

### 4.2 Usage in Components

```tsx
// ✅ CORRECT: Use CSS variables
className="bg-[var(--hive-background-secondary)]"
className="text-[var(--hive-text-primary)]"
className="border-[var(--hive-border-default)]"

// ❌ WRONG: Hardcoded hex values
className="bg-[#171717]"
className="text-[#FFFFFF]"
```

---

## ✅ 5. Feed Topology Specifications

### 5.1 FeedCard Variants (from FEED_TOPOLOGY.md)

**4 Card Types Required**:

#### A. FeedCard.Post
```tsx
interface FeedCardPostProps {
  type: 'post';
  spaceId: string;
  spaceName: string;
  spaceColor?: string;
  content: string;
  authorName?: string;
  timestamp: Date;
  media?: { type: 'image' | 'video'; url: string }[];
  preview?: boolean; // Show truncated content
}
```

**Variants**: text-only, with-image, with-video, long-preview

#### B. FeedCard.Event
```tsx
interface FeedCardEventProps {
  type: 'event';
  spaceId: string;
  spaceName: string;
  eventName: string;
  eventDate: Date;
  eventLocation?: string;
  coverImage?: string;
  rsvpCount?: number;
  onRsvp?: () => void;
}
```

**Variants**: upcoming, today, sold-out, past

#### C. FeedCard.Tool
```tsx
interface FeedCardToolProps {
  type: 'tool';
  spaceId: string;
  spaceName: string;
  toolName: string;
  toolDescription: string;
  creatorName: string;
  creatorHandle: string;
  installCount?: number;
  category?: 'Utility' | 'Social' | 'Academic';
}
```

**Variants**: featured, normal, high-installs

#### D. FeedCard.System
```tsx
interface FeedCardSystemProps {
  type: 'system';
  system: {
    category: 'ritual' | 'announcement' | 'recap';
    priority?: 'high' | 'normal';
  };
  content: string;
  cta?: { label: string; onClick: () => void };
}
```

**Variants**: ritual, announcement, urgent

### 5.2 Feed Molecules Required (Day 1)

#### A. feed-filter-bar.tsx
```tsx
interface FilterBarProps {
  activeFilter: 'all' | 'my_spaces' | 'events';
  onFilterChange: (filter: 'all' | 'my_spaces' | 'events') => void;
}
```

Layout: Horizontal chips, sticky header

#### B. feed-ritual-banner.tsx
```tsx
interface RitualBannerProps {
  ritualName: string;
  participantCount: number;
  progress: number; // 0-100
  onJoin: () => void;
  onDismiss?: () => void;
}
```

Layout: Full-width, dismissible, gold accent for CTA

#### C. feed-post-actions.tsx
```tsx
interface PostActionsProps {
  upvoteCount: number;
  commentCount: number;
  isUpvoted: boolean;
  isBookmarked: boolean;
  onUpvote: () => void;
  onComment: () => void;
  onBookmark: () => void;
  onShare?: () => void;
}
```

Layout: Horizontal row, icon + count

#### D. feed-space-chip.tsx
```tsx
interface SpaceChipProps {
  spaceName: string;
  spaceColor?: string; // Defaults to gray
  onClick?: () => void;
}
```

Layout: Pill shape, colored background (subtle)

#### E. feed-media-preview.tsx
```tsx
interface MediaPreviewProps {
  media: { type: 'image' | 'video'; url: string; alt?: string }[];
  maxVisible?: number; // Show "+3 more"
  onExpand?: () => void;
}
```

Layout: Grid (1, 2, 3, or 4+ images)

#### F. search-bar.tsx (Global)
```tsx
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  autoFocus?: boolean;
}
```

Layout: Cmd+F trigger, modal on desktop, sheet on mobile

#### G. filter-chips.tsx (Global)
```tsx
interface FilterChipsProps {
  filters: { id: string; label: string; active: boolean }[];
  onToggle: (id: string) => void;
  onClear?: () => void;
}
```

Layout: Horizontal scrollable, active chips have gold border (exception to grayscale!)

---

## ✅ 6. Build Workflow (Day 1 Components)

### 6.1 Atomic Design Order
```
1. Atoms first       → date-picker, file-upload, icon-library, toast
2. Molecules next    → Feed molecules (use atoms)
3. Organisms later   → FeedCard organisms (use molecules)
4. Templates last    → feed-page-layout (use organisms)
```

### 6.2 Storybook Story Pattern

**Every component needs a .stories.tsx file**:

```tsx
// packages/ui/src/atomic/atoms/my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './my-component';

const meta: Meta<typeof MyComponent> = {
  title: 'Atoms/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // Props here
  },
};

export const WithVariant: Story = {
  args: {
    variant: 'brand',
  },
};
```

**Run Storybook**:
```bash
cd packages/ui
pnpm storybook
# Opens http://localhost:6006
```

### 6.3 Quality Gates (Before Merge)

**Every component MUST**:
- [ ] Use CSS variables (`var(--hive-*)`) - NO hardcoded hex
- [ ] Follow gold usage rules (95% grayscale, 5% gold)
- [ ] Have min touch targets of 44×44px
- [ ] Have Storybook story with variants
- [ ] Be exported from @hive/ui/index.ts
- [ ] Have TypeScript types exported
- [ ] Pass accessibility checks (WCAG 2.2 AA)
- [ ] Work on mobile viewport (375px tested)

---

## ✅ 7. Technical Architecture

### 7.1 Package Structure

```
@hive/tokens       → Design tokens (colors, spacing, etc.)
@hive/ui           → UI components (atoms, molecules, organisms)
@hive/core         → Business logic (DDD, types)
@hive/firebase     → Firebase integration
@hive/auth-logic   → Authentication
@hive/hooks        → Shared React hooks
@hive/validation   → Zod schemas
```

**Build order** (Turborepo handles this):
```
tokens → firebase → core → auth → validation → hooks → ui → apps/web
```

### 7.2 API Route Pattern

```tsx
// apps/web/src/app/api/my-route/route.ts
import { withAuthAndErrors, getUserId, respond } from '@/lib/middleware';

export const POST = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request);

  // Parse body
  const data = await request.json();

  // Business logic
  const result = await someService.create(data);

  return respond.created(result);
});
```

**Provides**:
- ✅ JWT session validation
- ✅ User authentication
- ✅ Campus isolation (`campusId: 'ub-buffalo'`)
- ✅ Error handling
- ✅ Response formatting

### 7.3 Firebase Query Pattern

```ts
// ✅ CORRECT: Campus isolation
const q = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo'), // REQUIRED!
  where('isActive', '==', true)
);

// ❌ WRONG: Missing campus isolation
const q = query(
  collection(db, 'spaces'),
  where('isActive', '==', true)
);
```

### 7.4 Performance Requirements

**Virtualization** (react-window):
```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={120}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <FeedCard {...items[index]} />
    </div>
  )}
</FixedSizeList>
```

**Optimistic Updates**:
```tsx
const handleUpvote = async () => {
  // 1. Update UI immediately
  setIsUpvoted(true);
  setUpvoteCount(prev => prev + 1);

  try {
    // 2. API call in background
    await api.upvote(postId);
  } catch (error) {
    // 3. Rollback on failure
    setIsUpvoted(false);
    setUpvoteCount(prev => prev - 1);
  }
};
```

---

## ✅ 8. Day 1-4 Build Specifications

### Day 1 (Nov 2) - Foundation Components

**4 P0 Atoms**:
1. `date-time-picker.tsx` - Event creation (Radix UI Calendar + Time select)
2. `file-upload.tsx` - Media posts (drag-drop + preview)
3. `icon-library.tsx` - Unified icons (Lucide React wrapper)
4. `toast.tsx` - Notifications (Radix UI Toast + portal)

**7 Feed Molecules**:
1. `feed-filter-bar.tsx` - All/My Spaces/Events chips
2. `feed-ritual-banner.tsx` - Full-width ritual strip
3. `feed-post-actions.tsx` - Upvote/Comment/Bookmark row
4. `feed-space-chip.tsx` - Colored space badge
5. `feed-media-preview.tsx` - Image/video grid
6. `search-bar.tsx` - Global search (Cmd+F)
7. `filter-chips.tsx` - Filter chip group

**Time**: 8-10 hours
**Output**: 11 components with Storybook stories

---

### Day 2 (Nov 3) - Feed Organisms

**7 Feed Organisms**:
1. `feed-card-post.tsx` - 4 variants (text, image, video, long)
2. `feed-card-event.tsx` - 4 variants (upcoming, today, sold-out, past)
3. `feed-card-tool.tsx` - 3 variants (featured, normal, high-installs)
4. `feed-card-system.tsx` - 3 variants (ritual, announcement, urgent)
5. `feed-composer-sheet.tsx` - Create post overlay
6. `feed-virtualized-list.tsx` - react-window container
7. `notification-toast-container.tsx` - Toast manager

**2 Feed Templates**:
1. `feed-page-layout.tsx` - Main feed layout
2. `feed-loading-skeleton.tsx` - Loading state

**Rebuild** `/feed/page.tsx`:
- Use new organisms
- Add keyboard shortcuts (j/k/l/c/b)
- Add optimistic updates
- E2E tests

**Time**: 10-12 hours
**Output**: 9 components + refactored page

---

### Day 3 (Nov 4) - Spaces Organisms

**2 Space Molecules**:
1. `space-about-widget.tsx` - Description + leaders inline
2. `space-tools-widget.tsx` - Active tools (≤3) with close time

**2 Space Organisms**:
1. `space-board-layout.tsx` - Feed-first board view
2. `space-post-composer.tsx` - Reuse feed composer

**1 Space Template**:
1. `space-board-layout.tsx` - Space board template

**Rebuild** `/spaces/[spaceId]/page.tsx`:
- Add right rail widgets (280px width)
- Add keyboard shortcuts (j/k/l/c/n)
- E2E tests

**Time**: 8-10 hours
**Output**: 5 components + refactored page

---

### Day 4 (Nov 5) - Rituals + Launch

**2 Ritual Organisms**:
1. `ritual-strip.tsx` - Feed banner (shared)
2. `ritual-card.tsx` - Ritual display

**1 Ritual Molecule**:
1. `ritual-progress-bar.tsx` - Progress meter

**1 Ritual Template**:
1. `rituals-page-layout.tsx` - Rituals page

**Rebuild** `/rituals/page.tsx`:
- Add ritual cards + strip
- E2E tests

**Polish**:
- Lighthouse audit
- Core Web Vitals verification
- Bundle size check
- Critical E2E tests
- Production build verification

**Time**: 10-12 hours
**Output**: 4 components + launch prep

---

## ✅ 9. Success Criteria

### Design System
- [x] Tokens updated (ChatGPT/Vercel feel)
- [x] Motion simplified (3 curves)
- [x] Gold usage documented
- [ ] CSS regenerated (run `pnpm build` in packages/tokens)

### Component Patterns
- [x] Button pattern reviewed
- [x] Input pattern reviewed
- [x] Card pattern reviewed
- [x] SpaceComposer pattern reviewed
- [x] Export/import conventions confirmed

### Topology Specs
- [x] Feed cards specified (4 types, 14 variants)
- [x] Feed molecules specified (7 components)
- [x] Space patterns reviewed
- [ ] Full topology deep dive (remaining sections)

### Technical Architecture
- [x] Package structure confirmed
- [x] API route patterns confirmed
- [x] Firebase patterns confirmed
- [x] Performance requirements confirmed

### Build Workflow
- [x] Atomic design order confirmed
- [x] Storybook pattern confirmed
- [x] Quality gates documented
- [x] Day 1-4 specifications documented

---

## 📋 Pre-Build Checklist

**Before starting Day 1**:
- [x] Design system review complete ✅
- [x] Component patterns reviewed ✅
- [x] Export/import patterns confirmed ✅
- [x] CSS variable usage verified ✅
- [ ] Regenerate CSS tokens (`pnpm build` in packages/tokens)
- [ ] Update Button focus ring to use white glow
- [ ] Update Input focus ring to use white glow
- [ ] Review all 7 topology docs (deep dive sections)

---

## 🚀 Ready to Build

**Status**: ✅ **COMPREHENSIVE REVIEW COMPLETE**

**What We Know**:
1. ✅ Design system = ChatGPT/Vercel minimal (95% grayscale, 5% gold)
2. ✅ Component patterns = Button, Input, Card, SpaceComposer (all reviewed)
3. ✅ Build workflow = Atoms → Molecules → Organisms → Templates
4. ✅ Quality gates = CSS vars, touch targets, Storybook, a11y
5. ✅ Day 1-4 specs = All components mapped with types

**Next Action**: Regenerate CSS tokens, then start Day 1 build (4 atoms + 7 molecules)

**Launch Date**: November 5, 2025 (4 days from now)

**Let's ship remarkable.** 🚀
