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
export { Ritual } from '../../domain/rituals/aggregates/ritual.aggregate';
// export { Space } from '../../domain/spaces/aggregates/space.aggregate'; // Commented out - using local stub class below
export { Profile } from '../../domain/profile/aggregates/profile.aggregate';
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
// NOTE: Ritual is now exported from domain/rituals/aggregates/ritual.aggregate
// Legacy wrapper removed - use proper domain model instead
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
        this.type = SpaceType.GENERAL; // Add type property
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
                space.type = data.type || SpaceType.GENERAL;
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
            type: this.type,
            posts: this.posts,
            settings: this.settings,
            members: this.members
        };
    }
}
// Tool-related schemas and validators
export const ToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
export const CreateToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
export const UpdateToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
export const ShareToolSchema = {
    parse: (data) => data,
    safeParse: (data) => ({ success: true, data })
};
// Tool utility functions
export function canUserEditTool(tool, userId) {
    return tool.creatorId === userId ||
        (tool.permissions?.canEdit || []).includes(userId);
}
export function canUserViewTool(tool, userId) {
    return tool.settings?.isPublic ||
        tool.creatorId === userId ||
        (tool.permissions?.canView || []).includes(userId);
}
export function getNextVersion(currentVersion) {
    const parts = currentVersion.split('.');
    const patch = parseInt(parts[2] || '0', 10);
    return `${parts[0]}.${parts[1]}.${patch + 1}`;
}
export function determineChangeType(changes) {
    // Simple heuristic for now
    if (changes.elements?.length > 0)
        return 'minor';
    if (changes.settings)
        return 'patch';
    return 'patch';
}
export function validateToolStructure(tool) {
    return !!(tool.name && tool.elements && Array.isArray(tool.elements));
}
export function validateElementConfig(element) {
    return !!(element.type && element.config);
}
export function generateShareToken(toolId, userId) {
    return Buffer.from(`${toolId}:${userId}:${Date.now()}`).toString('base64');
}
export function createToolDefaults() {
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