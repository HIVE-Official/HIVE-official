"use strict";
/**
 * HIVE Profile Domain Model
 * Unified data structure for all profile-related functionality
 * Following atomic design principles and HIVE brand system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BUILDER_INFO = exports.DEFAULT_PRIVACY_SETTINGS = void 0;
exports.isValidHandle = isValidHandle;
exports.isValidEmail = isValidEmail;
exports.getProfileCompleteness = getProfileCompleteness;
exports.getDisplayName = getDisplayName;
exports.getProfileUrl = getProfileUrl;
exports.isProfilePublic = isProfilePublic;
exports.canViewProfile = canViewProfile;
// Default Values
exports.DEFAULT_PRIVACY_SETTINGS = {
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
exports.DEFAULT_BUILDER_INFO = {
    isBuilder: false,
    builderOptIn: false,
    builderLevel: 'beginner',
    specializations: [],
    toolsCreated: 0
};
// Validation Functions
function isValidHandle(handle) {
    // Handle must be 3-20 characters, alphanumeric + underscore
    return /^[a-zA-Z0-9_]{3,20}$/.test(handle);
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function getProfileCompleteness(profile) {
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
function getDisplayName(profile) {
    return profile.identity.fullName || profile.identity.handle || 'Anonymous';
}
function getProfileUrl(profile) {
    return `/profile/${profile.identity.handle}`;
}
function isProfilePublic(profile) {
    return profile.privacy.isPublic && !profile.privacy.ghostMode.enabled;
}
function canViewProfile(viewerProfile, targetProfile) {
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