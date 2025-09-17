import { z } from "zod";
// Creation Engine Analytics Events
export const CreationEventType = z.enum([
    // Tool Builder Events
    "tool_created",
    "tool_updated",
    "tool_deleted",
    "tool_published",
    "tool_shared",
    "tool_forked",
    "tool_fork_source",
    "tool_opened",
    "tool_preview",
    "tool_exported",
    // Element Events
    "element_added",
    "element_removed",
    "element_configured",
    "element_moved",
    "element_resized",
    "element_duplicated",
    "element_preset_used",
    // Builder Interaction Events
    "builder_session_start",
    "builder_session_end",
    "canvas_mode_changed",
    "device_mode_changed",
    "element_library_searched",
    "properties_panel_used",
    "json_viewer_used",
    "undo_action",
    "redo_action",
    // Tool Usage Events (end-user interactions)
    "tool_instance_opened",
    "tool_instance_submitted",
    "tool_instance_abandoned",
    "tool_element_interacted",
    "tool_validation_error",
    "tool_data_saved",
    // Sharing & Distribution Events
    "share_link_created",
    "share_link_accessed",
    "tool_embedded",
    "tool_feed_posted",
]);
// Base analytics event schema
export const CreationAnalyticsEventSchema = z.object({
    // Event identification
    eventType: CreationEventType,
    eventId: z.string().uuid(),
    timestamp: z.date(),
    // User identification (hashed for privacy)
    userIdHash: z.string().optional(), // SHA-256 hash of user ID
    sessionId: z.string(),
    // Tool context
    toolId: z.string().optional(),
    toolName: z.string().optional(),
    toolVersion: z.string().optional(),
    toolStatus: z.enum(["draft", "preview", "published"]).optional(),
    // Space context
    spaceId: z.string().optional(),
    isSpaceTool: z.boolean().optional(),
    // Element context
    elementId: z.string().optional(), // Element instance ID
    elementType: z.string().optional(), // Element definition type
    elementVersion: z.number().optional(),
    // Event-specific data
    metadata: z.record(z.unknown()).optional(),
    // Technical context
    userAgent: z.string().optional(),
    viewport: z
        .object({
        width: z.number(),
        height: z.number(),
    })
        .optional(),
    // Performance metrics
    loadTime: z.number().optional(), // milliseconds
    renderTime: z.number().optional(), // milliseconds
    // Privacy controls
    optedOut: z.boolean().default(false),
    anonymized: z.boolean().default(false),
});
// Specific event schemas with typed metadata
// Tool Builder Events
export const ToolCreatedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_created"),
    metadata: z
        .object({
        hasDescription: z.boolean(),
        initialElementsCount: z.number(),
        templateUsed: z.string().optional(),
        creationSource: z.enum(["scratch", "template", "fork"]),
    })
        .optional(),
});
export const ToolUpdatedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_updated"),
    metadata: z
        .object({
        versionChanged: z.boolean(),
        newVersion: z.string(),
        elementsCount: z.number(),
        changeType: z.enum(["major", "minor", "patch"]),
        fieldsChanged: z.array(z.string()),
        editDuration: z.number(), // seconds
    })
        .optional(),
});
export const ElementAddedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("element_added"),
    metadata: z
        .object({
        addMethod: z.enum(["drag_drop", "click", "preset", "duplicate"]),
        presetUsed: z.string().optional(),
        position: z.object({ x: z.number(), y: z.number() }),
        canvasElementsCount: z.number(),
        librarySearchQuery: z.string().optional(),
    })
        .optional(),
});
export const ElementConfiguredEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("element_configured"),
    metadata: z
        .object({
        configMethod: z.enum([
            "properties_panel",
            "json_editor",
            "inline_edit",
        ]),
        propertiesChanged: z.array(z.string()),
        configComplexity: z.enum(["basic", "advanced"]),
        validationErrors: z.array(z.string()).optional(),
        timeSpent: z.number(), // seconds
    })
        .optional(),
});
export const BuilderSessionEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.enum(["builder_session_start", "builder_session_end"]),
    metadata: z
        .object({
        sessionDuration: z.number().optional(), // seconds (for end events)
        elementsAdded: z.number().optional(),
        elementsRemoved: z.number().optional(),
        elementsConfigured: z.number().optional(),
        undoCount: z.number().optional(),
        redoCount: z.number().optional(),
        modesUsed: z.array(z.enum(["design", "preview", "code"])).optional(),
        deviceModesUsed: z
            .array(z.enum(["desktop", "tablet", "mobile"]))
            .optional(),
        exitReason: z.enum(["save", "abandon", "publish", "share"]).optional(),
    })
        .optional(),
});
// Tool Usage Events (end-user interactions)
export const ToolInstanceOpenedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_instance_opened"),
    metadata: z
        .object({
        source: z.enum(["direct", "feed", "share_link", "embed"]),
        referrer: z.string().optional(),
        isFirstTime: z.boolean(),
        deviceType: z.enum(["desktop", "tablet", "mobile"]),
    })
        .optional(),
});
export const ToolInstanceSubmittedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_instance_submitted"),
    metadata: z
        .object({
        completionTime: z.number(), // seconds
        elementsInteracted: z.number(),
        validationErrors: z.number(),
        dataSize: z.number(), // bytes
        isAnonymous: z.boolean(),
        retryCount: z.number(),
    })
        .optional(),
});
export const ToolElementInteractedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_element_interacted"),
    metadata: z
        .object({
        interactionType: z.enum(["click", "input", "select", "drag", "hover"]),
        elementPosition: z.object({ x: z.number(), y: z.number() }),
        valueChanged: z.boolean(),
        timeOnElement: z.number(), // milliseconds
        previousElement: z.string().optional(),
        nextElement: z.string().optional(),
    })
        .optional(),
});
// Sharing & Distribution Events
export const ShareLinkCreatedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("share_link_created"),
    metadata: z
        .object({
        shareType: z.enum(["view", "edit", "fork"]),
        hasExpiration: z.boolean(),
        shareMethod: z.enum(["direct_link", "social", "embed"]),
        recipientCount: z.number().optional(),
    })
        .optional(),
});
export const ToolForkedEventSchema = CreationAnalyticsEventSchema.extend({
    eventType: z.literal("tool_forked"),
    metadata: z
        .object({
        originalToolId: z.string(),
        originalToolName: z.string(),
        elementsCount: z.number(),
        modificationsBeforeFork: z.number(),
        forkReason: z.enum(["customize", "learn", "remix", "backup"]).optional(),
    })
        .optional(),
});
// Element popularity and usage tracking
export const ElementPopularitySchema = z.object({
    elementId: z.string(),
    elementType: z.string(),
    usageCount: z.number(),
    configurationComplexity: z.object({
        basic: z.number(),
        advanced: z.number(),
    }),
    popularPresets: z.array(z.object({
        presetId: z.string(),
        usageCount: z.number(),
    })),
    averageConfigTime: z.number(), // seconds
    errorRate: z.number(), // percentage
    retentionRate: z.number(), // percentage of elements that stay in final tool
});
// Tool performance metrics
export const ToolPerformanceSchema = z.object({
    toolId: z.string(),
    metrics: z.object({
        averageLoadTime: z.number(), // milliseconds
        averageRenderTime: z.number(), // milliseconds
        errorRate: z.number(), // percentage
        completionRate: z.number(), // percentage
        abandonmentRate: z.number(), // percentage
        averageSessionDuration: z.number(), // seconds
        elementsPerTool: z.number(),
        configComplexityScore: z.number(), // 1-10 scale
    }),
    timeframe: z.object({
        start: z.date(),
        end: z.date(),
    }),
});
// Builder behavior insights
export const BuilderBehaviorSchema = z.object({
    userIdHash: z.string(),
    insights: z.object({
        preferredElements: z.array(z.string()),
        averageToolComplexity: z.number(),
        buildingPatterns: z.array(z.string()),
        commonMistakes: z.array(z.string()),
        learningProgression: z.object({
            beginnerElements: z.number(),
            intermediateElements: z.number(),
            advancedElements: z.number(),
        }),
        collaborationStyle: z.enum(["solo", "collaborative", "mixed"]),
        shareFrequency: z.enum(["never", "rarely", "sometimes", "often", "always"]),
    }),
    timeframe: z.object({
        start: z.date(),
        end: z.date(),
    }),
});
// Utility functions for analytics
export const hashUserId = (userId) => {
    // In a real implementation, use a proper crypto library
    // This is a simplified example
    return btoa(userId)
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, 16);
};
export const createAnalyticsEvent = (eventType, context) => {
    return {
        eventType,
        eventId: crypto.randomUUID(),
        timestamp: new Date(),
        userIdHash: context.userId ? hashUserId(context.userId) : undefined,
        sessionId: context.sessionId,
        toolId: context.toolId,
        elementId: context.elementId,
        metadata: context.metadata,
        optedOut: false,
        anonymized: false,
    };
};
export const shouldTrackEvent = (eventType, userPreferences = {}) => {
    // Respect user opt-out preferences
    if (userPreferences.analyticsOptOut) {
        return false;
    }
    // Always track critical events for functionality
    const criticalEvents = [
        "tool_created",
        "tool_published",
        "tool_instance_submitted",
    ];
    return criticalEvents.includes(eventType) || !userPreferences.analyticsOptOut;
};
// Event batching for performance
export const batchAnalyticsEvents = (events, maxBatchSize = 100) => {
    const batches = [];
    for (let i = 0; i < events.length; i += maxBatchSize) {
        batches.push(events.slice(i, i + maxBatchSize));
    }
    return batches;
};
// Privacy-compliant data retention
export const shouldRetainEvent = (event, retentionDays = 90) => {
    const eventAge = Date.now() - event.timestamp.getTime();
    const maxAge = retentionDays * 24 * 60 * 60 * 1000; // Convert to milliseconds
    return eventAge < maxAge;
};
//# sourceMappingURL=creation.js.map