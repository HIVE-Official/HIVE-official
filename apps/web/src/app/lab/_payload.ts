// Bounded Context Owner: HiveLab Guild
// Minimal sample payload builder for the Canvas shell UI.
// This is UI-only scaffolding to align with the v1 IA and show Limited run.

import type {
  HiveLabCanvasShellPayload,
  HiveLabCanvasSystemTile,
  HiveLabCanvasToolListItem,
  HiveLabCanvasToolHome,
  HiveLabCanvasLeaderPermissions,
} from "@hive/ui";

const demoSystemTiles: HiveLabCanvasSystemTile[] = [
  { id: "events", state: "live" },
  { id: "chat", state: "idle" },
  { id: "about", state: "idle" }
];

const demoTools = (_spaceId: string): HiveLabCanvasToolListItem[] => [
  {
    id: "tool-rsvp-checkin",
    name: "RSVP + Check‑in",
    icon: "🗓️",
    status: "limited_run",
    limitedRunDaysRemaining: 14,
    placements: { start: true, live: true, board: "on_input", manage: true },
    lastEditedAt: new Date().toISOString(),
  },
  {
    id: "tool-file-submit",
    name: "File Submit (Finish‑by)",
    icon: "📎",
    status: "idle",
    placements: { start: true, live: false, board: "recap_only", manage: true },
    lastEditedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  }
];

const demoActiveTool = (spaceId: string): HiveLabCanvasToolHome => ({
  tool: {
    id: "tool-rsvp-checkin",
    title: "RSVP + Check‑in",
    description: "Collect RSVPs and take attendance when it starts.",
    icon: "🗓️",
    versionLabel: "v0.1",
    lastSavedAt: new Date().toISOString(),
  },
  health: {
    lastRunAt: new Date().toISOString(),
    freshness: "fresh",
    health: "looks_good",
    blockingIssues: 0,
    runTestHref: `/lab/${spaceId}?test=1`,
  },
  summary: {
    projectedCompletions: 42,
    completionRate: 0.76,
    expectedBoardPosts: 1,
    expectedLiveInteractions: 84,
  },
  placements: {
    audience: "members",
    placements: { start: true, live: true, board: "on_input", calendar: true, dock: false },
    elements: [
      { id: "rsvp", name: "RSVP", fieldsUsed: 1, attachedEventId: null, pii: false, extendsEvents: true },
      { id: "checkin", name: "Check‑in", fieldsUsed: 1, attachedEventId: null, pii: false, extendsEvents: true },
    ],
    fieldsUsed: 2,
    hasPII: false,
  },
  countdown: {
    status: "limited_run",
    daysRemaining: 14,
    endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  deployments: {
    total: 1,
    items: [
      { spaceId, spaceName: "Demo Space", pinnedVersion: 1, lastDeployedAt: new Date().toISOString() },
    ],
  },
  lints: { blocks: [], warnings: [] },
  actions: {
    canRunTest: true,
    canPublish: true,
    publishHref: `/lab/${spaceId}?publish=1`,
    runTestHref: `/lab/${spaceId}?test=1`,
    viewAsStudentHref: `/spaces/${spaceId}`,
  },
  telemetry: {
    interactionSurface: "tool_home",
    runTestEvent: "hivelab.run_test_click",
    publishEvent: "hivelab.publish_click",
  },
});

const demoPermissions: HiveLabCanvasLeaderPermissions = {
  canSwitchSpaces: true,
  canPublish: true,
  countdownVisible: true,
  requiresApproval: false,
};

export interface OverlayQueryFlags {
  readonly libraryOpen?: boolean;
  readonly runTestOpen?: boolean;
  readonly publishOpen?: boolean;
  readonly lintDrawerOpen?: boolean;
  readonly replacePickerOpen?: boolean;
}

export function buildSamplePayload(spaceId: string, overlays?: OverlayQueryFlags): HiveLabCanvasShellPayload {
  return {
    space: {
      id: spaceId,
      name: spaceId.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
      avatarUrl: null,
      campusId: "ub-buffalo",
      isDefault: true,
      recentTools: ["tool-rsvp-checkin"],
    },
    systemTiles: demoSystemTiles,
    tools: demoTools(spaceId),
    drafts: { count: 1, href: `/lab/${spaceId}?drafts=1` },
    activeTool: demoActiveTool(spaceId),
    overlays: {
      libraryOpen: overlays?.libraryOpen ?? false,
      runTestOpen: overlays?.runTestOpen ?? false,
      publishOpen: overlays?.publishOpen ?? false,
      lintDrawerOpen: overlays?.lintDrawerOpen ?? false,
      replacePickerOpen: overlays?.replacePickerOpen ?? false,
    },
    permissions: demoPermissions,
    telemetry: { spaceId, leaderId: "profile-demo-leader", surface: "canvas_shell" },
    generatedAt: new Date().toISOString(),
  };
}
