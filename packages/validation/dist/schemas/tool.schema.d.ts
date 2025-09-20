import { z } from "zod";
export declare const ToolCategorySchema: z.ZodEnum<["productivity", "social", "academic", "creative", "utility", "game", "communication", "organization", "wellness", "custom"]>;
export declare const ToolTypeSchema: z.ZodEnum<["iframe_embed", "web_app", "widget", "form", "calculator", "poll", "quiz", "timer", "counter", "link_collection", "custom"]>;
export declare const ToolStatusSchema: z.ZodEnum<["draft", "testing", "published", "archived", "flagged"]>;
export declare const ToolVisibilitySchema: z.ZodEnum<["public", "space_only", "private", "members_only"]>;
export declare const ToolConfigSchema: z.ZodObject<{
    allowFullscreen: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    allowFullscreen: boolean;
}, {
    allowFullscreen?: boolean | undefined;
}>;
export declare const ToolMetadataSchema: z.ZodObject<{
    avgSessionTime: z.ZodDefault<z.ZodNumber>;
    comments: z.ZodDefault<z.ZodNumber>;
    lastUpdated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    comments: number;
    avgSessionTime: number;
    lastUpdated: Date;
}, {
    lastUpdated: Date;
    comments?: number | undefined;
    avgSessionTime?: number | undefined;
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
export declare const ToolSchema: z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export declare const ToolUsageSchema: z.ZodObject<{
    toolId: z.ZodString;
    userId: z.ZodString;
    sessionId: z.ZodString;
    duration: z.ZodOptional<z.ZodNumber>;
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
    liked: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    userId: string;
    createdAt: Date;
    sessionId: string;
    toolId: string;
    interactions: {
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }[];
    liked: boolean;
    duration?: number | undefined;
}, {
    userId: string;
    createdAt: Date;
    sessionId: string;
    toolId: string;
    duration?: number | undefined;
    interactions?: {
        type: string;
        timestamp: Date;
        data?: Record<string, any> | undefined;
    }[] | undefined;
    liked?: boolean | undefined;
}>;
export declare const ToolFeedbackSchema: z.ZodObject<{
    toolId: z.ZodString;
    userId: z.ZodString;
    usability: any;
    design: any;
    functionality: any;
    performance: any;
    content: any;
    accessibility: any;
    other: any;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    toolId?: unknown;
    userId?: unknown;
    usability?: unknown;
    design?: unknown;
    functionality?: unknown;
    performance?: unknown;
    content?: unknown;
    accessibility?: unknown;
    other?: unknown;
}, {
    [x: string]: any;
    toolId?: unknown;
    userId?: unknown;
    usability?: unknown;
    design?: unknown;
    functionality?: unknown;
    performance?: unknown;
    content?: unknown;
    accessibility?: unknown;
    other?: unknown;
}>;
export declare const ToolTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    html: z.ZodString;
    css: z.ZodOptional<z.ZodString>;
    js: z.ZodOptional<z.ZodString>;
    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    tags: string[];
    html: string;
    css?: string | undefined;
    js?: string | undefined;
    config?: Record<string, any> | undefined;
}, {
    id: string;
    html: string;
    tags?: string[] | undefined;
    css?: string | undefined;
    js?: string | undefined;
    config?: Record<string, any> | undefined;
}>, name: z.string;
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