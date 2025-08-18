'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Avatar } from '../atoms/avatar';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { User, UserPlus, UserCheck, MessageCircle, Mail, MoreHorizontal, GraduationCap, Home, Users, MapPin, Calendar, Link } from 'lucide-react';
const roleData = {
    student: { color: 'text-[var(--hive-status-info)]', label: 'Student' },
    builder: { color: 'text-[var(--hive-brand-secondary)]', label: 'Builder' },
    leader: { color: 'text-[var(--hive-brand-secondary)]', label: 'Leader' },
    verified: { color: 'text-[var(--hive-status-success)]', label: 'Verified' }
};
const affiliationIcons = {
    university: { icon: GraduationCap, color: 'text-[var(--hive-status-info)]', label: 'University' },
    residential: { icon: Home, color: 'text-[var(--hive-text-secondary)]', label: 'Residential' },
    greek: { icon: Users, color: 'text-[var(--hive-brand-secondary)]', label: 'Greek Life' }
};
const relationshipStates = {
    none: { label: 'Follow', icon: UserPlus, variant: 'secondary' },
    following: { label: 'Following', icon: UserCheck, variant: 'accent' },
    followed: { label: 'Follow Back', icon: UserPlus, variant: 'secondary' },
    mutual: { label: 'Following', icon: UserCheck, variant: 'accent' },
    blocked: { label: 'Blocked', icon: User, variant: 'ghost' }
};
export const UserCard = ({ user, variant = 'default', relationship = 'none', onFollow, onMessage, onEmail, onViewProfile, onMenu, showActions = true, showStats = true, showBio = true, showDetails = true, interactive = true, className, ...props }) => {
    const userRoleData = user.role ? roleData[user.role] : null;
    const affiliationInfo = user.affiliation ? affiliationIcons[user.affiliation] : null;
    const relationshipInfo = relationshipStates[relationship];
    const handleCardClick = (e) => {
        if (interactive && onViewProfile && !e.defaultPrevented) {
            onViewProfile(user.id);
        }
    };
    const handleActionClick = (e, action) => {
        e.preventDefault();
        e.stopPropagation();
        action();
    };
    const formatNumber = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };
    // Minimal variant
    if (variant === 'minimal') {
        return (_jsxs("div", { className: cn('flex items-center space-x-4 p-4', 'bg-[var(--hive-background-secondary)]', 'border border-[var(--hive-border-default)]', 'rounded-2xl shadow-level2', interactive && [
                'cursor-pointer',
                'hover:bg-[var(--hive-background-tertiary)]',
                'hover:border-[var(--hive-border-secondary)]',
                'hover:shadow-level3',
                'transition-all duration-200 ease-out'
            ].filter(Boolean).join(' '), className), onClick: handleCardClick, ...props, children: [_jsx(Avatar, { src: user.avatar, initials: user.name.split(' ').map(n => n[0]).join(''), size: "md" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-1", children: user.name }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-1", children: ["@", user.handle] }), userRoleData && (_jsx("div", { className: cn('text-xs font-medium', userRoleData.color), children: userRoleData.label }))] }), showActions && relationship !== 'blocked' && (_jsx(Button, { size: "sm", variant: relationshipInfo.variant, onClick: (e) => handleActionClick(e, () => onFollow?.(user.id)), children: _jsx(relationshipInfo.icon, { className: "h-4 w-4" }) }))] }));
    }
    // Compact variant
    if (variant === 'compact') {
        return (_jsxs("div", { className: cn('p-4', 'bg-[var(--hive-background-secondary)]', 'border border-[var(--hive-border-default)]', 'rounded-2xl shadow-level2', interactive && [
                'cursor-pointer',
                'hover:bg-[var(--hive-background-tertiary)]',
                'hover:border-[var(--hive-border-secondary)]',
                'hover:shadow-level3',
                'transition-all duration-200 ease-out'
            ].filter(Boolean).join(' '), className), onClick: handleCardClick, ...props, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { src: user.avatar, initials: user.name.split(' ').map(n => n[0]).join(''), size: "lg" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-base font-bold text-[var(--hive-text-primary)] mb-1", children: user.name }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-1", children: ["@", user.handle] }), userRoleData && (_jsx("div", { className: cn('text-xs font-medium', userRoleData.color), children: userRoleData.label }))] })] }), showActions && (_jsxs("div", { className: "flex items-center space-x-2", children: [relationship !== 'blocked' && (_jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => handleActionClick(e, () => onMessage?.(user.id)), children: _jsx(MessageCircle, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: relationshipInfo.variant, onClick: (e) => handleActionClick(e, () => onFollow?.(user.id)), children: _jsx(relationshipInfo.icon, { className: "h-4 w-4" }) })] })), _jsx(Button, { size: "sm", variant: "ghost", onClick: (e) => handleActionClick(e, () => onMenu?.(user.id)), children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }))] }), showBio && user.bio && (_jsx("div", { className: "mb-4 pt-3 border-t border-[var(--hive-border-default)]", children: _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed line-clamp-2", children: user.bio }) })), showStats && (_jsxs("div", { className: "flex items-center space-x-6 text-sm pt-3 border-t border-[var(--hive-border-default)]", children: [user.followers !== undefined && (_jsxs("div", { children: [_jsx("span", { className: "font-bold text-[var(--hive-text-primary)]", children: formatNumber(user.followers) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] ml-1", children: "followers" })] })), user.following !== undefined && (_jsxs("div", { children: [_jsx("span", { className: "font-bold text-[var(--hive-text-primary)]", children: formatNumber(user.following) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] ml-1", children: "following" })] })), user.spaces !== undefined && (_jsxs("div", { children: [_jsx("span", { className: "font-bold text-[var(--hive-text-primary)]", children: formatNumber(user.spaces) }), _jsx("span", { className: "text-[var(--hive-text-secondary)] ml-1", children: "spaces" })] }))] }))] }));
    }
    // Default and detailed variants
    return (_jsxs("div", { className: cn('p-4', 'bg-[var(--hive-background-secondary)]', 'border border-[var(--hive-border-default)]', 'rounded-2xl shadow-level3', interactive && [
            'cursor-pointer',
            'hover:bg-[var(--hive-background-tertiary)]',
            'hover:border-[var(--hive-border-secondary)]',
            'hover:shadow-level4',
            'transition-all duration-200 ease-out'
        ].filter(Boolean).join(' '), className), onClick: handleCardClick, ...props, children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { src: user.avatar, initials: user.name.split(' ').map(n => n[0]).join(''), size: "xl", interactive: true }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)] mb-1", children: user.name }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] mb-1", children: ["@", user.handle] }), userRoleData && (_jsx("div", { className: cn('text-sm font-medium', userRoleData.color), children: userRoleData.label }))] })] }), showActions && (_jsxs("div", { className: "flex items-center space-x-2", children: [relationship !== 'blocked' && (_jsxs(_Fragment, { children: [_jsx(Button, { size: "md", variant: "ghost", onClick: (e) => handleActionClick(e, () => onMessage?.(user.id)), children: _jsx(MessageCircle, { className: "h-4 w-4" }) }), _jsx(Button, { size: "md", variant: "ghost", onClick: (e) => handleActionClick(e, () => onEmail?.(user.id)), children: _jsx(Mail, { className: "h-4 w-4" }) }), _jsx(Button, { size: "md", variant: relationshipInfo.variant, onClick: (e) => handleActionClick(e, () => onFollow?.(user.id)), children: _jsx(relationshipInfo.icon, { className: "h-4 w-4" }) })] })), _jsx(Button, { size: "md", variant: "ghost", onClick: (e) => handleActionClick(e, () => onMenu?.(user.id)), children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }))] }), showBio && user.bio && (_jsx("div", { className: "mb-4 pt-3 border-t border-[var(--hive-border-default)]", children: _jsx("p", { className: "text-[var(--hive-text-secondary)] leading-relaxed text-sm", children: user.bio }) })), showDetails && variant === 'detailed' && (_jsxs("div", { className: "mb-4 space-y-2", children: [user.university && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(GraduationCap, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: [user.university, user.major && ` • ${user.major}`, user.graduationYear && ` • Class of ${user.graduationYear}`] })] })), user.location && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: user.location })] })), user.joinedDate && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Joined ", user.joinedDate] })] })), user.website && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Link, { className: "h-4 w-4 text-[var(--hive-text-tertiary)]" }), _jsx("a", { href: user.website, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-[var(--hive-brand-secondary)] hover:underline", onClick: (e) => e.stopPropagation(), children: user.website.replace(/^https?:\/\//, '') })] }))] })), showStats && (_jsxs("div", { className: "flex items-center justify-start space-x-6 pt-3 border-t border-[var(--hive-border-default)]", children: [user.followers !== undefined && (_jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg text-[var(--hive-text-primary)]", children: formatNumber(user.followers) }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: "followers" })] })), user.following !== undefined && (_jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg text-[var(--hive-text-primary)]", children: formatNumber(user.following) }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: "following" })] })), user.spaces !== undefined && (_jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg text-[var(--hive-text-primary)]", children: formatNumber(user.spaces) }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: "spaces" })] })), user.tools !== undefined && (_jsxs("div", { children: [_jsx("div", { className: "font-bold text-lg text-[var(--hive-text-primary)]", children: formatNumber(user.tools) }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: "tools" })] }))] }))] }));
};
//# sourceMappingURL=user-card.js.map