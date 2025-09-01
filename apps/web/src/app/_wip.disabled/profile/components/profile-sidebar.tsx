"use client";

import React from "react";
import Image from "next/image";
import type { User } from "@hive/core";
import { Button } from "@hive/ui";
import { Edit, Share2 } from "lucide-react";

interface ProfileSidebarProps {
  user: User;
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      {/* Profile Photo */}
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-800">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.fullName}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-zinc-400">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h2 className="font-display text-2xl font-semibold text-[var(--hive-text-inverse)] mb-2">
          {user.fullName}
        </h2>

        {/* Location - Dormitory */}
        {user.dormitory && user.showDormitory && (
          <p className="font-sans text-sm text-zinc-400 mb-1">
            {user.dormitory}
          </p>
        )}

        {/* Primary Organization */}
        {user.organizations.length > 0 && user.showOrganizations && (
          <p className="font-sans text-sm text-zinc-400 mb-3">
            {user.organizations[0]}
          </p>
        )}

        {/* Builder Badge */}
        {user.isBuilder && (
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-full px-3 py-1 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="font-sans text-sm font-medium text-accent">
              Builder
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-zinc-700 text-[var(--hive-text-inverse)] hover:bg-zinc-800"
          onClick={() => {
            // TODO: Navigate to profile edit
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-zinc-700 text-[var(--hive-text-inverse)] hover:bg-zinc-800"
          onClick={() => {
            // TODO: Open share modal
          }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
