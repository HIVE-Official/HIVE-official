"use client";

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { ProfileDashboard, type ProfileData } from '@hive/ui';
import { useHiveProfile } from '../../hooks/use-hive-profile';
import type { HiveProfile } from '@hive/core';

interface ProfileDataAdapterProps {
  userId: string;
  isOwnProfile: boolean;
  className?: string;
}

/**
 * Profile Data Adapter Component
 * Bridges the gap between API data structures and UI component requirements
 * Handles real-time data transformation and state management
 */
export function ProfileDataAdapter({
  userId,
  isOwnProfile,
  className
}: ProfileDataAdapterProps) {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadAvatar,
    toggleGhostMode,
    refreshDashboard,
    // Calendar functions
    createEvent,
    updateEvent,
    deleteEvent,
    getCalendarEvents,
    detectConflicts,
    resolveConflict
  } = useHiveProfile();

  // State for additional data that needs to be fetched
  const [spaces, setSpaces] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [tools, setTools] = useState([]);
  const [recommendedSpaces, setRecommendedSpaces] = useState([]);

  // Transform HiveProfile to ProfileData format
  const profileData: ProfileData | null = useMemo(() => {
    if (!profile) return null;
    
    return {
      user: {
        id: profile.identity.id,
        displayName: profile.identity.fullName || '',
        email: profile.identity.email || '',
        profilePhotoURL: profile.identity.avatarUrl,
        bio: profile.personal.bio || '',
        academicInfo: {
          year: profile.academic.graduationYear?.toString() || '',
          major: profile.academic.major || '',
          school: 'University at Buffalo',
          housing: profile.academic.housing || ''
        },
        builderStatus: profile.builder?.isBuilder || false,
        isVerified: profile.verification?.emailVerified || false,
        ghostMode: profile.privacy?.ghostMode?.enabled || false,
        lastSeen: profile.timestamps.lastSeenAt 
          ? new Date(profile.timestamps.lastSeenAt).toLocaleString() 
          : 'just now',
        isOnline: true
      },
      events,
      notifications,
      spaces,
      recommendedSpaces,
      ghostModeSettings: {
        isEnabled: profile.privacy?.ghostMode?.enabled || false,
        presets: {
          hideActivity: profile.privacy?.showActivity === false,
          hideLocation: false,
          hideOnlineStatus: profile.privacy?.showOnlineStatus === false
        }
      },
      tools,
      builderStats: {
        toolsCreated: profile.builder?.toolsCreated || 0,
        totalUses: profile.stats?.toolsUsed || 0,
        totalLikes: 0, // Will be calculated from tools
        builderRank: profile.builder?.builderLevel || 'Newcomer'
      },
      isBuilder: profile.builder?.isBuilder || false
    };
  }, [profile, events, notifications, spaces, recommendedSpaces, tools]);

  // Load additional data when profile is available
  useEffect(() => {
    if (!profile) return;
    
    const loadAdditionalData = async () => {
      try {
        // Load calendar events
        const calendarEvents = await getCalendarEvents();
        setEvents(calendarEvents.map(event => ({
          id: event.id,
          title: event.title,
          startTime: event.startDate,
          type: event.type,
          location: event.location,
          description: event.description
        })));

        // Load spaces data (placeholder for now)
        setSpaces([
          {
            id: 'cs350',
            name: 'CSE 350: Algorithm Analysis',
            description: 'Course space for algorithm analysis and design',
            memberCount: 247,
            category: 'course',
            isPrivate: false,
            membershipStatus: 'member',
            lastActivity: '15 minutes ago',
            tags: ['computer-science', 'algorithms']
          }
        ]);

        // Load notifications (placeholder for now)
        setNotifications([
          {
            id: 'notif-1',
            type: 'space_activity',
            title: 'New post in CS Study Collective',
            message: 'Maria shared study notes for CSE 331',
            timestamp: '15 minutes ago',
            isRead: false,
            actionRequired: false
          }
        ]);

        // Load tools (placeholder for now)
        setTools([
          {
            id: 'gpa-calculator',
            name: 'UB GPA Calculator',
            description: 'Calculate your semester and cumulative GPA',
            category: 'Academic',
            isCreated: profile.builder?.isBuilder || false,
            lastUsed: '2 days ago',
            usageCount: 15,
            icon: '📊'
          }
        ]);

        // Load recommended spaces (placeholder for now)
        setRecommendedSpaces([
          {
            id: 'ub-cs-community',
            name: 'UB Computer Science Community',
            description: 'General CS community for students',
            memberCount: 892,
            category: 'academic',
            isPrivate: false,
            membershipStatus: 'none',
            lastActivity: '30 minutes ago',
            tags: ['computer-science', 'community']
          }
        ]);

      } catch (error) {
        console.error('Failed to load additional profile data:', error);
      }
    };

    loadAdditionalData();
  }, [profile, getCalendarEvents]);

  // Enhanced event handlers
  const handleProfileUpdate = useCallback(async (updates: any) => {
    try {
      await updateProfile({
        identity: updates.displayName ? { fullName: updates.displayName } : undefined,
        personal: updates.bio ? { bio: updates.bio } : undefined,
        academic: updates.academicInfo ? {
          graduationYear: updates.academicInfo.year ? parseInt(updates.academicInfo.year) : undefined,
          major: updates.academicInfo.major,
          housing: updates.academicInfo.housing
        } : undefined
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }, [updateProfile]);

  const handlePhotoUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const result = await uploadAvatar(file);
      if (!result) throw new Error('Upload failed');
      return result;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error;
    }
  }, [uploadAvatar]);

  const handleGhostModeChange = useCallback(async (settings: any) => {
    try {
      await updateProfile({
        privacy: {
          ghostMode: {
            enabled: settings.isEnabled,
            level: settings.isEnabled ? 'moderate' : 'minimal'
          },
          showActivity: !settings.presets?.hideActivity,
          showOnlineStatus: !settings.presets?.hideOnlineStatus
        }
      });
    } catch (error) {
      console.error('Failed to update ghost mode:', error);
    }
  }, [updateProfile]);

  const handleEventCreate = useCallback(async (event: any) => {
    try {
      const newEvent = await createEvent({
        title: event.title,
        description: event.description,
        startDate: event.startTime,
        endDate: event.endTime,
        type: event.type,
        location: event.location
      });
      
      if (newEvent) {
        setEvents(prev => [...prev, {
          id: newEvent.id,
          title: newEvent.title,
          startTime: newEvent.startDate,
          type: newEvent.type,
          location: newEvent.location,
          description: newEvent.description
        }]);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  }, [createEvent]);

  const handleEventUpdate = useCallback(async (id: string, updates: any) => {
    try {
      const success = await updateEvent(id, {
        title: updates.title,
        description: updates.description,
        startDate: updates.startTime,
        endDate: updates.endTime,
        type: updates.type,
        location: updates.location
      });
      
      if (success) {
        setEvents(prev => prev.map(event => 
          event.id === id ? { ...event, ...updates } : event
        ));
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  }, [updateEvent]);

  // Show loading state
  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-gold)] mx-auto mb-4"></div>
          <p className="text-[var(--hive-text-secondary)]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Profile Error</h2>
          <p className="text-[var(--hive-text-secondary)] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--hive-brand-gold)] text-[var(--hive-background-primary)] rounded-lg hover:bg-[var(--hive-brand-gold)]/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProfileDashboard
      userId={userId}
      isOwnProfile={isOwnProfile}
      className={className}
      data={profileData}
      onProfileUpdate={handleProfileUpdate}
      onPhotoUpload={handlePhotoUpload}
      onGhostModeChange={handleGhostModeChange}
      onEventCreate={handleEventCreate}
      onEventUpdate={handleEventUpdate}
    />
  );
}