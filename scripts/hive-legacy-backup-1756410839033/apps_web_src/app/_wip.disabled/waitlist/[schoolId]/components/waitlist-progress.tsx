"use client";
import React from "react";
import { Progress } from "@hive/ui";

type WaitlistProgressProps = {
  currentCount: number;
  threshold?: number;
  isManualActivation?: boolean;
};

const DEFAULT_WAITLIST_THRESHOLD = 100; // Reduced for UB launch

export function WaitlistProgress({
  currentCount,
  threshold = DEFAULT_WAITLIST_THRESHOLD,
  isManualActivation = true,
}: WaitlistProgressProps) {
  const progressPercentage = Math.min((currentCount / threshold) * 100, 100);

  return (
    <div className="w-full text-center space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-sans">
          <span className="text-zinc-400">Progress</span>
          <span className="text-accent font-medium">
            {currentCount} / {threshold} students
          </span>
        </div>
        <Progress value={progressPercentage} className="w-full h-2" />
      </div>

      {isManualActivation ? (
        <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <p className="text-xs text-accent font-medium font-display">
            UB Founding Launch
          </p>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            HIVE will launch when we have enough founding UB students to create
            an amazing community
          </p>
        </div>
      ) : (
        <p className="text-sm text-zinc-400 font-sans">
          HIVE launches automatically when we reach {threshold} students
        </p>
      )}
    </div>
  );
}
