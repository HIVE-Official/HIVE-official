# HIVE Mobile Navigation Specification

## Navigation Philosophy
**"Thumb-first, gesture-native, instantly accessible"**

Mobile navigation should feel invisible - users should focus on content and connections, not figuring out how to navigate.

## Primary Navigation: Bottom Tab Bar

### Design Specifications

```tsx
// Bottom Tab Bar Component Structure
<MobileTabBar>
  <Tab icon="Home" label="Home" badge={3} />
  <Tab icon="Search" label="Discover" />
  <Tab icon="Plus" label="Create" accent />
  <Tab icon="Spaces" label="Spaces" badge={dot} />
  <Tab icon="Profile" label="Me" />
</MobileTabBar>
```

### Visual Design
```scss
// Dimensions
$tab-bar-height: 56px;  // iOS safe area + 56px
$tab-icon-size: 24px;
$tab-label-size: 10px;
$create-button-size: 48px;

// Colors
$tab-inactive: #71717A;
$tab-active: #FFD700;
$tab-background: #0A0A0A;
$create-button-bg: #FFD700;
```

### Tab Behaviors
1. **Home** - Personal feed, notifications, quick stats
2. **Discover** - Search, trending, recommendations
3. **Create** (FAB) - Quick actions menu
4. **Spaces** - Your communities, space feeds
5. **Me** - Profile, settings, analytics

### Interaction States
```tsx
// Tab Press Feedback
onPress: Haptic feedback (10ms vibration)
Animation: Scale(0.95) with spring physics
Color: Immediate switch to active state

// Badge Notifications
Numeric: "3" for countable items
Dot: Red dot for binary states
Pulse: Animate for new activity
```

## Secondary Navigation: Gesture System

### Core Gestures
```typescript
interface GestureMap {
  swipeRight: 'navigateBack',
  swipeLeft: 'navigateForward',
  swipeDown: 'refresh',
  swipeUp: 'showMore',
  pinch: 'zoom',
  longPress: 'contextMenu',
  doubleTap: 'like'
}
```

### Edge Swipe Navigation
```scss
// Swipe zones
$edge-width: 20px;
$swipe-threshold: 80px;  // Minimum distance
$swipe-velocity: 0.5;    // Minimum speed

// Visual feedback
.swipe-indicator {
  width: 3px;
  background: $hive-gold;
  opacity: 0 → 1 during swipe;
  glow: 0 → 8px during swipe;
}
```

## Create Menu (Floating Action Button)

### Expanded State Design
```tsx
<CreateMenu>
  <QuickAction icon="📝" label="Post" subtitle="Share an update" />
  <QuickAction icon="🛠" label="Tool" subtitle="Build something useful" />
  <QuickAction icon="🚀" label="Space" subtitle="Start a community" />
  <QuickAction icon="📅" label="Event" subtitle="Organize meetup" />
  <QuickAction icon="🎯" label="Task" subtitle="Create todo" />
</CreateMenu>
```

### Animation Sequence
```typescript
// FAB Expansion Animation
1. Tap FAB → Haptic feedback
2. FAB scales to 1.1x → 1.0x (bounce)
3. Overlay fades in (200ms)
4. Menu items stagger in (50ms each)
5. Background blur increases to 20px
```

## Contextual Top Bar

### Adaptive Header
```tsx
// Context-aware top bar
<TopBar>
  {inSpace && <SpaceHeader />}
  {inProfile && <ProfileHeader />}
  {inTool && <ToolHeader />}
  {searching && <SearchHeader />}
  {default && <DefaultHeader />}
</TopBar>
```

### Scroll Behaviors
```typescript
// Hide on scroll down, show on scroll up
const HIDE_THRESHOLD = 10;
const SHOW_THRESHOLD = 5;

onScroll = (event) => {
  if (scrollingDown && delta > HIDE_THRESHOLD) {
    animateTopBar({ translateY: -60 });
  }
  if (scrollingUp && delta > SHOW_THRESHOLD) {
    animateTopBar({ translateY: 0 });
  }
};
```

## Search Interface

### Full-Screen Search Modal
```tsx
<SearchModal>
  <SearchBar autoFocus placeholder="Search HIVE..." />

  <QuickFilters>
    <Chip>My Campus</Chip>
    <Chip>This Week</Chip>
    <Chip>Verified</Chip>
  </QuickFilters>

  <SearchTabs>
    <Tab>All</Tab>
    <Tab>Spaces</Tab>
    <Tab>Tools</Tab>
    <Tab>People</Tab>
    <Tab>Posts</Tab>
  </SearchTabs>

  <RecentSearches />
  <TrendingSearches />
  <SearchResults />
</SearchModal>
```

## Sheet Navigation Pattern

### Bottom Sheet for Details
```tsx
// Swipeable bottom sheet
<BottomSheet
  snapPoints={['25%', '50%', '90%']}
  initialSnap={1}
  enablePanDownToClose
>
  <SheetHandle />
  <SheetContent>
    {/* Dynamic content based on context */}
  </SheetContent>
</BottomSheet>
```

### Use Cases
- Space details preview
- Tool quick view
- User profile peek
- Post expanded view
- Settings panels

## Notification Tray

### Pull-Down Notification Center
```tsx
<NotificationTray>
  <NotificationGroup title="New">
    <Notification type="mention" />
    <Notification type="like" />
  </NotificationGroup>

  <NotificationGroup title="Earlier">
    <Notification type="space_invite" />
    <Notification type="tool_shared" />
  </NotificationGroup>
</NotificationTray>
```

## Mobile-Specific Features

### 1. Quick Actions Bar (iOS 3D Touch / Android Long Press)
```typescript
quickActions = [
  { id: 'scan', label: 'Scan QR', icon: '📷' },
  { id: 'nearby', label: 'Nearby Spaces', icon: '📍' },
  { id: 'schedule', label: 'My Schedule', icon: '📅' },
];
```

### 2. Pull-to-Refresh
```tsx
<RefreshControl
  refreshing={refreshing}
  onRefresh={handleRefresh}
  tintColor="#FFD700"
  title="Pull to refresh"
  titleColor="#71717A"
/>
```

### 3. Haptic Feedback Map
```typescript
const hapticEvents = {
  tabPress: 'impactLight',
  like: 'impactMedium',
  error: 'notificationError',
  success: 'notificationSuccess',
  longPress: 'impactHeavy',
  refresh: 'selection'
};
```

## Responsive Breakpoints

### Phone Layouts
```scss
// iPhone SE → iPhone Pro Max
@media (max-width: 428px) {
  .tab-bar {
    labels: hidden;
    icons-only: true;
  }
  .create-fab {
    size: 44px;
  }
}

// Standard phones
@media (min-width: 375px) {
  .tab-bar {
    labels: visible;
  }
  .create-fab {
    size: 48px;
  }
}
```

### Tablet Adjustments
```scss
@media (min-width: 768px) {
  .tab-bar {
    position: side;  // Move to side rail
    orientation: vertical;
    width: 72px;
  }
}
```

## Accessibility Considerations

### Voice Control Labels
```tsx
<Tab
  accessibilityLabel="Home feed"
  accessibilityHint="Double tap to view your home feed"
  accessibilityRole="button"
/>
```

### Large Touch Targets
- Minimum: 44x44pt (iOS) / 48x48dp (Android)
- Recommended: 48x48pt for primary actions
- Spacing: 8pt minimum between targets

### Screen Reader Support
```tsx
// Announce navigation changes
announceForAccessibility('Navigated to Spaces');

// Group related elements
<AccessibilityGroup>
  <SpaceCard />
  <SpaceActions />
</AccessibilityGroup>
```

## Performance Optimizations

### Lazy Loading
```typescript
// Load tabs on demand
const tabs = {
  home: lazy(() => import('./Home')),
  discover: lazy(() => import('./Discover')),
  spaces: lazy(() => import('./Spaces')),
  profile: lazy(() => import('./Profile'))
};
```

### Navigation Preloading
```typescript
// Predictive preloading based on user patterns
if (userLikelyToVisit('spaces')) {
  preloadComponent('spaces');
}
```

### Gesture Performance
```typescript
// Use native driver for gestures
Animated.event(
  [{ nativeEvent: { translationX: this.translateX }}],
  { useNativeDriver: true }
);
```

## Implementation Priority

### Phase 1 (Week 1)
1. ✅ Remove dashboard routing
2. Implement bottom tab bar
3. Add basic gesture navigation
4. Create FAB with menu

### Phase 2 (Week 2)
1. Full-screen search
2. Bottom sheets
3. Pull-to-refresh
4. Haptic feedback

### Phase 3 (Week 3)
1. Advanced gestures
2. Notification tray
3. Context-aware headers
4. Performance optimization

## Platform-Specific Considerations

### iOS
- Respect safe areas
- Support iOS gestures
- Implement 3D touch shortcuts
- Follow HIG guidelines

### Android
- Material Design 3 compliance
- Back button handling
- Support gesture navigation
- Implement app shortcuts

## Testing Checklist

### Usability Tests
- [ ] One-handed operation possible
- [ ] All features accessible via thumb
- [ ] Gesture discovery intuitive
- [ ] Navigation state clear
- [ ] Back navigation predictable

### Performance Tests
- [ ] 60fps scrolling
- [ ] < 100ms tap response
- [ ] < 300ms navigation
- [ ] Smooth gesture tracking
- [ ] No jank in animations

### Accessibility Tests
- [ ] VoiceOver/TalkBack compatible
- [ ] Minimum touch targets met
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Reduced motion respected

---

## Summary

HIVE's mobile navigation combines the best patterns from leading apps:
- Instagram's bottom tabs for clarity
- Discord's gesture navigation for power users
- Notion's command palette for efficiency
- TikTok's swipe gestures for engagement

The result is a navigation system that feels native, intuitive, and powerful - perfect for Gen Z college students who live on their phones.