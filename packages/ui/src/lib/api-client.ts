/**
 * HIVE API Client
 * Centralized API client for connecting frontend to backend services
 */

import type { Tool, CreateTool } from '@hive/core';
import { uiLogger } from './logger';


// API Response Types
interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  data?: T;
  message?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Tool API Types
interface ToolResponse {
  tools: Tool[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

interface CreateToolResponse {
  success: boolean;
  tool: Tool;
  message: string;
}

interface UpdateToolResponse {
  success: boolean;
  tool: Tool;
  message: string;
}

// Deployment API Types
interface ToolDeploymentConfig {
  toolId: string;
  deployTo: 'profile' | 'space';
  targetId: string;
  surface?: 'pinned' | 'posts' | 'events' | 'tools' | 'chat' | 'members';
  config?: Record<string, unknown>;
  permissions?: {
    canInteract?: boolean;
    canView?: boolean;
    canEdit?: boolean;
    allowedRoles?: string[];
  };
  settings?: {
    showInDirectory?: boolean;
    allowSharing?: boolean;
    collectAnalytics?: boolean;
    notifyOnInteraction?: boolean;
  };
}

interface ToolDeployment {
  id: string;
  toolId: string;
  deployedBy: string;
  deployedTo: 'profile' | 'space';
  targetId: string;
  surface?: string;
  position?: number;
  config?: Record<string, unknown>;
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles?: string[];
  };
  status: 'active' | 'paused' | 'disabled';
  deployedAt: string;
  lastUsed?: string;
  usageCount: number;
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
  metadata?: Record<string, unknown>;
  toolData?: {
    id: string;
    name: string;
    description: string;
    currentVersion: string;
    elements: unknown[];
  };
}

interface DeployedToolsResponse {
  deployments: ToolDeployment[];
  count: number;
}

// Real-time API Types
interface ToolUpdateEvent {
  id: string;
  toolId: string;
  toolName: string;
  deploymentId?: string;
  spaceId?: string;
  userId: string;
  updateType: 'state_change' | 'value_update' | 'configuration_change' | 'deployment_update' | 'execution_result' | 'error' | 'status_change';
  eventData: {
    previousState?: any;
    newState?: any;
    changedFields: string[];
    executionResult?: any;
    errorMessage?: string;
    metadata: Record<string, unknown>;
  };
  affectedUsers: string[];
  timestamp: string;
  sequenceNumber: number;
  broadcastChannels: string[];
  requiresAck: boolean;
  expiresAt?: string;
}

interface ToolUpdatesResponse {
  success: boolean;
  updates: ToolUpdateEvent[];
  stateSnapshot?: any;
  syncStatus: {
    status: string;
    lastSync: string | null;
    version: number;
    pendingUpdates: number;
    activeConnections?: number;
  };
  hasMore: boolean;
  lastSequenceNumber: number;
}

// Space API Types
interface Space {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'public' | 'private' | 'restricted';
  category: string;
  userRole: 'admin' | 'moderator' | 'member';
}

interface SpacesResponse {
  spaces: Space[];
}

// Analytics Types
interface ToolUsageData {
  toolId: string;
  spaceId: string;
  sessions: Array<{
    id: string;
    userId: string;
    userName: string;
    startTime: string;
    endTime?: string;
    duration?: number;
    completedSuccessfully: boolean;
    dataSubmitted?: any;
    errors?: string[];
  }>;
  analytics: {
    totalSessions: number;
    uniqueUsers: number;
    averageSessionTime: number;
    completionRate: number;
    errorRate: number;
    popularityScore: number;
    dailyUsage: Array<{
      date: string;
      sessions: number;
      users: number;
    }>;
    hourlyUsage: Array<{
      hour: number;
      sessions: number;
    }>;
    userGrowth: Array<{
      period: string;
      newUsers: number;
      returningUsers: number;
    }>;
  };
  feedback: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment?: string;
    timestamp: string;
  }>;
  performance: {
    loadTime: number;
    renderTime: number;
    errorFrequency: number;
    crashes: number;
  };
}

// Base API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      uiLogger.error('API request failed: ${endpoint}', error);
      throw error;
    }
  }

  // Tool API Methods
  async getTools(params: {
    spaceId?: string;
    status?: 'draft' | 'preview' | 'published';
    limit?: number;
    offset?: number;
  } = {}): Promise<ToolResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.spaceId) searchParams.set('spaceId', params.spaceId);
    if (params.status) searchParams.set('status', params.status);
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.offset) searchParams.set('offset', params.offset.toString());

    return this.request<ToolResponse>(`/tools?${searchParams.toString()}`);
  }

  async createTool(toolData: CreateTool & {
    templateId?: string;
    type?: 'template' | 'visual' | 'code' | 'wizard';
    config?: any;
  }): Promise<CreateToolResponse> {
    return this.request<CreateToolResponse>('/tools', {
      method: 'POST',
      body: JSON.stringify(toolData),
    });
  }

  async updateTool(toolId: string, updateData: Partial<Tool>): Promise<UpdateToolResponse> {
    return this.request<UpdateToolResponse>('/tools', {
      method: 'PUT',
      body: JSON.stringify({ toolId, ...updateData }),
    });
  }

  async getTool(toolId: string): Promise<{ tool: Tool }> {
    return this.request<{ tool: Tool }>(`/tools/${toolId}`);
  }

  // Tool Deployment API Methods
  async deployTool(deploymentConfig: ToolDeploymentConfig): Promise<{ deployment: ToolDeployment; message: string }> {
    return this.request<{ deployment: ToolDeployment; message: string }>('/tools/deploy', {
      method: 'POST',
      body: JSON.stringify(deploymentConfig),
    });
  }

  async getDeployedTools(params: {
    deployedTo?: 'profile' | 'space';
    targetId?: string;
    surface?: string;
    status?: string;
  } = {}): Promise<DeployedToolsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.deployedTo) searchParams.set('deployedTo', params.deployedTo);
    if (params.targetId) searchParams.set('targetId', params.targetId);
    if (params.surface) searchParams.set('surface', params.surface);
    if (params.status) searchParams.set('status', params.status);

    return this.request<DeployedToolsResponse>(`/tools/deploy?${searchParams.toString()}`);
  }

  async getSpaceTools(spaceId: string): Promise<DeployedToolsResponse> {
    return this.getDeployedTools({
      deployedTo: 'space',
      targetId: spaceId,
    });
  }

  // Real-time Tool Updates API Methods
  async getToolUpdates(params: {
    toolId: string;
    deploymentId?: string;
    spaceId?: string;
    since?: string;
    limit?: number;
    includeSnapshot?: boolean;
  }): Promise<ToolUpdatesResponse> {
    const searchParams = new URLSearchParams();
    
    searchParams.set('toolId', params.toolId);
    if (params.deploymentId) searchParams.set('deploymentId', params.deploymentId);
    if (params.spaceId) searchParams.set('spaceId', params.spaceId);
    if (params.since) searchParams.set('since', params.since);
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.includeSnapshot) searchParams.set('includeSnapshot', 'true');

    return this.request<ToolUpdatesResponse>(`/realtime/tool-updates?${searchParams.toString()}`);
  }

  async sendToolUpdate(updateData: {
    toolId: string;
    deploymentId?: string;
    spaceId?: string;
    updateType: string;
    eventData: any;
    targetUsers?: string[];
    broadcastToSpace?: boolean;
    requiresAck?: boolean;
    expiresInMinutes?: number;
  }): Promise<{ success: boolean; updateEvent: any }> {
    return this.request<{ success: boolean; updateEvent: any }>('/realtime/tool-updates', {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  }

  async syncToolState(syncData: {
    toolId: string;
    deploymentId?: string;
    clientVersion: number;
    clientState: any;
    conflictResolution?: 'manual' | 'automatic' | 'latest_wins';
    forceMerge?: boolean;
  }): Promise<{
    success: boolean;
    syncResult: string;
    serverState: any;
    serverVersion: number;
    conflicts: unknown[];
    resolutionStrategy?: string;
  }> {
    return this.request<{
      success: boolean;
      syncResult: string;
      serverState: any;
      serverVersion: number;
      conflicts: unknown[];
      resolutionStrategy?: string;
    }>('/realtime/tool-updates', {
      method: 'PUT',
      body: JSON.stringify(syncData),
    });
  }

  // Spaces API Methods  
  async getSpaces(): Promise<SpacesResponse> {
    return this.request<SpacesResponse>('/spaces/my');
  }

  // Analytics API Methods
  async getToolAnalytics(toolId: string, params: {
    spaceId?: string;
    dateRange?: '7d' | '30d' | '90d' | '1y';
  } = {}): Promise<ToolUsageData> {
    const searchParams = new URLSearchParams();
    
    if (params.spaceId) searchParams.set('spaceId', params.spaceId);
    if (params.dateRange) searchParams.set('dateRange', params.dateRange);

    return this.request<ToolUsageData>(`/tools/${toolId}/analytics?${searchParams.toString()}`);
  }

  // Community Data Collection (for future community APIs)
  async collectCommunityData(data: {
    toolId: string;
    spaceId?: string;
    userId: string;
    dataType: 'usage' | 'rating' | 'feedback' | 'share' | 'like';
    value?: any;
    metadata?: Record<string, unknown>;
  }): Promise<{ success: boolean }> {
    // Store community data for future API implementation
    const communityData = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
    };

    // For now, we'll collect this data in the analytics system
    try {
      await this.request<{ success: boolean }>('/analytics/metrics', {
        method: 'POST',
        body: JSON.stringify({
          eventType: 'community_interaction',
          toolId: data.toolId,
          spaceId: data.spaceId,
          userId: data.userId,
          timestamp: new Date(),
          metadata: {
            dataType: data.dataType,
            value: data.value,
            ...data.metadata,
          },
        }),
      });

      return { success: true };
    } catch (error) {
      console.warn('Failed to collect community data:', error);
      return { success: false };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type {
  ApiResponse,
  PaginatedResponse,
  ToolResponse,
  CreateToolResponse,
  UpdateToolResponse,
  ToolDeploymentConfig,
  ToolDeployment,
  DeployedToolsResponse,
  ToolUpdateEvent,
  ToolUpdatesResponse,
  Space,
  SpacesResponse,
  ToolUsageData,
};

// Utility functions for API integration
export const apiUtils = {
  // Convert API tool deployment to component props
  convertDeploymentToSpaceTool: (deployment: ToolDeployment) => ({
    id: deployment.id,
    name: deployment.toolData?.name || 'Unknown Tool',
    description: deployment.toolData?.description || '',
    icon: '🛠️', // Default icon, could be from tool metadata
    category: 'productivity' as const, // Could be derived from tool config
    type: 'custom' as const,
    isActive: deployment.status === 'active',
    permissions: {
      view: deployment.permissions.allowedRoles || ['member', 'moderator', 'admin'],
      use: deployment.permissions.allowedRoles || ['member', 'moderator', 'admin'],
      manage: ['admin', 'moderator'],
    },
    usage: {
      totalSessions: deployment.usageCount,
      activeUsers: 0, // Would need separate API call
      lastUsed: deployment.lastUsed || deployment.deployedAt,
      averageSessionTime: 0, // Would need analytics data
    },
    settings: {
      autoLaunch: false,
      requirePermission: !deployment.permissions.canInteract,
      maxConcurrentUsers: undefined,
      customConfig: deployment.config,
    },
    integrations: [],
    createdBy: deployment.deployedBy,
    createdAt: deployment.deployedAt,
    updatedAt: deployment.deployedAt,
  }),

  // Convert API spaces to component props
  convertApiSpacesToProps: (spaces: unknown[]): Space[] => {
    return spaces.map((space: any) => ({
      id: space.id,
      name: space.name || 'Unnamed Space',
      description: space.description || '',
      memberCount: space.memberCount || 0,
      type: space.type || 'public',
      category: space.category || 'general',
      userRole: space.userRole || 'member',
    }));
  },

  // Handle API errors gracefully
  handleApiError: (error: unknown) => {
    uiLogger.error('API Error:', error);
    
    if ((error instanceof Error ? error.message : "Unknown error")?.includes('Unauthorized')) {
      return 'You need to be logged in to perform this action.';
    }
    
    if ((error instanceof Error ? error.message : "Unknown error")?.includes('Forbidden')) {
      return 'You don\'t have permission to perform this action.';
    }
    
    if ((error instanceof Error ? error.message : "Unknown error")?.includes('Not Found')) {
      return 'The requested resource could not be found.';
    }
    
    return (error instanceof Error ? error.message : "Unknown error") || 'An unexpected error occurred. Please try again.';
  },

  // Generate mock community data for development
  generateMockCommunityTools: (count: number = 10) => {
    const categories = ['productivity', 'collaboration', 'communication', 'organization', 'engagement', 'academic'];
    const authors = [
      { id: '1', name: 'Alex Chen', handle: 'alexc', isVerified: true },
      { id: '2', name: 'Sarah Johnson', handle: 'sarahj', isVerified: false },
      { id: '3', name: 'Marcus Williams', handle: 'marcusw', isVerified: true },
      { id: '4', name: 'Emily Rodriguez', handle: 'emilyr', isVerified: false },
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `community-tool-${i + 1}`,
      tool: {
        id: `tool-${i + 1}`,
        name: `Community Tool ${i + 1}`,
        description: `A useful tool created by the community for ${categories[i % categories.length]} purposes.`,
        elements: [],
        config: {},
        metadata: {},
        status: 'published' as const,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
      author: authors[i % authors.length],
      stats: {
        downloads: Math.floor(Math.random() * 1000) + 50,
        rating: Math.random() * 2 + 3, // 3-5 stars
        ratingCount: Math.floor(Math.random() * 100) + 10,
        installs: Math.floor(Math.random() * 500) + 25,
        likes: Math.floor(Math.random() * 200) + 10,
      },
      metadata: {
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['popular', 'useful', categories[i % categories.length]],
        category: categories[i % categories.length] as unknown,
        compatibility: ['web', 'mobile'],
        featured: i < 3,
        verified: authors[i % authors.length].isVerified,
      },
      preview: {
        images: [],
        demoUrl: `/tools/tool-${i + 1}/demo`,
      },
    }));
  },
};