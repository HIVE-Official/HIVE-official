"use client";

import { ProfileDashboard } from "@hive/ui";
import { useHiveProfile } from '../../../hooks/use-hive-profile';
import { ErrorBoundary } from '../../../components/error-boundary';
import { AuthTest } from '../../../components/auth-test';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Advanced ProfileDashboard from UI package with sophisticated BentoGrid layout

export default function HiveProfilePage() {
  const router = useRouter();
  
  // Use our centralized profile hook with calendar management
  const {
    profile,
    dashboard,
    isLoading,
    error,
    completeness,
    clearError,
    createEvent,
    updateEvent,
    deleteEvent,
    getCalendarEvents,
    detectConflicts,
    resolveConflict
  } = useHiveProfile();

  // Calendar state management
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarConflicts, setCalendarConflicts] = useState([]);

  // Load calendar events when component mounts
  useEffect(() => {
    if (profile) {
      const loadCalendarData = async () => {
        try {
          const events = await getCalendarEvents();
          const conflicts = await detectConflicts();
          setCalendarEvents(events);
          setCalendarConflicts(conflicts);
        } catch (error) {
          console.error('Failed to load calendar data:', error);
        }
      };
      loadCalendarData();
    }
  }, [profile, getCalendarEvents, detectConflicts]);

  // Transform profile data for ProfileDashboard component
  const profileUser = useMemo(() => {
    if (!profile) return null;
    
    return {
      id: profile.identity.id,
      name: profile.identity.fullName,
      handle: profile.identity.handle, 
      email: profile.identity.email || '',
      avatar: profile.identity.avatarUrl,
      year: profile.academic.graduationYear?.toString(),
      major: profile.academic.major,
      dorm: profile.personal.location,
      isOnline: true,
      isBuilder: profile.builder?.isBuilder || false,
      completionPercentage: completeness || 0,
      statusMessage: profile.personal.statusMessage || '',
      memberSince: profile.timestamps.createdAt
    };
  }, [profile, completeness]);

  // Transform dashboard data for ProfileDashboard component
  const spaces = useMemo(() => {
    return dashboard?.recentSpaces?.map(space => ({
      id: space.id,
      name: space.name,
      type: space.type as any,
      memberCount: space.memberCount,
      unreadCount: Math.floor(Math.random() * 5), // Mock unread count
      lastActivity: space.lastActivity,
      isPinned: space.role === 'leader',
      isFavorite: space.type === 'favorite',
      isMuted: false, // Default to not muted
      userRole: (space.role || 'member') as 'member' | 'moderator' | 'leader',
      recentActivity: {
        type: 'message' as const,
        preview: 'Recent activity in this space',
        timestamp: space.lastActivity
      }
    })) || [
      // Fallback mock data
      {
        id: '1',
        name: 'CS 101: Intro to Programming',
        type: 'course' as const,
        memberCount: 847,
        unreadCount: 3,
        lastActivity: new Date().toISOString(),
        isPinned: true,
        isMuted: false,
        userRole: 'member' as const,
        recentActivity: {
          type: 'announcement' as const,
          preview: 'New assignment posted',
          timestamp: new Date().toISOString()
        }
      }
    ];
  }, [dashboard]);

  const activities = useMemo(() => {
    return dashboard?.recentActivity?.map((activity, index) => ({
      id: activity.id,
      type: activity.type,
      title: activity.title,
      content: `Activity content for ${activity.title}`,
      author: {
        name: 'System',
        handle: 'system'  
      },
      timestamp: activity.timestamp,
      priority: 'medium' as const,
      isUnread: index < 2,
      metadata: {
        likes: Math.floor(Math.random() * 20),
        replyCount: Math.floor(Math.random() * 10)
      }
    })) || [];
  }, [dashboard]);

  const availableTools = useMemo(() => [
    {
      id: '1',
      name: 'Study Schedule Template',
      type: 'template' as const,
      category: 'productivity' as const,
      description: 'Create personalized study schedules',
      icon: '📅',
      difficulty: 'beginner' as const,
      timeToCreate: '5 min',
      popularity: 5,
      usageCount: 1247
    }
  ], []);

  const createdTools = useMemo(() => [
    {
      id: 'c1',
      name: 'My Study Planner',
      type: 'template' as const,
      category: 'productivity' as const,
      description: 'Personal study schedule',
      icon: '📚',
      createdAt: new Date().toISOString(),
      usageCount: 45,
      isPublic: true,
      likes: 12
    }
  ], []);

  // Event handlers
  const handleSpaceClick = (spaceId: string) => {
    router.push(`/spaces/${spaceId}`);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleJoinSpace = () => {
    router.push('/spaces?view=browse');
  };

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId);
  };

  const handleToolClick = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };

  const handleCreateTool = (toolType: string) => {
    router.push(`/tools/create?type=${toolType}`);
  };

  const handleBecomeBuilder = () => {
    router.push('/onboarding/builder');
  };

  const handleViewAllSpaces = () => {
    router.push('/spaces');
  };

  const handleViewAllActivities = () => {
    router.push('/feed');
  };

  // Space management handlers
  const handleMuteSpace = async (spaceId: string, muted: boolean) => {
    try {
      // TODO: Implement actual API call when spaces API is ready
      console.log(`${muted ? 'Muting' : 'Unmuting'} space:`, spaceId);
      // For now, just log the action
    } catch (error) {
      console.error('Failed to update space mute status:', error);
    }
  };

  const handlePinSpace = async (spaceId: string, pinned: boolean) => {
    try {
      // TODO: Implement actual API call when spaces API is ready
      console.log(`${pinned ? 'Pinning' : 'Unpinning'} space:`, spaceId);
      // For now, just log the action
    } catch (error) {
      console.error('Failed to update space pin status:', error);
    }
  };

  const handleLeaveSpace = async (spaceId: string) => {
    try {
      // TODO: Implement actual API call when spaces API is ready
      console.log('Leaving space:', spaceId);
      // For now, just log the action
    } catch (error) {
      console.error('Failed to leave space:', error);
    }
  };

  const handleQuickPost = async (spaceId: string, message: string) => {
    try {
      // TODO: Implement actual API call when spaces API is ready
      console.log('Quick post to space:', spaceId, 'Message:', message);
      // For now, just log the action
    } catch (error) {
      console.error('Failed to post to space:', error);
    }
  };

  const handleJoinToolsWaitlist = () => {
    // TODO: Implement waitlist signup
    console.log('User wants to join tools waitlist for v1');
    // For now, could show a modal or redirect to waitlist page
    router.push('/waitlist/tools');
  };

  // Calendar event handlers
  const handleCreateEvent = async (eventData: Record<string, unknown>) => {
    try {
      const newEvent = await createEvent(eventData);
      if (newEvent) {
        setCalendarEvents(prev => [...prev, newEvent]);
        // Check for new conflicts
        const conflicts = await detectConflicts();
        setCalendarConflicts(conflicts);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleUpdateEvent = async (id: string, updates: Record<string, unknown>) => {
    try {
      await updateEvent(id, updates);
      // Refresh calendar data
      const events = await getCalendarEvents();
      const conflicts = await detectConflicts();
      setCalendarEvents(events);
      setCalendarConflicts(conflicts);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setCalendarEvents(prev => prev.filter((event: Record<string, unknown>) => (event.id as string) !== id));
      // Check for updated conflicts
      const conflicts = await detectConflicts();
      setCalendarConflicts(conflicts);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleResolveConflict = async (conflictId: string, resolution: string, eventId?: string) => {
    try {
      await resolveConflict(conflictId, resolution, eventId);
      // Refresh calendar data after conflict resolution
      const events = await getCalendarEvents();
      const conflicts = await detectConflicts();
      setCalendarEvents(events);
      setCalendarConflicts(conflicts);
    } catch (error) {
      console.error('Failed to resolve conflict:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-4"></div>
          <p className="text-hive-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-hive-text-primary mb-2">Profile Error</h2>
          <p className="text-hive-text-secondary mb-4">{error}</p>
          <button 
            onClick={clearError}
            className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hive-background-primary">
      <ErrorBoundary>
        {/* Development Helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="border-b border-hive-border-subtle p-4">
            <AuthTest />
          </div>
        )}

        {/* Advanced ProfileDashboard */}
        <ProfileDashboard
          user={profileUser}
          spaces={spaces}
          activities={activities}
          availableTools={availableTools}
          createdTools={createdTools}
          calendarEvents={calendarEvents}
          calendarConflicts={calendarConflicts}
          layout="desktop"
          showBuilder={true}
          showCalendar={true}
          isLoading={{
            profile: isLoading,
            spaces: isLoading,
            activities: isLoading,
            tools: isLoading,
            calendar: isLoading
          }}
          onSpaceClick={handleSpaceClick}
          onActivityClick={handleActivityClick}
          onToolClick={handleToolClick}
          onCreateTool={handleCreateTool}
          onBecomeBuilder={handleBecomeBuilder}
          onJoinSpace={handleJoinSpace}
          onViewAllSpaces={handleViewAllSpaces}
          onViewAllActivities={handleViewAllActivities}
          onEditProfile={handleEditProfile}
          onMuteSpace={handleMuteSpace}
          onPinSpace={handlePinSpace}
          onLeaveSpace={handleLeaveSpace}
          onQuickPost={handleQuickPost}
          onJoinToolsWaitlist={handleJoinToolsWaitlist}
          onCreateEvent={handleCreateEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          onResolveConflict={handleResolveConflict}
        />
      </ErrorBoundary>
    </div>
  );
}