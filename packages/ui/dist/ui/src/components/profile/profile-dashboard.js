'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Card } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Switch } from '../ui/switch.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog.js';
// Import all card components
import { AvatarCard, mockUserProfile } from './cards/avatar-card.js';
import { CalendarCard, mockCalendarEvents } from './cards/calendar-card.js';
import { NotificationsCard, mockNotifications } from './cards/notifications-card.js';
import { SpacesCard, mockSpaces, mockRecommendedSpaces } from './cards/spaces-card.js';
import { GhostModeCard, mockGhostModeSettings } from './cards/ghost-mode-card.js';
import { HiveLabCard, mockTools, mockBuilderStats } from './cards/hive-lab-card.js';
// Import bento grid system
import { BentoGridLayout, useBentoGrid } from './bento-grid/bento-grid-layout.js';
import { Edit, Save, Settings, EyeOff, Grid, Smartphone, Monitor, Tablet, RotateCcw, Download, Upload, Crown, Bell, Info } from 'lucide-react';
// Default grid layout configuration
const defaultGridItems = [
    {
        id: 'avatar',
        cardType: 'avatar',
        position: { x: 0, y: 0 },
        size: { width: 2, height: 1 },
        isVisible: true,
        settings: {}
    },
    {
        id: 'calendar',
        cardType: 'calendar',
        position: { x: 2, y: 0 },
        size: { width: 2, height: 1 },
        isVisible: true,
        settings: {}
    },
    {
        id: 'notifications',
        cardType: 'notifications',
        position: { x: 0, y: 1 },
        size: { width: 2, height: 1 },
        isVisible: true,
        settings: {}
    },
    {
        id: 'spaces',
        cardType: 'spaces',
        position: { x: 2, y: 1 },
        size: { width: 1, height: 2 },
        isVisible: true,
        settings: {}
    },
    {
        id: 'ghost-mode',
        cardType: 'ghostMode',
        position: { x: 3, y: 1 },
        size: { width: 1, height: 1 },
        isVisible: true,
        settings: {}
    },
    {
        id: 'hive-lab',
        cardType: 'hiveLab',
        position: { x: 3, y: 2 },
        size: { width: 1, height: 1 },
        isVisible: true,
        settings: {}
    }
];
// Device Preview Component
function DevicePreview({ device, onDeviceChange }) {
    const devices = [
        { key: 'mobile', label: 'Mobile', icon: Smartphone },
        { key: 'tablet', label: 'Tablet', icon: Tablet },
        { key: 'desktop', label: 'Desktop', icon: Monitor }
    ];
    return (_jsx("div", { className: "flex gap-1", children: devices.map(({ key, label, icon: Icon }) => (_jsxs(Button, { size: "sm", variant: device === key ? "default" : "outline", className: "h-8 px-3", onClick: () => onDeviceChange(key), children: [_jsx(Icon, { className: "w-4 h-4 mr-2" }), label] }, key))) }));
}
// Card Visibility Settings
function CardVisibilitySettings({ items, onItemToggle }) {
    const cardLabels = {
        avatar: 'Avatar & Identity',
        calendar: 'Calendar & Events',
        notifications: 'Notifications',
        spaces: 'Spaces & Communities',
        ghostMode: 'Privacy Controls',
        hiveLab: 'Tool Builder'
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Card Visibility" }), _jsx("div", { className: "space-y-2", children: items.map((item) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: cardLabels[item.cardType] }), _jsx(Switch, { checked: item.isVisible, onCheckedChange: (checked) => onItemToggle(item.id, checked) })] }, item.id))) })] }));
}
// Profile Settings Dialog
function ProfileSettingsDialog({ isOpen, onOpenChange, items, onItemToggle, onResetLayout }) {
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Profile Settings" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx(CardVisibilitySettings, { items: items, onItemToggle: onItemToggle }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Layout" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "w-full justify-start", onClick: onResetLayout, children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "Reset to Default Layout"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "w-full justify-start", disabled: true, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Layout"] }), _jsxs(Button, { variant: "secondary", size: "sm", className: "w-full justify-start", disabled: true, children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Import Layout"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Privacy" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm", children: "Public Profile" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "Allow others to view your profile" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm", children: "Show Activity" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "Display recent activity to others" })] }), _jsx(Switch, { defaultChecked: true })] })] })] })] })] }) }));
}
// Main Profile Dashboard Component
export function ProfileDashboard({ userId, isOwnProfile, className }) {
    const [device, setDevice] = useState('desktop');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        user: mockUserProfile,
        events: mockCalendarEvents,
        notifications: mockNotifications,
        spaces: mockSpaces,
        recommendedSpaces: mockRecommendedSpaces,
        ghostModeSettings: mockGhostModeSettings,
        tools: mockTools,
        builderStats: mockBuilderStats,
        isBuilder: true
    });
    // Bento grid management
    const { items, isEditMode, updateItems, toggleEditMode, setIsEditMode } = useBentoGrid(defaultGridItems);
    // Handle profile updates
    const handleProfileUpdate = useCallback((updates) => {
        setProfileData(prev => ({
            ...prev,
            user: { ...prev.user, ...updates }
        }));
    }, []);
    const handlePhotoUpload = useCallback(async (file) => {
        // Mock photo upload - in real app, this would upload to Firebase Storage
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUrl = URL.createObjectURL(file);
                handleProfileUpdate({ profilePhotoURL: mockUrl });
                resolve(mockUrl);
            }, 1000);
        });
    }, [handleProfileUpdate]);
    // Handle ghost mode changes
    const handleGhostModeChange = useCallback((settings) => {
        setProfileData(prev => ({
            ...prev,
            ghostModeSettings: { ...prev.ghostModeSettings, ...settings }
        }));
    }, []);
    const handleToggleGhostMode = useCallback((enabled) => {
        handleGhostModeChange({ isEnabled: enabled });
    }, [handleGhostModeChange]);
    const handleGhostModePreset = useCallback((preset) => {
        const newPresets = { ...profileData.ghostModeSettings.presets };
        newPresets[preset] = !newPresets[preset];
        handleGhostModeChange({ presets: newPresets });
    }, [profileData.ghostModeSettings.presets, handleGhostModeChange]);
    // Handle card visibility
    const handleCardVisibilityToggle = useCallback((id, visible) => {
        const updatedItems = items.map(item => item.id === id ? { ...item, isVisible: visible } : item);
        updateItems(updatedItems);
    }, [items, updateItems]);
    // Handle layout reset
    const handleResetLayout = useCallback(() => {
        updateItems(defaultGridItems);
        setSettingsOpen(false);
    }, [updateItems]);
    // Get responsive columns based on device
    const maxColumns = useMemo(() => {
        switch (device) {
            case 'mobile': return 1;
            case 'tablet': return 2;
            case 'desktop': return 4;
            default: return 4;
        }
    }, [device]);
    // Render card content based on type
    const renderCardContent = useCallback((item) => {
        switch (item.cardType) {
            case 'avatar':
                return (_jsx(AvatarCard, { profile: profileData.user, isEditMode: isEditMode, onProfileUpdate: handleProfileUpdate, onPhotoUpload: handlePhotoUpload, onEditClick: () => console.log('Edit profile'), onSettingsClick: () => setSettingsOpen(true) }));
            case 'calendar':
                return (_jsx(CalendarCard, { events: profileData.events, isEditMode: isEditMode, onEventCreate: (event) => console.log('Create event:', event), onEventUpdate: (id, updates) => console.log('Update event:', id, updates), onRSVP: (eventId, status) => console.log('RSVP:', eventId, status), onSettingsClick: () => console.log('Calendar settings') }));
            case 'notifications':
                return (_jsx(NotificationsCard, { notifications: profileData.notifications, unreadCount: profileData.notifications.filter(n => !n.isRead).length, isEditMode: isEditMode, onNotificationRead: (id) => console.log('Mark read:', id), onNotificationArchive: (id) => console.log('Archive:', id), onNotificationAction: (id, action, data) => console.log('Action:', id, action, data), onMarkAllRead: () => console.log('Mark all read'), onSettingsClick: () => console.log('Notification settings') }));
            case 'spaces':
                return (_jsx(SpacesCard, { spaces: profileData.spaces, recommendedSpaces: profileData.recommendedSpaces, isEditMode: isEditMode, onSpaceClick: (spaceId) => console.log('Open space:', spaceId), onJoinSpace: (spaceId) => console.log('Join space:', spaceId), onLeaveSpace: (spaceId) => console.log('Leave space:', spaceId), onCreateSpace: () => console.log('Create space'), onSearchSpaces: (query) => console.log('Search spaces:', query), onSettingsClick: () => console.log('Spaces settings') }));
            case 'ghostMode':
                return (_jsx(GhostModeCard, { settings: profileData.ghostModeSettings, isEditMode: isEditMode, onSettingsChange: handleGhostModeChange, onToggleGhostMode: handleToggleGhostMode, onQuickPreset: handleGhostModePreset, onSettingsClick: () => console.log('Ghost mode settings') }));
            case 'hiveLab':
                return (_jsx(HiveLabCard, { tools: profileData.tools, builderStats: profileData.builderStats, isBuilder: profileData.isBuilder, isEditMode: isEditMode, onCreateTool: () => console.log('Create tool'), onToolClick: (toolId) => console.log('Open tool:', toolId), onSettingsClick: () => console.log('HiveLAB settings') }));
            default:
                return (_jsx(Card, { className: "h-full flex items-center justify-center", children: _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Unknown card type" }) }));
        }
    }, [
        profileData,
        isEditMode,
        handleProfileUpdate,
        handlePhotoUpload,
        handleGhostModeChange,
        handleToggleGhostMode,
        handleGhostModePreset
    ]);
    // Stats for header
    const unreadNotifications = profileData.notifications.filter(n => !n.isRead).length;
    const activeSpaces = profileData.spaces.filter(s => s.membershipStatus === 'member' || s.membershipStatus === 'admin').length;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn('w-full max-w-7xl mx-auto space-y-6', className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: isOwnProfile ? 'Your Profile' : profileData.user.displayName }), profileData.user.builderStatus && (_jsxs(Badge, { variant: "primary", className: "bg-[var(--hive-brand-gold)]", children: [_jsx(Crown, { className: "w-4 h-4 mr-1" }), "Builder"] })), profileData.ghostModeSettings.isEnabled && (_jsxs(Badge, { variant: "secondary", children: [_jsx(EyeOff, { className: "w-4 h-4 mr-1" }), "Ghost Mode"] }))] }), _jsxs("div", { className: "hidden md:flex items-center gap-4 text-sm text-[var(--hive-text-muted)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Bell, { className: "w-4 h-4" }), unreadNotifications, " unread"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Grid, { className: "w-4 h-4" }), activeSpaces, " spaces"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [isEditMode && (_jsx(DevicePreview, { device: device, onDeviceChange: setDevice })), isOwnProfile && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: isEditMode ? "default" : "outline", size: "sm", onClick: toggleEditMode, children: isEditMode ? (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Layout"] })) : (_jsxs(_Fragment, { children: [_jsx(Edit, { className: "w-4 h-4 mr-2" }), "Customize"] })) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSettingsOpen(true), children: _jsx(Settings, { className: "w-4 h-4" }) })] }))] })] }), _jsx(AnimatePresence, { children: isEditMode && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Info, { className: "w-5 h-5 text-[var(--hive-brand-primary)]" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)]", children: "Customization Mode Active" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Drag cards to reorder, resize using the corner handles, or adjust settings. Changes are saved automatically." })] })] }) })) }), _jsx("div", { className: cn('transition-all duration-300', device === 'mobile' && 'max-w-sm mx-auto', device === 'tablet' && 'max-w-4xl mx-auto', device === 'desktop' && 'max-w-7xl mx-auto'), children: _jsx(BentoGridLayout, { items: items, isEditMode: isEditMode, onItemsChange: updateItems, onEditModeChange: setIsEditMode, maxColumns: maxColumns, children: items
                                .filter(item => item.isVisible)
                                .map((item) => (_jsx("div", { children: renderCardContent(item) }, item.id))) }) }), _jsxs("div", { className: "md:hidden grid grid-cols-2 gap-4", children: [_jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: unreadNotifications }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Unread Notifications" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: activeSpaces }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Active Spaces" })] })] })] }), _jsx(ProfileSettingsDialog, { isOpen: settingsOpen, onOpenChange: setSettingsOpen, items: items, onItemToggle: handleCardVisibilityToggle, onResetLayout: handleResetLayout })] }));
}
// Export default props for Storybook
export const defaultProfileDashboardProps = {
    userId: 'user-1',
    isOwnProfile: true
};
//# sourceMappingURL=profile-dashboard.js.map