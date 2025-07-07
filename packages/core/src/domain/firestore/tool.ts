import { z } from "zod";
import {
  ToolSchema,
  ToolUsageSchema,
  ToolFeedbackSchema,
  ToolTemplateSchema,
  ToolConfigSchema,
  ToolMetadataSchema,
  ToolPermissionSchema,
  ToolCategorySchema,
  ToolTypeSchema,
  ToolStatusSchema,
  ToolVisibilitySchema,
  type Tool,
  type ToolUsage,
  type ToolFeedback,
  type ToolTemplate,
  type ToolConfig,
  type ToolMetadata,
  type ToolPermission,
  type ToolCategory,
  type ToolType,
  type ToolStatus,
  type ToolVisibility
} from "@hive/validation";

// Re-export validation schemas
export {
  ToolSchema,
  ToolUsageSchema,
  ToolFeedbackSchema,
  ToolTemplateSchema,
  ToolConfigSchema,
  ToolMetadataSchema,
  ToolPermissionSchema,
  ToolCategorySchema,
  ToolTypeSchema,
  ToolStatusSchema,
  ToolVisibilitySchema,
  type Tool,
  type ToolUsage,
  type ToolFeedback,
  type ToolTemplate,
  type ToolConfig,
  type ToolMetadata,
  type ToolPermission,
  type ToolCategory,
  type ToolType,
  type ToolStatus,
  type ToolVisibility
};

// Firestore-specific helpers
export const ToolConverter = {
  toFirestore: (tool: Tool) => ({
    ...tool,
    metadata: {
      ...tool.metadata,
      lastUpdated: tool.metadata.lastUpdated
    },
    createdAt: tool.createdAt,
    updatedAt: tool.updatedAt,
    publishedAt: tool.publishedAt
  }),
  
  fromFirestore: (data: any): Tool => {
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
  toFirestore: (usage: ToolUsage) => ({
    ...usage,
    startTime: usage.startTime,
    endTime: usage.endTime,
    interactions: usage.interactions.map(interaction => ({
      ...interaction,
      timestamp: interaction.timestamp
    })),
    createdAt: usage.createdAt
  }),
  
  fromFirestore: (data: any): ToolUsage => {
    return ToolUsageSchema.parse({
      ...data,
      startTime: data.startTime?.toDate?.() || data.startTime,
      endTime: data.endTime?.toDate?.() || data.endTime,
      interactions: data.interactions?.map((interaction: any) => ({
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
  USER_TOOLS: (userId: string) => `users/${userId}/personal_tools`,
  SPACE_TOOLS: (spaceId: string) => `spaces/${spaceId}/tools`,
  TOOL_USAGE: (toolId: string) => `tools/${toolId}/usage`,
  TOOL_FEEDBACK: (toolId: string) => `tools/${toolId}/feedback`,
  TEMPLATES: 'tool_templates',
  CREATION_TOOLS: 'creation_tools'
} as const;

// Tool utility functions
export const ToolUtils = {
  createTool: (
    name: string,
    description: string,
    category: ToolCategory,
    type: ToolType,
    createdBy: string,
    options?: Partial<Tool>
  ): Omit<Tool, 'id' | 'createdAt' | 'updatedAt'> => ({
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
  
  canView: (tool: Tool, userId?: string): boolean => {
    if (tool.visibility === 'public') return true;
    if (!userId) return false; // Non-authenticated users can only view public tools
    if (tool.ownedBy === userId) return true;
    if (tool.collaborators.includes(userId)) return true;
    
    // Check permissions
    const userPermission = tool.permissions.find(p => p.userId === userId);
    return userPermission?.permissions.includes('view') || false;
  },
  
  canEdit: (tool: Tool, userId?: string): boolean => {
    if (!userId) return false;
    if (tool.ownedBy === userId) return true;
    
    const userPermission = tool.permissions.find(p => p.userId === userId);
    return userPermission?.permissions.includes('edit') || false;
  },
  
  canDelete: (tool: Tool, userId?: string): boolean => {
    if (!userId) return false;
    if (tool.ownedBy === userId) return true;
    
    const userPermission = tool.permissions.find(p => p.userId === userId);
    return userPermission?.permissions.includes('delete') || false;
  },
  
  updateMetrics: (tool: Tool, updates: Partial<ToolMetadata>): Tool => ({
    ...tool,
    metadata: {
      ...tool.metadata,
      ...updates,
      lastUpdated: new Date()
    }
  }),
  
  addView: (tool: Tool, isUniqueUser: boolean = false): Tool => {
    return ToolUtils.updateMetrics(tool, {
      totalViews: tool.metadata.totalViews + 1,
      uniqueUsers: tool.metadata.uniqueUsers + (isUniqueUser ? 1 : 0)
    });
  },
  
  addRating: (tool: Tool, rating: number): Tool => {
    const currentTotal = tool.metadata.rating * tool.metadata.ratingCount;
    const newCount = tool.metadata.ratingCount + 1;
    const newRating = (currentTotal + rating) / newCount;
    
    return ToolUtils.updateMetrics(tool, {
      rating: Math.round(newRating * 10) / 10, // Round to 1 decimal
      ratingCount: newCount
    });
  },
  
  incrementLikes: (tool: Tool): Tool => {
    return ToolUtils.updateMetrics(tool, {
      likes: tool.metadata.likes + 1
    });
  },
  
  incrementShares: (tool: Tool): Tool => {
    return ToolUtils.updateMetrics(tool, {
      shares: tool.metadata.shares + 1
    });
  },
  
  calculatePopularityScore: (tool: Tool): number => {
    const { totalViews, uniqueUsers, likes, shares, rating, ratingCount } = tool.metadata;
    
    // Weighted popularity score
    const viewScore = Math.log(totalViews + 1) * 0.2;
    const userScore = Math.log(uniqueUsers + 1) * 0.3;
    const engagementScore = (likes + shares * 2) * 0.3;
    const qualityScore = (rating * ratingCount / Math.max(ratingCount, 1)) * 0.2;
    
    return Math.round((viewScore + userScore + engagementScore + qualityScore) * 10) / 10;
  },
  
  getUsageAnalytics: (usageRecords: ToolUsage[]): {
    totalSessions: number;
    avgDuration: number;
    totalInteractions: number;
    completionRate: number;
    uniqueUsers: number;
  } => {
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
  
  createFromTemplate: (
    template: ToolTemplate,
    customizations: Record<string, any>,
    createdBy: string
  ): Omit<Tool, 'id' | 'createdAt' | 'updatedAt'> => {
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
    
    return ToolUtils.createTool(
      template.name,
      template.description,
      template.category,
      template.type,
      createdBy,
      {
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
      }
    );
  }
};

// Tool permission helpers
export const ToolPermissionUtils = {
  grantPermission: (
    tool: Tool,
    userId: string,
    role: ToolPermission['role'],
    grantedBy: string
  ): Tool => {
    const permissions: ToolPermission['permissions'] = role === 'owner' 
      ? ['view', 'edit', 'delete', 'share', 'manage_permissions', 'view_analytics']
      : role === 'collaborator'
      ? ['view', 'edit', 'share']
      : ['view'];
    
    const newPermission: ToolPermission = {
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
  
  revokePermission: (tool: Tool, userId: string): Tool => ({
    ...tool,
    permissions: tool.permissions.filter(p => p.userId !== userId),
    collaborators: tool.collaborators.filter(id => id !== userId)
  }),
  
  hasPermission: (tool: Tool, userId: string, permission: ToolPermission['permissions'][0]): boolean => {
    if (tool.ownedBy === userId) return true;
    
    const userPermission = tool.permissions.find(p => p.userId === userId);
    return userPermission?.permissions.includes(permission) || false;
  }
};