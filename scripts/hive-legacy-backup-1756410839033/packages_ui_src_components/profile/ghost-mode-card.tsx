"use client";

import React from "react";
import { cn } from "../lib/utils";

interface GhostModeCardProps {
  isGhostMode: boolean;
  onToggle: (enabled: boolean) => void;
  className?: string;
}

export function GhostModeCard({ 
  isGhostMode, 
  onToggle, 
  className 
}: GhostModeCardProps) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            isGhostMode ? "bg-[#FFD700]" : "bg-[#2A2A2A]"
          )}>
            <svg 
              className={cn(
                "w-5 h-5",
                isGhostMode ? "text-[var(--hive-text-primary)]" : "text-[#FFD700]"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.05 8.05m1.828 1.828l4.242 4.242m-4.242-4.242L8.05 8.05m5.993 5.993l1.828 1.828M8.05 8.05l1.828 1.828m0 0L8.05 8.05M12 6v.01" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground font-display">Ghost Mode</h3>
        </div>
        
        <p className="text-muted text-sm">
          Platform invisibility for complete privacy
        </p>
      </div>

      {/* Status */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className={cn(
            "text-2xl font-semibold mb-2",
            isGhostMode ? "text-[#FFD700]" : "text-muted"
          )}>
            {isGhostMode ? "Currently: Invisible" : "Currently: Visible"}
          </div>
          <p className="text-muted text-sm">
            {isGhostMode 
              ? "You're hidden from all member lists and activity tracking is paused"
              : "You appear in member lists and activity is being tracked"
            }
          </p>
        </div>

        {/* Effects list */}
        <div className="space-y-2 mb-6">
          <div className={cn(
            "flex items-center gap-2 text-sm transition-opacity duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
            isGhostMode ? "text-[#FFD700] opacity-100" : "text-muted opacity-60"
          )}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Remove from member lists
          </div>
          <div className={cn(
            "flex items-center gap-2 text-sm transition-opacity duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
            isGhostMode ? "text-[#FFD700] opacity-100" : "text-muted opacity-60"
          )}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pause activity tracking
          </div>
          <div className={cn(
            "flex items-center gap-2 text-sm transition-opacity duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
            isGhostMode ? "text-[#FFD700] opacity-100" : "text-muted opacity-60"
          )}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Disable notifications
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div className="mt-auto">
        <button
          onClick={() => onToggle(!isGhostMode)}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111]",
            isGhostMode
              ? "bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 focus:ring-[#FFD700]"
              : "bg-transparent border border-[#2A2A2A] text-muted hover:border-[#FFD700]/50 hover:text-[#FFD700] focus:ring-[#FFD700]"
          )}
        >
          {isGhostMode ? "Disable Ghost Mode" : "Enable Ghost Mode"}
        </button>
      </div>
    </div>
  );
}