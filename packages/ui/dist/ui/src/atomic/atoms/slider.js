"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
    variants: {
        size: {
            sm: "h-4",
            default: "h-5",
            lg: "h-6",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const sliderTrackVariants = cva("relative h-1.5 w-full grow overflow-hidden rounded-full", {
    variants: {
        variant: {
            default: "bg-hive-background-overlay",
            primary: "bg-hive-background-overlay",
            secondary: "bg-gray-700",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const sliderRangeVariants = cva("absolute h-full", {
    variants: {
        variant: {
            default: "bg-hive-gold",
            primary: "bg-hive-gold",
            secondary: "bg-blue-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const sliderThumbVariants = cva("block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-hive-gold bg-hive-gold hover:bg-hive-champagne focus-visible:ring-hive-gold",
            primary: "border-hive-gold bg-hive-gold hover:bg-hive-champagne focus-visible:ring-hive-gold",
            secondary: "border-blue-500 bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const Slider = React.forwardRef(({ className, size, variant = "default", ...props }, ref) => (_jsxs(SliderPrimitive.Root, { ref: ref, className: cn(sliderVariants({ size }), className), ...props, children: [_jsx(SliderPrimitive.Track, { className: sliderTrackVariants({ variant }), children: _jsx(SliderPrimitive.Range, { className: sliderRangeVariants({ variant }) }) }), _jsx(SliderPrimitive.Thumb, { className: sliderThumbVariants({ variant }) })] })));
Slider.displayName = SliderPrimitive.Root.displayName;
export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
//# sourceMappingURL=slider.js.map