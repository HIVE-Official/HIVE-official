'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Eye, EyeOff, Shield, Lock, Users, Globe, Settings, ChevronRight, AlertTriangle, Check, Clock, MapPin, MessageSquare, Activity, Moon } from 'lucide-react';
const getPrivacyCategoryConfig = (category) => {
    const configs = {
        visibility: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: Eye,
            label: 'Visibility'
        },
        data: {
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            icon: Shield,
            label: 'Data Protection'
        },
        interaction: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: MessageSquare,
            label: 'Interactions'
        },
        location: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: MapPin,
            label: 'Location'
        },
        activity: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Activity,
            label: 'Activity Tracking'
        }
    };
    return configs[category] || configs.visibility;
};
const getVisibilityLevelConfig = (level) => {
    const configs = {
        public: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            icon: Globe,
            label: 'Public Profile'
        },
        friends: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            icon: Users,
            label: 'Friends Only'
        },
        private: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Lock,
            label: 'Private'
        },
        ghost: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: EyeOff,
            label: 'Ghost Mode'
        }
    };
    return configs[level] || configs.private;
};
const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }
    else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
};
export const ProfileGhostModeWidget = ({ user, ghostModeConfig, privacySettings = [], visibilityLevel = 'private', lastPrivacyUpdate, privacyScore = 85, activeSessions = 1, isEditable = true, onToggleGhostMode, onUpdatePrivacySetting, onViewPrivacySettings, onConfigureGhostMode, onViewDataExport, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isGhostModeActive = ghostModeConfig?.isActive || visibilityLevel === 'ghost';
    const visibilityConfig = getVisibilityLevelConfig(visibilityLevel);
    const enabledSettings = privacySettings.filter(setting => setting.isEnabled).length;
    const criticalSettings = privacySettings.filter(setting => setting.category === 'data' && setting.isEnabled).length;
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', isGhostModeActive && 'border-[var(--hive-gold)]/30 bg-[var(--hive-gold)]/5', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "Privacy & Ghost Mode" }), isGhostModeActive && (_jsxs(Badge, { variant: "secondary", className: "text-xs text-[var(--hive-gold)]", children: [_jsx(EyeOff, { className: "h-3 w-3 mr-1" }), "Ghost Active"] }))] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewPrivacySettings, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Shield, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-sm", weight: "medium", color: "primary", children: [privacyScore, "%"] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Privacy Score" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Check, { className: "h-3 w-3 text-green-500" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: enabledSettings })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Settings Active" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Activity, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: activeSessions })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Active Sessions" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Current Status:" }), _jsx("div", { className: cn('p-3 rounded-lg border', visibilityConfig.bgColor, 'border-[var(--hive-border-primary)]'), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(visibilityConfig.icon, { className: cn('h-4 w-4', visibilityConfig.color) }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: visibilityConfig.label })] }), lastPrivacyUpdate && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Updated ", formatTimeAgo(lastPrivacyUpdate)] }))] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Ghost Mode:" }), isEditable && onToggleGhostMode && (_jsx(Button, { variant: isGhostModeActive ? "primary" : "secondary", size: "sm", onClick: () => onToggleGhostMode(!isGhostModeActive), className: cn(isGhostModeActive && 'bg-[var(--hive-gold)] hover:bg-[var(--hive-gold-dark)] text-[var(--hive-text-inverse)]'), children: isGhostModeActive ? (_jsxs(_Fragment, { children: [_jsx(EyeOff, { className: "h-3 w-3 mr-1" }), "Disable"] })) : (_jsxs(_Fragment, { children: [_jsx(Moon, { className: "h-3 w-3 mr-1" }), "Enable"] })) }))] }), isGhostModeActive && ghostModeConfig && (_jsxs("div", { className: "p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", children: "Ghost Mode Active" }), _jsx(Badge, { variant: "secondary", className: "text-xs text-[var(--hive-gold)]", children: ghostModeConfig.visibilityLevel })] }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Your profile is ", ghostModeConfig.visibilityLevel === 'invisible' ? 'completely hidden' :
                                                ghostModeConfig.visibilityLevel === 'minimal' ? 'minimally visible' : 'selectively visible', "to other UB students"] }), ghostModeConfig.duration === 'scheduled' && ghostModeConfig.scheduledEnd && (_jsxs("div", { className: "flex items-center gap-1 mt-2", children: [_jsx(Clock, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Ends: ", new Date(ghostModeConfig.scheduledEnd).toLocaleDateString()] })] })), isEditable && onConfigureGhostMode && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onConfigureGhostMode, className: "mt-2 text-[var(--hive-gold)] hover:text-[var(--hive-gold-dark)]", children: ["Configure Settings", _jsx(ChevronRight, { className: "h-3 w-3 ml-1" })] }))] }))] }), privacySettings.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Privacy Controls:" }), privacySettings.length > 3 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", privacySettings.length - 3, " more"] }))] }), _jsx("div", { className: "space-y-1", children: privacySettings.slice(0, 3).map((setting) => {
                                    const config = getPrivacyCategoryConfig(setting.category);
                                    return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer", onClick: () => isEditable && onUpdatePrivacySetting?.(setting.id, !setting.isEnabled), children: [_jsx(config.icon, { className: cn('h-3 w-3', config.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: setting.name }), _jsx("div", { className: cn('w-2 h-2 rounded-full', setting.isEnabled ? 'bg-green-500' : 'bg-[var(--hive-text-muted)]') }), isEditable && (_jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }))] }, setting.id));
                                }) })] })), criticalSettings > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Privacy Insights:" }), _jsxs("div", { className: "p-3 bg-green-500/10 border border-green-500/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4 text-green-500" }), _jsxs(Text, { variant: "body-sm", color: "primary", children: [criticalSettings, " data protection settings active"] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: "Your personal data is well-protected according to UB privacy standards" })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onViewPrivacySettings && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onViewPrivacySettings, className: "flex-1", children: [_jsx(Shield, { className: "h-3 w-3 mr-1" }), "Privacy Settings"] })), isEditable && onConfigureGhostMode && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onConfigureGhostMode, className: "flex-1", children: [_jsx(EyeOff, { className: "h-3 w-3 mr-1" }), "Ghost Config"] })), onViewDataExport && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewDataExport, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }), privacyScore < 50 && (_jsxs("div", { className: "p-3 bg-red-500/10 border border-red-500/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-500" }), _jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Privacy Score Low" })] }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: "Consider enabling more privacy settings to protect your UB campus activity" }), isEditable && onViewPrivacySettings && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewPrivacySettings, className: "mt-2 text-red-500 hover:text-red-600", children: ["Review Settings", _jsx(ChevronRight, { className: "h-3 w-3 ml-1" })] }))] }))] }), isHovered && (_jsx("div", { className: cn('absolute inset-0 -z-10 rounded-lg blur-xl', isGhostModeActive
                    ? 'bg-gradient-to-r from-[var(--hive-gold)]/5 to-indigo-500/5'
                    : 'bg-gradient-to-r from-blue-500/5 to-green-500/5') }))] }));
};
//# sourceMappingURL=profile-ghost-mode-widget.js.map