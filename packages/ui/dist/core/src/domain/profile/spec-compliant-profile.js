/**
 * Spec-Compliant Profile Type
 * Represents the standardized profile structure for HIVE
 */
// Helper functions for profile compliance
export function isProfileComplete(profile) {
    return !!(profile.handle &&
        profile.displayName &&
        profile.email &&
        profile.school &&
        profile.campusId);
}
export function getProfileCompletionPercentage(profile) {
    const requiredFields = ['handle', 'displayName', 'email', 'school', 'campusId'];
    const optionalFields = ['bio', 'photoURL', 'major', 'year', 'interests', 'skills'];
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
export function createDefaultProfile(email, campusId) {
    return {
        id: '',
        handle: email.split('@')[0],
        displayName: '',
        email,
        school: 'University at Buffalo',
        campusId,
        stats: {
            postsCount: 0,
            spacesJoined: 0,
            toolsCreated: 0,
            eventsAttended: 0
        },
        privacy: {
            profileVisibility: 'campus',
            showEmail: false,
            showSchedule: true,
            allowMessages: 'connections'
        },
        features: {
            betaAccess: true,
            toolBuilder: false,
            spaceCreator: false
        },
        createdAt: new Date(),
        isActive: true,
        isVerified: false
    };
}
//# sourceMappingURL=spec-compliant-profile.js.map