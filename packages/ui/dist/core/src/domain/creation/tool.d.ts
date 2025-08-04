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
    permission?: "view" | "edit" | "comment";
    userId?: string;
    addedAt?: Date;
    addedBy?: string;
}, {
    permission?: "view" | "edit" | "comment";
    userId?: string;
    addedAt?: Date;
    addedBy?: string;
}>;
export declare const ToolMetadataSchema: z.ZodObject<{
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
    estimatedTime: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    language?: string;
    category?: string;
    estimatedTime?: number;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
}, {
    language?: string;
    category?: string;
    estimatedTime?: number;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
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
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        }, {
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        type?: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean;
        validation?: {
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        };
    }, {
        name?: string;
        type?: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean;
        validation?: {
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        };
    }>, "many">;
    maxRecords: z.ZodDefault<z.ZodNumber>;
    allowAnonymous: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fields?: {
        name?: string;
        type?: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean;
        validation?: {
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        };
    }[];
    maxRecords?: number;
    allowAnonymous?: boolean;
}, {
    fields?: {
        name?: string;
        type?: "string" | "number" | "boolean" | "object" | "date" | "array";
        required?: boolean;
        validation?: {
            max?: number;
            min?: number;
            pattern?: string;
            enum?: string[];
        };
    }[];
    maxRecords?: number;
    allowAnonymous?: boolean;
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
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            }, {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            }>>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }, {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }>, "many">;
        maxRecords: z.ZodDefault<z.ZodNumber>;
        allowAnonymous: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fields?: {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }[];
        maxRecords?: number;
        allowAnonymous?: boolean;
    }, {
        fields?: {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }[];
        maxRecords?: number;
        allowAnonymous?: boolean;
    }>>;
    dataRetentionDays: z.ZodDefault<z.ZodNumber>;
    notifyOnSubmission: z.ZodDefault<z.ZodBoolean>;
    notificationEmail: z.ZodOptional<z.ZodString>;
    trackingEnabled: z.ZodDefault<z.ZodBoolean>;
    allowAnalyticsOptOut: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    autoSave?: boolean;
    backgroundColor?: string;
    theme?: "dark" | "light" | "auto";
    primaryColor?: string;
    allowMultipleSubmissions?: boolean;
    requireAuthentication?: boolean;
    showProgressBar?: boolean;
    enableRealTimeUpdates?: boolean;
    maxResponseLength?: number;
    customCSS?: string;
    headerText?: string;
    footerText?: string;
    dataSchema?: {
        fields?: {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }[];
        maxRecords?: number;
        allowAnonymous?: boolean;
    };
    dataRetentionDays?: number;
    notifyOnSubmission?: boolean;
    notificationEmail?: string;
    trackingEnabled?: boolean;
    allowAnalyticsOptOut?: boolean;
}, {
    autoSave?: boolean;
    backgroundColor?: string;
    theme?: "dark" | "light" | "auto";
    primaryColor?: string;
    allowMultipleSubmissions?: boolean;
    requireAuthentication?: boolean;
    showProgressBar?: boolean;
    enableRealTimeUpdates?: boolean;
    maxResponseLength?: number;
    customCSS?: string;
    headerText?: string;
    footerText?: string;
    dataSchema?: {
        fields?: {
            name?: string;
            type?: "string" | "number" | "boolean" | "object" | "date" | "array";
            required?: boolean;
            validation?: {
                max?: number;
                min?: number;
                pattern?: string;
                enum?: string[];
            };
        }[];
        maxRecords?: number;
        allowAnonymous?: boolean;
    };
    dataRetentionDays?: number;
    notifyOnSubmission?: boolean;
    notificationEmail?: string;
    trackingEnabled?: boolean;
    allowAnalyticsOptOut?: boolean;
}>;
export declare const ToolVersionSchema: z.ZodObject<{
    version: z.ZodString;
    changelog: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    createdBy: z.ZodString;
    isStable: z.ZodDefault<z.ZodBoolean>;
    deprecatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    version?: string;
    createdAt?: Date;
    changelog?: string;
    createdBy?: string;
    isStable?: boolean;
    deprecatedAt?: Date;
}, {
    version?: string;
    createdAt?: Date;
    changelog?: string;
    createdBy?: string;
    isStable?: boolean;
    deprecatedAt?: Date;
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
        permission?: "view" | "edit" | "comment";
        userId?: string;
        addedAt?: Date;
        addedBy?: string;
    }, {
        permission?: "view" | "edit" | "comment";
        userId?: string;
        addedAt?: Date;
        addedBy?: string;
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
        version?: string;
        createdAt?: Date;
        changelog?: string;
        createdBy?: string;
        isStable?: boolean;
        deprecatedAt?: Date;
    }, {
        version?: string;
        createdAt?: Date;
        changelog?: string;
        createdBy?: string;
        isStable?: boolean;
        deprecatedAt?: Date;
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
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        }, {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }, {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
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
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }, {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }>>;
        dataRetentionDays: z.ZodDefault<z.ZodNumber>;
        notifyOnSubmission: z.ZodDefault<z.ZodBoolean>;
        notificationEmail: z.ZodOptional<z.ZodString>;
        trackingEnabled: z.ZodDefault<z.ZodBoolean>;
        allowAnalyticsOptOut: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }>>;
    metadata: z.ZodDefault<z.ZodObject<{
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        category: z.ZodOptional<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    }, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
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
    name?: string;
    id?: string;
    status?: "preview" | "draft" | "published";
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    spaceId?: string;
    collaborators?: {
        permission?: "view" | "edit" | "comment";
        userId?: string;
        addedAt?: Date;
        addedBy?: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
    ownerId?: string;
    currentVersion?: string;
    versions?: {
        version?: string;
        createdAt?: Date;
        changelog?: string;
        createdBy?: string;
        isStable?: boolean;
        deprecatedAt?: Date;
    }[];
    elements?: {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }[];
    isPublic?: boolean;
    shareToken?: string;
    forkCount?: number;
    originalToolId?: string;
    viewCount?: number;
    useCount?: number;
    rating?: number;
    ratingCount?: number;
    isSpaceTool?: boolean;
    publishedAt?: Date;
    lastUsedAt?: Date;
}, {
    name?: string;
    id?: string;
    status?: "preview" | "draft" | "published";
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    spaceId?: string;
    collaborators?: {
        permission?: "view" | "edit" | "comment";
        userId?: string;
        addedAt?: Date;
        addedBy?: string;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
    ownerId?: string;
    currentVersion?: string;
    versions?: {
        version?: string;
        createdAt?: Date;
        changelog?: string;
        createdBy?: string;
        isStable?: boolean;
        deprecatedAt?: Date;
    }[];
    elements?: {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }[];
    isPublic?: boolean;
    shareToken?: string;
    forkCount?: number;
    originalToolId?: string;
    viewCount?: number;
    useCount?: number;
    rating?: number;
    ratingCount?: number;
    isSpaceTool?: boolean;
    publishedAt?: Date;
    lastUsedAt?: Date;
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
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }, {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }>>>;
        dataRetentionDays: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        notifyOnSubmission: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        notificationEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        trackingEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        allowAnalyticsOptOut: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>>;
        estimatedTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    }, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    spaceId?: string;
    isSpaceTool?: boolean;
}, {
    name?: string;
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    spaceId?: string;
    isSpaceTool?: boolean;
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
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        }, {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        }>;
        parentId: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isVisible: z.ZodDefault<z.ZodBoolean>;
        isLocked: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }, {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
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
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }, {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                }>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }, {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }>, "many">;
            maxRecords: z.ZodDefault<z.ZodNumber>;
            allowAnonymous: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }, {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        }>>>;
        dataRetentionDays: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        notifyOnSubmission: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        notificationEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        trackingEnabled: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        allowAnalyticsOptOut: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }, {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{
        tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced"]>>>;
        estimatedTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    }, {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    }>>;
    changelog: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    changelog?: string;
    elements?: {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }[];
}, {
    name?: string;
    metadata?: {
        language?: string;
        category?: string;
        estimatedTime?: number;
        difficulty?: "beginner" | "intermediate" | "advanced";
        tags?: string[];
    };
    description?: string;
    config?: {
        autoSave?: boolean;
        backgroundColor?: string;
        theme?: "dark" | "light" | "auto";
        primaryColor?: string;
        allowMultipleSubmissions?: boolean;
        requireAuthentication?: boolean;
        showProgressBar?: boolean;
        enableRealTimeUpdates?: boolean;
        maxResponseLength?: number;
        customCSS?: string;
        headerText?: string;
        footerText?: string;
        dataSchema?: {
            fields?: {
                name?: string;
                type?: "string" | "number" | "boolean" | "object" | "date" | "array";
                required?: boolean;
                validation?: {
                    max?: number;
                    min?: number;
                    pattern?: string;
                    enum?: string[];
                };
            }[];
            maxRecords?: number;
            allowAnonymous?: boolean;
        };
        dataRetentionDays?: number;
        notifyOnSubmission?: boolean;
        notificationEmail?: string;
        trackingEnabled?: boolean;
        allowAnalyticsOptOut?: boolean;
    };
    changelog?: string;
    elements?: {
        id?: string;
        position?: {
            height?: number;
            width?: number;
            x?: number;
            y?: number;
        };
        order?: number;
        isVisible?: boolean;
        isLocked?: boolean;
        config?: unknown;
        elementId?: string;
        parentId?: string;
    }[];
}>;
export type UpdateTool = z.infer<typeof UpdateToolSchema>;
export declare const ShareToolSchema: z.ZodObject<{
    permission: z.ZodDefault<z.ZodEnum<["view", "comment", "edit"]>>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    requiresApproval: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    permission?: "view" | "edit" | "comment";
    expiresAt?: Date;
    requiresApproval?: boolean;
}, {
    permission?: "view" | "edit" | "comment";
    expiresAt?: Date;
    requiresApproval?: boolean;
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
    id?: string;
    data?: Record<string, any>;
    sessionId?: string;
    toolId?: string;
    submittedBy?: string;
    submittedAt?: Date;
    ipAddress?: string;
    userAgent?: string;
    isAnonymous?: boolean;
    isValid?: boolean;
    validationErrors?: string[];
    completionTime?: number;
    deviceType?: "mobile" | "desktop" | "tablet";
    referrer?: string;
}, {
    id?: string;
    data?: Record<string, any>;
    sessionId?: string;
    toolId?: string;
    submittedBy?: string;
    submittedAt?: Date;
    ipAddress?: string;
    userAgent?: string;
    isAnonymous?: boolean;
    isValid?: boolean;
    validationErrors?: string[];
    completionTime?: number;
    deviceType?: "mobile" | "desktop" | "tablet";
    referrer?: string;
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
    id?: string;
    metadata?: Record<string, any>;
    userId?: string;
    sessionId?: string;
    timestamp?: Date;
    toolId?: string;
    eventType?: "view" | "start" | "share" | "complete" | "abandon" | "fork";
}, {
    id?: string;
    metadata?: Record<string, any>;
    userId?: string;
    sessionId?: string;
    timestamp?: Date;
    toolId?: string;
    eventType?: "view" | "start" | "share" | "complete" | "abandon" | "fork";
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