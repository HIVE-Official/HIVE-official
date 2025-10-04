/**
 * HIVE Gesture Interaction System
 *
 * Modern gesture-driven animations for natural, tactile interactions.
 * Optimized for mobile and desktop with proper physics.
 *
 * @see https://www.framer.com/motion/gestures/
 */
import type { PanInfo, DragHandlers } from 'framer-motion';
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SWIPE GESTURES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface SwipeConfig {
    /** Swipe threshold (px) - distance required to trigger */
    threshold?: number;
    /** Velocity threshold (px/s) - minimum velocity to trigger */
    velocityThreshold?: number;
    /** Callback when swiped left */
    onSwipeLeft?: () => void;
    /** Callback when swiped right */
    onSwipeRight?: () => void;
    /** Callback when swiped up */
    onSwipeUp?: () => void;
    /** Callback when swiped down */
    onSwipeDown?: () => void;
}
/**
 * Create swipe gesture handlers
 *
 * @example
 * ```tsx
 * const swipe = createSwipeHandlers({
 *   onSwipeLeft: () => dismiss(),
 *   threshold: 100,
 * });
 *
 * <motion.div
 *   drag="x"
 *   {...swipe}
 * >
 *   Swipe me!
 * </motion.div>
 * ```
 */
export declare function createSwipeHandlers(config: SwipeConfig): DragHandlers;
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SWIPE TO DISMISS (Cards, Notifications)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface SwipeToDismissConfig {
    /** Callback when dismissed */
    onDismiss: () => void;
    /** Direction to allow swipe */
    direction?: 'left' | 'right' | 'horizontal' | 'vertical';
    /** Distance threshold (default: 120px) */
    threshold?: number;
}
/**
 * Swipe to dismiss preset (notifications, cards)
 *
 * @example
 * ```tsx
 * const dismiss = useSwipeToDismiss({
 *   onDismiss: () => removeNotification(id),
 * });
 *
 * <motion.div {...dismiss.props}>
 *   <NotificationCard />
 * </motion.div>
 * ```
 */
export declare function useSwipeToDismiss(config: SwipeToDismissConfig): {
    props: {
        drag: string;
        dragConstraints: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        dragElastic: number;
        onDragEnd: (_event: any, info: PanInfo) => void;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DRAG TO REORDER (Lists, Grids)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface DragToReorderConfig {
    /** Callback when item position changes */
    onReorder?: (fromIndex: number, toIndex: number) => void;
}
/**
 * Drag to reorder preset (list items)
 *
 * @example
 * ```tsx
 * <motion.div
 *   layout
 *   drag
 *   dragConstraints={constraintsRef}
 *   dragElastic={0.1}
 *   whileDrag={{ scale: 1.05, zIndex: 10 }}
 * >
 *   Drag to reorder
 * </motion.div>
 * ```
 */
export declare const dragToReorderProps: {
    readonly layout: true;
    readonly drag: true;
    readonly dragConstraints: {
        readonly left: 0;
        readonly right: 0;
    };
    readonly dragElastic: 0.1;
    readonly dragMomentum: false;
    readonly whileDrag: {
        readonly scale: 1.05;
        readonly zIndex: 10;
        readonly boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)";
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PULL TO REFRESH
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface PullToRefreshConfig {
    /** Callback when refresh triggered */
    onRefresh: () => void | Promise<void>;
    /** Distance to trigger refresh (default: 80px) */
    threshold?: number;
}
/**
 * Pull to refresh gesture
 *
 * @example
 * ```tsx
 * const pullToRefresh = usePullToRefresh({
 *   onRefresh: async () => {
 *     await fetchNewData();
 *   },
 * });
 *
 * <motion.div {...pullToRefresh.props}>
 *   <FeedList />
 * </motion.div>
 * ```
 */
export declare function usePullToRefresh(config: PullToRefreshConfig): {
    props: {
        drag: "y";
        dragConstraints: {
            top: number;
            bottom: number;
        };
        dragElastic: number;
        onDragEnd: (_event: any, info: PanInfo) => Promise<void>;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LONG PRESS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export interface LongPressConfig {
    /** Callback when long press triggers */
    onLongPress: () => void;
    /** Duration required (ms, default: 500) */
    duration?: number;
}
/**
 * Long press gesture (context menus)
 *
 * @example
 * ```tsx
 * const longPress = useLongPress({
 *   onLongPress: () => showContextMenu(),
 * });
 *
 * <motion.div {...longPress}>
 *   Long press me
 * </motion.div>
 * ```
 */
export declare function useLongPress(config: LongPressConfig): {
    onPointerDown: () => void;
    onPointerUp: () => void;
    onPointerLeave: () => void;
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PINCH TO ZOOM (Images, Maps)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const pinchToZoomProps: {
    readonly whileHover: {
        readonly scale: 1.05;
    };
    readonly whileTap: {
        readonly scale: 0.95;
    };
    readonly transition: {
        readonly type: "spring";
        readonly stiffness: 400;
        readonly damping: 30;
    };
};
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * HAPTIC FEEDBACK (Mobile)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection';
/**
 * Trigger haptic feedback (if supported)
 *
 * @example
 * ```tsx
 * <Button
 *   onTap={() => {
 *     triggerHaptic('medium');
 *     handleClick();
 *   }}
 * >
 *   Click me
 * </Button>
 * ```
 */
export declare function triggerHaptic(type?: HapticFeedbackType): void;
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PRESET GESTURES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export declare const gesturePresets: {
    /** Card hover (subtle lift) */
    readonly cardHover: {
        readonly whileHover: {
            readonly y: -4;
            readonly transition: {
                readonly duration: 0.2;
            };
        };
    };
    /** Button press (scale down) */
    readonly buttonPress: {
        readonly whileTap: {
            readonly scale: 0.95;
        };
    };
    /** Icon button (scale + rotate) */
    readonly iconButton: {
        readonly whileHover: {
            readonly scale: 1.1;
        };
        readonly whileTap: {
            readonly scale: 0.9;
            readonly rotate: 90;
        };
    };
    /** Elastic button (overshoot) */
    readonly elasticButton: {
        readonly whileTap: {
            readonly scale: 0.9;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 500;
            readonly damping: 15;
        };
    };
    /** Floating action button */
    readonly fab: {
        readonly whileHover: {
            readonly scale: 1.1;
            readonly boxShadow: "0 8px 16px rgba(255, 215, 0, 0.3)";
        };
        readonly whileTap: {
            readonly scale: 0.95;
        };
    };
    /** Switch toggle */
    readonly switch: {
        readonly layout: true;
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 700;
            readonly damping: 40;
        };
    };
};
//# sourceMappingURL=gestures.d.ts.map