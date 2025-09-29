/**
 * Profile Value Objects
 * Export all value objects for the Profile bounded context
 */

export { ProfileId } from './profile-id.value';
export { CampusId } from './campus-id.value';
export { ProfileHandle } from './profile-handle.value';
export { ConnectionId } from './connection-id.value';
export { UserType } from './user-type.value';
export { ProfilePrivacy } from './profile-privacy.value';

// Re-export existing value objects
export { UBEmail } from '../../identity/value-objects/ub-email.value';
export { Handle } from '../../identity/value-objects/handle.value';
export { PersonalInfo } from '../../identity/value-objects/personal-info.value';