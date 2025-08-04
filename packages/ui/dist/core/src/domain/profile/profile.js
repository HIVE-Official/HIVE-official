/**
 * HIVE Profile Domain Model
 * Unified data structure for all profile-related functionality
 * Following atomic design principles and HIVE brand system
 */
// Default Values
export const DEFAULT_PRIVACY_SETTINGS = {
    isPublic: true,
    showActivity: true,
    showSpaces: true,
    showConnections: true,
    allowDirectMessages: true,
    showOnlineStatus: true,
    ghostMode: {
        enabled: false,
        level: 'minimal'
    }
};
export const DEFAULT_BUILDER_INFO = {
    isBuilder: false,
    builderOptIn: false,
    builderLevel: 'beginner',
    specializations: [],
    toolsCreated: 0
};
// Validation Functions
export function isValidHandle(handle) {
    // Handle must be 3-20 characters, alphanumeric + underscore
    return /^[a-zA-Z0-9_]{3,20}$/.test(handle);
}
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function getProfileCompleteness(profile) {
    const fields = [
        profile.identity.fullName,
        profile.identity.avatarUrl,
        profile.academic.major,
        profile.academic.academicYear,
        profile.personal.bio,
        profile.academic.housing,
        profile.academic.pronouns
    ];
    const completedFields = fields.filter(field => field && field.length > 0).length;
    return Math.round((completedFields / fields.length) * 100);
}
// Profile Helper Functions
export function getDisplayName(profile) {
    return profile.identity.fullName || profile.identity.handle || 'Anonymous';
}
export function getProfileUrl(profile) {
    return `/profile/${profile.identity.handle}`;
}
export function isProfilePublic(profile) {
    return profile.privacy.isPublic && !profile.privacy.ghostMode.enabled;
}
export function canViewProfile(viewerProfile, targetProfile) {
    // Public profiles are always viewable
    if (isProfilePublic(targetProfile))
        return true;
    // Own profile is always viewable
    if (viewerProfile?.identity.id === targetProfile.identity.id)
        return true;
    // Private profiles require connection (would check connections here)
    return false;
}
//# sourceMappingURL=profile.js.map