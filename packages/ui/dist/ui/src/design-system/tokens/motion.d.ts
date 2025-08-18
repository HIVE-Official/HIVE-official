/**
 * HIVE Motion System
 * Semantic motion tokens aligned with PRD design system
 */
export declare const motion: {
    readonly duration: {
        readonly fast: "var(--hive-duration-fast)";
        readonly base: "var(--hive-duration-base)";
        readonly slow: "var(--hive-duration-slow)";
        readonly slower: "var(--hive-duration-slower)";
    };
    readonly easing: {
        readonly out: "var(--hive-ease-out)";
        readonly inOut: "var(--hive-ease-in-out)";
        readonly smooth: "var(--hive-ease-smooth)";
    };
    readonly liquidMetal: {
        readonly subtle: "var(--hive-liquid-subtle)";
        readonly smooth: "var(--hive-liquid-smooth)";
        readonly bouncy: "var(--hive-liquid-bouncy)";
    };
    readonly components: {
        readonly button: {
            readonly duration: "var(--hive-duration-fast)";
            readonly easing: "var(--hive-ease-out)";
        };
        readonly modal: {
            readonly duration: "var(--hive-duration-base)";
            readonly easing: "var(--hive-liquid-smooth)";
        };
        readonly tooltip: {
            readonly duration: "var(--hive-duration-fast)";
            readonly easing: "var(--hive-ease-out)";
        };
        readonly page: {
            readonly duration: "var(--hive-duration-slow)";
            readonly easing: "var(--hive-liquid-subtle)";
        };
    };
};
export type MotionToken = keyof typeof motion;
export type DurationToken = keyof typeof motion.duration;
export type EasingToken = keyof typeof motion.easing;
export type LiquidMetalEasing = keyof typeof motion.liquidMetal;
//# sourceMappingURL=motion.d.ts.map