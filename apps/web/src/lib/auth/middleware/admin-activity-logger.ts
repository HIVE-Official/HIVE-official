/**
 * Admin Activity Logger
 * 
 * Tracks and logs administrative actions for audit purposes.
 * Provides detailed logging of admin operations with proper
 * security and compliance features.
 */

import { db } from '../../firebase/client/firebase-client';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { logger } from '../../utils/structured-logger';

/**
 * Admin activity types
 */
export type AdminActivityType = 
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'user_suspended'
  | 'user_reactivated'
  | 'role_granted'
  | 'role_revoked'
  | 'space_created'
  | 'space_updated'
  | 'space_deleted'
  | 'space_approved'
  | 'space_rejected'
  | 'content_moderated'
  | 'content_deleted'
  | 'settings_changed'
  | 'export_data'
  | 'import_data'
  | 'bulk_operation'
  | 'system_config';

/**
 * Admin activity log entry
 */
export interface AdminActivityLog {
  id?: string;
  adminId: string;
  adminEmail: string;
  adminName?: string;
  action: AdminActivityType;
  targetType: 'user' | 'space' | 'content' | 'system' | 'other';
  targetId?: string;
  targetName?: string;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  result: 'success' | 'failure' | 'partial';
  errorMessage?: string;
  timestamp: Timestamp | ReturnType<typeof serverTimestamp>;
  duration?: number; // Operation duration in ms
}

/**
 * Activity log filter options
 */
export interface ActivityLogFilter {
  adminId?: string;
  action?: AdminActivityType;
  targetType?: string;
  targetId?: string;
  startDate?: Date;
  endDate?: Date;
  result?: 'success' | 'failure' | 'partial';
  limit?: number;
}

/**
 * Admin Activity Logger Class
 */
class AdminActivityLogger {
  private readonly collectionName = 'admin_activity_logs';
  private readonly maxBatchSize = 100;

  /**
   * Log an admin activity
   */
  async logActivity(activity: Omit<AdminActivityLog, 'id' | 'timestamp'>): Promise<string> {
    try {
      // Add timestamp and additional context
      const logEntry: Omit<AdminActivityLog, 'id'> = {
        ...activity,
        timestamp: serverTimestamp(),
        ipAddress: this.getIpAddress(),
        userAgent: this.getUserAgent()
      };

      // Log to Firestore
      const docRef = await addDoc(
        collection(db, this.collectionName),
        logEntry
      );

      // Also log to structured logger for immediate visibility
      logger.info(`Admin activity: ${activity.action}`, {
        adminId: activity.adminId,
        action: activity.action,
        targetType: activity.targetType,
        targetId: activity.targetId,
        result: activity.result
      });

      return docRef.id;
    } catch (error) {
      logger.error('Failed to log admin activity', error as Error, { activity });
      throw new Error('Failed to log admin activity');
    }
  }

  /**
   * Log multiple activities in batch
   */
  async logBatch(activities: Array<Omit<AdminActivityLog, 'id' | 'timestamp'>>): Promise<string[]> {
    const ids: string[] = [];
    
    // Process in chunks to respect Firestore limits
    for (let i = 0; i < activities.length; i += this.maxBatchSize) {
      const batch = activities.slice(i, i + this.maxBatchSize);
      const promises = batch.map(activity => this.logActivity(activity));
      const batchIds = await Promise.all(promises);
      ids.push(...batchIds);
    }
    
    return ids;
  }

  /**
   * Query activity logs with filters
   */
  async queryLogs(filter: ActivityLogFilter = {}): Promise<AdminActivityLog[]> {
    try {
      let q = query(collection(db, this.collectionName));

      // Apply filters
      if (filter.adminId) {
        q = query(q, where('adminId', '==', filter.adminId));
      }
      if (filter.action) {
        q = query(q, where('action', '==', filter.action));
      }
      if (filter.targetType) {
        q = query(q, where('targetType', '==', filter.targetType));
      }
      if (filter.targetId) {
        q = query(q, where('targetId', '==', filter.targetId));
      }
      if (filter.result) {
        q = query(q, where('result', '==', filter.result));
      }

      // Order by timestamp descending (most recent first)
      q = query(q, orderBy('timestamp', 'desc'));

      // Apply limit
      if (filter.limit) {
        q = query(q, limit(filter.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AdminActivityLog));
    } catch (error) {
      logger.error('Failed to query admin logs', error as Error, { filter });
      throw new Error('Failed to query activity logs');
    }
  }

  /**
   * Export logs for a date range
   */
  async exportLogs(startDate: Date, endDate: Date): Promise<AdminActivityLog[]> {
    try {
      const logs = await this.queryLogs({
        startDate,
        endDate
      });

      // Log the export action itself
      await this.logActivity({
        adminId: this.getCurrentAdminId(),
        adminEmail: this.getCurrentAdminEmail(),
        action: 'export_data',
        targetType: 'system',
        description: `Exported admin logs from ${startDate.toISOString()} to ${endDate.toISOString()}`,
        metadata: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          recordCount: logs.length
        },
        result: 'success'
      });

      return logs;
    } catch (error) {
      logger.error('Failed to export admin logs', error as Error);
      throw new Error('Failed to export logs');
    }
  }

  /**
   * Get admin activity summary
   */
  async getActivitySummary(adminId: string, days: number = 30): Promise<{
    totalActivities: number;
    successRate: number;
    activityBreakdown: Record<AdminActivityType, number>;
    recentActivities: AdminActivityLog[];
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await this.queryLogs({
      adminId,
      startDate
    });

    const breakdown: Record<string, number> = {};
    let successCount = 0;

    logs.forEach(log => {
      breakdown[log.action] = (breakdown[log.action] || 0) + 1;
      if (log.result === 'success') successCount++;
    });

    return {
      totalActivities: logs.length,
      successRate: logs.length > 0 ? (successCount / logs.length) * 100 : 0,
      activityBreakdown: breakdown as Record<AdminActivityType, number>,
      recentActivities: logs.slice(0, 10)
    };
  }

  /**
   * Helper: Get current admin ID (placeholder - implement based on auth system)
   */
  private getCurrentAdminId(): string {
    // This should be implemented based on your auth system
    // For now, returning a placeholder
    if (typeof window !== 'undefined' && (window as any).currentAdminId) {
      return (window as any).currentAdminId;
    }
    return 'system';
  }

  /**
   * Helper: Get current admin email
   */
  private getCurrentAdminEmail(): string {
    if (typeof window !== 'undefined' && (window as any).currentAdminEmail) {
      return (window as any).currentAdminEmail;
    }
    return 'system@hive.edu';
  }

  /**
   * Helper: Get client IP address (best effort)
   */
  private getIpAddress(): string | undefined {
    // In a real implementation, this would come from the server
    // or be passed from the API route
    return undefined;
  }

  /**
   * Helper: Get user agent
   */
  private getUserAgent(): string | undefined {
    if (typeof window !== 'undefined') {
      return navigator.userAgent;
    }
    return undefined;
  }
}

// Create and export singleton instance
export const adminActivityLogger = new AdminActivityLogger();

/**
 * Convenience function for logging admin actions
 */
export async function logAdminAction(
  action: AdminActivityType,
  targetType: AdminActivityLog['targetType'],
  description: string,
  metadata?: Record<string, any>,
  result: AdminActivityLog['result'] = 'success'
): Promise<string> {
  return adminActivityLogger.logActivity({
    adminId: 'current-admin', // This should be replaced with actual admin ID
    adminEmail: 'admin@hive.edu', // This should be replaced with actual admin email
    action,
    targetType,
    description,
    metadata,
    result
  });
}

/**
 * Decorator for automatically logging admin actions
 */
export function LogAdminAction(
  action: AdminActivityType,
  targetType: AdminActivityLog['targetType']
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      let result: AdminActivityLog['result'] = 'success';
      let errorMessage: string | undefined;
      let response: any;

      try {
        response = await originalMethod.apply(this, args);
        return response;
      } catch (error) {
        result = 'failure';
        errorMessage = error instanceof Error ? error.message : String(error);
        throw error;
      } finally {
        const duration = Date.now() - startTime;
        
        await logAdminAction(
          action,
          targetType,
          `${propertyKey} executed`,
          {
            method: propertyKey,
            args: args.length > 0 ? args : undefined,
            duration,
            errorMessage
          },
          result
        );
      }
    };

    return descriptor;
  };
}