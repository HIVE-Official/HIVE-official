// Bounded Context Owner: HiveLab Guild
import type {
  ToolTelemetryPort,
  ToolPublishTelemetry,
  ToolDeployTelemetry,
  ToolUsageTelemetry,
  ToolDeploymentReconciledTelemetry,
  ToolInteractionTelemetry
} from "@core";
import { firebaseFirestore } from "@hive/firebase";

const collection = () => firebaseFirestore().collection("tool_events");

const withTimestamp = <T extends Record<string, unknown>>(event: T) => ({
  ...event,
  recordedAt: new Date()
});

export class FirestoreToolTelemetry implements ToolTelemetryPort {
  async recordPublish(event: ToolPublishTelemetry): Promise<void> {
    await collection().add(
      withTimestamp({
        type: "publish",
        ...event
      })
    );
  }

  async recordDeploy(event: ToolDeployTelemetry): Promise<void> {
    await collection().add(
      withTimestamp({
        type: "deploy",
        ...event
      })
    );
  }

  async recordUsage(event: ToolUsageTelemetry): Promise<void> {
    await collection().add(
      withTimestamp({
        type: "usage",
        ...event
      })
    );
  }

  async recordDeploymentReconciled(event: ToolDeploymentReconciledTelemetry): Promise<void> {
    await collection().add(
      withTimestamp({
        type: "deployment_reconciled",
        ...event
      })
    );
  }

  async recordInteraction(event: ToolInteractionTelemetry): Promise<void> {
    await collection().add(
      withTimestamp({
        type: "interaction",
        ...event
      })
    );
  }
}
