// Bounded Context Owner: HiveLab Guild
// Runtime compiler and helpers for Lab → Spaces bridging.
// Based on specs:
// - docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md
// - docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md

import {
  type ElementDefinition,
  type LintIssue,
  type ToolDefinition,
  type ToolRuntimeSnapshot,
  boardModeSchema
} from "./contracts";
import {
  type ElementCatalogLookup,
  countFieldsUsed
} from "./authoring-utils";
import { lintToolDefinition } from "./lint";

export function computeToolRuntimeSnapshot(
  input: ToolDefinition,
  lookup: ElementCatalogLookup
): ToolRuntimeSnapshot {
  const catalogMatches = input.elements
    .map((element) => lookup(element.id))
    .filter(Boolean) as ElementDefinition[];

  const hasPII = catalogMatches.some((definition) => definition.pii === true);
  const hasTime = Boolean(input.time?.finishBy);
  const hasEventExtends = catalogMatches.some((definition) => definition.extends === "events");

  const placement = {
    start: input.placement.start,
    live: input.placement.live,
    board: input.placement.board,
    calendar: hasTime || hasEventExtends
  } as const;

  return {
    toolId: input.slug,
    version: input.version,
    status: "draft",
    limited_run_ends_at: undefined,
    placement,
    audience: input.audience,
    dock: input.placement.dock,
    fieldsCount: countFieldsUsed(input, lookup),
    hasPII,
    attachedEventId: input.elements.find((element) => element.attachedEventId)?.attachedEventId ?? null
  };
}

export function coerceBoardMode(value: unknown) {
  const parsed = boardModeSchema.safeParse(value);
  return parsed.success ? parsed.data : "off";
}

export type RunTestHealth = "looks_good" | "heads_up" | "fix_required";

export interface RunTestTimelineEntry {
  readonly id: string;
  readonly label: string;
  readonly kind: "milestone" | "reminder";
  readonly at: string | null;
  readonly offsetMinutes?: number;
}

export interface RunTestPostingSummary {
  readonly mode: "none" | "input" | "recap";
  readonly note?: string;
}

export interface RunTestAttachStatus {
  readonly attachedEventId: string | null;
  readonly required: boolean;
}

export interface RunTestStudentPreview {
  readonly start: boolean;
  readonly live: boolean;
  readonly board: boolean;
  readonly calendar: boolean;
  readonly summary: string;
}

export interface RunTestGhostRosterOption {
  readonly size: number;
  readonly projectedCompletions: number;
  readonly projectedCompletionRate: number;
  readonly note: string;
}

export interface RunTestFastForwardSnapshot {
  readonly id: "now" | "plus_10m" | "plus_24h" | "plus_48h";
  readonly label: string;
  readonly at: string;
  readonly minutesAhead: number;
  readonly projectedCompletions: number;
  readonly completionRate: number;
  readonly remindersTriggered: readonly string[];
  readonly summary: string;
}

export interface RunTestResultsSnapshot {
  readonly projectedCompletions: number;
  readonly completionRate: number;
  readonly expectedBoardPosts: number;
  readonly expectedLiveInteractions: number;
}

export interface RunTestReport {
  readonly generatedAt: string;
  readonly runtime: ToolRuntimeSnapshot;
  readonly health: RunTestHealth;
  readonly issues: readonly LintIssue[];
  readonly timeline: readonly RunTestTimelineEntry[];
  readonly posting: RunTestPostingSummary;
  readonly attachStatus: RunTestAttachStatus;
  readonly preview: RunTestStudentPreview;
  readonly ghostRoster: readonly RunTestGhostRosterOption[];
  readonly fastForward: readonly RunTestFastForwardSnapshot[];
  readonly results: RunTestResultsSnapshot;
}

export function runToolTest(
  definition: ToolDefinition,
  lookup: ElementCatalogLookup
): RunTestReport {
  const generatedAt = new Date().toISOString();
  const runtime = computeToolRuntimeSnapshot(definition, lookup);
  const issues = lintToolDefinition(definition, lookup);
  const health = deriveHealth(issues);
  const timeline = buildTimeline(definition, runtime, generatedAt);
  const posting = derivePosting(definition.placement.board);
  const requiresAttach = definition.elements.some((element) => lookup(element.id)?.extends === "events");

  const attachedEventId = (runtime.attachedEventId ?? null) as string | null;
  const preview = buildStudentPreview(runtime);
  const baseCompletionRate = computeBaseCompletionRate(definition, runtime);
  const ghostRoster = buildGhostRosterOptions(baseCompletionRate);
  const fastForward = buildFastForwardSnapshots({
    generatedAt,
    baseCompletionRate,
    reminders: definition.settings.reminders ?? {},
    baselineSize: ghostRoster[1]?.size ?? ghostRoster[0]?.size ?? 100
  });
  const results = buildResultsSnapshot({
    ghostRoster,
    baseCompletionRate,
    placement: definition.placement,
    liveEnabled: runtime.placement.live
  });

  return {
    generatedAt,
    runtime,
    health,
    issues,
    timeline,
    posting,
    attachStatus: {
      attachedEventId,
      required: requiresAttach
    },
    preview,
    ghostRoster,
    fastForward,
    results
  };
}

function deriveHealth(issues: readonly LintIssue[]): RunTestHealth {
  if (issues.some((issue) => issue.severity === "block")) {
    return "fix_required";
  }
  if (issues.length > 0) {
    return "heads_up";
  }
  return "looks_good";
}

function buildTimeline(
  definition: ToolDefinition,
  runtime: ToolRuntimeSnapshot,
  generatedAt: string
): RunTestTimelineEntry[] {
  const timeline: RunTestTimelineEntry[] = [
    { id: "now", label: "Now", kind: "milestone", at: generatedAt }
  ];

  if (definition.time?.finishBy) {
    timeline.push({
      id: "finish_by",
      label: "Finish by",
      kind: "milestone",
      at: definition.time.finishBy
    });
  }

  const reminders = definition.settings.reminders;
  if (reminders.h24) {
    timeline.push({
      id: "reminder_24h",
      label: "Reminder 24h before",
      kind: "reminder",
      at: null,
      offsetMinutes: -1440
    });
  }
  if (reminders.start) {
    timeline.push({
      id: "reminder_start",
      label: "Reminder at start",
      kind: "reminder",
      at: runtime.placement.calendar && definition.time?.finishBy ? definition.time.finishBy : null
    });
  }
  if (reminders.afterClose) {
    timeline.push({
      id: "reminder_after_close",
      label: "Follow-up after close",
      kind: "reminder",
      at: null,
      offsetMinutes: 60
    });
  }
  if (reminders.m10) {
    timeline.push({
      id: "reminder_10m",
      label: "Reminder 10m before",
      kind: "reminder",
      at: null,
      offsetMinutes: -10
    });
  }

  return timeline;
}

function derivePosting(boardMode: ToolDefinition["placement"]["board"]): RunTestPostingSummary {
  if (boardMode === "on_input") {
    return { mode: "input", note: "One thread opens when you ask for input." };
  }
  if (boardMode === "recap_only") {
    return { mode: "recap", note: "One recap posts at the end." };
  }
  return { mode: "none" };
}

const GHOST_ROSTER_SIZES = [25, 100, 400] as const;

const FAST_FORWARD_POINTS: ReadonlyArray<{
  readonly id: RunTestFastForwardSnapshot["id"];
  readonly label: string;
  readonly minutesAhead: number;
  readonly completionFraction: number;
}> = [
  { id: "now", label: "Now", minutesAhead: 0, completionFraction: 0.05 },
  { id: "plus_10m", label: "+10 min", minutesAhead: 10, completionFraction: 0.2 },
  { id: "plus_24h", label: "+24 hr", minutesAhead: 24 * 60, completionFraction: 0.85 },
  { id: "plus_48h", label: "+48 hr", minutesAhead: 48 * 60, completionFraction: 1 }
];

const REMINDER_LABELS: Record<string, string> = {
  h24: "24h reminder",
  start: "Start reminder",
  afterClose: "Post-close recap",
  m10: "10m reminder"
};

function buildStudentPreview(runtime: ToolRuntimeSnapshot): RunTestStudentPreview {
  const preview = {
    start: runtime.placement.start,
    live: runtime.placement.live,
    board: runtime.placement.board !== "off",
    calendar: runtime.placement.calendar,
    summary: ""
  } satisfies RunTestStudentPreview;

  const parts = [
    preview.start ? "Start shortcut available" : "Start shortcut hidden",
    preview.live ? "Live area on" : "Live area off",
    preview.board ? "Board thread active" : "Board stays quiet",
    preview.calendar ? "Calendar badge shown" : "No calendar badge"
  ];

  preview.summary = parts.join(" • ");
  return preview;
}

function computeBaseCompletionRate(
  definition: ToolDefinition,
  runtime: ToolRuntimeSnapshot
): number {
  let rate = 0.65;

  const fieldPenalty = Math.max(0, runtime.fieldsCount - 4) * 0.025;
  rate -= fieldPenalty;

  if (definition.settings.anonymous === true) {
    rate += 0.05;
  }
  if (runtime.hasPII) {
    rate -= 0.04;
  }
  if (definition.placement.board !== "off") {
    rate += 0.03;
  }
  if (definition.placement.start) {
    rate += 0.02;
  }
  if (runtime.placement.calendar) {
    rate += 0.04;
  }

  const reminders = definition.settings.reminders ?? {};
  if (reminders.h24) rate += 0.03;
  if (reminders.start) rate += 0.02;
  if (reminders.afterClose) rate += 0.01;
  if (reminders.m10) rate += 0.015;

  if (definition.settings.quietReports === false) {
    rate -= 0.015;
  }

  if (definition.settings.overflow === "attach_under_latest") {
    rate += 0.01;
  }

  return clamp(rate, 0.35, 0.92);
}

function buildGhostRosterOptions(baseCompletionRate: number): RunTestGhostRosterOption[] {
  const notes = [
    "Pilot (25 leaders/members)",
    "Launch (space average)",
    "Campus cohort"
  ];

  return GHOST_ROSTER_SIZES.map((size, index) => {
    const adjustment = 1 - index * 0.07;
    const completionRate = clamp(baseCompletionRate * adjustment, 0.28, 0.95);
    const projectedCompletions = Math.round(size * completionRate);

    return {
      size,
      projectedCompletions,
      projectedCompletionRate: Number(completionRate.toFixed(2)),
      note: notes[index] ?? ""
    } satisfies RunTestGhostRosterOption;
  });
}

function buildFastForwardSnapshots(input: {
  generatedAt: string;
  baseCompletionRate: number;
  reminders: ToolDefinition["settings"]["reminders"];
  baselineSize: number;
}): RunTestFastForwardSnapshot[] {
  const generated = new Date(input.generatedAt);
  const reminders = input.reminders ?? {};

  return FAST_FORWARD_POINTS.map((point) => {
    const completionRate = clamp(
      input.baseCompletionRate * point.completionFraction,
      0,
      input.baseCompletionRate
    );
    const projectedCompletions = Math.round(input.baselineSize * completionRate);
    const at = new Date(generated.getTime() + point.minutesAhead * 60 * 1000).toISOString();
    const remindersTriggered = deriveTriggeredReminders(reminders, point.minutesAhead);
    const summary = `${projectedCompletions} of ${input.baselineSize} projected responses`;

    return {
      id: point.id,
      label: point.label,
      at,
      minutesAhead: point.minutesAhead,
      projectedCompletions,
      completionRate: Number(completionRate.toFixed(2)),
      remindersTriggered,
      summary
    } satisfies RunTestFastForwardSnapshot;
  });
}

function buildResultsSnapshot(input: {
  ghostRoster: readonly RunTestGhostRosterOption[];
  baseCompletionRate: number;
  placement: ToolDefinition["placement"];
  liveEnabled: boolean;
}): RunTestResultsSnapshot {
  const anchor = input.ghostRoster[1] ?? input.ghostRoster[0] ?? {
    projectedCompletions: Math.round(100 * input.baseCompletionRate),
    projectedCompletionRate: Number(input.baseCompletionRate.toFixed(2))
  };

  const expectedBoardPosts = input.placement.board === "off" ? 0 : 1;
  const expectedLiveInteractions = input.liveEnabled
    ? Math.round(anchor.projectedCompletions * 0.4)
    : 0;

  return {
    projectedCompletions: anchor.projectedCompletions,
    completionRate: anchor.projectedCompletionRate,
    expectedBoardPosts,
    expectedLiveInteractions
  } satisfies RunTestResultsSnapshot;
}

function deriveTriggeredReminders(
  reminders: ToolDefinition["settings"]["reminders"],
  minutesAhead: number
): string[] {
  const labels: string[] = [];

  if (reminders?.m10 && minutesAhead >= 10) {
    labels.push(REMINDER_LABELS.m10);
  }
  if (reminders?.start && minutesAhead >= 0) {
    labels.push(REMINDER_LABELS.start);
  }
  if (reminders?.h24 && minutesAhead >= 24 * 60) {
    labels.push(REMINDER_LABELS.h24);
  }
  if (reminders?.afterClose && minutesAhead >= 48 * 60) {
    labels.push(REMINDER_LABELS.afterClose);
  }

  return labels;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
