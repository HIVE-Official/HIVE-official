"use strict";
/**
 * Event Handler Registry
 * Central location for registering all domain event handlers
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEventHandlers = registerEventHandlers;
const events_1 = require("../../infrastructure/events");
// Profile event handlers
const profile_event_handlers_1 = require("./profile-event.handlers");
// Space event handlers
const space_event_handlers_1 = require("./space-event.handlers");
// Ritual event handlers
const ritual_event_handlers_1 = require("./ritual-event.handlers");
// Tool event handlers
const tool_event_handlers_1 = require("./tool-event.handlers");
/**
 * Register all event handlers with the event bus
 * Call this once during application initialization
 */
function registerEventHandlers() {
    const eventBus = (0, events_1.getEventBus)({ enableLogging: true });
    // Profile events
    eventBus.subscribe('ProfileCreated', profile_event_handlers_1.handleProfileCreated);
    eventBus.subscribe('ProfileOnboarded', profile_event_handlers_1.handleProfileOnboarded);
    // Space events
    eventBus.subscribe('SpaceCreated', space_event_handlers_1.handleSpaceCreated);
    eventBus.subscribe('MemberJoined', space_event_handlers_1.handleMemberJoined);
    eventBus.subscribe('PostCreated', space_event_handlers_1.handlePostCreated);
    eventBus.subscribe('MemberRemoved', space_event_handlers_1.handleMemberRemoved);
    // Ritual events
    eventBus.subscribe('RitualCreated', ritual_event_handlers_1.handleRitualCreated);
    eventBus.subscribe('ParticipantJoined', ritual_event_handlers_1.handleParticipantJoined);
    eventBus.subscribe('MilestoneCompleted', ritual_event_handlers_1.handleMilestoneCompleted);
    eventBus.subscribe('RitualActivated', ritual_event_handlers_1.handleRitualActivated);
    // Tool events
    eventBus.subscribe('ToolCreated', tool_event_handlers_1.handleToolCreated);
    eventBus.subscribe('ToolPublished', tool_event_handlers_1.handleToolPublished);
    eventBus.subscribe('ToolUsed', tool_event_handlers_1.handleToolUsed);
    eventBus.subscribe('ToolForked', tool_event_handlers_1.handleToolForked);
    console.log('[EventHandlers] All domain event handlers registered');
    console.log(`[EventHandlers] Total event types: ${eventBus.getRegisteredEvents().length}`);
}
// Export all handlers for testing
__exportStar(require("./profile-event.handlers"), exports);
__exportStar(require("./space-event.handlers"), exports);
__exportStar(require("./ritual-event.handlers"), exports);
__exportStar(require("./tool-event.handlers"), exports);
//# sourceMappingURL=index.js.map