// Bounded Context Owner: HiveLab Guild
import { describe, expect, it } from "vitest";
import { ToolDefinitionAggregate, type AuthoringActor } from "./tool-definition.aggregate";
import { lookupElementDefinition } from "../../hivelab/catalog";
import { computeToolRuntimeSnapshot } from "../../hivelab/runtime";
import type { ToolDefinition } from "../../hivelab/contracts";
import { assertErr, assertOk } from "../../shared/testing/assertions";

const leaderActor: AuthoringActor = {
  profileId: "leader-ub-robotics",
  role: "leader"
};

const memberActor: AuthoringActor = {
  profileId: "student-1",
  role: "member"
};

const baseDefinition: ToolDefinition = {
  slug: "tool-rsvp",
  version: "draft",
  title: "RSVP + Check-in",
  emoji: "🤖",
  audience: "members",
  placement: {
    start: true,
    live: true,
    board: "on_input",
    dock: true
  },
  time: { finishBy: "2025-09-01T12:00:00.000Z" },
  elements: [
    {
      id: "quick_form",
      config: {
        fieldsUsed: 2
      },
      attachedEventId: null
    },
    {
      id: "slots_shifts",
      config: {
        fieldsUsed: 2
      },
      attachedEventId: "event-123"
    }
  ],
  settings: {
    reminders: { h24: true },
    anonymous: false,
    quietReports: true,
    overflow: "attach_under_latest"
  }
};

describe("ToolDefinitionAggregate", () => {
  it("requires a leader role to create", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: memberActor,
      definition: baseDefinition
    });
    assertErr(creation);
    expect(creation.error).toBe("FORBIDDEN");
  });

  it("enforces 8-field cap when replacing elements", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: baseDefinition
    });
    assertOk(creation);
    const aggregate = creation.value;

    const oversizedElements = Array.from({ length: 9 }, (_, index) => ({
      id: "quick_form",
      config: { fieldsUsed: 1, label: `Field ${index}` },
      attachedEventId: null
    }));

    const result = aggregate.replaceElements(oversizedElements, leaderActor);
    assertErr(result);
    expect(result.error).toMatch(/8 fields/i);
  });

  it("blocks Start placement when audience is leaders-only", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: baseDefinition
    });
    assertOk(creation);
    const aggregate = creation.value;

    const setAudience = aggregate.setAudience("leaders", leaderActor);
    assertErr(setAudience);
    expect(setAudience.error).toMatch(/member-facing audience/i);
  });

  it("enforces Start placement toggle before switching to leaders", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: {
        ...baseDefinition,
        placement: {
          ...baseDefinition.placement,
          start: false
        }
      }
    });
    assertOk(creation);
    const aggregate = creation.value;

    const switchAudience = aggregate.setAudience("leaders", leaderActor);
    assertOk(switchAudience);

    const placementResult = aggregate.updatePlacement(
      {
        start: true,
        live: true,
        board: "on_input",
        dock: false
      },
      leaderActor
    );
    assertErr(placementResult);
    expect(placementResult.error).toMatch(/member-facing audience/i);
  });

  it("prevents anonymous responses when PII elements are present", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: {
        ...baseDefinition,
        elements: [
          {
            id: "file_upload",
            config: { fieldsUsed: 1 },
            attachedEventId: null
          }
        ],
        settings: {
          ...baseDefinition.settings,
          anonymous: true
        }
      }
    });
    assertErr(creation);
    expect(creation.error).toMatch(/PII elements block anonymous/);
  });

  it("prevents leader-only elements from shipping to members-only audience", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: {
        ...baseDefinition,
        elements: [
          {
            id: "labels_members",
            config: { fieldsUsed: 1 },
            attachedEventId: null
          }
        ],
        placement: {
          start: true,
          live: false,
          board: "off",
          dock: false
        }
      }
    });
    assertErr(creation);
    expect(creation.error).toMatch(/leader-only elements/i);
  });

  it("supports UB leader scenario: RSVP + Check-in attached to Event", () => {
    const creation = ToolDefinitionAggregate.create({
      actor: leaderActor,
      definition: baseDefinition
    });
    assertOk(creation);
    const aggregate = creation.value;

    const definition = aggregate.toDefinition();
    expect(definition.audience).toBe("members");
    expect(definition.placement.live).toBe(true);

    const runtime = computeToolRuntimeSnapshot(definition, lookupElementDefinition);
    expect(runtime.placement.calendar).toBe(true);
  });
});
