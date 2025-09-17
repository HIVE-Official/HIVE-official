import { logger } from '@/lib/logger';

/**
 * Structured Logger for HIVE Platform
 * 
 * Provides consistent, structured logging throughout the application
 * with support for different log levels, contexts, and environments.
 * 
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Structured data with consistent format
 * - Environment-aware logging (verbose in dev, minimal in prod)
 * - Performance timing support
 * - Error context capture
 * - Async error reporting capability
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
  performance?: {
    duration?: number;
    startTime?: number;
  };
}

class StructuredLogger {
  private isDevelopment: boolean;
  private logBuffer: LogEntry[] = [];
  private maxBufferSize: number = 100;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Debug level logging - verbose information for development
   */
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  /**
   * Info level logging - general informational messages
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * Warning level logging - potentially problematic situations
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * Error level logging - error conditions
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log('error', message, { ...context, error: this.serializeError(errorObj) }, errorObj);
  }

  /**
   * Main logging function
   */
  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error
    };

    // Add to buffer for potential error reporting
    this.addToBuffer(entry);

    // Console output based on environment and level
    if (this.shouldLog(level)) {
      this.outputLog(entry);
    }

    // In production, send errors to monitoring service
    if (!this.isDevelopment && level === 'error') {
      this.reportError(entry);
    }
  }

  /**
   * Determine if a log should be output based on level and environment
   */
  private shouldLog(level: LogLevel): boolean {
    // In development, log everything
    if (this.isDevelopment) {
      return true;
    }

    // In production, only log warnings and errors
    return level === 'warn' || level === 'error';
  }

  /**
   * Output log to console with appropriate formatting
   */
  private outputLog(entry: LogEntry): void {
    const { timestamp, level, message, context, error } = entry;
    
    // Format the log message
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const formattedMessage = `${prefix} ${message}`;

    // Choose console method based on level
    switch (level) {
      case 'debug':
        break;
      case 'info':
        break;
      case 'warn':
        console.warn(formattedMessage, context || '');
        break;
      case 'error':
        console.error(formattedMessage, context || '', error || '');
        break;
    }

    // In development, also log structured data for better debugging
    if (this.isDevelopment && context) {
      
    }
  }

  /**
   * Add log entry to buffer
   */
  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry);
    
    // Maintain buffer size limit
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }
  }

  /**
   * Serialize error object for logging
   */
  private serializeError(error: Error): any {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...error // Include any custom properties
    };
  }

  /**
   * Report error to monitoring service (placeholder for production)
   */
  private async reportError(entry: LogEntry): Promise<void> {
    // In production, this would send to a service like Sentry, LogRocket, etc.
    // For now, we'll just store in localStorage for debugging
    try {
      if (typeof window !== 'undefined') {
        const errors = JSON.parse(localStorage.getItem('hive_error_log') || '[]');
        errors.push({
          ...entry,
          url: window.location.href,
          userAgent: navigator.userAgent
        });
        
        // Keep only last 50 errors
        if (errors.length > 50) {
          errors.splice(0, errors.length - 50);
        }
        
        localStorage.setItem('hive_error_log', JSON.stringify(errors));
      }
    } catch (e) {
      // Fail silently - don't throw errors from error handler
      logger.error('Failed to store error log:', { error: String(e) });
    }
  }

  /**
   * Performance timing helper
   */
  time(label: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.info(`Performance: ${label}`, {
        duration: `${duration.toFixed(2)}ms`,
        durationRaw: duration
      });
    };
  }

  /**
   * Log with performance timing
   */
  withTiming<T>(label: string, fn: () => T): T {
    const endTimer = this.time(label);
    try {
      const result = fn();
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      throw error;
    }
  }

  /**
   * Async version of withTiming
   */
  async withTimingAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const endTimer = this.time(label);
    try {
      const result = await fn();
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      throw error;
    }
  }

  /**
   * Get recent logs (useful for debugging)
   */
  getRecentLogs(count: number = 10): LogEntry[] {
    return this.logBuffer.slice(-count);
  }

  /**
   * Clear log buffer
   */
  clearBuffer(): void {
    this.logBuffer = [];
  }

  /**
   * Create a child logger with additional context
   */
  child(defaultContext: LogContext): StructuredLogger {
    const parent = this;
    const childLogger = Object.create(this);
    
    // Override log method to include default context
    childLogger.log = function(level: LogLevel, message: string, context?: LogContext, error?: Error) {
      parent.log(level, message, { ...defaultContext, ...context }, error);
    };
    
    return childLogger;
  }
}

// Create and export singleton instance
export const logger = new StructuredLogger();

// Export type for use in other modules
export type { LogLevel, LogContext, LogEntry };

// Convenience exports for common logging patterns
export const logApiCall = (method: string, url: string, context?: LogContext) => {
  logger.info(`API Call: ${method} ${url}`, context);
};

export const logApiError = (method: string, url: string, error: Error, context?: LogContext) => {
  logger.error(`API Error: ${method} ${url}`, { error: String(error, context) });
};

export const logUserAction = (action: string, context?: LogContext) => {
  logger.info(`User Action: ${action}`, context);
};

export const logPerformance = (metric: string, value: number, context?: LogContext) => {
  logger.info(`Performance: ${metric}`, { value, ...context });
};

export const logSecurityEvent = (event: string, context?: LogContext) => {
  logger.warn(`Security: ${event}`, { securityEvent: event, ...context });
};

/**
 * Create a request logger for API routes
 * Returns a logger instance with request-specific context
 */
export const createRequestLogger = (request: Request) => {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();
  
  const requestContext: LogContext = {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent') || undefined,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || undefined,
    startTime: new Date(startTime).toISOString()
  };
  
  return {
    info: (message: string, context?: LogContext) => 
      logger.info(message, { ...requestContext, ...context }),
    
    warn: (message: string, context?: LogContext) => 
      logger.warn(message, { ...requestContext, ...context }),
    
    error: (message: string, error?: Error | unknown, context?: LogContext) => 
      logger.error(message, { error: String(error, { ...requestContext, ...context }) }),
    
    debug: (message: string, context?: LogContext) => 
      logger.debug(message, { ...requestContext, ...context }),
    
    // Log the completion of the request
    complete: (statusCode: number, context?: LogContext) => {
      const duration = Date.now() - startTime;
      logger.info('Request completed', {
        ...requestContext,
        statusCode,
        duration,
        ...context
      });
    }
  };
};