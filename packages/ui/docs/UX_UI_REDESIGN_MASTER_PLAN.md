# HIVE Complete UX/UI Redesign - Storybook-First Master Plan

**Status:** Planning Complete ✅ | Ready for Execution
**Last Updated:** 2025-10-01
**Timeline:** 48 days (6-7 weeks)
**Scope:** Complete platform redesign with 171+ components
**Design System:** Vercel Geist-inspired (see [DESIGN_INSPIRATION_2025.md](./DESIGN_INSPIRATION_2025.md))

---

## 🎨 Design Direction

**Primary Inspiration:** Vercel Geist Design System
- Simplicity, minimalism, speed
- High contrast monochrome + selective gold accent
- Typography-led design (Geist Sans)
- Swiss design principles (precision, clarity, functionality)

**See full research & guidelines:** [DESIGN_INSPIRATION_2025.md](./DESIGN_INSPIRATION_2025.md)

---

## 🎯 Mission Statement

**Complete redesign and polish of HIVE's entire platform through systematic Storybook validation. Every component gets redesigned, validated, and refined before integration.**

### Core Principles

1. **Nothing is complete** - Every component needs design review and potential refactor
2. **Storybook-first** - Build and validate in isolation before integration
3. **100% platform coverage** - Every screen, every interaction, every state
4. **Manual validation** - Systematic review of each component through Storybook
5. **Quality gates** - No component ships without passing full checklist
6. **Vercel-inspired design** - Speed, clarity, minimalism as core values

---

## 📊 Current State Assessment

### Component Distribution

```
Total Components: 171+
├── @hive/ui (packages/ui): 63 components
│   ├── Atoms: 37 components
│   ├── Molecules: 12 components
│   ├── Organisms: 11 components
│   └── Templates: 1 component
│
└── apps/web/src/components: 108 components
    ├── spaces/: 18 components (CRITICAL GAP)
    ├── feed/: 3 components (CRITICAL GAP)
    ├── profile/: 17 components
    ├── tools/: 8 components
    ├── rituals/: 3 components (CRITICAL GAP)
    ├── onboarding/: Variable
    └── others/: ~60 components
```

### Story Coverage (Current)

- **With Stories:** 61 components (~36%)
- **Without Stories:** 110 components (~64%)
- **Complete Features:** 3 (Notifications, Navigation, Forms)
- **Critical Gaps:** Feed (0%), Spaces (8%), Rituals (0%)

### Target State

- **100% story coverage** for all 171+ components
- **All components** in @hive/ui (remove duplication from apps/web)
- **Complete documentation** with usage examples
- **Full accessibility** compliance (WCAG 2.2 AA)
- **Mobile-first** optimization throughout

---

## 🗓️ Implementation Phases

### Phase 1: Complete Inventory & Architecture (Days 1-2)

**Objective:** Understand exactly what exists and what's needed

#### 1.1 Component Audit Tasks

- [ ] List all 63 components in packages/ui/src/atomic/
- [ ] List all 108 components in apps/web/src/components/
- [ ] Map each component to feature area:
  - 01-Onboarding
  - 02-Profile
  - 03-Spaces
  - 04-Feed
  - 05-HiveLab
  - 06-Rituals
  - 07-Notifications
  - 08-Navigation
  - 09-Social
  - 10-Forms
  - 11-Shared
- [ ] Identify duplicate components (same functionality in both locations)
- [ ] Mark components for consolidation vs migration
- [ ] Categorize by complexity (atom/molecule/organism/template)
- [ ] Note current story status (has story vs needs story)
- [ ] Priority ranking (P0 critical path → P3 nice-to-have)

#### 1.2 Feature Architecture Mapping

**For each of 5 core features:**

**Onboarding Flow**
- [ ] User flow diagram (email → verify → interests → profile → connections → spaces → done)
- [ ] Screen breakdown (10+ screens)
- [ ] Component tree per screen
- [ ] State requirements (loading, validation, error, success)
- [ ] Missing components identified

**Profile Feature**
- [ ] User flow diagram (view → edit → connections → settings)
- [ ] Screen breakdown (8+ screens)
- [ ] Component tree per screen
- [ ] Widget system architecture
- [ ] Missing components identified

**Spaces Feature** [HIGHEST PRIORITY]
- [ ] User flow diagram (browse → join → post → manage → settings)
- [ ] Screen breakdown (15+ screens)
- [ ] Component tree per screen
- [ ] All space states (public, private, membership, etc.)
- [ ] Missing components identified

**Feed Feature** [HIGHEST PRIORITY]
- [ ] User flow diagram (view → post → engage → filter)
- [ ] Screen breakdown (5+ screens)
- [ ] Component tree per screen
- [ ] Post types (text, image, video, link, event, poll)
- [ ] Missing components identified

**HiveLab Feature**
- [ ] User flow diagram (browse → create → configure → deploy)
- [ ] Screen breakdown (10+ screens)
- [ ] Component tree per screen
- [ ] Tool builder architecture
- [ ] Missing components identified

**Rituals Feature**
- [ ] User flow diagram (discover → join → participate → share)
- [ ] Screen breakdown (6+ screens)
- [ ] Component tree per screen
- [ ] Participation states
- [ ] Missing components identified

#### 1.3 Deliverables

**Documents to Create:**
- [ ] `COMPONENT_INVENTORY.md` - Complete component list with metadata
- [ ] `FEATURE_ARCHITECTURE_ONBOARDING.md` - Onboarding component architecture
- [ ] `FEATURE_ARCHITECTURE_PROFILE.md` - Profile component architecture
- [ ] `FEATURE_ARCHITECTURE_SPACES.md` - Spaces component architecture
- [ ] `FEATURE_ARCHITECTURE_FEED.md` - Feed component architecture
- [ ] `FEATURE_ARCHITECTURE_HIVELAB.md` - HiveLab component architecture
- [ ] `FEATURE_ARCHITECTURE_RITUALS.md` - Rituals component architecture
- [ ] `MIGRATION_STRATEGY.md` - Plan for moving components from app to UI
- [ ] `PRIORITY_ROADMAP.md` - Week-by-week execution plan

---

### Phase 2: Design System Foundation Refactor (Days 3-5)

**Objective:** Establish perfect foundation - tokens, colors, typography, spacing, patterns

#### 2.1 Design Tokens Validation

**00-Design-System/Colors.stories.tsx**

**Primary Colors:**
- [ ] `--hive-brand-primary` (#FFD700 gold) - documented with usage
- [ ] `--hive-brand-secondary` - documented with usage
- [ ] `--hive-background-primary` (#0A0A0B dark) - documented
- [ ] `--hive-background-secondary` - documented
- [ ] `--hive-surface-primary` - documented
- [ ] `--hive-surface-secondary` - documented
- [ ] `--hive-surface-tertiary` - documented

**Text Colors:**
- [ ] `--hive-text-primary` (#FFFFFF) - contrast ratio shown (19.32:1)
- [ ] `--hive-text-secondary` (#D4D4D4) - contrast ratio shown (15.42:1)
- [ ] `--hive-text-tertiary` (#A3A3A3) - contrast ratio shown (10.87:1)
- [ ] `--hive-text-disabled` - contrast ratio shown
- [ ] `--hive-text-inverse` - documented

**Semantic Colors:**
- [ ] Success: `--hive-success` (#00D46A) - contrast 7.28:1
- [ ] Error: `--hive-error` (#FF3737) - contrast 5.12:1
- [ ] Warning: `--hive-warning` - contrast documented
- [ ] Info: `--hive-info` - contrast documented

**Interactive States:**
- [ ] Hover colors documented
- [ ] Active colors documented
- [ ] Focus colors documented (#FFD700 gold)
- [ ] Disabled colors documented
- [ ] Selection colors documented

**Border & Divider:**
- [ ] `--hive-border-default` - documented
- [ ] `--hive-border-subtle` - documented
- [ ] `--hive-border-strong` - documented
- [ ] `--hive-divider` - documented

**Shadow & Elevation:**
- [ ] Shadow levels (sm, md, lg, xl) documented
- [ ] Glassmorphism effect documented
- [ ] Backdrop blur values documented

**Story Requirements:**
- [ ] Color swatches with hex values
- [ ] Contrast ratios displayed
- [ ] Usage guidelines per color
- [ ] Do's and don'ts examples
- [ ] Dark theme verification
- [ ] Accessibility notes (WCAG 2.2)

**00-Design-System/Typography.stories.tsx**

**Font Families:**
- [ ] Geist Sans - all weights shown (300, 400, 500, 600, 700)
- [ ] Space Grotesk - all weights shown
- [ ] Fallback stack documented
- [ ] Variable font loading documented

**Type Scale:**
- [ ] 12px - caption, helper text
- [ ] 14px - body small, labels
- [ ] 16px - body default (mobile minimum)
- [ ] 18px - body large
- [ ] 20px - heading 6
- [ ] 24px - heading 5
- [ ] 30px - heading 4
- [ ] 36px - heading 3
- [ ] 48px - heading 2
- [ ] 60px - heading 1
- [ ] 72px - display/hero

**Line Heights:**
- [ ] Tight (1.25) - headings
- [ ] Normal (1.5) - body text
- [ ] Relaxed (1.75) - long-form content
- [ ] Usage guidelines per scale

**Text Styles (Pre-configured):**
- [ ] `.hive-display` - hero text
- [ ] `.hive-h1` through `.hive-h6` - heading styles
- [ ] `.hive-body` - default body text
- [ ] `.hive-body-sm` - small body text
- [ ] `.hive-body-lg` - large body text
- [ ] `.hive-caption` - captions and helper text
- [ ] `.hive-label` - form labels
- [ ] `.hive-button-text` - button text styling

**Responsive Typography:**
- [ ] Mobile scale (base 16px)
- [ ] Tablet scale adjustments
- [ ] Desktop scale adjustments
- [ ] Fluid typography examples

**Story Requirements:**
- [ ] Every style shown with example text
- [ ] Mobile vs desktop comparison
- [ ] Line length guidelines (45-75 characters)
- [ ] Hierarchy examples (page title → section → paragraph)
- [ ] Accessibility notes (readable at 200% zoom)

**00-Design-System/Spacing.stories.tsx**

**Spacing Scale (8px base):**
- [ ] 0: 0px
- [ ] 1: 4px (0.25rem)
- [ ] 2: 8px (0.5rem)
- [ ] 3: 12px (0.75rem)
- [ ] 4: 16px (1rem)
- [ ] 5: 20px (1.25rem)
- [ ] 6: 24px (1.5rem)
- [ ] 8: 32px (2rem)
- [ ] 10: 40px (2.5rem)
- [ ] 12: 48px (3rem)
- [ ] 16: 64px (4rem)
- [ ] 20: 80px (5rem)
- [ ] 24: 96px (6rem)

**Component Spacing Patterns:**
- [ ] Button padding: documented
- [ ] Card padding: documented
- [ ] Modal padding: documented
- [ ] Form field gaps: documented
- [ ] List item spacing: documented
- [ ] Section spacing: documented
- [ ] Page margins: documented

**Touch Target Spacing:**
- [ ] Minimum 44x44px touch targets
- [ ] Spacing between interactive elements
- [ ] Mobile vs desktop differences

**Layout Spacing:**
- [ ] Container max-widths
- [ ] Grid gaps
- [ ] Flexbox gaps
- [ ] Stack spacing
- [ ] Cluster spacing

**Responsive Adjustments:**
- [ ] Mobile spacing scale
- [ ] Tablet spacing scale
- [ ] Desktop spacing scale

**Story Requirements:**
- [ ] Visual spacing examples
- [ ] Usage guidelines per scale value
- [ ] Common patterns demonstrated
- [ ] Responsive behavior shown

#### 2.2 Interaction Patterns

**Create new story: 00-Design-System/Animations.stories.tsx**

**Animation Principles:**
- [ ] Duration scale (100ms, 200ms, 300ms, 500ms)
- [ ] Easing functions (ease-in, ease-out, ease-in-out, spring)
- [ ] Spring physics parameters (stiffness, damping)
- [ ] Reduced motion respect (prefers-reduced-motion)

**Transition Patterns:**
- [ ] Page transitions
- [ ] Modal enter/exit
- [ ] Dropdown open/close
- [ ] Drawer slide in/out
- [ ] Tooltip fade in/out
- [ ] Toast notification slide in

**Micro-interactions:**
- [ ] Button press (scale + shadow)
- [ ] Toggle switch flip
- [ ] Checkbox check animation
- [ ] Drag and drop states
- [ ] Ripple effect on tap
- [ ] Loading spinner

**Loading Patterns:**
- [ ] Skeleton shimmer animation
- [ ] Spinner rotation
- [ ] Progress bar fill
- [ ] Pulse animation
- [ ] Progressive loading (image blur-up)

**Feedback Patterns:**
- [ ] Success checkmark animation
- [ ] Error shake animation
- [ ] Info bounce
- [ ] Celebration confetti

**Story Requirements:**
- [ ] Live animation examples
- [ ] Duration and easing documented
- [ ] Code examples provided
- [ ] Accessibility considerations noted

---

### Phase 3: Atomic Component Redesign (Days 6-12)

**Objective:** Perfect every atomic building block - buttons, inputs, badges, etc.

#### 3.1 Buttons & Actions (Complete Redesign)

**atoms/button.stories.tsx**

**Variants to Build:**
- [ ] Primary (filled, high emphasis)
- [ ] Secondary (outlined, medium emphasis)
- [ ] Tertiary (text only, low emphasis)
- [ ] Ghost (transparent, minimal)
- [ ] Destructive (red, for delete actions)
- [ ] Link (styled like hyperlink)

**Sizes:**
- [ ] sm: 32px height (avoid if possible - below minimum)
- [ ] md: 44px height (default - mobile minimum)
- [ ] lg: 56px height (prominent actions)

**With Icons:**
- [ ] Icon left
- [ ] Icon right
- [ ] Icon only (must be 44x44px minimum)
- [ ] Icon only with tooltip

**States:**
- [ ] Default (resting state)
- [ ] Hover (interactive feedback)
- [ ] Active (pressed state)
- [ ] Focus (keyboard navigation)
- [ ] Disabled (non-interactive)
- [ ] Loading (with spinner)
- [ ] Success (with checkmark)
- [ ] Error (with error icon)

**Width Variants:**
- [ ] Auto (fit content)
- [ ] Full (100% width)
- [ ] Fixed widths (common sizes)

**Special Cases:**
- [ ] Button with badge (notification count)
- [ ] Button with counter
- [ ] Button group (multiple buttons together)
- [ ] Button in toolbar
- [ ] Floating action button (FAB)

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

// Required stories:
- Default
- All Variants
- All Sizes
- With Icons
- All States
- Button Groups
- Responsive Behavior
- Keyboard Navigation
- Loading States
- Success/Error States
```

**Validation Checklist:**
- [ ] Uses HIVE CSS variables (no hardcoded colors)
- [ ] Mobile touch target 44px minimum
- [ ] Focus indicator 2px gold outline
- [ ] Hover state immediate feedback
- [ ] Active state provides feedback
- [ ] Loading state shows spinner
- [ ] Disabled state clearly communicated
- [ ] Keyboard accessible (Tab, Enter, Space)
- [ ] Screen reader labels present
- [ ] Color contrast 4.5:1 minimum

**atoms/hive-button.stories.tsx**

**HIVE-Specific Variants:**
- [ ] Gold primary (brand button)
- [ ] Glassmorphism variant
- [ ] With gold gradient
- [ ] Neon glow effect
- [ ] Animated hover (subtle scale)
- [ ] With particles/sparkle effect

**All same requirements as button.stories.tsx, plus:**
- [ ] Brand styling consistent
- [ ] Animations smooth and performant
- [ ] Effects respect reduced-motion
- [ ] Dark theme optimized

#### 3.2 Form Inputs (Complete Redesign)

**atoms/input.stories.tsx**

**Input Types:**
- [ ] text
- [ ] email (with validation styling)
- [ ] password (with show/hide toggle)
- [ ] number (with increment/decrement)
- [ ] tel (phone number)
- [ ] url (with validation)
- [ ] search (with clear button)
- [ ] date
- [ ] time
- [ ] datetime-local

**Sizes:**
- [ ] sm: 32px height
- [ ] md: 44px height (default)
- [ ] lg: 56px height

**States:**
- [ ] Default (empty)
- [ ] Focus (active input)
- [ ] Filled (with value)
- [ ] Error (validation failed)
- [ ] Disabled (non-editable)
- [ ] Readonly (viewable only)

**With Addons:**
- [ ] Icon left (search icon, etc.)
- [ ] Icon right (clear, validation, info)
- [ ] Prefix text (currency, etc.)
- [ ] Suffix text (units, etc.)
- [ ] Clear button (X to clear)

**Special Features:**
- [ ] Character counter
- [ ] Password strength indicator
- [ ] Autocomplete examples
- [ ] Input mask (phone, credit card)
- [ ] Copy to clipboard button

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

// Required stories:
- Default
- All Types
- All Sizes
- All States
- With Icons
- With Prefix/Suffix
- Validation Examples
- Keyboard Navigation
- Mobile Behavior
```

**Validation Checklist:**
- [ ] Uses HIVE CSS variables
- [ ] Mobile touch target 44px minimum
- [ ] Focus indicator 2px gold outline
- [ ] Error state has red border + error message
- [ ] Disabled state clearly visible
- [ ] Placeholder text sufficient contrast
- [ ] Labels properly associated (htmlFor)
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader announces label + error
- [ ] Type="password" hides characters

**atoms/input-enhanced.stories.tsx**

**Enhanced Features:**
- [ ] Floating label (Material Design style)
- [ ] Animated border
- [ ] Success state with checkmark
- [ ] Inline validation messages
- [ ] Helper text with icon
- [ ] Autocomplete dropdown styled
- [ ] Mention/tag autocomplete

**atoms/hive-input.stories.tsx**

**HIVE-Specific Styling:**
- [ ] Glassmorphism background
- [ ] Gold focus glow
- [ ] Animated label
- [ ] Dark theme optimized

**atoms/textarea.stories.tsx**

**Sizes:**
- [ ] rows: 3 (small)
- [ ] rows: 5 (medium - default)
- [ ] rows: 10 (large)
- [ ] Auto-grow (expands with content)

**Features:**
- [ ] Character limit with live counter
- [ ] Max length enforcement
- [ ] Resize handle (none, vertical, both)
- [ ] Markdown preview toggle
- [ ] Rich text toolbar integration
- [ ] Mention autocomplete (@username)
- [ ] Hashtag autocomplete (#topic)
- [ ] Emoji picker integration

**States:**
- [ ] All same states as input
- [ ] Plus: exceeds character limit state

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

// Required stories:
- Default
- All Sizes
- Auto-grow Example
- Character Counter
- With Toolbar
- Markdown Mode
- Mention Autocomplete
```

**atoms/textarea-enhanced.stories.tsx**

**Enhanced Features:**
- [ ] Rich text formatting buttons
- [ ] Markdown syntax support
- [ ] Preview mode
- [ ] Split view (edit + preview)
- [ ] Attachment support
- [ ] Drag and drop files

**atoms/select.stories.tsx**

**Select Types:**
- [ ] Single select (standard dropdown)
- [ ] Multi-select (with checkboxes)
- [ ] Searchable select (with filter input)
- [ ] Creatable select (create new options)
- [ ] Async select (load options from API)

**Features:**
- [ ] Grouped options
- [ ] Custom option rendering (with icons, avatars)
- [ ] Loading state while fetching options
- [ ] No results state
- [ ] Select all / deselect all (multi-select)
- [ ] Chip display for multi-select
- [ ] Clear all button

**Large Lists:**
- [ ] Virtualized scrolling (performance)
- [ ] Lazy loading options
- [ ] Pagination in dropdown

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

// Required stories:
- Default Single Select
- Multi-select
- Searchable
- With Groups
- Custom Options
- Large List (1000+ items)
- Async Options
- Keyboard Navigation
```

**Keyboard Navigation:**
- [ ] Tab to focus trigger
- [ ] Enter/Space to open
- [ ] Arrow Up/Down to navigate
- [ ] Home/End to jump
- [ ] Type to filter
- [ ] Enter to select
- [ ] Escape to close

**atoms/checkbox.stories.tsx**

**Variants:**
- [ ] Standard checkbox
- [ ] With label (right, left, top, bottom)
- [ ] Indeterminate state (partial selection)
- [ ] Card style (larger, clickable card)

**Sizes:**
- [ ] sm: 16px
- [ ] md: 20px (default)
- [ ] lg: 24px

**States:**
- [ ] Unchecked
- [ ] Checked
- [ ] Indeterminate
- [ ] Disabled
- [ ] Error (validation failed)
- [ ] Focus (keyboard navigation)

**Checkbox Groups:**
- [ ] Vertical list
- [ ] Horizontal list
- [ ] Grid layout
- [ ] Select all functionality
- [ ] Nested checkboxes (tree structure)

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

// Required stories:
- Default
- All States
- All Sizes
- Label Positions
- Checkbox Groups
- Select All Example
- Indeterminate State
- Card Style
```

**atoms/switch.stories.tsx**

**Variants:**
- [ ] Standard toggle
- [ ] With labels (left, right, both)
- [ ] With icons (on/off icons)
- [ ] Card style (larger, clickable card)

**Sizes:**
- [ ] sm: 32px width
- [ ] md: 44px width (default)
- [ ] lg: 56px width

**States:**
- [ ] Off
- [ ] On
- [ ] Disabled
- [ ] Loading (transitioning)
- [ ] Error
- [ ] Focus

**Special Features:**
- [ ] Color variants (different on colors)
- [ ] Animated transition
- [ ] Sound feedback (optional)
- [ ] Haptic feedback (mobile)

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

// Required stories:
- Default
- All States
- All Sizes
- With Labels
- With Icons
- Color Variants
- Switch Groups
```

**atoms/slider.stories.tsx**

**Slider Types:**
- [ ] Single value
- [ ] Range (min/max values)
- [ ] With markers/steps
- [ ] Vertical orientation

**Features:**
- [ ] Value display (tooltip, inline, above/below)
- [ ] Step increments
- [ ] Min/max labels
- [ ] Custom markers
- [ ] Snap to steps

**Sizes:**
- [ ] sm: thin track
- [ ] md: medium track (default)
- [ ] lg: thick track

**States:**
- [ ] Default
- [ ] Focus
- [ ] Disabled
- [ ] Error

**Story Structure:**
```typescript
export default {
  title: '10-Forms/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

// Required stories:
- Single Value
- Range Slider
- With Steps
- With Markers
- Vertical Orientation
- Custom Styling
```

**Keyboard Navigation:**
- [ ] Tab to focus
- [ ] Arrow Left/Right to adjust
- [ ] Home/End to jump to min/max
- [ ] Page Up/Down for larger steps

#### 3.3 Display Components (Complete Redesign)

**atoms/badge.stories.tsx**

**Variants:**
- [ ] default (neutral gray)
- [ ] primary (brand gold)
- [ ] secondary (muted)
- [ ] success (green)
- [ ] error (red)
- [ ] warning (yellow/orange)
- [ ] info (blue)

**Sizes:**
- [ ] xs: 16px height
- [ ] sm: 20px height
- [ ] md: 24px height (default)
- [ ] lg: 28px height

**Styles:**
- [ ] Solid (filled background)
- [ ] Outlined (border only)
- [ ] Subtle (light background)

**With Icons:**
- [ ] Icon left
- [ ] Icon right
- [ ] Icon only

**Special Types:**
- [ ] Dot indicator (status dot + text)
- [ ] Counter badge (number)
- [ ] Notification badge (on avatar/icon)
- [ ] Removable badge (with X button)
- [ ] Clickable/interactive badge

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

// Required stories:
- Default
- All Variants
- All Sizes
- All Styles
- With Icons
- Counter Badge
- Notification Badge
- Interactive Badge
- Badge Groups
```

**atoms/avatar.stories.tsx**

**Sizes:**
- [ ] xs: 24px
- [ ] sm: 32px
- [ ] md: 40px (default)
- [ ] lg: 48px
- [ ] xl: 64px
- [ ] 2xl: 96px
- [ ] 3xl: 128px (profile page)

**Content Types:**
- [ ] Image
- [ ] Initials (fallback)
- [ ] Icon (generic user icon)
- [ ] Placeholder

**With Status:**
- [ ] Online (green dot)
- [ ] Offline (gray dot)
- [ ] Busy (red dot)
- [ ] Away (yellow dot)
- [ ] Custom status

**With Badge:**
- [ ] Notification count
- [ ] Verification badge
- [ ] Role badge

**Variants:**
- [ ] Circle (default)
- [ ] Square (rounded corners)
- [ ] Bordered
- [ ] Shadow
- [ ] Ring (thick border on hover)

**Avatar Groups:**
- [ ] Stacked avatars (overlapping)
- [ ] Grid of avatars
- [ ] With "+5 more" counter

**Special Features:**
- [ ] Upload/edit state
- [ ] Hover to see profile preview
- [ ] Click to open profile

**Story Structure:**
```typescript
export default {
  title: '02-Profile/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

// Required stories:
- Default
- All Sizes
- With Image
- With Initials
- With Status Indicator
- With Badge
- Avatar Groups
- Stacked Avatars
- Interactive States
```

**atoms/simple-avatar.stories.tsx**

**Simplified Version:**
- [ ] Essential sizes only
- [ ] Image or initials
- [ ] No complex features
- [ ] Optimized for lists

**atoms/skeleton.stories.tsx**

**Skeleton Types:**
- [ ] Text line (single)
- [ ] Text paragraph (multiple lines)
- [ ] Avatar circle
- [ ] Avatar square
- [ ] Card
- [ ] Image/media
- [ ] Button
- [ ] Input field

**Animation Styles:**
- [ ] Pulse (fade in/out)
- [ ] Wave (shimmer across)
- [ ] None (static)

**Sizes:**
- [ ] Match component sizes
- [ ] Custom width/height

**Complete Skeleton Layouts:**
- [ ] Profile card skeleton
- [ ] Post card skeleton
- [ ] List item skeleton
- [ ] Grid item skeleton
- [ ] Feed skeleton (multiple posts)

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

// Required stories:
- Text Skeleton
- Avatar Skeleton
- Card Skeleton
- Complete Layouts
- Animation Styles
- Profile Card Example
- Feed Example
```

**atoms/progress.stories.tsx**

**Progress Types:**
- [ ] Linear (horizontal bar)
- [ ] Circular (ring)
- [ ] Semi-circular (gauge)

**Linear Progress:**
- [ ] Determinate (known progress)
- [ ] Indeterminate (loading, unknown duration)
- [ ] With label (percentage)
- [ ] With label (fraction, e.g., "3/10")
- [ ] Multi-segment (different colors)
- [ ] Striped animation
- [ ] Gradient fill

**Circular Progress:**
- [ ] Determinate
- [ ] Indeterminate (spinner)
- [ ] With center label
- [ ] Multiple rings (nested)
- [ ] Partial circle (semi-circle gauge)

**Sizes:**
- [ ] sm: thin bar/small circle
- [ ] md: medium (default)
- [ ] lg: thick bar/large circle

**Colors:**
- [ ] Default (gold)
- [ ] Success (green)
- [ ] Warning (yellow)
- [ ] Error (red)
- [ ] Custom colors

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

// Required stories:
- Linear Determinate
- Linear Indeterminate
- Circular Determinate
- Circular Spinner
- With Labels
- Multi-segment
- All Sizes
- All Colors
```

#### 3.4 Feedback Components (Complete Redesign)

**atoms/alert.stories.tsx**

**Variants:**
- [ ] info (blue)
- [ ] success (green)
- [ ] warning (yellow)
- [ ] error (red)

**Styles:**
- [ ] Solid (filled background)
- [ ] Outlined (border only)
- [ ] Subtle (light background)

**Sizes:**
- [ ] sm: compact
- [ ] md: standard (default)
- [ ] lg: prominent

**Content:**
- [ ] Icon only + message
- [ ] Title + description
- [ ] Title + description + actions

**Features:**
- [ ] Dismissible (with X button)
- [ ] Auto-dismiss (timeout)
- [ ] With action buttons
- [ ] With link
- [ ] Collapsible (show more/less)

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

// Required stories:
- All Variants
- All Styles
- With Title
- With Actions
- Dismissible
- Auto-dismiss Example
```

**atoms/dialog.stories.tsx** (Modal)

**Sizes:**
- [ ] sm: 400px max-width
- [ ] md: 600px max-width (default)
- [ ] lg: 800px max-width
- [ ] xl: 1000px max-width
- [ ] full: full screen

**Components:**
- [ ] Dialog with header
- [ ] Dialog with footer
- [ ] Dialog with scrollable content
- [ ] Dialog with sticky header/footer

**Content Types:**
- [ ] Simple message (alert dialog)
- [ ] Form dialog
- [ ] Confirmation dialog
- [ ] Multi-step wizard dialog

**Features:**
- [ ] Focus trap (keyboard stays inside)
- [ ] Escape to close
- [ ] Click outside to close (optional)
- [ ] Disable body scroll when open
- [ ] Backdrop blur
- [ ] Animations (enter/exit)

**Mobile Behavior:**
- [ ] Full-screen on mobile
- [ ] Bottom sheet variant
- [ ] Swipe to dismiss

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

// Required stories:
- Simple Dialog
- All Sizes
- With Form
- Confirmation Dialog
- Multi-step Dialog
- Scrollable Content
- Mobile Full-screen
- Keyboard Navigation
```

**atoms/hive-modal.stories.tsx**

**HIVE-Specific Styling:**
- [ ] Glassmorphism backdrop
- [ ] Animated entrance
- [ ] Gold accent borders
- [ ] Dark theme optimized

**atoms/hive-confirm-modal.stories.tsx**

**Confirmation Modal:**
- [ ] Danger confirmation (delete, etc.)
- [ ] Success confirmation
- [ ] Info confirmation
- [ ] With destructive action
- [ ] With cancel action
- [ ] Two-step confirmation (type to confirm)

**atoms/tabs.stories.tsx**

**Tab Variants:**
- [ ] Line (underline indicator)
- [ ] Enclosed (box background)
- [ ] Pills (rounded backgrounds)

**Orientation:**
- [ ] Horizontal (default)
- [ ] Vertical (sidebar style)

**Features:**
- [ ] With icons
- [ ] With badges/counts
- [ ] Scrollable tabs (horizontal scroll)
- [ ] Overflow menu (more button)

**Sizes:**
- [ ] sm: compact
- [ ] md: standard (default)
- [ ] lg: prominent

**Mobile:**
- [ ] Full-width tabs
- [ ] Scrollable tabs
- [ ] Dropdown select on mobile

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

// Required stories:
- Default Tabs
- All Variants
- With Icons
- With Badges
- Scrollable Tabs
- Vertical Tabs
- Mobile Behavior
- Keyboard Navigation
```

**atoms/card.stories.tsx**

**Card Variants:**
- [ ] Default (standard)
- [ ] Outlined (border only)
- [ ] Elevated (shadow)
- [ ] Flat (no border/shadow)
- [ ] Interactive (hover state)

**Card Sections:**
- [ ] Header
- [ ] Content
- [ ] Footer
- [ ] With image (cover image at top)
- [ ] With actions (buttons in footer)

**Sizes:**
- [ ] Compact (less padding)
- [ ] Default
- [ ] Spacious (more padding)

**Special Features:**
- [ ] Clickable card (full card is link)
- [ ] Selectable card (checkbox)
- [ ] Draggable card
- [ ] Collapsible card

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

// Required stories:
- Basic Card
- All Variants
- With Image
- With Actions
- Interactive Card
- Card Layouts
```

**atoms/hive-card.stories.tsx**

**HIVE-Specific Features:**
- [ ] Glassmorphism effect
- [ ] Gold accent border on hover
- [ ] Animated hover (subtle lift)
- [ ] Dark theme optimized

**atoms/grid.stories.tsx**

**Grid Types:**
- [ ] Auto-fit grid (responsive columns)
- [ ] Fixed columns (1, 2, 3, 4, 6, 12)
- [ ] Masonry grid (Pinterest style)
- [ ] Responsive grid (different columns per breakpoint)

**Gap Sizes:**
- [ ] sm: 8px
- [ ] md: 16px (default)
- [ ] lg: 24px
- [ ] xl: 32px

**Story Structure:**
```typescript
export default {
  title: '11-Shared/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

// Required stories:
- Auto-fit Grid
- Fixed Columns
- Responsive Grid
- With Cards
- Gap Sizes
```

---

### Phase 4: Molecule Component Redesign (Days 13-18)

**Objective:** Build complex components from perfected atoms

#### 4.1 Form Molecules

**molecules/form-field.stories.tsx**

**Form Field Composition:**
- [ ] Label + Input
- [ ] Label + Textarea
- [ ] Label + Select
- [ ] Label + Checkbox/Switch
- [ ] Label + Radio group

**Additional Elements:**
- [ ] Required indicator (asterisk)
- [ ] Helper text (below input)
- [ ] Error message (validation failed)
- [ ] Success message (validation passed)
- [ ] Character counter
- [ ] Tooltip/info icon

**Layouts:**
- [ ] Vertical (label on top)
- [ ] Horizontal (label on left)
- [ ] Inline (label and input same line)

**Validation States:**
- [ ] Default (no validation yet)
- [ ] Validating (checking...)
- [ ] Valid (success state)
- [ ] Invalid (error state)

**Story Structure:**
```typescript
export default {
  title: '10-Forms/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

// Required stories:
- Text Input Field
- All Input Types
- With Helper Text
- With Error
- With Success
- Required Field
- Horizontal Layout
- Inline Validation
```

#### 4.2 Content Molecules [CRITICAL - NEW COMPONENTS]

**molecules/post-card.stories.tsx** [NEW - HIGHEST PRIORITY]

**Post Types:**
- [ ] Text-only post
- [ ] Post with single image
- [ ] Post with multiple images (carousel)
- [ ] Post with video
- [ ] Post with link preview (card embed)
- [ ] Post with event details
- [ ] Post with poll
- [ ] Shared post (quote retweet style)

**Post Sections:**
- [ ] Author section (avatar, name, timestamp)
- [ ] Space badge (which space it's from)
- [ ] Content section (text, media)
- [ ] Engagement section (like, comment, share counts)
- [ ] Actions section (like, comment, share, menu buttons)

**States:**
- [ ] Default (normal post)
- [ ] Hover (show actions)
- [ ] Liked (heart filled)
- [ ] Loading (skeleton)
- [ ] Error (failed to load)

**Interactions:**
- [ ] Like/unlike animation
- [ ] Comment expand
- [ ] Share modal
- [ ] Menu dropdown (edit, delete, report)

**Special Features:**
- [ ] Read more / Show less (long posts)
- [ ] Image gallery (click to open)
- [ ] Video player controls
- [ ] Link preview with favicon
- [ ] Poll with results
- [ ] Event RSVP buttons

**Mobile Optimizations:**
- [ ] Touch-friendly tap targets
- [ ] Swipe to like/comment
- [ ] Optimized image loading
- [ ] Video lazy loading

**Story Structure:**
```typescript
export default {
  title: '04-Feed/PostCard',
  component: PostCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PostCard>;

// Required stories (ALL CRITICAL):
- Text-only Post
- Post with Single Image
- Post with Multiple Images
- Post with Video
- Post with Link Preview
- Post with Event
- Post with Poll
- Engagement States (liked, commented)
- Loading State
- Error State
- Hover Interactions
- Mobile View
```

**molecules/comment-thread.stories.tsx** [NEW]

**Comment Types:**
- [ ] Single comment (top-level)
- [ ] Reply comment (nested)
- [ ] Comment with image
- [ ] Comment with link

**Comment Sections:**
- [ ] Author section (avatar, name, timestamp)
- [ ] Content section (text, media)
- [ ] Actions (like, reply, menu)
- [ ] Reaction indicators

**Features:**
- [ ] Nested replies (up to 3 levels)
- [ ] Show more replies (collapsed)
- [ ] Load more comments
- [ ] Comment composer (inline)
- [ ] Edit comment
- [ ] Delete comment confirmation

**States:**
- [ ] Default
- [ ] Hover (show actions)
- [ ] Editing mode
- [ ] Liked
- [ ] Loading more

**Story Structure:**
```typescript
export default {
  title: '04-Feed/CommentThread',
  component: CommentThread,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentThread>;

// Required stories:
- Single Comment
- Nested Replies
- Comment Thread
- With Images
- Comment Composer
- Loading More
- Empty State
```

**molecules/search-bar.stories.tsx** [NEW]

**Search Types:**
- [ ] Simple search (input only)
- [ ] With filters (dropdown)
- [ ] With categories (tabs)
- [ ] Global search (searches everything)

**Features:**
- [ ] Search suggestions/autocomplete
- [ ] Recent searches
- [ ] Popular searches
- [ ] Clear button
- [ ] Voice search (optional)

**Results:**
- [ ] Results dropdown
- [ ] Results page
- [ ] No results state
- [ ] Loading state

**Filters:**
- [ ] Content type (posts, spaces, users, tools)
- [ ] Date range
- [ ] Space filter
- [ ] Sort options

**Story Structure:**
```typescript
export default {
  title: '09-Social/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

// Required stories:
- Simple Search
- With Suggestions
- With Filters
- With Categories
- Recent Searches
- Loading State
- No Results
- Mobile View
```

**molecules/photo-carousel.stories.tsx** [REFACTOR EXISTING]

**Carousel Features:**
- [ ] Single image display
- [ ] Multiple images with navigation
- [ ] Dot indicators
- [ ] Thumbnail navigation
- [ ] Image counter (1/5)
- [ ] Full-screen zoom
- [ ] Image captions

**Navigation:**
- [ ] Arrow buttons (left/right)
- [ ] Dot indicators (click to jump)
- [ ] Thumbnail strip (click to jump)
- [ ] Swipe gestures (mobile)
- [ ] Keyboard arrows

**Performance:**
- [ ] Lazy loading images
- [ ] Preload next/prev
- [ ] Responsive images (srcset)
- [ ] Low-quality placeholder

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/PhotoCarousel',
  component: PhotoCarousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PhotoCarousel>;

// Required stories:
- Single Image
- Multiple Images
- With Thumbnails
- With Captions
- Full-screen Zoom
- Touch Gestures
- Keyboard Navigation
```

#### 4.3 Navigation Molecules

**molecules/tab-navigation.stories.tsx** [NEW]

**Tab Styles:**
- [ ] Underline tabs (line indicator)
- [ ] Enclosed tabs (background)
- [ ] Pill tabs (rounded)

**Tab Content:**
- [ ] Text only
- [ ] Icon + text
- [ ] Icon only
- [ ] With badge/counter

**Features:**
- [ ] Horizontal tabs (default)
- [ ] Vertical tabs (sidebar)
- [ ] Scrollable tabs (overflow)
- [ ] More menu (dropdown for extras)

**States:**
- [ ] Active tab
- [ ] Hover
- [ ] Focus
- [ ] Disabled

**Story Structure:**
```typescript
export default {
  title: '08-Navigation/TabNavigation',
  component: TabNavigation,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TabNavigation>;

// Required stories:
- Underline Tabs
- Enclosed Tabs
- With Icons
- With Badges
- Scrollable Tabs
- Vertical Tabs
- Mobile View
```

**molecules/breadcrumb.stories.tsx** [NEW]

**Breadcrumb Features:**
- [ ] Home icon at start
- [ ] Clickable items
- [ ] Current page (not clickable)
- [ ] Collapsed middle (... for long paths)
- [ ] Dropdown for collapsed items

**molecules/pagination.stories.tsx** [NEW]

**Pagination Styles:**
- [ ] Numbers with arrows (1 2 3 ... 10)
- [ ] Simple prev/next
- [ ] Load more button
- [ ] Infinite scroll indicator

---

### Phase 5: Organism Component Redesign (Days 19-30)

**Objective:** Build complete feature sections from molecules and atoms

#### 5.1 Onboarding Organisms

**organisms/onboarding-wizard.stories.tsx** [NEW]

**Wizard Structure:**
- [ ] Multi-step layout (5-7 steps)
- [ ] Progress indicator at top
- [ ] Step content area
- [ ] Navigation buttons (Next, Back, Skip)
- [ ] Step validation

**Steps:**
1. [ ] Welcome screen (intro)
2. [ ] Email verification (code input)
3. [ ] Interest selection (multi-select grid)
4. [ ] Profile photo upload (crop tool)
5. [ ] Connection suggestions (user cards)
6. [ ] Space recommendations (space cards)
7. [ ] Completion celebration (success screen)

**Features:**
- [ ] Can't proceed until step valid
- [ ] Can go back to previous steps
- [ ] Progress saved (refresh doesn't lose progress)
- [ ] Skip optional steps
- [ ] Mobile full-screen
- [ ] Keyboard navigation

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/OnboardingWizard',
  component: OnboardingWizard,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingWizard>;

// Required stories:
- Complete Flow (all steps)
- Step 1: Welcome
- Step 2: Email Verification
- Step 3: Interests
- Step 4: Photo Upload
- Step 5: Connections
- Step 6: Spaces
- Step 7: Completion
- Mobile View
- Validation Examples
```

**organisms/welcome-mat.stories.tsx** [REFACTOR]

**Welcome Screen Sections:**
- [ ] Hero section (logo, tagline)
- [ ] Value proposition (3 key benefits)
- [ ] CTA buttons (Sign up, Learn more)
- [ ] Campus imagery (UB branding)

**Animations:**
- [ ] Fade in entrance
- [ ] Logo animation
- [ ] Staggered benefit cards

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/WelcomeMat',
  component: WelcomeMat,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof WelcomeMat>;

// Required stories:
- Default Welcome Screen
- With Animation
- Mobile View
- Dark Theme
```

**organisms/interest-selector.stories.tsx** [REFACTOR]

**Interest Selection:**
- [ ] Grid of interest cards
- [ ] Categories (Academics, Sports, Arts, etc.)
- [ ] Search/filter interests
- [ ] Multi-select with checkboxes
- [ ] Selected count indicator
- [ ] Minimum selection validation (e.g., "Select at least 3")

**Interest Card:**
- [ ] Icon/emoji
- [ ] Interest name
- [ ] Member count
- [ ] Selected state (checked, highlighted)

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/InterestSelector',
  component: InterestSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof InterestSelector>;

// Required stories:
- Default Grid
- With Categories
- With Search
- Selected State
- Validation (min 3)
- Mobile View
```

**organisms/profile-photo-upload.stories.tsx** [NEW]

**Upload Methods:**
- [ ] Drag and drop area
- [ ] File browser button
- [ ] Camera capture (mobile)
- [ ] Choose from existing photos

**Image Editor:**
- [ ] Crop tool (circle/square)
- [ ] Zoom slider
- [ ] Rotate buttons
- [ ] Position adjustment (drag)
- [ ] Preview

**Features:**
- [ ] File type validation (jpg, png, webp)
- [ ] File size validation (max 5MB)
- [ ] Upload progress bar
- [ ] Error handling (too large, wrong type)
- [ ] Success confirmation

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/ProfilePhotoUpload',
  component: ProfilePhotoUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePhotoUpload>;

// Required stories:
- Default Upload Area
- With Image Preview
- Crop Tool
- Upload Progress
- Error States
- Mobile Camera
```

**organisms/connection-suggestions.stories.tsx** [NEW]

**User Suggestion Card:**
- [ ] Avatar
- [ ] Name and handle
- [ ] Mutual connections/spaces
- [ ] Quick actions (Connect, Skip)

**Layout:**
- [ ] Grid of user cards (2-3 columns)
- [ ] Pagination or infinite scroll
- [ ] Skip all option

**States:**
- [ ] Default suggestions
- [ ] Loading more
- [ ] No more suggestions
- [ ] Connected state

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/ConnectionSuggestions',
  component: ConnectionSuggestions,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectionSuggestions>;

// Required stories:
- Grid of Suggestions
- User Card Details
- Connect Action
- Loading State
- No Suggestions
- Mobile View
```

#### 5.2 Profile Organisms

**organisms/profile-bento-grid.stories.tsx** [REFACTOR]

**Bento Grid System:**
- [ ] Responsive grid layout (CSS Grid)
- [ ] Widget sizes (1x1, 1x2, 2x1, 2x2)
- [ ] Drag to reorder (edit mode)
- [ ] Add/remove widgets

**Widget Types:**
- [ ] Identity widget (name, bio, stats)
- [ ] Activity widget (recent posts)
- [ ] Connections widget (friend list)
- [ ] Spaces widget (joined spaces)
- [ ] Tools widget (personal tools)
- [ ] Calendar widget (upcoming events)
- [ ] Stats widget (engagement metrics)

**Edit Mode:**
- [ ] Drag handles visible
- [ ] Delete button per widget
- [ ] Add widget button
- [ ] Save/cancel changes

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileBentoGrid',
  component: ProfileBentoGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileBentoGrid>;

// Required stories:
- Default Layout
- All Widget Types
- Edit Mode
- Drag to Reorder
- Add Widget
- Remove Widget
- Mobile Stack View
- Loading State
```

**organisms/profile-header.stories.tsx** [NEW]

**Header Sections:**
- [ ] Cover photo (optional, editable)
- [ ] Avatar (large, editable)
- [ ] Name and handle
- [ ] Bio text
- [ ] Stats row (connections, spaces, posts)
- [ ] Action buttons (Edit, Share, Connect)
- [ ] Status indicator (online/offline)

**Variants:**
- [ ] Own profile (with edit button)
- [ ] Other user profile (with connect button)
- [ ] Connected user (with message button)

**Edit Mode:**
- [ ] Edit cover photo
- [ ] Edit avatar
- [ ] Edit name/bio inline

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileHeader',
  component: ProfileHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileHeader>;

// Required stories:
- Own Profile
- Other User Profile
- Connected User Profile
- With Cover Photo
- Edit Mode
- Mobile View
- Loading State
```

**organisms/profile-activity-widget.stories.tsx** [REFACTOR]

**Activity Types:**
- [ ] Recent posts
- [ ] Recent comments
- [ ] Spaces joined
- [ ] Tools created
- [ ] Rituals joined

**Features:**
- [ ] Timeline view
- [ ] Activity icons
- [ ] Relative timestamps
- [ ] Load more button
- [ ] Empty state

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileActivityWidget',
  component: ProfileActivityWidget,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileActivityWidget>;

// Required stories:
- Default Timeline
- All Activity Types
- Load More
- Empty State
- Loading State
```

**organisms/profile-connections-widget.stories.tsx** [REFACTOR]

**Connections Display:**
- [ ] Avatar grid (stacked)
- [ ] Connection count
- [ ] Mutual connections indicator
- [ ] View all link

**Features:**
- [ ] Hover to see name
- [ ] Click to view profile
- [ ] Show more connections

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileConnectionsWidget',
  component: ProfileConnectionsWidget,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileConnectionsWidget>;

// Required stories:
- Default Widget
- Few Connections
- Many Connections
- Mutual Connections
- Empty State
```

**organisms/profile-edit-form.stories.tsx** [NEW]

**Form Sections:**
- [ ] Personal info (name, handle, bio)
- [ ] Contact info (email - read-only)
- [ ] Social links (Instagram, Twitter, etc.)
- [ ] Interests (edit selections)
- [ ] Privacy settings (profile visibility)

**Features:**
- [ ] Inline validation
- [ ] Character counters
- [ ] Unsaved changes warning
- [ ] Save/cancel buttons
- [ ] Success confirmation

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileEditForm',
  component: ProfileEditForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileEditForm>;

// Required stories:
- Complete Form
- Validation Examples
- Unsaved Changes Warning
- Success State
- Error State
- Mobile View
```

#### 5.3 Spaces Organisms [HIGHEST PRIORITY]

**organisms/space-card.stories.tsx** [NEW - CRITICAL]

**Card Variants:**
- [ ] Browse card (in discovery/browse)
- [ ] Featured card (larger, highlighted)
- [ ] Minimal card (compact list view)
- [ ] Your space card (with admin actions)

**Card Content:**
- [ ] Cover image (with placeholder if none)
- [ ] Space icon/logo
- [ ] Space name
- [ ] Space description (truncated)
- [ ] Member count
- [ ] Activity indicator (posts per week)
- [ ] Category badge
- [ ] Privacy indicator (public/private)
- [ ] Join button

**States:**
- [ ] Default (not joined)
- [ ] Joined (member indicator)
- [ ] Hover (show more info)
- [ ] Loading
- [ ] Error

**Special Features:**
- [ ] Active members indicator (green dots)
- [ ] Trending badge (hot spaces)
- [ ] Recommended indicator

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceCard',
  component: SpaceCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceCard>;

// CRITICAL STORIES:
- Browse Card (default)
- Featured Card
- Minimal Card
- Joined State
- Private Space
- With Activity
- Trending Badge
- Hover State
- Loading State
- Mobile View
```

**organisms/space-header.stories.tsx** [NEW - CRITICAL]

**Header Sections:**
- [ ] Cover image (editable by leader)
- [ ] Space icon/logo
- [ ] Space name and description
- [ ] Member count and activity stats
- [ ] Category and tags
- [ ] Privacy indicator
- [ ] Join/Leave button (prominent CTA)
- [ ] Leader indicator (crown icon)
- [ ] Action menu (settings, share, report)

**Variants:**
- [ ] Public space (anyone can join)
- [ ] Private space (request to join)
- [ ] Member view (with leave button)
- [ ] Leader view (with settings button)

**Edit Mode (Leader):**
- [ ] Edit cover image
- [ ] Edit icon
- [ ] Edit name/description inline

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceHeader',
  component: SpaceHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceHeader>;

// CRITICAL STORIES:
- Public Space (not member)
- Public Space (member)
- Private Space
- Leader View
- Edit Mode
- Mobile View
- Loading State
```

**organisms/space-post-feed.stories.tsx** [NEW - CRITICAL]

**Feed Components:**
- [ ] Post composer (at top)
- [ ] Feed filter tabs (All, Announcements, Events)
- [ ] Post list (using PostCard molecule)
- [ ] Load more button or infinite scroll
- [ ] Real-time update banner ("New posts available")
- [ ] Empty state (no posts yet)

**Post Composer:**
- [ ] Text input
- [ ] Add photo button
- [ ] Add event button
- [ ] Privacy selector (space vs all)
- [ ] Post button

**Feed Features:**
- [ ] Sort options (Recent, Popular, Top)
- [ ] Filter by content type
- [ ] Search within space
- [ ] Pin announcements to top

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpacePostFeed',
  component: SpacePostFeed,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacePostFeed>;

// CRITICAL STORIES:
- Feed with Posts
- Post Composer
- Filter Tabs
- Real-time Update
- Load More
- Empty State
- Leader View (pinned posts)
- Mobile View
```

**organisms/space-sidebar.stories.tsx** [NEW]

**Sidebar Sections:**
- [ ] About section (description, created date)
- [ ] Member preview (avatars + count)
- [ ] Recent activity (recent posts)
- [ ] Upcoming events (event cards)
- [ ] Tools/resources (if enabled)
- [ ] Admins/leaders list

**Features:**
- [ ] Collapsible sections
- [ ] See all links (expand section)
- [ ] Sticky positioning (scrolls with page)

**Mobile:**
- [ ] Drawer/sheet that slides up
- [ ] Swipe to dismiss

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceSidebar',
  component: SpaceSidebar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceSidebar>;

// Required stories:
- Default Sidebar
- All Sections Expanded
- Member View
- Leader View
- Mobile Drawer
- Loading State
```

**organisms/space-creation-modal.stories.tsx** [NEW - CRITICAL]

**Creation Steps:**
1. [ ] Basic info (name, description)
2. [ ] Cover image upload
3. [ ] Privacy settings (public/private)
4. [ ] Categories and tags
5. [ ] Initial members (optional)
6. [ ] RSS integration (optional)
7. [ ] Review and create

**Features:**
- [ ] Multi-step wizard
- [ ] Progress indicator
- [ ] Validation per step
- [ ] Preview mode
- [ ] Save as draft
- [ ] Cancel confirmation

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceCreationModal',
  component: SpaceCreationModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceCreationModal>;

// CRITICAL STORIES:
- Complete Flow
- Step 1: Basic Info
- Step 2: Cover Image
- Step 3: Privacy
- Step 4: Categories
- Step 5: Members
- Step 6: RSS Integration
- Step 7: Review
- Validation Examples
- Mobile Full-screen
```

**organisms/space-settings-modal.stories.tsx** [NEW]

**Settings Tabs:**
- [ ] General (name, description, cover)
- [ ] Privacy (visibility, join requirements)
- [ ] Members (manage members, roles)
- [ ] RSS Integration (configure feed)
- [ ] Tools (enable/disable HiveLab tools)
- [ ] Advanced (transfer ownership, delete space)

**Features:**
- [ ] Tab navigation
- [ ] Form validation
- [ ] Save changes
- [ ] Discard changes confirmation
- [ ] Destructive actions require confirmation

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceSettingsModal',
  component: SpaceSettingsModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceSettingsModal>;

// Required stories:
- All Tabs
- General Settings
- Privacy Settings
- Member Management
- RSS Integration
- Delete Confirmation
- Mobile View
```

**organisms/space-member-list.stories.tsx** [NEW]

**Member List:**
- [ ] Member cards (avatar, name, role)
- [ ] Filter by role (all, leaders, members)
- [ ] Search members
- [ ] Sort (alphabetical, join date)
- [ ] Pagination or infinite scroll

**Member Card:**
- [ ] Avatar
- [ ] Name and handle
- [ ] Role badge (Leader, Moderator, Member)
- [ ] Connection status
- [ ] Actions (View profile, Message, Promote, Remove)

**Leader Actions:**
- [ ] Promote to leader
- [ ] Demote from leader
- [ ] Remove member
- [ ] Ban member

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceMemberList',
  component: SpaceMemberList,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceMemberList>;

// Required stories:
- Member List
- Member Card
- Leader Actions
- Filter by Role
- Search Members
- Empty State
- Loading State
```

**organisms/space-discovery-hub.stories.tsx** [NEW]

**Discovery Sections:**
- [ ] Featured spaces (carousel)
- [ ] Recommended for you (based on interests)
- [ ] Trending spaces (most active)
- [ ] Browse by category (grid)
- [ ] Your spaces (quick access)

**Features:**
- [ ] Search bar at top
- [ ] Filter by category
- [ ] Sort options
- [ ] Load more or infinite scroll

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceDiscoveryHub',
  component: SpaceDiscoveryHub,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceDiscoveryHub>;

// Required stories:
- Full Discovery Hub
- Featured Spaces
- Recommendations
- Trending Spaces
- Category Browse
- Search Results
- Empty Results
- Mobile View
```

#### 5.4 Feed Organisms [CRITICAL]

**organisms/feed-composer.stories.tsx** [NEW - CRITICAL]

**Composer Components:**
- [ ] Textarea (auto-grow)
- [ ] Toolbar (formatting, media, etc.)
- [ ] Character counter
- [ ] Space selector (which space to post to)
- [ ] Privacy selector (space only, all followers)
- [ ] Submit button

**Toolbar Actions:**
- [ ] Add photo(s)
- [ ] Add video
- [ ] Add link (with preview)
- [ ] Create event
- [ ] Create poll
- [ ] Add emoji

**Features:**
- [ ] Rich text formatting (bold, italic, links)
- [ ] @mention autocomplete
- [ ] #hashtag autocomplete
- [ ] Image upload with preview
- [ ] Multiple image upload (up to 10)
- [ ] Video upload with preview
- [ ] Link preview generation
- [ ] Draft save (auto-save)
- [ ] Character limit (5000)
- [ ] Validation before submit

**States:**
- [ ] Empty (placeholder)
- [ ] Typing
- [ ] With media
- [ ] Validation error
- [ ] Submitting (loading)
- [ ] Success (post created)

**Story Structure:**
```typescript
export default {
  title: '04-Feed/FeedComposer',
  component: FeedComposer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedComposer>;

// CRITICAL STORIES:
- Default Empty
- With Text
- With Single Image
- With Multiple Images
- With Video
- With Link Preview
- With Mention
- With Hashtag
- Character Limit
- Validation Error
- Submitting State
- Mobile Keyboard View
```

**organisms/feed-post-full.stories.tsx** [NEW - CRITICAL]

**Complete Post Component:**
- [ ] Uses PostCard molecule
- [ ] Expanded comment section
- [ ] Share modal integration
- [ ] Edit mode (if own post)
- [ ] Delete confirmation

**Post Types (All Variants):**
- [ ] Text-only post
- [ ] Single image post
- [ ] Multiple image post (carousel)
- [ ] Video post (with player)
- [ ] Link preview post
- [ ] Event post (with RSVP)
- [ ] Poll post (with voting)
- [ ] Shared post (quote style)

**Engagement Section:**
- [ ] Like button with animation
- [ ] Comment count and button
- [ ] Share button
- [ ] Menu button (more actions)

**Comment Section:**
- [ ] Comment composer
- [ ] Comment list (nested)
- [ ] Load more comments
- [ ] Sort comments (recent, popular)

**Actions Menu:**
- [ ] Edit post (if owner)
- [ ] Delete post (if owner)
- [ ] Report post (if not owner)
- [ ] Copy link
- [ ] Save post (bookmark)

**Story Structure:**
```typescript
export default {
  title: '04-Feed/FeedPostFull',
  component: FeedPostFull,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedPostFull>;

// CRITICAL STORIES:
- Text Post
- Image Post
- Multiple Images Post
- Video Post
- Link Preview Post
- Event Post
- Poll Post
- With Comments
- Liked State
- Edit Mode
- Delete Confirmation
- Mobile View
```

**organisms/feed-filters.stories.tsx** [NEW]

**Filter Options:**
- [ ] Following vs All (main toggle)
- [ ] Space filters (select spaces to show)
- [ ] Content type filters (posts, events, polls)
- [ ] Time range (today, week, month, all time)
- [ ] Sort options (recent, popular, top)

**UI Variants:**
- [ ] Horizontal tabs (desktop)
- [ ] Dropdown filters (mobile)
- [ ] Sidebar filters (desktop)
- [ ] Bottom sheet (mobile)

**Story Structure:**
```typescript
export default {
  title: '04-Feed/FeedFilters',
  component: FeedFilters,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedFilters>;

// Required stories:
- Horizontal Tabs
- Dropdown Filters
- Sidebar Filters
- Mobile Bottom Sheet
- All Filter Options
- Active Filters
```

#### 5.5 HiveLab Organisms

**organisms/tool-builder.stories.tsx** [NEW]

**Tool Builder Interface:**
- [ ] Canvas area (drag-drop elements)
- [ ] Element palette (sidebar)
- [ ] Properties panel (right sidebar)
- [ ] Top toolbar (save, preview, publish)
- [ ] Element tree (hierarchy view)

**Element Types:**
- [ ] Input field
- [ ] Button
- [ ] Text display
- [ ] Image
- [ ] Chart/graph
- [ ] API call
- [ ] Logic block

**Features:**
- [ ] Drag elements to canvas
- [ ] Configure properties
- [ ] Connect elements (data flow)
- [ ] Preview mode
- [ ] Save/publish
- [ ] Version history

**Story Structure:**
```typescript
export default {
  title: '05-HiveLab/ToolBuilder',
  component: ToolBuilder,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolBuilder>;

// Required stories:
- Empty Canvas
- With Elements
- Editing Element
- Preview Mode
- Mobile View (simplified)
```

**organisms/tool-runtime.stories.tsx** [NEW]

**Runtime Interface:**
- [ ] Tool execution area
- [ ] Input fields (based on tool config)
- [ ] Output display area
- [ ] Action buttons
- [ ] Status indicators

**States:**
- [ ] Ready (waiting for input)
- [ ] Running (executing)
- [ ] Success (show results)
- [ ] Error (show error message)

**Story Structure:**
```typescript
export default {
  title: '05-HiveLab/ToolRuntime',
  component: ToolRuntime,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolRuntime>;

// Required stories:
- Default Ready State
- With Inputs
- Running State
- Success with Output
- Error State
- Mobile View
```

#### 5.6 Rituals Organisms [CRITICAL]

**organisms/ritual-card.stories.tsx** [NEW - CRITICAL]

**Card Content:**
- [ ] Ritual name and icon
- [ ] Ritual description
- [ ] Duration and schedule
- [ ] Participation stats (X people joined)
- [ ] Progress bar (community progress)
- [ ] Your progress (if joined)
- [ ] Leaderboard preview (top 3)
- [ ] Reward display (what you earn)
- [ ] Join button (prominent CTA)

**Card Variants:**
- [ ] Browse card (discovery)
- [ ] Joined card (with progress)
- [ ] Completed card (finished ritual)
- [ ] Upcoming card (not started yet)

**States:**
- [ ] Active (ongoing)
- [ ] Completed (finished)
- [ ] Upcoming (starts soon)
- [ ] Expired (past)

**Story Structure:**
```typescript
export default {
  title: '06-Rituals/RitualCard',
  component: RitualCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualCard>;

// CRITICAL STORIES:
- Browse Card
- Active Ritual
- Joined Ritual
- Your Progress
- Completed Ritual
- Upcoming Ritual
- Leaderboard Preview
- Mobile View
```

**organisms/ritual-participation-ui.stories.tsx** [NEW - CRITICAL]

**Participation Components:**
- [ ] Check-in button (main action)
- [ ] Progress tracker (your progress)
- [ ] Streak counter (consecutive days)
- [ ] Points earned
- [ ] Next milestone
- [ ] Leaderboard position
- [ ] Rewards earned section
- [ ] Share achievement button

**Check-in Flow:**
- [ ] Before check-in (button ready)
- [ ] Checking in (loading)
- [ ] Success animation (checkmark, confetti)
- [ ] Already checked in today (disabled)

**Progress Display:**
- [ ] Daily goals (checkboxes)
- [ ] Weekly progress (bar)
- [ ] Overall completion (percentage)
- [ ] Streak indicator (fire icon)

**Story Structure:**
```typescript
export default {
  title: '06-Rituals/RitualParticipationUI',
  component: RitualParticipationUI,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualParticipationUI>;

// CRITICAL STORIES:
- Check-in Ready
- Check-in Success
- Already Checked In
- Progress Tracker
- Streak Counter
- Leaderboard
- Rewards Earned
- Mobile View
```

**organisms/ritual-leaderboard.stories.tsx** [NEW]

**Leaderboard Display:**
- [ ] Top 3 (podium style)
- [ ] Rank list (4-100)
- [ ] User's position highlighted
- [ ] Avatar, name, points for each
- [ ] Filter options (friends, campus, all)
- [ ] Time period selector (today, week, all-time)

**Story Structure:**
```typescript
export default {
  title: '06-Rituals/RitualLeaderboard',
  component: RitualLeaderboard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualLeaderboard>;

// Required stories:
- Full Leaderboard
- Top 3 Podium
- Your Position
- Filter by Friends
- Loading State
- Empty State
```

---

### Phase 6: Template Component Redesign (Days 31-36)

**Objective:** Build complete page layouts

#### 6.1 Page Templates [ALL NEW EXCEPT PROFILE]

**templates/onboarding-layout.stories.tsx** [NEW]

**Complete Onboarding Flow:**
- [ ] All 7 steps in sequence
- [ ] Progress indicator always visible
- [ ] Navigation between steps
- [ ] Exit modal (confirm exit)

**Story Structure:**
```typescript
export default {
  title: '01-Onboarding/OnboardingLayout',
  component: OnboardingLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingLayout>;

// Required stories:
- Complete Flow
- Each Step Individually
- Mobile Full-screen
- Exit Confirmation
```

**templates/profile-view-layout.stories.tsx** [REFACTOR EXISTING]

**Profile Layout:**
- [ ] Profile header (top)
- [ ] Bento grid (main content)
- [ ] Sidebar (optional, for other user profiles)
- [ ] Mobile responsive (stack vertically)

**Variants:**
- [ ] Own profile (with edit capabilities)
- [ ] Other user profile (with connect button)
- [ ] Loading state (skeleton)

**Story Structure:**
```typescript
export default {
  title: '02-Profile/ProfileViewLayout',
  component: ProfileViewLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileViewLayout>;

// Required stories:
- Own Profile
- Other User Profile
- Edit Mode
- Mobile View
- Loading State
```

**templates/feed-layout.stories.tsx** [NEW - CRITICAL]

**Feed Layout Structure:**
- [ ] Left sidebar (navigation, 240px)
- [ ] Main feed area (600px max-width, centered)
- [ ] Right sidebar (suggestions, 320px)
- [ ] Mobile: Single column, bottom nav tabs

**Left Sidebar:**
- [ ] HIVE logo
- [ ] Navigation links (Feed, Spaces, Profile, etc.)
- [ ] Your spaces quick links
- [ ] Create button (post, space, tool)

**Main Feed Area:**
- [ ] Feed composer at top
- [ ] Filter tabs (Following, All)
- [ ] Post list
- [ ] Infinite scroll or load more

**Right Sidebar:**
- [ ] Trending topics
- [ ] Suggested spaces
- [ ] Suggested connections
- [ ] Active rituals

**Mobile Layout:**
- [ ] Top bar with HIVE logo
- [ ] Feed in main area
- [ ] Bottom tab navigation
- [ ] Composer as FAB (floating action button)

**Story Structure:**
```typescript
export default {
  title: '04-Feed/FeedLayout',
  component: FeedLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedLayout>;

// CRITICAL STORIES:
- Desktop 3-Column
- With Feed Content
- Left Sidebar Collapsed
- Mobile View
- Mobile with Bottom Tabs
- Loading State
```

**templates/space-page-layout.stories.tsx** [NEW - CRITICAL]

**Space Layout Structure:**
- [ ] Space header (top, full-width)
- [ ] Content tabs (Posts, Events, Members, About)
- [ ] Main content area (600px max-width)
- [ ] Right sidebar (about, members)
- [ ] Mobile: Stack vertically, tabs at top

**Header:**
- [ ] Cover image
- [ ] Space info
- [ ] Join/leave button
- [ ] Action menu

**Content Tabs:**
- [ ] Posts (default)
- [ ] Events (calendar view)
- [ ] Members (member list)
- [ ] About (full description, links)

**Right Sidebar:**
- [ ] About snippet
- [ ] Member preview
- [ ] Upcoming events
- [ ] Resources/tools

**Mobile Layout:**
- [ ] Header (compact)
- [ ] Tabs (scrollable horizontal)
- [ ] Content (full-width)
- [ ] Sidebar content in tabs

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpacePageLayout',
  component: SpacePageLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpacePageLayout>;

// CRITICAL STORIES:
- Posts Tab (default)
- Events Tab
- Members Tab
- About Tab
- Leader View
- Mobile View
- Loading State
```

**templates/space-browse-layout.stories.tsx** [NEW - CRITICAL]

**Browse Layout:**
- [ ] Header with search bar
- [ ] Filter sidebar (left, 240px)
- [ ] Grid of space cards (main area)
- [ ] Load more button or infinite scroll
- [ ] Mobile: Filters in bottom sheet

**Filter Sidebar:**
- [ ] Categories (checkbox list)
- [ ] Privacy (public/private)
- [ ] Activity level (high, medium, low)
- [ ] Sort options (popular, recent, alphabetical)
- [ ] Clear filters button

**Story Structure:**
```typescript
export default {
  title: '03-Spaces/SpaceBrowseLayout',
  component: SpaceBrowseLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof SpaceBrowseLayout>;

// CRITICAL STORIES:
- Browse Grid
- With Filters Applied
- Search Results
- Empty Results
- Mobile View
- Loading State
```

**templates/dashboard-layout.stories.tsx** [NEW]

**Dashboard Layout:**
- [ ] Stats overview (top, cards)
- [ ] Recent activity feed (left column)
- [ ] Quick actions (right column)
- [ ] Mobile: Stack vertically

**Stats Cards:**
- [ ] Total posts
- [ ] Spaces joined
- [ ] Connections
- [ ] Tools created
- [ ] Engagement rate

**Recent Activity:**
- [ ] Activity timeline
- [ ] Quick links to content

**Quick Actions:**
- [ ] Create post
- [ ] Join space
- [ ] Create tool
- [ ] Join ritual

**Story Structure:**
```typescript
export default {
  title: '11-Shared/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardLayout>;

// Required stories:
- Full Dashboard
- Mobile View
- Loading State
```

**templates/ritual-page-layout.stories.tsx** [NEW]

**Ritual Page Layout:**
- [ ] Ritual header (info, join button)
- [ ] Tabs (Overview, Leaderboard, My Progress)
- [ ] Main content area
- [ ] Right sidebar (stats, milestones)

**Story Structure:**
```typescript
export default {
  title: '06-Rituals/RitualPageLayout',
  component: RitualPageLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof RitualPageLayout>;

// Required stories:
- Overview Tab
- Leaderboard Tab
- My Progress Tab
- Mobile View
```

---

### Phase 7: Systematic Validation (Days 37-42)

**Objective:** Manual review and polish of every component

#### 7.1 Manual Review Process

**For EVERY Component (171+ components), complete this checklist:**

##### Visual Design Review

**Color Usage:**
- [ ] Uses only HIVE CSS variables (no hardcoded hex codes)
- [ ] Brand gold (#FFD700) used appropriately for primary actions
- [ ] Text colors meet contrast requirements
- [ ] Background colors consistent with dark theme
- [ ] Hover states have appropriate color shift
- [ ] Focus states use gold 2px outline
- [ ] Disabled states have muted colors (50% opacity)
- [ ] Error states use error red (#FF3737)
- [ ] Success states use success green (#00D46A)

**Typography:**
- [ ] Font families correct (Geist Sans for UI, Space Grotesk for display)
- [ ] Font sizes follow type scale (16px minimum for body text)
- [ ] Font weights appropriate (400 for body, 500/600 for emphasis)
- [ ] Line heights correct (1.5 for body, 1.25 for headings)
- [ ] Letter spacing appropriate
- [ ] Text truncation with ellipsis for long text
- [ ] No orphans or widows in multi-line text

**Spacing:**
- [ ] Follows 8px grid system
- [ ] Padding consistent within component
- [ ] Margins consistent with other components
- [ ] Gap spacing appropriate for flexbox/grid
- [ ] Touch targets 44px minimum (mobile)
- [ ] Adequate spacing between interactive elements

**Visual Effects:**
- [ ] Glassmorphism applied to cards/modals (backdrop-blur)
- [ ] Shadows appropriate for elevation level
- [ ] Borders use correct color and width
- [ ] Border radius consistent (4px, 8px, 12px)
- [ ] Gold accents positioned correctly
- [ ] Gradients smooth and performant

**Overall Polish:**
- [ ] Component looks "premium" and polished
- [ ] No visual bugs (alignment, overflow, etc.)
- [ ] Consistent with other HIVE components
- [ ] Dark theme looks great (not washed out)

##### Interaction Review

**Hover States:**
- [ ] Hover state provides immediate visual feedback
- [ ] Cursor changes to pointer on interactive elements
- [ ] Hover transition smooth (200-300ms)
- [ ] Hover state clearly indicates interactivity
- [ ] Hover doesn't cause layout shift

**Click/Tap Feedback:**
- [ ] Click provides immediate feedback (scale, color change)
- [ ] Active state visible during press
- [ ] Touch ripple effect on mobile (optional)
- [ ] Haptic feedback on mobile (optional)
- [ ] No delay between tap and response

**Focus States:**
- [ ] Focus indicator always visible (2px gold outline)
- [ ] Focus indicator sufficient contrast (12.84:1)
- [ ] Focus indicator offset from element (2px)
- [ ] Focus indicator rounded (border-radius)
- [ ] Focus doesn't cause layout shift

**Loading States:**
- [ ] Loading indicator clear and visible
- [ ] Loading state replaces content (not on top)
- [ ] Skeleton loaders match content shape
- [ ] Loading animation smooth (no jank)
- [ ] Loading doesn't block entire interface

**Error States:**
- [ ] Error state clearly communicated (red border, icon)
- [ ] Error message helpful and specific
- [ ] Error doesn't remove user's input
- [ ] Error provides recovery action
- [ ] Error accessible to screen readers

**Success Feedback:**
- [ ] Success state celebratory (checkmark, green color)
- [ ] Success animation delightful
- [ ] Success doesn't obstruct user flow
- [ ] Success message clear and concise

**Animations:**
- [ ] All animations smooth (60fps)
- [ ] Animation duration appropriate (100-500ms)
- [ ] Spring physics feel natural
- [ ] Respects prefers-reduced-motion
- [ ] Animations don't cause layout shift

##### Responsive Design Review

**Mobile (375px width):**
- [ ] Component fits within viewport (no horizontal scroll)
- [ ] Touch targets 44x44px minimum
- [ ] Text readable (16px minimum)
- [ ] Spacing adequate for touch
- [ ] Images scale appropriately
- [ ] Forms easy to complete
- [ ] Navigation accessible
- [ ] Layout stacks appropriately

**Tablet (768px width):**
- [ ] Layout adapts to wider viewport
- [ ] Uses available space well
- [ ] Not too stretched or cramped
- [ ] Images appropriate size
- [ ] Touch targets maintained

**Desktop (1440px width):**
- [ ] Layout uses space effectively
- [ ] Doesn't stretch too wide (max-width constraints)
- [ ] Readable line lengths (45-75 characters)
- [ ] Hover states appropriate
- [ ] Keyboard navigation efficient

**Breakpoint Transitions:**
- [ ] Smooth transition between breakpoints
- [ ] No layout shift or jump
- [ ] Content remains accessible at all sizes

##### Accessibility Review

**Keyboard Navigation:**
- [ ] Tab moves focus to next element
- [ ] Shift+Tab moves focus to previous element
- [ ] Enter activates buttons/links
- [ ] Space activates buttons, checks checkboxes
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys navigate lists/menus
- [ ] Home/End jump to start/end
- [ ] No keyboard traps

**Focus Management:**
- [ ] Focus order logical (follows visual order)
- [ ] Focus indicator always visible
- [ ] Focus returns after modal close
- [ ] Focus moves to new content when loaded
- [ ] Skip links present for navigation

**Screen Reader:**
- [ ] All interactive elements have labels
- [ ] Images have alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Form inputs associated with labels
- [ ] Error messages announced
- [ ] Dynamic content changes announced
- [ ] ARIA attributes correct (role, aria-label, aria-describedby)

**Color Contrast:**
- [ ] Text contrast 4.5:1 minimum (WCAG AA)
- [ ] Large text contrast 3:1 minimum
- [ ] UI controls contrast 3:1 minimum
- [ ] Focus indicators contrast 3:1 minimum
- [ ] Tested with contrast checker tool

**WCAG 2.2 Compliance:**
- [ ] All Level A criteria met
- [ ] All Level AA criteria met
- [ ] Focus appearance meets new requirements
- [ ] Target size meets 24x24px minimum (exceeds at 44x44px)
- [ ] Dragging movements have alternatives

##### Storybook Review

**Story Completeness:**
- [ ] Default story shows primary usage
- [ ] All variants story shows every option
- [ ] Interactive states story shows hover/focus/disabled
- [ ] Responsive story shows mobile/tablet/desktop
- [ ] Loading state story
- [ ] Error state story (if applicable)
- [ ] Empty state story (if applicable)

**Story Documentation:**
- [ ] Component description clear
- [ ] Props documented with descriptions
- [ ] Usage examples provided
- [ ] Do's and don'ts shown
- [ ] Keyboard navigation documented
- [ ] Accessibility notes included

**Interactive Controls:**
- [ ] Controls allow manipulation of props
- [ ] Controls have appropriate types (select, boolean, text)
- [ ] Controls demonstrate component flexibility
- [ ] Arg types documented

**Accessibility Panel:**
- [ ] 0 violations showing
- [ ] All rules passing
- [ ] Tested with screen reader (manual)

**Visual Consistency:**
- [ ] Component looks consistent with other components
- [ ] Story background appropriate (dark theme)
- [ ] Component centered/positioned well in canvas

##### Code Quality Review

**TypeScript:**
- [ ] No `any` types used
- [ ] Props interface exported
- [ ] Props extend React types (HTMLAttributes, etc.)
- [ ] Ref forwarding implemented
- [ ] Generic types used where appropriate
- [ ] Return type inferred or explicit

**React Best Practices:**
- [ ] forwardRef used for reusable components
- [ ] displayName set
- [ ] Hooks follow rules (no conditionals)
- [ ] Keys used in lists
- [ ] Dependencies correct in useEffect/useMemo/useCallback
- [ ] No inline object/function definitions causing re-renders

**Performance:**
- [ ] Expensive calculations memoized (useMemo)
- [ ] Callbacks memoized (useCallback)
- [ ] Component memoized if frequently re-rendered (React.memo)
- [ ] Images lazy loaded
- [ ] Large lists virtualized (if >100 items)

**CVA Variants:**
- [ ] Base classes defined
- [ ] Variants defined for all options
- [ ] Compound variants for combinations
- [ ] Default variants specified
- [ ] Variant types exported

**Exports:**
- [ ] Component exported from index.ts
- [ ] Types exported
- [ ] Variants exported
- [ ] Re-exports from atomic levels

**Code Style:**
- [ ] Consistent formatting (Prettier)
- [ ] Linting passing (ESLint)
- [ ] No console.logs left
- [ ] Comments explain complex logic
- [ ] TODO comments have issues linked

##### Testing Review

**Unit Tests:**
- [ ] Component renders without errors
- [ ] All variants render correctly
- [ ] Props work as expected
- [ ] Event handlers called correctly
- [ ] Edge cases handled (null, undefined, empty)

**Accessibility Tests:**
- [ ] axe-core tests passing
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color contrast verified

**Visual Regression:**
- [ ] Screenshot tests passing (optional)
- [ ] Visual diffs reviewed
- [ ] No unintended visual changes

**Integration Tests:**
- [ ] Component works in actual page
- [ ] Component interacts correctly with others
- [ ] Data flows correctly

#### 7.2 Review Tracking

**Create spreadsheet to track review progress:**

| Component | Visual | Interaction | Responsive | Accessibility | Storybook | Code | Status |
|-----------|--------|-------------|------------|---------------|-----------|------|--------|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Complete |
| Input | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | In Review |
| ... | ... | ... | ... | ... | ... | ... | ... |

**Progress Tracking:**
- [ ] Day 37: Review all atoms (37 components)
- [ ] Day 38: Review all molecules (25+ components)
- [ ] Day 39-40: Review all organisms (50+ components)
- [ ] Day 41: Review all templates (10+ templates)
- [ ] Day 42: Final polish and fixes

---

### Phase 8: Integration & Testing (Days 43-48)

**Objective:** Replace app components with polished UI components

#### 8.1 Component Migration

**For each component in apps/web/src/components/ (108 components):**

**Step 1: Verify Replacement Exists**
- [ ] Check if equivalent component exists in @hive/ui
- [ ] Verify component has all needed features
- [ ] Verify component has all needed variants

**Step 2: Update Imports**
- [ ] Find all files importing old component
- [ ] Replace imports with @hive/ui version
- [ ] Update prop names if changed
- [ ] Update variant names if changed

**Step 3: Test in Context**
- [ ] Load page with new component
- [ ] Verify visual appearance correct
- [ ] Test all interactions
- [ ] Test on mobile
- [ ] Test edge cases

**Step 4: Remove Old Component**
- [ ] Delete old component file
- [ ] Delete old component story (if exists)
- [ ] Update any documentation

**Migration Priority:**
1. **Shared components** (buttons, inputs, cards) - highest reuse
2. **Feed components** (post cards, composer) - critical path
3. **Spaces components** (space cards, headers) - critical path
4. **Profile components** - medium priority
5. **Tool components** - lower priority

#### 8.2 E2E Testing

**Critical User Flows to Test:**

**Onboarding Flow:**
- [ ] Email verification works
- [ ] Interest selection saves
- [ ] Photo upload works
- [ ] Connection suggestions load
- [ ] Space recommendations work
- [ ] Completion shows success
- [ ] User redirected to feed

**Feed Flow:**
- [ ] Feed loads posts
- [ ] Composer opens
- [ ] Post creation works (text, image, video)
- [ ] Like/unlike works
- [ ] Comment posting works
- [ ] Share modal opens
- [ ] Filter tabs work
- [ ] Infinite scroll works

**Space Flow:**
- [ ] Space browse loads
- [ ] Space search works
- [ ] Space join works
- [ ] Space page loads
- [ ] Post in space works
- [ ] Space settings accessible (leader)
- [ ] Space leave works

**Profile Flow:**
- [ ] Profile loads correctly
- [ ] Profile edit saves changes
- [ ] Photo upload works
- [ ] Connection actions work
- [ ] Activity widget loads

**Tool Flow:**
- [ ] Tool browse loads
- [ ] Tool builder opens
- [ ] Tool creation works
- [ ] Tool execution works
- [ ] Tool sharing works

**Ritual Flow:**
- [ ] Ritual browse loads
- [ ] Ritual join works
- [ ] Check-in works
- [ ] Progress updates
- [ ] Leaderboard loads

#### 8.3 Performance Testing

**Metrics to Test:**

**Bundle Size:**
- [ ] Total bundle size < 500KB (gzipped)
- [ ] Component package size < 200KB
- [ ] Code splitting effective
- [ ] Tree shaking working

**Loading Performance:**
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] No layout shift (CLS < 0.1)

**Runtime Performance:**
- [ ] Component render < 100ms
- [ ] Interaction response < 100ms
- [ ] Animations 60fps
- [ ] No memory leaks

**Mobile Performance:**
- [ ] 3G loading < 5s
- [ ] Touch interactions smooth
- [ ] Keyboard behavior correct
- [ ] Battery usage acceptable

#### 8.4 Cross-Browser Testing

**Browsers to Test:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Test on Each Browser:**
- [ ] Visual appearance correct
- [ ] Interactions work
- [ ] Animations smooth
- [ ] Keyboard navigation works
- [ ] Forms submit correctly

#### 8.5 Launch Readiness Review

**Final Checklist:**

**Design System:**
- [ ] All 171+ components in @hive/ui
- [ ] 100% story coverage
- [ ] All components passing validation checklist
- [ ] Design tokens finalized
- [ ] Documentation complete

**Accessibility:**
- [ ] WCAG 2.2 Level AA compliant
- [ ] 0 accessibility violations
- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] Color contrast verified

**Performance:**
- [ ] Bundle size optimized
- [ ] Loading times acceptable
- [ ] Animations smooth
- [ ] Mobile performance good

**Code Quality:**
- [ ] TypeScript strict mode
- [ ] 0 build errors
- [ ] Linting passing
- [ ] Tests passing
- [ ] No console errors

**Integration:**
- [ ] All app components replaced
- [ ] E2E tests passing
- [ ] Cross-browser tested
- [ ] Mobile tested

**Documentation:**
- [ ] Component documentation complete
- [ ] Usage examples provided
- [ ] Migration guide written
- [ ] Changelog updated

---

## 📋 Deliverables Checklist

### Phase 1 Deliverables
- [ ] `COMPONENT_INVENTORY.md` - Complete list of all components
- [ ] `FEATURE_ARCHITECTURE_*.md` - Architecture docs for each feature
- [ ] `MIGRATION_STRATEGY.md` - Plan for moving components
- [ ] `PRIORITY_ROADMAP.md` - Week-by-week plan

### Phase 2 Deliverables
- [ ] Colors.stories.tsx - Complete with all tokens and guidelines
- [ ] Typography.stories.tsx - Complete with all styles and examples
- [ ] Spacing.stories.tsx - Complete with all scales and patterns
- [ ] Animations.stories.tsx - Complete with all transitions and patterns

### Phase 3 Deliverables
- [ ] 37 atomic components fully redesigned
- [ ] All atoms with complete stories
- [ ] All atoms passing validation checklist
- [ ] All atoms documented

### Phase 4 Deliverables
- [ ] 25+ molecule components redesigned
- [ ] All molecules with complete stories
- [ ] All molecules passing validation checklist
- [ ] Critical molecules (PostCard, CommentThread) complete

### Phase 5 Deliverables
- [ ] 50+ organism components redesigned
- [ ] All organisms with complete stories
- [ ] All organisms passing validation checklist
- [ ] Critical organisms (Spaces, Feed, Rituals) complete

### Phase 6 Deliverables
- [ ] 10+ template components complete
- [ ] All templates with complete stories
- [ ] All templates passing validation checklist
- [ ] Critical templates (Feed, Space, Profile) complete

### Phase 7 Deliverables
- [ ] All 171+ components reviewed
- [ ] Review spreadsheet complete (all ✅)
- [ ] Polish pass complete
- [ ] Final design system audit complete

### Phase 8 Deliverables
- [ ] All app components migrated to @hive/ui
- [ ] E2E tests passing
- [ ] Performance benchmarks met
- [ ] Cross-browser testing complete
- [ ] Launch readiness checklist complete

---

## 🚀 Success Metrics

### Completion Metrics
- **171+ components** in @hive/ui with stories
- **100% story coverage** (every component has stories)
- **100% validation** (every component passes checklist)
- **0% app components** (all moved to @hive/ui)

### Quality Metrics
- **WCAG 2.2 Level AA** compliance (100%)
- **0 accessibility violations** in Storybook
- **100% keyboard navigable** components
- **100% mobile optimized** (44px touch targets)

### Performance Metrics
- **Bundle size** < 500KB gzipped
- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1

### Code Quality Metrics
- **0 TypeScript errors**
- **0 build errors**
- **< 200 ESLint warnings** total
- **100% TypeScript strict** mode (no `any`)

### Documentation Metrics
- **100% components** documented in Storybook
- **Usage examples** for all components
- **Keyboard navigation** documented for interactive components
- **Accessibility notes** for all components

---

## 🎉 Final Notes

This is a **complete redesign** of the HIVE platform. Every component will be touched, refined, and perfected. The end result will be:

- **World-class design system** with 171+ polished components
- **100% accessibility** compliance (WCAG 2.2 AA)
- **Mobile-first** by default
- **Storybook-first** development workflow
- **Production-ready** components
- **Launch-ready** platform

**Time commitment:** 48 days (6-7 weeks) of focused work
**Team size:** Ideally 2-3 developers working in parallel
**Priority:** Critical path components first (Feed, Spaces, Rituals)

**Let's build something remarkable.** 🚀
