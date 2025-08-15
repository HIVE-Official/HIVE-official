'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { GridLayoutEngine, LayoutPersistence } from './bento-grid';
import { PriorityCoordinationWidget } from './widgets/priority-coordination-widget';
import { PrivacyControlWidget } from './widgets/privacy-control-widget';
import { PersonalToolsPreviewWidget } from './widgets/personal-tools-preview-widget';
import { HiveButton } from '../hive-button';
export const EnhancedProfileSystem = ({ user, spaces = [], events = [], connections = [], hiveLab, completionStatus, isLoading = false, isMobile = false, isTablet = false, onEditProfile, onPrivacySettings, onSpaceClick, onEventClick, onConnectionClick, onJoinSpace, onCreateTool }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [widgets, setWidgets] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // Mock coordination data - replace with real API
    const mockPriorities = [
        {
            id: '1',
            type: 'urgent',
            source: 'community',
            title: 'CS study group needs coordinator',
            description: 'Weekly study session needs someone to book room and send reminders',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            priority: 90,
            actions: [
                { id: '1', label: 'Take Lead', type: 'primary', action: () => { } },
                { id: '2', label: 'Suggest Someone', type: 'secondary', action: () => { } }
            ],
            context: {
                communityId: 'cs-majors',
                participants: ['user1', 'user2', 'user3'],
                socialImpact: 85,
                personalRelevance: 70
            }
        },
        {
            id: '2',
            type: 'today',
            source: 'calendar',
            title: 'Team project meeting prep',
            description: 'Gather materials and agenda for 3pm project meeting',
            deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
            priority: 75,
            actions: [
                { id: '1', label: 'Prepare Now', type: 'primary', action: () => { } },
                { id: '2', label: 'Set Reminder', type: 'secondary', action: () => { } }
            ],
            context: {
                eventId: 'project-meeting-1',
                participants: ['teammate1', 'teammate2'],
                socialImpact: 60,
                personalRelevance: 90
            }
        },
        {
            id: '3',
            type: 'this_week',
            source: 'social',
            title: 'Weekend plans coordination',
            description: 'Emma asked about weekend movie night - need to confirm attendance',
            priority: 45,
            actions: [
                { id: '1', label: 'RSVP Yes', type: 'primary', action: () => { } },
                { id: '2', label: 'Maybe Later', type: 'secondary', action: () => { } }
            ],
            context: {
                participants: ['emma', 'friends'],
                socialImpact: 40,
                personalRelevance: 60
            }
        }
    ];
    // Mock privacy settings - replace with real data
    const mockPrivacySettings = {
        ghostMode: {
            enabled: user.ghostMode || false,
            scheduledPrivacy: [],
            exceptions: [],
            partialVisibility: {
                showInMemberLists: true,
                showInSearchResults: true,
                showActivityStatus: true,
                showLastSeen: true
            }
        },
        socialBoundaries: {
            studyMode: false,
            officeHours: [
                { start: '14:00', end: '16:00', days: ['monday', 'wednesday', 'friday'] }
            ],
            socialEnergyLevel: 'high',
            coordinationPreferences: {
                preferredContactMethods: ['hive-message', 'email'],
                responseTimeExpectation: 'hourly',
                availableForEmergencies: true
            }
        },
        dataControl: {
            activitySharing: {
                shareSpaceActivity: true,
                shareCalendarBusy: true,
                shareLocationStatus: false,
                shareToolUsage: true
            },
            crossCommunityVisibility: true,
            searchableProfile: true,
            analyticsOptOut: false
        }
    };
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    const handleLayoutChange = useCallback((newWidgets) => {
        setWidgets(newWidgets);
        setHasUnsavedChanges(true);
    }, []);
    const handleWidgetSettings = useCallback((widgetId, settings) => {
        setWidgets(prev => prev.map(widget => widget.id === widgetId ? { ...widget, settings } : widget));
        setHasUnsavedChanges(true);
    }, []);
    const handleAddWidget = useCallback((type) => {
        const newWidget = {
            id: `widget-${Date.now()}`,
            type,
            title: getWidgetTitle(type),
            position: findNextAvailablePosition(),
            size: getDefaultWidgetSize(type),
            settings: getDefaultWidgetSettings(),
            isVisible: true
        };
        setWidgets(prev => [...prev, newWidget]);
        setHasUnsavedChanges(true);
    }, [widgets]);
    const handleRemoveWidget = useCallback((widgetId) => {
        setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
        setHasUnsavedChanges(true);
    }, []);
    const findNextAvailablePosition = () => {
        // Simple positioning logic - place at first available spot
        const gridColumns = deviceType === 'mobile' ? 1 : deviceType === 'tablet' ? 2 : 4;
        const occupiedPositions = new Set(widgets.map(w => `${w.position.x},${w.position.y}`));
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < gridColumns; x++) {
                if (!occupiedPositions.has(`${x},${y}`)) {
                    return { x, y };
                }
            }
        }
        return { x: 0, y: 0 };
    };
    const getWidgetTitle = (type) => {
        const titles = {
            'social-avatar': 'Profile',
            'priority-coordination': 'Priorities',
            'community-coordination': 'Communities',
            'social-calendar': 'Calendar',
            'privacy-control': 'Privacy',
            'personal-tools': 'Tools',
            'profile-stats': 'Stats',
            'campus-connections': 'Connections'
        };
        return titles[type] || 'Widget';
    };
    const getDefaultWidgetSize = (type) => {
        const sizes = {
            'social-avatar': { width: 1, height: 1 },
            'priority-coordination': { width: 1, height: 2 },
            'community-coordination': { width: 2, height: 1 },
            'social-calendar': { width: 2, height: 1 },
            'privacy-control': { width: 1, height: 1 },
            'personal-tools': { width: 2, height: 2 },
            'profile-stats': { width: 2, height: 1 },
            'campus-connections': { width: 1, height: 1 }
        };
        return sizes[type] || { width: 1, height: 1 };
    };
    const getDefaultWidgetSettings = () => ({
        displayOptions: {
            showHeader: true,
            compactMode: false,
            updateFrequency: 'real-time'
        },
        dataFilters: {},
        privacy: {
            visibility: 'community',
            dataSharing: false
        }
    });
    const handleSaveLayout = async () => {
        setHasUnsavedChanges(false);
        setIsEditing(false);
        // Here you would save to backend
        console.log('Saving layout:', widgets);
    };
    const handleCancelEdit = () => {
        if (hasUnsavedChanges) {
            const confirmed = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
            if (!confirmed)
                return;
        }
        setIsEditing(false);
        setHasUnsavedChanges(false);
        // Revert to last saved state
    };
    const renderWidget = (widget) => {
        const baseProps = {
            id: widget.id,
            title: widget.title,
            size: widget.size,
            position: widget.position,
            settings: widget.settings,
            isEditing,
            onSettingsChange: (settings) => handleWidgetSettings(widget.id, settings),
            onSizeChange: (size) => {
                const updatedWidgets = widgets.map(w => w.id === widget.id ? { ...w, size } : w);
                handleLayoutChange(updatedWidgets);
            },
            onPositionChange: (position) => {
                const updatedWidgets = widgets.map(w => w.id === widget.id ? { ...w, position } : w);
                handleLayoutChange(updatedWidgets);
            },
            onRemove: () => handleRemoveWidget(widget.id)
        };
        switch (widget.type) {
            case 'priority-coordination':
                return (_jsx(PriorityCoordinationWidget, { ...baseProps, priorities: mockPriorities, onActionTaken: (priorityId, actionId) => {
                        console.log('Action taken:', priorityId, actionId);
                    }, onPriorityClick: (priorityId) => {
                        console.log('Priority clicked:', priorityId);
                    }, onViewAll: () => {
                        console.log('View all priorities');
                    } }, widget.id));
            case 'privacy-control':
                return (_jsx(PrivacyControlWidget, { ...baseProps, privacySettings: mockPrivacySettings, onPrivacyChange: (settings) => {
                        console.log('Privacy settings changed:', settings);
                    }, onOpenFullSettings: () => {
                        if (onPrivacySettings)
                            onPrivacySettings();
                    } }, widget.id));
            case 'personal-tools':
                return (_jsx(PersonalToolsPreviewWidget, { ...baseProps, isV1Unlocked: user.isBuilder, onJoinWaitlist: () => {
                        console.log('Join v1 waitlist');
                        window.open('https://hive.ai/waitlist', '_blank');
                    }, onViewToolCategory: (category) => {
                        console.log('View tool category:', category);
                        if (onCreateTool)
                            onCreateTool();
                    } }, widget.id));
            default:
                // Placeholder for other widgets
                return (_jsx("div", { className: "h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl mb-2", children: "\uD83D\uDEA7" }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [getWidgetTitle(widget.type), " Widget"] }), _jsx("p", { className: "text-xs text-hive-text-tertiary", children: "Coming soon" })] }) }, widget.id));
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-hive-background-primary flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-hive-gold mx-auto mb-4" }), _jsx("p", { className: "text-hive-text-primary", children: "Loading your HIVE Profile..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-obsidian", children: _jsxs("div", { className: "max-w-7xl mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, className: "w-16 h-16 rounded-full border-2 border-steel" })) : (_jsx("div", { className: "w-16 h-16 rounded-full bg-charcoal border-2 border-steel flex items-center justify-center", children: _jsx("span", { className: "text-xl font-bold text-platinum", children: user.name.charAt(0) }) })), user.ghostMode && (_jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-xs", children: "\uD83D\uDC7B" }) }))] }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-platinum", children: user.name }), _jsxs("p", { className: "text-silver", children: [user.major, " \u2022 ", user.gradYear, " \u2022 ", user.campus] }), user.isBuilder && (_jsx("div", { className: "flex items-center gap-2 mt-1", children: _jsx("span", { className: "text-xs bg-gold/20 text-gold px-2 py-1 rounded-full", children: "\uD83C\uDFD7\uFE0F Builder" }) }))] })] }), _jsx("div", { className: "flex items-center gap-3", children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs(HiveButton, { variant: "outline", onClick: handleCancelEdit, className: "gap-2", children: [_jsx(X, { className: "h-4 w-4" }), "Cancel"] }), _jsxs(HiveButton, { onClick: handleSaveLayout, className: "gap-2", disabled: !hasUnsavedChanges, children: [_jsx(Save, { className: "h-4 w-4" }), "Save Layout"] })] })) : (_jsxs(HiveButton, { onClick: () => setIsEditing(true), className: "gap-2", children: [_jsx(Edit3, { className: "h-4 w-4" }), "Customize"] })) })] }), _jsx(GridLayoutEngine, { widgets: widgets, isEditing: isEditing, isMobile: isMobile, isTablet: isTablet, onLayoutChange: handleLayoutChange, onWidgetSettings: handleWidgetSettings, onAddWidget: handleAddWidget, onRemoveWidget: handleRemoveWidget }), _jsx(LayoutPersistence, { currentLayout: widgets, deviceType: deviceType, onLayoutLoad: setWidgets, onLayoutSave: async (layout) => {
                        // Save to backend
                        console.log('Saving layout to backend:', layout);
                    } })] }) }));
};
export default EnhancedProfileSystem;
//# sourceMappingURL=enhanced-profile-system.js.map