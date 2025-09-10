'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
const statusColors = {
    online: {
        bg: 'bg-[var(--hive-status-success)]',
        border: 'border-[var(--hive-status-success)]',
        text: 'text-[var(--hive-status-success)]',
        glow: '[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    offline: {
        bg: 'bg-[var(--hive-text-disabled)]',
        border: 'border-[var(--hive-text-disabled)]',
        text: 'text-[var(--hive-text-disabled)]',
        glow: '[--hive-glow:var(--hive-text-disabled)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    away: {
        bg: 'bg-[var(--hive-status-warning)]',
        border: 'border-[var(--hive-status-warning)]',
        text: 'text-[var(--hive-status-warning)]',
        glow: '[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    busy: {
        bg: 'bg-[var(--hive-status-error)]',
        border: 'border-[var(--hive-status-error)]',
        text: 'text-[var(--hive-status-error)]',
        glow: '[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    error: {
        bg: 'bg-[var(--hive-status-error)]',
        border: 'border-[var(--hive-status-error)]',
        text: 'text-[var(--hive-status-error)]',
        glow: '[--hive-glow:var(--hive-status-error)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    success: {
        bg: 'bg-[var(--hive-status-success)]',
        border: 'border-[var(--hive-status-success)]',
        text: 'text-[var(--hive-status-success)]',
        glow: '[--hive-glow:var(--hive-status-success)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    warning: {
        bg: 'bg-[var(--hive-status-warning)]',
        border: 'border-[var(--hive-status-warning)]',
        text: 'text-[var(--hive-status-warning)]',
        glow: '[--hive-glow:var(--hive-status-warning)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    },
    pending: {
        bg: 'bg-[var(--hive-text-tertiary)]',
        border: 'border-[var(--hive-text-tertiary)]',
        text: 'text-[var(--hive-text-tertiary)]',
        glow: '[--hive-glow:var(--hive-text-tertiary)] shadow-[0_0_8px_color-mix(in_srgb,var(--hive-glow)_40%,transparent)]'
    }
};
const indicatorSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
};
const positionClasses = {
    top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    left: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
};
export const StatusIndicator = React.forwardRef(({ status, size = 'md', variant = 'dot', label, position, showLabel = false, animate = true, className, ...props }, ref) => {
    const statusColor = statusColors[status];
    const isPositioned = Boolean(position);
    const baseClasses = [
        'flex items-center',
        isPositioned ? 'absolute' : 'relative',
        position && positionClasses[position]
    ].filter(Boolean).join(' ');
    const dotClasses = [
        'rounded-full flex-shrink-0',
        indicatorSizes[size],
        // Variant styles
        variant === 'dot' && statusColor.bg,
        variant === 'pulse' && [
            statusColor.bg,
            animate && 'animate-pulse'
        ].filter(Boolean).join(' '),
        variant === 'glow' && [
            statusColor.bg,
            statusColor.glow,
            animate && 'animate-pulse'
        ].filter(Boolean).join(' '),
        variant === 'ring' && [
            'border-2',
            statusColor.border,
            'bg-[var(--hive-background-primary)]'
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' ');
    const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);
    if (showLabel || (!isPositioned && label)) {
        return (_jsxs("div", { ref: ref, className: cn(baseClasses, 'gap-2', className), ...props, children: [_jsx("div", { className: dotClasses }), _jsx("span", { className: cn('text-sm font-medium capitalize', statusColor.text), children: displayLabel })] }));
    }
    return (_jsx("div", { ref: ref, className: cn(baseClasses, className), title: displayLabel, ...props, children: _jsx("div", { className: dotClasses }) }));
});
StatusIndicator.displayName = 'StatusIndicator';
// Convenient preset components
export const OnlineIndicator = (props) => (_jsx(StatusIndicator, { status: "online", ...props }));
export const OfflineIndicator = (props) => (_jsx(StatusIndicator, { status: "offline", ...props }));
export const BusyIndicator = (props) => (_jsx(StatusIndicator, { status: "busy", ...props }));
export const AwayIndicator = (props) => (_jsx(StatusIndicator, { status: "away", ...props }));
export const ErrorIndicator = (props) => (_jsx(StatusIndicator, { status: "error", ...props }));
export const SuccessIndicator = (props) => (_jsx(StatusIndicator, { status: "success", ...props }));
export const WarningIndicator = (props) => (_jsx(StatusIndicator, { status: "warning", ...props }));
export const PulseIndicator = (props) => (_jsx(StatusIndicator, { variant: "pulse", ...props }));
export const GlowIndicator = (props) => (_jsx(StatusIndicator, { variant: "glow", ...props }));
export const StatusBadge = ({ status, size = 'sm', variant = 'dot', position = 'top-right', children, count, max = 99, className, ...props }) => {
    const hasContent = children || count !== undefined;
    const displayCount = count !== undefined ? (count > max ? `${max}+` : count.toString()) : '';
    if (!hasContent) {
        return _jsx(StatusIndicator, { status: status, size: size, variant: variant, className: className, ...props });
    }
    return (_jsxs("div", { className: "relative inline-flex", children: [children, _jsx("div", { className: cn('absolute flex items-center justify-center', positionClasses[position], count !== undefined && [
                    'min-w-4.5 h-4.5 px-1',
                    'text-xs font-bold text-[var(--hive-text-inverse)]',
                    'rounded-full',
                    statusColors[status].bg
                ].filter(Boolean).join(' ')), children: count !== undefined ? (displayCount) : (_jsx(StatusIndicator, { status: status, size: size, variant: variant, animate: props.animate })) })] }));
};
//# sourceMappingURL=status-indicator.js.map