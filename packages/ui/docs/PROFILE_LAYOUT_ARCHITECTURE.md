# Profile Layout Architecture

## Visual Design

### Desktop Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        Max Width: 7xl (1280px)                   │
│  ┌───────────┬───────────────────────────────────────────────┐  │
│  │  PORTRAIT │                 BENTO GRID                     │  │
│  │  CAROUSEL │                                                │  │
│  │  (340px)  │  ┌─────────────────────────────────────────┐  │  │
│  │  ┌─────┐  │  │  IDENTITY CARD (Full Width)             │  │  │
│  │  │ 3:4 │  │  │  • Name + Verification                  │  │  │
│  │  │ PHO │  │  │  • Handle + Pronouns + Year             │  │  │
│  │  │ TO  │  │  │  • Bio (2-3 lines)                      │  │  │
│  │  │     │  │  │  • Badges                               │  │  │
│  │  │     │  │  │  • Edit Button (if own)                 │  │  │
│  │  └─────┘  │  └─────────────────────────────────────────┘  │  │
│  │  Dots: ⚪  │                                                │  │
│  │  1/4      │  ┌──────────────────────┬──────────────────┐  │  │
│  │           │  │  STATS GRID          │  PROFILE         │  │  │
│  │  Sticky   │  │  ┌──────┬──────┐    │  COMPLETION      │  │  │
│  │  Top: 32px│  │  │ 234  │  12  │    │  ┌────────────┐  │  │  │
│  │           │  │  │ Conn │ Spcs │    │  │ Progress   │  │  │  │
│  │  [Share]  │  │  ├──────┼──────┤    │  │ 100%       │  │  │  │
│  │  [ ⋮ ]    │  │  │ 156  │  28  │    │  │ ████████   │  │  │  │
│  │           │  │  │ Post │ Days │    │  │ ✓ 4 photos │  │  │  │
│  │           │  │  └──────┴──────┘    │  │ ✓ Bio      │  │  │  │
│  │           │  │                      │  │ ✓ 5 conns  │  │  │  │
│  │           │  │                      │  └────────────┘  │  │  │
│  │           │  └──────────────────────┴──────────────────┘  │  │
│  │           │                                                │  │
│  │           │  ┌─────────────────────────────────────────┐  │  │
│  │           │  │  MY SPACES (Full Width Grid)            │  │  │
│  │           │  │  ┌─────┬─────┬─────┐                    │  │  │
│  │           │  │  │ 💻  │ 🤖  │ ☕  │                    │  │  │
│  │           │  │  │ CS  │ AI  │Cafe │  (Leader badge)   │  │  │
│  │           │  │  ├─────┼─────┼─────┤                    │  │  │
│  │           │  │  │ 🎨  │ 🏃  │ 📚  │                    │  │  │
│  │           │  │  │Dsn  │ Run │Book │                    │  │  │
│  │           │  │  └─────┴─────┴─────┘                    │  │  │
│  │           │  └─────────────────────────────────────────┘  │  │
│  │           │                                                │  │
│  │           │  ┌─────────────────────┬───────────────────┐  │  │
│  │           │  │  MY ACTIVITY        │  MY EVENTS        │  │  │
│  │           │  │  🌍 Campus Visible  │  3 upcoming       │  │  │
│  │           │  │  ┌───────────────┐  │  ┌─────────────┐  │  │  │
│  │           │  │  │ 📝 Posted     │  │  │ 📅 Hackathon│  │  │  │
│  │           │  │  │ 2h ago        │  │  │ Tomorrow    │  │  │  │
│  │           │  │  ├───────────────┤  │  ├─────────────┤  │  │  │
│  │           │  │  │ 🎉 Joined     │  │  │ 🎓 Career   │  │  │  │
│  │           │  │  │ Yesterday     │  │  │ Friday      │  │  │  │
│  │           │  │  ├───────────────┤  │  ├─────────────┤  │  │  │
│  │           │  │  │ 💬 Commented  │  │  │ ☕ Coffee   │  │  │  │
│  │           │  │  │ 2d ago        │  │  │ Monday      │  │  │  │
│  │           │  │  └───────────────┘  │  └─────────────┘  │  │  │
│  │           │  └─────────────────────┴───────────────────┘  │  │
│  │           │                                                │  │
│  │           │  ┌─────────────────────────────────────────┐  │  │
│  │           │  │  HIVELAB (Full Width)                   │  │  │
│  │           │  │  Gold gradient bg • Space Leader badge  │  │  │
│  │           │  │  ┌──────┬──────┬─────────┐              │  │  │
│  │           │  │  │ 🗳️   │ 📊   │ [+]     │              │  │  │
│  │           │  │  │ Poll │ RSVP │ New Tool│              │  │  │
│  │           │  │  │Active│Active│         │              │  │  │
│  │           │  │  └──────┴──────┴─────────┘              │  │  │
│  │           │  └─────────────────────────────────────────┘  │  │
│  └───────────┴───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 640px)

```
┌────────────────────┐
│  PORTRAIT CAROUSEL │
│  ┌──────────────┐  │
│  │   3:4 PHOTO  │  │
│  │              │  │
│  │              │  │
│  └──────────────┘  │
│  Dots: ⚪⚪⚪⚫      │
│  1/4               │
└────────────────────┘

┌────────────────────┐
│  IDENTITY CARD     │
│  Name + Bio        │
│  [Edit Profile]    │
└────────────────────┘

┌────────────────────┐
│  STATS (2x2)       │
│  234 Conn │ 12 Spc│
│  156 Post │ 28 Day│
└────────────────────┘

┌────────────────────┐
│  PROFILE COMPLETE  │
│  100% ████████     │
└────────────────────┘

┌────────────────────┐
│  MY SPACES (2 col) │
│  💻 CS  │ 🤖 AI    │
│  ☕ Cafe│ 🎨 Design│
└────────────────────┘

┌────────────────────┐
│  MY ACTIVITY       │
│  (Stacked)         │
└────────────────────┘

┌────────────────────┐
│  MY EVENTS         │
│  (Stacked)         │
└────────────────────┘

┌────────────────────┐
│  HIVELAB           │
│  (Stacked tools)   │
└────────────────────┘
```

---

## Component Breakdown

### 1. **PortraitCarousel** (New Organism)

**Visual**: Left column, 340px wide, sticky on desktop

```typescript
interface PortraitCarouselProps {
  photos: string[];              // Max 5, 3:4 aspect ratio
  currentIndex?: number;         // Controlled state
  onIndexChange?: (idx: number) => void;
  stickyOnDesktop?: boolean;     // Default true
  showQuickActions?: boolean;    // Share + More buttons
}
```

**Features**:
- Tinder-style dot indicators
- Photo counter (1/4)
- Hover scale effect
- Sticky positioning (desktop only)
- Quick actions below (Share, More)

**Exists?**: ❌ Need to create
**Reuse**: `Carousel` atoms from shadcn

---

### 2. **ProfileIdentityCard** (New Molecule)

**Visual**: Full-width card at top of bento grid

```typescript
interface ProfileIdentityCardProps {
  name: string;
  handle: string;
  pronouns?: string;
  major: string;
  academicYear: string;
  bio: string;
  badges: ProfileBadge[];
  verified: boolean;
  isOwnProfile: boolean;
  onEdit?: () => void;
}
```

**Features**:
- Name + verification checkmark
- Handle + pronouns + academic info (single line)
- Bio (2-3 lines, max-w-2xl)
- Badge chips (Space Leader, Active Now, etc.)
- Edit button (if own profile)

**Exists?**: ⚠️ Partial (ProfileHeader has similar)
**Action**: Extract identity portion into separate card component

---

### 3. **StatsGrid** (Refactor Existing)

**Visual**: 2x2 grid of metric cards with gradients

```typescript
interface StatsGridProps {
  stats: Array<{
    label: string;
    value: number;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    gradient: 'blue' | 'green' | 'purple' | 'orange';
  }>;
}
```

**Features**:
- 2x2 grid layout
- Each card: Gradient background (subtle)
- Large number + trend arrow
- Label below

**Exists?**: ✅ `ProfileStats` (needs gradient variant)
**Action**: Add gradient option to existing component

---

### 4. **ProfileCompletionCard** (Refactor Existing)

**Visual**: Compact card showing progress

```typescript
interface ProfileCompletionCardProps {
  percentage: number;
  items: Array<{
    label: string;
    completed: boolean;
  }>;
  compact?: boolean;  // New: smaller variant
}
```

**Features**:
- Progress bar (0-100%)
- Checkmark list (completed items struck through)
- Green badge showing percentage
- Compact layout for bento grid

**Exists?**: ✅ `ProfileCompletion`
**Action**: Add compact variant

---

### 5. **SpacesGrid** (New Molecule)

**Visual**: 2x3 or 3-column grid of space cards

```typescript
interface SpacesGridProps {
  spaces: Array<{
    emoji: string;
    name: string;
    memberCount: number;
    role: 'Leader' | 'Member';
  }>;
  columns?: 2 | 3;  // Responsive columns
  maxDisplay?: number;  // Limit visible
}
```

**Features**:
- Emoji icon (large, 2xl)
- Space name (truncate if long)
- Member count
- Role badge (if Leader)
- Hover effects (scale emoji, border color)

**Exists?**: ❌ Need to create
**Reuse**: Card layout patterns

---

### 6. **ActivityTimeline** (Refactor Existing)

**Visual**: Vertical list of activity items

```typescript
interface ActivityTimelineProps {
  activities: Array<{
    icon: string;
    title: string;
    timestamp: string;
    gradient: 'blue' | 'green' | 'purple';
  }>;
  privacyLevel: PrivacyLevel;  // Show badge
  maxDisplay?: number;
}
```

**Features**:
- Icon circle (gradient bg)
- Activity title + timestamp
- Privacy badge in header
- Hover effects on items

**Exists?**: ✅ `ActivityTimeline`
**Action**: Add privacy badge support

---

### 7. **EventsList** (New Molecule)

**Visual**: Vertical list of upcoming events

```typescript
interface EventsListProps {
  events: Array<{
    icon: string;
    title: string;
    datetime: string;
    location?: string;
  }>;
  maxDisplay?: number;
}
```

**Features**:
- Event cards with gradient backgrounds
- Icon + title + time
- Hover effects
- "X upcoming" badge in header

**Exists?**: ❌ Need to create
**Similar to**: ActivityTimeline but event-specific

---

### 8. **HiveLabWidget** (Refactor Existing)

**Visual**: Full-width card with tool grid

```typescript
interface HiveLabWidgetProps {
  accessState: 'locked-not-leader' | 'locked-incomplete' | 'unlocked';
  tools?: Array<{
    emoji: string;
    name: string;
    description: string;
    status: 'active' | 'draft';
    usageCount: number;
    spaceName: string;
  }>;
  onCreateTool?: () => void;
}
```

**Features**:
- Gold gradient background
- Access badge
- 3-column tool grid
- "New Tool" CTA card
- Lock states (from hivelab-access.stories)

**Exists?**: ⚠️ Partial (has lock states)
**Action**: Add unlocked active tools variant

---

## Layout Component Hierarchy

```typescript
<ProfileBentoLayout>
  {/* Left Column */}
  <PortraitCarousel
    photos={profile.photos}
    stickyOnDesktop
    showQuickActions
  />

  {/* Right Column: Bento Grid */}
  <BentoGrid>
    {/* Row 1: Full Width */}
    <ProfileIdentityCard {...identityData} />

    {/* Row 2: 2-Column */}
    <GridRow columns={2}>
      <StatsGrid stats={statsData} variant="gradient" />
      <ProfileCompletionCard {...completionData} compact />
    </GridRow>

    {/* Row 3: Full Width */}
    <SpacesGrid spaces={spacesData} columns={3} />

    {/* Row 4: 2-Column */}
    <GridRow columns={2}>
      <ActivityTimeline {...activityData} showPrivacyBadge />
      <EventsList events={eventsData} />
    </GridRow>

    {/* Row 5: Full Width */}
    <HiveLabWidget {...hiveLabData} />
  </BentoGrid>
</ProfileBentoLayout>
```

---

## Responsive Behavior

### Desktop (> 1024px)
- **Grid**: `lg:grid-cols-[340px_1fr]`
- **Carousel**: Sticky, left column
- **Bento**: Right column, asymmetric cards
- **Gap**: `gap-6 lg:gap-8`

### Tablet (640px - 1024px)
- **Grid**: Single column
- **Carousel**: Full width, not sticky
- **Bento**: Stacked, 2-column for split cards
- **Gap**: `gap-4`

### Mobile (< 640px)
- **Grid**: Single column
- **Carousel**: Full width
- **Bento**: All cards full width
- **Spaces**: 2 columns instead of 3
- **Activity/Events**: Stacked (no 2-column)

---

## Component Creation Priority

### Phase 1: New Components (Must Build)
1. ✅ **PortraitCarousel** - Core visual element
2. ✅ **ProfileIdentityCard** - Extract from ProfileHeader
3. ✅ **SpacesGrid** - New grid layout
4. ✅ **EventsList** - Similar to ActivityTimeline

### Phase 2: Refactor Existing
1. ⚠️ **StatsGrid** - Add gradient variant
2. ⚠️ **ProfileCompletionCard** - Add compact mode
3. ⚠️ **ActivityTimeline** - Add privacy badge
4. ⚠️ **HiveLabWidget** - Add unlocked active state

### Phase 3: Layout Wrapper
1. ✅ **ProfileBentoLayout** - Main layout component
2. ✅ **BentoGrid** - Grid wrapper with responsive breakpoints
3. ✅ **GridRow** - Row wrapper for multi-column sections

---

## Style Patterns

### Gradient Backgrounds (Subtle)
```css
.stat-blue {
  background: linear-gradient(to bottom right,
    rgb(59 130 246 / 0.1),
    rgb(59 130 246 / 0.05)
  );
  border: 1px solid rgb(59 130 246 / 0.1);
}

.stat-green {
  background: linear-gradient(to bottom right,
    rgb(34 197 94 / 0.1),
    rgb(34 197 94 / 0.05)
  );
  border: 1px solid rgb(34 197 94 / 0.1);
}
```

### Card Hover Effects
```css
.bento-card {
  @apply transition-all duration-300 ease-in-out;
}

.bento-card:hover {
  @apply border-primary/50 shadow-md;
}

.emoji-scale {
  @apply transition-transform duration-300;
}

.emoji-scale:hover {
  @apply scale-110;
}
```

### Sticky Carousel (Desktop Only)
```css
@media (min-width: 1024px) {
  .portrait-carousel {
    position: sticky;
    top: 2rem; /* 32px */
  }
}
```

---

## Next Steps

1. **Build PortraitCarousel** - Most critical new component
2. **Extract ProfileIdentityCard** - Refactor from ProfileHeader
3. **Create SpacesGrid** - Reusable for other features
4. **Add EventsList** - Clone ActivityTimeline pattern
5. **Test Responsive** - Ensure mobile/tablet/desktop work
6. **Add Animations** - Smooth transitions, hover effects

---

## Usage Example

```tsx
import { ProfileBentoLayout } from '@hive/ui';

<ProfileBentoLayout
  photos={profile.photos}
  identity={{
    name: profile.fullName,
    handle: profile.handle,
    bio: profile.bio,
    badges: profile.badges,
    verified: profile.verified,
    isOwnProfile: viewerIsOwner,
  }}
  stats={[
    { label: 'Connections', value: 234, trend: { value: 12, isPositive: true }, gradient: 'blue' },
    { label: 'Spaces', value: 12, trend: { value: 3, isPositive: true }, gradient: 'green' },
    { label: 'Posts', value: 156, gradient: 'purple' },
    { label: 'Active Days', value: 28, gradient: 'orange' },
  ]}
  completion={{
    percentage: 100,
    items: [
      { label: '4+ photos', completed: true },
      { label: 'Bio written', completed: true },
      { label: '5+ connections', completed: true },
    ]
  }}
  spaces={profile.spaces}
  activity={profile.recentActivity}
  events={profile.upcomingEvents}
  hivelab={{
    accessState: profile.isSpaceLeader ? 'unlocked' : 'locked-not-leader',
    tools: profile.tools,
  }}
/>
```

---

**Design Philosophy**: Layout first, components second. The bento grid creates visual interest through **asymmetry**, **whitespace**, and **depth** (carousel protrudes). Components serve the layout, not the other way around.
