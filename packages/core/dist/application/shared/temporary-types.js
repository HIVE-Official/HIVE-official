"use strict";
/**
 * Temporary type exports for backward compatibility
 * These re-export from proper domain models
 * This file will be deleted once all references are updated
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareToolSchema = exports.UpdateToolSchema = exports.CreateToolSchema = exports.ToolSchema = exports.SpaceType = exports.Participation = exports.FeedFilter = exports.FeedItem = exports.Connection = exports.Profile = exports.Space = exports.Ritual = exports.EnhancedFeed = exports.ConnectionId = exports.CampusId = exports.RitualId = exports.SpaceName = exports.SpaceId = exports.ProfileId = void 0;
exports.getProfileCompleteness = getProfileCompleteness;
exports.getDefaultActionCodeSettings = getDefaultActionCodeSettings;
exports.validateEmailDomain = validateEmailDomain;
exports.canUserEditTool = canUserEditTool;
exports.canUserViewTool = canUserViewTool;
exports.getNextVersion = getNextVersion;
exports.determineChangeType = determineChangeType;
exports.validateToolStructure = validateToolStructure;
exports.validateElementConfig = validateElementConfig;
exports.generateShareToken = generateShareToken;
exports.createToolDefaults = createToolDefaults;
// Re-export from proper domain models
var profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
Object.defineProperty(exports, "ProfileId", { enumerable: true, get: function () { return profile_id_value_1.ProfileId; } });
var space_id_value_1 = require("../../domain/spaces/value-objects/space-id.value");
Object.defineProperty(exports, "SpaceId", { enumerable: true, get: function () { return space_id_value_1.SpaceId; } });
var space_name_value_1 = require("../../domain/spaces/value-objects/space-name.value");
Object.defineProperty(exports, "SpaceName", { enumerable: true, get: function () { return space_name_value_1.SpaceName; } });
var ritual_id_value_1 = require("../../domain/rituals/value-objects/ritual-id.value");
Object.defineProperty(exports, "RitualId", { enumerable: true, get: function () { return ritual_id_value_1.RitualId; } });
var campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
Object.defineProperty(exports, "CampusId", { enumerable: true, get: function () { return campus_id_value_1.CampusId; } });
var connection_id_value_1 = require("../../domain/profile/value-objects/connection-id.value");
Object.defineProperty(exports, "ConnectionId", { enumerable: true, get: function () { return connection_id_value_1.ConnectionId; } });
// Re-export aggregates
var enhanced_feed_1 = require("../../domain/feed/enhanced-feed");
Object.defineProperty(exports, "EnhancedFeed", { enumerable: true, get: function () { return enhanced_feed_1.EnhancedFeed; } });
var ritual_aggregate_1 = require("../../domain/rituals/aggregates/ritual.aggregate");
Object.defineProperty(exports, "Ritual", { enumerable: true, get: function () { return ritual_aggregate_1.Ritual; } });
var space_aggregate_1 = require("../../domain/spaces/aggregates/space.aggregate");
Object.defineProperty(exports, "Space", { enumerable: true, get: function () { return space_aggregate_1.Space; } });
var profile_aggregate_1 = require("../../domain/profile/aggregates/profile.aggregate");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return profile_aggregate_1.Profile; } });
var connection_1 = require("../../domain/profile/aggregates/connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
// Re-export entities and types
var feed_item_1 = require("../../domain/feed/feed-item");
Object.defineProperty(exports, "FeedItem", { enumerable: true, get: function () { return feed_item_1.FeedItem; } });
// Profile utility functions
function getProfileCompleteness(profile) {
    if (!profile)
        return 0;
    const requiredFields = ['displayName', 'email', 'handle'];
    const optionalFields = ['bio', 'photoURL', 'major', 'year', 'interests'];
    let completed = 0;
    const totalFields = requiredFields.length + optionalFields.length;
    requiredFields.forEach(field => {
        if (profile[field])
            completed++;
    });
    optionalFields.forEach(field => {
        if (profile[field])
            completed++;
    });
    return Math.round((completed / totalFields) * 100);
}
// Authentication utilities
function getDefaultActionCodeSettings(continueUrl) {
    return {
        url: continueUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://hive-official.vercel.app',
        handleCodeInApp: true,
        dynamicLinkDomain: undefined
    };
}
function validateEmailDomain(email, allowedDomains = ['buffalo.edu']) {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}
// These classes provide backward compatibility wrappers
class FeedFilter {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    static create(type) {
        return {
            isSuccess: true,
            isFailure: false,
            getValue: () => new FeedFilter(type, null),
            error: null
        };
    }
}
exports.FeedFilter = FeedFilter;
// NOTE: Ritual is now exported from domain/rituals/aggregates/ritual.aggregate
// Legacy wrapper removed - use proper domain model instead
class Participation {
    constructor(id, profileId, ritualId, completedMilestones = [], progress = 0) {
        this.id = id;
        this.profileId = profileId;
        this.ritualId = ritualId;
        this.completedMilestones = completedMilestones;
        this.progress = progress;
        this.streak = 0;
        this.achievements = [];
        this.totalPoints = 0;
    }
    static create(data) {
        return {
            isSuccess: true,
            isFailure: false,
            getValue: () => {
                const participation = new Participation(data.id, data.profileId, data.ritualId, data.completedMilestones || [], data.progress || 0);
                participation.streak = data.streak || 0;
                participation.achievements = data.achievements || [];
                participation.totalPoints = data.totalPoints || 0;
                return participation;
            },
            error: null
        };
    }
    toData() {
        return {
            id: this.id,
            profileId: this.profileId,
            ritualId: this.ritualId,
            completedMilestones: this.completedMilestones,
            progress: this.progress,
            streak: this.streak,
            achievements: this.achievements,
            totalPoints: this.totalPoints
        };
    }
    updateMilestoneProgress(milestoneId, progress) {
        this.progress = progress;
        return { isSuccess: true, isFailure: false };
    }
    completeMilestone(milestoneId) {
        if (!this.completedMilestones.includes(milestoneId)) {
            this.completedMilestones.push(milestoneId);
        }
        return { isSuccess: true, isFailure: false };
    }
}
exports.Participation = Participation;
// SpaceType enum for categorization
var SpaceType;
(function (SpaceType) {
    SpaceType["GENERAL"] = "general";
    SpaceType["ACADEMIC"] = "academic";
    SpaceType["SOCIAL"] = "social";
    SpaceType["PROFESSIONAL"] = "professional";
    SpaceType["MARKETPLACE"] = "marketplace";
    SpaceType["EVENT"] = "event";
})(SpaceType || (exports.SpaceType = SpaceType = {}));
class Space {
    constructor(id, name, description, category, campusId, createdBy) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.campusId = campusId;
        this.createdBy = createdBy;
        this.visibility = 'public';
        this.memberCount = 0;
        this.lastActivityAt = new Date();
        this.createdAt = new Date();
        this.spaceType = 'general';
        this.posts = [];
        this.settings = {};
        this.members = [];
        this.memberSet = new Set();
    }
    static create(data) {
        return {
            isSuccess: true,
            isFailure: false,
            getValue: () => {
                const space = new Space(data.id, data.name, data.description, data.category || data.spaceType, data.campusId, data.createdBy);
                space.visibility = data.visibility || 'public';
                space.memberCount = data.memberCount || 0;
                space.lastActivityAt = data.lastActivityAt || new Date();
                space.createdAt = data.createdAt || new Date();
                space.spaceType = data.spaceType || 'general';
                space.posts = data.posts || [];
                space.settings = data.settings || {};
                space.members = data.members || [];
                return space;
            },
            error: null
        };
    }
    addMember(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
        this.memberSet.add(id);
        if (!this.members.find(m => {
            const memberId = typeof m.profileId === 'string' ? m.profileId : m.profileId.id || m.profileId.value;
            return memberId === id;
        })) {
            this.members.push({
                profileId: typeof profileId === 'string' ? profileId : profileId,
                role: 'member'
            });
        }
        this.memberCount = this.memberSet.size;
        return { isSuccess: true, isFailure: false };
    }
    removeMember(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
        this.memberSet.delete(id);
        this.members = this.members.filter(m => {
            const memberId = typeof m.profileId === 'string' ? m.profileId : m.profileId.id || m.profileId.value;
            return memberId !== id;
        });
        this.memberCount = this.memberSet.size;
        return { isSuccess: true, isFailure: false };
    }
    isMember(profileId) {
        const id = typeof profileId === 'string' ? profileId : profileId.id || profileId.value;
        return this.memberSet.has(id);
    }
    getAdminCount() {
        return this.members.filter(m => m.role === 'admin').length;
    }
    getMemberCount() {
        return this.memberCount;
    }
    toData() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            campusId: this.campusId,
            visibility: this.visibility,
            memberCount: this.memberCount,
            lastActivityAt: this.lastActivityAt,
            createdAt: this.createdAt,
            spaceType: this.spaceType,
            posts: this.posts,
            settings: this.settings,
            members: this.members
        };
    }
}
exports.Space = Space;
// Tool-related schemas and validators
exports.ToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
exports.CreateToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
exports.UpdateToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
exports.ShareToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
// Tool utility functions
function canUserEditTool(tool, userId) {
    return tool.creatorId === userId ||
        (tool.permissions?.canEdit || []).includes(userId);
}
function canUserViewTool(tool, userId) {
    return tool.settings?.isPublic ||
        tool.creatorId === userId ||
        (tool.permissions?.canView || []).includes(userId);
}
function getNextVersion(currentVersion) {
    const parts = currentVersion.split('.');
    const patch = parseInt(parts[2] || '0', 10);
    return `${parts[0]}.${parts[1]}.${patch + 1}`;
}
function determineChangeType(changes) {
    // Simple heuristic for now
    if (changes.elements?.length > 0)
        return 'minor';
    if (changes.settings)
        return 'patch';
    return 'patch';
}
function validateToolStructure(tool) {
    return !!(tool.name && tool.elements && Array.isArray(tool.elements));
}
function validateElementConfig(element) {
    return !!(element.type && element.config);
}
function generateShareToken(toolId, userId) {
    return Buffer.from(`${toolId}:${userId}:${Date.now()}`).toString('base64');
}
function createToolDefaults() {
    return {
        version: '1.0.0',
        elements: [],
        settings: {
            isPublic: false,
            allowComments: true,
            allowSharing: true,
            requireAuth: false
        },
        permissions: {
            canEdit: [],
            canView: [],
            canShare: [],
            canDelete: []
        }
    };
}
//# sourceMappingURL=temporary-types.js.map