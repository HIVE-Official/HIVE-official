"use strict";
/**
 * Space Aggregate - Community and Content Domain
 * Based on SPEC.md spaces requirements and RSS integration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
const value_objects_1 = require("./value-objects");
// Import ProfileId from profile domain
const value_objects_2 = require("../profile/value-objects");
/**
 * Space Aggregate Root
 * Represents a student community and its content
 */
class Space {
    constructor(data) {
        this.data = data;
    }
    // Getters
    get id() {
        return this.data.id;
    }
    get name() {
        return this.data.name;
    }
    get description() {
        return this.data.description;
    }
    get type() {
        return this.data.type;
    }
    get creator() {
        return this.data.creator;
    }
    get memberCount() {
        return this.data.members.length;
    }
    get postCount() {
        return this.data.posts.length;
    }
    get isPrivate() {
        return this.data.settings.isPrivate;
    }
    get campusId() {
        return this.data.campusId;
    }
    get members() {
        return [...this.data.members];
    }
    get recentPosts() {
        return [...this.data.posts]
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 20);
    }
    get settings() {
        return { ...this.data.settings };
    }
    // Factory method to create new space
    static create(props) {
        // Validate space name
        const nameResult = value_objects_1.SpaceName.create(props.name);
        if (nameResult.isFailure) {
            return value_objects_1.Result.fail(nameResult.error);
        }
        // Validate description
        const descriptionResult = value_objects_1.SpaceDescription.create(props.description);
        if (descriptionResult.isFailure) {
            return value_objects_1.Result.fail(descriptionResult.error);
        }
        // Validate type
        const typeResult = value_objects_1.SpaceType.create(props.type);
        if (typeResult.isFailure) {
            return value_objects_1.Result.fail(typeResult.error);
        }
        const now = new Date();
        const spaceId = value_objects_1.SpaceId.generate();
        const creatorIdResult = value_objects_2.ProfileId.create(props.creatorId);
        if (creatorIdResult.isFailure) {
            return value_objects_1.Result.fail(creatorIdResult.error);
        }
        const creatorId = creatorIdResult.getValue();
        // Creator is automatically a leader
        const creatorMember = {
            profileId: creatorId,
            role: value_objects_1.MemberRole.leader(),
            joinedAt: now,
        };
        const space = new Space({
            id: spaceId,
            name: nameResult.getValue(),
            description: descriptionResult.getValue(),
            type: typeResult.getValue(),
            creator: creatorId,
            members: [creatorMember],
            posts: [],
            settings: {
                isPrivate: props.isPrivate || false,
                allowMemberPosts: true,
                requireApproval: false,
                rssFeedEnabled: false,
            },
            campusId: props.campusId,
            createdAt: now,
            updatedAt: now,
        });
        return value_objects_1.Result.ok(space);
    }
    // Add member to space
    addMember(profileId) {
        // Check if already a member
        if (this.isMember(profileId)) {
            return value_objects_1.Result.fail('User is already a member');
        }
        const newMember = {
            profileId,
            role: value_objects_1.MemberRole.member(),
            joinedAt: new Date(),
        };
        this.data.members.push(newMember);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(newMember);
    }
    // Remove member from space
    removeMember(profileId, removedBy) {
        // Can't remove the creator
        if (this.data.creator.equals(profileId)) {
            return value_objects_1.Result.fail('Cannot remove space creator');
        }
        // Check permissions
        const removerRole = this.getMemberRole(removedBy);
        if (!removerRole?.canModerate()) {
            return value_objects_1.Result.fail('Only leaders and moderators can remove members');
        }
        const memberIndex = this.data.members.findIndex(m => m.profileId.equals(profileId));
        if (memberIndex === -1) {
            return value_objects_1.Result.fail('User is not a member');
        }
        this.data.members.splice(memberIndex, 1);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Create post in space
    createPost(content, authorId) {
        // Check if author is a member
        if (!this.isMember(authorId)) {
            return value_objects_1.Result.fail('Only members can post in this space');
        }
        // Check posting permissions
        if (!this.data.settings.allowMemberPosts) {
            const authorRole = this.getMemberRole(authorId);
            if (!authorRole?.canModerate()) {
                return value_objects_1.Result.fail('Only leaders and moderators can post in this space');
            }
        }
        const post = {
            id: value_objects_1.PostId.generate(),
            content,
            authorId,
            spaceId: this.data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            reactions: {},
            commentCount: 0,
            isFromRSS: false,
        };
        this.data.posts.push(post);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(post);
    }
    // Add RSS post (from feed integration)
    addRSSPost(content, sourceUrl) {
        if (!this.data.settings.rssFeedEnabled) {
            return value_objects_1.Result.fail('RSS feed is not enabled for this space');
        }
        const post = {
            id: value_objects_1.PostId.generate(),
            content,
            authorId: this.data.creator, // RSS posts are attributed to space creator
            spaceId: this.data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            reactions: {},
            commentCount: 0,
            isFromRSS: true,
            rssSourceUrl: sourceUrl,
        };
        this.data.posts.push(post);
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok(post);
    }
    // Update space settings
    updateSettings(newSettings, updatedBy) {
        // Check permissions
        const updaterRole = this.getMemberRole(updatedBy);
        if (!updaterRole?.canManageSpace()) {
            return value_objects_1.Result.fail('Only space leaders can update settings');
        }
        // Validate RSS feed URL if provided
        if (newSettings.rssFeedUrl) {
            const rssResult = value_objects_1.RSSFeedUrl.create(newSettings.rssFeedUrl.url);
            if (rssResult.isFailure) {
                return value_objects_1.Result.fail(rssResult.error);
            }
        }
        this.data.settings = {
            ...this.data.settings,
            ...newSettings,
        };
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Promote member to moderator
    promoteToModerator(profileId, promotedBy) {
        if (!this.getMemberRole(promotedBy)?.canManageSpace()) {
            return value_objects_1.Result.fail('Only space leaders can promote members');
        }
        const member = this.data.members.find(m => m.profileId.equals(profileId));
        if (!member) {
            return value_objects_1.Result.fail('User is not a member');
        }
        member.role = value_objects_1.MemberRole.moderator();
        this.data.updatedAt = new Date();
        return value_objects_1.Result.ok();
    }
    // Check if user is member
    isMember(profileId) {
        return this.data.members.some(m => m.profileId.equals(profileId));
    }
    // Get member role
    getMemberRole(profileId) {
        const member = this.data.members.find(m => m.profileId.equals(profileId));
        return member ? member.role : null;
    }
    // Check if user can join (for private spaces)
    canJoin(profileId) {
        if (this.isMember(profileId)) {
            return false; // Already a member
        }
        // Public spaces are always joinable
        if (!this.data.settings.isPrivate) {
            return true;
        }
        // Private spaces require invitation (handled elsewhere)
        return false;
    }
    // Get space activity score (for trending calculation)
    getActivityScore(timeWindowHours = 24) {
        const cutoffTime = new Date(Date.now() - timeWindowHours * 60 * 60 * 1000);
        const recentPosts = this.data.posts.filter(p => p.createdAt > cutoffTime);
        const totalReactions = recentPosts.reduce((sum, post) => {
            return sum + Object.values(post.reactions).flat().length;
        }, 0);
        const totalComments = recentPosts.reduce((sum, post) => sum + post.commentCount, 0);
        // SPEC.md formula: log(reactions + comments×2 + reposts×3 + requotes×4)
        const score = Math.log(1 + totalReactions + totalComments * 2);
        return Math.max(0, score);
    }
    // Convert to plain object for persistence
    toData() {
        return {
            ...this.data,
            members: [...this.data.members],
            posts: [...this.data.posts],
            settings: { ...this.data.settings },
        };
    }
    // Recreate from persistence data
    static fromData(data) {
        return new Space(data);
    }
}
exports.Space = Space;
//# sourceMappingURL=space.js.map