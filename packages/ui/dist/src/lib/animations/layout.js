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
export const layoutTransitions = {
    /** Snappy layout changes (lists, grids) */
    snappy: {
        type: 'spring',
        stiffness: 500,
        damping: 35,
        mass: 0.8,
    },
    /** Smooth layout changes (cards, panels) */
    smooth: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
    },
    /** Gentle layout changes (backgrounds, containers) */
    gentle: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        mass: 1,
    },
    /** Duration-based (for predictable timing) */
    timed: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
    },
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
export const layoutProps = {
    /** Basic layout animation */
    basic: {
        layout: true,
        transition: layoutTransitions.smooth,
    },
    /** Position-only animation */
    position: {
        layout: 'position',
        transition: layoutTransitions.snappy,
    },
    /** Size-only animation */
    size: {
        layout: 'size',
        transition: layoutTransitions.smooth,
    },
    /** Preserve aspect ratio during resize */
    preserve: {
        layout: 'preserve-aspect',
        transition: layoutTransitions.smooth,
    },
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
export const listItemProps = {
    layout: true,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
    transition: layoutTransitions.smooth,
};
/**
 * Grid item props (2D layout)
 */
export const gridItemProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: layoutTransitions.snappy,
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
export const accordionProps = {
    initial: 'closed',
    variants: {
        open: {
            height: 'auto',
            opacity: 1,
            transition: layoutTransitions.smooth,
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: layoutTransitions.smooth,
        },
    },
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
export const tabUnderlineProps = {
    className: 'absolute bottom-0 left-0 right-0 h-0.5 bg-primary',
    transition: layoutTransitions.snappy,
};
/**
 * Tab content animation
 */
export const tabContentProps = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
    },
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
export function createSharedElement(id) {
    return {
        layoutId: id,
        transition: layoutTransitions.smooth,
    };
}
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
export const collapseProps = {
    layout: true,
    variants: {
        collapsed: {
            height: 0,
            opacity: 0,
            transition: layoutTransitions.smooth,
        },
        expanded: {
            height: 'auto',
            opacity: 1,
            transition: layoutTransitions.smooth,
        },
    },
    initial: 'collapsed',
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
export const notificationProps = {
    layout: true,
    initial: { opacity: 0, y: -50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.5 },
    transition: layoutTransitions.snappy,
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
export const flipCardProps = {
    style: { transformStyle: 'preserve-3d' },
    variants: {
        front: {
            rotateY: 0,
            transition: layoutTransitions.smooth,
        },
        back: {
            rotateY: 180,
            transition: layoutTransitions.smooth,
        },
    },
    initial: 'front',
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MASONRY GRID LAYOUT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Masonry item (Pinterest-style)
 */
export const masonryItemProps = {
    layout: true,
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: layoutTransitions.gentle,
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
export function magicMoveProps(layoutId) {
    return {
        layoutId,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    };
}
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REORDER UTILITIES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
/**
 * Reorder array helper
 */
export function reorderArray(array, fromIndex, toIndex) {
    const newArray = [...array];
    const [removed] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, removed);
    return newArray;
}
/**
 * Find index by position (for drag & drop)
 */
export function findIndexByPosition(array, position, itemHeight) {
    return Math.max(0, Math.min(array.length - 1, Math.floor(position.y / itemHeight)));
}
//# sourceMappingURL=layout.js.map