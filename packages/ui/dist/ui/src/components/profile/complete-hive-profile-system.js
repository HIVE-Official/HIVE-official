'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { User, Settings, Edit3, Zap, Eye, EyeOff, Upload, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { ProfileHeader } from './profile-header';
import { ProfileStats } from './profile-stats';
import { MySpacesFeed } from './my-spaces-feed';
import { CalendarCard } from './calendar-card';
import { CampusConnections } from './campus-connections';
import { HiveLabSection } from './hive-lab-section';
export const CompleteHIVEProfileSystem = ({ user, stats, editMode = false, onEditModeToggle, onWidgetConfigure, completeness, onUploadAvatar, onToggleGhostMode, loading = false, error = null }) => {
    const [activeWidget, setActiveWidget] = useState(null);
    // Loading state with skeleton
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "flex items-center justify-center py-16", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, className: "text-center", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-[#FFD700] mx-auto mb-4" }), _jsx("p", { className: "text-gray-300", children: "Loading your HIVE profile..." })] }) }) }) }));
    }
    // Error state
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "flex items-center justify-center py-16", children: _jsxs(HiveCard, { className: "p-6 text-center max-w-md", children: [_jsx(AlertCircle, { className: "h-12 w-12 text-red-400 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-white mb-2", children: "Profile Error" }), _jsx("p", { className: "text-gray-400 mb-4", children: error }), _jsx(HiveButton, { onClick: () => window.location.reload(), children: "Try Again" })] }) }) }) }));
    }
    // Handle missing user data
    if (!user) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "flex items-center justify-center py-16", children: _jsxs(HiveCard, { className: "p-6 text-center", children: [_jsx(User, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold text-white mb-2", children: "Profile Not Found" }), _jsx("p", { className: "text-gray-400", children: "Unable to load profile data" })] }) }) }) }));
    }
    const mockSpaces = [
        {
            id: '1',
            name: 'CS 350 - Data Structures',
            type: 'course',
            memberCount: 124,
            unreadCount: 3,
            lastActivity: '2h ago',
            recentPosts: []
        },
        {
            id: '2',
            name: 'Governors Hall Floor 3',
            type: 'housing',
            memberCount: 32,
            unreadCount: 7,
            lastActivity: '15m ago',
            recentPosts: []
        }
    ];
    const mockEvents = [
        {
            id: '1',
            title: 'CS 350 Lecture',
            time: '10:00 AM',
            type: 'class',
            location: 'Davis Hall 101',
            attendees: []
        },
        {
            id: '2',
            title: 'Study Group',
            time: '2:00 PM',
            type: 'academic',
            location: 'Library',
            attendees: []
        }
    ];
    const mockConnections = [
        {
            id: '1',
            type: 'dorm_classmate',
            message: '3 floor mates also in CS 350',
            people: ['Sarah K.', 'Mike R.', 'Alex P.'],
            action: 'Start study group'
        }
    ];
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900", children: _jsxs("div", { className: "max-w-7xl mx-auto p-4 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: _jsx(ProfileHeader, { user: user, showOnboarding: false, showPrivacyBanner: false, showGraduationBanner: false, completionStatus: completeness, onEditProfile: onEditModeToggle, onPrivacySettings: () => console.log('Privacy settings') }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, children: _jsxs(HiveCard, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Quick Actions" }), _jsxs("div", { className: "flex items-center gap-2", children: [user?.privacy?.ghostMode && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded", children: [_jsx(EyeOff, { className: "w-3 h-3" }), "Ghost Mode"] })), _jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: onEditModeToggle, className: "text-gray-400 hover:text-white", children: [_jsx(Edit3, { className: "w-4 h-4 mr-1" }), editMode ? 'Done' : 'Edit'] })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [_jsxs("button", { onClick: () => onWidgetConfigure?.('avatar'), className: "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "w-4 h-4 text-[#FFD700]" }), _jsx("span", { className: "text-sm text-white", children: "Avatar" })] }), _jsxs("button", { onClick: onToggleGhostMode, className: "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors", children: [user?.privacy?.ghostMode ? (_jsx(Eye, { className: "w-4 h-4 text-green-400" })) : (_jsx(EyeOff, { className: "w-4 h-4 text-gray-400" })), _jsx("span", { className: "text-sm text-white", children: "Privacy" })] }), _jsxs("button", { onClick: () => onWidgetConfigure?.('settings'), className: "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors", children: [_jsx(Settings, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { className: "text-sm text-white", children: "Settings" })] }), _jsxs("button", { onClick: () => onWidgetConfigure?.('stats'), className: "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors", children: [_jsx(Zap, { className: "w-4 h-4 text-purple-400" }), _jsx("span", { className: "text-sm text-white", children: "Stats" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, children: _jsx(ProfileStats, { stats: stats || user?.stats }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 }, children: _jsx(MySpacesFeed, { spaces: mockSpaces, onSpaceClick: (spaceId) => console.log('Space clicked:', spaceId), onJoinSpace: () => console.log('Join space') }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 }, children: _jsx(HiveLabSection, { hiveLab: {
                                            isLocked: false,
                                            availableTools: [],
                                            createdTools: [],
                                            comingSoon: []
                                        }, onCreateTool: () => console.log('Create tool') }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 }, children: _jsx(CalendarCard, { data: {
                                            nextEvent: mockEvents[0],
                                            upcomingEvents: mockEvents,
                                            todaysEvents: mockEvents,
                                            connections: [],
                                            conflicts: [],
                                            lastUpdated: new Date()
                                        }, state: "default", onEventClick: (event) => console.log('Event clicked:', event.id) }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.3 }, children: _jsx(CampusConnections, { connections: mockConnections, onConnectionClick: (connectionId) => console.log('Connection clicked:', connectionId) }) })] })] }), completeness && completeness.percentage < 100 && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.5 }, children: _jsx(HiveCard, { className: "p-4 border-l-4 border-[#FFD700]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white mb-1", children: "Complete Your Profile" }), _jsxs("p", { className: "text-sm text-gray-400", children: [completeness.percentage, "% complete \u2022 ", completeness.missing?.length || 0, " items remaining"] })] }), _jsxs(HiveButton, { size: "sm", onClick: () => onWidgetConfigure?.('completeness'), className: "bg-[#FFD700] text-black hover:bg-[#FFE255]", children: ["Complete ", _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] })] }) }) }))] }) }));
};
//# sourceMappingURL=complete-hive-profile-system.js.map