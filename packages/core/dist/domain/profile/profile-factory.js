"use strict";
/**
 * Profile Factory
 * Handles creation of either legacy or enhanced profiles based on feature flags
 * Provides migration path between versions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMigrationService = exports.ProfileAdapter = exports.ProfileFactory = void 0;
const profile_1 = require("./profile");
const enhanced_profile_1 = require("./aggregates/enhanced-profile");
const value_objects_1 = require("./value-objects");
const feature_flags_1 = require("../../infrastructure/feature-flags");
const user_type_1 = require("./value-objects/user-type");
const profile_privacy_1 = require("./value-objects/profile-privacy");
class ProfileFactory {
    /**
     * Creates either legacy or enhanced profile based on feature flags
     */
    static create(options) {
        // Check if we should use enhanced profile
        const useEnhanced = this.shouldUseEnhanced(options);
        if (useEnhanced) {
            return this.createEnhanced(options);
        }
        else {
            return this.createLegacy(options);
        }
    }
    /**
     * Determines whether to use enhanced profile based on feature flags
     */
    static shouldUseEnhanced(options) {
        // Allow override for testing/migration
        if (options.useLegacy === true) {
            return false;
        }
        // Check if Phase 1 features are enabled
        return (0, feature_flags_1.isFeatureEnabled)('PROFILE_CAMPUS_ISOLATION') ||
            (0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS') ||
            (0, feature_flags_1.isFeatureEnabled)('PROFILE_DOMAIN_EVENTS');
    }
    /**
     * Creates legacy profile (existing implementation)
     */
    static createLegacy(options) {
        return profile_1.Profile.create({
            email: options.email,
            handle: options.handle,
            firstName: options.firstName,
            lastName: options.lastName
        });
    }
    /**
     * Creates enhanced profile with all new features
     */
    static createEnhanced(options) {
        return enhanced_profile_1.EnhancedProfile.create({
            email: options.email,
            handle: options.handle,
            firstName: options.firstName,
            lastName: options.lastName,
            campusId: options.campusId,
            userType: options.userType
        });
    }
    /**
     * Migrates legacy profile to enhanced profile
     */
    static migrate(legacyProfile) {
        const legacyData = legacyProfile.toData();
        // Create enhanced profile from legacy data
        const enhancedResult = enhanced_profile_1.EnhancedProfile.create({
            email: legacyData.email.email,
            handle: legacyData.handle.username,
            firstName: legacyData.personalInfo.firstName,
            lastName: legacyData.personalInfo.lastName,
            campusId: 'ub-buffalo', // Default for migration
            userType: user_type_1.UserTypeEnum.STUDENT // Default for migration
        });
        if (enhancedResult.isFailure) {
            return value_objects_1.Result.fail(enhancedResult.error);
        }
        const enhanced = enhancedResult.getValue();
        // Migrate personal info
        if (legacyData.personalInfo.bio ||
            legacyData.personalInfo.major ||
            legacyData.personalInfo.graduationYear) {
            enhanced.updatePersonalInfo({
                bio: legacyData.personalInfo.bio,
                major: legacyData.personalInfo.major,
                graduationYear: legacyData.personalInfo.graduationYear,
                dorm: legacyData.personalInfo.dorm
            });
        }
        // Migrate photos - handled through enhanced profile data update
        const enhancedData = enhanced.toData();
        enhancedData.photos = [...legacyData.photos];
        // Migrate interests
        if (legacyData.interests.length > 0) {
            enhancedData.interests = [...legacyData.interests];
        }
        // Migrate social connections (would need connection migration)
        // This would be handled by a separate ConnectionMigrationService
        // Set onboarded status
        if (legacyData.isOnboarded) {
            enhanced.completeOnboarding();
        }
        return value_objects_1.Result.ok(enhanced);
    }
    /**
     * Creates a compatible interface for both profile types
     * Useful for gradual migration in repositories and services
     */
    static createAdapter(profile) {
        return new ProfileAdapter(profile);
    }
}
exports.ProfileFactory = ProfileFactory;
/**
 * Adapter class to provide common interface for both profile types
 * Allows existing code to work with either profile version
 */
class ProfileAdapter {
    constructor(profile) {
        this.profile = profile;
    }
    get id() {
        return this.profile.id.id;
    }
    get email() {
        return this.profile.email.email;
    }
    get handle() {
        return this.profile.handle.username;
    }
    get fullName() {
        return this.profile.fullName;
    }
    get isOnboarded() {
        return this.profile.isOnboarded;
    }
    get campusId() {
        if (this.isEnhanced()) {
            return this.profile.campusId.id;
        }
        return 'ub-buffalo'; // Default for legacy
    }
    get userType() {
        if (this.isEnhanced()) {
            return this.profile.userType.type;
        }
        return user_type_1.UserTypeEnum.STUDENT; // Default for legacy
    }
    get privacy() {
        if (this.isEnhanced()) {
            return this.profile.privacy;
        }
        // Return default privacy for legacy
        return profile_privacy_1.ProfilePrivacy.createDefault();
    }
    get isVerified() {
        if (this.isEnhanced()) {
            return this.profile.isVerified;
        }
        return false; // Legacy profiles are not verified
    }
    get followerCount() {
        if (this.isEnhanced()) {
            return this.profile.followerCount;
        }
        return 0; // Legacy doesn't track this
    }
    get completionScore() {
        if (this.isEnhanced()) {
            return this.profile.completionScore;
        }
        // Calculate basic score for legacy
        const data = this.profile.toData();
        let score = 25; // Base
        if (data.personalInfo.bio)
            score += 25;
        if (data.photos.length > 0)
            score += 25;
        if (data.interests.length > 0)
            score += 25;
        return score;
    }
    isEnhanced() {
        return this.profile instanceof enhanced_profile_1.EnhancedProfile;
    }
    isLegacy() {
        return this.profile instanceof profile_1.Profile;
    }
    getProfile() {
        return this.profile;
    }
    toJSON() {
        const base = {
            id: this.id,
            email: this.email,
            handle: this.handle,
            fullName: this.fullName,
            isOnboarded: this.isOnboarded,
            campusId: this.campusId,
            userType: this.userType,
            isVerified: this.isVerified,
            completionScore: this.completionScore
        };
        if (this.isEnhanced()) {
            const enhanced = this.profile;
            return {
                ...base,
                privacy: enhanced.privacy.toJSON(),
                badges: enhanced.badges,
                followerCount: enhanced.followerCount,
                followingCount: enhanced.followingCount
            };
        }
        return base;
    }
}
exports.ProfileAdapter = ProfileAdapter;
/**
 * Migration service for batch profile migrations
 */
class ProfileMigrationService {
    static async migrateProfiles(profiles, options) {
        const batchSize = options?.batchSize || 100;
        const results = [];
        const errors = [];
        for (let i = 0; i < profiles.length; i += batchSize) {
            const batch = profiles.slice(i, i + batchSize);
            for (const profile of batch) {
                const migrated = ProfileFactory.migrate(profile);
                if (migrated.isSuccess) {
                    results.push(migrated.getValue());
                }
                else {
                    errors.push(`Failed to migrate profile ${profile.id.id}: ${migrated.error}`);
                }
            }
            if (options?.onProgress) {
                options.onProgress(Math.min(i + batchSize, profiles.length), profiles.length);
            }
        }
        if (errors.length > 0) {
            console.error('Migration errors:', errors);
            return value_objects_1.Result.fail(`Migration completed with ${errors.length} errors`);
        }
        return value_objects_1.Result.ok(results);
    }
}
exports.ProfileMigrationService = ProfileMigrationService;
//# sourceMappingURL=profile-factory.js.map