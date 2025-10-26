// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import { createInMemoryProfileClient } from "../services/profileClient";

describe("createInMemoryProfileClient", () => {
  it("persists profile updates", async () => {
    const client = createInMemoryProfileClient();
    const baseline = await client.getProfile("profile-jwrhineh");

    await client.updateProfile("profile-jwrhineh", {
      personalInfo: { bio: "Rebuilt bio for testing" },
      socialInfo: { instagram: "@ub.rebuild" }
    });

    const updated = await client.getProfile("profile-jwrhineh");
    expect(updated.profile.identity.personalInfo.bio).toBe("Rebuilt bio for testing");
    expect(updated.profile.identity.personalInfo.firstName).toBe(
      baseline.profile.identity.personalInfo.firstName
    );
    expect(updated.profile.identity.socialInfo?.instagram).toBe("@ub.rebuild");
  });

  it("adds accepted connections from suggestions", async () => {
    const client = createInMemoryProfileClient();
    const before = await client.getProfile("profile-jwrhineh");
    const suggestion = before.connections.suggestions[0];
    expect(suggestion).toBeDefined();

    await client.connect("profile-jwrhineh", suggestion.profileId);
    const after = await client.getProfile("profile-jwrhineh");

    const newlyAccepted = after.connections.accepted.find(
      (connection) => connection.summary.profileId === suggestion.profileId
    );

    expect(newlyAccepted).toBeDefined();
    expect(after.profile.stats.connectionCount).toBe(before.connections.accepted.length + 1);
    expect(
      after.connections.suggestions.find((candidate) => candidate.profileId === suggestion.profileId)
    ).toBeUndefined();
  });
});
