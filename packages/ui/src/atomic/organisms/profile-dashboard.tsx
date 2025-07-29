'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';

// Import our sophisticated molecules
import { CampusIdentityHeader } from '../molecules/campus-identity-header';
import { CampusSpacesCard } from '../molecules/campus-spaces-card';
import { CampusActivityFeed } from '../molecules/campus-activity-feed';
import { CampusBuilderTools } from '../molecules/campus-builder-tools';

// Types from our molecules
import type { CampusIdentityHeaderProps } from '../molecules/campus-identity-header';
import type { CampusSpacesCardProps } from '../molecules/campus-spaces-card';
import type { CampusActivityFeedProps } from '../molecules/campus-activity-feed';
import type { CampusBuilderToolsProps } from '../molecules/campus-builder-tools';

export interface ProfileDashboardProps {
  // Profile data
  user: CampusIdentityHeaderProps['user'];
  
  // Spaces data
  spaces: CampusSpacesCardProps['spaces'];
  
  // Activity data
  activities: CampusActivityFeedProps['activities'];
  
  // Builder tools data
  availableTools: CampusBuilderToolsProps['availableTools'];
  createdTools: CampusBuilderToolsProps['createdTools'];
  
  // Layout configuration
  layout?: 'desktop' | 'tablet' | 'mobile';
  variant?: 'default' | 'compact' | 'focused';
  showBuilder?: boolean;
  
  // Loading states
  isLoading?: {
    profile?: boolean;
    spaces?: boolean;
    activities?: boolean;
    tools?: boolean;
  };
  
  // Interactive callbacks
  onAvatarClick?: () => void;
  onEditProfile?: () => void;
  onSpaceClick?: (spaceId: string) => void;
  onActivityClick?: (activityId: string) => void;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: (toolType: string) => void;
  onBecomeBuilder?: () => void;
  onJoinSpace?: () => void;
  onViewAllSpaces?: () => void;
  onViewAllActivities?: () => void;
  
  className?: string;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  user,
  spaces,
  activities,
  availableTools,
  createdTools,
  layout = 'desktop',
  variant = 'default',
  showBuilder = true,
  isLoading = {},
  onAvatarClick,
  onEditProfile,
  onSpaceClick,
  onActivityClick,
  onToolClick,
  onCreateTool,
  onBecomeBuilder,
  onJoinSpace,
  onViewAllSpaces,
  onViewAllActivities,
  className
}) => {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  const handleSectionLoad = (section: string) => {
    setLoadedSections(prev => new Set([...prev, section]));
  };

  // Desktop BentoGrid Layout
  const DesktopLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area - 3 columns */}
      <div className="lg:col-span-3 space-y-6">
        {/* Campus Identity Header - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('identity')}
        >
          <CampusIdentityHeader
            user={user}
            showStatus={true}
            onAvatarClick={onAvatarClick}
            onEditClick={onEditProfile}
          />
        </motion.div>

        {/* Campus Activity Feed - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('activity')}
        >
          <CampusActivityFeed
            activities={activities}
            isLoading={isLoading.activities}
            maxItems={6}
            onActivityClick={onActivityClick}
            onViewAll={onViewAllActivities}
          />
        </motion.div>
      </div>

      {/* Sidebar - 1 column */}
      <div className="lg:col-span-1 space-y-6">
        {/* Campus Spaces */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => handleSectionLoad('spaces')}
        >
          <CampusSpacesCard
            spaces={spaces}
            isLoading={isLoading.spaces}
            onSpaceClick={onSpaceClick}
            onJoinSpace={onJoinSpace}
            onViewAll={onViewAllSpaces}
          />
        </motion.div>

        {/* Builder Tools - Subtle Sidebar Treatment */}
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={() => handleSectionLoad('tools')}
          >
            <CampusBuilderTools
              availableTools={availableTools}
              createdTools={createdTools}
              isBuilder={user.isBuilder}
              isLoading={isLoading.tools}
              onToolClick={onToolClick}
              onCreateTool={onCreateTool}
              onBecomeBuilder={onBecomeBuilder}
            />
          </motion.div>
        )}
      </div>
    </div>
  );

  // Tablet Layout - 2 Column
  const TabletLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Campus Identity Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusIdentityHeader
            user={user}
            variant="compact"
            showStatus={true}
            onAvatarClick={onAvatarClick}
            onEditClick={onEditProfile}
          />
        </motion.div>

        {/* Campus Spaces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusSpacesCard
            spaces={spaces}
            isLoading={isLoading.spaces}
            onSpaceClick={onSpaceClick}
            onJoinSpace={onJoinSpace}
            onViewAll={onViewAllSpaces}
          />
        </motion.div>

        {/* Builder Tools */}
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <CampusBuilderTools
              availableTools={availableTools}
              createdTools={createdTools}
              isBuilder={user.isBuilder}
              isLoading={isLoading.tools}
              variant="compact"
              onToolClick={onToolClick}
              onCreateTool={onCreateTool}
              onBecomeBuilder={onBecomeBuilder}
            />
          </motion.div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Campus Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusActivityFeed
            activities={activities}
            isLoading={isLoading.activities}
            variant="compact"
            maxItems={8}
            onActivityClick={onActivityClick}
            onViewAll={onViewAllActivities}
          />
        </motion.div>
      </div>
    </div>
  );

  // Mobile Layout - Single Column Stack
  const MobileLayout = () => (
    <div className="space-y-6">
      {/* Campus Identity Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusIdentityHeader
          user={user}
          variant="compact"
          showStatus={true}
          onAvatarClick={onAvatarClick}
          onEditClick={onEditProfile}
        />
      </motion.div>

      {/* Campus Activity Feed - Priority on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusActivityFeed
          activities={activities}
          isLoading={isLoading.activities}
          variant="compact"
          maxItems={5}
          onActivityClick={onActivityClick}
          onViewAll={onViewAllActivities}
        />
      </motion.div>

      {/* Campus Spaces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <CampusSpacesCard
          spaces={spaces}
          isLoading={isLoading.spaces}
          variant="compact"
          onSpaceClick={onSpaceClick}
          onJoinSpace={onJoinSpace}
          onViewAll={onViewAllSpaces}
        />
      </motion.div>

      {/* Builder Tools - Most subtle on mobile */}
      {showBuilder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <CampusBuilderTools
            availableTools={availableTools}
            createdTools={createdTools}
            isBuilder={user.isBuilder}
            isLoading={isLoading.tools}
            variant="subtle"
            onToolClick={onToolClick}
            onCreateTool={onCreateTool}
            onBecomeBuilder={onBecomeBuilder}
          />
        </motion.div>
      )}
    </div>
  );

  const getLayout = () => {
    switch (layout) {
      case 'mobile':
        return <MobileLayout />;
      case 'tablet':
        return <TabletLayout />;
      default:
        return <DesktopLayout />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        // HIVE Foundation
        'min-h-screen bg-obsidian',
        // Responsive padding with HIVE spacing
        'p-4 md:p-6 lg:p-8',
        // Maximum width constraint
        'max-w-7xl mx-auto',
        className
      )}
    >
      {/* Background Pattern - Subtle HIVE Aesthetic */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Profile Dashboard Layout */}
      <div className="relative z-10">
        {getLayout()}
      </div>

      {/* Loading Progress Indicator */}
      <AnimatePresence>
        {Object.values(isLoading).some(Boolean) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="rounded-2xl bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90 backdrop-blur-xl border border-steel/10 px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-gold to-champagne"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <span className="text-platinum text-sm font-medium">
                  Loading campus data...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast - Sections Loaded */}
      <AnimatePresence>
        {loadedSections.size >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl border border-emerald-500/20 px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]" />
                <span className="text-emerald-400 text-sm font-medium">
                  Profile loaded successfully
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Compound components for specific use cases
export const CompactProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant'>> = (props) => (
  <ProfileDashboard {...props} variant="compact" />
);

export const FocusedProfileDashboard: React.FC<Omit<ProfileDashboardProps, 'variant' | 'showBuilder'>> = (props) => (
  <ProfileDashboard {...props} variant="focused" showBuilder={false} />
);

export default ProfileDashboard;