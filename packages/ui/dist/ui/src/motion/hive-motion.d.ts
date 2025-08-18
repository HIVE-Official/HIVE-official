export declare const hiveEasing: {
    readonly magnetic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    readonly liquid: "cubic-bezier(0.23, 1, 0.32, 1)";
    readonly silk: "cubic-bezier(0.16, 1, 0.3, 1)";
    readonly steel: "cubic-bezier(0.34, 1.56, 0.64, 1)";
    readonly molten: "cubic-bezier(0.19, 1, 0.22, 1)";
    readonly snap: "cubic-bezier(0.25, 0.1, 0.25, 1)";
};
export declare const hiveDuration: {
    readonly instant: "100ms";
    readonly snap: "150ms";
    readonly smooth: "250ms";
    readonly liquid: "350ms";
    readonly flow: "500ms";
    readonly cascade: "750ms";
    readonly cinematic: "1000ms";
};
export declare const hiveMotion: {
    readonly hoverLift: {
        readonly transform: "translateY(-0.5) scale(1.01)";
        readonly boxShadow: "0 2 6 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)";
    };
    readonly buttonPress: {
        readonly transform: "translateY(1px) scale(0.98)";
        readonly transition: "all 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };
    readonly cardFloat: {
        readonly transform: "translateY(-1)";
        readonly boxShadow: "0 3 10 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
        readonly transition: "all 350ms cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly magneticSelect: {
        readonly transform: "scale(1.02)";
        readonly boxShadow: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent), 0 2 6 color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)";
        readonly transition: "all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };
    readonly rippleBase: {
        readonly position: "relative";
        readonly overflow: "hidden";
    };
    readonly fadeCascade: {
        readonly opacity: 0;
        readonly transform: "translateY(5)";
        readonly transition: "opacity 350ms cubic-bezier(0.19, 1, 0.22, 1), transform 350ms cubic-bezier(0.19, 1, 0.22, 1)";
    };
    readonly revealed: {
        readonly opacity: 1;
        readonly transform: "translateY(0)";
    };
};
export declare const createStaggerDelay: (index: number, baseDelay?: number) => string;
export declare const createRippleKeyframes: () => string;
export declare const createShimmerKeyframes: () => string;
export declare const createFloatKeyframes: () => string;
export declare const createHiveAnimation: (keyframes: string, duration?: keyof typeof hiveDuration, easing?: keyof typeof hiveEasing, iterations?: number | "infinite") => {
    animation: string;
};
export declare const hiveVariants: {
    readonly spaceActivation: {
        readonly hidden: {
            readonly scale: 0.8;
            readonly opacity: 0;
        };
        readonly visible: {
            readonly scale: 1;
            readonly opacity: 1;
            readonly transition: {
                readonly duration: 0.5;
                readonly ease: readonly [0.25, 0.46, 0.45, 0.94];
                readonly staggerChildren: 0.1;
            };
        };
    };
    readonly toolPlant: {
        readonly hidden: {
            readonly y: -50;
            readonly scale: 0.8;
            readonly opacity: 0;
        };
        readonly planted: {
            readonly y: 0;
            readonly scale: 1;
            readonly opacity: 1;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 0.8;
            };
        };
    };
    readonly feedCascade: {
        readonly hidden: {
            readonly y: 20;
            readonly opacity: 0;
        };
        readonly visible: (i: number) => {
            y: number;
            opacity: number;
            transition: {
                delay: number;
                duration: number;
                ease: number[];
            };
        };
    };
    readonly bentoPiece: {
        readonly hidden: {
            readonly scale: 0.8;
            readonly opacity: 0;
            readonly rotateY: -10;
        };
        readonly visible: (i: number) => {
            scale: number;
            opacity: number;
            rotateY: number;
            transition: {
                delay: number;
                duration: number;
                ease: number[];
            };
        };
    };
    readonly hoverScale: {
        readonly rest: {
            readonly scale: 1;
        };
        readonly hover: {
            readonly scale: 1.02;
            readonly transition: {
                readonly duration: 0.25;
                readonly ease: readonly [0.16, 1, 0.3, 1];
            };
        };
    };
    readonly pressScale: {
        readonly rest: {
            readonly scale: 1;
        };
        readonly press: {
            readonly scale: 0.98;
            readonly transition: {
                readonly duration: 0.1;
                readonly ease: readonly [0.25, 0.1, 0.25, 1];
            };
        };
    };
};
export declare const hiveGPULayers: {
    readonly willChange: "transform, opacity, box-shadow";
    readonly transform: "translateZ(0)";
    readonly backfaceVisibility: "hidden";
    readonly perspective: 1000;
};
export declare const respectsReducedMotion: (styles: Record<string, unknown>) => {
    '@media (prefers-reduced-motion: reduce)': {
        animation: string;
        transition: string;
    };
};
export type HiveEasing = keyof typeof hiveEasing;
export type HiveDuration = keyof typeof hiveDuration;
//# sourceMappingURL=hive-motion.d.ts.map