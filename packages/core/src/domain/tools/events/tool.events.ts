// Bounded Context Owner: HiveLab Guild

export interface ToolCreatedEvent {
  readonly type: "ToolCreated";
  readonly payload: {
    readonly toolId: string;
    readonly createdBy: string;
  };
}

export interface ToolPublishedEvent {
  readonly type: "ToolPublished";
  readonly payload: {
    readonly toolId: string;
    readonly stage: "limited_run" | "certified";
    readonly publishedAt: Date;
    readonly limitedRunEndsAt?: Date;
    readonly version: number;
  };
}

export interface ToolVisibilityUpdatedEvent {
  readonly type: "ToolVisibilityUpdated";
  readonly payload: {
    readonly toolId: string;
    readonly visibility: string;
  };
}

export interface ToolDeployedEvent {
  readonly type: "ToolDeployed";
  readonly payload: {
    readonly toolId: string;
    readonly spaceIds: readonly string[];
  };
}

export interface ToolUsageRecordedEvent {
  readonly type: "ToolUsageRecorded";
  readonly payload: {
    readonly toolId: string;
    readonly profileId: string;
  };
}

export type ToolDomainEvent =
  | ToolCreatedEvent
  | ToolPublishedEvent
  | ToolVisibilityUpdatedEvent
  | ToolDeployedEvent
  | ToolUsageRecordedEvent;
