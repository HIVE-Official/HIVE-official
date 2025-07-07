"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@hive/ui";
import { Calendar, Camera } from "lucide-react";
import type { User } from "@hive/core";

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const initials = user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      {/* Banner Background */}
      <div className="h-48 w-full rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 md:h-64" />

      {/* Profile Content */}
      <div className="relative -mt-16 px-6 pb-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-black bg-gray-800">
              <AvatarImage
                src={user.avatarUrl || undefined}
                alt={user.fullName}
              />
              <AvatarFallback className="bg-gold text-black text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-black bg-gray-900 p-0 hover:bg-gray-800"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
              <p className="text-lg text-gold">@{user.handle}</p>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
              {user.schoolId && <span>{user.schoolId}</span>}
              {user.majorId && (
                <>
                  <span>&middot;</span>
                  <span>{user.majorId}</span>
                </>
              )}
              {user.graduationYear && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Class of {user.graduationYear}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            <p className="mt-4 max-w-2xl text-gray-500 italic">
              Add a bio to tell others about yourself...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Share Profile
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-gold text-black hover:bg-gold/90"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
