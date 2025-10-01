'use client';

import React from 'react';
import { Card } from '../atoms/card';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import {
  Camera,
  MapPin,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Users,
  Activity
} from 'lucide-react';
import type { UIProfile } from './profile-types';
import { PresenceIndicator, type PresenceStatus } from '../atoms/presence-indicator';
import { PrivacyControl, type PrivacyLevel } from '../molecules/privacy-control';

export interface ProfileIdentityWidgetProps {
  profile: UIProfile;
  isOwnProfile?: boolean;
  onEditPhoto?: () => void;
  presenceStatus?: PresenceStatus;
  lastSeen?: Date;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  className?: string;
}

/**
 * Profile Identity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury minimalism with gold accent
 * - 8px grid system
 * - Black/Gold/White/Gray palette only
 * - 5 states: default, hover, focus, active, disabled
 * - Mobile-first with 44px touch targets
 */
export const ProfileIdentityWidget: React.FC<ProfileIdentityWidgetProps> = ({
  profile,
  isOwnProfile = false,
  onEditPhoto,
  presenceStatus = 'offline',
  lastSeen,
  privacyLevel = 'public',
  onPrivacyChange,
  className = ''
}) => {
  const completionPercentage = profile.metadata?.completionPercentage || 0;
  const isVerified = profile.verification?.facultyVerified;

  // SPEC: No handle display - use name and academic info
  const displayName = profile.identity.fullName || 'Anonymous Student';
  const academicInfo = profile.academic;
  const yearLabel = academicInfo.academicYear?.charAt(0).toUpperCase() +
                    academicInfo.academicYear?.slice(1) || '';

  return (
    <Card
      className={`
        relative overflow-hidden
        bg-black border border-white/8
        p-8 space-y-6
        transition-all duration-300
        hover:border-white/16
        ${className}
      `}
    >
      {/* Luxury Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" />

      {/* Privacy Control - Only for own profile */}
      {isOwnProfile && onPrivacyChange && (
        <div className="absolute top-4 right-4 z-10">
          <PrivacyControl
            level={privacyLevel}
            onLevelChange={onPrivacyChange}
            compact
            className="backdrop-blur-sm"
          />
        </div>
      )}

      {/* Profile Photo Section */}
      <div className="flex items-start gap-6">
        <div className="relative group">
          <Avatar
            className="w-24 h-24 border-2 border-white/8 group-hover:border-[#FFD700]/40 transition-all duration-300"
          >
            {profile.identity.avatarUrl && (
              <img
                src={profile.identity.avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            )}
          </Avatar>

          {/* Edit Photo Overlay - Only for own profile */}
          {isOwnProfile && (
            <button
              onClick={onEditPhoto}
              className="
                absolute inset-0
                bg-black/60 opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
                rounded-full
                flex items-center justify-center
                min-h-[44px] min-w-[44px]
              "
              aria-label="Change profile photo"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Presence Indicator */}
          <div className="absolute -bottom-1 -right-1 z-10">
            <PresenceIndicator
              status={presenceStatus}
              size="lg"
              lastSeen={lastSeen}
            />
          </div>

          {/* Verification Badge */}
          {isVerified && (
            <div className="absolute -top-1 -right-1">
              <div className="bg-[#FFD700] rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-black" />
              </div>
            </div>
          )}
        </div>

        {/* Identity Information */}
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {displayName}
            </h2>

            {/* Academic Status */}
            <div className="flex items-center gap-2 mt-1">
              <GraduationCap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {yearLabel} {academicInfo.major && `• ${academicInfo.major}`}
                {academicInfo.graduationYear && ` '${String(academicInfo.graduationYear).slice(-2)}`}
              </span>
            </div>

            {/* Location/Housing */}
            {academicInfo.housing && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {academicInfo.housing}
                </span>
              </div>
            )}
          </div>

          {/* Profile Stats Row */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {profile.social?.connections?.connectionIds?.length || 0} connections
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                {profile.social?.mutualSpaces?.length || 0} spaces
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {profile.personal?.bio && (
        <div className="pt-4 border-t border-white/8">
          <p className="text-sm text-gray-300 leading-relaxed">
            {profile.personal.bio}
          </p>
        </div>
      )}

      {/* Profile Completion Indicator (Psychology Hook) */}
      {isOwnProfile && completionPercentage < 70 && (
        <div className="pt-4 border-t border-white/8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">
              Profile Strength
            </span>
            <span className="text-xs text-[#FFD700] font-medium">
              {completionPercentage}% Complete
            </span>
          </div>

          <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFD700]/60 to-[#FFD700] transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {completionPercentage < 50 && (
            <p className="text-xs text-gray-400 mt-2">
              Complete your profile to unlock all features
            </p>
          )}
        </div>
      )}

      {/* Current Vibe/Status */}
      {profile.personal?.currentVibe && (
        <div className="flex items-center gap-2 pt-4 border-t border-white/8">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="text-sm text-gray-300">
            {profile.personal.currentVibe}
          </span>
        </div>
      )}
    </Card>
  );
};