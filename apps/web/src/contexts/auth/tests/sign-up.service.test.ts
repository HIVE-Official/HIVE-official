// Bounded Context Owner: Identity & Access Management Guild
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  InMemoryProfileRepository,
  SignUpService,
  type MagicLinkSender,
  type MagicLinkResult,
  type AuthTelemetryPort,
  type OnboardingSubmissionDto
} from "@core";
import { UuidGenerator } from "@core/infrastructure/id/uuid-generator";

class FakeMagicLinkSender implements MagicLinkSender {
  constructor(private readonly resolver: () => Promise<void>) {}

  async send(
    payload: Parameters<MagicLinkSender["send"]>[0]
  ): Promise<MagicLinkResult> {
    await this.resolver();
    return {
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      messageId: `msg-${payload.profileId}`
    };
  }
}

const noopTelemetry = (): AuthTelemetryPort => ({
  recordSignupSubmitted: vi.fn().mockResolvedValue(undefined),
  recordMagicLinkSent: vi.fn().mockResolvedValue(undefined),
  recordMagicLinkFailed: vi.fn().mockResolvedValue(undefined),
  recordOnboardingCompleted: vi.fn().mockResolvedValue(undefined)
});

describe("SignUpService", () => {
  let repo: InMemoryProfileRepository;
  let idGenerator: UuidGenerator;

  beforeEach(() => {
    repo = new InMemoryProfileRepository();
    idGenerator = new UuidGenerator();
  });

  it("creates profile and sends magic link", async () => {
    const service = new SignUpService({
      profileRepository: repo,
      idGenerator,
      magicLinkSender: new FakeMagicLinkSender(() => Promise.resolve()),
      telemetry: noopTelemetry()
    });

    const result = await service.execute({
      email: "student@buffalo.edu",
      userType: "student"
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.profileId).toBeDefined();
    expect(result.value.campusId).toBe("ub-buffalo");
    expect(result.value.magicLinkMessageId).toMatch(/^msg-/);
    expect(result.value.magicLinkExpiresAt.getTime()).toBeGreaterThan(
      Date.now()
    );
    expect(result.value.mode).toBe("new");
  });

  it("returns resume mode when profile exists but onboarding incomplete", async () => {
    const service = new SignUpService({
      profileRepository: repo,
      idGenerator,
      magicLinkSender: new FakeMagicLinkSender(() => Promise.resolve())
    });

    const first = await service.execute({
      email: "student@buffalo.edu",
      userType: "student"
    });
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    const second = await service.execute({
      email: "student@buffalo.edu",
      userType: "student"
    });

    expect(second.ok).toBe(true);
    if (!second.ok) {
      return;
    }

    expect(second.value.profileId).toBe(first.value.profileId);
    expect(second.value.mode).toBe("resume");
  });

  it("returns welcome back mode when profile is already onboarded", async () => {
    const service = new SignUpService({
      profileRepository: repo,
      idGenerator,
      magicLinkSender: new FakeMagicLinkSender(() => Promise.resolve())
    });

    const first = await service.execute({
      email: "student@buffalo.edu",
      userType: "student"
    });
    expect(first.ok).toBe(true);
    if (!first.ok) {
      return;
    }

    const profile = await repo.findByEmail("student@buffalo.edu");
    expect(profile).not.toBeNull();
    if (!profile) {
      return;
    }

    const submission: OnboardingSubmissionDto = {
      personalInfo: {
        firstName: "Jordan",
        lastName: "Lee",
        bio: "Student completing onboarding flow for tests.",
        pronouns: "they/them"
      },
      academicInfo: {
        majors: ["computer-science"],
        graduationYear: new Date().getFullYear() + 1
      },
      interests: [{ id: "coding", label: "Coding" }],
      handle: "jordanlee",
      consentGiven: true
    };

    const onboardingResult = profile.completeOnboarding(submission);
    expect(onboardingResult.ok).toBe(true);
    if (!onboardingResult.ok) {
      return;
    }
    await repo.save(profile);

    const welcomeBack = await service.execute({
      email: "student@buffalo.edu",
      userType: "student"
    });

    expect(welcomeBack.ok).toBe(true);
    if (!welcomeBack.ok) {
      return;
    }

    expect(welcomeBack.value.profileId).toBe(first.value.profileId);
    expect(welcomeBack.value.mode).toBe("welcomeBack");
  });
});
