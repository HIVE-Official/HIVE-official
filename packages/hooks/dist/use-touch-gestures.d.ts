/**
 * Touch Gestures Hook
 *
 * Provides mobile-first touch interactions for HIVE components:
 * - Pull-to-refresh with haptic feedback simulation
 * - Swipe gestures for navigation and actions
 * - Long-press for context menus
 * - Double-tap for quick actions
 * - Smooth momentum scrolling
 */
export interface TouchPosition {
    x: number;
    y: number;
    timestamp: number;
}
export interface SwipeGestureData {
    direction: 'left' | 'right' | 'up' | 'down';
    distance: number;
    velocity: number;
    duration: number;
    startPosition: TouchPosition;
    endPosition: TouchPosition;
}
export interface PullToRefreshData {
    distance: number;
    isTriggered: boolean;
    isRefreshing: boolean;
}
export interface UseTouchGesturesOptions {
    /** Enable swipe gestures */
    enableSwipe?: boolean;
    /** Enable pull-to-refresh */
    enablePullToRefresh?: boolean;
    /** Enable long press */
    enableLongPress?: boolean;
    /** Enable double tap */
    enableDoubleTap?: boolean;
    /** Minimum swipe distance (px) */
    swipeThreshold?: number;
    /** Minimum swipe velocity (px/ms) */
    swipeVelocityThreshold?: number;
    /** Pull-to-refresh trigger distance (px) */
    pullToRefreshThreshold?: number;
    /** Long press duration (ms) */
    longPressDuration?: number;
    /** Double tap max interval (ms) */
    doubleTapInterval?: number;
    /** Prevent default touch behaviors */
    preventDefault?: boolean;
    /** Debug logging */
    debug?: boolean;
}
export interface UseTouchGesturesCallbacks {
    /** Swipe gesture detected */
    onSwipe?: (data: SwipeGestureData) => void;
    /** Pull-to-refresh triggered */
    onPullToRefresh?: () => Promise<void> | void;
    /** Long press detected */
    onLongPress?: (position: TouchPosition) => void;
    /** Double tap detected */
    onDoubleTap?: (position: TouchPosition) => void;
    /** Touch interaction started */
    onTouchStart?: (position: TouchPosition) => void;
    /** Touch interaction ended */
    onTouchEnd?: (position: TouchPosition) => void;
}
export interface UseTouchGesturesReturn {
    /** Touch event handlers for binding to elements */
    touchHandlers: {
        onTouchStart: (e: TouchEvent | React.TouchEvent) => void;
        onTouchMove: (e: TouchEvent | React.TouchEvent) => void;
        onTouchEnd: (e: TouchEvent | React.TouchEvent) => void;
        onTouchCancel: (e: TouchEvent | React.TouchEvent) => void;
    };
    /** Current pull-to-refresh state */
    pullToRefreshState: PullToRefreshData;
    /** Current touch interaction state */
    touchState: {
        isActive: boolean;
        startPosition: TouchPosition | null;
        currentPosition: TouchPosition | null;
    };
    /** Manually trigger haptic feedback */
    triggerHaptic: (type: 'light' | 'medium' | 'heavy') => void;
    /** Reset all gesture states */
    reset: () => void;
}
export declare function useTouchGestures(options?: UseTouchGesturesOptions, callbacks?: UseTouchGesturesCallbacks): UseTouchGesturesReturn;
//# sourceMappingURL=use-touch-gestures.d.ts.map