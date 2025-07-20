/**
 * Structured logging service for HIVE
 * Provides consistent, searchable, and actionable logs across the application
 */

import { currentEnvironment, isDevelopment } from './env';
import { captureError } from './error-monitoring';

/**
 * Log levels in order of severity
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

/**
 * Log categories for better organization
 */
export enum LogCategory {
  AUTH = 'auth',
  API = 'api',
  DATABASE = 'database',
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  USER_ACTION = 'user_action',
  SYSTEM = 'system',
  BUSINESS = 'business',
  INTEGRATION = 'integration'
}

/**
 * Standard log context interface
 */
export interface LogContext {
  // User context
  userId?: string;
  userEmail?: string;
  isTestUser?: boolean;
  
  // Request context
  requestId?: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  
  // Operation context
  operation?: string;
  duration?: number;
  
  // Business context
  spaceId?: string;
  organizationId?: string;
  
  // Technical context
  component?: string;
  version?: string;
  
  // Additional metadata
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

/**
 * Structured log entry
 */
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  environment: string;
  context: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Log configuration
 */
interface LogConfig {
  enableConsole: boolean;
  enableRemote: boolean;
  minLevel: LogLevel;
  enableSensitiveData: boolean;
  enablePerformanceLogging: boolean;
}

/**
 * Environment-specific configuration
 */
const LOG_CONFIG: Record<string, LogConfig> = {
  development: {
    enableConsole: true,
    enableRemote: false,
    minLevel: LogLevel.DEBUG,
    enableSensitiveData: true,
    enablePerformanceLogging: true
  },
  staging: {
    enableConsole: true,
    enableRemote: true,
    minLevel: LogLevel.INFO,
    enableSensitiveData: false,
    enablePerformanceLogging: true
  },
  production: {
    enableConsole: false,
    enableRemote: true,
    minLevel: LogLevel.WARN,
    enableSensitiveData: false,
    enablePerformanceLogging: false
  }
};

/**
 * Get logging configuration for current environment
 */
function getLogConfig(): LogConfig {
  return LOG_CONFIG[currentEnvironment] || LOG_CONFIG.development;
}

/**
 * Level hierarchy for filtering
 */
const LEVEL_HIERARCHY = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
  [LogLevel.FATAL]: 4
};

/**
 * Check if log level should be processed
 */
function shouldLog(level: LogLevel): boolean {
  const config = getLogConfig();
  return LEVEL_HIERARCHY[level] >= LEVEL_HIERARCHY[config.minLevel];
}

/**
 * Sanitize sensitive data from context
 */
function sanitizeContext(context: LogContext): LogContext {
  const config = getLogConfig();
  
  if (config.enableSensitiveData) {
    return context;
  }

  const sanitized = { ...context };

  // Mask email addresses
  if (sanitized.userEmail) {
    sanitized.userEmail = sanitized.userEmail.replace(/(.{3}).*@/, '$1***@');
  }

  // Remove sensitive extra data
  if (sanitized.extra) {
    const { password, token, secret, key, ...safeExtra } = sanitized.extra;
    sanitized.extra = safeExtra;
  }

  return sanitized;
}

/**
 * Format log entry for console output
 */
function formatConsoleLog(entry: LogEntry): string {
  const timestamp = new Date(entry.timestamp).toISOString();
  const level = entry.level.toUpperCase().padEnd(5);
  const category = entry.category.toUpperCase().padEnd(12);
  
  let output = `[${timestamp}] ${level} ${category} ${entry.message}`;
  
  // Add context if available
  if (entry.context.userId) {
    output += ` | User: ${entry.context.userId}`;
  }
  
  if (entry.context.requestId) {
    output += ` | Request: ${entry.context.requestId}`;
  }
  
  if (entry.context.operation) {
    output += ` | Op: ${entry.context.operation}`;
  }
  
  if (entry.context.duration) {
    output += ` | ${entry.context.duration}ms`;
  }

  return output;
}

/**
 * Send log to remote service (Sentry, DataDog, etc.)
 */
async function sendToRemoteService(entry: LogEntry): Promise<void> {
  try {
    // For errors and fatals, use Sentry
    if (entry.level === LogLevel.ERROR || entry.level === LogLevel.FATAL) {
      if (entry.error) {
        const error = new Error(entry.error.message);
        error.name = entry.error.name;
        error.stack = entry.error.stack;
        
        await captureError(error, {
          level: entry.level === LogLevel.ERROR ? 'error' : 'fatal',
          userId: entry.context.userId,
          requestId: entry.context.requestId,
          tags: {
            category: entry.category,
            operation: entry.context.operation || 'unknown',
            environment: entry.environment,
            ...entry.context.tags
          },
          extra: {
            logMessage: entry.message,
            context: entry.context,
            timestamp: entry.timestamp
          }
        });
      } else {
        // Log message without error object
        await captureError(new Error(entry.message), {
          level: entry.level === LogLevel.ERROR ? 'error' : 'fatal',
          userId: entry.context.userId,
          requestId: entry.context.requestId,
          tags: {
            category: entry.category,
            operation: entry.context.operation || 'unknown',
            environment: entry.environment,
            ...entry.context.tags
          },
          extra: {
            context: entry.context,
            timestamp: entry.timestamp
          }
        });
      }
    }

    // TODO: For other levels, send to structured logging service
    // This could be DataDog, CloudWatch, etc.
    
  } catch (error) {
    console.error('Failed to send log to remote service:', error);
  }
}

/**
 * Core logging function
 */
async function log(
  level: LogLevel,
  category: LogCategory,
  message: string,
  context: LogContext = {},
  error?: Error
): Promise<void> {
  if (!shouldLog(level)) {
    return;
  }

  const config = getLogConfig();
  const sanitizedContext = sanitizeContext(context);
  
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    environment: currentEnvironment,
    context: sanitizedContext,
    error: error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : undefined
  };

  // Console logging
  if (config.enableConsole) {
    const consoleMessage = formatConsoleLog(entry);
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(consoleMessage, entry.context);
        break;
      case LogLevel.INFO:
        console.info(consoleMessage, entry.context);
        break;
      case LogLevel.WARN:
        console.warn(consoleMessage, entry.context);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(consoleMessage, entry.context, error);
        break;
    }
  }

  // Remote logging
  if (config.enableRemote) {
    await sendToRemoteService(entry);
  }
}

/**
 * Structured logger class with convenience methods
 */
export class StructuredLogger {
  private defaultContext: LogContext;
  
  constructor(defaultContext: LogContext = {}) {
    this.defaultContext = defaultContext;
  }

  /**
   * Create a child logger with additional context
   */
  child(additionalContext: LogContext): StructuredLogger {
    return new StructuredLogger({
      ...this.defaultContext,
      ...additionalContext
    });
  }

  /**
   * Log debug message
   */
  async debug(message: string, context: LogContext = {}): Promise<void> {
    await log(LogLevel.DEBUG, LogCategory.SYSTEM, message, {
      ...this.defaultContext,
      ...context
    });
  }

  /**
   * Log info message
   */
  async info(message: string, context: LogContext = {}): Promise<void> {
    await log(LogLevel.INFO, LogCategory.SYSTEM, message, {
      ...this.defaultContext,
      ...context
    });
  }

  /**
   * Log warning
   */
  async warn(message: string, context: LogContext = {}): Promise<void> {
    await log(LogLevel.WARN, LogCategory.SYSTEM, message, {
      ...this.defaultContext,
      ...context
    });
  }

  /**
   * Log error
   */
  async error(message: string, context: LogContext = {}, error?: Error): Promise<void> {
    await log(LogLevel.ERROR, LogCategory.SYSTEM, message, {
      ...this.defaultContext,
      ...context
    }, error);
  }

  /**
   * Log fatal error
   */
  async fatal(message: string, context: LogContext = {}, error?: Error): Promise<void> {
    await log(LogLevel.FATAL, LogCategory.SYSTEM, message, {
      ...this.defaultContext,
      ...context
    }, error);
  }

  /**
   * Log with specific category
   */
  async logWithCategory(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context: LogContext = {},
    error?: Error
  ): Promise<void> {
    await log(level, category, message, {
      ...this.defaultContext,
      ...context
    }, error);
  }
}

/**
 * Default logger instance
 */
export const logger = new StructuredLogger();

/**
 * Specialized loggers for common categories
 */
export const authLogger = new StructuredLogger({ tags: { category: 'auth' } });
export const apiLogger = new StructuredLogger({ tags: { category: 'api' } });
export const dbLogger = new StructuredLogger({ tags: { category: 'database' } });
export const securityLogger = new StructuredLogger({ tags: { category: 'security' } });
export const performanceLogger = new StructuredLogger({ tags: { category: 'performance' } });

/**
 * Convenience functions for common logging patterns
 */

/**
 * Log authentication events
 */
export async function logAuthEvent(
  event: 'login' | 'logout' | 'register' | 'verify' | 'failed_login',
  context: LogContext = {}
): Promise<void> {
  await log(LogLevel.INFO, LogCategory.AUTH, `Authentication event: ${event}`, context);
}

/**
 * Log API request/response
 */
export async function logApiCall(
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  context: LogContext = {}
): Promise<void> {
  const level = statusCode >= 500 ? LogLevel.ERROR : 
               statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;
  
  const message = `${method} ${path} ${statusCode} (${duration}ms)`;
  
  await log(level, LogCategory.API, message, {
    ...context,
    operation: 'api_call',
    duration,
    tags: {
      ...context.tags,
      method,
      path,
      statusCode: statusCode.toString()
    }
  });
}

/**
 * Log security events
 */
export async function logSecurityEvent(
  event: 'bypass_attempt' | 'rate_limit' | 'invalid_token' | 'admin_access',
  context: LogContext = {}
): Promise<void> {
  await log(LogLevel.WARN, LogCategory.SECURITY, `Security event: ${event}`, {
    ...context,
    tags: {
      ...context.tags,
      securityEvent: event
    }
  });
}

/**
 * Log performance metrics
 */
export async function logPerformance(
  operation: string,
  duration: number,
  context: LogContext = {}
): Promise<void> {
  const config = getLogConfig();
  
  if (!config.enablePerformanceLogging) {
    return;
  }

  const level = duration > 5000 ? LogLevel.WARN : LogLevel.INFO;
  const message = `Performance: ${operation} completed in ${duration}ms`;
  
  await log(level, LogCategory.PERFORMANCE, message, {
    ...context,
    operation,
    duration,
    tags: {
      ...context.tags,
      performanceMetric: 'true'
    }
  });
}

/**
 * Log user actions for analytics
 */
export async function logUserAction(
  action: string,
  context: LogContext = {}
): Promise<void> {
  await log(LogLevel.INFO, LogCategory.USER_ACTION, `User action: ${action}`, {
    ...context,
    operation: action,
    tags: {
      ...context.tags,
      userAction: action
    }
  });
}

/**
 * Create request-scoped logger
 */
export function createRequestLogger(requestId: string, userId?: string): StructuredLogger {
  return new StructuredLogger({
    requestId,
    userId
  });
}