/**
 * HIVE Layout Animation System
 *
 * Automatic layout animations for dynamic content changes.
 * Uses Framer Motion's layout animations for smooth transitions.
 *
 * @see https://www.framer.com/motion/layout-animations/
 */
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LAYOUT ANIMATION PRESETS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Layout transition configs
 */
export declare const layoutTransitions: {
    /** Snappy layout changes (lists, grids) */
    readonly snappy: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 35;
        readonly mass: 0.8;
    };
    /** Smooth layout changes (cards, panels) */
    readonly smooth: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 30;
        readonly mass: 1;
    };
    /** Gentle layout changes (backgrounds, containers) */
    readonly gentle: {
        readonly type: "spring";
        readonly stiffness: 200;
        readonly damping: 25;
        readonly mass: 1;
    };
    /** Duration-based (for predictable timing) */
    readonly timed: {
        readonly duration: 0.3;
        readonly ease: readonly [0.25, 0.1, 0.25, 1];
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SHARED LAYOUT PROPS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Basic layout animation (position & size)
 *
 * @example
 * ```tsx
 * <motion.div {...layoutProps.basic}>
 *   Content that changes size/position
 * </motion.div>
 * ```
 */
export declare const layoutProps: {
    /** Basic layout animation */
    readonly basic: {
        readonly layout: true;
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
    /** Position-only animation */
    readonly position: {
        readonly layout: "position";
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 500;
            readonly damping: 35;
            readonly mass: 0.8;
        };
    };
    /** Size-only animation */
    readonly size: {
        readonly layout: "size";
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
    /** Preserve aspect ratio during resize */
    readonly preserve: {
        readonly layout: "preserve-aspect";
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LIST ANIMATIONS (Reordering, Add/Remove)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Animated list item props
 *
 * @example
 * ```tsx
 * {items.map(item => (
 *   <motion.li
 *     key={item.id}
 *     {...listItemProps}
 *   >
 *     {item.content}
 *   </motion.li>
 * ))}
 * ```
 */
export declare const listItemProps: {
    readonly layout: true;
    readonly initial: {
        readonly opacity: 0;
        readonly y: 20;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
    };
    readonly exit: {
        readonly opacity: 0;
        readonly x: -100;
    };
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 30;
        readonly mass: 1;
    };
};
/**
 * Grid item props (2D layout)
 */
export declare const gridItemProps: {
    readonly layout: true;
    readonly initial: {
        readonly opacity: 0;
        readonly scale: 0.8;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly scale: 1;
    };
    readonly exit: {
        readonly opacity: 0;
        readonly scale: 0.8;
    };
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 35;
        readonly mass: 0.8;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ACCORDION ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Accordion content animation
 *
 * @example
 * ```tsx
 * <motion.div
 *   {...accordionProps}
 *   animate={isOpen ? 'open' : 'closed'}
 * >
 *   <AccordionContent />
 * </motion.div>
 * ```
 */
export declare const accordionProps: {
    readonly initial: "closed";
    readonly variants: {
        readonly open: {
            readonly height: "auto";
            readonly opacity: 1;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
        readonly closed: {
            readonly height: 0;
            readonly opacity: 0;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * TABS ANIMATION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Animated tab underline (shared layoutId)
 *
 * @example
 * ```tsx
 * <motion.div
 *   layoutId="tab-underline"
 *   {...tabUnderlineProps}
 * />
 * ```
 */
export declare const tabUnderlineProps: {
    readonly className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary";
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 35;
        readonly mass: 0.8;
    };
};
/**
 * Tab content animation
 */
export declare const tabContentProps: {
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
        readonly duration: 0.2;
        readonly ease: readonly [0.25, 0.1, 0.25, 1];
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SHARED ELEMENT TRANSITIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Create shared element transition props
 *
 * @example
 * ```tsx
 * // List view
 * <motion.img
 *   layoutId={`post-${id}`}
 *   src={post.image}
 * />
 *
 * // Detail view
 * <motion.img
 *   layoutId={`post-${id}`}
 *   src={post.image}
 * />
 * ```
 */
export declare function createSharedElement(id: string): {
    layoutId: string;
    transition: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 30;
        readonly mass: 1;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * COLLAPSE/EXPAND ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Collapsible section props
 *
 * @example
 * ```tsx
 * <motion.section
 *   {...collapseProps}
 *   animate={isExpanded ? 'expanded' : 'collapsed'}
 * >
 *   <Content />
 * </motion.section>
 * ```
 */
export declare const collapseProps: {
    readonly layout: true;
    readonly variants: {
        readonly collapsed: {
            readonly height: 0;
            readonly opacity: 0;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
        readonly expanded: {
            readonly height: "auto";
            readonly opacity: 1;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
    };
    readonly initial: "collapsed";
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NOTIFICATION STACK ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Notification stack item (toast, alert)
 *
 * @example
 * ```tsx
 * <motion.div
 *   {...notificationProps}
 *   custom={index}
 * >
 *   <Toast />
 * </motion.div>
 * ```
 */
export declare const notificationProps: {
    readonly layout: true;
    readonly initial: {
        readonly opacity: 0;
        readonly y: -50;
        readonly scale: 0.3;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly y: 0;
        readonly scale: 1;
    };
    readonly exit: {
        readonly opacity: 0;
        readonly x: 100;
        readonly scale: 0.5;
    };
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 35;
        readonly mass: 0.8;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CARD FLIP ANIMATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Flip card animation (3D rotation)
 *
 * @example
 * ```tsx
 * <motion.div
 *   {...flipCardProps}
 *   animate={isFlipped ? 'back' : 'front'}
 * >
 *   <CardContent />
 * </motion.div>
 * ```
 */
export declare const flipCardProps: {
    readonly style: {
        readonly transformStyle: "preserve-3d";
    };
    readonly variants: {
        readonly front: {
            readonly rotateY: 0;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
        readonly back: {
            readonly rotateY: 180;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 30;
                readonly mass: 1;
            };
        };
    };
    readonly initial: "front";
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MASONRY GRID LAYOUT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Masonry item (Pinterest-style)
 */
export declare const masonryItemProps: {
    readonly layout: true;
    readonly initial: {
        readonly opacity: 0;
        readonly scale: 0;
    };
    readonly animate: {
        readonly opacity: 1;
        readonly scale: 1;
    };
    readonly exit: {
        readonly opacity: 0;
        readonly scale: 0;
    };
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 200;
        readonly damping: 25;
        readonly mass: 1;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MAGIC MOVE (iOS-style transitions)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Magic move transition (shared element with scale)
 *
 * @example
 * ```tsx
 * // Source
 * <motion.div {...magicMoveProps('avatar-123')}>
 *   <Avatar />
 * </motion.div>
 *
 * // Destination
 * <motion.div {...magicMoveProps('avatar-123')}>
 *   <Avatar large />
 * </motion.div>
 * ```
 */
export declare function magicMoveProps(layoutId: string): {
    layoutId: string;
    transition: {
        type: "spring";
        stiffness: number;
        damping: number;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REORDER UTILITIES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Reorder array helper
 */
export declare function reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[];
/**
 * Find index by position (for drag & drop)
 */
export declare function findIndexByPosition<T>(array: T[], position: {
    x: number;
    y: number;
}, itemHeight: number): number;
//# sourceMappingURL=layout.d.ts.map