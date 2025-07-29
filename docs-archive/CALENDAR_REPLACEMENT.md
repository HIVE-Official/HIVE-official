# HIVE Calendar Component Replacement

## Overview
The legacy `SmartCalendar` component has been replaced with the new comprehensive `CalendarCard` component across all dashboard implementations.

## What Changed

### ✅ Replaced Components:
- ✅ `ProfileSystem` → Now uses `CalendarCard`
- ✅ `ProfileSystemSimple` → Now uses `CalendarCard`  
- ✅ `EnhancedProfileDashboard` → Now uses `CalendarCard`

### 🆕 New Components Added:
- **`CalendarCard`** - Main calendar component with comprehensive features
- **`calendar-data-adapter.ts`** - Adapter to convert SmartCalendar props to CalendarCard props
- **`calendar-integration-test.tsx`** - Test component for verification
- **`calendar-card.stories.tsx`** - Storybook stories for all states

## Key Features of New CalendarCard

### 📱 **Responsive Design**
- Desktop and Mobile layouts
- Adaptive content based on screen size
- Time-aware display (Morning/Afternoon/Evening/Night titles)

### 🎨 **Multiple States**
- **Loading**: Animated skeleton with sync status
- **Default**: Full calendar with events and connections
- **Empty**: Clean onboarding with connection prompts
- **Error/Sync-failed**: Error handling with retry options

### 🔗 **Calendar Connections**
- Google Calendar integration
- Outlook integration  
- University calendar feeds
- Visual connection status indicators
- Last sync timestamps

### ⚠️ **Conflict Detection**
- Scheduling conflict detection
- Resolution suggestions
- Interactive conflict resolution UI

### 🎯 **Event Management**
- Event type system: 🎓 Academic, 📚 Study, 🎉 Social, ⚡ Personal, 🏢 Work
- Color-coded events with emojis
- Location and attendee information
- RSVP status tracking
- Space integration

## Usage

### Basic Usage (Existing SmartCalendar replacement)
```typescript
import { CalendarCard, adaptSmartCalendarProps } from '@hive/ui';

// Automatic prop adaptation from SmartCalendar format
<CalendarCard
  {...adaptSmartCalendarProps(
    events,          // Event[] - existing format
    isLoading,       // boolean
    error,          // string | undefined
    onEventClick,   // (eventId: string) => void
    onAddEvent,     // () => void
    'desktop'       // 'desktop' | 'mobile'
  )}
/>
```

### Advanced Usage (Full control)
```typescript
import { CalendarCard } from '@hive/ui';
import type { CalendarCardData, CalendarCardState } from '@hive/ui';

<CalendarCard
  data={calendarData}
  state="default"
  variant="desktop"
  onViewCalendar={() => router.push('/calendar')}
  onConnectCalendar={(type) => handleConnect(type)}
  onAddEvent={() => setShowEventModal(true)}
  onResolveConflict={(conflictId) => handleConflictResolution(conflictId)}
  onSyncCalendar={(connectionId) => handleSync(connectionId)}
  onEventClick={(event) => handleEventClick(event)}
/>
```

## Data Structure

### Event Format (Extended)
```typescript
interface Event {
  id: string;
  title: string;
  time: string;
  type: 'class' | 'social' | 'meeting' | 'academic' | 'milestone' | 'deadline';
  location?: string;
  attendees: string[];
  overlap?: EventOverlap;
  isRecurring?: boolean;
  isAllDay?: boolean;
  hasReminder?: boolean;
  metadata?: {
    spaceId?: string;
    rsvpStatus?: 'yes' | 'no' | 'maybe' | 'pending';
    professor?: string;
    room?: string;
    buildingCode?: string;
    recurring?: boolean;
    conflictsWith?: string[];
  };
}
```

## Migration Guide

### For Existing Code Using SmartCalendar:
1. **No changes required** - The adapter handles prop conversion automatically
2. **Enhanced features** - Users get improved UI and functionality
3. **Backward compatibility** - All existing event handlers work the same

### For New Implementations:
- Use `CalendarCard` directly with full prop control
- Leverage new features like connection management and conflict resolution
- Implement calendar sync and integration features

## Design System Integration

### ✅ **HIVE Brand Compliance**
- Uses existing `HiveCard` component system
- Follows HIVE color palette (dark luxury with gold accents)
- Integrates with HIVE motion system
- Consistent with other profile components

### 🎭 **Animation System**
- Framer Motion integration
- Staggered animations for lists
- Hover states and interactions
- Loading skeleton animations

## Testing

Test all states using the demo component:
```bash
# Import the test component
import { CalendarIntegrationTest } from '@hive/ui';

# View all states: loading, default, empty, error
<CalendarIntegrationTest />
```

## Storybook Stories

View comprehensive examples in Storybook:
- All state variations
- Mobile/Desktop responsive demos  
- Interactive examples with actions
- Time-based variants

## Performance

- **Lazy loading** support for large event lists
- **Memoized** event processing and filtering
- **Efficient re-renders** with React.memo patterns
- **Minimal bundle impact** - reuses existing HIVE components

## Accessibility

- **WCAG compliant** with proper ARIA labels
- **Keyboard navigation** support
- **Screen reader** friendly event announcements
- **High contrast** mode compatibility

---

**Status**: ✅ **Complete** - All dashboard calendar components now use CalendarCard
**Compatibility**: ✅ **Backward Compatible** - Existing SmartCalendar usage works unchanged  
**Testing**: ✅ **Ready** - Integration tests and Storybook stories included