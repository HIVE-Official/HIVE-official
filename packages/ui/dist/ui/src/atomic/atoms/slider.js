'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
const sliderColors = {
    primary: {
        track: 'bg-[var(--hive-brand-secondary)]',
        thumb: 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] shadow-[color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)]'
    },
    success: {
        track: 'bg-[var(--hive-status-success)]',
        thumb: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)] shadow-[color-mix(in_srgb,var(--hive-status-success)_20%,transparent)]'
    },
    warning: {
        track: 'bg-[var(--hive-status-warning)]',
        thumb: 'bg-[var(--hive-status-warning)] border-[var(--hive-status-warning)] shadow-[color-mix(in_srgb,var(--hive-status-warning)_20%,transparent)]'
    },
    error: {
        track: 'bg-[var(--hive-status-error)]',
        thumb: 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)] shadow-[color-mix(in_srgb,var(--hive-status-error)_20%,transparent)]'
    },
    gold: {
        track: 'bg-[var(--hive-brand-secondary)]',
        thumb: 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] shadow-[color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)]'
    },
    emerald: {
        track: 'bg-[var(--hive-status-success)]',
        thumb: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)] shadow-[color-mix(in_srgb,var(--hive-status-success)_20%,transparent)]'
    },
    sapphire: {
        track: 'bg-[var(--hive-status-info)]',
        thumb: 'bg-[var(--hive-status-info)] border-[var(--hive-status-info)] shadow-[color-mix(in_srgb,var(--hive-status-info)_20%,transparent)]'
    }
};
const sliderSizes = {
    sm: {
        track: 'h-1',
        thumb: 'w-4 h-4',
        container: 'h-6'
    },
    md: {
        track: 'h-2',
        thumb: 'w-5 h-5',
        container: 'h-8'
    },
    lg: {
        track: 'h-3',
        thumb: 'w-6 h-6',
        container: 'h-10'
    }
};
export const Slider = React.forwardRef(({ min = 0, max = 100, step = 1, value, defaultValue, range = false, marks, size = 'md', variant = 'default', color = 'primary', showValue = false, showMarks = true, vertical = false, disabled = false, label, formatValue, className, onChange, onChangeEnd, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(() => {
        if (value !== undefined)
            return value;
        if (defaultValue !== undefined)
            return defaultValue;
        return range ? [min, max] : min;
    });
    const currentValue = value !== undefined ? value : internalValue;
    const isRange = range || Array.isArray(currentValue);
    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);
    const handleChange = (newValue) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };
    const getPercentage = (val) => {
        return ((val - min) / (max - min)) * 100;
    };
    const formatDisplayValue = (val) => {
        return formatValue ? formatValue(val) : val.toString();
    };
    const trackClasses = [
        'relative rounded-full',
        'bg-[var(--hive-background-tertiary)]',
        sliderSizes[size].track,
        vertical ? 'w-full' : 'h-full'
    ].filter(Boolean).join(' ');
    const fillClasses = [
        'absolute rounded-full',
        'transition-all duration-200 ease-out',
        sliderColors[color].track,
        vertical ? 'w-full' : 'h-full'
    ].filter(Boolean).join(' ');
    const thumbClasses = [
        'absolute rounded-full',
        'border-2 border-[var(--hive-background-primary)]',
        'transition-all duration-200 ease-out',
        'cursor-pointer',
        'shadow-lg',
        sliderSizes[size].thumb,
        sliderColors[color].thumb,
        'hover:scale-110',
        'focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] focus:ring-offset-2',
        disabled && 'cursor-not-allowed opacity-50'
    ].filter(Boolean).join(' ');
    const containerClasses = [
        'relative flex items-center',
        sliderSizes[size].container,
        vertical && 'flex-col h-48 w-full',
        disabled && 'pointer-events-none'
    ].filter(Boolean).join(' ');
    const renderSingleSlider = () => {
        const val = Array.isArray(currentValue) ? currentValue[0] : currentValue;
        const percentage = getPercentage(val);
        return (_jsx("div", { className: containerClasses, children: _jsxs("div", { className: trackClasses, children: [_jsx("div", { className: fillClasses, style: {
                            [vertical ? 'height' : 'width']: `${percentage}%`,
                            [vertical ? 'bottom' : 'left']: '0'
                        } }), _jsx("div", { className: thumbClasses, style: {
                            [vertical ? 'bottom' : 'left']: `calc(${percentage}% - ${vertical ? '0.5rem' : '0.625rem'})`,
                            [vertical ? 'left' : 'top']: '50%',
                            transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)'
                        }, role: "slider", "aria-valuenow": val, "aria-valuemin": min, "aria-valuemax": max, tabIndex: disabled ? -1 : 0 })] }) }));
    };
    const renderRangeSlider = () => {
        const [start, end] = Array.isArray(currentValue) ? currentValue : [min, max];
        const startPercentage = getPercentage(start);
        const endPercentage = getPercentage(end);
        return (_jsx("div", { className: containerClasses, children: _jsxs("div", { className: trackClasses, children: [_jsx("div", { className: fillClasses, style: {
                            [vertical ? 'bottom' : 'left']: `${startPercentage}%`,
                            [vertical ? 'height' : 'width']: `${endPercentage - startPercentage}%`
                        } }), _jsx("div", { className: thumbClasses, style: {
                            [vertical ? 'bottom' : 'left']: `calc(${startPercentage}% - ${vertical ? '0.5rem' : '0.625rem'})`,
                            [vertical ? 'left' : 'top']: '50%',
                            transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)'
                        }, role: "slider", "aria-valuenow": start, "aria-valuemin": min, "aria-valuemax": end, tabIndex: disabled ? -1 : 0 }), _jsx("div", { className: thumbClasses, style: {
                            [vertical ? 'bottom' : 'left']: `calc(${endPercentage}% - ${vertical ? '0.5rem' : '0.625rem'})`,
                            [vertical ? 'left' : 'top']: '50%',
                            transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)'
                        }, role: "slider", "aria-valuenow": end, "aria-valuemin": start, "aria-valuemax": max, tabIndex: disabled ? -1 : 0 })] }) }));
    };
    const renderMarks = () => {
        if (!marks || !showMarks)
            return null;
        return (_jsx("div", { className: cn('flex justify-between text-xs text-[var(--hive-text-secondary)] mt-2', vertical && 'flex-col h-full absolute left-8 top-0'), children: Object.entries(marks).map(([markValue, markLabel]) => {
                const percentage = getPercentage(Number(markValue));
                return (_jsx("div", { className: cn('flex items-center', vertical && 'absolute'), style: vertical ? {
                        bottom: `calc(${percentage}% - 0.5rem)`
                    } : undefined, children: _jsx("span", { children: markLabel }) }, markValue));
            }) }));
    };
    return (_jsxs("div", { ref: ref, className: cn('space-y-2', className), ...props, children: [label && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label }), showValue && (_jsx("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: Array.isArray(currentValue)
                            ? `${formatDisplayValue(currentValue[0])} - ${formatDisplayValue(currentValue[1])}`
                            : formatDisplayValue(currentValue) }))] })), _jsxs("div", { className: cn('relative', vertical && 'flex items-start gap-4'), children: [isRange ? renderRangeSlider() : renderSingleSlider(), renderMarks()] })] }));
});
Slider.displayName = 'Slider';
// Convenient preset components
export const RangeSlider = (props) => (_jsx(Slider, { range: true, ...props }));
export const VerticalSlider = (props) => (_jsx(Slider, { vertical: true, ...props }));
export const PrimarySlider = (props) => (_jsx(Slider, { color: "primary", ...props }));
export const SuccessSlider = (props) => (_jsx(Slider, { color: "success", ...props }));
export const WarningSlider = (props) => (_jsx(Slider, { color: "warning", ...props }));
export const ErrorSlider = (props) => (_jsx(Slider, { color: "error", ...props }));
//# sourceMappingURL=slider.js.map