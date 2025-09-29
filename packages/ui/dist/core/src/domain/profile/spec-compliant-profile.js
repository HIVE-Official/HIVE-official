/**
 * SPEC-COMPLIANT HIVE PROFILE SYSTEM
 *
 * This is the authoritative profile schema that matches SPEC.md requirements exactly.
 * Key principles:
 * - NO HANDLE DISPLAY: Handles are backend only, never shown to users
 * - CAMPUS ISOLATION: All profiles must have campusId: 'ub-buffalo' for vBETA
 * - PRIVACY WIDGETS: Three-tier system (Visible/Private/Ghost) per widget
 * - TWO-LAYER SOCIAL: Connections (automatic) → Friends (manual requests)
 * - 70% COMPLETION: Behavioral psychology for profile setup
 */
/**
 * Calculate connection strength based on SPEC formula
 * Strength = (Interactions × 0.4) + (SharedSpaces × 0.3) + (MutualConnections × 0.3)
 */
export function calculateConnectionStrength(factors) {
    const { interactions, sharedSpaces, mutualConnections } = factors;
    // Normalize each factor to 0-100 scale
    const normalizedInteractions = Math.min(interactions / 50, 1) * 100; // 50+ interactions = max
    const normalizedSharedSpaces = Math.min(sharedSpaces / 10, 1) * 100; // 10+ spaces = max
    const normalizedMutualConnections = Math.min(mutualConnections / 20, 1) * 100; // 20+ mutual = max
    // Apply SPEC formula weights
    const strength = (normalizedInteractions * 0.4) +
        (normalizedSharedSpaces * 0.3) +
        (normalizedMutualConnections * 0.3);
    return Math.round(Math.min(strength, 100));
}
/** Profile completion stages designed for 70% completion rate */
export const PROFILE_COMPLETION_STAGES = [
    {
        id: 'basic',
        name: 'Basic Setup',
        requiredFields: ['fullName', 'major'], // Easy start - 90% complete
        reward: { type: 'feature_unlock', value: 'join_spaces' },
        weight: 20
    },
    {
        id: 'identity',
        name: 'Express Yourself',
        requiredFields: ['bio', 'avatar'], // Moderate - 80% complete
        reward: { type: 'social_proof', value: 'profile_views_unlock' },
        weight: 30
    },
    {
        id: 'academic',
        name: 'Academic Profile',
        requiredFields: ['graduationYear', 'interests'], // Harder - 70% complete (TARGET)
        reward: { type: 'badge', value: 'verified_student' },
        weight: 30
    },
    {
        id: 'social',
        name: 'Social Discovery',
        requiredFields: ['connections_5', 'spaces_3'], // Advanced - 60% complete
        reward: { type: 'feature_unlock', value: 'hiveLab_access' },
        weight: 20
    }
];
/**
 * Calculate profile completion percentage with behavioral psychology
 * Designed to achieve 70% completion rate for habit formation
 */
export function calculateProfileCompletion(profile) {
    let totalWeight = 0;
    const completedStages = [];
    const rewards = [];
    for (const stage of PROFILE_COMPLETION_STAGES) {
        let stageComplete = true;
        for (const field of stage.requiredFields) {
            // Check special conditions
            if (field === 'connections_5') {
                stageComplete = profile.social.connections.connectionIds.length >= 5;
            }
            else if (field === 'spaces_3') {
                stageComplete = profile.activity.joinedSpaces.length >= 3;
            }
            else {
                // Check regular fields
                const value = getNestedValue(profile, field);
                stageComplete = stageComplete && !!value;
            }
            if (!stageComplete)
                break;
        }
        if (stageComplete) {
            totalWeight += stage.weight;
            completedStages.push(stage.id);
            rewards.push(stage.reward);
        }
    }
    const nextStage = PROFILE_COMPLETION_STAGES.find(s => !completedStages.includes(s.id)) || null;
    return {
        percentage: totalWeight,
        completedStages,
        nextStage,
        rewards
    };
}
// Helper function to get nested object values
function getNestedValue(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
        value = value?.[key];
        if (value === undefined)
            return null;
    }
    return value;
}
// ============================================================================
// PRIVACY HELPERS (SPEC: Privacy System)
// ============================================================================
/**
 * Check if a user can view a profile widget based on privacy settings
 */
export function canViewWidget(widget, viewerProfile, targetProfile) {
    // Own profile always viewable
    if (viewerProfile?.identity.id === targetProfile.identity.id) {
        return true;
    }
    switch (widget.privacy) {
        case 'visible':
            // Campus can see
            return viewerProfile?.academic.campusId === targetProfile.academic.campusId;
        case 'private':
            // Connections only
            if (!viewerProfile)
                return false;
            return targetProfile.social.connections.connectionIds.includes(viewerProfile.identity.id);
        case 'ghost':
            // Appear offline/inactive - hide from everyone
            return false;
        default:
            return false;
    }
}
/**
 * Sanitize profile data based on viewer permissions
 */
export function sanitizeProfileForViewer(profile, viewerProfile) {
    const sanitized = {
        identity: {
            ...profile.identity,
            email: '', // Never expose email publicly
            username: '' // SPEC: Never expose username
        },
        academic: profile.academic,
        interests: profile.interests,
        verification: profile.verification
    };
    // Initialize widgets object
    const widgets = {};
    // Check widget visibility
    if (profile.widgets.myActivity && canViewWidget(profile.widgets.myActivity, viewerProfile, profile)) {
        widgets.myActivity = profile.widgets.myActivity;
    }
    if (profile.widgets.mySpaces && canViewWidget(profile.widgets.mySpaces, viewerProfile, profile)) {
        widgets.mySpaces = profile.widgets.mySpaces;
    }
    if (profile.widgets.myConnections && canViewWidget(profile.widgets.myConnections, viewerProfile, profile)) {
        widgets.myConnections = profile.widgets.myConnections;
    }
    // Faculty-only widget
    if (profile.academic.facultyVerified && profile.widgets.myClasses) {
        widgets.myClasses = profile.widgets.myClasses;
    }
    // HiveLab is always visible but shows teaser if no access
    widgets.hiveLab = profile.widgets.hiveLab;
    // Only add widgets if there are any
    if (Object.keys(widgets).length > 0) {
        sanitized.widgets = widgets;
    }
    return sanitized;
}
// ============================================================================
// VALIDATION HELPERS
// ============================================================================
/**
 * Validate profile data against SPEC requirements
 */
export function validateProfile(profile) {
    const errors = [];
    // Check required fields
    if (!profile.identity?.fullName || profile.identity.fullName.length < 2 || profile.identity.fullName.length > 50) {
        errors.push('Full name must be 2-50 characters');
    }
    if (!profile.academic?.major) {
        errors.push('Major is required');
    }
    if (profile.academic?.campusId !== 'ub-buffalo') {
        errors.push('Campus ID must be ub-buffalo for vBETA');
    }
    if (profile.identity?.bio && profile.identity.bio.length > 500) {
        errors.push('Bio must be less than 500 characters');
    }
    // Validate privacy levels
    const validPrivacyLevels = ['visible', 'private', 'ghost'];
    if (profile.privacy?.widgets) {
        for (const [widget, level] of Object.entries(profile.privacy.widgets)) {
            if (!validPrivacyLevels.includes(level)) {
                errors.push(`Invalid privacy level for ${widget}`);
            }
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
// ============================================================================
// TYPE GUARDS
// ============================================================================
export function isSpecCompliantProfile(obj) {
    return (obj &&
        typeof obj === 'object' &&
        obj.identity &&
        obj.academic &&
        obj.academic.campusId === 'ub-buffalo' &&
        obj.privacy &&
        obj.social &&
        obj.widgets);
}
// ============================================================================
// DEFAULT VALUES
// ============================================================================
export const DEFAULT_SPEC_PRIVACY = {
    profileVisibility: 'campus',
    searchable: true,
    widgets: {
        myActivity: 'visible',
        mySpaces: 'visible',
        myConnections: 'visible'
    },
    showActivity: true,
    showJoinedSpaces: true,
    analyticsTracking: true
};
// Create empty profile helper
export function createEmptyProfile(userId, email) {
    return {
        identity: {
            id: userId,
            username: email.split('@')[0], // backend only
            email: email,
            fullName: '',
            bio: '',
            avatar: ''
        },
        academic: {
            campusId: 'ub-buffalo',
            userType: 'student',
            facultyVerified: false,
            major: '',
            graduationYear: new Date().getFullYear() + 4
        },
        interests: {
            selectedInterests: []
        },
        privacy: DEFAULT_SPEC_PRIVACY,
        social: {
            followerCount: 0,
            followingCount: 0,
            connectionStrength: 0,
            connections: {
                connectionIds: [],
                mutualConnectionsCount: 0
            },
            friends: {
                friendIds: [],
                pendingRequestsSent: [],
                pendingRequestsReceived: []
            }
        },
        activity: {
            profileCompletionScore: 0,
            joinedSpaces: [],
            lastActive: new Date().toISOString(),
            onlineStatus: {
                isOnline: false,
                lastSeen: new Date().toISOString()
            }
        },
        verification: {
            isActive: true,
            isVerified: false,
            isModerator: false,
            facultyVerified: false,
            isStudentLeader: false,
            timestamps: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        },
        widgets: {
            myActivity: {
                recentPosts: [],
                recentComments: [],
                recentReactions: [],
                privacy: 'visible'
            },
            mySpaces: {
                spaces: [],
                privacy: 'visible'
            },
            myConnections: {
                connectionsCount: 0,
                friendsCount: 0,
                recentConnections: [],
                privacy: 'visible'
            },
            hiveLab: {
                hasAccess: false,
                toolsCreated: 0,
                teaserMessage: 'Unlock HiveLab by becoming a space leader'
            }
        },
        blocking: {
            blockedUsers: [],
            reportedBy: [],
            autoBlocked: false
        }
    };
}
export const DEFAULT_SPEC_PROFILE = {
    academic: {
        campusId: 'ub-buffalo',
        userType: 'student',
        facultyVerified: false,
        major: '',
        graduationYear: new Date().getFullYear() + 4
    },
    privacy: DEFAULT_SPEC_PRIVACY,
    social: {
        followerCount: 0,
        followingCount: 0,
        connectionStrength: 0,
        connections: {
            connectionIds: [],
            mutualConnectionsCount: 0
        },
        friends: {
            friendIds: [],
            pendingRequestsSent: [],
            pendingRequestsReceived: []
        }
    },
    blocking: {
        blockedUsers: [],
        reportedBy: [],
        autoBlocked: false
    }
};
//# sourceMappingURL=spec-compliant-profile.js.map