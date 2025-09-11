/**
 * Production-ready error monitoring and logging system
 * Integrates with Sentry for error tracking and provides structured logging
 */

import { currentEnvironment } from './env';

// Sentry types (will be loaded dynamically)
interface SentryUser {
  id?: string;
  email?: string;
  username?: string;
  segment?: string;
}

interface SentryScope {
  setUser(user: SentryUser): void;
  setTag(_key: string, _value: string): void;
  setContext(_key: string, _context: Record<string, any>): void;
  setLevel(_level: 'fatal' | 'error' | 'warning' | 'info' | 'debug'): void;
  setExtra(_key: string, _extra: any): void;
  setFingerprint(_fingerprint: string[]): void;
}

interface SentryHub {
  withScope(_callback: (_scope: SentryScope) => void): void;
  captureException(_exception: any): string;
  captureMessage(_message: string, _level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug'): string;
  addBreadcrumb(_breadcrumb: {
    message?: string;
    category?: string;
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
    data?: Record<string, any>;
    timestamp?: number;
  }): void;
}

// Global error tracking state
let isInitialized = false;
let sentryHub: SentryHub | null = null;

/**
 * Initialize error monitoring
 * Loads Sentry dynamically to avoid bundling issues
 */
export async function initializeErrorMonitoring(): Promise<void> {
  if (isInitialized) return;

  try {
    const sentryDsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
    
    if (!sentryDsn) {
      if (currentEnvironment === 'production') {
        console.warn('⚠️ Sentry DSN not configured in production');
      }
      // Silent in development - no need to log missing Sentry config
      isInitialized = true;
      return;
    }

    // Dynamic import to avoid SSR issues
    let Sentry;
    try {
      Sentry = await import('@sentry/nextjs');
    } catch (_importError) {
      console.warn('⚠️ Sentry not installed - error monitoring disabled');
      isInitialized = true;
      return;
    }
    
    Sentry.init({
      dsn: sentryDsn,
      environment: currentEnvironment,
      debug: currentEnvironment === 'development',
      
      // Performance monitoring
      tracesSampleRate: currentEnvironment === 'production' ? 0.1 : 1.0,
      
      // Session replay
      replaysSessionSampleRate: currentEnvironment === 'production' ? 0.01 : 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Error filtering
      beforeSend(event, hint) {
        // Filter out development-only errors
        if (currentEnvironment !== 'production') {
          const error = hint.originalException;
          if (error instanceof Error) {
            // Skip HMR and development errors
            if (error.message.includes('ChunkLoadError') || 
                error.message.includes('Loading chunk') ||
                error.message.includes('Module parse failed')) {
              return null;
            }
          }
        }
        
        // Filter out known non-critical errors
        if (event.exception?.values?.[0]?.value?.includes('Network request failed')) {
          event.level = 'warning';
        }
        
        return event;
      },
      
      // Additional configuration for Next.js
      integrations: [
        // Add additional integrations as needed
      ],
      
      // Privacy settings
      sendDefaultPii: false,
      
      // Release tracking
      release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.npm_package_version,
    });

    sentryHub = Sentry.getCurrentHub();
    isInitialized = true;
    
  } catch (error) {
    console.error('❌ Failed to initialize error monitoring:', error);
    isInitialized = true; // Prevent retry loops
  }
}

/**
 * Log levels for structured logging
 */
export enum LogLevel {
   
  DEBUG = 'debug',
   
  INFO = 'info',
   
  WARN = 'warning',
   
  ERROR = 'error',
   
  FATAL = 'fatal'
}

/**
 * Structured log entry
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  environment: string;
  context?: Record<string, any>;
  userId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  path?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Enhanced error with context
 */
export interface ErrorContext {
  userId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  path?: string;
  method?: string;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: LogLevel;
  fingerprint?: string[];
}

/**
 * Error monitoring service
 */
export class ErrorMonitor {
  private static instance: ErrorMonitor;

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private constructor() {
    // Initialize on first use
    this.ensureInitialized();
  }

  private async ensureInitialized(): Promise<void> {
    if (!isInitialized) {
      await initializeErrorMonitoring();
    }
  }

  /**
   * Log a structured message
   */
  async log(level: LogLevel, message: string, context?: Record<string, any>): Promise<void> {
    await this.ensureInitialized();

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      environment: currentEnvironment,
      context,
    };

    // Console logging for development
    this.logToConsole(logEntry);

    // Send to Sentry if available
    if (sentryHub) {
      sentryHub.addBreadcrumb({
        message,
        level: level as any,
        data: context,
        timestamp: Date.now() / 1000,
      });

      if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
        sentryHub.captureMessage(message, level as any);
      }
    }
  }

  /**
   * Capture an error with full context
   */
  async captureError(error: Error, context?: ErrorContext): Promise<string | null> {
    await this.ensureInitialized();

    const errorId = this.generateErrorId();

    // Create structured log entry
    const logEntry: LogEntry = {
      level: context?.level || LogLevel.ERROR,
      message: error.message,
      timestamp: new Date().toISOString(),
      environment: currentEnvironment,
      context: context?.extra,
      userId: context?.userId,
      requestId: context?.requestId,
      userAgent: context?.userAgent,
      ip: context?.ip,
      path: context?.path,
      method: context?.method,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    };

    // Console logging
    this.logToConsole(logEntry);

    // Send to Sentry
    if (sentryHub) {
      return await this.sendToSentry(error, context, errorId);
    }

    return errorId;
  }

  /**
   * Set user context for error tracking
   */
  async setUser(user: { id?: string; email?: string; username?: string }): Promise<void> {
    await this.ensureInitialized();

    if (sentryHub) {
      sentryHub.withScope((scope: any) => {
        scope.setUser(user);
      });
    }
  }

  /**
   * Add breadcrumb for debugging
   */
  async addBreadcrumb(message: string, category?: string, data?: Record<string, any>): Promise<void> {
    await this.ensureInitialized();

    if (sentryHub) {
      sentryHub.addBreadcrumb({
        message,
        category: category || 'custom',
        level: 'info',
        data,
        timestamp: Date.now() / 1000,
      });
    }
  }

  /**
   * Monitor API performance
   */
  async trackApiCall(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: Record<string, any>
  ): Promise<void> {
    const level = statusCode >= 500 ? LogLevel.ERROR : 
                  statusCode >= 400 ? LogLevel.WARN : 
                  LogLevel.INFO;

    await this.log(level, `API ${method} ${path}`, {
      method,
      path,
      statusCode,
      duration,
      ...context,
    });
  }

  private logToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp;
    const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.context);
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.context);
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.context);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(prefix, entry.message, entry.error, entry.context);
        break;
    }
  }

  private async sendToSentry(error: Error, context?: ErrorContext, errorId?: string): Promise<string> {
    return new Promise((resolve: any) => {
      sentryHub!.withScope((scope: any) => {
        // Set user context
        if (context?.userId) {
          scope.setUser({ id: context.userId });
        }

        // Set tags
        if (context?.tags) {
          Object.entries(context.tags).forEach(([key, value]) => {
            scope.setTag(key, value);
          });
        }

        // Set extra context
        if (context?.extra) {
          Object.entries(context.extra).forEach(([key, value]) => {
            scope.setExtra(key, value);
          });
        }

        // Set request context
        if (context?.path || context?.method) {
          scope.setContext('request', {
            path: context.path,
            method: context.method,
            userAgent: context.userAgent,
            ip: context.ip,
          });
        }

        // Set level
        if (context?.level) {
          scope.setLevel(context.level as any);
        }

        // Set fingerprint for grouping
        if (context?.fingerprint) {
          scope.setFingerprint(context.fingerprint);
        }

        // Add error ID for tracking
        if (errorId) {
          scope.setExtra('errorId', errorId);
        }

        const sentryEventId = sentryHub!.captureException(error);
        resolve(sentryEventId || errorId || 'unknown');
      });
    });
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const errorMonitor = ErrorMonitor.getInstance();

// Convenience functions
export const logDebug = (message: string, context?: Record<string, any>) => 
  errorMonitor.log(LogLevel.DEBUG, message, context);

export const logInfo = (message: string, context?: Record<string, any>) => 
  errorMonitor.log(LogLevel.INFO, message, context);

export const logWarn = (message: string, context?: Record<string, any>) => 
  errorMonitor.log(LogLevel.WARN, message, context);

export const logError = (message: string, context?: Record<string, any>) => 
  errorMonitor.log(LogLevel.ERROR, message, context);

export const captureError = (error: Error, context?: ErrorContext) => 
  errorMonitor.captureError(error, context);

export const setUser = (user: { id?: string; email?: string; username?: string }) => 
  errorMonitor.setUser(user);

export const addBreadcrumb = (message: string, category?: string, data?: Record<string, any>) => 
  errorMonitor.addBreadcrumb(message, category, data);

export const trackApiCall = (
  method: string,
  path: string,
  statusCode: number,
  duration: number,
  context?: Record<string, any>
) => errorMonitor.trackApiCall(method, path, statusCode, duration, context);

// Initialize on module load in production
if (typeof window !== 'undefined' && currentEnvironment === 'production') {
  initializeErrorMonitoring().catch(console.error);
}