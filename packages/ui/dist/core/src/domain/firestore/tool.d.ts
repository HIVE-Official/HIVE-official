import { z } from "zod";
export declare const ToolCategorySchema: z.ZodEnum<["productivity", "social", "academic", "creative", "utility", "game", "communication", "organization", "wellness", "custom"]>;
export declare const ToolTypeSchema: z.ZodEnum<["iframe_embed", "web_app", "widget", "form", "calculator", "poll", "quiz", "timer", "counter", "link_collection", "custom"]>;
export declare const ToolStatusSchema: z.ZodEnum<["draft", "testing", "published", "archived", "flagged"]>;
export declare const ToolVisibilitySchema: z.ZodEnum<["public", "space_only", "private", "members_only"]>;
export declare const ToolConfigSchema: z.ZodObject<{
    width: z.ZodDefault<z.ZodNumber>;
    height: z.ZodDefault<z.ZodNumber>;
    allowFullscreen: z.ZodDefault<z.ZodBoolean>;
    autoRefresh: z.ZodDefault<z.ZodBoolean>;
    refreshInterval: z.ZodOptional<z.ZodNumber>;
    requiresAuth: z.ZodDefault<z.ZodBoolean>;
    allowGuests: z.ZodDefault<z.ZodBoolean>;
    customCSS: z.ZodOptional<z.ZodString>;
    customJS: z.ZodOptional<z.ZodString>;
    collectUsage: z.ZodDefault<z.ZodBoolean>;
    collectFeedback: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    height?: number;
    width?: number;
    customCSS?: string;
    allowFullscreen?: boolean;
    autoRefresh?: boolean;
    refreshInterval?: number;
    requiresAuth?: boolean;
    allowGuests?: boolean;
    customJS?: string;
    collectUsage?: boolean;
    collectFeedback?: boolean;
}, {
    height?: number;
    width?: number;
    customCSS?: string;
    allowFullscreen?: boolean;
    autoRefresh?: boolean;
    refreshInterval?: number;
    requiresAuth?: boolean;
    allowGuests?: boolean;
    customJS?: string;
    collectUsage?: boolean;
    collectFeedback?: boolean;
}>;
export declare const ToolMetadataSchema: z.ZodObject<{
    loadTime: z.ZodOptional<z.ZodNumber>;
    errorRate: z.ZodOptional<z.ZodNumber>;
    totalViews: z.ZodDefault<z.ZodNumber>;
    uniqueUsers: z.ZodDefault<z.ZodNumber>;
    avgSessionTime: z.ZodDefault<z.ZodNumber>;
    likes: z.ZodDefault<z.ZodNumber>;
    shares: z.ZodDefault<z.ZodNumber>;
    comments: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodDefault<z.ZodNumber>;
    ratingCount: z.ZodDefault<z.ZodNumber>;
    reportCount: z.ZodDefault<z.ZodNumber>;
    lastReported: z.ZodOptional<z.ZodDate>;
    lastUpdated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    rating?: number;
    ratingCount?: number;
    totalViews?: number;
    lastUpdated?: Date;
    loadTime?: number;
    errorRate?: number;
    uniqueUsers?: number;
    avgSessionTime?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    reportCount?: number;
    lastReported?: Date;
}, {
    rating?: number;
    ratingCount?: number;
    totalViews?: number;
    lastUpdated?: Date;
    loadTime?: number;
    errorRate?: number;
    uniqueUsers?: number;
    avgSessionTime?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    reportCount?: number;
    lastReported?: Date;
}>;
export declare const ToolPermissionSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<["owner", "collaborator", "viewer"]>;
    permissions: z.ZodArray<z.ZodEnum<["view", "edit", "delete", "share", "manage_permissions", "view_analytics"]>, "many">;
    grantedAt: z.ZodDate;
    grantedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role?: "owner" | "collaborator" | "viewer";
    userId?: string;
    permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
    grantedAt?: Date;
    grantedBy?: string;
}, {
    role?: "owner" | "collaborator" | "viewer";
    userId?: string;
    permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
    grantedAt?: Date;
    grantedBy?: string;
}>;
export declare const ToolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<["productivity", "social", "academic", "creative", "utility", "game", "communication", "organization", "wellness", "custom"]>;
    type: z.ZodEnum<["iframe_embed", "web_app", "widget", "form", "calculator", "poll", "quiz", "timer", "counter", "link_collection", "custom"]>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodEnum<["draft", "testing", "published", "archived", "flagged"]>;
    visibility: z.ZodEnum<["public", "space_only", "private", "members_only"]>;
    content: z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"iframe">;
        url: z.ZodString;
        allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type?: "iframe";
        url?: string;
        allowedDomains?: string[];
    }, {
        type?: "iframe";
        url?: string;
        allowedDomains?: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"html">;
        html: z.ZodString;
        css: z.ZodOptional<z.ZodString>;
        js: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type?: "html";
        html?: string;
        css?: string;
        js?: string;
    }, {
        type?: "html";
        html?: string;
        css?: string;
        js?: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"widget">;
        widgetType: z.ZodString;
        config: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type?: "widget";
        config?: Record<string, any>;
        widgetType?: string;
    }, {
        type?: "widget";
        config?: Record<string, any>;
        widgetType?: string;
    }>]>;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    iconUrl: z.ZodOptional<z.ZodString>;
    config: z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
        allowFullscreen: z.ZodDefault<z.ZodBoolean>;
        autoRefresh: z.ZodDefault<z.ZodBoolean>;
        refreshInterval: z.ZodOptional<z.ZodNumber>;
        requiresAuth: z.ZodDefault<z.ZodBoolean>;
        allowGuests: z.ZodDefault<z.ZodBoolean>;
        customCSS: z.ZodOptional<z.ZodString>;
        customJS: z.ZodOptional<z.ZodString>;
        collectUsage: z.ZodDefault<z.ZodBoolean>;
        collectFeedback: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
        customCSS?: string;
        allowFullscreen?: boolean;
        autoRefresh?: boolean;
        refreshInterval?: number;
        requiresAuth?: boolean;
        allowGuests?: boolean;
        customJS?: string;
        collectUsage?: boolean;
        collectFeedback?: boolean;
    }, {
        height?: number;
        width?: number;
        customCSS?: string;
        allowFullscreen?: boolean;
        autoRefresh?: boolean;
        refreshInterval?: number;
        requiresAuth?: boolean;
        allowGuests?: boolean;
        customJS?: string;
        collectUsage?: boolean;
        collectFeedback?: boolean;
    }>;
    createdBy: z.ZodString;
    ownedBy: z.ZodString;
    spaceId: z.ZodOptional<z.ZodString>;
    collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        role: z.ZodEnum<["owner", "collaborator", "viewer"]>;
        permissions: z.ZodArray<z.ZodEnum<["view", "edit", "delete", "share", "manage_permissions", "view_analytics"]>, "many">;
        grantedAt: z.ZodDate;
        grantedBy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role?: "owner" | "collaborator" | "viewer";
        userId?: string;
        permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt?: Date;
        grantedBy?: string;
    }, {
        role?: "owner" | "collaborator" | "viewer";
        userId?: string;
        permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt?: Date;
        grantedBy?: string;
    }>, "many">>;
    metadata: z.ZodObject<{
        loadTime: z.ZodOptional<z.ZodNumber>;
        errorRate: z.ZodOptional<z.ZodNumber>;
        totalViews: z.ZodDefault<z.ZodNumber>;
        uniqueUsers: z.ZodDefault<z.ZodNumber>;
        avgSessionTime: z.ZodDefault<z.ZodNumber>;
        likes: z.ZodDefault<z.ZodNumber>;
        shares: z.ZodDefault<z.ZodNumber>;
        comments: z.ZodDefault<z.ZodNumber>;
        rating: z.ZodDefault<z.ZodNumber>;
        ratingCount: z.ZodDefault<z.ZodNumber>;
        reportCount: z.ZodDefault<z.ZodNumber>;
        lastReported: z.ZodOptional<z.ZodDate>;
        lastUpdated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        rating?: number;
        ratingCount?: number;
        totalViews?: number;
        lastUpdated?: Date;
        loadTime?: number;
        errorRate?: number;
        uniqueUsers?: number;
        avgSessionTime?: number;
        likes?: number;
        shares?: number;
        comments?: number;
        reportCount?: number;
        lastReported?: Date;
    }, {
        rating?: number;
        ratingCount?: number;
        totalViews?: number;
        lastUpdated?: Date;
        loadTime?: number;
        errorRate?: number;
        uniqueUsers?: number;
        avgSessionTime?: number;
        likes?: number;
        shares?: number;
        comments?: number;
        reportCount?: number;
        lastReported?: Date;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        rating?: number;
        ratingCount?: number;
        totalViews?: number;
        lastUpdated?: Date;
        loadTime?: number;
        errorRate?: number;
        uniqueUsers?: number;
        avgSessionTime?: number;
        likes?: number;
        shares?: number;
        comments?: number;
        reportCount?: number;
        lastReported?: Date;
    };
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    type?: "form" | "timer" | "custom" | "poll" | "iframe_embed" | "web_app" | "widget" | "calculator" | "quiz" | "counter" | "link_collection";
    content?: {
        type?: "iframe";
        url?: string;
        allowedDomains?: string[];
    } | {
        type?: "html";
        html?: string;
        css?: string;
        js?: string;
    } | {
        type?: "widget";
        config?: Record<string, any>;
        widgetType?: string;
    };
    status?: "draft" | "published" | "flagged" | "testing" | "archived";
    visibility?: "public" | "members_only" | "space_only" | "private";
    description?: string;
    config?: {
        height?: number;
        width?: number;
        customCSS?: string;
        allowFullscreen?: boolean;
        autoRefresh?: boolean;
        refreshInterval?: number;
        requiresAuth?: boolean;
        allowGuests?: boolean;
        customJS?: string;
        collectUsage?: boolean;
        collectFeedback?: boolean;
    };
    tags?: string[];
    category?: "organization" | "custom" | "academic" | "social" | "productivity" | "creative" | "utility" | "game" | "communication" | "wellness";
    createdBy?: string;
    collaborators?: string[];
    spaceId?: string;
    publishedAt?: Date;
    iconUrl?: string;
    permissions?: {
        role?: "owner" | "collaborator" | "viewer";
        userId?: string;
        permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt?: Date;
        grantedBy?: string;
    }[];
    thumbnailUrl?: string;
    ownedBy?: string;
}, {
    metadata?: {
        rating?: number;
        ratingCount?: number;
        totalViews?: number;
        lastUpdated?: Date;
        loadTime?: number;
        errorRate?: number;
        uniqueUsers?: number;
        avgSessionTime?: number;
        likes?: number;
        shares?: number;
        comments?: number;
        reportCount?: number;
        lastReported?: Date;
    };
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    type?: "form" | "timer" | "custom" | "poll" | "iframe_embed" | "web_app" | "widget" | "calculator" | "quiz" | "counter" | "link_collection";
    content?: {
        type?: "iframe";
        url?: string;
        allowedDomains?: string[];
    } | {
        type?: "html";
        html?: string;
        css?: string;
        js?: string;
    } | {
        type?: "widget";
        config?: Record<string, any>;
        widgetType?: string;
    };
    status?: "draft" | "published" | "flagged" | "testing" | "archived";
    visibility?: "public" | "members_only" | "space_only" | "private";
    description?: string;
    config?: {
        height?: number;
        width?: number;
        customCSS?: string;
        allowFullscreen?: boolean;
        autoRefresh?: boolean;
        refreshInterval?: number;
        requiresAuth?: boolean;
        allowGuests?: boolean;
        customJS?: string;
        collectUsage?: boolean;
        collectFeedback?: boolean;
    };
    tags?: string[];
    category?: "organization" | "custom" | "academic" | "social" | "productivity" | "creative" | "utility" | "game" | "communication" | "wellness";
    createdBy?: string;
    collaborators?: string[];
    spaceId?: string;
    publishedAt?: Date;
    iconUrl?: string;
    permissions?: {
        role?: "owner" | "collaborator" | "viewer";
        userId?: string;
        permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt?: Date;
        grantedBy?: string;
    }[];
    thumbnailUrl?: string;
    ownedBy?: string;
}>;
export declare const ToolUsageSchema: z.ZodObject<{
    toolId: z.ZodString;
    userId: z.ZodString;
    sessionId: z.ZodString;
    startTime: z.ZodDate;
    endTime: z.ZodOptional<z.ZodDate>;
    duration: z.ZodOptional<z.ZodNumber>;
    clicks: z.ZodDefault<z.ZodNumber>;
    scrolls: z.ZodDefault<z.ZodNumber>;
    interactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        timestamp: z.ZodDate;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        type?: string;
        data?: Record<string, any>;
        timestamp?: Date;
    }, {
        type?: string;
        data?: Record<string, any>;
        timestamp?: Date;
    }>, "many">>;
    referrer: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["web", "mobile", "desktop"]>>;
    completed: z.ZodDefault<z.ZodBoolean>;
    shared: z.ZodDefault<z.ZodBoolean>;
    liked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date;
    duration?: number;
    userId?: string;
    toolId?: string;
    sessionId?: string;
    referrer?: string;
    startTime?: Date;
    endTime?: Date;
    completed?: boolean;
    clicks?: number;
    scrolls?: number;
    interactions?: {
        type?: string;
        data?: Record<string, any>;
        timestamp?: Date;
    }[];
    platform?: "mobile" | "desktop" | "web";
    shared?: boolean;
    liked?: boolean;
}, {
    createdAt?: Date;
    duration?: number;
    userId?: string;
    toolId?: string;
    sessionId?: string;
    referrer?: string;
    startTime?: Date;
    endTime?: Date;
    completed?: boolean;
    clicks?: number;
    scrolls?: number;
    interactions?: {
        type?: string;
        data?: Record<string, any>;
        timestamp?: Date;
    }[];
    platform?: "mobile" | "desktop" | "web";
    shared?: boolean;
    liked?: boolean;
}>;
export declare const ToolFeedbackSchema: z.ZodObject<{
    toolId: z.ZodString;
    userId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
    categories: z.ZodDefault<z.ZodArray<z.ZodEnum<["usability", "design", "functionality", "performance", "content", "accessibility", "other"]>, "many">>;
    suggestions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    helpful: z.ZodDefault<z.ZodBoolean>;
    verified: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt?: Date;
    comment?: string;
    userId?: string;
    rating?: number;
    toolId?: string;
    categories?: ("content" | "other" | "usability" | "design" | "functionality" | "performance" | "accessibility")[];
    suggestions?: string[];
    helpful?: boolean;
    verified?: boolean;
}, {
    createdAt?: Date;
    comment?: string;
    userId?: string;
    rating?: number;
    toolId?: string;
    categories?: ("content" | "other" | "usability" | "design" | "functionality" | "performance" | "accessibility")[];
    suggestions?: string[];
    helpful?: boolean;
    verified?: boolean;
}>;
export declare const ToolTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<["productivity", "social", "academic", "creative", "utility", "game", "communication", "organization", "wellness", "custom"]>;
    type: z.ZodEnum<["iframe_embed", "web_app", "widget", "form", "calculator", "poll", "quiz", "timer", "counter", "link_collection", "custom"]>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    template: z.ZodObject<{
        html: z.ZodString;
        css: z.ZodOptional<z.ZodString>;
        js: z.ZodOptional<z.ZodString>;
        config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        html?: string;
        config?: Record<string, any>;
        css?: string;
        js?: string;
    }, {
        html?: string;
        config?: Record<string, any>;
        css?: string;
        js?: string;
    }>;
    customizableFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["text", "number", "color", "url", "select", "boolean"]>;
        default: z.ZodOptional<z.ZodAny>;
        options: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        required: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        default?: any;
        name?: string;
        type?: "number" | "boolean" | "color" | "text" | "url" | "select";
        required?: boolean;
        options?: any[];
    }, {
        default?: any;
        name?: string;
        type?: "number" | "boolean" | "color" | "text" | "url" | "select";
        required?: boolean;
        options?: any[];
    }>, "many">>;
    usageCount: z.ZodDefault<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    type?: "form" | "timer" | "custom" | "poll" | "iframe_embed" | "web_app" | "widget" | "calculator" | "quiz" | "counter" | "link_collection";
    template?: {
        html?: string;
        config?: Record<string, any>;
        css?: string;
        js?: string;
    };
    description?: string;
    tags?: string[];
    category?: "organization" | "custom" | "academic" | "social" | "productivity" | "creative" | "utility" | "game" | "communication" | "wellness";
    usageCount?: number;
    createdBy?: string;
    customizableFields?: {
        default?: any;
        name?: string;
        type?: "number" | "boolean" | "color" | "text" | "url" | "select";
        required?: boolean;
        options?: any[];
    }[];
}, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    type?: "form" | "timer" | "custom" | "poll" | "iframe_embed" | "web_app" | "widget" | "calculator" | "quiz" | "counter" | "link_collection";
    template?: {
        html?: string;
        config?: Record<string, any>;
        css?: string;
        js?: string;
    };
    description?: string;
    tags?: string[];
    category?: "organization" | "custom" | "academic" | "social" | "productivity" | "creative" | "utility" | "game" | "communication" | "wellness";
    usageCount?: number;
    createdBy?: string;
    customizableFields?: {
        default?: any;
        name?: string;
        type?: "number" | "boolean" | "color" | "text" | "url" | "select";
        required?: boolean;
        options?: any[];
    }[];
}>;
export type Tool = z.infer<typeof ToolSchema>;
export type ToolUsage = z.infer<typeof ToolUsageSchema>;
export type ToolFeedback = z.infer<typeof ToolFeedbackSchema>;
export type ToolTemplate = z.infer<typeof ToolTemplateSchema>;
export type ToolConfig = z.infer<typeof ToolConfigSchema>;
export type ToolMetadata = z.infer<typeof ToolMetadataSchema>;
export type ToolPermission = z.infer<typeof ToolPermissionSchema>;
export type ToolCategory = z.infer<typeof ToolCategorySchema>;
export type ToolType = z.infer<typeof ToolTypeSchema>;
export type ToolStatus = z.infer<typeof ToolStatusSchema>;
export type ToolVisibility = z.infer<typeof ToolVisibilitySchema>;
export declare const ToolConverter: {
    toFirestore: (tool: Tool) => {
        metadata: {
            lastUpdated: Date;
            rating?: number;
            ratingCount?: number;
            totalViews?: number;
            loadTime?: number;
            errorRate?: number;
            uniqueUsers?: number;
            avgSessionTime?: number;
            likes?: number;
            shares?: number;
            comments?: number;
            reportCount?: number;
            lastReported?: Date;
        };
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        id?: string;
        name?: string;
        type?: "form" | "timer" | "custom" | "poll" | "iframe_embed" | "web_app" | "widget" | "calculator" | "quiz" | "counter" | "link_collection";
        content?: {
            type?: "iframe";
            url?: string;
            allowedDomains?: string[];
        } | {
            type?: "html";
            html?: string;
            css?: string;
            js?: string;
        } | {
            type?: "widget";
            config?: Record<string, any>;
            widgetType?: string;
        };
        status?: "draft" | "published" | "flagged" | "testing" | "archived";
        visibility?: "public" | "members_only" | "space_only" | "private";
        description?: string;
        config?: {
            height?: number;
            width?: number;
            customCSS?: string;
            allowFullscreen?: boolean;
            autoRefresh?: boolean;
            refreshInterval?: number;
            requiresAuth?: boolean;
            allowGuests?: boolean;
            customJS?: string;
            collectUsage?: boolean;
            collectFeedback?: boolean;
        };
        tags?: string[];
        category?: "organization" | "custom" | "academic" | "social" | "productivity" | "creative" | "utility" | "game" | "communication" | "wellness";
        createdBy?: string;
        collaborators?: string[];
        spaceId?: string;
        iconUrl?: string;
        permissions?: {
            role?: "owner" | "collaborator" | "viewer";
            userId?: string;
            permissions?: ("delete" | "view" | "edit" | "share" | "manage_permissions" | "view_analytics")[];
            grantedAt?: Date;
            grantedBy?: string;
        }[];
        thumbnailUrl?: string;
        ownedBy?: string;
    };
    fromFirestore: (data: any) => Tool;
};
export declare const ToolUsageConverter: {
    toFirestore: (usage: ToolUsage) => {
        startTime: Date;
        endTime: Date;
        interactions: {
            timestamp: Date;
            type?: string;
            data?: Record<string, any>;
        }[];
        createdAt: Date;
        duration?: number;
        userId?: string;
        toolId?: string;
        sessionId?: string;
        referrer?: string;
        completed?: boolean;
        clicks?: number;
        scrolls?: number;
        platform?: "mobile" | "desktop" | "web";
        shared?: boolean;
        liked?: boolean;
    };
    fromFirestore: (data: any) => ToolUsage;
};
export declare const TOOL_COLLECTIONS: {
    readonly TOOLS: "tools";
    readonly USER_TOOLS: (userId: string) => string;
    readonly SPACE_TOOLS: (spaceId: string) => string;
    readonly TOOL_USAGE: (toolId: string) => string;
    readonly TOOL_FEEDBACK: (toolId: string) => string;
    readonly TEMPLATES: "tool_templates";
    readonly CREATION_TOOLS: "creation_tools";
};
export declare const ToolUtils: {
    createTool: (name: string, description: string, category: ToolCategory, type: ToolType, createdBy: string, options?: Partial<Tool>) => Omit<Tool, "id" | "createdAt" | "updatedAt">;
    canView: (tool: Tool, userId?: string) => boolean;
    canEdit: (tool: Tool, userId?: string) => boolean;
    canDelete: (tool: Tool, userId?: string) => boolean;
    updateMetrics: (tool: Tool, updates: Partial<ToolMetadata>) => Tool;
    addView: (tool: Tool, isUniqueUser?: boolean) => Tool;
    addRating: (tool: Tool, rating: number) => Tool;
    incrementLikes: (tool: Tool) => Tool;
    incrementShares: (tool: Tool) => Tool;
    calculatePopularityScore: (tool: Tool) => number;
    getUsageAnalytics: (usageRecords: ToolUsage[]) => {
        totalSessions: number;
        avgDuration: number;
        totalInteractions: number;
        completionRate: number;
        uniqueUsers: number;
    };
    createFromTemplate: (template: ToolTemplate, customizations: Record<string, any>, createdBy: string) => Omit<Tool, "id" | "createdAt" | "updatedAt">;
};
export declare const ToolPermissionUtils: {
    grantPermission: (tool: Tool, userId: string, role: ToolPermission["role"], grantedBy: string) => Tool;
    revokePermission: (tool: Tool, userId: string) => Tool;
    hasPermission: (tool: Tool, userId: string, permission: ToolPermission["permissions"][0]) => boolean;
};
//# sourceMappingURL=tool.d.ts.map