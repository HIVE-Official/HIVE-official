import { z } from "zod";
// Tool Category Schema
export const ToolCategorySchema = z.enum([
    'productivity',
    'social',
    'academic',
    'creative',
    'utility',
    'game',
    'communication',
    'organization',
    'wellness',
    'custom'
]);
// Tool Type Schema
export const ToolTypeSchema = z.enum([
    'iframe_embed',
    'web_app',
    'widget',
    'form',
    'calculator',
    'poll',
    'quiz',
    'timer',
    'counter',
    'link_collection',
    'custom'
]);
// Tool Status Schema
export const ToolStatusSchema = z.enum([
    'draft',
    'testing',
    'published',
    'archived',
    'flagged'
]);
// Tool Visibility Schema
export const ToolVisibilitySchema = z.enum([
    'public',
    'space_only',
    'private',
    'members_only'
]);
// Tool Configuration Schema
export const ToolConfigSchema = z.object({
    // Display settings
    width: z.number().min(200).max(1200).default(400),
    height: z.number().min(100).max(800).default(300),
    allowFullscreen: z.boolean().default(false),
    // Behavior settings
    autoRefresh: z.boolean().default(false),
    refreshInterval: z.number().min(5).max(3600).optional(), // seconds
    // Integration settings
    requiresAuth: z.boolean().default(false),
    allowGuests: z.boolean().default(true),
    // Advanced settings
    customCSS: z.string().max(10000).optional(),
    customJS: z.string().max(10000).optional(),
    // Data collection
    collectUsage: z.boolean().default(true),
    collectFeedback: z.boolean().default(true)
});
// Tool Metadata Schema
export const ToolMetadataSchema = z.object({
    // Performance
    loadTime: z.number().min(0).optional(),
    errorRate: z.number().min(0).max(100).optional(),
    // Usage
    totalViews: z.number().min(0).default(0),
    uniqueUsers: z.number().min(0).default(0),
    avgSessionTime: z.number().min(0).default(0),
    // Engagement
    likes: z.number().min(0).default(0),
    shares: z.number().min(0).default(0),
    comments: z.number().min(0).default(0),
    // Quality
    rating: z.number().min(0).max(5).default(0),
    ratingCount: z.number().min(0).default(0),
    // Flags
    reportCount: z.number().min(0).default(0),
    lastReported: z.date().optional(),
    lastUpdated: z.date()
});
// Tool Permission Schema
export const ToolPermissionSchema = z.object({
    userId: z.string().min(1),
    role: z.enum(['owner', 'collaborator', 'viewer']),
    permissions: z.array(z.enum([
        'view',
        'edit',
        'delete',
        'share',
        'manage_permissions',
        'view_analytics'
    ])),
    grantedAt: z.date(),
    grantedBy: z.string().min(1)
});
// Main Tool Schema
export const ToolSchema = z.object({
    id: z.string().min(1),
    // Basic info
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    // Classification
    category: ToolCategorySchema,
    type: ToolTypeSchema,
    tags: z.array(z.string()).max(10).default([]),
    // Status
    status: ToolStatusSchema,
    visibility: ToolVisibilitySchema,
    // Content
    content: z.union([
        z.object({
            type: z.literal('iframe'),
            url: z.string().url(),
            allowedDomains: z.array(z.string()).optional()
        }),
        z.object({
            type: z.literal('html'),
            html: z.string().min(1).max(50000),
            css: z.string().max(10000).optional(),
            js: z.string().max(10000).optional()
        }),
        z.object({
            type: z.literal('widget'),
            widgetType: z.string().min(1),
            config: z.record(z.string(), z.any())
        })
    ]),
    // Visual
    thumbnailUrl: z.string().url().optional(),
    iconUrl: z.string().url().optional(),
    // Configuration
    config: ToolConfigSchema,
    // Ownership
    createdBy: z.string().min(1),
    ownedBy: z.string().min(1),
    spaceId: z.string().optional(), // If tool belongs to specific space
    // Collaboration
    collaborators: z.array(z.string()).max(10).default([]),
    permissions: z.array(ToolPermissionSchema).default([]),
    // Usage tracking
    metadata: ToolMetadataSchema,
    // Timestamps
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date().optional()
});
// Tool Usage Schema
export const ToolUsageSchema = z.object({
    toolId: z.string().min(1),
    userId: z.string().min(1),
    sessionId: z.string().min(1),
    // Session details
    startTime: z.date(),
    endTime: z.date().optional(),
    duration: z.number().min(0).optional(), // seconds
    // Interaction data
    clicks: z.number().min(0).default(0),
    scrolls: z.number().min(0).default(0),
    interactions: z.array(z.object({
        type: z.string(),
        timestamp: z.date(),
        data: z.record(z.string(), z.any()).optional()
    })).default([]),
    // Context
    referrer: z.string().optional(),
    platform: z.enum(['web', 'mobile', 'desktop']).optional(),
    // Outcome
    completed: z.boolean().default(false),
    shared: z.boolean().default(false),
    liked: z.boolean().default(false),
    createdAt: z.date()
});
// Tool Feedback Schema
export const ToolFeedbackSchema = z.object({
    toolId: z.string().min(1),
    userId: z.string().min(1),
    // Feedback details
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(1000).optional(),
    // Categorization
    categories: z.array(z.enum([
        'usability',
        'design',
        'functionality',
        'performance',
        'content',
        'accessibility',
        'other'
    ])).default([]),
    // Suggestions
    suggestions: z.array(z.string()).max(5).default([]),
    // Metadata
    helpful: z.boolean().default(false),
    verified: z.boolean().default(false),
    createdAt: z.date()
});
// Tool Template Schema
export const ToolTemplateSchema = z.object({
    id: z.string().min(1),
    // Template info
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    // Classification
    category: ToolCategorySchema,
    type: ToolTypeSchema,
    tags: z.array(z.string()).max(10).default([]),
    // Template content
    template: z.object({
        html: z.string().min(1).max(50000),
        css: z.string().max(10000).optional(),
        js: z.string().max(10000).optional(),
        config: z.record(z.string(), z.any()).optional()
    }),
    // Customization
    customizableFields: z.array(z.object({
        name: z.string().min(1),
        type: z.enum(['text', 'number', 'color', 'url', 'select', 'boolean']),
        default: z.any().optional(),
        options: z.array(z.any()).optional(),
        required: z.boolean().default(false)
    })).default([]),
    // Usage
    usageCount: z.number().min(0).default(0),
    // Metadata
    createdBy: z.string().min(1),
    createdAt: z.date(),
    updatedAt: z.date()
});
// Firestore-specific helpers
export const ToolConverter = {
    toFirestore: (tool) => ({
        ...tool,
        metadata: {
            ...tool.metadata,
            lastUpdated: tool.metadata.lastUpdated
        },
        createdAt: tool.createdAt,
        updatedAt: tool.updatedAt,
        publishedAt: tool.publishedAt
    }),
    fromFirestore: (data) => {
        return ToolSchema.parse({
            ...data,
            metadata: {
                ...data.metadata,
                lastUpdated: data.metadata?.lastUpdated?.toDate?.() || data.metadata?.lastUpdated
            },
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
            publishedAt: data.publishedAt?.toDate?.() || data.publishedAt
        });
    }
};
export const ToolUsageConverter = {
    toFirestore: (usage) => ({
        ...usage,
        startTime: usage.startTime,
        endTime: usage.endTime,
        interactions: usage.interactions.map(interaction => ({
            ...interaction,
            timestamp: interaction.timestamp
        })),
        createdAt: usage.createdAt
    }),
    fromFirestore: (data) => {
        return ToolUsageSchema.parse({
            ...data,
            startTime: data.startTime?.toDate?.() || data.startTime,
            endTime: data.endTime?.toDate?.() || data.endTime,
            interactions: data.interactions?.map((interaction) => ({
                ...interaction,
                timestamp: interaction.timestamp?.toDate?.() || interaction.timestamp
            })) || [],
            createdAt: data.createdAt?.toDate?.() || data.createdAt
        });
    }
};
// Collection paths
export const TOOL_COLLECTIONS = {
    TOOLS: 'tools',
    USER_TOOLS: (userId) => `users/${userId}/personal_tools`,
    SPACE_TOOLS: (spaceId) => `spaces/${spaceId}/tools`,
    TOOL_USAGE: (toolId) => `tools/${toolId}/usage`,
    TOOL_FEEDBACK: (toolId) => `tools/${toolId}/feedback`,
    TEMPLATES: 'tool_templates',
    CREATION_TOOLS: 'creation_tools'
};
// Tool utility functions
export const ToolUtils = {
    createTool: (name, description, category, type, createdBy, options) => ({
        name,
        description,
        category,
        type,
        tags: [],
        status: 'draft',
        visibility: 'private',
        content: {
            type: 'html',
            html: '<div>New tool content</div>'
        },
        config: {
            width: 400,
            height: 300,
            allowFullscreen: false,
            autoRefresh: false,
            requiresAuth: false,
            allowGuests: true,
            collectUsage: true,
            collectFeedback: true
        },
        createdBy,
        ownedBy: createdBy,
        collaborators: [],
        permissions: [],
        metadata: {
            totalViews: 0,
            uniqueUsers: 0,
            avgSessionTime: 0,
            likes: 0,
            shares: 0,
            comments: 0,
            rating: 0,
            ratingCount: 0,
            reportCount: 0,
            lastUpdated: new Date()
        },
        ...options
    }),
    canView: (tool, userId) => {
        if (tool.visibility === 'public')
            return true;
        if (!userId)
            return false; // Non-authenticated users can only view public tools
        if (tool.ownedBy === userId)
            return true;
        if (tool.collaborators.includes(userId))
            return true;
        // Check permissions
        const userPermission = tool.permissions.find(p => p.userId === userId);
        return userPermission?.permissions.includes('view') || false;
    },
    canEdit: (tool, userId) => {
        if (!userId)
            return false;
        if (tool.ownedBy === userId)
            return true;
        const userPermission = tool.permissions.find(p => p.userId === userId);
        return userPermission?.permissions.includes('edit') || false;
    },
    canDelete: (tool, userId) => {
        if (!userId)
            return false;
        if (tool.ownedBy === userId)
            return true;
        const userPermission = tool.permissions.find(p => p.userId === userId);
        return userPermission?.permissions.includes('delete') || false;
    },
    updateMetrics: (tool, updates) => ({
        ...tool,
        metadata: {
            ...tool.metadata,
            ...updates,
            lastUpdated: new Date()
        }
    }),
    addView: (tool, isUniqueUser = false) => {
        return ToolUtils.updateMetrics(tool, {
            totalViews: tool.metadata.totalViews + 1,
            uniqueUsers: tool.metadata.uniqueUsers + (isUniqueUser ? 1 : 0)
        });
    },
    addRating: (tool, rating) => {
        const currentTotal = tool.metadata.rating * tool.metadata.ratingCount;
        const newCount = tool.metadata.ratingCount + 1;
        const newRating = (currentTotal + rating) / newCount;
        return ToolUtils.updateMetrics(tool, {
            rating: Math.round(newRating * 10) / 10, // Round to 1 decimal
            ratingCount: newCount
        });
    },
    incrementLikes: (tool) => {
        return ToolUtils.updateMetrics(tool, {
            likes: tool.metadata.likes + 1
        });
    },
    incrementShares: (tool) => {
        return ToolUtils.updateMetrics(tool, {
            shares: tool.metadata.shares + 1
        });
    },
    calculatePopularityScore: (tool) => {
        const { totalViews, uniqueUsers, likes, shares, rating, ratingCount } = tool.metadata;
        // Weighted popularity score
        const viewScore = Math.log(totalViews + 1) * 0.2;
        const userScore = Math.log(uniqueUsers + 1) * 0.3;
        const engagementScore = (likes + shares * 2) * 0.3;
        const qualityScore = (rating * ratingCount / Math.max(ratingCount, 1)) * 0.2;
        return Math.round((viewScore + userScore + engagementScore + qualityScore) * 10) / 10;
    },
    getUsageAnalytics: (usageRecords) => {
        if (usageRecords.length === 0) {
            return {
                totalSessions: 0,
                avgDuration: 0,
                totalInteractions: 0,
                completionRate: 0,
                uniqueUsers: 0
            };
        }
        const totalSessions = usageRecords.length;
        const completedSessions = usageRecords.filter(u => u.completed).length;
        const totalDuration = usageRecords.reduce((sum, u) => sum + (u.duration || 0), 0);
        const totalInteractions = usageRecords.reduce((sum, u) => sum + u.interactions.length, 0);
        const uniqueUsers = new Set(usageRecords.map(u => u.userId)).size;
        return {
            totalSessions,
            avgDuration: Math.round(totalDuration / totalSessions),
            totalInteractions,
            completionRate: Math.round((completedSessions / totalSessions) * 100),
            uniqueUsers
        };
    },
    createFromTemplate: (template, customizations, createdBy) => {
        // Apply customizations to template
        let html = template.template.html;
        let css = template.template.css || '';
        let js = template.template.js || '';
        template.customizableFields.forEach(field => {
            const value = customizations[field.name] ?? field.default;
            const placeholder = `{{${field.name}}}`;
            html = html.replace(new RegExp(placeholder, 'g'), String(value));
            css = css.replace(new RegExp(placeholder, 'g'), String(value));
            js = js.replace(new RegExp(placeholder, 'g'), String(value));
        });
        return ToolUtils.createTool(template.name, template.description, template.category, template.type, createdBy, {
            content: {
                type: 'html',
                html,
                css,
                js
            },
            config: {
                width: 400,
                height: 300,
                allowFullscreen: false,
                autoRefresh: false,
                requiresAuth: false,
                allowGuests: true,
                collectUsage: true,
                collectFeedback: true,
                ...template.template.config
            }
        });
    }
};
// Tool permission helpers
export const ToolPermissionUtils = {
    grantPermission: (tool, userId, role, grantedBy) => {
        const permissions = role === 'owner'
            ? ['view', 'edit', 'delete', 'share', 'manage_permissions', 'view_analytics']
            : role === 'collaborator'
                ? ['view', 'edit', 'share']
                : ['view'];
        const newPermission = {
            userId,
            role,
            permissions,
            grantedAt: new Date(),
            grantedBy
        };
        // Remove existing permission for this user
        const filteredPermissions = tool.permissions.filter(p => p.userId !== userId);
        return {
            ...tool,
            permissions: [...filteredPermissions, newPermission]
        };
    },
    revokePermission: (tool, userId) => ({
        ...tool,
        permissions: tool.permissions.filter(p => p.userId !== userId),
        collaborators: tool.collaborators.filter(id => id !== userId)
    }),
    hasPermission: (tool, userId, permission) => {
        if (tool.ownedBy === userId)
            return true;
        const userPermission = tool.permissions.find(p => p.userId === userId);
        return userPermission?.permissions.includes(permission) || false;
    }
};
//# sourceMappingURL=tool.js.map