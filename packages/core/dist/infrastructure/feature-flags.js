"use strict";
/**
 * Feature Flags for Progressive Profile System Enhancement
 * Allows gradual rollout of new DDD features without breaking existing functionality
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureFlags = void 0;
exports.isFeatureEnabled = isFeatureEnabled;
class FeatureFlagService {
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
    loadFromEnvironment() {
        // Check for environment variable overrides
        const envFlags = process.env.HIVE_FEATURE_FLAGS;
        if (envFlags) {
            try {
                const overrides = JSON.parse(envFlags);
                this.flags = { ...this.flags, ...overrides };
            }
            catch (error) {
                console.warn('Failed to parse HIVE_FEATURE_FLAGS:', error);
            }
        }
        // Individual flag overrides (for easier deployment control)
        Object.keys(this.flags).forEach(key => {
            const envKey = `FF_${key}`;
            const envValue = process.env[envKey];
            if (envValue !== undefined) {
                this.flags[key] = envValue === 'true';
            }
        });
    }
    isEnabled(flag) {
        return this.flags[flag] ?? false;
    }
    enableFlag(flag) {
        this.flags[flag] = true;
    }
    disableFlag(flag) {
        this.flags[flag] = false;
    }
    getAllFlags() {
        return { ...this.flags };
    }
    // Helper methods for checking feature groups
    isPrivacyEnabled() {
        return this.flags.PROFILE_PRIVACY_CONTROLS;
    }
    isSocialGraphEnabled() {
        return this.flags.PROFILE_SOCIAL_GRAPH;
    }
    isVerificationEnabled() {
        return this.flags.PROFILE_VERIFICATION_BADGES ||
            this.flags.FACULTY_VERIFICATION ||
            this.flags.STUDENT_LEADER_BADGES ||
            this.flags.ATHLETE_VERIFICATION;
    }
    // Phase-based rollout helpers
    isPhase1Enabled() {
        return this.flags.PROFILE_CAMPUS_ISOLATION &&
            this.flags.PROFILE_PRIVACY_CONTROLS &&
            this.flags.PROFILE_DOMAIN_EVENTS;
    }
    isPhase2Enabled() {
        return this.isPhase1Enabled() &&
            this.flags.PROFILE_SOCIAL_GRAPH &&
            this.flags.PROFILE_VERIFICATION_BADGES &&
            this.flags.CONNECTION_STRENGTH_CALCULATION;
    }
    isPhase3Enabled() {
        return this.isPhase2Enabled() &&
            this.flags.PROFILE_ACTIVITY_TRACKING &&
            this.flags.PROFILE_ADVANCED_SEARCH &&
            this.flags.PROFILE_VIEW_TRACKING;
    }
}
// Singleton instance
exports.featureFlags = new FeatureFlagService();
// Export convenience function
function isFeatureEnabled(flag) {
    return exports.featureFlags.isEnabled(flag);
}
//# sourceMappingURL=feature-flags.js.map