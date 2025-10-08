/**
 * ToolCreatedEvent
 * Fired when a new tool is created in HiveLab
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolCreatedEvent extends DomainEvent {
    readonly toolName: string;
    readonly creatorId: string;
    readonly spaceId?: string;
    constructor(aggregateId: string, toolName: string, creatorId: string, spaceId?: string);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=tool-created.event.d.ts.map