// Bounded Context Owner: Community Guild
import type { SpacePostTelemetryPort } from "@core";
import { ConsoleSpacePostTelemetry } from "./console-space-post-telemetry";

let cachedTelemetry: SpacePostTelemetryPort | null = null;

export const getSpacePostTelemetry = (): SpacePostTelemetryPort => {
  if (!cachedTelemetry) {
    cachedTelemetry = new ConsoleSpacePostTelemetry();
  }
  return cachedTelemetry;
};
