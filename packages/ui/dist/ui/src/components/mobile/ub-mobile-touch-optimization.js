'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Text } from '../../atomic/atoms/text';
import { cn } from '../lib/utils';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
// Touch Ripple Hook
export function useTouchRipple() {
    const [ripples, setRipples] = React.useState([]);
    const createRipple = React.useCallback((event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = 'touches' in event
            ? event.touches[0].clientX - rect.left
            : event.clientX - rect.left;
        const y = 'touches' in event
            ? event.touches[0].clientY - rect.top
            : event.clientY - rect.top;
        const newRipple = {
            id: Date.now().toString(),
            x,
            y,
            timestamp: Date.now()
        };
        setRipples(prev => [...prev, newRipple]);
        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
    }, []);
    const rippleHandlers = {
        onTouchStart: createRipple,
        onMouseDown: createRipple
    };
    return { ripples, rippleHandlers };
}
// Haptic Feedback Hook
export function useHapticFeedback() {
    const triggerHaptic = React.useCallback((type) => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            switch (type) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(20);
                    break;
                case 'heavy':
                    navigator.vibrate(50);
                    break;
                case 'selection':
                    navigator.vibrate([10, 5, 10]);
                    break;
                case 'impact':
                    navigator.vibrate(30);
                    break;
                case 'notification':
                    navigator.vibrate([100, 50, 100]);
                    break;
                default:
                    navigator.vibrate(10);
            }
        }
    }, []);
    return { triggerHaptic };
}
// Touch Gesture Hook
export function useTouchGestures() {
    const [isPressed, setIsPressed] = React.useState(false);
    const [pressPosition, setPressPosition] = React.useState({ x: 0, y: 0 });
    const handleTouchStart = React.useCallback((event) => {
        const touch = event.touches[0];
        setIsPressed(true);
        setPressPosition({ x: touch.clientX, y: touch.clientY });
    }, []);
    const handleTouchEnd = React.useCallback(() => {
        setIsPressed(false);
    }, []);
    const gestureHandlers = {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchEnd
    };
    return { isPressed, pressPosition, gestureHandlers };
}
export function UBMobileBottomNav({ items, onNavigate, className }) {
    const { triggerHaptic } = useHapticFeedback();
    return (_jsx("div", { className: cn("fixed bottom-0 left-0 right-0 z-50", "bg-[var(--hive-background-primary)]/95 backdrop-blur-xl", "border-t border-[var(--hive-border-default)]", "pb-safe-area-inset-bottom", className), children: _jsx("div", { className: "flex items-center justify-around h-16 px-2", children: items.map((item) => (_jsx(UBMobileNavItem, { item: item, onNavigate: (href) => {
                    triggerHaptic('selection');
                    onNavigate(href);
                } }, item.id))) }) }));
}
function UBMobileNavItem({ item, onNavigate }) {
    const { ripples, rippleHandlers } = useTouchRipple();
    const IconComponent = item.icon;
    return (_jsxs("button", { type: "button", onClick: () => !item.isDisabled && onNavigate(item.href), disabled: item.isDisabled, ...rippleHandlers, className: cn("relative flex flex-col items-center justify-center", "w-full max-w-[80px] min-h-[44px] p-1", "transition-all duration-200 ease-out", "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]", "active:scale-95", item.isDisabled && "opacity-50 cursor-not-allowed"), "aria-label": item.label, "aria-current": item.isActive ? 'page' : undefined, children: [item.isActive && (_jsx("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-[var(--hive-brand-secondary)] rounded-full" })), _jsxs("div", { className: cn("relative flex items-center justify-center w-8 h-8 rounded-lg", "transition-all duration-200", item.isActive
                    ? "bg-[var(--hive-brand-secondary)]/15"
                    : "bg-transparent"), children: [_jsx(IconComponent, { className: cn("w-5 h-5 transition-colors duration-200", item.isActive
                            ? "text-[var(--hive-brand-secondary)]"
                            : "text-[var(--hive-text-secondary)]") }), item.badge && (_jsx("div", { className: cn("absolute -top-1 -right-1 min-w-[16px] h-4 px-1", "flex items-center justify-center text-xs font-medium rounded-full", "border-2 border-[var(--hive-background-primary)]", item.badge.color === 'error' && "bg-red-500 text-white", item.badge.color === 'warning' && "bg-yellow-500 text-black", item.badge.color === 'primary' && "bg-[var(--hive-brand-secondary)] text-white", !item.badge.color && "bg-red-500 text-white", item.badge.pulse && "animate-pulse"), children: item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count }))] }), _jsx(Text, { variant: "body-xs", className: cn("mt-1 transition-colors duration-200 truncate max-w-full", item.isActive
                    ? "text-[var(--hive-brand-secondary)]"
                    : "text-[var(--hive-text-tertiary)]"), children: item.label }), ripples.map((ripple) => (_jsx("div", { className: "absolute inset-0 pointer-events-none rounded-lg overflow-hidden", style: {
                    background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
                } }, ripple.id)))] }));
}
export function UBMobileHeader({ title, subtitle, leftAction, rightActions = [], className }) {
    const { triggerHaptic } = useHapticFeedback();
    return (_jsx("div", { className: cn("sticky top-0 z-40", "bg-[var(--hive-background-primary)]/95 backdrop-blur-xl", "border-b border-[var(--hive-border-default)]", "pt-safe-area-inset-top", className), children: _jsxs("div", { className: "flex items-center justify-between h-14 px-4", children: [_jsx("div", { className: "flex items-center min-w-[44px]", children: leftAction && (_jsx(UBMobileTouchButton, { icon: leftAction.icon, label: leftAction.label, onPress: () => {
                            triggerHaptic('light');
                            leftAction.onPress();
                        }, size: "sm" })) }), _jsxs("div", { className: "flex-1 text-center px-4", children: [_jsx(Text, { variant: "h3", weight: "semibold", className: "truncate", children: title }), subtitle && (_jsx(Text, { variant: "body-xs", color: "secondary", className: "truncate", children: subtitle }))] }), _jsx("div", { className: "flex items-center gap-2 min-w-[44px] justify-end", children: rightActions.map((action, index) => (_jsx(UBMobileTouchButton, { icon: action.icon, label: action.label, badge: action.badge, onPress: () => {
                            triggerHaptic('light');
                            action.onPress();
                        }, size: "sm" }, index))) })] }) }));
}
export function UBMobileTouchButton({ icon, label, onPress, variant = 'ghost', size = 'md', badge, disabled = false, className }) {
    const { ripples, rippleHandlers } = useTouchRipple();
    const { gestureHandlers } = useTouchGestures();
    const IconComponent = icon;
    const sizeClasses = {
        sm: 'w-8 h-8 p-1',
        md: 'w-10 h-10 p-2',
        lg: 'w-12 h-12 p-3'
    };
    const variantClasses = {
        primary: 'bg-[var(--hive-brand-secondary)] text-white',
        secondary: 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]',
        ghost: 'bg-transparent text-[var(--hive-text-secondary)]'
    };
    return (_jsxs("button", { type: "button", onClick: onPress, disabled: disabled, ...rippleHandlers, ...gestureHandlers, className: cn("relative flex items-center justify-center rounded-lg", "transition-all duration-200 ease-out", "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]", "active:scale-95", sizeClasses[size], variantClasses[variant], disabled && "opacity-50 cursor-not-allowed", className), "aria-label": label, children: [_jsx(IconComponent, { className: "w-5 h-5" }), badge && (_jsx("div", { className: cn("absolute -top-1 -right-1 min-w-[16px] h-4 px-1", "flex items-center justify-center text-xs font-medium rounded-full", "bg-red-500 text-white border-2 border-[var(--hive-background-primary)]", badge.pulse && "animate-pulse"), children: badge.count && badge.count > 99 ? '99+' : badge.count })), ripples.map((ripple) => (_jsx("div", { className: "absolute inset-0 pointer-events-none rounded-lg overflow-hidden", style: {
                    background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
                } }, ripple.id)))] }));
}
export function UBMobileSwipeCard({ children, onSwipeLeft, onSwipeRight, onPress, className }) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragX, setDragX] = React.useState(0);
    const startX = React.useRef(0);
    const currentX = React.useRef(0);
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        setIsDragging(true);
    };
    const handleTouchMove = (e) => {
        if (!isDragging)
            return;
        currentX.current = e.touches[0].clientX;
        const deltaX = currentX.current - startX.current;
        setDragX(deltaX);
    };
    const handleTouchEnd = () => {
        if (!isDragging)
            return;
        const threshold = 100;
        if (Math.abs(dragX) > threshold) {
            if (dragX > 0 && onSwipeRight) {
                onSwipeRight();
            }
            else if (dragX < 0 && onSwipeLeft) {
                onSwipeLeft();
            }
        }
        else if (Math.abs(dragX) < 10 && onPress) {
            // Small movement, treat as press
            onPress();
        }
        setIsDragging(false);
        setDragX(0);
    };
    return (_jsxs("div", { className: cn("relative transition-transform duration-200 ease-out", "touch-pan-y", // Allow vertical scrolling
        className), style: {
            transform: `translateX(${dragX}px)`,
            opacity: Math.max(0.7, 1 - Math.abs(dragX) / 200)
        }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchEnd, children: [children, isDragging && Math.abs(dragX) > 50 && (_jsxs(_Fragment, { children: [dragX > 0 && onSwipeRight && (_jsx("div", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400", children: _jsx(ChevronRight, { className: "w-8 h-8" }) })), dragX < 0 && onSwipeLeft && (_jsx("div", { className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400", children: _jsx(X, { className: "w-8 h-8" }) }))] }))] }));
}
export function UBMobilePullToRefresh({ children, onRefresh, isRefreshing = false, threshold = 100, className }) {
    const [pullDistance, setPullDistance] = React.useState(0);
    const [isPulling, setIsPulling] = React.useState(false);
    const startY = React.useRef(0);
    const { triggerHaptic } = useHapticFeedback();
    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY.current;
        if (deltaY > 0 && window.scrollY === 0) {
            setIsPulling(true);
            setPullDistance(Math.min(deltaY / 2, threshold * 1.5));
            if (deltaY > threshold && !isRefreshing) {
                triggerHaptic('impact');
            }
        }
    };
    const handleTouchEnd = async () => {
        if (isPulling && pullDistance > threshold && !isRefreshing) {
            triggerHaptic('success');
            await onRefresh();
        }
        setIsPulling(false);
        setPullDistance(0);
    };
    return (_jsxs("div", { className: cn("relative", className), onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onTouchCancel: handleTouchEnd, children: [(isPulling || isRefreshing) && (_jsx("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-center z-10", style: {
                    height: Math.max(pullDistance, isRefreshing ? threshold : 0),
                    transition: isPulling ? 'none' : 'height 0.3s ease-out'
                }, children: _jsxs("div", { className: cn("flex flex-col items-center text-[var(--hive-text-secondary)]", "transition-opacity duration-200", pullDistance > threshold / 2 || isRefreshing ? "opacity-100" : "opacity-50"), children: [_jsx("div", { className: cn("w-6 h-6 rounded-full border-2 border-[var(--hive-brand-secondary)]", "border-t-transparent animate-spin", isRefreshing ? "block" : "hidden") }), _jsx(ChevronDown, { className: cn("w-6 h-6 transition-transform duration-200", pullDistance > threshold ? "rotate-180" : "rotate-0", isRefreshing ? "hidden" : "block") }), _jsx(Text, { variant: "body-xs", className: "mt-1", children: isRefreshing ? 'Refreshing...' :
                                pullDistance > threshold ? 'Release to refresh' : 'Pull to refresh' })] }) })), _jsx("div", { style: {
                    transform: `translateY(${isPulling ? pullDistance : isRefreshing ? threshold : 0}px)`,
                    transition: isPulling ? 'none' : 'transform 0.3s ease-out'
                }, children: children })] }));
}
//# sourceMappingURL=ub-mobile-touch-optimization.js.map