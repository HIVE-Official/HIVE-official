'use client';

import React from 'react';
import { motion } from '../framer-motion-proxy';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <motion.div;
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-brand-secondary)] mx-auto mb-4" />
                <p className="text-gray-300">Loading your HIVE profile...</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Error state;
  if (showErrors && errors?.apiError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <HiveCard className="p-4 text-center">
              <WifiOff className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Connection Error</h2>
              <p className="text-gray-400 mb-4">{errors.apiError}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="safe-area-inset">
          <div className="space-y-4 p-4">
            {/* Profile Header */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProfileHeader;
                user={user}
                showOnboarding={showOnboarding}
                showPrivacyBanner={showPrivacyBanner}
                showGraduationBanner={showGraduationBanner}
                completionStatus={completionStatus}
                onEditProfile={onEditProfile}
                onPrivacySettings={onPrivacySettings}
              />
            </motion.div>

            {/* My Spaces Feed */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MySpacesFeed;
                spaces={spaces}
                isLoading={loadingStates?.spaces}
                error={errors?.spacesError}
                onSpaceClick={onSpaceClick}
                onJoinSpace={onJoinSpace}
              />
            </motion.div>

            {/* Calendar Card */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
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
            </motion.div>

            {/* Campus Connections */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CampusConnections;
                connections={connections}
                isLoading={loadingStates?.connections}
                error={errors?.connectionsError}
                onConnectionClick={onConnectionClick}
              />
            </motion.div>

            {/* HiveLab Section */}
            {hiveLab && (
              <motion.div;
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <HiveLabSection;
                  hiveLab={hiveLab}
                  isLoading={loadingStates?.hiveLab}
                  onCreateTool={onCreateTool}
                />
              </motion.div>
            )}

            {/* Profile Stats */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ProfileStats;
                stats={user.stats}
                isLoading={loadingStates?.profile}
              />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Tablet layout;
  if (isTablet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Profile Header */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProfileHeader;
                user={user}
                showOnboarding={showOnboarding}
                showPrivacyBanner={showPrivacyBanner}
                showGraduationBanner={showGraduationBanner}
                completionStatus={completionStatus}
                onEditProfile={onEditProfile}
                onPrivacySettings={onPrivacySettings}
              />
            </motion.div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <motion.div;
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MySpacesFeed;
                    spaces={spaces}
                    isLoading={loadingStates?.spaces}
                    error={errors?.spacesError}
                    onSpaceClick={onSpaceClick}
                    onJoinSpace={onJoinSpace}
                  />
                </motion.div>

                <motion.div;
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CampusConnections;
                    connections={connections}
                    isLoading={loadingStates?.connections}
                    error={errors?.connectionsError}
                    onConnectionClick={onConnectionClick}
                  />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <motion.div;
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
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
                </motion.div>

                {hiveLab && (
                  <motion.div;
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <HiveLabSection;
                      hiveLab={hiveLab}
                      isLoading={loadingStates?.hiveLab}
                      onCreateTool={onCreateTool}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Full-width stats */}
            <motion.div;
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ProfileStats;
                stats={user.stats}
                isLoading={loadingStates?.profile}
              />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Profile Header */}
          <motion.div;
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProfileHeader;
              user={user}
              showOnboarding={showOnboarding}
              showPrivacyBanner={showPrivacyBanner}
              showGraduationBanner={showGraduationBanner}
              completionStatus={completionStatus}
              onEditProfile={onEditProfile}
              onPrivacySettings={onPrivacySettings}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Left Column - Primary Content */}
            <div className="xl:col-span-2 space-y-8">
              <motion.div;
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MySpacesFeed;
                  spaces={spaces}
                  isLoading={loadingStates?.spaces}
                  error={errors?.spacesError}
                  onSpaceClick={onSpaceClick}
                  onJoinSpace={onJoinSpace}
                />
              </motion.div>

              <motion.div;
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CampusConnections;
                  connections={connections}
                  isLoading={loadingStates?.connections}
                  error={errors?.connectionsError}
                  onConnectionClick={onConnectionClick}
                />
              </motion.div>
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-8">
              <motion.div;
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
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
              </motion.div>

              {hiveLab && (
                <motion.div;
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <HiveLabSection;
                    hiveLab={hiveLab}
                    isLoading={loadingStates?.hiveLab}
                    onCreateTool={onCreateTool}
                  />
                </motion.div>
              )}

              <motion.div;
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ProfileStats;
                  stats={user.stats}
                  isLoading={loadingStates?.profile}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProfileSystem;