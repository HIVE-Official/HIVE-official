/**
 * Space Aggregate Tests
 * Comprehensive test coverage for Space business logic
 */

import { describe, it, expect } from 'vitest';
import { Space } from '../aggregates/space.aggregate';
import { SpaceId } from '../value-objects/space-id.value';
import { SpaceName } from '../value-objects/space-name.value';
import { SpaceDescription } from '../value-objects/space-description.value';
import { SpaceCategory, SpaceCategoryEnum } from '../value-objects/space-category.value';
import { CampusId } from '../../profile/value-objects/campus-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { Tab } from '../entities/tab';
import { Widget } from '../entities/widget';

/**
 * Test Data Factories
 */

const createValidSpaceId = (): SpaceId => {
  const result = SpaceId.generate(); // Use generate() for auto-generated IDs
  if (result.isFailure) throw new Error('Failed to create SpaceId');
  return result.getValue();
};

const createValidSpaceName = (name = 'Test Space'): SpaceName => {
  const result = SpaceName.create(name);
  if (result.isFailure) throw new Error(`Failed to create SpaceName: ${result.error}`);
  return result.getValue();
};

const createValidSpaceDescription = (desc = 'A test space for students'): SpaceDescription => {
  const result = SpaceDescription.create(desc);
  if (result.isFailure) throw new Error(`Failed to create SpaceDescription: ${result.error}`);
  return result.getValue();
};

const createValidSpaceCategory = (category: SpaceCategoryEnum = SpaceCategoryEnum.GENERAL): SpaceCategory => {
  const result = SpaceCategory.create(category);
  if (result.isFailure) throw new Error(`Failed to create SpaceCategory: ${result.error}`);
  return result.getValue();
};

const createValidCampusId = (value = 'ub-buffalo'): CampusId => {
  const result = CampusId.create(value);
  if (result.isFailure) throw new Error(`Failed to create CampusId: ${result.error}`);
  return result.getValue();
};

const createValidProfileId = (value = 'profile_123'): ProfileId => {
  const result = ProfileId.create(value);
  if (result.isFailure) throw new Error(`Failed to create ProfileId: ${result.error}`);
  return result.getValue();
};

const createValidTab = (name = 'Test Tab', type: 'feed' | 'widget' | 'resource' | 'custom' = 'feed'): Tab => {
  const result = Tab.create({ name, type });
  if (result.isFailure) throw new Error(`Failed to create Tab: ${result.error}`);
  return result.getValue();
};

const createValidWidget = (title = 'Test Widget', type: 'calendar' | 'poll' | 'links' | 'files' | 'rss' | 'custom' = 'calendar'): Widget => {
  const result = Widget.create({ title, type });
  if (result.isFailure) throw new Error(`Failed to create Widget: ${result.error}`);
  return result.getValue();
};

/**
 * Tests
 */

describe('Space.create()', () => {
  it('should create a valid space with required properties', () => {
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    expect(space).toBeDefined();
    expect(space.name.value).toBe('Test Space');
    expect(space.description.value).toBe('A test space for students');
    expect(space.memberCount).toBe(1); // Creator is automatically added
    expect(space.isPublic).toBe(true); // Default visibility
  });

  it('should add creator as admin member', () => {
    const creatorId = createValidProfileId('creator_123');
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    expect(space.isMember(creatorId)).toBe(true);
    expect(space.getMemberRole(creatorId)).toBe('admin');
    expect(space.adminCount).toBe(1);
  });

  it('should create default Feed tab', () => {
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    expect(space.tabs.length).toBe(1);
    expect(space.tabs[0].name).toBe('Feed');
    expect(space.tabs[0].type).toBe('feed');
    expect(space.tabs[0].isDefault).toBe(true);
  });

  it('should emit SpaceCreatedEvent', () => {
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName('Code Club'),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(SpaceCategoryEnum.CLUB),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId('creator_456')
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    const events = space.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].getEventName()).toBe('SpaceCreated');
  });

  it('should respect custom visibility setting', () => {
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId(),
      visibility: 'private'
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    expect(space.isPublic).toBe(false);
    expect(space.visibility).toBe('private');
  });

  it('should apply custom settings', () => {
    const result = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId(),
      settings: {
        allowInvites: false,
        requireApproval: true,
        maxMembers: 50
      }
    });

    expect(result.isSuccess).toBe(true);
    const space = result.getValue();
    expect(space.settings.allowInvites).toBe(false);
    expect(space.settings.requireApproval).toBe(true);
    expect(space.settings.maxMembers).toBe(50);
  });
});

describe('Space.addMember()', () => {
  it('should add a new member with default role', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const newMemberId = createValidProfileId('member_001');
    const result = space.addMember(newMemberId);

    expect(result.isSuccess).toBe(true);
    expect(space.memberCount).toBe(2);
    expect(space.isMember(newMemberId)).toBe(true);
    expect(space.getMemberRole(newMemberId)).toBe('member');
  });

  it('should add member with moderator role', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const newMemberId = createValidProfileId('mod_001');
    const result = space.addMember(newMemberId, 'moderator');

    expect(result.isSuccess).toBe(true);
    expect(space.getMemberRole(newMemberId)).toBe('moderator');
  });

  it('should prevent adding duplicate members', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);
    const result = space.addMember(memberId);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('already a member');
  });

  it('should enforce max member limit', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId(),
      settings: { maxMembers: 2 }
    }).getValue();

    const member1 = createValidProfileId('member_001');
    space.addMember(member1);

    const member2 = createValidProfileId('member_002');
    const result = space.addMember(member2);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('maximum member capacity');
  });

  it('should emit MemberJoinedEvent', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    space.clearEvents(); // Clear creation events

    const newMemberId = createValidProfileId('member_001');
    space.addMember(newMemberId);

    const events = space.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('MemberJoined');
  });
});

describe('Space.removeMember()', () => {
  it('should remove an existing member', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);

    expect(space.memberCount).toBe(2);

    const result = space.removeMember(memberId);

    expect(result.isSuccess).toBe(true);
    expect(space.memberCount).toBe(1);
    expect(space.isMember(memberId)).toBe(false);
  });

  it('should fail when removing non-existent member', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const nonMemberId = createValidProfileId('non_member');
    const result = space.removeMember(nonMemberId);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('not a member');
  });

  it('should prevent removing the last admin', () => {
    const creatorId = createValidProfileId('creator_001');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    }).getValue();

    const result = space.removeMember(creatorId);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('last admin');
  });

  it('should allow removing admin when multiple admins exist', () => {
    const creatorId = createValidProfileId('creator_001');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    }).getValue();

    const newAdminId = createValidProfileId('admin_002');
    space.addMember(newAdminId, 'member');
    space.updateMemberRole(newAdminId, 'admin');

    expect(space.adminCount).toBe(2);

    const result = space.removeMember(creatorId);

    expect(result.isSuccess).toBe(true);
    expect(space.adminCount).toBe(1);
  });

  it('should emit MemberRemovedEvent', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);
    space.clearEvents();

    space.removeMember(memberId);

    const events = space.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('MemberRemoved');
  });
});

describe('Space.isMember()', () => {
  it('should return true for existing members', () => {
    const creatorId = createValidProfileId('creator_001');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    }).getValue();

    expect(space.isMember(creatorId)).toBe(true);
  });

  it('should return false for non-members', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const nonMemberId = createValidProfileId('non_member');
    expect(space.isMember(nonMemberId)).toBe(false);
  });
});

describe('Space.getMemberRole()', () => {
  it('should return correct role for member', () => {
    const creatorId = createValidProfileId('creator_001');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    }).getValue();

    expect(space.getMemberRole(creatorId)).toBe('admin');
  });

  it('should return null for non-member', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const nonMemberId = createValidProfileId('non_member');
    expect(space.getMemberRole(nonMemberId)).toBeNull();
  });
});

describe('Space.updateMemberRole()', () => {
  it('should update member role successfully', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);

    const result = space.updateMemberRole(memberId, 'moderator');

    expect(result.isSuccess).toBe(true);
    expect(space.getMemberRole(memberId)).toBe('moderator');
  });

  it('should fail when updating non-existent member', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const nonMemberId = createValidProfileId('non_member');
    const result = space.updateMemberRole(nonMemberId, 'moderator');

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('not a member');
  });

  it('should prevent demoting the last admin', () => {
    const creatorId = createValidProfileId('creator_001');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId
    }).getValue();

    const result = space.updateMemberRole(creatorId, 'member');

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('last admin');
  });

  it('should allow promoting member to admin', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);

    const result = space.updateMemberRole(memberId, 'admin');

    expect(result.isSuccess).toBe(true);
    expect(space.adminCount).toBe(2);
  });

  it('should emit MemberRoleUpdatedEvent', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const memberId = createValidProfileId('member_001');
    space.addMember(memberId);
    space.clearEvents();

    space.updateMemberRole(memberId, 'moderator');

    const events = space.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('MemberRoleUpdated');
  });
});

describe('Space.addTab()', () => {
  it('should add a new tab successfully', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const initialTabCount = space.tabs.length;
    const newTab = createValidTab('Resources', 'resource');
    const result = space.addTab(newTab);

    expect(result.isSuccess).toBe(true);
    expect(space.tabs.length).toBe(initialTabCount + 1);
  });

  it('should prevent adding tab with duplicate name', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    // Default "Feed" tab already exists
    const duplicateTab = createValidTab('Feed', 'feed');
    const result = space.addTab(duplicateTab);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('already exists');
  });
});

describe('Space.addWidget()', () => {
  it('should add a new widget successfully', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const widget = createValidWidget('Event Calendar', 'calendar');
    const result = space.addWidget(widget);

    expect(result.isSuccess).toBe(true);
    expect(space.widgets.length).toBe(1);
  });

  it('should allow multiple widgets', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const widget1 = createValidWidget('Calendar', 'calendar');
    const widget2 = createValidWidget('Polls', 'poll');

    space.addWidget(widget1);
    space.addWidget(widget2);

    expect(space.widgets.length).toBe(2);
  });
});

describe('Space.incrementPostCount()', () => {
  it('should increment post count', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    expect(space.postCount).toBe(0);

    space.incrementPostCount();

    expect(space.postCount).toBe(1);
  });

  it('should emit PostCreatedEvent when post details provided', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    space.clearEvents();

    space.incrementPostCount('post_123', 'author_456');

    const events = space.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('PostCreated');
  });

  it('should increment multiple times', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    space.incrementPostCount();
    space.incrementPostCount();
    space.incrementPostCount();

    expect(space.postCount).toBe(3);
  });
});

describe('Space.updateSettings()', () => {
  it('should update settings successfully', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const result = space.updateSettings({
      allowInvites: false,
      requireApproval: true
    });

    expect(result.isSuccess).toBe(true);
    expect(space.settings.allowInvites).toBe(false);
    expect(space.settings.requireApproval).toBe(true);
  });

  it('should merge with existing settings', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId(),
      settings: {
        allowInvites: true,
        maxMembers: 100
      }
    }).getValue();

    const result = space.updateSettings({
      requireApproval: true
    });

    expect(result.isSuccess).toBe(true);
    expect(space.settings.allowInvites).toBe(true); // Preserved
    expect(space.settings.requireApproval).toBe(true); // Updated
    expect(space.settings.maxMembers).toBe(100); // Preserved
  });

  it('should prevent reducing maxMembers below current member count', () => {
    const creatorId = createValidProfileId('creator');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: creatorId,
      settings: {
        allowInvites: true,
        requireApproval: false,
        maxMembers: 20
      }
    }).getValue();

    for (let i = 0; i < 5; i++) {
      space.addMember(createValidProfileId(`member_${i}`));
    }

    const result = space.updateSettings({ maxMembers: 4 });

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('maxMembers');
    expect(space.settings.maxMembers).toBe(20);
  });
});

describe('Space.getWelcomeMessage()', () => {
  it('should generate welcome message with name and description', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName('Code Club'),
      description: createValidSpaceDescription('Learn to code together!'),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const message = space.getWelcomeMessage();

    expect(message).toContain('Code Club');
    expect(message).toContain('Learn to code together!');
    expect(message).toContain('Welcome');
  });
});

describe('Space.getSuggestedActions()', () => {
  it('should always include introduce_yourself action', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const actions = space.getSuggestedActions();

    const hasIntroAction = actions.some(a => a.action === 'introduce_yourself');
    expect(hasIntroAction).toBe(true);
  });

  it('should always include invite_friends action', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const actions = space.getSuggestedActions();

    const hasInviteAction = actions.some(a => a.action === 'invite_friends');
    expect(hasInviteAction).toBe(true);
  });

  it('should suggest reading posts when space has posts', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    space.incrementPostCount();

    const actions = space.getSuggestedActions();

    const hasReadAction = actions.some(a => a.action === 'read_recent_posts');
    expect(hasReadAction).toBe(true);
  });

  it('should suggest sharing resources for study-group category', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName('Math Study Group'),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(SpaceCategoryEnum.STUDY_GROUP),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const actions = space.getSuggestedActions();

    const hasResourceAction = actions.some(a => a.action === 'share_resources');
    expect(hasResourceAction).toBe(true);
  });

  it('should not suggest sharing resources for non-study-group', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName('Social Club'),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(SpaceCategoryEnum.SOCIAL),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const actions = space.getSuggestedActions();

    const hasResourceAction = actions.some(a => a.action === 'share_resources');
    expect(hasResourceAction).toBe(false);
  });
});

describe('Space Business Invariants', () => {
  it('should maintain campus isolation', () => {
    const campusId = createValidCampusId('ub-buffalo');
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: campusId,
      createdBy: createValidProfileId()
    }).getValue();

    expect(space.campusId.value).toBe('ub-buffalo');
  });

  it('should initialize with active status', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    expect((space as any).props.isActive).toBe(true);
  });

  it('should initialize with non-verified status', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    expect(space.isVerified).toBe(false);
  });

  it('should initialize trending score to zero', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    expect(space.trendingScore).toBe(0);
  });

  it('should track last activity timestamp', () => {
    const space = Space.create({
      spaceId: createValidSpaceId(),
      name: createValidSpaceName(),
      description: createValidSpaceDescription(),
      category: createValidSpaceCategory(),
      campusId: createValidCampusId(),
      createdBy: createValidProfileId()
    }).getValue();

    const beforeActivity = space.lastActivityAt;

    // Wait a tick
    setTimeout(() => {
      space.incrementPostCount();
      const afterActivity = space.lastActivityAt;

      expect(afterActivity.getTime()).toBeGreaterThanOrEqual(beforeActivity.getTime());
    }, 10);
  });

  it('should enforce category validation', () => {
    const validCategories = [
      SpaceCategoryEnum.GENERAL,
      SpaceCategoryEnum.STUDY_GROUP,
      SpaceCategoryEnum.SOCIAL,
      SpaceCategoryEnum.CLUB,
      SpaceCategoryEnum.ACADEMIC
    ];

    validCategories.forEach(cat => {
      const result = Space.create({
        spaceId: createValidSpaceId(),
        name: createValidSpaceName(),
        description: createValidSpaceDescription(),
        category: createValidSpaceCategory(cat),
        campusId: createValidCampusId(),
        createdBy: createValidProfileId()
      });

      expect(result.isSuccess).toBe(true);
    });
  });
});
