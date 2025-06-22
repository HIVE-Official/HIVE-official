"use client";

import React from "react";
import type { User } from "@hive/core";
import { Button } from "@hive/ui";

interface ActionCardProps {
  user: User;
}

export const ActionCard = ({ user: _user }: ActionCardProps) => {
  const handleCompleteProfile = () => {
    // TODO: Navigate to profile completion flow
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-white mb-4">
        Action
      </h3>

      <Button
        onClick={handleCompleteProfile}
        className="w-full bg-white hover:bg-gray-100 text-black border-none font-medium transition-all duration-200 ease-out"
      >
        Complete your profile
      </Button>
    </div>
  );
};
