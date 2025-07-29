'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils';
const progressSizes = {
    linear: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    },
    circular: {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    }
};
const progressColors = {
    primary: {
        bg: 'bg-[var(--hive-brand-secondary)]',
        gradient: 'bg-gradient-to-r from-hive-gold to-hive-amber'
    },
    success: {
        bg: 'bg-hive-emerald',
        gradient: 'bg-gradient-to-r from-hive-emerald to-green-400'
    },
    warning: {
        bg: 'bg-[var(--hive-brand-secondary)]',
        gradient: 'bg-gradient-to-r from-hive-gold to-orange-400'
    },
    error: {
        bg: 'bg-hive-ruby',
        gradient: 'bg-gradient-to-r from-hive-ruby to-red-400'
    },
    gold: {
        bg: 'bg-[var(--hive-brand-secondary)]',
        gradient: 'bg-gradient-to-r from-hive-gold to-yellow-300'
    },
    emerald: {
        bg: 'bg-hive-emerald',
        gradient: 'bg-gradient-to-r from-hive-emerald to-teal-400'
    },
    sapphire: {
        bg: 'bg-hive-sapphire',
        gradient: 'bg-gradient-to-r from-hive-sapphire to-blue-400'
    }
};
export const Progress = React.forwardRef(({ value = 0, max = 100, variant = 'default', size = 'md', color = 'primary', showValue = false, animated = false, indeterminate = false, label, className, ...props }, ref) => {
    const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
    if (variant === 'circular') {
        return (_jsx(CircularProgress, { ref: ref, value: value, max: max, size: size, color: color, showValue: showValue, animated: animated, indeterminate: indeterminate, label: label, className: className, ...props }));
    }
    const trackClasses = [
        'w-full rounded-full overflow-hidden',
        'bg-hive-background-tertiary',
        progressSizes.linear[size]
    ].filter(Boolean).join(' ');
    const fillClasses = [
        'h-full transition-all duration-300 ease-out',
        'rounded-full',
        // Color variants
        variant === 'gradient' ? progressColors[color].gradient : progressColors[color].bg,
        // Striped variant
        variant === 'striped' && [
            'bg-gradient-to-r',
            'bg-[length:20px_20px]',
            'bg-[linear-gradient(45deg,var(--hive-interactive-hover)_25%,transparent_25%,transparent_50%,var(--hive-interactive-hover)_50%,var(--hive-interactive-hover)_75%,transparent_75%,transparent)]'
        ].filter(Boolean).join(' '),
        // Animation
        animated && variant === 'striped' && 'animate-[progress-stripes_1s_linear_infinite]',
        // Indeterminate animation
        indeterminate && 'animate-[progress-indeterminate_1.5s_ease-in-out_infinite]'
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { className: cn('space-y-2', className), ref: ref, ...props, children: [(label || showValue) && (_jsxs("div", { className: "flex items-center justify-between", children: [label && (_jsx("span", { className: "text-sm font-medium text-hive-text-primary", children: label })), showValue && (_jsx("span", { className: "text-sm text-hive-text-secondary", children: indeterminate ? '---' : `${Math.round(percentage)}%` }))] })), _jsx("div", { className: trackClasses, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": indeterminate ? undefined : value, "aria-valuetext": indeterminate ? 'Loading...' : `${Math.round(percentage)}%`, children: _jsx("div", { className: fillClasses, style: {
                        width: indeterminate ? '30%' : `${percentage}%`,
                        transform: indeterminate ? 'translateX(-100%)' : 'none'
                    } }) })] }));
});
Progress.displayName = 'Progress';
const CircularProgress = React.forwardRef(({ value = 0, max = 100, size = 'md', color = 'primary', showValue = false, animated = false, indeterminate = false, label, strokeWidth, className, ...props }, ref) => {
    const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
    const sizeClasses = progressSizes.circular[size];
    const radius = size === 'sm' ? 12 : size === 'md' ? 20 : 28;
    const defaultStrokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
    const stroke = strokeWidth || defaultStrokeWidth;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const svgClasses = [
        sizeClasses,
        'transform -rotate-90',
        indeterminate && 'animate-spin'
    ].filter(Boolean).join(' ');
    const progressCircleClasses = [
        'transition-all duration-500 ease-out',
        'drop-shadow-sm'
    ].join(' ');
    return (_jsxs("div", { className: cn('relative inline-flex items-center justify-center', className), ref: ref, ...props, children: [_jsxs("svg", { className: svgClasses, viewBox: `0 0 ${radius * 2} ${radius * 2}`, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": indeterminate ? undefined : value, "aria-valuetext": indeterminate ? 'Loading...' : `${Math.round(percentage)}%`, children: [_jsx("circle", { stroke: "currentColor", className: "text-hive-background-tertiary", fill: "transparent", strokeWidth: stroke, r: normalizedRadius, cx: radius, cy: radius }), _jsx("circle", { stroke: "currentColor", className: cn(progressCircleClasses, progressColors[color].bg.replace('bg-', 'text-')), fill: "transparent", strokeWidth: stroke, strokeDasharray: strokeDasharray, strokeDashoffset: indeterminate ? circumference * 0.75 : strokeDashoffset, strokeLinecap: "round", r: normalizedRadius, cx: radius, cy: radius })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: showValue && (_jsx("span", { className: cn('font-semibold text-hive-text-primary', size === 'sm' && 'text-xs', size === 'md' && 'text-sm', size === 'lg' && 'text-base'), children: indeterminate ? '...' : `${Math.round(percentage)}%` })) }), label && (_jsx("div", { className: "absolute -bottom-6 left-1/2 transform -translate-x-1/2", children: _jsx("span", { className: "text-xs text-hive-text-secondary whitespace-nowrap", children: label }) }))] }));
});
CircularProgress.displayName = 'CircularProgress';
// Export CircularProgress for reuse
export { CircularProgress };
// Convenient preset components
export const LoadingProgress = (props) => (_jsx(Progress, { indeterminate: true, animated: true, ...props }));
export const SuccessProgress = (props) => (_jsx(Progress, { color: "success", ...props }));
export const ErrorProgress = (props) => (_jsx(Progress, { color: "error", ...props }));
export const CircularSpinner = (props) => (_jsx(Progress, { variant: "circular", indeterminate: true, animated: true, ...props }));
//# sourceMappingURL=progress.js.map