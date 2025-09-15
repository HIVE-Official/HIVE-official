/**
 * Error Monitoring Service
 * 
 * Comprehensive error tracking and monitoring for the HIVE platform.
 * Captures, categorizes, and reports errors with context for debugging.
 * In production, this would integrate with services like Sentry or Rollbar.
 */

import { logger } from './utils/structured-logger';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Error categories
 */
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  NETWORK = 'network',
  DATABASE = 'database',
  EXTERNAL_SERVICE = 'external_service',
  BUSINESS_LOGIC = 'business_logic',
  SYSTEM = 'system',
  UNKNOWN = 'unknown'
}

/**
 * Error context interface
 */
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  url?: string;
  method?: string;
  userAgent?: string;
  ip?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

/**
 * Monitored error interface
 */
export interface MonitoredError {
  id: string;
  timestamp: Date;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  context: ErrorContext;
  fingerprint: string;
  occurrences: number;
  resolved: boolean;
  tags?: string[];
}

/**
 * Error monitoring configuration
 */
interface ErrorMonitoringConfig {
  enabled: boolean;
  environment: string;
  release?: string;
  sampleRate: number;
  captureUnhandledRejections: boolean;
  ignoreErrors: string[];
  beforeSend?: (error: MonitoredError) => MonitoredError | null;
}

/**
 * Error Monitoring Service Class
 */
class ErrorMonitoringService {
  private config: ErrorMonitoringConfig;
  private errorBuffer: MonitoredError[] = [];
  private errorCounts: Map<string, number> = new Map();
  private readonly maxBufferSize = 100;
  private initialized = false;

  constructor() {
    this.config = {
      enabled: process.env.NODE_ENV === 'production',
      environment: process.env.NODE_ENV || 'development',
      release: process.env.NEXT_PUBLIC_APP_VERSION,
      sampleRate: 1.0,
      captureUnhandledRejections: true,
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
        'Network request failed'
      ]
    };
  }

  /**
   * Initialize error monitoring
   */
  initialize(customConfig?: Partial<ErrorMonitoringConfig>): void {
    if (this.initialized) return;

    // Merge custom config
    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }

    // Set up global error handlers
    if (typeof window !== 'undefined') {
      this.setupBrowserHandlers();
    } else {
      this.setupServerHandlers();
    }

    this.initialized = true;
    logger.info('Error monitoring initialized', {
      environment: this.config.environment,
      enabled: this.config.enabled
    });
  }

  /**
   * Set up browser error handlers
   */
  private setupBrowserHandlers(): void {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        component: 'window',
        url: event.filename,
        metadata: {
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Handle unhandled promise rejections
    if (this.config.captureUnhandledRejections) {
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError(
          new Error(`Unhandled Promise Rejection: ${event.reason}`),
          {
            component: 'promise',
            metadata: { reason: event.reason }
          }
        );
      });
    }
  }

  /**
   * Set up server error handlers
   */
  private setupServerHandlers(): void {
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      this.captureError(error, {
        component: 'process',
        severity: ErrorSeverity.CRITICAL
      });
    });

    // Handle unhandled promise rejections
    if (this.config.captureUnhandledRejections) {
      process.on('unhandledRejection', (reason, promise) => {
        this.captureError(
          new Error(`Unhandled Promise Rejection: ${reason}`),
          {
            component: 'promise',
            metadata: { promise: promise.toString() }
          }
        );
      });
    }
  }

  /**
   * Capture an error
   */
  captureError(
    error: Error | string,
    context?: Partial<ErrorContext> & { 
      severity?: ErrorSeverity; 
      category?: ErrorCategory;
      tags?: string[];
    }
  ): string {
    // Convert string errors to Error objects
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    // Check if error should be ignored
    if (this.shouldIgnoreError(errorObj)) {
      return '';
    }

    // Apply sampling
    if (Math.random() > this.config.sampleRate) {
      return '';
    }

    // Create monitored error
    const monitoredError = this.createMonitoredError(errorObj, context);
    
    // Apply beforeSend hook
    const processedError = this.config.beforeSend 
      ? this.config.beforeSend(monitoredError)
      : monitoredError;
    
    if (!processedError) {
      return '';
    }

    // Store error
    this.storeError(processedError);
    
    // Log error
    this.logError(processedError);
    
    // Send to external service in production
    if (this.config.enabled) {
      this.sendToExternalService(processedError);
    }

    return processedError.id;
  }

  /**
   * Capture a message
   */
  captureMessage(
    message: string,
    severity: ErrorSeverity = ErrorSeverity.INFO,
    context?: ErrorContext
  ): void {
    const error = new Error(message);
    this.captureError(error, { ...context, severity });
  }

  /**
   * Create a monitored error object
   */
  private createMonitoredError(
    error: Error,
    context?: Partial<ErrorContext> & {
      severity?: ErrorSeverity;
      category?: ErrorCategory;
      tags?: string[];
    }
  ): MonitoredError {
    const fingerprint = this.generateFingerprint(error);
    const occurrences = (this.errorCounts.get(fingerprint) || 0) + 1;
    this.errorCounts.set(fingerprint, occurrences);

    return {
      id: this.generateErrorId(),
      timestamp: new Date(),
      message: error.message,
      stack: error.stack,
      severity: context?.severity || this.categorizeErrorSeverity(error),
      category: context?.category || this.categorizeError(error),
      context: this.enrichContext(context || {}),
      fingerprint,
      occurrences,
      resolved: false,
      tags: context?.tags
    };
  }

  /**
   * Generate error fingerprint for deduplication
   */
  private generateFingerprint(error: Error): string {
    const key = `${error.name}-${error.message}`;
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Categorize error severity
   */
  private categorizeErrorSeverity(error: Error): ErrorSeverity {
    const message = error.message.toLowerCase();
    
    if (message.includes('critical') || message.includes('fatal')) {
      return ErrorSeverity.CRITICAL;
    }
    if (message.includes('error') || error.name === 'Error') {
      return ErrorSeverity.ERROR;
    }
    if (message.includes('warning') || message.includes('warn')) {
      return ErrorSeverity.WARNING;
    }
    return ErrorSeverity.INFO;
  }

  /**
   * Categorize error type
   */
  private categorizeError(error: Error): ErrorCategory {
    const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();
    
    if (message.includes('auth') || name.includes('auth')) {
      return message.includes('unauthorized') || message.includes('403')
        ? ErrorCategory.AUTHORIZATION
        : ErrorCategory.AUTHENTICATION;
    }
    if (message.includes('validation') || name.includes('validation')) {
      return ErrorCategory.VALIDATION;
    }
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorCategory.NETWORK;
    }
    if (message.includes('database') || message.includes('firestore')) {
      return ErrorCategory.DATABASE;
    }
    if (name.includes('system') || name.includes('internal')) {
      return ErrorCategory.SYSTEM;
    }
    
    return ErrorCategory.UNKNOWN;
  }

  /**
   * Enrich error context
   */
  private enrichContext(context: Partial<ErrorContext>): ErrorContext {
    const enriched: ErrorContext = { ...context };
    
    if (typeof window !== 'undefined') {
      enriched.url = enriched.url || window.location.href;
      enriched.userAgent = enriched.userAgent || navigator.userAgent;
    }
    
    return enriched;
  }

  /**
   * Check if error should be ignored
   */
  private shouldIgnoreError(error: Error): boolean {
    return this.config.ignoreErrors.some(pattern => 
      error.message.includes(pattern) || error.name.includes(pattern)
    );
  }

  /**
   * Store error in buffer
   */
  private storeError(error: MonitoredError): void {
    this.errorBuffer.push(error);
    
    // Maintain buffer size
    if (this.errorBuffer.length > this.maxBufferSize) {
      this.errorBuffer.shift();
    }
  }

  /**
   * Log error using structured logger
   */
  private logError(error: MonitoredError): void {
    const logLevel = error.severity === ErrorSeverity.CRITICAL ? 'error' : 'warn';
    logger[logLevel](`[${error.category}] ${error.message}`, {
      errorId: error.id,
      severity: error.severity,
      fingerprint: error.fingerprint,
      occurrences: error.occurrences,
      context: error.context
    });
  }

  /**
   * Send error to external monitoring service
   */
  private async sendToExternalService(error: MonitoredError): Promise<void> {
    // In production, this would send to Sentry, Rollbar, etc.
    // For now, we'll just store in localStorage for debugging
    try {
      if (typeof window !== 'undefined') {
        const errors = JSON.parse(localStorage.getItem('hive_error_monitoring') || '[]');
        errors.push({
          ...error,
          timestamp: error.timestamp.toISOString()
        });
        
        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('hive_error_monitoring', JSON.stringify(errors));
      }
    } catch (e) {
      // Fail silently
      console.error('Failed to store error for monitoring:', e);
    }
  }

  /**
   * Get error statistics
   */
  getStatistics(): {
    totalErrors: number;
    uniqueErrors: number;
    errorsByCategory: Record<ErrorCategory, number>;
    errorsBySeverity: Record<ErrorSeverity, number>;
    topErrors: Array<{ fingerprint: string; count: number; message: string }>;
  } {
    const errorsByCategory: Record<string, number> = {};
    const errorsBySeverity: Record<string, number> = {};
    const topErrors: Array<{ fingerprint: string; count: number; message: string }> = [];

    this.errorBuffer.forEach(error => {
      errorsByCategory[error.category] = (errorsByCategory[error.category] || 0) + 1;
      errorsBySeverity[error.severity] = (errorsBySeverity[error.severity] || 0) + 1;
    });

    // Get top 5 errors
    const sortedErrors = Array.from(this.errorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    sortedErrors.forEach(([fingerprint, count]) => {
      const error = this.errorBuffer.find(e => e.fingerprint === fingerprint);
      if (error) {
        topErrors.push({
          fingerprint,
          count,
          message: error.message
        });
      }
    });

    return {
      totalErrors: this.errorBuffer.length,
      uniqueErrors: this.errorCounts.size,
      errorsByCategory: errorsByCategory as Record<ErrorCategory, number>,
      errorsBySeverity: errorsBySeverity as Record<ErrorSeverity, number>,
      topErrors
    };
  }

  /**
   * Clear error buffer
   */
  clearBuffer(): void {
    this.errorBuffer = [];
    this.errorCounts.clear();
  }

  /**
   * Get recent errors
   */
  getRecentErrors(limit: number = 10): MonitoredError[] {
    return this.errorBuffer.slice(-limit);
  }
}

// Create and export singleton instance
export const errorMonitoring = new ErrorMonitoringService();

// Initialize on import
if (typeof window !== 'undefined' || typeof process !== 'undefined') {
  errorMonitoring.initialize();
}

// Export types
export type { MonitoredError, ErrorContext, ErrorMonitoringConfig };

// Convenience exports
export const captureError = (error: Error, context?: ErrorContext) => 
  errorMonitoring.captureError(error, context);

export { ErrorSeverity as LogLevel };