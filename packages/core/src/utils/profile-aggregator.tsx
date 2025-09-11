// Profile data aggregation utility
// This utility helps aggregate data from multiple profile endpoints for efficient loading

import React from 'react';

interface ProfileAggregatorOptions {
  includeSpaces?: boolean;
  includeActivity?: boolean;
  includeCalendar?: boolean;
  includePrivacy?: boolean;
  includeStats?: boolean;
  timeRange?: 'week' | 'month' | 'semester' | 'year' | 'all';
}

interface AggregatedProfileData {
  dashboard: Record<string, unknown> | null;
  spaces: Record<string, unknown> | null;
  calendar: Record<string, unknown> | null;
  activity: Record<string, unknown> | null;
  privacy: Record<string, unknown> | null;
  stats: Record<string, unknown> | null;
  metadata: {
    loadTime: number;
    endpoints: string[];
    timeRange: string;
    generatedAt: string;
  };
}

class ProfileAggregator {
  private static instance: ProfileAggregator;
  private baseUrl: string;
  private cache: Map<string, unknown> = new Map();

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  static getInstance(): ProfileAggregator {
    if (!ProfileAggregator.instance) {
      ProfileAggregator.instance = new ProfileAggregator();
    }
    return ProfileAggregator.instance;
  }

  // Aggregate all profile data in one call
  async aggregateProfileData(options: ProfileAggregatorOptions = {}): Promise<AggregatedProfileData> {
    const startTime = Date.now();
    const {
      includeSpaces = true,
      includeActivity = true,
      includeCalendar = true,
      includePrivacy = false,
      includeStats = false,
      timeRange = 'week'
    } = options;

    const endpoints: string[] = [];
    const requests: Promise<Record<string, unknown>>[] = [];

    // Always include dashboard
    endpoints.push('/api/profile/dashboard');
    requests.push(this.fetchWithCache('/api/profile/dashboard', { timeRange }));

    // Conditionally include other endpoints
    if (includeSpaces) {
      endpoints.push('/api/profile/spaces');
      requests.push(this.fetchWithCache('/api/profile/spaces', { 
        includeActivity: 'true',
        includeStats: 'true',
        timeRange 
      }));
    }

    if (includeCalendar) {
      endpoints.push('/api/calendar');
      requests.push(this.fetchWithCache('/api/calendar', { 
        includeSpaceEvents: 'true',
        startDate: this.getDateRange(timeRange).start,
        endDate: this.getDateRange(timeRange).end
      }));
    }

    if (includeActivity) {
      endpoints.push('/api/activity');
      requests.push(this.fetchWithCache('/api/activity', { 
        timeRange,
        includeDetails: 'true'
      }));
    }

    if (includePrivacy) {
      endpoints.push('/api/privacy');
      requests.push(this.fetchWithCache('/api/privacy'));
    }

    if (includeStats) {
      endpoints.push('/api/profile/stats');
      requests.push(this.fetchWithCache('/api/profile/stats', { 
        timeRange,
        includeComparisons: 'true'
      }));
    }

    try {
      const results = await Promise.all(requests);
      const loadTime = Date.now() - startTime;

      const aggregatedData: AggregatedProfileData = {
        dashboard: results[0],
        spaces: includeSpaces ? results[1] : null,
        calendar: includeCalendar ? results[includeSpaces ? 2 : 1] : null,
        activity: includeActivity ? results[this.getResultIndex(includeSpaces, includeCalendar)] : null,
        privacy: includePrivacy ? results[this.getResultIndex(includeSpaces, includeCalendar, includeActivity)] : null,
        stats: includeStats ? results[this.getResultIndex(includeSpaces, includeCalendar, includeActivity, includePrivacy)] : null,
        metadata: {
          loadTime,
          endpoints,
          timeRange,
          generatedAt: new Date().toISOString()
        }
      };

      return aggregatedData;
    } catch (error) {
      console.error('Error aggregating profile data:', error);
      throw error;
    }
  }

  // Fetch dashboard data only (lightweight)
  async getDashboard(timeRange: string = 'week'): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/profile/dashboard', { timeRange });
  }

  // Fetch space data with activity
  async getSpacesWithActivity(timeRange: string = 'week'): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/profile/spaces', { 
      includeActivity: 'true',
      includeStats: 'true',
      timeRange 
    });
  }

  // Fetch calendar events
  async getCalendarEvents(startDate?: string, endDate?: string): Promise<Record<string, unknown>> {
    const params: Record<string, string> = { includeSpaceEvents: 'true' };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return this.fetchWithCache('/api/calendar', params);
  }

  // Fetch activity analytics
  async getActivityAnalytics(timeRange: string = 'week'): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/activity', { 
      timeRange,
      includeDetails: 'true'
    });
  }

  // Fetch advanced activity insights
  async getActivityInsights(timeRange: string = 'week'): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/activity/insights', { 
      timeRange,
      analysisType: 'comprehensive'
    });
  }

  // Fetch privacy settings
  async getPrivacySettings(): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/privacy');
  }

  // Fetch detailed statistics
  async getDetailedStats(timeRange: string = 'month'): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/profile/stats', { 
      timeRange,
      includeComparisons: 'true'
    });
  }

  // Fetch space recommendations
  async getSpaceRecommendations(type: string = 'all', limit: number = 10): Promise<Record<string, unknown>> {
    return this.fetchWithCache('/api/profile/spaces/recommendations', { 
      type,
      limit: limit.toString()
    });
  }

  // Batch update profile data
  async batchUpdateProfile(updates: {
    privacy?: Record<string, unknown>;
    preferences?: Record<string, unknown>;
    spaceActions?: Array<{
      spaceId: string;
      action: string;
      value?: unknown;
    }>;
  }): Promise<Record<string, unknown>[]> {
    const results = [];

    if (updates.privacy) {
      results.push(await this.updatePrivacySettings(updates.privacy));
    }

    if (updates.spaceActions) {
      const spaceActionPromises = updates.spaceActions.map(action => 
        this.performSpaceAction(action.spaceId, action.action, action.value)
      );
      results.push(...await Promise.all(spaceActionPromises));
    }

    // Clear relevant caches
    this.clearCache();

    return results;
  }

  // Helper method to update privacy settings
  private async updatePrivacySettings(settings: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.baseUrl}/api/privacy`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (!response.ok) {
      throw new Error(`Failed to update privacy settings: ${response.statusText}`);
    }

    return response.json() as Promise<Record<string, unknown>>;
  }

  // Helper method to perform space actions
  private async performSpaceAction(spaceId: string, action: string, value?: unknown): Promise<Record<string, unknown>> {
    const response = await fetch(`${this.baseUrl}/api/profile/spaces/actions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ spaceId, type: action, value })
    });

    if (!response.ok) {
      throw new Error(`Failed to perform space action: ${response.statusText}`);
    }

    return response.json() as Promise<Record<string, unknown>>;
  }

  // Helper method to fetch with caching
  private async fetchWithCache(endpoint: string, params: Record<string, string> = {}): Promise<Record<string, unknown>> {
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Record<string, unknown>;
    }

    const url = `${this.baseUrl}${endpoint}?${new URLSearchParams(params).toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json() as Record<string, unknown>;
    
    // Cache for 2 minutes
    this.cache.set(cacheKey, data);
    setTimeout(() => {
      this.cache.delete(cacheKey);
    }, 2 * 60 * 1000);

    return data;
  }

  // Helper method to calculate date range
  private getDateRange(timeRange: string): { start: string; end: string } {
    const end = new Date();
    const start = new Date();

    switch (timeRange) {
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'semester':
        start.setMonth(end.getMonth() - 4);
        break;
      case 'year':
        start.setFullYear(end.getFullYear() - 1);
        break;
      case 'all':
        start.setFullYear(end.getFullYear() - 2);
        break;
    }

    return {
      start: start.toISOString(),
      end: end.toISOString()
    };
  }

  // Helper method to get result index based on included options
  private getResultIndex(...includes: boolean[]): number {
    return includes.filter(Boolean).length;
  }

  // Clear all cached data
  clearCache(): void {
    this.cache.clear();
  }

  // Preload profile data for better performance
  async preloadProfileData(options: ProfileAggregatorOptions = {}): Promise<void> {
    try {
      await this.aggregateProfileData(options);
    } catch (error) {
      console.warn('Failed to preload profile data:', error);
    }
  }
}

// Export singleton instance
export const profileAggregator = ProfileAggregator.getInstance();

// React hooks for easy integration
export function useProfileAggregator() {
  return profileAggregator;
}

// Higher-order component for profile data
export function withProfileData<T>(
  Component: React.ComponentType<T & { profileData: AggregatedProfileData }>
) {
  return function ProfileDataComponent(props: T) {
    const [profileData, setProfileData] = React.useState<AggregatedProfileData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
      profileAggregator.aggregateProfileData()
        .then(data => {
          setProfileData(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <div>Loading profile data...</div>;
    }

    if (error) {
      return <div>Error loading profile: {error}</div>;
    }

    if (!profileData) {
      return <div>No profile data available</div>;
    }

    return <Component {...props} profileData={profileData} />;
  };
}

// Utility functions for profile data processing
export const profileUtils = {
  // Calculate engagement score
  calculateEngagementScore: (profileData: AggregatedProfileData): number => {
    const dashboard = profileData.dashboard as { dashboard?: { summary?: Record<string, number> } };
    const summaryData = dashboard?.dashboard?.summary;
    if (!summaryData) return 0;

    const timeWeight = Math.min((summaryData.weeklyActivity || 0) / 120, 1) * 30; // Max 30 points for 2 hours
    const spaceWeight = Math.min((summaryData.activeSpaces || 0) / 5, 1) * 25; // Max 25 points for 5 spaces
    const contentWeight = Math.min((summaryData.contentCreated || 0) / 10, 1) * 25; // Max 25 points for 10 content
    const socialWeight = Math.min((summaryData.socialInteractions || 0) / 20, 1) * 20; // Max 20 points for 20 interactions

    return Math.round(timeWeight + spaceWeight + contentWeight + socialWeight);
  },

  // Get activity trend
  getActivityTrend: (profileData: AggregatedProfileData): 'up' | 'down' | 'stable' => {
    const activity = profileData.activity as { analytics?: { totalTimeSpent?: number } };
    const analyticsData = activity?.analytics;
    if (!analyticsData) return 'stable';

    // Simple trend calculation - would be more sophisticated in real implementation
    const recent = analyticsData.totalTimeSpent || 0;
    const baseline = 60; // 1 hour baseline

    if (recent > baseline * 1.1) return 'up';
    if (recent < baseline * 0.9) return 'down';
    return 'stable';
  },

  // Format time spent
  formatTimeSpent: (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  },

  // Get top spaces
  getTopSpaces: (profileData: AggregatedProfileData, limit: number = 3): Array<Record<string, unknown>> => {
    const spaces = (profileData.spaces as { memberships?: Array<Record<string, unknown>> })?.memberships || [];
    return spaces
      .filter((space: any) => (space.status as string) === 'active')
      .sort((a, b) => {
        const aTime = ((a.recentActivity as Record<string, unknown>)?.timeSpent as number) || 0;
        const bTime = ((b.recentActivity as Record<string, unknown>)?.timeSpent as number) || 0;
        return bTime - aTime;
      })
      .slice(0, limit);
  }
};

export default ProfileAggregator;