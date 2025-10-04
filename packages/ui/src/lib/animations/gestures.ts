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
export function createSwipeHandlers(config: SwipeConfig): DragHandlers {
  const {
    threshold = 100,
    velocityThreshold = 500,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = config;

  return {
    onDragEnd: (_event, info: PanInfo) => {
      const { offset, velocity } = info;

      // Horizontal swipes
      if (Math.abs(offset.x) > Math.abs(offset.y)) {
        // Swipe left
        if (
          (offset.x < -threshold || velocity.x < -velocityThreshold) &&
          onSwipeLeft
        ) {
          onSwipeLeft();
        }
        // Swipe right
        else if (
          (offset.x > threshold || velocity.x > velocityThreshold) &&
          onSwipeRight
        ) {
          onSwipeRight();
        }
      }
      // Vertical swipes
      else {
        // Swipe up
        if (
          (offset.y < -threshold || velocity.y < -velocityThreshold) &&
          onSwipeUp
        ) {
          onSwipeUp();
        }
        // Swipe down
        else if (
          (offset.y > threshold || velocity.y > velocityThreshold) &&
          onSwipeDown
        ) {
          onSwipeDown();
        }
      }
    },
  };
}

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
export function useSwipeToDismiss(config: SwipeToDismissConfig) {
  const { onDismiss, direction = 'horizontal', threshold = 120 } = config;

  const dragAxis =
    direction === 'horizontal'
      ? 'x'
      : direction === 'vertical'
        ? 'y'
        : undefined;

  return {
    props: {
      drag: dragAxis,
      dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
      dragElastic: 0.7,
      onDragEnd: (_event: any, info: PanInfo) => {
        const shouldDismiss =
          direction === 'horizontal'
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
} as const;

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
export function usePullToRefresh(config: PullToRefreshConfig) {
  const { onRefresh, threshold = 80 } = config;

  return {
    props: {
      drag: 'y' as const,
      dragConstraints: { top: 0, bottom: threshold },
      dragElastic: 0.3,
      onDragEnd: async (_event: any, info: PanInfo) => {
        if (info.offset.y > threshold) {
          await onRefresh();
        }
      },
    },
  };
}

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
export function useLongPress(config: LongPressConfig) {
  const { onLongPress, duration = 500 } = config;
  let timer: NodeJS.Timeout | null = null;

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
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
} as const;

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
export function triggerHaptic(type: HapticFeedbackType = 'light'): void {
  if (typeof window === 'undefined') return;

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
  if ('ondeviceorientation' in window && (window as any).webkit) {
    try {
      const styles = {
        light: 'selection',
        medium: 'impactMedium',
        heavy: 'impactHeavy',
        selection: 'selection',
      };
      (window as any).webkit.messageHandlers?.haptic?.postMessage?.(
        styles[type]
      );
    } catch (e) {
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
      type: 'spring' as const,
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
      type: 'spring' as const,
      stiffness: 700,
      damping: 40,
    },
  },
} as const;
