'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button-enhanced';
import { Card } from '../../components/ui/card';
import { Text } from '../atoms/text';
import { Inbox, Search, Users, FileX, Wifi, RefreshCw } from 'lucide-react';
export function EmptyState({ variant = 'default', icon, title, description, action, secondaryAction, size = 'md', className, children }) {
    const getDefaultIcon = (variant) => {
        switch (variant) {
            case 'no-data':
                return _jsx(Inbox, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" });
            case 'search':
                return _jsx(Search, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" });
            case 'error':
                return _jsx(FileX, { className: "h-12 w-12 text-[var(--hive-status-error)]" });
            case 'offline':
                return _jsx(Wifi, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" });
            case 'loading':
                return _jsx(RefreshCw, { className: "h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" });
            default:
                return _jsx(Inbox, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" });
        }
    };
    const sizeClasses = {
        sm: {
            container: 'py-8 px-4',
            icon: 'h-8 w-8',
            title: 'heading-sm',
            description: 'body-sm'
        },
        md: {
            container: 'py-12 px-6',
            icon: 'h-12 w-12',
            title: 'heading-md',
            description: 'body-md'
        },
        lg: {
            container: 'py-16 px-8',
            icon: 'h-16 w-16',
            title: 'heading-lg',
            description: 'body-lg'
        }
    };
    const iconWithSize = icon ?
        React.cloneElement(icon, {
            className: cn(sizeClasses[size].icon, icon.props?.className)
        }) :
        getDefaultIcon(variant);
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center text-center', sizeClasses[size].container, className), children: [_jsx("div", { className: "mb-4", children: iconWithSize }), _jsxs("div", { className: "space-y-2 mb-6", children: [_jsx(Text, { variant: sizeClasses[size].title, className: "font-semibold text-[var(--hive-text-primary)]", children: title }), description && (_jsx(Text, { variant: sizeClasses[size].description, className: "text-[var(--hive-text-secondary)] max-w-md", children: description }))] }), children && (_jsx("div", { className: "mb-6", children: children })), (action || secondaryAction) && (_jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [action && (_jsx(Button, { onClick: action.onClick, size: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md', children: action.label })), secondaryAction && (_jsx(Button, { variant: "secondary", onClick: secondaryAction.onClick, size: size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md', children: secondaryAction.label }))] }))] }));
}
// Empty state with card wrapper
export function EmptyStateCard(props) {
    return (_jsx(Card, { className: "border-dashed", children: _jsx(EmptyState, { ...props }) }));
}
// Preset configurations for common use cases
export const EmptyStatePresets = {
    // No data available
    NoData: (props) => (_jsx(EmptyState, { variant: "no-data", icon: _jsx(Inbox, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" }), ...props })),
    // Search results empty
    SearchResults: (props) => (_jsx(EmptyState, { variant: "search", title: "No results found", description: "Try adjusting your search terms or filters", ...props })),
    // No spaces joined yet
    NoSpaces: (props) => (_jsx(EmptyState, { variant: "no-data", icon: _jsx(Users, { className: "h-12 w-12 text-[var(--hive-text-tertiary)]" }), title: "No spaces yet", ...props })),
    // Feed empty state
    EmptyFeed: (props) => (_jsx(EmptyState, { variant: "no-data", title: "Your feed is empty", description: "Follow spaces and join communities to see content here", ...props })),
    // Error state
    Error: (props) => (_jsx(EmptyState, { variant: "error", ...props })),
    // Offline state
    Offline: (props) => (_jsx(EmptyState, { variant: "offline", title: "You're offline", description: "Check your connection and try again", ...props })),
    // Loading state
    Loading: (props) => (_jsx(EmptyState, { variant: "loading", title: "Loading...", ...props })),
    // Campus-specific empty states
    NoCampusEvents: (props) => (_jsx(EmptyState, { title: "No events scheduled", description: "Be the first to create an event for your campus community", ...props })),
    NoBuiltTools: (props) => (_jsx(EmptyState, { title: "No tools built yet", description: "Start building tools to help your campus community", ...props })),
    // Profile-specific empty states
    NoActivityYet: (props) => (_jsx(EmptyState, { title: "No activity yet", description: "Join spaces and start participating to see your activity here", ...props })),
    NoConnectionsYet: (props) => (_jsx(EmptyState, { title: "No connections yet", description: "Participate in spaces and rituals to build your campus network", ...props }))
};
//# sourceMappingURL=empty-state.js.map