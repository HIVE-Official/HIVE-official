import { v4 as uuidv4 } from 'uuid';

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

    // Build the error report
    const errorReport = {
      // Don't generate UUID on client - let server handle sessionId if needed
      sessionId: sessionStorage.getItem('hive_session_id'),
      // userId will be undefined for non-authenticated users
      userId: window.__HIVE_USER_ID,
      ...errorData, // Include raw error data
      error: errorData, // Also include as error object for flexibility
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        ...context,
      },
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