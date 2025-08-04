'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileHeader } from './profile-header.js';
import { MySpacesFeed } from './my-spaces-feed.js';
import { CalendarCard } from './calendar-card.js';
import { adaptSmartCalendarProps } from './calendar-data-adapter.js';
import { CampusConnections } from './campus-connections.js';
import { HiveLabSection } from './hive-lab-section.js';
import { ProfileStats } from './profile-stats.js';
import { HiveCard } from '../hive-card.js';
import { HiveButton } from '../hive-button.js';
import { Loader2, WifiOff } from 'lucide-react';
export const ProfileSystem = ({ user, spaces = [], events = [], connections = [], hiveLab, isLoading = false, isMobile = false, isTablet = false, showOnboarding = false, showPrivacyBanner = false, showGraduationBanner = false, showErrors = false, completionStatus, errors, loadingStates, onSpaceClick, onEventClick, onConnectionClick, onEditProfile, onPrivacySettings, onJoinSpace, onCreateTool }) => {
    // Loading state
    if (isLoading || !user) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary p-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "flex items-center justify-center py-16", children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-[var(--hive-brand-secondary)] mx-auto mb-4" }), _jsx("p", { className: "text-hive-text-secondary", children: "Loading your HIVE profile..." })] }) }) }) }));
    }
    // Error state
    if (showErrors && errors?.apiError) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary p-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "flex items-center justify-center py-16", children: _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx(WifiOff, { className: "h-12 w-12 text-hive-ruby mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-hive-text-primary mb-2", children: "Connection Error" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: errors.apiError }), _jsx(HiveButton, { onClick: () => window.location.reload(), children: "Try Again" })] }) }) }) }));
    }
    // Mobile layout
    if (isMobile) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary", children: _jsx("div", { className: "safe-area-inset", children: _jsxs("div", { className: "space-y-4 p-4", children: [_jsx(ProfileHeader, { user: user, showOnboarding: showOnboarding, showPrivacyBanner: showPrivacyBanner, showGraduationBanner: showGraduationBanner, completionStatus: completionStatus, onEditProfile: onEditProfile, onPrivacySettings: onPrivacySettings }), _jsx(MySpacesFeed, { spaces: spaces, isLoading: loadingStates?.spaces, error: errors?.spacesError, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace }), _jsx(CalendarCard, { ...adaptSmartCalendarProps(events, loadingStates?.events, errors?.eventsError, onEventClick, undefined, 'mobile') }), _jsx(CampusConnections, { connections: connections, isLoading: loadingStates?.connections, error: errors?.connectionsError, onConnectionClick: onConnectionClick }), hiveLab && (_jsx(HiveLabSection, { hiveLab: hiveLab, isLoading: loadingStates?.hiveLab, onCreateTool: onCreateTool })), _jsx(ProfileStats, { stats: user.stats, isLoading: loadingStates?.profile })] }) }) }));
    }
    // Tablet layout
    if (isTablet) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary p-6", children: _jsx("div", { className: "max-w-5xl mx-auto", children: _jsxs("div", { className: "space-y-6", children: [_jsx(ProfileHeader, { user: user, showOnboarding: showOnboarding, showPrivacyBanner: showPrivacyBanner, showGraduationBanner: showGraduationBanner, completionStatus: completionStatus, onEditProfile: onEditProfile, onPrivacySettings: onPrivacySettings }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(MySpacesFeed, { spaces: spaces, isLoading: loadingStates?.spaces, error: errors?.spacesError, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace }), _jsx(CampusConnections, { connections: connections, isLoading: loadingStates?.connections, error: errors?.connectionsError, onConnectionClick: onConnectionClick })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(CalendarCard, { ...adaptSmartCalendarProps(events, loadingStates?.events, errors?.eventsError, onEventClick, undefined, 'desktop') }), hiveLab && (_jsx(HiveLabSection, { hiveLab: hiveLab, isLoading: loadingStates?.hiveLab, onCreateTool: onCreateTool }))] })] }), _jsx(ProfileStats, { stats: user.stats, isLoading: loadingStates?.profile })] }) }) }));
    }
    // Desktop layout (default)
    return (_jsx("div", { className: "min-h-screen bg-hive-background-primary p-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsxs("div", { className: "space-y-8", children: [_jsx(ProfileHeader, { user: user, showOnboarding: showOnboarding, showPrivacyBanner: showPrivacyBanner, showGraduationBanner: showGraduationBanner, completionStatus: completionStatus, onEditProfile: onEditProfile, onPrivacySettings: onPrivacySettings }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-4", children: [_jsxs("div", { className: "xl:col-span-2 space-y-8", children: [_jsx(MySpacesFeed, { spaces: spaces, isLoading: loadingStates?.spaces, error: errors?.spacesError, onSpaceClick: onSpaceClick, onJoinSpace: onJoinSpace }), _jsx(CampusConnections, { connections: connections, isLoading: loadingStates?.connections, error: errors?.connectionsError, onConnectionClick: onConnectionClick })] }), _jsxs("div", { className: "space-y-8", children: [_jsx(CalendarCard, { ...adaptSmartCalendarProps(events, loadingStates?.events, errors?.eventsError, onEventClick, undefined, 'desktop') }), hiveLab && (_jsx(HiveLabSection, { hiveLab: hiveLab, isLoading: loadingStates?.hiveLab, onCreateTool: onCreateTool })), _jsx(ProfileStats, { stats: user.stats, isLoading: loadingStates?.profile })] })] })] }) }) }));
};
export default ProfileSystem;
//# sourceMappingURL=profile-system-simple.js.map