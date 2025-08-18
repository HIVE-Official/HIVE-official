import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const enhancedTypographyVariants = cva("transition-all duration-300 ease-out", {
    variants: {
        variant: {
            // HIVE HERO: Big, bold, unmistakable
            hero: [
                "text-4xl md:text-6xl lg:text-7xl font-black tracking-tight",
                "bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent",
                "relative before:absolute before:inset-0 before:bg-gradient-to-r",
                "before:from-accent/20 before:to-transparent before:blur-2xl before:-z-10",
                "hover:scale-105 hover:before:blur-xl transition-transform duration-500"
            ],
            // CAMPUS ENERGY: Pulsing, alive
            energy: [
                "text-2xl md:text-3xl font-bold text-accent",
                "animate-pulse-subtle tracking-wide",
                "text-shadow-lg shadow-accent/30",
                "hover:animate-none hover:text-shadow-xl hover:scale-110",
                "transition-all duration-300"
            ],
            // HANDWRITTEN: Personal, authentic  
            handwritten: [
                "font-handwriting text-xl md:text-2xl text-foreground",
                "transform rotate-[-0.5deg] hover:rotate-0",
                "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
                "after:bg-accent after:scale-x-0 after:origin-left",
                "hover:after:scale-x-100 after:transition-transform after:duration-300"
            ],
            // NEON SIGN: Glowing, electric
            neon: [
                "text-2xl md:text-3xl font-bold text-accent tracking-wider",
                "text-shadow-[0_0_10px_rgba(255,215,0,0.8),0_0_20px_rgba(255,215,0,0.6),0_0_30px_rgba(255,215,0,0.4)]",
                "hover:text-shadow-[0_0_15px_rgba(255,215,0,1),0_0_30px_rgba(255,215,0,0.8),0_0_45px_rgba(255,215,0,0.6)]",
                "animate-flicker-subtle"
            ],
            // CHALK BOARD: Academic but cool
            chalk: [
                "text-xl md:text-2xl font-semibold text-foreground",
                "relative before:absolute before:inset-0 before:bg-gradient-to-r",
                "before:from-transparent before:via-white/20 before:to-transparent",
                "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                "before:transition-transform before:duration-700",
                "text-shadow-sm filter-[contrast(1.2)]"
            ],
            // STICKER BOMB: Playful, layered
            sticker: [
                "text-lg md:text-xl font-black text-black bg-accent",
                "px-3 py-1 transform rotate-[-2deg] inline-block",
                "shadow-md hover:shadow-lg hover:rotate-0 hover:scale-110",
                "border-2 border-black/20 relative",
                "after:absolute after:top-0 after:right-0 after:w-3 after:h-3",
                "after:bg-white/40 after:rounded-full after:blur-sm",
                "transition-all duration-300 ease-out"
            ],
            // GRADIENT FLOW: Smooth, modern
            gradient: [
                "text-2xl md:text-3xl font-bold tracking-tight",
                "bg-gradient-to-r from-gray-100 via-accent to-gray-100 bg-clip-text text-transparent",
                "bg-size-200 bg-pos-0 hover:bg-pos-100",
                "transition-all duration-700 ease-out",
                "hover:scale-105"
            ]
        },
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl"
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            black: "font-black"
        },
        spacing: {
            tight: "tracking-tight",
            normal: "tracking-normal",
            wide: "tracking-wide",
            wider: "tracking-wider",
            widest: "tracking-widest"
        }
    },
    defaultVariants: {
        variant: "gradient",
        size: "base",
        weight: "normal",
        spacing: "normal"
    }
});
const EnhancedTypography = React.forwardRef(({ className, variant, size, weight, spacing, as: Component = "p", children, ...props }, ref) => {
    return React.createElement(Component, {
        className: cn(enhancedTypographyVariants({ variant, size, weight, spacing }), className),
        ref,
        ...props
    }, children);
});
EnhancedTypography.displayName = "EnhancedTypography";
// Convenient preset components
export const HeroText = ({ children, className, ...props }) => (_jsx(EnhancedTypography, { variant: "hero", as: "h1", className: className, ...props, children: children }));
export const EnergyText = ({ children, className, ...props }) => (_jsx(EnhancedTypography, { variant: "energy", as: "h2", className: className, ...props, children: children }));
export const HandwrittenText = ({ children, className, ...props }) => (_jsx(EnhancedTypography, { variant: "handwritten", as: "span", className: className, ...props, children: children }));
export const NeonText = ({ children, className, ...props }) => (_jsx(EnhancedTypography, { variant: "neon", as: "h3", className: className, ...props, children: children }));
export const StickerText = ({ children, className, ...props }) => (_jsx(EnhancedTypography, { variant: "sticker", as: "span", className: className, ...props, children: children }));
export { EnhancedTypography, enhancedTypographyVariants };
//# sourceMappingURL=enhanced-typography.js.map