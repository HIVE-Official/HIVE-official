/**
 * ToolUsedEvent
 * Fired when a tool is used by a student
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolUsedEvent extends DomainEvent {
    readonly toolName: string;
    readonly userId: string;
    readonly totalUses: number;
    constructor(aggregateId: string, toolName: string, userId: string, totalUses: number);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=tool-used.event.d.ts.map