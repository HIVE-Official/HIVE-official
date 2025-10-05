/**
 * Production-ready error reporting service for HIVE platform
 * Integrates with Firebase and external monitoring services
 * Provides secure error logging without exposing sensitive data
 */

import { logger } from './logger';

export interface ErrorReport {
  errorId: string;
  message: string;
  stack?: string;
  componentStack?: string;
  context: string;
  retryCount: number;
  userAgent?: string;
  url?: string;
  timestamp: string;
  buildVersion?: string;
  environment: string;
  userId?: string;
  sessionId?: string;
  // Additional HIVE-specific context
  spaceId?: string;
  toolId?: string;
  ritualId?: string;
  campusId?: string;
}

export interface ErrorMetrics {
  totalErrors: number;
  errorsByContext: Record<string, number>;
  errorsByType: Record<string, number>;
  recoveryRate: number;
  avgTimeToRecovery: number;
}

class ErrorReportingService {
  private isProduction = process.env.NODE_ENV === 'production';
  private apiEndpoint = '/api/errors/report';
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Report error to Firebase and external monitoring services
   * Sanitizes sensitive data before transmission
   */
  async reportError(errorReport: Partial<ErrorReport>): Promise<boolean> {
    try {
      const sanitizedReport = this.sanitizeErrorReport({
        ...errorReport,
        sessionId: this.sessionId,
        environment: process.env.NODE_ENV || 'unknown',
        buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
        timestamp: new Date().toISOString()
      } as ErrorReport);

      // Log locally first
      logger.error('Error reported via ErrorReportingService', {
        errorId: sanitizedReport.errorId,
        context: sanitizedReport.context,
        message: sanitizedReport.message,
        retryCount: sanitizedReport.retryCount
      });

      // Send to Firebase Analytics if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: `${sanitizedReport.context}: ${sanitizedReport.message}`,
          fatal: true,
          error_id: sanitizedReport.errorId,
          error_context: sanitizedReport.context,
          retry_count: sanitizedReport.retryCount
        });
      }

      // Send to error reporting API
      if (this.isProduction) {
        await this.sendToAPI(sanitizedReport);
      }

      return true;
    } catch (reportingError) {
      // Don't let error reporting crash the app
      logger.error('Failed to report error', {
        originalError: errorReport.errorId,
        reportingError: reportingError instanceof Error ? reportingError.message : 'Unknown'
      });
      return false;
    }
  }

  /**
   * Send error report to API endpoint
   */
  private async sendToAPI(errorReport: ErrorReport): Promise<void> {
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport)
    });

    if (!response.ok) {
      throw new Error(`Error reporting API failed: ${response.status}`);
    }
  }

  /**
   * Sanitize error report to remove sensitive data
   */
  private sanitizeErrorReport(report: ErrorReport): ErrorReport {
    const sanitized = { ...report };

    // Remove sensitive data from stack traces
    if (sanitized.stack) {
      sanitized.stack = this.sanitizeStackTrace(sanitized.stack);
    }

    // Remove sensitive data from URLs
    if (sanitized.url) {
      sanitized.url = this.sanitizeUrl(sanitized.url);
    }

    // Truncate message if too long
    if (sanitized.message && sanitized.message.length > 1000) {
      sanitized.message = sanitized.message.substring(0, 1000) + '... (truncated)';
    }

    return sanitized;
  }

  /**
   * Remove sensitive data from stack traces
   */
  private sanitizeStackTrace(stack: string): string {
    return stack
      .replace(/\/Users\/[^/]+/g, '/Users/[USER]') // Remove usernames
      .replace(/\/home\/[^/]+/g, '/home/[USER]')   // Remove usernames
      .replace(/access_token=[^&\s]+/g, 'access_token=[REDACTED]') // Remove tokens
      .replace(/password=[^&\s]+/g, 'password=[REDACTED]') // Remove passwords
      .replace(/apikey=[^&\s]+/g, 'apikey=[REDACTED]'); // Remove API keys
  }

  /**
   * Remove sensitive data from URLs
   */
  private sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      // Remove sensitive query parameters
      urlObj.searchParams.delete('token');
      urlObj.searchParams.delete('password');
      urlObj.searchParams.delete('access_token');
      urlObj.searchParams.delete('api_key');
      return urlObj.toString();
    } catch {
      // If URL parsing fails, just return the original with basic sanitization
      return url.replace(/[?&](token|password|access_token|api_key)=[^&]*/g, '');
    }
  }

  /**
   * Report error recovery for behavioral metrics
   */
  async reportRecovery(errorId: string, recoveryTimeMs: number): Promise<void> {
    try {
      logger.info('Error recovery reported', {
        errorId,
        recoveryTimeMs,
        recoveryTimeSeconds: recoveryTimeMs / 1000
      });

      // Send recovery metrics to analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'error_recovery', {
          error_id: errorId,
          recovery_time_ms: recoveryTimeMs,
          recovery_time_seconds: recoveryTimeMs / 1000
        });
      }
    } catch (error) {
      logger.error('Failed to report recovery', { errorId, error: error instanceof Error ? error.message : String(error) });
    }
  }

  /**
   * Get error metrics for monitoring dashboard
   */
  async getErrorMetrics(timeRange: '1h' | '24h' | '7d' = '24h'): Promise<ErrorMetrics | null> {
    try {
      const response = await fetch(`/api/errors/metrics?range=${timeRange}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      logger.error('Failed to fetch error metrics', { error: error instanceof Error ? error.message : String(error) });
      return null;
    }
  }

  /**
   * Test error reporting system
   */
  async testErrorReporting(): Promise<boolean> {
    const testReport: Partial<ErrorReport> = {
      errorId: `test_${Date.now()}`,
      message: 'Test error report',
      context: 'error_reporting_test',
      retryCount: 0
    };

    return await this.reportError(testReport);
  }
}

// Export singleton instance
export const errorReporting = new ErrorReportingService();

// Convenience function for quick error reporting
export async function reportError(
  error: any,
  context: string,
  additionalData?: Partial<ErrorReport>
): Promise<boolean> {
  return errorReporting.reportError({
    errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    message: error.message,
    stack: error.stack,
    context,
    retryCount: 0,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    ...additionalData
  });
}

// Export types for use elsewhere
export type { ErrorReport, ErrorMetrics };
