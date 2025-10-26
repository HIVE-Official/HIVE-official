"use client";

import { HiveLabShell } from "@hive/ui";
import { buildHiveLabDemoPayload } from "../../../fixtures/hivelab";

export default function HiveLabCanvasPage(): JSX.Element {
  const payload = buildHiveLabDemoPayload("space-robotics");
  return (
    <div className="min-h-[70vh]">
      <HiveLabShell payload={payload} />
    </div>
  );
}
