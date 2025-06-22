"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CampusUnlockBannerProps {
  campusName: string;
  unlockType: "full" | "spaces" | "tools" | "rituals";
  studentCount: number;
  isAnimating?: boolean;
  onCelebrationComplete?: () => void;
  className?: string;
}

export const CampusUnlockBanner = React.forwardRef<
  HTMLDivElement,
  CampusUnlockBannerProps
>(
  (
    {
      campusName,
      unlockType,
      studentCount,
      isAnimating = false,
      onCelebrationComplete,
      className,
    },
    ref
  ) => {
    const [showConfetti, setShowConfetti] = React.useState(isAnimating);
    const [particles, setParticles] = React.useState<
      Array<{ id: number; x: number; y: number; delay: number }>
    >([]);

    React.useEffect(() => {
      if (isAnimating) {
        setShowConfetti(true);

        // Generate confetti particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50,
          delay: Math.random() * 0.5,
        }));
        setParticles(newParticles);

        // Clean up after animation
        const timer = setTimeout(() => {
          setShowConfetti(false);
          onCelebrationComplete?.();
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [isAnimating, onCelebrationComplete]);

    const getUnlockMessage = () => {
      switch (unlockType) {
        case "full":
          return `🎉 ${campusName} is now fully unlocked!`;
        case "spaces":
          return `🏛️ New spaces opened at ${campusName}`;
        case "tools":
          return `🔧 Builder tools unlocked at ${campusName}`;
        case "rituals":
          return `✨ Campus rituals activated at ${campusName}`;
        default:
          return `🎊 ${campusName} milestone reached!`;
      }
    };

    const getSubMessage = () => {
      return `${studentCount.toLocaleString()} students are now part of the HIVE`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          "bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20",
          "border border-yellow-500/50 rounded-lg p-6 mb-6",
          "transition-all duration-500",
          isAnimating && "scale-105 shadow-2xl shadow-yellow-500/20",
          className
        )}
      >
        {/* Confetti particles */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        )}

        {/* Animated background gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-30",
            "bg-gradient-to-r from-yellow-500/10 via-yellow-400/20 to-yellow-500/10",
            isAnimating && "animate-pulse"
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center">
            <h2
              className={cn(
                "text-2xl font-bold text-text-primary mb-2 font-display",
                isAnimating && "animate-bounce"
              )}
            >
              {getUnlockMessage()}
            </h2>

            <p className="text-text-secondary text-lg mb-4">
              {getSubMessage()}
            </p>

            {/* Progress celebration */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-3 h-3 bg-yellow-500 rounded-full",
                    isAnimating && "animate-ping"
                  )}
                />
                <span className="text-yellow-500 font-medium text-sm">
                  MILESTONE UNLOCKED
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
              <button
                className={cn(
                  "px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg",
                  "hover:bg-yellow-400 transition-colors duration-200",
                  "text-sm font-display",
                  isAnimating && "animate-pulse"
                )}
              >
                Explore Campus
              </button>

              <button
                className={cn(
                  "px-6 py-2 bg-surface-02 text-text-primary font-semibold rounded-lg",
                  "hover:bg-surface-03 border border-border-line transition-colors duration-200",
                  "text-sm font-display"
                )}
              >
                Share News
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 right-2 opacity-50">
          <div
            className={cn(
              "w-8 h-8 border-2 border-yellow-500 rounded-full",
              isAnimating && "animate-spin"
            )}
          />
        </div>

        <div className="absolute bottom-2 left-2 opacity-30">
          <div
            className={cn(
              "w-6 h-6 bg-yellow-500/20 rounded-full",
              isAnimating && "animate-ping"
            )}
          />
        </div>
      </div>
    );
  }
);

CampusUnlockBanner.displayName = "CampusUnlockBanner";

// Utility function to create sample unlock data
export const createSampleUnlockData = () => ({
  campusName: "University at Buffalo",
  unlockType: "full" as const,
  studentCount: 1247,
  isAnimating: true,
});
