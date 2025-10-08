"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { Camera, Settings } from "lucide-react";

interface ProfileViewLayoutProps {
  profile: {
    displayName: string;
    handle?: string;
    bio?: string;
    photoURL?: string;
    coverPhotoURL?: string;
    major?: string;
    year?: string;
    school?: string;
  };
  isOwnProfile?: boolean;
  activities?: any[];
  spaces?: any[];
  connections?: any[];
  onEditPhoto?: () => void;
  onPrivacyChange?: (widget: string, level: 'public' | 'connections' | 'private') => void;
  onStepClick?: (stepId: string) => void;
  isSpaceLeader?: boolean;
  hasHiveLabAccess?: boolean;
  toolsCreated?: number;
  leadingSpaces?: Array<{ id: string; name: string; memberCount: number }>;
  onRequestHiveLabAccess?: () => void;
  onOpenHiveLab?: () => void;
  className?: string;
}

export function ProfileViewLayout({
  profile,
  isOwnProfile = false,
  activities = [],
  spaces = [],
  connections = [],
  onEditPhoto,
  onPrivacyChange,
  onStepClick,
  isSpaceLeader = false,
  hasHiveLabAccess = false,
  toolsCreated = 0,
  leadingSpaces = [],
  onRequestHiveLabAccess,
  onOpenHiveLab,
  className,
}: ProfileViewLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-black", className)}>
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
        {profile.coverPhotoURL && (
          <img
            src={profile.coverPhotoURL}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 pb-6 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-black overflow-hidden">
                {profile.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={profile.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-white">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {isOwnProfile && onEditPhoto && (
                <button
                  onClick={onEditPhoto}
                  className="absolute bottom-0 right-0 p-2 bg-[var(--hive-brand-primary)] rounded-full hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
                >
                  <Camera className="w-4 h-4 text-black" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{profile.displayName}</h1>
              {profile.handle && (
                <p className="text-gray-400">@{profile.handle}</p>
              )}
              {profile.bio && (
                <p className="mt-2 text-gray-300">{profile.bio}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.major && (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                    {profile.major}
                  </Badge>
                )}
                {profile.year && (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                    {profile.year}
                  </Badge>
                )}
                {profile.school && (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                    {profile.school}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            {isOwnProfile && (
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* HiveLab Access Banner */}
        {isOwnProfile && isSpaceLeader && (
          <div className="mt-6 p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-transparent border border-[var(--hive-brand-primary)]/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">HiveLab Access</h3>
                <p className="text-sm text-gray-400">
                  {hasHiveLabAccess
                    ? `You've created ${toolsCreated} tool${toolsCreated !== 1 ? 's' : ''}`
                    : 'Build custom tools for your spaces'}
                </p>
              </div>
              {hasHiveLabAccess ? (
                <Button
                  onClick={onOpenHiveLab}
                  className="bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
                >
                  Open HiveLab
                </Button>
              ) : (
                <Button
                  onClick={onRequestHiveLabAccess}
                  variant="outline"
                  className="border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                >
                  Request Access
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activities */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              {activities.length === 0 ? (
                <p className="text-gray-500">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                      <p className="text-gray-300">{activity.title || 'Activity'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spaces */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Spaces</h3>
              <div className="text-sm text-gray-400">
                {spaces.length} space{spaces.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Connections */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Connections</h3>
              <div className="text-sm text-gray-400">
                {connections.length} connection{connections.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert spec profile to UI profile
export function specProfileToUIProfile(specProfile: any) {
  return {
    displayName: specProfile.displayName || specProfile.handle || 'User',
    handle: specProfile.handle,
    bio: specProfile.bio,
    photoURL: specProfile.photoURL,
    coverPhotoURL: specProfile.coverPhotoURL,
    major: specProfile.major,
    year: specProfile.year,
    school: specProfile.school,
  };
}
