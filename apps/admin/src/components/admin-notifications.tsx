"use client";

import { useState, useEffect } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { AdminNotification, NotificationPriority, NotificationType } from "@/lib/admin-notifications";

interface AdminNotificationsProps {
  onNotificationClick?: (notification: AdminNotification) => void;
  maxHeight?: string;
}

export function AdminNotifications({ onNotificationClick, maxHeight = "400px" }: AdminNotificationsProps) {
  const { admin } = useAdminAuth();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!admin) return;

    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'mark_read',
          notificationId,
        }),
      });

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!admin) return;

    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'mark_all_read',
        }),
      });

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    if (!notification.readAt) {
      markAsRead(notification.id);
    }
    
    if (onNotificationClick) {
      onNotificationClick(notification);
    } else if (notification.actionUrl) {
      // Navigate to action URL
      window.location.href = notification.actionUrl;
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [admin]);

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'new_user_registration': return '👤';
      case 'builder_request_submitted': return '🔨';
      case 'content_flagged': return '🚩';
      case 'space_activation_request': return '🏢';
      case 'system_alert': return '⚠️';
      case 'security_incident': return '🔒';
      case 'performance_warning': return '📈';
      case 'critical_error': return '❌';
      default: return '📢';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="border-gray-700 bg-gray-900/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-white">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={fetchNotifications}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3" style={{ maxHeight, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-colors
                  ${notification.readAt 
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800' 
                    : 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-lg mt-0.5">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium text-sm ${
                          notification.readAt ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs text-amber-400">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs ${
                        notification.readAt ? 'text-gray-400' : 'text-gray-300'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(notification.createdAt)}
                        </span>
                        {notification.actionText && (
                          <span className="text-xs text-amber-400">
                            {notification.actionText} →
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {!notification.readAt && (
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
