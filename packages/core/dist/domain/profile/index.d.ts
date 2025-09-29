/**
 * Profile Domain Exports
 * Central export point for all profile domain components
 */
export { Profile } from './profile';
export type { ProfileData, ProfileCreationProps, PersonalInfo } from './profile';
export { EnhancedProfile } from './aggregates/enhanced-profile';
export type { EnhancedProfileData, EnhancedPersonalInfo, ProfileBadge, ProfileActivity } from './aggregates/enhanced-profile';
export { Connection, ConnectionStatus, ConnectionType } from './aggregates/connection';
export type { ConnectionProps } from './aggregates/connection';
export { Result, UBEmail, Handle, Bio, Major, GraduationYear, ProfileId, PhotoUrl } from './value-objects';
export { CampusId } from './value-objects/campus-id';
export { UserType, UserTypeEnum } from './value-objects/user-type';
export type { UserTypeProps } from './value-objects/user-type';
export { ProfilePrivacy, VisibilityLevel } from './value-objects/profile-privacy';
export type { PrivacySettings, WidgetPrivacy } from './value-objects/profile-privacy';
export { ProfileEventFactory } from './events';
export type { DomainEvent, ProfileCreatedEvent, ProfileUpdatedEvent, ProfileOnboardingCompletedEvent, ProfileVerifiedEvent, ProfileViewedEvent, ProfilePrivacyUpdatedEvent, ConnectionCreatedEvent, ConnectionAcceptedEvent, ConnectionBlockedEvent, ConnectionUpgradedEvent, MutualConnectionFormedEvent, ProfileSearchedEvent, ProfileDiscoveredEvent, ProfileEngagementEvent, IEventBus } from './events';
export { ProfileFactory, ProfileAdapter, ProfileMigrationService } from './profile-factory';
export type { ProfileCreationOptions } from './profile-factory';
export interface IProfileDomainService {
    validateHandle(handle: string, campusId: string): Promise<Result<boolean>>;
    checkEmailAvailability(email: string): Promise<Result<boolean>>;
    calculateConnectionStrength(profile1Id: string, profile2Id: string): Promise<number>;
    suggestConnections(profileId: string, limit?: number): Promise<ProfileId[]>;
}
export interface IProfilePrivacyService {
    canView(viewer: ProfileId | null, target: ProfileId): Promise<boolean>;
    canMessage(sender: ProfileId, recipient: ProfileId): Promise<boolean>;
    canViewWidget(viewer: ProfileId | null, target: ProfileId, widget: string): Promise<boolean>;
    filterSearchResults(results: ProfileId[], viewer: ProfileId): Promise<ProfileId[]>;
}
export interface IConnectionService {
    createConnection(from: ProfileId, to: ProfileId, type?: ConnectionType): Promise<Result<Connection>>;
    acceptConnection(connectionId: string): Promise<Result<void>>;
    blockConnection(connectionId: string, reason?: string): Promise<Result<void>>;
    checkMutualConnection(profile1: ProfileId, profile2: ProfileId): Promise<boolean>;
    upgradeToFriend(connectionId: string): Promise<Result<void>>;
}
//# sourceMappingURL=index.d.ts.map