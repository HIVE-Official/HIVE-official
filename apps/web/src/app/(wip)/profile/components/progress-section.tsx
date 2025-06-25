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

      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-24 h-24 mb-4">
          {/* Background circle */}
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-zinc-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${progressPercentage * 2.51} 251.2`}
              className="text-[#FFD700] transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Center number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-white">
              {invitesFromNextBadge}
            </span>
          </div>
        </div>

        {/* Progress text */}
        <div className="text-center">
          <p className="font-sans text-sm text-zinc-400 leading-tight">
            Invites from
            <br />
            next badge
          </p>
        </div>

        {/* Additional progress items if user is a builder */}
        {user.isBuilder && (
          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-zinc-400">
                Tools Created
              </span>
              <span className="font-sans text-sm font-medium text-white">
                {user.builderAchievements?.toolsCreated || 0}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-zinc-400">
                Total Engagement
              </span>
              <span className="font-sans text-sm font-medium text-white">
                {user.builderAchievements?.totalEngagement || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
