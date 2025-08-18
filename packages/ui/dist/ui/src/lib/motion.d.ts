/**
 * HIVE Motion Utilities - Framer Motion Bridge
 * Connects HIVE design tokens with Framer Motion for consistent animations
 */
import { Transition, type MotionProps } from 'framer-motion';
import { motion } from '@hive/tokens';
export declare const hiveTransitions: {
    readonly instant: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly quick: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly smooth: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly liquid: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly dramatic: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly flowing: {
        duration: number;
        ease: [number, number, number, number];
    };
    readonly elegant: {
        duration: number;
        ease: [number, number, number, number];
    };
};
export declare const hiveVariants: {
    readonly fadeIn: {
        hidden: {
            opacity: number;
        };
        visible: {
            opacity: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly slideUp: {
        hidden: {
            opacity: number;
            y: number;
        };
        visible: {
            opacity: number;
            y: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly slideDown: {
        hidden: {
            opacity: number;
            y: number;
        };
        visible: {
            opacity: number;
            y: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly scaleIn: {
        hidden: {
            opacity: number;
            scale: number;
        };
        visible: {
            opacity: number;
            scale: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly hover: {
        rest: {
            scale: number;
        };
        hover: {
            scale: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly press: {
        rest: {
            scale: number;
        };
        tap: {
            scale: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly goldPulse: {
        pulse: {
            boxShadow: ["0 0 0 rgba(255, 215, 0, 0)", "0 0 20px rgba(255, 215, 0, 0.3)", "0 0 0 rgba(255, 215, 0, 0)"];
            transition: {
                duration: number;
                ease: [number, number, number, number];
                repeat: number;
                repeatType: "loop";
            };
        };
    };
    readonly goldGlow: {
        glow: {
            filter: [string, string, string];
            transition: {
                duration: number;
                ease: [number, number, number, number];
                repeat: number;
                repeatType: "loop";
            };
        };
    };
    readonly ritualBurst: {
        burst: {
            scale: [number, number, number, number, number];
            opacity: [number, number, number, number, number];
            filter: [string, string, string, string, string];
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly spaceJoin: {
        hidden: {
            opacity: number;
            scale: number;
            rotate: number;
            filter: string;
        };
        visible: {
            opacity: number;
            scale: number;
            rotate: number;
            filter: string;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly container: {
        hidden: {
            opacity: number;
        };
        visible: {
            opacity: number;
            transition: {
                staggerChildren: number;
                delayChildren: number;
            };
        };
    };
    readonly item: {
        hidden: {
            opacity: number;
            y: number;
        };
        visible: {
            opacity: number;
            y: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
};
export declare const hivePresets: {
    readonly cardHover: {
        whileHover: {
            scale: number;
            y: number;
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)";
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly button: {
        whileHover: {
            scale: number;
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.2)";
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
        whileTap: {
            scale: number;
            transition: {
                duration: number;
                ease: [number, number, number, number];
            };
        };
    };
    readonly modal: {
        initial: string;
        animate: string;
        exit: string;
        variants: {
            hidden: {
                opacity: number;
                scale: number;
                transition: {
                    duration: number;
                    ease: [number, number, number, number];
                };
            };
            visible: {
                opacity: number;
                scale: number;
                transition: {
                    duration: number;
                    ease: [number, number, number, number];
                };
            };
        };
    };
    readonly page: {
        initial: string;
        animate: string;
        exit: string;
        variants: {
            hidden: {
                opacity: number;
            };
            visible: {
                opacity: number;
                transition: {
                    duration: number;
                    ease: [number, number, number, number];
                };
            };
        };
    };
    readonly list: {
        initial: string;
        animate: string;
        variants: {
            hidden: {
                opacity: number;
            };
            visible: {
                opacity: number;
                transition: {
                    staggerChildren: number;
                    delayChildren: number;
                };
            };
        };
    };
    readonly listItem: {
        variants: {
            hidden: {
                opacity: number;
                y: number;
            };
            visible: {
                opacity: number;
                y: number;
                transition: {
                    duration: number;
                    ease: [number, number, number, number];
                };
            };
        };
    };
};
export declare const createHiveTransition: (duration?: keyof typeof motion.duration, easing?: keyof typeof motion.easing) => Transition;
export declare const createHiveScale: (scale?: keyof typeof motion.transform) => Partial<MotionProps>;
export declare const createGoldAccent: (duration?: keyof typeof motion.duration) => Partial<MotionProps>;
export declare const withReducedMotion: (animation: Partial<MotionProps>) => Partial<MotionProps>;
export { motion } from '@hive/tokens';
export type { Variants, Transition, MotionProps } from 'framer-motion';
export { useAdaptiveMotion, type StudentEnergyState, type CampusContext } from './adaptive-motion';
//# sourceMappingURL=motion.d.ts.map