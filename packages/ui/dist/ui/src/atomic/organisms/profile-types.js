/**
 * Profile UI Types - Spec Compliant
 * Based on spec.md User Profile Schema (lines 2231-2249)
 */
/**
 * Convert spec Profile to UIProfile
 * Adapter for component consumption
 */
export function profileToUIProfile(profile, viewerContext) {
    const handle = profile.identity.email.split('@')[0];
    // Generate badges based on status and type
    const badges = [];
    if (profile.academic.facultyVerified) {
        badges.push({ label: 'Faculty', variant: 'default' });
    }
    if (profile.status.isSpaceLeader) {
        badges.push({ label: 'Space Leader', variant: 'default' });
    }
    if (profile.status.isModerator) {
        badges.push({ label: 'Moderator', variant: 'secondary' });
    }
    // Check if recently active (within last 30 minutes)
    const isRecentlyActive = profile.activity.lastActive &&
        (Date.now() - profile.activity.lastActive.getTime()) < 30 * 60 * 1000;
    if (isRecentlyActive && viewerContext?.isOwnProfile) {
        badges.push({ label: 'Active Now', variant: 'secondary' });
    }
    return {
        id: profile.identity.id,
        fullName: profile.identity.fullName,
        email: profile.identity.email,
        handle,
        avatarUrl: profile.identity.avatarUrl,
        photos: profile.identity.photos,
        bio: profile.identity.bio,
        pronouns: profile.identity.pronouns,
        major: profile.academic.major,
        graduationYear: profile.academic.graduationYear,
        academicYear: profile.academic.academicYear,
        userType: profile.academic.userType,
        facultyVerified: profile.academic.facultyVerified,
        courses: profile.academic.courses,
        connectionCount: profile.social.connectionCount,
        friendCount: profile.social.friendCount,
        spaceCount: profile.activity.joinedSpaces.length,
        postCount: 0, // Would need to be calculated
        mutualConnections: viewerContext?.mutualConnections,
        mutualSpaces: viewerContext?.mutualSpaces,
        verified: profile.status.isVerified,
        isOwnProfile: viewerContext?.isOwnProfile ?? false,
        isConnected: viewerContext?.isConnected ?? false,
        isSpaceLeader: profile.status.isSpaceLeader,
        profileVisibility: profile.privacy.profileVisibility,
        widgetPrivacy: profile.privacy.widgets,
        badges,
        completionScore: profile.activity.profileCompletionScore,
        lastActive: profile.activity.lastActive,
    };
}
/**
 * Check if widget should be visible based on privacy settings
 */
export function canViewWidget(widget, viewerContext) {
    if (viewerContext.isOwnProfile)
        return true;
    switch (widget.level) {
        case 'visible':
            return true;
        case 'private':
            return viewerContext.isConnected;
        case 'ghost':
            return false;
        default:
            return false;
    }
}
/**
 * Get privacy indicator for UI display
 */
export function getPrivacyIndicator(level) {
    switch (level) {
        case 'visible':
            return {
                icon: '🌍',
                label: 'Campus Visible',
                description: 'Everyone on campus can see this'
            };
        case 'private':
            return {
                icon: '🔒',
                label: 'Connections Only',
                description: 'Only your connections can see this'
            };
        case 'ghost':
            return {
                icon: '👻',
                label: 'Private',
                description: 'Hidden from everyone (you appear inactive)'
            };
    }
}
//# sourceMappingURL=profile-types.js.map