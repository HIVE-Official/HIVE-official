import { useEffect, useState } from "react";

/**
 * Custom hook to detect user's motion preferences
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return;
    }

    // Create media query to check user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Utility function to get animation duration based on user preferences
 * Returns 0ms if user prefers reduced motion, otherwise returns the specified duration
 */
export function getAnimationDuration(
  duration: number | string,
  respectPreference = true
): string {
  if (!respectPreference) {
    return typeof duration === "number" ? `${duration}ms` : duration;
  }

  if (typeof window !== "undefined") {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return "0ms";
    }
  }

  return typeof duration === "number" ? `${duration}ms` : duration;
}

/**
 * React hook version of getAnimationDuration that updates on preference changes
 */
export function useAnimationDuration(
  duration: number | string,
  respectPreference = true
): string {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!respectPreference) {
    return typeof duration === "number" ? `${duration}ms` : duration;
  }

  if (prefersReducedMotion) {
    return "0ms";
  }

  return typeof duration === "number" ? `${duration}ms` : duration;
}
