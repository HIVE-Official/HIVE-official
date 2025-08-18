import { Variants } from 'framer-motion';
export declare function separateMotionProps<T extends Record<string, any>>(props: T): Omit<T, "size" | "onCopy" | "onCut" | "onPaste" | "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd" | "animated" | "layout" | "breakpoint" | "theme" | "logoLayout">;
export declare function getMotionProps<T extends Record<string, any>>(props: T): any;
export declare function getLogoMotionProps<T extends Record<string, any>>(props: T): any;
export declare const hiveMotionCore: {
    readonly easing: readonly [0.23, 1, 0.32, 1];
    readonly durations: {
        readonly instant: 0.1;
        readonly quick: 0.2;
        readonly smooth: 0.4;
        readonly flowing: 0.6;
        readonly dramatic: 0.8;
        readonly orchestrated: 1.2;
    };
    readonly physics: {
        readonly mass: 0.8;
        readonly stiffness: 400;
        readonly damping: 25;
    };
    readonly performance: {
        readonly willChange: "transform";
        readonly transformOrigin: "center";
        readonly backfaceVisibility: "hidden";
        readonly transform: "translateZ(0)";
    };
};
export declare const liquidMetalMotion: {
    magneticHover: {
        y: string;
        scale: string;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
            mass: number;
        };
    };
    magneticTap: {
        scale: string;
        y: string;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
    };
    entrance: {
        initial: {
            opacity: number;
            y: number;
            scale: number;
        };
        animate: {
            opacity: number;
            y: number;
            scale: number;
            transition: {
                duration: 0.4;
                ease: readonly [0.23, 1, 0.32, 1];
            };
        };
    };
    exit: {
        opacity: number;
        scale: number;
        y: number;
        transition: {
            duration: 0.2;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
};
export declare const hiveMotionVariants: Record<string, Variants>;
export declare function getHiveMotionProps(type?: 'button' | 'card' | 'modal' | 'surface', enableMagnetic?: boolean): {
    style: {
        willChange: string;
        transformOrigin: string;
        backfaceVisibility: "hidden";
        transform: string;
    };
} | {
    whileHover: {
        y: string;
        scale: string;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
            mass: number;
        };
    };
    whileTap: {
        scale: string;
        y: string;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
    };
    style: {
        willChange: string;
        transformOrigin: string;
        backfaceVisibility: "hidden";
        transform: string;
    };
} | {
    whileHover: {
        y: number;
        scale: number;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
            mass: number;
        };
    };
    whileTap: {
        scale: number;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
    };
    style: {
        willChange: string;
        transformOrigin: string;
        backfaceVisibility: "hidden";
        transform: string;
    };
} | {
    exit: {
        opacity: number;
        scale: number;
        y: number;
        transition: {
            duration: 0.2;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    initial: {
        opacity: number;
        y: number;
        scale: number;
    };
    animate: {
        opacity: number;
        y: number;
        scale: number;
        transition: {
            duration: 0.4;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
    style: {
        willChange: string;
        transformOrigin: string;
        backfaceVisibility: "hidden";
        transform: string;
    };
} | {
    whileHover: {
        scale: number;
        transition: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
        y?: undefined;
    };
    style: {
        willChange: string;
        transformOrigin: string;
        backfaceVisibility: "hidden";
        transform: string;
    };
};
export declare function getCascadeProps(index: number, delay?: number): {
    initial: {
        opacity: number;
        y: number;
    };
    animate: {
        opacity: number;
        y: number;
        transition: {
            delay: number;
            duration: 0.4;
            ease: readonly [0.23, 1, 0.32, 1];
        };
    };
};
export declare function getStaggerProps(count: number, pattern?: 'wave' | 'ripple' | 'sequence'): {
    animate: {
        transition: {
            staggerChildren: number;
            delayChildren: number;
        };
    };
};
export declare const magneticSystem: {
    zones: {
        near: number;
        snap: number;
        release: number;
    };
    snapAnimation: {
        type: "spring";
        stiffness: number;
        damping: number;
        mass: number;
    };
    pullAnimation: {
        type: "spring";
        stiffness: number;
        damping: number;
        mass: number;
    };
};
export declare const गति: Record<string, Variants>;
//# sourceMappingURL=motion-utils.d.ts.map