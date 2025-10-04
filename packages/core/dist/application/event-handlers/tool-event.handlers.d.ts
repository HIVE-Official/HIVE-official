/**
 * Tool Domain Event Handlers
 * Handle cross-aggregate communication when tool events occur
 */
import { EventHandler } from '../../infrastructure/events';
import { ToolCreatedEvent } from '../../domain/tools/events/tool-created.event';
import { ToolPublishedEvent } from '../../domain/tools/events/tool-published.event';
import { ToolUsedEvent } from '../../domain/tools/events/tool-used.event';
import { ToolForkedEvent } from '../../domain/tools/events/tool-forked.event';
/**
 * When a tool is created:
 * 1. Track creation analytics
 * 2. Add to creator's tool list
 */
export declare const handleToolCreated: EventHandler<ToolCreatedEvent>;
/**
 * When a tool is published:
 * 1. Add to HiveLab template browser
 * 2. Notify space members if space tool
 * 3. Track publish analytics
 */
export declare const handleToolPublished: EventHandler<ToolPublishedEvent>;
/**
 * When a tool is used:
 * 1. Increment usage count
 * 2. Update tool popularity score
 * 3. Track usage analytics
 */
export declare const handleToolUsed: EventHandler<ToolUsedEvent>;
/**
 * When a tool is forked:
 * 1. Create copy with new owner
 * 2. Link to original tool
 * 3. Notify original creator
 */
export declare const handleToolForked: EventHandler<ToolForkedEvent>;
//# sourceMappingURL=tool-event.handlers.d.ts.map