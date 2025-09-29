/**
 * Profile Factory
 * Handles creation of either legacy or enhanced profiles based on feature flags
 * Provides migration path between versions
 */
import { Profile } from './profile';
import { EnhancedProfile } from './aggregates/enhanced-profile';
import { Result } from './value-objects';
import { UserTypeEnum } from './value-objects/user-type';
export interface ProfileCreationOptions {
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    campusId?: string;
    userType?: UserTypeEnum;
    useLegacy?: boolean;
}
export declare class ProfileFactory {
    /**
     * Creates either legacy or enhanced profile based on feature flags
     */
    static create(options: ProfileCreationOptions): Result<Profile | EnhancedProfile>;
    /**
     * Determines whether to use enhanced profile based on feature flags
     */
    private static shouldUseEnhanced;
    /**
     * Creates legacy profile (existing implementation)
     */
    private static createLegacy;
    /**
     * Creates enhanced profile with all new features
     */
    private static createEnhanced;
    /**
     * Migrates legacy profile to enhanced profile
     */
    static migrate(legacyProfile: Profile): Result<EnhancedProfile>;
    /**
     * Creates a compatible interface for both profile types
     * Useful for gradual migration in repositories and services
     */
    static createAdapter(profile: Profile | EnhancedProfile): ProfileAdapter;
}
/**
 * Adapter class to provide common interface for both profile types
 * Allows existing code to work with either profile version
 */
export declare class ProfileAdapter {
    private profile;
    constructor(profile: Profile | EnhancedProfile);
    get id(): string;
    get email(): string;
    get handle(): string;
    get fullName(): string;
    get isOnboarded(): boolean;
    get campusId(): string;
    get userType(): UserTypeEnum;
    get privacy(): any;
    get isVerified(): boolean;
    get followerCount(): number;
    get completionScore(): number;
    isEnhanced(): boolean;
    isLegacy(): boolean;
    getProfile(): Profile | EnhancedProfile;
    toJSON(): any;
}
/**
 * Migration service for batch profile migrations
 */
export declare class ProfileMigrationService {
    static migrateProfiles(profiles: Profile[], options?: {
        batchSize?: number;
        onProgress?: (current: number, total: number) => void;
    }): Promise<Result<EnhancedProfile[]>>;
}
//# sourceMappingURL=profile-factory.d.ts.map