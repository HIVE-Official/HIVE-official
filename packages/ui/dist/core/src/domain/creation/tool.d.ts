import { z } from 'zod';
import { type ElementInstance } from './element';
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
    permission: "view" | "edit" | "comment";
    userId: string;
    addedAt: Date;
    addedBy: string;
}, {
    permission: "view" | "edit" | "comment";
    userId: string;
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
    category?: string | undefined;
    tags?: string[] | undefined;
    estimatedTime?: number | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
}, {
    language?: string | undefined;
    category?: string | undefined;
    tags?: string[] | undefined;
    estimatedTime?: number | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
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
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        }, {
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required: boolean;
        validation?: {
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        } | undefined;
    }, {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean | undefined;
        validation?: {
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        } | undefined;
    }>, "many">;
    maxRecords: z.ZodDefault<z.ZodNumber>;
    allowAnonymous: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fields: {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required: boolean;
        validation?: {
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        } | undefined;
    }[];
    maxRecords: number;
    allowAnonymous: boolean;
}, {
    fields: {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean | undefined;
        validation?: {
            max?: number | undefined;
            min?: number | undefined;
            pattern?: string | undefined;
            enum?: string[] | undefined;
        } | undefined;
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
    enableRealTimeUpdates: z.ZodDefault<z.ZodBoolean>;
    maxResponseLength: z.ZodDefault<z.ZodNumber>;
    customCSS: z.ZodDefault<z.ZodString>;
    headerText: z.ZodDefault<z.ZodString>;
    footerText: z.ZodDefault<z.ZodString>;
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
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            }, {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }, {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean | undefined;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }>, "many">;
        maxRecords: z.ZodDefault<z.ZodNumber>;
        allowAnonymous: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fields: {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }[];
        maxRecords: number;
        allowAnonymous: boolean;
    }, {
        fields: {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean | undefined;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
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
    autoSave: boolean;
    backgroundColor: string;
    theme: "auto" | "light" | "dark";
    primaryColor: string;
    allowMultipleSubmissions: boolean;
    requireAuthentication: boolean;
    showProgressBar: boolean;
    enableRealTimeUpdates: boolean;
    maxResponseLength: number;
    customCSS: string;
    headerText: string;
    footerText: string;
    dataRetentionDays: number;
    notifyOnSubmission: boolean;
    trackingEnabled: boolean;
    allowAnalyticsOptOut: boolean;
    dataSchema?: {
        fields: {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required: boolean;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
        }[];
        maxRecords: number;
        allowAnonymous: boolean;
    } | undefined;
    notificationEmail?: string | undefined;
}, {
    autoSave?: boolean | undefined;
    backgroundColor?: string | undefined;
    theme?: "auto" | "light" | "dark" | undefined;
    primaryColor?: string | undefined;
    allowMultipleSubmissions?: boolean | undefined;
    requireAuthentication?: boolean | undefined;
    showProgressBar?: boolean | undefined;
    enableRealTimeUpdates?: boolean | undefined;
    maxResponseLength?: number | undefined;
    customCSS?: string | undefined;
    headerText?: string | undefined;
    footerText?: string | undefined;
    dataSchema?: {
        fields: {
            name: string;
            type: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean | undefined;
            validation?: {
                max?: number | undefined;
                min?: number | undefined;
                pattern?: string | undefined;
                enum?: string[] | undefined;
            } | undefined;
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
        permission: "view" | "edit" | "comment";
        userId: string;
        addedAt: Date;
        addedBy: string;
    }, {
        permission: "view" | "edit" | "comment";
        userId: string;
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
            height?: number | undefined;
            width?: number | undefined;
        }, {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        isLocked: boolean;
        isVisible: boolean;
        elementId: string;
        config?: unknown;
        parentId?: string | undefined;
    }, {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        elementId: string;
        isLocked?: boolean | undefined;
        isVisible?: boolean | undefined;
        config?: unknown;
        parentId?: string | undefined;
    }>, "many">;
    config: z.ZodDefault<z.ZodObject<{
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
        primaryColor: z.ZodDefault<z.ZodString>;
        backgroundColor: z.ZodDefault<z.ZodString>;
        allowMultipleSubmissions: z.ZodDefault<z.ZodBoolean>;
        requireAuthentication: z.ZodDefault<z.ZodBoolean>;
        showProgressBar: z.ZodDefault<z.ZodBoolean>;
        autoSave: z.ZodDefault<z.ZodBoolean>;
        enableRealTimeUpdates: z.ZodDefault<z.ZodBoolean>;
        maxResponseLength: z.ZodDefault<z.ZodNumber>;
        customCSS: z.ZodDefault<z.ZodString>;
        headerText: z.ZodDefault<z.ZodString>;
        footerText: z.ZodDefault<z.ZodString>;
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
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }, {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        autoSave: boolean;
        backgroundColor: string;
        theme: "auto" | "light" | "dark";
        primaryColor: string;
        allowMultipleSubmissions: boolean;
        requireAuthentication: boolean;
        showProgressBar: boolean;
        enableRealTimeUpdates: boolean;
        maxResponseLength: number;
        customCSS: string;
        headerText: string;
        footerText: string;
        dataRetentionDays: number;
        notifyOnSubmission: boolean;
        trackingEnabled: boolean;
        allowAnalyticsOptOut: boolean;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        notificationEmail?: string | undefined;
    }, {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    }, {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
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
    name: string;
    status: "draft" | "published" | "preview";
    description: string;
    metadata: {
        language: string;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    };
    config: {
        autoSave: boolean;
        backgroundColor: string;
        theme: "auto" | "light" | "dark";
        primaryColor: string;
        allowMultipleSubmissions: boolean;
        requireAuthentication: boolean;
        showProgressBar: boolean;
        enableRealTimeUpdates: boolean;
        maxResponseLength: number;
        customCSS: string;
        headerText: string;
        footerText: string;
        dataRetentionDays: number;
        notifyOnSubmission: boolean;
        trackingEnabled: boolean;
        allowAnalyticsOptOut: boolean;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        } | undefined;
        notificationEmail?: string | undefined;
    };
    collaborators: {
        permission: "view" | "edit" | "comment";
        userId: string;
        addedAt: Date;
        addedBy: string;
    }[];
    ratingCount: number;
    elements: {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        isLocked: boolean;
        isVisible: boolean;
        elementId: string;
        config?: unknown;
        parentId?: string | undefined;
    }[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    currentVersion: string;
    versions: {
        version: string;
        createdAt: Date;
        createdBy: string;
        isStable: boolean;
        changelog?: string | undefined;
        deprecatedAt?: Date | undefined;
    }[];
    forkCount: number;
    viewCount: number;
    useCount: number;
    isSpaceTool: boolean;
    spaceId?: string | undefined;
    rating?: number | undefined;
    shareToken?: string | undefined;
    originalToolId?: string | undefined;
    publishedAt?: Date | undefined;
    lastUsedAt?: Date | undefined;
}, {
    id: string;
    name: string;
    description: string;
    elements: {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        elementId: string;
        isLocked?: boolean | undefined;
        isVisible?: boolean | undefined;
        config?: unknown;
        parentId?: string | undefined;
    }[];
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    status?: "draft" | "published" | "preview" | undefined;
    metadata?: {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    } | undefined;
    spaceId?: string | undefined;
    config?: {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        permission: "view" | "edit" | "comment";
        userId: string;
        addedAt: Date;
        addedBy: string;
    }[] | undefined;
    rating?: number | undefined;
    ratingCount?: number | undefined;
    isPublic?: boolean | undefined;
    currentVersion?: string | undefined;
    versions?: {
        version: string;
        createdAt: Date;
        createdBy: string;
        changelog?: string | undefined;
        isStable?: boolean | undefined;
        deprecatedAt?: Date | undefined;
    }[] | undefined;
    shareToken?: string | undefined;
    forkCount?: number | undefined;
    originalToolId?: string | undefined;
    viewCount?: number | undefined;
    useCount?: number | undefined;
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
        enableRealTimeUpdates: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        maxResponseLength: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        customCSS: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        headerText: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        footerText: z.ZodOptional<z.ZodDefault<z.ZodString>>;
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
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }, {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
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
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    }, {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    isSpaceTool: boolean;
    metadata?: {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    } | undefined;
    spaceId?: string | undefined;
    config?: {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
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
}, {
    name: string;
    description: string;
    metadata?: {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    } | undefined;
    spaceId?: string | undefined;
    config?: {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
            height?: number | undefined;
            width?: number | undefined;
        }, {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        isLocked: boolean;
        isVisible: boolean;
        elementId: string;
        config?: unknown;
        parentId?: string | undefined;
    }, {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        elementId: string;
        isLocked?: boolean | undefined;
        isVisible?: boolean | undefined;
        config?: unknown;
        parentId?: string | undefined;
    }>, "many">>;
    config: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
        primaryColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        backgroundColor: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        allowMultipleSubmissions: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        requireAuthentication: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        showProgressBar: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        enableRealTimeUpdates: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        maxResponseLength: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        customCSS: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        headerText: z.ZodOptional<z.ZodDefault<z.ZodString>>;
        footerText: z.ZodOptional<z.ZodDefault<z.ZodString>>;
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
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }, {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }, {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
            }[];
            maxRecords: number;
            allowAnonymous: boolean;
        }, {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
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
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    }, {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    }>>;
    changelog: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    metadata?: {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    } | undefined;
    config?: {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required: boolean;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
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
    elements?: {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        isLocked: boolean;
        isVisible: boolean;
        elementId: string;
        config?: unknown;
        parentId?: string | undefined;
    }[] | undefined;
    changelog?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    metadata?: {
        language?: string | undefined;
        category?: string | undefined;
        tags?: string[] | undefined;
        estimatedTime?: number | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | undefined;
    } | undefined;
    config?: {
        autoSave?: boolean | undefined;
        backgroundColor?: string | undefined;
        theme?: "auto" | "light" | "dark" | undefined;
        primaryColor?: string | undefined;
        allowMultipleSubmissions?: boolean | undefined;
        requireAuthentication?: boolean | undefined;
        showProgressBar?: boolean | undefined;
        enableRealTimeUpdates?: boolean | undefined;
        maxResponseLength?: number | undefined;
        customCSS?: string | undefined;
        headerText?: string | undefined;
        footerText?: string | undefined;
        dataSchema?: {
            fields: {
                name: string;
                type: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean | undefined;
                validation?: {
                    max?: number | undefined;
                    min?: number | undefined;
                    pattern?: string | undefined;
                    enum?: string[] | undefined;
                } | undefined;
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
    elements?: {
        id: string;
        order: number;
        position: {
            x: number;
            y: number;
            height?: number | undefined;
            width?: number | undefined;
        };
        elementId: string;
        isLocked?: boolean | undefined;
        isVisible?: boolean | undefined;
        config?: unknown;
        parentId?: string | undefined;
    }[] | undefined;
    changelog?: string | undefined;
}>;
export type UpdateTool = z.infer<typeof UpdateToolSchema>;
export declare const ShareToolSchema: z.ZodObject<{
    permission: z.ZodDefault<z.ZodEnum<["view", "comment", "edit"]>>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    permission: "view" | "edit" | "comment";
    requiresApproval: boolean;
    expiresAt?: Date | undefined;
}, {
    expiresAt?: Date | undefined;
    permission?: "view" | "edit" | "comment" | undefined;
    requiresApproval?: boolean | undefined;
}>;
export type ShareTool = z.infer<typeof ShareToolSchema>;
export declare const ToolDataRecordSchema: z.ZodObject<{
    id: z.ZodString;
    toolId: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodAny>;
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
    data: Record<string, any>;
    isAnonymous: boolean;
    toolId: string;
    submittedAt: Date;
    isValid: boolean;
    submittedBy?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    sessionId?: string | undefined;
    validationErrors?: string[] | undefined;
    completionTime?: number | undefined;
    deviceType?: "mobile" | "desktop" | "tablet" | undefined;
    referrer?: string | undefined;
}, {
    id: string;
    data: Record<string, any>;
    toolId: string;
    submittedAt: Date;
    isAnonymous?: boolean | undefined;
    submittedBy?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    sessionId?: string | undefined;
    isValid?: boolean | undefined;
    validationErrors?: string[] | undefined;
    completionTime?: number | undefined;
    deviceType?: "mobile" | "desktop" | "tablet" | undefined;
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
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    timestamp: Date;
    toolId: string;
    sessionId: string;
    eventType: "view" | "start" | "share" | "complete" | "abandon" | "fork";
    metadata?: Record<string, any> | undefined;
    userId?: string | undefined;
}, {
    id: string;
    timestamp: Date;
    toolId: string;
    sessionId: string;
    eventType: "view" | "start" | "share" | "complete" | "abandon" | "fork";
    metadata?: Record<string, any> | undefined;
    userId?: string | undefined;
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