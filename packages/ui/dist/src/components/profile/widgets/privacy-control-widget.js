'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, Users, Clock, Settings, BookOpen, AlertTriangle, ExternalLink } from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget.js';
import { HiveButton } from '../../hive-button.js';
import { HiveSwitch } from '../../hive-switch.js';
import { cn } from '../../../lib/utils.js';
export const PrivacyControlWidget = ({ privacySettings, isLoading = false, onPrivacyChange, onOpenFullSettings, ...baseProps }) => {
    const [activeTab, setActiveTab] = useState('status');
    const updatePrivacySetting = (path, value) => {
        const newSettings = { ...privacySettings };
        const keys = path.split('.');
        let current = newSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        onPrivacyChange(newSettings);
    };
    const toggleGhostMode = () => {
        updatePrivacySetting('ghostMode.enabled', !privacySettings.ghostMode.enabled);
    };
    const getSocialEnergyColor = (level) => {
        const colorMap = {
            low: 'text-red-400 bg-red-400/10',
            medium: 'text-yellow-400 bg-yellow-400/10',
            high: 'text-green-400 bg-green-400/10'
        };
        return colorMap[level] || 'text-gray-400 bg-gray-400/10';
    };
    const getSocialEnergyEmoji = (level) => {
        const emojiMap = {
            low: '🔋',
            medium: '⚡',
            high: '🚀'
        };
        return emojiMap[level] || '📊';
    };
    const renderStatusTab = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn('p-2 rounded-full', privacySettings.ghostMode.enabled
                                            ? 'bg-purple-400/10 text-purple-400'
                                            : 'bg-gray-400/10 text-gray-400'), children: privacySettings.ghostMode.enabled ? _jsx(EyeOff, { className: "h-4 w-4" }) : _jsx(Eye, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-hive-text-primary", children: "Ghost Mode" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Become invisible across HIVE" })] })] }), _jsx(HiveSwitch, { checked: privacySettings.ghostMode.enabled, onCheckedChange: toggleGhostMode })] }), privacySettings.ghostMode.enabled && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "pl-12 space-y-2", children: _jsxs("div", { className: "p-3 bg-purple-400/5 border border-purple-400/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-purple-400" }), _jsx("span", { className: "text-sm font-medium text-purple-400", children: "You're invisible" })] }), _jsxs("ul", { className: "text-xs text-hive-text-secondary space-y-1", children: [_jsx("li", { children: "\u2022 Hidden from member lists" }), _jsx("li", { children: "\u2022 Not visible in search results" }), _jsx("li", { children: "\u2022 Activity status private" }), _jsx("li", { children: "\u2022 Leaders can still see you for moderation" })] })] }) }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: "Current Status" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 bg-hive-surface-elevated/30 rounded-lg border border-hive-border-subtle/30", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Users, { className: "h-4 w-4 text-blue-400" }), _jsx("span", { className: "text-xs font-medium text-hive-text-primary", children: "Visibility" })] }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: privacySettings.ghostMode.enabled ? 'Invisible' : 'Visible' })] }), _jsxs("div", { className: "p-3 bg-hive-surface-elevated/30 rounded-lg border border-hive-border-subtle/30", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Shield, { className: "h-4 w-4 text-green-400" }), _jsx("span", { className: "text-xs font-medium text-hive-text-primary", children: "Profile" })] }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: privacySettings.dataControl.searchableProfile ? 'Searchable' : 'Private' })] })] })] })] }));
    const renderBoundariesTab = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn('p-2 rounded-full', privacySettings.socialBoundaries.studyMode
                                    ? 'bg-blue-400/10 text-blue-400'
                                    : 'bg-gray-400/10 text-gray-400'), children: _jsx(BookOpen, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-hive-text-primary", children: "Study Mode" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Reduce social notifications" })] })] }), _jsx(HiveSwitch, { checked: privacySettings.socialBoundaries.studyMode, onCheckedChange: (checked) => updatePrivacySetting('socialBoundaries.studyMode', checked) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: "Social Energy" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: ['low', 'medium', 'high'].map((level) => (_jsxs("button", { onClick: () => updatePrivacySetting('socialBoundaries.socialEnergyLevel', level), className: cn('p-3 rounded-lg border text-center transition-all', privacySettings.socialBoundaries.socialEnergyLevel === level
                                ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                                : 'border-hive-border-subtle bg-hive-surface-elevated/30 text-hive-text-secondary hover:border-hive-border-subtle/60'), children: [_jsx("div", { className: "text-lg mb-1", children: getSocialEnergyEmoji(level) }), _jsx("div", { className: "text-xs font-medium capitalize", children: level })] }, level))) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: "Office Hours" }), _jsx(HiveButton, { size: "sm", variant: "ghost", className: "text-xs", children: "Configure" })] }), privacySettings.socialBoundaries.officeHours.length > 0 ? (_jsx("div", { className: "space-y-1", children: privacySettings.socialBoundaries.officeHours.map((hours, index) => (_jsxs("div", { className: "text-xs text-hive-text-secondary flex items-center gap-2", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: [hours.start, " - ", hours.end] }), _jsx("span", { className: "text-hive-text-tertiary", children: hours.days.join(', ') })] }, index))) })) : (_jsx("p", { className: "text-xs text-hive-text-secondary", children: "Available anytime for coordination" }))] })] }));
    const renderDataTab = () => (_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-hive-text-primary", children: "Data Sharing" }), _jsx("div", { className: "space-y-3", children: [
                    { key: 'shareSpaceActivity', label: 'Space Activity', description: 'Show your community participation' },
                    { key: 'shareCalendarBusy', label: 'Calendar Status', description: 'Share when you\'re busy' },
                    { key: 'shareLocationStatus', label: 'Location Status', description: 'Show campus location' },
                    { key: 'shareToolUsage', label: 'Tool Usage', description: 'Share tool activity' }
                ].map((item) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-hive-text-primary", children: item.label }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: item.description })] }), _jsx(HiveSwitch, { checked: privacySettings.dataControl.activitySharing[item.key], onCheckedChange: (checked) => updatePrivacySetting(`dataControl.activitySharing.${item.key}`, checked) })] }, item.key))) }), _jsx("div", { className: "pt-3 border-t border-hive-border-subtle/30", children: _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-hive-text-primary", children: "Analytics" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Anonymous usage data" })] }), _jsx(HiveSwitch, { checked: !privacySettings.dataControl.analyticsOptOut, onCheckedChange: (checked) => updatePrivacySetting('dataControl.analyticsOptOut', !checked) })] }) })] }));
    const tabs = [
        { id: 'status', label: 'Status', icon: Eye },
        { id: 'boundaries', label: 'Boundaries', icon: Shield },
        { id: 'data', label: 'Data', icon: Settings }
    ];
    const widgetContent = (_jsx("div", { className: "h-full flex flex-col", children: isLoading ? (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-2" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Loading privacy settings..." })] }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex border-b border-hive-border-subtle/30 mb-4", children: tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: cn('flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative', activeTab === tab.id
                                ? 'text-[var(--hive-brand-secondary)]'
                                : 'text-hive-text-secondary hover:text-hive-text-primary'), children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:block", children: tab.label }), activeTab === tab.id && (_jsx(motion.div, { layoutId: "privacy-tab-indicator", className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--hive-brand-secondary)]" }))] }, tab.id));
                    }) }), _jsx("div", { className: "flex-1 overflow-y-auto", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, transition: { duration: 0.2 }, children: [activeTab === 'status' && renderStatusTab(), activeTab === 'boundaries' && renderBoundariesTab(), activeTab === 'data' && renderDataTab()] }, activeTab) }) }), _jsx("div", { className: "pt-4 border-t border-hive-border-subtle/30", children: _jsxs(HiveButton, { variant: "outline", size: "sm", onClick: onOpenFullSettings, className: "w-full gap-2", children: [_jsx("span", { children: "Advanced Settings" }), _jsx(ExternalLink, { className: "h-4 w-4" })] }) })] })) }));
    return (_jsx(BaseWidget, { ...baseProps, children: widgetContent }));
};
//# sourceMappingURL=privacy-control-widget.js.map