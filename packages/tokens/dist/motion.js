// HIVE Brand System v1.0 - Motion Tokens (CORRECTED)
// Aligned with /memory-bank/hive-brand-system.md
export const motion = {
    // Core durations - CORRECTED TO MATCH BRAND SYSTEM
    duration: {
        fast: "90ms", // Micro-interactions, hover states (CORRECTED)
        content: "220ms", // Content transitions, page changes (CORRECTED)
        slow: "300ms", // Ritual theatrics only (CORRECTED)
        // Legacy aliases for backward compatibility
        instant: "90ms", // Maps to fast
        base: "220ms", // Maps to content
        slower: "300ms", // Maps to slow
    },
    // Timing functions - CORRECTED TO SINGLE EASING
    easing: {
        // SINGLE APPROVED EASING for all animations
        standard: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
        // Legacy aliases (all map to standard for consistency)
        spring: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        smooth: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        swift: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        // Basic CSS easing (discouraged, use standard)
        linear: "linear",
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
    },
    // Scale values for transforms
    scale: {
        none: "1",
        subtle: "1.02", // Button hover - CORRECTED to match brand
        small: "1.05", // Card hover
        medium: "1.1", // Emphasis
        large: "1.25", // Strong emphasis
    },
    // Transform origins
    origin: {
        center: "center",
        top: "top",
        "top-right": "top right",
        right: "right",
        "bottom-right": "bottom right",
        bottom: "bottom",
        "bottom-left": "bottom left",
        left: "left",
        "top-left": "top left",
    },
    // Animation keyframes
    keyframes: {
        // Fade animations
        fadeIn: {
            from: { opacity: "0" },
            to: { opacity: "1" },
        },
        fadeOut: {
            from: { opacity: "1" },
            to: { opacity: "0" },
        },
        // Scale animations
        scaleIn: {
            from: {
                opacity: "0",
                transform: "scale(0.95)",
            },
            to: {
                opacity: "1",
                transform: "scale(1)",
            },
        },
        scaleOut: {
            from: {
                opacity: "1",
                transform: "scale(1)",
            },
            to: {
                opacity: "0",
                transform: "scale(0.95)",
            },
        },
        // Slide animations
        slideInFromTop: {
            from: {
                opacity: "0",
                transform: "translateY(-20px)",
            },
            to: {
                opacity: "1",
                transform: "translateY(0)",
            },
        },
        slideInFromBottom: {
            from: {
                opacity: "0",
                transform: "translateY(20px)",
            },
            to: {
                opacity: "1",
                transform: "translateY(0)",
            },
        },
        slideInFromLeft: {
            from: {
                opacity: "0",
                transform: "translateX(-20px)",
            },
            to: {
                opacity: "1",
                transform: "translateX(0)",
            },
        },
        slideInFromRight: {
            from: {
                opacity: "0",
                transform: "translateX(20px)",
            },
            to: {
                opacity: "1",
                transform: "translateX(0)",
            },
        },
        // Micro-interaction animations (brand-specific)
        shakeMicro: {
            "0%, 100%": { transform: "translateX(0)" },
            "25%": { transform: "translateX(-2px)" },
            "75%": { transform: "translateX(2px)" },
        },
        pulseSubtle: {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.02)" },
        },
        // Spin animation for loading states
        spin: {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
        },
        // Pulse animation for loading states
        pulse: {
            "0%, 100%": { opacity: "1" },
            "50%": { opacity: "0.5" },
        },
        // Ritual celebration (300ms timing)
        ritualBurst: {
            "0%": {
                transform: "scale(1) rotate(0deg)",
                opacity: "1",
            },
            "50%": {
                transform: "scale(1.1) rotate(180deg)",
                opacity: "0.8",
            },
            "100%": {
                transform: "scale(1) rotate(360deg)",
                opacity: "1",
            },
        },
    },
    // Pre-defined animations - CORRECTED TO MATCH BRAND TIMINGS
    animations: {
        // Button interactions - CORRECTED TIMING
        buttonHover: {
            duration: "90ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            transform: "scale(1.02)",
        },
        // Modal animations - CORRECTED TIMING
        modalEnter: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "scaleIn",
        },
        modalExit: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "scaleOut",
        },
        // Page transitions - CORRECTED TIMING
        pageEnter: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "slideInFromRight",
        },
        pageExit: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "slideInFromLeft",
        },
        // Status feedback animations (motion-based, no colors)
        errorShake: {
            duration: "90ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "shakeMicro",
        },
        successPulse: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "pulseSubtle",
        },
        // Ritual animations - ONLY 300ms timing allowed
        ritualCelebration: {
            duration: "300ms", // Ritual timing
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            keyframes: "ritualBurst",
        },
        // Loading states
        spinner: {
            duration: "1000ms",
            easing: "linear",
            keyframes: "spin",
            iterationCount: "infinite",
        },
        // Notification animations
        toastEnter: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "slideInFromTop",
        },
        toastExit: {
            duration: "220ms", // CORRECTED
            easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", // CORRECTED
            keyframes: "slideInFromTop",
        },
    },
    // Reduced motion support
    reducedMotion: {
        // Respect user preferences
        prefersReducedMotion: "@media (prefers-reduced-motion: reduce)",
        // Fallback animations for reduced motion
        fallback: {
            duration: "0.01ms", // Near-instant
            easing: "linear",
            transform: "none",
        },
    },
};
// ============================================================================
// UTILITY FUNCTIONS - CORRECTED
// ============================================================================
export const createAnimation = (keyframes, duration = "content", easing = motion.easing.standard, // Use standard easing by default
fillMode = "both") => {
    return {
        animation: `${keyframes} ${motion.duration[duration]} ${easing} ${fillMode}`,
    };
};
export const createTransition = (property = "all", duration = "fast", easing = motion.easing.standard // Use standard easing by default
) => {
    return {
        transition: `${property} ${motion.duration[duration]} ${easing}`,
    };
};
// Brand-compliant hover effect
export const createHoverEffect = (scale = "subtle") => {
    return {
        transform: `scale(${motion.scale[scale]})`,
        transition: `transform ${motion.duration.fast} ${motion.easing.standard}`,
    };
};
// Focus ring animation
export const createFocusRing = () => {
    return {
        outline: "2px solid #FFD700", // Gold focus ring
        outlineOffset: "2px",
        transition: `outline ${motion.duration.fast} ${motion.easing.standard}`,
    };
};
// ============================================================================
// BRAND COMPLIANCE RULES
// ============================================================================
export const MOTION_COMPLIANCE = {
    rules: [
        "Use 90ms for ALL micro-interactions (hover, focus, press)",
        "Use 220ms for ALL content transitions (page changes, components)",
        "Use 300ms ONLY for ritual theatrics and special moments",
        "Use SINGLE easing curve: cubic-bezier(0.22, 0.61, 0.36, 1)",
        "Respect prefers-reduced-motion user preferences",
        "No other timing values allowed without brand approval",
    ],
    violations: [
        "Multiple easing curves",
        "150ms, 200ms, or other non-approved timings",
        "Ignoring reduced motion preferences",
        "Using ease, ease-out, or other basic CSS easing",
    ],
};
// Export default
export default motion;
// Brand compliance note: This file enforces the corrected brand timings:
// - Fast: 90ms (not 150ms)
// - Content: 220ms (not 200ms)
// - Single easing: cubic-bezier(0.22, 0.61, 0.36, 1)
// - All animations use approved timings only
//# sourceMappingURL=motion.js.map