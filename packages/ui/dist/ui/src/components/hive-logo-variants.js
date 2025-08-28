"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { getMotionProps } from '../lib/motion-utils';
// Extended HIVE Logo Variants System
// Comprehensive collection of logo variations for different contexts and effects
const hiveLogoVariants = cva("inline-flex items-center justify-center transition-all duration-200", {
    variants: {
        variant: {
            primary: "text-[var(--hive-text-primary)]",
            gold: "text-[var(--hive-color-gold)]",
            inverted: "text-[var(--hive-background-primary)]",
            monochrome: "text-current",
            gradient: "bg-gradient-to-br from-[var(--hive-color-gold)] to-[var(--hive-status-warning)] bg-clip-text text-transparent",
            neon: "text-[var(--hive-status-info)] drop-shadow-[0_0_10px_var(--hive-status-info)]",
            holographic: "text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text",
            glass: "text-[var(--hive-text-primary)]/90 backdrop-blur-xl",
        },
        size: {
            xs: "w-4 h-4",
            sm: "w-5 h-5",
            md: "w-6 h-6",
            lg: "w-8 h-8",
            xl: "w-10 h-10",
            "2xl": "w-12 h-12",
            "3xl": "w-16 h-16",
            "4xl": "w-20 h-20",
        },
        effect: {
            none: "",
            glow: "filter drop-shadow-lg",
            pulse: "animate-pulse",
            bounce: "animate-bounce",
            spin: "animate-spin",
            ping: "animate-ping",
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        effect: "none",
    },
});
// Base hexagon path data from the official HIVE logo
const HIVE_PATH = "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z";
// 1. ANIMATED VARIANTS
export const HiveLogoAnimated = ({ variant = "primary", size = "md", className, ...props }) => {
    return (_jsx(motion.div, { className: cn(hiveLogoVariants({ variant, size, className })), initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8
        }, whileHover: { scale: 1.1, rotate: 5 }, whileTap: { scale: 0.95 }, ...getMotionProps(props), children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx(motion.path, { d: HIVE_PATH, fill: "currentColor", initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 2, ease: "easeInOut" } }) }) }));
};
// 2. LOADING SPINNER VARIANT
export const HiveLogoSpinner = ({ variant = "gold", size = "md", className, ...props }) => {
    return (_jsx(motion.div, { className: cn(hiveLogoVariants({ variant, size, className })), animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, ...getMotionProps(props), children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx(motion.path, { d: HIVE_PATH, fill: "currentColor", animate: { opacity: [1, 0.3, 1] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }) }) }));
};
// 3. PULSE BREATHING VARIANT
export const HiveLogoPulse = ({ variant = "neon", size = "lg", className, ...props }) => {
    return (_jsx(motion.div, { className: cn(hiveLogoVariants({ variant, size, className })), animate: {
            scale: [1, 1.1, 1],
            filter: [
                "drop-shadow(0 0 5px currentColor)",
                "drop-shadow(0 0 20px currentColor)",
                "drop-shadow(0 0 5px currentColor)"
            ]
        }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }, ...getMotionProps(props), children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx("path", { d: HIVE_PATH, fill: "currentColor" }) }) }));
};
// 4. SEGMENTED ASSEMBLY VARIANT
export const HiveLogoAssembly = ({ variant = "gradient", size = "xl", className, ...props }) => {
    // Split the hexagon into logical segments for animation
    const segments = [
        "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64Z", // Top
        "M169.36,283.04l262.27-150.84l262.47,150.64l-262.47,150.64Z", // Center
        "M169.36,586.2l259.55,150.31l5.53-.33l633.4-365.81l374.52,215.84v433.92Z", // Bottom
    ];
    return (_jsx(motion.div, { className: cn(hiveLogoVariants({ variant, size, className })), ...getMotionProps(props), children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: segments.map((segment, index) => (_jsx(motion.path, { d: segment, fill: "currentColor", initial: { opacity: 0, scale: 0, rotate: -180 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: {
                    delay: index * 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                } }, index))) }) }));
};
// 5. SIMPLIFIED ICON VARIANTS
export const HiveGlyphSimple = ({ variant = "primary", size = "md", className, ...props }) => {
    return (_jsx("div", { className: cn(hiveLogoVariants({ variant, size, className })), ...props, children: _jsxs("svg", { viewBox: "0 0 100 100", fill: "none", className: "w-full h-full", children: [_jsx("polygon", { points: "50,10 85,30 85,70 50,90 15,70 15,30", fill: "currentColor", stroke: "currentColor", strokeWidth: "2" }), _jsx("polygon", { points: "50,25 70,35 70,65 50,75 30,65 30,35", fill: "none", stroke: "currentColor", strokeWidth: "1.5" })] }) }));
};
// 6. OUTLINED VARIANT
export const HiveLogoOutlined = ({ variant = "primary", size = "md", className, ...props }) => {
    return (_jsx("div", { className: cn(hiveLogoVariants({ variant, size, className })), ...props, children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx("path", { d: HIVE_PATH, fill: "none", stroke: "currentColor", strokeWidth: "40", strokeLinejoin: "round", strokeLinecap: "round" }) }) }));
};
// 7. MONOGRAM VARIANT (Just "H")
export const HiveMonogram = ({ variant = "gold", size = "md", className, ...props }) => {
    return (_jsx("div", { className: cn(hiveLogoVariants({ variant, size, className })), ...props, children: _jsxs("svg", { viewBox: "0 0 100 100", fill: "none", className: "w-full h-full", children: [_jsx("polygon", { points: "50,10 85,30 85,70 50,90 15,70 15,30", fill: "currentColor", opacity: "0.1" }), _jsx("text", { x: "50", y: "60", textAnchor: "middle", fill: "currentColor", fontSize: "45", fontWeight: "bold", fontFamily: "system-ui, -apple-system, sans-serif", children: "H" })] }) }));
};
// 8. GLASS MORPHISM VARIANT
export const HiveLogoGlass = ({ size = "lg", className, ...props }) => {
    return (_jsxs(motion.div, { className: cn("relative backdrop-blur-xl bg-[var(--hive-text-primary)]/10 border border-white/20 rounded-2xl p-4", hiveLogoVariants({ size, className })), whileHover: { scale: 1.05, backgroundColor: "color-mix(in_srgb,var(--hive-border-hover)_75%,transparent)" }, ...getMotionProps(props), children: [_jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "glassGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "color-mix(in_srgb,var(--hive-text-primary)_80%,transparent)" }), _jsx("stop", { offset: "100%", stopColor: "var(--hive-border-hover)" })] }) }), _jsx("path", { d: HIVE_PATH, fill: "url(#glassGradient)" })] }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" })] }));
};
// 9. NEON VARIANT
export const HiveLogoNeon = ({ size = "xl", className, ...props }) => {
    return (_jsx(motion.div, { className: cn("relative", hiveLogoVariants({ size, className })), animate: {
            filter: [
                "drop-shadow(0 0 5px var(--hive-status-info)) drop-shadow(0 0 10px var(--hive-status-info))",
                "drop-shadow(0 0 10px var(--hive-status-info)) drop-shadow(0 0 20px var(--hive-status-info)) drop-shadow(0 0 30px var(--hive-status-info))",
                "drop-shadow(0 0 5px var(--hive-status-info)) drop-shadow(0 0 10px var(--hive-status-info))"
            ]
        }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }, ...getMotionProps(props), children: _jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("path", { d: HIVE_PATH, fill: "var(--hive-status-info)" }), _jsx("path", { d: HIVE_PATH, fill: "none", stroke: "var(--hive-text-primary)", strokeWidth: "8", opacity: "0.6" })] }) }));
};
// 10. HOLOGRAPHIC VARIANT
export const HiveLogoHolographic = ({ size = "2xl", className, ...props }) => {
    return (_jsx(motion.div, { className: cn(hiveLogoVariants({ size, className })), animate: { rotateY: [0, 360] }, transition: { duration: 4, repeat: Infinity, ease: "linear" }, style: { perspective: "1000px" }, ...getMotionProps(props), children: _jsx(motion.div, { style: { transformStyle: "preserve-3d" }, animate: { rotateX: [0, 15, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }, children: _jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "holoGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "var(--hive-brand-secondary)" }), _jsx("stop", { offset: "25%", stopColor: "var(--hive-status-info)" }), _jsx("stop", { offset: "50%", stopColor: "var(--hive-status-warning)" }), _jsx("stop", { offset: "75%", stopColor: "var(--hive-status-error)" }), _jsx("stop", { offset: "100%", stopColor: "var(--hive-brand-secondary)" })] }) }), _jsx("path", { d: HIVE_PATH, fill: "url(#holoGradient)" })] }) }) }));
};
// 11. PARTICLE FORMATION VARIANT
export const HiveLogoParticles = ({ variant = "gold", size = "xl", className, ...props }) => {
    const particles = Array.from({ length: 20 }, (_, i) => i);
    return (_jsxs("div", { className: cn("relative", hiveLogoVariants({ variant, size, className })), ...props, children: [particles.map((particle) => (_jsx(motion.div, { className: "absolute w-1 h-1 bg-current rounded-full", initial: {
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: 0,
                }, animate: {
                    x: 0,
                    y: 0,
                    opacity: [0, 1, 0],
                }, transition: {
                    delay: particle * 0.1,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                }, style: {
                    left: "50%",
                    top: "50%",
                } }, particle))), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 2, duration: 0.5 }, children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx("path", { d: HIVE_PATH, fill: "currentColor" }) }) })] }));
};
// 12. PROGRESS INDICATOR VARIANT
export const HiveLogoProgress = ({ progress = 0, variant = "gold", size = "lg", className, ...props }) => {
    return (_jsxs("div", { className: cn("relative", hiveLogoVariants({ variant, size, className })), ...props, children: [_jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full absolute", children: _jsx("path", { d: HIVE_PATH, fill: "currentColor", opacity: "0.2" }) }), _jsxs("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: [_jsx("defs", { children: _jsx("clipPath", { id: `progress-clip-${Math.random()}`, children: _jsx("rect", { x: "0", y: "0", width: "1500", height: 1500 * (progress / 100) }) }) }), _jsx("path", { d: HIVE_PATH, fill: "currentColor", clipPath: `url(#progress-clip-${Math.random()})` })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "text-xs font-bold text-current", children: [Math.round(progress), "%"] }) })] }));
};
// 13. CONTEXTUAL VARIANTS
export const HiveLogoContextual = ({ context = "default", size = "md", className, ...props }) => {
    const contextVariants = {
        loading: { variant: "primary", effect: "spin" },
        success: { variant: "gold", effect: "bounce" },
        error: { variant: "primary", effect: "pulse" },
        warning: { variant: "gold", effect: "pulse" },
        default: { variant: "primary", effect: "none" },
    };
    const { variant, effect } = contextVariants[context];
    return (_jsx("div", { className: cn(hiveLogoVariants({ variant, size, effect, className })), ...props, children: _jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: "w-full h-full", children: _jsx("path", { d: HIVE_PATH, fill: "currentColor" }) }) }));
};
// Export all variants
export { HiveLogoAnimated as AnimatedLogo, HiveLogoSpinner as SpinnerLogo, HiveLogoPulse as PulseLogo, HiveLogoAssembly as AssemblyLogo, HiveGlyphSimple as SimpleLogo, HiveLogoOutlined as OutlinedLogo, HiveMonogram as MonogramLogo, HiveLogoGlass as GlassLogo, HiveLogoNeon as NeonLogo, HiveLogoHolographic as HolographicLogo, HiveLogoParticles as ParticlesLogo, HiveLogoProgress as ProgressLogo, HiveLogoContextual as ContextualLogo, };
//# sourceMappingURL=hive-logo-variants.js.map