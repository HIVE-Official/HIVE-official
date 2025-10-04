/**
 * Spaces Domain Exports
 */

// Aggregates
export type { Space, SpaceProps, SpaceMember, SpaceSettings, RushMode } from './aggregates/space.aggregate';

// Entities
export type { Tab } from './entities/tab';
export type { Widget } from './entities/widget';

// Value Objects
export type { SpaceId } from './value-objects/space-id.value';
export type { SpaceName } from './value-objects/space-name.value';
export type { SpaceDescription } from './value-objects/space-description.value';
export type { SpaceCategory } from './value-objects/space-category.value';

// Domain Events
export type { SpaceCreatedEvent } from './events/space-created.event';
export type { MemberJoinedEvent } from './events/member-joined.event';
export type { MemberRemovedEvent } from './events/member-removed.event';
export type { MemberRoleUpdatedEvent } from './events/member-role-updated.event';
export type { PostCreatedEvent } from './events/post-created.event';
