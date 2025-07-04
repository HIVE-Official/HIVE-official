// @ts-check

// Optional analytics types - define locally to avoid dependency issues
interface LogMetadata {
  [key: string]: any;
}

interface LogEvent {
  name: string;
  type?: string;
  level?: string;
  message?: string;
  metadata?: LogMetadata;
  sessionId?: string;
  properties?: LogMetadata;
  timestamp?: number;
}

interface AnalyticsProvider {
  trackError: (error: Error, metadata?: LogMetadata) => void;
  trackEvent: (event: LogEvent) => void;
  track: (name: string, properties?: LogMetadata) => void;
  page: (name: string, properties?: LogMetadata) => void;
  identify: (userId: string, traits?: LogMetadata) => void;
}

// Enhanced logger for HIVE UI with comprehensive debugging support

// Log levels with colors for better visibility
const LOG_LEVELS = {
  DEBUG: '\x1b[34m%s\x1b[0m',   // Blue
  INFO: '\x1b[32m%s\x1b[0m',    // Green
  WARN: '\x1b[33m%s\x1b[0m',    // Yellow
  ERROR: '\x1b[31m%s\x1b[0m',   // Red
  API: '\x1b[35m%s\x1b[0m',     // Magenta for API logs
  STATE: '\x1b[36m%s\x1b[0m',   // Cyan for state changes
  VALID: '\x1b[90m%s\x1b[0m'    // Gray for validation
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

interface ErrorEvent {
  error: Error;
  type?: string;
  metadata?: LogMetadata;
}

interface ApiLogMetadata extends LogMetadata {
  method?: string;
  url?: string;
  status?: number;
  duration?: number;
  requestBody?: unknown;
  responseBody?: unknown;
}

interface StateLogMetadata extends LogMetadata {
  store?: string;
  action?: string;
  prevState?: unknown;
  nextState?: unknown;
  source?: string;
  errors?: unknown[];
}

interface ValidationLogMetadata extends LogMetadata {
  schema?: string;
  value?: unknown;
  errors?: unknown[];
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';
  private debugEnabled = process.env.DEBUG === 'true';
  private errorQueue: ErrorEvent[] = [];
  private maxQueueSize = 100;
  private errorCount = 0;
  private lastErrorReset = Date.now();
  private ERROR_RATE_LIMIT = {
    maxErrors: 100, // Max errors per window
    windowMs: 60 * 1000 // 1 minute
  };
  
  // Add a property to hold the analytics provider.
  private analyticsProvider: AnalyticsProvider | null = null;

  // Performance tracking
  private perfMarks: Record<string, number> = {};

  constructor() {
    if (!this.isProduction) {
      this.debug('Logger initialized in development mode');
    }
  }

  // Add a method to set the analytics provider.
  setAnalyticsProvider(provider: AnalyticsProvider) {
    this.analyticsProvider = provider;
  }

  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const metadataStr = metadata ? `\n${JSON.stringify(metadata, null, 2)}` : '';
    return `[${timestamp}] [${level}] ${message}${metadataStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isProduction) {
      // In production, only log INFO and above
      return level !== 'DEBUG' && level !== 'VALID';
    }
    // In development, respect debug flag
    return level !== 'DEBUG' || this.debugEnabled;
  }

  private shouldThrottle(): boolean {
    const now = Date.now();
    if (now - this.lastErrorReset >= this.ERROR_RATE_LIMIT.windowMs) {
      this.errorCount = 0;
      this.lastErrorReset = now;
      return false;
    }
    return this.errorCount >= this.ERROR_RATE_LIMIT.maxErrors;
  }

  private async reportError(event: ErrorEvent): Promise<void> {
    try {
      if (this.shouldThrottle()) {
        this.warn('Error reporting rate limit exceeded');
        return;
      }
      this.errorCount++;

      // Queue error for batch processing
      if (this.errorQueue.length >= this.maxQueueSize) {
        this.errorQueue.shift(); // Remove oldest error
      }
      this.errorQueue.push(event);

      // Track error in analytics if a provider is available.
      if (this.analyticsProvider) {
        await this.analyticsProvider.trackError(event.error, event.metadata);
      }

      // In production, send to error endpoint
      if (this.isProduction) {
        const errorPayload = {
          name: event.error.name,
          message: event.error.message,
          stack: event.error.stack,
          type: event.type,
          metadata: {
            ...event.metadata,
            timestamp: Date.now(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
            platform: typeof window !== 'undefined' ? window.navigator.platform : 'server'
          }
        };

        const response = await fetch('/api/analytics/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorPayload)
        });

        if (!response.ok) {
          console.error('Failed to report error:', await response.text());
        }
      }
    } catch (e) {
      // Fail silently in production, log in development
      if (!this.isProduction) {
        console.error('Error in error reporting:', e);
      }
    }
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, metadata);
    const logFn = level === 'ERROR' ? console.error : 
                 level === 'WARN' ? console.warn : 
                 console.log;

    logFn(LOG_LEVELS[level], formattedMessage);

    // Track in analytics for important logs
    if (level === 'ERROR' || level === 'WARN') {
      const logEvent: LogEvent = {
        name: message,
        type: 'log',
        level,
        message,
        metadata,
        timestamp: Date.now(),
        sessionId: (metadata && typeof metadata.sessionId === 'string') ? metadata.sessionId : 'unknown'
      };
      // Track the event if an analytics provider is available.
      if (this.analyticsProvider) {
        this.analyticsProvider.trackEvent(logEvent);
      }
    }
  }

  // Public logging methods
  debug(message: string, metadata?: LogMetadata): void {
    this.log('DEBUG', message, metadata);
  }

  info(message: string, metadata?: LogMetadata): void {
    this.log('INFO', message, metadata);
  }

  warn(message: string, metadata?: LogMetadata): void {
    this.log('WARN', message, metadata);
  }

  error(message: string | Error, metadata?: LogMetadata): void {
    const error = message instanceof Error ? message : new Error(message);
    void this.reportError({ error, metadata });
    this.log('ERROR', error.message, { ...metadata, stack: error.stack });
  }

  logApi(message: string, metadata: ApiLogMetadata): void {
    this.log('API', message, metadata);
  }

  logState(message: string, metadata: StateLogMetadata): void {
    this.log('STATE', message, metadata);
  }

  logValidation(message: string, metadata: ValidationLogMetadata): void {
    this.log('VALID', message, metadata);
  }

  startTimer(label: string): void {
    this.perfMarks[label] = performance.now();
  }

  endTimer(label: string, metadata?: LogMetadata): void {
    const start = this.perfMarks[label];
    if (!start) {
      this.warn(`No timer found for label: ${label}`);
      return;
    }

    const duration = performance.now() - start;
    delete this.perfMarks[label];

    this.debug(`Timer ${label} completed`, { ...metadata, duration });
  }

  logBatch(operation: string, items: unknown[], metadata?: LogMetadata): void {
    this.debug(`Batch operation: ${operation}`, {
      ...metadata,
      itemCount: items.length,
      operation
    });
  }

  logComponent(component: string, lifecycle: string, metadata?: LogMetadata): void {
    this.debug(`Component ${component} ${lifecycle}`, {
      ...metadata,
      component,
      lifecycle
    });
  }

  logReactError(error: Error, componentStack: string): void {
    void this.reportError({
      error,
      type: 'react_error',
      metadata: { componentStack }
    });
  }

  getErrorCount(): number {
    return this.errorCount;
  }

  getErrorQueue(): ErrorEvent[] {
    return [...this.errorQueue];
  }

  clearErrorQueue(): void {
    this.errorQueue = [];
  }
}

export const logger = new Logger();
