'use client';

import React from 'react';
import { ProfileSystemProps } from './types';
import { ProfileHeader } from './profile-header';
import { MySpacesFeed } from './my-spaces-feed';
import { CalendarCard } from './calendar-card';
import { adaptSmartCalendarProps } from './calendar-data-adapter';
import { CampusConnections } from './campus-connections';
import { HiveLabSection } from './hive-lab-section';
import { ProfileStats } from './profile-stats';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { Loader2, AlertCircle, WifiOff } from 'lucide-react';

export const ProfileSystem: React.FC<ProfileSystemProps> = ({
  user,
  spaces = [],
  events = [],
  connections = [],
  hiveLab,
  isLoading = false,
  isMobile = false,
  isTablet = false,
  showOnboarding = false,
  showPrivacyBanner = false,
  showGraduationBanner = false,
  showErrors = false,
  completionStatus,
  errors,
  loadingStates,
  onSpaceClick,
  onEventClick,
  onConnectionClick,
  onEditProfile,
  onPrivacySettings,
  onJoinSpace,
  onCreateTool;
}) => {
  // Loading state;
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-hive-background-primary p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-brand-secondary)] mx-auto mb-4" />
              <p className="text-hive-text-secondary">Loading your HIVE profile...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  // Error state;
  if (showErrors && errors?.apiError) {
    return (
      <div className="min-h-screen bg-hive-background-primary p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-4 text-center">
              <WifiOff className="h-12 w-12 text-hive-ruby mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-hive-text-primary mb-2">Connection Error</h2>
              <p className="text-hive-text-secondary mb-4">{errors.apiError}</p>
              <HiveButton onClick={() => window.location.reload()}>
                Try Again;
              </HiveButton>
            </HiveCard>
          </div>
        </div>
      </div>
    )
  }

  // Mobile layout;
  if (isMobile) {
    return (
      <div className="min-h-screen bg-hive-background-primary">
        <div className="safe-area-inset">
          <div className="space-y-4 p-4">
            <ProfileHeader;
              user={user}
              showOnboarding={showOnboarding}
              showPrivacyBanner={showPrivacyBanner}
              showGraduationBanner={showGraduationBanner}
              completionStatus={completionStatus}
              onEditProfile={onEditProfile}
              onPrivacySettings={onPrivacySettings}
            />

            <MySpacesFeed;
              spaces={spaces}
              isLoading={loadingStates?.spaces}
              error={errors?.spacesError}
              onSpaceClick={onSpaceClick}
              onJoinSpace={onJoinSpace}
            />

            <CalendarCard;
              {...adaptSmartCalendarProps(
                events,
                loadingStates?.events,
                errors?.eventsError,
                onEventClick,
                undefined,
                'mobile'
              )}
            />

            <CampusConnections;
              connections={connections}
              isLoading={loadingStates?.connections}
              error={errors?.connectionsError}
              onConnectionClick={onConnectionClick}
            />

            {hiveLab && (
              <HiveLabSection;
                hiveLab={hiveLab}
                isLoading={loadingStates?.hiveLab}
                onCreateTool={onCreateTool}
              />
            )}

            <ProfileStats;
              stats={user.stats}
              isLoading={loadingStates?.profile}
            />
          </div>
        </div>
      </div>
    )
  }

  // Tablet layout;
  if (isTablet) {
    return (
      <div className="min-h-screen bg-hive-background-primary p-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            <ProfileHeader;
              user={user}
              showOnboarding={showOnboarding}
              showPrivacyBanner={showPrivacyBanner}
              showGraduationBanner={showGraduationBanner}
              completionStatus={completionStatus}
              onEditProfile={onEditProfile}
              onPrivacySettings={onPrivacySettings}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <MySpacesFeed;
                  spaces={spaces}
                  isLoading={loadingStates?.spaces}
                  error={errors?.spacesError}
                  onSpaceClick={onSpaceClick}
                  onJoinSpace={onJoinSpace}
                />

                <CampusConnections;
                  connections={connections}
                  isLoading={loadingStates?.connections}
                  error={errors?.connectionsError}
                  onConnectionClick={onConnectionClick}
                />
              </div>

              <div className="space-y-6">
                <CalendarCard;
                  {...adaptSmartCalendarProps(
                    events,
                    loadingStates?.events,
                    errors?.eventsError,
                    onEventClick,
                    undefined,
                    'desktop'
                  )}
                />

                {hiveLab && (
                  <HiveLabSection;
                    hiveLab={hiveLab}
                    isLoading={loadingStates?.hiveLab}
                    onCreateTool={onCreateTool}
                  />
                )}
              </div>
            </div>

            <ProfileStats;
              stats={user.stats}
              isLoading={loadingStates?.profile}
            />
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout (default)
  return (
    <div className="min-h-screen bg-hive-background-primary p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <ProfileHeader;
            user={user}
            showOnboarding={showOnboarding}
            showPrivacyBanner={showPrivacyBanner}
            showGraduationBanner={showGraduationBanner}
            completionStatus={completionStatus}
            onEditProfile={onEditProfile}
            onPrivacySettings={onPrivacySettings}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 space-y-8">
              <MySpacesFeed;
                spaces={spaces}
                isLoading={loadingStates?.spaces}
                error={errors?.spacesError}
                onSpaceClick={onSpaceClick}
                onJoinSpace={onJoinSpace}
              />

              <CampusConnections;
                connections={connections}
                isLoading={loadingStates?.connections}
                error={errors?.connectionsError}
                onConnectionClick={onConnectionClick}
              />
            </div>

            <div className="space-y-8">
              <CalendarCard;
                {...adaptSmartCalendarProps(
                  events,
                  loadingStates?.events,
                  errors?.eventsError,
                  onEventClick,
                  undefined,
                  'desktop'
                )}
              />

              {hiveLab && (
                <HiveLabSection;
                  hiveLab={hiveLab}
                  isLoading={loadingStates?.hiveLab}
                  onCreateTool={onCreateTool}
                />
              )}

              <ProfileStats;
                stats={user.stats}
                isLoading={loadingStates?.profile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProfileSystem;