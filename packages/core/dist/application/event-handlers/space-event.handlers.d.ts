/**
 * Space Domain Event Handlers
 * Handle cross-aggregate communication when space events occur
 */
import { EventHandler } from '../../infrastructure/events';
import { SpaceCreatedEvent } from '../../domain/spaces/events/space-created.event';
import { MemberJoinedEvent } from '../../domain/spaces/events/member-joined.event';
import { PostCreatedEvent } from '../../domain/spaces/events/post-created.event';
import { MemberRemovedEvent } from '../../domain/spaces/events/member-removed.event';
/**
 * When a space is created:
 * 1. Track analytics
 * 2. Add to recommended spaces for similar profiles
 * 3. Notify campus admins if public
 */
export declare const handleSpaceCreated: EventHandler<SpaceCreatedEvent>;
/**
 * When a member joins a space:
 * 1. Update user's feed to include space content
 * 2. Send welcome notification
 * 3. Update space activity metrics
 */
export declare const handleMemberJoined: EventHandler<MemberJoinedEvent>;
/**
 * When a post is created in a space:
 * 1. Add to feeds of all space members
 * 2. Notify mentioned users
 * 3. Update space activity timestamp
 */
export declare const handlePostCreated: EventHandler<PostCreatedEvent>;
/**
 * When a member is removed from a space:
 * 1. Remove space content from user's feed
 * 2. Clean up notifications
 */
export declare const handleMemberRemoved: EventHandler<MemberRemovedEvent>;
//# sourceMappingURL=space-event.handlers.d.ts.map