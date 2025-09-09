"use client";

import { useEffect, useState } from 'react';

interface ViewportDimensions {
  width: number;
  height: number;
  isKeyboardOpen: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Hook to handle mobile viewport and keyboard issues
 */
export function useMobileViewport(): ViewportDimensions {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isKeyboardOpen: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    safeAreaInsets: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const visualViewport = window.visualViewport;

      // Detect keyboard by comparing viewport heights
      const windowHeight = window.screen.height;
      const viewportHeight = visualViewport?.height || height;
      const keyboardHeight = windowHeight - viewportHeight;
      const isKeyboardOpen = keyboardHeight > 100; // Threshold for keyboard detection

      // Device detection
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024;

      // Safe area insets for notched devices
      const safeAreaInsets = {
        top: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'
        ),
        bottom: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0'
        ),
        left: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0'
        ),
        right: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0'
        )
      };

      setDimensions({
        width,
        height: viewportHeight,
        isKeyboardOpen,
        isMobile,
        isTablet,
        isDesktop,
        safeAreaInsets
      });

      // Fix viewport height for mobile browsers
      if (isMobile) {
        document.documentElement.style.setProperty(
          '--vh',
          `${viewportHeight * 0.01}px`
        );
        
        // Adjust body height when keyboard is open
        if (isKeyboardOpen) {
          document.body.style.height = `${viewportHeight}px`;
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.height = '';
          document.body.style.overflow = '';
        }
      }
    };

    // Initial setup
    updateDimensions();

    // Event listeners
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateDimensions);
      window.visualViewport.addEventListener('scroll', updateDimensions);
    }

    // Focus/blur events for additional keyboard detection
    const handleFocus = () => {
      setTimeout(updateDimensions, 300); // Delay for keyboard animation
    };

    const handleBlur = () => {
      setTimeout(updateDimensions, 300);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateDimensions);
        window.visualViewport.removeEventListener('scroll', updateDimensions);
      }
      
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  return dimensions;
}

/**
 * Hook to handle touch gestures
 */
export function useTouchGestures(
  elementRef: React.RefObject<HTMLElement>,
  options: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onPinch?: (scale: number) => void;
    onTap?: () => void;
    onDoubleTap?: () => void;
    threshold?: number;
  } = {}
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const threshold = options.threshold || 50;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let lastTap = 0;
    let startDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
      } else if (e.touches.length === 2 && options.onPinch) {
        // Pinch gesture start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && options.onPinch && startDistance > 0) {
        // Pinch gesture
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance / startDistance;
        options.onPinch(scale);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;

      // Tap detection
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
        // Double tap detection
        if (endTime - lastTap < 300 && options.onDoubleTap) {
          options.onDoubleTap();
          lastTap = 0;
        } else {
          lastTap = endTime;
          if (options.onTap) {
            setTimeout(() => {
              if (lastTap === endTime) {
                options.onTap!();
              }
            }, 300);
          }
        }
        return;
      }

      // Swipe detection
      if (deltaTime < 500) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > threshold && options.onSwipeRight) {
            options.onSwipeRight();
          } else if (deltaX < -threshold && options.onSwipeLeft) {
            options.onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > threshold && options.onSwipeDown) {
            options.onSwipeDown();
          } else if (deltaY < -threshold && options.onSwipeUp) {
            options.onSwipeUp();
          }
        }
      }
    };

    // Add passive: false for iOS compatibility
    const touchOptions = { passive: false };
    
    element.addEventListener('touchstart', handleTouchStart, touchOptions);
    element.addEventListener('touchmove', handleTouchMove, touchOptions);
    element.addEventListener('touchend', handleTouchEnd, touchOptions);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, options]);
}

/**
 * Hook to handle iOS rubber band scrolling
 */
export function useIOSScrollFix(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent rubber band scrolling on iOS
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enabled]);
}