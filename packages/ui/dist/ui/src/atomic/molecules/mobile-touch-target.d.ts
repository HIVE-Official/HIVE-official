import React from 'react';
interface TouchTargetProps {
    children: React.ReactNode;
    onClick?: () => void;
    onLongPress?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    className?: string;
    disabled?: boolean;
    hapticFeedback?: boolean;
    rippleEffect?: boolean;
    minTouchTarget?: boolean;
}
export declare function TouchTarget({ children, onClick, onLongPress, onSwipeLeft, onSwipeRight, className, disabled, hapticFeedback, rippleEffect, minTouchTarget }: TouchTargetProps): import("react/jsx-runtime").JSX.Element;
export declare function SwipeableCard({ children, onSwipeLeft, onSwipeRight, className, ...props }: Omit<TouchTargetProps, 'minTouchTarget'> & {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function LongPressButton({ children, onLongPress, className, ...props }: Omit<TouchTargetProps, 'onClick'> & {
    children: React.ReactNode;
    onLongPress: () => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=mobile-touch-target.d.ts.map