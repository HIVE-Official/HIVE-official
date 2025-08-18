'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Eye, EyeOff, Lock, Unlock, Shield, Users, Settings, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { usePrivacyUtils } from '@hive/core';
const levelConfig = {
    invisible: {
        label: 'Invisible',
        description: 'Completely hidden from all discovery',
        icon: EyeOff,
        color: 'red',
        features: ['Hidden from directories', 'No activity tracking', 'Anonymous in spaces', 'No search results']
    },
    minimal: {
        label: 'Minimal',
        description: 'Basic visibility to space members only',
        icon: Eye,
        color: 'yellow',
        features: ['Visible to space members', 'Limited activity sharing', 'No public discovery', 'Private last seen']
    },
    selective: {
        label: 'Selective',
        description: 'Choose what to share and with whom',
        icon: Shield,
        color: 'blue',
        features: ['Custom visibility rules', 'Selective activity sharing', 'Space-specific settings', 'Friends list control']
    },
    normal: {
        label: 'Normal',
        description: 'Standard visibility and sharing',
        icon: Users,
        color: 'green',
        features: ['Full platform visibility', 'Activity sharing enabled', 'Discoverable in search', 'Public profile']
    }
};
export const GhostModeCard = ({ userId, isActive = false, level = 'selective', onToggle, onSettings, className }) => {
    const [loading, setLoading] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(level);
    const [showLevelSelector, setShowLevelSelector] = useState(false);
    const [scheduledEnd, setScheduledEnd] = useState(null);
    const privacyUtils = usePrivacyUtils();
    useEffect(() => {
        // Load current ghost mode status
        const loadGhostModeStatus = async () => {
            try {
                const status = await privacyUtils.getGhostModeStatus(userId);
                if (status) {
                    setCurrentLevel(status.level);
                    if (status.duration) {
                        setScheduledEnd(new Date(Date.now() + status.duration * 1000));
                    }
                }
            }
            catch (error) {
                console.warn('Failed to load ghost mode status:', error);
            }
        };
        loadGhostModeStatus();
    }, [userId, privacyUtils]);
    const handleToggle = async () => {
        if (loading)
            return;
        setLoading(true);
        try {
            const success = await (onToggle?.(!isActive, !isActive ? currentLevel : undefined) ?? privacyUtils.toggleGhostMode(!isActive, currentLevel));
            if (!success) {
                throw new Error('Failed to toggle ghost mode');
            }
        }
        catch (error) {
            console.error('Ghost mode toggle failed:', error);
            // TODO: Show error toast
        }
        finally {
            setLoading(false);
        }
    };
    const handleLevelChange = async (newLevel) => {
        if (loading)
            return;
        setLoading(true);
        try {
            const success = await (onToggle?.(true, newLevel) ?? privacyUtils.toggleGhostMode(true, newLevel));
            if (success) {
                setCurrentLevel(newLevel);
                setShowLevelSelector(false);
            }
            else {
                throw new Error('Failed to change ghost mode level');
            }
        }
        catch (error) {
            console.error('Ghost mode level change failed:', error);
            // TODO: Show error toast
        }
        finally {
            setLoading(false);
        }
    };
    const currentConfig = levelConfig[currentLevel];
    const IconComponent = currentConfig.icon;
    return (_jsx(HiveCard, { variant: isActive ? "gold-accent" : "default", magneticHover: true, magneticIntensity: "subtle", interactive: true, className: cn('h-full', className), children: _jsxs("div", { className: "p-6 h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn('p-2 rounded-lg', isActive ? 'bg-red-500/20' : 'bg-gray-500/20'), children: _jsx(IconComponent, { className: cn('h-5 w-5', isActive ? 'text-red-400' : 'text-gray-400') }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Ghost Mode" }), _jsx("p", { className: "text-xs text-gray-400", children: "Privacy & Visibility Control" })] })] }), onSettings && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: onSettings, className: "text-gray-400 hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-4 w-4" }) }))] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(HiveBadge, { variant: isActive ? "active-tag" : "course-tag", className: cn('text-xs', isActive ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'), children: isActive ? 'ACTIVE' : 'INACTIVE' }), isActive && (_jsx(HiveBadge, { variant: "tool-tag", className: "text-xs", children: currentConfig.label }))] }), _jsx("p", { className: "text-sm text-gray-300", children: isActive
                                ? `You're currently ${currentConfig.label.toLowerCase()} on HIVE`
                                : 'You\'re fully visible on HIVE' }), scheduledEnd && isActive && (_jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-yellow-400", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: ["Ends ", scheduledEnd.toLocaleTimeString()] })] }))] }), isActive && (_jsxs("div", { className: "mb-6 p-4 rounded-lg bg-gray-800/50", children: [_jsx("p", { className: "text-sm text-gray-300 mb-3", children: currentConfig.description }), _jsx("div", { className: "space-y-1", children: currentConfig.features.map((feature, index) => (_jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [_jsx("div", { className: "w-1 h-1 rounded-full bg-gray-500" }), _jsx("span", { children: feature })] }, index))) })] })), _jsxs("div", { className: "space-y-3", children: [_jsx(HiveButton, { variant: isActive ? "outline" : "primary", size: "sm", onClick: handleToggle, disabled: loading, className: "w-full", children: loading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Updating..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [isActive ? _jsx(Unlock, { className: "h-4 w-4" }) : _jsx(Lock, { className: "h-4 w-4" }), _jsxs("span", { children: [isActive ? 'Turn Off' : 'Turn On', " Ghost Mode"] })] })) }), isActive && (_jsxs(HiveButton, { variant: "ghost", size: "sm", onClick: () => setShowLevelSelector(!showLevelSelector), className: "w-full text-gray-400 hover:text-[var(--hive-text-primary)]", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Change Privacy Level"] }))] }), _jsx(AnimatePresence, { children: showLevelSelector && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-4 space-y-2 border-t border-[var(--hive-border-default)] pt-4", children: [_jsx("p", { className: "text-xs text-gray-400 mb-3", children: "Choose your privacy level:" }), Object.entries(levelConfig).map(([key, config]) => {
                                const LevelIcon = config.icon;
                                const isSelected = currentLevel === key;
                                return (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => handleLevelChange(key), disabled: loading || isSelected, className: cn('w-full p-3 rounded-lg border text-left transition-colors', isSelected
                                        ? 'bg-[var(--hive-brand-secondary)]/20 border-hive-gold/30 text-[var(--hive-brand-secondary)]'
                                        : 'bg-gray-800/50 border-[var(--hive-border-default)] hover:border-gray-600 text-gray-300'), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(LevelIcon, { className: "h-4 w-4 flex-shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium", children: config.label }), _jsx("p", { className: "text-xs opacity-75 truncate", children: config.description })] }), isSelected && (_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] flex-shrink-0" }))] }) }, key));
                            })] })) }), isActive && currentLevel === 'invisible' && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-red-300 font-medium", children: "Complete Privacy Mode" }), _jsx("p", { className: "text-xs text-red-400/80 mt-1", children: "You're completely hidden from discovery. Space leaders can still see you for moderation purposes." })] })] }) }))] }) }));
};
export default GhostModeCard;
//# sourceMappingURL=ghost-mode-card.js.map