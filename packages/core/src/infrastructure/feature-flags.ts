/**
 * Feature Flags for Progressive Profile System Enhancement
 * Allows gradual rollout of new DDD features without breaking existing functionality
 */

export interface FeatureFlags {
  // Profile Domain Enhancements
  PROFILE_CAMPUS_ISOLATION: boolean;
  PROFILE_PRIVACY_CONTROLS: boolean;
  PROFILE_SOCIAL_GRAPH: boolean;
  PROFILE_VERIFICATION_BADGES: boolean;
  PROFILE_ACTIVITY_TRACKING: boolean;
  PROFILE_DOMAIN_EVENTS: boolean;
  PROFILE_ADVANCED_SEARCH: boolean;
  PROFILE_WIDGET_PRIVACY: boolean;

  // Connection Features
  CONNECTION_STRENGTH_CALCULATION: boolean;
  CONNECTION_MUTUAL_TRACKING: boolean;
  CONNECTION_BLOCKING: boolean;

  // Faculty & Leadership
  FACULTY_VERIFICATION: boolean;
  STUDENT_LEADER_BADGES: boolean;
  ATHLETE_VERIFICATION: boolean;

  // Performance & Analytics
  PROFILE_VIEW_TRACKING: boolean;
  PROFILE_COMPLETION_SCORE: boolean;
  PROFILE_ENGAGEMENT_METRICS: boolean;
}

class FeatureFlagService {
  private flags: FeatureFlags;

  constructor() {
    // Default configuration - can be overridden by environment variables
    this.flags = {
      // Start with core features enabled
      PROFILE_CAMPUS_ISOLATION: true,
      PROFILE_PRIVACY_CONTROLS: true,
      PROFILE_SOCIAL_GRAPH: false, // Phase 2
      PROFILE_VERIFICATION_BADGES: false, // Phase 2
      PROFILE_ACTIVITY_TRACKING: false, // Phase 3
      PROFILE_DOMAIN_EVENTS: true,
      PROFILE_ADVANCED_SEARCH: false, // Phase 3
      PROFILE_WIDGET_PRIVACY: false, // Phase 2

      // Connection features - Phase 2
      CONNECTION_STRENGTH_CALCULATION: false,
      CONNECTION_MUTUAL_TRACKING: false,
      CONNECTION_BLOCKING: false,

      // Faculty & Leadership - Phase 2
      FACULTY_VERIFICATION: false,
      STUDENT_LEADER_BADGES: false,
      ATHLETE_VERIFICATION: false,

      // Performance & Analytics - Phase 3
      PROFILE_VIEW_TRACKING: false,
      PROFILE_COMPLETION_SCORE: false,
      PROFILE_ENGAGEMENT_METRICS: false,
    };

    // Override with environment variables if available
    this.loadFromEnvironment();
  }

  private loadFromEnvironment(): void {
    // Check for environment variable overrides
    const envFlags = process.env.HIVE_FEATURE_FLAGS;
    if (envFlags) {
      try {
        const overrides = JSON.parse(envFlags);
        this.flags = { ...this.flags, ...overrides };
      } catch (error) {
        console.warn('Failed to parse HIVE_FEATURE_FLAGS:', error);
      }
    }

    // Individual flag overrides (for easier deployment control)
    Object.keys(this.flags).forEach(key => {
      const envKey = `FF_${key}`;
      const envValue = process.env[envKey];
      if (envValue !== undefined) {
        (this.flags as any)[key] = envValue === 'true';
      }
    });
  }

  isEnabled(flag: keyof FeatureFlags): boolean {
    return this.flags[flag] ?? false;
  }

  enableFlag(flag: keyof FeatureFlags): void {
    this.flags[flag] = true;
  }

  disableFlag(flag: keyof FeatureFlags): void {
    this.flags[flag] = false;
  }

  getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }

  // Helper methods for checking feature groups
  isPrivacyEnabled(): boolean {
    return this.flags.PROFILE_PRIVACY_CONTROLS;
  }

  isSocialGraphEnabled(): boolean {
    return this.flags.PROFILE_SOCIAL_GRAPH;
  }

  isVerificationEnabled(): boolean {
    return this.flags.PROFILE_VERIFICATION_BADGES ||
           this.flags.FACULTY_VERIFICATION ||
           this.flags.STUDENT_LEADER_BADGES ||
           this.flags.ATHLETE_VERIFICATION;
  }

  // Phase-based rollout helpers
  isPhase1Enabled(): boolean {
    return this.flags.PROFILE_CAMPUS_ISOLATION &&
           this.flags.PROFILE_PRIVACY_CONTROLS &&
           this.flags.PROFILE_DOMAIN_EVENTS;
  }

  isPhase2Enabled(): boolean {
    return this.isPhase1Enabled() &&
           this.flags.PROFILE_SOCIAL_GRAPH &&
           this.flags.PROFILE_VERIFICATION_BADGES &&
           this.flags.CONNECTION_STRENGTH_CALCULATION;
  }

  isPhase3Enabled(): boolean {
    return this.isPhase2Enabled() &&
           this.flags.PROFILE_ACTIVITY_TRACKING &&
           this.flags.PROFILE_ADVANCED_SEARCH &&
           this.flags.PROFILE_VIEW_TRACKING;
  }
}

// Singleton instance
export const featureFlags = new FeatureFlagService();

// Export convenience function
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  return featureFlags.isEnabled(flag);
}