/**
 * Audit Logger
 * 
 * Simple audit logging service that wraps the admin-activity-logger
 * and provides a streamlined interface for audit trail creation.
 * This is a facade pattern to simplify audit logging throughout the application.
 */

import { adminActivityLogger, logAdminAction } from '../auth/middleware/admin-activity-logger';
import type { AdminActivityType, AdminActivityLog } from '../auth/middleware/admin-activity-logger';

/**
 * Re-export types for convenience
 */
export type { AdminActivityType, AdminActivityLog } from '../auth/middleware/admin-activity-logger';

/**
 * Audit Event Types - Categories of events that can be audited
 */
export enum AuditEventType {
  // Authentication Events
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET = 'PASSWORD_RESET',
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  
  // User Management Events
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_SUSPENDED = 'USER_SUSPENDED',
  USER_ACTIVATED = 'USER_ACTIVATED',
  
  // Permission Events
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
  PERMISSION_REVOKED = 'PERMISSION_REVOKED',
  ROLE_ASSIGNED = 'ROLE_ASSIGNED',
  ROLE_REMOVED = 'ROLE_REMOVED',
  
  // Data Access Events
  DATA_ACCESSED = 'DATA_ACCESSED',
  DATA_CREATED = 'DATA_CREATED',
  DATA_UPDATED = 'DATA_UPDATED',
  DATA_DELETED = 'DATA_DELETED',
  DATA_EXPORTED = 'DATA_EXPORTED',
  
  // System Events
  SYSTEM_CONFIG_CHANGED = 'SYSTEM_CONFIG_CHANGED',
  SERVICE_STARTED = 'SERVICE_STARTED',
  SERVICE_STOPPED = 'SERVICE_STOPPED',
  BACKUP_CREATED = 'BACKUP_CREATED',
  BACKUP_RESTORED = 'BACKUP_RESTORED',
  
  // Security Events
  SECURITY_ALERT = 'SECURITY_ALERT',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  ACCESS_DENIED = 'ACCESS_DENIED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN'
}

/**
 * Audit Severity Levels
 */
export enum AuditSeverity {
  INFO = 'INFO',           // Informational events
  WARNING = 'WARNING',     // Warning conditions
  ERROR = 'ERROR',         // Error conditions
  CRITICAL = 'CRITICAL',   // Critical conditions requiring immediate attention
  ALERT = 'ALERT',         // Action must be taken immediately
  EMERGENCY = 'EMERGENCY'  // System is unusable
}

/**
 * Simplified audit log entry
 */
export interface AuditEntry {
  action: string;
  userId: string;
  targetId?: string;
  details?: Record<string, any>;
  success?: boolean;
}

/**
 * Audit Logger Class - Simplified interface for audit logging
 */
class AuditLogger {
  /**
   * Log a user action
   */
  async logUserAction(entry: AuditEntry): Promise<void> {
    await logAdminAction(
      entry.action as AdminActivityType,
      'user',
      `User ${entry.userId} performed ${entry.action}`,
      {
        ...entry.details,
        targetId: entry.targetId,
        success: entry.success !== false
      },
      entry.success === false ? 'failure' : 'success'
    );
  }

  /**
   * Log a system event
   */
  async logSystemEvent(
    event: string,
    details?: Record<string, any>
  ): Promise<void> {
    await logAdminAction(
      'system_config',
      'system',
      `System event: ${event}`,
      details,
      'success'
    );
  }

  /**
   * Log a security event
   */
  async logSecurityEvent(
    event: string,
    userId?: string,
    details?: Record<string, any>
  ): Promise<void> {
    await logAdminAction(
      'user_updated',
      'user',
      `Security event: ${event}`,
      {
        ...details,
        userId,
        securityEvent: true
      },
      'success'
    );
  }

  /**
   * Log data access
   */
  async logDataAccess(
    userId: string,
    resource: string,
    action: 'read' | 'write' | 'delete',
    details?: Record<string, any>
  ): Promise<void> {
    await logAdminAction(
      'export_data',
      'system',
      `Data access: ${action} on ${resource}`,
      {
        ...details,
        userId,
        resource,
        accessType: action
      },
      'success'
    );
  }

  /**
   * Log API access
   */
  async logApiAccess(
    endpoint: string,
    method: string,
    userId?: string,
    statusCode?: number
  ): Promise<void> {
    const success = !statusCode || (statusCode >= 200 && statusCode < 400);
    
    await logAdminAction(
      'system_config',
      'system',
      `API access: ${method} ${endpoint}`,
      {
        endpoint,
        method,
        userId,
        statusCode
      },
      success ? 'success' : 'failure'
    );
  }

  /**
   * Log configuration change
   */
  async logConfigChange(
    setting: string,
    oldValue: any,
    newValue: any,
    changedBy: string
  ): Promise<void> {
    await logAdminAction(
      'settings_changed',
      'system',
      `Configuration changed: ${setting}`,
      {
        setting,
        oldValue,
        newValue,
        changedBy
      },
      'success'
    );
  }

  /**
   * Query audit logs
   */
  async queryLogs(filter?: {
    userId?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<AdminActivityLog[]> {
    return adminActivityLogger.queryLogs({
      adminId: filter?.userId,
      action: filter?.action as AdminActivityType,
      startDate: filter?.startDate,
      endDate: filter?.endDate,
      limit: filter?.limit
    });
  }

  /**
   * Export audit logs for a date range
   */
  async exportLogs(
    startDate: Date,
    endDate: Date
  ): Promise<AdminActivityLog[]> {
    return adminActivityLogger.exportLogs(startDate, endDate);
  }
}

// Create and export singleton instance
export const auditLogger = new AuditLogger();

// Export convenience functions
export const logAudit = (entry: AuditEntry) => auditLogger.logUserAction(entry);
export const logSystem = (event: string, details?: Record<string, any>) => 
  auditLogger.logSystemEvent(event, details);
export const logSecurity = (event: string, userId?: string, details?: Record<string, any>) =>
  auditLogger.logSecurityEvent(event, userId, details);
export const logDataAccess = (
  userId: string,
  resource: string,
  action: 'read' | 'write' | 'delete',
  details?: Record<string, any>
) => auditLogger.logDataAccess(userId, resource, action, details);

// Export the underlying admin logger for advanced use cases
export { adminActivityLogger };