import { z } from "zod";
export declare const CreationEventType: z.ZodEnum<["tool_created", "tool_updated", "tool_deleted", "tool_published", "tool_shared", "tool_forked", "tool_fork_source", "tool_opened", "tool_preview", "tool_exported", "element_added", "element_removed", "element_configured", "element_moved", "element_resized", "element_duplicated", "element_preset_used", "builder_session_start", "builder_session_end", "canvas_mode_changed", "device_mode_changed", "element_library_searched", "properties_panel_used", "json_viewer_used", "undo_action", "redo_action", "tool_instance_opened", "tool_instance_submitted", "tool_instance_abandoned", "tool_element_interacted", "tool_validation_error", "tool_data_saved", "share_link_created", "share_link_accessed", "tool_embedded", "tool_feed_posted"]>;
export type CreationEventType = z.infer<typeof CreationEventType>;
export declare const CreationAnalyticsEventSchema: z.ZodObject<{
    eventType: z.ZodEnum<["tool_created", "tool_updated", "tool_deleted", "tool_published", "tool_shared", "tool_forked", "tool_fork_source", "tool_opened", "tool_preview", "tool_exported", "element_added", "element_removed", "element_configured", "element_moved", "element_resized", "element_duplicated", "element_preset_used", "builder_session_start", "builder_session_end", "canvas_mode_changed", "device_mode_changed", "element_library_searched", "properties_panel_used", "json_viewer_used", "undo_action", "redo_action", "tool_instance_opened", "tool_instance_submitted", "tool_instance_abandoned", "tool_element_interacted", "tool_validation_error", "tool_data_saved", "share_link_created", "share_link_accessed", "tool_embedded", "tool_feed_posted"]>;
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    metadata?: Record<string, any>;
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_created" | "tool_updated" | "tool_deleted" | "tool_published" | "tool_shared" | "tool_forked" | "tool_fork_source" | "tool_opened" | "tool_preview" | "tool_exported" | "element_added" | "element_removed" | "element_configured" | "element_moved" | "element_resized" | "element_duplicated" | "element_preset_used" | "builder_session_start" | "builder_session_end" | "canvas_mode_changed" | "device_mode_changed" | "element_library_searched" | "properties_panel_used" | "json_viewer_used" | "undo_action" | "redo_action" | "tool_instance_opened" | "tool_instance_submitted" | "tool_instance_abandoned" | "tool_element_interacted" | "tool_validation_error" | "tool_data_saved" | "share_link_created" | "share_link_accessed" | "tool_embedded" | "tool_feed_posted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: Record<string, any>;
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_created" | "tool_updated" | "tool_deleted" | "tool_published" | "tool_shared" | "tool_forked" | "tool_fork_source" | "tool_opened" | "tool_preview" | "tool_exported" | "element_added" | "element_removed" | "element_configured" | "element_moved" | "element_resized" | "element_duplicated" | "element_preset_used" | "builder_session_start" | "builder_session_end" | "canvas_mode_changed" | "device_mode_changed" | "element_library_searched" | "properties_panel_used" | "json_viewer_used" | "undo_action" | "redo_action" | "tool_instance_opened" | "tool_instance_submitted" | "tool_instance_abandoned" | "tool_element_interacted" | "tool_validation_error" | "tool_data_saved" | "share_link_created" | "share_link_accessed" | "tool_embedded" | "tool_feed_posted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export type CreationAnalyticsEvent = z.infer<typeof CreationAnalyticsEventSchema>;
export declare const ToolCreatedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_created">;
    metadata: z.ZodOptional<z.ZodObject<{
        hasDescription: z.ZodBoolean;
        initialElementsCount: z.ZodNumber;
        templateUsed: z.ZodOptional<z.ZodString>;
        creationSource: z.ZodEnum<["scratch", "template", "fork"]>;
    }, "strip", z.ZodTypeAny, {
        hasDescription?: boolean;
        initialElementsCount?: number;
        templateUsed?: string;
        creationSource?: "template" | "fork" | "scratch";
    }, {
        hasDescription?: boolean;
        initialElementsCount?: number;
        templateUsed?: string;
        creationSource?: "template" | "fork" | "scratch";
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        hasDescription?: boolean;
        initialElementsCount?: number;
        templateUsed?: string;
        creationSource?: "template" | "fork" | "scratch";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_created";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        hasDescription?: boolean;
        initialElementsCount?: number;
        templateUsed?: string;
        creationSource?: "template" | "fork" | "scratch";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_created";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ToolUpdatedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_updated">;
    metadata: z.ZodOptional<z.ZodObject<{
        versionChanged: z.ZodBoolean;
        newVersion: z.ZodString;
        elementsCount: z.ZodNumber;
        changeType: z.ZodEnum<["major", "minor", "patch"]>;
        fieldsChanged: z.ZodArray<z.ZodString, "many">;
        editDuration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        versionChanged?: boolean;
        newVersion?: string;
        elementsCount?: number;
        changeType?: "major" | "minor" | "patch";
        fieldsChanged?: string[];
        editDuration?: number;
    }, {
        versionChanged?: boolean;
        newVersion?: string;
        elementsCount?: number;
        changeType?: "major" | "minor" | "patch";
        fieldsChanged?: string[];
        editDuration?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        versionChanged?: boolean;
        newVersion?: string;
        elementsCount?: number;
        changeType?: "major" | "minor" | "patch";
        fieldsChanged?: string[];
        editDuration?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_updated";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        versionChanged?: boolean;
        newVersion?: string;
        elementsCount?: number;
        changeType?: "major" | "minor" | "patch";
        fieldsChanged?: string[];
        editDuration?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_updated";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ElementAddedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"element_added">;
    metadata: z.ZodOptional<z.ZodObject<{
        addMethod: z.ZodEnum<["drag_drop", "click", "preset", "duplicate"]>;
        presetUsed: z.ZodOptional<z.ZodString>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x?: number;
            y?: number;
        }, {
            x?: number;
            y?: number;
        }>;
        canvasElementsCount: z.ZodNumber;
        librarySearchQuery: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        position?: {
            x?: number;
            y?: number;
        };
        addMethod?: "click" | "drag_drop" | "preset" | "duplicate";
        presetUsed?: string;
        canvasElementsCount?: number;
        librarySearchQuery?: string;
    }, {
        position?: {
            x?: number;
            y?: number;
        };
        addMethod?: "click" | "drag_drop" | "preset" | "duplicate";
        presetUsed?: string;
        canvasElementsCount?: number;
        librarySearchQuery?: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        position?: {
            x?: number;
            y?: number;
        };
        addMethod?: "click" | "drag_drop" | "preset" | "duplicate";
        presetUsed?: string;
        canvasElementsCount?: number;
        librarySearchQuery?: string;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "element_added";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        position?: {
            x?: number;
            y?: number;
        };
        addMethod?: "click" | "drag_drop" | "preset" | "duplicate";
        presetUsed?: string;
        canvasElementsCount?: number;
        librarySearchQuery?: string;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "element_added";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ElementConfiguredEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"element_configured">;
    metadata: z.ZodOptional<z.ZodObject<{
        configMethod: z.ZodEnum<["properties_panel", "json_editor", "inline_edit"]>;
        propertiesChanged: z.ZodArray<z.ZodString, "many">;
        configComplexity: z.ZodEnum<["basic", "advanced"]>;
        validationErrors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        timeSpent: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        validationErrors?: string[];
        configMethod?: "properties_panel" | "json_editor" | "inline_edit";
        propertiesChanged?: string[];
        configComplexity?: "advanced" | "basic";
        timeSpent?: number;
    }, {
        validationErrors?: string[];
        configMethod?: "properties_panel" | "json_editor" | "inline_edit";
        propertiesChanged?: string[];
        configComplexity?: "advanced" | "basic";
        timeSpent?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        validationErrors?: string[];
        configMethod?: "properties_panel" | "json_editor" | "inline_edit";
        propertiesChanged?: string[];
        configComplexity?: "advanced" | "basic";
        timeSpent?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "element_configured";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        validationErrors?: string[];
        configMethod?: "properties_panel" | "json_editor" | "inline_edit";
        propertiesChanged?: string[];
        configComplexity?: "advanced" | "basic";
        timeSpent?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "element_configured";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const BuilderSessionEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodEnum<["builder_session_start", "builder_session_end"]>;
    metadata: z.ZodOptional<z.ZodObject<{
        sessionDuration: z.ZodOptional<z.ZodNumber>;
        elementsAdded: z.ZodOptional<z.ZodNumber>;
        elementsRemoved: z.ZodOptional<z.ZodNumber>;
        elementsConfigured: z.ZodOptional<z.ZodNumber>;
        undoCount: z.ZodOptional<z.ZodNumber>;
        redoCount: z.ZodOptional<z.ZodNumber>;
        modesUsed: z.ZodOptional<z.ZodArray<z.ZodEnum<["design", "preview", "code"]>, "many">>;
        deviceModesUsed: z.ZodOptional<z.ZodArray<z.ZodEnum<["desktop", "tablet", "mobile"]>, "many">>;
        exitReason: z.ZodOptional<z.ZodEnum<["save", "abandon", "publish", "share"]>>;
    }, "strip", z.ZodTypeAny, {
        sessionDuration?: number;
        elementsAdded?: number;
        elementsRemoved?: number;
        elementsConfigured?: number;
        undoCount?: number;
        redoCount?: number;
        modesUsed?: ("code" | "preview" | "design")[];
        deviceModesUsed?: ("mobile" | "desktop" | "tablet")[];
        exitReason?: "share" | "abandon" | "save" | "publish";
    }, {
        sessionDuration?: number;
        elementsAdded?: number;
        elementsRemoved?: number;
        elementsConfigured?: number;
        undoCount?: number;
        redoCount?: number;
        modesUsed?: ("code" | "preview" | "design")[];
        deviceModesUsed?: ("mobile" | "desktop" | "tablet")[];
        exitReason?: "share" | "abandon" | "save" | "publish";
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        sessionDuration?: number;
        elementsAdded?: number;
        elementsRemoved?: number;
        elementsConfigured?: number;
        undoCount?: number;
        redoCount?: number;
        modesUsed?: ("code" | "preview" | "design")[];
        deviceModesUsed?: ("mobile" | "desktop" | "tablet")[];
        exitReason?: "share" | "abandon" | "save" | "publish";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "builder_session_start" | "builder_session_end";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        sessionDuration?: number;
        elementsAdded?: number;
        elementsRemoved?: number;
        elementsConfigured?: number;
        undoCount?: number;
        redoCount?: number;
        modesUsed?: ("code" | "preview" | "design")[];
        deviceModesUsed?: ("mobile" | "desktop" | "tablet")[];
        exitReason?: "share" | "abandon" | "save" | "publish";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "builder_session_start" | "builder_session_end";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ToolInstanceOpenedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_instance_opened">;
    metadata: z.ZodOptional<z.ZodObject<{
        source: z.ZodEnum<["direct", "feed", "share_link", "embed"]>;
        referrer: z.ZodOptional<z.ZodString>;
        isFirstTime: z.ZodBoolean;
        deviceType: z.ZodEnum<["desktop", "tablet", "mobile"]>;
    }, "strip", z.ZodTypeAny, {
        source?: "feed" | "embed" | "direct" | "share_link";
        deviceType?: "mobile" | "desktop" | "tablet";
        referrer?: string;
        isFirstTime?: boolean;
    }, {
        source?: "feed" | "embed" | "direct" | "share_link";
        deviceType?: "mobile" | "desktop" | "tablet";
        referrer?: string;
        isFirstTime?: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        source?: "feed" | "embed" | "direct" | "share_link";
        deviceType?: "mobile" | "desktop" | "tablet";
        referrer?: string;
        isFirstTime?: boolean;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_instance_opened";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        source?: "feed" | "embed" | "direct" | "share_link";
        deviceType?: "mobile" | "desktop" | "tablet";
        referrer?: string;
        isFirstTime?: boolean;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_instance_opened";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ToolInstanceSubmittedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_instance_submitted">;
    metadata: z.ZodOptional<z.ZodObject<{
        completionTime: z.ZodNumber;
        elementsInteracted: z.ZodNumber;
        validationErrors: z.ZodNumber;
        dataSize: z.ZodNumber;
        isAnonymous: z.ZodBoolean;
        retryCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        isAnonymous?: boolean;
        validationErrors?: number;
        completionTime?: number;
        elementsInteracted?: number;
        dataSize?: number;
        retryCount?: number;
    }, {
        isAnonymous?: boolean;
        validationErrors?: number;
        completionTime?: number;
        elementsInteracted?: number;
        dataSize?: number;
        retryCount?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        isAnonymous?: boolean;
        validationErrors?: number;
        completionTime?: number;
        elementsInteracted?: number;
        dataSize?: number;
        retryCount?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_instance_submitted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        isAnonymous?: boolean;
        validationErrors?: number;
        completionTime?: number;
        elementsInteracted?: number;
        dataSize?: number;
        retryCount?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_instance_submitted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ToolElementInteractedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_element_interacted">;
    metadata: z.ZodOptional<z.ZodObject<{
        interactionType: z.ZodEnum<["click", "input", "select", "drag", "hover"]>;
        elementPosition: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x?: number;
            y?: number;
        }, {
            x?: number;
            y?: number;
        }>;
        valueChanged: z.ZodBoolean;
        timeOnElement: z.ZodNumber;
        previousElement: z.ZodOptional<z.ZodString>;
        nextElement: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        interactionType?: "input" | "select" | "drag" | "click" | "hover";
        elementPosition?: {
            x?: number;
            y?: number;
        };
        valueChanged?: boolean;
        timeOnElement?: number;
        previousElement?: string;
        nextElement?: string;
    }, {
        interactionType?: "input" | "select" | "drag" | "click" | "hover";
        elementPosition?: {
            x?: number;
            y?: number;
        };
        valueChanged?: boolean;
        timeOnElement?: number;
        previousElement?: string;
        nextElement?: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        interactionType?: "input" | "select" | "drag" | "click" | "hover";
        elementPosition?: {
            x?: number;
            y?: number;
        };
        valueChanged?: boolean;
        timeOnElement?: number;
        previousElement?: string;
        nextElement?: string;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_element_interacted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        interactionType?: "input" | "select" | "drag" | "click" | "hover";
        elementPosition?: {
            x?: number;
            y?: number;
        };
        valueChanged?: boolean;
        timeOnElement?: number;
        previousElement?: string;
        nextElement?: string;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_element_interacted";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ShareLinkCreatedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"share_link_created">;
    metadata: z.ZodOptional<z.ZodObject<{
        shareType: z.ZodEnum<["view", "edit", "fork"]>;
        hasExpiration: z.ZodBoolean;
        shareMethod: z.ZodEnum<["direct_link", "social", "embed"]>;
        recipientCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        shareType?: "view" | "edit" | "fork";
        hasExpiration?: boolean;
        shareMethod?: "embed" | "social" | "direct_link";
        recipientCount?: number;
    }, {
        shareType?: "view" | "edit" | "fork";
        hasExpiration?: boolean;
        shareMethod?: "embed" | "social" | "direct_link";
        recipientCount?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        shareType?: "view" | "edit" | "fork";
        hasExpiration?: boolean;
        shareMethod?: "embed" | "social" | "direct_link";
        recipientCount?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "share_link_created";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        shareType?: "view" | "edit" | "fork";
        hasExpiration?: boolean;
        shareMethod?: "embed" | "social" | "direct_link";
        recipientCount?: number;
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "share_link_created";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ToolForkedEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    timestamp: z.ZodDate;
    userIdHash: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    toolId: z.ZodOptional<z.ZodString>;
    toolName: z.ZodOptional<z.ZodString>;
    toolVersion: z.ZodOptional<z.ZodString>;
    toolStatus: z.ZodOptional<z.ZodEnum<["draft", "preview", "published"]>>;
    spaceId: z.ZodOptional<z.ZodString>;
    isSpaceTool: z.ZodOptional<z.ZodBoolean>;
    elementId: z.ZodOptional<z.ZodString>;
    elementType: z.ZodOptional<z.ZodString>;
    elementVersion: z.ZodOptional<z.ZodNumber>;
    userAgent: z.ZodOptional<z.ZodString>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        height?: number;
        width?: number;
    }, {
        height?: number;
        width?: number;
    }>>;
    loadTime: z.ZodOptional<z.ZodNumber>;
    renderTime: z.ZodOptional<z.ZodNumber>;
    optedOut: z.ZodDefault<z.ZodBoolean>;
    anonymized: z.ZodDefault<z.ZodBoolean>;
} & {
    eventType: z.ZodLiteral<"tool_forked">;
    metadata: z.ZodOptional<z.ZodObject<{
        originalToolId: z.ZodString;
        originalToolName: z.ZodString;
        elementsCount: z.ZodNumber;
        modificationsBeforeFork: z.ZodNumber;
        forkReason: z.ZodOptional<z.ZodEnum<["customize", "learn", "remix", "backup"]>>;
    }, "strip", z.ZodTypeAny, {
        originalToolId?: string;
        elementsCount?: number;
        originalToolName?: string;
        modificationsBeforeFork?: number;
        forkReason?: "customize" | "learn" | "remix" | "backup";
    }, {
        originalToolId?: string;
        elementsCount?: number;
        originalToolName?: string;
        modificationsBeforeFork?: number;
        forkReason?: "customize" | "learn" | "remix" | "backup";
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        originalToolId?: string;
        elementsCount?: number;
        originalToolName?: string;
        modificationsBeforeFork?: number;
        forkReason?: "customize" | "learn" | "remix" | "backup";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_forked";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}, {
    metadata?: {
        originalToolId?: string;
        elementsCount?: number;
        originalToolName?: string;
        modificationsBeforeFork?: number;
        forkReason?: "customize" | "learn" | "remix" | "backup";
    };
    viewport?: {
        height?: number;
        width?: number;
    };
    spaceId?: string;
    renderTime?: number;
    sessionId?: string;
    timestamp?: Date;
    elementId?: string;
    elementType?: string;
    isSpaceTool?: boolean;
    toolId?: string;
    userAgent?: string;
    eventType?: "tool_forked";
    toolName?: string;
    eventId?: string;
    userIdHash?: string;
    toolVersion?: string;
    toolStatus?: "preview" | "draft" | "published";
    elementVersion?: number;
    loadTime?: number;
    optedOut?: boolean;
    anonymized?: boolean;
}>;
export declare const ElementPopularitySchema: z.ZodObject<{
    elementId: z.ZodString;
    elementType: z.ZodString;
    usageCount: z.ZodNumber;
    configurationComplexity: z.ZodObject<{
        basic: z.ZodNumber;
        advanced: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        advanced?: number;
        basic?: number;
    }, {
        advanced?: number;
        basic?: number;
    }>;
    popularPresets: z.ZodArray<z.ZodObject<{
        presetId: z.ZodString;
        usageCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        usageCount?: number;
        presetId?: string;
    }, {
        usageCount?: number;
        presetId?: string;
    }>, "many">;
    averageConfigTime: z.ZodNumber;
    errorRate: z.ZodNumber;
    retentionRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    elementId?: string;
    elementType?: string;
    usageCount?: number;
    configurationComplexity?: {
        advanced?: number;
        basic?: number;
    };
    popularPresets?: {
        usageCount?: number;
        presetId?: string;
    }[];
    averageConfigTime?: number;
    errorRate?: number;
    retentionRate?: number;
}, {
    elementId?: string;
    elementType?: string;
    usageCount?: number;
    configurationComplexity?: {
        advanced?: number;
        basic?: number;
    };
    popularPresets?: {
        usageCount?: number;
        presetId?: string;
    }[];
    averageConfigTime?: number;
    errorRate?: number;
    retentionRate?: number;
}>;
export type ElementPopularity = z.infer<typeof ElementPopularitySchema>;
export declare const ToolPerformanceSchema: z.ZodObject<{
    toolId: z.ZodString;
    metrics: z.ZodObject<{
        averageLoadTime: z.ZodNumber;
        averageRenderTime: z.ZodNumber;
        errorRate: z.ZodNumber;
        completionRate: z.ZodNumber;
        abandonmentRate: z.ZodNumber;
        averageSessionDuration: z.ZodNumber;
        elementsPerTool: z.ZodNumber;
        configComplexityScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        completionRate?: number;
        errorRate?: number;
        averageLoadTime?: number;
        averageRenderTime?: number;
        abandonmentRate?: number;
        averageSessionDuration?: number;
        elementsPerTool?: number;
        configComplexityScore?: number;
    }, {
        completionRate?: number;
        errorRate?: number;
        averageLoadTime?: number;
        averageRenderTime?: number;
        abandonmentRate?: number;
        averageSessionDuration?: number;
        elementsPerTool?: number;
        configComplexityScore?: number;
    }>;
    timeframe: z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        end?: Date;
        start?: Date;
    }, {
        end?: Date;
        start?: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    metrics?: {
        completionRate?: number;
        errorRate?: number;
        averageLoadTime?: number;
        averageRenderTime?: number;
        abandonmentRate?: number;
        averageSessionDuration?: number;
        elementsPerTool?: number;
        configComplexityScore?: number;
    };
    toolId?: string;
    timeframe?: {
        end?: Date;
        start?: Date;
    };
}, {
    metrics?: {
        completionRate?: number;
        errorRate?: number;
        averageLoadTime?: number;
        averageRenderTime?: number;
        abandonmentRate?: number;
        averageSessionDuration?: number;
        elementsPerTool?: number;
        configComplexityScore?: number;
    };
    toolId?: string;
    timeframe?: {
        end?: Date;
        start?: Date;
    };
}>;
export type ToolPerformance = z.infer<typeof ToolPerformanceSchema>;
export declare const BuilderBehaviorSchema: z.ZodObject<{
    userIdHash: z.ZodString;
    insights: z.ZodObject<{
        preferredElements: z.ZodArray<z.ZodString, "many">;
        averageToolComplexity: z.ZodNumber;
        buildingPatterns: z.ZodArray<z.ZodString, "many">;
        commonMistakes: z.ZodArray<z.ZodString, "many">;
        learningProgression: z.ZodObject<{
            beginnerElements: z.ZodNumber;
            intermediateElements: z.ZodNumber;
            advancedElements: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        }, {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        }>;
        collaborationStyle: z.ZodEnum<["solo", "collaborative", "mixed"]>;
        shareFrequency: z.ZodEnum<["never", "rarely", "sometimes", "often", "always"]>;
    }, "strip", z.ZodTypeAny, {
        preferredElements?: string[];
        averageToolComplexity?: number;
        buildingPatterns?: string[];
        commonMistakes?: string[];
        learningProgression?: {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        };
        collaborationStyle?: "mixed" | "solo" | "collaborative";
        shareFrequency?: "always" | "never" | "rarely" | "sometimes" | "often";
    }, {
        preferredElements?: string[];
        averageToolComplexity?: number;
        buildingPatterns?: string[];
        commonMistakes?: string[];
        learningProgression?: {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        };
        collaborationStyle?: "mixed" | "solo" | "collaborative";
        shareFrequency?: "always" | "never" | "rarely" | "sometimes" | "often";
    }>;
    timeframe: z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        end?: Date;
        start?: Date;
    }, {
        end?: Date;
        start?: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    userIdHash?: string;
    timeframe?: {
        end?: Date;
        start?: Date;
    };
    insights?: {
        preferredElements?: string[];
        averageToolComplexity?: number;
        buildingPatterns?: string[];
        commonMistakes?: string[];
        learningProgression?: {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        };
        collaborationStyle?: "mixed" | "solo" | "collaborative";
        shareFrequency?: "always" | "never" | "rarely" | "sometimes" | "often";
    };
}, {
    userIdHash?: string;
    timeframe?: {
        end?: Date;
        start?: Date;
    };
    insights?: {
        preferredElements?: string[];
        averageToolComplexity?: number;
        buildingPatterns?: string[];
        commonMistakes?: string[];
        learningProgression?: {
            beginnerElements?: number;
            intermediateElements?: number;
            advancedElements?: number;
        };
        collaborationStyle?: "mixed" | "solo" | "collaborative";
        shareFrequency?: "always" | "never" | "rarely" | "sometimes" | "often";
    };
}>;
export type BuilderBehavior = z.infer<typeof BuilderBehaviorSchema>;
export declare const hashUserId: (userId: string) => string;
export declare const createAnalyticsEvent: (eventType: CreationEventType, context: {
    userId?: string;
    sessionId: string;
    toolId?: string;
    elementId?: string;
    metadata?: Record<string, unknown>;
}) => CreationAnalyticsEvent;
export declare const shouldTrackEvent: (eventType: CreationEventType, userPreferences?: {
    analyticsOptOut?: boolean;
}) => boolean;
export declare const batchAnalyticsEvents: (events: CreationAnalyticsEvent[], maxBatchSize?: number) => CreationAnalyticsEvent[][];
export declare const shouldRetainEvent: (event: CreationAnalyticsEvent, retentionDays?: number) => boolean;
//# sourceMappingURL=creation.d.ts.map