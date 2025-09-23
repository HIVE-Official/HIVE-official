/**
 * Firebase Performance Monitoring Configuration
 * Tracks app performance metrics for production optimization
 */

import { FirebaseApp } from 'firebase/app';
import { getPerformance, Performance, trace } from 'firebase/performance';
import { getAnalytics, logEvent } from 'firebase/analytics';

let performance: Performance | null = null;
let analytics: any = null;

/**
 * Initialize Firebase Performance Monitoring
 */
export function initializePerformance(app: FirebaseApp): void {
  if (typeof window === 'undefined') return; // Server-side guard

  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
  const performanceEnabled = process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true';

  if (isProduction && performanceEnabled) {
    try {
      performance = getPerformance(app);
      console.log('✅ Firebase Performance Monitoring initialized');
    } catch (error) {
      console.error('Failed to initialize performance monitoring:', error);
    }
  }

  // Initialize Analytics if enabled
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
  if (isProduction && analyticsEnabled) {
    try {
      analytics = getAnalytics(app);
      console.log('✅ Firebase Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }
}

/**
 * Custom Performance Traces for HIVE
 */
export const PerformanceTraces = {
  // Authentication flows
  AUTH_MAGIC_LINK: 'auth_magic_link_flow',
  AUTH_VERIFICATION: 'auth_email_verification',
  AUTH_SESSION_CHECK: 'auth_session_check',

  // Space operations
  SPACE_LOAD: 'space_page_load',
  SPACE_CREATE: 'space_creation',
  SPACE_JOIN: 'space_join_flow',
  SPACE_FEED_LOAD: 'space_feed_load',

  // Profile operations
  PROFILE_LOAD: 'profile_page_load',
  PROFILE_UPDATE: 'profile_update',
  PROFILE_IMAGE_UPLOAD: 'profile_image_upload',

  // Tool operations
  TOOL_LOAD: 'tool_page_load',
  TOOL_EXECUTE: 'tool_execution',
  TOOL_CREATE: 'tool_creation',

  // Feed operations
  FEED_LOAD: 'feed_initial_load',
  FEED_REFRESH: 'feed_refresh',
  POST_CREATE: 'post_creation',

  // Real-time operations
  SSE_CONNECTION: 'sse_connection_establish',
  NOTIFICATION_DELIVERY: 'notification_delivery',

  // Critical user flows
  ONBOARDING_FLOW: 'onboarding_complete_flow',
  FIRST_SPACE_JOIN: 'first_space_join',
  FIRST_POST_CREATE: 'first_post_creation',
} as const;

/**
 * Start a custom performance trace
 */
export async function startTrace(traceName: string): Promise<any> {
  if (!performance) return null;

  try {
    const customTrace = trace(performance, traceName);
    customTrace.start();
    return customTrace;
  } catch (error) {
    console.error(`Failed to start trace ${traceName}:`, error);
    return null;
  }
}

/**
 * Stop a custom performance trace
 */
export function stopTrace(traceInstance: any): void {
  if (!traceInstance) return;

  try {
    traceInstance.stop();
  } catch (error) {
    console.error('Failed to stop trace:', error);
  }
}

/**
 * Track custom metrics
 */
export function trackMetric(
  traceInstance: any,
  metricName: string,
  value: number
): void {
  if (!traceInstance) return;

  try {
    traceInstance.putMetric(metricName, value);
  } catch (error) {
    console.error(`Failed to track metric ${metricName}:`, error);
  }
}

/**
 * Track custom attributes
 */
export function trackAttribute(
  traceInstance: any,
  attributeName: string,
  value: string
): void {
  if (!traceInstance) return;

  try {
    traceInstance.putAttribute(attributeName, value);
  } catch (error) {
    console.error(`Failed to track attribute ${attributeName}:`, error);
  }
}

/**
 * Analytics Events for HIVE
 */
export const AnalyticsEvents = {
  // User engagement
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PROFILE_COMPLETE: 'profile_completed',

  // Space engagement
  SPACE_VIEW: 'space_view',
  SPACE_JOIN: 'space_join',
  SPACE_LEAVE: 'space_leave',
  SPACE_CREATE: 'space_create',

  // Content creation
  POST_CREATE: 'post_create',
  COMMENT_CREATE: 'comment_create',
  TOOL_CREATE: 'tool_create',
  EVENT_CREATE: 'event_create',

  // Social interactions
  USER_FOLLOW: 'user_follow',
  POST_LIKE: 'post_like',
  POST_SHARE: 'post_share',

  // Ritual participation
  RITUAL_JOIN: 'ritual_join',
  RITUAL_COMPLETE: 'ritual_complete',
  RITUAL_MILESTONE: 'ritual_milestone',
} as const;

/**
 * Log analytics event
 */
export function logAnalyticsEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (!analytics) return;

  try {
    // Always include campus context
    const enrichedParams = {
      campus_id: 'ub-buffalo',
      timestamp: new Date().toISOString(),
      ...parameters,
    };

    logEvent(analytics, eventName, enrichedParams);
  } catch (error) {
    console.error(`Failed to log analytics event ${eventName}:`, error);
  }
}

/**
 * Performance monitoring hooks for React components
 */
export function usePerformanceMonitoring(componentName: string) {
  if (typeof window === 'undefined' || !performance) {
    return {
      startMeasure: () => null,
      endMeasure: () => null,
    };
  }

  return {
    startMeasure: (measureName: string) => {
      return startTrace(`${componentName}_${measureName}`);
    },
    endMeasure: (traceInstance: any) => {
      stopTrace(traceInstance);
    },
  };
}

/**
 * Track page load performance
 */
export function trackPageLoadPerformance(pageName: string): void {
  if (typeof window === 'undefined' || !performance) return;

  // Use Navigation Timing API
  window.addEventListener('load', () => {
    const navTiming = window.performance.timing;
    const loadTime = navTiming.loadEventEnd - navTiming.navigationStart;
    const domContentLoadedTime = navTiming.domContentLoadedEventEnd - navTiming.navigationStart;
    const firstPaintTime = navTiming.responseEnd - navTiming.navigationStart;

    // Log to analytics
    logAnalyticsEvent('page_load_performance', {
      page_name: pageName,
      load_time_ms: loadTime,
      dom_content_loaded_ms: domContentLoadedTime,
      first_paint_ms: firstPaintTime,
    });

    // Log warning if load time exceeds threshold
    const maxLoadTime = parseInt(process.env.NEXT_PUBLIC_MAX_LOAD_TIME || '3000');
    if (loadTime > maxLoadTime) {
      console.warn(`⚠️ Page load time (${loadTime}ms) exceeded threshold (${maxLoadTime}ms)`);
    }
  });
}

/**
 * Track API performance
 */
export async function trackAPICall<T>(
  apiName: string,
  apiCall: () => Promise<T>
): Promise<T> {
  const trace = await startTrace(`api_${apiName}`);
  const startTime = performance?.now() || 0;

  try {
    const result = await apiCall();

    if (trace) {
      const endTime = performance?.now() || 0;
      const duration = endTime - startTime;

      trackMetric(trace, 'duration_ms', duration);
      trackAttribute(trace, 'api_name', apiName);
      trackAttribute(trace, 'success', 'true');

      // Log warning if API call exceeds threshold
      const maxApiTime = parseInt(process.env.NEXT_PUBLIC_MAX_API_RESPONSE || '1000');
      if (duration > maxApiTime) {
        console.warn(`⚠️ API call ${apiName} (${duration}ms) exceeded threshold (${maxApiTime}ms)`);
      }
    }

    return result;
  } catch (error) {
    if (trace) {
      trackAttribute(trace, 'success', 'false');
      trackAttribute(trace, 'error', String(error));
    }
    throw error;
  } finally {
    stopTrace(trace);
  }
}

export default {
  initializePerformance,
  startTrace,
  stopTrace,
  trackMetric,
  trackAttribute,
  logAnalyticsEvent,
  trackPageLoadPerformance,
  trackAPICall,
  usePerformanceMonitoring,
};