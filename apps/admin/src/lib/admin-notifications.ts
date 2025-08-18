// Admin notifications system for monitoring platform activity

export type NotificationType = 
  | 'new_user_registration'
  | 'builder_request_submitted'
  | 'content_flagged'
  | 'space_activation_request'
  | 'system_alert'
  | 'security_incident'
  | 'performance_warning'
  | 'critical_error';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  data?: Record<string, unknown>;
  createdAt: string;
  readAt?: string;
  readBy?: string;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
}

export interface NotificationChannel {
  id: string;
  name: string;
  enabled: boolean;
  types: NotificationType[];
  webhookUrl?: string;
  emailEnabled?: boolean;
  pushEnabled?: boolean;
}

class AdminNotificationSystem {
  private notifications: AdminNotification[] = [];
  private channels: NotificationChannel[] = [
    {
      id: 'dashboard',
      name: 'Dashboard Notifications',
      enabled: true,
      types: ['new_user_registration', 'builder_request_submitted', 'content_flagged', 'space_activation_request'],
    },
    {
      id: 'security',
      name: 'Security Alerts',
      enabled: true,
      types: ['security_incident', 'critical_error'],
    },
    {
      id: 'system',
      name: 'System Monitoring',
      enabled: true,
      types: ['system_alert', 'performance_warning', 'critical_error'],
    },
  ];

  /**
   * Create a new admin notification
   */
  async createNotification(notification: Omit<AdminNotification, 'id' | 'createdAt'>): Promise<AdminNotification> {
    const newNotification: AdminNotification = {
      ...notification,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
    };

    this.notifications.unshift(newNotification);

    // Send to appropriate channels
    await this.sendToChannels(newNotification);

    // Log the notification
    console.log(`[ADMIN_NOTIFICATION] ${notification.type}: ${notification.title}`);

    return newNotification;
  }

  /**
   * Get notifications for admin dashboard
   */
  getNotifications(limit: number = 50, unreadOnly: boolean = false): AdminNotification[] {
    let filtered = this.notifications;

    if (unreadOnly) {
      filtered = filtered.filter(n => !n.readAt);
    }

    return filtered.slice(0, limit);
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, adminId: string): Promise<boolean> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification) return false;

    notification.readAt = new Date().toISOString();
    notification.readBy = adminId;

    return true;
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(adminId: string): Promise<number> {
    const unreadCount = this.notifications.filter(n => !n.readAt).length;
    
    this.notifications.forEach(notification => {
      if (!notification.readAt) {
        notification.readAt = new Date().toISOString();
        notification.readBy = adminId;
      }
    });

    return unreadCount;
  }

  /**
   * Delete old notifications
   */
  async cleanupOldNotifications(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const initialCount = this.notifications.length;
    this.notifications = this.notifications.filter(n => 
      new Date(n.createdAt) > cutoffDate
    );

    return initialCount - this.notifications.length;
  }

  /**
   * Get notification statistics
   */
  getStatistics(): {
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
    byPriority: Record<NotificationPriority, number>;
  } {
    const stats = {
      total: this.notifications.length,
      unread: this.notifications.filter(n => !n.readAt).length,
      byType: {} as Record<NotificationType, number>,
      byPriority: {} as Record<NotificationPriority, number>,
    };

    this.notifications.forEach(notification => {
      stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;
      stats.byPriority[notification.priority] = (stats.byPriority[notification.priority] || 0) + 1;
    });

    return stats;
  }

  /**
   * Send notification to configured channels
   */
  private async sendToChannels(notification: AdminNotification): Promise<void> {
    const relevantChannels = this.channels.filter(channel => 
      channel.enabled && channel.types.includes(notification.type)
    );

    for (const channel of relevantChannels) {
      try {
        await this.sendToChannel(channel, notification);
      } catch (error) {
        console.error(`Failed to send notification to channel ${channel.name}:`, error);
      }
    }
  }

  /**
   * Send notification to specific channel
   */
  private async sendToChannel(channel: NotificationChannel, notification: AdminNotification): Promise<void> {
    switch (channel.id) {
      case 'dashboard':
        // Dashboard notifications are handled by the UI
        break;
      case 'security':
        if (notification.priority === 'critical') {
          await this.sendSecurityAlert(notification);
        }
        break;
      case 'system':
        if (channel.webhookUrl) {
          await this.sendWebhook(channel.webhookUrl, notification);
        }
        break;
    }
  }

  /**
   * Send security alert
   */
  private async sendSecurityAlert(notification: AdminNotification): Promise<void> {
    // TODO: Implement security alert system (email, Slack, etc.)
    console.log(`[SECURITY_ALERT] ${notification.title}: ${notification.message}`);
  }

  /**
   * Send webhook notification
   */
  private async sendWebhook(url: string, notification: AdminNotification): Promise<void> {
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${notification.title}: ${notification.message}`,
          notification,
        }),
      });
    } catch (error) {
      console.error('Failed to send webhook:', error);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
export const adminNotifications = new AdminNotificationSystem();

// Convenience functions for common notification types
export const notifyNewUserRegistration = (userEmail: string) => {
  return adminNotifications.createNotification({
    type: 'new_user_registration',
    title: 'New User Registration',
    message: `New user registered: ${userEmail}`,
    priority: 'low',
    actionRequired: false,
    data: { userEmail },
  });
};

export const notifyBuilderRequestSubmitted = (userName: string, spaceName: string) => {
  return adminNotifications.createNotification({
    type: 'builder_request_submitted',
    title: 'Builder Request Submitted',
    message: `${userName} requested builder access for ${spaceName}`,
    priority: 'medium',
    actionRequired: true,
    actionUrl: '/admin/dashboard?tab=builders',
    actionText: 'Review Request',
    data: { userName, spaceName },
  });
};

export const notifyContentFlagged = (contentType: string, flagReason: string) => {
  return adminNotifications.createNotification({
    type: 'content_flagged',
    title: 'Content Flagged',
    message: `${contentType} flagged for: ${flagReason}`,
    priority: 'medium',
    actionRequired: true,
    actionUrl: '/admin/dashboard?tab=content',
    actionText: 'Review Content',
    data: { contentType, flagReason },
  });
};

export const notifySystemAlert = (alertType: string, message: string, priority: NotificationPriority = 'medium') => {
  return adminNotifications.createNotification({
    type: 'system_alert',
    title: `System Alert: ${alertType}`,
    message,
    priority,
    actionRequired: priority === 'high' || priority === 'critical',
    actionUrl: '/admin/dashboard?tab=system',
    actionText: 'View System Status',
    data: { alertType },
  });
};

export const notifySecurityIncident = (incidentType: string, details: string) => {
  return adminNotifications.createNotification({
    type: 'security_incident',
    title: `Security Incident: ${incidentType}`,
    message: details,
    priority: 'critical',
    actionRequired: true,
    actionUrl: '/admin/dashboard?tab=system',
    actionText: 'Investigate',
    data: { incidentType, details },
  });
};

export const notifyPerformanceWarning = (metric: string, value: string, threshold: string) => {
  return adminNotifications.createNotification({
    type: 'performance_warning',
    title: 'Performance Warning',
    message: `${metric} at ${value} (threshold: ${threshold})`,
    priority: 'medium',
    actionRequired: false,
    actionUrl: '/admin/dashboard?tab=system',
    actionText: 'View Metrics',
    data: { metric, value, threshold },
  });
};