/**
 * Profile Domain Exports
 */

// Aggregates
export type { Profile, ProfileProps, PersonalInfo, AcademicInfo, SocialInfo } from './aggregates/profile.aggregate';

// Value Objects
export type { ProfileId } from './value-objects/profile-id.value';
export type { ProfileHandle } from './value-objects/profile-handle.value';
export type { CampusId } from './value-objects/campus-id.value';
export type { UserType } from './value-objects/user-type.value';
export type { ProfilePrivacy } from './value-objects/profile-privacy.value';
export type { UBEmail } from './value-objects/ub-email.value';
export type { Handle } from './value-objects/handle.value';
export type { PersonalInfo as PersonalInfoValue } from './value-objects/personal-info.value';

// Domain Events
export type { ProfileCreatedEvent } from './events/profile-created.event';
export type { ProfileOnboardedEvent } from './events/profile-onboarded.event';

// Aggregates (legacy - kept for backward compatibility during migration)
export type { Connection } from './aggregates/connection';
