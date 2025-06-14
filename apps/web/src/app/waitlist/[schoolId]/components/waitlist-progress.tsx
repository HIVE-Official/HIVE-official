"use client";

import { Progress } from "@hive/ui";

type WaitlistProgressProps = {
  currentCount: number;
  threshold: number;
};

const WAITLIST_THRESHOLD = 250;

export function WaitlistProgress({ currentCount }: Omit<WaitlistProgressProps, 'threshold'>) {
  const progressPercentage = (currentCount / WAITLIST_THRESHOLD) * 100;

  return (
    <div className="w-full text-center">
      <Progress value={progressPercentage} className="w-full" />
      <p className="mt-2 text-sm font-medium">
        {currentCount} / {WAITLIST_THRESHOLD} signed up
      </p>
    </div>
  );
} 