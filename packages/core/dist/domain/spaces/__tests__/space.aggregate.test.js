"use strict";
/**
 * Space Aggregate Tests
 * Comprehensive test coverage for Space business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_aggregate_1 = require("../aggregates/space.aggregate");
const space_id_value_1 = require("../value-objects/space-id.value");
const space_name_value_1 = require("../value-objects/space-name.value");
const space_description_value_1 = require("../value-objects/space-description.value");
const space_category_value_1 = require("../value-objects/space-category.value");
const campus_id_value_1 = require("../../profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../../profile/value-objects/profile-id.value");
const tab_1 = require("../entities/tab");
const widget_1 = require("../entities/widget");
/**
 * Test Data Factories
 */
const createValidSpaceId = () => {
    const result = space_id_value_1.SpaceId.generate(); // Use generate() for auto-generated IDs
    if (result.isFailure)
        throw new Error('Failed to create SpaceId');
    return result.getValue();
};
const createValidSpaceName = (name = 'Test Space') => {
    const result = space_name_value_1.SpaceName.create(name);
    if (result.isFailure)
        throw new Error(`Failed to create SpaceName: ${result.error}`);
    return result.getValue();
};
const createValidSpaceDescription = (desc = 'A test space for students') => {
    const result = space_description_value_1.SpaceDescription.create(desc);
    if (result.isFailure)
        throw new Error(`Failed to create SpaceDescription: ${result.error}`);
    return result.getValue();
};
const createValidSpaceCategory = (category = space_category_value_1.SpaceCategoryEnum.GENERAL) => {
    const result = space_category_value_1.SpaceCategory.create(category);
    if (result.isFailure)
        throw new Error(`Failed to create SpaceCategory: ${result.error}`);
    return result.getValue();
};
const createValidCampusId = (value = 'ub-buffalo') => {
    const result = campus_id_value_1.CampusId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create CampusId: ${result.error}`);
    return result.getValue();
};
const createValidProfileId = (value = 'profile_123') => {
    const result = profile_id_value_1.ProfileId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create ProfileId: ${result.error}`);
    return result.getValue();
};
const createValidTab = (name = 'Test Tab', type = 'feed') => {
    const result = tab_1.Tab.create({ name, type });
    if (result.isFailure)
        throw new Error(`Failed to create Tab: ${result.error}`);
    return result.getValue();
};
const createValidWidget = (title = 'Test Widget', type = 'calendar') => {
    const result = widget_1.Widget.create({ title, type });
    if (result.isFailure)
        throw new Error(`Failed to create Widget: ${result.error}`);
    return result.getValue();
};
/**
 * Tests
 */
(0, vitest_1.describe)('Space.create()', () => {
    (0, vitest_1.it)('should create a valid space with required properties', () => {
        const result = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        (0, vitest_1.expect)(space).toBeDefined();
        (0, vitest_1.expect)(space.name.value).toBe('Test Space');
        (0, vitest_1.expect)(space.description.value).toBe('A test space for students');
        (0, vitest_1.expect)(space.memberCount).toBe(1); // Creator is automatically added
        (0, vitest_1.expect)(space.isPublic).toBe(true); // Default visibility
    });
    (0, vitest_1.it)('should add creator as admin member', () => {
        const creatorId = createValidProfileId('creator_123');
        const result = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: creatorId
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        (0, vitest_1.expect)(space.isMember(creatorId)).toBe(true);
        (0, vitest_1.expect)(space.getMemberRole(creatorId)).toBe('admin');
        (0, vitest_1.expect)(space.adminCount).toBe(1);
    });
    (0, vitest_1.it)('should create default Feed tab', () => {
        const result = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        (0, vitest_1.expect)(space.tabs.length).toBe(1);
        (0, vitest_1.expect)(space.tabs[0].name).toBe('Feed');
        (0, vitest_1.expect)(space.tabs[0].type).toBe('feed');
        (0, vitest_1.expect)(space.tabs[0].isDefault).toBe(true);
    });
    (0, vitest_1.it)('should emit SpaceCreatedEvent', () => {
        const result = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName('Code Club'),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(space_category_value_1.SpaceCategoryEnum.CLUB),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId('creator_456')
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        const events = space.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[0].getEventName()).toBe('SpaceCreated');
    });
    (0, vitest_1.it)('should respect custom visibility setting', () => {
        const result = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId(),
            visibility: 'private'
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        (0, vitest_1.expect)(space.isPublic).toBe(false);
        (0, vitest_1.expect)(space.visibility).toBe('private');
    });
    (0, vitest_1.it)('should apply custom settings', () => {
        const result = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const space = result.getValue();
        (0, vitest_1.expect)(space.settings.allowInvites).toBe(false);
        (0, vitest_1.expect)(space.settings.requireApproval).toBe(true);
        (0, vitest_1.expect)(space.settings.maxMembers).toBe(50);
    });
});
(0, vitest_1.describe)('Space.addMember()', () => {
    (0, vitest_1.it)('should add a new member with default role', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const newMemberId = createValidProfileId('member_001');
        const result = space.addMember(newMemberId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.memberCount).toBe(2);
        (0, vitest_1.expect)(space.isMember(newMemberId)).toBe(true);
        (0, vitest_1.expect)(space.getMemberRole(newMemberId)).toBe('member');
    });
    (0, vitest_1.it)('should add member with moderator role', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const newMemberId = createValidProfileId('mod_001');
        const result = space.addMember(newMemberId, 'moderator');
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.getMemberRole(newMemberId)).toBe('moderator');
    });
    (0, vitest_1.it)('should prevent adding duplicate members', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('already a member');
    });
    (0, vitest_1.it)('should enforce max member limit', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('maximum member capacity');
    });
    (0, vitest_1.it)('should emit MemberJoinedEvent', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('MemberJoined');
    });
});
(0, vitest_1.describe)('Space.removeMember()', () => {
    (0, vitest_1.it)('should remove an existing member', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const memberId = createValidProfileId('member_001');
        space.addMember(memberId);
        (0, vitest_1.expect)(space.memberCount).toBe(2);
        const result = space.removeMember(memberId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.memberCount).toBe(1);
        (0, vitest_1.expect)(space.isMember(memberId)).toBe(false);
    });
    (0, vitest_1.it)('should fail when removing non-existent member', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const nonMemberId = createValidProfileId('non_member');
        const result = space.removeMember(nonMemberId);
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('not a member');
    });
    (0, vitest_1.it)('should prevent removing the last admin', () => {
        const creatorId = createValidProfileId('creator_001');
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: creatorId
        }).getValue();
        const result = space.removeMember(creatorId);
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('last admin');
    });
    (0, vitest_1.it)('should allow removing admin when multiple admins exist', () => {
        const creatorId = createValidProfileId('creator_001');
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(space.adminCount).toBe(2);
        const result = space.removeMember(creatorId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.adminCount).toBe(1);
    });
    (0, vitest_1.it)('should emit MemberRemovedEvent', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('MemberRemoved');
    });
});
(0, vitest_1.describe)('Space.isMember()', () => {
    (0, vitest_1.it)('should return true for existing members', () => {
        const creatorId = createValidProfileId('creator_001');
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: creatorId
        }).getValue();
        (0, vitest_1.expect)(space.isMember(creatorId)).toBe(true);
    });
    (0, vitest_1.it)('should return false for non-members', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const nonMemberId = createValidProfileId('non_member');
        (0, vitest_1.expect)(space.isMember(nonMemberId)).toBe(false);
    });
});
(0, vitest_1.describe)('Space.getMemberRole()', () => {
    (0, vitest_1.it)('should return correct role for member', () => {
        const creatorId = createValidProfileId('creator_001');
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: creatorId
        }).getValue();
        (0, vitest_1.expect)(space.getMemberRole(creatorId)).toBe('admin');
    });
    (0, vitest_1.it)('should return null for non-member', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const nonMemberId = createValidProfileId('non_member');
        (0, vitest_1.expect)(space.getMemberRole(nonMemberId)).toBeNull();
    });
});
(0, vitest_1.describe)('Space.updateMemberRole()', () => {
    (0, vitest_1.it)('should update member role successfully', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.getMemberRole(memberId)).toBe('moderator');
    });
    (0, vitest_1.it)('should fail when updating non-existent member', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const nonMemberId = createValidProfileId('non_member');
        const result = space.updateMemberRole(nonMemberId, 'moderator');
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('not a member');
    });
    (0, vitest_1.it)('should prevent demoting the last admin', () => {
        const creatorId = createValidProfileId('creator_001');
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: creatorId
        }).getValue();
        const result = space.updateMemberRole(creatorId, 'member');
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('last admin');
    });
    (0, vitest_1.it)('should allow promoting member to admin', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.adminCount).toBe(2);
    });
    (0, vitest_1.it)('should emit MemberRoleUpdatedEvent', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('MemberRoleUpdated');
    });
});
(0, vitest_1.describe)('Space.addTab()', () => {
    (0, vitest_1.it)('should add a new tab successfully', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.tabs.length).toBe(initialTabCount + 1);
    });
    (0, vitest_1.it)('should prevent adding tab with duplicate name', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('already exists');
    });
});
(0, vitest_1.describe)('Space.addWidget()', () => {
    (0, vitest_1.it)('should add a new widget successfully', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const widget = createValidWidget('Event Calendar', 'calendar');
        const result = space.addWidget(widget);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(space.widgets.length).toBe(1);
    });
    (0, vitest_1.it)('should allow multiple widgets', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(space.widgets.length).toBe(2);
    });
});
(0, vitest_1.describe)('Space.incrementPostCount()', () => {
    (0, vitest_1.it)('should increment post count', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        (0, vitest_1.expect)(space.postCount).toBe(0);
        space.incrementPostCount();
        (0, vitest_1.expect)(space.postCount).toBe(1);
    });
    (0, vitest_1.it)('should emit PostCreatedEvent when post details provided', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('PostCreated');
    });
    (0, vitest_1.it)('should increment multiple times', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(space.postCount).toBe(3);
    });
});
(0, vitest_1.describe)('Space.updateSettings()', () => {
    (0, vitest_1.it)('should update settings successfully', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        space.updateSettings({
            allowInvites: false,
            requireApproval: true
        });
        (0, vitest_1.expect)(space.settings.allowInvites).toBe(false);
        (0, vitest_1.expect)(space.settings.requireApproval).toBe(true);
    });
    (0, vitest_1.it)('should merge with existing settings', () => {
        const space = space_aggregate_1.Space.create({
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
        space.updateSettings({
            requireApproval: true
        });
        (0, vitest_1.expect)(space.settings.allowInvites).toBe(true); // Preserved
        (0, vitest_1.expect)(space.settings.requireApproval).toBe(true); // Updated
        (0, vitest_1.expect)(space.settings.maxMembers).toBe(100); // Preserved
    });
});
(0, vitest_1.describe)('Space.getWelcomeMessage()', () => {
    (0, vitest_1.it)('should generate welcome message with name and description', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName('Code Club'),
            description: createValidSpaceDescription('Learn to code together!'),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const message = space.getWelcomeMessage();
        (0, vitest_1.expect)(message).toContain('Code Club');
        (0, vitest_1.expect)(message).toContain('Learn to code together!');
        (0, vitest_1.expect)(message).toContain('Welcome');
    });
});
(0, vitest_1.describe)('Space.getSuggestedActions()', () => {
    (0, vitest_1.it)('should always include introduce_yourself action', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const actions = space.getSuggestedActions();
        const hasIntroAction = actions.some(a => a.action === 'introduce_yourself');
        (0, vitest_1.expect)(hasIntroAction).toBe(true);
    });
    (0, vitest_1.it)('should always include invite_friends action', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const actions = space.getSuggestedActions();
        const hasInviteAction = actions.some(a => a.action === 'invite_friends');
        (0, vitest_1.expect)(hasInviteAction).toBe(true);
    });
    (0, vitest_1.it)('should suggest reading posts when space has posts', () => {
        const space = space_aggregate_1.Space.create({
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
        (0, vitest_1.expect)(hasReadAction).toBe(true);
    });
    (0, vitest_1.it)('should suggest sharing resources for study-group category', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName('Math Study Group'),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(space_category_value_1.SpaceCategoryEnum.STUDY_GROUP),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const actions = space.getSuggestedActions();
        const hasResourceAction = actions.some(a => a.action === 'share_resources');
        (0, vitest_1.expect)(hasResourceAction).toBe(true);
    });
    (0, vitest_1.it)('should not suggest sharing resources for non-study-group', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName('Social Club'),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(space_category_value_1.SpaceCategoryEnum.SOCIAL),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        const actions = space.getSuggestedActions();
        const hasResourceAction = actions.some(a => a.action === 'share_resources');
        (0, vitest_1.expect)(hasResourceAction).toBe(false);
    });
});
(0, vitest_1.describe)('Space Business Invariants', () => {
    (0, vitest_1.it)('should maintain campus isolation', () => {
        const campusId = createValidCampusId('ub-buffalo');
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: campusId,
            createdBy: createValidProfileId()
        }).getValue();
        (0, vitest_1.expect)(space.campusId.value).toBe('ub-buffalo');
    });
    (0, vitest_1.it)('should initialize with active status', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        (0, vitest_1.expect)(space.props.isActive).toBe(true);
    });
    (0, vitest_1.it)('should initialize with non-verified status', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        (0, vitest_1.expect)(space.isVerified).toBe(false);
    });
    (0, vitest_1.it)('should initialize trending score to zero', () => {
        const space = space_aggregate_1.Space.create({
            spaceId: createValidSpaceId(),
            name: createValidSpaceName(),
            description: createValidSpaceDescription(),
            category: createValidSpaceCategory(),
            campusId: createValidCampusId(),
            createdBy: createValidProfileId()
        }).getValue();
        (0, vitest_1.expect)(space.trendingScore).toBe(0);
    });
    (0, vitest_1.it)('should track last activity timestamp', () => {
        const space = space_aggregate_1.Space.create({
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
            (0, vitest_1.expect)(afterActivity.getTime()).toBeGreaterThanOrEqual(beforeActivity.getTime());
        }, 10);
    });
    (0, vitest_1.it)('should enforce category validation', () => {
        const validCategories = [
            space_category_value_1.SpaceCategoryEnum.GENERAL,
            space_category_value_1.SpaceCategoryEnum.STUDY_GROUP,
            space_category_value_1.SpaceCategoryEnum.SOCIAL,
            space_category_value_1.SpaceCategoryEnum.CLUB,
            space_category_value_1.SpaceCategoryEnum.ACADEMIC
        ];
        validCategories.forEach(cat => {
            const result = space_aggregate_1.Space.create({
                spaceId: createValidSpaceId(),
                name: createValidSpaceName(),
                description: createValidSpaceDescription(),
                category: createValidSpaceCategory(cat),
                campusId: createValidCampusId(),
                createdBy: createValidProfileId()
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=space.aggregate.test.js.map