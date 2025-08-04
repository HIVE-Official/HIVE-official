/**
 * HIVE API Client
 * Centralized API client for connecting frontend to backend services
 */
// Base API Client Class
class ApiClient {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
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
            return data;
        }
        catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }
    // Tool API Methods
    async getTools(params = {}) {
        const searchParams = new URLSearchParams();
        if (params.spaceId)
            searchParams.set('spaceId', params.spaceId);
        if (params.status)
            searchParams.set('status', params.status);
        if (params.limit)
            searchParams.set('limit', params.limit.toString());
        if (params.offset)
            searchParams.set('offset', params.offset.toString());
        return this.request(`/tools?${searchParams.toString()}`);
    }
    async createTool(toolData) {
        return this.request('/tools', {
            method: 'POST',
            body: JSON.stringify(toolData),
        });
    }
    async updateTool(toolId, updateData) {
        return this.request('/tools', {
            method: 'PUT',
            body: JSON.stringify({ toolId, ...updateData }),
        });
    }
    async getTool(toolId) {
        return this.request(`/tools/${toolId}`);
    }
    // Tool Deployment API Methods
    async deployTool(deploymentConfig) {
        return this.request('/tools/deploy', {
            method: 'POST',
            body: JSON.stringify(deploymentConfig),
        });
    }
    async getDeployedTools(params = {}) {
        const searchParams = new URLSearchParams();
        if (params.deployedTo)
            searchParams.set('deployedTo', params.deployedTo);
        if (params.targetId)
            searchParams.set('targetId', params.targetId);
        if (params.surface)
            searchParams.set('surface', params.surface);
        if (params.status)
            searchParams.set('status', params.status);
        return this.request(`/tools/deploy?${searchParams.toString()}`);
    }
    async getSpaceTools(spaceId) {
        return this.getDeployedTools({
            deployedTo: 'space',
            targetId: spaceId,
        });
    }
    // Real-time Tool Updates API Methods
    async getToolUpdates(params) {
        const searchParams = new URLSearchParams();
        searchParams.set('toolId', params.toolId);
        if (params.deploymentId)
            searchParams.set('deploymentId', params.deploymentId);
        if (params.spaceId)
            searchParams.set('spaceId', params.spaceId);
        if (params.since)
            searchParams.set('since', params.since);
        if (params.limit)
            searchParams.set('limit', params.limit.toString());
        if (params.includeSnapshot)
            searchParams.set('includeSnapshot', 'true');
        return this.request(`/realtime/tool-updates?${searchParams.toString()}`);
    }
    async sendToolUpdate(updateData) {
        return this.request('/realtime/tool-updates', {
            method: 'POST',
            body: JSON.stringify(updateData),
        });
    }
    async syncToolState(syncData) {
        return this.request('/realtime/tool-updates', {
            method: 'PUT',
            body: JSON.stringify(syncData),
        });
    }
    // Spaces API Methods  
    async getSpaces() {
        return this.request('/spaces/my');
    }
    // Analytics API Methods
    async getToolAnalytics(toolId, params = {}) {
        const searchParams = new URLSearchParams();
        if (params.spaceId)
            searchParams.set('spaceId', params.spaceId);
        if (params.dateRange)
            searchParams.set('dateRange', params.dateRange);
        return this.request(`/tools/${toolId}/analytics?${searchParams.toString()}`);
    }
    // Community Data Collection (for future community APIs)
    async collectCommunityData(data) {
        // Store community data for future API implementation
        const communityData = {
            ...data,
            timestamp: new Date().toISOString(),
            sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
        };
        // For now, we'll collect this data in the analytics system
        try {
            await this.request('/analytics/metrics', {
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
        }
        catch (error) {
            console.warn('Failed to collect community data:', error);
            return { success: false };
        }
    }
}
// Export singleton instance
export const apiClient = new ApiClient();
// Utility functions for API integration
export const apiUtils = {
    // Convert API tool deployment to component props
    convertDeploymentToSpaceTool: (deployment) => ({
        id: deployment.id,
        name: deployment.toolData?.name || 'Unknown Tool',
        description: deployment.toolData?.description || '',
        icon: '🛠️', // Default icon, could be from tool metadata
        category: 'productivity', // Could be derived from tool config
        type: 'custom',
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
    convertApiSpacesToProps: (spaces) => {
        return spaces.map(space => ({
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
    handleApiError: (error) => {
        console.error('API Error:', error);
        if (error.message?.includes('Unauthorized')) {
            return 'You need to be logged in to perform this action.';
        }
        if (error.message?.includes('Forbidden')) {
            return 'You don\'t have permission to perform this action.';
        }
        if (error.message?.includes('Not Found')) {
            return 'The requested resource could not be found.';
        }
        return error.message || 'An unexpected error occurred. Please try again.';
    },
    // Generate mock community data for development
    generateMockCommunityTools: (count = 10) => {
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
                status: 'published',
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
                category: categories[i % categories.length],
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
//# sourceMappingURL=api-client.js.map