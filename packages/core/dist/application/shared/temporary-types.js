"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACED_TOOL_COLLECTION_NAME = exports.tryDecodePlacementCompositeId = exports.decodePlacementCompositeId = exports.encodePlacementCompositeId = exports.getPlacementDocPath = exports.getPlacementCollectionPath = exports.PlacementSettingsSchema = exports.PlacementPermissionsSchema = exports.PlacementTargetType = exports.PlacedToolSchema = exports.validateToolStructure = exports.determineChangeType = exports.getNextVersion = exports.canUserViewTool = exports.canUserEditTool = exports.generateShareToken = exports.createToolDefaults = exports.ToolVersionSchema = exports.ToolMetadataSchema = exports.ToolConfigSchema = exports.ToolStatus = exports.ShareToolSchema = exports.UpdateToolSchema = exports.CreateToolSchema = exports.ToolSchema = exports.validateElementConfig = exports.ElementInstanceSchema = exports.ElementType = exports.Space = exports.SpaceType = exports.Participation = exports.Ritual = exports.FeedFilter = exports.FeedItem = exports.Connection = exports.EnhancedProfile = exports.EnhancedSpace = exports.EnhancedRitual = exports.EnhancedFeed = exports.ConnectionId = exports.CampusId = exports.RitualId = exports.SpaceName = exports.SpaceId = exports.ProfileId = void 0;
exports.getProfileCompleteness = getProfileCompleteness;
exports.getDefaultActionCodeSettings = getDefaultActionCodeSettings;
exports.validateEmailDomain = validateEmailDomain;
/**
 * Temporary type exports for backward compatibility
 * These re-export from proper domain models
 * This file will be deleted once all references are updated
 */
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
var enhanced_ritual_1 = require("../../domain/rituals/aggregates/enhanced-ritual");
Object.defineProperty(exports, "EnhancedRitual", { enumerable: true, get: function () { return enhanced_ritual_1.EnhancedRitual; } });
var enhanced_space_1 = require("../../domain/spaces/aggregates/enhanced-space");
Object.defineProperty(exports, "EnhancedSpace", { enumerable: true, get: function () { return enhanced_space_1.EnhancedSpace; } });
var enhanced_profile_1 = require("../../domain/profile/aggregates/enhanced-profile");
Object.defineProperty(exports, "EnhancedProfile", { enumerable: true, get: function () { return enhanced_profile_1.EnhancedProfile; } });
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
class Ritual {
    constructor(id, name, description, milestones) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.milestones = milestones;
        this.participants = 0;
        this.isActive = true;
        this.settings = { isVisible: true };
    }
    static create(data) {
        return {
            isSuccess: true,
            isFailure: false,
            getValue: () => {
                const ritual = new Ritual(data.id, data.name, data.description, data.milestones || []);
                ritual.participants = data.participants || 0;
                ritual.isActive = data.isActive !== undefined ? data.isActive : true;
                ritual.settings = data.settings || { isVisible: true };
                ritual.startDate = data.startDate;
                ritual.endDate = data.endDate;
                return ritual;
            },
            error: null
        };
    }
    addParticipant(profileId) {
        this.participants++;
        return { isSuccess: true, isFailure: false };
    }
    updateMilestoneProgress(milestoneId, progress) {
        return { isSuccess: true, isFailure: false };
    }
    toData() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            milestones: this.milestones,
            participants: this.participants,
            isActive: this.isActive,
            settings: this.settings,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}
exports.Ritual = Ritual;
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
var elements_1 = require("../../domain/creation/elements");
Object.defineProperty(exports, "ElementType", { enumerable: true, get: function () { return elements_1.ElementType; } });
Object.defineProperty(exports, "ElementInstanceSchema", { enumerable: true, get: function () { return elements_1.ElementInstanceSchema; } });
Object.defineProperty(exports, "validateElementConfig", { enumerable: true, get: function () { return elements_1.validateElementConfig; } });
var tool_1 = require("../../domain/creation/tool");
Object.defineProperty(exports, "ToolSchema", { enumerable: true, get: function () { return tool_1.ToolSchema; } });
Object.defineProperty(exports, "CreateToolSchema", { enumerable: true, get: function () { return tool_1.CreateToolSchema; } });
Object.defineProperty(exports, "UpdateToolSchema", { enumerable: true, get: function () { return tool_1.UpdateToolSchema; } });
Object.defineProperty(exports, "ShareToolSchema", { enumerable: true, get: function () { return tool_1.ShareToolSchema; } });
Object.defineProperty(exports, "ToolStatus", { enumerable: true, get: function () { return tool_1.ToolStatus; } });
Object.defineProperty(exports, "ToolConfigSchema", { enumerable: true, get: function () { return tool_1.ToolConfigSchema; } });
Object.defineProperty(exports, "ToolMetadataSchema", { enumerable: true, get: function () { return tool_1.ToolMetadataSchema; } });
Object.defineProperty(exports, "ToolVersionSchema", { enumerable: true, get: function () { return tool_1.ToolVersionSchema; } });
Object.defineProperty(exports, "createToolDefaults", { enumerable: true, get: function () { return tool_1.createToolDefaults; } });
Object.defineProperty(exports, "generateShareToken", { enumerable: true, get: function () { return tool_1.generateShareToken; } });
Object.defineProperty(exports, "canUserEditTool", { enumerable: true, get: function () { return tool_1.canUserEditTool; } });
Object.defineProperty(exports, "canUserViewTool", { enumerable: true, get: function () { return tool_1.canUserViewTool; } });
Object.defineProperty(exports, "getNextVersion", { enumerable: true, get: function () { return tool_1.getNextVersion; } });
Object.defineProperty(exports, "determineChangeType", { enumerable: true, get: function () { return tool_1.determineChangeType; } });
Object.defineProperty(exports, "validateToolStructure", { enumerable: true, get: function () { return tool_1.validateToolStructure; } });
var placement_1 = require("../../domain/creation/placement");
Object.defineProperty(exports, "PlacedToolSchema", { enumerable: true, get: function () { return placement_1.PlacedToolSchema; } });
Object.defineProperty(exports, "PlacementTargetType", { enumerable: true, get: function () { return placement_1.PlacementTargetType; } });
Object.defineProperty(exports, "PlacementPermissionsSchema", { enumerable: true, get: function () { return placement_1.PlacementPermissionsSchema; } });
Object.defineProperty(exports, "PlacementSettingsSchema", { enumerable: true, get: function () { return placement_1.PlacementSettingsSchema; } });
Object.defineProperty(exports, "getPlacementCollectionPath", { enumerable: true, get: function () { return placement_1.getPlacementCollectionPath; } });
Object.defineProperty(exports, "getPlacementDocPath", { enumerable: true, get: function () { return placement_1.getPlacementDocPath; } });
Object.defineProperty(exports, "encodePlacementCompositeId", { enumerable: true, get: function () { return placement_1.encodePlacementCompositeId; } });
Object.defineProperty(exports, "decodePlacementCompositeId", { enumerable: true, get: function () { return placement_1.decodePlacementCompositeId; } });
Object.defineProperty(exports, "tryDecodePlacementCompositeId", { enumerable: true, get: function () { return placement_1.tryDecodePlacementCompositeId; } });
Object.defineProperty(exports, "PLACED_TOOL_COLLECTION_NAME", { enumerable: true, get: function () { return placement_1.PLACED_TOOL_COLLECTION_NAME; } });
//# sourceMappingURL=temporary-types.js.map