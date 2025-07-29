import { NextRequest, NextResponse } from 'next/server';

interface HiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  category: 'space' | 'tool' | 'social' | 'system' | 'update';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    spaceId?: string;
    toolId?: string;
    userId?: string;
    [key: string]: any;
  };
}

// Mock notifications data
const MOCK_NOTIFICATIONS: HiveNotification[] = [
  {
    id: 'notif-1',
    title: 'New member joined CS Majors',
    message: 'Sarah Chen just joined the Computer Science Majors space',
    type: 'info',
    category: 'space',
    isRead: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    actionUrl: '/spaces/cs-majors',
    actionText: 'View Space',
    metadata: { spaceId: 'cs-majors', userId: 'sarah-chen' }
  },
  {
    id: 'notif-2',
    title: 'Tool Update Available',
    message: 'Poll Maker v2.1 is now available with new features',
    type: 'info',
    category: 'tool',
    isRead: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    actionUrl: '/tools/poll-maker',
    actionText: 'Update Tool',
    metadata: { toolId: 'poll-maker' }
  },
  {
    id: 'notif-3',
    title: 'Event Reminder',
    message: 'Spring Career Fair starts in 1 hour',
    type: 'warning',
    category: 'system',
    isRead: false,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    actionUrl: '/events/career-fair-2024',
    actionText: 'View Event'
  },
  {
    id: 'notif-4',
    title: 'Weekly Usage Report',
    message: 'Your tools were used 127 times this week!',
    type: 'success',
    category: 'system',
    isRead: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actionUrl: '/tools/analytics',
    actionText: 'View Analytics'
  },
  {
    id: 'notif-5',
    title: 'Space Invitation',
    message: 'Alex invited you to join Engineering Club',
    type: 'info',
    category: 'social',
    isRead: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    actionUrl: '/spaces/engineering-club?invite=abc123',
    actionText: 'Accept Invitation',
    metadata: { spaceId: 'engineering-club', userId: 'alex-kim' }
  },
  {
    id: 'notif-6',
    title: 'System Update',
    message: 'HIVE platform update deployed with performance improvements',
    type: 'system',
    category: 'update',
    isRead: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    actionUrl: '/changelog',
    actionText: 'View Changelog'
  },
  {
    id: 'notif-7',
    title: 'Tool Published Successfully',
    message: 'Your Study Timer tool is now live in the marketplace',
    type: 'success',
    category: 'tool',
    isRead: true,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    actionUrl: '/tools/study-timer',
    actionText: 'View Tool',
    metadata: { toolId: 'study-timer' }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unread') === 'true';
    const category = searchParams.get('category');

    let notifications = [...MOCK_NOTIFICATIONS];

    // Filter by category
    if (category && category !== 'all') {
      notifications = notifications.filter(n => n.category === category);
    }

    // Filter by read status
    if (unreadOnly) {
      notifications = notifications.filter(n => !n.isRead);
    }

    // Sort by timestamp (newest first)
    notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply limit
    notifications = notifications.slice(0, limit);

    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

    return NextResponse.json({
      notifications,
      unreadCount,
      hasMore: MOCK_NOTIFICATIONS.length > limit
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.action === 'mark_read') {
      const notificationIds = Array.isArray(body.notificationIds) 
        ? body.notificationIds 
        : [body.notificationIds];

      // In a real app, this would update the database
      console.log('Marking notifications as read:', notificationIds);

      return NextResponse.json({
        success: true,
        message: 'Notifications marked as read'
      });
    }

    if (body.action === 'mark_all_read') {
      // In a real app, this would update all notifications for the user
      console.log('Marking all notifications as read');

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read'
      });
    }

    if (body.action === 'delete') {
      const notificationIds = Array.isArray(body.notificationIds) 
        ? body.notificationIds 
        : [body.notificationIds];

      // In a real app, this would delete from database
      console.log('Deleting notifications:', notificationIds);

      return NextResponse.json({
        success: true,
        message: 'Notifications deleted'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error handling notification action:', error);
    return NextResponse.json(
      { error: 'Failed to process notification action' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, isRead } = body;

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // In a real app, this would update the notification in the database
    console.log(`Updating notification ${notificationId} read status to:`, isRead);

    return NextResponse.json({
      success: true,
      message: 'Notification updated successfully'
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}