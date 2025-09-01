/**
 * Mobile Interaction Hooks
 * Provides touch gestures, pull-to-refresh, and mobile-specific interactions
 */
import type React from 'react';
export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';
export type SwipeDirection = 'left' | 'right' | 'up' | 'down';
interface SwipeConfig {
    threshold: number;
    restrained: boolean;
    velocity: number;
    onSwipe: (direction: SwipeDirection) => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
}
interface PullToRefreshConfig {
    threshold: number;
    onRefresh: () => Promise<void>;
    resistance: number;
    snapBackDuration: number;
}
export declare function useHapticFeedback(): {
    triggerHaptic: (type?: HapticFeedbackType) => void;
};
export declare function useSwipeGestures(config: Partial<SwipeConfig>): {
    swipeHandlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: () => void;
        onTouchCancel: () => void;
    };
    isTracking: boolean;
};
export declare function usePullToRefresh(config: PullToRefreshConfig): {
    pullToRefreshHandlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: () => Promise<void>;
        onTouchCancel: () => Promise<void>;
        ref: React.MutableRefObject<HTMLDivElement | null>;
    };
    isPulling: boolean;
    isRefreshing: boolean;
    pullDistance: number;
    canRefresh: boolean;
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
};
export declare function useLongPress(onLongPress: () => void, options?: {
    threshold?: number;
    onStart?: () => void;
    onFinish?: () => void;
    onCancel?: () => void;
}): {
    longPressHandlers: {
        onMouseDown: () => void;
        onMouseUp: () => void;
        onMouseLeave: () => void;
        onTouchStart: () => void;
        onTouchEnd: () => void;
        onTouchCancel: () => void;
    };
    isPressed: boolean;
};
export declare function useTouchRipple(): {
    ripples: {
        id: number;
        x: number;
        y: number;
    }[];
    rippleHandlers: {
        onTouchStart: (event: React.TouchEvent | React.MouseEvent) => void;
        onMouseDown: (event: React.TouchEvent | React.MouseEvent) => void;
    };
};
export declare function useMobileViewport(): {
    isMobile: boolean;
    viewportHeight: number;
    isLandscape: boolean;
};
export {};
//# sourceMappingURL=use-mobile-interactions.d.ts.map