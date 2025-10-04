/**
 * ToolForkedEvent
 * Fired when a tool is forked by another user
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolForkedEvent extends DomainEvent {
    readonly forkedToolId: string;
    readonly forkedBy: string;
    readonly totalForks: number;
    constructor(aggregateId: string, // Original tool ID
    forkedToolId: string, forkedBy: string, totalForks: number);
    getEventName(): string;
}
//# sourceMappingURL=tool-forked.event.d.ts.map