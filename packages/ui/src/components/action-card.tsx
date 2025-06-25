"use client";

import React from "react";
import type { User } from "@hive/core";
import { Button } from "../ui/button";

interface ActionCardProps {
  user: User;
}

export const ActionCard = ({ user }: ActionCardProps) => {
  const handleCompleteProfile = () => {
    // TODO: Navigate to profile completion flow
  };

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    const total = 6;

    if (user.avatarUrl) completed++;
    if (user.dormitory) completed++;
    if (user.organizations && user.organizations.length > 0) completed++;
    if (user.academicInterests && user.academicInterests.length > 0)
      completed++;
    if (user.majorId) completed++;
    if (user.graduationYear) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-white mb-4">
        Action
      </h3>

      <div className="space-y-4">
        <div className="text-sm text-zinc-400">
          Profile {completionPercentage}% complete
        </div>

        <Button
          onClick={handleCompleteProfile}
          className="w-full bg-white hover:bg-gray-100 text-black border-none font-medium transition-all duration-200"
        >
          Complete your profile
        </Button>
      </div>
    </div>
  );
};
