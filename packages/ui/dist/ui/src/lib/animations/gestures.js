/**
 * HIVE Gesture Interaction System
 *
 * Modern gesture-driven animations for natural, tactile interactions.
 * Optimized for mobile and desktop with proper physics.
 *
 * @see https://www.framer.com/motion/gestures/
 */
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
export function createSwipeHandlers(config) {
    const { threshold = 100, velocityThreshold = 500, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, } = config;
    return {
        onDragEnd: (_event, info) => {
            const { offset, velocity } = info;
            // Horizontal swipes
            if (Math.abs(offset.x) > Math.abs(offset.y)) {
                // Swipe left
                if ((offset.x < -threshold || velocity.x < -velocityThreshold) &&
                    onSwipeLeft) {
                    onSwipeLeft();
                }
                // Swipe right
                else if ((offset.x > threshold || velocity.x > velocityThreshold) &&
                    onSwipeRight) {
                    onSwipeRight();
                }
            }
            // Vertical swipes
            else {
                // Swipe up
                if ((offset.y < -threshold || velocity.y < -velocityThreshold) &&
                    onSwipeUp) {
                    onSwipeUp();
                }
                // Swipe down
                else if ((offset.y > threshold || velocity.y > velocityThreshold) &&
                    onSwipeDown) {
                    onSwipeDown();
                }
            }
        },
    };
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
export function useSwipeToDismiss(config) {
    const { onDismiss, direction = 'horizontal', threshold = 120 } = config;
    const dragAxis = direction === 'horizontal'
        ? 'x'
        : direction === 'vertical'
            ? 'y'
            : undefined;
    return {
        props: {
            drag: dragAxis,
            dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
            dragElastic: 0.7,
            onDragEnd: (_event, info) => {
                const shouldDismiss = direction === 'horizontal'
                    ? Math.abs(info.offset.x) > threshold
                    : direction === 'vertical'
                        ? Math.abs(info.offset.y) > threshold
                        : Math.abs(info.offset.x) > threshold ||
                            Math.abs(info.offset.y) > threshold;
                if (shouldDismiss) {
                    onDismiss();
                }
            },
        },
    };
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
export const dragToReorderProps = {
    layout: true,
    drag: true,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.1,
    dragMomentum: false,
    whileDrag: {
        scale: 1.05,
        zIndex: 10,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    },
};
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
export function usePullToRefresh(config) {
    const { onRefresh, threshold = 80 } = config;
    return {
        props: {
            drag: 'y',
            dragConstraints: { top: 0, bottom: threshold },
            dragElastic: 0.3,
            onDragEnd: async (_event, info) => {
                if (info.offset.y > threshold) {
                    await onRefresh();
                }
            },
        },
    };
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
export function useLongPress(config) {
    const { onLongPress, duration = 500 } = config;
    let timer = null;
    return {
        onPointerDown: () => {
            timer = setTimeout(() => {
                onLongPress();
            }, duration);
        },
        onPointerUp: () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        },
        onPointerLeave: () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        },
    };
}
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PINCH TO ZOOM (Images, Maps)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export const pinchToZoomProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
    },
};
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
export function triggerHaptic(type = 'light') {
    if (typeof window === 'undefined')
        return;
    // Vibration API (Android)
    if ('vibrate' in navigator) {
        const patterns = {
            light: 10,
            medium: 20,
            heavy: 30,
            selection: 5,
        };
        navigator.vibrate(patterns[type]);
    }
    // iOS Haptic Feedback (if available via webkit)
    if ('ondeviceorientation' in window && window.webkit) {
        try {
            const styles = {
                light: 'selection',
                medium: 'impactMedium',
                heavy: 'impactHeavy',
                selection: 'selection',
            };
            window.webkit.messageHandlers?.haptic?.postMessage?.(styles[type]);
        }
        catch (e) {
            // Silently fail if not available
        }
    }
}
/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PRESET GESTURES
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export const gesturePresets = {
    /** Card hover (subtle lift) */
    cardHover: {
        whileHover: { y: -4, transition: { duration: 0.2 } },
    },
    /** Button press (scale down) */
    buttonPress: {
        whileTap: { scale: 0.95 },
    },
    /** Icon button (scale + rotate) */
    iconButton: {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9, rotate: 90 },
    },
    /** Elastic button (overshoot) */
    elasticButton: {
        whileTap: { scale: 0.9 },
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 15,
        },
    },
    /** Floating action button */
    fab: {
        whileHover: {
            scale: 1.1,
            boxShadow: '0 8px 16px rgba(255, 215, 0, 0.3)',
        },
        whileTap: { scale: 0.95 },
    },
    /** Switch toggle */
    switch: {
        layout: true,
        transition: {
            type: 'spring',
            stiffness: 700,
            damping: 40,
        },
    },
};
//# sourceMappingURL=gestures.js.map