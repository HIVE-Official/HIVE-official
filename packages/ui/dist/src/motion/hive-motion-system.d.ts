import { Variants, useAnimation } from 'framer-motion';
export declare const liquidMetal: {
    readonly easing: readonly [0.23, 1, 0.32, 1];
    readonly physics: {
        readonly mass: 0.8;
        readonly stiffness: 400;
        readonly damping: 25;
        readonly velocity: 0;
    };
    readonly performance: {
        readonly willChange: "transform";
        readonly transformOrigin: "center";
        readonly backfaceVisibility: "hidden";
        readonly transform: "translateZ(0)";
    };
};
export declare const motionDurations: {
    readonly instant: 0.1;
    readonly quick: 0.2;
    readonly smooth: 0.4;
    readonly flowing: 0.6;
    readonly dramatic: 0.8;
    readonly orchestrated: 1.2;
};
export declare const cascadeTiming: {
    readonly stagger: 0.05;
    readonly ripple: 0.08;
    readonly sequence: 0.12;
    readonly wave: 0.03;
};
export declare const magneticSnap: {
    readonly zones: {
        readonly near: 20;
        readonly snap: 8;
        readonly release: 40;
    };
    readonly snapAnimation: {
        readonly type: "spring";
        readonly stiffness: 800;
        readonly damping: 30;
        readonly mass: 0.5;
    };
    readonly pullAnimation: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 20;
        readonly mass: 0.8;
    };
};
export declare const liquidFlow: Variants;
export declare const feedFlow: Variants;
export declare const magneticHover: Variants;
export declare const rippleCascade: {
    center: {
        scale: number[];
        opacity: number[];
        transition: {
            duration: 0.8;
            ease: any;
        };
    };
    connected: (distance: number) => {
        scale: number[];
        opacity: number[];
        transition: {
            delay: number;
            duration: 0.6;
            ease: any;
        };
    };
};
export declare const toolAssembly: Variants;
export declare const ambientBreathing: Variants;
export declare const milestoneSequence: {
    spaceActivation: {
        initial: {
            scale: number;
            opacity: number;
            rotate: number;
        };
        animate: {
            scale: number;
            opacity: number;
            rotate: number;
            transition: {
                duration: 1.2;
                ease: any;
                type: "spring";
                stiffness: number;
                damping: number;
            };
        };
    };
    toolLaunch: {
        initial: {
            y: number;
            opacity: number;
            scale: number;
        };
        animate: {
            y: number;
            opacity: number;
            scale: number;
            transition: {
                mass: 0.8;
                stiffness: 400;
                damping: 25;
                velocity: 0;
                duration: 0.8;
                ease: any;
                type: "spring";
            };
        };
    };
    achievement: {
        initial: {
            scale: number;
            rotate: number;
            opacity: number;
        };
        animate: {
            scale: number[];
            rotate: number;
            opacity: number;
            transition: {
                duration: 1.2;
                ease: any;
                times: number[];
            };
        };
    };
};
export declare class HiveMotionOrchestrator {
    private activeSequences;
    private cascadeQueue;
    registerSequence(id: string, controls: ReturnType<typeof useAnimation>): void;
    triggerSequence(sequenceType: keyof typeof milestoneSequence, elements: string[]): Promise<void>;
    triggerRipple(sourceId: string, connectedElements: Array<{
        id: string;
        distance: number;
    }>): void;
    cleanup(id: string): void;
}
export declare const motionOrchestrator: HiveMotionOrchestrator;
export declare const motionCSS = "\n  :root {\n    --hive-easing: cubic-bezier(0.23, 1, 0.32, 1);\n    --hive-duration-smooth: 0.4s;\n    --hive-duration-quick: 0.2s;\n    --hive-duration-flowing: 0.6s;\n  }\n  \n  .hive-motion-base {\n    transition: all var(--hive-duration-smooth) var(--hive-easing);\n    transform-origin: center;\n    will-change: transform;\n    backface-visibility: hidden;\n    transform: translateZ(0);\n  }\n  \n  .hive-motion-quick {\n    transition-duration: var(--hive-duration-quick);\n  }\n  \n  .hive-motion-flowing {\n    transition-duration: var(--hive-duration-flowing);\n  }\n";
export declare const motionUtils: {
    calculateDistance(element1: DOMRect, element2: DOMRect): number;
    isInMagneticZone(element: DOMRect, target: DOMRect, zone: keyof typeof magneticSnap.zones): boolean;
    getStaggerDelay(index: number, type?: keyof typeof cascadeTiming): number;
    createLiquidTransition(duration?: keyof typeof motionDurations): {
        mass: 0.8;
        stiffness: 400;
        damping: 25;
        velocity: 0;
        duration: 0.1 | 0.2 | 0.4 | 0.6 | 0.8 | 1.2;
        ease: any;
        type: "spring";
    };
};
export type MotionDuration = keyof typeof motionDurations;
export type CascadeType = keyof typeof cascadeTiming;
export type MagneticZone = keyof typeof magneticSnap.zones;
