'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils.js';
import { RefreshCw, ChevronDown } from 'lucide-react';
export function PullToRefresh({ children, onRefresh, refreshThreshold = 80, disabled = false, className }) {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [canRefresh, setCanRefresh] = useState(false);
    const containerRef = useRef(null);
    const startY = useRef(0);
    const isPulling = useRef(false);
    const handleTouchStart = (e) => {
        if (disabled || isRefreshing)
            return;
        const container = containerRef.current;
        if (!container)
            return;
        // Only allow pull-to-refresh at the top of the container
        if (container.scrollTop === 0) {
            startY.current = e.touches[0].clientY;
            isPulling.current = true;
        }
    };
    const handleTouchMove = (e) => {
        if (!isPulling.current || disabled || isRefreshing)
            return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY.current;
        if (deltaY > 0) {
            // Prevent default scrolling when pulling down
            e.preventDefault();
            // Apply resistance to make it feel natural
            const resistance = 0.5;
            const distance = Math.min(deltaY * resistance, refreshThreshold * 1.5);
            setPullDistance(distance);
            setCanRefresh(distance >= refreshThreshold);
        }
    };
    const handleTouchEnd = async () => {
        if (!isPulling.current)
            return;
        isPulling.current = false;
        if (canRefresh && !isRefreshing) {
            setIsRefreshing(true);
            // Trigger haptic feedback if available
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            try {
                await onRefresh();
            }
            catch (error) {
                console.error('Refresh failed:', error);
            }
            finally {
                setIsRefreshing(false);
            }
        }
        setPullDistance(0);
        setCanRefresh(false);
    };
    // Auto-refresh animation
    useEffect(() => {
        if (isRefreshing && pullDistance > 0) {
            setPullDistance(refreshThreshold);
        }
    }, [isRefreshing, refreshThreshold]);
    const pullProgress = Math.min(pullDistance / refreshThreshold, 1);
    const shouldShowIndicator = pullDistance > 10;
    return (_jsxs("div", { ref: containerRef, className: cn('relative overflow-auto', className), onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, style: {
            transform: `translateY(${Math.min(pullDistance, refreshThreshold)}px)`,
            transition: isPulling.current ? 'none' : 'transform 0.3s ease-out'
        }, children: [shouldShowIndicator && (_jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10", style: {
                    transform: `translateY(-${refreshThreshold}px)`,
                    opacity: pullProgress
                }, children: [_jsx("div", { className: "flex items-center gap-2 text-gray-600", children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-5 w-5 animate-spin" }), _jsx("span", { className: "text-sm font-medium", children: "Refreshing..." })] })) : canRefresh ? (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { className: "h-5 w-5 transform rotate-180" }), _jsx("span", { className: "text-sm font-medium", children: "Release to refresh" })] })) : (_jsxs(_Fragment, { children: [_jsx(ChevronDown, { className: "h-5 w-5 transition-transform duration-200", style: { transform: `rotate(${pullProgress * 180}deg)` } }), _jsx("span", { className: "text-sm font-medium", children: "Pull to refresh" })] })) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200", children: _jsx("div", { className: "h-full bg-hive-primary transition-all duration-200", style: { width: `${pullProgress * 100}%` } }) })] })), children] }));
}
// Simplified refresh button for desktop/fallback
export function RefreshButton({ onRefresh, isRefreshing = false, className, children }) {
    const [isLoading, setIsLoading] = useState(false);
    const handleRefresh = async () => {
        if (isLoading || isRefreshing)
            return;
        setIsLoading(true);
        try {
            await onRefresh();
        }
        catch (error) {
            console.error('Refresh failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("button", { onClick: handleRefresh, disabled: isLoading || isRefreshing, className: cn('inline-flex items-center gap-2 px-3 py-2 text-sm font-medium', 'text-gray-600 hover:text-gray-900 hover:bg-gray-100', 'border border-gray-200 rounded-lg transition-colors', 'disabled:opacity-50 disabled:cursor-not-allowed', className), children: [_jsx(RefreshCw, { className: cn('h-4 w-4', (isLoading || isRefreshing) && 'animate-spin') }), children || 'Refresh'] }));
}
//# sourceMappingURL=pull-to-refresh.js.map