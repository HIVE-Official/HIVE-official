"use client";

import { useCallback, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { useUnifiedAuth } from '@hive/ui';
import { authenticatedFetch } from '@/lib/api/api-client';

export type ActivityEventType = 
  | 'profile_view'
  | 'space_join'
  | 'space_leave'
  | 'post_create'
  | 'post_like'
  | 'post_comment'
  | 'post_share'
  | 'tool_use'
  | 'tool_create'
  | 'event_attend'
  | 'connection_request'
  | 'connection_accept'
  | 'search_perform'
  | 'page_view';

interface ActivityEventData {
  spaceId?: string;
  postId?: string;
  toolId?: string;
  eventId?: string;
  targetUserId?: string;
  searchQuery?: string;
  pageUrl?: string;
  metadata?: Record<string, any>;
}

interface UseActivityTrackerOptions {
  enabled?: boolean;
  debounceMs?: number;
}

/**
 * Hook to track user activity events for analytics
 * Automatically sends events to Firebase for aggregation
 */
export function useActivityTracker(options: UseActivityTrackerOptions = {}) {
  const { user } = useUnifiedAuth();
  const { enabled = true, debounceMs = 1000 } = options;
  
  // Track an activity event
  const trackEvent = useCallback(async (
    eventType: ActivityEventType,
    eventData?: ActivityEventData
  ) => {
    if (!enabled || !user?.id) return;
    
    try {
      // Send to analytics API
      await authenticatedFetch('/api/profile/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          eventData: {
            ...eventData,
            timestamp: new Date().toISOString(),
            sessionId: getSessionId(),
            deviceType: getDeviceType()
          }
        })
      });
      
      // Also track specific events for real-time updates
      if (eventType === 'space_join' && eventData?.spaceId) {
        await updateSpaceActivity(eventData.spaceId, 'join');
      } else if (eventType === 'post_create' && eventData?.spaceId) {
        await updateSpaceActivity(eventData.spaceId, 'post');
      }
    } catch (error) {
      logger.error('Failed to track event:', { error: String(error) });
    }
  }, [enabled, user?.id]);
  
  // Track page views automatically
  useEffect(() => {
    if (!enabled || !user?.id) return;
    
    const trackPageView = () => {
      trackEvent('page_view', {
        pageUrl: window.location.pathname,
        metadata: {
          referrer: document.referrer,
          title: document.title
        }
      });
    };
    
    // Track initial page view
    trackPageView();
    
    // Track route changes
    const handleRouteChange = () => {
      trackPageView();
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [enabled, user?.id, trackEvent]);
  
  // Track time spent on page
  useEffect(() => {
    if (!enabled || !user?.id) return;
    
    const startTime = Date.now();
    const pageUrl = window.location.pathname;
    
    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      // Only track if spent more than 3 seconds
      if (timeSpent > 3) {
        navigator.sendBeacon('/api/analytics/time', JSON.stringify({
          userId: user.id,
          pageUrl,
          timeSpent,
          timestamp: new Date().toISOString()
        }));
      }
    };
    
    // Track when leaving page
    window.addEventListener('beforeunload', trackTimeSpent);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackTimeSpent();
      }
    });
    
    return () => {
      window.removeEventListener('beforeunload', trackTimeSpent);
    };
  }, [enabled, user?.id]);
  
  // Helper function to update space-specific activity
  const updateSpaceActivity = async (spaceId: string, action: string) => {
    try {
      await authenticatedFetch(`/api/spaces/${spaceId}/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
    } catch (error) {
      logger.error('Failed to update space activity:', { error: String(error) });
    }
  };
  
  // Convenience methods for common events
  const trackProfileView = useCallback((profileId: string) => {
    trackEvent('profile_view', { targetUserId: profileId });
  }, [trackEvent]);
  
  const trackSpaceJoin = useCallback((spaceId: string) => {
    trackEvent('space_join', { spaceId });
  }, [trackEvent]);
  
  const trackPostInteraction = useCallback((
    postId: string,
    interaction: 'like' | 'comment' | 'share',
    spaceId?: string
  ) => {
    const eventType = `post_${interaction}` as ActivityEventType;
    trackEvent(eventType, { postId, spaceId });
  }, [trackEvent]);
  
  const trackToolUse = useCallback((toolId: string, spaceId?: string) => {
    trackEvent('tool_use', { toolId, spaceId });
  }, [trackEvent]);
  
  const trackSearch = useCallback((query: string) => {
    trackEvent('search_perform', { searchQuery: query });
  }, [trackEvent]);
  
  return {
    trackEvent,
    trackProfileView,
    trackSpaceJoin,
    trackPostInteraction,
    trackToolUse,
    trackSearch,
    isTracking: enabled && !!user?.id
  };
}

// Helper to get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('hive_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('hive_session_id', sessionId);
  }
  return sessionId;
}

// Helper to detect device type
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}