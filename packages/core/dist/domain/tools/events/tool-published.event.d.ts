/**
 * ToolPublishedEvent
 * Fired when a tool is published and made available to others
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolPublishedEvent extends DomainEvent {
    readonly toolName: string;
    readonly visibility: string;
    constructor(aggregateId: string, toolName: string, visibility: string);
    getEventName(): string;
}
//# sourceMappingURL=tool-published.event.d.ts.map