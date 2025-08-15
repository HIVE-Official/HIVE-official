"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { CheckCircle, AlertCircle } from 'lucide-react';
// HIVE Progress System - Advanced Loading States with Liquid Metal Motion
// Sophisticated progress indicators with magnetic interactions and smooth animations
const hiveProgressVariants = cva(
// Base progress styles
"relative overflow-hidden rounded-full bg-[var(--hive-background-primary)]/20 backdrop-blur-sm", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-primary)]/20",
            premium: "bg-yellow-500/10 border border-yellow-500/20",
            minimal: "bg-[var(--hive-text-primary)]/10",
            gradient: "bg-gradient-to-r from-black/20 to-black/30",
        },
        size: {
            xs: "h-1",
            sm: "h-2",
            default: "h-3",
            lg: "h-4",
            xl: "h-6",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const progressFillVariants = cva(
// Progress fill styles
"h-full rounded-full transition-all", {
    variants: {
        variant: {
            default: "bg-yellow-400",
            success: "bg-green-400",
            warning: "bg-orange-400",
            danger: "bg-red-400",
            info: "bg-blue-400",
            gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        }
    },
    defaultVariants: {
        variant: "default",
    },
});
export const HiveProgressBar = React.forwardRef(({ className, variant, size, value, max = 100, label, showValue = false, showPercentage = true, animated = true, striped = false, pulse = false, fillVariant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    return (_jsxs("div", { className: "space-y-2", children: [(label || showValue || showPercentage) && (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [label && (_jsx("span", { className: "font-medium text-[var(--hive-text-primary)]/80", children: label })), _jsxs("div", { className: "flex items-center space-x-2 text-[var(--hive-text-primary)]/60", children: [showValue && (_jsxs("span", { children: [value, "/", max] })), showPercentage && (_jsxs("span", { children: [percentage.toFixed(1), "%"] }))] })] })), _jsx("div", { ref: ref, className: cn(hiveProgressVariants({ variant, size, className })), ...props, children: _jsx(motion.div, { className: cn(progressFillVariants({ variant: fillVariant }), striped && "bg-stripes bg-stripes-white/10", pulse && "animate-pulse"), initial: { width: 0 }, animate: { width: `${percentage}%` }, transition: {
                        duration: animated ? motionDurations.smooth : 0,
                        ease: liquidMetal.easing,
                    }, children: animated && (_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent", initial: { x: '-100%' }, animate: { x: '100%' }, transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        } })) }) })] }));
});
HiveProgressBar.displayName = "HiveProgressBar";
export const HiveCircularProgress = React.forwardRef(({ className, value, max = 100, size = 120, strokeWidth = 8, color = 'var(--hive-brand-secondary)', backgroundColor = 'var(--hive-interactive-active)', showValue = false, showPercentage = true, animated = true, children, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (_jsxs("div", { ref: ref, className: cn("relative inline-flex items-center justify-center", className), style: { width: size, height: size }, ...props, children: [_jsxs("svg", { width: size, height: size, className: "transform -rotate-90", children: [_jsx("circle", { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: backgroundColor, strokeWidth: strokeWidth }), _jsx(motion.circle, { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: strokeDasharray, initial: { strokeDashoffset: circumference }, animate: { strokeDashoffset: animated ? strokeDashoffset : strokeDashoffset }, transition: {
                            duration: animated ? motionDurations.smooth : 0,
                            ease: liquidMetal.easing,
                        } })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: children || (_jsxs("div", { className: "text-center", children: [showPercentage && (_jsxs(motion.div, { className: "text-lg font-bold text-[var(--hive-text-primary)]", initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: motionDurations.smooth, delay: 0.3 }, children: [percentage.toFixed(0), "%"] })), showValue && (_jsxs("div", { className: "text-xs text-[var(--hive-text-primary)]/60", children: [value, "/", max] }))] })) })] }));
});
HiveCircularProgress.displayName = "HiveCircularProgress";
export const HiveStepProgress = React.forwardRef(({ className, steps, direction = 'horizontal', showConnectors = true, clickable = false, onStepClick, ...props }, ref) => {
    const getStepIcon = (step, index) => {
        if (step.icon)
            return step.icon;
        switch (step.status) {
            case 'completed':
                return _jsx(CheckCircle, { size: 20 });
            case 'error':
                return _jsx(AlertCircle, { size: 20 });
            case 'current':
                return _jsx("div", { className: "w-3 h-3 bg-yellow-400 rounded-full animate-pulse" });
            default:
                return _jsx("div", { className: "w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center text-xs font-medium text-[var(--hive-text-primary)]/60", children: index + 1 });
        }
    };
    const getStepColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-400 border-green-400/30 bg-green-400/10';
            case 'current':
                return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
            case 'error':
                return 'text-red-400 border-red-400/30 bg-red-400/10';
            default:
                return 'text-[var(--hive-text-primary)]/60 border-white/20 bg-[var(--hive-text-primary)]/5';
        }
    };
    return (_jsx("div", { ref: ref, className: cn("flex", direction === 'horizontal' ? "items-center space-x-4" : "flex-col space-y-4", className), ...props, children: steps.map((step, index) => (_jsxs("div", { className: cn("flex items-center", direction === 'vertical' && "w-full", clickable && "cursor-pointer group"), children: [_jsx(motion.div, { className: cn("relative flex items-center justify-center w-10 h-10 rounded-full border transition-all", getStepColor(step.status), clickable && "group-hover:scale-110"), onClick: () => clickable && onStepClick?.(step, index), whileHover: clickable ? { scale: 1.05 } : {}, whileTap: clickable ? { scale: 0.95 } : {}, initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: {
                        duration: motionDurations.smooth,
                        delay: index * 0.1,
                        ease: liquidMetal.easing
                    }, children: getStepIcon(step, index) }), _jsxs("div", { className: cn("ml-3 flex-1", direction === 'horizontal' && index < steps.length - 1 && "mr-4"), children: [_jsx(motion.div, { className: cn("font-medium text-sm", step.status === 'completed' ? "text-green-400" :
                                step.status === 'current' ? "text-yellow-400" :
                                    step.status === 'error' ? "text-red-400" :
                                        "text-[var(--hive-text-primary)]/60"), initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: {
                                duration: motionDurations.smooth,
                                delay: index * 0.1 + 0.1
                            }, children: step.label }), step.description && (_jsx(motion.div, { className: "text-xs text-[var(--hive-text-primary)]/40 mt-1", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: {
                                duration: motionDurations.smooth,
                                delay: index * 0.1 + 0.2
                            }, children: step.description }))] }), showConnectors && index < steps.length - 1 && (_jsx(motion.div, { className: cn("border-t-2 border-dashed transition-colors", direction === 'horizontal' ? "flex-1 mx-4" : "absolute left-5 top-10 h-8 border-l-2 border-t-0", step.status === 'completed' ? "border-green-400/30" : "border-white/20"), initial: { scale: 0 }, animate: { scale: 1 }, transition: {
                        duration: motionDurations.smooth,
                        delay: index * 0.1 + 0.3
                    } }))] }, step.id))) }));
});
HiveStepProgress.displayName = "HiveStepProgress";
export const HiveSpinner = React.forwardRef(({ className, size = 'default', color = 'var(--hive-brand-secondary)', speed = 'normal', variant = 'spin', label, ...props }, ref) => {
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        default: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
    };
    const speedDuration = {
        slow: 2,
        normal: 1,
        fast: 0.5,
    };
    const renderSpinner = () => {
        switch (variant) {
            case 'pulse':
                return (_jsx(motion.div, { className: cn("rounded-full", sizeClasses[size]), style: { backgroundColor: color }, animate: { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }, transition: {
                        duration: speedDuration[speed],
                        repeat: Infinity,
                        ease: "easeInOut",
                    } }));
            case 'bounce':
                return (_jsx(motion.div, { className: cn("rounded-full", sizeClasses[size]), style: { backgroundColor: color }, animate: { y: [0, -10, 0] }, transition: {
                        duration: speedDuration[speed],
                        repeat: Infinity,
                        ease: "easeInOut",
                    } }));
            case 'dots':
                return (_jsx("div", { className: "flex space-x-1", children: [0, 1, 2].map((i) => (_jsx(motion.div, { className: "w-2 h-2 rounded-full", style: { backgroundColor: color }, animate: { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }, transition: {
                            duration: speedDuration[speed],
                            repeat: Infinity,
                            delay: i * 0.2,
                        } }, i))) }));
            case 'bars':
                return (_jsx("div", { className: "flex space-x-1 items-end", children: [0, 1, 2, 3].map((i) => (_jsx(motion.div, { className: "w-1 rounded-full", style: { backgroundColor: color, height: '4px' }, animate: { scaleY: [1, 2, 1] }, transition: {
                            duration: speedDuration[speed],
                            repeat: Infinity,
                            delay: i * 0.1,
                        } }, i))) }));
            default: // spin
                return (_jsx(motion.div, { className: cn("border-2 border-t-transparent rounded-full", sizeClasses[size]), style: { borderColor: `${color} transparent ${color} ${color}` }, animate: { rotate: 360 }, transition: {
                        duration: speedDuration[speed],
                        repeat: Infinity,
                        ease: "linear",
                    } }));
        }
    };
    return (_jsx("div", { ref: ref, className: cn("flex items-center justify-center", className), ...props, children: _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [renderSpinner(), label && (_jsx("span", { className: "text-sm text-[var(--hive-text-primary)]/60", children: label }))] }) }));
});
HiveSpinner.displayName = "HiveSpinner";
export const HiveSkeleton = React.forwardRef(({ className, width, height, variant = 'rectangular', animated = true, lines = 1, ...props }, ref) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'text':
                return 'rounded h-4';
            case 'circular':
                return 'rounded-full';
            case 'rounded':
                return 'rounded-xl';
            default:
                return 'rounded';
        }
    };
    const skeletonStyle = {
        width: width || (variant === 'text' ? '100%' : '100px'),
        height: height || (variant === 'circular' ? '100px' : variant === 'text' ? '16px' : '100px'),
    };
    if (variant === 'text' && lines > 1) {
        return (_jsx("div", { ref: ref, className: cn("space-y-2", className), ...props, children: Array.from({ length: lines }, (_, i) => (_jsx(motion.div, { className: cn("bg-[var(--hive-text-primary)]/10 backdrop-blur-sm", getVariantClasses(), animated && "animate-pulse"), style: {
                    ...skeletonStyle,
                    width: i === lines - 1 ? '75%' : '100%',
                }, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: {
                    duration: motionDurations.smooth,
                    delay: i * 0.1
                }, children: animated && (_jsx(motion.div, { className: "h-full bg-gradient-to-r from-transparent via-white/20 to-transparent", initial: { x: '-100%' }, animate: { x: '100%' }, transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.2,
                    } })) }, i))) }));
    }
    return (_jsx(motion.div, { ref: ref, className: cn("bg-[var(--hive-text-primary)]/10 backdrop-blur-sm overflow-hidden", getVariantClasses(), animated && "animate-pulse", className), style: skeletonStyle, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: motionDurations.smooth }, ...props, children: animated && (_jsx(motion.div, { className: "h-full bg-gradient-to-r from-transparent via-white/20 to-transparent", initial: { x: '-100%' }, animate: { x: '100%' }, transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            } })) }));
});
HiveSkeleton.displayName = "HiveSkeleton";
export const HiveProgress = React.forwardRef(({ variant = 'bar', value = 0, max = 100, size = 'md', status = 'default', showLabel = false, showValue = false, showPercentage = true, animated = true, label, steps, currentStep, className, ...props }, ref) => {
    switch (variant) {
        case 'circular':
            return (_jsx(HiveCircularProgress, { ref: ref, value: value, max: max, size: size === 'xs' ? 40 : size === 'sm' ? 60 : size === 'md' ? 80 : size === 'lg' ? 120 : 160, showValue: showValue, showPercentage: showPercentage, animated: animated, className: className, ...props }));
        case 'step':
            if (!steps) {
                console.warn('HiveProgress: steps prop is required for step variant');
                return null;
            }
            return (_jsx(HiveStepProgress, { ref: ref, steps: steps, className: className, ...props }));
        case 'spinner':
            return (_jsx(HiveSpinner, { ref: ref, size: size === 'md' ? 'default' : size, variant: "spin", speed: "normal", label: label, className: className, ...props }));
        case 'skeleton':
            return (_jsx(HiveSkeleton, { ref: ref, variant: "rectangular", animated: animated, className: className, ...props }));
        default: // bar
            return (_jsx(HiveProgressBar, { ref: ref, value: value, max: max, size: size === 'md' ? 'default' : size, variant: "default", fillVariant: status === 'error' ? 'danger' : status, showValue: showValue, showPercentage: showPercentage, animated: animated, label: label, className: className, ...props }));
    }
});
HiveProgress.displayName = "HiveProgress";
// Export aliases for compatibility
export const Progress = HiveProgress;
export const ProgressBar = HiveProgressBar;
export const CircularProgress = HiveCircularProgress;
export const StepProgress = HiveStepProgress;
export const Spinner = HiveSpinner;
// Note: Use HiveSkeleton to avoid conflicts with ui/skeleton
export { hiveProgressVariants, progressFillVariants };
//# sourceMappingURL=hive-progress.js.map