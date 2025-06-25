"use client";

import React from "react";
import Image from "next/image";
import type { User } from "@hive/core";
import { Button } from "./ui/button";

interface ProfileSidebarProps {
  user: User;
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const handleEditProfile = () => {
    // TODO: Open profile edit modal
  };

  const handleShare = () => {
    // TODO: Open share modal
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      {/* Profile Photo */}
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-800">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${user.fullName} profile photo`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-zinc-400">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h1 className="font-display text-xl font-semibold text-white mb-1">
          {user.fullName}
        </h1>
        <p className="text-zinc-400 text-sm">@{user.handle}</p>

        {/* Location */}
        {user.dormitory && user.showDormitory && (
          <p className="text-zinc-400 text-sm mt-2">
            {user.dormitory}
            {user.roomNumber && ` • Room ${user.roomNumber}`}
          </p>
        )}

        {/* Organization */}
        {user.organizations &&
          user.organizations.length > 0 &&
          user.showOrganizations && (
            <p className="text-zinc-400 text-sm mt-1">
              {user.organizations[0]}
            </p>
          )}
      </div>

      {/* Builder Badge */}
      {user.isBuilder && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFE255] text-black px-3 py-1 rounded-md text-sm font-semibold text-center">
            Builder
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleEditProfile}
          className="w-full bg-white hover:bg-gray-100 text-black border-none font-medium transition-all duration-200"
        >
          Edit Profile
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500"
        >
          Share
        </Button>
      </div>
    </div>
  );
};
