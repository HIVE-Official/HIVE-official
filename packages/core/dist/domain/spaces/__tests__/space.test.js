"use strict";
/**
 * Space Domain Tests
 * Simple tests to validate spaces business rules
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const space_1 = require("../space");
const value_objects_1 = require("../value-objects");
(0, vitest_1.describe)('Space Domain', () => {
    (0, vitest_1.describe)('Space Creation', () => {
        (0, vitest_1.it)('should create a valid space', () => {
            const result = space_1.Space.create({
                name: 'CS Study Group',
                description: 'Study group for computer science students',
                type: 'academic',
                creatorId: 'user123'
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const space = result.getValue();
            (0, vitest_1.expect)(space.name.name).toBe('CS Study Group');
            (0, vitest_1.expect)(space.type.type).toBe('academic');
            (0, vitest_1.expect)(space.memberCount).toBe(1); // Creator is automatically a member
            (0, vitest_1.expect)(space.creator.id).toBe('user123');
        });
        (0, vitest_1.it)('should reject empty space name', () => {
            const result = space_1.Space.create({
                name: '',
                description: 'A space',
                type: 'general',
                creatorId: 'user123'
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('cannot be empty');
        });
        (0, vitest_1.it)('should reject invalid space type', () => {
            const result = space_1.Space.create({
                name: 'Test Space',
                description: 'A space',
                type: 'invalid-type',
                creatorId: 'user123'
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Invalid space type');
        });
        (0, vitest_1.it)('should reject long space name', () => {
            const longName = 'a'.repeat(101);
            const result = space_1.Space.create({
                name: longName,
                description: 'A space',
                type: 'general',
                creatorId: 'user123'
            });
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('100 characters');
        });
    });
    (0, vitest_1.describe)('Member Management', () => {
        let space;
        const creatorId = new space_1.ProfileId('creator123');
        const newUserId = new space_1.ProfileId('user456');
        (0, vitest_1.beforeEach)(() => {
            const result = space_1.Space.create({
                name: 'Test Space',
                description: 'A test space',
                type: 'general',
                creatorId: creatorId.id
            });
            space = result.getValue();
        });
        (0, vitest_1.it)('should add new member', () => {
            const result = space.addMember(newUserId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(space.memberCount).toBe(2);
            (0, vitest_1.expect)(space.isMember(newUserId)).toBe(true);
        });
        (0, vitest_1.it)('should reject duplicate member', () => {
            space.addMember(newUserId);
            const result = space.addMember(newUserId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('already a member');
        });
        (0, vitest_1.it)('should remove member', () => {
            space.addMember(newUserId);
            const result = space.removeMember(newUserId, creatorId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(space.memberCount).toBe(1);
            (0, vitest_1.expect)(space.isMember(newUserId)).toBe(false);
        });
        (0, vitest_1.it)('should not allow removing space creator', () => {
            const result = space.removeMember(creatorId, creatorId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Cannot remove space creator');
        });
        (0, vitest_1.it)('should not allow non-moderators to remove members', () => {
            const regularUser = new space_1.ProfileId('regular789');
            space.addMember(regularUser);
            space.addMember(newUserId);
            const result = space.removeMember(newUserId, regularUser);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Only leaders and moderators');
        });
    });
    (0, vitest_1.describe)('Post Creation', () => {
        let space;
        const creatorId = new space_1.ProfileId('creator123');
        const memberId = new space_1.ProfileId('member456');
        const nonMemberId = new space_1.ProfileId('outsider789');
        (0, vitest_1.beforeEach)(() => {
            const result = space_1.Space.create({
                name: 'Test Space',
                description: 'A test space',
                type: 'general',
                creatorId: creatorId.id
            });
            space = result.getValue();
            space.addMember(memberId);
        });
        (0, vitest_1.it)('should allow members to create posts', () => {
            const content = value_objects_1.PostContent.create('Hello from the space!').getValue();
            const result = space.createPost(content, memberId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(space.postCount).toBe(1);
            const post = result.getValue();
            (0, vitest_1.expect)(post.content.text).toBe('Hello from the space!');
            (0, vitest_1.expect)(post.authorId.equals(memberId)).toBe(true);
        });
        (0, vitest_1.it)('should reject posts from non-members', () => {
            const content = value_objects_1.PostContent.create('Hello!').getValue();
            const result = space.createPost(content, nonMemberId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Only members can post');
        });
        (0, vitest_1.it)('should create RSS posts when enabled', () => {
            // Enable RSS feed
            space.updateSettings({ rssFeedEnabled: true }, creatorId);
            const content = value_objects_1.PostContent.create('RSS content from external feed').getValue();
            const result = space.addRSSPost(content, 'https://example.com/rss-item');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const post = result.getValue();
            (0, vitest_1.expect)(post.isFromRSS).toBe(true);
            (0, vitest_1.expect)(post.rssSourceUrl).toBe('https://example.com/rss-item');
        });
        (0, vitest_1.it)('should reject RSS posts when disabled', () => {
            const content = value_objects_1.PostContent.create('RSS content').getValue();
            const result = space.addRSSPost(content, 'https://example.com/rss-item');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('RSS feed is not enabled');
        });
    });
    (0, vitest_1.describe)('Space Settings', () => {
        let space;
        const creatorId = new space_1.ProfileId('creator123');
        const memberId = new space_1.ProfileId('member456');
        (0, vitest_1.beforeEach)(() => {
            const result = space_1.Space.create({
                name: 'Test Space',
                description: 'A test space',
                type: 'general',
                creatorId: creatorId.id
            });
            space = result.getValue();
            space.addMember(memberId);
        });
        (0, vitest_1.it)('should allow creator to update settings', () => {
            const result = space.updateSettings({
                isPrivate: true,
                allowMemberPosts: false
            }, creatorId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(space.isPrivate).toBe(true);
            (0, vitest_1.expect)(space.settings.allowMemberPosts).toBe(false);
        });
        (0, vitest_1.it)('should reject settings update from non-leader', () => {
            const result = space.updateSettings({
                isPrivate: true
            }, memberId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Only space leaders');
        });
        (0, vitest_1.it)('should validate RSS feed URL', () => {
            const invalidUrl = 'not-a-url';
            const rssUrl = value_objects_1.RSSFeedUrl.create(invalidUrl);
            (0, vitest_1.expect)(rssUrl.isFailure).toBe(true);
            (0, vitest_1.expect)(rssUrl.error).toContain('Invalid RSS feed URL');
        });
    });
    (0, vitest_1.describe)('Member Roles', () => {
        let space;
        const creatorId = new space_1.ProfileId('creator123');
        const memberId = new space_1.ProfileId('member456');
        (0, vitest_1.beforeEach)(() => {
            const result = space_1.Space.create({
                name: 'Test Space',
                description: 'A test space',
                type: 'general',
                creatorId: creatorId.id
            });
            space = result.getValue();
            space.addMember(memberId);
        });
        (0, vitest_1.it)('should promote member to moderator', () => {
            const result = space.promoteToModerator(memberId, creatorId);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const memberRole = space.getMemberRole(memberId);
            (0, vitest_1.expect)(memberRole?.canModerate()).toBe(true);
        });
        (0, vitest_1.it)('should not allow regular member to promote others', () => {
            const newMember = new space_1.ProfileId('new789');
            space.addMember(newMember);
            const result = space.promoteToModerator(newMember, memberId);
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Only space leaders');
        });
    });
    (0, vitest_1.describe)('Space Activity', () => {
        let space;
        const creatorId = new space_1.ProfileId('creator123');
        (0, vitest_1.beforeEach)(() => {
            const result = space_1.Space.create({
                name: 'Active Space',
                description: 'A very active space',
                type: 'general',
                creatorId: creatorId.id
            });
            space = result.getValue();
        });
        (0, vitest_1.it)('should calculate activity score', () => {
            // Add some posts
            const content1 = value_objects_1.PostContent.create('First post').getValue();
            const content2 = value_objects_1.PostContent.create('Second post').getValue();
            space.createPost(content1, creatorId);
            space.createPost(content2, creatorId);
            const score = space.getActivityScore();
            (0, vitest_1.expect)(score).toBeGreaterThan(0);
        });
        (0, vitest_1.it)('should return higher score for more active spaces', () => {
            const content = value_objects_1.PostContent.create('Active post').getValue();
            // Create multiple posts
            for (let i = 0; i < 5; i++) {
                space.createPost(content, creatorId);
            }
            const highScore = space.getActivityScore();
            // Create another space with fewer posts
            const lessActiveSpace = space_1.Space.create({
                name: 'Less Active',
                description: 'Less active space',
                type: 'general',
                creatorId: creatorId.id
            }).getValue();
            lessActiveSpace.createPost(content, creatorId);
            const lowScore = lessActiveSpace.getActivityScore();
            (0, vitest_1.expect)(highScore).toBeGreaterThan(lowScore);
        });
    });
    (0, vitest_1.describe)('Join Permissions', () => {
        (0, vitest_1.it)('should allow joining public spaces', () => {
            const space = space_1.Space.create({
                name: 'Public Space',
                description: 'Open to all',
                type: 'general',
                creatorId: 'creator123',
                isPrivate: false
            }).getValue();
            const newUser = new space_1.ProfileId('newuser456');
            (0, vitest_1.expect)(space.canJoin(newUser)).toBe(true);
        });
        (0, vitest_1.it)('should not allow joining private spaces without invitation', () => {
            const space = space_1.Space.create({
                name: 'Private Space',
                description: 'Invitation only',
                type: 'general',
                creatorId: 'creator123',
                isPrivate: true
            }).getValue();
            const newUser = new space_1.ProfileId('newuser456');
            (0, vitest_1.expect)(space.canJoin(newUser)).toBe(false);
        });
        (0, vitest_1.it)('should not allow joining if already a member', () => {
            const space = space_1.Space.create({
                name: 'Test Space',
                description: 'A space',
                type: 'general',
                creatorId: 'creator123'
            }).getValue();
            const creator = new space_1.ProfileId('creator123');
            (0, vitest_1.expect)(space.canJoin(creator)).toBe(false); // Creator is already a member
        });
    });
});
//# sourceMappingURL=space.test.js.map