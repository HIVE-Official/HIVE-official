'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const tooltipVariants = {
    default: [
        'bg-hive-background-primary',
        'border border-hive-border-default',
        'text-hive-text-primary',
        'shadow-lg'
    ].join(' '),
    dark: [
        'bg-[var(--hive-background-primary)]',
        'border border-[var(--hive-border-default)]',
        'text-hive-pearl',
        'shadow-xl'
    ].join(' '),
    light: [
        'bg-hive-pearl',
        'border border-hive-border-subtle',
        'text-[var(--hive-background-primary)]',
        'shadow-md'
    ].join(' ')
};
const tooltipSizes = {
    sm: 'px-2 py-1 text-xs max-w-xs',
    md: 'px-3 py-2 text-sm max-w-sm',
    lg: 'px-4 py-3 text-base max-w-md'
};
const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
};
const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
};
const arrowColors = {
    default: {
        top: 'border-t-hive-background-primary',
        bottom: 'border-b-hive-background-primary',
        left: 'border-l-hive-background-primary',
        right: 'border-r-hive-background-primary'
    },
    dark: {
        top: 'border-t-[var(--hive-background-primary)]',
        bottom: 'border-b-[var(--hive-background-primary)]',
        left: 'border-l-[var(--hive-background-primary)]',
        right: 'border-r-[var(--hive-background-primary)]'
    },
    light: {
        top: 'border-t-hive-pearl',
        bottom: 'border-b-hive-pearl',
        left: 'border-l-hive-pearl',
        right: 'border-r-hive-pearl'
    }
};
export const Tooltip = ({ content, placement = 'top', trigger = 'hover', delay = 200, arrow = true, variant = 'default', size = 'md', disabled = false, children }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [timeoutId, setTimeoutId] = React.useState(null);
    const tooltipRef = React.useRef(null);
    const triggerRef = React.useRef(null);
    const showTooltip = React.useCallback(() => {
        if (disabled)
            return;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    }, [disabled, delay, timeoutId]);
    const hideTooltip = React.useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    }, [timeoutId]);
    const toggleTooltip = React.useCallback(() => {
        if (disabled)
            return;
        setIsVisible(prev => !prev);
    }, [disabled]);
    // Handle outside clicks for click trigger
    React.useEffect(() => {
        if (trigger !== 'click' || !isVisible)
            return;
        const handleClickOutside = (event) => {
            if (tooltipRef.current &&
                triggerRef.current &&
                !tooltipRef.current.contains(event.target) &&
                !triggerRef.current.contains(event.target)) {
                hideTooltip();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [trigger, isVisible, hideTooltip]);
    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    const getEventHandlers = () => {
        switch (trigger) {
            case 'hover':
                return {
                    onMouseEnter: showTooltip,
                    onMouseLeave: hideTooltip,
                    onFocus: showTooltip,
                    onBlur: hideTooltip
                };
            case 'click':
                return {
                    onClick: toggleTooltip
                };
            case 'focus':
                return {
                    onFocus: showTooltip,
                    onBlur: hideTooltip
                };
            default:
                return {};
        }
    };
    const tooltipClasses = [
        'absolute z-50',
        'rounded-lg',
        'pointer-events-none',
        'transition-all duration-200 ease-out',
        'font-medium',
        tooltipVariants[variant],
        tooltipSizes[size],
        placementClasses[placement],
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
    ].filter(Boolean).join(' ');
    const arrowClass = arrow ? [
        'absolute w-0 h-0',
        'border-4',
        arrowClasses[placement],
        arrowColors[variant][placement]
    ].filter(Boolean).join(' ') : '';
    const clonedChild = React.cloneElement(children, {
        ref: triggerRef,
        ...getEventHandlers(),
        ...(trigger === 'click' && { 'aria-expanded': isVisible }),
        'aria-describedby': isVisible ? 'tooltip' : undefined
    });
    return (_jsxs("div", { className: "relative inline-block", children: [clonedChild, content && (_jsxs("div", { ref: tooltipRef, id: "tooltip", role: "tooltip", className: tooltipClasses, children: [content, arrow && _jsx("div", { className: arrowClass })] }))] }));
};
// Convenient preset components
export const InfoTooltip = (props) => (_jsx(Tooltip, { variant: "default", ...props }));
export const DarkTooltip = (props) => (_jsx(Tooltip, { variant: "dark", ...props }));
export const LightTooltip = (props) => (_jsx(Tooltip, { variant: "light", ...props }));
export const ClickTooltip = (props) => (_jsx(Tooltip, { trigger: "click", ...props }));
//# sourceMappingURL=tooltip.js.map