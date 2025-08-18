/**
 * HIVE Motion System
 * Standardized animation curves and durations following brand guidelines
 */
export declare const HIVE_MOTION_CURVE: readonly [0.33, 0.65, 0, 1];
export declare const HIVE_MOTION_CURVE_CSS = "cubic-bezier(0.33, 0.65, 0, 1)";
export declare const HIVE_DURATIONS: {
    /** Micro-interactions: Button hovers, icon changes */
    readonly micro: 90;
    /** Standard: Panel slides, card flips, most UI transitions */
    readonly standard: 180;
    /** Complex: Page transitions, complex animations */
    readonly complex: 240;
    /** Cinematic: Hero animations, celebration moments */
    readonly cinematic: 400;
};
export declare const hiveMotion: {
    /** Standard HIVE transition for most UI elements */
    readonly standard: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
    /** Quick micro-interactions */
    readonly micro: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
    /** Complex animations and page transitions */
    readonly complex: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
    /** Cinematic moments like onboarding celebrations */
    readonly cinematic: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
};
export declare const hiveTransition: {
    /** Standard transition for most elements */
    readonly standard: "all 180ms cubic-bezier(0.33, 0.65, 0, 1)";
    /** Quick micro-interactions */
    readonly micro: "all 90ms cubic-bezier(0.33, 0.65, 0, 1)";
    /** Complex animations */
    readonly complex: "all 240ms cubic-bezier(0.33, 0.65, 0, 1)";
    /** Cinematic moments */
    readonly cinematic: "all 400ms cubic-bezier(0.33, 0.65, 0, 1)";
    /** Property-specific transitions */
    readonly opacity: "opacity 180ms cubic-bezier(0.33, 0.65, 0, 1)";
    readonly transform: "transform 180ms cubic-bezier(0.33, 0.65, 0, 1)";
    readonly colors: "background-color 180ms cubic-bezier(0.33, 0.65, 0, 1), border-color 180ms cubic-bezier(0.33, 0.65, 0, 1), color 180ms cubic-bezier(0.33, 0.65, 0, 1)";
};
export declare const hiveTailwindTransition: {
    /** Standard transition classes for Tailwind */
    readonly standard: "transition-all duration-[180ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
    readonly micro: "transition-all duration-[90ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
    readonly complex: "transition-all duration-[240ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
    readonly cinematic: "transition-all duration-[400ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
};
export declare const hiveAnimations: {
    /** Fade in animation */
    readonly fadeIn: {
        readonly initial: {
            readonly opacity: 0;
        };
        readonly animate: {
            readonly opacity: 1;
        };
        readonly transition: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    /** Slide up animation */
    readonly slideUp: {
        readonly initial: {
            readonly opacity: 0;
            readonly y: 20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly y: 0;
        };
        readonly transition: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    /** Scale in animation */
    readonly scaleIn: {
        readonly initial: {
            readonly opacity: 0;
            readonly scale: 0.95;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly scale: 1;
        };
        readonly transition: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    /** Button press animation */
    readonly buttonPress: {
        readonly whileTap: {
            readonly scale: 0.98;
        };
        readonly transition: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    /** Card hover animation */
    readonly cardHover: {
        readonly whileHover: {
            readonly y: -2;
            readonly scale: 1.01;
        };
        readonly transition: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    /** Stagger children animation */
    readonly staggerChildren: {
        readonly animate: {
            readonly transition: {
                readonly staggerChildren: 0.05;
                readonly delayChildren: 0.1;
            };
        };
    };
};
export declare const campusEnergyMotion: {
    /** High energy periods - faster, more dynamic */
    readonly high: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
    /** Focus periods - slower, more deliberate */
    readonly focus: {
        readonly duration: number;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
    /** Transition periods - balanced */
    readonly transition: {
        readonly duration: 180;
        readonly ease: readonly [0.33, 0.65, 0, 1];
    };
};
export declare const isHiveMotion: (transition: string) => boolean;
declare const _default: {
    curve: readonly [0.33, 0.65, 0, 1];
    curveCss: string;
    durations: {
        /** Micro-interactions: Button hovers, icon changes */
        readonly micro: 90;
        /** Standard: Panel slides, card flips, most UI transitions */
        readonly standard: 180;
        /** Complex: Page transitions, complex animations */
        readonly complex: 240;
        /** Cinematic: Hero animations, celebration moments */
        readonly cinematic: 400;
    };
    motion: {
        /** Standard HIVE transition for most UI elements */
        readonly standard: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
        /** Quick micro-interactions */
        readonly micro: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
        /** Complex animations and page transitions */
        readonly complex: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
        /** Cinematic moments like onboarding celebrations */
        readonly cinematic: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    transition: {
        /** Standard transition for most elements */
        readonly standard: "all 180ms cubic-bezier(0.33, 0.65, 0, 1)";
        /** Quick micro-interactions */
        readonly micro: "all 90ms cubic-bezier(0.33, 0.65, 0, 1)";
        /** Complex animations */
        readonly complex: "all 240ms cubic-bezier(0.33, 0.65, 0, 1)";
        /** Cinematic moments */
        readonly cinematic: "all 400ms cubic-bezier(0.33, 0.65, 0, 1)";
        /** Property-specific transitions */
        readonly opacity: "opacity 180ms cubic-bezier(0.33, 0.65, 0, 1)";
        readonly transform: "transform 180ms cubic-bezier(0.33, 0.65, 0, 1)";
        readonly colors: "background-color 180ms cubic-bezier(0.33, 0.65, 0, 1), border-color 180ms cubic-bezier(0.33, 0.65, 0, 1), color 180ms cubic-bezier(0.33, 0.65, 0, 1)";
    };
    tailwind: {
        /** Standard transition classes for Tailwind */
        readonly standard: "transition-all duration-[180ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
        readonly micro: "transition-all duration-[90ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
        readonly complex: "transition-all duration-[240ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
        readonly cinematic: "transition-all duration-[400ms] ease-[cubic-bezier(0.33, 0.65, 0, 1)]";
    };
    animations: {
        /** Fade in animation */
        readonly fadeIn: {
            readonly initial: {
                readonly opacity: 0;
            };
            readonly animate: {
                readonly opacity: 1;
            };
            readonly transition: {
                readonly duration: number;
                readonly ease: readonly [0.33, 0.65, 0, 1];
            };
        };
        /** Slide up animation */
        readonly slideUp: {
            readonly initial: {
                readonly opacity: 0;
                readonly y: 20;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly y: 0;
            };
            readonly transition: {
                readonly duration: number;
                readonly ease: readonly [0.33, 0.65, 0, 1];
            };
        };
        /** Scale in animation */
        readonly scaleIn: {
            readonly initial: {
                readonly opacity: 0;
                readonly scale: 0.95;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly scale: 1;
            };
            readonly transition: {
                readonly duration: number;
                readonly ease: readonly [0.33, 0.65, 0, 1];
            };
        };
        /** Button press animation */
        readonly buttonPress: {
            readonly whileTap: {
                readonly scale: 0.98;
            };
            readonly transition: {
                readonly duration: number;
                readonly ease: readonly [0.33, 0.65, 0, 1];
            };
        };
        /** Card hover animation */
        readonly cardHover: {
            readonly whileHover: {
                readonly y: -2;
                readonly scale: 1.01;
            };
            readonly transition: {
                readonly duration: number;
                readonly ease: readonly [0.33, 0.65, 0, 1];
            };
        };
        /** Stagger children animation */
        readonly staggerChildren: {
            readonly animate: {
                readonly transition: {
                    readonly staggerChildren: 0.05;
                    readonly delayChildren: 0.1;
                };
            };
        };
    };
    campusEnergy: {
        /** High energy periods - faster, more dynamic */
        readonly high: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
        /** Focus periods - slower, more deliberate */
        readonly focus: {
            readonly duration: number;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
        /** Transition periods - balanced */
        readonly transition: {
            readonly duration: 180;
            readonly ease: readonly [0.33, 0.65, 0, 1];
        };
    };
    isHiveMotion: (transition: string) => boolean;
};
export default _default;
//# sourceMappingURL=hive-motion.d.ts.map