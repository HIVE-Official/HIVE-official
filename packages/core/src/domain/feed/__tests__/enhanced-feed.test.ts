import { describe, it, expect } from 'vitest';
import { EnhancedFeed } from '../enhanced-feed';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { FeedItem } from '../feed-item';
import { FeedItemId } from '../value-objects/feed-item-id.value';
import { SpaceId } from '../../spaces/value-objects/space-id.value';
import { FeedItemsAddedEvent } from '../events/feed-items-added.event';

const createProfileId = (value = 'profile_event_test') => {
  const result = ProfileId.create(value);
  if (result.isFailure) {
    throw new Error(`Failed to create ProfileId: ${result.error}`);
  }
  return result.getValue();
};

const createCampusId = (value = 'ub-buffalo') => {
  const result = CampusId.create(value);
  if (result.isFailure) {
    throw new Error(`Failed to create CampusId: ${result.error}`);
  }
  return result.getValue();
};

const createFeedItem = (idSuffix = 'a') => {
  const itemIdResult = FeedItemId.create(`feed_item_${idSuffix}`);
  if (itemIdResult.isFailure) {
    throw new Error(`Failed to create FeedItemId: ${itemIdResult.error}`);
  }

  const spaceIdResult = SpaceId.create(`space_${idSuffix}`);
  if (spaceIdResult.isFailure) {
    throw new Error(`Failed to create SpaceId: ${spaceIdResult.error}`);
  }

  const itemResult = FeedItem.create({
    itemId: itemIdResult.getValue(),
    content: {
      text: `Feed item ${idSuffix}`,
      mediaUrls: [],
      authorId: 'author_1',
      authorName: 'Author One'
    },
    source: {
      type: 'space',
      spaceId: spaceIdResult.getValue()
    },
    relevanceScore: 1
  });

  if (itemResult.isFailure) {
    throw new Error(`Failed to create FeedItem: ${itemResult.error}`);
  }

  return itemResult.getValue();
};

describe('EnhancedFeed Domain Events', () => {
  it('emits FeedItemsAddedEvent when a new item is added', () => {
    const profileId = createProfileId();
    const campusId = createCampusId();
    const feed = EnhancedFeed.create(profileId, campusId).getValue();
    const feedItem = createFeedItem('single');

    feed.clearEvents();
    const result = feed.addItem(feedItem);

    expect(result.isSuccess).toBe(true);
    expect(feed.domainEvents).toHaveLength(1);
    const event = feed.domainEvents[0];
    expect(event).toBeInstanceOf(FeedItemsAddedEvent);
    expect(event.getEventName()).toBe('FeedItemsAdded');
    expect((event as FeedItemsAddedEvent).campusId).toBe(campusId.value);
    expect((event as FeedItemsAddedEvent).itemIds).toEqual([feedItem.itemId.value]);
  });

  it('does not emit event when addItems receives only duplicates', () => {
    const profileId = createProfileId('profile_dupe');
    const campusId = createCampusId('ub-buffalo');
    const feed = EnhancedFeed.create(profileId, campusId).getValue();
    const feedItem = createFeedItem('dup');

    feed.addItem(feedItem);
    feed.clearEvents();

    const result = feed.addItems([feedItem]);

    expect(result.isSuccess).toBe(true);
    expect(feed.domainEvents).toHaveLength(0);
  });
});
