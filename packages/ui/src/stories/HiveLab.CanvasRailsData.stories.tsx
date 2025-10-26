import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CanvasLayout, LabLeftRail, LabRightRail } from "../organisms/hivelab";
import type { HiveLabCanvasShellPayload } from "../organisms/hivelab/types";

const meta = {
  title: "Organisms/HiveLab/Canvas/CanvasRailsData",
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const examplePayload: HiveLabCanvasShellPayload = {
  space: { id: "space-robotics", name: "UB Robotics Club", avatarUrl: null, campusId: "ub-buffalo", isDefault: true, recentTools: [] },
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
      lastEditedAt: new Date().toISOString()
    },
    {
      id: "tool-feedback",
      name: "Feedback Pulse",
      icon: "🧪",
      status: "idle",
      placements: { start: false, live: true, board: "on_input", manage: true },
      lastEditedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "tool-checkin",
      name: "Check-In Pro",
      icon: "✅",
      status: "live",
      placements: { start: false, live: true, board: "recap_only", manage: true },
      lastEditedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    }
  ],
  drafts: { count: 2, href: "/lab/space-robotics?drafts=1" },
  activeTool: {
    tool: {
      id: "tool-rsvp",
      title: "Event RSVP",
      description: "Collect RSVPs, reminders, and optional follow-up.",
      icon: "🎉",
      versionLabel: "v3",
      lastSavedAt: new Date().toISOString()
    },
    health: { lastRunAt: new Date().toISOString(), freshness: "fresh", health: "looks_good", blockingIssues: 0, runTestHref: "/lab/space-robotics/tools/tool-rsvp/test" },
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
    countdown: { endsAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), daysRemaining: 9, status: "limited_run" },
    deployments: { total: 3, items: [{ spaceId: "space-robotics", spaceName: "UB Robotics", pinnedVersion: 3 }, { spaceId: "space-freshman", spaceName: "UB Freshman Commons", pinnedVersion: 2 }, { spaceId: "space-ambassadors", spaceName: "UB Ambassadors", pinnedVersion: 3 }] },
    lints: { blocks: [], warnings: [] },
    actions: { canRunTest: true, canPublish: true, publishHref: "/api/...", runTestHref: "/api/...", viewAsStudentHref: "/spaces/..." },
    telemetry: { interactionSurface: "tool_home", runTestEvent: "run_test_click", publishEvent: "publish_attempt" }
  },
  overlays: { libraryOpen: false, runTestOpen: false, publishOpen: false, lintDrawerOpen: false, replacePickerOpen: false },
  permissions: { canSwitchSpaces: true, canPublish: true, countdownVisible: true, requiresApproval: false },
  telemetry: { spaceId: "space-robotics", leaderId: "leader-ub-robotics", surface: "canvas_shell" },
  generatedAt: new Date().toISOString()
};

export const AccurateRailsFromPayload: Story = {
  render: () => (
    <CanvasLayout
      showLeft
      showRight
      leftSlot={<LabLeftRail payload={examplePayload} activeToolId={examplePayload.activeTool?.tool.id} />}
      rightSlot={<LabRightRail payload={examplePayload} />}
    >
      {/* Center content to illustrate non-overlap */}
      <div className="rounded-2xl border border-border/35 bg-card/80 p-6 text-sm shadow-level1">
        <h2 className="text-lg font-semibold text-foreground">Tool Home</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Rails derive their content from the actual CanvasShellPayload (tools, system tiles, placements, countdown).
          Elements tab reads from the canonical Elements catalog, so categories and tile anatomy are accurate.
        </p>
      </div>
    </CanvasLayout>
  )
};
