"use strict";
/**
 * UNIFIED HIVE PROFILE SYSTEM
 *
 * Consolidates HiveProfile (simple, production-ready) and ProfileSystem (complex, UI-focused)
 * into a single, extensible type system that eliminates architectural fragmentation.
 *
 * DESIGN PRINCIPLES:
 * 1. Backward compatible with existing HiveProfile
 * 2. Optional modules for ProfileSystem features
 * 3. Single source of truth for all profile data
 * 4. Mobile-first and real-time ready
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUnifiedProfile = toUnifiedProfile;
exports.fromProfileSystem = fromProfileSystem;
exports.toHiveProfile = toHiveProfile;
exports.toProfileSystem = toProfileSystem;
exports.hasAdvancedFeatures = hasAdvancedFeatures;
exports.createMinimalProfile = createMinimalProfile;
exports.isUnifiedProfile = isUnifiedProfile;
exports.isHiveProfile = isHiveProfile;
exports.isProfileSystem = isProfileSystem;
// ============================================
// TYPE TRANSFORMERS
// ============================================
/**
 * Transform HiveProfile to UnifiedHiveProfile
 * Adds optional modules with sensible defaults
 */
function toUnifiedProfile(profile, modules) {
    const completeness = calculateCompleteness(profile);
    return {
        ...profile,
        campusId: 'ub-buffalo', // vBETA default
        completeness,
        ...modules
    };
}
/**
 * Transform ProfileSystem to UnifiedHiveProfile
 * Maps complex ProfileSystem to unified format
 */
function fromProfileSystem(profileSystem) {
    // Convert ProfileSystem identity to HiveProfile format
    const hiveProfile = {
        identity: {
            id: profileSystem.userId,
            fullName: profileSystem.identity.academic.name || '',
            handle: profileSystem.handle,
            email: '', // Would need to be provided separately
            avatarUrl: profileSystem.identity.photoCarousel?.photos?.[0]?.url
        },
        academic: {
            major: profileSystem.identity.academic.majors?.[0],
            academicYear: profileSystem.identity.academic.year,
            graduationYear: profileSystem.identity.academic.graduationYear,
            schoolId: profileSystem.campusId,
            pronouns: profileSystem.identity.academic.pronouns
        },
        personal: {
            bio: '', // Would need mapping
            interests: []
        },
        privacy: {
            isPublic: profileSystem.privacy.visibilityLevel !== 'ghost',
            showActivity: true,
            showSpaces: true,
            showConnections: true,
            allowDirectMessages: true,
            showOnlineStatus: true,
            ghostMode: {
                enabled: profileSystem.privacy.ghostMode,
                level: 'minimal'
            }
        },
        builder: {
            isBuilder: false,
            builderOptIn: false,
            builderLevel: 'beginner',
            specializations: [],
            toolsCreated: 0
        },
        stats: {
            spacesJoined: 0,
            spacesActive: 0,
            spacesLed: 0,
            toolsUsed: 0,
            connectionsCount: profileSystem.connections.friends.length + profileSystem.connections.connections.length,
            totalActivity: 0,
            currentStreak: 0,
            longestStreak: 0,
            reputation: 0,
            achievements: 0
        },
        timestamps: {
            createdAt: profileSystem.createdAt?.toString() || new Date().toISOString(),
            updatedAt: profileSystem.updatedAt?.toString() || new Date().toISOString(),
            lastActiveAt: profileSystem.presence.lastActive?.toString() || new Date().toISOString(),
            lastSeenAt: profileSystem.presence.lastActive?.toString() || new Date().toISOString()
        },
        verification: {
            emailVerified: false,
            profileVerified: false,
            accountStatus: 'active',
            userType: 'student',
            onboardingCompleted: profileSystem.isSetupComplete
        },
        social: {
            discoveryPreferences: {
                showInDiscovery: true,
                discoveryRadius: 'campus',
                lookingFor: []
            },
            connections: {
                connectionIds: profileSystem.connections.connections.map(c => c.userId),
                friendIds: profileSystem.connections.friends.map(f => f.userId),
                mutualConnections: undefined,
                lastConnectionUpdate: undefined
            },
            socialProof: {
                mutualSpaces: [],
                mutualFriends: [],
                recentActivity: undefined,
                helpfulnessRating: undefined
            }
        }
    };
    return toUnifiedProfile(hiveProfile, {
        connections: profileSystem.connections,
        presence: {
            ...profileSystem.presence,
            isOnline: profileSystem.presence.isOnline
        },
        intelligence: profileSystem.intelligence,
        grid: profileSystem.grid
    });
}
/**
 * Extract HiveProfile from UnifiedHiveProfile
 * For API compatibility with existing endpoints
 */
function toHiveProfile(profile) {
    const { connections, presence, intelligence, grid, enhancedPrivacy, campusId, completeness, ...hiveProfile } = profile;
    return hiveProfile;
}
/**
 * Extract ProfileSystem from UnifiedHiveProfile
 * For component compatibility with Bento Grid
 */
function toProfileSystem(profile) {
    return {
        userId: profile.identity.id,
        campusId: profile.campusId || 'ub-buffalo',
        handle: profile.identity.handle,
        identity: {
            academic: {
                name: profile.identity.fullName,
                year: profile.academic.academicYear || 'freshman',
                majors: profile.academic.major ? [profile.academic.major] : [],
                minors: [],
                pronouns: profile.academic.pronouns,
                graduationYear: profile.academic.graduationYear || new Date().getFullYear() + 4
            },
            photoCarousel: {
                photos: profile.identity.avatarUrl ? [{
                        id: 'avatar',
                        url: profile.identity.avatarUrl,
                        order: 0,
                        tags: ['avatar'],
                        uploadedAt: new Date(),
                        context: 'academic'
                    }] : [],
                currentIndex: 0,
                rotationInterval: 30000,
                lastUpdated: new Date(),
                freshnessThreshold: 6 * 7 * 24 * 60 * 60 * 1000 // 6 weeks
            },
            badges: []
        },
        connections: profile.connections || {
            friends: [],
            connections: [],
            pendingRequests: [],
            blockedUsers: []
        },
        presence: profile.presence || {
            vibe: '🎯 Focused',
            vibeUpdatedAt: new Date(),
            lastActive: new Date(),
            isOnline: false
        },
        grid: profile.grid || {
            cards: [
                { id: 'spaces-hub', type: 'spaces_hub', size: '2x1', position: { x: 0, y: 0 }, visible: true },
                { id: 'friends-network', type: 'friends_network', size: '1x1', position: { x: 2, y: 0 }, visible: true },
                { id: 'active-now', type: 'active_now', size: '1x1', position: { x: 3, y: 0 }, visible: true },
                { id: 'vibe-check', type: 'vibe_check', size: '1x1', position: { x: 0, y: 1 }, visible: true }
            ],
            mobileLayout: [
                { id: 'spaces-hub', type: 'spaces_hub', size: '2x1', position: { x: 0, y: 0 }, visible: true },
                { id: 'friends-network', type: 'friends_network', size: '1x1', position: { x: 0, y: 1 }, visible: true }
            ],
            lastModified: new Date()
        },
        privacy: profile.enhancedPrivacy || {
            ghostMode: profile.privacy.ghostMode.enabled,
            visibilityLevel: profile.privacy.isPublic ? 'campus' : 'ghost',
            scheduleSharing: {
                friends: true,
                connections: false
            },
            availabilityBroadcast: {
                friends: true,
                connections: false,
                campus: profile.privacy.isPublic
            },
            discoveryParticipation: profile.privacy.isPublic,
            spaceActivityVisibility: new Map()
        },
        intelligence: profile.intelligence || {
            schedule: [],
            overlaps: [],
            suggestions: [],
            lastCalculated: new Date()
        },
        createdAt: new Date(profile.timestamps.createdAt),
        updatedAt: new Date(profile.timestamps.updatedAt),
        completeness: profile.completeness?.percentage || 0,
        isSetupComplete: profile.verification.onboardingCompleted
    };
}
// ============================================
// UTILITY FUNCTIONS
// ============================================
function calculateCompleteness(profile) {
    const fields = [
        profile.identity.fullName,
        profile.identity.avatarUrl,
        profile.academic.major,
        profile.academic.academicYear,
        profile.personal.bio,
        profile.academic.housing,
        profile.academic.pronouns
    ];
    const completed = fields.filter(field => field && field.length > 0).length;
    const total = fields.length;
    const percentage = Math.round((completed / total) * 100);
    const missingFields = [];
    if (!profile.identity.fullName)
        missingFields.push('Full Name');
    if (!profile.identity.avatarUrl)
        missingFields.push('Profile Photo');
    if (!profile.academic.major)
        missingFields.push('Major');
    if (!profile.academic.academicYear)
        missingFields.push('Academic Year');
    if (!profile.personal.bio)
        missingFields.push('Bio');
    if (!profile.academic.housing)
        missingFields.push('Housing');
    if (!profile.academic.pronouns)
        missingFields.push('Pronouns');
    return {
        percentage,
        completed,
        total,
        missingFields
    };
}
/**
 * Check if profile has advanced features enabled
 */
function hasAdvancedFeatures(profile) {
    return !!(profile.connections || profile.presence || profile.intelligence || profile.grid);
}
/**
 * Create minimal unified profile for new users
 */
function createMinimalProfile(id, fullName, handle, email) {
    const hiveProfile = {
        identity: { id, fullName, handle, email },
        academic: {},
        personal: { interests: [] },
        privacy: {
            isPublic: true,
            showActivity: true,
            showSpaces: true,
            showConnections: true,
            allowDirectMessages: true,
            showOnlineStatus: true,
            ghostMode: { enabled: false, level: 'minimal' }
        },
        builder: {
            isBuilder: false,
            builderOptIn: false,
            builderLevel: 'beginner',
            specializations: [],
            toolsCreated: 0
        },
        stats: {
            spacesJoined: 0,
            spacesActive: 0,
            spacesLed: 0,
            toolsUsed: 0,
            connectionsCount: 0,
            totalActivity: 0,
            currentStreak: 0,
            longestStreak: 0,
            reputation: 0,
            achievements: 0
        },
        timestamps: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
            lastSeenAt: new Date().toISOString()
        },
        verification: {
            emailVerified: false,
            profileVerified: false,
            accountStatus: 'active',
            userType: 'student',
            onboardingCompleted: false
        },
        social: {
            discoveryPreferences: {
                showInDiscovery: true,
                discoveryRadius: 'campus',
                lookingFor: []
            },
            connections: {
                connectionIds: [],
                friendIds: [],
                mutualConnections: undefined,
                lastConnectionUpdate: undefined
            },
            socialProof: {
                mutualSpaces: [],
                mutualFriends: [],
                recentActivity: undefined,
                helpfulnessRating: undefined
            }
        }
    };
    return toUnifiedProfile(hiveProfile);
}
// ============================================
// TYPE GUARDS
// ============================================
function isUnifiedProfile(profile) {
    return (profile &&
        typeof profile === 'object' &&
        profile.identity &&
        typeof profile.identity.id === 'string' &&
        typeof profile.identity.handle === 'string');
}
function isHiveProfile(profile) {
    return isUnifiedProfile(profile) && !hasAdvancedFeatures(profile);
}
function isProfileSystem(profile) {
    return (profile &&
        typeof profile.userId === 'string' &&
        profile.connections &&
        profile.presence &&
        profile.grid);
}
//# sourceMappingURL=unified-profile.js.map