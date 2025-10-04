/**
 * Space Domain Event Handlers
 * Handle cross-aggregate communication when space events occur
 */

import { EventHandler } from '../../infrastructure/events';
import { SpaceCreatedEvent } from '../../domain/spaces/events/space-created.event';
import { MemberJoinedEvent } from '../../domain/spaces/events/member-joined.event';
import { PostCreatedEvent } from '../../domain/spaces/events/post-created.event';
import { MemberRemovedEvent } from '../../domain/spaces/events/member-removed.event';
import { getProfileRepository, getFeedRepository } from '../../infrastructure/repositories/factory';

/**
 * When a space is created:
 * 1. Track analytics
 * 2. Add to recommended spaces for similar profiles
 * 3. Notify campus admins if public
 */
export const handleSpaceCreated: EventHandler<SpaceCreatedEvent> = async (event) => {
  console.log(`[SpaceEventHandler] Space created: ${event.name} by ${event.createdBy}`);

  // TODO: Track creation analytics
  // TODO: Add to space recommendation pool
  // TODO: Send notifications if public space
};

/**
 * When a member joins a space:
 * 1. Update user's feed to include space content
 * 2. Send welcome notification
 * 3. Update space activity metrics
 */
export const handleMemberJoined: EventHandler<MemberJoinedEvent> = async (event) => {
  console.log(`[SpaceEventHandler] Member ${event.profileId} joined space ${event.aggregateId}`);

  try {
    // Update user's feed configuration to include this space
    const feedRepo = getFeedRepository();
    // TODO: Add space to user's feed sources

    // TODO: Send welcome notification to new member
    // TODO: Update space activity score
  } catch (error) {
    console.error('[SpaceEventHandler] Failed to handle member joined:', error);
  }
};

/**
 * When a post is created in a space:
 * 1. Add to feeds of all space members
 * 2. Notify mentioned users
 * 3. Update space activity timestamp
 */
export const handlePostCreated: EventHandler<PostCreatedEvent> = async (event) => {
  console.log(`[SpaceEventHandler] Post created in space ${event.aggregateId} by ${event.authorId}`);

  try {
    // TODO: Add post to member feeds
    // TODO: Send notifications for mentions
    // TODO: Update space trending score
  } catch (error) {
    console.error('[SpaceEventHandler] Failed to handle post created:', error);
  }
};

/**
 * When a member is removed from a space:
 * 1. Remove space content from user's feed
 * 2. Clean up notifications
 */
export const handleMemberRemoved: EventHandler<MemberRemovedEvent> = async (event) => {
  console.log(`[SpaceEventHandler] Member ${event.profileId} removed from space ${event.aggregateId}`);

  try {
    // TODO: Remove space from user's feed sources
    // TODO: Clear space-related notifications
  } catch (error) {
    console.error('[SpaceEventHandler] Failed to handle member removed:', error);
  }
};
