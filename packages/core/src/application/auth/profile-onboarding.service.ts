// Bounded Context Owner: Identity & Access Management Guild
import type { ProfileRepository } from "../../domain/profile/repositories/profile.repository";
import type { OnboardingSubmissionDto } from "../../domain/profile/dto/onboarding-submission.dto";
import type {
  ProfileDomainEvent,
  ProfileOnboardedEvent,
  SpaceAssignment
} from "../../domain/profile/events/profile-onboarded.event";
import { err, ok, type Result } from "../../shared/result";
import { ProfileHandleFactory } from "../../domain/profile/value-objects/profile-handle.value";
import type {
  AuthTelemetryPort,
  OnboardingCompletedEvent
} from "./ports/auth-telemetry.port";

export interface CompleteOnboardingCommand {
  readonly profileId: string;
  readonly submission: OnboardingSubmissionDto;
}

export interface CompleteOnboardingSuccess {
  readonly profileId: string;
  readonly campusId: string;
  readonly onboardingCompletedAt: Date;
  readonly domainEvents: readonly ProfileDomainEvent[];
  readonly defaultSpaces: readonly SpaceAssignment[];
  readonly cohortSpaces: readonly SpaceAssignment[];
}

export class ProfileOnboardingService {
  constructor(
    private readonly deps: {
      readonly profileRepository: ProfileRepository;
      readonly telemetry?: AuthTelemetryPort;
      readonly clock?: () => Date;
    }
  ) {}

  private now(): Date {
    return this.deps.clock ? this.deps.clock() : new Date();
  }

  async completeOnboarding(
    command: CompleteOnboardingCommand
  ): Promise<Result<CompleteOnboardingSuccess>> {
    const profile = await this.deps.profileRepository.findById(command.profileId);
    if (!profile) {
      return err("Profile not found");
    }

    const resolveHandleResult = await this.resolveHandle(command);
    if (!resolveHandleResult.ok) {
      return err(resolveHandleResult.error);
    }

    const normalizedSubmission: OnboardingSubmissionDto = {
      ...command.submission,
      handle: resolveHandleResult.value
    };

    const result = profile.completeOnboarding(normalizedSubmission);
    if (!result.ok) {
      return err(result.error);
    }

    await this.deps.profileRepository.save(profile);
    const domainEvents = profile.pullDomainEvents();
    const onboardingEvent = domainEvents.find(
      (event): event is ProfileOnboardedEvent => event.type === "profile.onboarded"
    );
    const profileProps = profile.getProps();
    const completedAt = profileProps.onboardingCompletedAt ?? this.now();

    if (this.deps.telemetry) {
      const event: OnboardingCompletedEvent = {
        profileId: command.profileId,
        campusId: profileProps.campusId,
        userType: profileProps.userType,
        occurredAt: completedAt,
        defaultSpaces: (onboardingEvent?.defaultSpaces ?? []).map((space) => space.id),
        cohortSpaces: (onboardingEvent?.cohortSpaces ?? []).map((space) => space.id)
      };
      await this.deps.telemetry.recordOnboardingCompleted(event);
    }

    return ok({
      profileId: command.profileId,
      campusId: profileProps.campusId,
      onboardingCompletedAt: completedAt,
      domainEvents,
      defaultSpaces: onboardingEvent?.defaultSpaces ?? [],
      cohortSpaces: onboardingEvent?.cohortSpaces ?? []
    });
  }

  private sanitizeHandleFragment(value: string): string {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  private async resolveHandle(
    command: CompleteOnboardingCommand
  ): Promise<Result<string>> {
    const submitted = command.submission.handle?.trim() ?? "";
    if (submitted.length >= 3) {
      const parsed = ProfileHandleFactory.create(submitted);
      if (!parsed.ok) {
        return err(parsed.error);
      }
      const normalized = parsed.value.value;
      const existing = await this.deps.profileRepository.findByHandle(normalized);
      if (existing && existing.getProps().profileId.value !== command.profileId) {
        return err("Handle is already taken");
      }
      return ok(normalized);
    }

    return this.generateHandle(command);
  }

  private async generateHandle(
    command: CompleteOnboardingCommand
  ): Promise<Result<string>> {
    const personal = command.submission.personalInfo;
    const first = personal?.firstName ? this.sanitizeHandleFragment(personal.firstName) : "";
    const last = personal?.lastName ? this.sanitizeHandleFragment(personal.lastName) : "";

    let base = (first + last).slice(0, 12);
    if (base.length < 3) {
      base = (first || last).slice(0, 8);
    }

    const gradSuffix =
      command.submission.academicInfo?.graduationYear &&
      Number.isFinite(command.submission.academicInfo.graduationYear)
        ? String(command.submission.academicInfo.graduationYear).slice(-2)
        : "";

    if (base.length < 3 && gradSuffix) {
      base = `${(first || "student").slice(0, 6)}${gradSuffix}`;
    }

    if (base.length < 3) {
      const profileTail = this.sanitizeHandleFragment(command.profileId).slice(-6);
      base = `hive${profileTail || "user"}`;
    }

    base = base.slice(0, 12) || "hive";

    for (let attempt = 0; attempt < 40; attempt += 1) {
      const suffix = attempt === 0 ? "" : String(attempt);
      const candidate = `${base}${suffix}`.slice(0, 20);
      const parsed = ProfileHandleFactory.create(candidate);
      if (!parsed.ok) {
        continue;
      }
      const normalized = parsed.value.value;
      const existing = await this.deps.profileRepository.findByHandle(normalized);
      if (!existing || existing.getProps().profileId.value === command.profileId) {
        return ok(normalized);
      }
    }

    const fallback = `profile${Date.now().toString(36).slice(-6)}`.slice(0, 20);
    const parsedFallback = ProfileHandleFactory.create(fallback);
    if (parsedFallback.ok) {
      return ok(parsedFallback.value.value);
    }

    return ok("hiveuser");
  }
}
