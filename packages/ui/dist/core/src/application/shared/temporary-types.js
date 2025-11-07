/**
 * Temporary type exports for backward compatibility
 * These re-export from proper domain models
 * This file will be deleted once all references are updated
 */
// Re-export from proper domain models
export { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
export { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
export { SpaceName } from '../../domain/spaces/value-objects/space-name.value';
export { RitualId } from '../../domain/rituals/value-objects/ritual-id.value';
export { CampusId } from '../../domain/profile/value-objects/campus-id.value';
export { ConnectionId } from '../../domain/profile/value-objects/connection-id.value';
// Re-export aggregates
export { EnhancedFeed } from '../../domain/feed/enhanced-feed';
export { EnhancedRitual } from '../../domain/rituals/aggregates/enhanced-ritual';
export { EnhancedSpace } from '../../domain/spaces/aggregates/enhanced-space';
export { EnhancedProfile } from '../../domain/profile/aggregates/enhanced-profile';
export { Connection } from '../../domain/profile/aggregates/connection';
// Re-export entities and types
export { FeedItem } from '../../domain/feed/feed-item';
// Profile utility functions
export function getProfileCompleteness(profile) {
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
export function getDefaultActionCodeSettings(continueUrl) {
    return {
        url: continueUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://hive-official.vercel.app',
        handleCodeInApp: true,
        dynamicLinkDomain: undefined
    };
}
export function validateEmailDomain(email, allowedDomains = ['buffalo.edu']) {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}
// These classes provide backward compatibility wrappers
export class FeedFilter {
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
export class Ritual {
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
export class Participation {
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
// SpaceType enum for categorization
export var SpaceType;
(function (SpaceType) {
    SpaceType["GENERAL"] = "general";
    SpaceType["ACADEMIC"] = "academic";
    SpaceType["SOCIAL"] = "social";
    SpaceType["PROFESSIONAL"] = "professional";
    SpaceType["MARKETPLACE"] = "marketplace";
    SpaceType["EVENT"] = "event";
})(SpaceType || (SpaceType = {}));
export class Space {
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
export { ElementType, ElementInstanceSchema, validateElementConfig, } from '../../domain/creation/elements';
export { ToolSchema, CreateToolSchema, UpdateToolSchema, ShareToolSchema, ToolStatus, ToolConfigSchema, ToolMetadataSchema, ToolVersionSchema, createToolDefaults, generateShareToken, canUserEditTool, canUserViewTool, getNextVersion, determineChangeType, validateToolStructure, } from '../../domain/creation/tool';
export { PlacedToolSchema, PlacementTargetType, PlacementPermissionsSchema, PlacementSettingsSchema, getPlacementCollectionPath, getPlacementDocPath, encodePlacementCompositeId, decodePlacementCompositeId, tryDecodePlacementCompositeId, PLACED_TOOL_COLLECTION_NAME, } from '../../domain/creation/placement';
//# sourceMappingURL=temporary-types.js.map