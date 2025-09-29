// Aggregates
export { Profile } from './aggregates/profile.aggregate';
export type { ProfileProps } from './aggregates/profile.aggregate';

// Value Objects
export { UBEmail } from './value-objects/ub-email.value';
export { Handle } from './value-objects/handle.value';
export { PersonalInfo } from './value-objects/personal-info.value';

// Events
export { ProfileCreatedEvent } from './events/profile-created.event';
export { ProfileOnboardedEvent } from './events/profile-onboarded.event';

// Specifications
export {
  ProfileCompletionSpecification,
  ProfileOnboardedSpecification,
  ProfileReadyForOnboardingSpecification
} from './specifications/profile-completion.spec';