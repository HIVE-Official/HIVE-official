"use client";

import React from "react";
import type { User } from "@hive/core";

interface ProgressSectionProps {
  user: User;
}

export const ProgressSection = ({ user }: ProgressSectionProps) => {
  // Calculate progress towards next achievement
  const invitesFromNextBadge = user.isBuilder
    ? Math.max(0, 5 - (user.builderAchievements?.invitesSent || 0))
    : 0;

  const progressPercentage = user.isBuilder
    ? ((user.builderAchievements?.invitesSent || 0) / 5) * 100
    : 0;

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-white mb-6">
        Progress
      </h3>

      {user.isBuilder ? (
        <div className="space-y-4">
          {/* Circular Progress */}
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg
                className="w-24 h-24 transform -rotate-90"
                viewBox="0 0 96 96"
              >
                {/* Background circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-zinc-700"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressPercentage * 2.51} 251`}
                  className="text-[#FFD700]"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {invitesFromNextBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="text-center">
            <p className="text-sm text-zinc-400">
              {invitesFromNextBadge === 0
                ? "Achievement unlocked!"
                : `${invitesFromNextBadge} Invites from next badge`}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-zinc-400">
          <p className="text-sm">Join as a Builder to track progress</p>
        </div>
      )}
    </div>
  );
};
