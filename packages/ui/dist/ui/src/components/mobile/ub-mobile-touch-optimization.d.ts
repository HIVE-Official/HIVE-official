import React from 'react';
export interface TouchRipple {
    id: string;
    x: number;
    y: number;
    timestamp: number;
}
export interface HapticFeedbackOptions {
    type: 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';
    enabled?: boolean;
}
export declare function useTouchRipple(): {
    ripples: TouchRipple[];
    rippleHandlers: {
        onTouchStart: (event: React.TouchEvent | React.MouseEvent) => void;
        onMouseDown: (event: React.TouchEvent | React.MouseEvent) => void;
    };
};
export declare function useHapticFeedback(): {
    triggerHaptic: (type: HapticFeedbackOptions["type"]) => void;
};
export declare function useTouchGestures(): {
    isPressed: boolean;
    pressPosition: {
        x: number;
        y: number;
    };
    gestureHandlers: {
        onTouchStart: (event: React.TouchEvent) => void;
        onTouchEnd: () => void;
        onTouchCancel: () => void;
    };
};
export interface UBMobileNavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    href: string;
    badge?: {
        count?: number;
        color?: 'primary' | 'secondary' | 'warning' | 'error';
        pulse?: boolean;
    };
    isActive?: boolean;
    isDisabled?: boolean;
}
interface UBMobileBottomNavProps {
    items: UBMobileNavItem[];
    onNavigate: (href: string) => void;
    className?: string;
}
export declare function UBMobileBottomNav({ items, onNavigate, className }: UBMobileBottomNavProps): import("react/jsx-runtime").JSX.Element;
interface UBMobileHeaderProps {
    title: string;
    subtitle?: string;
    leftAction?: {
        icon: React.ComponentType<any>;
        label: string;
        onPress: () => void;
    };
    rightActions?: {
        icon: React.ComponentType<any>;
        label: string;
        onPress: () => void;
        badge?: {
            count?: number;
            pulse?: boolean;
        };
    }[];
    className?: string;
}
export declare function UBMobileHeader({ title, subtitle, leftAction, rightActions, className }: UBMobileHeaderProps): import("react/jsx-runtime").JSX.Element;
interface UBMobileTouchButtonProps {
    icon: React.ComponentType<any>;
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    badge?: {
        count?: number;
        pulse?: boolean;
    };
    disabled?: boolean;
    className?: string;
}
export declare function UBMobileTouchButton({ icon, label, onPress, variant, size, badge, disabled, className }: UBMobileTouchButtonProps): import("react/jsx-runtime").JSX.Element;
interface UBMobileSwipeCardProps {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onPress?: () => void;
    className?: string;
}
export declare function UBMobileSwipeCard({ children, onSwipeLeft, onSwipeRight, onPress, className }: UBMobileSwipeCardProps): import("react/jsx-runtime").JSX.Element;
interface UBMobilePullToRefreshProps {
    children: React.ReactNode;
    onRefresh: () => Promise<void>;
    isRefreshing?: boolean;
    threshold?: number;
    className?: string;
}
export declare function UBMobilePullToRefresh({ children, onRefresh, isRefreshing, threshold, className }: UBMobilePullToRefreshProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ub-mobile-touch-optimization.d.ts.map