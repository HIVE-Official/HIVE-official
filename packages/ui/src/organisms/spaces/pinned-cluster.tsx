"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * PinnedCluster - Container for pinned posts at top of board
 *
 * Displays up to 2 pinned posts with optional expiration timers.
 * Provides visual hierarchy above the main stream.
 */

import React from "react";
import { Badge } from "../../atoms/badge";
import { Pin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "../../utils/cn";

export interface PinnedClusterProps {
  /** Pinned post components (max 2) */
  children: React.ReactNode;

  /** Total number of posts (for context) */
  totalPostsCount?: number;

  /** Additional CSS classes */
  className?: string;
}

export const PinnedCluster = React.forwardRef<
  HTMLDivElement,
  PinnedClusterProps
>(({ children, totalPostsCount, className }, ref) => {
  // Convert children to array and limit to 2
  const childArray = React.Children.toArray(children).slice(0, 2);

  if (childArray.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {/* Pinned section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="h-4 w-4 text-primary" />
          <h3 className="text-body-sm font-body-sm font-semibold text-foreground">
            Pinned Post{childArray.length > 1 ? "s" : ""}
          </h3>
          <Badge variant="outline" className="text-xs">
            {childArray.length}
          </Badge>
        </div>

        {totalPostsCount !== undefined && totalPostsCount > 0 && (
          <span className="text-caption font-caption text-muted-foreground">
            {totalPostsCount} total post{totalPostsCount !== 1 ? "s" : ""} in
            space
          </span>
        )}
      </div>

      {/* Pinned posts */}
      <div className="space-y-3">
        {childArray.map((child, index) => (
          <div key={index} className="relative">
            {child}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-caption font-caption text-muted-foreground">
            Recent Posts
          </span>
        </div>
      </div>
    </div>
  );
});

PinnedCluster.displayName = "PinnedCluster";

/**
 * PinTimer - Shows countdown until pin expires
 */
export interface PinTimerProps {
  /** Expiration date */
  expiresAt: Date;

  /** Additional CSS classes */
  className?: string;
  /** Compact mode renders just remaining text like `5h left` */
  compact?: boolean;
  /** Announce updates politely to screen readers */
  ariaLive?: boolean;
}

export const PinTimer: React.FC<PinTimerProps> = ({ expiresAt, className, compact = false, ariaLive = false }) => {
  const [timeLeft, setTimeLeft] = React.useState<string>(
    formatDistanceToNow(expiresAt, { addSuffix: false })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now >= expiresAt) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        setTimeLeft(formatDistanceToNow(expiresAt, { addSuffix: false }));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (timeLeft === "Expired") {
    return null;
  }

  const content = compact ? (
    <span>{timeLeft} left</span>
  ) : (
    <>
      <Clock className="h-3 w-3" />
      <span>Pinned for {timeLeft}</span>
    </>
  );

  return (
    <div
      className={cn("flex items-center gap-1 text-caption text-muted-foreground", className)}
      {...(ariaLive ? { "aria-live": "polite" } : {})}
    >
      {content}
    </div>
  );
};
