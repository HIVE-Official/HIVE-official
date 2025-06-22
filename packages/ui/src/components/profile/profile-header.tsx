"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Crown, Edit, Settings } from "lucide-react";

interface User {
  id: string;
  displayName: string;
  handle: string;
  avatar?: string;
  campusId: string;
  campusName: string;
  major?: string;
  graduationYear?: number;
  isBuilder: boolean;
  builderApprovedAt?: Date;
  isVerified: boolean;
}

interface ProfileHeaderProps {
  user: User;
  isOwner?: boolean;
  onEditProfile?: () => void;
  onSettings?: () => void;
  className?: string;
}

export const ProfileHeader = React.forwardRef<
  HTMLDivElement,
  ProfileHeaderProps
>(
  (
    { user, isOwner = false, onEditProfile, onSettings, className, ...props },
    ref
  ) => {
    const initials = user.displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6",
          "bg-surface-01 border border-border-line rounded-hive",
          className
        )}
        {...props}
      >
        {/* Avatar Section */}
        <div className="relative">
          <Avatar
            className={cn(
              "h-24 w-24",
              user.isBuilder &&
                "ring-2 ring-yellow-500 ring-offset-2 ring-offset-bg-root"
            )}
          >
            <AvatarImage src={user.avatar} alt={user.displayName} />
            <AvatarFallback className="text-lg font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>

          {user.isBuilder && (
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
              <Crown className="h-3 w-3 text-black" />
            </div>
          )}
        </div>

        {/* Identity Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-text-primary font-display">
              {user.displayName}
            </h1>
            <div className="flex items-center gap-2">
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
              {user.isBuilder && (
                <Badge
                  variant="default"
                  className="bg-yellow-500 text-black text-xs"
                >
                  Builder
                </Badge>
              )}
            </div>
          </div>

          <p className="text-text-secondary mb-1">@{user.handle}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              📍 {user.campusName}
            </span>
            {user.major && (
              <span className="flex items-center gap-1">🎓 {user.major}</span>
            )}
            {user.graduationYear && (
              <span className="flex items-center gap-1">
                📅 Class of {user.graduationYear}
              </span>
            )}
          </div>

          {user.isBuilder && user.builderApprovedAt && (
            <p className="text-xs text-yellow-600 mt-2">
              Builder since{" "}
              {new Date(user.builderApprovedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Actions Section */}
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettings}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";

export type { User, ProfileHeaderProps };
