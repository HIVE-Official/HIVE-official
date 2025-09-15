import { dbAdmin } from '@hive/core/server';
import { logger } from '@hive/core/utils/logger';


export type AdminAction = 
  | 'login'
  | 'logout'
  | 'user_search'
  | 'user_suspend'
  | 'user_unsuspend'
  | 'user_role_grant'
  | 'user_role_revoke'
  | 'space_activate'
  | 'space_deactivate'
  | 'space_freeze'
  | 'space_create'
  | 'space_delete'
  | 'content_approve'
  | 'content_remove'
  | 'content_flag'
  | 'builder_request_approve'
  | 'builder_request_reject'
  | 'system_config_change'
  | 'notification_create'
  | 'notification_read'
  | 'dashboard_view'
  | 'export_data'
  | 'import_data'
  | 'audit_log_view';

export interface AdminActivityLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: AdminAction;
  resource?: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  duration?: number;
  success: boolean;
  errorMessage?: string;
  sessionId?: string;
}

export interface ActivityLogFilter {
  adminId?: string;
  action?: AdminAction;
  resource?: string;
  dateFrom?: string;
  dateTo?: string;
  success?: boolean;
  limit?: number;
  offset?: number;
}

export interface ActivityLogStats {
  totalActions: number;
  successfulActions: number;
  failedActions: number;
  uniqueAdmins: number;
  mostCommonActions: { action: AdminAction; count: number }[];
  activityByDay: { date: string; count: number }[];
  activityByAdmin: { adminId: string; adminEmail: string; count: number }[];
}

class AdminActivityLogger {
  private logs: AdminActivityLog[] = [];

  /**
   * Log an admin action
   */
  async logAction(log: Omit<AdminActivityLog, 'id' | 'timestamp'>): Promise<string> {
    const logEntry: AdminActivityLog = {
      ...log,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(logEntry);

    // TODO: Persist to database
    await this.persistToDatabase(logEntry);

    // Keep only last 10000 logs in memory
    if (this.logs.length > 10000) {
      this.logs = this.logs.slice(0, 10000);
    }

    return logEntry.id;
  }

  /**
   * Get activity logs with filtering
   */
  async getActivityLogs(filter: ActivityLogFilter = {}): Promise<AdminActivityLog[]> {
    let filtered = this.logs;

    // Apply filters
    if (filter.adminId) {
      filtered = filtered.filter(log => log.adminId === filter.adminId);
    }

    if (filter.action) {
      filtered = filtered.filter(log => log.action === filter.action);
    }

    if (filter.resource) {
      filtered = filtered.filter(log => log.resource === filter.resource);
    }

    if (filter.dateFrom) {
      const fromDate = new Date(filter.dateFrom);
      filtered = filtered.filter(log => new Date(log.timestamp) >= fromDate);
    }

    if (filter.dateTo) {
      const toDate = new Date(filter.dateTo);
      filtered = filtered.filter(log => new Date(log.timestamp) <= toDate);
    }

    if (filter.success !== undefined) {
      filtered = filtered.filter(log => log.success === filter.success);
    }

    // Apply pagination
    const offset = filter.offset || 0;
    const limit = filter.limit || 100;
    
    return filtered.slice(offset, offset + limit);
  }

  /**
   * Get activity statistics
   */
  async getActivityStats(dateFrom?: string, dateTo?: string): Promise<ActivityLogStats> {
    let logs = this.logs;

    // Apply date filters
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      logs = logs.filter(log => new Date(log.timestamp) >= fromDate);
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      logs = logs.filter(log => new Date(log.timestamp) <= toDate);
    }

    const totalActions = logs.length;
    const successfulActions = logs.filter(log => log.success).length;
    const failedActions = totalActions - successfulActions;
    const uniqueAdmins = new Set(logs.map(log => log.adminId)).size;

    // Most common actions
    const actionCounts = logs.reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<AdminAction, number>);

    const mostCommonActions = Object.entries(actionCounts)
      .map(([action, count]) => ({ action: action as AdminAction, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Activity by day
    const dayGroups = logs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const activityByDay = Object.entries(dayGroups)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Activity by admin
    const adminGroups = logs.reduce((acc, log) => {
      const key = log.adminId;
      if (!acc[key]) {
        acc[key] = { adminId: log.adminId, adminEmail: log.adminEmail, count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {} as Record<string, { adminId: string; adminEmail: string; count: number }>);

    const activityByAdmin = Object.values(adminGroups)
      .sort((a, b) => b.count - a.count);

    return {
      totalActions,
      successfulActions,
      failedActions,
      uniqueAdmins,
      mostCommonActions,
      activityByDay,
      activityByAdmin,
    };
  }

  /**
   * Export activity logs
   */
  async exportLogs(filter: ActivityLogFilter = {}): Promise<string> {
    const logs = await this.getActivityLogs(filter);
    
    const csvHeader = [
      'Timestamp',
      'Admin ID',
      'Admin Email',
      'Action',
      'Resource',
      'Resource ID',
      'Success',
      'IP Address',
      'User Agent',
      'Details',
      'Error Message'
    ].join(',');

    const csvRows = logs.map(log => [
      log.timestamp,
      log.adminId,
      log.adminEmail,
      log.action,
      log.resource || '',
      log.resourceId || '',
      log.success.toString(),
      log.ipAddress || '',
      log.userAgent || '',
      JSON.stringify(log.details || {}),
      log.errorMessage || ''
    ].map(field => `"${field}"`).join(','));

    return [csvHeader, ...csvRows].join('\n');
  }

  /**
   * Clean up old logs
   */
  async cleanupOldLogs(daysOld: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const initialCount = this.logs.length;
    this.logs = this.logs.filter(log => 
      new Date(log.timestamp) > cutoffDate
    );

    // TODO: Also cleanup from database
    await this.cleanupFromDatabase(cutoffDate);

    return initialCount - this.logs.length;
  }

  /**
   * Get recent activity for dashboard
   */
  async getRecentActivity(limit: number = 20): Promise<AdminActivityLog[]> {
    return this.logs.slice(0, limit);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Persist log to database
   */
  private async persistToDatabase(log: AdminActivityLog): Promise<void> {
    try {
      await dbAdmin.collection('adminActivityLogs').doc(log.id).set(log);
    } catch (error) {
      logger.error('Failed to persist activity log:', error);
    }
  }

  /**
   * Cleanup old logs from database
   */
  private async cleanupFromDatabase(cutoffDate: Date): Promise<void> {
    try {
      const oldLogs = await dbAdmin
        .collection('adminActivityLogs')
        .where('timestamp', '<', cutoffDate.toISOString())
        .get();

      const batch = dbAdmin.batch();
      oldLogs.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      // Cleaned up ${oldLogs.docs.length} old activity logs
    } catch (error) {
      logger.error('Failed to cleanup old logs from database:', error);
    }
  }
}

// Singleton instance
export const adminActivityLogger = new AdminActivityLogger();

// Convenience functions for common actions
export const logAdminLogin = (adminId: string, adminEmail: string, ipAddress?: string, userAgent?: string) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action: 'login',
    success: true,
    ipAddress,
    userAgent,
  });
};

export const logAdminLogout = (adminId: string, adminEmail: string, duration?: number) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action: 'logout',
    success: true,
    duration,
  });
};

export const logUserAction = (
  adminId: string,
  adminEmail: string,
  action: AdminAction,
  userId: string,
  details?: Record<string, unknown>
) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action,
    resource: 'user',
    resourceId: userId,
    details,
    success: true,
  });
};

export const logSpaceAction = (
  adminId: string,
  adminEmail: string,
  action: AdminAction,
  spaceId: string,
  details?: Record<string, unknown>
) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action,
    resource: 'space',
    resourceId: spaceId,
    details,
    success: true,
  });
};

export const logContentAction = (
  adminId: string,
  adminEmail: string,
  action: AdminAction,
  contentId: string,
  details?: Record<string, unknown>
) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action,
    resource: 'content',
    resourceId: contentId,
    details,
    success: true,
  });
};

export const logSystemAction = (
  adminId: string,
  adminEmail: string,
  action: AdminAction,
  details?: Record<string, unknown>
) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action,
    resource: 'system',
    details,
    success: true,
  });
};

export const logFailedAction = (
  adminId: string,
  adminEmail: string,
  action: AdminAction,
  errorMessage: string,
  details?: Record<string, unknown>
) => {
  return adminActivityLogger.logAction({
    adminId,
    adminEmail,
    action,
    success: false,
    errorMessage,
    details,
  });
};