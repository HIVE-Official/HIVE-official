'use client';

/**
 * Mobile Interaction Hooks
 * Provides touch gestures, pull-to-refresh, and mobile-specific interactions
 */

import type React from 'react';
import { logger } from '../utils/logger';

import { useState, useEffect, useRef, useCallback } from 'react';

// Haptic feedback types
export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

// Swipe direction types
export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

// Touch interaction configurations
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

// Haptic feedback hook
export function useHapticFeedback() {
  const triggerHaptic = useCallback((type: HapticFeedbackType = 'light') => {
    if (typeof window === 'undefined' || !window.navigator) return;

    // Try modern Vibration API first
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [40],
        selection: [5],
        success: [10, 50, 10],
        warning: [20, 100, 20],
        error: [50, 100, 50]
      };
      navigator.vibrate(patterns[type] || patterns.light);
    }

    // Try iOS haptic feedback if available
    if ('hapticFeedback' in window && typeof (window as any).hapticFeedback === 'function') {
      try {
        (window as any).hapticFeedback(type);
      } catch (error) {
        // Silently fail if haptic feedback is not available
      }
    }
  }, []);

  return { triggerHaptic };
}

// Swipe gesture hook
export function useSwipeGestures(config: Partial<SwipeConfig>) {
  const {
    threshold = 50,
    restrained = false,
    velocity = 0.3,
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
  } = config;

  const [isTracking, setIsTracking] = useState(false);
  const startTouch = useRef<{ x: number; y: number; time: number } | null>(null);
  const currentTouch = useRef<{ x: number; y: number; time: number } | null>(null);
  const { triggerHaptic } = useHapticFeedback();

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startTouch.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    currentTouch.current = startTouch.current;
    setIsTracking(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!startTouch.current || !isTracking) return;

    const touch = e.touches[0];
    currentTouch.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Prevent default scrolling if we're tracking a horizontal swipe
    const deltaX = Math.abs(currentTouch.current.x - startTouch.current.x);
    const deltaY = Math.abs(currentTouch.current.y - startTouch.current.y);
    
    if (restrained && deltaX > deltaY && deltaX > threshold / 2) {
      e.preventDefault();
    }
  }, [isTracking, threshold, restrained]);

  const handleTouchEnd = useCallback(() => {
    if (!startTouch.current || !currentTouch.current || !isTracking) {
      setIsTracking(false);
      return;
    }

    const deltaX = currentTouch.current.x - startTouch.current.x;
    const deltaY = currentTouch.current.y - startTouch.current.y;
    const deltaTime = currentTouch.current.time - startTouch.current.time;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const velocityX = absX / deltaTime;
    const velocityY = absY / deltaTime;

    // Determine if this is a valid swipe
    const isValidSwipe = (absX > threshold || absY > threshold) && 
                        (velocityX > velocity || velocityY > velocity);

    if (isValidSwipe) {
      let direction: SwipeDirection;
      
      if (absX > absY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      // Trigger haptic feedback
      triggerHaptic('selection');

      // Call appropriate handlers
      onSwipe?.(direction);
      
      switch (direction) {
        case 'left':
          onSwipeLeft?.();
          break;
        case 'right':
          onSwipeRight?.();
          break;
        case 'up':
          onSwipeUp?.();
          break;
        case 'down':
          onSwipeDown?.();
          break;
      }
    }

    setIsTracking(false);
    startTouch.current = null;
    currentTouch.current = null;
  }, [isTracking, threshold, velocity, onSwipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, triggerHaptic]);

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd
  };

  return { swipeHandlers, isTracking };
}

// Pull to refresh hook
export function usePullToRefresh(config: PullToRefreshConfig) {
  const {
    threshold = 80,
    onRefresh,
    resistance = 2.5,
    snapBackDuration = 300
  } = config;

  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [canRefresh, setCanRefresh] = useState(false);
  
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { triggerHaptic } = useHapticFeedback();

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only start pull to refresh if we're at the top of the container
    if (containerRef.current && containerRef.current.scrollTop > 0) return;

    const touch = e.touches[0];
    startY.current = touch.clientY;
    currentY.current = startY.current;
    setIsPulling(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling) return;

    const touch = e.touches[0];
    currentY.current = touch.clientY;
    const deltaY = currentY.current - startY.current;

    // Only allow pulling down
    if (deltaY <= 0) {
      setPullDistance(0);
      setCanRefresh(false);
      return;
    }

    // Apply resistance to the pull
    const distance = deltaY / resistance;
    setPullDistance(distance);

    // Check if we've reached the refresh threshold
    const shouldRefresh = distance >= threshold;
    if (shouldRefresh !== canRefresh) {
      setCanRefresh(shouldRefresh);
      if (shouldRefresh) {
        triggerHaptic('light');
      }
    }

    // Prevent default scrolling
    e.preventDefault();
  }, [isPulling, threshold, resistance, canRefresh, triggerHaptic]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    setIsPulling(false);

    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      triggerHaptic('success');
      
      try {
        await onRefresh();
      } catch (error) {
        triggerHaptic('error');
        logger.error('Pull to refresh failed:', { error });
      } finally {
        setIsRefreshing(false);
      }
    }

    // Animate back to original position
    if (pullDistance > 0) {
      const startDistance = pullDistance;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / snapBackDuration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setPullDistance(startDistance * (1 - easeOut));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPullDistance(0);
          setCanRefresh(false);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isPulling, canRefresh, isRefreshing, onRefresh, pullDistance, snapBackDuration, triggerHaptic]);

  const pullToRefreshHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    ref: containerRef
  };

  return {
    pullToRefreshHandlers,
    isPulling,
    isRefreshing,
    pullDistance,
    canRefresh,
    containerRef
  };
}

// Long press hook
export function useLongPress(
  onLongPress: () => void,
  options: {
    threshold?: number;
    onStart?: () => void;
    onFinish?: () => void;
    onCancel?: () => void;
  } = {}
) {
  const { threshold = 500, onStart, onFinish, onCancel } = options;
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { triggerHaptic } = useHapticFeedback();

  const start = useCallback(() => {
    if (timerRef.current) return;

    setIsPressed(true);
    onStart?.();
    
    timerRef.current = setTimeout(() => {
      triggerHaptic('medium');
      onLongPress();
      onFinish?.();
    }, threshold);
  }, [onLongPress, onStart, onFinish, threshold, triggerHaptic]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPressed(false);
    onCancel?.();
  }, [onCancel]);

  const longPressHandlers = {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchCancel: cancel
  };

  return { longPressHandlers, isPressed };
}

// Touch ripple effect hook
export function useTouchRipple() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const addRipple = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('touches' in event ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = ('touches' in event ? event.touches[0].clientY : event.clientY) - rect.top;
    
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  }, []);

  const rippleHandlers = {
    onTouchStart: addRipple,
    onMouseDown: addRipple
  };

  return { ripples, rippleHandlers };
}

// Mobile viewport hook
export function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const landscape = window.innerWidth > window.innerHeight;
      const vh = window.innerHeight;

      setIsMobile(mobile);
      setIsLandscape(landscape);
      setViewportHeight(vh);

      // Set CSS custom property for true viewport height
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return { isMobile, viewportHeight, isLandscape };
}

// All hooks are exported individually above