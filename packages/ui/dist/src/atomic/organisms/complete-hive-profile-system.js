'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { User, Settings, Camera, MapPin, GraduationCap, Calendar, Users, Zap, Activity, Edit3 } from 'lucide-react';
import { ProfileBentoGrid } from './profile-bento-grid';
export const CompleteHIVEProfileSystem = ({ user, stats, editMode = false, onEditModeToggle, onWidgetConfigure, completeness, onUploadAvatar, onToggleGhostMode, loading = false, error = null }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    // Mock profile data for demo purposes - simple structure for bento grid
    const mockProfileSystem = useMemo(() => ({
        userId: user?.id || 'demo-user',
        campusId: 'ub-buffalo',
        handle: user?.handle || 'demo-handle',
        identity: {
            academic: {},
            photoCarousel: { photos: [] },
            badges: []
        },
        connections: {
            friends: [
                { id: '1', name: 'Sarah Chen', avatar: '', lastSeen: new Date(), sharedSpaces: ['cs-370', 'study-hall'] },
                { id: '2', name: 'Mike Rodriguez', avatar: '', lastSeen: new Date(), sharedSpaces: ['math-club'] },
                { id: '3', name: 'Emma Thompson', avatar: '', lastSeen: new Date(), sharedSpaces: ['cs-370'] }
            ],
            connections: [
                { id: '4', name: 'Alex Kim', avatar: '', connectionDate: new Date(), sharedSpaces: ['ub-builders'] },
                { id: '5', name: 'Jordan Smith', avatar: '', connectionDate: new Date(), sharedSpaces: ['design-collective'] }
            ]
        },
        presence: {
            vibe: 'Focused on finals',
            beacon: { active: true, location: 'Lockwood Library' },
            lastActive: new Date()
        },
        intelligence: {
            overlaps: [
                { type: 'class', name: 'CSE 370', time: '10:00 AM', building: 'Davis Hall' },
                { type: 'study', name: 'Math Study Group', time: '2:00 PM', building: 'Knox Hall' }
            ],
            suggestions: [
                { type: 'space', name: 'UB Data Science Club', relevance: 0.9, reason: 'Matches your interests' },
                { type: 'event', name: 'Career Fair Prep', relevance: 0.8, reason: 'Popular with your major' }
            ]
        },
        personal: {},
        privacy: {},
        grid: {
            cards: [
                { id: 'spaces-hub', type: 'spaces_hub', size: '2x1', position: { x: 0, y: 0 }, visible: true },
                { id: 'friends-network', type: 'friends_network', size: '1x1', position: { x: 2, y: 0 }, visible: true },
                { id: 'schedule-overlap', type: 'schedule_overlap', size: '1x1', position: { x: 3, y: 0 }, visible: true },
                { id: 'active-now', type: 'active_now', size: '1x1', position: { x: 0, y: 1 }, visible: true },
                { id: 'vibe-check', type: 'vibe_check', size: '1x1', position: { x: 1, y: 1 }, visible: true },
                { id: 'discovery', type: 'discovery', size: '2x1', position: { x: 2, y: 1 }, visible: true }
            ],
            mobileLayout: [
                { id: 'spaces-hub', type: 'spaces_hub', size: '2x1', position: { x: 0, y: 0 }, visible: true },
                { id: 'friends-network', type: 'friends_network', size: '1x1', position: { x: 0, y: 1 }, visible: true },
                { id: 'active-now', type: 'active_now', size: '1x1', position: { x: 1, y: 1 }, visible: true },
                { id: 'vibe-check', type: 'vibe_check', size: '2x1', position: { x: 0, y: 2 }, visible: true }
            ],
            lastModified: new Date()
        }
    }), [user]);
    const handleAvatarUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file || !onUploadAvatar)
            return;
        setIsUploadingAvatar(true);
        try {
            await onUploadAvatar(file);
        }
        catch (error) {
            console.error('Failed to upload avatar:', error);
        }
        finally {
            setIsUploadingAvatar(false);
        }
    }, [onUploadAvatar]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-hive-accent mx-auto mb-4" }), _jsx("p", { className: "text-hive-text-secondary", children: "Loading profile dashboard..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary flex items-center justify-center", children: _jsx(Card, { className: "max-w-md", children: _jsxs("div", { className: "p-6 text-center", children: [_jsx("div", { className: "text-red-400 text-4xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Profile Error" }), _jsx("p", { className: "text-red-400 mb-4", children: error }), _jsx(Button, { onClick: () => window.location.reload(), children: "Try Again" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-hive-background-primary", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-hive-text-primary", children: "Profile Dashboard" }), _jsxs("p", { className: "text-hive-text-secondary text-sm", children: ["Welcome back, ", user?.name?.split(' ')[0] || 'Student'] })] }), _jsx("div", { className: "flex gap-2", children: onEditModeToggle && (_jsxs(Button, { variant: "outline", onClick: onEditModeToggle, className: "flex items-center gap-2", size: "sm", children: [_jsx(Settings, { size: 16 }), editMode ? 'Save' : 'Edit Profile'] })) })] }), _jsxs(Card, { className: "mb-6 overflow-hidden", children: [_jsx("div", { className: "bg-gradient-to-r from-hive-accent/10 to-blue-600/10 h-32 relative", children: _jsx("div", { className: "absolute inset-0 bg-black/5" }) }), _jsx("div", { className: "p-6 -mt-16 relative", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-end gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-24 h-24 border-4 border-hive-background-primary shadow-lg bg-hive-background-secondary rounded-full overflow-hidden", children: user?.avatar ? (_jsx("img", { src: user.avatar, alt: user?.name || 'User', className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx(User, { size: 40, className: "text-hive-text-secondary" }) })) }), onUploadAvatar && (_jsxs("label", { className: "absolute bottom-0 right-0 w-8 h-8 bg-hive-accent rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform", children: [_jsx(Camera, { size: 16, className: "text-hive-background-primary" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleAvatarUpload, className: "hidden" })] })), isUploadingAvatar && (_jsx("div", { className: "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-white" }) }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 mb-2", children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: user?.name || 'User Name' }), user?.isBuilder && (_jsxs(Badge, { variant: "secondary", className: "bg-hive-accent/10 text-hive-accent border-hive-accent/20 w-fit", children: [_jsx(Zap, { size: 12, className: "mr-1" }), "Builder"] }))] }), _jsxs("p", { className: "text-hive-text-secondary mb-2", children: ["@", user?.handle || 'handle'] }), user?.bio && (_jsx("p", { className: "text-hive-text-primary mb-3", children: user.bio })), _jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-hive-text-secondary", children: [user?.school && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(GraduationCap, { size: 14 }), _jsx("span", { children: user.school })] })), user?.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { size: 14 }), _jsx("span", { children: user.location })] })), user?.memberSince && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { size: 14 }), _jsxs("span", { children: ["Joined ", new Date(user.memberSince).getFullYear()] })] }))] })] }), user?.isOnline && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("div", { className: "w-3 h-3 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { className: "text-green-400", children: "Online" })] }))] }) })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-accent mb-1", children: stats?.spaces || mockProfileSystem.connections.connections.length }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Spaces" })] }) }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-accent mb-1", children: stats?.connections || mockProfileSystem.connections.friends.length }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Friends" })] }) }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-hive-accent mb-1", children: stats?.tools || 0 }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Tools" })] }) }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-hive-accent mb-1", children: [completeness?.percentage || 75, "%"] }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Complete" })] }) })] }), completeness && completeness.percentage < 100 && (_jsx(Card, { className: "mb-6 border-hive-accent/20", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "font-semibold text-hive-text-primary", children: ["Complete your profile (", completeness.completed, "/", completeness.total, ")"] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: onEditModeToggle, children: [_jsx(Edit3, { size: 14, className: "mr-1" }), "Update"] })] }), _jsx("div", { className: "w-full bg-hive-background-secondary rounded-full h-2 mb-2", children: _jsx("div", { className: "bg-gradient-to-r from-hive-accent to-blue-500 rounded-full h-2 transition-all duration-500", style: { width: `${completeness.percentage || 0}%` } }) }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Complete your profile to get better recommendations and connect with more students" })] }) })), _jsx("div", { className: "flex space-x-1 mb-6 bg-hive-background-secondary/50 p-1 rounded-lg", children: [
                        { id: 'overview', label: 'Overview', icon: User },
                        { id: 'activity', label: 'Activity', icon: Activity },
                        { id: 'spaces', label: 'Spaces', icon: Users },
                        { id: 'tools', label: 'Tools', icon: Zap }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id
                                ? 'bg-hive-background-primary text-hive-text-primary shadow-sm'
                                : 'text-hive-text-secondary hover:text-hive-text-primary'}
                `, children: [_jsx(Icon, { size: 16 }), _jsx("span", { className: "hidden sm:inline", children: tab.label })] }, tab.id));
                    }) }), activeTab === 'overview' && (_jsxs("div", { className: "space-y-6", children: [_jsx(ProfileBentoGrid, { profile: mockProfileSystem, editable: editMode, onLayoutChange: (layout) => console.log('Layout changed:', layout) }), _jsxs(Card, { children: [_jsx("div", { className: "p-4 border-b border-hive-border", children: _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Recent Activity" }) }), _jsx("div", { className: "p-4 space-y-3", children: [
                                        { action: 'Joined', target: 'CS 370 Study Group', time: '2 hours ago', icon: Users },
                                        { action: 'Created', target: 'GPA Calculator Tool', time: '1 day ago', icon: Zap },
                                        { action: 'Connected with', target: 'Sarah Chen', time: '2 days ago', icon: User }
                                    ].map((activity, index) => {
                                        const Icon = activity.icon;
                                        return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-hive-accent/10 rounded-full flex items-center justify-center", children: _jsx(Icon, { size: 14, className: "text-hive-accent" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "text-sm text-hive-text-primary", children: [activity.action, " ", _jsx("span", { className: "font-medium", children: activity.target })] }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: activity.time })] })] }, index));
                                    }) })] })] })), activeTab === 'activity' && (_jsx(Card, { children: _jsxs("div", { className: "p-6 text-center", children: [_jsx(Activity, { size: 48, className: "text-hive-text-secondary mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Activity Timeline" }), _jsx("p", { className: "text-hive-text-secondary", children: "Your activity timeline will appear here" })] }) })), activeTab === 'spaces' && (_jsx(Card, { children: _jsxs("div", { className: "p-6 text-center", children: [_jsx(Users, { size: 48, className: "text-hive-text-secondary mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Your Spaces" }), _jsx("p", { className: "text-hive-text-secondary", children: "Spaces you've joined will appear here" })] }) })), activeTab === 'tools' && (_jsx(Card, { children: _jsxs("div", { className: "p-6 text-center", children: [_jsx(Zap, { size: 48, className: "text-hive-text-secondary mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Your Tools" }), _jsx("p", { className: "text-hive-text-secondary", children: "Tools you've created will appear here" })] }) }))] }) }));
};
//# sourceMappingURL=complete-hive-profile-system.js.map