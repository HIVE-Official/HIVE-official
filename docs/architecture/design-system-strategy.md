# HIVE Design System Strategy
**Version**: 1.0
**Last Updated**: 2025-10-02
**Philosophy**: Student Autonomy Through Confident, Opinionated Design

---

## Executive Summary

**Strategic Question**: Should HIVE use pure shadcn/ui, extend it, or build custom?

**Answer**: **Layered Hybrid Approach** - shadcn foundation + opinionated HIVE extensions

**Reasoning**:
- **Student Autonomy** requires UI that feels powerful, not generic
- **Move Fast** requires not reinventing accessible primitives
- **Brand Identity** requires distinctive visual language beyond "yet another shadcn site"

---

## Philosophy: Autonomy Through Design

### What "Student Autonomy" Means for UI

```typescript
// Student autonomy is NOT:
- Corporate, sterile, "professional"
- Hand-holding, over-explained, patronizing
- Generic, templated, "safe"

// Student autonomy IS:
- Confident: "This is YOURS. Control it."
- Direct: Fewer clicks, more power
- Distinctive: Recognizable, memorable, shareable
- Expressive: Personality, not corporate speak
```

**UI Translation:**
1. **Confident Interactions**: Bold hover states, satisfying micro-interactions, haptic feedback
2. **Power User Features**: Keyboard shortcuts everywhere, command palette, bulk actions
3. **Customization**: Theme toggles, layout preferences, notification controls
4. **Distinctive Visuals**: Gold accents, dark-first, campus-specific badges

---

## The Layered Hybrid Approach

### Layer 1: Shadcn Foundation (Primitives)
**Keep pure shadcn for:**

```typescript
const shadcnPureComponents = [
  // Form primitives
  'Input', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Slider',
  'Select', 'Label', 'Form',

  // Layout primitives
  'Card', 'Separator', 'AspectRatio', 'ScrollArea',

  // Overlay primitives
  'Dialog', 'Sheet', 'Popover', 'DropdownMenu', 'ContextMenu',
  'HoverCard', 'Tooltip', 'AlertDialog',

  // Navigation primitives
  'Tabs', 'Accordion', 'Collapsible', 'NavigationMenu',

  // Feedback primitives
  'Alert', 'Toast', 'Progress', 'Skeleton'
];
```

**Why keep these pure?**
- Battle-tested accessibility (Radix UI)
- Keyboard navigation works perfectly
- Screen reader support out-of-box
- Maintained by community (free updates)
- Consistent cross-browser behavior

**Modifications allowed:**
- Color tokens (gold instead of blue)
- Size scales (larger touch targets on mobile)
- Animation timing (faster = more responsive feel)
- Border radius (slightly more rounded for friendliness)

### Layer 2: HIVE Extensions (Opinionated Wrappers)
**Build custom wrappers for brand consistency:**

```typescript
// packages/ui/src/hive/button.tsx
// Extends shadcn Button with HIVE opinions

import { Button as ShadcnButton } from '@/atomic/atoms/button';

export const HiveButton = ({ children, ...props }) => {
  return (
    <ShadcnButton
      // HIVE defaults
      className={cn(
        // Stronger hover states (autonomy = responsiveness)
        "hover:scale-102 active:scale-95",
        // Haptic-style feedback
        "transition-all duration-150",
        // Gold accent override
        "focus-visible:ring-gold",
        props.className
      )}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

// Usage across app
import { HiveButton } from '@hive/ui/hive/button';
<HiveButton>Join Space</HiveButton> // Automatically HIVE-branded
```

**HIVE Extensions to Build:**

```typescript
const hiveExtensions = {
  // Buttons with HIVE personality
  'HiveButton': {
    base: 'shadcn Button',
    additions: [
      'Stronger hover scale',
      'Gold focus ring',
      'Loading state with spinner',
      'Success flash animation',
      'Haptic feedback integration'
    ]
  },

  // Cards with gold accents
  'HiveCard': {
    base: 'shadcn Card',
    additions: [
      'Hover elevation increase',
      'Optional gold border for promoted content',
      'Glassmorphism variant for overlays',
      'Campus badge slot (UB logo, etc.)'
    ]
  },

  // Inputs with validation states
  'HiveInput': {
    base: 'shadcn Input',
    additions: [
      'Live validation feedback',
      'Character counter for bio/posts',
      'Clear button (X icon)',
      'Password visibility toggle',
      '@mention autocomplete integration'
    ]
  },

  // Modals with HIVE flow patterns
  'HiveDialog': {
    base: 'shadcn Dialog',
    additions: [
      'Multi-step flow support',
      'Progress indicator',
      'Slide-up on mobile',
      'Swipe-to-dismiss gesture',
      'Auto-save draft state'
    ]
  },

  // Campus-specific badge
  'CampusBadge': {
    base: 'shadcn Badge',
    additions: [
      'UB logo integration',
      'Campus color schemes',
      'Verified checkmark',
      'Animated on hover (pulse)'
    ]
  }
};
```

### Layer 3: HIVE Originals (Fully Custom)
**Build from scratch for unique features:**

```typescript
const hiveOriginals = {
  // Feature-specific molecules
  molecules: [
    'FeedPostCard',      // Complex interaction patterns
    'SpaceCard',         // Custom hover states, badges
    'EventCard',         // Urgency indicators, FOMO design
    'ProfileCard',       // Portrait 3:4 aspect ratio
    'RitualProgressBar', // Custom animations, streak fire
    'NotificationBell',  // Live badge updates, pulse animation
    'CommandPalette',    // Campus-specific search results
    'PhotoCarousel',     // Swipe gestures, lazy loading
    'CommentThread',     // Nested replies, collapse/expand
    'ReactionPicker'     // Emoji selector with haptics
  ],

  // Domain-specific organisms
  organisms: [
    'NavigationShell',        // Bottom nav + sidebar hybrid
    'ProfileBentoGrid',       // Unique bento layout
    'SpaceLeaderToolbar',     // Power user actions
    'HiveLabBuilder',         // No-code tool canvas
    'FeedComposer',           // Rich text + media upload
    'RitualLeaderboard',      // Gamification UI
    'SpaceDiscoveryGrid',     // Filterable, searchable grid
    'ConnectionList',         // Social graph visualization
    'AnalyticsDashboard'      // Admin charts and metrics
  ],

  // HIVE brand components
  brand: [
    'HiveLogo',               // Animated logo (bee icon)
    'HiveLoadingSpinner',     // Branded loading state
    'HiveEmptyState',         // Illustrations + CTAs
    'HiveErrorBoundary',      // Friendly error messages
    'HiveSplashScreen',       // App launch animation
    'HiveOnboardingWizard'    // 7-step flow
  ]
};
```

---

## Design Decisions: Expressing Autonomy

### 1. **Bolder Hover States** (Confidence)

```typescript
// Generic shadcn (subtle)
<Button className="hover:bg-accent/10">
  Join Space
</Button>

// HIVE approach (confident)
<HiveButton className="hover:scale-102 hover:shadow-lg hover:bg-gold/20">
  Join Space
</HiveButton>
```

**Rationale**: Students want immediate feedback. Subtle hover states feel unresponsive. Bold = "I'm in control."

### 2. **Keyboard Shortcuts Everywhere** (Power Users)

```typescript
// Add to every major action
const KeyboardShortcuts = {
  'Cmd+K': 'Open command palette',
  'Cmd+N': 'New post / Create space',
  'Cmd+/': 'Toggle keyboard shortcuts help',
  'Escape': 'Close any modal',
  'J/K': 'Scroll feed (vim-style)',
  'L': 'Like/react to selected post',
  'C': 'Comment on selected post',
  'R': 'Repost selected post',
  'Enter': 'Open selected item',
  '1-4': 'Switch main navigation tabs',
  'Cmd+Shift+P': 'Admin command palette (admins only)'
};

// Visual indicator
<HiveButton>
  Create Space
  <kbd className="ml-2 text-xs bg-secondary px-1 rounded">⌘N</kbd>
</HiveButton>
```

**Rationale**: Power users (leaders, active members) need speed. Keyboard shortcuts = autonomy from mouse.

### 3. **Customization Controls** (Personal Ownership)

```typescript
// Settings panel for personalization
const CustomizationOptions = {
  theme: {
    default: 'Dark (gold accents)',
    options: ['Dark', 'Light', 'Auto (system)', 'OLED Black'],
    custom: 'Accent color picker (gold, blue, purple, green)'
  },

  layout: {
    navigation: ['Bottom bar', 'Sidebar', 'Top bar'],
    feedLayout: ['Cards', 'Compact', 'Magazine'],
    density: ['Comfortable', 'Compact', 'Spacious']
  },

  notifications: {
    frequency: ['Real-time', 'Hourly digest', 'Daily digest'],
    channels: ['Push', 'Email', 'In-app only'],
    filters: ['All activity', 'Direct only', 'Important only']
  },

  privacy: {
    profile: ['Public', 'Campus only', 'Connections only'],
    activity: ['Visible', 'Hidden'],
    spaces: ['Show all', 'Show joined only', 'Hide all']
  }
};

// UI component
<SettingsPanel>
  <SettingGroup title="Appearance">
    <ThemePicker />
    <AccentColorPicker />
    <DensitySlider />
  </SettingGroup>
</SettingsPanel>
```

**Rationale**: "Your campus social network, your rules" = students control their experience.

### 4. **Campus-Specific Branding** (Local Identity)

```typescript
// Dynamic campus theming
const CampusThemes = {
  'ub-buffalo': {
    primary: '#005BBB', // UB Blue
    secondary: '#FFD700', // HIVE Gold
    mascot: 'Victor E. Bull',
    landmarks: ['Clemens Hall', 'The Spine', 'Alumni Arena'],
    customBadges: ['North Campus', 'South Campus', 'Class of 2026'],
    events: ['Bulls Fest', 'Fall Fest', 'Hockey Season']
  }
};

// Usage in UI
<SpaceBadge
  space={space}
  campusTheme={CampusThemes['ub-buffalo']}
>
  {space.category === 'residential' && space.building && (
    <BuildingBadge color={getCampusColor('ub-buffalo')}>
      {space.building} {/* "Clemens Hall" */}
    </BuildingBadge>
  )}
</SpaceBadge>

// Campus-specific empty states
<EmptyState
  illustration={<UBCampusIllustration />}
  title="No events this week"
  description="Bulls are taking a breather. Check back for Fall Fest!"
/>
```

**Rationale**: Students identify with campus first, platform second. Local branding = emotional connection.

### 5. **Micro-interactions That Feel Alive** (Delight)

```typescript
// Every interaction has personality
const MicroInteractions = {
  // Join space button
  joinSpace: {
    idle: 'scale-100',
    hover: 'scale-102 shadow-lg',
    active: 'scale-95',
    success: [
      'scale-110 rotate-12', // Pop and rotate
      'confetti burst',       // Celebration
      'haptic feedback',      // Physical response
      'sound effect (optional)'
    ]
  },

  // Reaction button
  reaction: {
    tap: [
      'scale-125 rotate-360', // Spin and grow
      'color change to gold',
      'particle burst',
      'haptic light'
    ],
    undo: [
      'scale-75 opacity-50',
      'fade out particles'
    ]
  },

  // Post composer
  composer: {
    focus: 'expand from 1 line to 4 lines',
    typing: 'character counter updates',
    mention: '@username autocomplete dropdown',
    media: 'Upload preview with progress',
    submit: [
      'Button loading state',
      'Success checkmark',
      'Scroll to new post',
      'Highlight gold border for 2s'
    ]
  },

  // Streak counter
  streakCounter: {
    checkIn: [
      '🔥 emoji grows and pulses',
      'Number counts up',
      'Gold particle explosion',
      'Haptic strong',
      'Milestone badges unlock'
    ]
  }
};
```

**Rationale**: Generic feels corporate. Delightful interactions = "This was built FOR students, not marketed TO students."

---

## Component Library Structure

### Recommended File Structure

```
packages/ui/src/
│
├── shadcn/                    # Pure shadcn primitives (minimal changes)
│   ├── button.tsx            # Color tokens only
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── [40+ shadcn components]
│
├── hive/                      # HIVE extensions (opinionated wrappers)
│   ├── button.tsx            # HiveButton (extends shadcn)
│   ├── card.tsx              # HiveCard (gold borders, glassmorphism)
│   ├── dialog.tsx            # HiveDialog (multi-step flows)
│   ├── input.tsx             # HiveInput (validation, counters)
│   ├── badge.tsx             # CampusBadge (UB branding)
│   ├── loading.tsx           # HiveSpinner (branded animation)
│   ├── empty-state.tsx       # HiveEmptyState (illustrations)
│   └── command-palette.tsx   # HiveCommandPalette (campus search)
│
├── features/                  # Feature-specific components (fully custom)
│   │
│   ├── feed/
│   │   ├── post-card.tsx
│   │   ├── event-card.tsx
│   │   ├── composer.tsx
│   │   └── filters.tsx
│   │
│   ├── spaces/
│   │   ├── space-card.tsx
│   │   ├── space-header.tsx
│   │   ├── leader-toolbar.tsx
│   │   └── member-list.tsx
│   │
│   ├── profile/
│   │   ├── profile-card.tsx
│   │   ├── bento-grid.tsx
│   │   ├── stats-dashboard.tsx
│   │   └── connection-list.tsx
│   │
│   ├── hivelab/
│   │   ├── builder-canvas.tsx
│   │   ├── element-library.tsx
│   │   ├── properties-panel.tsx
│   │   └── template-browser.tsx
│   │
│   └── rituals/
│       ├── ritual-card.tsx
│       ├── leaderboard.tsx
│       ├── progress-tracker.tsx
│       └── streak-counter.tsx
│
└── brand/                     # HIVE brand identity
    ├── logo.tsx              # Animated bee logo
    ├── illustrations/        # Campus-specific illustrations
    ├── mascots/              # Victor E. Bull, etc.
    └── colors.ts             # Campus color schemes
```

### Import Strategy

```typescript
// Apps should import from semantic layers

// ❌ DON'T: Import shadcn directly
import { Button } from '@hive/ui/shadcn/button';

// ✅ DO: Import HIVE wrapper (gets brand defaults)
import { Button } from '@hive/ui';
// This resolves to @hive/ui/hive/button which wraps shadcn

// ✅ Feature-specific imports
import { FeedPostCard } from '@hive/ui/features/feed';
import { SpaceCard } from '@hive/ui/features/spaces';
import { ProfileCard } from '@hive/ui/features/profile';

// ✅ Brand components
import { HiveLogo } from '@hive/ui/brand';

// Exception: When you NEED primitive behavior
import { Button as PrimitiveButton } from '@hive/ui/shadcn/button';
// Only use in extreme cases where HIVE defaults break something
```

---

## Specific Recommendations: What to Build

### HIGH Priority (Build for October 1st Launch)

#### 1. **HiveButton** (Most-used component)
```typescript
// packages/ui/src/hive/button.tsx

const HiveButton = forwardRef<HTMLButtonElement, HiveButtonProps>(
  ({ children, loading, success, variant = 'default', ...props }, ref) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
      if (success) {
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 2000);
        return () => clearTimeout(timer);
      }
    }, [success]);

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShadcnButton
          ref={ref}
          variant={variant}
          disabled={loading || showSuccess}
          className={cn(
            // HIVE brand defaults
            "focus-visible:ring-gold",
            "transition-all duration-150",
            showSuccess && "bg-green-600 hover:bg-green-600",
            props.className
          )}
          {...props}
        >
          {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          {showSuccess && <Check className="mr-2 h-4 w-4" />}
          {children}
        </ShadcnButton>
      </motion.div>
    );
  }
);

// Features:
// - Stronger hover scale (1.02 vs 1.0)
// - Gold focus ring (brand)
// - Built-in loading state
// - Success animation
// - Haptic feedback integration ready
```

#### 2. **CampusBadge** (Identity component)
```typescript
// packages/ui/src/hive/campus-badge.tsx

interface CampusBadgeProps {
  campusId: string;
  variant?: 'subtle' | 'prominent';
  verified?: boolean;
}

export const CampusBadge = ({ campusId, variant, verified }: CampusBadgeProps) => {
  const campus = CAMPUS_CONFIG[campusId]; // UB Buffalo config

  return (
    <Badge
      variant={variant === 'prominent' ? 'default' : 'outline'}
      className={cn(
        "gap-1.5",
        variant === 'prominent' && "bg-[campusPrimary] text-white"
      )}
    >
      {campus.logo && (
        <Image
          src={campus.logo}
          alt={campus.name}
          width={16}
          height={16}
          className="rounded-sm"
        />
      )}
      <span>{campus.shortName}</span>
      {verified && <CheckCircle className="w-3 h-3" />}
    </Badge>
  );
};

// Usage:
<CampusBadge campusId="ub-buffalo" verified />
// Renders: [UB Logo] UB Buffalo ✓
```

#### 3. **FeedPostCard** (Core feed experience)
```typescript
// packages/ui/src/features/feed/post-card.tsx

// Fully custom - too domain-specific for shadcn extension
// Features:
// - Space attribution with clickable link
// - Social proof ("3 friends reacted")
// - Trending badge
// - Promotion visual treatment
// - Reaction/comment/repost/requote actions
// - Swipe gestures on mobile
// - Long-press context menu

export const FeedPostCard = ({ post, ...props }: FeedPostCardProps) => {
  // Complex interaction logic
  // This is NOT a shadcn extension - fully custom
};
```

#### 4. **HiveCommandPalette** (Power user feature)
```typescript
// packages/ui/src/hive/command-palette.tsx

// Extends shadcn Command with HIVE-specific search
export const HiveCommandPalette = () => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search spaces, people, posts..." />

      <CommandList>
        {/* Campus-specific results */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => navigate('/spaces/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Space
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {/* Spaces from YOUR campus only */}
        <CommandGroup heading="Spaces at UB Buffalo">
          {/* Results filtered by campusId */}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
```

### MEDIUM Priority (Post-launch refinements)

- **HiveCard** with glassmorphism variant
- **HiveInput** with @mention autocomplete
- **HiveDialog** with multi-step flow helpers
- **HiveToast** with campus-themed animations
- **ProfileBentoGrid** layout system
- **SpaceLeaderToolbar** with bulk actions

### LOW Priority (Future enhancements)

- **HiveThemeProvider** with custom theme switcher
- **HiveSoundEffects** system (optional audio feedback)
- **HiveHaptics** wrapper for mobile vibration
- **Advanced data visualizations** for analytics

---

## Anti-Patterns to Avoid

### ❌ Don't Reinvent Primitives

```typescript
// BAD: Building your own accessible dropdown from scratch
export const CustomDropdown = () => {
  const [open, setOpen] = useState(false);
  // 500 lines of keyboard navigation, focus management, ARIA...
  // You'll get it wrong. Use shadcn's DropdownMenu.
};

// GOOD: Use shadcn primitive, add HIVE styling
export const HiveDropdown = ({ children, ...props }) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger className="focus-visible:ring-gold">
      {/* HIVE branding */}
    </DropdownMenuTrigger>
    {children}
  </DropdownMenu>
);
```

### ❌ Don't Over-customize Everything

```typescript
// BAD: Making every shadcn component "HIVE-ified" for no reason
export const HiveSeparator = () => (
  <Separator className="bg-gradient-to-r from-gold via-white to-gold animate-pulse" />
);
// Why? A separator doesn't need personality.

// GOOD: Only customize components users interact with
- Buttons: Yes (primary interaction)
- Cards: Yes (content containers, often clicked)
- Inputs: Yes (data entry, need validation feedback)
- Separators: No (visual utility, no interaction)
- Aspect Ratio: No (layout helper, invisible)
```

### ❌ Don't Break Accessibility

```typescript
// BAD: Custom component that breaks keyboard nav
export const FancyButton = ({ onClick, children }) => (
  <div onClick={onClick} className="cursor-pointer">
    {children}
  </div>
);
// Not focusable, no Enter key support, no screen reader label

// GOOD: Extend shadcn, keep accessibility
export const HiveButton = ({ onClick, children, ...props }) => (
  <ShadcnButton onClick={onClick} {...props}>
    {children}
  </ShadcnButton>
);
// Shadcn already handles focus, keyboard, ARIA
```

---

## Implementation Plan

### Phase 1: Foundation (Week 1-2) ✅ DONE
- [x] Install shadcn/ui primitives
- [x] Configure design tokens (gold colors, spacing)
- [x] Set up Tailwind config with HIVE theme
- [x] Migrate atoms to shadcn base

### Phase 2: HIVE Extensions (Week 3-4) 🚧 IN PROGRESS
- [ ] Build HiveButton with all variants
- [ ] Build CampusBadge with UB branding
- [ ] Build HiveCard with gold borders
- [ ] Build HiveInput with validation
- [ ] Build HiveCommandPalette
- [ ] Document usage patterns in Storybook

### Phase 3: Feature Components (Week 5-6)
- [ ] FeedPostCard with all interactions
- [ ] SpaceCard with hover states
- [ ] EventCard with urgency indicators
- [ ] ProfileCard with bento layout
- [ ] RitualProgressBar with animations

### Phase 4: Polish (Week 7-8)
- [ ] Micro-interactions for all buttons
- [ ] Haptic feedback integration
- [ ] Sound effects (optional)
- [ ] Theme customization panel
- [ ] Keyboard shortcuts guide
- [ ] Accessibility audit

---

## Measuring Success

### Metrics for "Autonomy Through Design"

1. **Power User Adoption**
   - Target: 30% of active users use keyboard shortcuts
   - Measure: Command palette usage, shortcut analytics

2. **Customization Rate**
   - Target: 50% of users change ≥1 setting
   - Measure: Theme changes, layout preferences, notification settings

3. **Shareability**
   - Target: 20% of users screenshot and share HIVE posts
   - Measure: "This is so much better than Instagram" sentiment
   - Indicator: Users recognize HIVE screenshots without logo

4. **Emotional Response**
   - Target: "It feels responsive" in user feedback
   - Measure: Interaction speed, animation satisfaction
   - Indicator: Users describe UI as "smooth," "fast," "fun"

---

## Conclusion: The HIVE Design System Identity

```typescript
// HIVE is NOT another Notion clone
// HIVE is NOT another generic dashboard
// HIVE is NOT "shadcn with a different color"

// HIVE IS:
const HIVEIdentity = {
  foundation: 'shadcn primitives (accessibility, consistency)',

  differentiation: [
    'Campus-specific branding (UB blue, local landmarks)',
    'Bolder interactions (confident hover, satisfying clicks)',
    'Power user features (shortcuts, command palette, bulk actions)',
    'Student personality (casual, fun, expressive)',
    'Behavioral psychology (gamification, streaks, FOMO)'
  ],

  brandPromise: 'Your campus social network, your rules',

  designVoice: 'Confident, direct, distinctive',

  technicalStrategy: 'Layered hybrid - primitives + extensions + originals'
};
```

### Final Recommendation

**Build 3 layers:**

1. **Layer 1**: Keep shadcn pure for primitives (40 components)
2. **Layer 2**: Build 10-15 HIVE extensions for brand consistency
3. **Layer 3**: Build 30+ feature originals for unique experiences

**Priority order:**
1. HiveButton (used everywhere)
2. CampusBadge (identity)
3. FeedPostCard (core experience)
4. HiveCommandPalette (power users)
5. SpaceCard (discovery)

**Time investment:**
- 20% customizing shadcn tokens/variants
- 30% building HIVE wrappers
- 50% building feature-specific originals

This gives you **speed** (shadcn foundation) + **identity** (HIVE extensions) + **uniqueness** (custom features).

---

**Next Steps:**
1. Review this strategy with team
2. Prioritize Layer 2 components (which 10-15 HIVE extensions?)
3. Create Storybook stories for each HIVE component
4. Document "when to use shadcn vs HIVE vs custom"
5. Build component library showcase page

**Remember**: Students don't care about shadcn vs custom. They care about: "Does this feel like it was built FOR me?" Make every interaction answer: **"Yes. This is YOURS."**
