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
export declare const butteryInteractions: {
    readonly socialButton: {
        readonly rest: {
            readonly scale: 1;
            readonly y: 0;
            readonly rotateZ: 0;
            readonly transition: {
                readonly duration: 0.4;
                readonly ease: any;
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 20;
            };
        };
        readonly hover: {
            readonly scale: 1.05;
            readonly y: -1;
            readonly transition: {
                readonly duration: 0.2;
                readonly ease: any;
                readonly type: "spring";
                readonly stiffness: 500;
                readonly damping: 12;
            };
        };
        readonly pressed: {
            readonly scale: 0.95;
            readonly y: 1;
            readonly rotateZ: 0.5;
            readonly transition: {
                readonly duration: 0.1;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
        };
        readonly released: {
            readonly scale: 1.02;
            readonly y: 0;
            readonly rotateZ: 0;
            readonly transition: {
                readonly duration: 0.3;
                readonly ease: readonly [0.34, 1.56, 0.64, 1];
                readonly type: "spring";
                readonly stiffness: 400;
                readonly damping: 15;
            };
        };
    };
    readonly presencePulse: {
        readonly online: {
            readonly scale: readonly [1, 1.1, 1];
            readonly opacity: readonly [1, 0.8, 1];
            readonly transition: {
                readonly duration: 2;
                readonly ease: "easeInOut";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
        readonly active: {
            readonly scale: readonly [1, 1.15, 1];
            readonly opacity: readonly [1, 0.9, 1];
            readonly boxShadow: readonly ["0 0 0 0 color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)", "0 0 0 1 color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)", "0 0 0 0 transparent"];
            readonly transition: {
                readonly duration: 1.5;
                readonly ease: "easeInOut";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
        readonly typing: {
            readonly scale: readonly [1, 1.2, 1];
            readonly opacity: readonly [1, 0.7, 1];
            readonly rotate: readonly [0, 2, -2, 0];
            readonly transition: {
                readonly duration: 1;
                readonly ease: "easeInOut";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
    };
    readonly floatingReaction: {
        readonly spawn: {
            readonly scale: 0;
            readonly opacity: 0;
            readonly y: 0;
            readonly x: 0;
            readonly rotate: 0;
            readonly transition: {
                readonly duration: 0;
            };
        };
        readonly float: {
            readonly scale: readonly [0, 1.2, 1];
            readonly opacity: readonly [0, 1, 0.8];
            readonly y: -60;
            readonly x: number;
            readonly rotate: number;
            readonly transition: {
                readonly duration: 2;
                readonly ease: readonly [0.25, 0.46, 0.45, 0.94];
                readonly times: readonly [0, 0.3, 1];
            };
        };
        readonly vanish: {
            readonly scale: 0.8;
            readonly opacity: 0;
            readonly y: -80;
            readonly transition: {
                readonly duration: 0.3;
                readonly ease: any;
            };
        };
    };
    readonly typingIndicator: {
        readonly hidden: {
            readonly opacity: 0;
            readonly scale: 0.8;
            readonly y: 10;
            readonly transition: {
                readonly duration: 0;
            };
        };
        readonly visible: {
            readonly opacity: 1;
            readonly scale: 1;
            readonly y: 0;
            readonly transition: {
                readonly duration: 0.2;
                readonly ease: any;
                readonly type: "spring";
                readonly stiffness: 400;
                readonly damping: 20;
            };
        };
        readonly bounce: (index: number) => {
            y: number[];
            transition: {
                duration: number;
                ease: string;
                repeat: number;
                repeatType: "loop";
                delay: number;
            };
        };
    };
    readonly loadingStates: {
        readonly skeleton: {
            readonly backgroundPosition: readonly ["-200%", "200%"];
            readonly transition: {
                readonly duration: 1.5;
                readonly ease: "easeInOut";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
        readonly spinner: {
            readonly rotate: 360;
            readonly transition: {
                readonly duration: 1;
                readonly ease: "linear";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
        readonly pulse: {
            readonly opacity: readonly [0.4, 0.8, 0.4];
            readonly transition: {
                readonly duration: 1.5;
                readonly ease: "easeInOut";
                readonly repeat: number;
                readonly repeatType: "loop";
            };
        };
        readonly contentReveal: {
            readonly hidden: {
                readonly opacity: 0;
                readonly y: 20;
                readonly scale: 0.95;
                readonly transition: {
                    readonly duration: 0;
                };
            };
            readonly visible: {
                readonly opacity: 1;
                readonly y: 0;
                readonly scale: 1;
                readonly transition: {
                    readonly duration: 0.6;
                    readonly ease: any;
                    readonly type: "spring";
                    readonly stiffness: 300;
                    readonly damping: 25;
                };
            };
        };
    };
    readonly engagementFlow: {
        readonly likeButton: {
            readonly idle: {
                readonly scale: 1;
                readonly rotate: 0;
                readonly transition: {
                    readonly duration: 0.4;
                    readonly ease: any;
                };
            };
            readonly liked: {
                readonly scale: readonly [1, 1.3, 1.1];
                readonly rotate: readonly [0, 15, 0];
                readonly transition: {
                    readonly duration: 0.5;
                    readonly ease: readonly [0.34, 1.56, 0.64, 1];
                    readonly times: readonly [0, 0.6, 1];
                };
            };
            readonly bounce: {
                readonly scale: readonly [1.1, 1.2, 1.1];
                readonly transition: {
                    readonly duration: 0.2;
                    readonly ease: "easeInOut";
                };
            };
        };
        readonly commentExpansion: {
            readonly collapsed: {
                readonly height: 0;
                readonly opacity: 0;
                readonly transition: {
                    readonly duration: 0.4;
                    readonly ease: any;
                };
            };
            readonly expanded: {
                readonly height: "auto";
                readonly opacity: 1;
                readonly transition: {
                    readonly duration: 0.6;
                    readonly ease: any;
                    readonly staggerChildren: 0.1;
                };
            };
        };
        readonly shareButton: {
            readonly rest: {
                readonly scale: 1;
                readonly boxShadow: "0 0 0 0 transparent";
                readonly transition: {
                    readonly duration: 0.4;
                    readonly ease: any;
                };
            };
            readonly shared: {
                readonly scale: readonly [1, 1.1, 1];
                readonly boxShadow: readonly ["0 0 0 0 color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)", "0 0 0 5 transparent", "0 0 0 0 transparent"];
                readonly transition: {
                    readonly duration: 0.6;
                    readonly ease: any;
                    readonly times: readonly [0, 0.5, 1];
                };
            };
        };
    };
};
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
        duration: 0.2 | 0.4 | 0.1 | 0.6 | 1.2 | 0.8;
        ease: any;
        type: "spring";
    };
};
export type MotionDuration = keyof typeof motionDurations;
export type CascadeType = keyof typeof cascadeTiming;
export type MagneticZone = keyof typeof magneticSnap.zones;
//# sourceMappingURL=hive-motion-system.d.ts.map