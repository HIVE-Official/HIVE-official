/**
 * HIVE 2025 Animation Presets
 *
 * Modern animation patterns with spring physics and natural motion.
 * Inspired by: Linear, Arc Browser, Stripe, iOS, Apple Design
 *
 * @see /packages/ui/HIVE_ANIMATION_SYSTEM.md
 */
import type { Variants } from 'framer-motion';
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SPRING PHYSICS (2025 Standard)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Spring animations feel more natural than easing curves.
 * Use springs for interactions that should feel "physical".
 */
export declare const springs: {
    /** Snappy response (buttons, toggles) */
    readonly snappy: {
        readonly type: "spring";
        readonly stiffness: 400;
        readonly damping: 30;
        readonly mass: 0.8;
    };
    /** Smooth motion (cards, modals) */
    readonly smooth: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 30;
        readonly mass: 1;
    };
    /** Bouncy (success states, celebrations) */
    readonly bouncy: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 20;
        readonly mass: 1;
    };
    /** Gentle (subtle elements, tooltips) */
    readonly gentle: {
        readonly type: "spring";
        readonly stiffness: 200;
        readonly damping: 25;
        readonly mass: 1;
    };
    /** Wobbly (playful interactions, 3x streak milestone) */
    readonly wobbly: {
        readonly type: "spring";
        readonly stiffness: 180;
        readonly damping: 12;
        readonly mass: 1;
    };
    /** Stiff (instant feel, drawers) */
    readonly stiff: {
        readonly type: "spring";
        readonly stiffness: 600;
        readonly damping: 40;
        readonly mass: 0.5;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EASING CURVES (Fallback for non-spring animations)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const easings: {
    /** Linear's signature ease */
    readonly linear: "cubic-bezier(0.25, 0.1, 0.25, 1)";
    /** Material Design standard */
    readonly material: "cubic-bezier(0.4, 0, 0.2, 1)";
    /** Apple's ease-in-out */
    readonly apple: "cubic-bezier(0.42, 0, 0.58, 1)";
    /** Stripe's smooth ease */
    readonly stripe: "cubic-bezier(0.65, 0, 0.35, 1)";
    /** Sharp entrance */
    readonly sharp: "cubic-bezier(0.4, 0, 0.6, 1)";
    /** Overshoot (celebrations) */
    readonly overshoot: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TRANSITION PRESETS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const transitions: {
    /** Fast micro-interactions (hover, focus) - 120ms */
    readonly fast: {
        readonly duration: 0.12;
        readonly ease: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
    /** Standard UI transitions (200ms) */
    readonly default: {
        readonly duration: 0.2;
        readonly ease: "cubic-bezier(0.25, 0.1, 0.25, 1)";
    };
    /** Slower deliberate animations (300ms) */
    readonly slow: {
        readonly duration: 0.3;
        readonly ease: "cubic-bezier(0.25, 0.1, 0.25, 1)";
    };
    /** Page transitions (250ms) */
    readonly page: {
        readonly duration: 0.25;
        readonly ease: "cubic-bezier(0.42, 0, 0.58, 1)";
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * FADE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const fade: {
    /** Simple fade in/out */
    readonly simple: Variants;
    /** Fade with slight upward movement */
    readonly up: Variants;
    /** Fade with slight downward movement */
    readonly down: Variants;
    /** Fade from left */
    readonly left: Variants;
    /** Fade from right */
    readonly right: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SCALE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const scale: {
    /** Simple scale (modals, tooltips) */
    readonly simple: Variants;
    /** Pop in (notifications, badges) */
    readonly pop: Variants;
    /** Bounce in (success states) */
    readonly bounce: Variants;
    /** Grow from center */
    readonly grow: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SLIDE ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const slide: {
    /** Slide from bottom (mobile sheets) */
    readonly fromBottom: Variants;
    /** Slide from top */
    readonly fromTop: Variants;
    /** Slide from left (drawers) */
    readonly fromLeft: Variants;
    /** Slide from right */
    readonly fromRight: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * STAGGER ANIMATIONS (Lists, Grids)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const stagger: {
    /** Fast stagger (50ms delay) */
    readonly fast: {
        container: Variants;
        item: Variants;
    };
    /** Standard stagger (80ms delay) */
    readonly default: {
        container: Variants;
        item: Variants;
    };
    /** Slow stagger (120ms delay) */
    readonly slow: {
        container: Variants;
        item: Variants;
    };
    /** Grid stagger (2D grid layout) */
    readonly grid: {
        container: Variants;
        item: Variants;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MODAL & OVERLAY ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const modal: {
    /** Desktop modal (scale + fade) */
    readonly desktop: {
        overlay: Variants;
        content: Variants;
    };
    /** Mobile sheet (slide from bottom) */
    readonly mobile: {
        overlay: Variants;
        content: Variants;
    };
    /** Full screen (iOS-style) */
    readonly fullscreen: {
        overlay: Variants;
        content: Variants;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MICRO-INTERACTIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const micro: {
    /** Button press (scale down) */
    readonly press: {
        readonly whileTap: {
            readonly scale: 0.95;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 400;
            readonly damping: 30;
            readonly mass: 0.8;
        };
    };
    /** Button hover (subtle lift) */
    readonly hover: {
        readonly whileHover: {
            readonly y: -2;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 200;
            readonly damping: 25;
            readonly mass: 1;
        };
    };
    /** Card hover (lift + glow) */
    readonly cardHover: {
        readonly whileHover: {
            readonly y: -4;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
    };
    /** Toggle switch */
    readonly toggle: {
        readonly layout: true;
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 400;
            readonly damping: 30;
            readonly mass: 0.8;
        };
    };
    /** Checkbox check */
    readonly check: Variants;
    /** Loading pulse */
    readonly pulse: Variants;
    /** Shake (error state) */
    readonly shake: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SUCCESS & CELEBRATION ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const celebration: {
    /** Checkmark bounce */
    readonly checkmark: Variants;
    /** Confetti burst */
    readonly confetti: Variants;
    /** Badge earned */
    readonly badge: Variants;
    /** Streak fire */
    readonly streak: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PAGE TRANSITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const page: {
    /** Fade (simple page transition) */
    readonly fade: {
        readonly initial: {
            readonly opacity: 0;
        };
        readonly animate: {
            readonly opacity: 1;
        };
        readonly exit: {
            readonly opacity: 0;
        };
        readonly transition: {
            readonly duration: 0.25;
            readonly ease: "cubic-bezier(0.42, 0, 0.58, 1)";
        };
    };
    /** Slide (lateral navigation) */
    readonly slide: {
        readonly initial: {
            readonly opacity: 0;
            readonly x: 20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly x: 0;
        };
        readonly exit: {
            readonly opacity: 0;
            readonly x: -20;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
    /** Stack (modal-like) */
    readonly stack: {
        readonly initial: {
            readonly opacity: 0;
            readonly scale: 0.95;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly scale: 1;
        };
        readonly exit: {
            readonly opacity: 0;
            readonly scale: 1.05;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 200;
            readonly damping: 25;
            readonly mass: 1;
        };
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SKELETON & LOADING ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const loading: {
    /** Skeleton pulse */
    readonly skeleton: Variants;
    /** Spinner rotate */
    readonly spinner: Variants;
    /** Dots bounce */
    readonly dots: Variants;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * GESTURE ANIMATIONS (Drag, Swipe)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const gesture: {
    /** Swipe to dismiss */
    readonly swipeToDismiss: {
        readonly drag: "x";
        readonly dragConstraints: {
            readonly left: -100;
            readonly right: 100;
        };
        readonly dragElastic: 0.2;
        readonly whileDrag: {
            readonly scale: 0.95;
        };
    };
    /** Drag to reorder */
    readonly dragToReorder: {
        readonly drag: true;
        readonly dragMomentum: false;
        readonly dragElastic: 0.1;
        readonly whileDrag: {
            readonly scale: 1.05;
            readonly zIndex: 10;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 400;
                readonly damping: 30;
                readonly mass: 0.8;
            };
        };
    };
    /** Pull to refresh */
    readonly pullToRefresh: {
        readonly drag: "y";
        readonly dragConstraints: {
            readonly top: 0;
            readonly bottom: 100;
        };
        readonly dragElastic: 0.3;
    };
};
//# sourceMappingURL=presets.d.ts.map