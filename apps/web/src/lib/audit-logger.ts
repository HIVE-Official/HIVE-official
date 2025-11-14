/**
 * Persistent Audit Logging System
 * Tracks all admin and security-sensitive operations in Firestore
 */

import { dbAdmin } from './firebase-admin';
import type { NextRequest } from 'next/server';
import type { Timestamp } from 'firebase-admin/firestore';

export enum AuditEvent {
  // Authentication Events
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // Admin Events
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  ADMIN_ACCESS_DENIED = 'ADMIN_ACCESS_DENIED',
  ADMIN_ACTION = 'ADMIN_ACTION',
  FEATURE_FLAG_CHANGED = 'FEATURE_FLAG_CHANGED',

  // Security Events
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  CSRF_VALIDATION_FAILED = 'CSRF_VALIDATION_FAILED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  INVALID_SESSION = 'INVALID_SESSION',

  // Data Events
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  SPACE_CREATED = 'SPACE_CREATED',
  SPACE_UPDATED = 'SPACE_UPDATED',
  SPACE_DELETED = 'SPACE_DELETED',

  // System Events
  API_ERROR = 'API_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  DEPLOYMENT = 'DEPLOYMENT',
}

export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

interface AuditLogEntry {
  id: string;
  timestamp: Timestamp;
  event: AuditEvent;
  severity: AuditSeverity;
  userId?: string;
  userEmail?: string;
  ip: string;
  userAgent?: string;
  path?: string;
  method?: string;
  campusId?: string;
  metadata?: Record<string, any>;
  success: boolean;
  errorMessage?: string;

  // Security tracking
  sessionId?: string;
  isAdmin?: boolean;
  csrfToken?: string;

  // Performance tracking
  duration?: number;

  // Compliance fields
  dataAccessed?: string[];
  dataModified?: string[];
}

class AuditLogger {
  private static instance: AuditLogger;
  private buffer: AuditLogEntry[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private readonly BUFFER_SIZE = 10;
  private readonly FLUSH_INTERVAL = 5000; // 5 seconds

  private constructor() {
    // Set up periodic flush only in non-serverless environments
    // Vercel and AWS Lambda are stateless, so setInterval doesn't work properly
    if (typeof process !== 'undefined' &&
        process.versions &&
        process.versions.node &&
        !process.env.VERCEL &&
        !process.env.AWS_LAMBDA_FUNCTION_NAME) {
      this.flushInterval = setInterval(() => {
        this.flush().catch(console.error);
      }, this.FLUSH_INTERVAL);

      if (this.flushInterval) {
        this.flushInterval.unref();
      }

      // Flush on process exit
      process.on('beforeExit', () => {
        this.flush().catch(console.error);
      });
    }
    // In serverless environments, we rely on buffer size triggers and manual flush
  }

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  async log(
    event: AuditEvent,
    request: NextRequest | null,
    options: {
      userId?: string;
      userEmail?: string;
      severity?: AuditSeverity;
      success?: boolean;
      metadata?: Record<string, any>;
      error?: Error | string;
      sessionId?: string;
      isAdmin?: boolean;
      duration?: number;
      dataAccessed?: string[];
      dataModified?: string[];
    } = {}
  ): Promise<void> {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date() as unknown as Timestamp,
      event,
      severity: options.severity || this.getSeverityForEvent(event),
      userId: options.userId,
      userEmail: options.userEmail,
      ip: this.extractIP(request),
      userAgent: request?.headers.get('user-agent') || undefined,
      path: request?.nextUrl.pathname,
      method: request?.method,
      campusId: request?.headers.get('X-Campus-Id') || 'unknown',
      metadata: options.metadata,
      success: options.success !== false,
      errorMessage: options.error ?
        (typeof options.error === 'string' ? options.error : options.error.message) :
        undefined,
      sessionId: options.sessionId || request?.headers.get('X-Session-Id') || undefined,
      isAdmin: options.isAdmin,
      csrfToken: request?.headers.get('X-CSRF-Token') || undefined,
      duration: options.duration,
      dataAccessed: options.dataAccessed,
      dataModified: options.dataModified,
    };

    // Add to buffer
    this.buffer.push(entry);

    // Flush if buffer is full or for critical events
    if (this.buffer.length >= this.BUFFER_SIZE ||
        entry.severity === AuditSeverity.CRITICAL) {
      await this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const entriesToFlush = [...this.buffer];
    this.buffer = [];

    try {
      const batch = dbAdmin.batch();
      const auditCollection = dbAdmin.collection('audit_logs');

      for (const entry of entriesToFlush) {
        const docRef = auditCollection.doc(entry.id);
        batch.set(docRef, entry);
      }

      await batch.commit();
      console.info(`[AUDIT] Flushed ${entriesToFlush.length} audit log entries`);
    } catch (error) {
      console.error('[AUDIT] Failed to flush audit logs:', error);
      // Re-add entries to buffer on failure (with limit to prevent memory issues)
      if (this.buffer.length < this.BUFFER_SIZE * 2) {
        this.buffer.unshift(...entriesToFlush);
      }
    }
  }

  private extractIP(request: NextRequest | null): string {
    if (!request) return 'unknown';

    return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
           request.headers.get('x-real-ip') ||
           request.headers.get('cf-connecting-ip') || // Cloudflare
           request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() || // Vercel
           'unknown';
  }

  private getSeverityForEvent(event: AuditEvent): AuditSeverity {
    switch (event) {
      case AuditEvent.LOGIN_SUCCESS:
      case AuditEvent.LOGOUT:
      case AuditEvent.ADMIN_ACCESS:
        return AuditSeverity.INFO;

      case AuditEvent.LOGIN_FAILED:
      case AuditEvent.SESSION_EXPIRED:
      case AuditEvent.RATE_LIMIT_EXCEEDED:
        return AuditSeverity.WARNING;

      case AuditEvent.ADMIN_ACCESS_DENIED:
      case AuditEvent.CSRF_VALIDATION_FAILED:
      case AuditEvent.INVALID_SESSION:
      case AuditEvent.API_ERROR:
        return AuditSeverity.ERROR;

      case AuditEvent.SUSPICIOUS_ACTIVITY:
      case AuditEvent.SYSTEM_ERROR:
      case AuditEvent.USER_DELETED:
        return AuditSeverity.CRITICAL;

      default:
        return AuditSeverity.INFO;
    }
  }

  // Cleanup method for testing
  async stop(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    await this.flush();
  }
}

// Export singleton instance
export const auditLogger = AuditLogger.getInstance();

// Convenience functions for common audit events
export async function auditLogin(
  request: NextRequest,
  userId: string,
  email: string,
  success: boolean
): Promise<void> {
  await auditLogger.log(
    success ? AuditEvent.LOGIN_SUCCESS : AuditEvent.LOGIN_FAILED,
    request,
    {
      userId: success ? userId : undefined,
      userEmail: email,
      success,
      severity: success ? AuditSeverity.INFO : AuditSeverity.WARNING,
    }
  );
}

export async function auditAdminAccess(
  request: NextRequest,
  userId: string,
  email: string,
  allowed: boolean,
  action?: string
): Promise<void> {
  await auditLogger.log(
    allowed ? AuditEvent.ADMIN_ACCESS : AuditEvent.ADMIN_ACCESS_DENIED,
    request,
    {
      userId,
      userEmail: email,
      isAdmin: allowed,
      success: allowed,
      metadata: action ? { action } : undefined,
      severity: allowed ? AuditSeverity.INFO : AuditSeverity.ERROR,
    }
  );
}

export async function auditSecurityEvent(
  request: NextRequest,
  event: AuditEvent,
  details: string,
  userId?: string
): Promise<void> {
  await auditLogger.log(event, request, {
    userId,
    success: false,
    metadata: { details },
    severity: AuditSeverity.CRITICAL,
  });
}

// Query functions for retrieving audit logs
export async function getAuditLogs(
  filters: {
    userId?: string;
    event?: AuditEvent;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  } = {}
): Promise<AuditLogEntry[]> {
  let query = dbAdmin.collection('audit_logs')
    .orderBy('timestamp', 'desc');

  if (filters.userId) {
    query = query.where('userId', '==', filters.userId);
  }

  if (filters.event) {
    query = query.where('event', '==', filters.event);
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

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => doc.data() as AuditLogEntry);
}