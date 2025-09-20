'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Switch } from '../../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Eye, EyeOff, Settings, Clock, Users, MapPin, Bell, Activity, Timer, UserX, Info, Moon, Zap, BookOpen } from 'lucide-react';
// Ghost Mode Level Configuration
const ghostModeConfig = {
    light: {
        icon: Eye,
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        label: 'Light',
        description: 'Hide online status only'
    },
    medium: {
        icon: EyeOff,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        label: 'Medium',
        description: 'Hide activity and location'
    },
    full: {
        icon: UserX,
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        label: 'Full',
        description: 'Complete invisibility'
    }
};
// Quick Preset Configuration
const presetConfig = {
    studying: {
        icon: BookOpen,
        color: 'bg-blue-500',
        textColor: 'text-blue-700',
        label: 'Studying',
        description: 'Focus mode with limited visibility'
    },
    sleeping: {
        icon: Moon,
        color: 'bg-indigo-500',
        textColor: 'text-indigo-700',
        label: 'Sleeping',
        description: 'Night mode with notifications off'
    },
    busy: {
        icon: Zap,
        color: 'bg-orange-500',
        textColor: 'text-orange-700',
        label: 'Busy',
        description: 'Working with minimal distractions'
    },
    invisible: {
        icon: UserX,
        color: 'bg-gray-500',
        textColor: 'text-gray-700',
        label: 'Invisible',
        description: 'Completely hidden from others'
    }
};
// Time formatting
function formatTimeRemaining(expiresAt) {
    const now = new Date();
    const diffMs = expiresAt.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    if (diffMins < 0)
        return 'Expired';
    if (diffMins < 60)
        return `${diffMins}m left`;
    if (diffHours < 24)
        return `${diffHours}h left`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d left`;
}
// Quick Preset Component
function QuickPreset({ preset, isActive, onClick }) {
    const config = presetConfig[preset];
    const Icon = config.icon;
    return (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: cn('p-2 rounded-lg border transition-all text-left', isActive
            ? `${config.color} text-white border-transparent shadow-md`
            : 'bg-white border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'), onClick: onClick, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: cn('w-4 h-4', isActive ? 'text-white' : config.textColor) }), _jsx("span", { className: cn('text-sm font-medium', isActive ? 'text-white' : 'text-[var(--hive-text-primary)]'), children: config.label })] }) }));
}
// Privacy Status Indicator
function PrivacyStatusIndicator({ settings }) {
    const activeFeatures = useMemo(() => {
        const features = [];
        if (settings.hideOnlineStatus)
            features.push('Status');
        if (settings.hideActivity)
            features.push('Activity');
        if (settings.hideLocation)
            features.push('Location');
        if (settings.hideSpaces)
            features.push('Spaces');
        if (settings.muteNotifications)
            features.push('Notifications');
        return features;
    }, [settings]);
    const config = ghostModeConfig[settings.level];
    const Icon = config.icon;
    return (_jsxs("div", { className: cn('p-2 rounded-lg', config.bgColor), children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Icon, { className: cn('w-4 h-4', config.textColor) }), _jsxs("span", { className: cn('text-sm font-medium', config.textColor), children: [config.label, " Ghost Mode"] })] }), activeFeatures.length > 0 && (_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "Hidden:" }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [activeFeatures.slice(0, 3).map((feature) => (_jsx(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5", children: feature }, feature))), activeFeatures.length > 3 && (_jsxs(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5", children: ["+", activeFeatures.length - 3] }))] })] }))] }));
}
// Ghost Mode Settings Dialog
function GhostModeSettingsDialog({ settings, isOpen, onOpenChange, onSettingsChange }) {
    const handleSettingChange = useCallback((key, value) => {
        if (key.includes('.')) {
            const [parent, child] = key.split('.');
            onSettingsChange({
                [parent]: {
                    ...settings[parent],
                    [child]: value
                }
            });
        }
        else {
            onSettingsChange({ [key]: value });
        }
    }, [settings, onSettingsChange]);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Ghost Mode Settings" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Privacy Level" }), _jsx("div", { className: "space-y-2", children: Object.keys(ghostModeConfig).map((level) => {
                                        const config = ghostModeConfig[level];
                                        const Icon = config.icon;
                                        return (_jsx("button", { className: cn('w-full p-3 rounded-lg border text-left transition-all', settings.level === level
                                                ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-background-tertiary)]'
                                                : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'), onClick: () => handleSettingChange('level', level), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn('w-8 h-8 rounded-full flex items-center justify-center', config.color), children: _jsx(Icon, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: config.label }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: config.description })] })] }) }, level));
                                    }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "What to Hide" }), _jsxs("div", { className: "space-y-2", children: [[
                                            { key: 'hideOnlineStatus', label: 'Online Status', icon: Activity },
                                            { key: 'hideActivity', label: 'Recent Activity', icon: Clock },
                                            { key: 'hideLocation', label: 'Location Info', icon: MapPin },
                                            { key: 'hideSpaces', label: 'Space Memberships', icon: Users },
                                            { key: 'muteNotifications', label: 'Mute Notifications', icon: Bell }
                                        ].map(({ key, label, icon: Icon })), " => (", _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: label })] }), _jsx(Switch, { checked: settings[key], onChange: (e) => { const checked = e.target.checked; handleSettingChange(key, checked); } })] }, key), "))}"] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Duration" }), _jsxs("div", { className: "space-y-2", children: [[
                                            { key: 'temporary', label: '1 Hour', description: 'Auto-disable after 1 hour' },
                                            { key: 'session', label: 'This Session', description: 'Until you log out' },
                                            { key: 'indefinite', label: 'Until Disabled', description: 'Stays on until manually turned off' }
                                        ].map(({ key, label, description })), " => (", _jsxs("button", { className: cn('w-full p-2 rounded-lg border text-left transition-all', settings.duration === key
                                                ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-background-tertiary)]'
                                                : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'), onClick: () => handleSettingChange('duration', key), children: [_jsx("div", { className: "font-medium text-sm text-[var(--hive-text-primary)]", children: label }), _jsx("div", { className: "text-xs text-[var(--hive-text-muted)]", children: description })] }, key), "))}"] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Automation" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Timer, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsxs("div", { children: [_jsx("span", { className: "text-sm", children: "Quiet Hours" }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "10 PM - 8 AM" })] })] }), _jsx(Switch, { checked: settings.quietHours.enabled, onChange: (e) => { const checked = e.target.checked; handleSettingChange('quietHours.enabled', checked); } })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-4 h-4 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-sm", children: "Auto Ghost Mode" })] }), _jsx(Switch, { checked: settings.autoEnabled, onChange: (e) => { const checked = e.target.checked; handleSettingChange('autoEnabled', checked); } })] })] })] })] })] }) }));
}
// Main Ghost Mode Card Component
export function GhostModeCard({ settings, isEditMode, onSettingsChange, onToggleGhostMode, onQuickPreset, onSettingsClick, className }) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [showPresets, setShowPresets] = useState(false);
    const activePresets = useMemo(() => Object.entries(settings.presets).filter(([_, active]) => active).map(([preset]) => preset), [settings.presets]);
    const timeRemaining = useMemo(() => {
        if (settings.expiresAt && settings.duration === 'temporary') {
            return formatTimeRemaining(settings.expiresAt);
        }
        return null;
    }, [settings.expiresAt, settings.duration]);
    const handleToggle = useCallback(() => {
        onToggleGhostMode(!settings.isEnabled);
    }, [settings.isEnabled, onToggleGhostMode]);
    const handlePresetClick = useCallback((preset) => {
        onQuickPreset(preset);
    }, [onQuickPreset]);
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: cn('h-full overflow-hidden', className), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(motion.div, { animate: {
                                                color: settings.isEnabled
                                                    ? 'var(--hive-brand-primary)'
                                                    : 'var(--hive-text-muted)'
                                            }, children: settings.isEnabled ? (_jsx(EyeOff, { className: "w-5 h-5" })) : (_jsx(Eye, { className: "w-5 h-5" })) }), _jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] text-sm", children: "Ghost Mode" })] }), !isEditMode && (_jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0", onClick: () => setSettingsOpen(true), children: _jsx(Settings, { className: "w-3 h-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: settings.isEnabled ? 'Enabled' : 'Disabled' }), timeRemaining && (_jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: timeRemaining }))] }), _jsx(motion.div, { whileTap: { scale: 0.95 }, children: _jsx(Switch, { checked: settings.isEnabled, onCheckedChange: handleToggle }) })] }), settings.isEnabled && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: _jsx(PrivacyStatusIndicator, { settings: settings }) })), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-medium text-[var(--hive-text-muted)]", children: "Quick Presets" }), _jsx(Button, { size: "sm", variant: "ghost", className: "h-5 w-5 p-0", onClick: () => setShowPresets(!showPresets), children: showPresets ? (_jsx(EyeOff, { className: "w-3 h-3" })) : (_jsx(Eye, { className: "w-3 h-3" })) })] }), _jsx(AnimatePresence, { children: showPresets && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "grid grid-cols-2 gap-2", children: Object.keys(presetConfig).map((preset) => (_jsx(QuickPreset, { preset: preset, isActive: settings.presets[preset], onClick: () => handlePresetClick(preset) }, preset))) })) }), !showPresets && activePresets.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1", children: [activePresets.slice(0, 2).map((preset) => (_jsx(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5", children: presetConfig[preset].label }, preset))), activePresets.length > 2 && (_jsxs(Badge, { variant: "secondary", className: "text-xs px-1.5 py-0.5", children: ["+", activePresets.length - 2] }))] }))] }), (settings.autoEnabled || settings.quietHours.enabled) && (_jsxs("div", { className: "flex items-center gap-2 p-2 bg-[var(--hive-background-tertiary)] rounded text-xs", children: [_jsx(Timer, { className: "w-3 h-3 text-[var(--hive-text-muted)]" }), _jsx("span", { className: "text-[var(--hive-text-muted)]", children: settings.quietHours.enabled && settings.autoEnabled
                                            ? 'Auto & Quiet hours enabled'
                                            : settings.quietHours.enabled
                                                ? 'Quiet hours enabled'
                                                : 'Auto mode enabled' })] })), !settings.isEnabled && (_jsxs("div", { className: "text-xs text-[var(--hive-text-muted)] text-center", children: [_jsx(Info, { className: "w-3 h-3 inline mr-1" }), "Hide your activity and status from others"] }))] })] }), _jsx(GhostModeSettingsDialog, { settings: settings, isOpen: settingsOpen, onOpenChange: setSettingsOpen, onSettingsChange: onSettingsChange })] }));
}
// Default props for development
export const mockGhostModeSettings = {
    isEnabled: false,
    level: 'medium',
    duration: 'session',
    hideOnlineStatus: true,
    hideActivity: true,
    hideLocation: false,
    hideSpaces: false,
    hideTools: false,
    muteNotifications: false,
    presets: {
        studying: false,
        sleeping: false,
        busy: false,
        invisible: false
    },
    autoEnabled: false,
    quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00'
    }
};
//# sourceMappingURL=ghost-mode-card.js.map