/**
 * HIVE API Client
 * Centralized API client for connecting frontend to backend services
 */
import { Tool, CreateTool } from '@hive/core';
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
interface ToolDeploymentConfig {
    toolId: string;
    deployTo: 'profile' | 'space';
    targetId: string;
    surface?: 'pinned' | 'posts' | 'events' | 'tools' | 'chat' | 'members';
    config?: Record<string, any>;
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
    config?: Record<string, any>;
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
    metadata?: Record<string, any>;
    toolData?: {
        id: string;
        name: string;
        description: string;
        currentVersion: string;
        elements: any[];
    };
}
interface DeployedToolsResponse {
    deployments: ToolDeployment[];
    count: number;
}
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
        metadata: Record<string, any>;
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
declare class ApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    private request;
    getTools(params?: {
        spaceId?: string;
        status?: 'draft' | 'preview' | 'published';
        limit?: number;
        offset?: number;
    }): Promise<ToolResponse>;
    createTool(toolData: CreateTool & {
        templateId?: string;
        type?: 'template' | 'visual' | 'code' | 'wizard';
        config?: any;
    }): Promise<CreateToolResponse>;
    updateTool(toolId: string, updateData: Partial<Tool>): Promise<UpdateToolResponse>;
    getTool(toolId: string): Promise<{
        tool: Tool;
    }>;
    deployTool(deploymentConfig: ToolDeploymentConfig): Promise<{
        deployment: ToolDeployment;
        message: string;
    }>;
    getDeployedTools(params?: {
        deployedTo?: 'profile' | 'space';
        targetId?: string;
        surface?: string;
        status?: string;
    }): Promise<DeployedToolsResponse>;
    getSpaceTools(spaceId: string): Promise<DeployedToolsResponse>;
    getToolUpdates(params: {
        toolId: string;
        deploymentId?: string;
        spaceId?: string;
        since?: string;
        limit?: number;
        includeSnapshot?: boolean;
    }): Promise<ToolUpdatesResponse>;
    sendToolUpdate(updateData: {
        toolId: string;
        deploymentId?: string;
        spaceId?: string;
        updateType: string;
        eventData: any;
        targetUsers?: string[];
        broadcastToSpace?: boolean;
        requiresAck?: boolean;
        expiresInMinutes?: number;
    }): Promise<{
        success: boolean;
        updateEvent: any;
    }>;
    syncToolState(syncData: {
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
        conflicts: any[];
        resolutionStrategy?: string;
    }>;
    getSpaces(): Promise<SpacesResponse>;
    getToolAnalytics(toolId: string, params?: {
        spaceId?: string;
        dateRange?: '7d' | '30d' | '90d' | '1y';
    }): Promise<ToolUsageData>;
    collectCommunityData(data: {
        toolId: string;
        spaceId?: string;
        userId: string;
        dataType: 'usage' | 'rating' | 'feedback' | 'share' | 'like';
        value?: any;
        metadata?: Record<string, any>;
    }): Promise<{
        success: boolean;
    }>;
}
export declare const apiClient: ApiClient;
export type { ApiResponse, PaginatedResponse, ToolResponse, CreateToolResponse, UpdateToolResponse, ToolDeploymentConfig, ToolDeployment, DeployedToolsResponse, ToolUpdateEvent, ToolUpdatesResponse, Space, SpacesResponse, ToolUsageData, };
export declare const apiUtils: {
    convertDeploymentToSpaceTool: (deployment: ToolDeployment) => {
        id: string;
        name: string;
        description: string;
        icon: string;
        category: "productivity";
        type: "custom";
        isActive: boolean;
        permissions: {
            view: string[];
            use: string[];
            manage: string[];
        };
        usage: {
            totalSessions: number;
            activeUsers: number;
            lastUsed: string;
            averageSessionTime: number;
        };
        settings: {
            autoLaunch: boolean;
            requirePermission: boolean;
            maxConcurrentUsers: any;
            customConfig: Record<string, any>;
        };
        integrations: any[];
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    };
    convertApiSpacesToProps: (spaces: any[]) => Space[];
    handleApiError: (error: any) => any;
    generateMockCommunityTools: (count?: number) => {
        id: string;
        tool: {
            id: string;
            name: string;
            description: string;
            elements: any[];
            config: {};
            metadata: {};
            status: "published";
            createdAt: Date;
            updatedAt: Date;
        };
        author: {
            id: string;
            name: string;
            handle: string;
            isVerified: boolean;
        };
        stats: {
            downloads: number;
            rating: number;
            ratingCount: number;
            installs: number;
            likes: number;
        };
        metadata: {
            publishedAt: string;
            updatedAt: string;
            tags: string[];
            category: any;
            compatibility: string[];
            featured: boolean;
            verified: boolean;
        };
        preview: {
            images: any[];
            demoUrl: string;
        };
    }[];
};
//# sourceMappingURL=api-client.d.ts.map