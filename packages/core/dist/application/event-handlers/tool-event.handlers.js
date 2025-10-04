"use strict";
/**
 * Tool Domain Event Handlers
 * Handle cross-aggregate communication when tool events occur
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleToolForked = exports.handleToolUsed = exports.handleToolPublished = exports.handleToolCreated = void 0;
/**
 * When a tool is created:
 * 1. Track creation analytics
 * 2. Add to creator's tool list
 */
const handleToolCreated = async (event) => {
    console.log(`[ToolEventHandler] Tool created: ${event.toolName} by ${event.createdBy}`);
    try {
        // TODO: Track tool creation analytics
        // TODO: Add to creator's published tools
    }
    catch (error) {
        console.error('[ToolEventHandler] Failed to handle tool created:', error);
    }
};
exports.handleToolCreated = handleToolCreated;
/**
 * When a tool is published:
 * 1. Add to HiveLab template browser
 * 2. Notify space members if space tool
 * 3. Track publish analytics
 */
const handleToolPublished = async (event) => {
    console.log(`[ToolEventHandler] Tool published: ${event.aggregateId} by ${event.publishedBy}`);
    try {
        // TODO: Add to template browser
        // TODO: Send notifications to relevant users
        // TODO: Track publish analytics
    }
    catch (error) {
        console.error('[ToolEventHandler] Failed to handle tool published:', error);
    }
};
exports.handleToolPublished = handleToolPublished;
/**
 * When a tool is used:
 * 1. Increment usage count
 * 2. Update tool popularity score
 * 3. Track usage analytics
 */
const handleToolUsed = async (event) => {
    console.log(`[ToolEventHandler] Tool used: ${event.aggregateId} by ${event.usedBy}`);
    try {
        // TODO: Increment usage counter
        // TODO: Update popularity/trending score
        // TODO: Track detailed usage analytics
    }
    catch (error) {
        console.error('[ToolEventHandler] Failed to handle tool used:', error);
    }
};
exports.handleToolUsed = handleToolUsed;
/**
 * When a tool is forked:
 * 1. Create copy with new owner
 * 2. Link to original tool
 * 3. Notify original creator
 */
const handleToolForked = async (event) => {
    console.log(`[ToolEventHandler] Tool forked: ${event.aggregateId} by ${event.forkedBy}`);
    try {
        // TODO: Track fork relationship
        // TODO: Send notification to original creator
        // TODO: Track fork analytics
    }
    catch (error) {
        console.error('[ToolEventHandler] Failed to handle tool forked:', error);
    }
};
exports.handleToolForked = handleToolForked;
//# sourceMappingURL=tool-event.handlers.js.map