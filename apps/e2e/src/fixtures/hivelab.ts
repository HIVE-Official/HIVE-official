import type { HiveLabCanvasShellPayload } from "@hive/ui";

export function buildHiveLabDemoPayload(spaceId = "space-robotics"): HiveLabCanvasShellPayload {
  const now = Date.now();
  return {
    space: { id: spaceId, name: "UB Robotics Club", avatarUrl: null, campusId: "ub-buffalo", isDefault: true, recentTools: [] },
    systemTiles: [
      { id: "events", state: "live" },
      { id: "chat", state: "idle" },
      { id: "about", state: "idle" }
    ],
    tools: [
      {
        id: "tool-rsvp",
        name: "Event RSVP",
        icon: "🎉",
        status: "limited_run",
        limitedRunDaysRemaining: 9,
        placements: { start: true, live: true, board: "on_input", manage: true },
        lastEditedAt: new Date(now).toISOString()
      },
      {
        id: "tool-feedback",
        name: "Feedback Pulse",
        icon: "🧪",
        status: "idle",
        placements: { start: false, live: true, board: "on_input", manage: true },
        lastEditedAt: new Date(now - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "tool-checkin",
        name: "Check-In Pro",
        icon: "✅",
        status: "live",
        placements: { start: false, live: true, board: "recap_only", manage: true },
        lastEditedAt: new Date(now - 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    drafts: { count: 2, href: `/lab/${spaceId}?drafts=1` },
    activeTool: {
      tool: {
        id: "tool-rsvp",
        title: "Event RSVP",
        description: "Collect RSVPs, reminders, and optional follow-up.",
        icon: "🎉",
        versionLabel: "3",
        lastSavedAt: new Date(now).toISOString()
      },
      health: { lastRunAt: new Date(now).toISOString(), freshness: "fresh", health: "looks_good", blockingIssues: 0, runTestHref: `/lab/${spaceId}/tools/tool-rsvp/test` },
      summary: { projectedCompletions: 74, completionRate: 0.74, expectedBoardPosts: 1, expectedLiveInteractions: 30 },
      placements: {
        audience: "members",
        placements: { start: true, live: true, board: "on_input", calendar: true, dock: true },
        elements: [
          { id: "quick_form", name: "Quick Form", fieldsUsed: 3, attachedEventId: "event-assembly", pii: false, extendsEvents: true }
        ],
        fieldsUsed: 3,
        hasPII: false
      },
      countdown: { endsAt: new Date(now + 9 * 24 * 60 * 60 * 1000).toISOString(), daysRemaining: 9, status: "limited_run" },
      deployments: { total: 3, items: [
        { spaceId: "space-robotics", spaceName: "UB Robotics", pinnedVersion: 3 },
        { spaceId: "space-freshman", spaceName: "UB Freshman Commons", pinnedVersion: 2 },
        { spaceId: "space-ambassadors", spaceName: "UB Ambassadors", pinnedVersion: 3 }
      ] },
      lints: { blocks: [], warnings: [] },
      actions: { canRunTest: true, canPublish: true, publishHref: "/api/_", runTestHref: "/api/_", viewAsStudentHref: "/spaces/_" },
      telemetry: { interactionSurface: "tool_home", runTestEvent: "run_test_click", publishEvent: "publish_attempt" }
    },
    overlays: { libraryOpen: false, runTestOpen: false, publishOpen: false, lintDrawerOpen: false, replacePickerOpen: false },
    permissions: { canSwitchSpaces: true, canPublish: true, countdownVisible: true, requiresApproval: false },
    telemetry: { spaceId, leaderId: "leader-ub-robotics", surface: "canvas_shell" },
    generatedAt: new Date(now).toISOString()
  };
}
