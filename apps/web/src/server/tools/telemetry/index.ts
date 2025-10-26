// Bounded Context Owner: HiveLab Guild
import type { ToolTelemetryPort } from "@core";
import { firebaseFirestore } from "@hive/firebase";
import { ConsoleToolTelemetry } from "./console-tool-telemetry";
import { FirestoreToolTelemetry } from "./firestore-tool-telemetry";

let cachedTelemetry: ToolTelemetryPort | null = null;

export const getToolTelemetry = (): ToolTelemetryPort => {
  if (cachedTelemetry) {
    return cachedTelemetry;
  }

  try {
    // Ensure credentials are configured before returning the Firestore-backed telemetry.
    firebaseFirestore();
    const telemetry = new FirestoreToolTelemetry();
    cachedTelemetry = telemetry;
    return telemetry;
  } catch (error) {
    console.warn("Falling back to console tool telemetry", error);
    const telemetry = new ConsoleToolTelemetry();
    cachedTelemetry = telemetry;
    return telemetry;
  }
};
