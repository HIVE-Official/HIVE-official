'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from '../framer-motion-proxy';
import { BentoGrid } from '../bento-grid';
import { AvatarCard } from './avatar-card';
import { CalendarCard } from '../profile/calendar-card';
import { adaptSmartCalendarProps } from '../profile/calendar-data-adapter';
import { MySpacesFeed } from '../profile/my-spaces-feed';
import { HiveLabSection } from '../profile/hive-lab-section';
import { HiveCard } from '../hive-card';
import { HiveBadge } from '../hive-badge';
import { GhostModeCard } from './ghost-mode-card';
import { Grid3X3, Activity, Users, Lock, Zap, BarChart3, Crown } from 'lucide-react';
import { cn } from '../../lib/utils';
// Coming Soon Card Component
const ComingSoonCard = ({ title, description, icon: Icon }) => (_jsxs(HiveCard, { className: "h-full flex flex-col items-center justify-center text-center p-6", children: [_jsx("div", { className: "rounded-full bg-[var(--hive-brand-secondary)]/10 p-4 mb-4", children: _jsx(Icon, { className: "h-8 w-8 text-[var(--hive-brand-secondary)]" }) }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: title }), _jsx("p", { className: "text-sm text-gray-400 mb-4", children: description }), _jsxs(HiveBadge, { variant: "active-tag", className: "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-hive-gold/30", children: [_jsx(Lock, { className: "h-3 w-3 mr-1" }), "Coming in v1"] })] }));
// Personal Tools Card
const PersonalToolsCard = ({ tools, onToolClick }) => (_jsxs(HiveCard, { className: "h-full p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Your Tools" }), _jsxs(HiveBadge, { variant: "course-tag", children: [tools.length, "/9"] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [tools.slice(0, 9).map((tool) => (_jsxs(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "aspect-square rounded-lg bg-gray-800/50 border border-white/10 hover:border-hive-gold/30 cursor-pointer p-3 flex flex-col items-center justify-center transition-colors", onClick: () => onToolClick?.(tool.id), children: [_jsx("div", { className: "text-2xl mb-1", children: tool.icon }), _jsx("div", { className: "text-xs text-gray-300 text-center truncate w-full", children: tool.name }), tool.isForked && (_jsx("div", { className: "mt-1", children: _jsx(HiveBadge, { variant: "tool-tag", className: "text-xs px-1 py-0", children: "Fork" }) }))] }, tool.id))), Array.from({ length: Math.max(0, 9 - tools.length) }).map((_, index) => (_jsx("div", { className: "aspect-square rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center opacity-50", children: _jsx(Grid3X3, { className: "h-6 w-6 text-gray-500" }) }, `empty-${index}`)))] }), _jsx("div", { className: "text-xs text-gray-400 text-center", children: "Fork any Tool from Spaces to add here" })] }));
// Activity Log Card
const ActivityLogCard = ({ activities }) => (_jsxs(HiveCard, { className: "h-full p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Recent Activity" }), _jsx(Activity, { className: "h-5 w-5 text-gray-400" })] }), _jsx("div", { className: "space-y-3 max-h-64 overflow-y-auto", children: activities.slice(0, 5).map((activity) => (_jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg bg-gray-800/30", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] mt-2 flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-primary)] font-medium truncate", children: activity.title }), _jsx("p", { className: "text-xs text-gray-400 mb-1", children: activity.description }), _jsx("p", { className: "text-xs text-gray-500", children: activity.timestamp })] })] }, activity.id))) }), _jsx("div", { className: "mt-4 pt-3 border-t border-white/10 text-center", children: _jsxs("div", { className: "text-xs text-gray-400 flex items-center justify-center gap-1", children: [_jsx(Lock, { className: "h-3 w-3" }), "Full activity sharing coming in v1"] }) })] }));
export const EnhancedProfileDashboard = ({ user, spaces = [], events = [], connections = [], personalTools = [], activityLog = [], hiveLab, completionStatus, isLoading = false, cardLayout, onCardLayoutChange, onPhotoUpload, onGenerateAvatar, onEditProfile, onPrivacySettings, onSpaceClick, onEventClick, onToolClick, onCreateTool, className }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const defaultLayout = {
        avatar: { size: 'lg', isVisible: true, order: 0 }, // Larger for better prominence
        tools: { size: 'xl', isVisible: true, order: 1 }, // Main feature - make it prominent
        calendar: { size: 'lg', isVisible: true, order: 2 },
        spaces: { size: 'lg', isVisible: true, order: 3 }, // Reduced from xl for better balance
        ghostmode: { size: 'sm', isVisible: true, order: 4 }, // Compact privacy toggle
        activity: { size: 'md', isVisible: true, order: 5 },
        social: { size: 'md', isVisible: false, order: 6 }, // Hidden in vBETA
        hivelab: { size: 'lg', isVisible: user.isBuilder || false, order: 7 }, // Important for builders
        analytics: { size: 'md', isVisible: user.isBuilder || false, order: 8 },
        leadership: { size: 'md', isVisible: user.isBuilder || false, order: 9 },
    };
    const currentLayout = cardLayout || defaultLayout;
    const bentoCards = useMemo(() => {
        const cards = [
            {
                id: 'avatar',
                type: 'avatar',
                title: 'Profile',
                size: currentLayout.avatar.size,
                isVisible: currentLayout.avatar.isVisible,
                children: (_jsx(AvatarCard, { user: user, completionStatus: completionStatus, showOnboarding: !!(completionStatus && completionStatus.overall < 100), isEditMode: isEditMode, onPhotoUpload: onPhotoUpload, onGenerateAvatar: onGenerateAvatar, onEditProfile: onEditProfile, onPrivacySettings: onPrivacySettings })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, avatar: { ...currentLayout.avatar, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        avatar: { ...currentLayout.avatar, isVisible: !currentLayout.avatar.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'calendar',
                type: 'calendar',
                title: 'Calendar',
                size: currentLayout.calendar.size,
                isVisible: currentLayout.calendar.isVisible,
                children: (_jsx(CalendarCard, { ...adaptSmartCalendarProps(events, isLoading, undefined, onEventClick, undefined, 'desktop') })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, calendar: { ...currentLayout.calendar, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        calendar: { ...currentLayout.calendar, isVisible: !currentLayout.calendar.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'tools',
                type: 'tools',
                title: 'Personal Tools',
                size: currentLayout.tools.size,
                isVisible: currentLayout.tools.isVisible,
                children: (_jsx(PersonalToolsCard, { tools: personalTools, onToolClick: onToolClick })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, tools: { ...currentLayout.tools, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        tools: { ...currentLayout.tools, isVisible: !currentLayout.tools.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'spaces',
                type: 'spaces',
                title: 'Your Spaces',
                size: currentLayout.spaces.size,
                isVisible: currentLayout.spaces.isVisible,
                children: (_jsx(MySpacesFeed, { spaces: spaces, isLoading: isLoading, onSpaceClick: onSpaceClick })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, spaces: { ...currentLayout.spaces, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        spaces: { ...currentLayout.spaces, isVisible: !currentLayout.spaces.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'activity',
                type: 'activity',
                title: 'Activity Log',
                size: currentLayout.activity.size,
                isVisible: currentLayout.activity.isVisible,
                children: (_jsx(ActivityLogCard, { activities: activityLog })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, activity: { ...currentLayout.activity, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        activity: { ...currentLayout.activity, isVisible: !currentLayout.activity.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'ghostmode',
                type: 'ghostmode',
                title: 'Privacy & Ghost Mode',
                size: currentLayout.ghostmode.size,
                isVisible: currentLayout.ghostmode.isVisible,
                children: (_jsx(GhostModeCard, { userId: user.id, isActive: user.ghostMode || false, level: "selective" // Default level, should come from user data
                    , onToggle: async (enabled, level) => {
                        // TODO: Implement actual privacy toggle
                        console.log('Toggle ghost mode:', enabled, level);
                        return true;
                    }, onSettings: onPrivacySettings })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, ghostmode: { ...currentLayout.ghostmode, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        ghostmode: { ...currentLayout.ghostmode, isVisible: !currentLayout.ghostmode.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            },
            {
                id: 'social',
                type: 'social',
                title: 'Social Connections',
                size: currentLayout.social.size,
                isVisible: currentLayout.social.isVisible,
                comingSoon: true,
                children: (_jsx(ComingSoonCard, { title: "Social Connections", description: "Connect with classmates and discover study groups", icon: Users })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, social: { ...currentLayout.social, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        social: { ...currentLayout.social, isVisible: !currentLayout.social.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            }
        ];
        // Add Builder-only cards
        if (user.isBuilder) {
            cards.push({
                id: 'hivelab',
                type: 'hivelab',
                title: 'HiveLAB',
                size: currentLayout.hivelab.size,
                isVisible: currentLayout.hivelab.isVisible,
                isBuilderOnly: true,
                children: hiveLab ? (_jsx(HiveLabSection, { hiveLab: hiveLab, isLoading: isLoading, onCreateTool: onCreateTool })) : (_jsx(ComingSoonCard, { title: "HiveLAB", description: "Create and manage your Tools", icon: Zap })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, hivelab: { ...currentLayout.hivelab, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        hivelab: { ...currentLayout.hivelab, isVisible: !currentLayout.hivelab.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            }, {
                id: 'analytics',
                type: 'analytics',
                title: 'Tool Analytics',
                size: currentLayout.analytics.size,
                isVisible: currentLayout.analytics.isVisible,
                isBuilderOnly: true,
                children: (_jsx(ComingSoonCard, { title: "Tool Analytics", description: "Track usage and impact of your Tools", icon: BarChart3 })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, analytics: { ...currentLayout.analytics, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        analytics: { ...currentLayout.analytics, isVisible: !currentLayout.analytics.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            }, {
                id: 'leadership',
                type: 'leadership',
                title: 'Space Leadership',
                size: currentLayout.leadership.size,
                isVisible: currentLayout.leadership.isVisible,
                isBuilderOnly: true,
                children: (_jsx(ComingSoonCard, { title: "Space Leadership", description: "Manage Spaces you lead", icon: Crown })),
                onResize: (newSize) => {
                    const newLayout = { ...currentLayout, leadership: { ...currentLayout.leadership, size: newSize } };
                    onCardLayoutChange?.(newLayout);
                },
                onToggleVisibility: () => {
                    const newLayout = {
                        ...currentLayout,
                        leadership: { ...currentLayout.leadership, isVisible: !currentLayout.leadership.isVisible }
                    };
                    onCardLayoutChange?.(newLayout);
                }
            });
        }
        return cards.sort((a, b) => currentLayout[a.id]?.order - currentLayout[b.id]?.order);
    }, [user, spaces, events, personalTools, activityLog, hiveLab, completionStatus, currentLayout, isEditMode, isLoading]);
    const handleCardReorder = (reorderedCards) => {
        const newLayout = { ...currentLayout };
        reorderedCards.forEach((card, index) => {
            if (newLayout[card.id]) {
                newLayout[card.id].order = index;
            }
        });
        onCardLayoutChange?.(newLayout);
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-hive-gold mx-auto mb-4" }), _jsx("p", { className: "text-gray-300", children: "Loading your HIVE profile..." })] }) }));
    }
    return (_jsx("div", { className: cn('min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6', className), children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [user.ghostMode && (_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-4 rounded-lg bg-gray-800/60 border border-gray-600", children: _jsxs("div", { className: "flex items-center justify-center gap-2 text-gray-300", children: [_jsx(Lock, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm font-medium", children: "Ghost Mode Active" }), _jsx("span", { className: "text-xs", children: "\u2022 You're hidden from discovery" })] }) })), _jsx(BentoGrid, { cards: bentoCards, isCustomizable: true, isEditMode: isEditMode, onCardReorder: handleCardReorder, onToggleEditMode: () => setIsEditMode(!isEditMode), className: "w-full" })] }) }));
};
export default EnhancedProfileDashboard;
//# sourceMappingURL=enhanced-profile-dashboard.js.map