import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Enhanced Profile Header - Campus Command Center Header
 * Integrates user identity with campus-specific profile actions
 *
 * Built using existing HIVE components for guaranteed compatibility
 */
import React from 'react';
import { cn } from '../../lib/utils.js';
// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition.js';
import { iconComposition, Settings, Share2, UserPlus, MessageCircle, MapPin, GraduationCap, Users, Hammer, Activity, Eye, EyeOff, Zap, Star } from '../../atomic/foundations/icon-composition.js';
import { motionComposition } from '../../atomic/foundations/motion-composition.js';
const CompletionPrompt = React.forwardRef(({ percentage, onComplete, className }, ref) => {
    if (percentage >= 90)
        return null; // Hide if mostly complete
    const remainingSteps = Math.ceil((100 - percentage) / 20); // Assume ~20% per major step
    return (_jsx("div", { ref: ref, className: cn('p-4 rounded-lg', 'bg-[var(--hive-warning-background)]', 'border border-[var(--hive-warning-border)]', 'border-l-4 border-l-[var(--hive-warning-primary)]', className), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Star, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-warning-primary)]') }), _jsx("h4", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold', `text-[${typographyComposition.scale.base.size}]`, 'text-[var(--hive-text-primary)]'), children: "Complete Your Profile" })] }), _jsxs("p", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-[var(--hive-text-secondary)]', 'mb-3'), children: ["Add ", remainingSteps, " more details to unlock campus recommendations and better space discovery."] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex-1 bg-[var(--hive-bg-subtle)] rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-warning-primary)] h-2 rounded-full transition-all duration-300", style: { width: `${percentage}%` } }) }), _jsxs("span", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-warning-primary)]', 'text-sm'), children: [percentage, "%"] })] })] }), _jsx("button", { onClick: onComplete, className: cn('ml-4 px-3 py-1.5 rounded-md', 'bg-[var(--hive-warning-primary)]', 'text-[var(--hive-bg-primary)]', 'font-[var(--hive-font-family-primary)]', 'font-medium', 'text-sm', 'hover:opacity-90', `transition-opacity duration-[${motionComposition.durations.fast.ms}]`), children: "Complete" })] }) }));
});
CompletionPrompt.displayName = 'CompletionPrompt';
const CampusInfo = React.forwardRef(({ major, graduationYear, dorm, className }, ref) => {
    const campusDetails = [
        major && { icon: GraduationCap, label: `${major} ${graduationYear ? `'${graduationYear.toString().slice(-2)}` : ''}` },
        dorm && { icon: MapPin, label: dorm }
    ].filter(Boolean);
    if (campusDetails.length === 0)
        return null;
    return (_jsx("div", { ref: ref, className: cn('flex flex-wrap items-center gap-4', className), children: campusDetails.map((detail, index) => {
            const IconComponent = detail.icon;
            return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-text-muted)]') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-[var(--hive-text-secondary)]'), children: detail.label })] }, index));
        }) }));
});
CampusInfo.displayName = 'CampusInfo';
const ProfileStats = React.forwardRef(({ stats, onStatsClick, className }, ref) => {
    const statItems = [
        { key: 'spaces', label: 'Spaces', value: stats.spacesCount, icon: Users },
        { key: 'tools', label: 'Tools', value: stats.toolsCount, icon: Hammer },
        { key: 'connections', label: 'Connections', value: stats.connectionsCount, icon: Activity },
        { key: 'reputation', label: 'Reputation', value: `${stats.reputation}/5`, icon: Star }
    ];
    return (_jsx("div", { ref: ref, className: cn('grid grid-cols-4 gap-1', className), children: statItems.map(item => {
            const IconComponent = item.icon;
            return (_jsxs("button", { onClick: () => onStatsClick?.(item.key), className: cn('flex flex-col items-center p-3 rounded-lg', 'hover:bg-[var(--hive-bg-subtle)]', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: [_jsx(IconComponent, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-text-secondary)]', 'mb-1') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold', `text-[${typographyComposition.scale.base.size}]`, 'text-[var(--hive-text-primary)]'), children: typeof item.value === 'number' ? item.value.toLocaleString() : item.value }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.caption.size}]`, 'text-[var(--hive-text-muted)]'), children: item.label })] }, item.key));
        }) }));
});
ProfileStats.displayName = 'ProfileStats';
// === MAIN COMPONENT ===
export const EnhancedProfileHeader = React.forwardRef(({ user, stats, viewerContext = { isOwnProfile: true }, showCampusInfo = true, showSocialActions = true, showCompletionPrompt = true, onEditProfile, onShareProfile, onConnect, onMessage, onToggleGhostMode, onStatsClick, className }, ref) => {
    const [ghostMode, setGhostMode] = useState(user.ghostMode || false);
    // Social actions based on viewer context
    const socialActions = [];
    if (viewerContext.isOwnProfile) {
        socialActions.push({ type: 'like', count: stats?.reputation || 0, isActive: false, label: 'Rating' }, { type: 'share', count: 0, isActive: false, label: 'Share' });
    }
    else {
        if (viewerContext.canConnect && !viewerContext.isConnected) {
            socialActions.push({ type: 'like', count: 0, isActive: false, label: 'Connect' });
        }
        socialActions.push({ type: 'comment', count: 0, isActive: false, label: 'Message' }, { type: 'share', count: 0, isActive: false, label: 'Share' });
    }
    // Profile actions for card menu
    const menuActions = viewerContext.isOwnProfile ? [
        { id: 'edit', label: 'Edit Profile', icon: Settings },
        { id: 'ghost-mode', label: ghostMode ? 'Disable Ghost Mode' : 'Enable Ghost Mode', icon: ghostMode ? Eye : EyeOff },
        { id: 'share', label: 'Share Profile', icon: Share2 }
    ] : [
        { id: 'connect', label: 'Connect', icon: UserPlus },
        { id: 'message', label: 'Message', icon: MessageCircle },
        { id: 'share', label: 'Share Profile', icon: Share2 }
    ];
    const handleSocialAction = (actionType) => {
        switch (actionType) {
            case 'like':
                if (viewerContext.isOwnProfile) {
                    onStatsClick?.('reputation');
                }
                else {
                    onConnect?.();
                }
                break;
            case 'comment':
                onMessage?.();
                break;
            case 'share':
                onShareProfile?.();
                break;
        }
    };
    const handleMenuAction = (actionId) => {
        switch (actionId) {
            case 'edit':
                onEditProfile?.();
                break;
            case 'ghost-mode':
                const newGhostMode = !ghostMode;
                setGhostMode(newGhostMode);
                onToggleGhostMode?.(newGhostMode);
                break;
            case 'share':
                onShareProfile?.();
                break;
            case 'connect':
                onConnect?.();
                break;
            case 'message':
                onMessage?.();
                break;
        }
    };
    return (_jsxs("div", { ref: ref, className: cn('space-y-6', className), children: [showCompletionPrompt && viewerContext.isOwnProfile && user.completionPercentage && (_jsx(CompletionPrompt, { percentage: user.completionPercentage, onComplete: () => onEditProfile?.() })), _jsx(ComprehensiveCard, { variant: "glass", campus: "profile", size: "comfortable", menuActions: menuActions, onActionClick: handleMenuAction, campusOptimized: true, children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [_jsx(UserIdentity, { name: user.fullName, handle: user.handle, avatar: user.avatar, status: ghostMode ? 'offline' : user.status, role: user.role, verified: user.verified, size: "large", layout: "horizontal", interactive: "social", showHandle: !!user.handle, showStatus: !ghostMode, showRole: user.role !== 'student' }), user.isBuilder && (_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--hive-gold-background)] border border-[var(--hive-gold-border)]", children: [_jsx(Zap, { className: cn(iconComposition.sizes.small.className, 'text-[var(--hive-gold-primary)]') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-gold-primary)]', 'text-sm'), children: "Builder" })] }))] }), user.bio && (_jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.base.size}]`, 'text-[var(--hive-text-secondary)]', 'leading-relaxed'), children: user.bio })), showCampusInfo && (_jsx(CampusInfo, { major: user.major, graduationYear: user.graduationYear, dorm: user.dorm })), stats && (_jsx(ProfileStats, { stats: stats, onStatsClick: onStatsClick })), showSocialActions && socialActions.length > 0 && (_jsx("div", { className: "pt-4 border-t border-[var(--hive-border-subtle)]", children: _jsx(SocialInteraction, { actions: socialActions, size: "base", layout: "horizontal", variant: "ghost", onAction: handleSocialAction }) }))] }) })] }));
});
EnhancedProfileHeader.displayName = 'EnhancedProfileHeader';
//# sourceMappingURL=enhanced-profile-header.js.map