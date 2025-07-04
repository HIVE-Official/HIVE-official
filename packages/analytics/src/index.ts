// Analytics utilities for the HIVE platform
// Placeholder for analytics functionality

export type LogMetadata = Record<string, any>;
export type LogEvent = {
  name: string;
  type?: string;
  level?: string;
  message?: string;
  metadata?: LogMetadata;
  sessionId?: string;
  properties?: LogMetadata;
  timestamp?: number;
};

export interface AnalyticsProvider {
  trackError: (error: Error, metadata?: LogMetadata) => void;
  trackEvent: (event: LogEvent) => void;
  track: (name: string, properties?: LogMetadata) => void;
  page: (name: string, properties?: LogMetadata) => void;
  identify: (userId: string, traits?: LogMetadata) => void;
}

export const analytics: AnalyticsProvider = {
  trackError: () => {},
  trackEvent: () => {},
  track: () => {},
  page: () => {},
  identify: () => {},
};

export function setupGlobalErrorHandling() {
  // Set up global error handling
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      analytics.trackError(event.error, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      analytics.trackError(new Error(event.reason), {
        type: 'unhandledrejection',
        reason: event.reason,
      });
    });
  }
} 