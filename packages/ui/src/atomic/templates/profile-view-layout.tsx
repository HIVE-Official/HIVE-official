'use client';

import React from 'react';
import { ProfileIdentityWidget } from '../organisms/profile-identity-widget';
import { MyActivityWidget } from '../organisms/profile-activity-widget';
import { MySpacesWidget } from '../organisms/profile-spaces-widget';
import { MyConnectionsWidget } from '../organisms/profile-connections-widget';
import { ProfileCompletionCard } from '../organisms/profile-completion-card';
import { HiveLabWidget } from '../organisms/hivelab-widget';
import type { UIProfile } from '../organisms/profile-types';
import type { PrivacyLevel } from '../molecules/privacy-control';

export interface ProfileViewLayoutProps {
  profile: UIProfile;
  isOwnProfile?: boolean;
  activities?: any[];
  spaces?: any[];
  connections?: any[];
  isSpaceLeader?: boolean;
  hasHiveLabAccess?: boolean;
  toolsCreated?: number;
  leadingSpaces?: Array<{ id: string; name: string; memberCount: number }>;
  onEditPhoto?: () => void;
  onPrivacyChange?: (widget: string, level: PrivacyLevel) => void;
  onStepClick?: (stepId: string) => void;
  onRequestHiveLabAccess?: () => void;
  onOpenHiveLab?: () => void;
  className?: string;
}

/**
 * Profile View Layout - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system with responsive columns
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * - Luxury minimalism with careful spacing
 */
export const ProfileViewLayout: React.FC<ProfileViewLayoutProps> = ({
  profile,
  isOwnProfile = false,
  activities = [],
  spaces = [],
  connections = [],
  isSpaceLeader = false,
  hasHiveLabAccess = false,
  toolsCreated = 0,
  leadingSpaces = [],
  onEditPhoto,
  onPrivacyChange,
  onStepClick,
  onRequestHiveLabAccess,
  onOpenHiveLab,
  className = ''
}) => {
  const completionPercentage = profile.metadata?.completionPercentage || 0;

  // Determine which steps are completed for the completion card
  const completedSteps = [];
  if (profile.identity.avatarUrl) completedSteps.push('avatar');
  if (profile.personal?.bio) completedSteps.push('bio');
  if (profile.academic?.major && profile.academic?.academicYear) completedSteps.push('academic');
  if (profile.academic?.housing) completedSteps.push('housing');
  if (profile.personal?.interests?.length > 0) completedSteps.push('interests');
  if (spaces.length >= 3) completedSteps.push('spaces');

  // Check widget privacy settings
  const shouldShowWidget = (widgetKey: string) => {
    const widgetPrivacy = profile.widgets?.[widgetKey as keyof typeof profile.widgets];
    if (!widgetPrivacy) return true;

    // If viewing own profile, always show
    if (isOwnProfile) return true;

    // Otherwise respect privacy level
    const level = widgetPrivacy.level || 'public';
    if (level === 'private') return false;

    // For 'connections' level, we'd need to check if viewer is connected
    // For now, we'll show it (this would need viewer context)
    return true;
  };

  return (
    <div
      className={`
        min-h-screen
        bg-black
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isOwnProfile ? 'My Profile' : `${profile.identity.fullName}'s Profile`}
          </h1>
          <p className="text-gray-400">
            {isOwnProfile
              ? 'Manage your profile and privacy settings'
              : `${profile.academic?.academicYear || 'Student'} at University at Buffalo`
            }
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Identity & Completion */}
          <div className="space-y-6">
            {/* Profile Identity - Always visible */}
            <ProfileIdentityWidget
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditPhoto={onEditPhoto}
            />

            {/* Completion Card - Only for own profile */}
            {isOwnProfile && completionPercentage < 100 && (
              <ProfileCompletionCard
                completionPercentage={completionPercentage}
                completedSteps={completedSteps}
                onStepClick={onStepClick}
              />
            )}
          </div>

          {/* Column 2: Activity & Spaces */}
          <div className="space-y-6">
            {/* My Activity Widget */}
            {shouldShowWidget('myActivity') && (
              <MyActivityWidget
                activities={activities}
                isOwnProfile={isOwnProfile}
                privacyLevel={(profile.widgets?.myActivity?.level || 'public') as PrivacyLevel}
                onPrivacyChange={(level) => onPrivacyChange?.('myActivity', level)}
              />
            )}

            {/* My Spaces Widget */}
            {shouldShowWidget('mySpaces') && (
              <MySpacesWidget
                spaces={spaces}
                isOwnProfile={isOwnProfile}
                privacyLevel={(profile.widgets?.mySpaces?.level || 'public') as PrivacyLevel}
                onPrivacyChange={(level) => onPrivacyChange?.('mySpaces', level)}
              />
            )}
          </div>

          {/* Column 3: Connections & Additional */}
          <div className="space-y-6">
            {/* My Connections Widget */}
            {shouldShowWidget('myConnections') && (
              <MyConnectionsWidget
                connections={connections}
                isOwnProfile={isOwnProfile}
                privacyLevel={(profile.widgets?.myConnections?.level || 'public') as PrivacyLevel}
                onPrivacyChange={(level) => onPrivacyChange?.('myConnections', level)}
              />
            )}

            {/* HiveLab Widget - Always shown but locked for non-leaders */}
            <HiveLabWidget
              isSpaceLeader={isSpaceLeader}
              hasAccess={hasHiveLabAccess}
              toolsCreated={toolsCreated}
              toolsUsed={[]} // Would be populated with actual tools data
              leadingSpaces={leadingSpaces}
              onRequestAccess={onRequestHiveLabAccess}
              onOpenStudio={onOpenHiveLab}
            />
          </div>
        </div>

        {/* Mobile-optimized bottom spacing */}
        <div className="h-20 lg:h-0" />
      </div>
    </div>
  );
};