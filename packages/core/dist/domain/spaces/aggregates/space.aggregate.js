"use strict";
/**
 * Space Aggregate
 * Represents a community space with full DDD business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
const AggregateRoot_base_1 = require("../../shared/base/AggregateRoot.base");
const Result_1 = require("../../shared/base/Result");
const tab_1 = require("../entities/tab");
const space_created_event_1 = require("../events/space-created.event");
const member_joined_event_1 = require("../events/member-joined.event");
const member_removed_event_1 = require("../events/member-removed.event");
const member_role_updated_event_1 = require("../events/member-role-updated.event");
const post_created_event_1 = require("../events/post-created.event");
class Space extends AggregateRoot_base_1.AggregateRoot {
    get spaceId() {
        return this.props.spaceId;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get category() {
        return this.props.category;
    }
    get campusId() {
        return this.props.campusId;
    }
    get memberCount() {
        return this.props.members.length;
    }
    get isPublic() {
        return this.props.visibility === 'public';
    }
    get tabs() {
        return this.props.tabs;
    }
    get widgets() {
        return this.props.widgets;
    }
    get isVerified() {
        return this.props.isVerified;
    }
    get trendingScore() {
        return this.props.trendingScore;
    }
    get rushMode() {
        return this.props.rushMode;
    }
    get postCount() {
        return this.props.postCount;
    }
    get members() {
        return this.props.members;
    }
    get adminCount() {
        return this.getAdminCount();
    }
    get lastActivityAt() {
        return this.props.lastActivityAt;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    // Compatibility getters for Space interface
    get spaceIdValue() {
        return this.props.spaceId;
    }
    get visibility() {
        return this.props.visibility;
    }
    get settings() {
        return this.props.settings;
    }
    get spaceType() {
        return this.props.category.value;
    }
    get posts() {
        // Posts are managed separately - return empty array for interface compatibility
        return [];
    }
    getMemberCount() {
        return this.props.members.length;
    }
    constructor(props, id) {
        super(props, id || `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    static create(props, id) {
        const defaultSettings = {
            allowInvites: true,
            requireApproval: false,
            allowRSS: false,
            isPublic: props.visibility === 'public',
            ...props.settings
        };
        const creator = {
            profileId: props.createdBy,
            role: 'admin',
            joinedAt: new Date()
        };
        const spaceProps = {
            spaceId: props.spaceId,
            name: props.name,
            description: props.description,
            category: props.category,
            campusId: props.campusId,
            createdBy: props.createdBy,
            members: [creator],
            tabs: [],
            widgets: [],
            settings: defaultSettings,
            rssUrl: props.rssUrl,
            visibility: props.visibility || 'public',
            isActive: true,
            isVerified: false,
            trendingScore: 0,
            rushMode: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastActivityAt: new Date(),
            postCount: 0
        };
        const space = new Space(spaceProps, id);
        // Create default tabs
        space.createDefaultTabs();
        // Fire domain event
        space.addDomainEvent(new space_created_event_1.SpaceCreatedEvent(space.id, props.name.value, props.category.value, props.createdBy.value));
        return Result_1.Result.ok(space);
    }
    addMember(profileId, role = 'member') {
        if (this.isMember(profileId)) {
            return Result_1.Result.fail('User is already a member');
        }
        if (this.props.settings.maxMembers && this.memberCount >= this.props.settings.maxMembers) {
            return Result_1.Result.fail('Space has reached maximum member capacity');
        }
        this.props.members.push({
            profileId,
            role,
            joinedAt: new Date()
        });
        this.updateLastActivity();
        // Fire domain event
        this.addDomainEvent(new member_joined_event_1.MemberJoinedEvent(this.id, profileId.value, role, this.memberCount));
        return Result_1.Result.ok();
    }
    removeMember(profileId) {
        const memberIndex = this.props.members.findIndex(m => m.profileId.value === profileId.value);
        if (memberIndex === -1) {
            return Result_1.Result.fail('User is not a member');
        }
        const member = this.props.members[memberIndex];
        // Can't remove last admin
        if (member.role === 'admin' && this.getAdminCount() === 1) {
            return Result_1.Result.fail('Cannot remove the last admin');
        }
        this.props.members.splice(memberIndex, 1);
        this.updateLastActivity();
        // Fire domain event
        this.addDomainEvent(new member_removed_event_1.MemberRemovedEvent(this.id, profileId.value, this.memberCount));
        return Result_1.Result.ok();
    }
    isMember(profileId) {
        return this.props.members.some(m => m.profileId.value === profileId.value);
    }
    getMemberRole(profileId) {
        const member = this.props.members.find(m => m.profileId.value === profileId.value);
        return member ? member.role : null;
    }
    updateMemberRole(profileId, newRole) {
        const member = this.props.members.find(m => m.profileId.value === profileId.value);
        if (!member) {
            return Result_1.Result.fail('User is not a member');
        }
        // Can't demote last admin
        if (member.role === 'admin' && newRole !== 'admin' && this.getAdminCount() === 1) {
            return Result_1.Result.fail('Cannot demote the last admin');
        }
        const oldRole = member.role;
        member.role = newRole;
        this.updateLastActivity();
        // Fire domain event
        this.addDomainEvent(new member_role_updated_event_1.MemberRoleUpdatedEvent(this.id, profileId.value, oldRole, newRole));
        return Result_1.Result.ok();
    }
    addTab(tab) {
        if (this.props.tabs.find(t => t.name === tab.name)) {
            return Result_1.Result.fail('Tab with this name already exists');
        }
        this.props.tabs.push(tab);
        this.updateLastActivity();
        return Result_1.Result.ok();
    }
    addWidget(widget) {
        this.props.widgets.push(widget);
        this.updateLastActivity();
        return Result_1.Result.ok();
    }
    incrementPostCount(postId, authorId) {
        this.props.postCount++;
        this.updateLastActivity();
        // Fire domain event if post details provided
        if (postId && authorId) {
            this.addDomainEvent(new post_created_event_1.PostCreatedEvent(this.id, postId, authorId, this.props.postCount));
        }
    }
    updateSettings(settings) {
        this.props.settings = { ...this.props.settings, ...settings };
        this.props.updatedAt = new Date();
    }
    getAdminCount() {
        return this.props.members.filter(m => m.role === 'admin').length;
    }
    updateLastActivity() {
        this.props.lastActivityAt = new Date();
        this.props.updatedAt = new Date();
    }
    createDefaultTabs() {
        const feedTab = tab_1.Tab.create({
            name: 'Feed',
            type: 'feed',
            isDefault: true,
            order: 0,
            widgets: [],
            isVisible: true
        });
        if (feedTab.isSuccess) {
            this.props.tabs.push(feedTab.getValue());
        }
    }
    /**
     * Space Discovery Business Logic (Moved from SpaceDiscoveryService)
     */
    getWelcomeMessage() {
        const name = this.props.name.value;
        const description = this.props.description.value;
        return `Welcome to ${name}! ${description}`;
    }
    getSuggestedActions() {
        const actions = [];
        // If space has posts, suggest reading them
        if (this.props.postCount > 0) {
            actions.push({
                action: 'read_recent_posts',
                description: 'Catch up on recent discussions'
            });
        }
        // Always suggest introducing yourself
        actions.push({
            action: 'introduce_yourself',
            description: 'Post an introduction to let others know you\'re here'
        });
        // Suggest sharing resources for study groups
        if (this.props.category.value === 'study-group') {
            actions.push({
                action: 'share_resources',
                description: 'Share helpful study materials or notes'
            });
        }
        // Suggest inviting friends
        actions.push({
            action: 'invite_friends',
            description: 'Invite classmates who might be interested'
        });
        return actions;
    }
    // Temporary setters for repository layer - should be removed once proper construction is implemented
    setIsVerified(isVerified) {
        this.props.isVerified = isVerified;
    }
    setPostCount(count) {
        this.props.postCount = count;
    }
    setMemberCount(count) {
        // Note: This is for setting cached count from database
        // The actual count should be calculated from members.length
        this.props.memberCount = count;
    }
    setTrendingScore(score) {
        this.props.trendingScore = score;
    }
    setLastActivityAt(date) {
        this.props.lastActivityAt = date;
    }
    setCreatedAt(date) {
        this.props.createdAt = date;
    }
    setUpdatedAt(date) {
        this.props.updatedAt = date;
    }
    setTabs(tabs) {
        this.props.tabs = tabs;
    }
    setWidgets(widgets) {
        this.props.widgets = widgets;
    }
    toData() {
        return {
            id: this.id,
            spaceId: this.props.spaceId,
            name: this.props.name,
            description: this.props.description,
            category: this.props.category,
            campusId: this.props.campusId,
            createdBy: this.props.createdBy,
            members: this.props.members,
            tabs: this.props.tabs,
            widgets: this.props.widgets,
            settings: this.props.settings,
            visibility: this.props.visibility,
            isActive: this.props.isActive,
            memberCount: this.memberCount,
            postCount: this.props.postCount,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            lastActivityAt: this.props.lastActivityAt
        };
    }
}
exports.Space = Space;
//# sourceMappingURL=space.aggregate.js.map