// Bounded Context Owner: HiveLab Guild
import {
  type RunTestReport,
  type ToolDefinition,
  type ToolSnapshot,
  runToolTest,
  lookupElementDefinition
} from "@core";
import { toolService } from "./service";
import { getToolTelemetry } from "./telemetry";

function snapshotToDefinition(snapshot: ToolSnapshot): ToolDefinition {
  const definition = snapshot.authoring;
  return {
    slug: definition.slug || snapshot.id,
    version: definition.version || (snapshot.version > 0 ? `v${snapshot.version}` : "draft"),
    title: definition.title || snapshot.name,
    emoji: definition.emoji ?? snapshot.icon,
    audience: definition.audience,
    placement: {
      start: definition.placement.start,
      live: definition.placement.live,
      board: definition.placement.board,
      dock: definition.placement.dock
    },
    time: definition.time ? { finishBy: definition.time.finishBy } : undefined,
    elements: definition.elements.map((element) => ({
      id: element.id,
      config: { ...element.config },
      attachedEventId: element.attachedEventId ?? null
    })),
    settings: {
      reminders: { ...(definition.settings.reminders ?? {}) },
      anonymous: definition.settings.anonymous ?? false,
      quietReports: definition.settings.quietReports ?? true,
      overflow: definition.settings.overflow
    }
  };
}

const catalogLookup = (id: string) => lookupElementDefinition(id);

const TEN_MINUTES_MS = 10 * 60 * 1000;

export interface RunTestResponse {
  readonly lastRunAt: string;
  readonly report: RunTestReport;
  readonly snapshot: ToolSnapshot;
}

export async function executeRunTest(tool: ToolSnapshot): Promise<RunTestResponse> {
  const definition = snapshotToDefinition(tool);
  const telemetry = getToolTelemetry();

  await telemetry.recordInteraction({
    toolId: tool.id,
    performedBy: tool.createdBy,
    event: "run_test_click",
    metadata: {
      toolVersion: tool.version,
      status: tool.status,
      elementCount: tool.authoring.elements.length
    }
  });

  const report = runToolTest(definition, catalogLookup);

  const runAt = new Date(report.generatedAt);
  const blockingIssueCount = report.issues.filter((issue) => issue.severity === "block").length;
  const warningCount = report.issues.filter((issue) => issue.severity === "warn").length;

  const recordResult = await toolService.recordTestResult({
    toolId: tool.id,
    runAt,
    blockingIssueCount,
    health: report.health
  });

  await telemetry.recordInteraction({
    toolId: tool.id,
    performedBy: tool.createdBy,
    event: blockingIssueCount > 0 ? "lint.fix_required" : warningCount > 0 ? "lint.heads_up" : "lint.clean",
    metadata: {
      blockingIssueCount,
      warningCount,
      health: report.health
    }
  });

  const snapshot = recordResult.ok ? recordResult.value : tool;

  return {
    lastRunAt: report.generatedAt,
    report,
    snapshot
  };
}

export function validatePublishGate(tool: ToolSnapshot): { ok: true } | { ok: false; code: string; message: string } {
  const meta = tool.lastTest;
  if (!meta) {
    return {
      ok: false,
      code: "RUN_TEST_REQUIRED",
      message: "Run Test must be completed within 10 minutes before publishing."
    };
  }

  if (!meta.lastRunAt) {
    return {
      ok: false,
      code: "RUN_TEST_REQUIRED",
      message: "Run Test must be completed within 10 minutes before publishing."
    };
  }

  const age = Date.now() - meta.lastRunAt.getTime();
  if (age > TEN_MINUTES_MS) {
    return {
      ok: false,
      code: "RUN_TEST_STALE",
      message: "Run Test is older than 10 minutes. Please re-run before publishing."
    };
  }

  if (meta.blockingIssueCount > 0 || meta.health === "fix_required") {
    return {
      ok: false,
      code: "BLOCKING_LINTS",
      message: "Fix blocking issues before publishing."
    };
  }

  return { ok: true };
}
