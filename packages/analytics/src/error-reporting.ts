import { z } from 'zod';

interface ErrorContext {
  component?: string;
  additionalData?: Record<string, unknown>;
}

// Extend Window interface to include our global
declare global {
  interface Window {
    __HIVE_USER_ID?: string;
  }
}

// Error metadata schema
export const ErrorMetadataSchema = z.object({
  type: z.enum([
    'react_error_boundary',
    'api_error',
    'network_error',
    'validation_error',
    'auth_error',
    'firebase_error',
    'unknown'
  ]),
  componentStack: z.string().optional(),
  location: z.string().optional(),
  timestamp: z.string().datetime(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  extra: z.record(z.unknown()).optional()
});

export type ErrorMetadata = z.infer<typeof ErrorMetadataSchema>;

// Rate limiting for error reporting
const ERROR_RATE_LIMIT = {
  maxErrors: 100, // Max errors per window
  windowMs: 60 * 1000, // 1 minute window
};

class ErrorTracker {
  private errorCount: number = 0;
  private lastReset: number = Date.now();

  constructor(private readonly config = ERROR_RATE_LIMIT) {}

  private shouldThrottle(): boolean {
    const now = Date.now();
    if (now - this.lastReset > this.config.windowMs) {
      this.errorCount = 0;
      this.lastReset = now;
      return false;
    }
    return this.errorCount >= this.config.maxErrors;
  }

  async captureError(error: Error, metadata: ErrorMetadata) {
    try {
      // 1. Rate limiting check
      if (this.shouldThrottle()) {
        console.warn('Error reporting rate limit exceeded');
        return;
      }
      this.errorCount++;

      // 2. Validate metadata
      const validMetadata = ErrorMetadataSchema.parse(metadata);

      // 3. Prepare error payload (matching API schema)
      const errorPayload = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        metadata: {
          ...validMetadata,
          extra: {
            ...validMetadata.extra,
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
            platform: typeof window !== 'undefined' ? window.navigator.platform : 'server',
          }
        }
      };

      // 4. Send to error endpoint
      const response = await fetch('/api/analytics/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorPayload),
      });

      if (!response.ok) {
        console.error('Failed to report error:', await response.text());
      }

    } catch (e) {
      // Fail silently in production, log in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error in error reporting:', e);
      }
    }
  }

  // Helper method for React error boundaries
  captureReactError(error: Error, errorInfo: React.ErrorInfo) {
    return this.captureError(error, {
      type: 'react_error_boundary',
      componentStack: errorInfo.componentStack ?? undefined,
      timestamp: new Date().toISOString(),
      location: typeof window !== 'undefined' ? window.location.href : 'server',
    });
  }

  // Helper method for API errors
  captureApiError(error: Error, endpoint: string) {
    return this.captureError(error, {
      type: 'api_error',
      timestamp: new Date().toISOString(),
      extra: { endpoint },
    });
  }

  // Helper method for validation errors
  captureValidationError(error: Error, data: unknown) {
    return this.captureError(error, {
      type: 'validation_error',
      timestamp: new Date().toISOString(),
      extra: { invalidData: JSON.stringify(data) },
    });
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

// Export main capture function
export const captureError = (error: Error, metadata: ErrorMetadata) => {
  return errorTracker.captureError(error, metadata);
};

/**
 * Reports an error to the analytics endpoint
 */
export async function reportError(
  error: Error | string,
  context: ErrorContext = {}
): Promise<void> {
  try {
    // Extract error information
    const errorData = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.constructor.name : 'string',
    };

    // Build the error report (matching API schema)
    const errorReport = {
      name: errorData.type,
      message: errorData.message,
      stack: errorData.stack,
      metadata: {
        type: 'unknown' as const,
        timestamp: new Date().toISOString(),
        userId: window.__HIVE_USER_ID,
        sessionId: sessionStorage.getItem('hive_session_id') ?? undefined,
        location: window.location.href,
        extra: {
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
          ...context,
        }
      }
    };

    const response = await fetch('/api/analytics/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    });

    if (!response.ok) {
      // Log to console if we can't report to server
      console.error('Failed to report error:', error);
    }
  } catch (reportingError) {
    // Last resort - log to console if error reporting fails
    console.error('Error reporting failed:', reportingError);
    console.error('Original error:', error);
  }
}

/**
 * Sets up global error handlers to catch unhandled errors and promise rejections
 */
export function setupGlobalErrorHandling(): void {
  if (typeof window === 'undefined') return;

  // Handle uncaught errors
  window.onerror = (message, source, lineno, colno, error) => {
    reportError(error || String(message), {
      component: 'window.onerror',
      additionalData: { source, lineno, colno },
    });
  };

  // Handle unhandled promise rejections
  window.onunhandledrejection = (event) => {
    reportError(event.reason || 'Unhandled Promise Rejection', {
      component: 'window.onunhandledrejection',
    });
  };

  // Handle React errors
  if (process.env.NODE_ENV !== 'development') {
    // Only in production to avoid double-reporting with React Dev Tools
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Report React-specific errors
      const errorMessage = args.join(' ');
      if (errorMessage.includes('React') || errorMessage.includes('Warning:')) {
        reportError(errorMessage, {
          component: 'React',
          additionalData: { args },
        });
      }
      originalConsoleError.apply(console, args);
    };
  }
} 