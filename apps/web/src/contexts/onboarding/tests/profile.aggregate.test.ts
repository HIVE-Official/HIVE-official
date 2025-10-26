// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import {
  ProfileAggregate,
  ProfileIdFactory,
  type OnboardingSubmissionDto
} from "@core";

const createProfile = (): ProfileAggregate => {
  const profileIdResult = ProfileIdFactory.create("profile-jwrhineh");
  if (!profileIdResult.ok) {
    throw new Error(profileIdResult.error);
  }

  const profileResult = ProfileAggregate.create({
    profileId: profileIdResult.value,
    email: "student@buffalo.edu",
    userType: "student"
  });

  if (!profileResult.ok) {
    throw new Error(profileResult.error);
  }

  return profileResult.value;
};

describe("ProfileAggregate.completeOnboarding", () => {
  it("completes onboarding for a fully populated student profile", () => {
    const profile = createProfile();
    const submission: OnboardingSubmissionDto = {
      personalInfo: {
        firstName: "Jacob",
        lastName: "Rhine",
        bio: "CS major at UB that loves building tools for students.",
        pronouns: "he/him",
        photoUrl: "https://example.com/photo.jpg"
      },
      academicInfo: {
        majors: ["Computer Science"],
        graduationYear: new Date().getFullYear() + 1,
        courses: ["CSE 220", "CSE 250"]
      },
      interests: [{ id: "coding", label: "Coding" }],
      clubs: ["ACM"],
      residentialSelection: {
        spaceId: "north-campus",
        name: "North Campus"
      },
      handle: "jacob_r",
      consentGiven: true
    };

    const result = profile.completeOnboarding(submission);

    expect(result.ok).toBe(true);
    expect(profile.isOnboarded()).toBe(true);
    expect(profile.getCompletionPercentage()).toBe(100);
    expect(profile.isProfileComplete()).toBe(true);
    expect(profile.getProps().handle?.value).toBe("jacob_r");
    const events = profile.pullDomainEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      type: "profile.onboarded",
      profileId: "profile-jwrhineh"
    });
  });

  it("rejects onboarding when interests are missing", () => {
    const profile = createProfile();
    const submission: OnboardingSubmissionDto = {
      personalInfo: {
        firstName: "Alex",
        lastName: "Johnson",
        bio: "Another student biography to test validation.",
        photoUrl: "https://example.com/alex.jpg"
      },
      academicInfo: {
        majors: ["Mathematics"],
        graduationYear: new Date().getFullYear() + 2
      },
      interests: [],
      handle: "alex_j",
      consentGiven: true
    };

    const result = profile.completeOnboarding(submission);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("At least one interest is required");
    }
    expect(profile.isOnboarded()).toBe(false);
  });

  it("rejects onboarding when consent is not granted", () => {
    const profile = createProfile();
    const submission: OnboardingSubmissionDto = {
      personalInfo: {
        firstName: "Jordan",
        lastName: "Lee",
        bio: "Student ready to join the community.",
        photoUrl: "https://example.com/jordan.jpg"
      },
      academicInfo: {
        majors: ["Computer Science"],
        graduationYear: new Date().getFullYear() + 1
      },
      interests: [{ id: "coding", label: "Coding" }],
      handle: "jordanlee",
      consentGiven: false
    };

    const result = profile.completeOnboarding(submission);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Consent must be given");
    }
  });
});
