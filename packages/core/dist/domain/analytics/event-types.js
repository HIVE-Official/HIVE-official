"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLandingPageViewEvent = createLandingPageViewEvent;
exports.createCTAClickEvent = createCTAClickEvent;
exports.createScrollDepthEvent = createScrollDepthEvent;
// Event creation functions
function createLandingPageViewEvent(sessionId, properties, context) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        event: "landing_page_view",
        category: "page_view",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "development",
            buildId: "",
            region: "",
            processed: false,
        },
    };
}
function createCTAClickEvent(sessionId, properties, context, userId) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        userId,
        event: "cta_click",
        category: "conversion",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "development",
            buildId: "",
            region: "",
            processed: false,
        },
    };
}
function createScrollDepthEvent(sessionId, properties, context, userId) {
    return {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        sessionId,
        userId,
        event: "scroll_depth",
        category: "engagement",
        properties,
        context,
        metadata: {
            version: "1.0.0",
            environment: "development",
            buildId: "",
            region: "",
            processed: false,
        },
    };
}
//# sourceMappingURL=event-types.js.map