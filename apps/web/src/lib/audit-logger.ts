import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextRequest } from 'next/server';

/**
 * HIVE Audit Logger
 * Secure audit logging to Firestore for security and compliance
 */

export enum AuditEventType {
  // Authentication events
  AUTH_LOGIN_ATTEMPT = 'AUTH_LOGIN_ATTEMPT',
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_MAGIC_LINK_SENT = 'AUTH_MAGIC_LINK_SENT',
  AUTH_MAGIC_LINK_VERIFIED = 'AUTH_MAGIC_LINK_VERIFIED',
  AUTH_MAGIC_LINK_FAILED = 'AUTH_MAGIC_LINK_FAILED',
  AUTH_TOKEN_REFRESH = 'AUTH_TOKEN_REFRESH',
  
  // Onboarding events
  ONBOARDING_STARTED = 'ONBOARDING_STARTED',
  ONBOARDING_COMPLETED = 'ONBOARDING_COMPLETED',
  ONBOARDING_FAILED = 'ONBOARDING_FAILED',
  ONBOARDING_DRAFT_SAVED = 'ONBOARDING_DRAFT_SAVED',
  
  // Security events
  SECURITY_CSRF_VIOLATION = 'SECURITY_CSRF_VIOLATION',
  SECURITY_RATE_LIMIT_EXCEEDED = 'SECURITY_RATE_LIMIT_EXCEEDED',
  SECURITY_INVALID_TOKEN = 'SECURITY_INVALID_TOKEN',
  SECURITY_UNAUTHORIZED_ACCESS = 'SECURITY_UNAUTHORIZED_ACCESS',
  SECURITY_SUSPICIOUS_ACTIVITY = 'SECURITY_SUSPICIOUS_ACTIVITY',
  
  // User actions
  USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED',
  USER_JOINED_SPACE = 'USER_JOINED_SPACE',
  USER_LEFT_SPACE = 'USER_LEFT_SPACE',
  USER_CREATED_TOOL = 'USER_CREATED_TOOL',
  USER_DELETED_TOOL = 'USER_DELETED_TOOL',
  
  // Admin actions
  ADMIN_USER_BANNED = 'ADMIN_USER_BANNED',
  ADMIN_USER_UNBANNED = 'ADMIN_USER_UNBANNED',
  ADMIN_SPACE_DELETED = 'ADMIN_SPACE_DELETED',
  ADMIN_CONTENT_MODERATED = 'ADMIN_CONTENT_MODERATED'
}

export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}

interface AuditLogEntry {
  id?: string;
  timestamp: FieldValue;
  eventType: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  origin?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  metadata?: Record<string, any>;
  error?: string;
  message: string;
  sessionId?: string;
  requestId?: string;
}

class AuditLogger {
  private static instance: AuditLogger;
  private readonly collectionName = 'auditLogs';
  private readonly batchSize = 100;
  private logQueue: AuditLogEntry[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    // Set up periodic flush every 5 seconds
    setInterval(() => this.flush(), 5000);
  }

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  /**
   * Extract client information from request
   */
  private extractClientInfo(request?: NextRequest): {
    ipAddress?: string;
    userAgent?: string;
    origin?: string;
    path?: string;
    method?: string;
  } {
    if (!request) return {};

    return {
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                 request.headers.get('x-real-ip') || 
                 undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      origin: request.headers.get('origin') || undefined,
      path: request.nextUrl?.pathname,
      method: request.method
    };
  }

  /**
   * Log an audit event
   */
  public async log(
    eventType: AuditEventType,
    severity: AuditSeverity,
    message: string,
    options: {
      userId?: string;
      userEmail?: string;
      request?: NextRequest;
      statusCode?: number;
      metadata?: Record<string, any>;
      error?: Error | string;
      sessionId?: string;
      requestId?: string;
    } = {}
  ): Promise<void> {
    try {
      const clientInfo = this.extractClientInfo(options.request);
      
      const entry: AuditLogEntry = {
        timestamp: FieldValue.serverTimestamp(),
        eventType,
        severity,
        message,
        userId: options.userId,
        userEmail: options.userEmail,
        ...clientInfo,
        statusCode: options.statusCode,
        metadata: options.metadata,
        error: options.error instanceof Error ? options.error.message : options.error,
        sessionId: options.sessionId,
        requestId: options.requestId || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      // Add to queue
      this.logQueue.push(entry);

      // Flush if queue is full
      if (this.logQueue.length >= this.batchSize) {
        await this.flush();
      }

      // For critical events, flush immediately
      if (severity === AuditSeverity.CRITICAL) {
        await this.flush();
      }
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }

  /**
   * Clean undefined values from object (Firestore doesn't accept undefined)
   */
  private cleanUndefinedValues(obj: any): any {
    if (obj === null || obj === undefined) return null;
    if (typeof obj !== 'object') return obj;
    if (obj instanceof Date) return obj;
    
    // Check if it's a FieldValue (serverTimestamp, etc)
    if (obj && typeof obj === 'object' && '_methodName' in obj) {
      return obj; // Return FieldValue objects as-is
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.cleanUndefinedValues(item));
    }
    
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = this.cleanUndefinedValues(value);
      }
    }
    return cleaned;
  }

  /**
   * Flush queued logs to Firestore
   */
  private async flush(): Promise<void> {
    if (this.logQueue.length === 0) return;

    const logsToFlush = [...this.logQueue];
    this.logQueue = [];

    try {
      const batch = dbAdmin.batch();
      
      for (const log of logsToFlush) {
        const docRef = dbAdmin.collection(this.collectionName).doc();
        // Clean undefined values before saving to Firestore
        const cleanedLog = this.cleanUndefinedValues({
          ...log,
          id: docRef.id
        });
        batch.set(docRef, cleanedLog);
      }

      await batch.commit();
      console.log(`✅ Flushed ${logsToFlush.length} audit logs to Firestore`);
    } catch (error) {
      console.error('Failed to flush audit logs:', error);
      // Re-queue failed logs
      this.logQueue.unshift(...logsToFlush);
    }
  }

  /**
   * Helper methods for common events
   */
  public async logAuthSuccess(
    userId: string,
    userEmail: string,
    request?: NextRequest,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log(
      AuditEventType.AUTH_LOGIN_SUCCESS,
      AuditSeverity.INFO,
      `User ${userEmail} successfully authenticated`,
      { userId, userEmail, request, metadata }
    );
  }

  public async logAuthFailure(
    email: string,
    reason: string,
    request?: NextRequest,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log(
      AuditEventType.AUTH_LOGIN_FAILED,
      AuditSeverity.WARNING,
      `Authentication failed for ${email}: ${reason}`,
      { userEmail: email, request, metadata }
    );
  }

  public async logSecurityEvent(
    eventType: AuditEventType,
    message: string,
    request?: NextRequest,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log(
      eventType,
      AuditSeverity.WARNING,
      message,
      { request, metadata }
    );
  }

  public async logCriticalError(
    message: string,
    error: Error,
    request?: NextRequest,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log(
      AuditEventType.SECURITY_SUSPICIOUS_ACTIVITY,
      AuditSeverity.CRITICAL,
      message,
      { request, error, metadata }
    );
  }

  /**
   * Query audit logs (for admin dashboard)
   */
  public async queryLogs(filters: {
    userId?: string;
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  } = {}): Promise<any[]> {
    try {
      let query = dbAdmin.collection(this.collectionName)
        .orderBy('timestamp', 'desc');

      if (filters.userId) {
        query = query.where('userId', '==', filters.userId);
      }

      if (filters.eventType) {
        query = query.where('eventType', '==', filters.eventType);
      }

      if (filters.severity) {
        query = query.where('severity', '==', filters.severity);
      }

      if (filters.startDate) {
        query = query.where('timestamp', '>=', filters.startDate);
      }

      if (filters.endDate) {
        query = query.where('timestamp', '<=', filters.endDate);
      }

      query = query.limit(filters.limit || 100);

      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Failed to query audit logs:', error);
      return [];
    }
  }

  /**
   * Clean up old audit logs (for compliance/storage management)
   */
  public async cleanupOldLogs(daysToKeep: number = 90): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const snapshot = await dbAdmin.collection(this.collectionName)
        .where('timestamp', '<', cutoffDate)
        .limit(500) // Process in batches
        .get();

      if (snapshot.empty) {
        console.log('No old audit logs to clean up');
        return;
      }

      const batch = dbAdmin.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log(`🧹 Cleaned up ${snapshot.size} old audit logs`);
    } catch (error) {
      console.error('Failed to cleanup old audit logs:', error);
    }
  }
}

// Export singleton instance
export const auditLogger = AuditLogger.getInstance();