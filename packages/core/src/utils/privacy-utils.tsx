// Privacy utility functions for client-side privacy checks
// This can be imported and used throughout the platform

import React from 'react';

interface PrivacySettings {
  ghostMode: {
    enabled: boolean;
    level: 'invisible' | 'minimal' | 'selective' | 'normal';
    hideFromDirectory: boolean;
    hideActivity: boolean;
    hideSpaceMemberships: boolean;
    hideLastSeen: boolean;
    hideOnlineStatus: boolean;
  };
  profileVisibility: {
    showToSpaceMembers: boolean;
    showToFollowers: boolean;
    showToPublic: boolean;
    hideProfilePhoto: boolean;
    hideHandle: boolean;
    hideInterests: boolean;
  };
  activitySharing: {
    shareActivityData: boolean;
    shareSpaceActivity: boolean;
    shareToolUsage: boolean;
    shareContentCreation: boolean;
    allowAnalytics: boolean;
  };
}

interface VisibilityResult {
  canSeeProfile: boolean;
  canSeeActivity: boolean;
  canSeeSpaceMemberships: boolean;
  canSeeOnlineStatus: boolean;
  canSeeLastSeen: boolean;
  visibilityLevel: 'full' | 'partial' | 'minimal' | 'none';
}

class PrivacyUtils {
  private static instance: PrivacyUtils;
  private baseUrl: string;
  private cache: Map<string, unknown> = new Map();

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  static getInstance(): PrivacyUtils {
    if (!PrivacyUtils.instance) {
      PrivacyUtils.instance = new PrivacyUtils();
    }
    return PrivacyUtils.instance;
  }

  // Get user's privacy settings
  async getPrivacySettings(userId?: string): Promise<PrivacySettings | null> {
    try {
      const cacheKey = `privacy_${userId || 'current'}`;
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey) as PrivacySettings;
      }

      const response = await fetch(`${this.baseUrl}/api/privacy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json() as { settings: PrivacySettings };
      this.cache.set(cacheKey, data.settings);
      
      // Cache for 5 minutes
      setTimeout(() => {
        this.cache.delete(cacheKey);
      }, 5 * 60 * 1000);

      return data.settings;
    } catch (error) {
      console.warn('Error fetching privacy settings:', error);
      return null;
    }
  }

  // Update privacy settings
  async updatePrivacySettings(updates: Partial<PrivacySettings>): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/privacy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        // Clear cache
        this.cache.clear();
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Error updating privacy settings:', error);
      return false;
    }
  }

  // Check visibility between users
  async checkVisibility(targetUserId: string, context?: string): Promise<VisibilityResult | null> {
    try {
      const cacheKey = `visibility_${targetUserId}_${context || 'general'}`;
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey) as VisibilityResult;
      }

      const response = await fetch(`${this.baseUrl}/api/privacy/visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId,
          context: context || 'general'
        }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json() as { visibility: VisibilityResult };
      this.cache.set(cacheKey, data.visibility);
      
      // Cache for 2 minutes (shorter for visibility checks)
      setTimeout(() => {
        this.cache.delete(cacheKey);
      }, 2 * 60 * 1000);

      return data.visibility;
    } catch (error) {
      console.warn('Error checking visibility:', error);
      return null;
    }
  }

  // Batch visibility check
  async batchCheckVisibility(userIds: string[], context?: string): Promise<Record<string, VisibilityResult>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/privacy/visibility?userIds=${userIds.join(',')}&context=${context || 'general'}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {};
      }

      const data = await response.json() as { visibilityChecks: Array<{ userId: string; visibility: VisibilityResult }> };
      const results: Record<string, VisibilityResult> = {};
      
      data.visibilityChecks.forEach((check) => {
        results[check.userId] = check.visibility;
        
        // Cache individual results
        const cacheKey = `visibility_${check.userId}_${context || 'general'}`;
        this.cache.set(cacheKey, check.visibility);
      });

      return results;
    } catch (error) {
      console.warn('Error performing batch visibility check:', error);
      return {};
    }
  }

  // Ghost mode utilities
  async toggleGhostMode(enabled: boolean, level?: 'invisible' | 'minimal' | 'selective' | 'normal', duration?: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/privacy/ghost-mode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enabled,
          level,
          duration
        }),
      });

      if (response.ok) {
        // Clear cache
        this.cache.clear();
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Error toggling ghost mode:', error);
      return false;
    }
  }

  // Get ghost mode status
  async getGhostModeStatus(userId?: string): Promise<{ enabled: boolean; level: string; duration?: number } | null> {
    try {
      const cacheKey = `ghost_mode_${userId || 'current'}`;
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey) as { enabled: boolean; level: string; duration?: number };
      }

      const url = userId 
        ? `${this.baseUrl}/api/privacy/ghost-mode?userId=${userId}`
        : `${this.baseUrl}/api/privacy/ghost-mode`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json() as { enabled: boolean; level: string; duration?: number };
      this.cache.set(cacheKey, data);
      
      // Cache for 1 minute
      setTimeout(() => {
        this.cache.delete(cacheKey);
      }, 60 * 1000);

      return data;
    } catch (error) {
      console.warn('Error getting ghost mode status:', error);
      return null;
    }
  }

  // Client-side privacy filters
  filterUserData(userData: Record<string, unknown>, visibility: VisibilityResult): Record<string, unknown> | null {
    if (!visibility.canSeeProfile) {
      return null;
    }

    const filtered = { ...userData } as Record<string, unknown>;

    // Filter profile data based on visibility
    if (!visibility.canSeeOnlineStatus) {
      delete filtered.onlineStatus;
      delete filtered.isOnline;
    }

    if (!visibility.canSeeLastSeen) {
      delete filtered.lastSeen;
      delete filtered.lastActive;
    }

    if (!visibility.canSeeSpaceMemberships) {
      delete filtered.spaceMemberships;
      delete filtered.spaces;
    }

    if (!visibility.canSeeActivity) {
      delete filtered.recentActivity;
      delete filtered.activitySummary;
    }

    return filtered;
  }

  // Check if activity should be shared
  shouldShareActivity(privacySettings: PrivacySettings, activityType: string): boolean {
    if (!privacySettings) return true;

    const { activitySharing } = privacySettings;

    switch (activityType) {
      case 'space_activity':
        return activitySharing.shareSpaceActivity;
      case 'tool_usage':
        return activitySharing.shareToolUsage;
      case 'content_creation':
        return activitySharing.shareContentCreation;
      case 'general':
        return activitySharing.shareActivityData;
      default:
        return activitySharing.shareActivityData;
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const privacyUtils = PrivacyUtils.getInstance();

// React hooks for easy integration
export function usePrivacyUtils() {
  return privacyUtils;
}

// Higher-order component for privacy-aware components
export function withPrivacyCheck<T extends { userId?: string }>(
  Component: React.ComponentType<T>
) {
  return function PrivacyCheckedComponent(props: T) {
    const [visibility, setVisibility] = React.useState<VisibilityResult | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      if (props.userId) {
        privacyUtils.checkVisibility(props.userId).then(result => {
          setVisibility(result);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }, [props.userId]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (props.userId && visibility && !visibility.canSeeProfile) {
      return <div>Profile not visible</div>;
    }

    return <Component {...props} />;
  };
}

// Privacy preset configurations
export const privacyPresets = {
  open: {
    ghostMode: {
      enabled: false,
      level: 'normal' as const,
      hideFromDirectory: false,
      hideActivity: false,
      hideSpaceMemberships: false,
      hideLastSeen: false,
      hideOnlineStatus: false,
    },
    profileVisibility: {
      showToSpaceMembers: true,
      showToFollowers: true,
      showToPublic: true,
      hideProfilePhoto: false,
      hideHandle: false,
      hideInterests: false,
    },
    activitySharing: {
      shareActivityData: true,
      shareSpaceActivity: true,
      shareToolUsage: true,
      shareContentCreation: true,
      allowAnalytics: true,
    },
  },
  
  private: {
    ghostMode: {
      enabled: true,
      level: 'selective' as const,
      hideFromDirectory: false,
      hideActivity: true,
      hideSpaceMemberships: false,
      hideLastSeen: true,
      hideOnlineStatus: true,
    },
    profileVisibility: {
      showToSpaceMembers: true,
      showToFollowers: false,
      showToPublic: false,
      hideProfilePhoto: false,
      hideHandle: false,
      hideInterests: true,
    },
    activitySharing: {
      shareActivityData: false,
      shareSpaceActivity: true,
      shareToolUsage: false,
      shareContentCreation: true,
      allowAnalytics: false,
    },
  },
  
  stealth: {
    ghostMode: {
      enabled: true,
      level: 'invisible' as const,
      hideFromDirectory: true,
      hideActivity: true,
      hideSpaceMemberships: true,
      hideLastSeen: true,
      hideOnlineStatus: true,
    },
    profileVisibility: {
      showToSpaceMembers: false,
      showToFollowers: false,
      showToPublic: false,
      hideProfilePhoto: true,
      hideHandle: true,
      hideInterests: true,
    },
    activitySharing: {
      shareActivityData: false,
      shareSpaceActivity: false,
      shareToolUsage: false,
      shareContentCreation: false,
      allowAnalytics: false,
    },
  },
};

export default PrivacyUtils;