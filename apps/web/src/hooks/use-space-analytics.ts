import { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/lib/auth-utils';
import { logger } from '@/lib/structured-logger';

export interface SpaceAnalytics {
  contentData?: {
    postsThisWeek?: number;
    averageEngagement?: number;
    totalPosts?: number;
    contentGrowthRate?: number;
    totalReactions?: number;
    totalComments?: number;
    uniquePosters?: number;
  };
  
  membershipData?: {
    totalMembers?: number;
    activeMembers?: number;
    newMembers?: number;
    averageEngagement?: number;
    healthScore?: number;
    activity?: string;
    engagement?: string;
    growth?: string;
    retention?: string;
    retentionRate?: number;
  };
  
  eventsData?: {
    upcomingEvents?: number;
    totalEvents?: number;
    averageAttendance?: number;
    totalAttendance?: number;
    eventsWithAttendees?: number;
  };
  
  toolsData?: {
    activeTools?: number;
    toolUsage?: number;
    topTools?: string[];
  };
  
  resourcesData?: {
    items?: number;
    totalViews?: number;
    mostViewed?: string | null;
  };
  
  overallHealth?: number;
  activity?: Record<string, number>;
  
  metrics?: {
    daily?: {
      posts?: number;
      activeUsers?: number;
    };
    weekly?: {
      posts?: number;
      activeUsers?: number;
      newMembers?: number;
    };
    monthly?: {
      posts?: number;
      events?: number;
      members?: number;
    };
  };
  
  alerts?: Array<{
    type: 'warning' | 'info' | 'error';
    message: string;
  }>;
  
  recommendations?: string[];
}

interface UseSpaceAnalyticsResult {
  analytics: SpaceAnalytics | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useSpaceAnalytics(
  spaceId: string | undefined,
  enabled: boolean = true
): UseSpaceAnalyticsResult {
  const [analytics, setAnalytics] = useState<SpaceAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnalytics = async () => {
    if (!spaceId || !enabled) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/analytics`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalytics(data.analytics || null);

      logger.info('Fetched space analytics', { 
        spaceId,
        healthScore: data.analytics?.overallHealth 
      });
    } catch (err) {
      logger.error('Error fetching space analytics', { 
        error: err, 
        spaceId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      
      // Set default/fallback analytics on error
      setAnalytics({
        contentData: {
          postsThisWeek: 0,
          averageEngagement: 0,
          totalPosts: 0,
          contentGrowthRate: 0,
          totalReactions: 0,
          totalComments: 0,
          uniquePosters: 0
        },
        membershipData: {
          totalMembers: 0,
          activeMembers: 0,
          newMembers: 0,
          averageEngagement: 0,
          healthScore: 0,
          activity: 'Unknown',
          engagement: 'Unknown',
          growth: 'Unknown',
          retention: 'Unknown',
          retentionRate: 0
        },
        eventsData: {
          upcomingEvents: 0,
          totalEvents: 0,
          averageAttendance: 0,
          totalAttendance: 0,
          eventsWithAttendees: 0
        },
        toolsData: {
          activeTools: 0,
          toolUsage: 0,
          topTools: []
        },
        resourcesData: {
          items: 0,
          totalViews: 0,
          mostViewed: null
        },
        overallHealth: 0,
        activity: {},
        alerts: [],
        recommendations: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Refresh analytics every 5 minutes if enabled
    if (enabled) {
      const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [spaceId, enabled]);

  return {
    analytics,
    loading,
    error,
    refresh: fetchAnalytics
  };
}

// Helper function to format analytics values
export function formatAnalyticsValue(value: number | undefined, type: 'percentage' | 'number' = 'number'): string {
  if (value === undefined || value === null) return 'N/A';
  
  if (type === 'percentage') {
    return `${value}%`;
  }
  
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  
  return value.toString();
}

// Helper function to get health color
export function getHealthColor(score: number): string {
  if (score >= 8) return 'text-green-400';
  if (score >= 6) return 'text-yellow-400';
  if (score >= 4) return 'text-orange-400';
  return 'text-red-400';
}

// Helper function to get growth icon
export function getGrowthIcon(rate: number): string {
  if (rate > 10) return '📈';
  if (rate > 0) return '➡️';
  if (rate === 0) return '➖';
  return '📉';
}