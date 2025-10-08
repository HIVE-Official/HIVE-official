/**
 * ToolArchivedEvent
 * Fired when a tool is archived and removed from active use
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolArchivedEvent extends DomainEvent {
    readonly toolName: string;
    constructor(aggregateId: string, toolName: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=tool-archived.event.d.ts.map