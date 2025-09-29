"use strict";
/**
 * CAMPUS ISOLATION FOR PROFILE SYSTEM
 *
 * SPEC Requirement: All profile operations MUST be isolated by campus.
 * For vBETA, campusId is hardcoded to 'ub-buffalo'.
 *
 * This module ensures complete campus isolation for:
 * - Profile queries
 * - Profile updates
 * - Connection/friend operations
 * - Profile discovery
 * - Space membership through profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusIsolatedQuery = exports.UB_CAMPUS_CONFIG = exports.CAMPUS_ID = void 0;
exports.validateCampusIsolation = validateCampusIsolation;
exports.validateCampusEmail = validateCampusEmail;
exports.enforceCampusId = enforceCampusId;
exports.buildProfileDiscoveryQuery = buildProfileDiscoveryQuery;
exports.canUsersConnect = canUsersConnect;
exports.getMutualConnections = getMutualConnections;
exports.getSharedSpaces = getSharedSpaces;
exports.validateFacultyEmail = validateFacultyEmail;
exports.getFacultyAcademicSpaces = getFacultyAcademicSpaces;
exports.canViewProfile = canViewProfile;
exports.migrateProfileToCampusIsolation = migrateProfileToCampusIsolation;
exports.getCampusProfileStats = getCampusProfileStats;
exports.campusIsolationMiddleware = campusIsolationMiddleware;
// ============================================================================
// CAMPUS CONFIGURATION
// ============================================================================
/** vBETA campus identifier - hardcoded per SPEC */
exports.CAMPUS_ID = 'ub-buffalo';
/** Campus configuration for UB */
exports.UB_CAMPUS_CONFIG = {
    id: exports.CAMPUS_ID,
    name: 'University at Buffalo',
    emailDomain: '@buffalo.edu',
    // Supported user types at UB
    userTypes: ['student', 'alumni', 'faculty', 'staff'],
    // Academic configuration
    academic: {
        majors: [
            'Computer Science',
            'Business Administration',
            'Engineering',
            'Biology',
            'Psychology',
            'Communications',
            'Mathematics',
            'Physics',
            'Chemistry',
            'Economics',
            'Political Science',
            'English',
            'History',
            'Art',
            'Music',
            'Philosophy',
            'Sociology',
            'Nursing',
            'Medicine',
            'Law'
        ],
        graduationYearRange: {
            min: 2020,
            max: 2030
        }
    },
    // Housing options at UB
    housing: [
        'Ellicott Complex',
        'Governors Complex',
        'South Campus',
        'Greiner Hall',
        'Clement Hall',
        'Wilkeson Quad',
        'Off-Campus North',
        'Off-Campus South',
        'Commuter'
    ]
};
// ============================================================================
// CAMPUS ISOLATION VALIDATORS
// ============================================================================
/**
 * Validate that a profile belongs to the current campus
 */
function validateCampusIsolation(profile) {
    return profile.academic?.campusId === exports.CAMPUS_ID;
}
/**
 * Validate email belongs to campus domain
 */
function validateCampusEmail(email) {
    return email.toLowerCase().endsWith(exports.UB_CAMPUS_CONFIG.emailDomain);
}
/**
 * Ensure profile has correct campus ID
 */
function enforceCampusId(profile) {
    return {
        ...profile,
        academic: {
            ...profile.academic,
            campusId: exports.CAMPUS_ID
        }
    };
}
// ============================================================================
// CAMPUS-ISOLATED QUERIES
// ============================================================================
/**
 * Campus-isolated profile query builder
 * Ensures all queries include campus isolation
 */
class CampusIsolatedQuery {
    constructor() {
        this.conditions = {};
        // Always include campus isolation
        this.conditions['academic.campusId'] = exports.CAMPUS_ID;
    }
    /**
     * Add additional query conditions
     */
    where(field, value) {
        this.conditions[field] = value;
        return this;
    }
    /**
     * Get the final query object with campus isolation
     */
    build() {
        return { ...this.conditions };
    }
    /**
     * Create a Firestore-compatible query
     */
    toFirestoreConstraints() {
        return Object.entries(this.conditions).map(([field, value]) => [field, '==', value]);
    }
}
exports.CampusIsolatedQuery = CampusIsolatedQuery;
/**
 * Build campus-isolated profile discovery query
 */
function buildProfileDiscoveryQuery(options = {}) {
    const query = new CampusIsolatedQuery();
    // Apply filters
    if (options.userType) {
        query.where('academic.userType', options.userType);
    }
    if (options.major) {
        query.where('academic.major', options.major);
    }
    if (options.graduationYear) {
        query.where('academic.graduationYear', options.graduationYear);
    }
    if (options.housing) {
        query.where('academic.housing', options.housing);
    }
    // Ensure profiles are searchable
    query.where('privacy.searchable', true);
    // Ensure profiles are active
    query.where('verification.isActive', true);
    return query;
}
// ============================================================================
// CONNECTION OPERATIONS WITH CAMPUS ISOLATION
// ============================================================================
/**
 * Validate that two users can connect (must be same campus)
 */
function canUsersConnect(user1, user2) {
    // Check campus match
    if (user1.academic.campusId !== user2.academic.campusId) {
        return {
            canConnect: false,
            reason: 'Users must be from the same campus to connect'
        };
    }
    // Check if either user is blocked
    if (user1.blocking.blockedUsers.includes(user2.identity.id) ||
        user2.blocking.blockedUsers.includes(user1.identity.id)) {
        return {
            canConnect: false,
            reason: 'Connection blocked by user preferences'
        };
    }
    // Check if users are already connected
    if (user1.social.connections.connectionIds.includes(user2.identity.id)) {
        return {
            canConnect: false,
            reason: 'Users are already connected'
        };
    }
    return { canConnect: true };
}
/**
 * Get mutual connections between two users (campus-isolated)
 */
function getMutualConnections(user1, user2) {
    // Ensure same campus
    if (user1.academic.campusId !== user2.academic.campusId) {
        return [];
    }
    // Find intersection of connection lists
    const user1Connections = new Set(user1.social.connections.connectionIds);
    return user2.social.connections.connectionIds.filter(id => user1Connections.has(id));
}
// ============================================================================
// SPACE OPERATIONS WITH CAMPUS ISOLATION
// ============================================================================
/**
 * Get spaces shared between two users (campus-isolated)
 */
function getSharedSpaces(user1, user2) {
    // Ensure same campus
    if (user1.academic.campusId !== user2.academic.campusId) {
        return [];
    }
    // Find intersection of joined spaces
    const user1Spaces = new Set(user1.activity.joinedSpaces);
    return user2.activity.joinedSpaces.filter(spaceId => user1Spaces.has(spaceId));
}
// ============================================================================
// FACULTY-SPECIFIC CAMPUS FEATURES
// ============================================================================
/**
 * Validate faculty email against campus directory
 */
function validateFacultyEmail(email) {
    // For vBETA, we check UB faculty email pattern
    // Real implementation would check against faculty directory
    return email.toLowerCase().endsWith(exports.UB_CAMPUS_CONFIG.emailDomain) &&
        !email.toLowerCase().includes('student');
}
/**
 * Get academic spaces for faculty member
 */
function getFacultyAcademicSpaces(facultyProfile) {
    if (!facultyProfile.academic.facultyVerified) {
        return [];
    }
    return facultyProfile.widgets.myClasses?.teachingSpaceIds || [];
}
// ============================================================================
// PRIVACY ENFORCEMENT WITH CAMPUS CONTEXT
// ============================================================================
/**
 * Check if viewer can see target profile based on campus and privacy
 */
function canViewProfile(viewerProfile, targetProfile) {
    // Own profile always viewable
    if (viewerProfile?.identity.id === targetProfile.identity.id) {
        return { canView: true };
    }
    // Check blocking
    if (viewerProfile && (targetProfile.blocking.blockedUsers.includes(viewerProfile.identity.id) ||
        viewerProfile.blocking.blockedUsers.includes(targetProfile.identity.id))) {
        return {
            canView: false,
            reason: 'Profile viewing blocked'
        };
    }
    // Check profile visibility settings
    switch (targetProfile.privacy.profileVisibility) {
        case 'public':
            // Anyone can view (but still campus-isolated in practice)
            return { canView: true };
        case 'campus':
            // Must be same campus
            if (!viewerProfile || viewerProfile.academic.campusId !== targetProfile.academic.campusId) {
                return {
                    canView: false,
                    reason: 'Profile is only visible to campus members'
                };
            }
            return { canView: true };
        case 'connections':
            // Must be connected
            if (!viewerProfile || !targetProfile.social.connections.connectionIds.includes(viewerProfile.identity.id)) {
                return {
                    canView: false,
                    reason: 'Profile is only visible to connections'
                };
            }
            return { canView: true };
        default:
            return {
                canView: false,
                reason: 'Invalid profile visibility setting'
            };
    }
}
// ============================================================================
// MIGRATION HELPERS
// ============================================================================
/**
 * Migrate existing profile to campus-isolated format
 */
function migrateProfileToCampusIsolation(profile) {
    return {
        ...profile,
        academic: {
            ...profile.academic,
            campusId: exports.CAMPUS_ID, // Force UB campus
            // Validate user type
            userType: exports.UB_CAMPUS_CONFIG.userTypes.includes(profile.academic?.userType)
                ? profile.academic.userType
                : 'student'
        }
    };
}
/**
 * Calculate campus profile statistics
 * Note: This would be implemented with actual database aggregation
 */
async function getCampusProfileStats() {
    // Placeholder for actual implementation
    return {
        totalProfiles: 0,
        studentCount: 0,
        facultyCount: 0,
        alumniCount: 0,
        staffCount: 0,
        averageCompletionRate: 0,
        activeLastWeek: 0,
        topMajors: [],
        topHousing: []
    };
}
// ============================================================================
// EXPORT CAMPUS ISOLATION MIDDLEWARE
// ============================================================================
/**
 * Middleware to ensure all profile operations are campus-isolated
 */
function campusIsolationMiddleware() {
    return {
        /**
         * Wrap a query with campus isolation
         */
        wrapQuery(query) {
            return {
                ...query,
                'academic.campusId': exports.CAMPUS_ID
            };
        },
        /**
         * Validate profile data has correct campus
         */
        validateProfile(profile) {
            return validateCampusIsolation(profile);
        },
        /**
         * Enforce campus ID on profile data
         */
        enforceProfile(profile) {
            return enforceCampusId(profile);
        }
    };
}
//# sourceMappingURL=campus-isolation.js.map