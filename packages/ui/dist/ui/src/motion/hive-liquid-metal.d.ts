import type { Variants, useAnimation } from '../components/framer-motion-proxy';
type AnimationControls = ReturnType<typeof useAnimation>;
export declare const liquidMetalPhysics: {
    readonly mass: {
        readonly light: 0.5;
        readonly standard: 0.8;
        readonly heavy: 1.2;
        readonly massive: 1.8;
    };
    readonly stiffness: {
        readonly snap: 800;
        readonly firm: 600;
        readonly balanced: 400;
        readonly gentle: 200;
    };
    readonly damping: {
        readonly tight: 35;
        readonly balanced: 25;
        readonly loose: 15;
        readonly flowing: 10;
    };
};
export declare const liquidEasing: {
    readonly signature: readonly [0.23, 1, 0.32, 1];
    readonly magnetic: readonly [0.25, 0.46, 0.45, 0.94];
    readonly silk: readonly [0.16, 1, 0.3, 1];
    readonly steel: readonly [0.34, 1.56, 0.64, 1];
    readonly molten: readonly [0.19, 1, 0.22, 1];
    readonly snap: readonly [0.25, 0.1, 0.25, 1];
};
export declare const liquidTiming: {
    readonly duration: {
        readonly micro: 0.1;
        readonly snap: 0.15;
        readonly quick: 0.2;
        readonly smooth: 0.4;
        readonly flowing: 0.6;
        readonly dramatic: 0.8;
        readonly orchestrated: 1.2;
        readonly cinematic: 1.8;
    };
    readonly cascade: {
        readonly wave: 0.03;
        readonly ripple: 0.05;
        readonly stagger: 0.08;
        readonly sequence: 0.12;
    };
    readonly magnetic: {
        readonly detection: 24;
        readonly attraction: 16;
        readonly snap: 8;
        readonly release: 32;
    };
};
export declare const magneticInteractions: {
    readonly hover: {
        readonly rest: {
            readonly scale: 1;
            readonly y: 0;
            readonly rotateX: 0;
            readonly rotateY: 0;
            readonly transition: {
                readonly type: "spring";
                readonly mass: 0.8;
                readonly stiffness: 400;
                readonly damping: 25;
                readonly duration: 0.4;
            };
        };
        readonly magnetic: {
            readonly scale: 1.02;
            readonly y: -3;
            readonly rotateX: 1;
            readonly rotateY: 0.5;
            readonly transition: {
                readonly type: "spring";
                readonly mass: 0.5;
                readonly stiffness: 600;
                readonly damping: 35;
                readonly duration: 0.2;
            };
        };
        readonly pressed: {
            readonly scale: 0.98;
            readonly y: 0;
            readonly rotateX: 0;
            readonly rotateY: 0;
            readonly transition: {
                readonly type: "spring";
                readonly mass: 0.5;
                readonly stiffness: 800;
                readonly damping: 35;
                readonly duration: 0.1;
            };
        };
    };
    readonly toolSnap: {
        readonly floating: {
            readonly y: 0;
            readonly rotate: 0;
            readonly scale: 1;
            readonly filter: "blur(0px)";
            readonly transition: {
                readonly type: "spring";
                readonly mass: 0.8;
                readonly stiffness: 200;
                readonly damping: 10;
            };
        };
        readonly approaching: {
            readonly scale: 1.05;
            readonly filter: "blur(0.5px)";
            readonly transition: {
                readonly type: "spring";
                readonly mass: 0.5;
                readonly stiffness: 400;
                readonly damping: 25;
                readonly duration: 0.2;
            };
        };
        readonly snapped: {
            readonly scale: 1;
            readonly y: 0;
            readonly rotate: 0;
            readonly filter: "blur(0px)";
            readonly transition: {
                readonly type: "spring";
                readonly mass: 1.2;
                readonly stiffness: 800;
                readonly damping: 35;
                readonly duration: 0.15;
            };
        };
    };
};
export declare const liquidFlow: Variants;
export declare const spaceActivation: Variants;
export declare const rippleCascade: {
    origin: {
        scale: number[];
        opacity: number[];
        filter: string[];
        transition: {
            duration: 0.8;
            ease: readonly [0.19, 1, 0.22, 1];
        };
    };
    connected: (distance: number) => {
        scale: number[];
        opacity: number[];
        y: number[];
        transition: {
            delay: number;
            type: "spring";
            mass: 0.8;
            stiffness: 400;
            damping: 25;
            duration: 0.6;
        };
    };
    wave: (distance: number) => {
        scale: number[];
        filter: string[];
        transition: {
            delay: number;
            duration: 0.4;
            ease: readonly [0.16, 1, 0.3, 1];
        };
    };
};
export declare const milestoneSequences: {
    toolCreated: {
        initial: {
            scale: number;
            opacity: number;
            rotate: number;
            y: number;
            filter: string;
        };
        animate: {
            scale: number[];
            opacity: number;
            rotate: number;
            y: number;
            filter: string;
            transition: {
                type: "spring";
                mass: 1.2;
                stiffness: 400;
                damping: 15;
                duration: 1.2;
                times: number[];
            };
        };
    };
    spaceActivated: {
        initial: {
            scale: number;
            opacity: number;
            rotate: number;
            filter: string;
        };
        animate: {
            scale: number;
            opacity: number;
            rotate: number;
            filter: string;
            transition: {
                type: "spring";
                mass: 1.8;
                stiffness: 200;
                damping: 25;
                duration: 1.8;
            };
        };
    };
    achievement: {
        initial: {
            scale: number;
            rotate: number;
            opacity: number;
            filter: string;
        };
        animate: {
            scale: number[];
            rotate: number;
            opacity: number;
            filter: string;
            transition: {
                type: "spring";
                mass: 1.2;
                stiffness: 400;
                damping: 15;
                duration: 1.2;
                times: number[];
            };
        };
    };
};
export declare class LiquidMetalOrchestrator {
    private sequences;
    private cascadeQueue;
    private isProcessingCascade;
    register(id: string, controls: AnimationControls): void;
    unregister(id: string): void;
    triggerSpaceActivation(originId: string, connectedElements: Array<{
        id: string;
        distance: number;
    }>): Promise<void>;
    triggerMilestone(type: keyof typeof milestoneSequences, elementIds: string[]): Promise<void>;
    private processCascadeQueue;
    queueCascade(animation: () => Promise<void>): void;
    stopAll(): void;
}
export declare const liquidMetalOrchestrator: LiquidMetalOrchestrator;
export declare const liquidMetalUtils: {
    calculateMagneticStrength(distance: number): number;
    isInMagneticZone(distance: number, zone: keyof typeof liquidTiming.magnetic): boolean;
    getCascadeDelay(index: number, type?: keyof typeof liquidTiming.cascade): number;
    createSpringTransition(mass?: keyof typeof liquidMetalPhysics.mass, stiffness?: keyof typeof liquidMetalPhysics.stiffness, damping?: keyof typeof liquidMetalPhysics.damping): {
        type: "spring";
        mass: 1.2 | 0.8 | 0.5 | 1.8;
        stiffness: 200 | 400 | 600 | 800;
        damping: 15 | 10 | 35 | 25;
    };
    createEasedTransition(duration?: keyof typeof liquidTiming.duration, easing?: keyof typeof liquidEasing): {
        duration: 1.2 | 0.8 | 0.1 | 0.6 | 0.4 | 0.2 | 0.15 | 1.8;
        ease: readonly [0.25, 0.46, 0.45, 0.94] | readonly [0.23, 1, 0.32, 1] | readonly [0.16, 1, 0.3, 1] | readonly [0.34, 1.56, 0.64, 1] | readonly [0.19, 1, 0.22, 1] | readonly [0.25, 0.1, 0.25, 1];
    };
};
export declare const liquidMetalPerformance: {
    gpuLayer: {
        willChange: string;
        transform: string;
        backfaceVisibility: "hidden";
        perspective: number;
    };
    respectsReducedMotion: (motionStyles: any) => any;
    createIntersectionObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => IntersectionObserver;
};
export type LiquidMetalPhysics = typeof liquidMetalPhysics;
export type LiquidEasing = keyof typeof liquidEasing;
export type LiquidTiming = keyof typeof liquidTiming.duration;
export type MagneticZone = keyof typeof liquidTiming.magnetic;
export type CascadeType = keyof typeof liquidTiming.cascade;
export {};
//# sourceMappingURL=hive-liquid-metal.d.ts.map