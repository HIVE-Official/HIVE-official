// Activity tracking utility for logging user interactions
// This can be imported and used throughout the platform

import React from 'react';

interface ActivityTrackingOptions {
  userId: string;
  type: 'space_visit' | 'tool_interaction' | 'content_creation' | 'social_interaction' | 'session_start' | 'session_end';
  spaceId?: string;
  toolId?: string;
  contentId?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

class ActivityTracker {
  private static instance: ActivityTracker;
  private baseUrl: string;
  private sessionStartTime: number | null = null;
  private currentSpaceId: string | null = null;
  private spaceVisitStart: number | null = null;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  static getInstance(): ActivityTracker {
    if (!ActivityTracker.instance) {
      ActivityTracker.instance = new ActivityTracker();
    }
    return ActivityTracker.instance;
  }

  // Track an activity event
  async trackActivity(options: ActivityTrackingOptions): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        console.warn('Failed to track activity:', response.statusText);
      }
    } catch (error) {
      console.warn('Error tracking activity:', error);
    }
  }

  // Session tracking
  startSession(userId: string): void {
    this.sessionStartTime = Date.now();
    this.trackActivity({
      userId,
      type: 'session_start'
    });
  }

  endSession(userId: string): void {
    if (this.sessionStartTime) {
      const duration = Math.round((Date.now() - this.sessionStartTime) / 1000);
      this.trackActivity({
        userId,
        type: 'session_end',
        duration
      });
    }
    this.sessionStartTime = null;
  }

  // Space tracking
  enterSpace(userId: string, spaceId: string): void {
    // End previous space visit if exists
    if (this.currentSpaceId && this.spaceVisitStart) {
      this.exitSpace(userId);
    }

    this.currentSpaceId = spaceId;
    this.spaceVisitStart = Date.now();
    
    this.trackActivity({
      userId,
      type: 'space_visit',
      spaceId,
      metadata: { action: 'enter' }
    });
  }

  exitSpace(userId: string): void {
    if (this.currentSpaceId && this.spaceVisitStart) {
      const duration = Math.round((Date.now() - this.spaceVisitStart) / 1000);
      
      this.trackActivity({
        userId,
        type: 'space_visit',
        spaceId: this.currentSpaceId,
        duration,
        metadata: { action: 'exit' }
      });
    }
    
    this.currentSpaceId = null;
    this.spaceVisitStart = null;
  }

  // Tool interaction tracking
  trackToolInteraction(userId: string, toolId: string, spaceId?: string, metadata?: Record<string, unknown>): void {
    this.trackActivity({
      userId,
      type: 'tool_interaction',
      toolId,
      spaceId,
      metadata
    });
  }

  // Content creation tracking
  trackContentCreation(userId: string, contentId: string, spaceId?: string, metadata?: Record<string, unknown>): void {
    this.trackActivity({
      userId,
      type: 'content_creation',
      contentId,
      spaceId,
      metadata
    });
  }

  // Social interaction tracking
  trackSocialInteraction(userId: string, spaceId?: string, metadata?: Record<string, unknown>): void {
    this.trackActivity({
      userId,
      type: 'social_interaction',
      spaceId,
      metadata
    });
  }

  // Batch tracking for multiple events
  async trackBatch(events: ActivityTrackingOptions[]): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/activity/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        console.warn('Failed to track batch activities:', response.statusText);
      }
    } catch (error) {
      console.warn('Error tracking batch activities:', error);
    }
  }
}

// Export singleton instance
export const activityTracker = ActivityTracker.getInstance();

// React hooks for easy integration
export function useActivityTracker() {
  return activityTracker;
}

// Higher-order component for automatic space tracking
export function withSpaceTracking<T extends { spaceId: string }>(
  Component: React.ComponentType<T>
) {
  return function TrackedComponent(props: T) {
    const tracker = useActivityTracker();
    
    React.useEffect(() => {
      // This would need to be implemented with auth context
      // const { user } = useAuth();
      // if (user && props.spaceId) {
      //   tracker.enterSpace(user.uid, props.spaceId);
      //   return () => tracker.exitSpace(user.uid);
      // }
    }, [props.spaceId, tracker]);

    return <Component {...props} />;
  };
}

// Utility functions for common tracking scenarios
export const trackingUtils = {
  // Track page views
  trackPageView: (userId: string, page: string, metadata?: Record<string, unknown>) => {
    activityTracker.trackActivity({
      userId,
      type: 'social_interaction',
      metadata: { action: 'page_view', page, ...metadata }
    });
  },

  // Track button clicks
  trackButtonClick: (userId: string, buttonId: string, spaceId?: string, metadata?: Record<string, unknown>) => {
    activityTracker.trackActivity({
      userId,
      type: 'social_interaction',
      spaceId,
      metadata: { action: 'button_click', buttonId, ...metadata }
    });
  },

  // Track form submissions
  trackFormSubmission: (userId: string, formType: string, spaceId?: string, metadata?: Record<string, unknown>) => {
    activityTracker.trackActivity({
      userId,
      type: 'content_creation',
      spaceId,
      metadata: { action: 'form_submission', formType, ...metadata }
    });
  },

  // Track search queries
  trackSearch: (userId: string, query: string, results: number, metadata?: Record<string, unknown>) => {
    activityTracker.trackActivity({
      userId,
      type: 'social_interaction',
      metadata: { action: 'search', query, results, ...metadata }
    });
  }
};

export default ActivityTracker;