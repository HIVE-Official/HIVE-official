/**
 * Structured logging service for HIVE platform
 * Replaces console.log with proper logging levels and metadata
 */

import type { HiveUser, Space, Post, HiveEvent, AppError } from '@/types/global';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

export interface LogContext {
  userId?: string;
  campusId?: string;
  spaceId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  error?: Error | AppError;
  user?: Partial<HiveUser>;
  space?: Partial<Space>;
  post?: Partial<Post>;
  event?: Partial<HiveEvent>;
  // Statistics
  connectionCount?: number;
  friendCount?: number;
  detectCount?: number;
  // Allow additional properties for flexibility
  [key: string]: any;
}

class StructuredLogger {
  private static instance: StructuredLogger;
  private logLevel: LogLevel;
  private isDevelopment: boolean;
  private logs: Array<Record<string, unknown>> = [];

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO;
  }

  static getInstance(): StructuredLogger {
    if (!StructuredLogger.instance) {
      StructuredLogger.instance = new StructuredLogger();
    }
    return StructuredLogger.instance;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): Record<string, unknown> {
    return {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      ...context,
      environment: this.isDevelopment ? 'development' : 'production',
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private output(logObject: Record<string, unknown>): void {
    // In production, send to logging service
    if (!this.isDevelopment) {
      // TODO: Send to logging service (e.g., Sentry, LogRocket, etc.)
      this.sendToLoggingService(logObject);
    }

    // In development, output to console with color coding
    if (this.isDevelopment) {
      const level = String(logObject.level);
      const color = this.getConsoleColor(level);

       
      console.log(
        `%c[${level}]%c ${logObject.message}`,
        `color: ${color}; font-weight: bold`,
        'color: inherit',
        logObject
      );
    }

    // Store in memory for debugging (limited buffer)
    this.logs.push(logObject);
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  private getConsoleColor(level: string): string {
    switch (level) {
      case 'DEBUG': return '#888';
      case 'INFO': return '#2196F3';
      case 'WARN': return '#FF9800';
      case 'ERROR': return '#F44336';
      case 'CRITICAL': return '#D32F2F';
      default: return '#000';
    }
  }

  private sendToLoggingService(logObject: Record<string, unknown>): void {
    // Implementation would send to actual logging service
    // For now, this is a placeholder
    if (typeof window !== 'undefined' && window.navigator.sendBeacon) {
      // Use sendBeacon for reliability
      const blob = new Blob([JSON.stringify(logObject)], { type: 'application/json' });
      window.navigator.sendBeacon('/api/logs', blob);
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.output(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output(this.formatMessage(LogLevel.INFO, message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.output(this.formatMessage(LogLevel.WARN, message, context));
    }
  }

  error(message: string, error?: Error, context?: LogContext): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const errorContext = {
        ...context,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined,
      };
      this.output(this.formatMessage(LogLevel.ERROR, message, errorContext));
    }
  }

  critical(message: string, error?: Error, context?: LogContext): void {
    if (this.shouldLog(LogLevel.CRITICAL)) {
      const errorContext = {
        ...context,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined,
      };
      this.output(this.formatMessage(LogLevel.CRITICAL, message, errorContext));

      // Critical errors should also trigger alerts in production
      if (!this.isDevelopment) {
        this.triggerAlert(message, error);
      }
    }
  }

  private triggerAlert(message: string, error?: Error): void {
    // Would integrate with alerting service (PagerDuty, etc.)
    // Placeholder implementation
  }

  // Performance logging
  time(label: string): void {
    if (this.isDevelopment) {
       
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (this.isDevelopment) {
       
      console.timeEnd(label);
    }
  }

  // Analytics event logging
  logEvent(eventName: string, properties?: Record<string, unknown>): void {
    this.info(`Event: ${eventName}`, {
      action: eventName,
      metadata: properties,
    });
  }

  // API request logging
  logApiRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: string
  ): void {
    const level = statusCode >= 500 ? LogLevel.ERROR :
                  statusCode >= 400 ? LogLevel.WARN :
                  LogLevel.INFO;

    if (this.shouldLog(level)) {
      this.output(this.formatMessage(
        level,
        `API ${method} ${path} - ${statusCode}`,
        {
          userId,
          action: `api_${method.toLowerCase()}`,
          metadata: {
            path,
            statusCode,
            duration: `${duration}ms`,
          },
        }
      ));
    }
  }

  // Get recent logs for debugging
  getRecentLogs(count = 10): Array<Record<string, unknown>> {
    return this.logs.slice(-count);
  }

  // Clear logs (useful for testing)
  clearLogs(): void {
    this.logs = [];
  }

  // Set log level dynamically
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
}

// Export singleton instance
export const logger = StructuredLogger.getInstance();

// Export convenience functions
export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);

export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);

export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);

export const logError = (message: string, error?: Error, context?: LogContext) =>
  logger.error(message, error, context);

export const logCritical = (message: string, error?: Error, context?: LogContext) =>
  logger.critical(message, error, context);

export const logEvent = (eventName: string, properties?: Record<string, any>) =>
  logger.logEvent(eventName, properties);

export const logApiRequest = (
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  userId?: string
) => logger.logApiRequest(method, path, statusCode, duration, userId);

// Security event logging
export const logSecurityEvent = async (
  eventType: string,
  context?: LogContext & {
    severity?: 'low' | 'medium' | 'high' | 'critical';
    ipAddress?: string;
    userAgent?: string;
    endpoint?: string;
    operation?: string;
    requestId?: string;
    ip?: string;
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
) => {
  const message = context?.operation || eventType;
  const securityContext = {
    ...context,
    action: `security_${eventType}`,
    metadata: {
      ...context?.metadata,
      ...context?.tags,
      ...context?.extra,
      securityEvent: true,
      eventType,
      severity: context?.severity || 'medium',
    },
  };

  const level = context?.severity === 'critical' ? LogLevel.CRITICAL :
               context?.severity === 'high' ? LogLevel.ERROR :
               context?.severity === 'medium' ? LogLevel.WARN :
               LogLevel.INFO;

  if (level === LogLevel.CRITICAL) {
    logger.critical(`Security Event: ${message}`, undefined, securityContext);
  } else if (level === LogLevel.ERROR) {
    logger.error(`Security Event: ${message}`, undefined, securityContext);
  } else if (level === LogLevel.WARN) {
    logger.warn(`Security Event: ${message}`, securityContext);
  } else {
    logger.info(`Security Event: ${message}`, securityContext);
  }
};

// Create a request-specific logger
export const createRequestLogger = (requestId: string, userId?: string) => {
  return {
    log: (message: string, context?: LogContext) =>
      logger.info(message, { ...context, metadata: { ...context?.metadata, requestId }, userId }),
    error: (message: string, error?: Error, context?: LogContext) =>
      logger.error(message, error, { ...context, metadata: { ...context?.metadata, requestId }, userId }),
    warn: (message: string, context?: LogContext) =>
      logger.warn(message, { ...context, metadata: { ...context?.metadata, requestId }, userId }),
    debug: (message: string, context?: LogContext) =>
      logger.debug(message, { ...context, metadata: { ...context?.metadata, requestId }, userId }),
  };
};

// Log API calls with detailed metrics
export const logApiCall = async (
  method: string,
  endpoint: string,
  params: {
    requestId?: string;
    userId?: string;
    statusCode?: number;
    duration?: number;
    error?: Error;
    metadata?: Record<string, any>;
  }
) => {
  const { requestId, userId, statusCode = 200, duration = 0, error, metadata } = params;

  const context: LogContext = {
    userId,
    action: `api_${method.toLowerCase()}`,
    metadata: {
      endpoint,
      method,
      statusCode,
      duration: `${duration}ms`,
      requestId,
      ...metadata,
    },
  };

  if (error) {
    logger.error(`API Error: ${method} ${endpoint} - ${statusCode}`, error, context);
  } else if (statusCode >= 400) {
    logger.warn(`API Warning: ${method} ${endpoint} - ${statusCode}`, context);
  } else {
    logger.info(`API Call: ${method} ${endpoint} - ${statusCode}`, context);
  }
};

// Log performance metrics
export const logPerformance = async (
  operation: string,
  metrics: {
    duration: number;
    success: boolean;
    userId?: string;
    metadata?: Record<string, any>;
  }
) => {
  const { duration, success, userId, metadata } = metrics;

  const context: LogContext = {
    userId,
    action: `performance_${operation}`,
    metadata: {
      operation,
      duration: `${duration}ms`,
      success,
      ...metadata,
    },
  };

  const message = `Performance: ${operation} completed in ${duration}ms`;

  if (!success) {
    logger.warn(`${message} (failed)`, context);
  } else if (duration > 5000) {
    logger.warn(`${message} (slow)`, context);
  } else {
    logger.debug(message, context);
  }
};