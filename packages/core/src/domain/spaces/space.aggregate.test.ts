// Bounded Context Owner: Community Guild
import { describe, expect, it } from "vitest";
import { SpaceAggregate } from "./aggregates/space.aggregate";
import { assertOk, assertErr } from "../../shared/testing/assertions";

const baseInput = {
  id: "space-1",
  campusId: "ub-buffalo",
  leaderId: "leader-1",
  name: "Robotics Club",
  description: "Robotics enthusiasts building cool things",
  type: "student_organization" as const,
  visibility: "campus" as const,
  tags: ["engineering"]
};

describe("SpaceAggregate", () => {
  it("assigns the leader as the first member upon creation", () => {
    const result = SpaceAggregate.create(baseInput);
    assertOk(result);
    const snapshot = result.value.toSnapshot();
    expect(snapshot.members).toHaveLength(1);
    expect(snapshot.members[0]?.profileId).toBe(baseInput.leaderId);
    expect(snapshot.members[0]?.role).toBe("leader");
  });

  it("prevents shrinking maxMembers below current membership", () => {
    const creation = SpaceAggregate.create({
      ...baseInput,
      settings: { maxMembers: 5 }
    });
    assertOk(creation);
    const aggregate = creation.value;

    aggregate.addMember("member-1", { campusId: baseInput.campusId });
    aggregate.addMember("member-2", { campusId: baseInput.campusId });

    const updateResult = aggregate.updateSettings({ maxMembers: 2 });
    assertErr(updateResult);
    expect(updateResult.error).toMatch(/capacity/i);
  });

  it("rejects members from another campus", () => {
    const creation = SpaceAggregate.create(baseInput);
    assertOk(creation);
    const aggregate = creation.value;

    const result = aggregate.addMember("outsider", { campusId: "other-campus" });
    assertErr(result);
    expect(result.error).toMatch(/campus/i);
  });

  it("prevents removing the final leader", () => {
    const creation = SpaceAggregate.create(baseInput);
    assertOk(creation);
    const aggregate = creation.value;

    const result = aggregate.removeMember(baseInput.leaderId);
    assertErr(result);
    expect(result.error).toMatch(/leader/i);
  });

  it("updates details with validation", () => {
    const creation = SpaceAggregate.create(baseInput);
    assertOk(creation);
    const aggregate = creation.value;

    const invalid = aggregate.updateDetails({ name: "   " });
    assertErr(invalid);

    const valid = aggregate.updateDetails({
      name: "Robotics Guild",
      description: "Late-night build sessions for autonomous rover squad.",
      tags: ["robotics", "hardware"]
    });

    assertOk(valid);
    const snapshot = aggregate.toSnapshot();
    expect(snapshot.name).toBe("Robotics Guild");
    expect(snapshot.description).toContain("Late-night");
    expect(snapshot.tags).toEqual(["robotics", "hardware"]);
  });
});
