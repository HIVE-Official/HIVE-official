/**
 * ToolDeployedEvent
 * Fired when a tool is deployed to one or more spaces
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ToolDeployedEvent extends DomainEvent {
    readonly toolName: string;
    readonly spaceIds: string[];
    readonly totalDeployments: number;
    constructor(aggregateId: string, toolName: string, spaceIds: string[], totalDeployments: number);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=tool-deployed.event.d.ts.map