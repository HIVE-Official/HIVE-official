/**
 * UNIFIED HIVE PROFILE SYSTEM
 *
 * Consolidates HiveProfile (simple, production-ready) and ProfileSystem (complex, UI-focused)
 * into a single, extensible type system that eliminates architectural fragmentation.
 *
 * DESIGN PRINCIPLES:
 * 1. Backward compatible with existing HiveProfile
 * 2. Optional modules for ProfileSystem features
 * 3. Single source of truth for all profile data
 * 4. Mobile-first and real-time ready
 */
import type { HiveProfile } from '../domain/profile/profile';
import type { ProfileSystem, Connection, Friend, PresenceState, BentoGridLayout, PrivacySettings as ProfileSystemPrivacy, ScheduleBlock, ScheduleOverlap, DiscoverySuggestion } from './profile-system';
export interface UnifiedHiveProfile extends HiveProfile {
    connections?: {
        friends: Friend[];
        connections: Connection[];
        pendingRequests: string[];
        blockedUsers: string[];
    };
    presence?: PresenceState & {
        isOnline?: boolean;
    };
    intelligence?: {
        schedule: ScheduleBlock[];
        overlaps: ScheduleOverlap[];
        suggestions: DiscoverySuggestion[];
        lastCalculated: Date;
    };
    grid?: BentoGridLayout;
    enhancedPrivacy?: ProfileSystemPrivacy;
    campusId?: string;
    completeness?: {
        percentage: number;
        completed: number;
        total: number;
        missingFields: string[];
    };
}
/**
 * Transform HiveProfile to UnifiedHiveProfile
 * Adds optional modules with sensible defaults
 */
export declare function toUnifiedProfile(profile: HiveProfile, modules?: {
    connections?: UnifiedHiveProfile['connections'];
    presence?: UnifiedHiveProfile['presence'];
    intelligence?: UnifiedHiveProfile['intelligence'];
    grid?: UnifiedHiveProfile['grid'];
}): UnifiedHiveProfile;
/**
 * Transform ProfileSystem to UnifiedHiveProfile
 * Maps complex ProfileSystem to unified format
 */
export declare function fromProfileSystem(profileSystem: ProfileSystem): UnifiedHiveProfile;
/**
 * Extract HiveProfile from UnifiedHiveProfile
 * For API compatibility with existing endpoints
 */
export declare function toHiveProfile(profile: UnifiedHiveProfile): HiveProfile;
/**
 * Extract ProfileSystem from UnifiedHiveProfile
 * For component compatibility with Bento Grid
 */
export declare function toProfileSystem(profile: UnifiedHiveProfile): ProfileSystem;
/**
 * Check if profile has advanced features enabled
 */
export declare function hasAdvancedFeatures(profile: UnifiedHiveProfile): boolean;
/**
 * Create minimal unified profile for new users
 */
export declare function createMinimalProfile(id: string, fullName: string, handle: string, email: string): UnifiedHiveProfile;
export declare function isUnifiedProfile(profile: any): profile is UnifiedHiveProfile;
export declare function isHiveProfile(profile: any): profile is HiveProfile;
export declare function isProfileSystem(profile: any): profile is ProfileSystem;
//# sourceMappingURL=unified-profile.d.ts.map