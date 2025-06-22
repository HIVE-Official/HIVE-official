export declare const motion: {
    readonly duration: {
        readonly fast: "90ms";
        readonly content: "220ms";
        readonly slow: "300ms";
        readonly instant: "90ms";
        readonly base: "220ms";
        readonly slower: "300ms";
    };
    readonly easing: {
        readonly standard: "cubic-bezier(0.22, 0.61, 0.36, 1)";
        readonly spring: "cubic-bezier(0.22, 0.61, 0.36, 1)";
        readonly smooth: "cubic-bezier(0.22, 0.61, 0.36, 1)";
        readonly swift: "cubic-bezier(0.22, 0.61, 0.36, 1)";
        readonly linear: "linear";
        readonly ease: "ease";
        readonly "ease-in": "ease-in";
        readonly "ease-out": "ease-out";
        readonly "ease-in-out": "ease-in-out";
    };
    readonly scale: {
        readonly none: "1";
        readonly subtle: "1.02";
        readonly small: "1.05";
        readonly medium: "1.1";
        readonly large: "1.25";
    };
    readonly origin: {
        readonly center: "center";
        readonly top: "top";
        readonly "top-right": "top right";
        readonly right: "right";
        readonly "bottom-right": "bottom right";
        readonly bottom: "bottom";
        readonly "bottom-left": "bottom left";
        readonly left: "left";
        readonly "top-left": "top left";
    };
    readonly keyframes: {
        readonly fadeIn: {
            readonly from: {
                readonly opacity: "0";
            };
            readonly to: {
                readonly opacity: "1";
            };
        };
        readonly fadeOut: {
            readonly from: {
                readonly opacity: "1";
            };
            readonly to: {
                readonly opacity: "0";
            };
        };
        readonly scaleIn: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "scale(0.95)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "scale(1)";
            };
        };
        readonly scaleOut: {
            readonly from: {
                readonly opacity: "1";
                readonly transform: "scale(1)";
            };
            readonly to: {
                readonly opacity: "0";
                readonly transform: "scale(0.95)";
            };
        };
        readonly slideInFromTop: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateY(-20px)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateY(0)";
            };
        };
        readonly slideInFromBottom: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateY(20px)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateY(0)";
            };
        };
        readonly slideInFromLeft: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateX(-20px)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateX(0)";
            };
        };
        readonly slideInFromRight: {
            readonly from: {
                readonly opacity: "0";
                readonly transform: "translateX(20px)";
            };
            readonly to: {
                readonly opacity: "1";
                readonly transform: "translateX(0)";
            };
        };
        readonly shakeMicro: {
            readonly "0%, 100%": {
                readonly transform: "translateX(0)";
            };
            readonly "25%": {
                readonly transform: "translateX(-2px)";
            };
            readonly "75%": {
                readonly transform: "translateX(2px)";
            };
        };
        readonly pulseSubtle: {
            readonly "0%, 100%": {
                readonly transform: "scale(1)";
            };
            readonly "50%": {
                readonly transform: "scale(1.02)";
            };
        };
        readonly spin: {
            readonly from: {
                readonly transform: "rotate(0deg)";
            };
            readonly to: {
                readonly transform: "rotate(360deg)";
            };
        };
        readonly pulse: {
            readonly "0%, 100%": {
                readonly opacity: "1";
            };
            readonly "50%": {
                readonly opacity: "0.5";
            };
        };
        readonly ritualBurst: {
            readonly "0%": {
                readonly transform: "scale(1) rotate(0deg)";
                readonly opacity: "1";
            };
            readonly "50%": {
                readonly transform: "scale(1.1) rotate(180deg)";
                readonly opacity: "0.8";
            };
            readonly "100%": {
                readonly transform: "scale(1) rotate(360deg)";
                readonly opacity: "1";
            };
        };
    };
    readonly animations: {
        readonly buttonHover: {
            readonly duration: "90ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly transform: "scale(1.02)";
        };
        readonly modalEnter: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "scaleIn";
        };
        readonly modalExit: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "scaleOut";
        };
        readonly pageEnter: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "slideInFromRight";
        };
        readonly pageExit: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "slideInFromLeft";
        };
        readonly errorShake: {
            readonly duration: "90ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "shakeMicro";
        };
        readonly successPulse: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "pulseSubtle";
        };
        readonly ritualCelebration: {
            readonly duration: "300ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "ritualBurst";
        };
        readonly spinner: {
            readonly duration: "1000ms";
            readonly easing: "linear";
            readonly keyframes: "spin";
            readonly iterationCount: "infinite";
        };
        readonly toastEnter: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "slideInFromTop";
        };
        readonly toastExit: {
            readonly duration: "220ms";
            readonly easing: "cubic-bezier(0.22, 0.61, 0.36, 1)";
            readonly keyframes: "slideInFromTop";
        };
    };
    readonly reducedMotion: {
        readonly prefersReducedMotion: "@media (prefers-reduced-motion: reduce)";
        readonly fallback: {
            readonly duration: "0.01ms";
            readonly easing: "linear";
            readonly transform: "none";
        };
    };
};
export declare const createAnimation: (keyframes: string, duration?: keyof typeof motion.duration, easing?: string, // Use standard easing by default
fillMode?: string) => {
    animation: string;
};
export declare const createTransition: (property?: string, duration?: keyof typeof motion.duration, easing?: string) => {
    transition: string;
};
export declare const createHoverEffect: (scale?: keyof typeof motion.scale) => {
    transform: string;
    transition: string;
};
export declare const createFocusRing: () => {
    outline: string;
    outlineOffset: string;
    transition: string;
};
export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;
export type MotionScale = keyof typeof motion.scale;
export type MotionKeyframes = keyof typeof motion.keyframes;
export type MotionAnimation = keyof typeof motion.animations;
export declare const MOTION_COMPLIANCE: {
    readonly rules: readonly ["Use 90ms for ALL micro-interactions (hover, focus, press)", "Use 220ms for ALL content transitions (page changes, components)", "Use 300ms ONLY for ritual theatrics and special moments", "Use SINGLE easing curve: cubic-bezier(0.22, 0.61, 0.36, 1)", "Respect prefers-reduced-motion user preferences", "No other timing values allowed without brand approval"];
    readonly violations: readonly ["Multiple easing curves", "150ms, 200ms, or other non-approved timings", "Ignoring reduced motion preferences", "Using ease, ease-out, or other basic CSS easing"];
};
export default motion;
//# sourceMappingURL=motion.d.ts.map