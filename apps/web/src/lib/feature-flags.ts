import { dbAdmin } from './firebase-admin';
import { logger } from './structured-logger';

/**
 * Feature Flag System for HIVE Platform
 * Provides granular control over platform features with real-time updates
 */

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'experimental' | 'infrastructure' | 'ui_ux' | 'tools' | 'spaces' | 'admin';
  enabled: boolean;
  rollout: {
    type: 'all' | 'percentage' | 'users' | 'schools' | 'ab_test';
    percentage?: number; // For percentage rollouts (0-100)
    targetUsers?: string[]; // Specific user IDs
    targetSchools?: string[]; // School domains or IDs
    abTestGroups?: {
      [groupName: string]: {
        percentage: number;
        config?: any;
      };
    };
  };
  config?: any; // Additional configuration for the feature
  conditions?: {
    userRole?: string[]; // Required user roles
    spaceType?: string[]; // Required space types
    userCount?: { min?: number; max?: number }; // User count conditions
    timeWindow?: {
      start: string; // ISO timestamp
      end: string; // ISO timestamp
    };
  };
  metadata: {
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
  };
  analytics?: {
    trackingEnabled: boolean;
    events: string[]; // Event names to track
  };
}

export interface UserFeatureContext {
  userId: string;
  userRole?: string;
  schoolId?: string;
  spaceIds?: string[];
  metadata?: any;
}

export interface FeatureFlagResult {
  enabled: boolean;
  config?: any;
  reason?: string;
  abTestGroup?: string;
}

export class FeatureFlagService {
  private flagsCache: Map<string, FeatureFlag> = new Map();
  private lastCacheUpdate = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Check if a feature is enabled for a specific user context
   */
  async isFeatureEnabled(
    flagId: string, 
    userContext: UserFeatureContext
  ): Promise<FeatureFlagResult> {
    try {
      await this.refreshCacheIfNeeded();
      
      const flag = this.flagsCache.get(flagId);
      if (!flag) {
        logger.warn('Feature flag not found', { flagId, userId: userContext.userId });
        return { enabled: false, reason: 'flag_not_found' };
      }

      // Check if flag is globally disabled
      if (!flag.enabled) {
        return { enabled: false, reason: 'globally_disabled' };
      }

      // Check time window conditions
      if (flag.conditions?.timeWindow) {
        const now = new Date();
        const start = new Date(flag.conditions.timeWindow.start);
        const end = new Date(flag.conditions.timeWindow.end);
        
        if (now < start || now > end) {
          return { enabled: false, reason: 'outside_time_window' };
        }
      }

      // Check user role conditions
      if (flag.conditions?.userRole && userContext.userRole) {
        if (!flag.conditions.userRole.includes(userContext.userRole)) {
          return { enabled: false, reason: 'role_not_matched' };
        }
      }

      // Check rollout rules
      const rolloutResult = this.evaluateRollout(flag, userContext);
      
      // Track feature flag evaluation if analytics is enabled
      if (flag.analytics?.trackingEnabled) {
        await this.trackFeatureFlagEvaluation(flagId, userContext, rolloutResult);
      }

      return rolloutResult;
    } catch (error) {
      logger.error('Error evaluating feature flag', { error: error instanceof Error ? error : new Error(String(error)), flagId, userId: userContext.userId });
      return { enabled: false, reason: 'evaluation_error' };
    }
  }

  /**
   * Get multiple feature flags for a user
   */
  async getUserFeatureFlags(
    flagIds: string[], 
    userContext: UserFeatureContext
  ): Promise<Record<string, FeatureFlagResult>> {
    const results: Record<string, FeatureFlagResult> = {};
    
    for (const flagId of flagIds) {
      results[flagId] = await this.isFeatureEnabled(flagId, userContext);
    }
    
    return results;
  }

  /**
   * Get all feature flags for a category
   */
  async getCategoryFeatureFlags(
    category: FeatureFlag['category'], 
    userContext: UserFeatureContext
  ): Promise<Record<string, FeatureFlagResult>> {
    await this.refreshCacheIfNeeded();
    
    const categoryFlags = Array.from(this.flagsCache.values())
      .filter(flag => flag.category === category);
    
    const results: Record<string, FeatureFlagResult> = {};
    
    for (const flag of categoryFlags) {
      results[flag.id] = await this.isFeatureEnabled(flag.id, userContext);
    }
    
    return results;
  }

  /**
   * Create or update a feature flag (admin only)
   */
  async setFeatureFlag(flag: Omit<FeatureFlag, 'metadata'>, adminUserId: string): Promise<void> {
    try {
      const now = new Date().toISOString();
      const existingFlag = await this.getFeatureFlag(flag.id);
      
      const fullFlag: FeatureFlag = {
        ...flag,
        metadata: {
          createdAt: existingFlag?.metadata.createdAt || now,
          createdBy: existingFlag?.metadata.createdBy || adminUserId,
          updatedAt: now,
          updatedBy: adminUserId,
          version: (existingFlag?.metadata.version || 0) + 1
        }
      };

      await dbAdmin.collection('featureFlags').doc(flag.id).set(fullFlag);
      
      // Update cache
      this.flagsCache.set(flag.id, fullFlag);
      
      logger.info('Feature flag updated', { 
        flagId: flag.id, 
        adminUserId, 
        enabled: flag.enabled,
        category: flag.category 
      });
    } catch (error) {
      logger.error('Error setting feature flag', { error: error instanceof Error ? error : new Error(String(error)), flagId: flag.id, adminUserId });
      throw error;
    }
  }

  /**
   * Delete a feature flag (admin only)
   */
  async deleteFeatureFlag(flagId: string, adminUserId: string): Promise<void> {
    try {
      await dbAdmin.collection('featureFlags').doc(flagId).delete();
      this.flagsCache.delete(flagId);
      
      logger.info('Feature flag deleted', { flagId, adminUserId });
    } catch (error) {
      logger.error('Error deleting feature flag', { error: error instanceof Error ? error : new Error(String(error)), flagId, adminUserId });
      throw error;
    }
  }

  /**
   * Get a specific feature flag (admin only)
   */
  async getFeatureFlag(flagId: string): Promise<FeatureFlag | null> {
    try {
      const flagDoc = await dbAdmin.collection('featureFlags').doc(flagId).get();
      if (!flagDoc.exists) {
        return null;
      }
      return { id: flagDoc.id, ...flagDoc.data() } as FeatureFlag;
    } catch (error) {
      logger.error('Error getting feature flag', { error: error instanceof Error ? error : new Error(String(error)), flagId });
      return null;
    }
  }

  /**
   * List all feature flags (admin only)
   */
  async getAllFeatureFlags(): Promise<FeatureFlag[]> {
    try {
      const flagsSnapshot = await dbAdmin.collection('featureFlags').get();
      return flagsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FeatureFlag[];
    } catch (error) {
      logger.error('Error getting all feature flags', { error: error instanceof Error ? error : new Error(String(error)) });
      return [];
    }
  }

  /**
   * Get feature flag analytics
   */
  async getFeatureFlagAnalytics(flagId: string, timeRange?: { start: string; end: string }): Promise<any> {
    try {
      let query = dbAdmin.collection('featureFlagAnalytics')
        .where('flagId', '==', flagId);

      if (timeRange) {
        query = query
          .where('timestamp', '>=', timeRange.start)
          .where('timestamp', '<=', timeRange.end);
      }

      const analyticsSnapshot = await query.get();
      const analytics = analyticsSnapshot.docs.map(doc => doc.data());

      // Aggregate analytics data
      const enabledCount = analytics.filter(a => a.result.enabled).length;
      const totalCount = analytics.length;
      const enablementRate = totalCount > 0 ? (enabledCount / totalCount) * 100 : 0;

      const reasonCounts = analytics.reduce((acc, a) => {
        const reason = a.result.reason || 'enabled';
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        flagId,
        totalEvaluations: totalCount,
        enabledEvaluations: enabledCount,
        enablementRate,
        reasonBreakdown: reasonCounts,
        timeRange
      };
    } catch (error) {
      logger.error('Error getting feature flag analytics', { error: error instanceof Error ? error : new Error(String(error)), flagId });
      return null;
    }
  }

  /**
   * Private method to evaluate rollout rules
   */
  private evaluateRollout(flag: FeatureFlag, userContext: UserFeatureContext): FeatureFlagResult {
    const { rollout } = flag;

    switch (rollout.type) {
      case 'all':
        return { enabled: true, config: flag.config, reason: 'rollout_all' };

      case 'users':
        if (rollout.targetUsers?.includes(userContext.userId)) {
          return { enabled: true, config: flag.config, reason: 'user_targeted' };
        }
        return { enabled: false, reason: 'user_not_targeted' };

      case 'schools':
        if (userContext.schoolId && rollout.targetSchools?.includes(userContext.schoolId)) {
          return { enabled: true, config: flag.config, reason: 'school_targeted' };
        }
        return { enabled: false, reason: 'school_not_targeted' };

      case 'percentage':
        if (rollout.percentage !== undefined) {
          const hash = this.hashString(flag.id + userContext.userId);
          const percentage = hash % 100;
          if (percentage < rollout.percentage) {
            return { enabled: true, config: flag.config, reason: 'percentage_included' };
          }
        }
        return { enabled: false, reason: 'percentage_excluded' };

      case 'ab_test':
        if (rollout.abTestGroups) {
          const hash = this.hashString(flag.id + userContext.userId);
          let cumulativePercentage = 0;
          
          for (const [groupName, groupConfig] of Object.entries(rollout.abTestGroups)) {
            cumulativePercentage += groupConfig.percentage;
            if (hash % 100 < cumulativePercentage) {
              return { 
                enabled: true, 
                config: { ...flag.config, ...groupConfig.config },
                reason: 'ab_test_included',
                abTestGroup: groupName
              };
            }
          }
        }
        return { enabled: false, reason: 'ab_test_excluded' };

      default:
        return { enabled: false, reason: 'unknown_rollout_type' };
    }
  }

  /**
   * Simple hash function for consistent percentage rollouts
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Refresh cache if needed
   */
  private async refreshCacheIfNeeded(): Promise<void> {
    const now = Date.now();
    if (now - this.lastCacheUpdate > this.CACHE_TTL) {
      await this.refreshCache();
    }
  }

  /**
   * Refresh the feature flags cache
   */
  private async refreshCache(): Promise<void> {
    try {
      const flags = await this.getAllFeatureFlags();
      this.flagsCache.clear();
      
      for (const flag of flags) {
        this.flagsCache.set(flag.id, flag);
      }
      
      this.lastCacheUpdate = Date.now();
      logger.info('Feature flags cache refreshed', { flagCount: flags.length });
    } catch (error) {
      logger.error('Error refreshing feature flags cache', { error: error instanceof Error ? error : new Error(String(error)) });
    }
  }

  /**
   * Track feature flag evaluation for analytics
   */
  private async trackFeatureFlagEvaluation(
    flagId: string, 
    userContext: UserFeatureContext, 
    result: FeatureFlagResult
  ): Promise<void> {
    try {
      const analyticsData = {
        flagId,
        userId: userContext.userId,
        userRole: userContext.userRole,
        schoolId: userContext.schoolId,
        result,
        timestamp: new Date().toISOString()
      };

      await dbAdmin.collection('featureFlagAnalytics').add(analyticsData);
    } catch (error) {
      logger.error('Error tracking feature flag evaluation', { error: error instanceof Error ? error : new Error(String(error)), flagId });
      // Don't throw - analytics failures shouldn't break the feature flag evaluation
    }
  }
}

// Export singleton instance
export const featureFlagService = new FeatureFlagService();

// Predefined feature flags for HIVE platform
export const HIVE_FEATURE_FLAGS = {
  // Core Features
  SPACES_V2: 'spaces_v2',
  TOOLS_MARKETPLACE: 'tools_marketplace', 
  CALENDAR_INTEGRATION: 'calendar_integration',
  REAL_TIME_CHAT: 'real_time_chat',
  PROFILE_ANALYTICS: 'profile_analytics',
  
  // Experimental Features
  AI_RECOMMENDATIONS: 'ai_recommendations',
  VOICE_CHAT: 'voice_chat',
  VIDEO_CALLS: 'video_calls',
  COLLABORATIVE_DOCS: 'collaborative_docs',
  GAMIFICATION: 'gamification',
  
  // Infrastructure
  ADVANCED_CACHING: 'advanced_caching',
  CDN_OPTIMIZATION: 'cdn_optimization',
  REAL_TIME_ANALYTICS: 'real_time_analytics',
  AUTO_SCALING: 'auto_scaling',
  
  // UI/UX
  DARK_MODE: 'dark_mode',
  NEW_NAVIGATION: 'new_navigation',
  MOBILE_APP_PROMOTION: 'mobile_app_promotion',
  ACCESSIBILITY_FEATURES: 'accessibility_features',
  
  // Tools
  CUSTOM_TOOLS: 'custom_tools',
  TOOL_VERSIONING: 'tool_versioning',
  TOOL_MARKETPLACE_PAYMENTS: 'tool_marketplace_payments',
  
  // Admin
  ADVANCED_MODERATION: 'advanced_moderation',
  BULK_OPERATIONS: 'bulk_operations',
  DETAILED_ANALYTICS: 'detailed_analytics'
} as const;

// Helper function for easy feature flag checks in React components
export async function useFeatureFlag(
  flagId: string, 
  userContext: UserFeatureContext
): Promise<FeatureFlagResult> {
  return featureFlagService.isFeatureEnabled(flagId, userContext);
}