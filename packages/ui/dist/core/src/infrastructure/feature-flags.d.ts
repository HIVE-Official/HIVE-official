/**
 * Feature Flags for Progressive Profile System Enhancement
 * Allows gradual rollout of new DDD features without breaking existing functionality
 */
export interface FeatureFlags {
    PROFILE_CAMPUS_ISOLATION: boolean;
    PROFILE_PRIVACY_CONTROLS: boolean;
    PROFILE_SOCIAL_GRAPH: boolean;
    PROFILE_VERIFICATION_BADGES: boolean;
    PROFILE_ACTIVITY_TRACKING: boolean;
    PROFILE_DOMAIN_EVENTS: boolean;
    PROFILE_ADVANCED_SEARCH: boolean;
    PROFILE_WIDGET_PRIVACY: boolean;
    CONNECTION_STRENGTH_CALCULATION: boolean;
    CONNECTION_MUTUAL_TRACKING: boolean;
    CONNECTION_BLOCKING: boolean;
    FACULTY_VERIFICATION: boolean;
    STUDENT_LEADER_BADGES: boolean;
    ATHLETE_VERIFICATION: boolean;
    PROFILE_VIEW_TRACKING: boolean;
    PROFILE_COMPLETION_SCORE: boolean;
    PROFILE_ENGAGEMENT_METRICS: boolean;
}
declare class FeatureFlagService {
    private flags;
    constructor();
    private loadFromEnvironment;
    isEnabled(flag: keyof FeatureFlags): boolean;
    enableFlag(flag: keyof FeatureFlags): void;
    disableFlag(flag: keyof FeatureFlags): void;
    getAllFlags(): FeatureFlags;
    isPrivacyEnabled(): boolean;
    isSocialGraphEnabled(): boolean;
    isVerificationEnabled(): boolean;
    isPhase1Enabled(): boolean;
    isPhase2Enabled(): boolean;
    isPhase3Enabled(): boolean;
}
export declare const featureFlags: FeatureFlagService;
export declare function isFeatureEnabled(flag: keyof FeatureFlags): boolean;
export {};
//# sourceMappingURL=feature-flags.d.ts.map