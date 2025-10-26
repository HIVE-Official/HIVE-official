// Bounded Context Owner: HiveLab Guild
import { describe, expect, it } from "vitest";
import { ToolAggregate } from "./aggregates/tool.aggregate";
import { assertOk, assertErr } from "../../shared/testing/assertions";

const baseElement = {
  id: "quick_form",
  name: "Quick Form",
  type: "collector",
  config: { fieldsUsed: 1, label: "Interest" }
} as const;

const creationInput = {
  id: "tool-1",
  campusId: "ub-buffalo",
  name: "Event RSVP",
  description: "Collect RSVPs for events",
  createdBy: "leader-1",
  elements: [baseElement]
};

describe("ToolAggregate", () => {
  it("prevents draft tools from switching to public visibility", () => {
    const creation = ToolAggregate.create(creationInput);
    assertOk(creation);
    const aggregate = creation.value;

    const update = aggregate.updateVisibility("public");
    assertErr(update);
    expect(update.error).toMatch(/draft/i);
  });

  it("allows leaders to share a tool campus-wide after certification", () => {
    const creation = ToolAggregate.create(creationInput);
    assertOk(creation);
    const aggregate = creation.value;

    const now = new Date("2025-01-01T10:00:00Z");
    const limitedRun = aggregate.publishWithStage("limited_run", now);
    assertOk(limitedRun);
    const certified = aggregate.publishWithStage("certified", now);
    assertOk(certified);
    const update = aggregate.updateVisibility("campus");
    expect(update.ok).toBe(true);
    expect(aggregate.toSnapshot().visibility).toBe("campus");
  });
});
