"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface PresenceStatusProps {
  status: "online" | "offline" | "away" | "busy";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

const statusLabels = {
  online: "Online",
  offline: "Offline",
  away: "Away",
  busy: "Busy",
};

export function PresenceStatus({
  status,
  showLabel = false,
  size = "md",
  className,
}: PresenceStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div
          className={cn(
            "rounded-full",
            sizeClasses[size],
            statusColors[status],
            status === "online" && "animate-pulse"
          )}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-gray-400">{statusLabels[status]}</span>
      )}
    </div>
  );
}
