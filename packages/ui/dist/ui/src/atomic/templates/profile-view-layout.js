'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileIdentityWidget } from '../organisms/profile-identity-widget';
import { MyActivityWidget } from '../organisms/profile-activity-widget';
import { MySpacesWidget } from '../organisms/profile-spaces-widget';
import { MyConnectionsWidget } from '../organisms/profile-connections-widget';
import { ProfileCompletionCard } from '../organisms/profile-completion-card';
import { HiveLabWidget } from '../organisms/hivelab-widget';
/**
 * Profile View Layout - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system with responsive columns
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * - Luxury minimalism with careful spacing
 */
export const ProfileViewLayout = ({ profile, isOwnProfile = false, activities = [], spaces = [], connections = [], isSpaceLeader = false, hasHiveLabAccess = false, toolsCreated = 0, leadingSpaces = [], onEditPhoto, onPrivacyChange, onStepClick, onRequestHiveLabAccess, onOpenHiveLab, className = '' }) => {
    const completionPercentage = profile.metadata?.completionPercentage || 0;
    // Determine which steps are completed for the completion card
    const completedSteps = [];
    if (profile.identity.avatarUrl)
        completedSteps.push('avatar');
    if (profile.personal?.bio)
        completedSteps.push('bio');
    if (profile.academic?.major && profile.academic?.academicYear)
        completedSteps.push('academic');
    if (profile.academic?.housing)
        completedSteps.push('housing');
    if (profile.personal?.interests?.length > 0)
        completedSteps.push('interests');
    if (spaces.length >= 3)
        completedSteps.push('spaces');
    // Check widget privacy settings
    const shouldShowWidget = (widgetKey) => {
        const widgetPrivacy = profile.widgets?.[widgetKey];
        if (!widgetPrivacy)
            return true;
        // If viewing own profile, always show
        if (isOwnProfile)
            return true;
        // Otherwise respect privacy level
        const level = widgetPrivacy.level || 'public';
        if (level === 'private')
            return false;
        // For 'connections' level, we'd need to check if viewer is connected
        // For now, we'll show it (this would need viewer context)
        return true;
    };
    return (_jsx("div", { className: `
        min-h-screen
        bg-black
        ${className}
      `, children: _jsxs("div", { className: "max-w-7xl mx-auto p-4 sm:p-6 lg:p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: isOwnProfile ? 'My Profile' : `${profile.identity.fullName}'s Profile` }), _jsx("p", { className: "text-gray-400", children: isOwnProfile
                                ? 'Manage your profile and privacy settings'
                                : `${profile.academic?.academicYear || 'Student'} at University at Buffalo` })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(ProfileIdentityWidget, { profile: profile, isOwnProfile: isOwnProfile, onEditPhoto: onEditPhoto }), isOwnProfile && completionPercentage < 100 && (_jsx(ProfileCompletionCard, { completionPercentage: completionPercentage, completedSteps: completedSteps, onStepClick: onStepClick }))] }), _jsxs("div", { className: "space-y-6", children: [shouldShowWidget('myActivity') && (_jsx(MyActivityWidget, { activities: activities, isOwnProfile: isOwnProfile, privacyLevel: (profile.widgets?.myActivity?.level || 'public'), onPrivacyChange: (level) => onPrivacyChange?.('myActivity', level) })), shouldShowWidget('mySpaces') && (_jsx(MySpacesWidget, { spaces: spaces, isOwnProfile: isOwnProfile, privacyLevel: (profile.widgets?.mySpaces?.level || 'public'), onPrivacyChange: (level) => onPrivacyChange?.('mySpaces', level) }))] }), _jsxs("div", { className: "space-y-6", children: [shouldShowWidget('myConnections') && (_jsx(MyConnectionsWidget, { connections: connections, isOwnProfile: isOwnProfile, privacyLevel: (profile.widgets?.myConnections?.level || 'public'), onPrivacyChange: (level) => onPrivacyChange?.('myConnections', level) })), _jsx(HiveLabWidget, { isSpaceLeader: isSpaceLeader, hasAccess: hasHiveLabAccess, toolsCreated: toolsCreated, toolsUsed: [], leadingSpaces: leadingSpaces, onRequestAccess: onRequestHiveLabAccess, onOpenStudio: onOpenHiveLab })] })] }), _jsx("div", { className: "h-20 lg:h-0" })] }) }));
};
//# sourceMappingURL=profile-view-layout.js.map