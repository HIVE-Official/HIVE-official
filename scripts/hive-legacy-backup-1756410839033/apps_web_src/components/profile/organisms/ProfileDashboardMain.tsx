"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileHeader } from '../molecules/ProfileHeader';
import { ProfileStatsGrid } from '../molecules/ProfileStatsGrid';
import { ErrorBoundary } from '../../error-boundary';

interface ProfileUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  school?: string;
  major?: string;
  year?: string;
  joinedAt?: string;
  status?: 'online' | 'offline' | 'busy' | 'away' | 'studying';
  isOnline: boolean;
  completionPercentage: number;
}

interface ProfileStats {
  connections?: number;
  spaces?: number;
  tools?: number;
  achievements?: number;
}

interface ProfileDashboardMainProps {
  user: ProfileUser;
  stats?: ProfileStats;
  isLoading?: boolean;
  onEditProfile?: () => void;
  onAvatarChange?: (file: File) => void;
  onStatClick?: (statType: string) => void;
  className?: string;
}

export function ProfileDashboardMain({ 
  user, 
  stats, 
  isLoading = false,
  onEditProfile,
  onAvatarChange,
  onStatClick,
  className = '' 
}: ProfileDashboardMainProps) {
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(false);

  // Handle avatar upload with loading state
  const handleAvatarChange = useCallback(async (file: File) => {
    if (!onAvatarChange) return;
    
    setLocalLoading(true);
    try {
      await onAvatarChange(file);
    } catch (error) {
      console.error('Avatar upload failed:', error);
      // Error handling could be improved with toast notifications
    } finally {
      setLocalLoading(false);
    }
  }, [onAvatarChange]);

  // Handle stat clicks with navigation
  const handleStatClick = useCallback((statType: 'connections' | 'spaces' | 'tools' | 'achievements') => {
    if (onStatClick) {
      onStatClick(statType);
    } else {
      // Default navigation behavior
      switch (statType) {
        case 'spaces':
          router.push('/spaces');
          break;
        case 'tools':
          router.push('/tools');
          break;
        case 'connections':
          router.push('/profile/connections');
          break;
        case 'achievements':
          router.push('/profile/achievements');
          break;
      }
    }
  }, [onStatClick, router]);

  // Loading skeleton for when user data is not available
  if (!user && isLoading) {
    return (
      <div className={`space-y-4 sm:space-y-6 ${className}`}>
        {/* Header Skeleton */}
        <div className="p-4 sm:p-6 rounded-xl border border-hive-border-subtle bg-hive-background-secondary/50 animate-pulse">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-hive-background-primary rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="h-6 sm:h-8 bg-hive-background-primary rounded w-32 sm:w-48" />
              <div className="h-4 bg-hive-background-primary rounded w-32" />
              <div className="h-4 bg-hive-background-primary rounded w-full max-w-md" />
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="p-3 sm:p-4 rounded-xl border border-hive-border-subtle bg-hive-background-secondary/50 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-hive-background-primary rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-hive-background-primary rounded w-16" />
                  <div className="h-4 bg-hive-background-primary rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (!user && !isLoading) {
    return (
      <div className={`
        p-8 rounded-xl border border-hive-border-subtle
        bg-hive-background-secondary/50 text-center
        ${className}
      `}>
        <p className="text-hive-text-secondary mb-4">
          Unable to load profile information
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg hover:bg-hive-brand-hover transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`space-y-6 ${className}`}>
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          completionPercentage={user.completionPercentage}
          isOnline={user.isOnline}
          onEdit={onEditProfile}
          onAvatarChange={handleAvatarChange}
        />

        {/* Stats Grid */}
        <ProfileStatsGrid
          stats={stats}
          onStatClick={handleStatClick}
          isLoading={isLoading || localLoading}
        />
      </div>
    </ErrorBoundary>
  );
}