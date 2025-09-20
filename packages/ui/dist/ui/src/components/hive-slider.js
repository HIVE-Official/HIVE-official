"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils";
import { motionDurations } from '../motion/hive-motion-system';
// HIVE Slider variants - Luxury range input with glass morphism and liquid metal motion
const hiveSliderVariants = cva(
// Base styles - touch-friendly with proper accessibility
"relative flex w-full touch-none select-none items-center", {
    variants: {
        variant: {
            // Default glass morphism variant
            default: "",
            // Gold premium variant
            gold: "",
            // Success variant
            success: "",
            // Minimal variant
            minimal: "",
        },
        size: {
            sm: "h-4",
            default: "h-6",
            lg: "h-8",
            xl: "h-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
// Track variants for different states
const hiveSliderTrackVariants = cva(
// Base track styles with glass morphism
"relative w-full grow overflow-hidden rounded-full backdrop-blur-sm border transition-all duration-300", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-secondary)]/60 border-[var(--hive-border-subtle)]",
            gold: "bg-[var(--hive-background-secondary)]/60 border-[var(--hive-border-gold)]",
            success: "bg-[var(--hive-background-secondary)]/60 border-[var(--hive-status-success)]/30",
            minimal: "bg-[var(--hive-background-secondary)]/40 border-[var(--hive-border-subtle)]",
        },
        size: {
            sm: "h-1.5",
            default: "h-2",
            lg: "h-3",
            xl: "h-4",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
// Range (filled portion) variants
const hiveSliderRangeVariants = cva(
// Base range styles with liquid metal animation
"absolute h-full rounded-full transition-all duration-300", {
    variants: {
        variant: {
            default: "bg-[var(--hive-brand-primary)]/80 shadow-[var(--hive-shadow-gold-glow)]",
            gold: "bg-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]",
            success: "bg-[var(--hive-status-success)]",
            minimal: "bg-[var(--hive-text-primary)]",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
// Thumb variants for the draggable handle
const hiveSliderThumbVariants = cva(
// Base thumb styles with proper sizing and shadows
"block rounded-full border-2 backdrop-blur-sm ring-offset-[var(--hive-background-primary)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg", {
    variants: {
        variant: {
            default: "border-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)] focus-visible:ring-[var(--hive-brand-primary)]/50 hover:shadow-[var(--hive-shadow-gold-glow)]",
            gold: "border-[var(--hive-brand-primary)] bg-[var(--hive-background-primary)] focus-visible:ring-[var(--hive-brand-primary)]/60 hover:shadow-[var(--hive-shadow-gold-glow-strong)]",
            success: "border-[var(--hive-status-success)] bg-[var(--hive-background-primary)] focus-visible:ring-[var(--hive-status-success)]/50",
            minimal: "border-[var(--hive-text-primary)] bg-[var(--hive-background-primary)] focus-visible:ring-[var(--hive-text-primary)]/50",
        },
        size: {
            sm: "h-4 w-4",
            default: "h-5 w-5",
            lg: "h-6 w-6",
            xl: "h-7 w-7",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
// Animation variants for liquid metal motion
const thumbMotionVariants = {
    hover: {
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: motionDurations.quick,
        }
    },
    tap: {
        scale: 0.95,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: motionDurations.quick,
        }
    },
    rest: {
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: motionDurations.quick,
        }
    }
};
const HiveSlider = React.forwardRef(({ className, variant = "default", size = "default", label, description, showValue = false, valueFormatter = (value) => value.toString(), liquidMotion = true, value = [0], onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(value);
    React.useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    const handleValueChange = (newValue) => {
        setCurrentValue(newValue);
        onValueChange?.(newValue);
    };
    const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;
    return (_jsxs("div", { className: "w-full space-y-3", children: [(label || showValue) && (_jsxs("div", { className: "flex items-center justify-between", children: [label && (_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: label })), showValue && (_jsx("span", { className: "text-sm font-mono text-[var(--hive-text-secondary)]", children: valueFormatter(displayValue) }))] })), _jsxs(SliderPrimitive.Root, { ref: ref, className: cn(hiveSliderVariants({ variant, size, className })), value: currentValue, onValueChange: handleValueChange, min: min, max: max, step: step, disabled: disabled, ...props, children: [_jsx(SliderPrimitive.Track, { className: cn(hiveSliderTrackVariants({ variant, size })), children: _jsx(SliderPrimitive.Range, { className: cn(hiveSliderRangeVariants({ variant })) }) }), _jsx(SliderPrimitive.Thumb, { asChild: true, children: liquidMotion ? (_jsx(motion.div, { className: cn(hiveSliderThumbVariants({ variant, size })), variants: thumbMotionVariants, initial: "rest", whileHover: disabled ? "rest" : "hover", whileTap: disabled ? "rest" : "tap", animate: "rest" })) : (_jsx("div", { className: cn(hiveSliderThumbVariants({ variant, size })) })) })] }), description && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: description }))] }));
});
HiveSlider.displayName = "HiveSlider";
// Pre-built Slider variants for common use cases
const HiveVolumeSlider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, label: "Volume", min: 0, max: 100, showValue: true, valueFormatter: (value) => `${value}%`, variant: "secondary", ...props })));
const HiveBrightnessSlider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, label: "Brightness", min: 0, max: 100, showValue: true, valueFormatter: (value) => `${value}%`, variant: "gold", ...props })));
const HiveProgressSlider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, label: "Progress", min: 0, max: 100, showValue: true, valueFormatter: (value) => `${value}%`, variant: "success", disabled: true, ...props })));
const HivePriceRangeSlider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, label: "Price Range", min: 0, max: 1000, showValue: true, valueFormatter: (value) => `$${value}`, variant: "minimal", ...props })));
const HiveTemperatureSlider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, label: "Temperature", min: 60, max: 80, showValue: true, valueFormatter: (value) => `${value}°F`, variant: "secondary", ...props })));
HiveVolumeSlider.displayName = "HiveVolumeSlider";
HiveBrightnessSlider.displayName = "HiveBrightnessSlider";
HiveProgressSlider.displayName = "HiveProgressSlider";
HivePriceRangeSlider.displayName = "HivePriceRangeSlider";
HiveTemperatureSlider.displayName = "HiveTemperatureSlider";
export { HiveSlider, HiveVolumeSlider, HiveBrightnessSlider, HiveProgressSlider, HivePriceRangeSlider, HiveTemperatureSlider, hiveSliderVariants, hiveSliderTrackVariants, hiveSliderRangeVariants, hiveSliderThumbVariants };
// Simple Slider component for basic use cases (backwards compatibility)
const Slider = React.forwardRef(({ ...props }, ref) => (_jsx(HiveSlider, { ref: ref, variant: "minimal", liquidMotion: false, ...props })));
Slider.displayName = "Slider";
// Export as Slider for easier migration and consistency
export { Slider, HiveSlider as SliderAdvanced };
//# sourceMappingURL=hive-slider.js.map