import { z } from 'zod';
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
// Rate limiting for error reporting
const ERROR_RATE_LIMIT = {
    maxErrors: 100, // Max errors per window
    windowMs: 60 * 1000, // 1 minute window
};
class ErrorTracker {
    constructor(config = ERROR_RATE_LIMIT) {
        this.config = config;
        this.errorCount = 0;
        this.lastReset = Date.now();
    }
    shouldThrottle() {
        const now = Date.now();
        if (now - this.lastReset > this.config.windowMs) {
            this.errorCount = 0;
            this.lastReset = now;
            return false;
        }
        return this.errorCount >= this.config.maxErrors;
    }
    async captureError(error, metadata) {
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
        }
        catch (e) {
            // Fail silently in production, log in development
            if (process.env.NODE_ENV !== 'production') {
                console.error('Error in error reporting:', e);
            }
        }
    }
    // Helper method for React error boundaries
    captureReactError(error, errorInfo) {
        return this.captureError(error, {
            type: 'react_error_boundary',
            componentStack: errorInfo.componentStack ?? undefined,
            timestamp: new Date().toISOString(),
            location: typeof window !== 'undefined' ? window.location.href : 'server',
        });
    }
    // Helper method for API errors
    captureApiError(error, endpoint) {
        return this.captureError(error, {
            type: 'api_error',
            timestamp: new Date().toISOString(),
            extra: { endpoint },
        });
    }
    // Helper method for validation errors
    captureValidationError(error, data) {
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
export const captureError = (error, metadata) => {
    return errorTracker.captureError(error, metadata);
};
/**
 * Reports an error to the analytics endpoint
 */
export async function reportError(error, context = {}) {
    try {
        // Handle null/undefined errors gracefully
        if (!error) {
            error = 'Unknown error occurred';
        }
        // Extract error information safely
        const errorData = {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            type: error instanceof Error ? error.constructor.name : 'UnknownError',
        };
        // Ensure name and message are never empty
        const errorName = errorData.type || 'UnknownError';
        const errorMessage = errorData.message || 'No error message available';
        // Build the error report (matching API schema)
        const errorReport = {
            name: errorName,
            message: errorMessage,
            stack: errorData.stack,
            metadata: {
                type: 'unknown',
                timestamp: new Date().toISOString(),
                userId: typeof window !== 'undefined' ? window.__HIVE_USER_ID : undefined,
                sessionId: typeof window !== 'undefined' ? sessionStorage.getItem('hive_session_id') ?? undefined : undefined,
                location: typeof window !== 'undefined' ? window.location.href : undefined,
                extra: {
                    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
                    timestamp: Date.now(),
                    originalErrorType: typeof error,
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
    }
    catch (reportingError) {
        // Last resort - log to console if error reporting fails
        console.error('Error reporting failed:', reportingError);
        console.error('Original error:', error);
    }
}
/**
 * Sets up global error handlers to catch unhandled errors and promise rejections
 */
export function setupGlobalErrorHandling() {
    if (typeof window === 'undefined')
        return;
    // Handle uncaught errors
    window.onerror = (message, source, lineno, colno, error) => {
        // Create a meaningful error from the parameters
        const errorToReport = error || new Error(String(message) || 'Unknown script error');
        reportError(errorToReport, {
            component: 'window.onerror',
            additionalData: {
                source: source || 'unknown',
                lineno: lineno || 0,
                colno: colno || 0,
                originalMessage: message
            },
        });
    };
    // Handle unhandled promise rejections
    window.onunhandledrejection = (event) => {
        // Handle various types of rejection reasons
        let errorToReport;
        if (event.reason instanceof Error) {
            errorToReport = event.reason;
        }
        else if (typeof event.reason === 'string') {
            errorToReport = new Error(event.reason || 'Unhandled Promise Rejection');
        }
        else {
            // Handle objects, numbers, null, undefined, etc.
            errorToReport = new Error(`Unhandled Promise Rejection: ${String(event.reason) || 'Unknown reason'}`);
        }
        reportError(errorToReport, {
            component: 'window.onunhandledrejection',
            additionalData: {
                rejectionReason: String(event.reason),
                reasonType: typeof event.reason
            }
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
                reportError(new Error(errorMessage), {
                    component: 'React',
                    additionalData: { args: args.map(arg => String(arg)) },
                });
            }
            originalConsoleError.apply(console, args);
        };
    }
}
//# sourceMappingURL=error-reporting.js.map