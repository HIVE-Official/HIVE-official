// Simple console logger for profile API
const logger = {
  error: (msg: string, meta?: any) => console.error(`[ProfileAPI] ${msg}`, meta)
};

// Profile data interfaces
export interface ProfileData {
  id: string;
  fullName: string;
  handle: string;
  email: string;
  profilePhotoUrl?: string;
  avatarUrl?: string;
  major?: string;
  academicYear?: string;
  housing?: string;
  pronouns?: string;
  bio?: string;
  statusMessage?: string;
  isBuilder?: boolean;
  builderOptIn?: boolean;
  isPublic?: boolean;
  onboardingCompleted: boolean;
  joinedAt: string;
  lastActive: string;
  developmentMode?: boolean;
}

export interface ProfileUpdateData {
  fullName?: string;
  major?: string;
  academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  housing?: string;
  pronouns?: string;
  statusMessage?: string;
  avatarUrl?: string;
  profilePhoto?: string;
  isPublic?: boolean;
  builderOptIn?: boolean;
}

export interface ProfileDashboardData {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    profilePhotoUrl?: string;
    major?: string;
    academicYear?: string;
    interests: string[];
    joinedAt: string;
    lastActive: string;
  };
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
    description?: string;
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

export interface PrivacySettings {
  // Profile visibility
  isPublic: boolean;
  showEmail: boolean;
  showSchool: boolean;
  showMajor: boolean;
  showGraduationYear: boolean;
  
  // Activity visibility
  showActivity: boolean;
  showSpaces: boolean;
  showOnlineStatus: boolean;
  
  // Contact preferences
  allowDirectMessages: boolean;
  allowSpaceInvites: boolean;
  allowEventInvites: boolean;
  
  // Analytics and data
  allowAnalytics: boolean;
  allowPersonalization: boolean;
  
  // Ghost mode
  ghostMode: {
    enabled: boolean;
    level: 'minimal' | 'moderate' | 'maximum';
    hideActivity: boolean;
    hideOnlineStatus: boolean;
    hideMemberships: boolean;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  user?: T;
  dashboard?: T;
  privacy?: T;
  message?: string;
  error?: string;
  details?: any;
  developmentMode?: boolean;
}

class ProfileAPIClient {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: globalThis.RequestInit = {},
    requireAuth = true
  ): Promise<APIResponse<T>> {
    try {
      const headers: globalThis.HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (requireAuth) {
        const token = await this.getAuthToken();
        if (token) {
          (headers as any)['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      logger.error('Profile API request failed', {
        endpoint,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  private async getAuthToken(): Promise<string | null> {
    // For development mode
    if (process.env.NODE_ENV === 'development') {
      return 'dev_token_123';
    }

    // In production, get from session/auth provider
    try {
      const token = localStorage?.getItem('auth_token');
      return token;
    } catch {
      return null;
    }
  }

  // Get current user profile
  async getProfile(): Promise<ProfileData> {
    const response = await this.makeRequest<ProfileData>('/profile');
    if (!response.success || !response.user) {
      throw new Error(response.error || 'Failed to fetch profile');
    }
    return response.user;
  }

  // Update user profile
  async updateProfile(data: ProfileUpdateData): Promise<{ success: boolean; message: string }> {
    const response = await this.makeRequest('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to update profile');
    }
    
    return {
      success: response.success,
      message: response.message || 'Profile updated successfully'
    };
  }

  // Upload profile photo
  async uploadPhoto(file: File): Promise<{ avatarUrl: string; message: string }> {
    const formData = new FormData();
    formData.append('photo', file);

    const token = await this.getAuthToken();
    const headers: globalThis.HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/profile/upload-photo`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to upload photo');
    }

    return {
      avatarUrl: data.avatarUrl,
      message: data.message || 'Photo uploaded successfully'
    };
  }

  // Get profile dashboard data
  async getDashboard(timeRange: string = 'week', includeRecommendations: boolean = true): Promise<ProfileDashboardData> {
    const params = new URLSearchParams({
      timeRange,
      includeRecommendations: includeRecommendations.toString()
    });

    const response = await this.makeRequest<ProfileDashboardData>(`/profile/dashboard?${params}`);
    
    if (!response.success || !response.dashboard) {
      throw new Error(response.error || 'Failed to fetch dashboard data');
    }
    
    return response.dashboard;
  }

  // Get privacy settings
  async getPrivacySettings(): Promise<PrivacySettings> {
    const response = await this.makeRequest<PrivacySettings>('/profile/privacy');
    
    if (!response.success || !response.privacy) {
      throw new Error(response.error || 'Failed to fetch privacy settings');
    }
    
    return response.privacy;
  }

  // Update privacy settings
  async updatePrivacySettings(settings: Partial<PrivacySettings>): Promise<{ success: boolean; message: string }> {
    const response = await this.makeRequest('/profile/privacy', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to update privacy settings');
    }
    
    return {
      success: response.success,
      message: response.message || 'Privacy settings updated successfully'
    };
  }

  // Get profile stats
  async getStats(): Promise<any> {
    const response = await this.makeRequest('/profile/stats');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch profile stats');
    }
    
    return response.data;
  }

  // Get user's spaces
  async getMySpaces(): Promise<any[]> {
    const response = await this.makeRequest('/profile/my-spaces');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch user spaces');
    }
    
    return (response.data as any[]) || [];
  }

  // Get profile completion status
  async getCompletion(): Promise<any> {
    const response = await this.makeRequest('/profile/completion');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch profile completion');
    }
    
    return response.data;
  }
}

// Export singleton instance
export const profileAPI = new ProfileAPIClient();
export default profileAPI;