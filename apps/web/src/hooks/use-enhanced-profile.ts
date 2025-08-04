"use client";

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from './use-session';

// Enhanced profile interfaces
export interface EnhancedProfileUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  lastActive: string;
  
  // Academic Info
  major?: string;
  gradYear?: string;
  school?: string;
  academicYear?: string;
  housing?: string;
  pronouns?: string;
  
  // Status & Privacy
  isBuilder: boolean;
  builderLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  isVerified: boolean;
  ghostMode: boolean;
  onlineStatus: 'online' | 'offline' | 'away' | 'busy';
  
  // Stats
  stats: {
    spacesJoined: number;
    spacesLed: number;
    toolsCreated: number;
    toolsUsed: number;
    connectionsCount: number;
    totalActivity: number;
    weekStreak: number;
    reputation: number;
  };
  
  // Preferences
  preferences: {
    showActivity: boolean;
    showSpaces: boolean;
    showConnections: boolean;
    allowMessages: boolean;
    showOnlineStatus: boolean;
  };
}

export interface ProfileSpace {
  id: string;
  name: string;
  type: string;
  role: string;
  memberCount: number;
  lastActivity: string;
  isPrivate: boolean;
  color: string;
  icon?: string;
}

export interface ProfileTool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  lastUsed: string;
  usageCount: number;
  isCreated: boolean;
  isFavorite: boolean;
  rating?: number;
  tags: string[];
}

export interface ProfileActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface ProfileAnalytics {
  weeklyActivity: Array<{
    week: string;
    spacesActive: number;
    toolsUsed: number;
    timeSpent: number;
  }>;
  topSpaces: Array<{
    id: string;
    name: string;
    timeSpent: number;
    engagement: number;
  }>;
  topTools: Array<{
    id: string;
    name: string;
    usageCount: number;
    productivity: number;
  }>;
  socialMetrics: {
    connectionsGrowth: number;
    engagementRate: number;
    helpfulnessScore: number;
  };
}

// Profile API functions
async function fetchEnhancedProfile(): Promise<EnhancedProfileUser> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  const response = await fetch('/api/profile', {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`);
  }

  const data = await response.json();
  
  // Transform the API response to match our enhanced interface
  return {
    id: data.user.id,
    name: data.user.fullName || data.user.name,
    handle: data.user.handle || data.user.fullName?.toLowerCase().replace(/\s+/g, '') || 'user',
    email: data.user.email,
    avatar: data.user.avatarUrl || data.user.profilePhoto,
    bio: data.user.statusMessage,
    location: data.user.housing,
    joinedAt: data.user.createdAt || new Date().toISOString(),
    lastActive: data.user.lastActive || new Date().toISOString(),
    
    // Academic Info
    major: data.user.major,
    gradYear: data.user.academicYear,
    school: data.user.school || 'University',
    academicYear: data.user.academicYear,
    housing: data.user.housing,
    pronouns: data.user.pronouns,
    
    // Status & Privacy
    isBuilder: data.user.builderOptIn || data.user.isBuilder || false,
    builderLevel: data.user.builderLevel || 'Beginner',
    isVerified: data.user.emailVerified || true,
    ghostMode: data.user.ghostMode || false,
    onlineStatus: 'online' as const,
    
    // Stats (computed from API data)
    stats: {
      spacesJoined: data.user.joinedSpaces || 0,
      spacesLed: 0, // Will be computed from spaces API
      toolsCreated: 0, // Will be computed from tools API  
      toolsUsed: 0, // Will be computed from tools API
      connectionsCount: data.user.connectionsCount || 0,
      totalActivity: data.user.totalActivity || 0,
      weekStreak: data.user.weekStreak || 0,
      reputation: data.user.reputation || 0,
    },
    
    // Preferences
    preferences: {
      showActivity: data.user.showActivity ?? true,
      showSpaces: data.user.showSpaces ?? true,
      showConnections: data.user.showConnections ?? true,
      allowMessages: data.user.allowMessages ?? true,
      showOnlineStatus: !data.user.ghostMode,
    },
  };
}

async function fetchProfileSpaces(): Promise<ProfileSpace[]> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  const response = await fetch('/api/profile/spaces?includeActivity=true&includeStats=true', {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch spaces: ${response.status}`);
  }

  const data = await response.json();
  
  return data.memberships?.map((space: any) => ({
    id: space.spaceId,
    name: space.spaceName,
    type: space.spaceType,
    role: space.role,
    memberCount: space.memberCount,
    lastActivity: space.lastActivity,
    isPrivate: space.spaceType === 'private',
    color: getSpaceColor(space.spaceType),
    icon: getSpaceIcon(space.spaceType)
  })) || [];
}

async function fetchProfileTools(): Promise<ProfileTool[]> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  const response = await fetch('/api/tools/personal', {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tools: ${response.status}`);
  }

  const data = await response.json();
  
  return data.tools?.map((tool: any) => ({
    id: tool.id,
    name: tool.name,
    description: tool.description || 'No description available',
    category: tool.category || 'general',
    icon: tool.icon || '🔧',
    lastUsed: tool.lastUsed || 'Never',
    usageCount: tool.usageCount || 0,
    isCreated: tool.isCreated || false,
    isFavorite: tool.isFavorite || false,
    rating: tool.rating || 0,
    tags: tool.tags || []
  })) || [];
}

async function fetchProfileActivity(): Promise<ProfileActivity[]> {
  const authHeader = process.env.NODE_ENV === 'development' 
    ? 'Bearer test-token' 
    : `Bearer ${getStoredToken()}`;

  const response = await fetch('/api/profile/activity?limit=20', {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch activity: ${response.status}`);
  }

  const data = await response.json();
  
  return data.activities?.map((activity: any) => ({
    id: activity.id,
    type: activity.type,
    title: activity.title,
    description: activity.description,
    timestamp: activity.timestamp
  })) || [];
}

async function fetchProfileAnalytics(): Promise<ProfileAnalytics> {
  // Mock analytics data for now - would be implemented with real analytics API
  return {
    weeklyActivity: [
      { week: '2024-01-01', spacesActive: 3, toolsUsed: 5, timeSpent: 120 },
      { week: '2024-01-08', spacesActive: 4, toolsUsed: 7, timeSpent: 150 },
      { week: '2024-01-15', spacesActive: 3, toolsUsed: 6, timeSpent: 135 },
      { week: '2024-01-22', spacesActive: 5, toolsUsed: 8, timeSpent: 180 },
    ],
    topSpaces: [
      { id: 'space-1', name: 'CS Majors', timeSpent: 45, engagement: 85 },
      { id: 'space-2', name: 'Study Groups', timeSpent: 30, engagement: 70 },
      { id: 'space-3', name: 'Campus Events', timeSpent: 25, engagement: 60 },
    ],
    topTools: [
      { id: 'tool-1', name: 'Grade Tracker', usageCount: 45, productivity: 90 },
      { id: 'tool-2', name: 'Study Timer', usageCount: 32, productivity: 85 },
      { id: 'tool-3', name: 'Task Manager', usageCount: 28, productivity: 80 },
    ],
    socialMetrics: {
      connectionsGrowth: 15,
      engagementRate: 78,
      helpfulnessScore: 92
    }
  };
}

// Helper functions
function getStoredToken(): string {
  if (typeof window === 'undefined') return 'test-token';
  
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      return session.token || 'test-token';
    }
  } catch (error) {
    console.warn('Failed to get stored token:', error);
  }
  
  return 'test-token';
}

function getSpaceColor(type: string): string {
  const colors: Record<string, string> = {
    academic: '#4285F4',
    community: '#FF6B6B', 
    housing: '#10B981',
    course: '#9333EA',
    club: '#F59E0B'
  };
  return colors[type] || '#6B7280';
}

function getSpaceIcon(type: string): string {
  const icons: Record<string, string> = {
    academic: '📚',
    community: '🎉',
    housing: '🏠',
    course: '💻',
    club: '⭐'
  };
  return icons[type] || '🔗';
}

// Main hook
export function useEnhancedProfile() {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Profile data query
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError
  } = useQuery<EnhancedProfileUser>({
    queryKey: ['enhanced-profile'],
    queryFn: fetchEnhancedProfile,
    staleTime: 60000,
    enabled: !!user && isClient
  });

  // Spaces data query  
  const {
    data: spaces,
    isLoading: spacesLoading,
    error: spacesError
  } = useQuery<ProfileSpace[]>({
    queryKey: ['profile-spaces'],
    queryFn: fetchProfileSpaces,
    staleTime: 60000,
    enabled: !!user && isClient
  });

  // Tools data query
  const {
    data: tools,
    isLoading: toolsLoading,
    error: toolsError
  } = useQuery<ProfileTool[]>({
    queryKey: ['profile-tools'],
    queryFn: fetchProfileTools,
    staleTime: 60000,
    enabled: !!user && isClient
  });

  // Activity data query
  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError
  } = useQuery<ProfileActivity[]>({
    queryKey: ['profile-activity'],
    queryFn: fetchProfileActivity,
    staleTime: 30000,
    enabled: !!user && isClient
  });

  // Analytics data query
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError
  } = useQuery<ProfileAnalytics>({
    queryKey: ['profile-analytics'],
    queryFn: fetchProfileAnalytics,
    staleTime: 300000, // 5 minutes
    enabled: !!user && isClient
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updateData: Partial<EnhancedProfileUser>) => {
      const authHeader = process.env.NODE_ENV === 'development' 
        ? 'Bearer test-token' 
        : `Bearer ${getStoredToken()}`;

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enhanced-profile'] });
      queryClient.invalidateQueries({ queryKey: ['campus-profile'] });
    }
  });

  // Toggle ghost mode mutation
  const toggleGhostModeMutation = useMutation({
    mutationFn: async ({ enabled, level }: { enabled: boolean; level?: string }) => {
      // Implementation would depend on privacy API
      console.log('Toggle ghost mode:', enabled, level);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enhanced-profile'] });
    }
  });

  // Compute enhanced stats from all data sources
  const enhancedStats = profile ? {
    ...profile.stats,
    spacesJoined: spaces?.length || profile.stats.spacesJoined,
    spacesLed: spaces?.filter(s => s.role === 'leader' || s.role === 'admin').length || 0,
    toolsCreated: tools?.filter(t => t.isCreated).length || 0,
    toolsUsed: tools?.length || 0,
  } : undefined;

  // Enhanced profile with computed stats
  const enhancedProfile = profile && enhancedStats ? {
    ...profile,
    stats: enhancedStats
  } : profile;

  const isLoading = profileLoading || spacesLoading || toolsLoading || activityLoading;
  const hasError = profileError || spacesError || toolsError || activityError;

  return {
    // Data
    profile: enhancedProfile,
    spaces: spaces || [],
    tools: tools || [],
    activity: activity || [],
    analytics,
    
    // Loading states
    isLoading,
    isLoadingProfile: profileLoading,
    isLoadingSpaces: spacesLoading,
    isLoadingTools: toolsLoading,
    isLoadingActivity: activityLoading,
    isLoadingAnalytics: analyticsLoading,
    
    // Error states
    hasError,
    profileError,
    spacesError,
    toolsError,
    activityError,
    analyticsError,
    
    // Actions
    updateProfile: updateProfileMutation.mutateAsync,
    toggleGhostMode: toggleGhostModeMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    
    // Utilities
    refreshAll: () => {
      queryClient.invalidateQueries({ queryKey: ['enhanced-profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile-spaces'] });
      queryClient.invalidateQueries({ queryKey: ['profile-tools'] });
      queryClient.invalidateQueries({ queryKey: ['profile-activity'] });
      queryClient.invalidateQueries({ queryKey: ['profile-analytics'] });
    }
  };
}

export default useEnhancedProfile;