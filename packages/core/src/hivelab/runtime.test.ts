// Bounded Context Owner: HiveLab Guild
import { describe, expect, it } from "vitest";
import { runToolTest } from "./runtime";
import { lookupElementDefinition } from "./catalog";
import type { ToolDefinition } from "./contracts";

const definition: ToolDefinition = {
  slug: "tool-rsvp",
  version: "draft",
  title: "Event RSVP",
  emoji: "🎉",
  audience: "members",
  placement: {
    start: true,
    live: true,
    board: "on_input",
    dock: true
  },
  time: { finishBy: "2025-02-01T17:00:00.000Z" },
  elements: [
    {
      id: "quick_form",
      config: { fieldsUsed: 3 },
      attachedEventId: "event-123"
    },
    {
      id: "poll_rank",
      config: { editable: false },
      attachedEventId: null
    }
  ],
  settings: {
    reminders: {
      h24: true,
      start: true,
      m10: true
    },
    anonymous: false,
    quietReports: true,
    overflow: "attach_under_latest"
  }
};

describe("runToolTest", () => {
  it("computes preview, ghost roster, fast-forward, and results snapshots", () => {
    const report = runToolTest(definition, lookupElementDefinition);

    expect(report.preview.start).toBe(true);
    expect(report.preview.summary).toContain("Start shortcut available");

    expect(report.ghostRoster).toHaveLength(3);
    expect(report.ghostRoster[0]?.size).toBe(25);
    expect(report.ghostRoster[1]?.projectedCompletions).toBeGreaterThan(0);

    const fastForwardIds = report.fastForward.map((entry) => entry.id);
    expect(fastForwardIds).toEqual([
      "now",
      "plus_10m",
      "plus_24h",
      "plus_48h"
    ]);
    expect(report.fastForward[1]?.remindersTriggered).toContain("10m reminder");

    expect(report.results.projectedCompletions).toBeGreaterThan(0);
    expect(report.results.expectedBoardPosts).toBe(1);
    expect(report.results.expectedLiveInteractions).toBeGreaterThanOrEqual(0);
  });
});
