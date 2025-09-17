import { z } from "zod";
import { type ElementInstance } from "./element";
export declare const ToolStatus: z.ZodEnum<["draft", "preview", "published"]>;
export type ToolStatus = z.infer<typeof ToolStatus>;
export declare const ToolPermission: z.ZodEnum<["view", "comment", "edit"]>;
export type ToolPermission = z.infer<typeof ToolPermission>;
export declare const ToolCollaboratorSchema: z.ZodObject<{
    userId: z.ZodString;
    permission: z.ZodEnum<["view", "comment", "edit"]>;
    addedAt: z.ZodDate;
    addedBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    permission: "view" | "comment" | "edit";
    addedAt: Date;
    addedBy: string;
}, {
    userId: string;
    permission: "view" | "comment" | "edit";
    addedAt: Date;
    addedBy: string;
}>;
export declare const ToolMetadataSchema: z.ZodObject<{
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
    estimatedTime: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    language: string;
    tags?: string[] | undefined;
    category?: string | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    estimatedTime?: number | undefined;
}, {
    tags?: string[] | undefined;
    category?: string | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    estimatedTime?: number | undefined;
    language?: string | undefined;
}>;
export declare const ToolDataSchemaSchema: z.ZodObject<{
    fields: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["string", "number", "boolean", "date", "array", "object"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        validation: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            pattern: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        }, {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required: boolean;
        name: string;
        validation?: {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        } | undefined;
    }, {
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        name: string;
        validation?: {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        } | undefined;
        required?: boolean | undefined;
    }>, "many">;
    maxRecords: z.ZodDefault<z.ZodNumber>;
    allowAnonymous: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fields: {
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required: boolean;
        name: string;
        validation?: {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        } | undefined;
    }[];
    maxRecords: number;
    allowAnonymous: boolean;
}, {
    fields: {
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        name: string;
        validation?: {
            pattern?: string | undefined;
            max?: number | undefined;
            min?: number | undefined;
            enum?: string[] | undefined;
        } | undefined;
        required?: boolean | undefined;
    }[];
    maxRecords?: number | undefined;
    allowAnonymous?: boolean | undefined;
}>;
export declare const ToolConfigSchema: z.ZodObject<{
    theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
    primaryColor: z.ZodDefault<z.ZodString>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    allowMultipleSubmissions: z.ZodDefault<z.ZodBoolean>;
    requireAuthentication: z.ZodDefault<z.ZodBoolean>;
    showProgressBar: z.ZodDefault<z.ZodBoolean>;
    autoSave: z.ZodDefault<z.ZodBoolean>;
    dataSchema: z.ZodOptional<z.ZodObject<{
        fields: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["string", "number", "boolean", "date", "array", "object"]>;
            required: z.ZodDefault<z.ZodBoolean>;
            validation: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                pattern: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            }, {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }, {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
            required?: boolean | undefined;
        }>, "many">;
        maxRecords: z.ZodDefault<z.ZodNumber>;
        allowAnonymous: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fields: {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }[];
        maxRecords: number;
        allowAnonymous: boolean;
    }, {
        fields: {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
            required?: boolean | undefined;
        }[];
        maxRecords?: number | undefined;
        allowAnonymous?: boolean | undefined;
    }>>;
    dataRetentionDays: z.ZodDefault<z.ZodNumber>;
    notifyOnSubmission: z.ZodDefault<z.ZodBoolean>;
    notificationEmail: z.ZodOptional<z.ZodString>;
    trackingEnabled: z.ZodDefault<z.ZodBoolean>;
    allowAnalyticsOptOut: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    backgroundColor: string;
    theme: "auto" | "light" | "dark";
    primaryColor: string;
    allowMultipleSubmissions: boolean;
    requireAuthentication: boolean;
    showProgressBar: boolean;
    autoSave: boolean;
    dataRetentionDays: number;
    notifyOnSubmission: boolean;
    trackingEnabled: boolean;
    allowAnalyticsOptOut: boolean;
    dataSchema?: {
        fields: {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }[];
        maxRecords: number;
        allowAnonymous: boolean;
    } | undefined;
    notificationEmail?: string | undefined;
}, {
    backgroundColor?: string | undefined;
    theme?: "auto" | "light" | "dark" | undefined;
    primaryColor?: string | undefined;
    allowMultipleSubmissions?: boolean | undefined;
    requireAuthentication?: boolean | undefined;
    showProgressBar?: boolean | undefined;
    autoSave?: boolean | undefined;
    dataSchema?: {
        fields: {
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            name: string;
            validation?: {
                pattern?: string | undefined;
                max?: number | undefined;
                min?: number | undefined;
                enum?: string[] | undefined;
            } | undefined;
            required?: boolean | undefined;
        }[];
        maxRecords?: number | undefined;
        allowAnonymous?: boolean | undefined;
    } | undefined;
    dataRetentionDays?: number | undefined;
    notifyOnSubmission?: boolean | undefined;
    notificationEmail?: string | undefined;
    trackingEnabled?: boolean | undefined;
    allowAnalyticsOptOut?: boolean | undefined;
}>;
export declare const ToolVersionSchema: z.ZodObject<{
    version: z.ZodString;
    changelog: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    createdBy: z.ZodString;
    isStable: z.ZodDefault<z.ZodBoolean>;
    deprecatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    version: string;
    createdAt: Date;
    createdBy: string;
    isStable: boolean;
    changelog?: string | undefined;
    deprecatedAt?: Date | undefined;
}, {
    version: string;
    createdAt: Date;
    createdBy: string;
    changelog?: string | undefined;
    isStable?: boolean | undefined;
    deprecatedAt?: Date | undefined;
}>;
export declare const ToolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    ownerId: z.ZodString;
    collaborators: z.ZodDefault<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        permission: z.ZodEnum<["view", "comment", "edit"]>;
        addedAt: z.ZodDate;
        addedBy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        permission: "view" | "comment" | "edit";
        addedAt: Date;
        addedBy: string;
    }, {
        userId: string;
        permission: "view" | "comment" | "edit";
        addedAt: Date;
        addedBy: string;
    }>, "many">>;
    status: z.ZodDefault<z.ZodEnum<["draft", "preview", "published"]>>;
    currentVersion: z.ZodDefault<z.ZodString>;
    versions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        version: z.ZodString;
        changelog: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodDate;
        createdBy: z.ZodString;
        isStable: z.ZodDefault<z.ZodBoolean>;
        deprecatedAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        createdAt: Date;
        createdBy: string;
        isStable: boolean;
        changelog?: string | undefined;
        deprecatedAt?: Date | undefined;
    }, {
        version: string;
        createdAt: Date;
        createdBy: string;
        changelog?: string | undefined;
        isStable?: boolean | undefined;
        deprecatedAt?: Date | undefined;
    }>, "many">>;
    elements: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        elementId: z.ZodString;
        config: z.ZodUnknown;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        }, {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        isVisible: boolean;
        isLocked: boolean;
        config?: unknown;
        parentId?: string | undefined;
    }, {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        config?: unknown;
        parentId?: string | undefined;
        isVisible?: boolean | undefined;
        isLocked?: boolean | undefined;
    }>, "many">;
    config: z.ZodDefault<z.ZodObject<{
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
        primaryColor: z.ZodDefault<z.ZodString>;
        backgroundColor: z.ZodDefault<z.ZodString>;
        allowMultipleSubmissions: z.ZodDefault<z.ZodBoolean>;
        requireAuthentication: z.ZodDefault<z.ZodBoolean>;
        showProgressBar: z.ZodDefault<z.ZodBoolean>;
        autoSave: z.ZodDefault<z.ZodBoolean>;
        dataSchema: z.ZodOptional<z.ZodObject<{
            fields: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["string", "number", "boolean", "date", "array", "object"]>;
                required: z.ZodDefault<z.ZodBoolean>;
                validation: z.ZodOptional<z.ZodObject<{
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    pattern: z.ZodOptional<z.ZodString>;
                    enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        }>>;
        dataRetentionDays: z.ZodDefault<z.ZodNumber>;
        notifyOnSubmission: z.ZodDefault<z.ZodBoolean>;
        notificationEmail: z.ZodOptional<z.ZodString>;
        trackingEnabled: z.ZodDefault<z.ZodBoolean>;
        allowAnalyticsOptOut: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor: string;
        theme: "auto" | "light" | "dark";
        primaryColor: string;
        allowMultipleSubmissions: boolean;
        requireAuthentication: boolean;
        showProgressBar: boolean;
        autoSave: boolean;
        dataRetentionDays: number;
        notifyOnSubmission: boolean;
        trackingEnabled: boolean;
        allowAnalyticsOptOut: boolean;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        notificationEmail?: string | undefined;
    }, {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    }>>;
    metadata: z.ZodDefault<z.ZodObject<{
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        category: z.ZodOptional<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        language: string;
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    }>>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    shareToken: z.ZodOptional<z.ZodString>;
    forkCount: z.ZodDefault<z.ZodNumber>;
    originalToolId: z.ZodOptional<z.ZodString>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    useCount: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodOptional<z.ZodNumber>;
    ratingCount: z.ZodDefault<z.ZodNumber>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
    lastUsedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "draft" | "preview" | "published";
    config: {
        backgroundColor: string;
        theme: "auto" | "light" | "dark";
        primaryColor: string;
        allowMultipleSubmissions: boolean;
        requireAuthentication: boolean;
        showProgressBar: boolean;
        autoSave: boolean;
        dataRetentionDays: number;
        notifyOnSubmission: boolean;
        trackingEnabled: boolean;
        allowAnalyticsOptOut: boolean;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        notificationEmail?: string | undefined;
    };
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    collaborators: {
        userId: string;
        permission: "view" | "comment" | "edit";
        addedAt: Date;
        addedBy: string;
    }[];
    currentVersion: string;
    versions: {
        version: string;
        createdAt: Date;
        createdBy: string;
        isStable: boolean;
        changelog?: string | undefined;
        deprecatedAt?: Date | undefined;
    }[];
    elements: {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        isVisible: boolean;
        isLocked: boolean;
        config?: unknown;
        parentId?: string | undefined;
    }[];
    metadata: {
        language: string;
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
    };
    isPublic: boolean;
    forkCount: number;
    viewCount: number;
    useCount: number;
    ratingCount: number;
    isSpaceTool: boolean;
    shareToken?: string | undefined;
    originalToolId?: string | undefined;
    rating?: number | undefined;
    spaceId?: string | undefined;
    publishedAt?: Date | undefined;
    lastUsedAt?: Date | undefined;
}, {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    elements: {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        config?: unknown;
        parentId?: string | undefined;
        isVisible?: boolean | undefined;
        isLocked?: boolean | undefined;
    }[];
    status?: "draft" | "preview" | "published" | undefined;
    config?: {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    } | undefined;
    collaborators?: {
        userId: string;
        permission: "view" | "comment" | "edit";
        addedAt: Date;
        addedBy: string;
    }[] | undefined;
    currentVersion?: string | undefined;
    versions?: {
        version: string;
        createdAt: Date;
        createdBy: string;
        changelog?: string | undefined;
        isStable?: boolean | undefined;
        deprecatedAt?: Date | undefined;
    }[] | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    } | undefined;
    isPublic?: boolean | undefined;
    shareToken?: string | undefined;
    forkCount?: number | undefined;
    originalToolId?: string | undefined;
    viewCount?: number | undefined;
    useCount?: number | undefined;
    rating?: number | undefined;
    ratingCount?: number | undefined;
    spaceId?: string | undefined;
    isSpaceTool?: boolean | undefined;
    publishedAt?: Date | undefined;
    lastUsedAt?: Date | undefined;
}>;
export type Tool = z.infer<typeof ToolSchema>;
export type ToolCollaborator = z.infer<typeof ToolCollaboratorSchema>;
export type ToolMetadata = z.infer<typeof ToolMetadataSchema>;
export type ToolConfig = z.infer<typeof ToolConfigSchema>;
export type ToolVersion = z.infer<typeof ToolVersionSchema>;
export declare const CreateToolSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodDefault<z.ZodBoolean>;
    config: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
        primaryColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        backgroundColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        allowMultipleSubmissions: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        requireAuthentication: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        showProgressBar: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        dataSchema: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            fields: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["string", "number", "boolean", "date", "array", "object"]>;
                required: z.ZodDefault<z.ZodBoolean>;
                validation: z.ZodOptional<z.ZodObject<{
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    pattern: z.ZodOptional<z.ZodString>;
                    enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        }>>>;
        dataRetentionDays: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        notifyOnSubmission: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        notificationEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        trackingEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        allowAnalyticsOptOut: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    }, {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>>;
        estimatedTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    isSpaceTool: boolean;
    config?: {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    } | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    } | undefined;
    spaceId?: string | undefined;
}, {
    name: string;
    description: string;
    config?: {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    } | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    } | undefined;
    spaceId?: string | undefined;
    isSpaceTool?: boolean | undefined;
}>;
export type CreateTool = z.infer<typeof CreateToolSchema>;
export declare const UpdateToolSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    elements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        elementId: z.ZodString;
        config: z.ZodUnknown;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodOptional<z.ZodNumber>;
            height: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        }, {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        isVisible: boolean;
        isLocked: boolean;
        config?: unknown;
        parentId?: string | undefined;
    }, {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        config?: unknown;
        parentId?: string | undefined;
        isVisible?: boolean | undefined;
        isLocked?: boolean | undefined;
    }>, "many">>;
    config: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
        primaryColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        backgroundColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        allowMultipleSubmissions: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        requireAuthentication: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        showProgressBar: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        dataSchema: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            fields: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodEnum<["string", "number", "boolean", "date", "array", "object"]>;
                required: z.ZodDefault<z.ZodBoolean>;
                validation: z.ZodOptional<z.ZodObject<{
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    pattern: z.ZodOptional<z.ZodString>;
                    enum: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }, {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        }>>>;
        dataRetentionDays: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        notifyOnSubmission: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        notificationEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        trackingEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        allowAnalyticsOptOut: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    }, {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>>;
        estimatedTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    }, {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    }>>;
    changelog: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    config?: {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    } | undefined;
    name?: string | undefined;
    description?: string | undefined;
    changelog?: string | undefined;
    elements?: {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        isVisible: boolean;
        isLocked: boolean;
        config?: unknown;
        parentId?: string | undefined;
    }[] | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    } | undefined;
}, {
    config?: {
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        autoSave?: boolean | undefined;
        dataSchema?: {
            fields: {
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                name: string;
                validation?: {
                    pattern?: string | undefined;
                    max?: number | undefined;
                    min?: number | undefined;
                    enum?: string[] | undefined;
                } | undefined;
                required?: boolean | undefined;
            }[];
            maxRecords?: number | undefined;
            allowAnonymous?: boolean | undefined;
        } | undefined;
        dataRetentionDays?: number | undefined;
        notifyOnSubmission?: boolean | undefined;
        notificationEmail?: string | undefined;
        trackingEnabled?: boolean | undefined;
        allowAnalyticsOptOut?: boolean | undefined;
    } | undefined;
    name?: string | undefined;
    description?: string | undefined;
    changelog?: string | undefined;
    elements?: {
        id: string;
        elementId: string;
        position: {
            x: number;
            y: number;
            width?: number | undefined;
            height?: number | undefined;
        };
        order: number;
        config?: unknown;
        parentId?: string | undefined;
        isVisible?: boolean | undefined;
        isLocked?: boolean | undefined;
    }[] | undefined;
    metadata?: {
        tags?: string[] | undefined;
        category?: string | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
        estimatedTime?: number | undefined;
        language?: string | undefined;
    } | undefined;
}>;
export type UpdateTool = z.infer<typeof UpdateToolSchema>;
export declare const ShareToolSchema: z.ZodObject<{
    permission: z.ZodDefault<z.ZodEnum<["view", "comment", "edit"]>>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    permission: "view" | "comment" | "edit";
    requiresApproval: boolean;
    expiresAt?: Date | undefined;
}, {
    expiresAt?: Date | undefined;
    permission?: "view" | "comment" | "edit" | undefined;
    requiresApproval?: boolean | undefined;
}>;
export type ShareTool = z.infer<typeof ShareToolSchema>;
export declare const ToolDataRecordSchema: z.ZodObject<{
    id: z.ZodString;
    toolId: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    submittedBy: z.ZodOptional<z.ZodString>;
    submittedAt: z.ZodDate;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    isAnonymous: z.ZodDefault<z.ZodBoolean>;
    isValid: z.ZodDefault<z.ZodBoolean>;
    validationErrors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    deviceType: z.ZodOptional<z.ZodEnum<["desktop", "tablet", "mobile"]>>;
    referrer: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    data: Record<string, unknown>;
    toolId: string;
    submittedAt: Date;
    isAnonymous: boolean;
    isValid: boolean;
    submittedBy?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    sessionId?: string | undefined;
    validationErrors?: string[] | undefined;
    completionTime?: number | undefined;
    deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    referrer?: string | undefined;
}, {
    id: string;
    data: Record<string, unknown>;
    toolId: string;
    submittedAt: Date;
    submittedBy?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    sessionId?: string | undefined;
    isAnonymous?: boolean | undefined;
    isValid?: boolean | undefined;
    validationErrors?: string[] | undefined;
    completionTime?: number | undefined;
    deviceType?: "desktop" | "tablet" | "mobile" | undefined;
    referrer?: string | undefined;
}>;
export type ToolDataRecord = z.infer<typeof ToolDataRecordSchema>;
export declare const ToolUsageEventSchema: z.ZodObject<{
    id: z.ZodString;
    toolId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    eventType: z.ZodEnum<["view", "start", "complete", "abandon", "share", "fork"]>;
    timestamp: z.ZodDate;
    sessionId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    timestamp: Date;
    toolId: string;
    sessionId: string;
    eventType: "start" | "view" | "complete" | "abandon" | "share" | "fork";
    userId?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    id: string;
    timestamp: Date;
    toolId: string;
    sessionId: string;
    eventType: "start" | "view" | "complete" | "abandon" | "share" | "fork";
    userId?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type ToolUsageEvent = z.infer<typeof ToolUsageEventSchema>;
export declare const createToolDefaults: (ownerId: string, data: CreateTool) => Omit<Tool, "id" | "createdAt" | "updatedAt">;
export declare const generateShareToken: () => string;
export declare const canUserEditTool: (tool: Tool, userId: string) => boolean;
export declare const canUserViewTool: (tool: Tool, userId: string) => boolean;
export declare const getNextVersion: (currentVersion: string, changeType: "major" | "minor" | "patch") => string;
export declare const determineChangeType: (oldElements: ElementInstance[], newElements: ElementInstance[]) => "major" | "minor" | "patch";
export declare const validateToolStructure: (elements: ElementInstance[]) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=tool.d.ts.map