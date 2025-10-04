/**
 * Profile Domain Event Handlers
 * Handle cross-aggregate communication when profile events occur
 */

import { EventHandler } from '../../infrastructure/events';
import { ProfileCreatedEvent } from '../../domain/profile/events/profile-created.event';
import { ProfileOnboardedEvent } from '../../domain/profile/events/profile-onboarded.event';
import { getFeedRepository, getSpaceRepository } from '../../infrastructure/repositories/factory';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../../domain/profile/value-objects/campus-id.value';
import { EnhancedFeed } from '../../domain/feed/enhanced-feed';

/**
 * When a profile is created:
 * 1. Create default feed for user
 * 2. Set up initial notifications preferences
 * 3. Track sign-up analytics
 */
export const handleProfileCreated: EventHandler<ProfileCreatedEvent> = async (event) => {
  console.log(`[ProfileEventHandler] Profile created: ${event.aggregateId}`);

  try {
    const feedRepo = getFeedRepository();
    const profileId = ProfileId.create(event.aggregateId).getValue();
    const campusId = CampusId.createUBBuffalo().getValue();

    // Create default feed for the new user
    const feedResult = EnhancedFeed.create(profileId, campusId);

    if (feedResult.isSuccess) {
      await feedRepo.saveFeed(feedResult.getValue());
      console.log(`[ProfileEventHandler] Default feed created for profile ${event.aggregateId}`);
    }

    // TODO: Set up default notification preferences
    // TODO: Track sign-up analytics
  } catch (error) {
    console.error('[ProfileEventHandler] Failed to handle profile created:', error);
  }
};

/**
 * When a profile completes onboarding:
 * 1. Recommend spaces based on interests
 * 2. Suggest initial connections
 * 3. Send welcome notification with next steps
 */
export const handleProfileOnboarded: EventHandler<ProfileOnboardedEvent> = async (event) => {
  console.log(`[ProfileEventHandler] Profile onboarded: ${event.aggregateId}`);

  try {
    // Get recommended spaces based on interests
    const spaceRepo = getSpaceRepository();
    const campusId = CampusId.createUBBuffalo();
    // TODO: Find spaces matching user interests

    // TODO: Suggest connections based on major/dorm
    // TODO: Send welcome notification with personalized next steps
    // TODO: Track onboarding completion analytics
  } catch (error) {
    console.error('[ProfileEventHandler] Failed to handle profile onboarded:', error);
  }
};
