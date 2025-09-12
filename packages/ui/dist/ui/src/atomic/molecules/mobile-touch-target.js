'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { cn } from '../../lib/utils.js';
export function TouchTarget({ children, onClick, onLongPress, onSwipeLeft, onSwipeRight, className, disabled = false, hapticFeedback = false, rippleEffect = true, minTouchTarget = true }) {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState([]);
    const touchStartRef = useRef(null);
    const longPressTimerRef = useRef(null);
    const elementRef = useRef(null);
    const triggerHaptic = () => {
        if (hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate(10); // Light haptic feedback
        }
    };
    const addRipple = (x, y) => {
        if (!rippleEffect)
            return;
        const id = Date.now();
        setRipples(prev => [...prev, { id, x, y }]);
        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== id));
        }, 600);
    };
    const handleTouchStart = (e) => {
        if (disabled)
            return;
        const touch = e.touches[0];
        const rect = elementRef.current?.getBoundingClientRect();
        if (rect) {
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
            setIsPressed(true);
            addRipple(x, y);
            triggerHaptic();
            // Long press timer
            if (onLongPress) {
                longPressTimerRef.current = setTimeout(() => {
                    onLongPress();
                    triggerHaptic();
                }, 500);
            }
        }
    };
    const handleTouchEnd = (e) => {
        if (disabled)
            return;
        setIsPressed(false);
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        if (!touchStartRef.current)
            return;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const deltaTime = Date.now() - touchStartRef.current.time;
        // Check for swipe gestures
        const isSwipe = Math.abs(deltaX) > 50 && deltaTime < 300;
        if (isSwipe) {
            if (deltaX > 0 && onSwipeRight) {
                onSwipeRight();
                triggerHaptic();
            }
            else if (deltaX < 0 && onSwipeLeft) {
                onSwipeLeft();
                triggerHaptic();
            }
        }
        else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && onClick) {
            // Regular tap
            onClick();
        }
        touchStartRef.current = null;
    };
    const handleTouchCancel = () => {
        setIsPressed(false);
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        touchStartRef.current = null;
    };
    return (_jsxs("div", { ref: elementRef, className: cn('relative overflow-hidden transition-transform active:scale-95', minTouchTarget && 'min-h-[44px] min-w-[44px]', isPressed && 'opacity-70', disabled && 'opacity-50 pointer-events-none', className), onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchCancel, style: {
            WebkitTapHighlightColor: 'transparent', // Remove default iOS tap highlight
            touchAction: 'manipulation' // Improve responsiveness
        }, children: [children, ripples.map(ripple => (_jsx("div", { className: "absolute pointer-events-none", style: {
                    left: ripple.x - 20,
                    top: ripple.y - 20,
                    width: 40,
                    height: 40
                }, children: _jsx("div", { className: "w-full h-full rounded-full bg-white/30 animate-ping" }) }, ripple.id)))] }));
}
// Specialized touch components
export function SwipeableCard({ children, onSwipeLeft, onSwipeRight, className, ...props }) {
    return (_jsx(TouchTarget, { onSwipeLeft: onSwipeLeft, onSwipeRight: onSwipeRight, className: cn('rounded-lg', className), minTouchTarget: false, ...props, children: children }));
}
export function LongPressButton({ children, onLongPress, className, ...props }) {
    return (_jsx(TouchTarget, { onLongPress: onLongPress, className: cn('rounded-lg p-3', className), hapticFeedback: true, ...props, children: children }));
}
//# sourceMappingURL=mobile-touch-target.js.map