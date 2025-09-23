'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * Works on both client and server (SSR safe)
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener if available (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

// Common breakpoint hooks for convenience
export const useIsDesktop = () => useMediaQuery('(min-width: 1280px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1536px)');
export const useIsMediumScreen = () => useMediaQuery('(min-width: 1024px)');
export const useIsSmallScreen = () => useMediaQuery('(max-width: 640px)');