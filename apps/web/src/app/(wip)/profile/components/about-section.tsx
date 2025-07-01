"use client";

import React from "react";
import type { User } from "@hive/core";

interface AboutSectionProps {
  user: User;
}

export const AboutSection = ({ user: _user }: AboutSectionProps) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-white mb-4">
        About
      </h3>

      <div className="space-y-3">
        {/* Bio placeholder */}
        <div className="space-y-2">
          <div className="h-3 bg-zinc-700 rounded w-full"></div>
          <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
          <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
        </div>

        {/* Interests placeholder */}
        <div className="space-y-2 mt-4">
          <div className="text-sm text-zinc-400 font-medium">Interests</div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-zinc-700 rounded w-20"></div>
              <div className="h-6 bg-zinc-700 rounded w-24"></div>
              <div className="h-6 bg-zinc-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
