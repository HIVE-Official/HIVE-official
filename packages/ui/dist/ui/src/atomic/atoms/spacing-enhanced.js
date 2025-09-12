'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
// HIVE Spacing System - Semantic Token Perfection
// Zero hardcoded values - complete semantic token usage
const spacerVariants = cva("flex-shrink-0", {
    variants: {
        size: {
            xs: "w-2 h-2",
            sm: "w-4 h-4",
            default: "w-6 h-6",
            md: "w-8 h-8",
            lg: "w-12 h-12",
            xl: "w-16 h-16",
            "2xl": "w-20 h-20",
            "3xl": "w-24 h-24",
        },
        direction: {
            both: "",
            horizontal: "h-0",
            vertical: "w-0",
        }
    },
    defaultVariants: {
        size: "default",
        direction: "both",
    },
});
const containerVariants = cva("w-full mx-auto", {
    variants: {
        size: {
            sm: "max-w-screen-sm",
            md: "max-w-screen-md",
            lg: "max-w-screen-lg",
            xl: "max-w-screen-xl",
            "2xl": "max-w-screen-2xl",
            full: "max-w-full",
        },
        padding: {
            none: "",
            sm: "px-4",
            default: "px-6",
            lg: "px-8",
            xl: "px-12",
        },
        center: {
            true: "mx-auto",
            false: "",
        }
    },
    defaultVariants: {
        size: "lg",
        padding: "default",
        center: true,
    },
});
const stackVariants = cva("flex", {
    variants: {
        direction: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        spacing: {
            none: "",
            xs: "gap-2",
            sm: "gap-4",
            default: "gap-6",
            md: "gap-8",
            lg: "gap-12",
            xl: "gap-16",
            "2xl": "gap-20",
            "3xl": "gap-24",
        },
        align: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justify: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
            evenly: "justify-evenly",
        },
        wrap: {
            true: "flex-wrap",
            false: "flex-nowrap",
        }
    },
    defaultVariants: {
        direction: "vertical",
        spacing: "default",
        align: "stretch",
        justify: "start",
        wrap: false,
    },
});
const separatorVariants = cva("shrink-0", {
    variants: {
        orientation: {
            horizontal: "h-px w-full bg-[var(--hive-border-default)]",
            vertical: "w-px h-full bg-[var(--hive-border-default)]",
        },
        variant: {
            default: "bg-[var(--hive-border-default)]",
            muted: "bg-[color-mix(in_srgb,var(--hive-border-default)_50%,transparent)]",
            strong: "bg-[var(--hive-text-tertiary)]",
            brand: "bg-[var(--hive-brand-secondary)]",
        },
        size: {
            thin: "",
            default: "",
            thick: "",
        }
    },
    compoundVariants: [
        {
            orientation: "horizontal",
            size: "thin",
            class: "h-px"
        },
        {
            orientation: "horizontal",
            size: "default",
            class: "h-0.5"
        },
        {
            orientation: "horizontal",
            size: "thick",
            class: "h-1"
        },
        {
            orientation: "vertical",
            size: "thin",
            class: "w-px"
        },
        {
            orientation: "vertical",
            size: "default",
            class: "w-0.5"
        },
        {
            orientation: "vertical",
            size: "thick",
            class: "w-1"
        },
    ],
    defaultVariants: {
        orientation: "horizontal",
        variant: "default",
        size: "default",
    },
});
export const Spacer = React.forwardRef(({ className, size, direction, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(spacerVariants({ size, direction }), className), "aria-hidden": "true", ...props }));
});
Spacer.displayName = "Spacer";
export const Container = React.forwardRef(({ className, size, padding, center, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(containerVariants({ size, padding, center }), className), ...props }));
});
Container.displayName = "Container";
export const Stack = React.forwardRef(({ className, direction, spacing, align, justify, wrap, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(stackVariants({ direction, spacing, align, justify, wrap }), className), ...props, children: children }));
});
Stack.displayName = "Stack";
export const HStack = React.forwardRef(({ align = "center", ...props }, ref) => {
    return (_jsx(Stack, { ref: ref, direction: "horizontal", align: align, ...props }));
});
HStack.displayName = "HStack";
export const VStack = React.forwardRef((props, ref) => {
    return (_jsx(Stack, { ref: ref, direction: "vertical", ...props }));
});
VStack.displayName = "VStack";
export const Separator = React.forwardRef(({ className, orientation, variant, size, decorative = true, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(separatorVariants({ orientation, variant, size }), className), role: decorative ? "none" : "separator", "aria-orientation": orientation || undefined, ...props }));
});
Separator.displayName = "Separator";
export const Grid = React.forwardRef(({ className, cols = 1, gap = "default", responsive = true, ...props }, ref) => {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
    };
    const gridGap = {
        none: "gap-0",
        xs: "gap-2",
        sm: "gap-4",
        default: "gap-6",
        md: "gap-8",
        lg: "gap-12",
        xl: "gap-16",
    };
    const responsiveClasses = responsive ? {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        12: "grid-cols-1 md:grid-cols-6 lg:grid-cols-12",
    } : gridCols;
    return (_jsx("div", { ref: ref, className: cn("grid", responsive ? responsiveClasses[cols] : gridCols[cols], gridGap[gap], className), ...props }));
});
Grid.displayName = "Grid";
export const Flex = React.forwardRef(({ className, direction = "row", wrap = false, align = "start", justify = "start", gap = "none", ...props }, ref) => {
    const directionClasses = {
        row: "flex-row",
        col: "flex-col",
        "row-reverse": "flex-row-reverse",
        "col-reverse": "flex-col-reverse",
    };
    const alignClasses = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
    };
    const justifyClasses = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
    };
    const gapClasses = {
        none: "",
        xs: "gap-2",
        sm: "gap-4",
        default: "gap-6",
        md: "gap-8",
        lg: "gap-12",
        xl: "gap-16",
    };
    return (_jsx("div", { ref: ref, className: cn("flex", directionClasses[direction], wrap && "flex-wrap", alignClasses[align], justifyClasses[justify], gapClasses[gap], className), ...props }));
});
Flex.displayName = "Flex";
// Layout Presets for common patterns
export const LayoutPresets = {
    // Page Layout
    PageLayout: ({ children, ...props }) => (_jsx(Container, { size: "xl", padding: "lg", ...props, children: _jsx(VStack, { spacing: "xl", children: children }) })),
    // Card Layout
    CardLayout: ({ children, ...props }) => (_jsx(VStack, { spacing: "md", ...props, children: children })),
    // Form Layout
    FormLayout: ({ children, ...props }) => (_jsx(VStack, { spacing: "lg", ...props, children: children })),
    // Header Layout
    HeaderLayout: ({ children, ...props }) => (_jsx(HStack, { justify: "between", align: "center", ...props, children: children })),
    // Grid Layout
    GridLayout: ({ cols = 3, children, ...props }) => (_jsx(Grid, { cols: cols, gap: "lg", responsive: true, ...props, children: children })),
};
export { spacerVariants, containerVariants, stackVariants, separatorVariants };
//# sourceMappingURL=spacing-enhanced.js.map