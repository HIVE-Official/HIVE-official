/**
 * Feed Configuration Service
 *
 * Centralized configuration management for the HIVE feed system.
 * Allows real-time feature toggling and algorithm tuning without code deploys.
 *
 * @educational This service implements the Observer pattern - admin changes
 * propagate to all subscribed components in real-time, enabling live
 * experimentation with engagement mechanics.
 */

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { logger } from '@/lib/logger';
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════
// Type Definitions
// ═══════════════════════════════════════════════════════════════════════

export interface FeedConfiguration {
  // Feature Toggles - Control what's visible/enabled
  features: {
    ritualsEnabled: boolean;           // Show ritual content in feed
    postingGateEnabled: boolean;       // Require earned privileges to post
    temporalBoostingEnabled: boolean;  // Boost time-sensitive content
    competitionModeEnabled: boolean;   // Enable space vs space competitions
    storiesStripEnabled: boolean;      // Show stories at top of feed
    horizontalCardsEnabled: boolean;   // Show horizontal ritual cards
    phantomEngagementEnabled: boolean; // Create fake activity for new users
  };

  // Algorithm Weights - Control content ranking
  algorithms: {
    liveEventBoost: number;       // Weight for happening-now events (default: 100)
    upcomingEventBoost: number;   // Weight for starting-soon events (default: 90)
    spaceContentBoost: number;    // Weight for space posts (default: 60)
    friendActivityBoost: number;  // Weight for friend content (default: 50)
    ritualContentBoost: number;   // Weight for ritual-related posts (default: 80)
    viralThreshold: number;       // Engagement count to trigger viral boost (default: 50)
  };

  // Posting Rules - Control who can post and when
  postingRules: {
    requireProfileComplete: boolean;   // Must complete profile to post
    minAccountAgeDays: number;         // Days before can post
    minSpaceMemberships: number;       // Spaces to join before posting
    minEngagementScore: number;        // Likes/comments before posting
    dailyPostLimit: number;            // Max posts per day
    specialEventOverride: boolean;     // Rituals can override restrictions
  };

  // Active Ritual Configuration
  activeRitual: {
    id: string | null;                          // Current ritual ID
    displayMode: 'stories' | 'cards' | 'both' | 'none';
    boostRitualContent: boolean;               // Prioritize ritual posts
    unlockFeatures: string[];                  // Features temporarily unlocked
    participationThreshold: number;             // % needed for campus unlock
  };

  // Time-based Features
  timeBasedFeatures: {
    lateNightMode: boolean;           // Different algorithm 11pm-5am
    weekendMode: boolean;             // Different rules Fri-Sun
    examPeriodMode: boolean;          // Study-focused during finals
    quietHoursStart: number;          // Hour to reduce notifications
    quietHoursEnd: number;            // Hour to resume normal
  };

  // Metadata
  metadata: {
    lastUpdated: string;
    updatedBy: string;
    version: number;
    environment: 'development' | 'staging' | 'production';
  };
}

// ═══════════════════════════════════════════════════════════════════════
// Default Configuration
// ═══════════════════════════════════════════════════════════════════════

export const DEFAULT_FEED_CONFIG: FeedConfiguration = {
  features: {
    ritualsEnabled: true,
    postingGateEnabled: false,        // Start without gates
    temporalBoostingEnabled: true,
    competitionModeEnabled: false,
    storiesStripEnabled: true,
    horizontalCardsEnabled: true,
    phantomEngagementEnabled: false,
  },

  algorithms: {
    liveEventBoost: 100,
    upcomingEventBoost: 90,
    spaceContentBoost: 60,
    friendActivityBoost: 50,
    ritualContentBoost: 120,
    viralThreshold: 50,
  },

  postingRules: {
    requireProfileComplete: false,
    minAccountAgeDays: 0,
    minSpaceMemberships: 0,
    minEngagementScore: 0,
    dailyPostLimit: 10,
    specialEventOverride: false,
  },

  activeRitual: {
    id: null,
    displayMode: 'both',
    boostRitualContent: true,
    unlockFeatures: [],
    participationThreshold: 70,
  },

  timeBasedFeatures: {
    lateNightMode: false,
    weekendMode: false,
    examPeriodMode: false,
    quietHoursStart: 23,  // 11 PM
    quietHoursEnd: 7,     // 7 AM
  },

  metadata: {
    lastUpdated: new Date().toISOString(),
    updatedBy: 'system',
    version: 1,
    environment: process.env.NODE_ENV as any || 'development',
  },
};

// ═══════════════════════════════════════════════════════════════════════
// Configuration Manager (Singleton)
// ═══════════════════════════════════════════════════════════════════════

class FeedConfigurationManager {
  private static instance: FeedConfigurationManager;
  private config: FeedConfiguration | null = null;
  private listeners: Set<(config: FeedConfiguration) => void> = new Set();
  private unsubscribeFirestore: (() => void) | null = null;
  private initPromise: Promise<FeedConfiguration> | null = null;

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get singleton instance
   * @educational Singleton pattern ensures only one configuration manager
   * exists, preventing conflicting states and reducing memory usage
   */
  static getInstance(): FeedConfigurationManager {
    if (!FeedConfigurationManager.instance) {
      FeedConfigurationManager.instance = new FeedConfigurationManager();
    }
    return FeedConfigurationManager.instance;
  }

  /**
   * Initialize configuration and set up real-time listener
   */
  async initialize(): Promise<FeedConfiguration> {
    // Return existing promise if initialization in progress
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  private async _doInitialize(): Promise<FeedConfiguration> {
    try {
      const docRef = doc(db, 'platform_config', 'feed_config');

      // Set up real-time listener
      this.unsubscribeFirestore = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            this.config = snapshot.data() as FeedConfiguration;
            logger.info('Feed configuration updated', {
              metadata: {
                version: this.config.metadata.version,
                updatedBy: this.config.metadata.updatedBy
              }
            });
          } else {
            // Document doesn't exist, use defaults
            this.config = DEFAULT_FEED_CONFIG;
            logger.info('Using default feed configuration');
          }

          // Notify all listeners
          this.notifyListeners();
        },
        (error) => {
          logger.error('Error listening to feed configuration', { error: error instanceof Error ? error.message : String(error) });
          // Fall back to defaults on error
          this.config = DEFAULT_FEED_CONFIG;
        }
      );

      // Wait for first snapshot
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        this.config = snapshot.data() as FeedConfiguration;
      } else {
        this.config = DEFAULT_FEED_CONFIG;
        // Create the document with defaults
        await this.saveConfig(this.config);
      }

      return this.config;
    } catch (error) {
      logger.error('Failed to initialize feed configuration', { error: error instanceof Error ? error.message : String(error) });
      this.config = DEFAULT_FEED_CONFIG;
      return this.config;
    }
  }

  /**
   * Get current configuration
   */
  async getConfig(): Promise<FeedConfiguration> {
    if (!this.config) {
      return this.initialize();
    }
    return this.config;
  }

  /**
   * Update configuration (admin only)
   */
  async updateConfig(
    updates: Partial<FeedConfiguration>,
    updatedBy: string = 'admin'
  ): Promise<FeedConfiguration> {
    const current = await this.getConfig();

    // Deep merge updates
    const newConfig: FeedConfiguration = {
      ...current,
      features: { ...current.features, ...updates.features },
      algorithms: { ...current.algorithms, ...updates.algorithms },
      postingRules: { ...current.postingRules, ...updates.postingRules },
      activeRitual: { ...current.activeRitual, ...updates.activeRitual },
      timeBasedFeatures: { ...current.timeBasedFeatures, ...updates.timeBasedFeatures },
      metadata: {
        lastUpdated: new Date().toISOString(),
        updatedBy,
        version: current.metadata.version + 1,
        environment: current.metadata.environment,
      },
    };

    await this.saveConfig(newConfig);
    return newConfig;
  }

  /**
   * Save configuration to Firestore
   */
  private async saveConfig(config: FeedConfiguration): Promise<void> {
    try {
      const docRef = doc(db, 'platform_config', 'feed_config');
      await setDoc(docRef, config);
      logger.info('Feed configuration saved', { metadata: { version: config.metadata.version } });
    } catch (error) {
      logger.error('Failed to save feed configuration', { error: error instanceof Error ? error.message : String(error) });
      throw error;
    }
  }

  /**
   * Subscribe to configuration changes
   * @returns Unsubscribe function
   */
  subscribe(listener: (config: FeedConfiguration) => void): () => void {
    this.listeners.add(listener);

    // Immediately call with current config if available
    if (this.config) {
      listener(this.config);
    }

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of configuration change
   */
  private notifyListeners(): void {
    if (!this.config) return;

    this.listeners.forEach(listener => {
      try {
        listener(this.config!);
      } catch (error) {
        logger.error('Error in feed config listener', { error: error instanceof Error ? error.message : String(error) });
      }
    });
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.unsubscribeFirestore) {
      this.unsubscribeFirestore();
      this.unsubscribeFirestore = null;
    }
    this.listeners.clear();
    this.config = null;
    this.initPromise = null;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// Exported Instance and Utilities
// ═══════════════════════════════════════════════════════════════════════

export const feedConfig = FeedConfigurationManager.getInstance();

/**
 * Hook for React components to use feed configuration
 * @educational This custom hook ensures components re-render when
 * configuration changes, implementing reactive programming patterns
 */
export function useFeedConfig() {
  const [config, setConfig] = useState<FeedConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize configuration
    feedConfig.getConfig()
      .then(setConfig)
      .catch(setError)
      .finally(() => setLoading(false));

    // Subscribe to changes
    const unsubscribe = feedConfig.subscribe((newConfig) => {
      setConfig(newConfig);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { config, loading, error };
}

/**
 * Check if a user can post based on current configuration
 */
export async function canUserPost(
  userStats: {
    profileCompleteness: number;
    accountAgeDays: number;
    spaceMemberships: number;
    engagementScore: number;
    postsToday: number;
  }
): Promise<{ canPost: boolean; reason?: string }> {
  const config = await feedConfig.getConfig();
  const rules = config.postingRules;

  // Check special event override
  if (rules.specialEventOverride && config.activeRitual.id) {
    return { canPost: true };
  }

  // Check posting gate
  if (!config.features.postingGateEnabled) {
    // No restrictions
    if (userStats.postsToday >= rules.dailyPostLimit) {
      return {
        canPost: false,
        reason: `Daily limit of ${rules.dailyPostLimit} posts reached`
      };
    }
    return { canPost: true };
  }

  // Check requirements
  if (rules.requireProfileComplete && userStats.profileCompleteness < 100) {
    return {
      canPost: false,
      reason: `Complete your profile (${userStats.profileCompleteness}% done)`
    };
  }

  if (userStats.accountAgeDays < rules.minAccountAgeDays) {
    const daysRemaining = rules.minAccountAgeDays - userStats.accountAgeDays;
    return {
      canPost: false,
      reason: `Wait ${daysRemaining} more days to post`
    };
  }

  if (userStats.spaceMemberships < rules.minSpaceMemberships) {
    const spacesNeeded = rules.minSpaceMemberships - userStats.spaceMemberships;
    return {
      canPost: false,
      reason: `Join ${spacesNeeded} more spaces`
    };
  }

  if (userStats.engagementScore < rules.minEngagementScore) {
    return {
      canPost: false,
      reason: `Engage more with the community first`
    };
  }

  if (userStats.postsToday >= rules.dailyPostLimit) {
    return {
      canPost: false,
      reason: `Daily limit of ${rules.dailyPostLimit} posts reached`
    };
  }

  return { canPost: true };
}

/**
 * Get current time-based mode
 */
export function getCurrentMode(config: FeedConfiguration): string {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  if (config.timeBasedFeatures.examPeriodMode) {
    return 'exam-period';
  }

  if (config.timeBasedFeatures.lateNightMode &&
      (hour >= 23 || hour < 5)) {
    return 'late-night';
  }

  if (config.timeBasedFeatures.weekendMode &&
      (day === 0 || day === 6 || (day === 5 && hour >= 18))) {
    return 'weekend';
  }

  if (hour >= config.timeBasedFeatures.quietHoursStart ||
      hour < config.timeBasedFeatures.quietHoursEnd) {
    return 'quiet-hours';
  }

  return 'normal';
}