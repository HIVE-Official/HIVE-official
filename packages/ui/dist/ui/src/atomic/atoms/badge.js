'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
export const badgeVariants = {
    // === CORE SYSTEM VARIANTS ===
    // GOLD OUTLINE ONLY (never fill) - Primary brand badge
    primary: 'bg-transparent text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]',
    // Secondary with semantic tokens
    secondary: 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border-[var(--hive-border-default)]',
    // Status badges with semantic tokens
    success: 'bg-[color-mix(in_srgb,var(--hive-status-success)_10%,transparent)] text-[var(--hive-status-success)] border-[var(--hive-status-success)]',
    warning: 'bg-[color-mix(in_srgb,var(--hive-status-warning)_10%,transparent)] text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]',
    error: 'bg-[color-mix(in_srgb,var(--hive-status-error)_10%,transparent)] text-[var(--hive-status-error)] border-[var(--hive-status-error)]',
    info: 'bg-[color-mix(in_srgb,var(--hive-status-info)_10%,transparent)] text-[var(--hive-status-info)] border-[var(--hive-status-info)]',
    ghost: 'bg-transparent text-[var(--hive-text-tertiary)] border-[var(--hive-border-subtle)]',
    // === HIVE RECOGNITION VARIANTS ===
    // Builder - Gold filled for platform builders
    builder: 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] border-[var(--hive-brand-secondary)] font-semibold',
    // Verified - Blue for verified accounts
    verified: 'bg-[color-mix(in_srgb,var(--hive-status-info)_15%,transparent)] text-[var(--hive-status-info)] border-[var(--hive-status-info)]',
    // Leader - Purple for community leaders
    leader: 'bg-[color-mix(in_srgb,#8B5CF6_15%,transparent)] text-[#8B5CF6] border-[#8B5CF6]',
    // Ghost Mode - Muted for privacy mode
    'ghost-mode': 'bg-[color-mix(in_srgb,var(--hive-text-tertiary)_10%,transparent)] text-[var(--hive-text-tertiary)] border-[var(--hive-text-tertiary)]',
    // === ACHIEVEMENT VARIANTS ===  
    // Achievement - Green for accomplishments
    achievement: 'bg-[color-mix(in_srgb,var(--hive-status-success)_15%,transparent)] text-[var(--hive-status-success)] border-[var(--hive-status-success)]',
    // Streak - Orange for streak achievements
    streak: 'bg-[color-mix(in_srgb,#F97316_15%,transparent)] text-[#F97316] border-[#F97316]',
    // Scholar - Gold outline for academic achievements
    scholar: 'bg-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)] text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]',
    // Connector - Teal for social achievements
    connector: 'bg-[color-mix(in_srgb,#14B8A6_15%,transparent)] text-[#14B8A6] border-[#14B8A6]',
    // === CUSTOM ROLE VARIANTS ===
    // Dean's List - Premium gold
    dean: 'bg-[color-mix(in_srgb,var(--hive-gold)_20%,transparent)] text-[#B8860B] border-[var(--hive-gold)]',
    // Developer - Tech blue 
    developer: 'bg-[color-mix(in_srgb,#3B82F6_15%,transparent)] text-[#3B82F6] border-[#3B82F6]',
    // Event Organizer - Pink for event organizers
    organizer: 'bg-[color-mix(in_srgb,#EC4899_15%,transparent)] text-[#EC4899] border-[#EC4899]',
    // Community Helper - Warm orange
    helper: 'bg-[color-mix(in_srgb,#F59E0B_15%,transparent)] text-[#F59E0B] border-[#F59E0B]'
};
const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-medium'
};
const dotSizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5'
};
export const Badge = ({ variant = 'secondary', size = 'md', dot = false, count, maxCount = 99, icon, children, className, ...props }) => {
    const baseClasses = [
        'inline-flex items-center gap-1.5',
        'rounded-full',
        'border',
        'transition-colors duration-200 ease-out',
        badgeVariants[variant],
        !dot && badgeSizes[size]
    ].filter(Boolean).join(' ');
    // Dot variant
    if (dot) {
        return (_jsxs("span", { className: cn('inline-flex items-center gap-2', className), ...props, children: [_jsx("span", { className: cn('rounded-full flex-shrink-0', badgeVariants[variant], dotSizes[size]) }), children && (_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: children }))] }));
    }
    // Count variant
    if (typeof count === 'number') {
        const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
        return (_jsx("span", { className: cn(baseClasses, className), ...props, children: displayCount }));
    }
    // Default variant
    return (_jsxs("span", { className: cn(baseClasses, className), ...props, children: [icon && (_jsx("span", { className: "flex items-center justify-center", children: icon })), children] }));
};
// HIVE Recognition Badge Presets
export const RecognitionBadges = {
    // Platform Recognition
    Builder: ({ children = "Builder", ...props }) => (_jsx(Badge, { variant: "builder", icon: _jsx(CrownIcon, {}), ...props, children: children })),
    Verified: ({ children = "Verified", ...props }) => (_jsx(Badge, { variant: "verified", icon: _jsx(CheckCircleIcon, {}), ...props, children: children })),
    Leader: ({ children = "Leader", ...props }) => (_jsx(Badge, { variant: "leader", icon: _jsx(StarIcon, {}), ...props, children: children })),
    GhostMode: ({ children = "Ghost Mode", ...props }) => (_jsx(Badge, { variant: "ghost-mode", icon: _jsx(EyeOffIcon, {}), ...props, children: children })),
    // Achievement Recognition  
    Achievement: ({ children, count, ...props }) => (_jsx(Badge, { variant: "achievement", icon: _jsx(TrophyIcon, {}), count: count, ...props, children: children || `${count || 12} achievements` })),
    Streak: ({ children, count = 7, ...props }) => (_jsx(Badge, { variant: "streak", icon: _jsx(FlameIcon, {}), ...props, children: children || `${count} day streak` })),
    Scholar: ({ children = "Scholar", ...props }) => (_jsx(Badge, { variant: "scholar", icon: _jsx(BookIcon, {}), ...props, children: children })),
    Connector: ({ children = "Connector", ...props }) => (_jsx(Badge, { variant: "connector", icon: _jsx(UsersIcon, {}), ...props, children: children })),
    // Custom Role Recognition
    DeansListing: ({ children = "Dean's List", ...props }) => (_jsx(Badge, { variant: "dean", icon: _jsx(GraduationCapIcon, {}), ...props, children: children })),
    Developer: ({ children = "Developer", ...props }) => (_jsx(Badge, { variant: "developer", icon: _jsx(CodeIcon, {}), ...props, children: children })),
    EventOrganizer: ({ children = "Event Organizer", ...props }) => (_jsx(Badge, { variant: "organizer", icon: _jsx(CalendarIcon, {}), ...props, children: children })),
    CommunityHelper: ({ children = "Community Helper", ...props }) => (_jsx(Badge, { variant: "helper", icon: _jsx(HeartIcon, {}), ...props, children: children })),
};
// Simple icon components using consistent sizing
const CrownIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "m2 20 3-3.5L8.5 20l3.5-4L16 20l3-3.5L22 20H2ZM7 4l2.5 5L12 4l2.5 5L17 4" }) }));
const CheckCircleIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), _jsx("polyline", { points: "22,4 12,14.01 9,11.01" })] }));
const StarIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("polygon", { points: "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" }) }));
const EyeOffIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }), _jsx("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68" }), _jsx("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" }), _jsx("path", { d: "M2 2l20 20" })] }));
const TrophyIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55.47.98.97 1.21C11.25 18.48 11.61 18.9 12 19.34c.39-.44.75-.86 1.03-1.13.5-.23.97-.66.97-1.21v-2.34" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" })] }));
const FlameIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }) }));
const BookIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }) }));
const UsersIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] }));
const GraduationCapIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" }), _jsx("path", { d: "M22 10v6" }), _jsx("path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" })] }));
const CodeIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("polyline", { points: "16,18 22,12 16,6" }), _jsx("polyline", { points: "8,6 2,12 8,18" })] }));
const CalendarIcon = () => (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), _jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), _jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), _jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }));
const HeartIcon = () => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }) }));
//# sourceMappingURL=badge.js.map