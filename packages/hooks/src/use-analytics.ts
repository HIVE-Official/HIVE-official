import { useCallback } from 'react';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent) => {
    // In a real implementation, this would send events to your analytics service
    // For now, we'll just log to console in development
    if (process.env.NODE_ENV === 'development') {
    }
    // Example: analytics.track(event.name, event.properties);
  }, []);

  const identify = useCallback((userId: string, traits?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
    }
    // Example: analytics.identify(userId, traits);
  }, []);

  const page = useCallback((name: string, properties?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
    }
    // Example: analytics.page(name, properties);
  }, []);

  return {
    track,
    identify,
    page,
  };
} 