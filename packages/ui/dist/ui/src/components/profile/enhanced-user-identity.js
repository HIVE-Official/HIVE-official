import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Enhanced User Identity - Campus Command Center Identity
 * Brand-consistent user identity with HIVE's gold/black design system
 * Built for University at Buffalo students with social utility focus
 */
import * as React from 'react';
import { cn } from '../../lib/utils';
// Use existing HIVE components that we know work
import { HiveBadge } from '../hive-badge';
// Use simple layout system to avoid import issues
import { SimpleProfileIdentity, SimpleProfileContent } from './simple-layout-system';
export const EnhancedUserIdentity = React.forwardRef(({ name, handle, avatar, bio, major, graduationYear, dorm, status = 'online', role = 'student', verified = false, isBuilder = false, completionPercentage, showCompletionPrompt = false, size = 'base', layout = 'horizontal', showHandle = true, showBio = true, showCampusInfo = true, onEditProfile, className }, ref) => {
    const sizeClasses = {
        small: {
            avatar: 'w-10 h-10',
            name: 'text-base font-semibold',
            handle: 'text-sm',
            bio: 'text-sm',
            campus: 'text-xs'
        },
        base: {
            avatar: 'w-12 h-12',
            name: 'text-lg font-semibold',
            handle: 'text-base',
            bio: 'text-base',
            campus: 'text-sm'
        },
        large: {
            avatar: 'w-16 h-16',
            name: 'text-xl font-bold',
            handle: 'text-lg',
            bio: 'text-lg',
            campus: 'text-base'
        }
    };
    const statusColors = {
        online: 'bg-green-500',
        away: 'bg-yellow-500',
        offline: 'bg-gray-400',
        studying: 'bg-blue-500'
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    const layoutClasses = layout === 'vertical'
        ? 'flex flex-col items-center text-center gap-3'
        : 'flex items-start gap-4';
    return (_jsx("div", { ref: ref, className: cn('p-4 sm:p-6 rounded-xl bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-subtle)] shadow-lg backdrop-blur-sm overflow-hidden', className), children: _jsx(SimpleProfileIdentity, { layout: layout, avatar: _jsxs("div", { className: "relative", children: [avatar ? (_jsx("img", { src: avatar, alt: name, className: cn('rounded-full object-cover', sizeClasses[size].avatar) })) : (_jsx("div", { className: cn('rounded-full bg-gradient-to-br from-[var(--hive-gold-primary)] to-[var(--hive-bg-tertiary)]', 'flex items-center justify-center text-[var(--hive-text-primary)] font-bold shadow-lg border-2 border-[var(--hive-gold-border)]', sizeClasses[size].avatar, size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'), children: getInitials(name) })), _jsx("div", { className: cn('absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--hive-bg-secondary)] shadow-lg', status === 'online' ? 'bg-[var(--hive-success-primary)]' :
                            status === 'away' ? 'bg-[var(--hive-warning-primary)]' :
                                status === 'offline' ? 'bg-[var(--hive-text-muted)]' :
                                    status === 'studying' ? 'bg-[var(--hive-gold-primary)]' : 'bg-[var(--hive-text-muted)]') })] }), info: _jsxs(SimpleProfileContent, { children: [_jsxs("div", { className: cn('flex items-center gap-2 flex-wrap mb-2', layout === 'vertical' ? 'justify-center' : ''), children: [_jsx("h3", { className: cn('text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)] break-words', sizeClasses[size].name), children: name }), verified && (_jsx(HiveBadge, { variant: "default", className: "text-xs bg-[var(--hive-gold-background)] text-[var(--hive-gold-primary)] border-[var(--hive-gold-border)]", children: "\u2713 Verified" })), isBuilder && (_jsx(HiveBadge, { variant: "secondary", className: "text-xs bg-[var(--hive-success-background)] text-[var(--hive-success-primary)] border-[var(--hive-success-border)]", children: "\u26A1 Builder" })), role === 'leader' && (_jsx(HiveBadge, { variant: "destructive", className: "text-xs bg-[var(--hive-warning-background)] text-[var(--hive-warning-primary)] border-[var(--hive-warning-border)]", children: "\uD83D\uDC51 Leader" }))] }), showHandle && handle && (_jsxs("p", { className: cn('text-[var(--hive-gold-primary)] mb-1 font-[var(--hive-font-family-primary)] break-words', sizeClasses[size].handle, layout === 'vertical' ? 'text-center' : ''), children: ["@", handle] })), showCampusInfo && (major || graduationYear || dorm) && (_jsxs("div", { className: cn('text-[var(--hive-text-secondary)] mb-3 font-[var(--hive-font-family-primary)]', sizeClasses[size].campus, layout === 'vertical' ? 'text-center' : ''), children: [_jsxs("div", { className: cn('flex flex-wrap gap-3 items-center', layout === 'vertical' ? 'justify-center' : ''), children: [major && _jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-[var(--hive-gold-primary)]", children: "\uD83C\uDF93" }), major] }), graduationYear && _jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-[var(--hive-gold-primary)]", children: "\uD83D\uDCC5" }), "Class of ", graduationYear] })] }), dorm && _jsxs("div", { className: "mt-2 flex items-center gap-1 justify-center", children: [_jsx("span", { className: "text-[var(--hive-gold-primary)]", children: "\uD83C\uDFE0" }), dorm] })] })), showBio && bio && (_jsx("p", { className: cn('text-[var(--hive-text-primary)] mb-4 font-[var(--hive-font-family-primary)] leading-relaxed break-words overflow-hidden', sizeClasses[size].bio, layout === 'vertical' ? 'text-center' : ''), children: bio })), showCompletionPrompt && completionPercentage && completionPercentage < 100 && (_jsxs("div", { className: "p-4 bg-[var(--hive-warning-background)] rounded-lg border border-[var(--hive-warning-border)] backdrop-blur-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-gold-primary)]", children: "\u26A1" }), _jsxs("span", { className: "text-sm font-semibold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]", children: [completionPercentage, "% Complete"] })] }), _jsx("button", { onClick: onEditProfile, className: "text-sm text-[var(--hive-gold-primary)] hover:text-[var(--hive-gold-hover)] font-semibold font-[var(--hive-font-family-primary)] transition-colors", children: "Complete \u2192" })] }), _jsx("div", { className: "w-full bg-[var(--hive-bg-primary)] rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-gold-primary)] h-2 rounded-full transition-all duration-500", style: { width: `${completionPercentage}%` } }) }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)] mt-2 font-[var(--hive-font-family-primary)]", children: "Unlock campus recommendations & discovery" })] }))] }) }) }));
});
EnhancedUserIdentity.displayName = 'EnhancedUserIdentity';
//# sourceMappingURL=enhanced-user-identity.js.map