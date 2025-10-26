// Bounded Context Owner: HiveLab Guild

export interface ToolPublishTelemetry {
  readonly toolId: string;
  readonly performedBy: string;
  readonly stage: "limited_run" | "certified";
  readonly outcome: "success" | "failure";
  readonly error?: string;
}

export interface ToolDeployTelemetry {
  readonly toolId: string;
  readonly performedBy: string;
  readonly spaceIds: readonly string[];
  readonly outcome: "success" | "failure";
  readonly error?: string;
}

export interface ToolUsageTelemetry {
  readonly toolId: string;
  readonly performedBy: string;
}

export interface ToolDeploymentReconciledTelemetry {
  readonly toolId: string;
  readonly removedSpaceIds: readonly string[];
  readonly remainingSpaceIds: readonly string[];
}

export interface ToolInteractionTelemetry {
  readonly toolId: string;
  readonly performedBy: string;
  readonly event: string;
  readonly metadata?: Record<string, unknown>;
}

export interface ToolTelemetryPort {
  recordPublish(event: ToolPublishTelemetry): Promise<void>;
  recordDeploy(event: ToolDeployTelemetry): Promise<void>;
  recordUsage(event: ToolUsageTelemetry): Promise<void>;
  recordDeploymentReconciled(event: ToolDeploymentReconciledTelemetry): Promise<void>;
  recordInteraction(event: ToolInteractionTelemetry): Promise<void>;
}
