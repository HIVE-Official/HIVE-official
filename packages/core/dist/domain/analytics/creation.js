"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldRetainEvent = exports.batchAnalyticsEvents = exports.shouldTrackEvent = exports.createAnalyticsEvent = exports.hashUserId = exports.BuilderBehaviorSchema = exports.ToolPerformanceSchema = exports.ElementPopularitySchema = exports.ToolForkedEventSchema = exports.ShareLinkCreatedEventSchema = exports.ToolElementInteractedEventSchema = exports.ToolInstanceSubmittedEventSchema = exports.ToolInstanceOpenedEventSchema = exports.BuilderSessionEventSchema = exports.ElementConfiguredEventSchema = exports.ElementAddedEventSchema = exports.ToolUpdatedEventSchema = exports.ToolCreatedEventSchema = exports.CreationAnalyticsEventSchema = exports.CreationEventType = void 0;
const zod_1 = require("zod");
// Creation Engine Analytics Events
exports.CreationEventType = zod_1.z.enum([
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
exports.CreationAnalyticsEventSchema = zod_1.z.object({
    // Event identification
    eventType: exports.CreationEventType,
    eventId: zod_1.z.string().uuid(),
    timestamp: zod_1.z.date(),
    // User identification (hashed for privacy)
    userIdHash: zod_1.z.string().optional(), // SHA-256 hash of user ID
    sessionId: zod_1.z.string(),
    // Tool context
    toolId: zod_1.z.string().optional(),
    toolName: zod_1.z.string().optional(),
    toolVersion: zod_1.z.string().optional(),
    toolStatus: zod_1.z.enum(["draft", "preview", "published"]).optional(),
    // Space context
    spaceId: zod_1.z.string().optional(),
    isSpaceTool: zod_1.z.boolean().optional(),
    // Element context
    elementId: zod_1.z.string().optional(), // Element instance ID
    elementType: zod_1.z.string().optional(), // Element definition type
    elementVersion: zod_1.z.number().optional(),
    // Event-specific data
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
    // Technical context
    userAgent: zod_1.z.string().optional(),
    viewport: zod_1.z
        .object({
        width: zod_1.z.number(),
        height: zod_1.z.number(),
    })
        .optional(),
    // Performance metrics
    loadTime: zod_1.z.number().optional(), // milliseconds
    renderTime: zod_1.z.number().optional(), // milliseconds
    // Privacy controls
    optedOut: zod_1.z.boolean().default(false),
    anonymized: zod_1.z.boolean().default(false),
});
// Specific event schemas with typed metadata
// Tool Builder Events
exports.ToolCreatedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_created"),
    metadata: zod_1.z
        .object({
        hasDescription: zod_1.z.boolean(),
        initialElementsCount: zod_1.z.number(),
        templateUsed: zod_1.z.string().optional(),
        creationSource: zod_1.z.enum(["scratch", "template", "fork"]),
    })
        .optional(),
});
exports.ToolUpdatedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_updated"),
    metadata: zod_1.z
        .object({
        versionChanged: zod_1.z.boolean(),
        newVersion: zod_1.z.string(),
        elementsCount: zod_1.z.number(),
        changeType: zod_1.z.enum(["major", "minor", "patch"]),
        fieldsChanged: zod_1.z.array(zod_1.z.string()),
        editDuration: zod_1.z.number(), // seconds
    })
        .optional(),
});
exports.ElementAddedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("element_added"),
    metadata: zod_1.z
        .object({
        addMethod: zod_1.z.enum(["drag_drop", "click", "preset", "duplicate"]),
        presetUsed: zod_1.z.string().optional(),
        position: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
        canvasElementsCount: zod_1.z.number(),
        librarySearchQuery: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.ElementConfiguredEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("element_configured"),
    metadata: zod_1.z
        .object({
        configMethod: zod_1.z.enum([
            "properties_panel",
            "json_editor",
            "inline_edit",
        ]),
        propertiesChanged: zod_1.z.array(zod_1.z.string()),
        configComplexity: zod_1.z.enum(["basic", "advanced"]),
        validationErrors: zod_1.z.array(zod_1.z.string()).optional(),
        timeSpent: zod_1.z.number(), // seconds
    })
        .optional(),
});
exports.BuilderSessionEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.enum(["builder_session_start", "builder_session_end"]),
    metadata: zod_1.z
        .object({
        sessionDuration: zod_1.z.number().optional(), // seconds (for end events)
        elementsAdded: zod_1.z.number().optional(),
        elementsRemoved: zod_1.z.number().optional(),
        elementsConfigured: zod_1.z.number().optional(),
        undoCount: zod_1.z.number().optional(),
        redoCount: zod_1.z.number().optional(),
        modesUsed: zod_1.z.array(zod_1.z.enum(["design", "preview", "code"])).optional(),
        deviceModesUsed: zod_1.z
            .array(zod_1.z.enum(["desktop", "tablet", "mobile"]))
            .optional(),
        exitReason: zod_1.z.enum(["save", "abandon", "publish", "share"]).optional(),
    })
        .optional(),
});
// Tool Usage Events (end-user interactions)
exports.ToolInstanceOpenedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_instance_opened"),
    metadata: zod_1.z
        .object({
        source: zod_1.z.enum(["direct", "feed", "share_link", "embed"]),
        referrer: zod_1.z.string().optional(),
        isFirstTime: zod_1.z.boolean(),
        deviceType: zod_1.z.enum(["desktop", "tablet", "mobile"]),
    })
        .optional(),
});
exports.ToolInstanceSubmittedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_instance_submitted"),
    metadata: zod_1.z
        .object({
        completionTime: zod_1.z.number(), // seconds
        elementsInteracted: zod_1.z.number(),
        validationErrors: zod_1.z.number(),
        dataSize: zod_1.z.number(), // bytes
        isAnonymous: zod_1.z.boolean(),
        retryCount: zod_1.z.number(),
    })
        .optional(),
});
exports.ToolElementInteractedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_element_interacted"),
    metadata: zod_1.z
        .object({
        interactionType: zod_1.z.enum(["click", "input", "select", "drag", "hover"]),
        elementPosition: zod_1.z.object({ x: zod_1.z.number(), y: zod_1.z.number() }),
        valueChanged: zod_1.z.boolean(),
        timeOnElement: zod_1.z.number(), // milliseconds
        previousElement: zod_1.z.string().optional(),
        nextElement: zod_1.z.string().optional(),
    })
        .optional(),
});
// Sharing & Distribution Events
exports.ShareLinkCreatedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("share_link_created"),
    metadata: zod_1.z
        .object({
        shareType: zod_1.z.enum(["view", "edit", "fork"]),
        hasExpiration: zod_1.z.boolean(),
        shareMethod: zod_1.z.enum(["direct_link", "social", "embed"]),
        recipientCount: zod_1.z.number().optional(),
    })
        .optional(),
});
exports.ToolForkedEventSchema = exports.CreationAnalyticsEventSchema.extend({
    eventType: zod_1.z.literal("tool_forked"),
    metadata: zod_1.z
        .object({
        originalToolId: zod_1.z.string(),
        originalToolName: zod_1.z.string(),
        elementsCount: zod_1.z.number(),
        modificationsBeforeFork: zod_1.z.number(),
        forkReason: zod_1.z.enum(["customize", "learn", "remix", "backup"]).optional(),
    })
        .optional(),
});
// Element popularity and usage tracking
exports.ElementPopularitySchema = zod_1.z.object({
    elementId: zod_1.z.string(),
    elementType: zod_1.z.string(),
    usageCount: zod_1.z.number(),
    configurationComplexity: zod_1.z.object({
        basic: zod_1.z.number(),
        advanced: zod_1.z.number(),
    }),
    popularPresets: zod_1.z.array(zod_1.z.object({
        presetId: zod_1.z.string(),
        usageCount: zod_1.z.number(),
    })),
    averageConfigTime: zod_1.z.number(), // seconds
    errorRate: zod_1.z.number(), // percentage
    retentionRate: zod_1.z.number(), // percentage of elements that stay in final tool
});
// Tool performance metrics
exports.ToolPerformanceSchema = zod_1.z.object({
    toolId: zod_1.z.string(),
    metrics: zod_1.z.object({
        averageLoadTime: zod_1.z.number(), // milliseconds
        averageRenderTime: zod_1.z.number(), // milliseconds
        errorRate: zod_1.z.number(), // percentage
        completionRate: zod_1.z.number(), // percentage
        abandonmentRate: zod_1.z.number(), // percentage
        averageSessionDuration: zod_1.z.number(), // seconds
        elementsPerTool: zod_1.z.number(),
        configComplexityScore: zod_1.z.number(), // 1-10 scale
    }),
    timeframe: zod_1.z.object({
        start: zod_1.z.date(),
        end: zod_1.z.date(),
    }),
});
// Builder behavior insights
exports.BuilderBehaviorSchema = zod_1.z.object({
    userIdHash: zod_1.z.string(),
    insights: zod_1.z.object({
        preferredElements: zod_1.z.array(zod_1.z.string()),
        averageToolComplexity: zod_1.z.number(),
        buildingPatterns: zod_1.z.array(zod_1.z.string()),
        commonMistakes: zod_1.z.array(zod_1.z.string()),
        learningProgression: zod_1.z.object({
            beginnerElements: zod_1.z.number(),
            intermediateElements: zod_1.z.number(),
            advancedElements: zod_1.z.number(),
        }),
        collaborationStyle: zod_1.z.enum(["solo", "collaborative", "mixed"]),
        shareFrequency: zod_1.z.enum(["never", "rarely", "sometimes", "often", "always"]),
    }),
    timeframe: zod_1.z.object({
        start: zod_1.z.date(),
        end: zod_1.z.date(),
    }),
});
// Utility functions for analytics
const hashUserId = (userId) => {
    // In a real implementation, use a proper crypto library
    // This is a simplified example
    return btoa(userId)
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, 16);
};
exports.hashUserId = hashUserId;
const createAnalyticsEvent = (eventType, context) => {
    return {
        eventType,
        eventId: crypto.randomUUID(),
        timestamp: new Date(),
        userIdHash: context.userId ? (0, exports.hashUserId)(context.userId) : undefined,
        sessionId: context.sessionId,
        toolId: context.toolId,
        elementId: context.elementId,
        metadata: context.metadata,
        optedOut: false,
        anonymized: false,
    };
};
exports.createAnalyticsEvent = createAnalyticsEvent;
const shouldTrackEvent = (eventType, userPreferences = {}) => {
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
exports.shouldTrackEvent = shouldTrackEvent;
// Event batching for performance
const batchAnalyticsEvents = (events, maxBatchSize = 100) => {
    const batches = [];
    for (let i = 0; i < events.length; i += maxBatchSize) {
        batches.push(events.slice(i, i + maxBatchSize));
    }
    return batches;
};
exports.batchAnalyticsEvents = batchAnalyticsEvents;
// Privacy-compliant data retention
const shouldRetainEvent = (event, retentionDays = 90) => {
    const eventAge = Date.now() - event.timestamp.getTime();
    const maxAge = retentionDays * 24 * 60 * 60 * 1000; // Convert to milliseconds
    return eventAge < maxAge;
};
exports.shouldRetainEvent = shouldRetainEvent;
//# sourceMappingURL=creation.js.map