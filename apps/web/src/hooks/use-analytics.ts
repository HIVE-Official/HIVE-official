'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedFetch } from '@/lib/api/api-client';
import { logger } from '@/lib/logger';
import { errorMonitor, LogLevel } from '@/lib/error-monitoring';

interface ErrorAnalytics {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  count: number;
  firstOccurred: Date;
  lastOccurred: Date;
  resolved: boolean;
  context: Record<string, any>;
}

interface AnalyticsInsights {
  totalErrors: number;
  errorsByCategory: Record<string, number>;
  errorsBySeverity: Record<string, number>;
  topErrors: Record<string, number>;
  recentTrends: any[];
  timeRange: string;
  generatedAt: string;
}

interface AnalyticsResponse {
  errors: ErrorAnalytics[];
  insights: AnalyticsInsights;
  pagination: {
    total: number;
    limit: number;
    hasMore: boolean;
  };
}

interface UseAnalyticsOptions {
  timeRange?: '1h' | '24h' | '7d' | '30d';
  category?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  limit?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    timeRange = '24h',
    category,
    severity,
    limit = 50,
    autoRefresh = false,
    refreshInterval = 60000 // 1 minute
  } = options;

  const queryClient = useQueryClient();

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.set('timeRange', timeRange);
  queryParams.set('limit', limit.toString());
  if (category) queryParams.set('category', category);
  if (severity) queryParams.set('severity', severity);

  // Fetch analytics data
  const analyticsQuery = useQuery<AnalyticsResponse>({
    queryKey: ['analytics', 'errors', timeRange, category, severity, limit],
    queryFn: async () => {
      const response = await authenticatedFetch(`/api/analytics/errors?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      return response.json();
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: autoRefresh ? refreshInterval : false,
    retry: 2
  });

  // Submit error analytics
  const submitAnalyticsMutation = useMutation({
    mutationFn: async (errorReports: any[]) => {
      const response = await authenticatedFetch('/api/analytics/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errors: errorReports,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit analytics');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch analytics data
      queryClient.invalidateQueries({ queryKey: ['analytics', 'errors'] });
    },
    onError: (error) => {
      logger.error('Analytics submission failed', { error });
    }
  });

  // Manual refresh function
  const refresh = useCallback(() => {
    return analyticsQuery.refetch();
  }, [analyticsQuery]);

  // Submit error function
  const submitError = useCallback(async (
    error: Error | string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    category = 'unknown',
    additionalContext?: Record<string, any>
  ) => {
    const errorReport = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      severity,
      category,
      context: {
        timestamp: new Date(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        sessionId: getSessionId(),
        ...additionalContext
      },
      count: 1,
      firstOccurred: new Date(),
      lastOccurred: new Date(),
      resolved: false,
      tags: [category, severity]
    };

    // Also send to error monitoring system
    if (typeof error !== 'string') {
      await errorMonitor.captureError(error, {
        level: severity === 'critical' ? LogLevel.FATAL : 
               severity === 'high' ? LogLevel.ERROR :
               severity === 'medium' ? LogLevel.WARN : LogLevel.INFO,
        tags: { category, severity },
        extra: additionalContext
      });
    }

    return submitAnalyticsMutation.mutateAsync([errorReport]);
  }, [submitAnalyticsMutation]);

  return {
    // Data
    data: analyticsQuery.data,
    errors: analyticsQuery.data?.errors || [],
    insights: analyticsQuery.data?.insights,
    pagination: analyticsQuery.data?.pagination,
    
    // State
    isLoading: analyticsQuery.isLoading,
    isError: analyticsQuery.isError,
    error: analyticsQuery.error,
    isSubmitting: submitAnalyticsMutation.isPending,
    
    // Actions
    refresh,
    submitError,
    submitAnalytics: submitAnalyticsMutation.mutateAsync
  };
}

// Hook for real-time error tracking
export function useErrorTracking() {
  const [errorQueue, setErrorQueue] = useState<any[]>([]);
  const [isFlushingErrors, setIsFlushingErrors] = useState(false);
  const { submitAnalytics } = useAnalytics();

  // Flush errors periodically
  useEffect(() => {
    const flushInterval = setInterval(async () => {
      if (errorQueue.length > 0 && !isFlushingErrors) {
        setIsFlushingErrors(true);
        try {
          await submitAnalytics([...errorQueue]);
          setErrorQueue([]);
        } catch (error) {
          logger.error('Failed to flush error queue', { error });
        } finally {
          setIsFlushingErrors(false);
        }
      }
    }, 30000); // Flush every 30 seconds

    return () => clearInterval(flushInterval);
  }, [errorQueue, isFlushingErrors, submitAnalytics]);

  // Track error function
  const trackError = useCallback((
    error: Error | string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    category = 'unknown',
    context?: Record<string, any>
  ) => {
    const errorReport = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      severity,
      category,
      context: {
        timestamp: new Date(),
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        sessionId: getSessionId(),
        ...context
      },
      count: 1,
      firstOccurred: new Date(),
      lastOccurred: new Date(),
      resolved: false,
      tags: [category, severity]
    };

    setErrorQueue(prev => [...prev, errorReport]);

    // Flush immediately for critical errors
    if (severity === 'critical') {
      setImmediate(async () => {
        setIsFlushingErrors(true);
        try {
          await submitAnalytics([errorReport]);
          setErrorQueue(prev => prev.filter(e => e !== errorReport));
        } catch (flushError) {
          logger.error('Failed to flush critical error', { flushError });
        } finally {
          setIsFlushingErrors(false);
        }
      });
    }
  }, [submitAnalytics]);

  return {
    trackError,
    queueSize: errorQueue.length,
    isFlushingErrors
  };
}

// Hook for performance analytics
export function usePerformanceAnalytics() {
  const { submitError } = useAnalytics();

  // Track page load performance
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');

        // Report slow page loads
        if (loadTime > 3000) {
          submitError(
            `Slow page load: ${loadTime}ms`,
            loadTime > 5000 ? 'high' : 'medium',
            'performance',
            {
              loadTime,
              domContentLoaded,
              firstPaint: firstPaint?.startTime,
              firstContentfulPaint: firstContentfulPaint?.startTime,
              url: window.location.href
            }
          );
        }
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [submitError]);

  const trackPerformanceMetric = useCallback((metricName: string, value: number, threshold: number) => {
    if (value > threshold) {
      submitError(
        `Performance metric ${metricName} exceeded threshold: ${value} > ${threshold}`,
        value > threshold * 2 ? 'high' : 'medium',
        'performance',
        { metricName, value, threshold }
      );
    }
  }, [submitError]);

  return {
    trackPerformanceMetric
  };
}

// Utility functions
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('hive-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('hive-session-id', sessionId);
  }
  return sessionId;
}

export type { ErrorAnalytics, AnalyticsInsights, AnalyticsResponse, UseAnalyticsOptions };