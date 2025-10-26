// Bounded Context Owner: HiveLab Guild
import type {
  ToolTelemetryPort,
  ToolPublishTelemetry,
  ToolDeployTelemetry,
  ToolUsageTelemetry,
  ToolDeploymentReconciledTelemetry,
  ToolInteractionTelemetry
} from "@core";

export class ConsoleToolTelemetry implements ToolTelemetryPort {
  async recordPublish(event: ToolPublishTelemetry): Promise<void> {
    const channel = event.outcome === "success" ? console.warn : console.warn;
    channel("tool.publish", event);
    await Promise.resolve();
  }

  async recordDeploy(event: ToolDeployTelemetry): Promise<void> {
    const channel = event.outcome === "success" ? console.warn : console.warn;
    channel("tool.deploy", event);
    await Promise.resolve();
  }

  async recordUsage(event: ToolUsageTelemetry): Promise<void> {
    console.warn("tool.usage", event);
    await Promise.resolve();
  }

  async recordDeploymentReconciled(event: ToolDeploymentReconciledTelemetry): Promise<void> {
    console.warn("tool.deployment_reconciled", event);
    await Promise.resolve();
  }

  async recordInteraction(event: ToolInteractionTelemetry): Promise<void> {
    console.warn(`tool.${event.event}`, event);
    await Promise.resolve();
  }
}
