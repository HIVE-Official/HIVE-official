/**
 * HIVE Layout Composition System - PRODUCTION READY
 * Practical layout patterns for building campus social platform
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
export declare const spacing: {
    readonly 0: "var(--hive-space-0)";
    readonly 1: "var(--hive-space-1)";
    readonly 2: "var(--hive-space-2)";
    readonly 3: "var(--hive-space-3)";
    readonly 4: "var(--hive-space-4)";
    readonly 5: "var(--hive-space-5)";
    readonly 6: "var(--hive-space-6)";
    readonly 8: "var(--hive-space-8)";
    readonly 10: "var(--hive-space-10)";
    readonly 12: "var(--hive-space-12)";
    readonly 16: "var(--hive-space-16)";
};
export declare const containers: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1200px";
    readonly full: "100%";
    readonly feed: "680px";
    readonly profile: "900px";
    readonly tools: "100%";
};
export declare const grids: {
    readonly cards: "repeat(auto-fill, minmax(280px, 1fr))";
    readonly wide: "repeat(auto-fill, minmax(320px, 1fr))";
    readonly narrow: "repeat(auto-fill, minmax(240px, 1fr))";
    readonly sidebar: "1fr 280px";
    readonly twoCol: "1fr 1fr";
    readonly threeCol: "1fr 1fr 1fr";
    readonly asymmetric: "2fr 1fr";
};
export declare const utils: {
    readonly flex: {
        readonly row: "flex flex-row";
        readonly col: "flex flex-col";
        readonly wrap: "flex flex-wrap";
        readonly center: "flex items-center justify-center";
        readonly between: "flex items-center justify-between";
        readonly start: "flex items-start";
        readonly end: "flex items-end";
    };
    readonly grid: {
        readonly cols1: "grid grid-cols-1";
        readonly cols2: "grid grid-cols-2";
        readonly cols3: "grid grid-cols-3";
        readonly auto: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]";
    };
    readonly gap: {
        readonly 1: "gap-1";
        readonly 2: "gap-2";
        readonly 3: "gap-3";
        readonly 4: "gap-4";
        readonly 6: "gap-6";
        readonly 8: "gap-8";
    };
    readonly p: {
        readonly 2: "p-2";
        readonly 3: "p-3";
        readonly 4: "p-4";
        readonly 5: "p-5";
        readonly 6: "p-6";
    };
};
export declare const layouts: {
    readonly feed: {
        readonly container: "max-w-[680px] mx-auto p-4 flex flex-col gap-4";
        readonly post: "p-5 flex flex-col gap-3";
    };
    readonly spaces: {
        readonly grid: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-4";
        readonly card: "p-5 flex flex-col gap-2";
    };
    readonly profile: {
        readonly container: "max-w-[900px] mx-auto p-4";
        readonly header: "flex items-center justify-between mb-6 flex-col md:flex-row md:items-center";
        readonly bento: "grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 auto-rows-[minmax(200px,auto)]";
    };
    readonly tools: {
        readonly builder: "grid grid-cols-1 lg:grid-cols-[320px_1fr] h-screen";
        readonly marketplace: "grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4";
    };
    readonly page: {
        readonly main: "max-w-[1200px] mx-auto p-4";
        readonly sidebar: "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8";
    };
};
export declare const breakpoints: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
};
export declare const responsive: {
    readonly mobileOnly: "md:hidden";
    readonly desktopOnly: "hidden md:block";
    readonly stack: "flex flex-col md:flex-row";
    readonly stackReverse: "flex flex-col-reverse md:flex-row";
    readonly grid: {
        readonly 1: "grid grid-cols-1";
        readonly 2: "grid grid-cols-1 md:grid-cols-2";
        readonly 3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        readonly 4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    };
};
export declare const touch: {
    readonly minHeight: "44px";
    readonly minWidth: "44px";
    readonly comfortable: "48px";
    readonly large: "56px";
    readonly padding: "var(--hive-space-3)";
    readonly gap: "var(--hive-space-4)";
};
export declare const layoutComposition: {
    readonly spacing: {
        readonly 0: "var(--hive-space-0)";
        readonly 1: "var(--hive-space-1)";
        readonly 2: "var(--hive-space-2)";
        readonly 3: "var(--hive-space-3)";
        readonly 4: "var(--hive-space-4)";
        readonly 5: "var(--hive-space-5)";
        readonly 6: "var(--hive-space-6)";
        readonly 8: "var(--hive-space-8)";
        readonly 10: "var(--hive-space-10)";
        readonly 12: "var(--hive-space-12)";
        readonly 16: "var(--hive-space-16)";
    };
    readonly containers: {
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1200px";
        readonly full: "100%";
        readonly feed: "680px";
        readonly profile: "900px";
        readonly tools: "100%";
    };
    readonly grids: {
        readonly cards: "repeat(auto-fill, minmax(280px, 1fr))";
        readonly wide: "repeat(auto-fill, minmax(320px, 1fr))";
        readonly narrow: "repeat(auto-fill, minmax(240px, 1fr))";
        readonly sidebar: "1fr 280px";
        readonly twoCol: "1fr 1fr";
        readonly threeCol: "1fr 1fr 1fr";
        readonly asymmetric: "2fr 1fr";
    };
    readonly utils: {
        readonly flex: {
            readonly row: "flex flex-row";
            readonly col: "flex flex-col";
            readonly wrap: "flex flex-wrap";
            readonly center: "flex items-center justify-center";
            readonly between: "flex items-center justify-between";
            readonly start: "flex items-start";
            readonly end: "flex items-end";
        };
        readonly grid: {
            readonly cols1: "grid grid-cols-1";
            readonly cols2: "grid grid-cols-2";
            readonly cols3: "grid grid-cols-3";
            readonly auto: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]";
        };
        readonly gap: {
            readonly 1: "gap-1";
            readonly 2: "gap-2";
            readonly 3: "gap-3";
            readonly 4: "gap-4";
            readonly 6: "gap-6";
            readonly 8: "gap-8";
        };
        readonly p: {
            readonly 2: "p-2";
            readonly 3: "p-3";
            readonly 4: "p-4";
            readonly 5: "p-5";
            readonly 6: "p-6";
        };
    };
    readonly layouts: {
        readonly feed: {
            readonly container: "max-w-[680px] mx-auto p-4 flex flex-col gap-4";
            readonly post: "p-5 flex flex-col gap-3";
        };
        readonly spaces: {
            readonly grid: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-4";
            readonly card: "p-5 flex flex-col gap-2";
        };
        readonly profile: {
            readonly container: "max-w-[900px] mx-auto p-4";
            readonly header: "flex items-center justify-between mb-6 flex-col md:flex-row md:items-center";
            readonly bento: "grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 auto-rows-[minmax(200px,auto)]";
        };
        readonly tools: {
            readonly builder: "grid grid-cols-1 lg:grid-cols-[320px_1fr] h-screen";
            readonly marketplace: "grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4";
        };
        readonly page: {
            readonly main: "max-w-[1200px] mx-auto p-4";
            readonly sidebar: "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8";
        };
    };
    readonly breakpoints: {
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
    };
    readonly responsive: {
        readonly mobileOnly: "md:hidden";
        readonly desktopOnly: "hidden md:block";
        readonly stack: "flex flex-col md:flex-row";
        readonly stackReverse: "flex flex-col-reverse md:flex-row";
        readonly grid: {
            readonly 1: "grid grid-cols-1";
            readonly 2: "grid grid-cols-1 md:grid-cols-2";
            readonly 3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            readonly 4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        };
    };
    readonly touch: {
        readonly minHeight: "44px";
        readonly minWidth: "44px";
        readonly comfortable: "48px";
        readonly large: "56px";
        readonly padding: "var(--hive-space-3)";
        readonly gap: "var(--hive-space-4)";
    };
};
export type LayoutComposition = typeof layoutComposition;
export type Spacing = typeof spacing;
export type Containers = typeof containers;
export type Utils = typeof utils;
export type Layouts = typeof layouts;
//# sourceMappingURL=layout-composition.d.ts.map