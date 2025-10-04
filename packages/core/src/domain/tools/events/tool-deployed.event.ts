/**
 * ToolDeployedEvent
 * Fired when a tool is deployed to one or more spaces
 */

import { DomainEvent } from '../../shared/base/DomainEvent.base';

export class ToolDeployedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly toolName: string,
    public readonly spaceIds: string[],
    public readonly totalDeployments: number
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'ToolDeployed';
  }

  toData(): any {
    return {
      eventType: this.getEventName(),
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt,
      toolName: this.toolName,
      spaceIds: this.spaceIds,
      totalDeployments: this.totalDeployments
    };
  }
}
