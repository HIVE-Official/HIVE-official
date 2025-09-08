'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Badge } from '../atoms/badge.js';
import { Button } from '../atoms/button-enhanced.js';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/avatar.js';
const ResourceSharingCard = React.forwardRef(({ resource, compact = false, showOwnerInfo = true, onContact, onFavorite, onShare, onReport, currentUserId, className, ...props }, ref) => {
    const isOwner = currentUserId === resource.owner.id;
    const isAvailable = resource.availability === 'available';
    const isFree = resource.price === null || resource.price === 0;
    const daysAgo = Math.floor((Date.now() - resource.postedDate.getTime()) / (1000 * 60 * 60 * 24));
    const getTypeIcon = (type) => {
        const icons = {
            textbook: '📚',
            notes: '📝',
            'study-guide': '📖',
            assignment: '📋',
            lab: '🔬',
            project: '💻',
            other: '📄'
        };
        return icons[type] || icons.other;
    };
    const getConditionColor = (condition) => {
        switch (condition) {
            case 'new':
            case 'like-new':
                return 'text-[var(--hive-status-success)]';
            case 'good':
                return 'text-[var(--hive-brand-primary)]';
            case 'fair':
                return 'text-[var(--hive-status-warning)]';
            case 'poor':
                return 'text-[var(--hive-status-error)]';
            default:
                return 'text-[var(--hive-text-secondary)]';
        }
    };
    const getAvailabilityBadge = () => {
        switch (resource.availability) {
            case 'available':
                return _jsx(Badge, { variant: "success", size: "sm", children: "Available" });
            case 'reserved':
                return _jsx(Badge, { variant: "warning", size: "sm", children: "Reserved" });
            case 'unavailable':
                return _jsx(Badge, { variant: "error", size: "sm", children: "Unavailable" });
            default:
                return null;
        }
    };
    if (compact) {
        return (_jsx("div", { ref: ref, className: cn('border border-[var(--hive-border-primary)] rounded-lg p-3 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer', !isAvailable && 'opacity-60', className), ...props, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-lg", children: getTypeIcon(resource.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] truncate text-sm", children: resource.title }), getAvailabilityBadge()] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]", children: [_jsx("span", { children: resource.course }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: getConditionColor(resource.condition), children: resource.condition }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: "font-medium text-[var(--hive-brand-primary)]", children: isFree ? 'Free' : `$${resource.price}` })] })] }), _jsx(Button, { size: "sm", disabled: !isAvailable || isOwner, onClick: () => onContact?.(resource.id), children: "Contact" })] }) }));
    }
    return (_jsxs("div", { ref: ref, className: cn('border border-[var(--hive-border-primary)] rounded-xl bg-[var(--hive-background-secondary)] overflow-hidden transition-all duration-200 hover:shadow-md', !isAvailable && 'opacity-75', className), ...props, children: [resource.image && (_jsxs("div", { className: "aspect-video bg-[var(--hive-background-tertiary)] relative overflow-hidden", children: [_jsx("img", { src: resource.image, alt: resource.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute top-2 right-2", children: getAvailabilityBadge() }), _jsx("div", { className: "absolute top-2 left-2", children: _jsxs(Badge, { size: "sm", variant: "secondary", children: [getTypeIcon(resource.type), " ", resource.type] }) })] })), _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] line-clamp-2", children: resource.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { size: "sm", variant: "secondary", children: resource.course }), resource.professor && (_jsxs("span", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["Prof. ", resource.professor] }))] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-lg font-bold text-[var(--hive-brand-primary)]", children: isFree ? 'FREE' : `$${resource.price}` }), _jsx("div", { className: cn('text-xs font-medium', getConditionColor(resource.condition)), children: resource.condition })] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] line-clamp-2", children: resource.description })] }), resource.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1", children: [resource.tags.slice(0, 3).map(tag => (_jsx(Badge, { size: "sm", variant: "secondary", children: tag }, tag))), resource.tags.length > 3 && (_jsxs(Badge, { size: "sm", variant: "secondary", children: ["+", resource.tags.length - 3] }))] })), showOwnerInfo && (_jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: resource.owner.avatar, alt: resource.owner.name }), _jsx(AvatarFallback, { children: resource.owner.name.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: resource.owner.name }), resource.owner.verified && (_jsx("span", { className: "text-[var(--hive-brand-primary)]", title: "Verified student", children: "\u2713" }))] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: ["\u2605 ", resource.owner.rating.toFixed(1)] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: daysAgo === 0 ? 'Today' : `${daysAgo}d ago` })] })] })] }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["\uD83D\uDCCD ", resource.location] })] })), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center gap-3 text-xs text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: ["\uD83D\uDC41 ", resource.views] }), _jsxs("button", { onClick: () => onFavorite?.(resource.id), className: cn('flex items-center gap-1 hover:text-[var(--hive-brand-primary)] transition-colors', resource.isFavorited && 'text-[var(--hive-status-error)]'), children: [resource.isFavorited ? '❤️' : '🤍', " ", resource.favorites] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [!isOwner && (_jsx(Button, { size: "sm", variant: "ghost", onClick: () => onShare?.(resource.id), "aria-label": "Share resource", children: "Share" })), _jsx(Button, { size: "sm", disabled: !isAvailable || isOwner, onClick: () => onContact?.(resource.id), children: isOwner ? 'Your Item' : 'Contact' })] })] }), resource.expiresDate && (_jsxs("div", { className: "text-xs text-[var(--hive-status-warning)] bg-[var(--hive-overlay-orange-subtle)] px-2 py-1 rounded", children: ["Expires ", resource.expiresDate.toLocaleDateString()] }))] })] }));
});
ResourceSharingCard.displayName = 'ResourceSharingCard';
const ResourceGrid = React.forwardRef(({ resources, compact = false, columns = 3, showOwnerInfo = true, onContact, onFavorite, onShare, currentUserId, loading = false, emptyMessage = "No resources found", className, ...props }, ref) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };
    if (loading) {
        return (_jsx("div", { className: cn('grid gap-4', gridCols[columns], className), ref: ref, ...props, children: Array.from({ length: columns * 2 }).map((_, i) => (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "bg-[var(--hive-background-tertiary)] aspect-video rounded-t-xl" }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-b-xl p-4 space-y-3", children: [_jsx("div", { className: "h-4 bg-[var(--hive-background-tertiary)] rounded w-3/4" }), _jsx("div", { className: "h-3 bg-[var(--hive-background-tertiary)] rounded w-1/2" }), _jsx("div", { className: "h-8 bg-[var(--hive-background-tertiary)] rounded w-full" })] })] }, i))) }));
    }
    if (resources.length === 0) {
        return (_jsx("div", { className: "text-center py-12 text-[var(--hive-text-secondary)]", children: emptyMessage }));
    }
    return (_jsx("div", { className: cn('grid gap-4', gridCols[columns], className), ref: ref, ...props, children: resources.map(resource => (_jsx(ResourceSharingCard, { resource: resource, compact: compact, showOwnerInfo: showOwnerInfo, onContact: onContact, onFavorite: onFavorite, onShare: onShare, currentUserId: currentUserId }, resource.id))) }));
});
ResourceGrid.displayName = 'ResourceGrid';
export { ResourceSharingCard, ResourceGrid };
//# sourceMappingURL=resource-sharing-card.js.map