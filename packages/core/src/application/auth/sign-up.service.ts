// Bounded Context Owner: Identity & Access Management Guild
import { ProfileAggregate } from "../../domain/profile/aggregates/profile.aggregate";
import { ProfileIdFactory } from "../../domain/profile/value-objects/profile-id.value";
import {
  userTypeSchema,
  type UserType
} from "../../domain/profile/profile.types";
import type { ProfileRepository } from "../../domain/profile/repositories/profile.repository";
import type { IdGenerator } from "../../shared/id-generator";
import { err, ok, type Result } from "../../shared/result";
import type { MagicLinkSender } from "./ports/magic-link-sender.port";
import type { AuthTelemetryPort } from "./ports/auth-telemetry.port";

export interface SignUpCommand {
  readonly email: string;
  readonly userType: UserType | string;
}

export type SignUpMode = "new" | "resume" | "welcomeBack";

export interface SignUpSuccess {
  readonly profileId: string;
  readonly campusId: string;
  readonly created: Date;
  readonly magicLinkMessageId: string;
  readonly magicLinkExpiresAt: Date;
  readonly mode: SignUpMode;
}

export interface SignUpServiceDependencies {
  readonly profileRepository: ProfileRepository;
  readonly idGenerator: IdGenerator;
  readonly magicLinkSender: MagicLinkSender;
  readonly telemetry?: AuthTelemetryPort;
  readonly clock?: () => Date;
}

export class SignUpService {
  constructor(private readonly deps: SignUpServiceDependencies) {}

  async execute(command: SignUpCommand): Promise<Result<SignUpSuccess>> {
    const userTypeParse = userTypeSchema.safeParse(command.userType);
    if (!userTypeParse.success) {
      return err("Unsupported user type");
    }

    const now = this.deps.clock ? this.deps.clock() : new Date();

    const existing = await this.deps.profileRepository.findByEmail(
      command.email.toLowerCase()
    );
    if (existing) {
      return this.handleExistingProfile(existing, now);
    }

    const profileIdRaw = this.deps.idGenerator.generate();
    const profileIdResult = ProfileIdFactory.create(profileIdRaw);
    if (!profileIdResult.ok) {
      return err(profileIdResult.error);
    }

    const profileResult = ProfileAggregate.create({
      profileId: profileIdResult.value,
      email: command.email,
      userType: userTypeParse.data
    });

    if (!profileResult.ok) {
      return err(profileResult.error);
    }

    const profile = profileResult.value;

    await this.deps.profileRepository.save(profile);

    const profileProps = profile.getProps();

    await this.deps.telemetry?.recordSignupSubmitted({
      email: profileProps.email.value,
      campusId: profileProps.campusId,
      userType: userTypeParse.data,
      occurredAt: now
    });

    try {
      const magicLinkResult = await this.deps.magicLinkSender.send({
        email: profileProps.email.value,
        campusId: profileProps.campusId,
        profileId: profileProps.profileId.value,
        userType: userTypeParse.data
      });

      await this.deps.telemetry?.recordMagicLinkSent({
        email: profileProps.email.value,
        campusId: profileProps.campusId,
        userType: userTypeParse.data,
        occurredAt: now,
        messageId: magicLinkResult.messageId,
        expiresAt: magicLinkResult.expiresAt
      });

      return ok({
        profileId: profileProps.profileId.value,
        campusId: profileProps.campusId,
        created: now,
        magicLinkMessageId: magicLinkResult.messageId,
        magicLinkExpiresAt: magicLinkResult.expiresAt,
        mode: "new"
      });
    } catch (error: unknown) {
      await this.deps.telemetry?.recordMagicLinkFailed({
        email: profileProps.email.value,
        campusId: profileProps.campusId,
        userType: userTypeParse.data,
        occurredAt: now,
        reason: error instanceof Error ? error.message : "Unknown error"
      });

      return err("Failed to send magic link");
    }
  }

  private async handleExistingProfile(
    profile: ProfileAggregate,
    now: Date
  ): Promise<Result<SignUpSuccess>> {
    const props = profile.getProps();

    try {
      const magicLinkResult = await this.deps.magicLinkSender.send({
        email: props.email.value,
        campusId: props.campusId,
        profileId: props.profileId.value,
        userType: props.userType
      });

      await this.deps.telemetry?.recordMagicLinkSent({
        email: props.email.value,
        campusId: props.campusId,
        userType: props.userType,
        occurredAt: now,
        messageId: magicLinkResult.messageId,
        expiresAt: magicLinkResult.expiresAt
      });

      return ok({
        profileId: props.profileId.value,
        campusId: props.campusId,
        created: now,
        magicLinkMessageId: magicLinkResult.messageId,
        magicLinkExpiresAt: magicLinkResult.expiresAt,
        mode: props.isOnboarded ? "welcomeBack" : "resume"
      });
    } catch (error: unknown) {
      await this.deps.telemetry?.recordMagicLinkFailed({
        email: props.email.value,
        campusId: props.campusId,
        userType: props.userType,
        occurredAt: now,
        reason: error instanceof Error ? error.message : "Unknown error"
      });

      return err("Failed to send magic link");
    }
  }
}
