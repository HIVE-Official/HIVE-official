import { z } from "zod";
import {
  UserAnalyticsSchema,
  SpaceAnalyticsSchema,
  PlatformAnalyticsSchema,
  AnalyticsEventSchema,
  type UserAnalytics,
  type SpaceAnalytics,
  type PlatformAnalytics,
  type AnalyticsEvent
} from "@hive/validation";

// Re-export validation schemas
export {
  UserAnalyticsSchema,
  SpaceAnalyticsSchema,
  PlatformAnalyticsSchema,
  AnalyticsEventSchema,
  type UserAnalytics,
  type SpaceAnalytics,
  type PlatformAnalytics,
  type AnalyticsEvent
};

// Firestore-specific helpers
export const UserAnalyticsConverter = {
  toFirestore: (analytics: UserAnalytics) => ({
    ...analytics,
    createdAt: analytics.createdAt,
    updatedAt: analytics.updatedAt
  }),
  
  fromFirestore: (data: any): UserAnalytics => {
    return UserAnalyticsSchema.parse({
      ...data,
      createdAt: data.createdAt?.toDate?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
    });
  }
};

export const AnalyticsEventConverter = {
  toFirestore: (event: AnalyticsEvent) => ({
    ...event,
    metadata: {
      ...event.metadata,
      timestamp: event.metadata.timestamp
    },
    createdAt: event.createdAt
  }),
  
  fromFirestore: (data: any): AnalyticsEvent => {
    return AnalyticsEventSchema.parse({
      ...data,
      metadata: {
        ...data.metadata,
        timestamp: data.metadata?.timestamp?.toDate?.() || data.metadata?.timestamp
      },
      createdAt: data.createdAt?.toDate?.() || data.createdAt
    });
  }
};

// Collection paths
export const ANALYTICS_COLLECTIONS = {
  USER_ANALYTICS: (userId: string) => `users/${userId}/analytics`,
  SPACE_ANALYTICS: (spaceId: string) => `spaces/${spaceId}/analytics`,
  PLATFORM_ANALYTICS: 'platform_analytics',
  EVENTS: 'analytics_events',
  USER_EVENTS: (userId: string) => `users/${userId}/events`
} as const;

// Analytics utility functions
export const AnalyticsUtils = {
  createEvent: (
    userId: string,
    eventType: AnalyticsEvent['eventType'],
    eventData?: Record<string, any>,
    sessionId?: string
  ): Omit<AnalyticsEvent, 'createdAt'> => ({
    userId,
    sessionId: sessionId || generateSessionId(),
    eventType,
    eventData,
    metadata: {
      timestamp: new Date(),
      platform: 'web', // Default, should be determined by context
      location: {
        pathname: typeof window !== 'undefined' ? window.location.pathname : '/'
      }
    }
  }),
  
  aggregateUserMetrics: (events: AnalyticsEvent[]): Partial<UserAnalytics> => {
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter(e => 
      e.createdAt.toISOString().split('T')[0] === today
    );
    
    return {
      date: today,
      dailyActiveMinutes: calculateActiveMinutes(todayEvents),
      sessionsCount: new Set(todayEvents.map(e => e.sessionId)).size,
      postsCreated: todayEvents.filter(e => e.eventType === 'post_create').length,
      postsLiked: todayEvents.filter(e => e.eventType === 'post_like').length,
      spacesVisited: Array.from(new Set(
        todayEvents
          .filter(e => e.eventData?.spaceId)
          .map(e => e.eventData?.spaceId)
      )),
      toolsUsed: Array.from(new Set(
        todayEvents
          .filter(e => e.eventType === 'tool_use')
          .map(e => e.eventData?.toolId)
      )),
      ritualsParticipated: Array.from(new Set(
        todayEvents
          .filter(e => e.eventType === 'ritual_participate')
          .map(e => e.eventData?.ritualId)
      ))
    };
  },
  
  calculateEngagementScore: (analytics: UserAnalytics): number => {
    // Simple engagement score calculation
    const baseScore = Math.min(analytics.dailyActiveMinutes / 60, 10) * 10; // Max 100 points for 60+ minutes
    const interactionBonus = (analytics.postsCreated * 5) + (analytics.postsLiked * 1);
    const socialBonus = analytics.spacesVisited.length * 2;
    const toolBonus = analytics.toolsUsed.length * 3;
    
    return Math.min(100, baseScore + interactionBonus + socialBonus + toolBonus);
  }
};

// Helper functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function calculateActiveMinutes(events: AnalyticsEvent[]): number {
  // Group events by session and calculate active time
  const sessionEvents = events.reduce((acc, event) => {
    if (!acc[event.sessionId]) acc[event.sessionId] = [];
    acc[event.sessionId].push(event);
    return acc;
  }, {} as Record<string, AnalyticsEvent[]>);
  
  let totalMinutes = 0;
  
  Object.values(sessionEvents).forEach(sessionEventList => {
    if (sessionEventList.length < 2) return;
    
    const sortedEvents = sessionEventList.sort((a, b) => 
      a.metadata.timestamp.getTime() - b.metadata.timestamp.getTime()
    );
    
    const sessionStart = sortedEvents[0].metadata.timestamp;
    const sessionEnd = sortedEvents[sortedEvents.length - 1].metadata.timestamp;
    const sessionDuration = (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60);
    
    // Cap session duration at 4 hours to avoid inflated metrics
    totalMinutes += Math.min(sessionDuration, 240);
  });
  
  return Math.round(totalMinutes);
}