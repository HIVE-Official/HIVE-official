"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { motion, MotionConfig, MotionProps } from "framer-motion";

interface MotionContextValue {
  /** Whether animations are enabled (respects user preference + performance) */
  animationsEnabled: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Current device performance tier (affects animation complexity) */
  performanceTier: "low" | "medium" | "high";
  /** Toggle animations manually (for debugging/testing) */
  toggleAnimations: () => void;
  /** Force performance tier (for testing) */
  setPerformanceTier: (tier: "low" | "medium" | "high") => void;
  forcedPerformanceTier?: "low" | "medium" | "high";
}

const MotionContext = createContext<MotionContextValue | null>(null);

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  };
}

interface MotionProviderProps {
  children: React.ReactNode;
  /** Override default animation settings */
  defaultAnimationsEnabled?: boolean;
  /** Force performance tier for testing */
  forcedPerformanceTier?: "low" | "medium" | "high";
}

/**
 * Motion Provider - Manages animation state and performance across HIVE
 *
 * Features:
 * - Automatic reduced motion detection
 * - Device performance tier detection
 * - Global animation toggle
 * - Performance-aware animation complexity
 */
export function MotionProvider({
  children,
  defaultAnimationsEnabled = true,
  forcedPerformanceTier,
}: MotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [performanceTier, setPerformanceTier] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [animationsEnabled, setAnimationsEnabled] = useState(
    defaultAnimationsEnabled
  );

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Detect device performance tier
  useEffect(() => {
    if (forcedPerformanceTier) {
      setPerformanceTier(forcedPerformanceTier);
      return;
    }

    const detectPerformance = () => {
      // Use multiple signals to determine device capability
      const extendedNavigator = navigator as ExtendedNavigator;
      const hardwareConcurrency = extendedNavigator.hardwareConcurrency || 4;
      const deviceMemory = extendedNavigator.deviceMemory || 4;
      const connection = extendedNavigator.connection;

      let score = 0;

      // CPU cores
      if (hardwareConcurrency >= 8) score += 3;
      else if (hardwareConcurrency >= 4) score += 2;
      else score += 1;

      // RAM
      if (deviceMemory >= 8) score += 3;
      else if (deviceMemory >= 4) score += 2;
      else score += 1;

      // Network (if available)
      if (connection) {
        if (connection.effectiveType === "4g") score += 2;
        else if (connection.effectiveType === "3g") score += 1;
      } else {
        score += 1; // Assume reasonable connection
      }

      // Classify performance tier
      if (score >= 7) setPerformanceTier("high");
      else if (score >= 4) setPerformanceTier("medium");
      else setPerformanceTier("low");
    };

    detectPerformance();
  }, [forcedPerformanceTier]);

  // Auto-disable animations for low performance or reduced motion
  useEffect(() => {
    if (prefersReducedMotion || performanceTier === "low") {
      setAnimationsEnabled(false);
    } else {
      setAnimationsEnabled(defaultAnimationsEnabled);
    }
  }, [prefersReducedMotion, performanceTier, defaultAnimationsEnabled]);

  const toggleAnimations = useCallback(() => {
    setAnimationsEnabled((prev) => !prev);
  }, []);

  const contextValue: MotionContextValue = {
    animationsEnabled,
    prefersReducedMotion,
    performanceTier,
    toggleAnimations,
    setPerformanceTier,
    forcedPerformanceTier,
  };

  // Global motion configuration based on performance and preferences
  const motionConfig = {
    // Reduce animation complexity for lower-end devices
    transition: {
      duration:
        performanceTier === "low"
          ? 0.1
          : performanceTier === "medium"
            ? 0.18
            : 0.22,
      ease: [0.22, 0.61, 0.36, 1], // HIVE standard easing
    },
    // Disable layout animations on low-end devices for performance
    layoutTransition:
      performanceTier !== "low"
        ? {
            duration: 0.22,
            ease: [0.22, 0.61, 0.36, 1],
          }
        : false,
  };

  return (
    <MotionContext.Provider value={contextValue}>
      <MotionConfig {...motionConfig}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

/**
 * Hook to access motion context
 */
export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}

/**
 * Performance-aware motion wrapper
 * Automatically adjusts animation complexity based on device capability
 */
export function AdaptiveMotion({
  children,
  lowEndFallback,
  className,
  ...motionProps
}: {
  children: React.ReactNode;
  lowEndFallback?: React.ReactNode;
  className?: string;
} & MotionProps) {
  const { animationsEnabled, performanceTier } = useMotion();

  // Return static content for low-end devices or disabled animations
  if (!animationsEnabled || performanceTier === "low") {
    return <div className={className}>{lowEndFallback || children}</div>;
  }

  // Reduce animation complexity for medium-tier devices
  const adjustedProps =
    performanceTier === "medium"
      ? {
          ...motionProps,
          transition: {
            ...motionProps.transition,
            duration: (motionProps.transition?.duration || 0.22) * 0.8,
          },
        }
      : motionProps;

  return (
    <motion.div className={className} {...adjustedProps}>
      {children}
    </motion.div>
  );
}

/**
 * Utility hook for motion-aware component states
 */
export function useMotionAware() {
  const { animationsEnabled, performanceTier } = useMotion();

  return {
    shouldAnimate: animationsEnabled && performanceTier !== "low",
    isHighPerformance: performanceTier === "high",
    reduceComplexity: performanceTier === "low",
    // Get appropriate duration based on performance
    getDuration: (baseDuration: number = 0.22) => {
      if (!animationsEnabled) return 0;
      if (performanceTier === "low") return 0.1;
      if (performanceTier === "medium") return baseDuration * 0.8;
      return baseDuration;
    },
  };
}
