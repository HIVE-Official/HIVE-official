"use client";

import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

import { useSession } from './use-session';

// Comprehensive dashboard data interfaces
export interface DashboardSpace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  unreadCount: number;
  lastActivity: string;
  isActive: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  category: 'academic' | 'social' | 'professional' | 'creative';
  privacyLevel: 'public' | 'private' | 'invite-only';
}

export interface DashboardTool {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'social' | 'wellness';
  author: string;
  authorId: string;
  usageCount: number;
  rating: number;
  lastUsed?: string;
  isOwned: boolean;
  isFavorite: boolean;
  version: string;
  spaceId?: string;
}

export interface DashboardActivity {
  id: string;
  type: 'space_join' | 'space_create' | 'tool_create' | 'tool_use' | 'social_interaction' | 'academic_achievement';
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
  spaceId?: string;
  spaceName?: string;
  toolId?: string;
  toolName?: string;
  metadata?: Record<string, any>;
}

export interface DashboardNotification {
  id: string;
  type: 'mention' | 'like' | 'comment' | 'space_invite' | 'tool_update' | 'achievement' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  imageUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardAnalytics {
  overview: {
    totalSpaces: number;
    activeSpaces: number;
    spacesCreated: number;
    toolsBuilt: number;
    toolsUsed: number;
    socialInteractions: number;
    studyHours: number;
    achievements: number;
    currentStreak: number;
  };
  engagement: {
    dailyActiveTime: number;
    weeklyGoalProgress: number;
    spaceParticipation: number;
    toolAdoption: number;
    socialScore: number;
    academicScore: number;
    productivityScore: number;
  };
  trends: {
    userGrowth: number;
    spaceEngagement: number;
    toolUsage: number;
    platformHealth: number;
  };
}

export interface DashboardInsights {
  peakActivityTime: string;
  mostActiveSpace: DashboardSpace | null;
  favoriteTools: DashboardTool[];
  achievementStreak: number;
  weeklyGoal: {
    target: number;
    current: number;
    percentage: number;
  };
  recommendations: {
    spaces: Array<{
      space: DashboardSpace;
      matchScore: number;
      matchReasons: string[];
    }>;
    tools: DashboardTool[];
    connections: Array<{
      userId: string;
      userName: string;
      sharedInterests: string[];
      mutualSpaces: number;
    }>;
  };
}

export interface ComprehensiveDashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    handle: string;
    major?: string;
    academicYear?: string;
    profilePhotoUrl?: string;
    joinedAt: string;
    lastActive: string;
  };
  spaces: {
    active: DashboardSpace[];
    favorites: DashboardSpace[];
    recent: DashboardSpace[];
    created: DashboardSpace[];
  };
  tools: {
    owned: DashboardTool[];
    favorites: DashboardTool[];
    recent: DashboardTool[];
    recommended: DashboardTool[];
  };
  activity: {
    recent: DashboardActivity[];
    byType: Record<DashboardActivity['type'], DashboardActivity[]>;
  };
  notifications: DashboardNotification[];
  analytics: DashboardAnalytics;
  insights: DashboardInsights;
  calendar: {
    upcomingEvents: Array<{
      id: string;
      title: string;
      startTime: string;
      endTime: string;
      type: 'personal' | 'space' | 'academic';
      spaceId?: string;
      spaceName?: string;
    }>;
    conflictingEvents: Array<{
      id: string;
      conflicts: string[];
    }>;
  };
}

export interface DashboardState {
  data: ComprehensiveDashboardData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLiveMode: boolean;
}

/**
 * Comprehensive dashboard data hook that integrates all HIVE platform systems
 * Provides real-time updates, cross-system data relationships, and analytics
 * 
 * Features:
 * - Real-time data synchronization
 * - Cross-system relationship mapping
 * - Personalized recommendations
 * - Performance analytics
 * - Activity aggregation
 * - Smart notifications
 */
export function useDashboardData(): DashboardState & {
  refreshData: () => Promise<void>;
  toggleLiveMode: () => void;
  markNotificationRead: (_notificationId: string) => void;
  updateSpaceFavorite: (_spaceId: string, _isFavorite: boolean) => void;
  updateToolFavorite: (_toolId: string, _isFavorite: boolean) => void;
} {
  const { user, isAuthenticated } = useSession();
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
    isLiveMode: true,
  });

  // Generate comprehensive mock data based on user
  const generateMockData = useCallback((userData: any): ComprehensiveDashboardData => {
    const now = new Date();
    const userId = userData?.id || 'user-1';
    const userName = userData?.fullName || 'Student User';
    const userHandle = userData?.handle || 'student_user';

    // Mock spaces data
    const mockSpaces: DashboardSpace[] = [
      {
        id: 'space-1',
        name: 'CS Study Group',
        description: 'Computer Science majors studying together',
        memberCount: 234,
        unreadCount: 5,
        lastActivity: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        isFavorite: true,
        isPinned: true,
        category: 'academic',
        privacyLevel: 'public'
      },
      {
        id: 'space-2',
        name: 'Machine Learning Club',
        description: 'Exploring AI and ML together',
        memberCount: 156,
        unreadCount: 2,
        lastActivity: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        isFavorite: false,
        isPinned: false,
        category: 'academic',
        privacyLevel: 'public'
      },
      {
        id: 'space-3',
        name: 'Startup Founders',
        description: 'Entrepreneurial minds building the future',
        memberCount: 89,
        unreadCount: 0,
        lastActivity: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        isActive: false,
        isFavorite: true,
        isPinned: false,
        category: 'professional',
        privacyLevel: 'invite-only'
      }
    ];

    // Mock tools data
    const mockTools: DashboardTool[] = [
      {
        id: 'tool-1',
        name: 'GPA Calculator Pro',
        description: 'Advanced GPA tracking and prediction',
        category: 'academic',
        author: userName,
        authorId: userId,
        usageCount: 1205,
        rating: 4.8,
        lastUsed: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        isOwned: true,
        isFavorite: true,
        version: '2.1.0',
        spaceId: 'space-1'
      },
      {
        id: 'tool-2',
        name: 'Study Session Timer',
        description: 'Pomodoro technique with analytics',
        category: 'productivity',
        author: 'Sarah Chen',
        authorId: 'user-sarah',
        usageCount: 892,
        rating: 4.6,
        lastUsed: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        isOwned: false,
        isFavorite: true,
        version: '1.5.2'
      },
      {
        id: 'tool-3',
        name: 'Course Schedule Optimizer',
        description: 'Find the perfect class schedule',
        category: 'academic',
        author: 'Alex Rodriguez',
        authorId: 'user-alex',
        usageCount: 567,
        rating: 4.4,
        isOwned: false,
        isFavorite: false,
        version: '1.2.1'
      }
    ];

    // Mock activity data
    const mockActivities: DashboardActivity[] = [
      {
        id: 'activity-1',
        type: 'tool_create',
        title: 'Created GPA Calculator Pro',
        description: 'Built a new academic tool',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        userId,
        userName,
        toolId: 'tool-1',
        toolName: 'GPA Calculator Pro'
      },
      {
        id: 'activity-2',
        type: 'space_join',
        title: 'Joined Machine Learning Club',
        description: 'Became a member of the space',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        userId,
        userName,
        spaceId: 'space-2',
        spaceName: 'Machine Learning Club'
      },
      {
        id: 'activity-3',
        type: 'social_interaction',
        title: 'Liked a post in CS Study Group',
        description: 'Engaged with community content',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        userId,
        userName,
        spaceId: 'space-1',
        spaceName: 'CS Study Group'
      }
    ];

    // Mock notifications
    const mockNotifications: DashboardNotification[] = [
      {
        id: 'notif-1',
        type: 'mention',
        title: 'You were mentioned',
        message: 'Sarah mentioned you in CS Study Group',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        isRead: false,
        actionUrl: '/spaces/space-1',
        priority: 'high'
      },
      {
        id: 'notif-2',
        type: 'like',
        title: 'Tool liked',
        message: '5 people liked your GPA Calculator Pro',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        priority: 'medium'
      },
      {
        id: 'notif-3',
        type: 'achievement',
        title: 'Achievement unlocked!',
        message: 'You\'ve reached a 10-day streak!',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        priority: 'medium'
      }
    ];

    return {
      user: {
        id: userId,
        name: userName,
        email: userData?.email || 'student@university.edu',
        handle: userHandle,
        major: userData?.major || 'Computer Science',
        academicYear: 'Junior',
        profilePhotoUrl: userData?.avatarUrl,
        joinedAt: '2024-09-01T00:00:00Z',
        lastActive: now.toISOString()
      },
      spaces: {
        active: mockSpaces.filter(s => s.isActive),
        favorites: mockSpaces.filter(s => s.isFavorite),
        recent: mockSpaces.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()).slice(0, 5),
        created: mockSpaces.filter(s => s.category === 'academic') // Mock: assume user created academic spaces
      },
      tools: {
        owned: mockTools.filter(t => t.isOwned),
        favorites: mockTools.filter(t => t.isFavorite),
        recent: mockTools.filter(t => t.lastUsed).sort((a, b) => new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime()),
        recommended: mockTools.filter(t => !t.isOwned && t.rating > 4.5)
      },
      activity: {
        recent: mockActivities,
        byType: mockActivities.reduce((acc, activity) => {
          if (!acc[activity.type]) acc[activity.type] = [];
          acc[activity.type].push(activity);
          return acc;
        }, {} as Record<DashboardActivity['type'], DashboardActivity[]>)
      },
      notifications: mockNotifications,
      analytics: {
        overview: {
          totalSpaces: 12,
          activeSpaces: 5,
          spacesCreated: 2,
          toolsBuilt: 8,
          toolsUsed: 24,
          socialInteractions: 156,
          studyHours: 142,
          achievements: 7,
          currentStreak: 12
        },
        engagement: {
          dailyActiveTime: 4.2,
          weeklyGoalProgress: 85.5,
          spaceParticipation: 73.8,
          toolAdoption: 91.2,
          socialScore: 78.5,
          academicScore: 92.1,
          productivityScore: 88.7
        },
        trends: {
          userGrowth: 12.5,
          spaceEngagement: 8.7,
          toolUsage: 15.3,
          platformHealth: 94.2
        }
      },
      insights: {
        peakActivityTime: '2:00 PM - 4:00 PM',
        mostActiveSpace: mockSpaces[0],
        favoriteTools: mockTools.filter(t => t.isFavorite),
        achievementStreak: 12,
        weeklyGoal: {
          target: 20,
          current: 17.1,
          percentage: 85.5
        },
        recommendations: {
          spaces: [
            {
              space: {
                id: 'rec-space-1',
                name: 'Data Science Collective',
                description: 'Advanced data science and analytics',
                memberCount: 89,
                unreadCount: 0,
                lastActivity: now.toISOString(),
                isActive: true,
                isFavorite: false,
                isPinned: false,
                category: 'academic',
                privacyLevel: 'public'
              },
              matchScore: 92,
              matchReasons: ['Similar interests in ML', 'Compatible schedule', 'Shared connections']
            }
          ],
          tools: mockTools.filter(t => !t.isOwned && t.category === userData?.major?.toLowerCase()),
          connections: [
            {
              userId: 'user-sarah',
              userName: 'Sarah Chen',
              sharedInterests: ['Machine Learning', 'Data Science'],
              mutualSpaces: 2
            }
          ]
        }
      },
      calendar: {
        upcomingEvents: [
          {
            id: 'event-1',
            title: 'CS Study Session',
            startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
            type: 'space',
            spaceId: 'space-1',
            spaceName: 'CS Study Group'
          },
          {
            id: 'event-2',
            title: 'Machine Learning Lecture',
            startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(now.getTime() + 25.5 * 60 * 60 * 1000).toISOString(),
            type: 'academic'
          }
        ],
        conflictingEvents: []
      }
    };
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async (): Promise<ComprehensiveDashboardData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would make real API calls to:
    // - /api/dashboard/overview
    // - /api/spaces/user-spaces
    // - /api/tools/user-tools
    // - /api/activity/recent
    // - /api/notifications/unread
    // - /api/analytics/user-metrics
    
    return generateMockData(user);
  }, [user, generateMockData]);

  // Refresh data
  const refreshData = useCallback(async () => {
    if (!isAuthenticated || !user) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await fetchDashboardData();
      setState(prev => ({
        ...prev,
        data,
        isLoading: false,
        lastUpdated: new Date(),
        error: null
      }));
    } catch (error) {
      logger.error('Error fetching dashboard data:', { error: String(error) });
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load dashboard data'
      }));
    }
  }, [isAuthenticated, user, fetchDashboardData]);

  // Toggle live mode
  const toggleLiveMode = useCallback(() => {
    setState(prev => ({ ...prev, isLiveMode: !prev.isLiveMode }));
  }, []);

  // Mark notification as read
  const markNotificationRead = useCallback((_notificationId: string) => {
    setState(prev => {
      if (!prev.data) return prev;
      
      return {
        ...prev,
        data: {
          ...prev.data,
          notifications: prev.data.notifications.map(n =>
            n.id === _notificationId ? { ...n, isRead: true } : n
          )
        }
      };
    });
  }, []);

  // Update space favorite status
  const updateSpaceFavorite = useCallback((_spaceId: string, _isFavorite: boolean) => {
    setState(prev => {
      if (!prev.data) return prev;
      
      const updateSpaceInArray = (spaces: DashboardSpace[]) =>
        spaces.map(s => s.id === _spaceId ? { ...s, isFavorite: _isFavorite } : s);
      
      return {
        ...prev,
        data: {
          ...prev.data,
          spaces: {
            ...prev.data.spaces,
            active: updateSpaceInArray(prev.data.spaces.active),
            favorites: prev.data.spaces.favorites.filter(s => s.id !== _spaceId || _isFavorite),
            recent: updateSpaceInArray(prev.data.spaces.recent),
            created: updateSpaceInArray(prev.data.spaces.created)
          }
        }
      };
    });
  }, []);

  // Update tool favorite status
  const updateToolFavorite = useCallback((_toolId: string, _isFavorite: boolean) => {
    setState(prev => {
      if (!prev.data) return prev;
      
      const updateToolInArray = (tools: DashboardTool[]) =>
        tools.map(t => t.id === _toolId ? { ...t, isFavorite: _isFavorite } : t);
      
      return {
        ...prev,
        data: {
          ...prev.data,
          tools: {
            ...prev.data.tools,
            owned: updateToolInArray(prev.data.tools.owned),
            favorites: prev.data.tools.favorites.filter(t => t.id !== _toolId || _isFavorite),
            recent: updateToolInArray(prev.data.tools.recent),
            recommended: updateToolInArray(prev.data.tools.recommended)
          }
        }
      };
    });
  }, []);

  // Initial data load
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshData();
    } else {
      setState({
        data: null,
        isLoading: false,
        error: null,
        lastUpdated: null,
        isLiveMode: true
      });
    }
  }, [isAuthenticated, user, refreshData]);

  // Live updates
  useEffect(() => {
    if (!state.isLiveMode || !isAuthenticated || !user) return;

    const interval = setInterval(() => {
      // Simulate real-time updates (in production, use WebSocket)
      setState(prev => {
        if (!prev.data) return prev;

        // Update real-time metrics
        const updatedData = { ...prev.data };
        updatedData.analytics.overview.socialInteractions += Math.floor(Math.random() * 3);
        updatedData.user.lastActive = new Date().toISOString();

        return {
          ...prev,
          data: updatedData,
          lastUpdated: new Date()
        };
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [state.isLiveMode, isAuthenticated, user]);

  return {
    ...state,
    refreshData,
    toggleLiveMode,
    markNotificationRead,
    updateSpaceFavorite,
    updateToolFavorite
  };
}