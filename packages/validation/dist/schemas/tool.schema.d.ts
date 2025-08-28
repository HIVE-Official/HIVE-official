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
    width: number;
    height: number;
    allowFullscreen: boolean;
    autoRefresh: boolean;
    requiresAuth: boolean;
    allowGuests: boolean;
    collectUsage: boolean;
    collectFeedback: boolean;
    refreshInterval?: number | undefined;
    customCSS?: string | undefined;
    customJS?: string | undefined;
}, {
    width?: number | undefined;
    height?: number | undefined;
    allowFullscreen?: boolean | undefined;
    autoRefresh?: boolean | undefined;
    refreshInterval?: number | undefined;
    requiresAuth?: boolean | undefined;
    allowGuests?: boolean | undefined;
    customCSS?: string | undefined;
    customJS?: string | undefined;
    collectUsage?: boolean | undefined;
    collectFeedback?: boolean | undefined;
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
    likes: number;
    comments: number;
    totalViews: number;
    uniqueUsers: number;
    avgSessionTime: number;
    shares: number;
    rating: number;
    ratingCount: number;
    reportCount: number;
    lastUpdated: Date;
    loadTime?: number | undefined;
    errorRate?: number | undefined;
    lastReported?: Date | undefined;
}, {
    lastUpdated: Date;
    likes?: number | undefined;
    comments?: number | undefined;
    loadTime?: number | undefined;
    errorRate?: number | undefined;
    totalViews?: number | undefined;
    uniqueUsers?: number | undefined;
    avgSessionTime?: number | undefined;
    shares?: number | undefined;
    rating?: number | undefined;
    ratingCount?: number | undefined;
    reportCount?: number | undefined;
    lastReported?: Date | undefined;
}>;
export declare const ToolPermissionSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<["owner", "collaborator", "viewer"]>;
    permissions: z.ZodArray<z.ZodEnum<["view", "edit", "delete", "share", "manage_permissions", "view_analytics"]>, "many">;
    grantedAt: z.ZodDate;
    grantedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    role: "owner" | "collaborator" | "viewer";
    permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
    grantedAt: Date;
    grantedBy: string;
}, {
    userId: string;
    role: "owner" | "collaborator" | "viewer";
    permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
    grantedAt: Date;
    grantedBy: string;
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
        type: "iframe";
        url: string;
        allowedDomains?: string[] | undefined;
    }, {
        type: "iframe";
        url: string;
        allowedDomains?: string[] | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"html">;
        html: z.ZodString;
        css: z.ZodOptional<z.ZodString>;
        js: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "html";
        html: string;
        css?: string | undefined;
        js?: string | undefined;
    }, {
        type: "html";
        html: string;
        css?: string | undefined;
        js?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"widget">;
        widgetType: z.ZodString;
        config: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        type: "widget";
        widgetType: string;
        config: Record<string, any>;
    }, {
        type: "widget";
        widgetType: string;
        config: Record<string, any>;
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
        width: number;
        height: number;
        allowFullscreen: boolean;
        autoRefresh: boolean;
        requiresAuth: boolean;
        allowGuests: boolean;
        collectUsage: boolean;
        collectFeedback: boolean;
        refreshInterval?: number | undefined;
        customCSS?: string | undefined;
        customJS?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        allowFullscreen?: boolean | undefined;
        autoRefresh?: boolean | undefined;
        refreshInterval?: number | undefined;
        requiresAuth?: boolean | undefined;
        allowGuests?: boolean | undefined;
        customCSS?: string | undefined;
        customJS?: string | undefined;
        collectUsage?: boolean | undefined;
        collectFeedback?: boolean | undefined;
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
        userId: string;
        role: "owner" | "collaborator" | "viewer";
        permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt: Date;
        grantedBy: string;
    }, {
        userId: string;
        role: "owner" | "collaborator" | "viewer";
        permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt: Date;
        grantedBy: string;
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
        likes: number;
        comments: number;
        totalViews: number;
        uniqueUsers: number;
        avgSessionTime: number;
        shares: number;
        rating: number;
        ratingCount: number;
        reportCount: number;
        lastUpdated: Date;
        loadTime?: number | undefined;
        errorRate?: number | undefined;
        lastReported?: Date | undefined;
    }, {
        lastUpdated: Date;
        likes?: number | undefined;
        comments?: number | undefined;
        loadTime?: number | undefined;
        errorRate?: number | undefined;
        totalViews?: number | undefined;
        uniqueUsers?: number | undefined;
        avgSessionTime?: number | undefined;
        shares?: number | undefined;
        rating?: number | undefined;
        ratingCount?: number | undefined;
        reportCount?: number | undefined;
        lastReported?: Date | undefined;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "custom" | "iframe_embed" | "web_app" | "widget" | "form" | "calculator" | "poll" | "quiz" | "timer" | "counter" | "link_collection";
    status: "draft" | "testing" | "published" | "archived" | "flagged";
    content: {
        type: "iframe";
        url: string;
        allowedDomains?: string[] | undefined;
    } | {
        type: "html";
        html: string;
        css?: string | undefined;
        js?: string | undefined;
    } | {
        type: "widget";
        widgetType: string;
        config: Record<string, any>;
    };
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    metadata: {
        likes: number;
        comments: number;
        totalViews: number;
        uniqueUsers: number;
        avgSessionTime: number;
        shares: number;
        rating: number;
        ratingCount: number;
        reportCount: number;
        lastUpdated: Date;
        loadTime?: number | undefined;
        errorRate?: number | undefined;
        lastReported?: Date | undefined;
    };
    name: string;
    description: string;
    category: "custom" | "productivity" | "social" | "academic" | "creative" | "utility" | "game" | "communication" | "organization" | "wellness";
    createdBy: string;
    permissions: {
        userId: string;
        role: "owner" | "collaborator" | "viewer";
        permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt: Date;
        grantedBy: string;
    }[];
    visibility: "public" | "space_only" | "private" | "members_only";
    config: {
        width: number;
        height: number;
        allowFullscreen: boolean;
        autoRefresh: boolean;
        requiresAuth: boolean;
        allowGuests: boolean;
        collectUsage: boolean;
        collectFeedback: boolean;
        refreshInterval?: number | undefined;
        customCSS?: string | undefined;
        customJS?: string | undefined;
    };
    ownedBy: string;
    collaborators: string[];
    spaceId?: string | undefined;
    thumbnailUrl?: string | undefined;
    iconUrl?: string | undefined;
    publishedAt?: Date | undefined;
}, {
    id: string;
    type: "custom" | "iframe_embed" | "web_app" | "widget" | "form" | "calculator" | "poll" | "quiz" | "timer" | "counter" | "link_collection";
    status: "draft" | "testing" | "published" | "archived" | "flagged";
    content: {
        type: "iframe";
        url: string;
        allowedDomains?: string[] | undefined;
    } | {
        type: "html";
        html: string;
        css?: string | undefined;
        js?: string | undefined;
    } | {
        type: "widget";
        widgetType: string;
        config: Record<string, any>;
    };
    createdAt: Date;
    updatedAt: Date;
    metadata: {
        lastUpdated: Date;
        likes?: number | undefined;
        comments?: number | undefined;
        loadTime?: number | undefined;
        errorRate?: number | undefined;
        totalViews?: number | undefined;
        uniqueUsers?: number | undefined;
        avgSessionTime?: number | undefined;
        shares?: number | undefined;
        rating?: number | undefined;
        ratingCount?: number | undefined;
        reportCount?: number | undefined;
        lastReported?: Date | undefined;
    };
    name: string;
    description: string;
    category: "custom" | "productivity" | "social" | "academic" | "creative" | "utility" | "game" | "communication" | "organization" | "wellness";
    createdBy: string;
    visibility: "public" | "space_only" | "private" | "members_only";
    config: {
        width?: number | undefined;
        height?: number | undefined;
        allowFullscreen?: boolean | undefined;
        autoRefresh?: boolean | undefined;
        refreshInterval?: number | undefined;
        requiresAuth?: boolean | undefined;
        allowGuests?: boolean | undefined;
        customCSS?: string | undefined;
        customJS?: string | undefined;
        collectUsage?: boolean | undefined;
        collectFeedback?: boolean | undefined;
    };
    ownedBy: string;
    tags?: string[] | undefined;
    spaceId?: string | undefined;
    permissions?: {
        userId: string;
        role: "owner" | "collaborator" | "viewer";
        permissions: ("view" | "edit" | "delete" | "share" | "manage_permissions" | "view_analytics")[];
        grantedAt: Date;
        grantedBy: string;
    }[] | undefined;
    thumbnailUrl?: string | undefined;
    iconUrl?: string | undefined;
    collaborators?: string[] | undefined;
    publishedAt?: Date | undefined;
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
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }, {
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }>, "many">>;
    referrer: z.ZodOptional<z.ZodString>;
    platform: z.ZodOptional<z.ZodEnum<["web", "mobile", "desktop"]>>;
    completed: z.ZodDefault<z.ZodBoolean>;
    shared: z.ZodDefault<z.ZodBoolean>;
    liked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    createdAt: Date;
    sessionId: string;
    toolId: string;
    startTime: Date;
    clicks: number;
    scrolls: number;
    interactions: {
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }[];
    completed: boolean;
    shared: boolean;
    liked: boolean;
    platform?: "web" | "mobile" | "desktop" | undefined;
    referrer?: string | undefined;
    endTime?: Date | undefined;
    duration?: number | undefined;
}, {
    userId: string;
    createdAt: Date;
    sessionId: string;
    toolId: string;
    startTime: Date;
    platform?: "web" | "mobile" | "desktop" | undefined;
    referrer?: string | undefined;
    endTime?: Date | undefined;
    duration?: number | undefined;
    clicks?: number | undefined;
    scrolls?: number | undefined;
    interactions?: {
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }[] | undefined;
    completed?: boolean | undefined;
    shared?: boolean | undefined;
    liked?: boolean | undefined;
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
    userId: string;
    createdAt: Date;
    rating: number;
    toolId: string;
    categories: ("content" | "usability" | "design" | "functionality" | "performance" | "accessibility" | "other")[];
    suggestions: string[];
    helpful: boolean;
    verified: boolean;
    comment?: string | undefined;
}, {
    userId: string;
    createdAt: Date;
    rating: number;
    toolId: string;
    comment?: string | undefined;
    categories?: ("content" | "usability" | "design" | "functionality" | "performance" | "accessibility" | "other")[] | undefined;
    suggestions?: string[] | undefined;
    helpful?: boolean | undefined;
    verified?: boolean | undefined;
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
        html: string;
        css?: string | undefined;
        js?: string | undefined;
        config?: Record<string, any> | undefined;
    }, {
        html: string;
        css?: string | undefined;
        js?: string | undefined;
        config?: Record<string, any> | undefined;
    }>;
    customizableFields: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["text", "number", "color", "url", "select", "boolean"]>;
        default: z.ZodOptional<z.ZodAny>;
        options: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        required: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "number" | "boolean" | "url" | "text" | "color" | "select";
        name: string;
        required: boolean;
        options?: any[] | undefined;
        default?: any;
    }, {
        type: "number" | "boolean" | "url" | "text" | "color" | "select";
        name: string;
        options?: any[] | undefined;
        default?: any;
        required?: boolean | undefined;
    }>, "many">>;
    usageCount: z.ZodDefault<z.ZodNumber>;
    createdBy: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "custom" | "iframe_embed" | "web_app" | "widget" | "form" | "calculator" | "poll" | "quiz" | "timer" | "counter" | "link_collection";
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    category: "custom" | "productivity" | "social" | "academic" | "creative" | "utility" | "game" | "communication" | "organization" | "wellness";
    createdBy: string;
    template: {
        html: string;
        css?: string | undefined;
        js?: string | undefined;
        config?: Record<string, any> | undefined;
    };
    customizableFields: {
        type: "number" | "boolean" | "url" | "text" | "color" | "select";
        name: string;
        required: boolean;
        options?: any[] | undefined;
        default?: any;
    }[];
    usageCount: number;
}, {
    id: string;
    type: "custom" | "iframe_embed" | "web_app" | "widget" | "form" | "calculator" | "poll" | "quiz" | "timer" | "counter" | "link_collection";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    category: "custom" | "productivity" | "social" | "academic" | "creative" | "utility" | "game" | "communication" | "organization" | "wellness";
    createdBy: string;
    template: {
        html: string;
        css?: string | undefined;
        js?: string | undefined;
        config?: Record<string, any> | undefined;
    };
    tags?: string[] | undefined;
    customizableFields?: {
        type: "number" | "boolean" | "url" | "text" | "color" | "select";
        name: string;
        options?: any[] | undefined;
        default?: any;
        required?: boolean | undefined;
    }[] | undefined;
    usageCount?: number | undefined;
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
//# sourceMappingURL=tool.schema.d.ts.map