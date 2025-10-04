/**
 * Profile Domain Exports
 */
// Aggregates
export { Profile } from './aggregates/profile.aggregate';
// Value Objects
export { ProfileId } from './value-objects/profile-id.value';
export { ProfileHandle } from './value-objects/profile-handle.value';
export { CampusId } from './value-objects/campus-id.value';
export { UserType } from './value-objects/user-type.value';
export { ProfilePrivacy } from './value-objects/profile-privacy.value';
export { UBEmail } from './value-objects/ub-email.value';
export { Handle } from './value-objects/handle.value';
export { PersonalInfo as PersonalInfoValue } from './value-objects/personal-info.value';
// Domain Events
export { ProfileCreatedEvent } from './events/profile-created.event';
export { ProfileOnboardedEvent } from './events/profile-onboarded.event';
// Aggregates (legacy - kept for backward compatibility during migration)
export { Connection } from './aggregates/connection';
//# sourceMappingURL=index.js.map