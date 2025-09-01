/**
 * Profile API Service Layer
 * Connects frontend to bulletproof Profile backend endpoints
 */

export interface ProfileData {
  id: string;
  fullName: string;
  handle: string;
  email: string;
  profilePhoto?: string;
  avatarUrl?: string;
  major?: string;
  academicYear?: string;
  bio?: string;
  interests: string[];
  campusId: string;
  isBuilder?: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  user: ProfileData;
  summary: {
    totalSpaces: number;
    activeSpaces: number;
    favoriteSpaces: number;
    totalTimeSpent: number;
    weeklyActivity: number;
    contentCreated: number;
    toolsUsed: number;
    socialInteractions: number;
  };
  recentActivity: {
    spaces: Array<{
      spaceId: string;
      spaceName: string;
      action: string;
      timestamp: string;
      duration?: number;
    }>;
    tools: Array<{
      toolId: string;
      toolName?: string;
      action: string;
      timestamp: string;
      spaceId?: string;
    }>;
    social: Array<{
      type: string;
      description: string;
      timestamp: string;
      spaceId?: string;
    }>;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space';
    spaceId?: string;
    spaceName?: string;
    isToday: boolean;
    isUpcoming: boolean;
  }>;
  quickActions: {
    favoriteSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    pinnedSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    recommendations: Array<{
      spaceId: string;
      spaceName: string;
      matchScore: number;
      matchReasons: string[];
    }>;
  };
  insights: {
    peakActivityTime: string;
    mostActiveSpace: {
      spaceId: string;
      spaceName: string;
      timeSpent: number;
    } | null;
    weeklyGoal: {
      target: number;
      current: number;
      percentage: number;
    };
    streaks: {
      currentStreak: number;
      longestStreak: number;
      type: 'daily_activity' | 'content_creation' | 'tool_usage';
    };
  };
  privacy: {
    ghostMode: {
      enabled: boolean;
      level: string;
    };
    visibility: {
      profileVisible: boolean;
      activityVisible: boolean;
      onlineStatus: boolean;
    };
  };
}

export interface SpaceMembership {
  spaceId: string;
  spaceName: string;
  spaceDescription?: string;
  spaceType: string;
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'builder';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActivity: string;
  activityLevel: 'high' | 'medium' | 'low';
  recentActivity: {
    posts: number;
    interactions: number;
    toolUsage: number;
    timeSpent: number;
  };
  notifications: {
    unreadCount: number;
    hasImportantUpdates: boolean;
  };
  quickStats: {
    myPosts: number;
    myTools: number;
    myInteractions: number;
  };
}

export interface ProfileAnalytics {
  overview: {
    profileViews: number;
    profileViewsThisWeek: number;
    profileViewsGrowth: number;
    searchAppearances: number;
    connectionRequests: number;
    connectionsAccepted: number;
    lastViewedAt: string;
  };
  engagement: {
    spaceInteractions: number;
    toolUsage: number;
    contentShared: number;
    messagesReceived: number;
    eventParticipation: number;
    weeklyEngagementScore: number;
  };
  visibility: {
    discoveryRate: number;
    profileCompleteness: number;
    publicVisibility: boolean;
    ghostModeActive: boolean;
    visibilityScore: number;
  };
  network: {
    totalConnections: number;
    mutualConnections: number;
    campusRanking: {
      percentile: number;
      rank: number;
      totalUsers: number;
    };
    connectionGrowth: Array<{
      date: string;
      count: number;
    }>;
  };
  activity: {
    peakActivityHours: Array<{
      hour: number;
      activityLevel: number;
    }>;
    engagementTrends: Array<{
      date: string;
      spaces: number;
      tools: number;
      social: number;
    }>;
    consistencyScore: number;
  };
  insights: {
    topPerformingContent: Array<{
      type: string;
      title: string;
      engagement: number;
      date: string;
    }>;
    recommendations: Array<{
      type: string;
      title: string;
      description: string;
      priority: string;
    }>;
    achievements: Array<{
      id: string;
      name: string;
      unlockedAt: string;
    }>;
  };
}

class ProfileService {
  private baseUrl = '/api/profile';

  /**
   * Get current user's profile
   */
  async getProfile(): Promise<ProfileData> {
    const response = await fetch(`${this.baseUrl}/me`);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data.user;
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboard(timeRange = 'week', includeRecommendations = true): Promise<DashboardData> {
    const params = new URLSearchParams({
      timeRange,
      includeRecommendations: includeRecommendations.toString()
    });

    const response = await fetch(`${this.baseUrl}/dashboard?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
    }
    const data = await response.json();
    return data.dashboard;
  }

  /**
   * Get user's space memberships
   */
  async getSpaces(includeActivity = true, includeStats = true, timeRange = 'week'): Promise<SpaceMembership[]> {
    const params = new URLSearchParams({
      includeActivity: includeActivity.toString(),
      includeStats: includeStats.toString(),
      timeRange
    });

    const response = await fetch(`${this.baseUrl}/spaces?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch spaces: ${response.statusText}`);
    }
    const data = await response.json();
    return data.memberships;
  }

  /**
   * Get user's personal spaces
   */
  async getMySpaces(includeInactive = false, limit = 50): Promise<any> {
    const params = new URLSearchParams({
      includeInactive: includeInactive.toString(),
      limit: limit.toString()
    });

    const response = await fetch(`${this.baseUrl}/my-spaces?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch my spaces: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get profile analytics
   */
  async getAnalytics(timeRange = 'month', includeInsights = true): Promise<ProfileAnalytics> {
    const params = new URLSearchParams({
      timeRange,
      includeInsights: includeInsights.toString()
    });

    const response = await fetch(`${this.baseUrl}/analytics?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }
    const data = await response.json();
    return data.analytics;
  }

  /**
   * Get profile statistics
   */
  async getStats(timeRange = 'month', includeComparisons = false): Promise<any> {
    const params = new URLSearchParams({
      timeRange,
      includeComparisons: includeComparisons.toString()
    });

    const response = await fetch(`${this.baseUrl}/stats?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get calendar events
   */
  async getCalendarEvents(startDate?: string, endDate?: string, type?: string): Promise<any> {
    const params = new URLSearchParams();
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (type) params.set('type', type);

    const response = await fetch(`${this.baseUrl}/calendar/events?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar events: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Create calendar event
   */
  async createCalendarEvent(eventData: {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
    location?: string;
    spaceId?: string;
    isRecurring?: boolean;
    recurringPattern?: string;
  }): Promise<any> {
    const response = await fetch(`${this.baseUrl}/calendar/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error(`Failed to create calendar event: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get user connections
   */
  async getConnections(limit = 20, includeDetails = true, sortBy = 'recent'): Promise<any> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      includeDetails: includeDetails.toString(),
      sortBy
    });

    const response = await fetch(`${this.baseUrl}/connections?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch connections: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update profile
   */
  async updateProfile(profileData: Partial<ProfileData>): Promise<ProfileData> {
    const response = await fetch(this.baseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data.user;
  }

  /**
   * Generate new avatar
   */
  async generateAvatar(): Promise<{ avatarUrl: string }> {
    const response = await fetch(`${this.baseUrl}/generate-avatar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to generate avatar: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Upload profile photo
   */
  async uploadPhoto(photoFile: File): Promise<{ photoUrl: string }> {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const response = await fetch(`${this.baseUrl}/upload-photo`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Failed to upload photo: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get privacy settings
   */
  async getPrivacySettings(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/privacy`);
    if (!response.ok) {
      throw new Error(`Failed to fetch privacy settings: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(settings: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/privacy`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (!response.ok) {
      throw new Error(`Failed to update privacy settings: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Check handle availability
   */
  async checkHandle(handle: string): Promise<{ available: boolean }> {
    const response = await fetch(`${this.baseUrl}/check-handle?handle=${encodeURIComponent(handle)}`);
    if (!response.ok) {
      throw new Error(`Failed to check handle: ${response.statusText}`);
    }
    return response.json();
  }
}

export const profileService = new ProfileService();