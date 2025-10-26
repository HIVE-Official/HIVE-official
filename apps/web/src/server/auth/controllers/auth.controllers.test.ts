// Bounded Context Owner: Identity & Access Management Guild
import { beforeEach, describe, expect, it } from "vitest";
import { createAuthContainer } from "../container";
import { createSignupController } from "./signup.controller";
import { createSaveProgressController } from "./save-progress.controller";
import { createCompleteOnboardingController } from "./complete-onboarding.controller";

describe("Auth controllers integration", () => {
  const requestPayload = {
    personalInfo: {
      firstName: "Jacob",
      lastName: "Rhine",
      bio: "CS major at UB that loves building tools for students.",
      photoUrl: "https://example.com/jacob.jpg"
    },
    academicInfo: {
      majors: ["Computer Science"],
      graduationYear: new Date().getFullYear() + 1
    },
    interests: [{ id: "coding", label: "Coding" }],
    handle: "jacob_r",
    consentGiven: true
  };

  type SignupController = ReturnType<typeof createSignupController>;
  type SaveProgressController = ReturnType<typeof createSaveProgressController>;
  type CompleteOnboardingController = ReturnType<
    typeof createCompleteOnboardingController
  >;

  let signup: SignupController;
  let saveProgress: SaveProgressController;
  let completeOnboarding: CompleteOnboardingController;

  beforeEach(() => {
    const container = createAuthContainer();
    signup = createSignupController(container.signUpService);
    saveProgress = createSaveProgressController(container.progressService);
    completeOnboarding = createCompleteOnboardingController(
      container.profileOnboardingService,
      container.progressService,
      container.sessionService,
      container.spaceAutoJoinService
    );
  });

  it("signs up, saves progress, and completes onboarding", async () => {
    const signupResponse = await signup({
      email: "newuser@buffalo.edu",
      userType: "student"
    });

    if ("error" in signupResponse) {
      throw new Error(`Signup failed: ${signupResponse.error}`);
    }

    expect(signupResponse.status).toBe(200);
    expect(signupResponse.body.mode).toBe("new");
    const profileId = signupResponse.body.profileId;

    const progressResponse = await saveProgress({
      profileId,
      stepId: "personal",
      partialSubmission: {
        personalInfo: requestPayload.personalInfo,
        handle: requestPayload.handle
      }
    });

    if ("error" in progressResponse) {
      throw new Error(`Progress save failed: ${progressResponse.error}`);
    }

    expect(progressResponse.body.stepsCompleted).toContain("personal");

    const completionResponse = await completeOnboarding({
      profileId,
      submission: {
        ...requestPayload,
        clubs: ["ACM"],
        residentialSelection: {
          spaceId: "off-campus-students",
          name: "Off-Campus Students Network"
        }
      }
    });

    if ("error" in completionResponse) {
      throw new Error(`Completion failed: ${completionResponse.error}`);
    }

    expect(completionResponse.status).toBe(200);
    expect(completionResponse.body.campusId).toBe("ub-buffalo");
    expect(completionResponse.body.session.sessionId).toBeDefined();
    expect(completionResponse.body.domainEvents.length).toBeGreaterThan(0);
    expect(completionResponse.body.defaultSpaces.length).toBeGreaterThan(0);
  });

  it("rejects onboarding when handle is already taken", async () => {
    const firstSignup = await signup({
      email: "person1@buffalo.edu",
      userType: "student"
    });

    if ("error" in firstSignup) {
      throw new Error(`Signup failed: ${firstSignup.error}`);
    }

    await completeOnboarding({
      profileId: firstSignup.body.profileId,
      submission: {
        ...requestPayload,
        handle: "jacob_r",
        consentGiven: true
      }
    });

    const secondSignup = await signup({
      email: "person2@buffalo.edu",
      userType: "student"
    });

    if ("error" in secondSignup) {
      throw new Error(`Second signup failed: ${secondSignup.error}`);
    }

    const conflict = await completeOnboarding({
      profileId: secondSignup.body.profileId,
      submission: {
        ...requestPayload,
        handle: "jacob_r",
        consentGiven: true
      }
    });

    expect("error" in conflict).toBe(true);
    if ("error" in conflict) {
      expect(conflict.error).toBe("Handle is already taken");
      expect(conflict.status).toBe(400);
    }
  });

  it("rejects onboarding when consent is not granted", async () => {
    const signupResponse = await signup({
      email: "noconsent@buffalo.edu",
      userType: "student"
    });

    if ("error" in signupResponse) {
      throw new Error(`Signup failed: ${signupResponse.error}`);
    }

    const completionResponse = await completeOnboarding({
      profileId: signupResponse.body.profileId,
      submission: {
        ...requestPayload,
        handle: "noconsent",
        consentGiven: false
      }
    });

    expect("error" in completionResponse).toBe(true);
    if ("error" in completionResponse) {
      expect(completionResponse.error).toBe("Consent must be given");
      expect(completionResponse.status).toBe(400);
    }
  });

  it("accepts dot and dash handles and normalizes to lowercase", async () => {
    const signupResponse = await signup({
      email: "dotdash@buffalo.edu",
      userType: "student"
    });

    if ("error" in signupResponse) {
      throw new Error(`Signup failed: ${signupResponse.error}`);
    }

    const completionResponse = await completeOnboarding({
      profileId: signupResponse.body.profileId,
      submission: {
        ...requestPayload,
        handle: "Jacob.R-Dev",
        consentGiven: true
      }
    });

    if ("error" in completionResponse) {
      throw new Error(`Completion failed: ${completionResponse.error}`);
    }

    expect(completionResponse.status).toBe(200);
  });

  it("rejects handles with consecutive special characters", async () => {
    const signupResponse = await signup({
      email: "badhandle@buffalo.edu",
      userType: "student"
    });

    if ("error" in signupResponse) {
      throw new Error(`Signup failed: ${signupResponse.error}`);
    }

    const completionResponse = await completeOnboarding({
      profileId: signupResponse.body.profileId,
      submission: {
        ...requestPayload,
        handle: "jacob..r",
        consentGiven: true
      }
    });

    expect("error" in completionResponse).toBe(true);
    if ("error" in completionResponse) {
      expect(completionResponse.status).toBe(400);
      // Domain message from ProfileHandleFactory
      expect(completionResponse.error).toBe(
        "Handle cannot contain consecutive special characters"
      );
    }
  });

  it("prevents duplicate handles regardless of case", async () => {
    const firstSignup = await signup({
      email: "owner@buffalo.edu",
      userType: "student"
    });

    if ("error" in firstSignup) {
      throw new Error(`First signup failed: ${firstSignup.error}`);
    }

    const firstComplete = await completeOnboarding({
      profileId: firstSignup.body.profileId,
      submission: {
        ...requestPayload,
        handle: "Jacob.R-Dev",
        consentGiven: true
      }
    });

    if ("error" in firstComplete) {
      throw new Error(`First completion failed: ${firstComplete.error}`);
    }

    const secondSignup = await signup({
      email: "taker@buffalo.edu",
      userType: "student"
    });

    if ("error" in secondSignup) {
      throw new Error(`Second signup failed: ${secondSignup.error}`);
    }

    const conflict = await completeOnboarding({
      profileId: secondSignup.body.profileId,
      submission: {
        ...requestPayload,
        handle: "jacob.r-dev",
        consentGiven: true
      }
    });

    expect("error" in conflict).toBe(true);
    if ("error" in conflict) {
      expect(conflict.error).toBe("Handle is already taken");
      expect(conflict.status).toBe(400);
    }
  });
});
