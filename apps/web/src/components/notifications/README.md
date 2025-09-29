# 🔔 HIVE Notification System Integration Guide

## Overview

The HIVE notification system provides real-time, behaviorally-optimized notifications with Firebase integration. It implements the "someone needs you" psychological framework to drive engagement and community support.

## Quick Start

### 1. Basic Integration

```tsx
import { HiveNotificationBell } from '@/components/notifications/hive-notification-bell';

export default function Layout() {
  return (
    <header>
      {/* Other header content */}
      <HiveNotificationBell />
    </header>
  );
}
```

### 2. Using the Raw Components

```tsx
import { NotificationSystem } from '@hive/ui';
import { useRouter } from 'next/navigation';

export default function MyNotificationBell() {
  const router = useRouter();

  return (
    <NotificationSystem
      onNavigate={(url) => router.push(url)}
    />
  );
}
```

### 3. Using Real-time Data

```tsx
import { useRealtimeNotifications } from '@/hooks/use-realtime-notifications';
import { NotificationSystem } from '@hive/ui';

export default function ConnectedNotifications() {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useRealtimeNotifications();

  return (
    <NotificationSystem
      notifications={notifications}
      unreadCount={unreadCount}
      loading={loading}
      error={error}
      onMarkAsRead={markAsRead}
      onMarkAllAsRead={markAllAsRead}
      onDeleteNotification={deleteNotification}
      onClearAll={clearAll}
      onNavigate={(url) => router.push(url)}
    />
  );
}
```

## Components

### NotificationSystem
The complete notification system with bell, dropdown, and toast management.

**Props:**
- `notifications?: HiveNotification[]` - Array of notifications
- `unreadCount?: number` - Override unread count
- `loading?: boolean` - Loading state
- `error?: string | null` - Error message
- `onNavigate?: (url: string) => void` - Navigation handler
- `disabled?: boolean` - Disabled state

### NotificationBell
Just the notification bell with badge, without dropdown.

**Props:**
- `unreadCount?: number` - Number of unread notifications
- `loading?: boolean` - Loading state
- `hasError?: boolean` - Error state
- `hasUrgent?: boolean` - Has urgent notifications
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `onClick?: () => void` - Click handler

### NotificationDropdown
The dropdown panel showing notification list.

**Props:**
- `notifications: HiveNotification[]` - Notifications to display
- `unreadCount: number` - Number of unread notifications
- `isOpen: boolean` - Open state
- `onClose: () => void` - Close handler
- `onMarkAsRead: (id: string) => Promise<void>` - Mark as read handler
- `onMarkAllAsRead: () => Promise<void>` - Mark all as read handler
- `onDeleteNotification: (id: string) => Promise<void>` - Delete handler
- `onClearAll: () => Promise<void>` - Clear all handler

### NotificationItem
Individual notification item component.

**Props:**
- `notification: HiveNotification` - Notification data
- `isProcessing?: boolean` - Processing state
- `onMarkAsRead: () => void` - Mark as read handler
- `onDelete: () => void` - Delete handler
- `onNavigate?: (url: string) => void` - Navigation handler

## Behavioral Psychology Features

### 1. "Someone Needs You" Framing

Notifications are framed as opportunities to help others rather than things you're missing:

```tsx
// ❌ FOMO framing
"You have 5 unread notifications"

// ✅ "Someone needs you" framing
"5 people need your help"
```

### 2. Social Proof Messaging

```tsx
const notification = {
  title: "Sarah needs help with calculus",
  socialProofText: "2 others are also helping",
  category: "someone_needs_you"
};
```

### 3. Exclusivity Positioning

```tsx
const notification = {
  title: "New study group forming",
  exclusivityText: "You're among the first to know",
  category: "insider_knowledge"
};
```

### 4. Variable Reward Scheduling

The system uses different urgency levels and timings to create variable reward patterns:

```tsx
const urgentNotification = {
  priority: "urgent",
  urgencyLevel: "immediate",
  category: "someone_needs_you"
  // Triggers immediate toast + bell animation
};
```

## Real-time Hook

### useRealtimeNotifications()

Firebase-integrated hook providing real-time notification updates:

```tsx
const {
  notifications,        // HiveNotification[]
  unreadCount,          // number
  loading,              // boolean
  error,                // string | null
  markAsRead,           // (id: string) => Promise<void>
  markAllAsRead,        // () => Promise<void>
  deleteNotification,   // (id: string) => Promise<void>
  clearAll,             // () => Promise<void>
  refreshNotifications, // () => void
} = useRealtimeNotifications();
```

**Features:**
- Real-time Firebase listeners
- Campus isolation (UB-only for vBETA)
- Optimistic updates
- Error handling and retry logic
- Behavioral analytics logging

## Toast Notifications

### High-Priority Toasts

Urgent notifications automatically trigger toast notifications:

```tsx
import { useNotificationToasts } from '@hive/ui';

const { ToastManager } = useNotificationToasts(
  notifications,
  (url) => router.push(url),
  (notification) => notification.priority === 'urgent' // Custom filter
);

// Include in your component tree
return (
  <div>
    {/* Your content */}
    <ToastManager />
  </div>
);
```

### Manual Toast Creation

```tsx
import {
  createUrgentHelpToast,
  createSocialProofToast,
  createInsiderToast
} from '@hive/ui';
import { useToast } from '@hive/ui';

const { showToast } = useToast();

// Urgent help request
const helpToast = createUrgentHelpToast(
  "Sarah Chen",
  "calculus derivatives",
  "/spaces/math-help/posts/123",
  (url) => router.push(url)
);
showToast(helpToast);

// Achievement notification
const achievementToast = createSocialProofToast(
  "Top Contributor",
  "5",
  "/profile/achievements",
  (url) => router.push(url)
);
showToast(achievementToast);
```

## Firebase Data Structure

### Notification Document

```typescript
interface NotificationDocument {
  id: string;
  userId: string;
  campusId: 'ub-buffalo'; // Campus isolation
  title: string;
  message: string;
  type: 'connection' | 'space' | 'help_request' | 'achievement' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'social_proof' | 'someone_needs_you' | 'insider_knowledge' | 'community_growth';
  isRead: boolean;
  timestamp: Timestamp;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    spaceId?: string;
    senderName?: string;
    avatarUrl?: string;
    // ...additional context
  };
  // Behavioral enhancements
  urgencyLevel?: 'immediate' | 'today' | 'this_week';
  socialProofText?: string;
  exclusivityText?: string;
}
```

### Creating Notifications

Use the server-side notification service:

```typescript
import { createNotification } from '@/lib/notifications-service';

await createNotification({
  userId: 'user123',
  title: 'Someone needs your help!',
  message: 'Sarah is struggling with calculus derivatives.',
  type: 'help_request',
  category: 'someone_needs_you',
  actionUrl: '/spaces/math-help/posts/calc-derivatives',
  actionText: 'Help Now',
  metadata: {
    senderName: 'Sarah Chen',
    spaceId: 'math-help',
    urgencyLevel: 'immediate'
  }
});
```

## Styling & Theming

The notification system uses HIVE design tokens automatically:

```css
/* Notification colors */
--hive-brand-primary: #FFD700; /* Gold */
--hive-status-error: #EF4444;  /* Urgent notifications */
--hive-background-secondary: /* Dropdown background */
--hive-text-primary: /* Main text */
--hive-text-secondary: /* Secondary text */
```

### Custom Styling

```tsx
<NotificationSystem
  className="custom-notifications"
  // All components accept className prop
/>
```

## Performance Considerations

### Optimization Features

1. **Real-time Listeners**: Efficient Firebase onSnapshot queries
2. **Campus Isolation**: Queries limited to UB campus for vBETA
3. **Limit Queries**: Maximum 50 recent notifications
4. **Optimistic Updates**: Immediate UI feedback
5. **Batch Operations**: Mark all / clear all use batched writes

### Bundle Size

The notification system adds ~15KB to your bundle (gzipped).

## Accessibility

### Built-in Features

1. **Screen Reader Support**: Proper ARIA labels and descriptions
2. **Keyboard Navigation**: Full keyboard support for all interactions
3. **Focus Management**: Proper focus handling for dropdowns
4. **Color Contrast**: WCAG AA compliant color ratios
5. **Motion Preferences**: Respects `prefers-reduced-motion`

### ARIA Labels

```tsx
<NotificationBell
  aria-label="Notifications (3 unread)"
  // Automatically updates based on count
/>
```

## Behavioral Analytics

The system automatically logs behavioral events:

```typescript
// Navigation tracking
logger.info('Notification navigation', {
  url: '/spaces/math-help',
  source: 'notification_bell',
  category: 'someone_needs_you',
  urgencyLevel: 'immediate'
});

// Completion tracking (70% target)
logger.info('Notification interaction completed', {
  notificationId: 'notif_123',
  actionTaken: 'helped_user',
  timeToComplete: 45000 // 45 seconds
});
```

## Troubleshooting

### Common Issues

1. **Notifications not appearing**: Check Firebase rules and user authentication
2. **Toast not showing**: Ensure ToastProvider is in component tree
3. **Navigation not working**: Verify onNavigate handler is provided
4. **Styling issues**: Check CSS custom properties are defined

### Debug Mode

```tsx
<NotificationSystem
  // Add debug logging
  onNavigate={(url) => {
    console.log('Navigating to:', url);
    router.push(url);
  }}
/>
```

## Migration Guide

### From Legacy Notification Bell

```tsx
// Before
<NotificationBell count={5} onClick={handleClick} />

// After
<NotificationSystem onNavigate={router.push} />
```

### Adding Real-time Data

```tsx
// Before: Static data
<NotificationSystem notifications={staticNotifications} />

// After: Real-time Firebase
const notificationData = useRealtimeNotifications();
<NotificationSystem {...notificationData} />
```

---

## Support

For questions about the notification system:
1. Check the component Storybook docs
2. Review behavioral psychology patterns in `CLAUDE.md`
3. Test with the mock data in `NotificationSystem`

The notification system is designed to drive the core HIVE behavior: "Never panic alone" becomes automatic student response.