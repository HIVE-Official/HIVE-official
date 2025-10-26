// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import {
  InMemoryOnboardingProgressRepository,
  OnboardingProgressService
} from "@core";

describe("OnboardingProgressService", () => {
  it("merges partial submissions across steps", async () => {
    const repo = new InMemoryOnboardingProgressRepository();
    const service = new OnboardingProgressService(repo);

    const first = await service.saveProgress({
      profileId: "profile-1",
      stepId: "personal",
      partialSubmission: {
        personalInfo: {
          firstName: "Alex",
          lastName: "Johnson",
          bio: "Student at UB",
          photoUrl: "https://example.com/photo.jpg"
        }
      }
    });

    expect(first.ok).toBe(true);

    const second = await service.saveProgress({
      profileId: "profile-1",
      stepId: "interests",
      partialSubmission: {
        interests: [{ id: "coding", label: "Coding" }]
      }
    });

    expect(second.ok).toBe(true);
    if (!second.ok) {
      return;
    }

    expect(second.value.snapshot.stepsCompleted).toEqual([
      "personal",
      "interests"
    ]);
    expect(second.value.snapshot.partialSubmission.interests).toHaveLength(1);
    expect(second.value.snapshot.partialSubmission.personalInfo?.firstName).toBe(
      "Alex"
    );
  });
});
